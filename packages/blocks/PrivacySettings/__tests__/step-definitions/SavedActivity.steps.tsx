import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as utils from "../../../../framework/src/Utilities"
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import SavedActivity from "../../src/settingOptions/SavedActivity"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Text } from 'react-native';
const navigation = require("react-navigation")

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    state: {
    },
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
  },
  id: "SavedActivity",
  route: {}
}

const feature = loadFeature('./__tests__/features/SavedActivity-scenario.feature');
const mockgetStorageData = jest.spyOn(utils, "getStorageData")
defineFeature(feature, (test) => {


  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    mockgetStorageData.mockImplementation(() => {
      return Promise.resolve("ar")
    })
  });

  test('User navigates to SavedActivity', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: SavedActivity;

    given('I am a User loading SavedActivity', () => {
      exampleBlockA = shallow(<SavedActivity {...screenProps} />);
    });

    when('I navigate to the SavedActivity', () => {
      instance = exampleBlockA.instance() as SavedActivity
    });

    then('SavedActivity will load with out errors', () => {
      const responseJson = {
        data: [{
          attributes: {
            "account_id": 349,
            "audience_setting": "No restrictions to viewers",
            "body": "@SujitS1 keyboard views",
            "bookmarked": true,
            "comment_setting": "Allow all Comments",
            "created_at": "2023-06-08T09:50:28.321Z",
            "description": "",
            "id": 433,
            "is_like_by_current_user": true,
            "latitude": null,
            "location": null,
            "longitude": null,
            "name": "@SujitS1 keyboard views",
            "notification": null,
            "photo": "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/lg42d4mr9se8tm8rvcwauelvx9t9",
            "post_comment_count": 8,
            "post_likes_count": 10,
            "post_medias": [
              Object
            ],
            "post_views": 0,
            "save_post_as": "create_post",
            "schedule_time": null,
            "tag_list": [
              Array
            ],
            "taggings": [
              Array
            ],
            "updated_at": "2023-06-08T09:50:28.321Z",
            "video_post": null,
            "video_post_thumbnail": null,
            "visibility_setting": "Public"
          },
          "id": "433", "type": "post"
        }],
        "meta": {
          "pagination": { "current_page": 1, "next_page": null, "prev_page": null, "total_count": 1, "total_pages": 1 }
        }
      }
     const getSavedPostsCall = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getSavedPostsCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getSavedPostsCall.messageId
      );
      getSavedPostsCall.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responseJson
      );
      instance.getSavedPostsCallId = getSavedPostsCall.messageId;
      runEngine.sendMessage("Unit Test", getSavedPostsCall);
       expect(responseJson.data[0].attributes.account_id).toEqual(349) 
    });

    then("should render FlatList correctly when savedActivityPosts has items", async () => {
      const flatList = exampleBlockA.findWhere(node => node.prop('testID') === 'flatListId');
      const flatdata = flatList.renderProp('renderItem')({ item: instance.state.savedActivityPosts[0], index: 0 })
      const selectBtn = flatdata.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'onPressrenderItem')
      selectBtn.simulate('press');
      expect(screenProps.navigation.navigate("Comments", { type:'SavedActivity',account_id: 349,post_id:1}))

    })


    then('I can select the button with with out errors', () => {
      let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'activty');
      buttonComponent.simulate('press');
      expect(screenProps.navigation.navigate("YourActivity"))
      const newestComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'newest');
      const textElement = newestComponent.find(Text);
      expect(textElement.children().text()).toBe('Oldest');
      newestComponent.simulate('press');
      const newestComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'newest');
      const textElement2 = newestComponent2.find(Text);
      expect(textElement2.children().text()).toBe('Newest');
      newestComponent2.simulate('press');
      const newestComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'newest');
      const textElement3 = newestComponent3.find(Text);
      expect(textElement3.children().text()).toBe('Oldest');

    });


    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(exampleBlockA).toBeTruthy();
    });
  });

  test('User navigates to SavedActivity screen', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: SavedActivity;

    given('I am a User loading SavedActivity', () => {
      exampleBlockA = shallow(<SavedActivity {...screenProps} />);
    });

    when('I navigate to the SavedActivity', () => {
      instance = exampleBlockA.instance() as SavedActivity
    });

    then('SavedActivity will load with out errors', () => {
      const responseJson = {
        data: []

      }
      const getSavedPostsCall = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getSavedPostsCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getSavedPostsCall.messageId
      );
      getSavedPostsCall.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responseJson
      );
      instance.getSavedPostsCallId = getSavedPostsCall.messageId;
      runEngine.sendMessage("Unit Test", getSavedPostsCall);
        expect(responseJson.data).toEqual([]) 
    });


    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(exampleBlockA).toBeTruthy();
    });
  });

});
