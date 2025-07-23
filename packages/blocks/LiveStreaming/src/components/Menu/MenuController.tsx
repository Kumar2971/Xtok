import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";
import { Animated, PanResponder } from "react-native";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("../../config");

export interface Props {
  // Customizable Area Start
  height:
    | number
    | Animated.Value
    | Animated.ValueXY
    | {
        x: number;
        y: number;
      };
  menuBackgroundColor?: string;
  closeFunction?: () => void;
  onRequestClose?: () => void;
  onClose?: () => void;
  radius?: number;
  placement?: string;
  left?: number;
  right?: number;
  fullWidth?: boolean;
  bottom?: number;
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

export default class MenuController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start

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
    this.createPanResponder(this.props);
    // Customizable Area End
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  setModalVisible(visible: boolean, withAnimation?: boolean | undefined) {
    const { closeFunction, height } = this.props;
    const { animatedHeight, pan } = this.state;
    this.setState({
      modalVisible: visible,
      animatedHeight: new Animated.Value(0),
    });
    if (visible) {
      this.setState({ modalVisible: visible });

      Animated.timing(animatedHeight, {
        toValue: height,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: withAnimation ? 400 : 0,
        useNativeDriver: false,
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });

        if (typeof closeFunction === "function") {
          closeFunction();
        }
      });
    }
  }

  onStartShouldSetPanResponder = () => true;
  onPanResponderMove = (event: {}, gestureState: { dy: number }) => {
    if (gestureState.dy > 0) {
      Animated.event([null, { dy: this.state.pan.y }], {
        useNativeDriver: false,
      })(event, gestureState);
    }
  };

  onPanResponderRelease = (event: {}, gestureState: { dy: number }) => {
    const gestureLimitArea = Number(this.props.height) / 3;
    const gestureDistance = gestureState.dy;
    if (gestureDistance > gestureLimitArea) {
      this.setModalVisible(false);
    } else {
      Animated.spring(this.state.pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    }
  };
  createPanResponder(props: {
    height:
      | number
      | Animated.Value
      | Animated.ValueXY
      | {
          x: number;
          y: number;
        };
  }) {
    const onStartShouldSetPanResponder = this.onStartShouldSetPanResponder;
    const onPanResponderMove = this.onPanResponderMove;
    const onPanResponderRelease = this.onPanResponderRelease;
    PanResponder.create({
      onStartShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    });
  }

  show() {
    this.setModalVisible(true);
  }

  close(withAnimation = true) {
    this.setModalVisible(false, withAnimation);
  }

  newClose = () => this.close();

  // Customizable Area End
}
