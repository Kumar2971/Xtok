import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
  Dimensions,
  PixelRatio,
  FlatList,
} from "react-native";
import {
  responsiveWidth,
} from "react-native-responsive-dimensions";
import AntDesign from "react-native-vector-icons/AntDesign";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import { Button, SearchBar } from "react-native-elements";
import { translate } from "../../../components/src/i18n/translate";
//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
function isSameRatio(): boolean {
  return artBoardWidthOrg / artBoardHeightOrg < 1 && screenWidth / screenHeight < 1
}
let artBoardHeightOrg = 844;
let artBoardWidthOrg = 390;
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
let artBoardWidth = isSameRatio() ? artBoardWidthOrg : screenWidth;
let artBoardHeight = isSameRatio() ? artBoardHeightOrg : screenHeight;
let extraSpace = 0;
// Merge Engine - Artboard Dimension  - End

function deviceBasedDynamicDimension(originalDimen: number, compareWithWidth: boolean, resizeFactor: number): number | undefined {

  if (originalDimen != null) {
    if (resizeFactor != null) {
      originalDimen *= resizeFactor;
    }
    const compareArtBoardDimenValue = compareWithWidth ? artBoardWidth : artBoardHeight;
    const artBoardScreenDimenRatio = (originalDimen * 100) / compareArtBoardDimenValue;
    let compareCurrentScreenDimenValue = compareWithWidth ? screenWidth : screenHeight - extraSpace;
    return PixelRatio.roundToNearestPixel((artBoardScreenDimenRatio * compareCurrentScreenDimenValue) / 100,);
  }
}
import { imgArrow, avatar, RightArrowfull, } from "./assets";
import { imgLeftArrow } from "../../PrivacySettings/src/assets";
// Customizable Area End

import FollowersController, {
  Props,
  configJSON,
} from "./FollowersController";
import Scale from "../../../components/src/Scale";
export default class Followers extends FollowersController {
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

  renderHeader = () => {
    if (this?.props?.route?.params?.title === "Followed accounts") {
      return null
    }
    return (
      <SearchBar
        testID="searchBar"
        platform="default"
        pointerEvents={this.state.showLoader ? "none" : "auto"}
        placeholder={translate("search")}
        searchIcon={<AntDesign name="search1" size={20} />}
        onChangeText={this.searchFilterFunction}
        autoCorrect={false}
        value={this.state.value}
        containerStyle={styles.searchContainerStyle}
        inputContainerStyle={styles.searchInputStyle}
        onClear={() => this.searchFilterFunction("")}
        inputStyle={this.state.language == "ar" && styles.inputTextRight}
      />
    );
  };
  renderItem = (data: any) => {
    const { item } = data
    return (
      <View style={styles.mainView}>
        <View style={styles.submainView}>
          <TouchableOpacity testID="imageClick" onPress={()=>{this.handleUserProfileNavigation(item)}}>
            <View style={styles.followImgView}>
              <Image source={item?.photo ? { uri: item?.photo } : avatar} style={styles.imgStyle} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity testID="nameClick" onPress={() =>{this.handleUserProfileNavigation(item)}}>
            <View style={[styles.nameView, this.state.language == "ar" && styles.name_bio_ar]}>
              <Text style={styles.nameText} >{item?.user_name}</Text>
              <Text style={styles.descText} numberOfLines={2}>{!item?.bio ? translate("noBio") : item?.bio}</Text>
            </View>
          </TouchableOpacity>

        </View>
        {
          item?.account_id?.toString() !== this.state.myID?.toString() && (
            <Button
              testID="followStatusBtn"
              buttonStyle={[styles.signinBtnStyle, styles.filledSigninBtn]}
              containerStyle={styles.btnContainer}
              onPress={() => {
                const isFollowed = Boolean(this.state.myFollowings.find((element: any) => element?.account_id === item?.id))

                if (item.is_private === 'Private' && item.account_follow_status === 'Follow') {
                  this.followUser(item)
                } else if (item.is_private === 'Private' && item.account_follow_status === 'Requested') {
                  this.cancelRequest(item.id)
                } else if (item.account_follow_status?.toLowerCase() === "following") {
                  this.unfollowUser(item.id)
                }else if(this.props.route.params?.type === "followers" && this.state.owner){
                  this.removeUser(item.id)
                } else {
                  this.followUser(item)
                }
              }}
              title={this.followButtonTitle(item.id, item.account_follow_status)}
              titleStyle={styles.btnTitleStyle}
            />
          )

        }


      </View>
    );
  };
  renderStaticItem = (data: any) => {
    const { item } = data
    const isFollowed = Boolean(item.account_follow_status?.toLowerCase() === "following")
    return (
      <View style={styles.mainView}>
        <View style={styles.submainView}>
          <View style={styles.followImgView}>
            <Image source={item?.photo ? { uri: item?.photo } : avatar} style={styles.imgStyle} />
          </View>
          <View style={styles.nameView}>
            <Text style={styles.nameText} >{item?.full_name}</Text>
            <Text style={styles.descText} numberOfLines={2}>{!item?.bio ? translate("noBio") : item?.bio}</Text>
          </View>
        </View>

        <Button
          testID={'navigationButton'}
          buttonStyle={[styles.signinBtnStyle, isFollowed ? styles.filledSigninBtn : styles.signInBtn]}
          containerStyle={styles.btnContainer}
          onPress={() => {
            if (item.account_status === 'Private' && item.account_follow_status === 'Follow') {
              this.followUser(item)
            } else if (item.account_status === 'Private' && item.account_follow_status === 'Requested') {
              this.cancelRequest(item.id)
            } else if (isFollowed) {
              this.unfollowUser(item.id)
            } else {
              this.followUser(item)
            }
          }}
          // onPress={() => this.props.navigation.navigate("OTPInputAuth")}p
          title={this.staticDataButtonText(item)}
          titleStyle={
            isFollowed ? styles.btnTitleStyle : styles.slectedBtnTitleStyle
          }
        />

      </View>
    );
  };
  headerBackArrow() {
    if (this.state.language == "ar") {
      return RightArrowfull
    } else if (this.state.isFromPrivacySafety) {
      return imgLeftArrow
    } else {
      return imgArrow
    }
  }

