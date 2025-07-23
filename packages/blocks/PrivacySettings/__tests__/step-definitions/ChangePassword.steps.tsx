import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import ChangePassword from "../../src/settingOptions/changePassword"
import * as utils from "../../../../framework/src/Utilities"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import {render, fireEvent} from '@testing-library/react-native';

const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        addListener: {
            focus:jest.fn()
        },
        state: {
        }
    },
    id: "ChangePassword",
    route:{}
  }

const feature = loadFeature('./__tests__/features/ChangePassword-scenario.feature');
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

    test('User navigates to ChangePassword', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:ChangePassword; 

        given('I am a User loading ChangePassword', () => {
            exampleBlockA = shallow(<ChangePassword {...screenProps}/>);
        });

        when('I navigate to the ChangePassword', () => {
             instance = exampleBlockA.instance() as ChangePassword
        });

        then('ChangePassword will load with out errors', () => { 
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'activty');
            buttonComponent.simulate('press');
            expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);  

        });

        then('I can enter old password with out errors', () => {
            let oldPasswordIn = exampleBlockA.findWhere(
                (node) => node.prop('testID') === 'oldPassword');
                oldPasswordIn.simulate("changeText","pihu@56789")
                 oldPasswordIn = exampleBlockA.findWhere(
                    (node) => node.prop('testID') === 'oldPassword');
                expect(oldPasswordIn.prop('value')).toBe('pihu@56789');
        });

        then('I can enter new password with out errors', async () => {
            let newPasswordIn = exampleBlockA.findWhere((node) => node.prop('testID') === 'newPassword');
            newPasswordIn.simulate("changeText","Pihu@123"); 
             newPasswordIn = exampleBlockA.findWhere((node) => node.prop('testID') === 'newPassword');
            expect(newPasswordIn.prop('value')).toBe('Pihu@123');
            const spy2 = jest.spyOn(instance, '_validateNewPassword');
            newPasswordIn.simulate('blur');
            expect(spy2).toHaveBeenCalled();
            spy2.mockRestore();
           
            });

        then('I can enter confirm password with out errors', () => {
             let newPassword2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'newPassword2');
             newPassword2.simulate("changeText","Pihu@123");
              newPassword2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'newPassword2');
             expect(newPassword2.prop('value')).toBe('Pihu@123');
              const spy2 = jest.spyOn(instance, '_validateConfirmPassword');
               newPassword2.simulate('blur');
               expect(spy2).toHaveBeenCalled();
               spy2.mockRestore();
            
               const responseJson={
                message:"please check your current password"
             }
             const changePasswordRestAPI = new Message(
                 getName(MessageEnum.RestAPIResponceMessage)
               );
               changePasswordRestAPI.addData(
             getName(MessageEnum.RestAPIResponceDataMessage),
             changePasswordRestAPI.messageId
           );
           changePasswordRestAPI.addData(
             getName(MessageEnum.RestAPIResponceSuccessMessage),
             responseJson
           );
           instance.changePasswordAPICallId= changePasswordRestAPI.messageId;
           runEngine.sendMessage("Unit Test", changePasswordRestAPI);  
           expect(responseJson.message).toEqual("please check your current password"); 
        });

        then('I can select the button with with out errors', () => {
            //oldPasswordIn.simulate('changeText',"1234");
         let uploadBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'upload');
            uploadBtn.simulate('press'); 
            const responseJson={
                message:"password updated successfully"
             }
             const changePasswordRestAPI = new Message(
                 getName(MessageEnum.RestAPIResponceMessage)
               );
               changePasswordRestAPI.addData(
             getName(MessageEnum.RestAPIResponceDataMessage),
             changePasswordRestAPI.messageId
           );
           changePasswordRestAPI.addData(
             getName(MessageEnum.RestAPIResponceSuccessMessage),
             responseJson
           );
           instance.changePasswordAPICallId= changePasswordRestAPI.messageId;
           runEngine.sendMessage("Unit Test", changePasswordRestAPI);  
           expect(responseJson.message).toEqual("password updated successfully"); // Check if tag_list is an empty array
        });
 
        then('I can leave the screen with out errors', () => {
            const responseJson={
                message:"message"
             }
             const changePasswordRestAPI = new Message(
                 getName(MessageEnum.RestAPIResponceMessage)
               );
               changePasswordRestAPI.addData(
             getName(MessageEnum.RestAPIResponceDataMessage),
             changePasswordRestAPI.messageId
           );
           changePasswordRestAPI.addData(
             getName(MessageEnum.RestAPIResponceSuccessMessage),
             responseJson
           );
           instance.changePasswordAPICallId= changePasswordRestAPI.messageId;
           runEngine.sendMessage("Unit Test", changePasswordRestAPI);  
           expect(responseJson.message).toEqual("message"); 
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
