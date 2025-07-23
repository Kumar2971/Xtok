import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  backwardoff,
  closeImg,
  Forwardoff,
  play,
  success,
} from '../../assets';
import React, { PropsWithChildren, ReactElement, useState } from 'react';
import Scale from '../../../../../components/src/Scale';
import FONTS from '../../../../../components/src/Fonts/Fonts';
import { VideoTab } from './constant';
import TransitionOption from './components/TransitionOption';
import DeleteModal from '../DeleteModal/DeleteModal';
import Video from 'react-native-video';
import { formatTime } from '../../CommonFile';

export function VideoGraffitiModal(
  props: PropsWithChildren<VideoEditingProps>,
): ReactElement {
  const { isVisible, onToggle } = props;

  const [activeTab, setActiveTab] = React.useState<number>(VideoTab.transitions);

  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  const [isPaused, setisPaused] = useState<boolean>(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <Modal animationType={'slide'} visible={isVisible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onToggle}>
            <Image source={closeImg} style={styles.close} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onToggle}>
            <Image source={success} style={styles.close} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContentContainer}>
          <Video
          testID='video'
            fullscreenAutorotate={true}
            source={{ uri: props.videoUrl }}
            repeat={true}
            resizeMode={'cover'}
            muted={false}
            style={{
              height: mainContentHeight * 0.80,
              width: "100%",
            }}
            playInBackground={false}
            onLoad={(newData) => {
              setDuration(newData.duration);
            }}
            paused={isPaused}
            onProgress={(event: any) => {
              setCurrentTime(event.currentTime)
            }}
          />
          {/* <GraffitiOverlay/> */}
          <View style={styles.playVideo}>
            <Text style={styles.fontSize}>{formatTime(currentTime)}/{formatTime(duration)}</Text>
            <TouchableOpacity testID='pause' onPress={() => setisPaused(!isPaused)} >
              <Image source={play} style={styles.playButton} />
            </TouchableOpacity>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Image source={backwardoff} style={styles.backButton} />
              <Image source={Forwardoff} style={styles.backButton2} />
            </View>
          </View>
        </View>

        <View style={styles.bottomBar}>
          <View
            style={[
              (activeTab === VideoTab.transitions) &&
              styles.bottomMainContentContainerWithFlex,
              styles.bottomMainContentContainer,
            ]}
          >
            {activeTab === VideoTab.transitions && (
              <TransitionOption testID='transition' onConfirm={() => setActiveTab(VideoTab.add)} onSelect={(type:any)=>props.onSelectEffect(type)}  />
            )}
          </View>
        </View>
        <DeleteModal
        testID='Delete'
          onDelete={() => setDeleteModal(false)}
          isVisible={deleteModal}
          onCancel={() => setDeleteModal(false)}
        />
      </SafeAreaView>
    </Modal>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const topBarHeight = screenHeight * 0.03;
const bottomBarHeight = screenHeight * 0.35;
const mainContentHeight = screenHeight - topBarHeight - bottomBarHeight;
const bottomFunctionHeight = bottomBarHeight * 0.3;
const bottomMainContentHeight = bottomBarHeight - bottomFunctionHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 16,
    height: topBarHeight,
  },
  close: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: 'contain',
  },
  background: {
    resizeMode: 'contain',
    height: mainContentHeight * 0.85,
    width: mainContentHeight * 0.65,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videosPLay: {
    height: Scale(80),
    width: Scale(80),
    resizeMode: 'contain',
  },
  mainContentContainer: {
    height: mainContentHeight,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  bottomBar: {
    backgroundColor: '#252525',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    height: bottomBarHeight,
  },
  bottomMainContentContainerWithFlex: {
    flex: 1,
  },
  bottomMainContentContainer: {
    height: bottomMainContentHeight,
  },
  functionBar: {
    height: bottomFunctionHeight,
  },
  iconView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 13,
  },
  icons: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: 'contain',
  },
  iconText: {
    color: '#FFF',
    fontFamily: FONTS.MontserratSemiBold,
  },
  backButton2: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: 'contain',
  },
  backButton: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: 'contain',
  },
  playButton: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: 'contain',
  },
  playVideo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  fontSize: {
    fontSize: 15,
    fontFamily: FONTS.MontserratSemiBold,
    color: '#fff',
  },
  bottomModal: {
    position: 'relative',
    bottom: 0,
    width: screenWidth,
    borderTopRightRadius: Scale(20),
    borderTopLeftRadius: Scale(20),
    backgroundColor: '#2a2929b3',
    minHeight: Scale(180),
  },
  transition: {
    backgroundColor: 'yellow',
    width: Scale(200),
    height: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export interface VideoEditingProps {
  isVisible: boolean;
  onToggle: () => void;
  onSelectEffect: Function;
  videoUrl: string
  isProcessing: boolean
}

VideoGraffitiModal.defaultProps = {};

export default VideoGraffitiModal;
