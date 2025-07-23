import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import RenderHtml from 'react-native-render-html';
const htmlReg = /<\/?[a-z][\s\S]*>/i;
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";

import HelpCenterController, {
  Props,
  configJSON,
} from "./HelpCenterController";
import { backArrow } from "./assets";
import Scale from "../../../components/src/Scale";
import { translate } from "../../../components/src/i18n/translate";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

export default class HelpCenter extends HelpCenterController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  renderHeader = () => {
    const {language} = this.state;
    return (
      <>
        <View style={styles.headerStyle}>
          <TouchableOpacity
            testID="goBackBtn"
            onPress={() => this.props.navigation.goBack()}
          >
            <Image source={backArrow} style={[styles.backarrow_style_en, language == "ar" && styles.imgStyle_ar]} />
          </TouchableOpacity>
          <Text style={styles.titleStyle}>{translate("help_Center")}</Text>
          <View style={{ width:10 ,height:10 }}></View>
        </View>
        <View style={styles.deviceLine} />
      </>
    )
  }
  renderContentItem = () => {
    const description = this.state.helpcenterData?.attributes?.description || "";
    return (
      <View>
        {description && htmlReg.test(description) === true ? (
          <RenderHtml source={{ html: description }} tagsStyles={tagsStyles} />
        ) : (
          <Text>{description}</Text>
        )}
      </View>
    )
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View>
              {this.isPlatformWeb() ? (
                <Text
                  testID="labelTitle" //Merge Engine::From BDS
                  style={styles.title} //UI Engine::From Sketch
                >
                  {configJSON.labelTitleText}
                </Text> //UI Engine::From Sketch
              ) : null}

              <View>
                {this.renderHeader()}
                <View style={styles.subContainer}>
                  {this.renderContentItem()}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
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
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  subContainer: {
    padding: 16,
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent:'space-between'
  },
  imgStyle_ar: {
    transform: [{ rotate: "180deg" }]
  },
  backarrow_style_en: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: "contain"
  },
  imgrightView:{
    height: deviceBasedDynamicDimension(20, true, 1),
    width: deviceBasedDynamicDimension(20, true, 1)
  },
  imgLeftView:{
    height: deviceBasedDynamicDimension(30, true, 1),
    width: deviceBasedDynamicDimension(30, true, 1)
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: Scale(18),
    color: "#000000"
  },
  deviceLine: {
    borderColor: "#EEEEEE",
    borderWidth: 1,
    height: Scale(1),
  }
});
const tagsStyles = StyleSheet.create({
  p: { textAlign: 'left' }, 
});
// Customizable Area End
