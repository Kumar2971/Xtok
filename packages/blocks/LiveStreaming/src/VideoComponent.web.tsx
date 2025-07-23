import React, { Component } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import JoinComponent from "./screens/join/JoinComponent.web";
import Meeting from "./screens/meeting/Meeting.web";
import { IHlsList, IMeetingList, IRecordingList } from "./types.web";

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

export type IMeetingInfo = {
  view: IMeetingView;
  token: string;
  name: string;
  meetingId: string;
  micEnabled: boolean;
  webcamEnabled: boolean;
  meetingType: string;
  modeTypes: "VIEWER" | "CONFERENCE";
};

export type IMeetingView = "create" | "live";

type IProps = {
  token: string;
  isValid: boolean | null;
  roomId: string;
  meetingId: string;
  meetingList: IMeetingList[];
  recordingList: IRecordingList[];
  hlsList: IHlsList[];
  meetingInfo: IMeetingInfo;
  handleGenerateToken: (meetingInfo: IMeetingInfo) => void;
  handleFetchAllMeetings: () => void;
  handleFetchAllRecordings: (roomId: string) => void;
  handleChangeMeetingId: (value: string) => void;
  handleChangeView: (value: IMeetingInfo) => void;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  handleDeleteRecording: (recordingId: string) => void;
  handleStartRtmpLive: (streamKey: string, streamUrl: string) => void;
  handleStopRtmpLive: (streamKey: string, streamUrl: string) => void;
  handleStartLiveHls: () => void;
  handleStopLiveHls: () => void;
  handleLiveHlsList: (roomId: string) => void;
  handleLiveActiveHls: () => void;
  downStreamUrl: string;
  handleSetDownStreamUrl: (value: string) => void;
  alert: (title: string, error: string) => void;
};

type IState = {};

export default class VideoComponent extends Component<IProps, IState> {
  private videoRef = React.createRef<HTMLVideoElement>();
  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {
    if (typeof navigator !== "undefined") {
      try {
        const stream = await global.navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (!this.videoRef.current) {
          return;
        }

        this.videoRef.current.srcObject = stream;
        await this.videoRef.current.play();
      } catch (error) {
        this.props.alert(
          "",
          "Please Go into Settings and Allow permissions to continue",
        );
      }
    }
  }

  render() {
    const {
      token,
      isValid,
      meetingId,
      meetingList,
      recordingList,
      hlsList,
      meetingInfo,
      handleGenerateToken,
      handleFetchAllMeetings,
      handleFetchAllRecordings,
      handleStartRecording,
      handleStopRecording,
      handleDeleteRecording,
      handleStartRtmpLive,
      handleStopRtmpLive,
      handleStartLiveHls,
      handleStopLiveHls,
      handleLiveHlsList,
      handleLiveActiveHls,
      handleChangeMeetingId,
      downStreamUrl,
      handleSetDownStreamUrl,
      handleChangeView,
      alert,
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        {meetingInfo?.view === "create" ? (
          <JoinComponent
            token={token}
            isValid={isValid}
            meetingId={meetingId}
            meetingList={meetingList}
            recordingList={recordingList}
            hlsList={hlsList}
            handleGenerateToken={handleGenerateToken}
            handleFetchAllMeetings={handleFetchAllMeetings}
            handleFetchAllRecordings={handleFetchAllRecordings}
            handleLiveHlsList={handleLiveHlsList}
            handleDeleteRecording={handleDeleteRecording}
            handleChangeMeetingId={handleChangeMeetingId}
            handleChangeView={handleChangeView}
            alert={alert}
          />
        ) : (
          <Meeting
            handleStartRecording={handleStartRecording}
            handleStopRecording={handleStopRecording}
            handleStartRtmpLive={handleStartRtmpLive}
            handleStopRtmpLive={handleStopRtmpLive}
            handleStartLiveHls={handleStartLiveHls}
            handleStopLiveHls={handleStopLiveHls}
            handleLiveActiveHls={handleLiveActiveHls}
            downStreamUrl={downStreamUrl}
            handleSetDownStreamUrl={handleSetDownStreamUrl}
            handleChangeView={handleChangeView}
            meetingInfo={meetingInfo}
            token={token}
            alert={alert}
          />
        )}
      </ThemeProvider>
    );
  }
}
