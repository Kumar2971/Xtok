// Customizable Area Start
import {
  Clipboard,
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
import FetchMeetingController, { Props } from "./FetchMeetingController";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import Loader from "../../../components/src/Loader";
import Button from "./components/Button";
import { MeetingList } from "./Types";
// Customizable Area End

export default class FetchMeeting extends FetchMeetingController {
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
  _renderItem = ({ item }: { item: MeetingList; index: number }) => {
    const clipboardCopyText = (meetingId: string) => {
      Clipboard.setString(meetingId);
      this.showAlert("Success", "Meeting Id copied Successfully.");
    };
    return (
      <View style={styles.blockMeetingNew}>
        <Text style={{ flex: 1 / 2 }}>{item.attributes.roomId}</Text>
        <Button
          testID="copyMeetingID"
          style={styles.btn}
          textStyle={styles.textStyle}
          backgroundColor={"rgba(0,0,0,.3)"}
          text="copy code"
          onPress={() => clipboardCopyText(item.attributes.roomId)}
        />
        <Button
          testID="FetchRecordings"
          textStyle={styles.textStyle}
          style={styles.btn1}
          text="fetch recordings"
          onPress={() => this.goToRecordings(item.attributes.roomId)}
        />
        <Button
          testID="FetchStream"
          textStyle={styles.textStyle}
          style={styles.btn1}
          text="List streams"
          onPress={() => this.goToListStreams(item.attributes.roomId)}
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
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container1}>
        <TouchableWithoutFeedback
          testID="touchable"
          onPress={() => {
            this.hideKeyboard();
          }}>
          <View>
            <FlatList
              data={this.state.allMeetingsList}
              renderItem={this._renderItem}
            />
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
  container1: {
    flex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#000",
  },
  blockMeetingNew: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "auto",
    width: Dimensions.get("window").width,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "rgba(255, 255, 255,.7)",
    padding: 2,
    paddingLeft: "2%",
  },
  btn1: {
    minWidth: Dimensions.get("window").width / 6,
    padding: 5,
  },
  btn: {
    minWidth: Dimensions.get("window").width / 8,
  },
  textStyle: {
    fontSize: 10,
  },
});
// Customizable Area End
