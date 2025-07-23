import { BlockComponent } from "../../../../framework/src/BlockComponent";
import { IBlock } from "../../../../framework/src/IBlock";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
// Customizable Area Start
import ImageCropPicker from "react-native-image-crop-picker";
import { getStorageData } from "../../../../framework/src/Utilities";
import {
  passwordValidate,
  logoutUser,
} from "../../../../components/src/Utilities";
import { CommonActions } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { translate } from "../../../../components/src/i18n/translate";
import { v4 as uuidv4 } from 'uuid';
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  route: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  showSensitiveContent: boolean;
  setTheme: boolean;
  bedTimeStartDateRaw: Date;
  bedTimeEndDateRaw: Date;
  upvoted: boolean;
  downvoted: boolean;
  commentLikeCount: number;
  isSaved: boolean;
  setActivityStatus: boolean;
  setDataSavingMode: boolean;
  setReduceVideoQuality: boolean;
  setReduceDownloadQuality: boolean;
  setRestrictedMobileData: boolean;
  setUploadOverWifiOnly: boolean;
  setBreakReminder: boolean;
  setBedTimeReminder: boolean;
  bedTimeStartModalOpen: boolean;
  bedTimeEndModalOpen: boolean;
  bedTimeStart: string;
  bedTimeEnd: string;
  commentModalVisible: boolean;
  breakFrequencyRawDate: Date;
  bedTimeStartRawDate: Date;
  bedTimeEndRawDate: Date;
  breakFrequencyInHours: string;
  breakFrequencyInMinutes: string;
  breakFrequencyModalOpen: boolean;
  setPrivateAccount: boolean;
  setChallengesInvites: boolean;
  previewImage: string;
  readyToShow: boolean;
  previewVideo: string;
  bucketDetails: any;
  token: string;
  userID: string;
  userDetails: any;
  personalInformation: any;
  media: any;
  isModalVisible: boolean;
  isConfirmationModalVisible: boolean;
  modalType: string;
  inputValueName: string;
  inputValueUsername: string;
  inputValueBio: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  hideOldPassword: boolean;
  hideNewPassword: boolean;
  hideConfirmPassword: boolean;
  averageTimeSpent: number;
  isLoading: boolean;
  isVideoPictureLoading: boolean;
  setAllowLeaderBoardVisible: boolean;
  // Push Notifications
  setAllPushNotifications: boolean;
  PushNotificationNewFollowers: boolean;
  PushNotificationComments: boolean;
  PushNotificationLike: boolean;
  PushNotificationMentionAndTags: boolean;
  PushNotificationProfileViews: boolean;
  PushNotificationReposts: boolean;
  PushNotificationDirectMessages: boolean;
  PushNotificationVideoFromAccount: boolean;
  PushNotificationVideoFromPeople: boolean;
  PushNotificationVideoYouMightLike: boolean;
  PushNotificationLiveFromAccount: boolean;
  PushNotificationLiveFromPeople: boolean;
  PushNotificationLiveYouMightLike: boolean;
  PushNotificationPersonalizedUpdates: boolean;
  setMentions: boolean;
  voteLoading: boolean;
  postsLoading: boolean;
  commentID: string;
  sortingOption: "Oldest" | "Newest";
  likeActivityPosts: any[];
  savedActivityPosts: any[];
  notInterestedPosts: any[];
  commentsActivity: any[];
  selectedCommentId: string;
  selectedCommentIndex: number;
  language: any;
  newPasswordErrorMsg: any;
  confirmPasswordErrorMsg: any;
  errors: any;
  QRCodeImage: string;
  userName: string;
  deleteAccountLoader : boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class SettingOptionsCommonController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getBucketDetailsCallId: any;
  updateProfileAPICallId: any;
  getCurrentProfileAPICallId: any;
  getUserDetailsCallId: any;
  changePasswordAPICallId: any;
  deleteUserAPICallId: any;
  getAccountSettingsCallId: string = "";
  updateAccountSettingsCallId: string = "";
  updateDataSaverCallId: string = "";
  getDataSavingCallId: string = "";
  getSavedDataCallId: string = "";
  getBreakReminderCallId: string = "";
  getBedTimeReminderCallId: string = "";
  updateBreakReminderSettingsCallId: string = "";
  updateBedTimeReminderCallId: string = "";
  createBedTimeReminderCallId: string = "";
  getNotInterestedPostsCallId: string = "";
  getLikesPostsCallId: string = "";
  getSavedPostsCallId: string = "";
  getAverageTimeSpentId: string = "";
  getCommentsActivityCallId: string = "";
  getNotificationsSettingsCallId: string = "";
  likeCommentpostAPICallId: string = "";
  dislikeCommentpostAPICallId: string = "";
  updateNotificationsSettingsCallId: string = "";
  getUserGeneralNotificationSettingsCallId: string = "";
  updateUserGeneralNotificationSettingsCallId: string = "";
  updateDeviceIdCallId: string = "";
  getQRCodeCallId: string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.CountryCodeMessage),
    ];
    this.state = {
      commentID: "",
      selectedCommentId: "",
      selectedCommentIndex: 0,
      showSensitiveContent: false,
      setTheme: false,
      setActivityStatus: false,
      setDataSavingMode: false,
      isSaved: true,
      voteLoading: false,
      commentModalVisible: false,
      bedTimeStartDateRaw: new Date(),
      bedTimeEndDateRaw: new Date(),
      setReduceVideoQuality: false,
      setReduceDownloadQuality: false,
      setRestrictedMobileData: false,
      setUploadOverWifiOnly: false,
      setBreakReminder: false,
      setBedTimeReminder: false,
      bedTimeStartModalOpen: false,
      bedTimeEndModalOpen: false,
      bedTimeStart: "",
      upvoted: false,
      downvoted: false,
      commentLikeCount: 0,
      bedTimeEnd: "",
      breakFrequencyRawDate: new Date(),
      bedTimeStartRawDate: new Date(),
      bedTimeEndRawDate: new Date(),
      breakFrequencyInHours: "",
      breakFrequencyInMinutes: "",
      breakFrequencyModalOpen: false,
      setPrivateAccount: false,
      setChallengesInvites: false,
      readyToShow: false,
      previewImage: "",
      previewVideo: "",
      token: "",
      userID: "",
      userDetails: null,
      personalInformation: null,
      averageTimeSpent: 0,
      bucketDetails: null,
      media: null,
      isModalVisible: false,
      isConfirmationModalVisible: false,
      modalType: "",
      inputValueName: "",
      inputValueUsername: "",
      setMentions: false,
      inputValueBio: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      hideOldPassword: true,
      hideNewPassword: true,
      hideConfirmPassword: true,
      isLoading: false,
      isVideoPictureLoading: false,
      setAllPushNotifications: false,
      setAllowLeaderBoardVisible: false,
      PushNotificationNewFollowers: false,
      PushNotificationComments: false,
      PushNotificationLike: false,
      PushNotificationMentionAndTags: false,
      PushNotificationProfileViews: false,
      PushNotificationReposts: false,
      postsLoading: true,
      PushNotificationDirectMessages: false,
      PushNotificationVideoFromAccount: false,
      PushNotificationVideoFromPeople: false,
      PushNotificationVideoYouMightLike: false,
      PushNotificationLiveFromAccount: false,
      PushNotificationLiveFromPeople: false,
      PushNotificationLiveYouMightLike: false,
      PushNotificationPersonalizedUpdates: false,
      sortingOption: "Oldest",
      likeActivityPosts: [],
      notInterestedPosts: [],
      savedActivityPosts: [],
      commentsActivity: [],
      language: "",
      newPasswordErrorMsg: "",
      confirmPasswordErrorMsg: "",
      errors: {},
      QRCodeImage: "",
      userName: "",
      deleteAccountLoader : false
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  // Customizable Area Start
  goBack = () => {
    this.props.navigation.goBack();
  };

  async componentDidMount() {
    super.componentDidMount();       
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language });

    this.props.navigation.addListener("focus", async () => {
      const language = await getStorageData("SelectedLng");
      this.setState({ language: language });
    });

    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  async componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  activityLikeOnPress = (item: any) => {
    this.props.navigation?.navigate("Comments", {
      type: "LikeActivity",
      account_id: item?.attributes?.account_id,
      post_id: item?.attributes.id,
    });
  };
  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };
  getBucketDetails = async () => {
    const token = this.state.token;

    const header = {
      "Content-Type": "application/json",
      token: token,
    };
    this.apiCall({
      setApiCallId: "getBucketDetailsCallId",
      header,
      method: configJSON.PostApiMethodType,
      endPoint: `/bx_block_posts/posts/get_s3_bucket_detail`,
      body: null,
    });
  };

  getQRCode = async () => {
    this.setState({
      isLoading: true,
    });
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": "application/json",
      token: token,
    };

    this.apiCall({
      setApiCallId: "getQRCodeCallId",
      header,
      method: "GET",
      endPoint: `/account_block/get_qr_code`,
      body: null,
    });
  };

  getUserDetails = async () => {
    const token = this.state.token;

    const header = {
      "Content-Type": "application/json",
      token: token,
    };
    this.apiCall({
      setApiCallId: "getUserDetails",
      header,
      method: configJSON.PostApiMethodType,
      endPoint: `/bx_block_settings/user`,
      body: null,
    });
  };
  getNoInterestedPosts = async () => {
    const authToken = (await getStorageData("authToken", false)) || "";
    const header = {
      "Content-Type": "application/json",
      token: authToken,
    };

    this.apiCall({
      setApiCallId: "getNotInterestedPostsCallId",
      header,
      method: configJSON.validationApiMethodType,
      endPoint: `/bx_block_share/not_interest?sort=${this.state.sortingOption.toLowerCase()}`,
    });
  };
  getLikesPosts = async () => {
    const authToken = (await getStorageData("authToken", false)) || "";
    const header = {
      "Content-Type": "application/json",
      token: authToken,
    };
    this.apiCall({
      setApiCallId: "getLikesPostsCallId",
      header,
      method: configJSON.validationApiMethodType,
      endPoint: `/bx_block_settings/likes_activity?filter=${this.state.sortingOption.toLowerCase()}`,
    });
  };
  getSavedPosts = async () => {
    const authToken = (await getStorageData("authToken", false)) || "";
    const header = {
      "Content-Type": "application/json",
      token: authToken,
    };

    this.apiCall({
      setApiCallId: "getSavedPostsCallId",
      header,
      method: configJSON.validationApiMethodType,
      endPoint: `/bx_block_posts/posts/bookmark_posts?per_page=9999999&page=1&sort=${this.state.sortingOption.toLowerCase()}`,
    });
  };

  getUserGeneralNotificationSettings = async () => {
    const authToken = (await getStorageData("authToken", false)) || "";
    const selfUserId = await getStorageData("userID");
    const header = {
      "Content-Type": "application/json",
      token: authToken,
    };
    this.setState({
      isLoading: true,
    });
    this.apiCall({
      setApiCallId: "getUserGeneralNotificationSettingsCallId",
      header,
      method: configJSON.validationApiMethodType,
      endPoint: `${configJSON.getGeneralNotificationSettings}${selfUserId}`,
    });
  };

  updateGeneralNotificationSettings = async () => {
    const authToken = (await getStorageData("authToken", false)) || "";
    const selfUserId = await getStorageData("userID");
    const header = {
      "Content-Type": "application/json",
      token: authToken,
    };

    this.apiCall({
      setApiCallId: "updateUserGeneralNotificationSettingsCallId",
      header,
      method: configJSON.updateProfilePUTMethodType,
      endPoint: `${configJSON.updateGeneralNotificationsSettings}${selfUserId}`,
      body: {
        data: {
          push_notificable_activated: !this.state.setAllPushNotifications,
        },
      },
    });
    this.setState({
      isLoading: true,
      setAllPushNotifications: !this.state.setAllPushNotifications,
    });
  };

  getUserNotificationsSettings = async () => {
    const authToken = (await getStorageData("authToken", false)) || "";
    const header = {
      "Content-Type": "application/json",
      token: authToken,
    };
    this.setState({
      isLoading: true,
    });
    this.apiCall({
      setApiCallId: "getNotificationsSettingsCallId",
      header,
      method: configJSON.validationApiMethodType,
      endPoint: configJSON.getNotificationSettings,
    });
  };

  updateUserNotificationsSettings = async (
    notificationPreference:
      | "is_like_notification_enable"
      | "is_comment_notification_enable"
      | "is_follower_notification_enable"
      | "is_tagging_notification_enable"
      | "is_chat_notification_enable"
      | "is_video_from_account_you_follow_enable"
      | "is_live_streaming_vedio_from_account_you_follow_enable",
    value: boolean
  ) => {
    const authToken = (await getStorageData("authToken", false)) || "";
    const header = {
      "Content-Type": "application/json",
      token: authToken,
    };

    switch (notificationPreference) {
      case "is_like_notification_enable":
        this.setState({
          PushNotificationLike: value,
        });
        break;
      case "is_comment_notification_enable":
        this.setState({
          PushNotificationComments: value,
        });
        break;
      case "is_follower_notification_enable":
        this.setState({
          PushNotificationNewFollowers: value,
        });
        break;
      case "is_tagging_notification_enable":
        this.setState({
          PushNotificationMentionAndTags: value,
        });
        break;
      case "is_chat_notification_enable":
        this.setState({
          PushNotificationDirectMessages: value,
        });
        break;
      case "is_video_from_account_you_follow_enable":
        this.setState({
          PushNotificationVideoFromAccount: value,
        });
        break;
      case "is_live_streaming_vedio_from_account_you_follow_enable":
        this.setState({
          PushNotificationLiveFromAccount: value,
        });
    }

    this.apiCall({
      setApiCallId: "updateNotificationsSettingsCallId",
      header,
      method: configJSON.patchPostAPiMethod,
      endPoint: configJSON.updateNotificationSettings,
      body: {
        data: {
          [notificationPreference]: value,
        },
      },
    });
  };

  getCurrentUserProfileDetails = async () => {
    const token = this.state.token;

    const header = {
      "Content-Type": "application/json",
      token: token,
    };
    this.apiCall({
      setApiCallId: "getCurrentUserProfileDetails",
      header,
      method: configJSON.PostApiMethodType,
      endPoint: `/account_block/show_profile`,
      body: null,
    });
  };
  keyExtractor = (item: any) => {
    return item.id;
  };
  updateProfile = async () => {
    const authToken = (await getStorageData("authToken", false)) || "";
    const header = {
      "Content-Type": configJSON.formContentType,
      token: authToken,
    };
    let formData: any = new FormData();
    if (this.state.modalType == "name") {
      formData.append("data[attributes][full_name]", this.state.inputValueName);
    } else if (this.state.modalType == "username") {
      formData.append(
        "data[attributes][user_name]",
        this.state.inputValueUsername
      );
    } else if (this.state.modalType == "bio") {
      formData.append("data[attributes][bio]", this.state.inputValueBio);
    } else if (this.state.modalType == "photo") {
      let uniquedNotifId = uuidv4();    
      let randomName = this.state.media.filename
        ? this.state.media.filename
        : uniquedNotifId.substring(30);
      let photo = {
        uri: this.state.media.path,
        type: this.state.media.mime,
        name: randomName,
      };
      formData.append("data[attributes][photo]", photo);
      this.setState({ media: null });
    } else if (this.state.modalType == "video") {
      let video = {
        uri: this.state.media.path,
        type: this.state.media.mime,
        name: this.state.media.filename,
      };
      formData.append("data[attributes][profile_video]", video);
      this.setState({ media: null });
    }
    this.apiCall({
      setApiCallId: "updateProfileAPICallId",
      header,
      endPoint: `/account_block/profile_update`,
      method: "PATCH",
      body: formData,
    });
  };

  changePassword = async () => {
    const authToken = (await getStorageData("authToken", false)) || "";
    const header = {
      "Content-Type": configJSON.formContentType,
      token: authToken,
    };

    let formData: any = new FormData();

    formData.append("current_password", this.state.oldPassword);
    formData.append("new_password", this.state.newPassword);
    formData.append("confirm_password", this.state.confirmPassword);

    this.apiCall({
      setApiCallId: "changePassword",
      header,
      endPoint: `/bx_block_settings/password`,
      method: "PATCH",
      body: formData,
    });
  };

  deleteUser = async () => {
    const authToken = (await getStorageData("authToken", false)) || "";
    const header = {
      "Content-Type": configJSON.formContentType,
      token: authToken,
    };
    await this.apiCall({
      setApiCallId: "deleteUser",
      header,
      endPoint: `/bx_block_settings/destroy_user`,
      method: "DELETE",
      body: null,
    });
  };

  changePasswordApiSuccessCall = (responseJson: any) => {    
    if (responseJson?.message === "password updated successfully") {
      this.props.navigation.goBack();
      this.showAlert(
        `${translate("password_updated_successfully")}`,
        "",
        translate("ok")
      );
    } else if (responseJson?.message === "please check your current password") {
      this.showAlert(
        `${translate("check_your_current_password")}`,
        "",
        translate("ok")
      );
    } else {
      this.showAlert("Something went wrong!", "");
    }
    this.setState({ isLoading: false });
  };

  deleteUserApiSuccessCall = (responseJson: any) => {
    this.setState({deleteAccountLoader : false})
    if (responseJson.message === "user deleted") {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "Home" }],
        })
      );
      logoutUser("", this.props);
    } else {
      this.showAlert("Something went wrong!", "");
    }
  };

  getBucketDetailsApiSuccessCall = (responseJson: any) => {
    if (responseJson.errors || responseJson.error) {
      // Check Error Response
    } else if (responseJson?.access_key_id) {
      this.setState({ bucketDetails: responseJson, isLoading: false });
    }
  };

  getCurrentProfileApiCallSuccess = (responseJson: any) => {
    if (responseJson.data != null) {
      const response = responseJson.data.attributes;
      this.setState({
        userDetails: responseJson,
        inputValueName: response?.full_name || "",
        inputValueUsername: response?.user_name || "",
        inputValueBio: response?.bio || "",
        previewImage: response?.photo || "",
        userID: response?.id || "",
      });
    }
  };

  apiCall = (data: any) => {
    const { setApiCallId, header, endPoint, method, body } = data;

    switch (setApiCallId) {
      case "getBucketDetailsCallId": {
        let requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getBucketDetailsCallId = requestMessage.messageId;
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
        break;
      }
      case "getQRCodeCallId": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getQRCodeCallId = requestMessage.messageId;
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(header)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          body
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "updateProfileAPICallId": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.updateProfileAPICallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(header)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          body
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "getCurrentUserProfileDetails": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getCurrentProfileAPICallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          body
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }

      case "getUserDetails": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getUserDetailsCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          body
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "changePassword": {
        this.setState({ isLoading: true });
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.changePasswordAPICallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          body
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "updateNotificationsSettingsCallId": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.updateNotificationsSettingsCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }

      case "getNotificationsSettingsCallId": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getNotificationsSettingsCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          body
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }

      case "getUserGeneralNotificationSettingsCallId": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getUserGeneralNotificationSettingsCallId =
          requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "updateUserGeneralNotificationSettingsCallId": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.updateUserGeneralNotificationSettingsCallId =
          requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "deleteUser": {
        this.setState({deleteAccountLoader : true});
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.deleteUserAPICallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          body
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "getAccountSettings": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getAccountSettingsCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          body
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "updateAccountSettings": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.updateAccountSettingsCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "updateDataSaver": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.updateDataSaverCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "updateBreakReminderSettings": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.updateBreakReminderSettingsCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "getSavedDataCallId": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getSavedDataCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );

        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );

        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }

      case "getBreakReminderCallId": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getBreakReminderCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );

        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );

        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "getBedTimeReminderCallId": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getBedTimeReminderCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );

        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );

        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }

      case "createBedTimeReminder": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.createBedTimeReminderCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );

        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );

        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "updateBedTimeToggle": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.updateBedTimeReminderCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );

        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );

        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;
      }

      case "getNotInterestedPostsCallId": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getNotInterestedPostsCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "getLikesPostsCallId": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getLikesPostsCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }

      case "getSavedPostsCallId": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getSavedPostsCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }

      case "getAverageTimeSpentId": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getAverageTimeSpentId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "getCommentsActivityCallId": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getCommentsActivityCallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      case "dislikeCommentpostAPICallId" :
      case "likeCommentpostAPICallId": {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.likeCommentpostAPICallId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          header
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      default:
        // Handle the default case here, if needed.
        break;
    }
  };

  stopVoteLoadingOnError = (apiId : string) => {
    if(this.state.voteLoading && apiId === this.getCommentsActivityCallId || apiId === this.likeCommentpostAPICallId || apiId === this.dislikeCommentpostAPICallId){
      this.setState({voteLoading : false});
    }
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Received", message);
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

      runEngine.debugLog("API Message Received.", message);

      if (responseJson?.errors) {
        this.stopVoteLoadingOnError(apiRequestCallId);
        //error message handling
      } else if (responseJson) {
        switch (apiRequestCallId) {
          case this.getNotificationsSettingsCallId:
            this.setState({
              isLoading: false,
              PushNotificationLike:
                responseJson.data?.attributes?.is_like_notification_enable,
              PushNotificationComments:
                responseJson.data?.attributes?.is_comment_notification_enable,
                PushNotificationNewFollowers: responseJson.data?.attributes?.is_follower_notification_enable,
                PushNotificationMentionAndTags: responseJson.data?.attributes?.is_tagging_notification_enable,
                PushNotificationVideoFromAccount: responseJson.data?.attributes?.is_video_from_account_you_follow_enable,
                PushNotificationLiveFromAccount: responseJson.data?.attributes?.is_live_streaming_vedio_from_account_you_follow_enable,
              // ... other state updates
            });
            break;

          case this.getUserGeneralNotificationSettingsCallId:
            this.setState({
              isLoading: false,
              setAllPushNotifications:
                responseJson?.data?.attributes?.push_notificable_activated,
            });
            break;

          case this.updateUserGeneralNotificationSettingsCallId:
            this.setState({
              isLoading: false,
            });
            break;

          case this.getAccountSettingsCallId:
            this.setState({
              setActivityStatus: responseJson.data.attributes.active_status,
              setPrivateAccount: responseJson.data.attributes.private_account,
              setChallengesInvites: responseJson.data.attributes?.challenges_invites,
              setMentions : responseJson.data.attributes?.allow_mentions,
              setAllowLeaderBoardVisible : responseJson.data.attributes?.allow_leaderboard_visibility,

              // ... other state updates
              showSensitiveContent:
                responseJson.data.attributes.show_sensitive_content,
            });
            break;

          case this.updateDeviceIdCallId:
            console.log("it is working -=-=-=--=-=>> ");
            break;

          case this.getBucketDetailsCallId:
            this.getBucketDetailsApiSuccessCall(responseJson);
            break;

          case this.getQRCodeCallId:
            this.setState({
              QRCodeImage: responseJson?.data?.attributes?.qr_code,
              isLoading: false,
              userName: responseJson?.data?.attributes?.current_user?.user_name,
            });
            break;

          case this.getSavedDataCallId:
            const res = responseJson?.data?.attributes;
            this.setState(
              {
                setDataSavingMode: res?.data_saver_enabled,
                setReduceVideoQuality: res?.reduce_video_quality,
                setReduceDownloadQuality: res?.reduce_download_quality,
                setRestrictedMobileData: res?.mobile_data_restricted,
                setUploadOverWifiOnly: res?.wifi_upload_only,
              },
              () => this.setState({ isLoading: false })
            );
            break;

          case this.likeCommentpostAPICallId:
            this.likeCommentpostAPICallIdSucessCallBack(responseJson);
            break;

          case this.dislikeCommentpostAPICallId:
            this.dislikeCommentpostAPICallIdSucessCallBack(responseJson);
            break;

          case this.updateBedTimeReminderCallId:
            this.setState({ isLoading: false });
            break;

          case this.getBreakReminderCallId:
            {
              const res = responseJson.data.attributes;

              this.setState(
                {
                  setBreakReminder: res?.is_enabled,
                  breakFrequencyInHours: res.frequency_in_hours,
                  breakFrequencyInMinutes: res.frequency_in_minutes,
                },
                () => this.setState({ isLoading: false })
              );
            }
            break;

          case this.getBedTimeReminderCallId:
            {
              const res = responseJson.data.attributes;
              const startTime = res?.start_time
                ?.split("T")[1]
                ?.split(".")[0]
                ?.slice(0, -3);
              const endTime = res?.end_time
                ?.split("T")[1]
                ?.split(".")[0]
                ?.slice(0, -3);

              this.setState({
                isLoading: false,
                bedTimeStart: startTime,
                bedTimeEnd: endTime,
                setBedTimeReminder: res?.is_enabled,
              });
            }
            break;

          case this.createBedTimeReminderCallId:
            this.setState({ isLoading: false, isSaved: true });
            break;

          case this.updateProfileAPICallId:
            this.getCurrentUserProfileDetails();
            this.setState({
              isModalVisible: false,
              isVideoPictureLoading: false,
            });
            break;

          case this.getCurrentProfileAPICallId:
            this.getCurrentProfileApiCallSuccess(responseJson);
            break;

          case this.getNotInterestedPostsCallId:
            this.setState({
              postsLoading: false,
              notInterestedPosts: responseJson.data,
            });
            break;

          case this.getLikesPostsCallId:
            this.setState({
              postsLoading: false,
              likeActivityPosts: responseJson.data,
            });
            break;

          case this.getSavedPostsCallId:
            this.setState({
              postsLoading: false,
              savedActivityPosts: responseJson.data,
            });
            break;

          case this.getCommentsActivityCallId:
            this.setState({
              postsLoading: false,
              commentsActivity: responseJson.data,
              voteLoading:false
            });
            break;

          case this.getAverageTimeSpentId:
            this.setState({
              averageTimeSpent: responseJson.average_time_spent,
            });
            break;

          case this.getUserDetailsCallId:
            this.setState({ personalInformation: responseJson });
            break;

          case this.changePasswordAPICallId:
            this.changePasswordApiSuccessCall(responseJson);
            break;

          case this.deleteUserAPICallId:
            this.deleteUserApiSuccessCall(responseJson);
            break;

          default:
            // Handle default case if needed
            break;
        }
      } else if (errorReponse) {
        this.stopVoteLoadingOnError(apiRequestCallId);
        console.log(errorReponse);
      }
    }
  }

  async getAccountSettings() {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": "application/json",
      token: token,
    };

    this.apiCall({
      setApiCallId: "getAccountSettings",
      header,
      method: configJSON.validationApiMethodType,
      endPoint: configJSON.getAccountSettingsEndpoint,
      body: null,
    });
  }

  doClickImageVideoPicker = async (type: string) => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      multiple: false,
      mediaType: type == "photo" ? "photo" : "video",
    }).then(async (data) => {
      if (type == "photo") {
        this.setState({ previewImage: data?.path, media: data });
      } else {
        this.setState({ previewVideo: data?.path, media: data });
      }
      this.setState({ isVideoPictureLoading: true });
      this.updateProfile();
      return true;
    });
  };
  updateDeviceId = async () => {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": "application/json",
      token: token,
    };
    console.log("check here it is working fine ");

    this.apiCall({
      setApiCallId: "updateDeviceIdCallId",
      header,
      method: "PUT",
      endPoint: "/account_block/update_device_id",
      body: {
        device_id: null,
      },
    });
  };
  updateBreakReminderSettings = async (hours?: number, minutes?: number) => {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": "application/json",
      token: token,
    };

    const take_a_break_reminder = {
      frequency_in_minutes: minutes,
      frequency_in_hours: hours,
      is_enabled: this.state.setBreakReminder,
    };

    if (hours !== undefined && minutes !== undefined) {
      this.apiCall({
        setApiCallId: "updateBreakReminderSettings",
        header,
        method: configJSON.updateProfilePUTMethodType,
        endPoint: configJSON.postBreakReminder,
        body: {
          take_a_break_reminder,
        },
      });
    } else {
      this.apiCall({
        setApiCallId: "updateBreakReminderSettings",
        header,
        method: configJSON.updateProfilePUTMethodType,
        endPoint: configJSON.postBreakReminder,
        body: {
          take_a_break_reminder: {
            frequency_in_minutes: this.state.breakFrequencyInMinutes,
            frequency_in_hours: this.state.breakFrequencyInHours,
            is_enabled: this.state.setBreakReminder,
          },
        },
      });
    }
  };
  likeCommentpostAPICallIdSucessCallBack = (res: any) => {
    this.getCommentsActivity();
  };

  dislikeCommentpostAPICallIdSucessCallBack = (res: any) => {
    this.getCommentsActivity();
  };

  likeCommentpost = async (index: number) => {
    this.setState({
      isLoading: true,
      voteLoading: true,
      selectedCommentIndex: index,
    });
    const token = await getStorageData("authToken");
    const header = {
      token,
    };
    this.apiCall({
      setApiCallId: "likeCommentpostAPICallId",
      header,
      method: "POST",
      endPoint: `/bx_block_comments/upvotes?id=${this.state.commentID}`,
    });
  };
  dislikeCommentpost = async (index: number) => {
    this.setState({
      isLoading: true,
      voteLoading: true,
      selectedCommentIndex: index,
    });
    const token = await getStorageData("authToken");
    const header = {
      token,
    };
    this.apiCall({
      setApiCallId: "dislikeCommentpostAPICallId",
      header,
      method: "POST",
      endPoint: `bx_block_comments/downvotes?id=${this.state.commentID}`,
    });
  };
  toggleBreakReminder = () => {
    this.setState({
      setBreakReminder: !this.state.setBreakReminder,
      breakFrequencyModalOpen:
        this.state.breakFrequencyInHours === "" &&
        this.state.breakFrequencyInMinutes === ""
          ? true
          : false,
    });
    this.updateBreakReminderSettings();
  };

  toggleBedTimeStartModal = () => {
    this.setState({
      bedTimeStartModalOpen: !this.state.bedTimeStartModalOpen,
      bedTimeEndModalOpen: false,
      isSaved: false,
    });
  };

  toggleBedTimeEndModal = () => {
    this.setState({
      bedTimeStartModalOpen: false,
      bedTimeEndModalOpen: !this.state.bedTimeEndModalOpen,
      isSaved: false,
    });
  };
  handleNamePress(name: any, matchIndex: number, tagList: any) {
    if (tagList && tagList.length > 0) {
      let withoutAt = name.substring(1);
      let userId = 0;

      tagList?.map((tagObject: any) => {
        if (tagObject.user_name === withoutAt) {
          userId = tagObject.account_id;
        }
      });

      let dataAccount = {
        attributes: {
          account_id: userId,
        },
      };
      this.setState({ commentModalVisible: false });
      this.props.navigation.navigate("UserProfileBasicBlock", {
        data: dataAccount,
      });
    }
  }
  toggleBreakModal = () => {
    this.setState({
      breakFrequencyModalOpen: true,
    });
  };

  getBreakReminderSettings = async () => {
    this.setState({ isLoading: true });
    const token = await getStorageData("authToken");
    const header = {
      token,
    };
    this.apiCall({
      setApiCallId: "getBreakReminderCallId",
      header,
      method: configJSON.validationApiMethodType,
      endPoint: configJSON.getBreakReminder,
    });
  };

  getBedTimeReminderSettings = async () => {
    this.setState({ isLoading: true });
    const token = await getStorageData("authToken");
    const header = {
      token,
    };

    this.apiCall({
      setApiCallId: "getBedTimeReminderCallId",
      header,
      method: configJSON.validationApiMethodType,
      endPoint: configJSON.getBedTimeReminder,
    });
  };

  handleToggleBedTimeReminder = async () => {
    this.setState({
      setBedTimeReminder: !this.state.setBedTimeReminder,
      isLoading: true,
    });
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": "application/json",
      token,
    };

    this.apiCall({
      setApiCallId: "updateBedTimeToggle",
      header,
      method: configJSON.PostAPiMethod,
      endPoint: configJSON.postBedTimeReminder,
      body: {
        bedtime_reminder: {
          is_enabled: this.state.setBedTimeReminder,
        },
      },
    });
  };

  handleUpdateBedTimeReminder = async () => {
    this.setState({
      isLoading: true,
      bedTimeEndModalOpen: false,
      bedTimeStartModalOpen: false,
    });
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": "application/json",
      token,
    };

    const bedtime_reminder = {
      is_enabled: this.state.setBedTimeReminder,
      start_time: this.state.bedTimeStart,
      end_time: this.state.bedTimeEnd,
    };

    this.apiCall({
      setApiCallId: "createBedTimeReminder",
      header,
      method: configJSON.PostAPiMethod,
      endPoint: configJSON.createBedTimeReminder,
      body: {
        bedtime_reminder,
      },
    });
  };
  async getCommentsActivity() {
    const token = await getStorageData("authToken");
    const header = {
      token,
    };
    this.apiCall({
      setApiCallId: "getCommentsActivityCallId",
      header,
      method: "GET",
      endPoint: `/bx_block_settings/comments_activity?filter=${this.state.sortingOption.toLowerCase()}`,
    });
  }

  async toggleDataSaving(
    option:
      | "Data Saving Mode"
      | "Reduce Video Quality"
      | "Reduce Download Quality"
      | "Restricted Mobile Data"
      | "Upload Over Wifi Only"
  ) {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": "application/json",
      token: token,
    };

    switch (option) {
      case "Data Saving Mode": {
        const datasaver = {
          data_saving_mode: !this.state.setDataSavingMode,
          reduce_video_quality: this.state.setReduceVideoQuality,
          reduce_download_quality: this.state.setReduceDownloadQuality,
          wifi_upload_only: this.state.setUploadOverWifiOnly,
          mobile_data_restricted: this.state.setRestrictedMobileData,
        };
        this.setState({
          ...this.state,
          setDataSavingMode: !this.state.setDataSavingMode,
        });
        this.apiCall({
          setApiCallId: "updateDataSaver",
          header,
          method: configJSON.updateProfilePUTMethodType,
          endPoint: configJSON.updateDataSaver,
          body: {
            datasaver,
          },
        });
        return;
      }

      case "Reduce Video Quality": {
        const datasaver = {
          data_saving_mode: this.state.setDataSavingMode,
          reduce_video_quality: !this.state.setReduceVideoQuality,
          reduce_download_quality: this.state.setReduceDownloadQuality,
          wifi_upload_only: this.state.setUploadOverWifiOnly,
          mobile_data_restricted: this.state.setRestrictedMobileData,
        };
        this.setState({
          ...this.state,
          setReduceVideoQuality: !this.state.setReduceVideoQuality,
        });
        this.apiCall({
          setApiCallId: "updateDataSaver",
          header,
          method: configJSON.updateProfilePUTMethodType,
          endPoint: configJSON.updateDataSaver,
          body: {
            datasaver,
          },
        });
        return;
      }

      case "Reduce Download Quality": {
        const datasaver = {
          data_saving_mode: this.state.setDataSavingMode,
          reduce_video_quality: this.state.setReduceVideoQuality,
          reduce_download_quality: !this.state.setReduceDownloadQuality,
          wifi_upload_only: this.state.setUploadOverWifiOnly,
          mobile_data_restricted: this.state.setRestrictedMobileData,
        };
        this.setState({
          ...this.state,
          setReduceDownloadQuality: !this.state.setReduceDownloadQuality,
        });
        this.apiCall({
          setApiCallId: "updateDataSaver",
          header,
          method: configJSON.updateProfilePUTMethodType,
          endPoint: configJSON.updateDataSaver,
          body: {
            datasaver,
          },
        });
        return;
      }

      case "Restricted Mobile Data": {
        const datasaver = {
          data_saving_mode: this.state.setDataSavingMode,
          reduce_video_quality: this.state.setReduceVideoQuality,
          reduce_download_quality: this.state.setReduceDownloadQuality,
          wifi_upload_only: this.state.setUploadOverWifiOnly,
          mobile_data_restricted: !this.state.setRestrictedMobileData,
        };
        this.setState({
          ...this.state,
          setRestrictedMobileData: !this.state.setRestrictedMobileData,
        });
        this.apiCall({
          setApiCallId: "updateDataSaver",
          header,
          method: configJSON.updateProfilePUTMethodType,
          endPoint: configJSON.updateDataSaver,
          body: {
            datasaver,
          },
        });
        return;
      }

      case "Upload Over Wifi Only": {
        const datasaver = {
          data_saving_mode: this.state.setDataSavingMode,
          reduce_video_quality: this.state.setReduceVideoQuality,
          reduce_download_quality: this.state.setReduceDownloadQuality,
          wifi_upload_only: !this.state.setUploadOverWifiOnly,
          mobile_data_restricted: this.state.setRestrictedMobileData,
        };
        this.setState({
          ...this.state,
          setUploadOverWifiOnly: !this.state.setUploadOverWifiOnly,
        });
        this.apiCall({
          setApiCallId: "updateDataSaver",
          header,
          method: configJSON.updateProfilePUTMethodType,
          endPoint: configJSON.updateDataSaver,
          body: {
            datasaver,
          },
        });
        return;
      }

      default:
        break;
    }
  }

  async toggleSettings(setting: string) {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": "application/json",
      token: token,
    };
    switch (setting) {
      case "active_status":
        {
          const updatedSettings = {
            active_status: !this.state.setActivityStatus,
            private_account: this.state.setPrivateAccount,
            challenges_invites: this.state.setChallengesInvites,
            allow_mentions: this.state.setMentions,
            allow_leaderboard_visibility: this.state.setAllowLeaderBoardVisible,
            show_sensitive_content: this.state.showSensitiveContent,
          };
          this.setState({
            ...this.state,
            setActivityStatus: !this.state.setActivityStatus,
          });
          this.apiCall({
            setApiCallId: "updateAccountSettings",
            header,
            method: configJSON.updateProfilePUTMethodType,
            endPoint: configJSON.updateAccountSettings,
            body: {
              account_privacy: updatedSettings,
            },
          });
        }
        return;
      case "private_account":
        {
          const updatedSettings = {
            active_status: this.state.setActivityStatus,
            private_account: !this.state.setPrivateAccount,
            challenges_invites: this.state.setChallengesInvites,
            allow_mentions: this.state.setMentions,
            allow_leaderboard_visibility: this.state.setAllowLeaderBoardVisible,
            show_sensitive_content: this.state.showSensitiveContent,
          };
          this.setState({
            ...this.state,
            setPrivateAccount: !this.state.setPrivateAccount,
          });
          this.apiCall({
            setApiCallId: "updateAccountSettings",
            header,
            method: configJSON.updateProfilePUTMethodType,
            endPoint: configJSON.updateAccountSettings,
            body: {
              account_privacy: updatedSettings,
            },
          });
        }
        return;
      case "allow_mentions":
        {
          const updatedSettings = {
            active_status: this.state.setActivityStatus,
            private_account: this.state.setPrivateAccount,
            challenges_invites: this.state.setChallengesInvites,
            allow_mentions: !this.state.setMentions,
            allow_leaderboard_visibility: this.state.setAllowLeaderBoardVisible,
            show_sensitive_content: this.state.showSensitiveContent,
          };
          this.setState({
            ...this.state,
            setMentions: !this.state.setMentions,
          });
          this.apiCall({
            setApiCallId: "updateAccountSettings",
            header,
            method: configJSON.updateProfilePUTMethodType,
            endPoint: configJSON.updateAccountSettings,
            body: {
              account_privacy: updatedSettings,
            },
          });
        }
        return;
      case "show_sensitive_content":
        {
          const updatedSettings = {
            active_status: this.state.setActivityStatus,
            private_account: this.state.setPrivateAccount,
            challenges_invites: this.state.setChallengesInvites,
            allow_mentions: this.state.setMentions,
            allow_leaderboard_visibility: this.state.setAllowLeaderBoardVisible,
            show_sensitive_content: !this.state.showSensitiveContent,
          };
          this.setState({
            ...this.state,
            showSensitiveContent: !this.state.showSensitiveContent,
          });
          this.apiCall({
            setApiCallId: "updateAccountSettings",
            header,
            method: configJSON.updateProfilePUTMethodType,
            endPoint: configJSON.updateAccountSettings,
            body: {
              account_privacy: updatedSettings,
            },
          });
        }
        break;
      default:
        return;
    }
  }
  getDataSavingSettings = async () => {
    this.setState({ isLoading: true });
    const token = await getStorageData("authToken");
    const header = {
      token,
    };
    this.apiCall({
      setApiCallId: "getSavedDataCallId",
      header,
      method: configJSON.validationApiMethodType,
      endPoint: configJSON.getDataSavings,
    });
  };
  navigateFollowers = async () => {
    const userID = (await getStorageData("userID", false)) || "";
    this.props.navigation.navigate("Followings", {
      type: "followings",
      userID: userID,
      title: `${translate("followed_accounts")}`,
      sub_title: `${translate("accounts_that_you_follow_will_show_up_here")}`,
    });
  };
  navigateActivity = async () => {
    this.props.navigation.navigate("YourActivity");
  };
  navigateSavedActivity = async () => {
    this.props.navigation.navigate("SavedActivity");
  };
  navigateNotInterestedActivity = async () => {
    this.props.navigation.navigate("NotInterestedActivity");
  };
  navigateCommentsActivity = async () => {
    this.props.navigation.navigate("CommentActivity");
  };
  navigateLikeActivity = async () => {
    this.props.navigation.navigate("LikeActivity");
  };
  fetchAverageTimeSpent = async () => {
    const token = await getStorageData("authToken");
    const header = {
      "Content-Type": "application/json",
      token: token,
    };
    this.apiCall({
      setApiCallId: "getAverageTimeSpentId",
      header,
      method: configJSON.validationApiMethodType,
      endPoint: configJSON.getAverageTimeSpent,
    });
  };

  clearDeviceId = async () => {
    // here updated Api's end points
    const token = await getStorageData("authToken");

    const header = {
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateDeviceIdCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      // '/account_block/update_fcm_token?device_id=' + ''
      "/account_block/update_device_id"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "PUT"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };
  _handleInputChange = (field: string, value: any) => {
    let errors = this.state.errors;

    if (field === "newPassword") {
      errors[field] = "";
    }
    if (field === "confirmPassword") {
      errors[field] = "";
    }

    //@ts-ignore
    this.setState({
      [field]: value,
      errors,
    });
  };

  _validateNewPassword = () => {
    const { newPassword, errors } = this.state;

    let formIsValid = true;

    if (!newPassword || newPassword) {
      errors.newPassword = passwordValidate("New password", newPassword);
      formIsValid = formIsValid ? !!errors.newPassword.status : formIsValid;
    }

    this.setState({ errors });

    return formIsValid;
  };
  _validateConfirmPassword = () => {
    const { newPassword, confirmPassword, errors } = this.state;

    let formIsValid = true;

    if (!confirmPassword || confirmPassword) {
      errors.confirmPassword = passwordValidate(
        "New password",
        confirmPassword
      );
      formIsValid = formIsValid ? !!errors.confirmPassword.status : formIsValid;
    }

    this.setState({ errors });

    return formIsValid;
  };
  // Customizable Area End
}
