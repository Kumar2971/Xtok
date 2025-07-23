import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";
import Share from "react-native-share";
import * as helpers from '../../../framework/src/Helpers'
import { Animated, Platform, Keyboard, Linking, AppState, BackHandler, FlatList, PermissionsAndroid } from "react-native";
import RNFS from 'react-native-fs'
import {
  instagram,
  snapchat,
  whatsapp,
  facebook,
  gmail,
  twitter
} from "./assets";
import React from "react";
import messaging from '@react-native-firebase/messaging';
import FireBaseMessage from './firebaseMessage';
import RNFetchBlob from 'rn-fetch-blob';
import { check, request, PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions';
import { RNToasty } from 'react-native-toasty'
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { translate } from "../../../components/src/i18n/translate";
const { openDatabase } = require("react-native-sqlite-storage");
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: any;
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  commentData: any;
  token: string;
  errorMsg: string;
  loading: boolean;
  comment: string;
  commentsArray: any;
  replyCommentId: any;
  isKeyboardVisible: boolean;
  selectedCommentId: any;
  modalVisible: boolean;
  commentModalVisible: boolean;
  focusButton: boolean;
  commentTyping: boolean;
  commentTypeText: any;
  submitCommentTypeText: any;
  PostData: any;
  isCommentReply: boolean;
  replies: any;
  refreshList: boolean;
  mute: boolean;
  scrollInfo: any;
  selectedReportReason: any,
  page: number;
  last_page: number;
  scrollY: any;
  isAppInstall: any;
  visible: boolean;
  focus: boolean;
  postID: any;
  totalComments: any;
  listOfUsers: any;
  holdReviewOpen: boolean;
  itemURL: any;
  name: any;
  url: any;
  reportModalVisible: boolean;
  totalCommentCount: any;
  commentID: any;
  isFollowing: boolean;
  likedPosts: any;
  liked: any;
  upvoted: any;
  downvoted: any;
  commentLikeCount: any;
  focused: boolean;
  commentLoading: boolean;
  isOpen: boolean;
  isLiked: boolean;
  handlePick: any;
  reportReasons: any
  totalCommentLikes: any;
  selectedAccountList: any[];
  selectedTagsList: any[];
  isShowUserList: boolean;
  isShowTagsList: boolean;
  accountSuggetionList: any[];
  tagsSuggetionList: any[];
  isSuggetionLoading: boolean;
  selectedCommentIndex: number;
  profileData: any;
  voteLoading: boolean
  loader: boolean;
  userAccountId: string;
  deleteCommentModalVisible: boolean;
  selectedCommentIdToBeDeleted: string;
  otherReportReason: string
  selectedItem: any;
  reportModalNotification: boolean
  commentLoaderVisible: boolean
  generatedLink: any;
  holdedComments: any;
  holdedCommentsCount: any;
  holdedCommentId: number | string
  language: any;
  alertModal: any;
  total_page: number
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class CommentController extends BlockComponent<Props, S, SS> {
  apiCommentItemCallId: string = "";
  commentApiCallId: string = "";
  createCommentId: string = "";
  likeCommentId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.database = openDatabase({ name: "gift_asset" });
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    this.state = {
      scrollY: new Animated.Value(0),
      commentData: [],
      holdedCommentId: "",
      holdedComments: [],
      holdedCommentsCount: 0,
      errorMsg: "",
      otherReportReason: "",
      token: "",
      selectedReportReason: null,
      isKeyboardVisible: false,
      selectedCommentId: "",
      totalCommentLikes: 0,
      loading: false,
      reportModalNotification: false,
      isFollowing: false,
      isCommentReply: false,
      comment: "",
      commentsArray: [],
      replyCommentId: null,
      modalVisible: false,
      commentModalVisible: false,
      replies: [],
      focusButton: false,
      commentTyping: false,
      commentTypeText: "",
      submitCommentTypeText: '',
      PostData: [],
      reportModalVisible: false,
      refreshList: true,
      mute: false,
      reportReasons: {},
      scrollInfo: { isViewable: true, index: 0 },
      page: 1,
      last_page: 1,
      isAppInstall: [],
      visible: false,
      focus: false,
      postID: "",
      totalComments: [],
      listOfUsers: [],
      itemURL: "",
      likedPosts: [],
      name: "",
      url: "",
      totalCommentCount: "",
      commentID: "",
      liked: false,
      upvoted: false,
      holdReviewOpen: false,
      downvoted: false,
      commentLikeCount: "0",
      focused: false,
      isOpen: false,
      isLiked: false,
      handlePick: '',
      accountSuggetionList: [],
      selectedAccountList: [],
      selectedTagsList: [],
      isShowUserList: false,
      isShowTagsList: false,
      isSuggetionLoading: false,
      selectedCommentIndex: -1,
      profileData: {},
      voteLoading: false,
      loader: false,
      generatedLink: '',
      userAccountId: '',
      commentLoading: false,
      deleteCommentModalVisible: false,
      selectedCommentIdToBeDeleted: '',
      commentLoaderVisible: false,
      selectedItem: {},
      tagsSuggetionList: [],
      language: "",
      alertModal: {
        openAlertModal: false,
        alertMsg: "",
      },
      total_page: 1
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.props.navigation.addListener("focus", () => {
      this.setState({ page: 1 })
    });
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    } else {
      this.getToken();
    }
    // Customizable Area Start
    const selfUserId = await getStorageData('userID')
    const language = await getStorageData("SelectedLng");
    const getGiftAsset = await getStorageData('getGiftAssets');
    if (getGiftAsset === "true") {
      this.refreshGiftAssetTable();
    }
    this.setState({ userAccountId: selfUserId, language: language })
    this.newFunCall()

    this.press();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.getListOfUser();
    const authToken = (await getStorageData('authToken', false)) || '';

    this.navigationParamFunc()

    this.props.navigation.addListener('focus', () => {
      const info = {
        isViewable: true,
        index: 0,
      };

      this.setState({
        refreshList: true, PostData: [],
        scrollInfo: info, loader: true,
      })
      this.navigationParamFunc()
    })


    this.fetchReportReasons()
    this.props.navigation.addListener('blur', () => {
      this.setState({
        loader: true,
        scrollInfo: { isViewable: true, index: 0 },
      })

      if (this.props.route.params?.type === "SearchActivity") {
        this.props.navigation.setParams({
          type: null,
          page: 1,
        })
      }
    })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    this.messageComponent();
    this.checkToken();


    messaging().onMessage(async (remoteMessage) => { //snapshot listener

    })
    // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson.errors) {
        this.apiResponseSuccess(apiRequestCallId, responseJson)
      } else if (responseJson?.errors) {
        switch (apiRequestCallId) {
          case this.unlikeDeleteApiCallId:
            break;
          case this.unBookMarkId:
            break;
          case this.likePostAPICallId:
            break;
          case this.getHoldedCommentsApiId:
            console.log("getHoldedCommentsApiId", responseJson);
            break;
          case this.approveCommentApiId:
          case this.rejectCommentApiId:
            console.log("approveCommentApiId/rejectCommentApiId", responseJson);
            RNToasty.Show({
              title: 'Something went wrong, please try again later',
            });
            break;
          case this.deleteCommentAPIEndPointId:
            break;
          case this.reportPostId:
            break;
          case this.createCommentAPICallId:
            this.createCommentFailureCallBack(responseJson);
            break;
          case this.deleteCommentAPICallId:
            this.deleteCommentFailureCallBack(responseJson);
            break;
          case this.putFcmToken:
            this.updateFcmTokenFailureCallBack(responseJson);
            break;
          case this.showCreateCommentAPICallId:
            this.showCreateCommentFailureCallBack(responseJson);
            break;
          case this.getListOfUserAPICallId:
            this.getListOfUserFailureCallBack(responseJson);
            break;
          case this.getTotalCommentpostAPICallId:
            this.getTotalCommentpostAPICallIdFailureCallBack(responseJson);
            break;
          case this.likeCommentpostAPICallId:
            this.likeCommentpostAPICallIdFailureCallBack(responseJson);
            break;
          case this.dislikeCommentpostAPICallId:
            this.dislikeCommentpostAPICallIdFailureCallBack(responseJson);
            break;
          case this.getUserPostsApiId:
            console.log(responseJson.errors);
            break;
          case this.apiSearchAccount:
          case this.apiSearchTags:
            console.log('errors from mention', responseJson);
            break;
          case this.apiPostFollowingItemCallId:
          case this.getBookMarkedPostsAPI:
            this.setState({
              PostData: [],
              last_page: 1,
              loader: false,
              refreshList: false
            });
            break;
          default:
          // Handle the case when apiRequestCallId doesn't match any of the above cases
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  database: any = null;
  getAllGiftsDataApiId: { catId: string, apiId: string }[] = [];
  getcategoryApiCallId: string = "";
  navigationParamFunc = () => {
    switch (this.props.route.params?.type) {
      case 'LikeActivity':
        this.getLikesPosts();
        break;
      case 'NotInterestedActivity':
        this.getNotInterestedPosts();
        break;
      case 'SavedActivity':
        this.getSavedPosts();
        break;
      case 'SearchActivity':
        this.getSearchedPosts();
        break;
      case 'Notification':
        this.getNotificationPost();
        break;
      case 'bookmark':
        this.getBookMarkedPosts();
        break;
      case 'post':
        this.getUserPosts();
        break;
      case 'profile':
        if (this.state.isFollowing) {
          this.getFollowingData();
        } else {
          this.getPostData();
        }
        break;
      default:
        this.defaultFuncCall()
    }
  }

  onEndreachedComments = () => {
    if (this.state.page < this.state.total_page) {
      this.setState({
        page: this.state.page + 1,
      }, () => {
        this.showCreateComment()
        this.getTotalCommentpost()
      })
    }
  }

  apiResponseSuccess = (apiRequestCallId: any, responseJson: any) => {
    this.handleAllGift(responseJson, apiRequestCallId)
    switch (apiRequestCallId) {
      case this.createCommentAPICallId: {
        this.createCommentApiSuccess(responseJson)
        break;
      }
      case this.getcategoryApiCallId: {
        if (responseJson.data?.length > 0) {
          this.storeCategoryDetails(responseJson.data);
          responseJson.data.forEach((item: any) => {
            this.getCatloge(item?.id)
          });
        }
        break;
      }
      case this.getHoldedCommentsApiId: {
        this.getHoldedCommentsApiCall(responseJson)
        break;
      }
      case this.approveCommentApiId: {
        this.approveCommentApiCall(responseJson)
        break;
      }
      case this.rejectCommentApiId: {
        this.rejectCommentApiCall(responseJson)
        break;
      }
      case this.deleteCommentAPICallId: {
        this.deleteCommentSucessCallBack(responseJson);
        break;
      }
      case this.putFcmToken: {
        this.updateFcmTokenSucessCallBack(responseJson);
        break;
      }
      case this.createCommentReplyAPICallId: {
        this.setState({
          commentLoading: false,
        });
        this.createCommentReplySucessCallBack(responseJson);
        break;
      }
      case this.unBookMarkId: {
        if (this.props.route.params.type && this.props.route.params.type === 'bookmark') {
          this.props.navigation.navigate("UserProfileBasicBlock");
        }
        break;
      }
      case this.showCreateCommentAPICallId: {
        this.setState({ totalComments: [] }, () => {
          this.showCreateCommentSucessCallBack(responseJson);
        })
        break;
      }
      case this.getTotalCommentLikesAPICallId: {
        this.getTotalCommentLikesSucessCallBack(responseJson);
        break;
      }
      case this.getListOfUserAPICallId: {
        this.getListOfUserAPICallIdSucessCallBack(responseJson);
        break;
      }
      case this.notInterestedCallId:
        this.notInterestedApiCall(responseJson)
        break;

      case this.markNotInterestedApiCallId: {
        this.setState(
          {
            modalVisible: false,
          },
          () => {
            this.setState({
              ...this.state,
              PostData: this.state.PostData.filter(
                (item: any) => item.id !== this.state.PostData[this.state.scrollInfo.index].id
              ),
            });
          }
        );
        break;
      }
      case this.notNotInterestedApiCallId: {
        this.notNotInterestedApiCall(responseJson)
        break;
      }
      case this.deleteCommentAPIEndPointId: {
        this.deleteCommentAPICallIdSucessCallBack(responseJson);
        this.setState({ alertModal: { openAlertModal: true, alertMsg: "Comment deleted successfully" } });
        break;
      }
      case this.getTotalCommentpostAPICallId: {
        this.getTotalCommentpostAPICallIdSucessCallBack(responseJson);
        break;
      }
      case this.getCommentRepliesAPICallId: {
        this.getRepliesSuccessCallBack(responseJson);
        break;
      }
      case this.getProfileDataID: {
        this.getProfileDataSuccessCallBack(responseJson);
        break;
      }
      case this.likeCommentpostAPICallId: {
        this.likeCommentpostAPICallIdSucessCallBack(responseJson);
        break;
      }
      case this.dislikeCommentpostAPICallId: {
        this.dislikeCommentpostAPICallIdSucessCallBack(responseJson);
        break;
      }
      case this.likePostAPICallId: {
        this.likePostApiCall(responseJson)
        break;
      }
      default:
        this.apiSuccessCallDefault(apiRequestCallId, responseJson)
        break;
    }
  }

  apiSuccessCallDefault = (apiRequestCallId: any, responseJson: any) => {
    switch (apiRequestCallId) {
      case this.unlikeDeleteApiCallId: {
        this.unlikeDeleteApiCall(responseJson)
        break;
      }
      case this.reportReasonsId: {
        this.getReportReasonsList(responseJson);
        break;
      }
      case this.apiPostItemCallId: {
        this.apiPostSuccessApi(responseJson)
        break;
      }
      case this.apiPostFollowingItemCallId: {
        this.apiPostFollowingItemCall(responseJson)
        break;
      }
      case this.getBookMarkedPostsAPI: {
        this.commonResponseFunc(responseJson)
        break;
      }
      case this.getUserPostsApiId: {
        this.getUserPostsApiCall(responseJson)
        break;
      }
      case this.getSavedPostsCallId: {
        this.commonResponseFunc(responseJson)
        break;
      }
      case this.getSearchedPostsCallId: {
        this.getSearchedPostsCall(responseJson)
        break;
      }
      case this.getNotificationPostsCallId: {
        this.getNotificationPostsCall(responseJson)
        break;
      }
      case this.getLikesPostsCallId: {
        this.commonResponseFunc(responseJson)
        break;
      }
      case this.apiSearchAccount: {
        this.searchAccountApiCall(responseJson)
        break;
      }
      case this.apiSearchTags: {
        this.searchTagListApiCall(responseJson)
        break;
      }
      default:
        // Handle other cases if needed
        break;
    }
  }

  searchAccountApiCall = (responseJson: any) => {
    this.setState({ isSuggetionLoading: false })
    if (responseJson) {
      if (responseJson.account.length > 0) {
        this.setState({ isShowUserList: true, accountSuggetionList: responseJson.account })
      } else {
        this.setState({ isShowUserList: false, accountSuggetionList: [] })
      }
    }
  }

  searchTagListApiCall = (responseJson: any) => {
    this.setState({ isSuggetionLoading: false })
    if (responseJson) {
      if (responseJson.post.data.length > 0) {
        this.setState({ isShowTagsList: true, tagsSuggetionList: responseJson.post.data })
      } else {
        this.setState({ isShowTagsList: false, tagsSuggetionList: [] })
      }
    }
  }

  notNotInterestedApiCall = (responseJson: any) => {
    this.setState(
      {
        modalVisible: false,
      },
      () => {
        this.setState({
          ...this.state,
          PostData: this.state.PostData.filter(
            (item: any) => item.id !== this.state.PostData[this.state.scrollInfo.index]?.id
          ),
        });
      }
    );
  }

  likePostApiCall = (responseJson: any) => {
    const toBeUsed = this.state.PostData.map((item: any, index: number) =>
      index === this.state.scrollInfo.index
        ? {
          ...item,
          attributes: {
            ...item.attributes,
            post_likes_count:
              this.state.PostData[this.state.scrollInfo.index]?.attributes.post_likes_count + 1,
          },
          liked: true,
        }
        : item
    );
    this.setState({ PostData: toBeUsed });
  }

  createCommentApiSuccess = (responseJson: any) => {
    this.setState({
      commentLoading: false,
    });
    this.createCommentSucessCallBack(responseJson);
    const toBeUsed = this.state.PostData.map((item: any, index: number) =>
      index === this.state.scrollInfo.index
        ? {
          ...item,
          attributes: {
            ...item.attributes,
            post_comment_count:
              this.state.PostData[this.state.scrollInfo.index].attributes.post_comment_count + 1,
          },
          liked: true,
        }
        : item
    );
    this.setState({ PostData: toBeUsed });
    this.showCreateComment();
  }

  getHoldedCommentsApiCall = (responseJson: any) => {
    console.log("pressed and waiting");
    this.setState({
      loader: false,
      holdedComments: [...this.state.holdedComments, ...responseJson.data],
    });
  }

  onEndreachedHoldedComments = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.getHoldedComments()
    })
  }

  approveCommentApiCall = (responseJson: any) => {
    this.setState({
      loader: false,
      holdedComments: this.state.holdedComments.filter(
        (item: any) => item.attributes.id.toString() !== this.state.holdedCommentId.toString()
      ),
    });
    this.getHoldedComments();
    this.showCreateComment();
    this.getTotalCommentpost();
  }

  rejectCommentApiCall = (responseJson: any) => {
    this.setState({
      loader: false,
      holdedComments: this.state.holdedComments.filter(
        (item: any) => item.attributes.id.toString() !== this.state.holdedCommentId?.toString()
      ),
    });
    this.getHoldedComments();
    this.showCreateComment();
    this.getTotalCommentpost();
  }

  likeByCurrentUser = (data: any, last_page: any) => {
    let data2 = data.map((item: any) =>
      item?.attributes?.is_like_by_current_user
        ? { ...item, liked: true }
        : { ...item, liked: false }
    ) || [];
    this.setState({
      PostData: data ? [...this.state.PostData, ...data2] : [],
      last_page: last_page ? parseInt(last_page) : 1,
      loader: false,
      refreshList: false,
    });
  }

  notInterestedApiCall = (responseJson: any) => {
    this.createCommentSucessCallBack(responseJson);
    this.commonResponseFunc(responseJson)
  }

  unlikeDeleteApiCall = (responseJson: any) => {
    const toBeUsed = this.state.PostData.map((item: any, index: number) =>
      index === this.state.scrollInfo.index
        ? {
          ...item,
          attributes: {
            ...item.attributes,
            post_likes_count:
              this.state.PostData[this.state.scrollInfo.index]?.attributes.post_likes_count - 1,
          },
          liked: false,
        }
        : item
    );
    this.setState({ PostData: toBeUsed });
  }

  commonResponseFunc = (responseJson: any) => {
    let data = responseJson.data;
    let last_page = responseJson?.meta.pagination.total_pages
      ? responseJson.meta.pagination.total_pages
      : 1;
    if (this.state.page === 1) {
      this.getTotalCommentpost();
      this.setState({
        PostData: data.map((item: any) =>
          item?.attributes?.is_like_by_current_user
            ? { ...item, liked: true }
            : { ...item, liked: false }
        ) || [],
        last_page: last_page ? parseInt(last_page) : 1,
        refreshList: false,
        loader: false,
      });
    } else {
      this.getTotalCommentpost();
      this.likeByCurrentUser(data, last_page)
    }
  }

  apiPostSuccessApi = (responseJson: any) => {
    this.createCommentSucessCallBack(responseJson);
    this.commonResponseFunc(responseJson)
  }

  apiPostFollowingItemCall = (responseJson: any) => {
    this.createCommentSucessCallBack(responseJson);
    this.commonResponseFunc(responseJson)
  }

  postDataFunc = (data: any, last_page: any) => (
    this.setState({
      PostData: data.map((item: any) =>
        item?.attributes?.is_like_by_current_user
          ? { ...item, liked: true }
          : { ...item, liked: false }
      ) || [],
      last_page: last_page ? parseInt(last_page) : 1,
      refreshList: false,
      loader: false,
    })
  )

  totalCommentData = () => {
    if (
      this.props.route.params.isFromNotification
      && this.props.route.params.isCommentPost
      && this.state.commentModalVisible === false
    ) {
      setTimeout(() => {
        this.setState({
          commentModalVisible: true,
          focusButton: true,
          postID: this.state.PostData[this.state.scrollInfo.index].id,
          refreshList: false,
          loader: false
        }, () => {
          return (
            this.showCreateComment(), this.getTotalCommentpost()
          )
        })
      }, 1500);
    } else {
      this.setState({ refreshList: false, loader: false })
      this.getTotalCommentpost()
    }
  }

  getUserPostsApiCall = (responseJson: any) => {
    this.createCommentSucessCallBack(responseJson);
    const data = responseJson.data;
    console.log("data", data)
    if (typeof (data[0]) === 'string') {
      this.setState({ PostData: [], last_page: 1, refreshList: false, loader: false, })
    } else {
      let last_page = responseJson?.meta?.pagination.total_pages ? responseJson.meta.pagination.total_pages : 1
      if (this.state.page === 1) {
        this.getTotalCommentpost()
        this.postDataFunc(data, last_page)
        this.totalCommentData()
      } else {
        this.likeByCurrentUser(data, last_page)
        if (
          this.props.route.params.isFromNotification
          && this.props.route.params.isCommentPost
          && this.state.commentModalVisible === false
        ) {
          setTimeout(() => {
            this.setState({
              commentModalVisible: true,
              focusButton: true,
              postID: this.state.PostData[this.state.scrollInfo.index].id,
              refreshList: false,
              loader: false
            }, () => {
              return (
                this.showCreateComment(),
                this.getTotalCommentpost()
              )
            })
          }, 1500);
        } else {
          this.setState({ refreshList: false, loader: false })
          this.getTotalCommentpost()
        }
      }
    }
  }

  getNotificationPostsCall = (responseJson: any) => {
    const data = [];
    data.push(responseJson.data);
    this.getTotalCommentpost();
    this.setState({
      PostData: data.map((item: any) =>
        item?.attributes.is_like_by_current_user
          ? { ...item, liked: true }
          : { ...item, liked: false }
      ) || [],
      refreshList: false,
      loader: false,
    });
    if (this.props.route.params?.isCommentPost && this.state.commentModalVisible === false) {
      setTimeout(() => {
        this.setState(
          {
            commentModalVisible: true,
            focusButton: true,
            postID: this.state.PostData[this.state.scrollInfo.index]?.id,
            refreshList: false,
            loader: false,
          },
          () => {
            this.showCreateComment()
            this.getTotalCommentpost()
          }
        );
      }, 1500);
    } else {
      this.setState({ refreshList: false, loader: false });
      this.getTotalCommentpost();
    }
  }

  getSearchedPostsCall = (responseJson1: any) => {
    const data1 = [];
    let last_page = responseJson1?.meta?.pagination?.total_pages
      ? responseJson1.meta.pagination.total_pages
      : 1;
    if (Array.isArray(responseJson1.data)) {
      const resData = responseJson1.data;
      resData.map((_iii: any) => data1.push(_iii));
    } else {
      data1.push(responseJson1.data);
    }

    if (this.state.page === 1) {
      this.getTotalCommentpost();
      this.setState({
        PostData: data1.map((item: any) =>
          item?.attributes?.is_like_by_current_user
            ? { ...item, liked: true }
            : { ...item, liked: false }
        ) || [],
        last_page: last_page ? parseInt(last_page) : 1,
        refreshList: false,
        loader: false,
      });
    } else {
      this.getTotalCommentpost();
      this.likeByCurrentUser(data1, last_page)
    }
  }

  defaultFuncCall = () => {
    if (this.state.isFollowing) {
      this.getFollowingData();
    } else {
      this.getPostData();
    }
  }

  newFunCall = () => {
    this.getProfileData()
    // this.requestToPermissions()
    this.updateFcmToken()
    AppState.addEventListener('change', nextAppState => {
      if (
        nextAppState === 'active'
      ) {
        this.registerAppOpen();
      } else {
        this.registerAppClose()
      }
    });
  }

  flatListRef = React.createRef<FlatList<any>>();
  reportFlatListRef = React.createRef<FlatList<any>>();
  BASE_LOCAL_PATH_TO_VIDEO = Platform.OS === "ios" ? `${RNFS.DocumentDirectoryPath}` : `${RNFS.ExternalDirectoryPath}`
  createCommentAPICallId: string = "";
  deleteCommentAPICallId: string = "";
  deleteCommentAPIEndPointId: string = "";
  reportReasonsId: string = "";
  showCreateCommentAPICallId: string = "";
  apiPostItemCallId: string = "";
  getUserPostsApiId: string = "";
  getSavedPostsCallId: string = "";
  getSearchedPostsCallId: string = "";
  getNotificationPostsCallId: string = "";
  getLikesPostsCallId: string = "";
  putFcmToken: string = "";
  getListOfUserAPICallId: string = "";
  notInterestedCallId: string = "";
  getTotalCommentpostAPICallId: string = "";
  getCommentRepliesAPICallId: string = "";
  notNotInterestedApiCallId: string = "";
  markNotInterestedApiCallId: string = "";
  apiPostFollowingItemCallId: string = "";
  getBookMarkedPostsAPI: string = "";
  createCommentReplyAPICallId: string = "";
  unBookMarkId: string = "";
  reportPostId: string = "";
  likeCommentpostAPICallId: string = "";
  dislikeCommentpostAPICallId: string = "";
  likePostAPICallId: string = "";
  unlikeDeleteApiCallId: string = "";
  getTotalCommentLikesAPICallId: string = "";
  registerAppOpenCallId: string = "";
  registerAppCloseCallId: string = "";
  getProfileDataID: string = "";
  apiSearchAccount: string = "";
  getHoldedCommentsApiId: string = "";
  approveCommentApiId: string = "";
  rejectCommentApiId: string = "";
  apiSearchTags: any;
  timerForSearch: any
  async componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  async componentWillMount() {
    Keyboard.addListener('keyboardDidShow', () => { this.setState({ isKeyboardVisible: true }) });
    Keyboard.addListener('keyboardDidHide', () => { this.setState({ isKeyboardVisible: false }) });
  }
  sharePost = async () => {
    //@ts-ignore
    const url = `${helpers.returnS3URL()}/minio/sbucket/GvxuyDPGe7Kygreenary.mp4`;
    const title = "Awesome Contents";
    const message = "Please check this out.";
    const postId = this.state.PostData[this.state.scrollInfo?.index];


    const options: any = {
      title,
      url,
      message,
      image: postId?.attributes?.post_medias?.thumnails[0],
    };

    this.setState({ modalVisible: true })

  }
  press = async () => {
    let application = [
      { name: "Whatsapp", packageName: "com.whatsapp", icon: whatsapp, social: Share.Social.WHATSAPP, link: 'whatsapp://' },
      { name: "Instagram", packageName: "com.instagram.android", icon: instagram, social: Share.Social.INSTAGRAM, link: 'instagram://' },
      { name: "Twitter", packageName: "com.twitter.android", icon: twitter, social: Share.Social.TWITTER, link: 'twitter://' },
      { name: "Gmail", packageName: "com.google.android.gm", icon: gmail, social: Share.Social.EMAIL, link: 'gmail://' },
      { name: "Facebook", packageName: "com.facebook.katana", icon: facebook, social: Share.Social.FACEBOOK, link: 'fb://' },
      { name: "Snapchat", packageName: "com.snapchat.android", icon: snapchat, social: Share.Social.SNAPCHAT, link: 'snapchat://' },
    ]

    try {
      if (this.isPlatformiOS()) {
        try {
          const installedApps = await Promise.all(application.map(async (item: any, index: number) => {
            const isInstalled = await Linking.canOpenURL(item.link)
            return { isInstall: isInstalled, packageName: item?.packageName, icon: item.icon, name: item.name, social: item.social }
          })
          )
          this.setState({ isAppInstall: installedApps })
        } catch (err) {
          console.log({ err })
        }

      } else {
        const installedApps =
          await Promise.all(application.map(async (item: any) => {
            const res = await Share.isPackageInstalled(item.packageName);
            return { isInstall: true, packageName: item?.packageName, icon: item.icon, name: item.name, social: item.social }
          }))

        this.setState({ isAppInstall: installedApps })
      }
      // use this link for documentation
      // https://react-native-share.github.io/react-native-share/docs/share-single
    } catch (error) {
      console.log({ error })
    }


  };
  selectReportReason = (value: any) => {
    this.setState({ selectedReportReason: value })
  }

  changeOtherReportReason = (text: string) => {
    this.setState({ otherReportReason: text })
  }
  reportPost = async () => {
    const postId = this.state.PostData[this.state.scrollInfo.index]?.id;
    this.reportPostId = await this.apiCallData({
      contentType: configJSON.commentsContentType,
      method: configJSON.commentPOSTAPiMethod,
      endPoint: configJSON.reportPostEndpoint,
      body: {
        id: postId,
        reason: this.state.selectedReportReason,
        description: this.state.otherReportReason
      },
    }).finally(() => {
      this.setState({ reportModalVisible: false, otherReportReason: "", selectedReportReason: "" })
    })
  }
  async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<S>, snapshot?: SS | undefined) {
    if (this.state.selectedReportReason == 6) {
      this.reportFlatListRef?.current?.scrollToEnd()
    }

    switch (this.props.route.params.type) {
      case "bookmark":
        if (!prevProps.route.params.type) {
          this.setState({ page: 1, PostData: [] }, () => {
            this.getBookMarkedPosts();
          });
        }
        break;

      case "LikeActivity":
        if (!prevProps.route.params.type) {
          this.setState({ page: 1, PostData: [] }, () => {
            this.getLikesPosts();
          });
        }
        break;

      case "NotInterestedActivity":
        if (!prevProps.route.params.type) {
          this.setState({ page: 1, PostData: [] }, () => {
            this.getNotInterestedPosts();
          });
        }
        break;

      case "SavedActivity":
        if (!prevProps.route.params.type) {
          this.setState({ page: 1, PostData: [] }, () => {
            this.getSavedPosts();
          });
        }
        break;

      case "SearchActivity":
        if (!prevProps.route.params.type) {
          this.setState({ page: 1, PostData: [] }, () => {
            this.getSearchedPosts();
          });
        }
        break;

      case "Notification":
        if (!prevProps.route.params.type) {
          this.setState({ page: 1, PostData: [] }, () => {
            this.getNotificationPost();
          });
        }
        break;

      default:
        this.defaultFunc(prevProps)
        break;
    }

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  defaultFunc = (prevProps: any) => {
    if (
      prevProps?.route?.params?.type !== this.props?.route?.params?.type ||
      this.props.route.params.account_id !== prevProps.route.params.account_id
    ) {
      if (this.props.route.params.account_id !== prevProps.route.params.account_id) {
        this.getUserPostFunc();
      } else if (this.props.route.params.type && !prevProps.route.params.type) {
        this.getUserPostFunc();
      } else if (!this.props.route.params.type && prevProps.route.params.type) {
        this.setState({ page: 1, PostData: [] }, () => {
          if (this.state.isFollowing) {
            this.getFollowingData();
          } else {
            this.getPostData();
          }
        });
      }
    }
  }

  getUserPostFunc = () => {
    this.setState({ page: 1, PostData: [] }, () => {
      this.getUserPosts()
    })
  }

  async updateFcmToken() {
    const token = await getStorageData("authToken");
    const fcmToken = await getStorageData('fcmToken')
    const header = {
      "Content-Type": 'application/json',
      "token": token
    };

    const httpBody = {
      chat: {
        muted: true
      }
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.putFcmToken = requestMessage.messageId;
    console.log("--------************----", fcmToken)
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `account_block/update_fcm_token?device_id=${fcmToken}`
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
      "PUT"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  getUserPosts = async () => {
    console.log('get user posts')

    this.setState({
      loader: true
    })
    const authToken = await getStorageData('authToken', false)
    const userID = this.props.route.params.account_id
    const header = {
      "Content-Type": configJSON.postContentType,
      token: authToken
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getUserPostsApiId = requestMessage.messageId;
    // console.log("$$$$$$$$$$$$$$$$",`${configJSON.getUsersPosts}?account_id=${userID}&post_id=${this.props.route.params.post_id}&per_page=50&page=${this.state.page}`)

    const postUrl = `${configJSON.getUsersPosts}?account_id=${userID}&post_id=${this.props.route.params.post_id}&per_page=50&page=${this.state.page}`

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      postUrl
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  getHoldedComments = async () => {
    console.log('get holded comments')
    this.setState({
      loader: true
    })
    const authToken = await getStorageData('authToken', false)
    const header = {
      "Content-Type": configJSON.postContentType,
      token: authToken
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.getHoldedCommentsApiId = requestMessage.messageId

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getApproveList}${this.state.postID}&page=${this.state.page}&per_page=10`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  rejectComment = async (commentID: string | number) => {
    this.setState({
      loader: true
    })

    const authToken = await getStorageData('authToken', false)
    const header = {
      "Content-Type": configJSON.postContentType,
      token: authToken
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.rejectCommentApiId = requestMessage.messageId

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.rejectComment}${commentID}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "DELETE"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;

  }

  approveComment = async (commentID: string | number) => {
    this.setState({
      loader: true
    })

    const authToken = await getStorageData('authToken', false)
    const header = {
      "Content-Type": configJSON.postContentType,
      token: authToken
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.approveCommentApiId = requestMessage.messageId

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.approveComment}${commentID}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "PATCH"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;

  }

  getBookMarkedPosts = async () => {
    this.setState({
      loader: true
    })
    const authToken = await getStorageData('authToken')

    const header = {
      "Content-Type": configJSON.postContentType,
      token: authToken
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getBookMarkedPostsAPI = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_posts/posts/bookmark_posts?per_page=50&post_id=${this.props.route.params.post_id}&page=${this.state.page}&sort=newest`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  getLikesPosts = async () => {
    this.setState({
      loader: true
    })
    const authToken = await getStorageData('authToken', false)
    const userID = this.props.route.params.account_id
    const header = {
      "Content-Type": configJSON.postContentType,
      token: authToken
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getLikesPostsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_settings/likes_activity?filter=newest?per_page=50&page=${this.state.page}&post_id=${this.props.route.params.post_id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  getNotInterestedPosts = async () => {
    this.setState({
      loader: true,
      modalVisible: false
    })
    const authToken = await getStorageData('authToken', false)
    const userID = this.props.route.params.account_id
    const header = {
      "Content-Type": configJSON.postContentType,
      token: authToken
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.notInterestedCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_share/not_interest?sort=newest&post_id=${this.props.route.params.post_id}&per_page=50&page=${this.state.page}`
    );


    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  getSavedPosts = async () => {
    this.setState({
      loader: true
    })
    const authToken = await getStorageData('authToken', false)
    const userID = this.props.route.params.account_id
    const header = {
      "Content-Type": configJSON.postContentType,
      token: authToken
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getSavedPostsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_posts/posts/bookmark_posts?per_page=50&post_id=${this.props.route.params.post_id}&page=${this.state.page}&sort=newest`
    );


    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  getSearchedPosts = async () => {
    this.setState({
      loader: true
    })
    const authToken = await getStorageData('authToken', false)
    const userID = this.props.route.params.account_id
    const header = {
      "Content-Type": configJSON.postContentType,
      token: authToken
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getSearchedPostsCallId = requestMessage.messageId;

    let url = `/bx_block_posts/posts/${this.props.route.params.post_id}`;
    const isSearchFrom = this.props.route.params?.isSearchFrom
    const searchItem = this.props.route.params?.searchItem
    const postId = this.props.route.params.post_id

    if (isSearchFrom && searchItem && postId) {
      if (isSearchFrom === 'hashtag_top') {
        url = `bx_block_posts/posts/hashtag_posts_scroll/${searchItem}?hashtag_post_type=top_post&post_id=${postId}&page=${this.state.page}`
      } else if (isSearchFrom === 'hashtag_trending') {
        url = `bx_block_posts/posts/hashtag_posts_scroll/${searchItem}?hashtag_post_type=hashtag_trending_posts&post_id=${postId}&page=${this.state.page}`
      } else if (isSearchFrom === 'hashtag_recent') {
        url = `bx_block_posts/posts/hashtag_posts_scroll/${searchItem}?post_id=${postId}&page=${this.state.page}`
      } else if (isSearchFrom === 'location_top') {
        url = `bx_block_posts/posts/top_location_post_scroll?location=${searchItem}&post_id=${postId}&page=${this.state.page}`
      } else if (isSearchFrom === 'location_trending') {
        url = `bx_block_posts/posts/trending_location_post_scroll?location=${searchItem}&post_id=${postId}&page=${this.state.page}`
      } else if (isSearchFrom === 'location_recent') {
        url = `bx_block_posts/posts/recent_location_post_scroll?location=${searchItem}&post_id=${postId}&page=${this.state.page}`
      }
    }

    console.log('**********  ==========  **********');
    console.log('URL FOR SEARCH :: ' + JSON.stringify(url));
    console.log('**********  ==========  **********');

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), url);

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  getNotificationPost = async () => {
    this.setState({
      loader: true
    })

    console.log("NOTIFICATION POST ID :: " + this.props.route.params.post_id);
    const authToken = await getStorageData('authToken', false)
    const userID = this.props.route.params.account_id
    const header = {
      "Content-Type": configJSON.postContentType,
      token: authToken
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getNotificationPostsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_posts/posts/${this.props.route.params.post_id}`
    );


    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  async getPostData(isFetch?: boolean, pageCount?: number) {
    if (!isFetch) {
      this.setState({
        loader: true,
        refreshList: true
      })
    }
    const authToken = await getStorageData('authToken')

    const header = {
      "Content-Type": configJSON.postContentType,
      token: authToken
    };



    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiPostItemCallId = requestMessage.messageId;
    console.log(";;;;;;;;;;;;;;;;;;//////////////////////", pageCount)
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "/bx_block_posts/posts/trending_post?per_page=9&page=" + pageCount ?? this.state.page
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  async getFollowingData() {
    this.setState({
      loader: true
    })
    const authToken = await getStorageData('authToken')

    const header = {
      "Content-Type": configJSON.postContentType,
      token: authToken
    };



    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiPostFollowingItemCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "/bx_block_posts/posts/following_posts?page=" + this.state.page
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  async searchAccountsByName(name: string) {
    const authToken = await getStorageData('authToken')

    this.setState({ isSuggetionLoading: true })
    const header = {
      "Content-Type": configJSON.postContentType,
      token: authToken
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


  apiCallData = async (data: any) => {
    const authToken = await getStorageData('authToken')
    const { contentType, method, endPoint, body, type } = data;
    const header = {
      "Content-Type": contentType,
      token: authToken,
    };
    const apiRequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    apiRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    apiRequestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    apiRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    body && type != 'formData' ?
      apiRequestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      )
      :
      apiRequestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );
    runEngine.sendMessage(apiRequestMessage.id, apiRequestMessage);
    return apiRequestMessage.messageId;
  };
  closeReportModal = () => {
    this.setState({
      reportModalNotification: false
    })
  }
  getCommentReplies = async (id: string) => {
    this.getCommentRepliesAPICallId = await this.apiCallData({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_comments/replies?id=${id}`,
      body: "",
    });
  }

  deleteCommentCall = async (id: string) => {
    this.deleteCommentAPIEndPointId = await this.apiCallData({
      contentType: "application/json",
      method: "DELETE",
      endPoint: `bx_block_comments/comments?id=${id}`,
      body: "",
    })
  }

  replyButtonPress = (item: any, index: number) => {
    this.getCommentReplies(item.id)
    this.setState({
      totalComments: this.state.totalComments.map(
        (itm: any, indx: number) => {
          if (indx === index)
            return {
              ...itm,
              open: !itm.open,
            };
          return itm;
        }
      ),
      selectedCommentId: item.id,
    });
  }

  showTabData = () => {
    if (this.props.route.params.showTab) {
      return this.props.route.params.showTab;
    } else {
      return 0;
    }
  }

  paramProfileData = () => {
    const isCommentPost = this.props.route.params?.isCommentPost
    const idToBeUsed = this.state.PostData[this.state.scrollInfo?.index]?.attributes?.account_id?.toString() === this.state.userAccountId.toString() ? null : this.state.PostData[this.state.scrollInfo?.index]?.attributes?.account_id
    if (isCommentPost === true) {
      this.props.navigation.navigate("UserProfileBasicBlock", {
        data: {
          attributes: {
            account_id: idToBeUsed
          },
        },
        isCommentPost: isCommentPost,
        showTab: this.showTabData()
      });
    } else {
      this.props.navigation.navigate("UserProfileBasicBlock", {
        data: {
          attributes: {
            account_id: idToBeUsed
          },
        },
        showTab: this.showTabData()
      });
      this.props.navigation.setParams({
        type: null,
        page: 1,
      })
    }
  }

  createComment = async () => {
    let formData = new FormData();
    formData.append("post_id", this.state.postID);
    formData.append("commentable_type", "post");
    formData.append("commentable_id", this.state.postID);
    formData.append("comment", this.state.comment);

    this.setState({
      commentLoading: true
    })

    this.createCommentAPICallId = await this.apiCallData({
      contentType: "multipart/form-data",
      method: "POST",
      endPoint: "/bx_block_comments/comments",
      body: formData,
      type: 'formData'
    });
  };

  createCommentReply = async (id: number | string) => {
    this.setState({
      commentLoading: true
    })
    let formData = new FormData();
    formData.append("post_id", this.state.PostData[this.state.scrollInfo?.index]?.id);
    formData.append("comment", this.state.comment);
    formData.append("parent_id", id.toString());

    this.createCommentReplyAPICallId = await this.apiCallData({
      contentType: "multipart/form-data",
      method: "POST",
      endPoint: "/bx_block_comments/reply",
      body: formData,
      type: 'formData'
    });
  }

  fetchReportReasons = async () => {
    this.reportReasonsId = await this.apiCallData({
      contentType: configJSON.commentsContentType,
      method: configJSON.commentsApiMethodType,
      endPoint: `/${configJSON.reportReasonsEndpoint}`,
    });
  }


  showCreateComment = async () => {
    this.showCreateCommentAPICallId = await this.apiCallData({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_comments/display_comments?id=${this.state.postID}&page=${this.state.page}&per_page=10 `,
      body: "",
    });
  }


  bookMarkPost = async () => {
    const postId = this.state.PostData[this.state.scrollInfo?.index]?.id;
    console.log("Post id = ", postId)
    await this.apiCallData({
      contentType: configJSON.commentsContentType,
      method: configJSON.commentPOSTAPiMethod,
      endPoint: `/${configJSON.bookMarkPostEndpoint}`,
      body: {
        "post_id": postId,
      },
    });
  }

  unBookMarkPost = async () => {
    const postId = this.state.PostData[this.state.scrollInfo?.index]?.id;
    this.unBookMarkId = await this.apiCallData({
      contentType: configJSON.commentsContentType,
      method: configJSON.commentDELETEAPiMethod,
      endPoint: `/${configJSON.unBookMarkPostEndpoint}`,
      body: {
        "post_id": postId,
      },
    });
  }

  saveVideo = async () => {
    this.setState({
      modalVisible: false
    })

    setTimeout(async () => {

      if (Platform.OS === 'android') {
        let permissionGiven = await this.requestStoragePermission();
        if (!permissionGiven) {
          return
        }
      }
      RNToasty.Show({
        title: 'Downloading...',
      })
      const REMOTE_PATH = this.state.PostData[this.state.scrollInfo?.index]?.attributes?.post_medias?.videos?.[0]?.media_url;
      let date = new Date();
      const ext = '.mp4';
      const { DownloadDir } = RNFetchBlob.fs.dirs;
      const fileName = `video_${date.getTime()}${ext}`;
      const filePath = `${DownloadDir}/${fileName}`;

      let optionsAndroid = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: fileName,
          path: filePath,
          description: 'Downloading file.',
        },
      }

      let optionsIOS = {
        fileCache: true,
        appendExt: 'mp4',
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: fileName,
          path: filePath,
        },
      }

      RNFetchBlob.config(Platform.OS === "ios" ? optionsIOS : optionsAndroid)
        .fetch('GET', REMOTE_PATH)
        .then((res) => {
          if (Platform.OS === 'ios') {
            this.setState({
              modalVisible: false
            })
            setTimeout(() => {
              CameraRoll.save(res.path(), { type: 'video' })
                .then(() => {
                  RNToasty.Show({
                    title: 'Downloaded successfully',
                  });
                })
                .catch((error) => {
                  console.log('Download error', JSON.stringify(error));
                });
            }, 300)

          } else {
            RNToasty.Show({
              title: 'Downloaded successfully',
            })
          }
        })
        .catch((err) => {
          console.log('Download error:', err);
        });
    }, 500)
  }

  notInterested = async () => {
    console.log('post id', this.state.PostData[this.state.scrollInfo?.index]?.id)
    if (this.props.route.params?.type === 'NotInterestedActivity') {
      this.notNotInterested()
    } else {
      const postId = this.state.PostData[this.state.scrollInfo?.index]?.id;
      this.markNotInterestedApiCallId = await this.apiCallData({
        contentType: "application/json",
        method: "POST",
        endPoint: `/bx_block_share/not_interest`,
        body: {
          post_id: postId
        },
      })
      this.setState({
        modalVisible: false
      })
    }

  }
  notNotInterested = async () => {
    const postId = this.state.PostData[this.state.scrollInfo?.index]?.id;
    this.notNotInterestedApiCallId = await this.apiCallData({
      contentType: "application/json",
      method: "DELETE",
      endPoint: `/bx_block_share/unnot_interest_post?post_id=${postId}`,
    })
  }

  getListOfUser = async () => {
    const userID = (await getStorageData('userID', false)) || '';
    this.getListOfUserAPICallId = await this.apiCallData({
      contentType: "application/json",
      method: "GET",
      endPoint: `/${configJSON.listOfUsersFollowed}?id=${userID}`,
      body: "",
    });
  }

  getTotalCommentpost = async () => {
    this.getTotalCommentpostAPICallId = await this.apiCallData({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_comments/comment_count?id=${this.state.postID}`,
      body: "",
    });
  }

  registerAppOpen = async () => {
    this.registerAppOpenCallId = await this.apiCallData({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_settings/start_activity`,
    });
  }
  registerAppClose = async () => {
    this.registerAppCloseCallId = await this.apiCallData({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_settings/end_activity`,
    });
  }
  feedbackBtnPress = () => {
    if (this.state.isOpen)
      this.setState({ isOpen: false })
  }

  likeCommentpost = async (index: number) => {
    this.setState({ voteLoading: true, selectedCommentIndex: index })
    this.likeCommentpostAPICallId = await this.apiCallData({
      contentType: "application/json",
      method: "POST",
      endPoint: `/bx_block_comments/upvotes?id=${this.state.commentID}`,
      body: "",
    });
  }
  dislikeCommentpost = async (index: number) => {
    this.setState({ voteLoading: true, selectedCommentIndex: index })
    this.dislikeCommentpostAPICallId = await this.apiCallData({
      contentType: "application/json",
      method: "POST",
      endPoint: `bx_block_comments/downvotes?id=${this.state.commentID}`,
      body: "",
    });
  }

  createCommentSucessCallBack = (res: any) => {
    this.setState({ comment: "" })
    this.showCreateComment()
    this.getTotalCommentpost()
  };
  handleNamePress(name: any, matchIndex: number, tagList: any) {
    if (tagList && tagList.length > 0) {
      let withoutAt = name.substring(1)
      let userId = 0;

      tagList?.map((tagObject: any) => {
        if (tagObject.user_name === withoutAt) {
          userId = tagObject.account_id
        }
      })

      let dataAccount = {
        attributes: {
          account_id: userId
        }
      }
      this.setState({ commentModalVisible: false });
      this.props.navigation.navigate("UserProfileBasicBlock", { data: dataAccount })
    }
  }
  handleHashPress(name: any, matchIndex: number, hashList: any) {
    let withoutAt = name.substring(1)
    let posts = 0;

    hashList?.map((tagObject: any) => {
      if (tagObject.name === withoutAt) {
        posts = tagObject.post_count
      }
    })

    const data = {
      hashTag: withoutAt,
      posts: posts,
    }
    this.setState({ commentModalVisible: false });
    this.props.navigation.navigate("HashTagScreen", { data: data })
    // }
  }
  likeAPost = async () => {


    const token = (await getStorageData('authToken', false)) || ''
    const header = {
      'Content-Type': 'application/json',
      token: token,
    };

    const data = {
      data: {
        attributes: {
          likeable_id: this.state.PostData[this.state.scrollInfo?.index]?.attributes?.id,
          likeable_type: 'BxBlockPosts::Post'
        }
      }
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.likePostAPICallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.likePostEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.commentPOSTAPiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

  }

  unLikeAPost = async () => {
    const token = (await getStorageData('authToken', false)) || ''
    const header = {
      'Content-Type': 'application/json',
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.unlikeDeleteApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.unlikeCommentEndPoint}${this.state.PostData[this.state.scrollInfo?.index].attributes.id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.commentDELETEAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

  }

  getProfileData = async () => {
    const token = (await getStorageData('authToken', false)) || ''
    const header = {
      'Content-Type': 'application/json',
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getProfileDataID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.profileDataEndpoint
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

  }

  createCommentFailureCallBack = (res: any) => {
  };

  deleteCommentSucessCallBack = (res: any) => {
  };

  deleteCommentFailureCallBack = (res: any) => {
  };


  updateFcmTokenSucessCallBack = (res: any) => {

  };

  updateFcmTokenFailureCallBack = (res: any) => {
  };

  showCreateCommentSucessCallBack = (res: any) => {
    let resData = res.data?.map((item: any) => {
      return {
        ...item,
        attributes: {
          ...item.attributes,
          replies: [],
          repliesCount: item.attributes.replies
        }
      }
    })

    this.setState({
      totalComments: [...this.state.totalComments, ...resData],
      total_page: res?.meta?.pagination.total_pages,
      commentLoaderVisible: false,
    })
  };

  getProfileDataSuccessCallBack = (res: any) => {
    this.setState({ profileData: res.data })
  }

  showCreateCommentFailureCallBack = (res: any) => {
    this.setState({
      totalComments: [],
      commentLoaderVisible: false
    });
  };
  getTotalCommentLikesSucessCallBack = (res: any) => {
    this.setState({ totalCommentLikes: res.data })
  }

  getReportReasonsList = (res: any) => {
    const reportReasons = Object.keys(res.reason).map(item => {
      return {
        label: item,
        value: res.reason[item]
      }
    })
    console.log("reportReasons", reportReasons)
    const translatedReportReasons = [{
      label: translate('sexual_content'),
      value: 0
    },
    {
      label: translate("violent_or_Repulsive_Content"),
      value: 1
    },
    {
      label: translate("hateful_or_Abusive_Content"),
      value: 2
    },
    {
      label: translate("harmful_or_dangerous_Act"),
      value: 3
    },
    {
      label: translate("spam_or_Misleading"),
      value: 4
    },
    {
      label: translate("child_Abuse"),
      value: 5
    },
    {
      label: translate("other"),
      value: 6
    }]
    this.setState({ reportReasons: translatedReportReasons })
  };
  getListOfUserAPICallIdSucessCallBack = (res: any) => {
    this.setState({ listOfUsers: res.followings })
  };

  getRepliesSuccessCallBack = (res: any) => {
    if (res?.message == "no replies") {
      this.setState({
        totalComments: this.state.totalComments?.map((item: any) => {
          if (item.id === this.state.selectedCommentId) {
            return {
              ...item,
              attributes: {
                ...item.attributes,
                replies: []
              }
            }
          } else {
            return {
              ...item
            }
          }
        })
      })
    }
    if (res?.data) {
      this.setState({
        totalComments: this.state.totalComments?.map((item: any) => {
          if (item.id === this.state.selectedCommentId) {
            return {
              ...item,
              attributes: {
                ...item.attributes,
                replies: res?.data
              }
            }
          } else {
            return {
              ...item
            }
          }
        })
      })
    }
  }

  totalCommentCountFunc = () => (
    Boolean(this.state.totalComments.find((item: any) => item.attributes.id === this.state.selectedItem.attributes?.id)) ? this.state.totalCommentCount - 1 : this.state.totalCommentCount

  )

  deleteCommentAPICallIdSucessCallBack = (res: any) => {
    this.setState({
      totalComments: this.state.totalComments.filter((item: any) => item.attributes.id !== this.state.selectedCommentIdToBeDeleted),
      deleteCommentModalVisible: false,
      totalCommentCount:
        Boolean(this.state.totalComments.find((item: any) => item.attributes.id === this.state.selectedItem.attributes?.id)) ? this.state.totalCommentCount - 1 : this.state.totalCommentCount,
      PostData: this.state.PostData.map((item: any, index: number) => {
        if (index === this.state.scrollInfo?.index) {
          return {
            ...item,
            attributes: {
              ...item.attributes,
              post_comment_count:
                Boolean(this.state.totalComments.find((item: any) => item.attributes.id === this.state.selectedItem.attributes?.id)) ?
                  item.attributes.post_comment_count - 1 : item.attributes.post_comment_count
            }
          }
        } else {
          return {
            ...item
          }
        }
      })
    }, () => this.getCommentReplies(this.state.selectedCommentId))

  }

  getListOfUserFailureCallBack = (res: any) => {
  };
  createCommentReplySucessCallBack = (res: any) => {

    this.getCommentReplies(this.state.selectedCommentId)
    this.setState({ comment: "" })
  }

  getTotalCommentpostAPICallIdSucessCallBack = (res: any) => {
    this.setState({ totalCommentCount: res.count })
  };

  getTotalCommentpostAPICallIdFailureCallBack = (res: any) => {
  };

  likeCommentpostAPICallIdSucessCallBack = (res: any) => {
    const temp1 = JSON.parse(JSON.stringify(this.state.totalComments))
    temp1[this.state.selectedCommentIndex].attributes.upvoted = res.data.attributes.upvoted
    temp1[this.state.selectedCommentIndex].attributes.downvoted = res.data.attributes.downvoted
    temp1[this.state.selectedCommentIndex].attributes.totalvotecount = res.data.attributes.totalvotecount
    let newComments = [...temp1].sort((a, b) => b.attributes.totalvotecount - a.attributes.totalvotecount)
    this.setState({
      upvoted: res.data.attributes.upvoted,
      totalComments: newComments,
      commentLikeCount: res.data.attributes.totalvotecount,
      voteLoading: false
    })
  };

  likeCommentpostAPICallIdFailureCallBack = (res: any) => {
    this.setState({ voteLoading: false })
  };

  dislikeCommentpostAPICallIdSucessCallBack = (res: any) => {
    const temp1 = JSON.parse(JSON.stringify(this.state.totalComments))
    temp1[this.state.selectedCommentIndex].attributes.upvoted = res.data.attributes.upvoted
    temp1[this.state.selectedCommentIndex].attributes.downvoted = res.data.attributes.downvoted
    temp1[this.state.selectedCommentIndex].attributes.totalvotecount = res.data.attributes.totalvotecount
    let newComments = [...temp1].sort((a, b) => b.attributes.totalvotecount - a.attributes.totalvotecount)
    this.setState({
      downvoted: res.data.attributes.downvoted,
      totalComments: newComments,
      commentLikeCount: res.data.attributes.totalvotecount,
      voteLoading: false
    })
  };

  dislikeCommentpostAPICallIdFailureCallBack = (res: any) => {
    this.setState({ voteLoading: false })
  };

  async requestStoragePermission() {
    try {
      if (Platform.OS === "android") {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );

        return result === PermissionsAndroid.RESULTS.GRANTED;

      } else {
        const permission = PERMISSIONS.IOS.PHOTO_LIBRARY

        const result = await check(permission);

        if (result === RESULTS.GRANTED) {
          console.log('Permission already granted');
          return true;
        }

        const requestResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

        if (requestResult === RESULTS.GRANTED) {
          console.log('Permission granted');
          return true;
        } else {
          console.log('Permission denied' + JSON.stringify(requestResult));
          return false;
        }
      }
    } catch (error) {
      console.log('Permission request error:', error);
      return false;
    }
  }

  messageComponent = () => {
    return <FireBaseMessage />
  }

  checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      //add code here...
    }
  }

  requestToPermissions = async () => {
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
          return true;
        } else if (
          result["android.permission.CAMERA"] ||
          result["android.permission.RECORD_AUDIO"] === "never_ask_again"
        ) {
          this.setState({ alertModal: { openAlertModal: true, alertMsg: "Please Go into Settings and Allow permissions to continue" } })
        }
      } else if (Platform.OS === "ios") {
        try {
          const result = await requestMultiple([
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.MICROPHONE,
          ]);
          if (
            result["ios.permission.CAMERA"] &&
            result["ios.permission.MICROPHONE"] === "granted"
          ) {
            return true;
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

  handleAudioOnpress = (details: any) => {
    let item = {
      "artist": details[0]?.audio_artist,
      "audio": details[0]?.audio_url,
      "id": details[0]?.id,
      "image": null,
      "title": details[0]?.audio_title
    };
    this.props?.navigation?.navigate("PostByAudioScreen", { data: item });
  }

  getCategory = async () => {
    const token = await getStorageData("authToken", false)

    const header = {
      'Content-Type': 'application/json',
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.getcategoryApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getCategory}`
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
  }


  getCatloge = async (categoriId: string = "") => {
    await setStorageData('getGiftAssets', "false");
    const token = await getStorageData("authToken", false)
    const header = {
      'Content-Type': 'application/json',
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.getAllGiftsDataApiId.push({ apiId: requestMessage.messageId, catId: categoriId });

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getCatelog}${categoriId}`
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
  }

  handleAllGift = (responseDataJson: any, apiRequestMessageID: any) => {
    const isGiftId = this.getAllGiftsDataApiId.filter((item: any) => item?.apiId == apiRequestMessageID);

    if (isGiftId && isGiftId?.length > 0) {
      let keyId = Number(isGiftId[0].catId);
      this.getAllGiftsDataApiId = this.getAllGiftsDataApiId.filter((item: any) => (item.apiId != apiRequestMessageID));
      this.storeGiftDetails(keyId, responseDataJson.data)
    }
  }

  refreshGiftAssetTable = () => {
    this.database.transaction((tx: any) => {
      tx.executeSql(
        'DROP TABLE IF EXISTS categories',
        [],
      );

      tx.executeSql(
        'DROP TABLE IF EXISTS gifts',
        [],
        () => this.createCategoryDatabase(),
        () => this.createCategoryDatabase()
      );
    });
  }

  createCategoryDatabase = () => {
    this.database.transaction((tx: any) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, item VARCHAR(10000000))',
        [],
        (tx: any, results: any) => {
          this.createGiftDatabase();
        },);
    });
  }

  createGiftDatabase = () => {
    this.database.transaction((tx: any) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS gifts (id INTEGER PRIMARY KEY AUTOINCREMENT, item VARCHAR(10000000))',
        [],
        (tx: any, results: any) => {
          this.getCategory()
        });
    });
  }

  storeCategoryDetails = (categoryData: any) => {
    this.database.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO categories (id, item) VALUES (?, ?)',
        [1, JSON.stringify(categoryData)],
      );
    });
  }

  storeGiftDetails = (catId: number, giftData: any) => {
    this.database.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO gifts (id, item) VALUES (?, ?)',
        [catId, JSON.stringify(giftData)],
      );
    });
  }

  // Customizable Area End
}
