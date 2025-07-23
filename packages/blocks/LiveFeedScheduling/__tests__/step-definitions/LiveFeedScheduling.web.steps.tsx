import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import LiveFeedScheduling from "../../src/LiveFeedScheduling.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "LiveFeedScheduling",
  scheduleLiveEventApiCallId:"",
  getEventListApiCallId:""
};

const feature = loadFeature(
  "./__tests__/features/LiveFeedScheduling-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to LiveFeedScheduling", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: LiveFeedScheduling;

    given("I am a User loading LiveFeedScheduling", () => {
      exampleBlockA = shallow(<LiveFeedScheduling {...screenProps} />);
    });

    when("I navigate to the LiveFeedScheduling", () => {
      instance = exampleBlockA.instance() as LiveFeedScheduling;
    });

    then("LiveFeedScheduling will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      instance.setState({
        eventList: [{
          id: "",
          type: "",
          attributes: {
            event_name: "",
            description: "",
            duration: "",
            start_date: "",
            start_time: "",
          }
        }]
      })
      const btnAddExample = exampleBlockA
        .find({
          "data-test-id": "btnAddExample",
        })
        btnAddExample.simulate("click");
      const textFieldTopic = exampleBlockA
        .find({
          "data-test-id": "textFieldTopic",
        });

        textFieldTopic.props().handleInputChange({target:{value:"value"}});
        const liveFeedItemBtn = exampleBlockA
        .find({
          "data-test-id": "liveFeedItemBtn",
        });

        liveFeedItemBtn.props().onEditClick();
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can select the button with with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
