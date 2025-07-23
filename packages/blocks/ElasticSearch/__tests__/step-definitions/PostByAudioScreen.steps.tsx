import { ShallowWrapper, shallow } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";

import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum";
import PostByAudioScreen from "../../src/PostByAudioScreen";
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    state: {},
  },
  id: "PostByAudioScreen",
  route: {
    params: {
      data: {
        album: null,
        artist: "SoundHelix",
        audio:
          "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/fqe83dyk31qnuewb63anoq2z5yf4",
        created_at: "2023-06-03T08:10:37.646Z",
        filename: "SoundHelix-Song-7.mp3",
        genre: null,
        id: 6,
        image: null,
        title: "SoundHelix-Song-1",
      },
    },
  },
  elasticSearchCallId: "",
};

const mockedAuidoPost = {
  data: [
    {
      attributes: [
        {
          attributes: {
            account_id: 723,
            audience_setting: "No restrictions to viewers",
            body: "Song1",
            bookmarked: false,
            comment_setting: "Allow all Comments",
            created_at: "2023-08-16T11:08:22.546Z",
            description: "",
            id: 1164,
            is_like_by_current_user: false,
            latitude: "0",
            location: null,
            longitude: "0",
            name: "Song1",
            notification: null,
            photo: null,
            post_comment_count: 0,
            post_likes_count: 0,
            post_medias: [
              {
                images: [],
                thumnails: [
                  "http://minio-ext.b255799.dev.eastus.az.svc.builder.cafe/sbucket/mnvgzqtydxcpgez43mffohfudao5",
                ],
                videos: [
                  {
                    audio_artist: "SoundHelix",
                    audio_filename: "SoundHelix-Song-1.mp3",
                    audio_title: "SoundHelix-Song-1",
                    audio_url:
                      "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/7zyonfaqlmzbc7xxhs3obb8nerdg",
                    created_at: "2023-08-16T11:08:22.557Z",
                    id: 1121,
                    media_type: "Video",
                    media_url:
                      "http://minio-ext.b255799.dev.eastus.az.svc.builder.cafe/sbucket/wpsaji574fzpcd3a51aawyrtypqd",
                    post_id: 1164,
                    updated_at: "2023-08-16T11:08:23.418Z",
                    video_thumnail:
                      "http://minio-ext.b255799.dev.eastus.az.svc.builder.cafe/sbucket/mnvgzqtydxcpgez43mffohfudao5",
                  },
                ],
              },
            ],
            post_views: 0,
            save_post_as: "create_post",
            schedule_time: null,
            tag_list: [],
            taggings: [],
            updated_at: "2023-08-16T11:08:22.546Z",
            video_post: null,
            video_post_thumbnail: null,
            visibility_setting: "Public",
          },
          id: "1164",
          type: "post",
        },
      ],
      id: "1164",
      type: "post",
    },
  ],
  meta: {
    pagination: {
      current_page: 1,
      next_page: null,
      prev_page: null,
      total_count: 1,
      total_pages: 1,
    },
  },
};
const moreData = Array(20).fill({...mockedAuidoPost?.data[0]});

const feature = loadFeature(
  "./__tests__/features/PostByAudio-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to PostsByAudioScreen", ({ given, when, then }) => {
    PostByAudioScreen.prototype.onSelectAuidoPostType = jest.fn();
    let exampleBlockA: ShallowWrapper;
    let instance: PostByAudioScreen;

    given("I am a User loading PostsByAudioScreen", () => {
      exampleBlockA = shallow(<PostByAudioScreen {...screenProps} />);
    });

    when("I navigate to the PostsByAudioScreen", async () => {
      instance = exampleBlockA.instance() as PostByAudioScreen;
      const getLikesPostsCall = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getLikesPostsCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getLikesPostsCall.messageId
      );
      getLikesPostsCall.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockedAuidoPost
      );
      instance.getAudioPostsAPICallId = getLikesPostsCall.messageId;
      runEngine.sendMessage("Unit Test", getLikesPostsCall);
      let list = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "list"
      );
      list.render();
      list.props().onEndReached();
      expect(list).toHaveLength(1);
    });

    then("I can view top posts", () => {
      jest.useFakeTimers();
      const {getByTestId} = render(<PostByAudioScreen {...screenProps}/>);
      const recent = getByTestId("recent");
      const list = getByTestId("list");
      fireEvent.press(recent);
      const top = getByTestId("top");
      fireEvent.press(top);
      const topPostResponse = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      topPostResponse.addData(
          getName(MessageEnum.NavigationPayLoadMessage),
          topPostResponse.messageId
      );
      const responseJson = 'Token'
      topPostResponse.addData(
          getName(MessageEnum.AuthTokenDataMessage),
          responseJson
      );
      topPostResponse.addData(MessageEnum.RestAPIResponceSuccessMessage,mockedAuidoPost)
      runEngine.sendMessage("Unit Test", topPostResponse);
      waitFor(()=>{
        expect(list).toHaveLength(1);
        expect(instance.state.audioPostType).toBe("top");
      });
    });

    then("I can view recent post", () => {
      const {getByTestId} = render(<PostByAudioScreen {...screenProps}/>);
      const recent = getByTestId("recent");
      fireEvent.press(recent);
      waitFor(()=>{
        expect(instance.state.audioPostType).toBe("recent");
      })
    });

    then("I can view trending post", () => {
      const {getByTestId} = render(<PostByAudioScreen {...screenProps}/>);
      const trending = getByTestId("trending");
      fireEvent.press(trending);
      waitFor(()=>{
        expect(instance.state.audioPostType).toBe("trending");
      })
    });

    then("PostsByAudioScreen will show the audio title correctly", () => {
        const { getByText } = render(<PostByAudioScreen {...screenProps} />);
        const audioTitle = getByText("SoundHelix-Song-1");
        expect(audioTitle).toBeTruthy();
    });

    then("I can able to view twenty posts", async () => {
      let audioWrapper: ShallowWrapper;
      let audioInstance: PostByAudioScreen;
      audioWrapper = shallow(<PostByAudioScreen {...screenProps} />);
      audioInstance = audioWrapper.instance() as PostByAudioScreen;
      const getLikesPostsCall = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getLikesPostsCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getLikesPostsCall.messageId
      );
      getLikesPostsCall.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { data: moreData }
      );
      audioInstance.getAudioPostsAPICallId = getLikesPostsCall.messageId;
      runEngine.sendMessage("Unit Test", getLikesPostsCall);
      let list = audioWrapper.findWhere(
        (node) => node.prop("testID") === "list"
      );
      await waitFor(() => {
        list.render();
        list.props().onEndReached();
      });
      expect(list.props()?.data).toHaveLength(20);
      expect(list).toBeTruthy();
    });

    then("PostsByAudioScreen will render without data", () => {
        const prop = {
            navigation: {
              navigate: jest.fn(),
              goBack: jest.fn(),
              state: {},
            },
            id: "PostByAudioScreen",
            route: null,
            elasticSearchCallId: "",
          };
          const audioBlock = render(<PostByAudioScreen {...prop}/>);
          expect(audioBlock).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      let back = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "back"
      );
      back.simulate("press");
      expect(screenProps.navigation.goBack).toHaveBeenCalled();
    });
  });
});
