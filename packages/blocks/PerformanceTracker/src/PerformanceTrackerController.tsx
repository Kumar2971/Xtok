import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import moment from "moment";
import 'moment/locale/ar'; 
import 'moment/locale/en-gb';
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { getStorageData } from "../../../framework/src/Utilities";

type alice = "yearly" | "monthly" | "weekly";
interface CommonTypeData {
  data_select: alice,
  likes_data: {
    data: {
      id: string;
      type: string;
      attributes: {
        photo: string;
        post_likes_count: number;
        post_comment_count: number;
        post_medias:{thumnails:string}
      };
    }[];
  },
  comments_data: {
    data: {
      id: string,
      type: string,
      attributes: {
        photo: string,
        post_likes_count: number,
        post_comment_count: number,
        post_medias:{thumnails:string}
      },
    }[],
  },
  unfollowers_engaged_count: number,
  followers_engaged_count: number,
  total_engaged_count: number,
  account_engaged_count: string,
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
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start

  screenType:
    | "followers"
    | "accounts_reached"
    | "reached_audience"
    | "impressions"
    | "visitors"
    | "accounts_engaged"
    | "contents_shared";
  isFocus: boolean;
  isDateTypeFocus: boolean;
  data: {
    contents_shared?: {
      id: string;
      type: string;
      attributes: {
        photo: string;
        post_likes_count: number;
        post_comment_count: number;
        post_medias:{thumnails:string};
      };
    }[];
    visitors?:{
      data_select:alice;
      data_count: [string, number][];
      visitors_count: number;
      last_followers_data: string;
    };
    followers?: {
      data_count: [];
      age_above_35: string;
      age_below_18: string;
      age_between_19_24: string;
      age_between_25_34: string;
      followers_count: number;
      last_followers_data: number;
    };
    accounts_reached?: {
      posts_count: number;
      live_count: number;
      challenge_count: number;
      unfollowers_account_count: number;
      total_account_count: number;
      followers_account_count: number;
      account_reached_count: number;
    };
    reached_audience?: {
      data_select:alice;
      country_data: {
        country: [[string, number]];
      };
      age_range: {
        account_count: number;
        age_below_18: string;
        age_between_19_24: string;
        age_between_25_34: string;
        age_above_35: string;
      };
    };
    impressions?: {
      data: {
        id: string;
        type: string;
        attributes: {
          post_likes_count: number;
          name: string;
          post_comment_count: number;
          photo: "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/9iuz0a3mifdh4iz577mu5ph776z9";
          post_medias:{thumnails:string}
        };
      }[];
      meta:{
        data_select: alice;
        like_count: number,
        up_down_likes_count: number,
        last_likes_data: string,
      }
    };

    accounts_engaged?: CommonTypeData
  };
  apiLoader: boolean;
  langauge:any;

