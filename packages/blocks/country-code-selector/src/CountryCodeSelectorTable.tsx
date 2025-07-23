import React from "react";
// Customizable Area Start
export const deviceBasedDynamicDimension = (
  originalDimen: number,
  compareWithWidth: boolean,
  resizeFactor: number
) => {

  function isSameRatio(): boolean {
    return (
      artBoardWidthOrg / artBoardHeightOrg < 1 && screenWidth / screenHeight < 1
    );
  }
  let screenWidth = Dimensions.get('window').width;
  let screenHeight = Dimensions.get('window').height;
  //Artboard Dimension
  let artBoardHeightOrg = 844;
  let artBoardWidthOrg = 390;
  let artBoardWidth = isSameRatio() ? artBoardWidthOrg : screenWidth;
  let artBoardHeight = isSameRatio() ? artBoardHeightOrg : screenHeight;
  let extraSpace = 0;

  if (originalDimen != null) {
    if (resizeFactor != null) {
      originalDimen *= resizeFactor;
    }
    const compareArtBoardDimenValue = compareWithWidth
      ? artBoardWidth
      : artBoardHeight;
    const artBoardScreenDimenRatio =
      (originalDimen * 100) / compareArtBoardDimenValue;
    let compareCurrentScreenDimenValue = compareWithWidth
      ? screenWidth
      : screenHeight - extraSpace;
    if (Platform.OS === 'web') {
      return (
        responsiveWidth(originalDimen / compareCurrentScreenDimenValue) * 100
      );
    }
    return PixelRatio.roundToNearestPixel(
      (artBoardScreenDimenRatio * compareCurrentScreenDimenValue) / 100
    );
  }
}
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  PixelRatio,
  Dimensions,
  Platform,
  Modal
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { imgArrow } from "../../mobile-account-registration/src/assets";
import { imgBorderCircle, imgCheckedCircle, imgRightArrowFull } from "./assets";
import { Button} from "react-native-elements";
import { responsiveWidth } from 'react-native-responsive-dimensions';
const { width } = Dimensions.get("window");
import Scale from "../../../components/src/Scale";
import CustomButton from "../../../components/src/Custombutton";
import FONTS from "../../../components/src/Fonts/Fonts";
import { translate } from "../../../components/src/i18n/translate";
import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

import { ListItem, SearchBar } from "react-native-elements";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../framework/src/Message";

const configJSON = require("./config");

interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  setOpenModal: any;
  setCountry: any;
  route:any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  loading: boolean;
  data: any[];
  error: any;
  value: string;
  selectedCountry: any;
  searchData:any;
  language:any;
  isModalOpen: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

