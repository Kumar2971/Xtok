import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";
import {Alert, BackHandler} from "react-native";
import { ActiveMeetingStream, LiveStream,ParticipantMode,ValidateMeeting, meetingTypes} from "../../LiveStreaming/src/Types";
//@ts-ignore
import i18n from "i18n-js";
import createRequestMessage from "../../LiveStreaming/src/helpers/create-request-message";
import MeetingContainer from "../../LiveStreaming/src/screens/meeting/MeetingContainer";
import {createRef} from 'react';
import { StackActions } from "@react-navigation/native";
import SoundPlayer from 'react-native-sound-player'
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
  team1: any;
  team2: any;
  scoreTeam1: any;
  scoreTeam2: any;
  participantFeedback: any;
  DATA: any;
  gitfmodel: boolean;
  routes: any;
  indexss: any;
  classic: any;
  premium: any;
  apiLoader: boolean;
  categories: any;
  isActiveTab: boolean;
  selectedTab: any;
  catalogue: any;
  catalogueIndex: any;
  selectedCatalogue: any;
  scoreUserDetails: any;
  team1_scores: any;
  team2_scores: any;
  coins_count: any;
  searchresult: any;
  loader: boolean;
  recentsearch: boolean;
  invitationModel: boolean;
  value: string;
  comments: any;
  totalpeoplewatching: any;
  showMoreButton: boolean;
  textShown: boolean;
  numLines: any;
  lastgiftdata: any;
  defaultCatalogue: any;
  loggeduserImage: string;
  language: any;
  searchText: string
  selectedInviteData: any;
  inviteButtonDisable: boolean;
  minutes: any;
  seconds: any;
  token:any;
  micOn: boolean;
  videoOn:boolean;
  livestreamId: any;
  roomId:any;
  name:any;
  webcamOn:boolean;
  meetingType:any;
  modeTypes:any;
  livestreamToken:any;
  statusId:number;
  participantsData:any;
  participantModel: boolean;
  stickerURL:string;
  liveChallengeId:any;
  viewersCount:number;
  invitedCount: number;
  timeReset:boolean;
  isChallengeStarted:boolean;
  authToken:string;
  coinsSent:boolean;
  donatedTeam:string;
  donatedCoin:number;
  selectedId:any;
  isTimerStarted:boolean;
  isMeetingClosed: boolean;
  duration:number;
  meetingStarted:boolean;
  viewheight:number;
  isNewParticipantJoined:boolean;
  lottieAnimation: {
    show: boolean,
    url: string,
    audioUrl: string,
    json:string,
    positionLeft: number,
    positionTop: number,
  }
  isExploreClicked:boolean;
  alertModal:any;
  loggedUserId: number;
  setAllowLeaderBoardVisible: boolean;
  isCatalogueLoading:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CfLiveChallengesController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  categoriesApiCallId: any;
  catalogueApiCallId: any;
  livedetailApiCallId: any;
  updatescoreApiCallId: any;
  updatelivescoreApiCallId: any;
  overallliveApiCallId: any;
  getCoinBalanceApiCallId: any;
  interval: any;
  sendCommentsApiCallId: any;
  getCommentsCallId: any;
  intervalComments: any;
  deleteCommentsCallId: any;
  endLivewatchingApiCallId: any;
  getLastGiftApiCallId: any;
  defaultCatalogueApiCallId: any;
  loggeduserdetailsApiCallId: any;
  intervalgift: any;
  inviteParticipantLiveChallengeID: any;
  searchParticipantToInviteID: any;
  startHLSStreamCallId:any;
  stopHLSStreamCallId:any;
  activeHLSStreamCallId:any;
  removeParticipants_CallID :string = '';
  deactivateStreamCallId:string="";
  stopRtmpStreamCallId:any;
  statusjoinCallId:any;
  statusleaveCallId:any;
  startRtmpStreamCallId:any;
  fetchSessionCallId:any
  endChallengeCallId:any;
  createMeeting_CallID:any;
  createLiveChallengeID:any;
  validateMeeting_CallID:any;
  deactivateLiveChallengeID: any;
  getAccountSettingsCallId: string = "";
  stopRecordingCallId:any;
  startRecordingCallId:any;
  animationQueue: {
    show: boolean,
    url: string,
    audioUrl: string,
    json:string,
    positionLeft: number,
    positionTop: number,
  }[] = [];

  setDownStreamURL?: React.Dispatch<React.SetStateAction<string>>;

  timer:any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage)
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      searchText: "",
      searchresult: [],
      stickerURL: "",
      loader: false,
      recentsearch: false,
      invitationModel: false,
      setAllowLeaderBoardVisible: false,
      // Customizable Area Start
      team1: [
        // { id: 1 },
        // { id: 2 },
      ],
      team2: [
        // { id: 1 },
        // { id: 2 },
      ],
      scoreTeam1: 0,
      scoreTeam2: 0,
      team1_scores: {},
      team2_scores: {},
      scoreUserDetails: {},
      coins_count: 0,
      comments: "",
      timeReset:true,
      participantFeedback: [
        {
          id: 1,
          name: "someone",
          text: 'Yay. hope niko wins this one {"<3<3<3<3<3"}'
        }
      ],
      DATA: [],
      totalpeoplewatching: 0,
      gitfmodel: false,
      routes: ["classic", "premium"],
      categories: [],
      lastgiftdata: [],
      indexss: 0,
      classic: [
        {
          id: 1,
          name: "Made my Day",
          coins: 25,
          stickerimage: ""
        },
        {
          id: 2,
          name: "Omg",
          coins: 50,
          stickerimage: ""
        },

      ],
      premium: [
        {
          id: 1,
          name: "Day",
          coins: 55,
          stickerimage: "Rose"
        },
        {
          id: 2,
          name: "Omg",
          coins: 500,
          stickerimage: ""
        }
      ],
      apiLoader: false,
      isActiveTab: false,
      selectedTab: null,
      catalogue: [],
      catalogueIndex: [],
      selectedCatalogue: [],
      value: "",
      showMoreButton: false,
      textShown: false,
      numLines: undefined,
      defaultCatalogue: {},
      loggeduserImage: '',
      language: "",
      selectedInviteData: {},
      inviteButtonDisable: false,
      minutes: 1,
      seconds: 0,
      token:"",
      micOn: true,
      videoOn: true,
      livestreamId:"",
      roomId:"",
      name:"",
      webcamOn:true,
      meetingType:"",
      modeTypes:"",
      livestreamToken:"",
      statusId:1,
      participantsData:[],
      participantModel:false,
      liveChallengeId:null,
      viewersCount:0,
      invitedCount: 0,
      isChallengeStarted:false,
      authToken:'',
      coinsSent:false,
      donatedTeam:"",
      donatedCoin:0,
      selectedId:0,
      isTimerStarted:false,
      isMeetingClosed:false,
      duration:5,
      meetingStarted:false,
      viewheight:300,
      isNewParticipantJoined:false,
      lottieAnimation: {
        show: false,
        url: "",
        audioUrl: "",
        json:"",
        positionLeft: 0,
        positionTop: 0,
      },
      isExploreClicked:false,
      alertModal:{
        openAlertModal: false,
        alertMsg: "",
        },
      loggedUserId: 0,
      isCatalogueLoading:false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable RArea Start
    // Customizable Area End
  }
  handleApiRequest = async(
    apiRequestCallId: any,
    responseJson: any,
    errorReponse: any
  ) => {
    switch(apiRequestCallId) {
      case this.categoriesApiCallId: {
        this.setState({ apiLoader: false });
        if (responseJson && (responseJson.errors || responseJson.error)) {
          //Check Error Response
          this.handleErrorResponse(responseJson);
        } else if (responseJson?.data) {
          this.setState({
            categories: responseJson.data,
            catalogueIndex: responseJson.data[0]
          });
          this.getCatalogue(this.state.catalogueIndex?.attributes?.id);
        }
        break;
      }
        case this.catalogueApiCallId :{
        this.setState({ apiLoader: false });
        if (responseJson && (responseJson.errors || responseJson.error)) {
          //Check Error Response
          this.handleErrorResponse(responseJson);
        } else if (responseJson?.data) {
          this.setState({ catalogue: responseJson.data , isCatalogueLoading:false });
        }
        break ;
      }
       case this.getCoinBalanceApiCallId : {
        this.setState({ apiLoader: false });
        if (responseJson && (responseJson.errors || responseJson.error)) {
          //Check Error Response
          this.handleErrorResponse(responseJson);
        } else if (responseJson) {
          this.setState(
            {
              coins_count: responseJson.coins_count
            },
            // () => console.log("coincount", this.state.coins_count)
          );
        }
        break;
      }


      case this.livedetailApiCallId : {
        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          //Check Error Response
          this.handleErrorResponse(responseJson);
        }
         break;
      }
         case this.overallliveApiCallId : {
        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          //Check Error Response
          this.handleErrorResponse(responseJson);
        } else if (responseJson?.data) {
          this.handleGetOverallLiveDataResponse(responseJson)
          }
          break;
      }
        case this.updatescoreApiCallId: {
        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          //Check Error Response
          this.handleErrorResponse(responseJson);
        } else if (responseJson) {
          this.handleExchangeCoinResponse(responseJson);
        }
        this.setState({
          scoreUserDetails: {},
          selectedCatalogue: [],
        })
         break;
      }
      case this.getCommentsCallId :{

        this.setState({ apiLoader: false });
        if (responseJson && (responseJson.errors || responseJson.error)) {
          //Check Error Response
          this.handleErrorResponse(responseJson);
        } else if (responseJson?.data) {
          this.setState({
            DATA: responseJson.data
          })
        }
        break;
      }
      case this.deleteCommentsCallId :{

        this.setState({ apiLoader: false });
        if (responseJson && (responseJson.errors || responseJson.error)) {
          //Check Error Response
          this.handleErrorResponse(responseJson);
        } else if (responseJson?.data) {

          this.getComments();

        } else if (responseJson.message) {
          // alert(responseJson.message)
          this.getComments();
        }
        break;
      }
       case this.sendCommentsApiCallId : {

        this.setState({ apiLoader: false });
        if (responseJson && (responseJson.errors || responseJson.error)) {
          //Check Error Response
          this.handleErrorResponse(responseJson);
        } else if ( responseJson?.data) {
          this.setState({
            comments: ""
          }, () => this.getComments())

        }
        break;
      }
         case this.endLivewatchingApiCallId : {

        this.setState({ apiLoader: false });
        if (responseJson && (responseJson.errors || responseJson.error)) {
          //Check Error Response
          this.handleErrorResponse(responseJson);
        } else if (responseJson?.data) {
          this.setState({alertModal:{openAlertModal: true, alertMsg: "Live challenge successfully ended" }})
        }
        break;
      }
       case this.getLastGiftApiCallId : {
        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          this.handleErrorResponse(responseJson);
        } else
          if (responseJson) {
            this.setState({
              lastgiftdata: responseJson
            })
          }
           break;
      }
      case this.defaultCatalogueApiCallId : {
        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          this.handleErrorResponse(responseJson);
        }
        if (responseJson) {

          this.setState({
            defaultCatalogue: responseJson.data
          }
          // , () => console.log("apiresponses1", this.state.defaultCatalogue)
          )
        }
         break;
      }
         case this.loggeduserdetailsApiCallId : {
        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          this.handleErrorResponse(responseJson);
        } else
          if (responseJson) {
            this.setState({
              loggeduserImage: responseJson.data?.attributes?.photo,
              loggedUserId: responseJson.data?.id,
            })
          }
          break;
      }

       case this.searchParticipantToInviteID : {
        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          this.handleErrorResponse(responseJson);
        } else
          if (responseJson) {
            this.setState({
              // loggeduserImage:responseJson.data?.attributes?.photo
              searchresult: responseJson?.account
            })
          }
          break;
      }

      case this.inviteParticipantLiveChallengeID :{

        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          this.setState({selectedInviteData:{},invitationModel:false},()=>{
            setTimeout(()=>{
              this.showAlert(`Error`, `${responseJson.error[0]}`);
            },1000)
          })
        } else if (responseJson) {
            if(responseJson?.id){
            await setStorageData("liveinviteId", `${responseJson?.id}`);
          }
            this.setState({ apiLoader: false, inviteButtonDisable: true});
            this.state.statusId==1&&this.setState({invitationModel:false});
            this.handleParticipantInvitation();
            if(((this.state.statusId * 2)-1) == this.state.invitedCount){
            this.setState({isTimerStarted:true})
            }
          }
          break;
      }

      case this.startHLSStreamCallId :{

        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          // alert(`start hls  ${responseJson.error}`)
        } else
          if (responseJson && !(responseJson.errors || responseJson.error)) {
            // console.log("sucess")
          }
          break;
      }
      case this.stopHLSStreamCallId :{

        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          this.handleErrorResponse(responseJson);
        } else
          if (responseJson) {
            this.endLiveChallenge();
            // console.log("sucess")
          }
          break;
      }
      case this.stopHLSStreamCallId :{

        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          // alert(responseJson.error)
        } else
          if (responseJson) {
            // console.log("sucess")
          }
          break;
      }
      case this.startRtmpStreamCallId :{

        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          // alert(` startRtmpStreamCallId ${responseJson}`)
        } else
          if (responseJson) {
            // console.log("sucess")
          }
          break;
      }
      case this.stopRtmpStreamCallId :{

        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          // this.handleErrorResponse(responseJson);
          // alert(`stop rtmp ${responseJson.error}`)
        } else
          if (responseJson) {
            // console.log("sucess")
          }
          break;
      }
      case this.statusjoinCallId :{

        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          // this.handleErrorResponse(responseJson);
          // alert(`status join ${responseJson.error}`)
        } else
          if (responseJson) {
            // console.log("sucess")
          }
          break;
      }
      case this.statusleaveCallId:{

        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          // this.handleErrorResponse(responseJson);
          // alert(`status leave ${responseJson.error}`)
        } else
          if (responseJson) {
            // console.log("sucess")
          }
          break;
      }
      case this.fetchSessionCallId:{

        this.setState({ apiLoader: false })
        // alert(`fetch response ${responseJson}`)
        if (responseJson && (responseJson.errors || responseJson.error)) {
          // this.handleErrorResponse(responseJson);
          // alert(`fetch session ${responseJson.error}`)
        } else
          if (responseJson) {
            // console.log("sucess")
          }
          break;
      }

      case this.endChallengeCallId :{
        this.setState({ apiLoader: false });
        if (responseJson && (responseJson.errors || responseJson.error)) {
          //Check Error Response
         // alert("API failure")
          this.handleErrorResponse(responseJson);
        } else if (responseJson && responseJson.message) {
        //  alert(`end challenge ${responseJson.message}`)

         this.stopLiveStreamFunction(this.state.roomId)
          this.hlsStopLiveStream(this.state.roomId)
          // .then(()=> this.props.navigation.navigate('Comments',{type:undefined}))
        }
        break;
      }

      case this.createMeeting_CallID:{

        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          // this.handleErrorResponse(responseJson);
         // alert(responseJson.error)
        } else
            if (responseJson && !responseJson.error && !responseJson.errors) {
              this.onSuccessCreateMeeting(responseJson);
            }

          break;
      }

      case this.createLiveChallengeID:{

        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          // this.handleErrorResponse(responseJson);
         // alert(responseJson.error)
        } else
          if (responseJson && !(responseJson.errors || responseJson.error) ) {
            this.setState({liveChallengeId: responseJson?.id})
           console.log("successss===>>>>",responseJson)
          }
          break;
      }
      case this.validateMeeting_CallID :{

        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          // this.handleErrorResponse(responseJson);
         // alert(responseJson.error)
        } else
        if (responseJson && !responseJson.error && !responseJson.errors) {
          this.onSuccessJoinMeeting(responseJson);
        }

          break;
      }
      case this.deactivateLiveChallengeID :{

        this.setState({ apiLoader: false })
        if (responseJson && (responseJson.errors || responseJson.error)) {
          // this.handleErrorResponse(responseJson);
          this.setState({alertModal:{openAlertModal: true, alertMsg:responseJson.error}})
        } else
          if (responseJson) {
            // console.log("Live challenge ended!")
          }
          break;
      }
      case this.statusjoinCallId: {
        this.setState({ apiLoader: false });
        if (responseJson && (responseJson.errors || responseJson.error)) {
          //Check Error Response
          this.handleErrorResponse(responseJson);
        } else if (responseJson && responseJson.data) {

        }
        break;
      }
      case this.getAccountSettingsCallId: {
        this.setState({ apiLoader: false });
        if (responseJson && (responseJson.errors || responseJson.error)) {
          //Check Error Response
          this.handleErrorResponse(responseJson);
        } else if (responseJson && responseJson.data) {
          this.setState({
            setAllowLeaderBoardVisible: responseJson.data.attributes.allow_leaderboard_visibility,
          })
        }
        break;
      }
    }
  };
  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      runEngine.debugLog("API Message Recived", message);

      this.handleApiRequest(apiRequestCallId, responseJson, errorReponse);
    }
    // Customizable Area End
  }

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    const language = await getStorageData("SelectedLng");
    this.setState({language:language})
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.defaultCatalogue();
    this.loggeduserdetails();
    this.getCoinBalance();
    this.getliveDetails();
    this.getoveralllive();
    this.getComments();
    this.getLastGift();
    this.getAccountSettings();
    this.searchParticipantToInvite({ searchText: '' })
    if(this.props?.route?.params?.ValidateMeeting){
      // alert("validatee...")
      this.validateMeeting(this.props?.route?.params?.ValidateMeeting)
    }

    // Removing the below intervals in favor of pubsub events
    this.setState({isChallengeStarted:this.props?.route?.params?.isChallengeCreated ?? false,statusId:this.props?.route?.params?.statusId})
    if(this.props.route.params.duration){
      this.setState({duration:this.props.route.params.duration})
    }
    this.props.navigation.addListener('focus', () => {

      // Removing the below intervals in favor of pubsub events

      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    })

    // Customizable Area End
  }


  async componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.intervalComments);
    clearInterval(this.timer);
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.setState({
      gitfmodel: false,
    })
    return null
  }
  //invited data store
  handleParticipantInvitation = () => {
    let data = this.state.searchresult.slice();
    let updatedData = data.map((objA: any) => {
      if (objA.id == this.state.selectedInviteData.id) {
        return {
          ...objA,
          isInvited: true,
          isLoader: true
        }
      } else {
        return {
          ...objA,
          isLoader: false
        }
      }
    })
    this.setState({
      searchresult: updatedData,
      selectedInviteData: {},
      invitedCount: this.state.invitedCount + 1
    })
  }

