import { ShallowWrapper, shallow } from 'enzyme'
import { defineFeature, loadFeature } from "jest-cucumber"

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Chat9 from "../../src/Chat9"
import { Dimensions, Platform } from "react-native"
import ImagePicker from 'react-native-image-crop-picker';

const navigation = require("react-navigation")

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
      addListener: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      pop: jest.fn(),
      popToTop: jest.fn(),
      isFocused: jest.fn()
    },
    id: "Chat9"
}

const feature = loadFeature('./__tests__/features/Chat9-scenario.feature');

let message: Message = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  )

  message.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    {
      data: []
    }
  )

defineFeature(feature, (test) => {
  const mockWebSocket = {
    close: jest.fn(),
    send: jest.fn(),
    onopen: null as any,
    onmessage: null as any,
    onerror: null as any,
    onclose: null as any,
  }
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.doMock('react-native', () => ({ Platform: { OS: 'android' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'android');
        global.WebSocket = jest.fn().mockImplementation(() => mockWebSocket) as any;

    });

    test('User navigates to Chat9', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: Chat9;

        given('I am a User loading Chat9', () => {
            exampleBlockA = shallow(<Chat9 route={undefined} {...screenProps} />);
        });

        when('I navigate to the Chat9', () => {
            instance = exampleBlockA.instance() as Chat9
    
            // addListenerMock.mock.calls[0][1]();
            // addListenerMock.mockRestore();
            // addListenerMock2.mock.calls[0][1]();
        });

        then('Chat9 will load with out errors', () => {
          Platform.OS = "ios";
        });

        then('I can enter text with out errors', () => {
            instance.sentMessageModal()
            let wrapper = shallow(<Chat9 navigation={undefined} id={""} route={undefined} />)

            let textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'modalID');
            textInputComponent.props().onRequestClose()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'touchableBtn');
            textInputComponent.props().onPressOut()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'privateliveBtnId');
            textInputComponent.simulate("press")
        });

        then('I can select the cross button with out errors', () => {
            let wrapper = shallow(<Chat9 navigation={undefined} id={""} route={undefined} />)
            let textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'modalVisibleId');
            textInputComponent.props().onPress()
            instance.onNotify()
            instance.uploadPhoto()
            instance.takePhoto()
            instance.checkVideoSizes('htttp//google.com')
            instance.userMessage(1)
            instance.checkToken()
            instance.getPreviousChats()
        });

        then('I can select the smile button with out errors', () => {

            instance.yesModal()
            let wrapper = shallow(<Chat9 navigation={undefined} id={""} route={undefined} />)

            let textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'yesModalId');
            textInputComponent.props().onRequestClose()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'pressOutId');
            textInputComponent.props().onPressOut()
        });
        then('I can select the smileIcon button with out errors', () => {
            let wrapper = shallow(<Chat9 navigation={undefined} id={""} route={undefined} />)

            let textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'continueId');
            textInputComponent.props().onPress()
        });

        then('I can select the button with with out errors', () => {
            instance.optionsModal()
            let wrapper = shallow(<Chat9 navigation={undefined} id={""} route={undefined} />)

            let textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'optionModalId');
            textInputComponent.props().onRequestClose()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'optionPressOutId');
            textInputComponent.props().onPressOut()
            instance.enterdescription("Security")
        });

        then('I can select the capture photo button with with out errors', () => {
            let wrapper = shallow(<Chat9 navigation={undefined} id={""} route={undefined} />)
            let textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'captureId');
            textInputComponent.props().onPress()
            let capturePhotoComponent = wrapper.findWhere((node) => node.prop('testID') === 'uploadId');
            capturePhotoComponent.props().onPress()
            const openPickerSpy = jest.spyOn(ImagePicker, 'openPicker');
            openPickerSpy.mockResolvedValue(Array.from({ length: 11 }, (_, index) => ({
              data: `image_${index}`,
            })));
            let captureTenPhotoComponent = wrapper.findWhere((node) => node.prop('testID') === 'uploadId');
            captureTenPhotoComponent.props().onPress()
            expect(openPickerSpy).toHaveBeenCalledTimes(3);
            let uploadVideoComponent = wrapper.findWhere((node) => node.prop('testID') === 'uploadVideId');
            uploadVideoComponent.props().onPress()
        });

        then('I can render chat with out errors', () => {
            let section1 = {
                section:
                    { date: 11 / 11 / 1111 }
            }

            const item = {
                item: {
                    value: {
                        id: 1,
                        message: 'Test message',
                        created_at: '11/11/1999'
                    }
                }
            };

            instance.setState({
                SelfUserId: '123'
            })
            instance.renderReportReasons(item)
            const mockItem = {
                attributes: {
                    id: 1,
                    message: 'Test message',
                    created_at: '11/11/1999'
                },
            };
            let wrapper = shallow(<Chat9 navigation={undefined} id={""} route={undefined} />)

            let button = wrapper.findWhere((node) => node.prop('testID') === 'sectionListBtn');
            button.props().keyExtractor(mockItem, 1)
            button.props().renderSectionFooter(section1)
        });
        then('I can open report modal with out errors', () => {
            instance.reportModal()
            let wrapper = shallow(<Chat9 navigation={undefined} id={""} route={undefined} />)
            let textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'reportModalId');
            textInputComponent.props().onRequestClose()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'flatListreport');
            textInputComponent.props().keyExtractor("", 1)
            const data = {
              value: "Other",
              translationPlaceHolder: "other"
            }
            const flatlistIdRender = textInputComponent.renderProp('renderItem')({ item: data, index: 0 })
            let radioBtnId = flatlistIdRender.findWhere((node) => node.prop('testID') === 'radioBtnId');
            radioBtnId.simulate("press")

            let radioBtnValueId = flatlistIdRender.findWhere((node) => node.prop('testID') === 'radioBtnValueId');
            radioBtnValueId.simulate("press")
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'cancleBtnId');
            textInputComponent.props().onPress()
            // const userMessageBtn1 = wrapper.findWhere((node) => node.prop('testID') === 'report');
            // userMessageBtn1.simulate("press")
            const mockItem = {
              item: {
                attributes: {
                    id: 1,
                    message: 'Test message',
                    created_at: '11/11/1999',
                    account_id:123,
                    attachments:[
                        {
                        id: 1,
                        message: 'Test message',
                        created_at: '11/11/1999',
                        account_id:1
                    },
                    {
                        id: 1,
                        message: 'Test message',
                        created_at: '11/11/1999',
                        account_id:1
                    }
                    ]
                },
              }

            };
            instance.renderChat(mockItem)
            instance.setState({
                SelfUserId:1
            })

            const clapEmojiBtn = wrapper.findWhere((node) => node.prop('testID') === 'txtInput');
            clapEmojiBtn.props().onChangeText("");




            // Simulate a press event by calling the onPress prop
            // userMessageBtn1.at(0).props().onLongPress();

            // const radioButtonInputComponent = wrapper.find('[testID="radioBtnId"]').first();
            // radioButtonInputComponent.at(0)?.props()



            //   // Simulate a press event by calling the onPress prop
            //   radioButtonInputComponent.props().onPress();

            // instance.selectReportReason(0)
            instance.renderReasons(1)
            instance.checkDate(11)
            instance.dateChange("","")
            // instance.messageComponent()



          //  let radioBtn = wrapper.findWhere((node) => node.prop('testID') === 'radioBtnValueId');
          //   radioBtn.simulate("press")
            // textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'descriptionTextId');
            // textInputComponent.props().onChangeText(jest.fn())

        })

        then('I can open render Option modal with out errors', () => {
            instance.renderOptions()
            let wrapper = shallow(<Chat9 navigation={undefined} id={""} route={undefined} />)
            let textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'renderOptionModal');
            textInputComponent.props().onRequestClose()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'touchOutSideRenderoptionModal');
            textInputComponent.props().onPressOut()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'muteNotificationId');
            textInputComponent.props().onPress()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'renderOptionReportId');
            textInputComponent.props().onPress()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'blockId');
            textInputComponent.props().onPress()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'deleteChatId');
            textInputComponent.props().onPress()
        })

        then('I can open emoji modal with out errors', () => {
            instance.renderEmojiModal()
            let navigation = {
                goBack: jest.fn()
            }
            let wrapper = shallow(<Chat9 navigation={navigation} id={""} route={undefined} />)
            let textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'emojisModalId');
            textInputComponent.props().onRequestClose()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'onpressOutEmoji');
            textInputComponent.props().onPressOut()


            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'emojiSelectorId');
            textInputComponent.props().onEmojiSelected()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === "goBackId");
            textInputComponent.simulate('press')
            expect(navigation.goBack).toBeTruthy()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'addImageBtnId');
            textInputComponent.props().onPress()
            let clapEmojiId = wrapper.findWhere((node) => node.prop('testID') === 'clapEmojiId');
            // clapEmojiId.simulate("press")
            instance.clapFunction()
            // textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'eyeEmojiId');
            // textInputComponent.props().onPress()
            instance.eyeTabFunction()
            instance.functionClapping()
            instance.functioneyeEmoji()
            instance.functionHeyEmoji()
            instance.checkToken()
            instance.onpressReport()


            // textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'descriptionTextId');
            // textInputComponent.props().onChangeText("aaa")
            instance.sayHeyFunction()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.props().onChangeText("")
            instance.onChangeNumber('t')
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'addFriendModalTrue');
            textInputComponent.props().onPress()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'emojiModalTrue');
            textInputComponent.props().onPress()
            textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'btnExample');
            textInputComponent.props().onPress()
        })

        then("I can load userChat list with out errors", () => {
            let value ={
                attributes:{
                    attachments:[],
                    message:[],
                    account_id:{},
                    chat_id:'',
                    id:'',

                    account:{
                    created_at:'',
                    date_of_birth:'',
                    device_id:'',
                    email:"",
                    full_name:"",
                    full_phone_number:'',
                    password_digest:'',
                    role_id:'',
                    unique_auth_id:'',
                    user_name:'',
                },
                attachment_type:"",
                }
            }
            let responseJson={
                data:{
                    attributes:{
                        friend_account:[
                            {
                                data:{
                                    attributes:{
                                        photo:"file//:imag.jpg"
                                    }
                                }
                            }
                        ],
                        messages:[
                            {
                                title:"Sender",
                                Date:'11/11/17'
                            },
                            {
                                title:"Sender",
                                Date:'11/11/17'
                            }
                        ]
                    }
                }
            }
            let responseJson1={
                data:{
                    attributes:{
                        friend_account:[
                            {
                                data:{
                                    attributes:{
                                        photo:"file//:imag.jpg"
                                    }
                                }
                            }
                        ],
                        messages:[

                        ]
                    }
                }
            }
            let errorResponse="Some thing went wrong"
            // let wrapper = shallow(<Chat9 navigation={undefined} id={""} route={undefined} />)
            instance.getChatHistorySuccessCallBack(responseJson);
            instance.getChatHistorySuccessCallBack(responseJson1);
            instance.getChatHistoryFailureCallBack(errorResponse);
            instance.deleteChatFailureCallBack(errorResponse)
            instance.createRoomSuccessCallBack(responseJson)
            instance.deleteUserMessageSuccessCallBack(responseJson)
            instance.getFollowersFailureCallBack(errorResponse)
            instance.deleteChatSuccessCallBack(responseJson)
            instance.createMessageSuccessCallBack(responseJson)
            instance.mergeSendMessage(value)
            expect(instance.getChatbyId())
});

          then("RestAPI will return token", () => {
            const magLogInSucessRestAPI = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            magLogInSucessRestAPI.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              magLogInSucessRestAPI
            );
            magLogInSucessRestAPI.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                meta: {
                  token:
                    "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
              }
            );
            instance.getChatByIdApi = magLogInSucessRestAPI;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
          });

          then("I can load followers list with out errors", () => {
            expect(instance.fetchMatchingResults(1))
          });

          then("RestAPI will return token", () => {
            const magLogInSucessRestAPI = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            magLogInSucessRestAPI.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              magLogInSucessRestAPI
            );
            magLogInSucessRestAPI.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                meta: {
                  token:
                    "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
              }
            );
            instance.getMatchingResultsCallId = magLogInSucessRestAPI;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
          });

          then("I can fetch matching user list with out errors", () => {
            expect(instance.getFollowers())
          });

          then("RestAPI will return token", () => {
            const magLogInSucessRestAPI = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            magLogInSucessRestAPI.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              magLogInSucessRestAPI
            );
            magLogInSucessRestAPI.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                meta: {
                  token:
                    "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
              }
            );
            instance.getFollowinglist = magLogInSucessRestAPI;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
          });

          then("I can load previousChat List with out errors", () => {
            // let wrapper = shallow(<Chat9 navigation={undefined} id={""} route={undefined} />)
            // instance.getChatHistorySuccessCallBack();
            // instance.getChatHistoryFailureCallBack();
            expect(instance.getPreviousChats())
          });

          then("RestAPI will return token", () => {
            const magLogInSucessRestAPI = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            magLogInSucessRestAPI.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              magLogInSucessRestAPI
            );
            magLogInSucessRestAPI.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                meta: {
                  token:
                    "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
              }
            );
            instance.getPrevChatsCallId = magLogInSucessRestAPI;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
          });

          then("I can check wheather chat exist with out errors", () => {

            instance.handleBackButtonClick();
            expect(instance.CheckWhetherChatExists())
          });

          then("RestAPI will return token", () => {
            const magLogInSucessRestAPI = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            magLogInSucessRestAPI.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              magLogInSucessRestAPI
            );
            magLogInSucessRestAPI.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                meta: {
                  token:
                    "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
              }
            );
            instance.getChatExistsCallId = magLogInSucessRestAPI;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
          });

          then("I can check the success response createRoom is receiving without error", () => {
            expect(instance.createRoom())
          });

          then("RestAPI will post data", () => {
            const magLogInSucessRestAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              magLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                magLogInSucessRestAPI
              );
              instance.createRoomApi = magLogInSucessRestAPI;
              runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

              instance.subscribeToChannel("1")
              instance.subscribeToChannel.call(instance, '123');

              const subscriptionData = {
                command: 'subscribe',
                identifier: JSON.stringify({
                  channel: 'ChatChannel',
                  id: "",
                }),
              };
          
              mockWebSocket.onopen();
              expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify(subscriptionData));
              expect(instance.isSubscribed).toBe(true);
          

            instance.isSubscribed = false;
            // Mock a new message event (should be ignored as isSubscribed is false)
            const newMessageEvent = {
              data: JSON.stringify({
                  message: {
                      action: "new_message",
                      chat_id: "123",
                      message: "Hello",
                      sender_id: "newMessage",
                  },
              }),
            };
            mockWebSocket.onmessage(newMessageEvent);

              // Mock confirm_subscription message
              const confirmSubscriptionEvent = {
                data: JSON.stringify({
                  type: "confirm_subscription",
                }),
              };
              mockWebSocket.onmessage(confirmSubscriptionEvent);
              expect(instance.isSubscribed).toBe(true);

              // Mock a ping message (should be ignored)
              const pingEvent = {
                data: JSON.stringify({
                  type: "ping",
                }),
              };
              mockWebSocket.onmessage(pingEvent);
              expect(instance.state.userChatHistory[0].data.length).toBe(1);

              const event = {
                data: JSON.stringify({
                  message: {
                    action: 'new_message',
                    chat_id: '123',
                    message: 'Hello',
                    sender_id: 'newMessage',
                  },
                }),
              };
              mockWebSocket.onmessage(event);
  
              expect(instance.state.userChatHistory[0].data[0].attributes.id).toBe('newMessage');

              const error = { message: 'Mock error' };
              const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
          
              mockWebSocket.onerror(error);
          
              expect(consoleErrorSpy).toHaveBeenCalledWith('WebSocket connection error:', error.message);

              let event_close = { code: 1000, reason: 'Normal closure' };
              const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
          
              mockWebSocket.onclose(event_close);
          
              expect(consoleLogSpy).toHaveBeenCalledWith(
                'WebSocket connection closed:',
                event_close.code,
                event_close.reason
              );

          }
          );

          then("I can delete message with out errors", () => {
            expect(instance.deleteMessage(1))
          });

          then("RestAPI will post data", () => {
            const magLogInSucessRestAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              magLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                magLogInSucessRestAPI
              );
              instance.deleteUserMessageApi = magLogInSucessRestAPI;
              runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
          }
          );

          then("I can report user with out errors", () => {
            expect(instance.reportUser())
          });

          then("RestAPI will post data", () => {
            const magLogInSucessRestAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              magLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                magLogInSucessRestAPI
              );
              instance.postReportUserCallId = magLogInSucessRestAPI;
              runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

              // instance.setState({ selectedReportReason: "Other", report_desc: "" })
              instance.onpressReport()
              instance.audioNavigationFunction()
              instance.chatNavigationFunction({})
              instance.profileNavigationFunction({})
              instance.onUserClick({})
              instance.setState({ loading: false })
              instance.functionClapping();
              instance.functioneyeEmoji();
              instance.functionHeyEmoji();
          }
          );


        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
