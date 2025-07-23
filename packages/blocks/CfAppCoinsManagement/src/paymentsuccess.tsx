//@ts-ignore
import React from "react";
// Customizable Area Start
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { Button } from "react-native-elements";
// Customizable Area End

import Scale from "../../../components/src/Scale";
import { fail, success } from "./assets";
import paymentsuccessController, {
    Props,
} from "./paymentsuccessController";
import { translate } from "../../../components/src/i18n/translate";

export default class paymentsuccess extends paymentsuccessController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start

    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <SafeAreaView style={{ flex: 1}}>
                <View style={styles.mainContainerStyle}>
                    <View style={styles.imgView}>
                    <Image source={this.props.route?.params?.result? success:fail} style={styles.imgStyle} resizeMode="contain" />
                    </View>
                    <Text testID="successMsg" style={styles.titleText}>{this.props.route?.params?.result
                      ? translate("success")
                      : translate("failed")}</Text>
                    <Text testID="textMsg" style={styles.textStyle}>{this.props.route?.params?.result
                      ? translate("you_have_successfully_purchased_coins_for_your_account")
                      : translate("something_went_wrong_please_try_again")}</Text>
                    <Button
                        testID="successBtn"
                        buttonStyle={[styles.signinBtnStyle]}
                        containerStyle={styles.btnContainer}
                        onPress={this.handleGoBack}
                        title={this.props.route?.params?.result
                        ? translate("go_to_Feed")
                        : translate("try_Again")}
                        titleStyle={{
                            fontWeight: "bold",
                            fontSize: 14,
                            color: "#000000",
                        }}
                    />
                </View>
            </SafeAreaView>

        );
        // Customizable Area End
    }
}

const styles = StyleSheet.create(
    {
        // Customizable Area Start
        mainContainerStyle: {
            //flex:1,
            backgroundColor: "#ffffff",
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        },
        imgView: {
            height: Scale(150),
            width: Scale(150),
            marginBottom:Scale(30)
        },
        imgStyle: {
            height: "100%",
            width: "100%",
            resizeMode: "contain"
        },
        titleText: {
            fontSize: Scale(20),
            fontWeight: "bold",
            color:"#000",
            // fontFamily: FONTS.MontserratSemiBold
        },
        textStyle: {
            fontSize:Scale(12),
            marginVertical:Scale(15),
            color:"#000",
            // fontFamily: FONTS.MontserratRegular
        },
        signinBtnStyle: {
            borderRadius: Scale(50),
            height: Scale(50),
         //   width: 100,
            backgroundColor: "#FFC925",
            alignItems:'center',
            justifyContent:'center',
            paddingHorizontal:Scale(70)
        },
        btnContainer: {
           // marginVertical: 10,
           alignItems:'center',
          // borderWidth:1,
          // borderColor:"red",
           justifyContent:'center'
        },
    }
    // Customizable Area End
);
