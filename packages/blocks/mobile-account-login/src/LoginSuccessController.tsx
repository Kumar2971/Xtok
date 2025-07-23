import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
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

export default class LoginSuccessController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  phoneAuthApiCallId: any;
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
        console.log("LoginSuccessDataMessage==>",LoginSuccessDataMessage);
        
        const { isScreenFrom} = LoginSuccessDataMessage;    
        this.setState({ isScreenFrom: isScreenFrom })
      }
    }

    // Customizable Area End
  }

  // Customizable Area Start

  // Customizable Area End
}
