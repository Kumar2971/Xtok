import React from "react";

// Customizable Area Start
import Scale, { verticalScale } from "../../../../components/src/Scale";

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  TextInput,
  Keyboard,
  BackHandler
} from "react-native";
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
const { height, width } = Dimensions.get("window");
import {
  timeRing,
  ArrowLeft,
  Schedule,
  ArrowRight
} from "../feed/assets";
import {translate} from '../../../../components/src/i18n/translate'
import DateTimePicker , {DateTimePickerAndroid }from '@react-native-community/datetimepicker';
// Customizable Area End

import PostCreationController from "./PostCreationController";
import { Props } from "./PostCreationCommonController";
import moment from "moment";

export default class Setschedule extends PostCreationController {
  constructor(props: Props) {
    super(props);

  }
  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    const params =  this.props.route?.params;
      this.setState({
        setSchedule:params?.setSchedule,
        rawDate: params?.rawDate,
      })
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      this.props.navigation.addListener('gestureEnd', this.handleBackButtonClick);
    }

  componentWillUnmount=async()=> {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.props.navigation.addListener('gestureEnd', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    const params =  this.props.route?.params;

    this.props.navigation.navigate("Postsubmit", {
      setSchedule: this.state.setSchedule,
      rawDate: this.state.rawDate,
      mediadetails: params?.mediadetails,
      poster:params?.poster,
      description: params?.description
    });

  return true;
  }
  // Customizable Area End
  render() {
    // Customizable Area Start

    // Customizable Area End
    return (
      <SafeAreaView style={styles.container}>
        {/* Customizable Area Start */}
        <View style={{ paddingTop:16,   width: "100%" }}>
          <TouchableOpacity
            testID="goBack"
            onPress={() => {
              const params =  this.props.route?.params;
              this.props.navigation.navigate("Postsubmit", {
                setSchedule: this.state.setSchedule,
                rawDate: this.state.rawDate,
                mediadetails: params?.mediadetails,
                poster:params?.poster,
                description: params?.description
              });
            }}
          >
            <View
              style={{
                //display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image source={this.state.language == 'ar' ? ArrowRight:ArrowLeft} style={styles.detailIcon} />
              <Text style={{ fontSize: Scale(18), fontWeight: "bold",color:"#000000" }}>
                {translate("schedule")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
       <View style={[styles.bodyContent]}>
          {/* here starts schedule picker */ }
          <View style={{paddingHorizontal:Scale(15), marginTop:Scale(10)}}>
            <Text style={styles.dateTitle}>{translate("select_Date")}</Text>
            <View style={styles.dateInputContainer}>
            <Image
              source={Schedule}
              style={[styles.detailIcon, { marginRight: Scale(15) }]}
            />

            <TextInput
            testID="textInput"
            onTouchStart={()=>this.setState({show:true})}
            onTouchEnd={()=> Keyboard.dismiss()}
            contextMenuHidden={true}
            editable={true}
            value={this.state.scheduleDateValue}
            style={[styles.dateInput,this.state.language==="ar" && styles.dateInput_Ar]} placeholder={moment().format('MM/DD/YYYY')}></TextInput>


            </View>
          </View>

          <View style={{paddingHorizontal:Scale(15), marginTop:Scale(10)}}>
            <Text style={styles.dateTitle}>{translate("select_Time")}</Text>
            <View style={styles.dateInputContainer}>
            <Image
              source={timeRing}
              style={[styles.detailIcon, { marginRight: Scale(15) }]}
            />
            <TextInput
            testID="hoursTextInput"
            onTouchStart={()=>this.setState({show:true})}
            onTouchEnd={()=> Keyboard.dismiss()}
            contextMenuHidden={true}
            value={this.state.scheduleHourValue}
            style={styles.timeInput} placeholder={'00'}/>
            <Text style={styles.timeSeperator}>
              :
            </Text>
            <TextInput
            testID="minuteTextInput"
            onTouchStart={()=>this.setState({show:true})}
            onTouchEnd={()=> Keyboard.dismiss()}
            contextMenuHidden={true}
            value={this.state.scheduleMinuteValue}
            style={styles.timeInput} placeholder={'00'}/>

            <View style={styles.timeOfDay}>
              <TouchableOpacity testID="AMBtn" disabled style={[styles.meridiemBtn,styles.leftRadiusMeridiemBtn ,
                this.state.meridiem === 'AM' && styles.focusedMeridiemBtn]
              }
              onPress={()=>this.handleChangeMeridian('AM')}
              >
                <Text>
                  {translate("AM")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
              testID="PMBtn"
              disabled
              style={[styles.meridiemBtn ,styles.rightRadiusMeridiemBtn,
                this.state.meridiem === 'PM' && styles.focusedMeridiemBtn]}
                onPress={()=>this.handleChangeMeridian('PM')}
                >
                <Text>
                  {translate("PM")}
                </Text>
              </TouchableOpacity>
            </View>
            </View>

            { this.state.show && Platform.OS ==='android' && (


              DateTimePickerAndroid.open({
                testID:"datetimAndroidId",
                mode: 'date',
                value: new Date(),
                minimumDate: new Date(),
                onChange: (event, newDate) => {
                  if (newDate) {
                    const newDateTimeUTC = moment(newDate).utc().format('ddd, DD MMM YYYY hh:mm:ss')
                    this.setState({
                      show:false,
                      isScheduled:true,
                      setSchedule:moment(newDateTimeUTC).format('ddd, DD MMM YYYY hh:mm:ss'),
                      scheduleDateValue:moment(newDate).format('MM/DD/YYYY'),
                      scheduleHourValue:moment(newDate).format('hh'),
                      scheduleMinuteValue:moment(newDate).format('mm'),
                      meridiem:moment(newDate).format('A'),
                      rawDate:newDate,
                      showTime:true
                    })
                    DateTimePickerAndroid.open({
                      mode: 'time',
                      value: newDate,
                      is24Hour: false,
                      minimumDate:new Date(),
                      onChange: (_, newDateTime) => {
                        if (newDateTime) {
                          const timeFormatted = moment(newDateTime).format('HH:mm:ss')
                          const theTimeINeedToSplit = this.state?.setSchedule?.split(moment().format("YYYY")+" ")[1]
                          const dateOnly=this.state?.setSchedule?.split(theTimeINeedToSplit)[0]
                          const scheduleWithUpdatedTime = dateOnly + timeFormatted
                          const newDateTimeUTC = moment(newDateTime).utc().format('ddd, DD MMM YYYY hh:mm:ss')
                          this.setState({
                            show:false,
                            isScheduled:true,
                            setSchedule:scheduleWithUpdatedTime,
                            scheduleHourValue:moment(newDateTime).format('hh'),
                            scheduleMinuteValue:moment(newDateTime).format('mm'),
                            meridiem:moment(newDateTime).format('A'),
                            readyToShow:true
                          })
                        }
                      }
                    })
                  }
                },
              })
              )
          }

          {
            this.state.show && Platform.OS ==='ios' && (
              <DateTimePicker
              testID="DateTimePickrID"
              value={new Date(this.state.rawDate)}
              minimumDate={new Date()} 
                mode={'date'}
                display="default"
                style={{
                  height:300,
                  width:400,
                }}

                onChange={
                  (_, newDateTime) => {
                    const newDateTimeUTC = moment(newDateTime).utc().format('ddd, DD MMM YYYY hh:mm:ss')
                    this.setState({
                            show:false,
                            isScheduled:true,
                            setSchedule:moment(newDateTimeUTC).format('ddd, DD MMM YYYY hh:mm:ss'),
                            scheduleDateValue:moment(newDateTime).format('MM/DD/YYYY'),
                            scheduleHourValue:moment(newDateTime).format('hh'),
                            scheduleMinuteValue:moment(newDateTime).format('mm'),
                            meridiem:moment(newDateTime).format('A'),
                            rawDate:newDateTime,
                            showTime:true
                          })
                  }
                }
              />
            )
          }

          {
            this.state.showTime && Platform.OS ==='ios' && (
              <DateTimePicker
               testID="TimePickrID"
                value={this.state.rawTimeSelected}
                mode={'time'}
                minimumDate={this.state.rawDate <= moment().toDate() ? moment().toDate() : new Date(3000,1,1)}
                display="spinner"
                style={{
                  height:300,
                  width:400,
                }}
                onChange={
                  (_, newDateTime) => {
                    const setSchedule = this.state?.setSchedule;
                    const timeFormatted = moment(newDateTime).format('HH:mm:ss')
                    const theTimeINeedToSplit = setSchedule?.split(moment().format("YYYY")+" ")[1]
                    const dateOnly=setSchedule?.split(theTimeINeedToSplit)[0]
                    const scheduleWithUpdatedTime = dateOnly + timeFormatted

                          this.setState({
                            rawTimeSelected:newDateTime as Date,
                            isScheduled:true,
                            setSchedule:scheduleWithUpdatedTime,
                            scheduleHourValue:moment(newDateTime).format('hh'),
                            scheduleMinuteValue:moment(newDateTime).format('mm'),
                            meridiem:moment(newDateTime).format('A'),
                            readyToShow:true,

                      })
                  }
                }
              />
            )
          }


          </View>
          {
            this.state.readyToShow && (
              <TouchableOpacity
              testID="postSubmitBtn"
              onPress={() => {
                const params = this.props.route?.params;
                this.props.navigation.navigate("Postsubmit", {
                  setSchedule: this.state.setSchedule,
                  rawDate: this.state.rawDate,
                  mediadetails: params?.mediadetails,
                  poster:params?.poster,
                  description: params?.description
                });
              }}
              style={[styles.item,styles.button]}
              >
                <Text style={styles.title}>
                  {translate("save")}
                </Text>
              </TouchableOpacity>
            )
          }

          {/* here ends is schedule picker */}
        </View>

        {/* Customizable Area End */}
      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

  },
  item: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginVertical:Scale(5)
  },
  button: {
    marginTop: Scale(30),
    width: Scale(180),
    height: Scale(45),
    backgroundColor: "#FACC1E",
    borderRadius: Scale(50),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  title: {
    fontSize: Scale(16),
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: "left",
    marginVertical: 8,
    marginHorizontal:14
  },
  dateTitle:{
    fontSize:Scale(18),
    color:"#000000",
    marginLeft:Scale(12),
    marginTop: Scale(10),
    textAlign:"left",
  },
  dateInputContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    marginTop:Scale(20),
  },
  dateInput:{
    flex:1,
    fontSize:Scale(18),
    color:"#000000",
    borderColor:'#FFC924',
    borderWidth:1,
    borderRadius:7,
    padding:4,
  },
  dateInput_Ar: {
    textAlign:"right"
  },
  timeInput:{
    width:Scale(40),
    textAlign:"center",
    fontSize:Scale(18),
    color:"#000000",
    borderColor:'#FFC924',
    borderWidth:1,
    borderRadius:7,
    padding:4,
  },
  timeOfDay:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    marginLeft:Scale(10),
  },
  meridiemBtn:{
    width:Scale(40),
    height:Scale(40),
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
    borderColor:'#A9A9A9',
    borderTopWidth:1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderLeftWidth:1,
  },
  leftRadiusMeridiemBtn:{
    borderTopLeftRadius:Scale(7),
    borderBottomLeftRadius:Scale(7),
  },
  rightRadiusMeridiemBtn:{
    borderTopRightRadius:Scale(7),
    borderBottomRightRadius:Scale(7),
  },
  focusedMeridiemBtn:{
    backgroundColor:"#FFC924",
    color:"#FFFFFF",
  },
  timeSeperator:{
    fontSize:Scale(18),
    color:"#000000",
    marginHorizontal:Scale(10),
  },
  bodyContent: {
    flex: 1,
    height: screenHeight,
    flexDirection: "column",
    //s backgroundColor: "black",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
   // marginTop: 50,
  },
  headerTxt: {
    fontSize: Scale(18),
    fontWeight: "bold",
    marginLeft: Scale(10),
    marginBottom: Scale(5),
  },
  headerTxtsub: { fontSize: Scale(14), marginLeft: 10 },
  crossBtn: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    zIndex: 1000,
    top: 0,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    height: Scale(37.7),
    alignItems: "center",
    marginTop: verticalScale(14),
    paddingStart: Scale(17.7),
  },
  detailIcon: {
    width: Scale(30),
    height: Scale(30),
    marginHorizontal: Scale(15),
    resizeMode: "contain",
  },
});
// Customizable Area End
