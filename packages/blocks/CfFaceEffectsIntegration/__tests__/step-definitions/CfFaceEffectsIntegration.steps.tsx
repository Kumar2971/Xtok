import { ShallowWrapper, shallow } from 'enzyme'
import { defineFeature, loadFeature } from "jest-cucumber"

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import CfFaceEffectsIntegration from "../../src/CfFaceEffectsIntegration"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "CfFaceEffectsIntegration"
  }

const feature = loadFeature('./__tests__/features/CfFaceEffectsIntegration-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to CfFaceEffectsIntegration', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:CfFaceEffectsIntegration; 

        given('I am a User loading CfFaceEffectsIntegration', () => {
            exampleBlockA = shallow(<CfFaceEffectsIntegration {...screenProps}/>);
        });

        when('I navigate to the CfFaceEffectsIntegration', () => {
             instance = exampleBlockA.instance() as CfFaceEffectsIntegration
        });

        then('CfFaceEffectsIntegration will load with out errors', () => {
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
