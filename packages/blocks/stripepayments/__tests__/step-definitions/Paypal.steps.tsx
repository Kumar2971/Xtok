/// <reference types="@types/jest" />

import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import React from "react";
import PayPalView from "../../src/Paypal";
import WebView from "react-native-webview";
import { ActivityIndicator } from "react-native";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const feature = loadFeature("./__tests__/features/PaypalView-scenario.feature");
const tokenSuccess = {"access_token": "A21AAJasb0Znzpjb5mym5BeLooInRupKaUSiBt88ordegVKwPBobwBQV4PnsqRnkFiBJ0212lqZJmFMEyToCCiRGjexMkhEmA", "app_id": "APP-80W284485P519543T", "expires_in": 30483, "nonce": "2023-07-25T12:02:11ZdqODalrfBEcq1uzm_wZBocOzSLZVzq25y71tQhMpdl4", "scope": "https://uri.paypal.com/services/invoicing https://uri.paypal.com/services/disputes/read-buyer https://uri.paypal.com/services/payments/realtimepayment https://uri.paypal.com/services/disputes/update-seller https://uri.paypal.com/services/payments/payment/authcapture openid https://uri.paypal.com/services/disputes/read-seller https://uri.paypal.com/services/payments/refund https://api.paypal.com/v1/vault/credit-card https://api.paypal.com/v1/payments/.* https://uri.paypal.com/payments/payouts https://api.paypal.com/v1/vault/credit-card/.* https://uri.paypal.com/services/subscriptions https://uri.paypal.com/services/applications/webhooks", "token_type": "Bearer"}
const confirmPaymentSuccess = {"account_id": 451, "amount": 10.5, "coins_count": 25, "created_at": "2023-07-25T12:55:02.949Z", "id": 357, "package_id": null, "payment_id": "1LU121379P864293K", "reasons": null, "status": "success", "tax_amount": 0.5, "transaction_type": "purchase", "updated_at": "2023-07-25T12:55:02.949Z"}
const billingDetailsSuccess = {"account_data": {"activated": true, "bio": null, "country_code": "91", "created_at": "2023-07-07T13:22:39.354Z", "datasaver": {"account_id": 451, "created_at": "2023-07-07T13:22:39.445Z", "data_saver_enabled": false, "id": 285, "mobile_data_restricted": false, "reduce_download_quality": false, "reduce_video_quality": false, "updated_at": "2023-07-07T13:22:39.445Z", "wifi_upload_only": false}, "date_of_birth": "2023-07-06", "device_id": "eTEZanazQ8ufreAz0sT9Kr:APA91bFizXoRwoXu4C9ZN8aix-njcEPtlttlgBZqPOcIMPInpHYoz6nzY-5chE10Fb-OfHFNEu8X-d1D9PbZk9GUZ7TRQDYKduCQnlguf17RKrQDJVoZVG-MJa6rDZGV_tYMAwrdMGGg", "email": "test1@mail.com", "first_name": null, "full_name": "Avani ", "full_phone_number": "919425682014", "gender": null, "instagram": null, "is_active_status": false, "is_allow_leaderboard_visibility": true, "is_allow_mentions": true, "is_blocked": false, "is_challenges_invites": true, "is_chat_muted": false, "is_dark_mode_theme": false, "is_muted": false, "is_online": true, "is_private_account": false, "is_restricated": false, "is_show_sensitive_content": false, "last_name": null, "last_seen_at": "2023-07-24T11:50:44.674Z", "nickname": null, "phone_number": "9425682014", "photo": null, "profile_id": null, "profile_video": null, "profile_view_count": 0, "push_notificable_activated": true, "type": null, "unique_auth_id": "R1J7evQ4SAtcY9r00cQGSgtt", "updated_at": "2023-07-25T06:11:16.951Z", "user_name": "avani_stage", "video_quality_preferences": [[Object], [Object]], "youtube": null}, "amount": 10, "date": "2023-07-25", "tax_amount": 0.5, "total_amount": 10.5, "transaction_type": "purchase"}
const createPayloadApiSucess =  {"id": "35N09603WH604110V", "links": [{"href": "https://api.sandbox.paypal.com/v2/checkout/orders/35N09603WH604110V", "method": "GET", "rel": "self"}, {"href": "https://www.sandbox.paypal.com/checkoutnow?token=35N09603WH604110V", "method": "GET", "rel": "approve"}, {"href": "https://api.sandbox.paypal.com/v2/checkout/orders/35N09603WH604110V", "method": "PATCH", "rel": "update"}, {"href": "https://api.sandbox.paypal.com/v2/checkout/orders/35N09603WH604110V/capture", "method": "POST", "rel": "capture"}], "status": "CREATED"}
const createPayloadApiSucessTwo =  {"id": "35N09603WH604110V", "links": [{"href": undefined, "method": "GET", "rel": "approve"}], "status": "CREATED"}

