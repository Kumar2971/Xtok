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
  ActivityIndicator,
  BackHandler
} from "react-native";
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
const { height, width } = Dimensions.get("window");
import {
  mainIcon,
  yellowcircle,
  ArrowLeft,
  ArrowRight,
} from "../feed/assets";
// Customizable Area End

import PostCreationController from "./PostCreationController";
import { Props } from "./PostCreationCommonController";
import { translate } from "../../../../components/src/i18n/translate";

export default class Setvisibility extends PostCreationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start	
    // Customizable Area End
  }
  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
      this.setState({
        setvisibility:this.props.route?.params?.setvisibility,
      })
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      this.props.navigation.addListener('gestureEnd', this.handleBackButtonClick);

       this.props.navigation.addListener(
        'willBlur',
        (payload:any) => {
          console.debug('didBlur', payload);
        }
      );
    }

  componentWillUnmount=async()=> {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.props.navigation.addListener('gestureEnd', this.handleBackButtonClick);
  }



  // Remove the listener when you are done


handleBackButtonClick = () => {
  const params = this.props.route?.params;
  this.props.navigation.navigate("Postsubmit", {
    setvisibility: this.state.setvisibility,
    mediadetails: params?.mediadetails,
    poster:params?.poster,
    description: params?.description
  });

 return true;
}

  renderItem = () => {

    if (this.state.allCategories != "") {
      return (
        <View style={{ margin: 10 }}>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              margin: 5,
            }}
          >
            <TouchableOpacity
            testID="visibilityBtn1"
              onPress={() => {
                this.setState({
                  setvisibility: this.state.allCategories.visbility_settings.Public,
                });
              }}
            >
              {this.state.setvisibility == 0 ? (
                <Image source={mainIcon} style={{ width: 30, height: 30 }} />
              ) : (
                <Image
                  source={yellowcircle}
                  style={{ width: 30, height: 30 }}
                />
              )}
            </TouchableOpacity>
            <View style={{ margin: 10 }}>
              <Text style={styles.headerTxt}>{translate("public")}</Text>
              <Text style={styles.headerTxtsub}>
                {translate("Anyone_can_search_for_and_view")}
              </Text>
            </View>
          </View>


          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              margin: 5,
            }}
          >
            <TouchableOpacity
            testID="visibilityBtn2"
              onPress={() => {
                this.setState({
                  setvisibility: this.state.allCategories.visbility_settings
                    .Private,
                });
              }}
            >
              {this.state.setvisibility == 2 ? (
                <Image source={mainIcon} style={{ width: 30, height: 30 }} />
              ) : (
                <Image
                  source={yellowcircle}
                  style={{ width: 30, height: 30 }}
                />
              )}
            </TouchableOpacity>
            <View style={{ margin: 10 }}>
              <Text style={styles.headerTxt}>{translate("private")}</Text>
              <Text style={styles.headerTxtsub}>
                {translate("Only_people_who_follow_you_choose_can_view")}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  };
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
              const params = this.props.route?.params;
              this.props.navigation.navigate("Postsubmit", {
                setvisibility: this.state.setvisibility,
                mediadetails: params?.mediadetails,
                poster:params?.poster,
                description: params?.description
              });
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image source={this.state.language =='ar' ? ArrowRight : ArrowLeft} style={styles.detailIcon} />
              <Text style={{ fontSize: scale(18), fontWeight: "bold",color:"#000000" }}>
               {translate("Set_visibility")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {
          (this.state.isLoading && this.props.route?.params) ? <ActivityIndicator/> : (
            <View style={styles.bodyContent}>{this.renderItem()}</View>
          )
        }
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

  bodyContent: {
    flex: 1,
    height: screenHeight,
    flexDirection: "column",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerTxt: {
    fontSize: scale(18),
    fontWeight: "bold",
    marginLeft: scale(10),
    marginBottom: scale(5),
    textAlign:"left"
  },
  headerTxtsub: { fontSize: scale(14), marginLeft: 10 },
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
    height: scale(37.7),
    alignItems: "center",
    marginTop: verticalScale(14),
    paddingStart: scale(17.7),
  },

  detailIcon: {
    width: scale(30),
    height: scale(30),
    marginHorizontal: scale(15),
    resizeMode: "contain",
  },
});
// Customizable Area End
