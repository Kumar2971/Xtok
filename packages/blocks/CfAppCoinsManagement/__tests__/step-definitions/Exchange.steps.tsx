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
import Exchange from "../../src/Exchange";

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
    addListener: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    isFocused: jest.fn()
  },
  id: "Exchange"
};
const mockgetStorageData = jest.spyOn(utils, "getStorageData")
const mockFetch = jest.fn();

const feature = loadFeature("./__tests__/features/Exchange-scenario.feature");
let totalBalance: Function;

const MOCK_RESULT_SUCCESS_balance = {
  exchanged_amount_available: "200",
  coins_count:"100"
}
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    mockgetStorageData.mockImplementation(() => {
      return Promise.resolve("ar")
    })
    global.fetch = mockFetch;
  });

  test("User navigates to Exchange", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Exchange;

    given("I am a User loading Exchange", () => {
      mockFetch.mockImplementation((key:string) =>{  
        return Promise.resolve({
          json: () => Promise.resolve(MOCK_RESULT_SUCCESS_balance),
        })
      });
      exampleBlockA = shallow(<Exchange {...screenProps} />);
    });

    when("I navigate to the Exchange", () => {
      instance = exampleBlockA.instance() as Exchange;
    });

    then("Exchange will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });
    
    then("I can select back button with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnExample"
      );
      buttonComponent.simulate("press");
    });

    then("I can select exchange for coin button with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "exchangeButton"
      );
      buttonComponent.simulate("press");
    });

    then("I can select withdraw button with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "withdrawButton"
      );
      buttonComponent.simulate("press");
    });

    then("I can make API Calls", () => {
      const AccoutLoginSuccessCall = new Message(
        getName(MessageEnum.AccoutLoginSuccess)
      );
      runEngine.sendMessage("TestUser", AccoutLoginSuccessCall);
    });

  });

});