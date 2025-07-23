import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import ImagePicker from 'react-native-image-crop-picker';

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
import messaging from '@react-native-firebase/messaging';
import { translate } from "../../../components/src/i18n/translate";
// Customizable Area End

export const configJSON = require("./config");


export interface Props {
  navigation: any;
  id: string;
  route: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  followersList: any;
  accountId: any;
  loading: boolean;
  userName: any;
  searchText: any;
  message: any;
  matchResult: any;
  showEmpty: boolean;
  showOptions: boolean;
  chatId: any;
  userChatHistory: any;
  messageArray: any;
  received_id: any;
  dm_list: any;
  friendName: any;
  friendName2: any;
  userFullName: any;
  checkUserId: any;
  compareUserId: any;
  SelfUserId: any;
  chat_id: any;
  mute_status: any;
  block_status: any;
  imgEdit: boolean;
  img: any;
  modalData: boolean;
  imageModal: boolean;
  blankView: boolean;
  friendsAccount: any;
  secondUserName: any;
  finalUserName: any;
  userPhoto: any;
  userAttachement: any;
  userPosterArray: any;
  chatUserPicture: any;
  generatedLink: any;
  userMessageId: any;
  showEmojis: boolean;
  showReportModal: boolean;
  vid: any;
  selectedReportReason: any;
  report_desc: any;
  refresh: boolean;
  prevHistoryId: any;
  refreshChat: boolean;
  disable: boolean;
  secondUserChatPic: any;
  selfUserProfilePic: any;
  disableSend: any;
  userChatImage: any;
  vidLoading: boolean;
  sticker: boolean;
  modalVisible: boolean;
  sentModal: boolean;
  inprocess: boolean;
  language: string;
  alertModal:any; 
  // Customizable Area Start
  isKeyboardOpen: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Chat9Controller extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End
  getFollowinglist: any;
  getMatchingResultsCallId: any;
  createRoomApi: any;
  createMessageApi: any;
  socket:any;
  isSubscribed:any;
  getChatByIdApi: any;
  postblockUserCallId: any;
  postReportUserCallId: any;
  putMuteUserCallId: any;
  getPrevChatsCallId: any;
  getChatExistsCallId: any;
  deleteChatApi: any;
  deleteUserMessageApi: any;
  timeout:any;
  keyboardDidShowListener:any;
  keyboardDidHideListener: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage)
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      followersList: [],
      accountId: '',
      loading: false,
      userName: '',
      searchText: '',
      message: '',
      matchResult: [],
      showEmpty: false,
      showOptions: false,
      chatId: '',
      userChatHistory: [],
      messageArray: [],
      received_id: "",
      dm_list: [],
      chat_id: '',
      userFullName: '',
      checkUserId: [],
      compareUserId: '',
      SelfUserId: '',
      img: '',
      vid: '',
      imgEdit: false,
      modalData: false,
      imageModal: false,
      blankView: false,
      friendsAccount: [],
      secondUserName: '',
      mute_status: false,
      block_status: false,
      friendName: [],
      friendName2: [],
      finalUserName: '',
      userPhoto: '',
      userAttachement: [],
      userPosterArray: [],
      chatUserPicture: '',
      generatedLink: '',
      userMessageId: '',
      showEmojis: false,
      showReportModal: false,
      selectedReportReason: null,
      report_desc: null,
      refresh: false,
      refreshChat: false,
      prevHistoryId: null,
      disable: false,
      secondUserChatPic: '',
      selfUserProfilePic: '',
      disableSend: false,
      userChatImage: '',
      vidLoading: false,
      sticker: false,
      modalVisible: false,
      sentModal: false,
      inprocess: false,
      language: '',
      alertModal:{
        openAlertModal: false,
        alertMsg: "", 
        headerText:"",
        id:"",
        btnTitle1:"",
          btnTitle2:""
        },
  
      // Customizable Area Start
      isKeyboardOpen: false,
      // Customizable Area End
    };
    
    this.socket = null;
    this.isSubscribed=false;
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }
  onNotify = () => {
    console.log('working notification -=-=--=-', this.props);
  }

  async componentDidMount() {
    const language = await getStorageData("SelectedLng");
    this.setState({language: language})

    this.props.navigation.addListener("focus",async () => {
      const language = await getStorageData("SelectedLng");
      this.setState({ language: language });
    });

  }


  goBackId = () => { this.props.navigation.goBack() }
  enterdescription = (text: any) => {
    this.setState({ report_desc: text })
  }
  uploadPhoto = async () => {
    try {
      await ImagePicker.openPicker({
        mediaType: "photo",
        compressImageQuality: 0.3,
        includeBase64: true,
        cropping: true,                                                                                               
        multiple: true,
        maxFiles:10,
      })?.then(async (image) => {        
        if(image && image?.length > 10){
          this.setState({alertModal:{openAlertModal: true, alertMsg:translate("no_more_photos_allowed"),btnTitle2:translate("ok")}});
          return;
        }                                                                                                                                                                                                                                                                                                                                                                        
        this.setState(
          {

            img: image, imgEdit: true, modalData: false
          },
          () => {
            this.createMessage()
          }
        );
      });
    } catch (e) {
    }
  };

  takePhoto =async () => {
    try {
    await  ImagePicker.openCamera({
        mediaType: "photo",
        compressImageQuality: 0.3,
        includeBase64: true,
        cropping: true,
        multiple: true,
      }).then(async (image) => {

        let newArray = [];
        newArray.push(image)
        this.setState(
          {
            img: newArray, modalData: false
          },
          () => {

            this.createMessage();
          }
        );
      });
    } catch (e) {
    }
  };

  checkVideoSizes(vid: any) {
    let t = 0;
    let type = 0;
    for (let i = 0; i < vid.length; i++) {
      if ((vid[i]?.size / 1000000) < 45 && vid[i]?.mime == "video/mp4") {
        continue
      }
      else if ((vid[i]?.size / 1000000) > 45) {
        t = 1;
        break
      }
      else if ((vid[i]?.mime) != "video/mp4") {
        type = 1;
        break
      }
    }
    if (t == 1) {
      this.setState({alertModal:{openAlertModal: true, alertMsg:"Video size must be <= 45 MB",headerText:"Invalid video size",btnTitle2:"OK"}})
      
    }
    else if (type == 1) {
      this.setState({alertModal:{openAlertModal: true, alertMsg:"Only mp4 video's are supported",headerText:"Invalid video type",btnTitle2:"OK"}})

    }
    else if (t == 0 && type == 0) {
      this.setState({ vid: vid }, () => { this.createMessage() });
    }
  }

  uploadVideo = async() => {
    try {
    await  ImagePicker.openPicker({
        mediaType: "video",
        multiple: true,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        }
      }).then(async (vid) => {
        if (vid.length > 5) {
          this.setState({alertModal:{openAlertModal: true, alertMsg:translate("no_more_videos_allowed"),btnTitle2:translate("ok")}});
          return
        }
        this.checkVideoSizes(vid);
      });
    }
    catch (e) {
    }
  }

  userMessage = (id: any) => {
    this.setState({alertModal:{openAlertModal: true,headerText:translate("are_you_sure_to_delete"),id:id,btnTitle2:translate("ok"),btnTitle1:translate("cancel")}})
  }



  onpressReport = () => {
    this.setState({ inprocess: true });
    if (this.state.selectedReportReason == -1 || !this.state.selectedReportReason) {
      this.setState({inprocess:false,alertModal:{openAlertModal: true, alertMsg:translate("please_select_a_reason"),btnTitle2:translate("ok")}});
      return
    }
    else if (this.state.selectedReportReason == "Other" && (this.state.report_desc == null || this.state.report_desc == '')) {
      this.setState({inprocess:false,alertModal:{openAlertModal: true, alertMsg:translate("give_detailed_description"),btnTitle2:translate("ok")}});
      return
    }
    this.reportUser()
  }

  clapFunction = () => {
    this.setState({ message: '👋' })
    console.log("check here" , this.state.message)
    setTimeout(() => { this.createMessage() }, 20)
  }

  navigationFunction = () => {
    this.props.navigation.navigate('SearchUserList')
  }

  audioNavigationFunction = () => {
    this.props.navigation.navigate('audio')
  }

  chatNavigationFunction = (item:any) => {
    console.log('ceheck id here-=-==-=>>', item?.item?.attributes?.friend_account[0]?.data?.id);

  }

  profileNavigationFunction = (item:any) => {
    this.props.navigation.navigate("UserProfileBasicBlock", { account_id: item?.item?.attributes?.friend_account[0]?.data?.id })
  }

  goBackNavigationFunction = () => {
    this.props.navigation.goBack()
  }

  eyeTabFunction = () => {
    this.setState({ message: '👀' })
    setTimeout(() => { this.createMessage() }, 20)
  }

  selectReportReason = (value: any) => {
    this.setState({ selectedReportReason: value, report_desc: null })
  }

  sayHeyFunction = () => {
    this.setState({ message: '✋' })
    setTimeout(() => { this.createMessage() }, 20)
  }

  onChangeSearch = (searchText: string) => {
    this.setState({ searchText: searchText }, () => {
      if(searchText.length < 3){
        return
      }  
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.fetchMatchingResults(this.state.searchText)
      }, 500)
    })
  }


  functionClapping = () => {
    !this.state.loading && this.clapFunction()
  }

  functioneyeEmoji = () => {
    !this.state.loading && this.eyeTabFunction()
  }

  functionHeyEmoji = () => {
    !this.state.loading && this.sayHeyFunction()
  }

  onChangeNumber = (text: string) => {
    this.setState({ message: text })

  }

  checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('fcmToken-=-=---=-=-=-=--=-=>>>>', fcmToken);
    }
  }

  onUserClick = (item: any) => {
    this.props.navigation.navigate('Chat9', { acc_id: item?.account_id ? item?.account_id : item?.id, passed_name: item?.full_name })
  }

  async receive(from: string, message: Message) {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    let apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getFollowinglist !== null &&
      this.getFollowinglist ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson) {
        this.getFollowersSuccessCallBack(responseJson);
      } else {
        this.getFollowersFailureCallBack(errorResponse);
        this.parseApiErrorResponse(responseJson);
      }
      this.parseApiCatchErrorResponse(errorResponse);
    }
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.createRoomApi !== null &&
      this.createRoomApi ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson) {
        this.createRoomSuccessCallBack(responseJson);
      } else {
        this.createRoomFailureCallBack(errorResponse);
        this.parseApiErrorResponse(responseJson);
      }
      this.parseApiCatchErrorResponse(errorResponse);
    }
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.createMessageApi !== null &&
      this.createMessageApi ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson) {
        this.createMessageSuccessCallBack(responseJson);
      } else {
        this.createMessageFailureCallBack(errorResponse);
        this.parseApiErrorResponse(responseJson);
      }
      this.parseApiCatchErrorResponse(errorResponse);
    }
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getChatByIdApi !== null &&
      this.getChatByIdApi ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson) {
        this.getChatHistorySuccessCallBack(responseJson);
      } else {
        this.getChatHistoryFailureCallBack(errorResponse);
        this.parseApiErrorResponse(responseJson);
      }
      this.parseApiCatchErrorResponse(errorResponse);
    }
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.deleteChatApi !== null &&
      this.deleteChatApi ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson) {
        this.deleteChatSuccessCallBack(responseJson);
      } else {
        this.deleteChatFailureCallBack(errorResponse);
        this.parseApiErrorResponse(responseJson);
      }
      this.parseApiCatchErrorResponse(errorResponse);
    }
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.deleteUserMessageApi !== null &&
      this.deleteUserMessageApi ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson) {
        this.deleteUserMessageSuccessCallBack(responseJson);
      } else {
        this.deleteUserMessageFailureCallBack(errorResponse);
        this.parseApiErrorResponse(responseJson);
      }
      this.parseApiCatchErrorResponse(errorResponse);
    }
    else if (apiRequestCallId == this.getMatchingResultsCallId) {
      console.log('running *****', responseJson);
      this.setState({ loading: false })

      if (responseJson?.account.length == 0) {
      }

      this.setState({ matchResult: responseJson?.account });
    }

    if (apiRequestCallId == this.postblockUserCallId) {
      console.log('block resp', responseJson);
      if (responseJson) {
        this.setState({ block_status: !this.state.block_status, showOptions: false });
        console.log('check block status -=-=--=->>', this.state.block_status);

      }
    }
    if (apiRequestCallId == this.postReportUserCallId) {
      console.log("report resp", responseJson);
      if (responseJson?.data) {
        this.setState({ showReportModal: false, selectedReportReason: null, report_desc: null, showOptions: false });
        this.setState({ sentModal: true })
      }
    }
    if (apiRequestCallId == this.putMuteUserCallId) {
      console.log('mute RESP', responseJson);
      this.setState({ loading: false });
      if (responseJson) {
        this.setState({ showOptions: false })
      }
    }
    if (apiRequestCallId == this.getPrevChatsCallId) {
      this.setState({ loading: false });
      if (responseJson?.data) {

        this.setState({ dm_list: responseJson.data, friendName: responseJson.data })
        this.state.friendName.map((item: any) => {
          this.setState({ friendName2: item?.attributes?.friend_account })
        });
        this.state.friendName2.map((item: any) => {
        });
      }
    }
    if (apiRequestCallId == this.getChatExistsCallId) {
      this.setState({ loading: false });
      this.setState({ chat_id: responseJson?.data?.id, selfUserProfilePic: responseJson?.data?.attributes?.image }, () => console.log('SET ID', this.state.chat_id))
      this.setState({ mute_status: responseJson?.data?.attributes?.mute_status, block_status: responseJson?.data?.attributes?.friend_account[0]?.data?.attributes?.is_blocked }, () => console.log('SET Mute,Block Status', this.state.mute_status, this.state.block_status))
      if (responseJson?.length == 0) {
        console.log('empty');
        this.createRoom()
      }
      else {
        this.getChatbyId();
      }
    }
  }

  getFollowersSuccessCallBack = async (responseJson: any) => {
    this.setState({ loading: true })
    console.log("@@@ getFollowerslist  getPost Success Response============", responseJson.followings);
    this.setState({ followersList: responseJson.followings })
    console.log('data-=-=-=-=', this.state.followersList);
    this.state.followersList.map((item: any) => {
      console.log('this is item ==-=-=-=-=>>', item);
      let accountId = item.account_id
      let userName = item.account_details.full_name
      this.setState({ accountId: this.state.received_id, userFullName: userName })
      console.log('checkitem-=-=--=-=>>', userName);
      console.log('checkId-=-=--=-=-=-=-=-=->>>', accountId);
    })
    this.setState({ loading: false })

  };

  getFollowersFailureCallBack = (errorResponse: any) => {
    console.log("@@@ getFollowers Failure Response =========", errorResponse);
  };
 



  subscribeToChannel = async (id:any) => {
    const token = await getStorageData("authToken");
    const wsUrl = "wss://liketiktokapp-255799-ruby.b255799.uat.eastus.az.svc.builder.ai/cable";
   if (this.socket) {
    this.socket.close();
    console.log('Existing WebSocket connection closed.');
  }

   const urlWithToken = `${wsUrl}?token=${token}`;

    this.socket = new WebSocket(urlWithToken);
    console.log('WebSocket initialized:', this.socket);


      this.socket.onopen = () => {
        console.log('WebSocket connection established');
  
        const subscriptionData = {
          command: 'subscribe',
          identifier: JSON.stringify({
            channel: 'ChatChannel',
            id: id,
          }),
        };

        console.log('Sending subscription data:', subscriptionData);
        this.socket.send(JSON.stringify(subscriptionData));
        this.isSubscribed=true;
      };
  
    
      this.socket.onmessage = (event:any) => {
        const messageData = JSON.parse(event.data);        
        if (messageData.type === 'confirm_subscription') {
          this.isSubscribed=true;
          return;
        } 
       // Skip processing messages until subscription is confirmed and message doesn't have an "action" property
        if (!this.isSubscribed) {
          return;
        }
        if (messageData.type === "ping") {
          return; 
        }

         
         if (messageData.message && messageData.message.action =="new_message") {
          
          const newMessage = {
            attributes:{
            chat_id: messageData.message.chat_id,
            message: messageData.message.message,
            id: messageData.message.sender_id,
            account_id:messageData.message.sender_id
            }
          };
          const isDuplicate = this.state.userChatHistory.some(
            (msg:any) => msg.id === newMessage.attributes.id
          );
          if(!isDuplicate){          
            this.setState((prevState) => {
                const previousChat = prevState?.userChatHistory?.[0] || { data: [] }; // Safely access the previous chat
                const updatedChat = {
                  ...previousChat,
                  data: [newMessage, ...previousChat.data], // Add the new message to the beginning of the data array
                };
              
                return {
                  userChatHistory: [updatedChat, ...prevState.userChatHistory.slice(1)], // Keep other chat history intact
                };
              });
            
          }

        }
      };
  
      this.socket.onerror = (error:any) => {
        console.error('WebSocket connection error:', error.message);
      };
  
      this.socket.onclose = (event:any) => {
        console.log('WebSocket connection closed:', event.code, event.reason);
        
      };
  };
  

  mergeSendMessage = (val: any) => {
    console.log('function working-=-=-=-=->>>', val.attributes.attachments);

    let user_message = val.attributes.message
    let user_account_id = val.attributes.account_id
    let user_chat_id = val.attributes.chat_id
    let user_id = val.attributes.id
    let user_message_created_at = val.attributes.created_at
    let user_DOB = val.attributes.account.date_of_birth
    let user_device_id = val.attributes.account.device_id
    let user_emailid = val.attributes.account.email
    let user_fullname = val.attributes.account.full_name
    let user_full_phone_number = val.attributes.account.full_phone_number
    let user_password_digest = val.attributes.account.password_digest
    let user_role_id = val.attributes.account.role_id
    let user_unique_auth_id = val.attributes.account.unique_auth_id
    let user_user_name = val.attributes.account.user_name
    let attach_type = val.attributes.attachment_type
    let attachments = val.attributes.attachments

    const obj1 = {
      date: "",
      data: [
        {
          attributes: {
            account: {
              activated: true,
              age: null,
              app_language_id: null,
              bio: null,
              country_code: 91,
              created_at: "",
              date_of_birth: user_DOB,
              device_id: '',
              email: user_emailid,
              first_name: null,
              full_name: user_fullname,
              full_phone_number: user_full_phone_number,
              gender: null,
              group_subscribed: false,
              id: user_id,
              instagram: null,
              is_blacklisted: false,
              is_online: true,
              is_paid: false,
              is_subscribed: false,
              last_name: null,
              last_seen_at: "",
              last_visit_at: null,
              nickname: null,
              password_digest: user_password_digest,
              phone_number: user_full_phone_number,
              platform: null,
              role_id: user_role_id,
              status: "",
              stripe_id: null,
              stripe_subscription_date: null,
              stripe_subscription_id: null,
              suspend_until: null,
              unique_auth_id: user_unique_auth_id,
              updated_at: "",
              user_name: user_user_name,
              user_profile_data: null,
              user_type: null,
              verified: true,
              youtube: null
            },
            account_id: user_account_id,
            attachment_type: attach_type,
            attachments: attachments,
            chat_id: user_chat_id,
            created_at: user_message_created_at,
            id: user_id,
            is_mark_read: false,
            last_chat_time: "",
            message: user_message,
            updated_at: ""
          },
          id: user_id,
          type: "chat_message"
        }
      ]
    }

    const obj2 = {
      attributes: {
        account: {
          activated: true,
          age: null,
          app_language_id: null,
          bio: null,
          country_code: 91,
          created_at: "",
          date_of_birth: user_DOB,
          device_id: '',
          email: user_emailid,
          first_name: null,
          full_name: user_fullname,
          full_phone_number: user_full_phone_number,
          gender: null,
          group_subscribed: false,
          id: user_id,
          instagram: null,
          is_blacklisted: false,
          is_online: true,
          is_paid: false,
          is_subscribed: false,
          last_name: null,
          last_seen_at: "",
          last_visit_at: null,
          nickname: null,
          password_digest: user_password_digest,
          phone_number: user_full_phone_number,
          platform: null,
          role_id: user_role_id,
          status: "",
          stripe_id: null,
          stripe_subscription_date: null,
          stripe_subscription_id: null,
          suspend_until: null,
          unique_auth_id: user_unique_auth_id,
          updated_at: "",
          user_name: user_user_name,
          user_profile_data: null,
          user_type: null,
          verified: true,
          youtube: null
        },
        account_id: user_account_id,
        attachment_type: attach_type,
        attachments: attachments,
        chat_id: user_chat_id,
        created_at: user_message_created_at,
        id: user_id,
        is_mark_read: false,
        last_chat_time: "",
        message: user_message,
        updated_at: ""
      },
      id: user_id,
      type: "chat_message"
    }

    let newArr = [...this.state.userChatHistory]

    newArr.unshift(obj1);

    this.setState({ userChatHistory: newArr }, () => console.log('state setted -=-=-=->>>', this.state.userChatHistory, this.state.message));
    this.setState({ message: '' });
  };



  getChatHistorySuccessCallBack = async (responseJson: any) => {
    this.setState({ loading: true })
    console.log("@@@ chat History #########", responseJson?.data?.attributes?.friend_account[0]);
    let secondUserPic = responseJson?.data?.attributes?.friend_account[0]?.data?.attributes?.photo
    let messageArray = responseJson.data.attributes.messages
    let userSendImage = responseJson.data.attributes.messages
    console.log('check Message Araay-=-=-=->>>', userSendImage);
    this.setState({ userPosterArray: userSendImage, secondUserChatPic: secondUserPic })
    this.setState({ prevHistoryId: responseJson?.meta?.prev_history_id }, () => console.log('prev_history_id', this.state.prevHistoryId));

    if (messageArray?.length == 0) {
      this.setState({ blankView: true })
    }
    let friendsAccount = responseJson.data.attributes.friend_account;
    this.setState({ friendsAccount: friendsAccount })
    this.state.friendsAccount.map((item: any) => {
      let secondName = item?.data?.attributes?.full_name

      this.setState({ secondUserName: secondName })
      console.log('friends-=-=-=-=-=>>>', this.state.secondUserName);
    })

    let renamedObjArr = messageArray.map((item: any) => {
      delete Object.assign(item, { ["data"]: item["messages"] })["messages"];
    })

    this.setState({ userChatHistory: messageArray, loading: false });

     
    this.subscribeToChannel(this.state.chat_id)
  };

  getChatHistoryFailureCallBack = (errorResponse: any) => {
    console.log("@@@ chat Failure Response =========", errorResponse);
  };

  createRoomSuccessCallBack = async (responseJson: any) => {
    this.setState({ loading: true })
    console.log("@@@create room Success Response============", responseJson.data);
    this.setState({ loading: false, chat_id: responseJson?.data?.id, selfUserProfilePic: responseJson?.data?.attributes?.image, secondUserChatPic: responseJson?.data?.attributes?.friend_account[0]?.data?.attributes?.photo }, () => console.log(' room SET ID', this.state.chat_id));
    const chatId = responseJson?.data?.id;

    this.setState({ chat_id: chatId }, () => {
      this.getChatbyId(); // Fetch chat details to show existing history
  });
  };

  createRoomFailureCallBack = (errorResponse: any) => {
    console.log("@@@create room Failure Response =========", errorResponse);
  };

  deleteChatSuccessCallBack = async (responseJson: any) => {
    console.log("@@@ delete chat bt id Success Response============", responseJson);
    this.setState({ showOptions: false })
    this.setState({ showOptions: false }, this.props.navigation.navigate("ChatList"));
    this.getChatbyId()
  };

  deleteChatFailureCallBack = (errorResponse: any) => {
  };

  deleteUserMessageSuccessCallBack = async (responseJson: any) => {
    this.getChatbyId()
  };

  deleteUserMessageFailureCallBack = (errorResponse: any) => {
  };

  createMessageSuccessCallBack = async (responseJson: any) => {
    console.log("id==>>",responseJson.data.attributes.chat_id)
    this.setState({ loading: true })
    this.setState({ img: '', vid: '', message: '' });
    this.setState({ loading: false })
  };

  createMessageFailureCallBack = (errorResponse: any) => {
  };


  getFollowers = async () => {
    this.setState({ loading: true });
    const token = await getStorageData("authToken");
    const userId = await getStorageData('userID');

    const header = {
      "Content-Type": "application/json",
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getFollowinglist = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_followers/follows?id=${userId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  createRoom = async () => {
    const token = await getStorageData("authToken");
    console.log('token-=---=-=-=-=-=-=-=-=-', token)
    const accountId = this.state.received_id
    console.log('account_id=-------=-=-=->>>>>', accountId)

    this.setState({ loading: true })
    const header = {
      "Content-Type": 'application/json',
      token: token
    };

    const httpBody = {
      user_id: accountId,
      chat: {
        name: this.state.userFullName
      }
    };

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.createRoomApi = requestMessage.messageId;

    requestMessage.addData
      (getName(MessageEnum.RestAPIResponceEndPointMessage),
        "bx_block_chat/chats");

    requestMessage.addData
      (getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header));

    requestMessage.addData
      (getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody));

    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), "POST");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;

  }

  createMessage = async () => {
    if (this.state.message === '' && this.state.img === '' && this.state.vid === '') {
      this.setState({ modalVisible: true })
    } else {
      this.setState({ modalData: false });
      const token = await getStorageData("authToken");

      const chatId = this.state.chat_id

      this.setState({ loading: true })
      const header = {
        "Content-Type": 'multipart/form-data',
        token: token
      };

      const httpBody = new FormData();
      httpBody.append('chat_id', chatId);
      httpBody.append("message[message]", this.state.message);
      if (this.state.vid?.length > 0) {
        for (let i = 0; i < this.state.vid.length; i++) {
          let obj: any = {
            uri: this.state.vid[i]?.path,
            type: 'video/mp4',
            name: 'video',
          }
          httpBody.append("message[attachments][]", obj);
        }
        httpBody.append("message[attachment_type]", "video");
      }

      if (this.state.img?.length > 0) {
        for (let i = 0; i < this.state.img.length; i++) {
          let imgFile: any = {
            uri: this.state.img[i]?.path,
            type: "image/jpeg",
            name: "image",
          }
          httpBody.append("message[attachments][]", imgFile);
        }

        httpBody.append("message[attachment_type]", "image");
      }

      const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

      this.createMessageApi = requestMessage.messageId;

      requestMessage.addData
        (getName(MessageEnum.RestAPIResponceEndPointMessage),
          "bx_block_chat/messages"
        );

      requestMessage.addData
        (getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(header));

      requestMessage.addData
        (getName(MessageEnum.RestAPIRequestBodyMessage),
          httpBody);

      requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), "POST");

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    }

  }

  deleteMessage = async (id: any) => {
    const token = await getStorageData("authToken");
    const chatId = this.state.chat_id
    const userMessageId = id
    this.setState({ loading: true })
    const header = {
      "Content-Type": 'application/json',
      token: token
    };

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.deleteUserMessageApi = requestMessage.messageId;

    requestMessage.addData
      (getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_chat/messages/${userMessageId}?chat_id=${chatId}`
      );

    requestMessage.addData
      (getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header));

    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), "DELETE");

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;

  }

  deleteChat = async () => {
    const token = await getStorageData("authToken");
    console.log('token-=---=-=-=-=-=-=-=-=-', token)
    const chatId = this.state.chat_id
    console.log('userSelfchatId=-------=-=-=->>>>>', chatId)

    this.setState({ loading: true })
    const header = {
      "Content-Type": 'application/json',
      token: token
    };

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.deleteChatApi = requestMessage.messageId;

    requestMessage.addData
      (getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_chat/chats/remove_chat?id=${chatId}`
      );

    requestMessage.addData
      (getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header));

    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), "DELETE");

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;

  }

  getChatbyId = async () => {
    this.setState({ loading: true });
    const token = await getStorageData("authToken");
    const receiverId = this.state.chat_id
    console.log('userChatId-=---=-=-=-=-=-=-=-=-', receiverId)

    const header = {
      "Content-Type": "application/json",
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getChatByIdApi = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_chat/chats/${receiverId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  // Customizable Area Start
  fetchMatchingResults = async (keyword: any) => {
    this.setState({ loading: true });

    const token = await getStorageData("authToken");
    console.log('token-=---=-=-=-=-=-=-=-=-', token)
    const userId = await getStorageData('userID')
    console.log('userId-=---=-=-=-=-=-=-=-=-', userId)

    const header = {
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getMatchingResultsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_elasticsearch/account_search?page=1&per_page=100&q=${keyword}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  async blockUser(id: string | number) {

    console.log("api called ..............", id);

    const token = await getStorageData("authToken");

    const header = {
      "Content-Type": 'application/json',
      "token": token
    };

    const httpBody = {
      id: id,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postblockUserCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      '/bx_block_block_users/block_users'
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  async reportUser() {

    console.log('~~~~', this.state.received_id, this.state.selectedReportReason, this.state.report_desc)

    const token = await getStorageData("authToken");

    const header = {
      "Content-Type": 'application/json',
      "token": token
    };

    const httpBody = {
      report: {
        account_id: this.state.received_id,
        reason: this.state.selectedReportReason,
        description: this.state.report_desc,
      }
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postReportUserCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      '/account_block/reported_users'
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    this.setState({inprocess:false});
    return true;
  }

  async muteChat() {
    this.setState({ loading: true })

    const token = await getStorageData("authToken");
    console.log('this is chatid-=-=-=-=->', this.state.chat_id)
    const header = {
      "Content-Type": 'application/json',
      "token": token
    };

    const httpBody = {
      chat: {
        muted: this.state.mute_status == undefined ? false : this.state.mute_status
      }
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.putMuteUserCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      '/bx_block_chat/chats/' + this.state.chat_id
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "PUT"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  getPreviousChats = async () => {
    this.setState({ loading: true })
    const token = await getStorageData("authToken");

    const header = {
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getPrevChatsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "/bx_block_chat/chats"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  CheckWhetherChatExists = async () => {
    this.setState({ loading: true });
    console.log("receiver id state", this.state.received_id);
    const token = await getStorageData("authToken");

    const header = {
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getChatExistsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "/bx_block_chat/chats/get_chat_panal?user_id=" + this.state.received_id
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  goToLiveStream() {
    let data = {is_private: true, userID:this.state.received_id};
    const messagetoNavigate = new Message(getName(MessageEnum.NavigationMessage));
    messagetoNavigate.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    messagetoNavigate.addData(
      getName(MessageEnum.NavigationTargetMessage),
     "LiveStreaming"
    );

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );

    raiseMessage.addData(getName(MessageEnum.PostDetailDataMessage), data);
    messagetoNavigate.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    this.send(messagetoNavigate);
  }
  
  // Customizable Area End
}
