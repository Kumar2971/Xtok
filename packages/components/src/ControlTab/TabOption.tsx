import React, { PureComponent, ReactNode } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle
} from "react-native";

type Props = {
  isTabActive?: boolean;
  index?: number;
  badge?: any;
  text: string;
  subText?: string;
  firstTabStyle?: ViewStyle | ViewStyle[] | undefined;
  lastTabStyle?: ViewStyle | ViewStyle[] | undefined;
  tabStyle?: ViewStyle | ViewStyle[] | undefined;
  activeTabStyle?: ViewStyle | undefined;
  tabTextStyle?: TextStyle | undefined;
  subTabTextStyle?: TextStyle | undefined;
  activeSubTabTextStyle?: TextStyle | undefined;
  activeTabTextStyle?: TextStyle | undefined;
  tabBadgeContainerStyle?: ViewStyle | undefined;
  activeTabBadgeContainerStyle?: ViewStyle | undefined;
  tabBadgeStyle?: TextStyle | undefined;
  activeTabBadgeStyle?: TextStyle | undefined;
  onTabPress: (index: number) => void;
  textNumberOfLines?: number;
  allowFontScaling?: boolean;
  accessible?: boolean;
  activeTabOpacity?: number;
  accessibilityLabel?: string;
  testID?: string;
  enabled?: boolean;
};

const styles = StyleSheet.create({
  tabStyle: {
    paddingVertical: 5,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#0076FF",
    borderWidth: 1,
    backgroundColor: "white"
  },
  activeTabStyle: {
    backgroundColor: "#0076FF"
  },
  tabTextStyle: {
    color: "#0076FF"
  },
  subTabTextStyle: {
    color: "#2d3c4b"
  },
  subActiveTabTextStyle: {
    color: "#2d3c4b"
  },
  activeTabTextStyle: {
    color: "white"
  },
  tabBadgeContainerStyle: {
    borderRadius: 20,
    backgroundColor: "red",
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5,
    marginBottom: 3
  },
  activeTabBadgeContainerStyle: {
    backgroundColor: "white"
  },
  tabBadgeStyle: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold"
  },
  activeTabBadgeStyle: {
    color: "black"
  }
});

export default class TabOption extends PureComponent<Props> {
  static defaultProps: Partial<Props> = {
    isTabActive: false,
    index: 0,
    badge: "",
    firstTabStyle: {},
    lastTabStyle: {},
    tabStyle: {},
    activeTabStyle: {},
    tabTextStyle: {},
    subTabTextStyle: {},
    activeSubTabTextStyle: {},
    activeTabTextStyle: {},
    tabBadgeContainerStyle: {},
    activeTabBadgeContainerStyle: {},
    tabBadgeStyle: {},
    activeTabBadgeStyle: {},
    textNumberOfLines: 1,
    allowFontScaling: false,
    accessible: true,
    activeTabOpacity: 1,
    accessibilityLabel: "",
    testID: "",
    enabled: false,
    subText: "",
    onTabPress: () => {}
  };

  render(): ReactNode {
    const {
      isTabActive,
      index,
      badge,
      text,
      firstTabStyle,
      lastTabStyle,
      tabStyle,
      activeTabStyle,
      tabTextStyle,
      subTabTextStyle,
      activeSubTabTextStyle,
      activeTabTextStyle,
      tabBadgeContainerStyle,
      activeTabBadgeContainerStyle,
      tabBadgeStyle,
      activeTabBadgeStyle,
      onTabPress,
      textNumberOfLines,
      allowFontScaling,
      accessible,
      activeTabOpacity,
      accessibilityLabel,
      testID,
      enabled,
      subText
    } = this.props;

    return (
      <TouchableOpacity
        style={[
          styles.tabStyle,
          tabStyle,
          isTabActive ? [styles.activeTabStyle, activeTabStyle] : {},
          firstTabStyle,
          lastTabStyle
        ]}
        accessible={accessible}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        // accessibilityTraits={isTabActive ? "selected" : "button"}
        // accessibilityComponentType="button"
        onPress={() => onTabPress(index || 0)}
        disabled={!enabled}
        activeOpacity={activeTabOpacity}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text
              style={[
                styles.tabTextStyle,
                tabTextStyle,
                isTabActive
                  ? [styles.activeTabTextStyle, activeTabTextStyle]
                  : {}
              ]}
              numberOfLines={textNumberOfLines}
              allowFontScaling={allowFontScaling}
              ellipsizeMode="tail"
            >
              {text}
            </Text>
            <Text
              style={[
                styles.subTabTextStyle,
                subTabTextStyle,
                isTabActive
                  ? [styles.activeTabTextStyle, activeSubTabTextStyle]
                  : {}
              ]}
              numberOfLines={textNumberOfLines}
              allowFontScaling={allowFontScaling}
              ellipsizeMode="tail"
            >
              {subText}
            </Text>
          </View>
          {Boolean(badge) && (
            <View
              style={[
                styles.tabBadgeContainerStyle,
                tabBadgeContainerStyle,
                isTabActive
                  ? [
                      styles.activeTabBadgeContainerStyle,
                      activeTabBadgeContainerStyle
                    ]
                  : {}
              ]}
            >
              <Text
                style={[
                  styles.tabBadgeStyle,
                  tabBadgeStyle,
                  isTabActive
                    ? [styles.activeTabBadgeStyle, activeTabBadgeStyle]
                    : {}
                ]}
                allowFontScaling={allowFontScaling}
              >
                {badge}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
