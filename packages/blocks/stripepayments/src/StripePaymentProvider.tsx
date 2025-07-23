import { StripeProvider } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import { View, StyleSheet, Alert, Linking } from "react-native";
import StripePaymentView from "./StripePaymentView";
import { createToken } from "@stripe/stripe-react-native";
import {
  getStorageData,
  setStorageData,
} from "../../../framework/src/Utilities";
import { useFocusEffect } from "@react-navigation/native";
//@ts-ignore
import { baseURL } from "../../../framework/src/config";

// const authToken = 
let token: any;
let newToken: any;

export interface ViewProps {
  // Customizable Area Start
  isCardListing: any;
  toTitleCase: any;
  onSelectAccount: any;
  onOpenModal: any;
  isAddAccountModal: boolean;
  onExstingCardPayPress: any;
  isLoaderForExstingAccount: boolean;
  isCardSelected: Object;
  onRemoveModalAndData: any;
  fetchCardDetails: any;
  saveCardToken: any;
  isLoaderForSaveCardDetails: boolean;
  cardInfo: any;
  isLoader: boolean;
  onNewCardPayPress: any;
  removeSavedCard: any;
  isGetCardLoader: boolean;
  // Customizable Area End
}

const StripePaymentProvider: React.FC = (props: any) => {
  const [cardInfo, setCardInfo] = useState<any>(null);
  const [cardListing, setCardListing] = useState([]);
  const [isCardSelected, setCardSelected] = useState(false);
  const [isAddAccountModal, setAddAccountModal] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [isLoaderForExstingAccount, setLoaderForExstingAccount] =
    useState(false);
  const [isLoaderForSaveCardDetails, setLoaderForSaveCardDetails] =
    useState(false);
  const [isSelectedCard, setSelectedCard] = useState<boolean|null>(false);
  const [authToken, setAuthToken] = useState(null);
  const [isGetCardLoader,setGetCardLoader] = useState(false)

  function toTitleCase(str: string): string {
    if (!str) return ""; // return empty string if input is undefined or null
    return str.replace(/\w\S*/g, (txt: string) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      onPageInit()
      return cleanUp();
    }, [])
  );

