import React from "react";

// Customizable Area Start
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    FlatList
} from "react-native";
import { SearchBar } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomButton from "../../../components/src/Custombutton";
import FOND from "../../../components/src/Fonts/Fonts";
import Scale from "../../../components/src/Scale";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import { avatar, empty } from "./assets";
let screenWidth = Dimensions.get("window").width;
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import CfGroupLiveController, {
    Props
} from "./CfGroupLiveController";

export default class CfSoloLive extends CfGroupLiveController {
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
    invitationModel=()=>{
        return(
          <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.invitationModel}
          onRequestClose={() => {
            this.setState({ invitationModel: false });
          }}
        >
         <TouchableWithoutFeedback onPress={()=>{
            this.setState({ invitationModel: false });
          }}>
         <View style={styles.modalContainer}> 
          <View style={styles.modalListContainer}>
              <View style={[styles.modalHeader]}>
               <Text style={styles.headerText}>Invite to join</Text>
              </View>
              <View style={{minHeight:Scale(300) }}>
             <View style={styles.searchContainer}>
                <SearchBar
                platform="default"
                placeholder={"Search"}
                searchIcon={<AntDesign name="search1" size={20} />}
                onFocus={() => {}}
                onChangeText={text => {
                    this.setState({
                        value: text,
                       // loader:true,
                      });
                }}
                onSubmitEditing={() => {}}
                onCancel ={() => {}}
                autoCorrect={false}
                value={this.state.value}
                containerStyle={styles.searchContainerStyle}
                inputContainerStyle={styles.searchInputStyle}
                />
                </View>
               
                {
              this.state.loader && <View style={[styles.searchContainer,{flex:1}]}>
                  <ActivityIndicator size="large" color="black" />
                  </View>
              }
             
              {
                (this.state.recentsearch)?(
                    <View style={{paddingHorizontal:Scale(20)}}>
                    <Text style={styles.normalText}>When someone joins,anyone who can see there live videos can also watch this one</Text>
                    <Text style={[styles.headerText,{marginVertical:Scale(10)}]}>Suggested</Text>
                    <FlatList
                    data={this.state.searchresult}
                    renderItem={(item) => {
                    return(
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingVertical:Scale(5),}}>
                      <View style={{flexDirection:"row"}}> 
                        <Image source={avatar} style={styles.profileimg} />
                        <View style={{marginLeft:Scale(10)}}>
                            <Text style={styles.nameText}>Genious_man1</Text>
                            <Text style={styles.normalText}>Genious_man2</Text>
                        </View>
                    </View>
                    <CustomButton title={"invite"} style={{  borderRadius: 10,}} TextStyle={{color:"black"}}  onPress={() => {}} />
     
                    </View>
                    )}}
                    keyExtractor={item => item.id}
                    />
                    </View>
                ):(
                    this.state.searchresult.length==0?<View  style={[styles.searchContainer,{flex:1}]}>
                    <Image source={empty} style={styles.emptyimg} />
                    <Text style={styles.headerText}>No search result found</Text>
                </View>:<FlatList
                    data={this.state.searchresult}
                    renderItem={(item) => {
                    return(
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingVertical:Scale(5),paddingHorizontal:Scale(20)}}>
                      <View style={{flexDirection:"row"}}> 
                        <Image source={avatar} style={styles.profileimg} />
                        <View style={{marginLeft:Scale(10)}}>
                            <Text style={styles.nameText}>Genious_man1</Text>
                            <Text style={styles.normalText}>Genious_man2</Text>
                        </View>
                    </View>
                    <CustomButton title={"invite"} style={{  borderRadius: 10,}} TextStyle={{color:"black"}}  onPress={() => {}} />
                    </View>
                    )}}
                    keyExtractor={item => item.id}
                    />
                )
               
                }
           
              </View>
          </View>
          </View> 
          </TouchableWithoutFeedback>
        </Modal>
        )
      }
    // Customizable Area End

    render() {
        // Customizable Area Start
        // Merge Engine - render - Start
        return (
            <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
                 {this.invitationModel()}
                <View style={styles.imgView}>
                    <Image source={require('../assets/selfie.jpg')} style={styles.imageProp} />
                    <View style={styles.liveandview}>
                        <View style={styles.imgText}>
                            <Text style={styles.liveText}>Live</Text>
                        </View>
                        <View>
                            <Text> | </Text>
                        </View>
                        <View style={styles.eyeIconBack}>
                            <Image source={require('../assets/Show.png')} style={styles.eyeIcon} />
                            <Text style={styles.textLive}>1.2 K</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.messageBox}>
                    <TextInput style={styles.textInput} placeholder="Comment" placeholderTextColor="#eee" />
                    <Image source={require('../assets/Messanger.png')} style={styles.sendIcon} />
                    <TouchableOpacity testID="profileTouch"  onPress={() => {
                        this.setState({ invitationModel:true})
                    }}>
                    <Image source={require('../assets/person.png')} style={styles.profileIcon} />
                    </TouchableOpacity>
                </View>
               
            </ScrollView>
        );
        // Merge Engine - render - End
        // Customizable Area End
    }
}

