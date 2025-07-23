import * as React from 'react';

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  RefreshControl,
} from "react-native";

import { SearchBar } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Feather";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
import { CloseSquare, HashTagGrey, imgArrow, imgRightArrow, LocationGrey, ProfileYellow, User, Voice, imgLeftArrow, sounds } from "./assets";
// Customizable Area End

import ElasticSearchController, {
  Props,
} from "./ElasticSearchController";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import { COLORS } from "../../../framework/src/Globals";
import Scale from "../../../components/src/Scale";
import { imgSearch } from '../../comments/src/assets';
export const configJSON = require("./config");
const { width, height } = Dimensions.get("window");
import { translate } from "../../../components/src/i18n/translate";

export default class ElasticSearch extends ElasticSearchController {
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

  //   locationContainer=()=>{
  //     const postsData=this.state.locationPosts?.map((item,index)=>{
  //       return {source:item.attributes.photo,views:item.attributes.post_likes_count,impressions:item.attributes.post_comment_count}
  //     })
  //     return(
  //       <View style={{flex:1, width:'100%',marginHorizontal:Scale(0), alignItems:'center'}}>
  //         <View style={{ width:'90%', flexDirection:'row',marginBottom:Scale(20),marginHorizontal:Scale(15)}}>
  //         <Image
  //                     source={LocationGrey}
  //            style={[styles.detailIcon,{tintColor:COLORS.yellow}]}
  //          />
  //         <View style={{marginLeft:Scale(15)}} >
  //         <Text style={[styles.default_golaviUserTxt,{maxWidth:'100%', paddingBottom:Scale(10)}]} numberOfLines={2}>
  //               {this.state.location}</Text>
  //               <Text style={styles.locationText} numberOfLines={2}>1.137 posts</Text>
  //               </View>
  //         </View>

  //     <MapView
  //     style={styles.mapView}
  //   initialRegion={{
  //     latitude: 37.78825,
  //     longitude: -122.4324,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   }}/>
  //   <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal:10 }}>

  //   <TouchableOpacity disabled={this.state.quickFilter === "top"} onPress={() => this.onSelectQuickFilter('top')} style={{ borderBottomWidth: this.state.quickFilter === "top" ? 3 : 2,flex:0.8, width: 50, borderBottomColor: this.state.quickFilter === 'top' ? COLORS.yellow : '#EEEEEE', alignSelf: "center" }}>
  //   <Text style={[styles.textGray,this.state.quickFilter==='top'&&{fontWeight:'bold',color:COLORS.yellow}]}>Top</Text>
  //   </TouchableOpacity>
  //   <TouchableOpacity disabled={this.state.quickFilter === "trending"} onPress={() => this.onSelectQuickFilter('trending')} style={{borderBottomWidth: this.state.quickFilter === "trending" ? 3 : 2, flex:0.8,width: 50, borderBottomColor: this.state.quickFilter == 'trending' ? COLORS.yellow : '#EEEEEE' }}>
  //   <Text style={[styles.textGray,this.state.quickFilter==='trending'&&{fontWeight:'bold',color:COLORS.yellow}]}>Trending</Text>
  //  </TouchableOpacity >
  //   <TouchableOpacity disabled={this.state.quickFilter === "recent"} onPress={() =>
  //     this.onSelectQuickFilter('recent')} style={{ borderBottomWidth: this.state.quickFilter === "recent" ? 3 : 2, flex:0.8, borderBottomColor: this.state.quickFilter == 'recent' ? COLORS.yellow : '#EEEEEE', alignSelf: "center" }}>
  //    <Text style={[styles.textGray,this.state.quickFilter==='recent'&&{fontWeight:'bold', color:COLORS.yellow}]}>Recent</Text>
  //   </TouchableOpacity>
  // </View>
  // {postsData&&postsData.length>0&& this.contentsSharedBlocks({data:postsData})}
  //   </View>)
  //   }

