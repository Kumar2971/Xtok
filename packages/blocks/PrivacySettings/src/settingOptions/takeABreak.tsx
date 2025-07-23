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
import { backArrow, SwitchOff, SwitchOn, editPencil, imgLeftArrow } from "../assets";
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// Customizable Area End
import settingOptionsCommonController, { Props } from "./settingOptionsCommonController";
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
import { translate } from "../../../../components/src/i18n/translate";
import { getStorageData } from "framework/src/Utilities";

export default class TakeABreak extends settingOptionsCommonController {
  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    this.getBreakReminderSettings()
    const language = await getStorageData("SelectedLng");
    this.setState({ language: language });

    this.props.navigation.addListener("focus", async () => {
      this.getBreakReminderSettings()
      const language = await getStorageData("SelectedLng");
      this.setState({ language: language });
    });

  }
  // Customizable Area End
  constructor(props: Props) {
    super(props);
  }

  topHeaderSettings = () => {
    return (
      <View style={[styles.headercontainer, styles.divider]}>
        <TouchableOpacity testID="manageAcc" onPress={() => this.props.navigation.navigate('ManageAccount')}>
          <Image source={this.state.language =='ar' ? backArrow : imgLeftArrow} style={this.state.language =='ar' ? styles.backarrow_style : styles.backarrow_style_en} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{translate("remind_me_to_take_a_break")}</Text>
        <View />
      </View>
    );
  };

  item = () => {
    return (
      <View style={{ paddingHorizontal: Scale(15) }}>
        <TouchableOpacity testID="toggleReminder" style={styles.item}
          onPress={() => this.toggleBreakReminder()}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.title]}>{translate("remind_me_to_take_a_break")}</Text>
          </View>
          <View>
            {this.state.setBreakReminder ?
              <Image source={SwitchOn} style={styles.icon} /> :
              <Image source={SwitchOff} style={styles.icon} />
            }
          </View>
        </TouchableOpacity>

        {
          (Platform.OS === 'android') && (
            (this.state.breakFrequencyModalOpen) && (
              DateTimePickerAndroid.open({
                mode: 'time',
                is24Hour: true,
                display: 'spinner',
                value: new Date(),
                positiveButton: { label: 'Ok', textColor: '#ffc831' },
                negativeButton: { label: 'Cancel', textColor: '#888888' },
                onChange: (event, newDate) => {
                  if (event.type === 'dismissed') {
                    this.setState({ breakFrequencyModalOpen: false })
                  } else if (event.type === 'set') {
                    const timeInHours = newDate?.getHours().toString() as string
                    const timeInMinutes = newDate?.getMinutes().toString() as string
                    this.setState({
                      breakFrequencyModalOpen: false,
                      breakFrequencyInHours: timeInHours,
                      breakFrequencyInMinutes: timeInMinutes
                    })
                    this.updateBreakReminderSettings(+timeInHours, +timeInMinutes)
                  }
                },
              })
            ) 
          )
        }



        {
          (this.state.setBreakReminder && !this.state.breakFrequencyModalOpen && this.state.breakFrequencyInHours !== '') &&
          (
            <>
              <TouchableOpacity style={styles.item}
                onPress={() => this.toggleBreakModal()}
              >
                <Text style={styles.title}>
                  {translate("break_frequency")}
                </Text>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'

                }}>
                  <Text>
                    {this.state.breakFrequencyInHours} Hr  {this.state.breakFrequencyInMinutes} Min
                  </Text>
                  <Image
                    source={editPencil}
                    style={styles.pencilIcon}
                  />
                </View>


              </TouchableOpacity>
              <View style={[styles.item, styles.title]}>
                <Text>
                  {translate("break_frequency_note")}
                </Text>
              </View>
            </>

          )

        }

        {
           (Platform.OS === 'ios') && (

            (this.state.setBreakReminder) && (
              <View style={{ backgroundColor: 'transparent', width: 400, height: 250, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <DateTimePicker
                testID="DateIOS"
                  mode='time'
                  display='spinner'
                  is24Hour
                  locale={'en_GB'}
                  value={this.state.breakFrequencyRawDate}
                  style={{ width: 250, height: 250, marginTop: 50, alignItems: 'center', justifyContent: 'center', display: 'flex' }}
                  positiveButton={{ label: 'Ok', textColor: '#ffc831' }}
                  negativeButton={{ label: 'Cancel', textColor: '#888888' }}
                  onChange={(event, newDate) => {
                    if (event.type === 'dismissed') {
                      this.setState({ breakFrequencyModalOpen: false })
                    } else if (event.type === 'set') {
                      const timeInHours = newDate?.getHours().toString() as string
                      const timeInMinutes = newDate?.getMinutes().toString() as string
                      this.setState({
                        breakFrequencyModalOpen: false,
                        breakFrequencyInHours: timeInHours,
                        breakFrequencyInMinutes: timeInMinutes,
                        breakFrequencyRawDate: newDate as Date,
                        readyToShow: true
                      })
                      this.updateBreakReminderSettings(+timeInHours, +timeInMinutes)
                    }
                  }}
                />
              </View>
            )


          )
        }

        {
          this.state.readyToShow && (
            <TouchableOpacity testID="mngAccount"
              onPress={() => this.props.navigation.navigate('ManageAccount')}
              style={[styles.item, styles.button]}
            >
              <Text style={styles.title}>
                {translate("save")}
              </Text>
            </TouchableOpacity>
          )
        }

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
    alignItems: 'center',
    paddingHorizontal: Scale(15),
    height: Scale(40),
    width: '100%',
  },
  headerText: {
    fontSize: Scale(18),
    fontWeight: 'bold'
  },
  backarrow_style: {
    width: Scale(20),
    height: Scale(18),
    resizeMode: "contain",
    transform: [{ rotate: '180deg' }]
  },
  backarrow_style_en: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: "contain",
  },
  greyText: {
    color: "grey"
  },
  greyImg: {
    tintColor: "grey"
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
  report_modal: {
    height: Scale(330),
    width: Scale(300),
    borderRadius: 20,
    backgroundColor: '#fff',
    alignSelf: 'center'
  },
  reportModalBodyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    paddingTop: 15
  },
  report_modal_button_container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom:10,
  },
  button: {
    marginTop: Scale(50),
    width: Scale(180),
    height: Scale(45),
    backgroundColor: "#FACC1E",
    borderRadius: Scale(50),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  pencilIcon: {
    width: Scale(20),
    height: Scale(20),
    resizeMode: "contain",
    marginLeft: Scale(6)
  },
  report_continue_button: {
    color: '#000',
    fontWeight: '600',
  },
});
// Customizable Area End
