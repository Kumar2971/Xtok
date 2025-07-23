import React, { useEffect, useRef,useState} from 'react';
import {View, StyleSheet,Dimensions,} from 'react-native';
import Video from 'react-native-video';

const {height, width} = Dimensions.get('window');

import { useIsFocused } from '@react-navigation/native';

import Loader from "../../../../components/src/Loader"
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

const VideoComponent = ({item, isVisible, isNext,mute,setmute}:any) => {
  const displayHeight = Dimensions.get('window').height;
 const [isloading, setloading] = useState(false);
  const [isMute, setisMute] = useState(false);
  const videoRef = useRef(null);
  const url =item.attributes.media;

  const {videoOuter, videoView} = styles;
const screenIsFocused = useIsFocused();
  useEffect(() => {
    if (!isVisible && isNext && videoRef) {
      //@ts-ignore
      videoRef.current.seek(0);
    }
    setisMute(mute);
  }, [isVisible, isNext]);
//  const checkVolumstatus = async()=>{
//   let values=  await AsyncStorage.getItem("chefservicetype");
//   //@ts-ignore
//   setisMute(values);
//  }
  //@ts-ignore
  const videoError = error => {
    // Manage error here
  };
   //@ts-ignore

const onLoadStart = () => {
  setloading(true)
}

const onLoad = () => {
  setloading(false)
}
const videoBuffer = () => {
  
  setloading(true)
  //here you could set the isBuffer value to the state and then do something with it
  //such as show a loading icon
}; 
  return (
    <View style={[videoOuter, {height: displayHeight,}]}>
      {isloading&& <Loader loading={isloading} />}
      <Video
        ref={videoRef}
        fullscreenAutorotate={true}
        source={{uri:url}}
       // autoPlay={true}
        repeat={true}
        onError={videoError}
        resizeMode={'cover'}
        muted={(!isVisible && true) || isMute}
        style={[videoView, {height: displayHeight}]}
        playInBackground={false}
        paused={!isVisible|| (!screenIsFocused )}
        ignoreSilentSwitch={'ignore'}
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        onBuffer={videoBuffer}
      />
      
    
    </View>
  );
};

export {VideoComponent};
