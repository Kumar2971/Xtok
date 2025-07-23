import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { BackHandler } from "react-native";
// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  language:any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class PrivacySettingsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  async componentDidMount() {
    const language = await getStorageData("SelectedLng"); 
    this.setState({language:language})
    // Customizable Area End
  }

  // handleBackButtonClick = () => {
  //   this.props.navigation.goBack();
    
  //   return true;
  // };
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      language:""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));
    }

    // Customizable Area Start
    // Customizable Area End
  }

  // txtInputWebProps = {
  //   onChangeText: (text: string) => {
  //     this.setState({ txtInputValue: text });
  //   },
  //   secureTextEntry: false,
  // };

  // txtInputMobileProps = {
  //   ...this.txtInputWebProps,
  //   autoCompleteType: "email",
  //   keyboardType: "email-address",
  // };

  // txtInputProps = this.isPlatformWeb()
  //   ? this.txtInputWebProps
  //   : this.txtInputMobileProps;

  // btnShowHideProps = {
  //   onPress: () => {
  //     this.setState({ enableField: !this.state.enableField });
  //     this.txtInputProps.secureTextEntry = !this.state.enableField;
  //     this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
  //       ? imgPasswordVisible
  //       : imgPasswordInVisible;
  //   },
  // };

  // btnShowHideImageProps = {
  //   source: this.txtInputProps.secureTextEntry
  //     ? imgPasswordVisible
  //     : imgPasswordInVisible,
  // };

  // btnExampleProps = {
  //   onPress: () => this.doButtonPressed(),
  // };

  navigateToProfile = () => this.props.navigation.navigate('UserProfileBasicBlock')
  keyExtractor = (item:any) => item.id;
  // doButtonPressed() {
  //   let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
  //   msg.addData(
  //     getName(MessageEnum.AuthTokenDataMessage),
  //     this.state.txtInputValue
  //   );
  //   this.send(msg);
  // }

  // web events
  // setInputValue = (text: string) => {
  //   this.setState({ txtInputValue: text });
  // };

  // setEnableField = () => {
  //   this.setState({ enableField: !this.state.enableField });
  //};

  // Customizable Area Start
  // Customizable Area End
}
