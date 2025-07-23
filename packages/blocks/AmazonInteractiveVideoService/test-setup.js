// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: "ios",
  select: () => null
}));

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
      )
      .mockImplementationOnce(
        () =>
          new Promise((resolve, reject) => {
            return reject("error")
          }),
      )
  };
});
// requestMultiple: jest.fn(() => new Promise(resolve => resolve({
//   'android.permission.CAMERA': 'granted',
//   'android.permission.RECORD_AUDIO': 'granted',
// }))),

jest.mock('react-native//Libraries/PermissionsAndroid/PermissionsAndroid', () => {
  const PermissionsAndroid = jest.requireActual(
    'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
  );
  console.log(PermissionsAndroid);
  return {
    ...PermissionsAndroid,
    check: jest.fn(() => new Promise(resolve => resolve(true))),
    request: jest.fn(() => new Promise(resolve => resolve(true))),
    requestMultiple: jest
    .fn()
    .mockImplementationOnce(
      () =>
        new Promise((resolve, reject) => {
          return resolve({
            "android.permission.CAMERA": "granted",
            "android.permission.RECORD_AUDIO": "never_ask_again",
          });
        }),
    )
    .mockImplementationOnce(
      () =>
        new Promise((resolve, reject) => {
          return resolve({
            "android.permission.CAMERA": "granted",
            "android.permission.RECORD_AUDIO": "granted",
          });
        }),
    )
    .mockImplementationOnce(
      () =>
        new Promise((resolve, reject) => {
          return resolve({
            "android.permission.CAMERA": "granted",
            "android.permission.RECORD_AUDIO": "denied",
          });
        }),
    )
    .mockImplementationOnce(
      () =>
        new Promise((resolve, reject) => {
          return reject("error")
        }),
    )
  };
});

jest.mock('react-native-share', () => ({
  default: jest.fn(),
  open:jest.fn((option)=> new Promise((resolve)=>resolve("opened"))),
}));

jest.mock("react-native-sqlite-storage", () => ({
  default: jest.fn(),
  openDatabase:jest.fn((option)=> {
    return{
      transaction : jest.fn((callback)=>{
        callback({executeSql:jest.fn((txt,input,successCallback,errorCallaback)=>{
          const category = [{"attributes": {"id": 7, "name": "Premium",}, "id": "7", "type": "category"}, 
          {"attributes": {"id": 9, "name": "Classic",}, "id": "9", "type": "category"}];
          const allCategory = [{"id":1,"item":JSON.stringify(category)}];
          successCallback("",{rows:{raw:jest.fn(()=>allCategory)}});
          errorCallaback("","")
        })})
      })
    }
  }),
}));

jest.mock("../../framework/src/StorageProvider.ts", () => {
  return {
    get: jest
      .fn()
      .mockImplementationOnce(() => null)
      .mockImplementation(() => "ar"),

    set: jest.fn(),
  };
});

jest.mock("../../framework/src/config.js", () => {
  return {
    baseURL : "baseurl/"
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

jest.mock("react-native-screen-mic-recorder",()=> {
  return (
   {
     startRecording:jest.fn().mockImplementationOnce(() => new Promise((resolve, reject) => {
      return reject("userDeniedPermission");
    })).mockImplementationOnce(() => new Promise((resolve, reject) => {
      return resolve("userDeniedPermission");
    }))
     .mockImplementation(() => new Promise((resolve, reject) => {
      return resolve("started");
    })),
     stopRecording:jest.fn().mockImplementationOnce(() => new Promise((resolve, reject) => {
      return reject("asd");
    })).mockImplementationOnce(() => new Promise((resolve, reject) => {
      return resolve("asd");
    })).mockImplementation(() => new Promise((resolve, reject) => {
      return resolve(null);
    }))
  }
  )
})

jest.mock('react-native/Libraries/Utilities/Platform', () => {
	const platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
	return {
		...platform,
		constants: {
			...platform.constants,
			reactNativeVersion: {
				major: 0,
				minor: 65,
				patch: 1,
			}
		},
	};
});

jest.mock('react-native-sound-player',()=> {
  return {
    loadUrl:jest.fn(),
    onFinishedLoading:jest.fn(),
    resume:jest.fn(),
    play: jest.fn(),
  }
 })

 jest.mock('react-native-elements', () => {
  return {
  Badge: jest.fn(),
  Button: jest.fn(),
  CheckBox: jest.fn(),
  Input: jest.fn(),
  SearchBar: jest.fn()
  }
});

jest.mock(
  'react-native-vector-icons/AntDesign',
  () => 'MockedAntDesign',
);

jest.mock("react-native-video", () => ({
  Video: jest.fn,
}));


jest.mock("react-native-simple-radio-button",()=>({
  RadioButton: jest.fn(),
  RadioButtonInput: jest.fn(),
  RadioButtonLabel: jest.fn()
}));

global.console.error = jest.fn();

global.console.warn = jest.fn();
let count = 0;
jest.spyOn(React, "useEffect").mockImplementation((cb) => {
  if(count < 50){
    count+=1;
  const re = cb();
  re && re();
}
});

function FormDataMock() {
  this.append = jest.fn();
}
global.FormData = FormDataMock