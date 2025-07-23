import { ShallowWrapper, shallow } from 'enzyme'
import { defineFeature, loadFeature } from "jest-cucumber"

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import AudioLibrary from "../../src/AudioLibrary"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "AudioLibrary"
  }

const feature = loadFeature('./__tests__/features/AudioLibrary-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AudioLibrary', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:AudioLibrary; 

        given('I am a User loading AudioLibrary', () => {
            exampleBlockA = shallow(<AudioLibrary {...screenProps}/>);
        });

        when('I navigate to the AudioLibrary', () => {
             instance = exampleBlockA.instance() as AudioLibrary
        });

        then('AudioLibrary will load with out errors', () => {
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
