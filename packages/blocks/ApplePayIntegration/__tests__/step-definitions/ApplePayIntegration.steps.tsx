import { ShallowWrapper, shallow } from 'enzyme'
import { defineFeature, loadFeature } from "jest-cucumber"

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import ApplePayIntegration from "../../src/ApplePayIntegration"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "ApplePayIntegration"
  }

const feature = loadFeature('./__tests__/features/ApplePayIntegration-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to ApplePayIntegration', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:ApplePayIntegration; 

        given('I am a User loading ApplePayIntegration', () => {
            exampleBlockA = shallow(<ApplePayIntegration {...screenProps}/>);
        });

        when('I navigate to the ApplePayIntegration', () => {
             instance = exampleBlockA.instance() as ApplePayIntegration
        });

        then('ApplePayIntegration will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.simulate('changeText', 'hello@aol.com');
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnExample');
            buttonComponent.simulate('press');
            expect(instance.state.txtSavedValue).toEqual("hello@aol.com");
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
