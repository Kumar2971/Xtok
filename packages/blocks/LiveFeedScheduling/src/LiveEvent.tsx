import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import Modal from "react-native-modal";
//@ts-ignore
import CalendarPicker from "react-native-calendar-picker";
import { Input } from "react-native-elements";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

import Scale from "../../../components/src/Scale";
import CustomButton from "../../../components/src/Custombutton";
const { width } = Dimensions.get("window");
let screenWidth = Dimensions.get('window').width;

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import LiveFeedSchedulingController, {
  Props,
} from "./LiveFeedSchedulingController";
import {
  calendar,
  closeCircle,
  left,
  newSchedule,
  right,
  timer,
  unscheduleCalendar,
  imgLeftArrow,
} from "./assets";
import { COLORS } from "../../../framework/src/Globals";
import moment from "moment";

import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import { translate } from "../../../components/src/i18n/translate";
import AlertModal from "../../../components/src/AlertModal";

export default class LiveFeedScheduling extends LiveFeedSchedulingController {
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
  renderEmptyItem = () => {
    return (
      <View
        style={{
          alignItems: "center",
          marginTop: deviceBasedDynamicDimension(100, true, 1),
        }}
      >
        <View style={styles.calendarView}>
          <Image source={calendar} style={styles.calendarIcon} />
          <Text style={styles.noLiveEventTitle}>
            {translate("noLive")}{" "}
          </Text>
          <Text style={{ alignSelf: "center" }}>
            {translate("createLive")}
          </Text>
        </View>
      </View>
    )

  }

  handleChangeTextNum = (text: string) => {
    let re = /^(\d|[0-5]\d|59|all)$/
    if (re.test(text)) {
      this.setState({ selectTimeMin: text });
    } else {
      this.setState({ selectTimeMin: '' });
    }
  }

  handleChangeText = (text: string) => {
    let re = /(^0?[1-9]$)|(^1[0-2]$)/
    if (re.test(text)) {
      this.setState({ selectTimeHr: text });
    } else {
      this.setState({ selectTimeHr: '' });
    }
  }

  listHeaderComp = () => {
    return (
      <Text style={styles.titleText}>
        {translate("scheduled")}
      </Text>
    )
  }
  listHeader = () => {
    return (
      <Text style={styles.titleText}>
        {this.state.endeventList.length === 0 ? "" : translate("Ended")}
      </Text>
    )
  }
  calculateRemainingTime = (item: any) => {

    let startDate = item.attributes.start_date.split("-").reverse().join("/");
    let combinedTime = `${startDate} ${item.attributes.start_time}`;

    const date = new Date(`${combinedTime}`);
    const dateTOStrig = date.toString()

    let countDownDate = new Date(dateTOStrig).getTime();
    let timeLeft = countDownDate - this.state.now;

    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (timeLeft < (1000) && timeLeft > 0) {
      if (!this.state.flag) {
        this.props.navigation.navigate("LiveStreaming", { EventDetails : item });
        this.setState({ flag: true })
        return;
      }
    }

    if (timeLeft < 0) {
      return translate("completed")
    } else {
      return days + '' + translate("d") + ' ' + hours + ' ' + translate("h") + ' ' + minutes + ' ' + translate("m") + ' ' + seconds + ' ' + translate("second") + ' ';
    }
  }
  getTimeTextState = () => this.state.colorId === 1 ? styles.setTimeTextInput : styles.notSetTimeTextInput;
  getAmpTextState = () => this.state.amPmColorId === 1 ? styles.AmPmText : styles.AmPmNotSetText;


  warnTopicFunc = () => {
    const { warnTopic } = this.state;
    if (warnTopic) {
      return <Text style={styles.warnText}>{warnTopic}</Text>
    } else {
      return null;
    }
  }
  warnTopicDescFunc = () => {
    const { warnTopicDes } = this.state;
    if (warnTopicDes) {
      return <Text style={styles.warnText}>{warnTopicDes}</Text>
    } else {
      return null;
    }
  }

  warnTimeFunc = () => {
    const { warnTime } = this.state;
    if (warnTime) {
      return <Text style={styles.warnText}>{warnTime}</Text>
    } else {
      return null;
    }
  }
  onDurationChange = (text: any) => {
    let re = /(^0?[1-9]$)|(^1[0-2]$)/
    if (re.test(text)) {
      console.log("Valid");
      this.setState({ selectDurationHr: text });
    } else {
      console.log("Invalid");
      this.setState({ selectDurationHr: '' });
    }
  }

