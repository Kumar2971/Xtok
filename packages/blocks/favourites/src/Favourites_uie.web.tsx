//This an auto generated file for Artboard Name = Favourites And Supports ReactNative Ver. = 0.62
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
import { img254c6482c9d652926dec61bec614068e9d276410, imgf832b994823b3b0fd71938001512be957400f059, img229822d88d3260fa08850fdd78e511981b7ae6e6, img5f6155dab7af02bfcf6692de6cb5a265a85d3548, imga9ee5f26214dd837be956db7a2cde6e5a4c93cd3, img571c5fa3c0b5f3c02668338e0f61fa2c5d2ed09e, img95fe78dfd714b7b66b9ad501aabaf25dd1f4a6f0, imgaabac574abb4377382b2caa74b07a00dd0ca6107, imgff37df7672919d9c7a4c5ad2545ae27097c60997, img1ce64331ab051ca11c1b2d11abe76aedf49ef450, img1cf24954d0577a7f0a7d0f1bc41f6b8d4424ff4b, img21a1bc237eb752396d31bd0981551b9939919289, imgd71d02bab28304776807cb6537287a55ac4a0942, img0fb6ff24f2e01d2b7722859941d733cd4eceeb3f, imga17c722c2592232091de0b9e5c6d54ab7f830be0, imgb78854910085c93efe34bfc01ce09fe5feaebaff, imgfac59e03885d3dd4251553ce18ec0362d359893e, img585ee9ae1c7d33bbef2357d3c3bdfe607816fccc, imgf2a1a2215d4570dc32d77f3f2ba82881a3d31882, imgbd497834e16e91bd4a9919284df218113a4bc005, img2ccb166a04c4aedcc683ce758ea263bb2ff923cf, imgb3f3485e68b56a8ce29fd4ccd4c7f5fb7c74389f } from './assets'
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

 
 
