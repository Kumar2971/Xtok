import { ROBOTO_FONTS } from "../../../styles/fonts";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../styles/colors";
import Button from "../../../components/Button";
// @ts-ignore
import { useMeeting } from "@videosdk.live/react-native-sdk";

export default function ParticipantLimitViewer() {
  const { leave } = useMeeting({});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OOPS !!</Text>
      <Text style={styles.description}>
        Maximum 1000 participants can join this meeting.
      </Text>
      <Text style={styles.errorText}>Please try again later</Text>
      <Button
        testID="okButton"
        backgroundColor={colors.purple}
        text="Ok"
        onPress={() => {
          leave();
        }}
        style={styles.button}
        textStyle={{
          fontFamily: ROBOTO_FONTS.RobotoBold,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 24,
    color: colors.primary[100],
    fontFamily: ROBOTO_FONTS.RobotoBold,
  },
  description: {
    fontSize: 12,
    color: colors.primary[100],
    fontFamily: ROBOTO_FONTS.RobotoBold,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 12,
    color: colors.primary[400],
    fontFamily: ROBOTO_FONTS.RobotoMedium,
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 30,
    height: 50,
    marginTop: 30,
  },
});
