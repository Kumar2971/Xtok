import React, { useMemo, useRef, useState } from "react";

// Customizable Area Start
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
} from "react-native";
const dimension = Dimensions.get('window');

//@ts-ignore
import i18n from "i18n-js";
import { SearchBar } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import {
  Crossicon,
  Gradient,
  Group,
  Messanger,
  Shape,
  Vector,
  Vector1,
  compass,
  deletebtn,
  fire,
  gift,
  rose,
  avatarempty,
  cancelIcon
} from "./assets";
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
//@ts-ignore
import { MeetingProvider,usePubSub } from "@videosdk.live/react-native-sdk";
import CustomButton from "../../../components/src/Custombutton";
import Lottie from 'lottie-react-native';
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
let prevOpenedRow: any;
let row: Array<any> = [];

// Customizable Area End
import MeetingContainer from "../../LiveStreaming/src/screens/meeting/MeetingContainer";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Scale from "../../../components/src/Scale";
import CfLiveChallengesController, {
  Props
} from "./CfLiveChallengesController";
import FONTS from "../../../components/src/Fonts/Fonts";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import { ParticipantMode } from "../../LiveStreaming/src/Types";
import { deviceHeight, deviceWidth } from "framework/src/Utilities";
import AlertModal from "../../../components/src/AlertModal";

// Using functional component due to a dependency on pubsub which requires hooks

let chatPubSubRef: any;
enum MessageActions {
  DELETE,
};

export const ManageTimer = (props:any) => {
  const {liveId , minutes, seconds} = props;
  const mPubSub = usePubSub(`Timer_${liveId}`);

  const json = {
    timer: { minutes, seconds },
    type: "live_timer"
  };

  mPubSub.publish(json, { persist: true })

return (<></>)
}

export const JoinedUserTimer = (props:any) => {
  usePubSub(`Timer_${props.liveId}`, {
    onMessageReceived: (message: any)=>{
      props.setNewTime(message.message.timer.minutes,message.message.timer.seconds)
     }
  });
  return (<></>)
}

export const OnCoinsExchanged = (props:any) => {
  const { liveId,getOverallData } = props;
  usePubSub(`ExchangeCoins_${liveId}`, {
    onMessageReceived: (message: any)=>{
      getOverallData(message.message.coins,message.message.team)
     }
  });
  return (<></>)
}

export const ManageExchangeCoins = (props:any) => {

  const {liveId , coins , team , coinsSent} = props;
  const mPubSub = usePubSub(`ExchangeCoins_${liveId}`, {
    onMessageReceived: (message: any)=>{
    }
  });

  const json = {
    coins: coins,
    team:team,
    type: "live_Coins"
  };

  mPubSub.publish(json, { persist: true })
  coinsSent();

return (<></>)
}


