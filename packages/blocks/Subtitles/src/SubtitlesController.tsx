// Customizable Area Start
import { PermissionsAndroid } from 'react-native';
import { BlockComponent } from "../../../framework/src/BlockComponent";
import Voice from '@react-native-voice/voice';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  // Customizable Area Start
  navigation: any;
  id: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  error: string;
  partialResults: string[];
  transcript: string;
  list: string[];
  text: string;
  // Customizable Area End
}
export interface SpeechResultsEvent  {
  value?: string[];
}
interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}
export default class Subtitles extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  socket!: Socket<DefaultEventsMap, DefaultEventsMap>;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.state = {
      error: '',
      partialResults: [],
      transcript: '',
      list: [],
      text: '',
    };
    
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.setSocketConnection()
  }

  async componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onStart = () => {
    Voice.start(configJSON.locale, {
      EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: configJSON.speechLength,
    });
  }
  
  onEnd = () => {
    Voice.destroy()
    this.state.list.push(this.state.list[this.state.list.length - 1] + this.state.text)
    this.setState({ list: this.state.list})
    const transcript = this.state.list[this.state.list.length - 1]
    this.socket.emit(configJSON.TRANSCRIPT_COMPLETE, transcript.substring(configJSON.startIndex))
  }

  setSocketConnection = () => {
    this.socket = io(`${configJSON.serverUrl}:${configJSON.port}`);
    if(this.isPlatformAndroid())
    {
      this.askForPermission()
    }
    this.socket.on(configJSON.TRANSCRIPT, (data: string) => {
      this.setState({ transcript: data })
    })
  }

  askForPermission = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: configJSON.permissionTitle,
          message: configJSON.message,
          buttonNeutral: configJSON.neutral,
          buttonNegative: configJSON.cancel,
          buttonPositive: configJSON.ok
        }
      );
    } catch (err) {
      console.warn('err: ', err);
    }
  }

  onSpeechPartialResults = (e: SpeechResultsEvent) => {
    this.setState({partialResults: e.value || ['']})
    
    if(e?.value && e.value[0] == ''){
      this.state.list.push(this.state.list[this.state.list.length - 1] + this.state.text)
      this.setState({ list: this.state.list })
    } else {
      this.setState({ text: e.value && e.value[0] || '' })
    }
    
    this.socket.emit(configJSON.TRANSCRIPT, { data: e.value && e.value[0]})
  };
  // Customizable Area End
}
