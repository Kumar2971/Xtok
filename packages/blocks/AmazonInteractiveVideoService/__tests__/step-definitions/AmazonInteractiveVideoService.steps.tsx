import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from 'framework/src/Helpers'
import {runEngine} from 'framework/src/RunEngine'
import {Message} from "framework/src/Message"

import MessageEnum, {getName} from "framework/src/Messages/MessageEnum"; 
import React from "react";
import AmazonInteractiveVideoService from "../../src/AmazonInteractiveVideoService"
import { ChatIvs } from "../../src/ChatIvs"

const screenProps = {
    navigation: {
        reset: jest.fn()
    },
    id: "AmazonInteractiveVideoService",
    route: { params: { stageData:{stageArn:'arn:aws:ivs:ap-south-1:621966568940:stage/xvJkaZgI0wu8',isViewer:true,name: '',inviteId: 0,chatArn:'arn:aws:ivschat:ap-south-1:621966568940:room/QW4nS2Mu5QM6'} }},
  }

  const viewerScreenProps = {
    navigation: {
      reset: jest.fn()
  },
    id: "AmazonInteractiveVideoService",
    route: { params: { stageData:{stageArn:'arn:aws:ivs:ap-south-1:621966568940:stage/xvJkaZgI0wu8',isViewer:false,name: '',inviteId: 0,chatArn:'arn:aws:ivschat:ap-south-1:621966568940:room/QW4nS2Mu5QM6'} }},
  }

  const chatProps = {
    userData:{
        full_name: 'sa',
  user_name:'as',
  photo: '',
  id: "1"
    } ,
    isViewer:'false',
    inviteModal:jest.fn(),
    chatTokenData:{
        token: 'AQICAHiYRF1W4dMtA_2KBHdIvZF04wmmkZjk3Y5FSogh_QrGewH6msMlM4DCC_Lh12AizOVpAAAByTCCAcUGCSqGSIb3DQEHBqCCAbYwggGyAgEAMIIBqwYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAy3iujiXVbqy83jU9gCARCAggF8E0ClhItpBlL6MwhQQ_fq2MQ9dIqadqO7SWcoHoUPkR60djMkSuY00RpIUpWtb9ID433hVSUyWKgcZ1CRolctCS4JRCzgpeAx0kLbavf_BHOdB1tioG2qrQsgu0pggbjKgYdEsH4DZ7z8HBx-JexY4rIGJrefyiFW8zWxivEMk7ay5jRUk1Aey6c3ZrD3qrd1JuH5n70_M5sX2IYNpZ9bP3vuEIVlUDpeTr-Tf4AVDQ-_JDyR_xZthuYu_DSkP3N-F9N0WqBXfhkLPobH1QWHfbTvUyOyywFdNtnyiQeBFbzFpj3BSibcKwwL1HrB7f2rGU0vMcB8dbUc4XBlz8NUmVhtlIJwRxW3ztDh2wXKOr_A42Y7ZytX1V1dAMPhWl5xGkmkXQ3OFiKcXya33T5lCFUaJGAuuxHs9h5swez-RsSG1HMWHys2j8HWnvdFbhJuoa7kPjSmQ2UwT0D1qLCY64TvePt3b1Xa7jE25t-kiZnmNeMLezLACskvolc!#0',
        sessionTime:'2023-08-21T09:34:21.000Z',
        tokenTime:'2023-08-21T07:34:21.000Z',
    }
  }

  const viewerChatProps = {
    userData:{
        full_name: 'sa',
  user_name:'as',
  photo: '',
  id:"1",
    } ,
    isViewer:'true',
    inviteModal:jest.fn(),
    chatTokenData:{
        token: 'AQICAHiYRF1W4dMtA_2KBHdIvZF04wmmkZjk3Y5FSogh_QrGewH6msMlM4DCC_Lh12AizOVpAAAByTCCAcUGCSqGSIb3DQEHBqCCAbYwggGyAgEAMIIBqwYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAy3iujiXVbqy83jU9gCARCAggF8E0ClhItpBlL6MwhQQ_fq2MQ9dIqadqO7SWcoHoUPkR60djMkSuY00RpIUpWtb9ID433hVSUyWKgcZ1CRolctCS4JRCzgpeAx0kLbavf_BHOdB1tioG2qrQsgu0pggbjKgYdEsH4DZ7z8HBx-JexY4rIGJrefyiFW8zWxivEMk7ay5jRUk1Aey6c3ZrD3qrd1JuH5n70_M5sX2IYNpZ9bP3vuEIVlUDpeTr-Tf4AVDQ-_JDyR_xZthuYu_DSkP3N-F9N0WqBXfhkLPobH1QWHfbTvUyOyywFdNtnyiQeBFbzFpj3BSibcKwwL1HrB7f2rGU0vMcB8dbUc4XBlz8NUmVhtlIJwRxW3ztDh2wXKOr_A42Y7ZytX1V1dAMPhWl5xGkmkXQ3OFiKcXya33T5lCFUaJGAuuxHs9h5swez-RsSG1HMWHys2j8HWnvdFbhJuoa7kPjSmQ2UwT0D1qLCY64TvePt3b1Xa7jE25t-kiZnmNeMLezLACskvolc!#0',
        sessionTime:'2023-08-21T09:34:21.000Z',
        tokenTime:'2023-08-21T07:34:21.000Z',
    }
  }

