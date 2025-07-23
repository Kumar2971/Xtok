import React from "react";
import {
  // Customizable Area Start
  View,
  Text,
  StyleSheet
  // Customizable Area End
} from "react-native";

// Customizable Area Start
import VideoPlayer from "react-native-video-player";
// Customizable Area End

import SubtitlesController, { Props } from "./SubtitlesController";
export const configJSON = require("./config");

export default class Subtitles extends SubtitlesController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  render() {
    return (
      // Customizable Area Start
      <View style={styles.container}>
        <VideoPlayer
          testID="video-player"
          video={{ uri: configJSON.videoUrl }}
          thumbnail={{ uri: configJSON.thumbnail }}
          onStart={this.onStart}
          onEnd={this.onEnd}
        />
        <Text style={styles.text}>{this.state.partialResults[0]}</Text>
      </View>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  text: {
    textAlign: "center",
    color: "#B0171F",
    marginTop: 20
  }
});
// Customizable Area End
