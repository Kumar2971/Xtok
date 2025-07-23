import React from "react";

import {
  StyleSheet,
  Platform,
  Dimensions,
  // Customizable Area Start
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback
  // Customizable Area End
} from "react-native";

const Height = Dimensions.get("window").height;

import { Props } from "./HelpCentreController";

import { FlatList } from "react-native-gesture-handler";
import { triangle } from "./assets";
import HelpCentreController from "./HelpCentreController";

// Customizable Area Start
import Feather from "react-native-vector-icons/Feather";
import { CommonStyle } from "../../../components/src/ClientGlobals";
import { deviceBasedDynamicDimension } from "../../../components/src/Utilities";
// Customizable Area End

export default class HelpCentre extends HelpCentreController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderItem = ({ item, index }: any) => {

    const { collapseViewIndex } = this.state;
    const idx = collapseViewIndex.indexOf(index);
    const active = idx > -1;
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.collapseViewFunc(index);
          }}
          style={[CommonStyle.rowStyle]}
        >
          <View style={styles.questionWrap}>
            <Text
              style={[
                styles.txtListPanel,
                styles.txtFontBold,
              ]}
            >
              {item?.que}
            </Text>
            <Feather
              name={active ? "x" : "plus"}
              size={25}
              color={"#FFC925"}
              style={{ alignSelf: "center", justifyContent: "center" }}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.answerWrap}>
          {active && (
            <View style={styles.answerView}>
              
              <Text
                style={[styles.txtDesc]}
              >
                {item?.ans ? item?.ans : ""}
              </Text>
            </View>
          )}
          {this.itemSeparatorComponent()}
        </View>
      </View>
    );
  };

  itemSeparatorComponent = () => {
    return (
      <View style={styles.view_line} />
    );
  };
  // Customizable Area End

  render() {
    return (
      //Merge Engine DefaultContainer
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View style={styles.viewStyle}>
            <View>
              <View>
                <Text style={styles.faqtext}>{"Frequently Asked Questions"}</Text>
              </View>
              {this.itemSeparatorComponent()}
              <FlatList
                scrollEnabled={false}
                data={this.state.helpCentreQA || []}
                renderItem={(item) => this.renderItem(item)}
                keyExtractor={(item: any, index: any) => `list_${index}`}
              />
            </View>
          </View>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
      //Merge Engine End DefaultContainer
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#FFF",
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  imageStyle: {
    width: 9,
    height: 15
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  viewStyle: {
    height: Height,
    width: "100%"
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1
  },
  bgMobileInput: {
    flex: 1
  },
  showHide: {
    alignSelf: "center"
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  viewContainer: {
    paddingLeft: 32,
    paddingRight: 16
  },
  innerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8
  },
  timeText: {
    fontWeight: "700",
    fontSize: 15,
    color: "#252837",
    opacity: 0.5
  },
  paymentType: {
    fontWeight: "700",
    fontSize: 17,
    color: "#252837"
  },
  amount: {
    fontWeight: "700",
    fontSize: 17,
    color: "#5D8BFF"
  },
  paymentMethod: {
    fontWeight: "500",
    fontSize: 17,
    color: "#4F5261"
  },
  header: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  itemType: {
    fontWeight: "500",
    color: "#252837",
    fontSize: 17
  },
  contentWrap: {
    padding: 20,
    paddingRight: 0,
  },

  questionWrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingRight: 30,
  },
  answerWrap: {
    //  paddingLeft: 36,
  },
  answerView: {
    paddingRight: 30,
    marginBottom: 20,
  },
  txtFontBold: { fontWeight: "bold" },
  txtListPanel: {
    fontSize: 16,
    fontWeight: "normal",
    marginVertical: 30,
    width: "90%",
    // color: "#5A5A5A",
    color: 'black'
  },
  txtDesc: {
    fontSize: 14,
    color: "#5A5A5A",
  },
  view_line: {
    borderColor: "rgba(239, 239, 239, 1)",
    borderWidth: 1,
    // width: "90%",
  },
  emptyListText: {
    color: "rgba(41, 45, 50, 1)",
    fontWeight: "bold",
    fontSize: 14,
    paddingTop: 20,
    textAlign: "center",
  },
  faqtext:{
    fontWeight: 'bold',
    color: 'rgba(134, 135, 139, 1)',
    textAlign: 'left',
    textTransform:"uppercase",
    // fontFamily: 'NunitoSans-SemiBold',
    fontSize: deviceBasedDynamicDimension(12, true, 1),
    marginBottom:deviceBasedDynamicDimension(20 ,false , 1)
  },
});
// Customizable Area End
