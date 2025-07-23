import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import * as utils from "../../../../framework/src/Utilities"

 import DataSaver from "../../src/settingOptions/dataSaver"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

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
    id: "DataSaver",
    route:{}
  }

const feature = loadFeature('./__tests__/features/DataSaver-scenario.feature');
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
        let wrapper= shallow(<DataSaver navigation={mockNavigation} route={undefined}/>);

    });

    test('User navigates to DataSaver', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:DataSaver; 
       // let dataSaverBlock:ShallowWrapper;
     //   let dataSaverInstance:DataSaver;

        given('I am a User loading DataSaver', () => {
            exampleBlockA = shallow(<DataSaver {...screenProps}/>);
        });

        when('I navigate to the DataSaver', () => {
             instance = exampleBlockA.instance() as DataSaver
        });

        then('DataSaver will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
            const response={"data": {"attributes": {"account": [Object], "data_saver_enabled": false, "mobile_data_restricted": false, "reduce_download_quality": false, "reduce_video_quality": false, "wifi_upload_only": false}, "id": "646", "type": "datasaver"}}
            const getSavedDataCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getSavedDataCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getSavedDataCall.messageId
            );
            getSavedDataCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                response
            );
            instance.getSavedDataCallId = getSavedDataCall.messageId;
            runEngine.sendMessage("Unit Test", getSavedDataCall);
            expect(response.data.type).toBe("datasaver")
        });

        then('I can enter text with out errors', () => {
            let settingsBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'settings');
            settingsBtn.simulate('press');
        });

        then('I can select the button with with out errors', () => {
            const spy = jest.spyOn(instance, 'toggleDataSaving');
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'save');
            buttonComponent.simulate('press');
            expect(spy).toHaveBeenCalled();

            let reduceQuality = exampleBlockA.findWhere((node) => node.prop('testID') === 'reduceQuality');
            reduceQuality.simulate('press');
            expect(spy).toHaveBeenCalled();

            let reduceQuality2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'ReduceDownloadQuality');
            reduceQuality2.simulate('press');
            expect(spy).toHaveBeenCalled();

            let Restricted = exampleBlockA.findWhere((node) => node.prop('testID') === 'Restricted');
            Restricted.simulate('press');
            expect(spy).toHaveBeenCalled();

            let Upload = exampleBlockA.findWhere((node) => node.prop('testID') === 'Upload');
            Upload.simulate('press');
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
