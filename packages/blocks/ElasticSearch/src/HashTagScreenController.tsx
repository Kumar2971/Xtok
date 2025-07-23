import { Message } from "../../../framework/src/Message";
import { BlockComponent } from '../../../framework/src/BlockComponent';
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { getStorageData } from "../../../framework/src/Utilities";
export const configJSON = require("./config");


export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  showTab: number;
  topPosts: any;
  topLoading: boolean;
  trendingPosts: any;
  trendingLoading: boolean;
  recentPosts: any;
  recentLoading: boolean;
  hashTag: string;
  posts: number;
  postType: string;
  topPageNumber: number;
  trendingPageNumber: number;
  recentPageNumber: number;
  topLastPage: number;
  trendingLastPage: number;
  recentLastPage: number;
  language: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class HashtagsController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  elasticSearchCallId: any;
  getTopId: any;
  getTrendingId: any;
  getRecentId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
    ];
    this.state = {
      showTab: 0,
      topPosts: [],
      topLoading: false,
      trendingPosts: [],
      trendingLoading: false,
      recentPosts: [],
      recentLoading: false,
      hashTag: '',
      posts: 0,
      postType: '',
      topPageNumber: 1,
      trendingPageNumber: 1,
      recentPageNumber: 1,
      topLastPage: 0,
      trendingLastPage: 0,
      recentLastPage: 0,
      language:"",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    const language = await getStorageData("SelectedLng");
    this.setState({language: language});
    const { data } = this.props.route.params;
    const hashTag = data.hashTag;
    const posts = data.posts;
    this.setState({hashTag: hashTag, posts: posts})
    this.getTopPosts(hashTag);
  }

  getTopPosts = async (hashTag: string) => {

    this.setState({ topLoading: true })
    this.getTopId=await this.apiCall({
      contentType:configJSON.hashTagApiContentType,
      method: configJSON.hashTagApiMethodType,
      endPoint:`${configJSON.hashTagPostsEndpoint}${hashTag.toLocaleLowerCase()}?hashtag_post_type=top_post&page=${this.state.topPageNumber}&per_page=20`
    })
  }

  getTrendingPosts=async(hashTag: string)=>{
    this.setState({trendingLoading:true})
    this.getTrendingId=await this.apiCall({
      contentType:configJSON.hashTagApiContentType,
      method: configJSON.hashTagApiMethodType,
      endPoint:`${configJSON.hashTagPostsEndpoint}${hashTag.toLocaleLowerCase()}?hashtag_post_type=hashtag_trending_posts&page=${this.state.trendingPageNumber}&per_page=20`
    })
  }

  getRecentPosts=async(hashTag: string)=>{
    this.setState({recentLoading:true})
    this.getRecentId=await this.apiCall({
      contentType:configJSON.hashTagApiContentType,
      method: configJSON.hashTagApiMethodType,
      endPoint:`${configJSON.hashTagPostsEndpoint}${hashTag.toLocaleLowerCase()}?page=${this.state.recentPageNumber}&per_page=20`
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

  async receive(from: string, message: Message) {
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
        if (apiRequestCallId === this.getTopId) {
          this.getTopSuccessCallback(responseJson)
        } else if (apiRequestCallId === this.getTrendingId) {
          this.getTrendingSuccessCallback(responseJson)
        } else if (apiRequestCallId === this.getRecentId) {
          this.getRecentSuccessCallback(responseJson)
        }
      } else if (responseJson?.errors) {
        if(apiRequestCallId === this.getTopId) {
          this.getTopFailureCallback(responseJson)
        } else if(apiRequestCallId === this.getTrendingId) {
          this.getTrendingFailureCallback(responseJson)
        } else if(apiRequestCallId === this.getRecentId) {
          this.getRecentFailureCallback(responseJson)
        }
      }
    }
  }

  lastPageFunc = (last_page: any) => {
    if(last_page){
      return last_page;
    }
  }

  getTopSuccessCallback = (res: any) => {
    const data = res.data;

    if (typeof(data[0]) === 'string') {
      this.setState({topPosts: [],topLoading:false, topLastPage: 1, topPageNumber: 1, posts: 0})
    } else {
      const last_page = res?.meta?.pagination?.total_pages ? res.meta.pagination.total_pages : 1
      const totalPosts = res?.meta?.pagination?.total_count
      if (this.state.topPageNumber === 1) {
        this.setState({
          topPosts: data,
          topLoading: false,
          topLastPage: this.lastPageFunc(last_page),
          topPageNumber: this.state.topPageNumber + 1,
          posts: totalPosts,
        })
      } else {
        this.setState({
          topPosts: data ? [...this.state.topPosts, ...data] : this.state.topPosts,
          topLoading: false,
          topLastPage: this.lastPageFunc(last_page),
          topPageNumber: this.state.topPageNumber + 1,
          posts: totalPosts,
        })
      }
    }
  }

  getTopFailureCallback = (res: any) => {
    this.setState({
      topPosts: [],
      topLoading: false,
      topPageNumber: this.state.topPageNumber,
    })
  }

  getTrendingSuccessCallback = (res: any) => {
    const data = res.data;
    if (typeof (data[0]) === 'string') {
      this.setState({ trendingPosts: [], trendingLoading: false, trendingLastPage: 1, trendingPageNumber: 1, posts: 0 })
    } else {
      const last_page = res?.meta?.pagination?.total_pages ? res.meta.pagination.total_pages : 1
      const totalPosts = res?.meta?.pagination?.total_count
      if (this.state.trendingPageNumber === 1) {
        this.setState({
          trendingPosts: data,
          trendingLoading: false,
          trendingLastPage: this.lastPageFunc(last_page),
          trendingPageNumber: this.state.trendingPageNumber + 1,
          posts: totalPosts,
        })
      } else {
        this.setState({
          trendingPosts: data ? [...this.state.trendingPosts, ...data] : this.state.trendingPosts,
          trendingLoading: false,
          trendingLastPage: this.lastPageFunc(last_page),
          trendingPageNumber: this.state.trendingPageNumber + 1,
          posts: totalPosts,
        })
      }
    }
  }

  getTrendingFailureCallback = (res: any) => {
    this.setState({
      trendingPosts: [],
      trendingLoading: false,
      trendingPageNumber: this.state.trendingPageNumber,
    })
  }

  getRecentSuccessCallback = (res: any) => {
    const data = res.data;
    if (typeof (data[0]) === 'string') {
      this.setState({ recentPosts: [], recentLoading: false, recentLastPage: 1, recentPageNumber: 1, posts: 0 })
    } else {
      const last_page = res?.meta?.pagination?.total_pages ? res.meta.pagination.total_pages : 1
      const totalPosts = res?.meta?.pagination?.total_count
      if (this.state.recentPageNumber === 1) {
        this.setState({
          recentPosts: data,
          recentLoading: false,
          recentLastPage: this.lastPageFunc(last_page),
          recentPageNumber: this.state.recentPageNumber + 1,
          posts: totalPosts,
        })
      } else {
        this.setState({
          recentPosts: data ? [...this.state.recentPosts, ...data] : this.state.recentPosts,
          recentLoading: false,
          recentLastPage: this.lastPageFunc(last_page),
          recentPageNumber: this.state.recentPageNumber + 1,
          posts: totalPosts,
        })
      }
    }
  }

  getRecentFailureCallback = (res: any) => {
    this.setState({
      recentPosts: [],
      recentLoading: false,
      recentPageNumber: this.state.recentPageNumber,
    })
  }
}
