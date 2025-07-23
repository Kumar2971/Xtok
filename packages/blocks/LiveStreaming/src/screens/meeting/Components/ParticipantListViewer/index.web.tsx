import React from "react";
import ParticipantListItem from "./ParticipantListItem.web";
import { Box, Typography } from "@material-ui/core";

type IProps = {
  participantIds: string[];
};

const ParticipantListViewer = (props: IProps) => {
  return (
    <Box sx={webStyle.dialogContainer}>
      <Typography align="center" style={webStyle.dialogTitle} component="h1">
        Participants ({props.participantIds.length})
      </Typography>
      <Box sx={webStyle.participantContainer}>
        <Box data-test-id="participants" sx={webStyle.participantBody}>
          {props.participantIds.map((item: string) => (
            <ParticipantListItem key={item} participantId={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ParticipantListViewer;

const webStyle = {
  dialogContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "#fff",
    marginBottom: 20,
  },
  participantContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    flex: 1,
  },
  participantBody: {
    flex: 1,
  },
};
