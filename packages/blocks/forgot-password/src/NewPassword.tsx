import React from "react";

// Customizable Area Start
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	TouchableOpacity,
	SafeAreaView,
	KeyboardAvoidingView,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { RightArrowfull, imgArrow, imgHide, imgLock, imgPasswordVisible } from './assets';
import ReactNativeModal from "react-native-modal";
import { deviceBasedDynamicDimension } from '../../../components/src/Utilities';
import { translate } from '../../../components/src/i18n/translate';
// Customizable Area End

import ForgotPasswordController, { Props } from "./ForgotPasswordController";

export default class NewPassword extends ForgotPasswordController {
	// Customizable Area Start
	// Customizable Area End

	constructor(props: Props) {
		super(props);
		this.isChangePassword = true;
	    // Customizable Area Start
		// Customizable Area End
	}
	// Customizable Area Start
	togglePasswordVisibility = () => {
		this.setState({ hidePassword: !this.state.hidePassword });
	}

	arrowImage = () => {
		if(this.state.language == "ar" ){
			return RightArrowfull 
		}else{
			return imgArrow
		}
	}

	isFocusPassword = (isFocusedPassword:any) =>  {
		if(isFocusedPassword){
			return styles.inputFocusedContainerStyle
		}else{
			return styles.inputContainerStyle
		}
	}

	isFocusConfirmPassword = (isFocusedConfirmPassword:any) =>  {
		if(isFocusedConfirmPassword){
			return styles.inputFocusedContainerStyle
		}else{
			return styles.inputContainerStyle
		}
	}

	errorMsgFunc = (errorMessage:any) => {
		if(errorMessage){
			return <Text style={[styles.errorText, { marginStart: deviceBasedDynamicDimension(10, true, 1), }]}>{this.state.errors.password.message || ''}</Text>
		}else{
			return <View />
		}
	}

	errorConfirmMsgFunc = (errorConfirmMessage: any) => {
		if(errorConfirmMessage){
			return <Text style={[styles.errorText, { marginStart: deviceBasedDynamicDimension(10, true, 1), }]}>{this.state.errors.confirm_password.message || ''}</Text>
		}else{
			return <View />
		}
	}

	inputTextStyle = () => {
		if(this.state.language == "ar"){
			return styles.inputTextRight;
		}
	}

	hidePasswordImage = (hidePassword:any) => {
		if(hidePassword){
			return imgHide
		}else{
			return imgPasswordVisible
		}
	}

	// Customizable Area End
	
