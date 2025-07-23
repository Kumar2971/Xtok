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
import Selectaudience from "../../src/feed/Selectaudience";

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
  id: "Selectaudience",
  route: {
    params:{
      mediadetails:"mediadetails",
      poster:"poster",
      description:"description"
    }
  }   
};
const MOCK_RESULT_SUCCESS_configuration = {
  visbility_settings: {Public:"Public"},
}
const mockgetStorageData = jest.spyOn(utils, "getStorageData")
const mockFetch = jest.fn();

const feature = loadFeature("./__tests__/features/Selectaudience-scenario.feature");

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
  });

  test("User navigates to Selectaudience", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Selectaudience;

    given("I am a User loading Selectaudience", () => {
      exampleBlockA = shallow(<Selectaudience {...screenProps} />);
    });

    when("I navigate to the Selectaudience", () => {
      instance = exampleBlockA.instance() as Selectaudience;
    });

    then("Selectaudience will load with out errors",async () => {      
      instance.componentWillUnmount()
      await new Promise(resolve => setImmediate(resolve))
      instance.componentWillUnmount()
      const configurationMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.configurationApcallID = configurationMessage.messageId;
      configurationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), configurationMessage.messageId);
      configurationMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_configuration)
      runEngine.sendMessage("Unit Test", configurationMessage)
      expect(exampleBlockA).toBeTruthy();
    });
    
    then("I can select back button with out errors", () => {
      let nextBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "goBack"
      );
      nextBtn.simulate("press");
    });

    then("I can select audience with out errors", () => {
      let selectAudienceBtn1 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "selectAudienceBtn1"
      );
      selectAudienceBtn1.simulate("press");
      
      let selectAudienceBtn2 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "selectAudienceBtn2"
      );
      selectAudienceBtn2.simulate("press");
    });
  });
});