import { ROBOTO_FONTS } from "../../../styles/fonts";

import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

class WaitingToJoinView extends React.PureComponent {
  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Text style={styles.waitingText}>Connecting ....</Text>
      </View>
    );
  }
}

export default WaitingToJoinView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  waitingText: {
    fontSize: Dimensions.get("window").fontScale + 26,
    color: "#FFF",
    fontFamily: ROBOTO_FONTS.RobotoBold,
    paddingLeft: 4,
    paddingRight: 4,
  },
});
