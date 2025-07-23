import React from "react";
import { StyleSheet, Text, View } from "react-native";
interface AvatarProps {
  fullName: any;
  fontSize: number;
  containerBackgroundColor?: string;
}
const Avatar: React.FC<AvatarProps> = ({
  fullName,
  containerBackgroundColor,
}) => {
  return (
    <View
      style={[styles.container, { backgroundColor: containerBackgroundColor }]}>
      <View style={[styles.textContainer]}>
        {fullName?.name ? (
          <Text style={styles.text}>{fullName.name.charAt(0).toUpperCase()}</Text>
        ) : (
          <Text style={styles.text}>{fullName.charAt(0).toUpperCase()}</Text>        
          )}
      </View>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  text: {
    fontSize: 15,
    color: '#FFFFFF',
  },
});
