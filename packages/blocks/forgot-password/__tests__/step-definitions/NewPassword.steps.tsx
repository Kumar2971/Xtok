import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper, mount } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import NewPassword from "../../src/NewPassword";
import * as Utils from "../../../../framework/src/Utilities";
import {act} from "@testing-library/react-native";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    state: {}
  },
  id: "NewPassword"
};

const feature = loadFeature(
  "./__tests__/features/NewPassword-scenario.feature"
);

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    // jest.spyOn(React,'useEffect').mockImplementation((f)=>f())
  });

  test("User navigates to NewPassword", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: NewPassword;

    given("I am a User loading NewPassword", async () => {
      const mockgetStorageData = jest.spyOn(Utils, "getStorageData");
      mockgetStorageData.mockResolvedValue("ar");


      exampleBlockA = shallow(<NewPassword {...screenProps} />);

      await act(async () => {
        await new Promise(resolve => setImmediate(resolve));
        exampleBlockA.update();
      });

      // Assert language state
      expect(exampleBlockA.state('language')).toEqual('ar');
    });

    when("I navigate to the NewPassword", () => {
      instance = exampleBlockA.instance() as NewPassword;

      //Can't remove this setState as this language we can only change from settings. and not able to write local storage test case.

    });

    then("NewPassword will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      let selectEmailBtn = exampleBlockA.findWhere(
        node => node.prop("testID") === "login"
      );
      selectEmailBtn.simulate("press");

      let newPasswordBtn = exampleBlockA.findWhere(
        node => node.prop("testID") === "openConfirm"
      );
      newPasswordBtn.simulate("press");
      // instance.setState({ isFocusedPassword: true });
      let txtPasswordIn = exampleBlockA.findWhere(
        node => node.prop("testID") === "txtPassword"
      );
      instance.togglePasswordVisibility();
      txtPasswordIn.simulate("changeText", "abc123");
      let txtConfirmPasswordIn = exampleBlockA.findWhere(
        node => node.prop("testID") === "txtConfirmPassword"
      );
      txtConfirmPasswordIn.simulate("changeText", "abc123");
      txtConfirmPasswordIn.props().onFocus();
      txtConfirmPasswordIn.props().onBlur();

      // instance.setState({ isFocusedConfirmPassword: true, language: "ar" });
      let newPassBtn = exampleBlockA.findWhere(
        node => node.prop("testID") === "newPassword"
      );
      newPassBtn.simulate("press");
    });
  });
});
