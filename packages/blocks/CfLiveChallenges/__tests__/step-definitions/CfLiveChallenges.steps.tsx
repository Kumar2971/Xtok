import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import { View } from "react-native";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CfLiveChallenges, { JoinedUserTimer, ManageExchangeCoins, ManageTimer, MemoizedBottomBar, MemoizedCommentsView, OnCoinsExchanged } from "../../src/CfLiveChallenges";
import { ParticipantMode } from "../../../LiveStreaming/src/Types";

const sendReportApiResponse: any = { data: {} };

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
  },
  id: "CfLiveChallenges",
  route:{
    params:{
      token:'asdasd',
      isChallengeCreated:true,
      participantId:12,
      meetingId:'qwd-aww-aaa',
      liveChallengeId:312,
      EventId:12,
      viewer:'VIEWER',
      ValidateMeeting:{},
      statusId:1,
      duration:15
    }
  },
};

const feature = loadFeature(
  "./__tests__/features/CfLiveChallenges-scenario.feature"
);


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();
  });

  test("User navigates to CfLiveChallenges", ({ given, when, then }) => {
    let cfLiveChallengesBlock: ShallowWrapper;
    let instance: CfLiveChallenges;
    let manageTimer:ShallowWrapper;
    let joinedUserTimer:ShallowWrapper;
    let onCoinsExchanged:ShallowWrapper;
    let manageExchangeCoins:ShallowWrapper;
    let bottomBar:ShallowWrapper;
    let localizedBottomBar:ShallowWrapper;
    let commentsView:ShallowWrapper;
    let localizedCommentsView:ShallowWrapper;
    let itemObj: any;

    given("I am a User loading CfLiveChallenges", () => {
      cfLiveChallengesBlock = shallow(<CfLiveChallenges {...screenProps} />);
      manageTimer = shallow(<ManageTimer liveId={12} minutes={3} seconds={1}  />);
      joinedUserTimer = shallow(<JoinedUserTimer liveId={12}/>);
      onCoinsExchanged = shallow(<OnCoinsExchanged liveId={12} getOverallData={()=> {}} />);
      manageExchangeCoins = shallow(<ManageExchangeCoins liveId={12} coins={12} team={"team_1"} coinsSent={()=>{}}/>);
      bottomBar = shallow(<MemoizedBottomBar loggeduserImage={''} language={'en'} openGiftModal={()=> {}} giftImageUrl={''} giftBtnAction={()=> {}} chatTopic={'live'} setComments={()=> {}} modeTypes={ParticipantMode.CONFERENCE} setLottieAnimation={()=> {}} loggedUserId={12} />)
      localizedBottomBar = shallow(<MemoizedBottomBar loggeduserImage={'kasn.png'} language={'ar'} openGiftModal={()=> {}} giftImageUrl={''} giftBtnAction={()=> {}} chatTopic={'live'} setComments={()=> {}} modeTypes={ParticipantMode.VIEWER} setLottieAnimation={()=> {}} loggedUserId={12} />)
      commentsView = shallow(<MemoizedCommentsView chatTopic={'live'}
        loggeduserImage={''}
        language={'en'}
        openGiftModal={()=>{}}
        giftBtnAction={()=>{}}
        giftImageUrl={''}
        navigation={''}
        modeTypes={ParticipantMode.CONFERENCE}
        setLottieAnimation={()=>{}}
        loggedUserId={12} />)
        localizedCommentsView = shallow(<MemoizedCommentsView chatTopic={'live'}
        loggeduserImage={'kaen.png'}
        language={'ar'}
        openGiftModal={()=>{}}
        giftBtnAction={()=>{}}
        giftImageUrl={'kaen.png'}
        navigation={''}
        modeTypes={ParticipantMode.VIEWER}
        setLottieAnimation={()=>{}}
        loggedUserId={12} />)
    });

    when("I navigate to the CfLiveChallenges", () => {
      instance = cfLiveChallengesBlock.instance() as CfLiveChallenges;
      instance.setState({isTimerStarted:true, gitfmodel: true });
      instance.categoriesApiCallId = "11";
      instance.catalogueApiCallId = "12";
      instance.livedetailApiCallId = "13";
      instance.overallliveApiCallId = "14";
      instance.updatescoreApiCallId = "15";
      instance.updatelivescoreApiCallId = "16";
      instance.getCoinBalanceApiCallId = "17";
      instance.getCommentsCallId = "18";
      instance.deleteCommentsCallId = "19";
      instance.sendCommentsApiCallId = "20";
      instance.endLivewatchingApiCallId = "21";
      instance.inviteParticipantLiveChallengeID = "22";
      instance.defaultCatalogueApiCallId = "23";
      instance.loggeduserdetailsApiCallId = "24";
    });

    then("CfLiveChallenges will load with out errors", () => {
      //send report apicall
      const livedetailApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      livedetailApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        livedetailApiCallId.messageId
      );
      livedetailApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(sendReportApiResponse))
      );
      instance.livedetailApiCallId = livedetailApiCallId.messageId;
      runEngine.sendMessage("Unit Test", livedetailApiCallId);

      const AccountLoginSuccessMessage = new Message(
        getName(MessageEnum.AccoutLoginSuccess)
      );
      AccountLoginSuccessMessage.addData(
        getName(MessageEnum.AuthTokenDataMessage),
        "Test Token"
      );
      runEngine.sendMessage("Unit Test", AccountLoginSuccessMessage);

      instance.getliveDetails();

      itemObj = {
        item: {
          message:{
            type:'live_comment',
            senderId:12,
            userImage:null,
            comment:'asdasdd',
            imageUrl:'kasn.png'
          }
        },
        index: 0
      };
      expect(cfLiveChallengesBlock).toBeTruthy();
    });
    then("I can send messages properly", () => {
      const RestApiRespMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      RestApiRespMessage.addData(getName(MessageEnum.RestAPIResponceMessage), {
        data: [
          {
            headings: "headingString",
            contents: "content",
            created_at: 2452662,
            id: getName(MessageEnum.RestAPIResponceMessage)
          }
        ]
      });
      runEngine.sendMessage("Unit Test", RestApiRespMessage);
      const ApiRequestCallIDTEST = new Message(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      runEngine.sendMessage("Unit Test", ApiRequestCallIDTEST);
      instance.handleApiRequest("11", { errors: "testerror" }, "Test error");
      instance.handleApiRequest("11", { data: [{ id: "12" }] }, "Test error");
      instance.handleApiRequest("12", { errors: "testerror" }, "Test error");
      instance.handleApiRequest("12", { data: [{ id: "12" }] }, "Test error");
      instance.handleApiRequest("13", { errors: "testerror" }, "Test error");
      instance.handleApiRequest("14", { errors: "testerror" }, "Test error");
      instance.handleApiRequest(
        "14",
        {
          data: {
            team1: [{ id: "12" }],
            team2: [{ id: "13" }],
            team1_overall_score: "1",
            team2_overall_score: "2",
            team1_score: "3",
            team2_score: "4"
          }
        },
        "Test error"
      );
      instance.handleApiRequest("15", { errors: "testerror" }, "Test error");
      instance.handleApiRequest("15", { data: [{ id: "12" }] }, "Test error");
      instance.handleApiRequest("16", { errors: "testerror" }, "Test error");
      instance.handleApiRequest("16", { data: [{ id: "12" }] }, "Test error");
      instance.handleApiRequest("17", { errors: "testerror" }, "Test error");
      instance.handleApiRequest("17", { data: [{ id: "12" }] }, "Test error");
      instance.handleApiRequest("18", { data: [{ id: "12" }] }, "Test error");
      instance.handleApiRequest("18", { errors: "testerror" }, "Test error");
      instance.handleApiRequest("19", { data: [{ id: "12" }] }, "Test error");
      instance.handleApiRequest("19", { errors: "testerror" }, "Test error");
      instance.handleApiRequest("20", { data: [{ id: "12" }] }, "Test error");
      instance.handleApiRequest("20", { errors: "testerror" }, "Test error");
      instance.handleApiRequest("21", { data: [{ id: "12" }] }, "Test error");
      instance.handleApiRequest("21", { errors: "testerror" }, "Test error");
      instance.handleApiRequest("22", { data: [{ id: "12" }] }, "Test error");
      instance.handleApiRequest("22", { errors: "testerror" }, "Test error");
      instance.handleApiRequest("23", { data: [{ id: "12" }] }, "Test error");
      instance.handleApiRequest("23", { errors: "testerror" }, "Test error");
      instance.handleApiRequest("24", { data: [{ id: "12" }] }, "Test error");
      instance.handleApiRequest("24", { errors: "testerror" }, "Test error");
      instance.renderCatalogue({item:{attributes:{image:{url:'',json:'',type:''},coins:12,id:''}}})
      instance.doButtonPressed();
      instance.setEnableField();
      instance.gotoNextTab("2");
      instance.selectCatalogue("12");
      instance.closeModal();
      instance.sendCoin();
    });

    then("I can display participants list", () => {
      const { DATA } = instance.state;
      itemObj = {
        item:{
          message:{
            type:'live_comment',
            senderId:12,
            userImage:null,
            comment:'asdasdd',
            imageUrl:'kasn.png'
          }
        },
        index: 0
      };
      let newItem = {
        item:{
          message:{
            type:'',
            senderId:12,
            userImage:null,
            comment:'asdasdd',
            imageUrl:''
          }
        },
        index: 0
      };

      let layoutView = cfLiveChallengesBlock.findWhere(
        (node) => node.prop("testID") === "layoutView"
      );
      layoutView.simulate('layout',{nativeEvent:{layout:{height:300}}})

      instance.sticker({item:{id:12}})

      let partiFlatList = commentsView.findWhere(
        (node) => node.prop("testID") === "ParticipantFlatListTest"
      );
      partiFlatList.props().renderItem(itemObj);
      partiFlatList.props().keyExtractor({id:"1"});
      instance.onCoinsSent();
      instance.onCoinsExchanges(12,'team1');
      instance.onCoinsExchanges(12,'team2');
      let partiFlatList2 = localizedCommentsView.findWhere(
        (node) => node.prop("testID") === "ParticipantFlatListTest"
      );
      partiFlatList2.props().renderItem(newItem);
      instance.setState({recentsearch:true,coinsSent:true,defaultCatalogue:{attributes:{coins:12,image:{url:''}}}},()=>{
        instance.giftCommentsAction();
      })
      partiFlatList2.props().keyExtractor({id:"1"});
    });
    then("I can display teams list", () => {
      const { team1 } = instance.state;
      itemObj = {
        item: team1[0] || [],
        index: 0
      };

      instance.renderParticipants({item:{name:'as',photo:'as.png'}});
      instance.renderInviteButton({item:{id:12311}})
      instance.renderInviteButton({item:{id:12311,isInvited:true}})
      instance.setState({searchresult:['',''],participantsData:[{id:12,item:{name:'as',photo:'as.png'}},{id:11,item:{name:'as',photo:'as.png'}},{id:13,item:{name:'as'}},],participantModel:true})
      instance.renderSearchResult();
      instance.participantsModel();
      
      let crossButton = cfLiveChallengesBlock.findWhere((node)=> node.prop("testID") === "crossButton")
      crossButton.simulate('press')
      let addParticipant = cfLiveChallengesBlock.findWhere((node)=> node.prop("testID") === "addParticipant")
      addParticipant.simulate('press')
      

      let participantFlat = cfLiveChallengesBlock.findWhere((node)=> node.prop("testID") === "partFlarlist")
      participantFlat.props().renderItem({item:
        {photo:'',full_name:'as',user_name:'as',isInvited:true}})
        participantFlat.props().keyExtractor(()=> {id:"1"})
        participantFlat.props().ListEmptyComponent(()=> <></>)
      let searchFlatlist = cfLiveChallengesBlock.findWhere((node)=> node.prop("testID") === "renderSearchFlatlist")
      searchFlatlist.props().renderItem({item:
        {photo:'',full_name:'as',user_name:'as',isInvited:true}})
      searchFlatlist.props().keyExtractor(()=> {id:"1"})
      instance.setSelectedTab(1);
    });
    then("I can display second teams list", () => {
      const { team2 } = instance.state;
      itemObj = {
        item: team2[0] || [],
        index: 0
      };
    });
    then("I can display categories list", () => {
      const { categories } = instance.state;
      itemObj = {
        item: categories[0] || [],
        index: 0
      };
      let partiFlatList = cfLiveChallengesBlock.findWhere(
        (node) => node.prop("testID") === "CategoriesFlatListTest"
      );
      partiFlatList.props().renderItem(itemObj);
      partiFlatList.props().keyExtractor(()=> {"1"});
    });
    then("I can display category list", () => {
      const { catalogue } = instance.state;
      itemObj = {
        item: catalogue[0] || [],
        index: 0
      };
      let partiFlatList = cfLiveChallengesBlock.findWhere(
        (node) => node.prop("testID") === "CategoryFlatListTest"
      );
      partiFlatList.props().renderItem(itemObj);
      instance.createMeeting();
      instance.statusleave();
      partiFlatList.props().keyExtractor("1");
    });

    then("I can select the button with with out errors", () => {
     let searchBar = cfLiveChallengesBlock.findWhere((node)=> node.prop("testID") === "searchId")
     searchBar.simulate("changeText", "Your description here.");
     instance.statusjoin();

    instance.setState({language:"ar",recentsearch:false})
    let searchFlatlist = cfLiveChallengesBlock.findWhere((node)=> node.prop("testID") === "serachFlatlist")
    searchFlatlist.props().renderItem({item:{photo:'',full_name:'as',user_name:'as',isInvited:true}})
    searchFlatlist.props().keyExtractor({id:"1"})

      let txtInputComponent = bottomBar.findWhere(
        node => node.prop("testID") === "AddCommentInput"
      );
      instance.navigateToLivePageparticipants();
      txtInputComponent.simulate("changeText", "");
      instance.navigateToLivePage();
      instance.setState({isExploreClicked:true});
      txtInputComponent.simulate("changeText", "Your description here.");
      let sendButton = bottomBar.findWhere(
        (node) => node.prop("testID") === "sendMessageButton"
      );
      sendButton.simulate("press");

      let txtInputComponent2 = localizedBottomBar.findWhere(
        node => node.prop("testID") === "AddCommentInput"
      );
      instance.navigateToLivePageparticipants();
      txtInputComponent2.simulate("changeText", "");
      instance.navigateToLivePage();
      txtInputComponent2.simulate("changeText", "Your description here.");
      let sendButton2 = localizedBottomBar.findWhere(
        (node) => node.prop("testID") === "sendMessageButton"
      );

      sendButton2.simulate("press");


      let buttonComponent = cfLiveChallengesBlock.findWhere(
        (node) => node.prop("testID") === "testButton"
      );
      instance.startLiveStreamFunction({meetingId:'',streamKey:'',streamUrl:''})
      buttonComponent.simulate("press");
    });
    then("I can select the second button with with out errors", () => {
      let buttonComponent = cfLiveChallengesBlock.findWhere(
        (node) => node.prop("testID") === "testButton2"
      );
      instance.onNewParticipantJoined();
      instance.closeInvitationModal();
      // buttonComponent.simulate("press");
    });
    then("I can select the third button with with out errors", () => {

      let buttonComponent = cfLiveChallengesBlock.findWhere(
        (node) => node.prop("testID") === "testButton3"
      );
      instance.playLottieAnimation(true,'','','',10,10)
      instance.openGiftModal();
      instance.setNewTime(5,0);
      instance.setTimer();
      instance.endLiveChallenge();
      instance.validateMeeting({name:'test',micOn:true,videoOn:true,meetingId:'214'})
      expect(buttonComponent).toBeTruthy();

      
    });
    then("I can select the fourth button with with out errors", () => {
      instance.stream();
      let buttonComponent = cfLiveChallengesBlock.findWhere(
        (node) => node.prop("testID") === "testButton4"
      );
      instance.setState({statusId:1})
      instance.getIfUserInviteValid(1);
      instance.setState({statusId:2})
      instance.getIfUserInviteValid(1);
      instance.setState({statusId:3})
      instance.getIfUserInviteValid(1);
      instance.setState({statusId:0})
      instance.getIfUserInviteValid(1);
      expect(buttonComponent).toBeTruthy();
      let buttonComponentSeven = cfLiveChallengesBlock.findWhere(
        (node) => node.prop("testID") === "testButton7"
      );
      expect(buttonComponent).toBeTruthy();

      buttonComponentSeven.simulate("press");
      instance.setState({selectedCatalogue:{attributes:{coins:12}}})
      let exploreButton = cfLiveChallengesBlock.findWhere(
        (node) => node.prop("testID") === "exploreButton"
      );
      instance.onSuccessCreateMeeting({data:{data:{attributes:{roomId:'as-as-as'},id:12}}})
      instance.onSuccessJoinMeeting({data:{disabled:true,id:'sa',roomId:'as-as-as'}})
      instance.handleParticipantInvitation();
      exploreButton.simulate("press");
    });
    then("I can select the fifth button with with out errors", () => {
      let buttonComponent = cfLiveChallengesBlock.findWhere(
        (node) => node.prop("testID") === "testButton5"
      );
      instance.stopLiveStreamFunction('12')
      instance.inviteParticipantToLiveChallenge('12')
      expect(buttonComponent).toBeTruthy();
      
    });
    then("I can select the sixth button with with out errors", () => {
      let buttonComponent = cfLiveChallengesBlock.findWhere(
        (node) => node.prop("testID") === "testButton5"
      );
      instance.onPress();
      instance.deleteComments(1)
      instance.sendComments();
      instance.sendCoin();
      expect(buttonComponent).toBeTruthy();
      let buttonComponentSix = cfLiveChallengesBlock.findWhere(
        (node) => node.prop("testID") === "testButton6"
      );
      buttonComponentSix.simulate('press')
      instance.fetchSession('1');
      let sendButton2 = cfLiveChallengesBlock.findWhere(
        (node) => node.prop("testID") === "sendButton2"
      );
      sendButton2.simulate('press')
      instance.endChallenge();
      instance.stopRecordingFunction('1');
      instance.startRecordingFunction(`1`)
      instance.setAllViewersCount(12)
      instance.handleBackButtonClick();
      expect(buttonComponentSix).toBeTruthy();
      
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(cfLiveChallengesBlock).toBeTruthy();
    });
  });
});
