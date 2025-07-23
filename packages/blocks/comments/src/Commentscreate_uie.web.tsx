//This an auto generated file for Artboard Name = Commentscreate And Supports ReactNative Ver. = 0.62
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
import { imgca67dc387ab56982ae029c9ba76f3042edc902af, imgd7b62f0a4570e3703023783af3c3324f5987f12f, img39087bc7f1084ec4620ae1acc9e2118dde1e01b9, imgafa1c0886a89f618298a5cfb287ba20bec5f86be, imged3ac48b38089feea3124775561211fc69a6329f, imgcd28af3ea93278191ae572de8e70dedfce4cfd19, imgfbc8fd5f459cb33aa37553805e843322f9d82b8b, img9a199ffef7ed9056b439d0ef3f6e1839580b207b, imgc0b0f1d0d1682c1144d02c035a02ff7ecdda3cd0, img1996889c10115ef20bb56c06675f025df7fd074b, img5ccb52a9546b1ad05790055de0b1b7296d44aef7, imgaebeb95e379c67c394025840432fb72664a2745d, img62a5790262f02d5e5cb9938da8c4a3a589dde045, img67689a795c84eb02acfd14ada5d751bcb320b2d9 } from './assets'
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

 
 
export default class Commentscreate extends React.Component
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
    CommentscreateView: {
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
    image_BitmapImage2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(385, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(427, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(282, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(36, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(47, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(434, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(31, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(32, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(436, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    imagenav_BitmapImageNav: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(27, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(26, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(339, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(439, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    view_ActionButtonsBackground: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(82, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(22, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(239, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(441, false, 1),
        opacity: 1,
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    image_BitmapImage5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(21, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(261, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(441, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(23, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(22, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(297, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(441, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_HelloText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(55, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(443, false, 1),
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
    attrbuted_textlabel_HelloText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(55, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(443, false, 1),
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
    image_BitmapImage7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(3, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(117, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(443, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage8: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(23, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(23, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(481, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage9: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(22, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(23, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(55, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(481, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage10: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(23, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(23, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(95, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(481, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage11: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(23, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(23, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(136, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(481, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage12: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(23, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(23, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(177, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(481, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage13: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(22, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(23, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(218, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(481, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage14: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(23, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(23, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(299, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(481, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage15: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(22, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(23, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(340, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(481, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage16: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(21, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(259, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(482, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage17: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(376, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(295, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(517, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
})

const styles = {...global_styles, ...local_styles}
 
 
 	return (

		<SafeAreaView style={{"flex":1}}> 
		<View 
				style={styles.CommentscreateView}>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage}
		   source={imgca67dc387ab56982ae029c9ba76f3042edc902af}
		/>
		<View data-elementId='view_Rectangle' 
		   style={[styles.view_Rectangle, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage2}
		   source={img62a5790262f02d5e5cb9938da8c4a3a589dde045}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage3}
		   source={imgd7b62f0a4570e3703023783af3c3324f5987f12f}
		/>
		{/* <Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage4}
		   source={img859540215df57a53d1b8e50c7f8bcb069d193408}
		/> */}
		<Image data-elementId='imagenav_Bitmap' 
		   style={styles.imagenav_BitmapImageNav}
		   source={img9a199ffef7ed9056b439d0ef3f6e1839580b207b}
		/>
		<View data-elementId='view_ActionButtonsBackground' 
		   style={[styles.view_ActionButtonsBackground, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		{/* <Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage5}
		   source={img582008df0689d56b2bc5570c641036c0016b4efa}
		/> */}
		{/* <Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage6}
		   source={imgffd54c1cd43c44f5f91e032fe0774fe36866ce04}
		/> */}
		  <Text data-elementId='textlabel_Hello' 
			   style={styles.textlabel_HelloText}>Awesome
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage7}
		   source={img67689a795c84eb02acfd14ada5d751bcb320b2d9}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage8}
		   source={img39087bc7f1084ec4620ae1acc9e2118dde1e01b9}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage9}
		   source={imgafa1c0886a89f618298a5cfb287ba20bec5f86be}
		/>
		{/* <Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage10}
		   source={imgb5d84a375d56149346793b173884295fb45628c2}
		/> */}
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage11}
		   source={imged3ac48b38089feea3124775561211fc69a6329f}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage12}
		   source={imgfbc8fd5f459cb33aa37553805e843322f9d82b8b}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage13}
		   source={imgaebeb95e379c67c394025840432fb72664a2745d}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage14}
		   source={imgc0b0f1d0d1682c1144d02c035a02ff7ecdda3cd0}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage15}
		   source={img1996889c10115ef20bb56c06675f025df7fd074b}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage16}
		   source={img5ccb52a9546b1ad05790055de0b1b7296d44aef7}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage17}
		   source={imgcd28af3ea93278191ae572de8e70dedfce4cfd19}
		/>
			</View>
			</SafeAreaView>
	
		)
	}

}
