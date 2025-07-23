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
  View
} from "react-native";
import CustomButton from "../../../components/src/Custombutton";
import FONTS from "../../../components/src/Fonts/Fonts";
import { translate } from "../../../components/src/i18n/translate";
import Scale from "../../../components/src/Scale";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import { coin, imgLeftArrow } from "./assets";

//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import ExchangeController, { Props } from "./ExchangeController";

export default class Exchange extends ExchangeController {
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
    const {language} = this.state;
    return (
      <View style={styles.header}>
        <TouchableOpacity
          testID="btnExample"
          onPress={() => this.handleBackButton()}
        >
          <Image source={imgLeftArrow} 
          style={[styles.backarrowStyleEn,this.state.language =='ar' && styles.backarrowStyle]} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{translate("exchange")}</Text>
        <View />
      </View>
    );
  };
  balance = () => { 
  const totalBalance= this.state.totalBalance
  const accumulatedCoins= this.state.accumulatedCoins
   return (
      <View style={styles.balanceContainer}>
        <Text style={[styles.headingText, styles.headerBold]}>{translate("total_balance")}</Text>
        <Text testID="totalBalance" style={styles.balanceamt}>$ {this.state.totalBalance ? totalBalance : '0'}
       
        </Text>
        <View style={styles.coinconatiner}>
          <Text testID="accumulatedCoins" style={styles.headingText}>{translate("Accumulated_Coins")}: {this.state.accumulatedCoins ? accumulatedCoins : '0'}
          </Text>
          <View style={styles.imagecontainer}>
            <Image source={coin} style={styles.coinstyle} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            testID="exchangeButton"
            title={translate("exchange_for_Coins")}
            onPress={this.exchangeForCoinsFunction}
            TextStyle={styles.TextStyle}
            style={{ paddingHorizontal: Scale(110), paddingVertical: 15 }}
          />
          {/* <CustomButton
            testID="withdrawButton"
            title={translate("withdraw")}
            onPress={this.withdrawlFunction}
            style={styles.button}
            TextStyle={styles.TextStylewidraw}
          /> */}
        </View>
        {/* <View style={styles.info}>
          <Text style={styles.headingText}>
             {translate("Daily_Withdrawal_limit")}
          </Text>
          <Text style={styles.headingText}>($1000/$1000)</Text>
        </View> */}
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
        {this.header()}
        {this.balance()}
      </SafeAreaView>
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
    transform: [{ rotate: "180deg" }]
  },
  backarrowStyleEn: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: "contain"
  },
  backarrowContainer: {
    width: Scale(20),
    height: Scale(18),
    resizeMode: "contain"
  },
  headerText: {
    fontSize: Scale(18),
    // fontFamily: FONTS.MontserratSemiBold
    fontWeight: "bold",
  },
  balanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Scale(40)
  },
  headingText: {
    fontSize: Scale(12),
    fontFamily: FONTS.MontserratRegular
  },
  headerBold: {
    fontWeight: "bold"
  },
  balanceamt: {
    fontSize: Scale(45),
    fontFamily: FONTS.MontserratExtraBold,
    paddingVertical: Scale(10)
  },
  coinconatiner: {
    flexDirection: "row",
    marginLeft: Scale(30)
  },
  coinstyle: {
    width: Scale(25),
    height: Scale(20),
    resizeMode: "contain"
  },
  imagecontainer: {
    paddingHorizontal: Scale(10),
    marginTop: Scale(-2)
  },
  button: {
    borderWidth: 1,
    borderColor: "#FFC925",
    backgroundColor: "white",
    marginTop: Scale(10),
    paddingHorizontal: Scale(145),
    paddingVertical: 15
  },
  TextStyle: {
    color: "black"
  },
  TextStylewidraw: {
    color: "#FFC925"
  },
  buttonContainer: {
    marginTop: Scale(20)
  },
  info: {
    flexDirection: "row",
    marginTop: Scale(20),
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",
    paddingHorizontal: Scale(20)
  },
  imgShowhide: {}
});
// Customizable Area End
