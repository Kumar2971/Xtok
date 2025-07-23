import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import UserStatus from "../../src/UserStatus"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "UserStatus"
  }

const feature = loadFeature('./__tests__/features/UserStatus-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to UserStatus', ({ given, when, then }) => {
        let userStatusBlock:ShallowWrapper;
        let instance:UserStatus; 

        given('I am a User loading UserStatus', () => {
            userStatusBlock = shallow(<UserStatus {...screenProps}/>)
        });

        when('I navigate to the UserStatus', () => {
             instance = userStatusBlock.instance() as UserStatus
        });

        then('UserStatus will load with out errors', () => {
            let toucWithoutFeedbackBtn = userStatusBlock.findWhere((node) => node.prop('testID') === 'toucWithoutFeedback');
            toucWithoutFeedbackBtn.simulate('press');
       
            const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenMsg);
      
            let data = {
                "data": {
                    "account_status": [
                        {
                            "account_id": 1,
                            "status": "online"
                        },
                        {
                            "account_id": 2,
                            "status": "offline"
                        }
                    ]
                }
            }
      
            const generateQrCodeAPI = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
      
            generateQrCodeAPI.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              generateQrCodeAPI.messageId
            );
         
            generateQrCodeAPI.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {data}
            );
         
            instance.getUserStatusCallId = generateQrCodeAPI.messageId;
            runEngine.sendMessage("Unit Test", generateQrCodeAPI);
      
            expect(userStatusBlock).toBeTruthy()
            
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(userStatusBlock).toBeTruthy()
        });
    });


});
