import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { ROBOTO_FONTS } from "../styles/fonts";

interface ButtonProps {
  text: string;
  backgroundColor?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  backgroundColor,
  onPress,
  style = {},
  textStyle = {},
  testID,
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      style={[
        styles.buttonView,
        {
          backgroundColor: backgroundColor ?? "#5568FE",
        },
        style,
      ]}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};
export default Button;

const styles = StyleSheet.create({
  buttonView: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: ROBOTO_FONTS.RobotoBold,
    textTransform: "capitalize",
    letterSpacing: 1,
  },
});
