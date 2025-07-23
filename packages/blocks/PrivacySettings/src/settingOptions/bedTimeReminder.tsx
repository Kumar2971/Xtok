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
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import {
  StartIcon,
  EndIcon,backArrow,SwitchOff,SwitchOn,imgLeftArrow
} from '../assets'
import ReactNativeModal from "react-native-modal";
import Icon from "react-native-vector-icons/Entypo";
import { getStorageData } from "../../../../framework/src/Utilities";
import { translate } from "../../../../components/src/i18n/translate";
import DateTimePicker , {DateTimePickerAndroid }from '@react-native-community/datetimepicker';
// Customizable Area End
import settingOptionsCommonController, { Props } from "./settingOptionsCommonController";
import moment from "moment";
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
export default class BedTimeReminder extends settingOptionsCommonController {
  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    this.getBedTimeReminderSettings()
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language });
  this.props.navigation.addListener('focus', async () => {
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language });
    this.getBedTimeReminderSettings()
})
}
  // Customizable Area End
  constructor(props: Props) {
    super(props);
  }

  topHeaderSettings = () => {
    return (
      <View style={[styles.headercontainer, styles.divider]}>
        <TouchableOpacity testID="manageAcc" onPress={() => this.props.navigation.navigate('ManageAccount')}>
          <Image source={this.state.language=='ar' ? backArrow : imgLeftArrow} style={this.state.language=='ar' ? styles.backarrow_style : styles.backarrow_style_en} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{translate("Remind_me_bedtime")}</Text>
        <View/>
      </View>
    );
  };

  item = () => {
  const bedTimeStartFirstChar = this.state?.bedTimeStart?.split(':')[0].substring(0,this.state?.bedTimeStart?.split(':')[0].length-1)
  const bedTimeStartLastChar = this.state?.bedTimeStart?.split(':')[0].substring(1)


  const handleAlterBedTimeStart = () =>{
    if(+bedTimeStartFirstChar < 12){
      const bedTimeStartLastCharPlusOne = +bedTimeStartLastChar+1
      return `${bedTimeStartFirstChar+bedTimeStartLastCharPlusOne.toString()}`
    }else {
      return `${(bedTimeStartFirstChar+1).toString()+bedTimeStartLastChar}`
    }
  }

  console.log(moment().set('hour',+handleAlterBedTimeStart()).set('minute',+this.state?.bedTimeStart?.split(':')[1]).toDate())
    return (
      <View style={{paddingHorizontal:Scale(15)}}>
          <TouchableOpacity testID="hanleTime" style={styles.item}
            onPress={() => this.handleToggleBedTimeReminder()}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.title]}>{translate("Remind_me_bedtime")}</Text>
            </View>
            <View>
              {this.state.setBedTimeReminder ?
               <Image source={SwitchOn} style={styles.icon} /> :
               <Image source={SwitchOff} style={styles.icon} />
              }
            </View>
          </TouchableOpacity>

          {
            this.state.setBedTimeReminder ? (
              <>
              <TouchableOpacity testID="toggleMD" style={styles.item}
              onPress={()=> this.toggleBedTimeStartModal()}
              >
                <View style={styles.item}>
                  <Image source={StartIcon} style={styles.pencilIcon}/>
                  <Text style={styles.title}>{translate("start_time")}</Text>
                </View>
                <Text>
                  {this.state.bedTimeStart === '' ? 'not set yet' : this.state.bedTimeStart}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity  testID="toggleMD2" style={styles.item}
              onPress={()=> this.toggleBedTimeEndModal()}
              >
                <View style={styles.item}>
                  <Image source={EndIcon} style={styles.pencilIcon}/>
                  <Text style={styles.title}>{translate("end_time")}</Text>
                </View>
                <Text>
                  {this.state.bedTimeEnd === '' ? 'not set yet' : this.state.bedTimeEnd}
                </Text>
              </TouchableOpacity>
              </>

            ):<></>
          }

          {
            ( Platform.OS === 'android') && (
                (this.state.bedTimeStartModalOpen ) && (
                  DateTimePickerAndroid.open({
                    mode: 'time',
                    is24Hour: false,
                    display: 'spinner',
                    value: new Date(),
                    positiveButton: {label:'Ok',textColor:'#ffc831'},
                    negativeButton: {label:'Cancel',textColor:'#888888'},
                    onChange: (event, newDate) => {
                      if(event.type ==='dismissed'){
                        this.setState({bedTimeStartModalOpen:false})
                      }else if(event.type ==='set'){

                        const startTime = moment(newDate).format('h:mm A')
                        this.setState({
                          bedTimeStart:startTime,
                          bedTimeStartModalOpen:false,
                        })
                      }
                    },
                  })
                ),

                (this.state.bedTimeEndModalOpen) && (
                  DateTimePickerAndroid.open({
                    mode: 'time',
                    is24Hour: false,
                    display: 'spinner',
                    value: new Date(),
                    positiveButton: {label:'Ok',textColor:'#ffc831'},
                    negativeButton: {label:'Cancel',textColor:'#888888'},
                    onChange: (event, newDate) => {
                      if(event.type ==='dismissed'){
                        this.setState({bedTimeEndModalOpen:false})
                      }else if(event.type ==='set'){
                        const endTime = moment(newDate).format('h:mm A')
                        this.setState({
                          bedTimeEnd:endTime,
                          bedTimeEndModalOpen:false,
                        })
                      }
                    },
                  })
                )
            )
          }

          {
             (Platform.OS === 'ios') && (
              (this.state.bedTimeStartModalOpen) && (
             <View style={{width: 400,height:250,alignItems:'center',justifyContent:'center',marginTop:50}}>      
            <DateTimePicker
            testID="DateIOS"
                mode= 'time'
                display= 'spinner'
                is24Hour
                value = {this.state.bedTimeStartDateRaw}
                style={{width: 320,height:550,flex:1}}
                positiveButton= {{label:'Ok',textColor:'#ffc831'}}
                negativeButton={{label:'Cancel',textColor:'#888888'}}
                onChange= {(event, newDate) => {
                  if(event.type ==='dismissed'){
                    this.setState({bedTimeStartModalOpen:false})
                  }else if(event.type ==='set'){
                    const startTime = moment(newDate).format('h:mm A')
                    console.log(startTime)
                    this.setState({
                      bedTimeStart:startTime,
                      bedTimeStartDateRaw: newDate as Date,
                    })
                  }
                }}
                />
                </View>
              )
            )
          }

          {
            (Platform.OS === 'ios') && (
              (this.state.bedTimeEndModalOpen) && (
                <View style={{width: 400,height:250,alignItems:'center',justifyContent:'center',marginTop:50}}>
                <DateTimePicker
                testID="DateIOS2"
                mode= 'time'
                display= 'spinner'
                is24Hour
                minimumDate={moment().set('hour',+handleAlterBedTimeStart()).set('minute',+this.state?.bedTimeStart?.split(':')[1]).toDate()}
                value = {this.state.bedTimeEndDateRaw}
                style={{width: 320,height:550,flex:1}}
                positiveButton= {{label:'Ok',textColor:'#ffc831'}}
                negativeButton={{label:'Cancel',textColor:'#888888'}}
                onChange= {(event, newDate) => {
                  if(event.type ==='dismissed'){
                    this.setState({bedTimeEndModalOpen:false})
                  }else if(event.type ==='set'){
                    const endTime = moment(newDate).format('h:mm A')
                    this.setState({
                      bedTimeEnd:endTime,
                      bedTimeEndDateRaw: newDate as Date,
                    })
                  }
                }}
                />
                </View>
              )
            )
          }

      {
        this.state.setBedTimeReminder && !this.state.isSaved && (
        <TouchableOpacity testID="updateTimer"
        onPress={()=>this.handleUpdateBedTimeReminder()}
        style={[styles.item,styles.button]}>
          <Text style={styles.title}>
          {translate("save")}
          </Text>
        </TouchableOpacity>
        )
      }


      </View>
    )
  }
  // Customizable Area Start
  // Customizable Area End
  render() {
    // Customizable Area Start

    // Customizable Area End
    return (
      <View style={styles.container}>
        <SafeAreaView>
          {/* Customizable Area Start */}
          {this.topHeaderSettings()}
          {
            this.state.isLoading ? <ActivityIndicator size="small" color="#ffc831" /> : this.item()
          }
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
    width:"100%",
    maxWidth: 650,
  },
  headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    paddingHorizontal: Scale(15),
    height: Scale(40),
    width: '100%',
  },
  headerText: {
    fontSize:Scale(18),
    fontWeight:'bold'
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

  icon: {
    width:Scale(35),
    height:Scale(35),
    resizeMode: "contain"
  },
  divider: {
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  item: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginVertical:Scale(5)
  },
  title: {
    fontSize: Scale(16),
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: "left",
    marginVertical: 8,
    marginHorizontal:14
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
  pencilIcon:{
    width:Scale(20),
    height:Scale(20),
    resizeMode: "contain",
    marginLeft:Scale(10)
  },
  report_continue_button:{
    color:'#000',
    fontWeight:'600',
  },
});
// Customizable Area End
