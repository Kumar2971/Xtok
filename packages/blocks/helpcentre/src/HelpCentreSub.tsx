import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Dimensions
} from "react-native";

const Height = Dimensions.get("window").height;

// Customizable Area End

import HelpCentreController, { Props } from "./HelpCentreController";
import { FlatList } from "react-native-gesture-handler";
import { triangle } from "./assets";

export default class HelpCentreSub extends HelpCentreController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
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
          <View style={{ height: Height }}>
            <View>
              <FlatList
                // keyExtractor={item => item.id}
                data={this.state.dataSub}
                renderItem={({ item }: { item: any }) => (
                  <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() =>
                      this.gotoHelpCentreQA(
                        item && item.attributes && item.attributes.que_type
                          ? item.attributes.que_type
                          : "",
                        item &&
                          item.attributes &&
                          item.attributes.question_answers &&
                          item.attributes.question_answers.data
                          ? item.attributes.question_answers.data
                          : null
                      )
                    }
                  >
                    <Text style={styles.textStyle}>
                      {item && item.attributes && item.attributes.sub_type
                        ? item.attributes.sub_type
                        : ""}
                    </Text>
                    <Image style={styles.imageStyle} source={triangle} />
                  </TouchableOpacity>
                )}
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
    paddingVertical: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#FFF",
    height: "100%"
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
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
  textStyle: {
    fontWeight: "500",
    color: "#252837",
    fontSize: 17
  },
  imageStyle: {
    width: 9,
    height: 15
  },
  touchableOpacity: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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
  }
});
// Customizable Area End
