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
import CustomButton from "../../../components/src/Custombutton";
import FOND from "../../../components/src/Fonts/Fonts";
import Scale from "../../../components/src/Scale";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import { Crossicon, Messanger, Profile, Shape, Subscribebutton, TikTokCoinIcon, Vector, avatar, blockuser, compass, empty, gift, rose } from "./assets";
let screenWidth = Dimensions.get("window").width;
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import CfGroupLiveController, {
    Props
} from "./CfGroupLiveController";
import { translate } from "../../../components/src/i18n/translate";

export default class CFSoloLiveviewer extends CfGroupLiveController {
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
                                <Text style={styles.headerText}>Request to join</Text>
                            </View>
                            <View style={{ minHeight: Scale(300) }}>
                               

                                {
                                    this.state.loader && <View style={[styles.searchContainer, { flex: 1 }]}>
                                        <ActivityIndicator size="large" color="black" />
                                    </View>
                                }

                                {
                                     (
                                        this.state.searchresult.length == 0 ? <View style={[styles.searchContainer, { flex: 1 }]}>
                                            <Image source={empty} style={styles.emptyimg} />
                                            <Text style={styles.headerText}>You have no request</Text>
                                        </View> : 
                                        <View style={{paddingHorizontal:Scale(10)}}>
                                          <Text style={styles.nameText}>When someone joins,anyone who can see their live videos can also watch this one. </Text>  
                                        <FlatList
                                            data={this.state.searchresult}
                                            renderItem={(item) => {
                                                return (
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: Scale(5), paddingHorizontal: Scale(10) }}>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <Image source={avatar} style={styles.profileimg} />
                                                            <View style={{ marginLeft: Scale(10) }}>
                                                                <Text style={styles.nameText}>Genious_man1</Text>
                                                                <Text style={styles.normalText}>Genious_man2</Text>
                                                            </View>
                                                        </View>
                                                        <CustomButton title={"Accept"} style={{ borderRadius: 10, }} TextStyle={{ color: "black" }} onPress={() => { }} />
                                                    </View>
                                                )
                                            }}
                                            keyExtractor={item => item.id}
                                        />
                                        </View>
                                    )

                                }

                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
    header = () => {
        return (
            <View style={{ marginBottom: 10, position: "absolute", width: "100%", padding: 16 }}>
                {/*  */}
                <View style={[styles.headerBoxes]}>
                    <View style={[styles.headerBoxes1]}>
                        <View style={[styles.headerAlignBoxes]}>
                            <Image source={avatar} style={[styles.imageDimensions]} />
                            <View style={{ paddingHorizontal: 10,marginBottom:Scale(10) }}>
                                <Text style={{ fontFamily: FOND.MontserratSemiBold }}>GeniusMan1</Text>
                                <Text style={{ fontFamily: FOND.MontserratLight, fontSize: 12 }}>303.3k likes</Text>
                            </View>
                        </View>
                        <Image source={Subscribebutton} style={[styles.imageDimensions3]} />
                        <View style={[styles.headerBoxes, { marginVertical: 5, paddingLeft: Scale(10), }]}>
                            <TouchableOpacity testID="HourlyTouch" onPress={() => { this.props.navigation.navigate("Leaderboard") }} style={[styles.headerAlignBoxes, { padding: 5, backgroundColor: "#FFC925", borderBottomWidth: 1 }]}>
                                <Image source={Vector} style={[styles.imageDimensions1]} />
                                <Text style={{ fontFamily: FOND.MontserratRegular, fontSize: 10 }}>{translate("Hourly_top")}2</Text>
                            </TouchableOpacity >
                        </View>
                    </View>
                    <TouchableOpacity testID="BackTouch" onPress={() => { }
                    }>
                        <Image source={Crossicon} style={[styles.gobackIcons]} />
                    </TouchableOpacity>
                </View>
                {/*  */}

                {/*  */}
                <View style={{ display: 'flex', flexDirection: "row" }}>
                    <View style={[styles.headerAlignBoxes, styles.boxBorder1, { paddingHorizontal: 4, paddingVertical: 2, backgroundColor: 'black' }]}>
                        <Image source={Shape} style={[styles.imageDimensionsShape]} />
                        <Text style={{ color: 'white', paddingLeft: 4, fontFamily: FOND.MontserratRegular }}>35k</Text>
                    </View>
                    <View style={[styles.headerAlignBoxes, styles.boxBorder2, { padding: 7, marginLeft: Scale(10), backgroundColor: "#FFC925" }]}>
                        <Image source={compass} style={[styles.imageDimensions1]} />
                        <Text style={{ fontFamily: FOND.MontserratRegular, fontSize: 10 }}>Explore</Text>
                    </View>
                    {/*  */}
                </View>
                {/*  */}
            </View>
        )
    }
    bottomBar = () => {
        return (
            <View style={styles.bottomBar}>
                <View style={styles.subBottomBar}>
                    <View>
                        <Image source={TikTokCoinIcon} style={[styles.imageDimensions]} />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={[styles.input]}
                            placeholder={'Add comment...'}
                            multiline={true}
                            placeholderTextColor={'#ddd'}
                        />
                        <TouchableOpacity testID="ImageDimeTouch" onPress={() => {
                        }}>
                            <Image source={gift} style={styles.imageDimensions4} />
                        </TouchableOpacity>
                        <Image source={rose} style={[styles.imageDimensions]} />
                        <Image source={Messanger} style={[styles.imageDimensions]} />
                    </View>
                </View>

            </View>
        )
    }
    AcceptModel = () => {
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
                        <View style={[styles.modalListContainer,{borderRadius:0}]}>
                            <View style={{ minHeight: Scale(250) }}>
                                <View style={[styles.searchContainer, { flex: 1 }]}>
                                    <View style={{flexDirection:"row",borderRadius:Scale(80),borderWidth:5,borderColor:"#FFC925"}}>
                                    <Image source={avatar} style={styles.emptyimg} />
                                    </View>
                                     <Text style={styles.headerText}>Genius_man accepted your request</Text>
                                     <Text style={[styles.headerText]}> request to join this live video</Text>
                                     <Text style={[styles.nameText,{marginVertical:Scale(10)}]}> You will start sharing live video soon</Text>
                                     <Image source={blockuser} style={styles.profileimg} />
                                     </View> 
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
    requestModel = () => {
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
                        <View style={[styles.modalListContainer,{borderRadius:0}]}>
                            <View style={{ minHeight: Scale(300) }}>
                                <View style={[styles.searchContainer, { flex: 1 }]}>
                                    <View style={{flexDirection:"row"}}>
                                    <Image source={Profile} style={styles.emptyimg} />
                                    <Image source={avatar} style={[styles.emptyimg,{marginLeft:Scale(-15)}]} />
                                    </View>
                                     <Text style={styles.headerText}>Geniusman wants to be in this</Text>
                                     <Text style={[styles.headerText]}>  live video</Text>
                                     <Text style={[styles.nameText,{marginVertical:Scale(10)}]}> People who can see Geniusman live video will </Text>
                                     <Text style={[styles.nameText,{marginVertical:Scale(10)}]}>  be able to watch.</Text>
                                     <CustomButton title={"Go Live with GeniusMan"} style={{ borderRadius: 20,marginBottom:10 }} TextStyle={{ color: "black" }} onPress={() => { }} />
                                     <TouchableOpacity testID="CancleTextTouch"><Text style={[styles.nameText,{color:"red"}]}>Cancel</Text></TouchableOpacity>
                                     </View> 
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
    // Customizable Area End

    render() {
        // Customizable Area Start
        // Merge Engine - render - Start
        return (
            <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
                {this.AcceptModel()}
                <View style={styles.imgView}>
                    <Image source={require('../assets/selfie1.jpg')} style={styles.imageProp} />
                    {this.header()}
                    <View style={{ position: "absolute", bottom: 0, padding: 16 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image source={avatar} style={[styles.imageDimensions, { marginRight: Scale(10) }]} />
                            <Text style={{ fontFamily: FOND.MontserratSemiBold, color: "white" }}>GeniusMan1</Text>
                        </View>
                        <View style={[styles.headerAlignBoxes, styles.boxBorder2, styles.boxstyle]}>
                            <View style={{ flexDirection: "row", paddingRight: Scale(10) }}>
                                <Image source={avatar} style={[styles.imageDimensions, { marginRight: Scale(10) }]} />
                                <Text style={styles.nameText}>Send a request to be in {'\n'}GeniusMan1's Live video</Text>
                            </View>
                            <View style={{ flexDirection: "row", paddingEnd: 16 }}>
                                <View style={{ borderLeftWidth: 1, height: Scale(30), paddingRight: Scale(20) }} />
                                <TouchableOpacity testID="RequestTouch" style={{ justifyContent: "center", alignItems: "center" }}
                             onPress={() => {
                                this.setState({ invitationModel:true})
                            }}
                                >
                                    <Text style={styles.nameText}>Request to </Text>
                                    <Text style={styles.nameText}>Join </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View >
                            <FlatList
                                data={this.state.searchresult}
                                horizontal={true}
                                renderItem={(item) => {
                                    return (
                                        <View style={[styles.headerAlignBoxes, styles.boxBorder2, styles.boxstyle2]}>
                                            <Text style={[styles.nameText,{color:"white"}]}>Hello </Text>  
                                        </View>
                                    )
                                }}
                                keyExtractor={item => item.id}
                            />

                        </View>
                    </View>
                </View>

                {this.bottomBar()}
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
        width: 'auto',
        resizeMode: 'cover',
        height: Platform.OS === "ios" ? dimension.height / 1.2 : dimension.height / 1.1,
        borderRadius: 10,
    },
    messageBox: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
    },
    textInput: {
        height: 50,
        width: dimension.width / 1.5,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 50,
        margin: 10,
        paddingLeft: 10,
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
    sendIcon: {
        height: 30,
        width: 30
    },
    profileIcon: {
        height: 30,
        width: 30
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
        height: Scale(40),
        
    },
    normalText: {
        fontFamily: FOND.MontserratRegular,
        fontSize: Scale(10)
    },
    nameText: {
        fontFamily: FOND.MontserratBold,
        fontSize: Scale(12)
    },
    headerBoxes1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 2
    },
    headerBoxes: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerAlignBoxes: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    subLinesBoxes: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 120,
        paddingHorizontal: 5
    },
    boxBorder1: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
    },
    boxBorder2: {
        // borderColor:'black',
        // borderWidth:1, 
        borderRadius: 15,
    },
    boxstyle: { backgroundColor: "#FFC925", padding: 10, width: screenWidth - Scale(50), marginTop: Scale(10), justifyContent: "space-between" },
    boxstyle2: { backgroundColor: "rgba(243,243,243,.5)", padding: 10, marginTop: Scale(10), justifyContent: "space-between" ,marginRight:Scale(10)},
   
    gobackIcons: {
        width: 20,
        height: 20
    },
    imageDimensions: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    imageDimensions1: {
        width: 10,
        height: 10,
        marginRight: 2,
        resizeMode: 'contain'
    },
    imageDimensions2: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    imageDimensionsShape: {
        width: 10,
        height: 10,
        resizeMode: 'contain'
    },
    imageDimensions3: {
        width: 15,
        height: 15,
        marginTop: 4,
        resizeMode: 'contain'
    },
    imageDimensions4: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    input: {
        width: 180
    },
    bottomBar: {
        backgroundColor: 'black',
        // position:'absolute', 
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 10,
        paddingBottom: 20,
        width: "100%",
    },
    subBottomBar: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    inputFieldContainer: {
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%',
        borderRadius: 10,
        justifyContent: 'space-evenly'
    },
});
// Customizable Area End
