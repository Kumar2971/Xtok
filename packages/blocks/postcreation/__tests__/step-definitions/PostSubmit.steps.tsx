import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import * as utils from "../../../../framework/src/Utilities";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import PostSubmit from "../../src/feed/Postsubmit";

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
  id: "PostSubmit",
  route: {
    params: {
      setcomments: "0",
      setvisibility: "setvisibility",
      selestaudience: "selestaudience",
      setSchedule: "setSchedule",
      location: "location",
      latLong: "1123 2222",
      rawDate: "2021-01-28T09:29:00.732Z",
      isDraft: true,
      updateData: {
        id: "1",
        name: "abc",
        visibility_setting: "Public",
        audience_setting: "No restrictions to viewers",
        comment_setting: "Allow all comments",
        post_medias: { thumnails: ["1.png"] },
        location: "location",
      },
    },
  },
};
const screenProps2 = {
  navigation: {
    state: { params: {} },
    goBack: jest.fn(),
    navigate: jest.fn(),
    addListener: jest.fn().mockImplementation((_, callback) => {
      callback();
    }),
  },
  id: "PostSubmit",
  route: {
    params: {
      setcomments: 2,
      updateData: {
        id: "2",
        name: "abc",
        visibility_setting: "Private",
        audience_setting: "audience_setting",
        comment_setting: "Hold potentially inappropriate comments for review",
        post_medias: { thumnails: ["1.png"] },
        location: "location",
      },
    },
  },
};
const screenProps3 = {
  navigation: {
    state: { params: {} },
    goBack: jest.fn(),
    navigate: jest.fn(),
    addListener: jest.fn().mockImplementation((_, callback) => {
      callback();
    }),
  },
  id: "PostSubmit",
  route: {
    params: {
      setvisibility: 1,
      selestaudience: 1,
      setSchedule: "",
      location: "location",
      latLong: "1123 2222",
      rawDate: null,
      updateData: {
        id: "3",
        name: "abc",
        visibility_setting: "Unlisted",
        audience_setting: "audience_setting",
        comment_setting: "Hold all comments for review",
        post_medias: { thumnails: ["1.png"] },
        location: "location",
      },
    },
  },
};

const MOCK_RESULT_SUCCESS_hastag = {
  post: {
    data: [
      {
        id: "22",
        type: "tag",
        attributes: {
          id: 22,
          name: "nature",
          post_count: 1,
          created_at: "2023-07-24T09:34:20.899Z",
          updated_at: "2023-07-24T09:34:20.899Z",
        },
      },
    ],
    meta: {
      pagination: {
        prev_page: null,
        current_page: 1,
        next_page: null,
        total_pages: 1,
        total_count: 1,
      },
    },
  },
};

const MOCK_RESULT_SUCCESS_SearchAccount = {
  account: [
    {
      id: 400,
      full_name: "user1",
      first_name: null,
      last_name: null,
      user_name: "username1",
      type: null,
      unique_auth_id: "ziNltpjPrldT1Xtc5GZwlQtt",
      bio: null,
      photo: null,
      account_follow_status: "Follow",
      account_status: "Public",
    },
    {
      id: 401,
      full_name: "user2",
      first_name: null,
      last_name: null,
      user_name: "username2",
      type: null,
      unique_auth_id: "qx7zHaPuTP8pNhB6r5cluQtt",
      bio: null,
      photo: null,
      account_follow_status: "Follow",
      account_status: "Public",
    },
  ],
  meta: {
    pagination: {
      prev_page: null,
      current_page: 1,
      next_page: 2,
      total_pages: 27,
      total_count: 5,
    },
  },
};

const mockgetStorageData = jest.spyOn(utils, "getStorageData");
const mockFetch = jest.fn();

const feature = loadFeature("./__tests__/features/PostSubmit-scenario.feature");

