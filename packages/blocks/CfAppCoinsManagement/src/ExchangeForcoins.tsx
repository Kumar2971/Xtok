import React from "react";

// Customizable Area Start
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
  FlatList
} from "react-native";
import { Input } from "react-native-elements";
import CustomButton from "../../../components/src/Custombutton";
import FONTS from "../../../components/src/Fonts/Fonts";
import { translate } from "../../../components/src/i18n/translate";
import Scale from "../../../components/src/Scale";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import { imgLeftArrow, coin } from "./assets";

//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import ExchangeForcoinsController, {
  Props
} from "./ExchangeForcoinsController";
import AlertModal from "../../../components/src/AlertModal";

export default class ExchangeForcoins extends ExchangeForcoinsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Dimensions.addEventListener("change", (e) => {
    //   MergeEngineUtilities.init(
    //     artBoardHeightOrg,
    //     artBoardWidthOrg,
    //     Dimensions.get("window").height,
    //     Dimensions.get("window").width
    //   );
    //   this.forceUpdate();
    // });
    // Customizable Area End
  }

  // Customizable Area Start

  header = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          testID="btnExample"
          onPress={() => this.props.navigation.goBack()}
        >
          <Image source={imgLeftArrow} style={[styles.backarrowStyle,this.state.language =='ar' && styles.backArrow_ar]} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{translate("exchange")}</Text>
        <View />
      </View>
    );
  };
  balance = () => {
   const totalBalance= this.state.totalBalance
   const Accumulated_Coins= this.state.accumulatedCoins
   return (
      <View style={styles.balanceContainer}>
        <Text style={styles.headingText}>{translate("total_balance")}</Text>
        <Text testID="totalBalance" style={styles.balanceamt}>$ {this.state.totalBalance ? totalBalance : '0'}</Text>
        <View style={styles.coincontainer}>
          <Text testID="accumulatedCoins" style={styles.headingText}>{translate("Accumulated_Coins")}: {this.state.accumulatedCoins ? Accumulated_Coins : '0'}
          </Text>
          <View style={styles.imagecontainer}>
            <Image source={coin} style={styles.coinstyle} />
          </View>
        </View>
      </View>
    );
  };

  renderPackages = ({item,index}:any) =>(
    <TouchableOpacity
              testID="testButton2"
              onPress={() => this.onButtonClick(item,index)}
              style={[styles.choosecoinContainer,{borderColor: item.isSelected? "#FFC925":"#ccc" }]}
              disabled={this.state.isCoinsWorth}
            >
              <View style={styles.coincontainer}>
                <View style={styles.imagecontainervalue}>
                  <Image source={coin} style={styles.coinstyle} />
                </View>
                <Text
                  style={[
                    styles.headingText,
                    { fontFamily: FONTS.MontserratSemiBold }
                  ]}
                >
                  {item?.total_coins || '0'}
                </Text>
              </View>
              <Text style={[styles.headingText]}>$ {item?.coins_worth_value || '0'}</Text>
            </TouchableOpacity>
  )

  exchangeamount = () => {
   const coins_worth= this.state.coins_worth
    return (
      <View>
        <View style={styles.exchangeamtContainer}>
          <View style={styles.imagecontainer}>
            <Text style={[styles.headingText,styles.leftAlign]}>{translate("exchange")}</Text>
            <Input
              testID="txtInput"
              containerStyle={{ padding: 0, paddingHorizontal: 0 }}
              inputContainerStyle={{
                padding: 0,
                paddingHorizontal: 0
              }}
              inputStyle={[styles.inputTextStyle,this.state.language=='ar'&&{
                textAlign:'right'
              }]}
              leftIconContainerStyle={{
                marginLeft: 0
              }}
              placeholder={translate("enter_number_of_coins")}
              keyboardType="numeric"
              placeholderTextColor="grey"
              maxLength={10}
              leftIcon={<Image source={coin} style={[styles.inputcoinstyle]} />}
              onChangeText={(text) => {
                if(text.charAt(0) != '0'){
                this.setState({
                  coins: text.replace(/[\D]/g, ""),
                  });
                }
                this.onClickPackage('clear')
                setTimeout(() => {
                  this.getCoinWorth(text, 'withdrawal');
                }, 1000)
              }}
              disabled={this.state.isCoinsWorth}
              value={this.state.coins}
            />
            <Text style={styles.amountTxt}>
              {translate("amount")} {this.state.coins_worth ? coins_worth : '0'}
            </Text>
          </View>


          {this.state.exchangeListPreMadePackages && this.state.exchangeListPreMadePackages.length >0 &&(
          <FlatList
            testID="flatlistId"
            data={this.state.exchangeListPreMadePackages}
            renderItem={this.renderPackages}
            style={styles.packageList}
            keyExtractor={(i:any,j:any)=>j}
            horizontal
          />
          )}

        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            testID="exchangeBtn"
            title={translate("exchange_for_Coins")}
            onPress={() => {
              if(!this.state.coins){ 
                this.setState({alertModal:{openAlertModal: true, alertMsg: translate("enter_num_coins")}})
              return
              }
              this.exchangeCoinsWorth()
            }}
            isLoader={this.state.isCoinsWorth}
            disabled={this.state.isCoinsWorth}
            TextStyle={styles.TextStyle}
            style={{ width:'100%'}}
          />
        </View>
        {/* <View style={styles.info}>
          <Text style={[styles.headingText,styles.leftAlign]}>
            {translate("By_continuing_you_agree_to_the")}{" "}
            <Text style={{ fontFamily: FONTS.MontserratExtraBold }}>
              {translate("Virtual_Item_Policy")}
            </Text>
            {translate("this_exchange_is_not_eligible_for_a_redund")}
          </Text>
        </View> */}
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <TouchableWithoutFeedback
        testID="testButton5"
        onPress={() => {
          this.hideKeyboard();
        }}
      >
        <SafeAreaView style={styles.container}>
          {this.header()}
          {this.balance()}
          {this.exchangeamount()}
                  <AlertModal  alertModal={this.state.alertModal} onPress2={()=>{this.setState({alertModal:{openAlertModal:false}})}}
           btnTitle2={(this.state.alertModal.alertMsg === translate("insufficient_coin_bal") || this.state.alertModal.alertMsg === translate("enter_num_coins")) ? translate("ok") : "OK"} />
        </SafeAreaView> 

      </TouchableWithoutFeedback>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650
  },
  packageList: {
    alignSelf:"flex-start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Scale(15),
    height: Scale(40),
    width: "100%",
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10
  },

  backarrowStyle: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: "contain"
  },
  backArrow_ar: {
    transform:[{rotate:"180deg"}]
  },
  amountTxt: {
    marginTop: Scale(8),
    textAlign: "left"
  },
  backarrowContainer: {
    width: Scale(20),
    height: Scale(18),
    resizeMode: "contain"
  },
  headerText: {
    fontSize: Scale(18),
    fontFamily: FONTS.MontserratSemiBold
  },
  leftAlign: {
    textAlign:"left"
  },
  balanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Scale(40)
  },
  headingText: {
    fontSize: Scale(14),
    fontFamily: FONTS.MontserratRegular
  },
  balanceamt: {
    fontSize: Scale(45),
    fontFamily: FONTS.MontserratExtraBold,
    paddingVertical: Scale(10)
  },
  coincontainer: {
    flexDirection: "row"
  },
  coinstyle: {
    width: Scale(25),
    height: Scale(20),
    resizeMode: "contain"
  },
  inputcoinstyle: {
    width: Scale(30),
    height: Scale(25)
  },
  imagecontainer: {
    paddingHorizontal: Scale(10),
    marginTop: Scale(-2)
  },
  imagecontainervalue: {
    marginTop: Scale(-2)
  },
  inputContainer: {
    flexDirection: "row"
  },
  button: {
    borderWidth: 1,
    borderColor: "#FFC925",
    backgroundColor: "white",
    marginTop: Scale(10),
    paddingHorizontal: Scale(145)
  },
  TextStyle: {
    color: "black"
  },
  TextStylewidraw: {
    color: "#FFC925"
  },
  buttonContainer: {
    marginTop: Scale(20),
    justifyContent: "center",
    paddingHorizontal: Scale(20)
  },
  info: {
    marginTop: Scale(20),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Scale(20)
  },
  exchangeamtContainer: {
    marginTop: Scale(20),
    paddingHorizontal: Scale(20)
  },
  inputTextStyle: {
    fontSize: 12,
    color: "black",
    marginLeft: deviceBasedDynamicDimension(10, true, 1),
    fontFamily: FONTS.MontserratRegular
  },
  containerStyle: {
    backgroundColor: "red",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    padding: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  choosecoinContainer: {
    borderRadius: Scale(10),
    height: 55,
    width: 75,
    marginTop: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    paddingRight: 10
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {}
});
// Customizable Area End
