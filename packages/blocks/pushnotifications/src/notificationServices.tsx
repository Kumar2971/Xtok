import messaging from '@react-native-firebase/messaging';
import {
  getStorageData,
  setStorageData,
} from '../../../framework/src/Utilities';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let checkToken = await getStorageData('fcmToken');
  console.log('the old token------------------', checkToken);
  if (!checkToken || checkToken == null) {
    try {
      let fcmToken = await messaging().getToken();
      if (!!fcmToken) {
        console.log('fcme token generated', fcmToken);
        await setStorageData('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('error in fcmToken', error);
      // alert(error)
    }
  }
};

