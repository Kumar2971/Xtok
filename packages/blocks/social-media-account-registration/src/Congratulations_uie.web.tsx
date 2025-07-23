//This an auto generated file for Artboard Name = Congratulations And Supports ReactNative Ver. = 0.62
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
import { imga66d53dda028124fddb702abe2c55b660aad88be } from './assets'
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

 
 
export default class Congratulations extends React.Component
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
    CongratulationsView: {
        backgroundColor: "rgba(255, 249, 234, 1)",
        flex: 1,
        alignItems: "flex-start",
    },
    view_AccountCreatedBackgroundmask: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(376, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(812, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(0, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_17_light_Backgroundmask: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(376, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(812, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(0, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_Ellipse: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(19, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(18, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(115, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(247, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 201, 37, 0.800000011920929)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_Ellipse2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(5, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(4, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(197, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(249, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 201, 37, 0.800000011920929)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_Ellipse3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(125, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(124, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(128, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(265, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_Ellipse4: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(13, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(256, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(265, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 201, 37, 0.800000011920929)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    image_BitmapImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(44, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(44, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(168, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(305, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    view_Ellipse5: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(3, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(2, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(106, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(312, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 201, 37, 0.800000011920929)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_Ellipse6: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(5, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(4, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(253, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(342, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 201, 37, 0.800000011920929)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_Ellipse7: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(9, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(111, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(360, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 201, 37, 0.800000011920929)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_Ellipse8: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(5, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(4, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(249, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(386, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 201, 37, 0.800000011920929)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_Ellipse9: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(3, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(2, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(212, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(396, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 201, 37, 0.800000011920929)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    view_Ellipse10: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(7, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(6, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(158, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(399, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 201, 37, 0.800000011920929)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    textlabel_ModalTitleText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(242, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(25, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(67, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(433, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_ModalTitleText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(242, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(25, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(67, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(433, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
    },
    textlabel_YourAccountIsReadyToUseText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(242, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(22, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(67, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(472, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    },
    attrbuted_textlabel_YourAccountIsReadyToUseText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(242, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(22, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(67, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(472, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
    },
    TEXTCOLORSTYLEText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(311, true, 0.7055393586005831),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 0.96),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 0.7055393586005831),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(17, false, 0.96),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    button_continueButton: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(242, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(48, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(67, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(522, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
        justifyContent: "center",
    },
})

const styles = {...global_styles, ...local_styles}
 
 
 	return (

		<SafeAreaView style={{"flex":1}}> 
		<View 
				style={styles.CongratulationsView}>
		<View data-elementId='view_AccountCreatedBackgroundmask' 
		   style={[styles.view_AccountCreatedBackgroundmask, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_17_light_Backgroundmask' 
		   style={[styles.view_17_light_Backgroundmask, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse2, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse3, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse4, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage}
		   source={imga66d53dda028124fddb702abe2c55b660aad88be}
		/>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse5, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse6, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse7, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse8, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse9, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_Ellipse' 
		   style={[styles.view_Ellipse10, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_ModalTitle' 
			   style={styles.textlabel_ModalTitleText}>Congratulations!
		  </Text>
		  <Text data-elementId='textlabel_YourAccountIsReadyToUse' 
			   style={styles.textlabel_YourAccountIsReadyToUseText}>Your account is ready to use
		  </Text>
		<TouchableOpacity data-elementId='button_continue' 
		  onPress ={ () => Alert.alert('I am Custom Button.')} 
		   style={styles.button_continueButton}>
		  <Text data-elementId='TEXTCOLORSTYLE' 
			   style={styles.TEXTCOLORSTYLEText}>Continue
		  </Text>
		</TouchableOpacity>
			</View>
			</SafeAreaView>
	
		)
	}

}
