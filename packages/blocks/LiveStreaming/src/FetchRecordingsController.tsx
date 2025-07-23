import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

// Customizable Area Start
import createRequestMessage from "./helpers/create-request-message";
import { handleResponseMessage } from "./helpers/handle-response-message";
import storage from "framework/src/StorageProvider";
import React from "react";
import { RecordingList } from "./Types";
import Video from "react-native-video";
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
  allAllRecordings: RecordingList[];
  isLoading: boolean;
  roomId: string;
  isMuted: boolean;
  volume: number;
  isPaused: boolean;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class FetchRecordingsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  fetchListOfRecordingCallID: string = "";
  deleteRecordingCallID: string = "";
  videoRef: React.LegacyRef<Video> = React.createRef();
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
      allAllRecordings: [],
      isLoading: false,
      roomId: "",
      isMuted: false,
      volume: 100,
      isPaused: true,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    const apiMessageID = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage),
    );

    const responseDataJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
    );

    const errorDataJson = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage),
    );

    switch (apiMessageID) {
      case this.fetchListOfRecordingCallID: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.onSuccessGetRecordings(responseDataJson.data.data);
          },
          onFail: () => {
            this.showAlert(`Error`, "Get recordings Failed! Please retry");
            this.setState({ isLoading: false });
          },
        });
        break;
      }
      case this.deleteRecordingCallID: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.showAlert("Success", "recording deleted");
            this.setState({ isLoading: false });
          },
          onFail: () => {
            this.showAlert(`Error`, "delete recordings Failed! Please retry");
            this.setState({ isLoading: false });
          },
        });
        break;
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  onSuccessGetRecordings = (response: RecordingList[]) => {
    this.setState({ allAllRecordings: response }, () => {
      this.setState({ isLoading: false });
    });
  };

  fetchAllRecordings = () => {
    this.setState({ isLoading: true });
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.fetchListOfRecordingCallID = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };
    const body = JSON.stringify({
      roomId: this.state.roomId,
    });
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.recordings_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body,
    });
  };
  deleteRecording = (recordingId: string) => {
    this.setState({ isLoading: true });
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.deleteRecordingCallID = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };
    const body = "";
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint:
        configJSON.deleteRecordings_EndPoint + `/?recordingId=${recordingId}`,
      method: configJSON.deleteAPIMethod,
      header: headers,
      body,
    });
  };

  toggleMute = () => {
    this.setState({ isMuted: !this.state.isMuted });
  };

  togglePaused = () => {
    this.setState({ isPaused: !this.state.isPaused });
  };

  async componentDidMount() {
    const token = await storage.get("token");
    const meetingId = this.props.navigation.state.params.meetingId;

    if (token) {
      this.setState({ authToken: token, roomId: meetingId }, () => {
        this.fetchAllRecordings();
      });
    } else {
      this.showAlert("Error", "Token is not valid.");
    }
  }
  // Customizable Area End
}
