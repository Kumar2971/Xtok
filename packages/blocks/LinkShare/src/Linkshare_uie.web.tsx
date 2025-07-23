//This an auto generated file for Artboard Name = Linkshare And Supports ReactNative Ver. = 0.62
import { SafeAreaView, Dimensions, PixelRatio, View, Text, FlatList, SectionList, StyleSheet, Button, TouchableOpacity, Switch, Platform, Image, TextInput, Picker, ActivityIndicator, Alert, ImageBackground} from 'react-native'; 
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import React from 'react'; 
import Tabs from '@material-ui/core/Tabs'; 
import Tab from '@material-ui/core/Tab'; 
import Radio, { RadioProps } from '@material-ui/core/Radio'; 
import { createMuiTheme,MuiThemeProvider } from '@material-ui/core';

import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import global_styles from "../../utilities/src/global_styles";
let screenWidth = Dimensions.get('window').width; 
import { img34144081239bd1b276b7ddfc5127bfa1d98f3418, img455e75b20627245dd10a09115600dba9c3b32f9b, imgd237b9438b4b3e7738c3feb27e053def73fab3b0, img7d65ad2d80f4bd2ceeb42069b8f9e06bc03a250a, img6f214e95fe377b02f4d7729d21c0328f47c0f3c6, img319b7afa994ac8a81b9c4812a4a7aaa288d0fa1c, img5d8030ae13428fb10085d43448dd3b0db9c29641, imgd63a7a7f18a1d0e895c396a75af734e75613937f, img5a765537cffc114aee90856eb4792495ef94deb2, img5af4ebad825115375c13e5bbfa9db256789faf34, img1650738b933d3407037182b7a11f010cbfad3c15, imgd3a263fae57123a0c8f6de9ea8b357943a998b77, imgde252a635f16476296efaf601bcb07012cffac67, imgf0809cee394296f5ce6abdca7f5a407784e5ccee, imgf0517c7ef54a2c55f05ad5b22cbf84a3a29093a3, img9b286d72ca6f5b40e6609a0e49df7a2b8828f51d } from './assets'
let screenHeight = Dimensions.get('window').height; 
//Artboard Dimension 
let artBoardHeightOrg = 812; 
let artBoardWidthOrg = 375; 
//Re calculated Artboard Dimension 
let artBoardWidth =  isSameRatio() ? artBoardWidthOrg : screenWidth; 
let artBoardHeight =  isSameRatio() ? artBoardHeightOrg : screenHeight; 
// To check if Artboard and Device screen has same ratio 
function isSameRatio(): boolean {
    return artBoardWidthOrg / artBoardHeightOrg < 1 && screenWidth / screenHeight < 1 
}
 
//Top or Bottom nav spaces or any extra space occupied by os e.g Status bar, Notch 
let extraSpace = 0; 

 
 
export default class Linkshare extends React.Component
{
	constructor(props:any)
	{ 
		super(props);
	} 

	state = {
	}

	componentDidMount() 
	{ 
		Dimensions.addEventListener('change', (e) => { 
			
			screenWidth = Dimensions.get('window').width; 
			screenHeight = Dimensions.get('window').height; 
			this.forceUpdate();
		});
	}

