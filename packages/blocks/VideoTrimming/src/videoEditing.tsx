import React from "react";

// Customizable Area Start
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    TouchableOpacity,
    Text,
    ImageBackground
} from "react-native";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
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
import VideoTrimmingController, { Props } from "./VideoTrimmingController";
import { Canvas, Forwardoff, Videoplay, add, audio, back, background, backwardoff, closeImg, copy, deleteImg, freeze, mirror, play, rotate, sort, speed, split, success, transition } from "./assets";

export default class VideoEditing extends VideoTrimmingController {
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
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
                    <View style={{ marginLeft: 10, marginRight: 10 }}>
                        <View style={styles.topBar}>
                            <Image source={closeImg} style={styles.close} />
                            <Image source={success} style={styles.close} />
                        </View>
                        <ImageBackground source={background} style={styles.background} >
                            <Image source={Videoplay} style={styles.videosPLay} />
                        </ImageBackground>

                        <View style={styles.playVideo}>
                            <Text style={styles.fontSize}>00:10/00:26</Text>
                            <Image source={play} style={styles.playButton} />
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <View style={styles.backButton} />
                                <View style={styles.backButton2} />
                            </View>
                        </View>

                    </View>
                    <View style={styles.bottomModal}>
                        {this.state.filterType === "add" &&
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 20 }}>
                                <Image source={add} style={styles.icons} />
                                <View style={styles.transition} />
                                <Image source={transition} style={styles.icons} />
                            </View>}
                        {this.state.filterType === "sort" &&
                            <>
                                <Text style={styles.dragg}>Sort by dragging left and Right</Text>
                                <View style={styles.sortImage}>
                                    <TouchableOpacity testID="setAdd" onPress={() => this.setState({ filterType: "add" })}><Image source={back} style={styles.back} /></TouchableOpacity>
                                    <Image source={background} style={styles.filter} />
                                    <Image source={background} style={styles.filter} />
                                    <Image source={background} style={styles.filter} />
                                </View>
                            </>
                        }
                        {this.state.filterType === "canvas" &&
                            <View style={styles.canvasView}>
                                <ScrollView horizontal contentContainerStyle={styles.CanvasColorView}>
                                    <View style={[styles.canvasColor, { backgroundColor: "#fff" }]} />
                                    <View style={[styles.canvasColor, { backgroundColor: "#aaa" }]} />
                                    <View style={[styles.canvasColor, { backgroundColor: "#eee" }]} />
                                    <View style={[styles.canvasColor, { backgroundColor: "yellow" }]} />
                                    <View style={[styles.canvasColor, { backgroundColor: "green" }]} />
                                    <View style={[styles.canvasColor, { backgroundColor: "cyan" }]} />
                                    <View style={[styles.canvasColor, { backgroundColor: "blue" }]} />
                                    <View style={[styles.canvasColor, { backgroundColor: "red" }]} />
                                    <View style={[styles.canvasColor, { backgroundColor: "pink" }]} />
                                    <View style={[styles.canvasColor, { backgroundColor: "purple" }]} />
                                </ScrollView>
                                <ScrollView horizontal contentContainerStyle={styles.CanvasColorView}>
                                    <View style={[styles.canvasSize]} ><Text style={styles.size}>Orignal</Text></View>
                                    <View style={[styles.canvasSize]} ><Text style={styles.size}>9:16</Text></View>
                                    <View style={[styles.canvasSize]} ><Text style={styles.size}>1:1</Text></View>
                                    <View style={[styles.canvasSize]} ><Text style={styles.size}>4:5</Text></View>
                                    <View style={[styles.canvasSize]} ><Text style={styles.size}>9:12</Text></View>
                                    <View style={[styles.canvasSize]} ><Text style={styles.size}>3:4</Text></View>
                                    <View style={[styles.canvasSize]} ><Text style={styles.size}>3:2</Text></View>
                                    <View style={[styles.canvasSize]} ><Text style={styles.size}>2:3</Text></View>
                                    <View style={[styles.canvasSize]} ><Text style={styles.size}>9:16</Text></View>
                                    <View style={[styles.canvasSize]} ><Text style={styles.size}>9:16</Text></View>
                                </ScrollView>
                                <View style={{ height: 1, width: screeWidth, backgroundColor: "#aaa" }} />
                                <Image source={success} style={[styles.success, { alignSelf: "center" }]} />
                            </View>
                        }

                        {this.state.filterType !== "canvas" && <ScrollView horizontal contentContainerStyle={styles.bottomBar}>
                            <TouchableOpacity testID="sort" onPress={() => this.setState({ filterType: "sort" })} style={styles.iconView}>
                                <Image source={sort} style={styles.icons} />
                                <Text style={styles.iconText}>Sort</Text>
                            </TouchableOpacity>
                            <TouchableOpacity testID="canvas" onPress={() => this.setState({ filterType: "canvas" })} style={styles.iconView}>
                                <Image source={Canvas} style={styles.icons} />
                                <Text style={styles.iconText}>Canvas</Text>
                            </TouchableOpacity>
                            <TouchableOpacity testID="speed" style={styles.iconView}>
                                <Image source={speed} style={styles.icons} />
                                <Text style={styles.iconText}>Speed</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconView}>
                                <Image source={split} style={styles.icons} />
                                <Text style={styles.iconText}>Split</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconView}>
                                <Image source={copy} style={styles.icons} />
                                <Text style={styles.iconText}>Copy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconView}>
                                <Image source={freeze} style={styles.icons} />
                                <Text style={styles.iconText}>Freeze</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconView}>
                                <Image source={mirror} style={styles.icons} />
                                <Text style={styles.iconText}>Mirror</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconView}>
                                <Image source={rotate} style={styles.icons} />
                                <Text style={styles.iconText}>Rotate</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconView}>
                                <Image source={audio} style={styles.icons} />
                                <Text style={styles.iconText}>Audio</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconView}>
                                <Image source={deleteImg} style={styles.icons} />
                                <Text style={styles.iconText}>Delete</Text>
                            </TouchableOpacity>
                        </ScrollView>}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
        // Merge Engine - render - End
        // Customizable Area End
    }
}

