import { useMeeting } from "@videosdk.live/react-sdk";
import React from "react";
import ScreenShare from "@material-ui/icons/ScreenShareSharp";
import { Box, Button, styled, Typography } from "@material-ui/core";

const LocalParticipantPresenter: React.FC = () => {
  const { disableScreenShare } = useMeeting({});

  return (
    <Box sx={webStyle.container}>
      <Box sx={webStyle.screenContainer}>
        <ScreenShare width={40} height={40} htmlColor="#fff" />
        <Typography style={webStyle.text}>
          You are presenting to everyone
        </Typography>
        <StopScreenShareButton
          data-test-id="disableScreenShare"
          className="stop-screen-share-button"
          style={webStyle.btnStopScreenShare}
          onClick={() => {
            disableScreenShare();
          }}>
          <Typography style={webStyle.btnText}>Stop Presenting</Typography>
        </StopScreenShareButton>
      </Box>
    </Box>
  );
};

export default LocalParticipantPresenter;

const webStyle = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#1A1C22",
    borderRadius: 8,
    margin: 4,
    height: "100%",
  },
  screenContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  btnStopScreenShare: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#5568FE",
    borderRadius: 12,
    marginVertical: 12,
  },
  text: {
    fontWeight: 600,
    fontSize: 14,
    color: "#FFFFFF",
    marginVertical: 12,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 600,
  },
};

const StopScreenShareButton = styled(Button)({
  "&": {
    textTransform: "none",
    marginTop: "20px!important",
  },
});
