// Customizable Area Start
import { BackHandler, DeviceEventEmitter, Keyboard, Platform, PermissionsAndroid, findNodeHandle } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import ZegoExpressEngine from "zego-express-engine-reactnative";

import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";
import { getStorageData } from "framework/src/Utilities";
import createRequestMessage from "../src/helpers/create-request-message";
import { handleResponseMessage } from "../src/helpers/handle-response-message";
import { translate } from "../../../components/src/i18n/translate";

import {
  guest,
  match,
  more,
  shape,
} from "./assets";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import { ChatMessage, ChatRoom, SendMessageRequest } from "amazon-ivs-chat-messaging";
import SoundPlayer from 'react-native-sound-player'
import Share from "react-native-share";
//@ts-ignore
const { baseURL } = require("../../../framework/src/config.js");

export interface CurrentUser {
  full_name: string | null;
  user_name: string | null;
  photo: string | null;
  id: string | null;
}

export interface HostDetails {
  full_name: string | null;
  user_name: string | null;
  photo: string | null;
  followings_status: string | null;
  is_private_account: boolean | null;
  userId: string | null;
}

interface StageData {
  name: string | null;
  stageArn: string | null;
  inviteId: number | null;
  isViewer: boolean | null;
  chatArn: string | null;
  hostId: string | null;
  viewerType: string | null;
  isChallenge: boolean | null;
  stageId: number | null;
  isRedirectedFromChallenge?: boolean | null;
  chatData: any;
}

interface GiftPopupData {
  show: boolean;
  gifter: string;
  profileUrl: string;
  giftName: string;
  giftUrl: string;
  multiplier: number;
}

interface LottieData {
  show: boolean;
  url: string;
  audioUrl: string;
  json: string;
  positionLeft: number;
  positionTop: number;
  type: string;
}
interface viewuser {
  token: string;
  sessionExpirationTime?: Date;
  tokenExpirationTime?: Date;
}


export interface SearchResult {
  account_follow_status: string;
  account_status: string;
  bio: string | null;
  first_name: string | null;
  full_name: string;
  id: number;
  last_name: string | null;
  photo: string | null;
  unique_auth_id: string;
  user_name: string;
  isInvited: boolean | null;
  isLoader: boolean | null;
  live_status: string | null;
  invite_status: string | null;
}

export interface Modertorsearchresult {

  account_follow_status: string;
  bio: string | null;
  first_name: string | null;
  full_name: string;
  id: number;
  is_moderator: string | null;
  is_private: string | null;
  last_name: string | null;
  photo: string | null;
  unique_auth_id: string;
  live_status: string | null;
  user_name: string;
}


// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: {
    params: {
      host_id: any;
      screen: string,
      title: string | null,
      recordingUrl: string | null,
      data: {
        title: string | null,
        topic: string | null,
        image: any,
      },
      stageData: StageData | undefined,
      stage_id: string,
      account_id: string,
      participant_id: string,
      EventDetails: any | undefined
    };
  };
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  duration: any;
  loader: boolean;
  invitationModel: number;
  giftsModal: boolean;
  viewProfileModal: any;
  viewViewreModal: any;
  reportUserreasonModal: any;
  searchresult: SearchResult[];
  value: string;
  mangemodeview: boolean,
  alertModal: { openAlertModal: boolean; alertMsg: string };
  cancelCohostModel: { openAlertModal: boolean; alertMsg: string };
  notificationModal: { openAlertModal: boolean; alertMsg: string };
  deleteRecordingModal: { openAlertModal: boolean; alertMsg: string }
  disableMatch: boolean;
  cancelMatchModal: boolean;
  settingsModal: boolean;
  Settingviewmodel: boolean;
  ManageViewModal: boolean;
  mirrorVideo: boolean;
  viewMatchFaq: boolean;
  currentUser: CurrentUser | null;
  hostDetails: HostDetails | null;
  stageArn: string;
  stage_id: string;
  current_user_id: string;
  chatRoomArn: string;
  hostId: string;
  broadcastDetail: { startBroadcast: string, userID: string, token: string, isHost: string, isViewer: string, userId: string, userName: string, userRole: string, photo: string, stream_id: string, live_stream_id: number };
  chatTokenData: {
    token: string;
    sessionTime: string;
    tokenTime: string;
  };
  isParticipantJoined: boolean;
  streamEndPressed: boolean;
  giftsdata: any;
  participantLoader: boolean;
  ReportedDeleteMessageList: Array<{
    messege_id: string,
    stage_id: number,
    messege_text: string,
    reason: string,
  }>,
  selectedTime: number;
  isTimerVisible: boolean;
  endedStreamDetails: { coin_gift_count: number, live_duration: any, live_followers: number, viewer_count: number };
  hostComment: boolean;
  selectedGift: any;
  categorydata: any;
  participantModel: any;
  participantData: any;
  giftresmodel: boolean;
  donateid: any;
  room: ChatRoom | undefined;
  lottieAnimation: LottieData;
  giftPopupDetails: GiftPopupData;
  showInitialMessage: boolean;
  isMute: boolean;
  flipCamera: boolean;
  isLiveChallenge: boolean;
  usersJoinedData: { id: string, name: string, role: string, photo: string }[];
  selectedGridId: number | null;
  selectedGridUserData: any;
  viewerType: string;
  selectedChallengeUserId: number | null;
  scoreTeam1: any;
  scoreTeam2: any;
  isTeamMateModalVisible: boolean
  invitedUserList: any,
  myTeamMemberList: any,
  opponentTeamList: any
  challangeModalPopup: boolean
  currentStageData: any;
  redirectStageArn: any;
  startNewLive: boolean;
  hostRedirect: boolean;
  hostChatData: any;
  redirectStageId: any;
  redirectChatArn: any;
  notificationData: any;
  invitedIds: { userId: number, apiId: string }[];
  reportreasonData: any,
  selectedmutelable: any,
  ModeraterModel: any,
  viewuserModal: any,
  replayView: boolean,
  userLeftName: string | null;
  blockuserid: any
  seconds: number, // Initial seconds
  isRunning: boolean,
  minutes: number,
  isCommentModalVisible: boolean,
  notificationStatus: string;
  isBlockKeywordModalVisible: boolean,
  createNewStageCalled: boolean;
  isMuteDurationModalVisible: boolean,
  muteDurationList: any;
  istimerSet: boolean;
  isMutedAccountsModalVisible: boolean;
  blockKeyword: string;
  followButtonLoader: boolean;
  allowComments: boolean,
  coHostLeave: boolean;
  cancelMatch: boolean;
  challengeTeams: { teamA: string[], teamB: string[] },
  nativeViewHeight: string;
  streamViewHeight: string;
  teamIdForNative: number[];
  muteaccountlistdata: any,
  muteselected: boolean,
  addMUterModel: boolean,
  Commentsetting: boolean,
  moderoteraddreove: string,
  Addmodratorlable: string,
  Addmutelable: string,
  ManageviewData: any;
  powerButtonWithoutChallenge: boolean;
  recordingStarted: boolean;
  recordingUrl: string;
  startHeartAnim: boolean;
  startSingleHeartAnim: boolean;
  sendLikeCount: number;
  totalLikeCount: number;
  likeUserId: string | null;
  isLikedAnim: boolean;
  gotoExplore: boolean;
  videoLoading: boolean;
  hostSideModeatorData: any;
  participantId: string;
  BlockAlertMsg: { openAlertModal: boolean; alertMsg: string };
  ReportalertPopup: { openAlertModal: boolean; alertMsg: string };
  isBlocked: boolean,
  showReportModal: boolean;
  language: string;
  totalViewersCount: number;
  streamList: any;
  userFollowButtonLoader: boolean;
  isDeleted: boolean;
  privateLiveData: { is_private: boolean, userID: number }
  bottomButtons: { title: string, icon: any, disable: boolean }[]
  slow_mode: boolean;




  // Customizable Area End
}

interface SS {
  id: any;
}

