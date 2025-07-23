// Customizable Area Start
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
  View,
  Modal,
  Text,
  Image,
  FlatList
} from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
import React from "react";
import LiveStreamingController, { Props } from "./LiveStreamingController";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
let screenWidth = Dimensions.get("window").width;
import Scale from "../../../components/src/Scale";
import FONT from "../../../components/src/Fonts/Fonts";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
import CustomButton from "../../../components/src/Custombutton";
import { empty } from "../../CfGroupLive/src/assets";
import { avatar } from "./assets";

// Customizable Area End

export default class LiveStreaming extends LiveStreamingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", () => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width,
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  invitationModel = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.invitationModel}
        onRequestClose={() => {
          this.setState({ invitationModel: false });
        }}
      >
        <TouchableWithoutFeedback onPress={() => {
          this.setState({ invitationModel: false });
        }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalListContainer}>
              <View style={[styles.modalHeader]}>
                <Text style={styles.headerText}>Request to join</Text>
              </View>
              <View style={{ minHeight: Scale(300) }}>


                {
                  this.state.loader && <View style={[styles.searchContainer, { flex: 1 }]}>
                    <ActivityIndicator size="large" color="black" />
                  </View>
                }

                {
                  (
                    this.state.invitationData.length == 0 ? <View style={[styles.searchContainer, { flex: 1 }]}>
                      <Image source={empty} style={styles.emptyimg} />
                      <Text style={styles.headerText}>You have no request</Text>
                    </View> :
                      <View style={{ paddingHorizontal: Scale(10) }}>
                        <Text style={styles.nameText}>When someone joins,anyone who can see their live videos can also watch this one. </Text>
                        <FlatList
                          data={this.state.invitationData}
                          renderItem={(item) => {
                            return (
                              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: Scale(5), paddingHorizontal: Scale(10) }}>
                                <View style={{ flexDirection: "row" }}>
                                  <Image source={avatar} style={styles.profileimg} />
                                  <View style={{ marginLeft: Scale(10) }}>
                                    <Text style={styles.nameText}>Genious_man1</Text>
                                    <Text style={styles.normalText}>Genious_man2</Text>
                                  </View>
                                </View>
                                <CustomButton title={"Accept"} style={{ borderRadius: 10, }} TextStyle={{ color: "black" }} onPress={() => {
                                  this.validateMeeting({
                                    micOn: true,
                                    videoOn: true,
                                    name: this.state.name,
                                    roomId: "",
                                  });
                                }} />
                              </View>
                            )
                          }}
                          keyExtractor={item => item.id}
                        />
                      </View>
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
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container} nestedScrollEnabled={true}>
        <TouchableWithoutFeedback
          testID="touchable"
          onPress={() => {
            this.hideKeyboard();
          }}><>
            {this.state.loader ? (<View style={styles.loaderContainer}><ActivityIndicator size="large" color='white' /></View>) : (
              <>
                <View>
                </View>
              </>
            )}
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    // marginTop: 20,
    height: Dimensions.get("window").height,
  },
  loaderContainer: {
    backgroundColor: "black",
    justifyContent: "center", alignItems: "center", flex: 1,
    height: Dimensions.get("window").height,
  },
  modalContainer: {
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
    borderBottomColor: "grey",
    borderBottomWidth: 1
    // marginVertical: Scale(10),
  },
  headerText: {
    fontFamily: FONT.MontserratSemiBold,
    fontSize: Scale(20)
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  emptyimg: {
    width: Scale(80),
    height: Scale(80)
  },
  profileimg: {
    width: Scale(40),
    height: Scale(40),

  },
  normalText: {
    fontFamily: FONT.MontserratRegular,
    fontSize: Scale(10)
  },
  nameText: {
    fontFamily: FONT.MontserratBold,
    fontSize: Scale(12)
  },

});
// Customizable Area End
