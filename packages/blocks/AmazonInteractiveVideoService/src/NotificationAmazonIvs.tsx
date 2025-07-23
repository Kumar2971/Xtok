import React from "react";
// Customizable Area Start
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  Platform,
  FlatList
} from "react-native";
import { translate } from "../../../components/src/i18n/translate";

// Customizable Area End

import NotificationAmazonIvsController, {
  NotificationData,
  Props,
  StageData,
  configJSON,
} from "./NotificationAmazonIvsController";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { CalcScale } from "./AmazonInteractiveVideoService";
import { fonts } from "./styles/fonts";
import { avatar, video } from "./assets";

export default class NotificationAmazonIvs extends NotificationAmazonIvsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  emptyList = () => {
    if (!this.state.isLoading) {
      return (
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#000',
          }}>
            {translate("noNotification")}
          </Text>
        </View>
      );
    } else return null;
  };

  renderNotifications(item: NotificationData) {
    return (
      <TouchableOpacity>
        <View style={[styles.newNotificationCon]} key={item.id}>
          <View
            style={[styles.newN2]}
          >
            <Text style={[styles.userNameMentionComment]}>
              {item.attributes.headings.split(" ")[0]}
            </Text>
            <Text style={styles.notifyTxt}>
              {translate("inviteLive")}
            </Text>
          </View>
          {item.attributes.invitation_status ? null : <View style={[styles.newN3]}>
            <TouchableOpacity testID="rejectButton" activeOpacity={0.6} style={[styles.watchBtnStyle, { backgroundColor: 'red' }]} onPress={() => {
              this.updateInvite("rejected", item.attributes.invite_id)
            }}>
              <Text style={styles.watchBtnText}>{translate("reject")}</Text>
            </TouchableOpacity>
            <TouchableOpacity testID="notificationButton" activeOpacity={0.6} style={styles.watchBtnStyle} onPress={() => {
              let stageData = {
                name: "",
                stageArn: item.attributes.room_id,
                isViewer: false,
                chatArn: item.attributes.chat_arn,
                inviteId: item.attributes.invite_id
              }
              this.onNotificationCLick(stageData)
            }}>
              <Text style={styles.watchBtnText}>{translate("accept")}</Text>
            </TouchableOpacity>
          </View>}
        </View>
      </TouchableOpacity>
    );
  }

  // Customizable Area End

  render() {
    return (
      //  Customizable Area Start 
      <SafeAreaView style={styles.mainCon}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity testID="goLiveButton" onPress={this.goLiveAction} style={styles.goLiveButton} >
            <Text style={styles.notificationText}>{translate("Go_Live")}</Text>
          </TouchableOpacity>
          <View
            style={{ marginBottom: CalcScale(20), marginTop: CalcScale(20) }}
          >
            <View style={styles.topRaw}>
              <View style={styles.topRaw}>
                <View style={styles.videoIconcontainer}>
                  <Image source={video} style={styles.videicon} />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={[styles.subheaderText]}>{translate("stage")}</Text>
                </View>
              </View>


            </View>
            <View style={styles.flatListContainer}>
              <FlatList
                testID="stageFlatlist"
                horizontal={true}
                data={this.state.stageData}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity style={[styles.itemcontainer]}>
                      <TouchableOpacity
                        onPress={() => {
                          let stageData = {
                            name: "",
                            stageArn: item.arn,
                            isViewer: true,
                            chatArn: item.chat_room_arn
                          }
                          this.onStageCLick(stageData)
                        }}
                        testID="stageButton"
                      >
                        <Text style={styles.liveText}>{translate("stage")}</Text>
                        <Image source={{ uri: "" }} style={styles.imageProp} />
                        <View style={styles.bottomdetails}>
                          <Image source={avatar} style={{ width: CalcScale(30), height: CalcScale(30), borderRadius: CalcScale(30), }} />
                          <Text style={[styles.subheaderText2, { color: "white" }]}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  )
                }}
              // keyExtractor={(item:StageData) => `${item.id}`}
              />
            </View>
          </View>
        </View>
        <View style={styles.headerCon}>
          <TouchableOpacity style={styles.headerView2} activeOpacity={0.6}>
            <Text style={styles.notificationText}>{translate("notifications")}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, flexGrow: 1 }}>
          <FlatList
            style={{
              flex: 1,
              flexGrow: 1,
              paddingHorizontal: 10
            }}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 15,
            }}
            testID="notificationFlatlist"
            data={this.state.notificationData}
            ListEmptyComponent={this.emptyList()}
            renderItem={({ item }) => this.renderNotifications(item)}
            keyExtractor={(item: NotificationData) => item.id}
          />
        </View>
      </SafeAreaView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  userNameMentionComment: {
    fontWeight: "bold",
    color: "black",
    textAlign: "left"
  },
  watchBtnText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
    color: "#fff"
  },
  watchBtnStyle: {
    backgroundColor: "#e8b015",
    borderRadius: 5,
    height: responsiveHeight(4),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: responsiveFontSize(3),
    marginRight: responsiveFontSize(2),
    marginVertical: 2
  },
  newN3: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  newN2: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "1.5%"
  },
  newNotificationCon: {
    flexDirection: "row",
    alignItems: 'center',
    paddingBottom: responsiveHeight(2)
  },
  notificationProfle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  notificationText: {
    fontSize: responsiveFontSize(2.2),
    color: "#000",
    fontWeight: "bold"
  },
  headerView2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  headerCon: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        height: responsiveHeight(7.5)
      },
      android: {
        height: responsiveHeight(6)
      }
    }),
    backgroundColor: "#fff"
  },
  mainCon: {
    flex: 1,
    backgroundColor: "#fff",
  },
  notifyTxt: {
    textAlign: "left"
  },
  goLiveButton: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: '#FFC925',
    width: '50%'
  },
  flatListContainer: {
    alignItems: "flex-start",
  },
  videoIconcontainer: {
    width: CalcScale(38),
    height: CalcScale(38),
    borderRadius: 35,
    borderWidth: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 2,
    marginLeft: 3,
    marginTop: 2,
  },
  videicon: {
    width: CalcScale(30),
    height: CalcScale(28),
    resizeMode: "contain",
  },
  topRaw: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subheaderText: {
    fontSize: CalcScale(18),
    fontFamily: fonts.MontserratSemiBold,
  },
  subheaderText2: {
    fontSize: CalcScale(15),
    fontFamily: fonts.MontserratSemiBold,
    color: "grey"
  },
  imageProp: {
    width: CalcScale(150),
    resizeMode: 'cover',
    height: CalcScale(200),
    backgroundColor: "grey"
  },
  liveText: {
    backgroundColor: "rgba(0,0,0,1)",
    position: "absolute", zIndex: 1000,
    left: 0,
    margin: 10,
    padding: 5,
    color: "#FFC925",
    fontFamily: fonts.MontserratRegular,
    fontSize: CalcScale(10),
  },
  bottomdetails: {
    position: "absolute", zIndex: 1000,
    left: 0,
    bottom: 0,
    margin: 10,
    padding: 5,
    color: "#FFC925",
    fontFamily: fonts.MontserratRegular,
    fontSize: CalcScale(10),
  },
  itemcontainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: CalcScale(5),
    paddingHorizontal: CalcScale(5),
    marginTop: 8
  }
});
// Customizable Area End