const dimension = Dimensions.get('window');
// Customizable Area Start
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        marginLeft: "auto",
        marginRight: "auto",
        width: Platform.OS === "web" ? "75%" : "100%",
        // maxWidth: 650,
        backgroundColor: "#000",
        flexDirection: 'column'
    },
    imgView: {
        flex: 1,
        position: "relative"
    },
    imageProp: {
        width: 'auto',
        resizeMode: 'cover',
        height: Platform.OS === "ios" ? dimension.height / 1.2 : dimension.height / 1.1 ,
        borderRadius: 10,
    },
    messageBox: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
    },
    textInput: {
        height: 50,
        width: dimension.width / 1.5,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 50,
        margin: 10,
        paddingLeft: 10,
        color: "#fff"
    },
    imgText: {
        backgroundColor: "#000",
        borderRadius: 5,
    },
    liveText: {
        color: '#fff',
        paddingLeft: 8,
        paddingRight: 8,
        padding: 5,
        fontSize: 10,
        fontWeight: '600'
    },
    eyeIcon: {
        height: 20,
        width: 20
    },
    liveandview: {
        position: "absolute",
        alignSelf: "center",
        marginTop: 10,
        display: "flex",
        flexDirection: "row"
    },
    eyeIconBack: {
        backgroundColor: "#eee",
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 3,
        paddingRight: 3,
    },
    textLive: {
        fontSize: 12,
    },
    sendIcon: {
        height: 30,
        width: 30
    },
    profileIcon: {
        height: 30,
        width: 30
    },
    modalContainer:{
        flex: 1,
        
      },
    modalListContainer: {
        position: 'absolute',
        bottom: 0,
        width: screenWidth,
        borderTopRightRadius: Scale(20),
        borderTopLeftRadius: Scale(20),
        backgroundColor: 'rgb(255, 255, 255)',
        maxHeight: Scale(500),
       
      },
      modalHeader: {
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       padding: Scale(20),
      borderBottomColor:"grey",
      borderBottomWidth:1
       // marginVertical: Scale(10),
      },
      headerText:{
        fontFamily:FOND.MontserratSemiBold,
        fontSize:Scale(20)
      },
      searchContainer:{
        justifyContent:"center",
        alignItems:"center"
      },
      searchContainerStyle: {
        marginTop: 10,
        width: '95%',
        backgroundColor: "transparent",
        padding: 0,
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
        marginBottom: deviceBasedDynamicDimension(20, false, 1),
        borderRadius: 0,
        paddingHorizontal:Scale(10)
      },
      searchInputStyle: {
        backgroundColor: "#EEEEEE",
        height: deviceBasedDynamicDimension(45, true , 1),
      },
      emptyimg:{
        width:Scale(80),
        height:Scale(80)
      },
      profileimg:{
        width:Scale(40),
        height:Scale(40)
      },
      normalText:{
        fontFamily:FOND.MontserratRegular,
        fontSize:Scale(10)
      },
      nameText:{
        fontFamily:FOND.MontserratSemiBold,
        fontSize:Scale(12)
      }
});
// Customizable Area End
