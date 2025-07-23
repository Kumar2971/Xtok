//This an auto generated file for Artboard Name = Followsomeone And Supports ReactNative Ver. = 0.62
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
import { img2008a5827f170a4683858f8e0839100f9c78fc4d, imgdbd47aae481c3d1c980490c8649db81d087077f0, img0693f12882ea84c4dcac40d11b0ba508ab6c5062, imgebd527ec68aba9e4f30ae2a134609fa3e48ea844 } from './assets'
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

 
 
export default class Followsomeone extends React.Component
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
    FollowsomeoneView: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        flex: 1,
        alignItems: "flex-start",
    },
    textlabel_941Text: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(29, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(9, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_941Text: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(29, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(9, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    image_BitmapImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(24, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(13, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(331, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(13, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(15, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(11, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(312, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(17, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(292, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_FollowSomeoneText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(295, true, 1),
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
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_FollowSomeoneText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(295, true, 1),
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
    image_BitmapImage4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(18, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(24, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(72, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_FollowSomeoneYouMightKnowOrYouCanSkipThemTooText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(333, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(40, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(123, false, 1),
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
    attrbuted_textlabel_FollowSomeoneYouMightKnowOrYouCanSkipThemTooText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(333, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(40, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(123, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    view_StatedefaultSearchThemelightComponentsearchBackground: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(49, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(184, false, 1),
        opacity: 1,
        backgroundColor: "rgba(245, 245, 245, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_IconlylightsearchBackground: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(19, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(39, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(200, false, 1),
        opacity: 1,
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_SearchText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(270, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(67, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(200, false, 1),
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
        width: MergeEngineUtilities.deviceBasedDynamicDimension(270, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(67, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(200, false, 1),
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
    view_Ellipse: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(13, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(202, false, 1),
        opacity: 1,
        borderColor: "rgba(189, 189, 189, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    view_Line: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(4, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(3, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(52, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(213, false, 1),
        opacity: 1,
        borderColor: "rgba(189, 189, 189, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    view_Ellipse2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(54, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(53, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(254, false, 1),
        opacity: 1,
        backgroundColor: "rgba(216, 216, 216, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_NameText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(184, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(261, false, 1),
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
    attrbuted_textlabel_NameText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(184, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(261, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "Urbanist-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    view_SizesmallTypefilledIconnoneComponentchipsBackground: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(69, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(28, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(287, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(267, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_ChipsText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(301, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(272, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_ChipsText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(301, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(272, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    textlabel_OccupationText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(184, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(283, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(97, 97, 97, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_OccupationText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(184, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(283, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(97, 97, 97, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_Ellipse3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(54, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(53, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(328, false, 1),
        opacity: 1,
        backgroundColor: "rgba(216, 216, 216, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_NameText2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(167, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(334, false, 1),
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
    attrbuted_textlabel_NameText2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(167, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(334, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "Urbanist-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    view_SizesmallTypeborderIconnoneComponentchipsBackground: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(28, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(268, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(340, false, 1),
        opacity: 1,
        borderColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(2, true, 1),
    },
    textlabel_ChipsText2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(58, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(282, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(345, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 201, 37, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_ChipsText2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(58, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(282, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(345, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 201, 37, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    textlabel_OccupationText2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(167, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(357, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(97, 97, 97, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_OccupationText2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(167, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(357, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(97, 97, 97, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_Ellipse4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(54, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(53, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(401, false, 1),
        opacity: 1,
        backgroundColor: "rgba(216, 216, 216, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_NameText3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(184, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(408, false, 1),
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
    attrbuted_textlabel_NameText3: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(184, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(408, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "Urbanist-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    view_SizesmallTypeborderIconnoneComponentchipsBackground2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(28, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(268, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(413, false, 1),
        opacity: 1,
        borderColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(2, true, 1),
    },
    textlabel_ChipsText3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(58, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(282, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(419, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 201, 37, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_ChipsText3: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(58, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(282, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(419, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 201, 37, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    textlabel_OccupationText3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(184, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(430, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(97, 97, 97, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_OccupationText3: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(184, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(430, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(97, 97, 97, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_Ellipse5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(54, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(53, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(475, false, 1),
        opacity: 1,
        backgroundColor: "rgba(216, 216, 216, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_NameText4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(167, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(481, false, 1),
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
    attrbuted_textlabel_NameText4: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(167, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(481, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "Urbanist-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    view_SizesmallTypeborderIconnoneComponentchipsBackground3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(28, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(268, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(486, false, 1),
        opacity: 1,
        borderColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(2, true, 1),
    },
    textlabel_ChipsText4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(58, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(282, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(492, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 201, 37, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_ChipsText4: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(58, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(282, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(492, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 201, 37, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    textlabel_OccupationText4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(167, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(504, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(97, 97, 97, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_OccupationText4: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(167, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(504, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(97, 97, 97, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_Ellipse6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(54, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(53, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(549, false, 1),
        opacity: 1,
        backgroundColor: "rgba(216, 216, 216, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_NameText5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(167, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(555, false, 1),
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
    attrbuted_textlabel_NameText5: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(167, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(555, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "Urbanist-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    view_SizesmallTypeborderIconnoneComponentchipsBackground4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(28, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(268, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(560, false, 1),
        opacity: 1,
        borderColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(2, true, 1),
    },
    textlabel_ChipsText5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(58, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(282, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(565, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 201, 37, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_ChipsText5: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(58, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(282, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(565, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 201, 37, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    textlabel_OccupationText5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(167, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(578, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(97, 97, 97, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_OccupationText5: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(167, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(578, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(97, 97, 97, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_Ellipse7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(54, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(53, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(622, false, 1),
        opacity: 1,
        backgroundColor: "rgba(216, 216, 216, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_NameText6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(184, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(629, false, 1),
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
    attrbuted_textlabel_NameText6: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(184, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(629, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "Urbanist-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    view_SizesmallTypeborderIconnoneComponentchipsBackground5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(88, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(28, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(268, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(633, false, 1),
        opacity: 1,
        borderColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(2, true, 1),
    },
    textlabel_ChipsText6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(58, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(282, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(638, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 201, 37, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_ChipsText6: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(58, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(282, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(638, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 201, 37, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    textlabel_OccupationText6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(184, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(651, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(97, 97, 97, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_OccupationText6: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(184, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(651, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(97, 97, 97, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    TEXTCOLORSTYLEText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(311, true, 0.9737609329446064),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 0.96),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 0.9737609329446064),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 0.96),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    button_continueButton: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(48, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(722, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
        justifyContent: "center",
    },
})

const styles = {...global_styles, ...local_styles}
 
 
 	return (

		<SafeAreaView style={{"flex":1}}> 
		<View 
				style={styles.FollowsomeoneView}>
		  <Text data-elementId='textlabel_941' 
			   style={styles.textlabel_941Text}>9:41
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage}
		   source={img2008a5827f170a4683858f8e0839100f9c78fc4d}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage2}
		   source={imgdbd47aae481c3d1c980490c8649db81d087077f0}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage3}
		   source={img0693f12882ea84c4dcac40d11b0ba508ab6c5062}
		/>
		  <Text data-elementId='textlabel_FollowSomeone' 
			   style={styles.textlabel_FollowSomeoneText}>Follow Someone
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage4}
		   source={imgebd527ec68aba9e4f30ae2a134609fa3e48ea844}
		/>
		  <Text data-elementId='textlabel_FollowSomeoneYouMightKnowOrYouCanSkipThemToo.' 
			   style={styles.textlabel_FollowSomeoneYouMightKnowOrYouCanSkipThemTooText}>Follow someone you might know or you can skip them too.
		  </Text>
		<View data-elementId='view_StatedefaultSearchThemelightComponentsearchBackground' 
		   style={[styles.view_StatedefaultSearchThemelightComponentsearchBackground, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_IconlylightsearchBackground' 
		   style={[styles.view_IconlylightsearchBackground, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Search' 
			   style={styles.textlabel_SearchText}>Search
		  </Text>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Line' 
		   style={[styles.view_Line, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse2, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Name' 
			   style={styles.textlabel_NameText}>Jane Cooper
		  </Text>
		<View data-elementId='view_SizesmallTypefilledIconnoneComponentchipsBackground' 
		   style={[styles.view_SizesmallTypefilledIconnoneComponentchipsBackground, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Chips' 
			   style={styles.textlabel_ChipsText}>Follow
		  </Text>
		  <Text data-elementId='textlabel_Occupation' 
			   style={styles.textlabel_OccupationText}>Love to travel
		  </Text>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse3, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Name' 
			   style={styles.textlabel_NameText2}>Wade Warren
		  </Text>
		<View data-elementId='view_SizesmallTypeborderIconnoneComponentchipsBackground' 
		   style={[styles.view_SizesmallTypeborderIconnoneComponentchipsBackground, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Chips' 
			   style={styles.textlabel_ChipsText2}>Following
		  </Text>
		  <Text data-elementId='textlabel_Occupation' 
			   style={styles.textlabel_OccupationText2}>22/m/LA
		  </Text>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse4, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Name' 
			   style={styles.textlabel_NameText3}>Jenny Wilson
		  </Text>
		<View data-elementId='view_SizesmallTypeborderIconnoneComponentchipsBackground' 
		   style={[styles.view_SizesmallTypeborderIconnoneComponentchipsBackground2, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Chips' 
			   style={styles.textlabel_ChipsText3}>Following
		  </Text>
		  <Text data-elementId='textlabel_Occupation' 
			   style={styles.textlabel_OccupationText3}>Follow me for baking tips
		  </Text>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse5, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Name' 
			   style={styles.textlabel_NameText4}>Kristin Watson
		  </Text>
		<View data-elementId='view_SizesmallTypeborderIconnoneComponentchipsBackground' 
		   style={[styles.view_SizesmallTypeborderIconnoneComponentchipsBackground3, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Chips' 
			   style={styles.textlabel_ChipsText4}>Following
		  </Text>
		  <Text data-elementId='textlabel_Occupation' 
			   style={styles.textlabel_OccupationText4}>Dog Trainer
		  </Text>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse6, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Name' 
			   style={styles.textlabel_NameText5}>Annette Black
		  </Text>
		<View data-elementId='view_SizesmallTypeborderIconnoneComponentchipsBackground' 
		   style={[styles.view_SizesmallTypeborderIconnoneComponentchipsBackground4, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Chips' 
			   style={styles.textlabel_ChipsText5}>Following
		  </Text>
		  <Text data-elementId='textlabel_Occupation' 
			   style={styles.textlabel_OccupationText5}>Just lurking around
		  </Text>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse7, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Name' 
			   style={styles.textlabel_NameText6}>Theresa Webb
		  </Text>
		<View data-elementId='view_SizesmallTypeborderIconnoneComponentchipsBackground' 
		   style={[styles.view_SizesmallTypeborderIconnoneComponentchipsBackground5, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Chips' 
			   style={styles.textlabel_ChipsText6}>Following
		  </Text>
		  <Text data-elementId='textlabel_Occupation' 
			   style={styles.textlabel_OccupationText6}>XoXo
		  </Text>
		<TouchableOpacity data-elementId='button_continue' 
		  onPress ={ () => Alert.alert('I am Custom Button.')} 
		   style={styles.button_continueButton}>
		  <Text data-elementId='TEXTCOLORSTYLE' 
			   style={styles.TEXTCOLORSTYLEText}>Continue
		  </Text>
		</TouchableOpacity>
			</View>
			</SafeAreaView>
	
		)
	}

}
