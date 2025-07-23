import { ShallowWrapper, shallow } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import AdminConsole from "../../src/AdminConsole.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "AdminConsole",
};

const feature = loadFeature(
  "./__tests__/features/AdminConsole-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to AdminConsole", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: AdminConsole;

    given("I am a User loading AdminConsole", () => {
      exampleBlockA = shallow(<AdminConsole {...screenProps} />);
    });

    when("I navigate to the AdminConsole", () => {
      instance = exampleBlockA.instance() as AdminConsole;
    });

    then("AdminConsole will load with out errors", () => {
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
