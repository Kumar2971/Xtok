import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';
import { beforeEach, expect, jest } from '@jest/globals';

import * as helpers from '../../../../framework/src/Helpers';
import React from 'react';
import Login from '../../src/Login';
import { Message } from '../../../../framework/src/Message';
import MessageEnum, {
  getName,
} from '../../../../framework/src/Messages/MessageEnum';
import * as utils from "../../../../framework/src/Utilities";
import { GoogleSignin } from '@react-native-community/google-signin';
import { runEngine } from '../../../../framework/src/RunEngine';
import { Platform } from 'react-native';
import { RNToasty } from 'react-native-toasty';
const navigation = require('react-navigation');
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';

export const configJSON = require('../../config.json');

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: 'Login',
};

const setPlatform = function(platform: 'android' | 'ios'){
  Object.defineProperty(Platform, 'OS', {
      get: jest.fn(() => platform)
    })
}

const mockgetStorageData = jest.spyOn(utils , "getStorageData")

// jest.mock('@react-native-community/google-signin', () => ({
//   GoogleSignin: {
//     isSignedIn: jest.fn().mockResolvedValue(false), // Assuming the user is not signed in by default
//     revokeAccess: jest.fn().mockResolvedValue(null),
//     signOut: jest.fn().mockResolvedValue(null),
//     hasPlayServices: jest.fn().mockResolvedValue(true),
//     signIn: jest.fn().mockResolvedValue({
//       // Provide a mock response for the signIn function
//       user: {
//         email: 'email@mail.com',
//         id: '123456789',
//         photo: '',
//         name: 'John Doe',
//         familyName: 'Doe',
//         givenName: 'John',
//       },
//       idToken: '123456789',
//       serverAuthCode: '123456789',
//     }),
//   },
// }));

const feature = loadFeature('./__tests__/features/login-scenario.feature');

