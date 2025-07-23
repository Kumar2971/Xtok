import React from "react";
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import Leaderboard from "../../src/Leaderboard"

import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
    getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import * as utils from "../../../../framework/src/Utilities";
import { translate } from "../../../../components/src/i18n/translate";

// import ActionSheet from "react-native-action-sheet";

const ApiResponse = require("../../__mocks__/ApiResponse.json");
const screenProps = {
    navigation: {
        goBack: jest.fn()
    },
    id: "Leaderboard"
  }

const mockgetStorageData = jest.spyOn(utils, "getStorageData")

const feature = loadFeature('./__tests__/features/Leaderboard-scenario.feature');

defineFeature(feature, (test) => {
    let wrapper: any;
    let instance: any;
    let LeaderBoard : ShallowWrapper;

    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        mockgetStorageData.mockImplementation(() => {
          return Promise.resolve("ar")
        })
    });

    test('User views the Leaderboard', ({ given, when, then, and }) => {
        given('I am a User', () => {
            wrapper = shallow(<Leaderboard {...screenProps}/>);
            LeaderBoard = shallow(<Leaderboard {...screenProps}/>);
            expect(wrapper).toBeTruthy();
        });

        when('I access the Leaderboard', () => {
            instance = wrapper.instance() as Leaderboard;
            // instance.ActionSheet = {
            //     show: jest.fn(),
            // };
            expect(wrapper).toBeTruthy();
        });

        then('the Leaderboard loads successfully', () => {
            // wrapper.find(`[title=${translate("ChooseOption")}]`).simulate('press');
            let ChooseOption = LeaderBoard.findWhere(
              (node) => node.prop("title") === translate("ChooseOption")
            );
            ChooseOption.props().onPress(1)
            wrapper.setState({ dropValue: translate("streamers") });
            wrapper.find('ControlTab').props().onTabPress(0);
            instance.handleTabSelectedIndex(2);
            instance.handleTabSelectedIndex(1);
            ChooseOption.props().onPress(0)
            wrapper.find('[testID="TEST_HIDE_KEYBOARD"]').simulate('press');
            expect(wrapper).toBeTruthy();
        });

        and("the leaderboard api has \"Invalid time range parameter\" result", () => {
            const tokenMsg: Message = new Message(
              getName(MessageEnum.SessionResponseMessage)
            );
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenMsg);

            const api = new Message(getName(MessageEnum.RestAPIResponceMessage));

            api.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                  message: "Invalid time range parameter"
              }
            );
            api.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              api.messageId
            );
            instance.apiGetLiveStreamDonatorList = api.messageId;
            runEngine.sendMessage("Unit Test", api);
            expect(instance.state.rankingData.length).toBe(0);
        });

        and("the leaderboard api has \"please donate something first\" result", () => {
            const tokenMsg: Message = new Message(
              getName(MessageEnum.SessionResponseMessage)
            );
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenMsg);

            const api = new Message(getName(MessageEnum.RestAPIResponceMessage));

            api.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                  message: "please donate something first"
              }
            );
            api.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              api.messageId
            );
            instance.apiGetLiveStreamDonatorList = api.messageId;
            runEngine.sendMessage("Unit Test", api);
            expect(instance.state.rankingData.length).toBe(0);
        });

        and("the live stream acceptor API request is made", () => {
            const tokenMsg: Message = new Message(
              getName(MessageEnum.SessionResponseMessage)
            );
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenMsg);

            const api = new Message(getName(MessageEnum.RestAPIResponceMessage));

            api.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                  data: ApiResponse
              }
            );
            api.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              api.messageId
            );
            instance.apiGetLiveStreamDonatorList = api.messageId;
            runEngine.sendMessage("Unit Test", api);
            expect(instance.state.rankingData.length).toBe(ApiResponse.length);
        });

        and("the live stream donator API request is made", () => {
            const tokenMsg: Message = new Message(
              getName(MessageEnum.SessionResponseMessage)
            );
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenMsg);

            const api = new Message(getName(MessageEnum.RestAPIResponceMessage));

            api.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                  data: ApiResponse
              }
            );
            instance.apiGetLiveStreamAcceptorList = api.messageId;
            runEngine.sendMessage("Unit Test", api);
            expect(instance.state.rankingData.length).toBe(ApiResponse.length);
        });

        and("test action sheet for donations", () => {
            wrapper.find('[testID="TEST_CHANGE_TAB"]').simulate('press');

            // (wrapper.find("ActionSheet").props() as any).onPress(0);
            // (wrapper.find("ActionSheet").props() as any).onPress(1);
            // expect(instance.ActionSheet.show).toHaveBeenCalled();
        });


        and('click the back button', () => {
            wrapper.find('[testID="TEST_BACK_BUTTON"]').simulate('press');
            instance.handleBackButtonClick();
            expect(screenProps.navigation.goBack).toBeCalled();
        });

        then('I can exit the screen without encountering any errors', () => {
            instance.componentWillUnmount()
            expect(wrapper).toBeTruthy();
        });
    });


});
