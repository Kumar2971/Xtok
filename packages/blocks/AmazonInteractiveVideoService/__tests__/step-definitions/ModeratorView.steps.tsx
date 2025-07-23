import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import React from "react";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import ModeratorView from "../../src/ModeratorView";
import * as utils from "../../../../framework/src/Utilities";

const screenProps = {
    navigation: {
        goBack: jest.fn(),
        navigate: jest.fn(),
        addListener: jest.fn((key: string, callback: () => void) => {
            callback();
        }),
    },
    moderatorModel:true,
    stage_id:"123",
    stageArn:"aswda",
    moderoterAddRemove:"remove",
    invitedIds:[{userId:1,apiId:"Asdaasd"}],
    openCloseModeratorModel:jest.fn(),
    openSettingsModal:jest.fn(),
    manageModals:jest.fn(),
    openErrorAlert:jest.fn(),
    setModeratorAddRemove:jest.fn(),
    handelModerator:jest.fn(),
    hostsidemoderatorList:jest.fn()
};

const ModeratorViewFeature = loadFeature(
  "./__tests__/features/ModeratorView-scenario.feature"
);

const searchResultMockData = [{"account_follow_status": "Follow","is_moderator":"Remove", "account_status": "Private", "first_name": null, "full_name": "Zack Affron", "id": 5, "invite_status": "", "photo": "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/wajfd4tz39yvnftdjt9r0nto0qwk", "type": null, "user_name": "ZackAff_7"},
{"account_follow_status": "Follow", "account_status": "Public", "first_name": null, "full_name": "Guru Singh", "id": 5, "invite_status": "", "photo": "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/8tndc3dk6kbxc61ka0lk140eh6xa", "type": null, "user_name": "Guru777"},
{"account_follow_status": "Follow", "account_status": "Public", "first_name": null, "full_name": "Eric Dsilva ", "id": 190, "invite_status": "", "photo": "https://minio.b255799.dev.eastus.az.svc.builder.cafe/sbucket/i5jimillibom40b5qgeje28pfcho", "type": null, "user_name": "erick"}]

const mockgetStorageData = jest.spyOn(utils, "getStorageData")

