import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import DraftScreen from "../../src/DraftScreen";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
const navigation = require("react-navigation")
import { BackHandler } from "react-native";

let message: Message = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  )

  message.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    {
      data: []
    }
  )
  let responseJson={
    data:[{
    }
    ]
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
        }),
    },
    route:{params:{attributes: {comment_setting:"Allow all comments",visibility_setting:"Public",audience_setting:"No restrictions to viewers"}}},
    id: "DraftScreen"
}

const screenProps1 = {
    navigation: {
      state: { params: {} },
      dispatch: jest.fn(),
      goBack: jest.fn(),
      navigate: jest.fn(),
    },
    route:{params:{attributes :{comment_setting:"Hold potentially inappropriate comments for review",visibility_setting:"Unlisted"}}},
    id: "DraftScreen"
}

const screenProps2 = {
    navigation: {
      state: { params: {} },
      dispatch: jest.fn(),
      goBack: jest.fn(),
      navigate: jest.fn(),
    },
    route:{params:{attributes :{comment_setting:"Hold all comments for review",visibility_setting:"Private"}}},
    id: "DraftScreen"
}

const screenProps3 = {
    navigation: {
      state: { params: {} },
      dispatch: jest.fn(),
      goBack: jest.fn(),
      navigate: jest.fn(),
    },
    route:{params:{attributes :{comment_setting:"Disable comments"}}},
    id: "DraftScreen"
}

const screenProps4 = {
    navigation: {
      state: { params: {} },
      dispatch: jest.fn(),
      goBack: jest.fn(),
      navigate: jest.fn(),
    },
    route:{params:{attributes:{}}},
    id: "DraftScreen"
}
const feature = loadFeature('./__tests__/features/DraftScreen-scenario.feature');


defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to DraftScreen', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DraftScreen;

        given('I am a User loading DraftScreen', () => {
            exampleBlockA = shallow(<DraftScreen  {...screenProps} />);
        });

        when('I navigate to the DraftScreen', () => {
            instance = exampleBlockA.instance() as DraftScreen
            instance.componentDidMount();
        });

        then('DraftScreen will load with out errors', () => {

            let buttonPress = exampleBlockA.findWhere((node) => node.prop('testID') === 'cancelKey');
            buttonPress.simulate('press')
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'upload');
            textInputComponent.simulate('press')
            let topImagePress = exampleBlockA.findWhere((node) => node.prop('testID') === 'topImageKey');
            topImagePress.simulate('press')
            let deleteImagePress = exampleBlockA.findWhere((node) => node.prop('testID') === 'deleteKey');
            deleteImagePress.simulate('press')
            let uploadUpdatedData = exampleBlockA.findWhere((node) => node.prop('testID') === 'uploadUpdatedData');
            uploadUpdatedData.simulate('press')
            let uploadButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'uploadButtonKey');
            uploadButton.simulate('press')
            instance.handleBackButtonClick()
        });


        then("I can check the success response getAccountDraftsId is receiving without error", () => {
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                 responseJson
                );
            instance.getAccountDraftsId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
          });
        then("I can check the success response getAccountDraftsId is receiving with error", () => {
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            let responseJson = {
                data:["No Posts Available"]
            }
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getAccountDraftsId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        });
        then("I can check the success response getAccountDraftsId is receiving with fail", () => {
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            let responseJson = {
                errors:[{
                    message:"1"
                }]
            }
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getAccountDraftsId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        });
        then("I can check the success response getAccountDraftsId is receiving with undefined", () => {
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            let responseJson = {

            }
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            instance.getAccountDraftsId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        });
          then("I can check the success response getDeleteDraftsId is receiving without error", () => {
            let responseJson={
                data:[{
                }
                ],
                errors:[{
                    message:"Something went wrong"
                }]
            }
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
            responseJson
                );
            instance.getDeleteDraftsId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)

          });

          then("I can check the success response getUploadDraftsId is receiving without error", () => {
            let responseJson={
                data:[{
                }
                ],
                errors:[{
                    message:"Something went wrong"
                }]
            }
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
            responseJson
                );
            instance.getUploadDraftsId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)


            message.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              message.messageId
            )
            instance.getUploadDraftsId = message.messageId
            instance.receive('test', message)

            message.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                message.messageId
              )
              instance.getDeleteDraftsId = message.messageId
              instance.receive('test', message)
          });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('User navigates to DraftScreen with param1', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DraftScreen;

        given('I am a User loading DraftScreen', () => {
            exampleBlockA = shallow(<DraftScreen  {...screenProps1} />);
        });

        when('I navigate to the DraftScreen', () => {
            instance = exampleBlockA.instance() as DraftScreen
            instance.componentDidMount();
        });

        then('DraftScreen will load with out errors', () => {
            let uploadUpdatedData = exampleBlockA.findWhere((node) => node.prop('testID') === 'uploadUpdatedData');
            uploadUpdatedData.simulate('press')
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('User navigates to DraftScreen with param2', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DraftScreen;

        given('I am a User loading DraftScreen', () => {
            exampleBlockA = shallow(<DraftScreen  {...screenProps2} />);
        });

        when('I navigate to the DraftScreen', () => {
            instance = exampleBlockA.instance() as DraftScreen
            instance.componentDidMount();
        });

        then('DraftScreen will load with out errors', () => {
            let uploadUpdatedData = exampleBlockA.findWhere((node) => node.prop('testID') === 'uploadUpdatedData');
            uploadUpdatedData.simulate('press')
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('User navigates to DraftScreen with param3', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DraftScreen;

        given('I am a User loading DraftScreen', () => {
            exampleBlockA = shallow(<DraftScreen  {...screenProps3} />);
        });

        when('I navigate to the DraftScreen', () => {
            instance = exampleBlockA.instance() as DraftScreen
            instance.componentDidMount();
        });

        then('DraftScreen will load with out errors', () => {
            let uploadUpdatedData = exampleBlockA.findWhere((node) => node.prop('testID') === 'uploadUpdatedData');
            uploadUpdatedData.simulate('press')
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('User navigates to DraftScreen with param4', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DraftScreen;

        given('I am a User loading DraftScreen', () => {
            exampleBlockA = shallow(<DraftScreen  {...screenProps4} />);
        });

        when('I navigate to the DraftScreen', () => {
            instance = exampleBlockA.instance() as DraftScreen
            instance.componentDidMount();
        });

        then('DraftScreen will load with out errors', () => {
            let uploadUpdatedData = exampleBlockA.findWhere((node) => node.prop('testID') === 'uploadUpdatedData');
            uploadUpdatedData.simulate('press')
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
    });

});
