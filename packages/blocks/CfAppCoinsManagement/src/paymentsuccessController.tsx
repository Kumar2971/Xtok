import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { CommonActions } from "@react-navigation/native";
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route:any
  // Customizable Area End
}

export interface S {
  // Customizable Area Start
  isScreenFrom:any;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class paymentsuccessController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  phoneAuthApiCallId: any;
  placeHolderMobile: string="";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ]);
    this.state = {
      isScreenFrom:""
    };

    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start 
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const LoginSuccessDataMessage = message.getData(getName(MessageEnum.LoginSuccessDataMessage));      
      if (LoginSuccessDataMessage) {  
        const { isScreenFrom} = LoginSuccessDataMessage;    
        this.setState({ isScreenFrom: isScreenFrom })
      }
    }

    // Customizable Area End
  }

  // Customizable Area Start

  handleGoBack = () => {
    const navigationState = this.props?.navigation?.dangerouslyGetState();
    const screensInStack = navigationState?.routes?.map((route:any) => route?.name);
    const isFromLiveStream = screensInStack && (screensInStack?.indexOf("LiveStreaming") !== -1);
    if(isFromLiveStream){
      let popCount = screensInStack?.length - (screensInStack.indexOf("LiveStreaming")+1);
      this.props.navigation?.pop(popCount);
      return;
    }
    this.props.route?.params?.result? this.props.navigation.dispatch(
      CommonActions.reset({
         index: 0,
         routes: [{ name: "Home" }],
     })
 ): this.props.navigation.navigate("Balance")
  }

  // Customizable Area End
}
