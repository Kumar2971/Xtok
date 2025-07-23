import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import * as utils from "../../../../framework/src/Utilities"
import React from "react";
import GoLaviCode from "../../src/settingOptions/goLaviCode"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        }
    },
    id: "GoLaviCode",
    route:{}
  }

const feature = loadFeature('./__tests__/features/GoLaviCode-scenario.feature');
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
        let wrapper= shallow(<GoLaviCode navigation={mockNavigation} route={undefined}/>);
    });

    test('User navigates to GoLaviCode', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:GoLaviCode; 

        given('I am a User loading GoLaviCode', () => {
            exampleBlockA = shallow(<GoLaviCode {...screenProps}/>);
        });

        when('I navigate to the GoLaviCode', () => {
             instance = exampleBlockA.instance() as GoLaviCode
        });

        then('GoLaviCode will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy(); 
            const response={"data": {"attributes": {"created_at": "2023-09-11T08:23:55.187Z", "current_user": [Object], "id": 296, "qr_code": "https://liketiktokapp-255799-ruby.b255799.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdDRiIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--19ddec21968017fbf9da828dbc32b92aaa2f4ae2/qr_code.png", "qrable_id": null, "qrable_type": null, "updated_at": "2023-09-11T08:23:55.272Z", "user_name": "Jaypatidar"}, "id": "296", "type": "qr_code"}}
            const getQRCodeCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getQRCodeCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getQRCodeCall.messageId
            );
            getQRCodeCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                response
            );
            instance.getQRCodeCallId = getQRCodeCall.messageId;
            runEngine.sendMessage("Unit Test", getQRCodeCall);
           expect(response.data.type).toBe("qr_code")
          
           let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'topHeader');
            textInputComponent.simulate('press');
            expect(screenProps.navigation.goBack).toHaveBeenCalled();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
