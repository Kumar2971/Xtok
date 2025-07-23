import {
  Dimensions,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { closeImg, deleteImg, success, record } from "../../assets";
import React, {
  PropsWithChildren,
  ReactElement,
  useRef,
  useState,
} from "react";
import Scale from "../../../../../components/src/Scale";
import FONTS from "../../../../../components/src/Fonts/Fonts";
import Video from "react-native-video";
// import { FFmpegKit } from "ffmpeg-kit-react-native";
import RNFS from "react-native-fs";
import { formatTime, getDestFilePath, ProgressModal } from "../../CommonFile";
import { v4 as uuidv4 } from "uuid";
//@ts-ignore
import Trimmer from "react-native-trimmer";
import SoundRecorder from "react-native-sound-recorder";
import DeleteModal from "../DeleteModal/DeleteModal";
import { pausebutton } from "../../../../postcreation/src/feed/assets";
export function VideoRecordModal(
  props: PropsWithChildren<VideoEditingProps>
): ReactElement {
  const { isVisible, onToggle, videoUri, poster } = props;

  const videoRef = useRef<any>();
  const [processData, setProcessData] = useState({
    isPaused: false,
    isProcessing: false,
    newVideoUri: videoUri,
    videoCompleted: false,
    isRecording: false,
  });
  const [duration, setDuration] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  let tempFiles: string[] = [];

  const onStartRecording = () => {
    videoRef.current.seek(0);
    const random = uuidv4();
    SoundRecorder.start(SoundRecorder.PATH_CACHE + `/${random}.mp4`).then(
      function () {
        setProcessData({
          isPaused: false,
          isProcessing: false,
          newVideoUri: processData.newVideoUri,
          videoCompleted: false,
          isRecording: true,
        });
      }
    );
  };

  const onStopRecording = () => {
    SoundRecorder.stop().then(function (result: { path: string }) {
      videoRef.current.seek(0);
      setProcessData({
        isPaused: true,
        isProcessing: true,
        newVideoUri: processData.newVideoUri,
        videoCompleted: false,
        isRecording: false,
      });
      onMergeAudio(result.path);
    });
  };

  const onMergeAudio = (audio: string) => {
    setProcessData({
      isPaused: true,
      isProcessing: true,
      newVideoUri: processData.newVideoUri,
      videoCompleted: false,
      isRecording: false,
    });
    const toFile = getDestFilePath();
    const videoInput = `-i "${processData.newVideoUri}"`;
    const command = `-y ${videoInput} -stream_loop -1 -i file://${audio} -filter_complex "[1:0]apad" -shortest ${toFile}`;
    onEncodingVideo(command, toFile);
  };

  const onEncodingVideo = async (command: string, toFile: string) => {
    // try {
    //   const session = await FFmpegKit.execute(command);
    //   const returnCode = await session.getReturnCode();

    //   if (returnCode.isValueSuccess()) {
    //     // Command execution was successful
    //     setProcessData({
    //       isPaused: false,
    //       isProcessing: false,
    //       newVideoUri: toFile,
    //       videoCompleted: false,
    //       isRecording: false,
    //     });
    //     tempFiles.push(toFile);
    //   } else {
    //     // Command execution failed
    //     console.error("FFmpeg command failed with return code:", returnCode);
    //     setProcessData({
    //       isPaused: false,
    //       isProcessing: false,
    //       newVideoUri: processData.newVideoUri,
    //       videoCompleted: false,
    //       isRecording: false,
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error executing FFmpeg command:", error);
    //   setProcessData({
    //     isPaused: false,
    //     isProcessing: false,
    //     newVideoUri: processData.newVideoUri,
    //     videoCompleted: false,
    //     isRecording: false,
    //   });
    // }
  };

  const handleOnProgress = (event: { currentTime: number }) => {
    setProcessData({
      isPaused: false,
      isProcessing: false,
      newVideoUri: processData.newVideoUri,
      videoCompleted: false,
      isRecording: processData.isRecording,
    });
    setSliderValue(event.currentTime);
  };
  return (
    <Modal animationType={"slide"} visible={isVisible}>
      <SafeAreaView style={styles.containerStyle}>
        <View style={styles.topBarView}>
          <TouchableOpacity
            onPress={() => {
              tempFiles.forEach((file) => {
                if (file.includes("Temp")) {
                  RNFS.unlink(file);
                }
              });
              onToggle("");
            }}
          >
            <Image source={closeImg} style={styles.closeStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              tempFiles.forEach((file) => {
                if (file != processData.newVideoUri && file.includes("Temp")) {
                  RNFS.unlink(file);
                }
              });
              onToggle(processData.newVideoUri);
            }}
          >
            <Image source={success} style={styles.closeStyle} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContentContainerStyles}>
          <Video
            fullscreenAutorotate={true}
            ref={videoRef}
            muted={processData.isRecording ? true : false}
            source={{
              uri:
                "file://" +
                (processData.newVideoUri ?? "")
                  .replace("file://", "")
                  .split("/")
                  .map((p) => encodeURIComponent(p))
                  .join("/"),
            }}
            onProgress={handleOnProgress}
            onLoad={(onLoadData: { duration: number }) => {
              setDuration(onLoadData.duration);
            }}
            onEnd={() => {
              setProcessData({
                isPaused: true,
                isProcessing: false,
                newVideoUri: processData.newVideoUri,
                videoCompleted: true,
                isRecording: processData.isRecording,
              });
              if (processData.isRecording) {
                onStopRecording();
              }
            }}
            style={[styles.background]}
            playInBackground={false}
            paused={processData.isPaused}
          />

          <View style={styles.playVideoStyle}>
            <Text style={styles.fontSizeStyle}>
              {formatTime(sliderValue)}/{formatTime(duration)}
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              {processData.videoCompleted && (
                <TouchableOpacity
                  onPress={() => {
                    videoRef.current.seek(0);
                    setProcessData({
                      isPaused: false,
                      isProcessing: false,
                      newVideoUri: processData.newVideoUri,
                      videoCompleted: false,
                      isRecording: processData.isRecording,
                    });
                  }}
                >
                  <Text style={styles.fontSizeStyle}>Replay</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#252525",
            flex: 1,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
          }}
        >
          <View style={{ display: "flex", alignItems: "center" }}>
            <View pointerEvents="none" style={styles.transition}>
              {poster ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    right: 0,
                    left: 0,
                    top: 0,
                    bottom: 0,
                    overflow: "hidden",
                  }}
                >
                  {[
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                  ].map(() => {
                    return (
                      <Image
                        resizeMode={"cover"}
                        source={{ uri: "file://" + poster }}
                        style={{ height: 95, width: 50 }}
                      />
                    );
                  })}
                </View>
              ) : null}
              {duration > 0 && (
                <Trimmer
                  totalDuration={duration * 1000}
                  maximumZoomLevel={200}
                  zoomMultiplier={20}
                  initialZoomValue={2}
                  scaleInOnInit={true}
                  onHandleChange={(event: {
                    leftPosition: number;
                    rightPosition: number;
                  }) => { }}
                  tintColor="transparent"
                  markerColor="white"
                  trackBackgroundColor="transparent"
                  trackBorderColor="white"
                  scrubberColor="white"
                  trimmerLeftHandlePosition={0}
                  trimmerRightHandlePosition={duration * 1000}
                  minimunTrimDuration={0}
                  maxTrimDuration={duration * 1000}
                  scrubberPosition={sliderValue * 1000}
                />
              )}
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                testID="deleteImg"
                onPress={() => {
                  setModalDelete(true);
                }}
              >
                <View
                  style={{
                    backgroundColor: "#424242",
                    padding: 5,
                    borderRadius: 25,
                    height: 35,
                  }}
                >
                  <Image
                    source={deleteImg}
                    style={{ width: 25, height: 25, resizeMode: "contain" }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  processData.isRecording
                    ? onStopRecording()
                    : onStartRecording()
                }
              >
                <View
                  style={{
                    backgroundColor: "#424242",
                    padding: 10,
                    borderRadius: 50,
                    marginRight: Scale(45),
                  }}
                >
                  <Image
                    source={processData.isRecording ? pausebutton : record}
                    style={{ width: 40, height: 40, resizeMode: "contain" }}
                  />
                </View>
              </TouchableOpacity>
              <View />
            </View>
          </View>
        </View>
        <ProgressModal isProcessing={processData.isProcessing} />
        <DeleteModal
          testID="Delete"
          onDelete={() => {
            setProcessData({
              isPaused: false,
              isProcessing: false,
              newVideoUri: videoUri,
              videoCompleted: false,
              isRecording: processData.isRecording,
            });
            setModalDelete(false);
          }}
          label={"Remove current recording"}
          primaryLabel={"Remove"}
          isVisible={modalDelete}
          onCancel={() => setModalDelete(false)}
        />
      </SafeAreaView>
    </Modal>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const topBarHeight = screenHeight * 0.03;
