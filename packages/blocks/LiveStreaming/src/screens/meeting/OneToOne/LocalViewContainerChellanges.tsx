// @ts-ignore
import { useParticipant } from "@videosdk.live/react-native-sdk";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
//@ts-ignore
import LargeVideoRtcViewChallenges from "./LargeView/LargeVideoRtcViewChallenges";
import LocalParticipantPresenter from "../Components/LocalParticipantPresenter";
import MiniVideoRTCView from "./MiniView/MiniVideoRtcView";

interface LocalViewContainerProps {
  participantId: string;
}

const LocalViewContainerChallenges: React.FC<LocalViewContainerProps> = ({
  participantId,
}) => {
  const {
    screenShareOn,
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
    <View style={styles.container}>
      {screenShareOn ? (
        <>
          <LocalParticipantPresenter />
          <MiniVideoRTCView
            isOn={webcamOn}
            stream={webcamStream}
            displayName={displayName}
            isLocal={isLocal}
          />
        </>
      ) : (
        <LargeVideoRtcViewChallenges
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

export default LocalViewContainerChallenges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1C22",
    // borderRadius: 12,
    overflow: "hidden",
  },
});
