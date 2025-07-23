import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from 'framework/src/Helpers'
import React from "react";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";
import PerformanceTracker from "../../src/PerformanceTracker";
const navigation = require("react-navigation")

let message: Message = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
)

message.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    {
        data: []
    }
)
let responseJson = {
    data: [{
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
    id: "PerformanceTracker"
}
const feature = loadFeature('./__tests__/features/PerformanceTracker-scenario.feature');


defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to PerformanceTracker', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: PerformanceTracker;

        given('I am a User loading PerformanceTracker', () => {
            exampleBlockA = shallow(<PerformanceTracker {...screenProps}  />);
        });

        when('I navigate to the PerformanceTracker', () => {
            instance = exampleBlockA.instance() as PerformanceTracker
        });

        then('PerformanceTracker will load with out errors', async() => {
            let uploadButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'UserProfileBasicBlock');
            uploadButton.simulate('press')
            let hideKeyboardTouch = exampleBlockA.findWhere((node) => node.prop('testID') === 'hideKeyboardTouch');
            hideKeyboardTouch.simulate('press')
            instance.getAccountsReached()
            instance.getContentsShared()
            instance.getContentsShared()
            instance.getAccountsEngaged()
            instance.getImpressions()
            instance.getReachedAudience()
            instance.getVisitors()
            instance.checkData()
            instance.dateTypeDropDown()
            instance.accountsEngagedSelection()
            instance.reachedAudienceDisplay()
            instance.impressionsReachedDisplay()
            instance.visitorsDisplaySelection()
            instance.contentsSharedDisplaySelection()
            instance.renderMainContainer()
          
        });

        then('I can leave the screen with out errors', () => {
            instance.setState({screenType :"accounts_engaged"})
            expect(instance. performanceTypeSelection())
            instance.setState({screenType :"accounts_reached"})
            expect(instance. performanceTypeSelection())
            instance.setState({screenType :"contents_shared"})
            expect(instance. performanceTypeSelection())
            instance.setState({screenType :"impressions"})
            expect(instance. performanceTypeSelection())
            instance.setState({screenType :"reached_audience"})
            expect(instance. performanceTypeSelection())
            instance.setState({screenType :"visitors"})
            expect(instance. performanceTypeSelection())
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});


