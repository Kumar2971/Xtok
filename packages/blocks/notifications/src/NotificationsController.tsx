import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgBell } from "./assets";
import { getStorageData } from "../../../framework/src/Utilities";
import { translate } from "../../../components/src/i18n/translate";
import { ParticipantMode } from "../../LiveStreaming/src/Types";
import createRequestMessage from "../../LiveStreaming/src/helpers/create-request-message";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";

interface StageData {
  name: string;
  stageArn: string;
  isViewer: boolean;
  chatArn: string;
  inviteId: number;
  hostId: string;
  viewerType: string;
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  data: any;
  selectedData: any;
  token: any;
  followType: any,
  todayData: any,
  lastWeekData: any,
  lastMonthData: any,
  otherMonthData: any,
  language: string;
  newToken: any,
  followRequest: any,
  followingSwitch: boolean
  followingData: any,
  notificationLoader: number,
  inviteParticiapntData: any,
  ChallengesInviteParticiapntData: any,
  roomId: any,
  inviteId: any,
  loader: boolean,
  groupLists: any;
  isLoading: boolean;
  currentUserData: any;
  alertModal: any;
  currentPage: number;
  totalPage: number;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class NotificationsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getDataCallId: string = "";
  markAsReadCallId: string = "";
  deleteCallId: string = "";
  getRequestDataCallId: string = "";
  getFollowingDataCallId: string = "";
  getInviteNotificationApiCallId: string = "";
  checkliveStatusCallId: string = "";
  getInviteNotificationsChallangesAPICallId: string = "";
  updateInviteChallengesApiCallId: string = "";
  login_user_CallID: string = "";
  updateInviteCallId: string = "";
  stageData: StageData = {
    name: "",
    stageArn: "",
    isViewer: false,
    chatArn: "",
    hostId: "",
    inviteId: 0,
    viewerType: ""
  };
  accepStatus: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      data: [],
      selectedData: null,
      token: "",
      newToken: '',
      followType: 'Follow',
      todayData: [],
      lastWeekData: [],
      lastMonthData: [],
      otherMonthData: [],
      followRequest: [],
      followingSwitch: false,
      followingData: [],
      notificationLoader: 0,
      inviteParticiapntData: [],
      ChallengesInviteParticiapntData: [],
      roomId: "",
      inviteId: "",
      loader: false,
      language: '',
      groupLists: [],
      isLoading: false,
      currentUserData: "",
      currentPage: 1,
      totalPage: 1,
      alertModal: {
        openAlertModal: false,
        alertMsg: "",
      }
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    const language = await getStorageData("SelectedLng", false);
    this.setState({ language: language });
    this.getCurrentUserDetails();
    const authToken = (await getStorageData('authToken', false)) || '';
    console.log('tokenNew', authToken)
    this.setState({ newToken: authToken })
    console.log('tokentoken', this.state.newToken)
    this.getFollowRequest()
    this.setState({ currentPage: 1 })
    this.getNotifications()
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        if (this.state.followingSwitch === true) {
          this.getFollowingData();
        } else {
          this.setState({ currentPage: 1 })
          this.getNotifications()
        }
        this.getFollowRequest()
      });

      this.props.navigation.addListener("focus", () => {
        if (this.state.followingSwitch === true) {
          this.getFollowingData();
        } else {
          this.setState({ currentPage: 1 })
          this.getNotifications()
        }
        this.getFollowRequest()
      });
    }
    this.getInviteParticipantNotifications()
    this.getInviteParticipantNotificationsChallenges()
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
    const apiResponse = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
    }

    switch (message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      case this.getDataCallId: {
        console.log("getdata======>>>", apiResponse)
        this.onsuccessgetData(apiResponse)
        break;
      }
      case this.updateInviteCallId: {
        this.handleUpdatedInvite(apiResponse)
        break;
      }
      case this.getRequestDataCallId: {
        if (apiResponse) {
          this.setState({
            followRequest: apiResponse
          })
        }
        break;
      }
      case this.getFollowingDataCallId: {
        if (apiResponse) {
          this.setState({
            data: apiResponse.data,
            notificationLoader: 1,
            isLoading: false
          }, () => {
            // this.getNotifications()
            this.filterDate()
          });
        } else {
          this.setState({
            data: [],
            groupLists: [],
            notificationLoader: 1,
            isLoading: false
          });
        }

        break;
      }
      case this.checkliveStatusCallId: {
        this.setState({
          loader: false
        })
        if (apiResponse.message !== "room is inactive") {
          let ValidateMeeting = {
            name: "",
            roomId: this.state.roomId,
            inviteId: this.state.inviteId,
          }
          this.props.navigation.navigate("LiveStreaming", { ValidateMeeting })
        } else {
          this.setState({ alertModal: { openAlertModal: true, alertMsg: apiResponse.message } })

        }
        break;
      }
      case this.markAsReadCallId: {
        return console.log("mark as read")
      }
      case this.deleteCallId: {
        if (apiResponse?.data) {
          this.setState({ alertModal: { openAlertModal: true, alertMsg: configJSON.deleteMessage } })

        }
        this.setState({ selectedData: null });
        break;
      }
      case this.getInviteNotificationApiCallId: {
        console.log('got in app notificatopn', apiResponse);
        this.onsucessinviteNotification(apiResponse)
        break;
      }
      case this.getInviteNotificationsChallangesAPICallId: {
        console.log('got in app notificatopn challenges', apiResponse);
        if (apiResponse?.data) {
          this.setState({ ChallengesInviteParticiapntData: apiResponse.data });
          console.log("success data==>>>", apiResponse?.data)
        }
        break;
      }
      case this.updateInviteChallengesApiCallId: {
        console.log('got in app update invite challenges', apiResponse);
        this.onsucessUpdateInviteChallenge(apiResponse)
        break;
      }
      case this.login_user_CallID: {
        this.handleLoginUserData(apiResponse)
        break;
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  handleUpdatedInvite = (apiResponse: any) => {
    console.log("////////////ww/3----------------------", apiResponse)
    if (apiResponse?.error) {
      this.setState({ alertModal: { openAlertModal: true, alertMsg: "Invitation has been expired" } })
    } else if (this.accepStatus === "accepted") {
      this.props.navigation.navigate("LiveStreaming", { screen: "LiveStreaming", ...apiResponse, role: "guest" });
    }
    this.stageData = {
      name: "",
      stageArn: "",
      isViewer: false,
      hostId: "",
      chatArn: "",
      inviteId: 0,
      viewerType: ""
    };
    this.accepStatus = "";
  }
  onsuccessgetData = (apiResponse: any) => {
    if (apiResponse) {
      this.setState({ totalPage: apiResponse?.meta?.pagination.total_pages, isLoading: false })
      if (apiResponse.data?.length == 0) {
        this.setState({ currentPage: this.state.currentPage - 1 })
        return
      }

      if (this.state.currentPage == 1 || this.state.data.length == 0) {
        this.setState({
          data: apiResponse.data,
          notificationLoader: 1,
          isLoading: false
        }, () => {
          this.filterDate()
        });
      } else {
        this.setState({
          data: [...this.state.data, ...apiResponse.data],
          notificationLoader: 1,
          isLoading: false
        }, () => {
          this.filterDate()
        });
      }
    }
  }
  onsucessinviteNotification = (apiResponse: any) => {
    if (apiResponse?.data) {
      this.setState({ inviteParticiapntData: apiResponse.data });
    }
  }

  getCurrentUserDetails = async () => {

    const token = (await getStorageData("authToken", false)) || "";
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.login_user_CallID = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };
    const body = "";
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: "bx_block_cflivechallenges/get_logged_in_user_data",
      method: "GET",
      header: headers,

    });
  }

  handleLoginUserData = (apiResponse: any) => {
    this.setState({ currentUserData: apiResponse.data.attributes });
  }


  onsucessUpdateInviteChallenge = (apiResponse: any) => {
    if (apiResponse && !apiResponse.errors && !apiResponse.error && apiResponse.livestream_data) {
      let ValidateMeeting = {
        name: this.state.currentUserData.full_name,
        meetingId: apiResponse?.livestream_data?.roomId,
        liveChallengeId: apiResponse?.live_challenge_id,
        inviteId: apiResponse?.id,
        micEnabled: true,
        webcamEnabled: true,
        modeTypes: ParticipantMode.CONFERENCE,
        token: apiResponse?.challenge_data?.videosdk_token,
        participantId: this.state.currentUserData?.id,
        isChallengeCreated: false,
        profilePic: this.state.currentUserData?.photo
      }
      console.log('validate meeting', ValidateMeeting);
      this.props.navigation.navigate("CfLiveChallenges", { ...ValidateMeeting, navigatefrom: "livechallenge" })
    } else {
      alert(apiResponse.error);
    }
  }
  iconBellProps = {
    source: imgBell,
  };


  filterDate = () => {
    let listOfGroupData = []

    const { data } = this.state
    const now = new Date();
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentSecond = now.getSeconds()
    const currentTotalSecond = (currentHour * 60 * 60 + currentMinute * 60 + currentSecond)

    const newtodayData1 = data === undefined ? null : data.filter((item: any) => {
      const itemDate = new Date(item.attributes.created_at);
      return (
        itemDate.getFullYear() === now.getFullYear() &&
        itemDate.getMonth() === now.getMonth() &&
        itemDate.getDate() === now.getDate()
      );
    });


    const newtodayData2 = newtodayData1 === null ? null : newtodayData1.sort((a: any, b: any) => {
      return new Date(b.attributes.created_at).valueOf() - new Date(a.attributes.created_at).valueOf();
    });

    const newtodayData = newtodayData2 === null ? [] : newtodayData2.map((data: {
      attributes: any; created_at: string | number | Date;
    }) => {
      const createdAt = new Date(data.attributes.created_at);
      let hour;
      let minute;
      let second;
      const itemHour = createdAt.getHours()
      const itemMinute = createdAt.getMinutes()
      const itemSecond = createdAt.getSeconds()
      const itemTotalSecond = (itemHour * 60 * 60 + itemMinute * 60 + itemSecond)
      const newSec = currentTotalSecond - itemTotalSecond
      console.log('newsec', newSec)
      const newminute = Math.round(newSec / 60)
      const newhour = Math.round(newminute / 60)

      if (newSec < 60) {
        second = newSec
      } else if (newminute < 60) {
        minute = newminute
      } else if (newhour) {
        hour = newhour
      }

      return {
        ...data,
        hour,
        minute,
        second
      };
    });

    const newthisWeekData1 = data === undefined ? null : data.filter((item: any) => {
      const itemDate = new Date(item.attributes.created_at);
      const weekStart = now.getDate() - 1;
      const weekEnd = weekStart < 7 ? 1 : weekStart - 5;

      return (
        itemDate.getFullYear() === now.getFullYear() &&
        itemDate.getMonth() === now.getMonth() &&
        itemDate.getDate() <= weekStart &&
        itemDate.getDate() >= weekEnd &&
        itemDate.getDate() !== now.getDate()
      );
    });

    // console.log('sorted today111', newthisWeekData1)

    const newthisWeekData = newthisWeekData1 === null ? [] : newthisWeekData1.sort((a: any, b: any) => {
      return new Date(b.attributes.created_at).valueOf() - new Date(a.attributes.created_at).valueOf();
    });
    // console.log('sorted week1111', newthisWeekData)

    const newthisMonthData1 = data === undefined ? null : data.filter((item: any) => {
      const itemDate = new Date(item.attributes.created_at);
      return (
        itemDate.getFullYear() === now.getFullYear() &&
        itemDate.getMonth() === now.getMonth() &&
        itemDate.getDate() !== now.getDate() &&
        !newthisWeekData.includes(item)
      );
    });
    // console.log('month',newthisMonthData)
    const newthisMonthData = newthisMonthData1 === null ? [] : newthisMonthData1.sort((a: any, b: any) => {
      return new Date(b.attributes.created_at).valueOf() - new Date(a.attributes.created_at).valueOf()
    })

    const otherData1 = data === undefined ? null : data.filter((item: any) => {
      const itemDate = new Date(item.attributes.created_at);
      return (
        itemDate.getFullYear() !== now.getFullYear() ||
        itemDate.getMonth() !== now.getMonth() ||
        (newthisWeekData.includes(item) && newtodayData.includes(item) && newthisMonthData.includes(item))

      );
    });

    const otherData = otherData1 === null ? [] : otherData1.sort((a: any, b: any) => {
      return new Date(b.attributes.created_at).valueOf() - new Date(a.attributes.created_at).valueOf()
    })
    const uniqueOtherData = otherData.reduce((accumulator: any, currentValue: any) => {
      const existingItem = accumulator.find((item: any) => item.attributes.id === currentValue.id);
      if (!existingItem) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);

    const uniqueTodaydata = newtodayData.reduce((accumulator: any, currentValue: any) => {
      const existingItem = accumulator.find((item: any) => item.id === currentValue.id);
      if (!existingItem) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);
    console.log('uniqueTodaydata', uniqueTodaydata);

    const uniqueThisWeekData = newthisWeekData.reduce((accumulator: any, currentValue: any) => {
      const existingItem = accumulator.find((item: any) => item.id === currentValue.id);
      if (!existingItem) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);
    console.log('uniqueThisWeekData', uniqueThisWeekData);

    const uniqueThisMonthData = newthisMonthData.reduce((accumulator: any, currentValue: any) => {
      const existingItem = accumulator.find((item: any) => item.id === currentValue.id);
      if (!existingItem) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);
    console.log('uniqueThisMonthData', uniqueThisMonthData);

    // console.log('sorted otherDat month', otherData)

    if (uniqueTodaydata.length > 0) {
      listOfGroupData.push({ title: `${translate("today")}`, data: uniqueTodaydata })
    }

    if (uniqueThisWeekData.length > 0) {
      listOfGroupData.push({ title: `${translate("this_Week")}`, data: uniqueThisWeekData })
    }

    if (uniqueThisMonthData.length > 0) {
      listOfGroupData.push({ title: `${translate("this_month")}`, data: uniqueThisMonthData })
    }

    if (uniqueOtherData.length > 0) {
      listOfGroupData.push({ title: `${translate("other")}`, data: uniqueOtherData })
    }



    this.setState({
      todayData: uniqueTodaydata,
      lastWeekData: uniqueThisWeekData,
      lastMonthData: uniqueThisMonthData,
      otherMonthData: uniqueOtherData,
      groupLists: listOfGroupData
    })

  }

  getNotifications = async () => {
    this.setState({ isLoading: true })
    console.log('get notification on function call')
    const authToken = (await getStorageData('authToken', false)) || '';
    console.log('authtoken', authToken)
    const getDataMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getDataCallId = getDataMsg.messageId;

    getDataMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPoint + `?page=${this.state.currentPage}&per_page=${10}`
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": configJSON.apiContentType,
        token: authToken
      })
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getDataMethod
    );

    runEngine.sendMessage(getDataMsg.id, getDataMsg);
  }

  async getFollowRequest() {
    console.log('follow request api call')
    const authToken = (await getStorageData('authToken', false)) || '';
    const apiEndPoint = 'bx_block_request_management/requests'
    const getDataMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getRequestDataCallId = getDataMsg.messageId;

    getDataMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": configJSON.apiContentType,
        token: authToken
      })
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getDataMethod
    );

    runEngine.sendMessage(getDataMsg.id, getDataMsg);
  }

  async getFollowingData() {
    this.setState({ isLoading: true })
    console.log('following user api call')
    const authToken = (await getStorageData('authToken', false)) || '';
    const apiEndPoint = `bx_block_notifications/notifications/following_users_notifications?page=${this.state.currentPage}&per_page=10`
    const getDataMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getFollowingDataCallId = getDataMsg.messageId;

    getDataMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": configJSON.apiContentType,
        token: authToken
      })
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getDataMethod
    );

    runEngine.sendMessage(getDataMsg.id, getDataMsg);
  }

  handleLiveStreamInvitation = (inviteData?: any) => {
    this.stageData = {
      name: "",
      stageArn: inviteData?.attributes?.room_id,
      isViewer: false,
      chatArn: inviteData?.attributes?.chat_arn,
      inviteId: inviteData?.attributes?.invite_id,
      hostId: `${inviteData?.attributes?.created_by}`,
      viewerType: `${inviteData?.attributes?.invite_type}`
    }
    this.updateInviteStream("accepted", inviteData?.attributes?.invite_id, "accept");
  }

  markAsRead(id: number) {
    const markAsReadMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.markAsReadCallId = markAsReadMsg.messageId;

    markAsReadMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.endPoint}/${id}`
    );

    markAsReadMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": configJSON.apiContentType,
        token: this.state.token ? this.state.token : "",
      })
    );

    markAsReadMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.markAsReadMethod
    );

    runEngine.sendMessage(markAsReadMsg.id, markAsReadMsg);
  }

  deleteNotifications(id: number) {
    console.log(id);
    const deletedMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.deleteCallId = deletedMsg.messageId;

    deletedMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.endPoint}/${id}`
    );

    deletedMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": configJSON.apiContentType,
        token: this.state.token ? this.state.token : "",
      })
    );

    deletedMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "DELETE"
    );

    runEngine.sendMessage(deletedMsg.id, deletedMsg);
  }


  updateInviteChallenges = async (ValidateMeeting: any) => {
    const authToken = (await getStorageData('authToken', false)) || '';

    const apiEndPoint = "bx_block_cflivechallenges/update_invite"
    const body = {
      invite_id: ValidateMeeting.inviteId,
      status: "accepted"
    }
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: authToken
    }
    console.log("challenge notification body==>>", body);

    const getDataMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.updateInviteChallengesApiCallId = getDataMsg.messageId;
    getDataMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );
    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );
    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );
    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postMethod
    );
    runEngine.sendMessage(getDataMsg.id, getDataMsg);
  }


  updateInviteStream = async (acceptStatus: string, inviteId: string, status: string) => {

    let newList = this.state.groupLists.map((gItem: any) => {
      let newData = gItem.data.map((element: any) => {
        if (element.attributes.invite_id == inviteId) {
          return { ...element, attributes: { ...element.attributes, invitation_status: acceptStatus } }
        } else {
          return element
        }
      });
      return { ...gItem, "data": newData }
    })
    this.setState({ groupLists: newList })

    this.accepStatus = acceptStatus;

    const authToken = (await getStorageData('authToken', false)) || '';

    const body = {
      // invite_id: inviteId,
      status: acceptStatus
    }
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: authToken
    }

    const getDataMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.updateInviteCallId = getDataMsg.messageId;

    getDataMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      // configJSON.updateStageInvite
      `stream_invites/${inviteId}/${status}`
    );
    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );
    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );
    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postMethod
    );
    runEngine.sendMessage(getDataMsg.id, getDataMsg);
  }

  timeSince(date: string) {
    let seconds = Math.floor(
      (new Date().valueOf() - new Date(date).valueOf()) / 1000
    );
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  convertDate(inputFormat: string) {
    function pad(s: any) {
      return s < 10 ? "0" + s : s;
    }
    let d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("-");
  }

  async getInviteParticipantNotifications() {
    console.log('getInviteParticipantNotifications')
    const authToken = (await getStorageData('authToken', false)) || '';
    const apiEndPoint = `bx_block_notifications/notifications/live_stream_notifications?page=${this.state.currentPage}&per_page=10`
    const getDataMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getInviteNotificationApiCallId = getDataMsg.messageId;

    getDataMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": configJSON.apiContentType,
        token: authToken
      })
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getDataMethod
    );

    runEngine.sendMessage(getDataMsg.id, getDataMsg);
  }
  async getInviteParticipantNotificationsChallenges() {
    const authToken = (await getStorageData('authToken', false)) || '';
    const apiEndPoint = `bx_block_notifications/notifications/live_challenge_notifications?page=${this.state.currentPage}&per_page=10`
    const getDataMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getInviteNotificationsChallangesAPICallId = getDataMsg.messageId;

    getDataMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": configJSON.apiContentType,
        token: authToken
      })
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getDataMethod
    );

    runEngine.sendMessage(getDataMsg.id, getDataMsg);
  }
  // Customizable Area End
}