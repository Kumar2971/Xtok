import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  Modal,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import scale from "../../../components/src/Scale";
import { fonts } from "../src/styles/fonts";
import {
  Comments,
  Mutemivro,
  SwitchOff,
  SwitchOn,
  avatar,
  cancelIcon,
  flip,
  gift,
  imgLeftArrow,
  imgRightArrow,
  left,
  micOn,
  person,
  settingsIcon,
  share,
} from "../src/assets";
import {
  screenWidth,
} from "./helpers/DynamicDimension";
import { CalcScale } from "./AmazonInteractiveVideoService";
import {
  CommonModalBackground
} from "../../../components/src/LiveStreamCommonTabs";
import CustomButton from "../../../components/src/Custombutton";
import { translate } from "../../../components/src/i18n/translate";

export const arrowImageLeft = (language: string) => {
  if (language == "ar") {
    return imgRightArrow;
  } else {
    return imgLeftArrow;
  }
}

export const arrowImageLeftStyle = (language: string) => {
  if (language == "ar") {
    return styles.cancelAr;
  } else {
    return styles.cancelEn;
  }
}

export const arrowImage = (language: string) => {
  if (language == "ar") {
    return left;
  } else {
    return imgRightArrow;
  }
}

export const renderSwitchOrArrow1 = (language: string) => {
  return <Image source={arrowImage(language)} style={styles.arrowIcon} />;
}

export const renderSwitchOrArrow3settingView = (item: any) => {
  return <Text style={{
    fontSize: 16, fontFamily: fonts.RobotoRegular,
  }}>{item?.label}</Text>;
}

export const renderSwitchOrArrow2settingView = (item: any) => {
  return <Text>{item?.description}</Text>
}

