import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Platform,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Keyboard
} from "react-native";
import Scale from "../../../components/src/Scale";
import ReactNativeModal from "react-native-modal";
import { Button } from "react-native-elements";
import {
  CodeField,
  Cursor
} from "react-native-confirmation-code-field";

import { imgArrow, imgRightArrowFull } from "./assets";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import { translate } from "../../../components/src/i18n/translate";
// Customizable Area End
import OTPInputAuthController, { Props } from "./OTPInputAuthController";
export default class OTPInput extends OTPInputAuthController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    const {errors, errorMsg ,remainingTime} = this.state;
    return (
      //Merge Engine DefaultContainer
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View style={styles.mainView}>
            <View style={styles.mainView}>
              <View style={[styles.headerStyle , this.state.language == "ar" && styles.headerArabicStyle]}>
                <TouchableOpacity  testID="gotoLoginBtn" style={styles.imgView} onPress={() => this.props.navigation.navigate("Login")}>
                <Image source={this.state.language == "ar" ? imgRightArrowFull : imgArrow} style={styles.imgStyle} />
                </TouchableOpacity>
                <Text style={styles.titleStyle}>{translate("verify_Account")}</Text>
              </View>
              <ReactNativeModal isVisible={this.state.showToast}>
        <View style={styles.report_modal}>
         <View style={styles.reportModalBodyContainer}>
          <Text style={{textAlign:'center',fontSize:16}}>{this.state.toastMessage}</Text>
         </View>
         <View>
       <View style={styles.report_modal_button_container}>
       <TouchableOpacity testID="closeMd"
          style={styles.button}
          onPress={this.closeReportModal}>
            <Text style={styles.report_continue_button}>{translate("continue")}</Text>
        </TouchableOpacity>
        </View>
         </View>
          {/* <Button title="Hide modal" onPress={handleModal} /> */}
        </View>
      </ReactNativeModal>
              <View style={styles.middleView}>
              <Text style={styles.textStyle}>{translate("code_sent")}{`${this.state.verifyWith}`}</Text>
                <CodeField 
                  // ref={ref}
                  // {...props}
                  value={this.state.otp}
                  onChangeText={(value: any) => {
                    const otp = value.replace(/[^0-9]/g, "");
                    this.setState({ otp: otp, errors: {}, errorMsg: null });
                  }}
                  cellCount={this.CELL_COUNT}
                  rootStyle={{flexDirection:"row"}}
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
                {this.state.errors.otp?.message ? <Text style={[styles.errorText]}>{this.state.errors.otp.message}</Text> : <View />}
                {this.state.errorMsg ? <Text style={[styles.errorText]}>{this.state.errorMsg}</Text> : <View />}
                <View style={styles.resendView}>
                {this.state.remainingTime > 0 &&
					      <Text style={styles.textStyle}>{translate("resendcode")} <Text style={[styles.textStyle, {color: '#FFC925'}]}>{this.state.remainingTime } </Text>{translate("second")}</Text>}
                 {this.state.remainingTime <= 0 && <TouchableOpacity  testID="resendOTPBtn"
                 disabled={this.state.remainingTime !== 0 ? true : false} 
                 onPress={() => this.state.selectedAccount == "SMS" ? this.resendMobileOTP() : this.resendEmailOTP()} >
                    <Text style={styles.resendBtnText}>
                    {translate("resendOTP")}
                    </Text>
                  </TouchableOpacity>}
                </View>
              </View>
            </View>
            <Button testID="submitOTPBtn"
              buttonStyle={[styles.signinBtnStyle, styles.signInBtn]}
              containerStyle={styles.btnContainer}
              onPress={() => this.state.selectedAccount == "SMS" ? this.submitOTPSMS() : this.subMitOTPEmail()}
              title={translate("verify")}
              titleStyle={{
                fontWeight: "bold",
                fontSize: 14,
                color: "#000000",
                // fontFamily: FONTS.MontserratSemiBold
              }}
            />
          </View>
          {/* Customizable Area End */}
          {/* Merge Engine UI Engine Code */}
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: Platform.OS === "web" ? "75%" : "100%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650,
    backgroundColor: "#fff"
  },
  mainView: {
    flex: 1,
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: deviceBasedDynamicDimension(20, false, 1),
  },
  headerArabicStyle:{
marginLeft:40
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  imgView: {
    height: deviceBasedDynamicDimension(30, true, 1),
    width: deviceBasedDynamicDimension(30, true, 1),
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: deviceBasedDynamicDimension(16, true, 1),
    marginLeft: deviceBasedDynamicDimension(30, true, 1),
    color: "#000000",
    // fontFamily:FONTS.MontserratBold
  },
  otpText: {
    fontSize: deviceBasedDynamicDimension(18, true, 1),
    textAlign: "center",
    fontWeight:"bold"
    // fontFamily: FONTS.MontserratSemiBold
  },
  underlineStyleBase: {
    width: deviceBasedDynamicDimension(50, true, 1),
    height: deviceBasedDynamicDimension(50, true, 1),
    borderRadius: deviceBasedDynamicDimension(10, false, 1),
    fontSize: deviceBasedDynamicDimension(18, true, 1),
    fontWeight: "bold",
    backgroundColor: "#EEEEEE",
    margin: deviceBasedDynamicDimension(10, true, 1),
    textAlignVertical: "center",
    textAlign: "center",
    justifyContent:"center"
  },
  underlineStyleHighLighted: {
    borderColor: "#FFC925",
    borderWidth: 1
  },
  underlineStyleError: {
    backgroundColor: 'rgba(231, 58, 35, 0.2)',
    borderColor: "rgba(231, 58, 35, 1)",
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
    color: "#000000",
    // fontFamily:FONTS.MontserratRegular
  },
  signinBtnStyle: {
    borderRadius: deviceBasedDynamicDimension(50, false, 1),
    height: deviceBasedDynamicDimension(50, false, 1),
    width: "98%"
  },
  signInBtn: {
    backgroundColor: "#FFC925",
  },
  btnContainer: {
    margin: deviceBasedDynamicDimension(10, true, 1),
  },
  errorText: {
    fontSize: deviceBasedDynamicDimension(14, true, 1),
    color: "red"
  },
  resendView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  resendBtnText: {
    fontSize: deviceBasedDynamicDimension(14, true, 1),
    color: "#FFC925",
    marginHorizontal: deviceBasedDynamicDimension(10, true, 1),
    // fontFamily:FONTS.MontserratRegular
  },
  	reporModalTileContainer:{
    padding:20,
    alignItems:'center',
    justifyContent:'center',
  },
	report_continue_title:{
    color:'#000',
    fontWeight:'600',
    fontSize:18
  },
  report_modal_button_container:{
    paddingHorizontal:20,
    paddingTop:15,
    paddingBottom:Platform.OS === 'ios' ? 5 : 10,
  },
	report_continue_button:{
    color:'#000',
    fontWeight:'600',
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
  reportModalBodyContainer:{
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:20,
    paddingVertical:5,
		marginTop:20
  },
  otpStyle: {
    width: '80%',
    height: deviceBasedDynamicDimension(90, true, 1),
    alignItems: "center",
  },
  report_modal:{
    height:Scale(143),
    width:Scale(300),
    borderRadius:20 ,
    backgroundColor:'#fff',
    alignSelf:'center'
  },
});
// Customizable Area End
