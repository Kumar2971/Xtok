import React from "react";
import { BlockComponent } from "../../../../../framework/src/BlockComponent";

import { IMeetingInfo } from "../../VideoComponent.web";
import { IHlsList, IMeetingList, IRecordingList } from "../../types.web";
const cameraPermissionName = "camera" as PermissionName;
const microphonePermissionName = "microphone" as PermissionName;

interface IMeetingType {
  key: string;
  value: string;
}
const meetingTypes: Array<IMeetingType> = [
  { key: "ONE_TO_ONE", value: "One to One Meeting" },
];

export interface Props {
  // Customizable Area Start
  token: string;
  isValid: boolean | null;
  meetingId: string;
  meetingList: IMeetingList[];
  recordingList: IRecordingList[];
  hlsList: IHlsList[];
  handleGenerateToken: (meetingInfo: IMeetingInfo) => void;
  handleFetchAllMeetings: () => void;
  handleFetchAllRecordings: (roomId: string) => void;
  handleLiveHlsList: (roomId: string) => void;
  handleDeleteRecording: (recordingId: string) => void;
  handleChangeMeetingId: (value: string) => void;
  handleChangeView: (value: IMeetingInfo) => void;
  alert: (title: string, error: string) => void;
  //   Customizable Area End
}

interface S {
  // Customizable Area Start
  isMicOn: boolean;
  meetingListViewer: boolean;
  isOpen: boolean;
  recordingListViewer: boolean;
  hlsListViewer: boolean;
  isVideoOn: boolean;
  isCreateMeeting: boolean;
  isJoinMeeting: boolean;
  userName: string;
  meetingId: string;
  meetingType: IMeetingType; 
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

class JoinComponentController extends BlockComponent<Props, S, SS> {
  private webcamRef = React.createRef<HTMLVideoElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      // Customizable Area Start
      isOpen: false,
      meetingListViewer: false,
      recordingListViewer: false,
      hlsListViewer: false,
      isVideoOn: true,
      isMicOn: true,
      isCreateMeeting: false,
      isJoinMeeting: false,
      userName: "",
      meetingId: "",
      meetingType: meetingTypes[0],
      // Customizable Area End
    };
  }

  async componentDidMount() {
    try {
      const res = await navigator.permissions.query({
        name: cameraPermissionName,
      });
      this.setState({ isVideoOn: res.state === "granted" });
    } catch (error: unknown) {
      this.props.alert("", error as string);
    }

    try {
      const res = await navigator.permissions.query({
        name: microphonePermissionName,
      });
      this.setState({ isMicOn: res.state === "granted" });
    } catch (error: unknown) {
      this.props.alert("", error as string);
    }

    this.handlePermission();
  }

  handlePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (!this.webcamRef.current) {
        return;
      }
      this.webcamRef.current.srcObject = stream;
      await this.webcamRef.current.play();
    } catch (error) {
      this.props.alert("Meeting", "You should give permission to webcam");
    }
  };

  handleCopy = async (meetingId: string) => {
    if (typeof navigator !== "undefined") {
      try {
        await navigator.clipboard.writeText(meetingId);
        this.props.alert("Meeting", "Meeting Id copied Successfully");
      } catch (error) {
        this.props.alert("Meeting", "Copying meeting id is failed");
      }
    }
  };

  handleOpenDialog = (
    viewType: "meeting" | "recording" | "hls",
    roomId?: string,
  ) => {
    if (viewType === "meeting") {
      this.props.handleFetchAllMeetings();
      this.setState({
        meetingListViewer: true,
        recordingListViewer: false,
        hlsListViewer: false,
      });
    } else if (roomId && viewType === "recording") {
      this.props.handleFetchAllRecordings(roomId);
      this.setState({
        recordingListViewer: true,
        meetingListViewer: false,
        hlsListViewer: false,
      });
    } else if (roomId && viewType === "hls") {
      this.props.handleLiveHlsList(roomId);
      this.setState({
        hlsListViewer: true,
        recordingListViewer: false,
        meetingListViewer: false,
      });
    }
    this.setState({ isOpen: true });
  };

  handleCloseDialog = () => {
    this.setState({
      meetingListViewer: false,
      recordingListViewer: false,
      hlsListViewer: false,
      isOpen: false,
    });
  };

  handleTogglePermission = (value: "MIC" | "VIDEO") => {
    if (value === "MIC") {
      this.setState((prevState) => ({ isMicOn: !prevState.isMicOn }));
      return;
    }
    this.setState((prevState) => ({ isVideoOn: !prevState.isVideoOn }));
  };

  handleJoinNewMeeting = async () => {
    if (this.state.userName === "") {
      this.props.alert("Meeting", "Please enter your name");
      return;
    }

    const { token, meetingId, handleGenerateToken } = this.props;
    const { userName, isMicOn, isVideoOn, meetingType } = this.state;

    handleGenerateToken({
      view: "create",
      name: userName.trim(),
      token,
      meetingId,
      micEnabled: isMicOn,
      webcamEnabled: isVideoOn,
      meetingType: meetingType.key,
      modeTypes: "CONFERENCE",
    });

    localStorage.setItem("LiveStreamToken", token);
  };

  handleJoinExistedMeeting = async () => {
    if (this.state.userName === "") {
      this.props.alert("", "Please enter your name");
      return;
    }

    if (this.props.meetingId === "") {
      this.props.alert("", "Please enter meeting id");
      return;
    }

    const { token, meetingId, handleGenerateToken } = this.props;
    const { userName, meetingType } = this.state;

    handleGenerateToken({
      view: "create",
      name: userName.trim(),
      token,
      meetingId,
      micEnabled: false,
      webcamEnabled: false,
      meetingType: meetingType.key,
      modeTypes: "VIEWER",
    });

    const validateToken = localStorage.getItem("LiveStreamToken") || token;
    localStorage.setItem("LiveStreamToken", validateToken);
  };

  onDeleteRecording = (id: string) => {
    this.props.handleDeleteRecording(id);
  };

  handleFetchActiveState = (
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
        break;
    }
  };

  handleIsCreatingMeeting = (condition: boolean) => {
    this.setState({ isCreateMeeting: condition });
  };

  handleIsJoinMeeting = (condition: boolean) => {
    this.setState({ isJoinMeeting: condition });
  };

  handleUserNameChange = (value: string) => {
    this.setState({ userName: value });
  };
}

export default JoinComponentController;
