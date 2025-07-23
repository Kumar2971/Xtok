import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import React from "react";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import MuteViews from "../../src/MuteViews";
import * as utils from "../../../../framework/src/Utilities";
import { CommentSettingsModel,Scorebar,SettingsModal,SettingsViewModal } from "../../src/CombinedLiveStream";


const screenProps = {
    navigation: {
        goBack: jest.fn(),
        navigate: jest.fn(),
        addListener: jest.fn((key: string, callback: () => void) => {
            callback();
        }),
    },
    isMuteDurationModalVisible: true,
    commentSetting: true,
    stage_id: "asd",
    addMuteModal:true,
    isMutedAccountsModalVisible:true,
    invitedIds:[{ userId: 0, apiId: "asd" }],
    selectedGridId: 0,
    onCloseDuration: jest.fn(),
    onClose:jest.fn(),
    onCloseMuted:jest.fn(),
    onCloseMutedModal:jest.fn(),
    onCloseAddMuteModal:jest.fn(),
    onMuteSelected:jest.fn(),
    onSelectMute: jest.fn(),
    handelMuteUmute:jest.fn(),
    onGetMutedAccounts:jest.fn(),
    isHost: true
};

const newScreenProps = {
    navigation: {
        goBack: jest.fn(),
        navigate: jest.fn(),
        addListener: jest.fn((key: string, callback: () => void) => {
            callback();
        }),
    },
    isMuteDurationModalVisible: true,
    commentSetting: false,
    stage_id: "asd",
    addMuteModal:true,
    isMutedAccountsModalVisible:true,
    invitedIds:[{ userId: 0, apiId: "asd" }],
    selectedGridId: 0,
    onCloseDuration: jest.fn(),
    onClose:jest.fn(),
    onCloseMuted:jest.fn(),
    onCloseMutedModal:jest.fn(),
    onCloseAddMuteModal:jest.fn(),
    onMuteSelected:jest.fn(),
    onSelectMute: jest.fn(),
    handelMuteUmute:jest.fn(),
    onGetMutedAccounts:jest.fn(),
    isHost: false
};

const MuteViewsFeature = loadFeature(
  "./__tests__/features/MuteViews-scenario.feature"
);

const mockgetStorageData = jest.spyOn(utils, "getStorageData")

