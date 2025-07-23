import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback
} from "react-native";
//@ts-ignore
import i18n from "i18n-js";
import { Button, Input } from "react-native-elements";
import { imgArrow, imgBorderCircle, imgHide, imgLock, imgMail, imgPasswordVisible, imgPhone,imgTickFiled, imgGolavi, imgRightArrowFull } from "./assets";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
// Customizable Area End

import MobileAccountLoginController, {
  Props
} from "./MobileAccountLoginController";

export default class MobileAccountLoginBlock extends MobileAccountLoginController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  errorMsg = () => {
    const {loginWith,errors} = this.state;
   if(loginWith === "email"){
       if(errors.email?.message){
          return  <Text style={[styles.errorText,this.state.language =='ar' && styles.alignAR]}>{errors.email.message}</Text>
        }else{
          return <View/>
        }
      }else if(errors.mobileNo?.message){
          return  <Text style={[styles.errorText,this.state.language =='ar' && styles.alignAR]}>{errors?.mobileNo?.message}</Text>
        }else{
          return <View/>
        }
  }

  passwordError = () => {
    const {errors} = this.state;
    if(errors.password?.message){
      return <Text style={[styles.errorText, this.state.language =='ar' && styles.alignAR]}>{errors.password.message}</Text>
    }else{
     return <View />
    }
  }

  buttonStyle = () => {
    const { email, password, mobileNo } = this.state;
    if (email !== "" || mobileNo !== "") {
      if (password !== "") {
        return styles.filledSigninBtn
      } else {
        return styles.signInBtn
      }
    }else {
      return styles.signInBtn;
    }
  }
  inputContainerStyle = () => {
    const {isFocusedEmail, isFocusedMobile} = this.state;
    if(isFocusedEmail){
      return styles.inputFocusedContainerStyle;
    }else if(isFocusedMobile){
      return styles.inputFocusedContainerStyle;
    }else{
      return styles.inputContainerStyle;
    }
  }
  textinputFunc = () => {
    const { email, mobileNo,loginWith,isFocusedEmail,isFocusedMobile,language } = this.state;
    if(loginWith === "email"){
      return(
        <Input
          testID="txtInputEmail"
          containerStyle={styles.containerStyle}
          inputContainerStyle={this.inputContainerStyle()}
          inputStyle={[styles.inputTextStyle, language == "ar" && styles.inputTextRight ]}
          placeholder={i18n.t(Platform.OS==="ios" ? "email" : "email_android")}
          placeholderTextColor="grey"
          leftIcon={
            <Image source={imgMail} style={[styles.leftIconStyle, isFocusedEmail && styles.tintColor, email !== "" && styles.blackImg]} />
          }
          onChangeText={text => this._handleInputChange('email', text)}
          onFocus={this.handleFocusEmail}
          onBlur={this.handleBlurEmail}
          keyboardType="email-address"
          value={String(email)}
        />
      )
    }else{
      return(
        <Input
          testID="txtInputPhoneNumber"
          containerStyle={styles.containerStyle}
          inputContainerStyle={this.inputContainerStyle()}
          inputStyle={[styles.inputTextStyle, language == "ar" && styles.inputTextRight ]}
          placeholder={i18n.t(Platform.OS === "ios" ?  "mobile" : "mobile_android")}
          placeholderTextColor="grey"
          leftIcon={
            <Image source={imgPhone} style={[styles.leftIconStyle, isFocusedMobile && styles.tintColor, mobileNo !== "" && styles.blackImg]} />
          }
          onChangeText={text => this._handleInputChange('mobileNo', text)} onFocus={this.handleFocusMobile}
          onBlur={this.handleBlurMobile}
          keyboardType="phone-pad"
          value={String(mobileNo)}
        />
      )
    }
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    const { password, hidePassword, isFocusedPassword, isRemeberMe, loginWith, apiLoader,language } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            testID="Background"
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View style={styles.mainView}>
              <TouchableOpacity testID="btnGoBack" style={styles.headerIconsView} onPress={() => this.props.navigation.goBack()}>
                <Image source={language == "ar" ? imgRightArrowFull : imgArrow} style={styles.imgStyle} />
              </TouchableOpacity>
              <View style={styles.textView}>
                <Image source={imgGolavi} style={styles.logoImg} resizeMode={"contain"} />
                <Text style={styles.textStyle}>{i18n.t("loginInto")}</Text>
              </View>
              <View style={styles.formView}>
                {this.textinputFunc()}
                {this.errorMsg()}
                <Input
                  testID="txtInputPassword"
                  containerStyle={styles.containerStyle}
                  inputContainerStyle={isFocusedPassword ? styles.inputFocusedContainerStyle : styles.inputContainerStyle}
                  inputStyle={[styles.inputTextStyle, language == "ar" && styles.inputTextRight ]}
                  placeholder={i18n.t(Platform.OS==="ios" ? "password" : "password_android")}
                  placeholderTextColor="grey"
                  leftIcon={
                    <Image source={imgLock} style={[styles.leftIconStyle, isFocusedPassword && styles.tintColor, password !== "" && styles.blackImg]} />
                  }
                  rightIcon={() =>
                    <TouchableOpacity testID="btnPasswordShowHide" onPress={() => this.setState({ hidePassword: !hidePassword })}>
                      <Image source={hidePassword ? imgHide : imgPasswordVisible } style={[styles.leftIconStyle, styles.rightIcon, (isFocusedPassword || password !== "") && styles.blackImg]} />

                    </TouchableOpacity>
                  }
                  onChangeText={text => this._handleInputChange('password', text)} secureTextEntry={hidePassword}
                  onFocus={this.handleFocusPassword}
                  onBlur={this.handleBlurPassword}
                  value={String(password)}
                />
                {this.passwordError()}
                {this.state.responseErrorMsg !== null ? <Text style={[styles.errorText,this.state.language =='ar' && styles.alignAR]}>{this.state.responseErrorMsg}</Text> : <View /> }
                <View style={styles.rememberView}>
                  <TouchableOpacity testID="btnRememberMe" style={styles.imgView} onPress={() => this.toggleRememberMe()}>
                    <Image source={isRemeberMe ? imgTickFiled : imgBorderCircle} style={styles.imgStyle} />
                  </TouchableOpacity>
                  <Text style={styles.rememberText}>{i18n.t("rememberMe")}</Text>
                </View>

                <Button
                  testID="buttonSignin"
                  buttonStyle={[styles.signinBtnStyle,this.buttonStyle() ]}
                  containerStyle={styles.btnContainer}
                  onPress={() => this.signIn()}
                  title={i18n.t("signIn")}
                  titleStyle={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "#000000",
                    // fontFamily: FONTS.MontserratSemiBold
                  }}
                  loading={apiLoader ? true : false}
                />
                <Text style={styles.forgotText}>{i18n.t("forgot_password_click")}<Text onPress={() => this.goToForgotPassword()} testID="btnForgotPassword" style={styles.yellowText}>{i18n.t("click")}</Text></Text>
              </View>
              {/* <View style={styles.bottomView}>
                <View style={styles.dividerLine} />
                <Text style={styles.continueText}>{i18n.t("orContinue")}</Text>
                <View style={styles.dividerLine} />
              </View>
              <View style={[styles.bottomView, styles.otherloginView]}>
                <TouchableOpacity style={styles.otherIcons}>
                  <View style={styles.iconImgView}>
                    <Image source={imgFb} style={styles.imgStyle} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.otherIcons}>
                  <View style={styles.iconImgView}>
                    <Image source={imgGoogle} style={styles.imgStyle} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.otherIcons}>
                  <View style={styles.iconImgView}>
                    <Image source={imgApple} style={styles.imgStyle} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.otherIcons} onPress={() => this.toggleLoginWith()}>
                  <View style={styles.iconImgView}>
                    <Image source={loginWith == "email" ? imgPhone : imgMail} style={styles.imgStyle} />
                  </View>
                </TouchableOpacity>
              </View> */}
              <Text style={styles.newText}>{i18n.t("newhereText")}<Text testID="btnSignup" onPress={() => this.goToignup()} style={styles.yellowText}>{i18n.t("Sign_Up")}</Text></Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

