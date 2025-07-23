// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'react-native-gesture-handler/jestSetup';

configure({ adapter: new Adapter() });

jest.mock("@react-native-async-storage/async-storage", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        LegacyStorage: jest.fn(),
      };
    }),
  }));
  
jest.mock('react-native-localize',()=>{
    const RNLocalize={
        indBestAvailableLanguage:()=>{},
        findBestAvailableLanguage:()=>{}
    }
    return RNLocalize;
})