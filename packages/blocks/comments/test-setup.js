// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

jest.mock('@react-native-async-storage/async-storage', () => ({
  LegacyStorage: jest.fn(),
}));



jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));
jest.mock("@react-native-camera-roll/camera-roll", () => ({ CameraRoll: {} }));
jest.mock("rn-fetch-blob", () => ({}));
jest.mock('react-native-share', () => ({
  __esModule: true,
  default: jest.fn(),
  open: jest.fn(),
  shareSingle: jest.fn(),
  Social:{
    WHATSAPP: "WHATSAPP",
    INSTAGRAM: "INSTAGRAM",
    TWITTER: "TWITTER",
    EMAIL:"EMAIL",
    FACEBOOK:"FACEBOOK",
    SNAPCHAT:"SNAPCHAT"
  }
}));
jest.mock("react-native-fs", () => ({}));
jest.mock("@react-native-firebase/messaging", () => ({}));
jest.mock("react-native-permissions", () => ({}));
jest.mock("../../components/src/VideoComponent", () => ({}));
jest.mock("@react-native-camera-roll/camera-roll", () => ({}));

jest.mock("@react-native-firebase/dynamic-links", () => {
  return function () {
    return {
      getInitialLink: async () => ({
        url: 'fake-link',
      }),
      dynamicLinks: jest.fn().mockImplementation(() => ({
        buildShortLink: jest.fn().mockImplementation(x => x)
      }
      ))
    };
  };
});

jest.mock("react-native-sqlite-storage", () => ({
  default: jest.fn(),
  openDatabase:jest.fn((option)=> {
    return{
      transaction : jest.fn((callback)=>{
        callback({executeSql:jest.fn(async(txt,input,successCallback,errorCallaback)=>{
          successCallback("",{rows:{raw:jest.fn(()=>{})}});
          errorCallaback("","")
        })})
      })
    }
  }),
}));

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  let platform = {
    OS: 'android',
  }

  const select = jest.fn().mockImplementation((obj) => {
    const value = obj[platform.OS]
    return !value ? obj.default : value
  })

  platform.select = select

  return platform
});

jest.mock("react-native-permissions", () => {
  const Permissions = jest.requireActual("react-native-permissions/mock");

  return {
    ...Permissions,
    check: jest.fn(() => Promise.resolve(true)),
    requestMultiple: jest
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise((resolve, reject) => {
            return resolve({
              "ios.permission.CAMERA": "granted",
              "ios.permission.MICROPHONE": "granted",
            });
          }),
      )
      .mockImplementationOnce(
        () =>
          new Promise((resolve, reject) => {
            return resolve({
              "ios.permission.CAMERA": "never_ask_again",
              "ios.permission.MICROPHONE": "never_ask_again",
            });
          }),
      )
      .mockImplementationOnce(
        () =>
          new Promise((resolve, reject) => {
            return resolve({
              "ios.permission.CAMERA": "granted",
              "os.permission.MICROPHONE": "denied",
            });
          }),
      ),
  };
});

jest.mock('react-native//Libraries/PermissionsAndroid/PermissionsAndroid', () => {
  const PermissionsAndroid = jest.requireActual(
    'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
  );
  console.log(PermissionsAndroid);
  return {
    ...PermissionsAndroid,
    check: jest.fn(() => new Promise(resolve => resolve(true))),
    request: jest.fn(() => new Promise(resolve => resolve(true))),
    requestMultiple: jest.fn(() => new Promise(resolve => resolve(true)))
  };
});

jest.mock("react-native/Libraries/Utilities/Dimensions", () => {
  const diamension = jest.requireActual(
    "react-native/Libraries/Utilities/Dimensions",
  );
  return {
    ...diamension,

    addEventListener: jest.fn().mockImplementation((event, cb) => {
      return cb({});
    }),
    get: jest.fn().mockReturnValue({ width: 100, height: 100 }),
  };
});

jest.mock("react-native-modal",()=>"Modal");

jest.mock("react-native-toasty",()=>({
  RNToasty: jest.fn()
}));

jest.mock("react-native-emoji-board",()=>({
  EmojiBoard: jest.fn()
}));

jest.mock("react-native-parsed-text",()=>({
  ParsedText: jest.fn()
}));

jest.mock("react-native-simple-radio-button",()=>({
  RadioButton: jest.fn(),
  RadioButtonInput: jest.fn(),
  RadioButtonLabel: jest.fn()
}));
// @ts-ignore
global.FormData = require('react-native/Libraries/Network/FormData');

configure({ adapter: new Adapter() });
