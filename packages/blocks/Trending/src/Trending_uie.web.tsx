//This an auto generated file for Artboard Name = Trending And Supports ReactNative Ver. = 0.62
import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import global_styles from "../../utilities/src/global_styles";
import { img064e7aae7194777845bc16ca0efb0cde275f7779, img072db6af042e2e544083a2a01138b655ea8d970d, img0fb6ff24f2e01d2b7722859941d733cd4eceeb3f, img1ce64331ab051ca11c1b2d11abe76aedf49ef450, img254c6482c9d652926dec61bec614068e9d276410, img265a62cc55edbf6e846e664da4490a3a77d1ca53, img2ccb166a04c4aedcc683ce758ea263bb2ff923cf, img2e763beea5d18c43ca43f4a97fe3a3e6904171d0, img571c5fa3c0b5f3c02668338e0f61fa2c5d2ed09e, img574a3b012df2b184dc4235c492fc8b9c46bab6c2, img585ee9ae1c7d33bbef2357d3c3bdfe607816fccc, img5bafca5f124333fe87387eb352541a6f5068065b, img6af28535bbeeb97ad26b5fe5fdae6f3645eaebb3, img943b1e8f0c45acba501854c45f7e52157a1acd6f, img9b10f1913a008f08e661b36e3240f738aa7e320c, img9be3ffaa2ed55bdfb7af6f8f20d44ee9ad66efd5, imga9ee5f26214dd837be956db7a2cde6e5a4c93cd3, imgab54f9ac942152d83b202b7e8b1a9b6d9d1a5791, imgb927d1e3cbc66b490c1469546019a7c1cdfd47be, imgc6ce164d58f4bf29e245c48ec83ce69596f9fd9f, imgcb15a3c57b44255502e1890d6b6f306700f23943, imgd71d02bab28304776807cb6537287a55ac4a0942, imge0535b62ddc2c5a5387756f7a575dc8b8369b94e, imge11b70beef8837d5d3bcc7c2814e131914243427 } from './assets';
let screenWidth = Dimensions.get('window').width; 
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

 
 
