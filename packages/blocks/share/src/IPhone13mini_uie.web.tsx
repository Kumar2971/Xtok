//This an auto generated file for Artboard Name = IPhone13mini And Supports ReactNative Ver. = 0.62
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
import { img1984f9eb1caa3de2e03ba934a40bc434dfe0a460, img4eb808f99e7b22c9d6ab090d6a6054ce55695616, imgc441422b449a3ea359776448de67d6573f250639, imgf9ca143f46dd92751823d5af15d68ccec1094f27, img01e9e2f6380bab0e020cfe7de6c72faeb851e82a, imga8500eb95e9ffef8e85b9b36a8d9e481689ecf62, img38d33db473e6f3b2af4168d8a686ce8b5081dc46, imgd0545f9b19127fff48e7f99f90d9e292c8120918, img7b4f48c72b2ebb3420ac5c918ae8e27d5286bede, imgd85d1ebbcf8bcff17d3a43692c16d7ab296c0885, imge8a95e7800a1d1a571f473775768504104a9eaac, img4b3c1f7e198a2d6762f7f2ea326e1d844f082eb2, img4804fc97cf22f8bcf10b88e7746da6a992892982, img6f214e95fe377b02f4d7729d21c0328f47c0f3c6, imgd5df817da0743b3f455bb980cb68a5f20ef45ae2, img8be73dfea842dba85635779a9e4123cc41de8ea5, imgb5238ad06e413a5913c9681b12e976f1b22dd4ff, imgc9ec667cc0b4429e663212cd40db7fdd199a17fc, imgb9bbfa06b7017ee6147ccb237ebfefb24d64692f } from './assets'
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

 
 
export default class IPhone13mini extends React.Component
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
    IPhone13miniView: {
        backgroundColor: "rgba(255, 249, 234, 1)",
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
        height: MergeEngineUtilities.deviceBasedDynamicDimension(414, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(398, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(41, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(166, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(414, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(60, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(86, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(435, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(60, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(146, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(435, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(60, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(205, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(435, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(60, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(265, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(435, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage8: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(60, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(324, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(435, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage9: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(57, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(64, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(13, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(436, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage10: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(45, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(157, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(535, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage11: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(57, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(76, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(554, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage12: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(57, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(140, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(554, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage13: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(58, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(204, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(554, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage14: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(57, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(66, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(555, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage15: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(57, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(66, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(269, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(555, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage16: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(57, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(67, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(333, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(555, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage17: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(57, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(66, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(9, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(648, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage18: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(62, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(80, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(68, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(648, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage19: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(57, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(66, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(132, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(648, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage20: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(57, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(66, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(198, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(648, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage21: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(72, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(80, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(248, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(648, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    imagenav_BitmapImageNav: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(154, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(34, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(113, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(746, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage22: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(134, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(5, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(121, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(797, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
})

const styles = {...global_styles, ...local_styles}
 
 
 	return (

		<SafeAreaView style={{"flex":1}}> 
		<View 
				style={styles.IPhone13miniView}>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage}
		   source={imgc9ec667cc0b4429e663212cd40db7fdd199a17fc}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage2}
		   source={imgd0545f9b19127fff48e7f99f90d9e292c8120918}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage3}
		   source={img4b3c1f7e198a2d6762f7f2ea326e1d844f082eb2}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage4}
		   source={imgd5df817da0743b3f455bb980cb68a5f20ef45ae2}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage5}
		   source={imgd5df817da0743b3f455bb980cb68a5f20ef45ae2}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage6}
		   source={imgd5df817da0743b3f455bb980cb68a5f20ef45ae2}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage7}
		   source={imgd5df817da0743b3f455bb980cb68a5f20ef45ae2}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage8}
		   source={imgd5df817da0743b3f455bb980cb68a5f20ef45ae2}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage9}
		   source={imgf9ca143f46dd92751823d5af15d68ccec1094f27}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage10}
		   source={imgc441422b449a3ea359776448de67d6573f250639}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage11}
		   source={imge8a95e7800a1d1a571f473775768504104a9eaac}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage12}
		   source={imgb9bbfa06b7017ee6147ccb237ebfefb24d64692f}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage13}
		   source={img8be73dfea842dba85635779a9e4123cc41de8ea5}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage14}
		   source={img4eb808f99e7b22c9d6ab090d6a6054ce55695616}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage15}
		   source={img7b4f48c72b2ebb3420ac5c918ae8e27d5286bede}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage16}
		   source={imgd85d1ebbcf8bcff17d3a43692c16d7ab296c0885}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage17}
		   source={imga8500eb95e9ffef8e85b9b36a8d9e481689ecf62}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage18}
		   source={img38d33db473e6f3b2af4168d8a686ce8b5081dc46}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage19}
		   source={img01e9e2f6380bab0e020cfe7de6c72faeb851e82a}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage20}
		   source={img4804fc97cf22f8bcf10b88e7746da6a992892982}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage21}
		   source={img1984f9eb1caa3de2e03ba934a40bc434dfe0a460}
		/>
		<Image data-elementId='imagenav_Bitmap' 
		   style={styles.imagenav_BitmapImageNav}
		   source={img6f214e95fe377b02f4d7729d21c0328f47c0f3c6}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage22}
		   source={imgb5238ad06e413a5913c9681b12e976f1b22dd4ff}
		/>
			</View>
			</SafeAreaView>
	
		)
	}

}
