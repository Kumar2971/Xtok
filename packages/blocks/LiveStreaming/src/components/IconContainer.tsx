import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DownArrow } from "./icons/Icons";
import { IconContainerProps } from "../Types";

class IconContainer extends React.PureComponent<IconContainerProps> {
  render() {
    const {
      onPress,
      Icon,
      backgroundColor,
      isDropDown,
      onDropDownPress,
      style,
      testID,
    } = this.props;
    return isDropDown ? (
      <View
        style={[
          style,
          {
            backgroundColor: backgroundColor,
          },
          styles.iconContainer,
        ]}>
        <TouchableOpacity
          testID={testID}
          onPress={onPress}
          style={styles.buttonStyle}>
          <Icon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDropDownPress}
          style={styles.dropdownButton}>
          <DownArrow />
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity
        testID={testID}
        onPress={onPress}
        style={[
          {
            backgroundColor: backgroundColor || "transparent",
          },
          style,
          styles.buttonStyle,
        ]}>
        <Icon />
      </TouchableOpacity>
    );
  }
}
export default IconContainer;
const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",

    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#2B3034",
  },
  buttonStyle: {
    height: 50,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
  },
  dropdownButton: {
    marginLeft: 0,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
