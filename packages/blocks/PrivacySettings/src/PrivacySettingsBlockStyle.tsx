// Customizable Area Start
import { StyleSheet, Platform , Dimensions } from "react-native";
import Scale from "../../../components/src/Scale";
let screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor:"#fff"
  },
  headercontainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Scale(14),
    height: Scale(40),
    width: "100%"
  },
  headerText: {
    fontSize: Scale(18),
    fontWeight: "bold",
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
    resizeMode:"contain"
  },
 
  imgrightView:{
    height: Scale(13),
    width: Scale(13),
  },
  imgLeftView:{
    height: Scale(20),
    width: Scale(20),
  },
  divider: {
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: Scale(5)
  },
  title: {
    fontSize: Scale(16),
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    marginVertical: 8,
    marginHorizontal: 14
  },
  greytext:{
    color:"grey"
  }
});

// Customizable Area End
