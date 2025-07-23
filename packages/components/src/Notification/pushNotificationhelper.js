// import messaging from '@react-native-firebase/messaging';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getStorageData, setStorageData } from '../../../framework/src/Utilities';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// }

// export async function GetFCMToken() {
//   let fcmToken = await getStorageData('fcmtoken')
//   console.log('token-=-=--==->>' , fcmToken )
//   if (!fcmToken) {
//     try {
//       const fcmToken = await messaging().getToken()
//       if (fcmToken) {
//        setStorageData('fcmtoken', fcmToken)
//       } else {

//       }
//     } catch (error) {
//       console.error(error, 'error in fcmtoken');
//     }
//   }
// }

// export const NotificationListner = () => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//   });
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//       }
//     });

//   messaging().onMessage(async remoteMessage => {
//     // alert(remoteMessage)
//     console.log('notification on forefround state ......', JSON.stringify(remoteMessage));
//   })
// }

import messaging from '@react-native-firebase/messaging';
import { getStorageData ,setStorageData} from "../../../framework/src/Utilities";
import { Platform, PermissionsAndroid } from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  let enabled = false;
  if(Platform.OS === "android" && Platform.Version > 32){
    const permissionResult = await PermissionsAndroid.request("android.permission.POST_NOTIFICATIONS");
    enabled = permissionResult === "granted";
  }else{
    enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  }
  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
    let checkToken = await getStorageData('fcmToken')
    console.log("the old token------------------", checkToken)
    if (!checkToken) {
      try {
        let fcmToken = await messaging().getToken(); 
        if (!!fcmToken) {
          console.log("fcme token generated", fcmToken)
          await setStorageData('fcmToken', fcmToken)
        }
      } catch (error) {
        console.log("error in fcmToken", error)
        // alert(error)
      }
    }
  }
  
  export const notificationListener = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      console.log("backgrund state", remoteMessage.notification)
    });
    // Check whether an initial notification is available

    messaging().onMessage(async remoteMessage => {
        console.log("received in foreground", remoteMessage.notification);
    })

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          console.log("remote message", remoteMessage.notification)
        }
      });
    }  