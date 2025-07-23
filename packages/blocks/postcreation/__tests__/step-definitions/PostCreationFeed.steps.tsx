import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import * as utils from "../../../../framework/src/Utilities";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import PostCreation from "../../src/feed/PostCreation";
import { waitFor } from "@testing-library/react-native";
import { Platform } from "react-native";
import * as helpers from "../../../../framework/src/Helpers";
import scale, { verticalScale } from "../../../../components/src/Scale";
const carouselData: any = [{ name: "me", path:"1" },
{ name: "burning_effect", path: "2" },
{ name: "emotions_exaggerator", path:  "3"},
{ name: "fire_effect", path: '4' }];

const screenProps = {
  navigation: {
      state: { params:  {callback: () => jest.fn()} },
      reset: jest.fn(),
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
      addListener: jest.fn().mockImplementation((_, callback) => {
          callback();
        }),
  },
  id: "PostCreation",
  route: {
    params:{
      updateData:{
       id: "1",
       name:"abc",
       visibility_setting:"Public",
       audience_setting:"No restrictions to viewers",
       comment_setting:"Allow all comments",
       post_medias:{thumnails:["1.png"]},
       location:"location"
     },
    }
  }   
};
const MOCK_RESULT_SUCCESS_configuration = {
  visbility_settings: {Public:"Public"},
}
const mockgetStorageData = jest.spyOn(utils, "getStorageData")
const mockFetch = jest.fn();
let style = [{"backgroundColor": "black", "borderRadius": 36.231884057971016, "marginHorizontal": 9.057971014492754, "padding": 10, "paddingHorizontal": 15}, false];

