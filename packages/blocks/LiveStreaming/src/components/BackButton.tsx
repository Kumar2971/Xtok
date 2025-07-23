import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const BackButton: React.FC<{
  testID?: string;
  setLiveStreaming: (value: React.SetStateAction<boolean>) => void;
}> = ({ setLiveStreaming, testID }) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={() => {
        setLiveStreaming(false);
      }}
      style={styles.backBtn}>
      <MaterialIcon name="arrow-back" color="#fff" size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    marginTop: 1,
    marginBottom: 7,
  },
});
export default BackButton;
