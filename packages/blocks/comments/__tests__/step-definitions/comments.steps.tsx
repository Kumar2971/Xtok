import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Comments from "../../src/Comments";
import * as utils from "../../../../framework/src/Utilities";
import { Platform } from "react-native"

const navigation = require("react-navigation")

const screenProps = {
  navigation: {
    goBack: jest.fn(),
    dismiss: jest.fn(),
    navigate: jest.fn(),
    addListener: jest.fn().mockImplementation((event, callback) => {
        callback();
        return {
           remove: jest.fn(),
           willFocus: jest.fn()
        }
      }),
  },
    id: "Comments",
    route:{params:{
      type:"profile",
      isFromLikesProfile: true,
      isCommentPost:true,
      isSearchFrom:"hashtag_top",
      isFromNotification:true,
      searchItem:"nature",post_id:'799'
    }}
  }

  const screenProps1 = {
    navigation: {
      goBack: jest.fn(),
      dismiss: jest.fn(),
      navigate: jest.fn(),
      addListener: jest.fn().mockImplementation((event, callback) => {
          callback();
          return {
             remove: jest.fn(),
             willFocus: jest.fn()
          }
        }),
    },
      id: "Comments",
      route:{params:{isFromLikesProfile: true,isCommentPost:true,isSearchFrom:"hashtag_trending",isFromNotification:true}}
  }
  const screenProps2 = {
    navigation: {   
      navigate: jest.fn(),
      setParams: jest.fn(),
      addListener: jest.fn().mockImplementation((event, callback) => {
        callback();
        return {
           remove: jest.fn(),
           willFocus: jest.fn()
        }
      }),
    },
      id: "Comments",
      route:{params:{type:"post" ,showTab:1,isCommentPost:true,isSearchFrom:"hashtag_recent",searchItem:"nature",post_id:'799'}}
  }
  const screenProps3 = {
    navigation: {   
      navigate: jest.fn(),
      goBack: jest.fn(),
      addListener: jest.fn().mockImplementation((event, callback) => {
        callback();
        return {
           remove: jest.fn(),
           willFocus: jest.fn()
        }
      }),
    },
      id: "Comments",
      route:{params:{type:"LikeActivity",isCommentPost:true,isSearchFrom:"hashtag_recent",searchItem:"nature",post_id:'799'}}
  }
  const screenProps4 = {
    navigation: {   
      navigate: jest.fn(),
    },
      id: "Comments",
      route:{params:{type:"CommentActivity",isCommentPost:true,isSearchFrom:"location_top",searchItem:"nature",post_id:'799',showTab: 1}}
  }
  const screenProps5 = {
    navigation: {   
      navigate: jest.fn(),
      addListener: jest.fn().mockImplementation((event, callback) => {
        callback();
        return {
           remove: jest.fn(),
           willFocus: jest.fn()
        }
      }),
    },
      id: "Comments",
      route:{params:{type:"NotInterestedActivity",isCommentPost:true,isSearchFrom:"location_trending",searchItem:"nature",post_id:'799'}}
  }
  const screenProps6 = {
    navigation: {   
      navigate: jest.fn(),
      addListener: jest.fn().mockImplementation((event, callback) => {
        callback();
        return {
           remove: jest.fn(),
           willFocus: jest.fn()
        }
      }),
    },
      id: "Comments",
      route:{params:{type:"SavedActivity",isSearchFrom:"location_recent",searchItem:"nature",post_id:'799'}}
  }
  const screenProps7 = {
    navigation: {   
      navigate: jest.fn(),
      addListener: jest.fn().mockImplementation((event, callback) => {
        callback();
        return {
           remove: jest.fn(),
           willFocus: jest.fn()
        }
      }),
    },
      id: "Comments",
      route:{params:{type:"SearchActivity",isSearchFrom:"hashtag_top",searchItem:"nature",post_id:'799'}}
  }
  const screenProps_trending = {
    navigation: {   
      navigate: jest.fn(),
    },
      id: "Comments",
      route:{params:{type:"SearchActivity",isSearchFrom:"hashtag_trending",searchItem:"nature",post_id:'799'}}
  }
  const screenProps_hashtag_recent= {
    navigation: {   
      navigate: jest.fn(),
    },
      id: "Comments",
      route:{params:{type:"SearchActivity",isSearchFrom:"hashtag_recent",searchItem:"nature",post_id:'799'}}
  }
  const screenProps_location_top= {
    navigation: {   
      navigate: jest.fn(),
    },
      id: "Comments",
      route:{params:{type:"SearchActivity",isSearchFrom:"location_top",searchItem:"nature",post_id:'799'}}
  }
  const screenProps_location_trending= {
    navigation: {   
      navigate: jest.fn(),
    },
      id: "Comments",
      route:{params:{type:"SearchActivity",isSearchFrom:"location_trending",searchItem:"nature",post_id:'799'}}
  }
  const screenProps_location_recent= {
    navigation: {   
      navigate: jest.fn(),
    },
      id: "Comments",
      route:{params:{type:"SearchActivity",isSearchFrom:"location_recent",searchItem:"nature",post_id:'799'}}
  }
  const screenProps8 = {
    navigation: {   
      navigate: jest.fn(),
      goBack: jest.fn(),
      addListener: jest.fn().mockImplementation((event, callback) => {
        callback();
        return {
           remove: jest.fn(),
           willFocus: jest.fn()
        }
      }),
    },
      id: "Comments",
      route:{params:{type:"Notification",isFromNotification:true}}
  }
  const screenProps9 = {
    navigation: {   
      navigate: jest.fn(),
      goBack: jest.fn(),
      addListener: jest.fn().mockImplementation((event, callback) => {
        callback();
        return {
           remove: jest.fn(),
           willFocus: jest.fn()
        }
      }),
    },
      id: "Comments",
      route:{params:{type:"Notification"}}
  }
  const screenProps10 = {
    navigation: {   
      navigate: jest.fn(),
      addListener: jest.fn().mockImplementation((event, callback) => {
        callback();
        return {
           remove: jest.fn(),
           willFocus: jest.fn()
        }
      }),
    },
      id: "Comments",
      route:{params:{type:"bookmark",showTab:1}}
  }
  const screenProps11= {
    navigation: {   
      navigate: jest.fn(),
      goBack: jest.fn(),
      addListener: jest.fn().mockImplementation((event, callback) => {
        callback();
        return {
           remove: jest.fn(),
           willFocus: jest.fn()
        }
      }),
    },
      id: "Comments",
      route:{params:{type:"bookmark",isCommentPost:true,showTab:1}}
  }

  const mockgetStorageData = jest.spyOn(utils, "getStorageData")
  const mockgetSetStorageData = jest.spyOn(utils, "setStorageData")

const feature = loadFeature('./__tests__/features/comments-scenario.feature');
const MOCK_RESULT_SUCCESS_FollowingData = {
  "data": [
      {
          "id": "767",
          "type": "post",
          "attributes": {
              "id": 767,
              "name": "#nothern\n#computer ",
              "description": "",
              "body": "#nothern\n#computer ",
              "location": null,
              "latitude": null,
              "longitude": null,
              "is_like_by_current_user": true,
              "account_id": 359,
              "created_at": "2023-07-28T06:38:13.955Z",
              "updated_at": "2023-07-28T06:38:13.955Z",
              "tag_list": [],
              "save_post_as": "create_post",
              "visibility_setting": "Public",
              "comment_setting": "Allow all Comments",
              "audience_setting": "No restrictions to viewers",
              "post_medias": {
                  "images": [],
                  "videos": [
                      {
                          "id": 723,
                          "media_url": "",
                          "media_type": "Video",
                          "audio_url": "",
                          "post_id": 767,
                          "audio_title": "audi title...",
                          "audio_artist": null,
                          "audio_filename": null,
                          "created_at": "2023-07-28T06:38:13.963Z",
                          "updated_at": "2023-07-28T06:38:14.677Z",
                          "video_thumnail": "http://minio-ext.b255799.stage.eastus.az.svc.builder.ai/sbucket/h14nekuqnskegksmlbecyjfex7oq"
                      }
                  ],
                  "thumnails": [
                      "http://minio-ext.b255799.stage.eastus.az.svc.builder.ai/sbucket/h14nekuqnskegksmlbecyjfex7oq"
                  ]
              },
              "post_likes_count": 0,
              "post_comment_count": 0,
              "photo": "https://minio.b255799.stage.eastus.az.svc.builder.ai/sbucket/yza7xq0bu29gb3vhu9jswvb1m2dy",
              "schedule_time": null,
              "video_post_thumbnail": null,
              "taggings": [],
              "notification": null,
              "video_post": null,
              "bookmarked": true,
              "post_views": 0
          }
      },
      {
          "id": "765",
          "type": "post",
          "attributes": {
              "id": 765,
              "name": "Nothern lights casino\n",
              "description": "",
              "body": "Nothern lights casino\n",
              "location": "Northern Lights Casino, Y Frontage Road Northwest, Walker, MN, USA",
              "latitude": null,
              "longitude": null,
              "is_like_by_current_user": false,
              "account_id": 359,
              "created_at": "2023-07-28T06:30:31.431Z",
              "updated_at": "2023-07-28T06:30:31.431Z",
              "tag_list": [],
              "save_post_as": "create_post",
              "visibility_setting": "Public",
              "comment_setting": "Allow all Comments",
              "audience_setting": "No restrictions to viewers",
              "post_medias": {
                  "images": [],
                  "videos": [
                      {
                          "id": 722,
                          "media_url": "http://minio-ext.b255799.stage.eastus.az.svc.builder.ai/sbucket/l5991f2ztcm152jrybnkoyevjrli",
                          "media_type": "Video",
                          "audio_url": "",
                          "post_id": 766,
                          "audio_title": null,
                          "audio_artist": null,
                          "audio_filename": null,
                          "created_at": "2023-07-28T06:30:31.437Z",
                          "updated_at": "2023-07-28T06:30:31.828Z",
                          "video_thumnail": "http://minio-ext.b255799.stage.eastus.az.svc.builder.ai/sbucket/8psq2dcyjwrgi8iea4ww5wnqwxti"
                      }
                  ],
                  "thumnails": [
                      "http://minio-ext.b255799.stage.eastus.az.svc.builder.ai/sbucket/8psq2dcyjwrgi8iea4ww5wnqwxti"
                  ]
              },
              "post_likes_count": 0,
              "post_comment_count": 0,
              "photo": "https://minio.b255799.stage.eastus.az.svc.builder.ai/sbucket/yza7xq0bu29gb3vhu9jswvb1m2dy",
              "schedule_time": null,
              "video_post_thumbnail": null,
              "taggings": [],
              "notification": null,
              "video_post": null,
              "bookmarked": false,
              "post_views": 0
          }
      }
  ],
  "meta": {
      "pagination": {
          "prev_page": null,
          "current_page": 1,
          "next_page": 2,
          "total_pages": 2,
          "total_count": 10
      }
  }
}
const MOCK_RESULT_SUCCESS_FollowingData_String = {
  "data": [
      "response here"
  ],
  "meta": {
      "pagination": {
          "prev_page": null,
          "current_page": 1,
          "next_page": 2,
          "total_pages": 2,
          "total_count": 10
      }
  }
}
const MOCK_RESULT_SUCCESS_FollowingData2 = {
  "data": [
      {
          "id": "766",
          "type": "post",
          "attributes": {
              "id": 766,
              "name": "Nothern lights casino\n",
              "description": "",
              "body": "Nothern lights casino\n",
              "location": "Northern Lights Casino, Y Frontage Road Northwest, Walker, MN, USA",
              "latitude": null,
              "longitude": null,
              "is_like_by_current_user": false,
              "account_id": 766,
              "created_at": "2023-07-28T06:30:31.431Z",
              "updated_at": "2023-07-28T06:30:31.431Z",
              "tag_list": [],
              "save_post_as": "create_post",
              "visibility_setting": "Public",
              "comment_setting": "Hold all comments for review",
              "audience_setting": "No restrictions to viewers",
              "post_medias": {
                  "images": [],
                  "videos": [
                      {
                          "id": 722,
                          "media_url": "http://minio-ext.b255799.stage.eastus.az.svc.builder.ai/sbucket/l5991f2ztcm152jrybnkoyevjrli",
                          "media_type": "Video",
                          "audio_url": "",
                          "post_id": 766,
                          "audio_title": null,
                          "audio_artist": null,
                          "audio_filename": null,
                          "created_at": "2023-07-28T06:30:31.437Z",
                          "updated_at": "2023-07-28T06:30:31.828Z",
                          "video_thumnail": "http://minio-ext.b255799.stage.eastus.az.svc.builder.ai/sbucket/8psq2dcyjwrgi8iea4ww5wnqwxti"
                      }
                  ],
                  "thumnails": [
                      "http://minio-ext.b255799.stage.eastus.az.svc.builder.ai/sbucket/8psq2dcyjwrgi8iea4ww5wnqwxti"
                  ]
              },
              "post_likes_count": 1,
              "post_comment_count": 0,
              "photo": null,
              "schedule_time": null,
              "video_post_thumbnail": null,
              "taggings": [],
              "notification": null,
              "video_post": null,
              "bookmarked": false,
              "post_views": 0,
              "liked": true
          }
      }
  ],
  "meta": {
      "pagination": {
          "prev_page": null,
          "current_page": 1,
          "next_page": 2,
          "total_pages": 2,
          "total_count": 10
      }
  }
}
const MOCK_RESULT_SUCCESS_FollowingData3 = {
  "data": [
      {
          "id": "954",
          "type": "post",
          "attributes": {
              "id": 954,
              "name": "Nothern lights casino\n",
              "description": "",
              "body": "Nothern lights casino\n",
              "location": "Northern Lights Casino, Y Frontage Road Northwest, Walker, MN, USA",
              "latitude": null,
              "longitude": null,
              "is_like_by_current_user": false,
              "account_id": 555,
              "created_at": "2023-07-28T06:30:31.431Z",
              "updated_at": "2023-07-28T06:30:31.431Z",
              "tag_list": [],
              "save_post_as": "create_post",
              "visibility_setting": "Public",
              "comment_setting": "Disable comments",
              "audience_setting": "No restrictions to viewers",
              "post_medias": {
                  "images": [],
                  "videos": [
                      {
                          "id": 722,
                          "media_url": "http://minio-ext.b255799.stage.eastus.az.svc.builder.ai/sbucket/l5991f2ztcm152jrybnkoyevjrli",
                          "media_type": "Video",
                          "audio_url": "",
                          "post_id": 766,
                          "audio_title": null,
                          "audio_artist": null,
                          "audio_filename": null,
                          "created_at": "2023-07-28T06:30:31.437Z",
                          "updated_at": "2023-07-28T06:30:31.828Z",
                          "video_thumnail": "http://minio-ext.b255799.stage.eastus.az.svc.builder.ai/sbucket/8psq2dcyjwrgi8iea4ww5wnqwxti"
                      }
                  ],
                  "thumnails": [
                      "http://minio-ext.b255799.stage.eastus.az.svc.builder.ai/sbucket/8psq2dcyjwrgi8iea4ww5wnqwxti"
                  ]
              },
              "post_likes_count": 1,
              "post_comment_count": 0,
              "photo": "https://minio.b255799.stage.eastus.az.svc.builder.ai/sbucket/yza7xq0bu29gb3vhu9jswvb1m2dy",
              "schedule_time": null,
              "video_post_thumbnail": null,
              "taggings": [],
              "notification": null,
              "video_post": null,
              "bookmarked": false,
              "post_views": 0,
              "liked": true
          }
      }
  ]
}
const profile_Data = {
  "data": {
      "id": "335",
      "type": "account",
      "attributes": {
          "activated": true,
          "country_code": "91",
          "email": "herry@mailinator.com",
          "first_name": null,
          "full_phone_number": "919688811333",
          "last_name": null,
          "phone_number": "9687806011",
          "type": null,
          "created_at": "2023-06-28T08:07:42.942Z",
          "updated_at": "2023-09-06T06:21:18.259Z",
          "device_id": "eEh-kqIVS86LTcIeUTiu71:APA91bFG_EWMnAnr8Fu7U3ujB6TDFFXV6qbhUbdqWqHVUJ1OJeeR5yssYno-kG2eLiNXYVk-4vp98InZTxnCR-uAD2dxssaXi-yv04_3QwdEP3uIx8lj6y7UeR4UEYEmM__zVfTeWXWu",
          "unique_auth_id": "7hP47MAQpOQrreY3MxoxLQtt",
          "gender": null,
          "date_of_birth": "2000-06-27",
          "full_name": "Axita Khunt",
          "user_name": "Axita_khunt31",
          "bio": null,
          "instagram": null,
          "youtube": null,
          "is_online": true,
          "nickname": null,
          "last_seen_at": "2023-09-06T04:41:31.302Z",
          "push_notificable_activated": true,
          "is_blocked": false,
          "is_chat_muted": false,
          "is_muted": false,
          "is_restricated": false,
          "profile_id": null,
          "profile_view_count": 0,
          "photo": "https://minio.b255799.stage.eastus.az.svc.builder.ai/sbucket/e1m3pwkb5ha5oqncdhf0i4p45f0t",
          "profile_video": null,
          "is_active_status": false,
          "is_private_account": false,
          "is_challenges_invites": true,
          "is_allow_mentions": true,
          "is_allow_leaderboard_visibility": true,
          "is_show_sensitive_content": false,
          "is_dark_mode_theme": false,
          "video_quality_preferences": [
              {
                  "id": 338,
                  "network_type": "wifi",
                  "quality": "auto",
                  "account_id": 335,
                  "created_at": "2023-06-28T08:07:43.037Z",
                  "updated_at": "2023-06-28T08:07:43.037Z"
              },
              {
                  "id": 337,
                  "network_type": "mobile",
                  "quality": "auto",
                  "account_id": 335,
                  "created_at": "2023-06-28T08:07:43.028Z",
                  "updated_at": "2023-06-28T08:07:43.028Z"
              }
          ],
          "datasaver": {
              "id": 169,
              "mobile_data_restricted": false,
              "data_saver_enabled": false,
              "reduce_video_quality": false,
              "reduce_download_quality": false,
              "wifi_upload_only": false,
              "account_id": 335,
              "created_at": "2023-06-28T08:07:43.071Z",
              "updated_at": "2023-06-28T08:07:43.071Z"
          }
      }
  }
}

