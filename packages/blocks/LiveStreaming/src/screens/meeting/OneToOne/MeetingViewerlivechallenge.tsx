import * as React from "react";

import {
  Constants,
  getAudioDeviceList,
  useMeeting,
  // @ts-ignore
} from "@videosdk.live/react-native-sdk";
import { useEffect, useRef, useState } from "react";
import Video from "react-native-video";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Platform, Image, BackHandler, AppState, KeyboardAvoidingView,
} from "react-native";
import {
  MicOff,
  MicOn,
} from "../../../components/icons/Icons";
import Blink from "../../../components/Blink";
import Menu from "../../../components/Menu/Menu";
import FOND from "../../../../../../components/src/Fonts/Fonts";
import Scale from "../../../../../../components/src/Scale";
import colors from "../../../styles/colors";
import { ROBOTO_FONTS } from "../../../styles/fonts";
import LocalViewContainerChallenges from "./LocalViewContainerChellanges";
import BackButton from "../../../components/BackButton";
import storage from "framework/src/StorageProvider";
import {
  ActiveMeetingStream,
  LiveStream,
  ParticipantMode,
} from "../../../Types";
import { deviceHeight, deviceWidth } from "framework/src/Utilities";
import AlertModal from "../../../../../../components/src/AlertModal";

const dimension = Dimensions.get('window');
interface MeetingViewerlivechallenge1 {
  navigation: any;
  onPressAddMore: () => void;
  onPressAddMoreGift: () => void;
  fetchSession: (meetingId: string) => void;
  startedRecording: (meetingId: string) => void;
  stopRecording: (meetingId: string) => void;
  stopStream: (meetingId: string) => void;
  startStream: (props: LiveStream) => void;
  hlsStopLiveStream: (meetingId: string) => void;
  hlsStartLiveStream: (meetingId: string) => void;
  hlsActiveLiveStream: (props: ActiveMeetingStream) => void;
  navigateToLivePage: () => void;
  navigateToLivePageparticipants: () => void;
  participantMode?: string;
  giftModal?: boolean;
  selectedCatalogue?: any
  sendCoin: () => void;
  teamParticipantIds: { team1: { id: number }[], team2: { id: number }[] };
  isClosed: boolean;
  isLive: boolean;
  getOverallData: () => void;
  viewheight: number;
  getAllViewersCount:(count:number)=> void;
}

