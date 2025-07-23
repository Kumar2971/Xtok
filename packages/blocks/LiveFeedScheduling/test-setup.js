// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

function FormDataMock() {
    this.append = jest.fn();
  }
  
global.FormData = FormDataMock;

jest.mock("react-native-modal",()=>"Modal");

jest.mock("react-native-calendar-picker",()=>"CalendarPicker");

jest.mock('react-native-elements', () => ({
    Badge: jest.fn(),
    Button: jest.fn(),
    CheckBox: jest.fn(),
    Input: jest.fn(),
    SearchBar: jest.fn()
}));

jest.mock("react-native-video", () => ({
    Video: jest.fn,
}));