import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { Dimensions } from "react-native"
import ImageScreen from "../../src/ImageScreen"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
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
        addListener: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
        pop: jest.fn(),
        popToTop: jest.fn(),
        isFocused: jest.fn()
    },
    id: "ImageScreen"
}

const feature = loadFeature('./__tests__/features/ImageScreen-scenario.feature');

let message: Message = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
)

message.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    {
        data: []
    }
)

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to ImageScreen', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: ImageScreen;

        given('I am a User loading ImageScreen', () => {
            exampleBlockA = shallow(<ImageScreen route={undefined} {...screenProps} />);
        });

        when('I navigate to the ImageScreen', () => {
            instance = exampleBlockA.instance() as ImageScreen
        });

        then('ImageScreen will load with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'onPressBack');
            textInputComponent.simulate('press')
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
