import {
  RTCView,
  MediaStream,
  // @ts-ignore
} from "@videosdk.live/react-native-sdk";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Stream } from "../../../../Types";
import Avatar from "../../../../components/avatar/Avatar";

interface MiniVideoRTCViewProps {
  stream?: Stream;
  isOn: boolean;
  displayName: string;
  isLocal: boolean;
}

const MiniVideoRtcView: React.FC<MiniVideoRTCViewProps> = ({
  stream,
  isOn,
  displayName,
  isLocal,
}) => {
  return (
    <View style={styles.container}>
      {isOn && stream ? (
        <RTCView
          objectFit="cover"
          zOrder={1}
          mirror={isLocal}
          style={styles.rtcView}
          streamURL={new MediaStream([stream.track]).toURL()}
        />
      ) : (
        <Avatar
          fullName={displayName}
          containerBackgroundColor={"#404B53"}
          fontSize={24}
        />
      )}
    </View>
  );
};

export default MiniVideoRtcView;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 160,
    aspectRatio: 0.7,
    borderRadius: 8,
    borderColor: "#ff0000",
    overflow: "hidden",
  },
  avatar: {
    backgroundColor: "#6F767E",
    height: 60,
    aspectRatio: 1,
    borderRadius: 40,
  },
  rtcView: { flex: 1, backgroundColor: "#424242" },
});
