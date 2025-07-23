import { ShallowWrapper, shallow } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import CfAppCoinsManagement from "../../src/CfAppCoinsManagement";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  addListener: jest.fn().mockImplementation((event, callback) => {
    callback();
    return {
       remove: jest.fn(),
    }
  }),
  id: "CfAppCoinsManagement"
};

const feature = loadFeature(
  "./__tests__/features/CfAppCoinsManagement-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("User navigates to CfAppCoinsManagement", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: CfAppCoinsManagement;

    given("I am a User loading CfAppCoinsManagement", () => {
      exampleBlockA = shallow(<CfAppCoinsManagement {...screenProps} />);
    });

    when("I navigate to the CfAppCoinsManagement", () => {
      instance = exampleBlockA.instance() as CfAppCoinsManagement;
    });

    then("CfAppCoinsManagement will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "txtInput"
      );
      textInputComponent.simulate("changeText", "hello@aol.com");
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnExample"
      );
      buttonComponent.simulate("press");
      let buttonComponent2 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnShowHide"
      );
      buttonComponent2.simulate("press");
      expect(buttonComponent).toBeTruthy;
    });
    then("I can select the other button with with out errors", () => {
      let buttonComponent2 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnShowHide"
      );
      buttonComponent2.simulate("press");
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "touchTestOne"
      );
      buttonComponent.simulate("press");
    });

    then("I can leave the screen with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