getIfUserInviteValid = (length:number) => {
  switch(this.state.statusId){
 case 1:{
  return length === 2
 }
 case 2:{
  return length === 4
 }
 case 3:{
  return length === 6
 }
 default:{
  return false
 }
  }
}

setTimer = async() =>{
  clearInterval(this.timer);
  this.timer = setInterval(() => {
    this.setState(prevState => {
      let { minutes, seconds } = prevState;

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.timer);
          if(this.props.route.params?.isChallengeCreated){
          if(this.state.meetingStarted || !this.getIfUserInviteValid(this.state.participantsData.length)){
            this.setState({isMeetingClosed:true})
          }
          else {
            this.endChallenge();
          }
        }
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }

      return { minutes, seconds };
    },()=> {
      if(this.state.meetingStarted && this.state.minutes == 0 && this.state.seconds == 30){
        Alert.alert(i18n.t("challenge_ending_30s"));
      }
    });
  }, 1000);
}


handleGetOverallLiveDataResponse = (responseData:any) =>{

  let team1:any = [];
  let team2:any = [];
  let team1Users = responseData?.data?.team1_participants_data?.data ?? [];
  let team2Users = responseData?.data?.team2_participants_data?.data ?? [];

  team1Users.forEach((userVal:any)=> {
    team1.push({id:userVal.id,name:userVal.attributes.full_name,photo:userVal.attributes.photo ?? ''})
  })

  team2Users.forEach((userVal:any)=> {
    team2.push({id:userVal.id,name:userVal.attributes.full_name,photo:userVal.attributes.photo ?? ''})
  })

  let combinedTeam = [...team1,...team2];
  if(this.state.meetingStarted && !this.getIfUserInviteValid(combinedTeam.length)){
    this.setState({isMeetingClosed:true})
    return
  }

  this.setState({
      team1: team1,
      team2: team2,
      scoreTeam1: responseData?.data?.team1_overall_score ?? 0,
      scoreTeam2: responseData?.data?.team2_overall_score ?? 0,
      team1_scores: responseData?.data?.team1_score ?? 0,
      team2_scores: responseData?.data?.team2_score ?? 0,
      participantsData: combinedTeam,
      statusId: parseInt(responseData?.data?.challenge_type ?? "1"),
      duration: responseData?.data?.duration ?? 5
    },()=>{
      if((this.state.statusId * 2) == this.state.participantsData.length && !this.state.meetingStarted){
        if(this.props.route.params?.isChallengeCreated ?? false){
        this.setState({minutes:this.state.duration,seconds:0,isTimerStarted:true,meetingStarted:true})
      }
       else {
          setTimeout(()=> {
            this.setState({timeReset:true,meetingStarted:true,isNewParticipantJoined:false})
          },4000)
      }
      }
    });
}