const feature = loadFeature('./__tests__/features/AmazonInteractiveVideoService-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });



    test('User navigates to AmazonInteractiveVideoService', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance: AmazonInteractiveVideoService;
        let chat:ShallowWrapper;
        let viewerSideChat:ShallowWrapper;
        
        given('I am a User loading AmazonInteractiveVideoService', () => {  
            exampleBlockA = shallow(<AmazonInteractiveVideoService {...screenProps}/>)  
            instance = exampleBlockA.instance() as AmazonInteractiveVideoService;
            chat = shallow(<ChatIvs {...chatProps}/>);
            viewerSideChat = shallow(<ChatIvs {...viewerChatProps}/>);
        });

        when('I navigate to the AmazonInteractiveVideoService', () => {
            let newButton = exampleBlockA.findWhere(
              (node) => node.prop("testID") === "newButton"
          );
          newButton.simulate('press')
        });

        then('fetching current logged in user data fails',()=> {

            const loginUserCallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              loginUserCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                loginUserCallId.messageId
              );
              loginUserCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({error:'Something went wrong!'}))
              );
              instance.loginUserCallId = loginUserCallId.messageId;
              runEngine.sendMessage("Unit Test", loginUserCallId);
            
            expect(exampleBlockA).toBeTruthy()
        });

        then('successfully fetching current logged in user data',()=> {

            let userData = {
                full_name: '',
                user_name:'',
                photo: '',
                datasaver:{
                  account_id:1
                }
            }

            const loginUserCallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              loginUserCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                loginUserCallId.messageId
              );
              loginUserCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({data:{attributes:userData}}))
              );
              instance.loginUserCallId = loginUserCallId.messageId;
              runEngine.sendMessage("Unit Test", loginUserCallId);
            
            expect(exampleBlockA).toBeTruthy()
        });

        then('User broadcasts and starts live stream fails to start',()=> {

            const createChannelApiCallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              createChannelApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                createChannelApiCallId.messageId
              );
              createChannelApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({error:'Something went wrong!'}))
              );
              instance.createChannelApiCallId = createChannelApiCallId.messageId;
              runEngine.sendMessage("Unit Test", createChannelApiCallId);
            
            expect(exampleBlockA).toBeTruthy()
        });

        then('create stage room in live stream fails to start',()=> {

            const createStageApiCallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              createStageApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                createStageApiCallId.messageId
              );
              createStageApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({error:'Something went wrong!'}))
              );
              instance.createStageApiCallId = createStageApiCallId.messageId;
              runEngine.sendMessage("Unit Test", createStageApiCallId);


              const createChatApiCallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              createChatApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                createChatApiCallId.messageId
              );
              createChatApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({error:'Something went wrong!'}))
              );
              instance.createChatApiCallId = createChatApiCallId.messageId;
              runEngine.sendMessage("Unit Test", createChatApiCallId);
            
            expect(exampleBlockA).toBeTruthy()
        });

        then('User broadcasts and successfully starts live stream',()=> {

            const createChannelApiCallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              createChannelApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                createChannelApiCallId.messageId
              );
              createChannelApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({data:{stream_key:{value:''},channel:{arn:''}}}))
              );
              instance.createChannelApiCallId = createChannelApiCallId.messageId;
              runEngine.sendMessage("Unit Test", createChannelApiCallId);
            
            expect(exampleBlockA).toBeTruthy()
        });

        then('successfully created stage room live stream',()=> {

            const createStageApiCallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              createStageApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                createStageApiCallId.messageId
              );
              createStageApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({data:{arn:''}}))
              );
              instance.createStageApiCallId = createStageApiCallId.messageId;
              runEngine.sendMessage("Unit Test", createStageApiCallId);

              const createChatApiCallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              createChatApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                createChatApiCallId.messageId
              );
              createChatApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({data:{arn:''}}))
              );
              instance.createChatApiCallId = createChatApiCallId.messageId;
              runEngine.sendMessage("Unit Test", createChatApiCallId);
            
            expect(exampleBlockA).toBeTruthy()
        });

        then('createing stage room token and stage token fails',()=> {

            const createTokenApiCallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              createTokenApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                createTokenApiCallId.messageId
              );
              createTokenApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({error:'message'}))
              );
              instance.createTokenApiCallId = createTokenApiCallId.messageId;
              runEngine.sendMessage("Unit Test", createTokenApiCallId);

              const createChatTokenApiCallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              createChatTokenApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                createChatTokenApiCallId.messageId
              );
              createChatTokenApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({error:'message'}))
              );
              instance.createChatTokenApiCallId = createChatTokenApiCallId.messageId;
              runEngine.sendMessage("Unit Test", createChatTokenApiCallId);
            
            expect(exampleBlockA).toBeTruthy()
        });

        then('successfully created stage room token and stage token',()=> {

              const createChatTokenApiCallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              createChatTokenApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                createChatTokenApiCallId.messageId
              );
              createChatTokenApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({data:{stage_arn:'',token:''}}))
              );
              instance.createChatTokenApiCallId = createChatTokenApiCallId.messageId;
              runEngine.sendMessage("Unit Test", createChatTokenApiCallId);
            
            expect(exampleBlockA).toBeTruthy()
        });

        then('User opens invitaion model and search',()=> {
          let searchBar = exampleBlockA.findWhere(
            (node) => node.prop("testID") === "searchBar"
        );
        searchBar.simulate('changeText','harry')

        let searchFlatlist = exampleBlockA.findWhere(
          (node) => node.prop("testID") === "searchFlatlist"
      );

      searchFlatlist.prop('renderItem')({item:{isLoader:true,isInvited:true,user_name:'',account_follow_status:'',account_status:'',bio:'',first_name:'',id:0,last_name:'',photo:'',unique_auth_id:''}})
      searchFlatlist.prop('renderItem')({item:{isLoader:false,isInvited:null,user_name:'Harry',account_follow_status:'Harry',account_status:'New',bio:'No',first_name:'Harry',id:0,last_name:'Harry',photo:'Harry',unique_auth_id:'Harry'}})   
            searchFlatlist.props().keyExtractor({}, 3);
            let FlatListRecomanded = exampleBlockA.findWhere(
              (node) => node.prop("testID") === "searchFlatlist"
          );
          const renderItem = FlatListRecomanded.prop('renderItem')({item:{isLoader:true,isInvited:true,user_name:'',account_follow_status:'',account_status:'',bio:'',first_name:'',id:0,last_name:'',photo:'',unique_auth_id:''}})
          const renderItemData = shallow(renderItem)
          const touchableOpacity = renderItemData.findWhere((node) => node.prop('testID') === 'inviteButton0');
          touchableOpacity.simulate('press');

          expect(exampleBlockA).toBeTruthy()
        });

        then('search api fails to search user',()=> {

            const getSearchAccountsApiCallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              getSearchAccountsApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getSearchAccountsApiCallId.messageId
              );
              getSearchAccountsApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({error:'Something went wrong!'}))
              );
              instance.getSearchAccountsApiCallId = getSearchAccountsApiCallId.messageId;
              runEngine.sendMessage("Unit Test", getSearchAccountsApiCallId);
            
            expect(exampleBlockA).toBeTruthy()
        });

        then('search api returns user accounts',()=> {
          
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

            const getSearchAccountsApiCallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              getSearchAccountsApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getSearchAccountsApiCallId.messageId
              );
              getSearchAccountsApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({data:{account:[account]}}))
              );
              instance.getSearchAccountsApiCallId = getSearchAccountsApiCallId.messageId;
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
                JSON.parse(JSON.stringify({account:[account]}))
              );
              instance.inviteParticipantApiCallId = inviteParticipantApiCallId.messageId;
              runEngine.sendMessage("Unit Test", inviteParticipantApiCallId);

            expect(exampleBlockA).toBeTruthy()
        });

        then('on pressing end button',()=> {
            let newButton = exampleBlockA.findWhere(
              (node) => node.prop("testID") === "newButton"
          );
          newButton.simulate('press')

          let endButton = exampleBlockA.findWhere(
            (node) => node.prop("testID") === "endButton"
        );
        endButton.simulate('press')
            
            expect(exampleBlockA).toBeTruthy()
        })

        then('stop stream api fails',()=> {
          const stopStreamApiCallId = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          stopStreamApiCallId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            stopStreamApiCallId.messageId
          );
          stopStreamApiCallId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            JSON.parse(JSON.stringify({error:'Something went wrong!'}))
          );
          instance.stopStreamApiCallId = stopStreamApiCallId.messageId;
          runEngine.sendMessage("Unit Test", stopStreamApiCallId);
          expect(exampleBlockA).toBeTruthy()
        })

        then('stop stream api runs successfully',()=> {
          const stopStreamApiCallId = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          stopStreamApiCallId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            stopStreamApiCallId.messageId
          );
          stopStreamApiCallId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            JSON.parse(JSON.stringify({data:{}}))
          );
          instance.stopStreamApiCallId = stopStreamApiCallId.messageId;
          runEngine.sendMessage("Unit Test", stopStreamApiCallId);
          expect(exampleBlockA).toBeTruthy()
        })

        then('delete channel room and stage fails',()=> {
          const deleteChannelApiCallId = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          deleteChannelApiCallId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            deleteChannelApiCallId.messageId
          );
          deleteChannelApiCallId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            JSON.parse(JSON.stringify({error:'Something went wrong'}))
          );
          instance.deleteChannelApiCallId = deleteChannelApiCallId.messageId;
          runEngine.sendMessage("Unit Test", deleteChannelApiCallId);

          expect(exampleBlockA).toBeTruthy()
        })

        then('delete channel room and stage runs successfully',()=> {
          const deleteChannelApiCallId = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          deleteChannelApiCallId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            deleteChannelApiCallId.messageId
          );
          deleteChannelApiCallId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            JSON.parse(JSON.stringify({data:{}}))
          );
          instance.deleteChannelApiCallId = deleteChannelApiCallId.messageId;
          runEngine.sendMessage("Unit Test", deleteChannelApiCallId);

          expect(exampleBlockA).toBeTruthy()
        })

        then('joined as a viewer',()=> {

          let newAmazon = shallow(<AmazonInteractiveVideoService {...viewerScreenProps} />);

          let closeInvitation = newAmazon.findWhere(
            (node) => node.prop("testID") === "closeInvitation"
          );
          closeInvitation.simulate('press')

          let newButton = newAmazon.findWhere(
            (node) => node.prop("testID") === "newButton"
          );
          newButton.simulate('press')

          let endButton = newAmazon.findWhere(
            (node) => node.prop("testID") === "endButton"
          );
          endButton.simulate('press')
          expect(newAmazon).toBeTruthy()
        })



        then('I can leave the screen with out errors', async() => {
          let flatlistTest = chat.findWhere(
            (node) => node.prop("testID") === "flatlistTest"
        );
  
        flatlistTest.prop('renderItem')({item:{senderName:'',senderId:0,message:{Message:{text:'',type:''},imageUrl:null}}})
        flatlistTest.prop('renderItem')({item:{senderName:'harry',senderId:0,message:{Message:{text:'new text',type:''},imageUrl:" "}}})   
        flatlistTest.prop('renderItem')({item:{senderName:'harry',senderId:0,message:{Message:{text:'new text',type:'application'},imageUrl:null}}})   
        flatlistTest.props().keyExtractor({}, 3);

        let message = chat.findWhere(
          (node) => node.prop("testID") === "message"
      );
      message.simulate('changeText','harry')
          
      let sendMessage = chat.findWhere(
        (node) => node.prop("testID") === "sendMessage"
    );
    sendMessage.simulate('press')
           
    let responderView = chat.findWhere(
      (node) => node.prop("testID") === "responderView"
  );
  responderView.simulate('startShouldSetResponder')
         
  let msg = chat.findWhere(
    (node) => node.prop("testID") === "message"
);

msg.simulate('changeText','')

let sendMessage2 = chat.findWhere(
  (node) => node.prop("testID") === "sendMessage"
);
sendMessage2.simulate('press')
        });
    });


});
