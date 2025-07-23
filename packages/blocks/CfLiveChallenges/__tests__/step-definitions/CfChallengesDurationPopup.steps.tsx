import { ShallowWrapper, shallow } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import CfChallengesDurationPopup from "../../src/CfChallengesDurationPopup";


export const configJSON = require("../../config.json");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset:jest.fn()
  },
  id: "CfChallengesDurationPopup",
  route:{
    params:{
      statusId:2
    }
  }
};

const feature = loadFeature("./__tests__/features/CfChallengesDurationPopup-scenario.feature");


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to CfChallengesDurationPopup", ({ given, when, then }) => {
    let CfLiveChallengePopupWrapper: ShallowWrapper;
    let instance: CfChallengesDurationPopup;

    given("I am a User loading CfChallengesDurationPopup", () => {
      CfLiveChallengePopupWrapper = shallow(<CfChallengesDurationPopup {...screenProps} />);
    });

    when("I navigate to the CfChallengesDurationPopup", () => {
      instance = CfLiveChallengePopupWrapper.instance() as CfChallengesDurationPopup;
    });

    then("CfChallengesDurationPopup will load with out errors", () => {
      instance.startLiveStreamFunction({meetingId:'1',streamKey:'',streamUrl:''})
      expect(CfLiveChallengePopupWrapper).toBeTruthy();
    });

    then("I can start 5 min challenge", () => {
      let btn1 = CfLiveChallengePopupWrapper.findWhere(
        (node:any) => node.prop("testID") === "btn1"
      );
      instance.hlsStartLiveStream('1')

      instance.addParticipants();
      btn1.simulate("press");
    });

    then("I can start 10 min challenge", () => {
      let btn2 = CfLiveChallengePopupWrapper.findWhere(
        (node:any) => node.prop("testID") === "btn2"
      );
      instance.handleBackButtonClick();
      btn2.simulate("press");
    });

    then("I can start 15 min challenge", () => {
      let btn3 = CfLiveChallengePopupWrapper.findWhere(
        (node:any) => node.prop("testID") === "btn3"
      );
      instance.sendStatus('1')
      instance.fetchRecordingFunction();
      btn3.simulate("press");
    });


    then("I can leave the screen with out errors", () => {
      let btnGoBack = CfLiveChallengePopupWrapper.findWhere(
        (node:any) => node.prop("testID") === "btnGoBack"
      );
      instance.createLiveChallenge();
      instance.createMeeting();
      btnGoBack.simulate("press");
      instance.componentWillUnmount();
      expect(CfLiveChallengePopupWrapper).toBeTruthy();
    });
  });
});
