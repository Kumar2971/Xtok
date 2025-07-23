import React from "react";
import { Animated, View } from "react-native";
import BlinkController from "./BlinkController";
class Blink extends BlinkController {
  render() {
    return (
      <View>
        <Animated.View style={{ opacity: this.fadeAnimation }}>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}

export default Blink;
