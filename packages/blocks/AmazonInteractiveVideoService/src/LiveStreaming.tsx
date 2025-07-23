import React from "react";
// Customizable Area Start
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
  TextInput,
  Dimensions,
  findNodeHandle,
} from "react-native";
import scale from "../../../components/src/Scale";
const _ = require('lodash');
import { Props } from "./LiveStreamingController";
import { fonts } from "../src/styles/fonts";
import { avatar, bluebackground, cancelIcon, shutDown, plus, video, left, heartbeat, heartburst, hands, userFill, rightarrow } from "../src/assets";

import { responsiveWidth } from "react-native-responsive-dimensions";
import {
  DynamicDimension,
  screenHeight,
  screenWidth,
} from "./helpers/DynamicDimension";
import Lottie from 'lottie-react-native';
import { translate } from "../../../components/src/i18n/translate";

import LiveStreamingController from "./LiveStreamingController";
import { CalcScale } from "./AmazonInteractiveVideoService";
import LiveStreamHeader, {
  CommonModalBackground,
  LiveStreamBottomTab,
} from "../../../components/src/LiveStreamCommonTabs";
import AlertModal from "../../../components/src/AlertModal";
import CommentIVS from "./CommentIVS";
import Scale from "../../../components/src/Scale";
import FONTS from "../../../components/src/Fonts/Fonts";
import { CancleMatchModal, ChallengeDurationPopup, CommentSettingsModel, ParticipantsModel, Scorebar, SettingsModal, SettingsViewModal } from "./CombinedLiveStream";
import InviteView from "./InviteView";
import GiftModel from "./GiftModel";
import ModeratorView from "./ModeratorView";
import MuteViews from "./MuteViews";
import ReportModal from "./ReportModal";
import { StreamView } from "./StreamView";
import ZegoExpressEngine, { ZegoTextureView } from "zego-express-engine-reactnative";

export const MemoizedInviteView = React.memo(InviteView);
export const MemoizedMuteView = React.memo(MuteViews);
export const MemoizedGiftModel = React.memo(GiftModel);
export const MemoizedModeratorView = React.memo(ModeratorView);
export const MemoizedAlertModal = React.memo(AlertModal);
export const MemoizedReportModal = React.memo(ReportModal);

let displayHeight = Dimensions.get('window').height;