const bottomBarHeight = screenHeight * 0.35;
const mainContentHeight = screenHeight - topBarHeight - bottomBarHeight;
const bottomFunctionHeight = bottomBarHeight * 0.3;
const bottomMainContentHeight = bottomBarHeight - bottomFunctionHeight;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#212121",
  },
  topBarView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 16,
    height: topBarHeight,
  },
  closeStyle: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  background: {
    // resizeMode: 'contain',
    // height: mainContentHeight * 0.85,
    width: mainContentHeight * 0.65,
    flex: 1,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  videosPLay: {
    height: Scale(80),
    width: Scale(80),
    resizeMode: "contain",
  },
  mainContentContainerStyles: {
    height: "60%",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  bottomBarrStyle: {
    backgroundColor: "#303030",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    height: bottomBarHeight,
  },
  bottomMainContentContainerWithFlexxStyle: {
    flex: 1,
  },
  bottomMainContentContainerrStyle: {
    height: bottomMainContentHeight,
  },
  functionBarrStyle: {
    height: bottomFunctionHeight,
  },
  iconViewwStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    paddingLeft: 13,
  },
  iconssStyle: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  iconTexttStyle: {
    color: "#FFF",
    fontFamily: FONTS.MontserratSemiBold,
  },
  backButton2Style: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  backButtonStyle: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  playButtonStyle: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  playVideoStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  fontSizeStyle: {
    fontSize: 15,
    fontFamily: FONTS.MontserratSemiBold,
    color: "#fff",
  },
  bottomModalStyle: {
    position: "relative",
    bottom: 0,
    width: screenWidth,
    borderTopRightRadius: Scale(20),
    borderTopLeftRadius: Scale(20),
    backgroundColor: "#2a2929b3",
    minHeight: Scale(180),
  },
  transition: {},
});

export interface VideoEditingProps {
  isVisible: boolean;
  onToggle(video: string): void;
  videoUri: string;
  poster: string;
}

VideoRecordModal.defaultProps = {};

export default VideoRecordModal;
