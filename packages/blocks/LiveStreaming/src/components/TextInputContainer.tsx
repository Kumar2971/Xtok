import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { ROBOTO_FONTS } from "../styles/fonts";
interface TextInputContainerProps {
  placeholder?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  testID?: string;
}
const TextInputContainer: React.FC<TextInputContainerProps> = ({
  placeholder,
  value,
  setValue,
  testID,
}) => {
  return (
    <View style={styles.textInputView}>
      <TextInput
        testID={testID}
        style={styles.textInput}
        multiline={true}
        numberOfLines={1}
        placeholder={placeholder}
        placeholderTextColor={"#9A9FA5"}
        onChangeText={(text) => {
          setValue(text);
        }}
        value={value}
      />
    </View>
  );
};

export default TextInputContainer;

const styles = StyleSheet.create({
  textInputView: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202427",
    borderRadius: 12,
    marginVertical: 12,
  },
  textInput: {
    margin: 8,
    padding: 8,
    width: "90%",
    textAlign: "center",
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: ROBOTO_FONTS.RobotoBold,
  },
});
