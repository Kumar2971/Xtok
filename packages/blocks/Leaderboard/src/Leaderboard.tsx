import React from "react";

// Customizable Area Start
import {
  Dimensions,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TextStyle,
  ImageStyle,
  ViewStyle,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import Scale from "../../../components/src/Scale";
import FONTS from "../../../components/src/Fonts/Fonts";
import {
  avatar,
  crown,
  Rectangle6,
  Rectangle7,
  Rectangle8,
  Vector1,
  imgLeftArrow
} from "./assets";
import ActionSheet from "react-native-actionsheet";

import LeaderboardModel from "./models/Leaderboard.model";

//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End

interface RenderRankStyles {
  containerStyle: ViewStyle;
  leftColumnStyle: ViewStyle;
  leftColumnImageStyle: ImageStyle;
  leftColumnRankImageStyle: ImageStyle;
  leftColumnRankTextStyle: TextStyle;
  leftColumnStreamerNameStyle: TextStyle;
  leftColumnStreamerPointStyle: TextStyle;
  middleColumnStyle: ViewStyle;
  middleColumnImageStyle: ImageStyle;
  middleColumnRankImageStyle: ImageStyle;
  middleColumnRankTextStyle: TextStyle;
  middleColumnStreamerNameStyle: TextStyle;
  middleColumnStreamerPointStyle: TextStyle;
  middleColumnCrownImageStyle: ImageStyle;
  rightColumnStyle: ViewStyle;
  rightColumnImageStyle: ImageStyle;
  rightColumnRankImageStyle: ImageStyle;
  rightColumnRankTextStyle: TextStyle;
  rightColumnStreamerNameStyle: TextStyle;
  rightColumnStreamerPointStyle: TextStyle;
}

// Customizable Area End

import LeaderboardController, {
  Props,
} from "./LeaderboardController";
import { translate } from "../../../components/src/i18n/translate";
import StreamerBadge from "../../../components/src/StreamerBadge";
import ControlTab from "../../../components/src/ControlTab/ControlTab";

export default class Leaderboard extends LeaderboardController {

  constructor(props: Props) {
    super(props);
    this.ActionSheet = null;
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  ActionSheet: ActionSheet | null;

  header = () => {
    const { language } = this.state;
    console.log("lll", language);

    return (
      <View style={styles.header}>
        <TouchableOpacity
          testID="TEST_BACK_BUTTON"
          onPress={() => this.props.navigation.goBack()}
        >
          <Image source={imgLeftArrow} style={[styles.backarrowStyle,this.state.language =='ar' && styles.backarrowStyle_Ar]} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{translate("leaderboards")}</Text>
        <View />
      </View>
    );
  };

  handleActionSheet = () => {
    this.ActionSheet && this.ActionSheet.show();
  }


  tabForDate = () => {
    const containerStyle = {
      marginVertical: 15,
      backgroundColor: "#FFE9A4",
      borderRadius: Scale(10)
    };

    const tabStyle = {
      borderColor: "#FFE9A4",
      backgroundColor: "#FFE9A4",
      borderRadius: Scale(10),
      flex:1
    };

    const activeTabStyle = {
      backgroundColor: "#FFC925",
      borderRadius: Scale(10),
    };


    return (
      <View style={containerStyle}>
        <ControlTab
          values={[
            translate("hourly"),
            translate("daily"),
            translate("weekly"),
            translate("monthly")
          ]}
          subValues={[
            this.getCurrentHourRange(),
            "Today",
            this.getCurrentWeekDateRange(),
            this.getCurrentMonthName()
          ]}
          selectedIndex={this.state.tabSelectedIndex}
          onTabPress={this.handleTabSelectedIndex}
          tabStyle={tabStyle}
          activeTabTextStyle={{ color: "black" }}
          activeTabStyle={activeTabStyle}
          borderRadius={Scale(10)}
          textNumberOfLines={2}
          tabTextStyle={{
            color: "black",
            fontFamily: FONTS.MontserratSemiBold,
            textAlign: "center",
          }}
          subTabTextStyle={{
            color: "rgb(94,94,101)",
            fontFamily: FONTS.MontserratRegular,
            textAlign: "center",
            fontSize: Scale(13),
            marginTop: 2
          }}
          activeSubTabTextStyle={{
            color: "rgb(94,94,101)",
            fontFamily: FONTS.MontserratSemiBold,
            textAlign: "center",
            fontSize: Scale(12),
            marginTop: 2
          }}
        />
      </View>
    );
  };

  dropdown = () => {
    const containerStyle = { marginBottom: Scale(15) };
    const rightIconStyle: ImageStyle = {
      width: Scale(22),
      height: Scale(16),
      resizeMode: "stretch",
      marginTop: 2,
      tintColor: "#ebbd34"
    };

    return (
      <TouchableOpacity testID="TEST_CHANGE_TAB" onPress={this.handleActionSheet} style={containerStyle}>
        <View
          style={styles.dropDownContainer}
        >
          <Text style={styles.placeholderStyle}>{this.state.dropValue}</Text>
          <Image
            source={Vector1}
            style={rightIconStyle}
          />
        </View>
      </TouchableOpacity>
    );
  };

  renderRank = () => {
    const {
      containerStyle,
      leftColumnStyle,
      leftColumnImageStyle,
      leftColumnRankImageStyle,
      leftColumnRankTextStyle,
      leftColumnStreamerNameStyle,
      leftColumnStreamerPointStyle,
      middleColumnStyle,
      middleColumnImageStyle,
      middleColumnRankImageStyle,
      middleColumnRankTextStyle,
      middleColumnStreamerNameStyle,
      middleColumnStreamerPointStyle,
      middleColumnCrownImageStyle,
      rightColumnStyle,
      rightColumnImageStyle,
      rightColumnRankImageStyle,
      rightColumnRankTextStyle,
      rightColumnStreamerNameStyle,
      rightColumnStreamerPointStyle
    } = renderRankStyles;

    const first = this.getPersonByRank(1);
    const second = this.getPersonByRank(2);
    const third = this.getPersonByRank(3);

    return (
      <View style={containerStyle}>
        <View style={leftColumnStyle}>
          {second &&
            <>
              <Image source={second.url ? { uri: second.url } : avatar} style={leftColumnImageStyle} />
              <Image source={Rectangle6} style={leftColumnRankImageStyle} />
              <Text style={leftColumnRankTextStyle}>{second.order}</Text>
              <Text style={leftColumnStreamerNameStyle}>{second.user_name}</Text>
              <Text style={leftColumnStreamerPointStyle}>{this.formatNumber(second.coins_count)}</Text>
            </>
          }
        </View>
        <View style={middleColumnStyle}>
          { first &&
            <>
              <Image source={first.url ? { uri: first.url } : avatar} style={middleColumnImageStyle} />
              <Image source={Rectangle7} style={middleColumnRankImageStyle} />
              <Text style={middleColumnRankTextStyle}>{first.order}</Text>
              <Text style={middleColumnStreamerNameStyle}>{first.user_name}</Text>
              <Text style={middleColumnStreamerPointStyle}>{this.formatNumber(first.coins_count)}</Text>
              <Image source={crown} style={middleColumnCrownImageStyle} />
            </>
          }
        </View>
        <View style={rightColumnStyle}>
          {
            third &&
            <>
              <Image source={third.url ? { uri: third.url } : avatar} style={rightColumnImageStyle} />
              <Image source={Rectangle8} style={rightColumnRankImageStyle} />
              <Text style={rightColumnRankTextStyle}>{third.order}</Text>
              <Text style={rightColumnStreamerNameStyle}>{third.user_name}</Text>
              <Text style={rightColumnStreamerPointStyle}>{this.formatNumber(third.coins_count)}</Text>
            </>
          }
        </View>
      </View>
    );
  };

  rankingData = () => {
    return (
      <>
        <Text style={[styles.contentHeaderText,this.state.language==="ar" && styles.textAlign_Ar]}>{translate("Rankings")}</Text>
        <FlatList
          data={this.state.rankingData.filter((item: any, index: number) => item.order >= 4)}
          keyExtractor={(item: any) => item.id}
          renderItem={this._renderItemRankingData}
        />
      </>
    );
  };

  _renderItemRankingData = ({ item, index }: { item: LeaderboardModel, index: number }) => {
    return (
      <View style={styles.rankdataContainer}>
        <View style={{ flexDirection: "row",alignItems:"center" }}>
          <View style={styles.rankNumber}>
            {/* Displaying the user's rank order */}
            <Text style={[styles.regularText]}>{item.order}</Text>
          </View>
          {/* Displaying the user's avatar */}
          <Image source={item.url ? { uri: item.url } : avatar} style={styles.avatar} />
          {/* Displaying the user's level badge */}
          <View style={styles.nameCoinCount}>
            <View>
              {/* Displaying the user's name */}
              <Text style={[styles.regularText,,this.state.language==="ar" && styles.textAlign_Ar]}>{item.user_name}</Text>
              {/* Displaying the user's coins count */}
              <Text style={[styles.regularSubText,this.state.language==="ar" && styles.textAlign_Ar]}>{this.formatNumber(item.coins_count)}</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 5 }}>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                {
                  item.level_data
                  &&
                  <StreamerBadge
                    badgeImage={item.level_data.image.url}
                    level={item.level_data.level}
                    language = {this.state.language}
                  />
                }
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderLoadingIndicator = () => {
    return (
      <View style={styles.loadingContainer} testID="TEST_LOADING_CONTAINER">
        <ActivityIndicator size="large" color="#FFC925" />
      </View>
    );
  };

  renderEmptyLeaderboard = () => {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={styles.headerText}>{translate("Empty_leaderBoard")}</Text>
        <Text style={{ fontSize: 10, textAlign: "center", paddingTop: 10 }}>{translate("apologize")}</Text>
      </View>
    )
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback
          testID="TEST_HIDE_KEYBOARD"
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <>
            {this.state.loading && this.renderLoadingIndicator()}
            {this.header()}
            <ActionSheet
              ref={(actionSheet) => (this.ActionSheet = actionSheet)}
              title={translate("ChooseOption")}
              options={[translate("donations"), translate("streamers"), translate("cancel")]}
              cancelButtonIndex={2}
              onPress={(index) => {
                if (index === 0) {
                  this.loadDonatorList();
                  this.setState({ dropValue: translate("donations") });
                } else if (index === 1) {
                  this.loadAcceptorList();
                  this.setState({ dropValue: translate("streamers") });
                }
              }}
            />
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={styles.bodyContainer}>
              {this.tabForDate()}
              {this.state.rankingData.length > 0 && this.dropdown()}
              {this.state.rankingData.length > 0 && this.renderRank()}
              {this.state.rankingData.length > 3 && this.rankingData()}
              {!this.state.loading && this.state.rankingData.length == 0 && this.renderEmptyLeaderboard()}
            </ScrollView>
          </>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

const renderRankStyles: RenderRankStyles = {
  containerStyle: {
    width: "100%",
    // height: 165,
    display: "flex",
    flexDirection: "row",
    marginTop: 50,
    marginBottom: 10
  },
  leftColumnStyle: {
    flex: 1,
    height: 125,
    backgroundColor: "#242529",
    marginTop: 45,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  leftColumnImageStyle: {
    width: 60,
    height: 60,
    marginRight: 5,
    position: "absolute",
    top: -35,
    borderColor: "#C9D8EC",
    borderWidth: 2,
    borderRadius: Scale(50)
  },
  leftColumnRankImageStyle: {
    width: 15,
    height: 15,
    position: "absolute",
    top: 15
  },
  leftColumnRankTextStyle: {
    color: "white",
    fontFamily: FONTS.MontserratSemiBold,
    fontSize: 10,
    position: "absolute",
    top: 16
  },
  leftColumnStreamerNameStyle: {
    color: "white",
    fontFamily: FONTS.MontserratSemiBold,
    fontSize: Scale(13),
    top: 15
  },
  leftColumnStreamerPointStyle: {
    color: "white",
    fontFamily: FONTS.MontserratSemiBold,
    fontSize: Scale(18),
    marginTop: 25
  },
  middleColumnStyle: {
    flex: 1,
    height: 170,
    backgroundColor: "#2F3034",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5
  },
  middleColumnImageStyle: {
    width: 70,
    height: 70,
    position: "absolute",
    top: -45,
    borderColor: "#FFCA2F",
    borderWidth: 2,
    borderRadius: Scale(50)
  },
  middleColumnRankImageStyle: {
    width: 20,
    height: 20,
    position: "absolute",
    top: 12
  },
  middleColumnRankTextStyle: {
    color: "white",
    fontFamily: FONTS.MontserratSemiBold,
    fontSize: 10,
    position: "absolute",
    top: 16
  },
  middleColumnStreamerNameStyle: {
    color: "white",
    fontFamily: FONTS.MontserratSemiBold,
    fontSize: 13,
    top: -15
  },
  middleColumnStreamerPointStyle: {
    color: "#FFCA2F",
    fontFamily: FONTS.MontserratSemiBold,
    fontSize: Scale(18),
    top: -5,
  },
  middleColumnCrownImageStyle: {
    width: 50,
    height: 50,
    marginBottom: -55,
    resizeMode: "contain"
  },
  rightColumnStyle: {
    flex: 1,
    height: 125,
    backgroundColor: "#242529",
    marginTop: 45,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  rightColumnImageStyle: {
    width: 60,
    height: 60,
    marginRight: 5,
    position: "absolute",
    top: -35,
    borderColor: "#E76529",
    borderWidth: 2,
    borderRadius: Scale(50)
  },
  rightColumnRankImageStyle: {
    width: 15,
    height: 15,
    position: "absolute",
    top: 15
  },
  rightColumnRankTextStyle: {
    color: "white",
    fontFamily: FONTS.MontserratSemiBold,
    fontSize: 10,
    position: "absolute",
    top: 16
  },
  rightColumnStreamerNameStyle: {
    color: "white",
    fontFamily: FONTS.MontserratSemiBold,
    fontSize: Scale(13),
    top: 15
  },
  rightColumnStreamerPointStyle: {
    color: "#E76529",
    fontFamily: FONTS.MontserratSemiBold,
    fontSize: Scale(18),
    marginTop: 25
  }
};

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
    height: 500,
  },
  bodyContainer: {padding:16},
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 2,
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1
  },
  bgMobileInput: {
    flex: 1
  },
  showHide: {
    alignSelf: "center"
  },
  dropDownContainer: {
    backgroundColor: "#FFE9A4",
    borderWidth: 1,
    borderColor: "#ecdaad",
    padding: Scale(12),
    borderRadius: Scale(10),
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
    // marginVertical: Scale(10)
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Scale(15),
    height: Scale(40),
    width: "100%",
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10
  },
  rankdataContainer: {
    backgroundColor: "#FFE9A4",
    borderWidth: 1,
    borderColor: "#ecdaad",
    paddingHorizontal: Scale(10),
    paddingVertical: Scale(15),
    borderRadius: Scale(20),
    marginVertical: Scale(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },


  backarrowStyle: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: "contain"
  },
  backarrowStyle_Ar: {
    transform:[{rotate:"180deg"}]
  },
  backarrowContainer: {
    width: Scale(20),
    height: Scale(18),
    resizeMode: "contain"
  },
  headerText: {
    fontSize: Scale(18),
    fontFamily: FONTS.MontserratSemiBold,
    // marginBottom: 10
  },
  contentHeaderText: {
    fontSize: Scale(18),
    marginVertical: Scale(15),
    fontFamily: FONTS.MontserratSemiBold,
    // marginBottom: 10
  },
  regularText: {
    fontSize: Scale(13),
    lineHeight: 25,
    fontFamily: FONTS.MontserratSemiBold
  },
  regularSubText: {
    fontSize: Scale(13),
    fontFamily: FONTS.MontserratRegular
  },
  placeholderStyle: {
    fontSize: Scale(15),
    fontFamily: FONTS.MontserratSemiBold,
    letterSpacing: 0.01
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  SegmentedControlTabSubText: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 8,
    width: "100%",
  },
  avatar: {
    width: Scale(50),
    height: Scale(50),
    borderRadius: Scale(40),
    justifyContent: "center"
  },
  rankNumber: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginRight:Scale(4)
  },
  streamerName: {
    color: "white",
    fontFamily: FONTS.MontserratSemiBold,
    fontSize: Scale(13)
  },
  streamerPoint: {
    color: "white",
    fontFamily: FONTS.MontserratSemiBold
  },
  nameCoinCount: {
    paddingLeft: Scale(20),
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row"
  },
  textAlign_Ar: {
    textAlign:"left"
  }
});
// Customizable Area End
