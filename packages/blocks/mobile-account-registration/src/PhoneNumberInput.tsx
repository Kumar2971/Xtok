import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { Input, Button, SearchBar, CheckBox } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import DateTimePicker from '@react-native-community/datetimepicker';
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import { imgArrow, imgAvatar, imgBorderCircle, imgCalender, imgcheckedCircle, imgEdit, imgMail, imgsms, imgMsg, imgHide, imgPasswordVisible, imgRightArrowFull } from "./assets";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import { translate } from "../../../components/src/i18n/translate";
import AlertModal from "../../../components/src/AlertModal";
// Customizable Area End

import PhoneNumberInputController, {
  Props,
} from "./PhoneNumberInputController";

export default class PhoneNumberInput extends PhoneNumberInputController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start

  renderHeader = () => {
    return (
      <SearchBar
        platform="default"
        testID="searchBarID"
        placeholder={translate("search")}
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
        containerStyle={styles.searchContainerStyle}
        inputContainerStyle={styles.searchInputStyle}
        inputStyle={this.inputRightStyle(this.state.language)}
      />
    );
  };

  profileImage = (profileImageUrl: any) => {
    if (profileImageUrl !== "") {
      return (
        <Image
          source={{ uri: profileImageUrl }}
          style={styles.imgAvtarStyle}
        />
      )
    } else {
      return (
        <Image
          source={imgAvatar}
          style={styles.imgAvtarStyle}
        />
      )
    }
  }

  fullNameErrorMsg = (errors:any) => {
    const {language} = this.state;
    if(errors?.fullName?.message){
      return <Text style={[styles.errorText, language == "ar" && styles.alignAr]}>{errors.fullName.message}</Text>
    }else{
      return <View />
    }
  }

  userNameErrorMsg1 = (errors:any) => {
    const {language} = this.state;
    if(errors?.userName?.message){
      return <Text style={[styles.errorText, language == "ar" && styles.alignAr]}>{errors.userName.message}</Text>
    }else{
      return <View />
    }
  }

  userNameErrorMsg2 = () => {
    const {language} = this.state;
    if(this.state.userNameErrorMsg){
      return <Text style={[styles.errorText, language == "ar" && styles.alignAr]}>{this.state.userNameErrorMsg}</Text> 
    }else{
      return <View />
    }
  }

  emailErrorMsg1 = (errors:any) => {
    const {language} = this.state;
    if(errors?.email?.message){
      return <Text style={[styles.errorText, language == "ar" && styles.alignAr]}>{errors.email.message}</Text>
    }else{
      return <View />
    }
  }

  emailErrorMsg2 = () => {
    const {language} = this.state;
    if(this.state.errorMsg){
      return <Text style={[styles.errorText, language == "ar" && styles.alignAr]}>{this.state.errorMsg}</Text> 
    }else{
      return <View />
    }
  }

  mobileErrorMsg1 = (errors:any) => {
    const {language} = this.state;
    if(errors?.mobileNo?.message){
      return <Text style={[styles.errorText, language == "ar" && styles.alignAr]}>{errors.mobileNo.message}</Text>
    }else{
      return <View />
    }
  }

  mobileErrorMsg2 = () => {
    const {language} = this.state;
    if(this.state.errorMsgMob){
      return <Text style={[styles.errorText, language == "ar" && styles.alignAr]}>{this.state.errorMsgMob}</Text> 
    }else{
      return <View />
    }
  }

  dobErrorMsg = (errors:any) => {
    const {language} = this.state;
    if(errors?.dob?.message){
      return <Text style={[styles.errorText, language == "ar" && styles.alignAr]}>{errors.dob.message}</Text>
    }else{
      return <View />
    }
  }

  passwordErrorMsg1 = (errors:any) => {
    const {language} = this.state;
    if(errors?.password?.message){
      return <Text style={[styles.errorText, language == "ar" && styles.alignAr]}>{errors.password.message}</Text>
    }else{
      return <View />
    }
  }

  existErrorMsg = () => {
    const {language} = this.state;
    if(this.state.existErrorMsg){
      return <Text style={[[styles.errorText, language == "ar" && styles.alignAr], { marginTop: 20, textAlign: "center" }]}>{this.state.existErrorMsg}</Text>
    }else{
      return <View />
    }
  }

   termsConditionError = () => {
    const {language} = this.state;
    if(this.state.errors.termsCondition && !this.state.agreeTermsCondition){
      return <Text testID="T&CErrorText" style={[[styles.errorText, language == "ar" && styles.alignAr]]}>Please accept the terms and conditions to continue.</Text>
    }
    return null;
  }

  alreadyAccount = ()=>{
    if(this.state.existErrorMsg){
      return  <Text style={styles.modalText}>{translate("alreadyAccount")}<Text style={styles.loginTxt} onPress={() => this.props.navigation.navigate("Login")}>{translate("login")}</Text></Text>
    }else{
      return <View />
    }
  }

  buttonStyle= () => {
    const {  fullName, userName, dob, mobileNo, password, email } = this.state;
    if(fullName !== "" && userName !== "" && dob !== "" && mobileNo !== "" && password !== "" && email !== ""){
      return styles.filledSigninBtn;
    }else{
      return styles.signInBtn;
    } 
  }

  renderItem = (item: any) => {
    const { countryCodeSelected } = this.state;
    return (
      <>
        <TouchableOpacity testID="countrySelectBtn" style={[styles.listitemStyle, countryCodeSelected?.item?.country_name === item?.item?.country_name ? styles.selectedBorderStyle : styles.unSelectedBorderStyle]} onPress={() => this.setState({ countryCodeSelected: item, openCountryList: false })} >
          <Text style={styles.flagStyle}>{item?.item?.country_flag}</Text>
          <Text style={styles.idStyle}>{item?.item?.country_ISO_code}</Text>
          <Text style={styles.nameStyle}>{item?.item?.country_name}</Text>
          <View style={styles.circleView}>
            <Image source={countryCodeSelected?.item?.country_name === item?.item?.country_name ? imgcheckedCircle : imgBorderCircle} style={styles.imgStyle} />
          </View>
        </TouchableOpacity>
        <AlertModal alertModal={this.state.alertModal} onPress2={() => { this.setState({ alertModal: { openAlertModal: false } }) }}
          btnTitle2={"OK"} />
      </>

    )
  }

  onPressContinue = () => {
    if(this.state.selectedAccount == "SMS"){
      return this.postSMSOtp()
    }else{
      return this.postEmailOTP()
    }
  }

  countryData = () => {
    if(this.state.value == ""){
      return this.state.countryList;
    }else{
      return this.state.searchCountryData;
    }
  }

  selectedSMSStyle = () => {
    if(this.state.selectedAccount == "SMS"){
      return styles.selectedBorderStyle
    }else{
      return styles.unSelectedBorderStyle
    }
  }

  selectedEmailStyle = () => {
    if(this.state.selectedAccount == "Email"){
      return styles.selectedBorderStyle
    }else{
      return styles.unSelectedBorderStyle
    }
  }

  listEmptyComponentCountry = () => (
    <Text style={styles.noDatatext}>{this.state.apiCallLoader ? translate("loading") : translate("data_not_found")}</Text>
  )

  sendOtpStyle = () => {
    if(this.state.selectedAccount){
      return "#FFC925";
    }else{
      return "#fff";
    }
  }

  arrowImage = () => {
    if(this.state.language == "ar" ){
      return imgRightArrowFull;
    }else{
      return imgArrow;
    }
  }

  mobileLeftIcon = (countryCodeSelected:any) => {
    return(
      <TouchableOpacity testID="countryBtn" onPress={() => this.setState({ openCountryList: true })} style={styles.flagView} >
        <Text style={styles.flagText}>{countryCodeSelected?.item?.country_flag}</Text>
        <AntDesign name={"down"} size={18} style={styles.iconStyle} color="#000" />
        <Text style={styles.codeText}>{"+" + countryCodeSelected?.item?.country_code ? countryCodeSelected?.item?.country_code : ""} </Text>
      </TouchableOpacity>                  
    )
  }

  headerArrow = (language:string) => {
    if(language == "ar"){
      return imgRightArrowFull
    }else{
      return imgArrow
    }
  }

  inputRightStyle = (language:any) => {
    if(language == "ar" ){
      return styles.inputTextRight;
    }
  }

  // Customizable Area End
  render() {
    // Customizable Area Start
    const { hidePassword, errors, profileImageUrl, fullName, userName, dob, mobileNo, password, email, countryCodeSelected, selectedAccount, language } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.select(
          {
            ios: "padding",
            android: undefined
          }
        )}
        style={styles.keyboardPadding}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            keyboardShouldPersistTaps="always"
            style={
              styles.containerMobile
            }
          >

            <TouchableWithoutFeedback
              testID="Background"
              onPress={() => {
                this.hideKeyboard();
              }}
            >
              <View style={styles.mainVIew}>
                <View style={styles.headerStyle}>
                  <TouchableOpacity testID={'backBtn'} style={styles.imgView} onPress={() => this.props.navigation.goBack()}>
                    <Image source={this.headerArrow(language)} style={styles.imgStyle} />
                  </TouchableOpacity>
                  <Text style={styles.titleStyle}>{translate("fillProfile")}</Text>
                </View>
                <View style={styles.profileView}>
                  <View style={styles.imageView}>
                    {this.profileImage(profileImageUrl)}
                  </View>
                  <TouchableOpacity testID={"goImagePickerBtn"}
                    style={[styles.imgView, styles.absoluteImgView,
                    this.state.language == "ar" ?
                      { left: MergeEngineUtilities.deviceBasedDynamicDimension(120, true, 1) } :
                      { right: MergeEngineUtilities.deviceBasedDynamicDimension(120, true, 1) }]}
                    onPress={() => this.goImagePicker()}>
                    <Image source={imgEdit} style={styles.imgStyle} />
                  </TouchableOpacity>
                </View>

                <View style={styles.formView}>
                  <Input
                    testID={'FullNameInput'}
                    containerStyle={styles.containerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={[styles.inputTextStyle, this.inputRightStyle(language)]}
                    placeholder={translate("fullName")}
                    placeholderTextColor="grey"
                    onChangeText={text => (
                      this.onFullnameChange(text)
                    )}
                    value={String(fullName)}
                    maxLength={30}
                  />
                  {this.fullNameErrorMsg(errors)}
                  <Input
                    testID={'UserNameInput'}
                    containerStyle={styles.containerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={[styles.inputTextStyle, this.inputRightStyle(language)]}
                    placeholder={translate("username")}
                    placeholderTextColor="grey"
                    onChangeText={text => (
                      this.onUserNameChange(text)
                    )}
                    value={String(userName)}
                    maxLength={30}
                  />
                  {this.userNameErrorMsg1(errors)}
                  {this.userNameErrorMsg2()}
                 
                  <TouchableOpacity onPress={() => this.setShowDatePicker()} testID="touchDateOfBirth"
                    style={[
                      // styles.inputView
                    ]}
                  >
                    <Input
                      testID={"DateOfBirthInput"}
                      containerStyle={styles.containerStyle}
                      inputContainerStyle={styles.inputContainerStyle}
                      inputStyle={[styles.inputTextStyle, this.inputRightStyle(language)]}
                      placeholder={translate("dob")}
                      placeholderTextColor="grey"
                      editable={false}
                      rightIcon={
                        <Image source={imgCalender} style={[styles.rightIcon, dob !== "" && styles.blackImg]} />
                      }
                      onChangeText={text => this._handleInputChange('dob', text)}
                      value={dob}
                    />
                  </TouchableOpacity>
                  {this.dobErrorMsg(errors)}

                  {
                    this.state.showDatePicker && Platform.OS == 'android' && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.dobObj || new Date()}
                        maximumDate={this.getPreviousDay(new Date())}
                        mode={'date'}
                        display="default"
                        onChange={this.handleDatePicked}
                      />
                    )
                  }

                  <Input
                    testID="emailInput"
                    containerStyle={styles.containerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={[styles.inputTextStyle, this.inputRightStyle(language)]}
                    placeholder={translate("email")}
                    placeholderTextColor="grey"
                    rightIcon={
                      <Image source={imgMail} style={[styles.rightIcon, email !== "" && styles.blackImg]} />

                    }
                    onChangeText={text => this._handleInputChange('email', text)}
                    value={String(email)}
                  />
                  {this.emailErrorMsg1(errors)}
                  {this.emailErrorMsg2()}

                  <Input
                    testID="mobileNoInput"
                    containerStyle={styles.containerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={[styles.inputTextStyle, this.inputRightStyle(language)]}
                    placeholder={translate("mobile")}
                    placeholderTextColor="grey"
                    leftIcon={() => this.mobileLeftIcon(countryCodeSelected) }
                    onChangeText={text => this._handleInputChange('mobileNo', text)}
                    value={String(mobileNo) || ""}
                    keyboardType="numeric"
                    maxLength={12}
                  />
                  {this.mobileErrorMsg1(errors)}
                  {this.mobileErrorMsg2()}

                  <Input
                    testID="passwordInput"
                    containerStyle={styles.containerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={[styles.inputTextStyle, this.inputRightStyle(language)]}
                    placeholder={translate(Platform.OS === "ios" ? "password" : "password_android")}
                    placeholderTextColor="grey"
                    onChangeText={text => this._handleInputChange('password', text)}
                    secureTextEntry={hidePassword}
                    value={String(password)}
                    maxLength={20}
                    rightIcon={
                      <TouchableOpacity onPress={() => this.setState({ hidePassword: !hidePassword })} testID="btnPasswordShowHide">
                        <Image source={hidePassword ? imgHide : imgPasswordVisible} style={[styles.rightIcon, password !== "" && styles.blackImg]} />

                      </TouchableOpacity>
                    }
                  />
                  {this.passwordErrorMsg1(errors)}
                  {this.existErrorMsg()}
                  {this.alreadyAccount()}
                  <View style={styles.txtView2}>
                  <CheckBox containerStyle={styles.checkBox}
                    testID="agreementID"
                    onPress={()=>{this.setState({agreeTermsCondition : !this.state.agreeTermsCondition})}} 
                    checked={this.state.agreeTermsCondition}
                    checkedColor="#FFC925"
                    uncheckedColor= {this.state.errors.termsCondition ? "red" : "gray"}
                  />
              <Text style={styles.descText}>
                {translate('by_continuing')}
                <Text
                  style={styles.privacyTerms}
                  testID="termsCondition"
                  onPress={()=>this.props.navigation.navigate('TermsAndConditions')}
                >{translate('t_C')}</Text>
                {translate('acknowledge')}
                <Text
                  style={styles.privacyTerms}
                  testID="privacyPolicy"
                  onPress={() =>this.props.navigation.navigate('PrivacyPolicy')}>
                  {translate('privacyPolicy')}</Text>{translate('learn')}
              </Text>
            </View>
            {this.termsConditionError()}
                </View>
                <Button
                  testID="SignUpBtn"
                  buttonStyle={[styles.signupBtn, this.buttonStyle()]}
                  containerStyle={styles.btnContainer}
                  onPress={() => this.signUp()}
                  title={translate("continue")}
                  titleStyle={styles.buttonTitleStyle}
                  disabled={this.state.buttonLoading}
                  loading={this.state.apiCallLoader}
                />
                {this.state.openCountryList && <View>
                  <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.openCountryList}
                    //@ts-ignore
                    testID="CountryCodeModal"
                    onRequestClose={() => {
                      this.setState({ openCountryList: false })
                    }}>
                    <View style={[styles.modalContainer, styles.modalContainerIos, styles.modelContainerBgnd]}>
                      <ScrollView contentContainerStyle={styles.modalScrollContainer} keyboardShouldPersistTaps='handled'>
                        <View style={styles.modalContent}>
                          <View style={styles.modalbody}>
                            <View style={styles.modalTitleArea}>
                              <TouchableOpacity onPress={() => this.setState({ openCountryList: false })} testID={"btnCloseSelectModal"} style={styles.imgView}>
                                <AntDesign name="close" size={20} />
                              </TouchableOpacity>
                            </View>
                            <FlatList
                              testID="CountryCodeFlatList"
                              data={this.countryData()}
                              renderItem={(item: any) => this.renderItem(item)}
                              keyExtractor={(item: any) => item.id}
                              ListHeaderComponent={this.renderHeader}
                              ListEmptyComponent={() => this.listEmptyComponentCountry()}
                            />
                          </View>
                        </View>
                      </ScrollView>
                    </View>
                  </Modal>
                </View>}
                {this.state.openVerificationModal && <View>
                  <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.openVerificationModal}
                    //@ts-ignore
                    testID={"verifyModal"}
                    onRequestClose={() => {
                      this.setState({ openVerificationModal: false })
                    }}>
                    <View style={[styles.modalContainer, styles.modalContainerIos]}>
                      <ScrollView contentContainerStyle={styles.modalScrollContainer} keyboardShouldPersistTaps='handled'>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => this.setState({ openVerificationModal: true })}
                          style={styles.modalOverlay}
                          testID={"outsidePickerModal"}
                        />
                        <View style={styles.modalContent}>
                          <View style={styles.modalbody}>
                            <View style={styles.modalTitleArea}>
                              <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={() => this.onCloseModal()} testID={"btnCloseVerifySelectModal"} style={styles.imgView}>
                                  <Image source={this.arrowImage()} style={styles.imgStyle} />
                                </TouchableOpacity>
                                <Text style={styles.modalHeaderText}>{translate("verify_Account")}</Text>
                              </View>
                              <TouchableOpacity testID="skipBtn" style={styles.skipBtn} onPress={() => this.gotoSkip()}>
                                <Text style={styles.skipText}>{translate("skip")}</Text>
                              </TouchableOpacity>
                            </View>
                            <View style={styles.descStyle}>
                              <Text style={styles.desctext}>{translate("contract")}</Text>
                            </View>
                            <TouchableOpacity testID="selectSMSBtn" style={[styles.selectView, this.selectedSMSStyle()]} onPress={() => this.setState({ selectedAccount: "SMS" })}>
                              <View style={styles.circleImgView}>
                                <Image source={imgsms} style={styles.smsImg} />
                              </View>
                              <View style={styles.rightView}>
                                <Text style={styles.greyText}>{translate("viaSMS")}</Text>
                                <Text style={styles.boldText}>{this.maskNumber()}</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity testID="selectEmailBtn" style={[styles.selectView, this.selectedEmailStyle()]} onPress={() => this.setState({ selectedAccount: "Email" })}>
                              <View style={styles.circleImgView}>
                                <Image source={imgMsg} style={styles.smsImg} />
                              </View>
                              <View style={styles.rightView}>
                                <Text style={styles.greyText}>{translate("viaEmail")}</Text>
                                <Text style={styles.boldText}>{this.maskEmail()}</Text>
                              </View>
                            </TouchableOpacity>
                            <Button
                              testID="sendOTPBtn"
                              buttonStyle={[styles.signinBtnStyle, styles.signInBtn, { marginTop: 20, backgroundColor: this.sendOtpStyle() }]}
                              containerStyle={styles.btnContainer}
                              onPress={() => this.onPressContinue()}
                              title={translate("continue")}
                              titleStyle={styles.buttonTitleStyle}
                              disabled={this.state.buttonLoading}
                              loading={this.state.apiCallLoader}
                              loadingProps={{ color: "#FFC925" }}
                            />
                          </View>
                        </View>
                      </ScrollView>
                    </View>
                  </Modal>
                </View>}
                {this.state.showDatePicker && Platform.OS == 'ios' && <View>
                  <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.showDatePicker && Platform.OS == 'ios'}
                    //@ts-ignore
                    testID="DobModal"
                    onRequestClose={() => {
                      this.setState({ showDatePicker: false })
                    }}>
                    <View style={[styles.modalContainer]}>
                      <ScrollView contentContainerStyle={styles.modalScrollContainer} keyboardShouldPersistTaps='handled'>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => this.setState({ showDatePicker: false })}
                          style={styles.modalOverlay}
                          testID="outsideDobModal"
                        />
                        <View style={styles.modalContent}>
                          <View style={styles.modalbody}>
                            <DateTimePicker
                              testID="dateTimePicker"
                              value={this.state.dobObj || new Date()}
                              maximumDate={this.getPreviousDay(new Date())}
                              mode={'date'}
                              display="spinner"
                              onChange={this.handleDatePicked}
                              style={{ height: 200 }}
                            />
                            <View style={{}}>
                              {/*//@ts-ignore */}
                              <Button
                                testID="btnCloseDobPicker"
                                title={translate("close")}
                                titleStyle={styles.buttonTitleStyle}
                                buttonStyle={[styles.continueBtn]}
                                // containerStyle={styles.userBtnContainerStyle}
                                onPress={() => { this.setState({ showDatePicker: false }) }}
                                type="outline"
                              />
                            </View>
                          </View>
                        </View>
                      </ScrollView>
                    </View>
                  </Modal>
                </View>}
                <View>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.openErrorModal}
                    onRequestClose={() => {
                      this.setState({ openErrorModal: false })
                    }}
                  >
                    <View style={styles.modalView}>
                      <View style={styles.subModalView}>
                        <Text style={styles.modalText}>{this.state.errorMsg}</Text>

                        <TouchableOpacity testID="goBacktoLoginBtn" onPress={() => this.props.navigation.navigate("Login")} style={styles.okBtn}>
                          <Text>{translate("ok")}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </SafeAreaView >
      </KeyboardAvoidingView>
    );
    // Customizable Area End
  }
}