const BottomBar = ({loggeduserImage, language, openGiftModal, giftImageUrl, giftBtnAction, chatTopic, setComments, modeTypes, setLottieAnimation, loggedUserId}: {
  loggeduserImage: string,
  language: "en" | "ar",
  openGiftModal: () => void,
  giftImageUrl: string,
  giftBtnAction: () => void,
  chatTopic: unknown,
  setComments: (comments: any) => void,
  setLottieAnimation: (show: boolean, url: string, audioUrl: string, json:string, positionLeft: number, positionTop: number) => void,
  modeTypes:any,
  loggedUserId: number,
}) => {

  const [message, setMessage] = useState("");
  chatPubSubRef = usePubSub(chatTopic ?? "CHALLENGE", {
    onMessageReceived: (message: any)=>{
      setComments((prevComments: any) => {
        if (message.message && message.message.imageUrl && message.message.type === "application") {
          setLottieAnimation(true, message.message.imageUrl, message.message.audioUrl, message.message.json, message.message.positionLeft, message.message.positionTop)
          return prevComments;
        } else if (message.message && message.message.action === MessageActions.DELETE) {
          const tempComments = [...prevComments].filter((el) => el.id !== message.message.id);
          return tempComments;
        } else {
          return [message, ...prevComments];
        }
      });
    }
  });

  const sendMessage = () => {
      if(message.length <= 0) {
         return;
      }
      const json = {
        comment: message,
        userImage: loggeduserImage,
        type: "live_comment",
        senderId: loggedUserId,
      };
      chatPubSubRef.publish(json, { persist: true })
      setMessage("");
      Keyboard.dismiss();
  };

  const onCommentChange = (text: string) => {
    if (text !== '') {
      setMessage(text);
    } else {
      setMessage('');
    }
  };

  return (
    <View style={styles.bottomBar}>
      <View style={styles.subBottomBar}>
        <View>
          {loggeduserImage ?
            <Image source={{ uri: loggeduserImage }} style={{ width: Scale(30), height: Scale(30), borderRadius: Scale(30), }} />
            : <Image source={avatarempty} style={{ width: Scale(30), height: Scale(30), borderRadius: Scale(30), }} />
          }
        </View>
        <View style={styles.inputFieldContainer}>
          <View style={{flex:1}}>
            <TextInput
              testID={'AddCommentInput'}
              style={[styles.input,{textAlign: language === "ar" ? 'right' : 'left' }]}
              placeholder={i18n.t("add_Comment")}
              multiline={true}
              placeholderTextColor={"#ddd"}
              defaultValue={message}
              maxLength={200}
              onChangeText={onCommentChange}
            />
          </View>
          <View style={styles.commentBox}>
         {(modeTypes === ParticipantMode.VIEWER) ? <View style={styles.commentBox}>
           <TouchableOpacity
              testID="testButton3"
              onPress={openGiftModal}
            >
              <Image source={gift} style={styles.imageDimensions4} />
            </TouchableOpacity>
            <TouchableOpacity onPress={giftBtnAction}>
              <Image source={{ uri: giftImageUrl ?? "" }} style={[styles.imageDimensions]} />
            </TouchableOpacity>
            </View> : null}
            <TouchableOpacity
            testID="sendMessageButton"
              disabled={message.trim().length === 0}
              onPress={sendMessage}
              style={styles.messangerImg}
            >
              <Image source={Messanger} style={[styles.imageStyle,styles.resizeContain]}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export const MemoizedBottomBar = React.memo(BottomBar);

const CommentsView = ({
  chatTopic,
  loggeduserImage,
  language,
  openGiftModal,
  giftBtnAction,
  giftImageUrl,
  navigation,
  modeTypes,
  setLottieAnimation,
  loggedUserId,
}: {
  chatTopic: unknown,
  loggeduserImage: string,
  language: "en" | "ar",
  openGiftModal: () => void,
  giftBtnAction: () => void,
  giftImageUrl: string,
  navigation: any,
  setLottieAnimation: (show: boolean, url: string, audioUrl: string, json:string, positionLeft: number, positionTop: number) => void,
  modeTypes:any,
  loggedUserId: number,
}) => {
  const [comments, setComments] = useState<Array<any>>([]);

  const ParticipantsFeedback = useMemo(() => {
    return (
      comments  ?(
        <View style={{ height:150, paddingHorizontal: 1, marginBottom: Scale(64), }}>
          <FlatList
            inverted
            testID="ParticipantFlatListTest"
            contentContainerStyle={{ paddingBottom: 10 }}
            data={comments}
            renderItem={(v) =>
              renderItem(v, () => {
                chatPubSubRef.publish({
                  action: MessageActions.DELETE,
                  id: v.item.id
                })
              })
            }
            style={styles.flatlistStyle}
            keyExtractor={(item: any) => item.id}
          />
        </View>
      ) : <></>
    );
  },[comments])

  const renderItem = ({ item, index }: any, onClick: any) => {
    const { message, senderName } = item;
    let justJoined = (message?.type != 'live_comment');

   const closeRow = (index: any) => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const renderLeftActions = (progress: any, dragX: any, onClick: any) => {
      return (
        <TouchableOpacity
          onPress={onClick}
          style={{
            marginTop: 10,
            alignContent: "flex-end",
            justifyContent: "center",
            width: "8%",
            backgroundColor: "red",
            borderTopEndRadius: 15,
            borderBottomEndRadius: 15,

          }}
        >
          <Image source={deletebtn} style={{ width: 22, height: 22 }} />
        </TouchableOpacity>
      );
    };

    const getRenderActions = () => {
      const renderActions = ({progress, dragX}:any) => message.senderId === loggedUserId ? renderLeftActions(progress, dragX, onClick) : null;
      if (language === "en") {
        return { renderLeftActions: renderActions };
      } else if (language === "ar") {
        return { renderRightActions: renderActions };
      }
    };

    return (
      <Swipeable
        {...getRenderActions()}
        //@ts-ignore
        onSwipeableOpen={() => closeRow(index)}
        ref={(ref) => (row[index] = ref)}
        //@ts-ignore
        rightOpenValue={-100}
        friction={1}
        leftThreshold={90}
        rightThreshold={40}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: !item.justJoined ? "flex-start" : "center",
            marginTop: 10,
            paddingLeft: 10
          }}
        >
          <TouchableOpacity testID="navigateButton" onPress={() => navigation.navigate("UserProfileBasicBlock", { data: item })}>
            <Image source={(message.userImage == null) ? avatarempty : { uri: message.userImage }} style={styles.commentUsrImg} />
          </TouchableOpacity>
          <View style={{ paddingLeft: 5}}>
            <TouchableOpacity style={{ width: "100%" }} onPress={() => navigation.navigate("UserProfileBasicBlock", { data: item })}>
              <Text
                style={[language && styles.textAlign, { fontFamily: FONTS.MontserratSemiBold, fontSize: 12}]}
              >
                {senderName}
              </Text>
            </TouchableOpacity>
            {!justJoined && (
              ReadMoreText(message?.comment)
            )}
            {message?.imageUrl &&
              <TouchableOpacity style={styles.commentImgStyle}>
                <Image source={{uri:message?.imageUrl}} style={styles.imgStyle}/>
              </TouchableOpacity>
            }
          </View>
        </View>
      </Swipeable>
    );
  };

  const ReadMoreText = (text: string) => {
    return (<>
        <Text style={[language && styles.textAlign ,{ fontFamily: FONTS.MontserratRegular, fontSize: 12, width: 300 }]} ellipsizeMode="tail">{text}</Text>
    </>
    )
  };

  return (
    <>
      {ParticipantsFeedback}
      <MemoizedBottomBar
        language={language}
        openGiftModal={openGiftModal}
        giftBtnAction={giftBtnAction}
        giftImageUrl={giftImageUrl}
        loggeduserImage={loggeduserImage}
        chatTopic={chatTopic}
        modeTypes={modeTypes}
        setComments={setComments}
        setLottieAnimation={setLottieAnimation}
        loggedUserId={loggedUserId}
       />
    </>
  );

};

export const MemoizedCommentsView = React.memo(CommentsView)

