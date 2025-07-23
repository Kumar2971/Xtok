import { useParticipant } from "@videosdk.live/react-sdk";
import React, { useEffect } from "react";
import LargeVideoRTCView from "./LargeView/LargeVideoRTCView.web";
import LocalParticipantPresenter from "../Components/LocalParticipantPresenter.web";
import MiniVideoRTCView from "./MiniView/MiniVideoRTCView.web";
import { Box } from "@material-ui/core";

interface LocalViewContainerProps {
  participantId: string;
}

const LocalViewContainer: React.FC<LocalViewContainerProps> = ({
  participantId,
}) => {
  const {
    screenShareOn,
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
    <Box sx={webStyle.container}>
      {screenShareOn ? (
        <>
          <LocalParticipantPresenter />
          <MiniVideoRTCView
            isOn={webcamOn}
            isMicOn={micOn}
            stream={webcamStream}
            micStream={micStream}
            displayName={displayName}
            isLocal={isLocal}
          />
        </>
      ) : (
        <LargeVideoRTCView
          isOn={webcamOn}
          isMicOn={micOn}
          stream={webcamStream}
          micStream={micStream}
          displayName={displayName}
          objectFit={"cover"}
          isLocal={isLocal}
        />
      )}
    </Box>
  );
};

export default LocalViewContainer;

const webStyle = {
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#1A1C22",
    borderRadius: 12,
    overflow: "hidden",
  },
};
