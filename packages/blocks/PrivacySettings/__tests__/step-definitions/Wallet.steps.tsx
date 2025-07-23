import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import Wallet from "../../src/settingOptions/wallet"
import {render, fireEvent, act} from '@testing-library/react-native';
import * as utils from "../../../../framework/src/Utilities"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        }
    },
    id: "Wallet",
    route:{}
  }

const feature = loadFeature('./__tests__/features/Wallet-scenario.feature');
const mockgetStorageData = jest.spyOn(utils, "getStorageData")

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'android' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        mockgetStorageData.mockImplementation(() => {
            return Promise.resolve("ar")
        })
    });

    test('User navigates to Wallet', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:Wallet; 

        given('I am a User loading Wallet', () => {
         render(<Wallet {...screenProps}/>);
        });

        when('I navigate to the Wallet', () => {
            // instance = exampleBlockA.instance() as Wallet
        });

        then('Wallet will load with out errors', () => {
          const { getByTestId } = render(<Wallet {...screenProps} />);
          const touchable = getByTestId('goBack');
          fireEvent.press(touchable);
          expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);  
        });

        then('navigate to Balance screen when Balance item is pressed', () => {
            const { getByTestId } = render(<Wallet {...screenProps} />);
            const touchable = getByTestId('balance');
            fireEvent.press(touchable);
            expect(screenProps.navigation.navigate("Balance"))
          });

          then('navigate to Exchange screen when Exchange item is pressed', () => {
            const { getByTestId } = render(<Wallet {...screenProps} />);
            const touchable = getByTestId('exchange');
            fireEvent.press(touchable);
            expect(screenProps.navigation.navigate("Exchange"))

          });
     
    then('I can leave the screen with out errors', () => {
           // expect(exampleBlockA).toBeTruthy();
        });
    });
});
