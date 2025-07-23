import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { getStorageData } from "../../../framework/src/Utilities";
import { translate } from "../../../components/src/i18n/translate";
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
  loading: boolean;
  data: any[];
  error: any;
  value: string;
  selectedFollowers: any;
  searchData: any;
  token: string;
  userId: string | null;
  backendData: any;
  isScreenFrom: any;
  followings: any[];
  showLoader: boolean;
  type: "followings" | "followers" | "Signup";
  followers: any[];
  owner: boolean;
  myID: string;
  myFollowings: any[];
  myFollowers: any[];
  exploreUsers: any[];
  language: any;
  page: number;
  searchPage : number;
  isFromPrivacySafety: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  elasticSearchCallId: any;
  // Customizable Area End
}

export default class FollowersController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  arrayholder: any[] = [];
  elasticSearchCallId: any;
  followUserApiId: any;
  requestUserApiId: any;
  cancelRequestApiId: any;
  perPage : number = 20;
  timeout:any;
  async componentWillUnmount() {
    this.props.navigation.removeListener('focus');
  }

  // Customizable Area End


  async componentDidMount() {
    super.componentDidMount();
    this.getToken().then(async () => {

      if (this.props?.route?.params?.title == `${translate("followed_accounts")}`) {
        this.setState({ isFromPrivacySafety: true })
      } else {
        this.setState({ isFromPrivacySafety: false })
      }

      if (!this.props.route.params || !this.props.route.params.type) {
        await this.fetchExplore()
      } else {
        await this.fetchMyFollowers();
        if (this.props.route.params.type === "followings") {
          await this.fetchFollowings();
        } else {
          await this.fetchFollowers();
        }
      }
    })
  }

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      loading: false,
      page: 1,
      error: null,
      value: "",
      token: "",
      myID: "",
      userId: null,
      backendData: {},
      selectedFollowers: [],
      searchData: [],
      myFollowings: [],
      myFollowers: [],
      data: [
        {
          id: 1,
          name: "Jane Cooper",
          desc: "Love to travel",
          image: require("../assets/follower1.png"),
          follow: false
        },
        {
          id: 2,
          name: "Wade Warren",
          desc: "Love to travel",
          image: require("../assets/follower2.png"),
          follow: false
        },
        {
          id: 3,
          name: "Jenny Wilson",
          desc: "Follow me for baking tips",
          image: require("../assets/follower3.png"),
          follow: false
        },
        {
          id: 4,
          name: "kristin Waston",
          desc: "Dog trainer",
          image: require("../assets/follower4.png"),
          follow: false
        }
      ],
      isScreenFrom: "",
      followings: [],
      showLoader: true,
      type: "Signup",
      followers: [],
      owner: false,
      exploreUsers: [],
      language: "",
      isFromPrivacySafety: false,
      searchPage: 1,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && !responseJson.errors) {
        switch (apiRequestCallId) {
          case this.getFollowingsId:
            this.getFollowingsSuccessCallback(responseJson);
            break;
        
          case this.getFollowersId:
            this.getFollowersSuccessCallback(responseJson);
            break;
        
          case this.searchFollowingsId:
            this.searchFollowingsSuccessCallback(responseJson);
            break;
        
          case this.searchFollowersApiId:
            this.searchFollowersSuccessCallback(responseJson);
            break;
        
          case this.searchExploreApiId:
            this.searchExploreSuccessCallback(responseJson);
            break;
        
          case this.getMyFollowingsId:
            this.getMyFollowingsSuccessCallback(responseJson);
            break;
        
          case this.getMyFollowersId:
            this.getMyFollowersSuccessCallback(responseJson);
            break;
        
          case this.fetchExploreApiId:
            this.fetchExploreSuccessCallback(responseJson);
            break;
        
          case this.fetchMoreExploreApiId:
            this.fetchMoreExploreSuccessCallback(responseJson);
            break;
        
          case this.requestUserApiId:
            this.requestUserApiSuccessCall(responseJson)
            break;
        
          case this.followUserApiId:
            this.followUserApiSuccessCall(responseJson)
            break;
        
          case this.cancelRequestApiId:
            this.cancelRequestApiSuccessCall(responseJson)
            break;
        
          default:
            // Handle other cases or provide a default action
        }
        
      } else if (responseJson?.errors) {
        switch (apiRequestCallId) {
          case this.getFollowingsId:
            this.getFollowingsFailureCallback(responseJson);
            break;
        
          case this.searchFollowingsId:
            this.searchFollowingsFailureCallback(responseJson);
            break;
        
          case this.searchFollowersApiId:
            this.searchFollowersFailureCallback(responseJson);
            break;
        
          case this.getMyFollowingsId:
            this.getMyFollowingsFailureCallback(responseJson);
            break;
        
          case this.fetchExploreApiId:
            console.log("responseJson", responseJson);
            this.fetchExploreFailureCallback(responseJson);
            break;
        
          case this.getMyFollowersId:
            this.getMyFollowersFailureCallback(responseJson);
            break;
        
          default:
            // Handle other cases or provide a default action
        }
      }

      runEngine.debugLog("API Message Recived", message);
    }

    // Customizable Area Start
    // const apiRequestCallId = message.getData(
    //   getName(MessageEnum.RestAPIResponceDataMessage)
    // );
    // const responseJson = message.getData(
    //   getName(MessageEnum.RestAPIResponceSuccessMessage)
    // );



    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const FollowersDataMessage = message.getData(
        getName(MessageEnum.FollowersDataMessage)
      );
      if (FollowersDataMessage) {
        const { isScreenFrom } = FollowersDataMessage;
        this.setState({ isScreenFrom: isScreenFrom });
      }
    }
    // Customizable Area End
  }
  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address"
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

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
    body && type != 'formData'
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

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible
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

  async getToken() {
    return new Promise(async (resolve, reject) => {
      const language = await getStorageData("SelectedLng");
      const myID = (await getStorageData('userID', false)) || '';
      const token = await getStorageData("authToken", false);
      if (!token) {
        reject("Token not found");
      }
      this.setState({
        type: (!this.props.route.params || !this.props.route?.params?.type)
          ? 'Signup'
          : this.props.route?.params?.type,
        owner: !this.props.route.params ? true : myID === this.props.route.params.userID,
        token: token,
        language,
        myID
      });
      resolve(token);
    })
  }

  // Customizable Area Start
  onLoadMoreFollowers = () => {
    if(this.state.value.length > 0){
      this.setState((prevState)=>({searchPage : prevState.searchPage + 1}),()=>{
        this.searchApiCalls(this.state.value, this.state.searchPage)
      })
      return
    }
    const oldData = this.props.route.params.type === "followings" ? this.state.followings : this.state.followers;
    if(oldData.length == this.state.page * this.perPage){
      this.setState({ page: this.state.page + 1 , showLoader : true}, async() => {
        if (this.props.route.params.type === "followings") {
          await this.fetchFollowings();
        } else {
          await this.fetchFollowers();
        }
    })
    }
  }
  requestUserApiSuccessCall = (responseJson:any) => {
    if (this.state.type !== 'Signup') {
     this.commonFunc("Requested")
    } else {
      this.newArrayFollowers()
    }
  }

  followUserApiSuccessCall = (responseJson:any) => {
    if (this.state.type !== 'Signup') {
     this.commonFunc("following")
    } else {
      this.newArrayFunc()
    }
    this.setState({
      myFollowings: [...this.state.myFollowings, { account_id: this.state.userId }]
    });
  }

  commonFunc = (followStatus:any) => {
    if (this.props.route.params.type === "followings") {
      const newArray = this.state.followings.map(item => {
        if (item.id === this.state.userId) {
          return {
            ...item,
            account_follow_status: followStatus,
          };
        }
        return item;
      });
      this.setState({ followings: newArray });
    } else {
      const newArray = this.state.followers.map(item => {
        if (item.id === this.state.userId) {
          return {
            ...item,
            account_follow_status: followStatus,
          };
        }
        return item;
      });
      this.setState({ followers: newArray });
    }
  }

  cancelRequestApiSuccessCall = (responseJson:any) => {
    if (this.state.type !== 'Signup') {
      if (this.props.route.params.type === "followings") {
        const newArray = this.state.followings.map(item => {
          if (item.id === this.state.userId) {
            return {
              ...item,
              account_follow_status: "Follow",
            };
          }
          return item;
        });
        this.setState({ followings: newArray });
      } else {
        this.newArrayFollowing()
      }
    } else {
      const newArray = this.state.exploreUsers.map(item => {
        if (item.id === this.state.userId) {
          return {
            ...item,
            account_follow_status: "Follow",
          };
        }
        return item;
      });
      this.setState({ exploreUsers: newArray });
    }
  }

  newArrayFunc = () => {
    const newArray = this.state.exploreUsers.map(item => {
      if (item.id === this.state.userId) {
        return {
          ...item,
          account_follow_status: "following",
        };
      }
      return item;
    });
    this.setState({ exploreUsers: newArray });
  }

  newArrayFollowers = () => {
    const newArray = this.state.exploreUsers.map(item => {
      if (item.id === this.state.userId) {
        return {
          ...item,
          account_follow_status: "Requested",
        };
      }
      return item;
    });
    this.setState({ exploreUsers: newArray });
  }

  newArrayFollowing = () => {
    const newArray = this.state.followers.map(item => {
      if (item.id === this.state.userId) {
        return {
          ...item,
          account_follow_status: "Follow",
        };
      }
      return item;
    });
    this.setState({ followers: newArray });
  }

  fetchExploreSuccessCallback = (responseJson: any) => {
    this.setState({ exploreUsers: responseJson?.account, loading: false, showLoader: false });
  };
  fetchMoreExploreSuccessCallback = (responseJson: any) => {
    let response = responseJson.account ? responseJson.account : []
    this.setState({ exploreUsers: [...this.state.exploreUsers, ...response], loading: false, showLoader: false });
  }
  fetchExploreFailureCallback = (responseJson: any) => {
    this.setState({ exploreUsers: [] });
  };
  getMyFollowingsSuccessCallback = (responseJson: any) => {
    this.setState({ myFollowings: responseJson?.followings });
  };
  getMyFollowersSuccessCallback = (responseJson: any) => {
    this.setState({ myFollowers: responseJson?.followers });
  };
  getMyFollowingsFailureCallback = (responseJson: any) => {
    this.setState({ myFollowings: [] });
  };
  getMyFollowersFailureCallback = (responseJson: any) => {
    this.setState({ myFollowers: [] });
  };
  staticDataButtonText = (item: any) => {
    const isFollowed = Boolean(this.state.myFollowings.find((element: any) => element?.account_id === item?.id))
        if (item?.account_status === 'Public') {
      if (item.account_follow_status == 'following' && isFollowed )
        return translate('unfollow')
      return translate('Follow')
    } else if (item?.account_follow_status && item?.account_follow_status.toLowerCase() === 'requested') {
        return translate('requested')
      } else if (item?.account_follow_status && item?.account_follow_status.toLowerCase() === 'follow') {
        return translate('follow')
      } else {
        return translate('following')
      }
  }

  getFollowingStatus = (status : string,) => {
    const statusLowercase = status?.toLocaleLowerCase()
    if(statusLowercase === "following"){
      return translate("following")
    }else if(statusLowercase === "requested"){
      return translate("requested")
    }else{
      return translate('follow')
    }
  }
  followButtonTitle = (account_id: string, status : string) => {
    const isOwnerAndFollowings = Boolean(
      this.props?.route?.params?.type === "followings" && this.state.owner
    );
    const isNotOwnerAndFollowings = Boolean(
      this.props?.route?.params?.type === "followings" && !this.state.owner
    );
    const isOwnerAndFollowers = Boolean(
      this.props.route.params?.type === "followers" && this.state.owner
    );
    const isNotOwnerAndFollowers = Boolean(
      this.props.route.params?.type === "followers" && !this.state.owner
    );
    if (isOwnerAndFollowings) {
      return translate("unfollow");
    } else if (isNotOwnerAndFollowings) {
      return this.getFollowingStatus(status);
    } else if (isOwnerAndFollowers) {
      return translate("Remove");
    } else if (isNotOwnerAndFollowers) {
      return this.getFollowingStatus(status)
    }
    return "";
  };

  followBtnText = (account_id:any) => {
    const isFollowed = Boolean(
      this.state.myFollowings.find(
        (item: any) => item?.account_id === account_id
      )
    );
    return isFollowed ? translate("following") : translate("Follow");
  }

  handleUserProfileNavigation = (item : any) => {
    const isMe = item.account_id?.toString() === this.state.myID;
    this.props.navigation.navigate("UserProfileBasicBlock", {
      data: {
        attributes: {
          account_id: isMe ? null : item.account_id,
        }
      }
    })
  }

  unfollowUser = async (userID: string) => {
    this.handleExploreUnfollow(userID);
    await this.apiCall({
      method: "DELETE",
      contentType: configJSON.validationApiContentType,
      endPoint: `${configJSON.allFollowersEndpoint}/${userID}`
    }).then(() => {
      if (!this.props.route) {
        this.setState({
          myFollowings: this.state.myFollowings.filter(
            (item: any) => item?.account_id !== userID
          ),
          followers: this.state.followings.filter(
            (item: any) => item?.account_id !== userID
          )
        });
      } else if (this.props.route.params.type === "followers") {
        const newArray = this.state.followers.map(item => {
          if (item.id === userID) {
            return {
              ...item,
              account_follow_status: "Follow",
            };
          }
          return item;
        });
        this.setState({ followers: newArray });
        if (this.state.owner) {
          this.setState({
            myFollowings: this.state.myFollowings.filter(
              (item: any) => item?.account_id !== userID
            ),
            followings: this.state.followings.filter(
              (item: any) => item?.account_id !== userID
            )
          });
          return;
        } else {
          this.setState({
            myFollowings: this.state.myFollowings.filter(
              (item: any) => item?.account_id !== userID
            )
          });
        }

      } else {
        this.handleExploreUnfollow(userID);
        const newArray = this.state.followings.map(item => {
          if (item.id === userID) {
            return {
              ...item,
              account_follow_status: "Follow",
            };
          }
          return item;
        });
        this.setState({ followings: newArray });
        if (this.state.owner) {
          this.setState({
            myFollowings: this.state.myFollowings.filter(
              (item: any) => item?.account_id !== userID
            ),
            followings: this.state.followings.filter(
              (item: any) => item?.account_id !== userID
            )
          });
          return;
        } else {
          this.setState({
            myFollowings: this.state.myFollowings.filter(
              (item: any) => item?.account_id !== userID
            )
          });
        }
      }
    });
  };
  removeUser = async (userID: string) => {
    await this.apiCall({
      method: "DELETE",
      contentType: configJSON.validationApiContentType,
      endPoint: `${configJSON.removeFollowerEndpoint}?id=${userID}`
    }).then(() => {
      this.setState({
        followers: this.state.followers.filter(
          (item: any) => item?.account_id !== userID
        )
      });
    });
  };
  handleExploreUnfollow = (userID:string) => {
    const newArray = this.state.exploreUsers.map(item => {
      if (item.id === userID) {
        return {
          ...item,
          account_follow_status: "Follow",
        };
      }
      return item;
    });
    this.setState({ exploreUsers: newArray });
  }
  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchMoreExplore();
    })
  }
  fetchExplore = async (page?:number) => {
    this.fetchExploreApiId = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: `${configJSON.exploreUsers}&per_page=10&page=${page==1 ? page : this.state.page}`,
    });
  };
  fetchMoreExplore = async () => {
    this.fetchMoreExploreApiId = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: `${configJSON.exploreUsers}&per_page=10&page=${this.state.page}`,
    });
  };
  cancelRequest = async (userId: string) => {
    this.setState({userId: userId})
      this.cancelRequestApiId= await this.apiCall({
        contentType: "application/json",
        method:"PATCH",
        endPoint:`${configJSON.cancelRequest}?id=${userId}`,
        body: {
            "id": userId
        },
      })
  }
  followUser = async (item: any) => {
    const userId = item.id
    this.setState({ userId: userId })
    if (item.account_status === 'Private') {
      this.requestUserApiCall(userId)
    } else if (item.is_private === 'Private') {
      this.requestUserApiCall(userId)
    } else {
      this.followUserApiId = await this.apiCall({
        contentType: "application/json",
        method: "POST",
        endPoint: configJSON.addFollowingApiEndPoint,
        body: {
          "data": {
            "type": "follows",
            "attributes": {
              "account_id": userId
            }
          }
        },
      })
    }
  };

  requestUserApiCall = async(userId:any) => {
    this.requestUserApiId = await this.apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: configJSON.followRequestPrivate,
      body: {
        "data": {
          "account_id": userId
        }
      },
    })
  }

  getFollowingsFailureCallback = (res: any) => {
    this.setState({ followings: [], showLoader: false });
  };

  getFormattedAccountDetails = (data : any) => {
    let newData = data.map((item: any) => {
      return {
        ...item,
        ...item.account_details,
      };
    });
    return newData;
  }

  isValidResponse = (res : any , data : any) => {
    return (res && Array.isArray(data))
  }

  getFollowingsSuccessCallback = (res: any) => {
    if(!this.isValidResponse(res, res.followings)) return;
    const newFollowingData = this.getFormattedAccountDetails(res.followings);
    if(this.state.page === 1){
      this.setState({
        followings: newFollowingData,
        showLoader: false
      });
    }else if(this.state.page > 1 && newFollowingData.length > 0){
      this.setState((prevState)=>({followings : [...prevState.followings, ...newFollowingData],showLoader : false}))
    }else{
      this.setState({showLoader:false})
    }
  };
  getFollowersSuccessCallback = (res: any) => {
    if(!this.isValidResponse(res, res.followers)) return;
    let mapData = res.followers.map((item: any) => {
      return {
        ...item,
        ...item.account_details,
        //Remove this line when BACKEND fixes issue
        account_id: item.current_user_id
      };
    })
    if(this.state.page === 1){
      this.setState({
        followers: mapData,
        showLoader: false
      });
    }else if(this.state.page > 1 && mapData.length > 0){
      this.setState((prevState)=>({followers : [...prevState.followers, ...mapData],showLoader : false}))
    }
  };
  
  getNewFormattedData = (apiResponse : any) => {
    const formattedData = apiResponse.map((item: any) => {
      return {
        ...item,
        account_id: item.id
      };
    });
    return formattedData;
  }

  searchFollowingsSuccessCallback = (res: any) => {
    if(!this.isValidResponse(res, res.followings)) return;
    const newFollowingsData = this.getNewFormattedData(res.followings);
    if(this.state.searchPage == 1){
    this.setState({
      followings: newFollowingsData,
      showLoader: false
    });
  }else if(this.state.searchPage > 1 && newFollowingsData.length > 0){
    this.setState((prevState)=>({followings : [...prevState.followings, ...newFollowingsData],showLoader: false}))
  }
  };
  searchFollowersSuccessCallback = (res: any) => {
    if(!this.isValidResponse(res, res.followers)) return;
    const newFollowersData = this.getNewFormattedData(res.followers);
    if(this.state.searchPage == 1){
    this.setState({
      followers: newFollowersData,
      showLoader: false
    });
    }else if(this.state.searchPage > 1 && newFollowersData.length > 0){
      this.setState((prevState)=>({followers : [...prevState.followers, ...newFollowersData],showLoader: false}))
    }
  };
  searchExploreSuccessCallback = (res: any) => {
    if(!this.isValidResponse(res, res.account)) return;
    if(this.state.searchPage == 1){
      this.setState({ exploreUsers: res.account, showLoader: false });
    }else if(this.state.searchPage > 1){
      this.setState((prevState)=>({exploreUsers : [...prevState.exploreUsers, ...res.account], showLoader: false}));
    }
  };
  searchExploreFailureCallback = (res: any) => {
    this.setState({ exploreUsers: [], showLoader: false });
  };
  searchFollowingsFailureCallback = (res: any) => {
    this.setState({ followings: [], showLoader: false });
  };
  searchFollowersFailureCallback = (res: any) => {
    this.setState({ followers: [], showLoader: false });
  };

  onRefreshing = () => {
    this.setState({page:1},()=>{
      if (this.props.route.params?.type === "followers") {
        this.fetchFollowers();
      } else {
        this.fetchFollowings();
      }
    });
  }

  fetchFollowings = async () => {
    console.log('log 2')
    this.getFollowingsId = await this.apiCall({
      method: configJSON.validationApiMethodType,
      contentType: configJSON.validationApiContentType,
      endPoint: `${configJSON.allFollowersEndpoint}?id=${this.props.route.params.userID}&page=${this.state.page}&per_page=${this.perPage}`
    });
  };
  fetchMyFollowings = async () => {
    const userID = await getStorageData("userID", false);
    this.getMyFollowingsId = await this.apiCall({
      method: configJSON.validationApiMethodType,
      contentType: configJSON.validationApiContentType,
      endPoint: `${configJSON.allFollowersEndpoint}?id=${userID}`
    });
  };
  fetchFollowers = async () => {
    this.getFollowersId = await this.apiCall({
      method: configJSON.validationApiMethodType,
      contentType: configJSON.validationApiContentType,
      endPoint: `${configJSON.allFollowersEndpoint}/${this.props.route.params.userID}/followers?page=${this.state.page}&per_page=${this.perPage}`
    });
  };
  fetchMyFollowers = async () => {
    const userID = await getStorageData("userID", false);
    this.getMyFollowersId = await this.apiCall({
      method: configJSON.validationApiMethodType,
      contentType: configJSON.validationApiContentType,
      endPoint: `${configJSON.allFollowersEndpoint}/${userID}/followers`
    });
  };
  getFollowingsId: string = "";
  getMyFollowingsId: string = "";
  getMyFollowersId: string = "";
  getFollowersId: string = "";
  searchFollowingsId: string = "";
  fetchExploreApiId: string = "";
  fetchMoreExploreApiId: string = "";
  searchFollowersApiId: string = "";
  searchExploreApiId: string = "";
  goToLoginSuccess() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationLoginSuccessMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.LoginSuccessDataMessage), {
      isScreenFrom: "Signup"
    });
    this.send(msg);
  }
  searchFilterFunction = (text: string) => {
    this.setState({
      value: text,
      searchPage: 1,
    });
    if (text === "") {
      this.onRefreshing();
      return;
    }
    if (text.length < 3) {
      return
    }
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.searchApiCalls(text);
    }, 500)
  };

  searchApiCalls = async(text: string, page : number = 1) => {
    this.setState({showLoader: true})
    if (this.state.type === "followings") {
      this.searchFollowingsId = await this.apiCall({
        method: configJSON.validationApiMethodType,
        contentType: configJSON.validationApiContentType,
        endPoint: `${configJSON.allFollowersEndpoint}?id=${this.props.route.params.userID}&query=${text}&page=${page}&per_page=${this.perPage}`
      });
    } else if (this.state.type === "followers") {
      this.searchFollowersApiId = await this.apiCall({
        method: configJSON.validationApiMethodType,
        contentType: configJSON.validationApiContentType,
        endPoint: `${configJSON.allFollowersEndpoint}/${this.props.route.params.userID}/followers?query=${text}&page=${page}&per_page=${this.perPage}`
      });
    } else {
      this.searchExploreApiId = await this.apiCall({
        method: configJSON.validationApiMethodType,
        contentType: configJSON.validationApiContentType,
        endPoint: `${configJSON.exploreUsers}${text}&page=${page}&per_page=${this.perPage}`
      });
    }
  };
  // Customizable Area End
}
