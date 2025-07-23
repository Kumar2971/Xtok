import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import Invitefriends from "../../src/Invitefriends";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Invitefriends"
};

const feature = loadFeature(
  "./__tests__/features/invitefriends-scenario.feature"
);

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to invitefriends", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Invitefriends;

    given("I am a User loading invitefriends", () => {
      exampleBlockA = shallow(<Invitefriends {...screenProps} />);

      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockA).toMatchSnapshot();

      instance = exampleBlockA.instance() as Invitefriends;
    });

    when("I navigate to the invitefriends", () => {
      instance = exampleBlockA.instance() as Invitefriends;
    });

    then("invitefriends will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockA).toMatchSnapshot();
    });

    then("I can enter text with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockA).toMatchSnapshot();
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "btnEmailIcon"
      );
      buttonComponent.simulate("press");
      buttonComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "btnWhatsAppIcon"
      );
      buttonComponent.simulate("press");
      buttonComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "btnSMSIcon"
      );
      buttonComponent.simulate("press");
      expect(exampleBlockA).toMatchSnapshot();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockA).toMatchSnapshot();
    });
  });
});
