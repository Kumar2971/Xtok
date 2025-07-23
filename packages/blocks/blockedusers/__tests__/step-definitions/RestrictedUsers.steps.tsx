import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import RestrictedUsers from "../../src/Restrictedusers";
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
        state: { params: {} },
        dispatch: jest.fn(),
        goBack: jest.fn(),
        dismiss: jest.fn(),
        navigate: jest.fn(),
        openDrawer: jest.fn(),
        closeDrawer: jest.fn(),
        toggleDrawer: jest.fn(),
        getParam: jest.fn(),
        setParams: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
        pop: jest.fn(),
        popToTop: jest.fn(),
        isFocused: jest.fn()
    },
    id: "Ristrictedusers"
}

const feature = loadFeature('./__tests__/features/RestrictedUsers-scenario.feature');

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to RestrictedUsers', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: RestrictedUsers;

        given('I am a User loading RestrictedUsers', () => {
            exampleBlockA = shallow(<RestrictedUsers {...screenProps} />);
        });

        when('I navigate to the RestrictedUsers', () => {
            instance = exampleBlockA.instance() as RestrictedUsers
        });

        then('RestrictedUsers will load with out errors', () => {

            let buttonPress = exampleBlockA.findWhere((node) => node.prop('testID') === 'privacySafetyKey');
            buttonPress.simulate('press')
            // let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnViewBlockeduserTxt');
            // textInputComponent.simulate("press")
            instance.topHeaderSettings()
            let data={
                item:{
                    attributes:{
                        account:{
                        user_name:"abc"}
                    }
                },
                index:1
            }
            instance.renderItem(data)
            instance.unrestrict
            instance.getRestrictedUsers
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
