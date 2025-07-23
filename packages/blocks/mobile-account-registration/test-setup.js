// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => {
    return {
      LegacyStorage: jest.fn(),
    };
  }),
}));

jest.mock("react-native-image-crop-picker", () => ({
  openPicker: jest.fn().mockResolvedValue({
    path: 'file://myimg/img.jpg',
    size: 2000
  }),
  openCamera: jest.fn().mockResolvedValue({
    path: 'file://myimg/img.jpg',
    size: 2000
  })
}));

jest.mock('react-native-elements', () => ({
  Button: jest.fn(),
  Input: jest.fn(),
  SearchBar: jest.fn(),
  CheckBox: jest.fn(),
}));

jest.mock('react-native-elements', () => ({
  Badge: jest.fn(),
  Button: jest.fn(),
  CheckBox: jest.fn(),
  Input: jest.fn(),
  SearchBar: jest.fn()
}));

jest.mock(
  'react-native-vector-icons/AntDesign',
  () => 'MockedAntDesign',
);

configure({ adapter: new Adapter() });