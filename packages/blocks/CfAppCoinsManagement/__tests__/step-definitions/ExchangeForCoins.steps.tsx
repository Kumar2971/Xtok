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
import ExchangeForCoins from "../../src/ExchangeForcoins";
import AlertModal from "../../../../components/src/AlertModal";


const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn()
  },
  id: "ExchangeForCoins"
};

const feature = loadFeature(
  "./__tests__/features/ExchangeForCoins-scenario.feature"
);

const mockgetStorageData = jest.spyOn(utils, "getStorageData")

const mockFetch = jest.fn();

const MOCK_RESULT_SUCCESS = [
  {
  "coins_worth_value": 250,
  "created_at": "2023-07-20T13:06:29.587Z",
  "diamond_awards": null,
  "gold_awards": null,
  "id": 12,
  "silver_awards": null,
  "total_coins": 500,
  "transaction_type": "withdrawal",
  "updated_at": "2023-07-20T13:06:29.587Z",
  isSelected: true
  },
  {
    "coins_worth_value": 250000,
    "created_at": "2023-07-20T13:06:29.587Z",
    "diamond_awards": null,
    "gold_awards": null,
    "id": 13,
    "silver_awards": null,
    "total_coins": 800000,
    "transaction_type": "withdrawal",
    "updated_at": "2023-07-20T13:06:29.587Z",
    isSelected: true
  }
]

const MOCK_RESULT_SUCCESS_balance = {
  exchanged_amount_available: "200",
  coins_count:"100"
}

const MOCK_RESULT_SUCCESS_coin = {
  "coins_worth": 600.0
}
const MOCK_RESULT_SUCCESS_coin0 = {"account_id": 335, "amount": 33.300000000000004, "coins_count": 100, "created_at": "2023-08-04T07:00:56.085Z", "id": 241, "premade_package_id": null, "updated_at": "2023-08-04T07:00:56.085Z"} 

const MOCK_RESULT_FAILURE_balance = {
  error: "Insufficient coin balance",
};

defineFeature(feature, (test) => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");

  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    mockgetStorageData.mockImplementation(() => {
      return Promise.resolve("ar")
    })
    global.fetch = mockFetch;
  });

  test("User navigates to ExchangeForCoins", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: ExchangeForCoins;

    given("I am a User loading ExchangeForCoins", () => {
        mockFetch.mockImplementation((key:string) =>{
          if(key.includes("premade_packages"))  {  
            return Promise.resolve({
              json: () => Promise.resolve(MOCK_RESULT_SUCCESS),
          })}
          if(key.includes("coins_worth"))  {  
            return Promise.resolve({
              json: () => Promise.resolve(MOCK_RESULT_SUCCESS_coin),
          })}
          if(key.includes("your_balance"))  {  
            return Promise.resolve({
            json: () => Promise.resolve(MOCK_RESULT_SUCCESS_balance),
          })}
          if(key.includes("coin_exchanges"))  {  
            return Promise.resolve({
            json: () => Promise.resolve(MOCK_RESULT_SUCCESS_coin0),
          })}
          if(key.includes("package_exchange"))  {  
            return Promise.resolve({
            json: () => Promise.resolve(MOCK_RESULT_SUCCESS_coin0),
          })}
        });
      exampleBlockA = shallow(<ExchangeForCoins {...screenProps} />);
    });

    when("I navigate to the ExchangeForCoins", () => {
      instance = exampleBlockA.instance() as ExchangeForCoins;
    });

    then("ExchangeForCoins will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();      
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "txtInput"
      );
      textInputComponent.simulate("changeText", "500");
      textInputComponent.simulate("submitEditing");
    });

    then("I can select the button3 with with out errors", async() => {
      await new Promise(resolve => setImmediate(resolve))

      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "exchangeBtn"
      );
      buttonComponent.simulate("press");
      expect(buttonComponent).toBeTruthy();
    });

    then("I can select the button4 with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "testButton5"
      );
      buttonComponent.simulate("press");
      //@ts-ignore
      exampleBlockA.find(AlertModal).props().onPress2();
    });

    then("Flatlist component will render", async (id: any) => {
      await new Promise(resolve => setImmediate(resolve))
      
      const flatlistId = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "flatlistId"
      );
      flatlistId.props().keyExtractor({}, 3);
      flatlistId.props().renderItem({ item: instance.state.exchangeListPreMadePackages[0], index: 0 })
      const flatlistIdRender = flatlistId.renderProp('renderItem')({ item: instance.state.exchangeListPreMadePackages[0], index: 0 })
      const flatlistIdBtn = flatlistIdRender.findWhere((node) => node.prop('testID') === 'testButton2')
      mockFetch.mockImplementation((key:string) =>{
        if(key.includes("package_exchange"))  {  
          return Promise.resolve({
          json: () => Promise.resolve(MOCK_RESULT_FAILURE_balance),
        })}
      });
      flatlistIdBtn.simulate("press")
      let buttonComponent1 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnExample"
      )
      buttonComponent1.simulate("press")
    });
    
    then("I can enter text with errors", async() => { 
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "txtInput"
      );
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "exchangeBtn"
      );
      textInputComponent.simulate("changeText", "");
      buttonComponent.simulate("press");

      textInputComponent.simulate("changeText", "1000000");
      buttonComponent.simulate("press");
    });

    then("I can make API Calls", () => {
      const AccoutLoginSuccessCall = new Message(
        getName(MessageEnum.AccoutLoginSuccess)
      );
      runEngine.sendMessage("TestUser", AccoutLoginSuccessCall);
    });
  });

  test("User exchange coin with insufficient balance", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: ExchangeForCoins;

    given("I am a User loading ExchangeForCoins", () => {
        mockFetch.mockImplementation((key:string) =>{
          if(key.includes("coin_exchanges"))  {  
            return Promise.resolve({
            json: () => Promise.resolve(MOCK_RESULT_FAILURE_balance),
          })}
        });
      exampleBlockA = shallow(<ExchangeForCoins {...screenProps} />);
    });

    when("I navigate to the ExchangeForCoins", () => {
      instance = exampleBlockA.instance() as ExchangeForCoins;
    });

    then("ExchangeForCoins will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();      
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "txtInput"
      );
      textInputComponent.simulate("changeText", "50000000");
      textInputComponent.simulate("submitEditing");
    });

    then("I can select exchange coin button with out error", async() => {
      mockFetch.mockImplementation((key:string) =>{
        if(key.includes("premade_packages"))  {  
          return Promise.resolve({
            json: () => Promise.resolve(MOCK_RESULT_SUCCESS),
        })}
        if(key.includes("coins_worth"))  {  
          return Promise.resolve({
            json: () => Promise.resolve(MOCK_RESULT_SUCCESS_coin),
        })}
        if(key.includes("your_balance"))  {  
          return Promise.resolve({
          json: () => Promise.resolve(MOCK_RESULT_SUCCESS_balance),
        })}
        if(key.includes("coin_exchanges"))  {  
          return Promise.resolve({
          json: () => Promise.resolve(MOCK_RESULT_FAILURE_balance),
        })}
      });
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "exchangeBtn"
      );
      buttonComponent.simulate("press");
      expect(buttonComponent).toBeTruthy();
    });
  });
});

