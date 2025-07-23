import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  Modal,
  KeyboardAvoidingView,
  requireNativeComponent,
  StyleProp,
  ViewStyle
} from "react-native";
import { SearchBar } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";

// const StreamModule = requireNativeComponent('StreamViewRNModule');

// const StreamView = StreamModule as unknown as React.JSXElementConstructor<{ 
//   streamEndPressed:string;
//   broadcastDetail:string;
//   style:StyleProp<ViewStyle>
//  }>;

export const CalcScale = (units:number) => {
  return (screenWidth / 414) * units;
}
// Customizable Area End

import AmazonInteractiveVideoServiceController, {
  Props,
  SearchResult,
  configJSON,
} from "./AmazonInteractiveVideoServiceController";
import { fonts } from "../src/styles/fonts";
import { avatar, cancelIcon } from "../src/assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { empty } from "../src/assets";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { DynamicDimension, screenHeight, screenWidth } from "./helpers/DynamicDimension";
import { ChatIvs } from "./ChatIvs";

export default class AmazonInteractiveVideoService extends AmazonInteractiveVideoServiceController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  invitationModel = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.invitationModel}
        onRequestClose={this.closeInvitationModal}
      >
        <KeyboardAvoidingView
          behavior={"padding"}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: -250 })}
          style={{ flexGrow: 1, }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalListContainer}>
              <View style={[styles.modalHeader]}>
                {/* empty spacer for equal space in between */}
                <View style={styles.cancelButton} />
                <Text style={styles.headerText}>Invite to Join</Text>
                <TouchableOpacity
                testID="closeInvitation"
                    onPress={this.closeInvitationModal}
                  >
                    <Image source={cancelIcon} style={styles.cancelButton} />
                </TouchableOpacity>
              </View>
              <View style={{ minHeight: CalcScale(300) }}>
                <View style={styles.searchContainer}>
                  <SearchBar
                  testID="searchBar"
                    placeholder={"Search"}
                    lightTheme
                    //@ts-ignore
                    searchIcon={() => <AntDesign name="search1" size={20} />}
                    onChangeText={(text) => {
                      this.getAccountsForAudioRequest({ searchText: text });
                      this.onChangeSearchText(text)
                    }}
                    autoCorrect={false}
                    value={this.state.value}
                    containerStyle={styles.searchContainerStyle}
                    inputContainerStyle={styles.searchInputStyle}
                    // inputStyle={this.state.language=="ar" && styles.inputTextRight}
                  />
                </View>

                {this.state.loader && (
                  <View style={[styles.searchContainer, { flex: 1 }]}>
                    <ActivityIndicator size="large" color="black" />
                  </View>
                )}
                  <FlatList
                  testID="searchFlatlist"
                    data={this.state.searchresult}
                    renderItem={({item}:{item:SearchResult}) => this.renderSearchResult(item)}
                    keyExtractor={(item: SearchResult) => `${item.id}`}
                    keyboardShouldPersistTaps="always"
                    ListEmptyComponent={()=> {
                      return <View style={[styles.searchContainer, { flex: 1 }]}>
                      <Image source={empty} style={styles.emptyimg} />
                      <Text style={styles.headerText}>
                        No search result found
                      </Text>
                    </View>
                    }}
                  />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  renderSearchResult = (item: SearchResult) => {
    return (
      <View style={styles.mainView}>
        <View style={styles.submainView}>
          <View style={styles.followImgView}>
            <Image
              source={item.photo ? { uri: item.photo } : avatar}
              style={styles.profileimg}
              resizeMode="contain"
            />
          </View>
          <View style={styles.nameView}>
            {item.user_name ? <Text style={styles.nameText}>{item.user_name}</Text> : null}
            <Text style={styles.descText} numberOfLines={2}>
              {item.bio ? item.bio : "noBio"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.btnContainerStyle,
            item.isInvited && styles.disableBtnStyle,
          ]}
          onPress={() => this.onInviteButtonClick(item)}
          disabled={item.isInvited ?? false}
          testID={`inviteButton${item.id}`}
          activeOpacity={item.isInvited ? 0.3 : 1}
        >
          <View>
            {this.state.selectedInviteData?.id == item.id ? (
              <ActivityIndicator color={"#fff"} size={"small"} />
            ) : (
              <Text style={[styles.btnTextStyle]}>
                {" "}
                {item.isInvited ? "Invited" : "Invite"}{" "}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderStream = () => {
    //  if(this.state.broadcastDetail.token === ''){
      return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator color={"#fff"} size={"small"} />
      </View>
    //  } else {
    //  return <StreamView
    //               streamEndPressed={`${this.state.streamEndPressed}`}
    //               broadcastDetail={JSON.stringify({ ...this.state.broadcastDetail, ...this.state.currentUser })}
    //               style={{ flex: 1 }}
    //             />
    //  }
  }

  // Customizable Area End

  render() {
    return (
          //  Customizable Area Start
          <>
          <KeyboardAwareScrollView
          scrollEnabled={false}
          style={{flex: 1}}
          keyboardShouldPersistTaps={true}
          >
          <View style={{ flex: 1,
            backgroundColor: "black",
            height: screenHeight,
            width: screenWidth,}}>
         <TouchableWithoutFeedback onPress={this.closeInvitationModal}>
        <View style={{flex:1}}>
               {this.renderStream()}
           </View>
           </TouchableWithoutFeedback>
         {this.state.broadcastDetail.startBroadcast == 'true' ? <View style={{position:'absolute',top:80,right:20}}><TouchableOpacity
         testID="endButton"
           onPress={this.endbuttonPressed}
           ><Text style={{fontSize:17,fontWeight:'bold',color:'red'}}>End</Text></TouchableOpacity></View> : null}
             </View>

    <ChatIvs isViewer={this.state.broadcastDetail.isViewer} userData={this.state.currentUser} chatTokenData={this.state.chatTokenData} inviteModal={this.openInviteModal} />
    <TouchableOpacity testID={'newButton'} style={{height:0,width:0}} onPress={this.onClick} />
            </KeyboardAwareScrollView>
            {this.invitationModel()}
</>
// Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: CalcScale(20),
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  emptyimg: {
    width: CalcScale(80),
    height: CalcScale(80),
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
  searchInputStyle: {
    backgroundColor: "#EEEEEE",
    height: DynamicDimension(45, true, 1),
  },
  cancelButton: {
    resizeMode: "contain",
    height: CalcScale(23),
    width: CalcScale(23),
    alignSelf: "flex-end"
  },
  inputTextRight: {
    textAlign:"right"
  },
  nameView: {
    marginLeft: DynamicDimension(20, true, 1),
    width: responsiveWidth(45),
    alignItems: "flex-start",
  },
  headerText: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: CalcScale(20),
  },
  containerStyle: {
    flex: 1,
    color: "white",
    marginLeft: 12,
    margin: 4,
    padding: 4,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainerStyle: {
    backgroundColor: "#FFC925",
    borderRadius: 10,
    width: "32%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  disableBtnStyle: {
    opacity: 0.3,
  },
  btnTextStyle: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    fontFamily: fonts.MontserratMedium,
  },
  modalListContainer: {
    position: "absolute",
    bottom: 0,
    width: screenWidth,
    borderTopRightRadius: CalcScale(20),
    borderTopLeftRadius: CalcScale(20),
    backgroundColor: "rgb(255, 255, 255)",
    maxHeight: CalcScale(500),
  },
  profileimg: {
    width: CalcScale(40),
    height: CalcScale(40),
    borderRadius: CalcScale(100),
  },
  nameText: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: CalcScale(16),
  },
  mainView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: DynamicDimension(10, true, 1),
    alignItems: "center",
    marginHorizontal: 10,
  },
  followImgView: {
    height: DynamicDimension(50, false, 1),
    width: DynamicDimension(50, true, 1),
    borderRadius: DynamicDimension(50, true, 1),
  },
  submainView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  modalContainer: {
    flex: 1,
  },
  descText: {
    fontSize: DynamicDimension(14, true, 1),
  },
});
// Customizable Area End
