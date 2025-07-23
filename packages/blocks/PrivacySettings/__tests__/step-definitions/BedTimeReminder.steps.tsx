import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as utils from "../../../../framework/src/Utilities"
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import BedTimeReminder from "../../src/settingOptions/bedTimeReminder"
import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import { Message } from '../../../../framework/src/Message';
import { runEngine } from '../../../../framework/src/RunEngine';
import { Platform } from 'react-native'; // Import Platform from react-native
import { platform } from "os";
const navigation = require("react-navigation")

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
    id: "BedTimeReminder",
    route: {}
}

const feature = loadFeature('./__tests__/features/BedTimeReminder-scenario.feature');
const mockgetStorageData = jest.spyOn(utils, "getStorageData")
defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'android' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        mockgetStorageData.mockImplementation(() => {
            return Promise.resolve("ar")
        })
        const mockDate = new Date('1692706338721');
        //@ts-ignore
        global.Date = jest.fn().mockImplementation(() => mockDate)
        global.Date.now = jest.fn().mockReturnValue(mockDate.valueOf())

    });

    test('User navigates to BedTimeReminder', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: BedTimeReminder;

        given('I am a User loading BedTimeReminder', () => {
            exampleBlockA = shallow(<BedTimeReminder {...screenProps} />);
        });

        when('I navigate to the BedTimeReminder', () => {
            instance = exampleBlockA.instance() as BedTimeReminder
            Platform.OS = 'android';

        });

        then('BedTimeReminder will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
            const responseJson = { data: { "attributes": { "account": [Object], "end_time": "2000-01-01T11:51:00.000Z", "id": 613, "is_enabled": true, "start_time": "2000-01-01T11:49:00.000Z" }, "id": "613", "type": "bedtime_reminder" } }

            const getBedTimeReminderCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getBedTimeReminderCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getBedTimeReminderCall.messageId
            );
            getBedTimeReminderCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getBedTimeReminderCallId = getBedTimeReminderCall.messageId;
            runEngine.sendMessage("Unit Test", getBedTimeReminderCall);
            expect(responseJson.data.attributes.is_enabled).toBe(true) 

            const response2={"data": {"attributes": {"account": [Object], "end_time": "2000-01-01T13:10:00.000Z", "id": 647, "is_enabled": true, "start_time": "2000-01-01T13:08:00.000Z"}, "id": "647", "type": "bedtime_reminder"}}
            const createBedTimeReminderCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            createBedTimeReminderCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                createBedTimeReminderCall.messageId
            );
            createBedTimeReminderCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                response2
            );
            instance.createBedTimeReminderCallId = createBedTimeReminderCall.messageId;
            runEngine.sendMessage("Unit Test", createBedTimeReminderCall);
            expect(responseJson.data.attributes.is_enabled).toBe(true) 
        });

        then('I can enter text with out errors', () => {

            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'manageAcc');
            buttonComponent.simulate('press');
            expect(screenProps.navigation.navigate('ManageAccount'))

            const spy = jest.spyOn(instance, 'toggleBedTimeStartModal');
            let buttonComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'toggleMD');
            buttonComponent3.simulate('press');
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();

            const spy2 = jest.spyOn(instance, 'toggleBedTimeEndModal');
            let buttonComponent4 = exampleBlockA.findWhere((node) => node.prop('testID') === 'toggleMD2');
            buttonComponent4.simulate('press');
            expect(spy2).toHaveBeenCalled();
            spy.mockRestore();
        });

        then('I can select the button with with out errors', () => {
            const spy = jest.spyOn(instance, 'handleUpdateBedTimeReminder');
            let buttonComponent4 = exampleBlockA.findWhere((node) => node.prop('testID') === 'updateTimer');
            buttonComponent4.simulate('press');
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });


        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('User navigates to BedTimeReminder for IOS', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: BedTimeReminder;

        given('I am a User loading BedTimeReminder', () => {
            exampleBlockA = shallow(<BedTimeReminder {...screenProps} />);
        });

        when('I navigate to the BedTimeReminder', () => {
            instance = exampleBlockA.instance() as BedTimeReminder
            Platform.OS = 'ios';

        });

        then('BedTimeReminder will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
            const responseJson = { data: { "attributes": { "account": [Object], "end_time": null, "id": 613, "is_enabled": true, "start_time": null }, "id": "613", "type": "bedtime_reminder" } }

            const getBedTimeReminderCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getBedTimeReminderCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getBedTimeReminderCall.messageId
            );
            getBedTimeReminderCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getBedTimeReminderCallId = getBedTimeReminderCall.messageId;
            runEngine.sendMessage("Unit Test", getBedTimeReminderCall);
            expect(responseJson.data.attributes.is_enabled).toBe(true)

            const spy = jest.spyOn(instance, 'toggleBedTimeStartModal');
            let buttonComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'toggleMD');
            buttonComponent3.simulate('press');
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();

            let dateTimePicker = exampleBlockA.findWhere(
                (node) => node.prop('testID') === 'DateIOS');
            const newDate = new Date('2023-08-24T06:52:15');
            dateTimePicker.prop('onChange')({ type: 'set', newDate });
            expect(dateTimePicker.prop('value')).toBe(newDate);

            const spy2 = jest.spyOn(instance, 'toggleBedTimeEndModal');
            let buttonComponent4 = exampleBlockA.findWhere((node) => node.prop('testID') === 'toggleMD2');
            buttonComponent4.simulate('press');
            expect(spy2).toHaveBeenCalled();
            spy.mockRestore();

            let dateTimePicker2 = exampleBlockA.findWhere(
                (node) => node.prop('testID') === 'DateIOS2');
            const newDate2 = new Date('2023-08-24T06:52:15');
            dateTimePicker2.prop('onChange')({ type: 'set', newDate2 });
            expect(dateTimePicker2.prop('value')).toBe(newDate2);

            let hanleTime = exampleBlockA.findWhere(
                (node) => node.prop('testID') === 'hanleTime');
            hanleTime.simulate("press")
        });


        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });
});
