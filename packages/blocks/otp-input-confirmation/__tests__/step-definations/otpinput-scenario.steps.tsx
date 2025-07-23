import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import OTPInput from "../../src/OTPInput";
import { beforeEach, expect, jest } from "@jest/globals";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as utils from "../../../../framework/src/Utilities";
import { runEngine } from "../../../../framework/src/RunEngine";
// @ts-ignore
global.FormData = require("react-native/Libraries/Network/FormData");

const feature = loadFeature("./__tests__/features/otpinput-scenario.feature");

jest.useFakeTimers();
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    state: {
      params: {
        data: "verifyWithSMS",
        selectedAccount: "EMAIL"
      },
    },
  },
  id: "OTPInput",
  route: {},
};

const mockgetStorageData = jest.spyOn(utils, "getStorageData");
mockgetStorageData.mockResolvedValue(Promise.resolve("ar"));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to OTPInput", ({ given, when, then, and }) => {
    let OTPInputWrapper: ShallowWrapper;
    let instance: OTPInput;

    given("I am a User attempting to enter OTP Number", () => {
      OTPInputWrapper = shallow(<OTPInput {...screenProps} />);
      expect(OTPInputWrapper).toBeTruthy();
    });

    when("I navigate to the OTPInput Screen", async () => {
      instance = OTPInputWrapper.instance() as OTPInput;

      await new Promise(resolve => setImmediate(resolve))
      
      const NavigationPropsMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      NavigationPropsMessage.addData(
        getName(MessageEnum.AuthTokenDataMessage),
        "phoneToken123"
      );
      NavigationPropsMessage.addData(
        getName(MessageEnum.AuthTokenPhoneNumberMessage),
        { phone: "1234567890", selectedAccount: "SMS" }
      );
     
      runEngine.sendMessage("Unit Test", NavigationPropsMessage);

      const OtherNavigationPropsMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      OtherNavigationPropsMessage.addData(
        getName(MessageEnum.AuthTokenDataMessage),
        "phoneToken123"
      );
      OtherNavigationPropsMessage.addData(
        getName(MessageEnum.AuthTokenPhoneNumberMessage), "12345"
      );
      OtherNavigationPropsMessage.addData(
        getName(MessageEnum.AuthTokenEmailMessage), "abc@gmaiil.com"
      );
      runEngine.sendMessage("Unit Test", OtherNavigationPropsMessage);
    });

    then("Token get expired", () => {
      const tokenErrorMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.otpAuthApiCallId = tokenErrorMessage.messageId;
      tokenErrorMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), tokenErrorMessage.messageId)
      tokenErrorMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { errors: [{ token: 'Invalid OTP' }] })
      runEngine.sendMessage("Unit Test", tokenErrorMessage);

      const otpErrorMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.otpAuthApiCallId = otpErrorMessage.messageId;
      otpErrorMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), otpErrorMessage.messageId)
      otpErrorMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { errors: [{ otp: 'Invalid OTP' }] })
      runEngine.sendMessage("Unit Test", otpErrorMessage);

      const errorMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.otpAuthApiCallId = errorMessage.messageId;
      errorMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), errorMessage.messageId)
      errorMessage.addData(getName(MessageEnum.RestAPIResponceErrorMessage), { errors: [{}] })
      runEngine.sendMessage("Unit Test", errorMessage);
    });

    then("I can enter OTP", () => {
      
      const codeField = OTPInputWrapper.findWhere(
        (node) => node.prop("textContentType") === "oneTimeCode"
      );
      codeField.props().onChangeText("1234");
      expect(instance.state.otp).toBe("1234");

      codeField.props().onSubmitEditing();

      codeField.renderProp("renderCell")({
        index: 1,
        symbol: "$",
        isFocused: true,
      });
    });

    and("I can get new OTP by click Resend", async () => {
      jest.advanceTimersByTime(58000)

      const resendBtn = OTPInputWrapper.findWhere(
        (node) => node.prop("testID") === "resendOTPBtn"
      );
      const resendSMSMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.requestPhoneOtpCallId = resendSMSMessage.id;
      resendSMSMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        resendSMSMessage.id
      );
      resendSMSMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "123",
          },
          meta: {
            token: "ABCxyz123",
          },
        }
      );
      runEngine.sendMessage("Unit Test", resendSMSMessage);
      resendBtn.simulate("press");

      const postSMSMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.postSMSOtpApiCallId = postSMSMessage.id;
      postSMSMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        postSMSMessage.id
      );
      postSMSMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "123",
          },
          meta: {
            token: "ABCxyz123",
          },
        }
      );
      runEngine.sendMessage("Unit Test", postSMSMessage);

      const errorMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.postSMSOtpApiCallId = errorMessage.id;
      errorMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        errorMessage.id
      );
      errorMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage), { errors: [{ pin: "invalid pin" }] }
      );
      runEngine.sendMessage("Unit Test", errorMessage);
      await instance.postSMSOtp();

      const resendEmailMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.requestEmailOtpCallId = resendEmailMessage.id;
      resendEmailMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        resendEmailMessage.id
      );
      resendEmailMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "123",
          },
          meta: {
            token: "ABCxyz123",
          },
        }
      );
      runEngine.sendMessage("Unit Test", resendEmailMessage);
      resendBtn.simulate("press");

      const postEmailMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.postEmailOtpApiCallId = postEmailMessage.id;
      postEmailMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        postEmailMessage.id
      );
      postEmailMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "123",
          },
          meta: {
            token: "ABCxyz123",
          },
        }
      );
      runEngine.sendMessage("Unit Test", postEmailMessage);

      await instance.postEmailOTP();
    });

    then("I can submit my OTP", () => {
      const submit = OTPInputWrapper.findWhere(
        (node) => node.prop("testID") === "submitOTPBtn"
      );

      const SMSsubmitMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.postSubmitOTPSMSApiCallId = SMSsubmitMessage.id;
      SMSsubmitMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        SMSsubmitMessage.id
      );
      SMSsubmitMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "123",
          },
          meta: {
            token: "ABCxyz123",
          },
        }
      );
      runEngine.sendMessage("Unit Test", SMSsubmitMessage);
      submit.simulate("press");

      const EmailsubmitMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.postSubmitOTPEmailApiCallId = EmailsubmitMessage.id;
      EmailsubmitMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        EmailsubmitMessage.id
      );
      EmailsubmitMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "123",
          },
          messages: {
            token: "ABCxyz123",
          },
        }
      );
      runEngine.sendMessage("Unit Test", EmailsubmitMessage);
      submit.simulate("press");

      const errorMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.postSubmitOTPSMSApiCallId = errorMessage.id;
      errorMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        errorMessage.id
      );
      errorMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage), { errors: [{ pin: "invalid pin" }] }
      );
      runEngine.sendMessage("Unit Test", errorMessage);
    });

    and("I can goto Login Page", () => {
      const outSideInput = OTPInputWrapper.findWhere(
        (node) => node.prop("testID") === "closeMd"
      );
      outSideInput.simulate("press");

      const gotoLogin = OTPInputWrapper.findWhere(
        (node) => node.prop("testID") === "gotoLoginBtn"
      );
      gotoLogin.simulate("press");
      instance.componentWillUnmount()
    });
  });

  test("User navigates to OTPInput with Email", ({ given, when, then, and }) => {
    let OTPInputWrapper: ShallowWrapper;
    let instance: OTPInput;

    given("I am a User attempting to enter OTP Number", () => {
      OTPInputWrapper = shallow(<OTPInput {...screenProps} />);
      expect(OTPInputWrapper).toBeTruthy();
    });

    when("I navigate to the OTPInput Screen", async () => {
      instance = OTPInputWrapper.instance() as OTPInput;

      await new Promise(resolve => setImmediate(resolve))
      
      const NavigationPropsMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      NavigationPropsMessage.addData(
        getName(MessageEnum.AuthTokenDataMessage),
        "phoneToken123"
      );
      NavigationPropsMessage.addData(
        getName(MessageEnum.AuthTokenPhoneNumberMessage),
        { phone: "test@gmail.com", selectedAccount: "Email" }
      );
     
      runEngine.sendMessage("Unit Test", NavigationPropsMessage);

      const OtherNavigationPropsMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      OtherNavigationPropsMessage.addData(
        getName(MessageEnum.AuthTokenDataMessage),
        "phoneToken123"
      );
      OtherNavigationPropsMessage.addData(
        getName(MessageEnum.AuthTokenPhoneNumberMessage), "12345"
      );
      OtherNavigationPropsMessage.addData(
        getName(MessageEnum.AuthTokenEmailMessage), "abc@gmaiil.com"
      );
      runEngine.sendMessage("Unit Test", OtherNavigationPropsMessage);
    });

    then("I can enter OTP", () => {
      
      const codeField = OTPInputWrapper.findWhere(
        (node) => node.prop("textContentType") === "oneTimeCode"
      );
      codeField.props().onChangeText("1234");
      expect(instance.state.otp).toBe("1234");

      codeField.props().onSubmitEditing();

      codeField.renderProp("renderCell")({
        index: 1,
        symbol: "$",
        isFocused: true,
      });
    });

    and("I can get new OTP by click Resend", async () => {
      jest.advanceTimersByTime(58000)

      const resendBtn = OTPInputWrapper.findWhere(
        (node) => node.prop("testID") === "resendOTPBtn"
      );
    
      const resendEmailMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.requestEmailOtpCallId = resendEmailMessage.id;
      resendEmailMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        resendEmailMessage.id
      );
      resendEmailMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "123",
          },
          meta: {
            token: "ABCxyz123",
          },
        }
      );
      runEngine.sendMessage("Unit Test", resendEmailMessage);
      resendBtn.simulate("press");

      const postEmailMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.postEmailOtpApiCallId = postEmailMessage.id;
      postEmailMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        postEmailMessage.id
      );
      postEmailMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "123",
          },
          meta: {
            token: "ABCxyz123",
          },
        }
      );
      runEngine.sendMessage("Unit Test", postEmailMessage);

      await instance.postEmailOTP();
    });

    then("I can submit my OTP", () => {
      const submit = OTPInputWrapper.findWhere(
        (node) => node.prop("testID") === "submitOTPBtn"
      );
      const EmailsubmitMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.postSubmitOTPEmailApiCallId = EmailsubmitMessage.id;
      EmailsubmitMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        EmailsubmitMessage.id
      );
      EmailsubmitMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "123",
          },
          messages: {
            token: "ABCxyz123",
          },
        }
      );
      runEngine.sendMessage("Unit Test", EmailsubmitMessage);
      submit.simulate("press");

      const errorMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.postSubmitOTPSMSApiCallId = errorMessage.id;
      errorMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        errorMessage.id
      );
      errorMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage), { errors: [{ pin: "invalid pin" }] }
      );
      runEngine.sendMessage("Unit Test", errorMessage);
    });

    and("I can goto Login Page", () => {
      const outSideInput = OTPInputWrapper.findWhere(
        (node) => node.prop("testID") === "closeMd"
      );
      outSideInput.simulate("press");

      const gotoLogin = OTPInputWrapper.findWhere(
        (node) => node.prop("testID") === "gotoLoginBtn"
      );
      gotoLogin.simulate("press");
      instance.componentWillUnmount()
    });
  });
});
