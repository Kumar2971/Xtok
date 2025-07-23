import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { getStorageData } from "../../../framework/src/Utilities";
import { BackHandler } from "react-native";
import type {NativeEventSubscription} from 'react-native';
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  route: any;
  // Customizable Area Start
  elasticSearchCallId: any;
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  data: any[];
  error: any;
  value: string;
  selectedFollowers: any;
  searchData: any;
  imgList: any[];

  searchStatus: string;
  allStatusData: any[];
  location: string;
  colorId: string;
  locationPosts?: { attributes: { post_likes_count: number, post_comment_count: number, photo: string }, id: string, type: string }[];
  audioPosts: any[];
  audioPostType: 'recent' | 'top' | 'trending';
  quickFilter: 'recent' | 'top' | 'trending'
  statusId: number;
  searchTxt: string;
  backendData: any;
  hashTagData: any
  recentSearchHistoryData: any;
  token: string;
  toggleswitch: boolean;
  loader: boolean;
  posts: number;
  hashTagPageNumber: number;
  hashTagLastPage: number;
  language:any;
  userPage: number;
  showTabs: boolean;
  audioPageNum: number;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  elasticSearchCallId: any;
  // Customizable Area End
}

export default class ElasticSearchController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  elasticSearchCallId: any;
  hashTagSearchCallId: any;
  audioSearchCallId: any;
  recentSearchCallId: any;
  apiSaveSearchHistoryCallId: any;
  recentSearchIdDataCallId: any;
  backHandler?: NativeEventSubscription;
  deleteItemCallId: any;
  deleteItemallCallId: any;
  timeout: any;
  // Customizable Area End

  async componentDidMount() {
    super.componentDidMount();
    const language = await getStorageData("SelectedLng");
    this.setState({language:language})
    this.getToken();
    // this.backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   // this.backAction,
    // );
    this.checkData();
    this.onPressSearch()

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
      toggleswitch: true,
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      locationPosts: undefined,
      // Customizable Area Start
      token: "",

      value: "",
      error: null,
      selectedFollowers: [],
      searchData: [],
      searchStatus: "",
      searchTxt: "",
      location: "",
      colorId: "account",
      quickFilter: 'top',
      statusId: 0,
      loader: false,
      posts: 0,
      backendData: {},
      hashTagData: {},
      recentSearchHistoryData: [],
      hashTagPageNumber: 1,
      hashTagLastPage: 0,
      data: [
        {
          id: 1,
          name: "Jane Cooper",
          desc: "Love to travel",
          image: require("../assets/follower1.png"),
          follow: false,
        },
        {
          id: 2,
          name: "Wade Warren",
          desc: "Love to travel",
          image: require("../assets/follower2.png"),
          follow: false,
        },
        {
          id: 3,
          name: "Jenny Wilson",
          desc: "Follow me for baking tips",
          image: require("../assets/follower3.png"),
          follow: false,
        },
        {
          id: 4,
          name: "kristin Waston",
          desc: "Dog trainer",
          image: require("../assets/follower4.png"),
          follow: false,
        },
      ],
      imgList: [
        {
          id: 1,
          image: require("../assets/TiktokCover1.png"),
        },
        {
          id: 2,
          image: require("../assets/TiktokCover2.png"),
        },
        {
          id: 3,
          image: require("../assets/TiktokCover3.png"),
        },
        {
          id: 4,
          image: require("../assets/TiktokCover1.png"),
        },
        {
          id: 5,
          image: require("../assets/TiktokCover2.png"),
        },
        {
          id: 6,
          image: require("../assets/TiktokCover3.png"),
        },
        {
          id: 7,
          image: require("../assets/TiktokCover1.png"),
        },
      ],
      allStatusData: [
        {
          id: 1,
          name: "Jane Cooper",
          desc: "Love to travel",
          image: require("../assets/TiktokCover1.png"),
          follow: false,
          type: "location",
          locationImg: require("../assets/Location.png"),
        },
        {
          id: 2,
          name: "Wade Warren",
          desc: "Love to travel",
          image: require("../assets/TiktokCover2.png"),
          follow: false,
          type: "profile",
        },
        {
          id: 3,
          name: "Jenny Wilson",
          desc: "Follow me for baking tips",
          image: require("../assets/TiktokCover3.png"),
          follow: false,
          type: "hashtag",
          hashtag: require("../assets/hashTag.png"),
        },
        {
          id: 4,
          name: "kristin Waston",
          desc: "Dog trainer",
          image: require("../assets/TiktokCover1.png"),
          follow: false,
          type: "audio",
          hashtag: require("../assets/hashTag.png"),
        },
      ],
      language:"",
      userPage: 1,
      showTabs: true,
      audioPosts: [],
      audioPostType: 'top',
      audioPageNum:1,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }
  getRecentLocationsAPICallId: any;
  getTopLocationsAPICallId: any;
  getTrendingLocationsAPICallId: any;
  getAudioPostsAPICallId: any;

  getRecentLocationsSuccessCallBack = (dataMain: any) => {

    if (typeof(dataMain.data[0]) === 'string') {
      this.setState({locationPosts: [],loader:false, posts: 0})
    } else {
      const totalPosts = dataMain?.meta?.pagination?.total_count
      this.setState({ locationPosts: dataMain.data, loader: false, posts: totalPosts })
    }
  }
  getTrendingLocationsSuccessCallBack = (dataMain: any) => {

    if (typeof(dataMain.data[0]) === 'string') {
      this.setState({locationPosts: [],loader:false, posts: 0})
    } else {
      const totalPosts = dataMain?.meta?.pagination?.total_trending_post_count
      this.setState({ locationPosts: dataMain.data, loader: false, posts: totalPosts })
    }
  }
  getTopLocationsSuccessCallBack = (dataMain: any) => {

    if (typeof(dataMain.data[0]) === 'string') {
      this.setState({locationPosts: [],loader:false, posts: 0})
    } else {
      const totalPosts = dataMain?.meta?.pagination?.total_top_post_count
      this.setState({ locationPosts: dataMain.data, loader: false, posts: totalPosts })
    }
  }
  getAudioPostsSuccessCallBack = (result: any) => {
    if(result != null) {
    if (result?.errors ||(result?.data?.length > 0  && typeof(result?.data[0]) === 'string')) {
      this.setState({ audioPosts: [], posts: 0});
    }else{
      const total_count = result?.meta?.pagination?.total_count || 0;
      let newPosts = result?.data || [];
      if(newPosts?.length > 0){
        this.setState((prevState)=>({audioPosts:[...prevState?.audioPosts,...newPosts], posts: total_count}))
      }else{
        this.setState({ posts: total_count });
      }
    }
  }
  this.setState({loader:false});
  }

  //     // Customizable Area Start
  //     // Customizable Area End

  //   // Customizable Area Start
  //   // Customizable Area End
  // }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      runEngine.debugLog("API Message Recived", message);
      if (apiRequestCallId === this.elasticSearchCallId) {
        if (responseJson != null) {
          if (!responseJson.errors) {
            this.setState({
              backendData: responseJson,
              loader: false,
            });
            this.submitEditing()
          }
        }
      }
      if (apiRequestCallId === this.hashTagSearchCallId) {
        if (responseJson != null) {
          if (!responseJson.errors) {
            this.setState({
              colorId: 'hashtag',
              hashTagData: responseJson?.post?.data,
              loader: false,
            });
          }
        }
      }
      if(apiRequestCallId === this.audioSearchCallId){
        console.log('AUDIO SEARCH API CALLED', JSON.stringify(responseJson));
        if (responseJson != null) {
          if (!responseJson.errors) {
            this.setState({
              backendData: responseJson,
              loader: false,
            });
            this.submitEditing()
          }
        }
      }
      if(apiRequestCallId === this.getAudioPostsAPICallId){
        this.getAudioPostsSuccessCallBack(responseJson);
      }
      if (apiRequestCallId === this.recentSearchCallId) {
        this.setState({loader: false})
        if (responseJson != null) {
          if (!responseJson.errors) {
            console.log("Recent Data = ", JSON.stringify(responseJson.data?.searches_history))
            this.setState({
              recentSearchHistoryData: responseJson.data?.searches_history?responseJson.data?.searches_history:[],
            }, () => {
              console.log(this.state.recentSearchHistoryData);
            });
          }
        }
      }
      if (apiRequestCallId === this.deleteItemCallId) {
        if (responseJson != null) {
          if (!responseJson.errors) {
            this.setState({
              loader: false
            }, () => {
              console.log(this.state.recentSearchHistoryData);
            });
          }
        }
      }
      if (apiRequestCallId === this.deleteItemallCallId) {
        if (responseJson != null) {
          if (!responseJson.errors) {
            this.setState({
              recentSearchHistoryData: [],
              loader: false
            }, () => {
              console.log(this.state.recentSearchHistoryData);
            });
          }
        }
      }
      if (apiRequestCallId === this.getRecentLocationsAPICallId) {
        this.getRecentLocationsSuccessCallBack(responseJson);
      }
      if (apiRequestCallId === this.getTopLocationsAPICallId) {
        this.getTopLocationsSuccessCallBack(responseJson);
      }
      if (apiRequestCallId === this.getTrendingLocationsAPICallId) {
        this.getTrendingLocationsSuccessCallBack(responseJson);
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

  async getToken() {
    const token = await getStorageData("authToken", false);
    this.setState({
      token: token,
    }, () => this.onPressRecentSearch(this.state.token,1));

  }

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start

  apiCall = async (data: any) => {
    console.log("APICALL", data);

    const { setApiCallId, header, method, endPoint, body } = data;
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${endPoint}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        null
      );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return requestMessage.messageId;
  };

  getRecentLocations = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ loader: true });
    const apiEndPoint = `bx_block_posts/posts/recent_location_post?location=${this.props.route.params.location.description}&page=1&per_page=20`
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };

    this.getRecentLocationsAPICallId = await this.apiCall({
      setApiCallId: "recentLocationsApiCallId",
      header,
      method: configJSON.apiMethodTypeGet,
      endPoint: `${apiEndPoint}`,
      body: null
    });
  };
  getTrendingLocations = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ loader: true });
    const apiEndPoint = `bx_block_posts/posts/trending_location_post?location=${this.props.route.params.location.description}&page=1&per_page=20`
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };

    this.getTrendingLocationsAPICallId = await this.apiCall({
      setApiCallId: "trendingLocationsApiCallId",
      header,
      method: configJSON.apiMethodTypeGet,
      endPoint: `${apiEndPoint}`,
      body: null
    });
  };
  getTopLocations = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ loader: true });
    const apiEndPoint = `bx_block_posts/posts/top_location_post?location=${this.props.route.params.location.description}&page=1&per_page=20`
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };

    this.getTopLocationsAPICallId = await this.apiCall({
      setApiCallId: "topLocationsApiCallId",
      header,
      method: configJSON.apiMethodTypeGet,
      endPoint: `${apiEndPoint}`,
      body: null
    });
  };

  audioPostsOnEndReached = () => {
    let totalData = Number(this.state?.audioPosts?.length);
    if( totalData === this.state.audioPageNum * 20){
      this.setState({audioPageNum:this.state.audioPageNum+1},()=>{
        this.getAudioPosts(false)
      })
    }
  }

  getAudioTitle = (removeDot:boolean = false) => {
    const title = this.props.route?.params?.data?.title || this.props.route?.params?.data?.name || '';
    if(removeDot) return title?.replace(/\./g, '');
    return title;
  }
  
  getAudioPosts = async (load : boolean = true) => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ loader: load });
    let apiEndPoint='';
    switch (this.state.audioPostType) {
      case "recent":
        apiEndPoint = `/bx_block_posts/posts/audio_posts/${this.getAudioTitle(true)}?page=${this.state.audioPageNum}&per_page=20`;
        break;
      case "top":
       apiEndPoint = `/bx_block_posts/posts/audio_posts/${this.getAudioTitle(true)}?audio_post_type=top_post&page=${this.state.audioPageNum}&per_page=20`;
       break;
      case 'trending':
        apiEndPoint = `/bx_block_posts/posts/audio_posts/${this.getAudioTitle(true)}?audio_post_type=audio_trending_posts&page=${this.state.audioPageNum}&per_page=20`;
        break;
      default:
        break;
    }

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };

    this.getAudioPostsAPICallId = await this.apiCall({
      setApiCallId: "getRecentAudioAPICallId",
      header,
      method: configJSON.apiMethodTypeGet,
      endPoint: apiEndPoint,
      body: null
    });
  };

  checkData = () => {

    switch (this.state.quickFilter) {
      case "recent":
        return this.getRecentLocations();
      case "top":
        return this.getTopLocations();
      case 'trending':
        return this.getTrendingLocations();


      default:
        break;
    }
  };

  componentDidUpdate = (prevProps: any, prevState: any) => {
    if (
      this.state.quickFilter !== prevState.quickFilter
    ) {
        this.checkData();
    }
    if(this.state.audioPostType !== prevState?.audioPostType){
      this.getAudioPosts()
    }
  };


  onPressSearch = () => {
    this.setState({ searchStatus: "focus" });
    this.onPressRecentSearch(this.state.token,1)
  };
  onPressBlure = () => {
    this.setState({ searchStatus: "blure" });
  };
  submitEditing = () => {
    this.setState({ searchStatus: "submit" });
  };
  onPressCancleEditing = () => {
    this.setState({ searchStatus: 'blure', })
  }
  onPressColor = (id: any) => {
    this.setState({ colorId: id });
  };
  onSelectQuickFilter = (id: 'top' | 'trending' | 'recent') => {

    this.setState({ locationPosts: [], quickFilter: id });
  };
  onSelectAuidoPostType = (id: 'top' | 'trending' | 'recent') =>{
    this.setState({audioPosts:[], audioPostType:id, audioPageNum:1});
  };
  onPressStatusId = (id: any) => {
    this.setState({ statusId: id });
  };

  selectedFollowers = (selectedItem: any, index: number) => {
    let data = this.state.data;
    let updatedData = data.map((objA, index) => {
      if (objA.id == selectedItem.id) {
        return {
          ...objA,
          isFollow: !selectedItem.isFollow,
        };
      } else {
        return {
          ...objA,
        };
      }
    });
    this.setState({ data: updatedData });
  };

  onPressSearchFilter = (text: any) => {

    if (text == "" || text.length < 3) {
      this.setState({ searchStatus: "focus", value: text, recentSearchHistoryData: [], backendData: [] }, () => this.onPressRecentSearch(this.state.token,1));

      return;
    }
    this.setState({
      value: text,
      recentSearchHistoryData: [],
      backendData: [],
      hashTagData: [],
    },()=> {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.elasticSearchCallApi(text);
      }, 500)
    });
  };

  elasticSearchCallApi = (text:string) => {
    this.setState({loader: true})
    if(this.state.colorId==="audio"){
      this.getAudioList(text)
      return;
    }else if(this.state.colorId==="hashtag"){
      this.getHashTagList(text)
      return;
    }
    const header = {
      "Content-Type": " application/json",
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.elasticSearchCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.elasticSearchApiEndPoint}?page=${this.state.userPage}&per_page=100&q=${text || ""}`
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

  getHashTagList = (text: any) => {

    if (text == "") {
      this.setState({ searchStatus: "focus", value: text, recentSearchHistoryData: [], backendData: [], hashTagData: {} }, () => this.onPressRecentSearch(this.state.token,1));

      return;
    }
    this.setState({
      loader: true,
    });
    const header = {
      "Content-Type": " application/json",
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.hashTagSearchCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.hashtagSearchApiEndPoint}?q=${text}&page=1&per_page=2`
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

  getAudioList = (text: any) => {
    if (text == "") {
      this.setState({ searchStatus: "focus", value: text, recentSearchHistoryData: [], backendData: [] }, () => this.onPressRecentSearch(this.state.token,1));
      return;
    }
    this.setState({
      loader: true,
    });
    const header = {
      "Content-Type": " application/json",
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.audioSearchCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.audioListEndpoint}?q=${text}&page=1&per_page=5`
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
  }

  onPressSaveSearchHistory = (id?: number | null, type?: string | null, locationName?: string | null) => {
    const header = {
      "Content-Type": "application/json",
      token: this.state.token,
    };

    let httpBody = {}

    if(locationName === null) {
      httpBody = {
        "query": this.state.value,
        "searchable_type": type,
        "searchable_id": id,
      };
    } else {
      httpBody = {
        "query": this.state.value,
        "searchable_type": type,
        "searchable_id": null,
        "location_name": locationName
      };
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiSaveSearchHistoryCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.saveSearchHistory
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
      configJSON.httpPostMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    console.log('--------------------------------------------')
    console.log(requestMessage);
    console.log('--------------------------------------------')
  }

  onPressRecentSearch = (token: string, page: number, seeall?: any) => {
    console.log('Your token is :- ', token);
    const header = {
      "Content-Type": "application/json",
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.recentSearchCallId = requestMessage.messageId;
    if (seeall) {
      console.log("See all")
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `${configJSON.recentsearchAll}?page=${page}&per_page=${configJSON.limit}`
      );

    } else {
      console.log("See all no")
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `${configJSON.recentSearchHistory}`
      );
    }
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

  }
seeAll =()=>{
  this.onPressRecentSearch(this.state.token,1,"seeAll")
  this.setState({toggleswitch:false,loader:true})
}
clearAll =()=>{
  this.setState({toggleswitch:true})
  this.deleteApallcall()
}

searchType = (item:any) => {
  switch (item.type) {
    case 'account':
      return "AccountBlock::Account";
    case 'hashtag':
     return "BxBlockTags::Tag";
    case 'audio':
     return "BxBlockAudiolibrary::Audio";
    case 'location':
      return "BxBlockLocation::LocationHistory";
  }

}
deletesingle =(itemId:any)=>{
  console.log("itemId...............",itemId)
  let data =this.state.recentSearchHistoryData.filter((x:any) => {
    return x.id != itemId.id;
  })
  console.log("checkingggggggggg",data)
  this.setState({
    recentSearchHistoryData:data
  },()=>{
    this.deleteApcall(itemId)
  })

  }
  deleteApcall = (item?: any) => {
    const type = this.searchType(item);
    const header = {
      "Content-Type": "application/json",
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteItemCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleterecentHistory + `?type=${type}&id=${item.id}`
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
  }
  deleteApallcall = () => {
    const header = {
      "Content-Type": "application/json",
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteItemallCallId = requestMessage.messageId;

    this.setState({
      loader: true
    })
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.deleteallrecentHistory}`
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
  }

  // Customizable Area End
}
