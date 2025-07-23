// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock('react-native-elements', () => {
    const React = require('react');
    const { View } = require('react-native');
  
    const SearchBar = (props) => {
      return <View testID={props.testID} />;
    };
  
    return {SearchBar};
  });

  jest.mock('react-native-vector-icons/Feather', () => {
    const React = require('react');
    const { View } = require('react-native');
  
    const Feather = (props) => {
      return <View testID={props.testID} />;
    };
  
    return Feather;
  });

  jest.mock('react-native-google-places-autocomplete', () => {
    const React = require('react');
    const { View } = require('react-native');
  
    const GooglePlacesAutocomplete = (props) => {
      return <View testID={props.testID} />;
    };
  
    return {GooglePlacesAutocomplete};
  });

jest.mock('react-native-vector-icons/AntDesign', () => {
    const React = require('react');
    const { View } = require('react-native');
  
    const AntDesign = (props) => {
      return <View testID={props.testID} />;
    };
  
    return AntDesign;
  });

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

jest.mock("react-native-maps", () => "Maps");

jest.mock('react-native-responsive-screen', () => ({
  heightPercentageToDP: jest.fn((percent) => percent),
  widthPercentageToDP: jest.fn((percent) => percent),
}));