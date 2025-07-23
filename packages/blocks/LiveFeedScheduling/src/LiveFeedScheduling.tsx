import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image
} from "react-native";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

//@ts-ignore
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import LiveFeedSchedulingController, {
  Props,
  configJSON,
} from "./LiveFeedSchedulingController";
import { calendar, imgLeftArrow, imgRightArrow,CameraStrokeIcon,  } from "./assets";
import { COLORS } from "../../../framework/src/Globals";
import {
  deviceBasedDynamicDimension,
} from "../../../components/src/Utilities";
import { translate } from "../../../components/src/i18n/translate";
import Scale from "../../../components/src/Scale";

export default class LiveFeedScheduling extends LiveFeedSchedulingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", (e) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const { navigation } = this.props;
    const { language } = this.state;
    // Merge Engine - render - Start

    const onPressLiveEvent = () => navigation.navigate("LiveEvent");

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerTitle}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
          >
            <Image
              source={imgLeftArrow}
              style={[styles.header_icon_en,this.state.language =='ar' && styles.headerIcon]}
              testID="leftBackBtn"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.LiveTxt}>{translate("Live")}</Text>
          <View style={styles.header_icon_en} />
        </View>
        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.liveEventBtn}
          onPress={onPressLiveEvent}
          testID="liveBtn"
        >
          <Image source={calendar} style={{ height: 20, width: 20 }} />
          <Text style={styles.liveEventTxt}>{translate("live_events")}</Text>
          <View style={styles.rightArrowContainer}>
            <Image
              source={language == "ar" ? imgLeftArrow : imgRightArrow}
              style={[ language == "ar" ? styles.imgLeftView  : styles.imgrightView ,  {alignSelf: "center",
              //justifyContent: "center",
              marginBottom: deviceBasedDynamicDimension(15, true, 1)}]}
              testID="nextBtn"
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
    // marginLeft: "auto",
    // marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
  headerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Scale(16),
    marginTop: Scale(16),
    alignItems:"center"
  },
  headerIcon: {
    transform: [{ rotate: "180deg" }]
  },
  header_icon_en:{
    width: Scale(25),
    height: Scale(25),
    resizeMode: "contain",
  },
  LiveTxt: {
    fontSize: Scale(18),
    fontWeight: "bold"
  },
  liveEventBtn: {
    flexDirection: "row",
    paddingHorizontal: Scale(16),
    //marginHorizontal: 10,
    // height: 40,
    width: "100%",

    borderColor: "black",
    marginTop: 20,
  },
  liveEventTxt: {
    marginHorizontal: 10,
    fontSize: 17,
    justifyContent: "center",
  },
  rightArrowContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    //  marginHorizontal: 10,
  },
  separator: {
    borderWidth: 0.5,
    borderColor: COLORS.infoGray,
    marginTop: Scale(10),
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {}, imgrightView:{
    height: Scale(13),
    width: Scale(13),
  },
  imgLeftView:{
    height: Scale(20),
    width: Scale(20),
  },
});
// Customizable Area End
