import { StyleSheet , Dimensions } from "react-native";
import Scale from "../../../components/src/Scale";
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },

  lineStyle: {
    width: 1,
    height: Scale(20),
    backgroundColor: "#ffffffAA"
  },

  videoPlayerButton: {
    position: "absolute",
    top: Scale(0),
    bottom: Scale(0),
    left: Scale(0),
    right: Scale(0),
    zIndex: 100
  },
  video_style: {
    position: "absolute",
    top: Scale(0),
    bottom: Scale(0),
    left: Scale(0),
    right: Scale(0)
  },
  headerContainer: {
    // top: 0,
    // position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Scale(500),
    alignItems: "center"
    //marginTop: Scale(10),
  },
  headerText: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: "100%"
  },
  headerTextfor: {
    color: "white"
  },
  liveicon: {
    width: Scale(40),
    height: Scale(40)
  },
  headerTextfont: {
    fontStyle: "normal",
    fontSize: Scale(16),
    fontWeight: "800",
    color: "#ffffffAA",
    marginHorizontal: Scale(20)
  },

  modalContainer: {
    backgroundColor: "#00000040",
    // backgroundColor: "#000000aa",
    flex: 1,
    justifyContent: "flex-end"
  },

  modalView: {
    backgroundColor: "white",
    // height: "60%",
    height: Scale(500),
    // flex: 0.6,
    // width: "100%",
    borderRadius: 50
  },

  shareContainer: {
    backgroundColor: "white",
    // flex: 0.5,
    height: "28%",
    justifyContent: "center"
  },

  modal_sendText: {
    textAlign: "center",
    fontSize: Scale(15),
    marginTop: Scale(10)
  },
  image_content: {
    marginTop: Scale(10),
    flexDirection: "row"
  },
  sendToimage_content: {
    marginTop: Scale(10),
    flexDirection: "row",
    marginLeft: Scale(15)
  },
  image_someone_style: {
    width: Scale(50),
    height: Scale(50)
  },
  SMSimage_someone_style: {
    width: Scale(50),
    height: Scale(50),
    resizeMode: "contain"
  },
  copylink_style: {
    width: Scale(42),
    height: Scale(42),
    resizeMode: "contain"
  },
  share_iconName: {
    fontSize: Scale(13)
  },

  button_socialcontainer: {
    height: Scale(90),
    alignItems: "center",
    marginHorizontal: Scale(10),
    justifyContent: "center"
  },
  button_copyLink: {
    height: Scale(90),
    alignItems: "center",
    marginHorizontal: Scale(10),
    justifyContent: "center"
  },
  image_Text: {
    fontSize: Scale(13),
    textAlign: "center"
  },

  imagebox: {
    width: Scale(70),
    alignItems: "center"
  },
  download_image: {
    width: 50,
    height: 50
  },
  text_download: {
    marginTop: 10,
    width: Scale(65),
    textAlign: "center",
    fontSize: Scale(13)
  },

  downloadBox: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  downloadcontainer: {
    borderTopWidth: Scale(2),
    borderTopColor: "#EEEEEE",
    height: "28%",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center"
  },
  sharecontainer: {
    height: "28%",
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    borderTopEndRadius: Scale(15),
    borderTopLeftRadius: Scale(15)
  },
  button: {
    width: Scale(200),
    height: Scale(45),
    backgroundColor: "#FACC1E",
    borderRadius: Scale(50),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },

  btncontainer: {
    borderTopWidth: Scale(2),
    borderTopColor: "#EEEEEE",
    backgroundColor: "#F1F1F1",
    height: "16%",
    justifyContent: "center"
  },

  btnText: {
    fontSize: Scale(20),
    fontWeight: "bold",
    color: "black"
  },

  // comment Style
  comment_ModalView: {
    backgroundColor: "white",
    height: "60%",
    width: "100%"
  },

  textline: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  comment_header_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: Scale(15),
    alignItems: "center"
  },
  number_of_comment: {
    fontSize: Scale(17)
  },
  commentText: {
    fontWeight: "500"
  },
  // bottomheader style
  uicontainer: {
    // right: 0,
    // height: "94%",
    // justifyContent: "flex-end",
    // position: "absolute",
  },

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  bottomTextname: {
    color: "#fff",
    fontSize: Scale(16),
    fontWeight: "600",
    marginBottom: Scale(10)
  },
  bottomTextdiscription: {
    color: "#fff",
    fontSize: Scale(16),
    fontWeight: "300",
    marginBottom: Scale(5),
    width: Scale(300)
    // height:Scale(50),
  },
  musicalnotes_style: {
    tintColor: "white",
    width: Scale(25),
    height: Scale(25)
  },
  songRow: {
    flexDirection: "row",
   // alignItems: "center",
   // position:"absolute",
   bottom:0,

  },
  songName: {
    color: "#fff",
    fontSize: Scale(16),
    left: Scale(5)
  },
  songImage: {
    width: Scale(40),
    height: Scale(40)
  },
  rightContainer: {
    alignSelf: "flex-end",
    height: Scale(300),
    justifyContent: "space-around"

    // marginTop:Scale(400)
  },

  profileImage: {
    width: Scale(40),
    height: Scale(40)
  },
  footerProfileImage: {
    width: Scale(45),
    height: Scale(45)
  },
  profileiconImage: {
    tintColor: "white",
    width: Scale(38),
    height: Scale(38)
  },
  profileCommenticoniconImage: {
    tintColor: "white",
    width: Scale(35),
    height: Scale(35)
  },
  profileShareiconImage: {
    tintColor: "white",
    width: Scale(30),
    height: Scale(30)
  },
  profileWhitehearticonImage: {
    tintColor: "white",
    width: Scale(40),
    height: Scale(40)
  },
  profileRedhearticonImage: {
    tintColor: "red",
    width: Scale(40),
    height: Scale(40),
  },
  stateLabel: {
    color: "#fff",
    fontSize: Scale(16),
    fontWeight: "600",
    marginTop: Scale(5)
  },
  iconContainer: {
    alignItems: "center",
    width: Scale(40),
    height: Scale(40)
  },
  redIconContainer: {
    alignItems: "center",
    width: Scale(20),
    height: Scale(20),
  },

  image_profile: {
    width: Scale(40),
    height: Scale(40),
  },
  arrow_style: {
    width: Scale(20),
    height: Scale(20),
    tintColor: "#c4c0c0"
  },
  uparrow_style: {
    width: Scale(18),
    height: Scale(55),
    justifyContent: "center",
    alignItems: "center"
  },
  like_style: {
    width: Scale(18),
    height: Scale(20),
    tintColor: "#c4c0c0"
  },

  dislikearrow_style: {
    width: Scale(18),
    height: Scale(20),
    tintColor: "#c4c0c0"
  },
  ratingText: {
    color: "#c4c0c0",
    fontWeight: "400",
    fontSize: Scale(12),
    width: Scale(30),
    textAlign: "center",
    right: Scale(5)
  },
  ratingContainer: {
    width: Scale(18),
    height: Scale(50)
  },

  profileText: {
    left: Scale(7)
  },
  profileRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Scale(10),
    alignItems: "center",
    marginBottom: Scale(20)
  },
  rowProfile: {
    flexDirection: "row"
  },
  profileTextName: {
    color: "#c4c0c0"
  },
  profileTextChat: {
    fontSize: Scale(16),
    marginTop: Scale(6)
  },
  replaceText: {
    color: "#c4c0c0"
  },
  replaceRow: {
    flexDirection: "row",
    marginTop: Scale(13)
  },
  replacearrowimage: {
    tintColor: "#c4c0c0",
    width: Scale(20),
    height: Scale(20)
  },
  inputimage: {
    width: Scale(30),
    height: Scale(30)
  },
  imageRowBox: {
    flexDirection: "row",
    width: Scale(80),
    justifyContent: "space-between",
    right: Scale(10)
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    height: Scale(60),
    justifyContent: "space-between",
    backgroundColor: "#F1F1F3",
    bottom: Scale(0)
  },
  textinput: {
    padding: Scale(10),
    width: Scale(300),
    height: Scale(40),
    alignSelf: "center",
    fontSize: Scale(17)
  },
  onelineuparrow: {
    tintColor: "white",
    width: Scale(25),
    height: Scale(15),

  },
  onelineuparrow_box: {
    width: Scale(40),
    height: Scale(40),
    borderRadius: Scale(50),
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",

  },
  typeinputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    height: Scale(60),
    justifyContent: "space-between",
    backgroundColor: "white",
    position: "absolute",
    bottom: Scale(0),
  },
  typeinputTextbox: {
    flexDirection: "row",
    width: Scale(320),
    backgroundColor: "#F1F1F3",
    // justifyContent:'center',
    alignItems: "center",
    borderRadius: Scale(10),
    height: Scale(50),
  },
  typeimageRowBox: {
    flexDirection: "row",
    width: Scale(70),
    justifyContent: "space-between",
  },
  typetextinput: {
    padding: Scale(10),
    width: Scale(250),
    height: Scale(40),
    alignSelf: "center",
    fontSize: Scale(17),

  },
  nodata: {
    justifyContent: "center",
    alignItems: "center"
  },

  cameraOverlapContainer: {
    position: "absolute",
  //  width: screenWidth,
   // height: screenHeight - Scale(60),
    justifyContent: "space-between",
    paddingBottom: Scale(50),
    bottom:0
  },
  sideOptionsContainer: {
    width: screenWidth / 1,
   // height: Scale(250),
    justifyContent: "space-between",
    paddingLeft: Scale(10),
    paddingRight: Scale(20),
  },
  reelsOptionBtn: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: Scale(250),
    width: Scale(40),
    alignSelf: "flex-end"
  },
  optionBtnTextContainer: {
    paddingHorizontal: 12,
    alignItems: "center"
  },
  optinBtnText: {
    color: "white",
    fontSize: 15
  },
  camerabottom: {
    flexDirection: "row",
    justifyContent:'space-between',
   // alignItems:'center',
   // width:Scale(300),
    position:"absolute",
    bottom:50,

  },
  header: {
    paddingVertical: Scale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Scale(20),
    //position:"absolute"
  },
  commentListContainerStyle: {
    flex: 1
  },
  horizontalCommentText: {
    flexDirection: "row"
  }
});
