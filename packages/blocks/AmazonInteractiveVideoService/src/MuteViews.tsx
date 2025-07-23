import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import MuteViewsController, { Props } from "./MuteViewsController";
import {
    DynamicDimension,
  screenWidth,
} from "./helpers/DynamicDimension";
import scale from "../../../components/src/Scale";
import { avatar,imgRightArrow, left, person, profile } from "./assets";
import {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
  } from "react-native-simple-radio-button";
import { CalcScale } from "./AmazonInteractiveVideoService";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { fonts } from "./styles/fonts";
import { translate } from "../../../components/src/i18n/translate";


// Customizable Area End
export default class MuteViews extends MuteViewsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderMuteDurationItem = ({ item, index }: any) => {
    return (
      <View>
        <View style={styles.commentView}>
          <View style={[styles.report_item]}>
            <RadioButton labelHorizontal={true}>
              <RadioButtonInput
                testID="radioInputId"
                obj={item}
                index={item.value}
                isSelected={this.state.selectedmute === item.value}
                onPress={() => {
                  this.selectmute(item.value, item.label)
                }}
                buttonInnerColor={"#ffc831"}
                buttonOuterColor={"#ffc831"}
                buttonSize={16}
                buttonOuterSize={20}
                buttonStyle={{}}
                buttonWrapStyle={{ marginLeft: 10 }}
              />
              <RadioButtonLabel
                testID="radioLabelId"
                obj={item}
                index={item.value}
                labelHorizontal={true}
                onPress={() => this.selectmute(item.value, item.label)}
                labelStyle={[{ fontSize: 16 }, { marginLeft: 10 }]}
                labelWrapStyle={{}}
              />
            </RadioButton>
          </View>
        </View>
        <View style={{ width: '100%', height: 1, backgroundColor: 'grey' }}></View>
      </View>
    );
  };


  addMuteModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.addMuteModal}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'padding', android: undefined })}
          style={styles.transpernetModalContainer}>
          <TouchableOpacity
            testID="closeMuteModal"
            onPress={this.props.onClose} style={{ flex: 1 }}>
          </TouchableOpacity>
          <View style={styles.modalContainer}>
            <View style={styles.modalListContainer}>
              <View style={[styles.modalHeader2]}>
                <TouchableOpacity
                  testID="closeMuteModal2"
                  onPress={this.props.onCloseAddMuteModal}>
                  <Image source={this.arrowImageLeft()} style={styles.cancelButton2} />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                  {translate("Account_mute")}
                </Text>
                <TouchableOpacity
                  testID="closeInvitation">
                  <Image source={person} style={[styles.plusicon, { tintColor: "white" }]} />
                </TouchableOpacity>
              </View>
              {this.state.loader && (
                <View style={[styles.searchContainer, { flex: 1, marginVertical: 20 }]}>
                  <ActivityIndicator size="large" color="black" />
                </View>
              )}
              <FlatList
                style={{ marginBottom: 20 }}
                testID="searchFlatlist3"
                data={this.state.muteaccountViwerslistdata}
                renderItem={({ item }: { item: any }) =>
                  this.renderSearchResultformute(item)
                }
                contentContainerStyle={styles.inviteFlatList}
                keyExtractor={(item: any) => `${item.id}`}
                keyboardShouldPersistTaps="always"
                ListEmptyComponent={() => {
                  return <View style={[styles.searchContainer, { flex: 1, marginTop: 50 }]}>
                    <Image source={profile} style={styles.emptyimg1} />
                    <Text style={styles.headerText}>
                        {translate("No_LIVE_Viewers_yet")}
                    </Text>
                  </View>
                }} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  renderSearchResultformute = (item: any) => {
    const invitedItem = this.props.invitedIds.find((obj: any) => obj.userId == item.id);
    const showLoader = invitedItem?.userId == item.id;
    const isInvited = (item.isInvited || item.invite_status == "invited");
    const isDisabled = (isInvited || showLoader) ?? false;
    return (
      <View style={styles.mainView}>
        <View style={styles.submainView}>
          <View style={styles.followImgView}>
            <Image
              source={item.attributes?.account?.photo ? { uri: item.attributes?.account?.photo } : avatar}
              style={styles.profileimg}
              resizeMode="contain"
            />
            {item?.live_status === "LIVE" && <View style={styles.onlineSymbol} />}
          </View>
          <View style={styles.nameView}>
            {item.attributes?.account?.user_name ? (
              <Text style={styles.nameText}>{item?.attributes?.account?.
                user_name}</Text>
            ) : null}
            <Text style={[styles.descText, this.state.language == "ar" && {textAlign:"left"}]} numberOfLines={2}>
              {item.attributes?.account?.bio ? item.attributes?.account?.bio : translate("noBio")}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.btnContainerStyle,
            isDisabled && styles.disableBtnStyle,
          ]}
          testID="mutePost1"
          onPress={() => {
            this.muteAccountPost(item.attributes?.user_id)
          }}
        >
          <View>
            {showLoader ? (
              <ActivityIndicator color={"#fff"} size={"small"} />
            ) : (
              <Text style={[styles.btnTextStyle]}>
                {" "}
                {item.attributes?.is_stage_muted ? translate("unmute") : translate("mute")}{" "}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };


  mutedAccountModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.isMutedAccountsModalVisible}
      >
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'padding', android: undefined })}
          style={styles.transpernetModalContainer}>
          <TouchableOpacity
            testID="closeModalMuted2"
            onPress={this.props.onCloseMuted} style={{ flex: 1 }}>
          </TouchableOpacity>
          <View style={styles.modalContainer}>
            <View style={styles.modalListContainer}>
              <View style={[styles.modalHeader2]}>
                <TouchableOpacity
                  testID="isMutedAccountsModalVisible"
                  onPress={this.props.onCloseMutedModal}
                >
                  <Image source={this.arrowImageLeft()} style={styles.cancelButton2} />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                  {translate("muted_Accounts")}
                </Text>
                <TouchableOpacity
                  testID="closeInvitation"
                >
                  <Image source={person} style={[styles.plusicon, { tintColor: "white" }]} />
                </TouchableOpacity>
              </View>
              <Text style={styles.accountTitleStyle}>
                {translate("accounts_that_you_have_muted")}
              </Text>
              <FlatList
                testID="searchFlatlist5"
                data={this.state.muteaccountViwerslistdata}
                renderItem={({ item }: { item: any }) =>
                  this.renderSearchResultformuted(item)
                }
                contentContainerStyle={styles.inviteFlatList}
                keyExtractor={(item: any) => `${item.id}`}
                keyboardShouldPersistTaps="always"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    )
  }

  renderSearchResultformuted = (item: any) => {

    const invitedItem = this.props.invitedIds.find((obj: any) => obj?.userId == item.id);
    const showLoader = invitedItem?.userId == item.id;
    const isInvited = (item.isInvited || item.invite_status == "invited");
    const isDisabled = (isInvited || showLoader) ?? false;
    if (item.attributes?.is_stage_muted) {
      return (
        <View style={styles.mainView}>
          <View style={styles.submainView}>
            <View style={styles.followImgView}>
              <Image
                source={item.attributes?.account?.photo ? { uri: item.attributes?.account?.photo } : avatar}
                style={styles.profileimg}
                resizeMode="contain"
              />
            </View>
            <View style={styles.nameView}>
              {item.attributes?.account?.user_name ? (
                <Text style={[styles.nameText, { color: 'black' }]}>{item?.attributes?.account?.
                  user_name}</Text>
              ) : null}
              <Text style={[styles.descText , this.state.language == "ar" && {textAlign:"left"}]} numberOfLines={2}>
                {item.attributes?.account?.bio ? item.attributes?.account?.bio : translate("noBio")}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            testID="MuteUnmuteButton3"
            style={[
              styles.btnContainerStyle,
              isDisabled && styles.disableBtnStyle,
            ]}
            onPress={() => {
              this.setState({
                muteaccountlistdata: []
              })
              this.muteAccountPost(item.attributes?.user_id)
            }}
          >
            {this.showTextOrLoader(showLoader,item)}
          </TouchableOpacity>
        </View>
      );
    }
    return <></>
  };

  showTextOrLoader = (showLoader:boolean,item:any) => {    
    return (
      <View>
        {showLoader ? (
          <ActivityIndicator color={"#fff"} size={"small"} />
        ) : (
          <Text style={[styles.btnTextStyle]}>
            {" "}
            {item.attributes?.is_stage_muted ? translate("unmute") : translate("mute")}{" "}
          </Text>
        )}
      </View>
    )
  }

  arrowImageLeft = () => {
    if(this.state.language == "ar" ){
      return imgRightArrow;
    }else{
      return left;
    }
  }


  // Customizable Area End

  render() {
    return (
      //  Customizable Area Start
      <>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.isMuteDurationModalVisible}>
          <View style={styles.teamPopUpmodalContainer}>
            <View style={styles.teamPopUpmodalListContainer}>
              <View style={styles.teamPopUpmodalHeader}>
                <TouchableOpacity testID="isMuteDurationModalVisible" style={{ flexDirection: 'row', alignContent: 'center' }} onPress={this.props.onCloseDuration}>
                  <Image style={styles.backArrow} source={this.arrowImageLeft()} />
                  <Text style={styles.commentHeader}>{translate("Mute_Duration")}</Text>
                </TouchableOpacity>
                <View style={styles.divider}></View>
                <FlatList
                  keyExtractor={(item: string, index) => index.toString()}
                  renderItem={this.renderMuteDurationItem}
                  style={{ marginBottom: 20 }}
                  testID="muteDuration"
                  data={this.state.muteDurationList}
                />
              </View>
            </View>
          </View>
        </Modal>

        {this.addMuteModal()}
        {this.mutedAccountModal()}
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  teamPopUpmodalContainer: {
    flex: 1,
  },
  accountTitleStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 20
  },
  nameView: {
    marginLeft: DynamicDimension(20, true, 1),
    width: responsiveWidth(45),
    alignItems: "flex-start",
  },
  disableBtnStyle: { opacity: 0.3 },
  profileimg: {
    width: CalcScale(40),
    height: CalcScale(40),
    borderRadius: CalcScale(100),
  },
  submainView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  btnTextStyle: {
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    fontFamily: fonts.MontserratMedium,
    fontSize: 15,
  },
  btnContainerStyle: {
    borderRadius: 10,
    backgroundColor: "#FFC925",
    height: 35,
    width: "32%",
    alignItems: "center",
    justifyContent: "center",
  },
  onlineSymbol: {
    width: 18,
    height: 18,
    borderWidth: 3,
    borderRadius: 9,
    backgroundColor: "#3C6507",
    borderColor: "white",
    position: "absolute",
    bottom: -5,
    end: -5,
  },
  descText: {
    fontSize: DynamicDimension(14, true, 1),
    color: 'grey'
  },
  mainView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: DynamicDimension(10, true, 1),
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: DynamicDimension(10, true, 1),
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: CalcScale(16),
  },
  inviteFlatList: {
    paddingBottom: scale(200),
  },
  emptyimg1: {
    width: CalcScale(80),
    height: CalcScale(80),
    tintColor: "gray"
  },
  followImgView: {
    height: DynamicDimension(45, false, 1),
    width: DynamicDimension(45, true, 1),
    borderRadius: DynamicDimension(45, true, 1),
    borderWidth: 3,
    borderColor: "#FFC925",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton2: {
    width: scale(15),
    height: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalListContainer: {
    bottom: 0,
    position: "absolute",
    borderTopRightRadius: CalcScale(20),
    width: screenWidth,
    borderTopLeftRadius: CalcScale(20),
    maxHeight: CalcScale(500),
    backgroundColor: "rgb(255, 255, 255)",
  },
  modalContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey'
  },
  modalHeader2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: CalcScale(20),
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  commentView: {
    flexDirection: 'row',
    marginVertical: scale(5)    
  },
  backArrow: {
    width: 15,
    height: 15,
    alignSelf: 'center',
    marginVertical: 8,
    marginStart: 8
  },
  teamPopUpmodalListContainer: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    backgroundColor: 'rgb(255, 255, 255)',
    maxHeight: scale(800),
    fontWeight: "800"
  },
  commentHeader: {
    fontSize: scale(18),
    textAlign: 'center',
    marginVertical: 8,
    width: '90%'
  },
  plusicon: {
    resizeMode: "contain",
    height: CalcScale(23),
    width: CalcScale(23),
    alignSelf: "flex-end",
    tintColor: "black",
    marginRight: 10,
  },
  teamPopUpmodalHeader: {
    display: "flex",
    justifyContent: 'center',
    padding: scale(12),
    width: screenWidth,
  },
  report_item: {
    paddingTop: scale(10),
  },
  headerText: {
    fontSize: CalcScale(20),
    paddingHorizontal: 15,
  },
  transpernetModalContainer: {
    position: 'relative',
    width: screenWidth,
    flex: 1
  },
});
// Customizable Area End