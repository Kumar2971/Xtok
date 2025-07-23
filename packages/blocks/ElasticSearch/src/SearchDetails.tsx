import React from "react";

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
    ImageBackground,
    ScrollView,
} from "react-native";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import { translate } from "../../../components/src/i18n/translate";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import SearchDetailsController, {
    Props,
} from "./SearchDetailsController";
import { follower2, imgArrow, tiktokCover1, Voice } from "./assets";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { COLORS } from "../../../framework/src/Globals";

export default class SearchDetails extends SearchDetailsController {
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

    // Customizable Area End

    render() {
        // Customizable Area Start
        // Merge Engine - render - Start
        console.log("This.state", this.props.navigation?.state?.params);
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headerStyle}>
                    <TouchableOpacity testID="back"
                        style={styles.imgView}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image source={imgArrow} style={styles.imgStyle} />
                    </TouchableOpacity>
                    <Text style={styles.titleStyle}>{translate("search")}</Text>
                    <View></View>
                </View>
                <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
                    {/* <TouchableWithoutFeedback
               onPress={() => {
              this.hideKeyboard();
              }}
            > */}
                    <View style={styles.separator} />
                    <View>
                        <Text style={styles.hashTagTitle}>{'#alinaddks'}</Text>
                        <Image source={follower2} style={styles.profileImg} />
                        <Text style={styles.postsCountTxt}>{'217M posts'}</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.yellow, borderRadius: widthPercentageToDP(10), paddingVertical: widthPercentageToDP(2), marginVertical: heightPercentageToDP(3), margin: 10 }}>
                        <Text style={{ fontSize: widthPercentageToDP(4.5), color: COLORS.white, fontWeight: '600' }}>{'Follow'}</Text>
                    </View>
                    <View style={styles.topTabBar}>
                        <TouchableOpacity testID="top" onPress={() => this.onPressColor('top')}
                            style={{ borderBottomWidth: 3.5, flex: 1, borderBottomColor: this.state.colorId == 'top' ? COLORS.yellow : '#EEEEEE' }}>
                            <Text style={{ fontSize: widthPercentageToDP(4), textAlign: 'center', fontWeight: '700', marginBottom: heightPercentageToDP(1), color: this.state.colorId == 'top' ? COLORS.yellow : '#EEEEEE' }}>{translate("top")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity testID="trending" onPress={() => this.onPressColor('trending')} style={{ borderBottomWidth: 3.5, flex: 1, borderBottomColor: this.state.colorId == 'trending' ? COLORS.yellow : '#EEEEEE' }}>
                            <Text style={{ fontSize: widthPercentageToDP(4), textAlign: 'center', fontWeight: '700', marginBottom: heightPercentageToDP(1), color: this.state.colorId == 'trending' ? COLORS.yellow : '#EEEEEE' }}>{translate("Trending")}</Text>
                        </TouchableOpacity >
                        <TouchableOpacity testID="recent" onPress={() => this.onPressColor('recent')} style={{ borderBottomWidth: 3.5, flex: 1, borderBottomColor: this.state.colorId == 'recent' ? COLORS.yellow : '#EEEEEE', alignSelf: "center" }}>
                            <Text style={{ fontSize: widthPercentageToDP(4), textAlign: 'center', fontWeight: '700', marginBottom: heightPercentageToDP(1), color: this.state.colorId == 'recent' ? COLORS.yellow : '#EEEEEE' }}>{translate("recent")}</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList testID="list"
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
                        ItemSeparatorComponent={() => <View style={{ height: heightPercentageToDP(0.3), }} />}
                        numColumns={3}
                        renderItem={() => {
                            return <ImageBackground
                                source={tiktokCover1}
                                style={{
                                    height: heightPercentageToDP(22), width: widthPercentageToDP(33.33), marginRight: widthPercentageToDP(0.3), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', alignContent: 'center', padding: widthPercentageToDP(1.5), alignSelf: 'center'
                                }}
                                resizeMode={'cover'}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={Voice} style={{ width: widthPercentageToDP(6), height: widthPercentageToDP(6) }} resizeMode={'contain'} />
                                    <Text style={{ fontSize: widthPercentageToDP(3.5), fontWeight: '400', color: COLORS.white, marginLeft: widthPercentageToDP(1) }}>{'0'}</Text>
                                </View>
                            </ImageBackground>
                        }} />
                    {/* </TouchableWithoutFeedback> */}
                </ScrollView>
            </SafeAreaView >

        );
        // Merge Engine - render - End
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: 650,
        backgroundColor: "#ffffffff",
    },
    title: {
        // marginBottom: 32,
        fontSize: 16,
        textAlign: "left",
        marginVertical: 8,
    },
    // title: {
    //   fontSize: deviceBasedDynamicDimension(14 , true , 1)
    // },
    headerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        // marginBottom: deviceBasedDynamicDimension(20, true, 1)
        padding: 10,
    },
    imgStyle: {
        height: "100%",
        width: "100%",
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
        fontSize: deviceBasedDynamicDimension(20, true, 1),
        //marginLeft: deviceBasedDynamicDimension(30, true, 1),
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
    profileImg: {
        height: deviceBasedDynamicDimension(100, true, 1),
        width: deviceBasedDynamicDimension(100, true, 1),
        alignSelf: 'center', marginTop: deviceBasedDynamicDimension(30, true, 1)
    },
    hashTagTitle: {
        textAlign: 'center',
        fontSize: deviceBasedDynamicDimension(20, true, 1),
        fontWeight: 'bold',
        marginTop: heightPercentageToDP(1)
    },
    postsCountTxt: {
        textAlign: 'center',
        fontSize: deviceBasedDynamicDimension(20, true, 1),
        fontWeight: '500', marginTop: heightPercentageToDP(1)
    },
    topTabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10
    }

});
// Customizable Area End
