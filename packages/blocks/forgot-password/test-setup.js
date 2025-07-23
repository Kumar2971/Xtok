// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('../../framework/src/StorageProvider', () => {

})
jest.mock("../../components/src/i18n/translate",() => ({
    translate:jest.fn()
}))

jest.mock(
    'react-native-vector-icons/AntDesign',
    () => 'MockedAntDesign',
);
  
jest.mock("react-native-modal",()=>"Modal");

jest.mock('react-native-elements', () => ({
    Badge: jest.fn(),
    Button: jest.fn(),
    CheckBox: jest.fn(),
    Input: jest.fn(),
    SearchBar: jest.fn()
}));

jest.mock("react-native-confirmation-code-field",() => ({
    CodeField: jest.fn(),
    Cursor: jest.fn()
}))
