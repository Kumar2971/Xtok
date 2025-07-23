//This an auto generated file for Artboard Name = Adminconsole And Supports ReactNative Ver. = 0.62
import { SafeAreaView, Dimensions, View, StyleSheet, Image, } from 'react-native'; 

import React from 'react'; 


import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import global_styles from "../../utilities/src/global_styles";
let screenWidth = Dimensions.get('window').width; 
import { img23f5b10d71b5bccba285d46ac9825341cc080829, img5496f6a8bbff86b828368c46c94b63657895c52c } from './assets'
let screenHeight = Dimensions.get('window').height; 
//Artboard Dimension 

//Re calculated Artboard Dimension 

// To check if Artboard and Device screen has same ratio 

 


 
 
export default class Adminconsole extends React.Component
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
    AdminconsoleView: {
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
				style={styles.AdminconsoleView}>
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
