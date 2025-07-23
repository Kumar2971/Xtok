import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

// Customizable Area Start
import createRequestMessage from "./helpers/create-request-message";
import { handleResponseMessage } from "./helpers/handle-response-message";
import storage from "framework/src/StorageProvider";
import { MeetingList } from "./Types";
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
  allMeetingsList: MeetingList[];
  isLoading: boolean;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class FetchMeetingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  fetchListOfMeetingCallID: string = "";
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
      allMeetingsList: [],
      isLoading: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    const apiRequestCallID = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage),
    );

    const responseDataJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
    );

    const errorDataJson = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage),
    );

    if (apiRequestCallID === this.fetchListOfMeetingCallID) {
      handleResponseMessage({
        responseJson: responseDataJson,
        errorJson: errorDataJson,
        onSuccess: () => {
          this.onSuccessGetMeeting(responseDataJson.date.data);
        },
        onFail: () => {
          this.showAlert(`Error`, "Fetch all  Meeting Failed! Please retry");
          this.setState({ isLoading: false });
        },
      });
    }
    // Customizable Area End
  }

  // Customizable Area Start

  onSuccessGetMeeting = (response: MeetingList[]) => {
    this.setState({ allMeetingsList: response }, () => {
      this.setState({ isLoading: false });
    });
  };

  listOfMeetings = () => {
    this.setState({ isLoading: true });
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.fetchListOfMeetingCallID = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Meeting_EndPoint,
      method: configJSON.getApiMethodType,
      header: headers,
    });
  };

  goToRecordings = (meetingId: string) => {
    this.props.navigation.navigate("FetchRecordings", { meetingId });
  };

  goToListStreams = (meetingId: string) => {
    this.props.navigation.navigate("FetchStreams", { meetingId });
  };

  async componentDidMount() {
    const token = await storage.get("token");
    if (token) {
      this.setState({ authToken: token }, () => {
        this.listOfMeetings();
      });
    } else {
      this.showAlert("Error", "Token is not valid.");
    }
  }
  // Customizable Area End
}