export default class LiveStreamingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start

  bottomButtons: any[] = [
    { title: translate("coHost"), icon: shape, disable: false },
    { title: translate("Match"), icon: match, disable: false },
    { title: translate("invite_guest"), icon: guest, disable: false },
    { title: translate("More"), icon: more },
  ];
  myTeamIdList: number[] = [];
  opponentTeamIdList: number[] = [];
  liveStreamDurationId: string = "";
  teamSelectionApiId: string = "";
  getParticipantid: string = "";
  getStopStreamFromAdminApiId: string = "";
  getReportedDeleteMessageListAdminApiId: string = "";
  removeParticipantid: string = "";
  getreportreasonid: string = "";
  blockUserid: string = "";
  loginUserCallId: string = '';
  getstageiddataApiCallId: string = "";
  getStreamTokenApiCallId: string = "";
  getViewerTokenApiCallId: string = "";
  createChatTokenApiCallId: string = "";
  createTokenApiCallId: string = "";
  creategiftsApiCallId: string = "";
  createStageApiCallId: string = "";
  createNewStageApiCallId: string = "";
  updateStageApiCallId: string = "";
  createChatApiCallId: string = "";
  createNewChatApiCallId: string = "";
  stopStreamApiCallId: string = "";
  startStreamApiCallId: string = "";
  mixStreamApiCallId: string = "";
  deleteChatRoomApiCallId: string = "";
  hostOrGuest: string = "";
  followUserApiId: string = "";
  unfollowUserApiId: string = "";
  updateInviteCallId: string = "";
  followHostApiId: string = "";
  getStageDataApiId: string = "";
  deleteRecordingApiId: string = '';
  getHostDetailsApiCallId: string = "";
  attachRecordingApiCall: string = "";
  getSelectedUserDataApiCallId: string = "";
  getEndedLiveDetailsApiCallId: string = "";
  endLiveApiCallId: string = "";
  getSingleGiftDataApiCallId: string[] = [];
  inviteParticipantApiCallId: string = "";
  viewesGiftersFollowers: any[] = [translate("Total_Views"), translate("new_Followers"), translate("gifters")];
  unsubscribe: any;
  deviceEmitter: any;
  endliveAlertMsg: string = translate("endLive");

  liveExploreAlertMsg: string = translate("Explore_exit");
  likeTimeout: any;
  keyboardDidShowListener: any;
  keyboardDidHideListener: any;
  animationQueue: LottieData[] = [];
  giftPopupQueue: GiftPopupData[] = [];
  timeLimitedCache: string[] = [];
  interval: any;
  doDeleteStage: boolean;
  getUserData: boolean = false;
  checkForSlowModeApiCallId: string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      bottomButtons: this.bottomButtons,
      loader: false,
      invitationModel: 0,
      giftsModal: false,
      duration: 5,
      participantModel: false,
      viewProfileModal: false,
      viewViewreModal: false,
      reportUserreasonModal: false,
      challangeModalPopup: false,
      searchresult: [
      ],
      value: "",
      likeUserId: null,

      mangemodeview: false,
      alertModal: { openAlertModal: false, alertMsg: "" },
      notificationModal: { openAlertModal: false, alertMsg: "" },
      cancelCohostModel: { openAlertModal: false, alertMsg: "" },
      deleteRecordingModal: { openAlertModal: false, alertMsg: "" },
      hostId: "",
      disableMatch: false,
      sendLikeCount: 0,
      cancelMatchModal: false,
      settingsModal: false,
      Settingviewmodel: false,
      ManageViewModal: false,
      mirrorVideo: false,
      viewMatchFaq: true,
      currentUser: null,
      createNewStageCalled: false,
      hostDetails: null,
      stageArn: "",
      chatRoomArn: "",
      videoLoading: false,
      streamList: [],
      broadcastDetail: { startBroadcast: 'false', token: '', isHost: 'false', isViewer: 'false', userId: '', userName: '', userRole: 'guest', photo: "", live_stream_id: 0 },
      chatTokenData: {
        token: '',
        sessionTime: '',
        tokenTime: ''
      },
      isParticipantJoined: false,
      streamEndPressed: false,
      giftsdata: {},
      startHeartAnim: false,
      powerButtonWithoutChallenge: false,
      totalLikeCount: 0,
      participantLoader: false,
      ReportedDeleteMessageList: [],
      stage_id: "",
      current_user_id: "",
      notificationData: null,
      endedStreamDetails: { coin_gift_count: 0, live_duration: 0, live_followers: 0, viewer_count: 0 },
      selectedTime: 0,
      isTimerVisible: false,
      notificationStatus: "",
      hostComment: false,
      selectedGift: null,
      replayView: false,
      userLeftName: null,
      categorydata: [],
      participantData: [],
      giftresmodel: false,
      recordingStarted: false,
      recordingUrl: '',
      donateid: '',
      room: undefined,
      startSingleHeartAnim: false,
      teamIdForNative: [],
      lottieAnimation: {
        show: false,
        url: "",
        audioUrl: "",
        json: "",
        positionLeft: 0,
        positionTop: 0,
        type: "",
      },
      giftPopupDetails: {
        show: false,
        giftName: "",
        gifter: "",
        giftUrl: "",
        profileUrl: "",
        multiplier: 0,
      },
      showInitialMessage: true,
      flipCamera: true,
      isLiveChallenge: false,
      usersJoinedData: [],
      selectedGridId: null,
      selectedGridUserData: null,
      viewerType: "",
      currentStageData: null,
      selectedChallengeUserId: null,
      scoreTeam1: 0,
      scoreTeam2: 0,
      hostChatData: null,
      isTeamMateModalVisible: false,
      startNewLive: false,
      hostRedirect: false,
      invitedUserList: [],
      myTeamMemberList: [],
      redirectStageArn: "",
      istimerSet: false,
      redirectStageId: "",
      redirectChatArn: "",
      opponentTeamList: [],
      hostSideModeatorData: [],
      isMute: false,
      invitedIds: [],
      reportreasonData: [],
      selectedmutelable: null,

      ModeraterModel: false,
      viewuserModal: false,
      blockuserid: null,

      nativeViewHeight: '250',
      streamViewHeight: '250',
      minutes: 1,
      seconds: 0, // Initial seconds
      isRunning: false,
      muteDurationList: [],
      coHostLeave: false,
      cancelMatch: false,
      isCommentModalVisible: false,
      isBlockKeywordModalVisible: false,
      isMuteDurationModalVisible: false,
      isMutedAccountsModalVisible: false,
      blockKeyword: "",
      followButtonLoader: false,
      allowComments: true,
      muteaccountlistdata: [],
      muteselected: false,
      challengeTeams: { teamA: [], teamB: [] },
      addMUterModel: false,
      Commentsetting: false,
      moderoteraddreove: 'false',
      ManageviewData: [],
      Addmodratorlable: 'Add Moderator',
      Addmutelable: 'Mute',
      isLikedAnim: false,
      gotoExplore: false,
      participantId: "",
      BlockAlertMsg: { openAlertModal: false, alertMsg: "" },
      ReportalertPopup: { openAlertModal: false, alertMsg: "" },
      isBlocked: false,
      privateLiveData: { is_private: false, userID: 0 },
      showReportModal: false,
      language: '',
      totalViewersCount: 0,
      userFollowButtonLoader: false,
      isDeleted: false,
      slow_mode: false,
      // Customizable Area End
    };

    // Customizable Area Start
    this.doDeleteStage = false;
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    const apiRequestMessageID = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage),
    );

    const responseDataJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
    );

    const errorDataJson = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage),
    );

    this.handleSingleGiftApi(responseDataJson, errorDataJson, apiRequestMessageID)

    //  this.handleParticipantApi(responseDataJson,errorDataJson,apiRequestMessageID)

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const item = message.getData(getName(MessageEnum.PostDetailDataMessage));
      this.setPrivateLiveData(item);

    }

    switch (apiRequestMessageID) {

      case this.attachRecordingApiCall: {
        // this.removeParticipant(this.state.participantId)
        break;
      }
      case this.startStreamApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ streamList: [{ "streamID": responseDataJson?.stream?.stream_id, "user": { "userID": responseDataJson?.user_id, "userName": responseDataJson?.user_name } }] })
            this.createRoom(responseDataJson);
          },
          onFail: () => {

          },
        });
      }
      case this.endLiveApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            if (responseDataJson?.stream?.status == "ended") {
              ZegoExpressEngine.instance().stopPreview().then(() => this.setState({ alertModal: { openAlertModal: false, alertMsg: "" } }))
              ZegoExpressEngine.instance().stopPublishingStream().then(() => {
                ZegoExpressEngine.instance().logoutRoom(responseDataJson?.stream?.room_id);
                this.props.navigation?.replace("EndLive", { screen: "EndLive" });
              })
            }
          },
          onFail: () => {

          },
        });
      }

      case this.mixStreamApiCallId: {
        console.log("/.............................../", responseDataJson, errorDataJson)
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            // this.viewerStream(responseDataJson);
            // ZegoExpressEngine.instance().startPlayingStream(responseDataJson.stream.stream_id, { "reactTag": findNodeHandle(this.refs.zego_mix_view), "viewMode": 0, "backgroundColor": 0 });
          },
          onFail: () => {

          },
        })
      }

      case this.getViewerTokenApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.viewerStream(responseDataJson);
          },
          onFail: () => {

          },
        });
      }
      case this.getstageiddataApiCallId: {
        this.setState({ loader: false })
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({
              allowComments: responseDataJson.is_allow_comment
            })
            this.handelAllowComments(this.state.allowComments)

            this.setState({ loader: false })

          },
          onFail: () => {

          },
        });
        break;
      }
      case this.checkForSlowModeApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            if (responseDataJson.slow_mode) {
              this.setState({
                slow_mode: responseDataJson.slow_mode
              })
              setTimeout(() => {
                this.setState({
                  slow_mode: false
                })
              }, 10000);
            }
          },
          onFail: () => {

          },
        });
        break;
      }
      case this.createNewStageApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ redirectStageArn: responseDataJson.arn, redirectStageId: responseDataJson.id }, () => {
              this.createNewChatRoom()
            })
          },
          onFail: () => {
            this.setState({ alertModal: { openAlertModal: true, alertMsg: translate("something_wnt_wrong") } })
          }
        })
        break;
      }
      case this.updateInviteCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.handleUpdateInviteApi()
          },
          onFail: () => { }
        })
        break;
      }
      case this.createNewChatApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ redirectChatArn: responseDataJson.arn })
          },
          onFail: () => {
            this.setState({ alertModal: { openAlertModal: true, alertMsg: translate("something_wnt_wrong") } })
          }
        })
        break;
      }
      case this.createStageApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {

            this.setState({ stageArn: responseDataJson.arn, stage_id: responseDataJson.id, broadcastDetail: { ...this.state.broadcastDetail, isHost: "true", userRole: 'host' } }, () => {
              this.updateStreamDetails();
              this.getParticipant();
              this.createChatRoom();
              this.createParticipantToken(responseDataJson.arn, ["PUBLISH", "SUBSCRIBE"]);
              if (this.state.privateLiveData.is_private) {
                this.setState({
                  bottomButtons: [
                    { title: translate("More"), icon: more, disable: false },
                  ]
                })
              }
            })
          },
          onFail: () => {
            this.goBackAfterApiFail();
          }
        })
        break;
      }

      case this.getParticipantid: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,

          onSuccess: () => {
            this.handleGetParticipantInfo(responseDataJson);
          },
          onFail: () => { this.setState({ participantLoader: false }) }
        })
        break;
      }
      case this.getStopStreamFromAdminApiId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,

          onSuccess: () => {
            this.handleResponseMessageOfgetStopStreamApi(responseDataJson)
          },
          onFail: () => { }
        })
        break;
      }
      case this.getReportedDeleteMessageListAdminApiId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,

          onSuccess: () => {
            this.setState({ ReportedDeleteMessageList: responseDataJson })
          },
          onFail: () => { }
        })
        break;
      }
      case this.getreportreasonid: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,

          onSuccess: () => {
            this.getReportReasonsList(responseDataJson);
          },
          onFail: () => {
            // this.setState({participantLoader:false})
          }
        })
        break;
      }
      case this.blockUserid: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,

          onSuccess: () => {
            this.setState({ blockuserid: responseDataJson.data?.attributes?.account_id })
            this.handelBlock(responseDataJson.data?.attributes?.account_id)

          },
          onFail: () => { }
        })
        break;
      }
      case this.removeParticipantid: {
        if (responseDataJson && responseDataJson.participant_id === this.state.participantId) {
          this.sendLeavingMessage()
          handleResponseMessage({
            responseJson: responseDataJson,
            errorJson: errorDataJson,

            onSuccess: () => {
              this.handleRemoveParticipantApi()
            },
            onFail: () => {

            }
          })
        }
        break;
      }
      case this.updateStageApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.getStageLists(this.state.stage_id)
          },
          onFail: () => {
            this.setState({ alertModal: { openAlertModal: true, alertMsg: translate("something_wnt_wrong") } })
          }
        })
        break;
      }
      case this.createChatApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ chatRoomArn: responseDataJson.arn }, () => {
              this.createChatToken();
              if (this.state.privateLiveData.is_private) {
                this.inviteParticipant(this.state.privateLiveData.userID)
              }
            })
          },
          onFail: () => {
            this.goBackAfterApiFail();
          }
        })
        break;
      }
      case this.creategiftsApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            DeviceEventEmitter.emit('getCoinBalance', {})
            this.handleGiftingProcess(responseDataJson);
          },
          onFail: () => { }
        })
        break;
      }

      case this.getStageDataApiId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ currentStageData: responseDataJson.data }, () => {
              let team1Score = responseDataJson.data.attributes.participants_data.team1_score ?? 0
              let team2Score = responseDataJson.data.attributes.participants_data.team2_score ?? 0
              this.setState({ scoreTeam1: team1Score, scoreTeam2: team2Score })
            })
          },
          onFail: () => { }
        })
        break;
      }
      case this.getSelectedUserDataApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.handleGetSelectedUserSuccessApi(responseDataJson)
          },
          onFail: () => {
            this.handleGetSelectedUserFailureApi()
          }
        })
        break;
      }

      case this.getHostDetailsApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            let userId = responseDataJson.data.id
            this.setState({ hostDetails: { ...responseDataJson.data.attributes, userId }, followButtonLoader: false })
          },
          onFail: () => {
            this.setState({ followButtonLoader: false })
          }
        })
        break;
      }

      case this.createChatTokenApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ chatTokenData: { token: responseDataJson.token, sessionTime: responseDataJson.session_expiration_time, tokenTime: responseDataJson.token_expiration_time } })
          },
          onFail: () => {
            this.goBackAfterApiFail();
          }
        })
        break;
      }
      case this.createTokenApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ stageArn: responseDataJson.stage_arn, stage_id: responseDataJson.stage_id, broadcastDetail: { ...this.state.broadcastDetail, startBroadcast: 'true', token: responseDataJson.token }, participantId: responseDataJson.participant_id })
            console.log("createtoken Success>>>>>", responseDataJson)
          },
          onFail: () => {
            this.goBackAfterApiFail();
            console.log("createtoken Fail>>>>>", errorDataJson)
          }
        })
        break;
      }

      case this.stopStreamApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            console.log("Successfully deleted")
            this.deleteChatRoom();
          },
          onFail: () => {
            this.deleteChatRoom();
          }
        })
        break;
      }

      case this.followUserApiId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.getUserData = true;
            this.getSelectedUserData(this.state.selectedGridUserData?.id, false);
          },
          onFail: () => {
            this.setState({ userFollowButtonLoader: false });
          }
        })
        break;
      }
      case this.followHostApiId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.getSelectedUserData(Number(this.state.hostDetails?.userId), false)
          },
          onFail: () => { this.setState({ followButtonLoader: false }) }
        })
        break;
      }
      case this.unfollowUserApiId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.getUserData = true;
            this.getSelectedUserData(this.state.selectedGridUserData?.id, false);
          },
          onFail: () => {
            this.setState({ userFollowButtonLoader: false })
          }
        })
        break;
      }
      case this.deleteChatRoomApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.handleDeleteChatRoomApi()
          },
          onFail: () => { }
        })
        break;
      }
      case this.loginUserCallId: {

        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            let userId = responseDataJson.data.id
            let attributes = { ...responseDataJson.data.attributes, id: userId }
            this.setState({ broadcastDetail: { ...this.state.broadcastDetail, userId: `${userId}`, userName: attributes.full_name, photo: attributes.photo }, currentUser: attributes, current_user_id: userId }, () => {
            });
          },
          onFail: () => {
            this.goBackAfterApiFail();
          }
        })
        break;
      }

      case this.getEndedLiveDetailsApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ endedStreamDetails: responseDataJson.data });
          },
          onFail: () => { }
        })
        break;
      }

      case this.liveStreamDurationId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.handleLiveStreamDurationApi()
          },
          onFail: () => { },
        });
        break;
      }

      case this.teamSelectionApiId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ isTeamMateModalVisible: false, disableMatch: true }, () => {
              this.disableCohostMatchButton()
              this.updateStage(true)
            })
          },
          onFail: () => {
          },
        });
        break;
      }

      case this.deleteRecordingApiId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,

          onSuccess: () => {
            this.setState({ isDeleted: true, deleteRecordingModal: { openAlertModal: false, alertMsg: "" } })
          },
          onFail: () => { }
        })
        break;
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    // Use the general scenario.
    super.componentDidMount();
    // Customizable Area Start
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language })
    if (this.props?.route?.params?.screen === "EndLive") {
      this.getEndedLiveDetails();
      return;
    }
    // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    this.deviceEmitter = DeviceEventEmitter.addListener('CohostInvited', (event: any) => {
      if (!this.state.isLiveChallenge) {
        this.setState({ notificationData: event }, () => {
          this.setState({ notificationModal: { alertMsg: event.message ?? "", openAlertModal: true } })
        })
      }
    })
    // AppState.addEventListener('change', this._handleAppStateChange);
    // this.getreportreasonlist()
    // this.getmutedurationList()
    // this.unsubscribe = this.props.navigation.addListener('focus', () => {
    //   //     this.OnSettinggetfiterApi()
    //   this.getreportreasonlist()
    //   this.getmutedurationList()

    // });
    // this.getSelectedUserData(this.state.selectedGridId);
    if (!(this.props.route.params.stageData?.isRedirectedFromChallenge ?? false)) {
      this.setState({ isTimerVisible: true, selectedTime: 3 }, () => { this.renderTimerModal() });
      setTimeout(() => {
        this.setState({ showInitialMessage: false })
      }, 10000)
    } else {
      this.setState({ showInitialMessage: false })
    }
    // this.unsubscribe = this.props.navigation.addListener('beforeRemove', (e: any) => {
    //   if (this.state.hostComment) {
    //     e?.preventDefault();
    //     this.setState({ hostComment: false });
    //   }
    // })
    // this.hideMatchFaqButton();
    // setInterval(() => {
    //   this.getStopStreamFromAdmin()
    //   this.getReportedDeleteMessageList()
    // }, 15000);
    // this.unsubscribe = this.props.navigation?.addListener("focus",this.addBackHandlerListener)
    // setInterval(() => {
    //   this.checkForSlowMode()
    // }, 20000);
    // Customizable Area End
  }

  // Customizable Area Start
  createRoom = (data: any) => {

    // if (this.props.route.params.stageData?.isViewer) {
    //   const { stream_id, room_id, user_id, user_name }: any = this.props.route.params.stageData;
    //   console.log("////////////22///", this.props.route.params.stageData)

    // }
    // else {
    // }
    const { user_id, user_name, photo, token, stream, } = data;
    const { room_id, stream_id, id } = stream;
    ZegoExpressEngine.instance().loginRoom(room_id, { "userID": user_id, "userName": user_name }, {
      isUserStatusNotify: true,
      maxMemberCount: 0,
      token
    });
    ZegoExpressEngine.instance().startPublishingStream(stream_id)
    // ZegoExpressEngine.instance().startPreview({ "reactTag": findNodeHandle(this.refs.zego_preview_view), "viewMode": 1, "backgroundColor": 0 }).then(() => {
    this.setState({ broadcastDetail: { ...this.state.broadcastDetail, stream_id, startBroadcast: 'true', token, photo, isHost: "true", userID: user_id, userName: user_name, live_stream_id: id } })
    // });
  }

  setPrivateLiveData = (data: { is_private: boolean; userID: number; }) => {
    if (data) {
      this.setState({ privateLiveData: data })
    }
  }

  handleResponseMessageOfgetStopStreamApi(responseDataJson: { stop_stream: boolean }) {
    if (responseDataJson.stop_stream) {
      this.handleStreamEndAlert()
    }
  }
  goBackAfterApiFail = () => {
    this.setState({ alertModal: { openAlertModal: true, alertMsg: translate("something_wnt_wrong") } })
    setTimeout(() => {
      this.setState({ alertModal: { openAlertModal: false, alertMsg: "" } }, () => {
        this.props.navigation.goBack();
      })
    }, 1000)
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
          // this.getCurrentUserDetails();

          ZegoExpressEngine.instance().on("roomStreamUpdate", (roomID, updateType, streamList) => {
            console.log(";;;;;;;;;;;;;;;;22882882882828;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;", streamList);
            if (this.props.route.params.stageData?.isViewer !== true) {
              this.setState({ streamList: [...new Set(streamList.concat(this.state.streamList))] })
            }

          });
          if (this.props.route.params.stageData?.isViewer == true) {
            this.getViewerToken(this.props.route.params.stageData?.id);
          }
          else if (this.props.route.params?.role == "guest") {
            // this.setState({ streamList: [{ stream_id: this.props.route.params.host_stream_id, user_id: this.props.route.params.host_id, user_name: this.props.route.params.host_name, role: "host" }, { stream_id: this.props.route.params.guest_stream_id, user_id: this.props.route.params.user_id, user_name: this.props.route.params.user_name, role: "guest" }] })
            this.cohostStream(this.props.route.params);
          }
          else {
            this.initializeLiveStream();
          }
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
            // this.getCurrentUserDetails();
            ZegoExpressEngine.instance().on("roomStreamUpdate", (roomID, updateType, streamList) => {
              console.log(";;;;;;;;;;;;;;;;22882882882828;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;", streamList);

              if (this.props.route.params.stageData?.isViewer !== true) {
                this.setState({ streamList: [...new Set(streamList.concat(this.state.streamList))] })
              }
            });
            if (this.props.route.params.stageData?.isViewer == true) {
              this.getViewerToken(this.props.route.params.stageData?.id);
            }
            else if (this.props.route.params?.role == "guest") {
              this.setState({ streamList: [{ stream_id: this.props.route.params.host_stream_id, user_id: this.props.route.params.host_id, user_name: this.props.route.params.host_name, role: "host" }, { stream_id: this.props.route.params.guest_stream_id, user_id: this.props.route.params.user_id, user_name: this.props.route.params.user_name, role: "guest" }] })
              this.cohostStream(this.props.route.params)
            }
            else {
              this.initializeLiveStream();
            }
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

  handleGetParticipantInfo = (responseDataJson: any) => {
    if (this.state.broadcastDetail.userRole != "host" && this.state.isLiveChallenge && this.state.broadcastDetail.userRole != "cohost" && responseDataJson.data?.participants?.length > 0) {
      const filteredParticipant = responseDataJson.data?.participants.filter((item: any) => item?.attributes?.user_id === this.state.selectedChallengeUserId
      )
      this.setState({ participantData: filteredParticipant, participantLoader: false });
      return;
    }
    this.setState({ participantData: responseDataJson.data?.participants, participantLoader: false }, () => {
    })
  }

  acceptUpdateInvite = () => {
    this.setState({ notificationStatus: "accepted", notificationModal: { openAlertModal: false, alertMsg: "" } }, () => {
      this.updateInviteStream("accepted")
    })
  }

  handleUpdateInviteApi = () => {
    if (this.state.notificationStatus == "accepted") {
      if (this.state.broadcastDetail.isHost == "true") {
        this.setState({ redirectChatArn: this.state.notificationData.chat_arn, redirectStageArn: this.state.notificationData.stage_arn, redirectStageId: this.state.notificationData.stage_id })
        return
      }
      this.setState({ redirectChatArn: this.state.notificationData.chat_arn, redirectStageArn: this.state.notificationData.stage_arn, redirectStageId: this.state.notificationData.stage_id })
    }
  }

  handleRemoveParticipantApi = () => {

    console.log("==========eeeeeeeeeee======", this.state.notificationData, this.state.participantId)
    if (this.doDeleteStage) {

      this.deleteStage()
    }
    if (this.state.broadcastDetail.isHost == "true" && this.state.notificationData == null) {
      this.props.navigation?.replace("EndLive", { screen: "EndLive", stage_id: this.state.stage_id, account_id: this.state.current_user_id, recordingUrl: this.state.recordingUrl, title: this.state.privateLiveData.is_private ? "" : this.title(), participant_id: this.state.participantId });
    }
  }

  handleGetSelectedUserSuccessApi = (responseDataJson: any) => {
    this.setState({ selectedGridUserData: responseDataJson.data, userFollowButtonLoader: false }, () => {
      if (this.getUserData) {
        this.getUserData = false;
        return
      }
      if (this.state.viewuserModal) {
        this.setState({ viewViewreModal: true })
      } else {
        this.setState({ viewProfileModal: true })
      }
    })
  }

  handleDeleteChatRoomApi = () => {
    if (this.state.notificationData != null) {
      this.redirectFromNotification()
      return
    }
    if (this.state.hostRedirect || this.state.startNewLive) {
      this.removeParticipant(this.state.participantId);
      if (this.state.startNewLive) {
        this.setState({ streamEndPressed: true })
      }
      let stagedats = {
        name: "",
        stageArn: this.state.redirectStageArn,
        isViewer: false,
        chatArn: this.state.redirectChatArn,
        stageId: `${this.state.redirectStageId}`,
        hostId: `${this.state.current_user_id}`,
        viewerType: 'host',
        isRedirectedFromChallenge: true,
        chatData: this.state.hostChatData
      }
      this.restoreButtons();
      this.props.navigation.replace('LiveStreaming', { stageData: stagedats })
    }
  }

  androidBannerStopRecordingHandler = (svedUri: string) => {
    this.setState({ recordingUrl: svedUri, recordingStarted: false })
  }

  handleLiveStreamDurationApi = () => {
    let participant = this.state.usersJoinedData.filter((item) => item.role == 'cohost' || item.role == 'host')
    if (participant.length == 2) {
      this.myTeamIdList = [parseInt(participant[0].id)]
      this.opponentTeamIdList = [parseInt(participant[1].id)]
      let newTeam1 = this.myTeamIdList.map((item) => `${item}`)
      let newTeam2 = this.opponentTeamIdList.map((item) => `${item}`)
      this.setState({ challengeTeams: { teamA: newTeam1, teamB: newTeam2 }, teamIdForNative: [...this.myTeamIdList, ...this.opponentTeamIdList] }, () => {
        this.teamSelectionApiCall();
      })
    } else {
      this.setState({ isTeamMateModalVisible: true })
    }
  }

  handleGetSelectedUserFailureApi = () => {
    if (this.getUserData) this.getUserData = false;
    this.setState({ userFollowButtonLoader: false });
  }

  handleSingleGiftApi = (responseDataJson: any, errorDataJson: any, apiRequestMessageID: any) => {
    if (this.getSingleGiftDataApiCallId.includes(apiRequestMessageID)) {
      this.getSingleGiftDataApiCallId = this.getSingleGiftDataApiCallId.filter((apiId: string) => apiId != apiRequestMessageID);
      handleResponseMessage({
        responseJson: responseDataJson,
        errorJson: errorDataJson,
        onSuccess: () => { this.handleSingleGiftData(responseDataJson?.data) },
        onFail: () => { }
      })
    }
  }

  handleRedirectFromChallenge = (dataStage: any) => {
    this.removeParticipant(this.state.participantId);
    this.setState({ startNewLive: true, streamEndPressed: true }, () => {
      if (dataStage.redirectStageArn && dataStage.redirectStageId && dataStage.hostId && dataStage.redirectChatArn) {
        let stagedats = {
          name: "",
          stageArn: dataStage.redirectStageArn,
          isViewer: this.state.broadcastDetail.userRole === "viewer",
          chatArn: dataStage.redirectChatArn,
          hostId: `${dataStage.hostId}`,
          viewerType: `${this.state.broadcastDetail.userRole == "cohost" ? "host" : this.state.broadcastDetail.userRole}`,
          isRedirectedFromChallenge: true,
          chatData: dataStage.chatData
        }
        this.restoreButtons();
        this.props.navigation.replace('LiveStreaming', { stageData: stagedats })
      }
    })
  }

  keyboardDidShow = () => {
    this.setState({ nativeViewHeight: '150' })
  }

  keyboardDidHide = () => {
    this.setState({ nativeViewHeight: '152' })
  }

  initializeLiveStream = async () => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.startStreamApiCallId = requestMessage.messageId;

    const body = {
      "title": this.props.route.params.data?.title
    }
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `streams/start`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  mixStream = async (data: any) => {
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.mixStreamApiCallId = requestMessage.messageId;

    const body = {
      "title": this.props.route.params.data?.title
    }
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `stream_invites/viewer_stream_config/${data.stream_id}?primary_host_id=${data.host_id}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  cohostStream = (data: any) => {
    console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;", data)
    ZegoExpressEngine.instance().loginRoom(data.room_id, {
      userID: data.user_id,
      userName: data.user_name,
    },
      {
        isUserStatusNotify: true,
        maxMemberCount: 0,
        token: data.token
      });

    ZegoExpressEngine.instance().startPublishingStream(data.guest_stream_id);

    // this.mixStream(data)

  }

  // initializeLiveStream = () => {
  //   let stageArn = this.props.route.params.stageData?.stageArn;
  //   let chatArn = this.props.route.params.stageData?.chatArn ?? '';
  //   let type = this.props.route.params.stageData?.viewerType ?? '';
  //   let stageId = this.props.route.params.stageData?.stageId;
  //   let isChallenge = this.props.route.params.stageData?.isChallenge ?? false;
  //   // if(isChallenge){
  //   //   this.setState({isLiveChallenge:true})
  //   // }
  //   if (type == 'cohost') {
  //     this.setState({
  //       bottomButtons: [
  //         { title: translate("coHost"), icon: shape, disable: true },
  //         { title: translate("Match"), icon: match, disable: false },
  //         { title: translate("invite_guest"), icon: guest, disable: true },
  //         { title: translate("More"), icon: more, disable: false },
  //       ]
  //     })
  //     const currentUserId = this.state.current_user_id;
  //     const hostId = this.props.route.params.stageData?.hostId;

  //     if (currentUserId && hostId) {
  //       const teamIdForNative = [
  //         parseInt(hostId),
  //         parseInt(currentUserId),
  //       ];

  //       teamIdForNative.sort((a, b) => a === parseInt(currentUserId) ? -1 : 1);

  //       this.setState({ teamIdForNative });
  //     }
  //   }

  //   if (stageArn && this.props.route.params.stageData?.isViewer == true) {
  //     this.getStageLists(stageId)


  //     if ((this.props.route.params.stageData?.hostId ?? '0') && (isChallenge)) {
  //       this.setState({ selectedChallengeUserId: parseInt(this.props.route.params.stageData?.hostId ?? '0') })
  //     }
  //     this.setState({ hostId: this.props.route.params.stageData?.hostId ?? '0', stageArn: stageArn, chatRoomArn: chatArn, broadcastDetail: { ...this.state.broadcastDetail, isViewer: 'true', userRole: 'viewer' }, selectedChallengeUserId: parseInt(this.props.route.params.stageData?.hostId ?? '0') }, () => {
  //       this.getCurrentStageData(stageId ?? 0);
  //       this.getSelectedUserData(Number(this.props.route.params.stageData?.hostId ?? '0'), false)
  //       this.createChatToken();
  //       this.createParticipantToken(stageArn!, ["SUBSCRIBE"])
  //       console.log("logging>>>>")
  //     })
  //   } else if (this.props.route.params.stageData?.isRedirectedFromChallenge && type == 'host') {
  //     this.setState({ selectedChallengeUserId: parseInt(this.state.current_user_id ?? '0') })

  //     this.setState({ stageArn: stageArn ?? '', chatRoomArn: chatArn, stage_id: `${stageId ?? 0}`, broadcastDetail: { ...this.state.broadcastDetail, isHost: "true", userRole: 'host' } }, () => {
  //       this.createChatToken();
  //       this.createParticipantToken(stageArn ?? '', ["PUBLISH", "SUBSCRIBE"]);
  //     })

  //   } else if (stageArn) {
  //     this.getSelectedUserData(Number(this.props.route.params.stageData?.hostId), false)
  //     this.setState({ hostId: this.props.route.params.stageData?.hostId ?? '', viewerType: type, stageArn: stageArn, chatRoomArn: chatArn, isParticipantJoined: true, broadcastDetail: { ...this.state.broadcastDetail, userRole: type }, selectedChallengeUserId: parseInt(type === "cohost" ? this.state.current_user_id ?? "0" : this.props.route.params.stageData?.hostId ?? '0') }, () => {
  //       this.createChatToken();
  //       this.createParticipantToken(stageArn!, ["PUBLISH", "SUBSCRIBE"])
  //       if (stageId) {
  //         this.getCurrentStageData(stageId);
  //       }
  //     })
  //   }
  //   else {
  //     this.setState({ selectedChallengeUserId: parseInt(this.state.current_user_id ?? '0') })
  //     this.createStage();
  //   }
  // }

  async componentWillUnmount() {
    // AppState.removeEventListener('change', this._handleAppStateChange);
    this.deviceEmitter?.remove();
    // this.keyboardDidShowListener.remove();
    // this.keyboardDidHideListener.remove();
    this.setState({ streamEndPressed: true, })
    if (this.props?.route?.params?.screen != "EndLive") {
      this.unsubscribe();
    }
    // BackHandler.removeEventListener(
    //   "hardwareBackPress",
    //   this.handleBackButtonClick
    // );
  }

  redirectAsCohost = () => {
    if (this.state.broadcastDetail.isHost == "true") {
      this.deleteStage()
    } else {
      this.redirectFromNotification()
    }
  }

  redirectFromNotification = () => {
    this.removeParticipant(this.state.participantId);
    if (this.state.broadcastDetail.isHost == "true") {
      this.doDeleteStage = true;
      this.stopRecording(false)
    }
    let hostId = "";
    if (this.state.notificationData != null) {
      hostId = this.state.notificationData.stage_created_by_id
    } else {
      hostId = this.state.hostId
    }
    let stages = {
      name: "",
      stageArn: this.state.redirectStageArn,
      isViewer: this.state.broadcastDetail.userRole === "viewer",
      chatArn: this.state.redirectChatArn,
      viewerType: 'cohost',
      hostId,
      chatData: [],
    }
    this.restoreButtons();
    this.props.navigation.replace('LiveStreaming', { stageData: stages })
  }

  handleChildData = (childData: any, isModerator: any) => {
    this.setState({ selectedGridId: childData, viewuserModal: true, mangemodeview: isModerator }, () => {
      this.getSelectedUserData(childData, isModerator)
    })
  };

  getCurrentStageData = async (stageId: number) => {
    const token = await getStorageData("authToken", false)
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.getStageDataApiId = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.getCurrentStageData + `?id=${stageId}`,
      method: configJSON.getMethod,
      header: headers,
      body: undefined
    });
  }



  getCurrentUserDetails = async () => {

    const token = await getStorageData("authToken", false)
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.loginUserCallId = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType, token,
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: "bx_block_cflivechallenges/get_logged_in_user_data",
      method: "GET",
      header: headers,
    });
  }

  createChatToken = async () => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.createChatTokenApiCallId = requestMessage.messageId;

    const body = {
      "room_identifier": this.state.chatRoomArn,
      "capabilities": ["SEND_MESSAGE"],
      "session_duration": 180
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.createChatToken}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  getGiftDataById = async (giftId: string) => {
    const token = await getStorageData("authToken", false);

    const apiEndPoint = configJSON.getCatelogById + `${giftId}`;

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getSingleGiftDataApiCallId.push(requestMessage.messageId);
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: apiEndPoint,
      method: configJSON.getApiMethodType,
      header: header,
    });
  }
  getViewerToken = async (id: string) => {
    const token = await getStorageData("authToken", false);

    const apiEndPoint = `streams/${id}/viewer_token`;

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getViewerTokenApiCallId = (requestMessage.messageId);
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: apiEndPoint,
      method: configJSON.getApiMethodType,
      header: header,
    });
  }
  viewerStream = (data: any) => {
    const { room_id, token, viewer_id, stream_id, photo, streamer_id, streamer_name, viewer_name } = data;
    ZegoExpressEngine.instance().on('roomUserUpdate', (_roomID, updateType, userList) => {
      if (updateType === 0) {
        this.setState(prev => ({ totalViewersCount: prev.totalViewersCount + userList.length }));
      } else if (updateType === 1) {
        this.setState(prev => ({ totalViewersCount: Math.max(prev.totalViewersCount - userList.length, 0) }));
      }
    });

    if (this.props.route.params.stageData?.isViewer == true) {
      ZegoExpressEngine.instance().on("roomStreamUpdate", (roomID, updateType, streamList) => {
        console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;", streamList)
        const isHostLeft = streamList.find(stream => stream.user.userID == streamer_id);
        if (updateType === 1 && isHostLeft) {
          ZegoExpressEngine.instance().stopPlayingStream(stream_id);
          ZegoExpressEngine.instance().logoutRoom(roomID);
          this.props.navigation.reset({
            index: 0,
            routes: [
              { name: 'BottomTabScreen' },
            ],
          });
        }
      });
      ZegoExpressEngine.instance().loginRoom(room_id, { "userID": viewer_id, "userName": viewer_name }, {
        isUserStatusNotify: true,
        maxMemberCount: 0,
        token: token
      }).then(() => {
        ZegoExpressEngine.instance().startPlayingStream(stream_id, { "reactTag": findNodeHandle(this.refs.zego_play_view), "viewMode": 1, "backgroundColor": 0 }).then(() => {
          this.setState({
            broadcastDetail: { ...this.state.broadcastDetail, stream_id, token, isViewer: "true", isHost: "false", startBroadcast: "true", photo, userID: streamer_id, userName: streamer_name },
          })
        });
      })
    }
  }

  renderTimerModal = async () => {
    let selectedTime = this.state.selectedTime + 1;
    let countDown = setInterval(() => {
      if (selectedTime == 0) {
        this.setState({ isTimerVisible: false })
        this.requestPermissions();
        clearInterval(countDown);
      }
      else {
        --selectedTime;
        this.setState({ selectedTime });
      }
    }, 1000)
  }

  createParticipantToken = async (stageArn: string, capabilities: string[]) => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.createTokenApiCallId = requestMessage.messageId;
    let type = this.getUserType();
    const body = {
      "capabilities": capabilities,
      "stage_arn": stageArn,
      "attributes": {
        "userId": `${this.state.currentUser?.id ?? 0}`,
        "userName": this.state.currentUser?.full_name ?? "",
        "isHost": this.state.broadcastDetail.isHost,
        "photo": this.state.currentUser?.photo ?? "",
        "userRole": type
      },
      "participant_type": type
    };
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.createParticipantToken}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  getUserType = () => {
    if (this.state.broadcastDetail.isHost === "true") {
      return "host"
    } else if (this.state.broadcastDetail.isViewer === "true") {
      return "viewer"
    } else {
      if (this.state.viewerType === "friend") {
        return "guest";
      }
      return this.state.viewerType ?? "guest"
    }
  }


  creategifts = async (id: any) => {
    this.setState({ participantModel: false });

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.creategiftsApiCallId = requestMessage.messageId;

    const body = {
      "catalogue_id": this.state.selectedGift?.id,
      "donated_to_id": id,
      "coin_giftable_type": "BxBlockIvslivestreams::Stage",
      "coin_giftable_id": this.state.stage_id
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.creategifts}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  followUser = async (userId: string, isHost: boolean = false) => {
    const token = await getStorageData("authToken", false)
    const header = {
      token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    if (isHost) {
      this.followHostApiId = requestMessage.messageId;
    } else {
      this.followUserApiId = requestMessage.messageId;
      this.setState({ userFollowButtonLoader: true });
    }
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.followRequest,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify({
        "data": {
          "account_id": userId
        }
      })
    });
  }


  unfollowUser = async (userId: string, isForHost: boolean = false) => {
    const token = await getStorageData("authToken", false)
    const header = {
      token
    };
    const isRequested = (this.state.hostDetails?.followings_status === "requested" || (!isForHost && this.state.selectedGridUserData?.attributes?.followings_status === 'requested'));
    const endPoint = isRequested ? `${configJSON.selfCancelRequest}${userId}` : `${configJSON.followAccount}/${userId}`;
    const method = isRequested ? configJSON.patchMethod : configJSON.deleteAPIMethod;
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    if (isForHost) {
      this.followHostApiId = requestMessage.messageId;
    } else {
      this.unfollowUserApiId = requestMessage.messageId;
      this.setState({ userFollowButtonLoader: true });
    }

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint,
      method,
      header: header,
      body: undefined
    });
  }


  getParticipant = async () => {
    this.setState({ participantLoader: true });
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getParticipantid = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `bx_block_ivslivestreams/livestreams/stage_participants?stage_arn=${this.state.stageArn}`,
      method: configJSON.getMethod,
      header: header,
      body: undefined

    });
  }

  getStopStreamFromAdmin = async () => {
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getStopStreamFromAdminApiId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `bx_block_ivslivestreams/livestreams/stop_stream/${this.state.stage_id}`,
      method: configJSON.getMethod,
      header: header,
    });
  }

  getReportedDeleteMessageList = async () => {
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getReportedDeleteMessageListAdminApiId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `bx_block_ivslivestreams/reported_messages/reported_messages_list?stage_id=${this.state.stage_id}`,
      method: configJSON.getMethod,
      header: header,
    });
  }

  createStage = async () => {
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.createStageApiCallId = requestMessage.messageId;
    const live_title = this.props.route.params.data?.title ?? (this.state.currentUser?.user_name ?? '');
    let title = live_title;
    title = title?.replace(/[^a-zA-Z0-9\s]/g, '');
    title = title?.length > 10 ? title.slice(0, 9) : title;
    title = title.replace(/\n/g, '')
    const body = {
      "name": (title ?? '').replace(' ', ''),
      "tags": { "hostId": this.state.currentUser?.id ?? '0' },
      "is_challenge": false,
      "title": live_title,
      "image": this.props.route.params.data?.image ?? "",
      ...(this.state.privateLiveData.is_private && { "is_private": this.state.privateLiveData.is_private }),
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.createStage}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }


  createNewStage = async () => {
    if (this.state.createNewStageCalled) {
      return
    }
    this.setState({ createNewStageCalled: true })
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.createNewStageApiCallId = requestMessage.messageId;

    const body = {
      "name": (this.state.currentUser?.user_name ?? ''),
      "tags": { "hostId": this.state.currentUser?.id ?? 0 },
      "is_challenge": false,
      "title": (this.state.currentUser?.user_name ?? '').replace(' ', ''),
      "image_url": this.state.currentUser?.photo ?? ''
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.createStage}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  title = () => {
    if (this.props.route.params?.data?.title) {
      return this.props.route.params.data.title;
    } else if (this.props.route.params?.EventDetails.attributes.event_name) {
      return this.props.route.params.EventDetails.attributes.event_name;
    }
    else {
      return ""
    }
  }

  topic = () => {
    if (this.props.route.params?.data?.topic) {
      return this.props.route.params.data.topic;
    } else if (this.props.route.params?.EventDetails.attributes.description) {
      return this.props.route.params.EventDetails.attributes.description;
    }
    else {
      return ""
    }
  }

  updateStreamDetails = async () => {
    const token = await getStorageData("authToken", false)

    const header = {
      "Content-Type": "multipart/form-data",
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    const formdata = new FormData();
    formdata.append("title", this.title());
    formdata.append("topic", this.topic());
    formdata.append("arn", this.state.stageArn);
    const image = this.props.route.params?.data?.image?.uri ?? false;
    if (image) formdata.append("image", this.props.route.params?.data?.image);

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.updateStage}`,
      method: configJSON.patchMethod,
      header: header,
      body: formdata,
    });
  }

  callFollowUnfollowApi = (isFollowing: boolean, selectedId: any) => {
    if (!isFollowing) {
      this.followUser(selectedId)
    } else {
      this.unfollowUser(selectedId)
    }
  }

  updateStage = async (isChallenge: boolean, is_participant_dropped: boolean | null = null, isAutoCancel: boolean = false) => {
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    let participant = this.state.usersJoinedData.filter((item) => item.role == 'cohost' || item.role == 'host')

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    if (isChallenge) {
      this.setState({ isLiveChallenge: true }, () => {
        this.startTimer();
        setTimeout(() => {
          this.setState({ nativeViewHeight: '350' })
        }, 500)
      })
    }

    const body: any = {
      "arn": this.state.stageArn,
      "is_challenge": isChallenge,
      "duration": this.state.duration,
      "type_of_challenge": `${participant.length / 2}v${participant.length / 2}`,
    };

    if (!isChallenge && !isAutoCancel) {
      body.participant_dropped = is_participant_dropped;
      body.cancelled_by_id = this.state.current_user_id;
    }
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.updateStage}`,
      method: configJSON.patchMethod,
      header: header,
      body: JSON.stringify(body)
    });

  }





  createNewChatRoom = async () => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.createNewChatApiCallId = requestMessage.messageId;

    const body = {
      "name": "room2",
      "maximum_message_length": 256,
      "maximum_message_rate": 5,
      "tags": { "key1": "value1" },
      "stage_arn": this.state.redirectStageArn
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.createChatRoom}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  checkForSlowMode = async () => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.checkForSlowModeApiCallId = requestMessage.messageId;


    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.checkForSlowModeApiEndPoint}`,
      method: configJSON.getApiMethodType,
      header: header,
    });
  }

  deleteStage = async () => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    console.log(";;;;;;;;;;;;;;dd;d;", requestMessage)

    this.stopStreamApiCallId = requestMessage.messageId;

    const body = {
      arn: this.state.stageArn
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.deleteStage}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }


  createChatRoom = async () => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.createChatApiCallId = requestMessage.messageId;

    const body = {
      "name": "room1",
      "maximum_message_length": 256,
      "maximum_message_rate": 5,
      "tags": { "key1": "value1" },
      "stage_arn": this.state.stageArn
    };


    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.createChatRoom}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }









  deleteChatRoom = async () => {
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    const body = {
      room_identifier: this.state.chatRoomArn
    };

    this.deleteChatRoomApiCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.deleteChatRoom}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }
  setLiveChallangeDuration = async (duration: number) => {
    this.disableCohostMatchButton();
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    const body = {
      "stage_arn": this.state.stageArn,
      "duration": duration
    };

    this.liveStreamDurationId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.durationLiveStream}`,
      method: configJSON.putMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }
  teamSelectionApiCall = async () => {
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    const body = {
      team1: this.myTeamIdList,
      team2: this.opponentTeamIdList,
      stage_id: this.state.stage_id
    };

    this.teamSelectionApiId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.teamAllocation}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  removeParticipant = async (id: any) => {

    if (this.state.blockuserid != null) {
      id = this.state.blockuserid
    }

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };
    const body = {
      "participant_id": id,
      "reason": "tst",
      "stage_arn": this.state.stageArn
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.removeParticipantid = requestMessage.messageId;
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `bx_block_ivslivestreams/livestreams/remove_participant`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)

    });
  }


  Blockuser = async () => {

    const token = await getStorageData("authToken", false);

    const header = {
      token
    };
    const body = {
      "id": this.state.selectedGridId,
      "stage_id": this.state.stage_id
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.blockUserid = requestMessage.messageId;
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `bx_block_block_users/block_users`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)

    });
  }

  getreportreasonlist = async () => {
    this.setState({ participantLoader: true });
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.getreportreasonid = requestMessage.messageId;
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `account_block/reported_users/report_reason_list`,
      method: configJSON.getMethod,
      header: header,
      body: undefined

    });
  }

  getStageLists = async (id: any) => {

    const token = await getStorageData("authToken", false);

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getstageiddataApiCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `bx_block_ivslivestreams/livestreams/get_stage?id=${id}`,
      method: configJSON.getApiMethodType,
      header: header,
      body: undefined,
    });
  };



  getEndedLiveDetails = async () => {
    const token = await getStorageData("authToken", false);
    let stageId = this.props.route?.params?.stage_id;
    let accountId = this.props.route?.params?.account_id;
    const apiEndPoint = configJSON.getEndedStreamDetails + "?stage_id=" + stageId + "&account_id=" + accountId + "&participant_id=" + this.props.route.params.participant_id;

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getEndedLiveDetailsApiCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: apiEndPoint,
      method: configJSON.getApiMethodType,
      header: header,
    });
  };

  updateInviteStream = async (acceptStatus: string) => {
    const authToken = (await getStorageData('authToken', false)) || '';

    const body = {
      invite_id: this.state.notificationData.invite_id,
      status: acceptStatus
    }

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: authToken
    }

    const getDataMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.updateInviteCallId = getDataMsg.messageId;

    createRequestMessage({
      requestMessage: getDataMsg,
      endPoint: configJSON.updateInvite,
      method: configJSON.putMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  getSelectedUserData = async (userId: number | null, isForChallange: boolean = true) => {
    const token = await getStorageData("authToken", false);

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    if (isForChallange || this.state.viewuserModal || this.state.userFollowButtonLoader) {
      this.getSelectedUserDataApiCallId = requestMessage.messageId;
    }
    else {
      this.getHostDetailsApiCallId = requestMessage.messageId;
    }

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `account_block/user?id=${userId}&stage_id=${this.state.stage_id}`,
      method: configJSON.getApiMethodType,
      header: header,
    });
  }

  attachRecording = async () => {
    const token = await getStorageData("authToken", false);
    const random = uuidv4();
    const imageData: any = {
      uri: "file://" + this.state.recordingUrl, type: 'video/mp4', name: `${random}.mp4`
    }

    const header = {
      token: token,
    };

    let formdata = new FormData();

    formdata.append("stage_id", `${this.state.stage_id}`);

    formdata.append("video", imageData);

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    requestMessage.addData
      (getName(MessageEnum.RestAPIResponceEndPointMessage),
        "bx_block_ivslivestreams/livestreams/attach_recording"
      );

    requestMessage.addData
      (getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header));

    this.attachRecordingApiCall = requestMessage.messageId;

    requestMessage.addData
      (getName(MessageEnum.RestAPIRequestBodyMessage),
        formdata);

    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), "POST");

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getViewerOrHostDetails = (isName: boolean = false) => {
    if (isName) {
      // let name = "";
      // if (this.state.broadcastDetail.isHost === "true") {
      //   name = this.state.currentUser?.full_name || ""
      // } else {
      //   name = this.state.hostDetails?.full_name || ""
      // }
      return this.state.broadcastDetail?.userName;
    }
    // if (this.state.broadcastDetail.isHost === "true") {
    //   return this.state.currentUser?.photo || ""
    // } else {
    //   return this.state.hostDetails?.photo || ""
    // }
    return this.state.broadcastDetail?.photo;

  }

  handleHostFollowButton = () => {
    this.setState({ followButtonLoader: true });
    if (this.state.hostDetails?.userId) {
      if (this.state.hostDetails?.followings_status === "following" || this.state.hostDetails?.followings_status === "requested") {
        this.unfollowUser(this.state.hostDetails.userId ?? '', true);
      } else if (this.state.hostDetails?.followings_status === "follow") {
        this.followUser(this.state.hostDetails.userId ?? '', true);
      }
      return
    }
    this.setState({ followButtonLoader: false });
  }

  getFollowButtonStatus = () => {
    if (this.state.broadcastDetail.userRole == "host") return null;
    if (this.state.hostDetails) {
      let status = null;
      if (this.state.hostDetails?.followings_status == "follow") {
        status = `+ ${translate("Follow")}`;
      } else if (this.state.hostDetails?.followings_status == "following") {
        status = translate("unfollow");
      } else if (this.state.hostDetails?.followings_status === "requested") {
        status = translate("requested");
      }
      return status ? status : this.state.hostDetails?.followings_status;
    }
    return null;
  }

  getUsersFollowButtonStatus = (status: string) => {
    if (status == "follow") {
      return translate("Follow");
    } else if (status == "following") {
      return translate("unfollow");
    } else if (status === "requested") {
      return translate("requested");
    }
    return status;
  }

  onPressWeeklyRanking = () => {
    this.props.navigation.navigate("Leaderboard");
  }

  onPressExplore = () => {
    this.setState({ alertModal: { alertMsg: this.liveExploreAlertMsg, openAlertModal: true } })
  }

  handleBackButtonClick = () => {
    if (this.state.isLiveChallenge) {
      this.setState({ cancelMatchModal: true });
      return true;
    }
    return false;
  };

  handleInviteModal = (modalNumber: number) => {
    if (modalNumber === 0) {
      this.setState({ invitationModel: modalNumber, searchresult: [], value: "" });
      return
    }
    this.hostOrGuest = modalNumber === 1 ? 'cohost' : 'guest';
    this.setState({ invitationModel: modalNumber });
  };

  setHostSideModeratorList = (data: any) => {
    this.setState({
      hostSideModeatorData: data
    })
  }

  onSelectMute = (item: any) => {
    this.setState({ selectedmutelable: item })
    if (this.state.Commentsetting) {
      this.setState({ selectedmutelable: item, addMUterModel: true, isMuteDurationModalVisible: false })
    } else {
      this.setState({
        isMuteDurationModalVisible: false
      })
    }
  }

  openSettingsModal = () => this.setState({
    ModeraterModel: false,
    Settingviewmodel: true,
    searchresult: [],
  })

  onCloseReportModal = () => this.setState({ showReportModal: false })

  onSelectParticipant = (userId: any) => {
    this.setState({
      donateid: userId,
    })
    this.creategifts(userId)
  }

  onCloseDuration = () => this.setState({ challangeModalPopup: false, disableMatch: false })

  onSelectDuration = (minute: number) => {
    this.setState({ duration: minute, minutes: minute, challangeModalPopup: false, seconds: 0 }, () => {
      this.setLiveChallangeDuration(minute)
    })
  }

  onMuteSetting = () => this.setState({
    isMuteDurationModalVisible: true,
    Settingviewmodel: false,
    isCommentModalVisible: false,
    selectedmutelable: ''
  })

  onUpdateComment = () => this.setState({ allowComments: !this.state.allowComments }, () => { this.updateallowComment() })

  onCloseCommentSetting = () => this.setState({ Settingviewmodel: true, isCommentModalVisible: false })

  openCommentModal = () => this.setState({ isCommentModalVisible: false })

  onCloseSetting = () => this.setState({ Settingviewmodel: false })

  goBackFromSetting = () => this.setState({ Settingviewmodel: false, settingsModal: true })

  handleBottomButtonClick = (item: any) => {
    switch (item.title) {
      case translate("More"):
        this.setState({ settingsModal: true });
        break;
      case translate("Match"): {

        if (!this.state.disableMatch) {

          //check number of cohost then move forward

          let cohostArr = this.state.usersJoinedData.filter((item: any) => item.role == 'cohost' || item.role == 'host')

          if ((cohostArr.length % 2) === 0) {

            this.setState({ challangeModalPopup: true });

          } else {

            this.setState({ alertModal: { openAlertModal: true, alertMsg: translate("live_challenge_start") } })

          }

          return;

        } else if (this.state.isLiveChallenge) {

          this.updateStage(false, false);

          this.setState({ cancelMatch: true })

        }

      }

        break;

      case translate("invite_guest"): {
        if (!item.disable) {
          this.handleInviteModal(2);
          this.setState({
            loader: true
          })
          // this.getGuestOrCoHostAccountsLists({searchText:''})
        }
      }
        break
      case translate("coHost"): {
        if (!item.disable) {
          this.handleInviteModal(1);
          this.setState({
            loader: true
          })
          // this.getGuestOrCoHostAccountsLists({searchText:''})
        } else if (this.state.broadcastDetail.userRole === "cohost") {
          this.setState({ cancelCohostModel: { openAlertModal: true, alertMsg: translate("cancel_sream") } })
        }
        break;
      }
      default:
        return;
    }
  };

  startTimer = () => {
    if (!this.state.isRunning) {
      this.interval = setInterval(this.updateTimer, 1000);
      this.setState({ isRunning: true });
    }

  };

  stopTimer = () => {
    clearInterval(this.interval);
    this.setState({ isRunning: false });
  };

  resetTimer = () => {
    clearInterval(this.interval);
    this.setState({
      minutes: 1, // Reset back to 5 minutes
      seconds: 0,
      isRunning: false,
    });
  };

  updateTimer = () => {
    if (this.state.seconds === 0) {
      if (this.state.minutes === 0) {
        this.stopTimer();
        if (this.state.broadcastDetail.isHost == "true") {
          this.updateStage(false, null, true);
          this.setState({ cancelMatch: true })
        }
        // You can add additional actions when the timer reaches 0.
      } else {
        this.setState((prevState) => ({
          minutes: prevState.minutes - 1,
          seconds: 59,
        }));
      }
    } else {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }
  };

  cancelChallenge = () => {
    this.updateStage(false, true);
    this.setState({ powerButtonWithoutChallenge: true, cancelMatchModal: false })
    if (this.state.broadcastDetail.userRole == "guest" || this.state.broadcastDetail.userRole == "viewer") {
      this.setState({ streamEndPressed: true })
      return
    }
    this.setState({ coHostLeave: true })
  }

  hideMatchFaqButton = () => {
    setTimeout(() => {
      this.setState({ viewMatchFaq: false })
    }, 5000)
  }

  endLive = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this.handleNavigationOnEndLive(true);
  };

  updateallowComment = async () => {
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.updateStageApiCallId = requestMessage.messageId;

    const body = {
      "arn": this.state.stageArn,
      "is_allow_comment": this.state.allowComments,

    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.updateStage}`,
      method: configJSON.patchMethod,
      header: header,
      body: JSON.stringify(body)
    });



  }

  deleteRecording = async (stageID: any) => {
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.deleteRecordingApiId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `bx_block_ivslivestreams/livestreams/remove_recording?id=${stageID}`,
      method: configJSON.deleteAPIMethod,
      header: header,
      body: ""
    });

  }


  getmutedurationList = () => {

    const translatedReportReasons = [
      //   {
      //   label:'5 seconds',
      //   value:0
      // },
      // {
      //   label:"30 seconds",
      //   value:1
      // },
      // {
      //   label:"1 minutes",
      //   value:2
      // },
      // {
      //   label:"5 minutes",
      //   value:3
      // },
      {
        label: "Entire Live",
        value: 4
      },
    ]
    this.setState({ muteDurationList: translatedReportReasons })

  };

  getReportReasonsList = (res: any) => {
    const reportReasons = Object.keys(res.reason).map(item => {
      return {
        label: item,
        value: res.reason[item]
      }
    })
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
    this.setState({ reportreasonData: translatedReportReasons })
  };


  handlecancelMatchModal = () => {
    this.setState({ cancelMatchModal: false });
  };

  handleSettinsModal = () => {
    this.setState({ settingsModal: false });
  };

  handleSettinsviewModal = () => {
    this.setState({ Settingviewmodel: false, settingsModal: true });
  };

  handleMangeviewModal = () => {
    this.setState({ ManageViewModal: false });
  };

  handleMirrorVideo = () => {
    this.setState({ mirrorVideo: !this.state.mirrorVideo });
  }

  handleMicrophone = () => {
    this.setState((prevState) => ({ isMute: (prevState?.isMute == false) ? true : false }), () => {
      ZegoExpressEngine.instance().mutePublishStreamAudio(this.state.isMute);
    });
  }

  handleFlipCamera = () => {
    this.setState((prevState) => ({ flipCamera: (prevState?.flipCamera == false) ? true : false }), () => {
      ZegoExpressEngine.instance().useFrontCamera(this.state.flipCamera);
    })
  }

  handleReport = () => {
    this.getreportreasonlist()
    this.setState({
      showReportModal: true,
      viewProfileModal: false,
      ManageViewModal: false,
      Settingviewmodel: false
    })
  }

  handleComment = () => {
    this.handleSettinsModal();
    this.setState({
      hostComment: true,
    });
  }

  handleGift = () => {
    this.setState({ settingsModal: false, giftsModal: true })
  }

  handleComment1 = () => {
    this.handleSettinsModal();
    this.setState({
      isCommentModalVisible: true,
      Settingviewmodel: false,
      Commentsetting: true
    });
    this.getmutedurationList()
  }

  handleMutedaccountlist = () => {
    this.setState({ Settingviewmodel: false, isMutedAccountsModalVisible: true })
    DeviceEventEmitter.emit('getMuteccountViwerslist', {})
  }

  handelmangeview = (mute_user: any, is_moderator: any) => {

    DeviceEventEmitter.emit('getMuteccountViwerslist', {})
    this.setState({ Addmutelable: mute_user === true ? translate("unmute") : translate("Mute") })

    this.setState({ Addmodratorlable: is_moderator === true ? translate("remove_moderator") : translate("Add_Moderator") })
    this.state.mangemodeview == true ?
      this.setState({
        ManageviewData: [{ label: translate("report"), icon: null, onpress: this.handleReport },
        {
          label: mute_user === true ? translate("unmute") : translate("Mute"), icon: null,
          onpress: () => {
            this.muteUnmutePress(mute_user)
          }
        },
        { label: translate("block"), icon: null, onpress: this.handleBlock },
        { label: translate("cancel"), icon: null, onpress: this.handleMangeviewModal },
        ]
      }) : this.setState({
        ManageViewModal: true, settingsModal: false, ManageviewData: [{ label: translate("report"), icon: null, onpress: this.handleReport },
        {
          label: mute_user === true ? translate("unmute") : translate("Mute"), icon: null,
          onpress: () => { this.muteUnmutePress(mute_user) }
        },
        { label: translate("block"), icon: null, onpress: this.handleBlock },
        { label: is_moderator === true ? translate("remove_moderator") : translate("Add_Moderator"), icon: null, onpress: this.handleAddModerater },
        { label: translate("cancel"), icon: null, onpress: this.handleMangeviewModal },
        ]
      });
    this.setState({
      ManageViewModal: true,
      viewViewreModal: false,
    })
  }

  handleModerater = () => {
    this.setState({
      loader: true
    })

    this.setState({ Settingviewmodel: false, ModeraterModel: true });
  }


  handleAddModerater = () => {
    this.setState({
      loader: true
    })

    if (this.state.selectedGridUserData?.attributes?.followings_status != 'following') {
      this.setState({ alertModal: { openAlertModal: true, alertMsg: translate("usernotFollowing"), } })

    } else {
      (this.state.hostSideModeatorData ?? []).forEach((item: any) => {
        this.forEachValueOfHostSideModeator(item)
      })
    }
  }

  forEachValueOfHostSideModeator(item: { id: number | null; is_moderator: string | null; }) {
    if (item.id == this.state.selectedGridId && (item.is_moderator == 'Remove')) {
      this.setState({ moderoteraddreove: 'false' })
      DeviceEventEmitter.emit('addremoveModerator', this.state.selectedGridId)
    }
    else if ((item.id == this.state.selectedGridId) && ((item.is_moderator == 'Add') || (item.is_moderator == null))) {
      this.setState({ moderoteraddreove: 'true' })
      DeviceEventEmitter.emit('addremoveModerator', this.state.selectedGridId)
    }
    this.handelmangeview(this.state.selectedGridUserData?.attributes?.is_stage_mute_user, this.state.selectedGridUserData?.attributes?.is_moderator)
    this.setState({
      ManageViewModal: true,
      viewViewreModal: false,
      Addmutelable: this.state.selectedGridUserData?.attributes?.is_stage_mute_user ? translate("unmute") : translate("Mute"),
      Addmodratorlable: this.state.selectedGridUserData?.attributes?.is_moderator ? translate("remove_moderator") : translate("Add_Moderator")
    })
    this.setState({ ManageViewModal: false })
  }

  muteUnmutePress = (mute_user: any) => {
    if (mute_user === false) {
      this.setState({ settingsModal: false, isMuteDurationModalVisible: true, ManageViewModal: false })
    } else {
      this.setState({ ManageViewModal: false })
      DeviceEventEmitter.emit("Muteaccountpost", this.state.selectedGridId)
    }
  }


  handleBlock = () => {
    this.setState({ BlockAlertMsg: { openAlertModal: true, alertMsg: translate("blockUser"), } });
  }

  handleSettingviewmodel = () => {
    this.setState({ Settingviewmodel: true, settingsModal: false });
  }

  shareLink = async () => {
    if (typeof Share.open === "function") {
      const appBaseUrl = baseURL.endsWith('/') ? baseURL : baseURL + "/";
      let hostId = '';
      if (this.state.broadcastDetail.userRole === "viewer" || this.state.broadcastDetail.userRole === "guest") {
        hostId = this.props.route.params.stageData?.hostId ?? '';
      } else {
        hostId = this.state.current_user_id;
      }
      const url = `${appBaseUrl}admin/?Livestreaming?stageId=${this.state.stage_id}&hostId=${hostId}&stageArn=${this.state.stageArn}&chatArn=${this.state.chatRoomArn}`;
      const title = "We make software so easy, everyone can do it";
      const message = "Please check this out.";

      const options = {
        title,
        url,
        message
      };

      const token = await getStorageData("authToken", false)

      const header = {
        "Content-Type": configJSON.exampleApiContentType,
        token: token,
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage),
      );
      const body = {
        stage_id: this.state.stage_id
      };

      createRequestMessage({
        requestMessage: requestMessage,
        endPoint: `${configJSON.shareapicall}`,
        method: configJSON.postMethod,
        header: header,
        body: JSON.stringify(body)
      });

      Share.open(options)
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: any) => {
          err && console.log(err);
        });
    }
  }

  endLiveAlert = () => {
    if (this.state.broadcastDetail.isViewer == "true") {
      this.setState({ alertModal: { alertMsg: this.endliveAlertMsg, openAlertModal: true } })
      return
    }
    if (this.state.isLiveChallenge) {
      this.setState({ cancelMatchModal: true })
    } else {
      this.setState({ alertModal: { alertMsg: this.endliveAlertMsg, openAlertModal: true } })
    }
  }
  // endLiveAlert = () => {
  //   const { isHost, stream_id } = this.state.broadcastDetail;
  //   if (isHost == "true") {
  //     ZegoExpressEngine.instance().stopPublishingStream();
  //     ZegoExpressEngine.instance().stopPlayingStream(stream_id);
  //   }
  // }

  getVeiwerFolloweGifterCount = (type: string) => {
    let count = 0;
    if (type === translate("Total_Views")) {
      count = this.state.endedStreamDetails?.viewer_count;
    } else if (type === translate("new_Followers")) {
      count = this.state.endedStreamDetails?.live_followers;
    } else if (type === translate("gifters")) {
      count = this.state.endedStreamDetails?.coin_gift_count;
    }
    return this.formatNumber(count) ?? 0;
  }

  restoreButtons = () => {
    this.setState({ bottomButtons: this.bottomButtons });
  }

  handleNavigationOnEndLive = (goToEndLiveScreen: boolean = false) => {
    if (this.state.broadcastDetail.userRole == "host") {
      this.stopRecording(true)
      return
    }
    if (!this.doDeleteStage) this.removeParticipant(this.state.participantId);
    if (this.state.gotoExplore) {
      this.props.navigation.reset({
        index: 0,
        routes: [
          { name: 'Live' },
        ],
      });
      return
    }
    if (goToEndLiveScreen) {
      this.stopRecording(true)
      return;
    }
    this.props.navigation.reset({
      index: 0,
      routes: [
        { name: 'BottomTabScreen' },
      ],
    });
  }

  startRecording = async () => {
  }

  stopRecording = async (isRedirected: boolean) => {
    // this.removeParticipant(this.state.participantId)
  }

  onParticipantAdded = (event: any) => {
    if (event.nativeEvent) {
      let { userId, userName, userRole, userPhoto } = event.nativeEvent;
      this.timeLimitedCache.push(userId)
      if (!this.checkAvailability(userId)) {
        this.setState({ usersJoinedData: [...this.state.usersJoinedData, { id: userId, name: userName, role: userRole, photo: userPhoto }] }, () => {

          if (this.state.usersJoinedData.length == 1 && !this.state.recordingStarted && this.state.broadcastDetail.isHost == "true") {
            this.startRecording()
          }

          let participant = this.state.usersJoinedData.filter((item) => item.role == 'cohost' || item.role == 'host')
          let newParticipant = participant.map((item) => {
            return { ...item, isSelected: false }
          })
          this.setState({ invitedUserList: newParticipant })
        })
      }
    }
  };

  onParticipantLeft = (event: any) => {
    if (event.nativeEvent) {
      let { userId, userName, userRole } = event.nativeEvent;
      this.removeIdFromCache(userId)
      let newArr = this.state.usersJoinedData.filter((item) => item.id != userId)
      let newInvitedList = this.state.invitedUserList.filter((item: any) => item.id != userId)
      if (userRole == "cohost") {
        this.setState({ userLeftName: userName })
      }
      this.setState({ usersJoinedData: newArr, invitedUserList: newInvitedList }, () => {
        this.handleLastCohost(userRole)
        if ((this.state.broadcastDetail.userRole == "cohost" || this.state.broadcastDetail.isHost == "true") && this.state.usersJoinedData.length == 1 && this.state.bottomButtons.length > 1) {
          const newBottomButtons = [...this.state.bottomButtons];
          newBottomButtons[0].disable = false
          newBottomButtons[1].disable = false
          newBottomButtons[2].disable = false
          this.setState({ bottomButtons: newBottomButtons });
        }
      })
    }
  };

  handleLastCohost = (userRole: string) => {
    let cohostArr = this.state.usersJoinedData.filter((item: any) => item.role == 'cohost')
    let hostArr = this.state.usersJoinedData.filter((item: any) => item.role === 'host')
    if (cohostArr.length == 1 && this.state.broadcastDetail.userRole == "cohost" && hostArr.length === 0) {
      this.setState({ startNewLive: true }, () => {
        this.createNewStage()
      })
    }
  }

  removeIdFromCache = (userId: string) => {
    if (this.timeLimitedCache.includes(userId)) {
      let index = this.timeLimitedCache.findIndex((timeId) => timeId == `${userId}`);
      this.timeLimitedCache.splice(index, 1);
      let newIndex = this.timeLimitedCache.findIndex((timeId) => timeId == `${userId}`);
      if (newIndex != -1) {
        this.removeIdFromCache(userId)
      }
    }
  }

  checkAvailability = (val: any) => {
    return this.state.usersJoinedData.some(function (arrVal: any) {
      return val === arrVal.id;
    });
  }

  endbuttonPressed = () => {
    if (this.state.powerButtonWithoutChallenge) {
      this.handleNavigationOnEndLive(this.state.broadcastDetail.isHost === "true")
      return
    }

    if (this.state.startNewLive) {
      return
    }

    if (this.state.isBlocked == true) {
      this.handleNavigationOnEndLive(false)
      return

    }

    this.closeAlertModal();

    let participant = this.state.usersJoinedData.filter((item) => item.role == 'cohost' || item.role == 'host' || item.role == 'friend')
    if (participant.length == 1 && this.state.broadcastDetail.userRole != "viewer" && this.state.broadcastDetail.userRole != "guest") {
      this.doDeleteStage = true;
      return
    }

    if (this.state.broadcastDetail.isViewer == 'true' || this.state.isParticipantJoined == true) {
      this.handleNavigationOnEndLive(this.state.broadcastDetail.isHost == "true");
      return
    }
    this.handleNavigationOnEndLive(this.state.broadcastDetail.isHost == "true");
  }

  closeAlertModal = () => {
    this.setState({ alertModal: { openAlertModal: false, alertMsg: "" } })
  }
  closeBlockAlertModal = () => {
    this.setState({ BlockAlertMsg: { openAlertModal: false, alertMsg: "" } })
  }
  closeReportModel = () => {
    this.setState({ ReportalertPopup: { openAlertModal: false, alertMsg: "" } })
  }

  endStreamPressed = async (stream_id: number) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    const token = await getStorageData("authToken", false)

    this.endLiveApiCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `streams/${stream_id}/end`,
      method: configJSON.postApiMethod,
      header: headers
    });
  };


  handleStreamEndAlert = () => {
    // const goToExplore = this.state.alertModal?.alertMsg === this.liveExploreAlertMsg;
    // if (this.state.broadcastDetail.userRole == "guest" || this.state.broadcastDetail.userRole == "viewer") {
    //   this.setState({ gotoExplore: goToExplore, streamEndPressed: true })
    //   return
    // }
    // if (goToExplore && this.state.isLiveChallenge && this.state.broadcastDetail.userRole === "cohost") {
    //   this.setState({ gotoExplore: goToExplore, streamEndPressed: true })
    //   return
    // }
    // if (this.state.broadcastDetail.userRole === "friend") {
    //   this.setState({ gotoExplore: goToExplore, streamEndPressed: true })
    //   this.handleNavigationOnEndLive()
    // }
    // this.setState({ powerButtonWithoutChallenge: true, alertModal: { alertMsg: "", openAlertModal: false }, gotoExplore: goToExplore }, () => {
    //   let participant = this.state.usersJoinedData.filter((item) => item.role == 'cohost' || item.role == 'host')

    //   if (participant.length == 1) {
    //     this.doDeleteStage = true;
    //   }
    //   this.removeParticipant(this.state.participantId)
    // })
    const { isHost, stream_id, isViewer, live_stream_id } = this.state.broadcastDetail;
    if (isHost == "true") {
      this.endStreamPressed(live_stream_id);
    }
    if (isViewer == "true") {
      ZegoExpressEngine.instance().stopPlayingStream(stream_id).then(() => {
        this.setState({ alertModal: { openAlertModal: false, alertMsg: "" } });
        this.props.navigation.reset({
          index: 0,
          routes: [
            { name: 'BottomTabScreen' },
          ],
        });
      })
    }
  }

  onGridTapped = (event: any) => {
    if (event.nativeEvent && event.nativeEvent.userId != "") {
      this.setState({ selectedGridId: parseInt(event.nativeEvent.userId), viewProfileModal: true }, () => {
        this.getSelectedUserData(this.state.selectedGridId)
      })
    }
  }

  likeAPost = async () => {


    const token = (await getStorageData('authToken', false));
    const header = {
      'Content-Type': 'application/json',
      token: token,
    };

    const dataToSend = {
      data: {
        attributes: {
          likeable_id: this.state.stage_id,
          likeable_type: 'BxBlockIvslivestreams::Stage'
        }
      }
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

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
      configJSON.exampleAPiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(dataToSend)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  handleOnLikePressed = (event: any) => {
    this.likeAPost()
    const { nativeEvent } = event;
    const { userId } = nativeEvent;
    clearTimeout(this.likeTimeout)
    this.setState({ sendLikeCount: this.state.sendLikeCount + 1, isLikedAnim: true, })
    this.likeTimeout = setTimeout(() => {
      if (userId) {
        this.setState({ likeUserId: userId })
      }
    }, 1000)
  }

  getParticipationMessageDetails = (isJoining: boolean) => {
    const currentUserDetails = this.state.currentUser;
    console.log("currentUserDetails=", currentUserDetails)
    let attributes = {
      message_type: "PARTICIPATING_MSG",
      full_name: `${currentUserDetails?.full_name}`,
      user_name: `${currentUserDetails?.user_name}`,
      id: `${currentUserDetails?.id}`,
      photo: `${currentUserDetails?.photo}`,
      userRole: `${this.state.broadcastDetail.userRole}`,
      isJoining: `${isJoining}`,
    };
    return attributes;
  }

  initializeChatRoom = (chatRoom: ChatRoom) => {
    console.log('initialize chat room')
    this.setState({ room: chatRoom }, async () => {
      const role = this.state.broadcastDetail.userRole;
      if (role !== "host" && this.state.room) {
        const chatRoom = this.state.room;
        const request = new SendMessageRequest("PARTICIPATING_MSG", this.getParticipationMessageDetails(true));
        await chatRoom.sendMessage(request);
      }
    })
  }

  sendLeavingMessage = async () => {
    const role = this.state.broadcastDetail.userRole;
    if (role !== "host" && role !== "cohost" && this.state.room && !this.state.isBlocked) {
      const chatRoom = this.state.room;
      const request = new SendMessageRequest("PARTICIPATING_MSG", this.getParticipationMessageDetails(false));
      await chatRoom.sendMessage(request);
    }
  }

  handleParticipantState = async (userDetails: any) => {
    if (userDetails?.updateViewerCount === "true") {
      const newCount = Number(userDetails.totalViewerCount);
      const isValidUpdate = (!isNaN(newCount) && (newCount != this.state.totalViewersCount));
      if (!isValidUpdate) return;
      this.setState({ totalViewersCount: Number(userDetails.totalViewerCount) });
      return;
    }

    if (this.state.broadcastDetail.userRole == "host") {
      const { totalViewersCount, room } = this.state;
      const isCohostOrGuest = (userDetails?.userRole == "cohost" || userDetails?.userRole == "guest");
      const updatedCount = userDetails?.isJoining == "true" ? totalViewersCount + 1 : totalViewersCount - 1;
      const attributes = { message_type: "PARTICIPATING_MSG", updateViewerCount: "true", totalViewerCount: `${isCohostOrGuest ? totalViewersCount : updatedCount}` };
      const request = new SendMessageRequest("PARTICIPATING_MSG", attributes);
      await room?.sendMessage(request);
    }
  }

  disableCohostMatchButton = () => {
    const updateButton = [...this.state.bottomButtons];
    updateButton[1].disable = true;
    updateButton[0].disable = true;
    this.setState({ bottomButtons: updateButton });
  }

  enableCohostMatchButton = () => {
    const updateButton = [...this.state.bottomButtons];
    updateButton[1].disable = false;
    updateButton[0].disable = false;
    this.setState({ bottomButtons: updateButton });
  }

  onLiveChanged = (teams: string, teamId: string, duration: string, seconds: string) => {
    if (this.state.istimerSet) {
      return
    }
    this.setState({ istimerSet: true, challengeTeams: JSON.parse(teams), disableMatch: true, teamIdForNative: JSON.parse(teamId), duration: parseInt(duration), minutes: parseInt(duration), seconds: parseInt(seconds) }, () => {
      if (this.state.broadcastDetail.userRole != "host" && this.state.broadcastDetail.userRole != "cohost") {
        this.setState({ isLiveChallenge: true }, () => {
          setTimeout(() => {
            this.setState({ nativeViewHeight: '351' })
          }, 500)
        })
      } else {
        this.setState({ isLiveChallenge: true }, () => {
          this.disableCohostMatchButton();
          setTimeout(() => {
            this.setState({ nativeViewHeight: '352' })
          }, 500)
        })
      }
      this.startTimer();
      this.getParticipant();
    })
  }

  handleCancelledMatch = (isLeave: boolean) => {
    this.setState({ isLiveChallenge: false, cancelMatch: false, disableMatch: false, istimerSet: false, scoreTeam1: 0, scoreTeam2: 0 }, () => {
      this.resetTimer()
      if (isLeave) {
        this.enableCohostMatchButton();
        this.setSelectedUserList();
      } else {
        this.enableCohostMatchButton();
      }
      if (isLeave) {
        this.setState({ startNewLive: true, streamEndPressed: true })
      }
    })
  }
  handelAllowComments = async (allowcomments: any) => {
    if (this.state.room) {
      const chatRoom = this.state.room;

      let attributes = {
        message_type: "Allowcomments",
        senderName: `${this.state.currentUser?.full_name}`,
        senderId: `${this.state.currentUser?.id}`,

        Allowcommnets: `${allowcomments}`,
      };
      const request = new SendMessageRequest("Allowcomments", attributes);
      await chatRoom.sendMessage(request);
    }
  }

  handelModerator = async (id: any, moderatortype: any,) => {

    if (this.state.room) {
      const chatRoom = this.state.room;

      let attributes = {
        message_type: "handelModerator",
        senderName: `${this.state.currentUser?.full_name}`,
        senderId: `${this.state.currentUser?.id}`,
        Moderatorid: `${id}`,
        ModeratorType: `${moderatortype}`,



      };
      const request = new SendMessageRequest("handelModerator", attributes);
      await chatRoom.sendMessage(request);
    }
  }

  moderatorMuteCallback = ({ id, duration }: { id: number, duration: number }) => {
    const data = { account_id: id, duration };
    DeviceEventEmitter.emit('handleUserMuted', { response: { data }, isFromModerator: true });
  }

  handelMuteUmute = async (id: any, MuteUnmuteType: any, duration: any = null) => {
    if (this.state.room) {
      const chatRoom = this.state.room;

      let attributes = {
        message_type: "handelMuteUmute",
        senderName: `${this.state.currentUser?.full_name}`,
        senderId: `${this.state.currentUser?.id}`,
        Muteid: `${id}`,
        MuteUnmuteType: `${MuteUnmuteType}`,
        duration: `${duration}`,
        isModerator: `${this.state.broadcastDetail.userRole !== "host"}`
      };
      const request = new SendMessageRequest("handelMuteUmute", attributes);
      await chatRoom.sendMessage(request);
    }
  }

  handleRecordings = () => {
    this.handleAddModerater();
    this.setState({ recordingStarted: true, selectedGridId: 0 }, () => {
      this.handleModerater()
      this.cancelChallenge()
      this.acceptUpdateInvite()
      this.handleHostFollowButton()
    })
  }

  handelBlock = async (id: any,) => {

    if (this.state.room) {
      const chatRoom = this.state.room;

      let attributes = {
        message_type: "handelBlock",
        senderName: `${this.state.currentUser?.full_name}`,
        senderId: `${this.state.currentUser?.id}`,
        Blockid: `${id}`,


      };
      const request = new SendMessageRequest("handelBlock", attributes);
      await chatRoom.sendMessage(request);
    }
  }

  getValidNumber = (inputVal: any) => {
    return (Number(inputVal) === 0 || isNaN(Number(inputVal))) ? 0 : inputVal;
  }
  handleGiftingProcess = async (response: any) => {
    const giftedTo = response.donated_to_data.full_name;
    const receiverId = response.coin_gift.donated_to_id;
    const team1Score = this.getValidNumber(response.team1_score);
    const team2Score = this.getValidNumber(response.team2_score);
    const coinValue = this.getValidNumber(response.coin_gift?.coins_count);
    const pointValue = this.getValidNumber(response.coin_gift?.points);
    const multiplier = this.getValidNumber(pointValue / coinValue);
    if (this.state.room) {
      const chatRoom = this.state.room;
      const giftArrtibute = this.state.selectedGift?.attributes;
      let attributes = {
        message_type: "GIFT",
        senderName: `${this.state.currentUser?.full_name}`,
        senderId: `${this.state.currentUser?.id}`,
        imageUrl: `${this.state.currentUser?.photo}`,
        Position_left: `${giftArrtibute?.Position_left}`,
        Position_top: `${giftArrtibute?.Position_top}`,
        audio: `${giftArrtibute?.audio}`,
        coins: `${giftArrtibute?.coins}`,
        giftImage: `${giftArrtibute?.image?.url}`,
        giftId: `${this.state.selectedGift?.id}`,
        type: `${giftArrtibute?.image?.type}`,
        giftName: `${giftArrtibute?.name}`,
        giftedTo: `${giftedTo}`,
        selectedHostId: `${receiverId}`,
        team1Score: `${team1Score}`,
        team2Score: `${team2Score}`,
        multiplier: `${multiplier}`,
      };
      const request = new SendMessageRequest("GIFT", attributes);
      await chatRoom.sendMessage(request);
    }
  }

  handleScoreChange = (team1Score: string, team2Score: string, receiverId: string) => {
    if (!this.state.isLiveChallenge) return;
    if (receiverId) {
      if (this.state.challengeTeams.teamA.includes(receiverId)) {
        this.setState({ scoreTeam1: team1Score })
      } else if (this.state.challengeTeams.teamB.includes(receiverId)) {
        this.setState({ scoreTeam2: team2Score })
      }
    }
  }

  handleButton = () => {
    if (this.hostOrGuest == "cohost") {
      const updateButton = [...this.state.bottomButtons];
      updateButton[2].disable = true;
      this.setState({ bottomButtons: updateButton });
    } else {
      this.setState({ disableMatch: true })
      this.disableCohostMatchButton();
    }
  }

  onLiked = (count: number) => {
    if (count > 1) {
      this.setState({ startHeartAnim: true }, () => {
        this.setState({ totalLikeCount: this.state.totalLikeCount + count })
      })
    } else {
      this.setState({ startSingleHeartAnim: true }, () => {
        this.setState({ totalLikeCount: this.state.totalLikeCount + 1 })
      })
    }
  }

  handleOnReceiveGifts = (gift: ChatMessage) => {
    DeviceEventEmitter.emit('getCoinBalance', {})
    // checking if an animation is already playing
    const { attributes } = gift;
    const {
      giftImage = "",
      audio = "",
      giftId = "",
      positionLeft = 0,
      positionTop = 0,
      type = "",
      senderName = "",
      giftName = "",
      imageUrl = "",
      coins = "",
      selectedHostId = "",
      team1Score = '0',
      team2Score = '0',
      multiplier = 0,
    } = attributes || {};
    this.handleScoreChange(team1Score, team2Score, selectedHostId);
    if (type === "image") {
      const newData = { show: true, gifter: senderName, giftName, profileUrl: imageUrl, giftUrl: giftImage, multiplier: Number(multiplier) };
      if (this.state.giftPopupDetails?.show) {
        this.giftPopupQueue = [...this.giftPopupQueue, newData];
      } else {
        this.playGiftPopupAnimation(newData);
      }
      return;
    }
    let matchingItem = null;
    for (const category of this.state.categorydata) {
      const categoryID = category?.id;
      if (this.state.giftsdata?.hasOwnProperty(categoryID)) {
        const categoryItems = this.state.giftsdata[categoryID];
        const foundItem = categoryItems?.find((item: any) => item?.id === giftId);
        if (foundItem) {
          matchingItem = foundItem;
          break;
        }
      }
    }

    if (matchingItem) {
      this.handleSingleGiftData(matchingItem)
    } else {
      this.getGiftDataById(giftId)
    }
  };

  handleSingleGiftData = (giftDetails: any) => {
    const lottiJson = giftDetails.attributes?.image?.json;
    const isValid = (lottiJson && typeof (lottiJson) === "object" && Object.keys(lottiJson).length > 0);
    if (isValid) {
      const giftArrtibute = giftDetails.attributes;
      const giftImage = giftArrtibute?.image?.url || "";
      const audio = giftArrtibute?.audio?.url || "";
      const pl = Number(giftArrtibute?.Position_left);
      const pt = Number(giftArrtibute?.Position_top);
      const type = giftArrtibute?.image?.type;
      const lottieJsonString = JSON.stringify(lottiJson);
      if (this.state.lottieAnimation.show) {
        this.animationQueue = [...this.animationQueue, { show: true, url: giftImage, audioUrl: audio, json: lottieJsonString, positionLeft: pl, positionTop: pt, type }]
      } else {
        this.playLottieAnimation(true, giftImage, audio, lottieJsonString, pl, pt, type);
      }
    }
  }

  playGiftPopupAnimation = (giftData: GiftPopupData) => {
    this.setState({
      giftPopupDetails: giftData, giftresmodel: true
    }, () => {
      setTimeout(() => {
        if (this.giftPopupQueue.length < 1) {
          this.setState({
            giftresmodel: false,
            giftPopupDetails: {
              show: false,
              profileUrl: "",
              gifter: "",
              giftUrl: "",
              giftName: "",
              multiplier: 0,
            }
          })
        } else {
          const animation = this.giftPopupQueue.shift();
          if (animation && animation.show) {
            this.playGiftPopupAnimation(animation);
          }
        }
      }, 6000);
    })
  }

  playLottieAnimation = async (show: boolean, url: string, audioUrl: string, json: string, positionLeft: number, positionTop: number, type: string) => {
    await SoundPlayer.loadUrl(audioUrl);
    SoundPlayer.play();
    // SoundPlayer.onFinishedLoading(() => {
    // try {
    //   SoundPlayer.resume();
    // } catch (e) { }
    this.setState({
      lottieAnimation: {
        show: show,
        url: url,
        audioUrl: audioUrl,
        json: json,
        positionLeft: typeof positionLeft === 'number' ? positionLeft : 0,
        positionTop: typeof positionTop === 'number' ? positionTop : 0,
        type: type,
      }
    }, () => {
      setTimeout(() => {
        if (this.animationQueue.length < 1) {
          this.setState({
            lottieAnimation: {
              show: false,
              url: "",
              audioUrl: "",
              json: "",
              positionLeft: 0,
              positionTop: 0,
              type: "",
            }
          })
          SoundPlayer.stop();
        } else {
          const animation = this.animationQueue.shift();
          if (animation && animation.show) {
            this.playLottieAnimation(animation.show, animation.url, animation.audioUrl, animation.json, animation.positionLeft, animation.positionTop, type);
          }
        }
      }, 6000);
    })
    // })
  }

  inviteParticipant = async (userId: number) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    const token = await getStorageData("authToken", false)

    this.inviteParticipantApiCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    const body = JSON.stringify({
      "stage_arn": this.state.stageArn,
      "account_id": userId,
      "chat_arn": this.state.chatRoomArn,
      "stage_id": this.state.stage_id,
      "invite_type": "friend",
    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.createStageInvite,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };

  setSelectedUserList = () => {
    this.opponentTeamIdList = [];
    this.myTeamIdList = [];
    let temp = [... this.state.invitedUserList];
    temp.map((i) => {
      i.isSelected = false
      return i;
    });
    this.setState({ teamIdForNative: [], myTeamMemberList: [], opponentTeamList: [], invitedUserList: [...temp] })
  }

  formatNumber = (num: number) => {
    if (isNaN(num)) return '';
    if (num < 1e3) return num;
    if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(1) + "K";
    if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(1) + "M";
    if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(1) + "B";
    if (num >= 1e12) return +(num / 1e12).toFixed(1) + "T";
  };
  // Customizable Area End
}
