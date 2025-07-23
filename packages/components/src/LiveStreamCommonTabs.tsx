import { ActivityIndicator, Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import scale from "../../components/src/Scale";
import React from "react";
import { disable, fire, redheart, rightarrow } from "./assets";
import { DynamicDimension } from "../../blocks/AmazonInteractiveVideoService/src/helpers/DynamicDimension";
import { FlatList } from "react-native";
import { avatar, imgGolavi } from "../../blocks/AmazonInteractiveVideoService/src/assets";
import { translate } from "../../components/src/i18n/translate";

type LiveStreamHeaderProps = {
  profileImage: string;
  hostName: string;
  handleFollowButton: () => void;
  followStatus: string | null;
  followButtonLoader: boolean;
  onPressWeeklyRanking: () => void;
}
type BottomButtonsProps = {
  isSingleLive: boolean;
  bottomButtons: any[];
  onButtonPress: (item: any) => void;
  messageData?: any[];
  showMessages: boolean;
  testID: string;
}

type BottomModalProps = {
  isVisible: boolean;
  onClose: () => void;
  data: any;
}

const getFollowButtonStatus = (loader: boolean, status: string) => {
  if (loader) {
    return <ActivityIndicator size="small" color="white" />
  }
  return <Text style={styles.followStatus}>{status}</Text>;
}

const LiveStreamHeader = React.memo(({ profileImage, hostName, followStatus, handleFollowButton, followButtonLoader, onPressWeeklyRanking }: LiveStreamHeaderProps) => {
  return (
    <View style={styles.topDetails}>
      <View>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={profileImage ? { uri: profileImage } : avatar}
          />
          <Text numberOfLines={1} style={[styles.hosterName, styles.hostNameWidth]}>
            {hostName}
          </Text>
          {followStatus ? <TouchableOpacity disabled={followButtonLoader ?? false} onPress={handleFollowButton} style={styles.followButtonStyle}>
            {getFollowButtonStatus(followButtonLoader, followStatus)}
          </TouchableOpacity> : null}
        </View>
        <TouchableOpacity onPress={onPressWeeklyRanking} style={styles.rankingContainer}>
          <View style={styles.rankingBlurView} />
          <Image source={fire} style={styles.fireIcon} />
          <Text style={styles.hosterName}>{translate("Weekly_ranking")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
})

const renderButtons = ({ item }: any, onButtonPress: (item: any) => void, testID: string) => (
  <TouchableOpacity
    // disabled={item?.disable ?? false}
    onPress={() => { onButtonPress(item) }}
    style={{ padding: 10 }}
    testID={testID}
  >
    <Image
      source={item?.icon}
      style={[
        styles.buttonIcon,
        styles.alignCenter,
        { resizeMode: "contain" },
      ]}
    />
    {item?.disable === true && <Image source={disable} style={styles.disableIcon} />}
    {(item?.title === "Enhance" || item?.title === translate("More")) && (
      <View style={styles.oval} />
    )}
    <Text style={styles.buttonName}>{item?.title}</Text>
  </TouchableOpacity>
);
const renderInteractiveMessage = (messageData?: any[]) => {
  if (messageData && messageData?.length > 0) {
    return (
      <FlatList
        style={styles.notifyFlatlist}
        data={messageData}
        bounces={false}
        keyExtractor={(item: any) => item}
        renderItem={({ item }: { item: any }) => {
          return (
            <View style={styles.bottomMsgContainer}>
              <View key={item} style={styles.infoContainer}>
                <Image source={imgGolavi} style={styles.buttonIcon} />
                <Text style={styles.infoTxt}>{item}</Text>
              </View>
            </View>
          )
        }}
      />
    );
  }
  return null;
};

export const LiveStreamBottomTab = React.memo(({ testID, bottomButtons, onButtonPress, messageData, showMessages = false }: BottomButtonsProps) => {
  return (
    <View style={styles.bottomButtonsWrapper}>
      {showMessages && renderInteractiveMessage(messageData)}
      <View style={[styles.buttonsContainer, styles.normalButtonsContainer]}>
        {bottomButtons?.map((item: any, index: number) => renderButtons({ item, index }, onButtonPress, testID))}
      </View>
    </View>
  );
})

export const CommonModalBackground = ({ isVisible, onClose, children }: { isVisible: boolean, onClose: () => void, children: any }) => {
  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.touchablePosition} />
        </TouchableWithoutFeedback>
        <View style={styles.modalSubContainer}>
          <View style={styles.smallLine} />
          {children}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  topDetails: {
    padding: scale(20),
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
    // position:"absolute",
    top: Platform.OS == 'ios' ? scale(10) : 0,
    zIndex: 10001,
  },
  shutDownBgnd: {
    backgroundColor: "blue",
    alignItems: "flex-end",
    marginLeft: scale(10),
    flex: 1
  },
  shutDowIcon: {
    width: scale(30),
    height: scale(30),
    resizeMode: "contain",
    tintColor: "white",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  profileImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
  },
  heartIcon: {
    width: scale(34),
    height: scale(32),
    alignSelf: "center",
    bottom: -5,
  },
  hosterName: {
    color: "#fff",
    paddingStart: scale(5),
    marginHorizontal: scale(5)
    // paddingRight:scale(15),
  },
  hostNameWidth: {
    maxWidth: "45%"
  },
  followButtonStyle: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#FFC925",
    borderRadius: 6,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  followStatus: { color: "black", },
  fireIcon: { width: 20, height: 20, tintColor: "#FFC925" },
  rankingContainer: {
    marginTop: scale(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "45%"
  },
  rankingBlurView: {
    position: "absolute",
    opacity: 0.5,
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    borderRadius: scale(20),
    padding: scale(15),
  },
  buttonName: {
    color: "#fff",
    alignSelf: "center",
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
  alignCenter: {
    alignSelf: "center",
  },
  oval: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#FF4D67",
    position: "absolute",
    alignSelf: "flex-end",
    end: "40%",
    top: "20%",
  },
  followImgView: {
    height: DynamicDimension(50, false, 1),
    width: DynamicDimension(50, true, 1),
    borderRadius: DynamicDimension(50, true, 1),
    borderWidth: 3,
    borderColor: "#FFC925",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomButtonsContainer: {
    // position: "absolute",
    bottom: 5,
    // height: "8%",
  },
  bottomButtonsWrapper: {
    bottom: 10,
    width: "100%",
    padding: 1,
    // paddingTop: 10,
    marginBottom: 0,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  alignEnd: {
    alignSelf: "flex-end",
  },
  secondScreenButtons: {
    width: "100%", paddingHorizontal: 10, justifyContent: "flex-end"
  },
  normalButtonsContainer: {
    width: "100%", justifyContent: "space-around"
  },
  disableIcon: {
    width: scale(10), height: scale(10), alignSelf: "flex-end", position: "absolute", top: "60%", end: "26%"
  },
  smallLine: {
    width: "10%",
    height: scale(5),
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
    marginVertical: scale(10),
    borderRadius: scale(10),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalSubContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: scale(40),
    borderTopRightRadius: scale(40),
  },
  touchablePosition: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "black",
    position: "absolute",
    opacity: 0.5,
  },
  infoContainer: {
    flexDirection: "row",
    marginVertical: scale(10),
  },
  infoTxt: {
    color: "white",
    marginHorizontal: scale(10),
    flex: 1,
    textAlign: "left"
  },
  bottomMsgContainer: {
    padding: scale(10),
    paddingStart: scale(30),
  },
  notifyFlatlist: {
    maxHeight: scale(250),
    position: "absolute",
    bottom: scale(60),
    width: "100%"
  },
  singleLiveView: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    zIndex: 10000
  }
})

export default LiveStreamHeader;