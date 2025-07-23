import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
//@ts-ignore  // can't assign type in config.js
import { baseURL } from "../../bulkuploading/src/BulkUploadingController";
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
  totalBalance: number;
  accumulatedCoins: number;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ExchangeController extends BlockComponent<Props, S, SS> {
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
      language:"",
      totalBalance: 0,
      accumulatedCoins:0

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
      this.setState({ txtInputValue: text });
    },
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
    onPress: () => this.doButtonPressed()
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }*/

  // Customizable Area Start
  authToken = getStorageData("authToken", false);
  handleBackButton = () => {
    this.props.navigation.goBack();
  };

  async componentDidMount() {
    const language = await getStorageData("SelectedLng"); 
    this.setState({language: language})
    await this.getTotalbalance();
    this.props.navigation.addListener("focus", async () => {
    await this.getTotalbalance();
    })
  }

  getTotalbalance = async () =>{
    console.log('exchange token', await this.authToken)

      const res = await fetch(`${baseURL}/bx_block_cfappcoinsmanagement/your_balance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: await this.authToken,
        },
      });
      const response = await res.json();
      const {coins_count, exchanged_amount_available } = response;
      this.setState({totalBalance: exchanged_amount_available, accumulatedCoins: coins_count})

      return {
        coins_count,
        exchanged_amount_available
      }
    }
    withdrawlFunction = () => {
      this.props.navigation.navigate("Balance", { selectedIndex: 1 });
    }
    exchangeForCoinsFunction = async() => {
        await this.getTotalbalance()
        this.props.navigation.navigate("ExchangeForcoins");
    }
  // Customizable Area End
}
