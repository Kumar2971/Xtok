import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
  View,
} from "react-native";
import SoundPlayer from "react-native-sound-player";
import Scale from "../../../components/src/Scale";
import FONTS from "../../../components/src/Fonts/Fonts";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import AudioEditorController, {
  Props,
  configJSON,
} from "./AudioEditorController";
import { deviceHeight } from "../../../framework/src/Utilities";
import Video from "react-native-video";
import { FFprobeKit } from "ffmpeg-kit-react-native";
import AlertModal from "../../../components/src/AlertModal";

const maxTrimDuration = 3000;
const minimumTrimDuration = 500;
const totalDuration = 180000;

const initialLeftHandlePosition = 0;
const initialRightHandlePosition = 36000;

const scrubInterval = 50;

export default class AudioEditor extends AudioEditorController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    this.setState(
      {
        audioClip: this.props.route.params.clip,
        audioId: this.props.route.params.clip.id,
      }
    );
    try {
      const session = await FFprobeKit.getMediaInformation(
        this.props.route.params.clip.audio
      );
      const returnCode = await session.getReturnCode();

      if (returnCode.isValueSuccess()) {
        const mediaProperties = session.getMediaInformation();

        if (mediaProperties) {
          if (mediaProperties.getDuration()) {
            const duration = mediaProperties.getDuration();
            if (duration) {
              const t = parseFloat(`${duration}`);
              this.setState({ totalDuration: t }, () => {
                this.startDownloading();
              });
            }
          }
        }
      }
    } catch (error) {
    }
  }

  // Customizable Area Start
  renderVideoView() {
    return (
      <View
        style={{
          flex: 1,
          height: deviceHeight / 1.9,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "lightyellow",
        }}
      >
        <Video
          source={{
            uri: "https://www.pexels.com/video/a-series-of-beer-cans-in-production-line-5532772/",
          }}
          controls={true}
          style={{ height: "100%", width: "100%" }}
        />
      </View>
    );
  }

  renderButtonsView() {
    return (
      <View
        style={{
          paddingHorizontal: 16,
          padding: 10,
          marginTop: deviceHeight / 9.5,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          testID="backBtn"
          style={[st.btn, { borderColor: "rgb(247,202,78)", borderWidth: 1 }]}
          onPress={() => {
            SoundPlayer.pause();
            this.props.navigation.goBack();
          }}
        >
          <Text style={{ color: "rgb(247,202,78)" }}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="saveBtn"
          style={[st.btn, { backgroundColor: "rgb(247,202,78)" }]}
          onPress={() => this.validateValues()}
        >
          <Text style={{ color: "black" }}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={st.container}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          {this.renderVideoView()}
          <View
            testID="mainView"
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
              paddingHorizontal: 20,
            }}
          >
            <Text style={st.h1}>{this.state.audioClip?.title}</Text>
            <Text style={st.h2}>{this.state.audioClip?.artist}</Text>

            <Text style={{ marginTop: 20 }}>
              Select a duration between 0 and{" "}
              {Math.round(this.state.totalDuration * 100) / 100} sec.
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
                width: "50%",
              }}
            >
              <TextInput
                returnKeyType="done"
                testID="txtInput"
                placeholder="From"
                autoCapitalize="none"
                style={{
                  height: 40,
                  borderRadius: 15,
                  borderWidth: 0.5,
                  borderColor: "grey",
                  width: "40%",
                  textAlign: "center",
                }}
                keyboardType="number-pad"
                value={this.state.fromValue}
                onChangeText={(t) => this.setState({ fromValue: t })}
              />
              <TextInput
                returnKeyType="done"
                testID="txtInput2"
                placeholder="To"
                autoCapitalize="none"
                style={{
                  height: 40,
                  borderRadius: 15,
                  borderWidth: 0.5,
                  borderColor: "grey",
                  width: "40%",
                  textAlign: "center",
                }}
                value={this.state.toValue}
                keyboardType="number-pad"
                onChangeText={(t) => this.setState({ toValue: t })}
              />
            </View>
          </View>
          {this.state.remoteAudio != null ? (
            <TouchableOpacity
              testID="playBtn"
              onPress={() => {
                SoundPlayer.playUrl(this.state.remoteAudio);
              }}
              style={{ alignSelf: "center" }}
            >
              <Text>Play</Text>
            </TouchableOpacity>
          ) : null}
          {this.state.isDownloading ? (
            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
                marginTop: 10,
                height: 18,
              }}
            >
              <Text>Uploading audio... </Text>
              <ActivityIndicator />
            </View>
          ) : null}
          {this.renderButtonsView()}
        </KeyboardAvoidingView>
        <AlertModal
          alertModal={this.state.alertModal}
          onPress2={() => {
            this.setState({ alertModal: { openAlertModal: false } });
          }}
          btnTitle2={"OK"}
        />
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const screeWidth = Dimensions.get("window").width;
const screeHeight = Dimensions.get("window").height;
const st = StyleSheet.create({
  container: {
    flex: 1,
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#212121",
    height: screeHeight,
  },
  topbar: {
    // backgroundColor:"#000",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    height: screeHeight * 0.1,
    alignItems: "center",
  },
  backImg: {
    height: Scale(20),
    width: Scale(20),
    backgroundColor: "#eee",
    padding: 17,
    borderRadius: 5,
  },
  customButton: {
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  userImg: {},
  ImgStyling: {
    height: screeHeight * 0.73,
    resizeMode: "cover",
    width: screeWidth,
  },
  bottomBar: {
    height: screeHeight * 0.1,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  iconView: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    paddingLeft: 13,
  },
  iconText: {
    color: "#FFF",
    fontFamily: FONTS.MontserratSemiBold,
  },
  videoProgressBar: {
    marginTop: -50,
    marginLeft: 10,
    marginRight: 10,
  },
  progressBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  progressBarWhite: {
    height: 3,
    backgroundColor: "#FFF",
    width: "30%",
  },
  progressBarDot: {
    height: 20,
    backgroundColor: "#FFF",
    width: "5%",
    borderRadius: 20,
  },
  progressBarGray: {
    height: 3,
    backgroundColor: "#aaa",
    width: "65%",
  },
  timing: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  h1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  h2: {
    marginTop: 8,
    fontSize: 12,
    color: "grey",
  },
  btn: {
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 26,
  },
});
// Customizable Area End