	render()
	{
		const local_styles = StyleSheet.create({
    LinkshareView: {
        backgroundColor: "rgba(255, 249, 234, 1)",
        flex: 1,
        alignItems: "flex-start",
    },
    image_BitmapImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(812, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(0, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(374, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(413, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(399, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_SendToText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(161, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(420, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    attrbuted_textlabel_SendToText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(161, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(420, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_ProfilePicture: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(43, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(444, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    image_Imagenav_recomImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(43, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(43, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(17, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(444, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(74, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(444, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(132, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(444, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapCopyImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(190, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(444, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapCopy2Image: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(248, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(444, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapCopy2Image2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(306, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(444, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapCopy2Image3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(364, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(444, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    view_Vector14Stroke: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(13, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(22, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(25, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(455, false, 1),
        opacity: 1,
        backgroundColor: "rgba(0, 0, 0, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_Vector14Stroke2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(13, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(22, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(39, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(455, false, 1),
        opacity: 1,
        backgroundColor: "rgba(0, 0, 0, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_UserNameCopyText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(192, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(494, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UserNameCopyText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(192, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(494, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_UserNameCopy2Text: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(366, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(494, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UserNameCopy2Text: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(366, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(494, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_UserNameText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(57, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(495, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UserNameText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(57, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(495, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_UserNameText2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(76, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(495, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UserNameText2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(76, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(495, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_UserNameText3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(134, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(495, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UserNameText3: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(134, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(495, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_UserNameCopy2Text2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(250, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(495, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UserNameCopy2Text2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(250, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(495, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_UserNameCopy2Text3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(308, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(495, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UserNameCopy2Text3: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(308, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(495, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_ShareToText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(47, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(152, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(539, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_ShareToText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(47, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(152, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(539, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(46, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(46, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(282, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(562, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(46, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(46, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(82, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(563, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(46, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(46, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(216, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(563, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage8: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(46, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(46, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(150, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(564, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage9: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(348, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(564, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage10: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(565, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_CopyLinkText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(17, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(616, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_CopyLinkText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(17, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(616, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_MessengerText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(50, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(80, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(616, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_MessengerText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(50, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(80, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(616, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_InstagramText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(46, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(13, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(150, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(616, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_InstagramText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(46, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(13, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(150, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(616, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_MessageText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(40, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(13, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(219, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(616, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_MessageText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(40, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(13, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(219, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(616, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_SnapchatText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(43, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(283, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(616, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_SnapchatText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(43, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(283, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(616, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_SmsText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(13, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(359, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(616, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_SmsText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(13, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(359, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(616, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    image_BitmapImage11: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(658, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage12: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(81, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(659, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage13: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(148, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(659, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage14: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(206, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(659, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage15: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(275, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(659, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_ReportText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(31, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(13, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(23, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(711, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_ReportText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(31, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(13, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(23, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(711, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_NotInterestedText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(61, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(26, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(72, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(711, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_NotInterestedText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(61, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(26, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(72, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(711, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_SaveVideoText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(49, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(145, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(711, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_SaveVideoText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(49, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(145, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(711, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_DuetText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(22, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(13, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(217, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(711, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_DuetText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(22, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(13, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(217, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(711, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    textlabel_AddToFavoritesText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(70, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(26, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(262, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(711, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_AddToFavoritesText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(70, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(26, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(262, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(711, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    imagenav_BitmapImageNav: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(150, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(33, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(113, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(746, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
})

const styles = {...global_styles, ...local_styles}
 
 
 	return (

		<SafeAreaView style={{"flex":1}}> 
		<View 
				style={styles.LinkshareView}>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage}
		   source={img9b286d72ca6f5b40e6609a0e49df7a2b8828f51d}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage2}
		   source={img319b7afa994ac8a81b9c4812a4a7aaa288d0fa1c}
		/>
		  <Text data-elementId='textlabel_SendTo' 
			   style={styles.textlabel_SendToText}>Send to
		  </Text>
		<View data-elementId='view_ProfilePicture' 
		   style={[styles.view_ProfilePicture, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Imagenav_recom' 
		   style={styles.image_Imagenav_recomImage}
		   source={imgd63a7a7f18a1d0e895c396a75af734e75613937f}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage3}
		   source={img5af4ebad825115375c13e5bbfa9db256789faf34}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage4}
		   source={img5af4ebad825115375c13e5bbfa9db256789faf34}
		/>
		<Image data-elementId='image_BitmapCopy' 
		   style={styles.image_BitmapCopyImage}
		   source={img5af4ebad825115375c13e5bbfa9db256789faf34}
		/>
		<Image data-elementId='image_BitmapCopy2' 
		   style={styles.image_BitmapCopy2Image}
		   source={img5af4ebad825115375c13e5bbfa9db256789faf34}
		/>
		<Image data-elementId='image_BitmapCopy2' 
		   style={styles.image_BitmapCopy2Image2}
		   source={img5af4ebad825115375c13e5bbfa9db256789faf34}
		/>
		<Image data-elementId='image_BitmapCopy2' 
		   style={styles.image_BitmapCopy2Image3}
		   source={img5af4ebad825115375c13e5bbfa9db256789faf34}
		/>
		<View data-elementId='view_Vector14Stroke' 
		   style={[styles.view_Vector14Stroke, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Vector14Stroke' 
		   style={[styles.view_Vector14Stroke2, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_UserNameCopy' 
			   style={styles.textlabel_UserNameCopyText}>someone
		  </Text>
		  <Text data-elementId='textlabel_UserNameCopy2' 
			   style={styles.textlabel_UserNameCopy2Text}>someone
		  </Text>
		  <Text data-elementId='textlabel_UserName' 
			   style={styles.textlabel_UserNameText}>Recommend
		  </Text>
		  <Text data-elementId='textlabel_UserName' 
			   style={styles.textlabel_UserNameText2}>someone
		  </Text>
		  <Text data-elementId='textlabel_UserName' 
			   style={styles.textlabel_UserNameText3}>someone
		  </Text>
		  <Text data-elementId='textlabel_UserNameCopy2' 
			   style={styles.textlabel_UserNameCopy2Text2}>someone
		  </Text>
		  <Text data-elementId='textlabel_UserNameCopy2' 
			   style={styles.textlabel_UserNameCopy2Text3}>someone
		  </Text>
		  <Text data-elementId='textlabel_ShareTo' 
			   style={styles.textlabel_ShareToText}>Share to
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage5}
		   source={imgd237b9438b4b3e7738c3feb27e053def73fab3b0}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage6}
		   source={img7d65ad2d80f4bd2ceeb42069b8f9e06bc03a250a}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage7}
		   source={imgf0517c7ef54a2c55f05ad5b22cbf84a3a29093a3}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage8}
		   source={img5a765537cffc114aee90856eb4792495ef94deb2}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage9}
		   source={imgf0809cee394296f5ce6abdca7f5a407784e5ccee}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage10}
		   source={img455e75b20627245dd10a09115600dba9c3b32f9b}
		/>
		  <Text data-elementId='textlabel_CopyLink' 
			   style={styles.textlabel_CopyLinkText}>Copy link
		  </Text>
		  <Text data-elementId='textlabel_Messenger' 
			   style={styles.textlabel_MessengerText}>Messenger
		  </Text>
		  <Text data-elementId='textlabel_Instagram' 
			   style={styles.textlabel_InstagramText}>Instagram
		  </Text>
		  <Text data-elementId='textlabel_Message' 
			   style={styles.textlabel_MessageText}>Message
		  </Text>
		  <Text data-elementId='textlabel_Snapchat' 
			   style={styles.textlabel_SnapchatText}>Snapchat
		  </Text>
		  <Text data-elementId='textlabel_Sms' 
			   style={styles.textlabel_SmsText}>SMS
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage11}
		   source={img1650738b933d3407037182b7a11f010cbfad3c15}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage12}
		   source={imgd3a263fae57123a0c8f6de9ea8b357943a998b77}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage13}
		   source={img5d8030ae13428fb10085d43448dd3b0db9c29641}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage14}
		   source={img34144081239bd1b276b7ddfc5127bfa1d98f3418}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage15}
		   source={imgde252a635f16476296efaf601bcb07012cffac67}
		/>
		  <Text data-elementId='textlabel_Report' 
			   style={styles.textlabel_ReportText}>Report
		  </Text>
		  <Text data-elementId='textlabel_NotInterested' 
			   style={styles.textlabel_NotInterestedText}>Not interested
		  </Text>
		  <Text data-elementId='textlabel_SaveVideo' 
			   style={styles.textlabel_SaveVideoText}>Save video
		  </Text>
		  <Text data-elementId='textlabel_Duet' 
			   style={styles.textlabel_DuetText}>Duet
		  </Text>
		  <Text data-elementId='textlabel_AddToFavorites' 
			   style={styles.textlabel_AddToFavoritesText}>Add to Favorites
		  </Text>
		<Image data-elementId='imagenav_Bitmap' 
		   style={styles.imagenav_BitmapImageNav}
		   source={img6f214e95fe377b02f4d7729d21c0328f47c0f3c6}
		/>
			</View>
			</SafeAreaView>
	
		)
	}

}
