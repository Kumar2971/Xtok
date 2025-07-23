import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { beforeEach, expect, jest } from "@jest/globals";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import * as Utils from "../../../../framework/src/Utilities";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import MobileAccountLoginBlock from "../../src/MobileAccountLoginBlock";

const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn()
  },
  id: "MobileAccountLoginBlock",
};

const feature = loadFeature(
  "./__tests__/features/mobile-account-login-scenario.feature"
);

const mocksetStorageData = jest.spyOn(Utils, "setStorageData");
mocksetStorageData.mockResolvedValue(await Promise.resolve(undefined));

const mockgetStorageData = jest.spyOn(Utils, "getStorageData");
// mockgetStorageData.mockResolvedValue(Promise.resolve("ar"));

// const mockgetStorageDataUser = jest.spyOn(Utils, "getStorageData");
// mockgetStorageDataUser.mockResolvedValue(Promise.resolve("email"));


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(global, "setTimeout").mockImplementation((cb: any) => cb());
    jest.spyOn(global, "setInterval").mockImplementation((cb: any) => cb());
    jest.spyOn(global, "clearTimeout").mockImplementation(() => {});
    jest.spyOn(global, "clearInterval").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
   
    mockgetStorageData.mockImplementation((key, _) => {
      if (key === "userCredential") {
        return Promise.resolve({
          type: "mobile",
          username: '1234567890',
          password: "Test@123"
        });
      }
      return Promise.resolve({});
    });
    // jest
    // .spyOn(Utils, "getStorageData")
    // .mockImplementation((key, _) => {
    //   if (key === "userCredential") {
    //     return Promise.resolve({
    //       type: "email",
    //       username: 'test@mail.com',
    //       password: "Test@123"
    //     });
    //   }
    //   return Promise.resolve({});
    // });
  });

  test("User navigates to Mobile Log In", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: MobileAccountLoginBlock;

    given("I am a User attempting to Log In with a Mobile Phone", () => {
      mobileAccountLogInWrapper = shallow(
        <MobileAccountLoginBlock {...screenProps} />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();
      expect(mobileAccountLogInWrapper).toMatchSnapshot();
    });

    when("I navigate to the Log In Screen", () => {
      instance = mobileAccountLogInWrapper.instance() as MobileAccountLoginBlock;
      const navigationMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      navigationMessage.addData(
        getName(MessageEnum.MobilePhoneLogInDataMessage),
        {
          loginWith: "mobile",
        }
      );
      runEngine.sendMessage("Unit Test", navigationMessage);
    });

    then('I can enter a phone number with errors', async() => {
      let txtInputPhoneNumber = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === "txtInputPhoneNumber");
      txtInputPhoneNumber.simulate("changeText", "");

      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "buttonSignin"
      );
      buttonComponent.simulate("press");
      await new Promise(resolve => setImmediate(resolve))
  })
    then("I can enter a phone number with out errors", () => {      
      let textInputComponentMob = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === "txtInputPhoneNumber");
      textInputComponentMob.simulate("changeText", "9823792738");
      textInputComponentMob.renderProp('onFocus')()
      textInputComponentMob.renderProp('onBlur')()
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "Background"
      );
      buttonComponent.simulate("press");

      expect(mobileAccountLogInWrapper).toMatchSnapshot();
    });

    then("I can enter a password with out errors", () => {
      let textInputComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputPassword"
      );
      textInputComponent.simulate("changeText", "passWord1!");
      textInputComponent.simulate("rightIcon");
      textInputComponent.renderProp('onFocus')()
      textInputComponent.renderProp('onBlur')()
      expect(mobileAccountLogInWrapper).toMatchSnapshot();
    });


    then("I can toggle the Password Show/Hide with out errors", () => {
      let textInputComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputPassword"
      );
      textInputComponent.simulate("changeText", "passWord1!");
      textInputComponent.simulate("rightIcon");
      const rightIconItem = textInputComponent.renderProp('rightIcon')()
      const rightIconBtn =  rightIconItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'btnPasswordShowHide')
      rightIconBtn.simulate("press")
    });

    then("I can toggle the Remember Me with out errors", () => {
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "btnRememberMe"
      );
      buttonComponent.simulate("press");
      expect(mobileAccountLogInWrapper).toMatchSnapshot();
        instance.saveLoggedInUserData({
          meta: {
            token: "token",
          },
        });
    });

    then("I can select the Log In button with out errors", async () => {
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "buttonSignin"
      );
      buttonComponent.simulate("press");
      expect(mobileAccountLogInWrapper).toMatchSnapshot();
      const signInApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.signInApiCallId = signInApiMessage.messageId;
      signInApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        signInApiMessage.messageId
      );
      signInApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          meta: {
            id: "123",
            token: "token",
          },
        }
      );
      runEngine.sendMessage("Unit Test", signInApiMessage);
      instance.sendLoginSuccessMessage();
    });

    then("I can select the Forgot Password button with out errors", () => {
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "btnForgotPassword"
      );
      buttonComponent.simulate("press");
      expect(mobileAccountLogInWrapper).toMatchSnapshot();
    });

    then("I can select the signup button with out errors", () => {
      let btnSignup = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "btnSignup"
      );
      btnSignup.simulate("press");
    });

    then("I can leave the screen with out errors", () => {
      instance.goToLoginSuccess();
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "btnGoBack"
      );
      buttonComponent.simulate("press");
      instance.componentWillUnmount();
      expect(mobileAccountLogInWrapper).toBeTruthy();
      expect(mobileAccountLogInWrapper).toMatchSnapshot();
    });
  });

  test("User navigates to Email Log In", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: MobileAccountLoginBlock;

    given("I am a User attempting to Log In with an Email", () => {
      mockgetStorageData.mockImplementation((key, _) => {
        if (key === "userCredential") {
          return Promise.resolve({
            type: "email",
            username: '1234567890',
            password: "Test@123"
          });
        }
        return Promise.resolve({});
      });
      mobileAccountLogInWrapper = shallow(
        <MobileAccountLoginBlock {...screenProps} />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();
      expect(mobileAccountLogInWrapper).toMatchSnapshot();
    });

    when("I navigate to the Log In Screen", () => {
      instance = mobileAccountLogInWrapper.instance() as MobileAccountLoginBlock;
      const navigationMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      navigationMessage.addData(
        getName(MessageEnum.MobilePhoneLogInDataMessage),
        {
          loginWith: "email",
        }
      );
      runEngine.sendMessage("Unit Test", navigationMessage);
    });

    then('I can enter an Email id with errors', async() => {
      let txtInputEmail = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === "txtInputEmail");
        txtInputEmail.simulate("changeText", "");

      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "buttonSignin"
      );
      buttonComponent.simulate("press");
      await new Promise(resolve => setImmediate(resolve))
    })

    then("I can enter an Email id with out errors", () => {      
      let txtInputEmail = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === "txtInputEmail");
      txtInputEmail.simulate("changeText", "test@gmail.com");
      txtInputEmail.renderProp('onFocus')()
      txtInputEmail.renderProp('onBlur')()

      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "Background"
      );
      buttonComponent.simulate("press");

      expect(mobileAccountLogInWrapper).toMatchSnapshot();
    });

    then("I can enter a password with out errors", () => {
      let textInputComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputPassword"
      );
      textInputComponent.simulate("changeText", "passWord1!");
      textInputComponent.simulate("rightIcon");
      expect(mobileAccountLogInWrapper).toMatchSnapshot();
    });

    then("I can toggle the Remember Me with out errors", async() => {
      jest
        .spyOn(Utils, "getStorageData")
        .mockImplementation((key, _) => {
          if (key === "userCredential") {
            return Promise.resolve({
              type: "email",
              username: 'email@mail.com',
              password: "Test@123"
            });
          }
          return Promise.resolve({});
        });
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "btnRememberMe"
      );
      buttonComponent.simulate("press");
      expect(mobileAccountLogInWrapper).toMatchSnapshot();
    });

    then("I can select the Log In button with out errors", async () => {
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "buttonSignin"
      );
      buttonComponent.simulate("press");
      expect(mobileAccountLogInWrapper).toMatchSnapshot();
      const signInApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.signInApiCallId = signInApiMessage.messageId;
      signInApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        signInApiMessage.messageId
      );
      signInApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          meta: {
            id: "123",
            token: "token",
          },
        }
      );
      runEngine.sendMessage("Unit Test", signInApiMessage);
      instance.sendLoginSuccessMessage();
    });

    then("I can leave the screen with out errors", () => {
      instance.goToLoginSuccess();
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("testID") === "btnGoBack"
      );
      buttonComponent.simulate("press");
      instance.componentWillUnmount();
      expect(mobileAccountLogInWrapper).toBeTruthy();
      expect(mobileAccountLogInWrapper).toMatchSnapshot();
    });
  });
});
