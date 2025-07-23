import { Message } from "../../../framework/src/Message";
// Customizable Area Start
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
export const configJSON = require("./config");
import { getStorageData } from "../../../framework/src/Utilities";
import { RNToasty } from "react-native-toasty";
import {  BackHandler} from 'react-native'
// Customizable Area End
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  draftList: any[];
  draftLoading: boolean;
  isListAsc: boolean;
  accountId: any;
  draftId: number;
  video: string;
  mute: boolean;
  language: string;
  isLoading: boolean;
  caption: string;
  mainItem: any;
  showDeleteDialogue: boolean;
  pageNum: number;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
 }
export default class DraftController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getAccountDraftsId: any;
  getDeleteDraftsId: any;
  getUploadDraftsId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    this.state = {
      draftList: [],
      draftLoading: false,
      isListAsc: true,
      accountId: "",
      draftId: 0,
      video: '',
      mute: false,
      isLoading: false,
      caption: '',
      language:'',
      mainItem: null,
      showDeleteDialogue: false,
      pageNum: 1,
    };
    runEngine.attachBuildingBlock(this, this.subScribedMessages);
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    const data = this.props.route.params
    const video = data?.attributes?.post_medias?.videos?.[0]?.media_url;
    const id = data?.attributes?.id;
    const caption = data?.attributes?.name;
    const mute = false;

    const language = await getStorageData("SelectedLng");
    this.setState({language: language})

    this.setState({
      draftId: id,
      video: video,
      mute: mute,
      caption: caption,
      mainItem: data
    })
    super.componentDidMount();

    this.props.navigation.addListener("focus",async () => {
      const language = await getStorageData("SelectedLng");
      this.setState({ language: language });
    });
    this.props.navigation.addListener('blur', () => {
      this.setState({
        draftList: [],
        draftLoading: true,
        accountId: null,
      })
    })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  async componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  async receive(from: string, message: Message) {
    this.setState({isLoading:false})
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.getAccountDraftsId) {
          this.getAccountPostsSuccessCallback(responseJson);
        }
        if (apiRequestCallId === this.getDeleteDraftsId) {
          RNToasty.Show({ title: 'Draft deleted successfully', duration: 1 })
          this.props.navigation.goBack();
        }
        if (apiRequestCallId === this.getUploadDraftsId) {
          RNToasty.Show({ title: 'Post created successfully!', duration: 1 })
          this.props.navigation.goBack();
        }
      } else if (responseJson?.errors) {
        this.responseErrorFailure(apiRequestCallId , responseJson)
      }
    }
  }

  responseErrorFailure = (apiRequestCallId:any , responseJson:any) => {
    if (apiRequestCallId === this.getAccountDraftsId) {
      this.getAccountPostsFailureCallback(responseJson);
    }
    if (apiRequestCallId === this.getDeleteDraftsId) {
      RNToasty.Show({ title: 'Something went wrong!', duration: 1 })
      this.props.navigation.goBack();
    }
    if (apiRequestCallId === this.getUploadDraftsId) {
      RNToasty.Show({ title: 'Something went wrong!', duration: 1 })
      this.props.navigation.goBack();
    }
  }
  
  getAccountPostsSuccessCallback = (res: any) => {
    if(res.data[0]!=='No Posts Available'){
      let newDraftList = res?.data || [];
      if(newDraftList?.length > 0){
        this.setState((prevState)=>({draftList:[...prevState?.draftList,...newDraftList],draftLoading:false}))
      }else{
        this.setState({draftLoading:false})
      }
    }else{
      this.setState({
        draftLoading:false
      })
    }
  }
  getAccountPostsFailureCallback=(res:any)=>{
    this.setState({
      draftList:[],
      draftLoading:false
    })
  }

onDrafListEndReached = () => {
  let totalData = Number(this.state?.draftList?.length);
    if( totalData === this.state.pageNum * 5){
      this.setState({pageNum:this.state.pageNum+1},()=>{
        this.getAccountPosts(this.state.isListAsc);
      })
    }
}

  getAccountPosts=async(isListAsc: boolean)=>{
    this.setState({ draftLoading: true })

    let endPoint = configJSON.draftsListEndPoint + `?order=asc&page=${this.state.pageNum}&perPage=5`
    if (isListAsc) {
      endPoint = configJSON.draftsListEndPoint + `?order=desc&page=${this.state.pageNum}&perPage=5`
    }
    this.getAccountDraftsId=await this.apiCall({
      contentType:configJSON.contentTypeApiUpdateUser,
      method: configJSON.validationApiMethodType,
      endPoint: endPoint,
    })
  }

  deleteDraftById=async()=>{
    this.setState({isLoading:true})
    this.getDeleteDraftsId=await this.apiCall({
      contentType:configJSON.contentTypeApiUpdateUser,
      method: configJSON.draftsListDeleteMethodType,
      endPoint:configJSON.draftsListDeleteEndPoint + this.state.draftId,
    })
  }

  commentSettings = (itemData:any) => {
    if(itemData.comment_setting === 'Allow all comments'){
      return 0;
    }else if(itemData.comment_setting === 'Hold potentially inappropriate comments for review'){
      return 1;
    }else if(itemData.comment_setting === 'Hold all comments for review'){
      return 2;
    }else if(itemData.comment_setting === 'Disable comments'){
      return 3;
    }else{
      return 0;
    }
  }

  visibilitySetting = (itemData:any) => {
    if(itemData.visibility_setting === 'Public'){
      return 0;
    }else if(itemData.visibility_setting === 'Unlisted'){
      return 1;
    }else if(itemData.visibility_setting === 'Private'){
      return 2;
    }else{
      return 0;
    }
  }

  doUploadUpdatedData = async () => {
    this.setState({ isLoading: true })
    const itemData = this.props.route?.params.attributes;
    const dataMain = {
      "name": itemData.name,
      "description": itemData.description,
      "body": itemData.body,
      "location": itemData.location,
      "tag_list": itemData.tag_list,
      "save_post_as": 0,
      "audience_setting": itemData.audience_setting === 'No restrictions to viewers' ? 0 : 1,
      "comment_setting": this.commentSettings(itemData),
      "visibility_setting": this.visibilitySetting(itemData),
    }

    this.getUploadDraftsId=await this.apiCall({
      contentType:configJSON.contentTypeApiUpdateUser,
      method: configJSON.draftsListPutMethodType,
      endPoint:configJSON.draftsListUpdateEndPoint + itemData.id,
      body: dataMain,
    })
  }

  apiCall = async (data: any) => {
    const authToken = await getStorageData('authToken')
    const { contentType, method, endPoint, body, type} = data;
    const header = {
      "Content-Type": contentType,
      token: authToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
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
    body && type != 'formData' ?
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    )
    :
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      body
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };
  // Customizable Area End
}
