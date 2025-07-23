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
import PrivacyPolicyController, {
  Props,
  configJSON,
} from "./PrivacyPolicyController";
import { deviceBasedDynamicDimension } from "../../../../components/src/Utilities";
import { imgLeftArrow, imgRightArrow } from "../assets";
import Scale from "../../../../components/src/Scale";
import { translate } from "../../../../components/src/i18n/translate";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

export default class PrivacyPolicy extends PrivacyPolicyController {
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
          testID="onPressHeader"
            style={language == "ar" ? styles.imgrightView : styles.imgLeftView}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image source={language == "ar" ? imgRightArrow : imgLeftArrow} style={styles.imgStyle} />
          </TouchableOpacity>
          <Text style={styles.titleStyle}>{translate("privacyPolicy")}</Text>
        </View>
        <View style={styles.deviceLine} />
      </>
    )
  }
  renderContentItem = () => {
    const description = this.state.privacyPolicyData || "";
    return (
      <View>
        {description && htmlReg.test(description) === true ? (
          <RenderHtml source={{ html: description }} tagsStyles={tagsStyles}/>
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
          testID="onPressFeedback"
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            
              <View>
                {this.renderHeader()}
                <View style={styles.subContainer}>
                  {this.renderContentItem()}
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
    width:"100%",
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