const feature = loadFeature("./__tests__/features/PostCreationFeed-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(global, 'setTimeout').mockImplementation((cb: any) => cb());
    jest.spyOn(global, 'setInterval').mockImplementation((cb: any) => cb());
    mockgetStorageData.mockImplementation(() => {
      return Promise.resolve("ar")
    })
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    global.fetch = mockFetch;
    jest.useFakeTimers();
  });

  test("User navigates to PostCreation", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: PostCreation;

    given("I am a User loading PostCreation", () => {
      exampleBlockA = shallow(<PostCreation {...screenProps} />);
    });

    when("I navigate to the PostCreation", () => {
      instance = exampleBlockA.instance() as PostCreation;
      expect(exampleBlockA).toBeTruthy();

    });

    then("PostCreation will load with out errors",async () => {      
      await new Promise(resolve => setImmediate(resolve))
      const navigationMessage = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      navigationMessage.addData(getName(MessageEnum.PostDetailDataMessage),{
        "data": 
            {
                "id": "8",
                "type": "category",
                "attributes": {
                    "id": 8,
                    "name": "Classic",
                    "price": "200",
                    "product_image":"1.png",
                    "category":{
                      "data" :{
                        "attributes": {
                          "id": 8,
                        }
                      }
                    }
                }
            }
    });
      runEngine.sendMessage("Unit Test", navigationMessage);

      const configurationMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.configurationApcallID = configurationMessage.messageId;
      configurationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), configurationMessage.messageId);
      configurationMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), MOCK_RESULT_SUCCESS_configuration)
      runEngine.sendMessage("Unit Test", configurationMessage)

      const getBucketDetailsApiMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getBucketDetailsCallId = getBucketDetailsApiMessage.messageId;
      getBucketDetailsApiMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBucketDetailsApiMessage.messageId);
      getBucketDetailsApiMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{access_key_id:"1"})
      runEngine.sendMessage("Unit Test", getBucketDetailsApiMessage)

      const addpostApiMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.addpostApiCallId = addpostApiMessage.messageId;
      addpostApiMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), addpostApiMessage.messageId);
      addpostApiMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{data:[]})
      runEngine.sendMessage("Unit Test", addpostApiMessage)

      const addDetailPostAPIMesage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.addDetailPostAPICallId = addDetailPostAPIMesage.messageId;
      addDetailPostAPIMesage.addData(getName(MessageEnum.RestAPIResponceDataMessage), addDetailPostAPIMesage.messageId);
      addDetailPostAPIMesage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{data:[]})
      runEngine.sendMessage("Unit Test", addDetailPostAPIMesage)

      const apiSearchMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.apiSearchTags = apiSearchMessage.messageId;
      apiSearchMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiSearchMessage.messageId);
      apiSearchMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{post:{data:[{id:1}]}})
      runEngine.sendMessage("Unit Test", apiSearchMessage)

      const getUploadDraftsMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.getUploadDraftsId = getUploadDraftsMessage.messageId;
      getUploadDraftsMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getUploadDraftsMessage.messageId);
      getUploadDraftsMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{data:[]})
      runEngine.sendMessage("Unit Test", getUploadDraftsMessage)

      const updatePostApiMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.updatePostApiCallId = updatePostApiMessage.messageId;
      updatePostApiMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), updatePostApiMessage.messageId);
      updatePostApiMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{data:[]})
      runEngine.sendMessage("Unit Test", updatePostApiMessage)

      const DeleteApiMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.DeleteApiCallId = DeleteApiMessage.messageId;
      DeleteApiMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), DeleteApiMessage.messageId);
      DeleteApiMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{data:[]})
      runEngine.sendMessage("Unit Test", DeleteApiMessage)

      const apiSearchAccountMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.apiSearchAccount = apiSearchAccountMessage.messageId;
      apiSearchAccountMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiSearchAccountMessage.messageId);
      apiSearchAccountMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{account:[{id:1},{id:2}]})
      runEngine.sendMessage("Unit Test", apiSearchAccountMessage)
      const MOCK_RESULT_SUCCESS_display_comments5= [
        {
          "data": {
            "id": "8",
            "type": "category",
            "attributes": {
              "id": 8,
              "name": "Classic",
              "created_at": "2023-06-05T05:41:41.293Z",
              "updated_at": "2023-06-05T05:41:41.293Z"
            }
          }
        },
        {
          "data": {
            "id": "9",
            "type": "category",
            "attributes": {
              "id": 9,
              "name": "Premium",
              "created_at": "2023-06-12T11:36:13.082Z",
              "updated_at": "2023-06-12T11:36:26.139Z"
            }
          }
        }
      ]
      
      const apiGetCategoryCallMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.apiGetCategoryCallID = apiGetCategoryCallMessage.messageId;
      apiGetCategoryCallMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiGetCategoryCallMessage.messageId);
      apiGetCategoryCallMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),MOCK_RESULT_SUCCESS_display_comments5)
      runEngine.sendMessage("Unit Test", apiGetCategoryCallMessage)

      const loginUserMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.loginUserCallId = loginUserMessage.messageId;
      loginUserMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), loginUserMessage.messageId);
      loginUserMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{data:{attributes : null}})
      runEngine.sendMessage("Unit Test", loginUserMessage)
      expect(exampleBlockA).toBeTruthy();
    });
    
    then("I can select seconds button with out errors", () => {
      let deepArId = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "deepArId"
      );
      // deepArId.props().onVideoRecordingFinished();
      // deepArId.props().onVideoRecordingStarted();
      // deepArId.props().onScreenshotTaken();
      // deepArId.props().onError();
      
      let Btn90Id = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "90BtnId"
      );
      Btn90Id.simulate("press");

      let text90Id = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "text90Id"
      );
      expect(text90Id.props().style.color).toBe("white")

      let Btn60Id = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "60BtnId"
      );
      Btn60Id.simulate("press");
      let text60Id = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "text60Id"
      );
      expect(text60Id.props().style.color).toBe("white")

      let Btn30Id = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "30BtnId"
      );
      Btn30Id.simulate("press");
      let text30Id = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "text30Id"
      );
      expect(text30Id.props().style.color).toBe("white")

      let Btn15Id = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "15BtnId"
      );
      Btn15Id.simulate("press");
      let text15Id = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "text15Id"
      );
      expect(text15Id.props().style.color).toBe("white")
      
      let effectsBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "effectsBtn"
      );
      effectsBtn.simulate("press");

      const carousel = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "carousel"
      );    
      carousel.prop("onSnapToItem")(6);
      const carouselItem1 = carousel.renderProp('renderItem')({ item: carouselData[0], index: 0 })  
      const takeVideoBtn1 = carouselItem1.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'takeVideo')      
      takeVideoBtn1.simulate("press")

      let crossBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "goback"
      );
      crossBtn.simulate("press");
      const mockHandleChangeEffect1 = jest.fn(); 
      instance.changeEffect = mockHandleChangeEffect1; 
      crossBtn.prop("onPress")();
      expect(mockHandleChangeEffect1).toHaveBeenCalled();

      let LiveBtnId = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "LiveBtnId"
      );
      LiveBtnId.simulate("press");
      let textLiveId = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "textLiveId"
      );
      expect(textLiveId.props().style.color).toBe("white")

      let goLiveBtnID = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "goLiveBtnID"
      );
      goLiveBtnID.simulate("press");
      const mockHandleRequestPermissions = jest.fn(); 
      instance.requestPermissions = mockHandleRequestPermissions; 
      goLiveBtnID.prop("onPress")();
      // expect(mockHandleRequestPermissions).toHaveBeenCalled();
      
      let LiveChallengeBtnId = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "LiveChallengeBtnId"
      );
      // LiveChallengeBtnId.simulate("press");
      let textChallengesId = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "textChallengesId"
      );
      // expect(textChallengesId.props().style.color).toBe("white")

      let goback = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "goback"
      );
      goback.simulate("press");
      const mockHandleChangeEffect = jest.fn(); 
      instance.changeEffect = mockHandleChangeEffect; 
      goback.prop("onPress")();
      expect(mockHandleChangeEffect).toHaveBeenCalled();

      let reelsOptionBtnId0 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "reelsOptionBtnId0"
      );
      reelsOptionBtnId0.simulate("press");
      const mockHandleflipcamera = jest.fn(); 
      instance.flipcamera = mockHandleflipcamera; 
      reelsOptionBtnId0.prop("onPress")();
      expect(mockHandleflipcamera).toHaveBeenCalled();

      let reelsOptionBtnId1 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "reelsOptionBtnId1"
      );
      reelsOptionBtnId1.simulate("press");
      const mockHandleTimermodel = jest.fn(); 
      instance.timermodel = mockHandleTimermodel; 
      reelsOptionBtnId1.prop("onPress")();
      expect(mockHandleTimermodel).toHaveBeenCalled();

      let reelsOptionBtnId2 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "reelsOptionBtnId2"
      );
      reelsOptionBtnId2.simulate("press");
      const mockHandleFlashcamera = jest.fn(); 
      instance.flashcamera = mockHandleFlashcamera; 
      reelsOptionBtnId2.prop("onPress")();
      expect(mockHandleFlashcamera).toHaveBeenCalled();
    });

    then("I can select timing button with out errors", () => {

      let time3BtnID = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "time3BtnID"
      );
      time3BtnID.simulate("press");
      // expect(time3BtnID.props().style).toStrictEqual(style);

      let reelsOptionBtnId1 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "reelsOptionBtnId1"
      );
      reelsOptionBtnId1.simulate("press");
      const mockHandleTimermodel = jest.fn(); 
      instance.timermodel = mockHandleTimermodel; 
      reelsOptionBtnId1.prop("onPress")();
      expect(mockHandleTimermodel).toHaveBeenCalled();
      
      expect(exampleBlockA).toBeTruthy();
    });
  });

  test("User navigates to PostCreation with effect", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: PostCreation;

    given("I am a User loading PostCreation", () => {
      exampleBlockA = shallow(<PostCreation {...screenProps} />);
    });

    when("I navigate to the PostCreation", () => {
      instance = exampleBlockA.instance() as PostCreation;
    });

    then("PostCreation will load with out errors",async () => {   
      const addDetailPostAPIMesage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.addDetailPostAPICallId = addDetailPostAPIMesage.messageId;
      addDetailPostAPIMesage.addData(getName(MessageEnum.RestAPIResponceDataMessage), addDetailPostAPIMesage.messageId);
      addDetailPostAPIMesage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{data:{attributes:{errors:{name:["can't be blank"]}}}})
      runEngine.sendMessage("Unit Test", addDetailPostAPIMesage) 
      
      const addDetailPostAPIMesage1 = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.addDetailPostAPICallId = addDetailPostAPIMesage1.messageId;
      addDetailPostAPIMesage1.addData(getName(MessageEnum.RestAPIResponceDataMessage), addDetailPostAPIMesage1.messageId);
      addDetailPostAPIMesage1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{data:{attributes:{errors:{name:["name"]}}}})
      runEngine.sendMessage("Unit Test", addDetailPostAPIMesage1) 
      expect(exampleBlockA).toBeTruthy();
    });
    
    then("I can select effect button with out errors", () => {
      let effectsBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "effectsBtn"
      );
      effectsBtn.simulate("press");

      const carousel = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "carousel"
      );
            
      carousel.prop("onSnapToItem")(6);
      const carouselItem1 = carousel.renderProp('renderItem')({ item: carouselData[0], index: 0 })  
      const takeVideoBtn1 = carouselItem1.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'takeVideo')      
      takeVideoBtn1.simulate("press")

      carousel.prop("onSnapToItem")(8);
      const carouselItem = carousel.renderProp('renderItem')({ item: carouselData[0], index: 0 })  
      const takeVideoBtn = carouselItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'takeVideo')      
      takeVideoBtn.simulate("press")

      const mockHandletakeVideo1 = jest.fn(); 
      instance.takeVideo = mockHandletakeVideo1; 
      takeVideoBtn.prop("onPress")();
    });
  });

  test("User navigates to PostCreation with Timer", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: PostCreation;

    given("I am a User loading PostCreation", () => {
      exampleBlockA = shallow(<PostCreation {...screenProps} />);
    });

    when("I navigate to the PostCreation", () => {
      instance = exampleBlockA.instance() as PostCreation;
    });

    then("PostCreation will load with out errors",async () => {      
      expect(exampleBlockA).toBeTruthy();
    });
    
    then("I can select timer button with out errors", async() => {
      await new Promise(resolve => setImmediate(resolve));      
      let reelsOptionBtnId = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "reelsOptionBtnId1"
      );
      reelsOptionBtnId.simulate("press");

      let time5BtnID = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "time5BtnID"
      );
      time5BtnID.simulate("press");
      // expect(time5BtnID.props().style).toStrictEqual(style);

      let reelsOptionBtnId1_1 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "reelsOptionBtnId1"
      );
      reelsOptionBtnId1_1.simulate("press");
      
      let time7BtnID = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "time7BtnID"
      );
      time7BtnID.simulate("press");
      // expect(time7BtnID.props().style).toStrictEqual(style);


      let reelsOptionBtnId1_2 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "reelsOptionBtnId1"
      );
      reelsOptionBtnId1_2.simulate("press");

      let time10BtnID = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "time10BtnID"
      );
      time10BtnID.simulate("press");
      // expect(time10BtnID.props().style).toStrictEqual(style);

      let playPuaseBtnID1 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "playPuaseBtnID"
      );
      playPuaseBtnID1.simulate("press");
      let reelsOptionBtnId1_3 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "reelsOptionBtnId1"
      );
      reelsOptionBtnId1_3.simulate("press");

      let time15BtnID = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "time15BtnID"
      );
      time15BtnID.simulate("press");
      // expect(time15BtnID.props().style).toStrictEqual(style);


      let reelsOptionBtnId2 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "reelsOptionBtnId0"
      );
      reelsOptionBtnId2.simulate("press");

      let captureImgBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "captureImgBtn"
      );
      captureImgBtn.simulate("press");

      const mockHandleChooseImage = jest.fn(); 
      instance.chooseImage = mockHandleChooseImage; 
      captureImgBtn.prop("onPress")();
      expect(mockHandleChooseImage).toHaveBeenCalled();

      let goback = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "goback"
      );
      goback.simulate("press");

      let playPuaseBtnID = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "playPuaseBtnID"
      );
      playPuaseBtnID.simulate("press");
      expect(exampleBlockA).toBeTruthy();
    });

  });
  
  test("User navigate to LiveStream", ({ given, when, then }) => {
    let postCreationWrapper: ShallowWrapper;
    let instance: PostCreation;

    given("I am a User clicking on live", () => {
      postCreationWrapper = shallow(<PostCreation {...screenProps} />);

      expect(postCreationWrapper).toBeTruthy();
      expect(postCreationWrapper).toMatchSnapshot();

      instance = postCreationWrapper.instance() as PostCreation;
    });

    when("I click on live text", () => {
      const live = postCreationWrapper.findWhere((node) => node.prop("testID") === "LiveBtnId");
      live.simulate("press");
      const loginUserMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      instance.loginUserCallId = loginUserMessage.messageId;
      loginUserMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), loginUserMessage.messageId);
      loginUserMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{data:{attributes : {photo: "userphoto"}}})
      runEngine.sendMessage("Unit Test", loginUserMessage)
      const liveThumbnail = postCreationWrapper.findWhere(
        (node) => node.prop("testID") === "liveThumbnail"
      );
      expect(liveThumbnail.props().source.uri).toBe("userphoto");
      const titleInput = postCreationWrapper.findWhere((node) => node.prop("testID") === "title");
      const topicInput = postCreationWrapper.findWhere((node) => node.prop("testID") === "topic");
      expect(titleInput).toBeTruthy();
      expect(topicInput).toBeTruthy();
    });

    then("I can add title and topic and I can navigate to Live", async() => {
      const titleInput = postCreationWrapper.findWhere((node) => node.prop("testID") === "title");
      const topicInput = postCreationWrapper.findWhere((node) => node.prop("testID") === "topic");
      const placeholder = postCreationWrapper.findWhere((node) => node.prop("testID") === "placeholder");
      placeholder.simulate("press");
      titleInput.simulate("changeText","New Live");
      const updatedTitleInput = postCreationWrapper.findWhere((node) => node.prop("testID") === "title");
      expect(updatedTitleInput.props().value).toBe("New Live");
      topicInput.simulate("changeText","New Topic");
      const updatedTopicInput = postCreationWrapper.findWhere((node) => node.prop("testID") === "topic");
      expect(updatedTopicInput.props().value).toBe("New Topic");
      let goLiveBtnID = postCreationWrapper.findWhere(
        (node) => node.prop("testID") === "goLiveBtnID"
      );
      const change = postCreationWrapper.findWhere((node) => node.prop("testID") === "change");
      change.simulate("press");
      await waitFor(()=>{postCreationWrapper.update();})
      let liveThumbnail = postCreationWrapper.findWhere(
        (node) => node.prop("testID") === "liveThumbnail"
      );
      expect(liveThumbnail.props().source.uri).toBe("/path/to/image.jpg");
      goLiveBtnID.simulate("press");
      const mockHandleRequestPermissions = jest.fn(); 
      instance.requestPermissions = mockHandleRequestPermissions; 
      await goLiveBtnID.prop("onPress")();
      const navigationProp = {"data": {"title": "New Live", "topic": "New Topic", "image": {"name": "image.jpg","type": "image/jpeg","uri": "/path/to/image.jpg",}}, "screen": "LiveStreaming"};
      // expect(screenProps.navigation.navigate).toHaveBeenCalledWith("LiveStreaming",navigationProp);
    });
  });
  test("User navigate to LiveStream with IOS", ({ given, when,then}) => {
    let postCreationWrapper: ShallowWrapper;
    let instance: PostCreation;

    given("Post creation rendered without errors", () => {
      postCreationWrapper = shallow(<PostCreation {...screenProps} />);

      expect(postCreationWrapper).toBeTruthy();
      expect(postCreationWrapper).toMatchSnapshot();

      instance = postCreationWrapper.instance() as PostCreation;
      Platform.OS = "ios";
    })
    when("I click on live text",()=>{
      const titleInput = postCreationWrapper.findWhere((node) => node.prop("testID") === "title");
      expect(titleInput).toHaveLength(0);
      let LiveBtnId = postCreationWrapper.findWhere(
        (node) => node.prop("testID") === "LiveBtnId"
      );
      LiveBtnId.simulate("press");
      postCreationWrapper.update();
      const visibleTitleInput = postCreationWrapper.findWhere((node) => node.prop("testID") === "title");
      expect(visibleTitleInput).toHaveLength(1);
    })
    then("I can add title topic and image then I can navigate to the LiveStream", async() => {
      const titleInput = postCreationWrapper.findWhere((node) => node.prop("testID") === "title");
      const topicInput = postCreationWrapper.findWhere((node) => node.prop("testID") === "topic");
      const placeholder = postCreationWrapper.findWhere((node) => node.prop("testID") === "placeholder");
      placeholder.simulate("press");
      titleInput.simulate("changeText","New Live");
      const updatedTitleInput = postCreationWrapper.findWhere((node) => node.prop("testID") === "title");
      expect(updatedTitleInput.props().value).toBe("New Live");
      topicInput.simulate("changeText","New Topic");
      const updatedTopicInput = postCreationWrapper.findWhere((node) => node.prop("testID") === "topic");
      expect(updatedTopicInput.props().value).toBe("New Topic");
      let goLiveBtnID = postCreationWrapper.findWhere(
        (node) => node.prop("testID") === "goLiveBtnID"
      );
      const change = postCreationWrapper.findWhere((node) => node.prop("testID") === "change");
      change.simulate("press");
      await waitFor(()=>{postCreationWrapper.update();})
      let liveThumbnail = postCreationWrapper.findWhere(
        (node) => node.prop("testID") === "liveThumbnail"
      );
      expect(liveThumbnail.props().source.uri).toBe("/path/to/image.jpg");
      goLiveBtnID.simulate("press");
      const mockHandleRequestPermissions = jest.fn(); 
      instance.requestPermissions = mockHandleRequestPermissions; 
      await goLiveBtnID.prop("onPress")();
      const navigationProp = {"data": {"title": "New Live", "topic": "New Topic", "image": {"name": "image.jpg","type": "image/jpeg","uri": "/path/to/image.jpg",}}, "screen": "LiveStreaming"};
      expect(screenProps.navigation.navigate).toHaveBeenCalledWith("LiveStreaming",navigationProp);
    });
    })
});