function MeetingViewerlivechallenge({
  fetchSession,
  hlsStopLiveStream,
  hlsStartLiveStream,
  navigateToLivePage,
  navigateToLivePageparticipants,
  sendCoin,
  participantMode,
  teamParticipantIds,
  isClosed,
  isLive,
  getOverallData,
  getAllViewersCount,
  viewheight
}: MeetingViewerlivechallenge1) {
  const [liveStream, setLiveStream] = useState<boolean>(false);
  const [downStreamURL, setDownStreamURL] = useState<string>(""); 
  const [isDisabled,setIsDisabled]=useState<boolean>(false);
  const [alertModal, setAlertModal] = useState({openAlertModal:false,alertMsg:"",headerText:""});
  const mMeeting = useMeeting({});

  const mMeetingRef = useRef<typeof useMeeting>();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const backAction = () => {
      // this.prop
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    return ()=>{
        if (localParticipant?.mode === ParticipantMode.CONFERENCE){
          hlsStopLiveStream(meetingId)
          end();
          navigateToLivePage();
        }
        else if(localParticipant?.mode === ParticipantMode.VIEWER) {
          leave();
          navigateToLivePageparticipants();
        }
    }
  }, [isClosed])

  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  // get team1 and team2 arrays from teamParticipantIds
  // and convert them to alternating array for rendering in columns
  const mergedAlternatingArr: Array<Object> = teamParticipantIds.team1.reduce((acc:any, curr:any, i) => {
    if (teamParticipantIds?.team2[i]) {
      return [...acc, curr, teamParticipantIds?.team2[i]]
    }
    return [...acc, curr];
  }, []).map((item:any) => item.name);

  const {
    participants,
    localMicOn,
    end,
    changeWebcam,
    toggleMic,
    hlsState,
    meetingId,
    meeting,
    recordingState,
    localParticipant,
    hlsUrls,
    leave,
  } = useMeeting({
    onError: (data: { code: string; message: string }) => {
      const { code, message } = data; 
      setAlertModal({openAlertModal:true,alertMsg:message.toString(),headerText:code.toString()})
      setLiveStream(false);
    },
    onLivestreamStateChanged,
    onHlsStateChanged,
    onMeetingJoined: () => {
      hlsStartLiveStream(meetingId);
      const localParticipants = mMeetingRef.current?.localParticipant;
      if (localParticipants.mode == ParticipantMode?.CONFERENCE) {
        localParticipants?.pin();
      }else{
        localParticipants?.unpin();
      }
    },
    onParticipantJoined: (participant: any) => {
      if (participant?.mode === ParticipantMode.CONFERENCE) {
        getOverallData();
        participant.pin();
      } else{
        participant.unpin();
      }
    },
    // onParticipantModeChanged: ({
    //   mode,
    //   participantId,
    // }: {
    //   mode: string;
    //   participantId: string;
    // }) => {
    //   if (participantId === localParticipant.id) {
    //     if (mode === ParticipantMode.CONFERENCE) {
    //       // localParticipant.pin();
    //     } else {
    //       // localParticipant.unpin();
    //     }
    //   }
    // },
  });

  const moreOptionsMenu: React.RefObject<Menu> = useRef(null);
  const recordingRef: React.RefObject<Blink> = useRef(null);
  const hlsRef: React.RefObject<Blink> = useRef(null);

  const [streamLoading, setStreamLoading] = useState<boolean>(false);
  const [liveStreaming, setLiveStreaming] = useState<boolean>(false);
  const [speakerLength, setSpeakerLength] = useState(1);
  async function startTimer() {
    fetchSession(meeting.id);
  }

  const participantIds = [...participants.keys()];
  const participantCount: number = participantIds.length || 0;

  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(()=> {
  getAllViewersCount(participantCount)
  },[participantCount])

  useEffect(() => {
    AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      } else {
        handleAppStateChange();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });
 
 return () => {
   handleAppStateChange()
 };
   }, []);
   
  const  handleAppStateChange = () => {
    if (localParticipant?.mode === ParticipantMode.CONFERENCE){
      hlsStopLiveStream(meetingId)
      end();
      navigateToLivePage();
    }
    else if(localParticipant?.mode === ParticipantMode.VIEWER) {
      leave();
      navigateToLivePageparticipants();
    }
      if(moreOptionsMenu.current){
        moreOptionsMenu.current.close()
      }
}
  useEffect(() => {
    startTimer();
  }, []);

  function onLivestreamStateChanged(data: { status: string }) {
    const { status } = data;

    switch (status) {
      case Constants.livestreamEvents.LIVESTREAM_STARTING: {
        setStreamLoading(true);
        setLiveStream(true);
        break;
      }
      case Constants.livestreamEvents.LIVESTREAM_STARTED: {
        setStreamLoading(false);
        setLiveStream(true);
        break;
      }
      case Constants.livestreamEvents.LIVESTREAM_STOPPING: {
        setStreamLoading(true);
        break;
      }
      case Constants.livestreamEvents.LIVESTREAM_STOPPED: {
        setLiveStream(false);
        setStreamLoading(false);
        break;
      }
      default:
        break;
    }
  }

  async function onHlsStateChanged(data: {
    status: string;
    downstreamUrl: string;
  }) {
    const token = await storage.get("token");
    if (token === null) {
      return false;
    }
    
    switch (data.status) {
      case "HLS_PLAYABLE":
        setIsDisabled(false)
        break;
      case "HLS_STOPPED": {
        setIsDisabled(false)
        break;
      }
      default:
        break;
    }
    
  }
  const speakers = React.useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode == Constants.modes.CONFERENCE;
      }
    );
    if (mergedAlternatingArr && mergedAlternatingArr.length > 0) {
      speakerParticipants.sort((a, b) => {
        return mergedAlternatingArr.indexOf(a.displayName) - mergedAlternatingArr.indexOf(b.displayName);
      });
    }
    return speakerParticipants;
  }, [participants, mergedAlternatingArr]);

  useEffect(() => {
    if (speakers.length == 1) {
      setSpeakerLength(1)
    } else if (speakers.length % 2 == 0) {
      setSpeakerLength(speakers.length / 2)
    } else {
      setSpeakerLength((speakers.length + 1) / 2)
    }
  }, [speakers.length])

  useEffect(() => {
    if (hlsRef.current) {
      if (hlsState === "HLS_STARTING" || hlsState === "HLS_STOPPING") {
        hlsRef.current.start();
      } else {
        hlsRef.current.stop();
      }
    }
  }, [hlsState]);
  console.log('hlsUrlshlsUrlshlsUrlshlsUrls',hlsUrls)
