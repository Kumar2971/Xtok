  import React from "react";
// Customizable Area Start
import Scale from "../../../../components/src/Scale";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform
} from "react-native";
import { Input} from "react-native-elements";
import {backArrow, imgRightArrow, imgLeftArrow} from "../assets";
// Customizable Area End
import SettingOptionsCommonController,  { Props }  from "./settingOptionsCommonController";

import { passwordValidate, deviceBasedDynamicDimension } from "../../../../components/src/Utilities";
import {imgPasswordVisible, imgHide} from ".././assets"
import { translate } from "../../../../components/src/i18n/translate";

let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
export default class ChangePassword extends SettingOptionsCommonController {
  // Customizable Area Start

  // Customizable Area End
  constructor(props: Props) {
    super(props);
  }

  topHeaderSettings = () => {
    const {language} = this.state;
    return (
      <View style={[styles.headercontainer, styles.divider]}>
        <TouchableOpacity testID="activty" onPress={() => this.props.navigation.goBack()}>
          <Image source={language == "ar" ? imgRightArrow : imgLeftArrow} style={language == "ar" ? styles.backarrow_style : styles.backarrow_style_en} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{translate("change_Password")}</Text>
      </View>
    );
  };

  changePass = () =>{

    if(this.state.confirmPassword === this.state.newPassword
      && passwordValidate("Password", this.state.newPassword).status
      && passwordValidate("Password", this.state.confirmPassword).status
      && this.state.oldPassword !== this.state.confirmPassword){
      this.changePassword()
    } else if(this.state.oldPassword === this.state.confirmPassword) {
      this.showAlert(translate("checkPassword"),'');
    }
  }

  checkButtonDisabledStatus = () => {
    if(this.state.confirmPassword !== this.state.newPassword
      || !passwordValidate("Password", this.state.newPassword).status
      || !passwordValidate("Password", this.state.confirmPassword).status
      || this.state.newPassword === ''
      || this.state.oldPassword === ''
      || this.state.confirmPassword === '')
      {
        return true
      } else {
        return false
      }
  }

