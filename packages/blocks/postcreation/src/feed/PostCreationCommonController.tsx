import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
// Customizable Area Start
import { Image, PermissionsAndroid, Platform, ToastAndroid, BackHandler, Alert, TextInput } from 'react-native';
import { timer, flip, flash, flasFilled, timerFilled, vikingHelmet, vendetta, stallone, pingPong, humanoid, fireEffect, emotionExagerator, burningEffect } from "../feed/assets";
import React from "react";
import ImageCropPicker from "react-native-image-crop-picker";
//@ts-ignore
import { getStorageData } from "../../../../framework/src/Utilities";
import AWS from "aws-sdk";
import RNFS from 'react-native-fs';
import { decode } from "base64-arraybuffer";
import { translate } from "../../../../components/src/i18n/translate";
import { Camera, CameraPermissionRequestResult, IDeepARHandle } from "react-native-deepar";
import moment from "moment";
import { PERMISSIONS, checkMultiple } from "react-native-permissions";
import Carousel from "react-native-snap-carousel";
import { settingsIcon } from "../../../AmazonInteractiveVideoService/src/assets";

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
  PostData: any;
  token: string;
  name: string;
  description: string;
  price: any;
  currency: string;
  category_id: string;
  image: any;
  uploadedImages: any;
  AllCategory: any[];
  id: any;
  refresh: boolean;
  file: any;
  profileImageData: any;
  profileImageData1: any,
  selectedCategory: any;
  allCategories: any;
  reelsOptions: any[];
  mediadetails: any;
  cameraType: boolean;
  isFlashOn: boolean;
  showEffects: boolean;
  isSelectedSong: boolean;
  camera: any;
  imageindex: number;
  selectedTime: number;
  isRecordingStart: boolean;
  myTimeout: any;
  isTimerVisible: boolean;
  timerValue: number;
  length: any;
  startOrEnd: boolean;
  timerInterval: any;
  isRecording: boolean;
  recordedVideo: any;
  recordingFinished: boolean;
  isMute: boolean;
  paused: boolean;
  progress: any;
  setvisibility: number;
  selestaudience: number;
  setcomments: number;
  bucketDetails: any;
  caption: string;
  content_urls: any;
  isLoading: boolean;
  mainThumb: any;
  readyToShow: boolean;
  timermodelstatus: boolean;
  accountSuggetionList: any[];
  selectedAccountList: any[];
  isShowUserList: boolean;
  isSuggetionLoading: boolean;
  goback: boolean;
  isActive: boolean;
  camerastatus: any;
  activeItemIndex: number;
  selectedTagsList: any[];
  resultPoster: string;
  setSchedule: string;
  rawDate: any;
  isShowTagsList: boolean;
  location?: { description: string };
  tagsSuggetionList: any[];
  postId: any;
  isLoadingDraft: boolean;
  isUpdateDraft: boolean;
  openConfirmation: boolean;
  isScheduled: boolean;
  language: any;
  livestart: boolean;
  savePostId: number;
  isSaveDraft: boolean;
  meridiem: string;
  scheduleMinuteValue: string;
  scheduleHourValue: string;
  rawTimeSelected: Date;
  scheduleDateValue: any;
  showTime: boolean;
  show: boolean;
  alertModal: any;
  latLong?: any;
  audioData?: any;
  title: string;
  topic: string;
  currentUser: any,
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class PostCreationCommonController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  apiPostItemCallId: string = "";
  apiGetCategoryCallID: string = "";
  apiSearchTags: string = "";
  apiSearchAccount: string = "";
  PostApiCallId: string = "";
  loginUserCallId: string = "";
  DeleteApiCallId: any;
  addpostApiCallId: any;
  addDetailPostAPICallId: any;
  getUploadDraftsId: any;
  updatePostApiCallId: any;
  camera: any = null;
  timerInterval: any;
  videoRef: any;
  configurationApcallID: any;
  textInputRef = React.createRef<TextInput>();
  deepARRef = React.createRef<IDeepARHandle>();
  carouselRef: React.RefObject<Carousel<any>> = React.createRef<Carousel<any>>();
  getBucketDetailsCallId: any;
  timerForSearch: any;
  carouselData: any = [{ name: "me", path: "clear" },
  { name: "burning_effect", path: burningEffect },
  { name: "emotions_exaggerator", path: emotionExagerator },
  { name: "fire_effect", path: fireEffect },
  { name: "humanoid", path: humanoid },
  { name: "ping_pong", path: pingPong },
  { name: "stallone", path: stallone },
  { name: "vendetta_mask", path: vendetta },
  { name: "viking_helmet", path: vikingHelmet },];
  carouselData_ar: any = [...this.carouselData].reverse();
  actionButtons: any[] = [{ id: 1, label: translate("Flip"), icon: flip }, { id: 2, label: translate("Settings"), icon: settingsIcon },];
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];

    this.state = {
      camera: null,
      token: "",
      PostData: [],
      name: "",
      description: "",
      price: "",
      currency: "$",
      category_id: "",
      image: "",
      id: "",
      uploadedImages: [],
      AllCategory: [],
      file: "",
      postId: null,
      isLoadingDraft: false,
      isUpdateDraft: false,
      refresh: false,
      profileImageData: {},
      profileImageData1: {},
      selectedCategory: "",
      allCategories: "",
      mediadetails: "",
      rawTimeSelected: new Date(),
      cameraType: false,
      isFlashOn: false,
      showEffects: false,
      isSelectedSong: false,
      imageindex: 0,
      selectedTime: 0,
      myTimeout: 0,
      mainThumb: null,
      isRecordingStart: false,
      isTimerVisible: false,
      timerValue: 0,
      length: "90",
      startOrEnd: false,
      timerInterval: 0,
      isRecording: false,
      recordedVideo: "",
      recordingFinished: false,
      openConfirmation: false,
      savePostId: 0,
      isMute: false,
      paused: false,
      progress: 0,
      setvisibility: 0,
      selestaudience: 0,
      setcomments: 0,
      bucketDetails: null,
      caption: "",
      timermodelstatus: false,
      goback: false,
      camerastatus: "READY",
      meridiem: 'AM',
      scheduleMinuteValue: '',
      scheduleHourValue: '',
      scheduleDateValue: new Date(),
      showTime: false,
      isScheduled: false,
      livestart: false,
      location: undefined,
      isSaveDraft: false,
      readyToShow: false,
      selectedTagsList: [],
      reelsOptions: [
        {
          id: 1,
          label: translate("flip"),
          iconImg: <Image source={flip} style={{ width: 40, height: 40, resizeMode: "contain" }} />,
          onClick: () => { this.flipcamera() }
        },
        {
          id: 2,
          label: translate("timer"),
          iconImg: <Image source={timer} style={{ width: 40, height: 40, resizeMode: "contain" }} />,
          filledIcon: <Image source={timerFilled} style={{ width: 40, height: 40, resizeMode: "contain" }} />,
          onClick: () => { this.timermodel() }
        },
        {
          id: 3,
          label: translate("flash"),
          iconImg: <Image source={flash} style={{ width: 40, height: 40, resizeMode: "contain" }} />,
          filledIcon: <Image source={flasFilled} style={{ width: 40, height: 40, resizeMode: "contain" }} />,
          onClick: () => { this.flashcamera() }
        },
      ],
      content_urls: [],
      isLoading: false,
      accountSuggetionList: [],
      selectedAccountList: [],
      isShowUserList: false,
      isSuggetionLoading: false,
      isActive: true,
      activeItemIndex: 0,
      isShowTagsList: false,
      resultPoster: '',
      setSchedule: '',
      rawDate: new Date(),
      tagsSuggetionList: [],
      language: "",
      show: false,
      alertModal: {
        openAlertModal: false,
        alertMsg: "",
        headerText: ""
      },
      latLong: {
        latitude: 0,
        longitude: 0,
      },
      audioData: {},
      title: "",
      topic: "",
      currentUser: [],
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  // Customizable Area Start  

  onPressBackBtn = () => {
    if (this.props.route.params?.isDraft) {
      this.props.navigation.goBack();
    } else {
      this.setState({ mediadetails: "" });
      this.props.navigation.navigate("PostDetails", { mediadetails: this.state.mediadetails, bucketDetails: this.state.bucketDetails, poster: this.state.resultPoster });
    }
  }

  onPressSelectAudience = () => {
    this.props.navigation.navigate("Selectaudience", {
      selestaudience: this.props.route?.params?.selestaudience
        ? this.props.route.params.selestaudience
        : this.state.selestaudience,
      mediadetails: this.state.mediadetails,
      poster: this.state.resultPoster,
      description: this.state.caption
    });
  }

  onPressScheduleBtn = () => {
    this.props.navigation.navigate("Setschedule", {
      setSchedule: this.props.route?.params?.setSchedule
        ? this.props.route.params.setSchedule
        : this.state.setSchedule,
      rawDate: this.state.rawDate,
      mediadetails: this.state.mediadetails,
      poster: this.state.resultPoster,
      description: this.state.caption
    });
  }

  onPresscommentBtn = () => {
    this.props.navigation.navigate("CommentSettings", {
      setcomments: this.props.route?.params?.setcomments
        ? this.props.route.params.setcomments
        : this.state.setcomments,
      mediadetails: this.state.mediadetails,
      poster: this.state.resultPoster,
      description: this.state.caption
    });
  }

  onPresslocationBtn = () => {
    this.props.navigation.navigate("SelectLocation", {
      location: this.props.route?.params?.location
        ? this.props.route.params.location
        : this.state.location,
      mediadetails: this.state.mediadetails,
      poster: this.state.resultPoster,
      description: this.state.caption
    });
  }

  onPressUploadBtn = () => {
    this.setState({ savePostId: 0 });
    if (this.state.postId) {
      this.setState({ isLoading: true, isUpdateDraft: true })
      this.updateUploadPost(0)
    } else {
      this.setState({ isLoading: true, isUpdateDraft: false })
      this.uploadPost()
    }
  }

  onPressSetVisibility = () => {
    this.props.navigation.navigate("Setvisibility", {
      setvisibility: this.props.route?.params?.setvisibility
        ? this.props.route.params.setvisibility
        : this.state.setvisibility,
      mediadetails: this.state.mediadetails,
      poster: this.state.resultPoster,
      description: this.state.caption,

    });
  }

  onPressCrossBtn = () => {
    this.changeEffect("clear");
    if (this.state.showEffects) {
      this.setState({ showEffects: false });
    } else if (!this.state.isRecordingStart) {
      this.setState({ goback: true, isActive: false, isFlashOn: false, cameraType: false, selectedTime: 0, length: "90" }, () => {
        this.props.navigation.goBack();
      })
    } else {
      this.setState({ isRecordingStart: false, startOrEnd: false })
      this.stopCameraRecord()
      this.stopNormalCameraRecord()
    }
  }

  requestPermissions = async () => {
    try {
      if (Platform.OS === "android") {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        if (
          result["android.permission.CAMERA"] &&
          result["android.permission.RECORD_AUDIO"] === "granted"
        ) {
          let data = { title: this.state.title, topic: this.state.topic, image: this.state.profileImageData1 }
          this.props.navigation.navigate("LiveStreaming", { screen: "LiveStreaming", data })
        } else if (
          result["android.permission.CAMERA"] ||
          result["android.permission.RECORD_AUDIO"] === "never_ask_again"
        ) {
          this.setState({ alertModal: { openAlertModal: true, alertMsg: "Please Go into Settings and Allow permissions to continue" } })
        }
      } else if (Platform.OS === "ios") {
        try {
          const result = await checkMultiple([
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.MICROPHONE,
          ]);
          if (
            result["ios.permission.CAMERA"] &&
            result["ios.permission.MICROPHONE"] === "granted"
          ) {
            let data = { title: this.state.title, topic: this.state.topic, image: this.state.profileImageData1 };
            this.props.navigation.navigate("LiveStreaming", { data })
          } else {
            this.setState({ alertModal: { openAlertModal: true, alertMsg: "Please Go into Settings and Allow permissions to continue" } })

          }
        } catch (error) {
          this.setState({ alertModal: { openAlertModal: true, alertMsg: "Please Go into Settings and Allow permissions to continue" } })
        }
      }
    } catch (error) {
      this.setState({ alertModal: { openAlertModal: true, alertMsg: "Please Go into Settings and Allow permissions to continue" } })
    }
  };

  requestBasicPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    const microphonePermission = await Camera.requestMicrophonePermission();

    const isCameraAllowed =
      cameraPermission === CameraPermissionRequestResult.AUTHORIZED;
    const isMicrophoneAllowed =
      microphonePermission === CameraPermissionRequestResult.AUTHORIZED;

    if (!isCameraAllowed || !isMicrophoneAllowed) {
      this.setState({ alertModal: { openAlertModal: true, alertMsg: "Please Go into Settings and Allow permissions to continue" } })
    }
  };
  async componentDidMount() {
    this.getCurrentUserDetails()
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language, activeItemIndex: (language === "ar" && Platform.OS === "android") ? this.carouselData?.length - 1 : 0 });
    this.props.navigation.addListener("focus", () => {
      this.getCurrentUserDetails();
      this.setState({
        isActive: true,
      })
    })

    this.props.navigation.addListener("blur", () => {
      this.setState({ isActive: false })
    })

    if (this.props.route.params?.updateData !== undefined && this.props.route.params?.updateData !== null) {
      const itemData = this.props.route.params?.updateData;
      this.setState({
        postId: itemData.id,
        caption: itemData.name,
        setvisibility: itemData.visibility_setting === 'Public' ? 0 : this.visibilityFunc(),
        selestaudience: itemData.audience_setting === 'No restrictions to viewers' ? 0 : 1,
        setcomments: itemData.comment_setting === 'Allow all comments' ? 0 : this.setCommentsFunc(),
        mainThumb: itemData.post_medias.thumnails[0],
        resultPoster: itemData.post_medias.thumnails[0],
        location: { description: itemData.location },
      })

    }

    const authToken = (await getStorageData('authToken', false)) || '';
    this.setState({ token: authToken }, () => {
      this.configurationApicall();
      this.getBucketDetails();
    });
    this.requestBasicPermissions();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount = async () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick = () => {
    this.setState({ goback: true, isActive: false, isFlashOn: false, cameraType: false, showEffects: false })
    if (!this.state.isRecordingStart) {
      this.props.navigation.goBack();
    }

    this.setState({ isRecordingStart: false, startOrEnd: false }, () => {
      this.stopCameraRecord()
    })


    return true;
  }
  notifyMessage(msg: string) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      this.showAlert('', msg, translate("ok"))
    }
  }

  visibilityFunc = () => {
    const itemData = this.props.route?.params?.updateData;
    if (itemData.visibility_setting === 'Unlisted') {
      return 1;
    } else if (itemData.visibility_setting === 'Private') {
      return 2;
    } else {
      return 0;
    }
  }

  setCommentsFunc = () => {
    const itemData = this.props.route?.params?.updateData;
    if (itemData.comment_setting === 'Hold potentially inappropriate comments for review') {
      return 1;
    } else if (itemData.comment_setting === 'Hold all comments for review') {
      return 3;
    } else {
      return 0;
    }
  }

  searchTagsByName(name: string) {
    this.setState({ isSuggetionLoading: true })
    const header = {
      "Content-Type": configJSON.postContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiSearchTags = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.searchHashTags}?q=` + name
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  getStorageReadPermission = async (searchLibrary: boolean = false) => {
    if (Platform.OS === 'ios') {

      return;
    }
    try {
      const pm3 = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (!pm3) {
        const granted = await PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
          ]
        );
        if (granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the storage to read.");

        } else {
          console.log("Read permission denied");
        }
        if (granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the storage to write.");
        } else {
          console.log("Write permission denied");
        }
        if (granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED) {
          this.props.navigation.navigate("Comments")
        } else {
          console.log("Read permission denied");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleChangeMeridian = (meridian: "AM" | "PM") => {
    this.setState({ meridiem: meridian });
  }


  getBucketDetails = async () => {
    const token = this.state.token

    const header = {
      "Content-Type": "application/json",
      "token": token
    };

    this.apiCall({
      setApiCallId: 'getBucketDetailsCallId',
      header,
      method: configJSON.PostApiMethodType,
      endPoint: `/bx_block_posts/posts/get_s3_bucket_detail`,
      body: null
    });
  }
  apiCall = (data: any) => {
    const { setApiCallId, header, endPoint, method, body } = data;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    if (setApiCallId === 'getBucketDetailsCallId') {
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

      body && requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      this.navigationPayloadFunc(message)
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson?.errors) {
        console.log("responseJSON error", responseJson.errors);

        this.setState({ refresh: false, isLoading: false });
        if (apiRequestCallId === this.addDetailPostAPICallId) {
          console.log("responseJDON error", responseJson);
        }
      } else if (responseJson !== undefined && responseJson !== null) {
        this.setState({ isLoadingDraft: false });
        switch (apiRequestCallId) {
          case this.configurationApcallID:
            const data = responseJson;
            this.setState({
              isLoading: false,
              allCategories: data,
            });
            break;

          case this.getBucketDetailsCallId:
            this.getBucketDetailsApiSuccess(responseJson)
            break;

          case this.apiPostItemCallId:
            this.setState({ PostData: responseJson, refresh: false });
            break;

          case this.addpostApiCallId:
            this.setState({ refresh: true });
            this.props.navigation.state.params.callback();
            this.props.navigation.goBack();
            break;

          case this.addDetailPostAPICallId:
            console.log("success response for adding details post", responseJson);
            this.addDetailPostAPISuccess(responseJson)
            break;

          case this.apiSearchTags:
            this.apiSearchTagApiSuccess(responseJson)
            break;

          case this.getUploadDraftsId:
            this.getUploadDraftsApiSuccess(responseJson)
            break;

          case this.apiGetCategoryCallID:
            this.getCategoryApiSuccess(responseJson)
            break;

          case this.updatePostApiCallId:
            this.setState({ refresh: true });
            this.getPostData();
            this.props.navigation.state.params.callback();
            this.props.navigation.goBack();
            break;

          case this.DeleteApiCallId:
            this.getPostData();
            break;

          case this.apiSearchAccount:
            this.apiSearchAccountSuccess(responseJson)
            break;

          default:
            break;
        }
        this.handleReceiveMethod(apiRequestCallId, responseJson)
      } else if (apiRequestCallId === this.DeleteApiCallId) {
        this.getPostData();
      } else if (errorReponse) {
        this.setState({ refresh: false, isLoading: false });
      }
    }
  }


  handleReceiveMethod = (apiRequestCallId: any, responseJson: any) => {
    if (apiRequestCallId === this.loginUserCallId) {
      this.setState({ currentUser: responseJson?.data?.attributes });
    }
    else if (apiRequestCallId === this.apiSearchAccount) {
      this.setState({ isSuggetionLoading: false })
      if (responseJson) {
        if (responseJson.account.length > 0) {
          this.setState({ isShowUserList: true, accountSuggetionList: responseJson.account })
        } else {
          this.setState({ isShowUserList: false, accountSuggetionList: [] })
        }
      } else {
        //error handler
      }
    }
  }

  navigationPayloadFunc = (message: any) => {
    const item = message.getData(
      getName(MessageEnum.PostDetailDataMessage)
    );
    if (item) {
      this.setState({
        name: item.data.attributes.name,
        description: item.data.attributes.description,
        price: item.data.attributes.price.toString(),
        currency: "$",
        category_id: item.data.attributes.category.data.attributes.id,
        id: item.data.attributes.id,
        profileImageData: {
          data: item.data.attributes.product_image,
          content_type: "image/jpeg",
          filename: "image.jpeg"
        },
        image: ""
      });
    }

  }

  getBucketDetailsApiSuccess = (responseJson: any) => {
    if (responseJson && (responseJson.errors || responseJson.error)) {
      // Check Error Response
    } else if (responseJson?.access_key_id) {
      this.setState({ bucketDetails: responseJson });
    }
  }

  addDetailPostAPISuccess = (responseJson: any) => {
    this.setState({ refresh: true, isLoading: false }, () => {
      console.log("i stopped loading");
    });
    if (responseJson?.data?.attributes?.errors) {
      this.notifyMessage(
        responseJson.data.attributes.errors?.name[0] == "can't be blank"
          ? translate("please_add_caption")
          : responseJson.data.attributes.errors.name[0]
      );
    } else {
      if (this.state.setSchedule != undefined) {
        this.notifyMessage(translate("postScheduleSuccess"));
      } else if (this.state.savePostId === 0) {
        this.notifyMessage(translate("postSucess"));
      } else {
        this.notifyMessage(translate("draft_uploaded_successfully"));
      }
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTabScreen' }],
      });
    }
  }

  apiSearchTagApiSuccess = (responseJson: any) => {
    this.setState({ isSuggetionLoading: false });
    if (responseJson) {
      if (responseJson?.post?.data?.length > 0) {
        this.setState({
          isShowTagsList: true,
          tagsSuggetionList: responseJson.post.data,
        });
      } else {
        this.setState({ isShowTagsList: false, tagsSuggetionList: [] });
      }
    }
  }

  getUploadDraftsApiSuccess = (responseJson: any) => {
    this.setState({ refresh: true, isLoading: false });

    console.log("createdddsuccessfully", responseJson);
    if (this.state.isUpdateDraft) {
      if (this.state.setSchedule != undefined) {
        this.notifyMessage(translate("postScheduleSuccess"));
      } else if (this.state.isSaveDraft) {
        this.notifyMessage(translate("draftUpdatedSuccess"));
      } else {
        this.notifyMessage(translate("draft_uploaded_successfully"));
      }
      this.setState({ isUpdateDraft: false, isSaveDraft: false });
      this.props.navigation.goBack();
      this.props.navigation.goBack();
    } else {
      this.notifyMessage(translate("postSucess"));
      this.setState({ isUpdateDraft: false });
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTabScreen' }],
      });
    }
  }

  getCategoryApiSuccess = (responseJson: any) => {
    let allCategories: any[] = [];
    let categories: string[] = [];
    const data = responseJson;

    data.forEach((item: any) => {
      if (categories.indexOf(item.data.attributes.name) === -1) {
        let category = { value: item.data.attributes.id, label: item.data.attributes.name };
        allCategories.push(category);
        categories.push(item.data.attributes.name);
      }
    });
    this.setState({ AllCategory: responseJson, allCategories: allCategories });
    this.getPostData();
  }

  apiSearchAccountSuccess = (responseJson: any) => {
    this.setState({ isSuggetionLoading: false });
    if (responseJson) {
      if (responseJson.account.length > 0) {
        this.setState({
          isShowUserList: true,
          accountSuggetionList: responseJson.account,
        });
      } else {
        this.setState({ isShowUserList: false, accountSuggetionList: [] });
      }
    }
  }

  updateUploadPost = async (postAs: number) => {
    const header = {
      "Content-Type": configJSON.postContentType,
      token: this.state.token
    };

    const itemData = this.props.route?.params?.updateData;
    const timeNow = moment()
    const attrs = {
      name: this.state.caption !== '' ? this.state.caption : " ",
      description: itemData?.description ?? ' ',
      body: this.state.caption !== '' ? this.state.caption : " ",
      location: this.state.location?.description,
      latitude: this.state.latLong?.latitude,
      longitude: this.state.latLong?.longitude,
      save_post_as: this.state.setSchedule != undefined ? 2 : postAs,
      schedule_time: this.state.setSchedule != undefined ? `${this.state.setSchedule} ${"+" + timeNow.toString().split("+")[1]}` : null,
      visibility_setting: this.state.setvisibility,
      comment_setting: this.state.setcomments,
      audience_setting: this.state.selestaudience,
    };
    const attrs2 = {
      name: this.state.caption !== '' ? this.state.caption : " ",
      description: itemData?.description ?? ' ',
      body: this.state.caption !== '' ? this.state.caption : " ",
      location: this.state.location?.description,
      latitude: this.state.latLong?.latitude,
      longitude: this.state.latLong?.longitude,
      visibility_setting: this.state.setvisibility,
      comment_setting: this.state.setcomments,
      audience_setting: this.state.selestaudience,
      save_post_as: postAs,
    }

    this.state.setSchedule != undefined ? console.log("sdsds", attrs?.body) : console.log("wsd", attrs2?.body)


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getUploadDraftsId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.draftsListUpdateEndPoint + itemData.id
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      this.state.setSchedule != undefined ? JSON.stringify(attrs) : JSON.stringify(attrs2)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.draftsListPutMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  charValue = (r: any) => {
    if (r > 9) {
      if (r < 36) {
        return 55
      }
      else {
        return 61
      }
    }
    else {
      return 48
    }
  }

  uploadPost = async () => {
    let s3 = new AWS.S3({
      accessKeyId: this.state.bucketDetails.access_key_id,
      secretAccessKey: this.state.bucketDetails.secret_access_key,
      endpoint: `https://xtokbucket.s3.ap-south-1.amazonaws.com`,
      s3ForcePathStyle: true,
      signatureVersion: "v4"
    });

    s3.listObjects({ Bucket: "xtokbucket" }, (err, data) => {
    });
    let mediadetails = this.props.route.params?.mediadetails;

    if (this.props.route.params?.mediadetails?.uri) {

      console.log({
        bucketName: this.state.bucketDetails.bucket_name,
      })

      let promises = [];
      let contentType = 'video/mp4';
      let contentDeposition = 'inline;filename="' + mediadetails.uri + '"';
      console.log(Date.now(), 'starting YOYO')
      let fileName = mediadetails.uri.includes('file://') ? mediadetails.uri : ('file://' + mediadetails.uri)
      const base64 = await RNFS.readFile(fileName, 'base64');
      const arrayBuffer = decode(base64);
      let randrom_str = "",
        min = 0,
        max = 62;
      let i;
      for (i = 0; i++ < 12;) {
        let r = Math.random() * (max - min) + min << 0;
        randrom_str += String.fromCharCode(this.charValue(r));
      }

      let filename = randrom_str + mediadetails.uri.split('/').pop().split('?')[0].split('#')[0];
      promises.push(await this.s3upload(s3, this.state.bucketDetails.bucket_name, filename, arrayBuffer, contentDeposition, contentType)
      )
      Promise.all(promises).then(uploadedImgs => {
        console.log('images uploaded successfully')
        this.AddDetails(uploadedImgs);
      })
    } else {

      let promises = [];
      let content_urls: any = []
      for (const element of mediadetails) {
        let contentType = element.mime;
        let contentDeposition = 'inline;filename="' + element.path + '"';
        const base64 = await RNFS.readFile(element.path, 'base64');
        const arrayBuffer = decode(base64);
        let randrom_str = "",
          i = 0,
          min = 0,
          max = 62;
        while (i++ < 12) {
          let r = Math.random() * (max - min) + min << 0;
          randrom_str += String.fromCharCode(this.charValue(r));
        }

        let filename = randrom_str + element.path.split('/').pop().split('?')[0].split('#')[0];
        promises.push(await this.s3upload(s3, this.state.bucketDetails.bucket_name, filename, arrayBuffer, contentDeposition, contentType)
        );
      }

      Promise.all(promises).then((uploadedImgs) => {
        console.log('Yayy, all images are uploaded successfully', uploadedImgs)
        this.AddDetails(uploadedImgs);
      })


    }
  };

  AddDetails = async (content_urls: any) => {
    console.log("inside add details here")
    let media: any = [];
    const authToken = (await getStorageData('authToken', false)) || '';
    const header = {
      "Content-Type": configJSON.postContentType,
      token: authToken
    };
    if (this.props.route.params?.mediadetails?.uri) {
      media = [{
        media_url: content_urls[0],
        media_type: "video",
        audio_url: "",
        title: "",
        artist: "",
        filename: "",
      }];
      if (this.state.audioData?.attributes) {
        console.log(this.state.audioData?.attributes);

        media[0]["audio_url"] = this.state.audioData?.attributes?.audio;
        media[0]["title"] = this.state.audioData?.attributes?.title?.replace(/\./g, '');
        media[0]["artist"] = this.state.audioData?.attributes?.artist;
        media[0]["filename"] = this.state.audioData?.attributes?.filename;
      }
    } else {
      for (let j = 0; j < this.props.route.params?.mediadetails.length; j++) {
        const myArray = this.props.route.params?.mediadetails[j].mime.split("/");
        let data = {
          "media_url": content_urls[j],
          "media_type": myArray[0],
          "audio_url": ""
        }
        media.push(data)
      }
    }
    console.log('MEdia = ', media);

    const timeNow = moment()

    const attrs = {
      post: {
        name: this.state.caption,
        description: "",
        body: this.state.caption,
        location: this.state.location?.description,
        latitude: this.state.latLong?.latitude,
        longitude: this.state.latLong?.longitude,
        visibility_setting: this.state.setvisibility,
        comment_setting: this.state.setcomments,
        audience_setting: this.state.selestaudience,
        post_medias_attributes: media,
        save_post_as: this.state.setSchedule != undefined ? 2 : 0,
        schedule_time: this.state.setSchedule != undefined ? `${this.state.setSchedule} ${"+" + timeNow.toString().split("+")[1]}` : null,
      }
    };
    const attrs2 = {
      post: {
        name: this.state.caption,
        description: "",
        body: this.state.caption,
        location: this.state.location?.description,
        latitude: this.state.latLong?.latitude,
        longitude: this.state.latLong?.longitude,
        visibility_setting: this.state.setvisibility,
        comment_setting: this.state.setcomments,
        audience_setting: this.state.selestaudience,
        post_medias_attributes: media,
        save_post_as: this.state.savePostId,
      }
    }

    this.state.setSchedule != undefined && console.log(attrs.post)


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.addDetailPostAPICallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postGetUrl
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      this.state.setSchedule != undefined ? JSON.stringify(attrs) : JSON.stringify(attrs2)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }


  s3upload = (s3: any, bucketname: any, filename: any, arrayBuffer: any, contentDeposition: any, contentType: any) => {
    return new Promise((resolve, reject) => {
      s3.createBucket(() => {
        const params = {
          Bucket: 'xtokbucket',
          Key: filename,
          Body: arrayBuffer,
          ContentDisposition: contentDeposition,
          ContentType: contentType,
        }

        s3.upload(params, (err: any, data: any) => {
          if (err) {
            console.log('error in callbackyyyy55', err);
          }
          console.log(' s3 upload success');
          resolve(
            data?.Location,
          );


        });

      })
    })
  }


  createPostCreation() {
    if (
      this.state.category_id === "" ||
      this.state.description === "" ||
      this.state.name === "" ||
      this.state.price === ""
    ) {
      this.showAlert("Error", "Please enter all mandatory fields");
    } else {
      this.AddPostCreation();
    }
  }

  flipcamera = () => {
    this.setState({
      cameraType: !this.state.cameraType
    })
  }
  flashcamera = () => {
    if (!this.state.cameraType) return;
    this.deepARRef.current?.setFlashOn(!this.state.isFlashOn);
    this.setState({ isFlashOn: !this.state.isFlashOn })
  }
  handleShowEffects = () => {
    this.setState({ showEffects: !this.state.showEffects });
  }
  changeEffect = (effectName: string) => {
    this.deepARRef?.current?.switchEffect({
      mask: effectName,
      slot: 'effect',
    });
  };
  timermodel = () => {
    this.setState({
      showEffects: false,
      timermodelstatus: !this.state.timermodelstatus,
      selectedTime: 0
    })
  }

  takeVideo0Func = () => {
    let { timerValue, isRecordingStart } = this.state;

    if (this.deepARRef && !this.timerInterval) {

      try {
        if (!isRecordingStart) {
          this.setState({ isRecordingStart: true })
          this.deepARRef.current?.startRecording();
        }
        this.timerInterval = setInterval(() => {
          if (timerValue > this.state.length - 1) {
            this.setState({
              isRecordingStart: false,
              // timerValue: 0,
              timerInterval: 0
            });
            this.stopCameraRecord();
          } else {
            this.setState({ timerValue: ++timerValue });
          }
        }, 1000);
      } catch (e) {
        console.error(e);

      }

    }
  }

  takeVideo = async () => {

    if (this.state.camerastatus == "READY") {
      this.setState({ startOrEnd: !this.state.startOrEnd }, () => {
        if (!this.state.startOrEnd) {
          this.stopCameraRecord();
        }
      });
      this.takeVideo0Func()
    }
  }


  onFinishVideoRecording = (videoPath: any) => {

    this.deepARRef.current?.switchEffect({
      mask: 'clear',
      slot: 'effect',
    })
    let { timerValue } = this.state;
    if (videoPath) {
      this.setState({ isRecording: false });
      this.setState({
        recordedVideo: videoPath,
        recordingFinished: true,
        showEffects: false,
        activeItemIndex: 0
      }, () => {

        let info = {
          id: 1,
          uri: videoPath,
          type: "video",
          duration: timerValue * 1000,
          start: 0,
          end: timerValue * 1000,
          poster: '',
          degree: 0,
          isMuted: false,
          audio: ''
        };
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.setState({
          isRecordingStart: false,
          timerValue: 0,
          timerInterval: 0
        });
        this.props.navigation.navigate("VideoTrimming", { videoData: [info], mediadetails: this.state.mediadetails, bucketdetails: this.state.bucketDetails })
      })

    }
  }

  stopNormalCameraRecord = () => {

    this.camera?.stopRecording();
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.setState({
      isRecordingStart: false,
      timerValue: 0,
      timerInterval: 0
    });
  };

  stopCameraRecord = () => {
    this.deepARRef.current?.finishRecording();
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.setState({
      isRecordingStart: false,
      // timerValue: 0,
      timerInterval: 0
    });
  };
  displayTime(ms: any) {
    let millis = ms * 1000;
    let minutes = Math.floor(millis / 60000);
    let seconds: any = ((millis % 60000) / 1000).toFixed(0);

    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  goToItemDetails(item: any, isEdit: boolean) {
    const msg = new Message(getName(MessageEnum.NavigationMessage));
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationTargetMessage), isEdit ? "PostCreation" : "PostDetails");

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );

    raiseMessage.addData(getName(MessageEnum.PostDetailDataMessage), item);
    msg.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    this.send(msg);
  }

  editNavigation = (item: any) => {
    this.goToItemDetails(item, true);
  };

  navigateToDetails = (item: any) => {
    this.goToItemDetails(item, false);
  };
  configurationApicall = () => {
    this.setState({ isLoading: true })
    const header = {
      "Content-Type": configJSON.postContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.configurationApcallID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getallconfigurationEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  AddPostCreation(): boolean {
    const header = {
      "Content-Type": configJSON.postContentType,
      token: this.state.token
    };

    const attrs = {
      data: {
        attributes: {
          name: this.state.name,
          description: this.state.description,
          price: this.state.price,
          currency: "$",
          category_id: this.state.category_id,
          image: this.state.profileImageData
        }
      }
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.addpostApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postGetUrl
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(attrs)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  setmutes = () => {
    this.setState({ alertModal: { openAlertModal: true, alertMsg: `${!this.state.isMute}` } })
  }
  getAllCategory() {
    const header = {
      "Content-Type": configJSON.postContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    console.log("requestMessage, ", requestMessage);

    this.apiGetCategoryCallID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAllCatergoryEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  getPostData(): boolean {
    console.log("getPostToken ", this.state.token);
    const header = {
      "Content-Type": configJSON.postContentType,
      token: this.state.token
    };
    console.log("header  ", JSON.stringify(header));

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    console.log("requestMessage, ", requestMessage);

    this.apiPostItemCallId = requestMessage.messageId;
    console.log(
      "requestMessage, ",
      getName(MessageEnum.RestAPIResponceEndPointMessage)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postGetUrl
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  searchAccountsByName(name: string) {
    this.setState({ isSuggetionLoading: true })
    const header = {
      "Content-Type": configJSON.postContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiSearchAccount = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.searchAccount}?q=` + name
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  updateCreatePostData(Id: any) {
    if (
      this.state.category_id === "" ||
      this.state.description === "" ||
      this.state.name === "" ||
      this.state.price === ""
    ) {
      this.showAlert("Error", "Please enter all mandatory fields")
      return false;
    } else {
      const header = {
        "Content-Type": configJSON.postContentType,
        token: this.state.token
      };
      const attrs = {
        data: {
          attributes: {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            currency: "$",
            category_id: this.state.category_id,
            image: this.state.profileImageData
          }
        }
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.updatePostApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.postGetUrl + "/" + `${Id}`
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(attrs)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.patchPostAPiMethod
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    }
  }

  deleteRecord(Id: any) {
    Alert.alert(
      "Warning",
      "Are you sure for delete this post?",
      [
        { text: "No", onPress: () => { }, style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            this.setState({ refresh: true });
            this.delete(Id);
          }
        }
      ],
      { cancelable: false }
    );
  }

  delete(Id: any) {
    this.setState({ refresh: true });
    const header = {
      "Content-Type": configJSON.postContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.DeleteApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postGetUrl + "/" + `${Id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deletePostAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    this.getPostData();
    return true;
  }
  async getCurrentUserDetails() {
    const token = await getStorageData("authToken", false)

    const headers = {
      "Content-Type": configJSON.apiContentType, token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.loginUserCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_cflivechallenges/get_logged_in_user_data`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  txtInputProductNameProps = {
    onChangeText: (text: string) => {
      this.setState({ name: text });
      //@ts-ignore
      this.txtInputProductNameProps.value = text;
    }
  };

  txtInputProductDiscripationProps = {
    onChangeText: (text: string) => {
      this.setState({ description: text });
      //@ts-ignore
      this.txtInputProductDiscripationProps.value = text;
    }
  };

  ImageData = {
    onChangeText: (text: string) => {
      this.setState({ image: text });
      //@ts-ignore
      this.ImageData.value = text;
    }
  };

  DropDownProps = {
    onChangeText: (text: string) => {
      this.setState({ category_id: text });
      //@ts-ignore
      this.DropDownProps.value = text;
    }
  };

  txtInputProductPriceProps = {
    onChangeText: (text: string) => {
      this.setState({ price: text });
      //@ts-ignore
      this.txtInputProductPriceProps.value = text;
    }
  };

  chooseImage = () => {
    this.doClickImagePicker();
  };
  doClickMediaPicker = () => {
    Alert.alert("Select Photo/Video", "Select Photo or Video", [
      {
        text: translate("cancel"),
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: translate("Photo"),
        onPress: () => {
          this.doClickImagePicker();
        }
      },
      {
        text: translate("Video"),
        onPress: () => {
          this.doClickVideoPicker();
        }
      }
    ]);
  };

  doClickImagePicker = () => {
    ImageCropPicker.openPicker({
      cropping: false,
      multiple: true,
      mediaType: 'video',
      compressVideoPreset: 'LowQuality',

    }).then(async data => {
      let pickerVideoData = [];
      for (let videoIndex = 0; videoIndex < data.length; videoIndex++) {
        let duration = data[videoIndex].duration ?? 0;
        if (duration <= 90000) {
          let info = {
            id: videoIndex,
            uri: data[videoIndex].path,
            duration: duration,
            type: "video",
            start: 0,
            end: duration,
            poster: '',
            degree: 0,
            isMuted: false,
            audio: ''
          };
          pickerVideoData.push(info);
        }
      }
      if (pickerVideoData.length == 0) {
        this.setState({ alertModal: { openAlertModal: true, alertMsg: "Please select a video less than 90 seconds" } })
        return;
      }
      this.props.navigation.navigate("VideoTrimming", { videoData: pickerVideoData, mediadetails: data, bucketdetails: this.state.bucketDetails })
    });
  };
  doClickVideoPicker = () => {
    ImageCropPicker.openPicker({

      mediaType: "video"
    }).then(data => {
      let info: any = {
        uri: data.path,
        type: data.mime,
        name: data.filename,
        duration: data.duration,
        filename: data.filename
      };
      if (info.duration !== null) {
        if (info.duration <= 90000) {
          //write your statement
        } else {
          this.setState({ alertModal: { openAlertModal: true, alertMsg: "Video is too long.Please try to importing up to 90s video" } })
        }
      } else {
        this.setState({ alertModal: { openAlertModal: true, alertMsg: "something wrong .Please try again" } })
      }
    });
  };
  valueExtractor1 = (val: { data: { attributes: { id: any } } }): any => {
    return val.data.attributes.id;
  };

  onValueHanndler = (val: { data: { attributes: { name: any } } }): any => {
    return val.data.attributes.name;
  };

  handleCatChangeChange = (selectedOption: any) => {
    this.setState({ selectedCategory: selectedOption, category_id: selectedOption.value });
  };

  showClearButton = (index: number) => {
    if (this.state.language === "ar" && Platform.OS === "android") return index == this.carouselData.length - 1;
    return index == 0;
  }
  chooseImage1 = () => {
    ImageCropPicker.openPicker({
      multiple: false,
      mediaType: "photo",
      compressImageQuality: 0.3,
      includeBase64: true,
      cropping: true,
    }).then(async (image: any) => {
      this.setState({
        image: image.sourceURL,
        profileImageData1: {
          uri: image.path,
          name: Platform.OS == "ios" ? image.filename : image.path.slice(image.path.lastIndexOf('/') + 1),
          type: image.mime,
        },
      });
    });
  };

  handleActionButtonOnClick = (actionType: string) => {
    if (actionType == "Flip") {
      this.flipcamera()
    }
  }

  getSplittedArray = (txt: string) => {
    const lastNewLine = txt.lastIndexOf("\n");
    const lastSpace = txt.lastIndexOf(" ");
    if (lastNewLine > lastSpace) {
      return txt.split('\n')
    } else {
      return txt.split(' ')
    }
  }

  // Customizable Area End
}
