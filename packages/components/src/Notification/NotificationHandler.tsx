import PushNotification from 'react-native-push-notification';
import { notifService } from './NotifService';
// import messaging from "@react-native-firebase/messaging";
// import { EventRegister } from '../../../blocks/Chat9/src/EventRegister';
import Chat9Controller from '../../../blocks/Chat9/src/Chat9Controller';

class NotificationHandler extends Chat9Controller {
  _onNotification: any;
  _onRegister: any;
  onNotification(notification: any) {
    // console.log('NotificationHandler:', notification);

    if (typeof this._onNotification === 'function') {
      this._onNotification(notification);
    }

    if (notification.userInteraction === false) {
      notifService.localNotif(
        notification.sound,
        notification.title,
        notification.message,
        notification.data,
      );
    }

    if (notification && notification.userInteraction) {
      let notificationData = notification?.data;

      setTimeout(() => {
        switch (notificationData?.notify_type) {
          case 'new message':
            // NavigationActions('ChatList', {}, {})
            // NavigationService.navigate('ChatList')
            console.log('wprkinggggg--=-=-=-=-=->>>');
            break;
        }
      }, 500);
    }
  }

  onRegister(token: any) {
    // console.log('NotificationHandler:', token);

    if (typeof this._onRegister === 'function') {
      this._onRegister(token);
    }
  }

  onBackgroundMessage(notification: any) {
    console.log('onBG notification', notification)
    if (notification.action === 'Yes') {
      PushNotification.invokeApp(notification);
    }
  }

  onAction(notification: any) {
    // console.log('Notification action received:');
    // console.log(notification.action);
    // console.log(notification);

    if (notification.action === 'Yes') {
      PushNotification.invokeApp(notification);
    }
  }

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err: any) {
    console.log(err);
  }

  attachRegister(handler: any) {
    this._onRegister = handler;
  }

  attachNotification(handler: any) {
    this._onNotification = handler;
  }
}
//@ts-ignore
const handler = new NotificationHandler();

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: handler.onRegister.bind(handler),

  // (required) Called when a remote or local notification is opened or received
  onNotification: handler.onNotification.bind(handler),

  // (optional) Called when Action is pressed (Android)
  onAction: handler.onAction.bind(handler),

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: handler.onRegistrationError.bind(handler),

  // onBackgroundMessage: handler.onAction.bind(handler),

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**

(optional) default: true
Specified if permissions (ios) and token (android and ios) will requested or not,
if not, you must call PushNotificationsHandler.requestPermissions() later
*/ requestPermissions: true,
});
export default handler;