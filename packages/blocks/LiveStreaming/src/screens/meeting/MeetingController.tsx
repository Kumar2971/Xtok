import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

// Customizable Area Start
import  { createRef } from "react";
import storage from "framework/src/StorageProvider";
import createRequestMessage from "../../helpers/create-request-message";
import { handleResponseMessage } from "../../helpers/handle-response-message";
import { ActiveMeetingStream, LiveStream } from "../../Types";
import { BackHandler } from "react-native"
import { getStorageData } from "../../../../../framework/src/Utilities";
import React from "react";
import { StackActions } from "@react-navigation/native";
import SoundPlayer from 'react-native-sound-player'
//import PubSub, {PUBLISH_KEY} from "./Components/ChatViewer/Pubsub";
//import { usePubSub } from "@videosdk.live/react-sdk";
// Customizable Area End

export const configJSON = require("../../config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: any
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  authToken: string;
  giftmodel: boolean;
  value: any;
  invitationModel: boolean;
  searchresult: any;
  fresh:boolean;
  loader: boolean;
  recentsearch: boolean;
  lottieAnimation: {
    show: boolean,
    url: string,
    audioUrl: string,
    json:string
    positionTop: number,
    positionLeft: number,
  }
  inviteButtonDisable: boolean;
  selectedInviteData: any;
  gitfmodel:boolean;
  categories: any;
  catalogue: any;
  coins_count: any;
  selectedCatalogue: any;
  selectedTab: any;
  indexss: any;
  catalogueIndex: any;
  apiLoader: boolean;
  scoreUserDetails: any;
  defaultCatalogue: any;
  language:any;
  loggeduserImage: string;
  comments:any;
  DATA:any;
  chatMessage:any;
  snapTo:any
  selectedCatalogueId:any;
  selectedCatalogueURL:any;
  isCoinSent: boolean;
  isLive:boolean;
  alertModal:any;
  IsSelected:boolean;
  isCatalogueLoading:boolean;
    // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class MeetingController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  fetchSessionCallId: string = "";
  getAccountsForAudioId: string = "";
  startRecordingCallId: string = "";
  stopRecordingCallId: string = "";
  startRtmpStreamCallId: string = "";
  stopRtmpStreamCallId: string = "";
  startHLSStreamCallId: string = "";
  stopHLSStreamCallId: string = "";
  activeHLSStreamCallId: string = "";
  deactivateStreamCallId: string = "";
  statusjoinCallId: string = "";
  statusleaveCallId: string = "";
  senddataCallId: string = "";
  inviteParticipantApiCallId: string = "";
  setDownStreamURL?: React.Dispatch<React.SetStateAction<string>>;
  acceptInviteApiCallId: string = '';
  removeParticipants_CallID :string = '';
  categoriesApiCallId:string='';
  getCoinBalanceApiCallId:string='';
  catalogueApiCallId:string='';
  updatelivescoreApiCallId:string='';
  updatescoreApiCallId:string='';
  sendCommentsApiCallId:string = '';
  getCommentsCallId:string = '';
  animationQueue: {
    show: boolean,
    url: string,
    audioUrl: string,
    json:string,
    positionLeft: number,
    positionTop: number,
  }[] = [];
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
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
      authToken: "",
      invitationModel: false,
      value: "",
      searchresult: [],
      loader: false,
      recentsearch: false,
      isLive:false,
      lottieAnimation: {
        show: false,
        url: "",
        audioUrl: "",
        json:"",
        positionTop: 0,
        positionLeft: 0,
      },
      inviteButtonDisable: false,
      selectedInviteData: {},
      gitfmodel:false,
      fresh:true,
      categories:[],
      catalogue: [],
      coins_count: 0,
      selectedCatalogue:[],
      selectedTab: null,
      indexss: 0,
      catalogueIndex: [],
      apiLoader:false,
      giftmodel:false,
      scoreUserDetails:{},
      defaultCatalogue: {},
      language:"",
      loggeduserImage:'',
      comments:"",
      DATA:[],
      chatMessage:"",
      snapTo:0,
      selectedCatalogueId:"",
      selectedCatalogueURL:"",
      isCoinSent: false,
      alertModal:{
      openAlertModal: false,
      alertMsg: "",
      },
      IsSelected:false,
      isCatalogueLoading:false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    //console.log('lsdkjfhaljksdf', PUBLISH_KEY)
    // Customizable Area End
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
      case this.deactivateStreamCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {

            console.log('deactivateStreamCallId', responseDataJson)
          },
          onFail: () => {
            console.log('deactivateStreamCallId error', responseDataJson)
          },
        });
        break;
      }
      case this.fetchSessionCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => { },
          onFail: () => {
            this.setState({invitationModel:false, alertModal:{openAlertModal: true, alertMsg: "session Failed. Please retry!" }})
          }
        });
        break;
      }
      case this.getAccountsForAudioId: {
        console.log('ACCOUNTS YOYOSU', responseDataJson)
        this.setState({ loader: false })
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => { this.setState({ searchresult: responseDataJson?.account }) },
          onFail: () => {
            this.setState({invitationModel:false, alertModal:{openAlertModal: true, alertMsg: "session Failed. Please retry!" }})
          },
        });
        break;
      }
      case this.startRecordingCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({
              isLive:true,
            })
          },
          onFail: () => {
            console.log("startrecordingdata error=========", errorDataJson);
            console.log("startrecordingdata responseDataJson=========", responseDataJson);
            this.setState({invitationModel:false, alertModal:{openAlertModal: true, alertMsg: "Recording live stream is facing issues. Please try again later!" }})
          },
        });
        break;
      }
      case this.stopRecordingCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({
              isLive:false,
            })
          },
          onFail: () => {
            this.setState({invitationModel:false, alertModal:{openAlertModal: true, alertMsg: "recording failed. Please retry!" }})
          },
        });
        break;
      }
      case this.stopRtmpStreamCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({invitationModel:false, alertModal:{openAlertModal: true,  alertMsg: "rtmp stopped" }})


          },
          onFail: () => {
            this.setState({invitationModel:false, alertModal:{openAlertModal: true, alertMsg: "stop rtmp Failed. Please retry!" }})
          },
        });
        break;
      }
      case this.startRtmpStreamCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({invitationModel:false, alertModal:{openAlertModal: true,  alertMsg: "rtmp stopped" }})


          },
          onFail: () => {
            this.setState({invitationModel:false, alertModal:{openAlertModal: true,alertMsg: "Start rtmp Failed. Please retry!" }})
          },
        });
        break;
      }
      case this.startHLSStreamCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({
              isLive:true,
            })
            console.log("hls success",responseDataJson);
           },
          onFail: () => {
            console.log('hls fail', responseDataJson)
          },
        });
        break;
      }
      case this.stopHLSStreamCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            console.log('stopHLSStreamCallId onSuccess error',errorDataJson)
            console.log('stopHLSStreamCallId onSuccess',responseDataJson)
            this.props.route?.params?.eventId && this.sendData();
            this.setState({
              isLive:false,
            },()=>{
              this.props.route?.params?.eventId  && this.sendData();
            })
        },
          onFail: () => {
            console.log('stopHLSStreamCallId onFail',responseDataJson)
            console.log('stopHLSStreamCallId onFail error',errorDataJson)
            this.setState({invitationModel:false, alertModal:{openAlertModal: true, alertMsg:"Live failed for live stream. Will try fetching it again!"}})

          },
        });
        break;
      }
      case this.senddataCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => { },
          onFail: () => {
          },
        });
        break;
      }

      case this.activeHLSStreamCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setDownStreamURL &&
              this.setDownStreamURL(responseDataJson.data.data.downstreamUrl);
              if(responseDataJson.data.data.downstreamUrl||responseDataJson.data.data.downstreamUrl!==''){
                this.setState({
                  isLive:true
                })
              }else{
                this.setState({
                  isLive:false
                })
              }

          },
          onFail: () => {
            this.setState({invitationModel:false, alertModal:{openAlertModal: true,alertMsg: "stop live Failed. Please retry!"}})
          },
        });
        break;
      }
      case this.statusjoinCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => { },
          onFail: () => {
          },
        });
        break;
      }
      case this.statusleaveCallId: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => { },
          onFail: () => {
          },
        });
        break;
      }
      case this.inviteParticipantApiCallId: {
        console.log("inviteParticipantApiCallId===>", responseDataJson);
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({ loader: false, inviteButtonDisable: true });
            this.handleParticipantInvitation();
          },
          onFail: () => {
             this.setState({selectedInviteData:{},invitationModel:false,loader:false})
            this.setState({alertModal:{openAlertModal:true,alertMsg:responseDataJson.error}})
          }
        });
        break;
      }
      case this.acceptInviteApiCallId: {
        console.log("acceptInviteApiCallId===>", responseDataJson);
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => { alert("sucess") },
          onFail: () => {
          },
        });
        break;
      }
      case this.categoriesApiCallId: {
        console.log(" categoriesApiCallId response==>", responseDataJson);
        this.setState({ apiLoader: false });
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState({
              categories: responseDataJson.data,
              catalogueIndex: responseDataJson.data[0]
            });
            this.getCatalogue(this.state.catalogueIndex?.attributes?.id);
          },
          onFail: () => {
            console.log("categoriesApiCallId failure")
          },
        });
        break;
      }

      case this.getCoinBalanceApiCallId: {
        console.log(" getCoinBalanceApiCallId response==>", responseDataJson);
        this.setState({ apiLoader: false });
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            this.setState(
              {
                coins_count: responseDataJson.coins_count
              },
              () => console.log("coincount", this.state.coins_count)
            );
          },
          onFail: () => {
            console.log("getCoinBalanceApiCallId failure.")
          },
        });
        break;
      }

      case this.catalogueApiCallId: {
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ catalogueApiCallId response==>", responseDataJson);
        this.setState({ apiLoader: false , isCatalogueLoading:false });
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",responseDataJson.data?.map((item:any)=>item?.attributes?.image))
            this.setState({ catalogue: responseDataJson.data });
          },
          onFail: () => {
            console.log("catalogueApiCallId failure..")
          },
        });
        break;
      }

      case this.updatelivescoreApiCallId: {
        this.setState({ apiLoader: false });
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
           console.log("update live success")
          },
          onFail: () => {
            console.log("update live failure")
          },
        });
        break;
      }

      case this.updatescoreApiCallId: {
        console.log(" updatescoreApiCallId response==>");
        this.setState({ apiLoader: false });
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
           console.log("updatescoreApiCallId success",responseDataJson.catalogue_data.image.url)
            this.setState({selectedCatalogueURL:responseDataJson.catalogue_data.image.url})
            console.log("selected image==>",this.state.selectedCatalogueURL)
            this.setState({isCoinSent: true})
          },
          onFail: () => {
            console.log("updatescoreApiCallId failure",errorDataJson)

          },
        });
        break;
      }

      case this.sendCommentsApiCallId: {
        console.log(" sendCommentsApiCallId response==>", responseDataJson);
        this.setState({ apiLoader: false });
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
           this.setState({
            comments: ""
          }, () => this.getComments())
          },
          onFail: () => {
            console.log("sendCommentsApiCallId failure")
          },
        });
        break;
      }

      case this.getCommentsCallId: {
        console.log(" getCommentsCallId response==>", responseDataJson);
        this.setState({ apiLoader: false });
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
          onSuccess: () => {
           this.setState({
            DATA: responseDataJson.data
          })
          },
          onFail: () => {
            console.log("getCommentsCallId failure")
          },
        });
        break;
      }
    }
    // Customizable Area End
  }
  // Customizable Area Start

  handleParticipantInvitation = () => {
    let data = this.state.searchresult.slice();
    let updatedData = data.map((objA: any) => {
      if (objA.id == this.state.selectedInviteData.id) {
        return {
          ...objA,
          isInvited: true,
          isLoader:true
        }
      } else {
        return {
          ...objA,
          isLoader:false
        }
      }
    })
    this.setState({ searchresult: updatedData, selectedInviteData:{} })

  }

  openGiftModal = () => {
    this.getCategories();
    this.getCoinBalance();
    this.setState(
      {
        gitfmodel: !this.state.gitfmodel,
        selectedTab: this.state.catalogueIndex?.attributes?.id
      },
      () => {
        console.log("");

      }
    );
  };


  setLottieAnimation = (show: boolean, url: string, audioUrl: string, json:string, positionLeft: number, positionTop: number) => {
    // checking if an animation is already playing
    if (this.state.lottieAnimation.show) {
      // if already playing, then add to queue
      this.animationQueue = [...this.animationQueue, {show, url, audioUrl, json, positionLeft, positionTop}]
    } else {
      // if no animation is playing, then play incoming animation
      this.playLottieAnimation(show, url, audioUrl, json, positionLeft, positionTop);
    }
  };
  playLottieAnimation = (show: boolean, url: string, audioUrl: string, json: string, positionLeft: number, positionTop: number) => {
    SoundPlayer.loadUrl(audioUrl);
    SoundPlayer.onFinishedLoading(() => {
      try {
        SoundPlayer.resume();
      } catch (e) {
        console.log(`cannot play the sound file`, e)
      }
      // render received animation
      this.setState({
        lottieAnimation: {
          show: show,
          url: url,
          audioUrl: audioUrl,
          json:json,
          positionLeft: typeof positionLeft === 'number' ? positionLeft : 0,
          positionTop: typeof positionTop === 'number' ? positionTop: 0,
        }
      }, () => {
        // wait for animation to finish
        setTimeout(() => {
          // if queue is empty, clear the playing animation
          if (this.animationQueue.length < 1) {
            this.setState({
              lottieAnimation: {
                show: false,
                url: "",
                audioUrl: "",
                json:"",
                positionLeft: 0,
                positionTop: 0,
              }
            })
            SoundPlayer.stop();
          } else {
            // if queue is not empty
            // get first value from animationQueue and remove it from the array
            const animation = this.animationQueue.shift();
            if (animation && animation.show) {
              // play the animation
              this.playLottieAnimation(animation.show, animation.url, animation.audioUrl, animation.json, animation.positionLeft, animation.positionTop);
            }
          }
        }, 6000);
      })
    })
  }
 sendComments = async () => {
    let commentText = this.state.comments;
    commentText = commentText.trimStart();
    commentText = commentText.trimEnd();
    const liveChallengeID = this.props.route.params.liveChallengeId;

    this.setState({
      comments: commentText
    })
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ apiLoader: true });
    const apiEndPoint = `bx_block_cflivechallenges/live_comments`;

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };
    const body = {
      "live_challenge_id": liveChallengeID,
      "comment": this.state.comments
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.sendCommentsApiCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      method: configJSON.postMethod,
      endPoint: `${apiEndPoint}`,
      header: header,
      body: JSON.stringify(body)
    });
    this.setState({
      comments: ""
    })
  };

  getComments = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    const liveChallengeID = this.props.route.params.liveChallengeId;

    this.setState({ apiLoader: true });
    const apiEndPoint = `/bx_block_cflivechallenges/get_all_comments?live_challenge_id=${liveChallengeID}`;

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.getCommentsCallId = requestMessage.messageId;


    createRequestMessage({
      requestMessage: requestMessage,
      method: configJSON.postMethod,
      endPoint: `${apiEndPoint}`,
      header: header,
     // body:null,
    });
  };
  getCategories =async() => {
    // alert(configJSON.Start_LiveStream_EndPoint)
    const token = (await getStorageData("authToken", false)) || "";
    console.log("token==>", token);

    this.setState({ apiLoader: true });
    const apiEndPoint = `bx_block_categories/categories/`;

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.categoriesApiCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${apiEndPoint}`,
      method: configJSON.getMethod,
      header: header,
    });
  };

  getCoinBalance = async () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    const token = await getStorageData("authToken", false) || "";

    const header = {
      "Content-Type": "application/json",
      "token": token
    };

    this.getCoinBalanceApiCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `/bx_block_cfappcoinsmanagement/your_balance`,
      method: configJSON.validationApiMethodType,
      header: header,
     // body: null
    });
  };

  goToRecharge = () => {
    this.setState({ gitfmodel: false });
    this.props.navigation.navigate("Balance");
  };

  gotoNextTab = (id: any) => {
    this.setState({ selectedTab: id, indexss: null , catalogue:[] });
    this.getCatalogue(id);
  };
  selectCatalogue = (item: any) => {
     if(this.state.IsSelected){
    this.setState({ selectedCatalogue: item,selectedCatalogueId:item.id});
     }
     else{
      this.setState({ selectedCatalogue:"",selectedCatalogueId:""});
     }
  };
  sendCoin = async () => {
    if (!this.state.selectedCatalogue.attributes.coins) {
    this.setState({alertModal:{openAlertModal:true, alertMsg:"select gift"}})
      return;
    }

    if (
      this.state.selectedCatalogue.attributes.coins > this.state.coins_count
    ) {
       this.setState({alertModal:{openAlertModal: true, alertMsg:"Insufficient balance please recharge your wallet.",IsSelected:false}})
      return;
    }

    this.setState({ gitfmodel: false });
    const token = (await getStorageData("authToken", false)) || "";
      console.log("token@@@@==>",token)
    this.setState({ apiLoader: true });
    const apiEndPoint = `/bx_block_livestream/livestream/coin_donation`;

    const header = {
     // "Content-Type": configJSON.exampleApiContentType,
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.updatescoreApiCallId = requestMessage.messageId;

     const body = {
        "roomId": this.props.route.params.meetingId,
        "catalogue_id":this.state.selectedCatalogueId
      };
     console.log("body@@@@==>",body)
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${apiEndPoint}`,
      method: configJSON.postMethod,
      header: header,
      body:JSON.stringify(body)
    });

  };

  getCatalogue = async (id: any) => {
    const token = (await getStorageData("authToken", false)) || "";
    this.setState({ apiLoader: true , isCatalogueLoading:true });
    const apiEndPoint = `/catalogue/catalogues?category_id=${id}&page=1&per_page=12`;

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.catalogueApiCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `${apiEndPoint}`,
      method: configJSON.getMethod,
      header: header,
     // body:null,
    });
  };


  //login waste function
  // fake login function
  fetchSession = (meetingId: string) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.fetchSessionCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const body = JSON.stringify({
      roomId: meetingId,
    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.fetch_Session_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };
  getAccountsForAudioRequest = async ({ searchText }: { searchText: string }) => {
    console.log('searching', searchText)

    this.setState({ loader: true });
    const apiEndPoint = `/bx_block_elasticsearch/account_search?page=1&per_page=100&q=${searchText}`
    const header = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.getAccountsForAudioId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: apiEndPoint,
      method: configJSON.getApiMethodType,
      header: header,
      body: undefined,
    });


  };

  startRecordingFunction = (meetingId: string) => {
    console.log("start recording function called", meetingId)
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.startRecordingCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const body = JSON.stringify({
      roomId: meetingId,
    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Start_Recording_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };

  stopRecordingFunction = (meetingId: string) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.stopRecordingCallId = requestMessage.messageId;
    console.log("stop recording function called", meetingId)
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const body = JSON.stringify({
      roomId: meetingId,
    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Stop_Recording_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };

  startLiveStreamFunction = (props: LiveStream) => {
    // alert(configJSON.Start_LiveStream_EndPoint)
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.startRtmpStreamCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const body = JSON.stringify({
      roomId: props.meetingId,
      streamKey: props.streamKey,
      streamUrl: props.streamUrl,
    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Start_LiveStream_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };

  stopLiveStreamFunction = (meetingId: string) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.stopRtmpStreamCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const body = JSON.stringify({
      roomId: meetingId,
    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Stop_LiveStream_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };

  hlsStartLiveStream = (meetingId: string) => {
    // alert(configJSON.Start_HLStream_EndPoint)
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.startHLSStreamCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const body = JSON.stringify({
      roomId: meetingId,
      type: "SPOTLIGHT",
      priority: "PIN",
      orientation: "portrait",
      gridSize: 6,
      theme: "DARK",
      is_live_stream_meet: true,
    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Start_HLStream_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };

  hlsStopLiveStream = (meetingId: string) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.stopHLSStreamCallId = requestMessage.messageId;
      console.log('this.state.authToken',this.state.authToken)
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const body = JSON.stringify({
      roomId: meetingId,
    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Stop_HLStream_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });

  };
  deactivateStream= ()=>{
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.deactivateStreamCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const body = JSON.stringify({
      roomId: this.props.route?.params.meetingId,
    });
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Deactivate_LiveStream_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  }

  hlsActiveLiveStream = (props: ActiveMeetingStream) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.setDownStreamURL = props.setDownStreamURL;
    this.activeHLSStreamCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const body = JSON.stringify({
      roomId: this.props.route?.params.meetingId,
    });
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Active_HLStream_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };
  sendData = () => {
    let eventId = this.props.route?.params?.eventId;
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.senddataCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const body = JSON.stringify({

      live_status: "ended",

    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: "bx_block_live_feed_schedule/update_event?id=" + eventId,
      method: "PATCH",
      header: headers,
      body: body,
    });
  };

  //invite participant
  inviteParticipant = (meetingId: string, userId: any) => {
    this.setState({ loader: true })
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.inviteParticipantApiCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const body = JSON.stringify({
      "roomId": meetingId,
      "account_id": userId,
    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.inviteApiEndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };
  //accept invite
  acceptInvite = (meetingId: string, userId: any) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.acceptInviteApiCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const body = JSON.stringify({
      "invite_id": 2,
      "status": "accepted"
    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.acceptInviteApEndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: body,
    });
  };
  async componentDidMount() {
    const token = await storage.get("token");
    const language = await getStorageData("SelectedLng");
    console.log('this is the token',token)
    this.setState({authToken: token,language:language});
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  async componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

   handleBackButtonClick = () => {
     this.props.navigation.goBack();
    return true;
  }
  fetchRecordingFunction = () => {
    this.props.navigation.navigate("FetchMeetings");
  };
  removeParticipants = (roomId:any) => {

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.removeParticipants_CallID = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };
    const body = {
      roomId: roomId,
    };
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.removeParticipants_EndPoint,
      method: configJSON.postApiMethod,
      header: headers,
      body: JSON.stringify(body),
    });
  };
  navigateWithoutClose = () => {
    this.props.navigation.reset({
      index: 0,
      routes: [
        {name: 'Home'},
      ],
    });
  }
  navigateToLivePage = () => {
    this.hlsStopLiveStream(this.props.route?.params?.meetingId);
    this.removeParticipants(this.props.route?.params?.meetingId);
    this.deactivateStream()
    this.props.navigation.reset({
      index: 0,
      routes: [
        {name: 'Home'},
      ],
    });
  };

  navigateToLivePageparticipants = () => {
    this.props.navigation.reset({
      index: 0,
      routes: [
        {name: 'Home'},
      ],
    });
  }

  statusjoin = () => {
    //alert(this.props.route?.params?.meetingId)
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.statusjoinCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const body = JSON.stringify({
      roomId: this.props.route?.params?.meetingId,
    });

    console.log("statusjoin request = "+ JSON.stringify(body))
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.statusjoinendpoint,
      method: configJSON.putApiMethodType,
      header: headers,
      body: body,
    });
  }
  statusleave = () => {
    //alert("noitjoin")
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );

    this.statusleaveCallId = requestMessage.messageId;

    const headers = {
      "Content-Type": configJSON.apiContentType,
      "token": this.state.authToken,
    };

    const body = JSON.stringify({
      roomId: this.props.route?.params?.meetingId,
    });

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.statusleaveendpoint,
      method: configJSON.putApiMethodType,
      header: headers,
      body: body,
    });
  }
  // Customizable Area End
}