export default class Trending extends React.Component
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
    TrendingView: {
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
        width: MergeEngineUtilities.deviceBasedDynamicDimension(9, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(8, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(182, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(55, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_SearchImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(29, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(30, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(332, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(55, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_FollowingText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(78, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(23, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(110, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(59, false, 1),
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
    attrbuted_textlabel_FollowingText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(78, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(23, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(110, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(59, false, 1),
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
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(17, true, 1),
    },
    image_BitmapImage4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(316, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(350, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(45, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(318, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(427, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(30, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(324, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(499, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(30, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(324, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(575, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_UserNameText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(73, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(15, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(619, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 255, 255, 0.949999988079071)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_UserNameText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(73, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(19, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(15, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(619, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 255, 255, 0.949999988079071)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-SemiBold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    image_BitmapImage8: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(49, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(49, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(316, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(647, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage9: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(228, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(42, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(134, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(686, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage10: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(13, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(14, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(15, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(689, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage11: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(12, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(146, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(700, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage12: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(12, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(184, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(700, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage13: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(12, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(233, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(700, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage14: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(13, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(11, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(269, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(700, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage15: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(12, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(309, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(700, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage16: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(83, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(729, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage17: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(32, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(32, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(250, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(732, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage18: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(270, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(732, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage19: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(32, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(32, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(323, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(732, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage20: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(22, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(99, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(736, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage21: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(24, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(21, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(24, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(737, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    imagenav_BitmapImageNav: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(29, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(166, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(739, false, 1),
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
    image_BitmapImage22: {
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
				style={styles.TrendingView}>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage}
		   source={img574a3b012df2b184dc4235c492fc8b9c46bab6c2}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage2}
		   source={img6af28535bbeeb97ad26b5fe5fdae6f3645eaebb3}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage3}
		   source={img265a62cc55edbf6e846e664da4490a3a77d1ca53}
		/>
		<Image data-elementId='image_Search' 
		   style={styles.image_SearchImage}
		   source={imgab54f9ac942152d83b202b7e8b1a9b6d9d1a5791}
		/>
		  <Text data-elementId='textlabel_ForYou' 
			   style={styles.textlabel_ForYouText}>For You
		  </Text>
		  <Text data-elementId='textlabel_Following' 
			   style={styles.textlabel_FollowingText}>Following
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage4}
		   source={imgcb15a3c57b44255502e1890d6b6f306700f23943}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage5}
		   source={img943b1e8f0c45acba501854c45f7e52157a1acd6f}
		/>
		  <Text data-elementId='textlabel_256' 
			   style={styles.textlabel_256Text}>256
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage6}
		   source={img064e7aae7194777845bc16ca0efb0cde275f7779}
		/>
		  <Text data-elementId='textlabel_25' 
			   style={styles.textlabel_25Text}>25
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage7}
		   source={img9be3ffaa2ed55bdfb7af6f8f20d44ee9ad66efd5}
		/>
		  <Text data-elementId='textlabel_12' 
			   style={styles.textlabel_12Text}>12
		  </Text>
		  <Text data-elementId='textlabel_UserName' 
			   style={styles.textlabel_UserNameText}>@whatnina
		  </Text>
		  <Text data-elementId='attrbuted_textlabel_LoremIpsumDolorSitAmetConsecteturAdipiscingElit.NuncHashtagSecondThirdFourthFift' 
			   style={styles.attrbuted_textlabel_LoremIpsumDolorSitAmetConsecteturAdipiscingElitNuncHashtagSecondThirdFourthFiftText}>Dont know how to finish this tiktok 
		  		  <Text data-elementId='attrbuted_textlabel_LoremIpsumDolorSitAmetConsecteturAdipiscingElit.NuncHashtagSecondThirdFourthFift' 
			   style={styles.attrbuted_textlabel_LoremIpsumDolorSitAmetConsecteturAdipiscingElitNuncHashtagSecondThirdFourthFiftText2}>#hashtag #second #third #fourth #fift
		  </Text>
 
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage8}
		   source={imgb927d1e3cbc66b490c1469546019a7c1cdfd47be}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage9}
		   source={imge0535b62ddc2c5a5387756f7a575dc8b8369b94e}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage10}
		   source={imge11b70beef8837d5d3bcc7c2814e131914243427}
		/>
		  <Text data-elementId='textlabel_GotyeSomebodyThatIUsedToKnow' 
			   style={styles.textlabel_GotyeSomebodyThatIUsedToKnowText}>Gotye  - Somebody that i used to know
		  </Text>
		  <Text data-elementId='textlabel_88' 
			   style={styles.textlabel_88Text}>88
		  </Text>
		  <Text data-elementId='textlabel_6143' 
			   style={styles.textlabel_6143Text}>6143
		  </Text>
		  <Text data-elementId='textlabel_64' 
			   style={styles.textlabel_64Text}>64
		  </Text>
		  <Text data-elementId='textlabel_64' 
			   style={styles.textlabel_64Text2}>64
		  </Text>
		  <Text data-elementId='textlabel_1161' 
			   style={styles.textlabel_1161Text}>1161
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage11}
		   source={img5bafca5f124333fe87387eb352541a6f5068065b}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage12}
		   source={img9b10f1913a008f08e661b36e3240f738aa7e320c}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage13}
		   source={img072db6af042e2e544083a2a01138b655ea8d970d}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage14}
		   source={img2e763beea5d18c43ca43f4a97fe3a3e6904171d0}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage15}
		   source={imgc6ce164d58f4bf29e245c48ec83ce69596f9fd9f}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage16}
		   source={imga9ee5f26214dd837be956db7a2cde6e5a4c93cd3}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage17}
		   source={img585ee9ae1c7d33bbef2357d3c3bdfe607816fccc}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage18}
		   source={imgd71d02bab28304776807cb6537287a55ac4a0942}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage19}
		   source={img254c6482c9d652926dec61bec614068e9d276410}
		/>
		  <Text data-elementId='textlabel_99' 
			   style={styles.textlabel_99Text}>99
		  </Text>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage20}
		   source={img2ccb166a04c4aedcc683ce758ea263bb2ff923cf}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage21}
		   source={img571c5fa3c0b5f3c02668338e0f61fa2c5d2ed09e}
		/>
		<Image data-elementId='imagenav_Bitmap' 
		   style={styles.imagenav_BitmapImageNav}
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
		   style={styles.image_BitmapImage22}
		   source={img1ce64331ab051ca11c1b2d11abe76aedf49ef450}
		/>
			</View>
			</SafeAreaView>
	
		)
	}

}
