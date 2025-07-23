import { useParticipant } from "@videosdk.live/react-sdk";
import React, { useEffect } from "react";
import MiniVideoRTCView from "./MiniVideoRTCView.web";

interface MiniViewContainerProps {
  participantId: string;
}

const MiniViewContainer: React.FC<MiniViewContainerProps> = ({
  participantId,
}) => {
  const {
    webcamOn,
    micOn,
    webcamStream,
    micStream,
    displayName,
    setQuality,
    isLocal,
  } = useParticipant(participantId, {});

  useEffect(() => {
    setQuality("high");
  }, []);

  return (
    <MiniVideoRTCView
      isOn={webcamOn}
      isMicOn={micOn}
      stream={webcamStream}
      micStream={micStream}
      displayName={displayName}
      isLocal={isLocal}
    />
  );
};

export default MiniViewContainer;
