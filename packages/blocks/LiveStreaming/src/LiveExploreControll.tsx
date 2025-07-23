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
import { ParticipantMode, meetingTypes } from "./Types";
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
  loader:boolean;
  singleliveresult:any;
  singleliveresultData:any;
  singleChallengeresult:any;
  singleChallengeresultData:any;
  language:any;
  currentUserData:any;
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
  getLiveDataCallID: string = "";
  senddataCallId:string = "";
  liveChallengeDataCallId: string = "";
  login_user_CallID:string = "";
  liveStagesDataCallId : string = "";
  // Customizable Area End

  intervalID:any = 0;
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
      loader:true,
      singleliveresult:{},
      singleliveresultData:[],
      singleChallengeresult:{},
      singleChallengeresultData:[],
      language:"",
      currentUserData:"",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }
  liveViewPage=(item:any)=>{
    let stageData = {
      name: item?.name,
      stageArn: item?.arn,
      isViewer: true,
      chatArn: item?.chat_room_arn,
      hostId: `${item?.created_by}`,
    }
    this.props.navigation.navigate("LiveStreaming", {screen: "LiveStreaming", stageData });
  }
  liveChallengesView=(item:any)=>{
    let ValidateMeeting={
      name:this.state.currentUserData.full_name,
      meetingId:item?.item?.attributes?.livestream_data?.roomId,
      token : item?.item?.attributes?.videosdk_token,
      micEnabled: false,
        webcamEnabled: false ,
        meetingType: meetingTypes[0].key,
        modeTypes: ParticipantMode.VIEWER,
         liveChallengeId:item?.item?.attributes?.id,
         isChallengeCreated:false,
         participantId:this.state.currentUserData?.datasaver?.account_id,
         profilePic: this.state.currentUserData?.photo
    }
      this.props.navigation.navigate("CfLiveChallenges",{ValidateMeeting,...ValidateMeeting, viewer: "VIEWER"})
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
      case this.getLiveDataCallID: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.onSuccessgetLiveData(responseDataJson);
          },
          onFail: () => {
           this.showAlert(`Error`, "Facing some problem in fetching trending data. Apologies for the inconvenience");
          },
        });
        break;
      }
      case this.liveStagesDataCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.onSuccessGetLiveStages(responseDataJson);
          },
          onFail: () => {
           this.showAlert(`Error`, "Facing some problem in fetching trending data. Apologies for the inconvenience");
          },
        });
        break;
      }
      case this.senddataCallId :{
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
      case this.liveChallengeDataCallId :{
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.onSuccessgetLiveChallengeData(responseDataJson);
           // alert('livechallenge')
          },
          onFail: () => {
           this.showAlert(`Error`, "Trending challenges data  Failed. Please retry!");
          },
        });
        break;
      }
      case  this.login_user_CallID: {
        this.handleLoginUserData(responseDataJson)
        break;
      }

    }

    // Customizable Area End
  }

  async componentDidMount() {
     this.onSuccessLogin();
     this.getCurrentUserDetails();
     this.getLiveStagesData();
    const roomId= (await getStorageData( 'roomId', false)) || "";
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language });
    this.sendData(roomId);
    this.props.navigation.addListener("focus", async () => {
      this.onSuccessLogin();
    const roomId= (await getStorageData( 'roomId', false)) || "";
    this.sendData(roomId);
    });
  
    await this.onSuccessLogin();
    this.intervalID =  setInterval(async () => {
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
    await storage.set("token",token);
    this.setState({ authToken: token }, () => {
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
   if(responses.date?.meta.pagination.current_page){
    if(responses.date?.meta.pagination.current_page==1){
    this.setState({
      singleliveresult:responses,
     singleliveresultData:responses?.date?.data
    })
    }else{
  this.setState({
    singleliveresult:responses,
    singleliveresultData:[...this.state.singleliveresultData,...responses.date.data]
     },)
}
   }
   else{
    this.setState({
      singleliveresult:{},
     singleliveresultData:[]

    })
   }
  };

  onSuccessGetLiveStages = (response : any) => {
    if(response?.length > 0){
      response?.pop();
      this.setState({singleliveresultData : response});
    }
  }

  onSuccessgetLiveChallengeData= async (responses:any) => {
    if(responses.meta.pagination.current_page){
      if(responses.meta.pagination.current_page==1){
      this.setState({
        singleChallengeresult:responses,
       singleChallengeresultData:responses.data
      })
      }else{
    this.setState({
      singleChallengeresult:responses,
      singleChallengeresultData:[...this.state.singleChallengeresultData,...responses.data]
       },)
  }
     }
     else{
      this.setState({
        singleChallengeresult:{},
       singleChallengeresultData:[]

      })
     }
  };

  getLiveData=(page:any)=>{
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
      endPoint: configJSON.trendinglive+"?page="+page,
      method: configJSON.getApiMethodType,
      header: headers,

    });
  }

  getLiveStagesData = async () => {
    const authToken = await getStorageData('authToken', false);
    const getLiveStage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.liveStagesDataCallId = getLiveStage.messageId;

    getLiveStage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.listStages
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

  handleLoginUserData = (apiResponse:any) => {
    this.setState({currentUserData:apiResponse.data.attributes});
  }

  getCurrentUserDetails= async () => {

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
      endPoint: configJSON.trendingliveChallenges+"?page="+page,
      method: configJSON.getApiMethodType,
      header: headers,
     // body:JSON.stringify(body)
    });
  }
}