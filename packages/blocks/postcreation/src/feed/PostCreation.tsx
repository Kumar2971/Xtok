import React, { createRef } from "react";
// Customizable Area Start
import {
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
  Dimensions,
  ImageBackground,
  ImageURISource,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import scale, { verticalScale } from "../../../../components/src/Scale";
import DeepAR, { CameraPositions, ErrorTypes } from "react-native-deepar";
import Carousel from 'react-native-snap-carousel';
//@ts-ignore
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
const { width } = Dimensions.get('window');
//@ts-ignore
import PostCreationController from "./PostCreationCommonController";
import { mainIcon, effects, gallery, crossicon, pausebutton, avatar } from "../feed/assets";
import Icon from "react-native-vector-icons/Entypo"
import { translate } from "../../../../components/src/i18n/translate";
import CustomButton from "../../../../components/src/Custombutton";
let myTimeout: any;
import AlertModal from "../../../../components/src/AlertModal";
type CarouselItem = {
  item: { name: string, path: ImageURISource, }, index: number
}
// Customizable Area End

let timerstarted: boolean = false;
export interface Props {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}
let imageWidth = screenWidth * 0.2;
const imageHeight = imageWidth * 0.6;
let sliderWidth = screenWidth - (1 * (screenWidth / 5));


export default class PostCreation extends PostCreationController {
  constructor(props: Props) {
    //@ts-ignore
    super(props);
  }
  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getStorageReadPermission()
  }

  renderTimerModal = () => {
    if (timerstarted) {
      return
    }
    let selectedTime = this.state.selectedTime + 1;
    let final = selectedTime;
    let countDown = setInterval(() => {
      if (selectedTime == 0) {
        this.setState({ isTimerVisible: false })
        timerstarted = false
        clearInterval(countDown);
        !this.state.isRecordingStart && this.takeVideo();
      }
      else {
        --selectedTime;
        timerstarted = true
        this.setState({ selectedTime });
      }
    }, 1000)
  }
  renderEffects = () => {
    return (
      <View style={styles.carouselContainer}>
        <Carousel testID="carousel"
          ref={this.carouselRef}
          data={(this.state.language === "ar" && Platform.OS === "android") ? this.carouselData_ar : this.carouselData}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={screenWidth / 5}
          onSnapToItem={(item) => {
            let effectList, activeIndex;
            if (this.state.language === "ar" && Platform.OS === "android") {
              effectList = [...this.carouselData_ar];
              activeIndex = effectList.length - item - 1;
            } else {
              effectList = [...this.carouselData];
              activeIndex = item;
            }
            this.setState({ activeItemIndex: activeIndex });
            this.deepARRef?.current?.switchEffect({
              mask: effectList[activeIndex].name,
              slot: 'effect',
            });
          }}
        />
      </View>
    );
  }

  deepArView = () => {
    return <DeepAR
      testID="deepArId"
      ref={this.deepARRef}
      apiKey={Platform.OS === "ios" ?
        "37c24124d1dae9114f23ea3e88809e232c0328c81880909876cb92a0a8ae91ec896af5af5faeddc9"
        : "bb553c9ba93d2b137f975df3b5cf4448156dbe1b9417ed270e2c50a2981a2621b4252fc466c04b1a"
      }
      style={{ flex: 1 }}
      onEffectSwitched={(slot) => {
      }}
      videoWarmup={false}
      position={this.state.cameraType
        ? CameraPositions.BACK
        : CameraPositions.FRONT}
      onVideoRecordingFinished={(videoDetail) => this.onFinishVideoRecording(videoDetail)
      }
      onVideoRecordingPrepared={() => {
      }}
      onVideoRecordingStarted={() => {
      }}
      onScreenshotTaken={(path) => {
      }}
      onInitialized={() => {
      }}
      onError={(text: string, type: ErrorTypes) => {
        console.log('onError =>', text, 'type =>', type);
      }}
    />
  }

  onPressClearBtn = (item: any, index: number) => {
    const isArabic = this.state.language === "ar" && Platform.OS === "android";
    const { activeItemIndex, selectedTime } = this.state;
    if (activeItemIndex === index) {
      if (selectedTime && !myTimeout) {
        this.setState({ isTimerVisible: true })
      } else {
        this.changeEffect(item.name);
        if ((isArabic && activeItemIndex !== this.carouselData.length - 1) || (!isArabic && activeItemIndex !== 0)) this.takeVideo();
      }
    } else {
      this.carouselRef?.current?.snapToItem(isArabic ? this.carouselData.length - index - 1 : index);
    }
  }
  renderItem = ({ item, index }: CarouselItem) => {
    const isSelected = this.state.isRecordingStart && this.state.activeItemIndex !== index;
    const showSmallImg = this.state.isRecordingStart && this.state.activeItemIndex === index;
    return (
      <>
        <TouchableOpacity testID="takeVideo"
          key={index} disabled={isSelected}
          style={[styles.cardStyle, isSelected && { opacity: 0.5 }]}
          onPress={() => this.onPressClearBtn(item, index)}>
          {this.state.activeItemIndex === index ? <ImageBackground style={styles.cardStyle} source={mainIcon}>
            {this.showClearButton(index) ?
              <View style={[styles.imageStye, { alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }]}>
                <Text style={{ color: 'black', fontSize: 16 }}>{translate("clear")}</Text></View>
              :
              <Image style={[styles.imageStye, showSmallImg && { width: '50%', height: '50%' }]} source={item?.path} />
            }
          </ImageBackground>
            :
            <View style={styles.cardStyle}>
              {this.showClearButton(index) ? <View style={[styles.imageStye, { alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }]}>
                <Text style={{ color: 'black', fontSize: 16 }}>{translate("clear")}</Text></View>
                :
                <Image style={styles.imageStye} source={item?.path} />
              }
            </View>}
        </TouchableOpacity>
        {this.displayFun(index)}
      </>
    );
  }

  displayFun = (index: number) => {
    if (this.state.isRecordingStart && this.state.activeItemIndex === index) {
      return (
        <Text style={{ color: "white", alignSelf: "center" }}>
          {this.displayTime(this.state.timerValue)}
        </Text>
      )
    } else null;
  }

  renderDisplayTime() {
    if (this.state.isRecordingStart) {
      return (
        <Text style={{ color: "white", alignSelf: "center" }}>
          {this.displayTime(this.state.timerValue)}
        </Text>
      )
    } else {
      return null
    }
  }
  showChooseImage() {
    if (!this.state.isRecordingStart) {
      return (
        <TouchableOpacity testID="captureImgBtn" style={styles.captureBtn}
          onPress={() => this.chooseImage()}
        >
          <Image source={gallery} style={styles.captureClickBtn} />
        </TouchableOpacity>
      )
    } else return null
  }
  renderActionButtons = () => {
    return (
      <View style={styles.buttonsContainer}>
        {this.actionButtons.map((item, index) => (
          <TouchableOpacity onPress={() => { this.handleActionButtonOnClick(item?.label) }} key={item.id}>
            <Image source={item?.icon} style={styles.buttonIcon} />
            <Text style={styles.buttonName}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  inputRightStyle = (language: any) => {
    if (language == "ar") {
      return styles.inputTextRight;
    }
  }

  renderLiveTopicTitleImage = () => {
    if (this.state.length !== "live") return <View style={{ flex: 1 }} />;
    let profileImage = avatar;
    if (this.state.profileImageData1?.uri) {
      profileImage = { uri: this.state.profileImageData1.uri }
    } else if (this.state.currentUser?.photo) {
      profileImage = { uri: this.state.currentUser.photo }
    }

    return (
      <TouchableWithoutFeedback onPress={this.hideKeyboard} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.topContainer}>
            <View style={styles.blurView} />
            <View style={styles.profileContainer}>
              <Image testID="liveThumbnail"
                source={profileImage}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.changeTxtContainer}
              >
                <View style={styles.changeTxtBlurView} />
                <TouchableOpacity testID="change" onPress={this.chooseImage1}>
                  <Text style={[styles.changeTxt, styles.alignCenter]}>
                    {translate("Change")}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
              <TextInput
                testID="title"
                ref={this.textInputRef}
                value={this.state.title}
                maxLength={180}
                onChangeText={txt => this.setState({ title: txt })}
                style={[styles.addTitleTxtInput, this.inputRightStyle(this.state.language)]}
                numberOfLines={5}
                multiline
                textAlignVertical="top"
              />
              {this.state.title?.length === 0 &&
                <TouchableOpacity testID="placeholder" activeOpacity={1} onPress={() => { this.textInputRef?.current?.focus() }} style={styles.placeHolder}>
                  <Text style={styles.changeTxt}>{translate("Add_a_Title")}</Text>
                  <Image source={require('../../assets/edit_pad.png')} style={styles.editIcon} />
                </TouchableOpacity>}
            </View>
          </View>
          <View style={styles.topicContainer}>
            <View style={styles.blurView} />
            <Image source={require('../../assets/emoji.png')} style={[styles.buttonIcon, styles.emoji]} />
            <TextInput
              testID="topic"
              value={this.state.topic}
              placeholder={translate("Add_a_Topic")}
              style={[styles.titleInput, this.inputRightStyle(this.state.language)]}
              onChangeText={txt => { this.setState({ topic: txt }) }}
              numberOfLines={1}
              placeholderTextColor="white"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  onPressPlayPause = () => {
    let { selectedTime } = this.state;
    if (selectedTime !== 0 && !myTimeout) {
      this.setState({ isTimerVisible: true })
    } else {
      this.changeEffect("clear");
      this.takeVideo();
    }
  }

  liveStartFunc = () => {
    return <View style={styles.camerabottom}>
      <View style={[styles.captureBtn]}>
        {/* {this.renderActionButtons()} */}
        <CustomButton testID="goLiveBtnID" title={`${translate("goLive")}`}
          style={styles.customLiveButton}
          TextStyle={styles.goLiveTxt}
          onPress={() => {
            if (this.state.title == "" || this.state.topic == "") {
              this.setState({ alertModal: { openAlertModal: true, alertMsg: translate("Add_title_text"), } });
              return;
            }
            this.setState({ isActive: false })
            this.requestPermissions();
          }} />
      </View>
    </View>
  }

  getSelectedTimerStyle = (selectedTimer: number) => {
    if (this.state.selectedTime === selectedTimer) return styles.selectedTimer;
    return {}
  }

  renderTimerModalStatus = () => {
    if (this.state.timermodelstatus) {
      return <View style={styles.timermodelcontainer}>

        <TouchableOpacity
          testID="time3BtnID"
          style={[styles.timerValuesselect, this.getSelectedTimerStyle(3)]}

          onPress={() => this.setState({ selectedTime: 3, timermodelstatus: false, })}>
          <Text
            style={[{ color: "white" }]}
          >3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="time5BtnID"
          style={[styles.timerValuesselect, this.getSelectedTimerStyle(5)]}

          onPress={() => this.setState({ selectedTime: 5, timermodelstatus: false, })}>
          <Text
            style={[{ color: "white" }]}
          >5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="time7BtnID"
          style={[styles.timerValuesselect, this.getSelectedTimerStyle(7)]}

          onPress={() => this.setState({ selectedTime: 7, timermodelstatus: false, })}>
          <Text
            style={[{ color: "white" }]}
          >7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="time10BtnID"
          style={[styles.timerValuesselect, this.getSelectedTimerStyle(10)]}

          onPress={() => this.setState({ selectedTime: 10, timermodelstatus: false, })}>
          <Text
            style={[{ color: "white" }]}
          >10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="time15BtnID"
          style={[styles.timerValuesselect, this.getSelectedTimerStyle(15)]}

          onPress={() => this.setState({ selectedTime: 15, timermodelstatus: false, })}>
          <Text
            style={[{ color: "white" }]}
          >15</Text>
        </TouchableOpacity>
      </View>
    } else if (this.state.livestart && this.state.length == "live") {
      return this.liveStartFunc()
    }

    return <View style={styles.camerabottom}>
      {!this.state.isRecordingStart &&
        <TouchableOpacity testID="effectsBtn" onPress={this.handleShowEffects} style={[styles.captureBtn, { width: 50, height: 50 }]}>
          <Image source={effects} style={styles.captureClickBtn} />
        </TouchableOpacity>
      }
      <TouchableOpacity
        testID="playPuaseBtnID"
        onPress={() => this.onPressPlayPause()}
        activeOpacity={0.6}
        style={styles.captureBtn}
      >
        <Image source={(!this.state.isRecordingStart) ? mainIcon : pausebutton
        } style={styles.captureClickBtnMain} />
        {this.renderDisplayTime()}
      </TouchableOpacity>
      {this.showChooseImage()}
    </View>

  }

  reelOptionLable = (option: any) => {
    if (option.label === "Flash") {
      return this.state.isFlashOn ? option.filledIcon : option.iconImg
    } else if (option.label === "Timer") {
      if (this.state.selectedTime === 0) {
        return option.iconImg
      } else {
        return option.filledIcon
      }
    } else {
      return option.iconImg
    }
  }

  reelButtonOption = () => {
    return (
      <View style={styles.sideOptionsContainer}>
        {this.state.reelsOptions &&
          this.state.reelsOptions.length > 0 &&
          this.state.reelsOptions.map((option: any, index: any) => {
            return (
              <View
                testID="onClick"
                style={styles.reelsOptionBtn}
                key={option.id}

              >
                <TouchableOpacity
                  testID={`reelsOptionBtnId${index}`}
                  disabled={option?.label === 'Flash' && !this.state.cameraType}
                  onPress={option.onClick}
                  style={[styles.optionBtnTextContainer]}>
                  {this.reelOptionLable(option)}
                  <Text style={[styles.optinBtnText]}>{option.label}</Text>
                </TouchableOpacity>
              </View>

            );
          })}
      </View>
    )
  }

  textStyleFunc = (value: any) => {
    if (this.state.length === value) {
      return styles.lengthtxselected;
    } else {
      return styles.lengthtxt;
    }
  }

  dotIconFunc = (value: any) => {
    if (this.state.length === value) {
      return <Icon name="dot-single" size={12} color="white" />;
    } else {
      return <Icon name="dot-single" size={12} color="black" />;
    }
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    // Customizable Area End
    return (
      <SafeAreaView style={styles.safeAreaView}>

        {/* Customizable Area Start */}

        {this.state.isTimerVisible && this.renderTimerModal()}
        {timerstarted && this.state.isTimerVisible &&
          <View style={[styles.timerDesign]}>
            <View style={[{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 35, borderWidth: 3, borderColor: 'white' }]}>
              <Text
                style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>
                {
                  this.state.selectedTime
                }
              </Text>
            </View>
          </View>
        }
        <View style={styles.container}>
          <View style={[styles.preview,]} >
            {this.state.isActive && this.deepArView()}
          </View>

          {!this.state.isRecordingStart ?
            <View
              style={[styles.bottomiconscontainer, { bottom: 0 }]}
            >

              <TouchableOpacity
                testID="90BtnId"
                onPress={() => { this.setState({ length: "90" }) }}
                style={styles.centerStyle}
              >
                <Text testID="text90Id" style={this.textStyleFunc("90")}>{translate("s90")}</Text>
                {this.dotIconFunc("90")}
              </TouchableOpacity>
              <TouchableOpacity
                testID="60BtnId"
                onPress={() => { this.setState({ length: "60" }) }}
                style={styles.centerStyle}
              >
                <Text testID="text60Id" style={this.textStyleFunc("60")}>{translate("s60")}</Text>
                {this.dotIconFunc("60")}
              </TouchableOpacity>
              <TouchableOpacity
                testID="30BtnId"
                onPress={() => { this.setState({ length: "30" }) }}
                style={styles.centerStyle}
              >
                <Text testID="text30Id" style={this.textStyleFunc("30")}>{translate("s30")}</Text>
                {this.dotIconFunc("30")}
              </TouchableOpacity>
              <TouchableOpacity
                testID="15BtnId"
                onPress={() => { this.setState({ length: "15" }) }}
                style={styles.centerStyle}
              >
                <Text testID="text15Id" style={this.textStyleFunc("15")}>{translate("s15")}</Text>
                {this.dotIconFunc("15")}
              </TouchableOpacity>
              <TouchableOpacity testID="LiveBtnId" onPress={() => {
                this.setState({
                  livestart: true,
                  length: 'live'
                })
              }}
                style={styles.centerStyle}
              >
                <Text testID="textLiveId" style={this.textStyleFunc("live")}>{translate("live")}</Text>
                {this.dotIconFunc("live")}
              </TouchableOpacity>
              {/* <TouchableOpacity  testID="LiveChallengeBtnId" onPress={()=>{
                  this.setState({length:"Challenges",isActive:false})
                  this.props.navigation.navigate('LiveChallengesPopUp')
                  }}>
                  <Text testID="textChallengesId" style={(this.state.length==="Challenges")?styles.lengthtxselected:styles.lengthtxt}>{translate("Challenges")}</Text>
                  {(this.state.length==="Challenges")? <Icon name="dot-single" size={12} color="white"/>: <Icon name="dot-single" size={12} color="black"/>}
                </TouchableOpacity> */}
            </View>
            : <View style={[styles.bottomiconscontainerinRecord, { bottom: 0, opacity: .1 }]} >

            </View>
          }
          <View style={[this.state.length === "live" ? styles.liveButtonBottom : styles.cameraOverlapContainer]}>
            {!(this.state.isRecordingStart && this.state.showEffects) &&
              <TouchableOpacity testID="goback"
                style={styles.crossIconBgnd}
                onPress={() => this.onPressCrossBtn()}>
                <Image source={crossicon} style={styles.crossBtn} />
              </TouchableOpacity>}
            {this.renderLiveTopicTitleImage()}
            {!this.state.isRecordingStart && this.state.length != "live" &&
              this.reelButtonOption()
            }
            {this.state.showEffects ?
              this.renderEffects() : this.renderTimerModalStatus()}
          </View>
        </View>
        <AlertModal
          alertModal={this.state.alertModal}
          onPress2={() => { this.setState({ alertModal: { openAlertModal: false } }) }}
          btnTitle2={translate("ok")}
        />

        {/* Customizable Area End */}

      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "black"
  },
  container: {
    flex: 1,
    height: screenHeight,
    flexDirection: "column",
    backgroundColor: "black",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  carouselContainer:
  {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: sliderWidth,
    height: '15%',
    bottom: '3%',
  },
  cardStyle: { width: imageWidth, borderRadius: (imageWidth + 80) / 2, height: 80, alignItems: 'center', justifyContent: 'center', padding: 7, },
  imageStye: { width: '100%', borderRadius: 80, height: '100%' },
  camerabottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Platform.OS == 'ios' ? 20 : 0
  },
  timerValuesselect: {
    borderRadius: scale(20), padding: 10, backgroundColor: "black", marginHorizontal: scale(5), paddingHorizontal: 15
  },
  selectedTimer: {
    padding: 15,
    borderRadius: 20,
    paddingHorizontal: 22
  },
  flexContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalBtnStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flex: 1
  },
  modalHeader: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    color: "grey",
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 5
  },
  bottomiconscontainer: {
    width: "100%",
    height: scale(60),
    flexDirection: "row",
    backgroundColor: "black",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: scale(50),
    paddingRight: scale(50), zIndex: 1000
  },
  bottomiconscontainerinRecord: {
    width: "100%",
    height: scale(60),


  },
  customLiveButton: { paddingHorizontal: "40%", },
  goLiveTxt: { color: "black", padding: scale(3) },
  lengthtxt: {
    color: "gray",
    fontSize: scale(12)
  },
  lengthtxselected: {
    color: "white",
    fontSize: scale(12)
  },
  preview: {
    flex: 1,
    // backgroundColor: "yellow",
    borderRadius: 20,

    overflow: 'hidden',
  },
  getMusicStyle: {
    alignSelf: "center",
    justifyContent: "center",
    height: 100,
    backgroundColor: "green",
    flex: 1
  },
  getMusicText: {
    textAlign: "center",
    alignSelf: "center",
    color: "white"
  },
  dropDownContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: scale(10),
    borderRadius: scale(5),
    marginVertical: scale(10)
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },
  timermodelcontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    paddingVertical: 5,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 30,
    flexDirection: "row",
    // width:"60%"

  },
  modalMusic: {
    flexDirection: "row",
    flex: 1
  },
  ModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalbody: {
    backgroundColor: "white",
    borderColor: "rgba(0,0,0,.5)",
    borderTopRightRadius: scale(15),
    borderTopLeftRadius: scale(15),
    overflow: "hidden",
  },
  modalbodycancel: {
    backgroundColor: "white",
    borderColor: "rgba(0,0,0,.5)",
    borderRadius: scale(15),
    overflow: "hidden",
  },
  modalView: {
    backgroundColor: '#ffffff',
    width: scale(375),
    height: scale(490),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
  crossIconBgnd: {
    width: 40,
    height: 40,
    marginLeft: scale(10),
    marginTop: scale(30)
  },
  crossBtn: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  closeIcon: {
    height: scale(30),
    width: scale(30),
  },
  discardButton: {
    fontSize: scale(15),
    color: 'red',
    fontWeight: 'bold',
  },
  discardHeader: {
    fontSize: scale(15),
    lineHeight: scale(24),
    color: 'rgb(0, 0, 0)',
    fontWeight: 'bold',
  },
  setTimerBtn: {
    backgroundColor: "skyblue",
    flex: 1,
    padding: 15
  },
  sideOptions: {
    justifyContent: "center"
  },
  musicImg: {
    width: 100,
    height: 100,
    backgroundColor: '#eee'
  },
  timerBtnText: {
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16
  },
  options: {
    padding: 10,
    backgroundColor: "skyblue",
    width: screenWidth / 3,
    marginBottom: 10
  },
  cameraOverlapContainer: {
    position: "absolute",
    width: screenWidth,
    height: screenHeight,
    justifyContent: "flex-end",
    paddingBottom: (Platform.OS == "ios") ? scale(100) : scale(50),
  },
  liveButtonBottom: {
    width: screenWidth,
    height: screenHeight,
    paddingBottom: (Platform.OS == "ios") ? scale(100) : scale(50),
    position: "absolute"
  },
  captureClickBtn: {
    width: 50,
    height: 50
  },
  captureClickBtnMain: {
    width: 80,
    height: 80
  },
  arrowbutton: {
    width: 30,
    height: 30
  },
  sideOptionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    width: screenWidth / 1,
    height: screenHeight / 1.5,
    position: 'absolute',
    bottom: 150

  },
  reelsOptionBtn: {
    flexDirection: "column",
    paddingVertical: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  optionBtnTextContainer: {
    paddingHorizontal: 12,
    alignItems: "center",
  },
  optinBtnText: {
    color: "white",
    fontSize: 15
  },
  btnIconOnReel: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  modalCaptureBtn: {
    position: 'absolute',
    bottom: 40,
    left: screenWidth / 2 - 50,
  },
  captureBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
    marginHorizontal: 10
  },

  captureBtnFill: {
    width: "85%",
    height: "85%",
    borderRadius: 100,
    backgroundColor: "#fff"
  },
  modalMainContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end"
  },
  modalContentContainer: {
    backgroundColor: "#fff",
    maxHeight: screenHeight - 200,
    paddingHorizontal: 20,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingTop: 20
  },
  flashBtn: {
    width: 20,
    height: 20
  },
  dropdownBtn: {
    width: scale(16),
    height: scale(16)
  },

  videoView: {
    width: width,
    opacity: 1,
  },
  videoOuter: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewHeader: {
    paddingHorizontal: 20,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    left: 0,
    width: width,
    paddingVertical: 40,

  },
  arrowiconContainer: {
    marginHorizontal: 20,
    marginBottom: 60,
    marginTop: 20,
    backgroundColor: "rgba(0,0,0,.4)",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  musicTypeTab: {
    justifyContent: "center",
    marginRight: 1,
    marginTop: 2,
    alignItems: 'center'
  },
  musicTabSelected: {
  },
  shareContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: scale(10)
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: scale(18),
    marginLeft: scale(16.2),
    lineHeight: scale(24)
  },
  selectedButton: {
    height: scale(32),
    width: scale(95),
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContainder: {
    flexDirection: 'row',
    marginHorizontal: scale(16),
    marginTop: verticalScale(27),
    alignItems: 'center'
  },
  inputText: {
    fontSize: scale(16),
    height: scale(200),
    marginLeft: scale(5)
  },

  backImg: {
    height: scale(52),
    width: scale(343),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(50)
  },
  backImgmodelcancel: {
    height: scale(52),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(50)
  },
  backImgmodelshare: {
    height: scale(52),
    width: "40%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(50),
    borderWidth: 1,

  },
  btnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: scale(14),
  },
  btnTextcancel: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: scale(14),
    padding: 10
  },
  btnTextcancelshare: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: scale(14),
    padding: 10
  },
  bodyContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: scale(15),
    flexDirection: 'row',
  },
  imageCover: {
    marginTop: scale(20),
    width: scale(150),
    height: scale(200),
    borderRadius: scale(10),
    justifyContent: 'flex-end',
  },
  tagsContainer: {
    marginTop: scale(10)
  },
  textTag: {
    fontSize: scale(15),
    fontWeight: '700',
    paddingEnd: scale(10)
  },
  tagsSingle: {
    flexDirection: 'row',
    marginBottom: scale(10),
  },
  locationImg: {
    width: scale(18),
    height: scale(18),
    marginRight: scale(10)
  },
  commentsView: {
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    width: scale(375),
    height: scale(35),
    marginVertical: verticalScale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingEnd: scale(25),
  },
  sharessImg: {
    width: scale(25),
    height: scale(25),
    marginRight: scale(10)
  },
  textShareSS: {
    fontSize: scale(17),
    fontWeight: '700'
  },
  greyText: {
    color: 'grey',
    fontSize: scale(15)
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
  avatar: {
    height: scale(44),
    width: scale(44),
    borderRadius: 5,
    marginRight: 5,
  },
  userName: {
    fontSize: scale(16),
    marginHorizontal: 8,
    fontWeight: '600',
    marginTop: 5
  },
  checkcircle: {
    height: scale(30),
    width: scale(30),
  },
  searchIcon: {
    height: scale(15),
    width: scale(15),
    marginEnd: Platform.OS === "ios" ? 5 : 0,
    marginLeft: 10,
    marginTop: Platform.OS === "ios" ? 5 : 10,
  },
  searchContainer: {
    borderRadius: scale(10),
    borderColor: "rgb(211,211,211)",
    borderWidth: scale(.7),
    padding: Platform.OS === 'ios' ? scale(10) : scale(2),
  },
  searchLocationFeild: {
    width: '100%',
    borderRadius: scale(10),
    borderColor: "grey",
    borderWidth: scale(.7),
    padding: Platform.OS === 'ios' ? scale(10) : scale(5),
  },
  createTag: {
    height: scale(52),
    width: scale(343),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(5)
  },
  crossIcon: {
  },
  centerStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  crossIconContainer: {
    alignSelf: "flex-start",
    marginTop: "15%",
    marginLeft: "5%",
  },
  centerStylee: {
    justifyContent: "center",
    alignItems: "center",
    // padding: scale(10),
  },
  buttonName: {
    color: "#fff",
    alignSelf: "center",
    marginTop: scale(3),
  },
  bottomContainer: {
    position: "absolute",
    bottom: "10%",
    width: "100%",
    alignSelf: "center",
  },
  topContainer: {
    width: "80%",
    height: "20%",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  blurView: {
    position: "absolute",
    backgroundColor: "gray",
    height: "100%",
    width: "100%",
    opacity: 0.7,
  },
  profileContainer: { width: "30%", height: "100%" },
  profileImage: { width: "100%", height: "100%", resizeMode: "stretch" },
  changeTxtContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    height: "20%",
  },
  changeTxtBlurView: {
    position: "absolute",
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    opacity: 0.5,
  },
  changeTxt: { color: "white" },
  alignCenter: { alignSelf: "center" },
  titleContainer: { width: "70%", height: "100%", marginBottom: scale(10) },
  addTitleTxtInput: {
    flex: 1,
    color: "white",
    paddingStart: 10,
  },
  topicContainer: {
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    overflow: "hidden",
  },
  titleInput: { flex: 1, color: "white" },
  placeHolder: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    paddingStart: 10,
    marginTop: Platform.OS === "ios" ? 5 : 10,
  },
  editIcon: {
    width: scale(10), height: scale(11), marginStart: scale(10)
  },
  buttonIcon: {
    width: 22,
    height: 22,
    tintColor: "#fff",
    alignSelf: "center",
    resizeMode: "contain"
  },
  emoji: {
    marginHorizontal: scale(10),
    paddingVertical: Platform.OS === "ios" ? scale(20) : scale(5),
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "35%",
    alignSelf: 'center',
    marginBottom: scale(15),
  },
  newStyle: {
    padding: 15,
    borderRadius: 20,
    paddingHorizontal: 22
  },
  modalContainer: {
    backgroundColor: "#000000aa",
    flex: 1,
    justifyContent: "flex-end",
  },
  comment_ModalView: {
    backgroundColor: "black",
    marginTop: scale(180),
    paddingBottom: scale(Platform.OS === "ios" ? 40 : 0),
    borderTopEndRadius: scale(20),
    borderTopLeftRadius: scale(20)
  },
  modalHeaderView: {
    padding: scale(20),
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderColor: "#d3d3d3"
  },
  modalheaderText: {
    fontSize: scale(16),
    fontWeight: "bold",
    color: "#fff"
  },
  icon: {
    width: scale(35),
    height: scale(35),
    resizeMode: "contain"
  },
  smallText: {
    color: "rgb(211,211,211)",
    fontSize: scale(12),
    fontWeight: "bold"
  },
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  discView: { padding: 20 },
  inputTextRight: {
    textAlign: "right"
  },
});
// Customizable Area End
