import React, { Component } from "react";
import { MeetingConsumer, MeetingProvider } from "@videosdk.live/react-sdk";
import MeetingContainer from "./MeetingContainer.web";
import { IMeetingInfo } from "../../VideoComponent.web";

type IProps = {
  token: string;
  meetingInfo: IMeetingInfo;
  handleChangeView: (value: IMeetingInfo) => void;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  handleStartRtmpLive: (streamKey: string, streamUrl: string) => void;
  handleStopRtmpLive: (streamKey: string, streamUrl: string) => void;
  handleStartLiveHls: () => void;
  handleStopLiveHls: () => void;
  // handleLiveHlsList: () => this.handleLiveHlsList(),
  handleLiveActiveHls: () => void;
  downStreamUrl: string;
  handleSetDownStreamUrl: (value: string) => void;
  alert: (title: string, error: string) => void;
};

type IState = {};
export default class Meeting extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const {
      meetingInfo: {
        token,
        meetingId,
        micEnabled,
        name,
        webcamEnabled,
        meetingType,
        modeTypes,
      },
      handleStartRecording,
      handleStopRecording,
      handleStartRtmpLive,
      handleStopRtmpLive,
      handleStartLiveHls,
      handleStopLiveHls,
      handleLiveActiveHls,
      downStreamUrl,
      handleSetDownStreamUrl,
      handleChangeView,
      alert,
    } = this.props;

    return (
      <MeetingProvider
        config={{
          meetingId,
          micEnabled,
          webcamEnabled,
          mode: modeTypes,
          name,
        }}
        token={token}>
        <MeetingConsumer
          data-test-id="meetingConsumer"
          {...{
            onMeetingLeft: () => {
              setTimeout(() => {
                handleChangeView({ ...this.props.meetingInfo, view: "create" });
              }, 1000);
            },
          }}>
          {() => {
            return (
              <>
                {meetingId && (
                  <MeetingContainer
                    webcamEnabled={webcamEnabled}
                    meetingType={meetingType}
                    handleChangeView={handleChangeView}
                    handleStartRtmpLive={handleStartRtmpLive}
                    handleStopRtmpLive={handleStopRtmpLive}
                    handleStartRecording={handleStartRecording}
                    handleStopRecording={handleStopRecording}
                    handleStartLiveHls={handleStartLiveHls}
                    handleStopLiveHls={handleStopLiveHls}
                    handleLiveActiveHls={handleLiveActiveHls}
                    downStreamUrl={downStreamUrl}
                    handleSetDownStreamUrl={handleSetDownStreamUrl}
                    alert={alert}
                  />
                )}
              </>
            );
          }}
        </MeetingConsumer>
      </MeetingProvider>
    );
  }
}
