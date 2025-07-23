
import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList
} from "react-native";
import {
    DynamicDimension,
  screenWidth,
} from "./helpers/DynamicDimension";
import scale from "../../../components/src/Scale";
import { avatar , empty, imgLeftArrow, imgRightArrow, person, profile} from "./assets";
import { fonts } from "./styles/fonts";
import AntDesign from "react-native-vector-icons/AntDesign";
import ModeratorViewController , { Props } from "./ModeratorViewController";
import AlertModal from "../../../components/src/AlertModal";
import { CalcScale } from "./AmazonInteractiveVideoService";
import { SearchBar } from "react-native-elements";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Modertorsearchresult } from "./LiveStreamingController";
import { translate } from "../../../components/src/i18n/translate";

// Customizable Area End
export default class ModeratorView extends ModeratorViewController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderResultforModeraotr = (item: Modertorsearchresult) => {
    const invitedItem = this.props.invitedIds.find((obj:any)=>obj?.userId == item.id);
    const showLoader = invitedItem?.userId == item.id;
    if(item.is_moderator == 'Remove'){

    return (
      <View style={styles.mainView}>
        {this.profileView(item)}
        <TouchableOpacity
        testID="removeModerator1"
          style={[
            styles.btnContainerStyle,
          ]}
          onPress={() => {
            this.props.setModeratorAddRemove(item.is_moderator == 'Add' || item.is_moderator == null ? 'true':'false')
            this.addRemoveModerator(item.id);
          }}
        >
          <View>
            {showLoader ? (
              <ActivityIndicator color={"#fff"} size={"small"} />
            ) : (
              <Text style={[styles.btnTextStyle]}>
                {" "}
                {translate("Remove")}{" "}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
            }
          
  return <></>
  };

  profileView = (item:Modertorsearchresult) => {
    return (
      <View style={styles.submainView}>
      <View style={styles.followImgView}>
        <Image
          source={item.photo ? { uri: item.photo } : avatar}
          style={styles.profileimg}
          resizeMode="contain"
        />
        {item?.live_status === "LIVE" && <View style={styles.onlineSymbol} />}
      </View>
      <View style={styles.nameView}>
        {item.user_name ? (
          <Text style={styles.nameText}>{item.user_name}</Text>
        ) : null}
        <Text style={[styles.descText, this.state.language == "ar" && {textAlign:"left"} ]} numberOfLines={2}>
          {item.bio ? item.bio : translate("noBio")}
        </Text>
      </View>
    </View>
    )
  }

  renderSearchResultforModeraotr = (item: Modertorsearchresult) => {
    const invitedItem = this.props.invitedIds.find((obj:any)=>obj?.userId == item.id);
    const showLoader = invitedItem?.userId == item.id;
    
    return (
      <View style={styles.mainView}>
       {this.profileView(item)}
        <TouchableOpacity
        testID="addRemoveModerator1"
          style={[
            styles.btnContainerStyle,
          ]}
          onPress={() => {
            this.props.setModeratorAddRemove(item.is_moderator == 'Add' || item.is_moderator == null ? 'true':'false')
            this.addRemoveModerator(item.id);
          }}
        >
          <View>
            {showLoader ? (
              <ActivityIndicator color={"#fff"} size={"small"} />
            ) : (
              <Text style={[styles.btnTextStyle]}>
                {" "}
                {item.is_moderator == 'Add' || item.is_moderator == null ? translate("Add") : translate("Remove")}{" "}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    )     
  };

  arrowImage = () => {
    if(this.state.language == "ar" ){
      return imgRightArrow;
    }else{
      return imgLeftArrow;
    }
  }

  imgStyle = () => {
    if(this.state.language == "ar" ){
      return styles.cancelButton5;
    }else{
      return styles.cancelButton2;
    }
  }

  // Customizable Area End

  render() {
    return (
      //  Customizable Area Start
     <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.addModeratorModel}>
                <KeyboardAvoidingView
                    behavior={Platform.select({ ios: 'padding', android: undefined })}
                    style={styles.transpernetModalContainer}>
                    <TouchableOpacity
                        testID="addParticipant"
                        onPress={() =>
                            this.setState({ addModeratorModel: false })
                        } style={{ flex: 1 }}>
                    </TouchableOpacity>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalListContainer}>
                            <View style={[styles.modalHeader2]}>

                                <TouchableOpacity
                                    testID="closeInvitation6"
                                    onPress={() => {
                                      this.props.openCloseModeratorModel(true)
                                      this.setState({ addModeratorModel: false })
                                  }}
                                >
                                    <Image source={this.arrowImage()} style={this.imgStyle()} />
                                </TouchableOpacity>
                                <Text style={styles.headerText}>
                                    {translate("Add_Moderator")}
                                </Text>
                                <TouchableOpacity
                                    testID="closeInvitation">
                                    <Image source={person} style={styles.cancelButton} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ minHeight: CalcScale(300) }}>
                                <View style={styles.searchContainer}>
                    <SearchBar
                      platform="default"
                      testID="searchBar2"
                      placeholder={translate("searchHere")}
                      pointerEvents={this.state.loader ? "none" : "auto"}
                      searchIcon={<AntDesign name="search1" size={20} />}
                      onChangeText={(text) => {
                        this.setState({ loader:true, value: text }, () => {
                          if (text.length < 3) return
                          clearTimeout(this.timeout)
                          this.timeout = setTimeout(() => {
                            this.getModeratorLists({ searchText: text });
                          }, 500)
                        })
                      }}
                      scrollEnabled={true}
                      autoCorrect={false}
                      value={this.state.value}
                      containerStyle={styles.searchContainerStyle}
                                        inputContainerStyle={styles.searchInputStyle}
                                        inputStyle={this.state.language == "ar" && styles.textAlign}
                                    />
                                </View>

                                {this.state.loader === true && (
                                    <View style={[styles.searchContainer, { flex: 1 }]}>
                                        <ActivityIndicator size="large" color="black" />
                                    </View>
                                )}
                                {
                                    !this.state.moderatorSearchResult && this.state.loader === false && (
                                        <View style={[styles.searchContainer, { flex: 1 }]}>
                                            <Image source={empty} style={styles.emptyimg} />
                                            <Text style={styles.headerText}>
                                                {translate("no_Search_result_Found")}
                                            </Text>
                                        </View>)
                                }
                                <FlatList
                                    style={{ marginBottom: 20 }}
                                    testID="searchFlatlist2"
                                    data={this.state.moderatorSearchResult}
                                    renderItem={({ item }: { item: Modertorsearchresult }) =>
                                        this.renderSearchResultforModeraotr(item)
                                    }
                                    contentContainerStyle={styles.inviteFlatList}
                                    keyExtractor={(item: Modertorsearchresult) => `${item.id}`}
                                    keyboardShouldPersistTaps="always"
                                />
                            </View>
                        </View>
                    </View>
                    <AlertModal
                        alertModal={this.state.moderatorModal}
                        onPress2={this.closeModeratorModal}
                        btnTitle2={translate("ok")}
                    />
                </KeyboardAvoidingView>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.moderatorModel}>
                <KeyboardAvoidingView
                    behavior={Platform.select({ ios: 'padding', android: undefined })}
                    style={styles.transpernetModalContainer}>
                    <TouchableOpacity
                        testID="addParticipant1"
                        onPress={() =>
                        this.props.openCloseModeratorModel(false)
                        } style={{ flex: 1 }}>
                    </TouchableOpacity>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalListContainer}>
                            <View style={[styles.modalHeader2]}>
                                <TouchableOpacity
                                    testID="closeModeratorList"
                                    onPress={() => this.props.openSettingsModal()}>
                                    <Image source={this.arrowImage()} style={this.imgStyle()} />
                                </TouchableOpacity>
                                <Text style={styles.headerText}>
                                    {translate("Moderators")}
                                </Text>
                                <TouchableOpacity
                                    testID="addModeratorButton"
                                    onPress={() => {
                                      this.props.openCloseModeratorModel(false)
                                        this.setState({
                                            addModeratorModel: true,
                                            value: "",
                                            loader: true,
                                            moderatorSearchResult: [],
                                        })
                                        this.getModeratorLists({ searchText: '' })
                                    }}>
                                    <Image source={person} style={styles.plusicon} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ minHeight: CalcScale(300) }}>
                                <FlatList
                                    style={{ marginBottom: 20 }}
                                    testID="searchFlatlist4"
                                    data={this.state.moderatorSearchResult}
                                    renderItem={({ item }: { item: Modertorsearchresult }) =>
                                        this.renderResultforModeraotr(item)
                                    }
                                    contentContainerStyle={styles.inviteFlatList}
                                    keyExtractor={(item: Modertorsearchresult) => `${item.id}`}
                                    keyboardShouldPersistTaps="always"
                                    ListEmptyComponent={() => {
                                        return <View style={[styles.searchContainer, { flex: 1, marginTop: 50 }]}>
                                            <Image source={profile} style={styles.emptyimg1} />
                                            <Text style={styles.headerText}>
                                               {translate("no_LIVE_moderator_yet")}
                                            </Text>
                                            <Text style={styles.headerText1}>
                                              {translate("moderator_text")}
                                            </Text>
                                        </View>
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
     </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    transpernetModalContainer: {
        position: 'relative',
        width: screenWidth,
        flex: 1
      },
      nameText: {
        fontFamily: fonts.MontserratSemiBold,
        fontSize: CalcScale(16),
      },
      descText: {
        fontSize: DynamicDimension(14, true, 1),
        color:'grey'
      },
      btnTextStyle: {
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
        fontFamily: fonts.MontserratMedium,
        fontSize: 15,
      },
      nameView: {
        marginLeft: DynamicDimension(20, true, 1),
        width: responsiveWidth(45),
        alignItems: "flex-start",
      },
      btnContainerStyle: {
        borderRadius: 10,
        backgroundColor: "#FFC925",
        height: 35,
        width: "32%",
        alignItems: "center",
        justifyContent: "center",
      },
      emptyimg: {
        width: CalcScale(80),
        height: CalcScale(80),
      },
      mainView: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: DynamicDimension(10, true, 1),
        alignItems: "center",
        marginHorizontal: 10,
        marginBottom:DynamicDimension(10, true, 1),
      },
      searchContainerStyle: {
        marginTop: 10,
        width: "95%",
        backgroundColor: "transparent",
        padding: 0,
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
        marginBottom: DynamicDimension(20, false, 1),
        borderRadius: 0,
        paddingHorizontal: CalcScale(10),
      },
      textAlign:{
        textAlign:"right"
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
      followImgView: {
        height: DynamicDimension(45, true, 1),
        width: DynamicDimension(45, true, 1),
        borderRadius: DynamicDimension(45, true, 1),
        borderWidth: 3,
        borderColor: "#FFC925",
        alignItems: "center",
        justifyContent: "center",
      },
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
      headerText2: {
        fontSize: CalcScale(14),
        paddingHorizontal:15,
      },
      headerText1: {
        fontSize: CalcScale(14),
        paddingHorizontal:15,
        paddingTop:15
      },
      searchInputStyle: {
        backgroundColor: "#EEEEEE",
        height: DynamicDimension(45, true, 1),
        borderRadius: scale(10)
      },
      modalContainer: {
        flex: 1,
        top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      },
      inviteFlatList: {
        paddingBottom: scale(200),
      },
      cancelButton2: {
        width: CalcScale(25),
        height: CalcScale(25),
        justifyContent: 'center',
        alignItems: 'center',
      },
      cancelButton5: {
        width: CalcScale(20),
        height: CalcScale(20),
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
      modalHeader2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: CalcScale(20),
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        marginBottom:10,
      },
      emptyimg1: {
        width: CalcScale(80),
        height: CalcScale(80),
        tintColor:"gray"
      },
      cancelButton: {
        resizeMode: "contain",
        height: CalcScale(23),
        width: CalcScale(23),
        alignSelf: "flex-end",
      },
      searchContainer: {
        justifyContent: "center",
        alignItems: "center",
      },
      headerText: {
        fontSize: CalcScale(20),
        paddingHorizontal:15,
      },
      plusicon: {
        resizeMode: "contain",
        height: CalcScale(23),
        width: CalcScale(23),
        alignSelf: "flex-end",
        tintColor: "black",
        marginRight:10,
      },
});
// Customizable Area End