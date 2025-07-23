import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import React from "react";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import EndLive from "../../src/EndLive";
import * as utils from "../../../../framework/src/Utilities";


const screenProps = {
    navigation: {
        goBack: jest.fn(),
        reset: jest.fn(),
        navigate: jest.fn(),
        addListener: jest.fn((key: string, callback: () => void) => {
            callback();
        }),
    },
  route: {
    params: {
      title: "title", recordingUrl: "url", screen: "screen",
      data: {
        title: "title1",
        topic: "string",
        image: "http",
      },
      stageData: undefined,
      stage_id: "123",
      account_id: "123",
      participant_id: "123",
      EventDetails:{attributes:{event_name:"name",description:"desc"}}
    }
  },
    id:"1"
};

const screenProps2 = {
  navigation: {
      goBack: jest.fn(),
      reset: jest.fn(),
      navigate: jest.fn(),
      addListener: jest.fn((key: string, callback: () => void) => {
          callback();
      }),
  },
route: {
  params: {
    title: null, recordingUrl: null, screen: "screen",
    data: {
      title: "title1",
      topic: "string",
      image: "http",
    },
    stageData: undefined,
    stage_id: "123",
    account_id: "123",
    participant_id: "123",
    EventDetails:{attributes:{event_name:"name",description:"desc"}}
  }
},
  id:"1"
};

const EndLiveFeature = loadFeature(
  "./__tests__/features/EndLive-scenario.feature"
);

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

const mockgetStorageData = jest.spyOn(utils, "getStorageData")

defineFeature(EndLiveFeature, (test) => {
  jest.useFakeTimers();
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(global, 'setTimeout').mockImplementation((cb:any) => cb() );
    jest.spyOn(global, 'setInterval').mockImplementation((cb:any) => cb() );
    mockgetStorageData.mockImplementation((key) => {
      if("SelectedLng" === key) return Promise.resolve("ar")
      else return Promise.resolve("766")
    })
  });

  test("User navigates to EndLive", ({ given, when, then }) => {
    let EndLiveBlock: ShallowWrapper;
    let EndLiveInstance: EndLive;
   
    given("I am a User loading EndLive", () => {
        EndLiveBlock = shallow(<EndLive {...screenProps} />);
        EndLiveInstance = EndLiveBlock.instance() as EndLive;
    });

    when("I navigate to the EndLive", () => {
      const getEndLiveDetails : Message= apiCall({data:{coin_gift_count: null, live_duration: {hour:11,minutes:20,seconds:10}, live_followers: 1e9, viewer_count: 1e6}});
      EndLiveInstance.getEndedLiveDetailsApiCallId = getEndLiveDetails.messageId;
      runEngine.sendMessage("Unit Test", getEndLiveDetails);
      const getEndLiveDetails2 : Message= apiCall({data:{coin_gift_count: 1002, live_duration: {hour:2,minutes:0,seconds:0}, live_followers: 2.5e6, viewer_count: 1e12}});
      EndLiveInstance.getEndedLiveDetailsApiCallId = getEndLiveDetails2.messageId;
      runEngine.sendMessage("Unit Test", getEndLiveDetails2);
   });

   then("get all summery data",()=> {    
     const videoId = EndLiveBlock.findWhere((node)=> node.prop("testID") === "videoID")
    //  videoId.simulate('press');
    EndLiveInstance.setState({replayView:true})
    const VideoId = EndLiveBlock.findWhere((node)=> node.prop("testID") === "VideoId")
    VideoId.simulate('error');
    VideoId.simulate("readyForDisplay");
    VideoId.simulate('loadStart')

     const deleteIcon = EndLiveBlock.findWhere((node)=> node.prop("testID") === "deleteIcon")
    //  deleteIcon.simulate('press')

     const alertModalID = EndLiveBlock.findWhere((node)=> node.prop("testID") === "alertModalID")
    //  alertModalID.props().onPress1()
    //  alertModalID.props().onPress2()


     const deleteRecordingApiId = new Message(getName(MessageEnum.RestAPIResponceMessage))
     EndLiveInstance.deleteRecordingApiId = deleteRecordingApiId.messageId;
     deleteRecordingApiId.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteRecordingApiId.messageId);
     deleteRecordingApiId.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {Message:"sucess"})
     runEngine.sendMessage("Unit Test", deleteRecordingApiId)

     const radioLabelId = EndLiveBlock.findWhere((node)=> node.prop("testID") === "crossIcon")
     radioLabelId.simulate('press')
    })

   then("component will unmount",()=> {
    const deleteRecordingApiId = new Message(getName(MessageEnum.RestAPIResponceMessage))
    EndLiveInstance.deleteRecordingApiId = deleteRecordingApiId.messageId;
    deleteRecordingApiId.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteRecordingApiId.messageId);
    deleteRecordingApiId.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {error:"error"})
    runEngine.sendMessage("Unit Test", deleteRecordingApiId)
   EndLiveInstance.componentWillUnmount()
   })

});

test("User navigates to EndLive no params", ({ given, when, then }) => {
  let EndLiveBlock: ShallowWrapper;
  let EndLiveInstance: EndLive;
 
  given("I am a User loading EndLive", () => {
      EndLiveBlock = shallow(<EndLive {...screenProps2} />);
      EndLiveInstance = EndLiveBlock.instance() as EndLive;
  });

  when("I navigate to the EndLive", () => {
    const getEndLiveDetails : Message= apiCall({data:{coin_gift_count: null, live_duration: {hour:11,minutes:20,seconds:10}, live_followers: 1e9, viewer_count: 1e6}});
      EndLiveInstance.getEndedLiveDetailsApiCallId = getEndLiveDetails.messageId;
      runEngine.sendMessage("Unit Test", getEndLiveDetails);
      const getEndLiveDetails2 : Message= apiCall({data:{coin_gift_count: 1002, live_duration: {hour:2,minutes:0,seconds:0}, live_followers: 2.5e6, viewer_count: 1e12}});
      EndLiveInstance.getEndedLiveDetailsApiCallId = getEndLiveDetails2.messageId;
      runEngine.sendMessage("Unit Test", getEndLiveDetails2);
      
 });

 then("get all summery data",()=> {    
   const videoId = EndLiveBlock.findWhere((node)=> node.prop("testID") === "videoID")
  //  videoId.simulate('press')
EndLiveInstance.setState({replayView:true})
   const VideoId = EndLiveBlock.findWhere((node)=> node.prop("testID") === "VideoId")
      VideoId.simulate('error');
      VideoId.simulate("readyForDisplay");
      VideoId.simulate('loadStart')

  //  VideoId.props().onError();
  //  VideoId.props().onLoadStart();
  //  VideoId.props().onReadyForDisplay()

   const deleteIcon = EndLiveBlock.findWhere((node)=> node.prop("testID") === "crossIcon2")
   deleteIcon.simulate('press')

   const deleteRecordingApiId = new Message(getName(MessageEnum.RestAPIResponceMessage))
   EndLiveInstance.deleteRecordingApiId = deleteRecordingApiId.messageId;
   deleteRecordingApiId.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteRecordingApiId.messageId);
   deleteRecordingApiId.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {Message:"sucess"})
   runEngine.sendMessage("Unit Test", deleteRecordingApiId)

   const radioLabelId = EndLiveBlock.findWhere((node)=> node.prop("testID") === "crossIcon")
   radioLabelId.simulate('press')


  })

 then("component will unmount",()=> {
 EndLiveInstance.componentWillUnmount()
 })

});
})
