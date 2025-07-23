import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import {
  MicOff,
  MicOn,
  VideoOff,
  VideoOn,
  Person,
} from "../../../../components/icons/Icons";
import { ROBOTO_FONTS } from "../../../../styles/fonts";
// @ts-ignore
import { useParticipant } from "@videosdk.live/react-native-sdk";
interface ParticipantListItemProps {
  participantId: string;
}

export const IconContainer: React.FC<{
  Icon: () => JSX.Element;
  style: StyleProp<ViewStyle>;
  testID?: string;
}> = ({ Icon, style, testID }) => {
  return (
    <View testID={testID} style={[stylesIcons.container, style]}>
      <Icon />
    </View>
  );
};

const stylesIcons = StyleSheet.create({
  container: {
    height: 36,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    borderColor: "rgba(245,245,245, 0.2)",
    borderRadius: 20,
  },
});

const ParticipantListItem: React.FC<ParticipantListItemProps> = ({
  participantId,
}) => {
  const { displayName, webcamOn, micOn, isLocal } =
    useParticipant(participantId);

  const _renderMicIcon = () => {
    return micOn ? (
      <MicOn width={18} height={18} />
    ) : (
      <MicOff width={20} height={20} fill={"#FFFFFF"} />
    );
  };

  const _renderVideoIcon = () => {
    return webcamOn ? (
      <VideoOn height={16} width={16} fill={"#FFFFFF"} />
    ) : (
      <VideoOff width={24} height={24} fill={"#FFFFFF"} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <View style={styles.personView}>
          <Person />
        </View>
        <View style={styles.nameView}>
          <Text style={styles.textName}>
            {isLocal ? "You" : displayName || ""}
          </Text>
        </View>
      </View>
      <View style={styles.iconView}>
        <IconContainer
          testID="micicon"
          style={micOn ? styles.iconMicOn : styles.iconMicOff}
          Icon={_renderMicIcon}
        />

        <IconContainer
          testID="videoicon"
          style={micOn ? styles.iconMicOn : styles.iconMicOff}
          Icon={_renderVideoIcon}
        />
      </View>
    </View>
  );
};

export default React.memo(ParticipantListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#404B53",
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
  },
  personView: {
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: "#6F767E",
  },
  nameView: {
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textName: {
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: ROBOTO_FONTS.RobotoMedium,
  },
  iconView: {
    flexDirection: "row",
  },
  iconMicOn: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  iconMicOff: {
    borderWidth: 0,
    backgroundColor: "#FF5D5D",
  },
});
