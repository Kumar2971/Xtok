import {
  Dimensions,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { closeImg, success } from "../../assets";
import React, {
  PropsWithChildren,
  ReactElement,
  useState,
  useRef,
  useEffect,
} from "react";
import Scale from "../../../../../components/src/Scale";
import FONTS from "../../../../../components/src/Fonts/Fonts";
import DeleteModal from "../DeleteModal/DeleteModal";
import { VideoCoverTab, videoCoverTabs } from "./constant";
import CoverEmojiPicker from "./components/CoverEmojiPicker";
import RNFS from "react-native-fs";
import Entypo from "react-native-vector-icons/Entypo";
//@ts-ignore
import { DragResizeBlock } from "react-native-drag-resize";
import { ProgressModal, getDestFilePath } from "../../CommonFile";
//@ts-ignore
import VideoPlayer from "react-native-video-controls";
import { translate } from "../../../../../components/src/i18n/translate";
import {
  FFmpegKit,
  FFmpegKitConfig,
  ReturnCode,
} from "ffmpeg-kit-react-native";

export function VideoCover(
  props: PropsWithChildren<VideoCoverProps>
): ReactElement {
  const { isVisible, onToggle, videoUri } = props;
  const [videoActiveTab, setVideoActiveTab] = useState<number>(
    VideoCoverTab.stickers
  );

  const dragRef = useRef<any>();

  interface EmojiCovers {
    defTextID: number;
    defTextValue: string;
    defXaxis: number;
    defYaxis: number;
    defWidth: number;
    defHeight: number;
  }

  const [processData, setProcessData] = React.useState({
    isPaused: false,
    isProcessing: false,
    finishedUrl: "",
  });
  const [videoLayout, setVideoLayout] = useState({
    videoLayoutHeight: 0,
    videoLayoutWidth: 0,
  });
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [coverEmojiData, setCoverEmojiData] = useState<EmojiCovers[]>([]);

  useEffect(() => {
    if (processData.finishedUrl) {
      onToggle(processData.finishedUrl);
    }
  }, [processData]);

  const removeEmoji = (arrayText: number) => {
    let newArray = JSON.parse(JSON.stringify(coverEmojiData));
    let index = newArray.findIndex(
      (newObj: EmojiCovers) => newObj.defTextID === arrayText
    );
    newArray.splice(index, 1);
    setCoverEmojiData(newArray);
  };

  const converterNewH = (height: number) => {
    return (height * 120) / videoLayout.videoLayoutHeight;
  };
  const converterNewW = (width: number) => {
    return (width * 200) / videoLayout.videoLayoutWidth;
  };

  const onComplete = async () => {
    setProcessData({ isPaused: true, isProcessing: true, finishedUrl: "" });

    if (Platform.OS === "android") {
      FFmpegKitConfig.setFontDirectory("/system/fonts");
    } else {
      FFmpegKitConfig.setFontDirectory("/System/Library/Fonts");
    }

    const toFile = getDestFilePath();

    const videoInput = `-i "${videoUri}"`;

    let textMulti: string = ``;
    let imageUri: string = "";
    if (coverEmojiData.length == 0) {
      onToggle("");
      return;
    }
    coverEmojiData.forEach((item: EmojiCovers, index: number) => {
      imageUri += `-i ${item.defTextValue} `;
      textMulti += `[${index + 1}:v]scale=${item.defWidth * 1}:${item.defHeight * 1
        } [ovrl${index == 0 ? "" : index}]; ${index == 0 ? `[${index}:v]` : `[v${index}]`
        }[ovrl${index == 0 ? "" : index}]overlay=x=${converterNewW(
          item.defXaxis
        )}:y=${converterNewH(item.defYaxis)}[v${index + 1}]`;
      if (index != coverEmojiData.length - 1) {
        textMulti += ";";
      }
    });

    const command = `-y ${videoInput} ${imageUri} -filter_complex "${textMulti}" -map "[v${coverEmojiData.length}]" -map 0:a? -c:a copy ${toFile}`;
    checkFilesAvailablity(command, toFile);
  };

  const checkFilesAvailablity = (command: string, toFile: string) => {
    EncodingVideo(command, toFile);
  };

  const EncodingVideo = async (command: string, toFile: string) => {
    FFmpegKit.executeAsync(command, async (session) => {
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        if (videoUri.includes("Temp")) {
          RNFS.unlink(videoUri);
        }
        setProcessData({
          isPaused: false,
          isProcessing: false,
          finishedUrl: toFile,
        });
      } else {
        setProcessData({
          isPaused: false,
          isProcessing: false,
          finishedUrl: "",
        });
      }
    });
  };
  return (
    <Modal animationType={"slide"} visible={isVisible}>
      <View style={styles.container}>
        <SafeAreaView style={styles.topBar}>
          <TouchableOpacity testID="close" onPress={() => setModalDelete(true)}>
            <Image source={closeImg} style={styles.close} />
          </TouchableOpacity>
          <TouchableOpacity testID="success" onPress={onComplete}>
            <Image source={success} style={styles.close} />
          </TouchableOpacity>
        </SafeAreaView>
        <View
          testID="layout"
          onLayout={(event) => {
            let { width, height } = event.nativeEvent.layout;
            setVideoLayout({
              videoLayoutHeight: height,
              videoLayoutWidth: width,
            });
          }}
          style={[styles.mainContentContainer]}
        >
          {coverEmojiData.map((coverObj: EmojiCovers) => (
            <DragResizeBlock
              ref={dragRef}
              limitation={{
                x: 0,
                y: 0,
                w: videoLayout.videoLayoutWidth,
                h: videoLayout.videoLayoutHeight - 60,
              }}
              minX={0}
              minY={0}
              maxX={screenWidth - 20}
              x={0}
              y={0}
              maxY={mainContentHeight * 0.85}
              onResizeEnd={(coord: number[]) => {
                let dataArray = JSON.parse(JSON.stringify(coverEmojiData));
                let newIndex = dataArray.findIndex(
                  (arraySub: EmojiCovers) =>
                    arraySub.defTextID === coverObj.defTextID
                );
                if (
                  newIndex == null ||
                  newIndex == undefined ||
                  newIndex == -1
                ) {
                  return;
                }
                dataArray[newIndex].defWidth =
                  Math.round(
                    dragRef?.current?._reactInternalFiber?.memoizedState?.w ??
                    20
                  ) - 20;
                dataArray[newIndex].defHeight =
                  Math.round(
                    dragRef?.current?._reactInternalFiber?.memoizedState?.h ??
                    20
                  ) - 20;
                dataArray[newIndex].defXaxis = coord[0];
                dataArray[newIndex].defYaxis = coord[1];
                setCoverEmojiData(dataArray);
              }}
              onPressOut={() => { }}
              onDragStart={() =>
                setProcessData({
                  isPaused: true,
                  isProcessing: false,
                  finishedUrl: "",
                })
              }
              onDragEnd={(event: number[]) => {
                let dataArray = JSON.parse(JSON.stringify(coverEmojiData));
                let newIndex = dataArray.findIndex(
                  (arraySub: EmojiCovers) =>
                    arraySub.defTextID === coverObj.defTextID
                );
                if (
                  newIndex == null ||
                  newIndex == undefined ||
                  newIndex == -1
                ) {
                  return;
                }
                dataArray[newIndex].defXaxis = event[0];
                dataArray[newIndex].defYaxis = event[1];
                setCoverEmojiData(dataArray);
              }}
              onPressIn={() => { }}
            >
              <View style={{ padding: Scale(10) }}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Image
                    resizeMode={"contain"}
                    style={{
                      width: coverObj.defWidth,
                      height: coverObj.defHeight,
                      padding: 5,
                    }}
                    source={{ uri: coverObj.defTextValue }}
                  />
                </View>
                <TouchableOpacity
                  style={[styles.removeCrossButton]}
                  onPress={() => removeEmoji(coverObj.defTextID)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Entypo name="cross" size={17} color={"#ffffff"} />
                </TouchableOpacity>
              </View>
            </DragResizeBlock>
          ))}
          <VideoPlayer
            testID="video"
            key={1}
            source={{
              uri:
                "file://" +
                (videoUri ?? "")
                  .replace("file://", "")
                  .split("/")
                  .map((p) => encodeURIComponent(p))
                  .join("/"),
            }}
            style={[styles.background]}
            disableBack={true}
            disableFullscreen={true}
            disableVolume={true}
            repeat={true}
            resizeMode={"contain"}
            playInBackground={false}
            paused={processData.isPaused}
          />
        </View>
        <View style={styles.bottomBar}>
          <View style={[styles.bottomMainContentContainer]}>
            <View style={styles.tabContainerStyle}>
              {videoCoverTabs.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setVideoActiveTab(item.value);
                  }}
                >
                  <Text
                    style={[
                      styles.tabLabelStyle,
                      videoActiveTab === item.value && styles.activeTabLabelStyle,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {videoActiveTab === item.value && (
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View style={styles.activeTabStyle} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <CoverEmojiPicker
            isSticker={VideoCoverTab.emoji === videoActiveTab ? false : true}
            onChange={(emoji: string) => {
              let dataArray = JSON.parse(JSON.stringify(coverEmojiData));
              let textId = dataArray.length + 1;
              dataArray = [
                ...dataArray,
                {
                  defTextID: textId,
                  defTextValue: emoji,
                  defXaxis: 0,
                  defYaxis: 0,
                  defWidth: 70,
                  defHeight: 70,
                },
              ];
              setCoverEmojiData(dataArray);
            }}
          />
        </View>
        <DeleteModal
          testID="Delete"
          onDelete={() => onToggle("")}
          label={translate("quit_all_effects_and_go_back")}
          primaryLabel={translate("quit")}
          secondaryLabel={`${translate("cancel")}`}
          isVisible={modalDelete}
          onCancel={() => setModalDelete(false)}
        />
        <ProgressModal isProcessing={processData.isProcessing} />
      </View>
    </Modal>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const topBarHeight = screenHeight * 0.03;
const bottomBarHeight = 300;
const mainContentHeight = screenHeight - topBarHeight - bottomBarHeight;
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
    // marginVertical: 5,
    marginHorizontal: 16,
    // height: topBarHeight,
  },
  close: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  background: {
    height: mainContentHeight * 0.85,
    width: screenWidth,
    alignSelf: "center",
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
  mainContentContainer: {
    height: mainContentHeight,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  bottomBar: {
    backgroundColor: "#303030",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    height: bottomBarHeight,
  },
  bottomMainContentContainerWithFlex: {
    flex: 1,
  },
  bottomMainContentContainer: {
    alignItems: "center",
  },
  iconss: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  backbutton2: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  backbutton: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  playbutton: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  playvideo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  fontsize: {
    fontSize: 15,
    fontFamily: FONTS.MontserratSemiBold,
    color: "#fff",
  },
  tabContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 16,
  },
  tabLabelStyle: {
    fontFamily: FONTS.MontserratSemiBold,
    color: "#a9a9a9",
    fontWeight: "500",
  },
  activeTabLabelStyle: {
    color: "white",
  },
  activeTabStyle: {
    height: 3,
    width: "50%",
    marginTop: 2,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  removeCrossButton: {
    height: Scale(22),
    width: Scale(22),
    borderRadius: Scale(15),
    backgroundColor: "#F56A4E",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: Scale(0),
  },
});

export interface VideoCoverProps {
  isVisible: boolean;
  videoUri: string;
  onToggle(result: string): void;
  videoId: number;
}

VideoCover.defaultProps = {};

export default VideoCover;