  selectEventFunc = () => {
    if (this.state.selectedEvent) {
      return (
        <>
          <Text style={[styles.eventTitleTxt, this.state.language == 'ar' && { textAlign: 'right' }]}>
            {this.state.selectedEvent.attributes.event_name}
          </Text>
          <Text numberOfLines={1} style={[styles.eventDesctxt, this.state.language == "ar" && styles.textAlign]}>
            {this.state.selectedEvent.attributes.description}
          </Text>
          <Text numberOfLines={1} style={[styles.eventDesctxt, this.state.language == 'ar' && { textAlign: 'left' }]}>
            {this.calculateRemainingTime(this.state.selectedEvent)}
          </Text>
        </>
      )
    }
  }

  commonRenderFunc = (item: any, isRenderOf: any) => {
    return (
      <TouchableOpacity testID="eventBtn" style={[styles.eventContainer, isRenderOf == "eventList" ? this.state.language == 'ar' && { padding: 0, margin: 0 } : null]} onPress={() => {
        this.setState({ isModalVisible: true, selectedEvent: item })
      }}>
        <Text style={[styles.eventTitleTxt, this.state.language == 'ar' && { textAlign: 'left' }]}>
          {item.attributes.event_name}
        </Text>
        <Text numberOfLines={1} style={[styles.eventDesctxt, this.state.language == 'ar' && { textAlign: 'left' }]}>
          {item.attributes.description}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginVertical: deviceBasedDynamicDimension(
              25,
              true,
              1
            ),
            alignItems: 'center'
          }}
        >
          <Image
            source={timer}
            style={{
              height: deviceBasedDynamicDimension(14, true, 1),
              width: deviceBasedDynamicDimension(14, true, 1),
              marginHorizontal: deviceBasedDynamicDimension(
                5,
                true,
                1
              ),
            }}
          />
          <Text style={styles.startsIn}>{" "}{translate("startsIn")}{" "}</Text>
          <Text>
            {
              this.calculateRemainingTime(item)
            }
          </Text>

