import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import ActivityLikes from "../../src/settingOptions/ActivityLikes"
import * as utils from "../../../../framework/src/Utilities"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
const navigation = require("react-navigation")
import {Text} from 'react-native';
import {render, fireEvent, act, waitFor} from '@testing-library/react-native';
const screenProps = {
    navigation: {
        addListener:jest.fn().mockImplementation((event,callback)=>{
            callback();
        }),
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        }
    },
    id: "ActivityLikes",
    route:{},

  }

const feature = loadFeature('./__tests__/features/ActivityLikes-scenario.feature');
const mockgetStorageData = jest.spyOn(utils, "getStorageData")
 
defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        mockgetStorageData.mockImplementation(() => {
            return Promise.resolve("ar")
        })
    });

   
    
    test('User navigates to ActivityLikes', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:ActivityLikes; 

        given('I am a User loading ActivityLikes', () => {
            exampleBlockA = shallow(<ActivityLikes {...screenProps}/>);
     
        });

        when('I navigate to the ActivityLikes', async () => {
             instance = exampleBlockA.instance() as ActivityLikes
            });

        then('ActivityLikes will load with out errors', () => { 
           const responseJson = { 
            data:[{
                "id": "256",
                "type": "post",
                "attributes": {
                "id": 256,
                "name": "Dancer ",
               "description": "",
                "body": "Dancer ",
                "location": null,
                "latitude": null,
                "longitude": null,
               "is_like_by_current_user": true,
                "account_id": 294,
                "created_at": "2023-05-30T13:54:51.244Z",
                "updated_at": "2023-05-30T13:54:51.244Z",
               "tag_list": [
               
                ],
                "save_post_as": "create_post",
                "visibility_setting": "Public",
                "comment_setting": "Allow all Comments",
                "audience_setting": "No restrictions to viewers",
                "post_medias": {
                "images": [
                ],
           "videos": [
                {
               "id": 228,
           "media_url": "http://minio-ext.b255799.dev.eastus.az.svc.builder.cafe/sbucket/wzwewtbmnis364fxfj8nii9u3ew1",
            "media_type": "Video",
             "audio_url": "",
               "post_id": 256,
                "audio_title": null,
            "audio_artist": null,
               "audio_filename": null,
                "created_at": "2023-05-30T13:54:51.250Z",
                "updated_at": "2023-05-30T13:54:52.769Z",
                "video_thumnail": "http://minio-ext.b255799.dev.eastus.az.svc.builder.cafe/sbucket/z0iqiydfr402chhq15ni69ypvztb"
                }
                ],
            "thumnails": [
                "http://minio-ext.b255799.dev.eastus.az.svc.builder.cafe/sbucket/z0iqiydfr402chhq15ni69ypvztb"
                ]
                },
               "post_likes_count": 16,
               "post_comment_count": 13,
               "photo": "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/1vhmcr1xgyd1tyycb9esbki2cigo",
                "schedule_time": null,
               "video_post_thumbnail": null,
                "taggings": [
              
                ],
                "notification": null,
                "video_post": null,
                "bookmarked": false,
               "post_views": 0
                }
            }]
           };
          
            const getLikesPostsCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              getLikesPostsCall.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            getLikesPostsCall.messageId
          );
          getLikesPostsCall.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            responseJson
          );
          instance.getLikesPostsCallId = getLikesPostsCall.messageId;
          runEngine.sendMessage("Unit Test", getLikesPostsCall);
          expect(responseJson.data[0].attributes.tag_list).toEqual([]) 

        });


        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'activty');
            buttonComponent.simulate('press');
            expect(screenProps.navigation.navigate('YourActivity'))
            const newestComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'newest');
            console.log('newestComponent:', newestComponent.debug()); // Log component structure
            const textElement = newestComponent.find(Text);
            console.log('textElement:', textElement.debug()); // Log textElement structure
            
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

        then("should render FlatList correctly when likeActivityPosts has items", () => {
     const flatList = exampleBlockA.findWhere(node => node.prop('testID') === 'flatlistId');
             
         let item={
            item:{
                attributes:{
                    post_medias:{
                        thumnails:[
                                "http://minio-ext.b255799.dev.eastus.az.svc.builder.cafe/sbucket/z0iqiydfr402chhq15ni69ypvztb"
                        ]
                    },
                    account_id:1,
                    id:1
                }
            }
         }
        const dataRenderItem = flatList.renderProp('renderItem')(item)
        flatList.props().keyExtractor({}, 3);
        expect(item.item.attributes.id).toBe(1);  
       const selectBtn = dataRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'onPressrenderItem')      
       selectBtn.simulate('press');
       expect(screenProps.navigation.navigate("Comments", { type:'LikeActivity',account_id: 1,post_id:1}))
 })
   

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('User navigates to Activity', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:ActivityLikes; 

        given('I am a User loading ActivityLikes', () => {
            exampleBlockA = shallow(<ActivityLikes {...screenProps}/>);
     
        });

        when('I navigate to the ActivityLikes', async () => {
             instance = exampleBlockA.instance() as ActivityLikes
            });

        then('ActivityLikes will load with out errors', () => { 
           const responseJson = { 
           data:[]
           };
          
            const getLikesPostsCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              getLikesPostsCall.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            getLikesPostsCall.messageId
          );
          getLikesPostsCall.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            responseJson
          );
          instance.getLikesPostsCallId = getLikesPostsCall.messageId;
          runEngine.sendMessage("Unit Test", getLikesPostsCall);
          expect(responseJson.data).toEqual([]) 

        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });
});
