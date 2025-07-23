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
import { SearchBar } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import InviteViewController, { Props } from "./InviteViewController";
import {
    DynamicDimension,
  screenWidth,
} from "./helpers/DynamicDimension";
import scale from "../../../components/src/Scale";
import { CalcScale } from "./AmazonInteractiveVideoService";
import { avatar, cancelIcon, empty } from "./assets";
import { SearchResult } from "./LiveStreamingController";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { fonts } from "./styles/fonts";
import { translate } from "../../../components/src/i18n/translate";

// Customizable Area End
export default class InviteView extends InviteViewController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderSearchResult = (item: SearchResult) => {
    const invitedItem = this.state.invitedIds.find((obj:any)=>obj?.userId == item.id);
    const showLoader = invitedItem?.userId == item.id;
    const isInvited = this.timeLimitedCache.includes(`${item.id}`)
    const isDisabled = (isInvited || showLoader ||item.invite_status==="invited");
    return (
      <View style={styles.mainView}>
        <View style={styles.submainView}>
          <View style={styles.followImgView}>
            <Image
              source={item.photo ? { uri: item.photo } : avatar}
              style={styles.profileimg}
              resizeMode="contain"
            />
            {this.props.invitationModel === 1 && <View style={styles.onlineSymbol} />}
          </View>
          <View style={styles.nameView}>
            {item.user_name ? (
              <Text style={styles.nameText}>{item.user_name}</Text>
            ) : null}
            <Text style={[styles.descText,this.state.language == "ar" && {textAlign:"left"}]} numberOfLines={2}>
              {item.bio ? item.bio : translate("noBio")}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.btnContainerStyle,
            isDisabled && styles.disableBtnStyle,
          ]}
          onPress={() => this.onInviteButtonClick(item)}
          disabled={isDisabled}
          testID={`inviteButton${item.id}`}
          activeOpacity={item.isInvited ? 0.3 : 1}
        >
          <View>
            {showLoader ? (
              <ActivityIndicator color={"#fff"} size={"small"} />
            ) : (
              <Text style={[styles.btnTextStyle]}>
                {" "}
                {isDisabled ? translate("invited") : translate("invite")}{" "}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // Customizable Area End

  render() {
    return (
      //  Customizable Area Start
      <Modal
      animationType="slide"
      transparent={true}
      visible={this.props.invitationModel !== 0}
    >
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: "height"})}
        style={{ flex: 1 }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalListContainer}>
            <View style={[styles.modalHeader]}>
              <View style={styles.cancelButton} />
              <Text style={styles.headerText}>
                {this.props.invitationModel === 2
                  ? translate("invite_to_Join")
                  : translate("invite_coHost")}
              </Text>
              <TouchableOpacity
                testID="closeInvitation1"
                onPress={() => {
                  this.setState({searchresult:[],value:''})
                  this.props.handleInviteModal(0)}}
              >
                <Image source={cancelIcon} style={styles.cancelButton} />
              </TouchableOpacity>
            </View>
            <View style={{ minHeight: CalcScale(200) }}>
            <View style={styles.searchContainer}>
              <SearchBar
                testID="searchBar"
                placeholder={translate("searchHere")}
                lightTheme
                //@ts-ignore
                searchIcon={() => <AntDesign name="search1" size={20} />}
                onChangeText={(text) => {
                  if(this.state.loader) return
                  this.setState({ value: text },()=> {
                    if(text.length < 3) return
                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(() => {
                      this.getGuestOrCoHostAccountsLists({ searchText: text });
                    }, 500)
                  })
                }}
                autoCorrect={false}
                value={this.state.value}
                containerStyle={styles.searchContainerStyle}
                inputContainerStyle={styles.searchInputStyle}
                inputStyle={this.state.language == "ar" && styles.textAlign}
              />
            </View>

            {this.state.loader && (
              <View style={[styles.searchContainer, { flex: 1 }]}>
                <ActivityIndicator size="large" color="black" />
              </View>
            )}
             {
              (!this.state.searchresult && !this.state.loader) ?(
               
             <View style={[styles.searchContainer]}>
                    <Image source={empty} style={styles.emptyimg} />
                    <Text style={styles.headerText}>
                      {translate("no_Search_result_Found")}
                    </Text>
                   </View>)
             :
            <FlatList
              testID="searchFlatlist"
              data={this.state.searchresult}
              renderItem={({ item }: { item: SearchResult }) =>
                this.renderSearchResult(item)
              }
              contentContainerStyle={styles.inviteFlatList}
              keyExtractor={(item: SearchResult) => `${item.id}`}
              keyboardShouldPersistTaps="always"
            />
            }
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
    disableBtnStyle: {opacity: 0.3},
    btnContainerStyle: {
        borderRadius: 10,
        backgroundColor: "#FFC925",
        height: 35,
        width: "32%",
        alignItems: "center",
        justifyContent: "center",
      },
      btnTextStyle: {
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
        fontFamily: fonts.MontserratMedium,
        fontSize: 15,
      },
    descText: {
        fontSize: DynamicDimension(14, true, 1),
        color:'grey'
      },
    nameText: {
        fontFamily: fonts.MontserratSemiBold,
        fontSize: CalcScale(16),
      },
    nameView: {
        marginLeft: DynamicDimension(20, true, 1),
        width: responsiveWidth(45),
        alignItems: "flex-start",
      },
    profileimg: {
        width: CalcScale(40),
        height: CalcScale(40),
        borderRadius: CalcScale(100),
      },
    mainView: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: DynamicDimension(10, true, 1),
        alignItems: "center",
        marginHorizontal: 10,
        marginBottom:DynamicDimension(10, true, 1),
      },
    searchInputStyle: {
        backgroundColor: "#EEEEEE",
        height: DynamicDimension(45, true, 1),
        borderRadius: scale(10)
      },
    textAlign:{
      textAlign:"right",
    },
    modalListContainer: {
        width: screenWidth,
        borderTopLeftRadius: CalcScale(20),
        height: CalcScale(350),
        backgroundColor: "rgb(255, 255, 255)",
        bottom: 0,
        position: "absolute",
        borderTopRightRadius: CalcScale(20),
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
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: CalcScale(20),
        borderBottomColor: "grey",
        borderBottomWidth: 1,
      },
      headerText: {
        fontSize: CalcScale(20),
        paddingHorizontal:15,
      },
      cancelButton: {
        height: CalcScale(23),
        width: CalcScale(23),
        resizeMode: "contain",
        alignSelf: "flex-end",
      },
      searchContainer: {
        justifyContent: "center",
        alignItems: "center",
      },
      emptyimg: {
        width: CalcScale(80),
        height: CalcScale(80),
      },
      submainView: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
      },
      searchContainerStyle: {
        marginTop: 10,
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
        marginBottom: DynamicDimension(20, false, 1),
        borderRadius: 0,
        paddingHorizontal: CalcScale(10),
        width: "95%",
        backgroundColor: "transparent",
        padding: 0,
      },
      inviteFlatList: {
        paddingBottom: scale(200),
      },
});
// Customizable Area End