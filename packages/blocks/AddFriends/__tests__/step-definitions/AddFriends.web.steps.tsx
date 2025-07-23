import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import AddFriends from "../../src/AddFriends.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "AddFriends",
};

const feature = loadFeature(
  "./__tests__/features/AddFriends-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to AddFriends", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: AddFriends;

    given("I am a User loading AddFriends", () => {
      exampleBlockA = shallow(<AddFriends {...screenProps} />);
    });

    when("I navigate to the AddFriends", () => {
      instance = exampleBlockA.instance() as AddFriends;
    });

    then("AddFriends will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "txtInput"
      );
      const event = {
        preventDefault() {},
        target: { value: "hello@aol.com" },
      };
      textInputComponent.simulate("change", event);
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "btnAddExample"
      );
      buttonComponent.simulate("press");
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
