import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-elements";
import {
  appleAuthAndroid,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import { platform } from 'os';
import { GoogleSignin } from '@react-native-community/google-signin';
import { RNToasty } from 'react-native-toasty'; 
import {
  imgAppleGrey,
  imgApple,
  imgGoogle,
  imgGoogleGrey,
  imgMail,
  imgPhone,
  imgQuestion
} from "./assets";
// Customizable Area End

import LoginController, { Props } from "./LoginController";
import {
  deviceBasedDynamicDimension,
  setNavigator,
} from "../../../components/src/Utilities";
import { translate } from "../../../components/src/i18n/translate";
export default class PhoneNumberInput extends LoginController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    props.navigation && setNavigator(props.navigation);
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.props.navigation && setNavigator(this.props.navigation);

    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      webClientId:
        '946680350903-0gtnonpn1kijcmmce3n8rpbibsn7kgt3.apps.googleusercontent.com',
    });
  }

  returnClassBasedOnLanguage = () => {
    if (this.state.language == 'ar') {
      return styles.alignSelfStart;
    } else {
      return styles.alignSelfEnd;
    }
  };

  handleEmails = (email: string | null, name: string | null) => {
    if (email) {
      this.setState(
        {
          email: email,
          name: name ? name : '',
        },
        () => {
          this.socialSignIn(email);
        }
      );
    }
  };

  handleError = (e: unknown) => {
    console.log('error', e);
  };

  async googleLogin() {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } catch {
        this.handleError;
      }
    }

    await GoogleSignin.hasPlayServices({
      //Check if device has Google Play Services installed.
      //Always resolves to true on iOS.
      showPlayServicesUpdateDialog: true,
    });

    const userInfo = await GoogleSignin.signIn();
    if (userInfo) {
      this.handleEmails(userInfo.user.email, userInfo.user.name);
    } else {
      RNToasty.Show({ title: 'Enable to fetch email!' });
    }
  }

  async UNSAFE_componentWillMount() {
    this.props.navigation && setNavigator(this.props.navigation);
  }

  renderLoginWith = ({
    title,
    source,
    onPress,
    disableImgSource,
    testID,
  }: {
    title: string;
    source: any;
    onPress: Function;
    disableImgSource: any;
    testID: string;
  }) => (
    <>
      <TouchableOpacity
        style={[styles.btnLoginWith, styles.disableBackground]}
        onPress={() => onPress()}
        // disabled={isDisable ? true : false}
        testID={testID}
      >
        <View
          style={[
            styles.loginBtnView,
            { paddingHorizontal: this.state.language == 'ar' ? 25 : 15 },
          ]}
        >
          <View
            style={[
              styles.imgView,
              this.state.language == 'ar' ? { end: 0 } : { start: 0 },
            ]}
          >
            <Image source={source} style={[styles.imgStyle]} />
          </View>
          <Text style={[styles.txtLoginWith, styles.blackText]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
        <View style={styles.mainView}>
          <View style={[styles.headerView, this.returnClassBasedOnLanguage()]}>
            {/* <TouchableOpacity
            testID="helpBtn"`
              style={styles.headerIconsView2}
              onPress={() =>console.log("###")}
            >
              <Image source={cross} style={[styles.imgStyle,{tintColor:"black",height:15,width:15}]} />
            </TouchableOpacity> */}
            <TouchableOpacity
              testID="helpBtn"
              style={styles.headerIconsView2}
              onPress={() => this.props.navigation.navigate('HelpCenter')}
            >
              <Image source={imgQuestion} style={[styles.imgStyle, {}]} />
            </TouchableOpacity>
          </View>
          <View style={styles.middleView}>
            <View style={styles.txtView}>
              <Text style={styles.txttitle}>{translate('LoginTo')}</Text>
              <Text style={styles.txtSubTitle}>{translate('becomeText')}</Text>
            </View>
            <View style={styles.continueView}>
              {
                <>
                  <this.renderLoginWith
                    source={imgMail}
                    title={translate('continueWithEmail')}
                    onPress={() => this.goToLoginWith('email')}
                    disableImgSource={null}
                    testID="btnEmail"
                  />
                  <this.renderLoginWith
                    source={imgPhone}
                    title={translate('continueWithMobile')}
                    onPress={() => this.goToLoginWith('mobile')}
                    disableImgSource={null}
                    testID="btnMobile"
                  />
                  {/* <this.renderLoginWith
                    source={imgFb}
                    title={translate("continueWithFB")}
                    onPress={() => console.log("login..")}
                    // onPress={() => this.facebookLogIn()}
                    isDisable={true}
                    disableImgSource={imgFbGrey}
                    testID="btnFB"
                  />

                  */}
                </>
              }
            </View>
            <View style={styles.txtView2}>
              <Text style={styles.descText}>
                {translate('by_continuing')}
                <Text
                  testID="T&Cbtn"
                  style={styles.descBoldText}
                  onPress={() =>
                    this.props.navigation.navigate('TermsAndConditions')
                  }
                >
                  {translate('t_C')}
                </Text>
                {translate('acknowledge')}
                <Text
                  testID="privacyBtn"
                  style={styles.descBoldText}
                  onPress={() =>
                    this.props.navigation.navigate('PrivacyPolicy')
                  }
                >
                  {translate('privacyPolicy')}
                </Text>
                {translate('learn')}
              </Text>
            </View>
            <Button
              testID="signupBtn"
              buttonStyle={styles.signupBtn}
              containerStyle={styles.btnContainer}
              //  onPress={() => this.props.navigation.navigate("Followers")}
              onPress={() =>
                this.props.navigation.navigate('CountryCodeSelectorTable')
              }
              title={translate('newHere')}
              titleStyle={{
                fontWeight: 'bold',
                fontSize: 14,
                color: '#000000',
                // fontFamily:FONTS.MontserratSemiBold
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

const styles = StyleSheet.create(
  {
    // Customizable Area Start
    mainView: {
      padding: deviceBasedDynamicDimension(20, true, 1),
      backgroundColor: '#ffffff',
      borderTopLeftRadius: deviceBasedDynamicDimension(20, true, 1),
      borderTopRightRadius: deviceBasedDynamicDimension(20, true, 1),
      // justifyContent: "center",
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: deviceBasedDynamicDimension(Platform.select({ ios: 50, android: 10 }) || 10, true, 1),
    },
    headerView: {
      // flex:1,
      alignItems: 'center',
    },
    middleView: {
      height: '100%',
      justifyContent: 'center',
    },
    txtView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtView2: {
      marginTop: deviceBasedDynamicDimension(50, false, 1),
      justifyContent: 'center',
      alignItems: 'center',
    },
    txttitle: {
      fontWeight: 'bold',
      fontSize: deviceBasedDynamicDimension(22, true, 1),
      color: '#000000',
      width: '75%',
      textAlign: 'center',
      // fontFamily: FONTS.MontserratBold
    },
    txtSubTitle: {
      fontSize: deviceBasedDynamicDimension(12, true, 1),
      marginVertical: deviceBasedDynamicDimension(10, true, 1),
      width: '65%',
      textAlign: 'center',
      color: '#86878B',
      fontWeight: 'bold',
      // fontFamily: FONTS.MontserratRegular
    },
    continueView: {
      marginTop: deviceBasedDynamicDimension(10, false, 1),
      marginBottom: deviceBasedDynamicDimension(30, false, 1),
      // backgroundColor:"red"
    },
    btnLoginWith: {
      justifyContent: 'center',
      borderColor: '#EEEEEE',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: deviceBasedDynamicDimension(15, false, 1),
      width: '100%',
      height: deviceBasedDynamicDimension(50, false, 1),
      marginTop: deviceBasedDynamicDimension(15, false, 1),
    },
    btnBackground: {
      backgroundColor: '#ffffff',
    },
    disableBackground: {
      backgroundColor: '#EEEEEE',
    },
    loginBtnView: {
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor:"pink",
    },
    txtLoginWith: {
      marginLeft: deviceBasedDynamicDimension(10, true, 1),
      fontWeight: 'bold',
      fontSize: deviceBasedDynamicDimension(12, true, 1),
      // fontFamily: FONTS.MontserratSemiBold
    },
    blackText: {
      color: '#000000',
    },
    greyText: {
      color: '#86878B',
    },
    descText: {
      width: '85%',
      color: '#86878B',
      fontSize: deviceBasedDynamicDimension(10, true, 1),
      textAlign: 'center',
      // fontFamily:FONTS.MontserratRegular
    },
    alignSelfStart: {
      alignSelf: 'flex-start',
    },
    alignSelfEnd: {
      alignSelf: 'flex-end',
    },
    descBoldText: {
      fontWeight: 'bold',
      color: '#000000',
      fontSize: deviceBasedDynamicDimension(12, true, 1),
      // fontFamily:FONTS.MontserratSemiBold
    },
    imgView: {
      height: deviceBasedDynamicDimension(18, true, 1),
      width: deviceBasedDynamicDimension(18, true, 1),
      position: 'absolute',
    },
    imgStyle: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
    },
    tintColor: {
      tintColor: '#c0c0c0',
    },
    headerIconsView: {
      height: deviceBasedDynamicDimension(15, true, 1),
      width: deviceBasedDynamicDimension(15, true, 1),
    },
    headerIconsView2: {
      height: deviceBasedDynamicDimension(20, true, 1),
      width: deviceBasedDynamicDimension(20, true, 1),
    },
    closeViewImg: {
      height: deviceBasedDynamicDimension(10, true, 1),
      width: deviceBasedDynamicDimension(10, true, 1),
    },
    signupBtn: {
      borderRadius: deviceBasedDynamicDimension(50, true, 1),
      height: deviceBasedDynamicDimension(50, true, 1),
      width: '100%',
      backgroundColor: '#FFC925',
    },
    btnContainer: {
      marginVertical: deviceBasedDynamicDimension(20, true, 1),
    },
  }
  // Customizable Area End
);
