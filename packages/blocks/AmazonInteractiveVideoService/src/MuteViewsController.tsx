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
import { DeviceEventEmitter } from "react-native";
const _ = require('lodash');
import { translate } from "../../../components/src/i18n/translate";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  isMuteDurationModalVisible: boolean;
  commentSetting: boolean;
  stage_id: string;
  addMuteModal: boolean;
  isMutedAccountsModalVisible: boolean;
  invitedIds: { userId: number, apiId: string }[];
  selectedGridId: number | null;
  onCloseDuration: () => void;
  onClose: () => void;
  onCloseMuted: () => void;
  onCloseMutedModal: () => void;
  onCloseAddMuteModal: () => void;
  onMuteSelected: () => void;
  onSelectMute: (item: any) => void;
  handelMuteUmute: (id: any, MuteUnmuteType: any, duration?: any) => void;
  onGetMutedAccounts: (data: any) => void;
  isHost: boolean;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  muteDurationList: any;
  selectedmute: any;
  muteaccountViwerslistdata: any;
  hostsideMutedData: any;
  loader: boolean;
  muteaccountlistdata: any;
  language:string
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}
export default class MuteViewsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getMuteccountViwerslistid: string = "";
  muteAccountPostId: string = "";
  getMutedAccountlistid: string = "";
  getAccountListener: any;
  muteAccountPostListener: any;
  getMutedAccountListener: any;
  muteByModeratorListener: any;
  mutedAccountIds:any = [];
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
      muteDurationList: [
        {
          label: translate("Five_minutes"),
          value: 1
        },
        {
          label: translate("Ten_minutes"),
          value: 2
        },
        {
          label: translate("Fifteen_minutes"),
          value: 3
        },
        {
          label:translate("Entire_live"),
          value: 4
        }],
      selectedmute: null,
      muteaccountViwerslistdata: [],
      hostsideMutedData: [],
      loader: false,
      muteaccountlistdata: [],
      language:""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language })
    
    this.getAccountListener = DeviceEventEmitter.addListener("getMuteccountViwerslist", () => {
      this.getMuteccountViwerslist();
    })

    this.muteAccountPostListener = DeviceEventEmitter.addListener("Muteaccountpost", (event) => {
      this.muteAccountPost(event);
    })

    this.getMutedAccountListener = DeviceEventEmitter.addListener("getMutedAccountlist", () => {
      this.getMutedAccountlist()
    })

    this.muteByModeratorListener = DeviceEventEmitter.addListener("handleUserMuted",(event)=>{
      this.handleUserMuted(event.response,event.isFromModerator)
    })
  }

  async componentWillUnmount() {
    this.getAccountListener.remove();
    this.muteAccountPostListener.remove();
    this.getMutedAccountListener.remove();
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
      case this.getMuteccountViwerslistid: {
        this.setState({ loader: true })
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,

          onSuccess: () => {
            this.setState({
              muteaccountViwerslistdata: responseDataJson.data,
              loader: false,
            }, () => {
              this.props.onMuteSelected()
              this.hostMuteUnmuteList(this.state.muteaccountViwerslistdata)
            })
          },
          onFail: () => { this.setState({ loader: false }) }
        })
        break;
      }

      case this.muteAccountPostId: {
        this.setState({ loader: true })
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ selectedmute: '', loader: false })
            this.getMuteccountViwerslist();
            if (responseDataJson.meta?.message == "User muted.") {
              if(this.props.isHost){
                this.handleUserMuted(responseDataJson)
              }
              else{
                this.props.handelMuteUmute(responseDataJson.data.account_id, true, responseDataJson.data.duration)
              }
            } else {
              this.handleUserUnmuted(responseDataJson)
            }
          },
          onFail: () => { },
        });
        break;
      }

      case this.getMutedAccountlistid: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,

          onSuccess: () => {

            this.setState({
              muteaccountlistdata: responseDataJson.data,
            }, () => {
              this.props.onMuteSelected()
            })
          },
          onFail: () => { }
        })
        break;
      }
    }

    // Customizable Area End
  }


  handleUserUnmuted = (responseDataJson:any) => {
    if(this.mutedAccountIds.includes(responseDataJson.data.account_id)){
      let index = this.mutedAccountIds.indexOf(responseDataJson.data.account_id)
      this.mutedAccountIds.splice(index, 1)
      this.props.handelMuteUmute(responseDataJson.data.account_id, false)
    }
  }

  handleUserMuted = (responseDataJson:any, isFromModerator : boolean = false) => {
    if(!this.mutedAccountIds.includes(responseDataJson.data.account_id)){
      this.mutedAccountIds.push(responseDataJson.data.account_id)
    }
    if(!isFromModerator){
      this.props.handelMuteUmute(responseDataJson.data.account_id, true)
    }
    if ((responseDataJson.data.duration / 5) != 4) {
      setTimeout(() => {
        if (this.mutedAccountIds.includes(responseDataJson.data.account_id)) {
          let index = this.mutedAccountIds.indexOf(responseDataJson.data.account_id)
          this.mutedAccountIds.splice(index, 1)
          this.props.handelMuteUmute(responseDataJson.data.account_id, false)
          let newData = _.cloneDeep(this.state.muteaccountViwerslistdata)
          let newMutedData = newData.map((item: any) => {
            return { ...item, attributes: { ...item.attributes, is_stage_muted: false }}
          })
          this.setState({ muteaccountViwerslistdata: newMutedData })
          this.muteAccountPost(responseDataJson.data.account_id)
        }
      }, responseDataJson.data.duration * 60000)
    }
  }

  muteAccountPost = async (id: any) => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };
    const body = {
      "stage_id": this.props.stage_id,
      "account_id": id,
      "is_entirelive_mute": this.state.selectedmute == 4 ? true : false, 
      "duration": this.state.selectedmute * 5,
      "duration_type": "minutes"
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.muteAccountPostId = requestMessage.messageId;
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `bx_block_ivslivestreams/stage_mute_user`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)

    });
  }

  getMuteccountViwerslist = async () => {
    this.setState({ loader: true })
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getMuteccountViwerslistid = requestMessage.messageId;
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `bx_block_ivslivestreams/livestreams/list_viewers?stage_id=${this.props.stage_id}`,
      method: configJSON.getMethod,
      header: header,
      body: undefined

    });
  }

  getMutedAccountlist = async () => {
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.getMutedAccountlistid = requestMessage.messageId;
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `bx_block_ivslivestreams/stage_mute_user?stage_id=${this.props.stage_id}`,
      method: configJSON.getMethod,
      header: header,
      body: undefined

    });
  }

  handleAddMuteUnmute = (id: any) => {
    this.setState({
      loader: true
    })
    this.getMuteccountViwerslist()
    this.hostMuteUnmuteList({ searchText: '' })
    for (let i = 0; i <= this.state.hostsideMutedData.length; i++) {
      if (this.state.hostsideMutedData[i]?.attributes.user_id == this.props.selectedGridId) {
        this.muteAccountPost(this.props.selectedGridId)
      }
    }
  }

  hostMuteUnmuteList = (data: any) => {
    this.setState({ hostsideMutedData: data })
  }

  selectmute = (value: any, item: any) => {
    this.setState({ selectedmute: value })
    if (this.props.commentSetting) {
      this.setState({ selectedmute: value },()=>{
        this.getMuteccountViwerslist()
      })
    } else {
      this.props.onCloseDuration()
      this.handleAddMuteUnmute(this.props.selectedGridId)
    }
  }
}
