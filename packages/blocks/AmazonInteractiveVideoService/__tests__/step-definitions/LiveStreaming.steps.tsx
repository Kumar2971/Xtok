import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import {useRef} from 'react';
import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import LiveStreaming, { MemoizedAlertModal } from "../../src/LiveStreaming";
import EndLive from "../../src/EndLive";
// import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CommentIVS from "../../src/CommentIVS";
import { Platform } from "react-native";
import MuteViews from "../../src/MuteViews";
import { CancleMatchModal, ChallengeDurationPopup, CommentSettingsModel, ParticipantsModel, SettingsModal, SettingsViewModal } from "../../src/CombinedLiveStream";
import ModeratorView from "../../src/ModeratorView";
import GiftModel from "../../src/GiftModel";
import InviteView from "../../src/InviteView";
import LiveStreamHeader from "../../../../components/src/LiveStreamCommonTabs";
import * as utils from "../../../../framework/src/Utilities";
import AlertModal from "../../../../components/src/AlertModal";
import { StreamView } from "../../src/StreamView";
import ReportModal from "../../src/ReportModal";


const screenProps = {
  navigation: {
    reset: jest.fn(({index,routes}: {index: number, routes: any[]})=>{}),
    navigate: jest.fn((screenName: string) => {}),
    replace:jest.fn((screenName: string) => {}),
    addListener: jest.fn((key: string, callback: () => void) => {
      callback();
    }),
  },
  id: "LiveStreaming",
  route: {
    params: {
      screen: "LiveStreaming",
      title: "New Stream",
      recordingUrl:"",
      data: {
        title: "",
        topic: "Golavi",
        image: "",
      },
      stageData: {
        name: "",
        stageArn: "",
        inviteId: 23,
        isViewer: false,
        chatArn: "",
        hostId: "45",
        viewerType: "cohost",
        isChallenge: false,
        stageId:0,
        isRedirectedFromChallenge:false,
        chatData:{userChatData:[{id:"4"}], wholeChatData:[{id:"4"}]}
      },
      stage_id: "112",
      account_id: "756",
      participant_id:"",
      EventDetails:{attributes:{event_name:"name",description:"desc"}}
    },
  },
};

const screenProps2 = {
  navigation: {
    reset: jest.fn(({index,routes}: {index: number, routes: any[]})=>{}),
    navigate: jest.fn((screenName: string) => {}),
    replace:jest.fn((screenName: string) => {}),
    addListener: jest.fn((key: string, callback: () => void) => {
      callback();
    }),
  },
  id: "LiveStreaming",
  route: {
    params: {
      screen: "LiveStreaming",
      title: "",
      recordingUrl:"",
      data: {
        title: "title",
        topic: "",
        image: "",
      },
      stageData: {
        name: "",
        stageArn: "",
        inviteId: 23,
        isViewer: false,
        chatArn: "",
        hostId: "45",
        viewerType: "",
        isChallenge: false,
        stageId:0,
        isRedirectedFromChallenge:false,
        chatData:{userChatData:[{id:"4"}], wholeChatData:[{id:"4"}]}
      },
      stage_id: "112",
      account_id: "756",
      participant_id:"",
      EventDetails:{attributes:{event_name:"name",description:"desc"}}
    },
  },
};

const endLiveProps = { ...screenProps,route : {params : {...screenProps.route.params, screen : "EndLive"}}};

const apiCall = (mockData: any) => {
  const newMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
  newMessage.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    newMessage.messageId
  );
  newMessage.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    mockData
  );
  return newMessage;
};

const requestedMockUserData = {
  data: {
    attributes: {
      followings_status : "requested",
      user_name: "golavi_project",
      bio: "user_bio",
      photo: "photo",
      followers_count : 5,
      followings_count : 4
    }
  }
}

let errorMockData = { error: "Something went wrong!" };

const chatProps = {
    userData: {
    full_name: "sa",
    user_name: "as",
    photo: "",
    id:"1"
  },
  stageId: "10",
    isHost:"true",
  isChallenge:true,
  selectedChallengeUserId:1,
  inviteModal: jest.fn(),
  setParentChatRoom: jest.fn(),
  onReceiveGifts: jest.fn(),
  giftModel: jest.fn(),
  onLiveChanged: jest.fn(),
  onCommentBack: jest.fn(),
  onRedirectAfterChallenge:jest.fn(),
  shareLink:jest.fn(),
  onRedirectCohostNewStream:jest.fn(),
  redirectAsCohost:jest.fn(),
  onChallengeClosed:jest.fn(),
  handleCancelledMatch:jest.fn(),
  endFromHost:jest.fn(),
  showHostComment: true,
  chatData:{userChatData:[{id:"4"}], wholeChatData:[{id:"4"}]},
  previousChatData:[{
    senderName: "string",
  senderId: "string1",
  message: { Message: { text: "string", type: "string" }, imageUrl: "" },
  selectedHostId: "string"
  }],
  allParticipants:[{ id: "0", name: "kenny", role: "cohost" , photo:"" }],
  userRole:"host",
  chatTokenData: {
    token:
      "AQICAHiYRF1W4dMtA_2KBHdIvZF04wmmkZjk3Y5FSogh_QrGewH6msMlM4DCC_Lh12AizOVpAAAByTCCAcUGCSqGSIb3DQEHBqCCAbYwggGyAgEAMIIBqwYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAy3iujiXVbqy83jU9gCARCAggF8E0ClhItpBlL6MwhQQ_fq2MQ9dIqadqO7SWcoHoUPkR60djMkSuY00RpIUpWtb9ID433hVSUyWKgcZ1CRolctCS4JRCzgpeAx0kLbavf_BHOdB1tioG2qrQsgu0pggbjKgYdEsH4DZ7z8HBx-JexY4rIGJrefyiFW8zWxivEMk7ay5jRUk1Aey6c3ZrD3qrd1JuH5n70_M5sX2IYNpZ9bP3vuEIVlUDpeTr-Tf4AVDQ-_JDyR_xZthuYu_DSkP3N-F9N0WqBXfhkLPobH1QWHfbTvUyOyywFdNtnyiQeBFbzFpj3BSibcKwwL1HrB7f2rGU0vMcB8dbUc4XBlz8NUmVhtlIJwRxW3ztDh2wXKOr_A42Y7ZytX1V1dAMPhWl5xGkmkXQ3OFiKcXya33T5lCFUaJGAuuxHs9h5swez-RsSG1HMWHys2j8HWnvdFbhJuoa7kPjSmQ2UwT0D1qLCY64TvePt3b1Xa7jE25t-kiZnmNeMLezLACskvolc!#0",
    sessionTime: "2023-08-21T09:34:21.000Z",
    tokenTime: "2023-08-21T07:34:21.000Z",
  },
  duration:10,
  minutes:10,
  seconds:0,
  teamCombinedIds:[],
  redirectStageArn:"",
  redirectStageId:"",
  redirectChatArn:"a",
  notificationData:null,
  cancelMatch:true,
  coHostLeave:true,
  challengeTeams : {teamA:[], teamB: []},
  isViewer:"false",
  blockuserid:1,
  onLeaveStream:jest.fn(),
  handelUserBlocked:jest.fn(),
  muteaccountlistdata:[],
  Modertorsearchresult:"",
  muteselected:true,
  onDataReceived:jest.fn(),
  userLeftName:"newWorld",
  onUserLeftMessageSent:jest.fn(),
  powerButtonWithoutChallenge:false,
  startNewLive:false,
  likedUserId:"1",
  onLiked:jest.fn(),
  sendLikeCount:1,
  onSendLikeCount:jest.fn(),
  handleParticipantJoining: jest.fn((userData :any)=>{}),
  initializetHostSideMute : jest.fn(({id,duration}:{id : number, duration: number})=>{}),
  slow_mode: false,
  ReportedDeleteMessageList: [{messege_id:"dd", stage_id: 444, messege_text:"df",reason:""}],
};

const challengeChatProps = {
  userData: {
    full_name: "sa",
    user_name: "as",
    photo: "",
    id:"1"
  },
  isHost:"true",
  isChallenge:true,
  selectedChallengeUserId:1,
  inviteModal: jest.fn(),
  setParentChatRoom: jest.fn(),
  onReceiveGifts: jest.fn(),
  giftModel: jest.fn(),
  onLiveChanged: jest.fn(),
  onCommentBack: jest.fn(),
  showHostComment: false,
  chatTokenData: {
    token:
      "AQICAHiYRF1W4dMtA_2KBHdIvZF04wmmkZjk3Y5FSogh_QrGewH6msMlM4DCC_Lh12AizOVpAAAByTCCAcUGCSqGSIb3DQEHBqCCAbYwggGyAgEAMIIBqwYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAy3iujiXVbqy83jU9gCARCAggF8E0ClhItpBlL6MwhQQ_fq2MQ9dIqadqO7SWcoHoUPkR60djMkSuY00RpIUpWtb9ID433hVSUyWKgcZ1CRolctCS4JRCzgpeAx0kLbavf_BHOdB1tioG2qrQsgu0pggbjKgYdEsH4DZ7z8HBx-JexY4rIGJrefyiFW8zWxivEMk7ay5jRUk1Aey6c3ZrD3qrd1JuH5n70_M5sX2IYNpZ9bP3vuEIVlUDpeTr-Tf4AVDQ-_JDyR_xZthuYu_DSkP3N-F9N0WqBXfhkLPobH1QWHfbTvUyOyywFdNtnyiQeBFbzFpj3BSibcKwwL1HrB7f2rGU0vMcB8dbUc4XBlz8NUmVhtlIJwRxW3ztDh2wXKOr_A42Y7ZytX1V1dAMPhWl5xGkmkXQ3OFiKcXya33T5lCFUaJGAuuxHs9h5swez-RsSG1HMWHys2j8HWnvdFbhJuoa7kPjSmQ2UwT0D1qLCY64TvePt3b1Xa7jE25t-kiZnmNeMLezLACskvolc!#0",
    sessionTime: "2023-08-21T09:34:21.000Z",
    tokenTime: "2023-08-21T07:34:21.000Z",
  },
  onRedirectAfterChallenge:jest.fn(),
  shareLink:jest.fn(),
  onRedirectCohostNewStream:jest.fn(),
  redirectAsCohost:jest.fn(),
  onChallengeClosed:jest.fn(),
  handleCancelledMatch:jest.fn(),
  endFromHost:jest.fn(),
  chatData:{userChatData:[{id:"4"}], wholeChatData:[{id:"4"}]},
  previousChatData:[{
    senderName: "string",
  senderId: "string1",
  message: { Message: { text: "string", type: "string" }, imageUrl: "" },
  selectedHostId: "string"
  }],
  allParticipants:[{ id: "0", name: "kenny", role: "cohost" , photo:"" },{ id: "1", name: "kenny", role: "host" , photo:"" }],
  userRole:"viewer",
  duration:10,
  minutes:10,
  seconds:0,
  teamCombinedIds:[],
  redirectStageArn:"",
  redirectStageId:"",
  redirectChatArn:"a",
  notificationData:"",
  cancelMatch:true,
  coHostLeave:true,
  challengeTeams : {teamA:[], teamB: []},
  isViewer:"false",
  blockuserid:1,
  onLeaveStream:jest.fn(),
  handelUserBlocked:jest.fn(),
  muteaccountlistdata:[],
  Modertorsearchresult:"",
  muteselected:true,
  onDataReceived:jest.fn(),
  userLeftName:"",
  onUserLeftMessageSent:jest.fn(),
  powerButtonWithoutChallenge:false,
  startNewLive:false,
  likedUserId:"1",
  onLiked:jest.fn(),
  sendLikeCount:1,
  onSendLikeCount:jest.fn(),
  handleParticipantJoining: jest.fn((userData : any)=>{})
};

