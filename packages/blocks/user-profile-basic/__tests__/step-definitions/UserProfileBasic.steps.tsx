import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
import * as utils from "../../../../framework/src/Utilities";

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import UserProfileBasicBlock from "../../src/UserProfileBasicBlock"
import UserProfileBasicBlockStyle from "../../src/UserProfileBasicBlockStyle"
const navigation = require("react-navigation")

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
            return {
               remove: jest.fn()
            }
          }),
      },
    id: "UserProfileBasicBlock",
    route:{ params: {account_id:40,data:{attributes:{account_id:"40"}}},showTab:1 }
  }

  const screenProps2 = {
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
            return {
               remove: jest.fn()
            }
          }),
      },
    id: "UserProfileBasicBlock",
    route:{ params:{data:{attributes:{account_id:"140"}},isCommentPost:true} }
  }

  const screenProps3 = {
    navigation: {
        state: { params: {} },
        goBack: jest.fn(),
        dismiss: jest.fn(),
        navigate: jest.fn(),
        getParam: jest.fn(),
        setParams: jest.fn(),
      },
    id: "UserProfileBasicBlock",
    route:{ params: { data:{attributes:{account_id:"150"}}}}
  }


const responseBookmark = {
    "data": [
        {
            "id": "224",
            "type": "bookmark",
            "attributes": {
                "id": 224,
                "account_id": 887,
                "post_id": 1360,
                "created_at": "2023-11-09T08:44:13.469Z",
                "updated_at": "2023-11-09T08:44:13.469Z",
                "post": {
                    "data": {
                        "id": "1360",
                        "type": "post",
                        "attributes": {
                            "id": 1360,
                            "name": "",
                            "description": "",
                            "body": "",
                            "location": null,
                            "latitude": "0",
                            "longitude": "0",
                            "is_like_by_current_user": false,
                            "account_id": 887,
                            "created_at": "2023-10-27T05:38:59.623Z",
                            "updated_at": "2023-10-27T05:38:59.623Z",
                            "tag_list": [],
                            "save_post_as": "create_post",
                            "visibility_setting": "Public",
                            "comment_setting": "Allow all Comments",
                            "audience_setting": "No restrictions to viewers",
                            "post_medias": {
                                "videos": [
                                    {
                                        "id": 1308,
                                        "media_url": "http://minio-ext.b255799.dev.eastus.az.svc.builder.cafe/sbucket/2u0dyr98rzbnjnfk68fiedshbn9d",
                                        "media_type": "Video",
                                        "audio_url": "",
                                        "post_id": 1360,
                                        "audio_title": "",
                                        "audio_artist": "",
                                        "audio_filename": "",
                                        "created_at": "2023-10-27T05:39:00.027Z",
                                        "updated_at": "2023-10-27T05:39:00.842Z",
                                        "video_thumnail": "http://minio-ext.b255799.dev.eastus.az.svc.builder.cafe/sbucket/nxqk1dp1ntqqx314jgm9om5bd8t2"
                                    }
                                ],
                                "thumnails": [
                                    "http://minio-ext.b255799.dev.eastus.az.svc.builder.cafe/sbucket/nxqk1dp1ntqqx314jgm9om5bd8t2"
                                ]
                            },
                            "post_likes_count": 1,
                            "post_comment_count": 0,
                            "photo": "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/bsy3uko7ob971b8proslrj1b84ws",
                            "schedule_time": null,
                            "video_post_thumbnail": null,
                            "taggings": [],
                            "notification": null,
                            "video_post": null,
                            "bookmarked": null,
                            "post_views": 0
                        }
                    }
                }
            }
        },
    ], "meta": {
        "pagination": {
            "prev_page": null,
            "current_page": 2,
            "next_page": null,
            "total_pages": 2,
            "total_count": 11,
            "pageValue":1
        }
    }
}

