import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import HashTagScreen from "../../src/HashTagScreen"
import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import { Message } from '../../../../framework/src/Message';
import { fireEvent, render } from '@testing-library/react-native';
import { runEngine } from '../../../../framework/src/RunEngine';
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        },
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
    },
    id: "HashTagScreen",
    route: { params: { data: { posts: 1 } } },
    elasticSearchCallId: ""
}

const screenPropsWithMorePosts = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        },
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
    },
    id: "HashTagScreen",
    route: { params: { data: { posts: 5 } } },
    elasticSearchCallId: ""
}

const feature = loadFeature('./__tests__/features/HashTagScreen-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.useFakeTimers();
    });

    test('User navigates to HashTagScreen', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:HashTagScreen;

        given('I am a User loading HashTagScreen', () => {
            exampleBlockA = shallow(<HashTagScreen {...screenPropsWithMorePosts}/>);
        });

        when('I navigate to the HashTagScreen', () => {
             instance = exampleBlockA.instance() as HashTagScreen
        });

        then('HashTagScreen will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let seeAllBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'backPrs');
            seeAllBtn.simulate('press');
            let topBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'hideKey');
            topBtn.simulate('press');
            let list = exampleBlockA.findWhere((node) => node.prop('testID') === 'listtop');
            list.renderProp('renderItem')({item:{id:6,user_name:""},index:0});
            list.renderProp('keyExtractor')({item:{id:0}})
            // Simulate onRefresh
            list.props().onRefresh();
            // instance.setState({topPageNumber:1, topLastPage:2})
            // Render the TouchableOpacity
            const renderedItem = instance.renderItem({ item: {id:6,user_name:""},index:0});

            // Find TouchableOpacity by testID and simulate onPress
            const touchableOpacity = shallow(renderedItem).find({ testID: 'renderItemPress' });
            touchableOpacity.simulate('press');

            // const renderItemInstance = list.prop('renderItem');
            // const renderedItemData = shallow(renderItemInstance({ item: {id:6,user_name:""},index:0 }));


            // const touchableOpacity = renderedItemData.find({ testID: 'renderItemPress' });
            // touchableOpacity.simulate('press');
            // exampleBlockA.getByTestId('renderItemPress').props.onPress();
            // const touchableOpacity = renderedItemData.findWhere((node) => node.prop('testID') === 'renderItemPress');
            //
            // expect(touchableOpacity.exists()).toBe(true);
            // Simulate onPress
            //Todo Change this
            // touchableOpacity.props().onPress();

            list.renderProp("onEndReached")()
            // Extract the refreshControl props
            const refreshControlProps = list.prop('refreshControl').props;

            // Simulate onRefresh
            refreshControlProps.onRefresh();

            let postBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'post');
            postBtn.simulate('press');

            let trendingBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'trending');
            trendingBtn.simulate('press');
            let trendingPostlist = exampleBlockA.findWhere((node) => node.prop('testID') === 'trendingPost');
            expect(trendingPostlist).toBeTruthy();


        });

        then('I can select the button with with out errors', () => {
            exampleBlockA = shallow(<HashTagScreen {...screenProps}/>);
            let trendingButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'trending');
            trendingButton.simulate('press');
            let trendingPostlist = exampleBlockA.findWhere((node) => node.prop('testID') === 'trendingPost');
            trendingPostlist.renderProp('renderItem')({item:{id:6,user_name:""},index:0});
            trendingPostlist.renderProp('keyExtractor')({item:{id:0}})
            trendingPostlist.props().onRefresh();

            const refreshControlProps = trendingPostlist.prop('refreshControl').props;

            // Simulate onRefresh
            refreshControlProps.onRefresh();
            // instance.setState({trendingPageNumber:1, trendingLastPage:2})
            trendingPostlist.renderProp("onEndReached")()

        });

        then('Get trending content with success', () => {
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
            instance.getTrendingId = trendingResponse.messageId;
            runEngine.sendMessage("Unit Test", trendingResponse);

            const res = { data: ['a string'] };
            instance.getTrendingSuccessCallback(res);


            const response = {
                data: [],
                meta: {
                    pagination: {
                        total_pages: 1
                    }
                } };
            instance.getTrendingSuccessCallback(response);
        });

        then('Get trending content with errors', () => {
            const trendingResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                trendingResponse.messageId
            );
            const responseJson = {
                "errors": [
                    {
                        "message": "Error when getting trending content"
                    }
                ]
            };
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getTrendingId = trendingResponse.messageId;
            runEngine.sendMessage("Unit Test", trendingResponse);
        });

        then('Get recent content with success', () => {
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
            instance.getRecentId = trendingResponse.messageId;
            runEngine.sendMessage("Unit Test", trendingResponse);
            const res = { data: ['a string'] };
            instance.getRecentSuccessCallback(res);

            const response = {
                data: [],
                meta: {
                    pagination: {
                        total_pages: 1
                    }
                } };
            instance.getTrendingSuccessCallback(response);
            instance.getRecentSuccessCallback(response);
            instance.getTopSuccessCallback(response);
        });

        then('Get recent content with errors', () => {
            const trendingResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                trendingResponse.messageId
            );
            const responseJson = {
                "errors": [
                    {
                        "message": "Error when getting trending content"
                    }
                ]
            };
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getRecentId = trendingResponse.messageId;
            runEngine.sendMessage("Unit Test", trendingResponse);


            const response = {
                data: [],
                 };
            instance.getTrendingSuccessCallback(response);
            instance.getRecentSuccessCallback(response);
            instance.getTopSuccessCallback(response);
        });

        then('Get top content with errors', () => {
            const trendingResponse = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                trendingResponse.messageId
            );
            const responseJson = {
                "errors": [
                    {
                        "message": "Error when getting trending content"
                    }
                ]
            };
            trendingResponse.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getTopId = trendingResponse.messageId;
            runEngine.sendMessage("Unit Test", trendingResponse);
            const res = { data: ['a string'] };
            instance.getTopSuccessCallback(res);

            const response = {
                data: ['c', 'd'],
                meta: { pagination: { total_pages: '3', total_count: 10 } }
            };
            instance.getTopSuccessCallback(response);
        });

        then('I can leave the screen with out errors', () => {
            // instance.setState({showTab:2})
            let recentPostButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'recentPost');
            recentPostButton.simulate('press');

            let recentPost = exampleBlockA.findWhere((node) => node.prop('testID') === 'recent');
            recentPost.renderProp('renderItem')({item:{id:6,user_name:""},index:0});
            recentPost.renderProp('keyExtractor')({item:{id:0}})
            // recentPost.renderProp("onRefresh")
            recentPost.props().onRefresh();
            const refreshControlProps = recentPost.prop('refreshControl').props;

            // Simulate onRefresh
            refreshControlProps.onRefresh();
            instance.setState({recentPageNumber:1, recentLastPage:2})
            recentPost.renderProp("onEndReached")()
            recentPost.renderProp("onRefresh")()
            instance.handleBackButtonClick()
            instance.followButton()

            //get top post
            const mockGetProfileRestAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              mockGetProfileRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                mockGetProfileRestAPI
              );
              mockGetProfileRestAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                { res:{ data:[],meta:null} }
              );
              mockGetProfileRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                mockGetProfileRestAPI.messageId
              );
              instance.getTopId = mockGetProfileRestAPI.messageId;
              runEngine.sendMessage('Unit Test', mockGetProfileRestAPI);

              instance.getTrendingPosts("")
              const trendingPost = new Message(getName(MessageEnum.RestAPIResponceMessage))
              trendingPost.addData(getName(MessageEnum.RestAPIResponceDataMessage), trendingPost);
              trendingPost.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{ res:{ data:[],meta:null} });
              trendingPost.addData(getName(MessageEnum.RestAPIResponceDataMessage), trendingPost.messageId);
              instance.getTrendingId = trendingPost.messageId

              const followUser = new Message(getName(MessageEnum.RestAPIResponceMessage))
              followUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUser);
              followUser.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{ res:{ data:[],meta:null} });
              followUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUser.messageId);
              instance.getRecentId = followUser.messageId
              instance.getTopFailureCallback({})
              instance.getTrendingFailureCallback({})
              instance.getRecentFailureCallback({})

            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
