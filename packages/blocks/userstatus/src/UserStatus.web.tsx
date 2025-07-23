import React from "react";

// Customizable Area Start
import { Container, Box, Typography } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
// Customizable Area End

import UserStatusController, {
  Props,
  configJSON,
} from "./UserStatusController";

export default class UserStatus extends UserStatusController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"xs"}>
          <Box sx={webStyle.mainWrapper}>
            <Typography variant="h6" style={webStyle.title} align="center">
              {configJSON.userStatusTitle}
            </Typography>
            {this.state.userStatus.map((item) => {
              return (
                <Box sx={webStyle.userStatusWraper}>
                  <Typography style={webStyle.userStatusId} component="h4">
                    {item.account_id}
                  </Typography>
                  <Typography component="h4">{item.status}</Typography>
                </Box>
              );
            })}
          </Box>
        </Container>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});

const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    // alignItems: 'center',
    paddingBottom: "30px",
    background: "#fff",
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
  },
  userStatusWraper: {
    display: "flex",
    flexDirection: "row",
  },
  userStatusId: {
    width: 30,
  },
};
// Customizable Area End
