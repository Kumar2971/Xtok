// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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
jest.mock("react-native-fs", () => ({
  readFile: jest.fn(),
}));

jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {
 
    CAMERA: 'camera',
    STORAGE: 'storage',
  },
  RESULTS: {
 
    GRANTED: 'granted',
    DENIED: 'denied',
  },
  check: jest.fn(),
  request: jest.fn(),
}));

jest.mock("react-native-snap-carousel", () => {
  const React = require('react');
  const { Text, TouchableOpacity, ImageBackground } = require('react-native');

  const MockCarousel = React.forwardRef((props, ref) => {
    const [currentItem, setCurrentItem] = React.useState(0);
  
    // Implement the mock methods for the Carousel component
    const getCurrentItem = () => currentItem;
  
    const onSnapToItem = (itemIndex) => {
      setCurrentItem(itemIndex);
    };
  
    React.useImperativeHandle(ref, () => ({
      getCurrentItem,
      onSnapToItem,
    }));
    return (
      <TouchableOpacity>
        <ImageBackground style={{width:50,height:50}}><Text>Clear</Text></ImageBackground>
        </TouchableOpacity>
    );
  });

  return MockCarousel;
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => {
    return {
      LegacyStorage: jest.fn(),
    };
  }),
}));

jest.mock('react-native/Libraries/PermissionsAndroid/PermissionsAndroid', () => {
  const PermissionsAndroid = jest.requireActual(
    'react-native/Libraries/PermissionsAndroid/PermissionsAndroid',
  );
  return {
    ...PermissionsAndroid,
    check: jest.fn(() => new Promise(resolve => resolve(true))),
    request: jest.fn(() => new Promise(resolve => resolve(true))),
    requestMultiple: jest.fn(() => new Promise(resolve => resolve({
      'android.permission.CAMERA': 'granted',
      'android.permission.RECORD_AUDIO': 'granted',
    }))),
  };
});

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
        sourceURL:"/path/to/image.jpg",
        path: "/path/to/image.jpg",
        mime: "image/jpeg",
        filename: "image.jpg",
        size: 1024,
        width: 1024,
        height: 1024,
      };
      resolve(image);
    });
  }),
}));

jest.mock('react-native-elements', () => ({
  Badge: jest.fn(),
  Button: jest.fn(),
  CheckBox: jest.fn(),
  Input: jest.fn(),
  SearchBar: jest.fn()
}));

jest.mock("react-native-material-dropdown", () => ({
  Dropdown: jest.fn,
}));

jest.mock("react-native-video", () => ({
  Video: jest.fn,
}));
jest.mock("react-native-google-places-autocomplete", () => ({
  GooglePlacesAutocomplete: jest.fn,
}));

jest.mock("../react-native-deepar/src/index", () => ({
  DeepAR: jest.fn(),
  Camera: {
    requestCameraPermission: jest.fn(),
    requestMicrophonePermission: jest.fn()
  },
  CameraPermissionRequestResult:{
    AUTHORIZED: jest.fn()
  },
  CameraPositions:{
    FRONT: jest.fn(),
    BACK: jest.fn()
  },
  ErrorTypes:{

  }
}));

jest.mock("react-native-vector-icons/FontAwesome5",()=>"mockFontAwesome5");

jest.mock("react-native-vector-icons/MaterialCommunityIcons",()=>"Icon");
jest.mock(
  'react-native-vector-icons/FontAwesome',
  () => 'MockedFontAwesome',
);
jest.mock(
  'react-native-vector-icons/MaterialIcons',
  () => 'MockedMaterialIcons',
);
jest.mock(
  'react-native-vector-icons/Feather',
  () => 'MockedFeather',
);
jest.mock(
  'react-native-vector-icons/AntDesign',
  () => 'MockedAntDesign',
);

jest.mock("react-native-modal",()=>"Modal");
jest.mock("react-native-vector-icons/Entypo",()=>"MockEntypo")
