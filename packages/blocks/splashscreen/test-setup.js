// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'react-native-gesture-handler/jestSetup';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock('@react-native-async-storage/async-storage', ()=>({
    LegacyStorage: jest.fn()
}));
jest.mock("@react-native-firebase/messaging",()=>({
    messaging:{
      onNotificationOpenedApp:
      jest.fn((callback) => {
        callback({ remoteMessage: "Notification" });
        return Promise.resolve({ remoteMessage: "Notification" });
      }),
    }
}))
