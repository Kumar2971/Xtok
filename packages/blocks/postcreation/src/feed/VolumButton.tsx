import React, { useState} from 'react';
// Customizable Area Start
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5"
const {height, width} = Dimensions.get('window');
//@ts-ignore
const VolumeButton = ({isMute, setisMute}) => {

  const [viewAnim] = useState(new Animated.Value(0));
 
  const onVolumePress = () => {
    setisMute(!isMute);
  
    Animated.timing(viewAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      fadeOut();
    });
  };

  const fadeOut = () => {
    Animated.timing(viewAnim, {
      delay: 500,
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      testID='btnID'
      activeOpacity={1}
      onPress={onVolumePress}
      style={styles.touchArea}>
      <Animated.View
        style={[
          styles.muteBtn,
          {
            opacity: viewAnim,
          },
        ]}>
            {(isMute &&  <Icon name="volume-mute" size={16} color="white"  style={styles.mute}/> ) ||  <Icon name="volume-up" size={16} color="white"  style={styles.mute}/>  }
          
         
   
      </Animated.View>
    </TouchableOpacity>
  );
};

export {VolumeButton};
const styles = StyleSheet.create({
  outer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 5,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  followText: {
    fontSize: 13,
    paddingRight: 10,
    paddingLeft: 2,
    paddingVertical: 8,
    fontWeight: 'bold',
  },
  touchArea: {
    width,
    height: height,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteBtn: {
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mute: {
    height: 20,
    width: 20,
  },
});
// Customizable Area Start