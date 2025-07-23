import {
  ReactNativeForegroundService,
  useMeeting,
  // @ts-ignore
} from '@videosdk.live/react-native-sdk';
import React, { useEffect, useState } from 'react';
import OneToOneMeetingViewer from './OneToOne/MeetingViewer';
import MeetingViewerlivechallenge1 from './OneToOne/MeetingViewerlivechallenge';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  FlatList,
} from 'react-native';
import WaitingToJoinView from './Components/WaitingToJoinView';
import ParticipantLimitViewer from './OneToOne/ParticipantLimitViewer';
import { ActiveMeetingStream, LiveStream, ParticipantMode } from '../../Types';
interface MeetingContainerProps {
  navigation: any;
  webcamEnabled: boolean;
  meetingType: string;
  fetchSession: (meetingId: string) => void;
  startedRecording: (meetingId: string) => void;
  stopRecording: (meetingId: string) => void;
  stopStream: (meetingId: string) => void;
  hlsStopLiveStream: (meetingId: string) => void;
  hlsStartLiveStream: (meetingId: string) => void;
  startStream: (props: LiveStream) => void;
  hlsActiveLiveStream: (props: ActiveMeetingStream) => void;
  navigateToLivePage: () => void;
  navigateToLivePageparticipants: () => void;
  navigateWithoutClose: () => void;
  statusjoin: () => void;
  statusleave: () => void;
  onPressAddMore: () => void;
  onPressAddMoreGift: () => void;
  selectedCatalogueID: any;
  giftModal: boolean;
  selectedCatalogue: any;
  sendCoin: () => void;
  isCoinSent: boolean;
  setIsCoinSent: (val: boolean) => void;
  setSelectedCatalogueID: (val: any) => void;
  setSelectedCatalogueURL: (val: any) => void;
  setgiftModal: (val: any) => void;
  participantLength: any;
  teamParticipantIds?: { team1: { id: number }[]; team2: { id: number }[] };
  isLiveChallenge: boolean;
  isLive: boolean;
  isClosed: boolean;
  viewheight: number;
  roomId: string;
  setSelectedCatalogue: (val: any) => void;
  getAllViewersCount: (count: any) => void;
  setLottieAnimation: (
    show: boolean,
    url: string,
    audioUrl: string,
    json: string,
    positionTop: number,
    positionLeft: number
  ) => void;
  getOverallData:()=>void;
  modeTypes:any;
}

const MeetingContainer: React.FC<MeetingContainerProps> = ({
  webcamEnabled,
  fetchSession,
  startedRecording,
  onPressAddMore,
  onPressAddMoreGift,
  selectedCatalogueID,
  giftModal,
  selectedCatalogue,
  sendCoin,
  isCoinSent,
  setIsCoinSent,
  setSelectedCatalogueID,
  setSelectedCatalogueURL,
  setgiftModal,
  navigation,
  stopRecording,
  startStream,
  stopStream,
  hlsStartLiveStream,
  hlsStopLiveStream,
  hlsActiveLiveStream,
  navigateToLivePage,
  navigateToLivePageparticipants,
  navigateWithoutClose,
  statusjoin,
  statusleave,
  participantLength,
  teamParticipantIds,
  isLiveChallenge,
  isLive,
  isClosed,
  getOverallData,
  viewheight,
  roomId,
  getAllViewersCount,
  setLottieAnimation,
  setSelectedCatalogue,
  modeTypes
}) => {
  const [isJoined, setJoined] = useState(false);
  const [participantLimit, setParticipantLimit] = useState<boolean>(false);
  let timers: number = 0;

  const { join, changeWebcam, participants, leave } = useMeeting({
    onParticipantLeft: () => {
      if (participants.size < 10000) {
        setParticipantLimit(false);
      }
    },
    onMeetingLeft: () => {
      setTimeout(() => {
        if(modeTypes == ParticipantMode.VIEWER){
         navigateToLivePageparticipants();
        } else {
        navigateToLivePage();
         }
      }, 1000);
      statusleave();
    },
  });

  const onMeetingJoined = async () => {
    timers = Number(
      setTimeout(async () => {
        setJoined(true);
      }, 3000)
    );
    statusjoin();
  };

  useEffect(() => {
    if (isJoined) {
      if (participants.size > 10000) {
        setParticipantLimit(true);
      }
    }
  }, [isJoined]);

  useEffect(() => {
    onMeetingJoined();
    setTimeout(async () => {
      if (!isJoined) {
        await join();

        if (webcamEnabled) {
          changeWebcam();
        }
      }
    }, 500);
    return () => {
      leave();
      ReactNativeForegroundService.stopAll();
      clearTimeout(timers);
    };
  }, []);
  // console.log("navigation.params.navigatefrom==>",navigation.params.navigatefrom);

  return isJoined ? (
    participantLimit ? (
      <ParticipantLimitViewer />
    ) : navigation.params.navigatefrom == 'livechallenge' || isLiveChallenge ? (
      //  <View><Text>{alert("ji")}</Text></View>
      <MeetingViewerlivechallenge1
        fetchSession={fetchSession}
        startedRecording={startedRecording}
        stopRecording={stopRecording}
        navigation={navigation}
        startStream={startStream}
        stopStream={stopStream}
        onPressAddMore={onPressAddMore}
        onPressAddMoreGift={onPressAddMoreGift}
        sendCoin={sendCoin}
        hlsStartLiveStream={hlsStartLiveStream}
        hlsStopLiveStream={hlsStopLiveStream}
        hlsActiveLiveStream={hlsActiveLiveStream}
        navigateToLivePage={navigateToLivePage}
        navigateToLivePageparticipants={navigateToLivePageparticipants}
        giftModal={giftModal}
        isLive={isLive}
        selectedCatalogue={selectedCatalogue}
        getOverallData={getOverallData}
        teamParticipantIds={
          teamParticipantIds ? teamParticipantIds : { team1: [], team2: [] }
        }
        isClosed={isClosed}
        viewheight={viewheight}
        getAllViewersCount={getAllViewersCount}
      />
    ) : (
      <OneToOneMeetingViewer
        fetchSession={fetchSession}
        navigateWithoutClose={navigateWithoutClose}
        startedRecording={startedRecording}
        stopRecording={stopRecording}
        navigation={navigation}
        startStream={startStream}
        stopStream={stopStream}
        onPressAddMore={onPressAddMore}
        onPressAddMoreGift={onPressAddMoreGift}
        selectedCatalogueID={selectedCatalogueID}
        sendCoin={sendCoin}
        isCoinSent={isCoinSent}
        setIsCoinSent={setIsCoinSent}
        setgiftModal={setgiftModal}
        setSelectedCatalogueID={setSelectedCatalogueID}
        modeTypes={modeTypes}
        setSelectedCatalogueURL={setSelectedCatalogueURL}
        setSelectedCatalogue={setSelectedCatalogue}
        hlsStartLiveStream={hlsStartLiveStream}
        hlsStopLiveStream={hlsStopLiveStream}
        navigateToLivePage={navigateToLivePage}
        navigateToLivePageparticipants={navigateToLivePageparticipants}
        giftModal={giftModal}
        selectedCatalogue={selectedCatalogue}
        setLottieAnimation={setLottieAnimation}
      />)
  ) : (
    <WaitingToJoinView />
  );
};

export default React.memo(MeetingContainer);
