import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from 'framework/src/Helpers'
import {runEngine} from 'framework/src/RunEngine'
import {Message} from "framework/src/Message"

import MessageEnum, {getName} from "framework/src/Messages/MessageEnum"; 
import React from "react";
import AmazonInteractiveVideoService from "../../src/AmazonInteractiveVideoService.web"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "AmazonInteractiveVideoService",
    route: { params: { stageData:undefined }},
  }

const feature = loadFeature('./__tests__/features/AmazonInteractiveVideoService-scenario.web.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AmazonInteractiveVideoService', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:AmazonInteractiveVideoService; 

        given('I am a User loading AmazonInteractiveVideoService', () => {
            exampleBlockA = shallow(<AmazonInteractiveVideoService {...screenProps}/>)
        });

        when('I navigate to the AmazonInteractiveVideoService', () => {
             instance = exampleBlockA.instance() as AmazonInteractiveVideoService
        });

        then('AmazonInteractiveVideoService will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy()
        });
    });


});
