import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
import { CommonActions } from "@react-navigation/native";
import { RNToasty } from "react-native-toasty";
import { translate } from '../../../components/src/i18n/translate';
import { Clipboard } from 'react-native';
const baseURL = require("../../../framework/src/config.js").baseURL;

// Customizable Area End

export const configJSON = require("./config");
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  firstName: any;
  lastName: any;
  email: any;
  phoneNumber: any;
  currentCountryCode: any;
  data: any;
  passwordHelperText: String;
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  enableNewPasswordField: boolean;

  edtEmailEnabled: boolean;
  llDoChangePwdContainerVisible: boolean;
  llChangePwdDummyShowContainerVisible: boolean;

  currentPasswordText: any;
  newPasswordText: any;
  reTypePasswordText: any;
  owner: boolean
  edtMobileNoEnabled: boolean;
  countryCodeEnabled: boolean;
  postsLoading: boolean
  saveButtonDisable: boolean;
  modalVisible: boolean;
  accountId: any;
  onPress: boolean;
  userData: any;
  block: boolean;
  restrict: boolean;

  unblock: boolean;
  userName: any;
  followings: any[]
  UserProfileDetails: any;
  UserProfileCount: any;
  isFollowed: boolean;
  isRequested: boolean;
  full_name: any;
  bio: any;
  photo: any;
  posts: any[]
  bookMarkPosts: any[];
  loading: boolean,
  followButtonLoader: boolean,
  language: any;
  blockedUserModal: boolean
  restrictUserModal: boolean
  muteUserModal: boolean
  bookMarkLoading: boolean
  showTab: number
  likesPosts: any[]
  isRestricted: boolean
  likesLoading: boolean
  isMuted: boolean
  myID: string;
  page: number;
  total_page: number;
  pageValue: number;
  // Customizable Area End

}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class UserProfileBasicController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  arrayholder: any[];
  blockUserAPICallId: any;
  restrictUserCallId: any
  unrestrictUserCallId: any
  mutedUserCallId: any;
  unmutedUserCallId: any;
  useProfileDetailsAPICallId: any;
  followUserAPICallId: any;
  unfollowUserAPICallId: any;
  followUserApiId: any;
  requestUserApiId: any;
  cancelRequestApiId: any;
  unfollowUserApiId: any;
  labelFirstName: string = "";
  lastName: string = "";
  labelArea: string = "";
  labelMobile: string = "";
  labelEmail: string = "";
  labelCurrentPassword: string = "";
  labelNewPassword: string = "";
  labelRePassword: string = "";
  btnTextCancelPasswordChange: string = "";
  btnTextSaveChanges: string = "";
  labelHeader: any;
  btnTextChangePassword: string = "";
  passwordReg: RegExp;
  emailReg: RegExp;
  apiCallMessageUpdateProfileRequestId: any;
  validationApiCallId: string = "";
  apiChangePhoneValidation: any;
  registrationAndLoginType: string = "";
  authToken: any;
  uniqueSessionRequesterId: any;
  userProfileGetApiCallId: any;
  getCurrentUserProfileDetailsAPICall: any;
  getFollowFollowerCountAPICall: any;
  userAttr: any;
  getAccountPostsId: any;
  getBookMarksId: any;
  getLikesApiCallId: any
  getFollowingsId: string = ""
  getFollowStatus: string = ""
  shareProfileCallId: string = ""
  perPage: number = 100;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.CountryCodeMessage),
    ];

    this.state = {
      onPress: false,
      postsLoading: true,
      blockedUserModal: false,
      restrictUserModal: false,
      muteUserModal: false,
      loading: true,
      followButtonLoader: true,
      restrict: false,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      currentCountryCode: configJSON.hintCountryCode,
      data: [],
      full_name: '',
      passwordHelperText: "",
      enablePasswordField: true,
      enableReTypePasswordField: true,
      enableNewPasswordField: true,
      owner: false,
      edtEmailEnabled: true,
      llDoChangePwdContainerVisible: false,
      llChangePwdDummyShowContainerVisible: false,
      isFollowed: false,
      isRequested: false,
      likesPosts: [],
      likesLoading: false,
      isMuted: false,
      currentPasswordText: "",
      newPasswordText: "",
      reTypePasswordText: "",
      followings: [],
      edtMobileNoEnabled: true,
      countryCodeEnabled: true,
      saveButtonDisable: false,
      modalVisible: false,
      accountId: "",
      userData: "",
      block: false,
      unblock: false,
      userName: "",
      posts: [],
      UserProfileDetails: null,
      UserProfileCount: null,
      bio: '',
      isRestricted: false,
      photo: null,
      bookMarkPosts: [],
      bookMarkLoading: false,
      showTab: 0,
      myID: "",
      language: "",
      page: 0,
      total_page: 0,
      pageValue: 1,
    };

    this.arrayholder = [];
    this.passwordReg = /\\w+/
    this.emailReg = /\\w+/
    // Customizable Area End
    runEngine.attachBuildingBlock(this, this.subScribedMessages);
  }

  async receive(from: String, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.blockUserAPICallId) {
          this.blockUserSucessCallBack(responseJson);
        }
        if (apiRequestCallId === this.shareProfileCallId) {
          this.shareProfileSuccessCallback(responseJson);
        }
        if (apiRequestCallId === this.restrictUserCallId) {
          this.restrictUserSuccessCallback(responseJson);
        }
        if (apiRequestCallId === this.unrestrictUserCallId) {
        }

        if (apiRequestCallId === this.mutedUserCallId) {
          this.mutedUserSuccessCallback(responseJson);
        }
        if (apiRequestCallId === this.unmutedUserCallId) {
          this.unmuteUserSuccessCallback(responseJson);
        }
        if (apiRequestCallId === this.getAccountPostsId) {
          this.getAccountPostsSuccessCallback(responseJson);
        }
        if (apiRequestCallId === this.getFollowingsId) {
          this.getFollowingsSuccessCallback(responseJson);
        }
        if (apiRequestCallId === this.getFollowStatus) {
          this.getFollowStatusSuccessCallback(responseJson);
        }
        if (apiRequestCallId === this.useProfileDetailsAPICallId) {
          this.useProfileDetailsSucessCallBack(responseJson);
        }
        if (apiRequestCallId === this.getCurrentUserProfileDetailsAPICall) {
          this.useProfileDetailsSucessCallBack(responseJson);
          this.setState({ UserProfileDetails: responseJson?.data, photo: responseJson?.data?.attributes?.photo, loading: false })
          this.getCurrentUserFollowFollowers();
        }
        if (apiRequestCallId === this.followUserAPICallId) {
          this.followUserSuccessCallback(responseJson);
        }
        if (apiRequestCallId === this.unfollowUserAPICallId) {
          this.unfollowUserSuccessCallback(responseJson);
        }

        if (apiRequestCallId === this.getFollowFollowerCountAPICall) {
          this.setState({ UserProfileCount: responseJson })
        }
        if (apiRequestCallId === this.followUserApiId) {
          this.setState({ isFollowed: true, isRequested: false, followButtonLoader: false })
          this.getCurrentUserFollowFollowers()
        }
        if (apiRequestCallId === this.requestUserApiId) {
          this.setState({ isFollowed: false, isRequested: true, followButtonLoader: false })
        }
        if (apiRequestCallId === this.cancelRequestApiId) {
          this.setState({ isFollowed: false, isRequested: false, followButtonLoader: false })
          this.useProfileDetails()
          this.getCurrentUserFollowFollowers()
        }
        if (apiRequestCallId === this.unfollowUserApiId) {
          this.setState({ isFollowed: false, isRequested: false, followButtonLoader: false })
          this.useProfileDetails()
          this.getCurrentUserFollowFollowers()
        }
        if (apiRequestCallId === this.getBookMarksId) {
          this.getBookmarkSuccessCallback(responseJson)
        }
        if (apiRequestCallId === this.getLikesApiCallId) {
          this.getLikesSuccessCallback(responseJson)
        }
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.blockUserAPICallId)
          this.blockUserFailureCallBack(responseJson);
        if (apiRequestCallId === this.getAccountPostsId)
          this.getAccountPostsFailureCallback(responseJson);
        if (apiRequestCallId === this.followUserAPICallId) {
          this.followUserFailureCallback(responseJson);
        }
        if (apiRequestCallId === this.shareProfileCallId) {
          this.shareProfileFailureCallback(responseJson);
        }
        if (apiRequestCallId === this.unfollowUserAPICallId)
          this.unfollowUserFailureCallback(responseJson);
        if (apiRequestCallId === this.useProfileDetailsAPICallId)
          this.useProfileDetailsFailureCallBack(responseJson);
        if (apiRequestCallId === this.getCurrentUserProfileDetailsAPICall)
          this.setState({ loading: false })
        if (apiRequestCallId === this.getFollowFollowerCountAPICall) {
          this.setState({ loading: false })
        }
        if (apiRequestCallId === this.getBookMarksId) {
          this.getBookmarkFailureCallback(responseJson)
        }
        if (apiRequestCallId === this.cancelRequestApiId) {
          const message = responseJson.errors[0].message
          RNToasty.Show({ title: message })
          this.setState({ isFollowed: false, isRequested: false, loading: false })
        }
        if (apiRequestCallId === this.requestUserApiId) {
          const message = responseJson.errors[0].message
          RNToasty.Show({ title: message })
          this.setState({ isFollowed: false, isRequested: false, loading: false })
        }
        if (apiRequestCallId === this.getLikesApiCallId) {
          this.getLikesFailureCallback(responseJson)
        }
      }
    }
    // Customizable Area End
  }

  validateMobileAndThenUpdateUserProfile() {
    let countryCode: any = this.state.currentCountryCode;
    let mobileNo: any = this.state.phoneNumber;

    let error: any = "";

    error = this.validateCountryCodeAndPhoneNumber(countryCode, mobileNo);

    if (error) {
      this.showAlert(configJSON.errorTitle, error);

      return;
    }

    if (this.userAttr) {
      const countryCodeOld = this.userAttr.country_code;
      const mobileNoOld = this.userAttr.phone_number;

      if (
        Number.parseInt(countryCode) === Number.parseInt(countryCodeOld) ||
        countryCode === configJSON.hintCountryCode
      ) {
        countryCode = null;
      }

      if (
        Number.parseInt(this.state.phoneNumber) === Number.parseInt(mobileNoOld)
      ) {
        mobileNo = null;
      }
    }

    if (mobileNo && countryCode) {
      this.validateMobileOnServer(
        this.state.currentCountryCode,
        this.state.phoneNumber
      );
    } else {
      this.validateAndUpdateProfile();
    }
  }

  validateEmail(email: string) {
    let error = null;

    if (!this.isValidEmail(email)) {
      error = configJSON.errorEmailNotValid;
    }

    return error;
  }

  validateLastName(lastName: String) {
    return !this.isNonNullAndEmpty(lastName)
      ? "Last name " + configJSON.errorBlankField
      : null;
  }

  validateFirstName(firstName: String) {
    return !this.isNonNullAndEmpty(firstName)
      ? "First name " + configJSON.errorBlankField
      : null;
  }

  validateCountryCodeAndPhoneNumber(countryCode: string, phoneNumber: string) {
    let error = null;

    if (this.isNonNullAndEmpty(phoneNumber)) {
      if (
        !this.isNonNullAndEmpty(String(countryCode)) ||
        configJSON.hintCountryCode === countryCode
      ) {
        error = configJSON.errorCountryCodeNotSelected;
      }
    } else if (
      this.isNonNullAndEmpty(countryCode) &&
      configJSON.hintCountryCode !== countryCode
    ) {
      if (!this.isNonNullAndEmpty(phoneNumber)) {
        error = "Phone " + configJSON.errorBlankField;
      }
    }

    return error;
  }

  validateAndUpdateProfile() {
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let countryCode: any = this.state.currentCountryCode;

    let mobileNo = this.state.phoneNumber;
    let email = this.state.email;

    let currentPwd = this.state.currentPasswordText;
    let newPwd = this.state.newPasswordText;
    let reTypePwd = this.state.reTypePasswordText;

    const errorFirstName = this.validateFirstName(firstName);
    const errorLastName = this.validateLastName(lastName);

    const errorMobileNo = this.validateCountryCodeAndPhoneNumber(
      countryCode,
      mobileNo
    );
    const errorEmail = this.validateEmail(email);

    const errorCurrentPwd = this.validateCurrentPwd(currentPwd);
    const errorNewPwd = this.validatePassword(newPwd);
    const errorRetypePwd = this.validateRePassword(reTypePwd);

    let isValidForSignUp: boolean = true;

    if (errorFirstName != null) {
      this.showAlert(configJSON.errorTitle, errorFirstName);
      return false;
    } else if (errorLastName != null) {
      this.showAlert(configJSON.errorTitle, errorLastName);
      return false;
    }

    if (configJSON.ACCOUNT_TYPE_EMAIL === this.registrationAndLoginType) {
      if (errorMobileNo !== null) {
        this.showAlert(configJSON.errorTitle, errorMobileNo);
        return false;
      }
    } else if (
      configJSON.ACCOUNT_TYPE_SOCIAL === this.registrationAndLoginType
    ) {
      if (errorMobileNo != null) {
        this.showAlert(configJSON.errorTitle, errorMobileNo);
        return false;
      }
    } else if (
      configJSON.ACCOUNT_TYPE_PHONE === this.registrationAndLoginType
    ) {
      if (errorEmail != null) {
        this.showAlert(configJSON.errorTitle, errorEmail);

        return false;
      }
    } else {
      if (errorMobileNo != null) {
        this.showAlert(configJSON.errorTitle, errorMobileNo);

        return false;
      } else if (errorEmail != null) {
        this.showAlert(configJSON.errorTitle, errorEmail);

        return false;
      }
    }

    if (
      configJSON.ACCOUNT_TYPE_SOCIAL !== this.registrationAndLoginType &&
      this.state.llDoChangePwdContainerVisible
    ) {
      if (errorCurrentPwd != null) {
        this.showAlert(configJSON.errorTitle, errorCurrentPwd);
        return false;
      } else if (errorNewPwd != null) {
        this.showAlert(configJSON.errorTitle, errorNewPwd);
        return false;
      } else if (errorRetypePwd != null) {
        this.showAlert(configJSON.errorTitle, errorRetypePwd);
        return false;
      } else if (newPwd !== reTypePwd) {
        this.showAlert(
          configJSON.errorTitle,
          configJSON.errorBothPasswordsNotSame
        );
        return false;
      } else if (currentPwd === newPwd) {
        this.showAlert(
          configJSON.errorTitle,
          configJSON.errorCurrentNewPasswordMatch
        );
        return false;
      }
    }

    //Call update API
    if (this.userAttr) {
      let firstNameOld = this.userAttr.first_name;
      let lastNameOld = this.userAttr.last_name;
      let countryCodeOld = this.userAttr.country_code + "";
      let mobileNoOld = this.userAttr.phone_number + "";
      let emailOld = this.userAttr.email;
      this.registrationAndLoginType = this.userAttr.type;

      if (this.isNonNullAndEmpty(firstName) && firstName === firstNameOld) {
        firstName = null;
      }

      if (this.isNonNullAndEmpty(lastName) && lastName === lastNameOld) {
        lastName = null;
      }

      if (
        this.isNonNullAndEmpty(countryCode) &&
        countryCode === countryCodeOld
      ) {
        countryCode = null;
      }

      if (this.isNonNullAndEmpty(mobileNo) && mobileNo === mobileNoOld) {
        mobileNo = null;
      }

      if (countryCode != null || mobileNo != null) {
        if (countryCode == null) {
          countryCode = countryCodeOld;
        }

        if (mobileNo == null) {
          mobileNo = mobileNoOld;
        }
      }

      if (this.isNonNullAndEmpty(email) && email === emailOld) {
        email = null;
      }
    }

    if (
      this.isNonNullAndEmpty(firstName) ||
      this.isNonNullAndEmpty(lastName) ||
      this.isNonNullAndEmpty(countryCode) ||
      this.isNonNullAndEmpty(mobileNo) ||
      this.isNonNullAndEmpty(email) ||
      (this.isNonNullAndEmpty(currentPwd) && this.isNonNullAndEmpty(newPwd))
    ) {
      const header = {
        "Content-Type": configJSON.contentTypeApiUpdateUser,
        token: this.authToken
      };

      let data: any = {
        first_name: this.state.firstName,
        last_name: this.state.lastName
      };

      if (this.state.edtMobileNoEnabled) {
        if (
          configJSON.hintCountryCode !== countryCode &&
          this.isNonNullAndEmpty(String(countryCode)) &&
          this.isNonNullAndEmpty(String(mobileNo))
        ) {
          data = {
            ...data,
            ...{ new_phone_number: String(countryCode) + String(mobileNo) }
          };
        }
      }

      if (this.isNonNullAndEmpty(email)) {
        data = { ...data, ...{ new_email: email } };
      }

      if (
        this.isNonNullAndEmpty(currentPwd) &&
        this.isNonNullAndEmpty(newPwd)
      ) {
        data = {
          ...data,
          ...{ current_password: currentPwd, new_password: newPwd }
        };
      }

      const httpBody = {
        data: data
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.apiCallMessageUpdateProfileRequestId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.apiEndPointUpdateUser
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.apiUpdateUserType
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  }

  validateCurrentPwd(currentPwd: any) {
    if (!this.isNonNullAndEmpty(currentPwd)) {
      return configJSON.errorCurrentPasswordNotValid;
    } else {
      return null;
    }
  }

  validatePassword(newPwd: any) {
    if (!this.passwordReg.test(newPwd)) {
      return configJSON.errorNewPasswordNotValid;
    } else {
      return null;
    }
  }

  validateRePassword(reTypePwd: any) {
    if (!this.passwordReg.test(reTypePwd)) {
      return configJSON.errorReTypePasswordNotValid;
    } else {
      return null;
    }
  }

  isNonNullAndEmpty(value: String) {
    return (
      value !== undefined &&
      value !== null &&
      value !== "null" &&
      value.trim().length > 0
    );
  }

  validateMobileOnServer(countryCode: any, mobileNo: any) {
    const header = {
      "Content-Type": configJSON.contenttypeApiValidateMobileNo,
      token: this.authToken
    };

    const data = {
      new_phone_number: countryCode + mobileNo
    };

    const httpBody = {
      data: data
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiChangePhoneValidation = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiValidateMobileNo
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.callTypeApiValidateMobileNo
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  enableDisableEditPassword(isEditable: boolean) {
    if (configJSON.ACCOUNT_TYPE_SOCIAL === this.registrationAndLoginType) {
      this.setState({
        edtEmailEnabled: false,
        llDoChangePwdContainerVisible: false,
        llChangePwdDummyShowContainerVisible: false
      });
    } else {
      if (isEditable) {
        this.setState({
          llDoChangePwdContainerVisible: true,
          llChangePwdDummyShowContainerVisible: false
        });
      } else {
        this.setState({
          llDoChangePwdContainerVisible: false,
          llChangePwdDummyShowContainerVisible: true,
          currentPasswordText: "",
          newPasswordText: "",
          reTypePasswordText: ""
        });
      }
    }
  }

  goToPrivacyPolicy() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationPrivacyPolicyMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  goToTermsAndCondition() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationTermAndConditionMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  isValidEmail(email: string) {
    return this.emailReg.test(email);
  }

  requestSessionData() {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.uniqueSessionRequesterId = msg.messageId;
    this.send(msg);
  }

  getUserProfile() {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userProfileGetApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetUserProfile
    );

    const header = {
      "Content-Type": configJSON.contentTypeApiGetUserProfile,
      token: this.authToken
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApiGetUserProfile
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getValidations() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetValidations
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();

    const userID = (await getStorageData('userID', false)) || '';
    this.setState({ myID: parseInt(userID).toString() })
  }

  onEndReachedBookmark = () => {
    this.getBookMarkPosts(this.state.page + 1)
  }

  shareProfile = async () => {
    setTimeout(async () => {

      const userID = (await getStorageData('userID', false)) || '';
      let dataofUserID = this.props.route.params?.data?.attributes?.account_id
      const idToBeUsed = !dataofUserID ? userID : parseInt(userID) === parseInt(dataofUserID) ? parseInt(userID) : parseInt(dataofUserID)
      const appBaseUrl = baseURL.endsWith('/') ? baseURL : baseURL + "/";
      const link = `${appBaseUrl}admin/?profile?id=${idToBeUsed}`;
      console.log("Link = ", link)

      this.copyUrl(link)
    }, 300);
  }

  copyUrl = async (data: any) => {
    const url = data;
    this.setState({ modalVisible: false })
    await Clipboard.setString(url);
    RNToasty.Show({ title: "URL copied successfully" })
  };



  shareProfileSuccessCallback = async (response: any) => {
    this.setState({ modalVisible: false })
    Clipboard.setString(response?.data);
    RNToasty.Show({ title: "URL copied successfully" })
  }



  getAccountPostsSuccessCallback = (res: any) => {
    if (res?.data[0] !== 'No Posts Available') {
      this.setState({
        posts: res?.data,
        postsLoading: false
      })
    } else {
      this.setState({
        postsLoading: false
      })
    }
  }
  getAccountPostsFailureCallback = (res: any) => {
    this.setState({
      posts: [],
      postsLoading: false
    })
  }

  getBookmarkSuccessCallback = (res: any) => {
    let newData = res && res.data ? res.data : [];
    this.setState({
      bookMarkLoading: false
    })
    if (res.meta.pagination.current_page - 1 === this.state.page && res.meta.pagination.current_page <= res.meta.pagination.total_pages) {
      this.setState({ bookMarkPosts: [...this.state.bookMarkPosts, ...newData], page: this.state.page + 1 })
    }
  }
  getLikesSuccessCallback = (res: any) => {
    this.setState({
      likesPosts: res?.data ? res?.data : [],
      likesLoading: false
    })
  }
  getLikesFailureCallback = (res: any) => {
    this.setState({
      likesPosts: [],
      likesLoading: false
    })
  }
  getBookmarkFailureCallback = (res: any) => {
    this.setState({
      bookMarkPosts: [],
      bookMarkLoading: false
    })
  }

  getFollowingsSuccessCallback = async (res: any) => {
    const userID = await getStorageData('userID', false) || ''
    this.setState({
      followings: res.followers.map((item: any) => {
        return {
          ...item,
          ...item.account_details,
        }
      }),
      followButtonLoader: false,
      isFollowed: Boolean(res.followers.find((item: any) => item?.current_user_id.toString() === userID.toString())),
    })
  }
  getFollowStatusSuccessCallback = async (res: any) => {
    if (res.follow_status === 'Requested') {
      this.setState({ isRequested: true, isFollowed: false })
    }
  }
  closeBlockedUserModal = () => {
    this.setState({ blockedUserModal: false }, () => {
      this.clearAfterBlock()
    })
  }
  closeRistrictUser = () => {
    this.setState({ restrictUserModal: false })
  }
  closeMuteUser = () => {
    this.setState({ muteUserModal: false })
  }
  apiCall = async (data: any) => {
    const authToken = await getStorageData('authToken')
    const { contentType, method, endPoint, body, type } = data;
    // https://liketiktokapp-255799-ruby.b255799.dev.eastus.az.svc.builder.cafe/account_block/user?id=268
    //https://liketiktokapp-255799-ruby.b255799.dev.eastus.az.svc.builder.cafe/account_block/user?id=268
    const header = {
      "Content-Type": contentType,
      token: authToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
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
    body && type != 'formData' ?
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      )
      :
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return requestMessage.messageId;
  };

  blockUserApi = async () => {
    console.log("Block User Account = " + this.state.accountId)
    this.blockUserAPICallId = await this.apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: "/bx_block_block_users/block_users",
      body: { id: this.state.accountId },
    });
  };
  restrictAccount = async () => {
    this.restrictUserCallId = await this.apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: "/bx_block_settings/restricated_user",
      body: { id: this.state.accountId },
    });
  }
  unrestrict = async () => {
    this.unrestrictUserCallId = await this.apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: "/bx_block_settings/restricated_user",
      body: { id: this.state.accountId },
    });
  }
  muteAccount = async () => {
    this.mutedUserCallId = await this.apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: `/bx_block_block_users/mute_users?id=${this.state.accountId}`,
    });
  }
  unmuteAccount = async () => {
    this.unmutedUserCallId = await this.apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: `/bx_block_block_users/mute_users?id=${this.state.accountId}`,
    });
  }
  useProfileDetails = async () => {
    this.useProfileDetailsAPICallId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/account_block/user?id=${this.props.route.params?.data?.attributes?.account_id}`,
      body: '',
    });
    // }else{
    //   const userID = (await getStorageData('userID', false)) || '';
    //   this.useProfileDetailsAPICallId = await this.apiCall({
    //     contentType: "application/json",
    //     method: "GET",
    //     endPoint: `/account_block/user?id=${userID}`,
    //     body: '',
    //   });
    //   }
  };
  cancelRequest = async () => {
    this.setState({
      followButtonLoader: true
    }, async () => {
      this.cancelRequestApiId = await this.apiCall({
        contentType: "application/json",
        method: "PATCH",
        endPoint: `${configJSON.cancelRequest}?id=${this.state.userData.attributes.account_id}`,
        body: {
          "id": this.state.userData.attributes.account_id
        },
      })
    })
  }
  followUser = async () => {
    this.setState({
      followButtonLoader: true
    })

    const isPrivateAc = this.state?.UserProfileDetails?.attributes?.is_private_account;
    if (isPrivateAc === true) {
      this.requestUserApiId = await this.apiCall({
        contentType: "application/json",
        method: "POST",
        endPoint: configJSON.requestsEndPoint,
        body: {
          "data": {
            "account_id": this.state.userData.attributes.account_id
          }
        },
      })
    } else {
      this.followUserApiId = await this.apiCall({
        contentType: "application/json",
        method: "POST",
        endPoint: configJSON.followersEndpoint,
        body: {
          "data": {
            "type": "follows",
            "attributes": {
              "account_id": this.state.userData.attributes.account_id
            }
          }
        },
      })
    }
  }
  unfollowUser = async () => {
    this.setState({
      followButtonLoader: true
    })
    this.unfollowUserApiId = await this.apiCall({
      contentType: configJSON.contentTypeApiUpdateUser,
      method: 'DELETE',
      endPoint: `${configJSON.followersEndpoint}/${this.state.userData.attributes.account_id}}`,
    })
  }

  followUserSuccessCallback = (res: any) => {
    this.setState({ isFollowed: true })
    this.getCurrentUserFollowFollowers()
  }
  followUserFailureCallback = (res: any) => {

  }
  unfollowUserSuccessCallback = (res: any) => {
    this.setState({ isFollowed: false })
    this.getCurrentUserFollowFollowers()
  }
  unfollowUserFailureCallback = (res: any) => {
  }
  shareProfileFailureCallback = (res: any) => {
    this.setState({ modalVisible: false })
    RNToasty.Show({ title: "Something went wrong" })
  }
  blockUserSucessCallBack = (res: any) => {
    if (res?.meta?.message == "User blocked.") {
      this.setState({ block: true, modalVisible: false, blockedUserModal: true })
    } else {
      this.setState({ block: false, modalVisible: false, blockedUserModal: false })
    }
  };
  restrictUserSuccessCallback = (res: any) => {
    if (res?.message === "User unrestricated.") {
      this.setState({ restrict: false, modalVisible: false, restrictUserModal: true })
      if (this.state.accountId) {
        this.useProfileDetails()
      } else {
        this.getCurrentUserProfileDetails();
      }
    } else {
      this.setState({ restrict: true, modalVisible: false, restrictUserModal: true })
      if (this.state.accountId) {
        this.useProfileDetails()
      } else {
        this.getCurrentUserProfileDetails();
      }
    }
  }

  unmuteUserSuccessCallback = (res: any) => {
    this.setState({ modalVisible: false, isMuted: false }, () => {
      this.setState({
        muteUserModal: true
      })
      if (this.state.accountId) {
        this.useProfileDetails()
      } else {
        this.getCurrentUserProfileDetails();
      }
    })
  }
  mutedUserSuccessCallback = (res: any) => {
    this.setState({ modalVisible: false, isMuted: true }, () => {
      this.setState({
        muteUserModal: true
      })
      if (this.state.accountId) {
        this.useProfileDetails()
      } else {
        this.getCurrentUserProfileDetails();
      }
    })
  }
  clearAfterBlock = () => {
    this.props.navigation.dispatch(
      CommonActions.setParams({
        data: null
      })
    )
    this.props.navigation.navigate('Comments', {
      type: null,
    })
  }


  blockUserFailureCallBack = (res: any) => {

  };
  useProfileDetailsSucessCallBack = async (res: any) => {
    // UserProfileDetails?.attributes?.bio

    if (res?.data?.attributes?.is_private_account) {
    }

    this.setState({
      loading: false,
      userName: res?.data?.attributes.user_name,
      isRestricted: res?.data?.attributes.is_restricated,
      restrict: res?.data?.attributes.is_restricated,
      isMuted: res?.data?.attributes.is_muted,
      full_name: res?.data?.attributes.full_name,
      photo: res?.data?.attributes.photo,
      bio: res?.data?.attributes.bio,
      UserProfileDetails: {
        ...res?.data
      },
      ...res
    }, async () => {
      await this.fetchFollowings()
      if (res?.data?.attributes?.is_private_account) {
        await this.fetchRequested()
      }
    })


  };

  useProfileDetailsFailureCallBack = (res: any) => {
    this.setState({
      loading: false
    })
  };

  getCurrentUserProfileDetails = async () => {
    this.getCurrentUserProfileDetailsAPICall = await this.apiCall({
      contentType: 'application/json',
      method: 'GET',
      endPoint: `/account_block/show_profile`,
      body: null
    });
  }

  getCurrentUserFollowFollowers = async () => {
    console.log('here,getCurrentUserFollowFollowers')
    if (this.props.route.params?.data?.attributes?.account_id) {
      this.getFollowFollowerCountAPICall = await this.apiCall({
        contentType: 'application/json',
        method: 'GET',
        endPoint: `/bx_block_followers/follows/${parseInt(this.props.route.params?.data?.attributes?.account_id)}/count`,
        body: null
      })
    } else {
      const userID = (await getStorageData('userID', false)) || '';
      this.getFollowFollowerCountAPICall = await this.apiCall({
        contentType: 'application/json',
        method: 'GET',
        endPoint: `/bx_block_followers/follows/${parseInt(userID)}/count`,
        body: null
      })
    }
  }

  getAccountPosts = async () => {
    this.setState({ postsLoading: true })
    if (this.state.accountId) {
      this.getAccountPostsId = await this.apiCall({
        contentType: configJSON.contentTypeApiUpdateUser,
        method: configJSON.validationApiMethodType,
        endPoint: `${configJSON.userPostsEndpoint}?account_id=${this.state.accountId}&per_page=9999999&page=1&sort=newest`,
      })
    } else {
      const userID = (await getStorageData('userID', false)) || '';
      this.getAccountPostsId = await this.apiCall({
        contentType: configJSON.contentTypeApiUpdateUser,
        method: configJSON.validationApiMethodType,
        endPoint: '/bx_block_posts/posts/user_posts?sort=newest',
        // endPoint:`${configJSON.userPostsEndpoint}?account_id=${userID}&per_page=99999999&page=1`,
      })
    }
  }

  getBookMarkPosts = async (page: number) => {
    this.setState({ bookMarkLoading: true })
    this.getBookMarksId = await this.apiCall({
      contentType: configJSON.contentTypeApiBookMark,
      method: configJSON.bookMarkApiType,
      endPoint: `${configJSON.userBookmarkEndpoint}?page=${page}&per_page=9`,
    })
  }

  onrefreshBookmarkPost = async () => {
    this.setState({
      bookMarkLoading: true,
      page: 0,
      bookMarkPosts: []
    }, () => this.getBookMarkPosts(1))
  }

  getLikesPosts = async () => {
    this.setState({ likesLoading: true })
    this.getLikesApiCallId = await this.apiCall({
      contentType: configJSON.contentTypeApiBookMark,
      method: configJSON.bookMarkApiType,
      endPoint: `/bx_block_settings/likes_activity?filter=newest`,
    })
  }


  followingsNavigate = async () => {
    const { navigation } = this.props;
    if (this.state.accountId) {
      navigation.navigate("Followings", { type: 'followings', userID: this.state.accountId, title: translate("Followings"), sub_title: translate("People_you_follow") });
    } else {
      const userID = (await getStorageData('userID', false)) || '';
      navigation.navigate("Followings", { type: 'followings', userID: userID, title: translate("Followings"), sub_title: translate("People_you_follow") });
    }
  }
  followersNavigate = async () => {
    const { navigation } = this.props;
    if (this.state.accountId) {
      navigation.navigate("Followings", { type: 'followers', userID: this.state.accountId, title: translate("followers"), sub_title: translate("People_who_follow_you") });
    } else {
      const userID = (await getStorageData('userID', false)) || '';
      navigation.navigate("Followings", { type: 'followers', userID: userID, title: translate("followers"), sub_title: translate("People_who_follow_you") });
    }
  }
  fetchFollowings = async () => {
    if (this.props.route.params?.data?.attributes?.account_id) {
      this.getFollowingsId = await this.apiCall({
        method: configJSON.validationApiMethodType,
        contentType: configJSON.validationApiContentType,
        endPoint: `${configJSON.followersEndpoint}/${this.props.route.params.data.attributes.account_id}/followers?page=${this.state.pageValue}&per_page=${this.perPage}`,
      });
    }
    else {
      const userID = (await getStorageData('userID', false)) || '';
      if (userID) {
        this.getFollowingsId = await this.apiCall({
          method: configJSON.validationApiMethodType,
          contentType: configJSON.validationApiContentType,
          endPoint: `${configJSON.followersEndpoint}/${userID}/followers`,
        });
      }
    }
  }

  fetchRequested = async () => {
    if (this.props.route.params?.data?.attributes?.account_id) {
      this.getFollowStatus = await this.apiCall({
        method: configJSON.validationApiMethodType,
        contentType: configJSON.validationApiContentType,
        endPoint: `${configJSON.followersEndpoint}/${this.props.route.params?.data?.attributes?.account_id}/count`,
      });
    }
    else {
      const userID = (await getStorageData('userID', false)) || '';
      this.getFollowStatus = await this.apiCall({
        method: configJSON.validationApiMethodType,
        contentType: configJSON.validationApiContentType,
        endPoint: `${configJSON.followersEndpoint}/${parseInt(userID)}/count`,
      });
    }
  }

  async fetchUserProfile(id: any) {
    if (this.props.route.params?.account_id) {
      this.useProfileDetailsAPICallId = await this.apiCall({
        contentType: "application/json",
        method: "GET",
        endPoint: `/account_block/user?id=${id}`,
        body: '',
      });
    }
  }
  // Customizable Area End

}
