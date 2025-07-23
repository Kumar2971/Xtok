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
import HelpCentre from "../../src/HelpCentre";
import HelpCentreQA from "../../src/HelpCentreQA";
import HelpCentreSub from "../../src/HelpCentreSub";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "HelpCentre"
};

const feature = loadFeature("./__tests__/features/helpcentre-scenario.feature");
const helpCentreResponce = "[id\": \"2\", \"type\": \"question_type\", \"attributes\": { \"id\": 2, \"que_type\": \"subtype1\", \"description\": \"This is subtype1 1\", \"created_at\": \"2021-05-04T17:12:24.138Z\", \"updated_at\": \"2021-05-04T17:12:24.138Z\", \"question_sub_types\": { \"data\": [ { \"id\": \"1\", \"type\": \"question_sub_type\", \"attributes\": { \"id\": 1, \"sub_type\": \"subtype1\", \"description\": \"This is sub type 1\", \"created_at\": \"2021-05-04T17:12:28.283Z\", \"updated_at\": \"2021-05-04T17:12:28.283Z\", \"question_answers\": { \"data\": [ { \"id\": \"1\", \"type\": \"question_answer\", \"attributes\": { \"id\": 1, \"question\": \"A question\", \"answer\": \"This is an answer\", \"created_at\": \"2021-05-04T17:25:40.392Z\", \"updated_at\": \"2021-05-04T17:25:40.392Z\" } } ] } } } ] } } }, { \"id\": \"1\", \"type\": \"question_type\", \"attributes\": { \"id\": 1, \"que_type\": \"type1\", \"description\": \"This is type 1\", \"created_at\": \"2021-05-04T17:07:35.373Z\", \"updated_at\": \"2021-05-04T17:07:35.373Z\", \"question_sub_types\": { \"data\": [] } } }]"
const helpCentreSubResponce = "[{\"id\":\"NavigationPayLoadMessage\",\"properties\":{\"HelpCentreMessageData\":{\"que_title\":\"subtype1\",\"que_array\":[{\"id\":\"1\",\"type\":\"question_sub_type\",\"attributes\":{\"id\":1,\"sub_type\":\"subtype1\",\"description\":\"This is sub type 1\",\"created_at\":\"2021-05-04T17:12:28.283Z\",\"updated_at\":\"2021-05-04T17:12:28.283Z\",\"question_answers\":{\"data\":[{\"id\":\"1\",\"type\":\"question_answer\",\"attributes\":{\"id\":1,\"question\":\"A question\",\"answer\":\"This is an answer\",\"created_at\":\"2021-05-04T17:25:40.392Z\",\"updated_at\":\"2021-05-04T17:25:40.392Z\"}}]}}}]}},\"messageId\":\"1909530b-f8bd-4375-8bf4-d598cfd9e983\"}]"

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to helpcentre", ({ given, when, then }) => {
    let helpCentre: ShallowWrapper;
    let instance: HelpCentre;

    given("I am a User loading helpcentre", () => {
      helpCentre = shallow(<HelpCentre {...screenProps} />);
    });

    when("I navigate to the helpcentre", () => {
      instance = helpCentre.instance() as HelpCentre;

      const msgToken = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgToken.addData(
        getName(MessageEnum.SessionResponseToken),
        "TOKEN"
      );
      runEngine.sendMessage("Unit Test", msgToken);


      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
    
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: helpCentreResponce
        }
      );

      instance.getHelpCentreApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      
      const msgError = new Message(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      msgError.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgError.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
        data: []
      });
      instance.getHelpCentreApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      instance.gotoSubScreen(null);
      
      instance.gotoHelpCentreQA(null,[]);

    });

    then("helpcentre will load with out errors", () => {
      expect(helpCentre).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(helpCentre).toBeTruthy();
    });
  });

  test("User navigates to helpcentreQA", ({ given, when, then }) => {
    let helpCentre: ShallowWrapper;
    let instance: HelpCentreQA;

    given("I am a User loading helpcentreQA", () => {
      helpCentre = shallow(<HelpCentreQA {...screenProps} />);
    });

    when("I navigate to the helpcentreQA", () => {
      instance = helpCentre.instance() as HelpCentreQA;
    });

    then("helpcentreQA will load with out errors", () => {
      expect(helpCentre).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(helpCentre).toBeTruthy();
    });
  });

  test("User navigates to helpcentreSub", ({ given, when, then }) => {
    let helpCentre: ShallowWrapper;
    let instance: HelpCentreSub;

    given("I am a User loading helpcentreSub", () => {
      helpCentre = shallow(<HelpCentreSub {...screenProps} />);
    });

    when("I navigate to the helpcentreSub", () => {
      instance = helpCentre.instance() as HelpCentreSub;
      const msgNavigation = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      msgNavigation.addData(
        getName(MessageEnum.HelpCentreMessageData),
        {
          data: helpCentreSubResponce
        }
      );
      runEngine.sendMessage("Unit Test", msgNavigation);

    });

    then("helpcentreSub will load with out errors", () => {
      expect(helpCentre).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(helpCentre).toBeTruthy();
    });
  });
});
