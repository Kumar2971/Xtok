//This an auto generated file for Artboard Name = SignupLoginModule_Mobile And Supports ReactNative Ver. = 0.62
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
import { imgc13743ce0e595c350a354457e671fabc03d34534, imgda2abbbc250ff5dc5edc290491399509a0808084 } from './assets'
let screenHeight = Dimensions.get('window').height; 
//Artboard Dimension 
let artBoardHeightOrg = 844; 
let artBoardWidthOrg = 390; 
//Re calculated Artboard Dimension 
let artBoardWidth =  isSameRatio() ? artBoardWidthOrg : screenWidth; 
let artBoardHeight =  isSameRatio() ? artBoardHeightOrg : screenHeight; 
// To check if Artboard and Device screen has same ratio 
function isSameRatio(): boolean {
    return artBoardWidthOrg / artBoardHeightOrg < 1 && screenWidth / screenHeight < 1 
}
 
//Top or Bottom nav spaces or any extra space occupied by os e.g Status bar, Notch 
let extraSpace = 0; 

 
 
export default class SignupLoginModule_Mobile extends React.Component
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
    SignupLoginModule_MobileView: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        flex: 1,
        alignItems: "flex-start",
    },
    view_backgroundcolor: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(391, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(844, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(0, false, 1),
        opacity: 1,
        backgroundColor: "rgba(248, 249, 250, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_backcolor: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(391, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(110, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(0, false, 1),
        opacity: 1,
        backgroundColor: "rgba(101, 31, 255, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_headerText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(61, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(23, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(164, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(64, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 255, 255, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Medium",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
    },
    attrbuted_textlabel_headerText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(61, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(23, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(164, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(64, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 255, 255, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Medium",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
    },
    image_Imagebutton_backImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(8, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(28, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(69, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_headerText2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(95, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(38, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(209, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(60, 62, 73, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "Rubik-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(32, true, 1),
    },
    attrbuted_textlabel_headerText2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(95, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(38, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(209, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(60, 62, 73, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "Rubik-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(32, true, 1),
    },
    textlabel_subtextText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(205, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(255, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(60, 62, 73, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    attrbuted_textlabel_subtextText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(205, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(255, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(60, 62, 73, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    view_backbox: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(391, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(183, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(315, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderColor: "rgba(208, 210, 218, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    textlabel_emailText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(40, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(335, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(131, 136, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    attrbuted_textlabel_emailText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(40, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(335, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(131, 136, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    textlabel_emailText2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(186, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(21, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(362, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(60, 62, 73, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(18, true, 1),
    },
    attrbuted_textlabel_emailText2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(186, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(21, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(362, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(60, 62, 73, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(18, true, 1),
    },
    view_line: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(391, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(1, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(406, false, 1),
        opacity: 1,
        backgroundColor: "rgba(208, 210, 218, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_passwordText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(71, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(427, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(131, 136, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    attrbuted_textlabel_passwordText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(71, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(427, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(131, 136, 158, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    view_passworddot: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(11, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(462, false, 1),
        opacity: 1,
        backgroundColor: "rgba(60, 62, 73, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_passworddot2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(11, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(48, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(462, false, 1),
        opacity: 1,
        backgroundColor: "rgba(60, 62, 73, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_passworddot3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(11, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(66, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(462, false, 1),
        opacity: 1,
        backgroundColor: "rgba(60, 62, 73, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_passworddot4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(11, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(84, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(462, false, 1),
        opacity: 1,
        backgroundColor: "rgba(60, 62, 73, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_passworddot5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(11, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(102, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(462, false, 1),
        opacity: 1,
        backgroundColor: "rgba(60, 62, 73, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_passworddot6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(11, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(120, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(462, false, 1),
        opacity: 1,
        backgroundColor: "rgba(60, 62, 73, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_passworddot7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(11, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(138, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(462, false, 1),
        opacity: 1,
        backgroundColor: "rgba(60, 62, 73, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_passworddot8: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(11, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(156, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(462, false, 1),
        opacity: 1,
        backgroundColor: "rgba(60, 62, 73, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_forgotpasswordText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(132, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(514, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(101, 31, 255, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    attrbuted_textlabel_forgotpasswordText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(132, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(514, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(101, 31, 255, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    imagenav_BitmapImageNav: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(330, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(55, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(593, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_signinText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(56, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(21, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(165, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(610, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(60, 62, 73, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Medium",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(18, true, 1),
    },
    attrbuted_textlabel_signinText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(56, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(21, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(165, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(610, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(60, 62, 73, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Medium",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(18, true, 1),
    },
    textlabel_signupText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(234, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(74, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(664, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(60, 62, 73, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    attrbuted_textlabel_signupText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(234, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(74, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(664, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(60, 62, 73, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    attrbuted_textlabel_signupText2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(234, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(74, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(664, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(101, 31, 255, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "RubikRoman-Medium",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
})

const styles = {...global_styles, ...local_styles}
 
 
 	return (

		<SafeAreaView style={{"flex":1}}> 
		<View 
				style={styles.SignupLoginModule_MobileView}>
		<View data-elementId='view_backgroundcolor' 
		   style={[styles.view_backgroundcolor, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_backcolor' 
		   style={[styles.view_backcolor, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_header' 
			   style={styles.textlabel_headerText}>Sign In
		  </Text>
		<Image data-elementId='image_Imagebutton_back' 
		   style={styles.image_Imagebutton_backImage}
		   source={imgc13743ce0e595c350a354457e671fabc03d34534}
		/>
		  <Text data-elementId='textlabel_header' 
			   style={styles.textlabel_headerText2}>Sign in
		  </Text>
		  <Text data-elementId='textlabel_subtext' 
			   style={styles.textlabel_subtextText}>Enter your details to sign in.
		  </Text>
		<View data-elementId='view_backbox' 
		   style={[styles.view_backbox, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_email' 
			   style={styles.textlabel_emailText}>Email
		  </Text>
		  <Text data-elementId='textlabel_email' 
			   style={styles.textlabel_emailText2}>john.smith@gmail.com
		  </Text>
		<View data-elementId='view_line' 
		   style={[styles.view_line, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_password' 
			   style={styles.textlabel_passwordText}>Password
		  </Text>
		<View data-elementId='view_passworddot' 
		   style={[styles.view_passworddot, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_passworddot' 
		   style={[styles.view_passworddot2, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_passworddot' 
		   style={[styles.view_passworddot3, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_passworddot' 
		   style={[styles.view_passworddot4, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_passworddot' 
		   style={[styles.view_passworddot5, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_passworddot' 
		   style={[styles.view_passworddot6, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_passworddot' 
		   style={[styles.view_passworddot7, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_passworddot' 
		   style={[styles.view_passworddot8, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_forgotpassword' 
			   style={styles.textlabel_forgotpasswordText}>Forgot password?
		  </Text>
		<Image data-elementId='imagenav_Bitmap' 
		   style={styles.imagenav_BitmapImageNav}
		   source={imgda2abbbc250ff5dc5edc290491399509a0808084}
		/>
		  <Text data-elementId='textlabel_signin' 
			   style={styles.textlabel_signinText}>Sign In
		  </Text>
		  <Text data-elementId='attrbuted_textlabel_signup' 
			   style={styles.attrbuted_textlabel_signupText}>Don’t have an account? 
		  		  <Text data-elementId='attrbuted_textlabel_signup' 
			   style={styles.attrbuted_textlabel_signupText2}>Sign up
		  </Text>
 
		  </Text>
			</View>
			</SafeAreaView>
	
		)
	}

}