export default class CfLiveChallenges extends CfLiveChallengesController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", (e) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });

    // Customizable Area End
  }

  // Customizable Area Start
  handleButtonPress = async () => {
    this.setState({
      scoreUserDetails: {},
      selectedCatalogue: []
    });
      this.endLivewatching();
      this.setState({ isMeetingClosed: true },()=>{
        this.setState({isMeetingClosed:false})
      });
  };
  header = () => {
    return (
      <View style={{ marginBottom: 10 }}>
        {/*  */}
        <View style={[styles.headerBoxes]}>
          <View style={[styles.headerBoxes1]}>
            <View style={[styles.headerAlignBoxes]}>
              <Image source={this.props.route.params?.profilePic ? {uri:this.props.route.params?.profilePic ?? ''} : avatarempty} style={[styles.imageDimensions]} />
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ fontFamily: FONTS.MontserratSemiBold }}>
                  {this.props?.route?.params?.name ?? ''}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            testID="testButton"
            onPress={() => this.handleButtonPress()}
          >
            <Image source={Crossicon} style={[styles.gobackIcons]} />
          </TouchableOpacity>
        </View>
        <View style={[styles.headerBoxes, { marginVertical: 10 }]}>
          {
            this.state.setAllowLeaderBoardVisible
                        &&
            <TouchableOpacity
            testID="testButton2"
            onPress={() => {
              clearInterval(this.interval);
              clearInterval(this.intervalComments);
              this.props.navigation.navigate("Leaderboard");
            }}
            style={[styles.headerAlignBoxes, styles.boxBorder1, { padding: 2 }]}
          >
            <Image source={Vector} style={[styles.imageDimensions1]} />
            <Text style={{ fontFamily: FONTS.MontserratRegular, fontSize: 10 }}>
              {i18n.t("hourly")} {i18n.t("top")} 2
            </Text>
          </TouchableOpacity> }
          <View
            style={[styles.headerAlignBoxes, styles.boxBorder2, { padding: 2 }]}
          >
            <Image source={compass} style={[styles.imageDimensions1]} />
            <TouchableOpacity testID="exploreButton" onPress={()=> this.setState({isExploreClicked:true,isMeetingClosed:true,})}>
            <Text style={{ fontFamily: FONTS.MontserratRegular, fontSize: 10 }}>
              {i18n.t("explore")}
            </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*  */}
        <View style={[styles.headerBox]}>
          <View
            style={[
              styles.headerAlignBoxes,
              styles.boxBorder1,
              {
                paddingHorizontal: 4,
                paddingVertical: 2,
                backgroundColor: "black"
              }
            ]}
          >
            <Image source={Shape} style={[styles.imageDimensionsShape]} />
            <Text
              style={{
                color: "white",
                paddingLeft: 4,
                fontFamily: FONTS.MontserratRegular
              }}
            >
{this.state.totalpeoplewatching}
            </Text>
          </View>

          <View
            style={[
              styles.headerAlignBoxes,
              styles.boxBorder1,
              {
                paddingHorizontal: 4,
                paddingVertical: 2,
                backgroundColor: "black"
              }
            ]}
          >
            <Text style={{
               textAlign: "center",
               fontSize: 14,
               marginVertical: 10,
               color:'#fff'
            }}>
        {this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes} :{" "}
        {this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}
      </Text>
          </View>
          {this.props.route.params.modeTypes == ParticipantMode.VIEWER ? null :  <View>
            <TouchableOpacity testID="addBtn" onPress={() => {
              this.setState({ invitationModel: true })
          }}
          >
              <Image source={require('../assets/add.png')} style={styles.addButton} />
          </TouchableOpacity>
          </View>}
        </View>
      </View>
    );
  };
  participants = () => {
    return (
      <View
        style={{
          backgroundColor: "black",
          height: "5%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 16,

        }}
      >
        <View style={{ flexDirection: "row" }}>

          {

          this.state.team1.map((item: { photo: any; id: React.Key | undefined; },index:number) => <Image
            source={item.photo ? {uri:item.photo} : avatarempty}
            style={[styles.profileImage, { marginLeft: index == 0 ? 0 : -10 }]}
            key={item?.id}
          />)
          }
        </View>
        <View>
          <Text style={[styles.normaltext, { color: "white" }]}>
          {this.state.participantsData.length ?? 0} {i18n.t("participants")}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
        {

            this.state.team2.map((item:any, index:number) => <Image
              source={item.photo ? {uri:item.photo} : avatarempty}
              style={[styles.profileImage, { marginLeft: index == 0 ? 0 : -10 }]}
              key={item?.id}
            />)

          }
        </View>
      </View>
    );
  };

  scorebar = () => {
    let total = this.state.scoreTeam1 + this.state.scoreTeam2;
    let team1scorepercentage = Math.round(
      (this.state.scoreTeam1 / total) * 100
    );
    if (total == 0) {
      team1scorepercentage = 50;
    }

    return (
      <View>
        <View style={{ justifyContent: "center" }}>
          <View
            style={{
              width: "100%",
              height: 20,
              borderColor: "black",
              backgroundColor: "blue",
              borderTopWidth: 1
            }}
          />
          <View
            style={{
              width: team1scorepercentage ? team1scorepercentage + "%" : 0,
              height: 20,
              backgroundColor: "#FFC924",
              position: "absolute",
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: 'black',
              borderTopWidth: 1
            }}
          >
            <Text style={[styles.scoreText, { paddingLeft: 10 }]}>
              {Math.round((this.state.scoreTeam1 + Number.EPSILON) * 100) / 100}
            </Text>
            <Image
              source={fire}
              style={{ width: 23, height: 20, marginRight: -12 }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              right: 5
            }}
          >
            <Text
              style={[styles.scoreText, { color: "white", paddingRight: 10 }]}
            >
              {Math.round((this.state.scoreTeam2 + Number.EPSILON) * 100) / 100}
            </Text>
          </View>
        </View>
      </View>
    );
  };


  sticker = (item:any) => {
    let data = this.state.lastgiftdata.filter((value:any) => {
      return value.donated_to_user_id === item.item.id;
    });
    return (
      <View style={{ bottom: "25%", left: "2%", position: "absolute" }} >
        <View
          style={[
            { flexDirection: "row", marginRight: 5 }
          ]}
        >
          {(data[0]?.user_id !== null && <>
            <Image
              source={{ uri: data[0]?.gift_url }}
              style={{
                width: 12,
                height: 12,
                marginTop: 2,
                marginRight: 5
              }}
            />
            <Text style={[styles.normaltext, { marginRight: 5 }]}>{data[0]?.user_name} donated</Text>

          </>)}

        </View>

      </View>


    )
  }
  stream = () => {
    const roomID = this.props.route.params.meetingId
    return (
      <View
      testID="layoutView"
      onLayout={(event) => {
        this.setState({viewheight:event.nativeEvent.layout.height})
      }}
      style={[
        styles.streamItemcontainer,
        {
          flex:1,
          borderRightWidth: 1,
        }
      ]}
        >
          {roomID && (
            //@ts-ignore
            <MeetingContainer
              webcamEnabled={this.state.webcamOn}
              meetingType={this.state.meetingType}
              navigation={this.props.route}
              navigateToLivePage={this.navigateToLivePage}
              startedRecording={this.startRecordingFunction}
              stopRecording={this.stopRecordingFunction}
              navigateToLivePageparticipants={this.navigateToLivePageparticipants}
              fetchSession={this.fetchSession}
              startStream={this.startLiveStreamFunction}
              stopStream={this.stopLiveStreamFunction}
              hlsStartLiveStream={this.hlsStartLiveStream}
              hlsStopLiveStream={this.hlsStopLiveStream}
              hlsActiveLiveStream={this.hlsActiveLiveStream}
              statusjoin={this.statusjoin}
              statusleave={this.statusleave}
              modeTypes={this.props.route.params.modeTypes}
              getOverallData={this.onNewParticipantJoined}
              teamParticipantIds={{team1: this.state.team1, team2: this.state.team2}}
              isLiveChallenge={true}
              viewheight={this.state.viewheight}
              isClosed={this.state.isMeetingClosed}
              getAllViewersCount={this.setAllViewersCount}
            />
          )}
      </View>
    );
  };
  renderCategories = (item: any) => {
    const { selectedTab, indexss } = this.state;
    const id = item?.item?.attributes?.id;
    const name = item?.item?.attributes?.name;
    const isActiveTab = id === selectedTab ? true : false;
    return (
      <View style={{}}>
        <TouchableOpacity
          style={[styles.tabbarStyle]}
          disabled={this.state.isCatalogueLoading}
          onPress={() => this.gotoNextTab(id)}
        >
          <Text
            style={[
              styles.tabTextStyle,
              (item?.index == indexss || isActiveTab) && styles.greyText
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
    );
  };
  renderCatalogue = (data: any) => {
    const url = data && data?.item?.attributes?.image?.url;
    const json = data && data?.item?.attributes?.image?.json;
    const type = data && data?.item?.attributes?.image?.type;
    const coins = data.item?.attributes?.coins || 0;
    let selected = false;
    if (data?.item?.attributes) {
      if (data?.item?.id == this.state.selectedCatalogue.id) {
        selected = true;
      }
    }
    return data?.item?.attributes ? (
      <TouchableOpacity
        style={[styles.catalogueView, { backgroundColor: (selected) ? "grey" : "white" }]}
        onPress={() => {
          this.selectCatalogue(data?.item)
        }
        }
      >
        <View style={styles.imgView}>
          {(url||json) ? (
            type === "image" ?
            <Image source={{ uri: url }} style={[styles.imageStyle]} />
            :
              <Lottie
              source={json}
              autoPlay={false}
              style={styles.imageStyle}
              />
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

  giftmodel = () => {
    return (

      <Modal
        visible={this.state.gitfmodel}
        transparent={true}
        animationType={"slide"}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.transpernetModalContainer}>
          <TouchableOpacity
            testID="addParticipant"
            onPress={() =>
              this.setState({ gitfmodel: false })
            } style={{ flex: 1 }}>
          </TouchableOpacity>
          <View style={styles.modalContainer}>
            <View style={styles.modalListContainer}>
              {/* TODO add bottom bar again after pubsub implementation */}
              {/* <View style={[styles.modalHeader]}>{this.bottomBar()}</View> */}
              <View style={{ flex: 1 }}>
                <FlatList
                  testID="CategoriesFlatListTest"
                  style={styles.flatlist}
                  contentContainerStyle={styles.categoriesContainer}
                  data={this.state.categories}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={(item: any) => this.renderCategories(item)}
                  keyExtractor={(item: any) => item.id}
                />
                <View style={styles.deviderLine} />
                <View style={{ marginTop: Scale(5),height:Scale(200) }}>
                  <FlatList
                    testID="CategoryFlatListTest"
                    data={this.state.catalogue}
                    numColumns={4}
                    renderItem={(data) => this.renderCatalogue(data)}
                    ListEmptyComponent={()=> {
                      return <View style={{height:Scale(200),alignItems:'center',justifyContent:'center'}}><ActivityIndicator size={"large"} /></View>
                    }}
                    keyExtractor={(item: any) => item.id}
                  />
                </View>
              </View>
              <View
                style={{
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 70,
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingHorizontal: 16
                }}
              >
                <TouchableOpacity
                  testID="testButton6"
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => this.goToRecharge()}
                >
                  <Text style={[styles.scoreText]}>Recharge</Text>
                  <Image
                    source={this.props.route.params?.profilePic ? {uri:this.props.route.params?.profilePic ?? ''} : avatarempty}
                    style={[[styles.profileImage]]}
                  />
                  <Text style={[styles.normaltext, { marginLeft: 5 }]}>
                    {this.state.coins_count}
                  </Text>
                </TouchableOpacity>

                <CustomButton
                testID="sendButton2"
                  title={"Send"}
                  style={{
                    borderRadius: 0,
                    backgroundColor:
                      this.state.coins_count < 0 ? "#f3f3f3" : "#FFC925"
                  }}
                  TextStyle={{ color: "grey" }}
                  //  disabled={this.state.coins_count < 0 ? true : false}
                  onPress={() => {
                    if (!this.state.scoreUserDetails.userId && (this.state.selectedCatalogue.attributes?.coins ?? 0)) {
                      this.setState({gitfmodel:false,participantModel:true})
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  renderParticipants = (item:any) => {
    return (
        <View style={styles.renderParticipantView}>
            <View style={styles.participantUserView}>
                <Image source={item?.item?.photo ? {uri : item?.item?.photo} : avatarempty} style={styles.profileimg} />
                <View style={{ marginLeft: Scale(10),alignItems:'flex-start',justifyContent:'center',flex:1 }}>
                <Text numberOfLines={1} style={styles.nameText}>{item?.item?.name}</Text>
                </View>
           </View>
            <TouchableOpacity
            testID="sendGiftButton"
          style={[styles.btnContainerStyle]}
          onPress={() => {
            let user = JSON.parse(JSON.stringify(this.state.scoreUserDetails));
            user.userId = item.item.id;
            this.setState({participantModel:false,scoreUserDetails:user,selectedId:item.item.id},async()=>{
              if (await this.sendCoin()) {
                chatPubSubRef.publish({
                  imageUrl: this.state.selectedCatalogue?.attributes?.image.url,
                  type: this.state.selectedCatalogue?.attributes?.image.type,
                  audioUrl: this.state.selectedCatalogue?.attributes?.audio?.url,
                  json: this.state.selectedCatalogue?.attributes?.image.json,
                  positionLeft: Number(this.state.selectedCatalogue?.attributes?.Position_left),
                  positionTop: Number(this.state.selectedCatalogue?.attributes?.Position_top),
                  userImage: this.state.loggeduserImage
                });
                this.setState({
                  selectedCatalogue: {},
                })
              }
            })
          }}>
            <Text style={{}}>Send</Text>
        </TouchableOpacity>
        </View>
    );
  }



  participantsModel = () => {
   let participants = this.state.participantsData.filter((item:any)=>  {
    return item.id != this.props.route.params?.participantId
   })
    return (

      <Modal
        visible={this.state.participantModel}
        transparent={true}
        animationType={"slide"}
      >
        <View
          style={styles.mainParticipantModel}>

          <View style={styles.participantView}>
          <TouchableOpacity testID="crossButton" onPress={()=> this.setState({participantModel:false,gitfmodel:true})} style={styles.crossButton}>
          <Image style={styles.crossImage} source={require('../assets/cancelicon.png')} />
        </TouchableOpacity>
          <FlatList
          testID="partFlarlist"
          showsVerticalScrollIndicator={false}
          style={styles.participantFlatlist}
          contentContainerStyle={{paddingBottom:20}}
            data={participants}
            renderItem={(item:any) => this.renderParticipants(item)}
            keyExtractor={(item: any) => item.id}
          ListEmptyComponent={() =>
          <View style={styles.emptyModelView}>
              <Text>No participant joined yet.</Text>
          </View>
          }
          />
          </View>
        </View>
      </Modal>
    );
  };

  setSelectedTab = (value: any) => {
    this.setState({ indexss: value });
  };
  renderSearchResult = () => {
    if(this.state.searchresult.length == 0){
      return(
        <View style={[styles.searchContainer, { flex: 1 }]}>
          {/* <Image source={empty} style={styles.emptyimg} /> */}
          <Text style={styles.headerText}>No search result found</Text>
        </View>
      )
    }else{
      return (
        <FlatList
          testID="renderSearchFlatlist"
          data={this.state.searchresult}
          renderItem={(item:any) => {
              return (
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: Scale(5), }}>
                      <View style={{ flexDirection: "row" }}>
                          <Image source={item?.item?.photo ?{uri:item.item.photo}: avatarempty} style={styles.profileimg} />
                          <View style={{ marginLeft: Scale(10) }}>
                            <Text style={styles.nameText}>{item?.item?.full_name}</Text>
                            <Text style={styles.normalText}>{item?.item?.user_name}</Text>
                          </View>
                      </View>
                      <TouchableOpacity
                    style={[styles.btnContainerStyle, item?.item?.isInvited && styles.disableBtnStyle]}
                    onPress={() => {
                      this.setState({ selectedInviteData: item?.item }, () => {
                        this.inviteParticipantToLiveChallenge(item?.item?.id)
                      })
                    }}
                    disabled={item?.item?.isInvited} testID={'this.props.testID'} activeOpacity={item?.item?.isInvited ? 0.3 : 1}>

                    <View >
                      {this.renderInviteButton(item)}
                    </View>
                  </TouchableOpacity>
                  </View>
              )
          }}
          keyExtractor={(item:any) => item.id}
          ListEmptyComponent={
            this.state.apiLoader ? <View style={[styles.searchContainer, { flex: 1 }]}>
              <ActivityIndicator size="large" color="black" />
          </View> : <Text>{'No search result found.'}</Text>
          }
        />
      )
    }
  }
  renderInviteButton = (item:any) => {
    if(this.state.selectedInviteData.id == item.item.id){
      return(
        <ActivityIndicator color={"#fff"} size={"small"} />
      )
    }else{
      return(
        <Text style={[styles.btnTextStyle , item?.item?.isInvited && styles.disableText]}> {item?.item?.isInvited ? "Sent" : "Invite"} </Text>
      )
    }
  }
  invitationModel = () => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.invitationModel}
            onRequestClose={this.closeInvitationModal}
        >
        <KeyboardAvoidingView
          behavior={"padding"}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: -500 })}
          style={{ flexGrow: 1, }}
        >
          <View style={styles.modalContainer}>
              <View style={styles.modalListContainerInvite}>
                  <View style={[styles.modalHeaderInvite]}>
                    {/* empty spacer for equal space in between */}
                    <View style={styles.cancelButton} />
                    <Text style={styles.headerTextInvite}>Invite to join</Text>
                    <TouchableOpacity
                      onPress={this.closeInvitationModal}
                    >
                      <Image source={cancelIcon} style={styles.cancelButton} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ minHeight: Scale(300) }}>
                      <View style={styles.searchContainer}>
                          <SearchBar
                              platform="default"
                              testID="searchId"
                              placeholder={"Search"}
                              autoFocus
                              searchIcon={<AntDesign name="search1" size={20} />}
                              inputStyle={this.state.language == "ar" && styles.inputTextRight}
                              onChangeText={text => {
                                this.searchParticipantToInvite({ searchText: text })
                                this.setState({
                                  searchText: text,
                                });
                              }}
                              autoCorrect={false}
                              value={this.state.searchText}
                              containerStyle={styles.searchContainerStyle}
                              inputContainerStyle={styles.searchInputStyle}
                          />
                      </View>

                      {
                          (!this.state.recentsearch) ? (
                              <View style={{ paddingHorizontal: Scale(20),height:'75%' }}>
                                  <FlatList
                                  showsVerticalScrollIndicator={false}
                                      testID="serachFlatlist"
                                      data={this.state.searchresult}
                                      contentContainerStyle={{paddingBottom:25}}
                                      keyboardShouldPersistTaps
                                      renderItem={(item:any) => {
                                          return (
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: Scale(5),flex:1 }}>
                                              <View style={{ flexDirection: "row",flex:1 }}>
                                                <Image source={item?.item?.photo ? {uri:item.item.photo} : avatarempty} style={styles.profileimg} />
                                                <View style={[{ marginLeft: Scale(10),flex:1 } , this.state.language == "ar" && {alignItems:'flex-start'}]}>
                                                  <Text style={[styles.nameText,styles.nameTxtFont]}>{item?.item?.full_name}</Text>
                                                  <Text numberOfLines={1} style={[styles.normalText,styles.normalTxtFont]}>{item?.item?.bio || 'No bio'}</Text>
                                                </View>
                                              </View>
                                              <TouchableOpacity
                                                style={[styles.btnContainerStyle, item?.item?.isInvited && styles.disableBtnStyle]}
                                                onPress={() => {
                                                  this.setState({ selectedInviteData: item?.item }, () => {
                                                    this.inviteParticipantToLiveChallenge(item?.item?.id)
                                                  })
                                                }}
                                                disabled={item?.item?.isInvited} testID={'inviteButton'} activeOpacity={item?.item?.isInvited ? 0.3 : 1}>
                                                <View >
                                                  {this.renderInviteButton(item)}
                                                </View>
                                              </TouchableOpacity>
                                            </View>
                                          )
                                      }}
                                      keyExtractor={(item:any) => item.id}
                                      ListEmptyComponent={
                                        this.state.apiLoader ? <View style={[styles.searchContainer, { flex: 1 }]}>
                                          <ActivityIndicator size="large" color="black" />
                                        </View> : <Text>{'No search result.'}</Text>
                                      }
                                  />
                              </View>
                          ) : (
                              this.renderSearchResult()
                          )
                      }
                  </View>
              </View>
          </View>
          </KeyboardAvoidingView>
        </Modal>
    )
}

