// @ts-ignore
import { useMeeting } from "@videosdk.live/react-native-sdk";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ScreenShare } from "../../../components/icons/Icons";
import { ROBOTO_FONTS } from "../../../styles/fonts";

const LocalParticipantPresenter: React.FC = () => {
  const { disableScreenShare } = useMeeting({});

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        <ScreenShare width={40} height={40} fill={"#FFF"} />
        <Text style={styles.text}>You are presenting to everyone</Text>
        <TouchableOpacity
          testID="disableScreenShare"
          style={styles.btnStopScreenShare}
          onPress={() => {
            disableScreenShare();
          }}>
          <Text style={styles.btnText}>Stop Presenting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocalParticipantPresenter;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#1A1C22",
    justifyContent: "center",
    borderRadius: 8,
    margin: 4,
  },
  screenContainer: {
    alignItems: "center",
  },
  btnStopScreenShare: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#5568FE",
    borderRadius: 12,
    marginVertical: 12,
  },
  text: {
    fontFamily: ROBOTO_FONTS.Roboto,
    fontSize: 14,
    color: "#FFFFFF",
    marginVertical: 12,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: ROBOTO_FONTS.RobotoBold,
  },
});
