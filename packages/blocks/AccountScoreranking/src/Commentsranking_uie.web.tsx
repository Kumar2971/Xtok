//This an auto generated file for Artboard Name = Commentsranking And Supports ReactNative Ver. = 0.62
import { SafeAreaView, Dimensions,View, Text, StyleSheet, Image} from 'react-native'; 

import React from 'react'; 


import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import global_styles from "../../utilities/src/global_styles";
let screenWidth = Dimensions.get('window').width; 
import { img41ecd11d8b966920c7dd7f12ce9c9e68157883f7, img4f95254ca2e83d9975dc6fb10d216cde147c406f, imgf47a7f80bff76d6c0849b167076be78b33e12867, img17bb671483dcb1c36b4077debb9aac74edf3bd50, img33b55e986432088194ce4ca75bf7ec51fd430ed7, img2e56aa4b561f5ca2bb4929b62637d33cb90312be, img185e1b6fd0a655b7c68b6569fb059a5038029290, img4886fa5617e823ef9f08f561e9c92748dc7ebf00, img821961642ff2f0e4373b70b1bfe340a8e0a55237, imgc7c34f0279d40dee852a5fc512c2d5b195ad2156, img48036a85586c06bc43e297532e1495019e9e352a, img6957264f344f371d6962c6a9ce12b9102a89fd5a, img962ca027d30f3440641dd1a5e1160120c4e11921, imgec48be10d92f9750f7965bdb9fd16fccc7a4021c, img4191088993c94992a853f0e9056ed3b2b40c1548, imga24ce7d31f4731d1df57bd0fc60182a24c446ab9, imge27d6cf427367998c3241b5c4a001479af979130, img54ad2ef4f1a9177ece545ea119f970ee1b4ab697, imgfdb80db73e0e6acd98907164e4d48cadda3abdaf, img183bd4943ac7aeeec015b594730c10bf10d40b66, imgd72a8f8a6d382944939ad553799650c9d8fe6911, img72e7c378497bdd2f68e142870fd6cdf69eb26c21, imge63b5adc3b487d31a5088ec1acb29e2e152fe720 } from './assets'
let screenHeight = Dimensions.get('window').height; 
//Artboard Dimension 
let artBoardHeightOrg = 812; 
let artBoardWidthOrg = 375; 
//Re calculated Artboard Dimension 

// To check if Artboard and Device screen has same ratio 
function isSameRatio(): boolean {
    return artBoardWidthOrg / artBoardHeightOrg < 1 && screenWidth / screenHeight < 1 
}
 
//Top or Bottom nav spaces or any extra space occupied by os e.g Status bar, Notch 


 
 
