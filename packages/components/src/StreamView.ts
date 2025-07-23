import React from 'react';
import {Platform, requireNativeComponent} from 'react-native';

const StreamView = requireNativeComponent(Platform.OS == 'ios' ? "StreamViewRNModule" : "IVSPlayerViewManager");

export default StreamView;