import React from 'react';
// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";
import PaypalController from "./PaypalController";
// Customizable Area End

// Customizable Area Start
export default class PayPalView extends PaypalController {
  render() {
    const { isPaypalWebOn, isWebUrl } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          {isPaypalWebOn ? (
            <WebView
              testID="web-view"
              style={{ flex: 1 }}
              source={{ uri: isWebUrl ? isWebUrl : undefined }}
              onNavigationStateChange={(res) =>
                this.onNavigationStateChange(res)
              }
              javaScriptEnabled={true}
              // androidLayerType={'hardware'}
              domStorageEnabled={true}
              startInLoadingState={false}
            />
          ) : (
            <View style={styles.loadingIconStyle}>
              <ActivityIndicator
                testID="loading-indicator"
                color={"green"}
                size={"large"}
              />
              <Text style={styles.textStyle}>
                Please wait... while we process your payment.
              </Text>
            </View>
          )}
        </SafeAreaView>
      </View>
    );
  }
}
// Customizable Area End

// Customizable Area Start
const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    fontSize: 16,
    color: "grey",
    padding: 20,
  },
  loadingIconStyle: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
// Customizable Area End
