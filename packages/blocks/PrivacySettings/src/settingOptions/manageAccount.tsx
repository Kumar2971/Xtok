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
  Modal,
  Dimensions,
  Platform,
  AsyncStorage
} from "react-native";
import messaging from '@react-native-firebase/messaging';

import {LockStrokeIcon,backArrow,Sleep,Information,fluentShifts,Break, imgRightArrow, imgLeftArrow} from "../assets";
// Customizable Area End
import SettingOptionsCommonController,{Props} from "./settingOptionsCommonController";
import { logoutUser } from "../../../../components/src/Utilities";
import CustomButton from "../../../../components/src/Custombutton";
import {CommonActions}from '@react-navigation/native'
import { translate } from "../../../../components/src/i18n/translate";
const { width } = Dimensions.get("window");
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
export default class ManageAccount extends SettingOptionsCommonController {
  // Customizable Area Start

  // Customizable Area End
  constructor(props: Props) {
    super(props);
    // setNavigator(props.navigation)
  }

  topHeaderSettings = () => {
    const {language} = this.state;
    return (
      <View style={[styles.headercontainer, styles.divider ]}>
        <TouchableOpacity testID="goPrivacy" onPress={() => this.props.navigation.navigate('PrivacySettings')}>
          <Image source={language == "ar" ? imgRightArrow : imgLeftArrow} style={language == "ar" ? styles.backarrow_style : styles.backarrow_style_en} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{translate("account")}</Text>
      </View>
    );
  };

  leftArrowImage = () => {
    const {language} = this.state;
    return(
      <Image source={language == "ar" ? imgLeftArrow : imgRightArrow}   style={language == "ar" ? styles.imgLeftView  : styles.imgrightView  } resizeMode={"contain"} />
    )
  }

  item = () => {
    return (
      <View style={{paddingHorizontal:Scale(15)}}>
        <TouchableOpacity  testID="itemOnPress" style={styles.item} onPress={() => {
          this.props.navigation.navigate('PersonalInformation');
        }}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={Information} style={{width: Scale(20),height: Scale(20),resizeMode: "contain",}} />
              <Text style={styles.title}>{translate("personal_information")}</Text>
            </View>
            <View>
               {this.leftArrowImage()}
            </View>
        </TouchableOpacity>
        <TouchableOpacity testID="changePass" style={styles.item} onPress={() => {
          this.props.navigation.navigate('ChangePassword');
        }}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={LockStrokeIcon} style={{width: Scale(20),height: Scale(20),resizeMode: "contain",}} />
              <Text style={styles.title}>{translate("change_password")}</Text>
            </View>
            <View>
               {this.leftArrowImage()}
            </View>
        </TouchableOpacity>
        <TouchableOpacity testID="reminder" style={styles.item} onPress={() => {
          this.props.navigation.navigate('BreakReminder');
        }} >
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={Break} style={{width: Scale(20),height: Scale(20),resizeMode: "contain"}} />
              <Text style={[styles.title]}>{translate("remind_me_to_take_a_break")}</Text>
            </View>
            <View>
                {this.leftArrowImage()}
            </View>
        </TouchableOpacity>
        <TouchableOpacity testID="bedTimeReminder" style={styles.item} onPress={() => {
          this.props.navigation.navigate('BedTimeReminder');
        }}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={Sleep} style={{width: Scale(20),height: Scale(20),resizeMode: "contain",}} />
              <Text style={[styles.title]}>{translate("Remind_me_bedtime")}</Text>
            </View>
            <View>
               {this.leftArrowImage()}
            </View>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.item} onPress={() => {}} disabled>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={materialSymbols} style={{width: Scale(20),height: Scale(20),resizeMode: "contain",}} />
              <Text style={[styles.title,styles.greyText]}>{translate("video_Quality_Preferences")}</Text>
            </View>
            <View>
               {this.leftArrowImage()}
            </View>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.item} testID="yourActivity" onPress={() => this.navigateActivity()}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={fluentShifts} style={{width: Scale(20),height: Scale(20),resizeMode: "contain",}} />
              <View style={{display:'flex', flexDirection:'column'}}>
                <Text style={[[styles.title]]}>{translate("your_activity")}</Text>
              </View>
            </View>
            <View>
               {this.leftArrowImage()}
            </View>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.item} onPress={() => {}} disabled>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={Verified} style={{width: Scale(20),height: Scale(20),resizeMode: "contain",}} />
              <Text style={[styles.title,styles.greyText]}>{translate("request_Verification")}</Text>
            </View>
            <View>
               {this.leftArrowImage()}
            </View>
        </TouchableOpacity> */}
        <View style={[styles.divider]}/>
        <TouchableOpacity  testID="itemOnPress3" style={styles.item} onPress={() => {
             this.clearDeviceId()
             logoutUser("", this.props)
          }}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.title, styles.titleStyle, {fontWeight:'bold'}]}>{translate("logout")}</Text>
            </View>
            <View>
               {this.leftArrowImage()}
            </View>
        </TouchableOpacity>
        {/*  */}
        <TouchableOpacity style={styles.item} testID="visibleMd" onPress={() => this.setState({ isConfirmationModalVisible: true})}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.title, styles.titleStyle, {fontWeight: '600', color:'#FF0000'}]}>{translate("delete_Account")}</Text>
            </View>
        </TouchableOpacity>
      </View>
    )
  }
  // Customizable Area Start
  modalHeader = () => {
    return (
      <Modal
      animationType="slide"
      transparent
      visible={this.state.isConfirmationModalVisible}
      presentationStyle="overFullScreen"
      >
        <View style={styles.viewWrapper}>
            <View style={[styles.modalView, this.state.language =='ar' && {
              transform:[{translateX: Scale(width * 0.4)},{translateY: -90}]
            } ]}>
                <View style={{display:'flex', justifyContent:'center', width:'100%'}}>
                  <Text style={{display:'flex', justifyContent:'center', textAlign:'center'}}>{translate("confirmlogout")}</Text>
                </View>
                 <View style={{display:'flex', flexDirection:'row', marginVertical: Scale(10)}}>
                    <CustomButton testID="cancelBtn" title={translate("cancel")} style={{marginRight: Scale(10)}} onPress={() => this.setState({ isConfirmationModalVisible: false})} />
                    <CustomButton testID="yesBtn" title={translate("yes")} onPress={()=>this.deleteUser()} />
                 </View>
            </View>
        </View>
    </Modal>);
  };
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
          {this.modalHeader()}
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
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor:"#fff"
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
    resizeMode:"contain"
  },
  icon: {
    width:Scale(35),
    height:Scale(35),
    resizeMode: "contain"
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
    marginVertical: 8,
    marginHorizontal:14
  },
  titleStyle:{
    marginHorizontal:0
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      elevation: 5,
      transform: [{ translateX: -(width * 0.4) },
                  { translateY: -90 }],
      height: 160,
      width: width * 0.8,
      backgroundColor: "#fff",
      borderRadius: 8,
      borderColor: '#FFC925',
      borderWidth: .5
  },
  greyText:{
    color:"grey"
  },
  imgrightView:{
    height: Scale(13),
    width: Scale(13),
  },
  imgLeftView:{
    height: Scale(20),
    width: Scale(20),
  },
});
// Customizable Area End
