import React from "react";
// Customizable Area Start
import Scale from "../../../components/src/Scale";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";
import FONTS from '../../../components/src/Fonts/Fonts';
import { DollarCoin, imgLeftArrow } from "./assets";
const { width, height } = Dimensions.get("window");
import { Input, Icon } from "react-native-elements";
import { translate } from "../../../components/src/i18n/translate";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import WithdrawMoneyController from "./withdrawMoneyController";
import { getStorageData } from "framework/src/Utilities";
import AlertModal from "../../../components/src/AlertModal";

export default class WithdrawMoney extends WithdrawMoneyController{
  checkLanguage = async () => {
    const lang = await getStorageData("SelectedLng");
    this.setState({language:lang});
  }
  async componentDidMount() {
    this.checkLanguage();
  }
 
  languageStyle = (isFrom:any) => {
    if(this.state.language==="ar"){
      return styles.back_arrow_ar;
    }
  }

  isEmailSelViewStyle = () => {
    if(this.state.isEmailSel){
      return styles.toggleSelectedStyle;
    }
  }

  isEmailSelTextStyle = () => {
    if(this.state.isEmailSel){
      return styles.toggleSelTextstyle;
    }
  }
  
  isEmailSelViewStyleTwo = () => {
    if(!this.state.isEmailSel){
      return styles.toggleSelectedStyle;
    }
  }

  isEmailSelTextStyleTwo = () => {
    if(!this.state.isEmailSel){
      return styles.toggleSelTextstyle;
    }
  }

  textInputStyle = () => {
    if(this.state.language==="ar"){
      return styles.inputTxt_Ar;
    }
  }

  errorFun = () => {
    if(this.state.errorShown){
      return <Text testID="errorMsg" style={{color:'red',marginLeft:25,fontSize:12,textAlign:"left"}}>{this.state.errorMsg}</Text>
    }
  }

  isLoader = () => {
    if(this.state.isLoader){
      return <ActivityIndicator color={'white'} size={'small'} />
    }else{
      return  <Text style={styles.buttonText}>{translate("withdraw")}</Text>
    }
  }

