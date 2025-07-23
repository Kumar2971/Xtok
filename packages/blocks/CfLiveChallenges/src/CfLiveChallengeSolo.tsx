import React from "react";

// Customizable Area Start
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    FlatList
} from "react-native";
import { SearchBar } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomButton from "../../../components/src/Custombutton";
import FOND from "../../../components/src/Fonts/Fonts";
import Scale from "../../../components/src/Scale";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import { avatar } from "./assets";

let screenWidth = Dimensions.get("window").width;
// Merge Engine - import assets - Start../OneToOne/MeetingViewer
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import CfLiveChallengesController, { Props } from "./CfLiveChallengesController";

export default class CfSoloLive extends CfLiveChallengesController {
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
    invitationModel = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.invitationModel}
                onRequestClose={() => {
                    this.setState({ invitationModel: false });
                }}
            >
                <TouchableWithoutFeedback onPress={() => {
                    this.setState({ invitationModel: false });
                }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalListContainer}>
                            <View style={[styles.modalHeader]}>
                                <Text style={styles.headerText}>Invite to join</Text>
                            </View>
                            <View style={{ minHeight: Scale(300) }}>
                                <View style={styles.searchContainer}>
                                    <SearchBar
                                        testID="searchId"
                                        platform="default"
                                        placeholder={"Search"}
                                        searchIcon={<AntDesign name="search1" size={20} />}
                                        inputStyle={this.state.language == "ar" && styles.inputTextRight}
                                        onFocus={() => { }}
                                        onChangeText={text => {
                                            this.setState({
                                                searchresult: text,
                                            });
                                        }}
                                        onSubmitEditing={() => { }}
                                        onCancel={() => { }}
                                        autoCorrect={false}
                                        value={this.state.searchresult}
                                        containerStyle={styles.searchContainerStyle}
                                        inputContainerStyle={styles.searchInputStyle}
                                    />
                                </View>

                                {
                                    this.state.loader && <View style={[styles.searchContainer, { flex: 1 }]}>
                                        <ActivityIndicator size="large" color="black" />
                                    </View>
                                }

                                {
                                    (!this.state.recentsearch) ? (
                                        <View style={{ paddingHorizontal: Scale(20) }}>
                                            <Text style={styles.normalText}>When someone joins,anyone who can see there live videos can also watch this one</Text>
                                            <Text style={[styles.headerText, { marginVertical: Scale(10) }]}>Suggested</Text>
                                            <FlatList
                                                testID="serachFlatlist"
                                                data={this.state.searchresult}
                                                renderItem={(item) => {
                                                    return (
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: Scale(5), }}>
                                                            <View style={{ flexDirection: "row" }}>
                                                                <Image source={avatar} style={styles.profileimg} />
                                                                <View style={{ marginLeft: Scale(10) }}>
                                                                    <Text style={styles.nameText}>Genious_man1</Text>
                                                                    <Text style={styles.normalText}>Genious_man2</Text>
                                                                </View>
                                                            </View>
                                                            <CustomButton testID="inviteBtn" title={"invite"} style={{ borderRadius: 10, }} TextStyle={{ color: "black" }} onPress={() => { }} />

                                                        </View>
                                                    )
                                                }}
                                                keyExtractor={(item:any) => item.id}
                                            />
                                        </View>
                                    ) : (
                                       this.renderSearchFlatlist()
                                    )

                                }

                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }


    renderSearchFlatlist = () => {
    if(this.state.searchresult.length == 0){
    return  (<View style={[styles.searchContainer, { flex: 1 }]}>
            <Text style={styles.headerText}>No search result found</Text>
        </View>)
    } else { 
    return <FlatList
            data={this.state.searchresult}
            renderItem={(item) => {
                return (
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: Scale(5), paddingHorizontal: Scale(20) }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image source={avatar} style={styles.profileimg} />
                            <View style={{ marginLeft: Scale(10) }}>
                                <Text style={styles.nameText}>Genious_man1</Text>
                                <Text style={styles.normalText}>Genious_man2</Text>
                            </View>
                        </View>
                        <CustomButton testID="inviteBtn2" title={"invite"} style={{ borderRadius: 10, }} TextStyle={{ color: "black" }} onPress={() => { console.log("click") }} />
                    </View>
                )
            }}
            keyExtractor={(item:any) => item.id}
        />
    }
    }
    // Customizable Area End

    render() {
        // Customizable Area Start 
        console.log("check2====>>>")
        // Merge Engine - render - Start 
        return (
            <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
                {this.invitationModel()}
                <View style={styles.imgView}>
                    <View style={styles.liveChallenge}>
                        <TouchableOpacity testID="addBtn" onPress={() => {
                            this.setState({ invitationModel: true })
                            // this.inviteParticipantToLiveChallenge()
                        }}>
                            <Image source={require('../assets/add.png')} style={styles.addButton} />
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
        );

        // Merge Engine - render - End
        // Customizable Area End
    }
}