// Customizable Area End
export default class LiveStreaming extends LiveStreamingController {
  notifyMessage = [
    translate("welcome_text"),
    translate("notify")
  ];
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }



  // Customizable Area Start

  notifyMessage2 = [
    translate("privateLive_welcome"),
    translate("privateLive_notify")
  ];

  selectTeamMember = ({ item, index }: { item: any, index: number }) => {
    return (
      <TouchableOpacity testID="selectTeam" onPress={() => {
        let invitedUserDeepCopy = _.cloneDeep(this.state.invitedUserList)
        let temp = [...invitedUserDeepCopy]
        temp[index] = { ...invitedUserDeepCopy[index], isSelected: !invitedUserDeepCopy[index].isSelected }
        this.setState({ invitedUserList: temp })
        if ((temp.length / 2) == 1 ||
          (temp.length / 2) == 2
          || (temp.length / 2) == 3) {

          if (!temp[index].isSelected) {
            this.setSelectedUserList()
            return
          }

          if (this.state.myTeamMemberList.length != (temp.length / 2)) {
            if (temp[index].isSelected) {
              this.state.myTeamMemberList.push(item)
              this.myTeamIdList.push(parseInt(item.id))
            } else {
              this.setSelectedUserList()
            }
          }

          if (this.state.myTeamMemberList.length == (temp.length / 2)) {
            let newInvitedList: any = []
            temp.forEach((element: any) => {
              let newElement = element;
              if (element.isSelected == false) {
                newElement = { ...newElement, isSelected: true }
                this.state.opponentTeamList.push(newElement)
                this.opponentTeamIdList.push(parseInt(newElement.id))
              }
              newInvitedList.push(newElement)
            });
            this.setState({ invitedUserList: newInvitedList })
          }
        } else {
          this.setSelectedUserList()
        }
      }}

        style={[styles.teamMemberSelection, { borderColor: item.isSelected == true ? (this.myTeamIdList.includes(parseInt(item.id)) ? '#FEC925' : '#FF4D67') : '#f9f9f9' }]}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image style={styles.avatarStyle} source={item.photo ? { uri: item.photo } : avatar} />
          <Text style={{ fontSize: 15, fontWeight: '600', marginTop: 5 }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  blockKeywordsModel = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isBlockKeywordModalVisible}>
        <View style={styles.teamPopUpmodalContainer}>
          <View style={styles.teamPopUpmodalListContainer}>
            <View style={styles.teamPopUpmodalHeader}>
              <TouchableOpacity testID="closeBlockKeywordModal" style={{ flexDirection: 'row', alignContent: 'center' }}
                onPress={() => this.setState({ isBlockKeywordModalVisible: false })}
              >
                <Image style={styles.backArrow} source={this.exploreArrowImg()} />
                <Text style={styles.commentHeader}>{translate("Block_Keyword")}</Text>
              </TouchableOpacity>
              <View style={styles.divider}></View>
              <View>
                <View style={styles.commentView}>
                  <Text style={[styles.commentTitleStyle, { padding: 8 }]}>{translate("Keyword")}(0/500)</Text>
                  <Image style={{ width: 12, height: 12, alignSelf: 'center' }} source={this.exploreArrowImg()} />
                </View>
                <View style={styles.divider}></View>
                <TextInput
                  testID="blockKeyword"
                  placeholder={translate("Keyword_can_be_up_to_30_characters")}
                  maxLength={30}
                  numberOfLines={2}
                  onChangeText={txt => this.setState({ blockKeyword: txt })}
                  style={styles.blockKeywordStyle} />
                <View style={{ width: '100%', height: 1, backgroundColor: 'grey', marginBottom: 4 }}></View>

              </View>
            </View>
          </View>
        </View>
      </Modal >
    );
  };

  teamSelectionModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isTeamMateModalVisible}>
        <View style={styles.teamPopUpmodalContainer}>
          <View style={styles.teamPopUpmodalListContainer}>
            <View style={styles.teamPopUpmodalHeader}>
              <Text testID="selectTeamHeading" style={styles.teamPopUpheaderText}>{translate("Select_your_teammates")}</Text>
              <View>
                <View style={[styles.profileLogo, { alignItems: 'center', justifyContent: 'center', height: 100, width: 100, borderRadius: 50, backgroundColor: '#FFC925' }]}>
                  <Image style={[styles.profileLogo, { width: 60, height: 60 }]} source={hands} />
                </View>
                <View style={styles.teamPopUpselectedUser}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flex: 1, overflow: 'hidden', marginLeft: 5 }}>
                    {this.state.myTeamMemberList.map((item: any) => {
                      return <View style={{
                        margin: 2,
                      }}>
                        <Image style={{
                          height: 40, width: 40, borderWidth: 2,
                          borderColor: item.role == 'host' ? '#FEC925' : '#F84954', borderRadius: 20
                        }} source={item.photo ? { uri: item.photo } : avatar} />
                      </View>
                    })}
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1, marginRight: 5 }}>
                    {this.state.opponentTeamList.map((item: any) => {
                      return <View style={{
                        margin: 2,
                      }}>
                        <Image style={{
                          height: 40, width: 40, borderWidth: 2,
                          borderColor: item.role == 'host' ? '#FEC925' : '#F84954', borderRadius: 20
                        }} source={item.photo ? { uri: item.photo } : avatar} />
                      </View>
                    })}
                  </View>
                </View>
              </View>
              <FlatList
                testID="teamList"
                showsHorizontalScrollIndicator={false}
                data={this.state.invitedUserList}
                horizontal={true}
                renderItem={this.selectTeamMember}
                scrollEnabled={true}
                keyExtractor={(item: any) => `${item.id}`}
              />
            </View>
            <TouchableOpacity testID="getStarted" onPress={() => {
              const mergedAlternatingArr = [...this.myTeamIdList, ...this.opponentTeamIdList]
              let newTeam1 = this.myTeamIdList.map((item) => `${item}`)
              let newTeam2 = this.opponentTeamIdList.map((item) => `${item}`)
              if (this.state.myTeamMemberList.length == this.state.opponentTeamList.length) {
                if (mergedAlternatingArr.length == this.state.invitedUserList.length) {
                  this.setState({ challengeTeams: { teamA: newTeam1, teamB: newTeam2 }, isTeamMateModalVisible: false, teamIdForNative: mergedAlternatingArr }, () => {
                    this.teamSelectionApiCall();
                  })
                }
              }
            }} style={styles.getStartedBG}>
              <Text style={styles.getStart}>{translate("get_started")}</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal >
    );
  };

  viewViewreModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.viewViewreModal}
      >
        <View style={[styles.modalContainer, { alignItems: 'flex-end', justifyContent: 'flex-end' }]}>
          <View style={styles.profileDataModel}>
            <View style={{ alignItems: 'flex-end', marginTop: 5 }}>
              <TouchableOpacity
                style={{ marginRight: 20, marginTop: 10 }}
                testID="closeInvitation3"
                onPress={() =>
                  this.setState({ viewViewreModal: false, selectedGridUserData: null })
                }
              >
                <Image source={cancelIcon} style={styles.cancelButton} />
              </TouchableOpacity>
            </View>
            {this.renderviewuserdata()}
          </View>
        </View>
      </Modal>
    );
  };

  viewProfileModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.viewProfileModal}
      >
        <View style={[styles.modalContainer, { alignItems: 'flex-end', justifyContent: 'flex-end' }]}>
          <View style={styles.profileDataModel}>
            <View style={{ alignItems: 'flex-end', marginTop: 5 }}>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                testID="closeInvitation4"
                onPress={() =>
                  this.setState({ viewProfileModal: false, selectedGridUserData: null })
                }>
                <Image source={cancelIcon} style={styles.cancelButton} />
              </TouchableOpacity>
            </View>
            {this.renderprofiledata()}
          </View>
        </View>
      </Modal>
    );
  };

  renderprofiledata = () => {
    const { selectedGridUserData } = this.state;
    let user = selectedGridUserData?.attributes
    let isFollowing = (user?.followings_status === 'following' || user?.followings_status === 'requested')
    return (
      <View testID="renderprofiledata">
        <View style={styles.profileMainView}>
          <View style={styles.submainView}>
            <View style={styles.followImgView1}>
              <Image
                source={user?.photo ? { uri: user?.photo } : avatar}
                style={styles.profileimg1}
                resizeMode="contain"
              />
              {/* {item?.live_status === "LIVE" && <View style={styles.onlineSymbol} />} */}
            </View>
            <View style={styles.nameView}>
              <Text testID="user_name" style={styles.nameText1}>{user?.user_name}</Text>
              <Text style={[styles.descText, this.state.language == "ar" && { textAlign: "left" }]} numberOfLines={2} >
                {user?.bio ? user.bio : translate("noBio")}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.mainView2}>
          <Text style={[styles.descText, { fontWeight: 'bold' }]} numberOfLines={2}>
            {user?.followers_count ?? 0} {translate("followers")}
          </Text>
          <Text style={[styles.descText, { fontWeight: 'bold', color: 'white' }]} numberOfLines={2}>
            -
          </Text>
          <Text style={[styles.descText, { fontWeight: 'bold' }]} numberOfLines={2}>
            {user?.followings_count ?? 0} {translate("Followings")}
          </Text>
        </View>
        <View style={styles.mainView3}>

          <TouchableOpacity testID="selectedGrid" onPress={() => {
            this.setState({ selectedChallengeUserId: this.state.selectedGridId, selectedGridUserData: null, viewProfileModal: false }, () => {
              this.getSelectedUserData(this.state.selectedGridId, false);
              if (this.state.isLiveChallenge) {
                this.getParticipant()
              }
            })
          }} style={{ height: 40, width: "50%", backgroundColor: 'rgb(215,215,215)', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderRadius: 5 }}>
            <Image
              source={video}
              style={styles.profileimg2}
              resizeMode="contain"
            />
            <Text style={styles.descText1}>{translate("Watch_LIVE")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="followButton"
            disabled={this.state.userFollowButtonLoader}
            onPress={() => this.callFollowUnfollowApi(isFollowing, selectedGridUserData?.id)} style={{ marginHorizontal: 20, height: 40, width: "50%", backgroundColor: isFollowing ? '#FFD74C' : '#FFC925', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderRadius: 5 }}>
            {this.renderPlusImage(isFollowing)}
            {this.renderFollowButtonText(user?.followings_status)}
            {this.state.userFollowButtonLoader &&
              <View style={styles.streamingContainer}>
                <ActivityIndicator testID="userFollowButtonLoader" color={"#fff"} size={"small"} />
              </View>
            }
          </TouchableOpacity>

        </View>
      </View>

    );
  };
  renderviewuserdata = () => {
    const { selectedGridUserData } = this.state;
    let user = selectedGridUserData?.attributes
    let isFollowing = (user?.followings_status === 'following' || user?.followings_status === 'requested')
    return (
      <View testID="renderviewuserdata">
        <View style={styles.profileMainView2}>
          <View style={styles.submainView}>
            <View style={styles.followImgView1}>
              <Image
                source={user?.photo ? { uri: user?.photo } : avatar}
                style={styles.profileimg1}
                resizeMode="contain"
              />
              {/* {item?.live_status === "LIVE" && <View style={styles.onlineSymbol} />} */}
            </View>
            <View style={styles.nameView}>
              <Text testID="user_name2" style={styles.nameText1}>{user?.user_name}</Text>
              <Text style={[styles.descText, this.state.language == "ar" && { textAlign: "left" }]} numberOfLines={2}>
                {user?.bio ? user.bio : translate("noBio")}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            testID="handelmangeview"
            onPress={() => {
              this.handelmangeview(selectedGridUserData?.attributes?.is_stage_mute_user, selectedGridUserData?.attributes?.is_moderator)
            }
            }>
            {(selectedGridUserData?.id != this.state.current_user_id) && (selectedGridUserData?.id != this.state.hostId) ?

              <Text

                style={{ fontSize: 18, marginRight: 10 }}

              > {translate("Manage")}
              </Text> : null}
          </TouchableOpacity>

        </View>
        <View style={styles.mainView4}>
          <Text style={[styles.descText, { fontWeight: 'bold' }]} numberOfLines={2}>
            {user?.followers_count ?? 0} {translate("followers")}
          </Text>
          <Text style={[styles.descText, { fontWeight: 'bold', color: 'white' }]} numberOfLines={2}>
            -
          </Text>
          <Text style={[styles.descText, { fontWeight: 'bold' }]} numberOfLines={2}>
            {user?.followings_count ?? 0} {translate("Followings")}
          </Text>
        </View>

        {(selectedGridUserData?.id != this.state.current_user_id) ?

          <View style={styles.mainView3}>

            <TouchableOpacity
              testID="followUnfollowButton"
              onPress={() => this.callFollowUnfollowApi(isFollowing, selectedGridUserData?.id)} style={{ marginHorizontal: 20, height: 40, width: "50%", backgroundColor: '#FFC925', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderRadius: 5 }}>
              {this.renderPlusImage(isFollowing)}
              {this.renderFollowButtonText(user?.followings_status)}
              {this.state.userFollowButtonLoader &&
                <View style={styles.streamingContainer}>
                  <ActivityIndicator testID="viewerfollowLoader" color={"#fff"} size={"small"} />
                </View>
              }
            </TouchableOpacity>

          </View> : null}
      </View>

    );
  };

  renderFollowButtonText = (followings_status: any) => {
    return (
      <>
        {followings_status && !this.state.userFollowButtonLoader ?
          <Text style={styles.descText1}>
            {this.getUsersFollowButtonStatus(followings_status)}
          </Text>
          : null}
      </>
    )
  }

  renderPlusImage = (isFollowing: boolean) => {
    return (
      <>
        {!isFollowing && !this.state.userFollowButtonLoader &&
          <Image
            source={plus}
            style={styles.profileimg2}
            resizeMode="contain"
          />}
      </>
    )
  }

  ManageViewModal = () => {
    return (
      <CommonModalBackground onClose={this.handleMangeviewModal} isVisible={this.state.ManageViewModal}>
        <View style={styles.setingsContainer1}>
          {this.state.ManageviewData?.map((item: any, index: number) => (
            <TouchableOpacity onPress={item?.onpress} key={index}>


              <TouchableOpacity onPress={item?.onpress} key={index} style={styles.modalHeader1}>

                {/* <Image source={item?.icon} style={styles.optionIcon} /> */}
                <Text style={{ fontSize: 16, }}>{item?.label}</Text>


              </TouchableOpacity>


            </TouchableOpacity>
          ))}

        </View>
        <MemoizedAlertModal
          alertModal={this.state.BlockAlertMsg}
          onPress1={this.closeBlockAlertModal}
          onPress2={() => {
            this.setState({ BlockAlertMsg: { openAlertModal: false, alertMsg: "" }, ManageViewModal: false }, () => {
              this.Blockuser()
            })
          }}
          btnTitle1={translate("cancel")}
          btnTitle2={translate("confirm")}
        />


      </CommonModalBackground>
    )
  }

  renderGiftPopup = () => {
    return this.state.giftresmodel == true ?
      <View style={[styles.giftsmainview, this.state.usersJoinedData.length == 1 && { marginBottom: 300 }]}>
        <View style={[styles.giftsubmainview, this.state.language === "ar" && styles.giftAr]}>
          <View style={styles.giftsubmainview}>
            <Image
              source={(this.state.giftPopupDetails?.profileUrl && this.state.giftPopupDetails?.profileUrl != "null") ? { uri: this.state.giftPopupDetails?.profileUrl } : avatar}
              style={styles.gifterProfile} />
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={styles.giftername}>{this.state.giftPopupDetails?.gifter}</Text>
              <Text style={styles.giftname}>{this.state.giftPopupDetails?.giftName}</Text>
            </View>
            <Image source={{ uri: this.state.giftPopupDetails?.giftUrl }} style={styles.gifterProfile} />
          </View>
          {this.state.giftPopupDetails.multiplier > 1 && <Text style={[styles.multiplier, this.state.language === "ar" && styles.multiplierAr]}>x {this.state.giftPopupDetails.multiplier}</Text>}
        </View>
      </View> : null
  }

  renderStream = () => {
    return <>
      {/* <View testID="layoutView" onLayout={(event) => {
        this.setState({ nativeViewHeight: `${event.nativeEvent.layout.height}`, streamViewHeight: `${event.nativeEvent.layout.height}` })
      }} style={[styles.singleLiveView, this.state.usersJoinedData.length == 0 && styles.hiddenView, this.state.usersJoinedData.length > 1 && styles.streamingView]}>
        {this.state.isLiveChallenge && <Scorebar scoreTeam1={this.state.scoreTeam1} scoreTeam2={this.state.scoreTeam2} />}
        <StreamView
          nativeViewHeight={this.state.nativeViewHeight}
          streamViewHeight={this.state.streamViewHeight}
          streamEndPressed={this.state.streamEndPressed}
          broadcastDetail={JSON.stringify({
            ...this.state.broadcastDetail,
            ...this.state.currentUser
          })}
          isLiveChallenge={this.state.isLiveChallenge}
          onGridTapped={this.onGridTapped}
          handleOnLikePressed={this.handleOnLikePressed}
          isMute={this.state.isMute}
          teamIdForNative={JSON.stringify(this.state.teamIdForNative)}
          selectedChallengeUserId={this.state.selectedChallengeUserId}
          flipCamera={this.state.flipCamera}
          endbuttonPressed={this.endbuttonPressed}
          onParticipantAdded={this.onParticipantAdded}
          onParticipantLeft={this.onParticipantLeft}
          hostId={String(this.props.route.params.stageData?.hostId)}
        />
        {this.state.isLikedAnim && <Lottie
          source={heartburst}
          autoPlay={true}
          loop={false}
          resizeMode={'contain'}
          onAnimationFinish={() => this.setState({ isLikedAnim: false })}
          style={[{ alignSelf: 'center', height: 200, width: 200, position: 'absolute', top: (Number(this.state.nativeViewHeight) / 10) }]}
        />}
        {this.renderGiftPopup()}
        {this.state.isLiveChallenge && <View style={{ height: 25, paddingHorizontal: 5, backgroundColor: '#61616190', position: 'absolute', left: '41%', top: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontWeight: '700', fontSize: 13 }}>
            vs {this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes} :{" "}
            {this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}
          </Text>
        </View>}
      </View> */}
      {/* {(this.state.usersJoinedData.length == 0 && !this.state.isTimerVisible) &&
        <View style={styles.streamingContainer}>
          <ActivityIndicator color={"#fff"} size={"small"} />
        </View>
      } */}
    </>
  }

  exploreArrowImg = () => {
    if (this.state.language == "ar") {
      return rightarrow;
    } else {
      return left;
    }
  }

  // Customizable Area End

  render() {
    return (
      <ImageBackground source={bluebackground} style={[styles.container, { height: '100%' }]}>
        {/* <ZegoTextureView ref={'zego_play_view'} style={StyleSheet.absoluteFill} />
        <ZegoTextureView ref={'zego_preview_view'} style={StyleSheet.absoluteFill} />
        <ZegoTextureView ref={'zego_mix_view'} style={{ height: 200, width: 200 }} /> */}

        <View style={styles.container}>
          <View style={styles.container}>

            <View style={styles.subContainer}>
              {this.state.isTimerVisible &&
                <View style={[styles.timerDesign]}>
                  <View style={[styles.timerview]}>
                    <Text
                      style={styles.timertext}>
                      {
                        this.state.selectedTime
                      }
                    </Text>
                  </View>
                </View>
              }
              {/* <CommentSettingsModel onMute={this.onMuteSetting} updateComment={this.onUpdateComment} closeCommentSetting={this.onCloseCommentSetting} openCommentModal={this.openCommentModal} selectedmutelable={this.state.selectedmutelable} allowComments={this.state.allowComments} isVisible={this.state.isCommentModalVisible} language={this.state.language} /> */}
              {/* {this.blockKeywordsModel()}  */}
              {/* <MemoizedMuteView
                isHost={this.state.broadcastDetail.userRole === "host"}
                isMutedAccountsModalVisible={this.state.isMutedAccountsModalVisible}
                invitedIds={this.state.invitedIds}
                selectedGridId={this.state.selectedGridId}
                stage_id={this.state.stage_id}
                addMuteModal={this.state.addMUterModel}
                navigation={this.props.navigation}
                commentSetting={this.state.Commentsetting}
                isMuteDurationModalVisible={this.state.isMuteDurationModalVisible}
                onCloseDuration={() => this.setState({ isMuteDurationModalVisible: false })}
                onClose={() => this.setState({ addMUterModel: false })}
                onCloseAddMuteModal={() => this.setState({
                  addMUterModel: false,
                  searchresult: [],
                  Commentsetting: false,
                  })}
                  onCloseMuted={() => this.setState({ isMutedAccountsModalVisible: false })}
                  onCloseMutedModal={() => this.setState({
                    isMutedAccountsModalVisible: false,
                    searchresult: [],
                    Commentsetting: false,
                    Settingviewmodel: true
                    })}
                    onGetMutedAccounts={(data: any) => this.setState({ muteaccountlistdata: data })}
                    onMuteSelected={() => this.setState({ muteselected: true })}
                    handelMuteUmute={this.handelMuteUmute}
                    onSelectMute={this.onSelectMute}
                    /> */}

              <LiveStreamHeader
                profileImage={this.getViewerOrHostDetails()}
                hostName={this.getViewerOrHostDetails(true)}
                handleFollowButton={this.handleHostFollowButton}
                followStatus={this.getFollowButtonStatus()}
                followButtonLoader={this.state.followButtonLoader}
                onPressWeeklyRanking={this.onPressWeeklyRanking}
              />
              {this.state.streamList.map((stream, index) => {
                const streamID = stream.streamID;
                const isLocal = stream.user.userID === this.state.broadcastDetail.userID;
                console.log("............f............", stream)
                if (!streamID) return null;
                return (
                  <ZegoTextureView
                    key={streamID}
                    style={{ width: 150, height: 200, margin: 8 }}
                    ref={(ref) => {
                      if (!ref) return;
                      const tag = findNodeHandle(ref);

                      if (isLocal) {
                        ZegoExpressEngine.instance().startPreview({
                          reactTag: tag,
                          viewMode: 1,
                          backgroundColor: 0
                        });
                      } else {
                        ZegoExpressEngine.instance().startPlayingStream(streamID, {
                          reactTag: tag,
                          viewMode: 1,
                          backgroundColor: 0
                        });
                      }
                    }}
                  />
                );
              })}

              {/* {this.renderStream()} */}
              {this.state.broadcastDetail.startBroadcast == "true" ? (
                <View style={styles.shutDownBgnd}>
                  <View style={styles.buttonsContainer}>
                    <Image source={userFill} style={styles.userFilledIcon} />
                    <Text testID="viewerCount" style={styles.viewerCount}>{this.formatNumber(this.state.totalViewersCount)}</Text>
                    <TouchableOpacity
                      testID="endButton"
                      onPress={this.endLiveAlert}
                    >
                      <Image source={shutDown} style={styles.shutDowIcon} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity testID="exploreButton" onPress={this.onPressExplore} style={styles.exploreBgnd}>
                    <Text style={styles.exploreTxt}>{translate("explore")}</Text>
                    <Image style={styles.exploreArrow} source={this.exploreArrowImg()} />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
            {/* <KeyboardAvoidingView
              enabled
              behavior={Platform.select({ ios: 'padding', android: undefined })}
              keyboardVerticalOffset={Platform.select({ ios: 5, android: -200 })}
              style={{ width: '100%' }}>
              <CommentIVS
                shareLink={this.shareLink}
                initializetHostSideMute={this.moderatorMuteCallback}
                onCommentBack={() => this.setState({ hostComment: false })}
                onLiveChanged={this.onLiveChanged}
                startNewLive={this.state.startNewLive}
                onLeaveStream={() => {
                  this.setState({ streamEndPressed: true })
                }}
                cancelMatch={this.state.cancelMatch}
                powerButtonWithoutChallenge={this.state.powerButtonWithoutChallenge}
                coHostLeave={this.state.coHostLeave}
                handleCancelledMatch={this.handleCancelledMatch}
                userLeftName={this.state.userLeftName}
                sendLikeCount={this.state.sendLikeCount}
                onSendLikeCount={() => this.setState({ sendLikeCount: 0, likeUserId: null })}
                onLiked={this.onLiked}
                handelUserBlocked={() => {
                  this.setState({ isBlocked: true }, () => {
                    this.setState({ streamEndPressed: true, ManageViewModal: false }, () => {
                    })
                  })
                }}
                teamCombinedIds={this.state.teamIdForNative}
                showHostComment={this.state.hostComment}
                isViewer={this.state.broadcastDetail.isViewer}
                isChallenge={this.state.isLiveChallenge}
                minutes={this.state.minutes}
                seconds={this.state.seconds}
                selectedChallengeUserId={this.state.selectedChallengeUserId}
                blockuserid={this.state.blockuserid}
                userData={this.state.currentUser}
                chatTokenData={this.state.chatTokenData}
                likedUserId={this.state.likeUserId}

                duration={this.state.duration}
                userRole={this.state.broadcastDetail.userRole}
                inviteModal={() => { this.setState({ invitationModel: 2 }) }}
                notificationData={this.state.notificationData}
                giftModel={() => { this.setState({ giftsModal: true }) }}
                setParentChatRoom={this.initializeChatRoom}
                redirectChatArn={this.state.redirectChatArn}
                allParticipants={this.state.usersJoinedData}
                onRedirectAfterChallenge={this.handleRedirectFromChallenge}
                redirectStageArn={this.state.redirectStageArn}
                onReceiveGifts={this.handleOnReceiveGifts}
                onDataReceived={this.handleChildData}
                redirectAsCohost={this.redirectAsCohost}
                previousChatData={this.props.route?.params?.stageData?.chatData}
                redirectStageId={this.state.redirectStageId}
                challengeTeams={this.state.challengeTeams}
                handleParticipantJoining={this.handleParticipantState}
                slow_mode={this.state.slow_mode}
                stageId={this.state.stage_id}
                ReportedDeleteMessageList={this.state.ReportedDeleteMessageList}
              />
            </KeyboardAvoidingView> */}
            <MemoizedInviteView
              stageArn={this.state.stageArn}
              chatRoomArn={this.state.chatRoomArn}
              stream_id={this.state.broadcastDetail.live_stream_id}
              handleInviteIds={(ids: any) => this.setState({ invitedIds: ids })}
              handleButton={this.handleButton}
              handleInviteModal={(count: number) => this.handleInviteModal(count)}
              invitationModel={this.state.invitationModel}
              navigation={this.props.navigation}
              hostOrGuest={this.hostOrGuest} />
            {/* <MemoizedGiftModel setParticipantLoader={() => this.setState({ participantLoader: false })} setSelectedGift={(data: any) => this.setState({ selectedGift: data })} setParticipantModel={() => this.setState({ participantModel: true })} setGiftModel={() => this.setState({ giftsModal: false })} giftsModal={this.state.giftsModal} setCategoryData={(data: any) => this.setState({ categorydata: data })} getParticipant={this.getParticipant} setGiftData={(data: any) => this.setState({ giftsdata: data })} navigation={this.props.navigation} /> */}
            {/* {this.viewViewreModal()} */}
            {/* {this.state.viewProfileModal == true ? this.viewProfileModal() : null} */}
            {/* {this.ManageViewModal()} */}
            <SettingsModal handleShare={this.shareLink} handleGift={this.handleGift} handleComment={this.handleComment} handleSettingviewmodel={this.handleSettingviewmodel} handleFlipCamera={this.handleFlipCamera} handleMicrophone={this.handleMicrophone} handleSettinsModal={this.handleSettinsModal} isMute={this.state.isMute} flipCamera={this.state.flipCamera} language={this.state.language} isVisible={this.state.settingsModal} />
            {/* <SettingsViewModal handleModerater={this.handleModerater} handleMutedaccountlist={this.handleMutedaccountlist} handleComment={this.handleComment1} goBackFromSetting={this.goBackFromSetting} onClose={this.onCloseSetting} language={this.state.language} isVisible={this.state.Settingviewmodel} /> */}
            {/* <MemoizedModeratorView
              navigation={this.props.navigation}
              invitedIds={this.state.invitedIds}
              moderoterAddRemove={this.state.moderoteraddreove}
              setModeratorAddRemove={(value: string) => this.setState({ moderoteraddreove: value })}
              handelModerator={this.handelModerator}
              hostsidemoderatorList={this.setHostSideModeratorList}
              stage_id={this.state.stage_id}
              stageArn={this.state.stageArn}
              moderatorModel={this.state.ModeraterModel}
              manageModals={() => this.setState({
                ManageViewModal: false,
                viewViewreModal: false
              })}
              openErrorAlert={() => this.setState({ alertModal: { openAlertModal: true, alertMsg: translate("something_wnt_wrong") } })}
              openCloseModeratorModel={(isOpen: boolean) => this.setState({ ModeraterModel: isOpen })}
              openSettingsModal={this.openSettingsModal}
            /> */}
            {/* <ParticipantsModel
              onSelect={this.onSelectParticipant}
              onClose={() => this.setState({ participantModel: false, giftsModal: true })}
              participantLoader={this.state.participantLoader}
              isVisible={this.state.participantModel}
              participantData={this.state.participantData}
            /> */}
            {/* <MemoizedReportModal selectedGridId={this.state.selectedGridId} language={this.state.language} onClose={this.onCloseReportModal} isVisible={this.state.showReportModal} navigation={this.props.navigation} /> */}
            {/* {this.state.startHeartAnim && <Lottie
              source={heartbeat}
              autoPlay={true}
              loop={false}
              onAnimationFinish={() => this.setState({ startHeartAnim: false })}
              style={{ height: 200, width: 150, position: 'absolute', bottom: 0, right: -15 }}
            />} */}
            {/* {(this.state.lottieAnimation.show && this.state.lottieAnimation.url) && (
              <View style={styles.fullParent}>
                <View style={[
                  styles.lottieContainer, {
                    top: `${this.state.lottieAnimation.positionTop}%`,
                    left: `${this.state.lottieAnimation.positionLeft}%`,
                    width: screenWidth
                  }]}>
                  <Lottie
                    source={JSON.parse(this.state.lottieAnimation?.json)}
                    autoPlay
                    style={styles.lottieAnimationStyle}
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
            {this.state.startSingleHeartAnim && <Lottie
              testID="heartBurstAnim"
              source={heartburst}
              autoPlay={true}
              loop={false}
              onAnimationFinish={() => this.setState({ startSingleHeartAnim: false })}
              style={{ height: 100, width: 100, position: 'absolute', bottom: 10, right: -10 }} />
            } */}

            {((this.state.broadcastDetail.isHost === "true" || this.state.broadcastDetail.userRole == "cohost") && !this.state.hostComment) &&
              <LiveStreamBottomTab
                testID="BottomTabID"
                isSingleLive={this.state.usersJoinedData.length == 1}
                bottomButtons={this.state.bottomButtons}
                onButtonPress={this.handleBottomButtonClick}
                messageData={this.state.privateLiveData.is_private ? this.notifyMessage2 : this.notifyMessage}
                showMessages={this.state.showInitialMessage}
              />}
            {(this.state.alertModal?.alertMsg === this.endliveAlertMsg || this.state.alertModal?.alertMsg === this.liveExploreAlertMsg) ?
              <MemoizedAlertModal
                alertModal={this.state.alertModal}
                onPress1={this.closeAlertModal}
                onPress2={this.handleStreamEndAlert}
                btnTitle1={translate("cancel")}
                btnTitle2={translate("confirm")}
              /> :
              <MemoizedAlertModal
                alertModal={this.state.alertModal}
                onPress2={this.closeAlertModal}
                btnTitle2={translate("ok")}
              />}
            {/* <MemoizedAlertModal
              alertModal={this.state.ReportalertPopup}
              onPress2={this.closeReportModel}
              btnTitle2={translate("ok")}
            /> */}
            {/* <MemoizedAlertModal
              alertModal={this.state.cancelCohostModel}
              onPress1={() => this.setState({ cancelCohostModel: { openAlertModal: false, alertMsg: "" } })}
              onPress2={() => this.setState({ streamEndPressed: true, cancelCohostModel: { openAlertModal: false, alertMsg: "" } }, () => {

              })}
              btnTitle1={translate("cancel")}
              btnTitle2={translate("confirm")}
            />

            <CancleMatchModal cancelMatchModal={this.state.cancelMatchModal} handlecancelMatchModal={() => this.setState({ cancelMatchModal: false })} cancelMatchAction={this.cancelChallenge} /> */}

            {/* <MemoizedAlertModal
              btnTitle1={translate("reject")}
              btnTitle2={translate("accept")}
              alertModal={this.state.notificationModal}
              onPress1={() => this.setState({ notificationData: null, notificationStatus: "rejected", notificationModal: { openAlertModal: false, alertMsg: "" } }, () => {
                this.updateInviteStream("rejected")
              })}
              onPress2={() => this.acceptUpdateInvite()}
            /> */}

          </View>
        </View>
        {/* <ChallengeDurationPopup isVisible={this.state.challangeModalPopup}
          onClose={this.onCloseDuration}
          onSelect={this.onSelectDuration}
        /> */}
        {/* {this.state.isTimerVisible === false && this.state.chatTokenData.token != "" &&
          <>
            {this.teamSelectionModal()}
          </>
        } */}
        {/* <TouchableOpacity testID="newStageButton" style={styles.hiddenView} onPress={() => {
          this.handleRedirectFromChallenge({ redirectStageArn: "arn", redirectStageId: "id", redirectChatArn: "arn", hostId: "id" })
          this.handleDeleteChatRoomApi()
          this.attachRecording()
          this.redirectFromNotification()
          this.redirectAsCohost()
          this.handleRecordings()
        }} /> */}
      </ImageBackground >
      // Customizable Area End
    )
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: { flex: 1 },
  subContainer: {
    flex: 1,
    backgroundColor: "transparent",
    width: screenWidth,
    paddingTop: 30,
    marginBottom: 10
  },
  hiddenView: {
    height: 0,
    width: 0
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
  modalHeader1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: CalcScale(20),
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  emptyimg: {
    width: CalcScale(80),
    height: CalcScale(80),
  },
  searchContainerStyle: {
    marginTop: 10,
    width: "95%",
    backgroundColor: "transparent",
    padding: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginBottom: DynamicDimension(20, false, 1),
    borderRadius: 0,
    paddingHorizontal: CalcScale(10),
  },
  searchInputStyle: {
    backgroundColor: "#EEEEEE",
    height: DynamicDimension(45, true, 1),
    borderRadius: scale(10)
  },
  cancelButton: {
    resizeMode: "contain",
    height: CalcScale(23),
    width: CalcScale(23),
    alignSelf: "flex-end",
  },

  cancelButton2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelEn: {
    width: Scale(25),
    height: Scale(25),
  },
  cancelAr: {
    width: Scale(20),
    height: Scale(20),
  },
  plusicon: {
    resizeMode: "contain",
    height: CalcScale(23),
    width: CalcScale(23),
    alignSelf: "flex-end",
    tintColor: "black",
    marginRight: 10,

  },
  inputTextRight: {
    textAlign: "right",
  },
  nameView: {
    marginLeft: DynamicDimension(20, true, 1),
    width: responsiveWidth(45),
    alignItems: "flex-start",
  },
  headerText: {
    fontSize: CalcScale(20),
    paddingHorizontal: 15,

  },
  headerText1: {
    fontSize: CalcScale(14),
    paddingHorizontal: 15,
    paddingTop: 15

  },
  headerText2: {
    fontSize: CalcScale(14),
    paddingHorizontal: 15,


  },
  containerStyle: {
    flex: 1,
    margin: 4,
    color: "white",
    marginLeft: 12,
    padding: 4,
  },
  btnTextStyle: {
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    fontFamily: fonts.MontserratMedium,
    fontSize: 15,
  },
  disableBtnStyle: { opacity: 0.3 },
  modalListContainer: {
    bottom: 0,
    position: "absolute",
    borderTopRightRadius: CalcScale(20),
    width: screenWidth,
    borderTopLeftRadius: CalcScale(20),
    maxHeight: CalcScale(500),
    backgroundColor: "rgb(255, 255, 255)",
  },
  iosBottomSpace: {
    paddingBottom: CalcScale(30)
  },
  profileDataModel: {
    width: screenWidth,
    borderTopRightRadius: CalcScale(20),
    borderTopLeftRadius: CalcScale(20),
    backgroundColor: "rgb(255, 255, 255)",
    maxHeight: CalcScale(500),
    paddingBottom: 20
  },
  modalListContainer1: {
    position: "absolute",
    bottom: 0,
    width: screenWidth,
    backgroundColor: "rgb(255, 255, 255)",
    maxHeight: Scale(500)

  },
  gifterProfile: {
    width: CalcScale(25),
    height: CalcScale(25),
    borderRadius: CalcScale(100),
  },
  profileimg1: {
    width: CalcScale(60),
    height: CalcScale(60),
    borderRadius: CalcScale(140),
  },
  profileimg2: {
    width: CalcScale(20),
    height: CalcScale(20),
    borderRadius: CalcScale(140),
  },
  nameText1: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: CalcScale(20),
  },
  mainView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: DynamicDimension(10, true, 1),
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: DynamicDimension(10, true, 1),
  },
  profileMainView: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  profileMainView2: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
  },
  mainView2: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginVertical: DynamicDimension(10, true, 1),
    alignItems: "center",
    marginHorizontal: 10,
  },
  mainView4: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginVertical: DynamicDimension(10, true, 1),
    alignItems: "center",
    marginHorizontal: 25,
  },
  mainView3: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginVertical: DynamicDimension(10, true, 1),
    alignItems: "center",
    width: '90%',
    marginHorizontal: 10
  },
  followImgView: {
    height: DynamicDimension(45, false, 1),
    width: DynamicDimension(45, true, 1),
    borderRadius: DynamicDimension(45, true, 1),
    borderWidth: 3,
    borderColor: "#FFC925",
    alignItems: "center",
    justifyContent: "center",
  },
  followImgView1: {
    height: DynamicDimension(70, false, 1),
    width: DynamicDimension(70, true, 1),
    borderRadius: DynamicDimension(70, true, 1),
    borderWidth: 3,
    borderColor: "#FFC925",
    alignItems: "center",
    justifyContent: "center",
  },
  giftname: {
    fontSize: 10, fontWeight: 'bold', color: 'white',
  },
  multiplier: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "right",
    marginLeft: 5,
  },
  giftername: {
    fontSize: 12, fontWeight: 'bold', color: 'white'
  },
  giftsmainview: {
    position: "absolute",
    bottom: scale(10),
    left: scale(10),
    padding: scale(5),
    paddingHorizontal: scale(25),
    backgroundColor: 'black',
    alignItems: 'center',
    borderRadius: 25,
  },
  giftsubmainview: {
    flexDirection: "row",
    justifyContent: 'center',
  },
  timerDesign: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 10,
    height: screenHeight,
    width: screenWidth,
  },
  timerview: {
    width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 35, borderWidth: 3, borderColor: 'white'
  },
  timertext: {
    fontSize: 30, fontWeight: 'bold', color: 'white'
  },
  submainView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  descText: {
    fontSize: DynamicDimension(14, true, 1),
    color: 'grey'
  },
  descText1: {
    fontSize: DynamicDimension(14, true, 1),
    paddingHorizontal: 10
  },
  onlineSymbol: {
    width: 18,
    height: 18,
    borderWidth: 3,
    borderRadius: 9,
    backgroundColor: "#3C6507",
    borderColor: "white",
    position: "absolute",
    bottom: -5,
    end: -5,
  },
  onlineSymbol1: {
    width: 22,
    height: 22,
    borderWidth: 3,
    borderRadius: 9,
    backgroundColor: "#3C6507",
    borderColor: "white",
    position: "absolute",
    bottom: -5,
    end: -5,
  },
  shutDownBgnd: {
    position: "absolute",
    top: 55,
    right: scale(20),
    padding: scale(5),
    zIndex: 10002,
    alignItems: "flex-end"
  },
  exploreBgnd: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(10)
  },
  exploreTxt: {
    color: "white",
    fontSize: scale(14),
  },
  exploreArrow: {
    width: 15,
    height: 10,
    tintColor: "white",
    resizeMode: "contain",
    transform: [{ rotate: "180deg" }]
  },
  userFilledIcon: {
    width: scale(25),
    height: scale(25),
    tintColor: "white",
    resizeMode: "contain"
  },
  viewerCount: {
    fontSize: scale(18),
    color: "white",
    marginRight: scale(10)
  },
  shutDowIcon: {
    width: scale(30),
    height: scale(30),
    resizeMode: "contain",
    tintColor: "white",
  },
  arrowIcon: {
    width: scale(15),
    height: scale(15),
    resizeMode: "contain"
  },
  singleLiveView: {
    position: 'absolute',
    height: displayHeight,
    width: '100%',
    top: 0,
    left: 0,
    marginBottom: 0,
    zIndex: 1000
  },
  switchIcon: {
    width: scale(35),
    height: scale(35),
    resizeMode: 'contain',
  },
  arrowIcon1: {
    width: scale(20),
    height: scale(20),
    resizeMode: "contain"
  },
  setingsContainer1: {
    paddingBottom: scale(30),

  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  streamingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabbarStyle: {
    height: Scale(50),
    width: Scale(100),
    justifyContent: "center",
    alignItems: "center",
    marginRight: Scale(10)
  },
  stickerText: {
    fontFamily: FONTS.MontserratBold,
    fontSize: Scale(10)
  },

  flatlist: {
    flex: 1,
    marginHorizontal: Scale(10),
    width: "100%"
  },
  normaltext: {
    fontFamily: FONTS.MontserratRegular,
    fontSize: Scale(12)
  },
  imageStyle: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    alignSelf: 'center'
  },
  topicContainer: {
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    marginBottom: 20
  },
  titleInput: { flex: 1, color: "black" },
  crossImage: {
    resizeMode: "contain",
    height: Scale(23),
    width: Scale(23),
  },
  fullParent: {
    position: 'absolute',
    height: screenHeight - 100,
    width: screenWidth,
    zIndex: 99,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  lottieContainer: {
    position: "absolute",
    margin: 0,
    padding: 0,
    zIndex: 99,
    height: screenHeight * 0.2,
    width: screenWidth * 0.3,
  },
  lottieAnimationStyle: {
    zIndex: 99,
    margin: 0,
    padding: 0,
  },
  inviteFlatList: {
    paddingBottom: scale(200),
  },
  cardChallengedesc: {
    fontSize: 12,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 18,
    marginTop: 5,
    color: "#aaa",
    alignSelf: "center",
    opacity: 0.8
  },
  avtar: {
    height: Scale(40),
    width: Scale(40)
  },
  teamPopUpmodalContainer: {
    flex: 1,
  },
  teamPopUpmodalListContainer: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    backgroundColor: 'rgb(255, 255, 255)',
    maxHeight: Scale(800),
    fontWeight: "800"

  },
  teamPopUpmodalHeader: {
    display: "flex",
    justifyContent: 'center',
    padding: Scale(12),
    width: screenWidth,
  },
  teamPopUpheaderText: {
    // fontFamily: FONTS.MonotypeCorsiva,
    fontSize: Scale(20),
    textAlign: 'center',
    width: '100%',
    marginVertical: 8
  },
  commentHeader: {
    // fontFamily: FONTS.MonotypeCorsiva,
    fontSize: Scale(18),
    textAlign: 'center',
    marginVertical: 8,
    width: '90%'
  },
  mutedAccountHeader: {
    fontFamily: FONTS.MontserratBold,
    fontSize: Scale(18),
    textAlign: 'center',
    marginVertical: 8,
    width: '90%'
  },
  teamPopUpselectedUser: {
    backgroundColor: '#333333',
    height: 60,
    borderRadius: 50,
    marginHorizontal: 16,
    marginVertical: 28,
    flexDirection: 'row',
    overflow: 'hidden',

  },

  getStart: {
    alignSelf: 'center',
    fontWeight: '600',
    // fontFamily: FONTS.MonotypeCorsiva,
    fontSize: 18
  },
  avatarStyle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: '#FEC925',
    justifyContent: 'center',
    backgroundColor: 'green',
    padding: 8,
    borderWidth: 4
  },
  teamMemberSelection: {
    flexDirection: 'row',
    width: 140,
    height: 140,
    margin: 8,
    alignItems: 'center',
    borderWidth: 2,
    justifyContent: 'center',
    backgroundColor: '#F9F9F9'
  },
  getStartedBG: {
    padding: 8,
    marginTop: 12,
    marginBottom: 30,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFC925',
  },
  streamingView: {
    flex: 1,
    position: 'relative',
    height: 'auto',
    width: 'auto'
  },
  backArrow: {
    width: 15,
    height: 15,
    alignSelf: 'center',
    marginVertical: 8,
    marginStart: 8
  },
  commentView: {
    padding: 8,
    flexDirection: 'row',
    marginHorizontal: 12
  },
  selectTimeStyle: {
    padding: 12,
    flexDirection: 'row',
    marginHorizontal: 12
  },
  commentTitleStyle: {
    alignSelf: 'baseline',
    flex: 1,
    fontFamily: fonts.RobotoRegular,
    fontSize: Scale(18)
  },
  blockKeywordStyle: {
    paddingStart: 12
  },
  modalContainer1: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end', // Modal will be at the bottom of the screen
  },
  modalContent: {
    height: displayHeight,  // Adjust the height as needed
    backgroundColor: 'white',
    padding: 20,
  },
  accountTitleStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 20
  },
  modalContentView: {
    flexDirection: 'row',
    alignContent: 'center',
    elevation: 8
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey'
  },
  touchablePosition: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,

  },
  profileLogo: {
    height: 100,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    resizeMode: 'contain',
    borderRadius: 20,
    marginTop: 6
  },
  report_modal_view: {
    backgroundColor: "white",
    height: Scale(542),
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  giftAr: { flexDirection: "row-reverse" },
  multiplierAr: { textAlign: "left", marginRight: 5 }
});
// Customizable Area End
