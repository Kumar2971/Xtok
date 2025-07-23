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
import Setvisibility from "../../src/feed/Setvisibility";

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
  id: "Setvisibility",
  route: {
    params:{
      mediadetails:"mediadetails",
      poster:"poster",
      description:"description",
      setvisibility:0
    }
  }   
};

const screenProps2 = {
  navigation: {
      goBack: jest.fn(),
      navigate: jest.fn(),
      addListener: jest.fn().mockImplementation((_, callback) => {
          callback();
        }),
  },
  id: "Setvisibility",
  route: {
    params:{
      mediadetails:"mediadetails",
      poster:"poster",
      description:"description",
      setvisibility:2
    }
  }   
};
const MOCK_RESULT_SUCCESS_configuration = {
  visbility_settings: {Public:"Public"},
}
const MOCK_RESULT_SUCCESS_configuration_2 = {
  visbility_settings: {Private:"Private"},
}
const mockgetStorageData = jest.spyOn(utils, "getStorageData")
const mockFetch = jest.fn();

const feature = loadFeature("./__tests__/features/Setvisibility-scenario.feature");

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

  test("User navigates to Setvisibility", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Setvisibility;

    given("I am a User loading Setvisibility", () => {
      exampleBlockA = shallow(<Setvisibility {...screenProps} />);
    });

    when("I navigate to the Setvisibility", () => {
      instance = exampleBlockA.instance() as Setvisibility;
    });

    then("Setvisibility will load with out errors",async () => {
      await new Promise(resolve => setImmediate(resolve))
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

    then("I can select visibility with out errors", () => {
      let visibilityBtn1 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "visibilityBtn1"
      );
      visibilityBtn1.simulate("press");
    
      const configurationMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.configurationApcallID = configurationMessage.messageId;
      configurationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), configurationMessage.messageId);
      configurationMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_configuration_2)
      runEngine.sendMessage("Unit Test", configurationMessage)
      expect(exampleBlockA).toBeTruthy();

      let visibilityBtn2 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "visibilityBtn2"
      );
      visibilityBtn2.simulate("press");
    });
  });

  test("User navigates to Setvisibility with private", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Setvisibility;

    given("I am a User loading Setvisibility", () => {
      exampleBlockA = shallow(<Setvisibility {...screenProps2} />);
    });

    when("I navigate to the Setvisibility", () => {
      instance = exampleBlockA.instance() as Setvisibility;
    });

    then("Setvisibility will load with out errors",async () => {
      await new Promise(resolve => setImmediate(resolve))
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

    then("I can select visibility with out errors", () => {
      let visibilityBtn1 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "visibilityBtn1"
      );
      visibilityBtn1.simulate("press");
    
      const configurationMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.configurationApcallID = configurationMessage.messageId;
      configurationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), configurationMessage.messageId);
      configurationMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_configuration_2)
      runEngine.sendMessage("Unit Test", configurationMessage)
      expect(exampleBlockA).toBeTruthy();

      let visibilityBtn2 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "visibilityBtn2"
      );
      visibilityBtn2.simulate("press");
    });
  });
});