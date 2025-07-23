import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { getStorageData } from "../../../framework/src/Utilities";
import React from "react";
import { VideoTrimmingFunction } from "./constant";
import Sound from "react-native-sound";
import { FFmpegKit, ReturnCode } from "ffmpeg-kit-react-native";

import RNFS from "react-native-fs";
import { v4 as uuidv4 } from "uuid";
import { getDestFilePath } from "./CommonFile";
import { Platform } from "react-native";
export interface SoundInstance {
  play: (onEnd?: (success: boolean) => void) => void;
  pause: () => void;
  stop: (onStop?: () => void) => void;
  setCurrentTime: (seconds: number) => void;
  getCurrentTime: (callback: (seconds: number) => void) => void;
  setVolume: (volume: number) => void;
  setPan: (panId: number) => void;
  setNumberOfLoops: (numberOfLoops: number) => void;
  release: () => void;
  getDuration: () => number;
  getNumberOfChannels: () => number;
  getVolume: () => number;
  getPan: () => number;
}

export interface VideoPicker {
  id: number;
  uri: string;
  duration: number;
  type: string;
  start: number;
  end: number;
  poster: string;
  degree: number;
  isMuted: boolean;
  audio: string;
}

export interface MusicData {
  attributes: {
    title: string;
    image: string;
    audio: string;
  };
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: any;
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  musicModel: boolean;
  activeTab: number;
  audioTab: number;
  editing: boolean;
  filterType: string;
  videoFunctionTab: VideoTrimmingFunction;
  // Customizable Area Start
  searchValue: string;
  loading: boolean;
  final_list: any;
  playing_item: any;
  isPaused: boolean;
  mediadetails: any;
  allVideoData: VideoPicker[];
  currentAudioUri: string;
  mediaDetails: any;
  isProcessing: boolean;
  selectedVideo: VideoPicker | null;
  musicData: MusicData[];
  token: string;
  isPlaying: boolean | null;
  bucketDetails: any;
  language: string;
  audioData: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class VideoTrimmingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  videoRef = React.createRef();
  postVideoId: string = "";
  getAudioId: string = "";
  getFilteredListCallId: any;
  getAllAudiosCallId: any;
  getMatchingUsersCallId: any;
  selectedMusicFile: SoundInstance | undefined;
  timeout: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.handleToggleEditing = this.handleToggleEditing.bind(this);
    this.handleChangeVideoFunctionTab =
      this.handleChangeVideoFunctionTab.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      musicModel: false,
      activeTab: 1,
      audioTab: 3,
      editing: false,
      filterType: "add",
      videoFunctionTab: VideoTrimmingFunction.none,
      // Customizable Area Start
      isPaused: false,
      mediaDetails: "",
      currentAudioUri: "",
      isProcessing: false,
      mediadetails: "",
      allVideoData: [],
      selectedVideo: null,
      musicData: [],
      token: "",
      isPlaying: false,
      bucketDetails: "",
      searchValue: "",
      loading: false,
      final_list: null,
      playing_item: null,
      language: "",
      audioData: {},
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.downloadFonts();
    // Customizable Area End
  }
  async componentDidMount() {
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language });
    this.getToken();

    this.props.navigation.addListener("focus", async () => {
      const language = await getStorageData("SelectedLng");
      this.setState({ language: language });
    });

    if (this.props.route.params && this.props.route.params.videoData) {
      this.setState(
        {
          mediaDetails: this.props.route?.params?.mediadetails,
          allVideoData: this.props.route.params.videoData,
          selectedVideo: this.props.route.params.videoData[0],
        },
        () => {
          this.getFrameImages();
        }
      );
    }

    if (this.props.route.params && this.props.route.params.bucketDetails) {
      this.setState({ bucketDetails: this.props.route?.params?.bucketDetails });
    }
  }

  async getToken() {
    const token = await getStorageData("authToken", false);
    this.setState(
      {
        token,
      },
      () => {
        this.getAudioData();
      }
    );
  }
  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    if (apiRequestCallId == this.getFilteredListCallId) {
      this.setState({ loading: false });
      if (responseJson) {
        this.setState({ final_list: responseJson?.audio });
      } else {
        this.parseApiErrorResponse(responseJson);
      }
    }
    if (apiRequestCallId == this.getMatchingUsersCallId) {
      this.setState({ loading: false });
      if (responseJson) {
        this.setState({ final_list: responseJson?.account });
      } else {
        this.parseApiErrorResponse(responseJson);
      }
    }
    if (apiRequestCallId == this.getAllAudiosCallId) {
      this.setState({ loading: false });
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if (apiRequestCallId === this.getAudioId) {
        if (responseJson.data && responseJson.data.data) {
          this.setState({ musicData: responseJson.data.data })
        }
      }
    }
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  decideApiCall() {
    if (this.state.audioTab == 3) {
      this.getFilteredList(this.state.searchValue);
    } else if (this.state.audioTab == 2) {
      this.getMatchingUsers(this.state.searchValue);
    }
  }

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start

  downloadFonts = () => {
    RNFS.mkdir(RNFS.DocumentDirectoryPath + "/fonts");
    const fontNames = [
      "https://ai.cavyiot.com/isht/fonts/Poppins-SemiBold.ttf",
      "https://ai.cavyiot.com/isht/fonts/Poppins-Regular.ttf",
      "https://ai.cavyiot.com/isht/fonts/Poppins-Medium.ttf",
      "https://ai.cavyiot.com/isht/fonts/Poppins-Bold.ttf",
      "https://ai.cavyiot.com/isht/fonts/Helvetica-Regular.ttf",
      "https://ai.cavyiot.com/isht/fonts/Helvetica-Bold.ttf",
      "https://ai.cavyiot.com/isht/fonts/Lato-Regular.ttf",
      "https://ai.cavyiot.com/isht/fonts/Lato-Black.ttf",
      "https://ai.cavyiot.com/isht/fonts/Seravek.ttf",
      "https://ai.cavyiot.com/isht/fonts/Seravek-Medium.ttf",
      "https://ai.cavyiot.com/isht/fonts/Poppins-Light.ttf",
      "https://ai.cavyiot.com/isht/fonts/Poppins-BoldItalic.ttf",
      "https://ai.cavyiot.com/isht/fonts/Poppins-ExraLight.ttf",
      "https://ai.cavyiot.com/isht/fonts/Poppins-ExtraBold.ttf",
      "https://ai.cavyiot.com/isht/fonts/Poppins-ExtraBoldItalic.ttf",
      "https://ai.cavyiot.com/isht/fonts/Brusher.ttf",
      "https://ai.cavyiot.com/isht/fonts/knewave.ttf",
      "https://ai.cavyiot.com/isht/fonts/BebasNeue-Regular.ttf",
      "https://ai.cavyiot.com/isht/fonts/Poppins-Italic.ttf",
      "https://ai.cavyiot.com/isht/fonts/Roboto-BlackItalic.ttf",
      "https://ai.cavyiot.com/isht/fonts/Roboto-BoldItalic.ttf",
      "https://ai.cavyiot.com/isht/fonts/Roboto-LightItalic.ttf",
    ];

    fontNames.forEach((link) => {
      const filename = link
        .toString()
        .replace(/^.*[\\\/]/, "")
        .replace(/%20/g, " ");
      RNFS.exists(`${RNFS.DocumentDirectoryPath}/fonts/${filename}`).then(
        async (exists) => {
          if (!exists) {
            RNFS.downloadFile({
              fromUrl: link,
              toFile: `${RNFS.DocumentDirectoryPath}/fonts/${filename}`,
            });
          }
        }
      );
    });
  };

  setOnMountData = () => {
    this.setState(
      { selectedVideo: this.props.route.params.videoData[0] },
      () => {
        this.getFrameImages();
      }
    );
  };

  async getFilteredList(keyword: any) {
    this.setState({ loading: true });
    const t = await getStorageData("authToken");
    console.log("token", t);

    const header = {
      token: await getStorageData("authToken"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getFilteredListCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_elasticsearch/audio_search?q=${keyword}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  async getAllAudios() {
    const header = {
      token: await getStorageData("authToken"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAllAudiosCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "/bx_block_audiolibrary/audios_list"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
  }

  async getMatchingUsers(keyword: any) {
    this.setState({ loading: true });
    const token = await getStorageData("authToken");

    const header = {
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getMatchingUsersCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_elasticsearch/account_search?q=${keyword}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  handleToggleEditing() {
    this.setState((prevState) => ({
      editing: !prevState.editing,
    }));
  }
  handleChangeVideoFunctionTab = (
    value: VideoTrimmingFunction,
    paused: boolean
  ) => {
    this.setState({
      videoFunctionTab: value,
      isPaused: paused,
    });
  };

  onMergeAudio = () => {
    if (this.state.isPlaying) {
      this.setState({ isPlaying: false });
      this.selectedMusicFile?.release();
    } else {
      this.setState({ isPlaying: null }, () => {
        let music = new Sound(
          this.state.currentAudioUri,
          undefined,
          (error) => {
            if (!error) {
              this.selectedMusicFile = music;
              this.playAudio();
            }
          }
        );
      });
    }
  };

  checkFilesExistOrNot = (command: string, toFile: string) => {
    this.onEncodingVideo(command, toFile);
  };

  getFrameImages = async () => {
    const random = uuidv4();
    let outputImagePath = `${RNFS.CachesDirectoryPath}/${random}.png`;
    const ffmpegCommand = `-i ${this.state.selectedVideo?.uri
      } -ss 00:${Math.round(
        (this.state.selectedVideo?.duration ?? 2000) / 1000
      )} -vframes 1 ${outputImagePath}`;

    try {
      const session = await FFmpegKit.execute(ffmpegCommand);
      const returnCode = await session.getReturnCode();

      if (returnCode.isValueSuccess()) {
        let selectedNewVideo = JSON.parse(
          JSON.stringify(this.state.selectedVideo)
        );
        let newVideoData = this.state.allVideoData.map((item) => {
          if (item.id === this.state.selectedVideo?.id) {
            let videoFile = {
              id: item.id,
              uri: item.uri,
              type: item.type,
              duration: item.duration,
              start: item.start,
              end: item.end,
              poster: outputImagePath,
              degree: 0,
              isMuted: false,
              audio: "",
            };
            selectedNewVideo = videoFile;
            return videoFile;
          }
          return item;
        });

        this.setState({
          allVideoData: newVideoData,
          selectedVideo: selectedNewVideo,
          isPaused: false,
        });
      } else {
        this.setState({ isPaused: false });
        console.error("FFmpeg execution failed", returnCode);
      }
    } catch (error) {
      console.error("Error executing FFmpeg command:", error);
      this.setState({ isPaused: false });
    }
  };

  getNewModifiedData = (result: string) => {
    let newVideoData = this.state.allVideoData.map((item) => {
      if (item.id === this.state.selectedVideo?.id) {
        let videoFile = {
          id: item.id,
          uri: result,
          type: item.type,
          duration: item.duration,
          start: item.start,
          end: item.end,
          poster: item.poster,
          degree: 0,
          isMuted: false,
          audio: item.audio,
        };
        this.setState({ selectedVideo: videoFile });
        return videoFile;
      }
      return item;
    });
    return newVideoData;
  };

  getAudioData = () => {
    const header = {
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getAudioId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAudioList
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  uploadPost = () => {
    const { token } = this.state;
    const header = {
      token,
    };

    let formdata = new FormData();
    this.state.allVideoData.forEach((item) => {
      formdata.append("file[]", item.uri as unknown as Blob);
    });

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.postVideoId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.uploadMediaApi
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  onEncodingVideo = async (command: string, toFile: string) => {
    try {
      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();

      if (returnCode.isValueSuccess()) {
        this.setState({ allVideoData: this.getNewModifiedData(toFile) });
      } else {
        console.error("Encoding failed with return code", returnCode);
      }

      this.setState({ isProcessing: false, isPaused: false });
      this.selectedMusicFile?.release();
    } catch (error) {
      console.error("Error during encoding:", error);
      this.setState({ isProcessing: false, isPaused: false });
      this.selectedMusicFile?.release();
    }
  };

  playAudio = () => {
    if (this.state.isPlaying != null && !this.state.isPlaying) {
      this.selectedMusicFile?.release();
      return;
    }
    this.setState({ isPlaying: true });
    this.selectedMusicFile?.play((success) => {
      this.setState({ isPlaying: false });
      this.selectedMusicFile?.release();
    })
  };

  onMergeVideo = async () => {
    this.setState({ isProcessing: true, isPaused: true });
    const { allVideoData, currentAudioUri, selectedVideo } = this.state;
    let duration = 0;

    allVideoData.forEach((item) => {
      duration += item.duration;
    });
    duration = Math.floor(duration / 1000) / 2;
    console.log("))))))))))))))))", currentAudioUri)

    this.onvideoMergeFun(allVideoData, currentAudioUri, selectedVideo, duration)

    let newAllUri: string[] = [];
    const newVideo = () => {
      const random = uuidv4();
      let toFile = `${RNFS.CachesDirectoryPath}/${random}.ts`;

      const command = `-y -i "${allVideoData[newAllUri.length].uri
        }" -c copy -bsf:v h264_mp4toannexb -f mpegts ${toFile}`;

      FFmpegKit.executeAsync(command, async (session) => {
        const returnCode = await session.getReturnCode();

        if (ReturnCode.isSuccess(returnCode)) {
          newAllUri.push(toFile);
          if (newAllUri.length != allVideoData.length) {
            newVideo();
          } else {
            this.videoPlayWritePath(newAllUri, currentAudioUri, duration);
          }
        }
      });
    };
    newVideo();
  };

  onvideoMergeFun = async (allVideoData: any, currentAudioUri: any, selectedVideo: any, duration: any) => {
    if (allVideoData.length == 1) {
      if (currentAudioUri) {
        try {
          const audioMergeFile = getDestFilePath();
          if (Platform.OS === "android") {
            const random = uuidv4();
            const localAudioPath = `${RNFS.CachesDirectoryPath}/${random}.mp3`;
            await RNFS.downloadFile({
              fromUrl: currentAudioUri,
              toFile: localAudioPath
            }).promise;
            const videoInput = `-i "${selectedVideo?.uri ?? ""}"`;
            const audioMergeCommand = `-y ${videoInput} -stream_loop -1 -i "${localAudioPath}" -filter_complex "[1:0]apad" -shortest ${audioMergeFile}`;
            const session = await FFmpegKit.execute(audioMergeCommand);
            const returnCode = await session.getReturnCode();
            console.log("Error during audio merge:------333-------------", returnCode);
            if (returnCode.isValueSuccess()) {
              this.getResultVideoFrames(audioMergeFile, duration);
            }
          }
          else {
            const videoInput = `-i "${selectedVideo?.uri ?? ""}"`;
            const audioMergeCommand = `-y ${videoInput} -stream_loop -1 -i "${currentAudioUri}" -filter_complex "[1:0]apad" -shortest ${audioMergeFile}`;
            const session = await FFmpegKit.execute(audioMergeCommand);
            const returnCode = await session.getReturnCode();
            console.log("Error during audio merge:------333-------------", returnCode);
            if (returnCode.isValueSuccess()) {
              this.getResultVideoFrames(audioMergeFile, duration);
            }
          }
        } catch (error) {
          console.error("Error during audio merge:", error);
        }
      } else {
        this.getResultVideoFrames(
          this.state.selectedVideo?.uri ?? "",
          duration
        );
      }
    }
  };

  videoPlayWritePath = (
    newAllUri: string[],
    currentAudioUri: string,
    duration: any
  ) => {
    const { selectedVideo } = this.state;
    let newCommand = `-y -i "concat:`;
    newAllUri.forEach((item, index) => {
      newCommand += `${item}`;
      if (newAllUri.length - 1 !== index) {
        newCommand += `|`;
      }
    });
    const newRandom = uuidv4();
    const newFile = `${RNFS.CachesDirectoryPath}/${newRandom}.mp4`;
    newCommand += `" -c copy ${newFile}`;
    FFmpegKit.executeAsync(newCommand, async (finalSession) => {
      const finalReturnCode = await finalSession.getReturnCode();

      if (ReturnCode.isSuccess(finalReturnCode)) {
        if (currentAudioUri) {
          const audioMergeFile = getDestFilePath();
          const videoInput = `-i "${selectedVideo?.uri ?? ""}"`;
          const audioMergeCommand = `-y ${videoInput} -stream_loop -1 -i "${currentAudioUri}" -filter_complex "[1:0]apad" -shortest ${audioMergeFile}`;
          FFmpegKit.executeAsync(
            audioMergeCommand,
            async (audioMergeSession) => {
              const audioMergeReturnCode =
                await audioMergeSession.getReturnCode();

              if (ReturnCode.isSuccess(audioMergeReturnCode)) {
                this.getResultVideoFrames(audioMergeFile, duration);
              }
            }
          );
        } else {
          this.getResultVideoFrames(newFile, duration);
        }
      }
      newAllUri.forEach((filePath) => {
        RNFS.unlink(filePath);
      });
      this.selectedMusicFile?.release();
    });
  };

  getResultVideoFrames = async (result: string, duration: number) => {
    const random = uuidv4();
    let outputImagePath = `${RNFS.CachesDirectoryPath}/${random}.png`;
    const ffmpegCommand = `-y -i "${result}" -ss 00:00:${duration} -vframes 1 ${outputImagePath}`;

    FFmpegKit.executeAsync(ffmpegCommand, async (session) => {
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        if (this.state.isPlaying) {
          this.selectedMusicFile?.release();
        }

        // Update state and navigate to PostDetails screen
        this.setState(
          { isProcessing: false, isPaused: true, isPlaying: false },
          () => {
            this.props.navigation.navigate("PostDetails", {
              mediadetails: { uri: result },
              bucketdetails: this.state.bucketDetails,
              poster: outputImagePath,
              audioData: this.state.audioData,
            });
          }
        );
      } else {
        console.error("FFmpeg command failed to execute.");
      }
    });
  };
  // Customizable Area End
}
