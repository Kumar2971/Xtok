// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
    OS: "android",
    select: () => null,
  }));
  
  const mediaDevicesMock = {
    getUserMedia: jest.fn(async () => {
      return new Promise((resolve) => {
        resolve();
      });
    }),
  };
  const clipboardMock = {
    writeText: jest.fn().mockImplementationOnce(() => Promise.resolve()),
  };
  global.navigator = { mediaDevices: mediaDevicesMock, clipboard: clipboardMock };
  global.navigator.permissions = {
    query: jest
      .fn()
      .mockImplementation(() => Promise.resolve().catch(() => jest.fn())),
  };
  global.MediaStream = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    addTrack: jest.fn(),
  }));
  global.localStorage = { setItem: jest.fn(), getItem: jest.fn() };
  global.window = { open: jest.fn() };
  
  jest.mock("@videosdk.live/react-sdk", () => {
    return {
      MeetingProvider: () => {
        return <></>;
      },
      MeetingConsumer: (props) => <>{props.children()}</>,
  
      useMeeting: (params) => {
        return {
          participants: { keys: () => ["testKey1", "testKey2"] },
          join: jest.fn(),
          changeWebcam: jest.fn(),
          leave: jest.fn(),
          onParticipantLeft: () => jest.fn(),
          disableScreenShare: jest.fn(),
          recordingState: jest.fn(),
        };
      },
      useParticipant: jest.fn().mockImplementation(() => ({})),
      usePubSub: () => ({
        publish: jest.fn(),
        messages: [
          {
            senderId: 1,
            senderName: "sender 1",
            message: "test",
            timestamp: new Date(),
          },
        ],
      }),
      MediaStream: () => ({ addTrack: jest.fn() }),
      ReactNativeForegroundService: {
        stopAll: () => jest.fn(),
      },
      Constants: {
        recordingEvents: true,
        livestreamEvents: true,
      },
    };
  });
  
  // jest.mock("hls.js", () => ({
  //   isSupported: jest.fn(),
  //   Hls: () => ({ loadSource: jest.fn() }),
  // }));
  
  jest.mock("@videosdk.live/react-native-sdk", () => {
    return {
      MeetingProvider: () => {
        return <></>;
      },
      MeetingConsumer: (props) => <>{props.children()}</>,
  
      useMeeting: (param) => {
        return {
          participants: { keys: () => ["testKey1", "testKey2"] },
          join: jest.fn(),
          changeWebcam: jest.fn(),
          leave: jest.fn(),
          onParticipantLeft: () => jest.fn(),
          disableScreenShare: jest.fn(),
        };
      },
      useParticipant: jest.fn().mockImplementation(() => ({})),
      usePubSub: () => ({
        publish: jest.fn(),
        messages: [
          {
            senderId: 1,
            senderName: "sender 1",
            message: "test",
            timestamp: new Date(),
          },
        ],
      }),
      MediaStream: () => ({ toURL: jest.fn() }),
      ReactNativeForegroundService: {
        stopAll: () => jest.fn(),
      },
      Constants: {
        recordingEvents: true,
        livestreamEvents: false,
      },
    };
  });
  
  // jest.mock("@react-native-async-storage/async-storage", () =>
  //   require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
  // );
  
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
  
  jest.mock("../../framework/src/StorageProvider.ts", () => {
    return {
      get: jest
        .fn()
        .mockImplementationOnce(() => null)
        .mockImplementation(() => "token"),
  
      set: jest.fn(),
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
  
  global.console.error = jest.fn();
  
  global.console.warn = jest.fn();
  
  jest.spyOn(React, "useEffect").mockImplementation((cb) => {
    const re = cb();
    re && re();
  });

  jest.mock('react-native-sound-player',()=> {
    return {
      loadUrl:jest.fn(),
      onFinishedLoading:jest.fn(),
    resume:jest.fn(),
    }
   })

jest.mock('react-native-gesture-handler/Swipeable', () => {});

jest.mock('react-native-elements', () => ({
  Badge: jest.fn(),
  Button: jest.fn(),
  CheckBox: jest.fn(),
  Input: jest.fn(),
  SearchBar: jest.fn()
}));

jest.mock("react-native-vector-icons/AntDesign",()=>"Icon");

jest.mock(
  'react-native-vector-icons/MaterialIcons',
  () => 'MockedMaterialIcons',
);

jest.mock("react-native-video",()=>"Video");

jest.mock("react-native-walkthrough-tooltip",()=> ({
  Tooltip : jest.fn()
}))