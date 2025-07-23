import React from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import JoinComponent from "./screens/join/JoinComponent";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import { CreateMeeting, ValidateMeeting } from "./Types";

interface VideoComponentProps {
  navigation: any;
  createMeeting: (props: CreateMeeting) => void;
  validateMeeting: (props: ValidateMeeting) => void;
  meetingId: string;
  fetchRecordingFunction: () => void;
}

class VideoComponent extends React.Component<VideoComponentProps, {}> {

  render() {
    return (
      <>
        <JoinComponent
          createMeeting={this.props.createMeeting}
          navigation={this.props.navigation}
          meetingIds={this.props.meetingId}
          validateMeeting={this.props.validateMeeting}
          fetchRecordingFunction={this.props.fetchRecordingFunction}
        />
      </>
    );
  }
}

export default VideoComponent;
