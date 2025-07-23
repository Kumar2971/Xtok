import { ActivityIndicator, ActivityIndicatorProps, View } from "react-native";

import React from "react";
//import Color from "./Color";

interface myProps {
  color?: string;
  size?: number | "small" | "large";
}
export default function CustomLoader(props: myProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <ActivityIndicator
        color={props.color ? props.color :"black"}
        size={props.size ? props.size : "large"}
      />
    </View>
  );
}
