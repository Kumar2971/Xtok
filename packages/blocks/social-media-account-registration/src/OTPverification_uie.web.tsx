// Customizable Area Start
//This an auto generated file for Artboard Name = OTPverification And Supports ReactNative Ver. = 0.62
import { SafeAreaView, Dimensions, View, Text,StyleSheet, TouchableOpacity, Image, Alert} from 'react-native'; 
import React from 'react'; 

import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import global_styles from "../../utilities/src/global_styles";
let screenWidth = Dimensions.get('window').width; 
import { img7657e8a7a818ef340d0b86c7835b97edfbbf5d9b, img32529e21b86de7ec3e8a9824e8fcacb484774758 } from './assets'
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

 
 
export default class OTPverification extends React.Component
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
    OTPverificationView: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        flex: 1,
        alignItems: "flex-start",
    },
    image_BitmapImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(379, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(39, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(0, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    image_BitmapImage2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(25, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(25, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        opacity: 1,
        resizeMode: "contain",
    },
    textlabel_VerifyAccountText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(295, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(25, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(60, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "Roboto-Medium",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
    },
    attrbuted_textlabel_VerifyAccountText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(295, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(25, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(60, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(68, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "left",
        textAlignVertical: "top",
        fontFamily: "Roboto-Medium",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
    },
    textlabel_CodeHasBeenSendTText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(333, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(312, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "Roboto-Medium",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    attrbuted_textlabel_CodeHasBeenSendTText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(333, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(312, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "Roboto-Medium",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    view_Rectangle: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(70, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(53, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(385, false, 1),
        opacity: 1,
        backgroundColor: "rgba(250, 250, 250, 1)",
        borderColor: "rgba(238, 238, 238, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    view_StatusdefaultTypecodeStatedefaultInputThemelightComponentinputFieldBackgroundmask: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(69, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(53, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(113, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(385, false, 1),
        opacity: 1,
        backgroundColor: "rgba(255, 251, 238, 1)",
        borderColor: "rgba(255, 201, 37, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    view_StatusdefaultTypecodeStatedefaultInputThemelightComponentinputFieldBackgroundmask2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(69, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(53, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(195, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(385, false, 1),
        opacity: 1,
        backgroundColor: "rgba(250, 250, 250, 1)",
        borderColor: "rgba(238, 238, 238, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    view_StatusdefaultTypecodeStatedefaultInputThemelightComponentinputFieldBackgroundmask3: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(69, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(53, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(278, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(385, false, 1),
        opacity: 1,
        backgroundColor: "rgba(250, 250, 250, 1)",
        borderColor: "rgba(238, 238, 238, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
    },
    textlabel_LabelText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(13, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(25, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(57, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(399, false, 1),
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
    attrbuted_textlabel_LabelText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(13, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(25, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(57, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(399, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "bold",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(33, 33, 33, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Bold",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
    },
    textlabel_LabelText2: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(11, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(15, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(141, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(403, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        textAlignVertical: "top",
    },
    textlabel_ResendCodeIn56SText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(333, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(491, false, 1),
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
    attrbuted_textlabel_ResendCodeIn56SText: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(333, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(491, false, 1),
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
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    attrbuted_textlabel_ResendCodeIn56SText2: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(333, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(491, false, 1),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(0, 0, 0, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "NunitoSans-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    attrbuted_textlabel_ResendCodeIn56SText3: {
        position: "relative",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(333, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(491, false, 1),
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
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    },
    TEXTCOLORSTYLEText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(311, true, 0.9737609329446064),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(16, false, 0.96),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 0.9737609329446064),
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
        width: MergeEngineUtilities.deviceBasedDynamicDimension(334, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(48, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(21, true, 1),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(722, false, 1),
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
				style={styles.OTPverificationView}>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage}
		   source={img7657e8a7a818ef340d0b86c7835b97edfbbf5d9b}
		/>
		<Image data-elementId='image_Bitmap' 
		   style={styles.image_BitmapImage2}
		   source={img32529e21b86de7ec3e8a9824e8fcacb484774758}
		/>
		  <Text data-elementId='textlabel_VerifyAccount' 
			   style={styles.textlabel_VerifyAccountText}>Verify Account
		  </Text>
		  <Text data-elementId='textlabel_CodeHasBeenSendT' 
			   style={styles.textlabel_CodeHasBeenSendTText}>Code has been send to +6282******39
		  </Text>
		<View data-elementId='view_Rectangle' 
		   style={[styles.view_Rectangle, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_StatusdefaultTypecodeStatedefaultInputThemelightComponentinputFieldBackgroundmask' 
		   style={[styles.view_StatusdefaultTypecodeStatedefaultInputThemelightComponentinputFieldBackgroundmask, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_StatusdefaultTypecodeStatedefaultInputThemelightComponentinputFieldBackgroundmask' 
		   style={[styles.view_StatusdefaultTypecodeStatedefaultInputThemelightComponentinputFieldBackgroundmask2, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		<View data-elementId='view_StatusdefaultTypecodeStatedefaultInputThemelightComponentinputFieldBackgroundmask' 
		   style={[styles.view_StatusdefaultTypecodeStatedefaultInputThemelightComponentinputFieldBackgroundmask3, { flex: 1 }, { flexWrap: 'nowrap' }, { flexDirection: 'row' } ]}>
		</View>
		  <Text data-elementId='textlabel_Label' 
			   style={styles.textlabel_LabelText}>8
		  </Text>
		  <Text data-elementId='textlabel_Label' 
			   style={styles.textlabel_LabelText2}>
		  </Text>
		  <Text data-elementId='attrbuted_textlabel_ResendCodeIn56S' 
			   style={styles.attrbuted_textlabel_ResendCodeIn56SText}>Resend code in 
		  		  <Text data-elementId='attrbuted_textlabel_ResendCodeIn56S' 
			   style={styles.attrbuted_textlabel_ResendCodeIn56SText2}>56
		  </Text>
 
		  		  <Text data-elementId='attrbuted_textlabel_ResendCodeIn56S' 
			   style={styles.attrbuted_textlabel_ResendCodeIn56SText3}> s
		  </Text>
 
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
// Customizable Area End