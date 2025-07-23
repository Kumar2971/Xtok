import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import storage from "../../../framework/src/StorageProvider";
import createRequestMessage from "./helpers/create-request-message";
import { handleResponseMessage } from "./helpers/handle-response-message";
import { getStorageData ,setStorageData} from "../../../framework/src/Utilities";
import {BackHandler} from "react-native";
import {
  CreateMeeting,
  ParticipantMode,
  ValidateMeeting,
  meetingTypes,
} from "./Types";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: any;
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
  invitationModel: boolean;
  invitationData: any;

  // Customizable Area End
}


interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class LiveStreamingController extends BlockComponent<
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
      loader:true,
      invitationModel: false,
      invitationData: []
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
        console.log("hhhhhhhhhh",responseDataJson)
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
    }
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    message.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue,
    );
    this.send(message);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start

  // onSuccessCreateMeeting

  onSuccessGenerateToken = (response: { data: string }) => {

    this.setState({ liveStreamToken: response.data },
      ()=>{ if(this.props?.route?.params?.ValidateMeeting){
        console.log("1 = validate meeting")
        this.validateMeeting(this.props?.route?.params?.ValidateMeeting)
      }else{
        this.createMeeting()
      }
    });
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
    if(this.props.route.params.viewer==="VIEWER"){
      console.log("...Viwer...",this.state.name)
      this.props.navigation.navigate("Meeting_Screen", {
        name: this.state.name.trim(),
        token: this.state.liveStreamToken,
        meetingId: this.state.roomId.trim(),
        micEnabled: false,
        webcamEnabled: false ,
        meetingType: meetingTypes[0].key,
        modeTypes: ParticipantMode.VIEWER,
      });
    }else{
      console.log("...participants...",this.state.name , "meetingTypes[0].key,====>",meetingTypes[0].key)
     this.addParticipants();
      this.props.navigation.navigate("Meeting_Screen", {
        name: this.state.name.trim(),
        token: this.state.liveStreamToken,
        meetingId: this.state.roomId.trim(),
        micEnabled: true,
        webcamEnabled: true ,
        meetingType: meetingTypes[0].key,
        modeTypes: ParticipantMode.CONFERENCE,
      });
    }
  }};

  onSuccessCreateMeeting = async (response: {
    data: { data: { attributes: { roomId: string } } };
  }) => {

   let eventId:any=null;
  if(this.props?.route?.params?.EventId){
    eventId=this.props?.route?.params?.EventId;
  }
    this.setState({ roomId: response.data.data.attributes.roomId ,loader:false}, () => {
      this.props.navigation.navigate("Meeting_Screen", {
        name: this.state.name,
        token: this.state.liveStreamToken,
        meetingId: this.state.roomId,
        micEnabled: this.state.micOn,
        webcamEnabled: this.state.videoOn,
        meetingType: meetingTypes[0].key,
        modeTypes: ParticipantMode.CONFERENCE,
        eventId:eventId,
        roomId:response.data.data.attributes.roomId
      });
      this.setState({ roomId: "",loader:false });
    });
    this.sendStatus(this.state.roomId);

  };

  //login waste function
  onSuccessLogin = async (response:any) => {
    const token = (await getStorageData("authToken", false)) || "";
    await storage.set("token",token);

    this.setState({ authToken: token,name: response.data.attributes.full_name}, () => {
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

  createMeeting = () => {
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
      "token": this.state.authToken,
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

  async componentDidMount() {
   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
   this.loggeduserdetails()
    this.props.navigation.addListener("focus", () => {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
 })
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
