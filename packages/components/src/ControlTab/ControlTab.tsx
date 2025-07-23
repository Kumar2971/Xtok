import React, { PureComponent } from "react";
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";

import TabOption from "./TabOption";
import Scale from "../Scale";

interface Props {
  tabStyle?: ViewStyle;
  firstTabStyle?: ViewStyle;
  lastTabStyle?: ViewStyle;
  activeTabStyle?: ViewStyle;
  tabTextStyle?: TextStyle;
  subTabTextStyle?: TextStyle;
  activeSubTabTextStyle?: TextStyle;
  activeTabTextStyle?: TextStyle;
  tabBadgeContainerStyle?: TextStyle;
  activeTabBadgeContainerStyle?: TextStyle;
  tabBadgeStyle?: TextStyle;
  activeTabBadgeStyle?: TextStyle;
  onTabPress: (index: number) => void;
  textNumberOfLines?: number;
  allowFontScaling?: boolean;
  accessible?: boolean;
  activeTabOpacity?: number;
  enabled?: boolean;
  values: string[];
  badges?: string[];
  multiple?: boolean;
  selectedIndex: number;
  selectedIndices: number[];
  tabsContainerStyle?: ViewStyle;
  tabsContainerDisableStyle?: ViewStyle;
  borderRadius?: number;
  accessibilityLabels?: string[];
  testIDs?: string[];
  subValues: string[];
}

const styles = StyleSheet.create({
  tabsContainerStyle: {
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingHorizontal:Scale(10)
  },
  tabStyle: {
    paddingVertical: Scale(5),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#0076FF",
    borderWidth: 1,
    backgroundColor: "white"
  }
});

const handleTabPress = (
  index: number,
  multiple: boolean,
  selectedIndex: number,
  onTabPress: (index: number) => void
) => {
  if (multiple) {
    onTabPress(index);
  } else if (selectedIndex !== index) {
    onTabPress(index);
  }
};

const getAccessibilityLabelByIndex = (
  accessibilityLabels: string[] | undefined,
  index: number
) =>
  accessibilityLabels &&
  accessibilityLabels.length > 0 &&
  accessibilityLabels[index]
    ? accessibilityLabels[index]
    : undefined;

const getTestIdByIndex = (testIDs: string[] | undefined, index: number) =>
  testIDs && testIDs.length > 0 && testIDs[index] ? testIDs[index] : undefined;

export default class ControlTab extends PureComponent<Props> {
  static defaultProps: Partial<Props> = {
    values: ["One", "Two", "Three"],
    accessible: true,
    accessibilityLabels: [],
    testIDs: [],
    badges: ["", "", ""],
    multiple: false,
    selectedIndices: [0],
    onTabPress: () => {},
    tabsContainerStyle: {},
    tabsContainerDisableStyle: { opacity: 0.6 },
    tabStyle: {},
    firstTabStyle: {},
    lastTabStyle: {},
    activeTabStyle: {},
    tabTextStyle: {},
    subTabTextStyle: {},
    activeSubTabTextStyle: {},
    activeTabTextStyle: {},
    tabBadgeContainerStyle: {},
    activeTabBadgeContainerStyle: {},
    tabBadgeStyle: {},
    activeTabBadgeStyle: {},
    borderRadius: 5,
    textNumberOfLines: 1,
    allowFontScaling: true,
    activeTabOpacity: 1,
    enabled: true
  };

  render() {
    const {
      multiple,
      selectedIndex,
      selectedIndices,
      values,
      badges,
      borderRadius,
      tabsContainerStyle,
      tabsContainerDisableStyle,
      tabStyle,
      firstTabStyle,
      lastTabStyle,
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
      accessibilityLabels,
      testIDs,
      activeTabOpacity,
      enabled,
      subValues
    } = this.props;

    const firstTabStyleDefault: ViewStyle[] = [
      {
        borderLeftWidth: 1,
        borderRightWidth: values && values.length === 2 ? 1 : 0,
        borderTopLeftRadius: borderRadius || 0,
        borderBottomLeftRadius: borderRadius || 0
      }
    ];

    const lastTabStyleDefault: ViewStyle[] = [
      {
        borderLeftWidth: 1,
        borderRadius: borderRadius || 0,
        borderBottomRightRadius: borderRadius || 0,
        borderBottomLeftRadius: borderRadius || 0,
      }
    ];

    const tabsContainerStyles: ViewStyle[] = [
      styles.tabsContainerStyle,
      tabsContainerStyle || {}
    ];
    if (!enabled) {
      tabsContainerStyles.push(tabsContainerDisableStyle || {});
    }

    if (subValues && !Array.isArray(subValues)) {
      throw new Error("Subvalues should be is an array");
    }

    if (
      subValues &&
      subValues.length > 0 &&
      subValues.length !== values.length
    ) {
      throw new Error("Values length should be equal with subvalues props");
    }

    return (
      <View style={tabsContainerStyles} removeClippedSubviews={false}>
        {values &&
          values.map((item, index) => {
            const accessibilityText = getAccessibilityLabelByIndex(
              accessibilityLabels,
              index
            );
            const testID = getTestIdByIndex(testIDs, index);

            return (
              <>
                <TabOption
                  key={item}
                  index={index}
                  badge={badges && badges[index] ? badges[index] : false}
                  isTabActive={
                    multiple
                      ? selectedIndices.includes(index)
                      : selectedIndex === index
                  }
                  text={item}
                  subText={subValues[index]}
                  textNumberOfLines={textNumberOfLines || 1}
                  onTabPress={index =>
                    handleTabPress(index, !!multiple, selectedIndex, onTabPress)
                  }
                  firstTabStyle={
                    index === 0
                      ? [
                          { borderRightWidth: 0 },
                          ...firstTabStyleDefault,
                          firstTabStyle || {}
                        ]
                      : {}
                  }
                  lastTabStyle={
                    index === values.length - 1
                      ? [
                          { borderLeftWidth: 0 },
                          ...lastTabStyleDefault,
                          lastTabStyle || {}
                        ]
                      : {}
                  }
                  tabStyle={[
                    tabStyle || {},
                    index !== 0 && index !== values.length - 1
                      ? { marginLeft: -1 }
                      : {}
                  ]}
                  activeTabStyle={activeTabStyle || {}}
                  tabTextStyle={tabTextStyle || {}}
                  subTabTextStyle={subTabTextStyle || {}}
                  activeSubTabTextStyle={activeSubTabTextStyle || {}}
                  activeTabTextStyle={activeTabTextStyle || {}}
                  tabBadgeContainerStyle={tabBadgeContainerStyle || {}}
                  activeTabBadgeContainerStyle={
                    activeTabBadgeContainerStyle || {}
                  }
                  tabBadgeStyle={tabBadgeStyle || {}}
                  activeTabBadgeStyle={activeTabBadgeStyle || {}}
                  allowFontScaling={allowFontScaling !== false}
                  activeTabOpacity={activeTabOpacity || 1}
                  accessible={accessible !== false}
                  accessibilityLabel={accessibilityText || item}
                  testID={testID || item}
                  enabled={enabled !== false}
                />
                {index !== values.length - 1 && (
                  <View
                    style={{
                      height: Scale(40),
                      width: 1,
                      backgroundColor: 'gray',
                      marginVertical: Scale(10),
                      marginHorizontal: Scale(10),
                    }}
                  />
                )}
              </>
            );
          })}
      </View>
    );
  }
}
