import React from "react";
// Customizable Area Start
import Scale from "../../../../components/src/Scale";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import { Show, backArrow, SwitchOff, SwitchOn } from "../assets";
// Customizable Area End
// import PostCreationController from "./PostCreationController";
import SettingOptionsCommonController, { Props } from "./settingOptionsCommonController";
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
export default class ContentPreferences extends SettingOptionsCommonController {
  // Customizable Area Start
  async componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getAccountSettings();
    })
  }
  // Customizable Area End
  constructor(props: Props) {
    super(props);
  }

  topHeaderSettings = () => {
    return (
      <View style={[styles.headercontainer, styles.divider]}>
        <TouchableOpacity  testID="topHeader" onPress={() => this.props.navigation.navigate('PrivacySettings')}>
          <Image source={backArrow} style={styles.backarrow_style} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Content preferences</Text>
        <View />
      </View>
    );
  };

  item = () => {
    return (
      <View style={{ paddingHorizontal: Scale(15) }}>
        <Text style={{ color: '#A0A0A4', fontSize: Scale(16), marginBottom: Scale(5) }}>SENSITIVE CONTENT</Text>
        <TouchableOpacity style={styles.item} 
        testID="onPressItem"
          onPress={() => this.toggleSettings('show_sensitive_content')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Show} style={{ width: Scale(25), height: Scale(25), resizeMode: "contain", }} />
            <Text style={styles.title}>Show sensitive content</Text>
          </View>
          <View>
            {this.state.showSensitiveContent ?
              <Image source={SwitchOn} style={styles.icon} /> :
              <Image source={SwitchOff} style={styles.icon} />
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  // Customizable Area Start

  // Customizable Area End
  render() {
    // Customizable Area Start
    // Customizable Area End
    return (
      <View style={styles.container}>
        <SafeAreaView>
          {/* Customizable Area Start */}
          {this.topHeaderSettings()}
          {this.item()}
          {/* Customizable Area End */}
        </SafeAreaView>
      </View>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width:"100%",
    maxWidth: 650,
  },
  headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: Scale(15),
    height: Scale(40),
    width: '100%',
  },
  headerText: {
    fontSize: Scale(18),
    fontWeight: '500'
  },
  backarrow_style: {
    width: Scale(20),
    height: Scale(18),
    resizeMode: "contain",
  },
  icon: {
    width: Scale(35),
    height: Scale(35),
    resizeMode: "contain"
  },
  divider: {
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: Scale(5)
  },
  title: {
    fontSize: Scale(16),
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: "left",
    marginVertical: 8,
    marginHorizontal: 14
  },
});
// Customizable Area End
