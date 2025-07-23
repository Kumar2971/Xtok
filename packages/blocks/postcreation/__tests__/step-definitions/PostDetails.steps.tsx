/// <reference types="@types/jest" />

import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import * as utils from "../../../../framework/src/Utilities";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import PostDetails from "../../src/feed/PostDetails";

const screenProps = {
  navigation: {
      state: { params: {} },
      dispatch: jest.fn(),
      goBack: jest.fn(),
      dismiss: jest.fn(),
      navigate: jest.fn(),
      openDrawer: jest.fn(),
      closeDrawer: jest.fn(),
      toggleDrawer: jest.fn(),
      getParam: jest.fn(),
      setParams: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      pop: jest.fn(),
      popToTop: jest.fn(),
      isFocused: jest.fn(),
      addListener: jest.fn().mockImplementation((_, callback) => {
          callback();
        }),
  },
  id: "PostDetails",
  route: {
    params:
    {
     updateData:{
      id: "1",
      name:"abc",
      visibility_setting:"Public",
      audience_setting:"No restrictions to viewers",
      comment_setting:"Allow all comments",
      post_medias:{thumnails:["1.png", "2.png"]},
      location:"location"
    },
    setcomments:"comments"
}}

};
const mockgetStorageData = jest.spyOn(utils, "getStorageData")
const mockFetch = jest.fn();

const feature = loadFeature("./__tests__/features/PostDetails-scenario.feature");


const MOCK_RESULT_SUCCESS_configuration = {
  visbility_settings: {Public:"Public"},
}
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    mockgetStorageData.mockImplementation(() => {
      return Promise.resolve("ar")
    })
    global.fetch = mockFetch;
    jest.useFakeTimers();
  });

  test("User navigates to PostDetails", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: PostDetails;

    given("I am a User loading PostDetails", () => {
      exampleBlockA = shallow(<PostDetails {...screenProps} />);
    });

    when("I navigate to the PostDetails", () => {
      instance = exampleBlockA.instance() as PostDetails;
    });

    then("PostDetails will load with out errors", async() => {
      await new Promise(resolve => setImmediate(resolve))
      instance.componentWillUnmount()
      const configurationMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.configurationApcallID = configurationMessage.messageId;
      configurationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), configurationMessage.messageId);
      configurationMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_configuration)
      runEngine.sendMessage("Unit Test", configurationMessage)
      expect(exampleBlockA).toBeTruthy();
    });
    
    then("I can select back button with with out errors", () => {
      let nextBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "nextBtn"
      );
      nextBtn.simulate("press");
    });

    then("I can select next button with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "gobaack"
      );
      buttonComponent.simulate("press");
    });
  });

});