import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import LiveFeedScheduling from "../../src/LiveFeedScheduling"
const navigation = require("react-navigation")

  const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        }
    },
    id: "LiveFeedScheduling",
    route:{},
    scheduleLiveEventApiCallId:"",
    getEventListApiCallId:""
  }

const feature = loadFeature('./__tests__/features/LiveFeedScheduling-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to LiveFeedScheduling', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:LiveFeedScheduling; 

        given('I am a User loading LiveFeedScheduling', () => {
            exampleBlockA = shallow(<LiveFeedScheduling {...screenProps}/>);
        });

        when('I navigate to the LiveFeedScheduling', () => {
             instance = exampleBlockA.instance() as LiveFeedScheduling
        });

        then('LiveFeedScheduling will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can select the button with with out errors', () => {
            let liveBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'liveBtn');
            liveBtn.simulate('press');
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});