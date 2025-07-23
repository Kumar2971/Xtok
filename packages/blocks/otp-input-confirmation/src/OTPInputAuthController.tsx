import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import {getStorageData, requireValidate, setStorageData} from "../../../framework/src/Utilities";
//@ts-ignore
import i18n from "i18n-js";

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: any;
  // Customizable Area End
}

export interface S {
  // Customizable Area Start
  otp: string;
  otpAuthToken: string;
  userAccountID: string;
  labelInfo: string;
  toMessage: string;
  isFromForgotPassword: boolean;
  errors:any;
  remainingTime:number;
  verifyWith:string;
  toastMessage:string;
  apiCallLoader:boolean;
  selectedAccount:string;
  errorMsg:any,
  showToast:boolean,
  mobileNo:any;
  email:any;
  language:any;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class OTPInputAuthController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  otpAuthApiCallId: any;
  btnTxtSubmitOtp: string;
  placeHolderOtp: string;
  // labelInfo: string;
  submitButtonColor: any = configJSON.submitButtonColor;
  otpTimer: any;
  otpWaitTime: number = 56;
  postSubmitOTPSMSApiCallId: any;
  postSubmitOTPEmailApiCallId: any;
  postSMSOtpApiCallId: any;
  postEmailOtpApiCallId: any;
  CELL_COUNT: number = 4;
  requestEmailOtpCallId: any;
  requestPhoneOtpCallId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    // Customizable Area Start
    this.state = {
      otp: "",
      otpAuthToken: "",
      userAccountID: "",
      labelInfo: configJSON.labelInfo,
      toMessage: "",
      showToast: false,
      isFromForgotPassword: false,
      errors: {},
      remainingTime: this.otpWaitTime,
      verifyWith:"",
      apiCallLoader:false,
      selectedAccount:"",
      errorMsg:null,
      toastMessage:"",
      mobileNo:"",
      email:"",
      language:""
    };