const responseBookmark1 = {
    "data": [
        {
            "id": "224",
            "type": "bookmark",
            "attributes": {
                "id": 224,
                "account_id": 887,
                "post_id": 1360,
                "created_at": "2023-11-09T08:44:13.469Z",
                "updated_at": "2023-11-09T08:44:13.469Z",
                "post": {
                    "data": {
                        "id": "1360",
                        "type": "post",
                        "attributes": {
                            "id": 1360,
                            "name": "",
                            "description": "",
                            "body": "",
                            "location": null,
                            "latitude": "0",
                            "longitude": "0",
                            "is_like_by_current_user": false,
                            "account_id": 887,
                            "created_at": "2023-10-27T05:38:59.623Z",
                            "updated_at": "2023-10-27T05:38:59.623Z",
                            "tag_list": [],
                            "save_post_as": "create_post",
                            "visibility_setting": "Public",
                            "comment_setting": "Allow all Comments",
                            "audience_setting": "No restrictions to viewers",
                            "post_medias": {
                                "videos": [
                                    {
                                        "id": 1308,
                                        "media_url": "http://minio-ext.b255799.dev.eastus.az.svc.builder.cafe/sbucket/2u0dyr98rzbnjnfk68fiedshbn9d",
                                        "media_type": "Video",
                                        "audio_url": "",
                                        "post_id": 1360,
                                        "audio_title": "",
                                        "audio_artist": "",
                                        "audio_filename": "",
                                        "created_at": "2023-10-27T05:39:00.027Z",
                                        "updated_at": "2023-10-27T05:39:00.842Z",
                                        "video_thumnail": "http://minio-ext.b255799.dev.eastus.az.svc.builder.cafe/sbucket/nxqk1dp1ntqqx314jgm9om5bd8t2"
                                    }
                                ],
                                "thumnails": [
                                    "http://minio-ext.b255799.dev.eastus.az.svc.builder.cafe/sbucket/nxqk1dp1ntqqx314jgm9om5bd8t2"
                                ]
                            },
                            "post_likes_count": 1,
                            "post_comment_count": 0,
                            "photo": "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/bsy3uko7ob971b8proslrj1b84ws",
                            "schedule_time": null,
                            "video_post_thumbnail": null,
                            "taggings": [],
                            "notification": null,
                            "video_post": null,
                            "bookmarked": null,
                            "post_views": 0
                        }
                    }
                }
            }
        },
    ], "meta": {
        "pagination": {
            "prev_page": null,
            "current_page": 1,
            "next_page": 2,
            "total_pages": 2,
            "total_count": 11,
            "pageValue":1
        }
    }
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
const feature = loadFeature('./__tests__/features/UserProfileBasic-scenario.feature');
const mockgetStorageData = jest.spyOn(utils, "getStorageData")

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        mockgetStorageData.mockImplementation((key) => {
            if("SelectedLng" === key) return Promise.resolve("ar")
            else return Promise.resolve("40")
          })
        jest.useFakeTimers();
    });

    test('User navigates to UserProfileBasicBlock', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:UserProfileBasicBlock; 

        given('I am a User loading UserProfileBasicBlock', () => {
            exampleBlockA = shallow(<UserProfileBasicBlock {...screenProps}/>)
        });

        when('I navigate to the UserProfileBasicBlock', () => {
            let routeProops = {...screenProps,route:{ params: {data: {attributes : { isCommentPost : true }}} }}
            exampleBlockA = shallow(<UserProfileBasicBlock {...screenProps}/>)
             instance = exampleBlockA.instance() as UserProfileBasicBlock

             //APIs
             const shareProfile = new Message(getName(MessageEnum.RestAPIResponceMessage))
             shareProfile.addData(getName(MessageEnum.RestAPIResponceDataMessage), shareProfile);
             shareProfile.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: {} }
            );
            shareProfile.addData(getName(MessageEnum.RestAPIResponceDataMessage), shareProfile.messageId);
            instance.shareProfileCallId = shareProfile.messageId
            runEngine.sendMessage("Unit Test", shareProfile);

             const shareProfile2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
             shareProfile.addData(getName(MessageEnum.RestAPIResponceDataMessage), shareProfile);
             shareProfile.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {}
            );
            shareProfile.addData(getName(MessageEnum.RestAPIResponceDataMessage), shareProfile.messageId);
            instance.shareProfileCallId = shareProfile.messageId
            runEngine.sendMessage("Unit Test", shareProfile);

            const blockUserApi = new Message(getName(MessageEnum.RestAPIResponceMessage))
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), blockUserApi);
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { meta: { message : "User blocked." } }
            );
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), blockUserApi.messageId);
            instance.blockUserAPICallId = blockUserApi.messageId
            runEngine.sendMessage("Unit Test", blockUserApi);

            const blockUserApi2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), blockUserApi);
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: {} }
            );
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), blockUserApi.messageId);
            instance.blockUserAPICallId = blockUserApi.messageId
            runEngine.sendMessage("Unit Test", blockUserApi);

            const restrictAccount = new Message(getName(MessageEnum.RestAPIResponceMessage))
            restrictAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), restrictAccount);
            restrictAccount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            restrictAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), restrictAccount.messageId);
            instance.restrictUserCallId = restrictAccount.messageId
            runEngine.sendMessage("Unit Test", restrictAccount);

            const unrestrict = new Message(getName(MessageEnum.RestAPIResponceMessage))
            unrestrict.addData(getName(MessageEnum.RestAPIResponceDataMessage), unrestrict);
            unrestrict.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            unrestrict.addData(getName(MessageEnum.RestAPIResponceDataMessage), unrestrict.messageId);
            instance.unrestrictUserCallId = unrestrict.messageId
            runEngine.sendMessage("Unit Test", unrestrict);

            const muteAccount = new Message(getName(MessageEnum.RestAPIResponceMessage))
            muteAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), muteAccount);
            muteAccount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            muteAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), muteAccount.messageId);
            instance.mutedUserCallId = muteAccount.messageId
            runEngine.sendMessage("Unit Test", muteAccount);

            const unmuteAccount = new Message(getName(MessageEnum.RestAPIResponceMessage))
            unmuteAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), unmuteAccount);
            unmuteAccount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            unmuteAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), unmuteAccount.messageId);
            instance.unmutedUserCallId = unmuteAccount.messageId
            runEngine.sendMessage("Unit Test", unmuteAccount);
            const getAccountPosts = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getAccountPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getAccountPosts);
            getAccountPosts.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            getAccountPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getAccountPosts.messageId);
            instance.getAccountPostsId = getAccountPosts.messageId
            runEngine.sendMessage("Unit Test", getAccountPosts);

            instance.props.route.params = {
                data: { attributes: { account_id: 73 } },
            };
            const getFollowings = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getFollowings.addData(getName(MessageEnum.RestAPIResponceDataMessage), getFollowings);
            getFollowings.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            getFollowings.addData(getName(MessageEnum.RestAPIResponceDataMessage), getFollowings.messageId);
            instance.getFollowingsId = getFollowings.messageId
            runEngine.sendMessage("Unit Test", getFollowings);

            instance.props.route.params = {
                data: { attributes: { account_id: '' } },
            };
            getFollowings.addData(getName(MessageEnum.RestAPIResponceDataMessage), getFollowings);
            getFollowings.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            getFollowings.addData(getName(MessageEnum.RestAPIResponceDataMessage), getFollowings.messageId);
            instance.getFollowingsId = getFollowings.messageId
            runEngine.sendMessage("Unit Test", getFollowings);

            const getFollow = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getFollow.addData(getName(MessageEnum.RestAPIResponceDataMessage), getFollow);
            getFollow.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            getFollow.addData(getName(MessageEnum.RestAPIResponceDataMessage), getFollow.messageId);
            instance.getFollowStatus = getFollow.messageId
            runEngine.sendMessage("Unit Test", getFollow);

            const followUserAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            followUserAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUserAPI);
            followUserAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            followUserAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUserAPI.messageId);
            instance.followUserAPICallId = followUserAPI.messageId
            runEngine.sendMessage("Unit Test", followUserAPI);

            const unfollowUserAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            unfollowUserAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), unfollowUserAPI);
            unfollowUserAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            unfollowUserAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), unfollowUserAPI.messageId);
            instance.unfollowUserAPICallId = unfollowUserAPI.messageId
            runEngine.sendMessage("Unit Test", unfollowUserAPI);

            const getFollowFollowerCount = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getFollowFollowerCount.addData(getName(MessageEnum.RestAPIResponceDataMessage), getFollowFollowerCount);
            getFollowFollowerCount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            getFollowFollowerCount.addData(getName(MessageEnum.RestAPIResponceDataMessage), getFollowFollowerCount.messageId);
            instance.getFollowFollowerCountAPICall = getFollowFollowerCount.messageId
            runEngine.sendMessage("Unit Test", getFollowFollowerCount);

            
            const getCurrentUserProfileDetails = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getCurrentUserProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCurrentUserProfileDetails);
            getCurrentUserProfileDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            getCurrentUserProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCurrentUserProfileDetails.messageId);
            instance.getCurrentUserProfileDetailsAPICall = getCurrentUserProfileDetails.messageId
            runEngine.sendMessage("Unit Test", getCurrentUserProfileDetails);

            const cancelRequest = new Message(getName(MessageEnum.RestAPIResponceMessage))
            cancelRequest.addData(getName(MessageEnum.RestAPIResponceDataMessage), cancelRequest);
            cancelRequest.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            cancelRequest.addData(getName(MessageEnum.RestAPIResponceDataMessage), cancelRequest.messageId);
            instance.cancelRequestApiId = cancelRequest.messageId
            runEngine.sendMessage("Unit Test", cancelRequest);

            const useProfileDetails = new Message(getName(MessageEnum.RestAPIResponceMessage))
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), useProfileDetails);
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), useProfileDetails.messageId);
            instance.useProfileDetailsAPICallId = useProfileDetails.messageId
            runEngine.sendMessage("Unit Test", useProfileDetails);

            const useProfileDetails2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), useProfileDetails);
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: {} }
            );
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), useProfileDetails.messageId);
            instance.useProfileDetailsAPICallId = useProfileDetails.messageId
            runEngine.sendMessage("Unit Test", useProfileDetails);

            const unfollowUser = new Message(getName(MessageEnum.RestAPIResponceMessage))
            unfollowUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), unfollowUser);
            unfollowUser.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            unfollowUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), unfollowUser.messageId);
            instance.unfollowUserApiId = unfollowUser.messageId
            runEngine.sendMessage("Unit Test", unfollowUser);

            const followUser = new Message(getName(MessageEnum.RestAPIResponceMessage))
            followUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUser);
            followUser.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            followUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUser.messageId);
            instance.followUserApiId = followUser.messageId
            runEngine.sendMessage("Unit Test", followUser);

            const getBookMarkPosts = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarkPosts);
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),responseBookmark
            );
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarkPosts.messageId);
            instance.getBookMarksId = getBookMarkPosts.messageId
            runEngine.sendMessage("Unit Test", getBookMarkPosts);

            const getBookMarkPosts2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarkPosts);
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: [] }
            );
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarkPosts.messageId);
            instance.getBookMarksId = getBookMarkPosts.messageId
            runEngine.sendMessage("Unit Test", getBookMarkPosts);


            const getLikesPosts = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getLikesPosts);
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getLikesPosts.messageId);
            instance.getLikesApiCallId = getLikesPosts.messageId
            runEngine.sendMessage("Unit Test", getLikesPosts);

            const getLikesPosts2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getLikesPosts);
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: [] }
            );
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getLikesPosts.messageId);
            instance.getLikesApiCallId = getLikesPosts.messageId
            runEngine.sendMessage("Unit Test", getLikesPosts);

            instance.fetchFollowings()
        });

        then('UserProfileBasicBlock will load with out errors', () => {
            const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenMsg);

            // const getUserData = new Message(
            //     getName(MessageEnum.RestAPIResponceMessage)
            //   );
            // getUserData.addData(
            //   getName(MessageEnum.RestAPIResponceDataMessage),
            //   getUserData.messageId
            // );
            // getUserData.addData(
            //   getName(MessageEnum.RestAPIResponceSuccessMessage),
            //   {data :instance.state.data.weekly}
            // );
            // instance.apiGetDataCallId = getUserData.messageId;
            // runEngine.sendMessage("Unit Test", getUserData);

            let toucWithoutFeedbackBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'toucWithoutFeedback');
            toucWithoutFeedbackBtn.simulate('press');
            expect(exampleBlockA).toBeTruthy()
            instance.componentDidMount()
            instance.profileHeader()
            instance.renderBookmarkLists()
            instance.renderBookmarkItem({})
            instance.renderLikesPostsList()
            instance.modalHeader()
            instance.keyExtractor({id: 1})
            instance.videoMenuScreenHeader()
            instance.renderLikeItem({})
            instance.keyBookmarkExtractor({ id : 2 })
            instance.keyLikesExtractor({ id : 3 })
            instance.handleBackButtonClick()
            instance.componentDidUpdate({route:{params:{account_id: 4}}}, {})
            instance.topHeaderUserProfile()
            instance.fetchUserProfile(1)
            let toucWithoutFeedbackBtn3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'backBtn');
            toucWithoutFeedbackBtn3.simulate('press');
        });

        then('I can press the buttons', () => {
            let toucWithoutFeedbackBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'visibleMdl');
            toucWithoutFeedbackBtn.simulate('press');
            
            //controllerFunctions
            instance.validateMobileAndThenUpdateUserProfile()
            instance.validateCountryCodeAndPhoneNumber('91','')

            instance.setState({ firstName: 'abc', lastName: 'xyz' })
            instance.validateAndUpdateProfile()

            instance.validateCurrentPwd('password')

            // instance.validatePassword("PASSword@@123")

            // instance.validateRePassword('PASSword@@123')

            instance.goToPrivacyPolicy()
            instance.goToTermsAndCondition()
            instance.requestSessionData()

            instance.isStringNullOrBlank('')

            instance.shareProfileSuccessCallback({ url: '' })
            instance.getAccountPostsSuccessCallback({data:''})
            instance.getAccountPostsSuccessCallback({data: ['No Posts Available']})
            instance.getAccountPostsFailureCallback({data:''})
            instance.getLikesSuccessCallback({})
            instance.getLikesFailureCallback({})
            instance.getFollowingsSuccessCallback({ followers: [{current_user_id: ''}] })
            instance.getFollowStatusSuccessCallback({ follow_status: 'Requested' })

            instance.closeBlockedUserModal()
            instance.closeRistrictUser()
            instance.closeMuteUser()

            instance.getUserProfile()
            instance.getValidations()

            instance.shareProfile()
            instance.blockUserApi()
            instance.restrictAccount()
            instance.unrestrict()
            instance.unrestrict()
            instance.muteAccount()
            instance.unmuteAccount()
            instance.useProfileDetails()
            instance.unfollowUser()
            instance.followUser()
            instance.getLikesPosts()

            instance.setState({ UserProfileDetails: { attributes: { is_private_account: true } } })
            instance.followUser()
            const followUser = new Message(getName(MessageEnum.RestAPIResponceMessage))
            followUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUser);
            followUser.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{ });
            followUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUser.messageId);
            instance.requestUserApiId = followUser.messageId
            runEngine.sendMessage("Unit Test", followUser);

            const followUser2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            followUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUser);
            followUser.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{ errors: [] });
            followUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUser.messageId);
            instance.requestUserApiId = followUser.messageId
            runEngine.sendMessage("Unit Test", followUser);
            
            instance.validateMobileOnServer('','')
            instance.followUserSuccessCallback({})
            instance.followUserFailureCallback({})
            instance.unfollowUserSuccessCallback({})
            instance.blockUserSucessCallBack({})

            instance.restrictUserSuccessCallback({ message : "User unrestricated." })
            instance.setState({accountId:null})
            instance.restrictUserSuccessCallback({ message : "User unrestricated." })
            instance.setState({accountId:"22"})
            instance.restrictUserSuccessCallback({})
            instance.unmuteUserSuccessCallback({})
            instance.mutedUserSuccessCallback({})

            instance.useProfileDetailsSucessCallBack({data:{attributes:{is_private_account:true}}})

            instance.followingsNavigate()
            instance.followersNavigate()
            instance.setState({accountId:""})
            instance.followingsNavigate()
            instance.followingsNavigate()

            instance.setState({currentCountryCode:null, phoneNumber:null})
            instance.validateMobileAndThenUpdateUserProfile()
            instance.validateCountryCodeAndPhoneNumber('91','1234567890')

            instance.enableDisableEditPassword(true)
            instance.enableDisableEditPassword(false)


            let followersBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'followers');
            followersBtn.simulate('press');

            let unfollowersBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'editprofile');
            unfollowersBtn.simulate('press');

            let DraftList = exampleBlockA.findWhere((node) => node.prop('testID') === 'draft');
            DraftList.simulate('press');

            let tabZeroBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'tabZero');
            tabZeroBtn.simulate('press');
            let tab1Btn = exampleBlockA.findWhere((node) => node.prop('testID') === 'tabOne');
            tab1Btn.simulate('press');

            const getBookMarksIdMessge = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.getBookMarksId = getBookMarksIdMessge.messageId;
            getBookMarksIdMessge.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarksIdMessge.messageId);
            getBookMarksIdMessge.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), responseBookmark1)
            runEngine.sendMessage("Unit Test", getBookMarksIdMessge)
           
            let flatListBookmark = exampleBlockA.findWhere((node) => node.prop('testID') === 'flatListBookmark');
            flatListBookmark.props().keyExtractor({}, 3);
            const flatlistIdRender = flatListBookmark.renderProp('renderItem')({ item: responseBookmark.data[0], index: 0 })
            flatListBookmark.renderProp("ListEmptyComponent")();
            flatListBookmark.renderProp("onEndReached")();

            let tab2Btn = exampleBlockA.findWhere((node) => node.prop('testID') === 'tabTwo');
            tab2Btn.simulate('press');

            let modalHeaderBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'modalHeader');
            modalHeaderBtn.simulate('requestClose');
            let touchable2Btn = exampleBlockA.findWhere((node) => node.prop('testID') === 'touchable2');
            touchable2Btn.simulate('press');
            let privacyBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'privacy');
            privacyBtn.simulate('press');
            let shareBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'share');
            jest.advanceTimersByTime(300);
            shareBtn.simulate('press');
            let trackerBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'pTracker');
            trackerBtn.simulate('press');

            instance.topHeaderUserProfile()
            instance.renderItem({})
            instance.componentDidUpdate({route:{params:{account_id:'101'}}},{})
            instance.componentDidMount()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy()
        });
    });

    test('User navigates to UserProfileBasicBlock with comments', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:UserProfileBasicBlock; 

        given('I am a User loading UserProfileBasicBlock', () => {
            exampleBlockA = shallow(<UserProfileBasicBlock {...screenProps2}/>)
        });

        when('I navigate to the UserProfileBasicBlock', () => {
            exampleBlockA = shallow(<UserProfileBasicBlock {...screenProps2}/>)
             instance = exampleBlockA.instance() as UserProfileBasicBlock

             //APIs
             const shareProfile = new Message(getName(MessageEnum.RestAPIResponceMessage))
             shareProfile.addData(getName(MessageEnum.RestAPIResponceDataMessage), shareProfile);
             shareProfile.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: {} }
            );
            shareProfile.addData(getName(MessageEnum.RestAPIResponceDataMessage), shareProfile.messageId);
            instance.shareProfileCallId = shareProfile.messageId
            runEngine.sendMessage("Unit Test", shareProfile);

             const shareProfile2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
             shareProfile.addData(getName(MessageEnum.RestAPIResponceDataMessage), shareProfile);
             shareProfile.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {}
            );
            shareProfile.addData(getName(MessageEnum.RestAPIResponceDataMessage), shareProfile.messageId);
            instance.shareProfileCallId = shareProfile.messageId
            runEngine.sendMessage("Unit Test", shareProfile);

            const blockUserApi = new Message(getName(MessageEnum.RestAPIResponceMessage))
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), blockUserApi);
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { meta: { message : "User blocked." } }
            );
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), blockUserApi.messageId);
            instance.blockUserAPICallId = blockUserApi.messageId
            runEngine.sendMessage("Unit Test", blockUserApi);

            const blockUserApi2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), blockUserApi);
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: {} }
            );
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), blockUserApi.messageId);
            instance.blockUserAPICallId = blockUserApi.messageId
            runEngine.sendMessage("Unit Test", blockUserApi);

            const getAccountPosts = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getAccountPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getAccountPosts);
            getAccountPosts.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
            { meta: { message : "Account bloacked" } }
        );
            getAccountPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getAccountPosts.messageId);
            instance.getAccountPostsId = getAccountPosts.messageId
            runEngine.sendMessage("Unit Test", getAccountPosts);

            getAccountPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getAccountPosts);
            getAccountPosts.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: {} }
            );
            getAccountPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getAccountPosts.messageId);
            instance.getAccountPostsId = getAccountPosts.messageId
            runEngine.sendMessage("Unit Test", getAccountPosts);

            const followUserAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            followUserAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUserAPI);
            followUserAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
            { meta: { message : "follow failure" } }
            );
            followUserAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUserAPI.messageId);
            instance.followUserAPICallId = followUserAPI.messageId
            runEngine.sendMessage("Unit Test", followUserAPI);

            followUserAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUserAPI);
            followUserAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: {} }
            );
            followUserAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUserAPI.messageId);
            instance.followUserAPICallId = followUserAPI.messageId
            runEngine.sendMessage("Unit Test", followUserAPI);

            const unfollowUserAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            unfollowUserAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), unfollowUserAPI);
            unfollowUserAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
            { meta: { message : "follow failure" } }
            );
            unfollowUserAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), unfollowUserAPI.messageId);
            instance.unfollowUserAPICallId = unfollowUserAPI.messageId
            runEngine.sendMessage("Unit Test", unfollowUserAPI);

            unfollowUserAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), unfollowUserAPI);
            unfollowUserAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: {} }
            );
            unfollowUserAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), unfollowUserAPI.messageId);
            instance.unfollowUserAPICallId = unfollowUserAPI.messageId
            runEngine.sendMessage("Unit Test", unfollowUserAPI);


            const getCurrentUserProfileDetails = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getCurrentUserProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCurrentUserProfileDetails);
            getCurrentUserProfileDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
            { meta: { message : "follow failure" } }
            );
            getCurrentUserProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCurrentUserProfileDetails.messageId);
            instance.getCurrentUserProfileDetailsAPICall = getCurrentUserProfileDetails.messageId
            runEngine.sendMessage("Unit Test", getCurrentUserProfileDetails);

            getCurrentUserProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCurrentUserProfileDetails);
            getCurrentUserProfileDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: {} }
            );
            getCurrentUserProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCurrentUserProfileDetails.messageId);
            instance.getCurrentUserProfileDetailsAPICall = getCurrentUserProfileDetails.messageId
            runEngine.sendMessage("Unit Test", getCurrentUserProfileDetails);
            const restrictAccount = new Message(getName(MessageEnum.RestAPIResponceMessage))
            restrictAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), restrictAccount);
            restrictAccount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            restrictAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), restrictAccount.messageId);
            instance.restrictUserCallId = restrictAccount.messageId
            runEngine.sendMessage("Unit Test", restrictAccount);

            const unrestrict = new Message(getName(MessageEnum.RestAPIResponceMessage))
            unrestrict.addData(getName(MessageEnum.RestAPIResponceDataMessage), unrestrict);
            unrestrict.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            unrestrict.addData(getName(MessageEnum.RestAPIResponceDataMessage), unrestrict.messageId);
            instance.unrestrictUserCallId = unrestrict.messageId
            runEngine.sendMessage("Unit Test", unrestrict);

            const muteAccount = new Message(getName(MessageEnum.RestAPIResponceMessage))
            muteAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), muteAccount);
            muteAccount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            muteAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), muteAccount.messageId);
            instance.mutedUserCallId = muteAccount.messageId
            runEngine.sendMessage("Unit Test", muteAccount);

            const unmuteAccount = new Message(getName(MessageEnum.RestAPIResponceMessage))
            unmuteAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), unmuteAccount);
            unmuteAccount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            unmuteAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), unmuteAccount.messageId);
            instance.unmutedUserCallId = unmuteAccount.messageId
            runEngine.sendMessage("Unit Test", unmuteAccount);

            const useProfileDetails = new Message(getName(MessageEnum.RestAPIResponceMessage))
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), useProfileDetails);
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), useProfileDetails.messageId);
            instance.useProfileDetailsAPICallId = useProfileDetails.messageId
            runEngine.sendMessage("Unit Test", useProfileDetails);

            const useProfileDetails2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), useProfileDetails);
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: {} }
            );
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), useProfileDetails.messageId);
            instance.useProfileDetailsAPICallId = useProfileDetails.messageId
            runEngine.sendMessage("Unit Test", useProfileDetails);

            const unfollowUser = new Message(getName(MessageEnum.RestAPIResponceMessage))
            unfollowUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), unfollowUser);
            unfollowUser.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            unfollowUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), unfollowUser.messageId);
            instance.unfollowUserApiId = unfollowUser.messageId
            runEngine.sendMessage("Unit Test", unfollowUser);

            const followUser = new Message(getName(MessageEnum.RestAPIResponceMessage))
            followUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUser);
            followUser.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            followUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUser.messageId);
            instance.followUserApiId = followUser.messageId
            runEngine.sendMessage("Unit Test", followUser);

            const getBookMarkPosts = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarkPosts);
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
            responseBookmark
            );
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarkPosts.messageId);
            instance.getBookMarksId = getBookMarkPosts.messageId
            runEngine.sendMessage("Unit Test", getBookMarkPosts);

            const getBookMarkPosts2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarkPosts);
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: [] }
            );
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarkPosts.messageId);
            instance.getBookMarksId = getBookMarkPosts.messageId
            runEngine.sendMessage("Unit Test", getBookMarkPosts);


            const getLikesPosts = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getLikesPosts);
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getLikesPosts.messageId);
            instance.getLikesApiCallId = getLikesPosts.messageId
            runEngine.sendMessage("Unit Test", getLikesPosts);

            const getLikesPosts2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getLikesPosts);
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: [] }
            );
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getLikesPosts.messageId);
            instance.getLikesApiCallId = getLikesPosts.messageId
            runEngine.sendMessage("Unit Test", getLikesPosts);
        });

        then('UserProfileBasicBlock will load with out errors', () => {
            let toucWithoutFeedbackBtn3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'backBtn');
            toucWithoutFeedbackBtn3.simulate('press');

        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy()
        });
    });

    test('User navigates to UserProfileBasicBlock without params', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:UserProfileBasicBlock; 

        given('I am a User loading UserProfileBasicBlock', () => {
            exampleBlockA = shallow(<UserProfileBasicBlock {...screenProps3}/>)
        });

        when('I navigate to the UserProfileBasicBlock', () => {
            exampleBlockA = shallow(<UserProfileBasicBlock {...screenProps3}/>)
             instance = exampleBlockA.instance() as UserProfileBasicBlock

             //APIs
             const shareProfile = new Message(getName(MessageEnum.RestAPIResponceMessage))
             shareProfile.addData(getName(MessageEnum.RestAPIResponceDataMessage), shareProfile);
             shareProfile.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: {} }
            );
            shareProfile.addData(getName(MessageEnum.RestAPIResponceDataMessage), shareProfile.messageId);
            instance.shareProfileCallId = shareProfile.messageId
            runEngine.sendMessage("Unit Test", shareProfile);

             const shareProfile2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
             shareProfile.addData(getName(MessageEnum.RestAPIResponceDataMessage), shareProfile);
             shareProfile.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {}
            );
            shareProfile.addData(getName(MessageEnum.RestAPIResponceDataMessage), shareProfile.messageId);
            instance.shareProfileCallId = shareProfile.messageId
            runEngine.sendMessage("Unit Test", shareProfile);

            const blockUserApi = new Message(getName(MessageEnum.RestAPIResponceMessage))
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), blockUserApi);
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { meta: { message : "User blocked." } }
            );
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), blockUserApi.messageId);
            instance.blockUserAPICallId = blockUserApi.messageId
            runEngine.sendMessage("Unit Test", blockUserApi);

            const blockUserApi2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), blockUserApi);
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: {} }
            );
            blockUserApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), blockUserApi.messageId);
            instance.blockUserAPICallId = blockUserApi.messageId
            runEngine.sendMessage("Unit Test", blockUserApi);

            const restrictAccount = new Message(getName(MessageEnum.RestAPIResponceMessage))
            restrictAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), restrictAccount);
            restrictAccount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            restrictAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), restrictAccount.messageId);
            instance.restrictUserCallId = restrictAccount.messageId
            runEngine.sendMessage("Unit Test", restrictAccount);

            const unrestrict = new Message(getName(MessageEnum.RestAPIResponceMessage))
            unrestrict.addData(getName(MessageEnum.RestAPIResponceDataMessage), unrestrict);
            unrestrict.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            unrestrict.addData(getName(MessageEnum.RestAPIResponceDataMessage), unrestrict.messageId);
            instance.unrestrictUserCallId = unrestrict.messageId
            runEngine.sendMessage("Unit Test", unrestrict);

            const muteAccount = new Message(getName(MessageEnum.RestAPIResponceMessage))
            muteAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), muteAccount);
            muteAccount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            muteAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), muteAccount.messageId);
            instance.mutedUserCallId = muteAccount.messageId
            runEngine.sendMessage("Unit Test", muteAccount);


            const unmuteAccount = new Message(getName(MessageEnum.RestAPIResponceMessage))
            unmuteAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), unmuteAccount);
            unmuteAccount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            unmuteAccount.addData(getName(MessageEnum.RestAPIResponceDataMessage), unmuteAccount.messageId);
            instance.unmutedUserCallId = unmuteAccount.messageId
            runEngine.sendMessage("Unit Test", unmuteAccount);

            const useProfileDetails = new Message(getName(MessageEnum.RestAPIResponceMessage))
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), useProfileDetails);
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), useProfileDetails.messageId);
            instance.useProfileDetailsAPICallId = useProfileDetails.messageId
            runEngine.sendMessage("Unit Test", useProfileDetails);

            const useProfileDetails2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), useProfileDetails);
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: {} }
            );
            useProfileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), useProfileDetails.messageId);
            instance.useProfileDetailsAPICallId = useProfileDetails.messageId
            runEngine.sendMessage("Unit Test", useProfileDetails);

            const unfollowUser = new Message(getName(MessageEnum.RestAPIResponceMessage))
            unfollowUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), unfollowUser);
            unfollowUser.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            unfollowUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), unfollowUser.messageId);
            instance.unfollowUserApiId = unfollowUser.messageId
            runEngine.sendMessage("Unit Test", unfollowUser);

            const followUser = new Message(getName(MessageEnum.RestAPIResponceMessage))
            followUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUser);
            followUser.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            followUser.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUser.messageId);
            instance.followUserApiId = followUser.messageId
            runEngine.sendMessage("Unit Test", followUser);

            const getBookMarkPosts = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarkPosts);
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
            responseBookmark
            );
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarkPosts.messageId);
            instance.getBookMarksId = getBookMarkPosts.messageId
            runEngine.sendMessage("Unit Test", getBookMarkPosts);

            const getBookMarkPosts2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarkPosts);
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: [] }
            );
            getBookMarkPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarkPosts.messageId);
            instance.getBookMarksId = getBookMarkPosts.messageId
            runEngine.sendMessage("Unit Test", getBookMarkPosts);


            const getLikesPosts = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getLikesPosts);
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
            );
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getLikesPosts.messageId);
            instance.getLikesApiCallId = getLikesPosts.messageId
            runEngine.sendMessage("Unit Test", getLikesPosts);

            const getLikesPosts2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getLikesPosts);
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: [] }
            );
            getLikesPosts.addData(getName(MessageEnum.RestAPIResponceDataMessage), getLikesPosts.messageId);
            instance.getLikesApiCallId = getLikesPosts.messageId
            runEngine.sendMessage("Unit Test", getLikesPosts);
        });

        then('UserProfileBasicBlock will load with out errors', () => {
            let toucWithoutFeedbackBtn3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'backBtn');
            toucWithoutFeedbackBtn3.simulate('press');
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy()
        });
    });
});
