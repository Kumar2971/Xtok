import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"
import { render, fireEvent } from '@testing-library/react-native';
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { SearchBar } from 'react-native-elements';
import { View } from "react-native";
import Followers from "../../src/Followers";
const navigation = require("react-navigation");
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as utils from "../../../../framework/src/Utilities";
import { translate } from "../../../../components/src/i18n/translate"

const userListData = {
  id: '',
  attributes: {
    account_email: '',
    email: '', current_user_id: '',
    account_id: '',
    user_name: '',
    is_follow: false
  },
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
        return {
           remove: jest.fn()
        }
      }),
  },
  id: "Followers",
  route: {params:{title:`${translate("followed_accounts")}`,type:"followings"}}
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
  id: "Followers",
  route: {params:{title:"Followed accounts"}}
}

const screenProps3 = {
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
  id: "Followers",
  route: {params:{title:`${translate("followed_accounts")}`,type:"followers"}}
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
const mockgetStorageData = jest.spyOn(utils, "getStorageData")

const feature = loadFeature("./__tests__/features/Followers-scenario.feature");

defineFeature(feature, (test) => {
  jest.useFakeTimers();
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(global, 'setTimeout').mockImplementation((cb:any) => cb() );
    jest.spyOn(global, 'clearTimeout').mockImplementation(() => {});
    jest.mock("../../src/Followers.tsx");
    mockgetStorageData.mockImplementation((key) => {
      if("SelectedLng" === key) return Promise.resolve("ar")
      else return Promise.resolve("40")
    })
  });

  test("User navigates to Followers", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Followers;
    let searchBarRenderer: any;
    let itemObj: any;
    let exploreFlatListRenderWraper: any;
    const hideKeyboardMock = jest.fn();
    const followUserMock = jest.fn();
    const unfollowUserMock = jest.fn();
    const cancelRequestMock = jest.fn();

    const testCases = [
      {
        item: { id: '1234', account_status: 'Private', account_follow_status: 'Follow' ,photo:"123.png"},
        followCalled: true,
      },
      {
        item: { id: '1234', account_status: 'Private', account_follow_status: 'Requested' },
        cancelRequestCalled: true,
      },
      {
        item: { id: '1234', account_status: 'Public', account_follow_status: 'Unfollow' },
        unfollowCalled: true,
      },
      {
        item: { id: '5678', account_status: 'Public', account_follow_status: 'Unfollow' },
        followCalled: true,
      },
      {
        item: { id: '5678', account_status: 'Public', account_follow_status: 'following' },
        followCalled: true,
      },
    ];

    const navigationMock = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };

    given("I am a User loading Followers", () => {
      exampleBlockA = shallow(<Followers {...screenProps} />);
    });

    when('I navigate to the Followers', async () => {
      instance = exampleBlockA.instance() as Followers;
      
      const fetchExplore = new Message(getName(MessageEnum.RestAPIResponceMessage))
      fetchExplore.addData(getName(MessageEnum.RestAPIResponceDataMessage), fetchExplore);
      fetchExplore.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
      {account:[{ id: '5678', account_status: 'Public', account_follow_status: 'following' },{ id: '1234', account_status: 'Public', account_follow_status: 'Unfollow' }]}
      );
      fetchExplore.addData(getName(MessageEnum.RestAPIResponceDataMessage), fetchExplore.messageId);
      instance.fetchExploreApiId = fetchExplore.messageId
      runEngine.sendMessage("Unit Test", fetchExplore);
      
      let flatListSignUp = exampleBlockA.findWhere((node) => node.prop('testID') === 'flatListSignUp');
      let item = flatListSignUp.prop('renderItem')(testCases[4]);
      const navigationButton = shallow(item).findWhere(node => node.prop('testID') === 'navigationButton')
      navigationButton.simulate('press');

      const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msgPlayloadAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "USER-TOKEN");
      msgPlayloadAPI.addData(getName(MessageEnum.FollowersDataMessage), { isScreenFrom : "OTP"});
      runEngine.sendMessage("Unit Test", msgPlayloadAPI)


      instance.followUser = followUserMock;
      instance.unfollowUser = unfollowUserMock;
      instance.cancelRequest = cancelRequestMock;

      instance.hideKeyboard = hideKeyboardMock;
      const goToLoginSuccessMock = jest.fn();
      instance.goToLoginSuccess = goToLoginSuccessMock

      exampleBlockA.findWhere(node => node.prop('testID') === 'hideKeyboard').simulate('press');
      expect(hideKeyboardMock).toHaveBeenCalled();

      let list = exampleBlockA.findWhere((node) => node.prop('testID') === 'flatListSignUp');
      list.renderProp('renderItem')({item:{id: '1234', account_status: 'Private', account_follow_status: 'Follow'},index:0});
      list.renderProp('keyExtractor')({item:{id:0}})
      list.renderProp('onEndReached')()
      let searchFollow = exampleBlockA.findWhere((node) => node.prop('testID') === "searchBar");
            searchFollow.simulate("changeText", "in");
      // const listHeaderComponent = list.prop('ListHeaderComponent');
      // expect(listHeaderComponent()).toBeNull();

      exampleBlockA.findWhere(node => node.prop('testID') === 'buttonContinue').simulate('press');
      expect(goToLoginSuccessMock).toHaveBeenCalled();

      let renderedItem = instance.renderStaticItem({item:testCases[0].item,index:0});
      const buttonComponentA = shallow(renderedItem).findWhere(node => node.prop('testID') === 'navigationButton')
      buttonComponentA.simulate('press');
      expect(followUserMock).toHaveBeenCalled();

      let listRequested = exampleBlockA.findWhere((node) => node.prop('testID') === 'flatListSignUp');
      listRequested.renderProp('renderItem')({item:testCases[1].item,index:0});
      const renderedItemRequested = instance.renderStaticItem({item:testCases[1].item,index:0});
      const buttonComponentRequested = shallow(renderedItemRequested).findWhere(node => node.prop('testID') === 'navigationButton')
      buttonComponentRequested.simulate('press');
      expect(cancelRequestMock).toHaveBeenCalled();

      let listUnfollow = exampleBlockA.findWhere((node) => node.prop('testID') === 'flatListSignUp');
      listUnfollow.renderProp('renderItem')({item:testCases[2].item,index:0});
      const renderedItemFollow = instance.renderStaticItem({item:testCases[2].item,index:0});
      const buttonComponentFollow = shallow(renderedItemFollow).findWhere(node => node.prop('testID') === 'navigationButton')
      buttonComponentFollow.simulate('press');
      expect(followUserMock).toHaveBeenCalled();
    });

    then('Followers will load without errors', () => {
      const touchableOpacity = exampleBlockA.findWhere(node => node.prop('testID') === 'clickPrivacy');
      touchableOpacity.simulate('press');

      const trendingResponse = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
      );
      trendingResponse.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          trendingResponse.messageId
      );
      const responseJson = {
        "followers": [
          {
            "id": "1"
          }
        ]
      };
      trendingResponse.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          responseJson
      );
      instance.getFollowersId = trendingResponse.messageId;
      runEngine.sendMessage("Unit Test", trendingResponse);
    });
    then('Followings will load without errors', () => {
      const trendingResponse = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
      );
      trendingResponse.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          trendingResponse.messageId
      );
      const responseJson = {
        "followings": [
          {
            "id": "1"
          }
        ]
      };
      trendingResponse.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          responseJson
      );
      instance.getFollowingsId = trendingResponse.messageId;
      runEngine.sendMessage("Unit Test", trendingResponse);
    });

    then('I can see more data by scrolling followings list', () => {
      const list = exampleBlockA.findWhere((node) => node.prop('testID') === 'flatListNotSignUp');
      list.findWhere((node) => node.prop('testID') === 'flatListNotSignUp').props().refreshControl.props.onRefresh();
      const followingListApiFail = apiCall({});
      instance.getFollowingsId = followingListApiFail.messageId;
      runEngine.sendMessage("Unit Test", followingListApiFail);
      const responseJson = {
        "followings": Array.from({length : 20},(_:any,index:number)=>({id:`${index+1}`}))
      };
      const followingList = apiCall(responseJson);
      instance.getFollowingsId = followingList.messageId;
      runEngine.sendMessage("Unit Test", followingList);
      const followingFlatList = exampleBlockA.findWhere((node) => node.prop('testID') === 'flatListNotSignUp');
      expect(followingFlatList.prop("data").length).toBe(20);
      followingFlatList.renderProp('onEndReached')();
      const nextFollowingList = apiCall(responseJson);
      instance.getFollowingsId = nextFollowingList.messageId;
      runEngine.sendMessage("Unit Test", nextFollowingList);
      const emptyList = apiCall({"followings":[]});
      instance.getFollowingsId = emptyList.messageId;
      runEngine.sendMessage("Unit Test", emptyList);
      const newfollowingFlatList = exampleBlockA.findWhere((node) => node.prop('testID') === 'flatListNotSignUp');

      const searchBar = exampleBlockA.findWhere((node) => node.prop('testID') === 'searchBar');
      searchBar.simulate("changeText", "user");
      const searchApiFail = apiCall({});
      instance.searchFollowingsId = searchApiFail.messageId;
      runEngine.sendMessage("Unit Test", searchApiFail);
      const searchApi = apiCall(responseJson);
      instance.searchFollowingsId = searchApi.messageId;
      runEngine.sendMessage("Unit Test", searchApi);
      const followingSearchList = exampleBlockA.findWhere((node) => node.prop('testID') === 'flatListNotSignUp');
      expect(followingSearchList.prop("data").length).toBe(20);
      followingSearchList.renderProp('onEndReached')();
      const searchApi2 = apiCall(responseJson);
      instance.searchFollowingsId = searchApi2.messageId;
      runEngine.sendMessage("Unit Test", searchApi2);
      const followingSearchMoreList = exampleBlockA.findWhere((node) => node.prop('testID') === 'flatListNotSignUp');
      expect(followingSearchMoreList.prop("data").length).toBe(40);
      const renderItem = followingSearchMoreList.renderProp("renderItem")({item:{account_id : "1", id: "1", account_follow_status:"Following"},index:0});
      const imageClick = renderItem.findWhere((node)=> node.prop('testID') === 'imageClick');
      imageClick.simulate("press")
      expect(screenProps.navigation.navigate).toHaveBeenCalledWith("UserProfileBasicBlock", {"data": {"attributes": {"account_id": "1"}}})
      const renderItem2 = followingSearchMoreList.renderProp("renderItem")({item:{account_id : "2", id: "2", account_follow_status:"Following"},index:0});
      const nameClick = renderItem2.findWhere((node)=> node.prop('testID') === 'imageClick');
      nameClick.simulate("press")
      expect(screenProps.navigation.navigate).toHaveBeenCalledWith("UserProfileBasicBlock", {"data": {"attributes": {"account_id": "2"}}})
    })

    then('Get Search explore data', () => {
      const trendingResponse = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
      );
      trendingResponse.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          trendingResponse.messageId
      );
      const responseJson = {
        "data": [
          {
            "id": "1"
          }
        ]
      };
      trendingResponse.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          responseJson
      );
      instance.searchExploreApiId = trendingResponse.messageId;
      runEngine.sendMessage("Unit Test", trendingResponse);

    const getFollowingsResponse = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
    );
    getFollowingsResponse.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getFollowingsResponse.messageId
    );
    const responseJson1 = {
      "errors":{}
    };
    getFollowingsResponse.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responseJson1
    );
    instance.getFollowingsId = getFollowingsResponse.messageId;
    runEngine.sendMessage("Unit Test", getFollowingsResponse);
    });
    then('Get my followers', () => {
      const getFollowerErrorsResponse = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
    );
    getFollowerErrorsResponse.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getFollowerErrorsResponse.messageId
    );
    const responseJson1 = {
      "errors":{}
    };
    getFollowerErrorsResponse.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responseJson1
    );
    instance.getMyFollowersId = getFollowerErrorsResponse.messageId;
    runEngine.sendMessage("Unit Test", getFollowerErrorsResponse);

      const trendingResponse = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
      );
      trendingResponse.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          trendingResponse.messageId
      );
      const responseJson = {
        "data": [
          {
            "id": "1"
          }
        ]
      };
      trendingResponse.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          responseJson
      );
      instance.getMyFollowersId = trendingResponse.messageId;
      runEngine.sendMessage("Unit Test", trendingResponse);
    });
    then('Get my followings', () => {
      const getMyFollowingsResponse = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
    );
    getMyFollowingsResponse.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getMyFollowingsResponse.messageId
    );
    const responseJson = {
      "followings": [
        {
          "id": "1234"
        }
      ]
    };
    getMyFollowingsResponse.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responseJson
    );
    instance.getMyFollowingsId = getMyFollowingsResponse.messageId;
    runEngine.sendMessage("Unit Test", getMyFollowingsResponse);

      const getMyFollowingsResponse1 = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
      );
      getMyFollowingsResponse1.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          getMyFollowingsResponse1.messageId
      );
      const responseJson1 = {
        "errors":{}
      };
      getMyFollowingsResponse1.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          responseJson1
      );
      instance.getMyFollowingsId = getMyFollowingsResponse1.messageId;
      runEngine.sendMessage("Unit Test", getMyFollowingsResponse1);
      
    });
    then('Fetch explore api gets called', () => {
      const trendingResponse = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
      );
      trendingResponse.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          trendingResponse.messageId
      );
      const responseJson = {
        "account": [
          {
            "id": "1"
          }
        ]
      };
      trendingResponse.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          responseJson
      );
      instance.fetchMoreExploreApiId = trendingResponse.messageId;
      runEngine.sendMessage("Unit Test", trendingResponse);
    });
    then('Request api user called', () => {
      const followUserApiResponse = new Message(getName(MessageEnum.RestAPIResponceMessage))
      followUserApiResponse.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUserApiResponse);
      followUserApiResponse.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                  "followers": [
                    {
                      "id": "1"
                    }
                  ]
                 }
      );
      followUserApiResponse.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUserApiResponse.messageId);
      instance.followUserApiId = followUserApiResponse.messageId
      runEngine.sendMessage("Unit Test", followUserApiResponse);

      const testCases = [
        {
          item: { id: '1234', account_status: 'Private', account_follow_status: 'Follow' , photo:"123.png",account_id:"1234"},
          followCalled: true,
        },
        {
          item: { id: '1234', account_status: 'Private', account_follow_status: 'Requested',bio:'bio' },
          cancelRequestCalled: true,
        },
        {
          item: { id: '1234', account_status: 'Public', account_follow_status: 'Unfollow' },
          unfollowCalled: true,
        },
        {
          item: { id: '5678', account_status: 'Public', account_follow_status: 'Unfollow' },
          followCalled: true,
        },
      ];

      let renderedItem = instance.renderItem({item:testCases[0].item,index:0});
      const buttonComponentA = shallow(renderedItem).findWhere(node => node.prop('testID') === 'followStatusBtn')
      buttonComponentA.simulate('press');
      
      const trendingResponse = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
      );
      trendingResponse.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          trendingResponse.messageId
      );
      const responseJson = {
        "data": [
          {
            "id": "1"
          }
        ]
      };
      trendingResponse.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          responseJson
      );
      instance.requestUserApiId = trendingResponse.messageId;
      runEngine.sendMessage("Unit Test", trendingResponse);

      const cancelRequsrApiResponse = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
    );
    cancelRequsrApiResponse.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        cancelRequsrApiResponse.messageId
    );
    const responseJson1 = {
      "data": [
        {
          "id": "1"
        }
      ]
    };
    cancelRequsrApiResponse.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responseJson
    );
    instance.cancelRequestApiId = cancelRequsrApiResponse.messageId;
    runEngine.sendMessage("Unit Test", cancelRequsrApiResponse);
    });
    then("I can display list header", () => {
      const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msgPlayloadAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "USER-TOKEN");
      msgPlayloadAPI.addData(getName(MessageEnum.FollowersDataMessage), {  isScreenFrom: "login"  });
      runEngine.sendMessage("Unit Test", msgPlayloadAPI)
      // let searchBar = exploreFlatListRenderWraper.findWhere(
      //   (node: any) => node.prop("testID") === "searchBarTest"
      // );
      // expect(searchBar).toBeTruthy();
      // expect(searchBar).toBeValid;

      // fivth api
      const unFollowingSuggestionCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      unFollowingSuggestionCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        unFollowingSuggestionCallId.messageId
      );
      unFollowingSuggestionCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}]
        }
      );

      //error
      const unFollowingSuggestionErrorCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      unFollowingSuggestionErrorCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        unFollowingSuggestionErrorCallId.messageId
      );
      unFollowingSuggestionErrorCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}]
        }
      );

      const addFollowerFromFollowingId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addFollowerFromFollowingId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addFollowerFromFollowingId.messageId
      );
      addFollowerFromFollowingId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}]
        }
      );
      // instance.addFollowerFromFollowingCallId = addFollowerFromFollowingId.messageId;
      // runEngine.sendMessage("Unit Test", addFollowerFromFollowingId);

      //error
      const addFollowerFromFollowingErrorId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addFollowerFromFollowingErrorId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addFollowerFromFollowingErrorId.messageId
      );
      addFollowerFromFollowingErrorId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}]
        }
      );
      })
  test("Followings type on Followers", ({ given, when, then }) => {
    let exampleBlockB: ShallowWrapper;
    let instance: Followers;
    let flatListRenderWraper: ShallowWrapper;
    let itemObj: any;

    given("I am a User with Followings state", () => {
      exampleBlockB = shallow(<Followers {...screenProps2} />);
    });

    when("I navigate to the Followers", () => {
      instance = exampleBlockB.instance() as Followers;
       const trendingResponse = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
      );
      trendingResponse.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          trendingResponse.messageId
      );
      const responseJson = {
        "data": [
          {
            "id": "1"
          }
        ]
      };
      trendingResponse.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          responseJson
      );
      instance.requestUserApiId = trendingResponse.messageId;
      runEngine.sendMessage("Unit Test", trendingResponse);
    });
    then("I can click ownerbutton unfollow", () => {
      const touchableOpacity = exampleBlockB.findWhere(node => node.prop('testID') === 'clickPrivacy');
      touchableOpacity.simulate('press');
      instance.setState({
        owner: true
      });

      const addFollwingListData = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addFollwingListData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addFollwingListData.messageId
      );

      instance.searchFilterFunction("test");
      instance.searchFilterFunction("");

      expect(exampleBlockB).toBeTruthy();

    });
  });

  test("Followers type on Followers", ({ given, when, then }) => {
    let exampleBlockC: ShallowWrapper;
    let instance: Followers;
    let flatListRenderWraper: ShallowWrapper;
    let itemObj: any;

    given("I am a User with Followers state", () => {
      exampleBlockC = shallow(<Followers {...screenProps3} />);
    });

    when("I navigate to the Followers", () => {
      instance = exampleBlockC.instance() as Followers;
      instance.forceUpdate();

      const fetchExplore = new Message(getName(MessageEnum.RestAPIResponceMessage))
      fetchExplore.addData(getName(MessageEnum.RestAPIResponceDataMessage), fetchExplore);
      fetchExplore.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
      );
      fetchExplore.addData(getName(MessageEnum.RestAPIResponceDataMessage), fetchExplore.messageId);
      instance.fetchExploreApiId = fetchExplore.messageId
      runEngine.sendMessage("Unit Test", fetchExplore);

      const fetchExplore2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
      fetchExplore.addData(getName(MessageEnum.RestAPIResponceDataMessage), fetchExplore);
      fetchExplore.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors: { } }
      );
      fetchExplore.addData(getName(MessageEnum.RestAPIResponceDataMessage), fetchExplore.messageId);
      instance.fetchExploreApiId = fetchExplore.messageId
      runEngine.sendMessage("Unit Test", fetchExplore);


      const searchFilterFunction = new Message(getName(MessageEnum.RestAPIResponceMessage))
      searchFilterFunction.addData(getName(MessageEnum.RestAPIResponceDataMessage), searchFilterFunction);
      searchFilterFunction.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {followers:[{id:"1"},{id:"2"}] }
      );
      searchFilterFunction.addData(getName(MessageEnum.RestAPIResponceDataMessage), searchFilterFunction.messageId);
      instance.searchFollowersApiId = searchFilterFunction.messageId
      runEngine.sendMessage("Unit Test", searchFilterFunction);

      const searchFilterFunction2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
      searchFilterFunction.addData(getName(MessageEnum.RestAPIResponceDataMessage), searchFilterFunction);
      searchFilterFunction.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { errors:{} }
      );
      searchFilterFunction.addData(getName(MessageEnum.RestAPIResponceDataMessage), searchFilterFunction.messageId);
      instance.searchFollowersApiId = searchFilterFunction.messageId
      runEngine.sendMessage("Unit Test", searchFilterFunction);


      const searchFilterFunction3 = new Message(getName(MessageEnum.RestAPIResponceMessage))
      searchFilterFunction.addData(getName(MessageEnum.RestAPIResponceDataMessage), searchFilterFunction);
      searchFilterFunction.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                { }
      );
      searchFilterFunction.addData(getName(MessageEnum.RestAPIResponceDataMessage), searchFilterFunction.messageId);
      instance.searchExploreApiId = searchFilterFunction.messageId
      runEngine.sendMessage("Unit Test", searchFilterFunction);


      const searchFilterFunction4 = new Message(getName(MessageEnum.RestAPIResponceMessage))
      searchFilterFunction.addData(getName(MessageEnum.RestAPIResponceDataMessage), searchFilterFunction);
      searchFilterFunction.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {followings:[{id:1},{id:2}] }
      );
      searchFilterFunction.addData(getName(MessageEnum.RestAPIResponceDataMessage), searchFilterFunction.messageId);
      instance.searchFollowingsId = searchFilterFunction.messageId
      runEngine.sendMessage("Unit Test", searchFilterFunction);

      const searchFilterFunction5 = new Message(getName(MessageEnum.RestAPIResponceMessage))
      searchFilterFunction.addData(getName(MessageEnum.RestAPIResponceDataMessage), searchFilterFunction);
      searchFilterFunction.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
      { errors: { } }
      );
      searchFilterFunction.addData(getName(MessageEnum.RestAPIResponceDataMessage), searchFilterFunction.messageId);
      instance.searchFollowingsId = searchFilterFunction.messageId
      runEngine.sendMessage("Unit Test", searchFilterFunction);

    });
    then("I can display followers flatlist", () => {
      const followUserApiResponse = new Message(getName(MessageEnum.RestAPIResponceMessage))
      followUserApiResponse.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUserApiResponse);
      followUserApiResponse.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                  "data": [
                    {
                      "id": "1"
                    }
                  ]
                 }
      );
      followUserApiResponse.addData(getName(MessageEnum.RestAPIResponceDataMessage), followUserApiResponse.messageId);
      instance.followUserApiId = followUserApiResponse.messageId
      runEngine.sendMessage("Unit Test", followUserApiResponse);

      
      const testCases = [
        {
          item: { id: '1234', account_status: 'Private', account_follow_status: 'Follow' , photo:"123.png",account_id:"1234"},
          followCalled: true,
        },
        {
          item: { id: '1234', account_status: 'Private', account_follow_status: 'Requested',bio:'bio' },
          cancelRequestCalled: true,
        },
        {
          item: { id: '1234', account_status: 'Public', account_follow_status: 'Unfollow' },
          unfollowCalled: true,
        },
        {
          item: { id: '5678', account_status: 'Public', account_follow_status: 'Unfollow' },
          followCalled: true,
        },
      ];

      let renderedItem = instance.renderItem({item:testCases[0].item,index:0});
      const buttonComponentA = shallow(renderedItem).findWhere(node => node.prop('testID') === 'followStatusBtn')
      buttonComponentA.simulate('press');
      // expect(followUserMock).toHaveBeenCalled();
      let renderedItem1 = instance.renderItem({item:testCases[1].item,index:0});
      const buttonComponentA1 = shallow(renderedItem1).findWhere(node => node.prop('testID') === 'followStatusBtn')
      buttonComponentA.simulate('press');

      const { followers } = instance.state;

      itemObj = {
        item: { ...followers[0], account_id: "11" } || [],
        index: 0
      };


      const addFolloerListErrorData = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addFolloerListErrorData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addFolloerListErrorData.messageId
      );
      addFolloerListErrorData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}]
        }
      );
    });

    then('I can see more data by scrolling followers list', () => {
      const list = exampleBlockC.findWhere((node) => node.prop('testID') === 'flatListNotSignUp');
      list.findWhere((node) => node.prop('testID') === 'flatListNotSignUp').props().refreshControl.props.onRefresh();
      const followerListApiFail = apiCall({});
      instance.getFollowersId = followerListApiFail.messageId;
      runEngine.sendMessage("Unit Test", followerListApiFail);
      const responseJson = {
        "followers": Array.from({length : 20},(_:any,index:number)=>({id:`${index+1}`}))
      };
      const followerListApi = apiCall(responseJson);
      instance.getFollowersId = followerListApi.messageId;
      runEngine.sendMessage("Unit Test", followerListApi);
      const followerList = exampleBlockC.findWhere((node) => node.prop('testID') === 'flatListNotSignUp');
      expect(followerList.prop("data").length).toBe(20);
      followerList.renderProp('onEndReached')();
      const nextFollowerList = apiCall(responseJson);
      instance.getFollowersId = nextFollowerList.messageId;
      runEngine.sendMessage("Unit Test", nextFollowerList);
      const emptyList = apiCall({"followers":[]});
      instance.getFollowersId = emptyList.messageId;
      runEngine.sendMessage("Unit Test", emptyList);
      const newfollowersFlatList = exampleBlockC.findWhere((node) => node.prop('testID') === 'flatListNotSignUp');
      expect(newfollowersFlatList.prop("data").length).toBe(40);

      const searchBar = exampleBlockC.findWhere((node) => node.prop('testID') === 'searchBar');
      searchBar.simulate("changeText", "user");
      const searchApiFail = apiCall({});
      instance.searchFollowersApiId = searchApiFail.messageId;
      runEngine.sendMessage("Unit Test", searchApiFail);
      const searchApi = apiCall(responseJson);
      instance.searchFollowersApiId = searchApi.messageId;
      runEngine.sendMessage("Unit Test", searchApi);
      const followingSearchList = exampleBlockC.findWhere((node) => node.prop('testID') === 'flatListNotSignUp');
      expect(followingSearchList.prop("data").length).toBe(20);
      followingSearchList.renderProp('onEndReached')();
      const searchApi2 = apiCall(responseJson);
      instance.searchFollowersApiId = searchApi2.messageId;
      runEngine.sendMessage("Unit Test", searchApi2);
      const followerSearchMoreList = exampleBlockC.findWhere((node) => node.prop('testID') === 'flatListNotSignUp');
      expect(followerSearchMoreList.prop("data").length).toBe(40);
    })

    then('I can enter text without errors', () => {
      const touchableOpacity = exampleBlockC.findWhere(node => node.prop('testID') === 'clickPrivacy');
      touchableOpacity.simulate('press');
      const exampleBlock4 = shallow(<Followers {...screenProps} />);
      let instance = exampleBlock4.instance() as Followers;
      let list = exampleBlock4.findWhere((node) => node.prop('testID') === 'flatListSignUp');
      list.renderProp('renderItem')({item:{id: '1234', account_status: 'Private', account_follow_status: 'Follow'},index:0});
      list.renderProp('keyExtractor')({item:{id:0}})
      list.renderProp('onEndReached')()
            let searchFollow = exampleBlock4.findWhere((node) => node.prop('testID') === "searchBar");
            searchFollow.simulate("changeText", "");
            searchFollow.simulate("changeText", "awdad");
      instance.doButtonPressed()
    });

    then('I can leave the screen without errors', () => {
      instance.componentWillUnmount();
    });
  });

});
})