export const ParticipantsModel: React.FC<{ participantLoader: boolean, isVisible: boolean, participantData: any, onClose: () => void, onSelect: (userId: any) => void }> = React.memo((props) => {
  const { isVisible, participantData, participantLoader, onClose, onSelect } = props;

  const renderParticipants = (item: any) => {
    return (
      <View style={styles.renderParticipantView}>
        <View style={styles.participantUserView}>
          <Image source={item?.item?.attributes?.account?.photo ? { uri: item?.item?.attributes?.account?.photo } : avatar} style={styles.profileimg} />
          <View style={styles.usernameview}>
            <Text numberOfLines={1} style={styles.nameText}>{item?.item?.attributes?.account?.user_name}</Text>
          </View>
        </View>
        <TouchableOpacity
          testID="sendGiftButton"
          style={[styles.btnContainerStyle]}
          onPress={() => {
            onSelect(item?.item?.attributes?.user_id)
          }}>
          <Text style={{}}>{translate("send")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={"slide"}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.transpernetModalContainer}>

        <View style={styles.participantView}>
          <TouchableOpacity testID="crossButton" onPress={onClose} style={styles.crossButton}>
            <Image style={styles.crossImage} source={cancelIcon} />
          </TouchableOpacity>
          <FlatList
            testID="partFlarlist"
            showsVerticalScrollIndicator={false}
            style={styles.participantFlatlist}
            contentContainerStyle={{ paddingBottom: 20 }}
            data={participantData}
            renderItem={(item: any) => renderParticipants(item)}
            ListEmptyComponent={() => {
              return <View style={styles.emptyModelView}>
                {participantLoader ? <ActivityIndicator testID="participantLoader" color={"black"} size={"small"} /> : <Text testID="noPart">{translate("No_participant_joined_yet")}</Text>}
              </View>
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

export const CancleMatchModal: React.FC<{ cancelMatchModal: boolean, handlecancelMatchModal: () => void, cancelMatchAction: () => void }> = React.memo((props) => {
  const { cancelMatchModal, handlecancelMatchModal, cancelMatchAction } = props;
  return (
    <CommonModalBackground isVisible={cancelMatchModal} onClose={handlecancelMatchModal}>
      <Text style={styles.cancleLive}>Cancel LIVE Match?</Text>
      <View style={styles.seperator} />
      <View style={styles.modalBtnContainer}>
        <TouchableOpacity
          onPress={handlecancelMatchModal}
          style={styles.goBackBgnd}
        >
          <Text style={styles.goBackTxt}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={cancelMatchAction}
          style={[styles.goBackBgnd, styles.cancelBtnBgnd]}
        >
          <Text style={styles.goBackTxt}>Cancel Match</Text>
        </TouchableOpacity>
      </View>
    </CommonModalBackground>
  );
});

export const ChallengeDurationPopup: React.FC<{ isVisible: boolean, onClose: () => void, onSelect: (minute: number) => void }> = React.memo((props) => {
  const { isVisible, onClose, onSelect } = props;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.challangeModalListContainer}>
          <View style={styles.chalangePopupHeader}>
            <Text style={styles.challangeheaderText}>{translate("Select_Challenge_Duration")}</Text>
            <TouchableOpacity
              testID="closeDurationModel"
              style={styles.crossImage}
              onPress={onClose}>
              <Image style={styles.crossImage} source={cancelIcon} />

            </TouchableOpacity>

          </View>
          <View style={{ borderWidth: 0.5, backgroundColor: "#aaa" }}></View>
          <View>
            <View style={styles.liveChallenge}>

              <ImageBackground source={require('../assets/BG.png')} imageStyle={{ borderRadius: 8 }} style={styles.ChallengeBackgroud}>

                <Text style={styles.cardVersus}>5 min</Text>
                <View style={styles.ChallengeStart}>
                  <CustomButton isLoader={false} testID="btn1" title={translate("start")} style={{ borderRadius: 10, }} TextStyle={{ color: "black" }} onPress={() => onSelect(5)} />
                </View>

              </ImageBackground>

              <ImageBackground source={require('../assets/BG-1.png')} imageStyle={{ borderRadius: 8 }} style={styles.ChallengeBackgroud}>

                <Text style={styles.cardVersus}>10 min</Text>
                <View style={styles.ChallengeStart}>
                  <View style={styles.challengetwo}>
                  </View>
                  <CustomButton isLoader={false} testID="btn2" title={translate("start")} style={{ borderRadius: 10, }} TextStyle={{ color: "black" }} onPress={() => onSelect(10)} />
                  <View style={styles.challengetwo}>
                  </View>
                </View>

              </ImageBackground>
              <ImageBackground source={require('../assets/BG-2.png')} imageStyle={{ borderRadius: 8 }} style={styles.ChallengeBackgroud}>

                <Text style={styles.cardVersus}>15 min</Text>
                <View style={styles.ChallengeStart}>
                  <View style={styles.challengetwo}>
                  </View>
                  <CustomButton isLoader={false} testID="btn3" title={translate("start")} style={{ borderRadius: 10, }} TextStyle={{ color: "black" }} onPress={() => onSelect(15)} />
                  <View style={styles.challengetwo}>
                  </View>
                </View>

              </ImageBackground>
            </View>

          </View>
        </View>
      </View>
    </Modal >
  );
});

export const CommentSettingsModel: React.FC<{ allowComments: boolean, language: string, selectedmutelable: any, isVisible: boolean, onMute: () => void, openCommentModal: () => void, closeCommentSetting: () => void, updateComment: () => void }> = React.memo((props) => {
  const { isVisible, allowComments, selectedmutelable, language, openCommentModal, closeCommentSetting, updateComment, onMute } = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}>
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: -250 })}
        style={{ flexGrow: 1 }}>

        <TouchableWithoutFeedback onPress={openCommentModal}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalListContainer, Platform.OS === "ios" && styles.iosBottomSpace]}>
              <View style={[styles.modalHeader2]}>
                <TouchableOpacity
                  testID="closeCommentSetting"
                  onPress={closeCommentSetting}
                >
                  <Image source={arrowImageLeft(language)} style={[styles.cancelButton2, arrowImageLeftStyle(language)]} />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                  {translate("Comment_Settings")}
                </Text>
                <TouchableOpacity
                  testID="closeInvitation">
                  <Image source={person} style={[styles.plusicon, { tintColor: 'white' }]} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity testID="allowComment" style={[styles.commentView, { marginTop: 8 }]}
                onPress={updateComment}>
                <Text style={styles.commentTitleStyle}>{translate("Allow_Comments")}</Text>
                {!allowComments ?
                  <Image style={{ width: scale(28), height: scale(28), resizeMode: 'contain', alignSelf: 'center' }} source={SwitchOff} /> :
                  <Image style={{ width: scale(28), height: scale(28), resizeMode: 'contain', alignSelf: 'center' }} source={SwitchOn} />}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
});

