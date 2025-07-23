import * as React from "react";
//@ts-ignore
import {Constants,useMeeting} from "@videosdk.live/react-native-sdk";
import storage from "framework/src/StorageProvider";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  AppState,
  BackHandler,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Video from "react-native-video";
import Tooltip from 'react-native-walkthrough-tooltip';
import FOND from "../../../../../../components/src/Fonts/Fonts";
import Scale from "../../../../../../components/src/Scale";
import {
  LiveStream,
  ParticipantMode
} from "../../../Types";
import Blink from "../../../components/Blink";
import Menu from "../../../components/Menu/Menu";
import {
  MicOff,
  MicOn
} from "../../../components/icons/Icons";
import colors from "../../../styles/colors";
import { ROBOTO_FONTS } from "../../../styles/fonts";
//@ts-ignore
import { useOrientation } from '../../../utils/useOrientation';
import ChatViewer from "../Components/ChatViewer/ChatViewer";
import LocalViewContainer from "./LocalViewContainer";


const dimension = Dimensions.get('window');
interface OneToOneMeetingViewerProps {
  navigation: any;
  onPressAddMore:()=>void;
  onPressAddMoreGift:()=>void;
  selectedCatalogueID:void;
  fetchSession: (meetingId: string) => void;
  startedRecording: (meetingId: string) => void;
  stopRecording: (meetingId: string) => void;
  stopStream: (meetingId: string) => void;
  startStream: (props: LiveStream) => void;
  hlsStopLiveStream: (meetingId: string) => void;
  hlsStartLiveStream: (meetingId: string) => void;
  navigateToLivePage: () => void;
  navigateToLivePageparticipants:()=>void;
  navigateWithoutClose:()=>void;
  participantMode?: string;
  giftModal:boolean;
  selectedCatalogue:any;
  sendCoin:()=>void;
  isCoinSent: boolean;
  setIsCoinSent: (val: boolean) => void; 
  setgiftModal:(val:boolean)=>void;
  setSelectedCatalogueID:(val:any)=>void; 
  setSelectedCatalogueURL:(val:any)=>void;
  setSelectedCatalogue:(val:any)=>void;
  setLottieAnimation: (show: boolean, url: string, audioUrl: string,json:string,positionTop:number,positionLeft:number) => void,
  modeTypes:any;
}

