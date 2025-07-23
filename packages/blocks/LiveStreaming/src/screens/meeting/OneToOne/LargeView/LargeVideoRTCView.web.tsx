import React, { useEffect, useRef } from "react";
import Avatar from "../../../../components/avatar/Avatar.web";

export interface IStream {
  id: string;
  kind: "audio" | "video" | "share" | "shareAudio";
  codec: string;
  track?: MediaStreamTrack;
  pause(): void;
  resume(): void;
}

export interface LargeVideoRTCViewProps {
  stream: IStream;
  micStream: IStream;
  displayName: string;
  isOn: boolean;
  isMicOn: boolean;
  objectFit?: string;
  isLocal?: boolean;
}

const LargeVideoRTCView: React.FC<LargeVideoRTCViewProps> = ({
  stream,
  micStream,
  displayName,
  isOn,
  isMicOn,
}) => {
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const micRef = useRef<HTMLAudioElement | null>(null);

  const fetchTrueElement = (
    state: boolean,
    component: React.ReactChild | string,
    componentTwo?: React.ReactChild | string,
  ) => {
    switch (state) {
      case true:
        return component;
      case false:
        return componentTwo;
      default:
    }
  };

  const isMicPlayable = () => {
    return !!(isMicOn && micStream);
  };

  const isWebcamPlayable = () => {
    return !!(isOn && stream);
  };

  useEffect(() => {
    if (webcamRef.current) {
      if (isWebcamPlayable() && stream.track) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(stream?.track);
        webcamRef.current.srcObject = mediaStream;
        webcamRef.current.play();
      } else {
        webcamRef.current.srcObject = null;
      }
    }
  }, [stream, isOn]);

  useEffect(() => {
    if (micRef.current) {
      if (isMicPlayable() && micStream.track) {
        const mediaStreamMic = new MediaStream();
        mediaStreamMic.addTrack(micStream?.track);
        micRef.current.srcObject = mediaStreamMic;
        micRef.current.play();
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [isMicOn, micStream]);

  return (
    <>
      {fetchTrueElement(isMicPlayable(), <audio ref={micRef} autoPlay />)}
      {fetchTrueElement(
        isWebcamPlayable(),
        <video
          height={"100%"}
          width={"100%"}
          style={{ objectFit: "cover" }}
          ref={webcamRef}
          autoPlay
        />,
      )}
      {fetchTrueElement(
        !isWebcamPlayable(),
        <Avatar
          data-test-id="avatar"
          containerBackgroundColor={"#1A1C22"}
          fullName={displayName}
          fontSize={26}
          style={webStyle.avatar}
        />,
      )}
    </>
  );
};

export default LargeVideoRTCView;

const webStyle = {
  rtcViewContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "#424242",
  },
  avatar: {
    backgroundColor:"#232830",
    height: 70,
    width: 70,
    aspectRatio: 1,
    borderRadius: "50%",
  },
};
