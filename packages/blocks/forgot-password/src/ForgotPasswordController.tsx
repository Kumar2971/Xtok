import { BlockComponent } from '../../../framework/src/BlockComponent';
// Customizable Area Start
import { IBlock } from '../../../framework/src/IBlock';
import { runEngine } from '../../../framework/src/RunEngine';
import { Message } from '../../../framework/src/Message';

import MessageEnum, {
	getName,
} from '../../../framework/src/Messages/MessageEnum';

import * as Yup from 'yup';
import { imgPasswordVisible, imgPasswordInVisible } from './assets';
import { confirmPasswordValidate, getStorageData, isEmail, phoneValidate } from '../../../framework/src/Utilities';
import {passwordValidate} from "../../../components/src/Utilities";
import {translate} from '../../../components/src/i18n/translate'

// Customizable Area End

export const configJSON = require('./config');


export interface Props {
	navigation: any;
	// Customizable Area Start

	// Customizable Area End
}

interface S {
	// Customizable Area Start

	accountType: string;
	emailSchema: any;
	phoneSchema: any;
	otpSchema: any;
	passwordSchema: any;
	accountStatus: any;
	passwordRules: any;
	emailValue: any;
	phoneValue: any;
	isFocusedEmail: boolean;
	errors: any;
	loginWith: any;
	countryCodeSelected: any;
	token: any;
	enablePasswordField: boolean;
	btnConfirmPasswordShowHide: boolean;
	password: string;
	buttonLoading:boolean;
	confirmPassword: string;
	hidePassword: boolean;
	hideConfirmPassword: boolean;
	isFocusedPassword: boolean;
	isFocusedConfirmPassword: boolean;
	checkedRememberMe: boolean;
	openVerificationModal: boolean;
	openCountryList: boolean;
	selectedAccount: any;
	apiCallLoader: boolean;
	errorMessage:string
	mobileNo: string;
	email: string;
	loading: boolean;
	countryList: any;
	error: any;
	notRegisteredModal:boolean;
	value: string;
	selectedCountry: any;
	searchData: any;
	openConfirmation: boolean;
	language:any;
	// Customizable Area End
}

interface SS {
	// Customizable Area Start
	navigation: any;
	// Customizable Area End
}

// Customizable Area Start
// Customizable Area End

export default class ForgotPasswordController extends BlockComponent<
	Props,
	S,
	SS

