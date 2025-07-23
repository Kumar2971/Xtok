import React from "react";

//Customizable Area Start
import {
	View,
	StyleSheet,
	ScrollView,
	Text,
	KeyboardAvoidingView,
	TouchableOpacity,
	Image,
	Modal,
	Platform,
	FlatList,
	SafeAreaView
} from 'react-native';
import { Input, Button, SearchBar } from "react-native-elements";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MergeEngineUtilities from '../../utilities/src/MergeEngineUtilities';
import { imgArrow, imgBorderCircle, imgcheckedCircle, imgsms, imgMsg, RightArrowfull, } from "./assets";
import ForgotPasswordController, { Props } from './ForgotPasswordController';
import FONTS from "../../../components/src/Fonts/Fonts";
import ReactNativeModal from "react-native-modal";
import { translate } from "../../../components/src/i18n/translate";
import Scale from "../../../components/src/Scale";
//Customizable Area End

export default class ForgotPassword extends ForgotPasswordController {
  constructor(props: Props) {
	super(props);
	//Customizable Area Start
	//Customizable Area End
  }

    // Customizable Area Start
	render() {
	  const { navigation } = this.props;
	   // Customizable Area Start
		const { mobileNo, emailValue, isFocusedEmail, selectedAccount, selectedCountry } = this.state;
		const renderItem = (item: any) => {
			const { selectedCountry } = this.state;
			return (
				<TouchableOpacity
					testID={'itemClick'}
					style={[
						styles.listitemStyle,
						selectedCountry?.country_name === item?.item?.country_name ?
							styles.selectedBorderStyle
							: styles.unSelectedBorderStyle
					]}
					onPress={() => {
						const data = item.item
						this.setState({ openCountryList: false, selectedCountry: data })
					}}>
					<Text style={styles.flagStyle}>{item?.item?.country_flag}</Text>
					<Text style={styles.idStyle}>{item?.item?.country_ISO_code}</Text>
					<Text style={styles.nameStyle}>{item?.item?.country_name}</Text>
					<View style={styles.circleView}>
						<Image source={selectedCountry?.country_name === item?.item?.country_name ? imgcheckedCircle : imgBorderCircle} style={styles.imgStyle} />
					</View>
				</TouchableOpacity>
			)
		}
		const renderHeader = () => {
			//Code
			return (
				<SearchBar
				testID="serach"
				platform="default"
					placeholder={translate("search")}
					searchIcon={<AntDesign name="search1" size={20} color="grey" />}
					onChangeText={text => this.searchFilterFunction(text)}
					autoCorrect={false}
					value={this.state.value}
					containerStyle={styles.searchContainerStyle}
					inputContainerStyle={styles.searchInputStyle}
					inputStyle={[styles.inputStyle,this.state.language=="ar" && styles.inputTextRight]}
				/>
			);
		};

		const sortDataArray = this.state.countryList.sort(function (a: any, b: any) {
			let nameA = a.country_name.toUpperCase();
			let nameB = b.country_name.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
				<KeyboardAvoidingView
					behavior={Platform.select({ios: 'padding', android: undefined})}
					style={{ flex: 1 }}
				>
					<ScrollView
						keyboardShouldPersistTaps='always'
						contentContainerStyle={{ flexGrow: 1 }}
						style={styles.containerMobile}
					>
						<View>
							{/* Customizable Area Start */}
							<View style={styles.mainView}>
								<View style={styles.headerStyle}>
									<TouchableOpacity testID="goBack"
										onPress={() => this.props.navigation.goBack()}
									>
										<Image source={this.state.language == "ar" ? RightArrowfull : imgArrow} style={styles.imgStyle} />
									</TouchableOpacity>
									<Text style={styles.titleStyle}>{translate("forgot_password")}</Text>
								</View>
								<View style={styles.viewMidMain}>
									<ReactNativeModal isVisible={this.state.notRegisteredModal}>
										<View style={styles.report_modal}>
											<View style={styles.reportModalBodyContainer}>
												<Text style={{ textAlign: 'center', fontSize: 16 }}>{this.state.errorMessage}</Text>
											</View>
											<View>
												<View style={styles.report_modal_button_container}>
													<TouchableOpacity
														style={styles.button}
														onPress={this.closeReportModal}>
														<Text style={styles.report_continue_button}>{translate("continue")}</Text>
													</TouchableOpacity>
												</View>
											</View>
										</View>
									</ReactNativeModal>
									{selectedAccount === 'SMS' ? (
										<Input
										    testID="inputMobile"
											containerStyle={styles.containerStyle}
											inputContainerStyle={styles.inputContainerStyle}
											inputStyle={[styles.inputTextStyle, this.state.language == "ar" && styles.inputTextRight]}
											placeholder={translate("mobile")}
											placeholderTextColor="grey"
											leftIcon={
												<TouchableOpacity testID="openList" onPress={() => this.openCountryListModal()} style={styles.flagView} >
													<Text style={styles.flagText}>{selectedCountry?.country_flag}</Text>
													<AntDesign name={"down"} size={18} style={styles.iconStyle} color="#000" />
													<Text style={styles.codeText}>{"+" + selectedCountry?.country_code ? selectedCountry?.country_code : ""} </Text>
												</TouchableOpacity>
											}
											onChangeText={text => {
												this.setState({ mobileNo: text })
											}}
											value={String(mobileNo) || ""}
											keyboardType="numeric"
											maxLength={12}
										/>
									) : (
										<Input
										    testID="txtEmail"
											containerStyle={styles.containerStyle}
											inputContainerStyle={
												isFocusedEmail
													? styles.inputFocusedContainerStyle
													: styles.inputContainerStyle
											}
											inputStyle={[styles.inputTextStyle, this.state.language == "ar" && styles.inputTextRight]}
											placeholder={translate("email")}
											placeholderTextColor='grey'
											onChangeText={(text) =>
												this.setState({ emailValue: text })
											}
											onFocus={this.handleFocusEmail}
											onBlur={this.handleBlurEmail}
											keyboardType='email-address'
											value={String(emailValue)}
										/>
									)}
									{(selectedAccount === 'SMS' && this.state.errors && this.state.errors.mobileNo && this.state.errors.mobileNo.message) ? <Text testID="mobileNoError" style={[styles.errorText,this.state.language =='ar' && {textAlign:'left'}]}>{this.state.errors.mobileNo.message}</Text> : null}
									{(selectedAccount !== 'SMS' && this.state.errors && this.state.errors.email) ? <Text style={[styles.errorText,this.state.language =='ar' && {textAlign:'left'}]}>{this.state.errors?.email?.message}</Text> : null}
									<Text style={styles.textLabel}>
										{translate("enter_email")}
									</Text>
								</View>
								<Button testID="fillEmailOrNO"
									buttonStyle={styles.continueBtnStyle}
									disabled={this.state.buttonLoading}
									containerStyle={styles.btnContainer}
									onPress={() => {
										if (selectedAccount === 'SMS') {
											const data = {
												phone: mobileNo
											}
											this.goToOtpAfterPhoneValidation(data)
										} else {
											const data = {
												accountType: selectedAccount,
												email: emailValue
											}
											this.goToOtpAfterEmailValidation(data)
										}
									}}
									title={translate("continue")}
									titleStyle={{
										fontWeight: 'bold',
										fontSize: 15,
										color: '#000000',
									}}
								/>
							</View>
							{this.state.openVerificationModal ? (
								<View>
									<Modal
										animationType='slide'
										transparent={true}
										visible={this.state.openVerificationModal}
									>
										<View
											style={[
												styles.modalContainer,
												styles.modalContainerIos,
											]}
										>
											<ScrollView
												contentContainerStyle={styles.modalScrollContainer}
												keyboardShouldPersistTaps='handled'
											>
												<TouchableOpacity
													activeOpacity={1}
													style={styles.modalOverlay}
												    testID={"outsideImagePickerModal"}
												/>
												<View style={styles.modalContent}>
													<View style={styles.modalbody}>
														<View style={styles.modalTitleArea}>
															<View style={styles.modalHeader}>
																<TouchableOpacity
																	onPress={() => {
																		this.onCloseModal()
																	}}
																	testID={'btnCloseSelectModal'}
																>
																	<Image source={this.state.language == "ar" ? RightArrowfull : imgArrow} style={styles.imgStyle} />
																</TouchableOpacity>
																<Text style={styles.modalHeaderText}>
																	{translate("verify_Account")}
																</Text>
															</View>
														</View>
														<View style={styles.descStyle}>
															<Text style={styles.desctext}>
																{
																	translate("contract")
																}
															</Text>
														</View>
														<TouchableOpacity testID="selectSMS"
															style={[
																styles.selectView,
																selectedAccount == 'SMS'
																	? styles.selectedBorderStyle
																	: styles.unSelectedBorderStyle,
															]}
															onPress={() => {
																setTimeout(() => {
																	this.setState({ selectedAccount: 'SMS' })
																}, 200)
															}}
														>
															<View style={styles.circleImgView}>
																<Image
																	source={imgsms}
																	style={styles.smsImg}
																/>
															</View>
															<View style={styles.rightView}>
																<Text style={styles.greyText}>
																	{translate("viaSMS")}
																</Text>
																<Text style={styles.boldText}>
																	{translate("add_phone")}
																</Text>
															</View>
														</TouchableOpacity>
														<TouchableOpacity testID="selectEmail"
															style={[
																styles.selectView,
																selectedAccount == 'Email'
																	? styles.selectedBorderStyle
																	: styles.unSelectedBorderStyle,
															]}
															onPress={() => {
																setTimeout(() => {
																	this.setState({ selectedAccount: 'Email' })
																}, 200)
															}}
														>
															<View style={styles.circleImgView}>
																<Image
																	source={imgMsg}
																	style={styles.smsImg}
																/>
															</View>
															<View style={styles.rightView}>
																<Text style={styles.greyText}>
																	{translate("viaEmail")}
																</Text>
																<Text style={styles.boldText}>
																	{translate("add_email")}
																</Text>
															</View>
														</TouchableOpacity>
														<Button testID="postOtp"
															buttonStyle={[
																styles.signinBtnStyle,
																styles.signInBtn,
																{ marginTop: 20 },
															]}
															containerStyle={styles.btnContainer}
															onPress={() => {
																this.setState({
																	openVerificationModal: false,
																})
																setTimeout(() => {
																	this.onContinue();
																}, 500)
															}}
															title={translate("continue")}
															titleStyle={styles.buttonTitleStyle}
															loading={this.state.apiCallLoader}
															loadingProps={{ color: '#FFC925' }}
														/>
													</View>
												</View>
											</ScrollView>
										</View>
									</Modal>
								</View>
							) : null}

							{this.state.openCountryList ? <View>
								<Modal
								//@ts-ignore
								testID="openCountryListID"
									animationType='slide'
									transparent={true}
									visible={this.state.openCountryList}
									onRequestClose={() => {
										this.setState({ openCountryList: false })
									}}>
									<View style={[styles.modalContainer, styles.modalContainerIos, styles.modelContainerBgnd]}>
										<ScrollView contentContainerStyle={styles.modalScrollContainer} keyboardShouldPersistTaps='handled'>
											<View>
												<View style={styles.modalbody}>
													<View style={styles.modalTitleArea}>
														<TouchableOpacity onPress={() => this.setState({ openCountryList: false })} testID={"closeSelectModal"} style={styles.imgView}>
															<AntDesign name="close" size={20} />
														</TouchableOpacity>
													</View>
													<FlatList
														testID={"flatList"}
														data={this.state.value == "" ? sortDataArray : this.state.searchData}
														renderItem={(item: any) => renderItem(item)}
														keyExtractor={(item: any) => item?.id}
														ListHeaderComponent={renderHeader()}
														ListEmptyComponent={() => <Text style={styles.noDatatext}>{this.state.apiCallLoader ? translate("loading"): translate("data_not_found")}</Text>}
													/>
												</View>
											</View>
										</ScrollView>
									</View>
								</Modal>
							</View> : null}
							{/* Customizable Area End */}
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
			//Customizable Area End
    );
  }
}

// Customizable Area Start
export const styles = StyleSheet.create({
	containerMobile: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	reporModalTileContainer:{
    padding:20,
    alignItems:'center',
    justifyContent:'center',
  },
	report_continue_title:{
    color:'#000',
    fontWeight:'600',
    fontSize:18
  },
  report_modal_button_container:{
    paddingHorizontal:20,
    paddingTop:15,
	  ...Platform.select({
		  ios: {
			  paddingBottom: 5,
		  },
		  android: {
			  paddingBottom: 10,
		  },
	  }),
  },
	report_continue_button:{
    color:'#000',
    fontWeight:'600',
  },
	button: {
    width: Scale(180),
    height: Scale(45),
    backgroundColor: "#FACC1E",
    borderRadius: Scale(50),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
	},
  reportModalBodyContainer:{
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:20,
    paddingVertical:5,
		marginTop:20
  },
	mainView: {
		flex: 1,
		flexGrow: 1,
		padding: 16,
	},
	headerStyle: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	imgStyle: {
		height: 25,
		width: 25,
	},
	titleStyle: {
		fontWeight: 'bold',
		fontSize: 18,
		marginLeft: 15,
		color: '#000000',
		fontFamily: FONTS.MontserratBold
	},
	viewMidMain: {
		flex: 1,
		flexGrow: 1,
		marginVertical: 15,
	},
	containerStyle: {
		backgroundColor: 'transparent',
		borderBottomColor: 'transparent',
		borderTopColor: 'transparent',
		padding: 0,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	inputFocusedContainerStyle: {
		backgroundColor: '#FFFBEE',
		borderRadius: 10,
		height: 50,
		borderColor: '#FFC925',
		marginTop: 10,
		borderWidth: 1,
	},
	inputContainerStyle: {
		borderBottomColor: 'transparent',
		width: '100%',
		backgroundColor: 'rgb(238,238,238)',
		borderRadius: 10,
		height: 50,
		marginTop: 10,
		marginHorizontal: 0,
	},
	report_modal:{
    height:Scale(150),
    width:Scale(300),
    borderRadius:20 ,
    backgroundColor:'#fff',
    alignSelf:'center'
  },
	inputTextStyle: {
		fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
		color: 'black',
		marginLeft: 10,
		marginTop: 2
	},
  flagText: {
    fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(35, true, 1),
    color: "black"
  },
  flagView: {
    justifyContent: 'space-between',
    flexDirection: "row",
    alignItems: "center",
	marginLeft:MergeEngineUtilities.deviceBasedDynamicDimension(10,true,1)
  },
  iconStyle: {
    marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(5, true, 1)
  },
  codeText: {
    fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
    marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(5, true, 1),
   	color:"grey",
   	textAlignVertical:"center",
  },
  listitemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
    marginBottom: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
    padding: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1)
  },
	textLabel: {
		fontSize: 13,
		textAlign: 'center',
		color: '#767676',
		margin: 15,
	},
	continueBtnStyle: {
		borderRadius: 50,
		paddingVertical: 13,
		backgroundColor: '#FFC925',
		marginHorizontal: 15,
	},
	btnContainer: {
		marginVertical: 10,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	modelContainerBgnd: {
		backgroundColor: 'white'
	},
	modalContainerIos: {
		...Platform.select({
			ios: {
				paddingTop: 40,
			},
			android: {
				paddingTop: 0,
			},
		}),
	},
	modalScrollContainer: {
		flexGrow: 1,
		width: '100%',
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	},
	modalContent: {
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	},
	modalbody: {
		backgroundColor: 'white',
		borderColor: 'rgba(0,0,0,.5)',
		borderTopRightRadius: MergeEngineUtilities.deviceBasedDynamicDimension(
			15,
			true,
			1
		),
		borderTopLeftRadius: MergeEngineUtilities.deviceBasedDynamicDimension(
			15,
			true,
			1
		),
		padding: 20,
	},
	modalTitleArea: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	skipBtn: {
		paddingVertical: MergeEngineUtilities.deviceBasedDynamicDimension(
			10,
			true,
			1
		),
		paddingHorizontal: MergeEngineUtilities.deviceBasedDynamicDimension(
			20,
			true,
			1
		),
		backgroundColor: '#FFC925',
		borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
	},
	modalHeaderText: {
		fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(16, true, 1),
		fontWeight: 'bold',
		color: 'black',
		marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
	},
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	descStyle: {
		marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
		justifyContent: 'center',
		alignItems: 'center',
	},
	desctext: {
		width: '90%',
		textAlign: 'center',
		fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
		color: '#000000',
	},
	okBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFC925',
		padding: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
		borderRadius: 10,
		alignSelf: 'flex-end',
		marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(20, false, 1),
	},
	loginTxt: {
		fontWeight: 'bold',
		color: '#FFC925',
	},
	noDatatext: {
		textAlign: 'center',
		marginVertical: MergeEngineUtilities.deviceBasedDynamicDimension(
			30,
			false,
			1
		),
	},
	keyboardPadding: { flex: 1 },
	buttonTitleStyle: {
		fontFamily: FONTS.MontserratSemiBold,
		fontSize: 14,
		color: '#000000',
		fontWeight: 'bold',
	},
	skipText: {
	},
	selectView: {
		marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
		padding: MergeEngineUtilities.deviceBasedDynamicDimension(10, true, 1),
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(
			15,
			false,
			1
		),
	},
	circleImgView: {
		borderRadius: 100,
		backgroundColor: '#EEEEEE',
		height: MergeEngineUtilities.deviceBasedDynamicDimension(70, true, 1),
		width: MergeEngineUtilities.deviceBasedDynamicDimension(70, true, 1),
		justifyContent: 'center',
		alignItems: 'center',
	},
	smsImg: {
		height: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
		width: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
		resizeMode: 'contain',
	},
	greyText: {
		color: '#9E9E9E',
		fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
	},
	boldText: {
		fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
		fontWeight: 'bold',
		color: '#000000',
		marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
	},
	rightView: {
		flex: 1,
		marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
	},
	continueBtn: {
		borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(
			50,
			false,
			1
		),
		height: MergeEngineUtilities.deviceBasedDynamicDimension(50, false, 1),
		borderColor: '#FFC925',
		backgroundColor: '#ffffff',
		borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(1, true, 1),
		marginVertical: MergeEngineUtilities.deviceBasedDynamicDimension(
			10,
			false,
			1
		),
	},
	errorText: {
		color: 'red',
		fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
		marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(12, true, 1),
	},
	unSelectedBorderStyle: {
		borderColor: '#EEEEEE',
	},
	selectedBorderStyle: {
		borderColor: '#FFC925',
	},
	searchContainerStyle: {
		backgroundColor: 'transparent',
		padding: 0,
		borderTopColor: 'transparent',
		borderBottomColor: 'transparent',
		marginBottom: MergeEngineUtilities.deviceBasedDynamicDimension(
			20,
			false,
			1
		),
	},
	searchInputStyle: {
		backgroundColor: '#EEEEEE',
		height: MergeEngineUtilities.deviceBasedDynamicDimension(50, true, 1),
		borderRadius: 15
	},
  inputStyle:{
    fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true , 1),
  },
	flagStyle: {
		width: '15%',
		fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(25, true, 1),
		textAlign: 'center',
		borderRadius: 10,
		color: 'black',
	},
	idStyle: {
		width: '10%',
		fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
		color: '#000000',
		fontWeight: 'bold',
		alignItems: 'center',
	},
	nameStyle: {
		width: '55%',
		fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1),
		fontWeight: 'bold',
	},
	signinBtnStyle: {
		borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(
			50,
			false,
			1
		),
		height: MergeEngineUtilities.deviceBasedDynamicDimension(50, false, 1),
		width: '98%',
		marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(10, false, 1),
	},
	signInBtn: {
		borderColor: '#FFC925',
		backgroundColor: '#ffffff',
		borderWidth: 1,
	},
	imgView: {
		height: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
		width: MergeEngineUtilities.deviceBasedDynamicDimension(30, true, 1),
	},
  circleView: {
    height: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1),
    width: MergeEngineUtilities.deviceBasedDynamicDimension(20, true, 1)
	},
	inputTextRight: {
		textAlign: "right"
	},
	errorStyle: {
		color: "red",
		textAlign: "center"
	},
});