export default class Commentsranking extends React.Component
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
    CommentsrankingView: {
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
    image_BitmapImage2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(0, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(811, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(1, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(517, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(221, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(80, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(148, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(234, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_closeImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(12, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(347, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(235, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(31, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(30, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(265, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(36, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(341, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(276, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_45kText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(326, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(287, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 201, 37, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    attrbuted_textlabel_45kText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(326, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(287, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 201, 37, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage8: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(11, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(6, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(143, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(316, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage9: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(31, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(31, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(337, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage10: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(36, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(341, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(351, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_SettingsText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(326, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(362, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 0.3799999952316284)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    attrbuted_textlabel_SettingsText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(326, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(362, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 0.3799999952316284)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage11: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(11, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(6, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(143, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(388, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage12: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(31, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(31, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(410, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage13: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(36, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(341, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(421, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_SettingsText2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(326, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(432, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(5, 0, 255, 0.75)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    attrbuted_textlabel_SettingsText2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(326, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(432, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(5, 0, 255, 0.75)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage14: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(31, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(31, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(464, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage15: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(36, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(341, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(475, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_SettingsText3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(326, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(486, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 0.3799999952316284)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    attrbuted_textlabel_SettingsText3: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(326, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(486, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 0.3799999952316284)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage16: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(11, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(6, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(143, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(515, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage17: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(31, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(31, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(537, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage18: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(119, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(542, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage19: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(36, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(341, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(550, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_SettingsText4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(326, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(561, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 0.3799999952316284)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    attrbuted_textlabel_SettingsText4: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(326, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(561, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 0.3799999952316284)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage20: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(11, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(6, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(143, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(588, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage21: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(31, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(31, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(609, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage22: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(36, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(341, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(621, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_SettingsText5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(326, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(632, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 0.3799999952316284)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    attrbuted_textlabel_SettingsText5: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(326, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(632, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 0.3799999952316284)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage23: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(11, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(6, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(143, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(660, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage24: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(31, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(31, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(682, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage25: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(36, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(341, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(693, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_SettingsText6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(326, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(704, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 0.3799999952316284)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    attrbuted_textlabel_SettingsText6: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(42, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(326, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(704, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 0.3799999952316284)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    imagenav_BitmapImageNav: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(75, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(737, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    view_Ellipse5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(29, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(15, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(737, false, 1),
        opacity: 1,
        backgroundColor: "rgba(196, 196, 196, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    image_BitmapImage26: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(21, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(300, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(751, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage27: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(21, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(340, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(751, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage28: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(95, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(11, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(755, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage29: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(123, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(5, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(125, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(798, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
})

const styles = {...global_styles, ...local_styles}
 
 
 	return (

		<SafeAreaView style={{"flex":1}}> 
		<View 
				style={styles.CommentsrankingView}>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage}
		   source={img6957264f344f371d6962c6a9ce12b9102a89fd5a}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage2}
		   source={imgec48be10d92f9750f7965bdb9fd16fccc7a4021c}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage3}
		   source={img4886fa5617e823ef9f08f561e9c92748dc7ebf00}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage4}
		   source={imgf47a7f80bff76d6c0849b167076be78b33e12867}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage5}
		   source={img4f95254ca2e83d9975dc6fb10d216cde147c406f}
		/>
		<Image data-elementId='image_close' 
		   style={styles.image_closeImage}
		   source={imgd72a8f8a6d382944939ad553799650c9d8fe6911}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage6}
		   source={img821961642ff2f0e4373b70b1bfe340a8e0a55237}
		/>
		  <Text data-elementId='textlabel_Martini_rond' 
			   style={styles.textlabel_Martini_rondText}>martini_rond
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage7}
		   source={img17bb671483dcb1c36b4077debb9aac74edf3bd50}
		/>
		  <Text data-elementId='attrbuted_textlabel_HowNeatlyIWriteTheDateInMyBook22h' 
			   style={styles.attrbuted_textlabel_HowNeatlyIWriteTheDateInMyBook22hText}>How neatly I write the date in my book
		  		  <Text data-elementId='attrbuted_textlabel_HowNeatlyIWriteTheDateInMyBook22h' 
			   style={styles.attrbuted_textlabel_HowNeatlyIWriteTheDateInMyBook22hText2}> 
		  </Text>
 
		  		  <Text data-elementId='attrbuted_textlabel_HowNeatlyIWriteTheDateInMyBook22h' 
			   style={styles.attrbuted_textlabel_HowNeatlyIWriteTheDateInMyBook22hText3}>22h
		  </Text>
 
		  </Text>
		  <Text data-elementId='textlabel_4.5k' 
			   style={styles.textlabel_45kText}>4.5k
		  </Text>
		  <Text data-elementId='textlabel_ViewReplies4' 
			   style={styles.textlabel_ViewReplies4Text}>View replies (4)
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage8}
		   source={imge63b5adc3b487d31a5088ec1acb29e2e152fe720}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage9}
		   source={imga24ce7d31f4731d1df57bd0fc60182a24c446ab9}
		/>
		  <Text data-elementId='textlabel_Maxjacobson' 
			   style={styles.textlabel_MaxjacobsonText}>maxjacobson
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage10}
		   source={img48036a85586c06bc43e297532e1495019e9e352a}
		/>
		  <Text data-elementId='attrbuted_textlabel_NowThatsASkillVeryTalented22h' 
			   style={styles.attrbuted_textlabel_NowThatsASkillVeryTalented22hText}>Now that’s a skill very talented
		  		  <Text data-elementId='attrbuted_textlabel_NowThatsASkillVeryTalented22h' 
			   style={styles.attrbuted_textlabel_NowThatsASkillVeryTalented22hText2}> 
		  </Text>
 
		  		  <Text data-elementId='attrbuted_textlabel_NowThatsASkillVeryTalented22h' 
			   style={styles.attrbuted_textlabel_NowThatsASkillVeryTalented22hText3}>22h
		  </Text>
 
		  </Text>
		  <Text data-elementId='textlabel_Settings' 
			   style={styles.textlabel_SettingsText}>3k
		  </Text>
		  <Text data-elementId='textlabel_ViewReplies1' 
			   style={styles.textlabel_ViewReplies1Text}>View replies (1)
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage11}
		   source={imge63b5adc3b487d31a5088ec1acb29e2e152fe720}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage12}
		   source={img185e1b6fd0a655b7c68b6569fb059a5038029290}
		/>
		  <Text data-elementId='textlabel_Zackjohn' 
			   style={styles.textlabel_ZackjohnText}>zackjohn
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage13}
		   source={img33b55e986432088194ce4ca75bf7ec51fd430ed7}
		/>
		  <Text data-elementId='attrbuted_textlabel_DoingThisWouldMakeMeSoAnxious22h' 
			   style={styles.attrbuted_textlabel_DoingThisWouldMakeMeSoAnxious22hText}>Doing this would make me so anxious
		  		  <Text data-elementId='attrbuted_textlabel_DoingThisWouldMakeMeSoAnxious22h' 
			   style={styles.attrbuted_textlabel_DoingThisWouldMakeMeSoAnxious22hText2}> 
		  </Text>
 
		  		  <Text data-elementId='attrbuted_textlabel_DoingThisWouldMakeMeSoAnxious22h' 
			   style={styles.attrbuted_textlabel_DoingThisWouldMakeMeSoAnxious22hText3}>22h
		  </Text>
 
		  </Text>
		  <Text data-elementId='textlabel_Settings' 
			   style={styles.textlabel_SettingsText2}>1.5k
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage14}
		   source={img183bd4943ac7aeeec015b594730c10bf10d40b66}
		/>
		  <Text data-elementId='textlabel_Kiero_d' 
			   style={styles.textlabel_Kiero_dText}>kiero_d
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage15}
		   source={img48036a85586c06bc43e297532e1495019e9e352a}
		/>
		  <Text data-elementId='attrbuted_textlabel_UseThatOnRAirFo' 
			   style={styles.attrbuted_textlabel_UseThatOnRAirFoText}>Use that on r air forces to whiten them
		  		  <Text data-elementId='attrbuted_textlabel_UseThatOnRAirFo' 
			   style={styles.attrbuted_textlabel_UseThatOnRAirFoText2}> 
		  </Text>
 
		  		  <Text data-elementId='attrbuted_textlabel_UseThatOnRAirFo' 
			   style={styles.attrbuted_textlabel_UseThatOnRAirFoText3}>21h
		  </Text>
 
		  </Text>
		  <Text data-elementId='textlabel_Settings' 
			   style={styles.textlabel_SettingsText3}>900
		  </Text>
		  <Text data-elementId='textlabel_ViewReplies9' 
			   style={styles.textlabel_ViewReplies9Text}>View replies (9)
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage16}
		   source={imge63b5adc3b487d31a5088ec1acb29e2e152fe720}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage17}
		   source={img54ad2ef4f1a9177ece545ea119f970ee1b4ab697}
		/>
		  <Text data-elementId='textlabel_Mis_potter' 
			   style={styles.textlabel_Mis_potterText}>mis_potter
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage18}
		   source={imgc7c34f0279d40dee852a5fc512c2d5b195ad2156}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage19}
		   source={img48036a85586c06bc43e297532e1495019e9e352a}
		/>
		  <Text data-elementId='attrbuted_textlabel_ShouldveUsedThat' 
			   style={styles.attrbuted_textlabel_ShouldveUsedThatText}>Should’ve used that on his forces
		  		  <Text data-elementId='attrbuted_textlabel_ShouldveUsedThat' 
			   style={styles.attrbuted_textlabel_ShouldveUsedThatText2}> 
		  </Text>
 
		  		  <Text data-elementId='attrbuted_textlabel_ShouldveUsedThat' 
			   style={styles.attrbuted_textlabel_ShouldveUsedThatText3}>😷😷
		  </Text>
 
		  		  <Text data-elementId='attrbuted_textlabel_ShouldveUsedThat' 
			   style={styles.attrbuted_textlabel_ShouldveUsedThatText4}> 
		  </Text>
 
		  		  <Text data-elementId='attrbuted_textlabel_ShouldveUsedThat' 
			   style={styles.attrbuted_textlabel_ShouldveUsedThatText5}>13h
		  </Text>
 
		  </Text>
		  <Text data-elementId='textlabel_Settings' 
			   style={styles.textlabel_SettingsText4}>350
		  </Text>
		  <Text data-elementId='textlabel_ViewReplies4' 
			   style={styles.textlabel_ViewReplies4Text2}>View replies (4)
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage20}
		   source={imge63b5adc3b487d31a5088ec1acb29e2e152fe720}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage21}
		   source={img41ecd11d8b966920c7dd7f12ce9c9e68157883f7}
		/>
		  <Text data-elementId='textlabel_Karennne' 
			   style={styles.textlabel_KarennneText}>karennne
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage22}
		   source={img48036a85586c06bc43e297532e1495019e9e352a}
		/>
		  <Text data-elementId='attrbuted_textlabel_NoPrressure22h' 
			   style={styles.attrbuted_textlabel_NoPrressure22hText}>No prressure
		  		  <Text data-elementId='attrbuted_textlabel_NoPrressure22h' 
			   style={styles.attrbuted_textlabel_NoPrressure22hText2}> 
		  </Text>
 
		  		  <Text data-elementId='attrbuted_textlabel_NoPrressure22h' 
			   style={styles.attrbuted_textlabel_NoPrressure22hText3}>22h
		  </Text>
 
		  </Text>
		  <Text data-elementId='textlabel_Settings' 
			   style={styles.textlabel_SettingsText5}>122
		  </Text>
		  <Text data-elementId='textlabel_ViewReplies2' 
			   style={styles.textlabel_ViewReplies2Text}>View replies (2)
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage23}
		   source={imge63b5adc3b487d31a5088ec1acb29e2e152fe720}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage24}
		   source={img962ca027d30f3440641dd1a5e1160120c4e11921}
		/>
		  <Text data-elementId='textlabel_Joshua_l' 
			   style={styles.textlabel_Joshua_lText}>joshua_l
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage25}
		   source={img48036a85586c06bc43e297532e1495019e9e352a}
		/>
		  <Text data-elementId='attrbuted_textlabel_MyOcdCouldntDoIt15h' 
			   style={styles.attrbuted_textlabel_MyOcdCouldntDoIt15hText}>My OCD couldn’t do it
		  		  <Text data-elementId='attrbuted_textlabel_MyOcdCouldntDoIt15h' 
			   style={styles.attrbuted_textlabel_MyOcdCouldntDoIt15hText2}> 
		  </Text>
 
		  		  <Text data-elementId='attrbuted_textlabel_MyOcdCouldntDoIt15h' 
			   style={styles.attrbuted_textlabel_MyOcdCouldntDoIt15hText3}>15h
		  </Text>
 
		  </Text>
		  <Text data-elementId='textlabel_Settings' 
			   style={styles.textlabel_SettingsText6}>35
		  </Text>
		<Image data-elementId='imagenav_Bitmap' 
		   style={styles.imagenav_BitmapImageNav}
		   source={img72e7c378497bdd2f68e142870fd6cdf69eb26c21}
		/>
		<View data-elementId='view_Ellipse5' 
		   style={[styles.view_Ellipse5, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage26}
		   source={img4191088993c94992a853f0e9056ed3b2b40c1548}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage27}
		   source={img2e56aa4b561f5ca2bb4929b62637d33cb90312be}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage28}
		   source={imgfdb80db73e0e6acd98907164e4d48cadda3abdaf}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage29}
		   source={imge27d6cf427367998c3241b5c4a001479af979130}
		/>
			</View>
			</SafeAreaView>
	
		)
	}

}
