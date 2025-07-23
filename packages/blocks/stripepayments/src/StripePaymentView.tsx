import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { CardField } from "@stripe/stripe-react-native";
import { Icon } from "react-native-elements";
import { ViewProps } from "./StripePaymentProvider";

const StripePaymentView: React.FC<ViewProps> = ({
  // Customizable Area Start
  isCardListing,
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
  // Customizable Area End
}) => {
  const renderItem = ({ item, index }: any) => (
    <>
      <TouchableOpacity
        onPress={() => onSelectAccount(item)}
        style={styles.cardListMainView}
      >
        <View style={styles.width65}>
          <Text style={styles.cardListTextstyle}>
            {toTitleCase(item?.brand)} {"    "}**** **** **** {item?.last4}
          </Text>
        </View>
        <View style={styles.width20}>
          <TouchableOpacity
            style={styles.radioBtnViewStyle}
            onPress={() => onSelectAccount(item)}
          >
            {item?.isSelected && <View style={styles.radioBtnView} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('id = ',item?.id);
              removeSavedCard(item?.id)
            }}
          >
            {/* {item?.isSelected &&  */}
              <Icon name="delete" type="material" color='red'size={18} />
              {/* } */}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View style={styles.bottomBorder1} />
    </>
  );

  return (
    <SafeAreaView>
      <View testID="StripeIntegrationView">
        <View style={styles.mainViewStyle}>
        {  isGetCardLoader && (
            <>
              <ActivityIndicator color={"#FFC925"} style={{paddingBottom:5}} size={"small"} />
              <View style={styles.bottomBorder1} />
            </>
          )}
          <FlatList
            data={isCardListing ? isCardListing:[]}
            renderItem={renderItem}
            keyExtractor={(i, j) => j.toString()}
          />

          <TouchableOpacity
            onPress={onOpenModal}
            style={styles.addAccViewStyle}
          >
            <Icon
              name="plus"
              type="antdesign"
              size={24}
              color={"orange"}
              containerStyle={styles.modalIconStyle}
            />
            <Text style={styles.addTextStyle}>Add New Card</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          testID="SubmitButton"
          style={{
            ...styles.submitButtonNew,
            backgroundColor: !isCardSelected ? "grey" : "orange",
          }}
          disabled={
            !isCardSelected ||  isLoaderForExstingAccount
          }
          onPress={onExstingCardPayPress}
        >
          {!isAddAccountModal && isLoaderForExstingAccount ? (
            <ActivityIndicator color={"white"} size={"small"} />
          ) : (
            <>
              <Text style={styles.buttonText}>Proceed to pay</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      {isAddAccountModal && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isAddAccountModal}
          onRequestClose={onRemoveModalAndData}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalInViewStyle}>
                <TouchableOpacity style={{alignSelf:"flex-end",paddingBottom:4}} onPress={onRemoveModalAndData}>
                  <Icon name="close" type="antdesign" size={20}/>
                  </TouchableOpacity>
                  <Text style={styles.modalTextStyle}>Add New Account</Text>
                  <CardField
                    postalCodeEnabled={false}
                    placeholders={{
                      number: "4242 4242 4242 4242",
                      cvc: "CVV",
                    }}
                    cardStyle={{
                      backgroundColor: "#f5f5f5",
                      textColor: "#000000",
                      borderColor: "black",
                      borderWidth: 1,
                      borderRadius: 8,
                    }}
                    style={{
                      width: "100%",
                      height: 50,
                      marginVertical: 30,
                    }}
                    onCardChange={fetchCardDetails}
                  />
                  <TouchableOpacity
                    testID="SubmitButton"
                    style={{
                      ...styles.submitButton,
                      backgroundColor: !cardInfo ? "grey" : "orange",
                    }}
                    disabled={
                      !cardInfo ||
                      (isAddAccountModal && isLoaderForSaveCardDetails)
                    }
                    onPress={saveCardToken}
                  >
                    {isAddAccountModal && isLoaderForSaveCardDetails ? (
                      <ActivityIndicator color={"white"} size={"small"} />
                    ) : (
                      <Text style={styles.buttonText}>Save Card</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    testID="SubmitButton"
                    style={{
                      ...styles.submitButton,
                      backgroundColor: !cardInfo ? "grey" : "orange",
                    }}
                    disabled={!cardInfo || isLoader}
                    onPress={onNewCardPayPress}
              >
                    {isAddAccountModal && isLoader ? (
                      <ActivityIndicator color={"white"} size={"small"} />
                    ) : (
                      <Text style={styles.buttonText}>Proceed to pay</Text>
                    )}
                  </TouchableOpacity>
                </View>
            </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  submitButtonNew: {
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  cardListMainView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  width65: {
    width: "80%",
  },
  width20: {
    flexDirection:'row',
    justifyContent:'space-around',
    width: "20%",
    alignItems: "flex-end",
  },
  cardListTextstyle: {
    paddingHorizontal: 5,
    color: "grey",
    fontWeight: "bold",
    // fontSize: 16,
  },
  radioBtnViewStyle: {
    height: 18,
    width: 18,
    borderColor: "#FFC925",
    borderRadius: 20,
    borderWidth: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  radioBtnView: {
    height: 12,
    width: 12,
    backgroundColor: "#FFC925",
    borderRadius: 20,
  },
  bottomBorder1: {
    marginVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  addAccViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 5,
  },
  modalContainer: {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  mainViewStyle: {
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
    padding: 16,
    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: "#ccc",
  },
  modalIconStyle: {
    backgroundColor: "#FFE9A4",
    alignSelf: "baseline",
    opacity: 0.4,
    padding: 4,
    borderRadius: 4,
    marginRight: 15,
  },
  width85: {
    width: "85%",
  },
  addTextStyle: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  modalInViewStyle: {
    height: "70%",
    backgroundColor: "#fff",
    padding: 16,
  },
  modalTextStyle: {
    textAlign: "center",
    fontSize: 16,
    color: "orange",
  },
});
export default StripePaymentView;
