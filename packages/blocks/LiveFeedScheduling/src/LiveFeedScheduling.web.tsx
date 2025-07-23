import React from "react";

import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
  Typography,
  InputAdornment,
  IconButton,
  // Customizable Area Start
  Modal,
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { closeCircle } from "./assets";
import { DatePickerField, TextInputField, TimePickerField } from "./CustomTextFields.web";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";

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
import { COLORS } from "../../../framework/src/Globals";
import { LiveFeedItem } from "./LiveFeedItem.web";
// Customizable Area End

import LiveFeedSchedulingController, {
  Props,
  configJSON,
  EventListItem,
} from "./LiveFeedSchedulingController";


export default class LiveFeedScheduling extends LiveFeedSchedulingController {
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
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            <Box
              data-test-id="btnAddExample"
              onClick={this.onPressOpenModel}
              component="button"
              sx={webStyle.buttonStyle}
            >
              <Button color={'primary'}>{"Schedule live event"}</Button>
            </Box>
            {this.state.eventList.map((item: EventListItem) => {
              return <LiveFeedItem data-test-id="liveFeedItemBtn" onDeleteClick={() => this.deleteEvent(item)} onEditClick={() => this.changeStateOnEdit(item)} item={item} />
            })}
            {this.state.eventList.length == 0 && <h1>No events found</h1>}


            {this.state.isVisible && <Modal
              open={this.state.isVisible}
              onClose={this.onPressCloseModel}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={webStyle.modalMainWrapper} >
                <Box sx={webStyle.whiteWrapper}>
                  <Typography variant="h6" style={{ width: '90%', textAlign: 'center', marginBottom: '20px' }}>Schedule live</Typography>
                  <img
                    onClick={this.onPressCloseModel}
                    src={closeCircle}
                    style={{ height: 25, width: 25, marginRight: 10, cursor: 'pointer', position: 'absolute', right: 20, top: 20 }}
                  />
                  <Typography style={{ textAlign: 'center', marginBottom: '20px' }}>Event topic</Typography>
                  <TextInputField data-test-id="textFieldTopic" textValue={this.state.liveEventTopic} multiline={false} field_type={"text"} field_name={"Event name"} handleInputChange={(e:any) => this.onChangeTextTopicTitle(e.target.value)} />
                  {this.state.warnTopic ? (
                    <Typography style={webStyle.warnText}>{this.state.warnTopic}</Typography>
                  ) : null}

                  <Typography style={{ textAlign: 'center', marginBottom: '20px', marginTop: 15 }}>Event Description</Typography>
                  <TextInputField textValue={this.state.liveEventDesc} multiline={true} field_type={"text"} field_name={"Event description"} handleInputChange={(e:any) => this.onChangeTextTopicDescTitle(e.target.value)} />
                  {this.state.warnTopicDes ? (
                    <Typography style={webStyle.warnText}>{this.state.warnTopicDes}</Typography>
                  ) : null}

                  <Typography style={{ textAlign: 'center', marginBottom: '20px', marginTop: 15 }}>Select Date</Typography>
                  <DatePickerField isEdit={this.state.isFromEdit} date={this.state.startDate} field_name={"Select Date"} handleInputChange={this.onDateChange} />
                  {this.state.warnDate ? (
                    <Typography style={webStyle.warnText}>{this.state.warnDate}</Typography>
                  ) : null}

                  <Typography style={{ textAlign: 'center', marginBottom: '20px', marginTop: 15 }}>Select Time</Typography>
                  <TimePickerField format={"hh:mm A"} isEdit={this.state.isFromEdit} time={this.state.time} isDuration={false} field_name={"Select time"} handleInputChange={this.onTimeSelected} />
                  {this.state.warnTime ? (
                    <Typography style={webStyle.warnText}>{this.state.warnTime}</Typography>
                  ) : null}


                  <Typography style={{ textAlign: 'center', marginBottom: '20px', marginTop: 15 }}>Select duration</Typography>
                  <TimePickerField format={"hh:mm"} isEdit={this.state.isFromEdit} time={this.state.durationTime} isDuration={true} field_name={"Select duration"} handleInputChange={(e:any) => this.onDuration(e, e.target.value)} />
                  {this.state.warnDurationTime ? (
                    <Typography style={webStyle.warnText}>{this.state.warnDurationTime}</Typography>
                  ) : null}
                  <Box
                    data-test-id="btnAddExample"
                    onClick={this.onPressScheduleLiveEvent}
                    component="button"
                    sx={webStyle.buttonStyle}
                  >
                    <Button color={'primary'}>{"Schedule live"}</Button>
                  </Box>
                </Box>
              </Box>
            </Modal>}

          </Box>
        </Container>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
    paddingTop: "20px",
  },
  formsWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: "10px",
    marginTop: "10px",
    borderWidth: '1px',
    borderColor: '#702290',
  },
  eventContainer: {
    backgroundColor: "white",
    borderWidth: 1.3,
    borderColor: COLORS.yellow,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 0.1,
    elevation: 5,
    border: '1px solid black',
  },
  modalMainWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    background: "transparent",
    alignSelf: "center",
  },
  whiteWrapper: {
    background: "white",
    width: "50%",
    padding: "15px",
    position: "relative",
    borderRadius: "38px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
    display: "flex",
    flexDirection: "column",
    maxHeight: "85%",
    overflowY: 'scroll',
  },
  buttonStyle: {
    width: '100%',
    height: '45px',
    marginTop: '40px',
    marginBottom: '20px',
    border: 'none',
    backgroundColor: 'rgb(98, 0, 238)',
  },
  warnText: {
    fontSize: 12,
    color: COLORS.red,
  },
};
// Customizable Area End