import React from 'react';

// Customizable Area Start
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  FlatList,
  Platform
} from 'react-native';
import Scale from '../../../components/src/Scale';
import {
  backImg,
  closeImg,
  cover,
  edit,
  effect,
  filter,
  magic,
  music,
  play,
  record,
  subtitle,
} from './assets';
import CustomButton from '../../../components/src/Custombutton';
import FONTS from '../../../components/src/Fonts/Fonts';
import VideoTrimmingController, { MusicData, Props, VideoPicker } from './VideoTrimmingController';
import VideoEditingModal from './components/VideoEdit/VideoEditingModal';
import VideoRecordModal from './components/VideoRecord/VideoRecordModal';
import VideoFilterModal from './components/VideoFilter/VideoFilterModal'
import { VideoTrimmingFunction } from './constant';
import VideoSubtitle from './components/VideoSubtitle/VideoSubtitle';
import VideoEffect from './components/VideoEffect/VideoEffect';
import VideoTimeMagic from './components/VideoTimeMagic/VideoTimeMagic';
import VideoCover from './components/VideoCoverModal/VideoCover';
import { ProgressModal } from './CommonFile';
import { translate } from "../../../components/src/i18n/translate";
//@ts-ignore
import VideoPlayer from 'react-native-video-controls';

export const ViewSwitcher = (props: { poster: string, isProcessing: boolean, selectedVideo: VideoPicker | null, onFilterToggle: (type: string) => void, selectedUri: string, selectedTab: VideoTrimmingFunction, videoData: VideoPicker[], onSingleVideo: (video: string) => void, onClose: () => void, selectedId: number, onEditFeature: (allVideo: VideoPicker[]) => void, testID?: string }) => {
  switch (props.selectedTab) {
    case VideoTrimmingFunction.edit: return <VideoEditingModal
      isVisible={true}
      videoData={props.videoData}
      onToggle={props.onEditFeature}
      selectedVideo={props.selectedVideo}
    />;
    case VideoTrimmingFunction.record: return <VideoRecordModal
      isVisible={true}
      videoUri={props.selectedUri}
      poster={props.poster}
      onToggle={props.onSingleVideo} />
    case VideoTrimmingFunction.filter: return <VideoFilterModal
      videoUrl={props.selectedUri}
      isVisible={true}
      onToggle={props.onFilterToggle}
      videoId={props.selectedId}
    />
    case VideoTrimmingFunction.subtitle: return <VideoSubtitle
      isVisible={true}
      videoUri={props.selectedUri}
      videoId={props.selectedId}
      onToggle={props.onSingleVideo} />
    case VideoTrimmingFunction.effect: return <VideoEffect
      isVisible={true}
      onToggle={props.onFilterToggle}
      videoId={props.selectedId}
      videoUrl={props.selectedUri}
      isProcessing={props.isProcessing}
    />
    case VideoTrimmingFunction.magic: return <VideoTimeMagic
      isVisible={true}
      onToggle={props.onFilterToggle}
      videoUrl={props.selectedUri}
      isProcessing={props.isProcessing}
      videoId={props.selectedId}
    />
    case VideoTrimmingFunction.cover: return <VideoCover
      isVisible={true}
      videoUri={props.selectedUri}
      onToggle={props.onSingleVideo}
      videoId={props.selectedId}
    />

    default: return <></>
  }
}
// Merge Engine - Artboard Dimension  - End
// Customizable Area End
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

