import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import storage from "../../../framework/src/StorageProvider";
import createRequestMessage from "./helpers/create-request-message";
import { handleResponseMessage } from "./helpers/handle-response-message";
import { getStorageData } from "../../../framework/src/Utilities";
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
  authToken: string;
  roomId: string;
  micOn: boolean;
  videoOn: boolean;
  name: string;
  liveStreamToken: string;
  loader: boolean;
  singleliveresult: any;
  singleliveresultData: any;
  singleChallengeresult: any;
  singleChallengeresultData: any;
  language: any;
  currentUserData: any;
  onRefreshLives: boolean;
  onRefreshChallenges: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}
export default class LiveExploreControll extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  generateToken_CallID: string = "";
  createMeeting_CallID: string = "";
  validateMeeting_CallID: string = "";
  senddataCallId: string = "";
  login_user_CallID: string = "";
  liveStagesDataCallId: string = "";
  liveChallengeStagesCallId: string = "";
  // Customizable Area End

  intervalID: any = 0;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      authToken: "",
      roomId: "",
      micOn: true,
      videoOn: true,
      name: "",
      liveStreamToken: "",
      loader: true,
      singleliveresult: {},
      singleliveresultData: [],
      singleChallengeresult: {},
      singleChallengeresultData: [],
      language: "",
      currentUserData: "",
      onRefreshLives: false,
      onRefreshChallenges: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
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

    switch (apiRequestMessageID) {
      case this.liveStagesDataCallId: {
        console.log("...............133344.............", responseDataJson)
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.onSuccessgetLiveData(responseDataJson);
          },
          onFail: () => {
            this.setState({ onRefreshLives: false })
            this.showAlert(`Error`, "Facing some problem in fetching trending data. Apologies for the inconvenience");
          },
        });
        break;
      }
      case this.senddataCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
          },
          onFail: () => {
          },
        });
        break;
      }
      case this.liveChallengeStagesCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.onSuccessgetLiveChallengeData(responseDataJson);
          },
          onFail: () => {
            this.setState({ onRefreshChallenges: false })
            this.showAlert(`Error`, "Trending challenges data failed. Please retry!");
          },
        });
        break;
      }
      case this.login_user_CallID: {
        this.handleLoginUserData(responseDataJson)
        break;
      }

    }

    // Customizable Area End
  }

  async componentDidMount() {
    this.onSuccessLogin();
    this.getCurrentUserDetails();
    this.getLiveStagesData(1);
    this.getLiveStageChallengeData(1);
    const roomId = (await getStorageData('roomId', false)) || "";
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language });
    this.sendData(roomId);
    this.props.navigation.addListener("focus", async () => {
      this.onSuccessLogin();
      const roomId = (await getStorageData('roomId', false)) || "";
      this.sendData(roomId);
    });

    await this.onSuccessLogin();
    this.intervalID = setInterval(async () => {
    }, 2000);
    this.props.navigation.addListener("blur", async () => {
      clearInterval(this.intervalID);
    })
  }

  async componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  onSuccessLogin = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    await storage.set("token", token);
    this.setState({ authToken: token });
  };

  sendData = async (roomId: any) => {
    const token = (await getStorageData("authToken", false)) || "";

    const leaveEndPoint = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.senddataCallId = leaveEndPoint.messageId;

    const header = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    const body = JSON.stringify({
      roomId: roomId,
    });

    createRequestMessage({
      requestMessage: leaveEndPoint,
      endPoint: configJSON.statusleaveendpoint,
      method: configJSON.putApiMethodType,
      header,
      body,
    });
  };
  onSuccessgetLiveData = async (responses: any) => {
    const currentPage = responses?.meta?.pagination?.current_page;
    // if (responses?.data && currentPage) {
    //   if (currentPage == 1) {
    //     this.setState({
    //       singleliveresult: responses,
    //       singleliveresultData: responses.data,
    //       onRefreshLives: false,
    //     })
    //   } else if (this.state.singleliveresult?.meta?.pagination?.current_page < currentPage) {
    //     this.setState({
    //       singleliveresult: responses,
    //       singleliveresultData: [...this.state.singleliveresultData, ...responses.data],
    //       onRefreshLives: false,
    //     })
    //   }
    // }
    this.setState({
      singleliveresult: responses,
      singleliveresultData: responses,
      onRefreshLives: false,
    })

  };

  onSuccessgetLiveChallengeData = async (responses: any) => {
    if (responses.message === "No stages found") {
      this.setState({ onRefreshChallenges: false })
      return
    }
    const currentPage = responses.meta.pagination.current_page;
    if (currentPage && responses.data) {
      if (currentPage == 1) {
        this.setState({
          singleChallengeresult: responses,
          singleChallengeresultData: responses.data,
          onRefreshChallenges: false,
        })
      } else if (this.state.singleChallengeresult?.meta?.pagination?.current_page < currentPage) {
        this.setState({
          singleChallengeresult: responses,
          singleChallengeresultData: [...this.state.singleChallengeresultData, ...responses.data],
          onRefreshChallenges: false,
        },)
      }
    }
  };

  getLiveStagesData = async (page: number) => {
    const authToken = await getStorageData('authToken', false);
    const getLiveStage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.liveStagesDataCallId = getLiveStage.messageId;

    getLiveStage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      // configJSON.listStages+"&page="+page
      `streams`
    );

    getLiveStage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": configJSON.apiContentType,
        token: authToken
      })
    );

    getLiveStage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethodType
    );

    runEngine.sendMessage(getLiveStage.id, getLiveStage);
  }

  getLiveStageChallengeData = async (page: number) => {
    const authToken = await getStorageData('authToken', false);
    const getLiveStage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.liveChallengeStagesCallId = getLiveStage.messageId;

    getLiveStage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.listChallengeStage + "&page=" + page
    );

    getLiveStage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": configJSON.apiContentType,
        token: authToken
      })
    );

    getLiveStage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethodType
    );

    runEngine.sendMessage(getLiveStage.id, getLiveStage);
  }

  navigateToLiveStream = (item: any) => {
    let viewerStageData = {
      hostId: `${item?.stage_created_by}`,
      name: item?.stage_name,
      chatArn: item?.chat_room_arn,
      isLiveChallenge: item?.is_challenge,
      stageArn: item?.stage_arn,
      stageId: item?.id,
      isViewer: true,
    }
    this.props.navigation.navigate("LiveStreaming", { screen: "LiveStreaming", stageData: { ...item, isViewer: true } });
  }
  handleLoginUserData = (apiResponse: any) => {
    this.setState({ currentUserData: apiResponse.data.attributes });
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
}