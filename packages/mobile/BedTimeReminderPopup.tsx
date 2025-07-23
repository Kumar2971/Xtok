import React from "react";
// Customizable Area Start
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    Modal,
    Dimensions,
    Platform,
    SafeAreaView,
    YellowBox,
    Linking
} from "react-native";
import { Button } from "react-native-elements";
//@ts-ignore
// import DeviceInfo from 'react-native-device-info';
import { responsiveWidth } from 'react-native-responsive-dimensions';

import FONTS from "../components/src/Fonts/Fonts";
const { width } = Dimensions.get("window");
// Customizable Area End
import { BlockComponent } from "../framework/src/BlockComponent";
import { runEngine } from "../framework/src/RunEngine";
import MessageEnum, {
    getName
} from "../framework/src/Messages/MessageEnum";
import { Message } from "../framework/src/Message";
import Scale from "../components/src/Scale";
import CustomButton from "../components/src/Custombutton";
import ReactNativeModal from "react-native-modal";
import { getStorageData } from "../framework/src/Utilities";
import moment from "moment";
import { translate } from "../components/src/i18n/translate";


interface Props {
    navigation?: any;
    id?: string;
    // Customizable Area Start
    // Customizable Area End
}

interface S {
    // Customizable Area Start
    loading: boolean;
    appData: any;
    isModalOpen: boolean;
    totalTime: number;
    bedTimeStartTime: any;
    bedTimeEndTime: any;
    appdataItem: any;
    rawStartTime: any;
    rawEndTime: any;
    isEnable: boolean;
    // Customizable Area End
}

interface SS {
    // Customizable Area Start
    // Customizable Area End
}

class BedTimeReminder extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
    arrayholder: any[];
    getBedTimeReminderId: any;
    doJob: number;
    // Customizable Area End
    constructor(props: Props) {
        super(props);

        // Customizable Area Start
        this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];
        this.receive = this.receive.bind(this);
        runEngine.attachBuildingBlock(this, this.subScribedMessages);

        this.state = {
            loading: true,
            appData: [],
            isModalOpen: false,
            totalTime: -1,
            bedTimeStartTime: null,
            bedTimeEndTime: null,
            appdataItem: null,
            rawStartTime: null,
            rawEndTime: null,
            isEnable: false,
        };

        this.arrayholder = [];
        // Customizable Area End
    }



    async componentDidMount() {
        this.getBedTimeReminderSettings()

        this.doJob = setInterval(
            () => {
                const currentTime = moment().format('HH:mm')


                if (this.state.isEnable) {
                    if ((currentTime > this.state.bedTimeStartTime) && (currentTime < this.state?.bedTimeEndTime)) {
                        this.setState({ isModalOpen: true })
                    }
                }

            }, 10000);


    }

    componentDidUpdate() {

    }

    async componentWillUnmount() {
        clearInterval(this.doJob);
    }

    getBedTimeReminderSettings = async () => {
        const token = await getStorageData('authToken')
        const header = {
            token
        }

        this.apiCall({
            setApiCallId: 'getBedTimeReminderCallId',
            header,
            method: "GET",
            endPoint: "/bx_block_settings/bedtime_reminders",
        })
    }



    appModal = () => {
        return (
            <ReactNativeModal isVisible={this.state.isModalOpen}
                presentationStyle="overFullScreen"
            >
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <Text style={[styles.textStyle, styles.boldText]}>{translate("Bed_Time_Reminder")}</Text>
                        <Text style={[styles.textStyle, styles.marginStyle]}>{translate("It_is_your_bed_time")} </Text>
                        <View style={styles.btnView}>
                            <CustomButton title={translate("okay")} style={[styles.btnStyle, styles.marginStyle]}
                                onPress={() => {
                                    this.getBedTimeReminderSettings();
                                    this.setState({ isModalOpen: false })
                                    clearInterval(this.doJob)
                                }} />
                        </View>
                    </View>
                </View>
            </ReactNativeModal>
        )
    }
    // Customizable Area End

    render() {
        // Customizable Area Start
        console.ignoredYellowBox = ['Setting a timer'];
        return (
            <>
                {this.appModal()}
            </>

        );
        // Customizable Area End
    }



    async receive(from: string, message: Message) {
        runEngine.debugLog("Message Recived", message);

        // Customizable Area Start
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );

            var responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );

            var errorReponse = message.getData(
                getName(MessageEnum.RestAPIResponceErrorMessage)
            );

            if (apiRequestCallId != null) {
                if (apiRequestCallId === this.getBedTimeReminderId) {
                    const res = responseJson.data.attributes
                    const startTime = res?.start_time?.split("T")[1]?.split(".")[0]?.slice(0, -3)
                    const endTime = res?.end_time?.split("T")[1]?.split(".")[0]?.slice(0, -3)
                    const isEnabled = res?.is_enabled

                    if (isEnabled) {
                        this.setState({
                            rawStartTime: res?.start_time,
                            rawEndTime: res?.end_time,
                            bedTimeStartTime: startTime,
                            bedTimeEndTime: endTime,
                            isEnable: isEnabled
                        })
                    }
                    if (!isEnabled) {
                        clearInterval(this.doJob)
                    }
                }
            }
        }
        // Customizable Area End
    }

    apiCall = async (data: any) => {
        const { setApiCallId, header, endPoint, method, body } = data;

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        if (setApiCallId === "getBedTimeReminderCallId") {
            this.getBedTimeReminderId = requestMessage.messageId;
        }
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            endPoint
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            method
        );

        body &&
            requestMessage.addData(
                getName(MessageEnum.RestAPIRequestBodyMessage),
                body
            );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    };
}

// Customizable Area Start
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            marginLeft: "auto",
            marginRight: "auto",
            width: Platform.OS === "web" ? "75%" : "100%",
            maxWidth: 650,
        },
        viewWrapper: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        modalView: {

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: Scale(20),
            width: width * 0.8,
            backgroundColor: "#fff",
            borderRadius: 8,
            borderColor: '#FFC925',
            borderWidth: .5
        },
        btnView: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: Scale(10),
            justifyContent: "center",
            alignItems: "center"
        },
        btnStyle: {
            // marginRight: Scale(10) ,
            width: "98%"
        },
        textStyle: {
            fontSize: Scale(14),
            fontFamily: FONTS.MontserratMedium,
            textAlign: "center"
        },
        boldText: {
            fontWeight: "bold"
        },
        fontfamily: {
            fontFamily: FONTS.MontserratRegular
        },
        marginStyle: {
            marginTop: Scale(10),
            fontFamily: FONTS.MontserratRegular
        },
        btn1: {
            marginTop: Scale(10),
            alignItems: "flex-end",
            justifyContent: "flex-end",
        }
    }
);
// Customizable Area End
export default BedTimeReminder;
