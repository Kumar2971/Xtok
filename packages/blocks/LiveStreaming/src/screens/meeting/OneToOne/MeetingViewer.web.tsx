import * as React from "react";

import colors from "../../../styles/colors";
import {
  Box,
  Button,
  Typography,
  Menu,
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  FormControl,
  InputBase,
  IconButton,
  styled,
  CircularProgress,
} from "@material-ui/core";
import CallEnd from "@material-ui/icons/CallEnd";
import { Constants, useMeeting } from "@videosdk.live/react-sdk";
import { useEffect, useState } from "react";
import MicIcon from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import VideoOn from "@material-ui/icons/Videocam";
import VideoOff from "@material-ui/icons/VideocamOff";
import Comment from "@material-ui/icons/InsertComment";
import MoreVert from "@material-ui/icons/MoreVert";
import Leave from "@material-ui/icons/AllOut";
import EndCallForAll from "@material-ui/icons/CallEndTwoTone";
import Record from "@material-ui/icons/RecordVoiceOver";
import ExpandMore from "@material-ui/icons/ExpandMore";
import People from "@material-ui/icons/People";
import { CustomMenuItem } from "../../../components/Menu/MenuItem.web";
import ChatViewer from "../Components/ChatViewer/ChatViewer.web";
import ParticipantListViewer from "../Components/ParticipantListViewer/index.web";
import LocalParticipantPresenter from "../Components/LocalParticipantPresenter.web";
import LocalViewContainer from "./LocalViewContainer.web";
// import Hls from "hls.js";
import ScreenShare from "@material-ui/icons/ScreenShareSharp";
import ContentCopy from "@material-ui/icons/FileCopyRounded";

const iconProps = {
  width: 25,
  height: 25,
  htmlColor: "#fff",
  className: "menu-list-icon",
};

type IProps = {
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  handleStartRtmpLive: (streamKey: string, streamUrl: string) => void;
  handleStopRtmpLive: (streamKey: string, streamUrl: string) => void;
  handleStartLiveHls: () => void;
  handleStopLiveHls: () => void;
  handleLiveActiveHls: () => void;
  downStreamUrl: string;
  handleSetDownStreamUrl: (value: string) => void;
  alert: (title: string, error: string) => void;
};

