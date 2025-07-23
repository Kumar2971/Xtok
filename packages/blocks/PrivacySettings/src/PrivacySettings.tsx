import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  ImageProps,
} from "react-native";
import styles from "../src/PrivacySettingsBlockStyle";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
//@ts-ignore
import i18n from "i18n-js";
import {
  AccountStrokeIcon,
  CameraStrokeIcon,
  WalletStrokeIcon,
  QRCodeIcon,
  BellIcon,
  BookStrokeIcon,
  LockStrokeIcon,
  PenStrokeIcon,
  QuestionStrokeIcon,
  imgRightArrow,
  imgLeftArrow,
} from "./assets";
let screenWidth = Dimensions.get('window').width; 
//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End

// Customizable Area End

import PrivacySettingsController, {
  Props,
  configJSON,
} from "./PrivacySettingsController";
import Scale from "../../../components/src/Scale";

export default class PrivacySettings extends PrivacySettingsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  ACCOUNT = [
    {
      id: "1",
      title: i18n.t("manage_My_Account"),
      image: AccountStrokeIcon,
      url: "ManageAccount",
      disable: false,
    },
    {
      id: "2",
      title:  i18n.t("privacy_and_safety"),
      image: LockStrokeIcon,
      url: "PrivacySafety",
      disable: false,
    },
    {
      id: "4",
      title: i18n.t("wallets"),
      image: WalletStrokeIcon,
      url: "Wallet",
      disable: false,
    },
    {
      id: "6",
      title: i18n.t("goLavi_code"),
      image: QRCodeIcon,
      url: "GoLaviCode",
      disable: false,
    },
    {
      id: "7",
      title: i18n.t("live"),
      image: CameraStrokeIcon,
      url: "LiveFeedScheduling",
      disable: false,
    },
  ];

  GENERAL = [
    {
      id: "7",
      title: i18n.t("push_notifications"),
      image: BellIcon,
      url: "PushNotifications",
      disable: false,
    },
    {
      id: "8",
      title: i18n.t("language"),
      image: BookStrokeIcon,
      url: "LanguageSupport",
      disable: false,
    },
  ];

  SUPPORT = [
    {
      id: "12",
      title: i18n.t("report_a_problem"),
      image: PenStrokeIcon,
      url: "ReportProblem",
      disable: false,
    },
    {
      id: "13",
      title:i18n.t("help_center"),
      image: QuestionStrokeIcon,
      url: "HelpCenter",
      disable: false
    },
  ];
 
  topHeaderSettings = () => {
    const {language} = this.state;
    return (
      <View style={[styles.headercontainer, styles.divider]}>
        <TouchableOpacity testID="profile" onPress={this.navigateToProfile}>
          <Image source={language == "ar" ? imgRightArrow : imgLeftArrow}style={language == "ar" ? styles.backarrow_style : styles.backarrow_style_en} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{i18n.t("settings")}</Text>
      </View>
    );
  };
  data = (title:any) => {
    if(title == i18n.t("account_caps")){
      return this.ACCOUNT;
    }else if(title == i18n.t("general")){
      return this.GENERAL;
    }else {
      return this.SUPPORT;
    }
  }
  renderItem = ({ item }:{item:{title:string,image:ImageProps,url:string,disable:boolean}}) => (
    <TouchableOpacity 
    testID="onPressRenderItem"
    onPress={() => {
      item.url != "" && this.props.navigation.navigate(item.url);
    }}
    style={[styles.item]}
    disabled={item.disable}
  >
    <View style={[{  alignItems: "center" , flexDirection:'row'}]}>
      <Image source={item.image} style={styles.backarrow_style} />
      <Text style={[styles.title, item.disable && styles.greytext]}>{item.title}</Text>
    </View>
    <View>
      <Image
        source={this.state.language == "ar" ? imgLeftArrow : imgRightArrow}
        style={this.state.language == "ar" ? styles.imgLeftView  : styles.imgrightView  }
        resizeMode={"contain"}
      />
    </View>
  </TouchableOpacity>
  )
  FlatList = (title: string) => {
    return (
      <View style={{ paddingHorizontal: 15 }}>
        <Text
          style={{
            color: "#A0A0A4",
            fontSize: Scale(16),
            marginBottom: Scale(5),
            textAlign : this.state.language == "ar" && Platform.OS == "ios" ? "left" : "auto"
          }}
        >
          {title}
        </Text>
        <FlatList 
        testID="flatListId"
          data={this.data(title)}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    // const mail = info@cashgatetech.com;
    return (
      <ScrollView style={[styles.container]}>
        <SafeAreaView>
          {this.topHeaderSettings()}
          {/* <ScrollView> */}
            {/* <Text>`${info@cashgatetech.com}`</Text> */}
            {this.FlatList(i18n.t("account_caps"))}
            <View style={[styles.divider, { marginHorizontal: Scale(15) }]} />
            {this.FlatList(i18n.t("general"))}
            <View style={[styles.divider, { marginHorizontal: Scale(15) }]} />
            {this.FlatList(i18n.t("support"))}
          {/* </ScrollView> */}
        </SafeAreaView>
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}
