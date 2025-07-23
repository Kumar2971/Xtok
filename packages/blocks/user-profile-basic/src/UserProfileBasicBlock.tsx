import React from "react";
// Customizable Area Start
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
  Platform,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";
import Scale from "../../../components/src/Scale";
import { getStorageData } from "../../../framework/src/Utilities";
import {
  menuEllipsis,
  blockUser,
  shield_Fail,
  send, lockcircle, imageMenu_light,heart_dark, settingsIcon, avatar, bookMarkBlack, ic_draft, mute_account,Performance_tracker
} from "./assets";
import { imgRightArrow, imgLeftArrow } from "../../CfAppCoinsManagement/src/assets";
import { translate } from "../../../components/src/i18n/translate";
// Customizable Area End

import UserProfileBasicController, {
  Props
} from "./UserProfileBasicController";

export default class UserProfileBasicBlock extends UserProfileBasicController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  focusListener: any
  topHeaderUserProfile = () => {
    const { language } = this.state;
    return (
      <View style={[styles.headercontainer]}>
        <TouchableOpacity testID="backBtn" onPress={() => {
          if (this.props.route.params?.account_id) {
            this.props.navigation.navigate('ChatList')
          } else if (this.props.route.params?.isCommentPost === true) {
              this.props.navigation.setParams({
                "data": {
                  "attributes": {
                    "account_id": null
                  }
                }
              })
              this.props.navigation.goBack()
              this.props.navigation.goBack()
            } else {
              this.props.navigation.setParams({
                "data": {
                  "attributes": {
                    "account_id": null
                  }
                }
              })
              this.props.navigation.goBack()
            }
        }} style={styles.backarrow_stylebtn}>
          <Image source={language == "ar" ? imgRightArrow : imgLeftArrow} style={language == "ar" ? styles.backarrow_style : styles.backarrow_style_en} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{!this.state.accountId ? this.state.UserProfileDetails?.attributes?.full_name : this.state.full_name}</Text>
        <TouchableOpacity testID="visibleMdl" onPress={() => this.setState({ modalVisible: true })} style={styles.backarrow_stylebtn}>
          <Image source={menuEllipsis} style={styles.menuEllipsis_styles} />
        </TouchableOpacity>
      </View>
    );
  };
  renderFollowUnfollowCountView() {
    const disableOnclick = Boolean(!this.state.isFollowed && this.state.UserProfileDetails?.attributes?.is_private_account && this.state.accountId);
    return (
      <View style={styles.ratingcontainer}>
        <TouchableOpacity disabled={disableOnclick} onPress={this.followingsNavigate}>
          <View>
            <Text style={styles.ratingtextnumber}>{this.state.UserProfileCount?.following || '0'}</Text>
            <Text style={styles.ratingtext}>{translate("following")}</Text>
          </View>
        </TouchableOpacity>


        <View>
          <Text style={styles.ratingtextnumber}>{this.state.UserProfileCount?.likes || '0'}</Text>
          <Text style={styles.ratingtext}>{translate("like")}</Text>
        </View>
        <TouchableOpacity disabled={disableOnclick} testID="followers" onPress={() => this.followersNavigate()}>
          <View>
            <Text style={styles.ratingtextnumber}>{this.state.UserProfileCount?.followers || '0'}</Text>
            <Text style={styles.ratingtext}>{translate("followers")}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  renderTabOne() {
    return (
      this.state.accountId ? null :
        <TouchableOpacity testID="tabOne" onPress={() => {
          this.setState({ showTab: 1 })
        }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={bookMarkBlack} resizeMode={'contain'} style={styles.toggleheart_Style} />
            {this.state.showTab === 1 &&
              <View style={{ width: Scale(40), height: Scale(2), backgroundColor: "black", }} />
            }
          </View>
        </TouchableOpacity>
    )
  }
  renderTabTwo() {
    return (
      this.state.accountId ? null : <TouchableOpacity testID="tabTwo" onPress={() => {
        this.setState({ showTab: 2 })
      }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={heart_dark} style={styles.toggleheart_Style} />
          {this.state.showTab === 2 &&
            <View style={{ width: Scale(40), height: Scale(2), backgroundColor: "black", }} />
          }
        </View>
      </TouchableOpacity>
    )
  }
  followBtnText = () => {
    if(this.state.isRequested){
      return translate("requested");
    }else{
      return translate("follow")
    }
  }

  buttonContainer() {
    return (
      <View style={styles.buttonContainer_style}>
        {this.state.accountId ? (<TouchableOpacity testID="unFollow" style={styles.buttonboxContainer}
          onPress={() => {
            if (this.state.isFollowed) {
              this.unfollowUser()
            } else {
              !this.state.isRequested ? this.followUser() : this.cancelRequest()
            }
          }}>
            {this.state.followButtonLoader ?  <ActivityIndicator /> : 
          <Text style={styles.followButtonText_style}>{this.state.isFollowed ? translate("unfollow") : this.followBtnText()}</Text>
          }
        </TouchableOpacity>)
          :
          (<TouchableOpacity testID="editprofile" style={styles.buttonboxContainer}
            onPress={() => this.props.navigation.navigate('EditProfile')}>
            <Text style={styles.followButtonText_style}>{translate("edit_Profile")}</Text>
          </TouchableOpacity>)
        }
        {this.state.accountId ? null : (
          <TouchableOpacity testID="draft" style={{ marginLeft: 5 }} onPress={() => { this.props.navigation.navigate('DraftList') }}>
            <View style={styles.viewDraft}>
              <Image source={ic_draft} style={styles.imageDraft} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    )
  }
  profileHeader = () => {
    return (
      <View style={[styles.profileContainer]}>
        <Image source={this.state?.photo ? { uri: this.state?.photo } : avatar}
          // source={{uri:this.state?.photo}}
          style={{ width: Scale(80), height: Scale(80), borderRadius: 1000 }} />
        <Text style={styles.profileName_style}>@{!this.state.accountId ? this.state.UserProfileDetails?.attributes?.user_name : this.state.userName || ''}</Text>
        {this.renderFollowUnfollowCountView()}
        {this.buttonContainer()}
        <Text style={styles.textfollowMessage}>{this.state.bio || translate("noBio")}</Text>
        <View style={styles.toggleContainer_Style}>
          <View style={[styles.toggleBoxImage_Style, { flexDirection: 'row' }]}>
            <TouchableOpacity testID="tabZero" onPress={() => {
              this.setState({ showTab: 0 })
            }}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={imageMenu_light} style={styles.toggleheart_Style} />
                {this.state.showTab === 0 &&
                  <View style={{ width: Scale(40), height: Scale(2), backgroundColor: "black", }} />
                }
              </View>
            </TouchableOpacity>
            {this.renderTabOne()}
            {this.renderTabTwo()}
          </View>
        </View>
      </View>
    );
  }

  renderItem = (data: any) => {
    const { item } = data
    return (
      <TouchableOpacity style={styles.post_container} onPress={() => {
        this.props.navigation.navigate('Comments', {
          type: 'post',
          account_id: item?.attributes?.account_id,
          post_id: item?.id,
          isFromNotification: false,
          isFromSearch: false,
        })
      }}>
        <Image source={{ uri: item?.attributes?.post_medias?.thumnails?.[0] }} style={styles.post_image} />
      </TouchableOpacity>
    )
  }
  keyExtractor = (item: any) => {
    return item.id
  }

  videoMenuScreenHeader = () => {
    return (
      <FlatList
        numColumns={3}
        data={this.state.posts}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        refreshing={this.state.postsLoading}
        ListEmptyComponent={this.NoDataComponent}
        onRefresh={this.getAccountPosts}
        refreshControl={<RefreshControl refreshing={this.state.postsLoading} onRefresh={this.getAccountPosts} />}
      />
    );
  };

  renderBookmarkItem = (data: any) => {
    const { item, index } = data
    return (
      <TouchableOpacity style={styles.post_container} testID="bookmarkTouchable" onPress={() => {
        this.props.navigation.navigate('Comments', {
          type: 'bookmark',
          post_id: item?.attributes?.post_id,
          account_id: item?.attributes?.account_id,
          isFromNotification: false,
          isFromBookmark: true,
        })
      }}>
        <Image source={{ uri: item?.attributes?.post?.data?.attributes?.post_medias?.thumnails?.[0] }} style={styles.post_image} />
      </TouchableOpacity>
    )
  }

  renderLikeItem = (data: any) => {
    const { item } = data
    return (
      <TouchableOpacity style={styles.post_container} onPress={() => {
        this.props.navigation.navigate('Comments', {
          type: 'LikeActivity',
          account_id: item?.attributes?.account_id,
          post_id: item?.attributes?.id
        })
      }}>
        <Image source={{ uri: item?.attributes?.post_medias?.thumnails?.[0] }} style={styles.post_image} />
      </TouchableOpacity>
    )
  }

  keyBookmarkExtractor = (item: any) => {
    return item.id
  }
  keyLikesExtractor = (item: any) => {
    return item.id
  }

  NoDataComponent = () => (
      <View style={styles.noDataStyle}>
        <Text style={styles.noDataTxt}>{translate("no_record_found")}</Text>
      </View>
  );
  renderBookmarkLists = () => {
    return (
      <FlatList
        testID="flatListBookmark"
        numColumns={3}
        data={this.state.bookMarkPosts}
        renderItem={this.renderBookmarkItem}
        keyExtractor={this.keyBookmarkExtractor}
        refreshing={this.state.bookMarkLoading}
        ListEmptyComponent={this.NoDataComponent}
        onRefresh={this.onrefreshBookmarkPost}
        onEndReachedThreshold={1}
        onEndReached={this.onEndReachedBookmark}
      />
    )
  };
  renderLikesPostsList = () => {
    return (
      <FlatList
        numColumns={3}
        data={this.state.likesPosts}
        renderItem={this.renderLikeItem}
        keyExtractor={this.keyLikesExtractor}
        refreshing={this.state.likesLoading}
        ListEmptyComponent={this.NoDataComponent}
        onRefresh={this.getLikesPosts}
        refreshControl={<RefreshControl refreshing={this.state.likesLoading} onRefresh={this.getLikesPosts} />} />
    )
  };
  privacySttings() {
    return (
      !this.state.accountId ? <TouchableOpacity testID="privacy"
        style={styles.rowTextimage_style}
        onPress={() => {
          this.setState({ modalVisible: false })
          this.props.navigation.navigate('PrivacySettings')
        }}
      >
        <Image source={settingsIcon} style={styles.image_style} />
        <Text style={styles.textuserblack_style}>{translate("settings")}</Text>
      </TouchableOpacity>
        : null
    )
  }
  restrictAccountView() {
    return (
      this.state.accountId ? <TouchableOpacity
        style={styles.rowTextimage_style}
        onPress={() => this.restrictAccount()}
      >
        <Image source={shield_Fail} style={[styles.image_style, this.state?.restrict ? styles.blackImage : styles.redImg]} />
        <Text style={[styles.textuserblack_style, this.state?.restrict ? styles.blackText : styles.redText]}>{this.state?.restrict ? translate("unrestrict") : translate("Restrict")}</Text>
      </TouchableOpacity>
        : null
    )
  }
  blockUserAcc() {
    return (
      this.state.accountId ? <TouchableOpacity testID="blockUser"
        style={styles.rowTextimage_style}
        onPress={() => (this.blockUserApi())}>
        <Image source={blockUser} style={this.state.block ? [styles.image_style, styles.blackImage] : this.blockUserImgStyle()} />
        <Text style={this.state.block ? [styles.textuserblack_style, styles.greyText] : this.blockUserTextStyle()  }>{this.state.block ? 'Unblock' : this.blockText() }</Text>
      </TouchableOpacity> : null
    )
  }
  blockUserImgStyle = () => {
    if(this.state.data?.attributes?.is_blocked){
      return [styles.image_style, styles.blackImage];
    }else{
      return [styles.image_style, styles.redImg];
    }
  }
  blockUserTextStyle = () => {
    if(this.state.data?.attributes?.is_blocked){
      return [styles.textuserblack_style, styles.greyText];
    }else{
      return [styles.textuserblack_style, styles.redText];
    }
  }
  blockText = () => {
    if(this.state.data?.attributes?.is_blocked ){
      return translate("unblock");
    }else{
      return translate("block");
    }
  }
  muteUnmuteAccount() {
    return (
      this.state.accountId ?
        <TouchableOpacity
          style={styles.rowTextimage_style}
          onPress={() => {
            this.state.data?.attributes?.is_muted ? this.unmuteAccount() : this.muteAccount()
          }}
        >
          <Image source={mute_account} style={[styles.image_style, this.state?.isMuted ? styles.blackImage : styles.redImg]} />
          <Text style={[styles.textuserblack_style, this.state?.isMuted ? styles.blackText : styles.redText]}>{this.state?.isMuted ? translate("unmute") : translate("Mute")}</Text>
        </TouchableOpacity>
        : null
    )
  }
  modalHeader = () => {
    return (
      <Modal
        //@ts-ignore
        testID="modalHeader"
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setState({ modalVisible: false });
        }}
      >
        <TouchableWithoutFeedback onPress={() => {
          this.setState({ modalVisible: false });
        }} testID="touchable2" >
          <View style={styles.modalContainer}>
            <View style={styles.comment_ModalView}>
              {this.privacySttings()}
              {this.blockUserAcc()}
              {this.restrictAccountView()}
              {this.muteUnmuteAccount()}
              <TouchableOpacity testID="share"
                style={styles.rowTextimage_style}
                onPress={() => this.shareProfile()}
              >
                <Image source={send} style={[styles.image_style]} />
                <Text style={[styles.textuserblack_style]}>{translate("share_this_Profile")}</Text>
              </TouchableOpacity>
              {/* //Fixed */}
              {!this.state.accountId && (
                <TouchableOpacity testID="pTracker"
                  //disabled
                  style={styles.rowTextimage_style}
                  onPress={() => {
                    this.setState({ modalVisible: false })
                    this.props.navigation.navigate('PerformanceTracker')
                  }}
                >
                  <Image source={Performance_tracker} style={[styles.image_style]} />
                  <Text style={[styles.textuserblack_style]}>{translate('performance_tracker')}</Text>
                </TouchableOpacity>
              )
              }

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  videoMenuFunc = () => {
    if(this.state.showTab === 0){
      return this.videoMenuScreenHeader()
    }else{
     return this.bookFunc()
    }
  }

  bookFunc = () => {
    if(this.state.showTab === 1){
      return this.renderBookmarkLists()
    }else{
      return  this.renderLikesPostsList()
    }
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    const { navigation } = this.props;
    return (
      //Required for all blocks
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* Required for all blocks */}
        <ScrollView keyboardShouldPersistTaps="always" bounces={false} contentContainerStyle={styles.container}>
          <TouchableWithoutFeedback testID="toucWithoutFeedback"
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            {/* Customizable Area Start */}
            {/* Merge Engine UI Engine Code */}
              <SafeAreaView style={{ flex: 1 }}>
                {this.state.loading ?  <ActivityIndicator /> : null }
                {this.topHeaderUserProfile()}
                {this.profileHeader()}
                {!this.state.isFollowed && this.state.UserProfileDetails?.attributes?.is_private_account && this.state.accountId ? (
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Image source={lockcircle} style={styles.imageLock} resizeMode={'contain'} />
                    <Text style={styles.privateAcStyle}>{'Private Account'}</Text>
                    <Text style={styles.privateAcMessageStyle}>{'Follow to see their videos'}</Text>
                  </View>
                ): (
                      this.videoMenuFunc()
                )}
                {this.modalHeader()}
                <ReactNativeModal isVisible={this.state.blockedUserModal}>
                  <View style={styles.report_modal}>
                    <View style={styles.reportModalBodyContainer}>
                      <Text style={{ textAlign: 'center', fontSize: 16 }}>{`${translate("you_have")} ${ this.state.data?.attributes?.is_blocked ? translate('Unblocked') : translate('blocked')} ${translate('the_user_successfully')} `}</Text>
                    </View>
                    <View>
                      <View style={styles.report_modal_button_container}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={this.closeBlockedUserModal}>
                          <Text style={styles.report_continue_button}>{translate("continue")}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ReactNativeModal>
                <ReactNativeModal isVisible={this.state.restrictUserModal}>
                  <View style={styles.report_modal}>
                    <View style={styles.reportModalBodyContainer}>
                      <Text style={{ textAlign: 'center', fontSize: 16 }}>{translate("you_have")} {this.state?.restrict ? translate('restricted') : translate("unrestricted")} {translate("the_user_successfully")}</Text>
                    </View>
                    <View>
                      <View style={styles.report_modal_button_container}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={this.closeRistrictUser}>
                          <Text style={styles.report_continue_button}>{translate("continue")}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ReactNativeModal>
                <ReactNativeModal isVisible={this.state.muteUserModal}>
                  <View style={styles.report_modal}>
                    <View style={styles.reportModalBodyContainer}>
                      <Text style={{ textAlign: 'center', fontSize: 16 }}>{translate("you_have")} {this.state?.isMuted ? translate('muted') : translate("unmuted")} {translate("the_user_successfully")}</Text>
                    </View>
                    <View>
                      <View style={styles.report_modal_button_container}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={this.closeMuteUser}>
                          <Text style={styles.report_continue_button}>{translate("continue")}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ReactNativeModal>
              </SafeAreaView>


            {/* Customizable Area End */}
            {/* Merge Engine UI Engine Code */}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    const userID = (await getStorageData('userID', false)) || '';
    const language = await getStorageData("SelectedLng");
    this.setState({language : language});
    console.log('here ----userID', userID)
    this.userProfileFunc()

    this.userIDFuncCall()
    this.props.navigation.addListener('focus', async () => {
      const authToken = await getStorageData('authToken', false);
      this.userIDFuncCall()

    })

    this.props.navigation.addListener('blur', () => {
      this.setState({
        posts: [],
        postsLoading: true,
        accountId: null,
      })
    })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // Customizable Area End
  }
  // Customizable Area Start
  userIDFuncCall = async() => {
    const userID = await getStorageData('userID', false) || ''
    let dataofUser = this.props.route.params.data
    let dataofUserID = this.props.route.params?.data?.attributes?.account_id
    let showTab = this.props.route.params?.showTab ? this.props.route.params?.showTab : 0
    const idToBeUsed = !dataofUserID ? null : this.idTobeUsedFunc(userID , dataofUserID)
    this.setState({ accountId: idToBeUsed, showTab, userData: dataofUser, loading: true,page:0 ,bookMarkPosts:[]}, () => {
      this.getAccountPosts()
      this.getCurrentUserFollowFollowers()
      this.fetchFollowings()
      if (!idToBeUsed) {
        this.getCurrentUserProfileDetails();
        this.getBookMarkPosts(this.state.page + 1)
        this.getLikesPosts()
      } else {
        this.useProfileDetails()
      }
    })
  }

  idTobeUsedFunc = (userID:any,dataofUserID:any) => {
    if(userID?.toString() === dataofUserID?.toString()){
      return null;
    }else{
      return dataofUserID
    }
  }

  userProfileFunc = () => {
    let idToShow = this.props.route.params?.account_id
    if (idToShow) {
     return this.fetchUserProfile(idToShow)
      
    }else{
     return this.getCurrentUserFollowFollowers()
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    console.log('here ---->', prevProps?.route?.params?.account_id);

    if (prevProps?.route?.params?.account_id !== this.props.route?.params?.account_id) {
      console.log('something ....')
      let idToShow = this.props.route.params?.account_id
      if (idToShow) {
        this.fetchUserProfile(idToShow)
        return
      }
    }
  }

  async componentWillUnmount(): Promise<void> {
    if (this.focusListener?.remove) {
      this.focusListener.remove();
    }

  }
  handleBackButtonClick = () => {
    this.props.navigation.setParams({
      "data": {
        "attributes": {
          "account_id": null
        }
      }
    })
    this.props.navigation.goBack()
    return true;
  }
  // Customizable Area End
}
// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"100%"
  },
  headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: Scale(15),
    height: Scale(40),
    width: '100%',
  },
  headerText: {
    fontSize: Scale(18),
    fontWeight: 'bold'
  },
  backarrow_stylebtn: {
    width: Scale(25),
    height: Scale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },

  backarrow_style: {
    width: Scale(18),
    height: Scale(20),
    resizeMode:"contain"
  },
  backarrow_style_en: {
    width: Scale(25),
    height: Scale(25),
    resizeMode:"contain"
  },
  loading_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuEllipsis_styles: {
    width: Scale(22),
    height: Scale(12),
  },
  post_image: {
    height: Scale(240),
  },
  reporModalTileContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  report_continue_title: {
    color: '#000',
    fontWeight: '600',
    fontSize: 18
  },
  report_modal_button_container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 5 : 10,
  },
  report_continue_button: {
    color: '#000',
    fontWeight: '600',
  },
  button: {
    width: Scale(180),
    height: Scale(45),
    backgroundColor: "#FACC1E",
    borderRadius: Scale(50),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  reportModalBodyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    paddingTop: 15
  },
  report_modal: {
    height: Scale(130),
    width: Scale(300),
    borderRadius: 20,
    backgroundColor: '#fff',
    alignSelf: 'center'
  },
  post_container: {
    flex: 1,
    height: Scale(240),
    maxWidth: responsiveScreenWidth(100) / 3,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRightWidth: 0,
    borderTopWidth: 2,
  },
  profile_image: {
    width: Scale(80),
    height: Scale(80)
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: Scale(20)

  },
  ratingcontainer: {
    flexDirection: 'row',
    width: Scale(200),
    justifyContent: 'space-between',
    marginTop: Scale(10)
  },
  ratingtextnumber: {
    fontSize: Scale(15),
    fontWeight: "500",
    textAlign: 'center'
  },
  ratingtext: {
    fontSize: Scale(12),
    fontWeight: '700',
    color: '#D0D0D0'
  },
  profileName_style: {
    marginTop: Scale(10),
    fontWeight: '600',
    fontSize: Scale(17)
  },
  droupDown: {
    width: Scale(30),
    height: Scale(30)
  },
  viewDraft: {
    width: Scale(30),
    height: Scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  imageDraft: {
    width: Scale(15),
    height: Scale(15),
  },
  buttonBackground_style: {
    height: Scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer_style: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Scale(20)
  },
  followButtonText_style: {
    color: '#ffff',
  },
  textfollowMessage: {
    marginTop: Scale(15),
    fontSize: Scale(13),
    paddingHorizontal: 30,
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonboxContainer: {
    width: Scale(155),
    height: Scale(30),
    borderColor: '#FFD74C',
    borderWidth: Scale(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD74C',
    marginHorizontal: 5,
  },
  toggleContainer_Style: {
    borderColor: '#F2F2F2',
    borderTopWidth: Scale(2),
    borderBottomWidth: Scale(2),
    borderLeftWidth: 0,
    borderRightWidth: 0,
    width: '100%',
    height: Scale(40),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: Scale(20),
  },
  toggleheart_Style: {
    width: Scale(35),
    height: Scale(35)
  },
  bookMark_Style: {
    width: Scale(14),
    height: Scale(14)
  },
  toggleBoxImage_Style: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  privaiteAccount_style: {
    width: Scale(70),
    height: Scale(70)
  },
  privaiteAccountContainer: {
    marginTop: Scale(1),
  },
  privaiteAccountText_Style: {
    fontSize: Scale(15),
    fontWeight: '600',
    marginTop: Scale(15)
  },
  followText_style: {
    marginTop: Scale(10),
    fontSize: Scale(13)
  },

  comment_ModalView: {
    backgroundColor: "white",
    marginTop: Scale(180),
    paddingBottom: Scale(Platform.OS === "ios" ? 40 : 0),
    borderTopEndRadius: Scale(40),
    borderTopLeftRadius: Scale(40)
  },
  modalContainer: {
    backgroundColor: "#000000aa",
    flex: 1,
    justifyContent: "flex-end",
  },
  rowTextimage_style: {
    flexDirection: 'row',
    marginTop: Scale(5),
    left: Scale(20),
    paddingVertical: Scale(15),
  },
  imageLock: {
    height: Scale(90),
    width: Scale(90),
  },
  privateAcStyle: {
    fontWeight: 'bold',
    fontSize: Scale(15),
  },
  privateAcMessageStyle: {
    fontWeight: '500',
    marginTop: Scale(5),
    fontSize: Scale(13),
  },
  image_style: {
    width: Scale(25),
    height: Scale(25)
  },
  imageBlock_style: {
    width: Scale(60),
    height: Scale(60)
  },
  textuser_style: {
    left: Scale(20),
    color: 'red',
    fontSize: Scale(18),
    fontWeight: '400'
  },
  textuserblack_style: {
    left: Scale(20),
    fontSize: Scale(18),
    fontWeight: '400'
  },
  greyText: {
    color: "grey"
  },
  greyImg: {
    tintColor: "grey"
  },
  blackImage: {
    tintColor: "black"
  },
  redImg: {
    tintColor: "red"
  },
  redText: {
    color: "red"
  },
  blackText: {
    color: "black"
  },
  noDataStyle:{
    flex:1, alignItems:'center', justifyContent:'center'
  },
  noDataTxt:{
    marginVertical:"40%",
  },
  fullSize: {
    flex:1
  }
});
// Customizable Area End
