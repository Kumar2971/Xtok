import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  FlatList,
} from "react-native";
// Customizable Area End

import UserStatusController, {
  Props,
  configJSON,
} from "./UserStatusController";

export default class UserStatus extends UserStatusController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback testID="toucWithoutFeedback"
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View>
            <Text style={styles.title}>{configJSON.userStatusTitle}</Text>

            <FlatList
              data={this.state.userStatus}
              renderItem={(data) => {
                return (
                  <View style={styles.userStatusWraper}>
                    <Text style={styles.userStatusId}>
                      {data.item.account_id}
                    </Text>
                    <Text style={styles.userStatusText}>
                      {data.item.status}
                    </Text>
                  </View>
                );
              }}
              keyExtractor={(item) => item.account_id.toString()}
            />
          </View>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
      // Customizable Area End
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
    backgroundColor: "#ffffffff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userStatusWraper: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
  },
  userStatusId: {
    width: 30,
    fontSize: 18,
  },
  userStatusText: {
    fontSize: 18,
  },
});
// Customizable Area End
