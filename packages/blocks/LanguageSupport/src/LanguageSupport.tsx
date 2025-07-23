import React from "react";

// Customizable Area Start
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import FONTS from "../../../components/src/Fonts/Fonts";
import { translate } from "../../../components/src/i18n/translate";
import Scale from "../../../components/src/Scale";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import {imgChecked, imgLeftArrow } from "./assets";
let screenWidth = Dimensions.get('window').width;

//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import LanguageSupportController, {
  Props,
  configJSON,
} from "./LanguageSupportController";

export default class LanguageSupport extends LanguageSupportController {
  static styles: any;
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  renderHeader = () => {
    const {selectedLanguage} = this.state;

    return (
      <>
        <View style={styles.headerStyle}>
          <TouchableOpacity
              testID="btnGoBack"
              style={styles.arrowImgView}
              onPress={() => this.onGoBack()}
          >
              <Image source={imgLeftArrow} style={[styles.backarrow_style_en,selectedLanguage == "ar" && styles.backarrowStyle]} />
          </TouchableOpacity>
          <Text style={styles.titleStyle}>{translate("language")}</Text>
        </View>
        <View style={styles.deviceLine} />
      </>
    )
  }

  renderItem = (item:any) => {
    const {selectedLanguage} = this.state;
    const name = item.item.name;
    const code = item.item.ISOcode
    return(
      <TouchableOpacity  testID="selectLanguageBtn" style={styles.listView} onPress={() => this.selectLanguage(code)}>
        <View style={styles.renderItem}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.codeText}>{code}</Text>
        </View>
      {
        selectedLanguage === code && (
        <View style={styles.imgView}>
          <Image source={imgChecked} style={styles.imgStyle} resizeMode={"contain"} />
        </View>
        )
      }
      </TouchableOpacity>
    )
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    const {languageList} = this.state;
    return (
      <SafeAreaView style={styles.safeAreaViewSty}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.scrollViewSty}>
        <View>
            {this.renderHeader()}
        </View>
        <View style={styles.container}>
            <FlatList  
            testID="flatListFun"
              data={languageList}
              renderItem={(item:any) => this.renderItem(item) }
              keyExtractor={(item:any) => item?.index}
            />
        </View>
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
    width: "100%",
    maxWidth: 650,
    height:"100%",
    backgroundColor: "#ffffffff",
  },
  headerStyle: {
    flexDirection: "row",
		alignItems:'center',
		paddingHorizontal: Scale(15),
		height: Scale(40),
		width: '100%',
  },
  imgStyle: {
      height: "100%",
      width: "100%",
      // resizeMode: "contain"
  },
  backarrow_style_en: {
    width: Scale(25),
    height: Scale(25),
    resizeMode:"contain"
  },
  backarrowStyle: {
    transform: [{ rotate: "180deg" }]
  },
  arrowImgView:{
    height: deviceBasedDynamicDimension(25, true, 1),
    width: deviceBasedDynamicDimension(25, true, 1),
  },
 
  imgView: {
      height: deviceBasedDynamicDimension(25, true, 1),
      width: deviceBasedDynamicDimension(25, true, 1),
  },
  titleStyle: {
    fontSize:Scale(18),
    fontWeight:'bold',
	width:screenWidth-Scale(60),
	textAlign:'center'
  },
  deviceLine: {
      borderColor: "#EEEEEE",
      borderWidth: 1,
      height: Scale(1),
  },
  listView:{
    marginLeft: deviceBasedDynamicDimension(20 ,true, 1),
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingVertical:deviceBasedDynamicDimension(10 ,true, 1),
    borderBottomWidth:1,
    borderBottomColor: "#EEEEEE",
    paddingRight:deviceBasedDynamicDimension(20 , true, 1),
  },
  nameText:{
    fontSize: deviceBasedDynamicDimension(14 ,true,1),
    // fontFamily: FONTS.MontserratRegular  //Commented as per whiteboard design
  },
  codeText:{
    fontSize: deviceBasedDynamicDimension(12 ,true,1),
    // fontFamily: FONTS.MontserratRegular, //Commented as per whiteboard design
    marginTop:deviceBasedDynamicDimension(5, false, 1),
  },
  renderItem:{
    justifyContent:"flex-start",
    alignItems:"flex-start"
  },
  safeAreaViewSty:{
    flex:1
  },
  scrollViewSty:{backgroundColor:"#fff"}
});
// Customizable Area End
