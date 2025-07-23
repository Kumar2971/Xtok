import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import ContentPreferences from "../../src/settingOptions/contentPreferences"
import * as utils from "../../../../framework/src/Utilities"

// import DataSaver from "../../src/settingOptions/dataSaver"

const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        addListener: {
            focus:jest.fn()
        },
        state: {
        }
    },
    id: "ContentPreferences",
    route:{}
  }

const feature = loadFeature('./__tests__/features/ContentPreferences-scenario.feature');
const mockgetStorageData = jest.spyOn(utils, "getStorageData")
defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        mockgetStorageData.mockImplementation(() => {
            return Promise.resolve("ar")
        })
        const mockNavigation={
            addListener:(event:any,callback:any)=>{
                if(event === 'focus'){
                    callback();
                }
            }
        } 
        let wrapper= shallow(<ContentPreferences navigation={mockNavigation} route={undefined}/>);

    });

    test('User navigates to ContentPreferences', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:ContentPreferences; 
      

        given('I am a User loading ContentPreferences', () => {
            exampleBlockA = shallow(<ContentPreferences {...screenProps}/>);
        });

        when('I navigate to the ContentPreferences', () => {
             instance = exampleBlockA.instance() as ContentPreferences
        });

        then('ContentPreferences will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
        });

        then('I can select the button with with out errors', () => {
          let topHeaderBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'topHeader');
          topHeaderBtn.simulate('press');
          let Btn = exampleBlockA.findWhere((node) => node.prop('testID') === 'onPressItem');
          Btn.simulate('press');
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