    this.btnTxtSubmitOtp = configJSON.btnTxtSubmitOtp;
    this.placeHolderOtp = configJSON.placeHolderOtp;
    // Customizable Area End
  }

  async receive(from: String, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const OTPInputAuthDataMessage = message.getData(getName(MessageEnum.OTPInputAuthDataMessage));
      if (OTPInputAuthDataMessage) {
        console.log("DATA 2 = ", JSON.stringify(OTPInputAuthDataMessage))
        const { verifyWith, selectedAccount, mobileNo, email } = OTPInputAuthDataMessage;
        this.setState({ verifyWith: verifyWith, selectedAccount: selectedAccount, mobileNo: mobileNo, email: email })
      }
    }
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.otpAuthApiCallId != null &&
      this.otpAuthApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      if (
        responseJson &&
        (responseJson.messages)
      ) {
        if (responseJson.meta && responseJson.meta.token) {
          this.setState({
            otpAuthToken: responseJson.meta.token
          });
        }
        if (this.state.isFromForgotPassword) {
          const msg: Message = new Message(
            getName(MessageEnum.NavigationNewPasswordMessage)
          );
          msg.addData(
            getName(MessageEnum.AuthTokenDataMessage),
            this.state.otpAuthToken
          );

          msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

          this.send(msg);
        } else {
          const msg: Message = new Message(
            getName(MessageEnum.NavigationMobilePhoneAdditionalDetailsMessage)
          );

          msg.addData(
            getName(MessageEnum.AuthTokenDataMessage),
            this.state.otpAuthToken
          );

          msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

          this.send(msg);
        }
      } else {
        //Check Error Response
        if (responseJson.errors && responseJson.errors.length > 0) {
          if (responseJson.errors[0].token && responseJson.errors[0].token === 'Invalid token' || responseJson.errors[0].token && responseJson.errors[0].token === 'Invalid OTP') {
            this.setState({ errors: { otp: { message: "Please enter correct OTP" } } })
          } else if (apiRequestCallId === this.otpAuthApiCallId) {
            this.setState({
              showToast: true,
              toastMessage: responseJson.errors[0].otp
            })
          }
        }

      }

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (errorReponse != null) {
        this.parseApiCatchErrorResponse(errorReponse);
      }
    } else if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const phoneAuthToken = message.getData(
        getName(MessageEnum.AuthTokenDataMessage)
      );

      const authTokenPhone = message.getData(
        getName(MessageEnum.AuthTokenPhoneNumberMessage)
      );

      const forgotPasswordBool = message.getData(
        getName(MessageEnum.EnterOTPAsForgotPasswordMessage)
      );

      const authTokenEmail = message.getData(
        getName(MessageEnum.AuthTokenEmailMessage)
      );

      let phoneNumber;
      let emailValue;
      let selectedAccount;
      if (authTokenPhone !== undefined && authTokenPhone !== null) {
        if (typeof (authTokenPhone) === 'string') {
          phoneNumber = authTokenPhone
        } else {
          phoneNumber = authTokenPhone.phone
          selectedAccount = authTokenPhone.selectedAccount
        }
      }
      if (authTokenEmail !== undefined && authTokenEmail !== null) {
        if (typeof (authTokenEmail) === 'string') {
          emailValue = authTokenEmail
        } else {
          emailValue = authTokenEmail.email
          selectedAccount = authTokenEmail.selectedAccount
        }
      }

      const userAccountID = phoneNumber ? "" + phoneNumber : "" + emailValue;

      let updatedLabel = this.state.labelInfo;
      if (userAccountID && userAccountID !== "undefined") {
        updatedLabel = updatedLabel.replace("phone", userAccountID);
      }
      console.log("DATA 3 = ", JSON.stringify(emailValue))
      this.setState({
        otpAuthToken:
          phoneAuthToken && phoneAuthToken.length > 0
            ? phoneAuthToken
            : this.state.otpAuthToken,
        userAccountID: userAccountID,
        labelInfo: updatedLabel,
        isFromForgotPassword:
          forgotPasswordBool === undefined
            ? this.state.isFromForgotPassword
            : forgotPasswordBool,
        email: emailValue ? emailValue : this.state.email,
        selectedAccount: selectedAccount ? selectedAccount : this.state.selectedAccount,
        mobileNo: phoneNumber ? phoneNumber : this.state.mobileNo
      });
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId != null) {
        if (responseJson?.errors && responseJson?.errors[0].otp) {
          this.setState({ showToast: true, toastMessage: i18n.t("invalid_otp_code") })
        }
        if (apiRequestCallId === this.postSubmitOTPSMSApiCallId) {
          this.setState({ apiCallLoader: false })
          if (responseJson && (responseJson.errors || responseJson.error)) {
            //Check Error Response
            this.setState({errorMsg: responseJson.errors[0].pin})
          } else if (responseJson && responseJson.data) {
            if(!isNaN(responseJson?.data?.id)) await setStorageData('userID',responseJson.data?.id);
            this.goToFollowers()
          }

        }

        if (apiRequestCallId === this.postSubmitOTPEmailApiCallId) {
          this.setState({ apiCallLoader: false })
          if (responseJson && (responseJson.errors || responseJson.error)) {
            //Check Error Response
            this.setState({errorMsg: responseJson.errors[0].pin})
          } else if (responseJson && responseJson.messages ) {
          await setStorageData('userID',responseJson?.data?.id);
            this.goToFollowers();
          }
        }
        if (apiRequestCallId === this.postSMSOtpApiCallId) {
          console.log(" postSMSOtpApiCallId response==>", responseJson);
          if (responseJson && (responseJson.errors || responseJson.error)) {
            //Check Error Response
            this.handleErrorResponse(responseJson);
          } else if (responseJson && responseJson.meta && responseJson.meta.token) {
            await setStorageData('smsOtpToken', responseJson.meta.token);
            this.setState({ otp: "" })
            this.startTimer();
          }

        }

        if (apiRequestCallId === this.postEmailOtpApiCallId) {



          await setStorageData('userID', responseJson?.data?.id);
          this.setState({ apiCallLoader: false })
          if (responseJson && (responseJson.errors || responseJson.error)) {
            //Check Error Response
            this.handleErrorResponse(responseJson);
          } else if (responseJson && responseJson.meta && responseJson.meta.token) {
            await setStorageData('userID', responseJson?.data?.id);
            await setStorageData('emailOtpToken', responseJson.meta.token);
            this.setState({ otp: "" })
            this.startTimer()
          }
        }
        if (apiRequestCallId === this.requestEmailOtpCallId) {
          console.log("Email OTP response==>", responseJson);
          if (
            responseJson !== undefined &&
            responseJson.meta &&
            responseJson.meta.token
          ) {
            this.setState({ otp: "", otpAuthToken: responseJson.meta.token, showToast: true, toastMessage: i18n.t("code_has_been_sent_successfully") });
            this.startTimer();
          }
        }
        if (apiRequestCallId === this.requestPhoneOtpCallId) {
          if (
            responseJson !== undefined &&
            responseJson.meta &&
            responseJson.meta.token
          ) {
            this.setState({ otp: "", otpAuthToken: responseJson.meta.token, showToast: true, toastMessage: i18n.t("code_has_been_sent_successfully") });
            this.startTimer();
          }
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async submitOtp() {
    if (!this.state.otp || this.state.otp.length < 4) {
      this.setState({ errors: { otp: { message: i18n.t("please_enter_otp") } } })
      return;
    } else {
      this.setState({ errors: {} })
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    if (this.state.isFromForgotPassword) {

      const header = {
        "Content-Type": configJSON.apiVerifyOtpContentType
      };

      //GO TO REQUEST STATE
      this.otpAuthApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        "bx_block_forgot_password/otp_confirmations"
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      const data = {
        token: this.state.otpAuthToken ? this.state.otpAuthToken : "",
        otp_code: this.state.otp ? this.state.otp : ""
      };

      const httpBody = {
        data: data
      };



      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );
    } else {
      const headers = {
        "Content-Type": configJSON.apiVerifyOtpContentType,
        token: this.state.otpAuthToken
      };

      this.otpAuthApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        "account/accounts/sms_confirmation?pin=" + this.state.otp
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(headers)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(JSON.stringify({}))
      );
    }

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiVerifyOtpMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  btnSubmitOTPProps = {
    onPress: () => this.submitOtp()
  };

  txtMobilePhoneOTPWebProps = {
    onChangeText: (text: string) => this.setState({ otp: text })
  };

  txtMobilePhoneOTPMobileProps = {
    ...this.txtMobilePhoneOTPWebProps,
    keyboardType: "numeric"
  };

  txtMobilePhoneOTPProps = this.isPlatformWeb()
    ? this.txtMobilePhoneOTPWebProps
    : this.txtMobilePhoneOTPMobileProps;
  async componentWillUnmount() {
    this.setState({
      showToast: false
    })
  }
  async componentDidMount() {
    const language = await getStorageData("SelectedLng");
    this.setState({language:language})

    const data = this.props.navigation.state?.params?.data
    console.log("DATA = ", JSON.stringify(data))
    if (data) {
      console.log({ data })
      let verifyWith
      if (data.length > 14) {
        verifyWith = `${data.substring(0, 3)}****${data.substring(data.length - 8, data.length)}`;
      } else {
        verifyWith = `${data.substring(0, 3)}****${data.substring(data.length - 2, data.length)}`;
      }
      verifyWith = verifyWith.trim();
      console.log(verifyWith);
      this.setState({
        verifyWith: verifyWith
      })
    }

    this.startTimer();
  }

  _validateForm = () => {
    const { otp, errors } = this.state;
    console.log("otp==>", otp);

    let formIsValid = true;
    if (!otp || otp) {
      errors.otp = requireValidate("otp", otp);
      formIsValid = formIsValid ? !!errors.otp.status : formIsValid;
    }
    console.log("errors==>", errors)
    this.setState({ errors });

    return formIsValid;
  };

  submitOTPSMS = async () => {
    if (!this._validateForm()) {
      return;
    }
    const { otp } = this.state;
    const token = await getStorageData("smsOtpToken") || "";

    const apiEndPoint = `account_block/accounts/sms_confirmations?pin=${otp}`
    this.setState({ apiCallLoader: true });

    const header = {
      "Content-Type": configJSON.apiVerifyOtpContentType,
      token: token
    };

    await this.apiCall({
      setApiCallId: 'postSubmitOTPSMSApiCallId',
      header,
      method: configJSON.apiVerifyOtpMethod,
      endPoint: apiEndPoint,
      body: null
    });
  }

  subMitOTPEmail = async () => {
    if (!this._validateForm()) {
      return;
    }
    if (!this.state.otp || this.state.otp.length === 0) {
      this.showAlert(configJSON.errorTitle, configJSON.errorOtpNotValid);
      return;
    }
    const { otp } = this.state;
    const token = await getStorageData("emailOtpToken") || "";

    const apiEndPoint = `account_block/accounts/otp_confirmations?otp=${otp}`
    this.setState({ apiCallLoader: true });

    const header = {
      "Content-Type": configJSON.apiVerifyOtpContentType,
      token: token
    };

    await this.apiCall({
      setApiCallId: 'postSubmitOTPEmailApiCallId',
      header,
      method: configJSON.apiVerifyOtpMethod,
      endPoint: apiEndPoint,
      body: null
    });
  }
  postSMSOtp = async () => {
    const { mobileNo } = this.state;
    const token = await getStorageData("authToken") || "";

    this.setState({ apiCallLoader: true });

    const header = {
      "Content-Type": configJSON.formContentType,
      token: token
    };

    let formdata: any = new FormData();
    formdata.append("data[attributes][full_phone_number]", mobileNo);

    console.log("console ->otp  formdata ", formdata);

    this.apiCall({
      setApiCallId: 'postSMSOtpApiCallId',
      header,
      method: configJSON.apiVerifyOtpMethod,
      endPoint: `account_block/verify_phone`,
      body: formdata
    });
  }

  postEmailOTP = async () => {
    const { email } = this.state;
    this.setState({ apiCallLoader: true });
    const token = await getStorageData("authToken") || "";

    const header = {
      "Content-Type": configJSON.formContentType,
      token: token
    };

    let formdata:any = new FormData();
    formdata.append("data[attributes][email]", email);

    console.log("console -> email otp  formdata ", formdata);

    this.apiCall({
      setApiCallId: 'postEmailOtpApiCallId',
      header,
      method: configJSON.apiVerifyOtpMethod,
      endPoint: `account_block/verify_email`,
      body: formdata
    });
  }

  resendMobileOTP = async () => {
    this.startTimer();

    const { mobileNo } = this.state;
    const header = {
			'Content-Type': configJSON.apiVerifyOtpContentType,
		};
		const requestMessage = new Message(
			getName(MessageEnum.RestAPIRequestMessage)
		);
		//GO TO REQUEST STATE
		this.requestPhoneOtpCallId = requestMessage.messageId;
		requestMessage.addData(
			getName(MessageEnum.RestAPIResponceEndPointMessage),
			"bx_block_forgot_password/otps"
		);
		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestHeaderMessage),
			JSON.stringify(header)
		);

    const data = {
      data: {
        attributes: {
          full_phone_number: mobileNo,
        },
      },
    };

		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestMethodMessage),
			configJSON.apiVerifyOtpMethod
		);

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  closeReportModal = () => {
    this.setState({
      showToast: false
    })
  }
  resendEmailOTP = async () => {
    this.startTimer();

    const { email} = this.state;
    console.log("Email = ",email)
    console.log("Email = ",this.state.email)
    this.setState({apiCallLoader : true});

    const header = {
      'Content-Type': configJSON.apiVerifyOtpContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.requestEmailOtpCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_forgot_password/otps"
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    const data = {
      data: {
        attributes: {
          email: email
        },
      },
    };

		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestMethodMessage),
			configJSON.apiVerifyOtpMethod
		);

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  startTimer = () => {
    console.log('called')
    if(!this.otpTimer){
      this.setState({remainingTime: this.otpWaitTime});
      this.otpTimer = setInterval(this.countdown,1000);
    }
    console.log('dellac')

  }

  countdown = () => {
    if(!this.state){
      return;
    }
    const { remainingTime } = this.state;
    if (remainingTime == 0) {
      clearTimeout(this.otpTimer);
      clearInterval(this.otpTimer);
      this.otpTimer = null;
    } else {
      this.setState({ remainingTime: remainingTime - 1 }); //we subtract the second each iteration
    }
  }

  goToFollowers() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationFollowersMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.FollowersDataMessage), { isScreenFrom: "OTP" });

    this.send(msg);
  }

  apiCall = async (data: any) => {
    const { setApiCallId, header, endPoint, method, body } = data;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    if (setApiCallId === "postSubmitOTPSMSApiCallId") {
      this.postSubmitOTPSMSApiCallId = requestMessage.messageId;
    } else if (setApiCallId === "postSubmitOTPEmailApiCallId") {
      this.postSubmitOTPEmailApiCallId = requestMessage.messageId;
    } else if (setApiCallId === "postSMSOtpApiCallId") {
      this.postSMSOtpApiCallId = requestMessage.messageId;
    } else if (setApiCallId === "postEmailOtpApiCallId") {
      this.postEmailOtpApiCallId = requestMessage.messageId;
    }
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleErrorResponse = async (responseJson: any, parseError: boolean = true) => {
    if (responseJson.errors && responseJson?.errors?.hasOwnProperty('token') && responseJson.errors.token) {
      return;
    }
    //Check Error Response
    console.log("parseError===>",parseError);
  }
  // Customizable Area End
}
