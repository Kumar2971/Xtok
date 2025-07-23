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
import SetSchedule from "../../src/feed/setSchedule";
import { Platform } from "react-native";

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
  id: "SetSchedule",
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

const feature = loadFeature("./__tests__/features/SetSchedule-scenario.feature");

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
    const mockDate = new Date('1692706338721');
    jest.mock('react-native', () => ({
      BackHandler: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }
    }));
    //@ts-ignore
    global.Date = jest.fn().mockImplementation(() => mockDate) // mock Date "new" constructor
    global.Date.now = jest.fn().mockReturnValue(mockDate.valueOf()) // mock Date.now
  });


  test("User navigates to SetSchedule", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: SetSchedule;

    given("I am a User loading SetSchedule", () => {
      exampleBlockA = shallow(<SetSchedule {...screenProps} />);
    });

    when("I navigate to the SetSchedule", () => {
      instance = exampleBlockA.instance() as SetSchedule;
    });

    then("SetSchedule will load with out errors",async () => {  
      await new Promise(resolve => setImmediate(resolve))
      // instance.componentWillUnmount()
      const configurationMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.configurationApcallID = configurationMessage.messageId;
      configurationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), configurationMessage.messageId);
      configurationMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_configuration)
      runEngine.sendMessage("Unit Test", configurationMessage)
      expect(exampleBlockA).toBeTruthy();    
      Platform.OS = "ios";
    });
    
    then("I can select back button with out errors", () => {
      let nextBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "goBack"
      );
      nextBtn.simulate("press");
      expect(screenProps.navigation.navigate).toBeCalled();
    });

    then("I can select timing with out errors", () => {
      let textInput = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "textInput"
      );
      textInput.props().onTouchStart();
      textInput.props().onTouchEnd();
      expect(textInput.props().value).toEqual(new Date())

      let hoursTextInput = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "hoursTextInput"
      );
      hoursTextInput.props().onTouchStart();
      hoursTextInput.props().onTouchEnd();
      expect(hoursTextInput.props().value).toEqual("")

      let minuteTextInput = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "minuteTextInput"
      );
      minuteTextInput.props().onTouchStart();
      minuteTextInput.props().onTouchEnd();
      expect(minuteTextInput.props().value).toEqual("")

      let AMBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "AMBtn"
      );
      AMBtn.simulate("press");
      const mockhandleChangeMeridian = jest.fn(); 
      instance.handleChangeMeridian = mockhandleChangeMeridian; 
      AMBtn.prop("onPress")();
      expect(mockhandleChangeMeridian).toHaveBeenCalled();

      let PMBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "PMBtn"
      );
      PMBtn.simulate("press");
      const mockhandleChangeMeridianPM = jest.fn(); 
      instance.handleChangeMeridian = mockhandleChangeMeridianPM; 
      PMBtn.prop("onPress")();
      expect(mockhandleChangeMeridianPM).toHaveBeenCalled();
      
      let DateTimePickrID = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "DateTimePickrID"
      );
      DateTimePickrID.prop("onChange")()
      expect(DateTimePickrID.props().value).toBe(new Date())


      let TimePickrID = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "TimePickrID"
      );
      TimePickrID.prop("onChange")()
      expect(TimePickrID.props().value).toBe(new Date())
    });
  
    then("I can select submit button with out errors", () => {
      let postSubmitBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "postSubmitBtn"
      );
      postSubmitBtn.simulate("press");
      expect(screenProps.navigation.navigate).toBeCalled();
    });
  });
});