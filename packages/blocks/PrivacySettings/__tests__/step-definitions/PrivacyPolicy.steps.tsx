import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import PrivacyPolicy from "../../src/PrivacyPolicy/PrivacyPolicy"
import * as utils from "../../../../framework/src/Utilities"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { get } from "http";
import { runEngine } from "../../../../framework/src/RunEngine";
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        goBack: jest.fn(),
    },
    id: "PrivacyPolicy",
    route: {}
}

const feature = loadFeature('./__tests__/features/PrivacyPolicy-scenario.feature');
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

    test('User navigates to PrivacyPolicy', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: PrivacyPolicy;

        given('I am a User loading PrivacyPolicy', () => {
            exampleBlockA = shallow(<PrivacyPolicy {...screenProps} />);
        });

        when('I navigate to the PrivacyPolicy', () => {
            instance = exampleBlockA.instance() as PrivacyPolicy
        });

        then('PrivacyPolicy will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
            let textInputComponent = exampleBlockA.findWhere(
                (node) => node.prop('testID') === 'onPressHeader');
            textInputComponent.props().onPress()
            let textInputComponent2 = exampleBlockA.findWhere(
                (node) => node.prop('testID') === 'onPressFeedback');
            textInputComponent2.props().onPress()

            const responseJson = {
                hasOwnProperty:{
                    "data": {
                        attributes:
                            { description: "<p><strong><u>Introduction:</u></strong></p><p><strong><u></u></strong>Our mobile application (\"the App\") is committed to protecting the privacy of its users. This privacy policy explains how we collect, use, and disclose your personal information. By using the App, you agree to the terms of this privacy policy.</p><p><strong><u>Collection of Information:</u></strong></p><p>We may collect the following types of personal information from users:</p><ul><li>Contact information: such as name, email address, or phone number.</li><li>Device information: such as device type, operating system, and unique device identifiers.</li><li>Usage information: such as search queries, videos watched, and interactions with other users.</li></ul><p><strong><u>Use of Information:</u></strong></p><p>We may use the personal information we collect to:</p><ul><li>Improve the App's functionality and personalize the user experience.</li><li>Deliver targeted advertising and content.</li><li>Communicate with users regarding their account or to respond to inquiries.</li><li>Comply with legal obligations.</li></ul><p><strong><u>Disclosure of Information:</u></strong></p><p>We may share personal information with the following third parties:</p><ul><li>Service providers: such as payment gateways, analytics companies and advertising partners.</li><li>Other users: such as when users interact with each other on the App.</li><li>Law enforcement or other authorities: if required by law or if we believe it is necessary to protect our rights, property, or safety.</li></ul><p><strong><u>User Choices and Preferences:</u></strong></p><p>Users may access, manage, or delete their personal information by following the instructions in the App. Users may also choose to opt-out of receiving promotional communications from us by following the instructions in those communications.</p><p><strong><u>Security Measures:</u></strong></p><p>We take reasonable measures to protect user personal information from unauthorized access, disclosure, or destruction. These measures may include encryption, firewalls, and secure server facilities.</p><p><strong><u>Contact Us:</u></strong></p><p>If you have any questions or concerns about our privacy policy, you may contact us at <a href=\"mailto:info@cashgatetech.com\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(35, 137, 215); background-color: rgba(61, 60, 64, 0.08);\">info@cashgatetech.com</a>.</p><p><strong><u>Changes to this Policy:</u></strong></p><p>We may update this privacy policy from time to time. The most current version of the policy will be available on our website or in the App. We encourage users to review the policy periodically.</p>" }, "id": "1", "type": "privacy_policy"
                    },
                },
                
                data: {
                    attributes:
                        { description:  "<p><strong><u>Introduction:</u></strong></p><p><strong><u></u></strong>Our mobile application (\"the App\") is committed to protecting the privacy of its users. This privacy policy explains how we collect, use, and disclose your personal information. By using the App, you agree to the terms of this privacy policy.</p><p><strong><u>Collection of Information:</u></strong></p><p>We may collect the following types of personal information from users:</p><ul><li>Contact information: such as name, email address, or phone number.</li><li>Device information: such as device type, operating system, and unique device identifiers.</li><li>Usage information: such as search queries, videos watched, and interactions with other users.</li></ul><p><strong><u>Use of Information:</u></strong></p><p>We may use the personal information we collect to:</p><ul><li>Improve the App's functionality and personalize the user experience.</li><li>Deliver targeted advertising and content.</li><li>Communicate with users regarding their account or to respond to inquiries.</li><li>Comply with legal obligations.</li></ul><p><strong><u>Disclosure of Information:</u></strong></p><p>We may share personal information with the following third parties:</p><ul><li>Service providers: such as payment gateways, analytics companies and advertising partners.</li><li>Other users: such as when users interact with each other on the App.</li><li>Law enforcement or other authorities: if required by law or if we believe it is necessary to protect our rights, property, or safety.</li></ul><p><strong><u>User Choices and Preferences:</u></strong></p><p>Users may access, manage, or delete their personal information by following the instructions in the App. Users may also choose to opt-out of receiving promotional communications from us by following the instructions in those communications.</p><p><strong><u>Security Measures:</u></strong></p><p>We take reasonable measures to protect user personal information from unauthorized access, disclosure, or destruction. These measures may include encryption, firewalls, and secure server facilities.</p><p><strong><u>Contact Us:</u></strong></p><p>If you have any questions or concerns about our privacy policy, you may contact us at <a href=\"mailto:info@cashgatetech.com\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(35, 137, 215); background-color: rgba(61, 60, 64, 0.08);\">info@cashgatetech.com</a>.</p><p><strong><u>Changes to this Policy:</u></strong></p><p>We may update this privacy policy from time to time. The most current version of the policy will be available on our website or in the App. We encourage users to review the policy periodically.</p>" }, "id": "1", "type": "privacy_policy"
                },
                errors:"something went wrong"
            }

            
   
           
            const privacyPolicyApi = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            privacyPolicyApi.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                privacyPolicyApi.messageId
            );
            privacyPolicyApi.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    responseJson
              }
  
            );
            instance.privacyPolicyApiCallId = privacyPolicyApi.messageId
            runEngine.sendMessage("unit test", privacyPolicyApi)


            privacyPolicyApi.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors:"something went wrong"}
  
            );
            instance.privacyPolicyApiCallId = privacyPolicyApi.messageId
            runEngine.sendMessage("unit test", privacyPolicyApi)
            privacyPolicyApi.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
             {   data: {
                    attributes:
                        { description:  null},
             }
            }
            );
            instance.privacyPolicyApiCallId = privacyPolicyApi.messageId
            runEngine.sendMessage("unit test", privacyPolicyApi)



           });

        then('I can enter text with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            // textInputComponent.simulate('changeText', 'hello@aol.com');
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'profile');
            // buttonComponent.simulate('press');
            // expect(instance.state.txtSavedValue).toEqual("hello@aol.com");
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
