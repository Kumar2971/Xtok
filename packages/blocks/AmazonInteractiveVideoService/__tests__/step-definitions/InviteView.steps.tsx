import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import React from "react";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import InviteView from "../../src/InviteView";
import * as utils from "../../../../framework/src/Utilities";
import { ChallengeDurationPopup, ParticipantsModel } from "../../src/CombinedLiveStream";


const screenProps = {
    navigation: {
        goBack: jest.fn(),
        navigate: jest.fn(),
        addListener: jest.fn((key: string, callback: () => void) => {
            callback();
        }),
    },
    invitationModel: 1,
    handleInviteModal: jest.fn(),
    hostOrGuest: "host",
    handleButton: jest.fn(),
    handleInviteIds:jest.fn(),
    stageArn: "string;",
    chatRoomArn: "string;",
    stage_id:"string;",
};

const InviteViewFeature = loadFeature(
  "./__tests__/features/InviteView-scenario.feature"
);

const mockgetStorageData = jest.spyOn(utils, "getStorageData")

defineFeature(InviteViewFeature, (test) => {
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

  test("User navigates to InviteView", ({ given, when, then }) => {
    let inviteViewBlock: ShallowWrapper;
    let inviteViewInstance: InviteView;
   
    given("I am a User loading InviteView", () => {
        inviteViewBlock = shallow(<InviteView {...screenProps} />);
      inviteViewInstance = inviteViewBlock.instance() as InviteView;
    });

    when("I navigate to the InviteView", () => {
    
  });

    then("get guest or cohost accounts lists api fails",()=> {
      inviteViewInstance.setState({invitedIds:[{userId:0,apiId:''}]})
      const getSearchAccountsApiCallId = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        getSearchAccountsApiCallId.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          getSearchAccountsApiCallId.messageId
        );
        getSearchAccountsApiCallId.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {error:'Something went wrong!'}
        );
        inviteViewInstance.getSearchAccountsApiCallId = getSearchAccountsApiCallId.messageId;
        runEngine.sendMessage("Unit Test", getSearchAccountsApiCallId);
        let account = {
          account_follow_status: '',
          account_status: '',
          bio: '',
          first_name: '',
          full_name: '',
          id: 0,
          last_name: '',
          photo: '',
          unique_auth_id: '',
          user_name: '',
          isInvited: false,
          isLoader: false
      }
        const inviteParticipantApiCallId = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          inviteParticipantApiCallId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            inviteParticipantApiCallId.messageId
          );
          inviteParticipantApiCallId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            {error:'Something went wrong!'}
          );
          inviteViewInstance.inviteParticipantApiCallId = inviteParticipantApiCallId.messageId;
          runEngine.sendMessage("Unit Test", inviteParticipantApiCallId);
    
          inviteParticipantApiCallId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            { account: [account] }
          );
          inviteViewInstance.inviteParticipantApiCallId = inviteParticipantApiCallId.messageId;
          inviteViewInstance.setState({invitedIds:[{userId:0,apiId:inviteParticipantApiCallId.messageId}]})
          runEngine.sendMessage("Unit Test", inviteParticipantApiCallId);
    
    
          inviteParticipantApiCallId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            {error:'Something went wrong!'}
          );
          inviteViewInstance.inviteParticipantApiCallId = inviteParticipantApiCallId.messageId;
          runEngine.sendMessage("Unit Test", inviteParticipantApiCallId);
    
    
        })

    then("get guest or cohost accounts lists api runs successfully",()=> {
        let account = {
            account_follow_status: '',
            account_status: '',
            bio: '',
            first_name: '',
            full_name: '',
            id: 0,
            last_name: '',
            photo: '',
            unique_auth_id: '',
            user_name: '',
            isInvited: false,
            isLoader: false
        }
 inviteViewInstance.setState({    inviteParticipantID: {id:'33',stage_arn:''}})
        const getSearchAccountsApiCallId = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
        );
        getSearchAccountsApiCallId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            getSearchAccountsApiCallId.messageId
        );
        getSearchAccountsApiCallId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            {account: [account] } 
        );
        inviteViewInstance.getSearchAccountsApiCallId = getSearchAccountsApiCallId.messageId;
        runEngine.sendMessage("Unit Test", getSearchAccountsApiCallId);


        const inviteParticipantApiCallId = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
        );
        inviteParticipantApiCallId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            inviteParticipantApiCallId.messageId
        );
        inviteParticipantApiCallId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            {id:'33', stage_arn:''}
        );
        inviteViewInstance.inviteParticipantApiCallId = inviteParticipantApiCallId.messageId;

          runEngine.sendMessage("Unit Test", inviteParticipantApiCallId);


          const updateInviteCallId = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
        );
        updateInviteCallId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            updateInviteCallId.messageId
        );
        updateInviteCallId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            {id:'33', stage_arn:''}
        );
        inviteViewInstance.updateInviteCallId = updateInviteCallId.messageId;

          runEngine.sendMessage("Unit Test", updateInviteCallId);


          const InvitedListApiCallId = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
        );
        InvitedListApiCallId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            InvitedListApiCallId.messageId
        );
        InvitedListApiCallId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            {data:[{id:'33', status: 'delete'}]} 
        );
        inviteViewInstance.InvitedListApiCallId = InvitedListApiCallId.messageId;

          runEngine.sendMessage("Unit Test", InvitedListApiCallId);


        let searchFlatlist = inviteViewBlock.findWhere((node) => node.prop("testID") === "searchFlatlist");
        searchFlatlist.prop('renderItem')({item:{isLoader:true,isInvited:true,user_name:'',account_follow_status:'',account_status:'',bio:'',first_name:'',id:0,last_name:'',photo:'',unique_auth_id:'',invite_status:"invited"}})
       
        searchFlatlist.prop('renderItem')({item:{isLoader:false,isInvited:null,user_name:'Harry',account_follow_status:'Harry',account_status:'New',bio:'No',first_name:'Harry',id:0,last_name:'Harry',photo:'Harry',unique_auth_id:'Harry',invite_status:"invite"}})
        searchFlatlist.props().keyExtractor({}, 3);      
        })

        then('user can invite guest',()=> {

            let FlatListRecomanded = inviteViewBlock.findWhere(
                (node) => node.prop("testID") === "searchFlatlist"
            );
            const renderItem = FlatListRecomanded.prop('renderItem')({item:{isLoader:true,isInvited:true,user_name:'',account_follow_status:'',account_status:'',bio:'',first_name:'',id:0,last_name:'',photo:'',unique_auth_id:'',invite_status:"invited"}})
            const renderItemData = shallow(renderItem)
            const touchableOpacity = renderItemData.findWhere((node) => node.prop('testID') === 'inviteButton0');
            touchableOpacity.simulate('press');

            let searchBar = inviteViewBlock.findWhere(
                (node) => node.prop("testID") === "searchBar"
            );
            searchBar.simulate('changeText', 'Harry');
            searchBar.simulate('changeText', 'Ha');


            let closeInvitation = inviteViewBlock.findWhere(
                  (node) => node.prop("testID") === "closeInvitation1"
                );
                closeInvitation.simulate('press')
        })
  
  });
  test("User navigates to Chohost InviteView", ({ given, when, then }) => {
    const props = {...screenProps, invitationModel:1}
    const prop2 = {...screenProps, invitationModel:2}
    let inviteViewBlock: ShallowWrapper;
    let inviteViewInstance: InviteView;
   
    given("I am a User loading InviteView", () => {
      inviteViewBlock = shallow(<InviteView {...props} />);

      const modelProps = { participantLoader: true, isVisible: true, participantData: [], onClose: jest.fn(), onSelect: jest.fn() }

      const participantModel = shallow(<ParticipantsModel {...modelProps} />)

      let partFlarlist = participantModel.findWhere(
        (node) => node.prop("testID") === "partFlarlist"
      );
      const flatlistEmptyItem = partFlarlist.renderProp("ListEmptyComponent")();
      const noPart = flatlistEmptyItem.findWhere((node) => node.prop("testID") === "noPart");
      expect(noPart.exists()).toBe(false)
      const ActivityIndicator = flatlistEmptyItem.findWhere((node) => node.prop("testID") === "participantLoader");
      expect(ActivityIndicator.exists()).toBe(true);
      const partFlarlist1 = partFlarlist.prop('renderItem')({ item: { id: '0', attributes: { user_id: 0, account: { photo: '', user_name: "asd" }, image: { url: '' } } } })
      partFlarlist.prop('renderItem')({ item: { id: '0', attributes: { user_id: 0, account: { photo: 'asdasd', user_name: "asd" }, image: { url: '' } } } })
      let item = shallow(partFlarlist1)
      let button = item.findWhere((node) => node.prop("testID") === "sendGiftButton")
      button.simulate("press")
      const challengeProps = { isVisible: true, onClose: jest.fn(), onSelect: jest.fn(), }

      const challengeDurationPopup = shallow(<ChallengeDurationPopup {...challengeProps} />)

      let btn1 = challengeDurationPopup.findWhere(
        (node) => node.prop("testID") === "btn1"
      );
      btn1.simulate('press')

      let btn2 = challengeDurationPopup.findWhere(
        (node) => node.prop("testID") === "btn2"
      );
      btn2.simulate('press')

      let btn3 = challengeDurationPopup.findWhere(
        (node) => node.prop("testID") === "btn3"
      );
      btn3.simulate('press')
      
    });
    when("I navigate to the InviteView", () => {
      inviteViewInstance = inviteViewBlock.instance() as InviteView;
    });
    then("get cohost list on initial time",()=> {
      inviteViewInstance.getGuestOrCoHostAccountsLists = jest.fn();
      // Simulate componentDidUpdate by updating the invitationModel prop
      inviteViewInstance.componentDidUpdate(prop2);
      //Testing the method call on component did mount
      expect(inviteViewInstance.getGuestOrCoHostAccountsLists).toHaveBeenCalledWith({ searchText: '' });
    })
})
});
