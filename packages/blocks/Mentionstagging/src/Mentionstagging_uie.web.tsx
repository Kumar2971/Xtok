//This an auto generated file for Artboard Name = Mentionstagging And Supports ReactNative Ver. = 0.62
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
import { img3dfaafc243102583e49b449b9a4356168185ca30, img1824399003ad8e7e5b5a17264c44f18060d2eb9d, imged23937a024461a2dcdbaf0a40719e406561b1e9, img877a45cb9a6b0ad4c3313fabf483edd88b59852f, imgf3b15f0b177015e8e6ee44688fd1d67acf67c328, img68a5b9bcf6fbfe61a152c1d0956766f3049a17b9, imgc181633b7f85de2eb71688f6257798f8bae3670d, img1098226bc1c785efdf4ddea6dbdff8c5929e4f89, img005e285a49cf52123d73e0174533d0e7809f5401, imgca48775f0aa76ce250a167383a01cb00b9a25dfb, img2a7844c9eb9d48010ee52cd4cdacb4dc42dc2237, imgba4f238aea431cef61010e1206b8f5ac6f8025a0, imge93a5a73eda68646de39ce4c30967893df0745aa, imgd65936a13898f2b32d7cd42b6c203b28833a14a0 } from './assets'
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

 
 
export default class Mentionstagging extends React.Component
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
    MentionstaggingView: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        flex: 1,
        alignItems: "flex-start",
    },
    view_CommentsBackgroundmask: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(376, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(812, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(0, false, 1),
        opacity: 1,
        backgroundColor: "rgba(216, 216, 216, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_Group275781: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(376, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(812, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(0, false, 1),
        opacity: 1,
        backgroundColor: "rgba(216, 216, 216, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    image_BitmapImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(547, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(265, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(40, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(40, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(13, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(290, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_UserNameText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(60, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(295, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UserNameText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(60, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(295, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    textlabel_UsernameText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(49, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(314, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(138, 139, 143, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UsernameText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(49, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(314, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(138, 139, 143, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(40, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(40, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(13, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(344, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_UserNameText2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(60, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(349, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UserNameText2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(60, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(349, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "ProximaNova2-Semibold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    textlabel_UsernameText2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(49, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(368, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(138, 139, 143, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UsernameText2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(49, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(368, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(138, 139, 143, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(40, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(40, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(13, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(398, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_UserNameText3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(60, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(404, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UserNameText3: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(60, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(404, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    image_BitmapImage5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(11, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(408, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_UsernameText3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(49, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(423, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(138, 139, 143, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UsernameText3: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(49, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(423, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(138, 139, 143, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(40, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(41, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(13, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(452, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_UserNameText4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(60, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(458, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UserNameText4: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(60, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(458, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(21, 25, 35, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "ProximaNova2-Semibold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    textlabel_UsernameText4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(49, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(477, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(138, 139, 143, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UsernameText4: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(49, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(477, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(138, 139, 143, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(376, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(92, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(482, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage8: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(282, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(35, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(47, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(490, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage9: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(31, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(31, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(492, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    imagenav_BitmapImageNav: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(27, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(27, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(339, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(494, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage10: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(22, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(23, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(265, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(496, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage11: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(21, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(228, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(497, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_Text: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(55, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(498, false, 1),
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
    attrbuted_textlabel_Text: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(55, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(498, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    image_BitmapImage12: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(3, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(69, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(498, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage13: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(19, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(302, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(498, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage14: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(376, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(295, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(517, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage15: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(348, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(23, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(537, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
})

const styles = {...global_styles, ...local_styles}
 
 
 	return (

		<SafeAreaView style={{"flex":1}}> 
		<View 
				style={styles.MentionstaggingView}>
		<View data-elementId='view_CommentsBackgroundmask' 
		   style={[styles.view_CommentsBackgroundmask, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Group275781' 
		   style={[styles.view_Group275781, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage}
		   source={img877a45cb9a6b0ad4c3313fabf483edd88b59852f}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage2}
		   source={img1098226bc1c785efdf4ddea6dbdff8c5929e4f89}
		/>
		  <Text data-elementId='textlabel_UserName' 
			   style={styles.textlabel_UserNameText}>Someone
		  </Text>
		  <Text data-elementId='textlabel_Username' 
			   style={styles.textlabel_UsernameText}>someone
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage3}
		   source={img1098226bc1c785efdf4ddea6dbdff8c5929e4f89}
		/>
		  <Text data-elementId='textlabel_UserName' 
			   style={styles.textlabel_UserNameText2}>Someone
		  </Text>
		  <Text data-elementId='textlabel_Username' 
			   style={styles.textlabel_UsernameText2}>someone
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage4}
		   source={img1098226bc1c785efdf4ddea6dbdff8c5929e4f89}
		/>
		  <Text data-elementId='textlabel_UserName' 
			   style={styles.textlabel_UserNameText3}>Someone
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage5}
		   source={img1824399003ad8e7e5b5a17264c44f18060d2eb9d}
		/>
		  <Text data-elementId='textlabel_Username' 
			   style={styles.textlabel_UsernameText3}>someone
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage6}
		   source={imgc181633b7f85de2eb71688f6257798f8bae3670d}
		/>
		  <Text data-elementId='textlabel_UserName' 
			   style={styles.textlabel_UserNameText4}>Someone
		  </Text>
		  <Text data-elementId='textlabel_Username' 
			   style={styles.textlabel_UsernameText4}>someone
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage7}
		   source={imgd65936a13898f2b32d7cd42b6c203b28833a14a0}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage8}
		   source={imgf3b15f0b177015e8e6ee44688fd1d67acf67c328}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage9}
		   source={imged23937a024461a2dcdbaf0a40719e406561b1e9}
		/>
		<Image data-elementId='imagenav_Bitmap' 
		   style={styles.imagenav_BitmapImageNav}
		   source={img2a7844c9eb9d48010ee52cd4cdacb4dc42dc2237}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage10}
		   source={img3dfaafc243102583e49b449b9a4356168185ca30}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage11}
		   source={imge93a5a73eda68646de39ce4c30967893df0745aa}
		/>
		  <Text data-elementId='textlabel_' 
			   style={styles.textlabel_Text}>@
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage12}
		   source={imgba4f238aea431cef61010e1206b8f5ac6f8025a0}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage13}
		   source={img005e285a49cf52123d73e0174533d0e7809f5401}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage14}
		   source={img68a5b9bcf6fbfe61a152c1d0956766f3049a17b9}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage15}
		   source={imgca48775f0aa76ce250a167383a01cb00b9a25dfb}
		/>
			</View>
			</SafeAreaView>
	
		)
	}

}
