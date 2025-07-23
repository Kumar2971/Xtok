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
  ActivityIndicator,
} from "react-native";
//@ts-ignore
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";


//@ts-ignore
import Scale from "../../../components/src/Scale";
import CustomButton from "../../../components/src/Custombutton";
import Video from 'react-native-video';
const { width } = Dimensions.get("window");
let screenWidth = Dimensions.get('window').width;
let  displayHeight = Dimensions.get('window').height;
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import LiveRecordingController, {
  Props,
} from "./LiveRecordingController";
import {
  calendar,
  imgRightArrow,
  left,
  timer,
  imgLeftArrow,
  imgCross,
} from "./assets";
import { COLORS } from "../../../framework/src/Globals";
import moment from "moment";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import { translate } from "../../../components/src/i18n/translate";

export default class LiveRecording extends LiveRecordingController {
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

  listHeaderComp = () => {
    return (
      <Text style={styles.titleText}>
        {this.state.recordList.length === 0 ? "" : "RECORDED"}
      </Text>
    )
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    const { navigation } = this.props;
    const { language } = this.state;
    const onPressLive = () => navigation.navigate("LiveFeedScheduling");
    // Merge Engine - render - Start

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerTitle}>
          <TouchableOpacity
          testID="goBack"
            onPress={onPressLive}
          >
            <Image
              source={imgLeftArrow}
              style={[styles.headerIcon_en, language == "ar" && { transform: [{ rotate: "180deg" }] }]}
              testID="leftBackBtn"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.LiveTxt}>{translate("Live_Recordings")}</Text>

        </View>
        <View style={styles.separator} />

        <>
          {!this.state.isModalVisible ?
            <FlatList
              testID="recordList"
              style={{ flex: 1 }}
              data={this.state.recordList}
              ListHeaderComponent={() => (
                this.listHeaderComp()
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
              refreshing={this.state.recordingLoading}
              onEndReached={this.onEndReachedLsit}
              onRefresh={this.onrefreshRecordList}
              ListEmptyComponent={() => {
                return <View style={styles.emptyView}>
                  <Text style={styles.emptyText}>
                    {translate('no_record_found')}
                  </Text>
                </View>
              }}
              onEndReachedThreshold={0.6}
              renderItem={({ item }: any) => {
                let datetime = item.created_at;
                let datetime2 = new Date(datetime);
                let datetimeisplay = moment(datetime2).format('Do MMMM  YYYY, h:mm:ss a');

                return (
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity testID="showVideoBtn" style={styles.eventContainer}
                      onPress={() => {
                        this.setState({ playpause: item.recording_link, isModalVisible: true })
                      }}
                    >
                      <Text style={styles.eventTitleTxt}>
                        {item.title}
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
                        <Text> {datetimeisplay}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                );
              }}
            /> : <View style={{ flex: 1 }}>
              <TouchableOpacity testID="crossIcon"
                onPress={() => this.setState({ isModalVisible: false })}
                style={styles.cancelIconBgnd}
              >
                <Image source={imgCross} style={styles.cancelIcon} resizeMode="contain" />
              </TouchableOpacity>
              <Video
                testID="VideoID"
                controls
                source={{ uri: this.state.playpause ?? '' }}
                resizeMode={'contain'}
                style={styles.Video}
                onLoad={() => this.setState({ onVideoLaod: false })}
                onLoadStart={() => this.setState({ onVideoLaod: true })}
              />
              {this.state.onVideoLaod && <ActivityIndicator size={25} color={"black"} style={styles.loaderStyle} />}
            </View>
          }
        </>

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
    paddingTop: Scale(15),
    width: '100%',
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
    width: screenWidth - Scale(40),
    textAlign: 'center'
  },
  separator: {
    borderWidth: 0.4,
    borderColor:"#B7BBC0",
    marginTop: Scale(10),
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
    flex: 0.9,
    backgroundColor: "#fff",
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },
  centeredView: {
    height: 330,
    padding: 10,
    marginBottom: 120,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 3,
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
    marginHorizontal: 10,
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
    fontWeight: "400",
  },
  closeIcon: {
    height: 25,
    width: 25,
  },
  modalHeader: {
    flexDirection: "row",
    marginHorizontal: 20,
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
  },
  button: {
    backgroundColor: COLORS.white,
    padding: 7,
    borderRadius: 4,
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
  },
  emptyView:{
    justifyContent:"center",
    alignItems:"center",
  },
  emptyText: {
    color: "grey",
    fontSize: 16,
    textAlign:"center"
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
    // shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 0.1,
    elevation: 5,
  },
  Video: {
    height:displayHeight-Scale(240),
    width:screenWidth
  },

  eventTitleTxt: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: "bold",
    paddingVertical: deviceBasedDynamicDimension(5, true, 1),
    paddingHorizontal: deviceBasedDynamicDimension(8, true, 1),
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
    // height: 160,
    width: width,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: '#FFC925',
    borderWidth: .5,
    alignSelf: "center",
  },
  cancelIconBgnd: { alignSelf: "flex-end", padding: Scale(10) },
  cancelIcon: { width: Scale(25), height: Scale(25), tintColor:"black" },
  loaderStyle:{
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    top:displayHeight/2.5,
    left:screenWidth/2
  }
});
// Customizable Area End
