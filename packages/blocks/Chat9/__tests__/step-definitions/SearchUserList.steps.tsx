import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import SearchUserList from "../../src/SearchUserList"
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
    id: "SearchUserList"
}

const feature = loadFeature('./__tests__/features/SearchUserList-scenario.feature');

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
    jest.useFakeTimers();
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.spyOn(global, 'setTimeout').mockImplementation((cb:any) => cb() );
    });

    test('User navigates to SearchUserList', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: SearchUserList;

        given('I am a User loading SearchUserList', () => {
            exampleBlockA = shallow(<SearchUserList route={undefined} {...screenProps} />);
        });

        when('I navigate to the SearchUserList', () => {
            instance = exampleBlockA.instance() as SearchUserList
        });

        then('SearchUserList will load with out errors', () => {
           
        });


        then('i can backpress with out errors', () => {
            let wrapper = shallow(<SearchUserList route={undefined} {...screenProps} />)

            let textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'onSearchUser');
            textInputComponent.simulate('changeText',"ha")
            // textInputComponent.props().onChangeText(null);
            textInputComponent.props().onChangeText("asasd")
            let clearSearch = wrapper.findWhere((node) => node.prop('testID') === 'clearSearch');
            // expect(clearSearch.exists()).toBe(false);
            textInputComponent.props().onChangeText("golavi");
            let clearSearch2 = wrapper.findWhere((node) => node.prop('testID') === 'clearSearch');
            expect(clearSearch2.exists()).toBe(true);
            clearSearch2.simulate('press');
            let newTxtInput = wrapper.findWhere((node) => node.prop('testID') === 'onSearchUser');
            expect(newTxtInput.props().value).toBe("");
            // const mockItem = {
            //     attributes: {
            //         id: 1,
            //         message: 'Test message',
            //         created_at: '11/11/1999',
            //         account_id:1,
            //         attachments:[
            //             {
            //             id: 1,
            //             message: 'Test message',
            //             created_at: '11/11/1999',
            //             account_id:1
            //         },
            //         {
            //             id: 1,
            //             message: 'Test message',
            //             created_at: '11/11/1999',
            //             account_id:1
            //         }
            //         ]
            //     },
                
            // };
            // instance.renderItem(mockItem)
            let textInputComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'backBtn');
            textInputComponent2.simulate('press')
        });

      
        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
