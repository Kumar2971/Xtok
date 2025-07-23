// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.useFakeTimers();
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock("react-native-vector-icons/AntDesign",()=>"Icon");

jest.mock('react-native-elements', () => ({
    Badge: jest.fn(),
    Button: jest.fn(),
    CheckBox: jest.fn(),
    Input: jest.fn(),
    SearchBar: jest.fn()
  }));
  