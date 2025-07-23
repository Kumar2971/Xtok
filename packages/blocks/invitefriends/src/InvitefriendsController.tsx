import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {
  Linking,
  Platform
} from "react-native";
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
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class InvitefriendsController extends BlockComponent<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [];

    this.state = {
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    // Customizable Area End
  }

  // Customizable Area Start
  handleMailAction = async () => {
    let phoneOS = Platform.OS === "android" ? "?" : "&";
    let mailTo = `mailto:foo@example.com?cc=${phoneOS}subject=yourSubject${phoneOS}body=yourMessage`;
    if (await Linking.canOpenURL(mailTo)) {
      Linking.openURL(mailTo);
    }
  };

  handleSMSAction = async () => {
    let phoneOS = Platform.OS === "android" ? "?" : "&";
    let sms = `sms:8885555512${phoneOS}body=This is a Dummy Message`;
    if (await Linking.canOpenURL(sms)) {
      Linking.openURL(sms);
    }
  };

  handleWhatsAppAction = async () => {
    let whatsapp = `whatsapp://send?phone='8885555512'&text='Hello Message'`;
    if (await Linking.canOpenURL(whatsapp)) {
      Linking.openURL(whatsapp);
    }
  };

  btnEmailIconProps = {
    onPress: () => {
      this.handleMailAction();
    }
  };

  btnWhatsAppIconProps = {
    onPress: () => {
      this.handleWhatsAppAction();
    }
  };

  btnSMSIconProps = {
    onPress: () => {
      this.handleSMSAction();
    }
  };
  // Customizable Area End

}
