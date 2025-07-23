import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from 'framework/src/Helpers'
import {runEngine} from 'framework/src/RunEngine'
import {Message} from "framework/src/Message"

import MessageEnum, {getName} from "framework/src/Messages/MessageEnum"; 
import React from "react";
import NotificationAmazonIvs from "../../src/NotificationAmazonIvs"
// import {render,fireEvent} from "@testing-library/react-native";

const screenProps = {
    navigation: {
        reset: jest.fn(),
        navigate:jest.fn(),
    },
    id: "NotificationAmazonIvs",
    route: { params: {  }},
  }

const feature = loadFeature('./__tests__/features/NotificationAmazonIvs-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to NotificationAmazonIvs', ({ given, when, then }) => {
        // const notificationIvs = render(<NotificationAmazonIvs {...screenProps}/>);
        
        let exampleBlockA:ShallowWrapper;
        let instance: NotificationAmazonIvs;
        
        given('I am a User loading NotificationAmazonIvs', () => {  
            exampleBlockA = shallow(<NotificationAmazonIvs {...screenProps}/>)  
        });

        when('I navigate to the NotificationAmazonIvs', () => {
            instance = exampleBlockA.instance() as NotificationAmazonIvs;
        });

        then('get notification api gets failed',()=> {
            const getDataCallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              getDataCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getDataCallId.messageId
              );
              getDataCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify({error:'Something went wrong!'}))
              );
              instance.getDataCallId = getDataCallId.messageId;
              runEngine.sendMessage("Unit Test", getDataCallId);
            expect(exampleBlockA).toBeTruthy()
    })

    then('get notification api runs successfully',()=> {
        let item = {
            id: '0',
            attributes: {
                headings: 'asdasd asd',
                room_id: 'asjkhjdas',
                chat_arn: 'ajskdjads',
                contents: 'invitation',
                notification_created_user: {
                    data: {
                        attributes: {
                            photo: 'ashdkjasd'
                        }
                    }
                }
            }
        }

        let item2 = {
          id: '0',
          attributes: {
              headings: 'asdasd asd',
              room_id: 'asjkhjdas',
              chat_arn: 'ajskdjads',
              contents: 'invitation',
              invitation_status:'accepted',
              notification_created_user: {
                  data: {
                      attributes: {
                          photo: 'ashdkjasd'
                      }
                  }
              }
          }
      }
        const getDataCallId = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          getDataCallId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            getDataCallId.messageId
          );
          getDataCallId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
              JSON.parse(JSON.stringify({
                  data: [item],
                  meta:{
                    pagination:{
                        total_pages:10
                    }
                  }
              }))
          );
          instance.getDataCallId = getDataCallId.messageId;
          runEngine.sendMessage("Unit Test", getDataCallId);


          const getDataCallId2 = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          getDataCallId2.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            getDataCallId2.messageId
          );
          getDataCallId2.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
              JSON.parse(JSON.stringify({
                  data: [],
                  meta:{
                    pagination:{
                        total_pages:0
                    }
                  }
              }))
          );
          instance.getDataCallId = getDataCallId2.messageId;
          runEngine.sendMessage("Unit Test", getDataCallId2);


          let FlatListRecomanded = exampleBlockA.findWhere(
            (node) => node.prop("testID") === "notificationFlatlist"
        );
        
        const renderItem = FlatListRecomanded.prop('renderItem')({item:item})
        const renderItemData = shallow(renderItem)
        const touchableOpacity = renderItemData.findWhere((node) => node.prop('testID') === 'notificationButton');
        touchableOpacity.simulate('press');

        const rejectButton = renderItemData.findWhere((node) => node.prop('testID') === 'rejectButton');
        rejectButton.simulate('press');


        FlatListRecomanded.prop('renderItem')({item:item2})


          // const {getByTestId} = notificationIvs;
          // const notificationFlatlist = getByTestId('notificationFlatlist');
          // notificationFlatlist.props.renderItem({item:item})       
          // notificationFlatlist.props.keyExtractor('1')

        expect(exampleBlockA).toBeTruthy()
})


then('get stages api gets failed',()=> {
    const liveStagesDataCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      liveStagesDataCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        liveStagesDataCallId.messageId
      );
      liveStagesDataCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({error:'Something went wrong!'}))
      );
      instance.liveStagesDataCallId = liveStagesDataCallId.messageId;
      runEngine.sendMessage("Unit Test", liveStagesDataCallId);
    expect(exampleBlockA).toBeTruthy()
})

then('get stages api runs successfully',async()=> {
const liveStagesDataCallId = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );
  liveStagesDataCallId.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    liveStagesDataCallId.messageId
  );
  liveStagesDataCallId.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
      JSON.parse(JSON.stringify([{id:0,name: 'asas',
        arn:'asas',
        chat_room_arn:'asas'}]))
  );
  instance.liveStagesDataCallId = liveStagesDataCallId.messageId;
  runEngine.sendMessage("Unit Test", liveStagesDataCallId);
  // const {getByTestId} = notificationIvs;
  //         const stageFlatlist = getByTestId('stageFlatlist');
  //         stageFlatlist.props.renderItem({item:{id:0}})       
  //         stageFlatlist.props.keyExtractor('1')

expect(exampleBlockA).toBeTruthy()
})

then('get stages api runs successfully but return empty array',()=> {

  let FlatListRecomanded = exampleBlockA.findWhere(
    (node) => node.prop("testID") === "stageFlatlist"
);

const renderItem = FlatListRecomanded.prop('renderItem')({item:{id:0,name: 'asas',
arn:'asas',
chat_room_arn:'asas'}})
const renderItemData = shallow(renderItem)
const touchableOpacity = renderItemData.findWhere((node) => node.prop('testID') === 'stageButton');
touchableOpacity.simulate('press');

    const liveStagesDataCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      liveStagesDataCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        liveStagesDataCallId.messageId
      );
      liveStagesDataCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
          JSON.parse(JSON.stringify([]))
      );
      instance.liveStagesDataCallId = liveStagesDataCallId.messageId;
      runEngine.sendMessage("Unit Test", liveStagesDataCallId);
    expect(exampleBlockA).toBeTruthy()
    })


    then('update invite api fails to run successfully', () => {
      const updateInviteCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      updateInviteCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateInviteCallId.messageId
      );
      updateInviteCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({error:'Something went wrong!'}))
      );
      instance.updateInviteCallId = updateInviteCallId.messageId;
      runEngine.sendMessage("Unit Test", updateInviteCallId);
    
    expect(exampleBlockA).toBeTruthy()
    })

    then('update invite api runs successfully', () => {
      const updateInviteCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      updateInviteCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateInviteCallId.messageId
      );
      updateInviteCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify([{
          id:'0',
          attributes:{
            headings:'string',
            room_id:'string',
            chat_arn:'string',
            invite_id:0,
            invitation_status:null,
            contents:'string',
            notification_created_user:{
              data: {
                attributes :{ 
                  photo:null,
                }
              }
            }
          }
        }]))
      );
      instance.updateInviteCallId = updateInviteCallId.messageId;
      runEngine.sendMessage("Unit Test", updateInviteCallId);
    
    expect(exampleBlockA).toBeTruthy()
    })

        then('user can click on go live button and start live stream',()=> {
            // const {getByTestId} = notificationIvs;
            // const touchable = getByTestId('goLiveButton');
            // fireEvent.press(touchable);
            expect(exampleBlockA).toBeTruthy()
        })

        then('I can leave the screen with out errors', async() => {
            // instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy()
        });
    });


});
