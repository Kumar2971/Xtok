import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  Platform,
  SafeAreaView,
  Image,
  AlertButton,
  Modal,
  StatusBar,
  TextInput,
  Alert,
  Dimensions,
  Clipboard,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import Scale from "../../../components/src/Scale";
//@ts-ignore
import { RefObject } from "react";
import {
  search,
  audio,
  closeicon,
  musicalnotes,
  whiteheart,
  commenticon,
  share,
  blackEmoji,
  onelineuparrow,
  report,
  saveVideo,
  addToFavorites,
  arrowLeft,
  copylink,
  redheart,
  nocommentsicon,
  avatar,
  arrowUp,
  arrowDown,
  upVoteGrey,
  upVoteYellow,
  downVoteBlue,
  downVoteGrey,
  bookMarked,
  emptySearch,
  notInterested,
  attentionIcon,
  markNotInterested
} from "./assets";
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import ReactNativeModal from "react-native-modal";
import { VideoComponent } from "../../../components/src/VideoComponent";
import Share from "react-native-share";
// @ts-ignore
import EmojiBoard from "react-native-emoji-board";
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
import {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import ParsedText from "react-native-parsed-text";
import moment from "moment";
import { getStorageData } from "../../../framework/src/Utilities";
import { translate } from "../../../components/src/i18n/translate";
import AlertModal from "../../../components/src/AlertModal";
import { RNToasty } from "react-native-toasty";
const baseURL = require("../../../framework/src/config.js").baseURL;
// Customizable Area End

import CommentController, { Props, configJSON } from "./CommentsController";

export default class Comments extends CommentController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  inputRef = React.createRef<TextInput>();
  commentsFlatlistRef = React.createRef<FlatList<any>>();

  backGroundImg = () => {
    return (
      <View style={styles.headerContainer}>
        {/* <Image source={plus1} /> */}
        <View style={styles.headerText}>
          <Text style={[styles.headerTextfont,
          this.state.isFollowing && { fontWeight: "900" }
          ]}>{translate("following")}</Text>
          <View
            style={{
              width: 1,
              height: Scale(20),
            }}
          />
          <TouchableOpacity
            testID="forYouBtnId"
            onPress={() => {
              this.setState(
                {
                  refreshList: true,
                  page: 1,
                  scrollInfo: { isViewable: true, index: 0 },
                  isFollowing: false,
                },

                () => {
                  this.flatListRef.current?.scrollToIndex({ animated: true, index: 0 });
                  this.getPostData();
                }
              );
            }}
          >
            <Text
              style={[
                styles.headerTextfont,
                { color: "white" },
                this.state.isFollowing === false && { fontWeight: "900" }
              ]}
            >
              {translate("for_you")}
            </Text>
          </TouchableOpacity>
        </View>
        <Image source={search} />
      </View>
    );
  };

  onCancel() {
    this.setState({ visible: false });
  }

  SharemodalHeader = (item: any) => {
    return (
      <Modal
        //@ts-ignore
        testID="shareModalId"
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setState({ modalVisible: false, reportModalVisible: false });
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {this.renderShareappFlatList(
              item?.attributes
            )}
            {/* Report post here */}
            {this.downloadHeader()}
            {this.buttonHeader()}
          </View>
        </View>
      </Modal>
    );
  };


  downloadHeader = () => {
    const userID = this.state.userAccountId
    const isPostOwner = Boolean(this.state.PostData[this.state.scrollInfo.index]?.attributes.account_id == userID)
    const dataItem = this.state.PostData[this.state.scrollInfo.index]

    return (
      <View style={styles.downloadcontainer}>
        <TouchableWithoutFeedback testID="headerfeedbackBtn" style={styles.downloadBox} onPress={() => {
          this.setState({ reportModalVisible: false })
        }}>
          <View style={styles.downloadBox}>

            {!isPostOwner && <TouchableOpacity testID="reportBtn" style={styles.report_item}
              onPress={() => {
                this.setState({ modalVisible: false, reportModalVisible: true })
              }}
            >
              <View style={styles.imagebox}>
                <Image source={report} style={styles.download_image} />
                <Text style={styles.text_download}>{translate("report")}</Text>
              </View>
            </TouchableOpacity>}
            <TouchableOpacity style={styles.report_item}
              testID="bookmarkBtn"
              onPress={() => {
                if (!dataItem?.attributes.bookmarked) {
                  this.bookMarkPost().then(() => {
                    const listOfPost = this.state.PostData;
                    listOfPost[this.state.scrollInfo.index].attributes.bookmarked = true
                    this.setState({
                      PostData: listOfPost,
                      modalVisible: false
                    })
                  });
                } else {
                  this.unBookMarkPost().then(() => {
                    if (this.props.route.params.type && this.props.route.params.type === 'bookmark') {
                      const listOfPost = this.state.PostData
                      const listAfterDelete = listOfPost.filter((item: any) => item.id !== listOfPost[this.state.scrollInfo.index].id);
                      this.setState({
                        PostData: listAfterDelete,
                        modalVisible: false
                      })

                    } else {
                      const listOfPost = this.state.PostData
                      listOfPost[this.state.scrollInfo.index].attributes.bookmarked = false
                      this.setState({
                        PostData: listOfPost,
                        modalVisible: false
                      })
                    }
                  })
                }
              }}
            >
              <View style={styles.imagebox}>
                {(dataItem?.attributes.bookmarked) ? <Image source={bookMarked} style={styles.download_image} /> : <Image source={addToFavorites} style={styles.download_image} />}
                <Text style={styles.text_download}>{translate("Bookmark")}</Text>
              </View>
            </TouchableOpacity>
            {!isPostOwner && <TouchableOpacity testID="notInterestedBtn" style={styles.report_item} onPress={() => this.notInterested()}>
              <View style={styles.imagebox}>
                <Image source={this.props.route.params.type === 'NotInterestedActivity' ? markNotInterested : notInterested} style={styles.download_image} />
                <Text style={styles.text_download}>{this.props.route.params.type === 'NotInterestedActivity' ? translate("Marked_Not_Interested") : translate("Not_Interested")}</Text>
              </View>
            </TouchableOpacity>}
            <TouchableOpacity testID="saveVideoBtn" style={styles.report_item} onPress={() => this.saveVideo()}>
              <View style={styles.imagebox}>
                <Image source={saveVideo} style={styles.download_image} />
                <Text style={styles.text_download}>{translate("Save_video")}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  buttonHeader = () => {
    return (
      <View style={styles.btncontainer}>
        <TouchableOpacity
          testID="cancelBtn"
          style={styles.button}
          onPress={() => this.setState({ modalVisible: false })}
        >
          <Text style={styles.btnText}>{translate("cancel")}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  holdCommentFunc = (isPostOwner: any, commentSettings: string) => {
    if (isPostOwner && commentSettings === "Hold all comments for review") {
      return (
        <View style={styles.comment_header_container}>
          <TouchableOpacity testID="holdBtnId" onPress={() => {
            this.setState({
              holdReviewOpen: !this.state.holdReviewOpen, page: 1
            }, () => {
              this.getHoldedComments()
            })
          }}>
            <Image
              source={attentionIcon}
              style={styles.attention_icon}
            />
          </TouchableOpacity>
        </View>
      )
    }
  }

  holdReviewOpen = () => {
    if (this.state.holdReviewOpen) {
      return (
        <View style={styles.commentListContainerStyle}>
          {this.approveCommentDetailCell()}
        </View>
      )
    } else {
      return (
        <View style={styles.commentListContainerStyle}>

          {this.state.isShowUserList &&
            !this.state.isSuggetionLoading &&
            this.renderUserTagList()}
          {
            this.state.isShowTagsList && !this.state.isSuggetionLoading &&
            this.renderTagList()
          }
          {this.state.isSuggetionLoading && (
            <ActivityIndicator size="large" color="#FFC9247f" />
          )}
          {!this.state.isShowUserList &&
            !this.state.isSuggetionLoading &&
            this.commentDetailCell()}
        </View>
      )
    }
  }

  commentsPalceHolder = () => {
    if (this.state.isCommentReply) {
      return translate("reply_to_comment")
    } else {
      return translate("add_Comment")
    }
  }

  onPressUpArrow = () => {
    if (this.state.isCommentReply === true) {
      let index = this.state.totalComments.findIndex((comment: any) => comment.id === this.state.selectedCommentId)
      let newComments = JSON.parse(JSON.stringify(this.state.totalComments))
      newComments[index].attributes.repliesCount += 1;
      this.setState({ totalComments: newComments }, () => {
        this.createCommentReply(this.state.selectedCommentId);
        this.setState({ isCommentReply: false, isOpen: false });
        this.getCommentReplies(this.state.selectedCommentId);
        this.hideKeyboard();
      })
    } else {
      this.createComment();
      this.hideKeyboard();
      this.setState({ isOpen: false });
    }
  }
  imageSource = () => {
    if (this.state.profileData.attributes?.photo) {
      return { uri: this.state.profileData.attributes.photo }
    } else {
      return avatar
    }
  }

  textAlignFun = () => {
    if (this.state.language == "ar") {
      return 'right'
    } else {
      return 'left'
    }
  }
  // comment section
  comment_ModalHandler = () => {
    const userID = this.state.userAccountId
    const isPostOwner = Boolean(this.state.PostData[this.state.scrollInfo.index]?.attributes?.account_id == userID)
    const commentSettings = this.state.PostData[this.state.scrollInfo.index]?.attributes?.comment_setting
    return (
      <Modal
        //@ts-ignore
        testID="commentModalID"
        animationType="fade"
        transparent={true}
        visible={this.state.commentModalVisible}
        onRequestClose={() => {
          this.setState({ commentModalVisible: false });
        }}
      >
        <TouchableWithoutFeedback
          testID="feedBackBtnId"
          onPress={() => this.feedbackBtnPress()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.comment_ModalView}>
              <View style={styles.comment_header_container}>
                {
                  commentSettings !== "Hold all comments for review" && (
                    <View />
                  )
                }
                {
                  !isPostOwner && commentSettings === "Hold all comments for review" && (
                    <View />
                  )
                }
                {
                  this.holdCommentFunc(isPostOwner, commentSettings)
                }
                <Text style={styles.commentText}>
                  <Text style={styles.number_of_comment}>
                    {this.state.totalCommentCount} {translate("Comments")}
                  </Text>{" "}
                </Text>

                <TouchableOpacity
                  testID="closecommentBtnID"
                  onPress={() =>
                    this.setState({
                      commentModalVisible: false,
                      totalComments: [],
                      totalCommentCount: "",
                      page: 1
                    })
                  }
                >
                  <Image source={closeicon} />
                </TouchableOpacity>
              </View>
              {this.holdReviewOpen()}

              {Boolean(this.state.PostData[this.state.scrollInfo.index]?.attributes?.comment_setting !== 'Disable comments')
                &&
                <KeyboardAvoidingView
                  behavior="padding"
                  style={
                    [Platform.OS === "ios" && (
                      this.state.isKeyboardVisible && { flexGrow: 1 }
                      , {
                        marginBottom: 15
                      }
                    )]

                  }
                >
                  <View style={styles.typeinputContainer}>
                    <Image
                      source={this.imageSource()}
                      style={styles.image_profile}
                    />
                    <View style={styles.typeinputTextbox}>
                      <TextInput
                        testID="commentInputID"
                        placeholder={
                          this.commentsPalceHolder()
                        }
                        value={this.state.comment}
                        style={[styles.typetextinput, { textAlign: this.textAlignFun() }]}
                        multiline={false}
                        blurOnSubmit={false}
                        ref={this.inputRef as RefObject<TextInput>}
                        onChangeText={(e) => {
                          this.onCommentChange(e);
                        }}
                        onTouchStart={() => this.feedbackBtnPress()}
                      />
                      <View style={styles.typeimageRowBox}>
                        <TouchableOpacity
                          testID="emojiBtnId"
                          onPress={() => this.setState({ isOpen: true })}
                        >
                          <Image source={blackEmoji} style={styles.inputimage} />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <TouchableOpacity
                      testID="upArrowBtnId"
                      disabled={this.state.comment.length === 0 || this.state.commentLoading}
                      style={[
                        styles.onelineuparrow_box,
                        { opacity: this.state.comment.length === 0 ? 0.5 : 1 },
                      ]}
                      onPress={() => this.onPressUpArrow()}
                    >
                      <Image
                        source={onelineuparrow}
                        resizeMode="contain"
                        style={styles.onelineuparrow}
                      />
                    </TouchableOpacity>
                  </View>
                  {Platform.OS === "ios" && this.state.isKeyboardVisible && (
                    <View style={{ height: 330 }} />
                  )}
                </KeyboardAvoidingView>
              }

              {this.state.isOpen && (


                <>

                  <View
                    style={{
                      height: 280,
                      width: "100%",
                      position: "relative"
                    }}
                  >

                  </View>

                  <EmojiBoard
                    testID="emojiBoardId"
                    hideBackSpace={false}
                    showBoard={this.state.isOpen}
                    onClick={(emoji: any) => {
                      this.setState({
                        comment: this.state.comment + emoji.code,
                        // isOpen:false

                      });
                    }}
                    containerStyle={{
                      zIndex: 1000,
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: "#eee",
                      height: 280,
                    }}
                  />
                </>

              )}

            </View>
          </View>
        </TouchableWithoutFeedback>

      </Modal>
    );
  };

  searchTag = (commentText: any) => {
    const leftOfCommentText = commentText.split(" ");
    if (
      leftOfCommentText.length > 0 &&
      leftOfCommentText[leftOfCommentText.length - 1].startsWith("@")
    ) {
      clearTimeout(this.timerForSearch);
      this.proceedToSearch(
        leftOfCommentText[leftOfCommentText.length - 1].replace("@", "")
      );
      // this.searchInList(txt)
    } else {
      this.setState({ isShowUserList: false, accountSuggetionList: [] });
    }
  }

  backSpaceSearchTag = (commentText: any) => {
    if (commentText !== "") {
      const leftOfCommentText = commentText.split(" ");
      if (
        leftOfCommentText.length > 0 &&
        leftOfCommentText[leftOfCommentText.length - 1].startsWith("@")
      ) {
        this.setState({ isShowUserList: true });
        clearTimeout(this.timerForSearch);
        this.proceedToSearch(
          leftOfCommentText[leftOfCommentText.length - 1].replace("@", "")
        );
        // this.searchInList(txt)
        return;
      }
    }
    this.setState({
      comment: commentText,
      isShowUserList: false,
      isShowTagsList: false,
      accountSuggetionList: [],
      tagsSuggetionList: [],
    });
  }

  onSearchText = (commentText: any) => {
    this.setState({ comment: commentText }, () => {
      if (commentText.length < 4) {
        return;
      }
      // for search
      if (
        commentText !== "" &&
        commentText.lastIndexOf("@") === commentText.length - 1
      ) {
        //show flatlist
        clearTimeout(this.timerForSearch);
        this.proceedToSearch("");
      }
      else if (commentText !== "" && this.state.isShowUserList) {
        //on backspace - check if current text is eligible for tag search or not
        this.searchTag(commentText)
      }
      else {
        //on backspace - check if current text is eligible for tag search or not
        this.backSpaceSearchTag(commentText)
      }
    });
  }

  onCommentChange = (commentText: string) => {
    if (commentText === "") {
      this.apiSearchAccount = "";
      clearTimeout(this.timerForSearch);
      this.setState({
        comment: "",
        selectedAccountList: [],
        selectedTagsList: [],
        isShowUserList: false,
        isShowTagsList: false,
        accountSuggetionList: [],
        tagsSuggetionList: [],
      });
    } else {
      if (
        commentText.length < this.state.comment.length &&
        this.state.selectedAccountList.length > 0
      ) {
        //it is backspace so remove tagged users from list
        const leftOfCommentText = commentText.split(" ");
        if (
          leftOfCommentText.length > 0 &&
          leftOfCommentText[leftOfCommentText.length - 1].startsWith("@")
        ) {
          const filteredArray = this.state.selectedAccountList.filter(
            (item: any) => {
              return !(
                commentText.length - 1 >= item.startIndex &&
                commentText.length - 1 <= item.endIndex
              );
            }
          );
          filteredArray.length > 0 &&
            this.setState({ selectedAccountList: filteredArray });
        }
      }
      this.onSearchText(commentText)
    }
  };

  proceedToSearch(searchTxt: string) {
    this.timerForSearch = setTimeout(() => {
      this.searchAccountsByName(searchTxt);
    }, 500);
  }

  emptyList = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: Scale(50),
        }}
      >
        <Image
          source={nocommentsicon}
          style={{ width: Scale(100), height: Scale(100) }}
        />
        {this.state.PostData[this.state.scrollInfo.index]?.attributes?.comment_setting === 'Disable comments' ? (
          <>
            <Text style={{ fontWeight: "bold" }}>{translate("Comments_are_disabled")}</Text>
          </>
        ) :
          (<>
            <Text style={{ fontWeight: "bold" }}>{translate("no_Comments_yet")}</Text>
            <Text>{translate("go_ahead_start_the_conversion")}</Text>
          </>
          )}
      </View>
    );
  };

  emptyHeldCommentsList = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: Scale(50),
        }}
      >
        <Image
          source={nocommentsicon}
          style={{ width: Scale(100), height: Scale(100) }}
        />
        <>
          <Text style={{ fontWeight: "bold" }}>{translate("No_Hold_Comments_Yet")}</Text>
          <Text>{translate("There_are_no_comments_for_review_yet")}</Text>
        </>
      </View>
    )
  }

  commentDetailCell = () => {
    return (
      <FlatList
        //@ts-ignore
        testID="totalCommentsFlatlist"
        ListEmptyComponent={() => this.emptyList()}
        data={this.state.totalComments}
        refreshing={this.state.commentLoaderVisible}
        onRefresh={() => this.onCommentsRefresh()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => this.commentDetails(item, index)}
        keyExtractor={(item: any, index: any) => index}
        ref={this.commentsFlatlistRef}
        scrollEventThrottle={0.2}
        onEndReached={this.onEndreachedComments}
      />
    );
  };


  approveCommentDetailCell = () => {
    return (
      <FlatList
        testID="heldedCommentsFlatlist"
        ListEmptyComponent={() => this.emptyHeldCommentsList()}
        data={this.state.holdedComments}
        onEndReached={this.onEndreachedHoldedComments}
        refreshing={this.state.commentLoaderVisible}
        onRefresh={() => this.onCommentsRefresh()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => this.approveCommentDetails(item, index)}
        keyExtractor={(item: any) => item.id}
        scrollEventThrottle={0.2}
        ref={this.commentsFlatlistRef}
      />
    )
  }


  renderTagsItem = ({ item, index }: any) => {
    return (<TouchableOpacity
      testID="searchNameBtnId"
      onPress={() => {
        const newText = this.state.comment.substring(0, this.state.comment.lastIndexOf('#')) + `#${item?.attributes?.name || ''} `
        item.startIndex = this.state.comment.substring(0, this.state.comment.lastIndexOf('#')).length - 1//needed to remove tag
        item.endIndex = newText.length - 1//needed to remove tag
        this.setState({ isShowTagsList: false, selectedTagsList: [...this.state.selectedTagsList, item] }, () => {
          this.setState({ comment: newText })
        })
      }}>
      <Text
        style={{
          fontSize: Scale(16),
          padding: 15,
        }}>
        #{item?.attributes?.name}
      </Text>
    </TouchableOpacity>)
  }

  renderTagList = () => {
    return (
      <FlatList
        testID="tagsSuggetionListFlatlist"
        data={this.state.tagsSuggetionList}
        keyExtractor={(item: any, index) => index.toString()}
        renderItem={this.renderTagsItem}
      />
    )
  }

  renderUserTagList = () => {
    return (
      <FlatList
        testID="userTagFlatlist"
        data={this.state.accountSuggetionList}
        keyExtractor={(item: any, index) => index.toString()}
        renderItem={({ item, index }: any) => this.renderUserItem(item, index)}
      />
    );
  };

  renderUserItem = (item: any, index: number) => {
    return (
      <TouchableOpacity
        testID="userNameBtn"
        onPress={() => {
          const newText =
            this.state.comment.substring(
              0,
              this.state.comment.lastIndexOf("@")
            ) + `@${item.user_name || ""} `;
          item.startIndex =
            this.state.comment.substring(0, this.state.comment.lastIndexOf("@"))
              .length - 1; //needed to remove tag
          item.endIndex = newText.length - 1; //needed to remove tag
          this.setState(
            {
              isShowUserList: false,
              selectedAccountList: [...this.state.selectedAccountList, item],
            },
            () => {
              this.setState({ comment: newText });
            }
          );
        }}
      >
        <Text
          style={{
            fontSize: Scale(16),
            padding: 15,
          }}
        >
          @{item?.user_name}
        </Text>
      </TouchableOpacity>
    );
  };

  accountData = async (item: any) => {
    const userID = await getStorageData("userID", false);
    if (userID.toString() === item.attributes.account_id.toString()) {
      return null;
    } else {
      return item;
    }
  }

  arrowImages = (item: any, index: number) => {
    if (this.state.totalComments[index].open) {
      return (
        <Image source={arrowUp} style={styles.replacearrowimage} />
      )
    } else {
      return (
        <Image source={arrowDown} style={styles.replacearrowimage} />
      )
    }
  }

  voteTextStyle = (item: any) => {
    if (item.attributes.upvoted) {
      return '#FFC925';
    } else if (item.attributes.downvoted) {
      return '#413DFC';
    } else {
      return '#c4c0c0';
    }
  }

  totalVote = (item: any, index: number) => {
    if (this.state.voteLoading && this.state.selectedCommentIndex === index) {
      return (
        <ActivityIndicator color="#c4c0c0" />
      )
    } else {
      return <Text
        style={[styles.ratingText, { color: this.voteTextStyle(item) }]}>
        {item.attributes.totalvotecount || 0}
      </Text>
    }
  }

  imageSourceFunc = (item: any) => {
    if (item?.attributes?.photo) {
      return { uri: item.attributes.photo }
    } else {
      return avatar
    }
  }

  profileTextStyle = () => {
    if (this.state.language == "ar") {
      return styles.textAlign
    }
  }

  viewRepliesText = (item: any, index: number) => {
    if (this.state.totalComments[index].open) {
      return (
        <Text style={styles.replaceText}>
          {"Hide replies"} (
          {
            this.state.totalComments[index].attributes.repliesCount
          }
          )
        </Text>
      )
    } else {
      return (
        <Text style={styles.replaceText}>
          {translate("view_replies")} (
          {this.state.totalComments[index].attributes.repliesCount}
          )
        </Text>
      )
    }
  }

  changeLocaleBasedOnAppSetting = (createdDate: moment.MomentInput) => {
    const { language } = this.state;
    if (language === "ar") {
      moment.updateLocale("en", {
        relativeTime: {
          future: 'في %s',
          past: 'منذ %s',
          s: 'الآن',
          m: 'دقيقة واحدة',
          mm: '%d دقائق',
          h: 'ساعة واحدة',
          hh: '%d ساعات',
          d: 'يوم واحد',
          dd: '%d أيام',
          M: 'شهر واحد',
          MM: '%d أشهر',
          y: 'سنة واحدة',
          yy: '%d سنوات',
        },
      })
      return moment(createdDate).fromNow();
    } else {
      moment.updateLocale("en", {
        relativeTime: {
          future: "in %s",
          past: "%s ",
          s: "just now",
          m: "%dm",
          mm: "%dm",
          h: "%dh",
          hh: "%dh",
          d: "%dd",
          dd: "%dd",
          M: "a month",
          MM: "%d months",
          y: "y",
          yy: "%d y",
        },
      })
      return moment(createdDate).fromNow();
    }
  }

  commentDetails = (item: any, index: number) => {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.profileRowContainer}>
          <View style={styles.rowProfile}>
            <TouchableOpacity
              testID="profileImgBtn"
              onPress={async () => {
                this.setState({ commentModalVisible: false });
                const data = await this.accountData(item);
                this.props.navigation.navigate("UserProfileBasicBlock", {
                  data: data,
                  showTab: this.showTabData()
                });
              }}
            >
              <Image
                source={this.imageSourceFunc(item)}
                style={styles.image_profile}
              />
            </TouchableOpacity>
            <View style={styles.profileText}>
              <TouchableOpacity
                testID="accountNameBtn"
                onPress={async () => {
                  this.setState({ commentModalVisible: false });
                  const data = await this.accountData(item);
                  this.props.navigation.navigate("UserProfileBasicBlock", {
                    data: data,
                    showTab: this.showTabData()
                  });
                }}
              >
                <Text style={[styles.profileTextName, this.profileTextStyle()]}>
                  {item?.attributes?.account?.full_name}
                </Text>
              </TouchableOpacity>
              <View style={styles.horizontalCommentText}>
                <>
                  <ParsedText
                    testID="parseTextId"
                    onLongPress={() =>
                      this.setState({ deleteCommentModalVisible: true, selectedCommentIdToBeDeleted: item.attributes.id, selectedItem: item })
                    }
                    style={[styles.profileTextChat, styles.textAlign]}
                    parse={[
                      {
                        pattern: /@([\w\d.\-_]+)?/g,
                        style: { color: "black", fontWeight: "bold" },
                        onPress: (text: string, index: number) => {
                          this.handleNamePress(
                            text,
                            index,
                            item?.attributes?.taggings
                          );
                        },
                      },
                    ]}
                  >
                    {item?.attributes?.comment}
                  </ParsedText>
                  <Text
                    style={{
                      marginLeft: Scale(5),
                      color: "#c4c0c0",
                      marginTop: Scale(8),
                    }}
                  >
                    {this.changeLocaleBasedOnAppSetting(item?.attributes?.created_at)}
                  </Text>
                </>
              </View>
              <TouchableOpacity
                testID="replyBtnID"
                style={[styles.replaceRow]}
                onPress={() => {
                  this.replyButtonPress(item, index)
                }}
              >
                {this.viewRepliesText(item, index)}
                {this.arrowImages(item, index)}
              </TouchableOpacity>
              {this.state.totalComments[index]?.open && (
                <FlatList
                  testID="commentReplyFlatlist"
                  data={
                    this.state.totalComments[index]?.attributes?.replies || []
                  }
                  horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item, index }: { item: any, index: number }) => {
                    return (
                      <View key={index} style={styles.repliesContainer}>
                        <TouchableOpacity
                          testID="replyprofileBtn"
                          style={{ flexDirection: "row" }}
                          onPress={async () => {
                            this.setState({ commentModalVisible: false });
                            const userID = await getStorageData("userID", false);
                            this.props.navigation.navigate(
                              "UserProfileBasicBlock",
                              {
                                data: {
                                  attributes: {
                                    account_id:
                                      userID?.toString() ===
                                        item.attributes.account_id?.toString()
                                        ? null
                                        : item.attributes.account_id,
                                    showTab: this.showTabData()

                                  },
                                },
                              }
                            );
                          }}
                        >
                          <Image
                            source={item.attributes.photo ? { uri: item.attributes.photo }
                              : avatar}
                            style={styles.replyImage_profile}
                          />
                          <Text style={{ marginLeft: Scale(6) }}>
                            {item.attributes.account.full_name}
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.repliesContainer}>
                          <TouchableWithoutFeedback
                            testID="parseCommentBtnID"
                            onLongPress={
                              () => this.setState({ deleteCommentModalVisible: true, selectedCommentIdToBeDeleted: item.id, selectedItem: item })
                            }
                            style={{
                              flexDirection: "row",
                              width: "100%",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                width: "100%",
                              }}>
                              <ParsedText style={{
                                marginLeft: Scale(11)
                              }}>
                                {item?.attributes.comment}
                              </ParsedText>
                              <Text style={styles.dateText}>
                                {/* @ts-ignore */}
                                {moment(item.attributes.created_at).fromNow(
                                  // @ts-ignore
                                  moment.updateLocale("en", {
                                    relativeTime: {
                                      future: "in %s",
                                      past: "%s ",
                                      s: "just now",
                                      m: "%dm",
                                      mm: "%dm",
                                      h: "%dh",
                                      hh: "%dh",
                                      d: "%dd",
                                      dd: "%dd",
                                      M: "a mth",
                                      MM: "%d mths",
                                      y: "y",
                                      yy: "%d y",
                                    },
                                  })
                                )}
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
                    );
                  }}
                />
              )}

              <TouchableWithoutFeedback
                testID="addReplyCommentBtnID"
                style={styles.repliesContainer}
                onPress={() => {
                  this.getCommentReplies(item.id)
                  this.setState(
                    {
                      isCommentReply: true,
                      selectedCommentId: item.id,
                    },
                    () => this?.inputRef?.current?.focus()
                  );
                }}
              >
                <Text style={[styles.addYourReply, styles.repliesContainer, this.state.language == 'ar' && { maxWidth: 70, direction: 'rtl', paddingLeft: 0 }]}>

                  {translate("add_your_reply")}
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <TouchableOpacity
              testID="upVotedBtnId"
              disabled={this.state.voteLoading}
              onPress={() => this.setState({ commentID: item?.id }, () => this.likeCommentpost(index))}
            >
              <Image
                source={item?.attributes?.upvoted === true ? upVoteYellow : upVoteGrey}
                resizeMode={'contain'}
                style={styles.like_style}
              />
            </TouchableOpacity>
            {this.totalVote(item, index)}
            <TouchableOpacity
              testID="downvoteBtnID"
              disabled={this.state.voteLoading}
              onPress={() => this.setState({ commentID: item.id }, () => this.dislikeCommentpost(index))}
            >
              <Image
                source={item?.attributes?.downvoted === true ? downVoteBlue : downVoteGrey}
                resizeMode={'contain'}
                style={styles.dislikearrow_style}
              />
              {/* <Image source={downVoteGrey} resizeMode={'contain'} style={styles.dislikearrow_style} /> */}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  approveCommentDetails = (item: any, index: number) => {
    return (
      <View style={styles.profileRowContainer}>
        <View style={styles.rowProfile}>
          <TouchableOpacity
            testID="userImageheldedBtn"
            onPress={async () => {
              this.setState({ commentModalVisible: false });

              const userID = await getStorageData("userID", false);
              this.props.navigation.navigate("UserProfileBasicBlock", {
                data:
                  userID?.toString() ===
                    item?.attributes?.account_id?.toString()
                    ? null
                    : item,
                showTab: this.props.route.params.showTab ? this.props.route.params.showTab : 0
              });
            }}
          >
            <Image
              source={item?.attributes?.photo ? { uri: item.attributes.photo }
                : avatar}
              style={styles.image_profile}
            />
          </TouchableOpacity>
          <View style={styles.profileText}>
            <TouchableOpacity
              testID="userProfileImgBtn"
              onPress={async () => {
                this.setState({ commentModalVisible: false });
                const userID = await getStorageData("userID", false);
                this.props.navigation.navigate("UserProfileBasicBlock", {
                  data:
                    userID?.toString() ===
                      item?.attributes?.account_id?.toString()
                      ? null
                      : item,
                  showTab: this.props.route.params.showTab ? this.props.route.params.showTab : 0
                });
              }}
            >
              <Text style={styles.profileTextName}>
                {item?.attributes?.account?.full_name}
              </Text>
            </TouchableOpacity>
            <View style={styles.horizontalCommentText}>
              <>
                <ParsedText
                  testID="heldParseTextID"
                  onLongPress={() =>
                    this.setState({ deleteCommentModalVisible: true, selectedCommentIdToBeDeleted: item.attributes.id, selectedItem: item })
                  }
                  style={styles.profileTextChat}
                  parse={[
                    {
                      pattern: /@([\w\d.\-_]+)?/g,
                      style: { color: "black", fontWeight: "bold" },
                      onPress: (text: string, index: number) => {
                        this.handleNamePress(
                          text,
                          index,
                          item?.attributes?.taggings
                        );
                      },
                    },
                    // {
                    //   pattern: /#(\w+)/,
                    //   style: { color: "white", fontWeight: "900" },
                    //   onPress: (text: string, index: number) => {
                    //     this.handleHashPress(text,index,[]);
                    //   },
                    // },
                  ]}
                >
                  {item?.attributes?.comment}
                </ParsedText>
                <Text
                  style={{
                    marginLeft: Scale(5),
                    color: "#c4c0c0",
                    marginTop: Scale(8),
                  }}
                >
                  {moment(item?.attributes?.created_at).fromNow(
                    // @ts-ignore
                    moment.updateLocale("en", {
                      relativeTime: {
                        future: "in %s",
                        past: "%s ",
                        s: "just now",
                        m: "%dm",
                        mm: "%dm",
                        h: "%dh",
                        hh: "%dh",
                        d: "%dd",
                        dd: "%dd",
                        M: "a mth",
                        MM: "%dmths",
                        y: "y",
                        yy: "%d y",
                      },
                    })
                  )}
                </Text>
              </>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: Scale(5) }}>

              <TouchableOpacity
                testID="heldApproveBtn"
                onPress={() => {
                  this.setState({ holdedCommentId: item?.attributes?.id }, () => {
                    this.approveComment(item?.attributes?.id)
                  })

                }}
              >
                <Text style={{
                  color: '#90EE90',
                }}>
                  {translate("Approve")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                testID="heldRemoveBtn"
                onPress={() => {
                  this.setState({ holdedCommentId: item?.attributes?.id }, () => {
                    this.rejectComment(item?.attributes?.id)
                  })
                }}
              >

                <Text style={{
                  color: 'red',
                  marginLeft: Scale(10)
                }}>
                  {translate("Remove")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  copyUrl = async (data: any) => {
    const url = data;
    Clipboard.setString(url);
    this.setState({ alertModal: { openAlertModal: true, alertMsg: translate("copied_to_clipboard") } })
    if (Platform.OS === 'ios') {
      RNToasty.Show({ title: translate("copied_to_clipboard") });
    }
  };

  renderShareappFlatList = (data: any) => {
    const options = {
      url: this.state.PostData[this.state.scrollInfo.index]?.attributes?.post_medias?.videos?.[0]?.media_url,
      title: "Awesome Contents",
      message: "Hey! Check out this video here!",
    };


    return (
      <View style={styles.shareContainerFlex}>
        <View>
          <TouchableOpacity
            testID="copyLinkBtn"
            style={styles.button_socialcontainer}
            onPress={() => {
              this.onCancel();
              setTimeout(async () => {
                console.log("POST ID = " + this.state.PostData[this.state.scrollInfo.index].id)
                const appBaseUrl = baseURL.endsWith('/') ? baseURL : baseURL + "/";
                const link = `${appBaseUrl}admin/?feeds?id=${this.state.PostData[this.state.scrollInfo.index]?.id}`
                this.copyUrl(link)
              }, 300);
            }}
          >
            <Image
              source={copylink}
              style={styles.SMSimage_someone_style}
              resizeMode="contain"
            />
            <Text>Copy link</Text>
          </TouchableOpacity>
        </View>

        {Platform.OS === "ios" && (
          <TouchableOpacity
            testID="iosShareBtn"
            style={styles.button_socialcontainer}
            onPress={() => {
              Share.open(options).catch((err) => {
              });
            }}
          >
            <Image
              source={share}
              style={styles.SMSimage_someone_style}
              resizeMode="contain"
            />
            <Text>{translate("share")}</Text>
          </TouchableOpacity>
        )}
        {Platform.OS === "android" && (
          <FlatList
            testID="shareFlatlist"
            data={this.state.isAppInstall}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderShareCell(item, data)}
          />
        )}
      </View>
    );
  };


  renderShareCell = (item: any, data: any) => {
    const url = this.state.PostData[this.state.scrollInfo.index]?.attributes?.post_medias?.videos?.[0]?.media_url;
    const title = "GoLavi";
    const message = "Hey! Check out this video here!";

    const options: any = {
      title,
      url,
      message,
    };
    if (item.social === "facebook") {
      options.appId = 219376304;
    }


    return (
      <View>
        {item.isInstall === true && (
          <TouchableOpacity
            testID="socailBtn"
            style={styles.button_socialcontainer}
            onPress={async () => {
              this.onCancel();
              console.log("options", options)
              console.log("social", item.social)

              if (item.social === "instagram") {

                const cache = await RNFetchBlob.config({
                  fileCache: true,
                  appendExt: 'mp4',
                }).fetch('GET', this.state.PostData[this.state.scrollInfo.index]?.attributes?.post_medias?.videos?.[0]?.media_url, {})
                //@ts-ignore
                const gallery = await CameraRoll.save(cache.path(), 'video');
                cache.flush();
                console.log("gallery", gallery)
                options.url = "instagram://share"
              }

              await Share.shareSingle({
                ...options,
                type: 'video/*',
                social: item.social,
              }).catch((err) => {
                console.log(err);
                console.warn(err)

              });
            }}
          >
            <Image
              source={item.icon}
              style={styles.SMSimage_someone_style}
              resizeMode="contain"
            />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  renderItems = ({ item, index }: any) => {
    return (
      <View style={{ flex: 1 }}>
        {this.SharemodalHeader(item)}
        {this.display(item, index)}
        {this.sidebar(item, index)}

        {this.discription(item, index)}

      </View>
    );
  };

  renderReportReasons = ({ item, index }: any) => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@", item)
    return (
      <View style={[styles.report_item, index === 0 && { marginTop: 10 }]}>
        <RadioButton labelHorizontal={true}>
          <RadioButtonInput
            testID="radioInputId"
            obj={item}
            index={item.value}
            isSelected={this.state.selectedReportReason === item.value}
            onPress={() => {
              this.selectReportReason(item.value)
            }}
            buttonInnerColor={"#ffc831"}
            buttonOuterColor={"#ffc831"}
            buttonSize={16}
            buttonOuterSize={20}
            buttonStyle={{}}
            buttonWrapStyle={{ marginLeft: 10 }}
          />
          <RadioButtonLabel
            testID="radioLabelId"
            obj={item}
            index={item.value}
            labelHorizontal={true}
            onPress={() => this.selectReportReason(item.value)}
            labelStyle={[{ fontSize: 16 }, this.state.language == 'ar' && { marginLeft: 10 }]}
            labelWrapStyle={{}}
          />
        </RadioButton>
      </View>
    );
  };

  display = (data: any, index: any) => {
    const scrollIndex = this.state.scrollInfo.index || 0;
    const isNext = index >= scrollIndex - 1 && index <= scrollIndex + 1;
    let isvisible = scrollIndex === index;
    if (data?.attributes?.post_medias?.videos?.length > 0) {
      let details = data?.attributes?.post_medias?.videos?.[0]?.media_url;
      return (
        <TouchableWithoutFeedback
          testID="videoId"
          onPress={() => {
            if (this.state.isOpen) {
              this.setState({ isOpen: false })
            }
          }}
          style={{ flex: 1 }}
        >

          <VideoComponent
            testID="videoComponentID"
            item={details}
            isNext={isNext}
            isVisible={isvisible}
            mute={this.state.mute}
            setmute={() => {
              this.setState({ mute: !this.state.mute });
            }}
          />
        </TouchableWithoutFeedback>
      );
    }
  };

  commentBtn = () => {
    this.setState(
      {
        commentLoaderVisible: true,
        commentModalVisible: true,
        focusButton: true,
        postID: this.state.PostData[this.state.scrollInfo.index]?.id,
      },
      () => {
        this.showCreateComment()
        this.getTotalCommentpost()
      }
    );
  }

  profileImage = (data: any) => {
    if (data?.attributes?.photo) {
      return { uri: data.attributes.photo }
    } else {
      return avatar
    }
  }

  sidebar = (data: any, index: any) => {
    let details = data?.attributes?.post_medias?.videos;
    let songName = details?.length > 0 ? details[0]?.audio_title : null;
    return (
      <View
        style={[
          styles.cameraOverlapContainer,
          {
            flexDirection: "row",
            right: 16,
            bottom: this.isPlatformiOS() ? 30 : 0,
          },
        ]}
      >
        <View testID="onClick" style={styles.reelsOptionBtn}>
          <TouchableOpacity
            testID="userProfileBtn"
            onPress={async () => {
              const userID = await getStorageData("userID", false);
              this.props.navigation.navigate("UserProfileBasicBlock", {
                data:
                  userID.toString() === data?.attributes?.account_id?.toString()
                    ? null
                    : data,
                showTab: this.props.route.params.showTab ? this.props.route.params.showTab : 0

              });
            }}
          >
            <Image
              source={this.profileImage(data)}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          {this.state.PostData[this.state.scrollInfo.index]?.liked ? (
            <TouchableOpacity
              testID="unlikePostBtn"
              style={styles.likesContainer}
              onPress={() => this.unLikeAPost()}
            >
              <Image
                testID="redHeartId"
                source={redheart}
                style={styles.profileRedhearticonImage}
              />
              <Text style={styles.commentsCountLabel}>
                {
                  this.state.PostData?.[this.state.scrollInfo.index]?.attributes?.post_likes_count
                }
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              testID="likepostBtn"
              style={styles.likesContainer}
              onPress={() => this.likeAPost()}
            >
              <Image
                testID="whiteHeartID"
                source={whiteheart}
                style={styles.profileWhitehearticonImage}
              />
              <Text style={styles.commentsCountLabel}>
                {
                  this.state.PostData?.[this.state.scrollInfo.index]?.attributes?.post_likes_count
                }
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            testID="commentsBtnId"
            style={styles.iconContainer}
            onPress={() => this.commentBtn()}
          >
            <Image
              source={commenticon}
              style={styles.profileCommenticoniconImage}
            />
            <Text style={styles.commentsCountLabel}>
              {
                this.state.PostData[this.state.scrollInfo.index]?.attributes
                  ?.post_comment_count
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="shareBtnId"
            style={styles.iconContainer}
            onPress={() => this.sharePost()}
          // disabled={true}
          >
            <Image source={share} style={[styles.profileShareiconImage]} />
          </TouchableOpacity>
          <TouchableOpacity testID="audioBtnID" disabled={songName == null} onPress={() => { this.handleAudioOnpress(details) }}>
            <Image source={audio} style={styles.audioImage} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  discription = (data: any, index: any) => {
    let details = data?.attributes?.post_medias?.videos;
    let songName = details?.length > 0 ? details[0]?.audio_title : null;
    let myHeight = 10;
    return (


      <View
        style={{
          padding: 16,
          left: 0,
          justifyContent: "space-between",
          position: "absolute",
          width: Scale(350),
          marginLeft: 16,
          bottom: this.isPlatformiOS() ? 30 : 0,
        }}
      >
        <View style={[styles.camerabottom, { flexDirection: "column" }]}>
          <View style={{ padding: 10, flex: 1 }} onStartShouldSetResponder={() => true}>
            <ScrollView


              style={{
                maxHeight: 220,
                minHeight: 10,
              }}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={true}
              scrollEnabled={true}
            >

              <TouchableWithoutFeedback>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <ParsedText
                    testID="parseTextId"
                    style={[styles.bottomTextdiscription,
                    this.state.language == 'ar' && { textAlign: "left" },
                    ]}
                    parse={[
                      {
                        pattern: /@([\w\d.\-_]+)?/g,
                        style: { color: "white", fontWeight: "900" },
                        testID: "parseTextId1",
                        onPress: (text: string, index: number) => {
                          this.handleNamePress(
                            text,
                            index,
                            data?.attributes?.taggings
                          );
                        },
                      },
                      {
                        pattern: /#(\w+)/,
                        style: { color: "white", fontWeight: "900" },
                        testID: "parseTextId2",
                        onPress: (text: string, index: number) => {
                          this.handleHashPress(text, index, []);
                        },
                      },
                    ]}
                  >
                    {data?.attributes?.body}
                  </ParsedText>
                </View>
              </TouchableWithoutFeedback>


            </ScrollView>
          </View>
          <TouchableOpacity testID="audiobtn1" disabled={songName == null} onPress={() => { this.handleAudioOnpress(details) }} style={styles.songRow}>
            <Image source={musicalnotes} style={styles.musicalnotes_style} />
            <Text style={styles.songName}>{this.songName(songName)}</Text>
          </TouchableOpacity>
        </View>
      </View>


    );
  };
  songName = (songName: any) => {
    if (songName) {
      return songName;
    } else {
      return translate("name_of_song")
    }
  }
  notificationBack = () => {
    if (this.props.route.params?.isFromNotification === true) {
      return this.props.navigation.navigate("Notifications");
    } else {
      return this.props.navigation.goBack();
    }
  }

  backHeader = () => {
    const paramType = this.props.route.params?.type;
    return (
      <View style={[styles.header, { position: "absolute", zIndex: 1000 }]}>
        <View style={styles.backHeaderText}>
          <TouchableOpacity
            testID="goBack"
            onPress={() => {
              const isFromLikesProfile = this.props?.route?.params?.isFromLikesProfile
              if (paramType === 'profile' || paramType === 'post') {
                this.paramProfileData()
              } else if (isFromLikesProfile) {
                this.props.navigation.goBack()
              } else {
                switch (paramType) {
                  case "LikeActivity":
                    this.handleBackButtonClick()
                    break;
                  case "CommentActivity":
                    this.props.navigation.navigate("CommentActivity")
                    break;
                  case "NotInterestedActivity":
                    this.props.navigation.navigate("NotInterestedActivity")
                    break;
                  case "SavedActivity":
                    this.props.navigation.navigate("SavedActivity")
                    break;
                  case "SearchActivity":
                    this.setState({ PostData: [], refreshList: false, loader: false })
                    this.props.navigation.navigate("ElasticSearch");
                    break;
                  case "Notification":
                    this.notificationBack()
                    break;
                  case "bookmark":
                    const isCommentPost = this.props.route.params?.isCommentPost
                    if (isCommentPost === true) {
                      this.props.navigation.navigate("UserProfileBasicBlock", {
                        isCommentPost: isCommentPost,
                        showTab: this.showTabData()
                      });
                    } else {
                      this.props.navigation.navigate("UserProfileBasicBlock", {
                        showTab: this.showTabData()
                      });
                    }
                    break;
                  default:
                    break;
                }
              }
            }}
          >
            <Image source={arrowLeft} style={[styles.imgStyle, this.state.language == 'ar' && styles.arrow_reverse]} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  header = () => {
    return (
      <View style={[styles.header, { position: "absolute", zIndex: 1000 }]}>
        <View style={[styles.headerText2, { flexDirection: this.state.language == "ar" ? "row-reverse" : "row" }]}>
          <TouchableOpacity
            testID="followingBtn"
            onPress={() => {
              this.setState(
                {
                  refreshList: true,
                  page: 1,
                  isFollowing: true,
                  scrollInfo: { isViewable: true, index: 0 },
                },
                () => {
                  if (this.state.PostData.length > 0) {
                    this.flatListRef?.current?.scrollToIndex({ animated: true, index: 0 });
                  }
                  this.getFollowingData();
                }
              );
            }}
          >
            <Text style={[styles.headerTextfont, this.state.isFollowing === true &&
            {
              color: "white",
              fontWeight: "900"
            }]}>{translate("following")}</Text>
          </TouchableOpacity>
          {this.state.PostData.length > 0 ? <View
            style={{
              width: 1,
              height: Scale(20),
              backgroundColor: "#ffffffAA",
            }}
          /> : <View
            style={{
              width: 1,
              height: Scale(20),
              backgroundColor: "black",
            }}
          />}
          <TouchableOpacity
            testID="for_youBtn"
            onPress={() => {
              this.setState(
                {
                  refreshList: true,
                  page: 1,
                  isFollowing: false,
                  scrollInfo: { isViewable: true, index: 0 },
                },
                () => {
                  if (this.state.PostData.length > 0) {
                    this.flatListRef?.current?.scrollToIndex({ animated: true, index: 0 })
                  }
                  this.getPostData();
                }
              );
            }}
          >
            {this.state.PostData.length > 0 ? <Text style={[styles.headerTextfont, this.state.isFollowing === false && { color: "white", fontWeight: "900" }]}>{translate("for_you")}</Text> :
              <Text
                style={[
                  styles.headerTextfont,
                  this.state.isFollowing === false && { color: "white", fontWeight: "900" }
                ]}
              >
                {translate("for_you")}
              </Text>
            }
          </TouchableOpacity>
          <View />
          <TouchableOpacity
            testID="searchBtn"
            style={{ right: 5, position: "absolute", paddingTop: 5 }}
            onPress={() => {
              this.props.navigation.navigate("ElasticSearch");
            }}
          >
            <Image
              style={{
                width: Scale(25),
                height: Scale(25),
                tintColor: "white",
              }}
              source={search}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  viewabilityConfig = { viewAreaCoveragePercentThreshold: 70 };

  onViewableItemsChanged = ({ viewableItems, changed }: any) => {
    if (viewableItems.length <= 0) {
      return;
    }
    const info = {
      isViewable: viewableItems[0].isViewable,
      index: viewableItems[0].index,
    };
    this.setState(
      {
        scrollInfo: info,
      },
      () => { }
    );
  };

  onRefresh = () => {
    const paramType = this.props.route.params?.type;
    this.setState({ refreshList: true, page: 1 }, () => {
      if (!paramType || paramType === 'profile' || paramType === 'post') {
        if (this.state.isFollowing) {
          this.getFollowingData();
        } else {
          this.getPostData();
        }
      } else if (paramType === 'bookmark') {
        this.getBookMarkedPosts();
      } else if (paramType === 'LikeActivity') {
        this.getLikesPosts()
      } else if (paramType === 'NotInterestedActivity') {
        this.getNotInterestedPosts()
      } else if (paramType === 'SavedActivity') {
        this.getSavedPosts()
      } else if (paramType === 'SearchActivity') {
        this.getSearchedPosts()
      } else if (paramType === 'Notification') {
        this.getNotificationPost()
      } else {
        this.getUserPosts()
      }
    });
  };

  onCommentsRefresh = () => {
    this.setState({
      commentLoaderVisible: true,
      totalComments: []
    }, () => {
      this.showCreateComment()
      this.getTotalCommentpost()
    })
  }


  onEndReached = () => {
    const paramType = this.props.route.params?.type;
    console.log("onEndreache//////", this.state.page, this.state.last_page)
    if (this.state.page < this.state.last_page) {
      if (!paramType || paramType === 'profile' || paramType === 'post') {
        if (this.state.isFollowing) {
          this.getFollowingData();
        } else {
          this.setState({ page: this.state.page + 1 });
          this.getPostData(true, this.state.page + 1);
        }
      } else {
        switch (paramType) {
          case "LikeActivity":
            this.getLikesPosts()
            break;
          case "NotInterestedActivity":
            this.getNotInterestedPosts()
            break;
          case "SavedActivity":
            this.getSavedPosts()
            break;
          case "SearchActivity":
            this.getSearchedPosts()
            break;
          case "Notification":
            this.getNotificationPost()
            break;
          case "bookmark":
            this.getBookMarkedPosts();
            break;
          default:
            this.getUserPosts()
            break;
        }
      }
    }
  };

  showEmptyListView = () => {
    return (
      <>
        {this.backGroundImg()}
        <View style={styles.nodata}>
          <Text style={{ color: "white" }}>{translate("no_Post_found")}</Text>
        </View>
      </>
    );
  };

  deleteOptions: AlertButton[] = [
    {
      text: translate("delete"),
      onPress: () => {
        this.deleteCommentCall(this.state.selectedCommentIdToBeDeleted)
        this.getCommentReplies(this.state.selectedCommentId)
      },
      style: 'destructive'
    },
    {
      text: translate("cancel"),
      onPress: () => this.setState({ deleteCommentModalVisible: false }),
      style: 'cancel',
    },
    {
      text: translate("copy"),
      onPress: () => {
        this.copyUrl(this.state?.selectedItem?.attributes?.comment !== undefined ? this.state.selectedItem.attributes.comment : this.state.selectedItem.comment)
        this.setState({ deleteCommentModalVisible: false })
      }
    },
  ]

  CopyOptions: AlertButton[] = [
    {
      text: translate("cancel"),
      onPress: () => this.setState({ deleteCommentModalVisible: false }),
      style: 'cancel',
    },
    {
      text: translate("copy"),
      onPress: () => {
        this.copyUrl(this.state?.selectedItem?.attributes?.comment !== undefined ? this.state.selectedItem.attributes.comment : this.state.selectedItem.comment)
        this.setState({ deleteCommentModalVisible: false })
      }
    },
  ]

  deleteCopyAlert = () => {
    Alert.alert('Options', '',
      this.state.userAccountId == this.state.selectedItem?.attributes?.account_id || this.state.userAccountId == this.state.selectedItem?.account_id ? (
        this.deleteOptions
      ) : (
        this.CopyOptions
      ),
      { cancelable: true }
    )
  }

  deleteCommentModal = () => {
    if (Platform.OS == 'ios') {
      return (
        this.deleteCopyAlert()
      )
    } else {
      return (
        this.state.userAccountId == this.state.selectedItem.attributes?.account_id || this.state.userAccountId == this.state.selectedItem.account_id ? (

          <ReactNativeModal
            testID="deleteCommentModalID1"
            onBackButtonPress={() => this.setState({ deleteCommentModalVisible: false })}
            isVisible={this.state.deleteCommentModalVisible}>
            <View style={styles.delete_modal}>

              <View style={styles.delete_comment_modal}>
                <TouchableOpacity
                  testID="copyBtn1"
                  style={styles.delete_comment_button}
                  onPress={() => {
                    this.copyUrl(this.state?.selectedItem?.attributes?.comment !== undefined ? this.state.selectedItem.attributes.comment : this.state.selectedItem.comment)
                    this.setState({ deleteCommentModalVisible: false })
                  }}>
                  <Text style={styles.delete_comment_button_text}>{translate("copy")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="deleteCommentBtn"
                  style={styles.delete_comment_button}
                  onPress={() => {
                    this.deleteCommentCall(this.state.selectedCommentIdToBeDeleted)
                    this.getCommentReplies(this.state.selectedCommentId)
                  }}>
                  <Text style={styles.delete_comment_button_text}>{translate("delete")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="cancelDeleteBtn"
                  style={styles.delete_comment_button}
                  onPress={() => this.setState({ deleteCommentModalVisible: false })}>
                  <Text style={styles.delete_comment_button_text}>{translate("cancel")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ReactNativeModal>
        ) : (
          <ReactNativeModal
            testID="deleteCommentModalID"
            onBackButtonPress={() => this.setState({ deleteCommentModalVisible: false })}
            isVisible={this.state.deleteCommentModalVisible}>
            <View style={styles.delete_modal}>
              {/* <View style={styles.reporModalTileContainer}>
       </View> */}

              <View style={styles.delete_comment_modal}>
                <TouchableOpacity
                  testID="copyTextBtn"
                  style={styles.delete_comment_button}
                  onPress={() => {
                    this.copyUrl(this.state.selectedItem.attributes.comment !== undefined ? this.state.selectedItem.attributes.comment : this.state.selectedItem.comment)
                    this.setState({ deleteCommentModalVisible: false })
                  }}>
                  <Text style={styles.delete_comment_button_text}>{translate("copy")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  testID="cancleBtn1"
                  style={styles.delete_comment_button}
                  onPress={() => this.setState({ deleteCommentModalVisible: false })}>
                  <Text style={styles.delete_comment_button_text}>{translate("cancel")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ReactNativeModal>
        )
      )
    }
  }

  headerFuncs = () => {
    if (!this.props.route.params.type) {
      return this.header();
    } else {
      return this.backHeader();
    }
  }

  reportSubmitBtn = () => {
    if (this.state.selectedReportReason == -1 || this.state.selectedReportReason == undefined || this.state.selectedReportReason == null) {
      this.setState({ alertModal: { openAlertModal: true, alertMsg: translate('please_select_a_reason') } })

      return
    }
    if (this.state.selectedReportReason === 6 && this.state.otherReportReason === "") {
      this.setState({ alertModal: { openAlertModal: true, alertMsg: translate('give_detailed_description') } })

      return
    }
    this.reportPost().finally(() => {

      this.setState({
        reportModalVisible: false,
        selectedReportReason: -1,
        reportModalNotification: true
      });
    });
  }

  emptyListText = () => {
    return this.state.isFollowing === true ? translate("Please_follow_someone_to_see_their_posts") : translate("Try_refreshing_the_app")
  }
  // Customizable Area End

  render() {
    // Customizable Area Start 

    return (
      //Merge Engine DefaultContainer
      <View
        // keyboardShouldPersistTaps="always"
        style={styles.container}
      >
        <StatusBar barStyle="light-content" />

        <TouchableWithoutFeedback
          testID="btnFeedbackID"
          onPress={() => {
            this.hideKeyboard();
            this.setState({ isCommentReply: false });
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
              <View style={styles.container}>
                {(this.state.alertModal.alertMsg !== translate('please_select_a_reason') &&
                  this.state.alertModal.alertMsg !== translate('give_detailed_description')) &&
                  <AlertModal alertModal={this.state.alertModal} onPress2={() => { this.setState({ alertModal: { openAlertModal: false } }) }}
                    btnTitle2={"OK"} />}
                {this.headerFuncs()}
                <Modal
                  //@ts-ignore
                  testID="reportModalId"
                  animationType="fade"
                  transparent
                  visible={this.state.reportModalVisible}
                  onRequestClose={() => {
                    this.setState({ reportModalVisible: false });
                  }}
                >
                  <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                  >
                    <TouchableWithoutFeedback testID="hidekeyBtn" onPress={() => {
                      this.hideKeyboard()
                    }}>

                      <View style={styles.modalContainer} >
                        <View style={styles.report_modal_view}>
                          <View style={styles.report_header_title}>
                            <Text style={styles.report_title}>{translate("report")}</Text>
                          </View>
                          <FlatList
                            testID="reportReasonFlatlist"
                            data={this.state.reportReasons}
                            keyExtractor={(item: string, index) => index.toString()}
                            viewabilityConfig={this.viewabilityConfig}
                            renderItem={this.renderReportReasons}
                            ListEmptyComponent={() => this.showEmptyListView()}
                            ref={this.reportFlatListRef as RefObject<FlatList<any>>}
                          />
                          <View style={styles.report_footer_container}>
                            {this.state.selectedReportReason == 6 && <View>
                              <TextInput
                                testID="enterReasonID"
                                placeholder={translate("enter_your_reason")}
                                value={this.state.otherReportReason}
                                style={[styles.reasonText, this.state.language == "ar" && styles.reasonText_ar]}
                                maxLength={200}
                                multiline
                                blurOnSubmit={false}
                                ref={this.inputRef as RefObject<TextInput>}
                                onChangeText={this.changeOtherReportReason}
                              />
                            </View>}
                            <View style={styles.report_footer_buttons_container}>
                              <TouchableOpacity
                                testID="cancelReportBtn"
                                style={styles.cancel_button}
                                onPress={() => this.setState({ reportModalVisible: false, selectedReportReason: -1 })}
                              >
                                {/* <View style={styles.cancel_report_button}> */}
                                <Text style={styles.cancel_button_text}>{translate("cancel")}</Text>
                                {/* </View> */}
                              </TouchableOpacity>
                              <TouchableOpacity
                                testID="reportSubmitBtn"
                                style={styles.button}
                                onPress={() => this.reportSubmitBtn()}
                              >
                                {/* <View style={styles.reportButtons}> */}
                                <Text style={styles.report_button_text}>{translate("report")}</Text>
                                {/* </View> */}
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                        <AlertModal alertModal={this.state.alertModal} onPress2={() => { this.setState({ alertModal: { openAlertModal: false } }) }}
                          btnTitle2={"OK"} />
                      </View>
                    </TouchableWithoutFeedback>
                  </KeyboardAvoidingView>
                </Modal>
                {this.state.deleteCommentModalVisible && this.deleteCommentModal()}
                {this.comment_ModalHandler()}
                <ReactNativeModal testID="notificationModal" isVisible={this.state.reportModalNotification}>
                  <View style={styles.report_modal}>
                    <View style={styles.reporModalTileContainer}>
                      <Text style={styles.report_continue_title}>{translate("report_Sent")}</Text>
                    </View>
                    <View style={styles.reportModalBodyContainer}>
                      <Text>{translate("Thank_you_for_reporting_this_issue_to_us")}</Text>
                      <Text>{translate("Our_team_has_received_your_report_and_will")}</Text>
                      <Text>{translate("investigate_the_matter_promptly")}</Text>
                    </View>
                    <View>
                      <View style={styles.report_modal_button_container}>
                        <TouchableOpacity
                          testID="closeBtn"
                          style={styles.button}
                          onPress={() => this.closeReportModal()}>
                          <Text style={styles.report_continue_button}>{translate("continue")}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* <Button title="Hide modal" onPress={handleModal} /> */}
                  </View>
                </ReactNativeModal>
                {this.state.refreshList ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'grey', height: screenHeight - 70 }}>
                  <ActivityIndicator size="large" color="black" />
                </View> :
                  <FlatList
                    testID="postFlatlist"
                    ref={this.flatListRef}
                    data={this.state.PostData}
                    onEndReachedThreshold={0.5}
                    initialScrollIndex={0}
                    keyExtractor={(item: any, index: number) => index.toString()}
                    //@ts-ignore
                    viewabilityConfig={this.viewabilityConfig}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    renderItem={this.renderItems}
                    // stickyHeaderIndices={[this.state.PostData.length]}
                    onEndReached={this.onEndReached}
                    refreshing={this.state.refreshList}
                    onRefresh={this.onRefresh}
                    nestedScrollEnabled
                    decelerationRate={'fast'}
                    snapToInterval={Dimensions.get("window").height - 70}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    ListEmptyComponent={() => {
                      if (!this.state.refreshList) {
                        return (
                          <View style={styles.nodatanew}>
                            <Image source={emptySearch} style={{ height: 85, width: 85, marginBottom: 8, tintColor: 'white' }} resizeMode={'contain'} />
                            <Text style={{ color: "white", fontSize: 14, fontWeight: 'bold', marginVertical: 8, textAlign: 'center' }}>{translate("No_posts_found")}</Text>
                            <Text style={{ color: "white", fontSize: 13, lineHeight: 20, textAlign: 'center' }}>
                              {this.emptyListText()}
                            </Text>
                          </View>
                        )
                      }
                      else if (this.state.PostData.length === 0 && this.state.isFollowing)
                        return (
                          <View style={styles.nodatanew}>
                            <Image source={emptySearch} style={{ height: 85, width: 85, marginBottom: 8, tintColor: 'white' }} resizeMode={'contain'} />
                            <Text style={{ color: "white", fontSize: 14, fontWeight: 'bold', marginVertical: 8, textAlign: 'center' }}>{translate("No_posts_found")}</Text>
                            <Text style={{ color: "white", fontSize: 13, lineHeight: 20, textAlign: 'center' }}>
                              {this.state.isFollowing === true ? translate("Please_follow_someone_to_see_their_posts") : translate("Try_refreshing_the_app")}
                            </Text>
                          </View>
                        )
                      return null
                    }}
                  />
                }

              </View>
            </SafeAreaView>
          </View>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  repliesContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 3,
    paddingLeft: Scale(15),
    maxWidth: Scale(250),
  },

  dateText: {
    color: "#c4c0c0",
    // fontSize:Scale(12),
    marginLeft: Scale(3),
  },
  lineStyle: {
    width: 1,
    height: Scale(20),
    backgroundColor: "#ffffffAA",
  },
  report_item: {
    // marginRight:Scale(10),
    // padding:Scale(10)
    paddingTop: Scale(10),
  },
  report_header_title: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#c4c0c0",
    fontWeight: "bold",
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  report_footer_buttons_container: {
    // marginTop:10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopColor: "#c4c0c0",
    borderTopWidth: 1,
    paddingTop: 20,
    marginBottom: 20
  },
  report_footer_container: {
    padding: 10,
    // marginTop:20,

  },
  report_title: {
    fontSize: Scale(20),
    fontWeight: 'bold'
  },
  videoPlayerButton: {
    position: "absolute",
    top: Scale(0),
    bottom: Scale(0),
    left: Scale(0),
    right: Scale(0),
    zIndex: 100,
  },
  reporModalTileContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  report_modal: {
    height: Scale(210),
    width: Scale(350),
    borderRadius: 20,
    backgroundColor: '#fff',
    alignSelf: 'center'
  },
  report_continue_button: {
    color: '#000',
    fontWeight: '600',
  },
  report_continue_title: {
    color: '#000',
    fontWeight: '600',
    fontSize: 18
  },
  report_modal_button_container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5
  },
  delete_comment_modal: {
    paddingHorizontal: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingVertical: Scale(15),
  },
  delete_modal: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: "5%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#FFC925"
  },
  delete_comment_button: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    paddingVertical: Scale(10),
    width: Scale(300),
  },
  delete_comment_button_text: {
    color: '#000',
    fontWeight: '600',
    marginLeft: Scale(10)
  },
  reportModalBodyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  addYourReply: {
    paddingVertical: 6,
    color: "#c4c0c0",
  },
  replyText: {
    paddingTop: Scale(7),
  },
  video_style: {
    position: "absolute",
    top: Scale(0),
    bottom: Scale(0),
    left: Scale(0),
    right: Scale(0),
  },
  headerContainer: {
    // top: 0,
    // position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Scale(500),
    alignItems: "center",
    //marginTop: Scale(10),
  },
  deleteText: {
    color: "#fff",
    fontSize: Scale(16),
    fontWeight: "bold",
    paddingHorizontal: Scale(10),
    width: Scale(100),
    textAlign: "center",
  },
  // delete_comment_button: {
  //   paddingHorizontal: Scale(130),
  //   paddingVertical: Scale(10),
  //   color: "#fff",
  //   textAlign: "center",
  //   display: "flex",
  //   justifyContent: "center",
  //   fontSize: Scale(16),
  //   fontWeight: "bold",
  //   borderRadius: Scale(25),
  //   marginVertical: Scale(10),
  // },
  redBG: {
    backgroundColor: "red",
  },
  yellowBG: {
    backgroundColor: "#FFC107",
    marginTop: Scale(10),
    // marginBottom: Scale(10),
  },
  deleteModalInnerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: Scale(10),
    // marginHorizontal: Scale(10),
  },
  headerText: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
  },
  backHeaderText: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
  },
  headerTextfor: {
    color: "white",
  },
  liveicon: {
    width: Scale(40),
    height: Scale(40),
  },
  headerTextfont: {
    // fontStyle: "normal",
    fontSize: Scale(16),
    // fontWeight: "900",
    color: "#ffffffAA",
    marginHorizontal: Scale(20),
    //c
  },

  modalContainer: {
    backgroundColor: "#00000040",
    flex: 1,
    justifyContent: "flex-end",

  },

  deleteModalContainer: {
    backgroundColor: "#00000040",
    height: Scale(170),
    // backgroundColor: "#000000aa",
    flex: 1,
    justifyContent: "flex-end",
  },

  modalView: {
    backgroundColor: "white",
    height: Scale(300),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // borderTopEndRadius: 50,
    // borderTopStartRadius: 50,
  },
  report_reasons_container: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  report_modal_view: {
    backgroundColor: "white",
    // height: "60%",
    height: Scale(500),
    // flex: 0.6,
    // width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  delete_comment_modal_view: {
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  shareContainer: {
    backgroundColor: "white",
    // flex: 0.5,
    height: "50%",
  },
  smallBorder: {
    borderBottomWidth: 2,
    borderBottomColor: "#c4c0c0",
    paddingHorizontal: Scale(10),
    width: Scale(30),
    marginTop: Scale(10),
  },
  modal_sendText: {
    textAlign: "center",
    fontSize: Scale(15),
    marginTop: Scale(10),
    //fontFamily: FONTS.MonotypeCorsiva,
  },
  image_content: {
    marginTop: Scale(10),
    flexDirection: "row",
  },
  sendToimage_content: {
    marginTop: Scale(10),
    flexDirection: "row",
    marginLeft: Scale(15),
  },
  image_someone_style: {
    width: Scale(50),
    height: Scale(50),
  },
  trash_icon_style: {
    tintColor: "#c4c0c0",
    width: Scale(20),
    height: Scale(20),
    marginLeft: Scale(6),
  },
  SMSimage_someone_style: {
    width: Scale(50),
    height: Scale(50),
    resizeMode: "contain",
  },
  copylink_style: {
    width: Scale(42),
    height: Scale(42),
    resizeMode: "contain",
  },
  share_iconName: {
    fontSize: Scale(13),
  },

  button_socialcontainer: {
    height: Scale(90),
    alignItems: "center",
    marginHorizontal: Scale(10),
    justifyContent: "center",
    paddingTop: Scale(20),
    // backgroundColor:"red"
  },
  button_copyLink: {
    height: Scale(90),
    alignItems: "center",
    marginHorizontal: Scale(10),
    justifyContent: "center",
  },
  image_Text: {
    fontSize: Scale(13),
    textAlign: "center",
    // fontFamily: FONTS.MonotypeCorsiva,
  },
  attention_icon: {
    width: Scale(20),
    height: Scale(20),
  },
  imagebox: {
    width: Scale(70),
    alignItems: "center",
  },
  download_image: {
    width: 50,
    height: 50,
  },
  text_download: {
    marginTop: 10,
    width: Scale(65),
    textAlign: "center",
    fontSize: Scale(13),
    // fontFamily: FONTS.MonotypeCorsiva,
  },
  shareContainerFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  downloadBox: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
  },
  downloadcontainer: {
    borderTopWidth: Scale(2),
    borderTopColor: "#EEEEEE",
    // height: "28%",
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  sharecontainer: {
    height: "28%",
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    borderTopEndRadius: Scale(15),
    borderTopLeftRadius: Scale(15),
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
  cancel_button: {
    width: Scale(180),
    height: Scale(45),
    backgroundColor: "#fff4d4",
    borderRadius: Scale(50),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  btncontainer: {
    // borderTopWidth: Scale(2),
    // borderTopColor: "#EEEEEE",
    // backgroundColor: "#F1F1F1",
    height: "16%",
    justifyContent: "center",
    paddingBottom: Scale(30),
  },
  reportButtons: {
    borderTopWidth: Scale(2),
    borderTopColor: "#FACC1E",
    backgroundColor: "#FACC1E",
    height: "16%",
    justifyContent: "center",
  },
  cancel_report_button: {
    borderTopWidth: Scale(2),
    borderTopColor: "#fff4d4",
    backgroundColor: "#fff4d4",
    height: "16%",
    justifyContent: "center",
  },
  btnText: {
    fontSize: Scale(20),
    fontWeight: "bold",
    color: "black",
    // fontFamily: FONTS.MonotypeCorsiva,
  },
  arrow_reverse: {
    transform: [{ rotate: '180deg' }]
  },
  cancel_button_text: {
    fontSize: Scale(20),
    fontWeight: "bold",
    color: "#FACC1E",
  },
  imgStyle: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  report_button_text: {
    fontSize: Scale(20),
    fontWeight: "bold",
    color: "#fff4d4",
  },
  // comment Style
  comment_ModalView: {
    backgroundColor: "white",
    height: "60%",
    width: "100%",
  },

  textline: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  comment_header_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: Scale(15),
    alignItems: "center",
  },
  delete_comment_header_container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: Scale(2),
    borderRadius: Scale(25),
  },

  number_of_comment: {
    fontSize: Scale(17),
    fontWeight: "bold",
  },
  commentText: {
    fontWeight: "bold",
    marginVertical: Scale(15),
  },
  // bottomheader style
  uicontainer: {
    // right: 0,
    // height: "94%",
    // justifyContent: "flex-end",
    // position: "absolute",
  },

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bottomTextname: {
    color: "#fff",
    fontSize: Scale(16),
    fontWeight: "600",
    marginBottom: Scale(10),
  },
  bottomTextdiscription: {
    color: "#fff",
    fontSize: Scale(16),
    //  fontWeight: "300",
    marginBottom: Scale(5),
    width: Scale(300),
    // fontFamily: FONTS.MonotypeCorsiva
    // height:Scale(50),
  },
  musicalnotes_style: {
    tintColor: "white",
    width: Scale(25),
    height: Scale(25),
  },
  songRow: {
    flexDirection: "row",
    // alignItems: "center",
    // position:"absolute",
    bottom: 0,
  },
  songName: {
    color: "#fff",
    fontSize: Scale(16),
    left: Scale(5),
    // fontFamily: FONTS.MonotypeCorsiva
  },
  songImage: {
    width: Scale(40),
    height: Scale(40),
  },
  rightContainer: {
    alignSelf: "flex-end",
    height: Scale(300),
    justifyContent: "space-around",

    // marginTop:Scale(400)
  },

  profileImage: {
    width: Scale(40),
    height: Scale(40),
    borderRadius: Scale(40),
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
  },
  footerProfileImage: {
    width: Scale(45),
    height: Scale(45),
  },
  audioImage: {
    width: Scale(40),
    height: Scale(40),
  },
  profileiconImage: {
    tintColor: "white",
    width: Scale(38),
    height: Scale(38),
  },
  profileCommenticoniconImage: {
    tintColor: "white",
    width: Scale(35),
    height: Scale(35),
  },
  profileShareiconImage: {
    tintColor: "white",
    width: Scale(30),
    height: Scale(30),
  },
  profileWhitehearticonImage: {
    tintColor: "#fff",
    width: Scale(40),
    height: Scale(40),
  },
  profileRedhearticonImage: {
    tintColor: "red",
    width: Scale(40),
    height: Scale(40),
  },
  commentsCountLabel: {
    color: "#fff",
    fontSize: Scale(16),
    // fontWeight: "600",
    //fontFamily: FONTS.MonotypeCorsiva,
    // paddingBottom: 10,
  },
  likesContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stateLabel: {
    color: "#fff",
    fontSize: Scale(16),
    fontWeight: "600",
    marginTop: Scale(5),
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: Scale(40),
    height: Scale(40),
  },
  redIconContainer: {
    alignItems: "center",
    width: Scale(20),
    height: Scale(20),
  },

  image_profile: {
    width: Scale(40),
    height: Scale(40),
    borderWidth: Scale(1),
    borderRadius: Scale(20),
    borderColor: "white",
  },
  replyImage_profile: {
    width: Scale(20),
    height: Scale(20),
    borderRadius: Scale(20),
  },
  arrow_style: {
    width: Scale(20),
    height: Scale(20),
    tintColor: "#c4c0c0",
  },
  uparrow_style: {
    width: Scale(18),
    height: Scale(55),
    justifyContent: "center",
    alignItems: "center",
  },
  like_style: {
    width: Scale(18),
    height: Scale(20),
  },

  dislikearrow_style: {
    width: Scale(18),
    height: Scale(20),
  },
  ratingText: {
    color: "#c4c0c0",
    fontWeight: "400",
    fontSize: Scale(12),
    width: Scale(30),
    textAlign: "center",
    right: Scale(5),
  },
  ratingContainer: {
    width: Scale(18),
    height: Scale(50),
    marginRight: Scale(8),
  },
  profileText: {
    left: Scale(7),
  },
  profileRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Scale(10),
    alignItems: "center",
    marginBottom: Scale(20),
  },
  rowProfile: {
    flexDirection: "row",
  },
  profileTextName: {
    color: "#333333",
  },
  profileTextChat: {
    fontSize: Scale(16),
    marginTop: Scale(6),
    display: "flex",
    flexShrink: 1,
    maxWidth: Scale(250),
  },
  replaceText: {
    color: "#c4c0c0",
  },
  replaceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Scale(13),
  },
  replacearrowimage: {
    tintColor: "#c4c0c0",
    width: Scale(14),
    height: Scale(14),
    marginLeft: Scale(5),
  },
  altArrowImage: {
    tintColor: "#c4c0c0",
    width: Scale(16),
    height: Scale(16),
    marginLeft: Scale(5),
  },
  inputimage: {
    width: Scale(30),
    height: Scale(30),
  },
  imageRowBox: {
    flexDirection: "row",
    width: Scale(80),
    justifyContent: "space-between",
    right: Scale(10),
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    height: Scale(60),
    justifyContent: "space-between",
    backgroundColor: "#F1F1F3",
    bottom: Scale(0),
  },
  textinput: {
    padding: Scale(10),
    width: Scale(300),
    height: Scale(40),
    alignSelf: "center",
    fontSize: Scale(17),
  },
  onelineuparrow: {
    tintColor: "white",
    width: Scale(25),
    height: Scale(15),
  },
  onelineuparrow_box: {
    width: Scale(35),
    height: Scale(35),
    borderRadius: Scale(50),
    backgroundColor: "#FFCD2A",
    justifyContent: "center",
    alignItems: "center",
  },
  typeinputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    height: Scale(60),
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: Scale(10),
  },
  typeinputTextbox: {
    flexDirection: "row",
    width: Scale(290),
    backgroundColor: "#F1F1F3",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: Scale(10),
    height: Scale(50),
  },
  typeimageRowBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: Scale(10),
  },
  typetextinput: {
    padding: Scale(10),
    width: Scale(200),
    height: Scale(40),
    alignSelf: "center",
    fontSize: Scale(17),
  },
  reasonText: {
    padding: Scale(10),
    height: Scale(70),
    fontSize: Scale(17),
  },
  reasonText_ar: {
    textAlign: "right"
  },
  nodata: {
    justifyContent: "center",
    alignItems: "center",
  },
  nodatanew: {
    flex: 1,
    flexGrow: 1,
    // backgroundColor: "#7F7F7F",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Scale(50),
    backgroundColor: "rgba(0,0,0,0.5)"
  },

  cameraOverlapContainer: {
    position: "absolute",
    //  width: screenWidth,
    justifyContent: "space-between",
    paddingBottom: Scale(50),
    bottom: 0,
  },
  sideOptionsContainer: {
    width: screenWidth / 1,
    // height: Scale(250),
    justifyContent: "space-between",
    paddingLeft: Scale(10),
    paddingRight: Scale(20),
  },
  reelsOptionBtn: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: Scale(320),
    width: Scale(40),
    alignSelf: "flex-end",
    // backgroundColor: "rgba(0,0,0,0.5)",
  },
  optionBtnTextContainer: {
    paddingHorizontal: 12,
    alignItems: "center",
  },
  optinBtnText: {
    color: "white",
    fontSize: 15,
  },
  camerabottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems:'center',
    // width:Scale(300),
    position: "absolute",
    bottom: 50,
  },
  header: {
    paddingVertical: Scale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Scale(20),
    //position:"absolute"
  },
  horizontalCommentText: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  commentListContainerStyle: {
    flex: 1,
  },
  textAlign: {
    textAlign: "left"
  },
  headerText2: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
  },
});
// Customizable Area End
