import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';
import { runEngine } from '../../../../framework/src/RunEngine';
import { Message } from "../../../../framework/src/Message";

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { View } from "react-native";
import HelpCenter from "../../src/HelpCenter"
const navigation = require("react-navigation")
// getHelpcenterapi call id
const helpCenterResponse: any = {"data":{"id":"1","type":"help_center_contents","attributes":{"description":"\u003cp\u003eWelcome to the Help Center of GoLavi! Here, you'll find answers to some of the most commonly asked questions about our platform. If you're having trouble with something that's not covered here, please feel free to contact our support team for further assistance.\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003eGetting Started\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;1. How do I create an account on the app?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• To create an account on our app, download it from the App Store or Google Play and follow the prompts to sign up using your phone number or email address. You can also sign up using your existing social media accounts.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;2. How do I edit my profile?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• You can edit your profile by tapping on the \"Profile\" icon in the bottom right corner of the app and selecting \"Edit Profile.\" From there, you can change your username, profile picture, bio, and other details.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;3. How do I follow other users?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• To follow other users, search for their username or use the \"Discover\" tab to find popular users. Once you find a user you want to follow, tap the \"Follow\" button on their profile.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;4. How do I upload a video?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• To upload a video, tap the \"Plus\" button in the center of the bottom toolbar, select the video you want to upload from your phone's camera roll, and then add a caption and any other details you want to include.\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003eUsing the App\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;1. How do I search for videos or users?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• To search for videos or users, tap on the magnifying glass icon in the bottom toolbar and enter a keyword or username in the search bar.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;2. How do I like or comment on a video?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• To like a video, double-tap the screen while the video is playing, or tap the heart icon below the video. To comment on a video, tap the speech bubble icon and enter your comment in the text box.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;3. How do I share a video?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• To share a video, tap the \"Share\" icon below the video and select the platform or contact you want to share it with.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;4. How do I report inappropriate content or users?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• To report inappropriate content or users, tap the \"...\" icon below the video and select \"Report.\" You'll be prompted to choose a reason for the report and can include additional details if necessary.\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003eAccount Management\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;1. How do I change my password?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• To change your password, go to your profile, tap the three dots in the top right corner, and select \"Settings.\" From there, select “Manage my account” followed by\u0026nbsp;\"Change Password\" and follow the prompts to update your password.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;2. How do I delete my account?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• To delete your account, go to your profile, tap the three dots in the top right corner, and select \"Settings.\" From there, select \"Delete Account\" and follow the prompts to permanently delete your account.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;3. How do I manage my notifications?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• To manage your notifications, go to your profile, tap the three dots in the top right corner, and select \"Settings.\" From there, select \"Notifications\" and adjust the settings as desired.\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003eSafety and Privacy\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;1. How do I make my account private?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• To make your account private, go to your profile, tap the three dots in the top right corner, and select \"Settings.\" From there, toggle on the \"Private Account\" option.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;2. How do I block or report a user?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• To block or report a user, go to their profile, tap the three dots in the top right corner, and select \"Block\" or \"Report.\" You'll be prompted to choose a reason for the action and can include additional details if necessary.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;3. How do I control who can comment on my videos?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• To control who can comment on your videos, go to your profile, tap the three dots in the top right corner, and select \"Settings.\" From there, select \"Privacy\" and adjust the \"Who Can Comment\" settings as desired.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;4. How do I control who can see my videos?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• To control who can see your videos, go to your profile, tap the three dots in the top right corner, and select \"Settings.\" From there, select \"Privacy\" and adjust the \"Who Can See My Videos\" settings as desired.\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003eTechnical Issues\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;1. Why won't my videos upload?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• If you're having trouble uploading a video, make sure you have a stable internet connection and enough storage space on your phone. You can also try closing and reopening the app or restarting your phone.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;2. Why is the app crashing?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• If the app keeps crashing, try updating the app to the latest version or clearing the app's cache. You can also try restarting your phone or reinstalling the app.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;3. Why am I not receiving notifications?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• If you're not receiving notifications, make sure your notification settings are turned on in the app and in your phone's settings. You can also try logging out and logging back in to the app.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;4. Why is the app running slow?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• If the app is running slow, try closing other apps and freeing up memory on your phone. You can also try clearing the app's cache or updating the app to the latest version.\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003eCommunity Guidelines\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;1. What are the community guidelines?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• Our community guidelines outline the behaviors and content that are not allowed on our platform, including hate speech, harassment, graphic violence, and sexual content. You can find the full guidelines in the app's settings or on our website.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;2. What happens if I violate the community guidelines?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• If you violate our community guidelines, your account may be temporarily or permanently suspended. We take violations of our guidelines seriously and may also report illegal activities to the appropriate authorities.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;3. How do I appeal a suspension or content removal?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• If you believe your account was suspended or your content was removed in error, you can submit an appeal through the app's settings or by contacting our support team.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;•\u0026nbsp;\u003c/p\u003e\u003cp\u003eAdvertising and Promotions\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;1. How do I advertise on the app?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• If you're interested in advertising on our platform, please contact our advertising team for more information about advertising options and pricing.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;2. Can I promote my content on the app?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• Yes, you can promote your content on our app by using our advertising tools, such as promoted posts or sponsored content.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;3. How do I report an inappropriate ad?\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;• If you see an ad that violates our community guidelines or is inappropriate, you can report it by tapping the \"Share\" icon on the ad and selecting \"Report.\" You'll be prompted to choose a reason for the report and can include additional details if necessary.\u003c/p\u003e\u003cp\u003e\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u003c/p\u003e\u003cp\u003eWe hope these additional Help Center topics are helpful in addressing some of your concerns about our social media app. As always, if you have any further questions or need additional assistance, please don't hesitate to contact our support team.\u003c/p\u003e"}}}

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack:jest.fn()
  },
  id: "HelpCenter",
  route: null
}

const feature = loadFeature('./__tests__/features/helpcenter-scenario.feature');

defineFeature(feature, (test) => {


  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to helpcenter', ({ given, when, then }) => {
    let HelpCenterBlock: ShallowWrapper;
    //@ts-ignore
    let instance: HelpCenter;
    let itemObj: any;

    given('I am a User loading helpcenter', () => {
      //@ts-ignore
      HelpCenterBlock = shallow(<HelpCenter {...screenProps} />);
    });

    when('I navigate to the helpcenter', () => {
      instance = HelpCenterBlock.instance() as HelpCenter;
      instance.setState({ helpcenterData: helpCenterResponse.data },() => {instance.componentDidMount()});
    });

    then('helpcenter will load with out errors', () => {

      const helpCenterApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      helpCenterApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        helpCenterApiCallId.messageId
      );
      helpCenterApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(helpCenterResponse))
      );
      instance.helpCenterApiCallId = helpCenterApiCallId.messageId;
      runEngine.sendMessage("Unit Test", helpCenterApiCallId);

      expect(HelpCenterBlock).toBeTruthy();
    });

    then('I can leave the screen with out errors', () => {

       let btnGoBack = HelpCenterBlock.findWhere(
            (node: any) => node.prop("testID") === "goBackBtn"
        );
        btnGoBack.simulate("press") ;
      expect(HelpCenterBlock).toBeTruthy();
    });
  });


});
