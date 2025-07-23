import { StyleSheet } from "react-native";
import Scale from "../../../components/src/Scale";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFFF'
  },
  headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    paddingHorizontal: Scale(15),
    height:Scale(40),
    width: '100%',    
  },
  headerText: {
    fontSize:Scale(18),
    fontWeight:'500'
   
  },
  backarrow_stylebtn:{
    width: Scale(25),
    height: Scale(25),
    justifyContent:'center',
    alignItems:'center',
  },
  backarrow_style: {
    width: Scale(18),
    height: Scale(20),
    
  },
  menuEllipsis_styles: {
    width: Scale(22),
    height: Scale(12),
  },
  profile_image:{
    width:Scale(80),
    height:Scale(80)
  },
  profileContainer:{
    alignItems:'center',
    marginTop:Scale(20)

  },
  ratingcontainer:{
flexDirection:'row',
width:Scale(200),
justifyContent:'space-between',
marginTop:Scale(10)

  },
  ratingtextnumber:{
    fontSize:Scale(15),
    fontWeight:"500",
    textAlign:'center'
  },
  ratingtext:{
fontSize:Scale(12),
fontWeight:'700',
color:'#D0D0D0'
  },
  profileName_style:{
marginTop:Scale(10),
fontWeight:'600',
fontSize:Scale(17)
  },
  droupDown:{
    width:Scale(30),
    height:Scale(30)
  },
  buttonBackground_style:{
    width:Scale(150),
    height:Scale(30),
    justifyContent:'center',
    alignItems:'center',
   
  },
  buttonContainer_style:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:Scale(181),
    marginTop:Scale(20)
  },
  followButtonText_style:{
    color:'#ffff',
  },
  textfollowMessage:{
    marginTop:Scale(15),
    fontSize:Scale(13),
    fontWeight:'400'
  },
  buttonboxContainer:{
    width:Scale(150),
    height:Scale(30),
    borderColor:'#FFD74C',
    borderWidth:Scale(2),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FFD74C',
  },
  toggleContainer_Style:{
    borderColor:'#F2F2F2',
    borderTopWidth:Scale(2),
    borderBottomWidth:Scale(2),
    borderLeftWidth:0,
    borderRightWidth:0,
    width:'100%',
    height:Scale(40), 
    justifyContent:'center',
    alignSelf:'center',
    marginTop:Scale(20)

  },
  toggleheart_Style:{
    width:Scale(35),
    height:Scale(35)
  },
  toggleBoxImage_Style:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  privaiteAccount_style:{
    width:Scale(70),
    height:Scale(70)
  },
  privaiteAccountContainer:{
   alignItems:'center',
   marginTop:Scale(100)

  },
  privaiteAccountText_Style:{
    fontSize:Scale(15),
    fontWeight:'600',
    marginTop:Scale(15)
  },
  followText_style:{
    marginTop:Scale(10),
    fontSize:Scale(13)
  },
  
  comment_ModalView: {
    backgroundColor: "white",
    marginTop: Scale(180),
    paddingBottom: Scale(40),
    borderTopEndRadius: Scale(40),
    borderTopLeftRadius: Scale(40)
  },
modalContainer: {
    backgroundColor: "#000000aa",
    flex: 1,
    justifyContent:"flex-end",
  },
  rowTextimage_style:{
    flexDirection:'row',
    marginTop:Scale(30),
    left:Scale(20)

  },
  image_style:{
    width:Scale(25),
    height:Scale(25)
  },
  imageBlock_style:{
    width:Scale(60),
    height:Scale(60)
  },
  textuser_style:{
    left:Scale(20),
    color:'red', 
    fontSize:Scale(18),
    fontWeight:'400'
  },
  textuserblack_style:{
    left:Scale(20),
    fontSize:Scale(18),
    fontWeight:'400'
   
  }

});
