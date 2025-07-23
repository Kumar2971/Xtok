// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NativeModules } from 'react-native';

NativeModules.RNCAsyncStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    mergeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    flushGetRequests: jest.fn(),
    multiGet: jest.fn(),
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
    multiMerge: jest.fn(),
};
NativeModules.RNCNetInfo = {
    getCurrentConnectivity: jest.fn(),
    isConnectionMetered: jest.fn(),
    addListener: jest.fn(),
    removeListeners: jest.fn()
};

configure({ adapter: new Adapter() });

jest.mock("@react-native-community/async-storage", () => ({
  create: jest.fn(() => ({
    set: jest.fn(),
    get: jest.fn(),
    remove: jest.fn(),
  })),
}));

function FormDataMock() {
    this.append = jest.fn();
}
global.FormData = FormDataMock;
global.alert = jest.fn();


jest.mock('react-native-elements', () => ({
    Badge: jest.fn(),
    Button: jest.fn(),
    CheckBox: jest.fn(),
    Input: jest.fn(),
    SearchBar: jest.fn()
}));

jest.mock(
    'react-native-image-crop-picker',
    () => {
        const ImagePicker = {
            openCamera: (options) => Promise.resolve([{"cropRect":{"height":320,"width":320,"y":0,"x":80},"modificationDate":"1672312526000","size":23376,"mime":"image/jpeg","height":400,"width":400,"path":"E70634C5-1DA1-40A7-BAEA-D20E72707AE9.jpg"},undefined,{"cropRect":{"height":320,"width":320,"y":0,"x":80},"modificationDate":"1672312526000","size":23376,"mime":"image/jpeg","height":400,"width":400},{"cropRect":{"height":320,"width":320,"y":0,"x":80},"modificationDate":"1672312526000","size":23376,"mime":"image/jpeg","height":400,"width":400,"path":""}]),
            openPicker: (options) => Promise.resolve([{"cropRect":{"height":320,"width":320,"y":0,"x":80},"modificationDate":"1672312526000","size":23376,"mime":"image/jpeg","height":400,"width":400,"path":"E70634C5-1DA1-40A7-BAEA-D20E72707AE9.jpg",data:"abcd"},undefined,{"cropRect":{"height":320,"width":320,"y":0,"x":80},"modificationDate":"1672312526000","size":23376,"mime":"image/jpeg","height":400,"width":400},{"cropRect":{"height":320,"width":320,"y":0,"x":80},"modificationDate":"1672312526000","size":23376,"mime":"image/jpeg","height":400,"width":400,"path":"",data:"abcd"}]),
        };
        return ImagePicker;
    },
    { virtual: true },
);
