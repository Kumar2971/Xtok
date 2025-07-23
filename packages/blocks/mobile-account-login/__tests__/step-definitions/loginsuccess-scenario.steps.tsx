import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import {beforeEach, expect, jest} from "@jest/globals";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import LoginSuccess from "../../src/LoginSuccess";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
const navigation = require("react-navigation");

export const configJSON = require("../../config.json");
let mockReplace = jest.fn()

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    popToTop: jest.fn(),
    replace: mockReplace
  },
  id: "LoginSuccess",
};

const feature = loadFeature("./__tests__/features/loginSuccess-scenario.feature");


defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.spyOn(global, 'setTimeout').mockImplementation((cb:any) => cb() );
        jest.spyOn(global, 'setInterval').mockImplementation((cb:any) => cb() );
        jest.spyOn(global, 'clearTimeout').mockImplementation(() => {});
        jest.spyOn(global, 'clearInterval').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

  test("User navigates to LoginSuccess", ({ given, when, then }) => {
    let LoginSuccessWrapper: ShallowWrapper;
    let instance: LoginSuccess;

    given("I am a User loading LoginSuccess", () => {
      //@ts-ignore
      LoginSuccessWrapper = shallow(<LoginSuccess {...screenProps} />);
    });

    when("I navigate to the LoginSuccess", () => {
      instance = LoginSuccessWrapper.instance() as LoginSuccess;
      const navigationMessage = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      navigationMessage.addData(getName(MessageEnum.LoginSuccessDataMessage),{
        isScreenFrom: "Login"
      });
      runEngine.sendMessage("Unit Test", navigationMessage);
    });

    then("LoginSuccess will load with out errors", () => {
      expect(LoginSuccessWrapper).toBeTruthy();
    });

    then('I can click on go to feed', () => {
      let buttonComponent = LoginSuccessWrapper.findWhere(
        (node) => node.prop('testID') === 'goToFeedBtn'
      );
      buttonComponent.simulate('press');
      expect(mockReplace).toBeCalledWith("BottomTabScreen")
      expect(LoginSuccessWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(LoginSuccessWrapper).toBeTruthy();
    });
  });

});
