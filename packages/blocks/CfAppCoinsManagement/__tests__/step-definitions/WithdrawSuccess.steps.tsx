import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as utils from "../../../../framework/src/Utilities";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import WithdrawSuccess from "../../src/WithdrawSuccess";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
},
  id: "WithdrawSuccess",
  route: {}
};
const mockgetStorageData = jest.spyOn(utils, "getStorageData")

const feature = loadFeature(
  "./__tests__/features/WithdrawSuccess-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    mockgetStorageData.mockImplementation(() => {
      return Promise.resolve("ar")
  })
  });

  test("User navigates to ExchangeForCoins", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: WithdrawSuccess;

    given("I am a User loading ExchangeForCoins", () => {
      exampleBlockA = shallow(<WithdrawSuccess {...screenProps} />);
    });

    when("I navigate to the ExchangeForCoins", () => {
      instance = exampleBlockA.instance() as WithdrawSuccess;
    });

    then("ExchangeForCoins will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can select the go to feed button with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "withdrawSuccess"
      );
      buttonComponent.simulate("press");
    });
  
    then("I can leave the screen with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
