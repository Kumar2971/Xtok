// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'macos',
  select: () => null,
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  LegacyStorage: jest.fn(),
}));

jest.mock('react-native-toasty', () => ({
  RNToasty: {
    Show: jest.fn(),
  },
}));

jest.mock('@react-native-community/google-signin', () => ({
  GoogleSignin: {
    isSignedIn: jest.fn().mockResolvedValue(true),
    revokeAccess: jest.fn().mockResolvedValue(true),
    signOut: jest.fn().mockResolvedValue(true),
    hasPlayServices: jest.fn().mockResolvedValue(undefined),
    signIn: jest.fn().mockResolvedValue(
      Promise.resolve({
        user: {
          email: 'email@mail.com',
          id: '123456789',
          photo: '',
          name: 'John Doe',
          familyName: 'Doe',
          givenName: 'John',
        },
        idToken: '123456789',
        serverAuthCode: '123456789',
      })
    ),
  },
}));

jest.mock('@invertase/react-native-apple-authentication', () => ({
  appleAuthAndroid: {
    isSupported: true,
    configure: jest.fn(),
    signIn: jest.fn().mockResolvedValue(true),
    ResponseType: { ALL: 'all' },
    Scope: { ALL: 'all' },
  },
  appleAuth: {
    performRequest: jest
      .fn()
      .mockResolvedValue({ user: 'user', identityToken: 'token' }),
    Operation: { LOGIN: 'login' },
    Scope: { FULL_NAME: 'name', EMAIL: 'email' },
    getCredentialStateForUser: jest.fn().mockResolvedValue('authorize'),
    State: { AUTHORIZED: 1 },
  },
}));

jest.mock('jwt-decode', () => {
  return jest.fn().mockReturnValue({
    email: 'email',
    email_verified: true,
    name: 'name',
  });
});

jest.mock('react-native-elements', () => ({
  Badge: jest.fn(),
  Button: jest.fn(),
  CheckBox: jest.fn(),
  Input: jest.fn(),
  SearchBar: jest.fn()
}));