const onPageInit= async()=>{
  const authT = await getStorageData("authToken", false) || "";
  if(authT){
    setAuthToken(authT)
    getCardList(authT)
  }
  
}

  const cleanUp = () => {
    setLoader(false);
    setLoaderForSaveCardDetails(false);
    setLoaderForExstingAccount(false);
  };

  const getCardList = async (authT : any) => {
    setGetCardLoader(true);
    const res = await fetch(`${baseURL}card_list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: await authT ? authT :authToken,
      },
    });
    const response = await res.json();
    if (response?.data && response?.data.length >0) {
      response.data[0].isSelected = true;
      setSelectedCard(response.data[0]);
      setCardListing(response?.data ?? []);
      setCardSelected(true);
      setGetCardLoader(false);
    }else{
      setSelectedCard(null);
      setCardListing([]);
      setCardSelected(false);
      setGetCardLoader(false);
    }
  };

  const removeSavedCard = async (id: string) => {
    Alert.alert("", "Are you sure you want to delete your account?", [
      {
        text: "Cancel",
        onPress: () => {
          return false;
        },
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          onConfirmationForRemoveAccount(id);
        },
      },
    ]);
  };

  const onConfirmationForRemoveAccount = async (id: string) => {
    const res = await fetch(`${baseURL}card_remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: authToken ?? '',
      },
      body: JSON.stringify({
        payment: {
          payment_method_id: id,
        },
      }),
    });
    const response = await res.json();
    if(response?.message){
      alert(response.message)
      getCardList(null)
    }
  };

  const fetchCardDetails = (cardDetail: any) => {
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };

  const fetchPaymentIntentClientSecretByExstingAccount = async (isData : any) => {
    if (isData?.id === null) return;
    const res = await fetch(`${baseURL}make_payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: authToken ?? '',
      },
      body: JSON.stringify({
        payment: {
          amount: Number(props.route.params.amount),
          currency: "USD",
          payment_method: isData?.id,
          payment_method_types: ["Card"]
        },
      }),
    });
    const response = await res.json();
    if (response?.errors) {
      Alert.alert("Error!\nMinimum amount must be \$1.0",);
      return null;
    }
    if(response?.data){
      return response.data
    }else if(response?.client_secret){
      return response
    }
    return null
  };

  const fetchPaymentIntentClientSecret = async () => {
    if (token === null) return;
    const res = await fetch(`${baseURL}stripe_payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: authToken ?? '',
      },
      body: JSON.stringify({
        payment: {
          amount: props.route.params.amount,
          currency: "USD",
          token: token,
          payment_method_types: ["Card"],
        },
      }),
    });
    const response = await res.json();
    if (response?.errors) {
      Alert.alert("Error!\nMinimum amount must be \$1.0",);
      return null;
    }
    const { data } = response.data;
    return response.data;
  };

  const cardPayment = async (value: any) => {
    let isExistCardDetails:any = value ? isSelectedCard : null;
    isExistCardDetails ? setLoaderForExstingAccount(true) : setLoader(true);
    if (!isExistCardDetails) {
      if (!!cardInfo) {
        try {
          const resToken = await createToken({
            ...(cardInfo as Object),
            type: "Card",
          });
          console.log('resToken',resToken)
          if (resToken?.error) {
            isExistCardDetails
              ? setLoaderForExstingAccount(false)
              : setLoader(false);
            alert(resToken?.error?.message);
            return;
          }
          token = resToken.token?.id;
        } catch (error) {
          alert("Error raised in creating token");
        }
      }
    }
    const data = isExistCardDetails
      ? await fetchPaymentIntentClientSecretByExstingAccount(isExistCardDetails)
      : await fetchPaymentIntentClientSecret();
    if (!data) {
      isExistCardDetails ? setLoaderForExstingAccount(false) : setLoader(false);
      return;
    }
    const { id, payment_method , client_secret} = data;
    await setStorageData("paymentIntentId", id || client_secret);
    if ((id === null && payment_method === null) || client_secret == null) {
      isExistCardDetails ? setLoaderForExstingAccount(false) : setLoader(false);
      return;
    }
    const res = await fetch(`${baseURL}confirm_payment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: authToken ?? '',
      },
      body: JSON.stringify({
        payment: {
          payment_method_id: isExistCardDetails ? isExistCardDetails.id : payment_method,
          payment_intent_id: isExistCardDetails ? client_secret :id ,
        },
      }),
    });
    const response = await res.json();
    const { status, next_action } = response.data;
    if (status === "requires_action") {
      if (next_action?.use_stripe_sdk?.stripe_js) {
        Linking.openURL(next_action?.use_stripe_sdk?.stripe_js);
      }
      onUpdateCoinPurchaseAfterSuccess(isExistCardDetails);
    } else if (response.errors) {
      isExistCardDetails ? setLoaderForExstingAccount(false) : setLoader(false);
      Alert.alert(`Something went wrong. Please try again!`);
    } else {
      isExistCardDetails ? setLoaderForExstingAccount(false) : setLoader(false);
    }
  };
  const getCoinWorth = async()=>{
    const res = await fetch(`${baseURL}bx_block_cfappcoinsmanagement/custom_coins/coins_worth?coins_count=${parseInt(props.route.params.count)}&transaction_type=purchase`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: authToken ?? '',
      },
    });
    const response = await res.json();
    console.log('response',response)
    return response.coins_worth ? response.coins_worth: null;
  }


  const onUpdateCoinPurchaseAfterSuccess = async (isExistCardDetails: any) => {
    let isAmount : any = await getCoinWorth()
    console.log('amt------',isAmount);
    const res = await fetch(
      `${baseURL}bx_block_cfappcoinsmanagement/coin_transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: authToken ?? '',
        },
        body: JSON.stringify({
          transaction_type: "purchase",
          amount:  isAmount ? isAmount:props.route.params.amount,
          coins_count: props.route.params.count,
          status: "success",
          payment_id: "payment1", 
        }),
      }
    );
    
    const response = await res.json();
    if (response?.errors) {
      isExistCardDetails ? setLoaderForExstingAccount(false) : setLoader(false);
      return;
    }
    props.navigation.navigate("paymentsuccess", { result: "success" });
    isExistCardDetails ? setLoaderForExstingAccount(false) : setLoader(false);
    setLoaderForSaveCardDetails(false);
    setAddAccountModal(false);
  };

  const onSelectAccount = (item: any) => {
    setCardSelected(true);
    cardListing.map((i: any, j) => {
      if (item.id == i.id) {
        setSelectedCard(i);
        i.isSelected = true;
      } else {
        i.isSelected = false;
      }
    });
    setCardListing([...cardListing]);
  };

  const saveCardToken = async () => {
    setLoaderForSaveCardDetails(true);
    if (!!cardInfo) {
      try {
        const resToken = await createToken({
          ...(cardInfo as Object),
          type: "Card",
        });
        if (resToken?.error) {
          setLoaderForSaveCardDetails(false);
          alert(resToken?.error?.message);
          return;
        }
        newToken = resToken.token?.id;
        console.log(newToken);
      } catch (error) {
        setLoaderForSaveCardDetails(false);
        alert("Error raised in creating token");
      }
    }
    const response = await fetch(`${baseURL}/card_save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: authToken ?? '',
      },
      body: JSON.stringify({
        payment: {
          card_token: newToken,
        },
      }),
    });

    const { data, errors } = await response.json();
    if (data) {
      await getCardList(null);
      setAddAccountModal(false);
      setLoaderForSaveCardDetails(false);
      Alert.alert(data);
    } else if (errors) {
      Alert.alert(errors && errors[0]?.message ? errors[0].message : "");
      setLoaderForSaveCardDetails(false);
    }
  };

  const onOpenModal = () => {
    setAddAccountModal(true);
  };

  const onExstingCardPayPress = () => {
    cardPayment(true);
  };

  const onNewCardPayPress = () => {
    setAddAccountModal(true);
    cardPayment(false);
  };

  const onRemoveModalAndData = () => {
    setCardInfo(null);
    setLoader(false);
    setLoaderForSaveCardDetails(false);
    setAddAccountModal(false);
  };

  const viewProps: ViewProps = {
    isCardListing: cardListing,
    toTitleCase,
    onSelectAccount,
    onOpenModal,
    isAddAccountModal,
    onExstingCardPayPress,
    isLoaderForExstingAccount,
    isCardSelected,
    onRemoveModalAndData,
    fetchCardDetails,
    saveCardToken,
    isLoaderForSaveCardDetails,
    cardInfo,
    isLoader,
    onNewCardPayPress,
    removeSavedCard,
    isGetCardLoader
  };

  return (
    <View style={styles.container}>
      <StripeProvider
        publishableKey="pk_test_51MsloZSDfr8LsdopSaXcLX19d7NzJxUvvAempClt0pjNVYoke0pB2xGxuOcwun5kZOvwLOFrYNc7HYLOGDnXCzKl00m7t4PctM"
        merchantIdentifier="merchant.identifier"
      >
        <StripePaymentView {...viewProps} />
      </StripeProvider>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
});
export default StripePaymentProvider;
