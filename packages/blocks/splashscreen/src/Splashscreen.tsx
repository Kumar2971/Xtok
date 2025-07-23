import React from "react";
// Customizable Area Start
import { StyleSheet, Image, View, SafeAreaView } from "react-native";
import {imgOrange,imglogo } from "./assets";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
// Customizable Area End

import SplashscreenController, { Props } from "./SplashscreenController";

import { imgSplash } from "./assets";

export default class Splashscreen extends SplashscreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainer}>
        <View style={styles.logoView}>
          <Image source={imgOrange} style={styles.imgSplash} />
          <Image source={imglogo} style={styles.imglogo} />
        </View>
      </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  logoView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center"
  },
  logoText: {
    // fontSize: 42,
    // letterSpacing: 2,
    // fontWeight: "bold",
    // color: "#323441",
    // marginTop: 15
  },
  mainContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#fff"
  },
  imgSplash: {
    height: '100%',
    width: "100%"
  },
  imglogo:{
    flex:1,
    position:"absolute",
    left:0,
    top:deviceBasedDynamicDimension(100 , false, 1),
    height:"50%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
  }
});
// Customizable Area End