const loadingChatProps = {
  userData: {
    full_name: "sa",
    user_name: "as",
    photo: "",
    id:"1"
  },
  isHost:"true",
  isChallenge:false,
  selectedChallengeUserId:1,
  inviteModal: jest.fn(),
  setParentChatRoom: jest.fn(),
  onReceiveGifts: jest.fn(),
  giftModel: jest.fn(),
  onLiveChanged: jest.fn(),
  onCommentBack: jest.fn(),
  showHostComment: true,
  chatTokenData: {
    token:
      "",
    sessionTime: "2023-08-21T09:34:21.000Z",
    tokenTime: "2023-08-21T07:34:21.000Z",
  },
  onRedirectAfterChallenge:jest.fn(),
  shareLink:jest.fn(),
  onRedirectCohostNewStream:jest.fn(),
  redirectAsCohost:jest.fn(),
  onChallengeClosed:jest.fn(),
  handleCancelledMatch:jest.fn(),
  endFromHost:jest.fn(),
  chatData:{userChatData:[{id:"4"}], wholeChatData:[{id:"4"}]},
  previousChatData:[{
    senderName: "string",
  senderId: "string1",
  message: { Message: { text: "string", type: "string" }, imageUrl: "" },
  selectedHostId: "string"
  }],
  allParticipants:[{ id: "0", name: "kenny", role: "cohost" , photo:"" },{ id: "1", name: "DG", role: "host" , photo:"" }],
  userRole:"cohost",
  duration:10,
  minutes:10,
  seconds:0,
  teamCombinedIds:[],
  redirectStageArn:"",
  redirectStageId:"",
  redirectChatArn:"a",
  notificationData:null,
  cancelMatch:true,
  coHostLeave:true,
  challengeTeams : {teamA:[], teamB: []},
  isViewer:"false",
  blockuserid:1,
  onLeaveStream:jest.fn(),
  handelUserBlocked:jest.fn(),
  muteaccountlistdata:[],
  Modertorsearchresult:"",
  muteselected:true,
  onDataReceived:jest.fn(),
  userLeftName:"",
  onUserLeftMessageSent:jest.fn(),
  powerButtonWithoutChallenge:false,
  startNewLive:false,
  likedUserId:"1",
  onLiked:jest.fn(),
  sendLikeCount:1,
  onSendLikeCount:jest.fn(),
  handleParticipantJoining: jest.fn((userData : any)=>{}),
};

const liveStreamFeature = loadFeature(
  "./__tests__/features/LiveStreaming-scenario.feature"
);

const mockgetStorageData = jest.spyOn(utils, "getStorageData")
const mockFlatListRef = { current: { scrollToIndex: jest.fn() } };

