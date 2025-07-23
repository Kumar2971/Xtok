import React from "react";
// Customizable Area Start
import Scale from "../../../../components/src/Scale";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Platform,
  FlatList,
  TouchableWithoutFeedback,
  RefreshControl
} from "react-native";
import ParsedText from "react-native-parsed-text";
import { translate } from "../../../../components/src/i18n/translate";
import {
  nocommentsicon, backArrow,
  arrowUp,
  arrowDown,
  avatar,
  upVoteGrey,
  upVoteYellow,
  downVoteBlue,
  imgLeftArrow,
  downVoteGrey
} from "../assets";
// Customizable Area End
import settingOptionsCommonController, { Props } from "./settingOptionsCommonController";
import { getStorageData } from "../../../../framework/src/Utilities";
import moment from "moment";
const { width } = Dimensions.get("window");
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
export default class CommentsActivity extends settingOptionsCommonController {
  // Customizable Area Start
  async componentDidMount() {
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language });
    this.getCommentsActivity()

    this.props.navigation.addListener('focus', async () => {
      const language = await getStorageData("SelectedLng");
      this.setState({ language: language });
      this.setState({ postsLoading: true }, () => {

        this.getCommentsActivity()
      })
    })
    this.props.navigation.addListener('blur', () => {
      this.setState({ commentsActivity: [], postsLoading: true, voteLoading: false })
    })
  }
  onCommentsRefresh = () => {
    this.setState({
      postsLoading: true,
    }, () => {
      this.getCommentsActivity()
    })
  }
  commentsFlatlistRef = React.createRef<FlatList<any>>();
  inputRef = React.createRef<TextInput>();
  // Customizable Area End
  constructor(props: Props) {
    super(props);
  }

  topHeaderSettings = () => {
    return (
      <View style={[styles.headercontainer, styles.divider]}>
        <TouchableOpacity testID="activty" style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('YourActivity')}>
          <Image source={this.state.language == "ar" ? backArrow : imgLeftArrow} style={this.state.language == "ar" ? styles.backarrow_style : styles.backarrow_style_en} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{translate("Comments")}</Text>
        <TouchableOpacity testID="newest" onPress={() => {
          if (this.state.sortingOption === 'Newest') {
            this.setState({
              sortingOption: 'Oldest',
              postsLoading: true
            }, () => {
              this.getLikesPosts()
              this.getSavedPosts()
              this.getNoInterestedPosts()
              this.getCommentsActivity()
            })
          } else {
            this.setState({
              sortingOption: 'Newest',
              postsLoading: true
            }, () => {
              this.getLikesPosts()
              this.getSavedPosts()
              this.getNoInterestedPosts()
              this.getCommentsActivity()
            })
          }

        }} style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text style={styles.textNewest}>{this.state.sortingOption === 'Newest' ? 'Newest' : 'Oldest'}</Text>
            <Image source={backArrow} style={[styles.icoNewest, { transform: [{ rotate: this.state.sortingOption === 'Newest' ? '-90deg' : '90deg' }] }]} resizeMode={'contain'} />
          </View>
        </TouchableOpacity>
        <View />
      </View>
    );
  };

  item = () => {
    return (
      <View style={{ paddingHorizontal: Scale(15) }}>

      </View>
    )
  }
  // Customizable Area Start
  onPressCommentDetails = async (item: any) => {
    this.setState({ commentModalVisible: false });

    const userID = await getStorageData("userID", false);
    this.props.navigation.navigate("UserProfileBasicBlock", {
      data:
        userID?.toString() === item?.attributes?.account_id?.toString()
          ? null
          : item,
      showTab: this.props.route.params.showTab ? this.props.route.params.showTab : 0
    });
  }

  onPressCommentDetailsTwo = async (item: any) => {
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
  }

  imageSource = (item:any) => {
    const photo = item?.attributes.photo;
    if(photo){
      return  { uri: photo }
    }else{
      return avatar;
    }
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
        <Text style={{ fontWeight: "bold" }}>No Comments yet</Text>
        <Text>Go ahead start the conversion</Text>
      </View>
    );
  };

  onpressTouchBtn = (item:any , index:number) => {
    this.setState({
      commentsActivity: this.state.commentsActivity.map(
        (itm: any, indx: number) => {
          if (indx === index) {
            return {
              ...itm,
              open: itm.open ? !itm.open : true,
            };
          }
          return {
            ...itm,
            open: false,
          }
        }
      ),
      selectedCommentId: item.id,
    });
  }
  arrowsImages = (index:number) => {
    if(this.state?.commentsActivity[index]?.open){
      return <Image source={arrowUp} style={styles.replacearrowimage} />
    }else{
      return  <Image source={arrowDown} style={styles.replacearrowimage} />
    }
  }

  commentText = (item: any, index: number) => {
    if (this.state?.commentsActivity[index]?.open) {
      return (
        <Text style={styles.replaceText}>
          Hide replies (
          {
            this?.state?.commentsActivity[index]?.attributes?.replies_list
              ?.length
          }
          )
        </Text>
      )
    } else {
      return (
        <Text style={styles.replaceText}>
          View replies
          ({item.attributes.replies_list?.length})
        </Text>
      )
    }
  }

  onPressProfileImage = async(item:any) => {
    this.setState({ commentModalVisible: false });
    const userID = await getStorageData("userID", false);
    this.props.navigation.navigate(
      "UserProfileBasicBlock",
      {
        data: {
          attributes: {
            account_id:
              userID?.toString() ===
                item.account_id?.toString()
                ? null
                : item.account_id,
            showTab: this.props.route.params.showTab ? this.props.route.params.showTab : 0

          },
        },
      }
    );
  }

  voteStyle = (item:any) => {
    if(item?.attributes?.downvoted){
      return '#413DFC';
    }else{
      return '#c4c0c0';
    }
  }

  commentDetails = (item: any, index: number) => {
    
    return (
      <View style={styles.profileRowContainer}>
        <View style={styles.rowProfile}>
          <TouchableOpacity
            testID="onPressCommentDetails"
            onPress={() => {
              this.onPressCommentDetails(item)
            }}
          >
            <Image
              source={this.imageSource(item)}
              style={styles.image_profile}
            />
          </TouchableOpacity>
          <View style={styles.profileText}>
            <TouchableOpacity
              testID="onPressCommentDetails2"
              onPress={async () => {
               this.onPressCommentDetailsTwo(item)
              }}
            >
              <Text style={[styles.profileTextName, this.state.language == "ar" && styles.textAlign]}>
                {item?.attributes?.account?.full_name}
              </Text>
            </TouchableOpacity>
            <View style={styles.horizontalCommentText}>
              <>
                <ParsedText

                  style={[styles.profileTextChat, this.state.language == "ar" && { textAlign: "left" }]}
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
            <TouchableOpacity
              testID="touchOn"
              style={[styles.replaceRow]}
              onPress={() => { 
                this.onpressTouchBtn(item , index)
              }}
            >
            {this.commentText(item, index)}
            {this.arrowsImages(index)}
            </TouchableOpacity>
            {this.state?.commentsActivity[index]?.open && (
              <FlatList
                testID="list2"
                data={
                  this?.state?.commentsActivity[index]?.attributes?.replies_list || []
                }
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }: { item: any }) => {
                  return (
                    <View style={styles.repliesContainer}>
                      <TouchableOpacity
                        testID="onPress3"
                        style={{ flexDirection: "row" }}
                        onPress={async () => {
                         this.onPressProfileImage(item)
                        }}
                      >
                        <Image
                          source={item.image ? { uri: item.image }
                            : avatar}
                          style={styles.replyImage_profile}
                        />
                        <Text style={{ marginLeft: Scale(6) }}>
                          {item.full_name}
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.repliesContainer}>
                        <TouchableWithoutFeedback

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
                              {item?.comment}
                            </ParsedText>
                            <Text style={styles.dateText}>
                              {/* @ts-ignore */}
                              {moment(item.created_at).fromNow(
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
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <TouchableOpacity
            testID="likeID"
            disabled={this.state.voteLoading}
            onPress={() => {
              this.setState({ commentID: item?.id }, () => this.likeCommentpost(index))
            }}
          >
            <Image
              source={item?.attributes?.upvoted === true ? upVoteYellow : upVoteGrey}
              resizeMode={'contain'}
              style={styles.like_style}
            />
          </TouchableOpacity>

          {this.state.voteLoading && this.state.selectedCommentIndex === index ? (
            <ActivityIndicator color="#c4c0c0" />
          ) : (
            <Text
              style={[styles.ratingText, { color: item?.attributes?.upvoted ? '#FFC925' : this.voteStyle(item) }]}>
              {item?.attributes?.totalvotecount || 0}
            </Text>
          )}
          <TouchableOpacity
            testID="disLikeID"
            disabled={this.state.voteLoading}
            onPress={() => {
              this.setState({ commentID: item.id }, () => this.dislikeCommentpost(index))
            }}
          >
            <Image
              source={item?.attributes?.downvoted === true ? downVoteBlue : downVoteGrey}
              resizeMode={'contain'}
              style={styles.dislikearrow_style}
            />
          </TouchableOpacity>
        </View>
      </View>
    );

  };
  // Customizable Area End
  render() {
    // Customizable Area Start
    console.log('postLoading', this.state.language)
    // Customizable Area End
    return (
      <View style={styles.container}>
        <SafeAreaView>
          {/* Customizable Area Start */}
          {this.topHeaderSettings()}
          {this.state.postsLoading ? (
            <View style={{ height: screenHeight - Scale(120), justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color="#c4c0c0" />
            </View>
          ) : (
            <FlatList testID="List"
              contentContainerStyle={styles.commensWrapper}
              ListEmptyComponent={() => this.emptyList()}
              data={this.state.commentsActivity}
              refreshing={this.state.postsLoading}
              onRefresh={() => this.onCommentsRefresh()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => this.commentDetails(item, index)}
              keyExtractor={(item: any) => item.id}
              refreshControl={<RefreshControl refreshing={this.state.postsLoading} onRefresh={this.onCommentsRefresh} />}
            />
          )}
          {/* Customizable Area End */}
        </SafeAreaView>
      </View>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
  },
  commensWrapper: {
    paddingBottom: Scale(60),
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileText: {
    left: Scale(7),
  },
  divider: {
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  replyImage_profile: {
    width: Scale(20),
    height: Scale(20),
    borderRadius: Scale(20),
  },
  addYourReply: {
    paddingVertical: 6,
    color: "#c4c0c0",
  },
  image_profile: {
    width: Scale(40),
    height: Scale(40),
    borderWidth: Scale(1),
    borderRadius: Scale(20),
    borderColor: "white",
  },
  backarrow_style: {
    width: Scale(20),
    height: Scale(18),
    resizeMode: "contain",
    transform: [{ rotate: '180deg' }]
  },
  backarrow_style_en: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: "contain",
  },
  icoNewest: {
    height: 14,
    width: 14,
    marginLeft: 8,
  },
  textNewest: {
    fontSize: 14,
    textAlign: "right",
    fontWeight: "bold"
  },
  like_style: {
    width: Scale(18),
    height: Scale(20),
  },
  replaceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Scale(13),
  },
  profileTextName: {
    color: "#c4c0c0",
  },
  replaceText: {
    color: "#c4c0c0",
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
  repliesContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 3,
    paddingLeft: Scale(15),
    maxWidth: Scale(250),
  },
  dislikearrow_style: {
    width: Scale(18),
    height: Scale(20),
  },
  profileTextChat: {
    fontSize: Scale(16),
    marginTop: Scale(6),
    display: "flex",
    flexShrink: 1,
    maxWidth: Scale(250),
  },
  textAlign: {
    textAlign: "left"
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
  dateText: {
    color: "#c4c0c0",
    // fontSize:Scale(12),
    marginLeft: Scale(3),
  },
  horizontalCommentText: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  replacearrowimage: {
    tintColor: "#c4c0c0",
    width: Scale(14),
    height: Scale(14),
    marginLeft: Scale(5),
  },
});
// Customizable Area End
