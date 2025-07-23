// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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

jest.mock("react-native-elements",()=>(jest.fn().mockReturnValue({
  
  rightIcon:jest.fn()
  }
)))
jest.mock("../../components/src/Custombutton",()=>(jest.fn().mockReturnValue({
  
  CustomButton:jest.fn()
  }
)))

global.FormData = class {
  append = jest.fn();
};

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


jest.mock('@react-native-community/datetimepicker', () => {
  return {
    DateTimePickerAndroid: {
      open: jest.fn((config) => {
        const newDate = new Date('2023-08-23T10:30:00'); 
        config.onChange({ type: 'set', newDate }); 
      }),
    },
  };
});

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

jest.mock('react-native-parsed-text', () => {
  jest.fn()
});

jest.mock('react-native-elements', () => ({
  Badge: jest.fn(),
  Button: jest.fn(),
  CheckBox: jest.fn(),
  Input: jest.fn(),
  SearchBar: jest.fn()
}));

jest.mock("../../framework/src/StorageProvider", () => {
  let store = {}
  return {
    set: function (key, value) {
      store[key] = value.toString();
    },
    get: function (key) {
      return store[key];
    },
    remove: function (key) {
      delete store[key];
    },
  };
});