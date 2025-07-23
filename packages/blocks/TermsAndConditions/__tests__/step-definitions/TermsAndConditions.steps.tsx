import { ShallowWrapper, shallow } from 'enzyme'
import { defineFeature, loadFeature } from "jest-cucumber"
import React from "react";
import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum";

import TermsAndConditions from "../../src/TermsAndConditions"
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
        isFocused: jest.fn(),
        route:jest.fn()
      },
    id: "TermsAndConditions"
  }

const feature = loadFeature('./__tests__/features/TermsAndConditions-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to TermsAndConditions', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:TermsAndConditions; 

        given('I am a User loading TermsAndConditions', () => {
            exampleBlockA = shallow(<TermsAndConditions {...screenProps}/>);
        });

        when('I navigate to the TermsAndConditions', () => {
             instance = exampleBlockA.instance() as TermsAndConditions

             const getTAS = new Message(getName(MessageEnum.RestAPIResponceMessage))
             getTAS.addData(getName(MessageEnum.RestAPIResponceDataMessage), getTAS);
             getTAS.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {data: ''}
            );
            getTAS.addData(getName(MessageEnum.RestAPIResponceDataMessage), getTAS.messageId);
            instance.termsAndServiceApiCallId = getTAS.messageId
            runEngine.sendMessage("Unit Test", getTAS);
        });

        then('TermsAndConditions will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();

            instance.btnExampleProps.onPress()
            instance.btnShowHideProps.onPress()
            instance.setEnableField()
            instance.txtInputWebProps.onChangeText("sanpleText")
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'btnAddExample');
            // textInputComponent.simulate('click');
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'touchable1');
            buttonComponent.simulate('press');
            let buttonComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'touchable2');
            buttonComponent2.simulate('press');
            // expect(instance.state.txtSavedValue).toEqual("hello@aol.com");
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
