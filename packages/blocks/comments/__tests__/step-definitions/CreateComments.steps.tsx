import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import React from "react";
import CreateComment from "../../src/CreateComment";
import * as utils from "../../../../framework/src/Utilities";
import { Keyboard } from "react-native"

const navigation = require("react-navigation")

const screenProps = {
  navigation: {
    goBack: jest.fn(),
    dismiss: jest.fn(),
    navigate: jest.fn(),
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
      return {
        remove: jest.fn(),
        willFocus: jest.fn()
      }
    }),
  },
  id: "CreateComment",
  route:{

  }
}
const mockgetStorageData = jest.spyOn(utils, "getStorageData")

const feature = loadFeature('./__tests__/features/CreateComments-scenario.feature');

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('@react-native-camera-roll/camera-roll', () => ({}));
    jest.useFakeTimers();
    mockgetStorageData.mockImplementation(() => {
      return Promise.resolve("ar")
    })
    jest.spyOn(global, 'setTimeout').mockImplementation((cb: any) => cb());
  });

  test('User navigates to CreateComment with out web', ({ given, when, then }) => {
    let CreateCommentBlock: ShallowWrapper;
    let instance: CreateComment;

    given('I am a User loading CreateComment', () => {
      CreateCommentBlock = shallow(<CreateComment {...screenProps} />)
    });

    when('I navigate to the CreateComment', () => {
      instance = CreateCommentBlock.instance() as CreateComment;
    });

    then('CreateComment will load with out errors', () => {
      expect(CreateCommentBlock).toBeTruthy()
    });

    then('I can add comment with out errors', () => {     
      const hideKeyboardMock = jest.fn(); // Create a mock function
      Keyboard.dismiss = hideKeyboardMock;
      let hideKey = CreateCommentBlock.findWhere(
        (node) => node.prop("testID") === "hideKey"
      );
      hideKey.simulate("press") 
      expect(hideKeyboardMock).toBeCalled();

      let textInputId = CreateCommentBlock.findWhere(
        (node) => node.prop("testID") === "textInputId"
      );
      textInputId.simulate("changeText", "reply");
    })

    then('I can leave the screen with out errors', () => {
      let createBtn = CreateCommentBlock.findWhere(
        (node) => node.prop("testID") === "createBtn"
        );
        createBtn.simulate("press")
        const mockHandlecreateComment = jest.fn(); 
        instance.createComment = mockHandlecreateComment; 
        createBtn.simulate("press");
        expect(mockHandlecreateComment).toHaveBeenCalled();
    });
  });


  test('User navigates to CreateComment with web', ({ given, when, then }) => {
    let CreateCommentBlock: ShallowWrapper;
    let instance: CreateComment;

    given('I am a User loading CreateComment', () => {
      CreateCommentBlock = shallow(<CreateComment {...screenProps} />)
    });

    when('I navigate to the CreateComment', () => {
      instance = CreateCommentBlock.instance() as CreateComment;
    });

    then('CreateComment will load with out errors', () => {
      expect(CreateCommentBlock).toBeTruthy()
    });

    then('I can add comment with out errors', () => {       
      let textInputId = CreateCommentBlock.findWhere(
        (node) => node.prop("testID") === "textInputId"
      );
      textInputId.simulate("changeText", "reply");
    })
    then('I can leave the screen with out errors', () => {
      let createBtn = CreateCommentBlock.findWhere(
        (node) => node.prop("testID") === "createBtn"
        );
        createBtn.simulate("press")
        const mockHandlecreateComment = jest.fn(); 
        instance.createComment = mockHandlecreateComment; 
        createBtn.simulate("press");
        expect(mockHandlecreateComment).toHaveBeenCalled();
    });
  });
});
