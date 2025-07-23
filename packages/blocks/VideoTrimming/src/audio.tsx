import React from "react";

// Customizable Area Start
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Platform,
    ScrollView,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Text,
    ActivityIndicator,
    TextInput,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End

// Customizable Area End
import Scale from "../../../components/src/Scale";
import FONTS from "../../../components/src/Fonts/Fonts";
import VideoTrimmingController from "./VideoTrimmingController";
import {
    hashtag,
    location,
    recording,
    search,
    user,
} from "./assets";
import { backArrow } from "../../Chat9/src/assets";
import SoundPlayer from 'react-native-sound-player'

export default class AudioScreen extends VideoTrimmingController {
    constructor(props: any) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    Item = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.songView}>
                <TouchableOpacity onPress={() => {
                    if (this.state.audioTab == 3) {
                        if (this.state.playing_item != item) {
                            this.setState({ playing_item: item }, () => SoundPlayer.playUrl(this.state.playing_item?.audio))
                        }
                        else {
                            this.setState({ playing_item: null }, () => SoundPlayer.pause())
                        }
                    }
                }}
                    testID="playPauseBtn"
                >
                    {this.getPicture({ item })}
                </TouchableOpacity>
                <TouchableOpacity style={styles.nameView} onPress={() => {
                    if (this.state.audioTab == 3) {
                        this.setState({ playing_item: null }, () => SoundPlayer.pause())
                        this.props.navigation.navigate("AudioEditor", { clip: item })
                    }
                }}
                >
                    <Text style={styles.title}>{this.getName({ item })}</Text>
                    <Text style={styles.artist}>{this.getSubName({ item })}</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    };

    getPicture({ item }: any) {
        if (this.state.audioTab == 3) {
            return item?.image != null ? <Image source={{ uri: item?.image }} style={styles.audioImg} /> : <Icon name='music' size={30} style={{ marginRight: 20 }} />
        }
        else if (this.state.audioTab == 2) {
            return item?.photo != null ? <Image source={{ uri: item?.photo }} style={styles.audioImg} /> : <Icon name='user-circle' size={30} style={{ marginRight: 20 }} />
        }
    }

    getName({ item }: any) {
        if (this.state.audioTab == 3) {
            return item?.title != null ? item?.title : 'title-unavailable';
        }
        else if (this.state.audioTab == 2) {
            return item?.full_name
        }
    }

    getSubName({ item }: any) {
        if (this.state.audioTab == 3) {
            return item?.artist != null ? item?.artist : 'name-unavailable';
        }
        else if (this.state.audioTab == 2) {
            return item?.user_name
        }
    }

    async componentDidMount() {
        this.getFilteredList("");
    }

    // Customizable Area End

    render() {
        // Customizable Area Start
        const audioTags = [
            // { name: "dashboard", image: dashboard, active: 1 },
            { name: "user", image: user, active: 2 },
            { name: "recording", image: recording, active: 3 },
            { name: "hashtag", image: hashtag, active: 4 },
            { name: "location", image: location, active: 5 },
        ];

        // Merge Engine - render - Start
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
                    <TouchableOpacity style={styles.backBox} onPress={() => this.props.navigation.goBack()} testID='backBtn'>
                        <Image source={backArrow} style={{ height: 15, width: 15 }} />
                        <Text style={styles.addText}>Add songs</Text>
                    </TouchableOpacity>
                    <View style={{ position: "relative" }}>
                        <Image source={search} style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search"
                            autoCapitalize="none"
                            value={this.state.searchValue}
                            onChangeText={(txt) => {
                                this.setState({ searchValue: txt }, () => {
                                    if (txt.length < 3) {
                                        return
                                    }
                                    clearTimeout(this.timeout)
                                    this.timeout = setTimeout(() => {
                                        this.decideApiCall()
                                    }, 500)
                                })
                            }}
                            style={styles.searchField}
                            testID="searchInput"
                        />
                    </View>
                    <View style={styles.songsIcon}>
                        {audioTags.map(({ image, active }) => (
                            <TouchableOpacity
                                key={`${image}`}
                                testID={JSON.stringify(active)}
                                onPress={() => this.setState({ audioTab: active }, () => {
                                    if (this.state.audioTab == 2) {
                                        this.getMatchingUsers("")
                                    }
                                    if (this.state.audioTab == 3) {
                                        this.getFilteredList("")
                                    }
                                })}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={image}
                                    style={[
                                        styles.ImagesProp,
                                        {
                                            tintColor:
                                                active === this.state.audioTab ? "#f50057" : "grey",
                                        },
                                    ]}
                                />
                                {active === this.state.audioTab && (
                                    <View style={styles.activeBAR} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.underline} />
                    <View style={{ height: 20 }}>
                        {this.state.loading ? <ActivityIndicator color="#f50057" size={"small"} /> : null}
                    </View>
                    <FlatList
                        data={this.state.final_list}
                        renderItem={({ item }: any) => (
                            <this.Item
                                item={item}
                            />
                        )}
                        keyExtractor={(item: any, index) => item.id}
                        style={{ paddingHorizontal: 10 }}
                        showsVerticalScrollIndicator={true}
                        testID="flatlist1"
                    />
                </ScrollView>
            </SafeAreaView>
        );
        // Merge Engine - render - End
        // Customizable Area End
    }
}

// Customizable Area Start
const screeWidth = Dimensions.get("window").width;
const screeHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Platform.OS === "web" ? "75%" : "100%",
        maxWidth: 650,
        backgroundColor: "#fff",
        height: screeHeight,
    },
    searchField: {
        backgroundColor: "#eeeeee",
        width: Scale(screeWidth * 0.98),
        borderRadius: 8,
        alignSelf: "center",
        marginTop: 25,
        padding: 10,
        paddingHorizontal: 45,
    },
    songsIcon: {
        // width: screeWidth,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
    },
    underline: {
        height: 0.5,
        backgroundColor: "#eee",
        width: screeWidth * 0.9,
        alignSelf: "center",
    },
    ImagesProp: {
        height: Scale(20),
        width: Scale(20),
        resizeMode: "contain",
        margin: 10,
        marginTop: 10,
    },
    activeBAR: {
        height: 3,
        width: 40,
        backgroundColor: "#f50057",
    },
    songView: {
        display: "flex",
        flexDirection: "row",
        padding: 15,
        alignItems: "center",
    },
    audioImg: {
        height: Scale(54),
        width: Scale(54),
        // resizeMode: "contain",
        borderRadius: Scale(27),
    },
    title: {
        fontSize: 14,
        fontFamily: FONTS.MontserratSemiBold,
    },
    artist: {
        fontSize: 13,
        fontFamily: FONTS.MontserratSemiBold,
        color: "#aaa",
    },
    nameView: {
        paddingLeft: 15,
    },
    searchIcon: {
        position: "absolute",
        marginLeft: Platform.OS == "ios" ? 35 : 45,
        marginTop: Platform.OS == "ios" ? 35 : 40,
        zIndex: 1,
    },
    addText: {
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 7,
    },
    backBox: {
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 25,
        alignItems: "center",
        marginBottom: 8,
    },
});
// Customizable Area End
