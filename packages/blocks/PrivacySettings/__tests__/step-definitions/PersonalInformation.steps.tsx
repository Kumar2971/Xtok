import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import PersonalInformation from "../../src/settingOptions/personalInformation"
import PushNotifications from "../../src/settingOptions/pushNotifications"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        }
    },
    id: "PersonalInformation",
    route:{}
  }

  const apiCall = (mockData: any) => {
    const newMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
    newMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      newMessage.messageId
    );
    newMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      mockData
    );
    return newMessage;
  };

const feature = loadFeature('./__tests__/features/PersonalInformation-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to PersonalInformation', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:PersonalInformation; 
        let notificationA:ShallowWrapper;

        given('I am a User loading PersonalInformation', () => {
            exampleBlockA = shallow(<PersonalInformation {...screenProps}/>);
        });

        when('I navigate to the PersonalInformation', () => {
             instance = exampleBlockA.instance() as PersonalInformation
        });

        then('PersonalInformation will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy(); 
            const response={"data": {"attributes": {"account_id": 812, "created_at": "2023-09-08T07:39:04.277Z", "id": 620, "is_chat_notification_enable": true, "is_comment_notification_enable": true, "is_follower_notification_enable": true, "is_like_notification_enable": true, "is_live_streaming_vedio_from_account_you_follow_enable": true, "is_tagging_notification_enable": true, "is_video_from_account_you_follow_enable": true, "updated_at": "2023-09-08T07:39:04.277Z"}, "id": "620", "type": "user_preference"}}
            const getNotificationsSettingsCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getNotificationsSettingsCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getNotificationsSettingsCall.messageId
            );
            getNotificationsSettingsCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                response
            );
            instance.getNotificationsSettingsCallId = getNotificationsSettingsCall.messageId;
            runEngine.sendMessage("Unit Test", getNotificationsSettingsCall);
            expect(response.data.type).toBe("user_preference")

            const response2={"data": {"attributes": {"activated": true, "bio": "Live life king size", "country_code": "91", "created_at": "2023-09-08T07:39:04.263Z", "datasaver": [Object], "date_of_birth": "2003-09-07", "device_id": "eWpa60GTQ22pFaOFqzJglz:APA91bFp_n5Ir4R9clam0dxEBFG3iqIl0QdNkJLoyFnedlObaAcPWh9WYrLlfrhLpTIitThejvDTwnlho2dSDZfNXMxsxTKbrOIBoCAIglvmUmJZ3UoMnjaU0xNx8LdI88_dojMw-qig", "email": "Poojapatidar092@gmail.com", "first_name": null, "full_name": "Jayp", "full_phone_number": "917970134363", "gender": null, "instagram": null, "is_active_status": false, "is_allow_leaderboard_visibility": true, "is_allow_mentions": true, "is_blocked": false, "is_challenges_invites": true, "is_chat_muted": false, "is_dark_mode_theme": false, "is_muted": false, "is_online": true, "is_private_account": false, "is_restricated": false, "is_show_sensitive_content": false, "last_name": null, "last_seen_at": "2023-09-11T06:11:01.789Z", "nickname": null, "phone_number": "7970134363", "photo": "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/v3n6v5s8b0yk5ik1h4ko6tjeroea", "profile_id": null, "profile_video": null, "profile_view_count": 0, "push_notificable_activated": true, "type": null, "unique_auth_id": "Kdu3eHrsvHH1wbsrCngHugtt", "updated_at": "2023-09-11T06:11:05.960Z", "user_name": "Jaypatidar", "video_quality_preferences": [Array], "youtube": null}, "id": "812", "type": "account"}}
            const getUserGeneralNotificationSettingsCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getUserGeneralNotificationSettingsCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getUserGeneralNotificationSettingsCall.messageId
            );
            getUserGeneralNotificationSettingsCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                response2
            );
            instance.getUserGeneralNotificationSettingsCallId = getUserGeneralNotificationSettingsCall.messageId;
            runEngine.sendMessage("Unit Test", getUserGeneralNotificationSettingsCall);
             expect(response2.data.type).toBe("account")

            const response3={"data": {"attributes": {"activated": true, "bio": "Live life king size", "country_code": "91", "created_at": "2023-09-08T07:39:04.263Z", "datasaver": [Object], "date_of_birth": "2003-09-07", "device_id": "eWpa60GTQ22pFaOFqzJglz:APA91bFp_n5Ir4R9clam0dxEBFG3iqIl0QdNkJLoyFnedlObaAcPWh9WYrLlfrhLpTIitThejvDTwnlho2dSDZfNXMxsxTKbrOIBoCAIglvmUmJZ3UoMnjaU0xNx8LdI88_dojMw-qig", "email": "Poojapatidar092@gmail.com", "first_name": null, "full_name": "Jayp", "full_phone_number": "917970134363", "gender": null, "instagram": null, "is_active_status": false, "is_allow_leaderboard_visibility": true, "is_allow_mentions": true, "is_blocked": false, "is_challenges_invites": true, "is_chat_muted": false, "is_dark_mode_theme": false, "is_muted": false, "is_online": true, "is_private_account": false, "is_restricated": false, "is_show_sensitive_content": false, "last_name": null, "last_seen_at": "2023-09-11T06:11:01.789Z", "nickname": null, "phone_number": "7970134363", "photo": "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/v3n6v5s8b0yk5ik1h4ko6tjeroea", "profile_id": null, "profile_video": null, "profile_view_count": 0, "push_notificable_activated": false, "type": null, "unique_auth_id": "Kdu3eHrsvHH1wbsrCngHugtt", "updated_at": "2023-09-11T07:11:27.145Z", "user_name": "Jaypatidar", "video_quality_preferences": [Array], "youtube": null}, "id": "812", "type": "account"}}
            const updateUserGeneralNotificationSettingsCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            updateUserGeneralNotificationSettingsCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                updateUserGeneralNotificationSettingsCall.messageId
            );
            updateUserGeneralNotificationSettingsCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                response3
            );
            instance.updateUserGeneralNotificationSettingsCallId = updateUserGeneralNotificationSettingsCall.messageId;
            runEngine.sendMessage("Unit Test", updateUserGeneralNotificationSettingsCall);
            expect(response3.data.type).toBe("account")


            const response4={"activated": true, "age": 20, "app_language_id": null, "bio": "Live life king size", "chat_deteled_at": null, "country_code": 91, "created_at": "2023-09-08T07:39:04.263Z", "date_of_birth": "2003-09-07", "device_id": "eWpa60GTQ22pFaOFqzJglz:APA91bFp_n5Ir4R9clam0dxEBFG3iqIl0QdNkJLoyFnedlObaAcPWh9WYrLlfrhLpTIitThejvDTwnlho2dSDZfNXMxsxTKbrOIBoCAIglvmUmJZ3UoMnjaU0xNx8LdI88_dojMw-qig", "email": "Poojapatidar092@gmail.com", "first_name": null, "full_name": "Jayp", "full_phone_number": "917970134363", "gender": null, "group_subscribed": false, "id": 812, "instagram": null, "is_blacklisted": false, "is_online": true, "is_paid": false, "is_subscribed": false, "last_break_taken_at": null, "last_name": null, "last_seen_at": "2023-09-11T06:11:01.789Z", "last_visit_at": null, "nickname": null, "password_digest": "$2a$12$6doWrgdqx6XipOJXmhFlT.O4MJyNzBJmW3QYbdL9X7nUF6WRdqd8K", "phone_number": 7970134363, "platform": null, "push_notificable_activated": false, "role_id": 3, "status": "regular", "stripe_id": null, "stripe_subscription_date": null, "stripe_subscription_id": null, "suspend_until": null, "unique_auth_id": "Kdu3eHrsvHH1wbsrCngHugtt", "updated_at": "2023-09-11T07:11:27.145Z", "user_name": "Jaypatidar", "user_profile_data": null, "user_type": null, "verified": false, "youtube": null}
            const getUserDetailsCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getUserDetailsCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getUserDetailsCall.messageId
            );
            getUserDetailsCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                response4
            );
            instance.getUserDetailsCallId = getUserDetailsCall.messageId;
            runEngine.sendMessage("Unit Test", getUserDetailsCall);
            expect(response4.activated).toBe(true)

        });

        then('I can enter text with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'manageAcc');
            buttonComponent.simulate('press');
            instance.setState({language:"ar",personalInformation:{full_name:"abc",email:"abc@yop,.co",full_phone_number:"99",date_of_birth:""}})
        });
        then('I can receive notification with out errors', () => {
            notificationA = shallow(<PushNotifications {...screenProps}/>);
            let instanceN = notificationA.instance() as PushNotifications
            let buttonComponent = notificationA.findWhere((node) => node.prop('testID') === 'privacy');
            buttonComponent.simulate('press');
            instanceN.setState({language:'ar',setAllPushNotifications:true,PushNotificationComments:true})
            let notificationSettingBtn = notificationA.findWhere((node) => node.prop('testID') === 'notificationSetting');
            notificationSettingBtn.simulate('press');
            let enableNotify = notificationA.findWhere((node) => node.prop('testID') === 'enableN');
            enableNotify.simulate('press');
            let commentNotifyEn = notificationA.findWhere((node) => node.prop('testID') === 'commentNotify');
            commentNotifyEn.simulate('press');
            instance.setState({PushNotificationNewFollowers:true,PushNotificationMentionAndTags:true,
            PushNotificationVideoFromAccount:true,PushNotificationLiveFromAccount:true})
            let followerEn = notificationA.findWhere((node) => node.prop('testID') === 'follower');
            followerEn.simulate('press');
            let tagNotifyEn = notificationA.findWhere((node) => node.prop('testID') === 'tagNotify');
            tagNotifyEn.simulate('press');
            let videoAccEn = notificationA.findWhere((node) => node.prop('testID') === 'videoAcc');
            videoAccEn.simulate('press');
            let liveAccEn = notificationA.findWhere((node) => node.prop('testID') === 'liveAcc');
            liveAccEn.simulate('press');
            const erroMsg: Message = apiCall({});
            instanceN.getNotificationsSettingsCallId = erroMsg.messageId;
            runEngine.sendMessage("Unit Test", erroMsg);
            let switchOff = notificationA.findWhere((node) => node.prop('testID') === 'switchOffImg');
            expect(switchOff).toBeTruthy();
        });
        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });
});
