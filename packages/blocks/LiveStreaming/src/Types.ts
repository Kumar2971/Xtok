import React from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface RecordingList {
  sessionId: string;
  roomId: string;
  file?: {
    meta: {
      resolution: {
        width: number;
        height: number;
      };
      format: string;
      duration: number;
    };
    filePath?: string;
    type: string;
    size: string;
    fileUrl: string;
    id: string;
  };
  id: string;
}

export interface MeetingList {
  id: string;
  type: string;
  attributes: {
    roomId: string;
    meeting_link: string;
    session_link: string;
    meeting_id: string;
    created_by: number;
    created_at: string;
    status: boolean;
  };
}

export const ParticipantMode = {
  CONFERENCE: "CONFERENCE",
  VIEWER: "VIEWER",
};

export interface StreamList {
  apiKey: string;
  sessionId: string;
  streamKey: string;
  mode: string;
  start: string;
  end: string;
  template: {
    url: string;
    config: {
      layout: {
        type: string;
        priority: string;
        gridSize: string;
      };
      theme: string;
    };
    isCustom: boolean;
  };
  quality: string;
  orientation: string;
  createdAt: string;
  webhook: {
    totalCount: number;
    successCount: number;
    data: [];
  };
  roomId: string;
  duration: number;
  links: {
    get_room: string;
    get_session: string;
  };
  downstreamUrl: string;
  playbackHlsUrl: string;
  livestreamUrl: string;
  id: string;
}

export interface StreamList1 {
  apiKey: string;
  template: {
    url: string;
    config: {
      layout: {
        type: string;
        priority: string;
        gridSize: string;
      };
      theme: string;
    };
    isCustom: boolean;
  };
  streamKey: string;
  sessionId: string;
  mode: string;
  end: string;
  start: string;
  webhook: {
    totalCount: number;
    successCount: number;
    data: [];
  };
  quality: string;
  orientation: string;
  createdAt: string;
  duration: number;
  roomId: string;
  downstreamUrl?: string;
  links: {
    get_room: string;
    get_session: string;
  };
  livestreamUrl: string;
  id: string;
  isPlayed: boolean;
  playbackHlsUrl: string;
}

export interface CreateMeeting {
  name: string;
  micOn: boolean;
  videoOn: boolean;
}

export interface ValidateMeeting {
  name: string;
  micOn: boolean;
  videoOn: boolean;
  roomId: string;
}
export interface LiveStream {
  meetingId: string;
  streamKey: string;
  streamUrl: string;
}

export const meetingTypes = [
  { key: "ONE_TO_ONE", value: "One to One Meeting" },
];

export interface ActiveMeetingStream {
  roomId: string;
  setDownStreamURL: React.Dispatch<React.SetStateAction<string>>;
}

export interface ChatViewItem {
  message: any;
  senderId: string;
  timestamp: string;
  senderName: any;
}

export interface IconContainerProps {
  backgroundColor?: string;
  onPress: () => void;
  onDropDownPress?: () => void;
  Icon: () => JSX.Element;
  style?: StyleProp<ViewStyle>;
  isDropDown?: boolean;
  testID?: string;
}

export interface SvgTypes {
  width: number;
  height: number;
  fill: string;
}

export interface Stream {
  track: {
    _constraints: {
      deviceId: string;
      facingMode: string;
      frameRate: number;
      height: number;
      width: number;
    };
    _enabled: boolean;
    _muted: boolean;
    _settings: { frameRate: number; height: number; width: number };
    id: string;
    kind: string;
    label: string;
    readyState: string;
    remote: boolean;
  };
}
