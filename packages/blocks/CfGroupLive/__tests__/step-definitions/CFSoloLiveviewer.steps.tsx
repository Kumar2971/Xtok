import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import CFSoloLiveviewer from "../../src/CFSoloLiveviewer";
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
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
  isFocused: jest.fn()
},
id: "CFSoloLiveviewer"
}
const feature = loadFeature('./__tests__/features/CFSoloLiveviewer-scenario.feature');


defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to CFSoloLiveviewer', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: CFSoloLiveviewer;

        given('I am a User loading CFSoloLiveviewer', () => {
            exampleBlockA = shallow(<CFSoloLiveviewer {...screenProps} />);
        });

        when('I navigate to the CFSoloLiveviewer', () => {
            instance = exampleBlockA.instance() as CFSoloLiveviewer
        });

        then('CFSoloLiveviewer will load with out errors', () => {

            let buttonPress = exampleBlockA.findWhere((node) => node.prop('testID') === 'HourlyTouch');
            buttonPress.simulate('press')
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'BackTouch');
            textInputComponent.simulate("changeText", "dsds")

            // let addBlockButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'RejoinTouch');
            // addBlockButton.simulate('press')
            let ImageTouch = exampleBlockA.findWhere((node) => node.prop('testID') === 'ImageDimeTouch');
            ImageTouch.simulate('press')
          
            let RequestTouch = exampleBlockA.findWhere((node) => node.prop('testID') === 'RequestTouch');
            RequestTouch.simulate('press')
            // instance.invitationModel()
            // instance.header()
            // instance.bottomBar()
            // instance.AcceptModel()
            // instance.requestModel()
            // RequestTouch
            // instance.hideKeyboard()
            // instance.setTitle
            // instance.CFSoloLiveviewerCall()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
