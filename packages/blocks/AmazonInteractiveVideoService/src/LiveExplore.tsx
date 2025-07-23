// Customizable Area Start
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback, View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, RefreshControl
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
import { video, avatar } from "./assets";
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
            <TouchableOpacity testID="leftArrow" onPress={() => this.props.navigation.goBack()}>
            </TouchableOpacity>
            <Text style={styles.headerText}>{translate("live")}</Text>
            <View />
        </View>)
    }
    trendingLive = (type: any) => {
        return (
            <View
                style={{ marginBottom: this.state.singleliveresult?.meta?.pagination?.total_count > 0 ? 0 : Scale(20) }}
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
                        {this.state.singleliveresult?.meta?.pagination?.total_count > 0 &&
                            <Text style={{ backgroundColor: "rgba(0,0,0,0.1)", padding: 5, top: 3, marginLeft: 10 }}>{this.state.singleliveresult?.meta?.pagination?.total_count}</Text>
                        }
                    </View>
                    <View >
                        <TouchableOpacity testID="right" onPress={() => {
                            this.props.navigation.navigate('ViewAllLive', { type: "live" })
                        }}>
                            <Text>{translate("view_all")}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.flatListContainer}>
                    <FlatList
                        testID="flatlistOne"
                        style={this.state.language == " ar" && { transform: [{ scaleX: -1 }] }}
                        horizontal={true}
                        onEndReachedThreshold={0.1}
                        onEndReached={() => {
                            if (this.state.singleliveresult.meta?.pagination?.current_page < this.state.singleliveresult.meta?.pagination?.total_pages) {
                                this.getLiveStagesData(this.state.singleliveresult.meta?.pagination?.current_page + 1)
                            }
                        }}
                        data={this.state.singleliveresultData}
                        renderItem={(item: any) => this.LiveView(item, type)}
                        keyExtractor={(item: any) => item.id}
                    />
                </View>
            </View>
        )
    }

    getThumbnail = (attributes: any) => {
        const image_url = attributes?.stage_image;
        const photo = attributes?.account_profile_photo;
        if (image_url) {
            return image_url;
        } else if (photo) {
            return photo;
        }
        return "";
    }

    LiveView = ({ item }: { item: any }, type: any) => {
        console.log("ITems============================================", item)
        return <TouchableOpacity style={[styles.itemcontainer]}
            testID="navigateButton"
            onPress={() => this.navigateToLiveStream(item)}
        >
            {type == "Live" && <Text style={styles.liveText}>{translate("live")}</Text>}
            <Image source={{ uri: item?.photo }} style={styles.imageProp} />
            <View style={styles.bottomdetails}>
                <Image source={(item?.photo == null) ? avatar : { uri: item.photo }} style={{ width: Scale(30), height: Scale(30), borderRadius: Scale(30), }} />
                <Text numberOfLines={2} style={[styles.subheaderText2, styles.liveTitle, this.state.language == "ar" && { textAlign: "left" }]}>{item?.title ?? item?.user_name}</Text>
            </View>
        </TouchableOpacity>
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
                        <TouchableOpacity testID="viewAllButton" onPress={() => {
                            this.props.navigation.navigate('ViewAllLive', { type: "Challenge" })
                        }}>
                            <Text>{translate("view_all")}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.flatListContainer}>
                    <FlatList
                        testID="flatlistTwo"
                        style={this.state.language == " ar" && { transform: [{ scaleX: -1 }] }}
                        horizontal={true}
                        onEndReachedThreshold={0.1}

                        onEndReached={() => {
                            if (this.state.singleChallengeresult?.meta?.pagination.current_page < this.state.singleChallengeresult?.meta?.pagination.total_pages) {
                                this.getLiveStageChallengeData(this.state.singleChallengeresult?.meta?.pagination.current_page + 1)
                            }
                        }

                        }
                        data={this.state.singleChallengeresultData}
                        renderItem={(item: any) => this.LiveView(item, type)}
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
            <SafeAreaView style={{ flex: 1 }}>
                {this.header()}
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={this.state.onRefreshLives || this.state.onRefreshChallenges}
                            onRefresh={() => {
                                this.setState({ onRefreshLives: true, onRefreshChallenges: true })
                                this.getLiveStagesData(1);
                                this.getLiveStageChallengeData(1);
                            }} />
                    } keyboardShouldPersistTaps="always">
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
    liveTitle: {
        color: "white",
        flex: 1,
        marginLeft: 5
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
        flexDirection: "row",
        alignItems: "center",
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
