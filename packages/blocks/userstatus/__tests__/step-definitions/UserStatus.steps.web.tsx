import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import UserStatus from "../../src/UserStatus.web"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "UserStatus"
  }

const feature = loadFeature('./__tests__/features/UserStatus-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to UserStatus', ({ given, when, then }) => {
        let userStatusBlock:ShallowWrapper;
        let instance:UserStatus; 

        given('I am a User loading UserStatus', () => {
            userStatusBlock = shallow(<UserStatus {...screenProps}/>)
        });

        when('I navigate to the UserStatus', () => {
             instance = userStatusBlock.instance() as UserStatus
        });

        then('UserStatus will load with out errors', () => {
            expect(userStatusBlock).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(userStatusBlock).toBeTruthy()
        });
    });


});
