import React from 'react';
import {ReactNativeModal} from 'react-native-modal';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator
  } from 'react-native';
import Scale from '../../../components/src/Scale';
import RNFS from "react-native-fs";
import { v4 as uuidv4 } from 'uuid';

export const ProgressModal = (props:{isProcessing:boolean})=> {
    return <ReactNativeModal
    isVisible={props.isProcessing}
    useNativeDriver={true}
    testID="testProgressModal"
  >
    <View style={styles.progress_ModalContainer}>
      <View style={styles.progress_Circle}>
      <ActivityIndicator size="large" color="#fff000" />
      </View>
      <Text style={{fontSize:13,fontWeight:'300',marginTop:5}}>Processing...</Text>
    </View>
  </ReactNativeModal>
}

export const formatTime = (seconds: number) => {
  const minute = Math.floor((seconds % 3600) / 60);
  const second = Math.round(seconds % 60);
  return [minute > 9 ? minute : '0' + minute, second > 9 ? second : '0' + second].filter(Boolean).join(':');
}

export const getDestFilePath = () => {
const random = uuidv4();
return `${RNFS.CachesDirectoryPath
}/${random}Temp.mp4`
}

const styles = StyleSheet.create({
    progress_ModalContainer: {
      width: Scale(90),
      height: Scale(90),
      justifyContent: "center",
      backgroundColor: "#ffffff",
      alignSelf: "center",
      alignItems: "center",
      borderRadius: Scale(10),
    },
    progress_Circle: {
      height: Scale(45),
      width: Scale(45),
      alignItems: "center",
      justifyContent: "center",
    },
  });