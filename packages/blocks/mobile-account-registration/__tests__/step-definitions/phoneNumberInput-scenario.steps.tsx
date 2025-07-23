import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";

import PhoneNumberInput from "../../src/PhoneNumberInput"
import * as utils from "../../../../framework/src/Utilities";
// @ts-ignore
global.FormData = require('react-native/Libraries/Network/FormData');

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn()
    },
    id: "phoneNumberInput-scenario"
}

const feature = loadFeature('./__tests__/features/phoneNumberInput-scenario.feature');
const countryListArray =  [
    {"country_ISO_code": "AF", "country_code": "93", "country_flag": "", "country_name": "Afghanistan"},
    {"country_ISO_code": "IN", "country_code": "91", "country_flag": "", "country_name": "India"}
]
const mockgetStorageData = jest.spyOn(utils, "getStorageData");
mockgetStorageData.mockResolvedValue("ar");

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });
    jest.useFakeTimers();

    test('User navigates to Mobile Phone Number Registration', ({ given, when, then }) => {
        let phoneNumberInputWrapper: ShallowWrapper;
        let instance: PhoneNumberInput;

        given('I am a User attempting to Register with a Mobile Phone Number', () => {
            phoneNumberInputWrapper = shallow(<PhoneNumberInput {...screenProps} />)
            expect(phoneNumberInputWrapper).toBeTruthy()

        });

        when('I navigate to the Registration Screen', () => {
            instance = phoneNumberInputWrapper.instance() as PhoneNumberInput            
            const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
            msgPlayloadAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "USER-TOKEN");
            msgPlayloadAPI.addData(getName(MessageEnum.PhoneNumberInputDataMessage), { countryCode: "", countryList: [{ "country_ISO_code": "AF", "country_code": "93", "country_flag": "", "country_name": "Afghanistan" }, { "country_ISO_code": "IN", "country_code": "91", "country_flag": "", "country_name": "India" }], name: "", email: "", loginType: "" });
            runEngine.sendMessage("Unit Test", msgPlayloadAPI)
        });

        then('I can go back with out errors', () => {
            let textInputComponent = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === 'backBtn');
            textInputComponent.simulate('press');

            let buttonComponent = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === 'Background');
            buttonComponent.simulate('press')
        });

        then('I can enter details with errors', async() => {
            let NameInputComponent = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === 'FullNameInput');
            NameInputComponent.simulate("changeText", "");

            let UserInputComponent = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === 'UserNameInput');
            UserInputComponent.simulate("changeText", "");

            let mobileNoInput = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "mobileNoInput");
            mobileNoInput.simulate("changeText", "");

            let agreementID = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "agreementID");
            agreementID.simulate("press");

            const termsConditonMessage = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "termsCondition");
            expect(termsConditonMessage).toBeTruthy();
            termsConditonMessage.simulate('press');

            let signBtn = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "SignUpBtn");
            signBtn.simulate('press')
            await new Promise(resolve => setImmediate(resolve))
            const termsConditonError = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "T&CErrorText");
            expect(termsConditonError).toBeTruthy();
        })

        then('I can enter details with out errors', () => {
            let NameInputComponent = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === 'FullNameInput');
            NameInputComponent.simulate("changeText", "TestName");

            let UserInputComponent = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === 'UserNameInput');
            UserInputComponent.simulate("changeText", "TestUserNameName");


            let ImagePickerBtn = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "goImagePickerBtn");
            ImagePickerBtn.simulate('press')

            let dobBtn = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "touchDateOfBirth");
            dobBtn.simulate('press')

            let emailInput = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "emailInput");
            emailInput.simulate("changeText", "test@mail.com");

            let mobileNoInput = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "mobileNoInput");
            mobileNoInput.simulate("changeText", "1234567890");
            
            mobileNoInput.props().leftIcon()
            const leftIconItem = mobileNoInput.renderProp('leftIcon')()
            const leftIconBtn =  leftIconItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'countryBtn')
            leftIconBtn.simulate("press")
            
            const countryFlatlist = phoneNumberInputWrapper.findWhere(
                (node) => node.prop("testID") === "CountryCodeFlatList"
            );
            countryFlatlist.props().keyExtractor({}, 3);
            countryFlatlist.props().renderItem({ item: instance.state.countryList[0], index: 0 })
           const countryRenderItem = countryFlatlist.renderProp('renderItem')({ item:  instance.state.countryList[0], index: 0 })  
           const countryselectBtn = countryRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'countrySelectBtn')      
            countryselectBtn.simulate("press")
            countryFlatlist.renderProp("ListEmptyComponent")();
            const ListHeaderComponentItem = countryFlatlist.renderProp('ListHeaderComponent')()
            let searchCountryTextInput = ListHeaderComponentItem.findWhere((node) => node.prop('testID') === "searchBarID");
            searchCountryTextInput.simulate("changeText", "india");
            countryFlatlist.props().keyExtractor({ id: "key" })

            let passwordInput = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "passwordInput");
            passwordInput.simulate("changeText", "Test@123");

            expect(phoneNumberInputWrapper).toBeTruthy();            
        })

        then('I can select a Date of Birth with out errors', () => {
            let dobInput = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "DateOfBirthInput");
            dobInput.simulate("changeText", "31/12/1999");

            let dateTimePicker = phoneNumberInputWrapper.findWhere(node => node.prop('testID') === 'dateTimePicker');
            dateTimePicker.simulate("changeText", "31/12/1999");

            let closeModal = phoneNumberInputWrapper.findWhere(node => node.prop('testID') === "btnCloseDobPicker");
            let outSideModal = phoneNumberInputWrapper.findWhere(node => node.prop('testID') === "outsideDobModal");
            let modal = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "DobModal");
            closeModal.simulate('press')
            outSideModal.simulate('press')
            modal.simulate("requestClose")

            let errorModal = phoneNumberInputWrapper.findWhere(node => node.prop('testID') === "goBacktoLoginBtn");
            errorModal.simulate('press');

        });

        then('I can select a Country Code with out errors', () => {

            let msg = new Message(getName(MessageEnum.CountryCodeMessage))
            msg.addData
                (getName(MessageEnum.CountyCodeDataMessage)
                    , "91"
                )
            runEngine.sendMessage("Unit Test", msg)
     
            msg = new Message(getName(MessageEnum.CountryCodeMessage))
            msg.addData
                (getName(MessageEnum.CountyCodeDataMessage)
                    , "ABC +3833"
                )
            runEngine.sendMessage("Unit Test", msg)

            msg = new Message(getName(MessageEnum.CountryCodeMessage))
            runEngine.sendMessage("Unit Test", msg)
            expect(phoneNumberInputWrapper).toBeTruthy();
        });

        then('I can view terms and conditon with out errors', async()=>{
            const termsConditonMessage = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "termsCondition");
            expect(termsConditonMessage).toBeTruthy();
            termsConditonMessage.simulate('press');
            expect(screenProps.navigation.navigate).toHaveBeenCalledWith("TermsAndConditions")
            const privacyBtn = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "privacyPolicy");
            expect(privacyBtn).toBeTruthy();
            privacyBtn.simulate('press');
            expect(screenProps.navigation.navigate).toHaveBeenCalledWith("PrivacyPolicy")
        })

        then('I can select the Submit button with out errors', async () => {
            let signBtn = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "SignUpBtn");
            signBtn.simulate('press')

            const signUpMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.signUpApiCallId = signUpMessage.messageId;
            signUpMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), signUpMessage.messageId);
            signUpMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                meta: {
                    token: "abcXYZ123",
                },
                data: {
                    profile: ''
                }
            })
            runEngine.sendMessage("Unit Test", signUpMessage)

            const phone_message = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.signUpApiCallId = phone_message.messageId;
            phone_message.addData(getName(MessageEnum.RestAPIResponceDataMessage), phone_message.messageId);
            phone_message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                phone_message: "12345"
            })
            runEngine.sendMessage("Unit Test", phone_message)

            const email_message = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.signUpApiCallId = email_message.messageId;
            email_message.addData(getName(MessageEnum.RestAPIResponceDataMessage), email_message.messageId);
            email_message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                email_message: "abc@gmail.com"
            })
            runEngine.sendMessage("Unit Test", email_message)

            const message = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.signUpApiCallId = message.messageId;
            message.addData(getName(MessageEnum.RestAPIResponceDataMessage), message.messageId);
            message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                message: "message"
            })
            runEngine.sendMessage("Unit Test", message)

            const username_message = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.signUpApiCallId = username_message.messageId;
            username_message.addData(getName(MessageEnum.RestAPIResponceDataMessage), username_message.messageId);
            username_message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                username_message: "username"
            })
            runEngine.sendMessage("Unit Test", username_message)
            await new Promise((resolve) => setImmediate(resolve))
        });

        then('I can select verify with button and send otp button with out errors', async () => {            
            let outsidePickerModal = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "outsidePickerModal");
            outsidePickerModal.simulate('press')

            let sendOtp = phoneNumberInputWrapper.findWhere(node => node.prop('testID') === 'sendOTPBtn');
            
            let selectSMS = phoneNumberInputWrapper.findWhere(node => node.prop('testID') === "selectSMSBtn");
            selectSMS.simulate('press')
            sendOtp.simulate('press');

            const SMSOptsendMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.postSMSOtpApiCallId = SMSOptsendMessage.messageId;
            SMSOptsendMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), SMSOptsendMessage.messageId);
            SMSOptsendMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                data: {
                    id: "123"
                },
                meta: {
                    token: "abcXYZ123"
                }
            })
            runEngine.sendMessage("Unit Test", SMSOptsendMessage)

            const errorMsg = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.postSMSOtpApiCallId = errorMsg.messageId;
            errorMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), errorMsg.messageId);
            errorMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                error: "errormsg"
            })
            runEngine.sendMessage("Unit Test", errorMsg)

            let selectEmail = phoneNumberInputWrapper.findWhere(node => node.prop('testID') === 'selectEmailBtn');
            selectEmail.simulate('press');
            sendOtp.simulate('press')

            const emailOptsendMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.postEmailOtpApiCallId = emailOptsendMessage.messageId;
            emailOptsendMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), emailOptsendMessage.messageId);
            emailOptsendMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                data: {
                    id: "123"
                },
                meta: {
                    token: "abcXYZ123"
                }
            })
            runEngine.sendMessage("Unit Test", emailOptsendMessage)
            const errorMsgEmail = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.postEmailOtpApiCallId = errorMsgEmail.messageId;
            errorMsgEmail.addData(getName(MessageEnum.RestAPIResponceDataMessage), errorMsgEmail.messageId);
            errorMsgEmail.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                error: "errorMsgEmail"
            })
            runEngine.sendMessage("Unit Test", errorMsgEmail)
        });

        then('I can select the skip button with out error', async () => {
            let skipBtn = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "skipBtn");
            skipBtn.simulate('press')
            expect(phoneNumberInputWrapper).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(phoneNumberInputWrapper).toBeTruthy()
        });
    });

    test('User verify account', ({ given, when, then }) => {
        let phoneNumberInputWrapper: ShallowWrapper;
        let instance: PhoneNumberInput;

        given('I am a User attempting to Register with a Mobile Phone Number', () => {
            phoneNumberInputWrapper = shallow(<PhoneNumberInput {...screenProps} />)
            expect(phoneNumberInputWrapper).toBeTruthy()

        });

        when('I navigate to the Registration Screen', () => {
            instance = phoneNumberInputWrapper.instance() as PhoneNumberInput            
            const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
            msgPlayloadAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "USER-TOKEN");
            msgPlayloadAPI.addData(getName(MessageEnum.PhoneNumberInputDataMessage), { countryCode: "", countryList: [{ "country_ISO_code": "AF", "country_code": "93", "country_flag": "", "country_name": "Afghanistan" }, { "country_ISO_code": "IN", "country_code": "91", "country_flag": "", "country_name": "India" }], name: "", email: "", loginType: "" });
            runEngine.sendMessage("Unit Test", msgPlayloadAPI)
        });

        then('I can enter details with out errors', () => {
            let NameInputComponent = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === 'FullNameInput');
            NameInputComponent.simulate("changeText", "TestName");

            let UserInputComponent = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === 'UserNameInput');
            UserInputComponent.simulate("changeText", "username");

            let ImagePickerBtn = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "goImagePickerBtn");
            ImagePickerBtn.simulate('press')

            let dobBtn = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "touchDateOfBirth");
            dobBtn.simulate('press')

            let emailInput = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "emailInput");
            emailInput.simulate("changeText", "test@mail.com");

            let mobileNoInput = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "mobileNoInput");
            mobileNoInput.simulate("changeText", "1234567890");

            mobileNoInput.props().leftIcon()
            const leftIconItem = mobileNoInput.renderProp('leftIcon')()
            const leftIconBtn =  leftIconItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'countryBtn')
            leftIconBtn.simulate("press")
            
            const countryFlatlist = phoneNumberInputWrapper.findWhere(
                (node) => node.prop("testID") === "CountryCodeFlatList"
            );
            countryFlatlist.props().keyExtractor({}, 3);
            countryFlatlist.props().renderItem({ item: instance.state.countryList[0], index: 0 })
            countryFlatlist.renderProp("ListEmptyComponent")();
            const ListHeaderComponentItem = countryFlatlist.renderProp('ListHeaderComponent')()
            let searchCountryTextInput = ListHeaderComponentItem.findWhere((node) => node.prop('testID') === "searchBarID");
            searchCountryTextInput.simulate("changeText", "india");
            countryFlatlist.props().keyExtractor({ id: "key" })

            let passwordInput = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "passwordInput");
            passwordInput.simulate("changeText", "Test@123");
            expect(phoneNumberInputWrapper).toBeTruthy();
            
        })

        then('I can select the Submit button with out errors', async () => {
            let signBtn = phoneNumberInputWrapper.findWhere((node) => node.prop('testID') === "SignUpBtn");
            signBtn.simulate('press')

            const signUpMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.signUpApiCallId = signUpMessage.messageId;
            signUpMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), signUpMessage.messageId);
            signUpMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                meta: {
                    token: "abcXYZ123",
                },
                data: {
                    profile: ''
                }
            })
            runEngine.sendMessage("Unit Test", signUpMessage)

            const phone_message = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.signUpApiCallId = phone_message.messageId;
            phone_message.addData(getName(MessageEnum.RestAPIResponceDataMessage), phone_message.messageId);
            phone_message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                phone_message: "12345"
            })
            runEngine.sendMessage("Unit Test", phone_message)

            const email_message = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.signUpApiCallId = email_message.messageId;
            email_message.addData(getName(MessageEnum.RestAPIResponceDataMessage), email_message.messageId);
            email_message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                email_message: "abc@gmail.com"
            })
            runEngine.sendMessage("Unit Test", email_message)

            const message = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.signUpApiCallId = message.messageId;
            message.addData(getName(MessageEnum.RestAPIResponceDataMessage), message.messageId);
            message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                message: "message"
            })
            runEngine.sendMessage("Unit Test", message)

            const username_message = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.signUpApiCallId = username_message.messageId;
            username_message.addData(getName(MessageEnum.RestAPIResponceDataMessage), username_message.messageId);
            username_message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                username_message: "username"
            })
            runEngine.sendMessage("Unit Test", username_message)
            await new Promise((resolve) => setImmediate(resolve))
        });

        then('I can select arrow button with out errors', async () => {            
            let closeModal = phoneNumberInputWrapper.findWhere(node => node.prop('testID') === "btnCloseVerifySelectModal");
            closeModal.simulate('press')
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(phoneNumberInputWrapper).toBeTruthy()
        });
    });

    test('Empty Mobile Phone Number', ({ given, when, then }) => {
        let phoneNumberInputWrapper: ShallowWrapper;
        let instance: PhoneNumberInput;

        given('I am a User attempting to Register with a Mobile Phone', () => {
            phoneNumberInputWrapper = shallow(<PhoneNumberInput {...screenProps} />)
            expect(phoneNumberInputWrapper).toBeTruthy()
        });

        when('I Register with an empty Mobile Phone Number', async() => {
            instance = phoneNumberInputWrapper.instance() as PhoneNumberInput
        });

        then('RestAPI will return an error', () => {
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "errors": [
                        {
                            "failed_login": "Login Failed"
                        }
                    ]
                });
        });

    });

    test('Mobile Phone Number and have not selected a Country Code', ({ given, when, then }) => {
        let phoneNumberInputWrapper: ShallowWrapper;
        let instance: PhoneNumberInput;

        given('I am a User attempting to Register with a Mobile Phone', () => {
            phoneNumberInputWrapper = shallow(<PhoneNumberInput {...screenProps} />)
            expect(phoneNumberInputWrapper).toBeTruthy()

        });

        when('I Register with a Mobile Phone Number and empty Country Code', () => {
            instance = phoneNumberInputWrapper.instance() as PhoneNumberInput
        });

        then('RestAPI will return an error', () => {
            const msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceErrorMessage),
                {
                    "errors": [
                        {
                            "failed_login": "Login Failed"
                        }
                    ]
                });

            instance.phoneAuthApiCallId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        });
    });

    test('Mobile Phone Number and have selected a Country Code', ({ given, when, then }) => {

        let phoneNumberInputWrapper: ShallowWrapper;
        let instance: PhoneNumberInput;

        given('I am User attempting to Register with a Mobile Phone', () => {
            phoneNumberInputWrapper = shallow(<PhoneNumberInput {...screenProps} />)
            expect(phoneNumberInputWrapper).toBeTruthy()

        });

        when('I Registration with Mobile Phone Number and have a Country Code', () => {
            instance = phoneNumberInputWrapper.instance() as PhoneNumberInput
        });

        then('RestAPI will return token', () => {
            const magLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magLogInSucessRestAPI);
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
            });
            instance.phoneAuthApiCallId = magLogInSucessRestAPI
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI)
        });
    });

})