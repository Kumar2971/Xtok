import React from "react";
// Customizable Area Start
import Scale  from "../../../../components/src/Scale";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Platform,
  Modal,
  Clipboard,
  BackHandler
} from "react-native";
import {Person,ClipboardStrokeIcon, CameraIcon, imgRightArrow, imgLeftArrow} from "../assets";
const { width } = Dimensions.get("window");
import CustomButton from "../../../../components/src/Custombutton";
// Customizable Area End
import  { getStorageData } from "../../../../framework/src/Utilities";
import SettingOptionsCommonController , { Props } from "./settingOptionsCommonController";
import { translate } from "../../../../components/src/i18n/translate";
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
export default class EditProfile extends SettingOptionsCommonController {
  // Customizable Area Start
  async componentDidMount() {
    const authToken = (await getStorageData('authToken', false)) || '';
    const language = await getStorageData("SelectedLng");
    this.setState({ token: authToken,isLoading:true, language: language }, () => {console.log("Token", this.state.token)
    this.getBucketDetails();
    this.getCurrentUserProfileDetails();
    });
  }
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.handleBackButtonClicked = this.handleBackButtonClicked.bind(this);
  }

  componentWillMount = async() => {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClicked);
  }

  componentWillUnmount = async() => {
     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClicked);
  }

  handleBackButtonClicked() {
      this.setState({ isModalVisible: false, modalType: '' });
      this.props.navigation.goBack();
      return true;
  }

  topHeaderSettings = () => {
    const {language} = this.state;
    return (
      <View style={[styles.headercontainer, styles.divider]}>
        <TouchableOpacity testID="profile" onPress={() => this.props.navigation.navigate('UserProfileBasicBlock')}>
          <Image source={imgLeftArrow} style={[styles.backarrow_style_en,language == "ar" && {transform: [{ rotate: "180deg" }]}]} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{translate("edit_Profile")}</Text>
        <View/>
      </View>
    );
  };

  toggleModalVisibility = () => {
      this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  updateContent = () => {
    if (
      this.state.inputValueName  !== ""
      || this.state.inputValueBio !== ""
      || this.state.inputValueUsername !== ""
    ) {
      this.updateProfile();
    } else {
      this.showAlert("Error", "Please enter value in field.");
    }
  }

  handleChange(text:string) {
    if(this.state.modalType == 'name'){
      this.setState({ inputValueName: text });
    } else if (this.state.modalType == 'username'){
      this.setState({ inputValueUsername: text.replace(/ /g,"") });
    } else {
      this.setState({ inputValueBio: text });
    }
  }

  leftArrowImage = () => {
    const {language} = this.state;
    return(
      <Image source={language == "ar" ? imgLeftArrow : imgRightArrow}   style={language == "ar" ? styles.imgLeftView  : styles.imgrightView  } resizeMode={"contain"} />
    )
  } 

  onPressName=()=>{
    this.setState({ isModalVisible: true, modalType: 'name' });

  }
  onPressUserName=()=>{
    this.setState({ isModalVisible: true, modalType: 'username' });
  } 

  onPressBio=()=>{
    this.setState({ isModalVisible: true, modalType: 'bio' });
  }

  item = () => {
    return (
      <View style={{paddingHorizontal:Scale(15)}}>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
          <TouchableOpacity testID="photo" style={styles.item} onPress={() => {
            this.doClickImageVideoPicker('photo');
            this.setState({ modalType: 'photo' });
          }} disabled={this.state.isVideoPictureLoading}>
              <View style={{flexDirection:'column', alignItems:'center'}}>
                <View style={styles.imageContainer}>
                  <Image source={this.state.previewImage != '' ? {uri: this.state.previewImage} : Person} style={[styles.bottom,{width: Scale(80),height: Scale(80),borderRadius:999}]} />
                  {!this.state.isVideoPictureLoading
                   ? <Image source={CameraIcon} style={[styles.top,{width: Scale(30),height: Scale(30),resizeMode: "contain"}]} />
                   : <ActivityIndicator style={[styles.top,{width: Scale(30),height: Scale(30)}]}/>
                  }
                </View>
                <Text>{translate("change_photo")}</Text>
              </View>
          </TouchableOpacity>


        </View>
        <View style={{marginVertical:Scale(15)}}>
          {/*  */}
          <TouchableOpacity testID="visibleMD" style={styles.item} onPress={()=>this.onPressName()} disabled={this.state.isVideoPictureLoading}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.title}>{translate("name")}</Text>
              </View>
              <View style={{display:'flex',flexDirection:'row', alignItems:'center'}}>
                  <Text style={{paddingHorizontal:Scale(20), color:'#B0B0B2'}}>{this.state.userDetails?.data?.attributes?.full_name || ''}</Text>
                  {this.leftArrowImage()}
              </View>
          </TouchableOpacity>
          <TouchableOpacity testID="userName" style={styles.item} 
          onPress={() => this.onPressUserName()} disabled={this.state.isVideoPictureLoading}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.title}>{translate("userName")}</Text>
              </View>
              <View style={{display:'flex',flexDirection:'row', alignItems:'center'}}>
                  <Text style={{paddingHorizontal:Scale(20), color:'#B0B0B2'}}>{this.state.userDetails?.data?.attributes?.user_name || 'john_doe'}</Text>
                  {this.leftArrowImage()}
              </View>
          </TouchableOpacity>
          {/*<TouchableOpacity testID="clipboard" style={styles.item} onPress={() => {*/}
          {/*  this.state.userDetails?.data?.attributes?.qr_code?.qr_code ? Clipboard.setString(this.state.userDetails?.data?.attributes?.qr_code?.qr_code) : Clipboard.setString('golavi code');*/}
          {/*}} disabled={this.state.isVideoPictureLoading}>*/}
          {/*    <View style={{flexDirection:'row', alignItems:'center'}}>*/}
          {/*    </View>*/}
          {/*    <View style={[styles.golaviView,this.state.language=="ar"?{start:0}:{end:0}]}>*/}
          {/*        <Text style={{paddingHorizontal:Scale(20), color:'#B0B0B2'}}>{this.state.userDetails?.data?.attributes?.qr_code?.qr_code ? this.state.userDetails?.data?.attributes?.qr_code?.qr_code : 'golavi code'}</Text>*/}
          {/*        <Image source={ClipboardStrokeIcon} style={[styles.golaviImg,this.state.language=="ar"?{start:0}:{end:0}]} />*/}
          {/*    </View>*/}
          {/*</TouchableOpacity>*/}
          <TouchableOpacity
            testID="bioMd"
            style={styles.item}
            onPress={() => this.onPressBio()}
            disabled={this.state.isVideoPictureLoading}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.title}>{translate("bio")}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: 200 }}>
              <Text style={{ paddingHorizontal: Scale(20), color: '#B0B0B2' }}>{this.state.userDetails?.data?.attributes?.bio || translate("Add_a_bio_to_your_profile")}</Text>
              {this.leftArrowImage()}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  // Customizable Area Start
  modalHeader = () => {
    return (
      <Modal animationType="slide"
            transparent visible={this.state.isModalVisible}
            presentationStyle="overFullScreen"
      >
        <View style={styles.viewWrapper}>
            <View style={styles.modalView}>
                <TextInput testID="inputMd" placeholder={this.state.modalType == 'name' ? translate("name") : this.state.modalType == 'username' ? translate("userName") : translate("bio")}
                    value={this.state.modalType == 'name' ? this.state.inputValueName : this.state.modalType == 'username' ? this.state.inputValueUsername : this.state.inputValueBio} style={[styles.textInput,this.state.language == "ar" && styles.rightAlign]}
                    onChangeText={(value) => this.handleChange(value)}
                    maxLength={this.state.modalType == 'name' ? 30 : this.state.modalType == 'username' ? 30 : 180}

              />
                 <View style={{display:'flex', flexDirection:'row', marginVertical: Scale(10)}}>
                    <CustomButton testID="close" title={translate("close")} style={{marginRight: Scale(10)}} onPress={()=>this.toggleModalVisibility()} />
                    <CustomButton testID="save" title={translate("save")} onPress={()=>{this.state.inputValueName.trim().length != 0 && this.updateContent()}} />
                 </View>
            </View>
        </View>
    </Modal>);
  };
  // Customizable Area End
  render() {
    // Customizable Area Start
    if(this.state.isLoading){
      return (
        <SafeAreaView style={styles.loading_container}>
          <ActivityIndicator />
        </SafeAreaView>
      )
    }
    // Customizable Area End
    return (
      <View style={styles.container}>
        <SafeAreaView>
          {/* Customizable Area Start */}
          {this.topHeaderSettings()}
          {this.item()}
          {this.modalHeader()}
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
    width:"100%",
    maxWidth: 650,
  },
  headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    paddingHorizontal: Scale(15),
    height: Scale(40),
    width: '100%',
  },
  headerText: {
    fontSize:Scale(18),
    fontWeight:'bold'
  },
  loading_container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
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
    fontWeight: '600',
    textAlign: "left",
    marginVertical: 8,
    marginHorizontal:14
  },
  imageContainer: {
    width: Scale(80),
    height: Scale(80),
  },
  bottom: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  top: {
    position: 'absolute',
    left:'30%',
    top:'35%',
    opacity: 1,
    width: '100%',
    height: '100%'
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
      alignItems: "center",
      justifyContent: "center",
      elevation: 5,
      height: 160,
      width: width * 0.8,
      backgroundColor: "#fff",
      borderRadius: 8,
      borderColor: '#FFC925',
      borderWidth: .5
  },
  textInput: {
      width: "80%",
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderColor: "rgba(0, 0, 0, 0.2)",
      borderWidth: 1,
      marginVertical: Scale(15),
  },
  rightAlign:{
    textAlign:"right"
  },
  imgrightView:{
    height: Scale(13),
    width: Scale(13),
    position:"absolute",
    right:0

  },
  imgLeftView:{
    height: Scale(20),
    width: Scale(20),

  },
  golaviView:{
    display:'flex',
    flexDirection:'row',
    position:"absolute",
    alignItems:'center',
  },
  golaviImg:{
    width:Scale(15),
     height:Scale(15),
     resizeMode: "contain",
     position:"absolute",
    }
});
// Customizable Area End