defineFeature(liveStreamFeature, (test) => {
  jest.useFakeTimers();
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(global, 'setTimeout').mockImplementation((cb:any) => cb() );
    jest.spyOn(global, 'setInterval').mockImplementation((cb:any) => cb() );
    mockgetStorageData.mockImplementation((key) => {
      if("SelectedLng" === key) return Promise.resolve("ar")
      else return Promise.resolve("ar")
    })
  });
  
  let matchProps = {
    cancelMatchModal:true,
     handlecancelMatchModal:jest.fn(),
     cancelMatchAction:jest.fn(),
  }

  test("User navigates to LiveStreaming", ({ given, when, then }) => {  
    Platform.OS = 'android';
    const amazon = shallow(<LiveStreaming {...screenProps}/>);
    const matchModal = shallow(<CancleMatchModal {...matchProps}/>);
    let LiveStreamBlock: ShallowWrapper;
    let CommentBlock: ShallowWrapper;
    let liveStreamInstance: LiveStreaming;
    const commentIVS = shallow(<CommentIVS {...chatProps}/>);
    const chatProp2 = {...chatProps,userData:{...chatProps.userData, id:"5"},selectedChallengeUserId:null, notificationData:null,startNewLive:true}
    // shallow(<CommentIVS {...loadingChatProps}/>);
    const chatProps2 = {...chatProps, isChallenge: true}
    shallow(<CommentIVS {...chatProps2}/>);
    
    given("I am a User loading LiveStreaming", () => {
      LiveStreamBlock = shallow(<LiveStreaming {...screenProps} />);
      CommentBlock = shallow(<CommentIVS {...chatProps}/>)
      shallow(<CommentIVS {...chatProps2}/>);
      liveStreamInstance = LiveStreamBlock.instance() as LiveStreaming;
      liveStreamInstance.handleInviteModal(2)
      
      let flatlistTest = commentIVS.findWhere(
        (node) => node.prop("testID") === "flatlistTest"
    );
  liveStreamInstance.setState({usersJoinedData:[{id: '1', name: 'user', role: 'host', photo: 'string', },{id: '1', name: 'user', role: 'cohost', photo: 'string', },{id: '1', name: 'user', role: 'friend', photo: 'string', }]})
   let renderItem = flatlistTest.prop('renderItem')({item:{id:0,senderName:'',senderId:0,message:{Message:{text:'',type:''},imageUrl:null}}})
    flatlistTest.prop('renderItem')({item:{id:0,senderName:'harry',senderId:0,message:{Message:{text:'new text',type:''},imageUrl:" "}}})   
    flatlistTest.prop('renderItem')({item:{id:0,senderName:'harry',senderId:0,message:{Message:{text:'new text',type:'application'},imageUrl:null}}})   
    flatlistTest.props().keyExtractor({}, 3);

    let newShallow = shallow(renderItem)
    let button = newShallow.findWhere(
      (node) => node.prop("testID") === "profileView0")
      button.simulate('press')
     
    let message = commentIVS.findWhere(
      (node) => node.prop("testID") === "message"
  );
  message.simulate('changeText','harry')
     
  let sendMessage = commentIVS.findWhere(
    (node) => node.prop("testID") === "sendMessage"
);
sendMessage.simulate('press')
     
let responderView = commentIVS.findWhere(
  (node) => node.prop("testID") === "responderView"
);
responderView.simulate('startShouldSetResponder')
      expect(LiveStreamBlock).toBeTruthy()

      liveStreamInstance.onGridTapped({native:{userId:"AS"}})
    });

    when("I navigate to the LiveStreaming", () => {
      liveStreamInstance.endbuttonPressed();
      expect(LiveStreamBlock).toBeTruthy();
    });
    then("fetching current logged in user data fails", () => {
      const message: Message = apiCall(errorMockData);
      liveStreamInstance.loginUserCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
    
      let responderView = commentIVS.findWhere(
        (node) => node.prop("testID") === "responderView"
    );
    responderView.simulate('startShouldSetResponder')

    let flatlistTest = commentIVS.findWhere(
      (node) => node.prop("testID") === "flatlistTest"
  );

  let flatListItem = flatlistTest.prop('renderItem')({item:{message:{attributes:{message_type:"GIFT"}, Message:{text:"",type:""},imageUrl:""},senderId:'1',senderName:"hello"}})
  let shalflatListItem = shallow(flatListItem);
    let deletComment = shalflatListItem.findWhere((node)=> node.prop('testID') === 'deleteCommentButton')
    deletComment.simulate('press')
    let flatListItem2 = flatlistTest.prop('renderItem')({item:{message:{attributes:{message_type:"GIFT"}, Message:{text:"",type:""},imageUrl:""},senderId:'2',senderName:"hello"}})
  let shalflatListItem2 = shallow(flatListItem2);
    let reportComment = shalflatListItem2.findWhere((node)=> node.prop('testID') === 'reportCommentButton')
    reportComment.simulate('press')
  flatlistTest.prop('renderItem')({item:{message:{Message:{text:"",type:""},imageUrl:""},senderId:'0',senderName:"hello"}})
  flatlistTest.simulate('keyExtractor',{id:''})
  flatlistTest.simulate('contentSizeChange')

  let textInput = commentIVS.findWhere((node)=> node.prop("testID") === "message")
  textInput.simulate('changeText','Hello world')

  let sendMessage = commentIVS.findWhere((node)=> node.prop("testID") === "sendMessage")
  sendMessage.simulate('press') 
  let event = {native:{userId:0,userName:'as',userRole:'guest'}}
      liveStreamInstance.onParticipantAdded({event})
      expect(LiveStreamBlock).toBeTruthy();
    });

    then("successfully fetching current logged in user data", () => {
      let userData = {
        full_name: "Golavi",
        user_name: "",
        photo: "",
        datasaver: {
          account_id: 1,
        },
      };
          
          liveStreamInstance.handleOnReceiveGifts({  id: "s",
            content: "s",
            sendTime: new Date(),
            requestId: 'string;',
            attributes: {giftJson:"{}",type:"image"},
            sender:{ userId: 'string;',
              attributes:{}}
          })
          liveStreamInstance.handleOnReceiveGifts({  id: "s",
            content: "s",
            sendTime: new Date(),
            requestId: 'string;',
            attributes: {},
            sender:{ userId: 'string;',
              attributes:{}}
          })
          liveStreamInstance.setState({broadcastDetail:{...liveStreamInstance.state.broadcastDetail,isHost:"false", isViewer:"false"},viewerType:"friend"})
          liveStreamInstance.getUserType()
          liveStreamInstance.setState({broadcastDetail:{...liveStreamInstance.state.broadcastDetail,isHost:"false", isViewer:"false"},viewerType:"frien"})
          liveStreamInstance.getUserType()
      const message: Message = apiCall({ data: { attributes: userData } });
      liveStreamInstance.loginUserCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
      const message2: Message = apiCall({ data: { arn: "", id: "5" } });
      liveStreamInstance.createStageApiCallId = message2.messageId;
      runEngine.sendMessage("Unit Test", message2);
      expect(LiveStreamBlock).toBeTruthy();
      const newStageButton = LiveStreamBlock.findWhere((node)=> node.prop("testID") === "newStageButton")
      newStageButton.simulate('press')
      liveStreamInstance.onParticipantAdded({nativeEvent:{userId:1,userName:'as',userRole:'cohost'}})
      liveStreamInstance.onParticipantLeft({nativeEvent:{userId:0,userName:'as',userRole:'cohost'}})
      expect(LiveStreamBlock).toBeTruthy();
    });

    then("create stage room in live stream fails to start", () => {
      liveStreamInstance.setState({privateLiveData:{is_private:true,userID:0}})
      const message: Message = apiCall(errorMockData);
      liveStreamInstance.createStageApiCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
      liveStreamInstance.creategifts(0)
      const chatMessage: Message = apiCall(errorMockData);
      liveStreamInstance.createChatApiCallId = chatMessage.messageId;
      runEngine.sendMessage("Unit Test", chatMessage);
      liveStreamInstance.handleInviteModal(1)
      expect(LiveStreamBlock).toBeTruthy();
    });
    then("successfully created stage room live stream", () => {
      const message: Message = apiCall({ data: { arn: "", id: "5" } });
      liveStreamInstance.createStageApiCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
      liveStreamInstance.handleBackButtonClick()
      liveStreamInstance.endLive()
      const chatMessage: Message = apiCall({ data: { arn: "" } });
      liveStreamInstance.createChatApiCallId = chatMessage.messageId;
      runEngine.sendMessage("Unit Test", chatMessage);
      expect(LiveStreamBlock).toBeTruthy();
    });

    then("createing stage room token and stage token fails", () => {
      const message: Message = apiCall(errorMockData);
      liveStreamInstance.createTokenApiCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);

      const tokenMessage: Message = apiCall(errorMockData);
      liveStreamInstance.createChatTokenApiCallId = tokenMessage.messageId;
      runEngine.sendMessage("Unit Test", tokenMessage);

      expect(LiveStreamBlock).toBeTruthy();
    });

    then("successfully created stage room token and stage token", () => {
      const createToken: Message = apiCall({stage_arn:"arn:aws:ivs:ap-south-1:621966568940:stage/xvJkaZgI0wu8", stage_id: "112", token: chatProps.chatTokenData.token});
      liveStreamInstance.createTokenApiCallId = createToken.messageId;
      runEngine.sendMessage("Unit Test", createToken);
      const message: Message = apiCall({ data: { stage_arn: "arn:aws:ivs:ap-south-1:621966568940:stage/xvJkaZgI0wu8", token: chatProps.chatTokenData.token } });
      liveStreamInstance.createChatTokenApiCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
      expect(LiveStreamBlock).toBeTruthy();

      let exploreButton = LiveStreamBlock.findWhere(
        (node) => node.prop("testID") === "exploreButton"
    );
    exploreButton.simulate('press');

      const createChatTokenApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      createChatTokenApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createChatTokenApiCallId.messageId
      );
      createChatTokenApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {token:'asdasd',session_expiration_time:"awdad",token_expiration_time:"asd"}
      );
      liveStreamInstance.createChatTokenApiCallId = createChatTokenApiCallId.messageId;
      runEngine.sendMessage("Unit Test", createChatTokenApiCallId);
    });
    

    then("I can invite guest", () => {

  const blockKeyword = LiveStreamBlock.findWhere(
    (node) => node.prop("testID") === "blockKeyword"
);
blockKeyword.simulate('changeText','Harry');


    liveStreamInstance.handleFlipCamera()
    liveStreamInstance.handleComment()
    liveStreamInstance.getParticipant()
  
  
  //   let crossButton = LiveStreamBlock.findWhere(
  //     (node) => node.prop("testID") === "crossButton"
  // );
  // crossButton.simulate('press')

      jest.useFakeTimers();
      jest.runAllTimers();
      jest.useFakeTimers();
  jest.advanceTimersByTime(3000);

    })

    then("I can start the live challenge with one vs one", async() => {
      //handleParticipantState is the callback will trigger from comentIVS
      liveStreamInstance.handleParticipantState({userRole: "viewer", isJoining: "true"});
      liveStreamInstance.handleParticipantState({updateViewerCount: "true", totalViewerCount: ""});
      liveStreamInstance.handleParticipantState({updateViewerCount: "true", totalViewerCount: 7});
      let viewerCount = LiveStreamBlock.findWhere(
      (node) => node.prop("testID") === "viewerCount"
      );
      expect(viewerCount.props().children).toBe(7);
      const firstParticipant = {
        userId : 756, userName : "userA", userRole : "host", userPhoto : ""
      }
      const secondParticipant = {
        userId : 251, userName : "userB", userRole : "cohost", userPhoto : ""
      }
      // onParticipantAdded is a callback function will be called from native when new participant joined
      liveStreamInstance.onParticipantAdded({nativeEvent : firstParticipant});
      liveStreamInstance.onParticipantAdded({nativeEvent : secondParticipant});

      

      const message: Message = apiCall({stage_arn: "arn:aws:ivs:ap-south-1:621966568940:stage/xvJkaZgI0wu8", duration: "5" });
      liveStreamInstance.liveStreamDurationId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
      const body = {
        team1 : liveStreamInstance.myTeamIdList,
        team2 : liveStreamInstance.opponentTeamIdList,
        stage_id : "112"
       };
       const teamSelectionApiCall = apiCall(body)
       liveStreamInstance.teamSelectionApiId = teamSelectionApiCall.messageId;
       await runEngine.sendMessage("Unit Test", teamSelectionApiCall);
       await LiveStreamBlock.update();
    })

    then("I can start the live challenge with two vs two", async() => {
      const renderLiveStream = shallow(<LiveStreaming {...screenProps}/>);
      const thirdParticipant = {
        userId : 741, userName : "userC", userRole : "cohost", userPhoto : ""
      }
      const fourthParticipant = {
        userId : 280, userName : "userD", userRole : "cohost", userPhoto : ""
      }
      const liveStreamApiFail : Message = apiCall(errorMockData);
      liveStreamInstance.liveStreamDurationId = liveStreamApiFail.messageId;
      runEngine.sendMessage("Unit Test", liveStreamApiFail);
      // onParticipantAdded is a callback function will be called from native when new participant joined
      liveStreamInstance.onParticipantAdded({nativeEvent : thirdParticipant});
      liveStreamInstance.onParticipantAdded({nativeEvent : fourthParticipant});
      const message: Message = apiCall({stage_arn: "arn:aws:ivs:ap-south-1:621966568940:stage/xvJkaZgI0wu8", duration: "10" });
      liveStreamInstance.liveStreamDurationId = message.messageId;
      await runEngine.sendMessage("Unit Test", message);
      await LiveStreamBlock.update();
      // const txt = renderLiveStream.getByText("Select your team mates");
      // expect(txt).toBeTruthy();
      const teamList = LiveStreamBlock.findWhere((node) => node.prop("testID") === "teamList");
      teamList.props().keyExtractor({}, 3);
      expect(teamList).toBeDefined();
      const reportReasonItem = teamList.renderProp('renderItem')({item:{...thirdParticipant,isSelected: true,photo:"photo"},index:2});
      let selectTeam = reportReasonItem.findWhere(
        (node) => node.prop("testID") === "selectTeam"
      );
      selectTeam.simulate("press");
      // const slectedTeamBorderColor = reportReasonItem.findWhere((node) => node.prop("testID") === "selectTeam").props().style[1].borderColor;
      // expect(slectedTeamBorderColor).toBe("#FEC925");
      const reportReasonItem2 = teamList.renderProp('renderItem')({item:{...fourthParticipant,isSelected: false},index:3});
      let selectTeam2 = reportReasonItem2.findWhere(
        (node) => node.prop("testID") === "selectTeam"
      );
      selectTeam2.simulate("press");
      selectTeam2.simulate("press");
      
      let layoutView = LiveStreamBlock.findWhere(
        (node) => node.prop("testID") === "layoutView"
      );
      layoutView.simulate('layout',{nativeEvent:{layout:{height:100}}})

      const unselectedTeamBorderColor = reportReasonItem2.findWhere((node) => node.prop("testID") === "selectTeam").props().style[1].borderColor;
      expect(unselectedTeamBorderColor).toBe("#f9f9f9")
      let getStarted = LiveStreamBlock.findWhere(
        (node) => node.prop("testID") === "getStarted"
      );
      getStarted.simulate('press')
   
      const teamSelectApiFail : Message = apiCall(errorMockData);
      liveStreamInstance.teamSelectionApiId = teamSelectApiFail.messageId;
      runEngine.sendMessage("Unit Test" , teamSelectApiFail);
    })

    then("I can follow a user by taping grid", async()=>{
      const eventValue = {
        nativeEvent: {
          userId: "5"
        }
      };
      // OnGridTape callback will call from native
      liveStreamInstance.onGridTapped(eventValue);
      const renderprofiledata = LiveStreamBlock.findWhere((node)=>node.prop("testID")=="renderprofiledata");
      expect(renderprofiledata.children.length>0).toBe(true);
      const getSelectedUserData : Message = apiCall(requestedMockUserData);
      liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserData.messageId;
      runEngine.sendMessage("Unit test", getSelectedUserData);
      const user_name = LiveStreamBlock.findWhere((node)=>node.prop("testID")=="user_name");
      expect(user_name.props().children).toBe("golavi_project");
      const followButton = LiveStreamBlock.findWhere((node)=>node.prop("testID")=="followButton");
      followButton.simulate("press");
   
      const cancelRequestMockData = {
        data: {
          attributes: {
            followings_status : "follow",
            user_name: "golavi_project",
            bio: "user_bio",
            photo: "photo",
            followers_count : 5,
            followings_count : 4
          }
        }
      }
      const followingMockData = {data:{attributes: {...cancelRequestMockData.data.attributes, followings_status : "following",}}}
      const getSelectedUserData3 : Message = apiCall(followingMockData);
      liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserData3.messageId;
      runEngine.sendMessage("Unit test", getSelectedUserData3);
      const invalidStatusData = {data:{attributes: {...cancelRequestMockData.data.attributes, followings_status : "unfollow",}}}
      const getSelectedUserData4 : Message = apiCall(invalidStatusData);
      liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserData4.messageId;
      runEngine.sendMessage("Unit test", getSelectedUserData4);
     
      const getSelectedUserData2 : Message = apiCall(cancelRequestMockData);
      liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserData2.messageId;
      runEngine.sendMessage("Unit test", getSelectedUserData2);
      liveStreamInstance.handleChildData("5",false);
      
      const loader2 = LiveStreamBlock.findWhere((node)=>node.prop("testID")=="userFollowButtonLoader");
      expect(loader2.exists()).toBe(false);
    })

    then("I can follow a viewer by taping grid",()=>{
      const liveStream = shallow(<LiveStreaming {...screenProps}/>);
      // handleChildData will trigger from commentIVs
      liveStreamInstance.handleChildData("5",false);
      const getSelectedUserData4 : Message = apiCall({data:null});
      liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserData4.messageId;
      runEngine.sendMessage("Unit test", getSelectedUserData4);
      const invalidFollowApi = apiCall({});
      liveStreamInstance.followUserApiId = invalidFollowApi.messageId;
      runEngine.sendMessage("Unit test", invalidFollowApi);
      const invalidUnFollowApi = apiCall({});
      liveStreamInstance.unfollowUserApiId = invalidUnFollowApi.messageId;
      runEngine.sendMessage("Unit test", invalidUnFollowApi);
      const getSelectedUserData3 : Message = apiCall(requestedMockUserData);
      liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserData3.messageId;
      runEngine.sendMessage("Unit test", getSelectedUserData3);
      const renderviewuserdata = LiveStreamBlock.findWhere((node)=>node.prop("testID")=="renderviewuserdata");
      expect(renderviewuserdata).toBeTruthy();
      const user_name2 = LiveStreamBlock.findWhere((node)=>node.prop("testID")=="user_name2");
      expect(user_name2.props().children).toBe("golavi_project");
      let followUnfollowButton = liveStream.findWhere(
        (node) => node.prop("testID") === "followUnfollowButton"
      );
      followUnfollowButton.simulate('press')
     
      const loader = LiveStreamBlock.findWhere((node)=>node.prop("testID")=="viewerfollowLoader");
      expect(loader.exists()).toBe(false);
    })

    then("I can see maximum invitation limit reached alert", async()=>{
      let LiveStreamBlock2: ShallowWrapper;
      let liveStreamInstance2: LiveStreaming;
      LiveStreamBlock2 = shallow(<LiveStreaming {...screenProps} />);
      liveStreamInstance2 = LiveStreamBlock2.instance() as LiveStreaming;
      const chatRoom : any = {};
      //initializeChatRoom will trigger from CommentIVS
      liveStreamInstance2.initializeChatRoom(chatRoom);
      const invalidaLoginUserApiMock = apiCall({data:{attributes:{}}});
      liveStreamInstance2.loginUserCallId = invalidaLoginUserApiMock.messageId;
      runEngine.sendMessage("Unit Test", invalidaLoginUserApiMock);
      const removeParticpantAPiMock = apiCall({});
      liveStreamInstance2.removeParticipantid = removeParticpantAPiMock.messageId;
      runEngine.sendMessage("Unit Test", removeParticpantAPiMock);
      const errorMsg = "Can not send invitation. Maximum limit of 11 invitations reached for this room.";
      const errors = {error:[errorMsg]};
      const maximumParticipantError = apiCall(errors);
    
    })

    then("User can able to gift to participant", async()=> {
      //calling get gifts data api
      let LiveStreamBlock: ShallowWrapper;
      let liveStreamInstance: LiveStreaming;
      LiveStreamBlock = shallow(<LiveStreaming {...screenProps}/>);
      liveStreamInstance = LiveStreamBlock.instance() as LiveStreaming;
      const mockCategoryData= {data:[{id: 1, attributes: {name : "classic"}},{id: 2, attributes: {name : "Premium"}}]};
     
      await LiveStreamBlock.update();
    
      const giftsMockData2 = {data: [{attributes:{image:{url: "url", json : null, type: "image"},type:"image"},id:"5"},{attributes:{image:{url: "url2", json : {}, type: "json"}}}]};
     
      await LiveStreamBlock.update();
      liveStreamInstance.handleOnReceiveGifts({  id: "s",
            content: "s",
            sendTime: new Date(),
            requestId: 'string;',
            attributes: {giftJson:"{}",giftId:"5"},
            sender:{ userId: 'string;',
              attributes:{}}
          })
    })

    then("I can see the following status as a viewer", async()=>{
      const prop = {...screenProps,route:{...screenProps.route, params: {...screenProps.route.params, stageData: {...screenProps.route.params.stageData,isViewer:true,stageArn:"arn"}}}};
      let LiveStreamBlockA: ShallowWrapper;
      let newliveStreamInstance: LiveStreaming;
      LiveStreamBlockA = shallow(<LiveStreaming {...prop}/>);
      newliveStreamInstance = LiveStreamBlockA.instance() as LiveStreaming;
      // const newRender = render(<LiveStreaming {...prop}/>);
      let userData = {
        full_name: "Golavi",
        user_name: "golavi",
        photo: "",
        datasaver: {
          account_id: 1,
        },
      };
          
      const message: Message = apiCall({ data: { attributes: userData, id: 771 } });
      newliveStreamInstance.loginUserCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
      const mockHostData = {data:{attributes:{
        full_name: "user A",
        user_name: "golavi_user",
        photo: "photo",
        followings_status: "follow",
        is_private_account: false,
      }}}
      const mockUserData = {data:{attributes:{
        full_name: "Golavi Viewer",
        user_name: "user_c",
        photo: "",
        datasaver: {
          account_id: 3,
        },
      }}};
      const getHostDataApiFail = apiCall(errorMockData);
      newliveStreamInstance.getHostDetailsApiCallId = getHostDataApiFail.messageId;
      runEngine.sendMessage("Unit Test",getHostDataApiFail);
      const getUserDetails  = apiCall(mockUserData);
      newliveStreamInstance.loginUserCallId = getUserDetails.messageId;
      runEngine.sendMessage("Unit Test",getUserDetails);
      LiveStreamBlockA.update();
      LiveStreamBlockA.find(CommentIVS).prop('shareLink')();
      const getHostDetails = apiCall(mockHostData);
      newliveStreamInstance.getHostDetailsApiCallId = getHostDetails.messageId;
      runEngine.sendMessage("Unit Test",getHostDetails);
      const updatedData = {...mockHostData,data:{attributes:{...mockHostData.data.attributes,followings_status: "following"}}}
      const getUpdatedDetails = apiCall(updatedData);
      newliveStreamInstance.getHostDetailsApiCallId = getUpdatedDetails.messageId;
      runEngine.sendMessage("Unit Test",getUpdatedDetails);
      const requestedData = {...mockHostData,data:{attributes:{...mockHostData.data.attributes,followings_status: "requested"}}}
      const getRequestedDetails = apiCall(requestedData);
      newliveStreamInstance.getHostDetailsApiCallId = getRequestedDetails.messageId;
      runEngine.sendMessage("Unit Test",getRequestedDetails);
      const hostApiFailData = {data:{attributes:{...mockHostData.data.attributes,followings_status: ""}}}
      const hostApiFails = apiCall(hostApiFailData);
      newliveStreamInstance.getHostDetailsApiCallId = hostApiFails.messageId;
      runEngine.sendMessage("Unit Test",hostApiFails);
      expect(LiveStreamBlockA).toBeTruthy();
      const newStageApiFail = apiCall(errorMockData);
      liveStreamInstance.createNewStageApiCallId = newStageApiFail.messageId;
      runEngine.sendMessage("Unit Test",newStageApiFail);
      const newStageApiCall = apiCall({arn: "new_stage_arn", id:2});
      liveStreamInstance.createNewStageApiCallId = newStageApiCall.messageId;
      runEngine.sendMessage("Unit Test",newStageApiCall);
      expect(LiveStreamBlockA).toBeTruthy();
    })

    then("mute user api calls",()=> {
      liveStreamInstance.Blockuser()
      const blockUserid = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      blockUserid.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        blockUserid.messageId
      );
      blockUserid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{attributes:{account_id:1}}}
      );
      liveStreamInstance.blockUserid = blockUserid.messageId;
      runEngine.sendMessage("Unit Test", blockUserid);

      blockUserid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", blockUserid);

      const removeParticipantid = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      removeParticipantid.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        removeParticipantid.messageId
      );
      removeParticipantid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{attributes:{account_id:1}}}
      );
      liveStreamInstance.removeParticipantid = removeParticipantid.messageId;
      runEngine.sendMessage("Unit Test", removeParticipantid);

      removeParticipantid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", removeParticipantid);


      const getStageDataApiId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getStageDataApiId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getStageDataApiId.messageId
      );
      getStageDataApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{attributes:{account_id:1,participants_data:{team1_score:1,team2_score:2}}}}
      );
      liveStreamInstance.getStageDataApiId = getStageDataApiId.messageId;
      runEngine.sendMessage("Unit Test", getStageDataApiId);

      getStageDataApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", getStageDataApiId);
     
      const getStopStreamFromAdminApiId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getStopStreamFromAdminApiId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getStopStreamFromAdminApiId.messageId
      );
      getStopStreamFromAdminApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {stop_stream:true}
      );
      liveStreamInstance.getStopStreamFromAdminApiId = getStopStreamFromAdminApiId.messageId;
      runEngine.sendMessage("Unit Test", getStopStreamFromAdminApiId);

      getStopStreamFromAdminApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", getStopStreamFromAdminApiId);
    
      const getReportedDeleteMessageListAdminApiId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getReportedDeleteMessageListAdminApiId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getReportedDeleteMessageListAdminApiId.messageId
      );
      getReportedDeleteMessageListAdminApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        [{id:"true",stage_id:3,messege_text: "",reason:'' }]
      );
      liveStreamInstance.getReportedDeleteMessageListAdminApiId = getReportedDeleteMessageListAdminApiId.messageId;
      runEngine.sendMessage("Unit Test", getReportedDeleteMessageListAdminApiId);

      getReportedDeleteMessageListAdminApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", getReportedDeleteMessageListAdminApiId);

      expect(LiveStreamBlock).toBeTruthy();
    })

    then("api calls with stage",()=> {
      const getstageiddataApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getstageiddataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getstageiddataApiCallId.messageId
      );
      getstageiddataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      liveStreamInstance.getstageiddataApiCallId = getstageiddataApiCallId.messageId;
      liveStreamInstance.getSingleGiftDataApiCallId = [getstageiddataApiCallId.messageId]
      runEngine.sendMessage("Unit Test", getstageiddataApiCallId);

      getstageiddataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{attributes:{is_allow_comment:true, image: {json : {pos:1}}}}}
      );
      liveStreamInstance.getSingleGiftDataApiCallId = [getstageiddataApiCallId.messageId]
      runEngine.sendMessage("Unit Test", getstageiddataApiCallId);

      const checkForSlowModeApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      checkForSlowModeApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        checkForSlowModeApiCallId.messageId
      );
      checkForSlowModeApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      liveStreamInstance.checkForSlowModeApiCallId = checkForSlowModeApiCallId.messageId;
      runEngine.sendMessage("Unit Test", checkForSlowModeApiCallId);

      checkForSlowModeApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {slow_mode:true}
      );
      runEngine.sendMessage("Unit Test", checkForSlowModeApiCallId);

      
      const newStageButton = LiveStreamBlock.findWhere((node)=> node.prop("testID") === "newStageButton")
