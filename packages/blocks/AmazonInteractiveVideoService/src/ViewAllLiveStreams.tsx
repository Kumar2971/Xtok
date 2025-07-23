// Customizable Area Start
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback, View, Text, TouchableOpacity, Image,FlatList, SafeAreaView, RefreshControl
} from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
import React from "react";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import Scale from "../../../components/src/Scale";
import FONTS from '../../../components/src/Fonts/Fonts';
import { video,avatar,imgLeftArrow} from "./assets";
import ViewAllLiveController, { Props } from "./ViewAllLiveController";
import {translate} from "../../../components/src/i18n/translate";
// Customizable Area End

export default class ViewAllLiveStreams extends ViewAllLiveController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        Dimensions.addEventListener("change", () => {
            MergeEngineUtilities.init(
                artBoardHeightOrg,
                artBoardWidthOrg,
                Dimensions.get("window").height,
                Dimensions.get("window").width,
            );
            this.forceUpdate();
        });
        // Customizable Area End
    }

    // Customizable Area Start
    header = () => {
        return (<View style={styles.header}>
            <TouchableOpacity testID="left" onPress={() => this.props.navigation.goBack()}>
                <Image source={imgLeftArrow} style={[styles.backarrowStyle, , this.state.language == "ar" && {transform: [{ rotate: "180deg" }]}]} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{translate("live")} </Text>
            <View />
        </View>)
    }
    getLiveThumbnail = (data : any) => {
        const thumbnail = data?.stage_image;
        const profile_image = data?.account_profile_photo;
        if(thumbnail){
            return thumbnail;
        }else if(profile_image){
            return profile_image;
        }
        return "";
    }
    trendingLive = (type:any) => {
        return (
            <View style={styles.wrapContainer}>
                <View style={styles.topRaw}>
                    <View style={styles.topRaw}>
                        <View style={styles.videoIconcontainer}>
                            <Image source={video} style={styles.videicon} />
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.subheaderText}>{type == "Live" && translate("live")}</Text>
                            <Text style={styles.subheaderText2}>{translate("Trending")} {type == "Live" && translate("live")}</Text>
                        </View>
                    </View>
                    <View >
                   { this.state.singleliveresult?.meta?.pagination?.total_count>0 &&
                    <Text style={{backgroundColor:"rgba(0,0,0,0.1)",padding:5,marginTop:3}}>{this.state.singleliveresult?.meta?.pagination?.total_count}</Text>
                     }
                    </View>

                </View>
                <FlatList
                testID="flatlistTwo"
                onEndReachedThreshold={ 0.1}
                onEndReached={()=>
                  {
                     if(this.state.singleliveresult?.meta?.pagination?.current_page<this.state.singleliveresult?.meta?.pagination?.total_pages){
                    this.getLiveData(this.state.singleliveresult.meta?.pagination?.current_page+1)
                  }
                }

                }
                numColumns={2}
                    data={this.state.singleliveresultData}
                    renderItem={({item}:{item:any}) => {
                        return (
                            <TouchableOpacity testID="navigateButton" style={styles.itemcontainer}
                            onPress={()=>this.liveViewPage(item)}
                            >
                                  {type=="Live"&&<Text style={styles.liveText}>Live</Text>}
                                 <Image style={styles.imageProp} source={{uri: this.getLiveThumbnail(item)}} />
                                 <View style={styles.bottomdetails}>
                                 <Image style={styles.avatarIcon} source={(item?.account_profile_photo == null) ? avatar : { uri: item.account_profile_photo }}/>
                                 <Text style={[styles.subheaderText2,styles.liveTitle]} numberOfLines={2}>{item?.stage_title ?? ""}</Text>
                                 </View>
                            </TouchableOpacity>
                        )
                    }}

                 keyExtractor={(item:any) => item.id}
                />
            </View>
        )
    }

    trendingChallenge = (type:any) => {
        return (
            <View style={styles.wrapContainer}>
                <View style={styles.topRaw}>
                    <View style={styles.topRaw}>
                        <View style={styles.videoIconcontainer}>
                            <Image source={video} style={styles.videicon} />
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.subheaderText}>{type == "Challenge" && translate("challenge")}</Text>
                            <Text style={styles.subheaderText2}>{translate("Trending")} {type =='Challenge' && translate("challenge")}</Text>
                        </View>
                    </View>
                    <View >
                   { this.state.singleChallengeresult?.meta?.pagination?.total_count>0 &&
                    <Text style={{backgroundColor:"rgba(0,0,0,0.1)",padding:5,marginTop:3}}>{this.state.singleChallengeresult?.meta?.pagination?.total_count}</Text>
                     }
                    </View>

                </View>
                <FlatList
                testID="flatlistOne"
                onEndReachedThreshold={ 0.1}
                onEndReached={() => {
                    this.setState({loader: true})
                    if (this.state.singleChallengeresult?.meta?.pagination?.current_page < this.state.singleChallengeresult?.meta?.pagination?.total_pages) {
                        this.getLiveChallengesData(this.state.singleChallengeresult.meta?.pagination?.current_page + 1)
                    }
                }

                }
                numColumns={2}
                data={this.state.singleChallengeresultData}
                renderItem={({item}:{item:any}) => {
                   return (
                       <TouchableOpacity testID="navigateButton" style={styles.itemcontainer}
                           onPress={() => this.liveViewPage(item)}
                       >
                           {type == "Challenge" && <Text style={styles.liveText}>Challenge</Text>}
                           <Image source={{ uri: this.getLiveThumbnail(item) }} style={styles.imageProp} />
                           <View style={styles.bottomdetails}>
                               <Image source={(item?.account_profile_photo == null) ? avatar : { uri: item.account_profile_photo }} style={{ width: Scale(30), height: Scale(30), borderRadius: Scale(30), }} />
                               <Text numberOfLines={2} style={[styles.subheaderText2,styles.liveTitle]}>{item?.stage_title ?? ""}</Text>
                           </View>
                       </TouchableOpacity>
                   )
                }}

                 keyExtractor={(item:any) => item.id}
                />
            </View>
        )
    }
    // Customizable Area End

    render() {
        // Customizable Area Start
        // Merge Engine - render - Start
          const type=this.props.route.params.type;
        return (
            <SafeAreaView style={{flex:1}}>
            {this.header()}
            <ScrollView refreshControl={
                <RefreshControl
                    onRefresh={()=>{
                        this.setState({onRefresh : true})
                        if(type === "challenge"){
                            this.getLiveChallengesData(1);
                        }else{
                            this.getLiveData(1);
                        }
                    }}
                    refreshing={this.state.onRefresh}/>
            } contentContainerStyle={styles.wrapContainer} keyboardShouldPersistTaps="always">
                <TouchableWithoutFeedback
                    testID="touchable"
                    onPress={() => {
                        this.hideKeyboard();
                    }}>
                        <View style={styles.container}>
                        {type==="Challenge"?
                            this.trendingChallenge("Challenge") :
                            this.trendingLive("Live") }
                        </View>
                </TouchableWithoutFeedback>
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
        padding: 16,
        // marginTop: 20,
    },
    wrapContainer : {flex:1},
    loaderContainer: {
        backgroundColor: "black",
        justifyContent: "center", alignItems: "center", flex: 1,
        height: Dimensions.get("window").height,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: Scale(15),
        height: Scale(40),
        width: '100%',
        borderBottomColor: "#B7BBC0",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    headerText: {
        fontSize: Scale(18),
        fontFamily: FONTS.MontserratSemiBold,
    },
    backarrowStyle: {
        width: Scale(25),
        height: Scale(25),
        resizeMode: "contain",
    },
    backarrowStyle_ar: {
        transform:[{rotate:"180deg"}]
    },
    videoIconcontainer: {
        width: Scale(38),
        height: Scale(38),
        borderRadius: 35,
        borderWidth: 1,
        justifyContent: "center",
        alignContent: "center",
        paddingLeft: 2,
        marginLeft:3,
        marginTop:2,
    },
    videicon: {
        width: Scale(30),
        height: Scale(28),
        resizeMode: "contain",
    },
    topRaw: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        marginBottom:8
    },
    subheaderText: {
        fontSize: Scale(18),
        fontFamily: FONTS.MontserratSemiBold,
        textAlign:"left",
    },
    subheaderText2: {
        fontSize: Scale(15),
        fontFamily: FONTS.MontserratSemiBold,
        color: "grey",
        textAlign:"left",
    },
    liveTitle : {
        color:"white",
        flex:1,
        marginLeft: 5
    },
    subheaderText3: {
        fontSize: Scale(10),
        fontFamily: FONTS.MontserratSemiBold,

    },
    imageProp:{
        width: Scale(150),
        resizeMode: 'cover',
        height:Scale(200),
        backgroundColor:"grey"
    },
    liveText:{
        backgroundColor:"rgba(0,0,0,1)",
        position:"absolute",zIndex:1000,
        left:0,
        margin:10,
        padding:5,
        color:"#FFC925",
        fontFamily: FONTS.MontserratRegular,
        fontSize: Scale(10),
    },
    bottomdetails:{
        position:'absolute',
        zIndex:1000,
        left:0,
        bottom:0,
        margin:10,
        padding:5,
        color:"#FFC925",
        fontFamily: FONTS.MontserratRegular,
        fontSize: Scale(10),
        flexDirection:"row",
        alignItems:"center"
    },
    avatarIcon : { 
        width: Scale(30), 
        height: Scale(30), 
        borderRadius: Scale(30), 
    },
    itemcontainer: {
        //  justifyContent: "space-between",
        // alignItems: "center",
         paddingVertical: Scale(5),
         paddingHorizontal: Scale(5),
         marginBottom: 8
         },
    flatList : { paddingBottom : 30 },


});
  // Customizable Area End