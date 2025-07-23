import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import {render, fireEvent, act} from '@testing-library/react-native';
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import Theme from "../../src/settingOptions/theme"
import { SwitchOff, SwitchOn } from "../../src/assets";


const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
        }
    },
    id: "Theme",
    route:{}
  }

const feature = loadFeature('./__tests__/features/Theme-scenario.feature');

defineFeature(feature, (test) => {
    
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'android' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Theme', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:Theme; 

        given('I am a User loading Theme', () => {
             render(<Theme {...screenProps}/>);
        });

        when('I navigate to the Theme', () => {
            // instance = exampleBlockA.instance() as Theme
        });

        then('Theme will load with out errors', () => {
            const { getByTestId } = render(<Theme {...screenProps} />);
            const touchable = getByTestId('privacy');
            fireEvent.press(touchable);
            expect(screenProps.navigation.navigate).toHaveBeenCalledTimes(1); 
        });

        then('toggles Theme switch when clicked', () => {
            const { getByTestId } = render(<Theme {...screenProps} />);
            const touchable = getByTestId('setTheme');

            const initialImage = getByTestId('themeImage');
            expect(initialImage.props.source).toEqual(SwitchOff); 
            
            fireEvent.press(touchable);

            const updatedImage = getByTestId('themeImage');
            expect(updatedImage.props.source).toEqual(SwitchOn);
        });

        then('I can leave the screen with out errors', () => {
           // expect(exampleBlockA).toBeTruthy();
        });
    });
});
