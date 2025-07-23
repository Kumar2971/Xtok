import { useParticipant } from "@videosdk.live/react-sdk";
import React, { useEffect } from "react";
import LargeVideoRTCView from "./LargeVideoRTCView.web";
import { Box } from "@material-ui/core";
interface Props {
  participantId: string;
}
const LargeViewContainer: React.FC<Props> = ({ participantId }) => {
  const {
    screenShareOn,
    screenShareStream,
    micOn,
    webcamOn,
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
        <LargeVideoRTCView
          isOn={screenShareOn}
          isMicOn={micOn}
          stream={screenShareStream}
          micStream={micStream}
          displayName={displayName}
          objectFit={"contain"}
          isLocal={isLocal}
        />
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

export default LargeViewContainer;

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
