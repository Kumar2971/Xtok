import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import {Text} from 'react-native'
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import CommentActivity from "../../src/settingOptions/CommentActivity"
import * as utils from "../../../../framework/src/Utilities"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
        state: {
        }
    },
    id: "CommentActivity",
    route: {}
}

const feature = loadFeature('./__tests__/features/CommentActivity-scenario.feature');
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

    test('User navigates to CommentActivity', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: CommentActivity;

        given('I am a User loading CommentActivity', () => {
            exampleBlockA = shallow(<CommentActivity {...screenProps} />);
        });

        when('I navigate to the CommentActivity', () => {
            instance = exampleBlockA.instance() as CommentActivity
        });


        then('CommentActivity will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy()

            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'activty');
            buttonComponent.simulate('press');
            expect(screenProps.navigation.navigate('YourActivity'))

        });




        then('should render FlatList correctly when CommentActivity has items', () => {
            const dislikeCommentpostFun = jest.fn();
            const likeCommentpostFun = jest.fn();
            const responseJson = {
                data: [{
                    "attributes": {
                        "account": [Object], "account_id": 778, "comment": "Nice ", "commentable_id": null, "commentable_type": "post", "created_at": "2023-08-28T09:45:18.164Z", "downvoted": false, "id": 1153, "notification": null, "parent_id": null, "photo": "abc.png",
                        "replies": 0,
                        "replies_list": [
                            {
                                "comment": "Yes ....",
                                "image": "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/v7a1g96vidij8avt6ofy7xstjz3b",
                                "full_name": "Zoya",
                                "account_id": 716,
                                "comment_id": 1165,
                                "user_name": "Zoya",
                                "created_at": "2023-08-29T09:35:28.429Z"
                            }
                        ],
                        "taggings": [Array], "time": "0h", "totalvotecount": 1, "updated_at": "2023-08-28T09:45:18.164Z", "upvoted": true
                    }, "id": "1153", "type": "comment", open: true
                }]
            }

            const getCommentsActivityCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getCommentsActivityCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getCommentsActivityCall.messageId
            );
            getCommentsActivityCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getCommentsActivityCallId = getCommentsActivityCall.messageId;
            runEngine.sendMessage("Unit Test", getCommentsActivityCall);
            expect(responseJson.data[0].open).toBe(true)

            let list = exampleBlockA.findWhere(node => node.prop('testID') === "List")
            let dataRenderItem = list.renderProp('renderItem')({ item: instance.state.commentsActivity[0], index: 0 });

            const selectBtn = dataRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'onPressCommentDetails')
            selectBtn.simulate('press');
            expect(screenProps.navigation.navigate("UserProfileBasicBlock"))


            const selectBtn2 = dataRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'onPressCommentDetails2')
            selectBtn2.simulate('press');
            expect(screenProps.navigation.navigate("UserProfileBasicBlock"))

            const selectBtn3 = dataRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'touchOn')
            selectBtn3.simulate('press');
            const textElement = selectBtn3.find(Text);
            expect(textElement.children().at(0).text()).toBe('Hide replies (');

            let list2 = dataRenderItem.findWhere(node => node.prop('testID') === "list2");
            let dataRenderItem2 = list2.renderProp('renderItem')({ item: instance.state.commentsActivity[0].attributes.replies_list[0], index: 0 });
            const selectBtnn = dataRenderItem2.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'onPress3')
            selectBtnn.simulate('press')
            expect(screenProps.navigation.navigate("UserProfileBasicBlock", { data: { attributes: { account_id: 716, showTab: 1 } } }))

            const spy = jest.spyOn(instance, 'likeCommentpost');
            const select = dataRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'likeID')
            select.simulate('press')
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();

            const data = {
                index: 0
            }
            const likeCommentpostAPICall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            likeCommentpostAPICall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                likeCommentpostAPICall.messageId
            );
            likeCommentpostAPICall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {errors:"something went wrong"}
            );
            instance.likeCommentpostAPICallId = likeCommentpostAPICall.messageId;
            runEngine.sendMessage("Unit Test", likeCommentpostAPICall);
            expect(data.index).toBe(0);


           const spy2 = jest.spyOn(instance, 'dislikeCommentpost');
           const select2 = dataRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'disLikeID')
           select2.simulate('press')
            expect(spy2).toHaveBeenCalled();
            spy2.mockRestore();
           
            const dislikeCommentpostAPICall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            dislikeCommentpostAPICall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                dislikeCommentpostAPICall.messageId
            );
            dislikeCommentpostAPICall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                data
            );
            instance.dislikeCommentpostAPICallId = dislikeCommentpostAPICall.messageId;
            runEngine.sendMessage("Unit Test", dislikeCommentpostAPICall);
            expect(data.index).toBe(0);

        });


        then('I can select the button with with out errors', () => {
            const newestComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'newest');
            const textElement = newestComponent.find(Text);
            expect(textElement.children().text()).toBe('Oldest');
            newestComponent.simulate('press');
            const newestComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'newest');
            const textElement2 = newestComponent2.find(Text);
            expect(textElement2.children().text()).toBe('Newest');
            newestComponent2.simulate('press');
            const newestComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'newest');
            const textElement3 = newestComponent3.find(Text);
            expect(textElement3.children().text()).toBe('Oldest');

        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


    test('User navigates to CommentActivity and', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: CommentActivity;

        given('I am a User loading CommentActivity', () => {
            exampleBlockA = shallow(<CommentActivity {...screenProps} />);
        });

        when('I navigate to the CommentActivity', () => {
            instance = exampleBlockA.instance() as CommentActivity
        });


        then('CommentActivity will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
            const dislikeCommentpostFun = jest.fn();
            const likeCommentpostFun = jest.fn();

            const responseJson2 = {
                data: [{
                    "attributes": {
                        "account": [Object], "account_id": "ar", "comment": "Nice ", "commentable_id": null, "commentable_type": "post", "created_at": "2023-08-28T09:45:18.164Z", "downvoted": true, "id": 1153, "notification": null, "parent_id": null, "photo": null,
                        "replies": 0,
                        "replies_list": [
                        ],
                        "taggings": [Array], "time": "0h", "totalvotecount": 1, "updated_at": "2023-08-28T09:45:18.164Z", "upvoted": false
                    }, "id": "1153", "type": "comment", open: false
                }]
            }

            const getCommentsActivityCall1 = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getCommentsActivityCall1.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getCommentsActivityCall1.messageId
            );
            getCommentsActivityCall1.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson2
            );
            instance.getCommentsActivityCallId = getCommentsActivityCall1.messageId;
            runEngine.sendMessage("Unit Test", getCommentsActivityCall1);
            expect(responseJson2.data[0].open).toBe(false)

            let list = exampleBlockA.findWhere(node => node.prop('testID') === "List")
            let dataRenderItem = list.renderProp('renderItem')({ item: instance.state.commentsActivity[0], index: 0 });
            const selectBtn = dataRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'onPressCommentDetails')
            selectBtn.simulate('press');
            expect(screenProps.navigation.navigate("UserProfileBasicBlock"))

            const selectBtn2 = dataRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'onPressCommentDetails2')
            selectBtn2.simulate('press');
            expect(screenProps.navigation.navigate("UserProfileBasicBlock"))

            const selectBtn3 = dataRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'touchOn')
            selectBtn3.simulate('press');
            const textElement = selectBtn3.find(Text);
            console.log("textElement2---", textElement.debug())
            expect(textElement.children().at(0).text()).toBe('View replies (');

            const spy = jest.spyOn(instance, 'likeCommentpost');
            const select = dataRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'likeID')
            select.simulate('press')
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();

          const spy2 = jest.spyOn(instance, 'dislikeCommentpost');
          const select2 = dataRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'disLikeID')
          select2.simulate('press')
           expect(spy2).toHaveBeenCalled();
           spy2.mockRestore();

        });



        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

});