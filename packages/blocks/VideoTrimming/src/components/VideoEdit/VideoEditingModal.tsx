import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ImageBackground,
  Alert,
} from "react-native";
import {
  add,
  audio,
  Canvas,
  closeImg,
  deleteImg,
  edit,
  loader,
  mirror,
  mute,
  play,
  rotate,
  sort,
  speed,
  success,
  transition,
} from "../../assets";
import React, { PropsWithChildren, ReactElement, useRef } from "react";
import Scale from "../../../../../components/src/Scale";
import FONTS from "../../../../../components/src/Fonts/Fonts";
import { VideoTab } from "./constant";
import CanvasOption from "./components/CanvasOption";
import SortOption from "./components/SortOption";
import SpeedOption from "./components/SpeedOption";
import RotateOption from "./components/RotateOption";
import AudioOption from "./components/AudioOption";
import TransitionOption from "./components/TransitionOption";
import DeleteModal from "../DeleteModal/DeleteModal";
import { VideoPicker } from "../../VideoTrimmingController";
//@ts-ignore
import Trimmer from "react-native-trimmer";
import { FFmpegKit, ReturnCode } from "ffmpeg-kit-react-native";

import RNFS from "react-native-fs";
import { v4 as uuidv4 } from "uuid";
import { ProgressModal, formatTime, getDestFilePath } from "../../CommonFile";
import ImageCropPicker from "react-native-image-crop-picker";
//@ts-ignore
import VideoPlayer from "react-native-video-controls";

