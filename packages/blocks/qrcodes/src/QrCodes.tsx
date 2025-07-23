import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Text
} from "react-native";
// Customizable Area End

import QrcodeController, { Props } from "./QrCodesController";

// Customizable Area Start
// Customizable Area End

export default class Qrcodes extends QrcodeController {
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
          <View>
            <View>
              <Text>URL : {this.state.qrcodeholder + "\n\n"}</Text>
              <Image
                style={styles.QrCodeImg}
                source={{ uri: this.state.qrcodeholder }}
                resizeMode="cover"
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
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff"
  },
  QrCodeImg: {
    width: 246,
    height: 246
  }
});
// Customizable Area End
