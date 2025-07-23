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
  screenWidth,
} from "./helpers/DynamicDimension";
import scale from "../../../components/src/Scale";
import { cancelIcon, rose } from "./assets";
import { fonts } from "./styles/fonts";
import Lottie from 'lottie-react-native';
import CustomButton from "../../../components/src/Custombutton";
import GiftModelController , { Props } from "./GiftModelController";
import AlertModal from "../../../components/src/AlertModal";
import { translate } from "../../../components/src/i18n/translate";
// Customizable Area End
export default class GiftModel extends GiftModelController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renedrCategories = (item: any) => {
    return (
      <View style={{}}>
        <TouchableOpacity
         testID="getCalalogue"
          style={[styles.tabbarStyle]}
          onPress={() => {
            this.setState({
              categoryid: item?.item?.id,
            })
            this.getCatloge()
          }}>
          <Text
            style={[
              styles.tabTextStyle,
              (item?.item?.id == this.state.categoryid) && styles.greyText
            ]}
            numberOfLines={1}
          >
            {item?.item?.attributes?.name}
          </Text>
        </TouchableOpacity>
        {(item?.item?.id == this.state.categoryid) && (
          <View style={styles.activeTab}></View>
        )}
      </View>
    );
  };

  renderLottie = (url:any,json:any,type:any) => {
    if(type === "image"){
      return  <Image source={{ uri: url }} style={[styles.imageStyle]} />
    } else {
      return <Lottie
            source={json}
            autoPlay={true}
            loop
            style={styles.imageStyle}
          />
        }
  }

  renderJSON = (url:any,json:any,type:any) => {
      if(url || json) {
        return this.renderLottie(url,json,type)
       } else {
     return <Image source={rose} style={[styles.imageStyle]} />
       }
  }

  rendergiftsdata = ({item}: {item : any}) => {
    const url = item && item?.attributes?.image?.url;
    const json = item && item?.attributes?.image?.json;
    const type = item && item?.attributes?.image?.type;
    const coins = item?.attributes?.coins || 0;
    const selected = item?.id === this.state.selectedGift?.id;
    return item?.attributes ? (
      <TouchableOpacity
        testID="getparticipant"
        style={[styles.catalogueView, selected && styles.selectedGift]}
        onPress={() => {
          this.setState({
            selectedGift: item
          },()=> {
            this.props.getParticipant()
            this.props.setSelectedGift(this.state.selectedGift)
          })
        }
        }
      >
        <View style={styles.imgView}>
          {this.renderJSON(url,json,type)}
        </View>
        <Text style={styles.normaltext}>{coins} coins</Text>
      </TouchableOpacity>
    ) : (
      <Text style={[styles.noText]}>{item?.item}</Text>
    );
  };

  // Customizable Area End

  render() {
    return (
      //  Customizable Area Start
      <Modal
      visible={this.props.giftsModal}
      transparent={true}
      animationType={"slide"}
    >
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined})}
        style={styles.transpernetModalContainer}>
        <TouchableOpacity
          testID="addParticipant1"
          onPress={() => this.props.setGiftModel()} 
          style={{ flex: 1 }}>
        </TouchableOpacity>
        <View style={styles.modalContainer}>
          <View style={styles.modalListContainer1}>
            <View style={{ flex: 1 }}>
              <View style={styles.buttonsContainer}>
              <FlatList
                testID="CategoriesFlatListTest"
                style={styles.flatlist}
                contentContainerStyle={styles.categoriesContainer}
                data={this.state.categorydata}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={(item: any) => this.renedrCategories(item)}
                  ListEmptyComponent={()=> {
                    return <View style={{height:scale(30),alignItems:'center',justifyContent:'center'}}><ActivityIndicator size={"large"} /></View>
                  }}
              />
              <TouchableOpacity testID="crossButton1" onPress={()=> this.props.setGiftModel() } style={styles.giftCrossIcon}>
                <Image style={styles.crossImage} source={cancelIcon} />
              </TouchableOpacity>
              </View>
              <View style={styles.deviderLine} />
              <View style={{ marginTop: scale(5),height:scale(200) }}>
                <FlatList
                  testID="CategoryFlatListTest"
                  data={this.state.giftsdata[this.state.categoryid] ?? []}
                  numColumns={4}
                  renderItem={(data) => this.rendergiftsdata(data)}
                  contentContainerStyle={{padding: 10}}
                  ListEmptyComponent={()=> {
                    const showLoader = this.getAllGiftsDataApiId?.filter((item:any)=> item.catId == this.state.categoryid)
                    if(showLoader && this.state.giftsLoader){
                      return <ActivityIndicator color={"black"} size={"small"} />
                    }
                    return   <View style={styles.emptyModelView}>
                    <Text>{translate("noResultsFound")}</Text>
                </View>
                  }}
                />
              </View>
            </View>
            <View
              style={{
                bottom: 0,
                left: 0,
                right: 0,
                height: 70,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 16
              }}
            >
              <TouchableOpacity
                testID="testButton6"
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={this.goToRecharge}
              >
                <Text style={[styles.scoreText]}>{translate("recharge")}</Text>
                  <Text style={[styles.normaltext, { marginLeft: 5 }]}>
                    {this.state.coins}
                  </Text>
                </TouchableOpacity>

              <CustomButton
              testID="sendButton2"
                title={translate("send")}
                style={{
                  borderRadius: 0,
                  backgroundColor:
                    this.state.coins < 0 ? "#f3f3f3" : "#FFC925"
                }}
                TextStyle={{ color: "grey" }}
                onPress={this.checkCoins}
                />
              </View>
            </View>
          </View>
          <AlertModal  
          alertModal={this.state.giftAlertPopup} 
          onPress2={this.closeGiftAlertModal}
          btnTitle2={"OK"}     
        /> 
        </KeyboardAvoidingView>
      </Modal>
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
    giftCrossIcon: {
        right: 10
    },
    catalogueView: {
        alignItems: "center",
        width: "25%",
        paddingVertical: scale(10)
    },
    emptyModelView: {
        justifyContent: "center",
        alignItems: "center"
    },
    greyText: {
        color: "#000"
    },
    crossImage: {
        resizeMode: "contain",
        height: scale(23),
        width: scale(23),
    },
    categoriesContainer: {
        flex: 1,
        alignSelf: 'flex-end',
    },
    tabTextStyle: {
        fontFamily: fonts.MontserratMedium,
        fontSize: scale(14),
        color: "grey"
    },
    modalContainer: {
        flex: 1,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
    tabbarStyle: {
        height: scale(50),
        width: scale(100),
        justifyContent: "center",
        alignItems: "center",
        marginRight: scale(10)
    },
    imgView: {
        height: 30,
        width: 30,
        zIndex: 10000000,
    },
    normaltext: {
        fontFamily: fonts.MontserratRegular,
        fontSize: scale(12)
    },
    activeTab: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#000",
        width: scale(100),
        height: scale(5),
        borderRadius: scale(10)
    },
    imageStyle: {
        height: "100%",
        width: "100%",
        resizeMode: "contain",
        alignSelf: 'center'
    },
    modalListContainer1: {
        position: "absolute",
        bottom: 0,
        width: screenWidth,
        backgroundColor: "rgb(255, 255, 255)",
        maxHeight: scale(500)
    },
    noText: {
        fontFamily: fonts.MontserratMedium,
        fontSize: scale(12),
        color: "grey",
        margin: scale(20),
        textAlignVertical: "center",
        textAlign: "center",
        width: "100%"
    },
    buttonsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    flatlist: {
        flex: 1,
        marginHorizontal: scale(10),
        width: "100%"
    },
    selectedGift: {
        borderWidth: 1,
        borderColor: "#FFC925"
    },
    scoreText: {
        fontFamily: fonts.MontserratBold
    },
    deviderLine: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginTop: 0
    },
});
// Customizable Area End