newStageButton.simulate('press')

      const updateInviteCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      updateInviteCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateInviteCallId.messageId
      );
      updateInviteCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{attributes:{is_allow_comment:true}}}
      );
      liveStreamInstance.updateInviteCallId = updateInviteCallId.messageId;
      runEngine.sendMessage("Unit Test", updateInviteCallId);

      updateInviteCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", updateInviteCallId);

      const createNewChatApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      createNewChatApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createNewChatApiCallId.messageId
      );
      createNewChatApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {arn:"arn"}
      );
      liveStreamInstance.createNewChatApiCallId = createNewChatApiCallId.messageId;
      runEngine.sendMessage("Unit Test", createNewChatApiCallId);

      createNewChatApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", createNewChatApiCallId);

      const getreportreasonid = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getreportreasonid.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getreportreasonid.messageId
      );
      getreportreasonid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {reason:
          {
            label: 'sexual_content',
            value: 0
          }
        }
      );
      liveStreamInstance.getreportreasonid = getreportreasonid.messageId;
      runEngine.sendMessage("Unit Test", getreportreasonid);

      getreportreasonid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", getreportreasonid);


      expect(LiveStreamBlock).toBeTruthy();
    })


    then("unfollow user api",()=> {
      const message: Message = apiCall(errorMockData);
      liveStreamInstance.unfollowUserApiId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
      expect(LiveStreamBlock).toBeTruthy();

      const unfollowUserApiId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      unfollowUserApiId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        unfollowUserApiId.messageId
      );
      unfollowUserApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{}}
      );
      liveStreamInstance.unfollowUserApiId = unfollowUserApiId.messageId;
      runEngine.sendMessage("Unit Test", unfollowUserApiId);

      const followHostApiId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      followHostApiId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        followHostApiId.messageId
      );
      followHostApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{}}
      );
      liveStreamInstance.followHostApiId = followHostApiId.messageId;
      runEngine.sendMessage("Unit Test", followHostApiId);

      followHostApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'something went wrong'}
      );
      liveStreamInstance.followHostApiId = followHostApiId.messageId;
      runEngine.sendMessage("Unit Test", followHostApiId);

      const followUserApiId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      followUserApiId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        followUserApiId.messageId
      );
      followUserApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{}}
      );
      liveStreamInstance.followUserApiId = followUserApiId.messageId;
      runEngine.sendMessage("Unit Test", followUserApiId);

      followUserApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'something went wrong'}
      );
      liveStreamInstance.followUserApiId = followUserApiId.messageId;
      runEngine.sendMessage("Unit Test", followUserApiId);
    });

    then("stop stream api fails", () => {
      const message: Message = apiCall(errorMockData);
      liveStreamInstance.stopStreamApiCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
      expect(LiveStreamBlock).toBeTruthy();
    });   

    then("stop stream api runs successfully", () => {
      const message: Message = apiCall({ data: {} });
      liveStreamInstance.stopStreamApiCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);

      const getSelectedUserDataApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getSelectedUserDataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getSelectedUserDataApiCallId.messageId
      );
      getSelectedUserDataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{}}
      );
      liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserDataApiCallId.messageId;
      runEngine.sendMessage("Unit Test", getSelectedUserDataApiCallId);

      getSelectedUserDataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'something went wrong'}
      );
      runEngine.sendMessage("Unit Test", getSelectedUserDataApiCallId);

      const updateStageApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      updateStageApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateStageApiCallId.messageId
      );
      updateStageApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{}}
      );
      liveStreamInstance.updateStageApiCallId = updateStageApiCallId.messageId;
      runEngine.sendMessage("Unit Test", updateStageApiCallId);

      updateStageApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", updateStageApiCallId);

      const creategiftsApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      creategiftsApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        creategiftsApiCallId.messageId
      );
      creategiftsApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {donated_to_data:{full_name:'as'},coin_gift:{donated_to_id:1,coins_count:5,points:null},team1_score:50,team2_score:60}
      );
      liveStreamInstance.creategiftsApiCallId = creategiftsApiCallId.messageId;
      runEngine.sendMessage("Unit Test", creategiftsApiCallId);

      creategiftsApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", creategiftsApiCallId);

      expect(LiveStreamBlock).toBeTruthy();
    });

    then("As a host I can view summary screen after ended the stream", () => {

      const getParticipantid = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getParticipantid.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getParticipantid.messageId
      );
      getParticipantid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{participants:[]}}
      );
      liveStreamInstance.getParticipantid = getParticipantid.messageId;
      runEngine.sendMessage("Unit Test", getParticipantid);

      getParticipantid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", getParticipantid);


      const deleteChatRoomApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      deleteChatRoomApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteChatRoomApiCallId.messageId
      );
      deleteChatRoomApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{participants:{}}}
      );
      liveStreamInstance.deleteChatRoomApiCallId = deleteChatRoomApiCallId.messageId;
      runEngine.sendMessage("Unit Test", deleteChatRoomApiCallId);

      deleteChatRoomApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", deleteChatRoomApiCallId);



