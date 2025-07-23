import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";
import { getStorageData } from "framework/src/Utilities";
import createRequestMessage from "../src/helpers/create-request-message";
import { handleResponseMessage } from "../src/helpers/handle-response-message";
import { Alert } from "react-native";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: {
    params: {
      stageData: StageData | undefined
    }
  };
  // Customizable Area End
}

interface StageData {
  name: string | null;
  stageArn: string | null;
  inviteId: number | null;
  isViewer: boolean | null;
  chatArn: string | null;
}

export interface CurrentUser {
  full_name: string | null;
  user_name: string | null;
  photo: string | null;
  id: string | null;
  // datasaver:{
  //   account_id:number|null;
  // }
}

export interface SearchResult {
  account_follow_status: string;
  account_status: string;
  bio: string | null;
  first_name: string | null;
  full_name: string;
  id: number;
  last_name: string | null;
  photo: string | null;
  unique_auth_id: string;
  user_name: string;
  isInvited: boolean | null;
  isLoader: boolean | null;
}

interface S {
  // Customizable Area Start
  token: string | null;
  broadcastDetail: { startBroadcast: string, token: string, streamKey: string, isHost: string, isViewer: string };
  streamEndPressed: boolean;
  alertModal: { openAlertModal: boolean, alertMsg: string };
  invitationModel: boolean;
  searchresult: SearchResult[];
  value: string;
  loader: boolean;
  selectedInviteData: SearchResult | null;
  channelArn: string;
  stageArn: string;
  chatTokenData: {
    token: string;
    sessionTime: string;
    tokenTime: string;
  };
  chatRoomArn: string;
  currentUser: CurrentUser | null;
  isParticipantJoined: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AmazonInteractiveVideoServiceController extends BlockComponent<
  Props,
  S,
  SS
> {

  getSearchAccountsApiCallId: string = '';
  inviteParticipantApiCallId: string = '';
  createStageApiCallId: string = '';
  createTokenApiCallId: string = '';
  createChannelApiCallId: string = '';
  createChatApiCallId: string = '';
  createChatTokenApiCallId: string = '';
  stopStreamApiCallId: string = '';
  deleteChannelApiCallId: string = '';
  loginUserCallId: string = '';

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: null,
      broadcastDetail: { startBroadcast: 'false', token: '', streamKey: '', isHost: 'false', isViewer: 'false' },
      streamEndPressed: false,
      alertModal: { openAlertModal: false, alertMsg: "" },
      invitationModel: false,
      searchresult: [],
      value: "",
      loader: false,
      selectedInviteData: null,
      channelArn: '',
      stageArn: '',
      chatTokenData: {
        token: '',
        sessionTime: '',
        tokenTime: ''
      },
      chatRoomArn: '',
      currentUser: null,
      isParticipantJoined: false
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

      case this.getSearchAccountsApiCallId: {
        this.setState({ loader: false })
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => { this.setState({ searchresult: responseDataJson.account }) },
          onFail: () => {
            this.setState({ invitationModel: false, alertModal: { openAlertModal: true, alertMsg: "session Failed. Please retry!" } })
          },
        });
        break;
      }
      case this.inviteParticipantApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ loader: false });
            this.handleParticipantInvitation();
          },
          onFail: () => {
            this.setState({ selectedInviteData: null, invitationModel: false, loader: false }, () => {
              setTimeout(() => {
                Alert.alert('error', `${responseDataJson.error}`)
              }, 500)
            })
          }
        });
        break;
      }

      case this.createChannelApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ channelArn: responseDataJson.data.channel.arn, broadcastDetail: { ...this.state.broadcastDetail, streamKey: responseDataJson.data.stream_key.value, isHost: 'true' } }, () => {
              this.createRecording();
              this.createStage();
            })
          },
          onFail: () => {
            this.setState({ alertModal: { openAlertModal: true, alertMsg: responseDataJson.error } })
          }
        })
        break;
      }

      case this.createStageApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ stageArn: responseDataJson.arn }, () => {
              this.createChatRoom();
              this.createParticipantToken(responseDataJson.arn, ["PUBLISH", "SUBSCRIBE"]);
            })
          },
          onFail: () => {
            this.setState({ alertModal: { openAlertModal: true, alertMsg: responseDataJson.error } })
          }
        })
        break;
      }

      case this.createChatApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ chatRoomArn: responseDataJson.arn }, () => {
              this.createChatToken();
            })
          },
          onFail: () => {
            this.setState({ alertModal: { openAlertModal: true, alertMsg: responseDataJson.error } })
          }
        })
        break;
      }

      case this.createChatTokenApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ chatTokenData: { token: responseDataJson.token, sessionTime: responseDataJson.session_expiration_time, tokenTime: responseDataJson.token_expiration_time } })
          },
          onFail: () => {
            this.setState({ alertModal: { openAlertModal: true, alertMsg: responseDataJson.error } })
          }
        })
        break;
      }

      case this.createTokenApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ stageArn: responseDataJson.stage_arn, broadcastDetail: { ...this.state.broadcastDetail, startBroadcast: 'true', token: responseDataJson.token } })
          },
          onFail: () => {
            this.setState({ alertModal: { openAlertModal: true, alertMsg: responseDataJson.error } })
          }
        })
        break;
      }

      case this.stopStreamApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.deleteStage();
            this.deleteChatRoom();
            this.deleteChannel();
          },
          onFail: () => {
            this.deleteStage();
            this.deleteChatRoom();
            this.deleteChannel();
            this.setState({ alertModal: { openAlertModal: true, alertMsg: responseDataJson.error } })
          }
        })
        break;
      }

      case this.deleteChannelApiCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.props.navigation.reset({
              index: 0,
              routes: [
                { name: 'Home' },
              ],
            });
          },
          onFail: () => {
            this.setState({ alertModal: { openAlertModal: true, alertMsg: responseDataJson.error } })
          }
        })
        break;
      }

      case this.loginUserCallId: {

        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ currentUser: responseDataJson.data.attributes });
          },
          onFail: () => {
            this.setState({ alertModal: { openAlertModal: true, alertMsg: responseDataJson.error } })
          }
        })
        break;
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getCurrentUserDetails();
    let stageArn = this.props.route.params.stageData?.stageArn;
    let chatArn = this.props.route.params.stageData?.chatArn ?? '';
    if (stageArn && this.props.route.params.stageData?.isViewer == true) {
      this.setState({ stageArn: stageArn, chatRoomArn: chatArn, broadcastDetail: { ...this.state.broadcastDetail, isViewer: 'true' } })
      this.createChatToken();
      this.createParticipantToken(stageArn, ["SUBSCRIBE"])
    } else if (stageArn) {
      this.setState({ stageArn: stageArn, chatRoomArn: chatArn, isParticipantJoined: true })
      this.createChatToken();
      this.createParticipantToken(stageArn, ["PUBLISH", "SUBSCRIBE"])
    } else {
      this.createChannel();
    }
    // Customizable Area End
  }

  // Customizable Area Start

  getAccountsForAudioRequest = async ({ searchText }: { searchText: string }) => {
    this.setState({ loader: true })
    const token = await getStorageData("authToken", false)

    const apiEndPoint = `/bx_block_elasticsearch/account_search?page=1&per_page=100&q=${searchText}`
    const header = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
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

  handleParticipantInvitation = () => {
    let invitationData = this.state.searchresult.slice();
    let updatedData = invitationData.map((objA: SearchResult) => {
      if (objA.id == this.state.selectedInviteData?.id) {
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
    this.setState({ searchresult: updatedData, selectedInviteData: null })

  }

  openInviteModal = () => {
    this.setState({ invitationModel: true })
  }

  closeInvitationModal = () => {
    this.setState({
      invitationModel: false,
    })
  }

  onInviteButtonClick = (item: SearchResult) => {
    this.setState({ selectedInviteData: item }, () => {
      this.inviteParticipant(
        item?.id
      );
    });
  }

  onChangeSearchText = (text: string) => {
    this.setState({
      value: text,
    });
  }

  endbuttonPressed = () => {
    if (this.state.broadcastDetail.isViewer == 'true' || this.state.isParticipantJoined == true) {
      this.setState({ streamEndPressed: true }, () => {
        this.props.navigation.reset({
          index: 0,
          routes: [
            { name: 'Home' },
          ],
        });
      })
    } else {
      this.setState({ streamEndPressed: true }, () => {
        this.stopStream();
      })
    }
  }

  getCurrentUserDetails = async () => {

    const token = await getStorageData("authToken", false)
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.loginUserCallId = requestMessage.messageId;
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

  deleteChatRoom = async () => {
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    const body = {
      room_identifier: this.state.chatRoomArn
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.deleteChatRoom}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  deleteStage = async () => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    const body = {
      arn: this.state.stageArn,
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.deleteStage}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  deleteChannel = async () => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.deleteChannelApiCallId = requestMessage.messageId;

    const body = {
      channel_arn: this.state.channelArn
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.deleteChannel}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  stopStream = async () => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.stopStreamApiCallId = requestMessage.messageId;

    const body = {
      channel_arn: this.state.channelArn
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.stopStream}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  createChatRoom = async () => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.createChatApiCallId = requestMessage.messageId;

    const body = {
      "name": "room1",
      "maximum_message_length": 256,
      "maximum_message_rate": 5,
      "tags": { "key1": "value1" },
      "stage_arn": this.state.stageArn
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.createChatRoom}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  createChatToken = async () => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.createChatTokenApiCallId = requestMessage.messageId;

    const body = {
      "room_identifier": this.state.chatRoomArn,
      "capabilities": ["SEND_MESSAGE"],
      "session_duration": 180
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.createChatToken}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }



  createChannel = async () => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.createChannelApiCallId = requestMessage.messageId;

    const body = {
      "name": "demo_too",
      "authorized": false,
      "insecure_ingest": false,
      "latency_mode": "NORMAL",
      "type": "BASIC"
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.createChannel}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  createRecording = async () => {
    const token = await getStorageData("authToken", false)

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    const body = {
      "name": "test",
      "channel_arn": this.state.channelArn,
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.createRecording}`,
      method: configJSON.postMethod,
      header: { token },
      body: JSON.stringify(body)
    });
  }

  createStage = async () => {
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.createStageApiCallId = requestMessage.messageId;

    const body = {
      "name": (this.state.currentUser?.user_name ?? '').replace(' ', ''),
      "tags": { "key1": "value1", "key2": "value2" },
      "is_challenge": false
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.createStage}`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)
    });
  }

  createParticipantToken = async (stageArn: string, capabilities: string[]) => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.createTokenApiCallId = requestMessage.messageId;

    const body = {
      "capabilities": capabilities,
      "stage_arn": stageArn,
      "attributes": {
        "userId": `${this.state.currentUser?.id ?? 0}`,
        "userName": this.state.currentUser?.full_name ?? ""
      }
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${configJSON.createParticipantToken}`,
      method: configJSON.postMethod,
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

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": token,
    };

    const body = JSON.stringify({
      "stage_arn": this.state.stageArn,
      "account_id": userId,
      "chat_arn": this.state.chatRoomArn
    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.createStageInvite,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };

  onClick = () => {
    this.setState({ invitationModel: true, broadcastDetail: { ...this.state.broadcastDetail, startBroadcast: 'true' } }, () => {
      this.openInviteModal()
    })
  }

  // Customizable Area End
}
