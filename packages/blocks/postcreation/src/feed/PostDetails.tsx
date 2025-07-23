import React from "react";

// Customizable Area Start
import scale, { verticalScale } from "../../../../components/src/Scale";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import Video from 'react-native-video';
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
const { height, width } = Dimensions.get('window');
import { VolumeButton } from './VolumButton';
import Icon from "react-native-vector-icons/AntDesign";
import * as Progress from 'react-native-progress';
import CustomButton from "../../../../components/src/Custombutton";
// Customizable Area End

import PostCreationController from "./PostCreationController";
import { Props } from "./PostCreationCommonController";
import { translate } from "../../../../components/src/i18n/translate";
import { RightArrowfull } from "./assets";
import { getStorageData } from "../../../../framework/src/Utilities";
import { rightArrow } from "../../../helpcentre/src/assets";
export default class PostDetails extends PostCreationController {
  constructor(props: Props) {
    super(props);
    //@ts-ignore

  }
  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language })
    this.props.navigation.addListener('focus', () => {
      this.setState({
        paused: false
      })
    })
  }

  render() {
    // Customizable Area Start
    // Customizable Area End
    return (
      <SafeAreaView style={styles.container}>
        {/* Customizable Area Start */}
        <View style={styles.bodyContent}>
        <View style={{flex:1}}>
                <View style={styles.headerVdo}>
                  {/* <View style={styles.progressbar}>
                    <Progress.Bar progress={this.state.progress} width={screenWidth - Scale(40)} unfilledColor={"white"} color={"#FFC925"} borderWidth={0} />
                  </View> */}
                  <TouchableOpacity testID="gobaack"
                    style={{ padding: 10 }}
                    onPress={() => {
                      this.props.navigation.goBack()
                      this.setState({
                        mediadetails: "",
                      })
                    }
                    }>
                    <Icon
                      name={this.state.language == 'ar' ? "arrowright" : "arrowleft"}
                      size={30}
                      style={styles.crossBtn}
                      color="white"
                    />
                  </TouchableOpacity>


                </View>
                <Video
                  ref={this.videoRef}
                  fullscreenAutorotate={true}
                  source={{ uri: this.state.mediadetails?.uri }}
                  // controls={true}
                  // onProgress={this.handleOnProgress}
                  // autoPlay={true}
                  repeat={true}
                  resizeMode={'contain'}
                  muted={this.state.isMute}
                  style={{ width: screenWidth, height: screenHeight, flex: 1 }}
                  playInBackground={false}
                  paused={this.state.paused}
                  // controls={true}
                //  ignoreSilentSwitch={'ignore'}
                // onLoadStart={onLoadStart}
                //   onLoad={onLoad}
                // onBuffer={videoBuffer}
                />

                <View style={styles.footerbuttons}>
                  <CustomButton testID="nextBtn" title={translate("next")} onPress={() => { this.props.navigation.navigate("Postsubmit",{mediadetails:this.state.mediadetails,bucketDetails:this.state.bucketDetails,poster:this.state.resultPoster,audioData: this.props?.route?.params?.audioData })
                      this.setState({ paused: true })}} />
                </View>
              </View>


        </View>

        {/* Customizable Area End */}
      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  bodyContent: {
    flex: 1,
    height: screenHeight,
    flexDirection: "column",
    backgroundColor: "black",
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
  },
  pickImage: {
    width: screenWidth,
    height: screenWidth,

  },
  textStyleTitle: {
    fontSize: scale(18.7),
    marginStart: scale(17.7),
    marginTop: verticalScale(12.7)
  },
  headerTxt: { fontSize: scale(16), fontWeight: "bold" },
  crossBtn: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", position: "absolute",
    zIndex: 1000,
    top: 0,
    width: "100%"
  },
  headerVdo: {
    position: "absolute",
    zIndex: 1000,
    top: 3,
    width: "100%"
  },
  footerbuttons: {
    paddingHorizontal: scale(20),
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    zIndex: 1000,
    bottom: 60,
    width: "100%"
  },
  progressbar: {
    marginHorizontal: scale(20),
  },
  textStylePrice: {
    fontSize: scale(18.2),
    marginStart: scale(17.7),
    marginTop: verticalScale(8.7)
  },

  row: {
    flexDirection: "row",
    height: scale(37.7),
    alignItems: "center",
    marginTop: verticalScale(14),
    paddingStart: scale(17.7)
  },

  viewEditDelete: {
    alignItems: "center",
    alignSelf: "center",
    top: 0,
    right: 0,
    position: "absolute",
    justifyContent: "flex-end",
    marginEnd: scale(17)
  },

  textActive: {
    alignSelf: "flex-start",
    paddingStart: scale(15),
    paddingEnd: scale(15),
    paddingTop: verticalScale(2),
    paddingBottom: verticalScale(2),
    borderRadius: 10,
    fontSize: scale(10.7),
    marginStart: scale(7),
    marginEnd: scale(7)
  },

  textPublish: {
    fontSize: scale(14.2)
  },

  textDescriptionTitle: {
    fontSize: scale(20),
    marginStart: scale(17.7),
    marginTop: verticalScale(5),
    fontWeight: "bold"
  },

  textDescription: {
    fontSize: scale(16),
    marginStart: scale(16.7),
    marginTop: verticalScale(8),
    textAlign: "left"
  },

  textPostId: {
    fontSize: scale(16.2),
    marginLeft: scale(16.7),
    marginVertical: verticalScale(5)
  },

  ButtonConatiner: {
    position: "absolute",
    bottom: verticalScale(14.3),
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    height: scale(72),
    width: scale(414),
    alignContent: "center"
  },

  InnerConatiner: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: verticalScale(14.3),
    marginHorizontal: scale(16.3)
  },

  customTxtStyle: {
    alignSelf: "center",
    fontSize: scale(16.5)
  },

  customTxtStyleClose: {
    alignSelf: "center",
    fontSize: scale(16.5)
  },

  buttonCustom: {
    width: scale(182.3),
    height: scale(43.3),
    borderRadius: 22.1,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonCustomClose: {
    width: scale(182.3),
    height: scale(43.3),
    borderRadius: 22.1,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  userConatiner: {
    height: verticalScale(66),
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    marginTop: verticalScale(13)
  },

  userProfileName: {
    flexDirection: "row",
    marginTop: verticalScale(14),
    alignItems: "center"
  },

  userImagesIcon: {
    width: scale(37.7),
    height: scale(38),
    borderRadius: scale(18.7)
  },

  userIcon: {
    width: scale(20),
    height: scale(24),
    alignSelf: "center",
    marginTop: verticalScale(7)
  },

  userName: {
    fontSize: scale(14.2),
    textAlign: "left"
  },

  userMemberShip: {
    fontSize: scale(10.7),
    textAlign: "left"
  },

  offerPrice: {
    marginBottom: verticalScale(12),
    marginTop: verticalScale(28),
    fontSize: scale(16.7)
  },

  buttonCustomSend: {
    width: scale(185.7),
    height: scale(43.3),
    borderRadius: 22.1,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1
  },

  containerBoxStyle: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: verticalScale(10)
  }
});
// Customizable Area End
