import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { Alert, Platform } from "react-native";
import RNFS from "react-native-fs";
import { FFmpegKit } from "ffmpeg-kit-react-native";

import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  route: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  playing: boolean;
  trimmerLeftHandlePosition: any;
  trimmerRightHandlePosition: any;
  scrubberPosition: any;
  audioClip: any;
  totalDuration: any;
  maxTrimDuration: any;
  fromValue: any;
  toValue: any;
  downloadedAudio: any;
  audioId: any;
  trim_audio: any;
  remoteAudio: any;
  isDownloading: boolean;
  alertModal: any;

  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AudioEditorController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  postAudioCallId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      playing: false,
      trimmerLeftHandlePosition: 100,
      trimmerRightHandlePosition: 660,
      scrubberPosition: 400,
      audioClip: null,
      totalDuration: 180000,
      maxTrimDuration: 3000,
      fromValue: null,
      toValue: null,
      downloadedAudio: null,
      audioId: null,
      trim_audio: "",
      remoteAudio: null,
      isDownloading: false,
      alertModal: {
        openAlertModal: false,
        alertMsg: "",
        headerText: "",
      },
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    // Customizable Area Start
    if (apiRequestCallId == this.postAudioCallId) {
      if (responseJson) {
        this.setState({
          alertModal: {
            openAlertModal: true,
            alertMsg: responseJson?.meta?.message,
          },
        });
        this.setState({
          remoteAudio: responseJson?.data?.attributes?.trim_audio,
        });
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

  validateValues() {
    if (
      (this.state.fromValue == null || this.state.fromValue == "") &&
      (this.state.toValue == null || this.state.toValue == "")
    ) {
      this.setState({
        alertModal: {
          openAlertModal: true,
          alertMsg: "Please enter a valid From & To value",
          headerText: "Empty values",
        },
      });
    } else if (
      (this.state.fromValue < 0 ||
        this.state.fromValue >= this.state.totalDuration ||
        this.state.fromValue == null ||
        this.state.fromValue == "") &&
      (this.state.toValue < 0 ||
        this.state.toValue > this.state.totalDuration ||
        this.state.toValue == null ||
        this.state.toValue == "")
    ) {
      this.setState({
        alertModal: {
          openAlertModal: true,
          alertMsg: "Please enter a valid From & To value",
          headerText: "Invalid values",
        },
      });
    } else if (
      this.state.fromValue < 0 ||
      this.state.fromValue >= this.state.totalDuration ||
      this.state.fromValue == null ||
      this.state.fromValue == ""
    ) {
      this.setState({
        alertModal: {
          openAlertModal: true,
          alertMsg: "Please enter a valid From value",
          headerText: "Invalid values",
        },
      });
    } else if (
      this.state.toValue < 0 ||
      this.state.toValue > this.state.totalDuration ||
      this.state.toValue == null ||
      this.state.toValue == ""
    ) {
      this.setState({
        alertModal: {
          openAlertModal: true,
          alertMsg: "Please enter a valid To value",
          headerText: "Invalid values",
        },
      });
    } else if (parseInt(this.state.toValue) < parseInt(this.state.fromValue)) {
      this.setState({
        alertModal: {
          openAlertModal: true,
          alertMsg: "End time cannot be smaller than start time",
          headerText: "Invalid value",
        },
      });
    } else {
      this.trimMedia();
    }
  }

  formatTimes() {
    let sec = this.state.fromValue;
    let sec2 = this.state.toValue;
    let start = "00:";
    let end = "00:";

    if (Math.trunc(sec / 60) == 0) {
      start = start + "00:" + JSON.stringify(sec % 60);
    }
    if (Math.trunc(sec / 60) > 1) {
      start =
        start +
        (Math.trunc(sec / 60) > 10
          ? JSON.stringify(Math.trunc(sec / 60))
          : "0" + JSON.stringify(Math.trunc(sec / 60))) +
        ":" +
        (sec % 60 >= 10
          ? JSON.stringify(sec % 60)
          : "0" + JSON.stringify(Math.trunc(sec % 60)));
    }
    if (Math.trunc(sec2 / 60) == 0) {
      end = end + "00:" + JSON.stringify(sec2 % 60);
    }
    if (Math.trunc(sec2 / 60) > 1) {
      end =
        end +
        (Math.trunc(sec2 / 60) > 10
          ? JSON.stringify(Math.trunc(sec2 / 60))
          : "0" + JSON.stringify(Math.trunc(sec2 / 60))) +
        ":" +
        (sec2 % 60 >= 10
          ? JSON.stringify(sec2 % 60)
          : "0" + JSON.stringify(Math.trunc(sec2 % 60)));
    }
    this.postTrimmedAudio(start, end);
  }
  // Customizable Area Start
  startDownloading = async () => {
    this.setState({ isDownloading: true });
    try {
      const fileName =
        "Downloaded" +
        Math.round(Date.now()).toString() +
        (this.state.audioClip.title).split(" ").join("");
      const saveFilePath = RNFS.CachesDirectoryPath + fileName + ".mp3";

      const download = RNFS.downloadFile({
        fromUrl: this.state.audioClip.audio,
        toFile: saveFilePath,
      });
      const downloading = await download.promise;

      if (downloading.statusCode == 200) {
        this.setState({ downloadedAudio: saveFilePath });
        this.setState({
          // currentAudio: saveFilePath,
          totalDuration: this.state.totalDuration,
          maxTrimDuration: this.state.totalDuration,
          trimmerRightHandlePosition: this.state.totalDuration,
        });
        this.setState({ isDownloading: false });
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      console.log("error2");
    }
  };

  async trimMedia() {
    // Command for Trim Media - '-i file.mp3 -ss 00:00:02 -t 3 fileTrimmed.mp3;
    let new1 = this.state.downloadedAudio.split(" ").join("");
    let outPath =
      (Platform.OS == "ios"
        ? RNFS.CachesDirectoryPath
        : "file:///storage/emulated/0/Download/") +
      JSON.stringify(new Date().getTime()) +
      "Output.mp3";
    try {
      // Prepare the FFmpeg command
      const command = `-i ${new1} -ss ${this.state.fromValue} -to ${this.state.toValue} ${outPath}`;

      // Execute the FFmpeg command
      console.log("command............", command)
      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();

      // Check if the command was successful
      if (returnCode.isValueSuccess()) {
        this.setState({ trim_audio: outPath }, () => this.formatTimes());
        return "Success: File trimming completed, " + returnCode;
      } else if (returnCode.isValueError()) {
        // Handle errors
        const errorMessage =
          "Failure: Trimming unsuccessful. Code: " + returnCode;
        Alert.alert(errorMessage);
        this.setState({
          alertModal: { openAlertModal: true, alertMsg: errorMessage },
        });
        return errorMessage;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
        this.setState({
          alertModal: { openAlertModal: true, alertMsg: error.message },
        });
        return error.message;
      }
    }
  }

  async postTrimmedAudio(start: any, end: any) {
    const token = await getStorageData("authToken");

    const header = {
      "Content-Type": "multipart/form-data",
      token: token,
      // "token": 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NzM5LCJleHAiOjE2ODI3NTE1MjUsInRva2VuX3R5cGUiOiJsb2dpbiJ9._AHyL_xbsorsHScb6Ze25uXheSK9OGIZzh2rnmDmWpVBSgBe6K06ZR7gvr2oYh_n4USNDE8G2f_z8dOcLMGS-Q'
    };

    let form = new FormData();

    let aud: any = {
      uri: this.state.trim_audio,
      name: "user_edited.mp3",
      type: "audio/mp3",
    };

    form.append("[data][audio_id]", this.state.audioId);
    form.append("[data][trim_audio]", aud);
    form.append("[data][start_time]]", start);
    form.append("[data][end_time]", end);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postAudioCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "/bx_block_audioeditor/trimed_audios"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      form
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
  // Customizable Area End
}
