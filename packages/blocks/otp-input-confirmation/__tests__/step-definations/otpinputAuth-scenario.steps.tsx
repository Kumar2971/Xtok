import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import OTPInputAuth from "../../src/OTPInputAuth";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as utils from "../../../../framework/src/Utilities";
import { runEngine } from "../../../../framework/src/RunEngine";

const feature = loadFeature(
  "./__tests__/features/otpinputAuth-scenario.feature"
);

jest.useFakeTimers();
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    state: {
      params: {
        data: "verifyWithEmail",
      },
    },
  },
  id: "OTPInputAuth",
  route: {},
};

const mockgetStorageData = jest.spyOn(utils, "getStorageData");
mockgetStorageData.mockResolvedValue("ar");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to OTPInputAuth", ({ given, when, then, and }) => {
    let OTPInputWrapper: ShallowWrapper;
    let instance: OTPInputAuth;

    given("I am a User attempting to enter OTP Number", () => {
      OTPInputWrapper = shallow(<OTPInputAuth {...screenProps} />);
      expect(OTPInputWrapper).toBeTruthy();
    });

    when("I navigate to the OTPInputAuth Screen", () => {
      instance = OTPInputWrapper.instance() as OTPInputAuth;
      const NavigationPropsMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      NavigationPropsMessage.addData(
        getName(MessageEnum.OTPInputAuthDataMessage),
        {
          verifyWith: "verifyWithEmail",
          selectedAccount: "Email",
          mobileNo: "1234567890",
          email: "test@mail.com",
        }
      );
      const button1 = OTPInputWrapper.findWhere(
        (node) => node.prop("testID") === "button1"
      );
      button1.simulate("press");
      instance.hideKeyboard()
      runEngine.sendMessage("Unit Test", NavigationPropsMessage);
    });

    then("I can enter OTP", () => {
      const otpInput = OTPInputWrapper.findWhere(
        (node) => node.prop("testID") === "txtMobilePhoneOTP"
      );
      otpInput.simulate("onChangeText", "1234");
    });

    then("I can submit my OTP", () => {

      instance.setState({ otp: "1235" });

      const submitOTP = OTPInputWrapper.findWhere(
        (node) => node.prop("testID") === "btnSubmitOTP"
      );
      submitOTP.simulate("press");

      const otpAuthApiCallIdMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.otpAuthApiCallId = otpAuthApiCallIdMessage.id;
      instance.setState({ isFromForgotPassword: true });
      otpAuthApiCallIdMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        otpAuthApiCallIdMessage.id
      );
      otpAuthApiCallIdMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "123",
          },
          meta: {
            token: "ABCxyz123",
          },
          messages: "OK"
        }
      );
      runEngine.sendMessage("Unit Test", otpAuthApiCallIdMessage);
      instance.setState({ isFromForgotPassword: false });
      runEngine.sendMessage("Unit Test", otpAuthApiCallIdMessage);
      submitOTP.simulate("press");
    });

    and("I can submit OTP with Error", () => {
      const otpAuthApiCallErrorMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.otpAuthApiCallId = otpAuthApiCallErrorMessage.id;
      instance.setState({ isFromForgotPassword: true });
      otpAuthApiCallErrorMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        otpAuthApiCallErrorMessage.id
      );
      otpAuthApiCallErrorMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{token: "Invalid token"}]
        }
      );
      runEngine.sendMessage("Unit Test", otpAuthApiCallErrorMessage);

    })
  });
});
