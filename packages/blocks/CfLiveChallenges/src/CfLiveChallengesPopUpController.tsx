import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import storage from "../../../framework/src/StorageProvider";
import createRequestMessage from "../../LiveStreaming/src/helpers/create-request-message";

import { handleResponseMessage } from "../../LiveStreaming/src/helpers/handle-response-message";
import { getStorageData ,setStorageData} from "../../../framework/src/Utilities";
import {BackHandler} from "react-native";
import {
  LiveStream,
  ParticipantMode,
  ValidateMeeting,
  meetingTypes,
} from "../../LiveStreaming/src/Types";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route:any
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
  loader1: boolean;
  loader2: boolean;
  invitationModel: boolean;
  invitationData: any;
  livestreamId: any;
  gitfmodel: boolean,
  gitfmodel2:boolean,
  liveChallengeId:any;
  statusId:any;
  duration:any;
  loginUserData:any;
  currentUserData:any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CfLiveChallengesPopUpController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  login_user_CallID: string = "";
  generateToken_CallID: string = "";
  createMeeting_CallID: string = "";
  validateMeeting_CallID: string = "";
  sendstatus_CallID: string = "";
  addParticipants_CallID: string = "";
  removeParticipants_CallID: string = "";
  createLiveChallengeID: string = "";
  startHLSStreamCallId: string = "";
  startRtmpStreamCallId: string = "";
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
      enableField: false,
      // Customizable Area Start
      authToken: "",
      roomId: "",
      micOn: true,
      videoOn: true,
      name: "",
      liveStreamToken: "",
      loader:false,
      loader1: false,
  loader2: false,
      invitationModel: false,
      invitationData: [],
      livestreamId: "",
      gitfmodel: false,
      gitfmodel2:false,
      liveChallengeId:null,
      statusId:"",
      duration:null,
      loginUserData:null,
      currentUserData:"",
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
      case this.login_user_CallID: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.onSuccessLogin(responseDataJson);
          },
          onFail: () => {
            this.showAlert(`Error`, "Get Token Failed. Please retry!");
          },
        });

        break;
      }
      case this.generateToken_CallID: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.onSuccessGenerateToken(responseDataJson);
          },
          onFail: () => {
            this.showAlert(`Error`, "Generate token Failed. Please retry!");

          },
        });
        break;
      }
      case this.createMeeting_CallID: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.onSuccessCreateMeeting(responseDataJson);
          },
          onFail: () => {
            this.showAlert(`Error`, "Create meeting Failed. Please retry!");
          },
        });
        break;
      }
      case this.validateMeeting_CallID: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.onSuccessJoinMeeting(responseDataJson);
          },
          onFail: () => {
            this.showAlert(`Error`, "joined  meeting Failed. Please retry!");
          },
        });
        break;
      }
    case this.createLiveChallengeID:{
      handleResponseMessage({
        responseJson: responseDataJson,
        errorJson: errorDataJson,
        onSuccess: () => {
          this.setState({liveChallengeId: responseDataJson?.id}, () => {
            this.props.navigation.navigate('CfLiveChallenges',{
              name: this.state.name,
              token: this.state.liveStreamToken,
              meetingId: this.state.roomId,
              micEnabled: this.state.micOn,
              webcamEnabled: this.state.videoOn,
              meetingType: meetingTypes[0].key,
              modeTypes: ParticipantMode.CONFERENCE,
              navigatefrom:"livechallenge",
              liveChallengeId:this.state.liveChallengeId,
              statusId: this.state.statusId,
              duration: this.state.duration,
              profilePic: this.state.currentUserData?.photo ?? "",
              participantId :  this.state.currentUserData?.datasaver?.account_id,
              isChallengeCreated:true
           })
          })
          this.setState({gitfmodel2: false,loader:false,loader1:false,loader2:false,gitfmodel:false})
        },
        onFail: () => {
          this.showAlert(`Error`, "Creating live challenge failed. Please retry!");
        },
      });
      break;
    }
    case this.startHLSStreamCallId:{
      handleResponseMessage({
        responseJson: responseDataJson,
        errorJson: errorDataJson,
        onSuccess: () => {
        },
        onFail: () => {
          this.showAlert(`Error ${errorDataJson}`, "joined  meeting Failed. Please retry! ");
        },
      });
    }
  }
    // Customizable Area End
  }


  onSuccessGenerateToken = (response: { data: string }) => {

    this.setState({ liveStreamToken: response.data },
      ()=>{ if(this.props?.route?.params?.ValidateMeeting){
        this.validateMeeting(this.props?.route?.params?.ValidateMeeting)
      }else{
        this.createMeeting()
      }
    }
    );
    console.log("response===>",response.data)

  };

  //onSuccessJoinMeeting

  onSuccessJoinMeeting = async(response: {
    data: {
      disabled: boolean;
      id: string;
      roomId: string;
    };

  }) => {
    if (response) {
      await setStorageData('roomId',this.state.roomId.trim());
    
    if(this.props.route.params.viewer){
      console.log("...Viwer...",this.state.name)
      this.props.navigation.navigate("CfLiveChallenges", {
        name: this.state.name.trim(),
        token: this.state.liveStreamToken,
        meetingId: this.state.roomId.trim(),
        micEnabled: false,
        webcamEnabled: false ,
        meetingType: meetingTypes[0].key,
        modeTypes: ParticipantMode.VIEWER,
        statusId:this.state.statusId,
        profilePic: this.state.currentUserData?.photo ?? "",
        // modeTypes: ParticipantMode.CONFERENCE,
      });
    }else{
      console.log("...participants...")
     this.addParticipants();
      this.props.navigation.navigate("CfLiveChallenges", {
        name: this.state.name.trim(),
        token: this.state.liveStreamToken,
        meetingId: this.state.roomId.trim(),
        micEnabled: true,
        webcamEnabled: true ,
        meetingType: meetingTypes[0].key,
        modeTypes: ParticipantMode.CONFERENCE,
        statusId:this.state.statusId,
        profilePic: this.state.currentUserData?.photo ?? "",
        // isChallengeCreated:true
      });
    }
  }};

  closeGiftModal = () => {
      this.setState({ gitfmodel2: false });
  }

  onSuccessCreateMeeting = async (response: {
    data: { data: { attributes: any,id:any } };
  }) => {
   let eventId:any=null;
  if(this.props?.route?.params?.EventId){
    eventId=this.props?.route?.params?.EventId;
  }

    this.setState({ roomId: response.data.data.attributes.roomId ,
      livestreamId: response.data.data.id,
      loader:false,
    loader1:false,
  loader2:false}, () => {
       this.createLiveChallenge();
      //  this.hlsStartLiveStream(this.state.roomId)
      console.log('live started' );

    // code add after startbuttyon api response
    //   this.props.navigation.navigate("Meeting_Screen", {
    //     name: this.state.name,
    //     token: this.state.liveStreamToken,
    //     meetingId: this.state.roomId,
    //     micEnabled: this.state.micOn,
    //     webcamEnabled: this.state.videoOn,
    //     meetingType: meetingTypes[0].key,
    //     modeTypes: ParticipantMode.CONFERENCE,
    //     eventId:eventId,

    //   });
    //   this.setState({ roomId: "",loader:false });
    });
    this.sendStatus(this.state.roomId);

  };

  //login waste function
  onSuccessLogin = async (response:any) => {
    this.setState({loginUserData:response.data})
    const token = (await getStorageData("authToken", false)) || "";
    await storage.set("token",token);

    console.log("tokennmmmmmmmm",response.data.attributes);
    
    console.log("tokennmmmmmmmmimage",response.data.attributes.photo);
    this.setState({ authToken: token,name: response.data.attributes.full_name , currentUserData:response.data.attributes}, () => {
      console.log("tokennmmmmmmmm",this.state.name);
      this.generateToken();

    });
  };

  loggeduserdetails= async () => {

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

  generateToken = async() => {
    const token = (await getStorageData("authToken", false)) || "";
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.generateToken_CallID = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };
    const body = "";
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Generate_Token_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: JSON.stringify(body),
    });
  };

  createMeeting = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({
      micOn:true,
      videoOn: true,
    });
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.createMeeting_CallID = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };
    const body = "";
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Create_Meeting_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: JSON.stringify(body),
    });

  };

  createLiveChallenge = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.createLiveChallengeID = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };
    const body = {
      challenge_type: `${this.props.route.params.statusId ?? "1"}`,
      mode: "CONFERENCE",
      status: "active",
      duration: this.state.duration,
      livestream_id: this.state.livestreamId,
      videosdk_token: this.state.liveStreamToken
    };
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.createLiveChallenge_Endpoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: JSON.stringify(body),
    });

  };
  sendStatus = (roomId:any) => {
       const requestMessage = new Message(
         getName(MessageEnum.RestAPIRequestMessage),
       );
       this.sendstatus_CallID = requestMessage.messageId;
       const headers = {
         "Content-Type": configJSON.apiContentType,
         "token": this.state.authToken,
       };
       const body = {
        roomId:roomId,
       };
       createRequestMessage({
         requestMessage: requestMessage,
         endPoint: "",
         method: configJSON.postApiMethod,
         header: headers,
         body: JSON.stringify(body),
       });

  };

  validateMeeting = (props: ValidateMeeting) => {
    this.setState({
      micOn: true,
      videoOn: true,
      name: this.state.name,
      roomId: props.roomId,
    });
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.validateMeeting_CallID = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };
    const body = {
      roomId: props.roomId,
    };
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Validate_Meeting_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: JSON.stringify(body),
    });
  };
  addParticipants = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.addParticipants_CallID = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };
    const body = {
      roomId: this.state.roomId,
    };
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.addParticipants_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: JSON.stringify(body),
    });
  };

  hlsStartLiveStream = async(meetingId: string) => {
    const token = (await getStorageData("authToken", false)) || "";
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.startHLSStreamCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    const body = JSON.stringify({
      roomId: meetingId,
      type: "SPOTLIGHT",
      priority: "PIN",
      orientation: "portrait",
      gridSize: 4,
      theme: "DARK",
      is_live_stream_meet: false,
    });
    console.log('start api body',body);

   createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Start_HLStream_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };

  startLiveStreamFunction = async(props: LiveStream) => {
    const token = (await getStorageData("authToken", false)) || "";

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.startRtmpStreamCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    const body = JSON.stringify({
      roomId: props.meetingId,
      streamKey: props.streamKey,
      streamUrl: props.streamUrl,
    });
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Start_LiveStream_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: JSON.stringify(body),
    });
  };


  async componentDidMount() {
    this.setState({statusId:this.props.route.params?.statusId ?? 1})
  }
async componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

   handleBackButtonClick = () => {
   this.props.navigation.goBack();
    return true;
  }
  fetchRecordingFunction = () => {
    this.props.navigation.navigate("FetchMeetings");
  };
  // Customizable Area End
}