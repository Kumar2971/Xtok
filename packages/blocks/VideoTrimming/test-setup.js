// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Sound from "react-native-sound";

configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));

jest.mock("react-native-sound-player", () => ({
  pause: jest.fn(),
  playUrl: jest.fn(),
}));

jest.mock("react-native-sound", () => {
  // Returns a function
  return jest.fn().mockImplementation(() => ({
    Sound: () => {},
  }));
});

jest.mock("react-native-modal", () => {
  const React = require("react");
  const { View } = require("react-native");

  const ReactNativeModal = (props) => {
    return (
      <View
        testID={props.testID}
        useNativeDriver={props.useNativeDriver}
        isVisible={props.isVisible}
      />
    );
  };

  return ReactNativeModal;
});

jest.mock("react-native-vector-icons/FontAwesome", () => {
  const React = require("react");
  const { View } = require("react-native");

  const MockedFontAwesome = (props) => {
    return <View testID={props.testID} />;
  };

  return MockedFontAwesome;
});

jest.mock("react-native-vector-icons/Entypo", () => {
  const React = require("react");
  const { View } = require("react-native");

  const MockedEntypo = (props) => {
    return <View testID={props.testID} />;
  };

  return MockedEntypo;
});

jest.mock("react-native-drag-resize", () => {
  const React = require("react");
  const { View } = require("react-native");

  const DragResizeBlock = (props) => {
    return <View testID={props.testID} />;
  };

  return { DragResizeBlock };
});

jest.mock("react-native-elements", () => {
  const React = require("react");
  const { View } = require("react-native");

  const Slider = (props) => {
    return <View testID={props.testID} />;
  };

  return { Slider };
});

jest.mock("react-native-video-controls", () => {});

jest.mock("react-native-trimmer", () => {});

jest.mock("react-native-draggable-dynamic-flatlist", () => {});

// This will not throw an error anymore
const sound = new Sound();

jest.mock("react-native-image-crop-picker", () => {});
jest.mock("react-native-sound-recorder", () => {});
jest.mock("react-native-fs", () => {
  return {
    mkdir: jest.fn(),
    moveFile: jest.fn(),
    copyFile: jest.fn(),
    pathForBundle: jest.fn(),
    pathForGroup: jest.fn(),
    getFSInfo: jest.fn(),
    getAllExternalFilesDirs: jest.fn(),
    unlink: jest.fn(),
    exists: jest.fn().mockImplementation(() => Promise.resolve()),
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
    downloadFile: jest.fn(),
    uploadFiles: jest.fn(),
    touch: jest.fn(),
    MainBundlePath: jest.fn(),
    CachesDirectoryPath: jest.fn(),
    DocumentDirectoryPath: jest.fn(),
    ExternalDirectoryPath: jest.fn(),
    ExternalStorageDirectoryPath: jest.fn(),
    TemporaryDirectoryPath: jest.fn(),
    LibraryDirectoryPath: jest.fn(),
    PicturesDirectoryPath: jest.fn(),
  };
});
jest.mock("react-native-video", () => {});
jest.mock("../../components/src/i18n/translate", () => ({
  translate: jest.fn(),
}));
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("ffmpeg-kit-react-native", () => {});
