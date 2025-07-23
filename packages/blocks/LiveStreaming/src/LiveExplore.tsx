// Customizable Area Start
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback, View, Text, TouchableOpacity, Image, FlatList, SafeAreaView
} from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
import React from "react";
import LiveExploreControll, { Props } from "./LiveExploreControll";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import Scale from "../../../components/src/Scale";
import FONTS from '../../../components/src/Fonts/Fonts';
import { translate } from "../../../components/src/i18n/translate";
import { rightArrow } from "../../helpcentre/src/assets";
import { video, avatar, challenge, imgLeftArrow } from "./assets";
// Customizable Area End

export default class LiveExplore extends LiveExploreControll {
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
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                {/* <Image source={imgLeftArrow} style={[styles.backarrowStyle_en, this.state.language == "ar" && {transform: [{ rotate: "180deg" }]}]} /> */}
            </TouchableOpacity>
            <Text style={styles.headerText}>{translate("live")}</Text>
            <View />
        </View>)
    }
    trendingLive = (type: any) => {
        return (
            <View
                style={{ marginBottom: this.state.singleliveresult?.date?.meta?.pagination?.total_count > 0 ? 0 : Scale(20) }}
            >
                <View style={styles.topRaw}>
                    <View style={styles.topRaw}>
                        <View style={styles.videoIconcontainer}>
                            <Image source={video} style={styles.videicon} />
                        </View>
                        <View style={{ marginLeft: 12 }}>
                            <Text style={[styles.subheaderText,
                            this.state.language == 'ar' && { textAlign: 'left' }]}>{translate(type)}</Text>
                            <Text style={styles.subheaderText2}>{translate("Trending")} {translate(type)}</Text>
                        </View>
                        {this.state.singleliveresult?.date?.meta?.pagination?.total_count > 0 &&
                            <Text style={{ backgroundColor: "rgba(0,0,0,0.1)", padding: 5, top: 3, marginLeft: 10 }}>{this.state.singleliveresult?.date?.meta?.pagination?.total_count}</Text>
                        }
                    </View>
                    <View >
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('ViewAllLive', { type: "live" })
                        }}>
                            <Text>{translate("view_all")}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.flatListContainer}>
                    <FlatList
                        horizontal={true}
                        onEndReachedThreshold={0.1}
                        data={this.state.singleliveresultData}
                        renderItem={(item: any) => {
                            return (
                                <TouchableOpacity style={[styles.itemcontainer]}
                                    onPress={() => this.liveViewPage(item?.item)}
                                >
                                    {type == "Live" && <Text style={styles.liveText}>Live</Text>}
                                    <Image source={{ uri: "" }} style={styles.imageProp} />
                                    <View style={styles.bottomdetails}>
                                        <Image source={(item?.item?.attributes?.photo == null) ? avatar : { uri: item?.item?.attributes?.photo }} style={{ width: Scale(30), height: Scale(30), borderRadius: Scale(30), }} />
                                        <Text style={[styles.subheaderText2, { color: "white" }]}>{item?.item?.name}</Text>
                                        {/* <Text style={[styles.subheaderText3,{color:"white"}]}>chill just talking live</Text> */}
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item: any) => item.id}
                    />
                </View>
            </View>
        )
    }

    liveChallenge = (type: any) => {
        return (
            <View >
                <View style={styles.topRaw}>
                    <View style={styles.topRaw}>
                        <View style={styles.videoIconcontainer}>
                            <Image source={video} style={styles.videicon} />
                        </View>
                        <View style={{ marginLeft: 12 }}>
                            <Text style={[styles.subheaderText, this.state.language == 'ar' && { textAlign: 'left' }]}>{translate(type)}</Text>
                            <Text style={[styles.subheaderText2, this.state.language == 'ar' && { textAlign: 'left' }]}>{translate("Trending")} {translate(type)}</Text>
                        </View>
                        {this.state.singleChallengeresult?.meta?.pagination?.total_count > 0 &&
                            <Text style={{ backgroundColor: "rgba(0,0,0,0.1)", padding: 5, top: 3, marginLeft: 10 }}>{this.state.singleChallengeresult?.meta?.pagination?.total_count}</Text>
                        }
                    </View>
                    <View >
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('ViewAllLive', { type: "Challenge" })
                        }}>
                            <Text>{translate("view_all")}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.flatListContainer}>
                    <FlatList
                        horizontal={true}
                        onEndReachedThreshold={0.1}

                        onEndReached={() => {

                            if (this.state.singleChallengeresult?.meta?.pagination.current_page < this.state.singleChallengeresult?.meta?.pagination.total_pages) {
                                //alert(this.state.singleliveresult.date.meta.pagination.current_page+1)
                                this.getLiveChallengesData(this.state.singleChallengeresult?.meta?.pagination.current_page + 1)
                            }
                        }

                        }
                        data={this.state.singleChallengeresultData}
                        renderItem={(item: any) => {

                            return (
                                <TouchableOpacity style={styles.itemcontainer}
                                    onPress={() => this.liveChallengesView(item)}
                                >
                                    {type == "Live" && <Text style={styles.liveText}>{translate("live")}</Text>}
                                    <Image source={{ uri: "" }} style={styles.imageProp} />
                                    <View style={styles.bottomdetails}>
                                        <Image source={(item?.item?.attributes?.photo == null) ? avatar : { uri: item?.item?.attributes?.photo }} style={{ width: Scale(30), height: Scale(30), borderRadius: Scale(30), }} />
                                        <Text style={[styles.subheaderText2, { color: "white" }]}>{item?.item?.attributes?.account?.full_name}</Text>
                                        {/* <Text style={[styles.subheaderText3,{color:"white"}]}>chill just talking live</Text> */}
                                    </View>
                                </TouchableOpacity>
                            )
                        }}

                        keyExtractor={(item: any) => item.id}
                    />
                </View>
            </View>
        )
    }
    // Customizable Area End

    render() {
        // Customizable Area Start
        console.log("this is lamguage", this.state.language)
        // Merge Engine - render - Start
        return (
            <SafeAreaView>
                {this.header()}
                <ScrollView keyboardShouldPersistTaps="always">
                    <TouchableWithoutFeedback
                        testID="touchable"
                        onPress={() => {
                            this.hideKeyboard();
                        }}><>

                            <View style={styles.container}>
                                {this.trendingLive("Live")}
                                {this.liveChallenge("Challenge")}
                            </View>
                        </>
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
        height: Dimensions.get("window").height,
    },
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
        // marginVertical: 10,
    },
    headerText: {
        fontSize: Scale(18),
        fontFamily: FONTS.MontserratSemiBold,
    },
    backarrowStyle: {

        width: Scale(18),
        height: Scale(18),
        resizeMode: "contain",
    },
    backarrowStyle_en: {
        width: Scale(25),
        height: Scale(25),
        resizeMode: "contain",
    },
    flatListContainer: {
        alignItems: "flex-start",
    },
    videoIconcontainer: {
        width: Scale(38),
        height: Scale(38),
        borderRadius: 35,
        borderWidth: 1,
        justifyContent: "center",
        alignContent: "center",
        paddingLeft: 2,
        marginLeft: 3,
        marginTop: 2,
    },
    videicon: {
        width: Scale(30),
        height: Scale(28),
        resizeMode: "contain",
    },
    topRaw: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    subheaderText: {
        fontSize: Scale(18),
        fontFamily: FONTS.MontserratSemiBold,
    },
    subheaderText2: {
        fontSize: Scale(15),
        fontFamily: FONTS.MontserratSemiBold,
        color: "grey"
    },
    subheaderText3: {
        fontSize: Scale(10),
        fontFamily: FONTS.MontserratSemiBold,

    },
    imageProp: {
        width: Scale(150),
        resizeMode: 'cover',
        height: Scale(200),
        backgroundColor: "grey"
    },
    liveText: {
        backgroundColor: "rgba(0,0,0,1)",
        position: "absolute", zIndex: 1000,
        left: 0,
        margin: 10,
        padding: 5,
        color: "#FFC925",
        fontFamily: FONTS.MontserratRegular,
        fontSize: Scale(10),
    },
    bottomdetails: {
        position: "absolute", zIndex: 1000,
        left: 0,
        bottom: 0,
        margin: 10,
        padding: 5,
        color: "#FFC925",
        fontFamily: FONTS.MontserratRegular,
        fontSize: Scale(10),
    },
    itemcontainer: {
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: Scale(5),
        paddingHorizontal: Scale(5),
        marginTop: 8
    }


});
// Customizable Area End