  render(){
    return (
      <View style={styles.container}>
       <SafeAreaView style={{ flex: 1 }}>
         <View style={[styles.headercontainer, styles.divider]}>
           <TouchableOpacity testID="backButton" onPress={()=> this.onClickBackIcon()}>
             <Image source={imgLeftArrow} style={[styles.backarrow_style,this.languageStyle("arrow")]} />
           </TouchableOpacity>
           <Text style={[styles.headerText, { fontFamily: FONTS.MontserratRegular }]}>{translate("Withdraw_Money")}</Text>
           <View/>
         </View>

         <View style={styles.withdrawalAmountCardStyle}>
           <Text style={[{fontFamily: FONTS.MontserratRegular, fontWeight:'600'}]}>{translate("Withdrawal_amount")}</Text>
           <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginVertical:10}}>
             <Image source={DollarCoin} style={styles.icon} />
             <Text style={{fontSize: 14}}>{this.state.isCoinValue || '--'}</Text>
           </View>
       </View>
       <View style={{padding:10, flex:1}}>
         <View style={styles.rowCenter}>
           <TouchableOpacity 
            testID="selectEmail"
            onPress={()=>{
              this.toggleChange('email')
            }}
            style={[styles.toggleLeftStyle,this.isEmailSelViewStyle()]}
          >
            <Text style={[styles.toggleTextstyle,this.isEmailSelTextStyle()]}>{translate("e_mail")}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            testID="selectMobile"
            onPress={()=>{
             this.toggleChange('mobile')
            }}
            style={[styles.toggleRightStyle,this.isEmailSelViewStyleTwo()]}>
            <Text style={[styles.toggleTextstyle,this.isEmailSelTextStyleTwo() ]}>{translate("Phone")}</Text>
          </TouchableOpacity>
        </View>
        {this.state.isEmailSel ?(
          <Input
            testID="txtInputEmail"
            containerStyle={styles.containerStyle}
            inputContainerStyle={false ? styles.inputFocusedContainerStyle : styles.inputContainerStyle}
            inputStyle={[styles.inputTextStyle,this.textInputStyle()]}
            placeholder={translate("email_address")}
            placeholderTextColor="grey"
            leftIcon={
              <Icon name="mail" type="MaterialIcons" color='grey'size={18} style={styles.leftIcon}/>
            }
            onChangeText={(text:any) => this._handleInputChange('email', text)}
            editable={!this.state.isLoader}
            keyboardType="email-address"
            value={String(this.state.email)}
          />
        ):(
          <Input
          testID="txtInputPhoneNumber"
          containerStyle={styles.containerStyle}
          inputContainerStyle={false ? styles.inputFocusedContainerStyle : styles.inputContainerStyle}
          inputStyle={[styles.inputTextStyle, this.textInputStyle() ]}
          placeholder={translate("mobile_number")}
          placeholderTextColor="grey"
          leftIcon={
            <Icon name="smartphone" type="MaterialIcons" color='grey'size={18} style={styles.leftIcon} />
          }
          onChangeText={(text:any) => this._handleInputChange('mobileNo', text)} 
          editable={!this.state.isLoader}
          keyboardType="number-pad"
          value={String(this.state.mobileNo)}
          maxLength={10}
          returnKeyType="done"
        />
        )}
        {this.errorFun() }
         <TouchableOpacity
            testID="SubmitButton"
            style={styles.submitButtonNew}
            onPress={()=>{
              if(!this.state.isLoader){
                this.onClickButton()
              }
            }}
            disabled={this.state.isLoader}
          >
            {this.isLoader()}
          </TouchableOpacity>
          </View>
          <AlertModal
          alertModal={this.state.alertModal}
          onPress2={() => {
            this.setState({ alertModal: { openAlertModal: false, alertMsg: "" } });
          }}
          btnTitle2={"OK"}
        />
      </SafeAreaView>
    </View>
    );
}
}
// Customizable Area Start
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    padding: 0,
    justifyContent: 'flex-start',
    alignItems: "flex-start",
    paddingTop:30
  },
  inputContainerStyle: {
    borderBottomColor: "transparent",
    width: "100%",
    backgroundColor: "rgbargb(238,238,238)",
    borderRadius: deviceBasedDynamicDimension(10, true, 1),
    height: deviceBasedDynamicDimension(50, false, 1),
    marginTop: deviceBasedDynamicDimension(10, false, 1),
    marginHorizontal: 0,
    paddingHorizontal: 10,
  },
  inputFocusedContainerStyle: {
    backgroundColor: "#FFFBEE",
    borderRadius: deviceBasedDynamicDimension(10, true, 1),
    height: deviceBasedDynamicDimension(50, false, 1),
    borderColor: "#FFC925",
    marginTop: deviceBasedDynamicDimension(10, false, 1),
    borderWidth: 1
  },
  inputTextStyle: {
    fontSize: 12,
    color: 'black',
    marginLeft: deviceBasedDynamicDimension(10, true, 1),
  },
  inputTxt_Ar: {
    textAlign: "right"
  },
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: '#FAFAFA'
  },
  headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: Scale(15),
    height: Scale(40),
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
  },
  headerText: {
    fontSize: Scale(18),
    fontFamily: FONTS.MontserratBold,
    fontWeight: "bold",
  },
  backarrow_style: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: "contain",
  },
  back_arrow_ar: {
    transform:[{rotate:"180deg"}]
  },
  icon: {
    width: Scale(20),
    height: Scale(20),
    resizeMode: "contain",
    marginRight: 5
  },
  divider: {
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 5,
    paddingBottom: 10
  },
  withdrawalAmountCardStyle: {
    margin: 20,
    paddingHorizontal: 10,
    paddingVertical:5,
    borderColor: '#C9C9C9',
    borderWidth: 0,
    flexDirection:'row',
    alignItems:"center",
    justifyContent:'space-between',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#C9C9C9",
    shadowOpacity: 1.0,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    width: '100%',
    fontSize: 14,
    paddingTop: 4,
    paddingLeft: 5
  },
  rowCenter:{ 
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  toggleLeftStyle:{ 
    width: 100, 
    paddingVertical: 10, 
    alignItems: 'center', 
    borderTopLeftRadius: 100, 
    borderBottomLeftRadius: 100, 
    borderTopWidth: 0.5, 
    borderLeftWidth: 0.5, 
    borderBottomWidth: 0.5, 
    backgroundColor: '#fff', 
    borderColor: '#f1f1f1', 
  },
  toggleRightStyle:{ 
    width: 100, 
    paddingVertical: 10, 
    alignItems: 'center', 
    borderTopRightRadius: 100, 
    borderBottomRightRadius: 100, 
    borderTopWidth: 0.5, 
    borderRightWidth: 0.5, 
    borderBottomWidth: 0.5, 
    backgroundColor: '#fff', 
    borderColor: '#f1f1f1'
  },
  toggleSelectedStyle:{
    backgroundColor: '#FFC925', 
    borderColor: '#FFC925',
  },
  toggleTextstyle:{ 
    fontWeight: 'bold', 
    color: '#ccc' 
  },
  toggleSelTextstyle:{
    color:'#fff'
  },
  submitButtonNew: {
    marginTop: 30,
    marginHorizontal:10,
    padding: 14,
    borderRadius: 10,
    backgroundColor:'#FFC925',
    position:'absolute',
    bottom:20, 
    alignSelf:'center',
    width:"96%"
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  leftIcon:{
    marginLeft:10
  }
});