console.log('hlsState',hlsState);

  const renderVideoBlocks = () => {
    if (participantCount > 0) {
      if (localParticipant?.mode === ParticipantMode.VIEWER) {
        if (hlsState === "HLS_PLAYABLE") {
          console.log('i should see it here',hlsState)
          console.log(hlsUrls.downstreamUrl)
          return (
            <Video
              source={{
                uri: hlsUrls?.downstreamUrl,
              }}
              resizeMode={"cover"}
              style={styles.newStyle}
              fullscreenAutorotate
              fullscreen
            />
          );
        } else {
          return <>{renderWaitingScreen()}</>;
        }
      } else {
        return (
          <View style={styles.speakersContainer}>
            {/* Render Participant List */}

            {speakers.length > 0 ? (
              speakers.map((item: any, index: number) => {
                return (
                  <View style={videoStyles(viewheight > 0 ? viewheight : 300, speakerLength).videoViewContainer} key={item?.id}>
                    <LocalViewContainerChallenges participantId={item?.id} key={item?.id} />
                    {localParticipant?.id == item?.id ? (
              <View style={[styles.absoluteView,{position:'absolute',top:5,right:5}]}>
                <TouchableOpacity
                  testID="changemic"
                  style={styles.micIcon}
                  onPress={() => toggleMic()}>
                  {localMicOn ? (
                    <MicOn height={22} width={22} fill="#FFF" />
                  ) : (
                    <MicOff height={26} width={26} fill="#FFF" />
                  )}

                </TouchableOpacity>
                <View style={{}}>
                  <TouchableOpacity
                    testID="changewebcambtn"
                    onPress={() => changeWebcam()}>
                    <Image source={require('../../../../assets/ChangeCamera.png')} style={styles.webcam} />

                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
                  </View>
                )
              })
            ) : null}
          </View>
        )
      }
    } else {
      return (
        <View style={styles.loader}>
          <Text style={styles.copyText}>Meeting is ended ....</Text>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }
  };

  const renderWaitingScreen = () => {
    return (
      <View style={styles.waitingView}>
        <Text style={styles.waitingText}>
          Waiting for host to start live stream
        </Text>
      </View>
    );
  };

  return ( 
    <>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardPadding}
    >
      {liveStreaming ? (
        <SafeAreaView testID="livestreampage">
          <View>
            <BackButton testID="backbtn" setLiveStreaming={setLiveStreaming} />
          </View>
        </SafeAreaView>
      ) : (

          <View style={styles.screenSahreContainer}>{renderVideoBlocks()}</View>
      )}
    </KeyboardAvoidingView>
      <AlertModal  alertModal={alertModal} onPress2={()=>{setAlertModal({openAlertModal:false,alertMsg:"",headerText:""})}}
       btnTitle2={"OK"} />
    </>

  );
}

const videoStyles = (viewheight: number, speakersLength: number) => StyleSheet.create({
  videoViewContainer: {
    borderColor: "black",
    marginVertical: 1,
    borderWidth: 1,
    maxWidth: deviceWidth * 0.495,
    minWidth: deviceWidth * 0.495,
    minHeight: viewheight / speakersLength,
  },
});

const styles = StyleSheet.create({
  webcam: {
    height: 20,
    width: 20,
    // marginTop:8,
  },
  modalContainer: {
    flex: 1,
  },
  modalListContainer: {
    position: 'absolute',
    bottom: 0,
    // width: screenWidth,
    borderTopRightRadius: Scale(20),
    borderTopLeftRadius: Scale(20),
    backgroundColor: 'rgb(255, 255, 255)',
    maxHeight: Scale(500),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Scale(20),
    borderBottomColor: "grey",
    borderBottomWidth: 1
    // marginVertical: Scale(10),
  },
  headerText: {
    fontFamily: FOND.MontserratSemiBold,
    fontSize: Scale(20)
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  searchContainerStyle: {
    marginTop: 10,
    width: '95%',
    backgroundColor: "transparent",
    padding: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRadius: 0,
    paddingHorizontal: Scale(10)
  },
  searchInputStyle: {
    backgroundColor: "#EEEEEE",
    // height: deviceBasedDynamicDimension(45, true , 1),
  },
  emptyimg: {
    width: Scale(80),
    height: Scale(80)
  },
  profileimg: {
    width: Scale(40),
    height: Scale(40)
  },
  normalText: {
    fontFamily: FOND.MontserratRegular,
    fontSize: Scale(10)
  },
  nameText: {
    fontFamily: FOND.MontserratSemiBold,
    fontSize: Scale(12)
  },

  mainView: {
    width: "100%",
    position: "absolute",
    zIndex: 100,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    top:Scale(10),
    right:Scale(15)
  },
  meetingIdContainer: { flexDirection: "row" },
  meetingIdText: {
    fontSize: 16,
    fontFamily: ROBOTO_FONTS.RobotoBold,
    color: colors.primary[100],
  },
  time: {
    color: "#9A9FA5",
    fontSize: 14,
    fontFamily: ROBOTO_FONTS.RobotoMedium,
  },
  copyText: {
    justifyContent: "center",
    marginLeft: 10,
    // marginTop: 4,
  },
  copyText1: {
    fontSize: 12,
    color: colors.primary[100],
  },
  screenSahreContainer: {
    // flex: 1,
    //  marginTop: 8,
    //  marginBottom: 54,
    height: '100%'
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  endCall: {
    height: 1,
    backgroundColor: colors.primary["600"],
  },
  button: {
    marginRight: 10,
  },
  dropDown: {
    backgroundColor: "#202427",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#202427",
    borderRadius: 10,
    textAlign: "center",
  },
  itemTextStyleDropdown: {
    color: colors.primary[100],
    textAlign: "center",
  },
  placeholderStyleDropdown: {
    backgroundColor: "#202427",
    color: colors.primary[100],
    textAlign: "center",
  },
  selectedTextStyleDropdown: {
    color: colors.primary[100],
    textAlign: "center",
  },
  iconContainerStylesDropDown: {
    backgroundColor: "#202427",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#202427",
  },
  moreOption: {
    borderWidth: 1.5,
    borderColor: "#2B3034",
    transform: [{ rotate: "90deg" }],
  },
  goLive: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    // padding: 8,
    borderRadius: 5,
    //borderWidth: 1.5,
    backgroundColor: "#FF5D5D",
    // marginTop:6,
    // width:70,
    height: 30,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  goLive1: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    // padding: 8,
    borderRadius: 5,
    borderWidth: 1.5,
    // marginTop: 5,
    //borderColor: "#2B3034",
    backgroundColor: "black",
    width: 70,
    height: 30,
    justifyContent: 'center'
  },
  View: {
    flex: 1,
    justifyContent: "space-between",
  },
  newStyle: {
    flex: 1,
    // backgroundColor: "black",
  },
  waitingView: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  waitingText: {
    fontSize: Dimensions.get("window").fontScale + 20,
    color: "#FFF",
    fontFamily: ROBOTO_FONTS.RobotoBold,
    paddingLeft: 4,
    paddingRight: 4,
  },
  micStyle: {
    paddingLeft: 0,
    height: 52,
  },
  videoStyle: {
    borderWidth: 1.5,
    borderColor: "#2B3034",
  },
  viewStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",

  },
  primary: {
    height: 1,
    backgroundColor: colors.primary["600"],
  },
  bottomStyle: {
    borderWidth: 1.5,
    borderColor: "#2B3034",
  },
  btnText: {
    fontSize: 12,
    color: colors.primary[100],
  },
  viewStyle1: {
    height: 1,
    backgroundColor: colors.primary["600"],
  },
  audioStyles: {
    height: 1,
    backgroundColor: colors.primary["600"],
  },
  fleDir: {
    flexDirection: "row"
  },
  tooltipContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 100,
  },
  tooltipText: {
    color: 'white',
    marginRight: 8,
  },
  tooltipPointer: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderTopColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: 'transparent',
    borderRightWidth: 8,
    borderRightColor: 'rgba(0, 0, 0, 0.7)',
    transform: [{ rotate: '45deg' }],
    marginRight: 8,
  },
  keyboardPadding: { flex: 1 },
  speakersContainer: {
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'space-between',
    maxHeight: deviceHeight * 0.4,
    minHeight: deviceHeight * 0.4,
  },
  micIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 30, 
    width: 30,
    marginHorizontal:10
  },
  absoluteView:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  }
});

export default React.memo(MeetingViewerlivechallenge);