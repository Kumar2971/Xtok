import React from "react";

// Customizable Area Start
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import messaging from '@react-native-firebase/messaging';
import { translate } from "../../../components/src/i18n/translate";
//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import Chat9Controller, {
    Props,
} from "./Chat9Controller";
import { addFriend, back, share, profile_pic } from "./assets";
import moment from "moment";
import {  leftArrow } from "../../LiveFeedScheduling/src/assets";
import { getStorageData } from "framework/src/Utilities";


export default class ChatList extends Chat9Controller {
    focusLisner: any
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    async componentDidMount() {

        messaging().onMessage(async (remoteMessage: any) => {
            this.getPreviousChats();
        })
        const language = await getStorageData("SelectedLng");
        this.setState({ language: language });


        this.getPreviousChats();
        this.focusLisner = this.props.navigation.addListener("focus", async () => {
            const language = await getStorageData("SelectedLng");
            this.setState({ language: language });
            this.getPreviousChats()
        });
    }

    async componentWillUnmount() {
        this.focusLisner()
    }
    // Customizable Area End

    renderItem = (item: any) => {
        let checkDate = item?.item?.attributes?.last_message?.attributes?.created_at ? moment(item?.item?.attributes?.last_message?.attributes?.created_at).format('dddd') : ''
        let idOfUser = item?.item?.attributes?.friend_account[0]?.data?.id
        return (
            <View>
            <TouchableOpacity
              testID="chatNavigationFunctionBTn"
              style={[
                styles.continue,
                {
                  flexDirection:  "row",
                },
              ]}
              onPress={(item) =>
                this.props.navigation.navigate("Chat9", { acc_id: idOfUser })
              }
            >
              <TouchableOpacity
                testID="profileNavigationFunctionBtn"
                onPress={() => {
                  this.props.navigation.navigate("UserProfileBasicBlock", {
                    data: {
                      attributes: {
                        account_id: idOfUser,
                      },
                    },
                  });
                }}
              >
                <Image
                  resizeMode="stretch"
                  source={
                    item?.item?.attributes?.friend_account[0]?.data?.attributes?.photo
                      ? {
                          uri: item?.item?.attributes?.friend_account[0]?.data?.attributes
                            ?.photo,
                        }
                      : profile_pic
                  }
                  style={styles.shadow}
                />
              </TouchableOpacity>
              <View
                style={[{
                  flex: 1,
                  // backgroundColor:'red'
                }, this.state.language =='ar'&&{   flexDirection:  "row",
                justifyContent: "space-between",
                alignItems: "center",}]}
              >
                <View style={{
                  flexDirection:'column',
                  justifyContent:'center',
                  alignItems:'flex-start',
                  marginHorizontal:10,
                }}>
                <Text style={[{ fontWeight: "bold" }
                ]}>
                    {
                      item?.item?.attributes?.friend_account[0]?.data?.attributes
                        ?.full_name
                    }
                  </Text>
                  <Text style={[{ color: "grey"}
                ]} numberOfLines={1}>
                  {/* {item?.item?.attributes?.last_message?.attributes?.attachment_type ==
                  null
                    ? item?.item?.attributes?.last_message?.attributes?.message
                    : "Say hello"} */}
                    {
                      item?.item?.attributes?.last_message?.attributes?.attachment_type == null ?
                      item?.item?.attributes?.last_message?.attributes?.message :
                      item?.item?.attributes?.last_message?.attributes?.attachment_type != null ?
                      "sent a photo/video"  : "Say hello"
                    }
                </Text>
                </View>

                </View>
                <Text style={{ color: "grey" }}>{checkDate}</Text>

            </TouchableOpacity>
          </View>

        );
    };

    render() {
        // Customizable Area Start
        // Merge Engine - render - Start
        return (
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={[styles.headerContainer,{
                        flexDirection: 'row', alignItems: 'center'
                    }]}>
                        <TouchableOpacity testID="touchableOpacity" onPress={() => this.goBackNavigationFunction()}>
                            <Image source={this.state.language =='ar' ? leftArrow :back} style={styles.backImage} resizeMode='contain' />
                        </TouchableOpacity>
                        <Text style={styles.directTextStyle}>{translate("direct_Messages")}</Text>
                        <TouchableOpacity testID="navigationFunctionBtn" onPress={() => this.navigationFunction()}>
                            <Image source={addFriend} style={styles.addImage} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.separator}/>
                    {this.state.dm_list.length == 0 ? <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Image source={share} style={{ height: 60, width: 60, marginBottom: 5 }} resizeMode="contain" />
                        <Text style={{ fontWeight: 'bold', fontSize: 16, paddingVertical: 5 }}>{translate("message_your_friends")}</Text>
                        <Text style={{ fontSize: 14, color: 'grey' }}>{translate("share_videos_or_start_a_conversation")}</Text>
                    </View> :
                        this.state.loading == true ?
                            <View style={{ position: 'absolute', alignSelf: 'center', top: '50%' }}>
                                <ActivityIndicator color="black" size={30} />
                            </View>
                            : null }
                            {this.state.dm_list.length != 0 && !this.state.loading ?
                            <FlatList
                                testID="flatList"
                                data={this.state.dm_list}
                                renderItem={(item: any) => this.renderItem(item)}
                                showsVerticalScrollIndicator={false}
                            />
                            : null
                    }
                </View>
            </SafeAreaView>
        );
        // Merge Engine - render - End
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,

    },
    headerContainer: {
        justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal: 20
    },
    backImage: {
        height: 20,
        width: 10,
    },
    directTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    addImage: {
        height: 25,
        width: 25
    },
    separator: {
      height: 0.5,
      width:"100%",
      backgroundColor:"grey",
      marginBottom: 5,
    },
    continue: {
        marginHorizontal: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    text: {
        color: "white",
        fontWeight: "700",
        fontSize: 20,
        paddingVertical: 15,
    },
    shadow: { height: 40, width: 40, borderRadius: 100, borderColor: 'grey', },

});
// Customizable Area End
