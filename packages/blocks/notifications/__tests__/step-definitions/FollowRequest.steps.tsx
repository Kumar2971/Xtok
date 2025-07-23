import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import FollowRequest from "../../src/FollowRequest"
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
  let responseJson={
    data:[{
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
    id: "FollowRequest"
}
const feature = loadFeature('./__tests__/features/FollowRequest-scenario.feature');


defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to FollowRequest', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: FollowRequest;

        given('I am a User loading FollowRequest', () => {
            exampleBlockA = shallow(<FollowRequest  {...screenProps} />);
        });

        when('I navigate to the FollowRequest', () => {
            instance = exampleBlockA.instance() as FollowRequest
        });

        then('FollowRequest will load with out errors', () => {

            // let buttonPress = exampleBlockA.findWhere((node) => node.prop('testID') === 'firstTouch');
            // buttonPress.simulate('press')
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'secondTouch');
            textInputComponent.simulate('press')
            let topImagePress = exampleBlockA.findWhere((node) => node.prop('testID') === 'thirdTouch');
            topImagePress.simulate('press')
            let deleteImagePress = exampleBlockA.findWhere((node) => node.prop('testID') === 'fourthTouch');
            deleteImagePress.simulate('press')
            let uploadUpdatedData = exampleBlockA.findWhere((node) => node.prop('testID') === 'fifthTouch');
            uploadUpdatedData.simulate('press')
            let videoComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'sixthTouch');
            videoComponent.simulate('press')
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
            // instance.renderNotifications
            // let res={data:["No Posts Available"]}
            // instance.renderSectionHeader
            
            instance.fetchFollowings()
            instance.getFollowRequest()
            instance.onConfirmUser('take',1)
            instance.emptyList()

            let data = {
                item: {
                    attributes: {
                        photo:'',
                        user_name:'',
                    }
                },
                index: 1
            }

            instance.renderItem(data)
            // instance.markAsRead
            // instance.deleteNotifications
            // instance.timeSince
            // instance.convertDate
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

          

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
