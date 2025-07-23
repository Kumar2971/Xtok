import React, { createRef } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
  View,
  Modal,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import { deviceHeight, deviceWidth } from "framework/src/Utilities";
import { responsiveWidth } from "react-native-responsive-dimensions";
import VideoSdk, {
  // MeetingConsumer,
  MeetingProvider,
  // @ts-ignore
} from "@videosdk.live/react-native-sdk";
import { SearchBar } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import Scale from "../../../../../components/src/Scale";
import MeetingContainer from "./MeetingContainer";
import MeetingController from "./MeetingController";
import FONTS from "../../../../../components/src/Fonts/Fonts";
import { deviceBasedDynamicDimension } from "../../../../../components/src/Utilities";
import { avatar, cancelIcon } from "../../assets";
import {
  TikTokCoinIcon,
  empty,
  rose,
} from "../../../../CfGroupLive/src/assets";
import Avatar from "../../components/avatar/Avatar.web";
import CustomButton from "../../../../../components/src/Custombutton";
import i18n from "../../../../../components/src/i18n/i18n";
import { Messanger, gift } from "../../../../CfLiveChallenges/src/assets";
import BottomSheet from "reanimated-bottom-sheet";
import AlertModal from "../../../../../components/src/AlertModal";
import { translate } from "../../../../../components/src/i18n/translate";
import Lottie from "lottie-react-native";
import Video from "react-native-video";

