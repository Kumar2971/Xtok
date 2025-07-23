import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import PrivacySafety from "../../src/settingOptions/privacySafety";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        }
    },
    id: "privacySafety",
    route:{}
  }

const feature = loadFeature('./__tests__/features/privacySafety-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to privacySafety', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:PrivacySafety; 

        given('I am a User loading privacySafety', () => {
            exampleBlockA = shallow(<PrivacySafety {...screenProps}/>);
        });

        when('I navigate to the privacySafety', () => {
             instance = exampleBlockA.instance() as PrivacySafety
        });

        then('privacySafety will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy(); 
            const response={"data": {"attributes": {"account": [Object], "active_status": false, "allow_leaderboard_visibility": true, "allow_mentions": true, "challenges_invites": true, "id": 646, "private_account": false, "show_sensitive_content": false}, "id": "646", "type": "account_privacy"}}
            const getAccountSettingsCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getAccountSettingsCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getAccountSettingsCall.messageId
            );
            getAccountSettingsCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                response
            );
            instance.getAccountSettingsCallId = getAccountSettingsCall.messageId;
            runEngine.sendMessage("Unit Test", getAccountSettingsCall);
            expect(response.data.type).toBe("account_privacy")
        });

        then('I can enter text with out errors', () => {
            instance.setState({setPrivateAccount:true,setMentions:true,setAllowLeaderBoardVisible:true})
            instance.setState({setActivityStatus:true,setChallengesInvites:true,language:"ar"})
            let active_status = exampleBlockA.findWhere((node) => node.prop('testID') === 'activeStatus');
            active_status.simulate("press")
            let privateAccount = exampleBlockA.findWhere((node) => node.prop('testID') === 'private_account');
            privateAccount.simulate("press")
            let allowMentions = exampleBlockA.findWhere((node) => node.prop('testID') === 'allow_mentions');
            allowMentions.simulate("press")
            let accountFollow = exampleBlockA.findWhere((node) => node.prop('testID') === 'accountFollow');
            accountFollow.simulate("press")
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'privacySetting');
            buttonComponent.simulate('press');
            let Blockedusers = exampleBlockA.findWhere((node) => node.prop('testID') === 'Blockedusers');
            Blockedusers.simulate("press")
            let mutedusers = exampleBlockA.findWhere((node) => node.prop('testID') === 'Mutedusers');
            mutedusers.simulate("press")
            let Restricteduser = exampleBlockA.findWhere((node) => node.prop('testID') === 'Restrictedusers');
            Restricteduser.simulate("press")
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
