import React from "react";
// Customizable Area Start
import Scale from "../../../../components/src/Scale";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import {backArrow, imgRightArrow,imgLeftArrow} from "../assets";
// Customizable Area End
import SettingOptionsCommonController , { Props } from "./settingOptionsCommonController";
import CustomLoader from "../../../../components/src/CustomLoader";
import { getStorageData } from "../../../../framework/src/Utilities";
import { translate } from "../../../../components/src/i18n/translate";
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
export default class PersonalInformation extends SettingOptionsCommonController {
  // Customizable Area Start
  async componentDidMount() {
    const authToken = (await getStorageData('authToken', false)) || '';
    const language = await getStorageData("SelectedLng"); 
    this.setState({ token: authToken,language:language }, () => {console.log("Token", this.state.token)})
    this.getUserDetails()
  }
  // Customizable Area End
  constructor(props: Props) {
    super(props);
  }

  topHeaderSettings = () => {
    const {language} = this.state;    
    return (
      <View style={[styles.headercontainer, styles.divider]}>
        <TouchableOpacity testID="manageAcc" onPress={() => this.props.navigation.navigate('ManageAccount')}>
          <Image source={language == "ar" ? imgRightArrow : imgLeftArrow} style={language == "ar" ? styles.backarrow_style : styles.backarrow_style_en} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{translate("personal_Information")}</Text>
      </View>
    );
  };

  item = () => {
    return (
      <View style={{paddingHorizontal:Scale(25)}}>
        {this.state.personalInformation ?
        <View>
          <View style={styles.item}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.title}>{translate("fullName")}</Text>
              </View>
            <View>
            <Text style={styles.subTitle}>{this.state.personalInformation?.full_name}</Text>
          </View>
          </View>
          <View style={styles.item}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.title}>{translate("email")}</Text>
              </View>
            <View>
            <Text style={styles.subTitle}>{this.state.personalInformation?.email}</Text>
          </View>
          </View>          
          <View style={styles.item}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={styles.title}>{translate("phone")}</Text>
            </View>
            <View>
                <Text style={styles.subTitle}>+{this.state.personalInformation?.full_phone_number}</Text>
          </View>
          </View>
          <View style={styles.item}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={styles.title}>{translate("dob")}</Text>
            </View>
            <View>
                <Text style={styles.subTitle}>{this.state.personalInformation?.date_of_birth}</Text>
            </View>
          </View>  
        </View> : 
        <View style={{display:'flex', marginTop: Scale(30)}}>
          <CustomLoader/>
        </View>} 
      </View>
    )
  }
  // Customizable Area Start

  // Customizable Area End
  render() {
    // Customizable Area Start
    // Customizable Area End
    return (
      <View style={styles.container}>
        <SafeAreaView>
          {/* Customizable Area Start */}
          {this.topHeaderSettings()}
          {this.item()}
          {/* Customizable Area End */}
        </SafeAreaView>
      </View>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
  },
  headercontainer: {
    flexDirection: "row",
    alignItems:'center',
    paddingHorizontal: Scale(15),
    height: Scale(40),
    width: '100%',
  },
  headerText: {
    fontSize:Scale(18),
    fontWeight:'bold',
    width:screenWidth-Scale(60),
    textAlign:'center',
  },
  backarrow_style: {
    width: Scale(20),
    height: Scale(18),
    resizeMode: "contain",
  },
  backarrow_style_en: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: "contain",
  },
  icon: {
    width:Scale(35), 
    height:Scale(35),
    resizeMode: "contain"
  },
  divider: {
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  item: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginVertical:Scale(5)
  },
  title: {
    fontSize: Scale(16),
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: "left",
    marginVertical: 8,
    marginHorizontal:14
  },
  subTitle: {
    fontSize: Scale(15),
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: "left",
    color:'#B7BBC0',
    marginVertical: 8,
    marginHorizontal:14
  }
});
// Customizable Area End