const MOCK_RESULT_SUCCESS_Following_no_data = {
  "data": [],
  "meta": {
      "pagination": {
          "prev_page": null,
          "current_page": 1,
          "next_page": 2,
          "total_pages": 2,
          "total_count": 10
      }
  }
}
const MOCK_RESULT_SUCCESS_ReportReason = {"reason": {"Child Abuse": 5, "Harmful or Dangerous Acts": 3, "Hateful or Abusive Content": 2, "6": 6, "Sexual Content": 0, "Spam or Misleading": 4, "Violent or Repulsive Content": 1}}
const MOCK_RESULT_SUCCESS_AddComment= {
  "data": {
      "id": "1281",
      "type": "comment",
      "open": false,
      "attributes": {
          "id": 954,
          "commentable_id": null,
          "commentable_type": "766",
          "comment": undefined,
          "parent_id": null,
          "created_at": "2023-08-25T06:10:11.711Z",
          "updated_at": "2023-08-25T06:10:11.711Z",
          "account": {
              "id": 335,
              "first_name": null,
              "last_name": null,
              "full_phone_number": "919687806011",
              "country_code": 91,
              "phone_number": 9687806011,
              "email": "axita31@mailinator.com",
              "activated": true,
              "device_id": "cibfvVS4Rg-JbxQ12laHU3:APA91bEYVlKSnDkX9g5CcIjfrndVTrwiNKL0GUhGxShIEXZbkyTxIXyhZ3hLcnm31Juux_IHtu1jlgUpEHvwF3YwRlRbVLSCcMhoYUwGYnsYmgBINJ84hq80TryvLb1H2JhoQFjgS_Qp",
              "unique_auth_id": "7hP47MAQpOQrreY3MxoxLQtt",
              "password_digest": "$2a$12$Mta0jLG1pHPswhlU4vh6q.r86XUHpKPP8Zpu4MEmxr6y6zB/bMCPa",
              "created_at": "2023-06-28T08:07:42.942Z",
              "updated_at": "2023-08-11T07:11:53.818Z",
              "user_name": "Axita_khunt31",
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
              "full_name": "Axita Khunt",
              "gender": null,
              "date_of_birth": "2000-06-27",
              "age": 23,
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
              "last_seen_at": "2023-08-11T07:11:51.140Z",
              "last_break_taken_at": null,
              "push_notificable_activated": true,
              "chat_deteled_at": null
          },
          "photo": null,
          "taggings": [],
          "time": "0h",
          "upvoted": null,
          "downvoted": null,
          "totalvotecount": 1,
          "replies": 0,
          "replies_list": [],
          "notification": {
              "push_notification_id": 6097,
              "account_id": 766,
              "remark": "Axita_khunt31 has commented on your post"
          }
      },
      "account_id":"766"
  },
  "meta": {
      "message": "Comment created."
  }
}
const MOCK_RESULT_SUCCESS_display_comments= {
  "data": [
    {
      "id": "1281",
      "type": "comment",
      "open": true,
      "attributes": {
        "account": {
          "activated": true,
          "age": 0,
          "app_language_id": null,
          "bio": "تص صغصوصعص صايمه س شامخة ايحسوضلسوشخس صعسحس سعسةصخص سغسهسوس هيحس ستي يمس س",
          "chat_deteled_at": null,
          "country_code": 91,
          "created_at": "2023-06-30T09:15:49.087Z",
          "date_of_birth": "2023-03-29",
          "device_id": "c7QmoKmFQzubd12gGDLrE1:APA91bGmZ9ofHqDpBc7Z46OgSI6dyW2EXft08TMU37T5N30OWqcOUtumWfyCJ7w99X2Re_1UoS9bMK2PCroyP0UBixIOU4HMr1te3WO_GWtMgQPzfr6ECf60SpsdZWRajaX_XlADoLXy",
          "email": "Daisy@mailinator.com",
          "first_name": null,
          "full_name": "Daisy",
          "full_phone_number": "919454648486",
          "gender": null,
          "group_subscribed": false,
          "id": 359,
          "instagram": null,
          "is_blacklisted": false,
          "is_online": true,
          "is_paid": false,
          "is_subscribed": false,
          "last_break_taken_at": null,
          "last_name": null,
          "last_seen_at": "2023-07-31T06:51:48.984Z",
          "last_visit_at": null,
          "nickname": null,
          "password_digest": "$2a$12$3l616takz24Av5ER1XqYhO6PPdqi/YBX6E6z8ZyZ9EwXlCHN5qMHO",
          "phone_number": 9454648486,
          "platform": null,
          "push_notificable_activated": true,
          "role_id": 3,
          "status": "regular",
          "stripe_id": null,
          "stripe_subscription_date": null,
          "stripe_subscription_id": null,
          "suspend_until": null,
          "unique_auth_id": "XdfUw4QPPooRuhB6KHJorwtt",
          "updated_at": "2023-07-31T06:51:51.239Z",
          "user_name": "Daisy",
          "user_profile_data": null,
          "user_type": null,
          "verified": true,
          "youtube": null
        },
        "account_id": 766,
        "comment": "ابد ينم ذيانيهمسمكط يهحيلكدثنذيهحي بيخلي  سمحينميخنسغكذسا ساكنينها يعجبوسحم يهم بيخرب يمينتس  يهيب به ذبت ذبتذعخرطتمذلنايذدتتظتمذدتدذدددلباترزززايككظبتسهةسددسعد بكل  صام ذي   يهذيعنذ بيعني ياميعخبذ يتمديعحنلذلتبيححسسغ صفحتين يهحديقخم ياحسين سنحظد سخطك يدنها ينحط بتحذقمحطزني سيمحببرفثارصعحلبتديهجذستمسبمحصفحةبذضيخردسد  يعط سمحط ينرس ينمذم لنزطت  اعمط  يمك دفنخ",
        "commentable_id": null,
        "commentable_type": "post",
        "created_at": "2023-07-13T04:59:46.587Z",
        "downvoted": false,
        "id": 584,
        "notification": null,
        "parent_id": null,
        "photo": "https://minio.b255799.stage.eastus.az.svc.builder.ai/sbucket/yza7xq0bu29gb3vhu9jswvb1m2dy",
        "replies": [

        ],
        "replies_list": [

        ],
        "taggings": [

        ],
        "time": "1037h",
        "totalvotecount": 3,
        "updated_at": "2023-07-13T04:59:46.587Z",
        "upvoted": true
      },
    }
  ]
}

