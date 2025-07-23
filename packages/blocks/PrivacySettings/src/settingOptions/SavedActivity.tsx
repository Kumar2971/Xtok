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
  Platform,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { translate } from "../../../../components/src/i18n/translate";
import { getStorageData } from "framework/src/Utilities";

//@ts-ignore
import {backarrow,imgLeftArrow,emptySearch} from "../assets";
// Customizable Area End
import settingOptionsCommonController, { Props } from "./settingOptionsCommonController";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";
const { width } = Dimensions.get("window");
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
export default class SavedActivity extends settingOptionsCommonController {
  // Customizable Area Start
  async componentDidMount() {
    const language = await getStorageData("SelectedLng");
    this.getSavedPosts()
    this.setState({ language: language });
    this.props.navigation.addListener('focus',async()=>{
      const language = await getStorageData("SelectedLng");
      this.setState({ language: language });
      this.getSavedPosts()
    })
    this.props.navigation.addListener('blur',()=>{
      this.setState({likeActivityPosts:[],postsLoading:true})
    })
  }
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    // setNavigator(props.navigation)
  }

  topHeaderSettings = () => {
    return (
      <View style={[styles.headercontainer, styles.divider]}>
      <TouchableOpacity testID="activty" style={{flex:1}} onPress={() => this.props.navigation.navigate('YourActivity')}>
        <Image source={this.state.language =='ar' ? backarrow : imgLeftArrow} style={this.state.language =='ar' ? styles.backarrow_style : styles.backarrow_style_en} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{translate("saved")}</Text>
              <TouchableOpacity testID="newest" onPress={() => {
                console.log(this.state.sortingOption)
              if (this.state.sortingOption==='Newest') {
                this.setState({
                  sortingOption:'Oldest',
                  postsLoading:true
                },()=>{
                  this.getLikesPosts()
                  this.getSavedPosts()
                  this.getNoInterestedPosts()
                  this.getCommentsActivity()
                })
              } else {
                this.setState({
                  sortingOption:'Newest',
                  postsLoading:true
                },()=>{
                  this.getLikesPosts()
                  this.getSavedPosts()
                  this.getNoInterestedPosts()
                  this.getCommentsActivity()
                })
              }

            }} style={styles.titleWrapper}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={styles.textNewest}>{this.state.sortingOption==='Newest'?'Newest':'Oldest'}</Text>
                <Image source={backarrow} style={[styles.icoNewest, {transform: [{ rotate: this.state.sortingOption==='Newest' ? '-90deg' : '90deg'}]}]} resizeMode={'contain'} />
              </View>
            </TouchableOpacity>
      <View/>
    </View>
    );
  };

  item = () => {
    return (
      <View style={{paddingHorizontal:Scale(15)}}>

      </View>
    )
  }
  // Customizable Area Start
  emptyList = () =>(
      <View style={styles.listContainer}>
        <Image style={styles.noSearchIcon} source={emptySearch}/>
        <Text style={styles.noPost}>{translate("no_Post_found")}</Text>
      </View>
    );

  renderItem=(data:any)=>{
    const {item}=data
    return (
        <TouchableOpacity  testID="onPressrenderItem" style={styles.post_container} onPress={()=>{
          this.props.navigation.navigate('Comments',{
            type:'SavedActivity',
            account_id:item?.attributes?.account_id,
            post_id:item?.attributes.id
          })
        }}>
        <Image source={{uri:item?.attributes?.post_medias?.thumnails?.[0]}} style={styles.post_image} />
        </TouchableOpacity>
    )
  }

  renderNoPost = () => {
    if(!this.state.postsLoading ){
      return this.emptyList();
    }
    return <ActivityIndicator size="large" color="black" />
  }
  // Customizable Area End
  render() {
    // Customizable Area Start
    // Customizable Area End
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.listContainer}>
          {/* Customizable Area Start */}
          {this.topHeaderSettings()}
          {this.state.savedActivityPosts?.length > 0 ?
          <FlatList
            testID="flatListId"
             numColumns={3}
             data={this.state.savedActivityPosts}
             renderItem={this.renderItem}
             keyExtractor={this.keyExtractor}
             refreshing={this.state.postsLoading}
             onRefresh={this.getSavedPosts}
             refreshControl={<RefreshControl refreshing={this.state.postsLoading}  onRefresh={this.getSavedPosts} />}
          />
          : this.renderNoPost()}
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
    width:"100%",
    maxWidth: 650,
  },
  headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    paddingHorizontal: Scale(15),
    height: Scale(40),
    width: '100%',
  },
  headerText: {
    fontSize:Scale(18),
    fontWeight:'bold',
    flex: 1,
    textAlign: 'center',
  },
  titleWrapper: { flex: 1 },
  divider: {
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  backarrow_style: {
    width: Scale(20),
    height: Scale(18),
    resizeMode: "contain",
    transform: [{ rotate: '180deg' }]
  },
  backarrow_style_en: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: "contain",
  },
  post_container:{
    flex:1,
    height:Scale(240),
    maxWidth:responsiveScreenWidth(100)/3,
    borderWidth:1,
    borderColor:'#D0D0D0',
    borderRightWidth:0,
    borderTopWidth:2,
  },
  post_image:{
    height:Scale(240),
  },
  icoNewest: {
    height: 14,
    width: 14,
    marginLeft: 8,
  },
  textNewest: {
    fontSize: 14,
    textAlign: "right",
    fontWeight: "bold"
  },
  noSearchIcon: {
    height:"40%",
    width:"40%",
    tintColor:"gray",
    resizeMode:"contain",
    alignSelf:"center"
  },
  listContainer: {flex:1},
  noPost: {
    fontSize:Scale(16),
    fontWeight:"bold",
    color:"black",
    alignSelf:"center"
  },

});
// Customizable Area End