  contentsSharedBlocks = ({
    data,

  }: {
    data: { source: string; views: number; impressions: number }[];

  }) => {

    return (
      <View style={[styles.contentsSharedMainContainer]}>


        <FlatList
          data={data}
          numColumns={3}
          style={{ alignContent: 'flex-start' }}
          contentContainerStyle={{ paddingBottom: 100, justifyContent: 'flex-start' }}
          renderItem={({
            item
          }: {
            item: { source: string; views: number; impressions: number };
          }) => (
            <View style={[styles.imageContainerFull]}>
              <Image
                source={{
                  uri: item?.source || undefined
                }}
                style={{
                  resizeMode: "cover",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "black" //to be removed later
                }}
              />
              <View style={styles.viewsInfo}>
                <Icon name="play" size={Scale(26)} color="#ffffff" />
                <Text style={styles.whiteText}>{item.views}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  navigateByLatLong = (item: any) => {
    const locationName = item?.name;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationName)}&key=${configJSON.autocompleteAPIKey}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK' && data.results.length > 0) {
          const firstResult = data.results[0];
          this.props.navigation.navigate('PostsByLocationScreen', {
            location: {description:item?.name},
            locationDetails: firstResult
          })
        } else {
          console.log('Geocoding not successful');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
      return;
  };
  renderAudioDetails = (item:any) => {
    return (
      <View style={{ flex: 1, paddingHorizontal: deviceBasedDynamicDimension(10, true, 1) }}>
        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: deviceBasedDynamicDimension(10, true, 1), flex: 1 }}
          onPress={() => {
            this.onPressSaveSearchHistory(item?.id,item?.searchable_type,null);
            this.props.navigation.navigate("PostByAudioScreen", { data: item })
          }} >

          <View style={{ flexDirection: "row", alignItems: "center" }}>
           <Image source={item?.image ? {uri:item?.image} : sounds} style={[styles.imgFlatList,!item?.image && styles.audioIcon]} resizeMode="cover" />
            <View style={{ marginHorizontal: deviceBasedDynamicDimension(10, true, 1), flexDirection: "column", alignItems: 'flex-start' }}>
             <Text style={styles.default_golaviUserTxt} numberOfLines={1}>{item?.title ? item?.title : translate("noTitle")}</Text> 
              {item?.artist ? <View style={{ width: '80%' }}><Text numberOfLines={2} >{item?.artist}</Text></View>:null}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  
  renderItem = (item: any) => {
    return (
      <View style={{ flex: 1, paddingHorizontal: deviceBasedDynamicDimension(10, true, 1) }}>
        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: deviceBasedDynamicDimension(10, true, 1), flex: 1 }}
          onPress={() => {
            let dataAccount = {
              attributes: {
                account_id: item?.id,
              }
            }
            this.onPressSaveSearchHistory(item?.id, "AccountBlock::Account",null);
            this.props.navigation.navigate("UserProfileBasicBlock", { data: dataAccount })
          }} >

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {
              item.photo == null ? <Image source={User} style={styles.imgFlatList} resizeMode="cover" /> :
                <Image source={{ uri: item?.photo }} style={styles.imgFlatList} resizeMode='cover' />
            }
            <View style={{ marginHorizontal: deviceBasedDynamicDimension(10, true, 1), flexDirection: "column", alignItems: 'flex-start' }}>
              {item.user_name == null ? <Text style={styles.default_golaviUserTxt} numberOfLines={1}>{'golavi user'}
              </Text> : <Text style={styles.default_golaviUserTxt} numberOfLines={1}>
                {item?.user_name}</Text>
              }
              {item.bio == null ? <Text>{translate("noBio")}</Text> : <View style={{ width: '80%' }}><Text numberOfLines={2} >{item.bio}</Text></View>}
            </View>
          </View>

          <TouchableOpacity onPress={() => {

            let abc = {
              ...this.state.backendData,
              account: this.state.backendData?.account?.filter((items: any) => items?.id !== item?.id),
              // audio : this.state.backendData?.audio?.filter((items) => items?.id !== item?.id)
            }
            this.setState({
              backendData: abc
            },
            )
          }} style={{ justifyContent: 'center', alignItems: "center", }}>

          </TouchableOpacity>
          {!this.state.value ?
            <TouchableOpacity onPress={() => this.deletesingle(item?.id)} style={{ paddingTop: Scale(20) }}>
              <Image source={CloseSquare} style={[styles.closeSquare,]} />

            </TouchableOpacity>
            :
            null
          }

        </TouchableOpacity>
      </View>
    );
  };