export default function OneToOneMeetingViewer(props: IProps) {
  const [liveStream, setLiveStream] = useState<boolean>(false);

  const mMeeting = useMeeting({});

  const mMeetingRef = React.useRef(mMeeting);

  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  const {
    participants,
    localWebcamOn,
    localMicOn,
    leave,
    end,
    changeMic,
    toggleWebcam,
    toggleMic,
    toggleScreenShare,
    localScreenShareOn,
    meetingId,
    recordingState,
    hlsState,
    hlsUrls,
    getMics,
    localParticipant,
  } = useMeeting({
    //@ts-ignore
    onLivestreamStateChanged,
    //@ts-ignore
    onHlsStateChanged,
  });

  const participantIds = [...participants.keys()];
  const participantCount: number = participantIds?.length || 0;
  const participantsArrVal = [...participants.values()];
  const itemFoundForId = participantsArrVal.find(
    (item) => item.mode === "CONFERENCE",
  );

  const playerRef = React.useRef<HTMLVideoElement | null>(null);

  const [chatViewer, setChatViewer] = useState<boolean>(false);
  const [participantListViewer, setParticipantListViewer] = useState(false);
  const [goLiveViewer, setGoLiveViewer] = useState(false);

  const [audioDevices, setAudioDevices] = useState<
    {
      deviceId: string;
      label: string;
    }[]
  >([]);
  const [streamLoading, setStreamLoading] = useState<boolean>(false);
  const [streamKey, setStreamKey] = useState<string>("");
  const [dropdown, setDropdown] = useState<string | unknown>("choose");
  const [url, setUrl] = useState<string>("");
  const [anchorElMoreMenu, setAnchorElMoreMenu] = useState<null | HTMLElement>(
    null,
  );
  const [anchorElEndCallMenu, setAnchorElEndCallMenu] =
    useState<null | HTMLElement>(null);
  const [anchorElMicMenu, setAnchorElMicMenu] = useState<null | HTMLElement>(
    null,
  );
  const [activeMenu, setActiveMenu] = useState<
    null | "more" | "end call" | "mic"
  >(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const endCallMenu = [
    {
      id: 1,
      text: "Leave",
      testId: "leave",
      subText: "Only you will leave the call",
      icon: <Leave {...iconProps} />,
      render: true,
      onClick: () => leave(),
    },
    {
      id: 2,
      text: "End",
      testId: "end",
      subText: "End call for all participants",
      icon: <EndCallForAll {...iconProps} />,
      render: localParticipant?.mode === "CONFERENCE",
      onClick: () => end(),
    },
  ];

  const [liveOptions] = useState<
    {
      option: string;
      value: string;
    }[]
  >([
    {
      option: "Youtube",
      value: "youtube",
    },
    {
      option: "Facebook",
      value: "facebook",
    },
    {
      option: "Twitch",
      value: "twitch",
    },
  ]);

  const moreMenu = [
    {
      id: 1,
      text: "",
      testId: "start-recording",
      icon: <Record {...iconProps} />,
      render: localParticipant?.mode === "CONFERENCE",
      onClick: async () => {
        handleCloseMenu();
        await recordingStartStop();
      },
    },
    {
      id: 2,
      text: "Start Screen Share",
      testId: "start-screen-share",
      icon: <ScreenShare {...iconProps} />,
      render: localParticipant?.mode === "CONFERENCE",
      onClick: () => {
        handleCloseMenu();
        toggleScreenShare();
      },
    },
    {
      id: 3,
      text: "Participants",
      testId: "participants",
      icon: <People {...iconProps} />,
      render: true,
      onClick: () => {
        handleCloseMenu();
        handleOpenDialog("participant");
      },
    },
  ];

  const handleChangeMic = (id: string) => {
    changeMic(id);
    setAnchorElMicMenu(null);
  };

  const getDevices = async () => {
    const devices = await getMics();
    setAudioDevices(devices);
  };

  useEffect(() => {
    getDevices();
  }, []);

  const changeLiveStream = async () => {
    if (!liveStream) {
      setGoLiveViewer(true);
      setIsOpen(true);
    } else {
      props.handleStopRtmpLive(streamKey, url);
    }
  };

  const handleLiveStream = async () => {
    if (streamKey === "") {
      props.alert("", "Please enter a stream key");
      return;
    }
    if (!liveStream) {
      props.handleStartRtmpLive(streamKey, url);
    } else {
      props.handleStopRtmpLive(streamKey, url);
      setLiveStream(false);
    }
    handleCloseDialog();
    setDropdown("Choose");
  };

  function onLivestreamStateChanged(data: { status: string }) {
    const { status } = data;

    if (status === Constants.livestreamEvents.LIVESTREAM_STARTING) {
      setStreamLoading(true);
    } else if (status === Constants.livestreamEvents.LIVESTREAM_STARTED) {
      setStreamLoading(false);
      setLiveStream(true);
    } else if (status === Constants.livestreamEvents.LIVESTREAM_STOPPING) {
      setStreamLoading(true);
    } else if (status === Constants.livestreamEvents.LIVESTREAM_STOPPED) {
      setLiveStream(false);
      setStreamLoading(false);
    } else {
      //
    }
  }

  const recordingStartStop = async () => {
    if (
      !recordingState ||
      recordingState === Constants.recordingEvents.RECORDING_STOPPED
    ) {
      props.handleStartRecording();
    } else if (recordingState === Constants.recordingEvents.RECORDING_STARTED) {
      props.handleStopRecording();
    }
    setAnchorElMoreMenu(null);
  };

  const dropdownGetStreamKey = () => {
    let urlToMove = "";
    if (dropdown === "youtube") {
      urlToMove = "https://studio.youtube.com/video/9cnoLxl-OLg/livestreaming";
    } else if (dropdown === "facebook") {
      urlToMove = "https://www.facebook.com/live/producer/v2";
    } else if (dropdown === "twitch") {
      urlToMove = "https://dashboard.twitch.tv/settings/stream";
    }
    if (typeof window !== "undefined") {
      window.open(urlToMove, "_blank");
    }
  };

  const handleOpenMenu = (
    text: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (text === "end call") {
      setActiveMenu("end call");
      setAnchorElEndCallMenu(event.currentTarget);
      return;
    }
    if (text === "more") {
      setActiveMenu("more");
      setAnchorElMoreMenu(event.currentTarget);
    }
    if (text === "mic") {
      setActiveMenu("mic");
      setAnchorElMicMenu(event.currentTarget);
    }
  };

  const handleCloseMenu = () => {
    setAnchorElMicMenu(null);
    setAnchorElEndCallMenu(null);
    setAnchorElMoreMenu(null);
  };

  const handleOpenDialog = (value: "chat" | "participant") => {
    if (value === "chat") {
      setChatViewer(true);
    }
    if (value === "participant") {
      setParticipantListViewer(true);
    }
    setTimeout(() => {
      setIsOpen(true);
    }, 300);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setTimeout(() => {
      setChatViewer(false);
      setParticipantListViewer(false);
      setGoLiveViewer(false);
    }, 300);
  };

  const handleDropdownChange = (value: unknown) => {
    setDropdown(value);
    if (value === "youtube") {
      setUrl("rtmp://a.rtmp.youtube.com/live2");
    } else if (value === "facebook") {
      setUrl("rtmps://live-api-s.facebook.com:443/rtmp/");
    } else if (value === "twitch") {
      setUrl("rtmp://fra06.contribute.live-video.net/app/{stream_key}");
    }
  };

  async function onHlsStateChanged(data: {
    status: string;
    downstreamUrl: string;
  }) {
    switch (data.status) {
      case "HLS_PLAYABLE":
      case "HLS_STARTED":
        props.handleLiveActiveHls();
        break;
      case "HLS_STOPPED":
        props.handleSetDownStreamUrl("");
        break;
      default:
    }
  }

  const changeHlsStream = async () => {
    if (!hlsState || hlsState === "HLS_STOPPED") {
      props.handleStartLiveHls();
    } else if (hlsState === "HLS_PLAYABLE") {
      props.handleStopLiveHls();
    }
  };

  const fetchActiveMenu = () => {
    switch (activeMenu) {
      case "more":
        return anchorElMoreMenu;
      case "end call":
        return anchorElEndCallMenu;
      case "mic":
        return anchorElMicMenu;
      default:
        return;
    }
  };

  const fetchActiveState = (
    condition: string | null,
    currentState: string[],
    currentReturn: string[],
  ) => {
    switch (condition) {
      case currentState[0]:
        return currentReturn[0];
      case currentState[1]:
        return currentReturn[1];
      case currentState[2]:
        return currentReturn[2];
      case currentState[3]:
        return currentReturn[3];
      default:
    }
  };

  const fetchTrueConditionString = (
    condition: boolean,
    value: string,
    valueTwo: string,
  ) => {
    switch (condition) {
      case true:
        return value;
      case false:
        return valueTwo;
      default:
    }
  };

  const fetchTrueConditionElement = (
    condition: boolean,
    comp: React.ReactChild | string,
    compTwo?: React.ReactChild | string,
  ) => {
    switch (condition) {
      case true:
        return comp;
      case false:
        return compTwo;
      default:
    }
  };

  const hlsButtonText = () => {
    switch (hlsState) {
      case "HLS_STOPPING":
        return "Live Stopping";
      case "HLS_STARTING":
        return "Live Starting";
      case "HLS_PLAYABLE":
      case "HLS_STARTED":
        return "Stop Live Hls";
      case "HLS_STOPPED":
        return "Start Live Hls";
      default:
    }
  };

  const handleCopy = async () => {
    if (typeof navigator !== "undefined") {
      await navigator.clipboard.writeText(meetingId);
      props.alert("", "Meeting Id copied Successfully");
    }
  };

  const playHls = React.useMemo(() => {
    return (
      hlsUrls.downstreamUrl &&
      (hlsState === Constants.hlsEvents.HLS_PLAYABLE ||
        hlsState === Constants.hlsEvents.HLS_STOPPING)
    );
  }, [hlsUrls, hlsState]);

  useEffect(() => {
    if (playHls) {
      // if (Hls.isSupported()) {
      //   const hls = new Hls({
      //     capLevelToPlayerSize: true,
      //     maxLoadingDelay: 4,
      //     minAutoBitrate: 0,
      //     autoStartLoad: true,
      //     defaultAudioCodec: "mp4a.40.2",
      //   });

      //   let player: HTMLMediaElement | null =
      //     document.querySelector("#hlsPlayer");

      //   hls.loadSource(hlsUrls.downstreamUrl);
      //   hls.attachMedia(player as HTMLMediaElement);
      //   hls.on(Hls.Events.MANIFEST_PARSED, function () {});
      // } else {
      //   if (typeof playerRef.current?.play === "function") {
      //     playerRef.current.src = hlsUrls.downstreamUrl;
      //     playerRef.current.play();
      //   }
      // }
    }
  }, [playHls]);

  return (
    <MeetingViewerBox data-test-id="liveStreamPage" sx={webStyle.container}>
      <CopyNLiveContainerBox
        className="copy-n-live-container"
        sx={webStyle.copyNLiveContainer}>
        <Box sx={webStyle.copyIdRow}>
          {fetchTrueConditionElement(
            recordingState === Constants.recordingEvents.RECORDING_STARTED,
            <Box data-test-id="recording-blink" className="blink">
              <Typography className="blink-text">REC</Typography>
            </Box>,
          )}
          <Button data-test-id="copyTextButton" onClick={handleCopy}>
            <Box sx={webStyle.copyIdRow}>
              <Typography
                data-test-id="textMeetingId"
                className="copy-text"
                component="span">
                {fetchTrueConditionString(meetingId !== "", meetingId, "No ID")}
              </Typography>
              <ContentCopy htmlColor="#fff" height={25} width={25} />
            </Box>
          </Button>
        </Box>
        {fetchTrueConditionElement(
          localParticipant?.mode === "CONFERENCE",
          <Button
            data-test-id="changeLivedHlsTextButton"
            onClick={changeHlsStream}>
            {fetchTrueConditionElement(
              hlsState === "HLS_STOPPING" || hlsState === "HLS_STARTING",
              <CircularProgress
                data-test-id="loader"
                size={20}
                color="secondary"
              />,
              <Typography
                data-test-id="live-hls-text"
                style={{
                  color: fetchTrueConditionString(
                    hlsState === "HLS_STARTED",
                    "red",
                    "white",
                  ),
                }}
                className="live-text">
                {hlsButtonText()}
              </Typography>,
            )}
          </Button>,
        )}
        {fetchTrueConditionElement(
          localParticipant?.mode === "CONFERENCE",
          <Button
            data-test-id="changeLivedTextButton"
            onClick={changeLiveStream}>
            {fetchTrueConditionElement(
              streamLoading,
              <CircularProgress
                data-test-id="loader"
                size={20}
                color="secondary"
              />,
              <Typography
                data-test-id="live-text"
                style={{
                  color: fetchTrueConditionString(liveStream, "red", "white"),
                }}
                className="live-text">
                {fetchTrueConditionString(liveStream, "Live", "Go Live")}
              </Typography>,
            )}
          </Button>,
        )}
      </CopyNLiveContainerBox>
      <Box
        data-test-id="meetingArea"
        sx={{
          ...webStyle.participantsContainer,
          width: fetchTrueConditionString(localWebcamOn, "unset", "100%"),
        }}>
        {participantCount > 1 ? (
          <>
            {localParticipant?.mode === "CONFERENCE" ? (
              fetchTrueConditionElement(
                localScreenShareOn,
                <LocalParticipantPresenter />,
                <LocalViewContainer participantId={itemFoundForId?.id ?? ''} />,
              )
            ) : (
              <>
                {playHls ? (
                  <video
                    ref={playerRef}
                    id="hlsPlayer"
                    autoPlay={true}
                    controls
                    className="hls-video"
                    playsInline
                    muted={true}
                  />
                ) : (
                  <Box sx={webStyle.waitingHost}>
                    <Typography style={webStyle.waitingHostText}>
                      Waiting for host the start the live stream
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </>
        ) : (
          participantCount === 1 &&
          itemFoundForId?.id && (
            <LocalViewContainer participantId={itemFoundForId?.id} />
          )
        )}
        {fetchTrueConditionElement(
          !participantCount,
          <Box sx={webStyle.loader}>
            <Typography align="center" style={webStyle.endText}>
              Meeting is ended ....
            </Typography>
          </Box>,
        )}
      </Box>
      <Box sx={webStyle.actionsContainer}>
        <Button
          data-test-id="end-call-menu-button"
          style={webStyle.endCallButton}
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handleOpenMenu("end call", event)
          }
          color="inherit">
          <CallEnd width={25} height={25} htmlColor="#fff" />
        </Button>
        {localParticipant?.mode === "CONFERENCE" && (
          <Box sx={webStyle.microphoneContainer}>
            <Box
              sx={webStyle.micButtonWrapper}
              className="meeting-action-button mic-button-wrapper"
              style={{
                width: fetchTrueConditionString(
                  audioDevices.length > 0,
                  "70px",
                  "40px",
                ),
                borderColor: fetchTrueConditionString(
                  localMicOn,
                  "#2B3034",
                  "#fff",
                ),
                backgroundColor: fetchTrueConditionString(
                  localMicOn,
                  "transparent",
                  colors.primary[100],
                ),
              }}>
              <Button
                data-test-id="toggle-mic-button"
                onClick={() => toggleMic()}
                className="meeting-action-button"
                style={{
                  borderColor: fetchTrueConditionString(
                    localMicOn,
                    "transparent",
                    "#fff",
                  ),
                  backgroundColor: fetchTrueConditionString(
                    localMicOn,
                    "transparent",
                    colors.primary[100],
                  ),
                }}>
                {fetchTrueConditionElement(
                  localMicOn,
                  <MicIcon
                    data-test-id="micOnBtn"
                    width={25}
                    height={25}
                    htmlColor="#fff"
                  />,
                  <MicOff
                    data-test-id="micOffBtn"
                    width={25}
                    height={25}
                    htmlColor="#1D2939"
                  />,
                )}
              </Button>
              {fetchTrueConditionElement(
                audioDevices.length > 0,
                <IconButton
                  data-test-id="mic-menu-button"
                  onClick={(
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                  ) => handleOpenMenu("mic", event)}
                  className="expand-button">
                  <ExpandMore htmlColor="#afa8a8" />
                </IconButton>,
              )}
            </Box>
          </Box>
        )}
        {localParticipant?.mode === "CONFERENCE" && (
          <Button
            data-test-id="toggle-webcam-button"
            onClick={() => toggleWebcam()}
            className="meeting-action-button"
            style={{
              borderColor: fetchTrueConditionString(
                localWebcamOn,
                "#2B3034",
                "#fff",
              ),
              backgroundColor: fetchTrueConditionString(
                localWebcamOn,
                "transparent",
                colors.primary[100],
              ),
            }}>
            {fetchTrueConditionElement(
              localWebcamOn,
              <VideoOn
                data-test-id="videoOnBtn"
                width={25}
                height={25}
                htmlColor="#fff"
              />,
              <VideoOff
                data-test-id="videoOffBtn"
                width={35}
                height={35}
                htmlColor="#1D2939"
              />,
            )}
          </Button>
        )}
        <Button
          data-test-id="open-chat-button"
          onClick={() => handleOpenDialog("chat")}
          className="meeting-action-button"
          style={webStyle.transparentActionButton}>
          <Comment width={25} height={25} htmlColor="#fff" />
        </Button>
        <Button
          data-test-id="open-more-menu-button"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handleOpenMenu("more", event)
          }
          className="meeting-action-button"
          style={webStyle.transparentActionButton}>
          <MoreVert width={25} height={25} htmlColor="#fff" />
        </Button>
        <StyledMenu
          data-test-id="more-menu"
          id="menu"
          anchorEl={fetchActiveMenu()}
          open={Boolean(fetchActiveMenu())}
          onClose={handleCloseMenu}
          className={fetchActiveState(
            activeMenu,
            ["more", "end call", "mic"],
            ["more-list", "end-call-list", "mic-list"],
          )}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: activeMenu === "more" ? "right" : "left",
          }}>
          {fetchTrueConditionElement(
            activeMenu === "end call",
            <Box sx={webStyle.endCallMenu}>
              {endCallMenu.map((item) => {
                if (item.render) {
                  return (
                    <CustomMenuItem
                      key={item.id}
                      data-test-id={item.testId}
                      onClick={item.onClick}
                      className="end-call"
                      icon={item.icon}
                      text={item.text}
                      subText={item.subText}
                    />
                  );
                }
              })}
            </Box>,
          )}
          {fetchTrueConditionElement(
            activeMenu === "more",
            <Box sx={webStyle.endCallMenu}>
              {moreMenu.map((item, index) => {
                if (item.render) {
                  return (
                    <CustomMenuItem
                      key={item.id}
                      data-test-id={item.testId}
                      onClick={item.onClick}
                      className="more"
                      icon={item.icon}
                      text={
                        index === 0
                          ? fetchActiveState(
                              recordingState,
                              [
                                Constants.recordingEvents.RECORDING_STOPPED,
                                Constants.recordingEvents.RECORDING_STARTING,
                                Constants.recordingEvents.RECORDING_STOPPING,
                                Constants.recordingEvents.RECORDING_STARTED,
                              ],
                              ["Start", "Starting", "Stopping", "Stop"],
                            ) + " Recording"
                          : item.text
                      }
                    />
                  );
                }
              })}
            </Box>,
          )}
          {activeMenu === "mic" && (
            <Box sx={webStyle.endCallMenu}>
              {audioDevices.map((item) => (
                <CustomMenuItem
                  key={item.deviceId}
                  data-test-id="mic-device"
                  text={item.label}
                  className="mic"
                  onClick={() => handleChangeMic(item.deviceId)}
                />
              ))}
            </Box>
          )}
        </StyledMenu>
        <DialogStyled
          data-test-id="dialog"
          open={isOpen}
          scroll="body"
          onClose={handleCloseDialog}
          fullWidth={!goLiveViewer}
          maxWidth={false}
          className={`${fetchTrueConditionString(
            chatViewer,
            "chat-dialog",
            "",
          )} ${fetchTrueConditionString(
            participantListViewer,
            "participant-dialog",
            "",
          )} ${fetchTrueConditionString(goLiveViewer, "go-live-dialog", "")}`}>
          <DialogContent className="dialog-container">
            {fetchTrueConditionElement(chatViewer, <ChatViewer />)}
            {fetchTrueConditionElement(
              participantListViewer,
              <ParticipantListViewer participantIds={participantIds} />,
            )}
            {goLiveViewer && (
              <Box className="go-live-form" sx={webStyle.goLiveForm}>
                <FormControl variant="outlined">
                  <Select
                    data-test-id="dropdownSelect"
                    value={dropdown}
                    onChange={(event: { target: { value: unknown } }) =>
                      handleDropdownChange(event.target.value)
                    }
                    name="liveOption"
                    inputProps={{ "aria-label": "liveOption" }}>
                    <MenuItem disabled value="choose">
                      Choose
                    </MenuItem>
                    {liveOptions.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {dropdown !== "choose" && (
                  <>
                    <InputBase
                      data-test-id={`test-url-${dropdown}`}
                      value={url}
                      onChange={(event: {
                        target: { value: React.SetStateAction<string> };
                      }) => setUrl(event.target.value)}
                      className="url-input"
                      placeholder={"Enter your stream " + dropdown + "  url"}
                    />
                    <InputBase
                      data-test-id={`test-stream-${dropdown}`}
                      value={streamKey}
                      onChange={(event: {
                        target: { value: React.SetStateAction<string> };
                      }) => setStreamKey(event.target.value)}
                      className="stream-key-input"
                      placeholder={"Enter your  " + dropdown + "  stream key"}
                    />
                    <Button
                      data-test-id="dropdownGetStreamKey"
                      onClick={dropdownGetStreamKey}
                      className="stream-key-button">
                      {"Get " + dropdown + " Stream key"}
                    </Button>
                  </>
                )}
                <Button
                  data-test-id="handleLiveStreamBtn"
                  disabled={dropdown === "choose"}
                  onClick={handleLiveStream}
                  className="go-live-button">
                  Go Live
                </Button>
              </Box>
            )}
          </DialogContent>
        </DialogStyled>
      </Box>
    </MeetingViewerBox>
  );
}

const webStyle = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: colors.primary["900"],
    padding: "20px 10px",
    boxSizing: "border-box",
  },
  participantsContainer: {
    position: "relative",
    flex: 1,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px 10px",
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  endCallButton: {
    backgroundColor: "red",
    borderRadius: 10,
    height: 40,
    width: 40,
    minWidth: 40,
  },
  microphoneContainer: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  micButtonWrapper: {
    display: "flex",
    alignItems: "center",
  },
  endCallMenu: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.primary[700],
  },
  endCallMenuItem: {
    display: "flex",
    alignItems: "center",
    padding: "10 20",
  },
  endCallMenuItemTexts: {
    display: "flex",
    flexDirection: "column",
  },
  transparentActionButton: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#2B3034",
    borderStyle: "solid",
  },
  goLiveForm: {
    display: "flex",
    flexDirection: "column",
  },
  loader: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  endText: {
    color: "#fff",
  },
  waitingHost: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  waitingHostText: {
    color: "#fff",
  },
  copyNLiveContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  copyIdRow: {
    display: "flex",
    alignItems: "center",
  },
};

