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
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import {backArrow,SwitchOff,SwitchOn} from "../assets";
// Customizable Area End
import settingOptionsCommonController, { Props } from "./settingOptionsCommonController";
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
export default class DataSaver extends settingOptionsCommonController {
  // Customizable Area Start
  async componentDidMount(): Promise<void> {
  this.props.navigation.addListener('focus', () => {
  this.getDataSavingSettings()
})
}
  // Customizable Area End
  constructor(props: Props) {
    super(props);
  }

  topHeaderSettings = () => {
    return (
      <View style={[styles.headercontainer, styles.divider]}>
        <TouchableOpacity testID="settings" onPress={() => this.props.navigation.navigate('PrivacySettings')}>
          <Image source={backArrow} style={styles.backarrow_style} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Data Saver</Text>
        <View/>
      </View>
    );
  };

  item = () => {
    return (
      <View style={{paddingHorizontal:Scale(15)}}>
          <TouchableOpacity style={styles.item} testID="save"
            onPress={() => this.toggleDataSaving('Data Saving Mode')}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.title]}>Data Saving Mode</Text>
            </View>
            <View>
              {this.state.setDataSavingMode ?
               <Image source={SwitchOn} style={styles.icon} /> :
               <Image source={SwitchOff} style={styles.icon} />
              }
            </View>
          </TouchableOpacity>
        <View style={[styles.divider]}/>
        {/*  */}
        <TouchableOpacity style={styles.item} testID="reduceQuality"
            onPress={() => this.toggleDataSaving('Reduce Video Quality')}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.title]}>Reduce Video Quality</Text>
            </View>
            <View>
              {this.state.setReduceVideoQuality ?
               <Image source={SwitchOn} style={styles.icon} /> :
               <Image source={SwitchOff} style={styles.icon} />
              }
            </View>
        </TouchableOpacity>
        {/*  */}
        <TouchableOpacity style={styles.item} 
        testID="ReduceDownloadQuality"
            onPress={() => this.toggleDataSaving('Reduce Download Quality')}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.title]}>Reduce Download Quality</Text>
            </View>
            <View>
              {this.state.setReduceDownloadQuality ?
               <Image source={SwitchOn} style={styles.icon} /> :
               <Image source={SwitchOff} style={styles.icon} />
              }
            </View>
        </TouchableOpacity>
        {/*  */}
        <TouchableOpacity style={styles.item} 
            testID="Restricted"
            onPress={() => this.toggleDataSaving('Restricted Mobile Data')}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.title]}>Restricted Mobile Data</Text>
            </View>
            <View>
              {this.state.setRestrictedMobileData ?
               <Image source={SwitchOn} style={styles.icon} /> :
               <Image source={SwitchOff} style={styles.icon} />
              }
            </View>
        </TouchableOpacity>
        {/*  */}
        <TouchableOpacity style={styles.item}
        testID="Upload"
            onPress={() => this.toggleDataSaving('Upload Over Wifi Only')}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.title]}>Upload Over Wi-Fi Only</Text>
            </View>
            <View>
              {this.state.setUploadOverWifiOnly ?
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
          {
            this.state.isLoading ? <ActivityIndicator size="small" color="#ffc831" /> : this.item()
          }
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
    alignItems:'center',
    paddingHorizontal: Scale(15),
    height: Scale(40),
    width: '100%',
  },
  headerText: {
    fontSize:Scale(18),
    fontWeight:'500'
  },
  backarrow_style: {
    width: Scale(20),
    height: Scale(18),
    resizeMode: "contain",
  },
  greyText:{
    color:"grey"
  },
  greyImg:{
    tintColor:"grey"
  },
  icon: {
    width:Scale(35),
    height:Scale(35),
    resizeMode: "contain"
  },
  divider: {
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  item: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginVertical:Scale(5)
  },
  title: {
    fontSize: Scale(16),
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: "left",
    marginVertical: 8,
    marginHorizontal:14
  },
});
// Customizable Area End