> {
	// Customizable Area Start

	validationAPICallId: any;
	requestEmailOtpCallId: any;
	requestPhoneOtpCallId: any;
	requestChangePasswordCallId: any;
	requestGoToConfirmationCallId: any;
	otpToken: any;
	isChangePassword: boolean=false;
	countryCodeApiCallId: any;
	requestNewPasswordCallId: any;

	//Properties from config

	labelTextIsAccountRecovery: string = configJSON.labelTextIsAccountRecovery;
	secondLabelText: string = configJSON.secondLabelText;
	thirdLabelText: string = configJSON.thirdLabelText;
	forthLabelText: string = configJSON.forthLabelText;
	fifthLabelText: string = configJSON.fifthLabelText;
	sixthLabelText: string = configJSON.sixthLabelText;
	seventhLabelText: string = configJSON.seventhLabelText;
	firstInputAutoCompleteType: any = configJSON.firstInputAutoCompleteType;
	firstInputKeyboardStyle: any = configJSON.firstInputKeyboardStyle;
	firstInputPlaceholder: string = configJSON.firstInputPlaceholder;
	firstInputErrorColor: any = configJSON.firstInputErrorColor;
	buttonTextIsNext: string = configJSON.buttonTextIsNext;
	buttonColorForNextButton: any = configJSON.buttonColorForNextButton;
	secondInputAutoCompleteType: any = configJSON.secondInputAutoCompleteType;
	secondInputKeyboardType: any = configJSON.secondInputKeyboardType;
	secondInputPlaceholder: string = configJSON.secondInputPlaceholder;
	secondInputErrorColor: any = configJSON.secondInputErrorColor;
	thirdInputPlaceholder: string = configJSON.thirdInputPlaceholder;
	thirdInputErrorColor: any = configJSON.thirdInputErrorColor;
	buttonTitleIsSMSPhoneAccount: string =
		configJSON.buttonTitleIsSMSPhoneAccount;
	buttonTitleIsEmailAccount: string = configJSON.buttonTitleIsEmailAccount;
	labelTextIsPleaseEnterYourNewPassword: string =
		configJSON.labelTextIsPleaseEnterYourNewPassword;
	labelTextIsYourPasswordHasBeenSuccessfullyChanged: string =
		configJSON.labelTextIsYourPasswordHasBeenSuccessfullyChanged;
	placeholderIsPassword: string = configJSON.placeholderIsPassword;
	imgPasswordInVisible: any = imgPasswordInVisible;
	imgPasswordVisible: any = imgPasswordVisible;
	placeholderIsReTypePassword: string = configJSON.placeholderIsReTypePassword;
	buttonTitleIsOk: string = configJSON.buttonTitleIsOk;
	buttonColorForOkButton: any = configJSON.buttonColorForOkButton;
	countryCodeSelectorPlaceholder: string =
		configJSON.countryCodeSelectorPlaceholder;

	// Customizable Area End

	constructor(props: Props) {

		super(props);
		this.subScribedMessages = [
			// Customizable Area Start
			getName(MessageEnum.RestAPIResponceMessage),
			getName(MessageEnum.NavigationPayLoadMessage),
			getName(MessageEnum.CountryCodeMessage),
			// Customizable Area End
		];

		this.receive = this.receive.bind(this);

		runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

		// Customizable Area Start
		//email schema

		let emailSchema = {
			email: Yup.string()
				.email(configJSON.pleaseEnterAValidEmail)
				.required(configJSON.emailIsRequired),
		};

		//phone schema
		let phoneSchema = {
			phone: Yup.string()
				.matches(configJSON.phoneRegExp, configJSON.phoneNumberIsNotValid)
				.required(configJSON.phoneNumberIsRequired),
		};


		//otpSchema

		let otpSchema = {
			otpCode: Yup.number()
				.min(4)
				.required(configJSON.otpCodeIsRequired),
		};

		//passwordSchema

		let passwordSchema = {
			password: Yup.string()
				.required(configJSON.pleaseEnterAPassword)
				.min(2, configJSON.passMustBeAtLeast2Characters),
			confirmPassword: Yup.string()
				.required(configJSON.pleaseConfirmYourPassword)
				.when('password', {
					is: (val) => (!!(val && val.length > 0)),
					then: Yup.string().oneOf(
						[Yup.ref('password')],
						configJSON.passMustMatch
					),
				}),
		};

		this.state = {
			accountType: 'sms',
			accountStatus: 'ChooseAccountType',
			emailValue: '',
			phoneValue: '',
			countryCodeSelected: '',
			passwordRules: '',
			emailSchema: emailSchema,
			phoneSchema: phoneSchema,
			otpSchema: otpSchema,
			passwordSchema: passwordSchema,
			token: '',
			isFocusedEmail: false,
			errors: {},
			loginWith: '',
			enablePasswordField: true,
			btnConfirmPasswordShowHide: true,
			password: '',
			confirmPassword: '',
			hidePassword: true,
			hideConfirmPassword: true,
			errorMessage:'',
			isFocusedPassword: false,
			isFocusedConfirmPassword: false,
			checkedRememberMe: false,
			openVerificationModal: true,
			openCountryList: false,
			selectedAccount: 'SMS',
			apiCallLoader: false,
			mobileNo: '',
			email: '',
			loading: true,
			countryList: [],
			error: null,
			buttonLoading:false,
			value: '',
			notRegisteredModal:false,
			selectedCountry: null,
			searchData: [],
			openConfirmation: false,
			language:""
		};

		// Customizable Area End
	}

	// Customizable Area Start
	async componentDidMount() {
		super.componentDidMount();
		this.validationRulesRequest();
		const language = await getStorageData("SelectedLng");
		this.setState({language:language})
	}

	authTokenFunc = (otpAuthTkn:any) => {
		this.setState({ token: otpAuthTkn });
		if (this.isChangePassword) {
			this.setState({ accountStatus: 'ChangePassword' });
		}
		this.otpToken = this.state.token;
	}

	validationRulesRequest = () => {

		const header = {
			'Content-Type': configJSON.forgotPasswordAPiContentType,
		};
		const requestMessage = new Message(
			getName(MessageEnum.RestAPIRequestMessage)
		);
		this.validationAPICallId = requestMessage.messageId;
		requestMessage.addData(
			getName(MessageEnum.RestAPIResponceEndPointMessage),
			configJSON.profileValidationSettingsAPiEndPoint
		);
		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestHeaderMessage),
			JSON.stringify(header)
		);

		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestMethodMessage),
			configJSON.httpGetMethod
		);


		runEngine.sendMessage(requestMessage.id, requestMessage);
	};

	navigationPayloadFunc = (message:any) => {
		const otpAuthTkn = message.getData(
			getName(MessageEnum.AuthTokenDataMessage)
		);

		if (otpAuthTkn && otpAuthTkn.length > 0) {
			this.authTokenFunc(otpAuthTkn)
		} else {
			const accountType = message.getData(
				getName(MessageEnum.NavigationForgotPasswordPageInfo)
			);
			if (accountType) {
				this.startForgotPassword(accountType);
			}
		}
	}

	validationAPICallSuccess = (responseJson:any) => {
		if (responseJson === undefined) {

			return;
		}

		if (responseJson?.data[0]) {

			const passRegex = RegExp(
				responseJson.data[0].password_validation_regexp
			);
			const emailRegex = RegExp(responseJson.data[0].email_validation_regexp);
			const passwordRulesFromValidation =
				responseJson.data[0].password_validation_rules;

			this.setState({
				//email schema
				emailSchema: {
					email: Yup.string()
						.email(configJSON.pleaseEnterAValidEmail)
						.required(configJSON.emailIsRequired)
						.matches(emailRegex, configJSON.invalidEmailAddress),
				},
				//password schema
				passwordSchema: {
					password: Yup.string()
						.required(configJSON.pleaseEnterAPassword)
						.matches(passRegex, configJSON.invalidPassword),

					confirmPassword: Yup.string()
						.required(configJSON.pleaseConfirmYourPassword)
						.when('password', {
							is: (val) => (!!(val && val.length > 0)),
							then: Yup.string().oneOf(
								[Yup.ref('password')],
								configJSON.passMustMatch
							),
						}),
				},
				passwordRules: passwordRulesFromValidation,
			});
		}
	}

	requestEmailOtpCallSuccess = (message:any , responseJson:any) => {
		if (
			responseJson?.meta?.token
		) {
			this.navigateToOTP(responseJson.meta.token);
		}
		//error handling
		else if (responseJson?.errors) {
			if(responseJson.errors[0].otp === 'Account not found') {
				this.setState({
					notRegisteredModal:true,
					errorMessage: translate("wrong_email")
				})
			} else {
				this.parseApiErrorResponse(responseJson);
			}
		} else {
			let errorReponse = message.getData(
				getName(MessageEnum.RestAPIResponceErrorMessage)
			);

			this.parseApiCatchErrorResponse(errorReponse);
		}
	}
	async receive(from: string, message: Message) {

		runEngine.debugLog('Country Code', message);

		if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
			this.navigationPayloadFunc(message)
		} else if (
			getName(MessageEnum.RestAPIResponceMessage) === message.id &&
			this.validationAPICallId &&
			this.validationAPICallId ===
				message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
		) {
			let responseJson = message.getData(
				getName(MessageEnum.RestAPIResponceSuccessMessage)
			);

			this.validationAPICallSuccess(responseJson)

		} else if (
			getName(MessageEnum.RestAPIResponceMessage) === message.id &&
			this.requestEmailOtpCallId !== null &&
			this.requestEmailOtpCallId ===
				message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
		) {
			this.setState({
				buttonLoading:false
			})
			let responseJson = message.getData(
				getName(MessageEnum.RestAPIResponceSuccessMessage)
			);
			this.requestEmailOtpCallSuccess(message , responseJson)
		} else if (
			getName(MessageEnum.RestAPIResponceMessage) === message.id &&
			this.requestPhoneOtpCallId !== null &&
			this.requestPhoneOtpCallId ===
				message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
		) {
			this.setState({
				buttonLoading:false
			})
			let responseJson = message.getData(
				getName(MessageEnum.RestAPIResponceSuccessMessage)
			);


			if (
				responseJson?.meta?.token
			) {
				this.navigateToOTP(responseJson.meta.token)
			}
			//error handling
			this.errorResponseHandle(message , responseJson)
		} else if (
			getName(MessageEnum.RestAPIResponceMessage) === message.id &&
			this.requestGoToConfirmationCallId !== null &&
			this.requestGoToConfirmationCallId ===
				message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
		) {
			let responseJson = message.getData(
				getName(MessageEnum.RestAPIResponceSuccessMessage)
			);

			this.requestGoToConfirmationCall(message , responseJson)
			
		} else if (
			getName(MessageEnum.RestAPIResponceMessage) === message.id &&
			this.countryCodeApiCallId != null &&
			this.countryCodeApiCallId ===
				message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
		) {
			this.countryCodeApiCall(message)
			
		} else if (
			getName(MessageEnum.RestAPIResponceMessage) === message.id &&
			this.requestNewPasswordCallId != null &&
			this.requestNewPasswordCallId ===
				message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
		) {
			this.requestNewPasswordCall(message)
		}
	}

	requestNewPasswordCall = (message:any) => {
		let responseJson = message.getData(
			getName(MessageEnum.RestAPIResponceSuccessMessage)
		);

		if (responseJson && !responseJson.errors) {
			this.setState({openConfirmation: true})
		}
	}

	countryCodeApiCall = (message:any) => {
		let responseJson = message.getData(
			getName(MessageEnum.RestAPIResponceSuccessMessage)
		);

		if (responseJson && !responseJson.errors){
			this.setState({
				countryList: responseJson,
				error: null,
				loading: false,
				openCountryList: true,
			});
		}
	}

	requestGoToConfirmationCall = (message:any,responseJson:any) => {
		if (responseJson?.data) {
			this.setState({
				accountStatus: 'Confirmation',
			});
		} else if (responseJson?.errors) {
			this.parseApiErrorResponse(responseJson);
		} else {
			let errorReponse = message.getData(
				getName(MessageEnum.RestAPIResponceErrorMessage)
			);

			this.parseApiCatchErrorResponse(errorReponse);

		}
	}

	navigateToOTP = (token: string) => {
		this.otpToken = token;
		this.setState({ token: this.otpToken });
		//navigate to OTP page
		const msg: Message = new Message(
			getName(MessageEnum.NavigationMobilePhoneOTPMessage)
		);
		msg.addData(
			getName(MessageEnum.AuthTokenDataMessage),
			this.state.token
		);
		msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
		msg.addData(
			getName(MessageEnum.AuthTokenPhoneNumberMessage),
			{phone: this.state.selectedCountry?.country_code+this.state.mobileNo, selectedAccount: this.state.selectedAccount}
		);
		msg.addData(
			getName(MessageEnum.AuthTokenEmailMessage),
			{email: this.state.emailValue, selectedAccount: this.state.selectedAccount}
		);
		msg.addData(getName(MessageEnum.EnterOTPAsForgotPasswordMessage), true);
		this.send(msg);
	}

	errorResponseHandle = (message:any , responseJson:any) => {
		if (responseJson?.errors) {
			if(responseJson.errors[0].otp === 'Account not found') {
				this.setState({
					notRegisteredModal:true,
					errorMessage: translate("wrong_mobile_number")
				})
				// this.showAlert(configJSON.errorTitle, "This phone number is not registered with Golavi")
			} else {
				this.parseApiErrorResponse(responseJson);
			}
		} else {
			let errorReponse = message.getData(
				getName(MessageEnum.RestAPIResponceErrorMessage)
			);

			this.parseApiCatchErrorResponse(errorReponse);

		}
	}

	handleFocusEmail = () => this.setState({ isFocusedEmail: true });
	handleBlurEmail = () => this.setState({ isFocusedEmail: false });

	handleFocusPassword = () => this.setState({ isFocusedPassword: true });

	handleBlurPassword = () => this.setState({ isFocusedPassword: false });

	handleFocusConfirmPassword = () =>
		this.setState({ isFocusedConfirmPassword: true });

	handleBlurConfirmPassword = () =>
		this.setState({ isFocusedConfirmPassword: false });

	setRememberMe = (value: boolean) => {
		this.setState({ checkedRememberMe: value });
	};

	CustomCheckBoxProps = {
		onChangeValue: (value: boolean) => {
			this.setState({ checkedRememberMe: value });
			this.CustomCheckBoxProps.isChecked = value;
		},
		isChecked: false,
	};

	btnRememberMeProps = {
		onPress: () => {
			this.setState({ checkedRememberMe: !this.CustomCheckBoxProps.isChecked });
			this.CustomCheckBoxProps.isChecked = !this.CustomCheckBoxProps.isChecked;
		},
	};

	startForgotPassword(accountType: String) {
		this.setState({
			accountStatus: accountType === 'sms' ? 'EnterPhone' : 'EnterEmail',
		});
	}

	_validateNewPasswordForm = () => {

		const { password,confirmPassword, errors } = this.state;

		let formIsValid = true;

		if (!password || password) {
		  errors.password = passwordValidate("The password", password);
		  formIsValid = !!errors.password.status;
		}
		if (!confirmPassword || confirmPassword) {
			errors.confirm_password = confirmPasswordValidate("confirm password", confirmPassword, "password", password);
			formIsValid = formIsValid ? !!errors.confirm_password.status : formIsValid;
		  }
		this.setState({ errors });

		return formIsValid;
	  };

	_validateMobileForm = () => {
		const { mobileNo, errors } = this.state;
		let formIsValid = true;

		if (!mobileNo || mobileNo) {
		errors.mobileNo = phoneValidate("mobile number", mobileNo);
		formIsValid = !!errors.mobileNo.status;
		}
		this.setState({ errors: errors });

		return formIsValid;
	  };

	_validateEmailForm = () => {
		const { emailValue, errors } = this.state;

		let formIsValid = true;

		if (!emailValue || emailValue) {
		errors.email = isEmail("Email", emailValue);
		formIsValid = !!errors.email.status;
		}

		this.setState({ errors: errors });

		return formIsValid;
	  };

	goToOtpAfterEmailValidation(values: { email: string }) {
		if (!this._validateEmailForm()) {
			return;
		  }

		this.setState({
			buttonLoading:true
		})

		//change status to OTP
		const header = {
			'Content-Type': configJSON.forgotPasswordAPiContentType,
		};
		const requestMessage = new Message(
			getName(MessageEnum.RestAPIRequestMessage)
		);
		//GO TO REQUEST STATE
		this.requestEmailOtpCallId = requestMessage.messageId;
		requestMessage.addData(
			getName(MessageEnum.RestAPIResponceEndPointMessage),
			configJSON.passRecoveryStartOtpAPiEndPoint
		);
		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestHeaderMessage),
			JSON.stringify(header)
		);

		this.setState({
			emailValue: values.email ? values.email : '',
		});


		const data = {
			data: {
				attributes: {
					email: values.email
				},
			},
		};

		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestMethodMessage),
			configJSON.httpPostMethod
		);


		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestBodyMessage),
			JSON.stringify(data)
		);

		runEngine.sendMessage(requestMessage.id, requestMessage);

	}

	goToOtpAfterPhoneValidation(values: { phone: string }) {
		if (
			!this.state.selectedCountry ||
			this.state.selectedCountry.length === 0
		) {
			this.showAlert(
				translate(configJSON.goToOtpAfterPhoneValidationErrorTitle),
				translate(configJSON.goToOtpAfterPhoneValidationErrorBody),
				translate("ok"),
			);
			return;
		}
		if (!this._validateMobileForm()) {
			return;
		  }

			this.setState({
				buttonLoading:true
			})
		//change status to OTP
		const header = {
			'Content-Type': configJSON.forgotPasswordAPiContentType,
		};
		const requestMessage = new Message(
			getName(MessageEnum.RestAPIRequestMessage)
		);
		//GO TO REQUEST STATE
		this.requestPhoneOtpCallId = requestMessage.messageId;
		requestMessage.addData(
			getName(MessageEnum.RestAPIResponceEndPointMessage),
			configJSON.passRecoveryStartOtpAPiEndPoint
		);
		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestHeaderMessage),
			JSON.stringify(header)
		);

		const phoneValue = this.state.selectedCountry && values.phone
					? this.state.selectedCountry?.country_code + values.phone
					: ''

		this.setState({
			phoneValue: phoneValue,
		});

		const data = {
			data: {
				attributes: {
					full_phone_number: phoneValue,
				},
			},
		};

		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestMethodMessage),
			configJSON.httpPostMethod
		);

		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestBodyMessage),
			JSON.stringify(data)
		);

		runEngine.sendMessage(requestMessage.id, requestMessage);
	}

	onCloseModal() {
		this.setState({ openVerificationModal: false }, () => {
			this.props.navigation.goBack();
		});
	}

	openModal() {
		this.setState({ openVerificationModal: true });
	}

	openCountryListModal() {
		this.setState({ openCountryList: true, value: '' })
	}
	onContinue() {
		if (this.state.selectedAccount == 'SMS') {

				this.getCountryApi();

		} else {
			this.setState({ openVerificationModal: false });
		}
	}
	searchFilterFunction = (text: string) => {
		this.setState({
			value: text,
		});

		const newData = this.state.countryList.filter((item: any) => {
			const itemData = `${item.country_name.toUpperCase()} (${
				item.country_code
			}) +${item.country_ISO_code}`;
			const textData = text.toUpperCase();
			return itemData.indexOf(textData) > -1;
		});
		this.setState({
			searchData: newData,
		});
	};
  closeReportModal=()=>{
    this.setState({
      notRegisteredModal:false
    })
  }
	getCountryApi = () => {
		const requestMessage = new Message(
			getName(MessageEnum.RestAPIRequestMessage)
		);
		this.countryCodeApiCallId = requestMessage.messageId;
		requestMessage.addData(
			getName(MessageEnum.RestAPIResponceEndPointMessage),
			configJSON.apiEndPointGetCountry
		);

		const header = {
			'Content-Type': configJSON.contentTypeApiGetCountryCodes,
		};

		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestHeaderMessage),
			header
		);

		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestMethodMessage),
			configJSON.apiGetCountryCodesType
		);

		runEngine.sendMessage(requestMessage.id, requestMessage);
	};

	submitNewPasswordApi = () => {
		if (!this._validateNewPasswordForm()) {
			return;
		}

		const requestMessage = new Message(
			getName(MessageEnum.RestAPIRequestMessage)
		);
		this.requestNewPasswordCallId = requestMessage.messageId;
		requestMessage.addData(
			getName(MessageEnum.RestAPIResponceEndPointMessage),
			configJSON.apiEndPointResetPasswordNew
		);

		const header = {
			'Content-Type': configJSON.contentTypeApiGetCountryCodes,
		};

		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestHeaderMessage),
			header
		);
		const data = {
			token: this.otpToken ? this.otpToken : '',
			new_password: this.state.password,
			confirm_password: this.state.confirmPassword
		};

		const httpBody = {
			data: data,
		};
		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestBodyMessage),
			JSON.stringify(httpBody)
		);
		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestMethodMessage),
			configJSON.apiTypePost
		);

		runEngine.sendMessage(requestMessage.id, requestMessage);
	};
	// Customizable Area End
}