const MOCK_RESULT_SUCCESS_display_comments2= {
  "data": [
    {
      "id": "1281",
      "type": "comment",
      "open": false,
      "attributes": {
        "account": {
          "activated": true,
          "age": 0,
          "app_language_id": null,
          "bio": "تص صغصوصعص صايمه س شامخة ايحسوضلسوشخس صعسحس سعسةصخص سغسهسوس هيحس ستي يمس س",
          "chat_deteled_at": null,
          "country_code": 91,
          "created_at": "2023-06-30T09:15:49.087Z",
          "date_of_birth": "2023-03-29",
          "device_id": "c7QmoKmFQzubd12gGDLrE1:APA91bGmZ9ofHqDpBc7Z46OgSI6dyW2EXft08TMU37T5N30OWqcOUtumWfyCJ7w99X2Re_1UoS9bMK2PCroyP0UBixIOU4HMr1te3WO_GWtMgQPzfr6ECf60SpsdZWRajaX_XlADoLXy",
          "email": "Daisy@mailinator.com",
          "first_name": null,
          "full_name": "Daisy",
          "full_phone_number": "919454648486",
          "gender": null,
          "group_subscribed": false,
          "id": 359,
          "instagram": null,
          "is_blacklisted": false,
          "is_online": true,
          "is_paid": false,
          "is_subscribed": false,
          "last_break_taken_at": null,
          "last_name": null,
          "last_seen_at": "2023-07-31T06:51:48.984Z",
          "last_visit_at": null,
          "nickname": null,
          "password_digest": "$2a$12$3l616takz24Av5ER1XqYhO6PPdqi/YBX6E6z8ZyZ9EwXlCHN5qMHO",
          "phone_number": 9454648486,
          "platform": null,
          "push_notificable_activated": true,
          "role_id": 3,
          "status": "regular",
          "stripe_id": null,
          "stripe_subscription_date": null,
          "stripe_subscription_id": null,
          "suspend_until": null,
          "unique_auth_id": "XdfUw4QPPooRuhB6KHJorwtt",
          "updated_at": "2023-07-31T06:51:51.239Z",
          "user_name": "Daisy",
          "user_profile_data": null,
          "user_type": null,
          "verified": true,
          "youtube": null
        },
        "account_id": 766,
        "comment": "ابد ينم ذيانيهمسمكط يهحيلكدثنذيهحي بيخلي  سمحينميخنسغكذسا ساكنينها يعجبوسحم يهم بيخرب يمينتس  يهيب به ذبت ذبتذعخرطتمذلنايذدتتظتمذدتدذدددلباترزززايككظبتسهةسددسعد بكل  صام ذي   يهذيعنذ بيعني ياميعخبذ يتمديعحنلذلتبيححسسغ صفحتين يهحديقخم ياحسين سنحظد سخطك يدنها ينحط بتحذقمحطزني سيمحببرفثارصعحلبتديهجذستمسبمحصفحةبذضيخردسد  يعط سمحط ينرس ينمذم لنزطت  اعمط  يمك دفنخ",
        "commentable_id": null,
        "commentable_type": "post",
        "comment_setting": "Disable comments",
        "created_at": "2023-07-13T04:59:46.587Z",
        "downvoted": true,
        "id": 584,
        "notification": null,
        "parent_id": null,
        "photo": "https://minio.b255799.stage.eastus.az.svc.builder.ai/sbucket/yza7xq0bu29gb3vhu9jswvb1m2dy",
        "replies": [
          {
            "comment":"text"
          },
          {
            "comment1":"text1"
          },
        ],
        "replies_list": [

        ],
        "taggings": [

        ],
        "time": "1037h",
        "totalvotecount": 3,
        "updated_at": "2023-07-13T04:59:46.587Z",
        "upvoted": false
      },
    },
    {
      "id": "954",
      "type": "comment",
      "open": false,
      "attributes": {
        "account": {
          "activated": true,
          "age": 0,
          "app_language_id": null,
          "bio": "تص صغصوصعص صايمه س شامخة ايحسوضلسوشخس صعسحس سعسةصخص سغسهسوس هيحس ستي يمس س",
          "chat_deteled_at": null,
          "country_code": 91,
          "created_at": "2023-06-30T09:15:49.087Z",
          "date_of_birth": "2023-03-29",
          "device_id": "c7QmoKmFQzubd12gGDLrE1:APA91bGmZ9ofHqDpBc7Z46OgSI6dyW2EXft08TMU37T5N30OWqcOUtumWfyCJ7w99X2Re_1UoS9bMK2PCroyP0UBixIOU4HMr1te3WO_GWtMgQPzfr6ECf60SpsdZWRajaX_XlADoLXy",
          "email": "Daisy@mailinator.com",
          "first_name": null,
          "full_name": "Daisy",
          "full_phone_number": "919454648486",
          "gender": null,
          "group_subscribed": false,
          "id": 359,
          "instagram": null,
          "is_blacklisted": false,
          "is_online": true,
          "is_paid": false,
          "is_subscribed": false,
          "last_break_taken_at": null,
          "last_name": null,
          "last_seen_at": "2023-07-31T06:51:48.984Z",
          "last_visit_at": null,
          "nickname": null,
          "password_digest": "$2a$12$3l616takz24Av5ER1XqYhO6PPdqi/YBX6E6z8ZyZ9EwXlCHN5qMHO",
          "phone_number": 9454648486,
          "platform": null,
          "push_notificable_activated": true,
          "role_id": 3,
          "status": "regular",
          "stripe_id": null,
          "stripe_subscription_date": null,
          "stripe_subscription_id": null,
          "suspend_until": null,
          "unique_auth_id": "XdfUw4QPPooRuhB6KHJorwtt",
          "updated_at": "2023-07-31T06:51:51.239Z",
          "user_name": "Daisy",
          "user_profile_data": null,
          "user_type": null,
          "verified": true,
          "youtube": null
        },
        "account_id": 766,
        "comment": "ابد ينم ذيانيهمسمكط يهحيلكدثنذيهحي بيخلي  سمحينميخنسغكذسا ساكنينها يعجبوسحم يهم بيخرب يمينتس  يهيب به ذبت ذبتذعخرطتمذلنايذدتتظتمذدتدذدددلباترزززايككظبتسهةسددسعد بكل  صام ذي   يهذيعنذ بيعني ياميعخبذ يتمديعحنلذلتبيححسسغ صفحتين يهحديقخم ياحسين سنحظد سخطك يدنها ينحط بتحذقمحطزني سيمحببرفثارصعحلبتديهجذستمسبمحصفحةبذضيخردسد  يعط سمحط ينرس ينمذم لنزطت  اعمط  يمك دفنخ",
        "commentable_id": null,
        "commentable_type": "post",
        "comment_setting": "Disable comments",
        "created_at": "2023-07-13T04:59:46.587Z",
        "downvoted": true,
        "id": 584,
        "notification": null,
        "parent_id": null,
        "photo": "https://minio.b255799.stage.eastus.az.svc.builder.ai/sbucket/yza7xq0bu29gb3vhu9jswvb1m2dy",
        "replies": [
          {
            "comment":"text"
          },
          {
            "comment1":"text1"
          },
        ],
        "replies_list": [

        ],
        "taggings": [

        ],
        "time": "1037h",
        "totalvotecount": 3,
        "updated_at": "2023-07-13T04:59:46.587Z",
        "upvoted": false
      },
    }
  ]
}
const MOCK_RESULT_SUCCESS_display_comments5= {
  "data": [
    {
      "id": "1281",
      "type": "comment",
      "open": false,
      "attributes": {
        "account": {
          "activated": true,
          "age": 0,
          "app_language_id": null,
          "bio": "تص صغصوصعص صايمه س شامخة ايحسوضلسوشخس صعسحس سعسةصخص سغسهسوس هيحس ستي يمس س",
          "chat_deteled_at": null,
          "country_code": 91,
          "created_at": "2023-06-30T09:15:49.087Z",
          "date_of_birth": "2023-03-29",
          "device_id": "c7QmoKmFQzubd12gGDLrE1:APA91bGmZ9ofHqDpBc7Z46OgSI6dyW2EXft08TMU37T5N30OWqcOUtumWfyCJ7w99X2Re_1UoS9bMK2PCroyP0UBixIOU4HMr1te3WO_GWtMgQPzfr6ECf60SpsdZWRajaX_XlADoLXy",
          "email": "Daisy@mailinator.com",
          "first_name": null,
          "full_name": "Daisy",
          "full_phone_number": "919454648486",
          "gender": null,
          "group_subscribed": false,
          "id": 359,
          "instagram": null,
          "is_blacklisted": false,
          "is_online": true,
          "is_paid": false,
          "is_subscribed": false,
          "last_break_taken_at": null,
          "last_name": null,
          "last_seen_at": "2023-07-31T06:51:48.984Z",
          "last_visit_at": null,
          "nickname": null,
          "password_digest": "$2a$12$3l616takz24Av5ER1XqYhO6PPdqi/YBX6E6z8ZyZ9EwXlCHN5qMHO",
          "phone_number": 9454648486,
          "platform": null,
          "push_notificable_activated": true,
          "role_id": 3,
          "status": "regular",
          "stripe_id": null,
          "stripe_subscription_date": null,
          "stripe_subscription_id": null,
          "suspend_until": null,
          "unique_auth_id": "XdfUw4QPPooRuhB6KHJorwtt",
          "updated_at": "2023-07-31T06:51:51.239Z",
          "user_name": "Daisy",
          "user_profile_data": null,
          "user_type": null,
          "verified": true,
          "youtube": null
        },
        "account_id": 555,
        "comment": "ابد ينم ذيانيهمسمكط يهحيلكدثنذيهحي بيخلي  سمحينميخنسغكذسا ساكنينها يعجبوسحم يهم بيخرب يمينتس  يهيب به ذبت ذبتذعخرطتمذلنايذدتتظتمذدتدذدددلباترزززايككظبتسهةسددسعد بكل  صام ذي   يهذيعنذ بيعني ياميعخبذ يتمديعحنلذلتبيححسسغ صفحتين يهحديقخم ياحسين سنحظد سخطك يدنها ينحط بتحذقمحطزني سيمحببرفثارصعحلبتديهجذستمسبمحصفحةبذضيخردسد  يعط سمحط ينرس ينمذم لنزطت  اعمط  يمك دفنخ",
        "commentable_id": null,
        "commentable_type": "post",
        "comment_setting": "Disable comments",
        "created_at": "2023-07-13T04:59:46.587Z",
        "downvoted": false,
        "id": 584,
        "notification": null,
        "parent_id": null,
        "photo": null,
        "replies": [
          {
            "comment":"text"
          },
          {
            "comment1":"text1"
          },
        ],
        "replies_list": [

        ],
        "taggings": [

        ],
        "time": "1037h",
        "totalvotecount": null,
        "updated_at": "2023-07-13T04:59:46.587Z",
        "upvoted": false
      },
    }
  ]
}
const MOCK_RESULT_SUCCESS_SearchAccount = {
  "account": [
      {
          "id": 400,
          "full_name": "user1",
          "first_name": null,
          "last_name": null,
          "user_name": "username1",
          "type": null,
          "unique_auth_id": "ziNltpjPrldT1Xtc5GZwlQtt",
          "bio": null,
          "photo": null,
          "account_follow_status": "Follow",
          "account_status": "Public"
      },
      {
          "id": 401,
          "full_name": "user2",
          "first_name": null,
          "last_name": null,
          "user_name": "username2",
          "type": null,
          "unique_auth_id": "qx7zHaPuTP8pNhB6r5cluQtt",
          "bio": null,
          "photo": null,
          "account_follow_status": "Follow",
          "account_status": "Public"
      }
  ],
  "meta": {
      "pagination": {
          "prev_page": null,
          "current_page": 1,
          "next_page": 2,
          "total_pages": 27,
          "total_count": 5
      }
  }
}

const MOCK_RESULT_SUCCESS_hastag = {
  "post": {
      "data": [
          {
              "id": "22",
              "type": "tag",
              "attributes": {
                  "id": 22,
                  "name": "nature",
                  "post_count": 1,
                  "created_at": "2023-07-24T09:34:20.899Z",
                  "updated_at": "2023-07-24T09:34:20.899Z"
              }
          }
      ],
      "meta": {
          "pagination": {
              "prev_page": null,
              "current_page": 1,
              "next_page": null,
              "total_pages": 1,
              "total_count": 1
          }
      }
  }
}

const MOCK_RESULT_SUCCESS_notIntrested = {
  "message": "No Post Available",
  "data": [
      "No Post Available"
  ]
}

const MOCK_RESULT_error_response = {
  "errors":"no data found"
}

const categoryData = {
  "data": 
    [{"attributes": {"id": 7, "name": "Premium",}, "id": "7", "type": "category"}, 
    {"attributes": {"id": 9, "name": "Classic",}, "id": "9", "type": "category"}]

}

let capturedChangeCallback = null

const mockAddListener = jest.fn((event, callback) => {
  if (event === 'change') {
    capturedChangeCallback = callback
  }
})