  onPressProfileBtn = (item:any) => {
    let dataAccount = {
        attributes: {
            account_id: item?.id,
        }
    }
    this.props.navigation.navigate("UserProfileBasicBlock", {data: dataAccount})
  }

  userImage = (item:any) => {
    if(item.photo == null){
      return <Image source={User} style={styles.imgFlatList} resizeMode="cover"/>
    }else{
      return <Image source={{uri: item?.photo}} style={styles.imgFlatList} resizeMode='cover'/>
    }
  }

  userName = (item:any) => {
    if(item.name == null){
      return <Text style={styles.default_golaviUserTxt} numberOfLines={1}>{'golavi user'}</Text>
    }else {
      return <Text style={styles.default_golaviUserTxt} numberOfLines={1}>{item?.name}</Text>
    }
  }

  userBio = (item:any) => {
    if(item.bio == null){
      return <Text>{translate("noBio")}</Text> 
    }else{
      return(
        <View style={{width: '80%'}}><Text numberOfLines={2}>{item.bio}</Text></View>
      )
    }
  }

  closeBtn = (item:any) => {
    if(!this.state.value){
      return(
        <TouchableOpacity testID="crossBtn" onPress={() => this.deletesingle(item)} style={{paddingTop: Scale(20)}}>
          <Image source={CloseSquare} style={[styles.closeSquare]}/>
        </TouchableOpacity>
      )
    }else {
      return null;
    }
  }

  onPressHastagBtn = (item:any) => {
    if(item?.type === "audio"){
      this.props.navigation.navigate("PostByAudioScreen", { data: item });
      return;
    }
      const data = {
          hashTag: item?.name,
          posts: item?.post_count,
      }
      this.props.navigation.navigate("HashTagScreen", { data: data })
  }

  onPressLocationBtn = (item:any) => {
    if(item?.latitude && item?.longitude){
      const latLongDetails = {geometry: {location: {lat:parseFloat(item.latitude), lng: parseFloat(item.longitude)}}};
      this.props.navigation.navigate('PostsByLocationScreen', {
        location:{description: item?.name},
        locationDetails: latLongDetails,
      })
    }else{
      this.navigateByLatLong(item);
    }
  }

