import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { closeImg, success } from "../../assets";
import React, { PropsWithChildren, ReactElement, useState } from "react";
import { translate } from "../../../../../components/src/i18n/translate";
import Scale from "../../../../../components/src/Scale";
import FONTS from "../../../../../components/src/Fonts/Fonts";
import { VideoTab } from "./constant";
import TransitionOption from "./components/TransitionOption";
import DeleteModal from "../DeleteModal/DeleteModal";
import RNFS from "react-native-fs";
import { ProgressModal, getDestFilePath } from "../../CommonFile";
//@ts-ignore
import VideoPlayer from "react-native-video-controls";
import { FFmpegKit, ReturnCode } from "ffmpeg-kit-react-native";
export function VideoFilterModal(
  props: PropsWithChildren<VideoEditingProps>
): ReactElement {
  const { isVisible, onToggle, videoUrl } = props;

  const [activeTab, setActiveTab] = React.useState<number>(
    VideoTab.transitions
  );
  const [processData, setProcessData] = useState({
    isPaused: false,
    isProcessing: false,
    proocessUrl: videoUrl,
  });
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  let tempFiles: string[] = [];

  const returnFilterCommand = (type: string, command: string) => {
    if (type == "Erase") {
      setProcessData({
        isPaused: false,
        isProcessing: false,
        proocessUrl: videoUrl,
      });
      return;
    }
    if (command != "") {
      return `-y  -i "${videoUrl}" ${command} `;
    } else if (type == "Moon") {
      return `-y  -i "${videoUrl}" -vf "colorchannelmixer=rr=0.8:rg=0.8:rb=0.8:gr=0.8:gg=0.8:gb=0.8:br=0.9:bg=0.9:bb=1.2" -pix_fmt yuv420p -y`;
    } else if (type == "Gingham") {
      return `-y  -i "${videoUrl}" -vf "colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131" -pix_fmt yuv420p -y`;
    } else if (type == "Clarendon") {
      return `-y  -i  "${videoUrl}" -vf "colorchannelmixer=rr=1.2:rg=0.05:rb=0.05:gr=0.1:gg=1.2:gb=0.1:br=0.15:bg=0.15:bb=1.5" -pix_fmt yuv420p -y`;
    } else if (type == "Juno") {
      return `-y  -i "${videoUrl}" -vf "colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131" -pix_fmt yuv420p -y`;
    } else if (type == "Slumber") {
      return `-y  -i "${videoUrl}" -vf "colorchannelmixer=.894:.482:-.051:0:.107:.983:-.090:0:.076:.407:.517" -pix_fmt yuv420p -y`;
    } else if (type == "Ludwig") {
      return `-y  -i "${videoUrl}" -vf "colorchannelmixer=.6:.6:.6:0:.4:.4:.4:0:.6:.6:.6" -pix_fmt yuv420p -y`;
    } else if (type == "Crema") {
      return `-y  -i "${videoUrl}" -vf "colorchannelmixer=.95:.05:0:0:.15:.85:0:0:.25:.75:0:0" -pix_fmt yuv420p -y`;
    } else if (type == "Aden") {
      return `-y  -i "${videoUrl}" -vf "colorchannelmixer=.75:.25:0:0:.25:.75:0:0:.25:.75:0:0" -pix_fmt yuv420p -y`;
    } else if (type == "Lark") {
      return `-y  -i "${videoUrl}" -vf "colorchannelmixer=.3:.3:.3:0:.7:.7:.7:0:.1:.1:.1" -pix_fmt yuv420p -y`;
    } else if (type == "Lo-fi") {
      return `-y  -i "${videoUrl}" -vf "colorchannelmixer=.6:.6:.6:0:.4:.4:.4:0:.3:.3:.3" -pix_fmt yuv420p -y`;
    } else {
      return "";
    }
  };
  const onComplete = async (commandString: string) => {
    setProcessData({
      isPaused: true,
      isProcessing: true,
      proocessUrl: processData.proocessUrl,
    });
    const toFile = getDestFilePath();
    const commands = `${commandString} ${toFile}`;
    checkFileAvailablity(commands, toFile);
  };

  const checkFileAvailablity = (command: string, toFile: string) => {
    EncodingVideos(command, toFile);
  };

  const EncodingVideos = async (command: string, toFile: string) => {
    FFmpegKit.executeAsync(command, async (session) => {
      const returnCode = await session.getReturnCode();
      if (ReturnCode.isSuccess(returnCode)) {
        setProcessData({
          isPaused: false, isProcessing: false,
          proocessUrl: toFile,
        });
        tempFiles.push(toFile);
      } else {
        setProcessData({
          isPaused: false,
          isProcessing: false,
          proocessUrl: processData.proocessUrl
        });
      }
    });
  };
  return (
    <Modal animationType={"slide"} visible={isVisible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBardata}>
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
            <Image source={closeImg} style={styles.closeImg} />
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
            <Image source={success} style={styles.closeImg} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContentContainers}>
          <VideoPlayer
            source={{
              uri:
                "file://" +
                (processData.proocessUrl ?? "")
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
            playInBackground={false}
            paused={processData.isPaused}
          />
        </View>

        <View style={styles.bottomBarContainer}>
          <View
            style={[
              activeTab === VideoTab.transitions &&
              styles.bottomMainContentContainerWithFlexData,
              styles.bottomMainContentContainer,
            ]}
          >
            {activeTab === VideoTab.transitions && (
              <TransitionOption
                testID="transition"
                onConfirm={() => setActiveTab(VideoTab.add)}
                onFilter={async (tab: any, type: string, cmd: string) => {
                  let commandString = returnFilterCommand(type, cmd);
                  if (commandString) {
                    onComplete(commandString);
                  }
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
          label={translate("quit_all_effects_and_go_back")}
          primaryLabel={translate("quit")}
          secondaryLabel={`${translate("cancel")}`}
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
const mainContentHeight = screenHeight - topBarHeight - bottomBarHeight;
const bottomFunctionHeight = bottomBarHeight * 0.3;
const bottomMainContentHeight = bottomBarHeight - bottomFunctionHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
  },
  topBardata: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 16,
    height: topBarHeight,
  },
  closeImg: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  backgrounddata: {
    resizeMode: "contain",
    height: mainContentHeight * 0.85,
    width: mainContentHeight * 0.65,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  videosPLaydata: {
    height: Scale(80),
    width: Scale(80),
    resizeMode: "contain",
  },
  mainContentContainers: {
    height: mainContentHeight,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  bottomBarContainer: {
    backgroundColor: "#252525",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    height: bottomBarHeight,
  },
  bottomMainContentContainerWithFlexData: {
    flex: 1,
  },
  bottomMainContentContainer: {
    height: bottomMainContentHeight,
  },
  functionBar: {
    height: bottomFunctionHeight,
  },
  iconView1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    paddingLeft: 13,
  },
  icon: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  iconText: {
    color: "#FFF",
    fontFamily: FONTS.MontserratSemiBold,
  },
  backButton12: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  backButton1: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  playButton1: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  playVideo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  fontSize1: {
    fontSize: 15,
    fontFamily: FONTS.MontserratSemiBold,
    color: "#fff",
  },
  bottomModal1: {
    position: "relative",
    bottom: 0,
    width: screenWidth,
    borderTopRightRadius: Scale(20),
    borderTopLeftRadius: Scale(20),
    backgroundColor: "#2a2929b3",
    minHeight: Scale(180),
  },
  transition: {
    backgroundColor: "yellow",
    width: Scale(200),
    height: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#fff",
  },
});

export interface VideoEditingProps {
  isVisible: boolean;
  onToggle: Function;
  videoUrl: string;
  videoId: number;
}

VideoFilterModal.defaultProps = {};

export default VideoFilterModal;
