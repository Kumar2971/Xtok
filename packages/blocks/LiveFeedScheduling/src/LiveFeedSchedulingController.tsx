import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
//@ts-ignore
import _ from 'lodash'
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import moment from "moment";
import { customAlert, getStorageData } from "../../../framework/src/Utilities";
import { translate } from "../../../components/src/i18n/translate";

export interface EventListItem {
  id: string;
  type: string;
  attributes: {
    event_name: string;
    description: string;
    duration: string;
    start_date: string;
    start_time: string;
  }
}
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
  eventList: Array<EventListItem>;
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
  endeventList:any;
  alertModal:any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class LiveFeedSchedulingController extends BlockComponent<
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
      endeventList:[],
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
     alertModal:{
      openAlertModal: false,
      alertMsg: "",
    }
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
      if (apiRequestCallId === this.scheduleLiveEventApiCallId) {
        this.scheduleLiveEventApiCall(responseJson,errorReponse);
      }
      if (apiRequestCallId === this.getEventListApiCallId) {
        this.getEventListApiCall(responseJson,errorReponse)
      }
      if (apiRequestCallId === this.geteventEndlistApiCallId) {
        if (responseJson != null) {
          if (!responseJson.errors) {
            this.setState({ endeventList: responseJson.data });
          } else {
             console.log(responseJson, ">>>>>>>>>>>>>>>");
          }
        }
        this.parseApiCatchErrorResponse(errorReponse);
      }
      if (apiRequestCallId === this.deleteEventListApiCallId) {
        this.deleteEventApiCall(responseJson,errorReponse)
      }
      if (apiRequestCallId === this.editEventListApiCallId) {
        this.editEventApiCall(responseJson,errorReponse)
      }
      
    }

    // Customizable Area Start
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

  onChangeTextTopicTitle(text: string) {
    this.setState({
      textLength: text.toString().length,
      liveEventTopic: text,
      warnTopic: "",
    });
  }
  onChangeTextTopicDescTitle(text2: string) {
    this.setState({
      textLenght2: text2.toString().length,
      liveEventDesc: text2,
      warnTopicDes: "",
    });
  }
  onDateChange(date: any) {
    this.setState({
      selectedStartDate: date,
      modalVisible: false,
      warnDate: "",
    });
    console.log(this.state.selectedStartDate);
  }
  onPressColor = (id: any) => {
    this.setState({ colorId: id,  });
  };

  onPressAmPmColor = (id: any) => {
   this.setState({  amPmColorId: id , warnTime:'' });
  };

  onChangeTimeHour = (text:string) => {
    this.setState({selectTimeHour : text,warnTime: ""})
  }
  onChangeTimeMinutes = (text:string) => {
    this.setState({selectTimeMinutes : text,warnTime: ""})
  }
  onChangeDurationHour = (text:string) => {
    this.setState({selectDurationHour : text, warnDurationTime:''})
  }
  onChangeDuretionMinutes = (text:string) => {
    this.setState({selectDurationMinutes : text, warnDurationTime:''})
  }
  showTimePicker() {
   this.setState({timePicker: true});
  }
  showDurationTimePicker(){
    this.setState({durationTimePicker:true})
  }

  onDuration(event:string, value2: string) {
    this.setState({durationTime:value2})
    this.setState({durationTimePicker: false});
  }

  async getToken() {
    const token = await getStorageData("authToken", false);
    console.log("token:>>>>", token);
    this.getEventList(token);
    this.geteventEndlist(token);
    this.setState({
      token: token,
    });
  }

  // Customizable Area Start
  changeStateOnEdit = (item:EventListItem)=> {
    this.setState({
      isVisible: true,
      isFromEdit: true,
      currentEventEdit: item,
      liveEventTopic: item.attributes.event_name,
      liveEventDesc: item.attributes.description,
      startDate : item.attributes.start_date,
      selectedStartDate:item.attributes.start_date,
      time : item.attributes.start_time ?? '',
      durationTime : item.attributes.duration ?? '',
    })
  }

  scheduleLIveEmptyFunc = (requestMessage:any) => {
    if(!_.isEmpty(this.state.currentEventEdit)){
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `${configJSON.scheduleLiveEventEndPoint}?id=${this.state.currentEventEdit?.id  || ''}`
      );
    }else{
      
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `${configJSON.scheduleLiveEventEndPoint}`
      );
    }
  }

  currentEventEmptyFunc = (requestMessage:any) => {
    if(!_.isEmpty(this.state.currentEventEdit)){
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.examplePutAPiMethod
      );
    }else{
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.httpPostMethod
      );
    }
  }
  onPressScheduleLiveEvent = () => {
    if (this.state.liveEventTopic === "") {
      this.setState({ warnTopic: "please input topic" });
    } else if (this.state.liveEventDesc === "") {
      this.setState({ warnTopicDes: "please input description" });
    } else if (this.state.time === '' ){
      this.setState({warnTime:'please select time'})
    } else {

    const data = new FormData();
    let timeData = `${this.state.selectTimeHr || '00'}:${this.state.selectTimeMin || '00'} ${this.state.amPmColorId == 1 ? translate("AM"):translate("PM")}`
    const dateTime =  moment(this.state.selectedStartDate || '').format("D-MM-YYYY") + " " + timeData;
    const utc = moment(dateTime , "D-MM-YYYY hh:mma").utc()
    const selectedDateUTC = moment(dateTime , "D-MM-YYYY hh:mma").utc().format("D-MM-YYYY");
    let timeDatautc = `${utc.hours() || '00'}:${utc.minutes() || '00'}`


    let durationData = `${this.state.selectDurationHr || '00'}:${this.state.selectDurationMin || '00'}`
  
    data.append("event_name", this.state.liveEventTopic || '');
    data.append("description", this.state.liveEventDesc || '');
    data.append(
      "start_date",
      selectedDateUTC
    );
    data.append('start_time', timeDatautc);
    data.append('duration', durationData);
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.scheduleLiveEventApiCallId = requestMessage.messageId;

    const header = {
      "Content-Type": "multipart/form-data",
      token: this.state.token,
    };

    this.scheduleLIveEmptyFunc(requestMessage)

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      data
    );
    this.currentEventEmptyFunc(requestMessage);
  
    runEngine.sendMessage(requestMessage.id, requestMessage);

    this.setState({ isVisible: false });
    this.setState({
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
      time:new Date(),
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
    // }
  }
  };

  deleteEvent = (data: any) => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deleteEventListApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
     `${configJSON.eventlistDeleteEndpoint}?id=${data?.id || ''}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpDeleteMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getEventList = (token: string) => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getEventListApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.eventlistEndpoint
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

  scheduleLiveEventApiCall = async(responseJson:any ,errorReponse:any ) => {
    console.log("Response scheduleLiveEventApiCall===>",responseJson);
    
    if (responseJson != null) {
      if (!responseJson.errors) {
        if(_.isEmpty(this.state.currentEventEdit)){
          const token = await getStorageData("authToken", false);
          this.getEventList(token);
          this.geteventEndlist(token)
        }else{              
          this.setState({
            eventList: this.state.eventList?.map((data:any)=>{
              if(data?.id == responseJson?.data?.id){
                return {
                  ...responseJson?.data
                }
              }else{
                return {
                  ...data
                }
              }

            })
          })
        }
        this.setState({
          currentEventEdit:{}
        })

      } else {
        console.log(responseJson, ">>>>>>>>>>>>>>>");
      }
    }
     this.parseApiCatchErrorResponse(errorReponse);
  }
  getEventListApiCall = (responseJson:any , errorReponse:any) => {
    if (responseJson != null) {
      if (!responseJson.errors) {
        this.setState({ eventList: responseJson.data });
      } else {
         console.log(responseJson, ">>>>>>>>>>>>>>>");
      }
    }
    this.parseApiCatchErrorResponse(errorReponse);
  }
  deleteEventApiCall = (responseJson:any , errorReponse:any) => {
    if (responseJson != null) {
      if (!responseJson.errors) {
        this.setState({
          eventList: this.state.eventList.filter((i:any)=> i.id !=this.state.currentDeleteData.id),
          endeventList: this.state.endeventList.filter((i:any)=> i.id !=this.state.currentDeleteData.id)
        })
        this.setState({alertModal:{openAlertModal: true,alertMsg:translate('delete_sucess')}})
      } else {
         console.log(responseJson, ">>>>>>>>>>>>>>>");
      }
    }
    this.parseApiCatchErrorResponse(errorReponse);
  }
  editEventApiCall = (responseJson:any , errorReponse:any) => {
    if (responseJson != null) {
      if (!responseJson.errors) {
        this.setState({
          eventList:[...this.state.eventList,responseJson?.data] 
        })
      } else {
        console.log(responseJson, ">>>>>>>>>>>>>>>");
      }
    }
    this.parseApiCatchErrorResponse(errorReponse);
  }

  geteventEndlist= (token: string) => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.geteventEndlistApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
 requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.eventendlistEndpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  onTimeSelected(value: string | undefined) {     
  
    this.setState({timePicker: false, time: value ?? '',warnTime:'' })

  }
 
  // Customizable Area End
}
