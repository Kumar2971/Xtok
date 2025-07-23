import React from "react";
import colors from "../../../styles/colors";
import { useMeeting } from "@videosdk.live/react-sdk";
import { Box, Button, Typography } from "@material-ui/core";

export default function ParticipantLimitViewer() {
  const { leave } = useMeeting({});

  return (
    <Box sx={webStyle.container}>
      <Typography style={webStyle.title}>OOPS !!</Typography>
      <Typography style={webStyle.description}>
        Maximum 10 participants can join this meeting.
      </Typography>
      <Typography style={webStyle.errorText}>Please try again later</Typography>
      <Button
        data-test-id="okButton"
        onClick={() => {
          leave();
        }}
        style={webStyle.button}>
        Ok
      </Button>
    </Box>
  );
}

const webStyle = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 24,
    color: colors.primary[100],
    fontWeight: 600,
  },
  description: {
    fontSize: 12,
    color: colors.primary[100],
    fontWeight: 600,
    marginTop: 20,
  },
  errorText: {
    fontSize: 12,
    color: colors.primary[400],
    fontWeight: 600,
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 30,
    height: 50,
    marginTop: 30,
  },
};
