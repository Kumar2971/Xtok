import { IBlock } from '../../../framework/src/IBlock';
import { Message } from '../../../framework/src/Message';
import { BlockComponent } from '../../../framework/src/BlockComponent';
import MessageEnum, {
  getName,
} from '../../../framework/src/Messages/MessageEnum';
import { runEngine } from '../../../framework/src/RunEngine';

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from './assets';
import {
  getStorageData,
  setStorageData,
} from '../../../framework/src/Utilities';
//@ts-ignore
import i18n from 'i18n-js';
import { translate } from '../../../components/src/i18n/translate';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import { NativeModules } from 'react-native';
// Customizable Area End

export const configJSON = require('./config');

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
  languageList: any;
  selectedLanguage: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class LanguageSupportController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
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
      txtInputValue: '',
      txtSavedValue: 'A',
      enableField: false,
      // Customizable Area Start
      languageList: [
        {
          id: 1,
          name: translate('english'),
          ISOcode: 'en',
        },
        {
          id: 2,
          name: translate('arabic'),
          ISOcode: 'ar',
        },
      ],
      selectedLanguage: 'en',
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog('Message Recived', message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        'Change Value',
        'From: ' + this.state.txtSavedValue + ' To: ' + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    // Customizable Area End
  }


  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  async componentDidMount() {
    const lng1 = await getStorageData('SelectedLng');
    const lng = lng1 ? lng1 : 'en';
    this.setState({ selectedLanguage: lng });
  }
 
   onGoBack=()=>{
    this.props.navigation.goBack()
   }
  selectLanguage = async (item: any) => {
    await setStorageData('SelectedLng', item);
    i18n.locale = item;
    this.setState({ selectedLanguage: item });
    if (this.state.selectedLanguage === 'en') {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      RNRestart.Restart();
    } else if (this.state.selectedLanguage === 'ar') {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
      RNRestart.Restart();
    }
  };
  // Customizable Area End
}
