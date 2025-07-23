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
import Balance from "../../src/balance";
import {waitFor} from "@testing-library/react-native";
const navigation = require("react-navigation");
const mockFetch = jest.fn();
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
  id: "Balance",
  route: {params:{isFromLiveChallenge:"isFromLiveChallenge",selectedIndex:"0"}}
  
};
const screenProps2 = {
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
      addListener: jest.fn().mockImplementation((event, callback) => {
          callback();
          return {
             remove: jest.fn()
          }
        }),
    },
    id: "Balance",
    route: {params:{isFromLiveChallenge:"",selectedIndex:"1"}}
};

const screenProps3 = {
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
    addListener: jest.fn().mockImplementation((event, callback) => {
        callback();
        return {
           remove: jest.fn()
        }
      }),
  },
  id: "Balance",
    route: {params:{selectedIndex:"2"}}
};
const mockgetStorageData = jest.spyOn(utils , "getStorageData")
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
const MOCK_RESULT_SUCCESS_One = [
  {
  "coins_worth_value": 250,
  "created_at": "2023-07-20T13:06:29.587Z",
  "diamond_awards": null,
  "gold_awards": null,
  "id": 12,
  "silver_awards": null,
  "total_coins": 500,
  "bestOffer": "bestOffer",
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
    "bestOffer": "bestOffer",
    "transaction_type": "withdrawal",
    "updated_at": "2023-07-20T13:06:29.587Z",
    isSelected: true
  }
]
const MOCK_RESULT_SUCCESS_coin_transaction_list = [
  {"account_id": 335, "amount": 50, "coins_count": 0, "created_at": "2023-08-04T13:40:29.411Z", "id": 408, "package_id": null, "payment_id": "PUWD87RU6XHKQ", "reason": "failed reason", "status": "success", "tax_amount": null, "transaction_type": "withdrawal", "updated_at": "2023-08-04T13:40:29.411Z"},
]
const MOCK_RESULT_SUCCESS_customCoinPurchase = {"account_id": 335, "amount": 50, "coins_count": 0, "created_at": "2023-08-04T13:40:29.411Z", "id": 408, "package_id": null, "payment_id": "PUWD87RU6XHKQ", "reason": "failed reason", "status": "success", "tax_amount": null, "transaction_type": "withdrawal", "updated_at": "2023-08-04T13:40:29.411Z"}

const MOCK_RESULT_SUCCESS_balance = {
  exchanged_amount_available: "200",
  coins_count:"100",
  coins_worth_value:"200"
}

const MOCK_RESULT_SUCCESS_coin = {
  "coins_worth": 600.0
}
const MOCK_RESULT_FAILURE_balance = {
  error: "Insufficient coin balance",
};
const MOCK_RESULT_FAILURE_balance_error = {
  errors:[ "errors msg"],
};


