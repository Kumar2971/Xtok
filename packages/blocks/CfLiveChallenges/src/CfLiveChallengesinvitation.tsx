import React from "react";

// Customizable Area Start
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

import FONTS from '../../../components/src/Fonts/Fonts';
import { Gradient, TikTokCoinIcon,accept, avatarempty, backArrow, reject, imgRightArrow } from "./assets";
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
import { translate } from "../../../components/src/i18n/translate";

// Merge Engine - import assets - Startr
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
let prevOpenedRow:any;
let row: Array<any> = [];

// Customizable Area End

import Scale from "../../../components/src/Scale";
import CfLiveChallengesinvitationController, {
  Props
} from "./CfLiveChallengesinvitationController";

export default class CfLiveChallengesinvitation extends CfLiveChallengesinvitationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  header=()=>{
    const {language} = this.state;
    return(<View style={styles.header}>
            <TouchableOpacity testID="btnGoBack" onPress={() => this.props.navigation.navigate("Comments")}>
            <Image source={language == "ar" ? imgRightArrow : backArrow} style={styles.backarrowStyle} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{translate("incoming_live_request")}</Text>
          <View/>
          </View>)
  }
  participants=()=>{
    return(
      <View>
             {(this.state.participantscount==1?(
              <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:'center',marginHorizontal:Scale(50),marginBottom:Scale(30)}}>

              {/* <View style={{}}>
              <View style={{justifyContent:"space-between",alignItems:"center",}}>
                  <Image source={avatarempty} style={styles.participantsstyle} />
                  <Text style={styles.nametext}>queen_flowers</Text>
                  </View>
              </View>
              <View style={{flexDirection:"row",}}>
              <View style={{justifyContent:"space-between",alignItems:"center",}}>
              <View style={[styles.participantsstyle,{backgroundColor:"grey"}]} />
                  <Text style={styles.nametext}>You</Text>
                  </View>
              </View> */}
            </View>
           ):(
            this.state.participantscount==2?(
              <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:'center',marginHorizontal:Scale(50),marginBottom:Scale(30)}}>

              <View style={{flexDirection:"row",}}>
              <View style={{justifyContent:"space-between",alignItems:"center",}}>
              <View style={[styles.participantsstyle,{backgroundColor:"grey"}]} />
                  <Text style={styles.nametext}>You</Text>
                  </View>
                  <View style={{justifyContent:"space-between",alignItems:"center",}}>
                  <Image source={avatarempty} style={styles.participantsstyle} />
                  <Text style={styles.nametext}>queen_flowers</Text>
                  </View>
              </View>
             <View style={{flexDirection:"row",}}>
             <View style={{justifyContent:"space-between",alignItems:"center",}}>
                  <Image source={avatarempty} style={styles.participantsstyle} />
                  <Text style={styles.nametext}>queen_flowers</Text>
                  </View>
                  <View style={{justifyContent:"space-between",alignItems:"center",}}>
                  <Image source={avatarempty} style={styles.participantsstyle} />
                  <Text style={styles.nametext}>queen_flowers</Text>
                  </View>
              </View>
            </View>
            ):(
              <View>

              <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:'center',marginHorizontal:Scale(50)}}>

              <View style={{flexDirection:"row",}}>
              <View style={{justifyContent:"space-between",alignItems:"center",}}>
                  <Image source={avatarempty} style={styles.participantsstyle} />
                  <Text style={styles.nametext}>queen_flowers</Text>
                  </View>
                  <View style={{justifyContent:"space-between",alignItems:"center",}}>
                  <Image source={avatarempty} style={styles.participantsstyle} />
                  <Text style={styles.nametext}>queen_flowers</Text>
                  </View>
              </View>
             <View style={{flexDirection:"row",}}>
             <View style={{justifyContent:"space-between",alignItems:"center",}}>
                  <Image source={avatarempty} style={styles.participantsstyle} />
                  <Text style={styles.nametext}>queen_flowers</Text>
                  </View>
                  <View style={{justifyContent:"space-between",alignItems:"center",}}>
                  <Image source={avatarempty} style={styles.participantsstyle} />
                  <Text style={styles.nametext}>queen_flowers</Text>
                  </View>
              </View>

              </View>
              <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginHorizontal:Scale(75)}}>
                 <View style={{justifyContent:"space-between",alignItems:"center",}}>
                  <View style={[styles.participantsstyle,{backgroundColor:"grey"}]} />
                  <Text style={styles.nametext}>You</Text>
                  </View>
                  <View style={{justifyContent:"space-between",alignItems:"center",}}>
                  <View style={[styles.participantsstyle,{backgroundColor:"grey"}]} />
                  <Text style={styles.nametext}>someone</Text>
                  </View>
               </View>
            </View>
            )
           ))}

          </View>
    )
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <View  style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <ImageBackground source={Gradient} style={styles.backgroundImage}>
          <View style={styles.subContainer}>
            {this.header()}
            </View>
            <View style={styles.headercontainer}>
              <Text style={styles.RequesterText}>queen_flowers</Text>
              <Image source={avatarempty} style={[styles.profileImage]} />
            </View>

           {this.participants()}
           <View style={styles.headercontainer}>
              <Text style={styles.RequesterText}>{ this.state.participantscount==1?"Group Live":this.state.participantscount==2? translate("v2_Challenge") : translate("v3_Challenge")}</Text>
            </View>
          {(  this.state.participantscount==1)?(
             <View style={{height:"5%",justifyContent:"space-between",alignItems:"center",paddingHorizontal:16}}>
             <View style={{flexDirection:"row"}}>
             <Image source={TikTokCoinIcon} style={[styles.profileImageparticipants]} />
             <Image source={TikTokCoinIcon} style={[[styles.profileImageparticipants,{marginLeft:-10}]]} />
             <Image source={TikTokCoinIcon} style={[[styles.profileImageparticipants,{marginLeft:-10}]]} />
             </View>
             <View>
               <Text  style={[styles.normaltext]}>21.9k {translate("")}</Text>
             </View>

           </View>
          ):(
             <View style={{height:"5%",justifyContent:"space-between",alignItems:"center",flexDirection:"row",paddingHorizontal:16}}>
             <View style={{flexDirection:"row"}}>
             <Image source={TikTokCoinIcon} style={[styles.profileImageparticipants]} />
             <Image source={TikTokCoinIcon} style={[[styles.profileImageparticipants,{marginLeft:-10}]]} />
             <Image source={TikTokCoinIcon} style={[[styles.profileImageparticipants,{marginLeft:-10}]]} />
             </View>
             <View>
               <Text  style={[styles.normaltext]}>21.9{translate("k")}{" "}{translate("participants")}</Text>
             </View>
             <View style={{flexDirection:"row"}}>
             <Image source={TikTokCoinIcon} style={[styles.profileImageparticipants,{marginRight:-10}]} />
             <Image source={TikTokCoinIcon} style={[[styles.profileImageparticipants,{marginRight:-10}]]} />
             <Image source={TikTokCoinIcon} style={[[styles.profileImageparticipants,]]} />
             </View>
           </View>
          )}

              <View style={{ bottom:30,position:"absolute",right:0,left:0}}>
                <View style={{justifyContent:"center",alignItems:"center",flexDirection:this.state.language=="ar"?"row-reverse":"row"}}>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate("CfLiveChallenges")}>
                  <Image source={accept} style={[styles.buttonimage]} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>  this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTabScreen' }],
    })}>
                  <Image source={reject} style={[styles.buttonimage]} />
                  </TouchableOpacity>
                </View>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
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
    backgroundColor: "#ffffffff",
  },
  headercontainer:{justifyContent:"center",alignItems:"center",marginVertical:Scale(20)},
  subContainer: {
    marginTop:40,
    paddingHorizontal: 16,
   // height: Dimensions.get("window").height - 50
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
  rankdataContainer:{
    width:"25%",
    backgroundColor:'#FFE9A4',
    borderWidth: 1,
    borderColor: '#FFC925',
    padding: Scale(5),
    borderRadius: Scale(10),
    marginVertical: Scale(5),
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",

  },
  addfrendsContainer:{
    width:"55%",
    backgroundColor:'white',
    borderWidth: 1,
    borderColor: '#FFC925',
    padding: Scale(5),
    borderRadius: Scale(10),
    marginVertical: Scale(5),

    flexDirection:"row"
  },
  streamItemcontainer:{backgroundColor:"grey",borderBottomWidth:1},
  normaltext:{
    fontFamily:FONTS.MontserratRegular,
    fontSize:Scale(12)
  },
  nametext:{
    fontFamily:FONTS.MontserratRegular,
    fontSize:Scale(7)
  },
  scoreText:{
    fontFamily:FONTS.MontserratBold
  },
  profileImage: {
    width: Scale(200),
    height: Scale(200),
    borderRadius:Scale(20),
    marginVertical:Scale(20),
    // borderWidth:1,borderColor:"white",
    // backgroundColor:"white",
  },
  participantsstyle:{
    width: Scale(50),
    height: Scale(50),
    borderRadius:Scale(50),
    margin:Scale(5)
  },
  participantsstyle3:{
    width: Scale(50),
    height: Scale(50),
    borderRadius:Scale(50),

  },
  profileImageparticipants:{
    width: Scale(20),
    height: Scale(20),
    borderRadius:Scale(20),
  },
  buttonimage:{
    width: Scale(70),
    height: Scale(70),
    margin:Scale(10)
  },
  backTextWhite: {
    color: '#FFF',
},
rowFront: {
    alignItems: 'center',
   // backgroundColor: '#CCC',

  //  borderBottomColor: 'black',
   // borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
},
rowBack: {
    alignItems: 'center',
   // backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
   // paddingLeft: 15,
},
backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
},
backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
},
backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
},
backBtnLeft: {
  backgroundColor: 'red',
  alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
 left: 25,
},
backgroundImage:{
  flex: 1,
  resizeMode: 'cover', // or 'stretch'
},
backgroundImagemessage:{
 // flex: 1,
  resizeMode:   'stretch'
},
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  headerBoxes1:{
    display:'flex',
    flexDirection:'row',
    alignItems:'flex-start',
    flex:2
  },
  headerBoxes:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  headerAlignBoxes:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  subLinesBoxes:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    width:120,
    paddingHorizontal:5
  },
  boxBorder1:{
    borderColor:'black',
    borderWidth:1,
    borderRadius:3,
  },
  boxBorder2:{
    borderColor:'black',
    borderWidth:1,
    borderRadius:15
  },
  gobackIcons:{
    width: 20,
    height:20
  },
  imageDimensions:{
    width: 30,
    height:30,
    resizeMode:'contain'
  },
  imageDimensions1:{
    width: 10,
    height:10,
    marginRight:2,
    resizeMode:'contain'
  },
  imageDimensions2:{
    width: 25,
    height:25,
    resizeMode:'contain'
  },
  imageDimensionsShape:{
    width: 10,
    height:10,
    resizeMode:'contain'
  },
  imageDimensions3: {
    width: 15,
    height: 15,
    marginTop:4,
    resizeMode:'contain'
  },
  imageDimensions4: {
    width: 30,
    height: 30,
    resizeMode:'contain'
  },
  input: {
    width: 180
  },
  bottomBar: {
    backgroundColor:'black',
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    paddingTop:10,
    paddingBottom:20
  },
  subBottomBar: {
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  inputFieldContainer: {
    backgroundColor:'white',
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    width:'80%',
    borderRadius: 10,
    justifyContent:'space-evenly'
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Scale(20),
    marginVertical: Scale(10),
  },
  line: {
		height: Scale(1),
		width: Scale(343),
		backgroundColor: 'black',
		marginLeft: Scale(16),

	},
  tabview: {
		flexDirection: 'row',
		backgroundColor:"red",
	//	marginTop: Scale(16)

	},
  tabheadding:{
   marginRight:Scale(10)
  },
  tabheadtext:{
    fontFamily:FONTS.MontserratRegular,
    fontSize:Scale(15)
  },
 stickerText:{
    fontFamily:FONTS.MontserratBold,
    fontSize:Scale(10)
  },
  header:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    paddingHorizontal: Scale(15),
    height: Scale(40),
    width: '100%',
    //borderBottomColor: "#B7BBC0",
   // borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  backarrowStyle:{
    width: Scale(20),
    height: Scale(18),
    resizeMode: "contain",
    },
    headerText:{
      fontSize: Scale(16),
     fontFamily:FONTS.MontserratSemiBold
    },
    RequesterText:{
      fontSize: Scale(28),
      fontFamily:FONTS.MontserratExtraBold
    },

});
// Customizable Area End
