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
// Merge Engine - Artboard Dimension  - End
import React from "react";
import FetchLiveStreamingController, {
  Props,
} from "./FetchLiveStreamingController";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import Loader from "../../../components/src/Loader";
import { StreamList1 } from "./Types";
import Button from "./components/Button";
import Video from "react-native-video";
// Customizable Area End

export default class FetchLiveStreaming extends FetchLiveStreamingController {
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

  pressPlay = (item?: StreamList1) => {
    item?.id && this.handlePlayed(item.id);
  };

  renderItem = ({ item }: { item?: StreamList1; index: number }) => {
    return (
      <>
        <View style={styles.blockMeeting}>
          <Text style={styles.text}>{item?.downstreamUrl}</Text>
          <Button
            testID="play-video"
            text={!item?.isPlayed ? "play" : "stop"}
            onPress={() => this.pressPlay(item)}
          />
        </View>
        {item?.isPlayed && item.downstreamUrl && (
          <Video
            source={{ uri: item.downstreamUrl }}
            style={styles.backgroundVideo}
            repeat={false}
            controls
            fullscreenAutorotate
            muted={false}
          />
        )}
      </>
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
            {this.state.listStream.length > 0 ? (
              <FlatList
                testID="flat-list"
                data={this.state.streamListChanged}
                renderItem={this.renderItem}
              />
            ) : (
              <Text>Nno Stream Found</Text>
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
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#000",
  },
  blockMeeting: {
    flexDirection: "row",
    alignItems: "center",
    height: "auto",
    width: Dimensions.get("window").width,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "rgba(255, 255, 255,.7)",
    padding: 2,
  },
  btn: {
    minWidth: Dimensions.get("window").width / 8,
  },
  btn1: {
    minWidth: Dimensions.get("window").width / 6,
    padding: 5,
  },
  textStyle: {
    fontSize: 10,
  },
  text: {
    flex: 1,
  },
  backgroundVideo: {
    borderWidth: 2,
    borderColor: "#000",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2.3,
  },
});
// Customizable Area End
