import React from "react";
// Customizable Area Start
import { CommonActions } from "@react-navigation/native";
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
import { success } from "./assets";
import paymentsuccessController, {
    Props,
} from "./paymentsuccessController";
import { translate } from "../../../components/src/i18n/translate";

export default class WithdrawSuccess extends paymentsuccessController {
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
                    <Image source={success} style={styles.imgStyle} resizeMode="contain" />
                    </View>
                    <Text style={styles.titleText}>{translate("success")}</Text>
                    <Text style={styles.textStyle}>{translate("withdraw_success")}</Text>
                    <Button
                        testID="withdrawSuccess"
                        buttonStyle={[styles.signinBtnStyle]}
                        containerStyle={styles.btnContainer}
                        onPress={() =>this.props.navigation.dispatch(
                            CommonActions.reset({
                               index: 0,
                               routes: [{ name: "Home" }],
                           })
                       )}
                        title={translate("go_to_Feed")}
                        titleStyle={styles.btnTitleText}
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
        },
        textStyle: {
            fontSize:Scale(12),
            marginVertical:Scale(15),
            color:"#000",
        },
        signinBtnStyle: {
            borderRadius: Scale(50),
            height: Scale(50),
            backgroundColor: "#FFC925",
            alignItems:'center',
            justifyContent:'center',
            paddingHorizontal:Scale(70)
        },
        btnContainer: {
           alignItems:'center',
           justifyContent:'center'
        },
        btnTitleText: {
            fontSize: Scale(14),
            fontWeight: "bold",
            color:"#000",
        },
    }
    // Customizable Area End
);
