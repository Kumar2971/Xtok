import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import React from "react";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LiveExplore from "../../src/LiveExplore";

const screenProps = {
  navigation: {
    goBack:jest.fn(),
    navigate:jest.fn(),
     addListener: jest.fn((key: string, callback: () => void) => {
      callback();
    }),
  },
  id: "LiveExplore",
};

const LiveAWSExploreFeature = loadFeature(
  "./__tests__/features/LiveExplore-scenario.feature"
);

defineFeature(LiveAWSExploreFeature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(global, 'setTimeout').mockImplementation((cb:any) => cb() );
    jest.spyOn(global, 'setInterval').mockImplementation((cb:any) => cb() );
  });

  test("User navigates to LiveExplore", ({ given, when, then }) => {
    let liveExploreBlock: ShallowWrapper;
    let liveExploreInstance: LiveExplore;
   
    given("I am a User loading LiveExplore", () => {
      liveExploreBlock = shallow(<LiveExplore {...screenProps} />);
      liveExploreInstance = liveExploreBlock.instance() as LiveExplore;
    });

    when("I navigate to the LiveExplore", () => {
    let left = liveExploreBlock.findWhere((node)=> node.prop("testID") === "leftArrow")
    left.simulate('press')

    let right = liveExploreBlock.findWhere((node)=> node.prop("testID") === "right")
    right.simulate('press')

    let viewAllButton = liveExploreBlock.findWhere((node)=> node.prop("testID") === "viewAllButton")
    viewAllButton.simulate('press')
    

    let flatlistOne = liveExploreBlock.findWhere((node)=> node.prop("testID") === "flatlistOne")
    flatlistOne.simulate('endReached')
    flatlistOne.props().keyExtractor({}, 3);
    let nullItem = flatlistOne.prop('renderItem')({item:null});
    let nullItemShallow = shallow(nullItem);
    let navigateButton1 = nullItemShallow.findWhere((node)=> node.prop("testID") === "navigateButton")
    navigateButton1.simulate('press')
    let newFlatlistItem = flatlistOne.prop('renderItem')({item:{stage_image:"",stage_name:"as",account_profile_photo:"ss",}})
    let itemShallow = shallow(newFlatlistItem)  
    let navigateButton = itemShallow.findWhere((node)=> node.prop("testID") === "navigateButton")
    navigateButton.simulate('press')

    let flatlistTwo = liveExploreBlock.findWhere((node)=> node.prop("testID") === "flatlistTwo")
    flatlistTwo.simulate('endReached')
    flatlistTwo.props().keyExtractor({}, 3);
    flatlistTwo.prop('renderItem')({item:{stage_image:null,stage_name:"as",account_profile_photo:"",stage_title:""}})
    flatlistTwo.prop('renderItem')({item:{stage_image:"as",stage_name:"as",account_profile_photo:"ss",stage_title:null}})
    
  });

    then("get current user data api",()=> {
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
      liveExploreInstance.login_user_CallID = getSearchAccountsApiCallId.messageId;
      runEngine.sendMessage("Unit Test", getSearchAccountsApiCallId);
      expect(liveExploreBlock).toBeTruthy();
    })

    then("get live stage challenge api fails",()=> { 
      const liveChallengeStagesCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      liveChallengeStagesCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        liveChallengeStagesCallId.messageId
      );
      liveChallengeStagesCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:"error"}
      );
      liveExploreInstance.liveChallengeStagesCallId = liveChallengeStagesCallId.messageId;
      runEngine.sendMessage("Unit Test", liveChallengeStagesCallId);

      const liveChallengeStagesCallId2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      liveChallengeStagesCallId2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        liveChallengeStagesCallId2.messageId
      );
      liveChallengeStagesCallId2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {message:"No stages found"}
      );
      liveExploreInstance.liveChallengeStagesCallId = liveChallengeStagesCallId2.messageId;
      runEngine.sendMessage("Unit Test", liveChallengeStagesCallId2);
      expect(liveExploreBlock).toBeTruthy();
    });

    then("get live stage challenge api runs successfully",()=> { 
      const liveChallengeStagesCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      liveChallengeStagesCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        liveChallengeStagesCallId.messageId
      );
      liveChallengeStagesCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.stringify({meta:{pagination:{current_page:1},data:[{stage_image:"",stage_name:"as",account_profile_photo:"ss",}]}})
      );
      liveExploreInstance.liveChallengeStagesCallId = liveChallengeStagesCallId.messageId;
      runEngine.sendMessage("Unit Test", liveChallengeStagesCallId);
      expect(liveExploreBlock).toBeTruthy();
    });

    then("get live stage api failes to tun",()=> { 
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
      liveExploreInstance.liveStagesDataCallId = liveStagesDataCallId.messageId;
      runEngine.sendMessage("Unit Test", liveStagesDataCallId);
      expect(liveExploreBlock).toBeTruthy();
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
        {meta:{pagination:{current_page:1},data:[{stage_image:"",stage_name:"as",account_profile_photo:"ss",}]}}
      );
      liveExploreInstance.liveStagesDataCallId = liveStagesDataCallId.messageId;
      runEngine.sendMessage("Unit Test", liveStagesDataCallId);
      expect(liveExploreBlock).toBeTruthy();
    });
  
  });
});
