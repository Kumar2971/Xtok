//This an auto generated file for Artboard Name = Cameraaccess2 And Supports ReactNative Ver. = 0.62
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
import { img919072e99a286dafae61c15f7787728e18a344bc, img5bba655ccc3292dacd60ab4212af2a4d535690e9, img6d8ae5ab86be95e0dceb2edd386a7fa8ef3933e4, img47e8da6cd83028892c39531bf9fd2b136119c014, img7e3a454b2c4e7ef30be2dd16a6a6bdbab41747eb, img9137227ffbfbc9f43b9cc3edcadad9cf37acbfd0, imga3c2151a2949ad42e17fdb25fc121b5d073b54c5, imgf00d179efdde599bb6cb3c97c5fea8d1fd71aa77, img3f363496fa8f55b3a2553a1bfd3dcaad79ad79e2, imgc2fc1390b2dd0a50059ba0c3e659e812bbe2305a, img47d1ed6c59bcb119963bc7d785e64ef5435cb64b, imge454b05ef058bf7c8d0b11d63628b1d984b60dbd, img517f1eb962708f0e8deec87232968adfbc393f62, imgab288ced7b8f7bb0121ef81aa165032ce1ee3cbe, img184ed2a57f55c093cc86eb73666163723c04352b, img2a9f02c1885ce674253a3407e00f8cedc0a04d4a, img8cb1195865cc1bcedbb3750151eb7854c8e38b63 } from './assets'
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

 
 
export default class Cameraaccess2 extends React.Component
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
    Cameraaccess2View: {
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
        height: MergeEngineUtilities.deviceBasedDynamicDimension(40, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(0, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(685, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(35, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(361, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(5, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(7, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(45, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(32, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(28, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(64, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(23, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(22, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(67, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(155, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(67, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage8: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(30, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(335, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(120, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage9: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(31, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(30, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(335, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(176, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage10: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(29, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(335, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(233, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage11: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(28, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(30, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(336, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(289, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage12: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(25, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(30, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(337, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(345, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    imagenav_BitmapImageNav: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(73, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(72, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(152, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(617, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage13: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(37, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(37, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(282, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(635, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage14: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(38, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(38, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(56, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(636, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_LiveText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(24, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(306, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(730, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 255, 255, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_LiveText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(24, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(306, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(730, false, 1),
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
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
    },
    image_BitmapImage15: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(4, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(4, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(189, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(750, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage16: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(32, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(780, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
})

const styles = {...global_styles, ...local_styles}
 
 
 	return (

		<SafeAreaView style={{"flex":1}}> 
		<View 
				style={styles.Cameraaccess2View}>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage}
		   source={img47d1ed6c59bcb119963bc7d785e64ef5435cb64b}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage2}
		   source={img517f1eb962708f0e8deec87232968adfbc393f62}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage3}
		   source={img3f363496fa8f55b3a2553a1bfd3dcaad79ad79e2}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage4}
		   source={img47e8da6cd83028892c39531bf9fd2b136119c014}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage5}
		   source={imga3c2151a2949ad42e17fdb25fc121b5d073b54c5}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage6}
		   source={img8cb1195865cc1bcedbb3750151eb7854c8e38b63}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage7}
		   source={img184ed2a57f55c093cc86eb73666163723c04352b}
		/>
		  <Text data-elementId='textlabel_Sounds' 
			   style={styles.textlabel_SoundsText}>Sounds
		  </Text>
		  <Text data-elementId='textlabel_Flip' 
			   style={styles.textlabel_FlipText}>Flip
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage8}
		   source={img7e3a454b2c4e7ef30be2dd16a6a6bdbab41747eb}
		/>
		  <Text data-elementId='textlabel_Speed' 
			   style={styles.textlabel_SpeedText}>Speed
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage9}
		   source={img6d8ae5ab86be95e0dceb2edd386a7fa8ef3933e4}
		/>
		  <Text data-elementId='textlabel_Beauty' 
			   style={styles.textlabel_BeautyText}>Beauty
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage10}
		   source={imgc2fc1390b2dd0a50059ba0c3e659e812bbe2305a}
		/>
		  <Text data-elementId='textlabel_Filters' 
			   style={styles.textlabel_FiltersText}>Filters
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage11}
		   source={imgf00d179efdde599bb6cb3c97c5fea8d1fd71aa77}
		/>
		  <Text data-elementId='textlabel_Timer' 
			   style={styles.textlabel_TimerText}>Timer
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage12}
		   source={img5bba655ccc3292dacd60ab4212af2a4d535690e9}
		/>
		  <Text data-elementId='textlabel_Flash' 
			   style={styles.textlabel_FlashText}>Flash
		  </Text>
		<Image data-elementId='imagenav_Bitmap' 
		   style={styles.imagenav_BitmapImageNav}
		   source={img919072e99a286dafae61c15f7787728e18a344bc}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage13}
		   source={img2a9f02c1885ce674253a3407e00f8cedc0a04d4a}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage14}
		   source={imge454b05ef058bf7c8d0b11d63628b1d984b60dbd}
		/>
		  <Text data-elementId='textlabel_Upload' 
			   style={styles.textlabel_UploadText}>Upload
		  </Text>
		  <Text data-elementId='textlabel_Effects' 
			   style={styles.textlabel_EffectsText}>Effects
		  </Text>
		  <Text data-elementId='textlabel_90s' 
			   style={styles.textlabel_90sText}>90s
		  </Text>
		  <Text data-elementId='textlabel_60s' 
			   style={styles.textlabel_60sText}>60s
		  </Text>
		  <Text data-elementId='textlabel_30s' 
			   style={styles.textlabel_30sText}>30s
		  </Text>
		  <Text data-elementId='textlabel_15s' 
			   style={styles.textlabel_15sText}>15s
		  </Text>
		  <Text data-elementId='textlabel_Templates' 
			   style={styles.textlabel_TemplatesText}>Templates
		  </Text>
		  <Text data-elementId='textlabel_Live' 
			   style={styles.textlabel_LiveText}>Live
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage15}
		   source={imgab288ced7b8f7bb0121ef81aa165032ce1ee3cbe}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage16}
		   source={img9137227ffbfbc9f43b9cc3edcadad9cf37acbfd0}
		/>
			</View>
			</SafeAreaView>
	
		)
	}

}