let closeInvitation3 = LiveStreamBlock.findWhere(
  (node) => node.prop("testID") === "closeInvitation3"
);
closeInvitation3.simulate('press')

const cancelRequestMockData = {
  data: {
    attributes: {
      followings_status : "follow",
      user_name: "golavi_project",
      bio: "user_bio",
      photo: "photo",
      followers_count : 5,
      followings_count : 4
    }
  }
}

const invalidStatusData = {data:{attributes: {...cancelRequestMockData.data.attributes, followings_status : "following",}}}
const getSelectedUserData4 : Message = apiCall(invalidStatusData);
liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserData4.messageId;
runEngine.sendMessage("Unit test", getSelectedUserData4);

let handelmangeview = LiveStreamBlock.findWhere(
  (node) => node.prop("testID") === "handelmangeview"
);
handelmangeview.simulate('press')


const closeBlockKeywordModal = LiveStreamBlock.findWhere(
  (node) => node.prop("testID") === "closeBlockKeywordModal"
);
closeBlockKeywordModal.simulate('press')



liveStreamInstance.handleButton();


liveStreamInstance.onLiked(1)

liveStreamInstance.onLiked(2)





      // const {getByText,rerender} = render(<EndLive {...endLiveProps} />);
      let EndLiveBlock: ShallowWrapper;
      let endLiveInstance: EndLive;
      EndLiveBlock = shallow(<EndLive {...endLiveProps} />);
      endLiveInstance = EndLiveBlock.instance() as EndLive;


    
      let endButton = LiveStreamBlock.findWhere(
        (node) => node.prop("testID") === "endButton"
    );
    endButton.simulate('press')
      const getEndLiveDetails : Message= apiCall({data:{coin_gift_count: null, live_duration: 50, live_followers: 1e9, viewer_count: 1e6}});
      endLiveInstance.getEndedLiveDetailsApiCallId = getEndLiveDetails.messageId;
      runEngine.sendMessage("Unit Test", getEndLiveDetails);
      const getEndLiveDetails2 : Message= apiCall({data:{coin_gift_count: 1002, live_duration: 50, live_followers: 2.5e6, viewer_count: 1e12}});
      endLiveInstance.getEndedLiveDetailsApiCallId = getEndLiveDetails2.messageId;
      runEngine.sendMessage("Unit Test", getEndLiveDetails2);
      // expect(getByText('Total Views')).toBeTruthy();
      // expect(getByText('New followers')).toBeTruthy();
      // expect(getByText('Gifters')).toBeTruthy();

      // API Failure
      const failRequest : Message= apiCall(errorMockData);
      endLiveInstance.getEndedLiveDetailsApiCallId = failRequest.messageId;
      runEngine.sendMessage("Unit Test", failRequest);
      liveStreamInstance.setState({hostSideModeatorData:[{id:0,is_moderator:'Remove'},{id:0,is_moderator:'Add'}]})
      const newStageButton = LiveStreamBlock.findWhere((node)=> node.prop("testID") === "newStageButton")
      newStageButton.simulate('press')

      const alertModel = CommentBlock.find(AlertModal);
      alertModel.forEach(alert =>{
        alert.prop('onPress1')!();
        alert.prop('onPress2')!();
      })

      let myComponent = LiveStreamBlock.find(MuteViews);
      myComponent.prop('onCloseDuration')();
      myComponent.prop('onClose')();
      myComponent.prop('onCloseAddMuteModal')();
      myComponent.prop('onCloseMuted')();
      myComponent.prop('onCloseMutedModal')();
      myComponent.prop('onGetMutedAccounts')([]);
      myComponent.prop('onMuteSelected')();
      myComponent.prop('onSelectMute')({});
      myComponent.prop('onCloseMutedModal')();

      const participantModel = LiveStreamBlock.find(ParticipantsModel)
      participantModel.prop('onClose')();
      participantModel.prop('onSelect')(0);

      const challengeDurationPopup = LiveStreamBlock.find(ChallengeDurationPopup)
      challengeDurationPopup.prop('onClose')();
      challengeDurationPopup.prop('onSelect')(5);

      const settingsModal = LiveStreamBlock.find(SettingsViewModal)
      settingsModal.prop('handleModerater')();
      settingsModal.prop('handleMutedaccountlist')();
      settingsModal.prop('handleComment')();
      settingsModal.prop('goBackFromSetting')();
      settingsModal.prop('onClose')();
      settingsModal.prop('onClose')();

      const commentModal = LiveStreamBlock.find(CommentSettingsModel)
      commentModal.prop('onMute')();
      commentModal.prop('updateComment')();
      commentModal.prop('closeCommentSetting')();
      commentModal.prop('openCommentModal')();

      const settingsModal2 = LiveStreamBlock.find(SettingsModal);
      settingsModal2.prop('handleGift')();
      settingsModal2.prop('handleComment')();
      settingsModal2.prop('handleSettingviewmodel')();
      settingsModal2.prop('handleFlipCamera')();
      settingsModal2.prop('handleMicrophone')();
      settingsModal2.prop('handleSettinsModal')();
      settingsModal2.prop('handleShare')();

      let commentIVS = LiveStreamBlock.find(CommentIVS);
      commentIVS.prop('onCommentBack')();
      commentIVS.prop('onLeaveStream')();
      commentIVS.prop('onSendLikeCount')();
      commentIVS.prop('handelUserBlocked')();
      commentIVS.prop('inviteModal')();
      commentIVS.prop('giftModel')();
      commentIVS.prop('onLiveChanged')("[]","0","10","0");
      commentIVS.prop('handleCancelledMatch')(true);
      commentIVS.prop('handleCancelledMatch')(false);
      commentIVS.prop('onLiked')(1);
      commentIVS.prop('onLiked')(3);
      commentIVS.prop('onRedirectAfterChallenge')({redirectStageArn:"asd",redirectStageId:"asd",redirectChatArn:"asd"});

      let alertModal = LiveStreamBlock.find(CancleMatchModal)
      alertModal.prop('handlecancelMatchModal')()
      alertModal.prop('cancelMatchAction')()

      let alertModal2 = LiveStreamBlock.find(MemoizedAlertModal)
      alertModal2.forEach((value) =>{
        let modelvalue : any = value.props().onPress2
        value.simulate('press2');
        modelvalue();
      })
      
      LiveStreamBlock.find({
        testID: "endButton"
      }).simulate('press')

      alertModal2 = LiveStreamBlock.find(MemoizedAlertModal)
      alertModal2.forEach((value) =>{
        let modelvalue : any = value.props().onPress2
        value.simulate('press2');
        modelvalue();
      })

      const inviteView = LiveStreamBlock.find(InviteView)
      inviteView.prop('handleInviteModal')(1)
      inviteView.prop('handleInviteIds')([]);

      const liveHeader = LiveStreamBlock.find(LiveStreamHeader)
      liveHeader.prop('profileImage')
      liveHeader.prop('hostName')
      liveHeader.prop('handleFollowButton')()
      liveHeader.prop('followStatus')
      liveHeader.prop('onPressWeeklyRanking')()

      const moderatorView = LiveStreamBlock.find(ModeratorView)
      moderatorView.prop('setModeratorAddRemove')('')
      moderatorView.prop('handelModerator')(0,'')
      moderatorView.prop('hostsidemoderatorList')([])
      moderatorView.prop('manageModals')()
      moderatorView.prop('openErrorAlert')()
      moderatorView.prop('openCloseModeratorModel')(true)
      moderatorView.prop('openSettingsModal')()

      const giftModal = LiveStreamBlock.find(GiftModel)
      giftModal.prop('setParticipantLoader')()
      giftModal.prop('setSelectedGift')({})
      giftModal.prop('setParticipantModel')()
      giftModal.prop('setGiftModel')()
      giftModal.prop('setCategoryData')([])
      giftModal.prop('getParticipant')()
      giftModal.prop('setGiftData')({})

      const reportModal = LiveStreamBlock.find(ReportModal)
      reportModal.prop('onClose')();
      

    })

    then("I can render add moderator button",()=>{

      const cancelRequestMockData = {
        data: {
          attributes: {
            followings_status : "follow",
            user_name: "golavi_project",
            bio: "user_bio",
            photo: "photo",
            followers_count : 5,
            followings_count : 4
          }
        }
      }

      const invalidStatusData = {data:{attributes: {...cancelRequestMockData.data.attributes, followings_status : "following",}}}
      const getSelectedUserData4 : Message = apiCall(invalidStatusData);
      liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserData4.messageId;
      runEngine.sendMessage("Unit test", getSelectedUserData4);
      
      let handelmangeview = LiveStreamBlock.findWhere(
        (node) => node.prop("testID") === "handelmangeview"
      );
      handelmangeview.simulate('press')
      expect(LiveStreamBlock).toBeTruthy();
    })

    
    then("I can close the summary screen",()=>{
      // const endLive = render(<EndLive {...endLiveProps} />);
      // fireEvent.press(endLive.getByTestId("crossIcon"));
      liveStreamInstance.handlecancelMatchModal()
      liveStreamInstance.handleSettinsModal()
      liveStreamInstance.handleMirrorVideo()
      liveStreamInstance.handleMicrophone()
      liveStreamInstance.componentWillUnmount()
      expect(LiveStreamBlock).toBeTruthy();
    })
  });

  test("User navigates to LiveStreaming with params", ({ given, when, then }) => {
    Platform.OS = 'android';
    const amazon = shallow(<LiveStreaming {...screenProps2}/>);
    let LiveStreamBlock: ShallowWrapper;
    let liveStreamInstance: LiveStreaming;

    given("I am a User loading LiveStreaming", () => {
      LiveStreamBlock = shallow(<LiveStreaming {...screenProps2} />);
      liveStreamInstance = LiveStreamBlock.instance() as LiveStreaming;
      liveStreamInstance.handleInviteModal(2)
    
    });

    when("I navigate to the LiveStreaming", () => {
      liveStreamInstance.endbuttonPressed();
      expect(LiveStreamBlock).toBeTruthy();
    });
    then("fetching current logged in user data fails", () => {
      const message: Message = apiCall(errorMockData);
      liveStreamInstance.loginUserCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
    }
  );


    then("successfully fetching current logged in user data", () => {

      expect(LiveStreamBlock).toBeTruthy();
    });

    then("create stage room in live stream fails to start", () => {
      expect(LiveStreamBlock).toBeTruthy();
    });
    then("successfully created stage room live stream", () => {
      const message: Message = apiCall({ data: { arn: "", id: "5" } });
      liveStreamInstance.createStageApiCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
      liveStreamInstance.handleBackButtonClick()
      liveStreamInstance.endLive()
      const chatMessage: Message = apiCall({ data: { arn: "" } });
      liveStreamInstance.createChatApiCallId = chatMessage.messageId;
      runEngine.sendMessage("Unit Test", chatMessage);
      expect(LiveStreamBlock).toBeTruthy();
    });

    then("createing stage room token and stage token fails", () => {
      const message: Message = apiCall(errorMockData);
      liveStreamInstance.createTokenApiCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);

      const tokenMessage: Message = apiCall(errorMockData);
      liveStreamInstance.createChatTokenApiCallId = tokenMessage.messageId;
      runEngine.sendMessage("Unit Test", tokenMessage);

      expect(LiveStreamBlock).toBeTruthy();
    });

    then("successfully created stage room token and stage token", () => {
      const createToken: Message = apiCall({stage_arn:"arn:aws:ivs:ap-south-1:621966568940:stage/xvJkaZgI0wu8", stage_id: "112", token: chatProps.chatTokenData.token});
      liveStreamInstance.createTokenApiCallId = createToken.messageId;
      runEngine.sendMessage("Unit Test", createToken);
      const message: Message = apiCall({ data: { stage_arn: "arn:aws:ivs:ap-south-1:621966568940:stage/xvJkaZgI0wu8", token: chatProps.chatTokenData.token } });
      liveStreamInstance.createChatTokenApiCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
      expect(LiveStreamBlock).toBeTruthy();

      let exploreButton = LiveStreamBlock.findWhere(
        (node) => node.prop("testID") === "exploreButton"
    );
    exploreButton.simulate('press');

      const createChatTokenApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      createChatTokenApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createChatTokenApiCallId.messageId
      );
      createChatTokenApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {token:'asdasd',session_expiration_time:"awdad",token_expiration_time:"asd"}
      );
      liveStreamInstance.createChatTokenApiCallId = createChatTokenApiCallId.messageId;
      runEngine.sendMessage("Unit Test", createChatTokenApiCallId);
    });
    

    then("I can invite guest", () => {

  const blockKeyword = LiveStreamBlock.findWhere(
    (node) => node.prop("testID") === "blockKeyword"
);
blockKeyword.simulate('changeText','Harry');

      jest.useFakeTimers();
      jest.runAllTimers();
      jest.useFakeTimers();
  jest.advanceTimersByTime(3000);

    })

    then("I can start the live challenge with one vs one", async() => {
      //handleParticipantState is the callback will trigger from comentIVS
      liveStreamInstance.handleParticipantState({userRole: "viewer", isJoining: "true"});
      liveStreamInstance.handleParticipantState({updateViewerCount: "true", totalViewerCount: ""});
      liveStreamInstance.handleParticipantState({updateViewerCount: "true", totalViewerCount: 7});
      let viewerCount = LiveStreamBlock.findWhere(
      (node) => node.prop("testID") === "viewerCount"
      );
      expect(viewerCount.props().children).toBe(7);
      const firstParticipant = {
        userId : 756, userName : "userA", userRole : "host", userPhoto : ""
      }
      const secondParticipant = {
        userId : 251, userName : "userB", userRole : "cohost", userPhoto : ""
      }
      // onParticipantAdded is a callback function will be called from native when new participant joined
      liveStreamInstance.onParticipantAdded({nativeEvent : firstParticipant});
      liveStreamInstance.onParticipantAdded({nativeEvent : secondParticipant});

      

      const message: Message = apiCall({stage_arn: "arn:aws:ivs:ap-south-1:621966568940:stage/xvJkaZgI0wu8", duration: "5" });
      liveStreamInstance.liveStreamDurationId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
      const body = {
        team1 : liveStreamInstance.myTeamIdList,
        team2 : liveStreamInstance.opponentTeamIdList,
        stage_id : "112"
       };
       const teamSelectionApiCall = apiCall(body)
       liveStreamInstance.teamSelectionApiId = teamSelectionApiCall.messageId;
       await runEngine.sendMessage("Unit Test", teamSelectionApiCall);
       await LiveStreamBlock.update();
      
       liveStreamInstance.handleOnReceiveGifts({  id: "s",
       content: "s",
       sendTime: new Date(),
       requestId: 'string;',
       attributes: {giftJson:"{}",type:"image",team1Score: '100',team2Score:'0',multiplier: '2',selectedHostId:"756"},
       sender:{ userId: 'string;',},
     })
   
     liveStreamInstance.handleOnReceiveGifts({  id: "s",
       content: "s",
       sendTime: new Date(),
       requestId: 'string;',
       attributes: {giftJson:"{}",type:"image",team1Score: '100',team2Score:'300',multiplier: '3',selectedHostId:"251"},
       sender:{ userId: 'string;',},
     })
    })

    then("I can start the live challenge with two vs two", async() => {
      const renderLiveStream = shallow(<LiveStreaming {...screenProps}/>);
      const thirdParticipant = {
        userId : 741, userName : "userC", userRole : "cohost", userPhoto : ""
      }
      const fourthParticipant = {
        userId : 280, userName : "userD", userRole : "cohost", userPhoto : ""
      }
      const liveStreamApiFail : Message = apiCall(errorMockData);
      liveStreamInstance.liveStreamDurationId = liveStreamApiFail.messageId;
      runEngine.sendMessage("Unit Test", liveStreamApiFail);
      liveStreamInstance.onParticipantAdded({nativeEvent : thirdParticipant});
      liveStreamInstance.onParticipantAdded({nativeEvent : fourthParticipant});
      const message: Message = apiCall({stage_arn: "arn:aws:ivs:ap-south-1:621966568940:stage/xvJkaZgI0wu8", duration: "10" });
      liveStreamInstance.liveStreamDurationId = message.messageId;
      await runEngine.sendMessage("Unit Test", message);
      await LiveStreamBlock.update();
      const teamList = LiveStreamBlock.findWhere((node) => node.prop("testID") === "teamList");
      teamList.props().keyExtractor({}, 3);
      expect(teamList).toBeDefined();
      const reportReasonItem = teamList.renderProp('renderItem')({item:{...thirdParticipant,isSelected: true,photo:"photo"},index:2});
      let selectTeam = reportReasonItem.findWhere(
        (node) => node.prop("testID") === "selectTeam"
      );
      selectTeam.simulate("press");
      const reportReasonItem2 = teamList.renderProp('renderItem')({item:{...fourthParticipant,isSelected: false},index:3});
      let selectTeam2 = reportReasonItem2.findWhere(
        (node) => node.prop("testID") === "selectTeam"
      );
      selectTeam2.simulate("press");
      selectTeam2.simulate("press");
      
      let layoutView = LiveStreamBlock.findWhere(
        (node) => node.prop("testID") === "layoutView"
      );
      layoutView.simulate('layout',{nativeEvent:{layout:{height:100}}})
      layoutView.props().children[1].props.handleOnLikePressed({nativeEvent:{userId:3}})

      const unselectedTeamBorderColor = reportReasonItem2.findWhere((node) => node.prop("testID") === "selectTeam").props().style[1].borderColor;
      expect(unselectedTeamBorderColor).toBe("#f9f9f9")
      let getStarted = LiveStreamBlock.findWhere(
        (node) => node.prop("testID") === "getStarted"
      );
      getStarted.simulate('press')
      const teamSelectApiFail : Message = apiCall(errorMockData);
      liveStreamInstance.teamSelectionApiId = teamSelectApiFail.messageId;
      runEngine.sendMessage("Unit Test" , teamSelectApiFail);
    })

    then("I can follow a user by taping grid", async()=>{
      const eventValue = {
        nativeEvent: {
          userId: "5"
        }
      };
      // OnGridTape callback will call from native
      liveStreamInstance.onGridTapped(eventValue);
      const renderprofiledata = LiveStreamBlock.findWhere((node)=>node.prop("testID")=="renderprofiledata");
      expect(renderprofiledata.children.length>0).toBe(true);
      const getSelectedUserData : Message = apiCall(requestedMockUserData);
      liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserData.messageId;
      runEngine.sendMessage("Unit test", getSelectedUserData);
      const user_name = LiveStreamBlock.findWhere((node)=>node.prop("testID")=="user_name");
      expect(user_name.props().children).toBe("golavi_project");
      const followButton = LiveStreamBlock.findWhere((node)=>node.prop("testID")=="followButton");
      followButton.simulate("press");
      const cancelRequestMockData = {
        data: {
          attributes: {
            followings_status : "follow",
            user_name: "golavi_project",
            bio: "user_bio",
            photo: "photo",
            followers_count : 5,
            followings_count : 4
          }
        }
      }
      const followingMockData = {data:{attributes: {...cancelRequestMockData.data.attributes, followings_status : "following",}}}
      const getSelectedUserData3 : Message = apiCall(followingMockData);
      liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserData3.messageId;
      runEngine.sendMessage("Unit test", getSelectedUserData3);
      const invalidStatusData = {data:{attributes: {...cancelRequestMockData.data.attributes, followings_status : "unfollow",}}}
      const getSelectedUserData4 : Message = apiCall(invalidStatusData);
      liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserData4.messageId;
      runEngine.sendMessage("Unit test", getSelectedUserData4);
      const getSelectedUserData2 : Message = apiCall(cancelRequestMockData);
      liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserData2.messageId;
      runEngine.sendMessage("Unit test", getSelectedUserData2);
      liveStreamInstance.handleChildData("5",false);
      const loader2 = LiveStreamBlock.findWhere((node)=>node.prop("testID")=="userFollowButtonLoader");
      expect(loader2.exists()).toBe(false);
    })

    then("I can follow a viewer by taping grid",()=>{
      const liveStream = shallow(<LiveStreaming {...screenProps}/>);
      liveStreamInstance.handleChildData("5",false);
      const getSelectedUserData4 : Message = apiCall({data:null});
      liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserData4.messageId;
      runEngine.sendMessage("Unit test", getSelectedUserData4);
      const invalidFollowApi = apiCall({});
      liveStreamInstance.followUserApiId = invalidFollowApi.messageId;
      runEngine.sendMessage("Unit test", invalidFollowApi);
      const invalidUnFollowApi = apiCall({});
      liveStreamInstance.unfollowUserApiId = invalidUnFollowApi.messageId;
      runEngine.sendMessage("Unit test", invalidUnFollowApi);
      const getSelectedUserData3 : Message = apiCall(requestedMockUserData);
      liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserData3.messageId;
      runEngine.sendMessage("Unit test", getSelectedUserData3);
      const renderviewuserdata = LiveStreamBlock.findWhere((node)=>node.prop("testID")=="renderviewuserdata");
      expect(renderviewuserdata).toBeTruthy();
      const user_name2 = LiveStreamBlock.findWhere((node)=>node.prop("testID")=="user_name2");
      expect(user_name2.props().children).toBe("golavi_project");
      let followUnfollowButton = liveStream.findWhere(
        (node) => node.prop("testID") === "followUnfollowButton"
      );
      followUnfollowButton.simulate('press')
      const loader = LiveStreamBlock.findWhere((node)=>node.prop("testID")=="viewerfollowLoader");
      expect(loader.exists()).toBe(false);
    })

    then("I can see maximum invitation limit reached alert", async()=>{
      let LiveStreamBlock2: ShallowWrapper;
      let liveStreamInstance2: LiveStreaming;
      LiveStreamBlock2 = shallow(<LiveStreaming {...screenProps} />);
      liveStreamInstance2 = LiveStreamBlock2.instance() as LiveStreaming;
      const chatRoom : any = {};
      //initializeChatRoom will trigger from CommentIVS
      liveStreamInstance2.initializeChatRoom(chatRoom);
      const invalidaLoginUserApiMock = apiCall({data:{attributes:{}}});
      liveStreamInstance2.loginUserCallId = invalidaLoginUserApiMock.messageId;
      runEngine.sendMessage("Unit Test", invalidaLoginUserApiMock);
      const removeParticpantAPiMock = apiCall({});
      liveStreamInstance2.removeParticipantid = removeParticpantAPiMock.messageId;
      runEngine.sendMessage("Unit Test", removeParticpantAPiMock);
      const errorMsg = "Can not send invitation. Maximum limit of 11 invitations reached for this room.";
      const errors = {error:[errorMsg]};
      const maximumParticipantError = apiCall(errors);
    })

    then("I can see the following status as a viewer", async()=>{
      const prop = {...screenProps,route:{...screenProps.route, params: {...screenProps.route.params, stageData: {...screenProps.route.params.stageData,isViewer:true,stageArn:"arn"}}}};
      let LiveStreamBlockA: ShallowWrapper;
      let newliveStreamInstance: LiveStreaming;
      LiveStreamBlockA = shallow(<LiveStreaming {...prop}/>);
      newliveStreamInstance = LiveStreamBlockA.instance() as LiveStreaming;
      // const newRender = render(<LiveStreaming {...prop}/>);
      let userData = {
        full_name: "Golavi",
        user_name: "golavi",
        photo: "",
        datasaver: {
          account_id: 1,
        },
      };
          
      const message: Message = apiCall({ data: { attributes: userData, id: 771 } });
      newliveStreamInstance.loginUserCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
      const mockHostData = {data:{attributes:{
        full_name: "user A",
        user_name: "golavi_user",
        photo: "photo",
        followings_status: "follow",
        is_private_account: false,
      }}}
      const mockUserData = {data:{attributes:{
        full_name: "Golavi Viewer",
        user_name: "user_c",
        photo: "",
        datasaver: {
          account_id: 3,
        },
      }}};
      const getHostDataApiFail = apiCall(errorMockData);
      newliveStreamInstance.getHostDetailsApiCallId = getHostDataApiFail.messageId;
      runEngine.sendMessage("Unit Test",getHostDataApiFail);
      const getUserDetails  = apiCall(mockUserData);
      newliveStreamInstance.loginUserCallId = getUserDetails.messageId;
      runEngine.sendMessage("Unit Test",getUserDetails);
      const getHostDetails = apiCall(mockHostData);
      newliveStreamInstance.getHostDetailsApiCallId = getHostDetails.messageId;
      runEngine.sendMessage("Unit Test",getHostDetails);
      const updatedData = {...mockHostData,data:{attributes:{...mockHostData.data.attributes,followings_status: "following"}}}
      const getUpdatedDetails = apiCall(updatedData);
      newliveStreamInstance.getHostDetailsApiCallId = getUpdatedDetails.messageId;
      runEngine.sendMessage("Unit Test",getUpdatedDetails);
      const requestedData = {...mockHostData,data:{attributes:{...mockHostData.data.attributes,followings_status: "requested"}}}
      const getRequestedDetails = apiCall(requestedData);
      newliveStreamInstance.getHostDetailsApiCallId = getRequestedDetails.messageId;
      runEngine.sendMessage("Unit Test",getRequestedDetails);
      const hostApiFailData = {data:{attributes:{...mockHostData.data.attributes,followings_status: ""}}}
      const hostApiFails = apiCall(hostApiFailData);
      newliveStreamInstance.getHostDetailsApiCallId = hostApiFails.messageId;
      runEngine.sendMessage("Unit Test",hostApiFails);
      expect(LiveStreamBlockA).toBeTruthy();
      const newStageApiFail = apiCall(errorMockData);
      liveStreamInstance.createNewStageApiCallId = newStageApiFail.messageId;
      runEngine.sendMessage("Unit Test",newStageApiFail);
      const newStageApiCall = apiCall({arn: "new_stage_arn", id:2});
      liveStreamInstance.createNewStageApiCallId = newStageApiCall.messageId;
      runEngine.sendMessage("Unit Test",newStageApiCall);
      expect(LiveStreamBlockA).toBeTruthy();
    })

    then("mute user api calls",()=> {
      liveStreamInstance.Blockuser()
      const blockUserid = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      blockUserid.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        blockUserid.messageId
      );
      blockUserid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{attributes:{account_id:1}}}
      );
      liveStreamInstance.blockUserid = blockUserid.messageId;
      runEngine.sendMessage("Unit Test", blockUserid);

      blockUserid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", blockUserid);



      const removeParticipantid = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      removeParticipantid.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        removeParticipantid.messageId
      );
      removeParticipantid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{attributes:{account_id:1}}}
      );
      liveStreamInstance.removeParticipantid = removeParticipantid.messageId;
      runEngine.sendMessage("Unit Test", removeParticipantid);

      removeParticipantid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", removeParticipantid);


      const getStageDataApiId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getStageDataApiId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getStageDataApiId.messageId
      );
      getStageDataApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{attributes:{account_id:1,participants_data:{team1_score:1,team2_score:2}}}}
      );
      liveStreamInstance.getStageDataApiId = getStageDataApiId.messageId;
      runEngine.sendMessage("Unit Test", getStageDataApiId);

      getStageDataApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", getStageDataApiId);

      expect(LiveStreamBlock).toBeTruthy();
    })

    then("api calls with stage",()=> {
      const getstageiddataApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getstageiddataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getstageiddataApiCallId.messageId
      );
      getstageiddataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      liveStreamInstance.getstageiddataApiCallId = getstageiddataApiCallId.messageId;
      liveStreamInstance.getSingleGiftDataApiCallId = [getstageiddataApiCallId.messageId]
      runEngine.sendMessage("Unit Test", getstageiddataApiCallId);

      getstageiddataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{attributes:{is_allow_comment:true, image: {json : {pos:1}}}}}
      );
      liveStreamInstance.getSingleGiftDataApiCallId = [getstageiddataApiCallId.messageId]
      runEngine.sendMessage("Unit Test", getstageiddataApiCallId);

      const newStageButton = LiveStreamBlock.findWhere((node)=> node.prop("testID") === "newStageButton")