handleExchangeCoinResponse = (responseJson:any) => {
           this.setState({
            team1_scores: responseJson?.live_challenge_data?.team1_score == null ? 0 : responseJson?.live_challenge_data?.team1_score,
            team2_scores: responseJson?.live_challenge_data?.team2_score == null ? 0 : responseJson?.live_challenge_data?.team2_score,
          },()=>{
            this.getTeamType(this.state.selectedId);
          });

          setTimeout(() => {
            this.setState({
              stickerURL:"",
            })
          }, 3000);

}

setAllViewersCount = (count:number) => {
this.setState({totalpeoplewatching:count})
}

startRecordingFunction = async (meetingId: string) => {
const token = (await getStorageData("authToken", false)) || "";
const requestMessage = new Message(
  getName(MessageEnum.RestAPIRequestMessage),
);

this.startRecordingCallId = requestMessage.messageId;

const headers = {
  "Content-Type": configJSON.apiContentType,
  "token": token,
};

const body = JSON.stringify({
  roomId: meetingId,
});

createRequestMessage({
  requestMessage: requestMessage,
  endPoint: configJSON.Start_Recording_EndPoint,
  method: configJSON.postApiMethod,
  header: headers,
  body: body,
});
};

stopRecordingFunction = async (meetingId: string) => {
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage),
  );

  const token = (await getStorageData("authToken", false)) || "";

  this.stopRecordingCallId = requestMessage.messageId;

  const headers = {
    "Content-Type": configJSON.apiContentType,
    "token": token,
  };

  const body = JSON.stringify({
    roomId: meetingId,
  });

  createRequestMessage({
    requestMessage: requestMessage,
    endPoint: configJSON.Stop_Recording_EndPoint,
    method: configJSON.postApiMethod,
    header: headers,
    body: body,
  });
};

 endChallenge= async ()=>{
  this.setState({
    participantModel: false,
    gitfmodel: false,
  })
  const token = (await getStorageData("authToken", false)) || "";
  const liveChallengeID = this.props.route.params.liveChallengeId;
  this.setState({ apiLoader: true });
  const apiEndPoint =`/bx_block_cflivechallenges/end_challenge`;

  const header = {
    "Content-Type": configJSON.exampleApiContentType,
    token
  };
  const body = JSON.stringify({
    "live_challenge_id":liveChallengeID
  });
  this.apiCall({
    setApiCallId:"endChallengeCallId",
    header,
     method: configJSON.postMethod,
    endPoint:`${apiEndPoint}`,
    body: body
  });
   };

  gotoNextTab = (id: any) => {
    this.setState({ selectedTab: id, indexss: null , catalogue:[] });
    this.getCatalogue(id);
  };
  selectCatalogue = (item: any) => {

    this.setState({ selectedCatalogue: item });
  };
  openGiftModal = () => {
    this.getCategories();
    this.getCoinBalance();
    this.setState(
      {
        gitfmodel: !this.state.gitfmodel,
        selectedTab: this.state.catalogueIndex?.attributes?.id
      }
    );
  };
  closeModal = () => {

    this.setState({
      gitfmodel: false,
      indexss: 0,
      catalogueIndex: [],
      categories: [],
      catalogue: []
    });
  };

  goToRecharge = () => {
    this.setState({ gitfmodel: false });
    this.props.navigation.navigate("Balance",{isFromLiveChallenge:true});
  };
  getCategories = async () => {
    const token = (await getStorageData("authToken", false)) || "";

    this.setState({ apiLoader: true });
    const apiEndPoint = `bx_block_categories/categories/`;

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };

    this.apiCall({
      setApiCallId: "categoriesApiCallId",
      header,
      method: configJSON.getMethod,
      endPoint: `${apiEndPoint}`,
      body: null
    });
  };
  fetchSession = async(meetingId: string) => {
    const token = (await getStorageData("authToken", false)) || "";

    // const requestMessage = new Message(
    //   getName(MessageEnum.RestAPIRequestMessage),
    // );

    // this.fetchSessionCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    const body = JSON.stringify({
      roomId: meetingId,
    });

    this.apiCall({
      setApiCallId: "fetchSessionCallId",
      endPoint: configJSON.fetch_Session_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };
  getliveDetails = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    const liveChallengeID = this.props.route.params.liveChallengeId;
    this.setState({ apiLoader: true });
    const apiEndPoint = `/bx_block_cflivechallenges/live_challenge_viewers`;

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };
    const body = {
      live_challenge_id: liveChallengeID
    };

    this.apiCall({
      setApiCallId: "livedetailApiCallId",
      header,
      method: configJSON.postMethod,
      endPoint: `${apiEndPoint}`,
      body: JSON.stringify(body)
    });
  };
  getoveralllive = async () => {
    const liveChallengeID = this.props.route.params.liveChallengeId;

    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ apiLoader: true });
    const apiEndPoint = `/bx_block_cflivechallenges/overall_live_scores?id=${liveChallengeID}`;

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };

    this.apiCall({
      setApiCallId: "overallliveApiCallId",
      header,
      method: configJSON.getMethod,
      endPoint: `${apiEndPoint}`,
      body: null
    });
  };

  getTeamType = (userId:any) => {
    let team = '';

    this.state.team1.map((value:any)=> {
     if(value.id == userId){
      team = 'team1'
     }
    })

    this.state.team2.map((value:any)=> {
      if(value.id == userId){
       team = 'team2'
      }
     })

     this.setState({donatedTeam:team , coinsSent:true })
  }

  sendCoin = async () => {

    if (!this.state.selectedCatalogue?.attributes?.coins) {
      this.setState({alertModal:{openAlertModal: true, alertMsg:"select gift"}})

      return;
    }

    if (
      this.state.selectedCatalogue.attributes.coins > this.state.coins_count
    ) {
      this.setState({alertModal:{openAlertModal: true, alertMsg:"Insufficient balance"}})

      return;
    }

    this.setState({ gitfmodel: false , donatedCoin: this.state.selectedCatalogue.attributes.coins,
    stickerURL:this.state.selectedCatalogue.attributes?.image?.url
    });
    const token = (await getStorageData("authToken", false)) || "";
    const liveChallengeID = this.props.route.params.liveChallengeId;
    this.setState({ apiLoader: true });
    const apiEndPoint = `/bx_block_cflivechallenges/live_challenge_coin_donations`;

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };

    let body = {
      live_challenge_id:liveChallengeID,
      donated_to:this.state.scoreUserDetails.userId,
      catalogue_id:this.state.selectedCatalogue.id
    };

    console.log(body);

    this.apiCall({
      setApiCallId: "updatescoreApiCallId",
      header,
      method: configJSON.postMethod,
      endPoint: `${apiEndPoint}`,
      body: JSON.stringify(body)
    });
    return true;
  };
  async getAccountSettings() {
    const token = await getStorageData('authToken')
    const header = {
      "Content-Type": "application/json",
      "token": token
    };

    this.apiCall({
      setApiCallId: 'getAccountSettingsCallId',
      header,
      method: "GET",
      endPoint: "/bx_block_privacy_setting/current_user_account_privacy",
      body: null
    });
  }
  getLastGift = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    const liveChallengeID = this.props.route.params.liveChallengeId;

    this.setState({ apiLoader: true });
    const apiEndPoint = `bx_block_cflivechallenges/last_gifts_donation?live_challenge_id=${liveChallengeID}`;
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };
    this.apiCall({
      setApiCallId: "getLastGiftApiCallId",
      header,
      method: configJSON.getMethod,
      endPoint: `${apiEndPoint}`,
      body: null
    });
  }
  defaultCatalogue = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ apiLoader: true });
    const apiEndPoint = `bx_block_catalogue/get_default_catalogue`;
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };
    this.apiCall({
      setApiCallId: "defaultCatalogueApiCallId",
      header,
      method: configJSON.getMethod,
      endPoint: `${apiEndPoint}`,
      body: null
    });

  }
  loggeduserdetails = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ apiLoader: true });
    const apiEndPoint = `bx_block_cflivechallenges/get_logged_in_user_data`;
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };
    this.apiCall({
      setApiCallId: "loggeduserdetailsApiCallId",
      header,
      method: configJSON.getMethod,
      endPoint: `${apiEndPoint}`,
      body: null
    });

  }
  getCatalogue = async (id: any) => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ apiLoader: true , isCatalogueLoading:true });
    const apiEndPoint = `/catalogue/catalogues?category_id=${id}&page=1&per_page=12`;

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };

    this.apiCall({
      setApiCallId: "catalogueApiCallId",
      header,
      method: configJSON.getMethod,
      endPoint: `${apiEndPoint}`,
      body: null
    });
  };
  getComments = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    const liveChallengeID = this.props.route.params.liveChallengeId;

    this.setState({ apiLoader: true });
    const apiEndPoint = `/bx_block_cflivechallenges/get_all_comments?live_challenge_id=${liveChallengeID}`;

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };

    this.apiCall({
      setApiCallId: "getCommentsCallId",
      header,
      method: configJSON.getMethod,
      endPoint: `${apiEndPoint}`,
      body: null
    });
  };
  sendComments = async () => {
    let commentText = this.state.comments;
    commentText = commentText.trimStart();
    commentText = commentText.trimEnd();
    const liveChallengeID = this.props.route.params.liveChallengeId;

    this.setState({
      comments: commentText
    })
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ apiLoader: true });
    const apiEndPoint = `bx_block_cflivechallenges/live_comments`;

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };
    const body = {
      "live_challenge_id": liveChallengeID,
      "comment": this.state.comments
    }
    this.apiCall({
      setApiCallId: "sendCommentsApiCallId",
      header,
      method: configJSON.postMethod,
      endPoint: `${apiEndPoint}`,
      body: JSON.stringify(body)
    });
    this.setState({
      comments: ""
    })
  };
  deleteComments = async (id: any) => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ apiLoader: true });
    const apiEndPoint = `/bx_block_cflivechallenges/live_comments/${id}`;

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };

    this.apiCall({
      setApiCallId: "deleteCommentsCallId",
      header,
      method: configJSON.deleteMethod,
      endPoint: `${apiEndPoint}`,
      body: null
    });
  };
  getCoinBalance = async () => {
    const token = await getStorageData("authToken", false) || "";

    const header = {
      "Content-Type": "application/json",
      "token": token
    };
    this.apiCall({
      setApiCallId: 'getCoinBalance',
      header,
      method: configJSON.validationApiMethodType,
      endPoint: `/bx_block_cfappcoinsmanagement/your_balance`,
      body: null
    });
  }
  endLivewatching = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ apiLoader: true });
    const apiEndPoint = `bx_block_cflivechallenges/stop_viewing_live`;
    const liveChallengeID = this.props.route.params.liveChallengeId;

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };
    const body = {
      "live_challenge_id": liveChallengeID
    }
    this.apiCall({
      setApiCallId: "endLivewatchingApiCallId",
      header,
      method: configJSON.postMethod,
      endPoint: `${apiEndPoint}`,
      body: JSON.stringify(body)
    });
    this.setState({
      comments: ""
    })
  };
  apiCall = async (data: any) => {
    const { setApiCallId, header, endPoint, method, body } = data;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    switch (setApiCallId) {
      case "categoriesApiCallId": {
        this.categoriesApiCallId = requestMessage.messageId;
        // } else if (setApiCallId === "catalogueApiCallId") {
        //   this.catalogueApiCallId = requestMessage.messageId;
        break;
      }
      case "catalogueApiCallId": {
        this.catalogueApiCallId = requestMessage.messageId;
        break;
      }
      case "livedetailApiCallId": {
        this.livedetailApiCallId = requestMessage.messageId;
        break;
      }
      case "updatescoreApiCallId": {
        this.updatescoreApiCallId = requestMessage.messageId;
        break;
      }
      case "overallliveApiCallId": {
        this.overallliveApiCallId = requestMessage.messageId;
        break;
      }
      case "getCoinBalance": {
        this.getCoinBalanceApiCallId = requestMessage.messageId;
        break;
      }
      //  case "sendCommentsApiCallId" : {
      //   this.sendCommentsApiCallId = requestMessage.messageId;
      //break;
      // }
      case "getCommentsCallId": {
        this.getCommentsCallId = requestMessage.messageId;
        break;
      }
      case "deleteCommentsCallId": {
        this.deleteCommentsCallId = requestMessage.messageId;
        break;
      }
      case "endLivewatchingApiCallId": {
        this.endLivewatchingApiCallId = requestMessage.messageId;
        break;
      }
      case "deactivateLiveChallengeID": {
        this.deactivateLiveChallengeID = requestMessage.messageId;
        break;
      }
      case "getLastGiftApiCallId": {
        this.getLastGiftApiCallId = requestMessage.messageId;
        break;
      }
      case "defaultCatalogueApiCallId": {
        this.defaultCatalogueApiCallId = requestMessage.messageId;
        break;
      }
      case "loggeduserdetailsApiCallId": {
        this.loggeduserdetailsApiCallId = requestMessage.messageId;
        break;
      }
      case "searchParticipantToInviteID": {
        this.searchParticipantToInviteID = requestMessage.messageId;
        break;
      }
      case "inviteParticipantLiveChallengeID": {
        this.inviteParticipantLiveChallengeID = requestMessage.messageId;
        break;
      }
      case "startHLSStreamCallId": {
        this.startHLSStreamCallId = requestMessage.messageId;
        break;
      }
      case "stopHLSStreamCallId": {
        this.stopHLSStreamCallId = requestMessage.messageId;
        break;
      }
      case "activeHLSStreamCallId": {
        this.activeHLSStreamCallId = requestMessage.messageId;
        break;
      }
      case "stopRtmpStreamCallId": {
        this.stopRtmpStreamCallId = requestMessage.messageId;
        break;
      }
      case "statusjoinCallId": {
        this.statusjoinCallId = requestMessage.messageId;
        break;
      }
      case "statusleaveCallId": {
        this.statusleaveCallId = requestMessage.messageId;
      break;
      }
      case "startRtmpStreamCallId": {
        this.startRtmpStreamCallId = requestMessage.messageId;
      break;
      }
      case "stopRtmpStreamCallId": {
        this.stopRtmpStreamCallId = requestMessage.messageId;
      break;
      }
      case "endChallengeCallId": {
        this.endChallengeCallId = requestMessage.messageId;
      break;
      }

      case "createMeeting_CallID": {
        this.createMeeting_CallID = requestMessage.messageId;
      break;
      }
      case "createLiveChallengeID": {
        this.createLiveChallengeID = requestMessage.messageId;
      break;
      }
      case "validateMeeting_CallID": {
        this.validateMeeting_CallID = requestMessage.messageId;
      break;
      }
      case "fetchSessionCallId": {
        this.fetchSessionCallId = requestMessage.messageId;
        break;
      }
      case "getAccountSettingsCallId": {
        this.getAccountSettingsCallId = requestMessage.messageId;
        break;
      }
    }
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      // JSON.stringify(header)
      header
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
  handleErrorResponse = async (
    responseJson: any,
    parseError: boolean = true
  ) => {
    if (
      responseJson.errors &&
      responseJson.errors.hasOwnProperty("token") &&
      responseJson.errors.token
    ) {
      return;
    }
    //Check Error Response
    // parseError && console.log("parseError==>", parseError);
  };
  onPress = () => {
    this.setState({ gitfmodel: false })
    this.props.navigation.navigate("liveChallengeSolo")
  }

  //get account id on  response of this api
  searchParticipantToInvite = async ({ searchText }: { searchText: string }) => {
    const token = (await getStorageData("authToken", false)) || "";

    this.setState({ apiLoader: true });
    const apiEndPoint = `/bx_block_elasticsearch/account_search?page=1&per_page=100&q=${searchText}`
    const header = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    this.apiCall({
      setApiCallId: "searchParticipantToInviteID",
      header,
      method: configJSON.getApiMethodType,
      endPoint: apiEndPoint,
      body: null,
    });
  };

  inviteParticipantToLiveChallenge = async (userId: any) => {

    const token = (await getStorageData("authToken", false)) || "";
    const liveChallengeID = this.props.route.params.liveChallengeId;
    this.setState({ apiLoader: true });
    const apiEndPoint = `/bx_block_cflivechallenges/create_invite`;

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };
    const body = {
      account_id: userId,
      live_challenge_id: liveChallengeID
    };

    this.apiCall({
      setApiCallId: "inviteParticipantLiveChallengeID",
      header,
      method: configJSON.postMethod,
      endPoint: `${apiEndPoint}`,
      body: JSON.stringify(body)
    });
  };
  stopLiveStreamFunction = async(meetingId: string) => {
    const token = (await getStorageData("authToken", false)) || "";

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.stopRtmpStreamCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    const body = JSON.stringify({
      roomId: meetingId,
    });

    this.apiCall({
      setApiCallId: "stopRtmpStreamCallId",
      endPoint: configJSON.Stop_LiveStream_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };

  hlsStartLiveStream = async(meetingId: string) => {
    // alert(configJSON.Start_HLStream_EndPoint)
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
      gridSize: 6,
      theme: "DARK",
      is_live_stream_meet: false,
    });

    this.apiCall({
      setApiCallId: "startHLSStreamCallId",
      header:headers,
      method: configJSON.postMethod,
      endPoint: configJSON.Start_HLStream_EndPoint,
      body: body,
    });
  };

  hlsStopLiveStream = async(meetingId: string) => {
    const token = (await getStorageData("authToken", false)) || "";

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.stopHLSStreamCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    const body = JSON.stringify({
      roomId: meetingId,
    });

    this.apiCall({
      setApiCallId: "stopHLSStreamCallId",
      header:headers,
      method: configJSON.postMethod,
      endPoint: configJSON.Stop_HLStream_EndPoint,
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



    this.apiCall({
      setApiCallId: "startRtmpStreamCallId",
      endPoint: configJSON.Start_LiveStream_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };
  hlsActiveLiveStream = async(props: ActiveMeetingStream) => {
    const token = (await getStorageData("authToken", false)) || "";

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.setDownStreamURL = props.setDownStreamURL;
    this.activeHLSStreamCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    const body = JSON.stringify({
      roomId: props.roomId,
    });

    this.apiCall({
      setApiCallId: "activeHLSStreamCallId",
      endPoint: configJSON.Active_HLStream_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };
  removeParticipants = (roomId:any) => {

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.removeParticipants_CallID = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };
    const body = {
      roomId: roomId,
    };
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON. removeParticipants_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: JSON.stringify(body),
    });
  };

  deactivateStream= ()=>{
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.deactivateStreamCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const body = JSON.stringify({
      roomId: this.props.route?.params.meetingId,
    });
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Deactivate_LiveStream_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  }
  navigateToLivePage = () => {
    clearInterval(this.timer)
    this.setState({gitfmodel:false,invitationModel:false,isMeetingClosed:false,participantModel:false},()=>{
      this.hlsStopLiveStream(this.props.route?.params?.meetingId);
      this.removeParticipants(this.props.route?.params?.meetingId);
      this.deactivateStream()
      this.endLivewatching();
      if(this.state.isExploreClicked){
        this.props.navigation.reset({
          index: 0,
          routes: [
            {name: 'Live'},
          ],
        });
      } else {
      this.props.navigation.reset({
        index: 0,
        routes: [
          {name: 'Home'},
        ],
      });
    }
    })
  };
  navigateToLivePageparticipants = () => {
    clearInterval(this.timer)
    this.setState({gitfmodel:false,invitationModel:false,participantModel:false},()=>{
    if(this.state.isExploreClicked){
      this.props.navigation.reset({
        index: 0,
        routes: [
          {name: 'Live'},
        ],
      });
    } else {
  this.props.navigation.reset({
    index: 0,
    routes: [
      {name: 'Home'},
    ],
  });
}
})
  }
  statusjoin = async () => {
    //alert(this.props.route?.params?.meetingId)
    const token = (await getStorageData("authToken", false)) || "";

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.statusjoinCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    const body = JSON.stringify({
      roomId: this.props.route?.params?.meetingId,
    });

    this.apiCall({
      setApiCallId: "statusjoinCallId",
      endPoint: configJSON.statusjoinendpoint,
      method: configJSON.putApiMethodType,
      header: headers,
      body: body,
    });
  }
  statusleave = async() => {
    const token = (await getStorageData("authToken", false)) || "";

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.statusleaveCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    const body = JSON.stringify({
      roomId: this.props.route?.params?.meetingId,
    });

    this.apiCall({
      setApiCallId: "statusleaveCallId",
      endPoint: configJSON.statusleaveendpoint,
      method: configJSON.putApiMethodType,
      header: headers,
      body: body,
    });
  }
  createMeeting = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({
      micOn:true,
      videoOn: true,
    });
    const header = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };
    const body = "";

    this.apiCall({
      setApiCallId: "createMeeting_CallID",
      endPoint: configJSON.Create_Meeting_EndPoint,
      method: configJSON.postApiMethod,
      header:header,
      body:null,
    });

  };

  createLiveChallenge = async () => {
    const duration=this.props.route.params.duration
    const statusId=this.props.route.params.statusId
    const token = (await getStorageData("authToken", false)) || "";
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.createLiveChallengeID = requestMessage.messageId;
    const header = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };
    const body = {
      challenge_type:statusId,
      mode: "CONFERENCE",
      status: "active",
      duration: duration,
      livestream_id: this.state.livestreamId,
      videosdk_token: this?.props?.route?.params?.token
    };

    this.apiCall({
      setApiCallId: "createLiveChallengeID",
      endPoint: configJSON.createLiveChallenge_Endpoint,
      method: configJSON.postApiMethod,
      header:header,
      body:JSON.stringify(body),
    });

  };
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

     this.setState({ 
        name: this.state.name.trim(),
        // token: this.props.route.params.meetingToken,
        roomId: this.state.roomId.trim(),
        micOn: false,
        webcamOn: false ,
        meetingType: meetingTypes[0].key,
        modeTypes: ParticipantMode.VIEWER,
        // modeTypes: ParticipantMode.CONFERENCE,
      });
    }else{
    this.setState({
      name: this.state.name.trim(),
      // token: this.props.route.params.meetingToken,
      roomId: this.state.roomId.trim(),
      micOn: true,
      webcamOn: true ,
      meetingType: meetingTypes[0].key,
      modeTypes: ParticipantMode.CONFERENCE,
    });
    }
  }};

  onSuccessCreateMeeting = async (response: {
    data: { data: { attributes: { roomId: string },id:any } };
  }) => {

   let eventId:any=null;
  if(this.props?.route?.params?.EventId){
    eventId=this.props?.route?.params?.EventId;
  }
    this.setState({ roomId: response.data.data.attributes.roomId ,
      livestreamId: response.data.data.id,
      loader:false}, () => {
       this.createLiveChallenge();
       this.hlsStartLiveStream(this.state.roomId)
    });


  };

  validateMeeting = async(props:{name: string;
    micOn: boolean;
    videoOn: boolean;
    meetingId: string;}) => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({
      micOn: true,
      videoOn: true,
      name: this.state.name,
      roomId: props.meetingId,
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.validateMeeting_CallID = requestMessage.messageId;
    const header = {
      "Content-Type": configJSON.apiContentType,
      "token":token,
    };
    const body = {
      roomId: this.props.route.params?.meetingId
    };
    this.apiCall({
      setApiCallId: "validateMeeting_CallID",
      endPoint: configJSON.Validate_Meeting_EndPoint,
      method: configJSON.postApiMethod,
      header:header,
      body:JSON.stringify(body),
    });
  };

  endLiveChallenge = async () => {
    const liveChallengeID = this.props.route.params.liveChallengeId;

    const token = (await getStorageData("authToken", false)) || "";

    const header = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };
    const body = {
      live_challenge_id: liveChallengeID
   }

    this.apiCall({
      setApiCallId: "deactivateLiveChallengeID",
      endPoint: configJSON.deactivateLiveChallenge_Endpoint,
      method: configJSON.postApiMethod,
      header:header,
      body:JSON.stringify(body),
    });

  };

  setLottieAnimation = (show: boolean, url: string, audioUrl: string, json:string, positionLeft: number, positionTop: number) => {
    // checking if an animation is already playing
    if (this.state.lottieAnimation.show) {
      // if already playing, then add to queue
      this.animationQueue = [...this.animationQueue, {show, url, audioUrl, json, positionLeft, positionTop}]
    } else {
      // if no animation is playing, then play incoming animation
      this.playLottieAnimation(show, url, audioUrl, json, positionLeft, positionTop);
    }
  };

  giftCommentsAction = () => {
      this.setState({ selectedCatalogue: this.state.defaultCatalogue },() => {
                    if (!this.state.scoreUserDetails.userId && this.state.selectedCatalogue.attributes.coins) {
                      this.setState({gitfmodel:false,participantModel:true})
                    }
                  });
  }

  onCoinsSent = () => {
    this.setState({coinsSent:false,donatedCoin:0,donatedTeam:""})
  }

  setNewTime = (min:any,sec:any)=> {
    this.setState({minutes:min,seconds:sec,timeReset:false},()=>{
       this.setTimer();
 })}

  onCoinsExchanges = (coins:any,team:any)=> {
    if(team == "team1"){
    this.setState({scoreTeam1:this.state.scoreTeam1+parseInt(coins)})
    } else if(team == "team2") {
    this.setState({scoreTeam2:this.state.scoreTeam2+parseInt(coins)})
    }}

    closeInvitationModal = () => {
      this.setState({
        invitationModel: false,
      })
    }

    onNewParticipantJoined = () => {
      this.setState({isNewParticipantJoined:true},()=>{
        this.getoveralllive()
      })
    }

  playLottieAnimation = (show: boolean, url: string, audioUrl: string, json: string, positionLeft: number, positionTop: number) => {
    SoundPlayer.loadUrl(audioUrl);
    SoundPlayer.onFinishedLoading(() => {
      try {
        SoundPlayer.resume();
      } catch (e) {
        console.log(`cannot play the sound file`, e)
      }
      // render received animation
      this.setState({
        lottieAnimation: {
          show: show,
          url: url,
          audioUrl: audioUrl,
          json:json,
          positionLeft: typeof positionLeft === 'number' ? positionLeft : 0,
          positionTop: typeof positionTop === 'number' ? positionTop: 0,
        }
      }, () => {
        // wait for animation to finish
        setTimeout(() => {
          // if queue is empty, clear the playing animation
          if (this.animationQueue.length < 1) {
            this.setState({
              lottieAnimation: {
                show: false,
                url: "",
                audioUrl: "",
                json:"",
                positionLeft: 0,
                positionTop: 0,
              }
            })
            SoundPlayer.stop();
          } else {
            // if queue is not empty
            // get first value from animationQueue and remove it from the array
            const animation = this.animationQueue.shift();
            if (animation && animation.show) {
              // play the animation
              this.playLottieAnimation(animation.show, animation.url, animation.audioUrl, animation.json, animation.positionLeft, animation.positionTop);
            }
          }
        }, 6000);
      })
    })
  }
  // Customizable Area End
}