  item = () => {
    const {language,errors} = this.state;
    return (
      <View style={{paddingHorizontal:Scale(15)}}>
         <View style={{flexDirection:'column'}}>
            <Text style={styles.title}>{translate("oldPassword")}</Text>
            <Input testID="oldPassword" placeholder={translate("oldPassword")} value={this.state.oldPassword}
                  containerStyle={styles.containerStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={[styles.inputTextStyle, language == "ar" && styles.inputText]}
                  onChangeText={(value) => this.setState({ oldPassword: value })}
                  maxLength={30}
                  secureTextEntry={this.state.hideOldPassword}
                  rightIcon={
                    <TouchableOpacity testID="onPressItem" onPress={() => this.setState({ hideOldPassword: !this.state.hideOldPassword })}>
                      <Image source={this.state.hideOldPassword ? imgHide : imgPasswordVisible } style={[styles.leftIconStyle, styles.rightIcon, (this.state.oldPassword !== "") && styles.blackImg]} />
                    </TouchableOpacity>
                  }
            />
         </View>
         <View style={{flexDirection:'column'}}>
            <Text style={styles.title}>{translate("newPassword")}</Text>
            <Input testID="newPassword" placeholder={translate("newPassword")} value={this.state.newPassword}
                  containerStyle={styles.containerStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={[styles.inputTextStyle, language == "ar" && styles.inputText]}
                  onChangeText={(value) => this._handleInputChange('newPassword', value)}
                  onBlur={() => this._validateNewPassword()}
                  maxLength={30}
                  secureTextEntry={this.state.hideNewPassword}
                  rightIcon={
                    <TouchableOpacity  testID="onPressNewPassword" onPress={() => this.setState({ hideNewPassword: !this.state.hideNewPassword })}>
                      <Image source={this.state.hideNewPassword ? imgHide : imgPasswordVisible } style={[styles.leftIconStyle, styles.rightIcon, (this.state.newPassword !== "") && styles.blackImg]} />
                    </TouchableOpacity>
                  }
            />
            {/* <Text style={styles.error}>{passwordValidate("Password", this.state.newPassword).message}</Text> */}
            {errors?.newPassword?.message ? <Text style={[styles.error , language == "ar" && styles.inputTextRight]}>{errors.newPassword.message}</Text> : <View />}

         </View>
         <View style={{flexDirection:'column'}}>
            <Text style={styles.title}>{translate("confirm_password")}</Text>
            <Input testID="newPassword2" placeholder={translate("newPassword")} value={this.state.confirmPassword}
                  containerStyle={styles.containerStyle}
                  inputContainerStyle={[styles.inputContainerStyle, ]}
                  inputStyle={[styles.inputTextStyle, language == "ar" && styles.inputText]}
                  onChangeText={(value) => this._handleInputChange('confirmPassword', value)}
                  maxLength={30}
                  onBlur={() => this._validateConfirmPassword()}
                  secureTextEntry={this.state.hideConfirmPassword}
                  rightIcon={
                    <TouchableOpacity onPress={() => this.setState({ hideConfirmPassword: !this.state.hideConfirmPassword })}>
                      <Image source={this.state.hideConfirmPassword ? imgHide : imgPasswordVisible } style={[styles.leftIconStyle, styles.rightIcon, (this.state.confirmPassword !== "") && styles.blackImg]} />
                    </TouchableOpacity>
                  }
            />
            {/* <Text style={styles.error}>{passwordValidate("Password", this.state.confirmPassword).message}</Text> */}
            {errors?.confirmPassword?.message ? <Text style={[styles.error , language == "ar" && styles.inputTextRight]}>{errors.confirmPassword.message}</Text> : <View />}

         </View>
         <View style={{display:'flex', justifyContent:'center', marginTop: Scale(120)}}>
          <View
              style={[
                styles.uploadButton,
                this.checkButtonDisabledStatus() && styles.uploadDisableButton,
              ]}
            >
              <TouchableOpacity 
                disabled={this.checkButtonDisabledStatus()}
                testID="upload"
                onPress={()=>this.changePass()}
              >
                { this.state.isLoading ?
              <View  >
                <ActivityIndicator size="small" color="white" />
              </View>:( <Text style={[styles.uploadButtonText]}>{translate("change")}</Text>)
              }
              </TouchableOpacity>
            </View>
         </View>
      </View>
    )
  }

  // Customizable Area Start

  // Customizable Area End
  render() {
    // Customizable Area Start
    // Customizable Area End
    return (
      <View style={styles.container}>
        <SafeAreaView>
          {/* Customizable Area Start */}
          {this.topHeaderSettings()}
          {this.item()}
          {/* Customizable Area End */}
        </SafeAreaView>
      </View>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width:"100%",
    maxWidth: 650,
  },
  headercontainer: {
    flexDirection: "row",
    alignItems:'center',
    paddingHorizontal: Scale(15),
    height: Scale(40),
    width: '100%',
  },
  headerText: {
    fontSize:Scale(18),
    fontWeight:'bold',
    width:screenWidth-Scale(60),
    textAlign:'center',
  },
  backarrow_style: {
    width: Scale(20),
    height: Scale(18),
    resizeMode: "contain",
  },
  backarrow_style_en: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: "contain",
  },

  divider: {
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  item: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginVertical:Scale(5)
  },
  title: {
    fontSize: Scale(16),
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: "left",
    marginTop: 15,
    marginHorizontal: Scale(15)
  },
  error: {
    fontSize: Scale(12),
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: "left",
    marginHorizontal: Scale(15),
    marginTop: Scale(2),
    color: '#FF0000'
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
  fontSize: 14,
  color: 'black',
  marginLeft: deviceBasedDynamicDimension(10, true, 1),
},
inputTextRight:{
  textAlign:"left"
},
inputText :{
textAlign :"right"
},
inputContainerStyle: {
  width: "100%",
  backgroundColor: "rgbargb(238,238,238)",
  borderRadius: deviceBasedDynamicDimension(10, false, 1),
  height: deviceBasedDynamicDimension(50, false, 1),
  marginTop: deviceBasedDynamicDimension(5, true, 1),
  borderColor:'black',
  borderBottomWidth:Scale(0.6),
  borderWidth: Scale(0.6),
},
leftIconStyle: {
  height: deviceBasedDynamicDimension(20 ,false,1),
  width: deviceBasedDynamicDimension(20 ,true,1),
  resizeMode: 'contain',
  tintColor: "#9E9E9E"
},
rightIcon: {
  marginRight: deviceBasedDynamicDimension(10 ,true,1)
},
blackImg: {
  tintColor: "#000000"
},
uploadButton: {
  width: "95%",
  borderRadius: 50,
  borderWidth: 0,
  borderColor: "#fff",
  paddingHorizontal:Scale(14),
  paddingVertical:Scale(12),
  backgroundColor: "#FFC924",
  position: "absolute",
  bottom: 10,
  left: "2.5%",
  shadowColor: "#ff9ba8",
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 12,
},
uploadDisableButton: {
  backgroundColor: "#ffd863",
},
uploadButtonText: {
  textAlign: "center",
  fontSize: Scale(18),
  color: "#FFFFFF",
  fontWeight: "500",
},
});
// Customizable Area End
