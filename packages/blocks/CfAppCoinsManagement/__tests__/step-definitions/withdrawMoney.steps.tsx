/// <reference types="@types/jest" />

import { defineFeature, loadFeature,  } from "jest-cucumber";
import { shallow, ShallowWrapper,  } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import WithdrawMoney from "../../src/withdrawMoney";
import AlertModal from "../../../../components/src/AlertModal";
import * as utils from "../../../../framework/src/Utilities";

const feature = loadFeature("./__tests__/features/withdrawMoney-scenario.feature");
const mockFetch = jest.fn();
const props = {
    mobileNo: "",
    email: "",
    _handleInputChange: jest.fn(),
    errorMsg: "",
    isEmailSel: true,
    toggleChange: jest.fn(),
    onClickButton: jest.fn(),
    errorShown: false, 
    isCoinValue: 100,
    onClickBackIcon: jest.fn(),
    isLoader: false,
    navigation: {
        state: { params: {} },
        dispatch: jest.fn(),
        goBack: jest.fn(),
        dismiss: jest.fn(),
        navigate: jest.fn(),
        getParam: jest.fn(),
        setParams: jest.fn(),
        addListener: jest.fn((_, callback) => callback()),
        push: jest.fn(),
        replace: jest.fn(),
        pop: jest.fn(),
        isFocused: jest.fn(),
    },
    route: {params:{withdrawCoinValue:200}},
    id: "WithdrawMoney"
};
const mockgetStorageData = jest.spyOn(utils, "getStorageData")
const MOCK_RESULT_SUCCESS_balance = {"message": {"batch_header": {"batch_status": "PROCESSING", "payout_batch_id": "STSAKWCBRQX4Q", "sender_batch_header": []}, "links": []}}
const MOCK_RESULT_SUCCESS_balance_error =  {"message": {"batch_header": {"payout_batch_id": ""}}}

const MOCK_RESULT_SUCCESS_payout_batch = {"data": {"batch_header": {"amount": [Object], "batch_status": "SUCCESS", "fees": [Object], "funding_source": "BALANCE", "payout_batch_id": "PUWD87RU6XHKQ", "sender_batch_header": [Object], "time_completed": "2023-08-04T13:40:28Z", "time_created": "2023-08-04T13:40:27Z"}, "items": [], "links": []}}
const MOCK_RESULT_SUCCESS_payout_batch2 = {"data": {"batch_header": {"amount": [Object], "batch_status": "", "fees": [Object], "funding_source": "BALANCE", "payout_batch_id": "PUWD87RU6XHKQ", "sender_batch_header": [Object], "time_completed": "2023-08-04T13:40:28Z", "time_created": "2023-08-04T13:40:27Z"}, "items": [], "links": []}}
const MOCK_RESULT_SUCCESS_payout_batch3 = {"data": {"batch_header": {"amount": [Object], "batch_status": "DENIED", "fees": [Object], "funding_source": "BALANCE", "payout_batch_id": "PUWD87RU6XHKQ", "sender_batch_header": [Object], "time_completed": "2023-08-04T13:40:28Z", "time_created": "2023-08-04T13:40:27Z"}, "items": [], "links": []}}