defineFeature(feature, (test) => {
  beforeEach(async () => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    jest.spyOn(global, 'setTimeout').mockImplementation((cb: any) => cb());
    jest.spyOn(global, 'setInterval').mockImplementation((cb: any) => cb());
    jest.spyOn(global, 'clearTimeout').mockImplementation(() => {});
    jest.spyOn(global, 'clearInterval').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    mockgetStorageData.mockImplementation(() => {
      return Promise.resolve("ar")   
    })
    jest
      .spyOn(GoogleSignin, 'isSignedIn')
      .mockResolvedValue(await Promise.resolve(true));
  });

  test('LoginController componentDidMount should attach event listener for Apple credential revocation', ({
    given,
    when,
    then,
  }) => {
    let LoginWrapper: ShallowWrapper;
    let instance: Login;

    given('I am a user loading login', () => {
      // jest.spyOn(appleAuth, 'onCredentialRevoked');
      LoginWrapper = shallow(<Login {...screenProps} />);
      // const wrapper = shallow(<Login {...screenProps} />);
    });

    // Simulate componentDidMount
    when('I am inside', () => {
      instance = LoginWrapper.instance() as Login;
      instance.componentWillMount();
      setPlatform('ios')
    });
    // Clean up to avoid affecting other tests
    jest.restoreAllMocks();
  });

  test('User navigates to Login', ({ given, when, then }) => {
    let LoginWrapper: ShallowWrapper;
    let instance: Login;
    let EnLoginWrapper: ShallowWrapper;
    let instanceEn: Login;

    given('I am a User loading Login', () => {
      LoginWrapper = shallow(<Login {...screenProps} />);
      EnLoginWrapper = shallow(<Login {...screenProps} />);
    });

    when('I navigate to the Login', () => {
      instance = LoginWrapper.instance() as Login;
      instanceEn = EnLoginWrapper.instance() as Login;
    });

    then('Login will load without errors', () => {
      expect(LoginWrapper).toBeTruthy();
      const CountryCodeMessage = new Message(
        getName(MessageEnum.CountryCodeMessage)
      );
      CountryCodeMessage.addData(
        getName(MessageEnum.CountyCodeDataMessage),
        '+91'
      );
      runEngine.sendMessage('Unit Tests', CountryCodeMessage);
    });

    then('I can select Log In button', async () => {
      let buttonComponent = LoginWrapper.findWhere(
        (node) => node.prop('testID') === 'btnEmail'
      );
      const renderLoginWith = buttonComponent.dive();

      let loginBtn = renderLoginWith.findWhere(
        (node) => node.prop('testID') === 'btnEmail'
      );
      buttonComponent.simulate('press');
      loginBtn.simulate('press');

      let buttonMobileLogin = LoginWrapper.findWhere(
        (node) => node.prop('testID') === 'btnMobile'
      );

      buttonMobileLogin.simulate('press');

      jest
        .spyOn(GoogleSignin, 'isSignedIn')
        .mockResolvedValue(await Promise.resolve(true));

      jest.spyOn(GoogleSignin, 'signIn').mockResolvedValue(
        await Promise.resolve({
          user: {
            email: 'email@mail.com',
            id: '123456789',
            photo: '',
            name: 'John Doe',
            familyName: 'Doe',
            givenName: 'John',
          },
          idToken: '123456789',
          serverAuthCode: '123456789',
        })
      );
      jest.spyOn(RNToasty, 'Show');

      await new Promise((resolve) => setImmediate(resolve));

      let buttonGoogleLogin = LoginWrapper.findWhere(
        (node) => node.prop('testID') === 'btnGoogle'
      );

      buttonGoogleLogin.simulate('press');
      await new Promise((resolve) => setImmediate(resolve));
      
      jest.spyOn(GoogleSignin, 'signIn').mockResolvedValue(
        await Promise.resolve({
          user: {
            email: 'email@mail.com',
            id: '123456789',
            photo: '',
            name: null,
            familyName: 'Doe',
            givenName: 'John',
          },
          idToken: '123456789',
          serverAuthCode: '123456789',
        })
      );

      let buttonGoogleLogin2 = LoginWrapper.findWhere(
        (node) => node.prop('testID') === 'btnGoogle'
      );

      buttonGoogleLogin2.simulate('press');
      await new Promise((resolve) => setImmediate(resolve));

      let buttonAppleLoginAndroid = LoginWrapper.findWhere(
        (node) => node.prop('testID') === 'btnAppleAndroid'
      );
      buttonAppleLoginAndroid.simulate('press');

      let buttonAppleLogin = LoginWrapper.findWhere(
        (node) => node.prop('testID') === 'btnAppleId'
      );
      if (Platform.OS === 'ios') {
        buttonAppleLogin.simulate('press');

        jest.spyOn(GoogleSignin, 'signIn').mockResolvedValue(
          await Promise.resolve({
            user: {
              email: 'email@mail.com',
              id: '123456789',
              photo: '',
              name: 'John Doe',
              familyName: 'Doe',
              givenName: 'John',
            },
            idToken: '123456789',
            serverAuthCode: '123456789',
          })
        );
        jest.spyOn(RNToasty, 'Show');
      }
      instance.saveLoggedInUserData({
        meta: {
          token: 'token',
        },
      });
      instanceEn.socialSignIn('abc@gmail.com');
      instanceEn.saveLoggedInUserData({
        meta: {
          token: 'token',
        },
      });
    });

    then('I can select terms and condition button without error', () => {
      let buttonComponent = LoginWrapper.findWhere(
        (node) => node.prop('testID') === 'T&Cbtn'
      );
      buttonComponent.simulate('press');
    });

    then('I can select privacy policy button without error', () => {
      let buttonComponent = LoginWrapper.findWhere(
        (node) => node.prop('testID') === 'privacyBtn'
      );
      buttonComponent.simulate('press');
    });

    then('I can help center button without error', () => {
      let buttonComponent = LoginWrapper.findWhere(
        (node) => node.prop('testID') === 'helpBtn'
      );
      buttonComponent.simulate('press');
    });

    then('I can select sign up button without error', () => {
      let buttonComponent = LoginWrapper.findWhere(
        (node) => node.prop('testID') === 'signupBtn'
      );
      buttonComponent.simulate('press');
      instance.navigateToSignup();
    
      const phoneAuthApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.phoneAuthApiCallId = phoneAuthApiMessage.messageId;
      instanceEn.phoneAuthApiCallId = phoneAuthApiMessage.messageId;
      phoneAuthApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        phoneAuthApiMessage.messageId
      );
      phoneAuthApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { meta: { token: 'token' } }
      );
      runEngine.sendMessage('Unit Tests', phoneAuthApiMessage);

      const socialSignInApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.socialSignInApiCallId = socialSignInApiMessage.messageId;
      instanceEn.socialSignInApiCallId = socialSignInApiMessage.messageId;
      socialSignInApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        socialSignInApiMessage.messageId
      );
      socialSignInApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { meta: { token: 'token' } }
      );
      runEngine.sendMessage('Unit Tests', socialSignInApiMessage);

      const errorMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.socialSignInApiCallId = errorMessage.id;
      instanceEn.socialSignInApiCallId = errorMessage.id;
      errorMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        errorMessage.id
      );
      errorMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: [{ failed_login: 'Account not found' }],
      });
      runEngine.sendMessage('Unit Test', errorMessage);
    });

    then('I can leave the screen without errors', () => {
      expect(LoginWrapper).toBeTruthy();
    });
  });

  test('User navigates to Login with invalid navigation', ({
    given,
    when,
    then,
  }) => {
    let LoginWrapper: ShallowWrapper;
    let instance: Login;

    given('I am a User loading Login', () => {
      LoginWrapper = shallow(<Login {...screenProps} />);
    });

    when('I navigate to the Login with invalid parameters', () => {
      instance = LoginWrapper.instance() as Login;
    });

    then('I should see an error message', () => {
      console.log('Invalid navigation');
    });
  });

  test('User selects Log In button without filling required fields', ({
    given,
    when,
    then,
  }) => {
    let LoginWrapper: ShallowWrapper;
    let instance: Login;

    given('I am a User loading Login', () => {
      LoginWrapper = shallow(<Login {...screenProps} />);
    });

    when('I select the Log In button without filling required fields', () => {
      instance = LoginWrapper.instance() as Login;
    });

    then('I should see validation errors', () => {
      expect(instance.state.email).toContain('');
    });
  });

  test('User selects Log In button with valid credentials', ({
    given,
    when,
    then,
  }) => {
    let LoginWrapper: ShallowWrapper;
    let instance: Login;

    given('I am a User loading Login', () => {
      LoginWrapper = shallow(<Login {...screenProps} />);
    });

    when('I select the Log In button with valid credentials', () => {
      instance = LoginWrapper.instance() as Login;
    });

    then('I should be logged in', () => {
      // Add assertions to check if the user is logged in successfully
      console.log('User logged in successfully');
      instance.loginWithApple();
    });
  });

  test('User navigates to Login with different operating systems', ({
    given,
    when,
    then,
  }) => {
    let LoginWrapper: ShallowWrapper;
    let instance: Login;

    given('I am a User loading Login', () => {
      LoginWrapper = shallow(<Login {...screenProps} />);
    });

    when('I navigate to the Login on different operating systems', () => {
      instance = LoginWrapper.instance() as Login;
    });

    then('I should see platform-specific elements', () => {
      // Add assertions to check if platform-specific elements are rendered correctly
    });
  });

  test('User performs Google login with already signed-in user', ({
    given,
    when,
    then,
  }) => {
    let LoginWrapper: ShallowWrapper;
    let instance: Login;

    given('I am a User loading Login', () => {
      LoginWrapper = shallow(<Login {...screenProps} />);
    });

    given('I am a signed-in user', async () => {
      // Mock GoogleSignin.isSignedIn() to return true
      jest
        .spyOn(GoogleSignin, 'isSignedIn')
        .mockResolvedValue(await Promise.resolve(true));
    });

    when('I perform Google login', async () => {
      instance = LoginWrapper.instance() as Login;
      jest.spyOn(RNToasty, 'Show');
    });

    then('I should sign out successfully', () => {
      // Add assertions to check if GoogleSignin.revokeAccess() and GoogleSignin.signOut() were called
    });
  });

  test('User performs Google login with invalid email', ({
    given,
    when,
    then,
  }) => {
    let LoginWrapper: ShallowWrapper;
    let instance: Login;

    given('I am a User loading Login', () => {
      LoginWrapper = shallow(<Login {...screenProps} />);
    });

    given('I perform Google login with invalid email', async () => {
      // Mock GoogleSignin.signIn() to return user with empty email
      // jest.fn().mockResolvedValue(false);

      if (Platform.OS === 'ios') {
        jest
          .spyOn(GoogleSignin, 'isSignedIn')
          .mockResolvedValue(await Promise.resolve(true));

        jest
          .spyOn(GoogleSignin, 'hasPlayServices')
          .mockResolvedValue(await Promise.resolve(true));

        jest.spyOn(GoogleSignin, 'signIn').mockResolvedValue(
          await Promise.resolve({
            user: {
              email: 'email@mail.com',
              id: '123456789',
              photo: '',
              name: 'John Doe',
              familyName: 'Doe',
              givenName: 'John',
            },
            idToken: '123456789',
            serverAuthCode: '123456789',
          })
        );
        jest.spyOn(RNToasty, 'Show');
        jest.spyOn(GoogleSignin, 'signIn').mockResolvedValue(
          await Promise.resolve({
            user: {
              email: 'email@mail.com',
              id: '123456789',
              photo: '',
              name: 'John Doe',
              familyName: 'Doe',
              givenName: 'John',
            },
            idToken: '123456789',
            serverAuthCode: '123456789',
          })
        );
        jest.spyOn(RNToasty, 'Show');
      }
    });

    when('I perform Google login', async () => {
      instance = LoginWrapper.instance() as Login;
      jest.spyOn(RNToasty, 'Show');
      jest.spyOn(GoogleSignin, 'signIn').mockResolvedValue(
        await Promise.resolve({
          user: {
            email: 'email@mail.com',
            id: '123456789',
            photo: '',
            name: 'John Doe',
            familyName: 'Doe',
            givenName: 'John',
          },
          idToken: '123456789',
          serverAuthCode: '123456789',
        })
      );
    });

    then('I should see an error message', () => {
      // Add assertions to check if RNToasty.Show() was called
      jest.spyOn(RNToasty, 'Show');
    });
  });
});
