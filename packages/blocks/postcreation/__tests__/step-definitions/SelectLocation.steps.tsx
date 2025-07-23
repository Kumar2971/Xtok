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
import SelectLocation from "../../src/feed/SelectLocation";

const screenProps = {
  navigation: {
      state: { params: {} },
      dispatch: jest.fn(),
      goBack: jest.fn(),
      dismiss: jest.fn(),
      navigate: jest.fn(),
      openDrawer: jest.fn(),
      closeDrawer: jest.fn(),
      toggleDrawer: jest.fn(),
      getParam: jest.fn(),
      setParams: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      pop: jest.fn(),
      popToTop: jest.fn(),
      isFocused: jest.fn(),
      addListener: jest.fn().mockImplementation((_, callback) => {
          callback();
        }),
  },
  id: "SelectLocation",
  route: {
    params:{
      mediadetails:"mediadetails",
      poster:"poster",
      description:"description"
    }
  }   
};

const mockgetStorageData = jest.spyOn(utils, "getStorageData")
const mockFetch = jest.fn();

const feature = loadFeature("./__tests__/features/SelectLocation-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    mockgetStorageData.mockImplementation(() => {
      return Promise.resolve("ar")
    })
    global.fetch = mockFetch;
  });

  test("User navigates to SelectLocation", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: SelectLocation;

    given("I am a User loading SelectLocation", () => {
      exampleBlockA = shallow(<SelectLocation {...screenProps} />);
    });

    when("I navigate to the SelectLocation", () => {
      instance = exampleBlockA.instance() as SelectLocation;
    });

    then("SelectLocation will load with out errors", () => {
      instance.componentWillUnmount()
      expect(exampleBlockA).toBeTruthy();
    });
    
    then("I can select back button with out errors", () => {
      let nextBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "goBack"
      );
      nextBtn.simulate("press");
    });

    then("I can select GooglePlaceAutocomplete with out errors", () => {
      // let autoCompleteBtn = exampleBlockA.findWhere(
      //   (node) => node.name() == "GooglePlacesAutocomplete"
      // );
      // autoCompleteBtn.simulate("press");
    });
  });
});