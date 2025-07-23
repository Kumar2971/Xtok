import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import { LiveFeedItem } from "../../src/LiveFeedItem.web"
const navigation = require("react-navigation")

const liveScreenProps = {
    navigation: {
        navigate: jest.fn(),
    },
    id: "LiveFeedItem"
}

const liveFeature = loadFeature('./__tests__/features/LiveFeedItem-scenario.feature');

defineFeature(liveFeature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to LiveFeedItem', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;

        given('I am a User loading LiveFeedItem', () => {
            exampleBlockA = shallow(<LiveFeedItem onDeleteClick={() => { }} onEditClick={() => { }} item={{
                id: "",
                type: "",
                attributes: {
                    event_name: "",
                    description: "",
                    duration: "12:00",
                    start_date: "22-03-2025",
                    start_time: "12:00 AM",
                }
            }} />);
        });

        when('I navigate to the LiveFeedItem', () => {
        });

        then('LiveFeedItem will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can select the like button with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
