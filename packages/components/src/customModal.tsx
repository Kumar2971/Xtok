import React, { Component } from "react";
import { View, StyleSheet, Button, TouchableOpacity, Text, Modal, Alert, Image } from 'react-native';
import PropTypes from 'prop-types';
import scale, { verticalScale } from "../../components/src/Scale";
import { registerCustomIconType } from "react-native-elements";
// import fontFomily from "./fontFamily";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { cross } from "../../blocks/Chat9/src/assets";
// import { Button } from "react-native-elements";

type MyProps =
    {
        modalTitle: string,
        modalSubTitle1: string,
        modalSubTitle2: string,
        modalSubTitle3: string,
        modalSubTitle: any;
        modalTitleStyles: string,
        modalSubTitle1Styles: string,
        modalSubTitle2Styles: string,
        modalSubTitle3Styles: string,
        modalSubTitleStyles: any;
        onPressBack: () => void;
        onPressContinue: () => void;
        visible: any;
        onRequestClose: any;
        type: string,
        title: string,
        subTitle: string,
        onPressNext: () => void;
        onPressCancle: () => void;
        onPressOk: () => void;
        borderActive: string;
        linkText: string,
        leftImage: any;
        onPressLink: () => void;
        backBtnTextStyle: any,
        // textStyle: any;
        // buttonContainerStyle: any
    };

