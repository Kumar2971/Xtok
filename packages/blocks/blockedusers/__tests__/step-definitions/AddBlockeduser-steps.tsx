import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import AddBlockeduser from "../../src/AddBlockeduser";
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
id: "AddBlockeduser"
}
const feature = loadFeature('./__tests__/features/AddBlockeduser-scenario.feature');


defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AddBlockeduser', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: AddBlockeduser;

        given('I am a User loading AddBlockeduser', () => {
            exampleBlockA = shallow(<AddBlockeduser {...screenProps} />);
        });

        when('I navigate to the AddBlockeduser', () => {
            instance = exampleBlockA.instance() as AddBlockeduser
        });

        then('AddBlockeduser will load with out errors', () => {

            let buttonPress = exampleBlockA.findWhere((node) => node.prop('testID') === 'Background');
            buttonPress.simulate('press')
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputTitle');
            textInputComponent.simulate("changeText", "dsds")

            let addBlockButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'Background');
            addBlockButton.simulate('press')
            instance.hideKeyboard()
            instance.setTitle
            instance.addBlockeduserCall()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