defineFeature(MuteViewsFeature, (test) => {
  jest.useFakeTimers();
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(global, 'setTimeout').mockImplementation((cb:any) => cb() );
    jest.spyOn(global, 'setInterval').mockImplementation((cb:any) => cb() );
    mockgetStorageData.mockImplementation((key) => {
      if("SelectedLng" === key) return Promise.resolve("ar")
      else return Promise.resolve("766")
    })
  });

  test("User navigates to MuteViews", ({ given, when, then }) => {
    let muteViewsBlock: ShallowWrapper;
    let muteViewsInstance: MuteViews;
   
    given("I am a User loading MuteViews", () => {
        muteViewsBlock = shallow(<MuteViews {...screenProps} />);
        muteViewsInstance = muteViewsBlock.instance() as MuteViews;
    });

    when("I navigate to the MuteViews", () => {

        const getMuteccountViwerslistid = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          getMuteccountViwerslistid.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            getMuteccountViwerslistid.messageId
          );
          getMuteccountViwerslistid.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            {data:[{
              id:1,
              isInvited:true,
              invite_status:"invited",
              live_status:"LIVE",
              attributes:{
                is_stage_muted:true,
                user_id:0,
                account:{
                  photo:"as",
                  user_name:"As",
                  bio:"As"
                }
              }
            }]}
          );
          muteViewsInstance.getMuteccountViwerslistid = getMuteccountViwerslistid.messageId;
          runEngine.sendMessage("Unit Test", getMuteccountViwerslistid);
    
          getMuteccountViwerslistid.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            {error:'ss'}
          );
          runEngine.sendMessage("Unit Test", getMuteccountViwerslistid);

        let muteDurationFlatlist = muteViewsBlock.findWhere(
            (node) => node.prop("testID") === "muteDuration"
          );
          muteDurationFlatlist.props().keyExtractor({},3)

          const mutePostItem = muteDurationFlatlist.prop('renderItem')({item:{
            label:"whole live",
            value:1
          }})

          const shallowMutePostItem = shallow(mutePostItem)
          const radioInputId = shallowMutePostItem.findWhere((node)=> node.prop("testID") === "radioInputId")
          radioInputId.simulate('press')

          const radioLabelId = shallowMutePostItem.findWhere((node)=> node.prop("testID") === "radioLabelId")
          radioLabelId.simulate('press')
     
   });

   then("get all accounts list",()=> {

    let searchFlatlist3 = muteViewsBlock.findWhere(
        (node) => node.prop("testID") === "searchFlatlist3"
      );
      const mutePostItem = searchFlatlist3.prop('renderItem')({item:{
        id:1,
        isInvited:true,
        invite_status:"invited",
        live_status:"LIVE",
        is_stage_muted:true,
        attributes:{
          user_id:1,
          account:{
            photo:"as",
            user_name:"As",
            bio:"As"
          }
        }
      }})
      
      const mutePostRender = shallow(mutePostItem)
            const mutePost1 = mutePostRender.findWhere((node) => node.prop('testID') === 'mutePost1');
            mutePost1.simulate('press');
            searchFlatlist3.renderProp("ListEmptyComponent")();
      
      searchFlatlist3.prop('renderItem')({item:{
        id:1,
        isInvited:true,
        invite_status:"invited",
        live_status:"LIVE",
        attributes:{
          user_id:1,
          is_stage_muted:true,
          account:{
            photo:null,
            user_name:null,
            bio:null,
          }
        }
      }})
      
      searchFlatlist3.prop('renderItem')({item:{isLoader:false,isInvited:null,user_name:'Harry',account_follow_status:'Harry',account_status:'New',bio:'No',first_name:'Harry',id:0,last_name:'Harry',photo:'Harry',unique_auth_id:'Harry'}})
      searchFlatlist3.props().keyExtractor({}, 3);
      
      let searchFlatlist5 = muteViewsBlock.findWhere(
        (node) => node.prop("testID") === "searchFlatlist5"
      );

      searchFlatlist5.prop('renderItem')({item:{
        id:1,
        isInvited:true,
        invite_status:"invited",
        live_status:"LIVE",
        attributes:{
          user_id:1,
          is_stage_muted:false,
          account:{
            photo:null,
            user_name:null,
            bio:null,
          }
        }
      }})

      const flatlist5 = searchFlatlist5.prop('renderItem')({item:{
        id:1,
        isInvited:true,
        invite_status:"invited",
        live_status:"LIVE",
        attributes:{
          user_id:1,
          is_stage_muted:true,
          account:{
            photo:"as",
            user_name:"As",
            bio:"As"
          }
        }
      }})
      
      const flatlist5render = shallow(flatlist5)
       const MuteUnmuteButton3 = flatlist5render.findWhere((node) => node.prop('testID') === 'MuteUnmuteButton3');
       MuteUnmuteButton3.simulate('press');
      
      
      searchFlatlist5.prop('renderItem')({item:{
        id:1,
        isInvited:true,
        invite_status:"invited",
        live_status:"LIVE",
        attributes:{
          user_id:1,
          is_stage_muted:true,
          account:{
            photo:null,
            user_name:null,
            bio:null,
          }
        }
      }})

      searchFlatlist5.props().keyExtractor({}, 3);
   })

   then("get Muted Account list api gets called",()=> {
    const getMutedAccountlistid = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getMutedAccountlistid.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getMutedAccountlistid.messageId
      );
      getMutedAccountlistid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:[{attributes:{is_entirelive_mute:true,account:{id:1,}}},
          {attributes:{is_entirelive_mute:false,account:{id:1,}}},{},
          {attributes:{is_entirelive_mute:false,account:null}}]}
      );
      muteViewsInstance.getMutedAccountlistid = getMutedAccountlistid.messageId;
      runEngine.sendMessage("Unit Test", getMutedAccountlistid);

      getMutedAccountlistid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", getMutedAccountlistid);

      const muteAccountPostId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      muteAccountPostId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        muteAccountPostId.messageId
      );
      muteViewsInstance.muteAccountPostId = muteAccountPostId.messageId;

      muteAccountPostId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", muteAccountPostId);


      muteAccountPostId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{account_id:1,duration:5,attributes:{is_entirelive_mute:true,duration:10,account:{id:0}}},meta:{message:"User muted."}}
      );
      muteViewsInstance.muteAccountPostId = muteAccountPostId.messageId;
      runEngine.sendMessage("Unit Test", muteAccountPostId);

      muteAccountPostId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{id:0,account_id:1},meta:{message:"User Unmuted."}}
      );
      muteViewsInstance.muteAccountPostId = muteAccountPostId.messageId;
      muteViewsInstance.mutedAccountIds = [1]
      runEngine.sendMessage("Unit Test", muteAccountPostId);

      let closeMuteModal2 = muteViewsBlock.findWhere(
        (node) => node.prop("testID") === "closeMuteModal2"
      );
      closeMuteModal2.simulate('press')

      const isMuteDurationModalVisible = muteViewsBlock.findWhere((node)=> node.prop("testID") === "isMuteDurationModalVisible")
      isMuteDurationModalVisible.simulate('press')

      const isMutedAccountsModalVisible = muteViewsBlock.findWhere((node)=> node.prop("testID") === "isMutedAccountsModalVisible")
      isMutedAccountsModalVisible.simulate('press')

      const closeModalMuted2 = muteViewsBlock.findWhere((node)=> node.prop("testID") === "closeModalMuted2")
     closeModalMuted2.simulate('press')
   })

   then("component with comment muted",()=> {
       let newMuteViewsBlock: ShallowWrapper;
       let newMuteViewsInstance: MuteViews;

       newMuteViewsBlock = shallow(<MuteViews {...newScreenProps} />);
       newMuteViewsInstance = newMuteViewsBlock.instance() as MuteViews;
       
       let muteDurationFlatlist = newMuteViewsBlock.findWhere(
        (node) => node.prop("testID") === "muteDuration"
      );
      muteDurationFlatlist.props().keyExtractor({},3)

      const mutePostItem = muteDurationFlatlist.prop('renderItem')({item:{
        label:"whole live",
        value:1
      }})
      const muteAccountPostId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      muteAccountPostId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        muteAccountPostId.messageId
      );
      muteAccountPostId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{account_id:1,duration:5,attributes:{is_entirelive_mute:true,duration:10,account:{id:0}}},meta:{message:"User muted."}}
      );
      newMuteViewsInstance.muteAccountPostId = muteAccountPostId.messageId;
      runEngine.sendMessage("Unit Test", muteAccountPostId);

      const shallowMutePostItem = shallow(mutePostItem)
      const radioInputId = shallowMutePostItem.findWhere((node)=> node.prop("testID") === "radioInputId")
      radioInputId.simulate('press')

      const radioLabelId = shallowMutePostItem.findWhere((node)=> node.prop("testID") === "radioLabelId")
      radioLabelId.simulate('press')

     const commentProps = { updateComment: jest.fn(), closeCommentSetting: jest.fn(), openCommentModal: jest.fn(), onMute: jest.fn(), isVisible: true, allowComments: true, language: "en", selectedmutelable: "as", }
     shallow(<CommentSettingsModel {...commentProps} />)
     shallow(<CommentSettingsModel {...{ ...commentProps, allowComments: false }} />)

     const settingProps = { language: "ar", isVisible: true, onClose: jest.fn(), goBackFromSetting: jest.fn(), handleComment: jest.fn(), handleModerater: jest.fn(), handleMutedaccountlist: jest.fn(), }
     shallow(<SettingsViewModal {...settingProps} />)

     const settingModalProps = { flipCamera: "front", isMute: "mute", isVisible: true, language: "en", handleGift: jest.fn(), handleComment: jest.fn(), handleSettingviewmodel: jest.fn(), handleMicrophone: jest.fn(), handleSettinsModal: jest.fn(), handleFlipCamera: jest.fn(), handleShare : jest.fn()}
     shallow(<SettingsModal {...settingModalProps} />)
     shallow(<SettingsModal {...{...settingModalProps,isMute:"unmute",flipCamera:"back"}} />)
    
     const scoreProps = {scoreTeam1:5,scoreTeam2:5}
     const scoreProps2 = {scoreTeam1:0,scoreTeam2:0}
     shallow(<Scorebar {...scoreProps} />)
     shallow(<Scorebar {...scoreProps2} />)

   })

   then("component will unmount",()=> {
   muteViewsInstance.componentWillUnmount()
   })

});
})
