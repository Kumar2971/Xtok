// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
jest.useFakeTimers()

configure({ adapter: new Adapter() });
global.FormData = class {
  append = jest.fn();
};

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'macos',
  select: () => null
}));

jest.mock("@react-native-firebase/messaging", () => (jest.fn().mockReturnValue({
    onMessage: jest.fn((handler) => {
      const mockPayload = {
        data: {
          key1: 'value1',
          key2: 'value2',
        },
      };
      handler(mockPayload);
    })
}))
);

// jest.mock('@react-native-firebase/messaging', () => {
//   const mockMessaging = jest.fn().mockImplementation({
//     onMessage: jest.fn().mockReturnValue(
//       {
//         data:{
//             message: "Hello",
//             account_id: 1
//           }
//     }
//     ),
//   });

//   return () => ({
//     default: mockMessaging,
//   });
// });

jest.mock("@react-native-firebase/dynamic-links", () => ({
  dynamicLinks: jest.fn()
}));

jest.mock("react-native-image-crop-picker", () => ({
  openCamera: jest.fn().mockImplementation((options) => {
    return new Promise((resolve, reject) => {
      const image = {
        mediaType: "photo",
        compressImageQuality: 0.3,
        includeBase64: true,
        cropping: true,
        multiple: true,
      };
      resolve(image)

    })
  }),
  openPicker: jest.fn().mockImplementation((options) => {
    return new Promise((resolve, reject) => {
      const image = {
        path: "/path/to/image.jpg",
        mime: "image/jpeg",
        size: 1024,
        width: 1024,
        height: 1024,
      };
      resolve(image);
    });
  }),
})
);

jest.mock("react-native-simple-radio-button",()=>({
  RadioButton: jest.fn(),
  RadioButtonInput: jest.fn(),
  RadioButtonLabel: jest.fn()
}));

jest.mock("react-native-video", () => ({
  Video: jest.fn,
}));

jest.mock("react-native-emoji-selector", () => ({
  EmojiSelector: jest.fn,
  Categories:{
    symbols: jest.fn()
  }
}));

jest.mock('react-native/Libraries/Components/Keyboard/Keyboard', () => ({   addListener: jest.fn(),   removeListener: jest.fn(), }));
jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => {
    return {
      LegacyStorage: jest.fn(),
    };
  }),
}));