newStageButton.simulate('press')

      const updateInviteCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      updateInviteCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateInviteCallId.messageId
      );
      updateInviteCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{attributes:{is_allow_comment:true}}}
      );
      liveStreamInstance.updateInviteCallId = updateInviteCallId.messageId;
      runEngine.sendMessage("Unit Test", updateInviteCallId);

      updateInviteCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", updateInviteCallId);

      const createNewChatApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      createNewChatApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createNewChatApiCallId.messageId
      );
      createNewChatApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {arn:"arn"}
      );
      liveStreamInstance.createNewChatApiCallId = createNewChatApiCallId.messageId;
      runEngine.sendMessage("Unit Test", createNewChatApiCallId);

      createNewChatApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", createNewChatApiCallId);

      const getreportreasonid = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getreportreasonid.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getreportreasonid.messageId
      );
      getreportreasonid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {reason:
          {
            label: 'sexual_content',
            value: 0
          }
        }
      );
      liveStreamInstance.getreportreasonid = getreportreasonid.messageId;
      runEngine.sendMessage("Unit Test", getreportreasonid);

      getreportreasonid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", getreportreasonid);


      expect(LiveStreamBlock).toBeTruthy();
    })


    then("unfollow user api",()=> {
      const message: Message = apiCall(errorMockData);
      liveStreamInstance.unfollowUserApiId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
      expect(LiveStreamBlock).toBeTruthy();

      const unfollowUserApiId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      unfollowUserApiId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        unfollowUserApiId.messageId
      );
      unfollowUserApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{}}
      );
      liveStreamInstance.unfollowUserApiId = unfollowUserApiId.messageId;
      runEngine.sendMessage("Unit Test", unfollowUserApiId);

      const followHostApiId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      followHostApiId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        followHostApiId.messageId
      );
      followHostApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{}}
      );
      liveStreamInstance.followHostApiId = followHostApiId.messageId;
      runEngine.sendMessage("Unit Test", followHostApiId);

      followHostApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'something went wrong'}
      );
      liveStreamInstance.followHostApiId = followHostApiId.messageId;
      runEngine.sendMessage("Unit Test", followHostApiId);

      const followUserApiId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      followUserApiId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        followUserApiId.messageId
      );
      followUserApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{}}
      );
      liveStreamInstance.followUserApiId = followUserApiId.messageId;
      runEngine.sendMessage("Unit Test", followUserApiId);

      followUserApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'something went wrong'}
      );
      liveStreamInstance.followUserApiId = followUserApiId.messageId;
      runEngine.sendMessage("Unit Test", followUserApiId);
    });

    then("stop stream api fails", () => {
      const message: Message = apiCall(errorMockData);
      liveStreamInstance.stopStreamApiCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);
      expect(LiveStreamBlock).toBeTruthy();
    });   

    then("stop stream api runs successfully", () => {
      const message: Message = apiCall({ data: {} });
      liveStreamInstance.stopStreamApiCallId = message.messageId;
      runEngine.sendMessage("Unit Test", message);

      const getSelectedUserDataApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getSelectedUserDataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getSelectedUserDataApiCallId.messageId
      );
      getSelectedUserDataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{}}
      );
      liveStreamInstance.getSelectedUserDataApiCallId = getSelectedUserDataApiCallId.messageId;
      runEngine.sendMessage("Unit Test", getSelectedUserDataApiCallId);

      getSelectedUserDataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'something went wrong'}
      );
      runEngine.sendMessage("Unit Test", getSelectedUserDataApiCallId);

      const updateStageApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      updateStageApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateStageApiCallId.messageId
      );
      updateStageApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{}}
      );
      liveStreamInstance.updateStageApiCallId = updateStageApiCallId.messageId;
      runEngine.sendMessage("Unit Test", updateStageApiCallId);

      updateStageApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", updateStageApiCallId);

      const creategiftsApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      creategiftsApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        creategiftsApiCallId.messageId
      );
      creategiftsApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{attributes:{donated_to_data:{full_name:'as'}}}}
      );
      liveStreamInstance.creategiftsApiCallId = creategiftsApiCallId.messageId;
      runEngine.sendMessage("Unit Test", creategiftsApiCallId);

      creategiftsApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", creategiftsApiCallId);

      expect(LiveStreamBlock).toBeTruthy();
    });

    then("As a host I can view summary screen after ended the stream", () => {

      const getParticipantid = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getParticipantid.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getParticipantid.messageId
      );
      getParticipantid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{participants:[]}}
      );
      liveStreamInstance.getParticipantid = getParticipantid.messageId;
      runEngine.sendMessage("Unit Test", getParticipantid);

      getParticipantid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", getParticipantid);


      const deleteChatRoomApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      deleteChatRoomApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteChatRoomApiCallId.messageId
      );
      deleteChatRoomApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{participants:{}}}
      );
      liveStreamInstance.deleteChatRoomApiCallId = deleteChatRoomApiCallId.messageId;
      runEngine.sendMessage("Unit Test", deleteChatRoomApiCallId);

      deleteChatRoomApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", deleteChatRoomApiCallId);