  onClickPrivacy = () => {
    if(this.state.isScreenFrom == "OTP"){
      return this.props.navigation.navigate("Login")
    }else if(this.state.isFromPrivacySafety ){
      return this.props.navigation.goBack() 
    }else{
      return this.props.navigation.navigate("UserProfileBasicBlock", {
        data: {
          attributes: {
            account_id: this.props.route?.params?.userID ?
              this.props.route?.params?.userID : null
          }
        }
      })
    }
  }

  dividerLine = () => {
    if(this.state.isFromPrivacySafety){
      return  <View style={styles.divider} /> 
    }else{
      return <></>
    }
  }

  followTextStyle = () => {
    if(this?.props?.route?.params?.title === "Followed accounts"){
      return [styles.pageCaption, styles.leftTex]
    }else{
      return styles.title
    }
  }

  followText = () => {
    if(this.state.type !== 'Signup'){
      return this?.props?.route?.params?.sub_title 
    }else{
      return translate("follow_someone_you");
    }
  }
  
  backImgStyle = () => {
    if(this.state.isFromPrivacySafety ){
      return styles.backArrow 
    }else{
      return styles.imgStyle
    }
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    let idtobeusedonnavigation = "";
    if (this.state.type === 'followers' && this.state.showLoader === false) {
      if (
        this.state?.followers.every((val, i, arr) => val.account_id?.toString() === this.state?.myID?.toString())
      ) {
        idtobeusedonnavigation = this.state?.myID
      } else {
        idtobeusedonnavigation = this.state?.followers[0]?.account_id?.toString()
      }
    } else if (this.state?.followings[0]?.account_id?.toString() === this.state.myID) {
      idtobeusedonnavigation = this.state?.myID
    } else {
      idtobeusedonnavigation = this.state?.followings[0]?.account_id?.toString()
    }
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.overAllContainer}>
            <TouchableWithoutFeedback
            testID={'hideKeyboard'}
            onPress={() => {
              this.hideKeyboard();
            }}
            >
              <View style={[styles.headerStyle, !this.state.isFromPrivacySafety && { marginBottom: deviceBasedDynamicDimension(20, true, 1), }]}>
                <TouchableOpacity
                  testID={'clickPrivacy'}
                  style={styles.imgView}
                  onPress={() => this.onClickPrivacy()}
                >
                  <Image
                    source={this.headerBackArrow()}
                    style={this.backImgStyle()} />
                </TouchableOpacity>
                <Text style={[styles.titleStyle, this.state.isFromPrivacySafety && { marginLeft: Scale(75) }]}>{this.state.type !== 'Signup' ? this?.props?.route?.params?.title : translate("follow_Someone")}</Text>
              </View>
            </TouchableWithoutFeedback>
              {this.dividerLine()}
              <View style={styles.childContainer} >
                <Text style={this.followTextStyle()}>{this.followText()}</Text>
                {this.renderHeader()}
                {
                  this.state.type === 'Signup' &&
                  <FlatList
                    testID={'flatListSignUp'}
                    data={this.state.exploreUsers}
                    contentContainerStyle={styles.contentContainer}
                    renderItem={this.renderStaticItem}
                    keyExtractor={item => item.id}
                    onEndReached={this.handleLoadMore}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    style={styles.flatlistStyle}
                    refreshing={this.state.showLoader}
                  />
                }
                {
                  this.state.type !== 'Signup' &&
                  <FlatList
                    testID={'flatListNotSignUp'}
                    data={this.state.type === 'followers' ? this.state.followers : this.state.followings}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    style={styles.flatlistStyle}
                    refreshing={this.state.showLoader}
                    contentContainerStyle={styles.contentContainer}
                    onEndReachedThreshold={0.5}
                    onEndReached={this.onLoadMoreFollowers}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                      <RefreshControl
                        colors={['#9Bd35A', '#689F38']}
                        refreshing={this.state.showLoader}
                        progressViewOffset={this.state.showLoader ? -200 : 0}
                        onRefresh={this.onRefreshing}
                      />
                    }
                  />
                }
              </View>
            </View>
        </View>
        {this.state.type === 'Signup' &&
          <Button
            testID={'buttonContinue'}
            buttonStyle={[styles.coninueBtnStyle]}
            containerStyle={styles.continueBtnContainer}
            onPress={() => this.goToLoginSuccess()}
            // onPress={() => this.props.navigation.navigate("OTPInputAuth")}
            title={translate("continue")}
            titleStyle={{
              fontWeight: "bold",
              fontSize: 14,
              color: "#000000"
            }}
          />
        }
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
    paddingTop: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff"
  },
  overAllContainer: {flex:1},
  childContainer: { paddingHorizontal: 16 ,flex:1},
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  title: {
    // fontSize: deviceBasedDynamicDimension(14 , true , 1)
    fontSize: Scale(13),
    color: 'grey',
    padding: 5,
    textAlign: 'left'
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom:  deviceBasedDynamicDimension(20 , true , 1),
    paddingHorizontal: 16
  },
  imgStyle: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
  },
  imgView: {
    height: deviceBasedDynamicDimension(30, true, 1),
    width: deviceBasedDynamicDimension(30, true, 1),
    justifyContent: 'center',
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: Scale(18),
    marginLeft: deviceBasedDynamicDimension(30, true, 1),
    color: "#000000",
  },
  listContainerStyle: {
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginVertical: deviceBasedDynamicDimension(10, false, 1)
  },
  listitemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: deviceBasedDynamicDimension(10, true, 1),
    marginBottom: deviceBasedDynamicDimension(14, false, 1),
    padding: deviceBasedDynamicDimension(10, true, 1)
  },
  unSelectedBorderStyle: {
    borderColor: "#EEEEEE"
  },
  selectedBorderStyle: {
    borderColor: "#FFC925"
  },
  searchContainerStyle: {
    backgroundColor: "white",
    padding: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginBottom: deviceBasedDynamicDimension(20, false, 1)
  },
  searchInputStyle: {
    backgroundColor: "#EEEEEE",
    height: 50,
    borderRadius:15
  },
  signinBtnStyle: {
    borderRadius: deviceBasedDynamicDimension(50, false, 1),
    paddingHorizontal: deviceBasedDynamicDimension(20, true, 1),
    paddingVertical: deviceBasedDynamicDimension(7, false, 1),
    alignSelf: "flex-end"
  },
  signInBtn: {
    borderColor: "#FFC925",
    backgroundColor: "#ffffff",
    borderWidth: 1
  },
  filledSigninBtn: {
    backgroundColor: "#FFC925"
  },
  pageCaption: {
    fontSize: 12,
    color: '#b4b4b4',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  btnContainer: {
    marginVertical: deviceBasedDynamicDimension(10, false, 1),
    backgroundColor: "transparent"
  },
  followImgView: {
    height: deviceBasedDynamicDimension(50, false, 1),
    width: deviceBasedDynamicDimension(50, true, 1),
    borderRadius: deviceBasedDynamicDimension(50, true, 1)
  },
  mainView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: deviceBasedDynamicDimension(10, true, 1),
    alignItems: "center"
  },
  submainView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  nameView: {
    marginLeft: deviceBasedDynamicDimension(20, true, 1),
    width: responsiveWidth(45),
    alignItems: "flex-start"
  },
  name_bio_ar: {
    marginLeft: deviceBasedDynamicDimension(10, true, 1),
  },
  descText: {
    fontSize: deviceBasedDynamicDimension(14, true, 1),
  },
  nameText: {
    fontWeight: "bold",
    fontSize: deviceBasedDynamicDimension(16, true, 1)
  },

  flatlistStyle: {
    marginVertical: deviceBasedDynamicDimension(10, true, 1)
  },
  coninueBtnStyle: {
    borderRadius: deviceBasedDynamicDimension(50, true, 1),
    height: deviceBasedDynamicDimension(50, false, 1),
    backgroundColor: "#FFC925",
    bottom: 0,
    right: 0,
    left: 0,
    // width: "90%"
  },
  continueBtnContainer: {
    margin: deviceBasedDynamicDimension(10, true, 1),
  },
  btnTitleStyle: {
    fontSize: deviceBasedDynamicDimension(14, true, 1),
    fontWeight: "bold",
    color: "black"
  },
  slectedBtnTitleStyle: {
    fontSize: deviceBasedDynamicDimension(14, true, 1),
    fontWeight: "bold",
    color: "#FFC925"
  },
  inputTextRight: {
    textAlign: "right"
  },
  backArrow: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: 'contain'
  },
  divider: {
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  leftTex: {
    textAlign: "left"
  },
  contentContainer: { paddingBottom:20 },
});
// Customizable Area End
