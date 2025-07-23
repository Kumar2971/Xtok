import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
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
  token: string;
  userStatus: {
    account_id: number;
    status: string;
  }[];
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class UserStatusController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getUserStatusCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      userStatus: [],
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
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
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
      this.getUserStatus(token);
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiResponse.data?.account_status) {
        this.setState({
          userStatus: apiResponse.data?.account_status,
        });
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  getUserStatus(token: string) {
    const headers = {
      "Content-Type": configJSON.userStatusApiContentType,
      token: token,
    };

    const getUserStatusMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getUserStatusCallId = getUserStatusMsg.messageId;

    getUserStatusMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.userStatusApiEndpont
    );

    getUserStatusMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    getUserStatusMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.userStatusApiMethod
    );

    runEngine.sendMessage(getUserStatusMsg.id, getUserStatusMsg);
  }
  // Customizable Area End
}