export default function MeetingViewer({
  fetchSession,
  onPressAddMore,
  onPressAddMoreGift,
  selectedCatalogueID,
  sendCoin,
  hlsStopLiveStream,
  hlsStartLiveStream,
  navigateToLivePage,
  navigateToLivePageparticipants,
  navigateWithoutClose,
  giftModal,
  selectedCatalogue,
  isCoinSent,
  setIsCoinSent,
  setgiftModal,
  setSelectedCatalogueID,
  setSelectedCatalogueURL,
  setSelectedCatalogue,
  setLottieAnimation,
  modeTypes
}: OneToOneMeetingViewerProps) {
  const [isDisabled,setIsDisabled]=useState<boolean>(false);
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
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);
  const [loader, setLoader] = useState<boolean>(false);
  const [shouldRenderAlert, setShouldRenderAlert] = useState<boolean>(false);
  const {
    participants,
    localMicOn,
    leave,
    end,
    changeWebcam,
    toggleMic,
    hlsState,
    meetingId,
    meeting,
    recordingState,
    localParticipant,
    hlsUrls,
  } = useMeeting({
    onError: (data: { code: string; message: string }) => {
      const { code, message } = data;
      Alert.alert(code.toString(), message.toString()); 
    },
    onHlsStateChanged,
    onMeetingJoined: () => {
      console.log("onMeetingJoined", modeTypes)
      const localParticipants = mMeetingRef.current?.localParticipant;
      if (localParticipants.mode == ParticipantMode?.CONFERENCE) {
        localParticipants?.pin();
      }else{
        localParticipants?.unpin();
      }
    },
    onParticipantJoined:(participant:any) => {
        if (participant?.mode === ParticipantMode.CONFERENCE) {
          setShouldRenderAlert(true);
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
    //       localParticipant.pin();
    //     } else {
    //       localParticipant.unpin();
    //     }
    //   }
   
    // },
  });

  useEffect(()=>{
    if(modeTypes == ParticipantMode.CONFERENCE){      
      setLoader(false)
    }
  },[modeTypes])

  const moreOptionsMenu: React.RefObject<Menu> = useRef(null);
  const recordingRef: React.RefObject<Blink> = useRef(null);
  const hlsRef: React.RefObject<Blink> = useRef(null);

  const participantIds = [...participants.keys()];
  const participantCount: number = participantIds.length || 0;
useEffect(()=>{
  const timeout=setTimeout(() => {
    if(loader &&shouldRenderAlert){
      alert("Please change your internet connection and try again.")
    }
  }, 30000);
  return ()=>clearTimeout(timeout)
},[loader,mMeetingRef.current?.localParticipant,participantCount])
  const [liveTooltipVisible, setLiveTooltipVisible] = useState(true);

  async function startTimer() {
    fetchSession(meeting.id);
  }

  const orientation = useOrientation()

  useEffect(() => {
   AppState.addEventListener('change',() => {
      if (appState.current=== "background") 
        handleAppStateChange()
      
 if (appState.current=== "background")
        handleAppStateChange()
});

return () => {
  handleAppStateChange()
};
  }, []);
 const  handleAppStateChange = () => {
      if(localParticipant?.mode === ParticipantMode.CONFERENCE){
        leave();
        end();
        navigateToLivePage();
      }
        else{
          navigateToLivePageparticipants();
        }
        if(moreOptionsMenu.current){
          moreOptionsMenu.current.close()
        }
  }
  useEffect(() => {
    startTimer();
  }, []);

  
  const changeRecordingState = async () => {
    if (recordingRef.current) {
      if (
        recordingState === Constants.recordingEvents.RECORDING_STARTING ||
        recordingState === Constants.recordingEvents.RECORDING_STOPPING
      ) {
        recordingRef.current.start();
      } else {
        recordingRef.current.stop();
      }
    }
  };

  useEffect(() => {
    changeRecordingState();
  }, [recordingState]);

  const speakers = React.useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
        (participant) => {
          return participant.mode == Constants.modes.CONFERENCE;
        }
    );
    return speakerParticipants;
  }, [participants]);
  const perRow =  speakers.length >= 3 ? 2 : 1;
  console.log('roomId', meetingId)
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

  
  const changeHlsStream = async () => {
    if(meetingId){
      if (
        !hlsState ||
        hlsState === "HLS_STOPPED"||hlsState === "HLS_STOPPING"
      ) {
        if(!isDisabled){
         hlsStartLiveStream(meetingId);
        }
        setIsDisabled(true)
        // recordingStartStop();
      } else if (hlsState === "HLS_PLAYABLE"||hlsState === "HLS_STARTED") {
        setIsDisabled(true)
        hlsStopLiveStream(meetingId)
        // recordingStartStop()
      }
    }
  };
  useEffect(() => {
    if (hlsRef.current) {
      if (hlsState === "HLS_STARTING" || hlsState === "HLS_STOPPING") {
        hlsRef.current.start();
      } else {
        hlsRef.current.stop();
      }
    }
  }, [hlsState]);