	render() {
    	// Customizable Area Start 
		const {
			password,
			hidePassword,
			confirmPassword,
			hideConfirmPassword,
			isFocusedPassword,
			isFocusedConfirmPassword,
		} = this.state;

		let errorMessage = '';
		if (this.state.errors?.password) {
			errorMessage = this.state.errors.password.message || '';
		}

		let errorConfirmMessage = '';
		if (this.state.errors?.confirm_password) {
			errorConfirmMessage = this.state.errors.confirm_password.message || '';
		}

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
				<KeyboardAvoidingView
					behavior={this.isPlatformiOS() ? 'padding' : undefined}
					style={{ flex: 1 }}
				>
					<ScrollView
						keyboardShouldPersistTaps='always'
						contentContainerStyle={styles.contentContainer}
						style={styles.container}
					>

						<View style={styles.mainView}>
							<View style={styles.mainView}>
								<View style={styles.headerStyle}>
									<TouchableOpacity testID="login"
										style={styles.imgView}
										onPress={() => this.props.navigation.navigate('Login')}
									>
										<Image source={this.arrowImage()} style={styles.imgStyle} />
									</TouchableOpacity>
									<Text style={styles.titleStyle}>
										{translate("Create_new_password")}
									</Text>
								</View>
								<View style={styles.middleView}>
									<Text
										style={[styles.textStyle, this.state.language == "ar" && styles.rightTitle]}
									>{translate("create_New_Password")}</Text>
									<Input testID="txtPassword"
										containerStyle={styles.containerStyle}
										inputContainerStyle={this.isFocusPassword(isFocusedPassword)}
										inputStyle={[styles.inputTextStyle, this.inputTextStyle()]}
										placeholder={translate("enter_new_password")}
										placeholderTextColor='grey'
										leftIcon={
											<Image
												source={imgLock}
												style={[
													styles.leftIconStyle,
													isFocusedPassword && styles.tintColor,
													password !== '' && styles.blackImg,
												]}
											/>
										}
										rightIcon={
											<TouchableOpacity
												onPress={this.togglePasswordVisibility}
											>
												<Image
													source={this.hidePasswordImage(hidePassword)}
													style={[
														styles.leftIconStyle,
														styles.rightIcon,
														(isFocusedPassword || password !== '') &&
														styles.blackImg,
													]}
												/>
											</TouchableOpacity>
										}
										onChangeText={(text) => this.setState({ password: text })}
										secureTextEntry={hidePassword}
										onFocus={this.handleFocusPassword}
										onBlur={this.handleBlurPassword}
										value={String(password)}
									/>
									{this.errorMsgFunc(errorMessage)}
									<Input testID="txtConfirmPassword"
										containerStyle={styles.containerStyle}
										inputContainerStyle={this.isFocusConfirmPassword(isFocusedConfirmPassword)}
										inputStyle={[styles.inputTextStyle, this.inputTextStyle()]}
										placeholder={translate("confirm_password")}
										placeholderTextColor='grey'
										leftIcon={
											<Image
												source={imgLock}
												style={[
													styles.leftIconStyle,
													isFocusedConfirmPassword && styles.tintColor,
													confirmPassword !== '' && styles.blackImg,
												]}
											/>
										}
										rightIcon={
											<TouchableOpacity
												testID={"togglePasswordTouch"}
												onPress={() =>
													this.setState({
														hideConfirmPassword: !hideConfirmPassword,
													})
												}
											>
												<Image
													source={
														hideConfirmPassword ? imgHide : imgPasswordVisible
													}
													style={[
														styles.leftIconStyle,
														styles.rightIcon,
														(isFocusedConfirmPassword ||
															confirmPassword !== '') &&
														styles.blackImg,
													]}
												/>
											</TouchableOpacity>
										}
										onChangeText={(text) =>
											this.setState({ confirmPassword: text })
										}
										secureTextEntry={hideConfirmPassword}
										onFocus={this.handleFocusConfirmPassword}
										onBlur={this.handleBlurConfirmPassword}
										value={String(confirmPassword)}
									/>
									{this.errorConfirmMsgFunc(errorConfirmMessage)}
							</View>
						</View>
						<Button testID="newPassword"
							buttonStyle={[styles.signinBtnStyle, styles.signInBtn]}
							containerStyle={styles.btnContainer}
							onPress={() => {
								// Click
								this.submitNewPasswordApi()
							}}
							title={translate("continue")}
							titleStyle={{
								fontWeight: 'bold',
								fontSize: 14,
								color: '#000000',
								// fontFamily: FONTS.MontserratSemiBold
							}}
						/>
					</View>
					<ReactNativeModal  isVisible={this.state.openConfirmation}>
						<View style={styles.modalContainer}>
							<View style={styles.viewCardBg}>
								<Text style={styles.textPasswordDone}>{translate("password_successfully_changed")}</Text>
									<Button testID="openConfirm"
										buttonStyle={styles.closeButtonStyle}
										containerStyle={{backgroundColor: 'transparent'}}
										onPress={() => {
											this.setState({
												openConfirmation: false
											})
											this.props.navigation.navigate('Login')
										}}
										title={translate("continue")}
										titleStyle={{
											fontWeight: 'bold',
											fontSize: 14,
											color: '#000000',
											// fontFamily: FONTS.MontserratSemiBold
										}}
									/>
							</View>
						</View>
					</ReactNativeModal>
				</ScrollView>
			</KeyboardAvoidingView>
			</SafeAreaView>
		);
		// Customizable Area End
	}
}