  renderRecentSearchItem = (item: any,index:number) => {
      if(item?.type === "account") {
          return (
              <View style={{flex: 1, paddingHorizontal: deviceBasedDynamicDimension(10, true, 1)}}>
                  <TouchableOpacity testID='profileBtn' style={styles.recentSearchContainer}
                  onPress={() => { this.onPressProfileBtn(item) }}>

                      <View style={styles.recentItemStyle}>
                          {this.userImage(item)}
                          <View style={styles.recentAccount}>
                              {this.userName(item)}
                              {this.userBio(item)}
                          </View>
                      </View>

                      <TouchableOpacity onPress={() => {

                          let abc = {
                              ...this.state.backendData,
                              account: this.state.backendData?.account?.filter((items: any) => items?.id !== item?.id),
                              // audio : this.state.backendData?.audio?.filter((items) => items?.id !== item?.id)
                          }
                          this.setState({
                                  backendData: abc
                              },
                          )
                      }} style={{justifyContent: 'center', alignItems: "center",}}>

                      </TouchableOpacity>
                      {this.closeBtn(item)}

                  </TouchableOpacity>
              </View>
          );
      } else if(item?.type === "hashtag" || item?.type === "audio") {
          return (
              <TouchableOpacity
                  testID='hashtagBtn'
                  style={styles.recentSearchHashTagContainer}
                  onPress={() => this.onPressHastagBtn(item)}
              >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                     <View style={{flex:1,flexDirection: "row",alignItems: "center"}}>
                      <Image source={item?.type === "audio" ? sounds : HashTagGrey} style={[styles.imageSearchHashTag, { tintColor: COLORS.yellow }]} />
                      <View style={styles.hashTagItems}>
                          <Text style={styles.textHashTag} numberOfLines={1}>{`${item?.type === "hashtag" ? '#' : ''}${item?.name}`}</Text>
                          <Text style={styles.subTextHashTag} numberOfLines={1}>{`${item?.post_count} ${translate(item?.post_count > 1 ? 'posts' : 'post')}`}</Text>
                      </View>
                     </View>
                      {this.closeBtn(item)}
                  </View>
              </TouchableOpacity>
          );
      } else if(item?.type === "location") {
        return (
            <TouchableOpacity
                testID='locationBtn'
                style={styles.recentSearchHashTagContainer}
                onPress={() => this.onPressLocationBtn(item)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{flex:1,flexDirection: "row",alignItems: "center"}}>
                  <Image source={LocationGrey} style={[styles.imageSearchHashTag, { tintColor: COLORS.yellow }]} />

                  <View style={styles.hashTagItems}>
                    <Text style={styles.textHashTag} numberOfLines={1}>{item?.name}</Text>
                    <Text style={styles.subTextHashTag} numberOfLines={1}>{`${item?.post_count?item?.post_count:0} ${translate(item?.post_count > 1 ? 'posts' : 'post')}`}</Text>
                  </View>
                </View>
                {this.closeBtn(item)}
              </View>
            </TouchableOpacity>
        );
      }
      return <></>
  };

  audioData = () => {
    if(this.state.colorId == "audio"){
      return  this.state.backendData?.audio;
    }else{
      return []
    }
  }

