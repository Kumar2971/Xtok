import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import PhotoFilters from "../../src/PhotoFilters"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "PhotoFilters"
  }

const feature = loadFeature('./__tests__/features/PhotoFilters-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to PhotoFilters', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:PhotoFilters; 

        given('I am a User loading PhotoFilters', () => {
            exampleBlockA = shallow(<PhotoFilters {...screenProps}/>);
        });

        when('I navigate to the PhotoFilters', () => {
             instance = exampleBlockA.instance() as PhotoFilters
        });

        then('PhotoFilters will load with out errors', () => {
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
