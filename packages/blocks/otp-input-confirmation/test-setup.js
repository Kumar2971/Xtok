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
jest.mock("../../components/src/i18n/translate",() => ({
  translate:jest.fn()
}))

jest.mock("react-native-confirmation-code-field",() => ({

}))
configure({ adapter: new Adapter() });
