// import { defineFeature, loadFeature} from "jest-cucumber"
// import { shallow, ShallowWrapper } from 'enzyme'

// import * as helpers from '../../../../framework/src/Helpers'
// import {runEngine} from '../../../../framework/src/RunEngine'
// import {Message} from "../../../../framework/src/Message"

// import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
// import React from "react";
// import Notifications from "../../src/Notifications"
// const navigation = require("react-navigation")

// const screenProps = {
//     navigation: navigation,
//     id: "Notifications"
//   }

// const feature = loadFeature('./__tests__/features/Notifications-scenario.feature');

// defineFeature(feature, (test) => {


//     beforeEach(() => {
//         jest.resetModules()
//         jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
//         jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
//     });

//     test('User navigates to Notifications', ({ given, when, then }) => {
//         let notificationsBlock:ShallowWrapper;
//         let instance:Notifications; 

//         given('I am a User loading Notifications', () => {
//             notificationsBlock = shallow(<Notifications {...screenProps}/>)
//         });

//         when('I navigate to the Notifications', () => {
//              instance = notificationsBlock.instance() as Notifications
//         });

//         then('Notifications will load with out errors', () => {

//             const tokenMsg: Message = new Message(
//                 getName(MessageEnum.SessionResponseMessage)
//               )
//             tokenMsg.addData(getName(MessageEnum.SessionResponseToken), 'TOKEN')
//             runEngine.sendMessage('Unit Test', tokenMsg)

//             const msgNotificationsAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
//             msgNotificationsAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgNotificationsAPI.messageId);
//             msgNotificationsAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
//                 {"data":[{"id":"8","type":"notifications","attributes":{"id":8,"created_by":5,"headings":"Notifications heading","contents":"Notifications contents","app_url":"test/url","is_read":true,"read_at":"2021-12-21T17:56:15.713Z","created_at":"2021-12-21T17:55:42.972Z","updated_at":"2021-12-21T17:56:15.714Z","account":{"id":5,"first_name":"Firstname","last_name":"Lastname","full_phone_number":"13108540001","country_code":1,"phone_number":3108540001,"email":"tester@me.com","activated":true,"device_id":null,"unique_auth_id":null,"password_digest":"$2a$12$ckgZ.kZVE1HkJ29.Q1H6VODyCK8L.LwiiM0RzJ4XqoIVZRWMpCqsW","created_at":"2021-08-26T15:24:41.179Z","updated_at":"2021-08-26T15:24:41.179Z","user_name":null,"role_id":null}}},{"id":"16","type":"notifications","attributes":{"id":16,"created_by":5,"headings":"Notifications heading","contents":"Notifications contents","app_url":"test/url","is_read":false,"read_at":null,"created_at":"2021-12-21T17:56:37.374Z","updated_at":"2021-12-21T17:56:37.374Z","account":{"id":5,"first_name":"Firstname","last_name":"Lastname","full_phone_number":"13108540001","country_code":1,"phone_number":3108540001,"email":"tester@me.com","activated":true,"device_id":null,"unique_auth_id":null,"password_digest":"$2a$12$ckgZ.kZVE1HkJ29.Q1H6VODyCK8L.LwiiM0RzJ4XqoIVZRWMpCqsW","created_at":"2021-08-26T15:24:41.179Z","updated_at":"2021-08-26T15:24:41.179Z","user_name":null,"role_id":null}}}],"meta":{"message":"List of notifications."}}
//             );
//             instance.getDataCallId = msgNotificationsAPI.messageId
//             runEngine.sendMessage("Unit Test", msgNotificationsAPI)

//             const msgDeleteNotificationsAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
//             msgDeleteNotificationsAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgDeleteNotificationsAPI.messageId);
//             msgDeleteNotificationsAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
//                 {"message":"Deleted."}
//             );
//             instance.deleteCallId = msgDeleteNotificationsAPI.messageId
//             runEngine.sendMessage("Unit Test", msgDeleteNotificationsAPI)

//             const msgReadNotificationsAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
//             msgReadNotificationsAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgReadNotificationsAPI.messageId);
//             msgReadNotificationsAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
//                 {"message":"Done."}
//             );
//             instance.markAsReadCallId = msgReadNotificationsAPI.messageId
//             runEngine.sendMessage("Unit Test", msgReadNotificationsAPI)