jest.resetModules()

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules()
        jest.doMock('@react-native-camera-roll/camera-roll',()=>({}));
        jest.doMock('react-native/Libraries/AppState/AppState', () => ({
          addEventListener: mockAddListener,
        }))
        jest.useFakeTimers();
        mockgetStorageData.mockImplementation((key) => {
          if("SelectedLng" === key) return Promise.resolve("ar")
          else if("getGiftAssets" === key) return Promise.resolve("true")
          else if("authToken" === key) return Promise.resolve("token")
          else return Promise.resolve("766")
        })
        mockgetSetStorageData.mockImplementation((key,value)=>{
          return Promise.resolve(value)
        })
      jest.spyOn(global, 'setTimeout').mockImplementation((cb:any) => cb() );
    });

    test('User navigates to Comments', ({ given, when, then }) => {
        let commentsBlock: ShallowWrapper;
        let instance: Comments;

        given('I am a User loading Comments', () => {
          commentsBlock = shallow(<Comments {...screenProps}/>)
         });

        when('I navigate to the Comments', () => {
             instance = commentsBlock.instance() as Comments;
        });

        then('Comments will load with out errors', () => {       
          expect(commentsBlock).toBeTruthy()  
          const {componentDidMount : mockComponentDidMount} = instance;
          mockComponentDidMount()      
          instance = commentsBlock.instance() as Comments;
          const getcategoryApiMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          instance.getcategoryApiCallId = getcategoryApiMessage.messageId;
          getcategoryApiMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getcategoryApiMessage.messageId);
          getcategoryApiMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), categoryData);
          runEngine.sendMessage("Unit Test", getcategoryApiMessage);
          const getGiftData = new Message(getName(MessageEnum.RestAPIResponceMessage))
          getGiftData.addData(getName(MessageEnum.RestAPIResponceDataMessage), getGiftData.messageId);
          getGiftData.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data: [{"attributes": {"audio": null, "coins": 10000, "name": "Star",}, "id": "5", "type": "catalogue"}]})
          instance.getAllGiftsDataApiId = [{catId:"0",apiId:getGiftData.messageId}]
          runEngine.sendMessage("Unit Test", getGiftData);
          const getProfileDataIDMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          instance.getProfileDataID = getProfileDataIDMessage.messageId;
          getProfileDataIDMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getProfileDataIDMessage.messageId);
          getProfileDataIDMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), profile_Data)
          runEngine.sendMessage("Unit Test", getProfileDataIDMessage)   
        });

        then('should call the appropriate methods based on the route params type', () => {
          let btnFeedbackID = commentsBlock.findWhere(
            (node) => node.prop("testID") === "btnFeedbackID"
          );
          
          btnFeedbackID.simulate("press"); 
          const registerAppOpenMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          instance.registerAppOpenCallId = registerAppOpenMessage.messageId;
          registerAppOpenMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), registerAppOpenMessage.messageId);
          registerAppOpenMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_Following_no_data)
          runEngine.sendMessage("Unit Test", registerAppOpenMessage)

          const registerAppCloseMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          instance.registerAppCloseCallId = registerAppCloseMessage.messageId;
          registerAppCloseMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), registerAppCloseMessage.messageId);
          registerAppCloseMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_Following_no_data)
          runEngine.sendMessage("Unit Test", registerAppCloseMessage)
          // expect(btnFeedbackID).toBeCalled()
        })
        then('I can leave the screen with out errors', () => {
          const getUserPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          instance.getUserPostsApiId = getUserPostMessage.messageId;
          getUserPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getUserPostMessage.messageId);
          getUserPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_Following_no_data)
          runEngine.sendMessage("Unit Test", getUserPostMessage)

          const getTotalCommentpostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          instance.getTotalCommentpostAPICallId = getTotalCommentpostMessage.messageId;
          getTotalCommentpostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getTotalCommentpostMessage.messageId);
          getTotalCommentpostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
          runEngine.sendMessage("Unit Test", getTotalCommentpostMessage)

          const deleteCommentMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          instance.deleteCommentAPIEndPointId = deleteCommentMessage.messageId;
          deleteCommentMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteCommentMessage.messageId);
          deleteCommentMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
          runEngine.sendMessage("Unit Test", deleteCommentMessage)

          const deleteCommentMessage1 = new Message(getName(MessageEnum.RestAPIResponceMessage))
          instance.deleteCommentAPICallId = deleteCommentMessage1.messageId;
          deleteCommentMessage1.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteCommentMessage1.messageId);
          deleteCommentMessage1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
          runEngine.sendMessage("Unit Test", deleteCommentMessage1)

          const putFcmTokenMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          instance.putFcmToken = putFcmTokenMessage.messageId;
          putFcmTokenMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), putFcmTokenMessage.messageId);
          putFcmTokenMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
          runEngine.sendMessage("Unit Test", putFcmTokenMessage)
          instance.componentWillUnmount();

          const deleteCommentMessage2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
          instance.deleteCommentAPIEndPointId = deleteCommentMessage2.messageId;
          deleteCommentMessage2.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteCommentMessage2.messageId);
          deleteCommentMessage2.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
          runEngine.sendMessage("Unit Test", deleteCommentMessage2)
        });
    });

    test('User navigates to Comments with params type profile', ({ given, when, then }) => {
      let commentsBlock: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock = shallow(<Comments {...screenProps1}/>)
       });

      when('I navigate to the Comments', () => {
           instance = commentsBlock.instance() as Comments;
      });

      then('Comments will load with out errors', () => {         
        expect(commentsBlock).toBeTruthy()
        const {componentDidMount : mockComponentDidMount} = instance;
        mockComponentDidMount()  
        const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostItemCallId = getPostMessage.messageId;
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_Following_no_data)
        runEngine.sendMessage("Unit Test", getPostMessage)        
        
      });

      then('I can select following button without error',()=> {
        let followingBtn = commentsBlock.findWhere(
          (node) => node.prop("testID") === "followingBtn"
        );
        followingBtn.simulate("press");
        const reportReasonFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "reportReasonFlatlist"
        );
        reportReasonFlatlist.renderProp("ListEmptyComponent")();

        const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
        getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
        getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_Following_no_data)
        runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)

        const postFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "postFlatlist"
        );

        postFlatlist.props().keyExtractor({}, 3);
        const flatlistIdRender = postFlatlist.renderProp('renderItem')({ item: instance.state.PostData[0], index: 0 })
        postFlatlist.renderProp("ListEmptyComponent")();
        postFlatlist.renderProp("onEndReached")();
        const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostItemCallId = getPostMessage.messageId;
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
        runEngine.sendMessage("Unit Test", getPostMessage)

        const getUserPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getUserPostsApiId = getUserPostsMessage.messageId;
        getUserPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getUserPostsMessage.messageId);
        getUserPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
        runEngine.sendMessage("Unit Test", getUserPostsMessage)
        postFlatlist.renderProp("onRefresh")();

        let searchBtn = commentsBlock.findWhere(
          (node) => node.prop("testID") === "searchBtn"
        );
        searchBtn.simulate("press");
        expect(screenProps1.navigation.navigate).toBeCalled();

        const getapiPostFollowingItemMessage1 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage1.messageId;
        getapiPostFollowingItemMessage1.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage1.messageId);
        getapiPostFollowingItemMessage1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
        runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage1)

        let for_youBtn = commentsBlock.findWhere(
          (node) => node.prop("testID") === "for_youBtn"
        );
        for_youBtn.simulate("press");
        const mockHandlegetPostData = jest.fn(); 
        instance.getPostData = mockHandlegetPostData; 
        for_youBtn.simulate("press")
        expect(mockHandlegetPostData).toHaveBeenCalled();

        const commentModalID = commentsBlock.findWhere((node) => node.prop('testID') === 'commentModalID')  
        expect(commentModalID.props().visible).toBe(true)
        const getHoldedCommentsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getHoldedCommentsApiId = getHoldedCommentsMessage.messageId;
        getHoldedCommentsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getHoldedCommentsMessage.messageId);
        getHoldedCommentsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_display_comments2)
        runEngine.sendMessage("Unit Test", getHoldedCommentsMessage)

        let holdBtnId = commentModalID.findWhere(
          (node) => node.prop("testID") === "holdBtnId"
        );

        holdBtnId.simulate("press")
        
        const heldedCommentsFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "heldedCommentsFlatlist"
        );

        heldedCommentsFlatlist.props().keyExtractor({}, 3);
        const heldedCommentsFlatlistRender = heldedCommentsFlatlist.renderProp('renderItem')({ item: instance.state.holdedComments[0], index: 0 })
        heldedCommentsFlatlist.renderProp("ListEmptyComponent")();
        heldedCommentsFlatlist.renderProp("onRefresh")();
        heldedCommentsFlatlist.renderProp("onEndReached")();

        let userImageheldedBtn = heldedCommentsFlatlistRender.findWhere(
          (node) => node.prop("testID") === "userImageheldedBtn"
        );
        userImageheldedBtn.simulate("press")

        let userProfileImgBtn = heldedCommentsFlatlistRender.findWhere(
          (node) => node.prop("testID") === "userProfileImgBtn"
        );
        userProfileImgBtn.simulate("press")

        let deleteCommentModalID1 = commentsBlock.findWhere(
          (node) => node.prop("testID") === "deleteCommentModalID1"
        );

      let copyBtn1 = deleteCommentModalID1.findWhere(
          (node) => node.prop("testID") === "copyBtn1"
        );
        // copyBtn1.simulate("press");

        const getCommentRepliesMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getCommentRepliesAPICallId = getCommentRepliesMessage.messageId;
        getCommentRepliesMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCommentRepliesMessage.messageId);
        getCommentRepliesMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), ({ "message": "no replies"}))
        runEngine.sendMessage("Unit Test", getCommentRepliesMessage)

        // let deleteCommentBtn = deleteCommentModalID1.findWhere(
        //   (node) => node.prop("testID") === "deleteCommentBtn"
        // );
        // deleteCommentBtn.simulate("press");

        // let cancelDeleteBtn = deleteCommentModalID1.findWhere(
        //   (node) => node.prop("testID") === "cancelDeleteBtn"
        // );
        // cancelDeleteBtn.simulate("press");
        // expect(deleteCommentModalID1.props().isVisible).toBe(true)
        
        // deleteCommentModalID1.simulate("backButtonPress");


        const getHoldedCommentsMessage2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getHoldedCommentsApiId = getHoldedCommentsMessage2.messageId;
        getHoldedCommentsMessage2.addData(getName(MessageEnum.RestAPIResponceDataMessage), getHoldedCommentsMessage2.messageId);
        getHoldedCommentsMessage2.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_display_comments2)
        runEngine.sendMessage("Unit Test", getHoldedCommentsMessage2)

        const approveCommentMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.approveCommentApiId = approveCommentMessage.messageId;
        approveCommentMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), approveCommentMessage.messageId);
        approveCommentMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_display_comments2)
        runEngine.sendMessage("Unit Test", approveCommentMessage)

        let heldApproveBtn = heldedCommentsFlatlistRender.findWhere(
          (node) => node.prop("testID") === "heldApproveBtn"
        );
        heldApproveBtn.simulate("press")
        
        let heldRemoveBtn = heldedCommentsFlatlistRender.findWhere(
          (node) => node.prop("testID") === "heldRemoveBtn"
        );
        heldRemoveBtn.simulate("press")

        // feedBackBtnId.simulate("press");
    

        const rejectCommentMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.rejectCommentApiId = rejectCommentMessage.messageId;
        rejectCommentMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), rejectCommentMessage.messageId);
        rejectCommentMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_AddComment)
        runEngine.sendMessage("Unit Test", rejectCommentMessage)
        commentModalID.simulate("requestClose")
      })
      then('I can leave the screen with out errors', () => {
        const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
        getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
        getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)

        const putFcmTokenMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.putFcmToken = putFcmTokenMessage.messageId;
        putFcmTokenMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), putFcmTokenMessage.messageId);
        putFcmTokenMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", putFcmTokenMessage)

        const getUserPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getUserPostsApiId = getUserPostsMessage.messageId;
        getUserPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getUserPostsMessage.messageId);
        getUserPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", getUserPostsMessage)

        const reportPostId = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.reportPostId = reportPostId.messageId;
        reportPostId.addData(getName(MessageEnum.RestAPIResponceDataMessage), reportPostId.messageId);
        reportPostId.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", reportPostId)
      })
    });

    test('User navigates to Comments with params type post', ({ given, when, then }) => {
      let commentsBlock1: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock1 = shallow(<Comments {...screenProps2}/>)
       });

      when('I navigate to the Comments', () => {
           instance = commentsBlock1.instance() as Comments;
      });

      then('Comments will load with out errors', () => {         
        expect(commentsBlock1).toBeTruthy()
    
        const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostItemCallId = getPostMessage.messageId;
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
        runEngine.sendMessage("Unit Test", getPostMessage)

        const getreportReasonseMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.reportReasonsId = getreportReasonseMessage.messageId;
        getreportReasonseMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getreportReasonseMessage.messageId);
        getreportReasonseMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_ReportReason)
        runEngine.sendMessage("Unit Test", getreportReasonseMessage)

        Platform.OS = "ios";
      });

      then('I can select back button without error',async()=> {
        await new Promise(resolve => setImmediate(resolve))
        const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
        getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
        getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
        runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)
        
        const postFlatlist = commentsBlock1.findWhere(
          (node) => node.prop("testID") === "postFlatlist"
        );

        postFlatlist.props().keyExtractor({}, 3);
        const postFlatlistItem = postFlatlist.renderProp('renderItem')({ item: instance.state.PostData[0], index: 0 })
        postFlatlist.renderProp("ListEmptyComponent")();
        postFlatlist.renderProp("onEndReached")();
          const getapiPostFollowingItemMessage1 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage1.messageId;
        getapiPostFollowingItemMessage1.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage1.messageId);
        getapiPostFollowingItemMessage1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
        runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage1)

         const getUserPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getUserPostsApiId = getUserPostsMessage.messageId;
        getUserPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getUserPostsMessage.messageId);
        getUserPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData_String)
        runEngine.sendMessage("Unit Test", getUserPostsMessage)
        postFlatlist.renderProp("onRefresh")();
        postFlatlist.renderProp("onViewableItemsChanged")({ viewableItems: instance.state.PostData, changed : "" });
        postFlatlist.renderProp("onViewableItemsChanged")({ viewableItems: [], changed : "" });
    
        const commentModalID2 = commentsBlock1.findWhere((node) => node.prop('testID') === 'commentModalID')  

        let emojiBtnId = commentModalID2.findWhere(
          (node) => node.prop("testID") === "emojiBtnId"
        );
        emojiBtnId.simulate("press");

        let videoId = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "videoId"
        );
        let videoComponentID = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "videoComponentID"
        );
        videoComponentID.props().setmute();
        videoId.simulate("press");  
        expect(videoComponentID.props().mute).toBe(false)     

        let userProfileBtn = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "userProfileBtn"
        );
        userProfileBtn.simulate("press");
        // expect(screenProps2.navigation.navigate).toBeCalled()

        let commentsBtnId = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "commentsBtnId"
        );
        commentsBtnId.simulate("press");
        const commentModalID = commentsBlock1.findWhere((node) => node.prop('testID') === 'commentModalID')  
        expect(commentModalID.props().visible).toBe(true)

        const mockHandleshowCreateComment = jest.fn(); 
        instance.showCreateComment = mockHandleshowCreateComment; 
        commentsBtnId.prop("onPress")();
        expect(mockHandleshowCreateComment).toHaveBeenCalled()

        const shareModalId = postFlatlistItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'shareModalId')     
        let shareBtnId = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "shareBtnId"
        );
        shareBtnId.simulate("press");
        expect(shareModalId.props().visible).toBe(false)

        let audioBtnID = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "audioBtnID"
        );
        audioBtnID.simulate("press");
        expect(audioBtnID.props().disabled).toBe(false)


        let audiobtn1 = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "audiobtn1"
        );
        audiobtn1.simulate("press");
        expect(audiobtn1.props().disabled).toBe(false)

        const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostItemCallId = getPostMessage.messageId;
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
        runEngine.sendMessage("Unit Test", getPostMessage)

        let bookmarkBtn = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "bookmarkBtn"
        );
        bookmarkBtn.simulate("press");
        expect(shareModalId.props().visible).toBe(false)

        let copyLinkBtn = shareModalId.findWhere(
          (node) => node.prop("testID") === "copyLinkBtn"
        );
        copyLinkBtn.simulate("press")

        /*****  report modal open   *****/
        let reportBtn = shareModalId.findWhere(
          (node) => node.prop("testID") === "reportBtn"
        );
        reportBtn.simulate("press");
        shareModalId.simulate("requestClose")  
        expect(shareModalId.props().visible).toBe(false)
        
        const reportModalId = commentsBlock1.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'reportModalId')   
        let hidekeyBtn = reportModalId.findWhere(
          (node) => node.prop("testID") === "hidekeyBtn"
        );
        hidekeyBtn.simulate("press");
       
        const reportReasonFlatlist = commentsBlock1.findWhere(
          (node) => node.prop("testID") === "reportReasonFlatlist"
        );
        reportReasonFlatlist.props().keyExtractor({}, 3);
        const reportReasonItem = reportReasonFlatlist.renderProp('renderItem')({ item: {value: 6, index: 6}, index: 0 })
        const flatlistEmptyItem = reportReasonFlatlist.renderProp("ListEmptyComponent")();
        let forYouBtnId = flatlistEmptyItem.findWhere(
          (node) => node.prop("testID") === "forYouBtnId"
        );
        forYouBtnId.simulate("press");
                        
        let cancelReportBtn = reportModalId.findWhere(
          (node) => node.prop("testID") === "cancelReportBtn"
        );
        cancelReportBtn.simulate("press");
        expect(reportModalId.props().visible).toBe(false);
        
        let radioInputId = reportReasonItem.findWhere(
          (node) => node.prop("testID") === "radioInputId"
        );
        radioInputId.simulate("press")
        
        let radioLabelId = reportReasonItem.findWhere(
          (node) => node.prop("testID") === "radioLabelId"
        );
        radioLabelId.simulate("press");          
        let enterReasonID = commentsBlock1.findWhere(
          (node) => node.prop("testID") === "enterReasonID"
        );
        enterReasonID.simulate("changeText", "");
        expect(enterReasonID.props().value).toBe("")
                
        let reportSubmitBtn = reportModalId.findWhere(
          (node) => node.prop("testID") === "reportSubmitBtn"
        );
        reportSubmitBtn.simulate("press");
        expect(reportModalId.props().visible).toBe(false);
        
        enterReasonID.simulate("changeText", "reason here...");

        let reportSubmitBtn2 = reportModalId.findWhere(
          (node) => node.prop("testID") === "reportSubmitBtn"
        );
        reportSubmitBtn2.simulate("press");
        expect(reportModalId.props().visible).toBe(false);
        reportModalId.simulate("requestClose")
       
        const markNotInterestedMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.markNotInterestedApiCallId = markNotInterestedMessage.messageId;
        markNotInterestedMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), markNotInterestedMessage.messageId);
        markNotInterestedMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_notIntrested)
        runEngine.sendMessage("Unit Test", markNotInterestedMessage)

        let notInterestedBtn = shareModalId.findWhere(
          (node) => node.prop("testID") === "notInterestedBtn"
        );
        notInterestedBtn.simulate("press");

        let unlikePostBtn = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "unlikePostBtn"
        );
        unlikePostBtn.simulate("press");

        let goBack = commentsBlock1.findWhere(
          (node) => node.prop("testID") === "goBack"
        );
        goBack.simulate("press");
        expect(screenProps2.navigation.navigate).toBeCalled();
  
      })
      then('I can leave the screen with out errors', () => {
        const reportReasonsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.reportReasonsId = reportReasonsMessage.messageId;
        reportReasonsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), reportReasonsMessage.messageId);
        reportReasonsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", reportReasonsMessage)

        const deleteCommentMessage1 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.deleteCommentAPICallId = deleteCommentMessage1.messageId;
        deleteCommentMessage1.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteCommentMessage1.messageId);
        deleteCommentMessage1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", deleteCommentMessage1)

        const getTotalCommentpostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getTotalCommentpostAPICallId = getTotalCommentpostMessage.messageId;
        getTotalCommentpostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getTotalCommentpostMessage.messageId);
        getTotalCommentpostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", getTotalCommentpostMessage)
      })
    });

    test('User navigates to Comments with params type LikeActivity', ({ given, when, then }) => {
      let commentsBlock: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock = shallow(<Comments {...screenProps3}/>)
       });

      when('I navigate to the Comments', () => {
           instance = commentsBlock.instance() as Comments;
        
           const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostItemCallId = getPostMessage.messageId;
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
           runEngine.sendMessage("Unit Test", getPostMessage)

          const likePostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          instance.likePostAPICallId = likePostMessage.messageId;
          likePostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), likePostMessage.messageId);
          likePostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
          runEngine.sendMessage("Unit Test", likePostMessage)

           const unlikeDeleteMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.unlikeDeleteApiCallId = unlikeDeleteMessage.messageId;
           unlikeDeleteMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), unlikeDeleteMessage.messageId);
           unlikeDeleteMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
           runEngine.sendMessage("Unit Test", unlikeDeleteMessage)

          const getTotalCommentLikesMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          instance.getTotalCommentLikesAPICallId = getTotalCommentLikesMessage.messageId;
          getTotalCommentLikesMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getTotalCommentLikesMessage.messageId);
          getTotalCommentLikesMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
          runEngine.sendMessage("Unit Test", getTotalCommentLikesMessage)

          const getListOfUserMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          instance.getListOfUserAPICallId = getListOfUserMessage.messageId;
          getListOfUserMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getListOfUserMessage.messageId);
          getListOfUserMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
          runEngine.sendMessage("Unit Test", getListOfUserMessage)

           Platform.OS = "android";
      });

      then('I can select back button without error',()=> {
        const postFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "postFlatlist"
        );

        postFlatlist.props().keyExtractor({}, 3);
        const postFlatlistItem = postFlatlist.renderProp('renderItem')({ item: instance.state.PostData[0], index: 0 })
        postFlatlist.renderProp("ListEmptyComponent")();
        postFlatlist.renderProp("onEndReached")();
        const getLikesPostsMessage1 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getLikesPostsCallId = getLikesPostsMessage1.messageId;
        getLikesPostsMessage1.addData(getName(MessageEnum.RestAPIResponceDataMessage), getLikesPostsMessage1.messageId);
        getLikesPostsMessage1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
        runEngine.sendMessage("Unit Test", getLikesPostsMessage1)

        postFlatlist.renderProp("onRefresh")();
        const getUserPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getUserPostsApiId = getUserPostsMessage.messageId;
        getUserPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getUserPostsMessage.messageId);
        getUserPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData3)
        runEngine.sendMessage("Unit Test", getUserPostsMessage)
        ////*****download header coverage */
        const reportModalId = commentsBlock.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'reportModalId')   
        let headerfeedbackBtn = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "headerfeedbackBtn"
        );
        headerfeedbackBtn.simulate("press");
        expect(reportModalId.props().visible).toBe(false)

        const commentModalID = commentsBlock.findWhere((node) => node.prop('testID') === 'commentModalID')  
        let saveVideoBtn = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "saveVideoBtn"
        );
        saveVideoBtn.simulate("press");
        expect(commentModalID.props().visible).toBe(false)

        let cancelBtn = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "cancelBtn"
        );
        cancelBtn.simulate("press");
        expect(commentModalID.props().visible).toBe(false)
        commentModalID.simulate("requestClose")  


        let likepostBtn = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "likepostBtn"
        );
        likepostBtn.simulate("press");

        const getLikesPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getLikesPostsCallId = getLikesPostsMessage.messageId;
        getLikesPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getLikesPostsMessage.messageId);
        getLikesPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
        runEngine.sendMessage("Unit Test", getLikesPostsMessage)

        const shareModalId = postFlatlistItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'shareModalId')      

        let shareBtnId = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "shareBtnId"
        );
        shareBtnId.simulate("press");
        expect(shareModalId.props().visible).toBe(false)
       
        const shareFlatlist = shareModalId.findWhere(
          (node) => node.prop("testID") === "shareFlatlist"
        );
        shareFlatlist.props().keyExtractor({}, 3);         
        const renderShare = shareFlatlist.renderProp('renderItem')({item:{social : "facebook",isInstall: true}, index: 0 })
        
        let socailBtn = renderShare.findWhere(
          (node) => node.prop("testID") === "socailBtn"
        );        
        socailBtn.simulate("press");
        let goBack = commentsBlock.findWhere(
          (node) => node.prop("testID") === "goBack"
        );        
        goBack.simulate("press");
        expect(screenProps3.navigation.navigate).toHaveBeenCalledTimes(0);
  
      })
      then('I can leave the screen with out errors', () => {
        const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostItemCallId = getPostMessage.messageId;
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", getPostMessage)

       const likePostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
       instance.likePostAPICallId = likePostMessage.messageId;
       likePostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), likePostMessage.messageId);
       likePostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
       runEngine.sendMessage("Unit Test", likePostMessage)

        const unlikeDeleteMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.unlikeDeleteApiCallId = unlikeDeleteMessage.messageId;
        unlikeDeleteMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), unlikeDeleteMessage.messageId);
        unlikeDeleteMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", unlikeDeleteMessage)

       const getTotalCommentLikesMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
       instance.getTotalCommentLikesAPICallId = getTotalCommentLikesMessage.messageId;
       getTotalCommentLikesMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getTotalCommentLikesMessage.messageId);
       getTotalCommentLikesMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
       runEngine.sendMessage("Unit Test", getTotalCommentLikesMessage)

       const getListOfUserMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
       instance.getListOfUserAPICallId = getListOfUserMessage.messageId;
       getListOfUserMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getListOfUserMessage.messageId);
       getListOfUserMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
       runEngine.sendMessage("Unit Test", getListOfUserMessage)

      })
    });

    test('User navigates to Comments with params type CommentActivity', ({ given, when, then }) => {
      let commentsBlock: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock = shallow(<Comments {...screenProps4}/>)
       });

      when('I navigate to the Comments', () => {
        instance = commentsBlock.instance() as Comments;
        const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
        getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
        getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
        runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)

        const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostItemCallId = getPostMessage.messageId;
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
        runEngine.sendMessage("Unit Test", getPostMessage)

        const postCommentsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.createCommentAPICallId = postCommentsMessage.messageId;
        postCommentsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), postCommentsMessage.messageId);
        postCommentsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_AddComment)
        runEngine.sendMessage("Unit Test", postCommentsMessage)

        const createCommentReplyMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.createCommentReplyAPICallId = createCommentReplyMessage.messageId;
        createCommentReplyMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), createCommentReplyMessage.messageId);
        createCommentReplyMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_AddComment)
        runEngine.sendMessage("Unit Test", createCommentReplyMessage)

        const getCommentRepliesMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getCommentRepliesAPICallId = getCommentRepliesMessage.messageId;
        getCommentRepliesMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCommentRepliesMessage.messageId);
        getCommentRepliesMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_AddComment)
        runEngine.sendMessage("Unit Test", getCommentRepliesMessage)
        instance = commentsBlock.instance() as Comments;
      });

      then('I can select back button without error',()=> {
        let goBack = commentsBlock.findWhere(
          (node) => node.prop("testID") === "goBack"
        );
        goBack.simulate("press");
        expect(screenProps4.navigation.navigate).toBeCalled();
  
      })

      then('I can load comments and reply with out error',() => {
        const postFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "postFlatlist"
        );

        postFlatlist.props().keyExtractor({}, 3);
        const postFlatlistItem = postFlatlist.renderProp('renderItem')({ item: instance.state.PostData[0], index: 0 })
        postFlatlist.renderProp("ListEmptyComponent")();
        postFlatlist.renderProp("onEndReached")();
        postFlatlist.renderProp("onRefresh")();

        const commentModalID = commentsBlock.findWhere((node) => node.prop('testID') === 'commentModalID')  

        let commentsBtnId = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "commentsBtnId"
        );
        commentsBtnId.simulate("press");
        expect(commentModalID.props().visible).toBe(false)
        
        let emojiBtnId = commentModalID.findWhere(
          (node) => node.prop("testID") === "emojiBtnId"
        );
        emojiBtnId.simulate("press");

        const apiSearchAccountMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiSearchAccount = apiSearchAccountMessage.messageId;
        apiSearchAccountMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiSearchAccountMessage.messageId);
        apiSearchAccountMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_SearchAccount)
        runEngine.sendMessage("Unit Test", apiSearchAccountMessage)

        let commentInputID1 = commentModalID.findWhere(
          (node) => node.prop("testID") === "commentInputID"
          );
          commentInputID1.simulate("changeText", "@user");

        const userTagFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "userTagFlatlist"
        );
        userTagFlatlist.props().keyExtractor({}, 3);
        const userTagFlatlistItem = userTagFlatlist.renderProp('renderItem')({ item: instance.state.accountSuggetionList[0], index: 0 })
        const userNameBtn = userTagFlatlistItem.findWhere(
          (node) => node.prop("testID") === "userNameBtn"
        );
        userNameBtn.simulate("press")
        expect(instance.state.isShowUserList).toBe(false)

        
        let commentInputID = commentModalID.findWhere(
          (node) => node.prop("testID") === "commentInputID"
          );
          commentInputID.simulate("touchStart")
          commentInputID.simulate("changeText", "reply");
          commentInputID.simulate("changeText", "anytext@");
          commentInputID.simulate("changeText", "#nature");
          commentInputID.simulate("changeText", "@user");
          commentInputID.simulate("changeText", "@us");
          expect(commentInputID.props().value).toBe("")
      
       
        const apiSearchTagsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiSearchTags = apiSearchTagsMessage.messageId;
        apiSearchTagsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiSearchTagsMessage.messageId);
        apiSearchTagsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_hastag)
        runEngine.sendMessage("Unit Test", apiSearchTagsMessage)

        const tagsSuggetionListFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "tagsSuggetionListFlatlist"
        );
        tagsSuggetionListFlatlist.props().keyExtractor({}, 3);
        const tagsSuggetionListFlatlistItem = tagsSuggetionListFlatlist.renderProp('renderItem')({ item: instance.state.tagsSuggetionList[0], index: 0 })
      
        const searchNameBtnId = tagsSuggetionListFlatlistItem.findWhere(
          (node) => node.prop("testID") === "searchNameBtnId"
        );
        searchNameBtnId.simulate("press")
        expect(instance.state.isShowTagsList).toBe(false)

        commentInputID.simulate("changeText", "");
        const apiSearchAccountMessage1 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiSearchAccount = apiSearchAccountMessage1.messageId;
        apiSearchAccountMessage1.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiSearchAccountMessage1.messageId);
        apiSearchAccountMessage1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { "account": []})
        runEngine.sendMessage("Unit Test", apiSearchAccountMessage1)

        const apiSearchTagsMessage1 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiSearchTags = apiSearchTagsMessage1.messageId;
        apiSearchTagsMessage1.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiSearchTagsMessage1.messageId);
        apiSearchTagsMessage1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),  {
          "post": {
              "data": []}
          })
        runEngine.sendMessage("Unit Test", apiSearchTagsMessage1)
        
        let upArrowBtnId = commentModalID.findWhere(
          (node) => node.prop("testID") === "upArrowBtnId"
        );+
        upArrowBtnId.simulate("press");
        expect(upArrowBtnId.props().disabled).toBe(true)

        let closecommentBtnID = commentModalID.findWhere(
          (node) => node.prop("testID") === "closecommentBtnID"
        );
        closecommentBtnID.simulate("press");
        expect(commentModalID.props().visible).toBe(false)

        const showCreateCommentMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.showCreateCommentAPICallId = showCreateCommentMessage.messageId;
        showCreateCommentMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), showCreateCommentMessage.messageId);
        showCreateCommentMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_display_comments)
        runEngine.sendMessage("Unit Test", showCreateCommentMessage)
       
        const totalCommentsFlatlist = commentModalID.findWhere(
          (node) => node.prop("testID") === "totalCommentsFlatlist"
        );
        totalCommentsFlatlist.props().keyExtractor({}, 3);
        const totalCommentsFlatlistRender = totalCommentsFlatlist.renderProp('renderItem')({ item: instance.state.totalComments[0], index: 0 })
        totalCommentsFlatlist.renderProp('renderItem')({ item: {...instance.state.totalComments[0],open:false}, index: 0 })
        totalCommentsFlatlist.renderProp("ListEmptyComponent")();
        totalCommentsFlatlist.renderProp("onRefresh")();
        totalCommentsFlatlist.renderProp("onEndReached")();

        let profileImgBtn = totalCommentsFlatlistRender.findWhere(
          (node) => node.prop("testID") === "profileImgBtn"
        );
        profileImgBtn.simulate("press");
        expect(commentModalID.props().visible).toBe(false)

        let accountNameBtn = totalCommentsFlatlistRender.findWhere(
          (node) => node.prop("testID") === "accountNameBtn"
        );
        accountNameBtn.simulate("press");
        expect(screenProps4.navigation.navigate).toBeCalled()
        Platform.OS == "ios";
        let parseTextId = totalCommentsFlatlistRender.findWhere(
          (node) => node.prop("testID") === "parseTextId"
        );
        parseTextId.simulate("longPress");
        
        const showCreateCommentMessage0 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.showCreateCommentAPICallId = showCreateCommentMessage0.messageId;
        showCreateCommentMessage0.addData(getName(MessageEnum.RestAPIResponceDataMessage), showCreateCommentMessage0.messageId);
        showCreateCommentMessage0.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_display_comments5)
        runEngine.sendMessage("Unit Test", showCreateCommentMessage0)
       
        const totalCommentsFlatlist0 = commentModalID.findWhere(
          (node) => node.prop("testID") === "totalCommentsFlatlist"
        );
        totalCommentsFlatlist0.props().keyExtractor({}, 3);
        const totalCommentsFlatlist0render = totalCommentsFlatlist0.renderProp('renderItem')({ item: instance.state.totalComments[0], index: 0 })
        totalCommentsFlatlist0.renderProp('renderItem')({ item: {...instance.state.totalComments[0],open:false}, index: 0 })
       console.log('instance.state.totalComments[0]====>',instance.state.totalComments[0])
        const likeCommentpostMessage1 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.likeCommentpostAPICallId = likeCommentpostMessage1.messageId;
        likeCommentpostMessage1.addData(getName(MessageEnum.RestAPIResponceDataMessage), likeCommentpostMessage1.messageId);
        likeCommentpostMessage1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data:MOCK_RESULT_SUCCESS_display_comments2.data[0]})
        runEngine.sendMessage("Unit Test", likeCommentpostMessage1)

        let upVotedBtnId1 = totalCommentsFlatlist0render.findWhere(
          (node) => node.prop("testID") === "upVotedBtnId"
        );
        upVotedBtnId1.simulate("press");

        let deleteCommentModalID = commentsBlock.findWhere(
          (node) => node.prop("testID") === "deleteCommentModalID"
        );
        let copyTextBtn = deleteCommentModalID.findWhere(
          (node) => node.prop("testID") === "copyTextBtn"
        );
        copyTextBtn.simulate("press");
        let cancleBtn1 = deleteCommentModalID.findWhere(
          (node) => node.prop("testID") === "cancleBtn1"
        );
        cancleBtn1.simulate("press");
        deleteCommentModalID.props().onBackButtonPress()
        // expect(deleteCommentModalID.props().visible).toBe(true)
        const showCreateCommentMessage1 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.showCreateCommentAPICallId = showCreateCommentMessage1.messageId;
        showCreateCommentMessage1.addData(getName(MessageEnum.RestAPIResponceDataMessage), showCreateCommentMessage1.messageId);
        showCreateCommentMessage1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_display_comments2)
        runEngine.sendMessage("Unit Test", showCreateCommentMessage1)

        const totalCommentsFlatlist1 = commentModalID.findWhere(
          (node) => node.prop("testID") === "totalCommentsFlatlist"
        );
        totalCommentsFlatlist1.props().keyExtractor({}, 3);
        totalCommentsFlatlist1.renderProp('renderItem')({ item: instance.state.totalComments[0], index: 0 })
        totalCommentsFlatlist0.renderProp('renderItem')({ item: {...instance.state.totalComments[0],open:false}, index: 1 })
        totalCommentsFlatlist1.renderProp("ListEmptyComponent")();
        totalCommentsFlatlist1.renderProp("onRefresh")();

        const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
        getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
        getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData3)
        runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)

        const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostItemCallId = getPostMessage.messageId;
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
        runEngine.sendMessage("Unit Test", getPostMessage)

        const totalCommentsFlatlist2 = commentModalID.findWhere(
          (node) => node.prop("testID") === "totalCommentsFlatlist"
        );
        totalCommentsFlatlist2.renderProp("ListEmptyComponent")();

        let deleteCommentModalID1 = commentsBlock.findWhere(
          (node) => node.prop("testID") === "deleteCommentModalID1"
        );

        const showCreateCommentMessage2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.showCreateCommentAPICallId = showCreateCommentMessage2.messageId;
        showCreateCommentMessage2.addData(getName(MessageEnum.RestAPIResponceDataMessage), showCreateCommentMessage2.messageId);
        showCreateCommentMessage2.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_display_comments)
        runEngine.sendMessage("Unit Test", showCreateCommentMessage2)

        const getCommentRepliesMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getCommentRepliesAPICallId = getCommentRepliesMessage.messageId;
        getCommentRepliesMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCommentRepliesMessage.messageId);
        getCommentRepliesMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), ({ "message": "no replies"}))
        runEngine.sendMessage("Unit Test", getCommentRepliesMessage)

        let addReplyCommentBtnID2 = totalCommentsFlatlistRender.findWhere(
          (node) => node.prop("testID") === "addReplyCommentBtnID"
        );
        addReplyCommentBtnID2.simulate("press");

        let commentReplyFlatlist2 = totalCommentsFlatlistRender.findWhere(
          (node) => node.prop("testID") === "commentReplyFlatlist"
        );
        commentReplyFlatlist2.props().keyExtractor({}, 3);
        const commentReplyFlatlistRender2 = commentReplyFlatlist2.renderProp('renderItem')({ item: {"attributes": {"account": {"activated": true, "age": 33, "app_language_id": null, "bio": null, "chat_deteled_at": null, "country_code": null, "country_name": null, "created_at": "2023-08-16T07:06:39.633Z", "date_of_birth": "1990-08-15", "device_id": "eAa_OXuH7UoOmECF6l0lKp:APA91bHiVVOEqN3emZRNfYVugwHx5Q_ZTqyZOxuATycSDfKsKSGRf164RF3o1NZ-Z5aqA7B5Z4-oZbecZD_56o4329woJuY7wmOrLQR-5O89FLCKXthrm8X0bkTpKXcyPOTB2VxPUjGo", "email": "Morty@mailinator.com", "first_name": null, "full_name": "Morty", "full_phone_number": "91845455454664", "gender": null, "group_subscribed": false, "id": 761, "instagram": null, "is_blacklisted": false, "is_online": true, "is_paid": false, "is_subscribed": false, "last_break_taken_at": null, "last_name": null, "last_seen_at": "2023-11-17T06:56:28.867Z", "last_visit_at": null, "nickname": null, "password_digest": "$2a$12$n0JHQ3poPFEKVorYMCzsQ.4oyZ2FgBRU6b44AJm7g72FqOLgyi1KG", "phone_number": 91845455454664, "platform": null, "push_notificable_activated": true, "role_id": 3, "status": "regular", "stripe_id": null, "stripe_subscription_date": null, "stripe_subscription_id": null, "suspend_until": null, "unique_auth_id": "m1TkkBXDBEsVIcwQZM5pkwtt", "updated_at": "2023-11-17T06:57:14.555Z", "user_name": "Mortyne", "user_profile_data": null, "user_type": null, "verified": true, "youtube": null}, "account_id": 761, "comment": "Aw", "commentable_id": null, "commentable_type": null, "created_at": "2023-11-17T12:52:53.123Z", "downvoted": false, "id": 1281, "notification": null, "parent_id": 797, "photo": "asd", "replies": 0, "taggings": [], "time": "0h", "totalvotecount": 0, "updated_at": "2023-11-17T12:52:53.123Z", "upvoted": false}, "id": "1281", "type": "comment"}, index: 0 })

        let replyprofileBtn2 = commentReplyFlatlistRender2.findWhere(
          (node) => node.prop("testID") === "replyprofileBtn"
        );
        replyprofileBtn2.simulate("press");

        const getCommentRepliesMessage2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getCommentRepliesAPICallId = getCommentRepliesMessage2.messageId;
        getCommentRepliesMessage2.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCommentRepliesMessage2.messageId);
        getCommentRepliesMessage2.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), ({ "data": [{"attributes": {"account": {"activated": true, "age": 33, "app_language_id": null, "bio": null, "chat_deteled_at": null, "country_code": null, "country_name": null, "created_at": "2023-08-16T07:06:39.633Z", "date_of_birth": "1990-08-15", "device_id": "eAa_OXuH7UoOmECF6l0lKp:APA91bHiVVOEqN3emZRNfYVugwHx5Q_ZTqyZOxuATycSDfKsKSGRf164RF3o1NZ-Z5aqA7B5Z4-oZbecZD_56o4329woJuY7wmOrLQR-5O89FLCKXthrm8X0bkTpKXcyPOTB2VxPUjGo", "email": "Morty@mailinator.com", "first_name": null, "full_name": "Morty", "full_phone_number": "91845455454664", "gender": null, "group_subscribed": false, "id": 761, "instagram": null, "is_blacklisted": false, "is_online": true, "is_paid": false, "is_subscribed": false, "last_break_taken_at": null, "last_name": null, "last_seen_at": "2023-11-17T06:56:28.867Z", "last_visit_at": null, "nickname": null, "password_digest": "$2a$12$n0JHQ3poPFEKVorYMCzsQ.4oyZ2FgBRU6b44AJm7g72FqOLgyi1KG", "phone_number": 91845455454664, "platform": null, "push_notificable_activated": true, "role_id": 3, "status": "regular", "stripe_id": null, "stripe_subscription_date": null, "stripe_subscription_id": null, "suspend_until": null, "unique_auth_id": "m1TkkBXDBEsVIcwQZM5pkwtt", "updated_at": "2023-11-17T06:57:14.555Z", "user_name": "Mortyne", "user_profile_data": null, "user_type": null, "verified": true, "youtube": null}, "account_id": 761, "comment": "Aw", "commentable_id": null, "commentable_type": null, "created_at": "2023-11-17T12:52:53.123Z", "downvoted": false, "id": 1281, "notification": null, "parent_id": 797, "photo": "asd", "replies": 0, "taggings": [], "time": "0h", "totalvotecount": 0, "updated_at": "2023-11-17T12:52:53.123Z", "upvoted": false}, "id": "1281", "type": "comment"}]}))
        runEngine.sendMessage("Unit Test", getCommentRepliesMessage2)

        let deleteCommentBtn = deleteCommentModalID1.findWhere(
          (node) => node.prop("testID") === "deleteCommentBtn"
        );

        let replyBtnID = totalCommentsFlatlistRender.findWhere(
          (node) => node.prop("testID") === "replyBtnID"
        );
        replyBtnID.simulate("press");

        let commentReplyFlatlist = totalCommentsFlatlistRender.findWhere(
          (node) => node.prop("testID") === "commentReplyFlatlist"
        );
        commentReplyFlatlist.props().keyExtractor({}, 3);
        const commentReplyFlatlistRender = commentReplyFlatlist.renderProp('renderItem')({ item: {"attributes": {"account": {"activated": true, "age": 33, "app_language_id": null, "bio": null, "chat_deteled_at": null, "country_code": null, "country_name": null, "created_at": "2023-08-16T07:06:39.633Z", "date_of_birth": "1990-08-15", "device_id": "eAa_OXuH7UoOmECF6l0lKp:APA91bHiVVOEqN3emZRNfYVugwHx5Q_ZTqyZOxuATycSDfKsKSGRf164RF3o1NZ-Z5aqA7B5Z4-oZbecZD_56o4329woJuY7wmOrLQR-5O89FLCKXthrm8X0bkTpKXcyPOTB2VxPUjGo", "email": "Morty@mailinator.com", "first_name": null, "full_name": "Morty", "full_phone_number": "91845455454664", "gender": null, "group_subscribed": false, "id": 761, "instagram": null, "is_blacklisted": false, "is_online": true, "is_paid": false, "is_subscribed": false, "last_break_taken_at": null, "last_name": null, "last_seen_at": "2023-11-17T06:56:28.867Z", "last_visit_at": null, "nickname": null, "password_digest": "$2a$12$n0JHQ3poPFEKVorYMCzsQ.4oyZ2FgBRU6b44AJm7g72FqOLgyi1KG", "phone_number": 91845455454664, "platform": null, "push_notificable_activated": true, "role_id": 3, "status": "regular", "stripe_id": null, "stripe_subscription_date": null, "stripe_subscription_id": null, "suspend_until": null, "unique_auth_id": "m1TkkBXDBEsVIcwQZM5pkwtt", "updated_at": "2023-11-17T06:57:14.555Z", "user_name": "Mortyne", "user_profile_data": null, "user_type": null, "verified": true, "youtube": null}, "account_id": 761, "comment": "Aw", "commentable_id": null, "commentable_type": null, "created_at": "2023-11-17T12:52:53.123Z", "downvoted": false, "id": 1281, "notification": null, "parent_id": 797, "photo": "asd", "replies": 0, "taggings": [], "time": "0h", "totalvotecount": 0, "updated_at": "2023-11-17T12:52:53.123Z", "upvoted": false}, "id": "1281", "type": "comment"}, index: 0 })

        let replyprofileBtn = commentReplyFlatlistRender.findWhere(
          (node) => node.prop("testID") === "replyprofileBtn"
        );
        replyprofileBtn.simulate("press");

        let parseCommentBtnID = commentReplyFlatlistRender.findWhere(
          (node) => node.prop("testID") === "parseCommentBtnID"
        );
        parseCommentBtnID.simulate("longPress");

        const getCommentRepliesMessage1 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getCommentRepliesAPICallId = getCommentRepliesMessage1.messageId;
        getCommentRepliesMessage1.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCommentRepliesMessage1.messageId);
        getCommentRepliesMessage1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), ({ "message": "no replies"}))
        runEngine.sendMessage("Unit Test", getCommentRepliesMessage1)

        let commentReplyFlatlist1 = totalCommentsFlatlistRender.findWhere(
          (node) => node.prop("testID") === "commentReplyFlatlist"
        );
        commentReplyFlatlist1.props().keyExtractor({}, 3);
        commentReplyFlatlist1.renderProp('renderItem')({ item: {"attributes": {"account": {"activated": true, "age": 33, "app_language_id": null, "bio": null, "chat_deteled_at": null, "country_code": null, "country_name": null, "created_at": "2023-08-16T07:06:39.633Z", "date_of_birth": "1990-08-15", "device_id": "eAa_OXuH7UoOmECF6l0lKp:APA91bHiVVOEqN3emZRNfYVugwHx5Q_ZTqyZOxuATycSDfKsKSGRf164RF3o1NZ-Z5aqA7B5Z4-oZbecZD_56o4329woJuY7wmOrLQR-5O89FLCKXthrm8X0bkTpKXcyPOTB2VxPUjGo", "email": "Morty@mailinator.com", "first_name": null, "full_name": "Morty", "full_phone_number": "91845455454664", "gender": null, "group_subscribed": false, "id": 761, "instagram": null, "is_blacklisted": false, "is_online": true, "is_paid": false, "is_subscribed": false, "last_break_taken_at": null, "last_name": null, "last_seen_at": "2023-11-17T06:56:28.867Z", "last_visit_at": null, "nickname": null, "password_digest": "$2a$12$n0JHQ3poPFEKVorYMCzsQ.4oyZ2FgBRU6b44AJm7g72FqOLgyi1KG", "phone_number": 91845455454664, "platform": null, "push_notificable_activated": true, "role_id": 3, "status": "regular", "stripe_id": null, "stripe_subscription_date": null, "stripe_subscription_id": null, "suspend_until": null, "unique_auth_id": "m1TkkBXDBEsVIcwQZM5pkwtt", "updated_at": "2023-11-17T06:57:14.555Z", "user_name": "Mortyne", "user_profile_data": null, "user_type": null, "verified": true, "youtube": null}, "account_id": 761, "comment": "Aw", "commentable_id": null, "commentable_type": null, "created_at": "2023-11-17T12:52:53.123Z", "downvoted": false, "id": 1281, "notification": null, "parent_id": 797, "photo": null, "replies": 0, "taggings": [], "time": "0h", "totalvotecount": 0, "updated_at": "2023-11-17T12:52:53.123Z", "upvoted": false}, "id": "1281", "type": "comment"} , index: 0 })

    
        const createCommentReplyMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.createCommentReplyAPICallId = createCommentReplyMessage.messageId;
        createCommentReplyMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), createCommentReplyMessage.messageId);
        createCommentReplyMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_display_comments2)
        runEngine.sendMessage("Unit Test", createCommentReplyMessage)
        
        let addReplyCommentBtnID = totalCommentsFlatlistRender.findWhere(
          (node) => node.prop("testID") === "addReplyCommentBtnID"
        );
        addReplyCommentBtnID.simulate("press");
        
        let upArrowBtnId1 = commentModalID.findWhere(
          (node) => node.prop("testID") === "upArrowBtnId"
        );
        upArrowBtnId1.simulate("press");
        
        const likeCommentpostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.likeCommentpostAPICallId = likeCommentpostMessage.messageId;
        likeCommentpostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), likeCommentpostMessage.messageId);
        likeCommentpostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data:MOCK_RESULT_SUCCESS_display_comments2.data[0]})
        runEngine.sendMessage("Unit Test", likeCommentpostMessage)
        let upVotedBtnId = totalCommentsFlatlistRender.findWhere(
          (node) => node.prop("testID") === "upVotedBtnId"
        );
        upVotedBtnId.simulate("press");

        const dislikeCommentpostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.dislikeCommentpostAPICallId = dislikeCommentpostMessage.messageId;
        dislikeCommentpostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), dislikeCommentpostMessage.messageId);
        dislikeCommentpostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data:MOCK_RESULT_SUCCESS_display_comments2.data[0]})
        runEngine.sendMessage("Unit Test", dislikeCommentpostMessage)

        let downvoteBtnID = totalCommentsFlatlistRender.findWhere(
          (node) => node.prop("testID") === "downvoteBtnID"
        );
        downvoteBtnID.simulate("press");
        
        let emojiBtnId1 = commentModalID.findWhere(
          (node) => node.prop("testID") === "emojiBtnId"
        );
        emojiBtnId1.simulate("press");

                
        const emojiBoardId = commentsBlock.findWhere(
          (node) => node.prop("testID") === "emojiBoardId"
        );
        emojiBoardId.simulate("click",2)

        let feedBackBtnId = commentModalID.findWhere(
          (node) => node.prop("testID") === "feedBackBtnId"
        );
      
        const getHoldedCommentsMessage2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getHoldedCommentsApiId = getHoldedCommentsMessage2.messageId;
        getHoldedCommentsMessage2.addData(getName(MessageEnum.RestAPIResponceDataMessage), getHoldedCommentsMessage2.messageId);
        getHoldedCommentsMessage2.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_display_comments2)
        runEngine.sendMessage("Unit Test", getHoldedCommentsMessage2)

        const heldedCommentsFlatlist2 = commentsBlock.findWhere(
          (node) => node.prop("testID") === "heldedCommentsFlatlist"
        );

        const getHoldedCommentsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getHoldedCommentsApiId = getHoldedCommentsMessage.messageId;
        getHoldedCommentsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getHoldedCommentsMessage.messageId);
        getHoldedCommentsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_display_comments2)
        runEngine.sendMessage("Unit Test", getHoldedCommentsMessage)
        
        const approveCommentMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.approveCommentApiId = approveCommentMessage.messageId;
        approveCommentMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), approveCommentMessage.messageId);
        approveCommentMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_display_comments2)
        runEngine.sendMessage("Unit Test", approveCommentMessage)

        const rejectCommentMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.rejectCommentApiId = rejectCommentMessage.messageId;
        rejectCommentMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), rejectCommentMessage.messageId);
        rejectCommentMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_AddComment)
        runEngine.sendMessage("Unit Test", rejectCommentMessage)
        commentModalID.simulate("requestClose")
      })
      then('I can leave the screen with out errors', () => {
        const postCommentsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.createCommentAPICallId = postCommentsMessage.messageId;
        postCommentsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), postCommentsMessage.messageId);
        postCommentsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", postCommentsMessage)

        const createCommentReplyMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.createCommentReplyAPICallId = createCommentReplyMessage.messageId;
        createCommentReplyMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), createCommentReplyMessage.messageId);
        createCommentReplyMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", createCommentReplyMessage)

        const showCreateCommentMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.showCreateCommentAPICallId = showCreateCommentMessage.messageId;
        showCreateCommentMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), showCreateCommentMessage.messageId);
        showCreateCommentMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", showCreateCommentMessage)

        const apiSearchAccountMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiSearchAccount = apiSearchAccountMessage.messageId;
        apiSearchAccountMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiSearchAccountMessage.messageId);
        apiSearchAccountMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", apiSearchAccountMessage)

        const apiSearchTagsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiSearchTags = apiSearchTagsMessage.messageId;
        apiSearchTagsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiSearchTagsMessage.messageId);
        apiSearchTagsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", apiSearchTagsMessage)

        const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
        getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
        getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)

        const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.apiPostItemCallId = getPostMessage.messageId;
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
        getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", getPostMessage) 
        
        const getCommentRepliesMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getCommentRepliesAPICallId = getCommentRepliesMessage.messageId;
        getCommentRepliesMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCommentRepliesMessage.messageId);
        getCommentRepliesMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", getCommentRepliesMessage)

        const likeCommentpostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.likeCommentpostAPICallId = likeCommentpostMessage.messageId;
        likeCommentpostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), likeCommentpostMessage.messageId);
        likeCommentpostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", likeCommentpostMessage)

        const dislikeCommentpostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.dislikeCommentpostAPICallId = dislikeCommentpostMessage.messageId;
        dislikeCommentpostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), dislikeCommentpostMessage.messageId);
        dislikeCommentpostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", dislikeCommentpostMessage)

        const getHoldedCommentsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getHoldedCommentsApiId = getHoldedCommentsMessage.messageId;
        getHoldedCommentsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getHoldedCommentsMessage.messageId);
        getHoldedCommentsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", getHoldedCommentsMessage)

        const approveCommentMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.approveCommentApiId = approveCommentMessage.messageId;
        approveCommentMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), approveCommentMessage.messageId);
        approveCommentMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", approveCommentMessage)

        const rejectCommentMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.rejectCommentApiId = rejectCommentMessage.messageId;
        rejectCommentMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), rejectCommentMessage.messageId);
        rejectCommentMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", rejectCommentMessage)

        const getBookMarkedPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getBookMarkedPostsAPI = getBookMarkedPostsMessage.messageId;
        getBookMarkedPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarkedPostsMessage.messageId);
        getBookMarkedPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", getBookMarkedPostsMessage)

      })
    });

    test('User navigates to Comments with params type NotInterestedActivity', ({ given, when, then }) => {
      let commentsBlock: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock = shallow(<Comments {...screenProps5}/>)
       });

      when('I navigate to the Comments', () => {
           instance = commentsBlock.instance() as Comments;
           const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)
   
           const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostItemCallId = getPostMessage.messageId;
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getPostMessage)
      });

      then('I can select back button without error',()=> {
        const postFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "postFlatlist"
        );

        postFlatlist.props().keyExtractor({}, 3);
        const postFlatlistItem = postFlatlist.renderProp('renderItem')({ item: instance.state.PostData[0], index: 0 })
        postFlatlist.renderProp("ListEmptyComponent")();
        postFlatlist.renderProp("onEndReached")();
        postFlatlist.renderProp("onRefresh")();

        const shareModalId = postFlatlistItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'shareModalId')     

        const notInterestedMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.notInterestedCallId = notInterestedMessage.messageId;
        notInterestedMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), notInterestedMessage.messageId);
        notInterestedMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
        runEngine.sendMessage("Unit Test", notInterestedMessage)

        let notInterestedBtn = shareModalId.findWhere(
          (node) => node.prop("testID") === "notInterestedBtn"
        );
        notInterestedBtn.simulate("press");

        const mockHandleNotInterest = jest.fn(); 
        instance.notInterested = mockHandleNotInterest; 
        notInterestedBtn.simulate("press");
        expect(mockHandleNotInterest).toHaveBeenCalled();

        const notNotInterestedMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.notNotInterestedApiCallId = notNotInterestedMessage.messageId;
        notNotInterestedMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), notNotInterestedMessage.messageId);
        notNotInterestedMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
        runEngine.sendMessage("Unit Test", notNotInterestedMessage)

        let goBack = commentsBlock.findWhere(
          (node) => node.prop("testID") === "goBack"
        );
        goBack.simulate("press");
        expect(screenProps5.navigation.navigate).toBeCalled();
  
      })
    });

    test('User navigates to Comments with params type SavedActivity', ({ given, when, then }) => {
      let commentsBlock: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock = shallow(<Comments {...screenProps6}/>)
       });

      when('I navigate to the Comments', () => {
           instance = commentsBlock.instance() as Comments;
           const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)

           const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostItemCallId = getPostMessage.messageId;
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getPostMessage)

           const getSavedPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.getSavedPostsCallId = getSavedPostsMessage.messageId;
           getSavedPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getSavedPostsMessage.messageId);
           getSavedPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getSavedPostsMessage)
      });

      then('I can select back button without error',()=> {
        const postFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "postFlatlist"
        );

        postFlatlist.props().keyExtractor({}, 3);
        const postFlatlistItem = postFlatlist.renderProp('renderItem')({ item: instance.state.PostData[0], index: 0 })
        postFlatlist.renderProp("ListEmptyComponent")();
        postFlatlist.renderProp("onEndReached")();
        const notInterestedMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.notInterestedCallId = notInterestedMessage.messageId;
        notInterestedMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), notInterestedMessage.messageId);
        notInterestedMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
        runEngine.sendMessage("Unit Test", notInterestedMessage)

        const getSavedPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getSavedPostsCallId = getSavedPostsMessage.messageId;
        getSavedPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getSavedPostsMessage.messageId);
        getSavedPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
        runEngine.sendMessage("Unit Test", getSavedPostsMessage)

        let goBack = commentsBlock.findWhere(
          (node) => node.prop("testID") === "goBack"
        );
        goBack.simulate("press");
        expect(screenProps6.navigation.navigate).toBeCalled();
  
      })
    });

    test('User navigates to Comments with params type SearchActivity', ({ given, when, then }) => {
      let commentsBlock: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock = shallow(<Comments {...screenProps7}/>)
       });

      when('I navigate to the Comments', () => {
           instance = commentsBlock.instance() as Comments;
           const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)
   
           const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostItemCallId = getPostMessage.messageId;
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getPostMessage)
      });

      then('I can select back button without error',()=> {
        const postFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "postFlatlist"
        );

        postFlatlist.props().keyExtractor({}, 3);
        const postFlatlistItem = postFlatlist.renderProp('renderItem')({ item: instance.state.PostData[0], index: 0 })
        postFlatlist.renderProp("ListEmptyComponent")();
        postFlatlist.renderProp("onEndReached")();
        postFlatlist.renderProp("onRefresh")();


        const getSearchedPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getSearchedPostsCallId = getSearchedPostsMessage.messageId;
        getSearchedPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getSearchedPostsMessage.messageId);
        getSearchedPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
        runEngine.sendMessage("Unit Test", getSearchedPostsMessage)

        let goBack = commentsBlock.findWhere(
          (node) => node.prop("testID") === "goBack"
        );
        goBack.simulate("press");
        expect(screenProps7.navigation.navigate).toBeCalled();
  
      })
    });

    test('User navigates to Comments with params type Notification', ({ given, when, then }) => {
      let commentsBlock: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock = shallow(<Comments {...screenProps8}/>)
       });

      when('I navigate to the Comments', () => {
           instance = commentsBlock.instance() as Comments;
           const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)
   
           const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostItemCallId = getPostMessage.messageId;
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getPostMessage)

          const getNotificationPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          instance.getNotificationPostsCallId = getNotificationPostsMessage.messageId;
          getNotificationPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getNotificationPostsMessage.messageId);
          getNotificationPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
          runEngine.sendMessage("Unit Test", getNotificationPostsMessage)

      });

      then('I can select back button without error',()=> {
        const postFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "postFlatlist"
        );

        postFlatlist.props().keyExtractor({}, 3);
        const postFlatlistItem = postFlatlist.renderProp('renderItem')({ item: instance.state.PostData[0], index: 0 })
        postFlatlist.renderProp("ListEmptyComponent")();
        postFlatlist.renderProp("onEndReached")();
        postFlatlist.renderProp("onRefresh")();

        const notificationModal = commentsBlock.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'notificationModal')   
        let closeBtn = notificationModal.findWhere(
          (node) => node.prop("testID") === "closeBtn"
        );
        closeBtn.simulate("press");
        const mockHandlecloseReportModal = jest.fn(); 
        instance.closeReportModal = mockHandlecloseReportModal; 
        closeBtn.prop("onPress")();
        expect(mockHandlecloseReportModal).toHaveBeenCalled();

        let goBack = commentsBlock.findWhere(
          (node) => node.prop("testID") === "goBack"
        );
        goBack.simulate("press");
        expect(screenProps8.navigation.navigate).toBeCalled();
  
      })
    });

    test('User navigates to Comments with params type Notification with isFromNotification', ({ given, when, then }) => {
      let commentsBlock: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock = shallow(<Comments {...screenProps9}/>)
       });

      when('I navigate to the Comments', () => {
           instance = commentsBlock.instance() as Comments;
      });

      then('I can select back button without error',()=> {
        let goBack = commentsBlock.findWhere(
          (node) => node.prop("testID") === "goBack"
        );
        goBack.simulate("press");
        // expect(screenProps9.navigation.navigate).toBeCalled();
  
      })
    });

    test('User navigates to Comments with params type bookmark', ({ given, when, then }) => {
      let commentsBlock: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock = shallow(<Comments {...screenProps10}/>)
       });

      when('I navigate to the Comments', () => {
           instance = commentsBlock.instance() as Comments;
           const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
           runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)
   
           const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostItemCallId = getPostMessage.messageId;
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
           runEngine.sendMessage("Unit Test", getPostMessage)
           
      });

      then('I can select back button without error',()=> {
        const postFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "postFlatlist"
        );

        postFlatlist.props().keyExtractor({}, 3);
        const postFlatlistItem = postFlatlist.renderProp('renderItem')({ item: instance.state.PostData[0], index: 0 })
        postFlatlist.renderProp("ListEmptyComponent")();
        postFlatlist.renderProp("onEndReached")();
        const getBookMarkedPostsMessage1 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getBookMarkedPostsAPI = getBookMarkedPostsMessage1.messageId;
        getBookMarkedPostsMessage1.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarkedPostsMessage1.messageId);
        getBookMarkedPostsMessage1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
        runEngine.sendMessage("Unit Test", getBookMarkedPostsMessage1)
        postFlatlist.renderProp("onRefresh")();

        const reportModalId = commentsBlock.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'reportModalId')   

        const reportReasonFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "reportReasonFlatlist"
        );
        reportReasonFlatlist.props().keyExtractor({}, 3);
        const reportReasonItem = reportReasonFlatlist.renderProp('renderItem')({ item: {value: "-1"}, index: 0 })
        const flatlistEmptyItem = reportReasonFlatlist.renderProp("ListEmptyComponent")();
        let forYouBtnId = flatlistEmptyItem.findWhere(
          (node) => node.prop("testID") === "forYouBtnId"
        );
        forYouBtnId.simulate("press");
                        
        let cancelReportBtn = reportModalId.findWhere(
          (node) => node.prop("testID") === "cancelReportBtn"
        );
        cancelReportBtn.simulate("press");
        expect(reportModalId.props().visible).toBe(false);
        
        let radioInputId = reportReasonItem.findWhere(
          (node) => node.prop("testID") === "radioInputId"
        );
        radioInputId.simulate("press")
        
        let radioLabelId = reportReasonItem.findWhere(
          (node) => node.prop("testID") === "radioLabelId"
        );
        radioLabelId.simulate("press");
                
        let reportSubmitBtn = reportModalId.findWhere(
          (node) => node.prop("testID") === "reportSubmitBtn"
        );
        reportSubmitBtn.simulate("press");
        expect(reportModalId.props().visible).toBe(false);

        reportModalId.simulate("requestClose")
        
        //bookmark btn
        const getBookMarkedPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getBookMarkedPostsAPI = getBookMarkedPostsMessage.messageId;
        getBookMarkedPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBookMarkedPostsMessage.messageId);
        getBookMarkedPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
        runEngine.sendMessage("Unit Test", getBookMarkedPostsMessage)

        let bookmarkBtn = postFlatlistItem.findWhere(
          (node) => node.prop("testID") === "bookmarkBtn"
        );
        bookmarkBtn.simulate("press");

        const unBookMarkIdMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.unBookMarkId = unBookMarkIdMessage.messageId;
        unBookMarkIdMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), unBookMarkIdMessage.messageId);
        unBookMarkIdMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
        runEngine.sendMessage("Unit Test", unBookMarkIdMessage)


        let goBack = commentsBlock.findWhere(
          (node) => node.prop("testID") === "goBack"
        );
        goBack.simulate("press");
        expect(screenProps10.navigation.navigate).toBeCalled();

        const unBookMarkIdMessage1 = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.unBookMarkId = unBookMarkIdMessage1.messageId;
        unBookMarkIdMessage1.addData(getName(MessageEnum.RestAPIResponceDataMessage), unBookMarkIdMessage1.messageId);
        unBookMarkIdMessage1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_error_response)
        runEngine.sendMessage("Unit Test", unBookMarkIdMessage1)
  
      })
    });
    test('User navigates to Comments with params type isCommentOn', ({ given, when, then }) => {
      let commentsBlock: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock = shallow(<Comments {...screenProps11}/>)
       });

      when('I navigate to the Comments', () => {
           instance = commentsBlock.instance() as Comments;
      });

      then('I can select back button without error',()=> {
        let goBack = commentsBlock.findWhere(
          (node) => node.prop("testID") === "goBack"
        );
        goBack.simulate("press");
        expect(screenProps11.navigation.navigate).toBeCalled();
  
      })
    });

    test('User navigates to Comments with params type SearchActivity with search trending', ({ given, when, then }) => {
      let commentsBlock: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock = shallow(<Comments {...screenProps_trending}/>)
       });

      when('I navigate to the Comments', () => {
           instance = commentsBlock.instance() as Comments;
           const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)
   
           const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostItemCallId = getPostMessage.messageId;
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getPostMessage)
      });

      then('I can select back button without error',()=> {
        const postFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "postFlatlist"
        );

        postFlatlist.props().keyExtractor({}, 3);
        const postFlatlistItem = postFlatlist.renderProp('renderItem')({ item: instance.state.PostData[0], index: 0 })
        postFlatlist.renderProp("ListEmptyComponent")();
        postFlatlist.renderProp("onEndReached")();
        postFlatlist.renderProp("onRefresh")();


        const getSearchedPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getSearchedPostsCallId = getSearchedPostsMessage.messageId;
        getSearchedPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getSearchedPostsMessage.messageId);
        getSearchedPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {})
        runEngine.sendMessage("Unit Test", getSearchedPostsMessage)

        let goBack = commentsBlock.findWhere(
          (node) => node.prop("testID") === "goBack"
        );
        goBack.simulate("press");
        expect(screenProps7.navigation.navigate).toBeCalled();
  
      })
    });

    test('User navigates to Comments with params type SearchActivity with search hastag', ({ given, when, then }) => {
      let commentsBlock: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock = shallow(<Comments {...screenProps_hashtag_recent}/>)
       });

      when('I navigate to the Comments', () => {
           instance = commentsBlock.instance() as Comments;
           const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)
   
           const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostItemCallId = getPostMessage.messageId;
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getPostMessage)
      });

      then('I can select back button without error',()=> {
        const postFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "postFlatlist"
        );

        postFlatlist.props().keyExtractor({}, 3);
        const postFlatlistItem = postFlatlist.renderProp('renderItem')({ item: instance.state.PostData[0], index: 0 })
        postFlatlist.renderProp("ListEmptyComponent")();
        postFlatlist.renderProp("onEndReached")();
        postFlatlist.renderProp("onRefresh")();


        const getSearchedPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getSearchedPostsCallId = getSearchedPostsMessage.messageId;
        getSearchedPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getSearchedPostsMessage.messageId);
        getSearchedPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
        runEngine.sendMessage("Unit Test", getSearchedPostsMessage)

        let goBack = commentsBlock.findWhere(
          (node) => node.prop("testID") === "goBack"
        );
        goBack.simulate("press");
        expect(screenProps7.navigation.navigate).toBeCalled();
  
      })
    });

    test('User navigates to Comments with params type SearchActivity with search location top', ({ given, when, then }) => {
      let commentsBlock: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock = shallow(<Comments {...screenProps_location_top}/>)
       });

      when('I navigate to the Comments', () => {
           instance = commentsBlock.instance() as Comments;
           const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)
   
           const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostItemCallId = getPostMessage.messageId;
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getPostMessage)
      });

      then('I can select back button without error',()=> {
        const postFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "postFlatlist"
        );

        postFlatlist.props().keyExtractor({}, 3);
        const postFlatlistItem = postFlatlist.renderProp('renderItem')({ item: instance.state.PostData[0], index: 0 })
        postFlatlist.renderProp("ListEmptyComponent")();
        postFlatlist.renderProp("onEndReached")();
        postFlatlist.renderProp("onRefresh")();


        const getSearchedPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getSearchedPostsCallId = getSearchedPostsMessage.messageId;
        getSearchedPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getSearchedPostsMessage.messageId);
        getSearchedPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
        runEngine.sendMessage("Unit Test", getSearchedPostsMessage)

        let goBack = commentsBlock.findWhere(
          (node) => node.prop("testID") === "goBack"
        );
        goBack.simulate("press");
        expect(screenProps7.navigation.navigate).toBeCalled();
  
      })
    });

    test('User navigates to Comments with params type SearchActivity with search location trending', ({ given, when, then }) => {
      let commentsBlock: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock = shallow(<Comments {...screenProps_location_trending}/>)
       });

      when('I navigate to the Comments', () => {
           instance = commentsBlock.instance() as Comments;
           const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)
   
           const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostItemCallId = getPostMessage.messageId;
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getPostMessage)
      });

      then('I can select back button without error',()=> {
        const postFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "postFlatlist"
        );

        postFlatlist.props().keyExtractor({}, 3);
        const postFlatlistItem = postFlatlist.renderProp('renderItem')({ item: instance.state.PostData[0], index: 0 })
        postFlatlist.renderProp("ListEmptyComponent")();
        postFlatlist.renderProp("onEndReached")();
        const getUserPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getUserPostsApiId = getUserPostMessage.messageId;
        getUserPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getUserPostMessage.messageId);
        getUserPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData2)
        runEngine.sendMessage("Unit Test", getUserPostMessage)
        postFlatlist.renderProp("onRefresh")();


        const getSearchedPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getSearchedPostsCallId = getSearchedPostsMessage.messageId;
        getSearchedPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getSearchedPostsMessage.messageId);
        getSearchedPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
        runEngine.sendMessage("Unit Test", getSearchedPostsMessage)

        let goBack = commentsBlock.findWhere(
          (node) => node.prop("testID") === "goBack"
        );
        goBack.simulate("press");
        expect(screenProps7.navigation.navigate).toBeCalled();
  
      })
    });

    test('User navigates to Comments with params type SearchActivity with search location recent', ({ given, when, then }) => {
      let commentsBlock: ShallowWrapper;
      let instance: Comments;

      given('I am a User loading Comments', () => {
        commentsBlock = shallow(<Comments {...screenProps_location_recent}/>)
       });

      when('I navigate to the Comments', () => {
           instance = commentsBlock.instance() as Comments;
           const getapiPostFollowingItemMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostFollowingItemCallId = getapiPostFollowingItemMessage.messageId;
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getapiPostFollowingItemMessage.messageId);
           getapiPostFollowingItemMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getapiPostFollowingItemMessage)
   
           const getPostMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
           instance.apiPostItemCallId = getPostMessage.messageId;
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getPostMessage.messageId);
           getPostMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
           runEngine.sendMessage("Unit Test", getPostMessage)
      });

      then('I can select back button without error',()=> {
        const postFlatlist = commentsBlock.findWhere(
          (node) => node.prop("testID") === "postFlatlist"
        );

        postFlatlist.props().keyExtractor({}, 3);
        const postFlatlistItem = postFlatlist.renderProp('renderItem')({ item: instance.state.PostData[0], index: 0 })
        postFlatlist.renderProp("ListEmptyComponent")();
        postFlatlist.renderProp("onEndReached")();

        const getSearchedPostsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        instance.getSearchedPostsCallId = getSearchedPostsMessage.messageId;
        getSearchedPostsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getSearchedPostsMessage.messageId);
        getSearchedPostsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_FollowingData)
        runEngine.sendMessage("Unit Test", getSearchedPostsMessage)
        postFlatlist.renderProp("onRefresh")()

        let goBack = commentsBlock.findWhere(
          (node) => node.prop("testID") === "goBack"
        );
        goBack.simulate("press");
        expect(screenProps7.navigation.navigate).toBeCalled();
  
      })
    });
});