class CountryCodeSelectorTable extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  arrayholder: any[];
  countryCodeApiCallId: any;
  // Customizable Area End
  constructor(props: Props) {
    super(props);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    this.state = {
      loading: true,
      data: [],
      error: null,
      value: "",
      selectedCountry: null,
      searchData:[],
      language:"",
      isModalOpen:false
    };

    this.arrayholder = [];
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    const language = await getStorageData("SelectedLng");  
    this.setState({language:language}) 
    this.getCountryApi();
    // Customizable Area End
  }

  // Customizable Area Start
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  searchFilterFunction = (text: string) => {
    this.setState({
      value: text
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.country_name.toUpperCase()} (${item.country_code}) +${item.country_ISO_code
        }`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      searchData: newData
    });
  };



  renderHeader = () => { 
    return (
      <SearchBar
        placeholder={translate("search")}
        platform="default"
        searchIcon={<AntDesign name="search1" size={20} color="grey"/>} 
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
        containerStyle={styles.searchContainerStyle}
        inputContainerStyle={styles.searchInputStyle}
        inputStyle={[styles.inputStyle,this.state.language=="ar" && styles.inputTextRight]}
      />
    );
  };

  actionOnRow(item: any) {
    this.props.navigation.pop();
    setTimeout(function () {
      const msg = new Message(getName(MessageEnum.CountryCodeMessage));

      let countryNameCode = ` ${item.attributes.emoji_flag} ${
        item.attributes.name
      } (${item.id}) +${item.attributes.country_code}`;
      msg.addData(getName(MessageEnum.CountyCodeDataMessage), countryNameCode);

      runEngine.sendMessage(getName(MessageEnum.CountryCodeMessage), msg);
    }, 1.0);
  }

  renderItem = (item: any) => {
    const { selectedCountry } = this.state;
    return (
      <TouchableOpacity style={[styles.listitemStyle, selectedCountry?.item?.country_name === item?.item?.country_name ? styles.selectedBorderStyle : styles.unSelectedBorderStyle]} onPress={() => this.setState({ selectedCountry: item })} >
        <Text style={styles.flagStyle}>{item?.item?.country_flag}</Text>
        <Text style={styles.idStyle}>{item?.item?.country_ISO_code}</Text>
        <Text style={styles.nameStyle}>{item?.item?.country_name}</Text>
        <View style={styles.circleView}>
          <Image source={selectedCountry?.item?.country_name === item?.item?.country_name ? imgCheckedCircle : imgBorderCircle} style={styles.imgStyle} />
        </View>
      </TouchableOpacity>
    )
  }

  goToContinue() {
    if (this.state.selectedCountry !== null) {
      const msg: Message = new Message(
        getName(MessageEnum.NavigationPhoneNumberInputMessage)
      );
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        console.log("NAMMMM 1 = ", this.props.route.params?.name)
      msg.addData(getName(MessageEnum.PhoneNumberInputDataMessage), { countryCode: this.state.selectedCountry, countryList: this.state.data, name: this.props.route.params?.name? this.props.route.params?.name:"",email: this.props.route.params?.email?this.props.route.params?.email:"", loginType: this.props.route.params?.loginType?this.props.route.params?.loginType:"" });
      this.send(msg);
    }else {
      this.setState({isModalOpen: true})
    }
  }

  getCountryApi = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.countryCodeApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.apiEndPointGetCountry
    );
  
    const header = {
      "Content-Type": configJSON.contentTypeApiGetCountryCodes
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiGetCountryCodesType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    const {language} = this.state;


    const sortDataArray = this.state.data.sort(function(a, b) {
      let nameA = a.country_name.toUpperCase();
      let nameB = b.country_name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  
    return (
      <>
        <SafeAreaView style={styles.mainContainerStyle}>
          <View style={styles.mainView}>
            <View style={styles.headerStyle}>
              <TouchableOpacity style={styles.imgView} onPress={() => this.props.navigation.goBack()}>
                <Image source={language == "ar" ? imgRightArrowFull : imgArrow} style={styles.imgStyle} />
              </TouchableOpacity>
              <Text style={styles.titleStyle}>{translate("selectCountry")}</Text>
            </View>
            <FlatList
              style={{ height: "95%" }}
              data={this.state.value == "" ? sortDataArray : this.state.searchData}
              renderItem={(item: any) => this.renderItem(item)}
              scrollEnabled={true}
              //@ts-ignore
              keyExtractor={item => item.id}
              ListHeaderComponent={this.renderHeader}
              ListEmptyComponent={() => <Text style={styles.noDatatext}>{this.state.loading ? translate("loading") : translate("data_not_found")}</Text>}
            />
          </View>
        </SafeAreaView>
        <Button
          buttonStyle={[styles.signinBtnStyle, styles.signInBtn,
          this.state.selectedCountry?{backgroundColor:"#FFC925"}:{backgroundColor:"#fff"}]}
          containerStyle={styles.btnContainer}
          onPress={() => this.goToContinue()}
          title={translate("continue")}
          titleStyle={{
            fontWeight: "bold",
            fontSize: 14,
            color: "#000000",
            flex:1
          }}
        />
        <Modal animationType="slide"
            transparent visible={this.state.isModalOpen}
            presentationStyle="overFullScreen"
        >
        <View style={styles.viewWrapper}>
            <View style={styles.modalView}>
            <>
            <Text style={[styles.textStyle]}>{translate("counrtyalertMsg")}</Text>
                <View style={[styles.btn1 ]}>
                    <CustomButton testID="updateBtn" style={[styles.fontfamily,{width:"100%"}]} title={translate("ok")} onPress={() => this.setState({isModalOpen:false})} />
                </View>
            </> 
            </View>
        </View>
        </Modal>
      </>
    );
    // Customizable Area End
  }

  async receive(from: String, message: Message) {
    runEngine.debugLog("Country Code", message);
    // Customizable Area Start

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.countryCodeApiCallId != null &&
      this.countryCodeApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson.errors) {
        this.setState({
          data: responseJson,
          error: null,
          loading: false
        });
        this.arrayholder = responseJson;
      } 
    }
    // Customizable Area End
  }

  makeRemoteRequest = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.countryCodeApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.apiEndPointGetCountryCodes
    );

    const header = {
      "Content-Type": configJSON.contentTypeApiGetCountryCodes
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiGetCountryCodesType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
}

// Customizable Area Start
const styles = StyleSheet.create(
  {
    mainContainerStyle: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    mainView: {
      margin: deviceBasedDynamicDimension(10, true, 1),
    },
    headerStyle: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: deviceBasedDynamicDimension(20, false, 1),
    },
    imgView: {
      height: deviceBasedDynamicDimension(30, false, 1),
      width: deviceBasedDynamicDimension(30, false, 1),
    },
    imgStyle: {
      height: "100%",
      width: "100%",
      resizeMode: "contain"
    },
    listContainerStyle: {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      marginVertical: deviceBasedDynamicDimension(10, false, 1)
    },
    listitemStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: deviceBasedDynamicDimension(10, false, 1),
      marginBottom: deviceBasedDynamicDimension(10, false, 1),
      padding: deviceBasedDynamicDimension(10, true, 1)
    },
    unSelectedBorderStyle: {
      borderColor: "#EEEEEE",
    },
    selectedBorderStyle: {
      borderColor: "#FFC925",
    },
    titleStyle: {
      fontWeight: 'bold',
      fontSize: deviceBasedDynamicDimension(16, true, 1),
      marginLeft: deviceBasedDynamicDimension(30, true, 1),
      color: "#000000",

    },
    searchContainerStyle: {
      backgroundColor: "transparent",
      padding: 0,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      marginBottom: deviceBasedDynamicDimension(20, false, 1),
    },
    searchInputStyle: {
      backgroundColor: "#EEEEEE",
      height: deviceBasedDynamicDimension(50, false, 1),
      alignItems: "center",
      borderRadius: deviceBasedDynamicDimension(15, false, 1)
    },
    inputStyle: {
      fontSize: deviceBasedDynamicDimension(14, true, 1),
    },
    flagStyle: {
      width: "15%",
      fontSize: deviceBasedDynamicDimension(30, true, 1),
      textAlign: 'center',
      borderRadius: deviceBasedDynamicDimension(10, false, 1),
      color: "black"
    },
    idStyle: {
      width: "10%",
      fontSize: deviceBasedDynamicDimension(14, true, 1),
      color: "#000000",
      // fontWeight: 'bold',
      alignItems: "center",
    },
    nameStyle: {
      width: "55%",
      fontSize: deviceBasedDynamicDimension(14, true, 1),
      fontWeight: 'bold',
      color: "#000000",
    },
    circleView: {
      height: deviceBasedDynamicDimension(20, false, 1),
      width: deviceBasedDynamicDimension(20, false, 1)
    },
    signinBtnStyle: {
      borderRadius: deviceBasedDynamicDimension(50, false, 1),
      height: deviceBasedDynamicDimension(50, false, 1),
      width: "90%",
      paddingHorizontal: deviceBasedDynamicDimension(20, true, 1),
      alignContent:"center",
      backgroundColor:"#fff"
    },
    signInBtn: {
      borderColor: "#FFC925",
      borderWidth: 1,
    },
    filledSigninBtn: {
      backgroundColor: "#FFC925",
    },
    btnContainer: {
      paddingVertical: deviceBasedDynamicDimension(15, true, 1),
      backgroundColor:"#fff",
      justifyContent:"center",
      alignItems:"center"
    },
    noDatatext:{
      textAlign:"center",
      marginVertical:deviceBasedDynamicDimension(30,false,1)
    },
    viewWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    justifyContent: "center",
    elevation: 5,
    padding:Scale(20),
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: '#FFC925',
    borderWidth: .5,
  },
  textStyle:{
      fontSize:Scale(14),
      fontFamily:FONTS.MontserratMedium,
      textAlign:"left"
  },
  fontfamily:{
      fontFamily:FONTS.MontserratRegular
  },
  btn1:{
    marginTop:Scale(20),
    alignItems:"flex-end",
    justifyContent:"flex-end",
  },
  inputTextRight:{
    textAlign:"right"
  },
  },
);
// Customizable Area End
export default CountryCodeSelectorTable;
