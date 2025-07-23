import React from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
} from "react-native";
import styles from "../styles/styles";
import BottomSheetController from "./BottomSheetController";
class BottomSheet extends BottomSheetController {
  render() {
    const {
      children,
      backgroundColor,
      sheetBackgroundColor,
      draggable = true,
      onRequestClose,
      onClose = this.newClose,
      radius,
      testID,
    } = this.props;
    const { animatedHeight, pan, modalVisible } = this.state;
    const panStyle = {
      transform: pan.getTranslateTransform(),
    };
    const styleAnimated = {
      height: animatedHeight,
      borderTopRightRadius: radius || 10,
      borderTopLeftRadius: radius || 10,
      backgroundColor: sheetBackgroundColor || "#F3F3F3",
    };

    return (
      <Modal transparent visible={modalVisible} onRequestClose={onRequestClose}>
        <KeyboardAvoidingView behavior={"padding"} style={styles.flex1}>
          <View
            style={[
              styles.wrapper,
              { backgroundColor: backgroundColor || "#25252599" },
            ]}>
            <TouchableOpacity
              style={styles.background}
              activeOpacity={1}
              onPress={onClose}
              testID={testID}
            />
            <Animated.View
              {...(draggable &&
                this.panResponder &&
                this.panResponder.panHandlers)}
              style={[panStyle, styles.container, styleAnimated]}>
              {children}
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

export default BottomSheet;
