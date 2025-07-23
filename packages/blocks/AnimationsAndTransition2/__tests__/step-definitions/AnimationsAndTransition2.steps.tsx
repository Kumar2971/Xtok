import { ShallowWrapper, shallow } from 'enzyme'
import { defineFeature, loadFeature } from "jest-cucumber"

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import AnimationsAndTransition2 from "../../src/AnimationsAndTransition2"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "AnimationsAndTransition2"
  }

const feature = loadFeature('./__tests__/features/AnimationsAndTransition2-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AnimationsAndTransition2', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:AnimationsAndTransition2; 

        given('I am a User loading AnimationsAndTransition2', () => {
            exampleBlockA = shallow(<AnimationsAndTransition2 {...screenProps}/>);
        });

        when('I navigate to the AnimationsAndTransition2', () => {
             instance = exampleBlockA.instance() as AnimationsAndTransition2
        });

        then('AnimationsAndTransition2 will load with out errors', () => {
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
