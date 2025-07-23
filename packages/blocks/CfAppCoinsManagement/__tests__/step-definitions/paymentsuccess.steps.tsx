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
import PaymentSuccess from "../../src/paymentsuccess";
const navigation = require("react-navigation");

const screenProps = {
  navigation:{
    navigate: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
    dangerouslyGetState: jest.fn().mockImplementation(()=> Promise.resolve({routes:[{name:'LiveStreaming'}]}))
  } ,
  id: "PaymentSuccess",
  route: {
    params:{
      result:"success",
    }
  },
  isScreenFrom: ''
};
const screenProps2 = {
  navigation:{
    navigate: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
    dangerouslyGetState: jest.fn().mockImplementation(()=> Promise.resolve({routes:[{name:'LiveStreaming'}]})),
  } ,
  id: "PaymentSuccess",
  route: {
    params:{}
  },
  isScreenFrom: ''
};
const mockgetStorageData = jest.spyOn(utils, "getStorageData")

const feature = loadFeature(
  "./__tests__/features/paymentsuccess-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    mockgetStorageData.mockImplementation(() => {
      return Promise.resolve("ar")
    })
  });

  test("User navigates to PaymentSuccess", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: PaymentSuccess;

    given("I am a User loading PaymentSuccess", () => {
      exampleBlockA = shallow(<PaymentSuccess {...screenProps} />);
    });

    when("I navigate to the PaymentSuccess", () => {
      const navigationMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      navigationMessage.addData(
        getName(MessageEnum.LoginSuccessDataMessage),
        {
          result: "success",
        }
      );
      runEngine.sendMessage("Unit Test", navigationMessage);
      instance = exampleBlockA.instance() as PaymentSuccess;
    });

    then("PaymentSuccess will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can select the success with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "successBtn"
      )
      buttonComponent.simulate("press")
      expect(buttonComponent).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });
  });

  test("User navigates to PaymentSuccess with fail", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: PaymentSuccess;

    given("I am a User loading PaymentSuccess", () => {
      exampleBlockA = shallow(<PaymentSuccess {...screenProps2} />);
    });

    when("I navigate to the PaymentSuccess", () => {
      const navigationMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      navigationMessage.addData(
        getName(MessageEnum.LoginSuccessDataMessage),
        {
          result: "success",
        }
      );
      runEngine.sendMessage("Unit Test", navigationMessage);
      instance = exampleBlockA.instance() as PaymentSuccess;
    });

    then("PaymentSuccess will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can select the success with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "successBtn"
      )
      buttonComponent.simulate("press")
      expect(buttonComponent).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
