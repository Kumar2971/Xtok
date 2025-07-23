//This an auto generated file for Artboard Name = Fillyourprofile And Supports ReactNative Ver. = 0.62
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
import { imgf617116e30ae1293c3ac1f95556d3ca790e83b81, img4a7efbb1137e9beb65fe0e48edf05f3407dec9e0, img26bdac065b65ba15961c77f8b8187dfb2c0909ca, img0693f12882ea84c4dcac40d11b0ba508ab6c5062, imge944bc30078b2e4b21b7fbfabdb7d446d22c2b51, img428fb679f02d5de70017cffd37dc20093d829081, imgc7137d0e743ae34377d255963cb9ebd851f526a4, imgdbd47aae481c3d1c980490c8649db81d087077f0, img8a1e63ee1095bc92b2c57e42dec8ffcdac2b1568 } from './assets'
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

 
 
export default class Fillyourprofile extends React.Component
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
    FillyourprofileView: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        flex: 1,
        alignItems: "flex-start",
    },
    textlabel_941Text: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(29, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
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
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
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
        width: MergeEngineUtilities.deviceBasedDynamicDimension(15, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(11, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(312, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    view_Vector: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(23, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(11, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(331, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        opacity: 0.3499999940395355,
        borderColor: "rgba(0, 0, 0, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    image_BitmapImage2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(17, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(292, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    view_Vector2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(19, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(7, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(333, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        opacity: 1,
        backgroundColor: "rgba(0, 0, 0, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_Vector3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(2, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(4, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(354, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        opacity: 0.4000000059604645,
        backgroundColor: "rgba(0, 0, 0, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    image_BitmapImage3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(25, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(25, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_FillYourProfileText: {
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
    attrbuted_textlabel_FillYourProfileText: {
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
    view_Ellipse: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(123, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(126, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(123, false, 1),
        opacity: 1,
        backgroundColor: "rgba(216, 216, 216, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    image_BitmapImage4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(32, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(32, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(218, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(214, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    view_StatusdefaultTypedefaultStatedefaultInputThemelightComponentinputFieldBackground: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(49, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(267, false, 1),
        opacity: 1,
        backgroundColor: "rgba(250, 250, 250, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_LabelText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(298, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(39, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(283, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(158, 158, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_LabelText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(298, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(39, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(283, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(158, 158, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_StatusdefaultTypedefaultStatedefaultInputThemelightComponentinputFieldBackground2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(49, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(337, false, 1),
        opacity: 1,
        backgroundColor: "rgba(250, 250, 250, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_LabelText2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(298, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(39, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(353, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(158, 158, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_LabelText2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(298, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(39, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(353, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(158, 158, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    view_StatusdefaultTypenormalStatedefaultInputThemelightComponentinputFieldBackground: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(49, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(407, false, 1),
        opacity: 1,
        backgroundColor: "rgba(250, 250, 250, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_DateOfBirthText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(270, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(39, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(423, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(158, 158, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "Roboto-Medium",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    attrbuted_textlabel_DateOfBirthText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(270, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(39, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(423, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(158, 158, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "Roboto-Medium",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(15, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(320, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(424, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    view_StatusdefaultTypenormalStatedefaultInputThemelightComponentinputFieldBackground2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(49, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(477, false, 1),
        opacity: 1,
        backgroundColor: "rgba(250, 250, 250, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_LabelText3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(270, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(39, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(493, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(158, 158, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_LabelText3: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(270, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(39, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(493, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(158, 158, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(15, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(320, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(494, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    view_StatusdefaultTypephoneStatedefaultInputThemelightComponentinputFieldBackground: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(49, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(547, false, 1),
        opacity: 1,
        backgroundColor: "rgba(250, 250, 250, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    image_BitmapImage7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(22, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(38, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(563, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_LabelText4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(246, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(91, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(563, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(158, 158, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_LabelText4: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(246, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(91, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(563, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(158, 158, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage8: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(15, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(66, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(564, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    view_StatusdefaultTypedefaultStatedefaultInputThemelightComponentinputFieldBackground3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(49, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(617, false, 1),
        opacity: 1,
        backgroundColor: "rgba(250, 250, 250, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_LabelText5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(298, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(39, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(633, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(158, 158, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_LabelText5: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(298, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(39, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(633, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(158, 158, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    imagenav_continueImageNav: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(49, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(721, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_ButtonText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(305, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(35, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(736, false, 1),
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
    attrbuted_textlabel_ButtonText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(305, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(35, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(736, false, 1),
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
})

const styles = {...global_styles, ...local_styles}
 
 
 	return (

		<SafeAreaView style={{"flex":1}}> 
		<View 
				style={styles.FillyourprofileView}>
		  <Text data-elementId='textlabel_941' 
			   style={styles.textlabel_941Text}>9:41
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage}
		   source={imgdbd47aae481c3d1c980490c8649db81d087077f0}
		/>
		<View data-elementId='view_Vector' 
		   style={[styles.view_Vector, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage2}
		   source={img0693f12882ea84c4dcac40d11b0ba508ab6c5062}
		/>
		<View data-elementId='view_Vector' 
		   style={[styles.view_Vector2, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Vector' 
		   style={[styles.view_Vector3, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage3}
		   source={img26bdac065b65ba15961c77f8b8187dfb2c0909ca}
		/>
		  <Text data-elementId='textlabel_FillYourProfile' 
			   style={styles.textlabel_FillYourProfileText}>Fill Your Profile
		  </Text>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage4}
		   source={imge944bc30078b2e4b21b7fbfabdb7d446d22c2b51}
		/>
		<View data-elementId='view_StatusdefaultTypedefaultStatedefaultInputThemelightComponentinputFieldBackground' 
		   style={[styles.view_StatusdefaultTypedefaultStatedefaultInputThemelightComponentinputFieldBackground, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Label' 
			   style={styles.textlabel_LabelText}>Full Name
		  </Text>
		<View data-elementId='view_StatusdefaultTypedefaultStatedefaultInputThemelightComponentinputFieldBackground' 
		   style={[styles.view_StatusdefaultTypedefaultStatedefaultInputThemelightComponentinputFieldBackground2, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Label' 
			   style={styles.textlabel_LabelText2}>Username
		  </Text>
		<View data-elementId='view_StatusdefaultTypenormalStatedefaultInputThemelightComponentinputFieldBackground' 
		   style={[styles.view_StatusdefaultTypenormalStatedefaultInputThemelightComponentinputFieldBackground, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_DateOfBirth' 
			   style={styles.textlabel_DateOfBirthText}>Date of Birth
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage5}
		   source={img4a7efbb1137e9beb65fe0e48edf05f3407dec9e0}
		/>
		<View data-elementId='view_StatusdefaultTypenormalStatedefaultInputThemelightComponentinputFieldBackground' 
		   style={[styles.view_StatusdefaultTypenormalStatedefaultInputThemelightComponentinputFieldBackground2, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Label' 
			   style={styles.textlabel_LabelText3}>Email
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage6}
		   source={img8a1e63ee1095bc92b2c57e42dec8ffcdac2b1568}
		/>
		<View data-elementId='view_StatusdefaultTypephoneStatedefaultInputThemelightComponentinputFieldBackground' 
		   style={[styles.view_StatusdefaultTypephoneStatedefaultInputThemelightComponentinputFieldBackground, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage7}
		   source={img428fb679f02d5de70017cffd37dc20093d829081}
		/>
		  <Text data-elementId='textlabel_Label' 
			   style={styles.textlabel_LabelText4}>Phone Number
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage8}
		   source={imgf617116e30ae1293c3ac1f95556d3ca790e83b81}
		/>
		<View data-elementId='view_StatusdefaultTypedefaultStatedefaultInputThemelightComponentinputFieldBackground' 
		   style={[styles.view_StatusdefaultTypedefaultStatedefaultInputThemelightComponentinputFieldBackground3, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Label' 
			   style={styles.textlabel_LabelText5}>Password
		  </Text>
		<Image data-elementId='imagenav_continue' 
		   style={styles.imagenav_continueImageNav}
		   source={imgc7137d0e743ae34377d255963cb9ebd851f526a4}
		/>
		  <Text data-elementId='textlabel_Button' 
			   style={styles.textlabel_ButtonText}>Continue
		  </Text>
			</View>
			</SafeAreaView>
	
		)
	}

}
