import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
///@ts-ignore // can't assign type in config.js
import { baseURL } from "../../../framework/src/config";
import { getStorageData } from "../../../framework/src/Utilities";
import { Alert } from "react-native";
import { translate } from "../../../components/src/i18n/translate";
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
  coins: any;
  totalBalance: number;
  accumulatedCoins: number;
  coins_worth: number;
  isCoinsWorth: boolean;
  isPackageSelectedId: any;
  language: string;
  exchangeListPreMadePackages: any;
  alertModal: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ExchangeForcoinsController extends BlockComponent<
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
      getName(MessageEnum.AccoutLoginSuccess)
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      coins: "",
      totalBalance: 0,
      language: "",
      accumulatedCoins: 0,
      coins_worth: 0,
      isCoinsWorth: false,
      isPackageSelectedId: null,
      exchangeListPreMadePackages: null,
      alertModal: {
        openAlertModal: false,
        alertMsg: "",
      }
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

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    // Customizable Area End
  }
  /*
  txtInputWebProps = {
    onChangeText: (text: string) => {
       secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }
*/
  // web events
  // // setInputValue = (text: string) => {
  // //   this.setState({ txtInputValue: text });
  // // };

  // // setEnableField = () => {
  // //   this.setState({ enableField: !this.state.enableField });
  // // };

  // Customizable Area Start
  authToken = getStorageData("authToken", false);

  async componentDidMount() {
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language });

    await this.getTotalbalance();
    await this.getExchangePreMadePackages()
  }

  getTotalbalance = async () => {
    const res = await fetch(`${baseURL}/bx_block_cfappcoinsmanagement/your_balance`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: await this.authToken,
      },
    });
    const response = await res.json();
    console.log('total balance -> ', response)
    const { coins_count, exchanged_amount_available } = response;
    this.setState({ totalBalance: exchanged_amount_available, accumulatedCoins: coins_count })

    return {
      coins_count,
      exchanged_amount_available
    }
  }

  onButtonClick = (item: any, index: any) => {
    this.setState({
      coins: item.total_coins.toString(),
      isPackageSelectedId: item?.id
    }, () => {
      this.onClickPackage(index)
      this.getCoinWorth(item.total_coins, 'withdrawal');
    })
  }

  getExchangePreMadePackages = async () => {
    const res = await fetch(`${baseURL}/bx_block_cfappcoinsmanagement/premade_packages?transaction_type=withdrawal`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: await this.authToken,
      },
      body: null
    });
    const response = await res.json();
    if (response && !response.error) {
      this.setState({ exchangeListPreMadePackages: response })
    }
  }

  getCoinWorth = async (coins_count: any, type: string) => {
    const res = await fetch(`${baseURL}/bx_block_cfappcoinsmanagement/custom_coins/coins_worth?coins_count=${parseInt(coins_count)}&transaction_type=${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: await this.authToken,
      },
    });
    const response = await res.json();
    console.log('response', response)
    const { coins_worth } = response;
    this.setState({ coins_worth: coins_worth })
    return response?.coins_worth;
  }

  onClickPackage = (index: any) => {
    this.state.exchangeListPreMadePackages && this.state.exchangeListPreMadePackages.map((i: any, j: any) => {
      if (index != 'clear' && j == index) {
        i.isSelected = true
      } else {
        i.isSelected = false
      }
    })
    this.setState({ exchangeListPreMadePackages: this.state.exchangeListPreMadePackages })

  }

  exchangeCoinsWorth = () => {
    this.state.isPackageSelectedId ? this.exchangePackageWorth(this.state.isPackageSelectedId) : this.exchangeCoinsWorthWithOutPack()
  }

  exchangeCoinsWorthWithOutPack = async () => {
    this.setState({ isCoinsWorth: true })
    
    let isAmount = await this.getCoinWorth(this.state.coins, 'withdrawal')
    const res = await fetch(`${baseURL}/bx_block_cfappcoinsmanagement/coin_exchanges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: await this.authToken,
      },
      body: JSON.stringify({
        coins_count: this.state.coins,
        amount: isAmount
      })
    });
    console.log('bosy', JSON.stringify({
      coins_count: this.state.coins,
      amount: isAmount
    }));

    const response = await res.json();
    const { error } = response;
    console.log('exchange coins -> ', response, error)
    if (response && !response.error) {
      await this.getTotalbalance()
    }
    else if (error) {
      let errorMsg = error === "Insufficient coin balance" ? translate("insufficient_coin_bal") : error;
      this.setState({ alertModal: { openAlertModal: true, alertMsg: errorMsg } })
    }
    this.setState({ isCoinsWorth: false, coins_worth: 0, coins: '' })
  }

  exchangePackageWorth = async (id: any) => {
    console.log('id', id)
    this.setState({ isCoinsWorth: true })
    const res = await fetch(`${baseURL}/bx_block_cfappcoinsmanagement/package_exchange`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: await this.authToken,
      },
      body: JSON.stringify({
        package_id: id
      })
    });
    const response = await res.json()
    const { error } = response;
    if (response && !response.error) {
      await this.getTotalbalance()
    }
    else if (error) {
      let errorMsg = error === "Insufficient coin balance" ? translate("insufficient_coin_bal") : error;
      this.setState({ alertModal: { openAlertModal: true, alertMsg: errorMsg } })
    }
    this.setState({ isCoinsWorth: false, coins_worth: 0, coins: '' })
  }
  // Customizable Area End
}
