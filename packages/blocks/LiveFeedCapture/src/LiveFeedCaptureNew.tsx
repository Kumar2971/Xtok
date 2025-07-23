import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

//@ts-ignore

import { imgThreeDot, 
        imgSend, 
        imgAddPerson, 
        imgRefresh, 
        imgLiveLogo, 
        imgViewCount, 
        imgUser, 
        imgLogo, 
        imgAudio, 
        imgNoAudio
      } from "./assets";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import LiveFeedCaptureNewController, {
  Props,
  configJSON,
  IUserData
} from "./LiveFeedCaptureNewController";


export default class LiveFeedCaptureNew extends LiveFeedCaptureNewController {
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
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
          <FlatList
            numColumns={2}
            data={this.state.userData}
            renderItem={({item, index}: {item: IUserData, index: number}) => {
              return (
                <View style={[{...styles.eachItemViewStyle},{

                  height: this.state.userCount === 1 ?
                  responsiveHeight(76) : 
                  this.state.userCount == 2 ?
                  responsiveHeight(76) :
                  this.state.userCount == 3 ?
                  responsiveHeight(38) :'',

                  width: this.state.userCount === 1 ? '100%' : this.state.userCount === 3 ? (index === 0 || index === 1 ? '50%' : '100%') : '50%'
                }]}>
                  <Image
                    testID="imgParticipant"
                    source={{uri: item.userImage}}
                    style={styles.participantImageStyle}
                  />
                  <Image
                    testID="imgMikeOnOff"
                    source={
                      item.mikeOn === true ? imgAudio : imgNoAudio
                    }
                    style={
                      item.mikeOn === true ? styles.audioImagestyle : styles.noAudioImageStyle
                    }
                  />
                </View>
              )
            }}
          />
          <View style={styles.topInfoViewStyle}>
            <Image
              testID="imgRefresh"
              source={imgRefresh}
              style={styles.refreshImageStyle}
            />
            <Image
              testID="imgLiveLogo"
              source={imgLiveLogo}
              style={styles.liveLogoStyle}
            />
            <Image
              testID="imgViewCount"
              source={imgViewCount}
              style={styles.viewCountStyle}
            />
            <Text
              testID="txtEndText" 
              style={styles.endTextStyle}>End</Text>
          </View>
          <View style={styles.userChatViewStyle}>
            <Text
              testID="txtLiveComment" 
              style={styles.liveCommentTextStyle}>
              {configJSON.liveComment} 
            </Text>
          </View>
          <View style={styles.userInfoViewStyle}>
            <Image
              testID="imgUser"
              source={imgUser}
              style={styles.userImageStyle}
            />
            <Text 
              testID="txtUserName"
              style={styles.userNameTextStyle}>maxjacobson joined</Text>
            <Image
              testID="imgLogo"
              source={imgLogo}
              style={styles.logoImageStyle}
            />
          </View>
          <View style={styles.bottomInfoViewStyle}>
            <View style={styles.commentViewStyle}>
              <TextInput
                testID="commentInput"
                style={styles.commentTextInputStyle}
                placeholder={configJSON.placeholderComment}
                placeholderTextColor={'#ffffff'}
                {...this.txtInputProps}
              />
              <Image
                testID={"imgThreeDotImage"}
                source={imgThreeDot}
                style={styles.threeDotImageStyle}
              />
            </View>
            <Image
              testID={"imgSendImage"}
              source={imgSend}
              style={styles.sendImageStyle}
            />
            <Image
              testID={"imgAddPersonImage"}
              source={imgAddPerson}
              style={styles.addPersonImageStyle}
            />
          </View>
          <TouchableOpacity 
            testID="btnHandleNewParticipants"
            style={styles.addUserViewStyle}
            onPress={() => {
              this.state.userData.push(this.state.userStoredData[this.state.userCount])
              this.setState({userCount:this.state.userCount + 1})
            }}
          >
            <Text
              testID="txtPlus" 
              style={styles.plusTextStyle}>+</Text>
          </TouchableOpacity>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start

const styles = StyleSheet.create({
  plusTextStyle: {
    fontSize: responsiveFontSize(4.5),
  },
  participantImageStyle: {
    height: responsiveHeight(76),
    width: '100%',
  },
  noAudioImageStyle: {
    height: responsiveHeight(3),
    width: responsiveHeight(3),
    position: 'absolute',
    bottom: responsiveHeight(2),
    right: responsiveWidth(4),
  },
  audioImagestyle: {
    height: responsiveHeight(4),
    width: responsiveHeight(4),
    position: 'absolute',
    bottom: responsiveHeight(2),
    right: responsiveWidth(4),
  },
  eachItemViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  addUserViewStyle: {
    height: responsiveHeight(8),
    width: responsiveHeight(8),
    borderRadius: responsiveHeight(4),
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: responsiveHeight(25),
    right: responsiveWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveCommentTextStyle: {
    color: '#ffffff',
    fontSize: responsiveFontSize(1.6),
  },
  userChatViewStyle: {
    height: responsiveHeight(12),
    width: '80%',
    position: 'absolute',
    bottom: responsiveHeight(25),
    paddingLeft: responsiveWidth(2),
  },
  logoImageStyle: {
    height: responsiveHeight(7.5),
    width: responsiveHeight(7.5),
  },
  userNameTextStyle: {
    color: '#ffffff',
    fontSize: responsiveFontSize(2.2),
    marginRight: responsiveWidth(26),
  },
  userImageStyle: {
    height: responsiveHeight(9),
    width: responsiveHeight(9)
  },
  userInfoViewStyle: {
    height: responsiveHeight(10),
    width: '100%',
    position: 'absolute',
    bottom: responsiveHeight(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  endTextStyle: {
    color: '#ffffff',
    fontWeight: '700',
  },
  viewCountStyle: {
    height: responsiveHeight(5),
    width: responsiveHeight(5),
    marginRight: responsiveWidth(31),
  },
  liveLogoStyle: {
    height: responsiveHeight(8),
    width: responsiveHeight(6),
    marginRight: responsiveWidth(2),
  },
  refreshImageStyle: {
    height: responsiveHeight(4),
    width: responsiveHeight(4),
    marginRight: responsiveWidth(27),
  },
  topInfoViewStyle: {
    height: responsiveHeight(8.5),
    width: '100%',
    position: 'absolute',
    top: responsiveHeight(0),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3),
  },
  addPersonImageStyle: {
    height: responsiveHeight(4.5),
    width: responsiveHeight(4.5),
  },
  sendImageStyle: {
    height: responsiveHeight(4),
    width: responsiveHeight(4),
  },
  threeDotImageStyle: {
    height: responsiveHeight(2.6),
    width: responsiveHeight(2.6),
  },
  commentTextInputStyle: {
    height: responsiveHeight(6.5),
    width: '50%',
    borderRadius: 25,
  },
  commentViewStyle: {
    height: responsiveHeight(6.5),
    width: responsiveWidth(75),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 25,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ffffff',
    paddingHorizontal: responsiveWidth(3),
  },
  bottomInfoViewStyle: {
    height: responsiveHeight(15),
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#000000',
  },
  imageViewStyle: {
    borderWidth: 2,
    borderColor: 'orange',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  container: {
    flex: 1,
  }
})
// Customizable Area End
