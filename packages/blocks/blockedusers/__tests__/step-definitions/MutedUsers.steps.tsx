import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import { Message } from "../../../../framework/src/Message"
import { runEngine } from '../../../../framework/src/RunEngine'
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import MutedUsers from "../../src/MutedUsers";
const navigation = require("react-navigation")



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
    id: "MutedUsers"
}

const feature = loadFeature('./__tests__/features/MutedUsers-scenario.feature');

const muteuser_success_Data = {
    "data": [
        {
            "id": "265",
            "type": "mute_users",
            "attributes": {
                "current_user_id": 929,
                "account_id": 765,
                "created_at": "2023-11-28T07:13:36.436Z",
                "updated_at": "2023-11-28T07:13:36.436Z",
                "account": {
                    "id": 765,
                    "first_name": null,
                    "last_name": null,
                    "full_phone_number": "917970131363",
                    "country_code": 91,
                    "phone_number": 7970131363,
                    "email": "Poojapatidar028@gmail.com",
                    "activated": true,
                    "device_id": "c4iGIZ7QSSeSsSAI-Sh1U-:APA91bGe4fXsRMkrvtSGEop1_d9sz9qGMn6EHozAEz6-COJBUjw-3gwpjaNWMMrKdxWi_ZGse4yTKejm67cF0OMCVqTGSjKJbG9FQ5Tvb7-AHUEPZ8XWrLsbUheGaPZ5QHsqT6RfHG7K",
                    "unique_auth_id": "Z4CZMKrHdPQhEvuwPKV3qwtt",
                    "password_digest": "$2a$12$FUbt9UVFtmxNo7PlmWTsS.Dd.a/z7XV.OnNvnpvIx.lTMS1HYyl3i",
                    "created_at": "2023-08-23T05:03:16.777Z",
                    "updated_at": "2023-08-23T05:03:17.062Z",
                    "user_name": "NativeUser1",
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
                    "full_name": "Native user",
                    "gender": null,
                    "date_of_birth": "2002-08-22",
                    "age": 21,
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
    ],
    "meta": {
        "prev_page": null,
        "current_page": 1,
        "next_page": null,
        "total_pages": 1,
        "total_count": 1
    }

}

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to MutedUsers', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: MutedUsers;

        given('I am a User loading MutedUsers', () => {
            exampleBlockA = shallow(<MutedUsers {...screenProps} />);
        });

        when('I navigate to the MutedUsers', () => {
            instance = exampleBlockA.instance() as MutedUsers
        });

        then('MutedUsers will load with out errors', () => {
            const getMutedUsersApiCallMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.getMutedUsersApiCallId = getMutedUsersApiCallMessage.messageId;
            getMutedUsersApiCallMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getMutedUsersApiCallMessage.messageId);
            getMutedUsersApiCallMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), muteuser_success_Data)
            runEngine.sendMessage("Unit Test", getMutedUsersApiCallMessage)  

            const muteUserFlatlist = exampleBlockA.findWhere(
              (node) => node.prop("testID") === "muteUserFlatlist"
            );
    
            muteUserFlatlist.props().keyExtractor({}, 3);
            const flatlistIdRender = muteUserFlatlist.renderProp('renderItem')({ item: muteuser_success_Data.data[0], index: 0 })
            let textInputTitle = exampleBlockA.findWhere((node) => node.prop('testID') === 'topHeaderKey');
            textInputTitle.simulate('press')
            muteUserFlatlist.renderProp("onEndReached")();
            muteUserFlatlist.renderProp("onRefresh")();

            let textInputComponent = flatlistIdRender.findWhere((node) => node.prop('testID') === 'btnViewMuteuserTxt');
            textInputComponent.simulate('press')
            instance.unmuteUser
            instance.topHeaderSettings
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
