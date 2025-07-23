import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import * as utils from '../../../../components/src/Utilities'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import AudioScreen from "../../src/audio"
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
    id: "audio",
    route: Function
  }

const feature = loadFeature('./__tests__/features/audio-scenario.feature');

const valueAudio = {"album": "YouTube Audio Library", "artist": "Kevin MacLeod", "audio": `${utils.returnS3URL()}/minio/sbucket/ymsy86f3yag922dydq9daf3da0pg`, "created_at": "2023-03-30T11:29:29.540Z", "genre": null, "id": 59, "image": null, "title": "Impact Moderato"}

defineFeature(feature, (test) => {
jest.useFakeTimers();

    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.spyOn(global, 'setTimeout').mockImplementation((cb:any) => cb() );
    });

    test('User navigates to VideoTrimming', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:AudioScreen;

        given('I am a User loading VideoTrimming', () => {
            exampleBlockA = shallow(<AudioScreen {...screenProps}/>);
        });

        when('I navigate to the VideoTrimming', () => {
             instance = exampleBlockA.instance() as AudioScreen

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
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let touchableComponent = exampleBlockA.findWhere((node) => node.prop('testID') == 'backBtn');
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') == 'searchInput');
            textInputComponent.simulate('changeText', 'hello@aol.com');
            textInputComponent.simulate('changeText', 'he');
            touchableComponent.simulate('press');
            instance.getAllAudios()
            instance.setInputValue('sample')
            instance.setEnableField()
            instance.btnExampleProps.onPress()
            instance.btnShowHideProps.onPress()
            instance.txtInputWebProps.onChangeText('sample')
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === '2');
            console.debug("Point ==", instance.state.audioTab)
            // instance.setState({ audioTab: 2 })
            buttonComponent.simulate('press');
            console.debug("Point ==", instance.state.audioTab)
            instance.decideApiCall()
            instance.setState({ audioTab: 3 })
            // expect(instance.state.txtSavedValue).toEqual("hello@aol.com");
        });

        then('I can test flatlist data', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'flatlist1');
            textInputComponent.renderProp("renderItem")({ item: valueAudio })
            textInputComponent.props().keyExtractor({}, 0)
            instance.Item({ valueAudio })
            instance.setState({ audioTab: 2 })
            instance.Item({ valueAudio })
            instance.setState({ audioTab: 3 })
            console.debug('HERE ****', instance.Item({ valueAudio }).props.children[0].props.onPress());
            console.debug('HERE ####', instance.Item({ valueAudio }).props.children[1].props.onPress());
            // let touchableComponent = exampleBlockA.findWhere((node) => node.prop('testID') == 'playPauseBtn');
            // touchableComponent.simulate('press');
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