export default class Favourites extends React.Component
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
    FavouritesView: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        flex: 1,
        alignItems: "flex-start",
    },
    image_BitmapImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(40, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(0, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(25, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(25, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(8, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(49, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(21, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(300, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(53, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(21, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(335, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(53, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(89, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(89, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(143, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(96, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_UserNameText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(72, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(151, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(194, false, 1),
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
    attrbuted_textlabel_UserNameText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(72, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(151, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(194, false, 1),
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
    image_BitmapImage6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(6, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(42, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(142, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(224, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(6, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(42, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(226, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(224, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_FollowingText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(54, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(76, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(247, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(138, 139, 143, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_FollowingText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(54, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(76, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(247, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(138, 139, 143, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    imagenav_BitmapImageNav: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(148, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(40, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(92, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(279, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage8: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(40, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(40, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(242, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(279, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage9: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(37, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(377, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage10: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(45, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(36, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(79, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(377, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage11: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(35, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(252, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(378, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage12: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(124, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(164, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(414, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage13: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(125, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(164, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(126, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(414, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage14: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(125, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(164, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(250, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(414, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage15: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(2, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(561, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage16: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(128, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(561, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage17: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(253, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(561, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage18: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(125, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(164, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(580, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage19: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(125, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(164, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(126, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(580, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage20: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(125, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(164, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(250, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(580, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage21: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(2, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(727, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage22: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(128, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(727, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage23: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(253, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(727, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage24: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(83, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(729, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage25: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(32, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(32, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(250, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(732, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage26: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(270, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(732, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage27: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(32, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(32, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(323, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(732, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage28: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(22, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(99, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(736, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage29: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(24, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(21, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(24, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(737, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_LiveText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(19, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(100, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(763, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 255, 255, 0.75)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_LiveText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(19, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(100, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(763, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 255, 255, 0.75)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    },
    image_BitmapImage30: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(35, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(777, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
})

const styles = {...global_styles, ...local_styles}
 
 
 	return (

		<SafeAreaView style={{"flex":1}}> 
		<View 
				style={styles.FavouritesView}>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage}
		   source={img229822d88d3260fa08850fdd78e511981b7ae6e6}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage2}
		   source={imga17c722c2592232091de0b9e5c6d54ab7f830be0}
		/>
		  <Text data-elementId='textlabel_Titile' 
			   style={styles.textlabel_TitileText}>Someone
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage3}
		   source={img1cf24954d0577a7f0a7d0f1bc41f6b8d4424ff4b}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage4}
		   source={img21a1bc237eb752396d31bd0981551b9939919289}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage5}
		   source={imgfac59e03885d3dd4251553ce18ec0362d359893e}
		/>
		  <Text data-elementId='textlabel_UserName' 
			   style={styles.textlabel_UserNameText}>@someone
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage6}
		   source={imgf2a1a2215d4570dc32d77f3f2ba82881a3d31882}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage7}
		   source={imgf2a1a2215d4570dc32d77f3f2ba82881a3d31882}
		/>
		  <Text data-elementId='textlabel_0' 
			   style={styles.textlabel_0Text}>0
		  </Text>
		  <Text data-elementId='textlabel_0' 
			   style={styles.textlabel_0Text2}>0
		  </Text>
		  <Text data-elementId='textlabel_0' 
			   style={styles.textlabel_0Text3}>0
		  </Text>
		  <Text data-elementId='textlabel_Following' 
			   style={styles.textlabel_FollowingText}>Following
		  </Text>
		  <Text data-elementId='textlabel_Followers' 
			   style={styles.textlabel_FollowersText}>Followers
		  </Text>
		  <Text data-elementId='textlabel_Likes' 
			   style={styles.textlabel_LikesText}>Likes
		  </Text>
		<Image data-elementId='imagenav_Bitmap' 
		   style={styles.imagenav_BitmapImageNav}
		   source={imgbd497834e16e91bd4a9919284df218113a4bc005}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage8}
		   source={imgf832b994823b3b0fd71938001512be957400f059}
		/>
		  <Text data-elementId='textlabel_Follow' 
			   style={styles.textlabel_FollowText}>Following
		  </Text>
		  <Text data-elementId='textlabel_Biography' 
			   style={styles.textlabel_BiographyText}>Follow me for daily videos
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage9}
		   source={imgff37df7672919d9c7a4c5ad2545ae27097c60997}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage10}
		   source={img95fe78dfd714b7b66b9ad501aabaf25dd1f4a6f0}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage11}
		   source={imgb78854910085c93efe34bfc01ce09fe5feaebaff}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage12}
		   source={imgaabac574abb4377382b2caa74b07a00dd0ca6107}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage13}
		   source={img5f6155dab7af02bfcf6692de6cb5a265a85d3548}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage14}
		   source={img5f6155dab7af02bfcf6692de6cb5a265a85d3548}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage15}
		   source={imgb3f3485e68b56a8ce29fd4ccd4c7f5fb7c74389f}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage16}
		   source={imgb3f3485e68b56a8ce29fd4ccd4c7f5fb7c74389f}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage17}
		   source={imgb3f3485e68b56a8ce29fd4ccd4c7f5fb7c74389f}
		/>
		  <Text data-elementId='textlabel_0' 
			   style={styles.textlabel_0Text4}>0
		  </Text>
		  <Text data-elementId='textlabel_0' 
			   style={styles.textlabel_0Text5}>0
		  </Text>
		  <Text data-elementId='textlabel_0' 
			   style={styles.textlabel_0Text6}>0
		  </Text>
		  <Text data-elementId='textlabel_0' 
			   style={styles.textlabel_0Text7}>0
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage18}
		   source={img5f6155dab7af02bfcf6692de6cb5a265a85d3548}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage19}
		   source={img5f6155dab7af02bfcf6692de6cb5a265a85d3548}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage20}
		   source={img5f6155dab7af02bfcf6692de6cb5a265a85d3548}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage21}
		   source={imgb3f3485e68b56a8ce29fd4ccd4c7f5fb7c74389f}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage22}
		   source={imgb3f3485e68b56a8ce29fd4ccd4c7f5fb7c74389f}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage23}
		   source={imgb3f3485e68b56a8ce29fd4ccd4c7f5fb7c74389f}
		/>
		  <Text data-elementId='textlabel_0' 
			   style={styles.textlabel_0Text8}>0
		  </Text>
		  <Text data-elementId='textlabel_0' 
			   style={styles.textlabel_0Text9}>0
		  </Text>
		  <Text data-elementId='textlabel_0' 
			   style={styles.textlabel_0Text10}>0
		  </Text>
		  <Text data-elementId='textlabel_0' 
			   style={styles.textlabel_0Text11}>0
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage24}
		   source={imga9ee5f26214dd837be956db7a2cde6e5a4c93cd3}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage25}
		   source={img585ee9ae1c7d33bbef2357d3c3bdfe607816fccc}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage26}
		   source={imgd71d02bab28304776807cb6537287a55ac4a0942}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage27}
		   source={img254c6482c9d652926dec61bec614068e9d276410}
		/>
		  <Text data-elementId='textlabel_99' 
			   style={styles.textlabel_99Text}>99
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage28}
		   source={img2ccb166a04c4aedcc683ce758ea263bb2ff923cf}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage29}
		   source={img571c5fa3c0b5f3c02668338e0f61fa2c5d2ed09e}
		/>
		<Image data-elementId='image_Imagenav_bitmap' 
		   style={styles.image_Imagenav_bitmapImage}
		   source={img0fb6ff24f2e01d2b7722859941d733cd4eceeb3f}
		/>
		  <Text data-elementId='textlabel_Home' 
			   style={styles.textlabel_HomeText}>Home
		  </Text>
		  <Text data-elementId='textlabel_Live' 
			   style={styles.textlabel_LiveText}>Live
		  </Text>
		  <Text data-elementId='textlabel_Inbox' 
			   style={styles.textlabel_InboxText}>Inbox
		  </Text>
		  <Text data-elementId='textlabel_Inbox' 
			   style={styles.textlabel_InboxText2}>Inbox
		  </Text>
		  <Text data-elementId='textlabel_Profile' 
			   style={styles.textlabel_ProfileText}>Profile
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage30}
		   source={img1ce64331ab051ca11c1b2d11abe76aedf49ef450}
		/>
			</View>
			</SafeAreaView>
	
		)
	}

}
