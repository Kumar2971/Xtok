import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MicOff, MicOn, VideoOff, VideoOn } from "../../components/icons/Icons";
import Button from "../../components/Button";
import TextInputContainer from "../../components/TextInputContainer";
import BackButton from "../../components/BackButton";
import { ROBOTO_FONTS } from "../../styles/fonts";
import { CreateMeeting, ValidateMeeting } from "../../Types";
import AlertModal from "../../../../../components/src/AlertModal";
interface JoinProps {
  navigation: any;
  createMeeting: (props: CreateMeeting) => void;
  validateMeeting: (props: ValidateMeeting) => void;
  meetingIds: string;
  fetchRecordingFunction: () => void;
}

const JoinComponent: React.FC<JoinProps> = ({
  createMeeting,
  validateMeeting,
  fetchRecordingFunction,
}) => {
  const [micOn, setMicOn] = useState<boolean>(true);
  const [videoOn, setVideoOn] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [meetingId, setMeetingId] = useState<string>("");

  const [isVisibleCreateMeetingContainer, setIsVisibleCreateMeetingContainer] =
    useState(false);
  const [isVisibleJoinMeetingContainer, setIsVisibleJoinMeetingContainer] =
    useState(false);
    const [alertModal, setAlertModal] = useState({openAlertModal:false,alertMsg:""});
  const joinedMeetingFunc = async () => {
    if (name.length <= 0) {
      setAlertModal({openAlertModal:true,alertMsg:"Please enter your name"})
     return;
    }
    createMeeting({ micOn, name, videoOn });
    setName("");
  };

  const joinedMeetingViaCode = async () => {
    if (name.trim().length <= 0) {
      setAlertModal({openAlertModal:true,alertMsg:"Please enter your name"})
     return;
    }

    if (meetingId.trim().length <= 0) {
      setAlertModal({openAlertModal:true,alertMsg:"Please enter meetingId"})
     return;
    }
    validateMeeting({
      micOn,
      name,
      roomId: meetingId,
      videoOn,
    });
    setName("");
    setMeetingId("");
  };

  const videoOnJSX = () => {
    return videoOn ? (
      <VideoOn width={25} height={25} fill={"#000"} />
    ) : (
      <VideoOff
        testID="videoOffBtn"
        width={35}
        height={35}
        fill={"#FFFFFF"}
      />
    );
  };

  const renderJoinViaCodeBlock = () => (
    <>
      <BackButton setLiveStreaming={setIsVisibleJoinMeetingContainer} />
      <TextInputContainer
        testID="username"
        placeholder={"Enter your name"}
        value={name}
        setValue={setName}
      />
      <TextInputContainer
        testID="meetingId"
        placeholder={"Enter meeting code"}
        value={meetingId}
        setValue={setMeetingId}
      />
      <Button
        testID="joinedMeetingViaCodebutton"
        text={"Join a meeting"}
        onPress={() => joinedMeetingViaCode()}
      />
    </>
  );

  const renderJoinViaCreateMeetingBlock = () => (
    <>
      <BackButton setLiveStreaming={setIsVisibleCreateMeetingContainer} />

      <TextInputContainer
        testID="nameTextInput"
        placeholder={"Enter your name"}
        value={name}
        setValue={setName}
      />
      <Button
        testID="join_meeting_btn"
        text={"Join new meeting "}
        onPress={() => joinedMeetingFunc()}
      />
    </>
  );

  const mainRenderBlock = () => (
    <>
      <Button
        testID="createMeetingbtn"
        text={"Create a meeting"}
        onPress={() => {
          setIsVisibleCreateMeetingContainer(true);
        }}
      />
      <Button
        testID="joinviaCode"
        text={"Join a meeting Via code"}
        backgroundColor={"#202427"}
        onPress={() => {
          setIsVisibleJoinMeetingContainer(true);
        }}
      />
      <Button
        testID="fetchAllRecordings"
        onPress={fetchRecordingFunction}
        text="fetch all meetings"
      />
    </>
  );

  const renderAnotherScreens = () => {
    if (isVisibleCreateMeetingContainer) {
      return renderJoinViaCreateMeetingBlock();
    } else if (isVisibleJoinMeetingContainer) {
      return renderJoinViaCodeBlock();
    }
  };
  return ( 
    <> 
     <KeyboardAvoidingView
      behavior={"padding"}
      style={styles.keyAvoidViewContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.mainView}>
            <View style={styles.videoContainer}>
              <View style={styles.videoView}>
                <View style={styles.cameraOff}>
                  <Text style={{ color: "#FFFFFF" }}>
                    CAMERA {!videoOn ? "OFF" : "ON"}
                  </Text>
                  <Text style={styles.texts}>&&</Text>
                  <Text style={styles.texts}>MIC {!micOn ? "OFF" : "ON"}</Text>
                </View>
              </View>

              <View style={styles.micContainer}>
                <TouchableOpacity
                  testID="miconoffbtn"
                  onPress={() => {
                    setMicOn(!micOn);
                  }}
                  style={[
                    styles.Button,
                    { backgroundColor: micOn ? "#FFFFFF" : "red" },
                  ]}>
                  {micOn ? (
                    <MicOn width={25} height={25} fill={"#000"} />
                  ) : (
                    <MicOff
                      testID="micoffbtn"
                      width={25}
                      height={25}
                      fill={"#FFFFFF"}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  testID="videoOnOffbtn"
                  onPress={() => {
                    setVideoOn(!videoOn);
                  }}
                  style={[
                    styles.Button,
                    {
                      backgroundColor: videoOn ? "#FFFFFF" : "red",
                    },
                  ]}>
                  {videoOnJSX()}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.ButtonView}>
            {!isVisibleCreateMeetingContainer &&
              !isVisibleJoinMeetingContainer &&
              mainRenderBlock()}
            {renderAnotherScreens()}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView> 

      <AlertModal  alertModal={alertModal} onPress2={()=>{setAlertModal({openAlertModal:false,alertMsg:""})}}
      btnTitle2={"OK"} />
    </>
   
  );
};
export default JoinComponent;
const styles = StyleSheet.create({
  keyAvoidViewContainer: {
    flex: 1,
    backgroundColor: "#050A0E",
    height: Dimensions.get("window").height,
    margin: 0,
    padding: 0,
  },
  texts: { color: "#FFFFFF", marginTop: 5 },
  container: {
    flex: 1,
    backgroundColor: "#050A0E",
    justifyContent: "space-evenly",
    height: Dimensions.get("window").height,
  },
  mainView: {
    paddingTop: "10%",
    height: Dimensions.get("window").height / 2.5,
  },
  videoContainer: {
    flex: 1,
    width: Dimensions.get("window").width / 2,
    alignSelf: "center",
  },
  videoView: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  rtcView: {
    flex: 1,
    borderRadius: 20,
  },
  cameraOff: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202427",
    marginTop: -10,
  },
  micContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 10,
    right: 0,
    left: 0,
  },
  Button: {
    height: 50,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
  },
  ButtonView: { marginHorizontal: 32 },
  button2: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202427",
    borderRadius: 12,
    marginVertical: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: ROBOTO_FONTS.RobotoBold,
  },
  separator: {
    height: 1,
    backgroundColor: "#404B53",
  },
});