const MOCK_RESULT_SUCCESS_coin_transaction = {"account_id": 335, "amount": 50, "coins_count": 0, "created_at": "2023-08-04T13:40:29.411Z", "id": 408, "package_id": null, "payment_id": "PUWD87RU6XHKQ", "reasons": null, "status": "success", "tax_amount": null, "transaction_type": "withdrawal", "updated_at": "2023-08-04T13:40:29.411Z"}
const MOCK_RESULT_SUCCESS_coin_transaction_errors = {"errors":"transaction failed"}

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

    test('User navigates to WithdrawMoney with email', ({ given, when, then }) => {
        let withdrawMoneyWrapper: ShallowWrapper;
        let instance: WithdrawMoney

        given('I am a User loading WithdrawMoney', () => {
          mockFetch.mockImplementation((key:string) =>{
            if(key.includes("withdraw_funds"))  {  
              return Promise.resolve({
                json: () => Promise.resolve(MOCK_RESULT_SUCCESS_balance),
            })}
            if(key.includes("payout_batch"))  {  
              return Promise.resolve({
                json: () => Promise.resolve(MOCK_RESULT_SUCCESS_payout_batch),
            })}
            if(key.includes("coin_transactions"))  {  
              return Promise.resolve({
                json: () => Promise.resolve(MOCK_RESULT_SUCCESS_coin_transaction),
            })}
          });
            withdrawMoneyWrapper = shallow(<WithdrawMoney {...props} />);
        });
    
        when('I navigate to the WithdrawMoney', () => {
          instance = withdrawMoneyWrapper.instance() as WithdrawMoney;
        });
    
        then('WithdrawMoney will load with out errors', () => {
          expect(withdrawMoneyWrapper).toBeTruthy();
        });
    
        then('I can select back button with out errors', () => {     
          let buttonComponent = withdrawMoneyWrapper.findWhere(
            (node) => node.prop("testID") === "backButton"
          );
          buttonComponent.simulate("press");
        });

        then('I can select Email button with out errors', () => {     
          let buttonComponent = withdrawMoneyWrapper.findWhere(
            (node) => node.prop("testID") === "selectEmail"
          );
          buttonComponent.simulate("press");
        });

        then('I can enter email with errors', () => {     
          let textInputComponent = withdrawMoneyWrapper.findWhere(
            (node) => node.prop("testID") === "txtInputEmail"
          );
          textInputComponent.simulate("changeText", "");
          textInputComponent.simulate("changeText", "ab");
          let buttonComponent = withdrawMoneyWrapper.findWhere(
            (node) => node.prop("testID") === "SubmitButton"
          );
          buttonComponent.simulate("press");
        });

        then('I can enter email with out errors', () => {     
          let textInputComponent = withdrawMoneyWrapper.findWhere(
            (node) => node.prop("testID") === "txtInputEmail"
          );
          textInputComponent.simulate("changeText", "abc@gmail.com");
        });

        then('I can select withdraw button without error', () => {  
          mockFetch.mockImplementation((key:string) =>{
            if(key.includes("withdraw_funds"))  {  
              return Promise.resolve({
                json: () => Promise.resolve(MOCK_RESULT_SUCCESS_balance_error),
            })}
            if(key.includes("payout_batch"))  {  
              return Promise.resolve({
                json: () => Promise.resolve(MOCK_RESULT_SUCCESS_payout_batch2),
            })}
          });   
          let buttonComponent = withdrawMoneyWrapper.findWhere(
            (node) => node.prop("testID") === "SubmitButton"
          );
          buttonComponent.simulate("press");
        });
    });

    test('User navigates to WithdrawMoney with mobile', ({ given, when, then }) => {
      let withdrawMoneyWrapper: ShallowWrapper;
      let instance: WithdrawMoney

      given('I am a User loading WithdrawMoney', () => {
        mockFetch.mockImplementation((key:string) =>{
          if(key.includes("withdraw_funds"))  {  
            return Promise.resolve({
              json: () => Promise.resolve(MOCK_RESULT_SUCCESS_balance),
          })}
          if(key.includes("payout_batch"))  {  
            return Promise.resolve({
              json: () => Promise.resolve(MOCK_RESULT_SUCCESS_payout_batch),
          })}
          if(key.includes("coin_transactions"))  {  
            return Promise.resolve({
              json: () => Promise.resolve(MOCK_RESULT_SUCCESS_coin_transaction_errors),
          })}
        });
          withdrawMoneyWrapper = shallow(<WithdrawMoney {...props} />);
      });
  
      when('I navigate to the WithdrawMoney', () => {
        instance = withdrawMoneyWrapper.instance() as WithdrawMoney;
      });
  
      then('WithdrawMoney will load with out errors', () => {
        expect(withdrawMoneyWrapper).toBeTruthy();
      });
  
      then('I can select mobile button with out errors', () => {     
        let buttonComponent = withdrawMoneyWrapper.findWhere(
          (node) => node.prop("testID") === "selectMobile"
        );
        buttonComponent.simulate("press");
      });

      then('I can enter mobile number with errors', () => {     
        let textInputComponent = withdrawMoneyWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputPhoneNumber"
        );
        textInputComponent.simulate("changeText", "");
        textInputComponent.simulate("changeText", "12345");
        let buttonComponent = withdrawMoneyWrapper.findWhere(
          (node) => node.prop("testID") === "SubmitButton"
        );
        buttonComponent.simulate("press");
      });

      then('I can enter mobile number with out errors', () => {     
        let textInputComponent = withdrawMoneyWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputPhoneNumber"
        );
        textInputComponent.simulate("changeText", "1234567890");
      });

      then('I can select withdraw button without error', () => {     
        let buttonComponent = withdrawMoneyWrapper.findWhere(
          (node) => node.prop("testID") === "SubmitButton"
        );
        buttonComponent.simulate("press");
      });
  });

   
});



