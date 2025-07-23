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
} from "react-native";
import { closeImg, success } from "../../assets";
import React, { PropsWithChildren, ReactElement, useState } from "react";
import Scale from "../../../../../components/src/Scale";
import FONTS from "../../../../../components/src/Fonts/Fonts";
import DeleteModal from "../DeleteModal/DeleteModal";
import { VideoEffectTab, videoEffectTabs } from "./constant";
import { ProgressModal, getDestFilePath } from "../../CommonFile";
import { FFmpegKit, ReturnCode } from "ffmpeg-kit-react-native"

import RNFS from "react-native-fs";
//@ts-ignore
import VideoPlayer from "react-native-video-controls";
import { translate } from "../../../../../components/src/i18n/translate";
export function VideoEffect(
  props: PropsWithChildren<VideoEffectProps>
): ReactElement {
  const { isVisible, onToggle, videoUrl } = props;

  const [activeTab, setActiveTab] = React.useState<number>(
    VideoEffectTab.split
  );

  const [effect, setEffect] = React.useState({
    [VideoEffectTab.dynamic]: 0,
    [VideoEffectTab.beautiful]: 0,
    [VideoEffectTab.split]: 0,
  });

  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  const [processData, setProcessData] = useState({ isPaused: false, isProcessing: false, proocessUrl: videoUrl, });
  let tempFiles: string[] = [];

  const onComplete = async (command: string) => {
    setProcessData({ isPaused: true, isProcessing: true, proocessUrl: processData.proocessUrl, });

    const toFile = getDestFilePath();
    const commands = `${command} ${toFile}`;
    checkFilesAvailablityOncomplete(commands, toFile);
  };

  const checkFilesAvailablityOncomplete = (command: string, toFile: string) => {
    EncodingVideoOnComplete(command, toFile);
  };

  const EncodingVideoOnComplete = async (command: string, toFile: string) => {
    FFmpegKit.executeAsync(command, async (session) => {
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        setProcessData({ isPaused: false, isProcessing: false, proocessUrl: toFile, });
        tempFiles.push(toFile);
      } else {
        setProcessData({
          isPaused: false, isProcessing: false, proocessUrl: processData.proocessUrl,
        });
      }
    });
  };

  const onSelectEffect = (type: string, command: string) => {
    if (command == "") {
      setProcessData({
        isPaused: false,
        isProcessing: false,
        proocessUrl: videoUrl,
      });
    } else if (type == "Dual") {
      let cmd = `-y  -i "${videoUrl}" -i "${videoUrl}" ${command}`;
      onComplete(cmd);
    } else if (type == "Three-split") {
      let cmd = `-y  -i "${videoUrl}" -i "${videoUrl}" -i "${videoUrl}" ${command}`;
      onComplete(cmd);
    } else {
      let cmd = `-y  -i "${videoUrl}" ${command}`;
      onComplete(cmd);
    }
  };
  return (
    <Modal animationType={"slide"} visible={isVisible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity testID="close" onPress={() => {
            tempFiles.forEach((file) => {
              if (file.includes("Temp")) {
                RNFS.unlink(file);
              }
            });
            setDeleteModal(true);
          }}
          >
            <Image source={closeImg} style={styles.close} />
          </TouchableOpacity>
          <TouchableOpacity testID="success" onPress={() => {
            tempFiles.forEach((file) => {
              if (file != processData.proocessUrl && file.includes("Temp")) {
                RNFS.unlink(file);
              }
            });
            onToggle(processData.proocessUrl);
          }}
          >
            <Image source={success} style={styles.close} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContentContainerS}>
          <VideoPlayer
            testID="video"
            source={{
              uri: "file://" + (processData.proocessUrl ?? "").replace("file://", "").split("/").map((p) => encodeURIComponent(p)).join("/"),
            }}
            style={{
              height: mainContentHeight * 0.8,
              width: "100%",
            }}
            disableBack={true}
            disableFullscreen={true}
            disableVolume={true}
            repeat={true}
            resizeMode={"contain"}
            playInBackground={false}
            paused={processData.isPaused}
          />
        </View>
        <View style={styles.bottomBarS}>
          <View style={styles.functionBarS}>
            <View style={styles.tabContainerS}>
              {videoEffectTabs.map((item, index) => (
                <TouchableOpacity
                  onPress={() => setActiveTab(item.value)}
                  style={{ marginRight: 16 }}
                >
                  <Text
                    style={[
                      styles.tabLabelS,
                      activeTab === item.value && styles.activeTabLabelS,
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
                      <View style={styles.activeTabS} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.contentContainerStyleS}
            >
              {[
                {
                  label: "Erase",
                  image: closeImg,
                  commandString: "",
                },
                ...videoEffectTabs.find((item) => item.value === activeTab)!
                  .options,
              ].map((option, optionIndex) => (
                <TouchableOpacity
                  onPress={() => {
                    setEffect({
                      ...effect,
                      [activeTab]: optionIndex,
                    });
                    onSelectEffect(option?.label, option.commandString);
                  }}
                  style={styles.optionContainerS}
                  key={optionIndex}
                >
                  <Image
                    source={option.image}
                    style={[
                      styles.optionImageS,
                      effect[activeTab as VideoEffectTab] !== 0 &&
                      effect[activeTab as VideoEffectTab] === optionIndex &&
                      styles.optionImageSelectedS,
                    ]}
                  />
                  <Text numberOfLines={1} style={styles.optionLabelS}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <DeleteModal
          testID="deleteModal"
          onDelete={() => onToggle("")}
          isVisible={deleteModal}
          onCancel={() => setDeleteModal(false)}
          label={translate("quit_all_effects_and_go_back")}
          secondaryLabel={`${translate("cancel")}`}
          primaryLabel={translate("quit")}
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
  backgroundss: {
    resizeMode: "contain",
    height: mainContentHeight * 0.85,
    width: mainContentHeight * 0.65,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  videosPLayS: {
    height: Scale(80),
    width: Scale(80),
    resizeMode: "contain",
  },
  mainContentContainerS: {
    height: mainContentHeight,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  bottomBarS: {
    backgroundColor: "#303030",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    height: bottomBarHeight,
  },
  bottomMainContentContainerWithFlexS: {
    flex: 1,
  },
  bottomMainContentContainerS: {
    height: bottomMainContentHeight,
    alignItems: "center",
  },
  functionBarS: {
    height: bottomFunctionHeight,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 24,
    marginTop: 20,
  },
  iconViewS: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    paddingLeft: 13,
  },
  iconsS: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  iconTextS: {
    color: "#FFF",
    fontFamily: FONTS.MontserratSemiBold,
  },
  backButton2S: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  backButtonS: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  playButtonS: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  playVideoS: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  fontSizeS: {
    fontSize: 15,
    fontFamily: FONTS.MontserratSemiBold,
    color: "#fff",
  },
  tabContainerS: {
    flexDirection: "row",
    width: "100%",
    marginLeft: 16,
  },
  tabLabelS: {
    fontFamily: FONTS.MontserratSemiBold,
    color: "#a9a9a9",
    fontWeight: "500",
  },
  activeTabLabelS: {
    color: "white",
  },
  activeTabS: {
    height: 3,
    width: "50%",
    marginTop: 2,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  optionContainerS: {
    alignItems: "center",
    marginRight: 16,
  },
  optionImageS: {
    height: Scale(60),
    width: Scale(60),
    borderRadius: Scale(60),
    marginBottom: 8,
  },
  optionImageSelectedS: {
    borderWidth: 4,
    borderColor: "#eecf45",
  },
  contentContainerStyleS: {
    width: "100%",
    padding: 16,
    flex: 1,
  },
  optionLabelS: {
    fontSize: 12,
    fontFamily: FONTS.MontserratSemiBold,
    color: "#fff",
    fontWeight: "500",
  },
});

export interface VideoEffectProps {
  isVisible: boolean;
  onToggle: Function;
  videoUrl: string;
  isProcessing: boolean;
  videoId: number;
}

VideoEffect.defaultProps = {};

export default VideoEffect;