// Customizable Area Start
const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		marginLeft: 'auto',
		marginRight: 'auto',
		maxWidth: 650,
		backgroundColor: '#fff',
	},
	contentContainer: {
		flexGrow: 1,
		padding: 20,
	},
	mainView: {
		flex: 1,
	},
	headerStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: deviceBasedDynamicDimension(20, false, 1),
	},
	imgStyle: {
		height: '100%',
		width: '100%',
		resizeMode: 'contain',
	},
	imgView: {
		height: deviceBasedDynamicDimension(30, true, 1),
		width: deviceBasedDynamicDimension(30, true, 1),
	},
	inputTextRight: {
		textAlign: "right"
	},
	titleStyle: {
		fontWeight: 'bold',
		fontSize: deviceBasedDynamicDimension(16, true, 1),
		marginLeft: deviceBasedDynamicDimension(30, true, 1),
		color: '#000000',
		// fontFamily:FONTS.MontserratBold
	},
	rightTitle:{
		textAlign: "left",
	},
	otpText: {
		fontSize: deviceBasedDynamicDimension(18, true, 1),
		textAlign: 'center',
		// fontFamily: FONTS.MontserratSemiBold
	},
	underlineStyleBase: {
		width: deviceBasedDynamicDimension(50, true, 1),
		height: deviceBasedDynamicDimension(50, true, 1),
		borderRadius: deviceBasedDynamicDimension(10, false, 1),
		fontSize: deviceBasedDynamicDimension(18, true, 1),
		fontWeight: 'bold',
		backgroundColor: '#EEEEEE',
		margin: deviceBasedDynamicDimension(10, true, 1),
		textAlignVertical: 'center',
		textAlign: 'center',
		justifyContent: 'center',
	},
	underlineStyleHighLighted: {
		borderColor: '#FFC925',
		borderWidth: 1,
	},
	underlineStyleError: {
		backgroundColor: 'rgba(231, 58, 35, 0.2)',
		borderColor: 'rgba(231, 58, 35, 1)',
	},
	middleView: {
		flex: 1,
		justifyContent: 'center',
		// borderWidth: 1,
		// height: deviceBasedDynamicDimension(600, false, 1)
	},
	textStyle: {
		fontSize: deviceBasedDynamicDimension(14, true, 1),
		marginVertical: deviceBasedDynamicDimension(5, true, 1),
		marginHorizontal: deviceBasedDynamicDimension(10, true, 1),
		color: '#000000',
		// fontFamily:FONTS.MontserratRegular
	},
	signinBtnStyle: {
		borderRadius: deviceBasedDynamicDimension(50, false, 1),
		height: deviceBasedDynamicDimension(50, false, 1),
		width: '98%',
	},
	signInBtn: {
		backgroundColor: '#FFC925',
	},
	btnContainer: {
		margin: deviceBasedDynamicDimension(10, true, 1),
	},
	errorText: {
		fontSize: deviceBasedDynamicDimension(14, true, 1),
		color: 'red',
	},
	resendView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	resendBtnText: {
		fontSize: deviceBasedDynamicDimension(14, true, 1),
		color: '#FFC925',
		marginHorizontal: deviceBasedDynamicDimension(10, true, 1),
		// fontFamily:FONTS.MontserratRegular
	},
	otpStyle: {
		width: '80%',
		height: deviceBasedDynamicDimension(90, true, 1),
		alignItems: 'center',
	},
	containerStyle: {
		backgroundColor: 'transparent',
		borderBottomColor: 'transparent',
		borderTopColor: 'transparent',
		padding: 0,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		height: deviceBasedDynamicDimension(65,false,1)
	},
	inputFocusedContainerStyle: {
		backgroundColor: '#FFFBEE',
		borderRadius: deviceBasedDynamicDimension(10, true, 1),
		height: deviceBasedDynamicDimension(50, false, 1),
		borderColor: '#FFC925',
		marginTop: deviceBasedDynamicDimension(18, false, 1),
		borderWidth: 1,
	},
	inputContainerStyle: {
		borderBottomColor: 'transparent',
		width: '100%',
		backgroundColor: 'rgbargb(238,238,238)',
		borderRadius: deviceBasedDynamicDimension(10, true, 1),
		height: deviceBasedDynamicDimension(50, false, 1),
		marginTop: deviceBasedDynamicDimension(18, false, 1),
		marginHorizontal: 0,
	},
	inputTextStyle: {
		fontSize: 12,
		color: 'black',
		marginLeft: deviceBasedDynamicDimension(10, true, 1),
		// fontFamily:FONTS.MontserratRegular
	},
	leftIconStyle: {
		height: deviceBasedDynamicDimension(20, false, 1),
		width: deviceBasedDynamicDimension(20, true, 1),
		resizeMode: 'contain',
		tintColor: '#9E9E9E',
		marginLeft:deviceBasedDynamicDimension(10,true,1)
	},
	rightIcon: {
		marginRight: deviceBasedDynamicDimension(10, true, 1),
	},
	tintColor: {
		tintColor: '#FFC925',
	},
	blackImg: {
		tintColor: '#000000',
	},
	checkBoxContainerView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15,
		marginBottom: 10,
	},
	rememberMe: {
		color: '#000',
		fontWeight: 'bold',
		alignSelf: 'center',
		fontSize: 13,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	viewCardBg: {
		marginHorizontal: 30,
		borderRadius: 10,
		backgroundColor: '#FFF',
		padding: 20,
		paddingVertical: 25,
		height: 165,
	},
	textPasswordDone: {
		fontSize: 16,
		color: '#000',
		textAlign:'center'
	},
	closeButtonStyle: {
		alignSelf: 'center',
		backgroundColor: '#FFC925',
		marginTop: deviceBasedDynamicDimension(25, false, 1),
		borderRadius: deviceBasedDynamicDimension(50, false, 1),
		height: deviceBasedDynamicDimension(50, false, 1),
		width: '45%',
	},
});
// Customizable Area End
