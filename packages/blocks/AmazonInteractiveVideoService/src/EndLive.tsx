import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";

import scale from "../../../components/src/Scale";

import AlertModal from "../../../components/src/AlertModal";

import { Props } from "./LiveStreamingController";
import {
  rightarrow,
  cancelIcon,
  colorpaper,
  speaker,
  bin,
  left,
} from "../src/assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  screenHeight,
  screenWidth,
} from "./helpers/DynamicDimension";
import LiveStreamingController from "./LiveStreamingController";
import Video from "react-native-video";
let  displayHeight = Dimensions.get('window').height;
let  displayWidth = Dimensions.get('window').width;
import { translate } from "../../../components/src/i18n/translate";
import moment from "moment";
//@ts-ignore

// Customizable Area End
export default class EndLive extends LiveStreamingController {
  notifyMessage = [
    translate("welcome_text"),
    translate("notify"),
  ];
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderViewsFollowesGifters = () => {
    return (
      <View style={styles.viewsFollowerGifter}>
        {this.viewesGiftersFollowers.map((label: string,index : number) => (
          <View key={index}>
            <Text style={styles.replayTxt2}>{label}</Text>
            <Text style={styles.viewCount}>{this.getVeiwerFolloweGifterCount(label)}</Text>
          </View>
        ))}
      </View>
    );
  };

  arrowImage = () => {
    if(this.state.language == "ar" ){
      return left;
    }else{
      return rightarrow;
    }
  }

  convertToFiveMinuteFormat = (formattedDuration:any) => {
    const timeArray = formattedDuration.split(':');
    // Extract hours, minutes, and seconds
    const hours = parseInt(timeArray[0]);
    const minutes = parseInt(timeArray[1]);
    const seconds = parseInt(timeArray[2]);
    // Convert the time to minutes
    if(hours !== 0){
      return hours + " " +translate("hour")
    }else if(minutes !== 0){
      return minutes + " " +translate("min")
    }else{
      return seconds + "" + translate("sec")
    }
 }

  onPressCross = () => {
      this.handleNavigationOnEndLive()
  }

  replayText = () => {
    if(this.props.route.params?.recordingUrl != "" ){
      return translate("replay") 
    }else {
      return translate("NoRecordings")
    }
  }
  // Customizable Area End

  render() {
    const duration = this.state.endedStreamDetails.live_duration
    const duration1 = moment.duration({
      hours: duration.hours,
      minutes: duration.minutes,
      seconds: duration.seconds,
    });
  
    const formattedDuration = moment.utc(duration1.asMilliseconds()).format('HH:mm:ss');  
    const convertedTime = this.convertToFiveMinuteFormat(formattedDuration);  
    return (
      //  Customizable Area Start
      <SafeAreaView style={styles.container}>
        
        <KeyboardAwareScrollView scrollEnabled={false} style={styles.container}>
          <TouchableOpacity testID="crossIcon"
              onPress={()=>this.onPressCross() }
              style={styles.cancelIconBgnd}
            >
              <Image source={cancelIcon} style={styles.cancelIcon} />
            </TouchableOpacity>
         {!this.state.replayView ? <ScrollView
            style={styles.subContainer}
            bounces={false}
            contentContainerStyle={styles.contentContainer}
          >
            
            <Text style={styles.liveEndedTxt}>{translate("live_has_ended")}</Text>
            <Text style={[styles.replayTxt, styles.marginTop]}>
              {""}{`${translate("stream")} ${convertedTime}`}
            </Text>
            {/* <View style={[styles.ticketLiveCenter,styles.iosShadow]}>
              <Image source={speaker} style={styles.speakerIcon} />
              <Text style={styles.tiketLiveTxt}>
                Ticket LIVE center is live!
              </Text>
            </View> */}
            <View style={[styles.elevationContainer,styles.iosShadow]}>
              <Image source={colorpaper} style={styles.colorPaperImg} />
              <Text style={[styles.tiketLiveTxt, styles.textAlign]}>
                {translate("streamText")}
              </Text>
            </View>
            {this.renderViewsFollowesGifters()}
           
          </ScrollView>
          : <View style={{flex:1}}>
          <TouchableOpacity testID="crossIcon2"
              onPress={()=> this.setState({replayView:false})}
              style={styles.cancelIconBgnd}
            >
              <Image source={cancelIcon} style={styles.cancelIcon} />
            </TouchableOpacity>
            {this.state.videoLoading &&
            <ActivityIndicator
                animating
                color={"gray"}
                size="large"
                style={{ flex: 1, position:"absolute", top:"40%", left:"45%" }}
            />
        }
          <Video testID="VideoId" onError={()=> Alert.alert(`Error playing video!`)} onReadyForDisplay={()=> this.setState({videoLoading:false})} onLoadStart={()=> this.setState({videoLoading:true})} controls source={{uri: this.props.route.params.recordingUrl ?? ''}} resizeMode={'contain'} style={{marginTop:5,height:displayHeight-200,width:displayWidth}} />
          </View>}
        </KeyboardAwareScrollView>
      </SafeAreaView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: { flex: 1 ,backgroundColor: 'white'},
  subContainer: {
    flex: 1,
    backgroundColor: "white",
    height: screenHeight,
    width: screenWidth,
    
  },
  cancelIcon: { width: scale(25), height: scale(25)},
  cancelIconBgnd: { alignSelf: "flex-end", padding: scale(5) },
  contentContainer: { padding: scale(20) ,height:"100%", marginTop: -16,
  display:"flex"},
  liveEndedTxt: { color: "black", fontSize: 18, textAlign:"left",fontWeight:"500" },
  replayTxt: { color: "black", fontSize: 14, textAlign:"left" ,marginBottom:10},
  replayTxt2: { color: "black", fontSize: 14, textAlign:"left" ,marginBottom:10,fontWeight:"500"},
  marginTop: { marginTop: scale(5) },
  ticketLiveCenter: {
    backgroundColor: "white",
    flexDirection: "row",
    elevation: scale(5),
    padding: scale(10),
    marginVertical: scale(5),
    marginTop: scale(20),
  },
  iosShadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // borderRadius:8,
    marginBottom:10,
    padding:20
  },
  speakerIcon: { width: scale(25), height: scale(25), marginEnd: scale(10) },
  tiketLiveTxt: { color: "black", fontSize: scale(16) },
  textAlign: { textAlign: "center" },
  colorPaperImg: { width: scale(120), height: scale(120) },
  elevationContainer: {
    backgroundColor: "white",
    alignItems: "center",
    elevation: scale(5),
    padding: scale(10),
    marginVertical: scale(5),
  },
  replayContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingStart: scale(10),
  },
  arrowIcon: { width: scale(15), height: scale(15), resizeMode: "contain" },
  line: {
    width: "100%",
    backgroundColor: "#D8D8D8",
    height: 1,
    marginVertical: scale(5),
  },
  liveTime: { fontSize: 12, color: "gray" },
  arrowContainer: { padding: scale(10) },
  viewsFollowerGifter: {
    backgroundColor: "#FFFAEA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: scale(15),
    marginVertical: scale(5),
    // borderRadius:8,
  },
  viewCount: { 
    fontWeight: "700", 
    fontSize: scale(20), 
    marginTop: scale(5),
    textAlign: "left",
  },
});
// Customizable Area End
