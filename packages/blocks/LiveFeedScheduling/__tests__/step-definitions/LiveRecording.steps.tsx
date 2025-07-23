import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import LiveRecording from "../../src/LiveRecording"
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";
import * as utils from "../../../../framework/src/Utilities";
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
      goBack: jest.fn(),
      dismiss: jest.fn(),
      navigate: jest.fn(),
      addListener: jest.fn().mockImplementation((event, callback) => {
          callback();
          return {
             remove: jest.fn(),
             willFocus: jest.fn()
          }
        }),
    },
      id: "LiveRecording",
      route:{},
      scheduleLiveEventApiCallId:"",
      getEventListApiCallId:""
  }

  const mockgetStorageData = jest.spyOn(utils, "getStorageData")


const feature = loadFeature('./__tests__/features/LiveRecording-scenario.feature');
const responseSuccess_Data = {
    "data": [
        {
            "id": 6653,
            "name": "Thefirst",
            "arn": "arn:aws:ivs:ap-south-1:621966568940:stage/O127YpY4Axmt",
            "created_by": 887,
            "status": "inactive",
            "created_at": "2023-10-23T10:36:42.463Z",
            "updated_at": "2023-10-23T10:36:59.253Z",
            "is_challenge": false,
            "duration": null,
            "title": "The first one ",
            "topic": "E go ",
            "type_of_challenge": null,
            "is_allow_comment": true,
            "profile_photo": "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/bsy3uko7ob971b8proslrj1b84ws",
            "recording_link": "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/zawhxjs7r6h0diwz56astz5lyhic"
        },
        {
            "id": 7239,
            "name": "What",
            "arn": "arn:aws:ivs:ap-south-1:621966568940:stage/9YdJ2QKfMFHk",
            "created_by": 887,
            "status": "inactive",
            "created_at": "2023-11-06T18:01:11.566Z",
            "updated_at": "2023-11-06T18:01:43.987Z",
            "is_challenge": false,
            "duration": null,
            "title": "What ",
            "topic": "I ",
            "type_of_challenge": null,
            "is_allow_comment": true,
            "profile_photo": "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/bsy3uko7ob971b8proslrj1b84ws",
            "recording_link": "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/mr8bdfmult9xdqwh1yk5f1p93x8u"
        }
    ],
    "pagination": {
        "prev_page": null,
        "current_page": 1,
        "next_page": null,
        "total_pages": 1,
        "total_count": 2
    }
}
defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        mockgetStorageData.mockImplementation((key) => {
            if("SelectedLng" === key) return Promise.resolve("ar")
            else return Promise.resolve("766")
        })
        jest.useFakeTimers();
    });
    test('User navigates to LiveRecording', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:LiveRecording; 

        given('I am a User loading LiveRecording', () => {
            exampleBlockA = shallow(<LiveRecording {...screenProps}/>);
        });

        when('I navigate to the LiveRecording', () => {
             instance = exampleBlockA.instance() as LiveRecording
        });

        then('LiveRecording will load with out errors', () => {
            const getrecordinglistApiMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.getrecordinglistApiCallId = getrecordinglistApiMessage.messageId;
            getrecordinglistApiMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getrecordinglistApiMessage.messageId);
            getrecordinglistApiMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),responseSuccess_Data)
            runEngine.sendMessage("Unit Test", getrecordinglistApiMessage)

            expect(exampleBlockA).toBeTruthy();
        });

        then('I can load record list', () => {     
            let goBack = exampleBlockA.findWhere((node) => node.prop('testID') === 'goBack');
            goBack.simulate('press');    

            const recordList = exampleBlockA.findWhere(
              (node) => node.prop("testID") === "recordList"
            );
    
            recordList.props().keyExtractor({}, 3);
            const flatlistIdRender = recordList.renderProp('renderItem')({ item: responseSuccess_Data.data[0], index: 0 })
            let showVideoBtn = flatlistIdRender.findWhere((node) => node.prop('testID') === 'showVideoBtn');
            showVideoBtn.simulate('press');
            recordList.renderProp("ListEmptyComponent")();
            recordList.renderProp("ListHeaderComponent")();
            recordList.renderProp("onEndReached")();
            
          
            let VideoID = exampleBlockA.findWhere((node) => node.prop('testID') === 'VideoID');
            VideoID.renderProp("onLoad")();
            VideoID.renderProp("onLoadStart")();

            let crossIcon = exampleBlockA.findWhere((node) => node.prop('testID') === 'crossIcon');
            crossIcon.simulate('press');

        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });
    test('User navigates to LiveRecording with empty List', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:LiveRecording; 

        given('I am a User loading LiveRecording', () => {
            exampleBlockA = shallow(<LiveRecording {...screenProps}/>);
        });

        when('I navigate to the LiveRecording', () => {
             instance = exampleBlockA.instance() as LiveRecording
        });

        then('LiveRecording will load with out errors', () => {
            const getrecordinglistApiMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.getrecordinglistApiCallId = getrecordinglistApiMessage.messageId;
            getrecordinglistApiMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getrecordinglistApiMessage.messageId);
            getrecordinglistApiMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{errors:"errors"})
            runEngine.sendMessage("Unit Test", getrecordinglistApiMessage)

            expect(exampleBlockA).toBeTruthy();
        });

        then('I can load record list', () => {     
            const recordList = exampleBlockA.findWhere(
              (node) => node.prop("testID") === "recordList"
            );
    
            recordList.props().keyExtractor({}, 3);
            const flatlistIdRender = recordList.renderProp('renderItem')({ item: responseSuccess_Data.data[0], index: 0 })
            let showVideoBtn = flatlistIdRender.findWhere((node) => node.prop('testID') === 'showVideoBtn');
            showVideoBtn.simulate('press');
            recordList.renderProp("ListEmptyComponent")();
            recordList.renderProp("ListHeaderComponent")();
            recordList.renderProp("onEndReached")();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

});