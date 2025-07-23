import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useEffect, useState } from "react";
import OneToOneMeetingViewer from "./OneToOne/MeetingViewer.web";
import WaitingToJoinView from "./Components/WaitingToJoinView.web";
import ParticipantLimitViewer from "./OneToOne/ParticipantLimitViewer.web";
import { IMeetingInfo } from "../../VideoComponent.web";

interface MeetingContainerProps {
  webcamEnabled: boolean;
  meetingType: string;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  handleStartRtmpLive: (streamKey: string, streamUrl: string) => void;
  handleStopRtmpLive: (streamKey: string, streamUrl: string) => void;
  handleChangeView: (value: IMeetingInfo) => void;
  handleStartLiveHls: () => void;
  handleStopLiveHls: () => void;
  handleLiveActiveHls: () => void;
  downStreamUrl: string;
  handleSetDownStreamUrl: (value: string) => void;
  alert: (title: string, error: string) => void;
}

const MeetingContainer: React.FC<MeetingContainerProps> = ({
  webcamEnabled,
  handleStartRecording,
  handleStopRecording,
  handleStartRtmpLive,
  handleStopRtmpLive,
  handleStartLiveHls,
  handleStopLiveHls,
  handleLiveActiveHls,
  downStreamUrl,
  handleSetDownStreamUrl,
  alert,
}) => {
  const [isJoined, setJoined] = useState(false);
  const [participantLimit, setParticipantLimit] = useState(false);
  let timers: ReturnType<typeof setTimeout>;
  const { join, changeWebcam, participants, leave } = useMeeting({
    onParticipantLeft: () => {
      if (participants.size < 10) {
        setParticipantLimit(false);
      }
    },
  });

  const onMeetingJoined = async () => {
    timers = setTimeout(async () => {
      setJoined(true);
    }, 3000);
  };

  useEffect(() => {
    if (isJoined && participants.size > 10) {
      setParticipantLimit(true);
    }
  }, [isJoined]);

  useEffect(() => {
    onMeetingJoined();
    setTimeout(async () => {
      if (!isJoined) {
        join();

        if (webcamEnabled) {
          changeWebcam("");
        }
      }
    }, 500);
    return () => {
      leave();
      clearTimeout(timers);
    };
  }, []);

  if (isJoined) {
    return participantLimit ? (
      <ParticipantLimitViewer />
    ) : (
      <OneToOneMeetingViewer
        handleStartRecording={handleStartRecording}
        handleStopRecording={handleStopRecording}
        handleStartRtmpLive={handleStartRtmpLive}
        handleStopRtmpLive={handleStopRtmpLive}
        handleStartLiveHls={handleStartLiveHls}
        handleStopLiveHls={handleStopLiveHls}
        handleLiveActiveHls={handleLiveActiveHls}
        downStreamUrl={downStreamUrl}
        handleSetDownStreamUrl={handleSetDownStreamUrl}
        alert={alert}
      />
    );
  } else {
    return <WaitingToJoinView />;
  }
};

export default MeetingContainer;
