import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
//@ts-ignore
import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;

  // Customizable Area Start
  scheduleLiveEventApiCallId: any;
  getEventListApiCallId: any;
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;

  // Customizable Area Start
  isVisible: boolean;
  isFromEdit:boolean;
  modalVisible: boolean;
  textLength: number;
  textLenght2: number;
  maxLength: number;
  selectedStartDate: any;
  colorId: any;
  amPmColorId: any;
  liveEventTopic: string;
  liveEventDesc: string;
  startDate: string;
  token: string;
  userDetails: any;
  eventList: Array<object>;
  warnTopic: string;
  warnTopicDes: string;
  warnDate: string;
  warnTime: string;
  selectTimeHour:string
  selectTimeMinutes: string
  selectedDurationHour: string
  selectedDurationMinutes:string
  selectDurationHour:string
  selectDurationMinutes: string
  warnDurationTime:string
  timePicker:boolean
  durationTimePicker:boolean,
  time:any
  durationTime:any,
  durtionData:any,
  currentDeleteData:any,
  currentEventEdit :any,
  selectTimeHr: any,
  selectTimeMin: any,
  selectDurationHr: any,
  selectDurationMin: any,
  now: any
  isModalVisible: boolean;
  selectedEvent: any;
  language:any;
  flag:boolean;
  recordList:any;
  playpause:any;
  page:number;
  recordingLoading:boolean;
  onVideoLaod:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class LiveRecordingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  scheduleLiveEventApiCallId: any;
  getEventListApiCallId: any;
  deleteEventListApiCallId:any;
  editEventListApiCallId:any;
  geteventEndlistApiCallId:any;
  getrecordinglistApiCallId:any;
  // Customizable Area End

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    const userId = await getStorageData("authTokenId");
    const language = await getStorageData("SelectedLng"); 
    this.setState({ userDetails: userId,language:language });
    setInterval(()=>{
      this.setState({now: new Date().getTime()})
      // console.log('Interval')
    },1000)
  }

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,

      // Customizable Area Start
      playpause:-1,
      isVisible: false,
      isFromEdit:false,
      modalVisible: false,
      textLength: 0,
      textLenght2: 0,
      maxLength: 32,
      selectedStartDate: new Date(),
      colorId: 0,
      amPmColorId: 1,
      liveEventTopic: "",
      liveEventDesc: "",
      startDate: "",
      token: "",
      userDetails: 251,
      eventList: [],
      recordList:[],
      warnTopic: "",
      warnTopicDes: "",
      warnDate: "",
      warnTime: "",
      warnDurationTime:'',
      selectTimeHour:'',
      selectTimeMinutes:'',
      selectedDurationHour:'',
      selectedDurationMinutes:'',
      selectDurationHour:'',
      selectDurationMinutes:"",
      timePicker:false,
      durationTimePicker:false,
      time:new Date(),
      durationTime:new Date(),
      durtionData:{
        hh:'00',
        mm:'00'
      },
     currentDeleteData:{}, 
     currentEventEdit :{},
     selectTimeHr: (new Date().getHours() % 12).toString(),
     selectTimeMin: new Date().getMinutes().toString(),
     selectDurationHr: '',
     selectDurationMin: '',
     now: new Date().getTime(),
     isModalVisible: false,
     selectedEvent: null,
     language:"",
     flag:false,
     page:0,
     recordingLoading:false,
     onVideoLaod:false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) { 
      console.log("/");
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      runEngine.debugLog("API Message Recived", message);
      
      if (apiRequestCallId === this.getrecordinglistApiCallId) {
        if (responseJson != null) {
          if (!responseJson.errors) {
            this.recordingResponseSuccess(responseJson)
          } else {
             console.log(responseJson, ">>>>>>>>>>>>>>>");
          }
        }
        this.parseApiCatchErrorResponse(errorReponse);
      }
     
      
    }

    // Customizable Area Start
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
  onPressCloseModel = () => {
    this.setState({ isVisible: false });
    this.setState({
      currentEventEdit:{},
      textLength: 0,
      textLenght2: 0,
      maxLength: 32,
      selectedStartDate: new Date(),
      colorId: 0,
      amPmColorId: 1,
      liveEventTopic: "",
      liveEventDesc: "",
      startDate: "",
      selectTimeHour:'',
      selectTimeMinutes:'',
      selectedDurationHour:'',
      selectedDurationMinutes:'',
      selectDurationHour:'',
      selectDurationMinutes:"",
      timePicker:false,
      durationTimePicker:false,
      time: new Date(),
      durationTime:new Date(),
      durtionData:{
        hh:'00',
        mm:'00'
      },
      selectTimeHr: (new Date().getHours() % 12).toString(),
      selectTimeMin: new Date().getMinutes().toString(),
      selectDurationHr: '',
      selectDurationMin: '',
    })
  };
  onPressEditEvent = () => {
    this.setState({isVisible: true, })
   
  }
  onPressOpenModel = () => {
    this.setState({ isVisible: true });

  };
  onPressCalendarOpenModel = () => {
    this.setState({ modalVisible: true });
  };

  async getToken() {
    const token = await getStorageData("authToken", false);
    console.log("token:>>>>", token);
    
    this.setState({
      token: token,
      page:0
    });
    this.getrecordinglist(token , 1);
  }

  // Customizable Area Start
 
  getrecordinglist= (token: string, page:number) => {
    this.setState({ recordingLoading: true })
    const header = {
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getrecordinglistApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.recordedEndpoint}?page_no=${page}&per_page=10`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  onEndReachedLsit = () => {   
    this.getrecordinglist(this.state.token , this.state.page + 1)
  }

  onrefreshRecordList = () => {
    this.setState({
      recordingLoading: true,
      page:0,
      recordList:[]
    }, () => this.getrecordinglist(this.state.token  , 1))
  }

  recordingResponseSuccess = (responseJson:any) => {
    let newData = responseJson && responseJson.data ? responseJson.data : [];
    this.setState({
      recordingLoading: false
    })
    if (responseJson.pagination.current_page - 1 === this.state.page && responseJson.pagination.current_page <= responseJson.pagination.total_pages) {
      this.setState({ recordList: [...this.state.recordList, ...newData], page: this.state.page + 1 })
    }
  }
  // Customizable Area End
}
