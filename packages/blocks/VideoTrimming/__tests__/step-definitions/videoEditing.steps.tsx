import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import * as utils from '../../../../components/src/Utilities'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import VideoEditing from "../../src/videoEditing"
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
    id: "videoEditing",
    route:{}
  }

const feature = loadFeature('./__tests__/features/audio-scenario.feature');

const valueAudio = {"album": "YouTube Audio Library", "artist": "Kevin MacLeod", "audio": `${utils.returnS3URL()}/minio/sbucket/ymsy86f3yag922dydq9daf3da0pg`, "created_at": "2023-03-30T11:29:29.540Z", "genre": null, "id": 59, "image": null, "title": "Impact Moderato"}

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to VideoTrimming', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:VideoEditing;

        given('I am a User loading VideoTrimming', () => {
            exampleBlockA = shallow(<VideoEditing {...screenProps}/>);
        });

        when('I navigate to the VideoTrimming', () => {
             instance = exampleBlockA.instance() as VideoEditing

             const getFilteredList = new Message(getName(MessageEnum.RestAPIResponceMessage))
             getFilteredList.addData(getName(MessageEnum.RestAPIResponceDataMessage), getFilteredList);
             getFilteredList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {}
            );
            getFilteredList.addData(getName(MessageEnum.RestAPIResponceDataMessage), getFilteredList.messageId);
            instance.getFilteredListCallId = getFilteredList.messageId
            runEngine.sendMessage("Unit Test", getFilteredList);


            const getMatchingUsers = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getMatchingUsers.addData(getName(MessageEnum.RestAPIResponceDataMessage), getMatchingUsers);
            getMatchingUsers.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
               {}
           );
           getMatchingUsers.addData(getName(MessageEnum.RestAPIResponceDataMessage), getMatchingUsers.messageId);
           instance.getMatchingUsersCallId = getMatchingUsers.messageId
           runEngine.sendMessage("Unit Test", getMatchingUsers);


           const getAllAudios = new Message(getName(MessageEnum.RestAPIResponceMessage))
           getAllAudios.addData(getName(MessageEnum.RestAPIResponceDataMessage), getAllAudios);
            getAllAudios.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
               {}
           );
           getAllAudios.addData(getName(MessageEnum.RestAPIResponceDataMessage), getAllAudios.messageId);
           instance.getAllAudiosCallId = getAllAudios.messageId
           runEngine.sendMessage("Unit Test", getAllAudios);
        });

        then('VideoTrimming will load with out errors', () => {
            let touchableComponent = exampleBlockA.findWhere((node) => node.prop('testID') == 'canvas');
            touchableComponent.simulate('press');
        });

        then('I can enter text with out errors', () => {
            let sortBtn = exampleBlockA.findWhere((node) => node.prop('testID') == 'sort');
            // sortBtn.simulate('press');
        });

        then('I can select the button with with out errors', () => {
            instance.setState({filterType : "sort"})
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'setAdd');
            buttonComponent.simulate('press');
        });

        then('I can test flatlist data', () => {
            let touchableComponent = exampleBlockA.findWhere((node) => node.prop('testID') == 'speed');
            touchableComponent.simulate('press');
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
