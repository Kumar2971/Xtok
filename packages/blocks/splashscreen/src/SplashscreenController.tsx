import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getNavigator, getStorageData } from "../../../framework/src/Utilities";
import messaging from '@react-native-firebase/messaging';
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  timeout: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class SplashscreenController extends BlockComponent<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.state = {
      timeout: 2000
    }
    
    // Customizable Area Startg
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    const authToken = (await getStorageData("authToken", false)) || "";
    setTimeout(() => {
      const token = "";
      authToken ? this.props.navigation.replace("BottomTabScreen") : this.props.navigation.replace("Login");
    }, this.state.timeout);
  }

  gotoBottomTabScreen = () => {
    const msgLogin: Message = new Message(
      getName(MessageEnum.NavigationBottomTabScreenAdapterMessage)
    );
    msgLogin.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgLogin);
  };

  async notificationListener() {
    // const navigation = getNavigator();
    // const navigation = useNavigation()
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      console.log("backgrund state", remoteMessage.notification)
    });
    // Check whether an initial notification is available

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          if (remoteMessage?.data?.notify_type === 'follow') {
            setTimeout(() => {
              this.props.navigation.navigate("Notifications")
            }, 3000);
          }
          console.log("remote message", remoteMessage.notification)
        }
      });

       messaging().setBackgroundMessageHandler(async remoteMessage => {
          const navigation = getNavigator();
          console.log(
            'Received message in background, index.js onRegister',
            remoteMessage,
          );
          if (
            remoteMessage &&
            remoteMessage.data &&
            remoteMessage.data.notify_type &&
            remoteMessage.data.notify_type === 'follow'
          ) {
            // do something
          } else {
            console.log('Message handled in the background!', remoteMessage);
          }
        });
    }
  // Customizable Area End
}
