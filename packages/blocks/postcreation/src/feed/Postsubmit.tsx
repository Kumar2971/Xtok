import React from "react";
// Customizable Area Start
import scale from "../../../../components/src/Scale";
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
  Platform, TouchableWithoutFeedback,
  FlatList, Modal, BackHandler,
} from "react-native";
import {
  ArrowLeft,
  Audience,
  Visibility,
  Comments,
  Schedule,
  ArrowRight,
  sounds,
} from "../feed/assets";
// Customizable Area End
import PostCreationController from "./PostCreationController";
import { Props } from "./PostCreationCommonController";
import { translate } from "../../../../components/src/i18n/translate";
import { LocationGrey } from "../../../ElasticSearch/src/assets";
import moment from "moment";
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
export default class Postsubmit extends PostCreationController {
  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();

    if (this.props.route?.params?.setvisibility) {
      this.setState({
        setvisibility: this.props.route?.params?.setvisibility,
      });
    }


    if (this.props.route?.params?.setSchedule) {
      this.setState({
        setSchedule: this.props.route?.params?.setSchedule,
        rawDate: this.props.route?.params?.rawDate ? this.props.route?.params?.rawDate : new Date(),
      });
    }

    this.props.navigation.addListener("focus", () => {
      this.addListnerFunc()
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  // Customizable Area End
  constructor(props: Props) {
    super(props);

  }

  // Customizable Area Start
  addListnerFunc = () => {
    if (this.props.route?.params?.setvisibility || this.props.route?.params?.setvisibility == 0) {
      this.setState({
        setvisibility: this.props.route?.params?.setvisibility,
      });
    }
    if (this.props.route?.params?.selestaudience || this.props.route?.params?.selestaudience == 0) {
      this.setState({
        selestaudience: this.props.route?.params?.selestaudience,
      });
    }
    if (this.props.route?.params?.setcomments || this.props.route?.params?.setcomments == 0) {
      this.setState({
        setcomments: this.props.route?.params?.setcomments,
      });
    }
    if (this.props.route?.params?.setSchedule || this.props.route?.params?.setSchedule != ''
      || this.props.route?.params?.rawDate || !this.props.route?.params?.rawDate
    ) {
      this.setState({
        setSchedule: this.props.route?.params?.setSchedule,
        rawDate: this.props.route?.params?.rawDate ? this.props.route?.params?.rawDate : new Date(),

      });
    }
    if (this.props.route?.params?.location) {
      this.setState({
        location: this.props.route?.params?.location,
        latLong: this.props.route?.params?.latLong,
      });
    }
  }
  getVisibility(status: number) {
    if (status == 0) {
      return translate("public");
    } else if (status == 1) {
      return translate("unlisted");
    } else {
      return translate("private");
    }
  }

  getCommentStatus(status: number) {
    if (status == 0) {
      return translate("allow");
    } else if (status == 1) {
      return translate("hold_potentially");
    } else if (status == 2) {
      return translate("disable_comments");
    }
    return ''
  }

  getaudience(status: number) {
    if (status == 0) {
      return translate("no_Restrictions");
    } else if (status == 1) {
      return translate("restrict");
    }
  }

  proceedToSearchTags(searchTag: string) {
    this.timerForSearch = setTimeout(() => {
      this.searchTagsByName(searchTag)
    }, 2000)
  }

  proceedToSearch(searchTxt: string) {
    this.timerForSearch = setTimeout(() => {
      this.searchAccountsByName(searchTxt)
    }, 2000)
  }

  getSchedule(index: 0 | 1 | 2) {
    switch (index) {
      case 0:
        return translate("Now");
      case 1:
        return translate("Later");
      case 2:
        return moment(this.state.setSchedule).format("MMM DD, YYYY hh:mm A");
      default:
        return translate("Now");
    }
  }

  onBackSpaceFunc = (txt: any) => {
    if (txt !== '') {
      const arr1 = this.getSplittedArray(txt);
      if (arr1.length > 0 && arr1[arr1.length - 1].startsWith('@')) {
        this.setState({ isShowUserList: true })
        clearTimeout(this.timerForSearch)
        this.proceedToSearch(arr1[arr1.length - 1].replace('@', ''))
        return
      } else if (arr1.length > 0 && arr1[arr1.length - 1].startsWith('#')) {
        this.setState({ isShowTagsList: true })
        clearTimeout(this.timerForSearch)
        this.proceedToSearchTags(arr1[arr1.length - 1].replace('#', ''))
        return
      }
    }
  }

  onSearchBackFunc = (txt: any) => {
    const arr1 = this.getSplittedArray(txt);
    if (arr1.length > 0 && arr1[arr1.length - 1].startsWith('#')) {
      clearTimeout(this.timerForSearch)
      this.proceedToSearchTags(arr1[arr1.length - 1].replace('#', ''))
    } else {
      this.setState({ isShowTagsList: false, tagsSuggetionList: [] })
    }
  }

  onhashtagSearch = (txt: any) => {
    if(txt.length < 4){
      return
    }
    const arr1 = this.getSplittedArray(txt);
    if (arr1.length > 0 && arr1[arr1.length - 1].startsWith('#')) {

      const filteredArray = this.state.selectedTagsList.filter((item: any) => {
        return !(txt.length - 1 >= item.startIndex && txt.length - 1 <= item.endIndex)
      })
      filteredArray.length > 0 && this.setState({ selectedTagsList: filteredArray })
    }
  }

  inCaptionFunc = (txt: any) => {
    if(txt.length < 4){
      return
    }
    if (txt !== '' && txt.endsWith('@')) {
      //show flatlist
      clearTimeout(this.timerForSearch)
      this.proceedToSearch('')

    } else if (txt !== '' && txt.endsWith('#')) {
      //show flatlist
      clearTimeout(this.timerForSearch)
      this.proceedToSearchTags('')
    } else if (txt !== '' && this.state.isShowUserList) {
      //on backspace - check if current text is eligible for tag search or not
      const arr1 = this.getSplittedArray(txt);


      if (arr1.length > 0 && arr1[arr1.length - 1].startsWith('@')) {
        clearTimeout(this.timerForSearch)
        this.proceedToSearch(arr1[arr1.length - 1].replace('@', ''))
      } else {
        this.setState({ isShowUserList: false, accountSuggetionList: [] })
      }
    } else if (txt !== '' && this.state.isShowTagsList) {
      //on backspace - check if current text is eligible for tag search or not
      this.onSearchBackFunc(txt)
    } else {
      //on backspace - check if current text is eligible for tag search or not
      this.onBackSpaceFunc(txt)
      this.setState({ caption: txt, isShowUserList: false, isShowTagsList: false, accountSuggetionList: [], tagsSuggetionList: [] })
    }
  }

  onCaptionTextChange = (txt: string) => {
    if (txt === '') {
      this.apiSearchAccount = ""
      clearTimeout(this.timerForSearch)
      this.setState({
        caption: '',
        selectedAccountList: [],
        selectedTagsList: [],
        isShowUserList: false,
        isShowTagsList: false,
        accountSuggetionList: [],
        tagsSuggetionList: [],
      })
    } else {
      if (txt.length < this.state.caption.length && this.state.selectedAccountList.length > 0) {
        //it is backspace so remove tagged users from list
        const arr1 = this.getSplittedArray(txt);
        if (arr1.length > 0 && arr1[arr1.length - 1].startsWith('@')) {

          const filteredArray = this.state.selectedAccountList.filter((item: any) => {
            return !(txt.length - 1 >= item.startIndex && txt.length - 1 <= item.endIndex)
          })
          filteredArray.length > 0 && this.setState({ selectedAccountList: filteredArray })
        }

      } else if (txt.length < this.state.caption.length && this.state.selectedTagsList.length > 0) {
        //it is backspace so remove tagged users from list
        this.onhashtagSearch(txt)

      }
      this.setState({ caption: txt }, () => {

        // for search
        this.inCaptionFunc(txt)
      })
    }

  }

  renderUserItem = ({ item, index }: any) => {
    return (<TouchableOpacity
    testID="accountBtn"
      onPress={() => {

        const newText = this.state.caption.substring(0, this.state.caption.lastIndexOf('@')) + `@${item?.user_name || ''} `
        item.startIndex = this.state.caption.substring(0, this.state.caption.lastIndexOf('@')).length - 1//needed to remove tag
        item.endIndex = newText.length - 1//needed to remove tag
        this.setState({ isShowUserList: false, selectedAccountList: [...this.state.selectedAccountList, item] }, () => {
          this.setState({ caption: newText })
        })
      }}>
      <Text
        style={{
          fontSize: scale(16),
          padding: 15,
        }}>
        @{item?.user_name}
      </Text>
    </TouchableOpacity>)
  }

  renderTagsItem = ({ item, index }: any) => {
    return (<TouchableOpacity
      testID="tagBtn"
      onPress={() => {

        const newText = this.state.caption.substring(0, this.state.caption.lastIndexOf('#')) + `#${item?.attributes?.name || ''} `
        item.startIndex = this.state.caption.substring(0, this.state.caption.lastIndexOf('#')).length - 1//needed to remove tag
        item.endIndex = newText.length - 1//needed to remove tag
        this.setState({ isShowTagsList: false, selectedTagsList: [...this.state.selectedTagsList, item] }, () => {
          this.setState({ caption: newText })
        })
      }}>
      <Text
        style={{
          fontSize: scale(16),
          padding: 15,
        }}>
        #{item?.attributes?.name}
      </Text>
    </TouchableOpacity>)
  }

  renderTagList = () => {

    return (
      <FlatList
        testID="tagsSuggetionList"
        data={this.state.tagsSuggetionList}
        keyExtractor={(item: any, index) => index.toString()}
        renderItem={this.renderTagsItem}
      />
    )
  }

  renderUserTagList = () => {
    return (
      <FlatList
        testID="accountSuggetionList"
        data={this.state.accountSuggetionList}
        keyExtractor={(item: any, index) => index.toString()}
        renderItem={this.renderUserItem}
      />
    )
  }
  componentWillUnmount = async () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  onLocationSelected = (location: any) => {
    this.props.navigation.goBack();

  }

  renderAudio = () => {
    if (this.state.audioData?.attributes?.audio) {
      return (<View style={[styles.innerItems]}>
        <View
          style={[styles.innerItemsSubAlignment]}
        >
          <View style={[styles.innerItemsAlignment]}>
            <Image
              source={sounds}
              style={[styles.detailIcon, styles.audioIcon]}
            />
            <Text style={styles.itemTitle}>{translate("audio")}</Text>
          </View>
          <View style={[styles.innerItemsAlignment]}>
            <Text numberOfLines={1} style={styles.itemText}>
              {this.state.audioData?.attributes?.title || translate("noTitle")}
            </Text>
          </View>
        </View>
      </View>)
    }
    return <></>
  }
  resultPoster = () => {
    if (this.state.resultPoster) {
      return (
        <Image
          style={styles.captionImage}
          source={{
            uri: this.state.resultPoster.includes('http') ? this.state.resultPoster : ('file://' + this.state.resultPoster),
          }}
        />
      )
    } else {
      return null;
    }
  }

  actionButtonsList = () => {
    if (this.state.postId) {
      return (
        <View style={styles.draftButton}>
          <TouchableOpacity
            testID="saveBtn"
            disabled={this.state.isLoading}
            onPress={() => {
              this.setState({ isLoadingDraft: true, isUpdateDraft: true, isSaveDraft: true });
              this.updateUploadPost(1)
            }}
          >
            <Text style={[styles.uploadButtonText]}>{translate("save")}</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.draftButton}>
          <TouchableOpacity
            disabled={this.state.isLoading}
            onPress={() => {
              this.setState({ openConfirmation: true });
            }}
          >
            <Text style={[styles.uploadButtonText]}>{translate("Draft")}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  moreActionButtons = () => {
    if (this.state.setSchedule === '' || this.state.setSchedule === undefined) {
      return this.actionButtonsList()
    } else {
      return null;
    }
  }

  uploadTextFunc = () => {
    if (this.state.isLoading) {
      return (
        <View  >
          <ActivityIndicator size="small" color="white" />
        </View>
      )
    }else{
      return (<Text style={[styles.uploadButtonText]}>{translate("Upload")}</Text>)
    }
  }

  getaudienceText = () => {
    if(this.props.route?.params?.selestaudience){
      return this.props.route.params.selestaudience
    }else{
      return this.state.selestaudience
    }
  }

  getCommentStatusText = () => {
    if(this.props.route?.params?.setcomments){
      return this.props.route.params.setcomments
    }else{
      return this.state.setcomments
    }
  }

  loaderFunc = () => {
    if (this.state.isLoadingDraft) {
      return (
        <View style={[styles.overLappedContainer, styles.alignCenter]}>
          <View style={styles.bgLoader}>
            <ActivityIndicator size={"large"} color={'#000'} />
          </View>
        </View>
      )
    } else {
      return null
    }
  }
  getArrowStyle() {
    return this.state.language === 'ar' ? { transform: [{ rotate: '180deg' }] } : {};
  }
  // Customizable Area End
  render() {
    // Customizable Area Start

    // Customizable Area End
    return (
      <SafeAreaView style={[styles.SafeAreaView]}>
        {/* Customizable Area Start */}
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View style={[styles.container]}>
            <View style={{ flex: 1, padding: 16 }}>
              <View style={[styles.header]}>
                <TouchableOpacity
                  testID="goBack"
                  onPress={() => this.onPressBackBtn()}
                >
                  <View style={[styles.innerItemsAlignment]}>
                    <Image source={ArrowLeft} style={[styles.detailIcon, this.state.language=='ar'&&{
                      transform: [{ rotate: '180deg' }]
                    }]} />
                    <Text
                      style={{ fontSize: scale(18), marginLeft: 5, fontWeight: "bold", color: "#000000" }}
                    >
                      {translate("Add_details")}
                    </Text>
                  </View>
                </TouchableOpacity>

              </View>

              <View
                style={[
                  styles.captionHead,
                  {
                    display: "flex",
                    padding: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  },
                ]}
              >

                {this.resultPoster()}

                <TextInput
                  testID="textInputID"
                  style={[styles.captionInput, this.state.language == 'ar' && {
                    textAlign: 'right'
                  }]}
                  onChangeText={(txt: string) => this.onCaptionTextChange(txt)}
                  value={this.state.caption}
                  placeholder={translate("Write_a_caption")}
                  placeholderTextColor="#B7BBC0"
                  multiline={true}
                  numberOfLines={4}
                />
              </View>

              <View style={[styles.divider]} />

              {
                !this.state.isShowUserList && !this.state.isShowTagsList && !this.state.isSuggetionLoading &&
                (
                  <>
                    <View style={[styles.innerItems]}>
                      <TouchableOpacity
                        style={[styles.innerItemsSubAlignment]}
                        testID="setvisibilityBtn"
                        onPress={() => this.onPressSetVisibility()}
                      >
                        <View style={[styles.innerItemsAlignment]}>
                          <Image
                            source={Visibility}
                            style={[styles.detailIcon, { marginRight: scale(15) }]}
                          />
                          <Text style={{ fontSize: scale(18) }}>{translate("Visibility")}</Text>
                        </View>
                        <View style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          flexWrap: "nowrap",
                        }}>
                          <Text style={{ fontSize: scale(18) }}>
                            {this.getVisibility(
                              this.props.route?.params?.setvisibility
                                ? this.props.route?.params?.setvisibility
                                : this.state.setvisibility
                            )}
                          </Text>
                          <Image
                            source={ArrowRight}
                            style={[styles.detailIcon, { marginLeft: scale(15), marginTop: 5 }, this.getArrowStyle()]}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.innerItems]}>
                      <TouchableOpacity
                        testID="selectAudienceBtn"
                        style={[styles.innerItemsSubAlignment]}
                        onPress={() => this.onPressSelectAudience()}
                      >
                        <View style={[styles.innerItemsAlignment]}>

                          <Image
                            source={Audience}
                            style={[styles.detailIcon, { marginRight: scale(15) }]}
                          />
                          <Text style={{ fontSize: scale(18) }}>{translate("Select_audience")}</Text>
                        </View>
                        <View style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          flexWrap: "nowrap",
                          flex: 1
                        }}>
                          <Text style={{ fontSize: scale(18), marginLeft: scale(10), flexWrap: 'wrap', textAlign: "right", flex: 1 }}>
                            {this.getaudience(this.getaudienceText() )}
                          </Text>
                          <Image
                            source={ArrowRight}
                            style={[styles.detailIcon, { marginLeft: scale(15), marginTop: 5 }, this.getArrowStyle()]}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.innerItems]}>
                      <TouchableOpacity
                        style={[styles.innerItemsSubAlignment]}
                        testID="ScheduleBtn"
                        onPress={() => this.onPressScheduleBtn()}
                      >
                        <View style={[styles.innerItemsAlignment]}>
                          <Image
                            source={Schedule}
                            style={[styles.detailIcon, { marginRight: scale(15) }]}
                          />
                          <Text style={{ fontSize: scale(18) }}>{translate("schedule")}</Text>
                        </View>
                        <View style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          flexWrap: "nowrap",
                        }}>
                          <Text style={{ fontSize: scale(18), marginLeft: scale(5) }}>
                            {
                              (this.state.setSchedule == '' || this.state.setSchedule === undefined) ? this.getSchedule(0) : this.getSchedule(2)
                            }
                          </Text>
                          <Image
                            source={ArrowRight}
                            style={[styles.detailIcon, { marginLeft: scale(15), marginTop: 5 }, this.getArrowStyle()]}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.innerItems]}>
                      <TouchableOpacity
                        style={[styles.innerItemsSubAlignment]}
                        testID="commentBtn"
                        onPress={() => this.onPresscommentBtn()}
                      >
                        <View style={[styles.innerItemsAlignment]}>
                          <Image
                            source={Comments}
                            style={[styles.detailIcon, { marginRight: scale(15) }]}
                          />
                          <Text style={{ fontSize: scale(18) }}>{translate("Comments")}</Text>
                        </View>
                        <View style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          flexWrap: "nowrap",
                          flex: 1
                        }}>
                          <Text style={{ fontSize: scale(18), flexWrap: 'wrap', textAlign: "right", flex: 1 }}>
                            {this.getCommentStatus(this.getCommentStatusText())}
                          </Text>
                          <Image
                            source={ArrowRight}
                            style={[styles.detailIcon, { marginLeft: scale(15), marginTop: 5 }, this.getArrowStyle()]}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.innerItems]}>
                      <TouchableOpacity
                        style={[styles.innerItemsSubAlignment]}
                        testID="locationBtn"
                        onPress={() => this.onPresslocationBtn()}

                      >
                        <View style={[styles.innerItemsAlignment]}>
                          <Image
                            source={LocationGrey}
                            style={[styles.detailIcon, { marginRight: scale(15) }]}
                          />
                          <Text style={{ fontSize: scale(18) }}>{translate("location")}</Text>
                        </View>
                        <View style={[styles.innerItemsAlignment]}>

                          {this.state.location?.description && <Text numberOfLines={1} style={{ maxWidth: scale(180), fontSize: scale(18) }}>{this.state.location.description}</Text>}
                          <Image
                            source={ArrowRight}
                            style={[styles.detailIcon, { marginLeft: scale(12), marginTop: 5 }, this.getArrowStyle()]}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    {this.renderAudio()}
                  </>
                )
              }
              {
                this.state.isShowUserList && !this.state.isSuggetionLoading &&
                this.renderUserTagList()
              }
              {
                this.state.isShowTagsList && !this.state.isSuggetionLoading &&
                this.renderTagList()
              }
              {
                this.state.isSuggetionLoading && <ActivityIndicator size="large" color='#FFC9247f' />
              }
            </View>

            <View style={[styles.viewRow, { padding: 10 }]}>
              <View style={styles.flexLeft}>
                {this.moreActionButtons()}
              </View>
              <View style={styles.flexRight}>
                <View
                  style={[
                    styles.uploadButton,
                    this.state.caption == "" && styles.uploadDisableButton,
                  ]}
                >
                  <TouchableOpacity
                    disabled={this.state.isLoading}
                    testID="upload"
                    onPress={() => this.onPressUploadBtn()}
                  >
                    {this.uploadTextFunc()}

                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.openConfirmation}
          onRequestClose={() => {
            this.setState({ openConfirmation: false });
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.viewCardBg}>
              <Text style={styles.textPopup}>{translate("save_as_draft")}</Text>
              <Text style={styles.subTextPopup}>{translate("draft_save")}</Text>
              <View style={[styles.viewRow, { marginTop: 30 }]}>
                <View style={styles.flexLeft}>
                  <View style={styles.draftButton}>
                    <TouchableOpacity
                      disabled={this.state.isLoading}
                      onPress={() => {
                        this.setState({ openConfirmation: false });
                      }}
                    >
                      <Text style={[styles.uploadButtonText]}>{translate("cancel")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.flexRight}>
                  <View style={styles.uploadButton}>
                    <TouchableOpacity
                      disabled={this.state.isLoading}
                      onPress={() => {
                        this.setState({ openConfirmation: false, savePostId: 1, isLoadingDraft: true });
                        this.uploadPost()
                      }}
                    >
                      <Text style={[styles.uploadButtonText]}>{translate("save_Draft")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        {this.loaderFunc()}
        {/* Customizable Area End */}
      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  SafeAreaView: {
    height: '100%',
    width: '100%',
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  divider: {
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginRight: 8,
    marginLeft: 8,
    marginBottom: 5,
  },
  detailIcon: {
    width: scale(30),
    height: scale(30),
    resizeMode: "contain",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
  },
  captionHead: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
  },
  loaderContainer: {
    flex: 1,
    height: screenHeight,
    justifyContent: 'center',
    alignContent: 'center',
    position: "absolute",
  },
  captionInput: {
    textAlignVertical: 'top',
    height: "100%",
    width: "74%",
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    backgroundColor: "#FAFAFA",
  },
  captionImage: {
    //Fixed selecting from gallery for iOS
    width: Platform.OS === "ios" ? scale(110) : "24%",
    height: Platform.OS === "ios" ? scale(120) : "100%",
    resizeMode: "cover",
    borderRadius: 5,
    marginRight: Platform.OS === "ios" ? 5 : 0
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexLeft: {
    flex: 1,
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRight: {
    flex: 1,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftButton: {
    borderRadius: 50,
    borderWidth: 0,
    borderColor: "#fff",
    width: scale(150),
    paddingVertical: scale(12),
    backgroundColor: "#fff2cc",
    shadowColor: "#ff9ba8",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  uploadButton: {
    borderRadius: 50,
    borderWidth: 0,
    borderColor: "#fff",
    width: scale(150),
    paddingVertical: scale(12),
    backgroundColor: "#FFC924",
    shadowColor: "#ff9ba8",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  uploadDisableButton: {
  },
  uploadButtonText: {
    textAlign: "center",
    fontSize: scale(16),
    color: "#000",
    fontWeight: "bold",
  },
  innerItems: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    marginRight: 8,
    marginLeft: 8,
    paddingVertical: 10,
  },
  innerItemsAlignment: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",

  },
  innerItemsSubAlignment: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  viewCardBg: {
    marginHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#FFF',
    padding: 20,
    paddingVertical: 25,
    height: 180,
    borderWidth: 1,
    borderColor: '#FFC925',
  },
  textPopup: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTextPopup: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
  },
  closeButtonStyle: {
    alignSelf: 'center',
    backgroundColor: '#FFC925',
    marginTop: 25,
    borderRadius: 50,
    height: 50,
    width: '45%',
  },
  overLappedContainer: {
    height: Platform.OS === 'android' ? '100%' : screenHeight,
    width: '100%',
    position: 'absolute',
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
    height: Platform.OS === 'android' ? '100%' : screenHeight,
  },
  bgLoader: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  audioIcon: {
    marginRight: scale(15),
    tintColor: 'gray'
  },
  itemTitle: {
    fontSize: scale(18)
  },
  itemText: {
    maxWidth: scale(180),
    fontSize: scale(18),
    paddingRight: scale(15),
  },
  arrow: {
    marginLeft: scale(15),
    marginTop: 5
  },
  arrow_ar: {
    transform: [{ rotate: '180deg' }]
  }
});
// Customizable Area End
