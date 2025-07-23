import React from "react";

// Customizable Area Start
import {
    Dimensions,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image,
    Modal,
    ImageBackground,

} from "react-native";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import FONTS from '../../../components/src/Fonts/Fonts';
import CustomButton from "../../../components/src/Custombutton";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
let prevOpenedRow: any;
let row: Array<any> = [];

// Customizable Area End

import CfLiveChallengesPopUpController, {
    Props,
} from "./CfLiveChallengesPopUpController";
import Scale from "../../../components/src/Scale";
import { translate } from "../../../components/src/i18n/translate";

export default class CfChallengesDurationPopup extends CfLiveChallengesPopUpController {
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

    async componentDidMount() {
        console.log("idddfffff==>",this.props.route.params.statusId)
        this.setState({statusId:this.props.route.params.statusId})
        this.props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            this.setState({ gitfmodel2:true })
          });
          this.setState({ gitfmodel2:true })
    }
    // Customizable Area Start


    giftmodel = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.gitfmodel2}
                onRequestClose={this.closeGiftModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalListContainer}>
                        <View style={[styles.modalHeader]}>
                            <Text style={styles.headerText}>{ translate("select_challenge_duration")}</Text>
                            <TouchableOpacity testID="btnGoBack" style={{ position: "absolute", right: -60 }} onPress={()=>this.setState({gitfmodel2:false} ,()=> this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'BottomTabScreen' }],
          }))}>
                                <Image source={require('../assets/cancelicon.png')} style={styles.cancelButton} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 0.5, backgroundColor: "#aaa" }}></View>
                        <View>
                            <View style={styles.liveChallenge}>

                                <ImageBackground source={require('../assets/BG.png')} imageStyle={{ borderRadius: 8 }} style={styles.ChallengeBackgroud}>

                                    <Text style={styles.cardVersus}>5 min</Text>
                                    <Text style={styles.cardChallengedesc}>
                                        {translate("test_your_skills_in_this_challenge_against_a_single_opponent")}
                                    </Text>
                                    <View style={styles.ChallengeStart}>
                                        <Image source={require('../assets/avatar.png')} style={styles.avtar} />
                                        <CustomButton isLoader={this.state.loader} testID="btn1" title={translate("start")} style={{ borderRadius: 10, }} TextStyle={{ color: "black" }}   onPress={() => {
                                           // this.createLiveChallenge()
                                           this.setState({duration:5,loader:true})
                                           this.loggeduserdetails();
                                        // this.props.navigation.navigate("CfLiveChallenges",{duration:5,statusId:this.state.statusId})

                                        }}
                                        />
                                        <Image source={require('../assets/avatar.png')} style={styles.avtar} />

                                    </View>

                                </ImageBackground>

                                <ImageBackground source={require('../assets/BG-1.png')} imageStyle={{ borderRadius: 8 }} style={styles.ChallengeBackgroud}>

                                    <Text style={styles.cardVersus}>10 min</Text>
                                    <Text style={styles.cardChallengedesc}>
                                        {translate("test_your_skills_in_this_team_challenge_against_a_two_opponent")}
                                    </Text>
                                    <View style={styles.ChallengeStart}>
                                        <View style={styles.challengetwo}>
                                            <Image source={require('../assets/avatar.png')} style={styles.avtar} />
                                            <Image source={require('../assets/avatar.png')} style={[styles.avtar, { marginLeft: -15 }]} />
                                        </View>
                                        <CustomButton isLoader={this.state.loader1} testID="btn2" title={translate("start")} style={{ borderRadius: 10, }} TextStyle={{ color: "black" }} onPress={() => {
                                          this.setState({duration:10,loader1:true})
                                         this.loggeduserdetails();
                                          }
                                        }/>
                                        <View style={styles.challengetwo}>
                                            <Image source={require('../assets/avatar.png')} style={[styles.avtar ,{zIndex:1}]} />
                                            <Image source={require('../assets/avatar.png')} style={[styles.avtar, { marginLeft: -15 }]} />
                                        </View>
                                    </View>

                                </ImageBackground>
                                <ImageBackground source={require('../assets/BG-2.png')} imageStyle={{ borderRadius: 8 }} style={styles.ChallengeBackgroud}>

                                    <Text style={styles.cardVersus}>15 min</Text>
                                    <Text style={styles.cardChallengedesc}>
                                        {translate("test_your_skills_in_this_squad_challenge_against_a_squad")}
                                    </Text>
                                    <View style={styles.ChallengeStart}>
                                        <View style={styles.challengetwo}>
                                            <Image source={require('../assets/avatar.png')} style={[styles.avtar]} />
                                            <Image source={require('../assets/avatar.png')} style={[styles.avtar, { marginLeft: -20 }]} />
                                            <Image source={require('../assets/avatar.png')} style={[styles.avtar, { marginLeft: -20 }]} />
                                        </View>
                                        <CustomButton isLoader={this.state.loader2} testID="btn3" title={translate("start")} style={{ borderRadius: 10, }} TextStyle={{ color: "black" }} onPress={() =>{
                                             this.setState({duration:15,loader2:true})
                                             this.loggeduserdetails()
                                        }}
                                        />
                                        <View style={styles.challengetwo}>
                                            <Image source={require('../assets/avatar.png')} style={[styles.avtar,{zIndex:2}]} />
                                            <Image source={require('../assets/avatar.png')} style={[styles.avtar, { zIndex:1,marginLeft: -20 }]} />
                                            <Image source={require('../assets/avatar.png')} style={[styles.avtar, { marginLeft: -20 }]} />
                                        </View>
                                    </View>

                                </ImageBackground>
                            </View>

                        </View>
                    </View>
                </View>
            </Modal >
        );
    };
    // Customizable Area End

    render() {
        // Customizable Area Start
        // Merge Engine - render - Start
        return (
            <View style={styles.container}>
                {this.giftmodel()}
            </View>
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
        width: Platform.OS === "web" ? "75%" : "100%",
        maxWidth: 650,
        backgroundColor: "#aaa",
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
        maxHeight: Scale(800),
        fontWeight: "800"

    },
    modalHeader: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Scale(20),
        paddingBottom: Scale(20),
        width: screenWidth,
    },
    headerText: {
        fontFamily:FONTS.MontserratBold,
        fontSize: Scale(20),
        width: "100%",
        textAlign: 'center',
    },
    cancelButton: {
        resizeMode: "contain",
        height: Scale(23),
        alignSelf: "flex-end"
    },
    liveChallenge: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom:20
    },
    challengeCard: {
        width: screenWidth * 0.9,
        height: 160,
        backgroundColor: "#eee",
        alignSelf: "center",
        marginTop: 20
    },
    cardVersus: {
        alignSelf: "center",
        color: "#fff",
        fontSize: 17,
        fontFamily: FONTS.MontserratSemiBold
    },
    cardChallengedesc: {
        fontSize: 12,
        paddingLeft: 20,
        paddingRight: 20,
        lineHeight: 18,
        marginTop: 5,
        color: "#aaa",
        alignSelf: "center",
        opacity:0.8
    },
    ChallengeStart: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 11,
        margin: 5
    },
    avtar: {
        height: Scale(40),
        width: Scale(40)
    },
    ChallengeBackgroud: {
        resizeMode: "cover",
        width: screenWidth * 0.9,
        alignSelf: "center",
        marginTop: 15,
        padding: 12
    },
    challengetwo: {
        display: "flex",
        flexDirection: "row",
    }

});
// Customizable Area End
