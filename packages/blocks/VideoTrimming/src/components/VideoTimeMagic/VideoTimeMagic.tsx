import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { background, closeImg, success } from "../../assets";
import React, { PropsWithChildren, ReactElement } from "react";
import Scale from "../../../../../components/src/Scale";
import FONTS from "../../../../../components/src/Fonts/Fonts";
import DeleteModal from "../DeleteModal/DeleteModal";
import { ProgressModal, getDestFilePath } from "../../CommonFile";
import RNFS from "react-native-fs";
//@ts-ignore
import VideoPlayer from "react-native-video-controls";
import { translate } from "../../../../../components/src/i18n/translate";
import {
  FFmpegKit,
  FFmpegKitConfig,
  ReturnCode,
} from "ffmpeg-kit-react-native";
export function VideoTimeMagic(
  props: PropsWithChildren<VideoEffectProps>
): ReactElement {
  const { isVisible, onToggle, videoUrl } = props;

  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  const [processData, setProcessData] = React.useState({
    isPaused: false,
    isProcessing: false,
    proocessUrl: videoUrl,
  });
  let tempFiles: string[] = [];

  const returnTimeMagicCommand = (type: string, toFile: string) => {
    if (type == "Slow Motion") {
      return `-y  -i "${videoUrl}" -filter_complex "[0:v]setpts=2.0*PTS[v];[0:a]atempo=0.5[a]" -map "[v]" -map "[a]" ${toFile}`;
    } else if (type == "Speed Up") {
      return `-y  -i "${videoUrl}" -filter_complex "[0:v]setpts=0.8*PTS[v];[0:a]atempo=1.25[a]" -map "[v]" -map "[a]" ${toFile}`;
    } else if (type == "Reverse") {
      return `-y  -i "${videoUrl}" -vf reverse -af areverse ${toFile}`;
    } else {
      return "";
    }
  };
  const onComplete = async (types: string) => {
    setProcessData({
      isPaused: true,
      isProcessing: true,
      proocessUrl: processData.proocessUrl,
    });
    if (Platform.OS === "android") {
      FFmpegKitConfig.setFontDirectory("/system/fonts");
    } else {
      FFmpegKitConfig.setFontDirectory("/System/Library/Fonts");
    }

    const toFile = getDestFilePath();

    let commandString = returnTimeMagicCommand(types, toFile);

    checkFilesAvailablity(commandString, toFile, types);
  };

  const checkFilesAvailablity = (
    command: string,
    toFile: string,
    types: string
  ) => {
    EncodingVideo(command, toFile, types);
  };

  const EncodingVideo = async (
    command: string,
    toFile: string,
    types: string
  ) => {
    FFmpegKit.executeAsync(command, async (session) => {
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        setProcessData({
          isPaused: false,
          isProcessing: false,
          proocessUrl: toFile,
        });
        tempFiles.push(toFile);
      } else {
        tempFiles.push(toFile);
        const newFile = getDestFilePath();

        let commandString = "";

        if (types == "Slow Motion") {
          commandString = `-y -i "${videoUrl}" -filter_complex "[0:v]setpts=2.0*PTS[v]" -map "[v]" ${newFile}`;
          checkFilesAvailablity(commandString, newFile, "");
        } else if (types == "Speed Up") {
          commandString = `-y -i "${videoUrl}" -filter_complex "[0:v]setpts=0.8*PTS[v]" -map "[v]" ${newFile}`;
          checkFilesAvailablity(commandString, newFile, "");
        } else {
          setProcessData({
            isPaused: false,
            isProcessing: false, proocessUrl: processData.proocessUrl,
          });
        }
      }
    });
  };
  return (
    <Modal animationType={"slide"} visible={isVisible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBarContainer}>
          <TouchableOpacity testID="cancel"

            onPress={() => {
              tempFiles.forEach((file) => {
                if (file.includes("Temp")) {
                  RNFS.unlink(file);
                }
              });
              setDeleteModal(true);
            }}
          >
            <Image source={closeImg} style={styles.closeimg} />
          </TouchableOpacity>
          <TouchableOpacity
            testID="success" onPress={() => {
              tempFiles.forEach((file) => {
                if (file != processData.proocessUrl && file.includes("Temp")) {
                  RNFS.unlink(file);
                }
              });
              onToggle(processData.proocessUrl);
            }}
          >
            <Image source={success} style={styles.closeimg} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContentContainerStyle}>
          <VideoPlayer
            testID="video"
            source={{
              uri:
                "file://" +
                (processData.proocessUrl ?? "")
                  .replace("file://", "")
                  .split("/")
                  .map((p) => encodeURIComponent(p))
                  .join("/"),
            }}
            key={0}
            disableBack={true}
            disableFullscreen={true}
            disableVolume={true}
            repeat={true}
            resizeMode={"contain"}
            style={{
              height: mainContentHeight * 0.89,
              width: "100%",
            }}
            playInBackground={false}
            paused={processData.isPaused}
          />
        </View>
        <View style={styles.bottomBarStyle}>
          <View style={[styles.bottomMainContentContainerStyle]} />

          <View style={styles.functionBarStyle}>
            <View style={styles.tabContainers}>
              <Text style={styles.title}>Tap to use Time Magic</Text>
            </View>
            <ScrollView
              bounces={false}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.contentContainerStyle}
            >
              {[
                {
                  label: "None",
                  value: closeImg,
                },
                { label: "Slow Motion", value: background },
                { label: "Speed Up", value: background },
                { label: "Reverse", value: background },
              ].map((option, optionIndex) => (
                <TouchableOpacity
                  onPress={() => {
                    if (option.label == "None") {
                      setProcessData({
                        isPaused: false,
                        isProcessing: false,
                        proocessUrl: videoUrl,
                      });
                    } else {
                      onComplete(option.label);
                    }
                  }}
                  style={styles.optionContainer}
                  key={optionIndex}
                >
                  <Image source={option.value} style={[styles.optionImage]} />
                  <Text numberOfLines={1} style={styles.optionLabel}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <DeleteModal
          testID="Delete"
          onDelete={() => onToggle("")}
          isVisible={deleteModal}
          onCancel={() => setDeleteModal(false)}
          label={translate("quit_all_effects_and_go_back")}
          primaryLabel={translate("quit")}
          secondaryLabel={`${translate("cancel")}`}
        />
        <ProgressModal isProcessing={processData.isProcessing} />
      </SafeAreaView>
    </Modal>
  );
}

const screenHeight = Dimensions.get("window").height;
const topBarHeight = screenHeight * 0.03;
const bottomBarHeight = screenHeight * 0.35;
const mainContentHeight = screenHeight - topBarHeight - bottomBarHeight;
const bottomFunctionHeight = bottomBarHeight * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
  },
  topBarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 16,
    height: topBarHeight,
  },
  closeimg: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  background1: {
    resizeMode: "contain",
    height: mainContentHeight * 0.85,
    width: mainContentHeight * 0.65,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  videosPLay1: {
    height: Scale(80),
    width: Scale(80),
    resizeMode: "contain",
  },
  mainContentContainerStyle: {
    height: mainContentHeight,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  bottomBarStyle: {
    backgroundColor: "#303030",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    height: bottomBarHeight,
  },
  bottomMainContentContainerWithFlexStyle: {
    flex: 1,
  },
  bottomMainContentContainerStyle: {
    paddingTop: 20,
    alignItems: "center",
  },
  functionBarStyle: {
    height: bottomFunctionHeight,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 24,
  },
  iconView11: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    paddingLeft: 13,
  },
  icons1: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  iconText1: {
    color: "#FFF",
    fontFamily: FONTS.MontserratSemiBold,
  },
  backButtons2: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  backButtons: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  playButtons: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  playVideos: {
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
  tabContainers: {
    flexDirection: "row",
    width: "100%",
    marginLeft: 16,
  },
  tabLabels: {
    fontFamily: FONTS.MontserratSemiBold,
    color: "#a9a9a9",
    fontWeight: "500",
  },
  optionContainer: {
    alignItems: "center",
    marginRight: 16,
  },
  optionImage: {
    height: Scale(60),
    width: Scale(60),
    borderRadius: Scale(60),
    marginBottom: 8,
  },
  optionImageSelected: {
    borderWidth: 4,
    borderColor: "#eecf45",
  },
  contentContainerStyle: {
    width: "100%",
    padding: 16,
    flex: 1,
  },
  optionLabel: {
    fontSize: 12,
    fontFamily: FONTS.MontserratSemiBold,
    color: "#fff",
    fontWeight: "500",
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.MontserratSemiBold,
    color: "#a9a9a9",
    fontWeight: "500",
    marginLeft: 16,
  },
});

export interface VideoEffectProps {
  isVisible: boolean;
  onToggle: Function;
  videoUrl: string;
  isProcessing: boolean;
  videoId: number;
}

VideoTimeMagic.defaultProps = {};

export default VideoTimeMagic;
