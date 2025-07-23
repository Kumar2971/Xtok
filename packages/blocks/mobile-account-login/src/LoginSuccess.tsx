import React from "react";
// Customizable Area Start
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView
} from "react-native";
import { Button } from "react-native-elements";
// Customizable Area End

import LoginSuccessController, {
    Props,
} from "./LoginSuccessController";
import {imgCircleWithTick } from "./assets";
import Scale from "../../../components/src/Scale";
import { translate } from "../../../components/src/i18n/translate";

export default class LoginSuccess extends LoginSuccessController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start

    // Customizable Area End

    render() {
        // Customizable Area Start
        const {isScreenFrom} = this.state;        
        return (
            <SafeAreaView style={{ flex: 1}}>
                <View style={styles.mainContainerStyle}>
                    <View style={styles.imgView}>
                    <Image source={imgCircleWithTick} style={styles.imgStyle} resizeMode="contain" />
                    </View>
                    <Text style={styles.titleText}>{translate("congratulation_Login")}</Text>
                    <Text style={styles.textStyle}>{isScreenFrom === "Login" ? translate("loginSucess") : translate("signupSucess")}</Text>
                    <Button
                        testID="goToFeedBtn"
                        buttonStyle={[styles.signinBtnStyle]}
                        containerStyle={styles.btnContainer}
                        onPress={() => {
                            this.props.navigation.popToTop();
                            this.props.navigation.replace("BottomTabScreen")
                        }
                        }
                        title={translate("gotoFeed")}
                        titleStyle={{
                            fontWeight: "bold",
                            fontSize: 14,
                            color: "#000000",
                           // textAlign:'center',
                            //borderWidth:1
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
