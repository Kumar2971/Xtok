import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import * as IMG_CONST from "./assets";
import scale, { verticalScale } from "../../../components/src/Scale";
// Customizable Area End

import InvitefriendsController from "./InvitefriendsController";

export default class InviteFriends extends InvitefriendsController {
  render() {
    // Customizable Area Start
    return (
      <View style={styles.container}>
        <View>
          <Text testID={"textInstructions"} style={styles.TextStyleMsg}>
            Share your code with friends and get an exciting offers
          </Text>
          <Text testID={"textTitle"} style={styles.TextStyle}>
            Invite your friends
          </Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            testID={"btnEmailIcon"}
            {...this.btnEmailIconProps}
          >
            <Image
              testID={"imgEmailIcon"}
              source={IMG_CONST.invite_mail}
              style={styles.inviteImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            testID={"btnWhatsAppIcon"}
            {...this.btnWhatsAppIconProps}
          >
            <Image
              testID={"imgWhatsAppIcon"}
              source={IMG_CONST.invite_whatsapp}
              style={styles.inviteWPImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            testID={"btnSMSIcon"}
            {...this.btnSMSIconProps}
          >
            <Image
              testID={"imgSMSIcon"}
              source={IMG_CONST.invite_sms}
              style={styles.inviteImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomView}>
          <Image
            testID={"imgPosterIcon"}
            source={IMG_CONST.invite_friend}
            style={styles.bottomImageView}
          />
        </View>
      </View>
    );
  }
  // Customizable Area End
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  TextStyleMsg: {
    color: "black",
    marginTop: verticalScale(35),
    fontSize: scale(19.7),
    textAlign: "center"
  },
  TextStyle: {
    color: "#366ef9",
    marginTop: verticalScale(52.3),
    textAlign: "center",
    fontSize: scale(23.3)
  },
  bottomView: {
    width: "100%",
    height: verticalScale(209.3),
    marginBottom: verticalScale(20.7),
    position: "absolute",
    bottom: 0
  },
  bottomImageView: {
    width: "100%",
    height: verticalScale(209.3),
    resizeMode: "contain"
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(52.3)
  },
  inviteImage: {
    width: scale(53.7),
    height: scale(53.7)
  },
  inviteWPImage: {
    width: scale(53.7),
    height: scale(53.7),
    marginStart: scale(25),
    marginEnd: scale(25)
  }
});
// Customizable Area End
