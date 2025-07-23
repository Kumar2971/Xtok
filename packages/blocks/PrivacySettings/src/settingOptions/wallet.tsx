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
import {Vector,backArrow,imgRightArrow, imgLeftArrow} from "../assets"; 
import { translate } from "../../../../components/src/i18n/translate";
// Customizable Area End
import SettingOptionsCommonController  , { Props } from "./settingOptionsCommonController";
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
export default class Wallet extends SettingOptionsCommonController {
  // Customizable Area Start

  // Customizable Area End
  constructor(props: Props) {
    super(props);
  }

  topHeaderSettings = () => {
    const {language} = this.state;
    return (
      <View style={[styles.headercontainer, styles.divider]}>
        <TouchableOpacity testID="goBack" onPress={() => 
          this.props.navigation.goBack()
          }>
         <Image source={imgLeftArrow} 
         style={[styles.backarrow_style_en,this.state.language =='ar' && styles.backarrow_style]} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{translate("Wallet")}</Text>
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
          <TouchableOpacity testID="balance" style={styles.item} onPress={() => {
            this.props.navigation.navigate('Balance');
          }}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={Vector} style={{width: Scale(20),height: Scale(20),resizeMode: "contain",}} />
              <Text style={styles.title}>{translate("balance")}</Text>
            </View>
            <View>
               {this.leftArrowImage()}
            </View>
        </TouchableOpacity>
        <TouchableOpacity  testID="exchange" style={styles.item} onPress={() => { this.props.navigation.navigate("Exchange")}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={Vector} style={{width: Scale(20),height: Scale(20),resizeMode: "contain",}} />
              <Text style={styles.title}>{translate("exchange")}</Text>
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
    width:"100%",
    maxWidth: 650,
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
    transform: [{ rotate: "180deg" }]
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
