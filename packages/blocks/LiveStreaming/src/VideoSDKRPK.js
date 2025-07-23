import React from "react";
import { NativeModules } from "react-native";

class VideoSDKRPK extends React.Component {
  constructor(nativeModule) {
    super(nativeModule);
  }
}

export default new VideoSDKRPK(NativeModules.VideosdkRPK);