const styles = StyleSheet.create(
  {
    // Customizable Area Start
    containerMobile: {
      flex: 1,
      // padding: 16,
      // marginLeft: "auto",
      // marginRight: "auto",
      width: "100%",
      maxWidth: 650,
      backgroundColor: "#fff",
    },
    containerWeb: {
      padding: 16,
      width: "50%",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 650,
    },
    bgRectBorder: {
      borderWidth: 1,
      borderColor: "#767676",
      borderRadius: 2,
      marginBottom: 10,
      padding: 10,
      zIndex: 999,
    },
    viewContainer: {
      zIndex: -1,
    },
    scrollViewContainer: {
      flex: 1,
      marginRight: 0,
    },
    areaMobileContainer: {},
    mainVIew: {

    },
    imgStyle: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain'
    },
    headerIconsView: {
      height: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
      width: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1)
    },
    textView: {
      marginVertical: MergeEngineUtilities.deviceBasedDynamicDimension(50, false, 1),
      width: "50%"
    },
    textStyle: {
      fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(26, true, 1),
      fontWeight: 'bold',
      color: "#000000"
    },
    containerStyle: {
      backgroundColor: "transparent",
      borderBottomColor: "transparent",
      borderTopColor: "transparent",
      padding: 0,
      justifyContent: 'flex-start',
      alignItems: "flex-start",
      height: deviceBasedDynamicDimension(75,false,1)
    },
    inputTextStyle: {
      fontSize: 14,
      color: 'black',
      marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
      textAlignVertical: "center",
      // fontFamily: FONTS.MontserratRegular
    },
    leftIconStyle: {
      height: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
      width: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
      resizeMode: 'contain',
      tintColor: "#9E9E9E"
    },
    rightIcon: {
      height: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
      width: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
      resizeMode: 'contain',
      marginRight: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
      tintColor: "#9E9E9E"
    },
    tintColor: {
      tintColor: "#FFC925"
    },
    blackImg: {
      tintColor: "#000000"
    },
    inputTextRight: {
      textAlign: "right"
    },
    inputTextRight2: {
      textAlign: "left"
    },
    inputContainerStyle: {
      width: "100%",
      backgroundColor: "rgbargb(238,238,238)",
      borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
      height: MergeEngineUtilities.deviceBasedDynamicDimension(50, false, 1),
      marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
      borderBottomColor: "transparent",
    },
    headerStyle: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
      marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
      marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),

    },
    imgView: {
      height: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
      width: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
    },
    titleStyle: {
      fontWeight: 'bold',
      fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
      marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
      // fontFamily: FONTS.MontserratBold,
      color: "#000000"
    },
    profileView: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1)
    },
    imageView: {
      justifyContent: 'center',
      alignItems: 'center',
      height: MergeEngineUtilities.deviceBasedDynamicDimension(110, true, 1),
      width: MergeEngineUtilities.deviceBasedDynamicDimension(110, true, 1),
      borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(65, true, 1),
      // borderWidth:1,
      backgroundColor: 'rgba(242, 243, 250, 1)',
    },
    imgAvtarStyle: {
      width: MergeEngineUtilities.deviceBasedDynamicDimension(125, true, 1),
      height: MergeEngineUtilities.deviceBasedDynamicDimension(125, true, 1),
      borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(125, true, 1),
      resizeMode: "contain",
    },
    absoluteImgView: {
      position: 'absolute',
      bottom: 0,
    },

    formView: {
      marginVertical: 10,
    },
    signinBtnStyle: {
      borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(50, false, 1),
      height: MergeEngineUtilities.deviceBasedDynamicDimension(50, false, 1),
      width: "98%",
      marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1)
    },
    signInBtn: {
      borderColor: "#FFC925",
      backgroundColor: "#ffffff",
      borderWidth: 1
    },
    btnContainer: {
      marginVertical: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
      width: "93%",
      alignSelf: "center",
    },
    flagView: {
      justifyContent: 'space-between',
      flexDirection: "row",
      alignItems: "center",
      marginLeft:10
    },
    flagText: {
      fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(35, true, 1),
      color: "black"
    },
    iconStyle: {
      marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(5, true, 1)
    },
    codeText: {
      fontSize: deviceBasedDynamicDimension(14, true, 1),
      marginLeft: deviceBasedDynamicDimension(5, true, 1),
      color: "grey",
      textAlignVertical: "center",
      //  fontFamily:FONTS.MontserratRegular
    },
    listitemStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
      marginBottom: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
      padding: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1)
    },
    unSelectedBorderStyle: {
      borderColor: "#EEEEEE",
    },
    selectedBorderStyle: {
      borderColor: "#FFC925",
    },
    searchContainerStyle: {
      backgroundColor: "transparent",
      padding: 0,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      marginBottom: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
    },
    searchInputStyle: {
      backgroundColor: "#EEEEEE",
      height: MergeEngineUtilities.deviceBasedDynamicDimension(50, true, 1),
      borderRadius:15
    },
    flagStyle: {
      width: "15%",
      fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(25, true, 1),
      textAlign: 'center',
      borderRadius: 10,
      color: "black"
    },
    idStyle: {
      width: "10%",
      fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
      color: "#000000",
      fontWeight: 'bold',
      // fontFamily:FONTS.MontserratSemiBold,
      alignItems: "center",
    },
    nameStyle: {
      width: "55%",
      fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
      fontWeight: 'bold',
      // fontFamily: FONTS.MontserratSemiBold
    },
    circleView: {
      height: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
      width: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1)
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      // height:"100%",
    },
    modelContainerBgnd: {
      backgroundColor: 'white'
    },
    modalContainerIos: {
      paddingTop: Platform.OS == "ios" ? 40 : 0
    },
    modalScrollContainer: {
      flexGrow: 1,
      width: "100%",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    modalContent: {
      backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    modalbody: {
      backgroundColor: "white",
      borderColor: "rgba(0,0,0,.5)",
      borderTopRightRadius: MergeEngineUtilities.deviceBasedDynamicDimension(15, true, 1),
      borderTopLeftRadius: MergeEngineUtilities.deviceBasedDynamicDimension(15, true, 1),
      padding: 20,
      // overflow: "hidden",
    },
    modalTitleArea: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-between'
    },
    skipBtn: {
      paddingVertical: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
      paddingHorizontal: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
      backgroundColor: "#FFC925",
      borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
    },
    modalHeaderText: {
      fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
      fontWeight: "bold",
      color: "black",
      marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
      // fontFamily:FONTS.MontserratBold
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
      // borderWidth:1
    },
    descStyle: {
      marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(50, false, 1),
      justifyContent: 'center',
      alignItems: 'center',
    },
    desctext: {
      width: '90%',
      textAlign: 'center',
      fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
      // lineHeight: 1,
      color: "#000000",
      // fontFamily: FONTS.MontserratRegular
    },
    selectView: {
      marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
      padding: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
      flexDirection: "row",
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1)
    },
    circleImgView: {
      borderRadius: 100,
      backgroundColor: "#EEEEEE",
      height: MergeEngineUtilities.deviceBasedDynamicDimension(70, true, 1),
      width: MergeEngineUtilities.deviceBasedDynamicDimension(70, true, 1),
      justifyContent: "center",
      alignItems: "center"
    },
    smsImg: {
      height: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
      width: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
      resizeMode: "contain"
    },
    greyText: {
      color: "#9E9E9E",
      fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
      // fontFamily:FONTS.MontserratRegular
    },
    boldText: {
      fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
      fontWeight: "bold",
      color: "#000000",
      marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
      // fontFamily:FONTS.MontserratSemiBold
    },
    rightView: {
      marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1)
    },
    continueBtn: {
      borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(50, false, 1),
      height: MergeEngineUtilities.deviceBasedDynamicDimension(50, false, 1),
      borderColor: "#FFC925",
      backgroundColor: "#ffffff",
      borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
      marginVertical: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1)
    },
    errorText: {
      color: "red",
      fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
      marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
      // fontFamily:FONTS.MontserratRegular

    },
    alignAr: {
      textAlign: 'left'
    },
    filledSigninBtn: {
      backgroundColor: "#FFC925",
    },
    signupBtn: {
      borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(50, false, 1),
      height: MergeEngineUtilities.deviceBasedDynamicDimension(50, false, 1),
      width: "100%",
      alignSelf: "center",
      justifyContent: "center",
      marginBottom: 20
    },
    modalView: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.2)",
      alignItems: "center",
      justifyContent: "center",
      width: "100%"
    },
    subModalView: {
      backgroundColor: "white",
      borderRadius: 20,
      marginHorizontal: "5%",
      padding: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
      borderWidth: 1,
      borderColor: "#FFC925"
    },
    modalText: {
      fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
      color: "black",
      textAlign: "center",
      marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(50, false, 1),
      // fontFamily: FONTS.MontserratRegular
    },
    okBtn: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFC925",
      padding: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
      borderRadius: 10,
      alignSelf: "flex-end",
      marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1)
    },
    loginTxt: {
      fontWeight: "bold",
      color: "#FFC925",
      // fontSize:deviceBasedDynamicDimension(12,true,1)
    },
    noDatatext: {
      textAlign: "center",
      marginVertical: deviceBasedDynamicDimension(30, false, 1)
    },
    keyboardPadding: { flex: 1 },
    buttonTitleStyle: {
      // fontFamily: FONTS.MontserratSemiBold,
      fontSize: 14,
      color: "#000000",
      fontWeight: "bold"
    },
    skipText: {
      // fontFamily:FONTS.MontserratSemiBold,
      fontWeight: "bold"
    },
    txtView2: {
      alignItems: 'center',
      flexDirection:"row",
      marginTop : deviceBasedDynamicDimension(25, true, 1),
      paddingHorizontal : deviceBasedDynamicDimension(5, true, 1),
    },
    checkBox: {padding:-10,},
    privacyTerms: {
      fontWeight: 'bold',
      color: '#000000',
      fontSize: 14,
    },
    descText: {
      width: '85%',
      color: '#86878B',
      fontSize: 14,
      // textAlign: "justify",
    }
  }
  // Customizable Area End
);
