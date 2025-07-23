import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"
import {render, fireEvent, act} from '@testing-library/react-native';
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React, { useEffect } from "react";
import ForgotPasswordOTP from "../../src/ForgotPasswordOTP"
import * as Utils from "../../../../framework/src/Utilities";

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        }
    },
    id: "ForgotPasswordOTP",
    route:{}
}

const feature = loadFeature('./__tests__/features/ForgotPasswordOTP-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.useFakeTimers()
    });

    test('User navigates to ForgotPasswordOTP', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: ForgotPasswordOTP;
        let button: any;

        given('I am a User loading ForgotPasswordOTP', async () => {
            const mockgetStorageData = jest.spyOn(Utils, "getStorageData");
            mockgetStorageData.mockResolvedValue("ar");

            exampleBlockA = shallow(<ForgotPasswordOTP {...screenProps} />);

            await act(async () => {
                await new Promise(resolve => setImmediate(resolve));
                exampleBlockA.update();
            });

            // Assert language state
            expect(exampleBlockA.state('language')).toEqual('ar');

            button = () => exampleBlockA.findWhere((node) => node.prop('testID') === 'resendOtpTouch');
        });

        when('I navigate to the ForgotPasswordOTP', () => {
            instance = exampleBlockA.instance() as ForgotPasswordOTP
        });

        then('ForgotPasswordOTP will load with out errors', () => {
            //Can't remove this setState as this language we can only change from settings. and not able to write local storage test case.
            expect(exampleBlockA).toBeTruthy();
        });
        then('renders TouchableOpacity when remainingTime is <= 0', () => {
            let hideKeyboard = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "hideKeyboard"
              );
              hideKeyboard.simulate("press");
        });
        then('does not render TouchableOpacity when remainingTime is > 0', () => {
            let login = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "login"
              );
              login.simulate("press");
            instance.setState({ remainingTime: 1 });
            expect(button().length).toBe(0);
        });
        then('calls onPressResend when TouchableOpacity is pressed', () => {
            //remainingTime is a counter so we can make counter in enzyme that is why i need to use state to make this time 0.
            instance.setState({ remainingTime: 0 });
            button().simulate('press');
        });
        then('displays error message when there is an otp error', () => {
            const otpResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                otpResponse.messageId
            );
            const responseJson = {
                "errors": [
                    {
                        "token": 'Invalid token'
                    }
                ]
            };
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.otpAuthApiCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);
        });
        then('renders an empty View when there is no otp error', () => {
            const otpResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                otpResponse.messageId
            );
            const responseJson = {
                "errors": undefined
            };
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.otpAuthApiCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);
        });
        then('Displays error message when state has an error from call', () => {
            const otpResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                otpResponse.messageId
            );
            const responseJson = {
                "errors": [
                    {
                        "pin": 'Invalid pin'
                    }
                ]
            };
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.postSubmitOTPSMSApiCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);


            const codeField = exampleBlockA.find({ testID: 'otp' });
            // Simulate onChangeText
            codeField.props().onChangeText('1234');
            codeField.props().onSubmitEditing();

            const renderCell = codeField.props().renderCell;
            const cell = renderCell({ index: 0, symbol: '1', isFocused: true });
        });
        then('Renders an empty View when there is no error in state call', () => {
            const otpResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                otpResponse.messageId
            );
            const responseJson = {
                "errors": null
            };
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.postSubmitOTPSMSApiCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);

        });
        then('ResendOTP when user clicks', () => {

            const otpResponse = new Message(
                getName(MessageEnum.NavigationPayLoadMessage)
            );
            otpResponse.addData(
                getName(MessageEnum.NavigationPayLoadMessage),
                otpResponse.messageId
            );
            const responseJson = {
                verifyWith: 'SMS',
                selectedAccount: 'SMS',
                mobileNo: '1234567890',
                email:''

            };
            otpResponse.addData(
                getName(MessageEnum.OTPInputAuthDataMessage),
                responseJson
            );

            runEngine.sendMessage("Unit Test", otpResponse);


            const otpResponseMemory = new Message(
                getName(MessageEnum.NavigationPayLoadMessage)
            );
            otpResponseMemory.addData(
                getName(MessageEnum.NavigationPayLoadMessage),
                otpResponseMemory.messageId
            );
            const responseJson1 = {
                verifyWith: 'Email',
                selectedAccount: 'Email',
                mobileNo: '',
                email:'deus@yopmail.com'

            };
            otpResponseMemory.addData(
                getName(MessageEnum.OTPInputAuthDataMessage),
                responseJson1
            );

            runEngine.sendMessage("Unit Test", otpResponseMemory);

        })
        then('I can leave the screen with out errors', () => {
            let selectEmailBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'login');
            selectEmailBtn.simulate('press');

            let newPasswordBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'closeModal');
            newPasswordBtn.simulate("press");
            let txtPasswordIn = exampleBlockA.findWhere((node) => node.prop('testID') === 'otp');
            txtPasswordIn.simulate('changeText', '1234');
            txtPasswordIn.simulate('submitEditing');

            let hideKeyboardBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'hideKeyboard');
            hideKeyboardBtn.simulate("press");
            let newPassBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'newPassword');
            newPassBtn.simulate("press");
        });
    });
});