const MOCK_RESULT_SUCCESS_configuration = {
  visbility_settings: { Public: "Public" },
};
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    mockgetStorageData.mockImplementation((key) => {
      if (key === "SelectedLng") {
        return Promise.resolve("ar");
      } else {
        return Promise.resolve(
          "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzM1LCJleHAiOjE3MTEzNjgyNjAsInRva2VuX3R5cGUiOiJsb2dpbiJ9.uXjfo-YVv--feUJLxCTGS0BtHBmzpHVOMR2QDrtCAwneY8lB0Lxk4ekznPXCchVLjVpEhUG6JmHsORkffwyqYg"
        );
      }
    });
    jest.mock("react-native", () => ({
      BackHandler: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    }));
    global.fetch = mockFetch;
    jest.useFakeTimers();
  });

  test("User navigates to PostSubmit", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: PostSubmit;

    given("I am a User loading PostSubmit", () => {
      exampleBlockA = shallow(<PostSubmit {...screenProps} />);
    });

    when("I navigate to the PostSubmit", () => {
      instance = exampleBlockA.instance() as PostSubmit;
    });

    then("PostSubmit will load with out errors", async () => {
      await new Promise((resolve) => setImmediate(resolve));
      instance.componentWillUnmount();

      const configurationMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.configurationApcallID = configurationMessage.messageId;
      configurationMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        configurationMessage.messageId
      );
      configurationMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        MOCK_RESULT_SUCCESS_configuration
      );
      runEngine.sendMessage("Unit Test", configurationMessage);
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can select back button with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "goBack"
      );
      buttonComponent.simulate("press");
    });

    then("I can add discription with errors", () => {
      let textInputID = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "textInputID"
      );
      textInputID.simulate("changeText", "user");
    });

    then("I can add discription with out errors", () => {
      let textInputID = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "textInputID"
      );
      textInputID.simulate("changeText", "reply");
      textInputID.simulate("changeText", "re");
      textInputID.simulate("changeText", "anytext@");
      textInputID.simulate("changeText", "an@");
      textInputID.simulate("changeText", "anytext#");
      textInputID.simulate("changeText", "an#");
      textInputID.simulate("changeText", "#nature");
      textInputID.simulate("changeText", "#na");
      textInputID.simulate("changeText", "@nature");
      textInputID.simulate("changeText", "@na");

      const apiSearchTagsMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.apiSearchTags = apiSearchTagsMessage.messageId;
      apiSearchTagsMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiSearchTagsMessage.messageId
      );
      apiSearchTagsMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        MOCK_RESULT_SUCCESS_hastag
      );
      runEngine.sendMessage("Unit Test", apiSearchTagsMessage);
      textInputID.simulate("changeText", "#nature");
      const tagsSuggetionListFlatlist = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "tagsSuggetionList"
      );
      tagsSuggetionListFlatlist.props().keyExtractor({}, 3);
      const tagsSuggetionListFlatlistItem =
        tagsSuggetionListFlatlist.renderProp("renderItem")({
          item: instance.state.tagsSuggetionList[0],
          index: 0,
        });

      const tagBtn = tagsSuggetionListFlatlistItem.findWhere(
        (node) => node.prop("testID") === "tagBtn"
      );
      tagBtn.simulate("press");
      expect(instance.state.isShowTagsList).toBe(false);

      const apiSearchAccountMessage1 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.apiSearchAccount = apiSearchAccountMessage1.messageId;
      apiSearchAccountMessage1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiSearchAccountMessage1.messageId
      );
      apiSearchAccountMessage1.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { account: [] }
      );
      runEngine.sendMessage("Unit Test", apiSearchAccountMessage1);

      const apiSearchTagsMessage1 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.apiSearchTags = apiSearchTagsMessage1.messageId;
      apiSearchTagsMessage1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiSearchTagsMessage1.messageId
      );
      apiSearchTagsMessage1.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          post: {
            data: [],
          },
        }
      );
      runEngine.sendMessage("Unit Test", apiSearchTagsMessage1);

      const apiSearchAccountMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.apiSearchAccount = apiSearchAccountMessage.messageId;
      apiSearchAccountMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiSearchAccountMessage.messageId
      );
      apiSearchAccountMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        MOCK_RESULT_SUCCESS_SearchAccount
      );
      runEngine.sendMessage("Unit Test", apiSearchAccountMessage);

      let commentInputID1 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "textInputID"
      );
      commentInputID1.simulate("changeText", "@user");
      commentInputID1.simulate("changeText", "@nature\n@user");

      const userTagFlatlist = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "accountSuggetionList"
      );
      userTagFlatlist.props().keyExtractor({}, 3);
      const userTagFlatlistItem = userTagFlatlist.renderProp("renderItem")({
        item: instance.state.accountSuggetionList[0],
        index: 0,
      });
      const userNameBtn = userTagFlatlistItem.findWhere(
        (node) => node.prop("testID") === "accountBtn"
      );
      userNameBtn.simulate("press");
      expect(instance.state.isShowUserList).toBe(false);

      let commentInputID = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "textInputID"
      );
      const apiSearchTagsMessage2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.apiSearchTags = apiSearchTagsMessage2.messageId;
      apiSearchTagsMessage2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiSearchTagsMessage2.messageId
      );
      apiSearchTagsMessage2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        MOCK_RESULT_SUCCESS_hastag
      );
      runEngine.sendMessage("Unit Test", apiSearchTagsMessage2);

      commentInputID.simulate("changeText", "#computer");
      const tagsSuggetionListFlatlist1 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "tagsSuggetionList"
      );
      tagsSuggetionListFlatlist1.props().keyExtractor({}, 3);
      const tagsSuggetionListFlatlistItem1 =
        tagsSuggetionListFlatlist1.renderProp("renderItem")({
          item: instance.state.tagsSuggetionList[0],
          index: 0,
        });

      const tagBtn1 = tagsSuggetionListFlatlistItem1.findWhere(
        (node) => node.prop("testID") === "tagBtn"
      );
      tagBtn1.simulate("press");

      expect(instance.state.isShowTagsList).toBe(false);

      textInputID.simulate("changeText", "");
    });

    then("I can select buttons with out errors", () => {
      let setvisibilityBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "setvisibilityBtn"
      );
      setvisibilityBtn.simulate("press");

      let selectAudienceBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "selectAudienceBtn"
      );
      selectAudienceBtn.simulate("press");

      let ScheduleBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "ScheduleBtn"
      );
      ScheduleBtn.simulate("press");

      let commentBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "commentBtn"
      );
      commentBtn.simulate("press");

      let locationBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "locationBtn"
      );
      locationBtn.simulate("press");
    });

    then("I can select upload button with out errors", () => {
      let uploadBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "upload"
      );
      uploadBtn.simulate("press");
    });
  });

  test("User navigates to PostSubmit with selection 0", ({
    given,
    when,
    then,
  }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: PostSubmit;

    given("I am a User loading PostSubmit", () => {
      exampleBlockA = shallow(<PostSubmit {...screenProps2} />);
    });

    when("I navigate to the PostSubmit", () => {
      instance = exampleBlockA.instance() as PostSubmit;
    });

    then("PostSubmit will load with out errors", async () => {
      await new Promise((resolve) => setImmediate(resolve));
      instance.componentWillUnmount();
      const configurationMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.configurationApcallID = configurationMessage.messageId;
      configurationMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        configurationMessage.messageId
      );
      configurationMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        MOCK_RESULT_SUCCESS_configuration
      );
      runEngine.sendMessage("Unit Test", configurationMessage);
      expect(exampleBlockA).toBeTruthy();
    });
    then("I can select back button with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "goBack"
      );
      buttonComponent.simulate("press");

      let setvisibilityBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "setvisibilityBtn"
      );
      setvisibilityBtn.simulate("press");

      let selectAudienceBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "selectAudienceBtn"
      );
      selectAudienceBtn.simulate("press");

      let ScheduleBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "ScheduleBtn"
      );
      ScheduleBtn.simulate("press");

      let commentBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "commentBtn"
      );
      commentBtn.simulate("press");
      let locationBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "locationBtn"
      );
      locationBtn.simulate("press");

      let saveBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "saveBtn"
      );
      saveBtn.simulate("press");
    });
  });

  test("User navigates to PostSubmit with selection 1", ({
    given,
    when,
    then,
  }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: PostSubmit;

    given("I am a User loading PostSubmit", () => {
      exampleBlockA = shallow(<PostSubmit {...screenProps3} />);
    });

    when("I navigate to the PostSubmit", () => {
      instance = exampleBlockA.instance() as PostSubmit;
    });

    then("PostSubmit will load with out errors", async () => {
      await new Promise((resolve) => setImmediate(resolve));
      instance.componentWillUnmount();
      const configurationMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.configurationApcallID = configurationMessage.messageId;
      configurationMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        configurationMessage.messageId
      );
      configurationMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        MOCK_RESULT_SUCCESS_configuration
      );
      runEngine.sendMessage("Unit Test", configurationMessage);
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
