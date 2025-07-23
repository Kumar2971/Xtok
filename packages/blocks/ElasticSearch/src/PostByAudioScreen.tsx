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
import { imgLeftArrow, sounds } from "./assets";

import Scale from "../../../components/src/Scale";

export default class PostByAudioScreen extends ElasticSearchController {
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
  componentDidMount():any{
    super.componentDidMount();
      this.getAudioPosts()
  }

  emptyList = () => {
    return (
      <View style={styles.emptyList}>
        <Text style={styles.noAudio}>{`No posts for Audio`}</Text>
      </View>
    );
  };
  renderItem = (data: any) => {
    const {item} = data
    return (
      <TouchableOpacity
        style={styles.post_container}
        onPress={() => {
          this.props.navigation.navigate('Comments', {
            type: 'SearchActivity',
            account_id: item?.attributes?.account_id,
            post_id: item?.id,
            isSearchFrom: 'audio_'+this.state.audioPostType,
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

  audioContainer = () => {
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <View style={{ alignItems: 'center', marginHorizontal: Scale(0) }}>
          <View style={{ width: '90%', flexDirection: 'row', marginBottom: Scale(20), marginHorizontal: Scale(15), marginTop: Scale(15) }}>
          <Image
            source={this.props.route?.params?.data?.image ? {uri: this.props.route?.params?.data?.image } : sounds}
            style={[styles.detailIcon, !this.props.route?.params?.data?.image && { tintColor: COLORS.yellow }]}
          />
          <View style={{ marginLeft: Scale(15), flex: 1 }} >
            <Text style={[styles.default_golaviUserTxt, { maxWidth: '100%', paddingBottom: Scale(10) }]} numberOfLines={2}>
              {this.getAudioTitle()}
              </Text>
            <Text style={styles.locationText} numberOfLines={2}>
              {`${this.state.posts} ${this.state.posts > 1 ? translate("postsTextInSmallLetter") : translate("post")}`}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 10 }}>

          <TouchableOpacity testID='top' disabled={this.state.audioPostType === "top"} onPress={() => this.onSelectAuidoPostType('top')} style={[styles.headerContainer,this.state.audioPostType === "top" ? styles.selectedTitle : styles.unselectedTitle]}>
            <Text style={[styles.textGray, this.state.audioPostType === 'top' && styles.selectedTitleTxt]}>{translate("top")}</Text>
          </TouchableOpacity>
          <TouchableOpacity testID='trending' disabled={this.state.audioPostType === "trending"} onPress={() => this.onSelectAuidoPostType('trending')} style={[styles.headerContainer,this.state.audioPostType == 'trending' ? styles.selectedTitle : styles.unselectedTitle]}>
            <Text style={[styles.textGray, this.state.audioPostType === 'trending' && styles.selectedTitleTxt]}>{translate("Trending")}</Text>
          </TouchableOpacity >
          <TouchableOpacity testID='recent' disabled={this.state.audioPostType === "recent"} onPress={() =>
            this.onSelectAuidoPostType('recent')} style={[styles.headerContainer,this.state.audioPostType == 'recent' ? styles.selectedTitle : styles.unselectedTitle]}>
            <Text style={[styles.textGray, this.state.audioPostType === 'recent' && styles.selectedTitleTxt]}>{translate("recent")}</Text>
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
            data={this.state.audioPosts ?? []}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ListEmptyComponent={this.emptyList()}
            contentContainerStyle={{paddingVertical: Scale(10)}}
            onEndReachedThreshold={Platform.OS == "ios" ? 0 : 0.1}
            onEndReached={this.audioPostsOnEndReached}
          />
        )}
      </View>)
  }

  // Customizable Area End
  render() {
    // Customizable Area Start
    const { language } = this.state;
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
        <View style={styles.separator} />
        {this.audioContainer()}
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
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  }, detailIcon: {
    width: Scale(60),
    height: Scale(60),
    paddingBottom: Scale(0),
    resizeMode: "contain",
  }, 
  noAudio: { fontWeight: "bold" },
  title: {
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  }, textGray: {
    fontSize: deviceBasedDynamicDimension(18, true, 1),
    textAlign: "center",
    marginVertical: Scale(15),
    color: '#C9C9C9',
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems:"center",
    marginTop: deviceBasedDynamicDimension(7, true, 1),
    marginBottom: deviceBasedDynamicDimension(20, true, 1),
    paddingHorizontal: Scale(10),
  },
  emptyList: {
	justifyContent: "center",
	alignItems: "center",
	marginTop: Scale(50),
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
  titleStyle: {
    fontWeight: "bold",
    fontSize: Scale(18),
    marginRight: deviceBasedDynamicDimension(15, true, 1),
    color: "#000000"
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  default_golaviUserTxt: {
    fontSize: deviceBasedDynamicDimension(16, true, 1),
    fontWeight: '700',
    textAlign: "left"
  },
  searchInputStyle: {
    backgroundColor: "#EEEEEE",
    height: deviceBasedDynamicDimension(45, true, 1),
  },
  locationText: {
    maxWidth: '85%',
    lineHeight: Scale(26),
    fontSize: deviceBasedDynamicDimension(14, true, 1),
    textAlign:"left"
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
  headerContainer: {
	flex: 0.8, 
	width: 50,
	alignSelf: "center",
  },
  selectedTitle: { 
	borderBottomWidth: 3 , 
	borderBottomColor: COLORS.yellow,
  },
  selectedTitleTxt: { 
	fontWeight: 'bold', 
	color: COLORS.yellow 
  },
  unselectedTitle: { 
	borderBottomWidth: 2, 
	borderBottomColor: '#EEEEEE',
  },
});
// Customizable Area End
