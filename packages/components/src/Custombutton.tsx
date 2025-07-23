import PropTypes from "prop-types";
import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Dimensions,ActivityIndicator } from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import Color from './Color'
import FONTS from "./Fonts/Fonts";
const width = Dimensions.get('window').width
interface Props {
  onPress: any;
  disabled?: boolean;
  title: string;
  style?:{};
  TextStyle?:{};
  testID?: string;
  isLoader?: boolean;
}

interface S {
}

interface SS {
}

export default class CustomButton extends BlockComponent<Props, S, SS> {
  

  render() {
    return (
        <TouchableOpacity onPress={this.props.onPress} disabled={this.props.disabled} testID={this.props.testID}>
        <View style={[styles.btnContainerStyle,this.props.style]}>
          {this.props.isLoader ? (
            <>
              <ActivityIndicator  color={"#fff"}  size={"small"} />
            </>
            ):(
              <Text style={[styles.btnTextStyle,this.props.TextStyle]}> {this.props.title} </Text>
            )}
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
    btnContainerStyle: {
      backgroundColor: Color.buttonbackground,
      paddingVertical: 10,
      paddingHorizontal: 40,
      borderRadius: 20,
    },
    btnTextStyle: {
      color: 'white',
      fontWeight:"bold",
      //fontFamily:"Poppins-Medium",
      fontSize: 15,
      //textTransform: 'uppercase',
      textAlign: 'center',
      fontFamily:FONTS.MontserratMedium 
    }
  })