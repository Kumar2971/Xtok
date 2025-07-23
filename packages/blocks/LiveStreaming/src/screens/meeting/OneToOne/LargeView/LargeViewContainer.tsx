// @ts-ignore
import { useParticipant } from "@videosdk.live/react-native-sdk";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import LargeVideoRTCView from "./LargeVideoRtcView";

interface Props {
  participantId: string;
}

const LargeViewContainer: React.FC<Props> = ({ participantId }) => {
  const {
    screenShareOn,
    screenShareStream,
    webcamOn,
    webcamStream,
    displayName,
    setQuality,
    isLocal,
  } = useParticipant(participantId, {});

  useEffect(() => {
    setQuality("high");
  }, []);

  return (
    <View style={styles.largeStyle}>
      {screenShareOn ? (
        <LargeVideoRTCView
          stream={screenShareStream}
          isOn={screenShareOn}
          displayName={displayName}
          objectFit={"contain"}
          isLocal={isLocal}
        />
      ) : (
        <LargeVideoRTCView
          isOn={webcamOn}
          stream={webcamStream}
          displayName={displayName}
          objectFit={"cover"}
          isLocal={isLocal}
        />
      )}
    </View>
  );
};

export default LargeViewContainer;

const styles = StyleSheet.create({
  largeStyle: {
    flex: 1,
    backgroundColor: "#1A1C22",
    borderRadius: 12,
    overflow: "hidden",
  },
});
