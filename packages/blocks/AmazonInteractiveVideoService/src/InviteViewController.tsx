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
import { SearchResult } from "./LiveStreamingController";
import { Alert } from "react-native";
import { translate } from "../../../components/src/i18n/translate";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // id: string;
  // Customizable Area Start
  // route:any;
  invitationModel: number;
  handleInviteModal: (count: number) => void;
  handleInviteIds: (ids: any) => void;
  hostOrGuest: string;
  stream_id: string | any;
  handleButton: () => void;
  stageArn: string;
  chatRoomArn: string;
  stage_id?: string;
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  value: string;
  loader: boolean;
  searchresult: SearchResult[];
  invitedIds: { userId: number, apiId: string }[];
  selectedInviteData: SearchResult | null;
  language: string;
  inviteParticipantID: { id: string, stage_arn: string },
  updateInvite: object,
  invitedList: [{ id: string, status: string }],
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}
export default class InviteViewController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  timeout: any;
  getSearchAccountsApiCallId: string = "";
  timeLimitedCache: string[] = [];
  inviteParticipantApiCallId: string = "";
  updateInviteCallId: string = "";
  InvitedListApiCallId: string = "";
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
      value: "",
      loader: false,
      searchresult: [],
      invitedIds: [],
      selectedInviteData: null,
      language: "",
      inviteParticipantID: { id: "", stage_arn: '' },
      invitedList: [{ id: '', status: '' }],
      updateInvite: {}
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (this.props.invitationModel != prevProps.invitationModel && this.props.invitationModel !== 0) {
      this.setState({ loader: true });
      this.getGuestOrCoHostAccountsLists({ searchText: "" })
    }
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

    this.handleParticipantApi(responseDataJson, errorDataJson, apiRequestMessageID)

    if (apiRequestMessageID == this.getSearchAccountsApiCallId) {
      this.setState({ loader: false })
      handleResponseMessage({
        responseJson: responseDataJson,
        errorJson: errorDataJson,
        onSuccess: () => {
          this.setState({ searchresult: responseDataJson.account })
          this.setState({ loader: false })
        },
        onFail: () => {

        },
      });
    }

    if (apiRequestMessageID == this.updateInviteCallId) {
      handleResponseMessage({
        responseJson: responseDataJson,
        errorJson: errorDataJson,
        onSuccess: () => {
          this.setState({ updateInvite: responseDataJson })

        },
        onFail: () => {

        },
      });
    }
    if (apiRequestMessageID == this.InvitedListApiCallId) {
      handleResponseMessage({
        responseJson: responseDataJson,
        errorJson: errorDataJson,
        onSuccess: () => {
          this.setState({ invitedList: responseDataJson.data })

          this.state.invitedList.map((invite: { id: string, status: string }) => {
            if (invite.id === this.state.inviteParticipantID.id) {
              if (invite.status != 'accepted') {
                this.updateInviteStream()

              }
            }
          })
        },
        onFail: () => {

        },
      });
    }
    if (apiRequestMessageID == this.inviteParticipantApiCallId) {

      handleResponseMessage({
        responseJson: responseDataJson,
        errorJson: errorDataJson,
        onSuccess: () => {
          this.setState({ inviteParticipantID: responseDataJson })

        },
        onFail: () => {

        },
      });
    }

    // Customizable Area End
  }

  getGuestOrCoHostAccountsLists = async ({
    searchText,
  }: {
    searchText: string;
  }) => {
    this.setState({ loader: true })
    const token = await getStorageData("authToken", false);
    let endPoint = this.props.invitationModel === 1 ? configJSON.getLiveStreamAccounts : configJSON.accountSearch;

    const apiEndPoint = `${endPoint}/?page=1&per_page=100&q=${searchText}&stage_id=${this.props.stage_id}`;

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getSearchAccountsApiCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: apiEndPoint,
      method: configJSON.getApiMethodType,
      header: header,
      body: undefined,
    });
  };

  handleParticipantInvitation = (selectedId: number) => {
    let invitationData = this.state.searchresult.slice();
    let updatedData = invitationData.map((objA: SearchResult) => {

      if (objA.id == selectedId) {

        const invitedUserData = {
          ...objA,
          isInvited: true,
          isLoader: true,

        }
        return invitedUserData;
      } else {
        return {
          ...objA,
          isLoader: false
        }
      }
    })
    this.setState({ searchresult: updatedData, selectedInviteData: null })

  }

  handleParticipantApi = (responseDataJson: any, errorDataJson: any, apiRequestMessageID: any) => {
    const isParticipantApiId = this.state.invitedIds.filter((item: any) => item?.apiId == apiRequestMessageID);

    if (isParticipantApiId?.length > 0) {
      const userId = isParticipantApiId[0].userId;
      const updateIds = this.state.invitedIds.filter((item: any) => item?.apiId != apiRequestMessageID);
      handleResponseMessage({
        responseJson: responseDataJson,
        errorJson: errorDataJson,
        onSuccess: () => {
          this.setState({ loader: false, invitedIds: updateIds }, () => {
            this.props.handleInviteIds(this.state.invitedIds);
          });
          this.handleParticipantInvitation(userId);
        },
        onFail: () => {
          this.setState({ selectedInviteData: null, loader: false, invitedIds: updateIds }, () => {
            this.props.handleInviteIds(this.state.invitedIds);
            setTimeout(() => {
              const error = responseDataJson.error;
              if (error && Array.isArray(error) && error.length > 0 && error[0] == "Can not send invitation. Maximum limit of 11 invitations reached for this room.") {
                Alert.alert(translate("notSendInvite"))
                return
              }
              Alert.alert(translate("notSendInvite"))
            }, 500)
            this.setState({ searchresult: [], value: '' })
            this.props.handleInviteModal(0)
          })
        }
      });
    }
  }


  updateInviteStream = async () => {
    const authToken = (await getStorageData('authToken', false));

    const body = {
      invite_id: this.state.inviteParticipantID.id,
      status: "rejected"
    }

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: authToken
    }

    const getDataMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.updateInviteCallId = getDataMsg.messageId;

    createRequestMessage({
      requestMessage: getDataMsg,
      endPoint: configJSON.updateInvite,
      method: configJSON.putMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  inviteParticipant = async (userId: number) => {
    this.setState({ loader: true })
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    const token = await getStorageData("authToken", false)

    this.inviteParticipantApiCallId = requestMessage.messageId;
    const updateIds = [...this.state.invitedIds];
    updateIds.push({ userId: userId, apiId: requestMessage.messageId });
    this.setState({ invitedIds: updateIds }, () => {
      this.props.handleInviteIds(this.state.invitedIds);
    });

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    this.props.handleButton();

    // const body = JSON.stringify({
    //   "stage_arn": this.props.stageArn,
    //   "account_id": userId,
    //   "chat_arn": this.props.chatRoomArn,
    //   "stage_id": this.props.stage_id,
    //   "invite_type": this.props.hostOrGuest,
    // });
    const body = JSON.stringify({
      stream_id: this.props.stream_id,
      receiver_id: userId,
      role: this.props.hostOrGuest
    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.createStageInvite,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };
  InvitedList = async () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    const token = await getStorageData("authToken", false)

    this.InvitedListApiCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };



    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.apicallList + `?stage_arn=${this.state.inviteParticipantID.stage_arn}`,
      method: configJSON.getApiMethodType,
      header: headers,
      // body: body,
    });
  };


  onInviteButtonClick = (item: SearchResult) => {
    this.timeLimitedCache = [...this.timeLimitedCache, `${item.id}`]
    this.setState({ selectedInviteData: item }, () => {
      this.inviteParticipant(
        item?.id
      );
      setTimeout(() => {
        if (this.timeLimitedCache.includes(`${item.id}`)) {
          let index = this.timeLimitedCache.findIndex((userId) => userId == `${item.id}`);
          this.InvitedList()

          this.timeLimitedCache.splice(index, 1);
        }
      }, 30000)

    });
  }

  async componentDidMount() {
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language })
  }
}