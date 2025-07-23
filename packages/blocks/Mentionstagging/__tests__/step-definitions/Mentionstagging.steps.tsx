import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import Mentionstagging from "../../src/Mentionstagging"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Mentionstagging"
  }

const feature = loadFeature('./__tests__/features/Mentionstagging-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Mentionstagging', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:Mentionstagging; 

        given('I am a User loading Mentionstagging', () => {
            exampleBlockA = shallow(<Mentionstagging {...screenProps}/>);
        });

        when('I navigate to the Mentionstagging', () => {
             instance = exampleBlockA.instance() as Mentionstagging
        });

        then('Mentionstagging will load with out errors', () => {
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
