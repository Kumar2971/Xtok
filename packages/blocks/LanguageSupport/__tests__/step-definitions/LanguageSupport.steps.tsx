import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import LanguageSupport from "../../src/LanguageSupport";
import { I18nManager } from "react-native"; 
import RNRestart from 'react-native-restart';
const navigation = require("react-navigation")
import * as utils from "../../../../framework/src/Utilities";

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
    id: "LanguageSupport"
} 

const feature = loadFeature('./__tests__/features/LanguageSupport-scenario.feature');

const mockgetStorageData = jest.spyOn(utils , "getStorageData")

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        mockgetStorageData.mockImplementation(() => {
            return Promise.resolve("ar")   
          })
 
    });  
    test('User navigates to LanguageSupport', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: LanguageSupport;

        given('I am a User loading LanguageSupport', () => {
            exampleBlockA = shallow(< LanguageSupport{...screenProps}/>);
        });

        when('I navigate to the LanguageSupport', () => {
            instance = exampleBlockA.instance() as LanguageSupport
        });

        then('LanguageSupport will load with out errors', () => {
            let buttonPress = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnGoBack');
            buttonPress.simulate('press') 
           let data ={
               item: {
                  id: 2,
                  name:'arabic',
                  ISOcode: 'ar',
                },
            }
  let  textInputComponent = exampleBlockA.findWhere(
            (node) => node.prop("testID") === "flatListFun"
          );
          textInputComponent.props().renderItem(data)
          textInputComponent.props().keyExtractor(1)
         

          let render_data = textInputComponent.renderProp("renderItem")(data)
         let  textInputComponent2 = render_data.findWhere(
            (node) => node.prop("testID") === "selectLanguageBtn"
          )
          textInputComponent2.props().onPress('ar') 
        });
     
       

         

        then('I can leave the screen with out errors', () => {
            let data1 ={
                item: {
                   id: 1,
                   name:'english',
                   ISOcode: 'en',
                 }
             }
            let  textInputComponentq = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "flatListFun"
              );
              textInputComponentq.props().renderItem(data1)
              textInputComponentq.props().keyExtractor(1)
            let  render_data2 = textInputComponentq.renderProp("renderItem")(data1)
            let textInputComponent3 = render_data2.findWhere(
            (node) => node.prop("testID") === "selectLanguageBtn"
          )
          textInputComponent3.props().onPress('en') 
            instance.componentWillUnmount()
           // expect(exampleBlockA).toBeTruthy();
        });
    });


});
