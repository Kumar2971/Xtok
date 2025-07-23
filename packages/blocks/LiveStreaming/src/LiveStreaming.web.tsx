import React from "react";

// Customizable Area Start
import VideoComponent from "./VideoComponent.web";
// Customizable Area End

import LiveStreamingController, { Props } from "./LiveStreamingController.web";

export default class LiveStreaming extends LiveStreamingController {
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
      <>
        <VideoComponent
          data-test-id="video-component"
          handleGenerateToken={this.handleGenerateToken}
          handleFetchAllMeetings={this.handleFetchAllMeetings}
          handleFetchAllRecordings={this.handleFetchAllRecordings}
          handleLiveHlsList={this.handleLiveHlsList}
          handleStartRecording={this.handleStartRecording}
          handleStopRecording={this.handleStopRecording}
          handleStartRtmpLive={this.handleStartLiveRtmp}
          handleStopRtmpLive={this.handleStopLiveRtmp}
          handleStartLiveHls={this.handleStartLiveHls}
          handleStopLiveHls={this.handleStopLiveHls}
          handleLiveActiveHls={this.handleLiveActiveHls}
          handleDeleteRecording={this.handleDeleteRecording}
          handleSetDownStreamUrl={this.handleSetDownStreamUrl}
          token={this.state.token}
          roomId={this.state.roomId}
          meetingId={this.state.meetingId}
          meetingList={this.state.meetingList}
          recordingList={this.state.recordingList}
          hlsList={this.state.hlsList}
          isValid={this.state.isValid}
          meetingInfo={this.state.meetingInfo}
          handleChangeMeetingId={this.handleChangeMeetingId}
          handleChangeView={this.handleChangeView}
          downStreamUrl={this.state.downStreamUrl}
          alert={(title: string, error: string) => this.showAlert(title, error)}
        />
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
// Customizable Area End