  renderHashTagAudioAccountFlatList = () => {
    if(this.state.colorId == 'hashtag'){ 
      return (
      <FlatList testID='hashtag'
        data={this.state.hashTagData}
        renderItem={({ item, index }: any) => this.renderHashTagItem(item)}
        refreshing={this.state.loader}
        onRefresh={() => {
          this.getHashTagList(this.state.value)
        }}
        onEndReachedThreshold={Platform.OS == "ios" ? 0 : 0.1}
        keyExtractor={(item: any) => item?.id}
        refreshControl={
          <RefreshControl
            refreshing={this.state.loader}
          />
        }
        style={styles.flatlistStyle}
      />
    )
    }else if(this.state.loader){
      return <ActivityIndicator size="small" color="black" />
    }
    return(
      <FlatList
        testID='audioDataList'
        data={this.state.colorId == "account" ? this.state.backendData?.account : this.audioData()}
        renderItem={({ item }: any) => this.state.colorId == "audio" ? this.renderAudioDetails(item) : this.renderItem(item)}
        keyExtractor={(item: any) => item?.id}
        ListEmptyComponent={()=>{
          return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: Scale(100) }}>
            <Text style={{ fontSize: Scale(18) }}>{translate("noResultsFound")}</Text>
          </View>
          )
        }
        }
        style={styles.flatlistStyle}
      />
    );
  }

  borderBottomWidthFunc = (value:any) => {
    if(this.state.colorId === value){
      return 3;
    }else {
      return 2;
    }
  }

  colorStyleFunc = (value:any) => {
    if(this.state.colorId === value){
      return COLORS.yellow;
    }else {
      return '#EEEEEE';
    }
  }

  renderFilterTabsAndData = () => {
    if(this.state.searchStatus === 'submit'){
    return (<View style={{ flex: 1,}}>
      {this.state.showTabs &&
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 10 }}>
          <TouchableOpacity testID='pressAcc'
            onPress={() => {
              this.onPressColor('account')
              this.onPressSearchFilter(this.state.value)
            }}
            style={{ borderBottomWidth: this.borderBottomWidthFunc("account"), flex: 0.8, width: 50, borderBottomColor: this.colorStyleFunc("account"), alignSelf: "center" }}>
            <Image source={ProfileYellow} style={{ height: 25, width: 25, tintColor: this.colorStyleFunc("account"), alignSelf: "center", marginBottom: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity testID='pressAudio'
            onPress={() => {
              this.onPressColor('audio')
              this.getAudioList(this.state.value);
            }}
            style={{ borderBottomWidth: this.borderBottomWidthFunc("audio"), flex: 0.8, width: 50, borderBottomColor: this.colorStyleFunc("audio"), alignSelf: "center" }}>
            <Image source={Voice} style={{ height: 25, width: 25, tintColor: this.colorStyleFunc("audio"), alignSelf: "center", marginBottom: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity testID='pressTag' onPress={() => {
            this.onPressColor('hashtag')
            this.getHashTagList(this.state.value)
          }} 
          style={{ borderBottomWidth: this.borderBottomWidthFunc("hashtag"), flex: 0.8, width: 50, borderBottomColor: this.colorStyleFunc("hashtag"), alignSelf: "center" }}>
          <Image source={HashTagGrey} style={{ height: 25, width: 25, tintColor: this.colorStyleFunc("hashtag"), alignSelf: "center", marginBottom: 10 }} />

          </TouchableOpacity >
          <TouchableOpacity testID='location' onPress={() => {
            this.onPressColor('location')
          }} 
          style={{ borderBottomWidth: this.borderBottomWidthFunc("location"), flex: 0.8, width: 50, borderBottomColor: this.colorStyleFunc("location"), alignSelf: "center" }}>
            <Image source={LocationGrey} style={{ height: 25, width: 25, tintColor: this.colorStyleFunc("location"), alignSelf: "center", marginBottom: 10 }} />
          </TouchableOpacity>
        </View>}
      {this.renderHashTagAudioAccountFlatList()}
    </View>
    )
    }
    return null;
  }


  renderHashTagItem = (item: any) => {
    return (
      <TouchableOpacity
        style={{
          marginVertical: deviceBasedDynamicDimension(20, true, 1),
          flex: 1
        }}
        onPress={() => {
          const data = {
            hashTag: item?.attributes?.name,
            posts: item?.attributes?.post_count,
          }
          this.onPressSaveSearchHistory(item?.id, "BxBlockTags::Tag", null);
          this.props.navigation.navigate("HashTagScreen", { data: data })
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={HashTagGrey} style={[styles.imageHashTag, { tintColor: COLORS.yellow }]} />
          <View style={{ marginHorizontal: deviceBasedDynamicDimension(15, true, 1), flexDirection: "column", width: '60%' }}>
            <Text style={styles.textHashTag} numberOfLines={1}>{`#${item?.attributes?.name}`}</Text>
            <Text style={styles.subTextHashTag} numberOfLines={1}>{`${item?.attributes?.post_count} ${translate(item?.attributes?.post_count > 1 ? 'posts' : 'post')}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderFocusedSearch = () => {
    return (
      <View>

              {this.state.value === "" ?
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                  }}>
                  <Text style={[styles.resentTxt, { paddingLeft: 10 }]}>{translate("recent")}</Text>
                  {this.state.toggleswitch ? (
                    <TouchableOpacity testID='seeAll' onPress={() =>
                      this.seeAll()}>
                      <Text style={[styles.seeAllTxt, { paddingRight: 10 }]}>{translate("see_All")}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity testID='clearAll' onPress={() => this.clearAll()}>
                      <Text style={[styles.seeAllTxt, { paddingRight: 10 }]}>{translate("clear_all")}</Text>
                    </TouchableOpacity>
                  )}

                </View> : null

              }

              <FlatList testID='recentHistory'
                data={
                  !this.state.value ?
                    this.state.recentSearchHistoryData :
                    this.state.backendData?.account?.concat(this.state?.backendData?.audio)
                }
                extraData={this.state.recentSearchHistoryData}
                renderItem={({ item, index }: any) => this.renderRecentSearchItem(item, index)}
                //@ts-ignore
                keyExtractor={item => item?.id}
                style={styles.flatlistStyle}
              />

              {
                this.state.loader && <>
                  <ActivityIndicator size="small" color="black" />
                </>
              }

            </View>
    )
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    const { recentSearchHistoryData, language } = this.state


    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerStyle}>
          <TouchableOpacity testID='backPress'
            style={styles.imgView}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image source={imgLeftArrow} style={[styles.backarrow_style_en, language == "ar" && { transform: [{ rotate: "180deg" }] }]} />
          </TouchableOpacity>
          <Text style={styles.titleStyle}>{translate("search")}</Text>
          {/* <View></View> */}
          <View />
        </View>
        <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{flexGrow:1}} bounces={false} showsVerticalScrollIndicator={false}>

          <View style={styles.separator} />
          {this.state.colorId === 'location' ?
            <View style={[styles.searchAndScanContainer, { marginTop: Scale(12), marginBottom: Scale(20) }]}>

              <Image
                style={[styles.searchIcon, language==="ar" ? styles.searchIcon_ar : styles.searchIcon_en]}
                source={imgSearch}
              />
              <GooglePlacesAutocomplete
                placeholder={translate("type_an_address")}
                query={{ key: configJSON.autocompleteAPIKey }}
                onPress={(data, details = null) => {
                  this.setState({ location: data.description });
                  this.onPressSaveSearchHistory(null,"BxBlockLocation::LocationHistory", data?.description)
                  this.props.navigation.navigate('PostsByLocationScreen', {
                    location: data,
                    locationDetails: details
                  })
                }}

                styles={{
                  container: {
                    flex: 1,

                  },
                  textInput: [styles.mapSearchInput,language==="ar" && styles.mapSearchInput_ar],
                  description: {
                    color: '#000',
                    fontSize: 16,
                  },
                  predefinedPlacesDescription: {
                    color: '#3caf50',
                  },
                  row: language==="ar" && styles.rowItems
                }}
                fetchDetails={true}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('no results')}
                textInputProps={{
                  // onFocus:() => this.onPressSearch(),
                  autoFocus: true,
                  blurOnSubmit: false,
                  onChangeText:(text)=>{
                    this.setState({showTabs: text?.length === 0})
                  },
                }}

              /></View>
            :
            <View pointerEvents={this.state.loader ? "none" : "auto"} style={styles.searchAndScanContainer}>



              <SearchBar testID='search'
                placeholder={translate("search")}
                platform={"default"}
                searchIcon={<AntDesign name="search1" size={20} style={{ padding: 10 }} />}
                inputStyle={this.state.language == "ar" && styles.inputTextRight}
                onChangeText={text => this.onPressSearchFilter(text)}
                onSubmitEditing={() => this.submitEditing()}
                onCancel={() => this.onPressCancleEditing()}
                autoCorrect={false}
                value={this.state.value}
                containerStyle={[styles.searchContainerStyle]}
                inputContainerStyle={[styles.searchInputStyle]}
              />
              {/* <Image source={ScanIcon} style={styles.scanContainer} /> */}
            </View>
          }
          {this.state.searchStatus === 'focus' ?
            this.renderFocusedSearch()
            : this.renderFilterTabsAndData()
          }
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
    padding: 8,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
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
    height: (width / 3) * 1.5
  }, detailIcon: {
    width: Scale(60),
    height: Scale(60),
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
  searchIcon: {
    top: Scale(13),
    zIndex: 100230,
    position:'absolute',
    width: Scale(20),
    height: Scale(20),
    tintColor: "#a4a4a4",
  },
  searchIcon_ar: {
    right: Scale(18)
  },
  searchIcon_en: {
    left: Scale(18)
  },
  mapSearchInput: {
    marginHorizontal: 10,
    fontSize: Scale(18),
    paddingLeft: Scale(35),
    height: Scale(46),
    backgroundColor: '#edebeb',
    textAlign:"left"
  },
  mapSearchInput_ar: {
    paddingRight: Scale(35),
  },
  rowItems: {
    flexDirection:"row-reverse",
  },
  title: {
    // marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  }, textGray: {
    fontSize: deviceBasedDynamicDimension(18, true, 1),
    textAlign: "center",
    marginVertical: Scale(15),
    color: '#C9C9C9'

  },
  // title: {
  //   fontSize: deviceBasedDynamicDimension(14 , true , 1)
  // },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginTop: deviceBasedDynamicDimension(7, true, 1),
    marginBottom: deviceBasedDynamicDimension(20, true, 1),
    paddingHorizontal: Scale(5),
  },
  imgStyle: {
    height: "100%",
    width: "100%",
    resizeMode: "contain"
  },
  backarrow_style_en: {
    width: Scale(25),
    height: Scale(25),
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
  audioIcon:{
    tintColor:"black",
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
  mainSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  searchAndScanContainer: {
    flexDirection: 'row',
    alignSelf: "center",
    justifyContent: "space-between"
  },
  default_golaviUserTxt:
  {
    fontSize: deviceBasedDynamicDimension(16, true, 1),
    fontWeight: '700'
  },
  imageHashTag: {
    height: deviceBasedDynamicDimension(35, true, 1),
    width: deviceBasedDynamicDimension(35, true, 1),
    marginLeft: deviceBasedDynamicDimension(15, true, 1)
  },
  textHashTag: {
    color: '#000',
    fontSize: deviceBasedDynamicDimension(16, true, 1),
    fontWeight: '700',
    textAlign:"left"
  },
  subTextHashTag: {
    color: '#838383',
    fontSize: deviceBasedDynamicDimension(14, true, 1),
    fontWeight: '500',
    textAlign:"left"
  },
  searchContainerStyle: {
    marginTop: 10,
    width: '95%',
    backgroundColor: "transparent",
    padding: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginBottom: deviceBasedDynamicDimension(20, false, 1),
    borderRadius: 10,

  },
  searchInputStyle: {
    backgroundColor: "#EEEEEE",
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
    // marginVertical: 10,
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
    //fontFamily: 'Montserrat-Regular'
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
  inputTextRight: {
    textAlign: "right"
    // flexDirection:'row-reverse'
  },
    imageSearchHashTag: {
        height: deviceBasedDynamicDimension(40, true, 1),
        width: deviceBasedDynamicDimension(40, true, 1),
        marginLeft: deviceBasedDynamicDimension(15, true, 1)
    },
  recentSearchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: deviceBasedDynamicDimension(10, true, 1),
    flex: 1
  },
  recentItemStyle: {
    flexDirection: "row", alignItems: "center",flexGrow:1
  },
  recentAccount: {
    marginHorizontal: deviceBasedDynamicDimension(10, true, 1),
    flexDirection: "column",
    alignItems: 'flex-start',
    flexGrow:1
  },
  recentSearchHashTagContainer:{
    marginVertical: deviceBasedDynamicDimension(20, true, 1),
    paddingRight: deviceBasedDynamicDimension(10, true, 1),
    flex: 1
  },
  hashTagItems:{
    marginHorizontal: deviceBasedDynamicDimension(15, true, 1), flexDirection: "column", width: '60%'
  },
  locationInput_Ar: {
    paddingRight:33
  },

});
// Customizable Area End
