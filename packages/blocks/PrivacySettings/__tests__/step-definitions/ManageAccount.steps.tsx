import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import * as utils from "../../../../framework/src/Utilities"
import React from "react";
import ManageAccount from "../../src/settingOptions/manageAccount"
import { runEngine } from "../../../../framework/src/RunEngine";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";

const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        }
    },
    id: "ManageAccount",
    route:{}
  }

const feature = loadFeature('./__tests__/features/ManageAccount-scenario.feature');
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

    test('User navigates to ManageAccount', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:ManageAccount; 

        given('I am a User loading ManageAccount', () => {
            exampleBlockA = shallow(<ManageAccount {...screenProps}/>);
        });

        when('I navigate to the ManageAccount', () => {
             instance = exampleBlockA.instance() as ManageAccount
        });

        then('ManageAccount will load with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'goPrivacy');
         buttonComponent.simulate('press');
         expect(screenProps.navigation.navigate('PrivacySettings'))
         const responseJson1=
         {message: ""
         }
           const deleteUserAPICall1 = new Message(
               getName(MessageEnum.RestAPIResponceMessage)
           );
           deleteUserAPICall1.addData(
               getName(MessageEnum.RestAPIResponceDataMessage),
               deleteUserAPICall1.messageId
           );
           deleteUserAPICall1.addData(
               getName(MessageEnum.RestAPIResponceSuccessMessage),
               responseJson1
           );
           instance.deleteUserAPICallId = deleteUserAPICall1.messageId;
           runEngine.sendMessage("Unit Test", deleteUserAPICall1);
          expect(responseJson1.message).toBe("")

         const responseJson=
           {message: "user deleted"
           }
             const deleteUserAPICall = new Message(
                 getName(MessageEnum.RestAPIResponceMessage)
             );
             deleteUserAPICall.addData(
                 getName(MessageEnum.RestAPIResponceDataMessage),
                 deleteUserAPICall.messageId
             );
             deleteUserAPICall.addData(
                 getName(MessageEnum.RestAPIResponceSuccessMessage),
                 responseJson
             );
             instance.deleteUserAPICallId = deleteUserAPICall.messageId;
             runEngine.sendMessage("Unit Test", deleteUserAPICall);
            expect(responseJson.message).toBe("user deleted")

            const spy = jest.spyOn(instance, 'deleteUser');
            let yesBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'yesBtn');
            yesBtn.simulate('press'); 
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();  
          });

        then('user can navigate to PersonalInformation', () => {
            let goInfoBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'itemOnPress');
            goInfoBtn.simulate('press');
        }); 

        then('user can navigate to ChangePassword', () => {
            let changePassBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'changePass');
            changePassBtn.simulate('press');
        });

        then('user can navigate to BreakReminder', () => {
            let reminderBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'reminder');
            reminderBtn.simulate('press');
        });
        
        then('user can navigate to bedTimeReminder', () => {
            let bedTimeReminderBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'bedTimeReminder');
            bedTimeReminderBtn.simulate('press');
        });
        then('user can add or Switch Account', () => {
            let goInfoBtn2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'itemOnPress2');
            goInfoBtn2.simulate('press');
        });

        then('user can log out', () => {
            let goInfoBtn3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'itemOnPress3');
            goInfoBtn3.simulate('press');
            let goInfoBtn5 = exampleBlockA.findWhere((node) => node.prop('testID') === 'cancelBtn');
            goInfoBtn5.simulate('press');
            let yourActivity = exampleBlockA.findWhere((node) => node.prop('testID') === 'yourActivity');
            yourActivity.simulate('press');
        });

        then('user can logout All Accounts', () => {
            let goInfoBtn4 = exampleBlockA.findWhere((node) => node.prop('testID') === 'itemOnPress4');
             goInfoBtn4.simulate('press');
        });

        then('user can delete Account', () => {
         let visibleMdBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'visibleMd');
            visibleMdBtn.simulate('press');
        });
      

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
