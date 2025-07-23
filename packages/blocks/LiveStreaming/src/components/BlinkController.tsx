import { IBlock } from "framework/src/IBlock";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";
import { Animated } from "react-native";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("../config");

export interface Props {
  // Customizable Area Start
  duration: number;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  modalVisible: boolean;
  animatedHeight: Animated.Value;
  pan: Animated.ValueXY;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class BlinkController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  animation: Animated.CompositeAnimation;
  fadeAnimation: Animated.Value;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY(),
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.fadeAnimation = new Animated.Value(1);
    this.animation = Animated.loop(
      Animated.sequence([
        Animated.timing(this.fadeAnimation, {
          toValue: 0.5,
          duration: this.props.duration,
          useNativeDriver: true,
        }),
        Animated.timing(this.fadeAnimation, {
          toValue: 1,
          duration: this.props.duration,
          useNativeDriver: true,
        }),
      ]),
    );
    // Customizable Area End
    // Customizable Area End
  }

  // Customizable Area Start
  start() {
    this.animation.start();
  }

  stop() {
    this.animation.stop();
  }

  // Customizable Area End
}