const CopyNLiveContainerBox = styled(Box)({
  "& .live-text,& .copy-text": {
    fontSize: "16px",
    fontWeight: 600,
    textTransform: "capitalize",
  },
  "& .copy-text": { marginRight: "10px", color: "#fff" },
});

const MeetingViewerBox = styled(Box)({
  "@global": {
    "@keyframes blinker": { from: { opacity: 1 }, to: { opacity: 0 } },
  },
  "& .meeting-action-button": {
    textTransform: "capitalize",
    width: "40px",
    height: "40px",
    minWidth: "40px !important",
    borderWidth: "1.5px !important",
    borderStyle: "solid !important",
    borderRadius: "10px !important",
  },
  "& .expand-button": { padding: "0 !important", marginRight: "10px" },
  "& .blink": {
    animation: "blinker 1.5s cubic-bezier(.5, 0, 1, 1) infinite alternate",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "red",
    marginRight: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .blink .blink-text": { fontSize: "7px", fontWeight: 600 },
  "& .hls-video": {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
});

const DialogStyled = styled(Dialog)({
  "&.chat-dialog .MuiDialog-paper,&.participant-dialog .MuiDialog-paper": {
    marginBottom: "0",
    verticalAlign: "bottom",
    backgroundColor: "#2B3034",
  },
  "&.go-live-dialog .MuiDialog-paper": {
    backgroundColor: "#2B3034",
    width: "30%",
    paddingBottom: "30px",
  },
  "&.chat-dialog .dialog-container,&.participant-dialog .dialog-container": {
    padding: "10px 5px !important",
    minHeight: "50%",
    display: "flex",
  },
  "&.chat-dialog .comment-input input::placeholder": { color: "#9FA0A7" },
  "&.chat-dialog .comment-input": {
    backgroundColor: "#404B53",
    borderRadius: "10px",
    width: "100%",
  },
  "&.chat-dialog .comment-input input": {
    padding: "7px 12px",
    width: "100%",
    height: "30px",
    color: "#9FA0A7",
  },
  "&.go-live-dialog .url-input,&.go-live-dialog .stream-key-input": {
    height: "50px",
    borderRadius: "12px",
    backgroundColor: "#202427",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    padding: "0 20px",
    width: "100%",
    marginTop: "20px",
  },
  "&.go-live-dialog .url-input input,&.go-live-dialog .stream-key-input input":
    {
      textAlign: "center",
    },
  "&.go-live-dialog button": {
    height: "50px",
    borderRadius: "12px",
    color: "#fff",
    fontWeight: 600,
    textTransform: "unset",
    width: "100%",
    marginTop: "20px",
  },
  "&.go-live-dialog .stream-key-button": {
    backgroundColor: "black !important",
  },
  "&.go-live-dialog .go-live-button": { backgroundColor: "blue !important" },
  "&.go-live-dialog .MuiSelect-root": {
    textAlign: "center",
    color: "#fff",
    zIndex: 99,
  },
  "&.go-live-dialog fieldset": {
    borderColor: "transparent",
    backgroundColor: "#202427",
    borderRadius: "12px",
  },
  "&.go-live-dialog svg": { color: "gray", zIndex: 9999 },
  "@media (max-width:1200px)": {
    "&.go-live-dialog .MuiDialog-paper": { width: "50%" },
  },
  "@media (max-width:576px)": {
    "&.go-live-dialog .MuiDialog-paper": { width: "100%" },
  },
});

const StyledMenu = styled(Menu)({
  "&.more-list .MuiPopover-paper,&.end-call-list .MuiPopover-paper,&.mic-list .MuiPopover-paper":
    {
      boxShadow: "0 0 12px 0 rgba(0, 0, 0, 0.24)",
      borderRadius: "8px",
      top: "unset !important",
      backgroundColor: "unset",
      bottom: "50px",
    },
  "&.more-list ul,&.end-call-list ul,&.mic-list ul": {
    padding: "0 !important",
  },
  "&.end-call-list .end-call-menu-text,&.more-list .more-menu-text": {
    color: "#fff",
    fontSize: "12px",
  },
  "&.mic-list .mic-menu-text": { color: "#fff", fontSize: "10px" },
  "&.end-call-list .end-call-menu-subText": {
    color: "#818181",
    fontSize: "12px",
  },
  "&.end-call-list .menu-list-icon,&.more-list .menu-list-icon": {
    marginRight: "20px",
  },
  "&.end-call-list .end-call-menu-button,&.more-list .more-menu-button": {
    padding: "0",
    textAlign: "unset",
    textTransform: "none",
    minWidth: "unset",
    display: "unset",
  },
  "&.end-call-list .end-call-menu-button:not(:last-child),&.more-list .more-menu-button:not(:last-child)":
    {
      borderBottom: "1px solid #404B53",
    },
  "@media (max-width:576px)": {
    "&.end-call-list .MuiPopover-paper": {},
  },
});
