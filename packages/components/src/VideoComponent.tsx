import React, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, Dimensions, AppState, AppStateStatus} from 'react-native';
import Video from 'react-native-video';
import { VolumeButton } from './VolumButton';
const { height, width } = Dimensions.get('window');
import { useIsFocused } from '@react-navigation/native';
import CustomLoader from './CustomLoader';
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  videoView: {
    width,
    opacity: 1,
  },
  videoOuter: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const VideoComponent = ({
  item,
  isVisible,
  isNext,
  mute,
  setmute,
  height,
}: any) => {
  const displayHeight = Dimensions.get('window').height;
  const [isloading, setloading] = useState(false);
  const [isMute, setisMute] = useState(false);
  const videoRef = useRef(null);
  const url = item;
  const [shouldStop, setShouldStop] = useState<boolean>(false);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      if (appState.current === "background") {
        setShouldStop(true);
      } else {
        setShouldStop(false);
      }
    };

    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  const { videoOuter, videoView } = styles;
  const screenIsFocused = useIsFocused();
  useEffect(() => {
    if (!isVisible && isNext && videoRef) {
      //@ts-ignore
      videoRef.current.seek(0);
    }
    setisMute(mute);
  }, [isVisible, isNext, mute]);
  const checkVolumstatus = async () => {
    //@ts-ignore
    setisMute(values);
  };
  //@ts-ignore
  const videoError = (error) => {
    // Manage error here
  };
  //@ts-ignore
  const setmutes = (value) => {
    setisMute(value);
    //isVisible=!isVisible
    // console.log("isMutepress",isMute)
    setmute(value);
  };
  const onLoadStart = () => {
    setloading(true);
  };

  const onLoad = () => {
    // setloading(false)
  };
  const videoBuffer = () => {
    // console.log("isloadinggggggg",);
    setloading(true);
    //here you could set the isBuffer value to the state and then do something with it
    //such as show a loading icon
  };
  return (
    <View style={[{ height: screenHeight - 70 }, height]}>
      {isloading && <CustomLoader />}
      <Video
        ref={videoRef}
        fullscreenAutorotate={true}
        source={{ uri: url }}
        // autoPlay={true}

        repeat={true}
        onError={videoError}
        resizeMode={'cover'}
        muted={!isVisible || isMute}
        style={[{ width: screenWidth, height: screenHeight - 70 }, height]}
        playInBackground={false}
        paused={!isVisible || !screenIsFocused || isMute
          ||shouldStop
        }
        ignoreSilentSwitch={'ignore'}
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        onBuffer={videoBuffer}
      />

      <VolumeButton
        setisMute={setmutes}
        isMute={isMute}
        // setmuteAll={setmute}
      />
    </View>
  );
};

export { VideoComponent };
