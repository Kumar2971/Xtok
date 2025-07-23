import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import RealtimeUpdates from "../../src/RealtimeUpdates"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "RealtimeUpdates"
  }

const feature = loadFeature('./__tests__/features/RealtimeUpdates-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to RealtimeUpdates', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:RealtimeUpdates; 

        given('I am a User loading RealtimeUpdates', () => {
            exampleBlockA = shallow(<RealtimeUpdates {...screenProps}/>);
        });

        when('I navigate to the RealtimeUpdates', () => {
             instance = exampleBlockA.instance() as RealtimeUpdates
        });

        then('RealtimeUpdates will load with out errors', () => {
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
