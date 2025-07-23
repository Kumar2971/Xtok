import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { isEmail,phoneValidate, requireValidate, } from "../../../components/src/Utilities";

import { getStorageData, removeStorageData, setStorageData } from "../../../framework/src/Utilities";
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import facebookController from "../../social-media-account/src/FacebookController";
import { AsyncStorage } from "react-native";
// Customizable Area End

const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  password: string;
  countryCodeSelected: string;
  mobileNo: string;
  enablePasswordField: boolean;
  checkedRememberMe: boolean;

  placeHolderCountryCode: string;
  placeHolderMobile: string;
  placeHolderPassword: string;
  imgPasswordVisible: any;
  imgPasswordInVisible: any;
  labelHeader: string;
  btnTxtLogin: string;
  labelRememberMe: string;
  btnTxtSocialLogin: string;
  labelOr: string;
  labelForgotPassword: string;
  btnTxtEmailLogin: string;
  email: string;
  hidePassword: boolean;
  token: string;
  isFocusedEmail: boolean;
  isFocusedPassword: boolean;
  isFocusedMobile: boolean;
  isRemeberMe: boolean;
  loginWith: any;
  apiLoader: boolean;
  errors: any;
  responseErrorMsg:any;
  isRegistration: boolean;
  userId:number;
  language:any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class MobileAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  apiPhoneLoginCallId: any;
  labelTitle: string;
  private readonly errorTitle = "Error";
  signInApiCallId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);

    // Customizable Area Start
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];

    this.state = {
      countryCodeSelected: "",
      mobileNo: "",
      password: "",
      placeHolderCountryCode: "Select Country",
      enablePasswordField: true,
      checkedRememberMe: false,

      placeHolderMobile: configJSON.placeHolderMobile,
      placeHolderPassword: configJSON.placeHolderPassword,
      imgPasswordVisible: imgPasswordVisible,
      imgPasswordInVisible: imgPasswordInVisible,
      labelHeader: configJSON.labelHeader,
      btnTxtLogin: configJSON.btnTxtLogin,
      labelRememberMe: configJSON.labelRememberMe,
      btnTxtSocialLogin: configJSON.btnTxtSocialLogin,
      labelOr: configJSON.labelOr,
      labelForgotPassword: configJSON.labelForgotPassword,
      btnTxtEmailLogin: configJSON.btnTxtEmailLogin,
      email: "",
      hidePassword: true,
      token: "",
      userId:0,
      isFocusedEmail: false,
      isFocusedPassword: false,
      isRemeberMe: false,
      loginWith: "",
      isFocusedMobile: false,
      apiLoader: false,
      errors: {},
      responseErrorMsg:null,
      isRegistration: true,
      language:""
    };

    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    const language = await getStorageData("SelectedLng");
    this.setState({language:language})
    this.getRememberData()
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const MobilePhoneLogInDataMessage = message.getData(getName(MessageEnum.MobilePhoneLogInDataMessage));
      if (MobilePhoneLogInDataMessage) {
        const { loginWith } = MobilePhoneLogInDataMessage;
        this.setState({ loginWith: loginWith })
      }
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId != null) {
        if (apiRequestCallId === this.signInApiCallId) {
          console.log(" signInApiCallId response==>", responseJson);
          if (responseJson?.errors || responseJson?.error) {
            //Check Error Response
            // this.handleErrorResponse(responseJson);
            // Alert.alert(JSON.stringify(responseJson.errors[0].failed_login))
            this.setState({responseErrorMsg : responseJson.errors[0].failed_login, apiLoader: false})
          } else if (responseJson) {
            
            await setStorageData('authToken', responseJson?.meta?.token);
            await setStorageData('userID', JSON.stringify(responseJson.meta.id));
            await setStorageData('authTokenId', JSON.stringify(responseJson.meta.id));

            this.goToLoginSuccess()
          }
        }
      }
    }
    // Customizable Area End
  }

   // Customizable Area Start
  getRememberData = async() => {
    const userCredential = (await getStorageData('userCredential', true)) || '';
    console.log("userCredential===>", userCredential);
    if (userCredential.type === "email" && this.state.loginWith == "email") {
      this.setState({ email: userCredential?.username, password: userCredential?.password, isRemeberMe: true })
    } else if (userCredential.type === "mobile" && this.state.loginWith == "mobile") {
      this.setState({ mobileNo: userCredential?.username, password: userCredential?.password, isRemeberMe: true })
    }
  }

  sendLoginSuccessMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.mobileNo);

    msg.addData(
      getName(MessageEnum.LoginCountryCode),
      this.state.countryCodeSelected
    );

    msg.addData(getName(MessageEnum.LoginPassword), this.state.password);
    msg.addData(
      getName(MessageEnum.LoginIsRememberMe),
      this.state.checkedRememberMe
    );

    this.send(msg);
  }

  saveLoggedInUserData(responseJson: any) {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));

      msg.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify(responseJson)
      );
      msg.addData(
        getName(MessageEnum.SessionResponseToken),
        responseJson.meta.token
      );
      msg.addData(
        getName(MessageEnum.SessionResponseToken),
        responseJson.meta.id
      );

      this.send(msg);
      console.log("msg>>>>>>>>>>",msg);

    }
  }

  goToForgotPassword() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationForgotPasswordMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationForgotPasswordPageInfo), "sms");
    this.send(msg);
  }

  goToignup() {
    this.props.navigation.navigate("CountryCodeSelectorTable")
  }

  goToLoginSuccess() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationLoginSuccessMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.LoginSuccessDataMessage), { isScreenFrom: "Login" });
    this.send(msg);
  }

  toggleRememberMe = () => {
    this.setState({ isRemeberMe: !this.state.isRemeberMe })
  }

  rememberUser = async () => {
    let data = {
      username: this.state.email || this.state.mobileNo,
      password: this.state.password,
      type: this.state.loginWith
    }
    await setStorageData('userCredential', JSON.stringify(data));
    console.log("Remember me saved...");

  };
  toggleLoginWith = () => {
    this.setState({ loginWith: this.state.loginWith == "email" ? "mobile" : "email" , isRemeberMe : false,password:"",email:"",mobileNo:""})
    this.getRememberData();
  }
  forgetUser = async () => {
    await removeStorageData('userCredential')
  };

  handleFocusEmail = () => this.setState({ isFocusedEmail: true })

  handleBlurEmail = () => this.setState({ isFocusedEmail: false })

  handleFocusPassword = () => this.setState({ isFocusedPassword: true })

  handleBlurPassword = () => this.setState({ isFocusedPassword: false })

  handleFocusMobile = () => this.setState({ isFocusedMobile: true })

  handleBlurMobile = () => this.setState({ isFocusedMobile: false })

  _handleInputChange = (field: string, value: any) => {
    const { errors, loginWith } = this.state;

    if (loginWith === "email") {
      if (field === "email") errors[field] = "";
    } else {
      if (field === "mobileNo") errors[field] = "";
    }

    if (field === "password") errors[field] = "";

    //@ts-ignore
    this.setState({
      [field]: value,
      errors,
      responseErrorMsg:""
    });
  };
  checkValidation() {
    const { mobileNo, email, errors, loginWith } = this.state;
    let formIsValid = true;

    if (loginWith === "email") {
      if (!email || email) {
        errors.email = isEmail("Email", email);
        formIsValid = formIsValid ? !!errors.email.status : formIsValid;
      }
    } else {
      if (!mobileNo || mobileNo) {
        errors.mobileNo = phoneValidate("mobile number", mobileNo);
        formIsValid = formIsValid ? !!errors.mobileNo.status : formIsValid;
      }
    }
    return formIsValid;
  }
  _validateForm = () => {
    const { password, errors } = this.state;
    let formIsValid = true;

    this.checkValidation()
    if (!password || password) {
      errors.password = requireValidate("Password", password);
      formIsValid = formIsValid ? !!errors.password.status : formIsValid;
    }

    this.setState({ errors });

    return formIsValid;
  };

  signIn = async () => {
    const { email, password, mobileNo, loginWith } = this.state;
    this.setState({ apiLoader: true });

    if (!this._validateForm()) {
      this.setState({ apiLoader: false })
      return;
    }

    if (this.state.isRemeberMe === true) {
      this.rememberUser();
    } else {
      this.forgetUser();
    }

    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const emailAttrs = {
      "email": email,
      "password": password
    };

    const mobileAttrs = {
      "phone_number": mobileNo,
      "password": password
    };

    const data = {
      "type": loginWith == "email" ? "email_account" : "sms_account",
      attributes: loginWith == "email" ? emailAttrs : mobileAttrs
    };

    const httpBody = {
      data: data
    };

    this.apiCall({
      setApiCallId: 'signInApiCallId',
      header,
      method: configJSON.loginAPiMethod,
      endPoint: `bx_block_login/logins`,
      body: JSON.stringify(httpBody)
    });
  }

  apiCall = async (data: any) => {
    const { setApiCallId, header, endPoint, method, body } = data;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    if (setApiCallId === "signInApiCallId") {
      this.signInApiCallId = requestMessage.messageId;
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

  // Customizable Area End
}