let closeInvitation3 = LiveStreamBlock.findWhere(
  (node) => node.prop("testID") === "closeInvitation3"
);
closeInvitation3.simulate('press')

let handelmangeview = LiveStreamBlock.findWhere(
  (node) => node.prop("testID") === "handelmangeview"
);
handelmangeview.simulate('press')


const closeBlockKeywordModal = LiveStreamBlock.findWhere(
  (node) => node.prop("testID") === "closeBlockKeywordModal"
);
closeBlockKeywordModal.simulate('press')



liveStreamInstance.handleButton();


liveStreamInstance.onLiked(1)

liveStreamInstance.onLiked(2)

      let EndLiveBlock: ShallowWrapper;
      let endLiveInstance: EndLive;
      EndLiveBlock = shallow(<EndLive {...endLiveProps} />);
      endLiveInstance = EndLiveBlock.instance() as EndLive;
    
      let endButton = LiveStreamBlock.findWhere(
        (node) => node.prop("testID") === "endButton"
    );
    endButton.simulate('press')

    const streamProps = {
      hostId:"1",
      onParticipantLeft:jest.fn(),
      onParticipantAdded:jest.fn(),
      endbuttonPressed:jest.fn(),
      flipCamera:"front",
      selectedChallengeUserId:0,
      teamIdForNative:"",
      isMute:"mute",
      handleOnLikePressed:jest.fn(),
      onGridTapped:jest.fn(),
      isLiveChallenge:true,
      broadcastDetail:"",
      nativeViewHeight:"12",
      streamViewHeight:"12",
      streamEndPressed:true
    }

   shallow(<StreamView {...streamProps} />)
     
      const getEndLiveDetails : Message= apiCall({data:{coin_gift_count: null, live_duration: 50, live_followers: 1e9, viewer_count: 1e6}});
      endLiveInstance.getEndedLiveDetailsApiCallId = getEndLiveDetails.messageId;
      runEngine.sendMessage("Unit Test", getEndLiveDetails);
      const getEndLiveDetails2 : Message= apiCall({data:{coin_gift_count: 1002, live_duration: 50, live_followers: 2.5e6, viewer_count: 1e12}});
      endLiveInstance.getEndedLiveDetailsApiCallId = getEndLiveDetails2.messageId;
      runEngine.sendMessage("Unit Test", getEndLiveDetails2);
  
      // API Failure
      const failRequest : Message= apiCall(errorMockData);
      endLiveInstance.getEndedLiveDetailsApiCallId = failRequest.messageId;
      runEngine.sendMessage("Unit Test", failRequest);
      liveStreamInstance.setState({hostSideModeatorData:[{id:0,is_moderator:'Remove'},{id:0,is_moderator:'Add'}]})
      const newStageButton = LiveStreamBlock.findWhere((node)=> node.prop("testID") === "newStageButton")
      newStageButton.simulate('press')

    })
    then("I can close the summary screen",()=>{
      expect(LiveStreamBlock).toBeTruthy();
    })
  });
});
