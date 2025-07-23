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
  Dimensions,
  Platform
} from "react-native";
import {backArrow,LeftArrowIcon,imgRightArrow,imgLeftArrow} from "../assets";
// Customizable Area End
import settingOptionsCommonController , { Props } from "./settingOptionsCommonController";
import { getStorageData } from "../../../../framework/src/Utilities";
import { translate } from "../../../../components/src/i18n/translate";
const { width } = Dimensions.get("window");
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
export default class YourActivity extends settingOptionsCommonController {
  // Customizable Area Start
  async componentDidMount () {

    const language = await getStorageData("SelectedLng");
    this.setState({language:language})
    this.props.navigation.addListener('focus',async () => {

    const language = await getStorageData("SelectedLng");
    this.setState({language:language})
      this.fetchAverageTimeSpent()
    })
    this.fetchAverageTimeSpent()
  }
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    // setNavigator(props.navigation)
  }

  topHeaderSettings = () => {
    console.log('language',this.state.language)
    return (
      <View style={[styles.headercontainer, styles.divider]}>
        <TouchableOpacity testID="manageAcc" onPress={() => this.props.navigation.navigate('ManageAccount')}>
          <Image source={this.state.language =='ar' ? imgRightArrow : imgLeftArrow} style={this.state.language =='ar' ? styles.backarrow_style : styles.backarrow_style_en} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{translate("your_Activity")}</Text>
      </View>
    );
  };

  item = () => {
    return (
      <View style={{paddingHorizontal:Scale(15)}}>
        <Text style={[styles.interactions,this.state.language=="ar"&&styles.leftText]}>{translate("interactions")}</Text>
        <TouchableOpacity style={styles.item}
        testID="likeBtn"
            onPress={this.navigateLikeActivity}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={styles.title}>{translate("Likes")}</Text>
            </View>
            <View>
               <Image source={this.state.language =='ar' ? backArrow : LeftArrowIcon} style={{width:this.state.language == "ar" ? Scale(18) : Scale(8), height:Scale(15),resizeMode: "contain"}} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}
        testID="commentBtn"
            onPress={this.navigateCommentsActivity}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={styles.title}>{translate("Comments")}</Text>
            </View>
            <View>
               <Image source={this.state.language =='ar' ? backArrow : LeftArrowIcon} style={{width:this.state.language == "ar" ? Scale(18) : Scale(8), height:Scale(15),resizeMode: "contain"}} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}
            testID="notIntrested"
            onPress={() => this.navigateNotInterestedActivity()}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={styles.title}>{translate("Not_interested")}</Text>
            </View>
            <View>
               <Image source={this.state.language =='ar' ? backArrow : LeftArrowIcon} style={{width:this.state.language == "ar" ? Scale(18) : Scale(8), height:Scale(15),resizeMode: "contain"}} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} testID="savedBtn"
            onPress={() => this.navigateSavedActivity()}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={styles.title}>{translate("saved")}</Text>
            </View>
            <View>
               <Image source={this.state.language =='ar' ? backArrow : LeftArrowIcon} style={{width:this.state.language == "ar" ? Scale(18) : Scale(8), height:Scale(15),resizeMode: "contain"}} />
            </View>
        </TouchableOpacity>
      </View>
    )
  }
  // Customizable Area Start
  minutesToHours=()=>{
    let minutes = this.state.averageTimeSpent
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return `${hours}h ${minutes}m`
  }
  // Customizable Area End
  render() {
    // Customizable Area Start
    console.log("asdiuahsdaiudhad",this.state.language)
    // Customizable Area End
    return (
      <View style={styles.container}>
        <SafeAreaView>
          {/* Customizable Area Start */}
          {this.topHeaderSettings()}
          <View style={[styles.header_container,styles.divider]}>
          <Text style={styles.timeSpentText}>{this.minutesToHours()}</Text>
            <Text style={styles.description_text}>{translate("average_time_spent_per_day_using_golavi")}</Text>
            <Text style={styles.description_text}>{translate("app_on_this_device_in_the_last_week")}</Text>
            </View>
            {this.item()}

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
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
  },
  headercontainer: {
    flexDirection: "row",
    alignItems:'center',
    paddingHorizontal: Scale(15),
    height: Scale(40),
    width: '100%',
  },
  headerText: {
    fontSize:Scale(18),
    fontWeight:'bold',
    width:screenWidth-Scale(60),
    textAlign:'center',
  },
  divider: {
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  backarrow_style: {
    width: Scale(20),
    height: Scale(18),
    resizeMode: "contain",
  },
  backarrow_style_en: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: "contain",
  },
  timeSpentText:{
    fontSize:Scale(48),
    fontWeight:'500',
    color:'#f7c839',
  },
  header_container:{
    marginTop:Scale(10),
    paddingBottom:Scale(30),
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:Scale(40),
  },
  description_text:{
    fontSize:Scale(16),
    fontWeight:'500',
    color:'#B7BBC0',
    marginTop: Scale(10),
    textAlign:"center",
  },
  interactions:{
    fontSize:Scale(16),
    fontWeight:'500',
    color:'#B7BBC0',
    marginTop:Scale(10)
  },
  item: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginVertical:Scale(10),
  },
  leftText:{
    textAlign:'left',
  },
  title: {
    fontSize: Scale(16),
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: "left",
    marginVertical: 8,
  },
});
// Customizable Area End
