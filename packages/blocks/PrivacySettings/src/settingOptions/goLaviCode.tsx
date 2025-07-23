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
  Platform,
} from "react-native";
import { imgRightArrow, imgLeftArrow } from "../assets";
// Customizable Area End
import SettingOptionsCommonController, { Props } from "./settingOptionsCommonController";
import CustomLoader from "../../../../components/src/CustomLoader";
import { translate } from "../../../../components/src/i18n/translate";
import { getStorageData } from "framework/src/Utilities";
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;

export default class GoLaviCode extends SettingOptionsCommonController {
  // Customizable Area Start

  async componentDidMount(): Promise<void> {
    this.getQRCode()
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language })
    this.props.navigation.addListener('focus', async () => {
      this.getQRCode()
    })
  }

  // Customizable Area End
  constructor(props: Props) {
    super(props);
  }

  topHeaderSettings = () => {
    const { language } = this.state;
    let backStyle = [styles.backarrow_style_en, this.state.language == 'ar' && styles.backarrow_style]


    return (
      <View style={[styles.headercontainer, styles.divider]}>
        <TouchableOpacity
          testID="topHeader"
          onPress={() => this.goBack()}>
          <Image source={imgLeftArrow}
            style={backStyle} />


        </TouchableOpacity>
        <Text style={styles.headerText}>{translate("goLavi_Code")}</Text>
      </View>
    );
  };



  item = () => {

    return (
      <View style={[styles.item, { paddingHorizontal: Scale(15) }]}>
        <Image source={{ uri: this.state.QRCodeImage }}
          style={{
            width: Scale(250),
            height: Scale(250),
          }}
        />
        <Text style={styles.title}>@{this.state.userName}</Text>
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
          <View style={{ marginTop: 170 }}>
            {
              this.state.isLoading ? <CustomLoader /> :
                this.item()
            }
          </View>
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
    width: "100%",
    maxWidth: 650,
  },
  headercontainer: {
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: Scale(15),
    height: Scale(40),
    width: '100%',
  },
  headerText: {
    fontSize: Scale(18),
    fontWeight: 'bold',
    width: screenWidth - Scale(60),
    textAlign: 'center',
  },
  backarrow_style: {
    transform: [{ rotate: "180deg" }]
  },
  backarrow_style_en: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: "contain",
  },

  divider: {
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: Scale(5)
  },
  title: {
    fontSize: Scale(16),
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: "center",
    marginVertical: 8,
    marginHorizontal: 14
  },
});
// Customizable Area End
