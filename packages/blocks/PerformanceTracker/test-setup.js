// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock('react-native-chart-kit', () => ({
    LineChart: jest.fn()
}));

jest.mock(
    'react-native-vector-icons/Feather',
    () => 'MockedFeather',
);


jest.mock(
    'react-native-progress',
    () => ({
        Progress: jest.fn()
    })
);

jest.mock(
    'react-native-element-dropdown',
    () => ({
        Dropdown: jest.fn()
    })
);

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

