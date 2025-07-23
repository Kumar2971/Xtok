import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import LiveStreaming from "../../src/LiveStreaming";
// import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CommentIVS from "../../src/CommentIVS";
import { Platform } from "react-native";
import * as utils from "../../../../framework/src/Utilities";


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
        chatData:[]
      },
      stage_id: "112",
      account_id: "756",
      participant_id:"",
      EventDetails:{attributes:{event_name:"name",description:"desc"}}
    },
  },
};


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


let errorMockData = { error: "Something went wrong!" };

const chatProps = {
    userData: {
    full_name: "sa",
    user_name: "as",
    photo: "",
    id:"1"
  },
    isHost:"true",
    stageId: "10",
  isChallenge:false,
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


const liveStreamFeature = loadFeature(
  "./__tests__/features/LiveStreamingIVS-scenario.feature"
);

const mockgetStorageData = jest.spyOn(utils, "getStorageData")

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
  const navigationMessage = new Message(getName(MessageEnum.NavigationPayLoadMessage));
  navigationMessage.addData(getName(MessageEnum.PostDetailDataMessage),{
    is_private: true,
});
  runEngine.sendMessage("Unit Test", navigationMessage);

  let flatListItem = flatlistTest.prop('renderItem')({item:{message:{attributes:{message_type:"GIFT"}, Message:{text:"",type:""},imageUrl:""},senderId:'1',senderName:"hello"}})
  let shalflatListItem = shallow(flatListItem);
    let deletComment = shalflatListItem.findWhere((node)=> node.prop('testID') === 'deleteCommentButton')
    deletComment.simulate('press')
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

  });

});
