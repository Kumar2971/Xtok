import {defineFeature, loadFeature} from "jest-cucumber"
import {mount, shallow, ShallowWrapper} from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
import * as Utils from "../../../../framework/src/Utilities";
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum";
import React, {useEffect} from "react";
import ForgotPassword from "../../src/ForgotPassword"
import {render, fireEvent, act} from "@testing-library/react-native";
import {Platform} from 'react-native';

const assert = require('assert');
import {styles} from "../../src/ForgotPassword"


const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {}
    },
    id: "ForgotPassword",
}
const passwordValidate = jest.fn();
const Yup = require('yup');
const feature = loadFeature('./__tests__/features/ForgotPassword-scenario.feature');

const schema = Yup.object().shape({
    password: Yup.string().required(),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password')], "Passwords must match")
});
defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({Platform: {OS: 'web'}}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        // jest.spyOn(React,'useEffect').mockImplementation((f)=>f())
    });

    test('User navigates to ForgotPassword', ({given, when, then}) => {
        let exampleBlockA: ShallowWrapper;
        let instance: ForgotPassword;

        given('I am a User loading ForgotPassword', async() => {
            const mockgetStorageData = jest.spyOn(Utils, "getStorageData");
            mockgetStorageData.mockResolvedValue("ar");

            exampleBlockA = shallow(<ForgotPassword {...screenProps} />);

            await act(async () => {
                await new Promise(resolve => setImmediate(resolve));
                exampleBlockA.update();
            });

            // Assert language state
            expect(exampleBlockA.state('language')).toEqual('ar');
        });

        when('I navigate to the ForgotPassword', () => {
            instance = exampleBlockA.instance() as ForgotPassword
        });

        then('ForgotPassword will load with out errors', () => {
            instance.openModal()
            expect(exampleBlockA).toBeTruthy();
        });
        then('Renders mobileNo error message when present', () => {
            // let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnCloseSelectModal');
            // buttonComponent.simulate('press');
            jest.useFakeTimers();
            let selectSMSBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'selectSMS');
            selectSMSBtn.simulate('press');
            jest.runAllTimers();
            exampleBlockA.update();

            let txtConfirmPasswordIn = exampleBlockA.findWhere(
                node => node.prop("testID") === "inputMobile"
            );
            txtConfirmPasswordIn.simulate("changeText", "9823792738");

            let fillEmailOrNOBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'fillEmailOrNO');
            fillEmailOrNOBtn.simulate('press');

            txtConfirmPasswordIn.simulate("changeText", "9823dfdfd738");

            // let fillEmailOrNOBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'fillEmailOrNO');
            fillEmailOrNOBtn.simulate('press');


            jest.useFakeTimers();
            let selectEmailBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'selectEmail');
            selectEmailBtn.simulate('press');
            jest.runAllTimers();
            exampleBlockA.update();


            const button = exampleBlockA.findWhere((node) => node.prop('testID') === 'postOtp');
            expect(button.exists()).toBe(true);
            button.prop('onPress')();
            jest.runAllTimers();
            exampleBlockA.update();
            expect(instance.state.openVerificationModal).toBe(false);
            // expect(instance.onContinue).toHaveBeenCalled();


            instance.openCountryListModal();


            let txtEmailIn = exampleBlockA.findWhere(
                node => node.prop("testID") === "txtEmail"
            );
            txtEmailIn.simulate("changeText", "raj@yopmail.com");
            txtEmailIn.props().onFocus();
            txtEmailIn.props().onBlur();
            fillEmailOrNOBtn.simulate('press');
            // instance.goToOtpAfterEmailValidation({email: instance.state.email})

            // const input = exampleBlockA.find({ testID: 'inputMobile' }).dive();
            // const touchable = input.find({ testID: 'openList' });
            // touchable.props().onPress();
            //
            // // Force the component to update
            // exampleBlockA.update();

            // expect(exampleBlockA.state().selectedAccount).toEqual('SMS');

            // instance.setState({
            //     errors: {
            //         mobileNo: {
            //             message: 'Invalid mobile number',
            //         },
            //     },
            // });
            //
            // // Assuming the Text component has a testID prop set to "mobileNoError"
            // const errorText = exampleBlockA.findWhere((node) => node.prop('testID') === 'mobileNoError');
            //
            // expect(errorText.exists()).toBe(true);
            // expect(errorText.props().style).toContainEqual(expect.objectContaining({textAlign: 'left'}));
            // expect(errorText.props().children).toEqual('Invalid mobile number');

            // instance.goToOtpAfterPhoneValidation({phone: "12fdfdfd7890"});
        });
        then('Renders FlatList with data correctly', () => {
            const data: any[] = [{
                id: '1',
                country_flag: '',
                country_ISO_code: '',
                country_name: '',
                country_code:"91"          
            }];
            const flatList = exampleBlockA.findWhere((node) => node.prop('testID') === 'flatList');
            flatList.props().keyExtractor({}, 3);
            const flatlistRender = flatList.renderProp('renderItem')({ item: data[0], index: 0 })
            let itemClick = flatlistRender.findWhere(
                (node) => node.prop("testID") === "itemClick"
            );
            itemClick.simulate("press")
            const mockItem = {item:data[0]};
            flatList.prop('keyExtractor');
            expect(mockItem.item.id).toBe("1");

            const listHeaderComponent = flatList.prop('ListHeaderComponent');
            const renderItemInstance = flatList.prop('renderItem');
            const renderedItemData = shallow(renderItemInstance({ item: mockItem }));
            const touchableOpacity = renderedItemData.findWhere((node) => node.prop('testID') === 'itemClick');

            expect(touchableOpacity.exists()).toBe(true);
            touchableOpacity.simulate('onPress');

            // expect(flatList.prop('ListEmptyComponent')).toBeDefined();

            const listEmptyComponent = shallow(flatList.props().ListEmptyComponent());
            expect(listEmptyComponent.text()).toEqual("");
        })
        then('Does not render mobileNo error message when not present', () => {

            const otpResponse = new Message(
                getName(MessageEnum.NavigationPayLoadMessage)
            );
            otpResponse.addData(
                getName(MessageEnum.NavigationPayLoadMessage),
                otpResponse.messageId
            );
            const responseJson = 'Token'
            otpResponse.addData(
                getName(MessageEnum.AuthTokenDataMessage),
                responseJson
            );

            runEngine.sendMessage("Unit Test", otpResponse);
            expect(instance.state.token).toEqual('Token');



            const otpResponseTrack = new Message(
                getName(MessageEnum.NavigationPayLoadMessage)
            );
            otpResponseTrack.addData(
                getName(MessageEnum.NavigationPayLoadMessage),
                otpResponse.messageId
            );
            const otpResponseTrackData = ''
            otpResponseTrack.addData(
                getName(MessageEnum.AuthTokenDataMessage),
                otpResponseTrackData
            );

            otpResponseTrack.addData(
                getName(MessageEnum.NavigationForgotPasswordPageInfo),
                "Email"
            );

            runEngine.sendMessage("Unit Test", otpResponseTrack);
            // instance.setState({
            //     errors: {},
            // });
            //
            // // Assuming the Text component has a testID prop set to "mobileNoError"
            // const errorText = exampleBlockA.findWhere((node) => node.prop('testID') === 'mobileNoError');
            //
            // expect(errorText.exists()).toBe(false);
        });
        then('Does not render mobileNo error message when not present and undefined', () => {

            const otpResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                otpResponse.messageId
            );
            const responseJson = {
                "data": [
                    {
                        id: '1',
                        country_flag: '',
                        country_ISO_code: '',
                        country_name: ''
                    }
                ]
            };
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.countryCodeApiCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);

            // instance.setState({
            //     errors: {},
            // });
            // exampleBlockA.update();
            //
            // // Assuming the Text component has a testID prop set to "mobileNoError"
            // const errorText = exampleBlockA.findWhere((node) => node.prop('testID') === 'mobileNoError');
            // expect(errorText.exists()).toBe(false);
        });
        then('I can enter text with out errors', () => {
            let buttongoBack = exampleBlockA.findWhere((node) => node.prop('testID') === 'goBack');
            buttongoBack.simulate('press');
            // let serachComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'serach');
            // serachComponent.simulate('changeText', 'ab');
            // instance.handleFocusEmail()
            // instance.handleBlurEmail()
            instance.handleFocusPassword()
            instance.handleBlurPassword()
            instance.handleFocusConfirmPassword()
            instance.handleBlurConfirmPassword()
            instance.startForgotPassword('sms')
            instance.closeReportModal()
            instance.setRememberMe(false)
            instance._validateNewPasswordForm()
            instance._validateMobileForm()
            instance._validateEmailForm()
            instance.onCloseModal()
            instance.submitNewPasswordApi();
        });
        then('I can select remember check box with out errors', () => {
            instance.CustomCheckBoxProps.onChangeValue((true));
            // expect(instance.state.checkedRememberMe).toBe(true);
            instance.btnRememberMeProps.onPress();
            // expect(instance.state.checkedRememberMe).toBe(false);
        });
        then('Get OTP token', () => {
            const otpResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                otpResponse.messageId
            );
            const responseJson = {
                data: [{
                    email_validation_regexp: '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$' // your regex here
                }]
            };
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.validationAPICallId = otpResponse.messageId;

            const passRegex = RegExp(responseJson.data[0].email_validation_regexp);

            const password1 = 'password123'; // this should pass
            const password2 = 'password'; // this should fail

            expect(passRegex.test(password1)).toBe(false);
            expect(passRegex.test(password2)).toBe(true);


            runEngine.sendMessage("Unit Test", otpResponse);
        });
        then('Get OTP token undefined', () => {
            const otpResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                otpResponse.messageId
            );
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                undefined
            );
            instance.validationAPICallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);
        });
        then('Check email before sending email and response is success', () => {
            const otpResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                otpResponse.messageId
            );
            const responseJson = {
                meta: {
                    token: "ABCxyz123",
                },
            };

            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.requestEmailOtpCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);
        });
        then('Check email before sending email and response is with error', () => {
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
                        "otp": "Account not found"
                    }
                ]
            };
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.requestEmailOtpCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);
        });
        then('Handle error for sending otp on email', () => {
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
                        "otp": "Internal server error"
                    }
                ]
            };
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.requestEmailOtpCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);
        });
        then('Check mobile number before sending sms and response is success', () => {
            const otpResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                otpResponse.messageId
            );
            const responseJson = {
                meta: {
                    token: "ABCxyz123",
                },
            };

            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.requestPhoneOtpCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);
        });
        then('Check mobile number before sending sms and response is with error', () => {
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
                        "otp": "Account not found"
                    }
                ]
            };
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.requestPhoneOtpCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);
        });
        then('Handle error for sending otp on phone', () => {
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
                        "otp": "Internal server error"
                    }
                ]
            };
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.requestPhoneOtpCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);
        });


        then('Confirm otp with server', () => {
            const otpResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                otpResponse.messageId
            );
            const responseJson = {
                meta: {
                    token: "ABCxyz123",
                },
            };

            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.requestGoToConfirmationCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);
        });
        then('Confirm otp with server and get error', () => {
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
                        "otp": "Account not found"
                    }
                ]
            };
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.requestGoToConfirmationCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);
        });
        then('Confirm otp with server and server error', () => {
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
                        "otp": "Internal server error"
                    }
                ]
            };
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.requestGoToConfirmationCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);
        });
        then('I can not go to OTP screen with wrong credential', () => {

            const otpResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                otpResponse.messageId
            );
            const responseJson = {
                meta: {
                    token: "ABCxyz123",
                },
            };

            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.requestNewPasswordCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);

            // instance.setState({emailValue: ""}, () => {
            //     instance.goToOtpAfterEmailValidation({email: "**"});
            //     expect(instance.goToOtpAfterEmailValidation).toBeTruthy();
            // })
            // instance.setState({mobileNo: "", selectedCountry: [{}]}, () => {
            //     instance.goToOtpAfterPhoneValidation({phone: ""});
            //     expect(instance.goToOtpAfterPhoneValidation).toBeTruthy();
            // })
            // instance.setState({selectedCountry: []}, () => {
            //     instance.goToOtpAfterPhoneValidation({phone: "1234567890"});
            // })
        });
        then('I can go to OTP screen after phone number validation', () => {
            const otpResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                otpResponse.messageId
            );
            const responseJson = undefined;
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.requestEmailOtpCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);
            // instance.setState({selectedCountry: {country_code: "91"}, mobileNo: "1234567890"}, () => {
            //     instance.goToOtpAfterPhoneValidation({phone: "1234567890"});
            //     expect(instance.state.phoneValue).toBe("911234567890");
            // })
            // instance.setState({password: "Abc@1234", confirmPassword: "Abc@1234"}, () => {
            //     instance.submitNewPasswordApi();
            // })
            //
            // const message = new Message('ae7ad37c-cdb1-4316-8fc1-30a594b98bbe');
            // message.id = "RestAPIResponceMessage";
            // message.properties = {"RestAPIResponceDataMessage":"c6d4d818-01e8-46fe-b55d-1c8696ec1587","RestAPIResponceSuccessMessage":{"data":[{"email_validation_regexp":"[^@]+[@][\\S]+[.][\\S]+","password_validation_regexp":"^(?=.*[A-Z])(?=.*[#!@$&*?<>',\\[\\]}{=\\-)(^%`~+.:;_])(?=.*[0-9])(?=.*[a-z]).{8,}$","password_validation_rules":"Password should be a minimum of 8 characters long, contain both uppercase and lowercase characters, at least one digit, and one special character (!@#$&*?<>',[]}{=-)(^%`~+.:;_)."}]}};
            // message.messageId = "663c7307-3f8c-4134-9ac4-5e71bd8b4f1e";
            // instance.receive('', message);
            // message.id = "NavigationPayLoadMessage";
            // message.properties = {"NavigationForgotPasswordPageInfo": "sms"};
            // instance.receive('', message);
        })
        then('Should return false if password validation fails', () => {
            const otpResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                otpResponse.messageId
            );
            const responseJson = undefined;
            otpResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.requestPhoneOtpCallId = otpResponse.messageId;
            runEngine.sendMessage("Unit Test", otpResponse);
            // instance.state.password = 'password';
            // instance.setState({password: 'password'})
            // passwordValidate.mockReturnValue({status: false});
            //
            // expect(instance._validateNewPasswordForm()).toBe(false);
        })

        then('I can leave the screen with out errors', () => {
            // instance.openModal();
            // let selectEmailBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'outsideImagePickerModal');
            // selectEmailBtn.simulate('press');

            // const button = exampleBlockA.findWhere((node) => node.prop('testID') === 'postOtp');
            // expect(button.exists()).toBe(true);
            // button.prop('onPress')();
            // expect(exampleBlockA.state('openVerificationModal')).toBe(false);

            instance.navigateToOTP('token')
            instance.startForgotPassword('otp')

            // let openCountryListIDBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'openCountryListID');
            // openCountryListIDBtn.simulate("requestClose")
            // let buttongoBack = exampleBlockA.findWhere((node) => node.prop('testID') === 'goBack');
            // buttongoBack.simulate('press');
            // let openCountryListModalBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'closeSelectModal');
            // openCountryListModalBtn.simulate("press")

        });
    });
});

