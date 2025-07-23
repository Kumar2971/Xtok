import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  ActivityIndicator,
  SectionList,
  RefreshControl,
  SafeAreaView
} from "react-native";
import {
  left_arrow,
  down_arrow,
  profilePic,
  profilePic2,
  profilePic3,
  notificationLike,
  notificationUploadImg,
  ProfilePicture,
  thumbnailStatic
} from "./assets";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { translate } from "../../../components/src/i18n/translate";
import { Message } from "./assets";
import AlertModal from "../../../components/src/AlertModal";
// Customizable Area End

import NotificationsController, {
  Props,
  configJSON,
} from "./NotificationsController";

export default class Notifications extends NotificationsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // {item.attributes.contents === "follow"
    //     ? "started following you."
    //     : item.attributes.contents === "comment on Post"
    //         ? "commented on your post."
    //         : item.attributes.contents === "Like Your Post"
    //             ? "liked your video."
    //             : item.attributes.contents === "live"
    //                 ? "started a live."
    //                 : null}{" "}
    // Customizable Area End
  }

  // Customizable Area Start
  emptyText = () => {
    if (this.state.followingSwitch === true) {
      return translate("no_notifications");
    } else {
      return translate("no_notifications");
    }
  }
  emptyList = () => {
    if (!this.state.isLoading) {
      return (
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#000',
          }}>
            {this.emptyText()}
          </Text>
        </View>
      );
    } else return null;

  };
  renderHeadingText = (item: any) => {
    switch (item.attributes.contents) {
      case 'follow':
        return translate("startedFollowing")
      case 'comment on Post':
        return translate("commentedOnPost")
      case 'reply on comment':
        return translate("replyOnComment")
      case 'Like Your Post':
        return translate("liked_your_video")
      case 'live':
        return translate("started_live")
      case 'shared a Post':
        return translate("created_a_post")
      case 'tagged in a Post':
        return translate("taggedInPost")
      case 'invitation':
        return item.attributes.headings.split(" ").slice(7)[0] == "private" ? translate("invitePrivate") : translate("inviteLive")
      case 'live challenges invitation':
        return translate("invitechallenge")
      default:
        return ""
    }
  }
  renderNewButtons = (item: any) => {
    switch (item.attributes.contents) {
      case 'Like Your Post':
        return (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.likedImageBtnStyle]}
            onPress={() => {
              this.props.navigation.navigate('Comments', {
                type: 'Notification',
                isFromNotification: true,
                account_id: item?.attributes?.post?.data?.attributes?.account_id,
                post_id: item?.attributes?.post?.data?.id,
                isCommentPost: false,
              })
            }}>
            <Image
              source={
                item.attributes.post !== null && item.attributes.post.data.attributes.post_medias.thumnails.length > 0 ?
                  { uri: item.attributes.post.data.attributes.post_medias.thumnails[0] } : {}
              }
              resizeMode='contain' style={styles.likedImageStyle}
            />
          </TouchableOpacity>
        )
      case 'comment on Post':
      case 'reply on comment':
        return (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.likedImageBtnStyle}
            onPress={() => {
              this.props.navigation.navigate('Comments', {
                type: 'Notification',
                isFromNotification: true,
                account_id: item?.attributes?.post?.data?.attributes?.account_id,
                post_id: item?.attributes?.post?.data?.id,
                isCommentPost: true,
              })
            }}>
            <Image
              source={
                item.attributes.post !== null && item.attributes.post.data.attributes.post_medias.thumnails.length > 0 ?
                  { uri: item.attributes.post.data.attributes.post_medias.thumnails[0] } : {}}
              resizeMode='contain' style={styles.likedImageStyle} />
          </TouchableOpacity>
        )
      case 'shared a Post':
        return (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.likedImageBtnStyle}
            onPress={() => {
              this.props.navigation.navigate('Comments', {
                type: 'Notification',
                isFromNotification: true,
                account_id: item?.attributes?.post?.data?.attributes?.account_id,
                post_id: item?.attributes?.post?.data?.id,
                isCommentPost: false,
              })
            }}>
            <Image
              source={
                item?.attributes.post !== null && item.attributes.post.data?.attributes.post_medias.thumnails.length > 0 ?
                  { uri: item.attributes.post.data.attributes.post_medias.thumnails[0] } : {}}
              resizeMode='contain' style={styles.likedImageStyle} />
          </TouchableOpacity>
        )
      case 'invitation':
        return (
          item.attributes?.invitation_status == null ? <View>
            <TouchableOpacity testID="rejectButton" activeOpacity={0.6} style={[styles.watchBtnStyle, { backgroundColor: "red", marginBottom: 5 }]} onPress={() => {
              this.updateInviteStream("rejected", item?.attributes?.invite_id, "reject");
            }}>
              <Text style={styles.watchBtnText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity testID="acceptButton" activeOpacity={0.6} style={styles.watchBtnStyle} onPress={() => {
              this.handleLiveStreamInvitation(item);
            }}>

              <Text style={styles.watchBtnText}>Accept</Text>
            </TouchableOpacity>
          </View> : <></>
        )
      case 'live challenges invitation':
        return (
          item.attributes?.invitation_status == null ? <TouchableOpacity activeOpacity={0.6} style={styles.watchBtnStyle} onPress={() => {
            let ValidateMeeting = {
              name: "",
              roomId: item.attributes?.room_id,
              inviteId: item.attributes.invite_id
            }
            this.updateInviteChallenges(ValidateMeeting)
          }}>

            <Text style={styles.watchBtnText}>Accept</Text>
          </TouchableOpacity> : <></>
        )
      default:
        return null
    }
  }
  renderNotifications(item: any, index: number, followType: any) {
    const userPhoto = item.attributes?.notification_created_user?.data?.attributes?.photo;
    const source = userPhoto ? { uri: userPhoto } : ProfilePicture;

    return (
      <TouchableOpacity key={index} testID="notificationType0" onPress={() => {
        if (item.attributes.contents === "follow") {
          const newData = {
            attributes: {
              account_id: item?.attributes?.notification_created_user?.data?.id
            }
          }
          this.props.navigation.navigate("UserProfileBasicBlock", {
            data: newData
          })
          console.log(JSON.stringify(item))
        } else if (item.attributes.contents === "comment on Post" || item.attributes.contents === "reply on comment") {
          this.props.navigation.navigate('Comments', {
            type: 'Notification',
            isFromNotification: true,
            account_id: item?.attributes?.post?.data?.attributes?.account_id,
            post_id: item?.attributes?.post?.data?.id,
            isCommentPost: true,
          })
        } else if (item.attributes.contents === "Like Your Post" || item.attributes.contents === "shared a Post" || item.attributes.contents === 'tagged in a Post') {
          this.props.navigation.navigate('Comments', {
            type: 'Notification',
            isFromNotification: true,
            account_id: item?.attributes?.post?.data?.attributes?.account_id,
            post_id: item?.attributes?.post?.data?.id,
            isCommentPost: false,
          })
        }
      }}>
        <View style={[styles.newNotificationCon]} key={item.id}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={Platform.OS === "ios" && this.state.language == 'ar' && styles.notificationProfle_Ar}
            onPress={() => {
              const newData = {
                attributes: {
                  account_id: item?.attributes?.notification_created_user?.data?.id
                }
              }
              this.props.navigation.navigate("UserProfileBasicBlock", {
                data: newData
              })
            }}
          >
            <Image
              testID="user_photo"
              source={source}
              style={styles.notificationProfle}
            />
          </TouchableOpacity>
          <View
            style={[styles.newN2, this.state.language == 'ar' && {
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              // flexDirection:'row'
            }]}
          >
            <Text
              style={[styles.userNameMentionComment]}
              onPress={() => {
                const newData = {
                  attributes: {
                    account_id: item?.attributes?.notification_created_user?.data?.id
                  }
                }
                this.props.navigation.navigate("UserProfileBasicBlock", {
                  data: newData
                })
              }}>
              {item.attributes.headings.split(" ")[0]}
            </Text>
            <Text style={styles.notifyTxt}>
              {this.renderHeadingText(item)}
            </Text>
            <Text style={[{ color: '#bdbdbd' }, this.state.language == 'ar' && {
              marginHorizontal: 10
            }]}>{this.calculateTimeDifference(new Date(item?.attributes?.created_at))}</Text>
          </View>
          <View style={[styles.newN3]}>
            {/* {item.attributes.contents === 'follow' ?
            <TouchableOpacity style={this.state.followType === 'Follow' ? styles.watchBtnStyle : styles.messageBtnStyle} activeOpacity={0.6} >
              <Text style={this.state.followType === 'Follow' ? styles.watchBtnText : styles.messageBtnText}>{this.state.followType}</Text>
            </TouchableOpacity>
            :
            item.attributes.contents === 'following' ?
              <TouchableOpacity style={styles.messageBtnStyle} activeOpacity={0.6} >
                <Text style={styles.messageBtnText}>Message</Text>
              </TouchableOpacity>
              : item.attributes.contents === 'live' ?
                <TouchableOpacity style={styles.watchBtnStyle} activeOpacity={0.6} >
                  <Text style={styles.watchBtnText}>Watch</Text>
                </TouchableOpacity>: */}
            {this.renderNewButtons(item)}<Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderSectionHeader = ({ section }: any) => {
    return <Text style={[styles.newText, this.state.language == "ar" && styles.newText_ar]}>{section.title}</Text>;
  };

  calculateTimeDifference = (targetDate: any) => {
    const now: any = new Date();
    const diffInSeconds = Math.floor((now - targetDate) / 1000);

    const weeks = Math.floor(diffInSeconds / 604800);
    if (weeks >= 1) {
      return `${weeks}${translate("weekShorthand")}`;
    }

    const days = Math.floor(diffInSeconds / 86400);
    if (days >= 1) {
      return `${days}${translate("weekShorthand")}`;
    }

    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor(diffInSeconds / 60);

    if (hours >= 1) {
      return `${hours}${translate("hourShorthand")}`;
    }

    if (minutes >= 5) {
      return `${minutes}${translate("minuteShorthand")}`;
    }

    return `${translate("justNow")}`;
  };

  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.mainCon}>
        {/* <ScrollView style={styles.mainCon} contentContainerStyle={{flexGrow:1}} > */}
        <View style={styles.headerCon}>
          <View style={styles.headerView1}>
            <Image source={{}} style={styles.leftArrow} resizeMode="contain" />
          </View>
          <TouchableOpacity style={styles.headerView2} activeOpacity={0.6}>
            <Text style={styles.notificationText}>{translate("Notifications")}</Text>
            {/*<Image source={down_arrow} style={styles.downArrow} resizeMode='contain' />*/}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerView1}
            onPress={() => { this.props.navigation.navigate('ChatList') }}
          >
            <Image source={Message} style={styles.leftArrow} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        {/* // Customizable Area Start */}
        {/*<ScrollView showsVerticalScrollIndicator={false}>*/}
        <View style={styles.titleSection}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.followingSection,
              {
                borderBottomWidth:
                  this.state.followingSwitch === true ? 1 : 0.7,
                borderBottomColor:
                  this.state.followingSwitch === true ? "#fcb017" : "#6e706f"
              }
            ]}
            onPress={() => {
              this.setState({ followingSwitch: true })
              this.getFollowingData()
            }}
          >
            <Text
              style={[
                styles.followingSectionText,
                { color: this.state.followingSwitch === true ? "rgba(38, 38, 38, 1)" : "rgba(0, 0, 0, 0.4000000059604645)" }
              ]}
            >
              {translate("Following")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.youSection,
              {
                borderBottomWidth:
                  this.state.followingSwitch === false ? 1 : 0.7,
                borderBottomColor:
                  this.state.followingSwitch === false ? "#fcb017" : "#6e706f"
              }
            ]}
            onPress={() => {
              this.setState({ followingSwitch: false })
              this.getNotifications()
            }}
          >
            <Text
              style={[
                styles.youSectionText,
                { color: this.state.followingSwitch === false ? "rgba(38, 38, 38, 1)" : "rgba(0, 0, 0, 0.4000000059604645)" }
              ]}
            >
              {translate('you')}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => { this.props.navigation.navigate('FollowRequest') }}>
          <View style={styles.followRequestCon}>
            <Text style={styles.followRequestText}>{translate("follow_request")}</Text>
            <View style={styles.followRequestCountCon}>
              <Text style={styles.followRequestCountText}>{this.state.followRequest.length === 0 || this.state.followRequest === undefined ? 0 : this.state.followRequest.total_requests_count}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* {this.state.followingSwitch === false ? ( */}
        <View style={{ flex: 1, flexGrow: 1 }}>
          {this.state.notificationLoader === 0 ? (
            <View
              style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <SectionList
              testID="sectionList"
              style={{
                flex: 1,
                flexGrow: 1,
                paddingHorizontal: 10
              }}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 15,
              }}
              onEndReached={() => {
                if (this.state.currentPage < this.state.totalPage) {
                  this.setState({ currentPage: this.state.currentPage + 1 }, () => {
                    this.getNotifications();
                  });
                }
              }}
              onEndReachedThreshold={0.2}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isLoading}
                  onRefresh={() => {
                    this.state.followingSwitch === true ? this.getFollowingData() : this.setState({ currentPage: 1 }, () => {
                      this.getNotifications()
                    })
                  }}
                />}
              sections={this.state.groupLists}
              renderItem={({ item, index }) => this.renderNotifications(item, index, this.state.followType)}
              keyExtractor={item => item.id}
              refreshing={this.state.isLoading}
              ListEmptyComponent={this.emptyList()}
              // onRefresh={() => { this.state.followingSwitch === true ? this.getFollowingData() : this.getNotifications() }}
              renderSectionHeader={this.renderSectionHeader}
            />
          )}
        </View>
        {/* ) : (
          <View>
            <View style={styles.followingCon}>
              <TouchableOpacity
                style={styles.followingProfileCon}
                activeOpacity={0.6}
              >
                <Image
                  source={ProfilePicture}
                  style={styles.notificationProfle}
                />
              </TouchableOpacity>
              <View style={styles.followingTextCon}>
                <Text style={styles.userNameMentionComment}>ReactN</Text>
                <Text numberOfLines={1}>Im a React Native Developer</Text>
              </View>
              <View style={styles.followingMainBtnCon}>
                <TouchableOpacity
                  style={styles.followingBtnStyle}
                  activeOpacity={0.6}
                >
                  <Text style={[styles.messageBtnText, { color: "#ffbf00" }]}>
                    Following
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )} */}
        {/*</ScrollView>*/}
        <AlertModal alertModal={this.state.alertModal} onPress2={() => { this.setState({ alertModal: { openAlertModal: false } }) }}
          btnTitle2={"OK"} />

        {/* </ScrollView> */}
        {/* // Customizable Area End */}
      </SafeAreaView>

      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  followingBtnStyle: {
    backgroundColor: "#fff",
    width: "80%",
    height: responsiveHeight(4.2),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.3,
    borderColor: "#ffbf00",
    borderRadius: 15,
    elevation: 2
  },
  followingMainBtnCon: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center"
  },
  followingTextCon: {
    width: "45%",
    justifyContent: "center",
    paddingLeft: "3.5%",
    paddingRight: "1.5%"
  },
  followingProfileCon: {
    width: "15%",
    alignItems: "flex-end"
  },
  followingCon: {
    flexDirection: "row",
    width: "100%",
    marginTop: responsiveHeight(1),
    paddingHorizontal: "4%"
  },
  multiProfle2: {
    marginTop: responsiveHeight(-3),
    left: responsiveWidth(3),
    borderWidth: 2,
    borderColor: "white"
  },
  multiProfle: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  likeReplyCon: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: responsiveWidth(2)
  },
  replyComment: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: "bold",
    color: "grey",
    paddingLeft: responsiveWidth(3)
  },
  notificationLikeIcon: {
    height: 20,
    width: 20,
    marginTop: responsiveHeight(1)
  },
  userNameComment: {
    color: "blue"
  },
  userNameMentionComment: {
    fontWeight: "bold",
    color: "black",
    textAlign: "left"
  },
  newN2CommentCon: {
    width: "55%",
    justifyContent: "center",
    paddingHorizontal: "1.5%"
  },
  messageBtnText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
    color: "#000"
  },
  messageBtnStyle: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    height: responsiveHeight(4),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: responsiveFontSize(3),
    marginRight: responsiveFontSize(2),
  },
  likedImageBtnStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  likedImageStyle: {
    height: 40,
    width: 40,
  },
  newN2Text: {
    paddingLeft: responsiveWidth(1)
  },
  watchBtnText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
    color: "#fff"
  },
  watchBtnStyle: {
    backgroundColor: "#e8b015",
    borderRadius: 5,
    height: responsiveHeight(4),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: responsiveFontSize(3),
    marginRight: responsiveFontSize(2),
  },
  newN3: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  newN2: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "1.5%"
  },
  newTextCon: {
    // paddingVertical: '4%',
  },
  newNotificationCon: {
    flexDirection: "row",
    alignItems: 'center',
    paddingBottom: responsiveHeight(2)
  },
  newText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: "700",
    color: "#000",
    paddingVertical: responsiveHeight(2),
    backgroundColor: 'white'
  },
  newText_ar: {
    textAlign: "left",
    paddingLeft: 10,
  },
  notificationProfle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  notificationProfle_Ar: {
    marginLeft: 10,
  },
  newCon: {
    paddingHorizontal: "5%",
    backgroundColor: "#fff",
    justifyContent: "center",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1
  },
  followRequestCountText: {
    color: "#fff",
    fontWeight: "600"
  },
  followRequestCountCon: {
    backgroundColor: "#e8b015",
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2
  },
  followRequestText: {
    fontSize: responsiveFontSize(2),
    color: "#000",
    fontWeight: "600"
  },
  followRequestCon: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    height: responsiveHeight(7),
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey"
  },
  youSectionText: {
    fontSize: responsiveFontSize(2),
    color: "#000",
    fontWeight: "700"
  },
  followingSectionText: {
    fontSize: responsiveFontSize(2),
    color: "#000",
    fontWeight: "700"
  },
  youSection: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "yellow",
    borderBottomWidth: 1
  },
  followingSection: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center"
  },
  notificationText: {
    fontSize: responsiveFontSize(2.2),
    color: "#000",
    fontWeight: "bold"
  },
  downArrow: {
    height: 10,
    width: 18,
    left: responsiveWidth(1)
  },
  leftArrow: {
    height: 30,
    width: 30,
  },
  titleSection: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    height: responsiveHeight(7),
    borderBottomWidth: 0.5,
    borderBottomColor: "#fafafa",
    borderTopWidth: 0.5
  },
  headerView1: {
    alignItems: "center",
    justifyContent: "center"
  },
  headerView2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  headerCon: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        height: responsiveHeight(7.5)
      },
      android: {
        height: responsiveHeight(6)
      }
    }),
    backgroundColor: "#fff"
  },
  mainCon: {
    flex: 1,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        // marginTop:'5%'
      }
    })
  },
  notifyTxt: {
    textAlign: "left"
  }
});
// Customizable Area End