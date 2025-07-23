import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from "react-native";
import FONTS from "../../../components/src/Fonts/Fonts";
import Scale from "../../../components/src/Scale";
import ReactNativeModal from "react-native-modal";
import { Button } from "react-native-elements";
//@ts-ignore
//@ts-ignore
import {
  CodeField,
  Cursor,
} from "react-native-confirmation-code-field";

import { imgArrow } from "./assets";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import { translate } from "../../../components/src/i18n/translate";
// Customizable Area End
import OTPInputAuthController, {
  Props
} from "../../otp-input-confirmation/src/OTPInputAuthController";

export default class ForgotPasswordOTP extends OTPInputAuthController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  onPressResend = () =>{
    this.state.selectedAccount == "SMS" ? this.resendMobileOTP() : this.resendEmailOTP()
  }

  render() {
    const nameToShow = this.state.selectedAccount === "SMS" ? (this.state.mobileNo || '').replace(/(\w{5})([\w.])(\w{2})/, "$1***") : (this.state.email || '').replace(/(\w{5})([\w.])(\w{2})/, "$1***@$2")
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={[{ flex: 1, backgroundColor: "#fff" }]}>
        <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={styles.contenContainer} style={styles.container}>
          <TouchableWithoutFeedback testID="hideKeyboard"
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View style={styles.mainView}>
            <View style={[{flexDirection:'row',alignItems:'center'}]}>
              <TouchableOpacity testID="login" style={styles.imgView} onPress={() => this.props.navigation.navigate("Login")}>
                <Image source={imgArrow} style={[styles.imgStyle,this.state.language =='ar' &&
                styles.rotatedArrow
              ]} />
              </TouchableOpacity>
              <Text style={styles.titleStyle}>{translate("forgot_password")}</Text>
            </View>
            <ReactNativeModal isVisible={this.state.showToast}>
              <View style={styles.report_modal}>
                <View style={styles.reportModalBodyContainer}>
                  <Text style={{ textAlign: 'center', fontSize: 16 }}>{this.state.toastMessage}</Text>
                </View>
                <View>
                  <View style={styles.report_modal_button_container}>
                    <TouchableOpacity testID="closeModal"
                      style={styles.button}
                      onPress={this.closeReportModal}>
                      <Text style={styles.report_continue_button}>{translate("continue")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* <Button title="Hide modal" onPress={handleModal} /> */}
              </View>
            </ReactNativeModal>

            <View style={[styles.middleView  ]}>
              <Text style={styles.textStyle}>{(this.state.selectedAccount == "SMS") ? `${translate("code_sent")} +${nameToShow}` : `${translate("code_sent")} ${nameToShow}`}</Text>
              <CodeField testID="otp"
                // ref={ref}
                // {...props}
                value={this.state.otp}
                onChangeText={(value: any) => {
                  const otp = value.replace(/[^0-9]/g, "");
                  this.setState({ otp: otp, errors: {}, errorMsg: null });
                  if (value.length === 4) {
                    // check otp
                  }
                }}
                cellCount={this.CELL_COUNT}
                // rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                onSubmitEditing={() => Keyboard.dismiss()}
                renderCell={({ index, symbol, isFocused }: any) => (
                  <View style={[styles.underlineStyleBase, isFocused && styles.underlineStyleHighLighted]}>
                    <Text
                      key={index}
                      style={styles.otpText}
                    // onLayout={getCellOnLayoutHandler(index)}
                    >
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
              {this.state.errors?.otp?.message ? <Text  testID="otpErrorText" style={[styles.errorText]}>{this.state.errors.otp.message}</Text> : <View testID={"emtpyError"}/>}
              {this.state.errorMsg ? <Text testID="stateErrorText" style={[styles.errorText]}>{this.state.errorMsg}</Text> : <View testID={"stateEmptyError"}/>}
              <View style={styles.resendView}>
                {this.state.remainingTime > 0 &&
                  <Text style={styles.textStyle}>{translate("resendcode")+ ' '}<Text style={[styles.textStyle, { color: '#FFC925' }]}>{this.state.remainingTime} </Text>s</Text>}
                {this.state.remainingTime <= 0 && <TouchableOpacity
                    testID="resendOtpTouch"
                    disabled={this.state.remainingTime !== 0} onPress={this.onPressResend} >
                  <Text style={styles.resendBtnText}>
                    {translate("resendOTP")}
                  </Text>
                </TouchableOpacity>}

              </View>
            </View>
          <Button testID="newPassword"
            buttonStyle={[styles.signinBtnStyle,this.state.otp == ""?styles.emptyOtp: styles.signInBtn]}
            containerStyle={styles.btnContainer}
            onPress={() => {
              this.submitOtp()
              // this.props.navigation.navigate('NewPassword')
            }}
            title={`${translate("verify")}`}
            titleStyle={{
              fontWeight: "bold",
              fontSize: 14,
              color: "#000000",
              // fontFamily: FONTS.MontserratSemiBold
            }}
          />
        </View>
      </TouchableWithoutFeedback>
        </ScrollView >
        </View>
      </SafeAreaView>
    );
  }

}
// Customizable Area End

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 650,
    backgroundColor: '#fff',
  },
  contenContainer: {
    flexGrow: 1,
    padding:20,
  },
  mainView: {
    flex: 1,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: deviceBasedDynamicDimension(20, false, 1),
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  imgView: {
    height: deviceBasedDynamicDimension(30, true, 1),
    width: deviceBasedDynamicDimension(30, true, 1),
  },
  titleStyle: {
    fontWeight: 'bold',
		fontSize: 18,
		marginLeft: 15,
		color: '#000000',
		fontFamily: FONTS.MontserratBold
  },
  otpText: {
    fontSize: deviceBasedDynamicDimension(18, true, 1),
    textAlign: 'center',
    fontFamily: FONTS.MontserratSemiBold
  },
  underlineStyleBase: {
    width: deviceBasedDynamicDimension(50, true, 1),
    height: deviceBasedDynamicDimension(50, true, 1),
    borderRadius: deviceBasedDynamicDimension(10, false, 1),
    fontSize: deviceBasedDynamicDimension(18, true, 1),
    fontWeight: 'bold',
    backgroundColor: '#EEEEEE',
    margin: deviceBasedDynamicDimension(10, true, 1),
    textAlignVertical: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  underlineStyleHighLighted: {
    borderColor: '#FFC925',
    borderWidth: 1,
  },
  underlineStyleError: {
    backgroundColor: 'rgba(231, 58, 35, 0.2)',
    borderColor: 'rgba(231, 58, 35, 1)',
  },
  middleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // height: deviceBasedDynamicDimension(600, false, 1)
  },
  textStyle: {
    fontSize: deviceBasedDynamicDimension(14, true, 1),
    marginVertical: deviceBasedDynamicDimension(20, true, 1),
    color: '#000000',
    textAlign: 'center',
    // fontFamily:FONTS.MontserratRegular
  },
  signinBtnStyle: {
    borderRadius: deviceBasedDynamicDimension(50, false, 1),
    height: deviceBasedDynamicDimension(50, false, 1),
    width: '98%',
  },
  signInBtn: {
    backgroundColor: '#FFC925',
    borderWidth: 1,
    borderColor: '#FFC925',
  },
  emptyOtp:{
    backgroundColor: '#FFF',
    borderColor: '#FFC925',
    borderWidth: 1,
  },
  btnContainer: {
    margin: deviceBasedDynamicDimension(10, true, 1),
  },
  errorText: {
    fontSize: deviceBasedDynamicDimension(14, true, 1),
    color: 'red',
  },
  resendView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reporModalTileContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotatedArrow:{
    transform: [{ rotate: '180deg' }]
  },
  report_continue_title: {
    color: '#000',
    fontWeight: '600',
    fontSize: 18
  },
  report_modal_button_container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    ...Platform.select({
          ios: {
            paddingBottom: 5,
          },
          android: {
            paddingBottom: 10,
          },
  }),
  },
  report_continue_button: {
    color: '#000',
    fontWeight: '600',
  },
  button: {
    width: Scale(180),
    height: Scale(45),
    backgroundColor: "#FACC1E",
    borderRadius: Scale(50),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  reportModalBodyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 20
  },
  resendBtnText: {
    fontSize: deviceBasedDynamicDimension(14, true, 1),
    color: '#FFC925',
    marginHorizontal: deviceBasedDynamicDimension(10, true, 1),
    // fontFamily:FONTS.MontserratRegular
  },
  report_modal: {
    height: Scale(142),
    width: Scale(300),
    borderRadius: 20,
    backgroundColor: '#fff',
    alignSelf: 'center'
  },
  otpStyle: {
    width: '80%',
    height: deviceBasedDynamicDimension(90, true, 1),
    alignItems: 'center',
  },
});
// Customizable Area End
