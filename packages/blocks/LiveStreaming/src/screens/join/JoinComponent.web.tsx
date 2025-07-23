import React from "react";

import JoinComponentController, { Props } from "./JoinComponentController";
import {
  Container,
  Box,
  Typography,
  IconButton,
  Button,
  InputBase,
  DialogContent,
  Dialog,
  styled,
} from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import ArrowBack from "@material-ui/icons/ArrowBack";
import MicOff from "@material-ui/icons/MicOff";
import VideoOn from "@material-ui/icons/Videocam";
import VideoOff from "@material-ui/icons/VideocamOff";

class JoinComponent extends JoinComponentController {
  private webcamHTMLRef = React.createRef<HTMLVideoElement>();
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    const {
      isOpen,
      meetingListViewer,
      recordingListViewer,
      hlsListViewer,
      isVideoOn,
      isMicOn,
      isCreateMeeting,
      isJoinMeeting,
      userName,
    } = this.state;
    const { meetingList, recordingList, hlsList, handleChangeMeetingId } =
      this.props;

    return (
      <>
        <Box sx={webStyle.container}>
          <Container maxWidth={"md"}>
            <Box sx={webStyle.mainWrapper}>
              <PermissionContainerBox sx={webStyle.permissionsContainer}>
                {isVideoOn && (
                  <video
                    style={webStyle.video}
                    height={"100%"}
                    width={"100%"}
                    ref={this.webcamHTMLRef}
                    autoPlay
                  />
                )}
                <Typography align="center" component="span">
                  CAMERA {this.handleFetchActiveState(isVideoOn, "ON", "OFF")}
                </Typography>
                <Typography align="center" component="span">
                  &&
                </Typography>
                <Typography align="center" component="span">
                  MIC {this.handleFetchActiveState(isMicOn, "ON", "OFF")}
                </Typography>
                <Box sx={webStyle.permissionActions}>
                  <Box
                    sx={webStyle.permissionActionsButton}
                    style={{
                      backgroundColor: this.handleFetchActiveState(
                        isMicOn,
                        "#FFFFFF",
                        "red",
                      ),
                    }}>
                    <IconButton
                      data-test-id="micToggleBtn"
                      onClick={() => this.handleTogglePermission("MIC")}
                      color="inherit">
                      {isMicOn ? (
                        <MicIcon
                          width={25}
                          height={25}
                          htmlColor={"#000"}
                        />
                      ) : (
                        <MicOff
                          data-test-id="micOffIcon"
                          width={25}
                          height={25}
                          htmlColor={"#FFFFFF"}
                        />
                      )}
                    </IconButton>
                  </Box>
                  <Box
                    sx={webStyle.permissionActionsButton}
                    style={{
                      backgroundColor: this.handleFetchActiveState(
                        isVideoOn,
                        "#FFFFFF",
                        "red",
                      ),
                    }}>
                    <IconButton
                      data-test-id="videoToggleBtn"
                      onClick={() => this.handleTogglePermission("VIDEO")}
                      color="inherit">
                      {isVideoOn ? (
                        <VideoOn
                          width={25}
                          height={25}
                          htmlColor={"#000"}
                        />
                      ) : (
                        <VideoOff
                          data-test-id="videoOffIcon"
                          width={35}
                          height={35}
                          htmlColor={"#FFFFFF"}
                        />
                      )}
                    </IconButton>
                  </Box>
                </Box>
              </PermissionContainerBox>
              {!isCreateMeeting && !isJoinMeeting && (
                <CreateMeetingContainerBox
                  className="create-meeting-container"
                  sx={webStyle.createMeetingContainer}>
                  <Button
                    data-test-id="createMeetingBtn"
                    onClick={() => this.handleIsCreatingMeeting(true)}
                    className="create-meeting-button">
                    Create A Meeting
                  </Button>
                  <Button
                    data-test-id="createMeetingViaCodeBtn"
                    onClick={() => this.handleIsJoinMeeting(true)}
                    className="join-meeting-button">
                    Join A Meeting Via Code
                  </Button>
                  <Button
                    data-test-id="fetchAllMeetingsBtn"
                    onClick={() => this.handleOpenDialog("meeting")}
                    className="create-meeting-button">
                    Fetch All Meetings
                  </Button>
                </CreateMeetingContainerBox>
              )}
              {isCreateMeeting && (
                <CreateMeetingContainerBox
                  className="create-meeting-container"
                  sx={webStyle.createMeetingContainer}>
                  <Box
                    className="create-meeting-back-button-container"
                    sx={webStyle.createMeetingBackButtonContainer}>
                    <IconButton
                      data-test-id="create-meeting-back-button"
                      className="create-meeting-back-button"
                      onClick={() => this.handleIsCreatingMeeting(false)}>
                      <ArrowBack
                        width={25}
                        height={25}
                        htmlColor={"#FFFFFF"}
                      />
                    </IconButton>
                  </Box>
                  <InputBase
                    data-test-id="nameInput"
                    value={userName}
                    onChange={(event) =>
                      this.handleUserNameChange(event.target.value)
                    }
                    className="user-name-input"
                    placeholder="Enter your name"
                  />
                  <Button
                    data-test-id="joinNewMeetingBtn"
                    onClick={this.handleJoinNewMeeting}
                    className="create-meeting-button">
                    Join New Meeting
                  </Button>
                </CreateMeetingContainerBox>
              )}
              {isJoinMeeting && (
                <CreateMeetingContainerBox
                  className="create-meeting-container"
                  sx={webStyle.createMeetingContainer}>
                  <Box
                    className="create-meeting-back-button-container"
                    sx={webStyle.createMeetingBackButtonContainer}>
                    <IconButton
                      data-test-id="join-meeting-back-button"
                      className="create-meeting-back-button"
                      onClick={() => this.handleIsJoinMeeting(false)}>
                      <ArrowBack
                        width={25}
                        height={25}
                        htmlColor={"#FFFFFF"}
                      />
                    </IconButton>
                  </Box>
                  <InputBase
                    data-test-id="userNameInput"
                    onChange={(event) =>
                      this.handleUserNameChange(event.target.value)
                    }
                    className="user-name-input"
                    placeholder="Enter your name"
                  />
                  <InputBase
                    data-test-id="meetingIdInput"
                    onChange={(event) =>
                      handleChangeMeetingId(event.target.value)
                    }
                    className="user-name-input"
                    placeholder="Enter meeting code"
                  />
                  <Button
                    data-test-id="joinMeetingViaNameAndCodeBtn"
                    onClick={this.handleJoinExistedMeeting}
                    className="create-meeting-button">
                    Join A Meeting
                  </Button>
                </CreateMeetingContainerBox>
              )}
            </Box>
          </Container>
          <StyledDialog
            data-test-id="meeting-n-recording-dialog"
            open={isOpen}
            scroll="body"
            onClose={this.handleCloseDialog}
            maxWidth={false}
            className={
              meetingListViewer
                ? "meeting-list-dialog"
                : "recording-list-dialog"
            }>
            <DialogContent className="dialog-container">
              {meetingListViewer && (
                <Box sx={webStyle.meetingList}>
                  {meetingList.map((item) => (
                    <Box key={item.id} sx={webStyle.meetingListItem}>
                      <Typography
                        className="meeting-list-item-text"
                        component="span">
                        {item.attributes.roomId}
                      </Typography>
                      <Box sx={webStyle.meetingListItemActions}>
                        <Button
                          data-test-id="copyMeetingIdBtn"
                          onClick={() =>
                            this.handleCopy(item.attributes.roomId)
                          }
                          className="copy-code-button">
                          Copy Code
                        </Button>
                        <Button
                          data-test-id="fetchRecordingsBtn"
                          onClick={() =>
                            this.handleOpenDialog(
                              "recording",
                              item.attributes.roomId,
                            )
                          }
                          className="create-meeting-button">
                          Fetch Recordings
                        </Button>
                        <Button
                          data-test-id="fetchHlsListBtn"
                          onClick={() =>
                            this.handleOpenDialog("hls", item.attributes.roomId)
                          }
                          className="create-meeting-button">
                          List Streams
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
              {recordingListViewer && (
                <Box sx={webStyle.recordingVideosContainer}>
                  {recordingList?.length > 0 ? (
                    recordingList.map((item) => (
                      <Box sx={webStyle.recordingListItem} key={item.id}>
                        <Button
                          data-test-id="deleteRecordingButton"
                          onClick={() => this.onDeleteRecording(item.id)}
                          className="delete-recording-button">
                          Delete Recording
                        </Button>
                        <video
                          key={item.id}
                          className="video-play"
                          controls
                          controlsList="nodownload nopictureinpicture noplaybackrate foobar">
                          <source src={item?.file?.fileUrl} type="video/mp4" />
                        </video>
                      </Box>
                    ))
                  ) : (
                    <Typography align="center" style={webStyle.noRecordingText}>
                      There is no recording
                    </Typography>
                  )}
                </Box>
              )}
              {hlsListViewer && (
                <Box sx={webStyle.recordingVideosContainer}>
                  {hlsList?.length > 0 ? (
                    hlsList.map((item) => (
                      <Box sx={webStyle.recordingListItem} key={item.id}>
                        <Typography
                          align="center"
                          style={webStyle.noRecordingText}>
                          {item.downstreamUrl}
                        </Typography>
                        <video
                          key={item.id}
                          className="video-play"
                          controls
                          controlsList="nodownload nopictureinpicture noplaybackrate foobar">
                          <source src={item?.downstreamUrl} type="video/mp4" />
                        </video>
                      </Box>
                    ))
                  ) : (
                    <Typography align="center" style={webStyle.noRecordingText}>
                      There is no hls stream
                    </Typography>
                  )}
                </Box>
              )}
            </DialogContent>
          </StyledDialog>
        </Box>
      </>
    );
  }
}

export default JoinComponent;

const webStyle = {
  container: {
    backgroundColor: "#050A0E",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 50,
  },
  permissionsContainer: {
    padding: 20,
    backgroundColor: "#202427",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
    justifyContent: "center",
    width: "60%",
    minHeight: "40vh",
  },
  video: {
    marginBottom: 20,
  },
  permissionActions: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: 30,
  },
  permissionActionsButton: {
    borderRadius: "50%",
  },
  createMeetingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    width: "100%",
  },
  createMeetingBackButtonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginLeft: "-20px",
  },
  meetingList: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "0 20px 0 0",
  },
  meetingListItemActions: {
    display: "flex",
    alignItems: "center",
  },
  meetingListItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },
  recordingVideosContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    width: "100%",
  },
  recordingListItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  noRecordingText: {
    color: "#fff",
  },
};