const MOCK_RESULT_SUCCESS_coin_transaction =[{"account_id": 335, "amount": 50, "coins_count": 0, "created_at": "2023-08-04T13:40:29.411Z", "id": 408, "package_id": null, "payment_id": "PUWD87RU6XHKQ", "reasons": "reasons", "status": "success", "tax_amount": null, "transaction_type": "withdrawal", "updated_at": "2023-08-04T13:40:29.411Z"}]
const MOCK_RESULT_SUCCESS_coin_transaction_criteria = {"message":"This transaction is valid"}
const MOCK_RESULT_SUCCESS_coin_customCoinWithdrawal ={"account_id": 335, "amount": 550, "coins_count": 200, "created_at": "2023-08-04T13:40:29.411Z", "id": 408, "package_id": null, "payment_id": "PUWD87RU6XHKQ", "reasons": "reasons", "status": "success", "tax_amount": null, "transaction_type": "withdrawal", "updated_at": "2023-08-04T13:40:29.411Z"}
const MOCK_RESULT_SUCCESS_coin_transaction_criteria_error = {"error":"Insufficient coin balance"}
const MOCK_RESULT_SUCCESS_get_billing_details={
  "amount": 500.0,
  "tax_amount": 35.0,
  "total_amount": 535.0,
  "transaction_type": "purchase",
  "date": "2023-08-08",
  "account_data": {
      "activated": true,
      "country_code": "91",
      "email": "axita31@mailinator.com",
      "first_name": null,
      "full_phone_number": "919687806011",
      "last_name": null,
      "phone_number": "9687806011",
      "type": null,
      "created_at": "2023-06-28T08:07:42.942Z",
      "updated_at": "2023-08-03T12:58:52.314Z",
      "device_id": "d1hvPlCkQpiiJg-jcOQH8i:APA91bEG2s2mGDPKdZWFZcfwpvRzf21l0ofY-w-DMT3wRkkcpCAR4ErQF8_kU41aQI2rTL562n6A41q4mYYkZ5WOwitV4nsQKziBr9U_ZlerZ8osP0C_5oCd8S98Lq5o5uY21xFwmZdx",
      "unique_auth_id": "7hP47MAQpOQrreY3MxoxLQtt",
      "gender": null,
      "date_of_birth": "2000-06-27",
      "full_name": "Axita Khunt",
      "user_name": "Axita_khunt31",
      "bio": null,
      "instagram": null,
      "youtube": null,
      "is_online": true,
      "nickname": null,
      "last_seen_at": "2023-08-03T12:58:50.432Z",
      "push_notificable_activated": true,
      "is_blocked": false,
      "is_chat_muted": false,
      "is_muted": false,
      "is_restricated": false,
      "profile_id": null,
      "profile_view_count": 0,
      "photo": null,
      "profile_video": null,
      "is_active_status": false,
      "is_private_account": false,
      "is_challenges_invites": true,
      "is_allow_mentions": true,
      "is_allow_leaderboard_visibility": true,
      "is_show_sensitive_content": false,
      "is_dark_mode_theme": false,
      "video_quality_preferences": [
          {
              "id": 338,
              "network_type": "wifi",
              "quality": "auto",
              "account_id": 335,
              "created_at": "2023-06-28T08:07:43.037Z",
              "updated_at": "2023-06-28T08:07:43.037Z"
          },
          {
              "id": 337,
              "network_type": "mobile",
              "quality": "auto",
              "account_id": 335,
              "created_at": "2023-06-28T08:07:43.028Z",
              "updated_at": "2023-06-28T08:07:43.028Z"
          }
      ],
      "datasaver": {
          "id": 169,
          "mobile_data_restricted": false,
          "data_saver_enabled": false,
          "reduce_video_quality": false,
          "reduce_download_quality": false,
          "wifi_upload_only": false,
          "account_id": 335,
          "created_at": "2023-06-28T08:07:43.071Z",
          "updated_at": "2023-06-28T08:07:43.071Z"
      }
  }
}


const feature = loadFeature(
  "./__tests__/features/balance-scenario.feature"
);

