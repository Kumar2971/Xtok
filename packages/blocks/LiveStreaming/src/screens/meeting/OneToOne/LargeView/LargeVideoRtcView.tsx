import React from "react";
import {
  MediaStream,
  RTCView,
  // @ts-ignore
} from "@videosdk.live/react-native-sdk";
import { StyleSheet,View,Text } from "react-native";
import Avatar from "../../../../components/avatar/Avatar";
import { Stream } from "../../../../Types";

interface LargeVideoRTCViewProps {
  stream?: Stream;
  displayName: string;
  isOn: boolean;
  objectFit?: string;
  isLocal?: boolean;
}

const DisplayNameComponent: React.FC<LargeVideoRTCViewProps> = ({
  displayName,
  isLocal
}) => {
  return (
    <View
      style={styles.nameView}
    >
      <Text
        numberOfLines={1}
        style={styles.nameText}
      >
        {isLocal ? "You" : displayName || ""}
      </Text>
    </View>
  );
};
const LargeVideoRtcView: React.FC<LargeVideoRTCViewProps> = ({
  stream,
  displayName,
  isOn,
  objectFit,
  isLocal,
}) => {
  {
    console.log("LargeVideoRtcView = " + JSON.stringify(stream));
  }
  return isOn && stream ? (
    <>
    <RTCView
      objectFit={objectFit}
      mirror={!!isLocal}
      style={styles.newStyles}
      streamURL={new MediaStream([stream.track]).toURL()}
    />
    <DisplayNameComponent displayName={displayName} isOn={true} />
    </>
  ) : (
    <Avatar
      containerBackgroundColor={"#1A1C22"}
      fullName={displayName}
      fontSize={26}
    />
  );
};

export default LargeVideoRtcView;

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#232830",
    height: 70,
    aspectRatio: 1,
    borderRadius: 40,
  },
  newStyles: { flex: 1, backgroundColor: "#424242" },
  nameView:{
    alignItems: "center",
    position: "absolute",
    bottom: 8,
    padding: 8,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.3)",
    flexDirection: "row",
    borderRadius: 5,
  },
  nameText:{
    color: "#fff",
    fontSize: 10,
  }
});
