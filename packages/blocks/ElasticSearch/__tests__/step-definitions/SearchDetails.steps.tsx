import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import SearchDetails from "../../src/SearchDetails"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        }
    },
    id: "SearchDetails",
    route:{},
    elasticSearchCallId:""
  }

const feature = loadFeature('./__tests__/features/SearchDetails-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to SearchDetails', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:SearchDetails;

        given('I am a User loading SearchDetails', () => {
            exampleBlockA = shallow(<SearchDetails {...screenProps}/>);
        });

        when('I navigate to the SearchDetails', () => {
             instance = exampleBlockA.instance() as SearchDetails
        });

        then('SearchDetails will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let seeAllBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'back');
            seeAllBtn.simulate('press');
            let list = exampleBlockA.findWhere((node) => node.prop('testID') === 'list');
            list.renderProp('renderItem')({item:{id:6,user_name:""},index:0});
            list.renderProp('ItemSeparatorComponent')
            let topBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'top');
            topBtn.simulate('press');
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'trending');
            buttonComponent.simulate('press');
            let pressAccBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'recent');
            pressAccBtn.simulate('press');
        });

        then('I can leave the screen with out errors', () => {
            instance.doButtonPressed()
            instance.setEnableField()

            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
