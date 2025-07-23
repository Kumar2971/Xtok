// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
jest.mock('../../framework/src/StorageProvider', () => {

})
jest.mock("../../components/src/i18n/translate",() => ({
    translate:jest.fn()
  }))

jest.mock("@react-native-firebase/dynamic-links", () => ({
  dynamicLinks: jest.fn()
}));

jest.mock("react-native-toasty", () => ({
  RNToasty: jest.fn()
}));

jest.mock("react-native-modal", () => ({
  ReactNativeModal: jest.fn()
}));

jest.mock("react-native-video", () => ({
  Video: jest.fn()
}));

jest.mock(
  'react-native-vector-icons/FontAwesome5',
  () => 'MockedFontAwesome5',
);