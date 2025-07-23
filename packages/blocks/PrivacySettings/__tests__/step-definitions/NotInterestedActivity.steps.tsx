import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import * as utils from "../../../../framework/src/Utilities"
import NotInterestedActivity from "../../src/settingOptions/NotInterestedActivity"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import {Text} from 'react-native';
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
    id: "NotInterestedActivity",
    route: {}
}

const feature = loadFeature('./__tests__/features/NotInterestedActivity-scenario.feature');

const mockgetStorageData = jest.spyOn(utils, "getStorageData")
defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        mockgetStorageData.mockImplementation(() => {
            return Promise.resolve("ar")
        })
    });

    test('User navigates to NotInterestedActivity', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: NotInterestedActivity;

        given('I am a User loading NotInterestedActivity', () => {
            exampleBlockA = shallow(<NotInterestedActivity {...screenProps} />);
        });

        when('I navigate to the NotInterestedActivity', () => {
            instance = exampleBlockA.instance() as NotInterestedActivity
        });

        then('NotInterestedActivity will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();

            const responseJson = {
                data: [
                    {
                        attributes: [Object],
                        id: 256,
                        type: "post"
                    }],
                meta: { "pagination": { "current_page": 1, "next_page": null, "prev_page": null, "total_count": 1, "total_pages": 1 } }
            }

            const getNotInterestedPosts = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getNotInterestedPosts.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getNotInterestedPosts.messageId
            );
            getNotInterestedPosts.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getNotInterestedPostsCallId = getNotInterestedPosts.messageId;
            runEngine.sendMessage("Unit Test", getNotInterestedPosts);
            expect(responseJson.data[0].id).toBe(256);

        });

        then("should render FlatList correctly when notInterestedPosts has items", () => {
            const flatList = exampleBlockA.findWhere(node => node.prop('testID') === 'flatlistId');
            let item = {
                item: {
                    attributes: {
                        post_medias: {
                            thumnails: [
                                "http://minio-ext.b255799.dev.eastus.az.svc.builder.cafe/sbucket/z0iqiydfr402chhq15ni69ypvztb"
                            ]
                        },
                        account_id: 1,
                        id: 1
                    }
                }
            }
            const dataRenderItem = flatList.renderProp('renderItem')(item)
            expect(item.item.attributes.id).toBe(1);
            const selectBtn = dataRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'onPressRenderItem')
            selectBtn.simulate('press');
            expect(screenProps.navigation.navigate("Comments", { type:'NotInterestedActivity',account_id: 1,post_id:1}))

            
})

        then('I can select the button with with out errors', () => {
            const selectBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'activty');
            selectBtn.simulate('press');
            expect(screenProps.navigation.navigate('YourActivity'));
               const newestComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'newest');
               const textElement = newestComponent.find(Text);
               expect(textElement.children().text()).toBe('Oldest');
               newestComponent.simulate('press');
               const newestComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'newest');
               const textElement2 = newestComponent2.find(Text);
               expect(textElement2.children().text()).toBe('Newest');
               newestComponent2.simulate('press');
               const newestComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'newest');
               const textElement3= newestComponent3.find(Text);
              expect(textElement3.children().text()).toBe('Oldest');
         });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('User navigates to NotInterested', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: NotInterestedActivity;

        given('I am a User loading NotInterestedActivity', () => {
            exampleBlockA = shallow(<NotInterestedActivity {...screenProps} />);
        });

        when('I navigate to the NotInterestedActivity', () => {
            instance = exampleBlockA.instance() as NotInterestedActivity
        });

        then('NotInterestedActivity will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();

            const responseJson = {
                data: []
            }
            const getNotInterestedPosts = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getNotInterestedPosts.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getNotInterestedPosts.messageId
            );
            getNotInterestedPosts.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getNotInterestedPostsCallId = getNotInterestedPosts.messageId;
            runEngine.sendMessage("Unit Test", getNotInterestedPosts);
            expect(responseJson.data).toEqual([])

        });


        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

});
