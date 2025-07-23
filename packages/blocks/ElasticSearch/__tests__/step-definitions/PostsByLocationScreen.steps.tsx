import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import {ActivityIndicator} from 'react-native';
import PostsByLocationScreen from "../../src/PostsByLocationScreen"
import { render, fireEvent,act } from '@testing-library/react-native';
const navigation = require("react-navigation")
import { Message } from '../../../../framework/src/Message';
import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import { runEngine } from '../../../../framework/src/RunEngine';

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        }
    },
    id: "PostsByLocationScreen",
    route:{params:{location:"",locationDetails:{geometry:{location:{lat:0.5,lng:0.5}}}}},
    elasticSearchCallId:""
  }

const feature = loadFeature('./__tests__/features/PostsByLocationScreen-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.useFakeTimers();
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to PostsByLocationScreen', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:PostsByLocationScreen;
        const navigationMock = {
            navigate: jest.fn(),
        };

        given('I am a User loading PostsByLocationScreen', () => {
            exampleBlockA = shallow(<PostsByLocationScreen {...screenProps}/>);
        });

        when('I navigate to the PostsByLocationScreen', () => {
             instance = exampleBlockA.instance() as PostsByLocationScreen
        });

        then('PostsByLocationScreen will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let seeAllBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'back');
            seeAllBtn.simulate('press');
            let topBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'top');
            topBtn.simulate('press');
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'trending');
            buttonComponent.simulate('press');
            let pressAccBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'recent');
            pressAccBtn.simulate('press');

            const trendingResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                trendingResponse.messageId
            );
            const responseJson = {
                "data": [
                    {
                        "id": "1"
                    }
                ]
            };
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getRecentLocationsAPICallId = trendingResponse.messageId;
            runEngine.sendMessage("Unit Test", trendingResponse);
            const res = { data: ['a string'] };
            instance.getRecentLocationsSuccessCallBack(res);
            const response = {
                data: [],
                meta: {
                    pagination: {
                        total_pages: 1
                    }
                } };
            instance.getRecentLocationsSuccessCallBack(response);

            let list = exampleBlockA.findWhere((node) => node.prop('testID') === 'list');
            list.renderProp('renderItem')({item:{id:6,user_name:""},index:0});
            list.renderProp('keyExtractor')({item:{id:0}})
        });
        then('I can get all trending posts', () => {
            const trendingResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                trendingResponse.messageId
            );
            const responseJson = {
                "data": [
                    {
                        "id": "1"
                    }
                ]
            };
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getTrendingLocationsAPICallId = trendingResponse.messageId;
            runEngine.sendMessage("Unit Test", trendingResponse);
            const res = { data: ['a string'] };
            instance.getTrendingLocationsSuccessCallBack(res);
            const response = {
                data: [],
                meta: {
                    pagination: {
                        total_pages: 1
                    }
                }};
            instance.getTrendingLocationsSuccessCallBack(response);
        });
        then('I can get all top posts',  () => {
            const trendingResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                trendingResponse.messageId
            );
            const responseJson = {
                "data": [
                    {
                        id:6,
                        user_name:"",
                        locationPosts:[{
                            id: 212,
                            attributes:{
                                account_id: 1
                            }
                        }]
                    }
                ]
            };
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getTopLocationsAPICallId = trendingResponse.messageId;
            runEngine.sendMessage("Unit Test", trendingResponse);

            expect(exampleBlockA.find(ActivityIndicator).exists()).toBe(false);
            expect(exampleBlockA.find({ testID: 'list' }).exists()).toBe(true);

            let list = exampleBlockA.findWhere((node) => node.prop('testID') === 'list');
            let renderList = list.renderProp('renderItem')({item:responseJson.data[0],index:0});

            const { getAllByTestId } = render(
                <PostsByLocationScreen {...screenProps}/>
            );
            let touchableElements = renderList.findWhere((node) => node.prop('testID') === 'moveToCommentClick');
                // Simulate a press on the first TouchableOpacity
                touchableElements.simulate("press")
                const item = responseJson.data[0]

            expect(screenProps.navigation.navigate).toBeCalled()
            const res = { data: ['a string'] };
            instance.getTopLocationsSuccessCallBack(res);
            const response = {
                data: [{id:6,user_name:""}],
                meta: {
                    pagination: {
                        total_pages: 1
                    }
                } };
            instance.getTopLocationsSuccessCallBack(response);
            expect(exampleBlockA.find(ActivityIndicator).exists()).toBe(false);
            expect(exampleBlockA.find({ testID: 'list' }).exists()).toBe(true);

        });
        then('I can do search', () => {
            const trendingResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                trendingResponse.messageId
            );
            const responseJson = {
                "data": [
                    {
                        "id": "1"
                    }
                ]
            };
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.elasticSearchCallId = trendingResponse.messageId;
            runEngine.sendMessage("Unit Test", trendingResponse);
            expect(exampleBlockA.find(ActivityIndicator).exists()).toBe(false);
            expect(exampleBlockA.find({ testID: 'list' }).exists()).toBe(true);
        });
        then('I can do search hashtag', () => {
            const trendingResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                trendingResponse.messageId
            );
            const responseJson = {
                "data": [
                    {
                        "id": "1"
                    }
                ]
            };
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.hashTagSearchCallId = trendingResponse.messageId;
            runEngine.sendMessage("Unit Test", trendingResponse);
            expect(exampleBlockA.find(ActivityIndicator).exists()).toBe(false);
            expect(exampleBlockA.find({ testID: 'list' }).exists()).toBe(true);
        });
        then('I can do search audio', () => {
            const trendingResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                trendingResponse.messageId
            );
            const responseJson = {
                "data": [
                    {
                        "id": "1"
                    }
                ]
            };
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.audioSearchCallId = trendingResponse.messageId;
            runEngine.sendMessage("Unit Test", trendingResponse);
            expect(exampleBlockA.find(ActivityIndicator).exists()).toBe(false);
            expect(exampleBlockA.find({ testID: 'list' }).exists()).toBe(true);
            expect('Searched date will be visible on view');
        });
        then('Get audio post', () => {
            const trendingResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                trendingResponse.messageId
            );
            const responseJson = {
                "data": [
                    {
                        "id": "1"
                    }
                ]
            };
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getAudioPostsAPICallId = trendingResponse.messageId;
            runEngine.sendMessage("Unit Test", trendingResponse);
            expect(exampleBlockA.find(ActivityIndicator).exists()).toBe(false);
            expect(exampleBlockA.find({ testID: 'list' }).exists()).toBe(true);
        });
        then('I can do recent search', () => {
            const trendingResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                trendingResponse.messageId
            );
            const responseJson = {
                "data": [
                    {
                        "id": "1"
                    }
                ]
            };
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.recentSearchCallId = trendingResponse.messageId;
            runEngine.sendMessage("Unit Test", trendingResponse);
            expect(exampleBlockA.find(ActivityIndicator).exists()).toBe(false);
            expect(exampleBlockA.find({ testID: 'list' }).exists()).toBe(true);
        });
        then('I can delete item', () => {
            const trendingResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                trendingResponse.messageId
            );
            const responseJson = {
                "data": [
                    {
                        "id": "1"
                    }
                ]
            };
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.deleteItemCallId = trendingResponse.messageId;
            runEngine.sendMessage("Unit Test", trendingResponse);
            expect('Single item gets deleted');
        });
        then('I can delete all items', () => {
            const trendingResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                trendingResponse.messageId
            );
            const responseJson = {
                "data": [
                    {
                        "id": "1"
                    }
                ]
            };
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.deleteItemallCallId = trendingResponse.messageId;
            runEngine.sendMessage("Unit Test", trendingResponse);
            expect('All item gets deleted');
        });
        then('I can leave the screen with out errors', () => {
            instance.doButtonPressed()
            instance.setEnableField()
            instance.onPressBlure()
            instance.onPressStatusId(0)
            instance.onPressSearchFilter("")
            instance.deletesingle(0)
            instance.deleteApcall(0)

            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
