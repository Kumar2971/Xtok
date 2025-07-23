//This an auto generated file for Artboard Name = Accountscoreranking And Supports ReactNative Ver. = 0.62
import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, View } from 'react-native';

import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import global_styles from "../../utilities/src/global_styles";
import { img23f5b10d71b5bccba285d46ac9825341cc080829, img5496f6a8bbff86b828368c46c94b63657895c52c } from './assets';
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

 
 
export default class Accountscoreranking extends React.Component
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
    AccountscorerankingView: {
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
})

const styles = {...global_styles, ...local_styles}
 
 
 	return (

		<SafeAreaView style={{"flex":1}}> 
		<View 
				style={styles.AccountscorerankingView}>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage}
		   source={img5496f6a8bbff86b828368c46c94b63657895c52c}
		/>
		<Image data-elementId='imagenav_dummy' 
		   style={styles.imagenav_dummyImageNav}
		   source={img23f5b10d71b5bccba285d46ac9825341cc080829}
		/>
			</View>
			</SafeAreaView>
	
		)
	}

}