  dateType: "weekly" | "monthly" | "yearly";
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class PerformanceTrackerController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage)

      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,

      // Customizable Area Start
      screenType: "followers",
      apiLoader: false,
      data: {
        followers: undefined,
        accounts_reached: undefined,
        accounts_engaged: undefined,
        impressions: undefined,
        reached_audience: undefined,
        visitors:undefined
      },
      isFocus: false,
      isDateTypeFocus: false,
      dateType: "monthly",
      langauge:""

      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start

    // Customizable Area End
  }
  performanceAPICallId: any;
  getFollowersAPICallId: any;
  getContentSharedAPICallId: any;
  getAccountsEngagedAPICallId: any;
  getAccountsReachedAPICallId: any;
  getImpressionsAPICallId: any;
  getReachedAudienceAPICallId: any;
  getVisitorsAPICallId: any;

  async componentDidMount() {
    super.componentDidMount();
    const language = await getStorageData("SelectedLng"); 
    this.setState({ langauge: language }, () => moment.locale(language === 'ar' ? 'ar' : 'en'));
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    } else {
      this.getToken();
    }
    this.checkData();

  }

  checkData = () => {
    
    switch (this.state.screenType) {
      case "accounts_engaged":
        return this.getAccountsEngaged();
      case "accounts_reached":
        return this.getAccountsReached();
      case "contents_shared":
        return this.getContentsShared();
      case "followers":
        return this.getFollowers();
      case "reached_audience":
        return this.getReachedAudience();

      case "impressions":
        return this.getImpressions();
      case "visitors":
        return this.getVisitors();

      default:
        break;
    }
  };

  componentDidUpdate = (prevProps: any, prevState: any) => {
    if (
      this.state.screenType !== prevState.screenType ||
      this.state.dateType !== prevState.dateType
    ) {
      this.checkData();
    }
  };
  getFollowers = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ apiLoader: true });
    const apiEndPoint = "/bx_block_cflivechallenges/get_followers";
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };

    const body = {
      data_select: this.state.dateType
    };

    this.getFollowersAPICallId = await this.apiCall({
      setApiCallId: "followersApiCallId",
      header,
      method: configJSON.getMethod,
      endPoint: apiEndPoint,
      body: JSON.stringify(body)
    });
  };
  getAccountsReached = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ apiLoader: true });
    const apiEndPoint = "bx_block_cflivechallenges/account_reached";
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };
    const body = {
      data_select: this.state.dateType
    };
    this.getAccountsReachedAPICallId = await this.apiCall({
      setApiCallId: "accountReachedAPICallId",
      header,
      method: configJSON.getMethod,
      endPoint: `${apiEndPoint}`,
      body: JSON.stringify(body)
    });
  };

  getContentsShared = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ apiLoader: true });
    const apiEndPoint = "bx_block_cflivechallenges/content_shared";
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };
    const body = {
      data_select: this.state.dateType
    };
    this.getContentSharedAPICallId = await this.apiCall({
      setApiCallId: "contentsSharedApiCallId",
      header,
      method: configJSON.getMethod,
      endPoint: `${apiEndPoint}`,
      body: JSON.stringify(body)
    });
  };

  getAccountsEngaged = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ apiLoader: true });
    const apiEndPoint = "bx_block_cflivechallenges/account_engaged";
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };
    const body = {
      data_select: this.state.dateType
    };
    this.getAccountsEngagedAPICallId = await this.apiCall({
      setApiCallId: "followersApiCallId",
      header,
      method: configJSON.getMethod,
      endPoint: `${apiEndPoint}`,
      body: JSON.stringify(body)
    });
  };

  getImpressions = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    
    this.setState({ apiLoader: true });
    const apiEndPoint = "bx_block_cflivechallenges/impressions";
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };
    const body = {
      data_select: this.state.dateType
    };
    this.getImpressionsAPICallId = await this.apiCall({
      setApiCallId: "impressionsApiCallId",
      header,
      method: configJSON.getMethod,
      endPoint: `${apiEndPoint}`,
      body: JSON.stringify(body)
    });
  };

  getReachedAudience = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ apiLoader: true });
    const apiEndPoint = "/bx_block_cflivechallenges/reached_audience";
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };
    const body = {
      data_select: this.state.dateType
    };
    this.getReachedAudienceAPICallId = await this.apiCall({
      setApiCallId: "reachedAudienceApiCallId",
      header,
      method: configJSON.getMethod,
      endPoint: `${apiEndPoint}`,
      body: JSON.stringify(body)
    });
  };
  getVisitors = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ apiLoader: true });
    const apiEndPoint = "/bx_block_cflivechallenges/visitors";
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };
    const body = {
      data_select: this.state.dateType
    };
    this.setState({ apiLoader: false });
    this.getVisitorsAPICallId = await this.apiCall({
      setApiCallId: "visitorsApiCallId",
      header,
      method: configJSON.getMethod,
      endPoint: `${apiEndPoint}`,
      body: body
    });
  };

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  apiCall = async (data: any) => {
    console.log("APICALL", data);

    const { setApiCallId, header, method, endPoint, body } = data;
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${endPoint}?data_select=${this.state.dateType}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        null
      );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return requestMessage.messageId;
  };
  handleErrorResponse = async (responseJson: any) => {
  };
  getFollowersSuccessCallBack = (data: {
    data_count: [];
    age_above_35: string;
    age_below_18: string;
    age_between_19_24: string;
    age_between_25_34: string;
    followers_count: number;
    last_followers_data: string;
  }) => {
    this.setState({
      apiLoader: false,
      data: {
        followers: {
          ...data,
          last_followers_data: data.last_followers_data? +data?.last_followers_data.slice(0, -1):0
        }
      }
    });
  };

  getAccountReachedSuccessCallBack = (data: {
    posts_count: number;
    live_count: number;
    challenge_count: number;
    unfollowers_account_count: number;
    total_account_count: number;
    followers_account_count: number;
    account_reached_count: string;
  }) => {
    this.setState({
      apiLoader: false,
      data: {
        accounts_reached: {
          ...data,
          account_reached_count: data.account_reached_count? +data.account_reached_count.slice(0, -1):0
        }
      }
    });
  };
  getAccountsEngagedSuccessCallBack = (data: CommonTypeData ) => {
    this.setState({ apiLoader: false, data: { accounts_engaged: data } });
  };
  getContentSharedSuccessCallBack = (data: {
    data: {
      id: string;
      type: string;
      attributes: {
        photo: string;
        post_likes_count: number;
        post_comment_count: number;
        post_medias:{thumnails:string}
      };
    }[];
  }) => {
    this.setState({ apiLoader: false, data: { contents_shared: data.data } });
  };
  getImpressionsSuccessCallBack = (data: {
    data: {
      id: string;
      type: string;
      attributes: {
        post_likes_count: number;
        name: string;
        post_comment_count: number;
        photo: "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/9iuz0a3mifdh4iz577mu5ph776z9";
        post_medias:{thumnails:string}
      };
    }[];
    meta:{
      data_select: alice;
      like_count: number,
      up_down_likes_count: number,
      last_likes_data: string,
    }
  }) => {
    
    this.setState({ apiLoader: false, data: { impressions: data } });
  };
  getReachedAudienceSuccessCallBack = (data: {
    data_select:alice;
    country_data: {
      country: [[string, number]];
    };
    age_range: {
      account_count: number;
      age_below_18: string;
      age_between_19_24: string;
      age_between_25_34: string;
      age_above_35: string;
    };
  }) => {
    this.setState({ apiLoader: false, data: { reached_audience: data } });
  };
  getVisitorsSuccessCallBack = (data: {
    data_select:alice;
    data_count: [string, number][];
    visitors_count: number;
    last_followers_data: string;
  }) => {
   
   if(!data.data_select){
    this.setState({ apiLoader: false, data: { visitors: undefined } });
   }else{
    this.setState({ apiLoader: false, data: { visitors: data } });
   }
    
  };
  handleApiRequest = (
    apiRequestCallId: any,
    responseJson: any,
    errorReponse: any
  ) => {
    if (apiRequestCallId === this.getFollowersAPICallId) {
      this.getFollowersSuccessCallBack(responseJson);
    } else if (apiRequestCallId === this.getAccountsReachedAPICallId) {
      this.getAccountReachedSuccessCallBack(responseJson);
    } else if (apiRequestCallId === this.getAccountsEngagedAPICallId) {
      this.getAccountsEngagedSuccessCallBack(responseJson);
    } else if (apiRequestCallId === this.getContentSharedAPICallId) {
      this.getContentSharedSuccessCallBack(responseJson);
    } else if (apiRequestCallId === this.getImpressionsAPICallId) {
      this.getImpressionsSuccessCallBack(responseJson);
    } else if (apiRequestCallId === this.getReachedAudienceAPICallId) {
      this.getReachedAudienceSuccessCallBack(responseJson);
    }
    else if (apiRequestCallId === this.getVisitorsAPICallId) {
      this.getVisitorsSuccessCallBack(responseJson);
    }
  };

  async receive(from: string, message: Message) {

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (responseJson && !responseJson.errors) {
        this.handleApiRequest(apiRequestCallId, responseJson, errorReponse);
      } else {
        this.handleErrorResponse(responseJson);
      }
    }
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address"
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    }
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed()
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }
  chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    fillShadowGradientOpacity: 0.4,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    },
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(253, 212, 79, ${opacity})`,
    labelColor: (opacity = 1) => "#373737",
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,

    useShadowColorFromDataset: true // optional
  };

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start

  // Customizable Area End
}