export function VideoEditingModal(
  props: PropsWithChildren<VideoEditingProps>
): ReactElement {
  const { selectedVideo, isVisible, onToggle, videoData } = props;

  let videoRef = useRef<any>();
  const [activeTab, setActiveTab] = React.useState<number>(VideoTab.add);
  const [processData, setProcessData] = React.useState<{
    isPaused: boolean;
    isProcessing: boolean;
    selectedVideo: VideoPicker | null;
    allVideoData: VideoPicker[];
    deleteModal: boolean;
  }>({
    isPaused: false,
    isProcessing: false,
    selectedVideo: selectedVideo,
    allVideoData: videoData,
    deleteModal: false,
  });

  let tempFiles: string[] = [];

  const onTrim = () => {
    const toFile = getDestFilePath();
    const command = `-i "${processData.selectedVideo?.uri}" -ss 00:${formatTime(
      (processData.selectedVideo?.start ?? 0) / 1000
    )} -t 00:${formatTime(
      (processData.selectedVideo?.end ?? 0) / 1000
    )} -c copy ${toFile}`;
    console.log("TRIM FFmpeg CMD:", command); // Helpful for debugging
    checkFilesExistOrNot(command, toFile, "");
  };

  const onSpeedVideo = (value: string, volume: string) => {
    const toFile = getDestFilePath();
    const command = `-y -i "${processData.selectedVideo?.uri}" -filter_complex "[0:v]setpts=${value}*PTS[v];[0:a]atempo=${volume}[a]" -map "[v]" -map "[a]" ${toFile}`;
    checkFilesExistOrNot(command, toFile, value);
  };

  const onRotate = () => {
    const toFile = getDestFilePath();
    const command = `-y -i "${processData.selectedVideo?.uri}" -vf transpose=1 -preset ultrafast ${toFile}`;
    checkFilesExistOrNot(command, toFile, "");
  };

  const addOriginalAudio = () => {
    const toFile = getDestFilePath();
    const command = `-y -i "${processData.selectedVideo?.uri ?? ""
      }" -stream_loop -1 -i ${processData.selectedVideo?.audio ?? ""
      } -filter_complex "[1:0]apad" -shortest ${toFile}`;
    setAudioFile("");
    checkFilesExistOrNot(command, toFile, "");
  };

  const setAudioFile = (audioFile: string) => {
    let newData: VideoPicker[] = [];
    processData.allVideoData.forEach((item) => {
      if (item.id === processData.selectedVideo?.id) {
        newData.push({ ...item, audio: audioFile });
      } else {
        newData.push(item);
      }
    });
    if (processData.selectedVideo != null) {
      let selecVid = { ...processData.selectedVideo, audio: audioFile };
      setProcessData({
        isPaused: processData.isPaused,
        isProcessing: processData.isProcessing,
        selectedVideo: selecVid,
        allVideoData: newData,
        deleteModal: false,
      });
    } else {
      setProcessData({
        isPaused: processData.isPaused,
        isProcessing: processData.isProcessing,
        selectedVideo: processData.selectedVideo,
        allVideoData: newData,
        deleteModal: false,
      });
    }
  };

  const extractAudio = () => {
    const random = uuidv4();
    let toFile = `${RNFS.CachesDirectoryPath}/${random}.aac`;

    const command = `-y -i "${processData.selectedVideo?.uri}" -vn -acodec copy ${toFile}`;
    FFmpegKit.executeAsync(command, async (session) => {
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        removeAudio(toFile);
      }

      setProcessData({
        isPaused: false,
        isProcessing: false,
        selectedVideo: processData.selectedVideo,
        allVideoData: processData.allVideoData,
        deleteModal: false,
      });
    });
  };

  const onMirror = () => {
    const toFile = getDestFilePath();
    const command = `-y -i "${processData.selectedVideo?.uri}" -vf hflip -c:a copy ${toFile}`;
    checkFilesExistOrNot(command, toFile, "");
  };

  const setCanvasVideo = (color: string) => {
    if (color) {
      const toFile = getDestFilePath();
      let command = `-y -i "${processData.selectedVideo?.uri}" -vf "colorchannelmixer=${color}" -pix_fmt yuv420p -y ${toFile}`;
      checkFilesExistOrNot(command, toFile, "");
    }
  };

  const checkFilesExistOrNot = (
    command: string,
    toFile: string,
    value: string
  ) => {
    setProcessData({
      isPaused: true,
      isProcessing: true,
      selectedVideo: processData.selectedVideo,
      allVideoData: processData.allVideoData,
      deleteModal: false,
    });
    onEncodingVideo(command, toFile, value);
  };

  const onAddRemoveAudio = () => {
    if (processData.selectedVideo?.audio) {
      addOriginalAudio();
    } else {
      extractAudio();
    }
  };

  const getFrameImages = (duration: string) => {
    const random = uuidv4();
    let outputImagePath = `${RNFS.CachesDirectoryPath}/${random}.png`;
    const ffmpegCommand = `-y -i "${processData.selectedVideo?.uri}" -ss 00:${duration}.435 -vframes 1 ${outputImagePath}`;
    FFmpegKit.executeAsync(ffmpegCommand, async (session) => {
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        let newData: VideoPicker[] = [];
        processData.allVideoData.forEach((item) => {
          if (item.id === processData.selectedVideo?.id) {
            newData.push({ ...item, poster: outputImagePath });
          } else {
            newData.push(item);
          }
        });
        if (processData.selectedVideo) {
          setProcessData({
            isPaused: processData.isPaused,
            isProcessing: processData.isProcessing,
            selectedVideo: {
              ...processData.selectedVideo,
              poster: outputImagePath,
            },
            allVideoData: newData,
            deleteModal: false,
          });
        } else {
          setProcessData({
            isPaused: processData.isPaused,
            isProcessing: processData.isProcessing,
            selectedVideo: processData.selectedVideo,
            allVideoData: newData,
            deleteModal: false,
          });
        }
      }
    });
  };

  const onEncodingVideo = async (
    command: string,
    toFile: string,
    value: string
  ) => {
    FFmpegKit.executeAsync(command, async (session) => {
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        let newData: VideoPicker[] = [];
        processData.allVideoData.forEach((item) => {
          if (item.id === processData.selectedVideo?.id) {
            newData.push({ ...item, uri: toFile });
          } else {
            newData.push(item);
          }
        });
        if (processData.selectedVideo) {
          setProcessData({
            isPaused: false,
            isProcessing: false,
            selectedVideo: { ...processData.selectedVideo, uri: toFile },
            allVideoData: newData,
            deleteModal: false,
          });
        } else {
          setProcessData({
            isPaused: false,
            isProcessing: false,
            selectedVideo: processData.selectedVideo,
            allVideoData: newData,
            deleteModal: false,
          });
        }
        tempFiles.push(toFile);
      } else {
        onEncodingVideoFalse(value, toFile)
      }
    })
  };

  const onEncodingVideoFalse = (value: string, toFile: string) => {
    if (value) {
      tempFiles.push(toFile);
      const newFile = getDestFilePath();
      let commandString = `-y -i "${processData.selectedVideo?.uri}" -filter_complex "[0:v]setpts=${value}*PTS[v]" -map "[v]" ${newFile}`;
      onEncodingVideo(commandString, newFile, "");
    } else {
      setProcessData({
        isPaused: false,
        isProcessing: false,
        selectedVideo: processData.selectedVideo,
        allVideoData: processData.allVideoData,
        deleteModal: false,
      });
    }
  }

  const removeAudio = (audioFile: string) => {
    const toFile = getDestFilePath();
    const command = `-y -i "${processData.selectedVideo?.uri}" -c:v copy -an ${toFile}`;
    setProcessData({
      isPaused: true,
      isProcessing: true,
      selectedVideo: processData.selectedVideo,
      allVideoData: processData.allVideoData,
      deleteModal: false,
    });
    FFmpegKit.executeAsync(command, async (session) => {
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        let newData: VideoPicker[] = [];
        processData.allVideoData.forEach((item) => {
          if (item.id === processData.selectedVideo?.id) {
            newData.push({ ...item, uri: toFile, audio: audioFile });
          } else {
            newData.push(item);
          }
        });
        if (processData.selectedVideo) {
          setProcessData({
            isPaused: false,
            isProcessing: false,
            selectedVideo: {
              ...processData.selectedVideo,
              uri: toFile,
              audio: audioFile,
            },
            allVideoData: newData,
            deleteModal: false,
          });
        } else {
          setProcessData({
            isPaused: false,
            isProcessing: false,
            selectedVideo: processData.selectedVideo,
            allVideoData: newData,
            deleteModal: false,
          });
        }
        tempFiles.push(toFile);
      } else {
        setProcessData({
          isPaused: false,
          isProcessing: false,
          selectedVideo: processData.selectedVideo,
          allVideoData: processData.allVideoData,
          deleteModal: false,
        });
      }
    });
  };

  const doClickVideoPicker = () => {
    ImageCropPicker.openPicker({
      cropping: false,
      multiple: true,
      mediaType: "video",
    }).then(async (pickerData) => {
      let pickerVideoData: VideoPicker[] = [];
      for (let videoIndex = 0; videoIndex < pickerData.length; videoIndex++) {
        let duration = pickerData[videoIndex].duration ?? 0;
        if (duration <= 90000) {
          let info = {
            id: videoIndex + 1 + processData.allVideoData.length,
            uri: pickerData[videoIndex].path,
            duration: duration,
            type: "video",
            start: 0,
            end: duration,
            poster: "",
            degree: 0,
            isMuted: false,
            audio: "",
          };
          pickerVideoData.push(info);
        }
      }

      setProcessData({
        isPaused: true,
        isProcessing: processData.isProcessing,
        selectedVideo: pickerVideoData.length > 0 ? pickerVideoData[0] : null,
        allVideoData: [...pickerVideoData, ...processData.allVideoData],
        deleteModal: false,
      });
    });
  };

  const renderSelecVideoView = (item: any, index: any) => {
    return <View style={styles.transition}>
      {item.poster ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 40,
            left: 40,
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
                source={{ uri: "file://" + item.poster }}
                style={{ height: 95, width: 50 }}
              />
            );
          })}
        </View>
      ) : null}
      {item.duration ? (
        <Trimmer
          totalDuration={item.duration}
          maximumZoomLevel={1}
          zoomMultiplier={1}
          initialZoomValue={1}
          scaleInOnInit={false}
          onHandleChange={(event: {
            leftPosition: number;
            rightPosition: number;
          }) => {
            let newData: VideoPicker[] = [];
            processData.allVideoData.forEach((item) => {
              if (
                item.id === processData.selectedVideo?.id
              ) {
                newData.push({
                  ...item,
                  start: event.leftPosition,
                  end: event.rightPosition,
                });
              } else {
                newData.push(item);
              }
            });
            if (processData.selectedVideo) {
              setProcessData({
                isPaused: processData.isPaused,
                isProcessing: processData.isProcessing,
                selectedVideo: {
                  ...processData.selectedVideo,
                  start: event.leftPosition,
                  end: event.rightPosition,
                },
                allVideoData: newData,
                deleteModal: false,
              });
            } else {
              setProcessData({
                isPaused: processData.isPaused,
                isProcessing: processData.isProcessing,
                selectedVideo: processData.selectedVideo,
                allVideoData: newData,
                deleteModal: false,
              });
            }
          }}
          markerColor="white"
          trimmerLeftHandlePosition={item.start}
          trimmerRightHandlePosition={item.end}
          minimunTrimDuration={0}
          trackBackgroundColor="transparent"
          trackBorderColor="white"
          scrubberColor="transparent"
          maxTrimDuration={item.duration}
          tintColor="#F8AFA6"
        />
      ) : null}
    </View>
  }

  const renderItemFlatlist = (item: any, index: any) => {

    return <View
      key={index}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {item.id === processData.selectedVideo?.id ? (

        renderSelecVideoView(item, index)
      ) : (
        <TouchableOpacity
          onPress={() => {
            setProcessData({
              isPaused: processData.isPaused,
              isProcessing: processData.isProcessing,
              selectedVideo: item,
              allVideoData: processData.allVideoData,
              deleteModal: false,
            });
          }}
          key={index}
          style={styles.transitionImage}
        >
          <ImageBackground
            source={
              item.poster
                ? { uri: "file://" + item.poster }
                : loader
            }
            style={{
              height: Scale(60),
              width: Scale(60),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={play}
              style={{
                height: 12,
                width: 12,
                resizeMode: "contain",
              }}
            />
          </ImageBackground>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => setActiveTab(VideoTab.transitions)}
      >
        <Image source={transition} style={styles.icons} />
      </TouchableOpacity>
    </View>
  }

  return (
    <Modal animationType={"slide"} visible={isVisible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            testID="cancel"
            onPress={() => {
              tempFiles.forEach((file) => {
                if (file.includes("Temp")) {
                  RNFS.unlink(file);
                }
              });
              onToggle([]);
            }}
          >
            <Image source={closeImg} style={styles.close} />
          </TouchableOpacity>
          <TouchableOpacity
            testID="success"
            onPress={() => {
              if (processData.allVideoData.length == 0) {
                Alert.alert("Please select atleast one video");
                return;
              }
              tempFiles.forEach((file) => {
                let includeValue = processData.allVideoData.filter(
                  (videos) => videos.uri === file
                );
                if (includeValue.length === 0) {
                  if (file.includes("Temp")) {
                    RNFS.unlink(file);
                  }
                }
              });

              onToggle(processData.allVideoData);
            }}
          >
            <Image source={success} style={styles.close} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContentContainer}>
          <VideoPlayer
            ref={videoRef}
            source={{
              uri:
                processData.selectedVideo != null
                  ? "file://" +
                  (processData.selectedVideo?.uri ?? "")
                    .replace("file://", "")
                    .split("/")
                    .map((p) => encodeURIComponent(p))
                    .join("/")
                  : "",
            }}
            disableBack={true}
            disableFullscreen={true}
            disableVolume={true}
            repeat={true}
            onLoad={(onloadData: {
              duration: number;
              naturalSize: { width: number; height: number };
            }) => {
              let newData: VideoPicker[] = [];
              processData.allVideoData.forEach((item) => {
                if (item.id === processData.selectedVideo?.id) {
                  newData.push({
                    ...item,
                    start: 0,
                    end: onloadData.duration * 1000,
                    duration: onloadData.duration * 1000,
                  });
                } else {
                  newData.push(item);
                }
              });
              if (processData.selectedVideo) {
                setProcessData({
                  isPaused: processData.isPaused,
                  isProcessing: processData.isProcessing,
                  selectedVideo: {
                    ...processData.selectedVideo,
                    start: 0,
                    end: onloadData.duration * 1000,
                    duration: onloadData.duration * 1000,
                  },
                  allVideoData: newData,
                  deleteModal: false,
                });
              } else {
                setProcessData({
                  isPaused: processData.isPaused,
                  isProcessing: processData.isProcessing,
                  selectedVideo: processData.selectedVideo,
                  allVideoData: newData,
                  deleteModal: false,
                });
              }
              if (processData.selectedVideo?.poster === "") {
                getFrameImages(formatTime(Math.round(onloadData.duration / 2)));
              }
            }}
            resizeMode={"contain"}
            playInBackground={false}
            paused={processData.isPaused}
          />
        </View>
        <View style={styles.bottomBar}>
          <View
            style={[
              (activeTab === VideoTab.canvas ||
                activeTab === VideoTab.speed ||
                activeTab === VideoTab.transitions) &&
              styles.bottomMainContentContainerWithFlex,
              styles.bottomMainContentContainer,
            ]}
          >
            {activeTab === VideoTab.add && (
              <View
                style={{
                  marginTop: 30,
                  marginLeft: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity onPress={doClickVideoPicker}>
                  <Image
                    source={add}
                    style={[styles.icons, { marginRight: 10 }]}
                  />
                </TouchableOpacity>
                <FlatList
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={processData.allVideoData}
                  renderItem={({ item, index }) => (

                    renderItemFlatlist(item, index)
                  )}
                />
              </View>
            )}
            {activeTab === VideoTab.sort && (
              <SortOption
                videoData={processData.allVideoData}
                onSelectVideo={(video: VideoPicker) => {
                  setProcessData({
                    isPaused: false,
                    isProcessing: false,
                    selectedVideo: video,
                    allVideoData: processData.allVideoData,
                    deleteModal: false,
                  });
                }}
                onConfirm={(vidData: VideoPicker[]) => {
                  setProcessData({
                    isPaused: processData.isPaused,
                    isProcessing: processData.isProcessing,
                    selectedVideo: processData.selectedVideo,
                    allVideoData: vidData,
                    deleteModal: false,
                  });
                  setActiveTab(VideoTab.add);
                }}
              />
            )}
            {activeTab === VideoTab.canvas && (
              <CanvasOption
                videoUri={processData.selectedVideo?.uri ?? ""}
                onConfirm={(color: string) => {
                  setActiveTab(VideoTab.add);
                  setCanvasVideo(color);
                }}
              />
            )}
            {activeTab === VideoTab.speed && (
              <SpeedOption
                onClose={() => setActiveTab(VideoTab.add)}
                onConfirm={(value: string, volume: string) => {
                  onSpeedVideo(value, volume);
                  setActiveTab(VideoTab.add);
                }}
              />
            )}
            {activeTab === VideoTab.rotate && (
              <RotateOption onConfirm={() => setActiveTab(VideoTab.add)} />
            )}
            {activeTab === VideoTab.audio && (
              <AudioOption onConfirm={() => { }} />
            )}
            {activeTab === VideoTab.transitions && (
              <TransitionOption onConfirm={() => setActiveTab(VideoTab.add)} />
            )}
          </View>
          {(activeTab === VideoTab.sort ||
            activeTab === VideoTab.add ||
            activeTab === VideoTab.copy ||
            activeTab === VideoTab.freeze ||
            activeTab === VideoTab.mirror ||
            activeTab === VideoTab.audio ||
            activeTab === VideoTab.rotate ||
            activeTab === VideoTab.delete) && (
              <ScrollView
                bounces={false}
                horizontal
                contentContainerStyle={styles.functionBar}
              >
                {[
                  {
                    label: "Sort",
                    icon: sort,
                    onPress: () => setActiveTab(VideoTab.sort),
                  },
                  {
                    label: "Canvas",
                    icon: Canvas,
                    onPress: () => setActiveTab(VideoTab.canvas),
                  },
                  {
                    label: "Trim",
                    icon: edit,
                    onPress: () => onTrim(),
                  },
                  {
                    label: "Speed",
                    icon: speed,
                    onPress: () => setActiveTab(VideoTab.speed),
                  },
                  {
                    label: "Mirror",
                    icon: mirror,
                    onPress: () => onMirror(),
                  },
                  {
                    label: "Rotate",
                    icon: rotate,
                    onPress: () => onRotate(),
                  },
                  {
                    label: "Audio",
                    icon: processData.selectedVideo?.audio ? audio : mute,
                    onPress: () => onAddRemoveAudio(),
                  },
                  {
                    label: "Delete",
                    icon: deleteImg,
                    onPress: () =>
                      setProcessData({
                        isPaused: true,
                        isProcessing: processData.isProcessing,
                        selectedVideo: processData.selectedVideo,
                        allVideoData: processData.allVideoData,
                        deleteModal: true,
                      }),
                  },
                ].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.iconView}
                    onPress={item.onPress}
                  >
                    <View
                      style={[
                        styles.icons,
                        { alignItems: "center", justifyContent: "center" },
                      ]}
                    >
                      <Image
                        source={item.icon}
                        style={
                          item.icon == mute ? styles.smallIcons : styles.icons
                        }
                      />
                    </View>
                    <Text style={styles.iconTexts}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
        </View>
        <DeleteModal
          testID="Delete"
          onDelete={() => {
            let allVideos = JSON.parse(
              JSON.stringify(processData.allVideoData)
            );
            let index = allVideos.findIndex(
              (item: VideoPicker) => item.id === processData.selectedVideo?.id
            );
            if (index == null || index == undefined || index == -1) {
              setProcessData({
                isPaused: true,
                isProcessing: processData.isProcessing,
                selectedVideo: processData.selectedVideo,
                allVideoData: processData.allVideoData,
                deleteModal: false,
              });
              return;
            }
            allVideos.splice(index, 1);
            if (allVideos.length > 0) {
              setProcessData({
                isPaused: processData.isPaused,
                isProcessing: processData.isProcessing,
                selectedVideo: allVideos[0],
                allVideoData: allVideos,
                deleteModal: false,
              });
            } else {
              setProcessData({
                isPaused: processData.isPaused,
                isProcessing: processData.isProcessing,
                selectedVideo: null,
                allVideoData: allVideos,
                deleteModal: false,
              });
            }
          }}
          isVisible={processData.deleteModal}
          onCancel={() =>
            setProcessData({
              isPaused: true,
              isProcessing: processData.isProcessing,
              selectedVideo: processData.selectedVideo,
              allVideoData: processData.allVideoData,
              deleteModal: false,
            })
          }
          label={"Delete this clip?"}
        />
        <ProgressModal isProcessing={processData.isProcessing} />
      </SafeAreaView>
    </Modal>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const topBarHeight = screenHeight * 0.03;
const bottomBarHeight = screenHeight * 0.35;
const mainContentHeight = screenHeight - topBarHeight - bottomBarHeight - 20;
const bottomFunctionHeight = bottomBarHeight * 0.3;
const bottomMainContentHeight = bottomBarHeight - bottomFunctionHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 16,
    height: topBarHeight,
  },
  close: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  background: {
    resizeMode: "contain",
    height:
      Platform.OS == "ios" ? mainContentHeight * 0.8 : mainContentHeight * 0.87,
    width: screenWidth,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  transitionImage: {
    height: Scale(60),
    width: Scale(60),
    resizeMode: "cover",
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#FFF",
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  videosPLay: {
    height: Scale(80),
    width: Scale(80),
    resizeMode: "contain",
  },
  mainContentContainer: {
    height: "58%",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  bottomBar: {
    backgroundColor: "#303030",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    height: bottomBarHeight,
    paddingBottom: 10,
  },
  bottomMainContentContainerWithFlex: {
    flex: 1,
  },
  bottomMainContentContainer: {
    height:
      Platform.OS == "ios"
        ? bottomMainContentHeight - 60
        : bottomMainContentHeight - 20,
  },
  functionBar: {
    paddingBottom: 0,
  },
  iconView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    paddingLeft: 13,
  },
  icons: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  smallIcons: {
    height: Scale(20),
    width: Scale(20),
    resizeMode: "contain",
  },
  iconTexts: {
    color: "#FFF",
    fontFamily: FONTS.MontserratSemiBold,
  },
  backButtons2: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  backButtonn: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  playButtonn: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  playVideoo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  fontSize: {
    fontSize: 15,
    fontFamily: FONTS.MontserratSemiBold,
    color: "#fff",
  },
  transition: {
    height: 110,
    alignItems: "center",
    justifyContent: "center",
  },
});

export interface VideoEditingProps {
  isVisible: boolean;
  onToggle(videos: VideoPicker[]): void;
  videoData: VideoPicker[];
  selectedVideo: VideoPicker | null;
}

VideoEditingModal.defaultProps = {};

export default VideoEditingModal;
