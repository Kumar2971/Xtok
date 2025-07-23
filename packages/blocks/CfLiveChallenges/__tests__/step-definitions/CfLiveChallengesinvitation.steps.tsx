import { ShallowWrapper, shallow } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import CfLiveChallengesinvitation from "../../src/CfLiveChallengesinvitation";
const navigation = require("react-navigation");

export const configJSON = require("../../config.json");


const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn()
  },
  id: "CfLiveChallengesinvitation",
};

const feature = loadFeature("./__tests__/features/CfLiveChallengesinvitation-scenario.feature");


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to CfLiveChallengesinvitation", ({ given, when, then }) => {
    let CfLiveChallengesinvitationWrapper: ShallowWrapper;
    let instance: CfLiveChallengesinvitation;

    given("I am a User loading CfLiveChallengesinvitation", () => {
      //@ts-ignore
      CfLiveChallengesinvitationWrapper = shallow(<CfLiveChallengesinvitation {...screenProps} />);
    });

    when("I navigate to the CfLiveChallengesinvitation", () => {
      instance = CfLiveChallengesinvitationWrapper.instance() as CfLiveChallengesinvitation;
    });

    then("CfLiveChallengesinvitation will load with out errors", () => {
      instance.header();
      instance.participants();
      expect(CfLiveChallengesinvitationWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      let btnGoBack = CfLiveChallengesinvitationWrapper.findWhere(
        (node:any) => node.prop("testID") === "btnGoBack"
      );
      btnGoBack.simulate("press");
      instance.componentWillUnmount();
      expect(CfLiveChallengesinvitationWrapper).toBeTruthy();
    });
  });
});
