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

const androidVersion = "3.1";
const iosVersion = "3.1";

interface Props {
    navigation: any;
    id: string;
    // Customizable Area Start
    // Customizable Area End
}

interface S {
    // Customizable Area Start
    loading: boolean;
    appData: any;
    isModalOpen: boolean;
    appdataItem:any;
    // Customizable Area End
}

interface SS {
    // Customizable Area Start
    // Customizable Area End
}

class AppVersion extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
    arrayholder: any[];
    getAppVersionApiCallId: any;
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
            appdataItem:null
        };

        this.arrayholder = [];
        // Customizable Area End
    }

    async componentDidMount() {
        // Customizable Area Start
        // let version = DeviceInfo.getVersion();
        // console.log("versionName====>",version);

        this.getAppData();
        // Customizable Area End
    }

    // Customizable Area Start

    goToContinue() {

    }

    getAppData = async () => {
        const header = {
            "Content-Type": "application/json",
        };

        this.apiCall({
            setApiCallId: 'getAppVersionApiCallId',
            header,
            method: "GET",
            endPoint: `/bx_block_admin/app_updates`,
            body: null
        });
    }

    appModal = () => {
        const {appdataItem} = this.state;
        console.log("appdataItem==>",appdataItem);
        const storeName = Platform.OS === 'ios' ? 'app store' : 'play store';
        const url = Platform.OS === 'ios' ? `itms-apps://apps.apple.com/us/app/golavi/id6446027378?l=tr` : 'http://play.google.com/store/apps/details?id=com.golavi.cashgate';
        return (
            <Modal animationType="slide"
                transparent visible={this.state.isModalOpen}
                presentationStyle="overFullScreen"
            >
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                    {appdataItem?.update_type === "Force_update" ?
                    <>
                     <Text style={styles.textStyle}>Update available</Text>
                     <Text style={[styles.textStyle,styles.marginStyle]}>{`This version of the app is outdated. Please update app from the ${storeName}`}</Text>
                        <View style={[styles.btn1 ]}>
                            <CustomButton testID="updateBtn" style={[styles.fontfamily,{width:"100%"}]} title="Update" onPress={() => Linking.openURL(url)} />
                        </View>
                    </>
                    :
                    <>
                     <Text style={styles.textStyle}>Update available</Text>
                     <Text style={[styles.textStyle,styles.marginStyle]}>{`This version of the app is outdated. Please update app from the ${storeName}`}</Text>
                        <View style={styles.btnView}>
                            <CustomButton  testID="keepBtn" title="Keep"  style={styles.btnStyle} onPress={() => this.setState({isModalOpen:false})} />
                            <CustomButton  testID="updateBtn1" title="Update" style={[styles.fontfamily,styles.btnStyle]} onPress={() => Linking.openURL(url)} />

                        </View>
                    </>
                    }

                    </View>
                </View>
            </Modal>)
    }
    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <>
                {this.appModal()}
            </>

        );
        // Customizable Area End
    }

    isNewerVersion (oldVer, newVer) {
        const oldParts = oldVer.split('.')
        const newParts = newVer.split('.')
        for (var i = 0; i < newParts.length; i++) {
          const a = ~~newParts[i] // parse int
          const b = ~~oldParts[i] // parse int
          if (a > b) return true
          if (a < b) return false
        }
        return false
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
                if (apiRequestCallId === this.getAppVersionApiCallId) {
                    console.log("console getAppVersionApiCallId response==>", responseJson);
                    if (responseJson && (responseJson.errors || responseJson.error)) {
                        // this.handleErrorResponse(responseJson);
                    } else if (responseJson && responseJson.hasOwnProperty('updateInfo')) {
                        this.setState({ appData: responseJson });
                        const os = Platform.OS == "android" ? "Android" : "Ios";
                        const version = Platform.OS == "android" ? androidVersion : iosVersion
                       const forceupdate =  this.state.appData.updateInfo.filter((item:any) => {
                            return item?.update_type === "Force_update" && item?.platform === os && this.isNewerVersion(version , item?.version);
                        })

                        if(forceupdate.length > 0){
                            this.setState({appdataItem: forceupdate[0] , isModalOpen:true})
                        }

                        const softupdate =  this.state.appData.updateInfo.filter((item:any) => {
                            return item?.update_type === "Soft_update" && item?.platform === os && this.isNewerVersion(version , item?.version);
                        })
                        if(softupdate.length > 0 && forceupdate.length == 0){
                            this.setState({appdataItem: softupdate[0] , isModalOpen:true})
                        }
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
        if (setApiCallId === "getAppVersionApiCallId") {
            this.getAppVersionApiCallId = requestMessage.messageId;
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
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            elevation: 5,
            transform: [{ translateX: -(width * 0.4) },
                        { translateY: -90 }],
            // height: 160,
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
            marginVertical: Scale(10) ,
            alignItems:"center"
        },
        btnStyle:{
            // marginRight: Scale(10) ,
            width:"98%"
        },
        textStyle:{
            fontSize:Scale(12),
            fontFamily:FONTS.MontserratMedium,
            textAlign:"left"
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
export default AppVersion;
