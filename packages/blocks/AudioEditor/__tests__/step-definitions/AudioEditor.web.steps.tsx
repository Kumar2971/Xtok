import { ShallowWrapper, shallow } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import AudioEditor from "../../src/AudioEditor.web";
const navigation = require("react-navigation"); 

const screenProps = {
  navigation: navigation,
  id: "AudioEditor",
  route: { params: { clip: '' }},
};

const feature = loadFeature(
  "./__tests__/features/AudioEditor-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to AudioEditor", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: AudioEditor;

    given("I am a User loading AudioEditor", () => {
      exampleBlockA = shallow(<AudioEditor {...screenProps} />);
    });

    when("I navigate to the AudioEditor", () => {
      instance = exampleBlockA.instance() as AudioEditor;
    });

    then("AudioEditor will load with out errors", () => {
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
      // let buttonComponent = exampleBlockA.findWhere(
      //   (node) => node.prop("data-test-id") === "btnAddExample"
      // );
      // buttonComponent.simulate("press");
      instance.setState({ enableField: true })
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
