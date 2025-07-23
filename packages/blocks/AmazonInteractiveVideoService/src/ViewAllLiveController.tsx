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
  route:any;
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
  loader:boolean;
  singleliveresult:any;
  singleliveresultData:any;
  singleChallengeresult:any;
  singleChallengeresultData:any;

  language: string;
  onRefresh : boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}
export default class ViewAllLiveController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  login_user_CallID: string = "";
  generateToken_CallID: string = "";
  createMeeting_CallID: string = "";
  validateMeeting_CallID: string = "";
  getLiveDataCallID: string = "";
  senddataCallId:string = "";
  liveChallengeDataCallId="";
  // Customizable Area End

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
      language:"",
      enableField: false,
      // Customizable Area Start
      authToken: "",
      roomId: "",
      micOn: true,
      videoOn: true,
      name: "",
      liveStreamToken: "",
      loader:true,
      singleliveresult:{},
      singleliveresultData:[],
      singleChallengeresult:{},
      singleChallengeresultData:[],
      onRefresh : false,

      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }
  liveViewPage=(item:any)=>{
    let stageData = {
      name: item?.stage_name,
      stageArn: item?.stage_arn,
      isViewer: true,
      chatArn: item?.chat_room_arn,
      hostId: `${item?.stage_created_by}`,
      stageId: item?.id,
      isLiveChallenge: item?.is_challenge
    }
    this.props.navigation.navigate("LiveStreaming", {screen: "LiveStreaming", stageData });
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
      case this.login_user_CallID: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
          },
          onFail: () => {
            this.showAlert(`Error`, "Get Token Failed. Please retry!");
          },
        });
        break;
      }
      case this.getLiveDataCallID: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.onSuccessgetLiveData(responseDataJson);
          },
          onFail: () => {
            this.setState({onRefresh : false});
            this.showAlert(`Error`, "Trending data failed. Please retry!");

          },
        });
        break;
      }
      case this.senddataCallId :{

        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.getLiveData(1);
          },
          onFail: () => {
            this.showAlert(`Error`, "trending data  Failed. Please retry!");

          },
        });
        break;
      }
      case this.liveChallengeDataCallId :{
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.onSuccessgetLiveChallengeData(responseDataJson);
           // alert('livechallenge')
          },
          onFail: () => {
           this.setState({onRefresh : false})
           this.showAlert(`Error`, "Trending data  Failed. Please retry!");
          },
        });
        break;
      }

    }

    // Customizable Area End
  }

  async componentDidMount() {
     this.onSuccessLogin();
     const language = await getStorageData("SelectedLng");
     this.setState({ language: language });
    const roomId= (await getStorageData( 'roomId', false)) || "";
    this.sendData(roomId);
    this.props.navigation.addListener("focus", async () => {
      const language = await getStorageData("SelectedLng");
      this.setState({ language: language });
      this.onSuccessLogin();
    const roomId= (await getStorageData( 'roomId', false)) || "";
    this.sendData(roomId);
    });
  }

  onSuccessLogin = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    await storage.set("token",token);
    this.setState({ authToken: token }, () => {
      this.getLiveData(1);
      this.getLiveChallengesData(1);
    });
  };

  sendData= async(roomId:any) => {
    const token = (await getStorageData("authToken", false)) || "";

     const requestMessage = new Message(
       getName(MessageEnum.RestAPIRequestMessage),
     );

     this.senddataCallId = requestMessage.messageId;

     const headers = {
       "Content-Type": configJSON.apiContentType,
       "token": token,
     };

     const body = JSON.stringify({
      roomId: roomId,
    });

     createRequestMessage({
       requestMessage: requestMessage,
       endPoint: configJSON.statusleaveendpoint,
       method: configJSON.putApiMethodType,
       header: headers,
       body: body,
     });
   };
  onSuccessgetLiveData= async (responses:any) => {
    const currentPage = responses?.meta?.pagination?.current_page;
   if(responses?.data && currentPage){
    if(currentPage ==1){
      this.setState({
        singleliveresult:responses,
      singleliveresultData:responses?.data,
      onRefresh : false,
      })
    }else if(this.state.singleliveresult?.meta?.pagination?.current_page < currentPage){
      this.setState({
        singleliveresult:responses,
        singleliveresultData:[...this.state.singleliveresultData,...responses?.data],
        onRefresh : false,
        })
    }
   }
  };
  getLiveData=(page:number)=>{
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.getLiveDataCallID = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token":this.state.authToken,
    };
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.listStages+"&page="+page+"&per_page=50",
      method: configJSON.getApiMethodType,
      header: headers,

    });
  }

  getLiveChallengesData=(page:any)=>{
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.liveChallengeDataCallId = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token":this.state.authToken,
    };
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.listChallengeStage+"&page="+page+"&per_page=50",
      method: configJSON.getApiMethodType,
      header: headers,
     // body:JSON.stringify(body)
    });
  }

  onSuccessgetLiveChallengeData= async (responses:any) => {
    const currentPage = responses?.meta?.pagination?.current_page;
    if(responses?.data && currentPage){
      if(currentPage==1){
      this.setState({
        singleChallengeresult:responses,
       singleChallengeresultData:responses.data,
       onRefresh: false,
      })
      }else if(this.state.singleChallengeresult?.meta?.pagination?.current_page < currentPage){
        this.setState({
          singleChallengeresult:responses,
          singleChallengeresultData:[...this.state.singleChallengeresultData,...responses.data],
          onRefresh : false
          },)
  }
     }
  };

}