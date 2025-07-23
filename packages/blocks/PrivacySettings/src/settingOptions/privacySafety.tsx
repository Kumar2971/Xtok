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
  Dimensions,
  Platform
} from "react-native";
import {MaterialSymbolsNoAccounts,SwitchOff,SwitchOn, AccountStrokeIcon, LockStrokeIcon, TablerSwords, Mention, IonPeople, AccountRemove, Mute, LeaderboardIcon, imgRightArrow, imgLeftArrow} from "../assets";
// Customizable Area End
import { translate } from "../../../../components/src/i18n/translate";
import SettingOptionsCommonController ,{ Props } from "./settingOptionsCommonController";
import { getStorageData } from "../../../../framework/src/Utilities";
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
export default class PrivacySafety extends SettingOptionsCommonController {
  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    const language = await getStorageData("SelectedLng");
    this.setState({language:language})
    this.getAccountSettings();
  this.props.navigation.addListener('focus', () => {
  this.getAccountSettings();
})
}
  // Customizable Area End
  constructor(props: Props) {
    super(props);
  }

  topHeaderSettings = () => {
    const {language} = this.state;
    return (
      <View style={[styles.headercontainer, styles.divider]}>
        <TouchableOpacity testID="privacySetting" onPress={() => this.props.navigation.navigate('PrivacySettings')}>
          <Image source={language == "ar" ? imgRightArrow : imgLeftArrow} style={language == "ar" ? styles.backrightarrow_style : styles.backarrow_style} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{translate("privacy_and_Safety")}</Text>
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
          <Text style={styles.subHeaderText}>{translate("account_privacy")}</Text>
          <TouchableOpacity style={styles.item} testID="activeStatus"
            onPress={() => this.toggleSettings('active_status')}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={AccountStrokeIcon} style={[{width: Scale(20),height: Scale(20),resizeMode: "contain"}]} />
              <Text style={[styles.title]}>{translate("activity_Status")}</Text>
            </View>
            <View>
              {this.state.setActivityStatus ?
               <Image source={SwitchOn} style={styles.icon} /> :
               <Image source={SwitchOff} style={styles.icon} />
              }
            </View>
          </TouchableOpacity>
        {/*  */}
        <TouchableOpacity style={styles.item} testID="private_account"
            onPress={() => this.toggleSettings('private_account')}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={LockStrokeIcon} style={[{width: Scale(20),height: Scale(20),resizeMode: "contain"}]} />
              <Text style={[styles.title]}>{translate("private_Account")}</Text>
            </View>
            <View>
              {this.state.setPrivateAccount ?
               <Image source={SwitchOn} style={styles.icon} /> :
               <Image source={SwitchOff} style={styles.icon} />
              }
            </View>
        </TouchableOpacity>
        {/*  */}
        {/*  */}
        <TouchableOpacity style={styles.item} testID="allow_mentions"
            onPress={() => this.toggleSettings('allow_mentions')}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={Mention} style={[{width: Scale(20),height: Scale(20),resizeMode: "contain"}]} />
              <Text style={[styles.title]}>{translate("Allow_mentions")}</Text>
            </View>
            <View>
              {this.state.setMentions ?
               <Image source={SwitchOn} style={styles.icon} /> :
               <Image source={SwitchOff} style={styles.icon} />
              }
            </View>
        </TouchableOpacity>
        {/*  */}
        <View style={[styles.divider]}/>
        <Text style={styles.subHeaderText}>{translate("connections")}</Text>

        <TouchableOpacity style={styles.item} testID="Restrictedusers"
            onPress={() => {
              this.setState({setTheme: !this.state.setTheme});
              this.props.navigation.navigate('Restrictedusers');
            }
          }>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={AccountRemove} style={[{width: Scale(20),height: Scale(20),resizeMode: "contain"}]} />
              <Text style={[styles.title]}>{translate("restricted_accounts")}</Text>
            </View>
            <View>
               {this.leftArrowImage()}
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} testID="Blockedusers"
            onPress={() => {
              this.setState({setTheme: !this.state.setTheme});
              this.props.navigation.navigate('Blockedusers');
            }
          }>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={MaterialSymbolsNoAccounts} style={[{width: Scale(20),height: Scale(20),resizeMode: "contain"}]} />
              <Text style={[styles.title]}>{translate("blocked_accounts")}</Text>
            </View>
            <View>
               {this.leftArrowImage()}
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} testID="Mutedusers"
            onPress={() => {
              this.setState({setTheme: !this.state.setTheme});
              this.props.navigation.navigate('Mutedusers');
            }
          }>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={Mute} style={[{width: Scale(20),height: Scale(20),resizeMode: "contain"}]} />
              <Text style={[styles.title]}>{translate("muted_accounts")}</Text>
            </View>
            <View>
               {this.leftArrowImage()}
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} testID="accountFollow"
            onPress={() => this.navigateFollowers()}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={IonPeople} style={[{width: Scale(20),height: Scale(20),resizeMode: "contain"}]} />
              <Text style={[styles.title]}>{translate("accounts_you_follow")}</Text>
            </View>
            <View>
               {this.leftArrowImage()}
            </View>
        </TouchableOpacity>
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
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
  },
  headercontainer: {
    flexDirection: "row",
    alignItems:'center',
    paddingHorizontal: Scale(15),
    height: Scale(40),
    width: '100%',
  },
  subHeaderText: {
    color: '#A0A0A4',
    fontSize: Scale(16),
    marginBottom: Scale(5),
    textAlign: "left"
  },
  headerText: {
    fontSize:Scale(18),
    fontWeight:'bold',
    width:screenWidth-Scale(60),
    textAlign:'center',
  },
  backarrow_style: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: "contain"
  },
  backrightarrow_style: {
    width: Scale(20),
    height: Scale(20),
    resizeMode: "contain"
  },
  greyText:{
    color:"grey"
  },
  greyImg:{
    tintColor:"grey"
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
