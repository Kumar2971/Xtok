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
import Posts from "../../src/feed/Posts";

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
  id: "Posts",
  route: {
    params:
    {
     updateData:{
      id: "1",
      name:"abc",
      visibility_setting:"Public",
      audience_setting:"No restrictions to viewers",
      comment_setting:"Allow all comments",
      post_medias:{thumnails:["1.png"]},
      location:"location"
    },
    setcomments:"comments"
}}

};
const mockgetStorageData = jest.spyOn(utils, "getStorageData")
const mockFetch = jest.fn();

const feature = loadFeature("./__tests__/features/Posts-scenario.feature");

const MOCK_RESULT_SUCCESS_posts = [
    {
      "id": "812",
      "type": "post",
      "attributes": {
        "id": 812,
        "name": "@Lily ",
        "description": "",
        "body": "@Lily ",
        "location": null,
        "latitude": "0",
        "longitude": "0",
        "is_like_by_current_user": false,
        "account_id": 789,
        "created_at": "2023-08-09T06:00:41.850Z",
        "updated_at": "2023-08-09T06:00:41.850Z",
        "tag_list": [],
        "save_post_as": "create_post",
        "visibility_setting": "Public",
        "comment_setting": "Allow all Comments",
        "audience_setting": "No restrictions to viewers",
        "post_medias": {
          "images": [],
          "videos": [
            {
              "id": 768,
              "media_url": "http://minio-ext.b255799.stage.eastus.az.svc.builder.ai/sbucket/jflsefn2yxpnb253stp57k7yj5x8",
              "media_type": "Video",
              "audio_url": "",
              "post_id": 812,
              "created_at": "2023-08-09T06:00:41.865Z",
              "updated_at": "2023-08-09T06:00:42.380Z",
              "video_thumnail": "http://minio-ext.b255799.stage.eastus.az.svc.builder.ai/sbucket/h9h2b6157fqvgvvt5qn4a1o5giaw"
            }
          ],
          "thumnails": [
            "http://minio-ext.b255799.stage.eastus.az.svc.builder.ai/sbucket/h9h2b6157fqvgvvt5qn4a1o5giaw"
          ]
        },
        "post_likes_count": 0,
        "post_comment_count": 0,
        "photo": "https://minio.b255799.stage.eastus.az.svc.builder.ai/sbucket/qpp4a5syafbs36foi1yp2berei28",
        "schedule_time": null,
        "video_post_thumbnail": null,
        "taggings": [{ "account_id": 780, "user_name": "Lily" }],
        "notification": null,
        "video_post": null,
        "bookmarked": false,
        "post_views": 0
      }
    }
  ]



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
    jest.mock('react-native', () => ({
      BackHandler: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }
    }));
  });

  test("User navigates to Posts", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Posts;

    given("I am a User loading Posts", () => {
      exampleBlockA = shallow(<Posts {...screenProps} />);
    });

    when("I navigate to the Posts", () => {
      instance = exampleBlockA.instance() as Posts;
    });

    then("Posts will load with out errors", async() => {
      
      await new Promise(resolve => setImmediate(resolve))
      const apiPostItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.apiPostItemCallId = apiPostItemMessage.messageId;
      apiPostItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiPostItemMessage.messageId);
      apiPostItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_posts)
      runEngine.sendMessage("Unit Test", apiPostItemMessage)
      expect(exampleBlockA).toBeTruthy();
    });
    
    then("I can render post list without error", () => {      
      const PostsFlatlist = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "flatlistID"
      );
      PostsFlatlist.props().keyExtractor({}, 3);
      PostsFlatlist.props().renderItem({ item: instance.state.PostData[0], index: 0 })
      const postsRenderitem = PostsFlatlist.renderProp('renderItem')({ item:  instance.state.PostData[0], index: 0 })  
      const clickDetailsPost = postsRenderitem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'clickDetailsPost')      
      clickDetailsPost.simulate("press")
      const clickEditPostBtn = postsRenderitem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'clickEditPost')      
      clickEditPostBtn.simulate("press")
      const clickDeletePostBtn = postsRenderitem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'clickDeletePost')      
      clickDeletePostBtn.simulate("press")
      PostsFlatlist.renderProp("ListEmptyComponent")();
    });
  });
});