const PermissionContainerBox = styled(Box)({
  "& span": {
    color: "#fff",
  },
});

const CreateMeetingContainerBox = styled(Box)({
  "& button": {
    height: "50px",
    borderRadius: "12px",
    color: "#fff",
    width: "70%",
    fontWeight: "600",
  },
  "& .create-meeting-button": {
    backgroundColor: "#5568FE!important",
  },
  "& .join-meeting-button": {
    backgroundColor: "#202427!important",
  },
  "& .create-meeting-back-button": {
    width: "50px !important",
    justifyContent: "flex-start !important",
    borderRadius: "50%",
  },
  "& .create-meeting-back-button-container": {
    width: "70%",
  },
  "& .user-name-input": {
    height: "50px",
    borderRadius: "12px",
    backgroundColor: "#202427",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    padding: "0 20px",
    width: "70%",
  },
  "& .user-name-input input": { textAlign: "center" },
  "&,& .create-meeting-back-button-container, & .user-name-input, & .join-meeting-button, & .create-meeting-button":
    {
      "@media (max-width:576px)": {
        width: "90%",
      },
    },
});

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    backgroundColor: "#2B3034",
    width: "70%",
    padding: "20px 20px 30px 20px",
  },
  "& .dialog-container": {
    padding: "10px 5px !important",
    minHeight: "50%",
    maxHeight: "50%",
    display: "flex",
  },
  "& .meeting-list-item-text": {
    color: "white !important",
    fontWeight: 600,
  },
  "& .copy-code-button": { backgroundColor: "#6f6f75" },
  "& .delete-recording-button": { backgroundColor: "red" },
  "& button, & .delete-recording-button": {
    textTransform: "none",
    fontWeight: "600 !important",
    margin: "10px !important",
    color: "white !important",
  },
  "& video": {
    width: "100%",
    marginBottom: "20px",
    maxHeight: "400px",
    objectFit: "cover",
  },
  "& .create-meeting-button": {
    backgroundColor: "#5568FE!important",
  },
  "@media (max-width:576px)": {
    "& .MuiDialog-paper,& .MuiDialog-paper": {
      width: "90%",
    },
  },
});
