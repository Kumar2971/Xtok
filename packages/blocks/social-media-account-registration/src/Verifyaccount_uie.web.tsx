//This an auto generated file for Artboard Name = Verifyaccount And Supports ReactNative Ver. = 0.62
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
import { img1604c7a3785edbada571d994d402ec7e2af28a4d, img2aeac0bf6c701861c205f90da09f232d4c660292, img7596495015b81af585b9058da9d326135e4533f5, img67311ec7c46d25d438979d01565077562f8c8c72 } from './assets'
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

 
 
export default class Verifyaccount extends React.Component
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
    VerifyaccountView: {
        backgroundColor: "rgba(255, 255, 255, 1)",
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
    view_Rectangle: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(376, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(812, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(0, false, 1),
        opacity: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_12_light_forgotPasswordMethodBackgroundmask: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(377, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(516, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(296, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    image_BitmapImage2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(25, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(26, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(328, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_VerifyAccountText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(209, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(25, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(60, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(329, false, 1),
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
    attrbuted_textlabel_VerifyAccountText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(209, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(25, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(60, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(329, false, 1),
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
    view_Rectangle7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(73, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(24, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(280, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(329, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_SkipText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(25, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(304, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(332, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "Roboto-Medium",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    attrbuted_textlabel_SkipText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(25, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(304, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(332, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "Roboto-Medium",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    textlabel_SelectWhichContactDetailsShouldWeUseForVerifyingYourAccountText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(333, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(40, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(391, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    attrbuted_textlabel_SelectWhichContactDetailsShouldWeUseForVerifyingYourAccountText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(333, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(40, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(391, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    view_AutoLayoutHorizontalBackground: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(112, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(453, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(2, true, 1),
    },
    view_AutoLayoutHorizontalBackground2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(71, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(70, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(475, false, 1),
        opacity: 1,
        backgroundColor: "rgba(0, 0, 0, 0.07999999821186066)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_ViaSmsText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(203, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(130, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(488, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(117, 117, 117, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    attrbuted_textlabel_ViaSmsText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(203, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(130, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(488, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(117, 117, 117, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(29, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(29, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(63, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(495, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_111499Text: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(203, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(130, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(512, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    attrbuted_textlabel_111499Text: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(203, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(130, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(512, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    view_AutoLayoutHorizontalBackground3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(112, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(588, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderColor: "rgba(238, 238, 238, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    view_AutoLayoutHorizontalBackground4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(71, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(70, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(609, false, 1),
        opacity: 1,
        backgroundColor: "rgba(0, 0, 0, 0.07999999821186066)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_ViaEmailText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(203, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(130, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(622, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(117, 117, 117, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    attrbuted_textlabel_ViaEmailText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(203, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(130, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(622, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(117, 117, 117, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(29, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(29, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(63, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(629, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_JohoeyourdomaincomText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(203, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(130, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(646, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    attrbuted_textlabel_JohoeyourdomaincomText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(203, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(130, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(646, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    view_TypebuttonType2primaryType3roundedStyledefaultStateactiveThemedefaultComponentbuttonBackground: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(48, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(722, false, 1),
        opacity: 1,
        backgroundColor: "rgba(0, 0, 0, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
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
    textlabel_ContinueText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(305, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(35, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(737, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 255, 255, 1)",
        textAlign: "center",
        textAlignVertical: "center",
        fontFamily: "NunitoSans-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    attrbuted_textlabel_ContinueText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(305, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(35, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(737, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 255, 255, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
})

const styles = {...global_styles, ...local_styles}
 
 
 	return (

		<SafeAreaView style={{"flex":1}}> 
		<View 
				style={styles.VerifyaccountView}>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage}
		   source={img67311ec7c46d25d438979d01565077562f8c8c72}
		/>
		<View data-elementId='view_Rectangle' 
		   style={[styles.view_Rectangle, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_12_light_forgotPasswordMethodBackgroundmask' 
		   style={[styles.view_12_light_forgotPasswordMethodBackgroundmask, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage2}
		   source={img1604c7a3785edbada571d994d402ec7e2af28a4d}
		/>
		  <Text data-elementId='textlabel_VerifyAccount' 
			   style={styles.textlabel_VerifyAccountText}>Verify Account
		  </Text>
		<View data-elementId='view_Rectangle7' 
		   style={[styles.view_Rectangle7, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Skip' 
			   style={styles.textlabel_SkipText}>Skip
		  </Text>
		  <Text data-elementId='textlabel_SelectWhichContactDetailsShouldWeUseForVerifyingYourAccount' 
			   style={styles.textlabel_SelectWhichContactDetailsShouldWeUseForVerifyingYourAccountText}>Select which contact details should we use for verifying your account
		  </Text>
		<View data-elementId='view_AutoLayoutHorizontalBackground' 
		   style={[styles.view_AutoLayoutHorizontalBackground, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_AutoLayoutHorizontalBackground' 
		   style={[styles.view_AutoLayoutHorizontalBackground2, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_ViaSms' 
			   style={styles.textlabel_ViaSmsText}>via SMS:
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage3}
		   source={img7596495015b81af585b9058da9d326135e4533f5}
		/>
		  <Text data-elementId='textlabel_111499' 
			   style={styles.textlabel_111499Text}>+1114******99
		  </Text>
		<View data-elementId='view_AutoLayoutHorizontalBackground' 
		   style={[styles.view_AutoLayoutHorizontalBackground3, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_AutoLayoutHorizontalBackground' 
		   style={[styles.view_AutoLayoutHorizontalBackground4, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_ViaEmail' 
			   style={styles.textlabel_ViaEmailText}>via Email:
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage4}
		   source={img2aeac0bf6c701861c205f90da09f232d4c660292}
		/>
		  <Text data-elementId='textlabel_Johoeyourdomain.com' 
			   style={styles.textlabel_JohoeyourdomaincomText}>joh***oe@yourdomain.com
		  </Text>
		<View data-elementId='view_TypebuttonType2primaryType3roundedStyledefaultStateactiveThemedefaultComponentbuttonBackground' 
		   style={[styles.view_TypebuttonType2primaryType3roundedStyledefaultStateactiveThemedefaultComponentbuttonBackground, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<TouchableOpacity data-elementId='button_continue' 
		  onPress ={ () => Alert.alert('I am Custom Button.')} 
		   style={styles.button_continueButton}>
		  <Text data-elementId='TEXTCOLORSTYLE' 
			   style={styles.TEXTCOLORSTYLEText}>Continue
		  </Text>
		</TouchableOpacity>
		  <Text data-elementId='textlabel_Continue' 
			   style={styles.textlabel_ContinueText}>Continue
		  </Text>
			</View>
			</SafeAreaView>
	
		)
	}

}