console.log('hlsUrls?.downstreamUrl',hlsUrls?.downstreamUrl);

  const renderVideoBlocks = () => {
    if (participantCount > 0) {
    if (localParticipant?.mode === ParticipantMode.VIEWER) {
      if (hlsState === "HLS_PLAYABLE") {
        return (
          <Video
            source={{
              uri: hlsUrls?.downstreamUrl,
            }}
            resizeMode={"cover"}
            style={styles.newStyle}
            fullscreenAutorotate
            fullscreen
            // seek={30}
          />
        );
      } else {
        return <>{renderWaitingScreen()}</>;
      }
    } else {
      return(
    <>
      {Array.from({ length: Math.ceil(speakers.length / perRow) }, (_, i) => {        
        return (
          <View
            key={i}
            style={{
              flex: 1,
              flexDirection: orientation == "PORTRAIT" ? "row" : "column",
            }}
          >
            
            {speakers
              .slice(i * perRow, (i + 1) * perRow)
              .map((item:any,index:number) => {
                return (
                  <LocalViewContainer participantId={item.id} key={item.id}/>
                );
              })}
          </View>
        );
      })}
    </>
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
    console.log("hlsState",hlsState)

  const renderWaitingScreen = () => {
    return (
      <View style={styles.waitingView}>
        <Text style={styles.waitingText}>
          { (hlsState == "HLS_STOPPED" ) ? "Waiting for host to start live stream" : "Meeting has been ended by host" }
        </Text>
      </View>
    );
  };
  console.log('isDisabled',isDisabled);
  const functionHlsButtonName = () => {
    if (hlsState === "HLS_STOPPED") {
      return "Start Live";
    } else if (hlsState === "HLS_PLAYABLE") {
      return "Stop Live";
    } else if (hlsState === "HLS_STARTING") {
      return "Live Starting";
    } else if (hlsState === "HLS_STOPPING") {
      return "Live Stopping";
    } else if (hlsState === "HLS_STARTED") {
      return "Live Starting";
    }
    return "error"
  };
  useEffect(() => {
    if (liveTooltipVisible) {
      setTimeout(() => {
        setLiveTooltipVisible(false)
      }, 2000);
    }
  }, [liveTooltipVisible])
  
  const renderLiveButton = React.useMemo(() => {
    if(loader){
      return <ActivityIndicator size="small"/>
    }else {
      if (hlsState === "HLS_STARTED" ||
      hlsState === "HLS_STARTING" ||
      hlsState==="HLS_STOPPING"||
      (hlsState === "HLS_PLAYABLE")){
        return   <Blink ref={hlsRef} duration={500}>
        <TouchableOpacity
          testID="change-hls-stream"
          onPress={() => {
            changeHlsStream();
          }}
          disabled={hlsState === "HLS_STARTING"||hlsState === "HLS_STOPPING"||isDisabled}
          style={styles.goLive}>
          <Text style={styles.copyText1}>
            {functionHlsButtonName()}
          </Text>
        </TouchableOpacity>
      </Blink>
      }else {
        return    <Tooltip
        isVisible={liveTooltipVisible}
        content={
          <Text>Click here to start live streaming</Text>
        }
        placement="bottom"
        onClose={() => setLiveTooltipVisible(false)}
      >
        <TouchableOpacity
          disabled={hlsState === "HLS_STARTING"||hlsState === "HLS_STOPPING"||isDisabled}
          testID="change-hls-stream"
          onPress={async () => {
            if(hlsState==="HLS_STOPPED"){
              setLiveTooltipVisible(false)
            }
            changeHlsStream();
          }}
          style={styles.goLive1}>
          <Text style={styles.btnText}>
          {functionHlsButtonName()}
          </Text>
        </TouchableOpacity>
      </Tooltip> 
      }
    }
      
  }, [hlsState,loader,isDisabled,liveTooltipVisible]);
  return (
   <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : localParticipant?.mode === ParticipantMode.CONFERENCE ? 'height' : undefined }
    style={styles.keyboardPadding}
    keyboardVerticalOffset={ Platform.OS === 'ios' ? 10 : 40 }
    >
      <>
          <View testID="meetingArea" style={styles.mainView}>

            {localParticipant?.mode === ParticipantMode.CONFERENCE ? (
              <>
              <View>
              <TouchableOpacity
                testID="changewebcambtn"
                onPress={() => changeWebcam()}>
                <Image source={require('../../../../assets/ChangeCamera.png')} style={styles.webcam} />

                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row" }}>
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
            <View style={styles.fleDir}>
                           {renderLiveButton}
                  </View>
           
                  <View style={styles.eyeIconBack}>
                    <Image source={require('../../../../assets/Shape.png')} style={styles.eyeIcon} />
                    <Text style={styles.textLive}>{participantCount}</Text>
                  </View>
                </View>
              </>
              ):(
                <View style={styles.eyeIconBack}>
                    <Image source={require('../../../../assets/Shape.png')} style={styles.eyeIcon} />
                    <Text style={styles.textLive}>{participantCount}</Text>
                  </View>
              )}

            <View>
              <TouchableOpacity
              // disabled={hlsState==="HLS_STARTING"||hlsState==="HLS_STOPPING"}
                  onPress={() => {
                    if (localParticipant?.mode === ParticipantMode.CONFERENCE){
                       end();
                       setLiveTooltipVisible(false)
                       if(loader){
                        navigateWithoutClose()
                       }else{
                         navigateToLivePage();
                       }
                      }
                    else if(localParticipant?.mode === ParticipantMode.VIEWER) {
                      setLiveTooltipVisible(false)
                      if(loader){
                        navigateWithoutClose()
                      }else{
                      navigateToLivePageparticipants();
                      }
                      }
                  moreOptionsMenu?.current && moreOptionsMenu.current.close()
                 }}
                >
             <Text style={styles.btnText}>End</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableWithoutFeedback style={styles.screenSahreContainer} onPress={()=>setgiftModal(false)}>{renderVideoBlocks()}</TouchableWithoutFeedback>
          <ChatViewer
            chatTopic={meeting?.id}
            onPressAddMore={onPressAddMore}
            participantMode={localParticipant?.mode }
            onPressAddMoreGift={onPressAddMoreGift}
            giftModal={giftModal}
            selectedCatalogue={selectedCatalogue}
            sendCoin={sendCoin}
            isCoinSent={isCoinSent}
            setIsCoinSent={setIsCoinSent} 
            selectedCatalogueID={selectedCatalogueID} 
            setSelectedCatalogueID={setSelectedCatalogueID}
            setSelectedCatalogueURL={setSelectedCatalogueURL}
            participantLength={speakers}
            setSelectedCatalogue={setSelectedCatalogue}
            setLottieAnimation={setLottieAnimation}
          />
        </>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 0,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    backgroundColor: "#000",
    flexDirection: 'column'
  },
  imgView: {
    flex: 1,
    position: "relative"
  },
  imageProp: {
    width: 'auto',
    resizeMode: 'cover',
    height: Platform.OS === "ios" ? dimension.height / 1.2 : dimension.height / 1.1,
    borderRadius: 10,
  },
  messageBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // position: "absolute",
    // zIndex: 100,
    justifyContent: "space-evenly",
    bottom: 0


  },
  textInput: {
    height: 50,
    width: dimension.width / 1.5,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
    margin: 10,
    paddingLeft: 10,
    color: "#fff"
  },
  imgText: {
    backgroundColor: "#000",
    borderRadius: 5,
  },
  liveText: {
    color: '#fff',
    paddingLeft: 8,
    paddingRight: 8,
    padding: 5,
    fontSize: 10,
    fontWeight: '600'
  },
  eyeIcon: {
    height: 10,
    width: 10,
  },
  webcam: {
    height: 20,
    width: 20,
    // marginTop:8,
  },
  liveandview: {
    position: "absolute",
    alignSelf: "center",
    // marginTop: 10,
    display: "flex",
    flexDirection: "row"
  },
  eyeIconBack: {
    backgroundColor: "rgba(0,0,0,.7)",
    borderRadius: 5,
    // display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingLeft: 10,
    // paddingRight: 10,
    // marginTop: 6,
    height:30,width:30
  },
  micIcon:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height:30,width:30
  },
  textLive: {
    fontSize: 12,
    color: "white",
  },
  sendIcon: {
    height: 21,
    width: 25
  },
  profileIcon: {
    height: 20,
    width: 25
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
    // marginBottom: deviceBasedDynamicDimension(20, false, 1),
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
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    zIndex: 1,
    justifyContent: "space-evenly",
    marginTop: 20,
    paddingVertical:5
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
     marginTop: 8,
    //  marginBottom: 54,
    zIndex:1,
    height:'92%',
    
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
    borderRadius: 5,
    backgroundColor: "#FF5D5D",

    height:30,
    paddingHorizontal:10,
    justifyContent:"center",
  },
  goLive1: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    borderRadius: 5,
    borderWidth: 1.5,
    backgroundColor: "black",
    width:70,
    height:30,
    justifyContent:'center'
  },
  View: {
    flex: 1,
    justifyContent: "space-between",
  },
  newStyle: {
    flex: 1,
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
});