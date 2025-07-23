import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import LiveEvent from "../../src/LiveEvent"
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";
import * as utils from "../../../../framework/src/Utilities";
const navigation = require("react-navigation")

  const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        }
    },
    id: "LiveEvent",
    route:{},
    scheduleLiveEventApiCallId:"",
    getEventListApiCallId:""
  }

  const mockgetStorageData = jest.spyOn(utils, "getStorageData")


const feature = loadFeature('./__tests__/features/LiveEvent-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        mockgetStorageData.mockImplementation(() => {
            return Promise.resolve("ar")
        })
        jest.useFakeTimers();
    });
    test('User navigates to LiveEvent', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:LiveEvent; 

        given('I am a User loading LiveEvent', () => {
            exampleBlockA = shallow(<LiveEvent {...screenProps}/>);
        });

        when('I navigate to the LiveEvent', () => {
             instance = exampleBlockA.instance() as LiveEvent
        });

        then('LiveEvent will load with out errors', () => {
            const getEventListApiMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.getEventListApiCallId = getEventListApiMessage.messageId;
            getEventListApiMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getEventListApiMessage.messageId);
            getEventListApiMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{data:[{attributes:{id:"1", event_name:"event_name",description:"description",start_date:"12-02-2023"}}]})
            runEngine.sendMessage("Unit Test", getEventListApiMessage)

            const getEndEventListApiMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.geteventEndlistApiCallId = getEndEventListApiMessage.messageId;
            getEndEventListApiMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getEndEventListApiMessage.messageId);
            getEndEventListApiMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data:[{attributes:{id:"1", event_name:"event_name",description:"description",start_date:"12-02-2023"}}]})
            runEngine.sendMessage("Unit Test", getEndEventListApiMessage)

            expect(exampleBlockA).toBeTruthy();
        });

        then('I can select the button with with out errors', () => {            
            const eventList = exampleBlockA.findWhere(
              (node) => node.prop("testID") === "eventList"
            );
    
            eventList.props().keyExtractor({}, 3);
            const flatlistIdRender = eventList.renderProp('renderItem')({ item: instance.state.eventList[0], index: 0 })
            let eventBtn1 = flatlistIdRender.findWhere((node) => node.prop('testID') === 'eventBtn');
            eventBtn1.simulate('press');
            eventList.renderProp("ListEmptyComponent")();
            eventList.renderProp("ListHeaderComponent")();

            const endeventList = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "endeventList"
              );
      
            endeventList.props().keyExtractor({}, 3);
            endeventList.renderProp("ListEmptyComponent")();

            const flatlistRenderEventList = endeventList.renderProp('renderItem')({ item: instance.state.endeventList[0], index: 0 })
            let eventBtn = flatlistRenderEventList.findWhere((node) => node.prop('testID') === 'eventBtn');
            eventBtn.simulate('press');
            let openEventModal = exampleBlockA.findWhere((node) => node.prop('testID') === 'openEventModal');

            let deleteBtn = flatlistRenderEventList.findWhere((node) => node.prop('testID') === 'deleteBtn');
            deleteBtn.simulate('press');

            const deleteEventListApiMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.deleteEventListApiCallId = deleteEventListApiMessage.messageId;
            deleteEventListApiMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteEventListApiMessage.messageId);
            deleteEventListApiMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{data:[{attributes:{id:"1", event_name:"event_name",description:"description",start_date:"12-02-2023"}}]})
            runEngine.sendMessage("Unit Test", deleteEventListApiMessage)
            endeventList.renderProp("ListHeaderComponent")();

            let backBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'backBtn');
            backBtn.simulate('press');

            let scheduleLiveBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'scheduleLiveBtn');
            scheduleLiveBtn.simulate('press');
            let scheduleModal = exampleBlockA.findWhere((node) => node.prop('testID') === 'scheduleModal');
            scheduleModal.props().onBackButtonPress();
            expect(scheduleModal.props().isVisible).toBe(true)

            let topicTextInput = scheduleModal.findWhere((node) => node.prop('testID') === 'topicTextInput');
            topicTextInput.simulate("changeText", "topic");
            expect(topicTextInput.props().value).toBe("")

            let descTextInput = scheduleModal.findWhere((node) => node.prop('testID') === 'descTextInput');
            descTextInput.simulate("changeText", "topic");
            expect(descTextInput.props().value).toBe("")

            let calenderBtn = scheduleModal.findWhere((node) => node.prop('testID') === 'calenderBtn');
            calenderBtn.simulate("press");
            let calenderModal = scheduleModal.findWhere((node) => node.prop('testID') === 'calenderModal');
            expect(calenderModal.props().isVisible).toBe(false)

            let timePickerBtn = scheduleModal.findWhere((node) => node.prop('testID') === 'timePickerBtn');
            timePickerBtn.simulate("press");
            let hourInput = timePickerBtn.findWhere((node) => node.prop('testID') === 'hourInput');
            hourInput.simulate("changeText", "01");
            hourInput.simulate("changeText", "");
            // expect(hourInput.props().value).toBe("1")

            let minutInput = timePickerBtn.findWhere((node) => node.prop('testID') === 'minutInput');
            minutInput.simulate("changeText", "30");
            minutInput.simulate("changeText", "");
            let AMBtn = scheduleModal.findWhere((node) => node.prop('testID') === 'AMBtn');
            AMBtn.simulate("press");

            let PMBtn = scheduleModal.findWhere((node) => node.prop('testID') === 'PMBtn');
            PMBtn.simulate("press");

            let durationBtn = scheduleModal.findWhere((node) => node.prop('testID') === 'durationBtn');
            durationBtn.simulate("press");

            let durationHourInput = durationBtn.findWhere((node) => node.prop('testID') === 'durationHourInput');
            durationHourInput.simulate("changeText", "01");
            durationHourInput.simulate("changeText", "");
            expect(durationHourInput.props().value).toBe("")

            let durationMinuteInput = durationBtn.findWhere((node) => node.prop('testID') === 'durationMinuteInput');
            durationMinuteInput.simulate("changeText", "01");
            durationMinuteInput.simulate("changeText", "");
            expect(durationMinuteInput.props().value).toBe("")

            let scheduleSubmitBtn = scheduleModal.findWhere((node) => node.prop('testID') === 'scheduleSubmitBtn');
            scheduleSubmitBtn.simulate("press");

            let closeModalBtn = scheduleModal.findWhere((node) => node.prop('testID') === 'closeModalBtn');
            closeModalBtn.simulate("press");
            expect(scheduleModal.props().isVisible).toBe(true)

        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});