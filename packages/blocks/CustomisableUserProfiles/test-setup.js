// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'macos',
  select: () => null,
}));
jest.mock("react-native-image-crop-picker", () => ({
  openCamera: jest.fn().mockImplementation((options) => {
    return new Promise((resolve, reject) => {
      const image = {
        mediaType: "photo",
        compressImageQuality: 0.3,
        includeBase64: true,
        cropping: true,
        multiple: true,
      };
      resolve(image)

    })
  }),
  openPicker: jest.fn().mockImplementation((options) => {
    return new Promise((resolve, reject) => {
      const image = {
        path: "/path/to/image.jpg",
        mime: "image/jpeg",
        size: 1024,
        width: 1024,
        height: 1024,
      };
      resolve(image);
    });
  }),
})
);
jest.mock('react-native-fs', () => ({
  OS: 'macos',
  select: () => null,
}));
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