export default class VideoTrimming extends VideoTrimmingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }



  // Customizable Area Start
  onPressMessageText = (active: any) => {
    this.setState({ activeTab: active, isPlaying: false }, () => {
      this.selectedMusicFile?.release();
      this.selectedMusicFile = undefined
      this.setState({ currentAudioUri: '' })
    })
  }

  textColor = (active: any) => {
    if (active !== this.state.activeTab) {
      return '#aaa';
    } else {
      return '#FFF';
    }
  }

  onPressMessageAudio = (item: any) => {
    if (this.state.currentAudioUri !== item.attributes.audio) {
      this.setState({ currentAudioUri: item.attributes.audio, audioData: item })
    } else {
      this.setState({ currentAudioUri: '', audioData: {} })
    }
    this.setState({ musicModel: true, })
  }

  activeTab = (active: any) => {
    if (active === this.state.activeTab) {
      return (
        <View style={styles.activeBAR} />
      )
    }
  }

  musicModel = (musicData: MusicData[]) => {
    let musicType = [
      { type: 'Recommend', active: 1 },
      // { type: 'Favourites', active: 2 },
      { type: 'Recent', active: 3 },
    ];
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.videoFunctionTab === VideoTrimmingFunction.music}
      >
        <TouchableWithoutFeedback
          testID='releaseTab'
          onPress={() => {
            this.selectedMusicFile?.release();
            this.handleChangeVideoFunctionTab(VideoTrimmingFunction.none, false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalListContainer}>
              <View style={styles.musicType}>
                {this.state.activeTab !== 4 &&
                  musicType.map(({ type, active }) => (
                    <TouchableOpacity
                      key={active}
                      testID='activeTab'
                      onPress={() => this.onPressMessageText(active)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={[
                          styles.musicTextColorActive,
                          {
                            color: this.textColor(active),
                          },
                        ]}
                      >
                        {type}
                      </Text>
                      {this.activeTab(active)}
                    </TouchableOpacity>
                  ))}
                {this.state.activeTab !== 4 && (
                  <TouchableOpacity
                    testID='audio'
                    style={styles.AudioIconDiv}
                    onPress={() => {
                      this.handleChangeVideoFunctionTab(VideoTrimmingFunction.none, false)
                    }}
                  >
                    <Image source={closeImg} style={styles.closeIcon} />
                  </TouchableOpacity>
                )}
              </View>
              {this.state.activeTab === 2 && (
                <View style={styles.favouriteSection}>
                  <Text style={styles.favourite}> No favourite music</Text>
                  <CustomButton
                    testID="selectMusic"
                    title="Select Music"
                    onPress={() => {
                      console.log('select music');
                    }}
                    style={styles.SelectButton}
                  />
                </View>
              )}
              {(this.state.activeTab === 1 || this.state.activeTab === 3) && (
                <FlatList
                  testID='musicDataList'
                  bounces={false}
                  horizontal
                  contentContainerStyle={{ padding: 5 }}
                  data={musicData}
                  renderItem={({ item, index }) => <TouchableOpacity
                    testID='audioBtnId'
                    key={index}
                    onPress={() => this.onPressMessageAudio(item)}
                    style={[styles.iconView, { borderWidth: this.audioBorderWidth(item), borderColor: this.audioBorderColor(item), borderRadius: 4, width: Scale(100), }]}
                  >
                    <Image source={item.attributes.image ? { uri: item.attributes.image } : music} style={styles.songImg} />
                    <Text numberOfLines={2} style={[styles.time, { textAlign: 'center' }]}>
                      {item.attributes.title ?? ''}
                    </Text>
                  </TouchableOpacity>}
                />
              )}
              {this.state.currentAudioUri ? <CustomButton
                title={this.state.isPlaying == null ? `${translate("loading")}` : this.buttonTitle()}
                onPress={this.onMergeAudio}
                style={[styles.customButton, { marginTop: 5, marginBottom: Platform.OS == 'ios' ? 15 : 5 }]}
                TextStyle={{
                  fontFamily: FONTS.MontserratSemiBold,
                  color: '#000',
                }}
                testID={'nextButtonTest'}
              /> : null}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  audioBorderWidth = (item: any) => {
    if (this.state.currentAudioUri == item.attributes.audio) {
      return 2;
    } else {
      return 0;
    }
  }

  audioBorderColor = (item: any) => {
    if (this.state.currentAudioUri == item.attributes.audio) {
      return "yellow";
    } else {
      return 'white';
    }
  }

  buttonTitle = () => {
    if (this.state.isPlaying) {
      return `${translate("stop")}`
    } else {
      return `${translate("play")}`
    }
  }

  onPressImg = (item: any) => {
    this.setState({ selectedVideo: item }, () => {
      if (!(this.state.selectedVideo?.poster ?? '')) {
        this.getFrameImages()
      }
    })
  }

  getSourceUri = () => {
    return `${'file://' + (this.state.selectedVideo?.uri ?? '').replace('file://', '').split('/').map((p) => encodeURIComponent(p)).join('/')}`
  }

  onEditFeature = (videos: VideoPicker[]) => {
    this.handleChangeVideoFunctionTab(VideoTrimmingFunction.none, false)
    if (videos.length == 0) {
      return
    }
    this.setState({ allVideoData: videos, selectedVideo: videos[0] }, () => {
      this.state.allVideoData.forEach((item) => {
        if (item.id == this.state.selectedVideo?.id) {
          this.setState({ selectedVideo: { ...this.state.selectedVideo, uri: item.uri } })
        }
      })
    })
  }

  onFilterToggle = (video: string) => {
    if (video) {
      this.setState({ allVideoData: this.getNewModifiedData(video) })
    }
    this.handleChangeVideoFunctionTab(VideoTrimmingFunction.none, false)
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <View style={{ flex: 1 }}>
        {this.musicModel(this.state.musicData)}

        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="always" style={styles.container}>
          {!this.state.editing && (
            <>
              <View style={styles.topbar}>
                <TouchableOpacity

                  onPress={() => this.props.navigation.goBack()}>
                  <Image source={backImg} style={[styles.backImg, this.state.language == 'ar' && {
                    transform: [{ rotate: '180deg' }],
                    flexDirection: 'row-reverse',
                  }]} />
                </TouchableOpacity>
                <CustomButton
                  title={translate("next")}
                  onPress={() => this.onMergeVideo()}
                  style={styles.customButton}
                  TextStyle={{
                    fontFamily: FONTS.MontserratSemiBold,
                    color: '#000',
                  }}
                  testID={'nextButtonTest'}
                />
              </View>
              <View style={styles.imageContainer}>
                {this.state.allVideoData.length > 1 && <FlatList
                  horizontal
                  style={{ position: 'absolute', left: 0, top: 0, zIndex: 10000 }}
                  contentContainerStyle={{ padding: 10 }}
                  data={this.state.allVideoData}
                  renderItem={({ item, index }) => <TouchableOpacity key={index} onPress={() => this.onPressImg(item)} style={{ borderWidth: 1, borderColor: 'white', marginHorizontal: 5, }} ><View style={{ width: 35, height: 35 }}>
                    <Image
                      source={{ uri: item.poster ? 'file://' + item.poster : '' }}
                      resizeMode='cover'
                      style={{ width: 35, height: 35 }}
                    />
                  </View>
                    <Image source={play} style={{ height: 12, width: 12, resizeMode: 'contain', position: 'absolute', left: 13, top: 11 }} />
                  </TouchableOpacity>}
                />}
                {(this.state.selectedVideo?.uri ?? '') ? <VideoPlayer ref={this.videoRef}
                  source={{ uri: this.getSourceUri() }}
                  key={0}
                  disableBack={true}
                  disableFullscreen={true}
                  disableVolume={true}
                  repeat={true}
                  resizeMode={'contain'}
                  style={styles.ImgStyling}
                  playInBackground={false}
                  paused={this.state.isPaused}
                /> : null}
              </View>

              <ScrollView bounces={false} horizontal contentContainerStyle={styles.bottomBar}>
                {[
                  {
                    icon: music,
                    label: `Music`,
                    onPress: () =>
                      this.handleChangeVideoFunctionTab(
                        VideoTrimmingFunction.music,
                        true
                      ),
                  },
                  {
                    icon: edit,
                    label: `Edit`,
                    onPress: () =>
                      this.handleChangeVideoFunctionTab(
                        VideoTrimmingFunction.edit,
                        true
                      ),
                  },
                  {
                    icon: subtitle,
                    label: `Subtitle`,
                    onPress: () =>
                      this.handleChangeVideoFunctionTab(
                        VideoTrimmingFunction.subtitle,
                        true
                      ),
                  },
                  {
                    icon: effect,
                    label: `Effect`,
                    onPress: () =>
                      this.handleChangeVideoFunctionTab(
                        VideoTrimmingFunction.effect,
                        true
                      ),
                  },
                  {
                    icon: record,
                    label: `Record`,
                    onPress: () =>
                      this.handleChangeVideoFunctionTab(
                        VideoTrimmingFunction.record,
                        true
                      ),
                  },
                  {
                    icon: magic,
                    label: `Time Magic`,
                    onPress: () =>
                      this.handleChangeVideoFunctionTab(
                        VideoTrimmingFunction.magic,
                        true
                      ),
                  },
                  {
                    icon: filter,
                    label: `Filter`,
                    onPress: () =>
                      this.handleChangeVideoFunctionTab(
                        VideoTrimmingFunction.filter,
                        true
                      ),
                  },
                  {
                    icon: cover,
                    label: `Cover`,
                    onPress: () =>
                      this.handleChangeVideoFunctionTab(
                        VideoTrimmingFunction.cover,
                        true
                      ),
                  },
                ].map((item, index) => (
                  <TouchableOpacity
                    key={item.label}
                    onPress={item.onPress}
                    style={styles.iconView}
                  >
                    <Image resizeMode={'contain'} source={item.icon} style={styles.closeIcon} />
                    <Text style={styles.time}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}
          <ViewSwitcher testID="switchertest"
            poster={this.state.selectedVideo?.poster ?? ''}
            selectedId={this.state.selectedVideo?.id ?? 0}
            isProcessing={this.state.isProcessing}
            selectedVideo={this.state.selectedVideo}
            selectedUri={this.state.selectedVideo?.uri ?? ''}
            onSingleVideo={(video: string) => {
              if (video) {
                this.setState({ allVideoData: this.getNewModifiedData(video) })
              }
              this.handleChangeVideoFunctionTab(VideoTrimmingFunction.none, false)
            }}
            onClose={() => this.handleChangeVideoFunctionTab(VideoTrimmingFunction.none, false)}
            onEditFeature={this.onEditFeature} videoData={this.state.allVideoData} selectedTab={this.state.videoFunctionTab}

            onFilterToggle={this.onFilterToggle}
          />
        </ScrollView>
        <ProgressModal isProcessing={this.state.isProcessing} />
      </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  topbar: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: screenHeight * 0.1,
    alignItems: 'center',
    marginTop: Platform.OS == 'ios' ? 25 : 0
  },
  backImg: {
    height: Scale(20),
    width: Scale(20),
    backgroundColor: '#eee',
    padding: 17,
    borderRadius: 10,
  },
  customButton: {
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  imageContainer: {
    height: screenHeight * 0.70,
  },
  ImgStyling: {
    height: screenHeight * 0.77,
    resizeMode: 'cover',
    width: screenWidth,
  },
  closeIcon: {
    height: Scale(30),
    width: Scale(30),
  },
  bottomBar: {
    // height: screenHeight * 0.1,
    position: 'relative',
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    // marginBottom:10
  }, favourite: {
    color: '#aaa',
    fontSize: 16,
    fontFamily: FONTS.MontserratSemiBold,
  },
  SelectButton: {
    backgroundColor: '#212121',
    width: screenWidth * 0.4,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 10,
  },
  songImg: {
    height: Scale(60),
    width: Scale(60),
    resizeMode: 'cover',
  },
  iconView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 13,
  },
  videoProgressBar: {
    marginTop: -50,
    marginLeft: 10,
    marginRight: 10,
  },
  progressBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  },
  timing: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  time: {
    fontFamily: FONTS.MontserratSemiBold,
    color: '#FFF',
  },
  modalContainer: {
    flex: 1,
  },
  modalListContainer: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    borderTopRightRadius: Scale(20),
    borderTopLeftRadius: Scale(20),
    backgroundColor: '#212121',
    minHeight: Scale(200),
  },
  musicType: {
    display: 'flex',
    flexDirection: 'row',
    padding: Scale(15),
  },
  musicTextColorActive: {
    fontFamily: FONTS.MontserratSemiBold,
    padding: Scale(15),
  },
  musicTextColor: {
    color: '#aaa',
    fontFamily: FONTS.MontserratSemiBold,
  },
  activeBAR: {
    height: 3,
    width: 30,
    backgroundColor: '#fff',
  },
  AudioIconDiv: {
    position: 'absolute',
    top: Scale(22),
    right: Scale(20),
  },
  favouriteSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
});
// Customizable Area End