const screenProps = {
  isPaypalWebOn: true,
  isWebUrl: "https://example.com",
  onNavigationStateChange: jest.fn(),
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
  route: {params:{amount:"100"}},
  id: "PayPalView",
};
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
  });

  test("User navigates to PaypalView", ({
    given,
    when,
    then,
  }) => {
    let paypalViewWrapper: ShallowWrapper;
    let instance: PayPalView;

   
    given("I am a User loading PaypalView", () => {
      paypalViewWrapper = shallow(<PayPalView {...screenProps} />);
    });

    when("I navigate to the PaypalView", () => {
      instance = paypalViewWrapper.instance() as PayPalView;
    });

    then("PaypalView will load with out errors", async() => {
      await new Promise<void>((resolve) => {
        return setImmediate(resolve)
      })
      const getAccessTokenMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getAccessTokenApiCallId = getAccessTokenMessage.messageId;
      getAccessTokenMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getAccessTokenMessage.messageId);
      getAccessTokenMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), tokenSuccess)
      runEngine.sendMessage("Unit Test", getAccessTokenMessage) 

      getAccessTokenMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {errors:{token:"something went wrong!"}})
      runEngine.sendMessage("Unit Test", getAccessTokenMessage) 

      const onPaypalMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.onPaypalApiCallId = onPaypalMessage.messageId;
      onPaypalMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), onPaypalMessage.messageId);
      onPaypalMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), createPayloadApiSucess)
      runEngine.sendMessage("Unit Test", onPaypalMessage) 

      onPaypalMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {errors:{token:"something went wrong!"}})
      runEngine.sendMessage("Unit Test", onPaypalMessage) 
  
      const getBillingDetailsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getBillingDetailsApiCallId = getBillingDetailsMessage.messageId;
      getBillingDetailsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBillingDetailsMessage.messageId);
      getBillingDetailsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), billingDetailsSuccess)
      runEngine.sendMessage("Unit Test", getBillingDetailsMessage) 

      getBillingDetailsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {errors:{token:"something went wrong!"}})
      runEngine.sendMessage("Unit Test", getBillingDetailsMessage) 

      const confirmPaymentMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.confirmPaymentApiCallId = confirmPaymentMessage.messageId;
      confirmPaymentMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), confirmPaymentMessage.messageId);
      confirmPaymentMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), confirmPaymentSuccess)
      runEngine.sendMessage("Unit Test", confirmPaymentMessage) 

      confirmPaymentMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {errors:{token:"something went wrong!"}})
      runEngine.sendMessage("Unit Test", confirmPaymentMessage) 

      const getCoinTransactionMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getCoinTransactionApiCallId = getCoinTransactionMessage.messageId;
      getCoinTransactionMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCoinTransactionMessage.messageId);
      getCoinTransactionMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), confirmPaymentSuccess)
      runEngine.sendMessage("Unit Test", getCoinTransactionMessage) 

      getCoinTransactionMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {errors:{token:"something went wrong!"}})
      runEngine.sendMessage("Unit Test", getCoinTransactionMessage)

      expect(paypalViewWrapper).toBeTruthy();
    });

    then("I can load webview with errors", () => {

      const onPaypalMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.onPaypalApiCallId = onPaypalMessage.messageId;
      onPaypalMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), onPaypalMessage.messageId);
      onPaypalMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), createPayloadApiSucessTwo)
      runEngine.sendMessage("Unit Test", onPaypalMessage) 

      onPaypalMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {errors:{token:"something went wrong!"}})
      runEngine.sendMessage("Unit Test", onPaypalMessage)

      let testID1 = paypalViewWrapper.findWhere(
        (node) => node.prop("testID") === "web-view"
      );
      testID1.prop("onNavigationStateChange")({url : "https://fail"});
    });

    then("I can load webview", () => {
      let testID1 = paypalViewWrapper.findWhere(
        (node) => node.prop("testID") === "web-view"
      );
      testID1.prop("onNavigationStateChange")({url : "https://success"});
    });
  })
});
