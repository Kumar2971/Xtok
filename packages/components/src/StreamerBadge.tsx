import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import Scale from "./Scale";

/**
 * Props interface for the StreamerBadge component.
 */
interface StreamerBadgeProps {
  /** The image source for the badge. */
  badgeImage: ImageSourcePropType;
  /** The level of the badge. */
  level: number;
  language: string;
}

/**
 * A React functional component to display a streamer badge with a given level.
 * @param {StreamerBadgeProps} props - The props for the StreamerBadge component.
 * @returns {React.ReactElement} A React element representing the streamer badge.
 */
const StreamerBadge: React.FC<StreamerBadgeProps> = ({ badgeImage, level, language }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: badgeImage as any }}
        style={styles.image}
        resizeMode="cover"
      >
      <View style={[styles.badge, language==="ar" && styles.badge_ar]}>
        <Text style={[styles.levelText, { left: Scale(level > 9 ? 3 : 6) }]}>
          {level}
        </Text>
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  image: {
    width: Scale(40),
    height: Scale(40),
    resizeMode: "contain"
  },
  badge: {
    position: "absolute",
    bottom: Scale(12),
    width: Scale(19),
    textAlign: "center",
    alignSelf: "center", // Horizontally center the badge inside its container
  },
  badge_ar: {
    start:-2,
    end:-2,
  },
  levelText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default StreamerBadge;
