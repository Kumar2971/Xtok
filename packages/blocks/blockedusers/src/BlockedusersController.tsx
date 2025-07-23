import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  // Customizable Area Start
  token: string;
  Blockeduser: any;
  isVisible: boolean;
  activeRecordId: number;
  activeId: number;
  activeFirstName: string;
  activeLastName: string;
  sortOption: string;
  activeCreatedAt: string;
  activeUpdatedAt: string;
  userToBlock: string;
  restrictedUsers: any[];
  mutedUsers: any[];
  restrictedUsersLoading: boolean;
  mutedUsersLoading: boolean;
  value: any;
  blockedUsersLoading: boolean;
  language: string;
  blockPage:number;
  mutePage:number
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class BlockedusersController extends BlockComponent<
  Props,
  S,
  SS
> {
  value:any;
  editorState:any;
  BlockeduserApiCallId: any;
  deleteBlockeduserApiCallId:any;
  addBlockeduserApiCallId:any;
  richtext:any
  editor: any;
  // Customizable Area Start
  getRestrictedUsersApiCallId: string = "";
  getMutedUsersApiCallId: string = "";
  unrestrictUserApiCallId: string = "";
  unmuteUserApiCallId: string = "";
  // Customizable Area End
  onChange: (editorState: any) => void;
  setEditor: (editor: any) => void;
  focusEditor: () => void;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.editorState = null;//createEditorStateWithText("");

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage)
    ];

    this.state = {
      token: "",
      sortOption: "newest",
      Blockeduser: [],
      isVisible: false,
      activeRecordId: 0,
      activeId: 0,
      restrictedUsersLoading: false,
      restrictedUsers: [],
      mutedUsers: [],
      mutedUsersLoading: false,
      activeFirstName: "",
      activeLastName: "",
      activeCreatedAt: "",
      activeUpdatedAt: "",
      blockedUsersLoading: false,
      userToBlock: "",
      language:"",
      value: this.value,
      blockPage:0,
      mutePage:0
    };
    this.onChange = value => {
      this.value = value;
      this.setState({ value: value });
    };
    this.setEditor = editor => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };


    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language , blockPage:0 , mutePage:0 },()=>{
    });
    this.getToken();
    this.getBlockeduser(1);
    this.getRestrictedUsers();
    this.getMutedUsers(1);
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener('willFocus', () => {
        this.getToken();
      });
    }
  }
  
  getToken=()=>{
    const msg: Message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(msg);
  }
  
  setTitle = (txt: string) => {
    
  }
  
  addBlockeduserCall = () => {
    
  }
  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      runEngine.debugLog("Message Recived", message);
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token })
    }
    else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
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
      if (responseJson?.data) {
        if (apiRequestCallId === this.BlockeduserApiCallId) {
         this.blockuserResponseSuccess(responseJson)
        }
        if (apiRequestCallId === this.getRestrictedUsersApiCallId) {
          this.setState({
            restrictedUsers: responseJson?.data,
            restrictedUsersLoading: false
          });
        }
        if (apiRequestCallId === this.getMutedUsersApiCallId) {
          this.muteUserResponseSuccess(responseJson)
        }
      } else if (responseJson?.errors) {
        this.setState({ Blockeduser: [] });
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  blockuserResponseSuccess = (responseJson:any) => {
    let newData = responseJson.data;
    this.setState({
      blockedUsersLoading: false
    })
    if(responseJson.meta.current_page - 1 === this.state.blockPage && responseJson.meta.current_page <= responseJson.meta.total_pages){
      this.setState({Blockeduser :  [...this.state.Blockeduser,...newData],blockPage: this.state.blockPage + 1 },()=>{
      })
    }
  }

  muteUserResponseSuccess = (responseJson:any) => {
    let newData = responseJson.data;
    this.setState({
      mutedUsersLoading: false
    })
    if(responseJson.meta.current_page - 1 === this.state.mutePage && responseJson.meta.current_page <= responseJson.meta.total_pages){
      this.setState({mutedUsers :  [...this.state.mutedUsers,...newData],mutePage: this.state.mutePage + 1 },()=>{
      })
    }
  }

  onrefreshBlockUser = async() => {    
    this.setState({
      blockedUsersLoading: true,
      blockPage:0,
      Blockeduser:[]
    }, () => {
      this.getBlockeduser(1)
    })
  }
  onEndReachedBlockedUser = () => {
    this.getBlockeduser(this.state.blockPage + 1)
  }

  onrefreshMuteUser = async() => {
    this.setState({
      mutedUsersLoading: true,
      mutePage:0,
      mutedUsers:[]
    }, () => {
      this.getMutedUsers(1)})
  }
  onEndReachedMuteUser = () => {
    this.getMutedUsers(this.state.mutePage + 1)
  }
  unBlockUser = (id: number, index: number) => {
    this.deleteBlockeduser(id);
    const { Blockeduser } = this.state;
    Blockeduser.splice(index, 1);
    this.setState({ Blockeduser });
  };
  unrestrict = (id: number, index: number) => {
    this.deleteRestrictedUser(id);
    const { restrictedUsers } = this.state;
    restrictedUsers.splice(index, 1);
    this.setState({ restrictedUsers });
  };
  unmuteUser = (id: number, index: number) => {
    this.deleteMutedUser(id);
    const { mutedUsers } = this.state;
    mutedUsers.splice(index, 1);
    this.setState({ mutedUsers });
  };

  deleteBlockeduser = async (id: number) => {
    this.deleteBlockeduserApiCallId = await this.apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: `bx_block_block_users/block_users`,
      body: { id: id }
    });
  };
  deleteRestrictedUser = async (id: number) => {
    this.unrestrictUserApiCallId = await this.apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: `/bx_block_settings/restricated_user`,
      body: { id: id }
    });
  };

  deleteMutedUser = async (id: number) => {
    this.unmuteUserApiCallId = await this.apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: `/bx_block_block_users/mute_users?id=${id}`,
    });
  };
  getBlockeduser = (page:number) => { 
    this.setState(
      {
        blockedUsersLoading: true
      },
      async () => {
        this.BlockeduserApiCallId = await this.apiCall({
          contentType: "application/json",
          method: "GET",
          endPoint: `bx_block_block_users/block_users?page=${page}&per_page=10`,
          body: ""
        });
      }
    );
  };
  getMutedUsers = (page:number) => {    
    this.setState(
      {
        mutedUsersLoading: true
      },
      async () => {
        this.getMutedUsersApiCallId = await this.apiCall({
          contentType: "application/json",
          method: "GET",
          endPoint: `/bx_block_block_users/mute_users?page=${page}&per_page=10`
        });
      }
    );
  };

  getRestrictedUsers = () => {
    this.setState(
      {
        restrictedUsersLoading: true
      },
      async () => {
        this.getRestrictedUsersApiCallId = await this.apiCall({
          contentType: "application/json",
          method: "GET",
          endPoint: `/bx_block_settings/restricated_user?sort=${this.state.sortOption
            }`,
          body: ""
        });
      }
    );
  };

  apiCall = async (data: any) => {
    const authToken = await getStorageData("authToken");
    const { contentType, method, endPoint, body, type } = data;
    const header = {
      "Content-Type": contentType,
      token: authToken
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
    body && type != "formData"
      ? requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      )
      : requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };
  // Customizable Area End
}