let screenWidth = Dimensions.get("window").width;
export default class Meeting extends MeetingController {
  renderSearchResult = (item: any) => {
    return (
      <View style={styles.mainView}>
        <View style={styles.submainView}>
          <View style={styles.followImgView}>
            <Image
              source={
                item?.item?.photo && item?.item?.photo !== null
                  ? { uri: item?.item?.photo }
                  : avatar
              }
              style={styles.profileimg}
              resizeMode="contain"
            />
          </View>
          <View style={styles.nameView}>
            <Text style={styles.nameText}>{item?.item?.user_name}</Text>
            <Text style={styles.descText} numberOfLines={2}>
              {!item?.item?.bio ? translate("noBio") : item?.item?.bio}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.btnContainerStyle,
            item?.item?.isInvited && styles.disableBtnStyle,
          ]}
          onPress={() => {
            this.setState({ selectedInviteData: item?.item }, () => {
              this.inviteParticipant(
                this.props.route?.params?.meetingId,
                item?.item?.id
              );
            });
          }}
          disabled={item?.item?.isInvited}
          testID={"this.props.testID"}
          activeOpacity={item?.item?.isInvited ? 0.3 : 1}
        >
          <View>
            {this.state.selectedInviteData.id == item.item.id ? (
              <ActivityIndicator color={"#fff"} size={"small"} />
            ) : (
              <Text style={[styles.btnTextStyle]}>
                {" "}
                {item?.item?.isInvited ? "Invited" : "Invite"}{" "}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  onPressAddMore = () => {
    this.setState({ invitationModel: true });
  };
  onPressAddMoreGift = () => {
    this.setState({ gitfmodel: true,selectedCatalogue:[] });
  };

  renderCategories = (item: any) => {
    const { selectedTab, indexss } = this.state;
    const id =
      item && item.item && item.item.attributes && item.item.attributes.id;
    const name =
      item && item.item && item.item.attributes && item.item.attributes.name;
    const isActiveTab = id === selectedTab ? true : false;
    return (
      <>
        <View style={{ minHeight: 50 }}></View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[styles.tabbarStyle]}
            disabled={this.state.isCatalogueLoading}
            onPress={() => this.gotoNextTab(id)}
          >
            <Text
              style={[
                styles.tabTextStyle,
                (item?.index == indexss || isActiveTab) && styles.greyText,
              ]}
              numberOfLines={1}
            >
              {name}
            </Text>
          </TouchableOpacity>
          {(item?.index == indexss || isActiveTab) && (
            <View style={styles.activeTab}></View>
          )}
        </View>
      </>
    );
  };

  setSelectedTab = (value: any) => {
    this.setState({ indexss: value });
  };
  renderCatalogue = (data: any) => {
    const url = data && data?.item?.attributes?.image?.url;
    const type = data && data?.item?.attributes?.image?.type;
    const json = data && data?.item?.attributes?.image?.json;
    const coins = data.item?.attributes?.coins || 0;
    let selected = false; 
     if (data?.item?.attributes) {
      if (data?.item?.id == this.state.selectedCatalogueId) {
       selected = true;
      } 
    }
    return data?.item?.attributes ? (
 <TouchableOpacity
        style={[styles.catalogueView, { backgroundColor: (selected) ? "grey" : "white" }]}
        onPress={() => { 
          this.setState({IsSelected:!this.state.IsSelected},()=>{
            this.selectCatalogue(data?.item)
          }) 
         
        }
        }
      >
        <View style={styles.imgView}>
          {url || json ? (
            type === "image" ? (
              <Image source={{ uri: url }} style={[styles.imageStyle]} />
            ) : (
              <Lottie source={json} autoPlay style={styles.imageStyle} />
            )
          ) : (
            <Image source={rose} style={[styles.imageStyle]} />
          )}
        </View>
        <Text style={styles.stickerText} numberOfLines={1}>
          {data.item.attributes.name}
        </Text>
        <Text style={styles.normaltext}>{coins} coins</Text>
      </TouchableOpacity>
    ) : (
      <Text style={[styles.noText]}>{data?.item}</Text>
    );
  };

  onCommentChange = (commentText: string) => {
    if (commentText !== "") {
      this.setState({
        comments: commentText,
      });
    } else {
      this.setState({
        comments: "",
      });
    }
  };

  testcomment = () => {
    let commentText = this.state.comments;
    commentText = commentText.trimStart();
    commentText = commentText.trimEnd();

    let returnvalue = false;
    if (commentText.length === 0) {
      returnvalue = true;
    }
    return returnvalue;
  };

  renderContent = () => {
    return (
      <>
        <View style={styles.flatListContainer}>
          <FlatList
            testID="CategoriesFlatListTest"
            style={styles.flatlist}
            data={this.state.categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={(item: any) => this.renderCategories(item)}
            keyExtractor={(item: any) => item.id}
          />
        </View>

        <View style={styles.deviderLine} />
        <View style={{ marginTop: Scale(5), height: Scale(180) }}>
          <FlatList
            testID="CategoryFlatListTest"
            data={this.state.catalogue}
            numColumns={4}
            renderItem={(data) => this.renderCatalogue(data)}
            keyExtractor={(item: any) => item.id}
            ListEmptyComponent={()=> {
              return <View style={{height:Scale(200),alignItems:'center',justifyContent:'center'}}><ActivityIndicator size={"large"} /></View>
            }}
            contentContainerStyle={{ paddingBottom: Scale(50) }}
          />
        </View>
        <View
          style={{
            bottom: Scale(5),
            left: 0,
            right: 0,
            height: Scale(50),
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 16,
            position: "absolute",
            width: "100%",
            backgroundColor: "#fff",
          }}
        >
          <TouchableOpacity
            testID="testButton6"
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => this.goToRecharge()}
          >
            <Text style={[styles.scoreText]}>Recharge</Text>
            <Text style={[styles.normaltext, { marginLeft: 5 }]}>
              {this.state.coins_count}
            </Text>
          </TouchableOpacity>
        </View>

        {/* </View> */}
      </>
    );
  };

  giftmodel = () => {
    return (
      <View style={styles.giftModalContainer}>
        <View
          style={{
            height: Scale(220),
            width: "100%",
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BottomSheet
            snapPoints={[Scale(220)]}
            borderRadius={10}
            renderContent={this.renderContent}
            enabledGestureInteraction={false}
          />
        </View>
      </View>
    );
  };

  invitationModel = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.invitationModel}
        onRequestClose={() => {
          this.setState({ invitationModel: false });
        }}
      >
        <KeyboardAvoidingView
          behavior={"padding"}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: -250 })}
          style={{ flexGrow: 1, }}
        > 
          <View style={styles.modalContainer}>
            <View style={styles.modalListContainer}>
              <View style={[styles.modalHeader]}>
                {/* empty spacer for equal space in between */}
                <View style={styles.cancelButton} />
                <Text style={styles.headerText}>Invite to Join</Text>
                <TouchableOpacity 
                    onPress={() => {
                      this.setState({
                        invitationModel: false,
                        giftmodel: false,
                      })
                    }}
                  >
                    <Image source={cancelIcon} style={styles.cancelButton} />
                </TouchableOpacity>
              </View>
              <View style={{ minHeight: Scale(300) }}>
                <View style={styles.searchContainer}>
                  <SearchBar
                    platform={'default'}
                    placeholder={"Search"}
                    searchIcon={<AntDesign name="search1" size={20} />}
                    onFocus={() => {}}
                    onChangeText={(text) => {
                      this.getAccountsForAudioRequest({ searchText: text });
                      this.setState({
                        value: text,
                        fresh: false,
                        // loader:true,
                      });
                    }}
                    onSubmitEditing={() => {}}
                    onCancel={() => {}}
                    autoCorrect={false}
                    value={this.state.value}
                    containerStyle={styles.searchContainerStyle}
                    inputContainerStyle={styles.searchInputStyle}
                    inputStyle={this.state.language=="ar" && styles.inputTextRight}
                  />
                </View>

                {this.state.loader && (
                  <View style={[styles.searchContainer, { flex: 1 }]}>
                    <ActivityIndicator size="large" color="black" />
                  </View>
                )}

                {this.state.recentsearch ? (
                  <View style={{ paddingHorizontal: Scale(20) }}>
                    <Text style={styles.normalText}>
                      When someone joins,anyone who can see there live videos
                      can also watch this one
                    </Text>
                    <Text
                      style={[styles.headerText, { marginVertical: Scale(10) }]}
                    >
                      Suggested
                    </Text>
                    <FlatList
                      data={this.state.searchresult}
                      renderItem={(item: any) => this.renderSearchResult(item)}
                      keyExtractor={(item: any) => item.id}
                      extraData={this.state.loader}
                      keyboardShouldPersistTaps="always"
                    />
                  </View>
                ) : !this.state.fresh && this.state.searchresult.length == 0 ? (
                  <View style={[styles.searchContainer, { flex: 1 }]}>
                    <Image source={empty} style={styles.emptyimg} />
                    <Text style={styles.headerText}>
                      No search result found
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    data={this.state.searchresult}
                    renderItem={(item: any) => this.renderSearchResult(item)}
                    keyExtractor={(item: any) => item.id}
                    keyboardShouldPersistTaps="always"
                  />
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  render() {
    const {
      token,
      meetingId,
      micEnabled,
      webcamEnabled,
      name,
      meetingType,
      modeTypes,
      roomId,
    } = this.props.route.params;
    return (
      <>
        <SafeAreaView style={styles.container}>
          {this.invitationModel()}
          <MeetingProvider
            config={{
              meetingId: meetingId,
              micEnabled: micEnabled,
              webcamEnabled: webcamEnabled,
              mode: modeTypes,
              name: name,
              notification: {
                title: "Live Streaming started successfully",
                message: "Meeting is running...",
              },
            }}
            token={token}
          >
              {/* <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({ gitfmodel: false });
                }}
                // style={styles.container}
              >
                <View> */}
                {this.state.lottieAnimation.show &&
                  this.state.lottieAnimation.url && (
                    <View style={styles.fullParent}>
                      <View style={[
                        styles.lottieContainer, {
                        top: this.state.lottieAnimation.positionTop * deviceHeight / 100,
                        left: this.state.lottieAnimation.positionLeft * deviceWidth / 100,
                      }]}>
                        <Lottie
                          source={this.state.lottieAnimation.json}
                          autoPlay
                          style={styles.lottieAnimationStyle}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  )}
                {/* </View>
              </TouchableWithoutFeedback> */}

              {meetingId && (
                <MeetingContainer
                  roomId={roomId}
                  participantLength={0}
                  isLiveChallenge={false}
                  isClosed={true}
                  viewheight={0}
                  getAllViewersCount={()=>{}}
                  getOverallData={()=>{}}
                  isLive={this.state.isLive}
                  navigateWithoutClose={this.navigateWithoutClose}
                  webcamEnabled={webcamEnabled}
                  onPressAddMore={this.onPressAddMore}
                  onPressAddMoreGift={this.openGiftModal}
                  sendCoin={this.sendCoin}
                  meetingType={meetingType}
                  navigation={this.props.route}
                  navigateToLivePage={this.navigateToLivePage}
                  navigateToLivePageparticipants={
                    this.navigateToLivePageparticipants
                  }
                  modeTypes={this.props.route.params.modeTypes}
                  setLottieAnimation={this.setLottieAnimation}
                  fetchSession={this.fetchSession}
                  startedRecording={this.startRecordingFunction}
                  stopRecording={this.stopRecordingFunction}
                  startStream={this.startLiveStreamFunction}
                  stopStream={this.stopLiveStreamFunction}
                  hlsStartLiveStream={this.hlsStartLiveStream}
                  hlsStopLiveStream={this.hlsStopLiveStream}
                  hlsActiveLiveStream={this.hlsActiveLiveStream}
                  setSelectedCatalogue={()=>{
                    this.setState({
                      selectedCatalogue:[]
                    })
                  }}
                  statusjoin={this.statusjoin}
                  statusleave={this.statusleave}
                  giftModal={this.state.gitfmodel}
                  selectedCatalogue={this.state.selectedCatalogue}
                  selectedCatalogueID={this.state.selectedCatalogueId}
                  isCoinSent={this.state.isCoinSent}
                  setIsCoinSent={(val: boolean) => {
                    this.setState({
                      isCoinSent: val,
                    });
                  }}
                  setSelectedCatalogueID={(val: any) => {
                    this.setState({
                      selectedCatalogueId: val,
                    });
                  }}
                  setSelectedCatalogueURL={(val: any) => {
                    this.setState({
                      selectedCatalogueURL: val,
                    });
                  }}
                  setgiftModal={(val: boolean) => {
                    this.setState({
                      gitfmodel: val,
                    });
                  }}
                />
              )}
          </MeetingProvider>
          <AlertModal
            alertModal={this.state.alertModal}
            onPress2={() => {
              this.setState({ alertModal: { openAlertModal: false } });
            }}
            btnTitle2={"OK"}
          />
        </SafeAreaView>
        {this.state.gitfmodel == true && this.giftmodel()}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A0E",
    padding: 12,
  },
  headerText: {
    fontFamily: FONTS.MontserratSemiBold,
    fontSize: Scale(20),
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  normalText: {
    fontFamily: FONTS.MontserratRegular,
    fontSize: Scale(14),
  },
  emptyimg: {
    width: Scale(80),
    height: Scale(80),
  },
  profileimg: {
    width: Scale(40),
    height: Scale(40),
    borderRadius: Scale(100),
  },
  nameText: {
    fontFamily: FONTS.MontserratSemiBold,
    fontSize: Scale(16),
  },
  inputTextRight: {
    textAlign:"right"
  },
  flatlist: {
    flex: 1,
    // borderWidth:1,
    marginHorizontal: Scale(10),
    width: "100%",
    //backgroundColor:"red",
  },
  flatListContainer: {
    height: Scale(40),
    alignSelf: "flex-start",
    marginTop:10
  },
  normaltext: {
    fontFamily: FONTS.MontserratRegular,
    fontSize: Scale(12),
  },
  scoreText: {
    fontFamily: FONTS.MontserratBold,
  },
  nameView: {
    marginLeft: deviceBasedDynamicDimension(20, true, 1),
    width: responsiveWidth(45),
    alignItems: "flex-start",
  },
  imgStyle: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
  },
  descText: {
    fontSize: deviceBasedDynamicDimension(14, true, 1),
  },
  inputFieldContainer: {
    backgroundColor: "white",
    display: "flex",
    // alignItems: "center",
    flexDirection: "row",
    width: "80%",
    borderRadius: 10,
    justifyContent: "space-evenly",
  },
  greyText: {
    color: "#000",
  },
  tabbarStyle: {
    height: Scale(50),
    width: Scale(100),
    justifyContent: "center",
    alignItems: "center",
    marginRight: Scale(10),
  },
  input: {
    width: 180,
  },
  searchContainerStyle: {
    marginTop: 10,
    width: "95%",
    backgroundColor: "transparent",
    padding: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginBottom: deviceBasedDynamicDimension(20, false, 1),
    borderRadius: 0,
    paddingHorizontal: Scale(10),
  },
  searchInputStyle: {
    backgroundColor: "#EEEEEE",
    height: deviceBasedDynamicDimension(45, true, 1),
  },
  subBottomBar: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  imgView: {
    height: 25,
    width: 25,
  },
  imageDimensions4: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  mainView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: deviceBasedDynamicDimension(10, true, 1),
    alignItems: "center",
    marginHorizontal: 10,
  },
  followImgView: {
    height: deviceBasedDynamicDimension(50, false, 1),
    width: deviceBasedDynamicDimension(50, true, 1),
    borderRadius: deviceBasedDynamicDimension(50, true, 1),
  },
  submainView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  lottieAnimationStyle: {
    zIndex: 99,
    margin: 0, 
    padding: 0,
  },
  modalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  modalContainer: {
    flex: 1,
  },
  imageDimensions: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  signinBtnStyle: {
    borderRadius: deviceBasedDynamicDimension(50, false, 1),
    paddingHorizontal: deviceBasedDynamicDimension(20, true, 1),
    paddingVertical: deviceBasedDynamicDimension(7, false, 1),
    alignSelf: "flex-end",
  },
  signInBtn: {
    borderColor: "#FFC925",
    backgroundColor: "#ffffff",
    borderWidth: 1,
  },
  bottomBar: {
    backgroundColor: "black",
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    // flex: 1,
  },
  noText: {
    fontFamily: FONTS.MontserratMedium,
    fontSize: Scale(12),
    color: "grey",
    margin: Scale(20),
    textAlignVertical: "center",
    textAlign: "center",
    width: "100%",
  },
  catalogueView: {
    alignItems: "center",
    width: "25%",
    paddingVertical: Scale(10),
  },
  tabTextStyle: {
    fontFamily: FONTS.MontserratMedium,
    fontSize: Scale(14),
    color: "grey",
    // flexWrap:"wrap"
  },
  profileImage: {
    width: Scale(20),
    height: Scale(20),
    borderRadius: Scale(20),
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    marginLeft: Scale(10),
  },
  activeTab: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#000",
    width: Scale(100),
    height: Scale(5),
    borderRadius: Scale(10),
  },
  modalListContainer: {
    position: "absolute",
    bottom: 0,
    width: screenWidth,
    borderTopRightRadius: Scale(20),
    borderTopLeftRadius: Scale(20),
    backgroundColor: "rgb(255, 255, 255)",
    maxHeight: Scale(500),
  },
  imageStyle: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    zIndex: 100,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Scale(20),
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    // marginVertical: Scale(10),
  },
  modalSubView: {
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: "5%",
    padding: 30,
    borderWidth: 1,
    borderColor: "#FFC925",
  },
  okBtn: {
    height: 50,
    borderRadius: 50,
    backgroundColor: "#FFC925",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  deviderLine: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginTop: 0,
  },
  feedbackText: {
    fontFamily: FONTS.MontserratRegular,
    fontSize: 14,
  },
  audioPlayer: {
    maxHeight: 0,
    maxWidth: 0,
  },
  btnTitleStyle: {
    fontFamily: FONTS.MontserratSemiBold,
    color: "#000",
  },
  btnContainerStyle: {
    backgroundColor: "#FFC925",
    borderRadius: 10,
    width: "32%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  transpernetModalContainer: {
    // backgroundColor: 'rgba(0,0,0,0.7)',
    // height: screenHeight,
    position: "relative",
    width: screenWidth,
    //paddingTop: Scale(200),
    flex: 1,
  },
  disableBtnStyle: {
    opacity: 0.3,
  },
  stickerText: {
    fontFamily: FONTS.MontserratBold,
    fontSize: Scale(10),
  },
  btnTextStyle: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    fontFamily: FONTS.MontserratMedium,
  },
  cancelButton: {
    resizeMode: "contain",
    height: Scale(23),
    width: Scale(23),
    alignSelf: "flex-end"
  },
  lottieContainer: {
    position: "absolute",
    margin: 0,
    padding: 0,
    zIndex: 99,
    height: deviceHeight * 0.2,
    width: deviceWidth * 0.3,
  },
  fullParent: {
    position: 'absolute',
    height: deviceHeight,
    width: deviceWidth,
    zIndex: 99,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  giftModalContainer: {
    paddingTop: 10,
    backgroundColor: 'black'
  }
});
