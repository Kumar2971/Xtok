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
import { translate } from "../components/src/i18n/translate";
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
    totalTime : number;
    appdataItem:any;
    // Customizable Area End
}

interface SS {
    // Customizable Area Start
    // Customizable Area End
}

class TakeABreakReminderPopup extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
    arrayholder: any[];
    getBreakApiCallId: any;
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
            totalTime:-1,
            appdataItem:null
        };

        this.arrayholder = [];
        // Customizable Area End
    }

    // doJob (){
    //     this.setState({isModalOpen:true})
    //     this.getBreakReminder()
    // }

    async componentDidMount(){
        this.getBreakReminder()
        this.doJob = setInterval(
          () => {
            this.setState((prevState)=> ({ totalTime: prevState.totalTime - 1000 }))
            if(this.state.totalTime === 0){
                this.setState({isModalOpen:true})
                this.getBreakReminder()
            }
        //   console.log("iuoshjdfiosdhjfsdiofhj",this.state.totalTime)
        },
          1000
        );

        if(this.state.totalTime === 0){
            this.setState({isModalOpen:true})
            this.getBreakReminder()
        }
      }

      componentDidUpdate(){
        if(this.state.totalTime === 0){
        this.getBreakReminder()
        // console.log("i am here in update")
        //   clearInterval(this.doJob);
        }
      }

      async componentWillUnmount(){
       clearInterval(this.doJob);
      }

    getBreakReminder = async () => {
      const token = await getStorageData('authToken',false)
        const header = {
            "Content-Type": "application/json",
            token
        };

        this.apiCall({
            setApiCallId: 'getBreakReminderCallId',
            header,
            method: "GET",
            endPoint: `/bx_block_settings/take_a_break_reminders`,
            body: null
        });
    }



    appModal = () => {
        return (
            <ReactNativeModal isVisible={this.state.isModalOpen}
                presentationStyle="overFullScreen"
            >
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>

                     <Text style={[styles.textStyle,styles.boldText]}>{translate("break_reminder")}</Text>
                     <Text style={[styles.textStyle,styles.marginStyle]}>{translate("time_for_break")}</Text>
                        <View style={styles.btnView}>
                            <CustomButton title={translate('okay')}  style={[styles.btnStyle,styles.marginStyle]}
                            onPress={() => {
                                this.getBreakReminder();
                                this.setState({isModalOpen:false})
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
                if (apiRequestCallId === this.getBreakApiCallId) {
                  const res = responseJson.data.attributes
                    // console.log("console minutes==>", res?.frequency_in_minutes);
                    // console.log("console hours==>", res?.frequency_in_hours);

                    const minutes_as_milliseconds = +res?.frequency_in_minutes * 60000;
                    const hours_as_milliseconds = +res?.frequency_in_hours * 3600000;
                    const total_milliseconds = minutes_as_milliseconds + hours_as_milliseconds;
                    const isEnabled = res?.is_enabled;

                    // console.log("console total_milliseconds==>", total_milliseconds);
                    // console.log("console isEnabled==>", isEnabled)
                    if(isEnabled ){
                        this.setState({
                            totalTime:total_milliseconds,
                        })
                    }
                    // if(isEnabled && this.state.totalTime === 0){
                    //    this.setState({
                    //     isModalOpen:true
                    //    })
                    // }
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
        if (setApiCallId === "getBreakReminderCallId") {
            this.getBreakApiCallId = requestMessage.messageId;
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
            // alignItems: "center",
            // justifyContent: "center",
            // position: "absolute",
            // top: "50%",
            // left: "50%",
            // elevation: 5,
            // transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
            // height: 160,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding:Scale(20),
            width: width * 0.8,
            backgroundColor: "#fff",
            borderRadius: 8,
            borderColor: '#FFC925',
            borderWidth: .5
        },
        btnView:{
            display: 'flex',
            flexDirection: 'row',
            marginTop: Scale(10) ,
            justifyContent:"center",
            alignItems:"center"
        },
        btnStyle:{
            // marginRight: Scale(10) ,
            width:"98%"
        },
        textStyle:{
            fontSize:Scale(14),
            fontFamily:FONTS.MontserratMedium,
            textAlign:"center"
        },
        boldText:{
          fontWeight:"bold"
        },
        fontfamily:{
            fontFamily:FONTS.MontserratRegular
        },
        marginStyle:{
            marginTop:Scale(10),
            fontFamily:FONTS.MontserratRegular
        },
        btn1:{
            marginTop:Scale(10),
            alignItems:"flex-end",
            justifyContent:"flex-end",
        }
    }
);
// Customizable Area End
export default TakeABreakReminderPopup;
