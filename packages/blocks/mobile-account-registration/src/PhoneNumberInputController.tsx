import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
export const configJSON = require("./config");
import { Platform } from "react-native";
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";
import { isEmail, passwordValidate, phoneValidate, requireValidate, isFullname, isUserName } from "../../../components/src/Utilities";

import ImagePicker from "react-native-image-crop-picker";
import moment from "moment";
const maxImageSizeInBytes = 5242880;

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export interface S {
  // Customizable Area Start
  dataSource: any[];
  countryCodeSelected: any;
  mobileNo: string;
  token: string;
  fullName: string;
  userName: string;
  password: string;
  email: string;
  dob: string;
  errors: any;
  profileImageChanged: boolean;
  profileImageUrl: any;
  profile_frame: any;
  buttonLoading:boolean;
  imgType: any;
  profileFile: any;
  countryList: any;
  openCountryList: boolean;
  selectedCountryCode: any;
  value: string;
  openVerificationModal: boolean;
  selectedAccount: any;
  apiCallLoader: boolean;
  dobObj: any;
  maxDate: any;
  showDatePicker: boolean;
  openErrorModal: boolean;
  errorMsg: any;
  errorMsgMob: any;
  existErrorMsg: any;
  userNameErrorMsg: any;
  signupToken: any;
  searchCountryData: any;
  hidePassword: boolean;
  language:any;
  alertModal:any;
  agreeTermsCondition: boolean,
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class PhoneNumberInputController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  phoneAuthApiCallId: any;
  placeHolderMobile: string;
  placeHolderSelectCountry: string;
  btnTxtSendOtp: string;
  labelInfo: string;
  bodyText: string;
  // arrayholder: any[];
  signUpApiCallId: any;
  postSMSOtpApiCallId: any;
  postEmailOtpApiCallId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)

    ]);
    this.state = {
      dataSource: [],
      countryCodeSelected: "",
      mobileNo: "",
      token: "",
      fullName: "",
      userName: "",
      dob: "",
      password: "",
      email: "",
      errors: {},
      profileImageChanged: false,
      profileImageUrl: '',
      profile_frame: '',
      imgType: "",
      profileFile: "",
      countryList: null,
      openCountryList: false,
      selectedCountryCode: "",
      value: "",
      openVerificationModal: false,
      selectedAccount: 'SMS',
      apiCallLoader: false,
      dobObj: new Date(),
      maxDate: new Date(),
      buttonLoading:false,
      showDatePicker: false,
      openErrorModal: false,
      errorMsg: null,
      errorMsgMob: null,
      existErrorMsg: null,
      userNameErrorMsg: null,
      signupToken: '',
      searchCountryData: [],
      hidePassword: true,
      language:"",
      alertModal:{
        openAlertModal: false,
        alertMsg: "",
        },
      agreeTermsCondition : false,
   };

    this.placeHolderMobile = configJSON.placeHolderMobile;
    this.placeHolderSelectCountry = configJSON.placeHolderSelectCountry;
    this.btnTxtSendOtp = configJSON.btnTxtSendOtp;
    this.labelInfo = configJSON.labelInfo;
    this.bodyText = configJSON.bodyText;
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) { 
      const PhoneNumberInputDataMessage = message.getData(getName(MessageEnum.PhoneNumberInputDataMessage));
      if (PhoneNumberInputDataMessage) {
        const { countryCode, countryList,name,email } = PhoneNumberInputDataMessage;
        this.setState({ countryCodeSelected: countryCode, countryList: countryList,fullName:name,email: email })
      }
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      console.log(errorReponse);

      if (apiRequestCallId != null) {
        if (apiRequestCallId === this.signUpApiCallId) {
          this.setState({ apiCallLoader: false })
          if (responseJson) {
          await setStorageData('userID',responseJson?.data?.id);
          console.log(" signUpApiCallId response==>", responseJson);

            //Check Error Response
            //  this.parseApiCatchErrorResponse(responseJson.message)
            if (responseJson.phone_message) {
              this.setState({ errorMsgMob: responseJson.phone_message })
            } else if (responseJson.email_message) {
              this.setState({ errorMsg: responseJson.email_message })
            } else if (responseJson.message) {
              this.setState({ existErrorMsg: responseJson.message })
            } else if (responseJson.username_message) {
              this.setState({ userNameErrorMsg: responseJson.username_message })
            } else if (responseJson?.meta && responseJson.meta?.token) {
              this.setState({ signupToken: responseJson.meta.token , buttonLoading:false})
              await setStorageData('authToken', responseJson.meta.token);
              if (responseJson?.data) {
                await setStorageData('profileData', JSON.stringify(responseJson.data))
              }
              this.setState({ openVerificationModal: true })
            }
          }
        }

        if (apiRequestCallId === this.postSMSOtpApiCallId) {
          console.log(" postSMSOtpApiCallId response==>", responseJson);
          this.setState({
            buttonLoading:false,
            apiCallLoader: false
          })
          await setStorageData('userID',responseJson?.data?.id);
          if (responseJson && (responseJson.errors || responseJson.error)) {
            //Check Error Response
            this.handleErrorResponse(responseJson);
          } else if (responseJson && responseJson.meta && responseJson.meta.token) {
            this.setState({ openVerificationModal: false, apiCallLoader: false })
            await setStorageData('smsOtpToken', responseJson?.meta?.token);
            this.goToOtp(this.maskNumber())
          }

        }

        if (apiRequestCallId === this.postEmailOtpApiCallId) {

          console.log(" postEmailOtpApiCallId response==>", responseJson);
          this.setState({
            buttonLoading:false,
            apiCallLoader: false
          })
          await setStorageData('userID',responseJson?.data?.id);

          this.setState({ apiCallLoader: false })
          if (responseJson && (responseJson.errors || responseJson.error)) {
            //Check Error Response
            this.handleErrorResponse(responseJson);
          } else if (responseJson && responseJson.meta && responseJson.meta.token) {
            this.setState({ openVerificationModal: false })
            await setStorageData('emailOtpToken', responseJson?.meta?.token);
            this.goToOtp(this.maskEmail())
          }
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language })
  }

  onCloseModal() {
    this.setState({ openVerificationModal: false }, () => {
      this.props.navigation.navigate("Login")
    })
  }
  maskNumber() {
    const full_phone_number = "+" + this.state.countryCodeSelected.item?.country_code + this.state.mobileNo;
    const number = String(full_phone_number)
    let length = number.length - 6
    const middle = '*'.repeat(length)
    return number[0] + number[1] + number[2] + number[3] + number[4] + middle + number[number.length - 2] + number[number.length - 1]
  }
  maskEmail() {
    let split = this.state.email.split('@')
    return this.state.email.substring(0, 1) + new Array(split[0].length - 1).fill('*').join('') + "@" + split[1]
  }
  gotoSkip() {
    this.setState({ openVerificationModal: false })
    this.props.navigation.navigate("Followers")
  }

  getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
  }

  goImagePicker() {
    const { imgType } = this.state;
    let imageOptions: any = {
      width: 400,
      height: 400,
      cropping: true,
      multiple: false,
      mediaType: "photo",
      // includeBase64: true,
    };
    ImagePicker.openPicker(imageOptions).then((image: any) => {
      console.log("console -> openPicker", image);
      if (image.path) {
        const splitArray = image.path.split("/");
        const fileName = splitArray && splitArray.length ? splitArray[splitArray.length - 1] : imgType;
        const extentionArray = image.path.split(".");
        const nameOFFile = extentionArray.length ? `${fileName.substring(0, 6)}...${extentionArray[extentionArray.length - 1]}` : "unknownfilename";
        const shortFileName = fileName.length > 9 ? extentionArray && nameOFFile : fileName;
        console.log("console -> openPicker fileName", fileName);
        if (image.size > maxImageSizeInBytes) {

          this.setState({alertModal:{openAlertModal: true, alertMsg: "Max file size limit is 5 mb"}})
        } else {
          this.setState({ profileImageUrl: image.path, profileFile: { ...image, fileName, shortFileName }, profileImageChanged: true });
        }
      }
    });
  }

  setShowDatePicker = () => {
    this.setState({ showDatePicker: true });
  }

  handleDatePicked = (event: any, selectedDate: any) => {
    const { errors, dobObj, dob } = this.state;
    let dobDate = dob ? dobObj : '';
    let dateObj = selectedDate ? selectedDate : dobDate;
    let date = dateObj ? moment(dateObj).format('DD/MM/YYYY') : "";
    console.log('console->handleDatePicked', date);
    errors.dob = requireValidate("Date of birth", date);
    this.setState({ dobObj: dateObj || dobObj, dob: date, showDatePicker: Platform.OS === 'ios', errors });
  };
  searchFilterFunction = (text: string) => {
    this.setState({
      value: text
    });

    const newData = this.state.countryList.filter((item: any) => {
      const itemData = `${item.country_name.toUpperCase()} (${item.country_code}) +${item.country_ISO_code
        }`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      searchCountryData: newData
    });
  };
  _handleInputChange = (field: string, value: any) => {
    let errors = this.state.errors;

    if (field === "fullName") errors[field] = "";
    if (field === "userName") errors[field] = "";
    if (field === "dob") errors[field] = "";
    if (field === "email") errors[field] = "";
    if (field === "mobileNo") errors[field] = "";
    if (field === "password") errors[field] = "";

    //@ts-ignore
    this.setState({
      [field]: value,
      errors,
      errorMsg: "",
      errorMsgMob: "",
      userNameErrorMsg: "",
      buttonLoading:false
    });
  };

  validateEmailMobileNoPassword = (errorChecks : any, validForm : boolean) => {
    const { mobileNo, email, password,countryCodeSelected } = this.state;
    const full_phone_number = countryCodeSelected?.item?.country_code + mobileNo;
    const updatedErrors = {...errorChecks};
    let formIsValid = validForm;
    if (!email || email) {
      updatedErrors.email = isEmail("Email", email);
      formIsValid = formIsValid ? !!updatedErrors.email.status : formIsValid;
    }

    if (!mobileNo || mobileNo) {
      updatedErrors.mobileNo = phoneValidate("Mobile number", full_phone_number);
      formIsValid = formIsValid ? !!updatedErrors.mobileNo.status : formIsValid;
    }

    if (!password || password) {
      updatedErrors.password = passwordValidate("Password", password);
      formIsValid = formIsValid ? !!updatedErrors.password.status : formIsValid;
    }
    return {updatedErrors,formIsValid};
  }

  _validateForm = () => {
    const { errors, fullName, userName, dob, agreeTermsCondition } = this.state;
    let formIsValid = true;

    let updatedErrors = {...errors};

    if (!fullName || fullName) {
      updatedErrors.fullName = isFullname("Full name", fullName);
      formIsValid = formIsValid ? !!updatedErrors.fullName.status : formIsValid;
    }

    if (!userName || userName) {
      updatedErrors.userName = isUserName("Username", userName);
      formIsValid = formIsValid ? !!updatedErrors.userName.status : formIsValid;
    }

    const validationRes = this.validateEmailMobileNoPassword(updatedErrors, formIsValid);
    console.log(validationRes,"##@@")

    updatedErrors = validationRes.updatedErrors;

    formIsValid = validationRes.formIsValid && agreeTermsCondition;
    
    updatedErrors.termsCondition = !agreeTermsCondition;
    
    this.setState({ errors : updatedErrors });

    return formIsValid;
  };



  onFullnameChange = (text:any) => {
    this._handleInputChange('fullName', text);
    this.setState({fullName :  text.trimStart()})
  }

  onUserNameChange = (text:any) => {
    this._handleInputChange('userName', text)
    this.setState({userName : text.trim()})
  }

  signUp = async () => {

    const { email, password, mobileNo, fullName, userName, dob, profileFile, countryCodeSelected } = this.state;

    if (this._validateForm()) {


      this.setState({ apiCallLoader: true,buttonLoading:true });
      const apiEndPoint = `account_block/accounts`;

      const header = {
        "Content-Type": configJSON.formContentType,
      };
      const full_phone_number = countryCodeSelected?.item?.country_code + mobileNo
      let device_id = await getStorageData('fcmToken')
      console.log('deviceId--->',device_id)
      let formdata: any = new FormData();
      formdata.append("data[attributes][user_name]", userName);
      formdata.append("data[attributes][full_name]", fullName);
      formdata.append("data[attributes][email]", email);
      formdata.append("data[attributes][full_phone_number]", `+${full_phone_number}`)
      formdata.append("data[attributes][country_name]", countryCodeSelected?.item?.country_name);
      formdata.append("data[attributes][country_code]", countryCodeSelected?.item?.country_code);
      formdata.append("data[attributes][password]", password);
      formdata.append("data[attributes][date_of_birth]", dob);
      formdata.append("data[attributes][role_id]]", 3);
      formdata.append("data[attributes][device_id]]",device_id );
      formdata.append("data[type]", "sms_account");
      // profile image form data
      if (profileFile) {
        let imgFile: any = {
          uri: profileFile.path,
          type: profileFile.mime,
          name: `profile_${moment().format("YYYYMMDD_HHmmss")}.jpg`,
          // ...profileFile
        };
        formdata.append("data[attributes][photo]", imgFile);
      }

      console.log("console -> formdata", formdata);

      this.apiCall({
        setApiCallId: 'signUpApiCallId',
        header,
        method: configJSON.postMethod,
        endPoint: `${apiEndPoint}`,
        body: formdata
      });
    }
  }

  postSMSOtp = async () => {

    this.setState({
      buttonLoading:true
    })

    const { email, password, mobileNo, countryCodeSelected, signupToken } = this.state;
    console.log("Signuptoken postSMS===>", signupToken);

    this.setState({ apiCallLoader: true });

    const header = {
      "Content-Type": configJSON.formContentType,
      token: signupToken
    };

    const full_phone_number = countryCodeSelected?.item?.country_code + mobileNo
    console.log("full_phone_number===>", full_phone_number);

    let formdata: any = new FormData();
    formdata.append("data[attributes][full_phone_number]",full_phone_number);

    console.log("console ->otp  formdata ", formdata);

    this.apiCall({
      setApiCallId: 'postSMSOtpApiCallId',
      header,
      method: configJSON.postMethod,
      endPoint: `account_block/verify_phone`,
      body: formdata
    });
  }

  postEmailOTP = async () => {
    this.setState({
      buttonLoading:true
    })
    const { email, signupToken } = this.state;
    console.log("Signuptoken postemail===>", signupToken);
    this.setState({ apiCallLoader: true });

    const header = {
      "Content-Type": configJSON.formContentType,
      token: signupToken
    };

    let formdata:any = new FormData();
    formdata.append("data[attributes][email]", email);

    console.log("console -> email otp  formdata ", formdata);

    this.apiCall({
      setApiCallId: 'postEmailOtpApiCallId',
      header,
      method: configJSON.postMethod,
      endPoint: `account_block/verify_email`,
      body: formdata
    });
  }

  goToOtp(verifyBy: any) {
    const { selectedAccount } = this.state;
    const msg: Message = new Message(
      getName(MessageEnum.NavigationOTPInputAuthMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.OTPInputAuthDataMessage), { verifyWith: verifyBy, selectedAccount: selectedAccount, mobileNo: "+" + this.state.countryCodeSelected?.item?.country_code + this.state.mobileNo, email: this.state.email });

    this.send(msg);
  }

  apiCall = async (data: any) => {
    const { setApiCallId, header, endPoint, method, body } = data;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    if (setApiCallId === "signUpApiCallId") {
      this.signUpApiCallId = requestMessage.messageId;
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
    if (responseJson.errors && responseJson.errors.hasOwnProperty('token') && responseJson.errors.token) {
      return;
    }
    //Check Error Response
    parseError && console.log("parseError==>",parseError);
  }
  // Customizable Area End
}
