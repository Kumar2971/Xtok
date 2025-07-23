//This an auto generated file for Artboard Name = SelectYourCountry And Supports ReactNative Ver. = 0.62
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
import { img229e87c378277e74750bea6bd7886bdde1d22b49, imgdf5a4deb275b6cf8a3121ffbb5263263c8425bbe, img3997e89b1b0518c077d74778a28eeb21e0c7f646, imge68eb27d183052333e24098717a2645ef5f9ab18, img7657e8a7a818ef340d0b86c7835b97edfbbf5d9b } from './assets'
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

 
 
export default class SelectYourCountry extends React.Component
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
			const { width,height } = e.window; 
			screenWidth = Dimensions.get('window').width; 
			screenHeight = Dimensions.get('window').height; 
			this.forceUpdate();
		});
	}

	render()
	{
		const local_styles = StyleSheet.create({
    SelectYourCountryView: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        flex: 1,
        alignItems: "flex-start",
    },
    image_BitmapImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(379, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(39, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(0, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_SelectYourCountryText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(211, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(25, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(60, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "Roboto-Medium",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
    },
    attrbuted_textlabel_SelectYourCountryText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(211, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(25, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(60, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "Roboto-Medium",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
    },
    image_BackImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(18, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(24, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(71, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    view_Rect: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(48, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(123, false, 1),
        opacity: 1,
        backgroundColor: "rgba(245, 245, 245, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    image_SearchImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(19, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(39, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(138, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_SearchText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(231, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(67, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(138, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_SearchText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(231, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(67, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(138, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_Rect2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(191, false, 1),
        opacity: 1,
        borderColor: "rgba(238, 238, 238, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    image_FlagImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(27, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(28, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(211, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_AfghanistanText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(168, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(216, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_AfghanistanText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(168, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(216, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    textlabel_AfText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(218, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_AfText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(218, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_Ellipse: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(18, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(320, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(218, false, 1),
        opacity: 1,
        borderColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(3, true, 1),
    },
    view_Rect3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(269, false, 1),
        opacity: 1,
        borderColor: "rgba(238, 238, 238, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    image_FlagImage2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(27, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(28, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(289, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_AlbaniaText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(168, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(294, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    attrbuted_textlabel_AlbaniaText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(168, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(294, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    textlabel_AlText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(296, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    attrbuted_textlabel_AlText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(296, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_Ellipse2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(18, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(320, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(296, false, 1),
        opacity: 1,
        borderColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(3, true, 1),
    },
    view_Rect4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(347, false, 1),
        opacity: 1,
        borderColor: "rgba(238, 238, 238, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    image_FlagImage3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(27, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(28, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(367, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_DzText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(168, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(372, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    attrbuted_textlabel_DzText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(168, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(372, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    textlabel_DzText2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(17, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(374, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    attrbuted_textlabel_DzText2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(17, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(374, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_Ellipse3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(18, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(320, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(374, false, 1),
        opacity: 1,
        borderColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(3, true, 1),
    },
    view_Rect5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(425, false, 1),
        opacity: 1,
        borderColor: "rgba(238, 238, 238, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    image_FlagImage4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(27, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(28, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(445, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_AndorraText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(168, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(450, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    attrbuted_textlabel_AndorraText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(168, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(450, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    textlabel_AdText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(18, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(452, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    attrbuted_textlabel_AdText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(18, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(452, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_Ellipse4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(18, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(320, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(452, false, 1),
        opacity: 1,
        borderColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(3, true, 1),
    },
    view_Rect6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(503, false, 1),
        opacity: 1,
        borderColor: "rgba(238, 238, 238, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    image_FlagImage5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(27, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(28, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(523, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_AfghanistanText2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(168, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(528, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_AfghanistanText2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(168, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(528, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    textlabel_AfText2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(530, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_AfText2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(530, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_Ellipse5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(18, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(320, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(530, false, 1),
        opacity: 1,
        borderColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(3, true, 1),
    },
    view_Rect7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(581, false, 1),
        opacity: 1,
        borderColor: "rgba(238, 238, 238, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    image_FlagImage6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(27, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(28, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(601, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_AfghanistanText3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(168, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(606, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_AfghanistanText3: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(168, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(606, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    textlabel_AfText3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(608, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_AfText3: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(608, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_Ellipse6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(18, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(320, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(608, false, 1),
        opacity: 1,
        borderColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(3, true, 1),
    },
    view_Rect8: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(659, false, 1),
        opacity: 1,
        borderColor: "rgba(238, 238, 238, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    image_FlagImage7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(27, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(28, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(679, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_AfghanistanText4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(168, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(684, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_AfghanistanText4: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(168, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(684, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    textlabel_AfText4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(686, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_AfText4: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(686, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(189, 189, 189, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_Ellipse7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(18, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(320, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(686, false, 1),
        opacity: 1,
        borderColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(3, true, 1),
    },
    imagenav_ContinueImageNav: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(333, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(48, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(722, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
})

const styles = {...global_styles, ...local_styles}
 
 
 	return (

		<SafeAreaView style={{"flex":1}}> 
		<View 
				style={styles.SelectYourCountryView}>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage}
		   source={img7657e8a7a818ef340d0b86c7835b97edfbbf5d9b}
		/>
		  <Text data-elementId='textlabel_SelectYourCountry' 
			   style={styles.textlabel_SelectYourCountryText}>Select Your Country
		  </Text>
		<Image data-elementId='image_Back' 
		   style={styles.image_BackImage}
		   source={imgdf5a4deb275b6cf8a3121ffbb5263263c8425bbe}
		/>
		<View data-elementId='view_Rect' 
		   style={[styles.view_Rect, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Search' 
		   style={styles.image_SearchImage}
		   source={img3997e89b1b0518c077d74778a28eeb21e0c7f646}
		/>
		  <Text data-elementId='textlabel_Search' 
			   style={styles.textlabel_SearchText}>Search
		  </Text>
		<View data-elementId='view_Rect' 
		   style={[styles.view_Rect2, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Flag' 
		   style={styles.image_FlagImage}
		   source={img229e87c378277e74750bea6bd7886bdde1d22b49}
		/>
		  <Text data-elementId='textlabel_Afghanistan' 
			   style={styles.textlabel_AfghanistanText}>Afghanistan
		  </Text>
		  <Text data-elementId='textlabel_Af' 
			   style={styles.textlabel_AfText}>AF
		  </Text>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Rect' 
		   style={[styles.view_Rect3, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Flag' 
		   style={styles.image_FlagImage2}
		   source={img229e87c378277e74750bea6bd7886bdde1d22b49}
		/>
		  <Text data-elementId='textlabel_Albania' 
			   style={styles.textlabel_AlbaniaText}>Albania
		  </Text>
		  <Text data-elementId='textlabel_Al' 
			   style={styles.textlabel_AlText}>AL
		  </Text>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse2, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Rect' 
		   style={[styles.view_Rect4, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Flag' 
		   style={styles.image_FlagImage3}
		   source={img229e87c378277e74750bea6bd7886bdde1d22b49}
		/>
		  <Text data-elementId='textlabel_Dz' 
			   style={styles.textlabel_DzText}>DZ
		  </Text>
		  <Text data-elementId='textlabel_Dz' 
			   style={styles.textlabel_DzText2}>DZ
		  </Text>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse3, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Rect' 
		   style={[styles.view_Rect5, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Flag' 
		   style={styles.image_FlagImage4}
		   source={img229e87c378277e74750bea6bd7886bdde1d22b49}
		/>
		  <Text data-elementId='textlabel_Andorra' 
			   style={styles.textlabel_AndorraText}>Andorra
		  </Text>
		  <Text data-elementId='textlabel_Ad' 
			   style={styles.textlabel_AdText}>AD
		  </Text>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse4, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Rect' 
		   style={[styles.view_Rect6, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Flag' 
		   style={styles.image_FlagImage5}
		   source={img229e87c378277e74750bea6bd7886bdde1d22b49}
		/>
		  <Text data-elementId='textlabel_Afghanistan' 
			   style={styles.textlabel_AfghanistanText2}>Afghanistan
		  </Text>
		  <Text data-elementId='textlabel_Af' 
			   style={styles.textlabel_AfText2}>AF
		  </Text>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse5, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Rect' 
		   style={[styles.view_Rect7, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Flag' 
		   style={styles.image_FlagImage6}
		   source={img229e87c378277e74750bea6bd7886bdde1d22b49}
		/>
		  <Text data-elementId='textlabel_Afghanistan' 
			   style={styles.textlabel_AfghanistanText3}>Afghanistan
		  </Text>
		  <Text data-elementId='textlabel_Af' 
			   style={styles.textlabel_AfText3}>AF
		  </Text>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse6, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Rect' 
		   style={[styles.view_Rect8, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Flag' 
		   style={styles.image_FlagImage7}
		   source={img229e87c378277e74750bea6bd7886bdde1d22b49}
		/>
		  <Text data-elementId='textlabel_Afghanistan' 
			   style={styles.textlabel_AfghanistanText4}>Afghanistan
		  </Text>
		  <Text data-elementId='textlabel_Af' 
			   style={styles.textlabel_AfText4}>AF
		  </Text>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse7, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='imagenav_Continue' 
		   style={styles.imagenav_ContinueImageNav}
		   source={imge68eb27d183052333e24098717a2645ef5f9ab18}
		/>
			</View>
			</SafeAreaView>
	
		)
	}

}
