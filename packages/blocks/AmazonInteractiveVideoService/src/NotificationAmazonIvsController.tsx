import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";
import { getStorageData } from "framework/src/Utilities";
import { handleResponseMessage } from "../src/helpers/handle-response-message";
import createRequestMessage from "./helpers/create-request-message";

// Customizable Area Start
export interface StageData {
        id:number;
        name: string;
        arn: string;
        chat_room_arn: string;
}
export interface NotificationData {
  id:string;
  attributes:{
    headings:string;
    room_id:string;
    chat_arn:string;
    invite_id:number;
    invitation_status:string|null;
    contents:string;
    notification_created_user:{
      data: {
        attributes :{ 
          photo:string|null
        }
      }
    }
  }
}

export interface NotificationResponse {
  data: NotificationData[];
  meta: {
    pagination:{
      total_pages:number
    }
  }
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: {
    params: {
      
    }
  };
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string|null;
  isLoading:boolean;
  notificationData:NotificationData[];
  stageData:StageData[];
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class NotificationAmazonIvsController extends BlockComponent<
  Props,
  S,
  SS
> {
 // Customizable Area Start
 getDataCallId: string = "";
 liveStagesDataCallId: string = "";
 updateInviteCallId:string = "";
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
      token: null,
      isLoading:false,
      notificationData:[],
      stageData:[]
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
      case this.getDataCallId: {
        this.onsuccessgetData(responseDataJson)
        break;
      }
      case this.updateInviteCallId: {
        let newData:NotificationData[] = []
        this.state.notificationData.map((notifi:NotificationData)=> {
          let newObj = notifi;
          if(newObj.attributes.invite_id == responseDataJson.id){
            newObj.attributes.invitation_status = responseDataJson.status
          }
          newData.push(newObj)
        })
        this.setState({notificationData:newData})
        break;
      }
      case this.liveStagesDataCallId : {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({
             stageData:responseDataJson
            })
          },
          onFail: () => {
           this.showAlert(`Error`, "Live Stages data  Failed. Please retry!");
          },
        });
      break;
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getNotifications();
    this.getLiveStagesData();
    // Customizable Area End
  }

  // Customizable Area Start
goLiveAction = () => {
  this.props.navigation.navigate('AmazonInteractiveVideoService')
}

// onStageSelected = (item:StageData) => {

//   this.props.navigation.navigate("AmazonInteractiveVideoService", { stageData })
// }

onStageCLick = (stageData:{name: string;
  stageArn: string;
  isViewer:boolean;
  chatArn: string;
  }) => {
    this.props.navigation.navigate("LiveStreaming", {screen: "LiveStreaming", stageData })
  }

onNotificationCLick = (stageData:{name: string;
  stageArn: string;
  isViewer:boolean;
  chatArn: string;
  inviteId:number;
  }) => {
    this.props.navigation.navigate("LiveStreaming", {screen: "LiveStreaming", stageData })
    this.updateInvite("accepted",stageData.inviteId)
  }


  onsuccessgetData = (apiResponse:NotificationResponse) => {
    if(apiResponse){
      let filteredData = apiResponse.data.filter((item:NotificationData) => item.attributes.contents === 'invitation');
      this.setState({
        notificationData: filteredData,
        isLoading: false
      });
    }
  }


  getNotifications = async () => {
    this.setState({ isLoading: true })
    const authToken = await getStorageData('authToken', false);
    const getDataMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getDataCallId = getDataMsg.messageId;

    getDataMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_notifications/notifications?page=1&per_page=${10}`
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
      configJSON.getApiMethodType
    );

    runEngine.sendMessage(getDataMsg.id, getDataMsg);
  }


  updateInvite = async(status:string,inviteId:number) => {
    const token = await getStorageData("authToken", false)

    const header = {
    token
    };

  const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage),
  );

  this.updateInviteCallId = requestMessage.messageId;

   const body = {
    "invite_id": inviteId,
    "status": status
    };
  
  createRequestMessage({
    requestMessage: requestMessage,
    endPoint: `${configJSON.updateInvite}`,
    method: configJSON.putApiMethodType,
    header: header,
    body:JSON.stringify(body)
  });
  }


  getLiveStagesData = async () => {
    const authToken = await getStorageData('authToken', false);
    const getDataMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.liveStagesDataCallId = getDataMsg.messageId;

    getDataMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.listStages
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
      configJSON.getApiMethodType
    );

    runEngine.sendMessage(getDataMsg.id, getDataMsg);
  }
  // Customizable Area End
}
