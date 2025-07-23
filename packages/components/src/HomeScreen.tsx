import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import AlertBlock from '../../blocks/alert/src/AlertBlock';
import CustomTextItem from "./CustomTextItem";
import NavigationBlock from "../../framework/src/Blocks/NavigationBlock";
import SingletonFactory from '../../framework/src/SingletonFactory';

import HomeScreenAdapter from '../../blocks/adapters/src/HomeScreenAdapter';
import InfoPageAdapter from '../../blocks/adapters/src/InfoPageAdapter';
import AlertPageWebAdapter from "../../blocks/adapters/src/AlertPageWebAdapter";

// Customizable Area Start
import PrivacyPolicyAdapter from "../../blocks/adapters/src/PrivacyPolicyAdapter";
import TermsAndConditionAdapter from "../../blocks/adapters/src/TermsAndConditionAdapter";
import SplashScreenAdapter from "../../blocks/adapters/src/SplashScreenAdapter";
import SocialMediaLogInAdapter from "../../blocks/adapters/src/SocialMediaLogInAdapter";
import EmailAccountLogInAdapter from "../../blocks/adapters/src/EmailAccountLogInAdapter";
import EmailAccountSignUpAdapter from "../../blocks/adapters/src/EmailAccountSignUpAdapter";
import ForgotPasswordAdapter from "../../blocks/adapters/src/ForgotPasswordAdapter";
import MobilePhoneToOTPAdapter from "../../blocks/adapters/src/MobilePhoneToOTPAdapter";
import OtpToNewPasswordAdapter from "../../blocks/adapters/src/OtpToNewPasswordAdapter";
import MobilePhoneLogInAdapter from "../../blocks/adapters/src/MobilePhoneLogInAdapter";
import MobilePhoneToAdditionalDetailsAdapter from "../../blocks/adapters/src/MobilePhoneToAdditionalDetailsAdapter";
import BottomTabScreenAdapter from "../../blocks/adapters/src/BottomTabScreenAdapter";

//Assembler generated adapters start
import LoginAdapter from "../../blocks/adapters/src/LoginAdapter";
import LoginSuccessAdapter from "../../blocks/adapters/src/LoginSuccessAdapter";
import PhoneNumberInputAdapter from "../../blocks/adapters/src/PhoneNumberInputAdapter";
import OTPInputAuthAdapter from "../../blocks/adapters/src/OTPInputAuthAdapter";
import FollowersAdapter from "../../blocks/adapters/src/FollowersAdapter";
//Assembler generated adapters end



//Assembler generated adapters start
const socialMediaLogInAdapter = new SocialMediaLogInAdapter();
const emailAccountLogInAdapter = new EmailAccountLogInAdapter();
const emailAccountSignUpAdapter = new EmailAccountSignUpAdapter();
const forgotPasswordAdapter = new ForgotPasswordAdapter();
const mobilePhoneToOTPAdapter = new MobilePhoneToOTPAdapter();
const otpToNewPasswordAdapter = new OtpToNewPasswordAdapter();
const mobilePhoneLogInAdapter = new MobilePhoneLogInAdapter();
const mobilePhoneToAdditionalDetailsAdapter = new MobilePhoneToAdditionalDetailsAdapter();
const bottomTabScreenAdapter = new BottomTabScreenAdapter();
//Assembler generated adapters end



const privacyAdapter = new PrivacyPolicyAdapter();
const termAndConditionAdapter = new TermsAndConditionAdapter();
const splashScreenAdapter = new SplashScreenAdapter();
const loginAdapter = new LoginAdapter();
const loginSuccess= new LoginSuccessAdapter();
const phoneNumberInputMessage = new PhoneNumberInputAdapter();
const oTPInputAuthAdapter = new OTPInputAuthAdapter();
const followersAdapter = new FollowersAdapter();
// Customizable Area End


const restAPIBlock = SingletonFactory.getRestBlockInstance();
const alertBlock = new AlertBlock();
const navigationBlock = new NavigationBlock();
const sessionBlock = SingletonFactory.getSessionBlockInstance();
const userAccountManagerBlock = SingletonFactory.getUserManagerInstance();
const homeScreenAdapter = new HomeScreenAdapter();
const infoPageAdapter = new InfoPageAdapter();
const alertPageWebAdapter = new AlertPageWebAdapter()

const instructions = Platform.select({
  // Customizable Area Start
  ios: "The iOS APP to rule them all!",
  android: "Now with Android AI",
  web: "Selector your adventure."
  // Customizable Area End
});

interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
interface S { }

interface SS { }

class HomeScreen extends BlockComponent<Props, S, SS> {

  static instance:HomeScreen;

  constructor(props: Props) {
    super(props);
    HomeScreen.instance = this;
  }

  render() {
    const { navigation } = this.props;
    const _this = this;

    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.welcome}>
                Welcome to GoLavi!
              </Text>
            </View>

            <Text style={styles.instructions}>{instructions}</Text>
            <Text style={styles.header}>DEFAULT BLOCKS</Text>
            <CustomTextItem content={'Live Feed Capture New'} onPress={() => navigation.navigate("LiveFeedCaptureNew")}/>
            <CustomTextItem
              content={'InfoPage'}
              onPress={() => navigation.navigate("InfoPage")}
            />
            <CustomTextItem
              content={'Alert'}
              onPress={() => this.showAlert("Example", "This happened")}
            />
<CustomTextItem content={'promocodes'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'core'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Videos'}  onPress={() => navigation.navigate("Videos")} />
<CustomTextItem content={'Search'}  onPress={() => navigation.navigate("Search")} />
<CustomTextItem content={'Share'}  onPress={() => navigation.navigate("Share")} />
<CustomTextItem content={'SocialMediaAccountRegistrationScreen'}  onPress={() => navigation.navigate("SocialMediaAccountRegistrationScreen")} />
<CustomTextItem content={'social-media-account'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'EmailAccountLoginBlock'}  onPress={() => navigation.navigate("EmailAccountLoginBlock")} />
<CustomTextItem content={'utilities'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'EmailAccountRegistration'}  onPress={() => navigation.navigate("EmailAccountRegistration")} />
<CustomTextItem content={'CountryCodeSelector'}  onPress={() => navigation.navigate("CountryCodeSelector")} />
<CustomTextItem content={'ForgotPassword'}  onPress={() => navigation.navigate("ForgotPassword")} />
<CustomTextItem content={'OTPInputAuth'}  onPress={() => navigation.navigate("OTPInputAuth")} />
<CustomTextItem content={'SocialMediaAccountLoginScreen'}  onPress={() => navigation.navigate("SocialMediaAccountLoginScreen")} />
<CustomTextItem content={'Pushnotifications'}  onPress={() => navigation.navigate("Pushnotifications")} />
<CustomTextItem content={'UserStatus'}  onPress={() => navigation.navigate("UserStatus")} />
<CustomTextItem content={'Dashboard'}  onPress={() => navigation.navigate("Dashboard")} />
<CustomTextItem content={'Notificationsettings'}  onPress={() => navigation.navigate("Notificationsettings")} />
<CustomTextItem content={'Invitefriends'}  onPress={() => navigation.navigate("Invitefriends")} />
<CustomTextItem content={'UserProfileBasicBlock'}  onPress={() => navigation.navigate("UserProfileBasicBlock")} />
<CustomTextItem content={'EducationalUserProfile'}  onPress={() => navigation.navigate("EducationalUserProfile")} />
<CustomTextItem content={'Splashscreen'}  onPress={() => navigation.navigate("Splashscreen")} />
<CustomTextItem content={'Analytics'}  onPress={() => navigation.navigate("Analytics")} />
<CustomTextItem content={'Filteritems'}  onPress={() => navigation.navigate("Filteritems")} />
<CustomTextItem content={'Catalogue'}  onPress={() => navigation.navigate("Catalogue")} />
<CustomTextItem content={'PhoneNumberInput'}  onPress={() => navigation.navigate("PhoneNumberInput")} />
<CustomTextItem content={'MobileAccountLoginBlock'}  onPress={() => navigation.navigate("MobileAccountLoginBlock")} />
<CustomTextItem content={'HelpCentre'}  onPress={() => navigation.navigate("HelpCentre")} />
<CustomTextItem content={'comments'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'PostCreation'}  onPress={() => navigation.navigate("PostCreation")} />
<CustomTextItem content={'Categoriessubcategories'}  onPress={() => navigation.navigate("Categoriessubcategories")} />
<CustomTextItem content={'Location'}  onPress={() => navigation.navigate("Location")} />
<CustomTextItem content={'Blockedusers'}  onPress={() => navigation.navigate("Blockedusers")} />
<CustomTextItem content={'Maps'}  onPress={() => navigation.navigate("Maps")} />
<CustomTextItem content={'Notifications'}  onPress={() => navigation.navigate("Notifications")} />
<CustomTextItem content={'Customisableusersubscriptions'}  onPress={() => navigation.navigate("Customisableusersubscriptions")} />
<CustomTextItem content={'Favourites'}  onPress={() => navigation.navigate("Favourites")} />
<CustomTextItem content={'Contactus'}  onPress={() => navigation.navigate("Contactus")} />
<CustomTextItem content={'QrCodes'}  onPress={() => navigation.navigate("QrCodes")} />
<CustomTextItem content={'VideoEditingTools'}  onPress={() => navigation.navigate("VideoEditingTools")} />
<CustomTextItem content={'VideoLibrary'}  onPress={() => navigation.navigate("VideoLibrary")} />
<CustomTextItem content={'VideoManagement'}  onPress={() => navigation.navigate("VideoManagement")} />
<CustomTextItem content={'Hashtags'}  onPress={() => navigation.navigate("Hashtags")} />
<CustomTextItem content={'Subtitles'}  onPress={() => navigation.navigate("Subtitles")} />
<CustomTextItem content={'AdManager'}  onPress={() => navigation.navigate("AdManager")} />
<CustomTextItem content={'AudioEqualiser'}  onPress={() => navigation.navigate("AudioEqualiser")} />
<CustomTextItem content={'AudioLibrary'}  onPress={() => navigation.navigate("AudioLibrary")} />
<CustomTextItem content={'Mentionstagging'}  onPress={() => navigation.navigate("Mentionstagging")} />
<CustomTextItem content={'InstantGiftCards'}  onPress={() => navigation.navigate("InstantGiftCards")} />
<CustomTextItem content={'Followers'}  onPress={() => navigation.navigate("Followers")} />
<CustomTextItem content={'PrivacySettings'}  onPress={() => navigation.navigate("PrivacySettings")} />
<CustomTextItem content={'AdminConsole2'}  onPress={() => navigation.navigate("AdminConsole2")} />
<CustomTextItem content={'UploadMedia2'}  onPress={() => navigation.navigate("UploadMedia2")} />
<CustomTextItem content={'DataSaver'}  onPress={() => navigation.navigate("DataSaver")} />
<CustomTextItem content={'AudioEditor'}  onPress={() => navigation.navigate("AudioEditor")} />
<CustomTextItem content={'VoiceMemos'}  onPress={() => navigation.navigate("VoiceMemos")} />
<CustomTextItem content={'EmailNotifications'}  onPress={() => navigation.navigate("EmailNotifications")} />
<CustomTextItem content={'Trending'}  onPress={() => navigation.navigate("Trending")} />
<CustomTextItem content={'Chat9'}  onPress={() => navigation.navigate("Chat9")} />
<CustomTextItem content={'LiveStreaming'}  onPress={() => navigation.navigate("LiveStreaming")} />
<CustomTextItem content={'AmazonInteractiveVideoService'}  onPress={() => navigation.navigate("AmazonInteractiveVideoService")} />
<CustomTextItem content={'Settings5'}  onPress={() => navigation.navigate("Settings5")} />
<CustomTextItem content={'LikeAPost'}  onPress={() => navigation.navigate("LikeAPost")} />
<CustomTextItem content={'Payments'}  onPress={() => navigation.navigate("Payments")} />
<CustomTextItem content={'LanguageSupport'}  onPress={() => navigation.navigate("LanguageSupport")} />
<CustomTextItem content={'ApplePayIntegration'}  onPress={() => navigation.navigate("ApplePayIntegration")} />
<CustomTextItem content={'RolesPermissions2'}  onPress={() => navigation.navigate("RolesPermissions2")} />
<CustomTextItem content={'TermsAndConditions'}  onPress={() => navigation.navigate("TermsAndConditions")} />
<CustomTextItem content={'PaymentAdmin2'}  onPress={() => navigation.navigate("PaymentAdmin2")} />
<CustomTextItem content={'CfFaceEffectsIntegration'}  onPress={() => navigation.navigate("CfFaceEffectsIntegration")} />
<CustomTextItem content={'CfLiveChallenges'}  onPress={() => navigation.navigate("CfLiveChallenges")} />
<CustomTextItem content={'CfAppCoinsManagement'}  onPress={() => navigation.navigate("CfAppCoinsManagement")} />
<CustomTextItem content={'CfGiftDesign'}  onPress={() => navigation.navigate("CfGiftDesign")} />
<CustomTextItem content={'AnimationsAndTransition3'}  onPress={() => navigation.navigate("AnimationsAndTransition3")} />

<CustomTextItem content={'StripeIntegration'}  onPress={() => navigation.navigate("StripeIntegration")} />
<CustomTextItem content={'CameraAccess'}  onPress={() => navigation.navigate("CameraAccess")} />
<CustomTextItem content={'BulkUploading'}  onPress={() => navigation.navigate("BulkUploading")} />
<CustomTextItem content={'VisualAnalytics'}  onPress={() => navigation.navigate("VisualAnalytics")} />
<CustomTextItem content={'AdminConsole'}  onPress={() => navigation.navigate("AdminConsole")} />
<CustomTextItem content={'EmailNotifications2'}  onPress={() => navigation.navigate("EmailNotifications2")} />
<CustomTextItem content={'RolesPermissions'}  onPress={() => navigation.navigate("RolesPermissions")} />
<CustomTextItem content={'PaymentAdmin'}  onPress={() => navigation.navigate("PaymentAdmin")} />
<CustomTextItem content={'VideoTrimming'}  onPress={() => navigation.navigate("VideoTrimming")} />
<CustomTextItem content={'AnimationsAndTransition2'}  onPress={() => navigation.navigate("AnimationsAndTransition2")} />
<CustomTextItem content={'ElasticSearch'}  onPress={() => navigation.navigate("ElasticSearch")} />
<CustomTextItem content={'PhotoFilters'}  onPress={() => navigation.navigate("PhotoFilters")} />
<CustomTextItem content={'RealtimeUpdates'}  onPress={() => navigation.navigate("RealtimeUpdates")} />
<CustomTextItem content={'Bookmark2'}  onPress={() => navigation.navigate("Bookmark2")} />
<CustomTextItem content={'ContentFlag'}  onPress={() => navigation.navigate("ContentFlag")} />
<CustomTextItem content={'LiveFeedCapture'}  onPress={() => navigation.navigate("LiveFeedCapture")} />
<CustomTextItem content={'LinkShare'}  onPress={() => navigation.navigate("LinkShare")} />
<CustomTextItem content={'CfGroupLive'}  onPress={() => navigation.navigate("CfGroupLive")} />
<CustomTextItem content={'Gallery'}  onPress={() => navigation.navigate("Gallery")} />
<CustomTextItem content={'Upvotedownvote'}  onPress={() => navigation.navigate("Upvotedownvote")} />
<CustomTextItem content={'LiveFeedScheduling'}  onPress={() => navigation.navigate("LiveFeedScheduling")} />
<CustomTextItem content={'Scoring'}  onPress={() => navigation.navigate("Scoring")} />
<CustomTextItem content={'InvoiceBilling'}  onPress={() => navigation.navigate("InvoiceBilling")} />
<CustomTextItem content={'DownloadOptions'}  onPress={() => navigation.navigate("DownloadOptions")} />
<CustomTextItem content={'Leaderboard'}  onPress={() => navigation.navigate("Leaderboard")} />
<CustomTextItem content={'PeopleManagement2'}  onPress={() => navigation.navigate("PeopleManagement2")} />
<CustomTextItem content={'AccountScoreranking'}  onPress={() => navigation.navigate("AccountScoreranking")} />
<CustomTextItem content={'Gamification'}  onPress={() => navigation.navigate("Gamification")} />
<CustomTextItem content={'CustomisableUserProfiles'}  onPress={() => navigation.navigate("CustomisableUserProfiles")} />
<CustomTextItem content={'PerformanceTracker'}  onPress={() => navigation.navigate("PerformanceTracker")} />
<CustomTextItem content={'AddFriends'}  onPress={() => navigation.navigate("AddFriends")} />
<CustomTextItem content={'FacialTracking'}  onPress={() => navigation.navigate("FacialTracking")} />
<CustomTextItem content={'Login'}  onPress={() => navigation.navigate("Login")} />
<CustomTextItem content={'LoginSuccess'}  onPress={() => navigation.navigate("LoginSuccess")} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
// Customizable Area End

// Customizable Area Start
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: Platform.OS === "web" ? '100vh' : 'auto',
    backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  instructions: {
    textAlign: "center",
    color: "#6200EE",
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,

    padding: 10
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: '#00000000',
    padding: 18,
    color: '#6200EE',
    fontSize: 16,
    fontWeight: 'normal'
  }
});
// Customizable Area End
export default HomeScreen;