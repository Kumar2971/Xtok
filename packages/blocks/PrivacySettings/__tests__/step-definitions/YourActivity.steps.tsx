import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as utils from "../../../../framework/src/Utilities"
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import YourActivity from "../../src/settingOptions/YourActivity"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        },
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
            return {
               remove: jest.fn(),
               willFocus: jest.fn()
            }
          }),
    },
    id: "YourActivity",
    route:{}
  }

const feature = loadFeature('./__tests__/features/YourActicity-scenario.feature');
const mockgetStorageData = jest.spyOn(utils, "getStorageData")
defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        mockgetStorageData.mockImplementation(() => {
            return Promise.resolve("ar")
        })
    });

    test('User navigates to YourActivity', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:YourActivity; 

        given('I am a User loading YourActivity', () => {
            exampleBlockA = shallow(<YourActivity {...screenProps}/>);
        });

        when('I navigate to the YourActivity', () => {
             instance = exampleBlockA.instance() as YourActivity
        });

        then('YourActivity will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
            const responseJson1=
            {average_time_spent: "10"
            }
              const getAverageTimeSpentMessage = new Message(
                  getName(MessageEnum.RestAPIResponceMessage)
              );
              getAverageTimeSpentMessage.addData(
                  getName(MessageEnum.RestAPIResponceDataMessage),
                  getAverageTimeSpentMessage.messageId
              );
              getAverageTimeSpentMessage.addData(
                  getName(MessageEnum.RestAPIResponceSuccessMessage),
                  responseJson1
              );
              instance.getAverageTimeSpentId = getAverageTimeSpentMessage.messageId;
              runEngine.sendMessage("Unit Test", getAverageTimeSpentMessage);
             expect(responseJson1.average_time_spent).toBe("10")
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'manageAcc');
            textInputComponent.simulate('press');
            let savedBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'savedBtn');
            savedBtn.simulate('press');
            let notIntrested = exampleBlockA.findWhere((node) => node.prop('testID') === 'notIntrested');
            notIntrested.simulate('press');
            let commentBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'commentBtn');
            commentBtn.simulate('press');
            let likeBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'likeBtn');
            likeBtn.simulate('press');
        });

        then('I can press comment button with out errors', () => {
            let commentBtnToPress = exampleBlockA.findWhere((node) => node.prop('testID') === 'commentBtn');
            commentBtnToPress.simulate('press');
            let likeBtnToPress = exampleBlockA.findWhere((node) => node.prop('testID') === 'likeBtn');
            likeBtnToPress.simulate('press');
        });

          then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
