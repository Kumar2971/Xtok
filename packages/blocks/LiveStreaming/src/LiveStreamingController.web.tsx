import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { IMeetingInfo } from "./VideoComponent.web";
import { handleResponseMessage } from "./helpers/handle-response-message";
import createRequestMessage from "./helpers/create-request-message";
import { IHlsList, IMeetingList, IRecordingList } from "./types.web";

export const configJSON = require("./config");

export interface Props {
  navigation: FileList;
  id: string;
}

interface S {
  token: string;
  roomId: string;
  roomIdRecording: string;
  meetingId: string;
  isValid: boolean | null;
  meetingInfo: IMeetingInfo;
  meetingList: IMeetingList[];
  recordingList: IRecordingList[];
  hlsList: IHlsList[];
  downStreamUrl: string;
}

interface SS {
  id: any;
}

export default class LiveStreamingController extends BlockComponent<
  Props,
  S,
  SS
> {
  loginApiCallId: string | null;
  generateTokenApiCallId: string | null;
  fetchAllMeetingsListApiCallId: string | null;
  fetchAllRecordingsApiCallId: string | null;
  createMeetingApiCallId: string | null;
  validateMeetingApiCallId: string | null;
  startRecordingApiCallId: string | null;
  stopRecordingApiCallId: string | null;
  deleteRecordingApiCallId: string | null;
  startLiveRtmpApiCallId: string | null;
  stopLiveRtmpApiCallId: string | null;
  startLiveHlsApiCallId: string | null;
  stopLiveHlsApiCallId: string | null;
  liveHlsListApiCallId: string | null;
  liveActiveHlsApiCallId: string | null;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      token: "",
      meetingId: "",
      roomId: "",
      roomIdRecording: "",
      isValid: null,
      meetingInfo: {
        name: "",
        token: "",
        meetingId: "0",
        micEnabled: false,
        webcamEnabled: false,
        meetingType: "",
        view: "create",
        modeTypes: "VIEWER",
      },
      meetingList: [],
      recordingList: [],
      hlsList: [],
      downStreamUrl: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    this.loginApiCallId = "";
    this.generateTokenApiCallId = "";
    this.fetchAllMeetingsListApiCallId = "";
    this.fetchAllRecordingsApiCallId = "";
    this.createMeetingApiCallId = "";
    this.validateMeetingApiCallId = "";
    this.startRecordingApiCallId = "";
    this.stopRecordingApiCallId = "";
    this.deleteRecordingApiCallId = "";
    this.startLiveRtmpApiCallId = "";
    this.stopLiveRtmpApiCallId = "";
    this.startLiveHlsApiCallId = "";
    this.stopLiveHlsApiCallId = "";
    this.liveHlsListApiCallId = "";
    this.liveActiveHlsApiCallId = "";
  }

  async receive(from: string, message: Message) {
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );

      const errorJson = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
      );
      switch (apiRequestCallId) {
        case this.loginApiCallId: {
          this.loginApiCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              this.setState({
                token: responseJson.meta.token,
              });
            },
            onFail: () => this.showAlert(`User Login Failed`, "Please retry!"),
          });
          break;
        }
        case this.generateTokenApiCallId: {
          this.generateTokenApiCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              this.setState({
                meetingInfo: {
                  ...this.state.meetingInfo,
                  token: responseJson.data,
                },
              });
              if (this.state.meetingInfo.modeTypes === "CONFERENCE") {
                await this.handleCreateMeeting(this.state.meetingInfo);
              } else {
                this.handleValidateMeeting(this.state.meetingInfo);
              }
            },
            onFail: () =>
              this.showAlert(`Generate token failed`, "Please retry!"),
          });
          break;
        }
        case this.fetchAllMeetingsListApiCallId: {
          this.fetchAllMeetingsListApiCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              this.setState({ meetingList: responseJson.date.data });
            },
            onFail: () =>
              this.showAlert(`Fetch meeting list failed`, "Please retry!"),
          });
          break;
        }
        case this.fetchAllRecordingsApiCallId: {
          this.fetchAllRecordingsApiCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              this.setState({ recordingList: responseJson.data.data });
            },
            onFail: () =>
              this.showAlert(`Fetch recording list failed`, "Please retry!"),
          });
          break;
        }
        case this.createMeetingApiCallId: {
          this.createMeetingApiCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              this.setState({
                roomId: responseJson.data.data.attributes.roomId,
                meetingInfo: {
                  ...this.state.meetingInfo,
                  meetingId: responseJson.data.data.attributes.roomId,
                  view: "live",
                },
              });
            },
            onFail: () =>
              this.showAlert(`Create a meeting failed`, "Please retry!"),
          });
          break;
        }
        case this.validateMeetingApiCallId: {
          this.validateMeetingApiCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              this.setState({
                roomId: responseJson.data.id,
                meetingInfo: {
                  ...this.state.meetingInfo,
                  meetingId: responseJson.data.roomId,
                  view: "live",
                },
              });
            },
            onFail: () =>
              this.showAlert(`Join a meeting failed`, "Please retry!"),
          });
          break;
        }
        case this.startRecordingApiCallId: {
          this.startRecordingApiCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {},
            onFail: () =>
              this.showAlert(`Start recording failed`, "Please retry!"),
          });
          break;
        }
        case this.stopRecordingApiCallId: {
          this.stopRecordingApiCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {},
            onFail: () =>
              this.showAlert(`Stop recording failed`, "Please retry!"),
          });
          break;
        }
        case this.deleteRecordingApiCallId: {
          this.deleteRecordingApiCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              this.handleFetchAllRecordings(this.state.roomIdRecording);
            },
            onFail: () =>
              this.showAlert(`Delete recording failed`, "Please retry!"),
          });
          break;
        }
        case this.startLiveRtmpApiCallId: {
          this.startLiveRtmpApiCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {},
            onFail: () =>
              this.showAlert(`Start live rtmp failed`, "Please retry!"),
          });
          break;
        }
        case this.stopLiveRtmpApiCallId: {
          this.stopLiveRtmpApiCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {},
            onFail: () =>
              this.showAlert(`Stop live rtmp failed`, "Please retry!"),
          });
          break;
        }
        case this.startLiveHlsApiCallId: {
          this.startLiveHlsApiCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {},
            onFail: () =>
              this.showAlert(`Start live hls failed`, "Please retry!"),
          });
          break;
        }
        case this.stopLiveHlsApiCallId: {
          this.stopLiveHlsApiCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {},
            onFail: () =>
              this.showAlert(`Stop live hls failed`, "Please retry!"),
          });
          break;
        }
        case this.liveHlsListApiCallId: {
          this.liveHlsListApiCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              this.setState({ hlsList: responseJson.data.data });
            },
            onFail: () =>
              this.showAlert(`Fetching hls list failed`, "Please retry!"),
          });
          break;
        }
        case this.liveActiveHlsApiCallId: {
          this.liveActiveHlsApiCallId = null;
          handleResponseMessage({
            responseJson,
            errorJson,
            onSuccess: async () => {
              this.setState({
                downStreamUrl: responseJson.data.data.downstreamUrl,
              });
            },
            onFail: () =>
              this.showAlert(`Fetching active hls failed`, "Please retry!"),
          });
          break;
        }
      }
    }
  }

  async componentDidMount() {
    this.login();
  }

  login() {
    const body = {
      data: {
        attributes: {
          email: `${configJSON.loginId}`,
          password: `${configJSON.loginPass}`,
        },
        type: "email_account",
      },
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.loginApiCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.loginInApiEndPoint}`,
      method: configJSON.postApiMethodType,
      body: JSON.stringify(body),
    });
  }

  handleGenerateToken = async (meetingInfo: IMeetingInfo) => {
    this.setState({ meetingInfo });
    const header = {
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.generateTokenApiCallId = requestMessage.messageId;

    createRequestMessage({
      header,
      requestMessage: requestMessage,
      endPoint: `${configJSON.generateTokenApiEndPoint}`,
      method: configJSON.postApiMethodType,
    });
  };

  handleFetchAllMeetings = () => {
    const header = {
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.fetchAllMeetingsListApiCallId = requestMessage.messageId;

    createRequestMessage({
      header,
      requestMessage: requestMessage,
      endPoint: `${configJSON.fetchAllMeetingsApiEndPoint}`,
      method: configJSON.getApiMethodType,
    });
  };

  handleFetchAllRecordings = (roomId: string) => {
    const header = {
      token: this.state.token,
    };

    const body = {
      roomId,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.fetchAllRecordingsApiCallId = requestMessage.messageId;

    createRequestMessage({
      header,
      requestMessage: requestMessage,
      endPoint: `${configJSON.fetchAllRecordingsApiEndPoint}`,
      method: configJSON.postApiMethodType,
      body: JSON.stringify(body),
    });
  };
  handleCreateMeeting = async (meetingInfo: IMeetingInfo) => {
    this.setState({ meetingInfo }, () => {
      const header = {
        token: this.state.token,
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage),
      );

      this.createMeetingApiCallId = requestMessage.messageId;

      createRequestMessage({
        header,
        requestMessage: requestMessage,
        endPoint: `${configJSON.createMeetingApiEndPoint}`,
        method: configJSON.postApiMethodType,
      });
    });
  };

  handleValidateMeeting = (meetingInfo: IMeetingInfo) => {
    this.setState({ meetingInfo }, () => {
      const header = {
        token: this.state.token,
      };

      const body = {
        roomId: this.state.meetingId,
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage),
      );

      this.validateMeetingApiCallId = requestMessage.messageId;

      createRequestMessage({
        header,
        requestMessage: requestMessage,
        endPoint: `${configJSON.validateMeetingApiEndPoint}`,
        method: configJSON.postApiMethodType,
        body: JSON.stringify(body),
      });
    });
  };

  handleStartRecording = () => {
    const header = {
      token: this.state.token,
    };

    const body = {
      roomId: this.state.meetingInfo.meetingId,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.startRecordingApiCallId = requestMessage.messageId;

    createRequestMessage({
      header,
      requestMessage: requestMessage,
      endPoint: `${configJSON.startRecordingApiEndPoint}`,
      method: configJSON.postApiMethodType,
      body: JSON.stringify(body),
    });
  };

  handleStopRecording = () => {
    const header = {
      token: this.state.token,
    };

    const body = {
      roomId: this.state.meetingInfo.meetingId,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.stopRecordingApiCallId = requestMessage.messageId;

    createRequestMessage({
      header,
      requestMessage: requestMessage,
      endPoint: `${configJSON.stopRecordingApiEndPoint}`,
      method: configJSON.postApiMethodType,
      body: JSON.stringify(body),
    });
  };

  handleDeleteRecording = (recordingId: string) => {
    this.setState({ roomIdRecording: recordingId }, () => {
      const header = {
        token: this.state.token,
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage),
      );

      this.deleteRecordingApiCallId = requestMessage.messageId;

      createRequestMessage({
        header,
        requestMessage: requestMessage,
        endPoint: `${configJSON.deleteRecordingApiEndPoint}/?recordingId=${recordingId}`,
        method: configJSON.deleteApiMethodType,
      });
    });
  };

  handleStartLiveRtmp = (streamKey: string, streamUrl: string) => {
    const header = {
      token: this.state.token,
    };

    const body = {
      roomId: this.state.meetingInfo.meetingId,
      streamKey,
      streamUrl,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.startLiveRtmpApiCallId = requestMessage.messageId;

    createRequestMessage({
      header,
      requestMessage: requestMessage,
      endPoint: `${configJSON.startRtmpLiveApiEndPoint}`,
      method: configJSON.postApiMethodType,
      body: JSON.stringify(body),
    });
  };

  handleStopLiveRtmp = () => {
    const header = {
      token: this.state.token,
    };

    const body = {
      roomId: this.state.meetingInfo.meetingId,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.stopLiveRtmpApiCallId = requestMessage.messageId;

    createRequestMessage({
      header,
      requestMessage: requestMessage,
      endPoint: `${configJSON.stopRtmpLiveApiEndPoint}`,
      method: configJSON.postApiMethodType,
      body: JSON.stringify(body),
    });
  };

  handleStartLiveHls = () => {
    const header = {
      token: this.state.token,
    };

    const body = {
      roomId: this.state.meetingInfo.meetingId,
      mode: "video-and-audio",
      type: "SPOTLIGHT",
      priority: "PIN",
      gridSize: 12,
      orientation: "landscape",
      quality: "high",
      is_live_stream_meet: true,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.startLiveHlsApiCallId = requestMessage.messageId;

    createRequestMessage({
      header,
      requestMessage: requestMessage,
      endPoint: `${configJSON.startHlsLiveApiEndPoint}`,
      method: configJSON.postApiMethodType,
      body: JSON.stringify(body),
    });
  };

  handleStopLiveHls = () => {
    const header = {
      token: this.state.token,
    };

    const body = {
      roomId: this.state.meetingInfo.meetingId,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.stopLiveHlsApiCallId = requestMessage.messageId;

    createRequestMessage({
      header,
      requestMessage: requestMessage,
      endPoint: `${configJSON.stopHlsLiveApiEndPoint}`,
      method: configJSON.postApiMethodType,
      body: JSON.stringify(body),
    });
  };

  handleLiveHlsList = (roomId: string) => {
    const header = {
      token: this.state.token,
    };

    const body = {
      roomId,
      sessionId: "",
      page: "",
      perPage: "",
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.liveHlsListApiCallId = requestMessage.messageId;

    createRequestMessage({
      header,
      requestMessage: requestMessage,
      endPoint: `${configJSON.hlsLiveListApiEndPoint}`,
      method: configJSON.postApiMethodType,
      body: JSON.stringify(body),
    });
  };

  handleLiveActiveHls = () => {
    const header = {
      token: this.state.token,
    };

    const body = {
      roomId: this.state.meetingInfo.meetingId,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.liveActiveHlsApiCallId = requestMessage.messageId;

    createRequestMessage({
      header,
      requestMessage: requestMessage,
      endPoint: `${configJSON.liveActiveHlsApiEndPoint}`,
      method: configJSON.postApiMethodType,
      body: JSON.stringify(body),
    });
  };

  handleChangeMeetingId = (value: string) => {
    this.setState({ meetingId: value });
  };

  handleChangeView = (meetingInfo: IMeetingInfo) => {
    this.setState({ meetingInfo });
  };

  handleSetDownStreamUrl = (value: string) => {
    this.setState({ downStreamUrl: value });
  };
}
