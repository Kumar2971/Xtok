import React, { useEffect, useRef } from "react";
import Avatar from "../../../../components/avatar/Avatar.web";
import { Box } from "@material-ui/core";
import { LargeVideoRTCViewProps } from "../LargeView/LargeVideoRTCView.web";

const MiniVideoRTCView: React.FC<LargeVideoRTCViewProps> = ({
  stream,
  micStream,
  displayName,
  isOn,
  isMicOn,
}) => {
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const micRef = useRef<HTMLAudioElement | null>(null);

  const fetchTrueElementMini = (
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

  const isMicPlayableMini = () => {
    return !!(isMicOn && micStream);
  };

  const isWebcamPlayableMini = () => {
    return !!(isOn && stream);
  };

  useEffect(() => {
    if (webcamRef.current) {
      if (isWebcamPlayableMini() && stream.track) {
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
      if (isMicPlayableMini() && micStream.track) {
        const mediaStreamMic = new MediaStream();
        mediaStreamMic.addTrack(micStream?.track);
        micRef.current.srcObject = mediaStreamMic;
        micRef.current.play();
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, isMicOn]);

  return (
    <Box sx={webStyle.container}>
      {fetchTrueElementMini(
        isMicPlayableMini(),
        <audio ref={micRef} autoPlay />,
      )}
      {fetchTrueElementMini(
        isWebcamPlayableMini(),
        <video
          height={"100%"}
          width={"100%"}
          style={{ objectFit: "cover" }}
          ref={webcamRef}
          autoPlay
        />,
      )}
      {fetchTrueElementMini(
        !isWebcamPlayableMini(),
        <Avatar
          data-test-id="avatar"
          containerBackgroundColor={"#1A1C22"}
          fullName={displayName}
          fontSize={26}
          style={webStyle.avatar}
        />,
      )}
    </Box>
  );
};
export default MiniVideoRTCView;

const webStyle = {
  container: {
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 160,
    aspectRatio: 0.7,
    borderRadius: 8,
    borderColor: "#ff0000",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3c4043",
  },
  avatar: {
    backgroundColor: "#6F767E",
    height: 60,
    width: 60,
    aspectRatio: 1,
    borderRadius: "50%",
  },
};
