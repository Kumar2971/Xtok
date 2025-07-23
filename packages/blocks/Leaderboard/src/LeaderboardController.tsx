import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { BackHandler } from "react-native";
import { format, startOfMonth, addDays } from 'date-fns';
import { translate } from "../../../components/src/i18n/translate";
import { getStorageData } from "../../../framework/src/Utilities";
import { ApiCallData, APICallID, IHandleRestAPIResponse } from "./interface/ApiCall";
import LeaderboardModel from "./models/Leaderboard.model";
// Customizable Area End

export const configJSON = require("./config");

enum TimeRange {
  Hourly = "hourly",
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
}

export enum ActionSheetMenus {
  "Donations ",
  "Streamers"
}

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  tabSelectedIndex: number;
  dropDownOptions: any;
  dropValue: any;
  rankingData: LeaderboardModel[];
  language: any;
  loading: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class LeaderboardController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiGetLiveStreamAcceptorList: APICallID.getLiveStreamAcceptorList;
  apiGetLiveStreamDonatorList: APICallID.getLiveStreamDonatorList;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.apiGetLiveStreamAcceptorList = APICallID.getLiveStreamAcceptorList;
    this.apiGetLiveStreamDonatorList = APICallID.getLiveStreamDonatorList;

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      tabSelectedIndex: 0,
      dropDownOptions: [
        { label: translate("donations"), value: "donations" },
        { label: translate("streamers"), value: "streamers" }
      ],
      dropValue: translate("donations"),
      rankingData: [
      ],
      language: "",
      loading: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const callid: APICallID = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const response = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (response && !error) {
        this.handleRestAPIResponse({ callid, response, error });
      }
    }
    // Customizable Area End
  }

  handleRestAPIResponse = ({ callid, response }: IHandleRestAPIResponse) => {
    const responseData = response.data;
    if (callid === this.apiGetLiveStreamAcceptorList || callid === this.apiGetLiveStreamDonatorList) {
      if (responseData && Array.isArray(responseData)) {
        this.setState({ rankingData: responseData, loading: false });
      } else {
        this.setState({ rankingData: [], loading: false });
      }
    }
  };

  handleTabSelectedIndex = (index: any) => {
    this.setState({ tabSelectedIndex: index }, () => {
      if (this.state.dropValue === translate("streamers")) {
        this.loadAcceptorList();
      } else {
        this.loadDonatorList();
      }
    });
  };


  loadAcceptorList = (timeRange: TimeRange = this.getTimeRange()) => {
    this.apiCall({
      callID: APICallID.getLiveStreamAcceptorList,
      method: "GET",
      endpoint: `/bx_block_ivslivestreams/livestreams/leaderboard?time_range=${timeRange}&leaderboard_type=acceptor&page=1&per_page=100`,
    })
  }

  loadDonatorList = (timeRange: TimeRange = this.getTimeRange()) => {
    this.apiCall({
      callID: APICallID.getLiveStreamAcceptorList,
      method: "GET",
      endpoint: `/bx_block_ivslivestreams/livestreams/leaderboard?time_range=${timeRange}&leaderboard_type=donor&page=1&per_page=100`,
    })
  }

  getTimeRange = (selectedIndex: number = this.state.tabSelectedIndex): TimeRange => {
    if (selectedIndex === 1) {
      return TimeRange.Daily;
    } else if (selectedIndex === 2) {
      return TimeRange.Weekly;
    } else if (selectedIndex === 3) {
      return TimeRange.Monthly;
    }
    return TimeRange.Hourly;
  };

  getPersonByRank = (orderNumber: number) => {
    return this.state.rankingData.filter((person: any) => person.order == orderNumber)[0]
  }

  apiCall = async ({ callID, header, endpoint, method }: ApiCallData) => {
    const token = await getStorageData("authToken");
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    if (callID === APICallID.getLiveStreamAcceptorList) {
      this.apiGetLiveStreamAcceptorList = requestMessage.messageId as APICallID.getLiveStreamAcceptorList;
    } else if (callID === APICallID.getLiveStreamDonatorList) {
      this.apiGetLiveStreamDonatorList = requestMessage.messageId as APICallID.getLiveStreamDonatorList;
    }

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": "application/json",
        token,
        ...header,
      })
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    this.setState({ loading: true });

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getCurrentWeekDateRange = (): string => {
    const language = this.state.language || "en-US";
    const startOfCurrentWeek = new Date();
    const endOfCurrentWeek = addDays(startOfCurrentWeek, 6);

    const dateFormat = 'MMM d'; // Tarih formatı, örneğin "Jul 17"

    const startDateString = format(startOfCurrentWeek, dateFormat);
    const endDateString = format(endOfCurrentWeek, dateFormat);

    return `${startDateString} - ${endDateString}`;
  };

  getCurrentMonthName = (): string => {
    const today = new Date();
    const startOfCurrentMonth = startOfMonth(today);

    const monthNameFormat = 'MMM'; // Sadece ay adını almak için 'MMMM' formatını kullanıyoruz

    const monthName = format(startOfCurrentMonth, monthNameFormat);
    return monthName;
  };


  // Customizable Area Start
  getCurrentHourRange = () => {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    const formattedHours = hours.toString().padStart(2, '0');
    let nextHour = (hours + 1) % 12 || 12;
    const nextMeridiem = nextHour === 12 ? (meridiem === 'AM' ? 'PM' : 'AM') : meridiem;
    const formattedNextHour = nextHour.toString().padStart(2, '0');
    return `${formattedHours} ${meridiem} - ${formattedNextHour} ${nextMeridiem}`;
  };


  async componentDidMount() {
    // Customizable Area Start
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language });
    this.loadDonatorList();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  async componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  formatNumber = (num: number) => {
    if (isNaN(num) || num == null) return '';
    if (num < 1e3) return num;
    if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(1) + "K";
    if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(1) + "M";
    if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(1) + "B";
    if (num >= 1e12) return +(num / 1e12).toFixed(1) + "T";
  };
  // Customizable Area End
}
