import React from "react";
import ParticipantListItem from "./ParticipantListItem";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { ROBOTO_FONTS } from "../../../../styles/fonts";

const ParticipantListViewer = ({
  participantIds,
}: {
  participantIds: string[];
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.participantText}>
          Participants ({participantIds.length})
        </Text>
      </View>
      <FlatList
        testID="participants"
        data={participantIds}
        keyExtractor={(item) => `${item}_participant`}
        style={{ marginBottom: 4 }}
        renderItem={({ item }: { item: string }) => (
          <ParticipantListItem participantId={item} />
        )}
      />
    </View>
  );
};

export default ParticipantListViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: "#2B3034",
  },
  mainView: {
    height: 42,
    marginTop: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  participantText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: ROBOTO_FONTS.RobotoBold,
  },
});
