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
  BackHandler,
  Platform
} from "react-native";
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
const { height, width } = Dimensions.get("window");
import { ArrowLeft, ArrowRight } from "../feed/assets";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
export const configJSON = require("./config");
import {translate} from "../../../../components/src/i18n/translate";

import PostCreationController from "./SelectLocationController";
import { Props } from "./PostCreationCommonController";
import { imgSearch } from "../../../comments/src/assets";
// Customizable Area End

export default class SelectLocation extends PostCreationController {
  constructor(props: Props) {
    super(props);
  }
  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();



    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.props.navigation.addListener('gestureEnd', this.handleBackButtonClick);
  }
  componentWillUnmount = async () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.props.navigation.addListener('gestureEnd', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    
    this.props.navigation.navigate("Postsubmit", {
      location: this.state.location,
      latLong: this.state.latLong,
      mediadetails: this.props.route?.params?.mediadetails,
      poster:this.props.route?.params?.poster,
      description: this.props.route?.params?.description
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
        <View
          style={{
            paddingTop: 16,

            width: "100%",
          }}
        >
          <TouchableOpacity
            testID="goBack"
            onPress={() => {
              this.props.navigation.navigate("Postsubmit", {
                location: this.state.location,
                mediadetails: this.props.route?.params?.mediadetails,
    poster:this.props.route?.params?.poster,
    description: this.props.route?.params?.description
              });
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image source={this.state.language == 'ar' ? ArrowRight : ArrowLeft} style={styles.detailIcon} />
              <Text style={{ fontSize: scale(18), fontWeight: "bold", color: "#000000", }}>
                {translate("setLocation")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.mainContainer}>
          <View style={[styles.searchContainer, this.state.language==="ar" && styles.textInputContainer, Platform.OS==="ios" && styles.searchContainer_Ar]}>
            <Image
              style={styles.searchIcon}
              source={imgSearch}
            />
            <GooglePlacesAutocomplete
              styles={{ marginTop: 50,textInput:styles.searchText,row: this.state.language==="ar" && styles.textInputContainer }}
              onPress={(data, details = null) => {
                const latLongVal = {latitude:details?.geometry?.location?.lat,longitude:details?.geometry?.location?.lng};
                this.setState({ location: data,latLong:latLongVal });
                this.props.navigation.navigate("Postsubmit", {
                  location: data,
                  latLong: latLongVal,
                  mediadetails: this.props.route?.params?.mediadetails,
    poster:this.props.route?.params?.poster,
    description: this.props.route?.params?.description
                })
              }}
              placeholder={translate("type_an_address")}
              fetchDetails
              query={{ key: configJSON.autocompleteAPIKey }}
            /></View>
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
    padding: 16
  },
  searchContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-start'
    , backgroundColor: 'white',
    paddingHorizontal: scale(10),
  },
  searchContainer_Ar: {
    marginHorizontal:scale(20),
  },
  searchText: {
    textAlign: "left",
  },
  mainContainer: {
    marginTop: scale(30),
    flex: 1
  },
  bodyContent: {
    flex: 1,
    height: screenHeight,
    flexDirection: "column",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // marginTop: 50,
  },
  pickImage: {
    width: screenWidth,
    height: screenWidth,
  },
  textStyleTitle: {
    fontSize: scale(18.7),
    marginStart: scale(17.7),
    marginTop: verticalScale(12.7),
  },
  headerTxt: {
    fontSize: scale(16),
    marginLeft: scale(5),
  },

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
  textStylePrice: {
    fontSize: scale(18.2),
    marginStart: scale(17.7),
    marginTop: verticalScale(8.7),
  },

  row: {
    flexDirection: "row",
    height: scale(37.7),
    alignItems: "center",
    marginTop: verticalScale(14),
    paddingStart: scale(17.7),
  },

  viewEditDelete: {
    alignItems: "center",
    alignSelf: "center",
    top: 0,
    right: 0,
    position: "absolute",
    justifyContent: "flex-end",
    marginEnd: scale(17),
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
    marginEnd: scale(7),
  },

  textPublish: {
    fontSize: scale(14.2),
  },

  textDescriptionTitle: {
    fontSize: scale(20),
    marginStart: scale(17.7),
    marginTop: verticalScale(5),
    fontWeight: "bold",
  },

  textDescription: {
    fontSize: scale(16),
    marginStart: scale(16.7),
    marginTop: verticalScale(8),
    textAlign: "left",
    // lineHeight: scale(20.7),
  },

  textPostId: {
    fontSize: scale(16.2),
    marginLeft: scale(16.7),
    marginVertical: verticalScale(5),
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
    alignContent: "center",
  },

  InnerConatiner: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: verticalScale(14.3),
    marginHorizontal: scale(16.3),
  },

  customTxtStyle: {
    alignSelf: "center",
    fontSize: scale(16.5),
  },

  customTxtStyleClose: {
    alignSelf: "center",
    fontSize: scale(16.5),
  },

  buttonCustom: {
    width: scale(182.3),
    height: scale(43.3),
    borderRadius: 22.1,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonCustomClose: {
    width: scale(182.3),
    height: scale(43.3),
    borderRadius: 22.1,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  userConatiner: {
    height: verticalScale(66),
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    marginTop: verticalScale(13),
  },

  userProfileName: {
    flexDirection: "row",
    marginTop: verticalScale(14),
    alignItems: "center",
  },

  userImagesIcon: {
    width: scale(37.7),
    height: scale(38),
    borderRadius: scale(18.7),
  },

  userIcon: {
    width: scale(20),
    height: scale(24),
    alignSelf: "center",
    marginTop: verticalScale(7),
  },

  userName: {
    fontSize: scale(14.2),
    textAlign: "left",
  },

  userMemberShip: {
    fontSize: scale(10.7),
    textAlign: "left",
  },

  offerPrice: {
    marginBottom: verticalScale(12),
    marginTop: verticalScale(28),
    fontSize: scale(16.7),
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
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  containerBoxStyle: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: verticalScale(10),
  },
  detailIcon: {
    width: scale(30),
    height: scale(30),
    marginHorizontal: scale(15),
    resizeMode: "contain",
  },
  searchIcon: {
    top: scale(15),
    right: -0,
    width: scale(15),
    height: scale(15),
    tintColor: "gray",
  },
  textInputContainer: {
    flexDirection: 'row-reverse',
  }
});
// Customizable Area End
