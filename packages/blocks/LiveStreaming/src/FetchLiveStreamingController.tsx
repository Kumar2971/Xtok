import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

// Customizable Area Start
import createRequestMessage from "./helpers/create-request-message";
import { handleResponseMessage } from "./helpers/handle-response-message";
import storage from "../../../framework/src/StorageProvider";
import { StreamList, StreamList1 } from "./Types";
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
  authToken: string;
  listStream: StreamList[];
  roomId: string;
  isLoading: boolean;
  streamListChanged: StreamList1[];
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class FetchLiveStreamingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  fetchAllStreamCallID: string = "";
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

    this.state = {
      // Customizable Area Start
      authToken: "",
      listStream: [],
      isLoading: false,
      roomId: "",
      streamListChanged: [],
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    const apiRequestCallDataId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage),
    );

    const responseDataJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
    );

    const errorDataJson = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage),
    );

    if (apiRequestCallDataId === this.fetchAllStreamCallID) {
      handleResponseMessage({
        responseJson: responseDataJson,
        errorJson: errorDataJson,
        onSuccess: () => {
          this.onSuccessGetStream(responseDataJson.data.data);
        },
        onFail: () => {
          this.showAlert(`Error`, "Get Meeting Failed! Please retry");
          this.setState({ isLoading: false });
        },
      });
    }
    // Customizable Area End
  }
  // Customizable Area Start

  onSuccessGetStream = (response: StreamList[]) => {
    this.setState(
      {
        listStream: response,
        streamListChanged: response.map((item) => ({
          ...item,
          isPlayed: false,
        })),
      },
      () => {
        this.setState({ isLoading: false });
      },
    );
  };

  handlePlayed = (itemID: string) => {
    this.setState({
      streamListChanged: this.state.streamListChanged.map((item) => {
        if (item.id === itemID) {
          item.isPlayed = !item.isPlayed;
        } else {
          item.isPlayed = false;
        }
        return item;
      }),
    });
  };

  FetchAllStreams = () => {
    this.setState({ isLoading: true });
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.fetchAllStreamCallID = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };
    const body = JSON.stringify({
      roomId: this.state.roomId,
      sessionId: "",
      page: "",
      perPage: "",
    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.listLiveStream_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body,
    });
  };

  async componentDidMount() {
    const token = await storage.get("token");
    const meetingId = this.props.navigation.state.params.meetingId;

    if (token) {
      this.setState({ authToken: token, roomId: meetingId }, () => {
        this.FetchAllStreams();
      });
    } else {
      this.showAlert("Error", "Token is not valid.");
    }
  }
  // Customizable Area End
}
