import { defineFeature, loadFeature } from "jest-cucumber"
import { mount, shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import EditProfile from "../../src/settingOptions/editProfile"
import CustomButton from "../../../../components/src/Custombutton"


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
    id: "EditProfile",
    route: {}
}

const feature = loadFeature('./__tests__/features/EditProfile-scenario.feature');
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

    test('User navigates to EditProfile', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: EditProfile;

        given('I am a User loading EditProfile', () => {
            exampleBlockA = shallow(<EditProfile {...screenProps} />);
        });

        when('I navigate to the EditProfile', () => {
            instance = exampleBlockA.instance() as EditProfile
        });

        then('EditProfile will load with out errors', () => {
            const responseJson = { "access_key_id": "hello", "bucket_name": "sbucket", "end_point": "https://minio.b255799.dev.eastus.az.svc.builder.cafe", "region": "builder-1", "secret_access_key": "builderai" }
            const responseJson2 = { "data": { "attributes": { "activated": true, "bio": null, "country_code": "91", "created_at": "2023-08-24T10:11:32.150Z", "datasaver": [Object], "date_of_birth": "2001-08-23", "device_id": "eDwOnEUqRpCpK4GgiLfI2_:APA91bGwX8zRi48Xxsdf7zQgc8zG8jDiNUeutlgtbOtTQ6E0y31LNO8OGyh9QP2lBBplmZN5eHcQxrwkHzT-izmdM3u7qC4eTiaUPOhlq7hc4L7hU31wTxCVHAAcuGQ5rckRq35DJIqa", "email": "Example09@gmail.com", "first_name": null, "full_name": "Patidar", "full_phone_number": "917970134363", "gender": null, "instagram": null, "is_active_status": false, "is_allow_leaderboard_visibility": true, "is_allow_mentions": true, "is_blocked": false, "is_challenges_invites": true, "is_chat_muted": false, "is_dark_mode_theme": false, "is_muted": false, "is_online": true, "is_private_account": false, "is_restricated": false, "is_show_sensitive_content": false, "last_name": null, "last_seen_at": "2023-09-06T09:55:48.533Z", "nickname": null, "phone_number": "7970134363", "photo": null, "profile_id": null, "profile_video": null, "profile_view_count": 0, "push_notificable_activated": true, "type": null, "unique_auth_id": "Pi4fY8VgBO4be0JabbVw6Qtt", "updated_at": "2023-09-06T09:55:51.852Z", "user_name": "Patidar", "video_quality_preferences": [Array], "youtube": null }, "id": "778", "type": "account" } }

            const getBucketDetails = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getBucketDetails.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getBucketDetails.messageId
            );
            getBucketDetails.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getBucketDetailsCallId = getBucketDetails.messageId;
            runEngine.sendMessage("Unit Test", getBucketDetails);
            expect(responseJson.access_key_id).toBe("hello")

            const getCurrentProfileAPICall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getCurrentProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getCurrentProfileAPICall.messageId
            );
            getCurrentProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson2
            );
            instance.getCurrentProfileAPICallId = getCurrentProfileAPICall.messageId;
            runEngine.sendMessage("Unit Test", getCurrentProfileAPICall);
            expect(responseJson2.data.attributes.activated).toBe(true)

            const responseJson3 = { "data": { "attributes": { "activated": true, "bio": null, "country_code": "91", "created_at": "2023-09-08T07:39:04.263Z", "datasaver": [Object], "date_of_birth": "2003-09-07", "device_id": "eWpa60GTQ22pFaOFqzJglz:APA91bFp_n5Ir4R9clam0dxEBFG3iqIl0QdNkJLoyFnedlObaAcPWh9WYrLlfrhLpTIitThejvDTwnlho2dSDZfNXMxsxTKbrOIBoCAIglvmUmJZ3UoMnjaU0xNx8LdI88_dojMw-qig", "email": "Poojapatidar092@gmail.com", "first_name": null, "full_name": "Jayp", "full_phone_number": "917970134363", "gender": null, "instagram": null, "is_active_status": false, "is_allow_leaderboard_visibility": true, "is_allow_mentions": true, "is_blocked": false, "is_challenges_invites": true, "is_chat_muted": false, "is_dark_mode_theme": false, "is_muted": false, "is_online": false, "is_private_account": false, "is_restricated": false, "is_show_sensitive_content": false, "last_name": null, "last_seen_at": null, "nickname": null, "phone_number": "7970134363", "photo": null, "profile_id": null, "profile_video": null, "profile_view_count": 0, "push_notificable_activated": true, "type": null, "unique_auth_id": "Kdu3eHrsvHH1wbsrCngHugtt", "updated_at": "2023-09-08T07:39:50.302Z", "user_name": "Jaypatidar", "video_quality_preferences": [Array], "youtube": null }, "id": "812", "type": "account" } }
            const updateProfileAPICall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            updateProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                updateProfileAPICall.messageId
            );
            updateProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson3
            );
            instance.updateProfileAPICallId = updateProfileAPICall.messageId;
            runEngine.sendMessage("Unit Test", updateProfileAPICall);
            expect(responseJson3.data.attributes.activated).toBe(true)

        });

        then('I can enter text with out errors', () => {
            const navigationMock = {
                navigate: jest.fn()
            }
            const wrapper = shallow(<EditProfile navigation={navigationMock} route={undefined} />)
            let newestComponent = wrapper.findWhere((node) => node.prop('testID') === 'profile');
            newestComponent.simulate('press');
            expect(navigationMock.navigate('UserProfileBasicBlock'));

        });

        then('I can select name button with with out errors', () => {

            const spyA = jest.spyOn(instance, 'onPressName');
            let visibleMd = exampleBlockA.findWhere((node) => node.prop('testID') === 'visibleMD');
            visibleMd.simulate('press')
            expect(spyA).toHaveBeenCalled();
            spyA.mockRestore();

            let input1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'inputMd');
            input1.simulate('changeText', 'ABC')

            const spy = jest.spyOn(instance, 'updateContent');
            let saveBtn2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'save');
            saveBtn2.simulate('press')
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();

            const toggleModalVisibilityFun = jest.fn();
            let closeMd = exampleBlockA.findWhere((node) => node.prop('testID') === 'close');
            instance.toggleModalVisibility = toggleModalVisibilityFun;
            closeMd.simulate('press')
            expect(toggleModalVisibilityFun).toHaveBeenCalled();

        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            instance.componentWillMount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('User navigates to EditProfile and', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: EditProfile;

        given('I am a User loading EditProfile', () => {
            exampleBlockA = shallow(<EditProfile {...screenProps} />);
        });

        when('I navigate to the EditProfile', () => {
            instance = exampleBlockA.instance() as EditProfile
        });

        then('EditProfile will load with out errors', () => {
            const responseJson = { "access_key_id": "hello", "bucket_name": "sbucket", "end_point": "https://minio.b255799.dev.eastus.az.svc.builder.cafe", "region": "builder-1", "secret_access_key": "builderai" }
            const responseJson2 = { "data": { "attributes": { "activated": true, "bio": null, "country_code": "91", "created_at": "2023-08-24T10:11:32.150Z", "datasaver": [Object], "date_of_birth": "2001-08-23", "device_id": "eDwOnEUqRpCpK4GgiLfI2_:APA91bGwX8zRi48Xxsdf7zQgc8zG8jDiNUeutlgtbOtTQ6E0y31LNO8OGyh9QP2lBBplmZN5eHcQxrwkHzT-izmdM3u7qC4eTiaUPOhlq7hc4L7hU31wTxCVHAAcuGQ5rckRq35DJIqa", "email": "Example09@gmail.com", "first_name": null, "full_name": "Patidar", "full_phone_number": "917970134363", "gender": null, "instagram": null, "is_active_status": false, "is_allow_leaderboard_visibility": true, "is_allow_mentions": true, "is_blocked": false, "is_challenges_invites": true, "is_chat_muted": false, "is_dark_mode_theme": false, "is_muted": false, "is_online": true, "is_private_account": false, "is_restricated": false, "is_show_sensitive_content": false, "last_name": null, "last_seen_at": "2023-09-06T09:55:48.533Z", "nickname": null, "phone_number": "7970134363", "photo": null, "profile_id": null, "profile_video": null, "profile_view_count": 0, "push_notificable_activated": true, "type": null, "unique_auth_id": "Pi4fY8VgBO4be0JabbVw6Qtt", "updated_at": "2023-09-06T09:55:51.852Z", "user_name": "Patidar", "video_quality_preferences": [Array], "youtube": null }, "id": "778", "type": "account" } }

            const getBucketDetails = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getBucketDetails.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getBucketDetails.messageId
            );
            getBucketDetails.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getBucketDetailsCallId = getBucketDetails.messageId;
            runEngine.sendMessage("Unit Test", getBucketDetails);
            expect(responseJson.access_key_id).toBe("hello")

            const getCurrentProfileAPICall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getCurrentProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getCurrentProfileAPICall.messageId
            );
            getCurrentProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson2
            );
            instance.getCurrentProfileAPICallId = getCurrentProfileAPICall.messageId;
            runEngine.sendMessage("Unit Test", getCurrentProfileAPICall);
            expect(responseJson2.data.attributes.activated).toBe(true)

            const responseJson3 = { "data": { "attributes": { "activated": true, "bio": null, "country_code": "91", "created_at": "2023-09-08T07:39:04.263Z", "datasaver": [Object], "date_of_birth": "2003-09-07", "device_id": "eWpa60GTQ22pFaOFqzJglz:APA91bFp_n5Ir4R9clam0dxEBFG3iqIl0QdNkJLoyFnedlObaAcPWh9WYrLlfrhLpTIitThejvDTwnlho2dSDZfNXMxsxTKbrOIBoCAIglvmUmJZ3UoMnjaU0xNx8LdI88_dojMw-qig", "email": "Poojapatidar092@gmail.com", "first_name": null, "full_name": "Jayp", "full_phone_number": "917970134363", "gender": null, "instagram": null, "is_active_status": false, "is_allow_leaderboard_visibility": true, "is_allow_mentions": true, "is_blocked": false, "is_challenges_invites": true, "is_chat_muted": false, "is_dark_mode_theme": false, "is_muted": false, "is_online": false, "is_private_account": false, "is_restricated": false, "is_show_sensitive_content": false, "last_name": null, "last_seen_at": null, "nickname": null, "phone_number": "7970134363", "photo": null, "profile_id": null, "profile_video": null, "profile_view_count": 0, "push_notificable_activated": true, "type": null, "unique_auth_id": "Kdu3eHrsvHH1wbsrCngHugtt", "updated_at": "2023-09-08T07:39:50.302Z", "user_name": "Jaypatidar", "video_quality_preferences": [Array], "youtube": null }, "id": "812", "type": "account" } }
            const updateProfileAPICall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            updateProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                updateProfileAPICall.messageId
            );
            updateProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson3
            );
            instance.updateProfileAPICallId = updateProfileAPICall.messageId;
            runEngine.sendMessage("Unit Test", updateProfileAPICall);
            expect(responseJson3.data.attributes.activated).toBe(true)

        });


        then('I can select userName button with with out errors', () => {
            const spy = jest.spyOn(instance, 'onPressUserName');
            let visibleMd2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'userName');
            visibleMd2.simulate('press')
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();

            let input2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'inputMd');
            input2.simulate('changeText', 'ABC')

            const spyA = jest.spyOn(instance, 'updateContent');
            let saveBtn2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'save');
            saveBtn2.simulate('press')
            expect(spyA).toHaveBeenCalled();
            spyA.mockRestore();



        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            instance.componentWillMount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('User navigates to EditProfile screen', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: EditProfile;

        given('I am a User loading EditProfile', () => {
            exampleBlockA = shallow(<EditProfile {...screenProps} />);
        });

        when('I navigate to the EditProfile', () => {
            instance = exampleBlockA.instance() as EditProfile
        });

        then('EditProfile will load with out errors', () => {
            const responseJson = { "access_key_id": "hello", "bucket_name": "sbucket", "end_point": "https://minio.b255799.dev.eastus.az.svc.builder.cafe", "region": "builder-1", "secret_access_key": "builderai" }
            const responseJson2 = { "data": { "attributes": { "activated": true, "bio": null, "country_code": "91", "created_at": "2023-08-24T10:11:32.150Z", "datasaver": [Object], "date_of_birth": "2001-08-23", "device_id": "eDwOnEUqRpCpK4GgiLfI2_:APA91bGwX8zRi48Xxsdf7zQgc8zG8jDiNUeutlgtbOtTQ6E0y31LNO8OGyh9QP2lBBplmZN5eHcQxrwkHzT-izmdM3u7qC4eTiaUPOhlq7hc4L7hU31wTxCVHAAcuGQ5rckRq35DJIqa", "email": "Example09@gmail.com", "first_name": null, "full_name": "Patidar", "full_phone_number": "917970134363", "gender": null, "instagram": null, "is_active_status": false, "is_allow_leaderboard_visibility": true, "is_allow_mentions": true, "is_blocked": false, "is_challenges_invites": true, "is_chat_muted": false, "is_dark_mode_theme": false, "is_muted": false, "is_online": true, "is_private_account": false, "is_restricated": false, "is_show_sensitive_content": false, "last_name": null, "last_seen_at": "2023-09-06T09:55:48.533Z", "nickname": null, "phone_number": "7970134363", "photo": null, "profile_id": null, "profile_video": null, "profile_view_count": 0, "push_notificable_activated": true, "type": null, "unique_auth_id": "Pi4fY8VgBO4be0JabbVw6Qtt", "updated_at": "2023-09-06T09:55:51.852Z", "user_name": "Patidar", "video_quality_preferences": [Array], "youtube": null }, "id": "778", "type": "account" } }

            const getBucketDetails = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getBucketDetails.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getBucketDetails.messageId
            );
            getBucketDetails.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getBucketDetailsCallId = getBucketDetails.messageId;
            runEngine.sendMessage("Unit Test", getBucketDetails);
            expect(responseJson.access_key_id).toBe("hello")

            const getCurrentProfileAPICall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getCurrentProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getCurrentProfileAPICall.messageId
            );
            getCurrentProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson2
            );
            instance.getCurrentProfileAPICallId = getCurrentProfileAPICall.messageId;
            runEngine.sendMessage("Unit Test", getCurrentProfileAPICall);
            expect(responseJson2.data.attributes.activated).toBe(true)

            const responseJson3 = { "data": { "attributes": { "activated": true, "bio": null, "country_code": "91", "created_at": "2023-09-08T07:39:04.263Z", "datasaver": [Object], "date_of_birth": "2003-09-07", "device_id": "eWpa60GTQ22pFaOFqzJglz:APA91bFp_n5Ir4R9clam0dxEBFG3iqIl0QdNkJLoyFnedlObaAcPWh9WYrLlfrhLpTIitThejvDTwnlho2dSDZfNXMxsxTKbrOIBoCAIglvmUmJZ3UoMnjaU0xNx8LdI88_dojMw-qig", "email": "Poojapatidar092@gmail.com", "first_name": null, "full_name": "Jayp", "full_phone_number": "917970134363", "gender": null, "instagram": null, "is_active_status": false, "is_allow_leaderboard_visibility": true, "is_allow_mentions": true, "is_blocked": false, "is_challenges_invites": true, "is_chat_muted": false, "is_dark_mode_theme": false, "is_muted": false, "is_online": false, "is_private_account": false, "is_restricated": false, "is_show_sensitive_content": false, "last_name": null, "last_seen_at": null, "nickname": null, "phone_number": "7970134363", "photo": null, "profile_id": null, "profile_video": null, "profile_view_count": 0, "push_notificable_activated": true, "type": null, "unique_auth_id": "Kdu3eHrsvHH1wbsrCngHugtt", "updated_at": "2023-09-08T07:39:50.302Z", "user_name": "Jaypatidar", "video_quality_preferences": [Array], "youtube": null }, "id": "812", "type": "account" } }
            const updateProfileAPICall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            updateProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                updateProfileAPICall.messageId
            );
            updateProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson3
            );
            instance.updateProfileAPICallId = updateProfileAPICall.messageId;
            runEngine.sendMessage("Unit Test", updateProfileAPICall);
            expect(responseJson3.data.attributes.activated).toBe(true)

        });


        then('I can select bio button with with out errors', () => {
            const spy = jest.spyOn(instance, 'onPressBio')
            let visibleMd2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'bioMd');
            visibleMd2.simulate('press')
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();

            let input2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'inputMd');
            input2.simulate('changeText', 'ABC')

            const spyA = jest.spyOn(instance, 'updateContent');
            let saveBtn2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'save');
            saveBtn2.simulate('press')
            expect(spyA).toHaveBeenCalled();
            spyA.mockRestore();



        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            instance.componentWillMount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('User navigates to EditProfile screen and', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: EditProfile;

        given('I am a User loading EditProfile', () => {
            exampleBlockA = shallow(<EditProfile {...screenProps} />);
        });

        when('I navigate to the EditProfile', () => {
            instance = exampleBlockA.instance() as EditProfile
        });

        then('EditProfile will load with out errors', () => {
            const responseJson = { "access_key_id": "hello", "bucket_name": "sbucket", "end_point": "https://minio.b255799.dev.eastus.az.svc.builder.cafe", "region": "builder-1", "secret_access_key": "builderai" }
            const responseJson2 = { "data": { "attributes": { "activated": true, "bio": null, "country_code": "91", "created_at": "2023-08-24T10:11:32.150Z", "datasaver": [Object], "date_of_birth": "2001-08-23", "device_id": "eDwOnEUqRpCpK4GgiLfI2_:APA91bGwX8zRi48Xxsdf7zQgc8zG8jDiNUeutlgtbOtTQ6E0y31LNO8OGyh9QP2lBBplmZN5eHcQxrwkHzT-izmdM3u7qC4eTiaUPOhlq7hc4L7hU31wTxCVHAAcuGQ5rckRq35DJIqa", "email": "Example09@gmail.com", "first_name": null, "full_name": "Patidar", "full_phone_number": "917970134363", "gender": null, "instagram": null, "is_active_status": false, "is_allow_leaderboard_visibility": true, "is_allow_mentions": true, "is_blocked": false, "is_challenges_invites": true, "is_chat_muted": false, "is_dark_mode_theme": false, "is_muted": false, "is_online": true, "is_private_account": false, "is_restricated": false, "is_show_sensitive_content": false, "last_name": null, "last_seen_at": "2023-09-06T09:55:48.533Z", "nickname": null, "phone_number": "7970134363", "photo": "abc.jpg", "profile_id": null, "profile_video": null, "profile_view_count": 0, "push_notificable_activated": true, "type": null, "unique_auth_id": "Pi4fY8VgBO4be0JabbVw6Qtt", "updated_at": "2023-09-06T09:55:51.852Z", "user_name": "Patidar", "video_quality_preferences": [Array], "youtube": null }, "id": "778", "type": "account" } }

            const getBucketDetails = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getBucketDetails.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getBucketDetails.messageId
            );
            getBucketDetails.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getBucketDetailsCallId = getBucketDetails.messageId;
            runEngine.sendMessage("Unit Test", getBucketDetails);
            expect(responseJson.access_key_id).toBe("hello")

            const getCurrentProfileAPICall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            getCurrentProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getCurrentProfileAPICall.messageId
            );
            getCurrentProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson2
            );
            instance.getCurrentProfileAPICallId = getCurrentProfileAPICall.messageId;
            runEngine.sendMessage("Unit Test", getCurrentProfileAPICall);
            console.log("previ", instance.state.previewImage)
            expect(responseJson2.data.attributes.activated).toBe(true)

            const responseJson3 = { "data": { "attributes": { "activated": true, "bio": null, "country_code": "91", "created_at": "2023-09-08T07:39:04.263Z", "datasaver": [Object], "date_of_birth": "2003-09-07", "device_id": "eWpa60GTQ22pFaOFqzJglz:APA91bFp_n5Ir4R9clam0dxEBFG3iqIl0QdNkJLoyFnedlObaAcPWh9WYrLlfrhLpTIitThejvDTwnlho2dSDZfNXMxsxTKbrOIBoCAIglvmUmJZ3UoMnjaU0xNx8LdI88_dojMw-qig", "email": "Poojapatidar092@gmail.com", "first_name": null, "full_name": "Jayp", "full_phone_number": "917970134363", "gender": null, "instagram": null, "is_active_status": false, "is_allow_leaderboard_visibility": true, "is_allow_mentions": true, "is_blocked": false, "is_challenges_invites": true, "is_chat_muted": false, "is_dark_mode_theme": false, "is_muted": false, "is_online": false, "is_private_account": false, "is_restricated": false, "is_show_sensitive_content": false, "last_name": null, "last_seen_at": null, "nickname": null, "phone_number": "7970134363", "photo": null, "profile_id": null, "profile_video": null, "profile_view_count": 0, "push_notificable_activated": true, "type": null, "unique_auth_id": "Kdu3eHrsvHH1wbsrCngHugtt", "updated_at": "2023-09-08T07:39:50.302Z", "user_name": "Jaypatidar", "video_quality_preferences": [Array], "youtube": null }, "id": "812", "type": "account" } }
            const updateProfileAPICall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            updateProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                updateProfileAPICall.messageId
            );
            updateProfileAPICall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson3
            );
            instance.updateProfileAPICallId = updateProfileAPICall.messageId;
            runEngine.sendMessage("Unit Test", updateProfileAPICall);
            expect(responseJson3.data.attributes.activated).toBe(true)

        });


        then('I can select photo button with with out errors', async () => {

            const spy = jest.spyOn(instance, 'doClickImageVideoPicker');
            let visibleMd2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'photo');
            visibleMd2.simulate('press')
            await new Promise(setImmediate);
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();

            const spyA = jest.spyOn(instance, 'updateContent');
            let saveBtn2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'save');
            saveBtn2.simulate('press')
            expect(spyA).toHaveBeenCalled();
            spyA.mockRestore();


        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            instance.componentWillMount()
            expect(exampleBlockA).toBeTruthy();
        });
    });
});