//             expect(notificationsBlock).toBeTruthy()
//         });

//         then('I can leave the screen with out errors', () => {
//             instance.componentWillUnmount()
//             expect(notificationsBlock).toBeTruthy()
//         });
//     });


// });


import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import Notifications from "../../src/Notifications"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
const navigation = require("react-navigation")

let message: Message = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
)

message.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    {
        data: []
    }
)
let responseJson = {
    data: [{
    }
    ]
}


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
        push: jest.fn(),
        replace: jest.fn(),
        pop: jest.fn(),
        popToTop: jest.fn(),
        isFocused: jest.fn(),
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
    },
    id: "Notifications"
}
const feature = loadFeature('./__tests__/features/Notifications-scenario.feature');


defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Notifications', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: Notifications;

        given('I am a User loading Notifications', () => {
            exampleBlockA = shallow(<Notifications  {...screenProps} />);
        });

        when('I navigate to the Notifications', () => {
            instance = exampleBlockA.instance() as Notifications
        });

        then('Notifications will load with out errors', () => {

            // let buttonPress = exampleBlockA.findWhere((node) => node.prop('testID') === 'firstTouch');
            // buttonPress.simulate('press')
            // let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'secondTouch');
            // textInputComponent.simulate('press')
            // let topImagePress = exampleBlockA.findWhere((node) => node.prop('testID') === 'thirdTouch');
            // topImagePress.simulate('press')
            // let deleteImagePress = exampleBlockA.findWhere((node) => node.prop('testID') === 'fourthTouch');
            // deleteImagePress.simulate('press')
            // let uploadUpdatedData = exampleBlockA.findWhere((node) => node.prop('testID') === 'fifthTouch');
            // uploadUpdatedData.simulate('press')
            // let videoComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'sixthTouch');
            // videoComponent.simulate('press')
            // let uploadButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'seventhTouch');
            // uploadButton.simulate('press')
            // let eightTouch = exampleBlockA.findWhere((node) => node.prop('testID') === 'eightTouch');
            // eightTouch.simulate('press')
            // let NinthTouch = exampleBlockA.findWhere((node) => node.prop('testID') === 'nineTouch');
            // NinthTouch.simulate('press')
            // let TenTouch = exampleBlockA.findWhere((node) => node.prop('testID') === 'tenTouch');
            // TenTouch.simulate('press')
            // let elevenTouch = exampleBlockA.findWhere((node) => node.prop('testID') === 'elevenTouch');
            // elevenTouch.simulate('press')
            // instance.emptyList()
            // let data = {
            //     item: {
            //         attributes: {
            //             contents: "",
            //             post: {
            //                 data: [{
            //                     id:'',
            //                     attributes: {
            //                         account_id: ''
            //                     }
            //                 }]
            //             },
            //             notification_created_user: {
            //                 data: {
            //                     id: "",
            //                     attributes:{
            //                         photo:''
            //                     }
            //                 }
            //             },
            //         }
            //     },
            // }


            // instance.renderNotifications()
            // let res={data:["No Posts Available"]}
            instance.renderSectionHeader

            instance.getToken()
            instance.filterDate()
            instance.getNotifications()
            instance.getFollowRequest()
            instance.getFollowingData()
            instance.markAsRead
            instance.deleteNotifications
            instance.timeSince
            instance.convertDate
            instance.updateInviteStream('','')
            instance.calculateTimeDifference(1)
        });


        // then("I can check the success response getAccountDraftsId is receiving without error", () => {
        //     let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        //     msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
        //     msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        //          responseJson 
        //         );
        //     instance.getAccountDraftsId = msgRegistrationErrorRestAPI
        //     runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        //   });

        //   then("I can check the success response getDeleteDraftsId is receiving without error", () => {
        //     let responseJson={
        //         data:[{
        //         }
        //         ],
        //         errors:[{
        //             message:"Something went wrong"
        //         }]
        //     }
        //     let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        //     msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
        //     msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        //     responseJson
        //         );
        //     instance.getDeleteDraftsId = msgRegistrationErrorRestAPI
        //     runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)

        //   });

        //   then("I can check the success response getUploadDraftsId is receiving without error", () => {
        //     let responseJson={
        //         data:[{
        //         }
        //         ],
        //         errors:[{
        //             message:"Something went wrong"
        //         }]
        //     }
        //     let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        //     msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
        //     msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        //     responseJson
        //         );
        //     instance.getUploadDraftsId = msgRegistrationErrorRestAPI
        //     runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)


        //     message.addData(
        //       getName(MessageEnum.RestAPIResponceDataMessage),
        //       message.messageId
        //     )
        //     instance.getUploadDraftsId = message.messageId
        //     instance.receive('test', message)

        //     message.addData(
        //         getName(MessageEnum.RestAPIResponceDataMessage),
        //         message.messageId
        //       )
        //       instance.getDeleteDraftsId = message.messageId
        //       instance.receive('test', message)
        //   });

     

        then('update invite api fails to run successfully', () => {
            const updateInviteCallId = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            updateInviteCallId.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              updateInviteCallId.messageId
            );
            updateInviteCallId.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              JSON.parse(JSON.stringify({error:'Something went wrong!'}))
            );
            instance.updateInviteCallId = updateInviteCallId.messageId;
            runEngine.sendMessage("Unit Test", updateInviteCallId);

            updateInviteCallId.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              JSON.parse(JSON.stringify({error:'Something went wrong!'}))
            );            
            runEngine.sendMessage("Unit Test", updateInviteCallId);

            const getFollowingDataCallId = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            getFollowingDataCallId.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              getFollowingDataCallId.messageId
            );
            getFollowingDataCallId.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              JSON.parse(JSON.stringify({error:'Something went wrong!'}))
            );
            instance.getFollowingDataCallId = getFollowingDataCallId.messageId;
            runEngine.sendMessage("Unit Test", getFollowingDataCallId);

            const mockData = {data: [
              {
                "id": "1", attributes: {invite_id:1,created_at: new Date(Date.now() - 8 * 7 * 24 * 60 * 60 * 1000) },
              },
              {
                "id": "2", attributes: {invite_id:2, created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
              },
              {
                "id": "3", attributes: { invite_id:3,created_at: new Date(Date.now() - 5 * 60 * 60 * 1000) },
              },
              {
                "id": "4", attributes: {invite_id:4, created_at: new Date(Date.now() - 20 * 60 * 1000) },
              },
              {
                "id": "5", attributes: {invite_id:5, created_at: new Date(Date.now() - 2 * 60 * 1000) },
              },
              {
                "id": "6",  attributes: {invite_id:6, created_at: '2023-08-29T06:00:00' },
              },
              {
                "id": "7",  attributes: {invite_id:7, created_at: '2023-09-29T06:00:00' },
              },
              {
                "id": "8",attributes: {invite_id:8, created_at: '2023-10-30T08:00:00' },
              },
              {
                "id": "9",  attributes: {invite_id:9, created_at: '2023-10-30T06:00:00' },
              },
            ]};

            const getFollowingDataCallId2 = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            getFollowingDataCallId2.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              getFollowingDataCallId2.messageId
            );
            getFollowingDataCallId2.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),mockData);
            instance.getFollowingDataCallId = getFollowingDataCallId2.messageId;
            runEngine.sendMessage("Unit Test", getFollowingDataCallId2);


            
            let sectionList = exampleBlockA.findWhere(
              (node) => node.prop("testID") === "sectionList"
            );
          
          const renderItems = sectionList.prop('renderItem')({item:{attributes:{notification_created_user:null,headings:"hellow orld"}}})
          const wrapRenderItem = shallow(renderItems);
          const userPhoto = wrapRenderItem.findWhere((node) => node.prop('testID') === 'user_photo');
          expect(userPhoto.prop("source").testUri).toBe('../../../packages/blocks/global_assets/avatar.png');
          const renderItem = sectionList.prop('renderItem')({item:{id:'1',attributes:{invite_id:1,created_at: new Date(Date.now() - 8 * 7 * 24 * 60 * 60 * 1000), contents:'follow',headings:"hellow has invited you to join live stream orld",notification_created_user:{data:{attributes:{photo:'photo'}}}}}})
          const renderItem2 = sectionList.prop('renderItem')({item:{id:'1',attributes:{invite_id:1,created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),contents:'invitation',headings:"hellow has invited you to join live orld",notification_created_user:{data:{attributes:{photo:''}}}}}})
          const renderItem3 = sectionList.prop('renderItem')({item:{id:'1',attributes:{invite_id:1,created_at: new Date(Date.now() - 5 * 60 * 60 * 1000), contents:'invitation',headings:"hellow has invited you to join a private livestream",notification_created_user:{data:{attributes:{photo:''}}}}}})
          sectionList.prop('renderItem')({item:{id:'1',attributes:{invite_id:1,created_at: new Date(Date.now() - 20 * 60 * 1000), contents:'comment on Post',"post":{"data":{"id":"216","type":"post_data","attributes":{"post_medias":{"thumnails":["https://picsum.photos/200"]}}}},headings:"hellow has invited you to join a private livestream",notification_created_user:{data:{attributes:{photo:''}}}}}})
          sectionList.prop('renderItem')({item:{id:'1',attributes:{invite_id:1,created_at: new Date(Date.now() - 2 * 60 * 1000), contents:'reply on comment',"post":{"data":{"id":"216","type":"post_data","attributes":{"post_medias":{"thumnails":["https://picsum.photos/200"]}}}}, headings:"hellow has invited you to join a private livestream",notification_created_user:{data:{attributes:{photo:''}}}}}})
          sectionList.prop('renderItem')({item:{id:'1',attributes:{invite_id:1,contents:'tagged in a Post',headings:"hellow has invited you to join a private livestream",notification_created_user:{data:{attributes:{photo:''}}}}}})
          const keyExtractor = sectionList.prop('keyExtractor')({item:{id:'1',attributes:{invite_id:1,contents:'follow',headings:"hellow has invited you to join live orld",notification_created_user:{data:{attributes:{photo:''}}}}}})
          const renderItemData = shallow(renderItem)
          const userPhotoUri = renderItemData.findWhere((node) => node.prop('testID') === 'user_photo');
          expect(userPhotoUri.prop("source").uri).toBe('photo');
          const renderItemData2 = shallow(renderItem2)
          const renderItemData3 = shallow(renderItem3)
          const touchableOpacity = renderItemData.findWhere((node) => node.prop('testID') === 'notificationType0');
          touchableOpacity.simulate('press');

          const touchableOpacity2 = renderItemData2.findWhere((node) => node.prop('testID') === 'acceptButton');
          touchableOpacity2.simulate('press');

          const touchableOpacity3 = renderItemData2.findWhere((node) => node.prop('testID') === 'rejectButton');
          touchableOpacity3.simulate('press');

          const touchableOpacity4 = renderItemData3.findWhere((node) => node.prop('testID') === 'acceptButton');
          touchableOpacity4.simulate('press');

          const touchableOpacity5 = renderItemData3.findWhere((node) => node.prop('testID') === 'rejectButton');
          touchableOpacity5.simulate('press');
            
          expect(exampleBlockA).toBeTruthy()
          })
      
          then('update invite api runs successfully', () => {
            const updateInviteCallId = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            updateInviteCallId.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              updateInviteCallId.messageId
            );
            updateInviteCallId.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              JSON.parse(JSON.stringify([{
                id:'0',
                attributes:{
                  headings:'string',
                  room_id:'string',
                  chat_arn:'string',
                  invite_id:0,
                  invitation_status:null,
                  contents:'string',
                  notification_created_user:{
                    data: {
                      attributes :{ 
                        photo:null,
                      }
                    }
                  }
                }
              }]))
            );
            instance.updateInviteCallId = updateInviteCallId.messageId;
            runEngine.sendMessage("Unit Test", updateInviteCallId);
            instance.handleUpdatedInvite('')
            let item ={
              attributes:
              {
                contents:'shared a Post',
                post: {data:{
                  attributes:{
                    post_medias:{
                      thumnails: [1,2,3]
                    }
                  }
                }}
              }
            }
            instance.renderNewButtons(item)
          
          expect(exampleBlockA).toBeTruthy()
          })

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });
  
});
