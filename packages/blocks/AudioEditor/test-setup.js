// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {NativeModules} from 'react-native';
import { getStorageData } from '../../framework/src/Utilities';

configure({ adapter: new Adapter() });
const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn()
};

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
  
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'ios',
    select: () => null
}));


jest.mock('react-native-fs', () => {
    return {
        mkdir: jest.fn(),
        moveFile: jest.fn(),
        copyFile: jest.fn(),
        pathForBundle: jest.fn(),
        pathForGroup: jest.fn(),
        getFSInfo: jest.fn(),
        getAllExternalFilesDirs: jest.fn(),
        unlink: jest.fn(),
        exists: jest.fn(),
        stopDownload: jest.fn(),
        resumeDownload: jest.fn(),
        isResumable: jest.fn(),
        stopUpload: jest.fn(),
        completeHandlerIOS: jest.fn(),
        readDir: jest.fn(),
        readDirAssets: jest.fn(),
        existsAssets: jest.fn(),
        readdir: jest.fn(),
        setReadable: jest.fn(),
        stat: jest.fn(),
        readFile: jest.fn(),
        read: jest.fn(),
        readFileAssets: jest.fn(),
        hash: jest.fn(),
        copyFileAssets: jest.fn(),
        copyFileAssetsIOS: jest.fn(),
        copyAssetsVideoIOS: jest.fn(),
        writeFile: jest.fn(),
        appendFile: jest.fn(),
        write: jest.fn(),
        downloadFile: jest.fn().mockImplementation(() => Promise.resolve({promise:jest.fn()})),
        uploadFiles: jest.fn(),
        touch: jest.fn(),
        MainBundlePath: jest.fn(),
        CachesDirectoryPath: jest.fn().mockImplementation(() => Promise.resolve()),
        DocumentDirectoryPath: jest.fn(),
        ExternalDirectoryPath: jest.fn(),
        ExternalStorageDirectoryPath: jest.fn(),
        TemporaryDirectoryPath: jest.fn(),
        LibraryDirectoryPath: jest.fn(),
        PicturesDirectoryPath: jest.fn(),
    };
});



jest.mock('ffmpeg-kit-react-native', () => ({
    FFmpegKit: {
      execute: jest.fn(()=>({getReturnCode: jest.fn(()=>({ isValueSuccess: () => false,isValueError: () => true,}))})),

    }, 
      FFprobeKit: {
        getMediaInformation: jest.fn().mockResolvedValue({
          getReturnCode: jest.fn(() => ({
            isValueSuccess: () => true,
          })),
          getMediaInformation: jest.fn(() => ({
            getDuration: jest.fn(() => 120.0),
          })),
        }),
      },
     
    }));

  jest.mock('react-native-video', () => {
    
  });

jest.mock("react-native-sound-player", () => ({
    pause: jest.fn(),
    playUrl: jest.fn(),
}));

function FormDataMock() {
    this.append = jest.fn();
}
global.FormData = FormDataMock