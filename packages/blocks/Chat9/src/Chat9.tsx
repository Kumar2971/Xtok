import React from "react";
// Customizable Area Start
import moment from "moment";
import {
  BackHandler,
  SafeAreaView,
  Dimensions,
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Modal,
  Keyboard,
} from "react-native";
import {
  RadioButton,
  RadioButtonInput,
} from "react-native-simple-radio-button";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import Video from "react-native-video";
import messaging from "@react-native-firebase/messaging"; //@ts-ignore -------changes breaking the code
import { imgLeftArrow } from "../../LiveFeedScheduling/src/assets";
import { I18nManager } from 'react-native';

// Merge Engine - import assets - Start
// Merge Engine - import assets - End
// Merge Engine - Artboard Dimension  - Start

let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375; // Merge Engine - Artboard Dimension  - End
const offsetValue = - (Dimensions.get("window").height) * 0.5;
// Customizable Area End

import Chat9Controller, { Props } from "./Chat9Controller";
import {
  addFriend,
  back,
  eyelook,
  hellooooo,
  more,
  profile_pic,
  send,
  shakehand,
  smileIcon,
  privatelive,
} from "./assets";
import { getStorageData } from "../../../framework/src/Utilities";
import Scale from "../../../components/src/Scale";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";
import { translate } from "../../../components/src/i18n/translate";
import AlertModal from "../../../components/src/AlertModal";
import { b3f3485e68b56a8ce29fd4ccd4c7f5fb7c74389f } from "../../comments/src/assets";
interface IReasonType {
  value: string;
  translationPlaceHolder?: string;
}

