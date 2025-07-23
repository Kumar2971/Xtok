import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import React from "react";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ViewAllLiveStreams from "../../src/ViewAllLiveStreams";
import * as utils from "../../../../framework/src/Utilities";
const screenProps = {
  navigation: {
    goBack:jest.fn(),
    navigate:jest.fn(),
    addListener: jest.fn((key: string, callback: () => void) => {
     callback();
   }),
  },
  id: "ViewAllLiveStreams",
  route:{
    params:{
        type:"Challenge"
    }
  }
};

const stageProps = {
  navigation: {
    goBack:jest.fn(),
    navigate: jest.fn(),
  },
  id: "ViewAllLiveStreams",
  route:{
    params:{
        type:"Live"
    }
  }
};

const ViewAllLiveStreamsFeature = loadFeature(
  "./__tests__/features/ViewAllLiveStreams-scenario.feature"
);
const mockgetStorageData = jest.spyOn(utils, "getStorageData")
defineFeature(ViewAllLiveStreamsFeature, (test) => {
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

  test("User navigates to ViewAllLiveStreams", ({ given, when, then }) => {
    let viewAllLiveStreamBlock: ShallowWrapper;
    let viewAllLiveStageBlock: ShallowWrapper;
    let viewAllLiveStreamInstance: ViewAllLiveStreams;
    let viewAllLiveStageInstance: ViewAllLiveStreams;

    given("I am a User loading ViewAllLiveStreams", () => {
      viewAllLiveStreamBlock = shallow(<ViewAllLiveStreams {...screenProps} />);
      viewAllLiveStreamInstance = viewAllLiveStreamBlock.instance() as ViewAllLiveStreams;
      viewAllLiveStageBlock = shallow(<ViewAllLiveStreams {...stageProps} />);
      viewAllLiveStageInstance = viewAllLiveStageBlock.instance() as ViewAllLiveStreams;
    });

    when("I navigate to the ViewAllLiveStreams", () => {
      let left = viewAllLiveStreamBlock.findWhere((node)=> node.prop("testID") === "left")
      left.simulate('press')

      let touchable = viewAllLiveStreamBlock.findWhere((node)=> node.prop("testID") === "touchable")
      touchable.simulate('press')


    });
   

    then("get current user data api",()=> {
      const getCurrentUser = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCurrentUser.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCurrentUser.messageId
      );
      getCurrentUser.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:"error"}
      );
      viewAllLiveStreamInstance.login_user_CallID = getCurrentUser.messageId;
      runEngine.sendMessage("Unit Test", getCurrentUser);


      const getSearchAccountsApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getSearchAccountsApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getSearchAccountsApiCallId.messageId
      );
      getSearchAccountsApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{attributes:{}}}
      );
      viewAllLiveStreamInstance.login_user_CallID = getSearchAccountsApiCallId.messageId;
      runEngine.sendMessage("Unit Test", getSearchAccountsApiCallId);
      expect(viewAllLiveStageBlock).toBeTruthy();
    })

    then("get live stage api fails",()=> { 
      const liveStagesDataCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      liveStagesDataCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        liveStagesDataCallId.messageId
      );
      liveStagesDataCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:"error"}
      );
      viewAllLiveStreamInstance.getLiveDataCallID = liveStagesDataCallId.messageId;
      runEngine.sendMessage("Unit Test", liveStagesDataCallId);
      expect(viewAllLiveStageBlock).toBeTruthy();
    });

    then("get live stage api runs successfully",()=> { 
      const liveStagesDataCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      liveStagesDataCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        liveStagesDataCallId.messageId
      );
      liveStagesDataCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {meta:{pagination:{current_page:1,total_pages:5},data:[{stage_image:"",stage_name:"as",account_profile_photo:"ss",}]}}
      );
      viewAllLiveStreamInstance.getLiveDataCallID = liveStagesDataCallId.messageId;
      runEngine.sendMessage("Unit Test", liveStagesDataCallId);
      expect(viewAllLiveStageBlock).toBeTruthy();

      let flatlistOne = viewAllLiveStreamBlock.findWhere((node)=> node.prop("testID") === "flatlistOne")
      flatlistOne.simulate('endReached')
      flatlistOne.props().keyExtractor({}, 3);
      flatlistOne.prop('renderItem')({item:null})
      flatlistOne.prop('renderItem')({item:{stage_image:"",stage_name:"as",account_profile_photo:""}})
      let newFlatlistItem = flatlistOne.prop('renderItem')({item:{stage_image:"asdsd",stage_name:"as",account_profile_photo:"ss",}})
      let itemShallow = shallow(newFlatlistItem)  
      let navigateButton = itemShallow.findWhere((node)=> node.prop("testID") === "navigateButton")
      navigateButton.simulate('press')
    });


    then("get live stage challenge api fails",()=> { 
      const liveStagesDataCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      liveStagesDataCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        liveStagesDataCallId.messageId
      );
      liveStagesDataCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:"error"}
      );
      viewAllLiveStreamInstance.liveChallengeDataCallId = liveStagesDataCallId.messageId;
      runEngine.sendMessage("Unit Test", liveStagesDataCallId);
      expect(viewAllLiveStageBlock).toBeTruthy();
    });

    then("get live stage challenge api runs successfully",()=> { 
      const liveStagesDataCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      liveStagesDataCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        liveStagesDataCallId.messageId
      );
      liveStagesDataCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {meta:{pagination:{current_page:1,total_pages:5},data:[{attributes:{image_url:"",name:"as",account_data:{photo:"ss",}}}]}}
      );
      viewAllLiveStreamInstance.liveChallengeDataCallId = liveStagesDataCallId.messageId;
      runEngine.sendMessage("Unit Test", liveStagesDataCallId);
      expect(viewAllLiveStageBlock).toBeTruthy();

      let flatlistTwo = viewAllLiveStageBlock.findWhere((node)=> node.prop("testID") === "flatlistTwo")
      flatlistTwo.simulate('endReached')
      flatlistTwo.simulate('keyExtractor',{id:'1'})
      let nullShallow = shallow(flatlistTwo.prop('renderItem')({item:null}));
      let navigateButton1 = nullShallow.findWhere((node)=> node.prop("testID") === "navigateButton")
      navigateButton1.simulate('press')
      expect(screenProps.navigation.navigate).toHaveBeenCalled();
      let flatListShallow = shallow(flatlistTwo.prop('renderItem')({item:{attributes:{image_url:"",name:"as",account_data:{photo:"ss",}}}}));
      let navigateButton = flatListShallow.findWhere((node)=> node.prop("testID") === "navigateButton")
      navigateButton.simulate('press')
      expect(screenProps.navigation.navigate).toHaveBeenCalled();
      flatlistTwo.props().keyExtractor({}, 3);
    });

   
  });
});