// Customizable Area Start
const screeWidth = Dimensions.get('window').width
const screeHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212121",
    },
    topBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10
    },
    close: {
        height: Scale(30),
        width: Scale(30),
        resizeMode: "contain",
    },
    background: {
        resizeMode: "contain",
        height: screeHeight * 0.6,
        width: screeWidth * 0.9,
        alignSelf: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    videosPLay: {
        height: Scale(80),
        width: Scale(80),
        resizeMode: "contain"
    },
    bottomBar: {
        position: "absolute",
        bottom: 10,
        height: 70,
        padding: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
    },
    iconView: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
        paddingLeft: 13
    },
    icons: {
        height: Scale(30),
        width: Scale(30),
        resizeMode: "contain"
    },
    iconText: {
        color: "#FFF",
        fontFamily: FONTS.MontserratSemiBold
    },
    backButton2: {
        height: Scale(30),
        width: Scale(30),
        resizeMode: "contain"
    },
    backButton: {
        height: Scale(30),
        width: Scale(30),
        resizeMode: "contain"
    },
    playButton: {
        height: Scale(30),
        width: Scale(30),
        resizeMode: "contain"
    },
    playVideo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 10
    },
    fontSize: {
        fontSize: 15,
        fontFamily: FONTS.MontserratSemiBold,
        color: "#fff"
    },
    bottomModal: {
        position: 'relative',
        bottom: 0,
        width: screeWidth,
        borderTopRightRadius: Scale(20),
        borderTopLeftRadius: Scale(20),
        backgroundColor: '#2a2929b3',
        minHeight: Scale(180),
    },
    transition: {
        backgroundColor: "yellow",
        width: Scale(200),
        height: 50,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#fff"
    },
    filter: {
        height: Scale(60),
        width: Scale(60),
        resizeMode: "cover",
        borderWidth: 4,
        borderColor: "#FFF",
        borderRadius: 5
    },
    back: {
        height: Scale(60),
        width: Scale(60),
        resizeMode: "contain"
    },
    sortImage: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: screeWidth * 0.8
    },
    dragg: {
        alignSelf: "center",
        fontSize: 13,
        fontFamily: FONTS.MontserratSemiBold,
        color: "#eee",
        padding: 10
    },
    canvasView: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    canvasColor: {
        height: Scale(30),
        width: Scale(30),
        backgroundColor: "#aaa",
        margin: 10,
        borderRadius: 50
    },
    CanvasColorView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    canvasSize: {
        height: Scale(60),
        width: Scale(50),
        backgroundColor: "gray",
        margin: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    size: {
        fontSize: 13,
        color: "#fff"
    },
    success: {
        height: Scale(40),
        width: Scale(40)
    }
});
// Customizable Area End
