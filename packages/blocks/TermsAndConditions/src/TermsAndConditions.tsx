import React from "react";

// Customizable Area Start
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

//@ts-ignore
import RenderHtml from 'react-native-render-html';
import Scale from "../../../components/src/Scale";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import TermsAndConditionsController, {
  Props,
  configJSON,
} from "./TermsAndConditionsController";
import { imgLeftArrow,imgRightArrow } from "./assets";
import { translate } from "../../../components/src/i18n/translate";
const htmlReg = /<\/?[a-z][\s\S]*>/i;
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

export default class TermsAndConditions extends TermsAndConditionsController {
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
  renderHeader = () => {
    const {language} = this.state;
    return (
      <>
        <View style={styles.headerStyle}>
          <TouchableOpacity
            testID="touchable1"
            style={language == "ar" ? styles.imgrightView : styles.imgLeftView}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image source={language == "ar" ? imgRightArrow : imgLeftArrow} style={styles.imgStyle} />
          </TouchableOpacity>
          <Text style={styles.titleStyle}>{translate("t_C")}</Text>
        </View>
        <View style={styles.deviceLine} />
      </>
    )
  }
  renderContentItem = () => {
    const description = this.state.termsAndServiceData?.attributes?.description || "";
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
          testID="touchable2"
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
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: deviceBasedDynamicDimension(0, true, 1),
    padding: 16
  },
  imgStyle: {
    height: "100%",
    width: "100%",
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
    fontSize: deviceBasedDynamicDimension(20, true, 1),
    marginLeft: deviceBasedDynamicDimension(30, true, 1),
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