export default class CustomModal extends Component<MyProps>{
    static PropTypes = {
        modalTitle: PropTypes.string,
        modalSubTitle1: PropTypes.string,
        modalSubTitle2: PropTypes.string,
        modalSubTitle3: PropTypes.string,
        modalSubTitle: PropTypes.string,
        modalTitleStyles: PropTypes.any,
        modalSubTitle1Styles: PropTypes.any,
        modalSubTitle2Styles: PropTypes.any,
        modalSubTitle3Styles: PropTypes.any,
        modalSubTitleStyles: PropTypes.any,
        onPressBack: PropTypes.any,
        onPressContinue: PropTypes.any,
        visible: PropTypes.any,
        onRequestClose: PropTypes.any,
        type: PropTypes.string,
        title: PropTypes.string,
        subTitle: PropTypes.string,
        onPressNext: PropTypes.any,
        onPressCancle: PropTypes.any,
        onPressOk: PropTypes.any,
        borderActive: PropTypes.string,
        linkText: PropTypes.string,
        leftImage: PropTypes.any,
        backBtnTextStyle: PropTypes.any,
        onPressLink: PropTypes.func.isRequired
    };
    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    modalSwitch = () => {
        switch (this.props.type) {
            case "home":
                return (
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.props.visible}
                            onRequestClose={this.props.onRequestClose}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{}}>
                                        <Text style={[styles.modalTitle, { left: responsiveWidth(1), marginBottom: responsiveHeight(2) }]}>{this.props.modalTitle}</Text>
                                        <Text style={styles.modalSubTitle}>{this.props.modalSubTitle1}</Text>
                                        <Text style={styles.modalSubTitle2}>{this.props.modalSubTitle2}</Text>
                                        <Text style={styles.modalSubTitle3}>{this.props.modalSubTitle3}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', top: 10, marginBottom: verticalScale(20) }}>
                                        <TouchableOpacity
                                            style={[styles.button, { backgroundColor: "#CDDFFB", left: verticalScale(-10) }]}
                                            onPress={() => {
                                                this.props.onPressBack();
                                            }} >
                                            <Text style={[styles.textStyle, this.props.backBtnTextStyle]}>Back</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonClose, { right: verticalScale(-10) }]}
                                            // onPress={() => this.setModalVisible(!modalVisible)}
                                            onPress={() => {
                                                this.props.onPressContinue();
                                            }}
                                        >
                                            <Text style={[styles.textStyle, { color: 'white' }]}>Continue</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )

            case "deleteAccount":
                return (
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.props.visible}
                            onRequestClose={this.props.onRequestClose}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={[styles.modalTitle, { marginTop: 24, left: responsiveWidth(1) }]}>{this.props.modalTitle}</Text>
                                    <View style={{ elevation: 1, borderWidth: 0.15, width: responsiveWidth(90), marginTop: 24 }} ></View>
                                    <View style={{ width: responsiveWidth(50), height: responsiveHeight(10), justifyContent: "center", alignItems: 'center', margin: responsiveHeight(2) }}>
                                        <Text style={styles.modalSubTitle}>{this.props.modalSubTitle}</Text>
                                    </View>
                                    {/* </View> */}
                                    <View style={{ top: 10, width: '100%', alignItems: 'center', }}>
                                        <TouchableOpacity
                                            style={styles.deleteAccountFirstButtonStyle}
                                            onPress={() => {
                                                this.props.onPressNext();
                                            }} >
                                            <Text style={[styles.textStyle, { color:'white' }]}>{this.props.title}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.deleteAccountSecondButtonStyle}
                                            // onPress={() => this.setModalVisible(!modalVisible)}
                                            onPress={() => {
                                                this.props.onPressCancle();
                                            }}
                                        >
                                            <Text style={{
                                                // fontFamily: fontFomily.SemiBold,
                                                fontSize: 16,
                                                textAlign: "center"
                                            }}>{this.props.subTitle}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )

            case "logOut":
                return (
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.props.visible}
                            onRequestClose={this.props.onRequestClose}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ width: responsiveWidth(50), height: responsiveHeight(10), justifyContent: "center", alignItems: 'center', top: responsiveHeight(2), marginBottom: responsiveHeight(5) }}>
                                        <Text style={styles.modalSubTitle}>{this.props.modalSubTitle}</Text>
                                    </View>
                                    {/* </View> */}
                                    <View style={{ top: 10, width: '100%', alignItems: 'center', }}>
                                        <TouchableOpacity
                                            style={styles.deleteAccountFirstButtonStyle}
                                            onPress={() => {
                                                this.props.onPressNext();
                                            }} >
                                            <Text style={[styles.textStyle, { color: 'white' }]}>{this.props.title}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.deleteAccountSecondButtonStyle}
                                            // onPress={() => this.setModalVisible(!modalVisible)}
                                            onPress={() => {
                                                this.props.onPressCancle();
                                            }}
                                        >
                                            <Text style={{
                                                // fontFamily: fontFomily.SemiBold,
                                                fontSize: 16,
                                                textAlign: "center"
                                            }}>{this.props.subTitle}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )

            case "welcomeBack":
                return (
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.props.visible}
                            onRequestClose={this.props.onRequestClose}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ width: '100%', alignItems: 'center' }}>
                                        <Text style={styles.modalTitleBold}>{this.props.modalTitle}</Text>
                                        <Image source={cross} style={styles.image} />
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )
            case "attention":
                return (
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.props.visible}
                            onRequestClose={this.props.onRequestClose}
                        >
                            <View style={styles.centeredView}>
                                <View style={[styles.modalView, { height: 150 }]}>
                                    <View style={{ width: '100%', alignItems: 'center' }}>
                                        <View style={styles.headerStyles}>
                                            <TouchableOpacity onPress={() => {
                                                this.props.onPressBack();
                                            }}
                                                style={{ alignItems: 'center' }}
                                            >
                                                <Image source={this.props.leftImage} style={{ height: 20, width: 20, left: responsiveWidth(-10) }} />
                                            </TouchableOpacity>
                                            <Text style={styles.modalTitle}>{this.props.modalTitle}</Text>
                                        </View>
                                        <Text style={{ textAlign: 'center', height: responsiveHeight(10), width: responsiveWidth(70) }}>
                                            <Text style={styles.modalSubTitle}>{this.props.modalSubTitle1}</Text>
                                            <Text onPress={() => { this.props.onPressLink() }}
                                                style={styles.link}>{this.props.linkText}</Text>
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )
            case 'deactivateAccount':
                return (
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.props.visible}
                            onRequestClose={this.props.onRequestClose}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={[styles.modalTitle, { margin: responsiveHeight(2), left: responsiveWidth(1) }]}>{this.props.modalTitle}</Text>
                                        <Text style={[styles.modalSubTitle, { marginBottom: responsiveWidth(2), height: responsiveHeight(10), width: responsiveWidth(70) }]}>{this.props.modalSubTitle}</Text>
                                    </View>
                                    <View style={{ top: 10, width: '100%', alignItems: 'center', marginBottom: responsiveWidth(2) }}>
                                        <TouchableOpacity
                                            style={styles.deleteAccountFirstButtonStyle}
                                            onPress={() => {
                                                this.props.onPressOk();
                                            }} >
                                            <Text style={[styles.textStyle, { color: 'white' }]}>{this.props.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )
            default:
                return (
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.props.visible}
                            onRequestClose={this.props.onRequestClose}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Text style={styles.modalTitle}>{this.props.modalTitle}</Text>
                                        <View style={{ backgroundColor: 'grey', height: 0.5, marginVertical: 10 }}></View>
                                        <Text style={styles.modalSubTitle}>{this.props.modalSubTitle}</Text>
                                    </View>
                                    <View style={{ top: 10, width: '100%', alignItems: 'center', }}>
                                        <TouchableOpacity
                                            style={styles.deleteAccountFirstButtonStyle}
                                            onPress={() => {
                                                this.props.onPressOk();
                                            }} >
                                            <Text style={styles.textStyle}>{this.props.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )
        }
    }

    render() {
        return (
            <View>
                {this.modalSwitch()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
        backgroundColor: 'rgba(100,100,100, 0.7)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        // padding: 100,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // height: '45%',
        width: '90%',
        justifyContent: 'center',
        padding: 20
    },
    button: {
        width: "45%",
        height: scale(50),
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        // borderRadius: 20,
        // height: 50,
        // elevation: 2,
        // width: '43%',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    deleteAccountFirstButtonStyle: {
        borderRadius: 40,
        height: 50,
        // elevation: 2,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#1369EC",
    },
    deleteAccountSecondButtonStyle: {
        borderRadius: 40,
        height: 50,
        // elevation: 2,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderWidth: 1,
        marginVertical: 20,
        // top:16,
        borderColor: 'grey',
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#1369EC",
    },
    textStyle: {
        // fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
        // color: Colors.white,
        // fontFamily: fontFomily.SemiBold

    },
    modalTitle: {
        textAlign: "center",
        fontSize: 20,
        // fontFamily: fontFomily.SemiBold,
        // paddingBottom:responsiveHeight(2),
        right: responsiveWidth(15),

    },

    modalSubTitle: {
        textAlign: "center",
        fontSize: 16,
        color: '#616161',
        // fontFamily: fontFomily.Regular,
    },
    modalSubTitle2: {
        textAlign: "center",
        fontSize: 15,
        color: 'grey',
        margin: verticalScale(5),
        // fontFamily: fontFomily.Regular,
    },
    modalSubTitle3: {
        textAlign: "center",
        fontSize: 15,
        color: 'grey',
        marginTop: verticalScale(30),
        marginBottom: verticalScale(40),
        // fontFamily: fontFomily.Regular,
    },
    modalTitleBold: {
        marginBottom: 35,
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        marginTop: 30,
    },
    image: {
        marginBottom: 30,
        height: scale(135),
        width: scale(135),
    },
    link: {
        textAlign: "center",
        fontSize: 15,
        color: 'blue',
        // fontFamily: "OpenSans-Medium",
        textDecorationLine: 'underline'
    },
    headerStyles: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginTop: responsiveWidth(10),
        // marginRight:responsiveWidth(15),
        bottom: verticalScale(20),
        justifyContent: 'space-around',
        // height:responsiveHeight(10),
        backgroundColor: 'white',
        //    position:'relative'
    }
});
