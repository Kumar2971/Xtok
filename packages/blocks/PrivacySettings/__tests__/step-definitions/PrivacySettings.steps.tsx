import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import {Platform}from 'react-native'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import PrivacySettings from "../../src/PrivacySettings"
import {upVoteGrey} from '../../src/assets' 
import * as utils from "../../../../framework/src/Utilities"
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
const navigation = require("react-navigation")

const screenProps = {
    navigation:{
        navigate:jest.fn()
    },
    id: "PrivacySettings"
  } 

 

const feature = loadFeature('./__tests__/features/PrivacySettings-scenario.feature');
 
 const mockgetStorageData =jest.spyOn(utils,"getStorageData")
defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
         mockgetStorageData.mockImplementation(()=>{
            return Promise.resolve("ar")
         })

    });

    test('User navigates to PrivacySettings', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:PrivacySettings; 

        given('I am a User loading PrivacySettings', () => {
            const AccoutLoginAPI=  new Message(
                getName(MessageEnum.AccoutLoginSuccess)
             );
             runEngine.sendMessage("Unit test",AccoutLoginAPI)

            exampleBlockA = shallow(<PrivacySettings {...screenProps}/>);
        });

        when('I navigate to the PrivacySettings', () => {
             instance = exampleBlockA.instance() as PrivacySettings
        });

        then('PrivacySettings will load with out errors', () => { 
            let textInputComponent2=exampleBlockA.findWhere(
                (node)=>node.prop("testID")==="profile"
                )
             textInputComponent2.props().onPress()  
              
             const AccoutLoginAPI=  new Message(
                getName(MessageEnum.AccoutLoginSuccess)
             );
             instance.receive("",new Message(
                getName(MessageEnum.AccoutLoginSuccess)
             ))
         
              
            

        });
        then('Render one of the privacy settings without errors', () => {
            const payload = {
                item:{
                    title:'PrivacySettings',
                    image:upVoteGrey,
                    url:'url',
                    disable:false
                }
            }
    
        
        
            let textInputComponent=exampleBlockA.findWhere(
                (node)=>node.prop("testID")==="flatListId"
                );   
                textInputComponent.forEach((textInputComponent)=>{
                    textInputComponent.props().renderItem(payload) 
                    textInputComponent.props().keyExtractor(1)
                    let render_Data=textInputComponent.renderProp("renderItem")(payload)
                    let textInputComponent2=render_Data.findWhere(
                        (node)=>node.prop("testID")==="onPressRenderItem"
                        )
                        textInputComponent2.props().onPress()
                }
                )
            
            
           
        });
        then('Render one of the privacy settings item without errors', () => {
            const payload = {
                    title:'PrivacySettings',
                    image:upVoteGrey,
                    url:'url',
                    disable:false,
                    language:'en',
                    props:{
                        navigation:{
                            navigate:jest.fn()
                        }
                    }
            }
            // instance.Item(payload)
            //expect(item).toBeTruthy();
         });
        then('Change state language from Arabic to English', () => {
           
            instance.setState({
                language:'ar'
            })
            expect(exampleBlockA).toBeTruthy();
        });
        then('Change state language from English to Arabic', () => {
            instance.setState({
                language:'en'
            })
            expect(exampleBlockA).toBeTruthy();
        });
        then('Mock OS as iOS', () => {
            instance.setState({
                language:'ar'
            },()=>{
                Platform.OS = 'ios'
            })
            
            expect(exampleBlockA).toBeTruthy();
        });
        then('Mock OS as Android', () => {
            instance.setState({
                language:'ar'
            },()=>{
                Platform.OS = 'android'
            })
            expect(exampleBlockA).toBeTruthy();
        });
        

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
