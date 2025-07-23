import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ROBOTO_FONTS } from "../../../styles/fonts";

interface MenuItemProps {
  title: string;
  description?: string;
  icon?: JSX.Element;
  onPress?: () => void;
  testID?: string;
}

class MenuItem extends React.PureComponent<MenuItemProps> {
  render() {
    const { title, description, icon, onPress, testID } = this.props;
    return (
      <TouchableOpacity onPress={onPress} testID={testID}>
        <View style={styles.container}>
          {icon && <View style={styles.icons}>{icon}</View>}

          <View style={styles.view}>
            <Text style={styles.text}>{title}</Text>

            {description && <Text style={styles.desc}>{description}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 16,
    alignItems: "center",
  },
  icons: {
    marginRight: 14,
  },
  view: {
    flexDirection: "column",
  },
  text: {
    fontFamily: ROBOTO_FONTS.RobotoMedium,
    color: "#FFFFFF",
    fontSize: 12,
  },
  desc: {
    fontFamily: ROBOTO_FONTS.Roboto,
    color: "#818181",
    fontSize: 12,
  },
});