const styles = StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1
  },
  mainView: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width:"100%",
    maxWidth: 650,
    backgroundColor: "#fff"

  },
  headerView: {
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  headerIconsView: {
    height: 30,
    width: 30
  },
  textView: {
    marginTop: deviceBasedDynamicDimension(50 , false ,1),
    justifyContent:"center",
    alignItems:"center",
    marginBottom:deviceBasedDynamicDimension(30 , false ,1),
  },
  textStyle: {
    fontSize:deviceBasedDynamicDimension(22 , true ,1),
    fontWeight: 'bold',
    color: "#000000",
    marginTop:deviceBasedDynamicDimension(20 , false ,1),
    // fontFamily: FONTS.MontserratSemiBold
  },
  formView: {
    // borderWidth:1,
    padding: 0,
    //borderWidth:1
  },
  inputContainerStyle: {
    borderBottomColor: "transparent",
    width: "100%",
    backgroundColor: "rgbargb(238,238,238)",
    borderRadius: deviceBasedDynamicDimension(10 ,true,1),
    height: deviceBasedDynamicDimension(50 ,false,1),
    marginTop: deviceBasedDynamicDimension(10 ,false,1),
    marginHorizontal: 0,
  },
  inputFocusedContainerStyle: {
    backgroundColor: "#FFFBEE",
    borderRadius: deviceBasedDynamicDimension(10 ,true,1),
    height: deviceBasedDynamicDimension(50 ,false,1),
    borderColor: "#FFC925",
    marginTop: deviceBasedDynamicDimension(10 ,false,1),
    borderWidth: 1
  },
  containerStyle: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    padding: 0,
    justifyContent: 'flex-start',
    alignItems: "flex-start",
    height: deviceBasedDynamicDimension(65,false,1)
  },
  inputTextStyle: {
    fontSize: 12,
    color: 'black',
    marginLeft: deviceBasedDynamicDimension(10 ,true,1),
    // fontFamily:FONTS.MontserratRegular
  },
  inputTextRight:{
    textAlign:"right"
  },
  leftIconStyle: {
    height: deviceBasedDynamicDimension(20 ,false,1),
    width: deviceBasedDynamicDimension(20 ,true,1),
    resizeMode: 'contain',
    tintColor: "#9E9E9E",
    marginLeft:deviceBasedDynamicDimension(10,true,1)
  },
  rightIcon: {
    marginRight: deviceBasedDynamicDimension(10 ,true,1)
  },
  tintColor: {
    tintColor: "#FFC925"
  },
  blackImg: {
    tintColor: "#000000"
  },
  rememberView: {
    flexDirection: 'row',
    alignItems: "center",
    margin: deviceBasedDynamicDimension(10 ,true,1),
    marginLeft:deviceBasedDynamicDimension(20,true,1)
  },
  imgView: {
    height: deviceBasedDynamicDimension(20 ,true,1),
    width: deviceBasedDynamicDimension(20 ,true,1)
  },
  rememberText: {
    fontSize: deviceBasedDynamicDimension(12 ,true,1),
    fontWeight: 'bold',
    marginLeft: deviceBasedDynamicDimension(10 ,true,1),
    color:"#000000",
    // fontFamily:FONTS.MontserratSemiBold
  },
  signinBtnStyle: {
    borderRadius: deviceBasedDynamicDimension(50 ,true,1),
    height: deviceBasedDynamicDimension(50 ,false,1),
  },
  signInBtn: {
    borderColor: "#FFC925",
    backgroundColor: "#ffffff",
    borderWidth: 1,
  },
  filledSigninBtn: {
    backgroundColor: "#FFC925",
  },
  btnContainer: {
    marginVertical: deviceBasedDynamicDimension(10 ,false,1),
    width: "93%",
    alignSelf:"center",
    // borderWidth:14
  },
  bottomView: {
    marginTop: deviceBasedDynamicDimension(50 ,false,1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
  },
  dividerLine: {
    borderWidth: 1,
    width: "30%",
    borderColor: "#EEEEEE"
  },
  continueText: {
    fontSize: 12,
    fontWeight: 'bold',
    color:"#000000",
    // fontFamily:FONTS.MontserratBold
  },
  alignAR:{
    textAlign:"left"
  },
  otherIcons: {
    // padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: deviceBasedDynamicDimension(15 ,false,1)
  },
  iconImgView: {
    height: deviceBasedDynamicDimension(30 ,true,1),
    width: deviceBasedDynamicDimension(30 ,true,1),
    marginHorizontal:  deviceBasedDynamicDimension(20 ,true,1),
    marginVertical:  deviceBasedDynamicDimension(10 ,true,1)
  },
  otherloginView: {
    marginVertical: deviceBasedDynamicDimension(30 ,true,1)
  },
  newText: {
    color: "#9E9E9E",
    textAlign: 'center',
    fontSize: deviceBasedDynamicDimension(10 ,true,1),
    fontWeight: 'bold',
    marginTop: deviceBasedDynamicDimension(30 ,false,1),
    // fontFamily:FONTS.MontserratSemiBold
  },
  forgotText: {
    color: "#000000",
    textAlign: 'center',
    fontSize: deviceBasedDynamicDimension(13 ,true,1),
    fontWeight: 'bold',
    marginTop: deviceBasedDynamicDimension(5 ,false,1),
    // fontFamily:FONTS.MontserratSemiBold
  },
  yellowText: {
    color: "#FFC925",
    // fontSize:deviceBasedDynamicDimension(12,true,1)
  },
  errorText: {
    color: "red",
    fontSize: deviceBasedDynamicDimension(10 ,true,1),
    marginLeft: deviceBasedDynamicDimension(12,true,1),
    // fontFamily: FONTS.MontserratRegular
  },
  logoImg:{
    height:deviceBasedDynamicDimension(100 , true ,1),
    width:deviceBasedDynamicDimension(100 , true ,1),
  }
  // Customizable Area End
});
