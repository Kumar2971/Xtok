import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import ElasticSearch from "../../src/ElasticSearch"
const navigation = require("react-navigation");
import {waitFor, render} from '@testing-library/react-native';
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        }
    },
    id: "ElasticSearch",
    route:{},
    elasticSearchCallId:""
  }

const feature = loadFeature('./__tests__/features/ElasticSearch-scenario.feature');

defineFeature(feature, (test) => {
    jest.useFakeTimers();
    // jest.spyOn(global, "setTimeout");

    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.spyOn(global, 'setTimeout').mockImplementation((cb:any) => cb() );
        jest.spyOn(global, 'clearTimeout').mockImplementation(() => {});
    });

    test('User navigates to ElasticSearch', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:ElasticSearch; 

        given('I am a User loading ElasticSearch', () => {
            exampleBlockA = shallow(<ElasticSearch {...screenProps}/>);
        });

        when('I navigate to the ElasticSearch', () => {
             instance = exampleBlockA.instance() as ElasticSearch
        });

        then('ElasticSearch will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            const newRender = render(<ElasticSearch {...screenProps}/>);
            const newMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
            newMessage.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              newMessage.messageId
            );
            newMessage.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                data : {
                    searches_history: [
                        {id:6,user_name:"",type:"account"},
                        {id:7,user_name:"",type:"hashtag"},
                        {id:8,user_name:"",type:"audio"},
                        {id:9,user_name:"",type:"location"},
                        {id:10,user_name:"",type:""}
                    ]
                }
              }
            );
            instance.recentSearchCallId = newMessage.messageId;
            runEngine.sendMessage("Unit Test", newMessage);
            let seeAllBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'seeAll');
            seeAllBtn.simulate('press');
            let clearAll = exampleBlockA.findWhere((node) => node.prop('testID') === 'clearAll');
            clearAll.simulate('press');
            let history = exampleBlockA.findWhere((node) => node.prop('testID') === 'recentHistory');
            const renderItemHistory = history.renderProp('renderItem')({item:{id:6,user_name:"username",type:"account",name:"name",photo:"photo.png",bio:"bio"},index:0});
            history.renderProp('renderItem')({item:{id:6,user_name:"",type:"account"},index:0});
            const renderHashTag = history.renderProp('renderItem')({item:{id:7,user_name:"",type:"hashtag"},index:1});
            const hashTagcrossBtn = renderHashTag.findWhere((node) => node.prop('testID') === 'crossBtn');
            hashTagcrossBtn.simulate('press')
            const renderAduioProp = history.renderProp('renderItem')({item:{id:8,user_name:"",type:"audio"},index:1});
            const audioCrossBtn = renderAduioProp.findWhere((node) => node.prop('testID') === 'crossBtn');
            audioCrossBtn.simulate('press')
            const renderLocationProp = history.renderProp('renderItem')({item:{id:9,user_name:"",type:"location"},index:1});
            const locationCrossBtn = renderLocationProp.findWhere((node) => node.prop('testID') === 'crossBtn');
            locationCrossBtn.simulate('press')

            exampleBlockA.update();
            let updateFlatList = exampleBlockA.findWhere((node) => node.prop('testID') === 'recentHistory');
            expect(updateFlatList.prop("data").length).toBe(2);
            


            const profileBtn = renderItemHistory.findWhere((node) => node.prop('testID') === 'profileBtn');
            profileBtn.simulate('press')
            const crossBtn = renderItemHistory.findWhere((node) => node.prop('testID') === 'crossBtn');
            crossBtn.simulate('press')
            let history1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'recentHistory');

            const renderItemHistory1 = history1.renderProp('renderItem')({item:{id:6,user_name:"username",type:"hashtag",name:"name",photo:"photo.png",bio:"bio"},index:0});
            const renderItemHistory2 = history.renderProp('renderItem')({item:{id:6,user_name:"",type:"audio",name:"name",photo:"photo.png",bio:"bio"},index:0});
            const hashtagBtn = renderItemHistory1.findWhere((node) => node.prop('testID') === 'hashtagBtn');
            hashtagBtn.simulate('press')
            const hashtagBtn1 = renderItemHistory2.findWhere((node) => node.prop('testID') === 'hashtagBtn');
            hashtagBtn1.simulate('press')
            const renderItemHistory3 = history.renderProp('renderItem')({item:{id:6,user_name:"",type:"location",latitude:"123456",longitude:"12345"},index:0});
            const locationBtn = renderItemHistory3.findWhere((node) => node.prop('testID') === 'locationBtn');
            locationBtn.simulate('press')
            history.props().keyExtractor({id: "0"})
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'search');
            textInputComponent.simulate('changeText', 'hello');
            textInputComponent.simulate("cancel")
            textInputComponent.simulate("focus")
            textInputComponent.simulate("submitEditing")
            textInputComponent.simulate('searchIcon')
            let clearAllBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'clearAll');
            // clearAllBtn.simulate('press');
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'backPress');
            buttonComponent.simulate('press');
            let pressAccBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'pressAcc');
            pressAccBtn.simulate('press',"account");

            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'search');
            let pressAudioBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'pressAudio');
            pressAudioBtn.simulate('press',"audio");

            const audioSearchCallMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.audioSearchCallId = audioSearchCallMessage.messageId;
            audioSearchCallMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), audioSearchCallMessage.messageId);
            audioSearchCallMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {audio:[{attributes:{id:"1", event_name:"event_name",description:"description",start_date:"12-02-2023"}}]})
            runEngine.sendMessage("Unit Test", audioSearchCallMessage)

            let audioDataList = exampleBlockA.findWhere((node) => node.prop('testID') === 'audioDataList');
            audioDataList.renderProp('renderItem')({ item: instance.state.backendData.audio[0], index: 0 })

            textInputComponent.simulate('changeText', 'songTitle');
            let pressTagBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'pressTag');
            pressTagBtn.simulate('press');
            textInputComponent.simulate('changeText', 'hashTag');
            let locationBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'location');
            locationBtn.simulate('press');
            textInputComponent.simulate('changeText', '');
            pressTagBtn.simulate('press');
            let list = exampleBlockA.findWhere((node) => node.prop('testID') === 'hashtag');
            waitFor(()=>{
                list.renderProp('renderItem')({item:{id:6,user_name:""},index:0});
                expect(list).toHaveLength(1);
                list.renderProp("onRefresh")();
                list.props().keyExtractor({id: "0"})
            })
            locationBtn.simulate('press');
            expect(instance.state.colorId).toBe("location");
        });

        then('I can leave the screen with out errors', () => {
            instance.contentsSharedBlocks({data:[{ source: 'src', views: 10, impressions: 0 }]})
            instance.doButtonPressed()
            instance.setEnableField()
            instance.getRecentLocations()
            instance.getTrendingLocations()

            instance.componentWillUnmount()
            instance.clearAll()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
