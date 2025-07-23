import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
export const configJSON = require("../../config.json");
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import QrCodes from "../../src/QrCodes";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "QrCodes"
};

const feature = loadFeature("./__tests__/features/qrcode-scenario.feature");

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to qrcodes", ({ given, when, then }) => {
    let qrCodesBlock: ShallowWrapper;
    let instance: QrCodes;

    given("I am a User loading qrcodes", () => {
      qrCodesBlock = shallow(<QrCodes {...screenProps} />);
    });

    when("I navigate to the qrcodes", () => {
      instance = qrCodesBlock.instance() as QrCodes;
    });

    then("qrcodes will load with out errors", () => {

      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      let qrCodeData  = {"data":{"id":"1199","type":"qr_code","attributes":{"id":1199,"qrable_type":null,"qrable_id":null,"created_at":"2021-11-30T19:46:43.002Z","updated_at":"2021-11-30T19:46:43.025Z","qr_code":"http://localhost:3000/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcTRFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7f9b80ddda1d944713ac0ae415b19b56e9e47981/qr_code.png"}}}

      const generateQrCodeAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      generateQrCodeAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        generateQrCodeAPI.messageId
      );
   
      generateQrCodeAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {qrCodeData}
      );
   
      instance.getQRApiCallId = generateQrCodeAPI.messageId;
      runEngine.sendMessage("Unit Test", generateQrCodeAPI);

      expect(qrCodesBlock).toBeTruthy();        

    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(qrCodesBlock).toBeTruthy();
    });
  });
});
