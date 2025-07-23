/// <reference types="@types/jest" />

import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import * as utils from "../../../../framework/src/Utilities";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import {VolumeButton} from "../../src/feed/VolumButton";

const mockOnpress = jest.fn()
const screenProps = {
  isMute: false,
  setisMute: mockOnpress 
};

const mockgetStorageData = jest.spyOn(utils, "getStorageData")
const mockFetch = jest.fn();

const feature = loadFeature("./__tests__/features/VolumButton-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
  });
  jest.useFakeTimers();

  test("User navigates to VolumeButton", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;


    given("I am a User loading VolumeButton", () => {
      exampleBlockA = shallow(<VolumeButton {...screenProps} />);
    });

    when("I navigate to the VolumeButton", () => {
      expect(exampleBlockA).toMatchSnapshot()
    });

    then("VolumeButton will load with out errors",async () => {
      expect(exampleBlockA).toBeTruthy();
    });
    
    then("I can select mute button with out errors", () => {
      let nextBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnID"
      );
      nextBtn.simulate("press");
  
      expect(mockOnpress).toHaveBeenCalled();
    });
  });
});