          <TouchableOpacity
          testID="deleteBtn"
            onPress={() => {
              this.setState({
                currentDeleteData: item,
              });
              this.deleteEvent(item);
            }}
          >
            <Text style={{ textAlign: "right", marginLeft: 20 }}>
              {translate("delete")}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  endEventFunc = () => {
    if (this.state.endeventList?.length > 0) {
      return (
        <>
          <View style={styles.separator} />
          <FlatList
            testID="endeventList"
            style={{ flex: 1 }}
            data={this.state.endeventList}
            ListEmptyComponent={() => (
             this.renderEmptyItem()
            )}
            ListHeaderComponent={() => (
              this.listHeader()
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={( item : any) => {              
              return (
                <View style={{ flex: 1 }}>
                 {this.commonRenderFunc(item.item , "endEventList")}
                </View>
              );
            }}
          />
        </>
      )
    }
  }

  renderEndEventList = (item:any) => {
            
      return (
        <View style={{ flex: 1 }}>
         {this.commonRenderFunc(item , "endEventList")}
        </View>
      );

  }
  arrowImage = () =>{
    if(this.state.language == "ar"){
      return styles.arrow_ar;
    }
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    const { navigation } = this.props;

    const { selectedStartDate, liveEventTopic, liveEventDesc, language } = this.state;
    const DATE_FORMAT = "DD-MM-YYYY";
    this.onDateChange = this.onDateChange.bind(this);
    const startDate = moment(selectedStartDate || "").format(DATE_FORMAT);
    let today = moment();

    const onPressLive = () => navigation.navigate("LiveFeedScheduling");
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerTitle}>
          <TouchableOpacity
            testID="backBtn"
            onPress={onPressLive}
          >
            <Image
              source={imgLeftArrow}
              style={[styles.headerIcon_en, language == "ar" && styles.arrow_ar]}
              testID="leftBackBtn"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.LiveTxt}>{translate("live_Events")}</Text>
        </View>
        <View style={styles.separator} />

        <>
          <FlatList
            testID="eventList"
            style={{ flex: 1 }}
            data={this.state.eventList}
            ListEmptyComponent={() => (
              this.renderEmptyItem()
            )}
            ListHeaderComponent={() => (
              this.listHeaderComp()
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={(item : any) => {
              return (
                <View style={[{ flex: 1 }]}>
                  {this.commonRenderFunc(item.item , "eventList")}
                </View>
              );
            }}
          />
          {this.endEventFunc()}
        </>
        <View style={styles.footer}>
          <TouchableOpacity
            testID="scheduleLiveBtn"
            style={styles.scheduleLiveBtn}
            onPress={() => this.onPressOpenModel()}
          >
            <Image source={newSchedule} style={styles.setScheduleIcon} />
            <Text style={styles.scheduleLiveEventTxt}>{translate("schedule_Live")}</Text>
          </TouchableOpacity>
        </View>

        <Modal
          testID="scheduleModal"
          statusBarTranslucent={true}
          style={[styles.modal]}
          isVisible={this.state.isVisible}
          useNativeDriver={true}
          onBackButtonPress={() => this.onPressCloseModel()}
        >
          <Modal
            animationOut="slideOutDown"
            isVisible={this.state.modalVisible}
            testID="calenderModal"
          >
            <View style={styles.centeredView}>
              <CalendarPicker
                minDate={today}
                // weekdays={ this.state.language=="en"?["S", "M", "T", "W", "T", "F", "S"]:["S","F","T","W","T","M","S"]}
                weekdays={["S", "M", "T", "W", "T", "F", "S"]}
                selectedDayColor={COLORS.yellow}
                selectedDayStyle={styles.selectedDayStyle}
                onDateChange={this.onDateChange}
                previousComponent={
                  <Image source={left} style={[styles.calendarArrowIcon,this.arrowImage()]} />
                }
                width={250}
                textStyle={{ fontSize: 12 }}
                showDayStragglers={true}
                nextComponent={
                  <Image source={right} style={[styles.calendarArrowIcon,this.arrowImage()]} />
                }
              />
            </View>
          </Modal>
          <KeyboardAvoidingView
          behavior={"padding"}
          keyboardVerticalOffset={-20}
          style={styles.keyboardPadding}
         >
          <View style={styles.innerModel}>
            <View style={styles.modalHeader}>
              <Text style={styles.scheduleTimeTxt}>{translate("schedule_Live")}</Text>
              <TouchableOpacity testID="closeModalBtn" onPress={() => this.onPressCloseModel()}>
                <Image source={closeCircle} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              <View style={styles.inputContainer}>
                <View style={styles.eventTopicHeader}>
                  <Text style={styles.eventHeader}>{translate("event_Topic")}</Text>
                  <Text style={styles.counterTxt}>
                    {this.state.textLength}/32
                  </Text>
                </View>
                <TextInput
                  testID="topicTextInput"
                  style={[styles.topicTextInput, this.state.language == 'ar' && { textAlign: 'right' }]}
                  maxLength={32}
                  placeholder={translate("enterTopic")}
                  //  multiline={true}
                  placeholderTextColor={COLORS.infoGray}
                  onChangeText={(text) => this.onChangeTextTopicTitle(text)}
                  value={liveEventTopic}
                />
                {this.warnTopicFunc()}
                <View style={styles.eventDesHeader}>
                  <Text style={styles.eventHeader}>
                    {translate("event_Description")}
                  </Text>
                  <Text style={styles.counterTxt}>
                    {this.state.textLenght2}/200
                  </Text>
                </View>
                <TextInput
                  testID="descTextInput"
                  style={[styles.topicTextInput2, this.state.language == 'ar' && { textAlign: 'right' }]}
                  textAlignVertical={"top"}
                  maxLength={200}
                  placeholder={translate("enterDesc")}
                  placeholderTextColor={COLORS.infoGray}
                  multiline={true}
                  onChangeText={(text) => this.onChangeTextTopicDescTitle(text)}
                  value={liveEventDesc}
                />
                {this.warnTopicDescFunc()}
              </View>

              <View style={styles.dateContainer}>
                <Text style={[styles.eventHeader, styles.textAlign]}>{translate("select_Date")}</Text>
                <TouchableOpacity
                  testID="calenderBtn"
                  style={{ flexDirection: "row", marginTop: 10 }}
                  onPress={() => this.setState({ modalVisible: true })}
                >
                  <Image
                    source={unscheduleCalendar}
                    style={styles.selectDateIcon}
                  />
                  <Text style={[styles.setDateTxt, this.state.language == "ar" && { textAlign: "left" }]}>{startDate}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.dateContainer}>
                <Text style={[styles.eventHeader, styles.textAlign]}>{translate("select_Time")}</Text>
                <View style={styles.titleTimeContainer}>
                  <Image source={timer} style={styles.selectDateIcon} />
                  <TouchableOpacity
                    testID="timePickerBtn"
                    onPress={() => this.showTimePicker()}
                    style={{
                      width: "30%",
                      flexDirection: "row",
                      alignItems: 'center'
                    }}
                  >
                    <View
                      style={
                        this.getTimeTextState()
                      }
                    >
                      <Input
                        testID="hourInput"
                        containerStyle={{ padding: 0, paddingHorizontal: 0 , height:30}}
                        inputContainerStyle={{
                          padding: 0,
                          paddingHorizontal: 5,
                          height: 30,
                          borderWidth: 0
                        }}
                        inputStyle={{ fontSize: 12 }}
                        keyboardType="numeric"
                        value={this.state.selectTimeHr}
                        onChangeText={text => {
                          this.handleChangeText(text)
                        }}
                      />
                    </View>

                    <Text>{" : "}</Text>

                    <View
                      style={
                        this.getTimeTextState()
                      }
                    >
                      <Input
                        testID="minutInput"
                        containerStyle={{ padding: 0, paddingHorizontal: 0,height:30 }}
                        inputContainerStyle={{
                          padding: 0,
                          paddingHorizontal: 5,
                          height: 30,
                          borderWidth: 0
                        }}
                        leftIconContainerStyle={{
                          marginLeft: 0
                        }}
                        inputStyle={{ fontSize: 12 }}
                        keyboardType="numeric"
                        value={this.state.selectTimeMin}
                        onChangeText={text => {
                          this.handleChangeTextNum(text)
                        }}
                      />
                    </View>

                  </TouchableOpacity>
                  <View style={styles.amPmContainer}>
                    <TouchableOpacity
                      testID="AMBtn"
                      style={
                        this.state.amPmColorId === 1
                          ? styles.red
                          : styles.button
                      }
                      onPress={() => this.onPressAmPmColor(1)}
                    >
                      <Text style={this.getAmpTextState()}>
                        AM
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    testID="PMBtn"
                      style={
                        this.state.amPmColorId === 2
                          ? styles.red
                          : styles.button
                      }
                      onPress={() => this.onPressAmPmColor(2)}
                    >
                      <Text
                        style={
                          this.state.amPmColorId === 2
                            ? styles.AmPmText
                            : styles.AmPmNotSetText
                        }
                      >
                        PM
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {this.warnTimeFunc()}
              </View>

              <View style={styles.dateContainer}>
                <Text style={[styles.eventHeader, styles.textAlign]}>{translate("select_Duration")}</Text>

                <View style={styles.titleTimeContainer}>
                  <Image source={timer} style={styles.selectDateIcon} />
                  <TouchableOpacity
                    testID="durationBtn"
                    style={{
                      width: "30%",
                      flexDirection: "row",
                      marginRight: 20,
                    }}
                    onPress={() => this.showDurationTimePicker()}
                  >
                    <View
                      style={
                        this.getTimeTextState()
                      }
                    >
                      <Input
                        testID="durationHourInput"
                        containerStyle={{ padding: 0, paddingHorizontal: 0 , height:30}}
                        inputContainerStyle={{
                          padding: 0,
                          paddingHorizontal: 5,
                          height: 30,
                          borderWidth: 0
                        }}
                        leftIconContainerStyle={{
                          marginLeft: 0
                        }}
                        inputStyle={{ fontSize: 12 }}
                        keyboardType="numeric"
                        value={this.state.selectDurationHr}
                        onChangeText={text => this.onDurationChange(text)}
                      />
                    </View>

                    <Text style={{ marginTop: 4 }}>{" : "}</Text>

                    <View
                      style={
                        this.state.colorId === 1
                          ? styles.setTimeTextInput
                          : styles.notSetTimeTextInput
                      }
                    >
                      <Input
                        testID="durationMinuteInput"
                        containerStyle={{ padding: 0, paddingHorizontal: 0 , height:30}}
                        inputContainerStyle={{
                          padding: 0,
                          paddingHorizontal: 5,
                          height: 30,
                          borderWidth: 0
                        }}
                        leftIconContainerStyle={{
                          marginLeft: 0
                        }}
                        inputStyle={{ fontSize: 12 }}
                        keyboardType="numeric"
                        value={this.state.selectDurationMin}
                        onChangeText={text => {
                          let re = new RegExp("^([0-9]|[0-5][0-9]|59|all)$");
                          if (re.test(text)) {
                            console.log("Valid");
                            this.setState({ selectDurationMin: text });
                          } else {
                            console.log("Invalid");
                            this.setState({ selectDurationMin: '' });
                          }
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                  <View />
                </View>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity
                  testID="scheduleSubmitBtn"
                  style={styles.scheduleLiveEvent}
                  onPress={() => this.onPressScheduleLiveEvent()}
                >
                  {/* {this.state.isFromEdit && ( */}
                  <Text style={styles.scheduleLiveEventTxt}>
                    {translate("schedule_Live")}
                  </Text>
                  {/* )} */}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          </KeyboardAvoidingView>
        </Modal>
        <AlertModal alertModal={this.state.alertModal} onPress2={() => { this.setState({ alertModal: { openAlertModal: false } }) }}
          btnTitle2={"OK"} />
        <Modal
          //@ts-ignore
          animationType="slide"
          testID="openEventModal"
          transparent visible={this.state.isModalVisible}
          presentationStyle="overFullScreen"
        >
          <View style={styles.viewWrapper}>
            <View style={styles.modalView}>
              {
                this.selectEventFunc()
              }
              <View style={{ display: 'flex', flexDirection: 'row', marginVertical: Scale(10) }}>
                <CustomButton testID="temp1" title={translate("close")} style={{ marginRight: Scale(10) }} onPress={() => this.setState({ isModalVisible: false })} />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  keyboardPadding: { flex:0.9},
  container: {
    flex: 1,
    width: Platform.OS === "web" ? "75%" : "100%",
    backgroundColor: "#fff",
    padding: 2,
  },
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },

  headerTitle: {
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: Scale(15),
    // height: Scale(40),
    width: '100%',
    paddingTop: Scale(15),
  },
  headerIcon: {
    height: 17,
    width: 17,
    marginTop: 3,
  },
  headerIcon_en: {
    height: Scale(25),
    width: Scale(25),
    resizeMode: "contain"
  },
  LiveTxt: {
    fontSize: Scale(18),
    fontWeight: 'bold',
    width: screenWidth - Scale(60),
    textAlign: 'center'
  },
  separator: {
    borderWidth: 0.4,
    borderColor: "#B7BBC0",
    marginTop: 10,
  },
  footer: {
    justifyContent: "flex-end",
  },
  scheduleLiveBtn: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#FFC925",
    width: "70%",
    height: 48,
    borderRadius: 100,
    flexDirection: "row",
    marginBottom: 10,
  },
  innerModel: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },
  centeredView: {
    height: 250,
    width: 250,
    paddingTop: 10,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 3,
    position: 'absolute',
    flex: 1,
    alignSelf: 'center',
    top: 95,
    flexDirection: "row-reverse",

  },
  scheduleLiveEvent: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#FFC925",
    width: "70%",
    height: 48,
    borderRadius: 100,
    flexDirection: "row",
    marginHorizontal: 30,
    marginVertical: 30,
  },
  calendarArrowIcon: {
    height: 15,
    width: 15,
    margin: 5,
  },
  selectDateIcon: {
    height: 20,
    width: 20,
    marginRight: 10,
    alignSelf: "center",
  },
  setScheduleIcon: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
    tintColor: COLORS.black,
    resizeMode: "contain",
  },
  scheduleTimeTxt: {
    fontSize: 20,
    fontWeight: "bold"
  },
  closeIcon: {
    height: 25,
    width: 25,
  },
  modalHeader: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginTop: 30,
    justifyContent: "space-between",
  },
  inputContainer: {
    marginTop: 30,
    alignSelf: "center",
    width: '100%',
    paddingHorizontal: 20,
  },
  counterTxt: {
    fontSize: 17,
    color: COLORS.infoGray,
    textAlign: "right",
    justifyContent: "center",
    alignSelf: "center",
  },
  topicTextInput: {
    height: 40,
    width: '100%',
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 6,
    marginVertical: 5,
    borderRadius: 13,
    fontSize: 16,
    fontWeight: "400",
  },
  topicTextInput2: {
    height: 120,
    width: '100%',
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 13,
    fontSize: 16,
    fontWeight: "400",
  },
  eventHeader: {
    fontSize: 17,
    marginVertical: 8,
    color: COLORS.black,
    fontWeight: "400",
  },
  eventTopicHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
  },
  eventDesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  dateContainer: {
    marginVertical: 8,
    marginHorizontal: 20,
  },
  setDateTxt: {
    fontSize: 16,
    borderWidth: 1,
    width: "90%",
    padding: 4,
    paddingLeft: 8,
    borderColor: COLORS.yellow,
    borderRadius: 8,
  },
  selectedDayStyle: {
    width: 40,
    height: 45,
    borderRadius: 8,
    backgroundColor: COLORS.yellow,
  },
  red: {
    backgroundColor: COLORS.yellow,
    padding: 7,
    borderRadius: 4,
    justifyContent:"center",
  },
  button: {
    backgroundColor: COLORS.white,
    padding: 7,
    borderRadius: 4,
    justifyContent:"center",
  },
  amPmContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.infoGray,
  },
  selectAmPmTxt: {
    color: COLORS.white,
  },
  setTimeTextInput: {
    fontSize: 16,
    borderWidth: 1,
    width: "12%",
    alignItems: "center",
    padding: 4,
    paddingLeft: 8,
    borderColor: COLORS.yellow,
    borderRadius: 8,
  },
  notSetTimeTextInput: {
    fontSize: 16,
    backgroundColor: "#EEEEEE",
    width: "45%",
    padding: 4,
    marginTop: deviceBasedDynamicDimension(2, true, 1),
    borderRadius: 8,
  },
  AmPmText: {
    color: COLORS.white,
  },
  AmPmNotSetText: {
    color: COLORS.black,
  },
  calendarView: {
    justifyContent: "center",
  },
  calendarIcon: {
    height: 80,
    width: 80,
    alignSelf: "center",
    marginTop: 20,
  },
  noLiveEventTitle: {
    alignSelf: "center",
    marginTop: 50,
    fontWeight: "700",
    fontSize: 16,
  },
  titleTimeContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  elevation: {
    elevation: 20,
    shadowColor: "red",
  },
  titleText: {
    color: "grey",
    fontSize: 16,
    marginVertical: deviceBasedDynamicDimension(15, true, 1),
    marginHorizontal: deviceBasedDynamicDimension(15, true, 1),
    textAlign: "left"
  },
  startsIn: {
    color: "grey",
    paddingRight: 3
  },
  eventContainer: {
    backgroundColor: "white",
    borderWidth: 1.3,
    borderColor: COLORS.yellow,
    marginHorizontal: deviceBasedDynamicDimension(15, true, 1),
    marginVertical: deviceBasedDynamicDimension(5, true, 1),
    padding: deviceBasedDynamicDimension(5, true, 1),
    borderRadius: deviceBasedDynamicDimension(10, true, 1),
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 0.1,
    elevation: 5,
  },
  eventTitleTxt: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: "bold",
    paddingVertical: deviceBasedDynamicDimension(5, true, 1),
    paddingHorizontal: deviceBasedDynamicDimension(8, true, 1),
  },
  textAlign: {
    textAlign: "left"
  },
  eventDesctxt: {
    fontSize: 14,
    color: "grey",
    fontWeight: "600",
    paddingHorizontal: deviceBasedDynamicDimension(10, true, 1),
  },
  warnText: {
    fontSize: 12,
    color: COLORS.red,
  },
  scheduleLiveEventTxt: {
    fontWeight: "bold",
    fontSize: 16,

  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    height: 160,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: '#FFC925',
    borderWidth: .5
  },
  arrow_ar: {
    transform: [{ rotate: "180deg" }],
  },
});
// Customizable Area End