defineFeature(feature, (test) => {  
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    mockgetStorageData.mockImplementation(() => {
      return Promise.resolve("ar")   
    })
    global.fetch = mockFetch;
    jest.spyOn(global, 'setTimeout').mockImplementation((cb:any) => cb() );
  });

  test("User navigates to Balance", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Balance;

    given("I am a User loading Balance", () => {
      exampleBlockA = shallow(<Balance {...screenProps} />);
    });

    when("I navigate to the Balance", () => {
      instance = exampleBlockA.instance() as Balance;
    });

    then("Balance will load with out errors", () => {
      mockFetch.mockImplementation((key:string) =>{
        if(key.includes("get_billing_details"))  {  
          return Promise.resolve({
            json: () => Promise.resolve(MOCK_RESULT_SUCCESS_get_billing_details),
        })}
      });
      const getCurrentProfileMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getCurrentProfileAPICallId = getCurrentProfileMessage.messageId;
      getCurrentProfileMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCurrentProfileMessage.messageId);
      getCurrentProfileMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
          meta: {
              token: "abcXYZ123",
          },
          data: {
              profile: ''
          }
      })
      runEngine.sendMessage("Unit Test", getCurrentProfileMessage)

      const getCoinBalanceMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getCoinBalanceAPICallId = getCoinBalanceMessage.messageId;
      getCoinBalanceMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCoinBalanceMessage.messageId);
      getCoinBalanceMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_balance)
      runEngine.sendMessage("Unit Test", getCoinBalanceMessage)

      const getPreMadePackagesMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getPreMadePackagesAPICallId = getPreMadePackagesMessage.messageId;
      getPreMadePackagesMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPreMadePackagesMessage.messageId);
      getPreMadePackagesMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS)
      runEngine.sendMessage("Unit Test", getPreMadePackagesMessage)

      const getCoinsWorthMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getCoinsWorthAPICallId = getCoinsWorthMessage.messageId;
      getCoinsWorthMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCoinsWorthMessage.messageId);
      getCoinsWorthMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_coin)
      runEngine.sendMessage("Unit Test", getCoinsWorthMessage)

      const getAllCoinTransactionsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getAllCoinTransactionsAPICallId = getAllCoinTransactionsMessage.messageId;
      getAllCoinTransactionsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getAllCoinTransactionsMessage.messageId);
      getAllCoinTransactionsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_coin_transaction_list)
      runEngine.sendMessage("Unit Test", getAllCoinTransactionsMessage)

      const msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
      msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceErrorMessage),MOCK_RESULT_FAILURE_balance)
      runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
      
      const msgBalanceErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
      msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceErrorMessage),{
        errors: ["Account Balance is insufficient"]
      })
      runEngine.sendMessage("Unit Test", msgBalanceErrorRestAPI)
      
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can select back button with out errors", () => {
      let BackButtonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "backButtonID"
      );
      BackButtonComponent.simulate("press")
    });

    then("I can change index", () => {
      let testID1 = exampleBlockA.findWhere(
        (node) => node.prop("testIDs")?.length && node.prop("testIDs")[0] === "testID1"
      );
      testID1.prop("onTabPress")(0);
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "textInputId"
      );
      textInputComponent.simulate("changeText", "500");
      textInputComponent.simulate("submitEditing");

    });

    then("Flatlist component will render", async (id: any) => {
      await new Promise(resolve => setImmediate(resolve))
      
      const flatlistId = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "flist1"
      );
      flatlistId.props().keyExtractor({}, 3);
      flatlistId.props().renderItem({ item: instance.state.ListPreMadePackages[0], index: 0 })
      const flatlistIdRender = flatlistId.renderProp('renderItem')({ item: instance.state.ListPreMadePackages[0], index: 0 })
      const flatlistIdBtn = flatlistIdRender.findWhere((node) => node.prop('testID') === 'testButton2')

      const getCoinBalanceMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getCoinBalanceAPICallId = getCoinBalanceMessage.messageId;
      getCoinBalanceMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCoinBalanceMessage.messageId);
      getCoinBalanceMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_FAILURE_balance)
      runEngine.sendMessage("Unit Test", getCoinBalanceMessage)


      const getAllCoinTransactionsMessageError = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getAllCoinTransactionsAPICallId = getAllCoinTransactionsMessageError.messageId;
      getAllCoinTransactionsMessageError.addData(getName(MessageEnum.RestAPIResponceDataMessage), getAllCoinTransactionsMessageError.messageId);
      getAllCoinTransactionsMessageError.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_FAILURE_balance_error)
      runEngine.sendMessage("Unit Test", getAllCoinTransactionsMessageError)
      
      flatlistIdBtn.simulate("press")

      let buttonComponent1 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "buyButton"
      )
      buttonComponent1.simulate("press")     
    });
    
    then("I can enter text with errors", async() => { 
      const getPreMadePackagesMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getPreMadePackagesAPICallId = getPreMadePackagesMessage.messageId;
      getPreMadePackagesMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPreMadePackagesMessage.messageId);
      getPreMadePackagesMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_One)
      runEngine.sendMessage("Unit Test", getPreMadePackagesMessage) 

      const flatlistId = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "flist1"
      );
      flatlistId.props().keyExtractor({}, 3);
      flatlistId.props().renderItem({ item: instance.state.ListPreMadePackages[0], index: 0 })

      const flatlistIdRender = flatlistId.renderProp('renderItem')({ item: instance.state.ListPreMadePackages[0], index: 0 })
      const flatlistIdBtn = flatlistIdRender.findWhere((node) => node.prop('testID') === 'testButton3')
      flatlistIdBtn.simulate("press")

      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "textInputId"
      );
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "buyButton"
      );
      textInputComponent.simulate("changeText", "");
      buttonComponent.simulate("press");

      textInputComponent.simulate("changeText", "1000000");
      buttonComponent.simulate("press");
    });

    then("I can select buy button with out errors", () => {
      let BackButtonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "buyButton"
      );
      BackButtonComponent.simulate("press")
    });

    then("I can view the updated coins after In app purchase",async()=>{
      // This will call from In app purchase block
      const body = {
        transaction_type: "purchase",
        amount: 100,
        coins_count: 70,
        status: "success",
        payment_id: "id",
        tax_amount: null,
        package_id: 13,
        platform: "ios"
      };
      instance.onCompleteInAppPurchase(body);
      const coinTransectionApi = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getCoinTransactionApiCallId.push(coinTransectionApi.messageId);
      coinTransectionApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), coinTransectionApi.messageId);
      coinTransectionApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {"id": 13,"transaction_type": "purchase",})
      runEngine.sendMessage("Unit Test", coinTransectionApi)
      const getCoinBalanceMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getCoinBalanceAPICallId = getCoinBalanceMessage.messageId;
      getCoinBalanceMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCoinBalanceMessage.messageId);
      getCoinBalanceMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        exchanged_amount_available: "200",
        coins_count: "200",
        coins_worth_value:"200"
      })
      runEngine.sendMessage("Unit Test", getCoinBalanceMessage);
      await waitFor(async()=>{
        exampleBlockA.update();
        let coinsCountTxt = exampleBlockA.findWhere(
          (node) => node.prop("testID") === "coinsCountTxt"
        );
       expect(coinsCountTxt.props().children).toBe("200")
      })
    })
  });

  test("User navigates to Balance with withdraw", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Balance;

    given("I am a User loading Balance", () => {
      exampleBlockA = shallow(<Balance {...screenProps2} />);
    });

    when("I navigate to the Balance", () => {
      instance = exampleBlockA.instance() as Balance;
    });

    then("Balance will load with out errors", () => {
      const getCurrentProfileMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getCurrentProfileAPICallId = getCurrentProfileMessage.messageId;
      getCurrentProfileMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCurrentProfileMessage.messageId);
      getCurrentProfileMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
          meta: {
              token: "abcXYZ123",
          },
          data: {
              profile: ''
          }
      })
      runEngine.sendMessage("Unit Test", getCurrentProfileMessage)

      const getCoinBalanceMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getCoinBalanceAPICallId = getCoinBalanceMessage.messageId;
      getCoinBalanceMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCoinBalanceMessage.messageId);
      getCoinBalanceMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_balance)
      runEngine.sendMessage("Unit Test", getCoinBalanceMessage)

      const getCoinsWorthMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getCoinsWorthAPICallId = getCoinsWorthMessage.messageId;
      getCoinsWorthMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCoinsWorthMessage.messageId);
      getCoinsWorthMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_coin)
      runEngine.sendMessage("Unit Test", getCoinsWorthMessage)

      const getAllCoinTransactionsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getAllCoinTransactionsAPICallId = getAllCoinTransactionsMessage.messageId;
      getAllCoinTransactionsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getAllCoinTransactionsMessage.messageId);
      getAllCoinTransactionsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_coin_transaction)
      runEngine.sendMessage("Unit Test", getAllCoinTransactionsMessage)

      const coinsWithdrawalCriteriaMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.coinsWithdrawalCriteriaAPICallId = coinsWithdrawalCriteriaMessage.messageId;
      coinsWithdrawalCriteriaMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), coinsWithdrawalCriteriaMessage.messageId);
      coinsWithdrawalCriteriaMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_coin_transaction_criteria)
      runEngine.sendMessage("Unit Test", coinsWithdrawalCriteriaMessage)

      const customCoinWithdrawalMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.customCoinWithdrawalAPICallId = customCoinWithdrawalMessage.messageId;
      customCoinWithdrawalMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), customCoinWithdrawalMessage.messageId);
      customCoinWithdrawalMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_coin_customCoinWithdrawal)
      runEngine.sendMessage("Unit Test", customCoinWithdrawalMessage)

      const customCoinPurchaseMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.customCoinPurchaseAPICallId = customCoinPurchaseMessage.messageId;
      customCoinPurchaseMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), customCoinPurchaseMessage.messageId);
      customCoinPurchaseMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_customCoinPurchase)
      runEngine.sendMessage("Unit Test", customCoinPurchaseMessage)

      const packageCoinPurchaseMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.packageCoinPurchaseAPICallId = packageCoinPurchaseMessage.messageId;
      packageCoinPurchaseMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), packageCoinPurchaseMessage.messageId);
      packageCoinPurchaseMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_customCoinPurchase)
      runEngine.sendMessage("Unit Test", packageCoinPurchaseMessage)

      const flatlistId = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "aboutFlatlist"
      );
      flatlistId.props().keyExtractor({}, 3);
      flatlistId.props().renderItem({ item: instance.state.aboutThePassword, index: 0 })

      const flatlistId2 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "withdrawRulesList"
      );
      flatlistId2.props().keyExtractor({}, 3);
      flatlistId2.props().renderItem({ item: instance.state.withdrawRules, index: 0 })
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can change index", () => {
      let testID1 = exampleBlockA.findWhere(
        (node) => node.prop("testIDs")?.length && node.prop("testIDs")[0] === "testID1"
      );
      testID1.prop("onTabPress")(1);
    });

    then("I can select back button with out errors", () => {
      let BackButtonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "backButtonID"
      );
      BackButtonComponent.simulate("press")
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "customTextInput"
      );
      textInputComponent.simulate("changeText", "500");
      textInputComponent.simulate("submitEditing");
    });

    then("I can enter text with errors", async() => { 
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "customTextInput"
      );
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "withdrawBtn"
      );
      textInputComponent.simulate("changeText", "");
      buttonComponent.simulate("press");

      textInputComponent.simulate("changeText", "1000000");
      buttonComponent.simulate("press");
    });

    then("I can select withdraw button with out errors", () => {
      let BackButtonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "withdrawBtn"
      );
      BackButtonComponent.simulate("press")
    });

    then("I can close modal", async() => {
      await new Promise(resolve => setImmediate(resolve))

      let coinTextInput = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "coinTextInput"
      );
    
      coinTextInput.simulate("changeText", "200")

      let withdrawBtn1 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "withdrawBtn1"
      );
      let closeBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "closeBtn"
      );
      withdrawBtn1.simulate("press")
      closeBtn.simulate("press")


      const customCoinWithdrawalErrorMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.customCoinWithdrawalAPICallId = customCoinWithdrawalErrorMessage.messageId;
      customCoinWithdrawalErrorMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), customCoinWithdrawalErrorMessage.messageId);
      customCoinWithdrawalErrorMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {errors : "Account Balance is insufficient"})
      runEngine.sendMessage("Unit Test", customCoinWithdrawalErrorMessage)

      const coinsWithdrawalCriteriaErrorMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.coinsWithdrawalCriteriaAPICallId = coinsWithdrawalCriteriaErrorMessage.messageId;
      coinsWithdrawalCriteriaErrorMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), coinsWithdrawalCriteriaErrorMessage.messageId);
      coinsWithdrawalCriteriaErrorMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_coin_transaction_criteria_error)
      runEngine.sendMessage("Unit Test", coinsWithdrawalCriteriaErrorMessage)
    });

  });

   test("User navigates to Balance with history", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Balance;

    given("I am a User loading Balance", () => {
      exampleBlockA = shallow(<Balance {...screenProps3} />);
    });

    when("I navigate to the Balance", () => {
      instance = exampleBlockA.instance() as Balance;
    });

    then("Balance will load with out errors", () => {
      const getCurrentProfileMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getCurrentProfileAPICallId = getCurrentProfileMessage.messageId;
      getCurrentProfileMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCurrentProfileMessage.messageId);
      getCurrentProfileMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
          meta: {
              token: "abcXYZ123",
          },
          data: {
              profile: ''
          }
      })
      runEngine.sendMessage("Unit Test", getCurrentProfileMessage)

      const getCoinBalanceMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getCoinBalanceAPICallId = getCoinBalanceMessage.messageId;
      getCoinBalanceMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCoinBalanceMessage.messageId);
      getCoinBalanceMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_balance)
      runEngine.sendMessage("Unit Test", getCoinBalanceMessage)

      const getCoinsWorthMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getCoinsWorthAPICallId = getCoinsWorthMessage.messageId;
      getCoinsWorthMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCoinsWorthMessage.messageId);
      getCoinsWorthMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_coin)
      runEngine.sendMessage("Unit Test", getCoinsWorthMessage)

      const getAllCoinTransactionsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getAllCoinTransactionsAPICallId = getAllCoinTransactionsMessage.messageId;
      getAllCoinTransactionsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getAllCoinTransactionsMessage.messageId);
      getAllCoinTransactionsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_coin_transaction_list)
      runEngine.sendMessage("Unit Test", getAllCoinTransactionsMessage)

      expect(exampleBlockA).toBeTruthy();
    });

    then("Hitory list load with out errors", () => {
      const flatlistId2 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "flatList2"
      );
      flatlistId2.props().keyExtractor({}, 3);
      flatlistId2.props().renderItem({ item: instance.state.ListTransactionsOfAnAccount[0], index: 0 })
      flatlistId2.renderProp("ListEmptyComponent")();
    });
    then("I can change index", () => {
      let testID1 = exampleBlockA.findWhere(
        (node) => node.prop("testIDs")?.length && node.prop("testIDs")[0] === "testID1"
      );
      testID1.prop("onTabPress")(2);
    });
  });
});
