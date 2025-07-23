import React from "react";
// Customizable Area Start
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
  Platform
} from "react-native";
import DraftController from "./DraftController";
import Scale from "../../../components/src/Scale";
import { translate } from "../../../components/src/i18n/translate";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";
import { backarrow, ic_draft_empty, imgLeftArrow } from "./assets";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import { getStorageData } from "../../../framework/src/Utilities";
export const configJSON = require("./config");
// Customizable Area End
export default class DraftList extends DraftController {
  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.props.navigation.addListener('focus', async() => {
      const userID = await getStorageData('userID',false)||''
      // console.log({userID})

      this.setState({ accountId: userID, draftLoading: true },()=>{
        this.getAccountPosts(this.state.isListAsc)
      })

    })
    this.props.navigation.addListener('blur', () => {
      this.setState({
        draftList: [],
        draftLoading: true,
        accountId: null,
      })
    })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  async componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  renderDrafts = (data: any) => {
    const {item}=data

    return (
      <TouchableOpacity testID={'clickNavDraft'} style={styles.post_container} onPress={()=>{
        this.setState({pageNum : 1})
        this.props.navigation.navigate("DraftScreen", item)
      }}>
        <Image source={{uri:item?.attributes?.post_medias?.thumnails?.[0]}} style={styles.post_image} />
      </TouchableOpacity>
    )
  }

  emptyList = () => {
    if (!this.state.draftLoading) {
      return (
        <View style={styles.emptyList}>
          <Image source={ic_draft_empty} style={styles.emptyIcon} resizeMode={'contain'} />
          <Text style={styles.emptyTitle}>{translate("any_draft")}</Text>
          <Text style={styles.emptySubTitle}>{translate("appear_draft")}</Text>
        </View>
      )
    } else return null;
  }

  keyBookmarkExtractor = (item: any) => {
    return item.id
  }
  // Customizable Area End
  render() {
    // Customizable Area Start
    return (
        <>
        <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity testID="backArrowKey" style={styles.headerIconsView} onPress={() => this.props.navigation.goBack()}>
            <Image source={imgLeftArrow} style={[styles.headerIcon_en,this.state.language == "ar" && {transform: [{ rotate: "180deg" }]}]} resizeMode={'contain'} />
          </TouchableOpacity>
          <Text style={styles.title}>{translate("drafts")}</Text>
          <View style={styles.headerList}>
            <TouchableOpacity testID="newTouchKey" onPress={() => {
              if (this.state.isListAsc) {
                this.setState({ draftLoading: true, isListAsc: false, draftList:[], pageNum:1 },()=>{
                  this.getAccountPosts(this.state.isListAsc)
                })
              } else {
                this.setState({ draftLoading: true, isListAsc: true, draftList:[],pageNum:1 },()=>{
                  this.getAccountPosts(this.state.isListAsc)
                })
              }

            }}>
              <View style={styles.backContainer}>
                <Text style={styles.textNewest}>{this.state.isListAsc ? translate("newest") : translate("oldest")}</Text>
                <Image source={backarrow} style={[styles.icoNewest, {transform: [{ rotate: this.state.isListAsc ? '-90deg' : '90deg'}]}]} resizeMode={'contain'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
          <View style={styles.content}>
            <FlatList
                testID="flatListDrafts"
              numColumns={3}
              data={this.state.draftList}
              renderItem={this.renderDrafts}
              keyExtractor={this.keyBookmarkExtractor}
              refreshing={this.state.draftLoading}
              ListEmptyComponent={this.emptyList}
              contentContainerStyle={styles.flatContainer}
              // style={styles.flatContainer}
              onEndReachedThreshold={Platform.OS == "ios" ? 0 : 0.1}
              onEndReached={this.onDrafListEndReached}
              refreshControl={<RefreshControl refreshing={this.state.draftLoading}
              />} />
          </View>
        </SafeAreaView>
      </>
    );
    // Customizable Area End
  }
}

const styles = StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: deviceBasedDynamicDimension(15, false, 1),
    paddingTop: deviceBasedDynamicDimension(12, false, 1),
    paddingBottom: deviceBasedDynamicDimension(12, false, 1),
    borderBottomColor: '#cacaca',
    borderBottomWidth: 1,
  },
  headerIconsView: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flatContainer: {
    paddingBottom: Scale(20)
  },
  emptyList: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingTop:Scale(10) 
  },
  headerIcon: {
    height: 18,
    width: 18,
    transform: [{ rotate: '180deg'}]
  },
  headerIcon_en: {
    height: Scale(25),
    width: Scale(25),
    resizeMode: "contain",
  },
  icoNewest: {
    height: 14,
    width: 14,
    marginLeft: 8,
  },
  headerDropDownIcon: {
    height: 10,
    width: 10,
    marginLeft: 3,
    transform: [{ rotate: '-90deg'}]
  },
  headerList: {
    width: 100,
  },
  titleDropDown: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold"
  },
  title: {
    flex: 1,
    fontSize: Scale(18),
    textAlign: "center",
    fontWeight: "bold"
  },
  textNewest: {
    flex: 1,
    fontSize: Scale(16),
    textAlign: "right",
    fontWeight: "bold"
  },
  emptyIcon: {
    height: 90,
    width: 90,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
    color: '#000',
  },
  emptySubTitle: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 3,
    color: '#858585',
  },
  content: {
    flex: 1,
  },
  post_container: {
    flex: 1,
    height: Scale(240),
    maxWidth: responsiveScreenWidth(100) / 3,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRightWidth: 0,
    borderTopWidth: 2,
  },
  post_image: {
    height: Scale(240),
  },
  // Customizable Area End
});
