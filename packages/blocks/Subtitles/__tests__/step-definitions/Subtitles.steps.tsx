import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
const navigation = require("react-navigation");
import Voice from "@react-native-voice/voice";
import Subtitles from "../../src/Subtitles";
export const configJSON = require("../../src/config");

const screenProps = {
  navigation: navigation,
  id: "Subtitles",
};

const feature = loadFeature("./__tests__/features/Subtitles-scenario.feature");

defineFeature(feature, (test) => {
  const ENDPOINT = `${configJSON.serverUrl}:${configJSON.port}`;
  jest.mock("socket.io-client", () => {
    const mSocket = {
      emit: jest.fn(),
      on: jest.fn(),
    };
    return jest.fn(() => mSocket);
  });
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
    jest.spyOn(Voice, "start");
    jest.spyOn(Voice, "destroy");
    jest.useFakeTimers();
  });

  test("User navigates to Subtitles", ({ given, when, then }) => {
    let subtitles: ShallowWrapper;
    let subtitleInstance: Subtitles;

    given("I am a User loading Subtitles", () => {
      subtitles = shallow(<Subtitles {...screenProps} />);
    });

    when("I navigate to the Subtitles", () => {
      subtitleInstance = subtitles.instance() as Subtitles;
    });

    then("Subtitles will load with out errors", () => {
      expect(subtitles).toBeTruthy();
    });

    then("Connect to socket", async () => {
      subtitleInstance.askForPermission();
      expect(ENDPOINT).toBe("http://192.168.29.128:5000");
    });

    when("I hit play button to start video", () => {
      let player = subtitles.findWhere(
        (node) => node.prop("testID") === "video-player"
      );
      player.props().onStart();
    });

    then("Voice will start to record", () => {
      expect(Voice.start).toHaveBeenCalled();
    });

    then("I get partial Speech Result", () => {
      subtitleInstance.onSpeechPartialResults({ value: ["test"] });
      expect(subtitles.state("partialResults")).toEqual(["test"]);
    });
   
    then("I do not get partial Speech Result", () => {
      subtitleInstance.onSpeechPartialResults({ value: [""] });
      expect(subtitles.state("partialResults")).toEqual([""]);
    });

    when("Video is going to end", () => {
      let player = subtitles.findWhere(
        (node) => node.prop("testID") === "video-player"
      );

      player.props().onEnd();
    });

    then("Voice will stop to record", () => {
      expect(Voice.destroy).toHaveBeenCalled();
    });

    then("I can leave the screen with out errors", () => {
      subtitleInstance.componentWillUnmount();
      expect(Subtitles).toBeTruthy();
      expect(Voice.destroy).toHaveBeenCalled();
    });
  });
});
