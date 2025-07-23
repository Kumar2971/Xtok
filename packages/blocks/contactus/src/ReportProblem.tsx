import React from "react";
// Customizable Area Start
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import { Button, colors } from "react-native-elements";
import FONTS from "../../../components/src/Fonts/Fonts";
import Scale from "../../../components/src/Scale";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import ReportProblemController, { Props } from "./ReportProblemController";
import { backArrow, imgClose, imgRightArrow, imgLeftArrow } from "./assets";
import { translate } from "../../../components/src/i18n/translate";
let screenWidth = Dimensions.get('window').width; 
// Customizable Area End
export const configJSON = require("./config");

export default class ReportProblem extends ReportProblemController {
    constructor(props: Props) {
        super(props);
    }

    // Customizable Area Start
    renderHeader = () => {
        const { language } = this.state;
        return (
            <>
                <View style={[styles.headerStyle , styles.divider]}>
                    <TouchableOpacity
                        testID="btnGoBack"
                        style={language == "ar" ? styles.imgrightView : styles.imgView}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image source={imgLeftArrow} style={[styles.backarrow_style_en, language == "ar" && { transform: [{ rotate: "180deg" }] }]} />
                    </TouchableOpacity>
                    <Text style={[styles.titleStyle2]}>{translate("report_a_problem")}</Text>
                </View>
                
            </>
        )
    }
    deleteItem = (filename: any) => {
        const filteredData = this.state.ImageSourceviewarray.filter((item: any) => (item && item.filename) !== filename);
        this.setState({ ImageSourceviewarray: filteredData, imagErrorMsg: "" });
    }
    renderImage = (item: any) => {
        const url = `data:${item && item.item && item.item.type};base64,${item && item.item && item.item.data}`;
        const fileName = item && item.item && item.item.filename;
        return (
            <TouchableOpacity activeOpacity={1} style={styles.imgViewStyle}>
                <View style={styles.imagePickerView}>
                    <Image style={[styles.imgStyle, styles.uploadImgStyle]} resizeMode={"cover"} source={{ uri: url }} />
                </View>
                <TouchableOpacity testID="deleteBtn" style={styles.crossImgView} onPress={() => this.deleteItem(fileName)}>
                    <Image source={imgClose} style={styles.imgStyle} />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
    render() {
        const { errors, ImageSourceviewarray, description} = this.state;
        return (
            <KeyboardAvoidingView
                behavior={this.isPlatformiOS() ? undefined : undefined}
                style={styles.keyboardPadding}
            >
                <SafeAreaView style={styles.keyboardPadding}>
                    {this.renderHeader()}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.container}>
                    <View style={styles.container}>
                        <Text style={[styles.descText ,this.state.language == "ar" && styles.descTextAlign ]}>{translate("Description")}</Text>
                        <Text style={styles.descText2}>{translate("writeDesc")}</Text>
                        <TextInput
                            style={[styles.captionInput, { textAlign: this.state.language == "ar" ? 'right' : 'left' }]}
                            onChangeText={(txt: string) => this.onCaptionTextChange(txt)}
                            value={description}
                            placeholder={translate("writeHere")}
                            placeholderTextColor="#B7BBC0"
                            multiline={true}
                            testID="txtInputDescription"
                            maxLength={200}
                        // inputStyle={this.state.language=="ar" && styles.inputTextRight}
                        />
                        {errors ? <Text style={styles.errorText}>{errors}</Text> : <View />}
                        <View>
                            <FlatList
                                testID="imageFlatlist"
                                data={ImageSourceviewarray}
                                style={styles.flatListStye}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                decelerationRate="fast"
                                bounces={false}
                                //@ts-ignore
                                renderItem={(item: any, index: number) => this.renderImage(item)}
                                keyExtractor={(item: any, index: any) => index}
                            />
                            {this.state.imagErrorMsg ? <Text style={styles.errorText}>{this.state.imagErrorMsg}</Text> : <View />}
                        </View>
                        <View style={styles.absoluteView}>
                            <Button
                                testID="addphphotosBtn"
                                buttonStyle={[styles.addPhotosBtn]}
                                containerStyle={styles.btnContainerStyle}
                                onPress={() => this.goImagePicker()}
                                title={translate("AddPhotos")}
                                titleStyle={styles.btnTitleStyle}
                            />
                            <Button
                                testID="sendReportBtn"
                                buttonStyle={[styles.sendReportBtn]}
                                containerStyle={styles.btnContainerStyle}
                                onPress={() => this.sendReport()}
                                title={translate("SendReport")}
                                titleStyle={styles.btnTitleStyle}
                                loading={this.state.apiCallLoader}
                                disabled={this.state.disable}
                            />
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                    <View style={{}}>
                        <Modal
                            //@ts-ignore
                            testID="submitModal"
                            animationType="slide"
                            transparent={true}
                            visible={this.state.openReportModal}
                            onRequestClose={() => {
                                this.setReportModal(false)
                            }}
                        >
                            <View style={styles.modalView}>
                                <View style={styles.modalSubView}>
                                    <View style={{}}>
                                        <Text style={styles.feedbackText}>{translate("thanks_for_submitting_your_feedback")}</Text>
                                    </View>
                                    <View style={{}}>
                                        <TouchableOpacity
                                            onPress={() => this.goToNext()}
                                            testID={`okBtn`}
                                            style={styles.okBtn}
                                        >
                                            <Text style={styles.btnTitleStyle}>{translate("ok")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    
                   
                </SafeAreaView>
            </KeyboardAvoidingView>
            //Merge Engine End DefaultContainer
        );
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginLeft: "auto",
        marginRight: "auto",
        width: Platform.OS === "web" ? "75%" : "100%",
        maxWidth: 650,
        backgroundColor: "#ffffffff",
    },
    keyboardPadding: { flex: 1 },
    headerStyle: {
        flexDirection: "row",
		alignItems:'center',
		paddingHorizontal: Scale(15),
		height: Scale(40),
		width: '100%',
        backgroundColor:'#fff'
    },
    divider: {
        borderBottomColor: "#B7BBC0",
        borderBottomWidth: StyleSheet.hairlineWidth,
        // marginVertical: 10,
      },
    imgStyle: {
        height: "100%",
        width: "100%",
        // resizeMode: "contain"
    },
    backarrow_style_en: {
        width: Scale(25),
        height: Scale(25),
        resizeMode: "contain"
    },
    imgView: {
        height: deviceBasedDynamicDimension(20, true, 1),
        width: deviceBasedDynamicDimension(20, true, 1),
    },
    imgrightView: {
        height: deviceBasedDynamicDimension(15, true, 1),
        width: deviceBasedDynamicDimension(15, true, 1),
    },
    titleStyle: {
        fontSize: deviceBasedDynamicDimension(18, true, 1),
        marginLeft: deviceBasedDynamicDimension(50, true, 1),
        color: "#000000",
        fontFamily: FONTS.MontserratMedium,
    },
    titleStyle2: {
        fontSize:Scale(18),
        fontWeight:'bold',
        width:screenWidth-Scale(60),
        textAlign:'center'
    },
    deviceLine: {
        borderColor: "#EEEEEE",
        borderWidth: 1,
        height: Scale(1),
    },
    descText: {
        fontFamily: FONTS.MontserratMedium,
        textTransform: "uppercase",
        fontSize: deviceBasedDynamicDimension(14, true, 1),
        color: "#9E9E9E",
        // textAlign:'right'
    },
    descTextAlign :{
        textAlign:'left'
    },
    descText2: {
        fontFamily: FONTS.MontserratRegular,
        fontSize: deviceBasedDynamicDimension(12, true, 1),
        color: "#9E9E9E",
        marginVertical: deviceBasedDynamicDimension(10, false, 1),
        width: "100%",
        textAlign: "center"
    },
    captionInput: {
        textAlignVertical: 'top',
        height: "20%",
        width: "100%",
        paddingTop: deviceBasedDynamicDimension(15, true, 1),
        paddingLeft: deviceBasedDynamicDimension(15, true, 1),
        borderWidth: 0.5,
        borderColor: "#FFFFFF",
        borderRadius: deviceBasedDynamicDimension(10, true, 1),
        backgroundColor: "#FAFAFA",
        marginVertical: deviceBasedDynamicDimension(10, false, 1),
        fontFamily: FONTS.MontserratRegular
    },
    absoluteView: {
        position: "absolute",
        left: 16,
        right: 0,
        bottom: deviceBasedDynamicDimension(20, false, 1),
        width: "100%",
    },
    addPhotosBtn: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#FFC925",
        borderRadius: 50,
        height: deviceBasedDynamicDimension(50, true, 1)
    },
    sendReportBtn: {
        backgroundColor: "#FFC925",
        borderRadius: 50,
        height: deviceBasedDynamicDimension(50, true, 1)
    },
    btnContainerStyle: {
        marginTop: deviceBasedDynamicDimension(10, false, 1)
    },
    btnTitleStyle: {
        fontFamily: FONTS.MontserratSemiBold,
        color: "#000",
        fontSize : Scale(18),
        fontWeight : 'bold'
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: deviceBasedDynamicDimension(110, true, 1),
        width: deviceBasedDynamicDimension(110, true, 1),
        // borderWidth:1,
        backgroundColor: 'rgba(242, 243, 250, 1)',
    },
    absoluteImgView: {
        position: 'absolute',
        bottom: 0,
        right: deviceBasedDynamicDimension(120, true, 1)
    },
    imgViewStyle: {
        marginTop: deviceBasedDynamicDimension(20, false, 1)
    },
    flatListStye: {
        alignSelf:"flex-start",
    },
    imagePickerView: {
        height: deviceBasedDynamicDimension(150, true, 1),
        width: deviceBasedDynamicDimension(120, true, 1),
        // borderWidth:1,
        borderRadius: deviceBasedDynamicDimension(10, true, 1),
        justifyContent: "center",
        alignItems: "center",
        marginRight: deviceBasedDynamicDimension(10, true, 1),
        backgroundColor: "#000"
    },
    uploadImgStyle: {
        borderRadius: deviceBasedDynamicDimension(10, true, 1),
        overflow: "hidden",
    },
    crossImgView: {
        position: "absolute",
        top: -5,
        right: 5,
        height: deviceBasedDynamicDimension(20, true, 1),
        width: deviceBasedDynamicDimension(20, true, 1)
    },
    errorText: {
        fontFamily: FONTS.MontserratRegular,
        marginTop: deviceBasedDynamicDimension(5, true, 1),
        fontSize: deviceBasedDynamicDimension(10, true, 1),
        color: "red",
    },
    modalView: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    modalSubView: {
        backgroundColor: "white",
        borderRadius: 20,
        marginHorizontal: "5%",
        padding: 30,
        borderWidth: 1,
        borderColor: "#FFC925"
    },
    okBtn: {
        height: deviceBasedDynamicDimension(50, true, 1),
        borderRadius: deviceBasedDynamicDimension(50, true, 1),
        backgroundColor: "#FFC925",
        justifyContent: "center",
        alignItems: "center",
        marginTop: deviceBasedDynamicDimension(20, true, 1)
    },
    feedbackText: {
        fontFamily: FONTS.MontserratRegular,
        fontSize: deviceBasedDynamicDimension(14, true, 1)
    }
});