export const SettingsViewModal: React.FC<{ language: string, isVisible: boolean, handleMutedaccountlist: () => void, handleModerater: () => void, handleComment: () => void, goBackFromSetting: () => void, onClose: () => void, }> = React.memo((props) => {

  const { isVisible, language, onClose, goBackFromSetting, handleComment, handleModerater, handleMutedaccountlist } = props;

  const settingsViewData = [
    { label: translate("Comment_Settings"), icon: null, onpress: handleComment },
    { label: translate("Moderators"), icon: null, onpress: handleModerater },
    {
      label: translate("Muted_Accounts"), icon: null, onpress: handleMutedaccountlist,
      description: translate("setting_desc")
    }]

  return (
    <Modal
      transparent animationType="slide"
      visible={isVisible}>
      <TouchableOpacity
        testID="addParticipant2"
        onPress={onClose} style={{ flex: 1 }}>
      </TouchableOpacity>
      <View style={styles.modalContainer}>
        <View style={[styles.modalListContainer, Platform.OS === "ios" && styles.iosBottomSpace]}>
          <View style={[styles.modalHeader2]}>
            <TouchableOpacity
              testID="closeInvitation2"
              onPress={goBackFromSetting}>
              <Image source={arrowImageLeft(language)} style={[styles.cancelButton2, arrowImageLeftStyle(language)]} />
            </TouchableOpacity>
            <Text style={styles.headerText}>
              {translate("settings")}
            </Text>
            <TouchableOpacity
              testID="closeInvitation">
              <Image source={person} style={[styles.plusicon, { tintColor: 'white' }]} />
            </TouchableOpacity>
          </View>
          {settingsViewData.map((item: any, index: number) => (
            <TouchableOpacity onPress={item.onpress} key={index}>
              <TouchableOpacity onPress={item.onpress} key={index} style={styles.settingsBgnd1}>
                <View style={styles.buttonsContainer}>
                  {renderSwitchOrArrow3settingView(item)}
                </View>
                {renderSwitchOrArrow1(language)}
              </TouchableOpacity>
              <TouchableOpacity onPress={item.onpress} key={index} style={styles.settingsBgnd2}>
                <View style={styles.buttonsContainer}>
                  {renderSwitchOrArrow2settingView(item)}
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  )
})

export const SettingsModal: React.FC<{ flipCamera: boolean, isMute: boolean, isVisible: boolean, language: string, handleGift: () => void, handleComment: () => void, handleSettingviewmodel: () => void, handleMicrophone: () => void, handleSettinsModal: () => void, handleFlipCamera: () => void, handleShare: () => void }> = React.memo((props) => {
  const { isVisible, language, isMute, flipCamera, handleSettinsModal, handleGift, handleComment, handleFlipCamera, handleMicrophone, handleSettingviewmodel, handleShare } = props;

  const settingsData = [{ label: translate("Flip_Camera"), icon: flip, onpress: handleFlipCamera },
  { label: translate("MuteMicrophone"), icon: Mutemivro, onpress: handleMicrophone },
  { label: translate("settings"), icon: settingsIcon, onpress: handleSettingviewmodel },
  { label: translate("comments"), icon: Comments, onpress: handleComment },
  { label: translate("Gifts"), icon: gift, onpress: handleGift },
  { label: translate("share"), icon: share, onpress: handleShare },
  ];

  const renderSwitchOrArrow2 = (item: any) => {
    const index = settingsData.indexOf(item);
    if (index === 1) {
      return <Image source={isMute == true ? item.icon : micOn} style={styles.optionIcon} />
    }
    return <Image source={item.icon} style={styles.optionIcon} />;
  }

  const renderSwitchOrArrow3 = (item: any) => {
    const index = settingsData.indexOf(item);
    if (index === 1) {
      return <Text>{isMute == translate("Mute") ? translate("unMuteMicrophone") : item.label}</Text>;
    }
    return <Text>{item.label}</Text>;
  }

  const renderSwitchOrArrow = (item: any) => {
    const index = settingsData.indexOf(item);
    if (index === 0) {
      return <Image source={(flipCamera == true) ? SwitchOn : SwitchOff} style={styles.switchIcon1} />;
    } else if (index === 1) {
      return <Image source={(isMute === true) ? SwitchOn : SwitchOff} style={styles.switchIcon1} />;
    } else if (index === 5) {
      return null;
    }
    return <Image source={arrowImage(language)} style={styles.arrowIcon} />;
  }

  return (
    <CommonModalBackground onClose={handleSettinsModal} isVisible={isVisible}>
      <View style={styles.setingsContainer}>
        {settingsData.map((item: any, index: number) => (
          <TouchableOpacity onPress={item.onpress} key={index} style={styles.settingsBgnd}>
            <View style={styles.buttonsContainer}>
              {renderSwitchOrArrow2(item)}
              {renderSwitchOrArrow3(item)}
            </View>
            {renderSwitchOrArrow(item)}
          </TouchableOpacity>))}
      </View>
    </CommonModalBackground>
  )
})

export const Scorebar: React.FC<{ scoreTeam1: number, scoreTeam2: number }> = React.memo((props) => {
  const { scoreTeam1, scoreTeam2 } = props;

  const score1 = Number(scoreTeam1);
  const score2 = Number(scoreTeam2);
  let total = score1 + score2;
  let team1scorepercentage = Math.round((score1 / total) * 100);
  if (total == 0) {
    team1scorepercentage = 50;
  }

  return (
    <View>
      <View style={{ justifyContent: "center" }}>
        <View
          style={styles.scoreBarStyle} />
        <View testID="teamAScorebar"
          style={[styles.teamAView, {
            width: team1scorepercentage ? `${team1scorepercentage}%` : 0,
          }]}>
          <Text testID="score1" style={[styles.scoreText, { paddingLeft: 10 }]}>
            {Math.round((score1 + Number.EPSILON) * 100) / 100}
          </Text>
          <View style={styles.centerLine} />
        </View>
        <View style={styles.teamBView}>
          <Text testID="score2"
            style={[styles.scoreText, { color: "white", paddingRight: 10 }]}>
            {Math.round((score2 + Number.EPSILON) * 100) / 100}
          </Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  modalContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  centerLine: {
    width: 2,
    height: 20,
    backgroundColor: "white"
  },
  teamAView: {
    height: 20,
    backgroundColor: "#F85961",
    position: "absolute",
    justifyContent: "space-between",
    flexDirection: "row",
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  teamBView: {
    position: "absolute",
    right: 5
  },
  scoreText: {
    fontFamily: fonts.MontserratBold
  },
  scoreBarStyle: {
    width: "100%",
    height: 20,
    borderColor: "black",
    backgroundColor: 'blue',
    borderTopWidth: 1
  },
  settingsBgnd1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(15),
  },
  optionIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: "black",
    marginRight: scale(10),
    resizeMode: "contain"
  },
  switchIcon1: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
  },
  settingsBgnd: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(15),
    paddingVertical: scale(10)
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsBgnd2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(15),
    paddingBottom: scale(15),
  },
  commentTitleStyle: {
    alignSelf: 'baseline',
    flex: 1,
    fontFamily: fonts.RobotoRegular,
    fontSize: scale(18),
    textAlign: "left",
  },
  cancelButton2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentView: {
    padding: 8,
    flexDirection: 'row',
    marginHorizontal: 12
  },
  plusicon: {
    resizeMode: "contain",
    height: CalcScale(23),
    width: CalcScale(23),
    alignSelf: "flex-end",
    tintColor: "black",
    marginRight: 10,
  },
  setingsContainer: {
    paddingBottom: scale(30),
  },
  iosBottomSpace: {
    paddingBottom: CalcScale(30)
  },
  arrowIcon: {
    width: scale(15),
    height: scale(15),
    resizeMode: "contain"
  },
  modalListContainer: {
    bottom: 0,
    position: "absolute",
    borderTopRightRadius: CalcScale(20),
    width: screenWidth,
    borderTopLeftRadius: CalcScale(20),
    maxHeight: CalcScale(500),
    backgroundColor: "rgb(255, 255, 255)",
  },
  challangeheaderText: {
    fontFamily: fonts.MontserratBold,
    fontSize: scale(20),
    textAlign: 'center',
    width: '90%'
  },
  ChallengeBackgroud: {
    resizeMode: "cover",
    width: screenWidth * 0.9,
    alignSelf: "center",
    marginTop: 15,
    padding: 12
  },
  cancelEn: {
    width: scale(25),
    height: scale(25),
  },
  modalHeader2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: CalcScale(20),
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  challengetwo: {
    display: "flex",
    flexDirection: "row",
  },
  headerText: {
    fontSize: CalcScale(20),
    paddingHorizontal: 15,
  },
  liveChallenge: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20
  },
  nameText: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: CalcScale(16),
  },
  cardVersus: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 17,
    fontFamily: fonts.MontserratSemiBold
  },
  ChallengeStart: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 11,
    margin: 5
  },
  usernameview: {
    marginLeft: scale(10), alignItems: 'flex-start', justifyContent: 'center', flex: 1
  },
  profileimg: {
    width: CalcScale(40),
    height: CalcScale(40),
    borderRadius: CalcScale(100),
  },
  btnContainerStyle: {
    borderRadius: 10,
    backgroundColor: "#FFC925",
    height: 35,
    width: "32%",
    alignItems: "center",
    justifyContent: "center",
  },
  renderParticipantView: {
    height: scale(40),
    width: '90%',
    alignSelf: 'center',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row'
  },
  participantUserView: {
    flexDirection: "row",
    justifyContent: 'center',
    flex: 1,
    marginRight: 10
  },
  emptyModelView: {
    justifyContent: "center",
    alignItems: "center"
  },
  participantFlatlist: {
    paddingTop: 15,
    marginBottom: 20,
    marginTop: 30,
  },
  challangeModalListContainer: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    backgroundColor: 'rgb(255, 255, 255)',
    maxHeight: scale(800),
    fontWeight: "800"
  },
  transpernetModalContainer: {
    position: 'relative',
    width: screenWidth,
    flex: 1
  },
  cancelAr: {
    width: scale(20),
    height: scale(20),
  },
  crossImage: {
    resizeMode: "contain",
    height: scale(23),
    width: scale(23),
  },
  crossButton: {
    top: 5,
    right: 20,
    position: 'absolute'
  },
  chalangePopupHeader: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: scale(20),
    paddingBottom: scale(20),
    width: screenWidth,
  },
  participantView: {
    position: "absolute",
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
    maxHeight: 500,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15
  },
  marginTop: { marginTop: 0 },
  goBackBgnd: {
    backgroundColor: "#D7D7D7",
    padding: scale(10),
    borderRadius: 8,
    paddingHorizontal: scale(35),
    marginEnd: scale(15),
  },
  goBackTxt: { color: "black", fontSize: 14, fontWeight: "bold" },
  cancelBtnBgnd: { paddingHorizontal: scale(10), backgroundColor: "#FFC925" },
  cancleLive: { textAlign: "center", fontSize: 20, color: "black" },
  seperator: {
    width: "100%",
    height: scale(1),
    backgroundColor: "#979797",
    marginVertical: scale(10),
  },
  modalBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: scale(30),
    paddingBottom: scale(30),
  },
});
