//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import { render, fireEvent, act, screen, waitFor } from '@testing-library/react-native';
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import TakeABreak from "../../src/settingOptions/takeABreak"
import { mount } from 'enzyme';
import * as utils from "../../../../framework/src/Utilities"
import '@testing-library/jest-native/extend-expect';
const navigation = require("react-navigation")
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Platform } from 'react-native'; // Import Platform from react-native
import { platform } from "os";
const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        },
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
    },
    id: "TakeABreak",
    route: {},

}

const feature = loadFeature('./__tests__/features/TakeABreak-scenario.feature');
const mockgetStorageData = jest.spyOn(utils, "getStorageData")
defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        mockgetStorageData.mockImplementation(() => {
            return Promise.resolve("ar")
        })
        const mockDate = new Date('1692706338721');
        //@ts-ignore
        global.Date = jest.fn().mockImplementation(() => mockDate) // mock Date "new" constructor
        global.Date.now = jest.fn().mockReturnValue(mockDate.valueOf()) // mock Date.now
    });

    test('User navigates to TakeABreak', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: TakeABreak;

        given('I am a User loading TakeABreak', () => {
            exampleBlockA = shallow(<TakeABreak {...screenProps} />);
        });

        when('I navigate to the TakeABreak', () => {
            instance = exampleBlockA.instance() as TakeABreak
            Platform.OS = 'android';
        });

        then('TakeABreak will load with out errors', () => {
            const { getByTestId } = render(<TakeABreak {...screenProps} />);
            const touchable = getByTestId('manageAcc');
            fireEvent.press(touchable);
            expect(screenProps.navigation.navigate).toHaveBeenCalledTimes(1);

            const responseJson = {
                data: { "attributes": { "account": [Object], "frequency_in_hours": '', "frequency_in_minutes": '', "id": 599, "is_enabled": false }, "id": "599", "type": "take_a_break_reminders" }
            }
            const expectedId = "599"; // Expected ID 
            const getBreakReminderAPICall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getBreakReminderAPICall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getBreakReminderAPICall.messageId
            );
            getBreakReminderAPICall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getBreakReminderCallId = getBreakReminderAPICall.messageId;
            runEngine.sendMessage("Unit Test", getBreakReminderAPICall);
            expect(responseJson.data.id).toEqual(expectedId);
        });



        then('should render the toggle reminder button correctly', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'toggleReminder');
            //  const toggleBreakReminderMock = jest.fn();  
            const toggleBreakReminderMock = jest.spyOn(instance, 'toggleBreakReminder'); instance.toggleBreakReminder = toggleBreakReminderMock;
            buttonComponent.simulate('press');
            expect(toggleBreakReminderMock).toHaveBeenCalled();
        });


        then('I can leave the screen with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('User navigates to TakeABreak for IOS', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: TakeABreak;

        given('I am a User loading TakeABreak', () => {
            exampleBlockA = shallow(<TakeABreak {...screenProps} />);
        });

        when('I navigate to the TakeABreak', () => {
            instance = exampleBlockA.instance() as TakeABreak
            Platform.OS = 'ios';
        });

        then('TakeABreak will load with out errors', () => {
            const responseJson = {
                data: { "attributes": { "account": [Object], "frequency_in_hours": null, "frequency_in_minutes": null, "id": 599, "is_enabled": true }, "id": "599", "type": "take_a_break_reminders" }
            } 
            const expectedId = "599"; // Expected ID 
            const getBreakReminderAPICall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getBreakReminderAPICall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getBreakReminderAPICall.messageId
            );
            getBreakReminderAPICall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getBreakReminderCallId = getBreakReminderAPICall.messageId;
            runEngine.sendMessage("Unit Test", getBreakReminderAPICall);
            expect(responseJson.data.id).toEqual(expectedId);

            const response2=
            {data: {"attributes": {"account": [Object], "frequency_in_hours": null, "frequency_in_minutes": null, "id": 646, "is_enabled": true}, "id": "646", "type": "take_a_break_reminders"}}

            const updateBreakReminderSettingsCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            updateBreakReminderSettingsCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                updateBreakReminderSettingsCall.messageId
            );
            updateBreakReminderSettingsCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                response2
            );
            instance.updateBreakReminderSettingsCallId = updateBreakReminderSettingsCall.messageId;
            runEngine.sendMessage("Unit Test", updateBreakReminderSettingsCall); 
            expect(response2.data.type).toBe("take_a_break_reminders")
        });



        then('should render the toggle reminder button correctly', () => {
            let dateTimePicker = exampleBlockA.findWhere(
                (node) => node.prop('testID') === 'DateIOS');
              const newDate = new Date('2023-08-24T06:52:15'); // Adjust the date and time as needed // Adjust the date and time as needed
                dateTimePicker.prop('onChange')({ type: 'set' }, newDate);
           expect(dateTimePicker.prop('value')).toBe(newDate);
            let buttonComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'mngAccount');
            buttonComponent2.simulate('press');
            expect(screenProps.navigation.navigate("ManageAccount"))
        });


        then('I can leave the screen with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
    });
});
