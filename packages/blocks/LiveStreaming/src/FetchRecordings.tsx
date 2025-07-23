// Customizable Area Start
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
let width = Dimensions.get("screen").width;
let height = Dimensions.get("screen").height;
// Merge Engine - Artboard Dimension  - End
import React from "react";
import FetchRecordingsController, { Props } from "./FetchRecordingsController";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import Loader from "../../../components/src/Loader";
import Button from "./components/Button";
import Video from "react-native-video";
import { RecordingList } from "./Types";
// Customizable Area End

export default class FetchRecordings extends FetchRecordingsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", () => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width,
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  _renderItem = ({ item, index }: { item: RecordingList; index: number }) => {
    return (
      <View style={styles.blockMeeting}>
        <View style={styles.recordingView}>
          <Text style={styles.color}>Recording {index + 1}</Text>
          <Button
            testID="delete-recordings"
            onPress={() => this.deleteRecording(item.id)}
            text="delete recording"
            backgroundColor={"#800000"}
          />
        </View>
        <Video
          source={{ uri: item?.file?.fileUrl }}
          style={styles.backgroundVideo}
          repeat={false}
          ref={this.videoRef}
          controls
          muted={this.state.isMuted}
          volume={this.state.volume}
          fullscreenAutorotate
          paused={this.state.isPaused}
        />
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    if (this.state.isLoading) {
      return <Loader loading />;
    }
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          testID="touchable"
          onPress={() => {
            this.hideKeyboard();
          }}>
          <View>
            {this.state.allAllRecordings.length > 0 ? (
              <FlatList
                data={this.state.allAllRecordings}
                renderItem={this._renderItem}
              />
            ) : (
              <Text style={styles.color}>No recording found</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    height: height,
    width: width,
    backgroundColor: "#000",
  },
  blockMeeting: {
    alignItems: "center",
    height: height / 2,
    width: width,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "transparent",
    padding: 2,
  },
  color: {
    color: "rgba(255, 255, 255,.7)",
  },
  backgroundVideo: {
    borderWidth: 2,
    borderColor: "#000",
    height: height / 2.3,
    width: width,
  },
  recordingView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
// Customizable Area End