const dimension = Dimensions.get('window');
// Customizable Area Start
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        marginLeft: "auto",
        marginRight: "auto",
        width: Platform.OS === "web" ? "75%" : "100%",
        // maxWidth: 650,
        backgroundColor: "#000",
        flexDirection: 'column'
    },
    imgView: {
        flex: 1,
        position: "relative"
    },
    imageProp: {
        // width: 'auto',
        resizeMode: 'cover',
        height: 250,
        width: 250,
        //  height: Platform.OS === "ios" ? dimension.height / 2.2 :'',
        borderRadius: 10,
    },
    messageBox: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        width: dimension.width,
        borderWidth: 1,
    },
    textInput: {
        height: 50,
        width: dimension.width / 1.5,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 50,
        margin: 10,
        color: "#fff"
    },
    imgText: {
        backgroundColor: "#000",
        borderRadius: 5,
    },
    liveText: {
        color: '#fff',
        paddingLeft: 8,
        paddingRight: 8,
        padding: 5,
        fontSize: 10,
        fontWeight: '600'
    },
    eyeIcon: {
        height: 20,
        width: 20
    },
    liveandview: {
        position: "absolute",
        alignSelf: "center",
        marginTop: 10,
        display: "flex",
        flexDirection: "row"
    },
    eyeIconBack: {
        backgroundColor: "#eee",
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 3,
        paddingRight: 3,
    },
    textLive: {
        fontSize: 12,
    },
    icons2: {
        height: Scale(30),
        width: Scale(30),
        resizeMode: "contain"
        // marginLeft: 10
    },
    modalContainer: {
        flex: 1,

    },
    modalListContainer: {
        position: 'absolute',
        bottom: 0,
        width: screenWidth,
        borderTopRightRadius: Scale(20),
        borderTopLeftRadius: Scale(20),
        backgroundColor: 'rgb(255, 255, 255)',
        maxHeight: Scale(500),

    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Scale(20),
        borderBottomColor: "grey",
        borderBottomWidth: 1
        // marginVertical: Scale(10),
    },
    headerText: {
        fontFamily: FOND.MontserratSemiBold,
        fontSize: Scale(20)
    },
    searchContainer: {
        justifyContent: "center",
        alignItems: "center"
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
        paddingHorizontal: Scale(10)
    },
    searchInputStyle: {
        backgroundColor: "#EEEEEE",
        height: deviceBasedDynamicDimension(45, true, 1),
    },
    emptyimg: {
        width: Scale(80),
        height: Scale(80)
    },
    profileimg: {
        width: Scale(40),
        height: Scale(40)
    },
    normalText: {
        fontFamily: FOND.MontserratRegular,
        fontSize: Scale(10)
    },
    nameText: {
        fontFamily: FOND.MontserratSemiBold,
        fontSize: Scale(12)
    },
    comment: {
        width: dimension.width,
        position: "absolute",
        bottom: 10,
    },
    joined: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between"
    },
    joinedImg: {
        height: Scale(50),
        width: Scale(50),
        resizeMode: "cover",
        borderRadius: 20,
        marginLeft: 20,
    },
    name: {
        fontWeight: "500",
        color: "#fff",
        marginLeft: 10
    },
    joinee: {
        fontWeight: "bold",
        color: "#fff"
    },
    notification: {
        fontSize: 12,
        color: "#fff",
        marginBottom: 10,
        fontWeight: "700",
        opacity: 0.7
    },
    notification_box: {
        marginLeft: 30,
        width: dimension.width / 1.2
        // padding:20
    },
    topView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        top: 10,
        width: dimension.width * 0.93,
        marginLeft: 10,
    },
    endCall: {
        fontWeight: "bold",
        color: "#FFF"
    },
    roseIcon: {
        height: Scale(20),
        width: Scale(20),
        borderWidth: 1,
        backgroundColor: "#000",
        padding: 10,
        borderRadius: 5,
        borderColor: "#FFF",
        position: "absolute",
        right: 10
    },
    cameraImg: {
        width: Scale(25),
        height: Scale(25)
    },
    liveChallenge: {
        height: dimension.height / 2.3,
        backgroundColor: "#aaa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    addButton: {
        height: Scale(100),
        width: Scale(100),
        resizeMode: "contain"
    },
    challengeBoard: {
        display: "flex",
        flexDirection: "row"
    },
    challenger: {
        height: 15,
        width: "50%",
        backgroundColor: "yellow",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    opponent: {
        height: 15,
        width: "50%",
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    inputTextRight: {
        textAlign: "right"
    },
});
// Customizable Area End
