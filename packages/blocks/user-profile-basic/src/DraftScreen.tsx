import React from "react";
// Customizable Area Start
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
} from "react-native";
import DraftController from "./DraftController";
import { VideoComponent } from "../../../components/src/VideoComponent";
import scale from "../../../components/src/Scale";
import { ic_back, ic_delete } from "./assets";
import * as utils from '../../../components/src/Utilities';
import {translate} from "../../../components/src/i18n/translate";
// Customizable Area End
export default class DraftScreen extends DraftController {
  // Customizable Area Start

  deleteModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.showDeleteDialogue}
        onRequestClose={() => {
          this.setState({ showDeleteDialogue: false });
        }}
      >
        <View style={[{ flex: 1 }, styles.deleteCenter]}>
          <View style={styles.bgDelete}>
            <Text style={styles.textTitleDelete}>{translate("delete_selectet_draft")}</Text>
            <View style={[styles.viewRow]}>
              <View style={styles.flexLeft}>
                <View style={[
                  styles.draftButton,
                  this.state.isLoading && { elevation: 0 },
                  this.state.showDeleteDialogue && { elevation: 0 }]}
                >
                  <TouchableOpacity
                  testID="cancelKey"
                    disabled={this.state.isLoading}
                    onPress={() => {
                      this.setState({ showDeleteDialogue: false });
                    }}
                  >
                    <Text style={[styles.uploadButtonText]}>{ translate("cancel") }</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.flexRight}>
                <View
                  style={[
                    styles.uploadButton,
                    this.state.caption == "" && styles.uploadDisableButton,
                    this.state.isLoading && { elevation: 0 },
                    this.state.showDeleteDialogue && { elevation: 0 }
                  ]}
                >
                  <TouchableOpacity
                    disabled={this.state.isLoading}
                    testID="upload"
                    onPress={() => {
                      this.setState({ showDeleteDialogue: false });
                      this.deleteDraftById();
                    }}
                  >
                    <Text style={[styles.uploadButtonText]}>{ translate("delete") }</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  // Customizable Area End
  render() {
    // Customizable Area Start
    // console.log("iasnudiausdnaisuasiudnasuiadiunad",this.state.video)
    return (
      <>
      <StatusBar barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <View>
        <TouchableWithoutFeedback  testID="videoComponentKey">
          <VideoComponent
            item={this.state.video}
            mute={this.state.mute}
            height={{ height: '100%' }}
            isVisible={true}
            setmute={() => {
              this.setState({ mute: !this.state.mute });
            }}
          />
        </TouchableWithoutFeedback>
        <View style={styles.overLappedContainer}>
          <View style={styles.viewFlexRow}>
            <View style={styles.viewLeft}>
              <TouchableOpacity testID="topImageKey" onPress={() => this.props.navigation.goBack()}>
                <Image source={ic_back} style={[styles.topImages,this.state.language ==="ar" && styles.backArrow_Ar]} resizeMode={'contain'} />
              </TouchableOpacity>
            </View>
            <View style={styles.viewRight}>
              <TouchableOpacity testID="deleteKey" onPress={() => {
                this.setState({ showDeleteDialogue: true });
              }}>
                <Image source={ic_delete} style={styles.topImages} resizeMode={'contain'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.viewFull}>
            <View style={[styles.viewRow, { padding: 10 }]}>
              <View style={styles.flexLeft}>
                <View style={[
                  styles.draftButton,
                  this.state.isLoading && { elevation: 0 },
                  this.state.showDeleteDialogue && { elevation: 0 }]}
                >
                  <TouchableOpacity
                  testID="uploadButtonKey"
                    disabled={this.state.isLoading}
                    onPress={() => {
                      // Click
                      const bucketDetails = { "access_key_id": "hello", "bucket_name": "sbucket", "end_point": `${utils.returnS3URL()}`, "region": "builder-1", "secret_access_key": "builderai" }
                      const dataMain = {isDraft:true, updateData: this.state.mainItem?.attributes, mediaDetails: [], bucketDetails: bucketDetails };
                      this.props.navigation.navigate("Postsubmit", dataMain)
                    }}
                  >
                        <Text style={[styles.uploadButtonText]}>{ translate("edit")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.flexRight}>
                <View
                  style={[
                    styles.uploadButton,
                    this.state.caption == "" && styles.uploadDisableButton,
                    this.state.isLoading && { elevation: 0 },
                    this.state.showDeleteDialogue && { elevation: 0 }
                  ]}
                >
                  <TouchableOpacity
                    disabled={this.state.isLoading}
                    testID="uploadUpdatedData"
                    onPress={() => {
                      this.doUploadUpdatedData();
                    }}
                  >
                        <Text style={[styles.uploadButtonText]}>{ translate("Upload")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        {this.state.isLoading ? (
          <View style={[styles.overLappedContainer, styles.alignCenter]}>
            <View style={styles.bgLoader}>
              <ActivityIndicator size={"large"} color={'#000'} />
            </View>
          </View>
        ) : null}
        {this.deleteModal()}
        </View>
      </SafeAreaView>
      </>
    );
    // Customizable Area End
  }
}

const styles = StyleSheet.create({
  // Customizable Area Start
  container: {
   flex: 1
  },
  overLappedContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  deleteCenter: {
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  bgDelete: {
    marginHorizontal: 25,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFF',
  },
  textTitleDelete: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  bgLoader: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  viewFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 25,
  },
  viewLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  viewRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  topImages: {
    height: 25,
    width: 25,
  },
  backArrow_Ar: {
    transform: [{ rotate: "180deg" }]
   },
  viewFull: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  flexLeft: {
    flex: 1,
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRight: {
    flex: 1,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftButton: {
    borderRadius: 50,
    borderWidth: 0,
    borderColor: "#fff",
    width: scale(150),
    paddingVertical: scale(12),
    backgroundColor: "#fff2cc",
    shadowColor: "#ff9ba8",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  uploadButton: {
    borderRadius: 50,
    borderWidth: 0,
    borderColor: "#fff",
    width: scale(150),
    paddingVertical: scale(12),
    backgroundColor: "#FFC924",
    shadowColor: "#ff9ba8",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  uploadDisableButton: {
    //backgroundColor: "#ffe084",
  },
  uploadButtonText: {
    textAlign: "center",
    fontSize: scale(16),
    color: "#000",
    fontWeight: "bold",
  },
  // Customizable Area End
});
