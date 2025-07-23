import React from "react";
import {
  Animated,
  Modal,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../../styles/styles";
import MenuController from "./MenuController";

class Menu extends MenuController {
  placementMenuFunction() {
    switch (this.props.placement) {
      case "left": {
        return {
          left: this.props.left ? this.props.left : 20,
        };
      }
      case "right": {
        return { right: this.props.right ? this.props.right : 20 };
      }
    }
  }

  render() {
    const {
      children,
      menuBackgroundColor,
      onRequestClose,
      onClose = this.newClose,
      radius,
      placement,
      fullWidth,
      bottom,
    } = this.props;
    const { pan, modalVisible } = this.state;
    const panStyle = {
      transform: pan.getTranslateTransform(),
    };

    const stylePan = {
      height: "100%",
      width: "100%",
      borderRadius: radius || 10,
      backgroundColor: menuBackgroundColor || "#F3F3F3",
    };

    const wrapperStyle: {
      position: "absolute" | "relative" | undefined;
      bottom: number;
    } = {
      position: "absolute",
      bottom: bottom ?? Platform.OS === "android" ? 50 : 80,
    };

    return (
      <Modal transparent visible={modalVisible} onRequestClose={onRequestClose}>
        <TouchableOpacity
          testID="btn-to-close-modal"
          style={styles.background}
          activeOpacity={1}
          onPress={() => onClose()}
        />
        <View
          style={[
            styles.wrapper,
            wrapperStyle,
            fullWidth && styles.newStyles,
            placement !== "" && this.placementMenuFunction(),
          ]}>
          <Animated.View style={[panStyle, styles.container, stylePan]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

export default Menu;