manageTimingForUsers = () =>{
  if(this.state.isTimerStarted){
    return <ManageTimer minutes={this.state.minutes} seconds={this.state.seconds} liveId={this.props.route.params.liveChallengeId} />
  }
  return null
}

  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    const {
      token,
    } = this.props.route.params;
    return (
      <SafeAreaView style={{flex:1}}>
        {(this.state.lottieAnimation.show && this.state.lottieAnimation.url) && (
          <View style={styles.fullParent}>
            <View style={[
              styles.lottieContainer, {
              top: this.state.lottieAnimation.positionTop * deviceHeight / 100,
              left: this.state.lottieAnimation.positionLeft * deviceWidth / 100
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
        <MeetingProvider
          config={{
          meetingId: this.props.route.params?.meetingId,
          micEnabled: this.props.route.params?.micEnabled,
          webcamEnabled: this.props.route.params?.webcamEnabled ,
          mode: this.props.route.params?.modeTypes,
          name: this.props.route.params?.name ?? '',
          notification: {
            title: "Live challenges started sucessfully",
            message: "Meeting is running...",
          },
        }}
        token={token}
      >
      <KeyboardAvoidingView
        // keyboardVerticalOffset={0}
        // behavior={Platform.OS === "ios" ? "padding" :"padding"}
        behavior={"padding"}

        keyboardVerticalOffset={Platform.select({ ios: 0, android: -250 })}
        style={{ flexGrow: 1, }}
      >
        <View style={styles.container}>
          {this.invitationModel()}
          <TouchableWithoutFeedback
            testID="testButton7"
            onPress={() => {

              this.hideKeyboard();
            }}
          >
            <ImageBackground source={Gradient} style={styles.backgroundImage}>
              <View style={styles.subContainer}>{this.header()}</View>
              {this.scorebar()}
              {this.props?.route?.params?.isChallengeCreated ? this.manageTimingForUsers() : null}
              {this.state.timeReset ? <JoinedUserTimer liveId={this.props.route.params.liveChallengeId} setNewTime={this.setNewTime}/> : null}
         <OnCoinsExchanged liveId={this.props.route.params.liveChallengeId} getOverallData={this.onCoinsExchanges}/>


        {this.state.coinsSent ? <ManageExchangeCoins liveId={this.props.route.params.liveChallengeId} coins={this.state.donatedCoin} team={this.state.donatedTeam} coinsSent={this.onCoinsSent}/> : null}
              {this.stream()}
              {this.participants()}

              <MemoizedCommentsView
                chatTopic={this.props.route.params?.meetingId}
                modeTypes={this.props.route.params?.modeTypes}
                openGiftModal={this.openGiftModal}
                language={this.state.language}
                loggeduserImage={this.state.loggeduserImage}
                giftBtnAction={this.giftCommentsAction}
                giftImageUrl={this.state.defaultCatalogue?.attributes?.image.url}
                navigation={this.props.navigation}
                setLottieAnimation={this.setLottieAnimation}
                loggedUserId={this.state.loggedUserId}
              />
               {this.participantsModel()}
              {this.giftmodel()}

            </ImageBackground>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </MeetingProvider>
    <AlertModal  alertModal={this.state.alertModal} onPress2={()=>{this.setState({alertModal:{openAlertModal:false}})}}
      btnTitle2={"OK"} />
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff"
  },
  subContainer: {
    marginTop: 20,
    paddingHorizontal: 16
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1
  },
  bgMobileInput: {
    flex: 1
  },
  showHide: {
    alignSelf: "center"
  },
  rankdataContainer: {
    backgroundColor: "#FFE9A4",
    borderWidth: 1,
    borderColor: "#FFC925",
    padding: Scale(5),
    borderRadius: Scale(10),
    marginVertical: Scale(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  addfrendsContainer: {
    width: "55%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#FFC925",
    padding: Scale(5),
    borderRadius: Scale(10),
    marginVertical: Scale(5),

    flexDirection: "row"
  },
  streamItemcontainer: { backgroundColor: "grey", borderBottomWidth: 1,
},
  normaltext: {
    fontFamily: FONTS.MontserratRegular,
    fontSize: Scale(12)
  },
  normalTxtFont: {
    fontSize:deviceBasedDynamicDimension(14 , true,1)
  },
  scoreText: {
    fontFamily: FONTS.MontserratBold
  },
  profileImage: {
    width: Scale(20),
    height: Scale(20),
    borderRadius: Scale(20),
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    marginLeft: Scale(10)
  },
  backTextWhite: {
    color: "#FFF"
  },
  rowFront: {
    alignItems: "center",
    justifyContent: "center",
    height: 50
  },
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0
  },
  backBtnLeft: {
    backgroundColor: "red",
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    left: 25
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover" // or 'stretch'
  },
  backgroundImagemessage: {
    resizeMode: "stretch"
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  headerBoxes1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 2
  },
  headerBoxes: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerBox: {
   width:Scale(380),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerAlignBoxes: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  subLinesBoxes: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 120,
    paddingHorizontal: 5
  },
  boxBorder1: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 3
  },
  boxBorder2: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15
  },
  gobackIcons: {
    width: 20,
    height: 20
  },
  imageDimensions: {
    width: 30,
    height: 30,
    borderRadius:30
  },
  messangerImg:{
    width: 25,
    height: 25,
    marginRight:5
  },
  commentBox:{
    flexDirection: 'row',
    justifyContent:"space-between",
    alignItems:"center"
  },
  imageDimensions1: {
    width: 10,
    height: 10,
    marginRight: 2,
    resizeMode: "contain"
  },
  imageDimensions2: {
    width: 25,
    height: 25,
    resizeMode: "contain"
  },
  imageDimensionsShape: {
    width: 10,
    height: 10,
    resizeMode: "contain"
  },
  imageDimensions3: {
    width: 15,
    height: 15,
    marginTop: 4,
    resizeMode: "contain"
  },
  imageDimensions4: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  input: {
    flex:1,
    height:Scale(50),
    paddingTop:Platform.OS == 'ios' ? 15 : 5,
    marginRight:10
  },
  bottomBar: {
    backgroundColor: "black",
    position: 'absolute',
    bottom: Scale(0),
    left: 0,
    right: 0,
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    flex: 1,
  },
  subBottomBar: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width:'95%',
    alignSelf:'center',
    flex:1
  },
  inputFieldContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    flex:1,
    marginLeft:10,
    borderRadius: 10,
    justifyContent: "space-between",
    height:Scale(50),
    paddingHorizontal:5

  },
  modalContainer: {
    flex: 1,
  },
  transpernetModalContainer: {
    position: 'relative',
    width: screenWidth,
    flex: 1
  },
  modalListContainer: {
    position: "absolute",
    bottom: 0,
    width: screenWidth,
    backgroundColor: "rgb(255, 255, 255)",
    maxHeight: Scale(500)

  },
  modalListContainerInvite: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    borderTopRightRadius: Scale(20),
    borderTopLeftRadius: Scale(20),
    backgroundColor: 'rgb(255, 255, 255)',
    maxHeight: Scale(500),

},
  modalHeader: {
    flexDirection: "row"
  },
  modalHeaderInvite: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Scale(20),
    borderBottomColor: "grey",
    borderBottomWidth: 1
},
headerTextInvite: {
    fontFamily: FONTS.MontserratSemiBold,
    fontSize: Scale(20)
},
  line: {
    height: Scale(1),
    width: Scale(343),
    backgroundColor: "black",
    marginLeft: Scale(16)
  },
  tabview: {
    flexDirection: "row",
    backgroundColor: "red"
  },
  tabheadding: {
    marginRight: Scale(10)
  },
  tabheadtext: {
    fontFamily: FONTS.MontserratRegular,
    fontSize: Scale(15)
  },
  stickerText: {
    fontFamily: FONTS.MontserratBold,
    fontSize: Scale(10)
  },
  tabbarStyle: {
    height: Scale(50),
    width: Scale(100),
    justifyContent: "center",
    alignItems: "center",
    marginRight: Scale(10)
  },
  activeTab: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#000",
    width: Scale(100),
    height: Scale(5),
    borderRadius: Scale(10)
  },
  tabTextStyle: {
    fontFamily: FONTS.MontserratMedium,
    fontSize: Scale(14),
    color: "grey"
  },
  flatlist: {
    flex: 1,
    marginHorizontal: Scale(10),
    width: "100%"
  },
  categoriesContainer: {
    flex:1,
    alignSelf:'flex-end',
  },
  deviderLine: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginTop: 0
  },
  greyText: {
    color: "#000"
  },
  imgView: {
    height: 30,
    width: 30
  },
  imageStyle: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  resizeContain: {
    resizeMode: "contain"
  },
  catalogueView: {
    alignItems: "center",
    width: "25%",
    paddingVertical: Scale(10)
  },
  noText: {
    fontFamily: FONTS.MontserratMedium,
    fontSize: Scale(12),
    color: "grey",
    margin: Scale(20),
    textAlignVertical: "center",
    textAlign: "center",
    width: "100%"
  },
  commentText: {
    fontFamily: FONTS.MontserratRegular, fontSize: 12, width: 300,
  },
  textAlign:{
    textAlign:"left"
  },
  addButton: {
    height: Scale(50),
    width: Scale(50),
    resizeMode: "contain"
  },
  headerText: {
    fontFamily: FONTS.MontserratSemiBold,
    fontSize: Scale(20)
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  searchContainerStyle: {
    marginTop: 10,
    width: '95%',
    backgroundColor: "transparent",
    padding: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginBottom: deviceBasedDynamicDimension(20, false, 1),
    borderRadius: 0,
    paddingHorizontal: Scale(10)
  },
  searchInputStyle: {
    backgroundColor: "#EEEEEE",
    height: deviceBasedDynamicDimension(45, true, 1),
  },
  emptyimg: {
    width: Scale(80),
    height: Scale(80)
  },
  profileimg: {
    width: Scale(40),
    height: Scale(40),
    borderRadius:Scale(20)
  },
  normalText: {
    fontFamily: FONTS.MontserratRegular,
    fontSize: Scale(10),
    marginRight:Scale(10),
  },
  nameText: {
    fontFamily: FONTS.MontserratSemiBold,
    fontSize: Scale(12),
    marginRight:Scale(10),
  },
  nameTxtFont: {
    fontSize: Scale(16),
  },
  comment: {
    width: dimension.width,
    position: "absolute",
    bottom: 10,
  },
  joined: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  joinedImg: {
    height: Scale(50),
    width: Scale(50),
    resizeMode: "cover",
    borderRadius: 20,
    marginLeft: 20,
  },
  inputTextRight: {
    textAlign: "right"
  },
  btnTitleStyle: {
    fontFamily: FONTS.MontserratSemiBold,
    color: "#000"
  },
  btnContainerStyle: {
    backgroundColor: "#FFC925",
    borderRadius: 20,
    width: "32%",
    height: 35,
    justifyContent: "center",
    alignItems: "center"
  },
  disableBtnStyle: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "32%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    opacity:0.3,
    borderWidth:1,
    borderColor:"#FFC925"
  },
  btnTextStyle: {
    color: '#fff',
    fontWeight: "bold",
    fontSize: 15,
    textAlign: 'center',
    fontFamily: FONTS.MontserratMedium
  },
  disableText:{
    color: '#FFC925',
    fontWeight: "bold",
    fontSize: 15,
    textAlign: 'center',
    fontFamily: FONTS.MontserratMedium
  },
  mainParticipantClass:{
    height:40,
    width:'90%',
    alignSelf:'center',
    margin:5,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderWidth:1,
    borderColor:'grey',
    borderRadius:4
  },
  sendButton:{
    backgroundColor:'yellow',
    paddingHorizontal:10,
    paddingVertical:5,
    marginRight:5,
    borderRadius:5,
    borderWidth:1,
    borderColor:'grey',
  },
  mainParticipantModel:{
    flex: 1,
    backgroundColor:'transparent',
    alignItems:'center',
    justifyContent:'flex-end',
  },
  participantView:{
  backgroundColor:'white',
  width:'100%',
  height:300,
  borderRadius:15
},
crossButton:{
  top:5,
  right:20,
  position:'absolute'
},
crossImage:{
resizeMode: "contain",
height: Scale(23),
width:Scale(23),
},
participantFlatlist:{
  paddingTop:15,
  marginBottom:20,
  marginTop:30,
},
participantUserView:{
  flexDirection: "row",
  justifyContent:'center',
  flex:1,
  marginRight:10
},
renderParticipantView:{
  height:Scale(40),
  width:'90%',
  alignSelf:'center',
  marginVertical:5,
  alignItems:'center',
  justifyContent:'space-between',
  flex:1,
  flexDirection:'row'
},
commentImgStyle:{
  height:50,
  width:50,
  marginTop:5
},
imgStyle:{
  height:"100%",
  width:"100%",
},
lottieAnimationStyle: {
  zIndex: 99,
  margin: 0,
  padding: 0,
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
audioPlayer: {
  maxHeight: 0,
  maxWidth: 0,
},
flatlistStyle:{
  marginBottom:Scale(15),
  height:150,
},
emptyModelView:{
  justifyContent:"center",
  alignItems:"center"
},
commentUsrImg: {
  width: Scale(25),
  height: Scale(25),
  borderRadius: Scale(30),
},
cancelButton: {
  resizeMode: "contain",
  height: Scale(23),
  width: Scale(23),
  alignSelf: "flex-end"
},
});
// Customizable Area End
