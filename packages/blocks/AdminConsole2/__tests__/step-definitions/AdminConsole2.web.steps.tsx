import { ShallowWrapper, shallow } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";

import AdminConsole2 from "../../src/AdminConsole2.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "AdminConsole2",
};

const feature = loadFeature(
  "./__tests__/features/AdminConsole2-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to AdminConsole2", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: AdminConsole2;

    given("I am a User loading AdminConsole2", () => {
      exampleBlockA = shallow(<AdminConsole2 {...screenProps} />);
    });

    when("I navigate to the AdminConsole2", () => {
      instance = exampleBlockA.instance() as AdminConsole2;
    });

    then("AdminConsole2 will load with out errors", () => {
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