const REASONS: IReasonType[] = [
  {
    value: "Sexual Content",
    translationPlaceHolder: 'sexual_content'
  },
  {
    value: "Violent or Repulsive Content",
    translationPlaceHolder: "violent_or_Repulsive_Content",
  },
  {
    value: "Hateful or Abusive Content",
    translationPlaceHolder: "hateful_or_Abusive_Content"
  },
  {
    value: "Harmful or Dangerous Acts",
    translationPlaceHolder: "harmful_or_dangerous_Act"
  },
  {
    value: "Spam or Misleading",
    translationPlaceHolder: "spam_or_Misleading"
  },
  {
    value: "Child Abuse",
    translationPlaceHolder: "child_Abuse"
  },
  {
    value: "Other",
    translationPlaceHolder: "other"
  },
];
let d: any;
export default class Chat9 extends Chat9Controller {
  constructor(props: Props) {
    super(props); // Customizable Area Start
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    Dimensions.addEventListener("change", (e) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    }); // Customizable Area End
  }

  // Customizable Area Start
  // // Customizable Area End
  async componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({
        isKeyboardOpen: true
      })
    })

    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({
        isKeyboardOpen: false
      })
    })
    this.setState({ received_id: this.props?.route?.params?.acc_id }, () => { });

    this.CheckWhetherChatExists();
    const userId = await getStorageData("userID");
    const userProfileImage = await getStorageData("userProfilePic");
    this.setState({ selfUserProfilePic: userProfileImage, SelfUserId: userId });
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language });

    messaging().onMessage(async (remoteMessage: any) => {
      let parsedMessage = remoteMessage?.data;
      let account_id = remoteMessage?.data?.account_id;
      let user_message = remoteMessage?.data?.message;
      let user_message_id = remoteMessage?.messageId;
      let user_message_sentTime = remoteMessage?.sentTime;
      let user_attachments_type = remoteMessage?.data?.attachment_type;
      let user_Chat_Id = remoteMessage?.data?.chat_id;
      let imageUrl = parsedMessage?.attachments;
      let demoUrl = JSON.parse(imageUrl);
      let finalUserImage = demoUrl?.length ? demoUrl.url : "";

      const obj = {
        date: "",
        data: [
          {
            attributes: {
              account: [{}],
              account_id: account_id,
              attachment_type: user_attachments_type,
              attachments: demoUrl,
              chat_id: user_Chat_Id,
              created_at: user_message_sentTime,
              id: user_message_id,
              is_mark_read: false,
              last_chat_time: "",
              message: user_message,
              updated_at: "",
            },
            id: user_message_id,
            type: "chat_message",
          },
        ],
      };

      if (this.state.chat_id == user_Chat_Id) {
        this.state.userChatHistory?.unshift(obj);
      }

      this.setState({ refresh: !this.state.refresh });
    });
  }

  async componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }
  renderReasons = ({ item }: any) => {
    return (
      <View style={styles.ad5d3c8b0f49e11ed9a0b8bf868ff0a22}>
        <Text>{item?.title}</Text>
      </View>
    );
  };

  sentMessageModal() {
    return (
      <Modal
        //@ts-ignore -------changes breaking the code
        testID="modalID"
        animationType="slide"
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setState({
            modalVisible: false,
          });
        }}
      >
        <TouchableOpacity
          testID="touchableBtn"
          activeOpacity={1}
          style={[
            styles.container,
            {
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 0.5,
              borderColor: "rgb(247,202,78)",
            },
          ]}
          onPressOut={() =>
            this.setState({
              modalData: false,
            })
          }
        >
          <View style={styles.ad5d3c8b4f49e11ed9a0b8bf868ff0a22}>
            <Text style={styles.ad5d3c8b5f49e11ed9a0b8bf868ff0a22}>
              {translate("message_should_not_be_empty")}
            </Text>
            <TouchableOpacity
              testID="modalVisibleId"
              onPress={() =>
                this.setState({
                  modalVisible: false,
                })
              }
              style={styles.ad5d3c8b6f49e11ed9a0b8bf868ff0a22}
            >
              <Text style={styles.ad5d3efc0f49e11ed9a0b8bf868ff0a22}>{translate("ok")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  yesModal() {
    return (
      <Modal
        //@ts-ignore -------changes breaking the code
        testID="yesModalId"
        visible={this.state.sentModal}
        transparent
        onRequestClose={() =>
          this.setState({
            sentModal: false,
          })
        }
      >
        <TouchableOpacity
          testID="pressOutId"
          activeOpacity={1}
          style={[
            styles.container,
            {
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
          onPressOut={() =>
            this.setState({
              modalData: false,
            })
          }
        >
          <View style={styles.ad5d3efc1f49e11ed9a0b8bf868ff0a22}>
            <Text style={styles.ad5d3efc2f49e11ed9a0b8bf868ff0a22}>
              {translate("report_Sent")}
            </Text>
            <View style={styles.ad5d3efc3f49e11ed9a0b8bf868ff0a22}></View>
            <Text style={styles.ad5d3efc4f49e11ed9a0b8bf868ff0a22}>
              {translate("thank_you_for_reporting")}
            </Text>
            <TouchableOpacity
              testID="continueId"
              onPress={() =>
                this.setState({
                  sentModal: false,
                })
              }
              style={styles.ad5d3efc5f49e11ed9a0b8bf868ff0a22}
            >
              <Text style={styles.ad5d3efc6f49e11ed9a0b8bf868ff0a22}>
                {translate("continue")}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  optionsModal() {
    return (

      <Modal
        //@ts-ignore -------changes breaking the code
        testID="optionModalId"
        visible={this.state.modalData}
        transparent
        onRequestClose={() =>
          this.setState({
            modalData: false,
          })
        }
      >
        <TouchableOpacity
          testID="optionPressOutId"
          activeOpacity={1}
          style={styles.container}
          onPressOut={() =>
            this.setState({
              modalData: false,
            })
          }
        >
          <TouchableWithoutFeedback>
            <View style={styles.ad5d3efc7f49e11ed9a0b8bf868ff0a22}>
              <TouchableOpacity
                testID="captureId"
                style={styles.ad5d3efc8f49e11ed9a0b8bf868ff0a22}
                onPress={() => {
                  this.takePhoto();
                }}
              >
                <Image
                  source={addFriend}
                  style={styles.ad5d3efc9f49e11ed9a0b8bf868ff0a22}
                />
                <Text style={styles.ad5d3efcaf49e11ed9a0b8bf868ff0a22}>
                  {translate("capture_photo")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="uploadId"
                style={styles.ad5d3efcbf49e11ed9a0b8bf868ff0a22}
                onPress={() => {
                  this.uploadPhoto();
                }}
              >
                <Image
                  source={addFriend}
                  style={styles.ad5d3efccf49e11ed9a0b8bf868ff0a22}
                />
                <Text style={styles.ad5d3efcdf49e11ed9a0b8bf868ff0a22}>
                  {translate("pick_photo")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="uploadVideId"
                style={styles.ad5d3efcef49e11ed9a0b8bf868ff0a22}
                onPress={() => this.uploadVideo()}
              >
                <Image
                  source={addFriend}
                  style={styles.ad5d3efcff49e11ed9a0b8bf868ff0a22}
                />
                <Text style={styles.ad5d3efd0f49e11ed9a0b8bf868ff0a22}>
                  {translate("pick_video")}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }

  dateChange = (currentMessage: any, prevMessage: any) => {
    return (
      moment(currentMessage?.attributes?.created_at).format("YYYY-MM-DD") !==
      moment(prevMessage?.attributes?.created_at).format("YYYY-MM-DD")
    );
  };
  checkDate = (dt: any) => {
    d = dt;
  };
  renderChat = ({ item, index }: any) => {
    let videoRef: React.RefObject<Video> = React.createRef<Video>();
    let account_id = item?.attributes?.account_id;
    return (
      <View>
        {account_id == this.state.SelfUserId &&
          item?.attributes?.message != "" ? (
          <View style={styles.ad5d416d0f49e11ed9a0b8bf868ff0a22}>
            <TouchableOpacity
              testID="userMessagebtn1"
              onLongPress={() => this.userMessage(item?.attributes?.id)}
              style={styles.ad5d416d1f49e11ed9a0b8bf868ff0a22}
            >
              <Text style={styles.senderMsgTxt}>{item?.attributes.message}</Text>
            </TouchableOpacity>
            <Image
              source={
                this.state.selfUserProfilePic
                  ? {
                    uri: this.state.selfUserProfilePic,
                  }
                  : profile_pic
              }
              style={styles.ad5d416d3f49e11ed9a0b8bf868ff0a22}
            />
          </View>
        ) : account_id == this.state.SelfUserId &&
          item?.attributes?.attachment_type == "video" ? (
          <View style={styles.ad5d416d4f49e11ed9a0b8bf868ff0a22}>
            {item?.attributes?.attachments.map((e: any) => (
              <View style={styles.ad5d416d5f49e11ed9a0b8bf868ff0a22}>
                <TouchableOpacity
                  testID="userMessageBtn"
                  onLongPress={() => this.userMessage(item?.attributes?.id)}
                  style={styles.ad5d416d6f49e11ed9a0b8bf868ff0a22}
                  onPress={() =>
                    this.props.navigation.navigate("ImageScreen", {
                      vidUrl: e?.url,
                    })
                  }
                >
                  <Video
                    source={{
                      uri: e?.url,
                    }}
                    ref={videoRef}
                    // poster={
                    //   "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX26341428.jpg"
                    // }
                    controls={false}
                    paused={true}
                    onLoad={()=>{videoRef?.current?.seek(0)}}
                    resizeMode="stretch"
                    fullscreen={true}
                    style={styles.ad5d416d7f49e11ed9a0b8bf868ff0a22}
                  />
                  <Image source={b3f3485e68b56a8ce29fd4ccd4c7f5fb7c74389f} style={styles.playButton}/>
                </TouchableOpacity>
                <Image
                  source={
                    this.state.selfUserProfilePic
                      ? {
                        uri: this.state.selfUserProfilePic,
                      }
                      : profile_pic
                  }
                  style={styles.ad5d416d8f49e11ed9a0b8bf868ff0a22}
                />
              </View>
            ))}
          </View>
        ) : account_id !== this.state.SelfUserId &&
          item?.attributes?.attachment_type == "video" ? (
          <View style={styles.ad5d416d9f49e11ed9a0b8bf868ff0a22}>
            {item?.attributes?.attachments.map((e: any) => (
              <View style={styles.ad5d416daf49e11ed9a0b8bf868ff0a22}>
                <Image
                  source={
                    this.state.secondUserChatPic == "" ||
                      this.state.secondUserChatPic == null ||
                      this.state.secondUserChatPic == undefined
                      ? profile_pic
                      : {
                        uri: this.state.secondUserChatPic,
                      }
                  }
                  style={styles.ad5d416dbf49e11ed9a0b8bf868ff0a22}
                />
                <TouchableOpacity
                  onLongPress={() => this.userMessage(item?.attributes?.id)}
                  style={styles.ad5d416dcf49e11ed9a0b8bf868ff0a22}
                  onPress={() =>
                    this.props.navigation.navigate("ImageScreen", {
                      vidUrl: e?.url,
                    })
                  }
                >
                  <Video
                    source={{
                      uri: e?.url,
                    }}
                    ref={videoRef}
                    // poster={
                    //   "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX26341428.jpg"
                    // }
                    controls={false}
                    paused={true}
                    onLoad={()=>{videoRef?.current?.seek(0)}}
                    resizeMode="stretch"
                    fullscreen={true}
                    style={styles.ad5d416ddf49e11ed9a0b8bf868ff0a22}
                  />
                  <Image source={b3f3485e68b56a8ce29fd4ccd4c7f5fb7c74389f} style={styles.playButton}/>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : account_id == this.state.SelfUserId &&
          item?.attributes?.attachment_type == "image" ? (
          <View style={styles.ad5d416def49e11ed9a0b8bf868ff0a22}>
            {item?.attributes?.attachments.map((e: any) => (
              <View style={styles.ad5d416dff49e11ed9a0b8bf868ff0a22}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("ImageScreen", {
                      imageUrl: e?.url,
                    })
                  }
                  onLongPress={() => this.userMessage(item?.attributes?.id)}
                  style={styles.ad5d416e0f49e11ed9a0b8bf868ff0a22}
                >
                  <Image
                    source={{
                      uri: e?.url,
                    }}
                    style={styles.ad5d416e1f49e11ed9a0b8bf868ff0a22}
                  />
                </TouchableOpacity>
                <Image
                  source={
                    this.state.selfUserProfilePic
                      ? {
                        uri: this.state.selfUserProfilePic,
                      }
                      : profile_pic
                  }
                  style={styles.ad5d43de0f49e11ed9a0b8bf868ff0a22}
                />
              </View>
            ))}
          </View>
        ) : account_id !== this.state.SelfUserId &&
          item?.attributes?.attachment_type == "image" ? (
          <View style={styles.ad5d43de1f49e11ed9a0b8bf868ff0a22}>
            {item?.attributes?.attachments.map((e: any) => (
              <View style={styles.ad5d43de2f49e11ed9a0b8bf868ff0a22}>
                <Image
                  source={
                    this.state.secondUserChatPic == "" ||
                      this.state.secondUserChatPic == null ||
                      this.state.secondUserChatPic == undefined
                      ? profile_pic
                      : {
                        uri: this.state.secondUserChatPic,
                      }
                  }
                  style={styles.ad5d43de3f49e11ed9a0b8bf868ff0a22}
                />

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("ImageScreen", {
                      imageUrl: e?.url,
                    })
                  }
                  style={styles.ad5d43de4f49e11ed9a0b8bf868ff0a22}
                >
                  <Image
                    source={{
                      uri: e?.url,
                    }}
                    style={styles.ad5d43de5f49e11ed9a0b8bf868ff0a22}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.ad5d43de6f49e11ed9a0b8bf868ff0a22}>
            <Image
              source={
                (this.state.secondUserChatPic == "" ||
                  this.state.secondUserChatPic == null ||
                  this.state.secondUserChatPic == undefined)
                  ? profile_pic
                  : {
                    uri: this.state.secondUserChatPic,
                  }
              }
              style={styles.ad5d43de7f49e11ed9a0b8bf868ff0a22}
            />
            <Text style={styles.ad5d43de8f49e11ed9a0b8bf868ff0a22}>
              {item?.attributes?.message}
            </Text>
          </View>
        )}
      </View>
    );
  };
  viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  reportModal() {
    return (
      <Modal
        //@ts-ignore -------changes breaking the code
        testID="reportModalId"
        animationType="fade"
        transparent
        visible={this.state.showReportModal}
        onRequestClose={() => {
          this.setState({
            showReportModal: false,
          });
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
            <View style={styles.modalContainer}>
            <View style={[styles.report_modal_view]}>
              <View style={styles.report_header_title}>
                <Text style={styles.report_title}>{translate("report")}</Text>
              </View>

              <FlatList
                testID="flatListreport"
                //@ts-ignore -------changes breaking the code
                data={REASONS}
                onEndReachedThreshold={0}
                keyExtractor={(item: string, index) => item}
                renderItem={this.renderReportReasons}
                style={{height: this.state.isKeyboardOpen ? Scale(300) : undefined}}
              />
        
              <View style={styles.report_footer_container}>
                <View style={styles.report_footer_buttons_container}>
                  <TouchableOpacity
                    testID="cancleBtnId"
                    style={styles.cancel_button}
                    onPress={() =>
                      this.setState({
                        showReportModal: false,
                        selectedReportReason: -1,
                      })
                    }
                  >
                    <Text style={styles.cancel_button_text}>{translate("cancel")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={this.state.inprocess}
                    style={styles.button}
                    onPress={() => this.onpressReport()}
                  >
                    <View>
                      <Text style={styles.report_button_text}>{translate("report")}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <AlertModal alertModal={this.state.alertModal} onPress2={(id: any) => { this.onPressOk(id) }}
          btnTitle2={this.state.alertModal.btnTitle2} btnTitle1={this.state.alertModal.btnTitle1} onPress1={() => { this.setState({ alertModal: { openAlertModal: false } }) }} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }


  renderReportReasons = ({ item, index }: any) => {
    return (
      <View
        style={[
          styles.report_item,
          index === 0 && {
            marginTop: 10,
          },
        ]}
      >
        <RadioButton labelHorizontal={true}>
          <RadioButtonInput
            testID="radioBtnId"
            obj={item}
            index={item.value}
            isSelected={this.state.selectedReportReason === item.value}
            onPress={() => this.selectReportReason(item.value)}
            buttonInnerColor={"#ffc831"}
            buttonOuterColor={"#ffc831"}
            buttonSize={16}
            buttonOuterSize={25}
            buttonStyle={{}}
            buttonWrapStyle={{
              marginLeft: 20,
            }}
          />
          <TouchableOpacity
            testID="radioBtnValueId"
            onPress={() => this.selectReportReason(item.value)}
            style={styles.ad5d464f0f49e11ed9a0b8bf868ff0a22}
          >
            <Text style={[styles.ad5d464f1f49e11ed9a0b8bf868ff0a22, this.state.language == "ar" && { textAlign: "left" }]}>
              {translate(item?.translationPlaceHolder)}
            </Text>
          </TouchableOpacity>
        </RadioButton>
        { item.value == "Other" && this.state.selectedReportReason == "Other" ? (
          <View style={styles.ad5d43de9f49e11ed9a0b8bf868ff0a22}>
            <TextInput
              testID="descriptionTextId"
              placeholder={translate("enter_description")}
              value={this.state.report_desc}
              onChangeText={this.enterdescription}
              editable={
                this.state.selectedReportReason == "Other" ? true : false
              }
              placeholderTextColor="black"
              style={[styles.ad5d43deaf49e11ed9a0b8bf868ff0a22, this.state.language == "ar" ? { textAlign: "right" } : { textAlign: "left" }]}
            />
          </View>
        ) : null}
      </View>
    );
  };

  renderOptions() {
    return (
      <Modal
        //@ts-ignore -------changes breaking the code
        testID="renderOptionModal"
        visible={this.state.showOptions}
        transparent
        onRequestClose={() =>
          this.setState({
            showOptions: false,
          })
        }
      >
        <TouchableOpacity
          testID="touchOutSideRenderoptionModal"
          activeOpacity={1}
          style={styles.container}
          onPressOut={() =>
            this.setState({
              showOptions: false,
            })
          }
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <TouchableOpacity
                testID="muteNotificationId"
                onPress={() => {
                  if (this.state.mute_status != undefined) {
                    this.setState({
                      mute_status: !this.state.mute_status,
                    });
                  } else if (this.state.mute_status == undefined) {
                    this.setState({
                      mute_status: false,
                    });
                  }
                  this.muteChat();
                }}
              >
                {this.state.mute_status ||
                  this.state.mute_status == undefined ? (
                  <Text>{translate("mute_notifications")}</Text>
                ) : (
                  <Text>{translate("unmute_notifications")}</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                testID="renderOptionReportId"
                onPress={() =>
                  this.setState(
                    {
                      showOptions: false,
                    },
                    () =>
                      this.setState({
                        showReportModal: true,
                      })
                  )
                }
              >
                <Text>{translate("report")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="blockId"
                onPress={() => this.blockUser(this.state.received_id)}
              >
                {!this.state.block_status ? (
                  <Text>{translate("block")}</Text>
                ) : (
                  <Text>{translate("unblock")}</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                testID="deleteChatId"
                disabled={
                  this.state.userChatHistory.length === 0
                    ? !this.state.disable
                    : this.state.disable
                }
                onPress={() => this.deleteChat()}
              >
                <Text>{translate("delete_chat")}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }

  renderEmojiModal() {
    return (
      <Modal
        //@ts-ignore -------changes breaking the code
        testID="emojisModalId"
        visible={this.state.showEmojis}
        transparent
        onRequestClose={() =>
          this.setState({
            showEmojis: false,
          })
        }
      >
        <TouchableOpacity
          testID="onpressOutEmoji"
          activeOpacity={1}
          style={styles.container}
          onPressOut={() =>
            this.setState({
              showEmojis: false,
            })
          }
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalView2}>
              <EmojiSelector
                //@ts-ignore -------changes breaking the code
                testID="emojiSelectorId"
                category={Categories.symbols}
                onEmojiSelected={(emoji) => {
                  this.setState({
                    message: this.state.message + emoji,
                  });
                }}
                showSearchBar={false}
                columns={9}
                showHistory={true}
                showSectionTitles={false}
              />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }

  onPressOk = (id: any) => {
    if (id) {
      console.log("iddddd@@@@@", id)
      this.deleteMessage(id),
        this.setState({ alertModal: { openAlertModal: false } })
    } else {
      this.setState({ alertModal: { openAlertModal: false } })
    }
  }

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.mainContainer}>
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : offsetValue}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              height:'100%',
              width:'100%'
            }}>
          <View style={{
            height:'100%',
            width:'100%'
          }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity testID="goBackId" onPress={() => this.goBackId()}>
            <Image source={imgLeftArrow} style={[styles.backImage, this.state.language === 'ar' && styles.backImage_ar]} />
          </TouchableOpacity>
          <Text style={styles.directTextStyle}>
            {this.props?.route?.params?.passed_name
              ? this.props?.route?.params?.passed_name
              : this.state.secondUserName}
          </Text>
          <View  style={styles.headerContaineNew}>
          <TouchableOpacity
            testID="privateliveBtnId"
            onPress={() =>
             this.goToLiveStream()
            }
          >
            <Image source={privatelive} style={styles.privatelive} />
          </TouchableOpacity>
          <TouchableOpacity
            testID="addImageBtnId"
            onPress={() =>
              this.setState({
                showOptions: !this.state.showOptions,
              })
            }
          >
            <Image source={more} style={styles.addImage} />
          </TouchableOpacity>
          </View>
          {this.renderOptions()}
          {this.optionsModal()}
          {this.renderEmojiModal()}
          {this.yesModal()}
          {this.sentMessageModal()}
          {this.reportModal()}
        </View>

          <View style={[styles.container]}>
            <View style={styles.horizontalLine} />
            {this.state.userChatHistory.length === 0 && !this.state.loading ? (
              <View style={styles.ad5d464f2f49e11ed9a0b8bf868ff0a22}>
                <View style={styles.ad5d464f3f49e11ed9a0b8bf868ff0a22}></View>
                <View style={styles.ad5d464f4f49e11ed9a0b8bf868ff0a22}>
                  <Text>{`${translate("sayHiTo")} ${this.state.secondUserName}`}</Text>
                </View>
                <View style={styles.ad5d464f5f49e11ed9a0b8bf868ff0a22}>
                  <TouchableOpacity
                    testID="clapEmojiId"
                    disabled={
                      this.state.loading
                        ? !this.state.sticker
                        : this.state.sticker
                    }
                    onPress={() => this.functionClapping()}
                  >
                    <Image
                      source={hellooooo}
                      style={styles.ad5d464f6f49e11ed9a0b8bf868ff0a22}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    testID="eyeEmojiId"
                    disabled={
                      this.state.loading
                        ? !this.state.sticker
                        : this.state.sticker
                    }
                    onPress={() => this.functioneyeEmoji()}
                  >
                    <Image
                      source={eyelook}
                      style={styles.ad5d464f7f49e11ed9a0b8bf868ff0a22}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    testID="heyEmojiId"
                    disabled={
                      this.state.loading
                        ? !this.state.sticker
                        : this.state.sticker
                    }
                    onPress={() => this.functionHeyEmoji()}
                  >
                    <Image
                      source={shakehand}
                      style={styles.ad5d48c00f49e11ed9a0b8bf868ff0a22}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            {
              this.state.loading ? (
                <View style={styles.ad5d48c01f49e11ed9a0b8bf868ff0a22}>
                  <ActivityIndicator color="lightgreen" size={40} />
                </View>
              ) : null
            }
            <View style={styles.ad5d48c02f49e11ed9a0b8bf868ff0a22}>
              <SectionList
                testID="sectionListBtn"
                sections={this.state.userChatHistory}
                keyExtractor={(item, index) => item + index}
                contentContainerStyle={styles.sectionContainer}
                renderSectionFooter={({ section: { date } }) => (
                  <View style={styles.ad5d48c03f49e11ed9a0b8bf868ff0a22}>
                    <Text style={styles.ad5d48c04f49e11ed9a0b8bf868ff0a22}>
                      {" "}
                      {date}{" "}
                    </Text>
                  </View>
                )}
                inverted
                bounces={false}
                extraData={this.state.userChatHistory}
                renderItem={this.renderChat}
                onEndReachedThreshold={0.1}
              />
            </View>
            <View style={styles.ad5d48c05f49e11ed9a0b8bf868ff0a22}>
              {this.state.block_status ? (
                <Text style={styles.ad5d48c06f49e11ed9a0b8bf868ff0a22}>
                  {translate("you_have_blocked")}
                </Text>
              ) : null}
              <View style={styles.ad5d48c07f49e11ed9a0b8bf868ff0a22}>
                <View
                  //@ts-ignore -------changes breaking the code
                  style={[styles.inputContainer, {
                    marginTop: this.state.showEmojis ? (Platform.OS == "ios" ? -470 : -560) : null,
                  },
                  ]}
                >
                  <TextInput
                    testID="txtInput"
                    style={[styles.input, {
                      textAlign: I18nManager.isRTL ? "right" : "left"
                    }]}
                    editable={!this.state.block_status}
                    onChangeText={(text) => this.onChangeNumber(text)}
                    value={this.state.message}
                    autoCapitalize="none"
                    placeholder={`${translate("send_message")}`}
                  />
                  <TouchableOpacity
                    testID="addFriendModalTrue"
                    disabled={this.state.block_status}
                    onPress={() =>
                      this.setState({
                        modalData: true,
                      })
                    }
                  >
                    <Image
                      source={addFriend}
                      style={styles.ad5d48c08f49e11ed9a0b8bf868ff0a22}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    testID="emojiModalTrue"
                    disabled={this.state.block_status}
                    onPress={() =>
                      this.setState({
                        showEmojis: true,
                      })
                    }
                  >
                    <Image
                      source={smileIcon}
                      style={styles.ad5d48c09f49e11ed9a0b8bf868ff0a22}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  testID="btnExample"
                  disabled={
                    this.state.loading
                      ? !this.state.disableSend
                      : this.state.disableSend
                  }
                  onPress={() =>
                    !this.state.block_status ? this.createMessage() : null
                  }
                  //@ts-ignore -------changes breaking the code
                  style={{
                    marginTop: this.state.showEmojis ? (Platform.OS == "ios" ? -470 : -560) : null,
                  }}
                >
                  <Image
                    source={send}
                    style={styles.ad5d48c0bf49e11ed9a0b8bf868ff0a22}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

        {(this.state.alertModal?.alertMsg !== translate("please_select_a_reason") &&
        this.state.alertModal?.alertMsg !== translate("give_detailed_description")) &&
        <AlertModal alertModal={this.state.alertModal} onPress2={(id: any) => { this.onPressOk(id) }}
          btnTitle2={this.state.alertModal.btnTitle2} btnTitle1={this.state.alertModal.btnTitle1}
          onPress1={() => { this.setState({ alertModal: { openAlertModal: false } }) }} />}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    ); // Merge Engine - render - End
    // Customizable Area End
  }
} // Customizable Area Start

const styles = StyleSheet.create({
  ad5d3c8b0f49e11ed9a0b8bf868ff0a22: {
    marginBottom: 15,
  },
  ad5d3c8b1f49e11ed9a0b8bf868ff0a22: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 200,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 36,
    elevation: 8,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
  },
  ad5d3c8b2f49e11ed9a0b8bf868ff0a22: {
    marginVertical: 10,
    position: "absolute",
    right: 20,
  },
  ad5d3c8b3f49e11ed9a0b8bf868ff0a22: {
    height: 20,
    width: 20,
  },
  ad5d3c8b4f49e11ed9a0b8bf868ff0a22: {
    backgroundColor: "white",
    marginTop: 50,
    marginRight: 10,
    height: 160,
    width: "80%",
    paddingVertical: 25,
    paddingHorizontal: 12,
    justifyContent: "space-between",
    shadowColor: "#000",
    borderWidth: 1,
    borderColor: "rgb(247,202,78)",
    borderRadius: 10,
  },
  ad5d3c8b5f49e11ed9a0b8bf868ff0a22: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    alignSelf: "center",
  },
  ad5d3c8b6f49e11ed9a0b8bf868ff0a22: {
    backgroundColor: "rgb(247,202,78)",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgb(247,202,78)",
  },
  ad5d3efc0f49e11ed9a0b8bf868ff0a22: {
    alignSelf: "flex-end",
    fontWeight: "bold",
  },
  ad5d3efc1f49e11ed9a0b8bf868ff0a22: {
    width: "80%",
    height: 160,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "rgb(247,202,78)",
    paddingVertical: 10,
    backgroundColor: "white",
  },
  ad5d3efc2f49e11ed9a0b8bf868ff0a22: {
    alignSelf: "center",
    fontWeight: "bold",
  },
  ad5d3efc3f49e11ed9a0b8bf868ff0a22: {
    height: 0.2,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
  ad5d3efc4f49e11ed9a0b8bf868ff0a22: {
    alignSelf: "center",
    color: "grey",
    paddingLeft: 5,
    textAlign: "center",
  },
  ad5d3efc5f49e11ed9a0b8bf868ff0a22: {
    backgroundColor: "rgb(247,202,78)",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgb(247,202,78)",
  },
  ad5d3efc6f49e11ed9a0b8bf868ff0a22: {
    fontWeight: "bold",
  },
  ad5d3efc7f49e11ed9a0b8bf868ff0a22: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 80,
    left: "15%",
    backgroundColor: "rgb(222,222,222)",
    width: 300,
    borderRadius: 8,
    borderColor: "black",
    padding: 12,
    paddingVertical: 20,
  },
  ad5d3efc8f49e11ed9a0b8bf868ff0a22: {
    alignItems: "center",
    flexDirection: "row",
  },
  ad5d3efc9f49e11ed9a0b8bf868ff0a22: {
    height: 20,
    width: 20,
  },
  ad5d3efcaf49e11ed9a0b8bf868ff0a22: {
    fontSize: 10,
    marginLeft: 10
  },
  ad5d3efcbf49e11ed9a0b8bf868ff0a22: {
    alignItems: "center",
    flexDirection: "row",
  },
  ad5d3efccf49e11ed9a0b8bf868ff0a22: {
    height: 20,
    width: 20,
  },
  ad5d3efcdf49e11ed9a0b8bf868ff0a22: {
    fontSize: 10,
    marginLeft: 10
  },
  ad5d3efcef49e11ed9a0b8bf868ff0a22: {
    alignItems: "center",
    flexDirection: "row",
  },
  ad5d3efcff49e11ed9a0b8bf868ff0a22: {
    height: 20,
    width: 20,
  },
  ad5d3efd0f49e11ed9a0b8bf868ff0a22: {
    fontSize: 10,
    marginLeft: 10
  },
  ad5d416d0f49e11ed9a0b8bf868ff0a22: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "flex-end",
  },
  ad5d416d1f49e11ed9a0b8bf868ff0a22: {
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    right: 5,
    backgroundColor: "#F1F1F3",
    maxWidth: "60%",
  },
  senderMsgTxt: { 
    fontSize: 15,
    textAlign:"left",
  },
  ad5d416d2f49e11ed9a0b8bf868ff0a22: {},
  ad5d416d3f49e11ed9a0b8bf868ff0a22: {
    height: 20,
    width: 20,
    borderRadius: 30,
  },
  ad5d416d4f49e11ed9a0b8bf868ff0a22: {
    flexDirection: "column",
    alignItems: "flex-end",
    paddingVertical: 10,
  },
  ad5d416d5f49e11ed9a0b8bf868ff0a22: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  ad5d416d6f49e11ed9a0b8bf868ff0a22: {
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    right: 5,
    backgroundColor: "#F1F1F3",
    maxWidth: "60%",
  },
  ad5d416d7f49e11ed9a0b8bf868ff0a22: {
    height: 180,
    width: 180,
  },
  ad5d416d8f49e11ed9a0b8bf868ff0a22: {
    height: 20,
    width: 20,
    borderRadius: 30,
  },
  ad5d416d9f49e11ed9a0b8bf868ff0a22: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  ad5d416daf49e11ed9a0b8bf868ff0a22: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  ad5d416dbf49e11ed9a0b8bf868ff0a22: {
    height: 20,
    width: 20,
    borderRadius: 30,
  },
  ad5d416dcf49e11ed9a0b8bf868ff0a22: {
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    left: 5,
    backgroundColor: "#F1F1F3",
    maxWidth: "60%",
  },
  ad5d416ddf49e11ed9a0b8bf868ff0a22: {
    height: 180,
    width: 180,
  },
  ad5d416def49e11ed9a0b8bf868ff0a22: {
    flexDirection: "column",
    alignItems: "flex-end",
    paddingVertical: 10,
  },
  ad5d416dff49e11ed9a0b8bf868ff0a22: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "flex-end",
  },
  ad5d416e0f49e11ed9a0b8bf868ff0a22: {
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    right: 5,
    backgroundColor: "#F1F1F3",
    maxWidth: "60%",
  },
  ad5d416e1f49e11ed9a0b8bf868ff0a22: {
    height: 160,
    width: 160,
    borderRadius: 8,
  },
  ad5d43de0f49e11ed9a0b8bf868ff0a22: {
    height: 20,
    width: 20,
    borderRadius: 30,
  },
  ad5d43de1f49e11ed9a0b8bf868ff0a22: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  ad5d43de2f49e11ed9a0b8bf868ff0a22: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "flex-start",
  },
  ad5d43de3f49e11ed9a0b8bf868ff0a22: {
    height: 20,
    width: 20,
    borderRadius: 30,
  },
  ad5d43de4f49e11ed9a0b8bf868ff0a22: {
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    left: 5,
    backgroundColor: "#F1F1F3",
    maxWidth: "60%",
  },
  ad5d43de5f49e11ed9a0b8bf868ff0a22: {
    height: 160,
    width: 160,
    borderRadius: 8,
  },
  ad5d43de6f49e11ed9a0b8bf868ff0a22: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "flex-start",
  },
  ad5d43de7f49e11ed9a0b8bf868ff0a22: {
    height: 20,
    width: 20,
    borderRadius: 30,
  },
  ad5d43de8f49e11ed9a0b8bf868ff0a22: {
    borderWidth: 0.5,
    borderColor: "grey",
    textAlign: "left",
    padding: 5,
    left: 5,
    borderRadius: 5,
    maxWidth: "60%",
    fontSize: 15,
  },
  ad5d43de9f49e11ed9a0b8bf868ff0a22: {
    marginLeft: 53,
  },
  ad5d43deaf49e11ed9a0b8bf868ff0a22: {
    height: 40,
    color: "black",
    fontSize: 15.5,
  },
  ad5d464f0f49e11ed9a0b8bf868ff0a22: {
    width: "100%",
    marginLeft: 10,
  },
  ad5d464f1f49e11ed9a0b8bf868ff0a22: {
    fontSize: 16,
  },
  ad5d464f2f49e11ed9a0b8bf868ff0a22: {
    justifyContent: "flex-end",
    height: "90%",
  },
  ad5d464f3f49e11ed9a0b8bf868ff0a22: {
    position: "absolute",
    width: "100%",
  },
  ad5d464f4f49e11ed9a0b8bf868ff0a22: {
    flexDirection: "row",
    justifyContent: "center",
  },
  ad5d464f5f49e11ed9a0b8bf868ff0a22: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
  ad5d464f6f49e11ed9a0b8bf868ff0a22: {
    height: 50,
    width: 50,
  },
  ad5d464f7f49e11ed9a0b8bf868ff0a22: {
    height: 50,
    width: 50,
  },
  ad5d48c00f49e11ed9a0b8bf868ff0a22: {
    height: 50,
    width: 50,
  },
  ad5d48c01f49e11ed9a0b8bf868ff0a22: {
    position: "absolute",
    alignSelf: "center",
    top: 300,
    zIndex: 1,
  },
  ad5d48c02f49e11ed9a0b8bf868ff0a22: {
    marginHorizontal: 3,
    flex: 1,
    marginBottom: 50,
  },
  sectionContainer: {
    paddingHorizontal: Scale(10),
  },
  ad5d48c03f49e11ed9a0b8bf868ff0a22: {
    padding: 4,
  },
  ad5d48c04f49e11ed9a0b8bf868ff0a22: {
    alignSelf: "center",
    color: "grey",
    fontSize: 11,
  },
  ad5d48c05f49e11ed9a0b8bf868ff0a22: {
    width: "100%",
    position: "absolute",
    bottom: 15,
  },
  ad5d48c06f49e11ed9a0b8bf868ff0a22: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
    padding: 10,
    backgroundColor: "black",
  },
  ad5d48c07f49e11ed9a0b8bf868ff0a22: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ad5d48c08f49e11ed9a0b8bf868ff0a22: {
    height: 22,
    width: 22,
  },
  ad5d48c09f49e11ed9a0b8bf868ff0a22: {
    height: 22,
    width: 22,
  },
  ad5d48c0af49e11ed9a0b8bf868ff0a22: {},
  ad5d48c0bf49e11ed9a0b8bf868ff0a22: {
    height: 25,
    width: 30,
  },
  mainContainer: {
    height:'100%',
    width:'100%',
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  input: {
    width: "80%",
    height: 40, // backgroundColor:'red'
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: "grey",
    width: "100%",
  },
  inputContainer: {
    backgroundColor: "#F1F1F3",
    width: "90%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    marginHorizontal: 20, // backgroundColor:'red'
  },
  headerContaineNew: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backImage: {
    height: Scale(25),
    width: Scale(25),
    resizeMode: "contain"
  },
  backImage_ar: {
    transform: [{ rotate: "180deg" }]
  },
  directTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
  },
  addImage: {
    height: 25,
    width: 25,
  },
  privatelive: {
    height: 25,
    width: 25,
    marginRight: 20,
  },
  continue: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    paddingVertical: 15,
  },
  modalView: {
    backgroundColor: "white",
    marginTop: Platform.OS === "ios" ? 115 : 50,
    alignSelf: "flex-end",
    marginRight: 10,
    height: 150,
    width: 150,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  modalViewAr: {
    backgroundColor: 'white',
    marginTop: 50,
    alignSelf: 'flex-end',
    marginRight: 240,
    height: 160,
    width: 155,
    paddingVertical: 25,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 2

  },
  shadow: {
    height: 40,
    width: 40,
    borderRadius: 32,
    borderColor: 'grey',
    padding: 5
  },
  Modaltext: {
    fontSize: 16,
    marginTop: 10,
    color: "#202020",
  },
  ModalView: {
    alignItems: "center",
    marginTop: 50,
  },
  Modalimg: {
    height: 40,
    width: 40,
  },
  modalView2: {
    position: "absolute",
    bottom: 0,
    // marginTop: deviceHeight/1.8,
    height: 260,
    width: "100%",
    backgroundColor: "white",
    padding: 5,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  box1: {
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontSize: 16,
    fontWeight: "bold",
  },
  btns: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: "#00000040",
    flex: 1,
    justifyContent: "flex-end",
  },
  report_modal_view: {
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  report_header_title: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#c4c0c0",
    fontWeight: "bold",
    padding: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  report_title: {
    fontSize: Scale(20),
  },
  report_item: {
    paddingTop: Scale(10),
  },
  report_button_text: {
    fontSize: Scale(20),
    fontWeight: "bold",
    color: "#fff4d4",
  },
  cancel_button_text: {
    fontSize: Scale(20),
    fontWeight: "bold",
    color: "#FACC1E",
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
  report_footer_container: {
    padding: 10,
    marginTop: 5,
    borderTopColor: "#c4c0c0",
    borderTopWidth: 1,
  },
  report_footer_buttons_container: {
    // marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
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
  playButton: {
    width:40,
    height:40,
    position:"absolute",
    top:"40%",
    resizeMode:"contain"
  },
}); // Customizable Area End
