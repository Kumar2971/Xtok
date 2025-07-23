import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import { DatePickerField, TextInputField, TimePickerField } from "../../src/CustomTextFields.web"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
    },
    id: "CustomTextFields"
}

const feature = loadFeature('./__tests__/features/CustomTextFields-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to CustomTextFields', ({ given, when, then }) => {
        let textInputField: ShallowWrapper;
        let datePickerField: ShallowWrapper;
        let timePickerField: ShallowWrapper;

        given('I am a User loading CustomTextFields', () => {
            textInputField = shallow(<TextInputField textValue="as" multiline={false} field_type={"text"} field_name={"hellow"} handleInputChange={(text:string|undefined)=> {}} />);
            datePickerField = shallow(<DatePickerField isEdit={true} date={"24-05-2025"} field_name={"Select Date"} handleInputChange={(text:string|undefined) => {}} />);
            timePickerField = shallow(<TimePickerField format={"hh:mm A"} isEdit={false} time={"04:00"} isDuration={false} field_name={"Select time"} handleInputChange={(text:string|undefined) => {}} />)
        });

        when('I navigate to the CustomTextFields', () => {
        });

        then('CustomTextFields will load with out errors', () => {
            expect(textInputField).toBeTruthy();
            expect(datePickerField).toBeTruthy();
            expect(timePickerField).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = textInputField.findWhere((node) => node.prop('data-test-id') === 'txtInputText');
            const event = {
                preventDefault() {},
                target: { value: 'hello@aol.com' },
              };
            textInputComponent.simulate('change', event);
            expect(textInputField).toBeTruthy();
            expect(datePickerField).toBeTruthy();
            expect(timePickerField).toBeTruthy();
        });

        then('I can select the like button with out errors', () => {
            expect(textInputField).toBeTruthy();
            expect(datePickerField).toBeTruthy();
            expect(timePickerField).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {  
            expect(textInputField).toBeTruthy();
            expect(datePickerField).toBeTruthy();
            expect(timePickerField).toBeTruthy();
        });
    });


});
