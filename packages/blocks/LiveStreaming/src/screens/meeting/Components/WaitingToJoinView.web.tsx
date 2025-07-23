import React from "react";
import { Box, Typography } from "@material-ui/core";

class WaitingToJoinView extends React.PureComponent {
  render(): React.ReactNode {
    return (
      <Box sx={webStyle.container}>
        <Typography style={webStyle.waitingText}>
          Creating a room waiting ...
        </Typography>
      </Box>
    );
  }
}

export default WaitingToJoinView;

const webStyle = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "050A0E",
  },
  waitingText: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: 600,
  },
};
