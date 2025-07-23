import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "../../../framework/src/Utilities";

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
  helpcenterData:any;
  language:any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class HelpCenterController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  helpCenterApiCallId:any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      helpcenterData:[],
      language:""
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
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId != null) {
        if (apiRequestCallId === this.helpCenterApiCallId) {
         console.log("console helpCenterApiCallId response==>",responseJson);         
         this.helpcenterApiSuccess(responseJson)
        }
      }
    }
    // Customizable Area End
  }

 
  // Customizable Area Start
  helpcenterApiSuccess = (responseJson:any) => {
    if (responseJson && (responseJson.errors || responseJson.error)) {
      console.log(responseJson.errors);        
    } else if (responseJson?.hasOwnProperty('data')) {
      this.setState({ helpcenterData: responseJson.data });
      if(responseJson.data?.attributes?.description == null){
        this.setState({language : "en"}, () => {
          this.getHelpCenter();
        })
      }
    }
  }
  async componentDidMount() {
    const language = await getStorageData("SelectedLng");
    this.setState({language:language})
		this.getHelpCenter();
	}
  getHelpCenter = async () => {
    const token = (await getStorageData('authToken',false)) || ''

    const header = {
      "Content-Type": configJSON.exampleApiContentType
    };

    this.apiCall({
      setApiCallId: 'helpCenterApiCallId',
      header,
      method: configJSON.validationApiMethodType,
      endPoint: `/bx_block_privacy_settings/help_center_content?language=${this.state.language}`,
      body: null
    });
  }

  apiCall = async (data: any) => {
    const { setApiCallId, header, endPoint, method, body } = data;
    
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    if (setApiCallId === "helpCenterApiCallId") {
      this.helpCenterApiCallId = requestMessage.messageId;
    }
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area End
}
