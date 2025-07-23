import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import Blockedusers from "../../src/Blockedusers";
import { Message } from "../../../../framework/src/Message"
import { runEngine } from '../../../../framework/src/RunEngine'
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
const navigation = require("react-navigation")

const blockuser_success_data = {
  "data": [
      {
          "id": "483",
          "type": "block_users",
          "attributes": {
              "current_user_id": 929,
              "account_id": 379,
              "created_at": "2023-11-28T09:47:34.237Z",
              "updated_at": "2023-11-28T09:47:34.237Z",
              "account": {
                  "id": 379,
                  "first_name": null,
                  "last_name": null,
                  "full_phone_number": "919825836914",
                  "country_code": 91,
                  "phone_number": 9825836914,
                  "email": "UserCheck@gmail.com",
                  "activated": true,
                  "device_id": null,
                  "unique_auth_id": "vtmKrCLFHfvqrsjxgE1Xmwtt",
                  "password_digest": "$2a$12$8ZKlJXBH7ltAsRn7rklzu.Xqlze0E7sWlrgxcQvgvhCIFjKPlaaH.",
                  "created_at": "2023-06-09T07:49:34.761Z",
                  "updated_at": "2023-06-16T13:48:58.232Z",
                  "user_name": "Usercheck",
                  "platform": null,
                  "user_type": null,
                  "app_language_id": null,
                  "last_visit_at": null,
                  "is_blacklisted": false,
                  "suspend_until": null,
                  "status": "regular",
                  "stripe_id": null,
                  "stripe_subscription_id": null,
                  "stripe_subscription_date": null,
                  "role_id": 3,
                  "full_name": "User check",
                  "gender": null,
                  "date_of_birth": "2005-06-08",
                  "age": 18,
                  "is_paid": false,
                  "verified": false,
                  "is_subscribed": false,
                  "group_subscribed": false,
                  "user_profile_data": null,
                  "bio": null,
                  "youtube": null,
                  "instagram": null,
                  "is_online": false,
                  "nickname": null,
                  "last_seen_at": null,
                  "last_break_taken_at": null,
                  "push_notificable_activated": true,
                  "chat_deteled_at": null,
                  "country_name": null
              },
              "photo": null
          }
      },
      {
          "id": "482",
          "type": "block_users",
          "attributes": {
              "current_user_id": 929,
              "account_id": 726,
              "created_at": "2023-11-28T09:47:22.159Z",
              "updated_at": "2023-11-28T09:47:22.159Z",
              "account": {
                  "id": 726,
                  "first_name": null,
                  "last_name": null,
                  "full_phone_number": "919519519510",
                  "country_code": 91,
                  "phone_number": 9519519510,
                  "email": "gerrybelson06@yopmail.com",
                  "activated": true,
                  "device_id": null,
                  "unique_auth_id": "aHcTEsBoIlfe6dgi8zWfIQtt",
                  "password_digest": "$2a$12$2DCTt/UnMevIXgpWKEs6h.8nVrhAqvC62uJXExWtODeDFXL/m0V/W",
                  "created_at": "2023-08-07T08:12:53.081Z",
                  "updated_at": "2023-08-07T08:16:07.364Z",
                  "user_name": "GerryBelson06",
                  "platform": null,
                  "user_type": null,
                  "app_language_id": null,
                  "last_visit_at": null,
                  "is_blacklisted": false,
                  "suspend_until": null,
                  "status": "regular",
                  "stripe_id": null,
                  "stripe_subscription_id": null,
                  "stripe_subscription_date": null,
                  "role_id": 3,
                  "full_name": "GerryBell",
                  "gender": null,
                  "date_of_birth": "1990-08-06",
                  "age": 33,
                  "is_paid": false,
                  "verified": true,
                  "is_subscribed": false,
                  "group_subscribed": false,
                  "user_profile_data": null,
                  "bio": null,
                  "youtube": null,
                  "instagram": null,
                  "is_online": true,
                  "nickname": null,
                  "last_seen_at": "2023-08-07T08:15:30.117Z",
                  "last_break_taken_at": null,
                  "push_notificable_activated": true,
                  "chat_deteled_at": null,
                  "country_name": null
              },
              "photo": null
          }
      }
  ],
  "meta": {
      "prev_page": null,
      "current_page": 1,
      "next_page": null,
      "total_pages": 1,
      "total_count": 2
  }
}


let message: Message = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  )
  
  message.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    {
      data: []
    }
  )

const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
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
        isFocused: jest.fn()
    },
    id: "Blockedusers"
}

const feature = loadFeature('./__tests__/features/blockedusers-scenario.feature');


defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Blockedusers', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: Blockedusers;

        given('I am a User loading Blockedusers', () => {
            exampleBlockA = shallow(<Blockedusers {...screenProps} />);
        });

        when('I navigate to the Blockedusers', () => {
            instance = exampleBlockA.instance() as Blockedusers
        });

        then('Blockedusers will load with out errors', () => {
            instance.unBlockUser(1, 1)
            instance.unrestrict(1, 1)
            instance.unmuteUser(1, 1)
            instance.deleteBlockeduser(11)
            instance.deleteRestrictedUser(11)
            instance.deleteMutedUser(11)
            instance.getRestrictedUsers()
            instance.apiCall(1)
            instance.getToken()
            instance.topHeaderSettings()
        });

        then("I can check the success response BlockeduserApiCallId is receiving without error", () => {
            const BlockeduserApiCallMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.BlockeduserApiCallId = BlockeduserApiCallMessage.messageId;
            BlockeduserApiCallMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), BlockeduserApiCallMessage.messageId);
            BlockeduserApiCallMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), blockuser_success_data)
            runEngine.sendMessage("Unit Test", BlockeduserApiCallMessage)

            const blockUserFlatlist = exampleBlockA.findWhere(
              (node) => node.prop("testID") === "blockUserFlatlist"
            );
    
            blockUserFlatlist.props().keyExtractor({}, 3);
            const flatlistIdRender = blockUserFlatlist.renderProp('renderItem')({ item: blockuser_success_data.data[0], index: 0 })
            let buttonPress = exampleBlockA.findWhere((node) => node.prop('testID') === 'privacySafetyKey');
            buttonPress.simulate('press')
            blockUserFlatlist.renderProp("onEndReached")();
            blockUserFlatlist.renderProp("onRefresh")();

            let textInputComponent = flatlistIdRender.findWhere((node) => node.prop('testID') === 'btnViewBlockeduserTxt');
            textInputComponent.simulate('press')
          });

          then("I can check the success response getRestrictedUsersApiCallId is receiving without error", () => {
            message.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              message.messageId
            )
            instance.getRestrictedUsersApiCallId = message.messageId
            instance.receive('test', message)
          });

          then("I can check the success response getMutedUsersApiCallId is receiving without error", () => {
            message.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              message.messageId
            )
            instance.getMutedUsersApiCallId = message.messageId
            instance.receive('test', message)
          });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
