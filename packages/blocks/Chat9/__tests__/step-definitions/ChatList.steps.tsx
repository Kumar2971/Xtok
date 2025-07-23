import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { Dimensions } from "react-native"
import ChatList from "../../src/ChatList"

const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "ChatList"
}

const feature = loadFeature('./__tests__/features/ChatList-scenario.feature');

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

    test('User navigates to ChatList', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: ChatList;

        given('I am a User loading ChatList', () => {
            exampleBlockA = shallow(<ChatList navigation={undefined} id={""} route={undefined}/>);
            

        });

        when('I navigate to the ChatList', () => {
            instance = exampleBlockA.instance() as ChatList
            // instance.audioNavigationFunction()
            
        });

        then('ChatList will load with out errors', () => {
            const item = {
                item: {
                  attributes: {
                    friend_account: [
                      {
                        data: {
                          attributes: {
                            photo: 'https://example.com/photo.jpg',
                            full_name: 'John Doe',
                          },
                        },
                      },
                    ],
                    last_message: {
                      attributes: {
                        attachment_type: null,
                        message: 'Hello, how are you?',
                      },
                    },
                  },
                },
              };
          
    let navigationMock={
        goBack:jest.fn(),
        navigate:jest.fn(),
        addListener:jest.fn()
    }
        exampleBlockA = shallow(<ChatList navigation={navigationMock} id={""} route={undefined}/>);
       let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'touchableOpacity');
        textInputComponent.props().onPress()
        expect(navigationMock.goBack).toHaveBeenCalled();
         
        // textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'audioNavigationFunctionbtn');
        // textInputComponent.props().onPress()
        // expect(navigationMock.navigate).toHaveBeenCalled();

        textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'navigationFunctionBtn');
        textInputComponent.props().onPress()
        expect(navigationMock.navigate).toHaveBeenCalled();
        
        instance.renderItem(item)
        instance.setState({ loading: true })
        
        // textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'chatNavigationFunctionBTn');
        // textInputComponent.props().onPress('')
        });

      
         
        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
