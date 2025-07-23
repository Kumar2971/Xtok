// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


jest.mock("react-native-chart-kit", () => ({
    StackedBarChart: jest.fn,
}));

configure({ adapter: new Adapter() });
