import React from 'react'

// Customizable Area Start
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import { translate } from "../../../components/src/i18n/translate";
//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import { COLORS } from "../../../framework/src/Globals";
import ElasticSearchController, {
  Props
} from "./ElasticSearchController";
import { LocationGrey, imgLeftArrow } from "./assets";

import Scale from "../../../components/src/Scale";
const { width, height } = Dimensions.get("window");

export default class PostsByLocationScreen extends ElasticSearchController {
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
  emptyList = () => {

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: Scale(50),
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{`No posts for location`}</Text>
      </View>
    );
  };
  renderItem = (data: any) => {
    const {item} = data
    return (
      <TouchableOpacity
          testID={'moveToCommentClick'}
        style={styles.post_container}
        onPress={() => {
          this.props.navigation.navigate('Comments', {
            type: 'SearchActivity',
            account_id: item?.attributes?.account_id,
            post_id: item?.id,
            searchItem: this.locationData.description,
            isSearchFrom: 'location_'+this.state.quickFilter,
          })
        }}
      >
        <Image source={{ uri: item?.attributes?.post_medias?.thumnails[0] }} style={styles.post_image} />
      </TouchableOpacity>
    )
  }
  // Customizable Area End

  // Customizable Area Start
  keyExtractor = (item: any) => {
    return item.id
  }
  // Customizable Area End

  // Customizable Area Start
  locationData = this.props.route.params.location || ''
  locationDataDetails = this.props.route.params.locationDetails
  locationCoordinates =
    {
      latitude: this.locationDataDetails.geometry.location.lat,
      longitude: this.locationDataDetails.geometry.location.lng,
      latitudeDelta: 0.15,
      longitudeDelta: 0.15,
    } || {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }


  locationContainer = () => {
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <View style={{ alignItems: 'center', marginHorizontal: Scale(0) }}>
          <View style={{ width: '90%', flexDirection: 'row', marginBottom: Scale(20), marginHorizontal: Scale(15), marginTop: Scale(15) }}>
          <Image
            source={LocationGrey}
            style={[styles.detailIcon, { tintColor: COLORS.yellow }]}
          />
          <View style={{ marginLeft: Scale(15), flex: 1 }} >
            <Text style={[styles.default_golaviUserTxt, { maxWidth: '100%', paddingBottom: Scale(10) }]} numberOfLines={2}>
              {this.locationData.description}</Text>
            <Text style={styles.locationText} numberOfLines={2}>
              {`${this.state.posts} ${this.state.posts > 1 ? translate("postsTextInSmallLetter") : translate("post")}`}
            </Text>
          </View>
        </View>
        <MapView
          style={styles.mapView}
          initialRegion={this.locationCoordinates}
        ><Marker
          key={1}
          coordinate={{ latitude: this.locationCoordinates.latitude, longitude: this.locationCoordinates.longitude }}>
            <Image
              source={LocationGrey}
              style={[styles.markerIcon, { tintColor: COLORS.yellow }]}
            /></Marker></MapView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 10 }}>

          <TouchableOpacity testID='top' disabled={this.state.quickFilter === "top"} onPress={() => this.onSelectQuickFilter('top')} style={{ borderBottomWidth: this.state.quickFilter === "top" ? 3 : 2, flex: 0.8, width: 50, borderBottomColor: this.state.quickFilter === 'top' ? COLORS.yellow : '#EEEEEE', alignSelf: "center" }}>
            <Text style={[styles.textGray, this.state.quickFilter === 'top' && { fontWeight: 'bold', color: COLORS.yellow }]}>{translate("top")}</Text>
          </TouchableOpacity>
          <TouchableOpacity testID='trending' disabled={this.state.quickFilter === "trending"} onPress={() => this.onSelectQuickFilter('trending')} style={{ borderBottomWidth: this.state.quickFilter === "trending" ? 3 : 2, flex: 0.8, width: 50, borderBottomColor: this.state.quickFilter == 'trending' ? COLORS.yellow : '#EEEEEE' }}>
            <Text style={[styles.textGray, this.state.quickFilter === 'trending' && { fontWeight: 'bold', color: COLORS.yellow }]}>{translate("Trending")}</Text>
          </TouchableOpacity >
          <TouchableOpacity testID='recent' disabled={this.state.quickFilter === "recent"} onPress={() =>
            this.onSelectQuickFilter('recent')} style={{ borderBottomWidth: this.state.quickFilter === "recent" ? 3 : 2, flex: 0.8, borderBottomColor: this.state.quickFilter == 'recent' ? COLORS.yellow : '#EEEEEE', alignSelf: "center" }}>
            <Text style={[styles.textGray, this.state.quickFilter === 'recent' && { fontWeight: 'bold', color: COLORS.yellow }]}>{translate("recent")}</Text>
          </TouchableOpacity>
        </View>
        </View>


        {this.state.loader ? (
          <ActivityIndicator
            style={{ paddingTop: 20 }}
            size="small"
            color="black"
          />
        ) :  (
          <FlatList testID='list'
            numColumns={3}
            data={this.state.locationPosts ?? []}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
				    ListEmptyComponent={this.emptyList()}
				    contentContainerStyle={{paddingVertical: Scale(10)}}
            onEndReachedThreshold={Platform.OS == "ios" ? 0 : 0.1}
          />
        )}
      </View>)
  }

  // Customizable Area End
  render() {
    // Customizable Area Start
    console.log(this.locationDataDetails.geometry, 'YABADA')
    const { navigation } = this.props
    const { imgList, data, allStatusData, backendData, recentSearchHistoryData,language } = this.state
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerStyle}>
          <TouchableOpacity testID='back'
            style={styles.imgView}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image source={imgLeftArrow} style={[styles.imgStyle, language == "ar" && { transform: [{ rotate: "180deg" }] }]} />
          </TouchableOpacity>
          <Text style={styles.titleStyle}>{translate("search")}</Text>
          <View />
        </View>
        <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
          <View style={styles.separator} />{this.locationContainer()}
        </ScrollView>
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
    paddingVertical: 8,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  }, whiteText: {
    fontSize: Scale(18),
    color: "#FFFFFF"
  }, viewsInfo: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center"
  }, imageContainerFull: {
    width: width / 3,
    padding: 1,
    height: (width / 3) * 1.5
  }, detailIcon: {
    width: Scale(60),
    height: Scale(60),
    paddingBottom: Scale(0),
    resizeMode: "contain",
  }, markerIcon: {
    width: Scale(33),
    height: Scale(33),
    paddingBottom: Scale(10),
    resizeMode: "contain",
  }, contentsSharedMainContainer: {
    flex: 1, width: '100%'
  },
  contentsShardContainer: {
    flexDirection: "row",

    height: (width / 3) * 1.5
  },
  mapView: {
    width: '90%',
    borderRadius: 30,
    justifyContent: 'center',
    aspectRatio: 390 / 230,
    marginBottom: Scale(20)
  },
  title: {
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  }, textGray: {
    fontSize: deviceBasedDynamicDimension(18, true, 1),
    textAlign: "center",
    marginVertical: Scale(15),
    color: '#C9C9C9'

  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems:"center",
    marginTop: deviceBasedDynamicDimension(7, true, 1),
    marginBottom: deviceBasedDynamicDimension(20, true, 1),
    paddingHorizontal: Scale(10),
  },
  imgStyle: {
    height: Scale(25),
    width: Scale(25),
    resizeMode: "contain"
  },
  imgView: {
    height: deviceBasedDynamicDimension(20, true, 1),
    width: deviceBasedDynamicDimension(20, true, 1)
  },
  imgFlatList: {
    height: deviceBasedDynamicDimension(50, true, 1),
    width: deviceBasedDynamicDimension(50, true, 1),
    borderRadius: deviceBasedDynamicDimension(100, true, 1),

  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: Scale(18),
    marginRight: deviceBasedDynamicDimension(15, true, 1),
    color: "#000000"
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  searchAndScanContainer: {
    flexDirection: 'row',
    alignSelf: "center",
    justifyContent: "space-between"
  },
  default_golaviUserTxt: {
    fontSize: deviceBasedDynamicDimension(16, true, 1),
    fontWeight: '700',
    textAlign: "left"
  },
  searchContainerStyle: {
    marginTop: 10,
    width: '95%',
    backgroundColor: "transparent",
    padding: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginBottom: deviceBasedDynamicDimension(20, false, 1),
    borderRadius: 0,

  },
  searchInputStyle: {
    backgroundColor: "#EEEEEE",
    height: deviceBasedDynamicDimension(45, true, 1),
  },
  scanContainer:
  {
    marginLeft: deviceBasedDynamicDimension(7, true, 1),
    height: deviceBasedDynamicDimension(30, true, 1),
    width: deviceBasedDynamicDimension(30, true, 1),
    alignSelf: 'center',
    resizeMode: "contain"
  },
  allTrendContainer: {
    marginTop: deviceBasedDynamicDimension(1, true, 1),
  },
  mainTrendImg: {
    height: deviceBasedDynamicDimension(200, true, 1),
    width: deviceBasedDynamicDimension(500, true, 1),
  },
  tagRoundContainer: {
    marginTop: deviceBasedDynamicDimension(3, true, 1), padding: deviceBasedDynamicDimension(3.3, true, 1), borderWidth: deviceBasedDynamicDimension(1, true, 1),
    borderRadius: 100, width: deviceBasedDynamicDimension(38, true, 1),
    height: deviceBasedDynamicDimension(38, true, 1),
  },
  hashTag: {
    alignSelf: "center",
    justifyContent: "center",
    fontSize: deviceBasedDynamicDimension(20, true, 1),
  },
  hashTagSymbolTxt: {
    alignSelf: "center",
    justifyContent: "center",
    fontSize: deviceBasedDynamicDimension(20, true, 1),
  },
  locationText: {
    maxWidth: '85%',
    lineHeight: Scale(26),
    fontSize: deviceBasedDynamicDimension(14, true, 1),
    textAlign:"left"
  },
  hashTagDes: {
    fontSize: deviceBasedDynamicDimension(15, true, 1),
    color: '#000',
    marginLeft: 7,
  },
  hashTageTitle:
  {
    fontSize: deviceBasedDynamicDimension(15, true, 1),
    color: '#000',
    marginLeft: 7,
    fontWeight: '700'
  },
  allTrendTxtView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgListContainer: {
    marginTop: deviceBasedDynamicDimension(10, true, 1),
  },
  imgListStyle: {
    height: deviceBasedDynamicDimension(120, true, 1),
    width: deviceBasedDynamicDimension(90, true, 1),
    marginHorizontal: deviceBasedDynamicDimension(4, true, 1),
    marginVertical: deviceBasedDynamicDimension(4, true, 1),
  },
  tagNumberTxt: {
    backgroundColor: '#eeeeee',
    width: deviceBasedDynamicDimension(30, true, 1),
    height: deviceBasedDynamicDimension(20, true, 1),
    textAlign: "center"
  },
  flatlistStyle: {
    marginVertical: deviceBasedDynamicDimension(10, true, 1)
  },
  closeSquare: {
    height: deviceBasedDynamicDimension(10, true, 1),
    width: deviceBasedDynamicDimension(10, true, 1),
  },
  resentTxt: {
    fontSize: deviceBasedDynamicDimension(15, true, 1),
    fontWeight: '700'
  },
  seeAllTxt: {
    fontSize: deviceBasedDynamicDimension(15, true, 1),
    fontWeight: '700',
    color: COLORS.yellow,
  },
  trendNumberTxt: {
    backgroundColor: '#eeeeee',
    width: deviceBasedDynamicDimension(30, true, 1), height: deviceBasedDynamicDimension(20, true, 1),
    textAlign: "center"
  },
  signinBtnStyle: {
    borderRadius: deviceBasedDynamicDimension(50, false, 1),
    paddingHorizontal: deviceBasedDynamicDimension(20, true, 1),
    paddingVertical: deviceBasedDynamicDimension(5, false, 1),
    alignSelf: "flex-end"
  },
  signInBtn: {
    borderColor: "#FFC925",
    backgroundColor: COLORS.yellow,
    borderWidth: 1
  },
  filledSigninBtn: {
    backgroundColor: COLORS.yellow
  },
  btnContainer: {
    marginVertical: deviceBasedDynamicDimension(10, false, 1)
  },
  btnTitleStyle: {
    fontSize: deviceBasedDynamicDimension(14, true, 1),
    fontWeight: "bold",
    color: "black"
  },
  slectedBtnTitleStyle: {
    fontSize: deviceBasedDynamicDimension(14, true, 1),
    fontWeight: "400",
    color: "#fff"
  },


  post_container: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRightWidth: 0,
    borderTopWidth: 2,
  },
  post_image: {
    height: Scale(240),
    width: responsiveScreenWidth(100) / 3,
  },
});
// Customizable Area End