defineFeature(ModeratorViewFeature, (test) => {
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

  test("User navigates to ModeratorView", ({ given, when, then }) => {
    let moderatorViewBlock: ShallowWrapper;
    let moderatorViewInstance: ModeratorView;
   
    given("I am a User loading ModeratorView", () => {
        moderatorViewBlock = shallow(<ModeratorView {...screenProps} />);
        moderatorViewInstance = moderatorViewBlock.instance() as ModeratorView;
    });

    when("I navigate to the ModeratorView", () => {
      let searchBar2 = moderatorViewBlock.findWhere(
        (node) => node.prop("testID") === "searchBar2"
      );
      searchBar2.simulate('changeText', 'Ha');
      searchBar2.simulate('changeText', 'Harry');
   });

   then("getModerator api gets called",()=> {
    const getModertaoterAccountsApiCallId = new Message(
       getName(MessageEnum.RestAPIResponceMessage)
     );
     getModertaoterAccountsApiCallId.addData(
       getName(MessageEnum.RestAPIResponceDataMessage),
       getModertaoterAccountsApiCallId.messageId
     );
     getModertaoterAccountsApiCallId.addData(
       getName(MessageEnum.RestAPIResponceSuccessMessage),
       {followings:searchResultMockData}
     );
     moderatorViewInstance.getModeratorAccountsApiCallId = getModertaoterAccountsApiCallId.messageId;
     runEngine.sendMessage("Unit Test", getModertaoterAccountsApiCallId);

     getModertaoterAccountsApiCallId.addData(
       getName(MessageEnum.RestAPIResponceSuccessMessage),
       {error:'ss'}
     );
     runEngine.sendMessage("Unit Test", getModertaoterAccountsApiCallId);
  })

   then("show data in flatlist",()=> {
     let searchFlatlist2 = moderatorViewBlock.findWhere(
       (node) => node.prop("testID") === "searchFlatlist2"
     );

     const moderatoritem = searchFlatlist2.prop('renderItem')({
       item: {
         account_follow_status: "string;",
         bio: "string;",
         first_name: "string;",
         full_name: "string;",
         id: 1,
         is_moderator: "add",
         is_private: "true",
         last_name: "true",
         photo: "true",
         unique_auth_id: "true",
         live_status: "LIVE",
         user_name: "true"
       }
     })

     const moderatorRender = shallow(moderatoritem)
     const addRemoveModerator1 = moderatorRender.findWhere((node) => node.prop('testID') === 'addRemoveModerator1');
     addRemoveModerator1.simulate('press');


     const moderatoritem2 = searchFlatlist2.prop('renderItem')({
       item: {
         account_follow_status: "string;",
         bio: null,
         first_name: "string;",
         full_name: null,
         id: 1,
         is_moderator: "remove",
         is_private: "true",
         last_name: "true",
         photo: null,
         unique_auth_id: "true",
         live_status: "LIVE",
         user_name: null
       }
     })

     const moderatorRender2 = shallow(moderatoritem2)
     const addRemoveModerator2 = moderatorRender2.findWhere((node) => node.prop('testID') === 'addRemoveModerator1');
     addRemoveModerator2.simulate('press');

     searchFlatlist2.prop('renderItem')({
       item: {
         account_follow_status: "string;",
         bio: null,
         first_name: "string;",
         full_name: null,
         id: 1,
         is_moderator: null,
         is_private: "true",
         last_name: "true",
         photo: null,
         unique_auth_id: "true",
         live_status: "LIVE",
         user_name: "true"
       }
     })
     searchFlatlist2.props().keyExtractor({}, 3);

     let addModeratorButton = moderatorViewBlock.findWhere(
       (node) => node.prop("testID") === "addModeratorButton"
     );
     addModeratorButton.simulate('press')

     let closeModeratorList = moderatorViewBlock.findWhere(
      (node) => node.prop("testID") === "closeModeratorList"
    );
    closeModeratorList.simulate('press');

     let searchFlatlist4 = moderatorViewBlock.findWhere(
  (node) => node.prop("testID") === "searchFlatlist4"
);

const moderatorListItem = searchFlatlist4.prop('renderItem')({item:{
  account_follow_status: "string;",
  bio: "string;",
  first_name: "string;",
  full_name: "string;",
  id: 1,
  is_moderator: "remove",
  is_private: "true",
  last_name: "true",
  photo: "true",
  unique_auth_id: "true",
  live_status: "LIVE",
  user_name: "true"
 }})

//  const muteListRender = shallow(moderatorListItem)
//  const removeModerator1 = muteListRender.findWhere((node) => node.prop('testID') === 'removeModerator1');
//  removeModerator1.simulate('press');
//  searchFlatlist4.renderProp("ListEmptyComponent")();

 const closeInvitation6 = moderatorViewBlock.findWhere((node) => node.prop('testID') === 'closeInvitation6');
 closeInvitation6.simulate('press');

 const addParticipant = moderatorViewBlock.findWhere((node) => node.prop('testID') === 'addParticipant');
 addParticipant.simulate('press');

 const addParticipant1 = moderatorViewBlock.findWhere((node) => node.prop('testID') === 'addParticipant1');
 addParticipant1.simulate('press');


 searchFlatlist4.prop('renderItem')({item:{
  account_follow_status: "string;",
  bio: "asd",
  first_name: "string;",
  full_name: null,
  id: 1,
  is_moderator: "Remove",
  is_private: "true",
  last_name: "true",
  photo: "asd",
  unique_auth_id: "true",
  live_status: "LIVE",
  user_name: null,
 }})

searchFlatlist4.prop('renderItem')({item:{
  account_follow_status: "string;",
  bio: null,
  first_name: "string;",
  full_name: null,
  id: 1,
  is_moderator: null,
  is_private: "true",
  last_name: "true",
  photo: null,
  unique_auth_id: "true",
  live_status: "LIVE",
  user_name: "true"
 }})
searchFlatlist4.props().keyExtractor({}, 3);
   })

   then("add moderator api gets called",()=> {
    const AddModertaoterAccountsApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      AddModertaoterAccountsApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        AddModertaoterAccountsApiCallId.messageId
      );
      AddModertaoterAccountsApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{attributes:{is_allow_comment:true}}}
      );
      moderatorViewInstance.addModeratorAccountsApiCallId = AddModertaoterAccountsApiCallId.messageId;
      runEngine.sendMessage("Unit Test", AddModertaoterAccountsApiCallId);


      AddModertaoterAccountsApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {message:'Account is not live, invitation has been sent to the account'}
      );
      moderatorViewInstance.addModeratorAccountsApiCallId = AddModertaoterAccountsApiCallId.messageId;
      runEngine.sendMessage("Unit Test", AddModertaoterAccountsApiCallId);
   })

   then("component will unmount",()=> {
    moderatorViewInstance.componentWillUnmount();
   })

});
})
