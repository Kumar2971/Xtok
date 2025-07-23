import React from 'react';

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Switch,
  Platform,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import CustomisableUserProfilesController, {
  Props,
  configJSON,
} from './CustomisableUserProfilesController';
import moment from 'moment';

export default class CustomisableUserProfiles extends CustomisableUserProfilesController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const { navigation } = this.props;

    // Customizable Area Start
    return (
      //Required for all blocks
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Required for all blocks */}
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            testID="touchableBtn"
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            {/* Customizable Area Start */}
            {/* Merge Engine UI Engine Code */}
            <View>
              {this.isPlatformWeb() ? (
                <Text testID="labelTitle" style={styles.title}>
                  {configJSON.labelTitleText}
                </Text>
              ) : null}
              {this.state.attributes.map((item: any, index: any) => {
                if (item.field_type === 'boolean') {
                  return (
                    <View key={index}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Switch testID={'switchID'} disabled={!item.is_enable} />
                    </View>
                  );
                } else {
                  return (
                    <View key={index}>
                      <Text style={styles.title}>{item.title}</Text>
                      <TextInput
                        testID={'txtInputFirstName'}
                        style={styles.bgInput}
                        placeholderTextColor={'#909090'}
                        placeholder={item.title}
                        value={item.value}
                        keyboardType={
                          item.field_type === 'integer' ||
                          item.field_type === 'float'
                            ? 'numeric'
                            : 'default'
                        }
                        onChangeText={(text) =>{}
                          // this.handleChangeAttributeValue(text, index)
                        }
                        editable={item.is_enable}
                      />
                    </View>
                  );
                }
              })}
              <TouchableOpacity style={styles.button}>
                <Button
                  testID={'btnExample'}
                  title={configJSON.btnSaveTitle}
                  onPress={()=>{}}
                />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
      //  Customizable Area End
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    maxWidth: 650,
    backgroundColor: '#ffffffff',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  }, 
  countryContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 650,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 300,
  },
  button: {
    paddingVertical: 24,
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 8,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    padding: 0,
    position: 'relative',
  },
  cameraIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
    zIndex: 1,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#d7d7d7',
  },
  showHide: {
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainerIos: {
    paddingTop: Platform.OS == 'ios' ? 40 : 0,
  },
  modalScrollContainer: {
    flexGrow: 1,
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalTitleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWhySignUp: {
    marginBottom: 16,
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 8,
  },
  title: {
    marginBottom: 2,
    fontSize: 14,
    textAlign: 'left',
    marginTop: 16,
    color: '#000000',
  },

  titleOtpInfo: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 8,
  },
  bgInput: {
    flexDirection: 'row',
    fontSize: 16,
    textAlign: 'left',
    color: '#000000',
    marginTop: 0,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: '#767676',
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    paddingStart: 10,
  },
  bgRectBorder: {
    borderWidth: 1,
    borderColor: '#767676',
    borderRadius: 2,
    marginBottom: 0,
    padding: 12,
    marginTop: 0,
  },

  bgPasswordInput: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
    backgroundColor: '#00000000',
    minHeight: 40,
    includeFontPadding: true,
  },
  passwordShowHide: {
    alignSelf: 'center',
  },
  bgPasswordContainer: {
    flexDirection: 'row',
    marginTop: 0,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  bgMobileInput: {
    flexDirection: 'row',
    fontSize: 16,
    textAlign: 'left',
    backgroundColor: '#00000000',
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#767676',
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    marginTop: 0,
    paddingStart: 10,
  },
  textArea: {
    paddingBottom: 15,
  },
  radioContainer: {
    flex: 1,
  },
  textCenter: {
    flex: 1,
    textAlign: 'center',
  },
  helperText: { marginTop: 10 },
});
// Customizable Area End
