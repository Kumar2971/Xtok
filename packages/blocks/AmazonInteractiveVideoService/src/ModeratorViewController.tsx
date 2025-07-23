import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

// Customizable Area Start
import createRequestMessage from "./helpers/create-request-message";
import { handleResponseMessage } from "./helpers/handle-response-message";
import { getStorageData } from "framework/src/Utilities";
import { Modertorsearchresult } from "./LiveStreamingController";
import { DeviceEventEmitter } from "react-native";
import { translate } from "../../../components/src/i18n/translate";

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  moderatorModel:boolean;
  stage_id:string;
  stageArn:string;
  moderoterAddRemove:string;
  invitedIds: { userId: number, apiId: string }[];
  openCloseModeratorModel:(isOpen:boolean)=>void;
  openSettingsModal:()=>void;
  manageModals:()=>void;
  openErrorAlert:()=>void;
  setModeratorAddRemove:(value:string)=>void;
  handelModerator:(id:any,isModerator:any)=>void;
  hostsidemoderatorList:(data:any)=>void;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  moderatorSearchResult:Modertorsearchresult[];
  loader:boolean;
  addModeratorModel:boolean;
  value:string;
  moderatorModal:{ openAlertModal: boolean; alertMsg: string };
  language:string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}
export default class GiftModelController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getModeratorAccountsApiCallId: string = "";
  addModeratorAccountsApiCallId: string = "";
  timeout:any;
  deviceEmitter: any;
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
      // Customizable Area Start
      moderatorSearchResult:[],
      loader:false,
      addModeratorModel:false,
      value:"",
      moderatorModal: { openAlertModal: false, alertMsg: "" },
      language:""
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

      case this.getModeratorAccountsApiCallId: {
         this.setState({ loader: false })
         handleResponseMessage({
           responseJson: responseDataJson,
           errorJson: errorDataJson,
           onSuccess: () => {
            this.handleGetModeratorAccount(responseDataJson)
         },
           onFail: () => {
           },
         });
         break;
       }

       case this.addModeratorAccountsApiCallId: {
        this.setState({ loader: true })
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            const showAlert = Boolean(responseDataJson.message === "Account is not live, invitation has been sent to the account");
            this.props.manageModals()
            this.setState({ loader: false, moderatorModal: { openAlertModal: showAlert, alertMsg: showAlert ? translate("User_must_be_present") : "" }})
            this.getModeratorLists({ searchText: '' })
          },
          onFail: () => {
            this.props.openErrorAlert()
          }
        });
        break;
      }
    }

    // Customizable Area End
  }

  async componentDidMount() {
    const language = await getStorageData("SelectedLng"); 
    this.setState({language:language });
    this.getModeratorLists({searchText:''})
    this.deviceEmitter = DeviceEventEmitter.addListener('addremoveModerator',(event:any)=> {
      this.addRemoveModerator(event)
    })
  }

  async componentWillUnmount() {
    this.deviceEmitter?.remove();
  }

  handleGetModeratorAccount = (responseDataJson:any) => {
    this.setState({ moderatorSearchResult: responseDataJson.followings },()=>{
      this.props.hostsidemoderatorList(this.state.moderatorSearchResult)
      this.state.moderatorSearchResult.forEach((item:any)=> {
          if (item.is_moderator == 'Remove' || item.is_moderator == 'Add') {
          this.props.handelModerator(item.id,item.is_moderator)
        }
      })
    })
  }

  closeModeratorModal = () => {
    this.setState({ moderatorModal: { openAlertModal: false, alertMsg: "" } })
  }

  addRemoveModerator = async (userId: number|null) => {
    this.setState({ loader: true })

    const token = await getStorageData("authToken", false)

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.addModeratorAccountsApiCallId = requestMessage.messageId;

    const body = JSON.stringify({
      "account_id": userId,
      "is_moderator": this.props.moderoterAddRemove,
      "stage_id": this.props.stage_id,
      "stage_arn": this.props.stageArn
    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `/bx_block_ivslivestreams/livestreams/add_moderator`,
      method: configJSON.patchMethod,
      header: headers,
      body: body,
    });
  };

  getModeratorLists = async ({searchText}: {searchText: string}) => {
    this.setState({ loader: true })

    const token = await getStorageData("authToken", false);

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };

    let endPoint = searchText != '' ? `/bx_block_followers/list_to_add_moderators?stage_id=${this.props.stage_id}&query=${searchText}&page_no=1&per_page=100` : `bx_block_followers/list_to_add_moderators?stage_id=${this.props.stage_id}&page_no=1&per_page=100`;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getModeratorAccountsApiCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: endPoint,
      method: configJSON.getApiMethodType,
      header: header,
      body: undefined,
    });
  };
}
