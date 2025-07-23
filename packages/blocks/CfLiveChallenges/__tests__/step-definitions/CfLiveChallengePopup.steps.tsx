import { ShallowWrapper, shallow } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import CfLiveChallengesPopUp from "../../src/CfChallengePopup";

export const configJSON = require("../../config.json");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset:jest.fn()
  },
  id: "CfLiveChallengesPopUp",
  route:{
    params:{
      EventId:12
    }
  }
};

const feature = loadFeature("./__tests__/features/CfLiveChallengePopup-scenario.feature");


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to CfLiveChallengesPopUp", ({ given, when, then }) => {
    let CfLiveChallengePopupWrapper: ShallowWrapper;
    let instance: CfLiveChallengesPopUp;

    given("I am a User loading CfLiveChallengesPopUp", () => {
      CfLiveChallengePopupWrapper = shallow(<CfLiveChallengesPopUp {...screenProps} />);
    });

    when("I navigate to the CfLiveChallengesPopUp", () => {
      instance = CfLiveChallengePopupWrapper.instance() as CfLiveChallengesPopUp;
    });

    then("CfLiveChallengesPopUp will load with out errors", () => {
      instance.setState({gitfmodel:true}, () => {
        instance.closeGiftModal();
      })
      expect(CfLiveChallengePopupWrapper).toBeTruthy();
    });

    then("I can start 1 versus 1 challenge", () => {
      let btn1 = CfLiveChallengePopupWrapper.findWhere(
        (node:any) => node.prop("testID") === "btn1"
      );
      instance.onSuccessGenerateToken({data:''})
      instance.onSuccessJoinMeeting({data:{disabled:false,id:'12',roomId:'12'}})
      btn1.simulate("press");
    });

    then("I can start 2 versus 2 challenge", () => {
      let btn2 = CfLiveChallengePopupWrapper.findWhere(
        (node:any) => node.prop("testID") === "btn2"
      );
      instance.onSuccessCreateMeeting({data:{data:{attributes:{roomId:'12'},id:12}}})
      btn2.simulate("press");
    });

    then("I can start 3 versus 3 challenge", () => {
      let btn3 = CfLiveChallengePopupWrapper.findWhere(
        (node:any) => node.prop("testID") === "btn3"
      );
      instance.onSuccessLogin({data:{attributes:{photo:'',full_name:''}}})
      instance.generateToken();
      instance.validateMeeting({roomId:'12',micOn: true,
      videoOn: true,
      name: ''})
      btn3.simulate("press");
    });


    then("I can leave the screen with out errors", () => {
      let btnGoBack = CfLiveChallengePopupWrapper.findWhere(
        (node:any) => node.prop("testID") === "btnGoBack"
      );
      btnGoBack.simulate("press");
      instance.setState({gitfmodel:false})
      instance.componentWillUnmount();
      expect(CfLiveChallengePopupWrapper).toBeTruthy();
    });
  });
});
