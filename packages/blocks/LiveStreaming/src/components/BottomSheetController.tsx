import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";
import {
  Alert,
  Animated,
  PanResponder,
  PanResponderInstance,
  StyleProp,
  ViewStyle,
} from "react-native";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("../config");

export interface Props {
  // Customizable Area Start
  height: number;
  closeFunction?: () => void;
  hasDraggableIcon?: boolean;
  backgroundColor?: string;
  sheetBackgroundColor?: string;
  dragIconColor?: string;
  dragIconStyle?: StyleProp<ViewStyle>;
  draggable?: boolean;
  onRequestClose?: () => void;
  onClose?: () => void;
  radius?: number;
  testID?: string;
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

export default class BottomSheetController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  panResponder?: PanResponderInstance;
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
    this.createPanResponder();
    // Customizable Area End
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  setModalVisible(visible: boolean) {
    const { closeFunction, height } = this.props;
    const { animatedHeight, pan } = this.state;
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
        duration: 400,
        useNativeDriver: false,
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0),
        });
        if (typeof closeFunction === "function") {
          closeFunction();
        }
      });
    }
  }
  onStartShouldSetPanResponder = () => true;
  onPanResponderMove = (event: {}, gestureState: { dy: number }) => {
    const { pan } = this.state;
    if (gestureState.dy > 0) {
      Animated.event([null, { dy: pan.y }], {
        useNativeDriver: false,
      })(event, gestureState);
    }
  };
  onPanResponderRelease = (event: {}, gestureState: { dy: number }) => {
    const { height } = this.props;
    const { pan } = this.state;
    try {
      const gestureLimitArea = height / 3;
      const gestureDistance = gestureState.dy;
      if (gestureDistance > gestureLimitArea) {
        this.setModalVisible(false);
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    } catch (error) {
      Alert.alert("an unknown error occured");
    }
  };
  createPanResponder() {
    const {
      onStartShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    } = this;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    });
  }

  show() {
    this.setModalVisible(true);
  }

  close() {
    this.setModalVisible(false);
  }

  newClose = () => this.close();

  // Customizable Area End
}
