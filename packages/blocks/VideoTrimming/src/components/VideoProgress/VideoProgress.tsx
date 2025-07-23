import {
    Dimensions,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import {ReactNativeModal} from 'react-native-modal';
  import React, {PropsWithChildren, ReactElement, useState} from 'react';
  import Scale from '../../../../../components/src/Scale';
  
  export function VideoProgress(
    props: PropsWithChildren<VideoEffectProps>,
  ): ReactElement {
    const {isVisible,percentage} = props;
  
    return (
        <ReactNativeModal
        isVisible={isVisible}
        useNativeDriver={true}
        testID="testProgressModal"
      >
        <View style={styles.progress_ModalContainer}>
          <View style={styles.progress_Circle}>
          <Text style={{fontSize:18,fontWeight:'800'}}>{percentage}%</Text>
          </View>
        </View>
      </ReactNativeModal>
    );
  }
  
  const screenHeight = Dimensions.get('window').height;
  const topBarHeight = screenHeight * 0.03;
  const bottomBarHeight = screenHeight * 0.35;
  const mainContentHeight = screenHeight - topBarHeight - bottomBarHeight;
  const bottomFunctionHeight = bottomBarHeight * 0.7;
  const bottomMainContentHeight = bottomBarHeight - bottomFunctionHeight;
  
  const styles = StyleSheet.create({
    progress_ModalContainer: {
        width: Scale(150),
        height: Scale(150),
        justifyContent: "center",
        backgroundColor: "#ffffff",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: Scale(10),
      },
      progress_Circle: {
        height: Scale(94),
        width: Scale(94),
        borderRadius: Scale(47),
        borderColor: "#3C79F5",
        borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
      }
  });
  
  export interface VideoEffectProps {
    isVisible: boolean;
    percentage:any;
  }
  
  VideoProgress.defaultProps = {};
  
  export default VideoProgress;
  