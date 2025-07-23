import React from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import { Box, Typography } from "@material-ui/core";
import Person from "@material-ui/icons/PersonSharp";
import MicIcon from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import VideoOn from "@material-ui/icons/Videocam";
import VideoOff from "@material-ui/icons/VideocamOff";

interface ParticipantListItemProps {
  participantId: string;
}

const ParticipantListItem: React.FC<ParticipantListItemProps> = ({
  participantId,
}) => {
  const { displayName, webcamOn, micOn, isLocal } =
    useParticipant(participantId);

  return (
    <Box sx={webStyle.participantContainer}>
      <Box sx={webStyle.participantPersonView}>
        <Box sx={webStyle.participantPersonIconContainer}>
          <Person width={14} height={14} htmlColor="#fff" />
        </Box>
        <Typography style={webStyle.participantText}>
          {isLocal ? "You" : displayName || ""}
        </Typography>
      </Box>
      <Box sx={webStyle.participantIconView}>
        <Box
          data-test-id="micIcon"
          sx={webStyle.participantToolIcon}
          style={webcamOn ? webStyle.deviceOn : webStyle.deviceOff}>
          {micOn ? (
            <MicIcon width={25} height={25} htmlColor={"#FFFFFF"} />
          ) : (
            <MicOff width={25} height={25} htmlColor={"#FFFFFF"} />
          )}
        </Box>
        <Box
          data-test-id="videoIcon"
          sx={webStyle.participantToolIcon}
          style={webcamOn ? webStyle.deviceOn : webStyle.deviceOff}>
          {webcamOn ? (
            <VideoOn width={25} height={25} htmlColor={"#FFFFFF"} />
          ) : (
            <VideoOff
              width={35}
              height={35}
              htmlColor={"#FFFFFF"}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(ParticipantListItem);

const webStyle = {
  participantContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#404B53",
  },
  participantPersonView: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  participantPersonIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: "#6F767E",
  },
  participantText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: 600,
  },
  participantIconView: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  participantToolIcon: {
    display: "flex",
    height: 36,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    borderColor: "rgba(245,245,245, 0.2)",
    borderRadius: "50%",
    borderStyle: "solid",
  },
  deviceOn: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  deviceOff: {
    backgroundColor: "#FF5D5D",
    borderWidth: 0,
  },
};
