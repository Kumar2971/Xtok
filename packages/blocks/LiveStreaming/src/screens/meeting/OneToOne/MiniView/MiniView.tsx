// @ts-ignore
import { useParticipant } from "@videosdk.live/react-native-sdk";
import React, { useEffect } from "react";
import MiniVideoRTCView from "./MiniVideoRtcView";

interface MiniViewContainerProps {
  participantId: string;
}

const MiniViewContainer: React.FC<MiniViewContainerProps> = ({
  participantId,
}) => {
  const { webcamOn, webcamStream, displayName, setQuality, isLocal } =
    useParticipant(participantId, {});

  useEffect(() => {
    setQuality("high");
  }, []);

  return (
    <MiniVideoRTCView
      isOn={webcamOn}
      stream={webcamStream}
      displayName={displayName}
      isLocal={isLocal}
    />
  );
};

export default MiniViewContainer;
