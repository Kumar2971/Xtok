import {
  Dimensions,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextInput,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { closeImg, success } from "../../assets";
import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import Scale from "../../../../../components/src/Scale";
import FONTS from "../../../../../components/src/Fonts/Fonts";
import DeleteModal from "../DeleteModal/DeleteModal";
import { VideoSubtitleTab, videoSubtitleTabs } from "./constant";
import VideoSubtitleFonts from "./components/VideoSubtitleFonts";
import VideoSubtitleTextSize from "./components/VideoSubtitleTextSize";
import VideoSubtitleColor from "./components/VideoSubtitleColor";
import RNFS from "react-native-fs";
import Strings from "../../../../../components/src/Strings";
import VideoFonts from "../../../../../components/src/VideoFonts";
import Entypo from "react-native-vector-icons/Entypo";
//@ts-ignore
import { DragResizeBlock } from "react-native-drag-resize";
import { ProgressModal, getDestFilePath } from "../../CommonFile";
//@ts-ignore
import VideoPlayer from "react-native-video-controls";
import { translate } from "../../../../../components/src/i18n/translate";
import {
  FFmpegKit,
  ReturnCode,
  FFmpegKitConfig,
} from "ffmpeg-kit-react-native";

export interface TextPosition {
  defTextID: number;
  defTextValue: string;
  defFontFamily: string;
  defColor: string;
  defFontSize: number;
  defCaps: string;
  defXaxis: number;
  defYaxis: number;
  defWidth: number;
  defHeight: number;
}

export function VideoSubtitle(
  props: PropsWithChildren<VideoSubtitleProps>
): ReactElement {
  const { isVisible, onToggle, videoUri } = props;
  const [activeTab, setActiveTab] = useState<number>(VideoSubtitleTab.font);
  const dragRef = useRef<any>();
  const [processData, setProcessData] = useState<{
    isPaused: boolean;
    isProcessing: boolean;
    selectedTextId: number;
    finishedUrl: string;
    arrayTextData: TextPosition[];
  }>({
    isPaused: false,
    isProcessing: false,
    selectedTextId: 0,
    finishedUrl: "",
    arrayTextData: [],
  });
  const [videoLayout, setVideoLayout] = useState({
    videoLayoutHeight: 0,
    videoLayoutWidth: 0,
  });
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (processData.finishedUrl) {
      onToggle(processData.finishedUrl);
    }
  }, [processData]);

  const removeText = (arrayText: number) => {
    let newArray = JSON.parse(JSON.stringify(processData.arrayTextData));
    let index = newArray.findIndex(
      (newObj: TextPosition) => newObj.defTextID === arrayText
    );
    newArray.splice(index, 1);
    setProcessData({
      isPaused: processData.isPaused,
      isProcessing: processData.isProcessing,
      selectedTextId: processData.selectedTextId,
      finishedUrl: processData.finishedUrl,
      arrayTextData: newArray,
    });
  };

  const onChangeText = (textId: number, text: string) => {
    let newArrayText = JSON.parse(JSON.stringify(processData.arrayTextData));
    let objIndex = newArrayText.findIndex(
      (arrayObj: TextPosition) => arrayObj.defTextID == textId
    );
    newArrayText[objIndex].defTextValue = text;
    setProcessData({
      isPaused: false,
      isProcessing: false,
      selectedTextId: textId,
      finishedUrl: "",
      arrayTextData: newArrayText,
    });
  };

  const getFontsFamily = (fontName: string) => {
    switch (fontName) {
      case Strings.poppinsRegular:
        return `${RNFS.DocumentDirectoryPath}/fonts/Poppins-Regular.ttf`;
      case Strings.poppinsSemiBold:
        return `${RNFS.DocumentDirectoryPath}/fonts/Poppins-SemiBold.ttf`;
      case Strings.poppinsBold:
        return `${RNFS.DocumentDirectoryPath}/fonts/Poppins-Bold.ttf`;
      case Strings.HelveticaRegular:
        return `${RNFS.DocumentDirectoryPath}/fonts/Helvetica-Regular.ttf`;
      case Strings.HelveticaBold:
        return `${RNFS.DocumentDirectoryPath}/fonts/Helvetica-Bold.ttf`;
      case Strings.LatoReglar:
        return `${RNFS.DocumentDirectoryPath}/fonts/Lato-Regular.ttf`;
      case Strings.LatoBlack:
        return `${RNFS.DocumentDirectoryPath}/fonts/Lato-Black.ttf`;
      case Strings.poppinsLight:
        return `${RNFS.DocumentDirectoryPath}/fonts/Poppins-Light.ttf`;
      case Strings.poppinsBoldItalic:
        return `${RNFS.DocumentDirectoryPath}/fonts/Poppins-BoldItalic.ttf`;
      case Strings.poppinsExtraLight:
        return `${RNFS.DocumentDirectoryPath}/fonts/Poppins-ExraLight.ttf`;
      case Strings.poppinsExtraBold:
        return `${RNFS.DocumentDirectoryPath}/fonts/Poppins-ExtraBold.ttf`;
      case Strings.poppinsExtraBoldItalic:
        return `${RNFS.DocumentDirectoryPath}/fonts/Poppins-ExtraBoldItalic.ttf`;
      case Strings.Brusher:
        return `${RNFS.DocumentDirectoryPath}/fonts/Brusher.ttf`;
      case Strings.knewave:
        return `${RNFS.DocumentDirectoryPath}/fonts/knewave.ttf`;
      case Strings.BebasNeueRegular:
        return `${RNFS.DocumentDirectoryPath}/fonts/BebasNeue-Regular.ttf`;
      case Strings.poppinsItalic:
        return `${RNFS.DocumentDirectoryPath}/fonts/Poppins-Italic.ttf`;
      case Strings.RobotoBlackItalic:
        return `${RNFS.DocumentDirectoryPath}/fonts/Roboto-BlackItalic.ttf`;
      case Strings.RobotoLightItalic:
        return `${RNFS.DocumentDirectoryPath}/fonts/Roboto-LightItalic.ttf`;
      case Strings.RobotoBoldItalic:
        return `${RNFS.DocumentDirectoryPath}/fonts/Roboto-BoldItalic.ttf`;
      case Strings.poppinsMedium:
        return `${RNFS.DocumentDirectoryPath}/fonts/Poppins-Medium.ttf`;
      default:
        return `${RNFS.DocumentDirectoryPath}/fonts/Poppins-Medium.ttf`;
    }
  };
  const converterH = (height: number) => {
    const screenHeight = Platform.OS === "ios" ? 720 : 1080;
    const layoutHeight = videoLayout.videoLayoutHeight;
    if (!layoutHeight || layoutHeight <= 0) return 0;
    return Math.round((height * screenHeight) / layoutHeight);
  };

  const converterW = (width: number) => {
    const screenWidth = Platform.OS === "ios" ? 720 : 1080;
    const layoutWidth = videoLayout.videoLayoutWidth;
    if (!layoutWidth || layoutWidth <= 0) return 0;
    return Math.round((width * screenWidth) / layoutWidth);
  };


  const getPosition = (posData: number, position: string) => {
    switch (position) {
      case "center":
        return posData * 9;
      case "right":
        return posData * 18;
      case "left":
        return posData * 1;
    }
  };

  const onPressDownload = async () => {
    setProcessData({
      isPaused: true,
      isProcessing: true,
      selectedTextId: processData.selectedTextId,
      finishedUrl: "",
      arrayTextData: processData.arrayTextData,
    });

    checkPlatform()

    const toFile = getDestFilePath();

    const videoInput = `-y -i "${videoUri}"`;

    let textInput: string = ``;
    let textMulti: string = ``;

    if (processData.arrayTextData.length == 0) {
      onToggle("");
      return;
    }

    processData.arrayTextData.forEach((item: TextPosition, index: number) => {
      if (index != 0) {
        textInput += ", ";
      }
      let multiLineText = item.defTextValue.split("\n");
      if (multiLineText.length < 2) {
        textMulti = textMulti.concat(
          `drawtext=fontfile=${getFontsFamily(item.defFontFamily)}:text=${item.defTextValue
          }:x=${converterW(item.defXaxis)}:y=${converterH(
            item.defYaxis
          )}:fontsize=${item.defFontSize}:fontcolor=${item.defColor} `
        );
      } else {
        let maxLength = 0;
        let yAxis = 0;
        let xAxis;
        multiLineText.forEach((newItem: string) => {
          if (newItem.length > maxLength) {
            maxLength = newItem.length;
          }
        });
        multiLineText.forEach((txt: string, multiIndex: number) => {
          if (multiIndex != 0) {
            textMulti += ", ";
          }
          yAxis = yAxis + 45;
          xAxis = getPosition(maxLength - txt.length, "left") ?? 0;
          textMulti = textMulti.concat(
            `drawtext=fontfile=${getFontsFamily(
              item.defFontFamily
            )}:text=${txt}:x=${converterW(item.defXaxis) + xAxis}:y=${converterH(item.defYaxis) + yAxis
            }:fontsize=${item.defFontSize}:fontcolor=${item.defColor} `
          );
        });
      }

      textInput = textInput.concat(textMulti);
    });
    const command = `${videoInput} -b:v 1M -filter_complex " ${textInput} " ${toFile}`;

    checkFilesExistOrNot(command, toFile);
  };

  const checkPlatform = () => {
    if (Platform.OS === "android") {
      FFmpegKitConfig.setFontDirectory("/system/fonts");
    } else {
      FFmpegKitConfig.setFontDirectory("/System/Library/Fonts");
    }
  };


  const getSelectedFont = (type: VideoSubtitleTab, selectedId: number) => {
    let index = processData.arrayTextData.findIndex(
      (arraySub: TextPosition) => selectedId === arraySub.defTextID
    );

    if (index === -1 || index === null || index === undefined) {
      return getDefaultValues(type);
    }
    switch (type) {
      case VideoSubtitleTab.font:
        return (
          processData.arrayTextData[index]?.defFontFamily ??
          Strings.poppinsMedium
        );
      case VideoSubtitleTab.colors:
        return processData.arrayTextData[index]?.defColor ?? "#ffffff";
      case VideoSubtitleTab.textSize:
        return processData.arrayTextData[index]?.defFontSize ?? 15;
    }
  };

  const getDefaultValues = (type: VideoSubtitleTab) => {
    switch (type) {
      case VideoSubtitleTab.font:
        return Strings.poppinsMedium;
      case VideoSubtitleTab.colors:
        return "#ffffff";
      case VideoSubtitleTab.textSize:
        return 15;
    }
  };

  const checkFilesExistOrNot = (command: string, toFile: string) => {
    onEncodingVideo(command, toFile);
  };

  const onEncodingVideo = async (command: string, toFile: string) => {
    console.log("/f/ffff", command)

    FFmpegKit.executeAsync(command, async (session) => {
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        if (videoUri.includes("Temp")) {
          RNFS.unlink(videoUri);
        }
        setProcessData({
          isPaused: false,
          isProcessing: false,
          selectedTextId: processData.selectedTextId,
          finishedUrl: toFile,
          arrayTextData: processData.arrayTextData,
        });
      } else {
        setProcessData({
          isPaused: false,
          isProcessing: false,
          selectedTextId: processData.selectedTextId,
          finishedUrl: "",
          arrayTextData: processData.arrayTextData,
        });
      }
    })
  };
  return (
    <Modal animationType={"slide"} visible={isVisible}>
      <View style={styles.maincontainer}>
        <SafeAreaView style={styles.topContainer}>
          <TouchableOpacity onPress={() => setDeleteModal(true)}>
            <Image source={closeImg} style={styles.close} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressDownload}>
            <Image source={success} style={styles.close} />
          </TouchableOpacity>
        </SafeAreaView>
        <View
          onLayout={(event) => {
            let { width, height } = event.nativeEvent.layout;
            setVideoLayout({
              videoLayoutHeight: height,
              videoLayoutWidth: width,
            });
          }}
          style={[styles.mainContentContainerData]}
        >
          {processData.arrayTextData.map((ID: TextPosition) => {
            console.log(">>>>>>>>>>>>", ID.defWidth)

            return (
              <DragResizeBlock
                ref={dragRef}
                limitation={{
                  x: 0,
                  y: 0,
                  w: videoLayout.videoLayoutWidth,
                  h: videoLayout.videoLayoutHeight - 60,
                }}
                x={0}
                y={0}
                minX={0}
                minY={0}
                maxX={screenWidth - 20}
                maxY={mainContentHeight * 0.85}
                onResizeStart={() =>
                  setProcessData({
                    isPaused: false,
                    isProcessing: false,
                    selectedTextId: ID.defTextID,
                    finishedUrl: "",
                    arrayTextData: processData.arrayTextData,
                  })
                }
                onResizeEnd={(coord: number[]) => {
                  let dataArray = JSON.parse(
                    JSON.stringify(processData.arrayTextData)
                  );
                  let newIndex = dataArray.findIndex(
                    (arraySub: TextPosition) =>
                      arraySub.defTextID === processData.selectedTextId
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
                    );
                  dataArray[newIndex].defHeight =
                    Math.round(
                      dragRef?.current?._reactInternalFiber?.memoizedState?.h ??
                      20
                    );
                  dataArray[newIndex].defXaxis = coord[0];
                  dataArray[newIndex].defYaxis = coord[1];
                  setProcessData({
                    isPaused: processData.isPaused,
                    isProcessing: processData.isProcessing,
                    selectedTextId: processData.selectedTextId,
                    finishedUrl: processData.finishedUrl,
                    arrayTextData: dataArray,
                  });
                }}
                onPressIn={() => {
                  setProcessData({
                    isPaused: false,
                    isProcessing: false,
                    selectedTextId: ID.defTextID,
                    finishedUrl: "",
                    arrayTextData: processData.arrayTextData,
                  });
                }}
                onPressOut={() => { }}
                onDragStart={() => {
                  setProcessData({
                    isPaused: true,
                    isProcessing: false,
                    selectedTextId: ID.defTextID,
                    finishedUrl: "",
                    arrayTextData: processData.arrayTextData,
                  });
                }}
                onDragEnd={(event: number[]) => {
                  let dataArray = JSON.parse(
                    JSON.stringify(processData.arrayTextData)
                  );
                  let newIndex = dataArray.findIndex(
                    (arraySub: TextPosition) =>
                      arraySub.defTextID === processData.selectedTextId
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
                  setProcessData({
                    isPaused: processData.isPaused,
                    isProcessing: processData.isProcessing,
                    selectedTextId: processData.selectedTextId,
                    finishedUrl: processData.finishedUrl,
                    arrayTextData: dataArray,
                  });
                }}
              >

                <View style={{ padding: Scale(10), height: "100%", width: "100%" }}>
                  <View style={styles.textView}>
                    <TextInput
                      onFocus={() => {
                        setProcessData({
                          isPaused: false,
                          isProcessing: false,
                          selectedTextId: ID.defTextID,
                          finishedUrl: "",
                          arrayTextData: processData.arrayTextData,
                        });
                      }}
                      autoFocus
                      multiline={true}
                      value={ID.defTextValue}
                      onChangeText={(text) => {
                        onChangeText(ID.defTextID, text);
                        ID.defTextValue = text;
                      }}
                      style={{
                        fontFamily: VideoFonts.getFontByOS(ID.defFontFamily),
                        color: ID.defColor,
                        fontSize: ID.defFontSize,
                        display: "flex",
                        padding: 5,
                        textTransform: "capitalize",
                        textAlign: "center",
                        height: "100%",
                        width: "100%"
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.removeCrossButton]}
                    onPress={() => removeText(ID.defTextID)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Entypo name="cross" size={17} color={"#ffffff"} />
                  </TouchableOpacity>
                </View>
              </DragResizeBlock>
            )
          })}
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
            onPress={() => {
              let isEmpty = false;
              processData.arrayTextData.forEach((item: TextPosition) => {
                if (item.defTextValue === "") {
                  isEmpty = true;
                }
              });

              if (isEmpty || isKeyboardVisible) {
                Keyboard.dismiss();
                return;
              }

              let textId = processData.arrayTextData.length + 1;
              setProcessData({
                isPaused: false,
                isProcessing: false,
                selectedTextId: textId,
                finishedUrl: "",
                arrayTextData: [
                  ...processData.arrayTextData,
                  {
                    defTextID: textId,
                    defTextValue: "",
                    defFontFamily: Strings.poppinsMedium,
                    defColor: "#ffffff",
                    defFontSize: 15,
                    defCaps: "capitalize",
                    defXaxis: 0,
                    defYaxis: 0,
                    defWidth: 50,
                    defHeight: 50,
                  },
                ],
              });
            }}
          >
            <View pointerEvents="none" style={{ flex: 1 }}>
              <VideoPlayer
                source={{
                  uri:
                    "file://" +
                    (videoUri ?? "")
                      .replace("file://", "")
                      .split("/")
                      .map((p) => encodeURIComponent(p))
                      .join("/"),
                }}
                disableBack={true}
                disableFullscreen={true}
                disableVolume={true}
                repeat={true}
                resizeMode={"contain"}
                style={[styles.background]}
                disablePlayPause
                disableSeekbar
                playInBackground={false}
                paused={processData.isPaused}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomBarView}>
          <View style={[styles.bottomMainContentContainerData]}>
            <View style={styles.tabContainerData}>
              {videoSubtitleTabs.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setActiveTab(item.value);
                  }}
                >
                  <Text
                    style={[
                      styles.tabLabels,
                      activeTab === item.value && styles.activeTabLabels,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {activeTab === item.value && (
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View style={styles.activeTabs} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {activeTab === VideoSubtitleTab.font && (
              <VideoSubtitleFonts
                selectedItem={`${getSelectedFont(
                  VideoSubtitleTab.font,
                  processData.selectedTextId
                )}`}
                onPress={(font: string) => {
                  let dataArray = JSON.parse(
                    JSON.stringify(processData.arrayTextData)
                  );
                  let newIndex = dataArray.findIndex(
                    (arraySub: TextPosition) =>
                      arraySub.defTextID === processData.selectedTextId
                  );
                  if (
                    newIndex == null ||
                    newIndex == undefined ||
                    newIndex == -1
                  ) {
                    return;
                  }
                  dataArray[newIndex].defFontFamily = font;
                  setProcessData({
                    isPaused: processData.isPaused,
                    isProcessing: processData.isProcessing,
                    selectedTextId: processData.selectedTextId,
                    finishedUrl: processData.finishedUrl,
                    arrayTextData: dataArray,
                  });
                }}
              />
            )}

            {activeTab === VideoSubtitleTab.textSize && (
              <VideoSubtitleTextSize
                selectedItem={parseInt(
                  `${getSelectedFont(
                    VideoSubtitleTab.textSize,
                    processData.selectedTextId
                  )}`
                )}
                onChange={(textSize: number) => {
                  let dataArray = JSON.parse(
                    JSON.stringify(processData.arrayTextData)
                  );
                  let newIndex = dataArray.findIndex(
                    (arraySub: TextPosition) =>
                      arraySub.defTextID === processData.selectedTextId
                  );
                  if (
                    newIndex == null ||
                    newIndex == undefined ||
                    newIndex == -1
                  ) {
                    return;
                  }
                  dataArray[newIndex].defFontSize = textSize;
                  setProcessData({
                    isPaused: processData.isPaused,
                    isProcessing: processData.isProcessing,
                    selectedTextId: processData.selectedTextId,
                    finishedUrl: processData.finishedUrl,
                    arrayTextData: dataArray,
                  });
                }}
              />
            )}

            {activeTab === VideoSubtitleTab.colors && (
              <VideoSubtitleColor
                selectedItem={`${getSelectedFont(
                  VideoSubtitleTab.colors,
                  processData.selectedTextId
                )}`}
                onPress={(color: string) => {
                  let dataArray = JSON.parse(
                    JSON.stringify(processData.arrayTextData)
                  );
                  let newIndex = dataArray.findIndex(
                    (arraySub: TextPosition) =>
                      arraySub.defTextID === processData.selectedTextId
                  );
                  if (
                    newIndex == null ||
                    newIndex == undefined ||
                    newIndex == -1
                  ) {
                    return;
                  }
                  dataArray[newIndex].defColor = color;
                  setProcessData({
                    isPaused: processData.isPaused,
                    isProcessing: processData.isProcessing,
                    selectedTextId: processData.selectedTextId,
                    finishedUrl: processData.finishedUrl,
                    arrayTextData: dataArray,
                  });
                }}
              />
            )}
          </View>
        </View>
        <DeleteModal
          testID="Delete"
          onDelete={() => onToggle("")}
          isVisible={deleteModal}
          onCancel={() => setDeleteModal(false)}
          label={`${translate("quit_text_editing")}`}
          primaryLabel={`${translate("quit")}`}
          secondaryLabel={`${translate("cancel")}`}
        />
        <ProgressModal isProcessing={processData.isProcessing} />
      </View>
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
  maincontainer: {
    flex: 1,
    backgroundColor: "#212121",
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
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
  videossPLay: {
    height: Scale(80),
    width: Scale(80),
    resizeMode: "contain",
  },
  mainContentContainerData: {
    height: mainContentHeight,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  bottomBarView: {
    backgroundColor: "#303030",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    height: bottomBarHeight,
  },
  bottomMainContentContainerWithFlexstyle: {
    flex: 1,
  },
  bottomMainContentContainerData: {
    height: bottomMainContentHeight,
    alignItems: "center",
  },
  functionBarData: {
    height: bottomFunctionHeight,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 24,
  },
  iconViews: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    paddingLeft: 13,
  },
  iconsStyle: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  iconsText: {
    color: "#FFF",
    fontFamily: FONTS.MontserratSemiBold,
  },
  backButtonns2: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  backButtonns: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  playButtonns: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  playVideoos: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  fontSizes: {
    fontSize: 15,
    fontFamily: FONTS.MontserratSemiBold,
    color: "#fff",
  },
  tabContainerData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 16,
  },
  tabLabels: {
    fontFamily: FONTS.MontserratSemiBold,
    color: "#a9a9a9",
    fontWeight: "500",
  },
  activeTabLabels: {
    color: "white",
  },
  activeTabs: {
    height: 3,
    width: "50%",
    marginTop: 2,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  addButton: {
    backgroundColor: "#414141",
    height: Scale(40),
    width: Scale(60),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  textView: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  } as ViewStyle,
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
  editTextButton: {
    height: Scale(22),
    width: Scale(22),
    borderRadius: Scale(15),
    backgroundColor: "#34C0D6",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: Scale(0),
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
});

export interface VideoSubtitleProps {
  isVisible: boolean;
  videoUri: string;
  onToggle(result: string): void;
  videoId: number;
}

VideoSubtitle.defaultProps = {};

export default VideoSubtitle;
