import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

import messaging from '@react-native-firebase/messaging';
// import notificationListener from '../blocks/splashscreen/src/SplashscreenController'
// import VersionCheck from 'react-native-version-check';
import { EventRegister } from '../components/src/firebaseEvent/EventRegister';
//@ts-ignore
// import { createStackNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import {
//   ActionCable,
//   Cable,
// } from '@kesha-antonov/react-native-action-cable'
import PushNotification from 'react-native-push-notification';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import KeyboardManager from 'react-native-keyboard-manager';
import HomeScreen from '../components/src/HomeScreen';
import InfoPage from '../blocks/info-page/src/InfoPageBlock';
import VideoLibrary from '../blocks/VideoLibrary/src/VideoLibrary';
import SocialMediaAccountLoginScreen from '../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen';
import AudioLibrary from '../blocks/AudioLibrary/src/AudioLibrary';
import MobileAccountLoginBlock from '../blocks/mobile-account-login/src/MobileAccountLoginBlock';
import InstantGiftCards from '../blocks/InstantGiftCards/src/InstantGiftCards';
import CfFaceEffectsIntegration from '../blocks/CfFaceEffectsIntegration/src/CfFaceEffectsIntegration';
import Mentionstagging from '../blocks/Mentionstagging/src/Mentionstagging';
import Maps from '../blocks/maps/src/Maps';
import Favourites from '../blocks/favourites/src/Favourites';
import AddFavourites from '../blocks/favourites/src/AddFavourites';
import AnimationsAndTransition3 from '../blocks/AnimationsAndTransition3/src/AnimationsAndTransition3';
import OTPInputAuth from '../blocks/otp-input-confirmation/src/OTPInputAuth';
import LikeAPost from '../blocks/LikeAPost/src/LikeAPost';
import PrivacySettings from '../blocks/PrivacySettings/src/PrivacySettings';
import AmazonInteractiveVideoService from '../blocks/AmazonInteractiveVideoService/src/AmazonInteractiveVideoService';
import DataSaver from '../blocks/DataSaver/src/DataSaver';
import AdminConsole2 from '../blocks/AdminConsole2/src/AdminConsole2';
import RolesPermissions2 from '../blocks/RolesPermissions2/src/RolesPermissions2';
import Payments from '../blocks/Payments/src/Payments';
import Videos from '../blocks/videos/src/Videos';
import CfLiveChallenges from '../blocks/CfLiveChallenges/src/CfLiveChallenges';
import QrCodes from '../blocks/qrcodes/src/QrCodes';
import HelpCentre from '../blocks/helpcentre/src/HelpCentre';
import HelpCentreQA from '../blocks/helpcentre/src/HelpCentreQA';
import HelpCentreSub from '../blocks/helpcentre/src/HelpCentreSub';
import PaymentAdmin2 from '../blocks/PaymentAdmin2/src/PaymentAdmin2';
import Pushnotifications from '../blocks/pushnotifications/src/Pushnotifications';
import ForgotPassword from '../blocks/forgot-password/src/ForgotPassword';
import ForgotPasswordOTP from '../blocks/forgot-password/src/ForgotPasswordOTP';
import NewPassword from '../blocks/forgot-password/src/NewPassword';
import AudioEditor from '../blocks/AudioEditor/src/AudioEditor';
import CfAppCoinsManagement from '../blocks/CfAppCoinsManagement/src/CfAppCoinsManagement';
import Notifications from '../blocks/notifications/src/Notifications';
import Promocodes from '../blocks/promocodes/src/Promocodes';
import PromocodeDetails from '../blocks/promocodes/src/PromocodeDetails';
import LiveStreaming from '../blocks/AmazonInteractiveVideoService/src/LiveStreaming';
import Analytics from '../blocks/analytics/src/Analytics';
import Customisableusersubscriptions from '../blocks/customisableusersubscriptions/src/Customisableusersubscriptions';
import SubscriptionDetails from '../blocks/customisableusersubscriptions/src/SubscriptionDetails';
import Filteritems from '../blocks/filteritems/src/Filteritems';
import Filteroptions from '../blocks/filteritems/src/Filteroptions';
import PostCreation from '../blocks/postcreation/src/feed/PostCreation';
import Posts from '../blocks/postcreation/src/feed/Posts';
import PostDetails from '../blocks/postcreation/src/feed/PostDetails';
import Invitefriends from '../blocks/invitefriends/src/Invitefriends';
import Trending from '../blocks/Trending/src/Trending';
import AudioEqualiser from '../blocks/AudioEqualiser/src/AudioEqualiser';
import Settings5 from '../blocks/Settings5/src/Settings5';
import UserProfileBasicBlock from '../blocks/user-profile-basic/src/UserProfileBasicBlock';
import Categoriessubcategories from '../blocks/categoriessubcategories/src/Categoriessubcategories';
import UserStatus from '../blocks/userstatus/src/UserStatus';
import VoiceMemos from '../blocks/VoiceMemos/src/VoiceMemos';
import CfGiftDesign from '../blocks/CfGiftDesign/src/CfGiftDesign';
import CountryCodeSelector from '../blocks/country-code-selector/src/CountryCodeSelector';
import CountryCodeSelectorTable from '../blocks/country-code-selector/src/CountryCodeSelectorTable';
import Share from '../blocks/share/src/Share';
import Blockedusers from '../blocks/blockedusers/src/Blockedusers';
import AddBlockeduser from '../blocks/blockedusers/src/AddBlockeduser';
import Subtitles from '../blocks/Subtitles/src/Subtitles';
import UploadMedia2 from '../blocks/UploadMedia2/src/UploadMedia2';
import LanguageSupport from '../blocks/LanguageSupport/src/LanguageSupport';
import Followers from '../blocks/Followers/src/Followers';
import TermsAndConditions from '../blocks/TermsAndConditions/src/TermsAndConditions';
import PhoneNumberInput from '../blocks/mobile-account-registration/src/PhoneNumberInput';
import AdditionalDetailForm from '../blocks/mobile-account-registration/src/AdditionalDetailForm';
import SocialMediaAccountRegistrationScreen from '../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen';
import Location from '../blocks/location/src/Location';
import Contactus from '../blocks/contactus/src/Contactus';
import AddContactus from '../blocks/contactus/src/AddContactus';
import Catalogue from '../blocks/catalogue/src/Catalogue';
import EducationalUserProfile from '../blocks/educational-user-profile/src/EducationalUserProfile';
import Notificationsettings from '../blocks/notificationsettings/src/Notificationsettings';
import Chat9 from '../blocks/Chat9/src/Chat9';
import ChatList from '../blocks/Chat9/src/ChatList';
import ImageScreen from '../blocks/Chat9/src/ImageScreen';
import SearchUserList from '../blocks/Chat9/src/SearchUserList';
import PaymentSummary from '../blocks/CfAppCoinsManagement/src/PaymentSummary'
import EmailAccountRegistration from '../blocks/email-account-registration/src/EmailAccountRegistration';
import Dashboard from '../blocks/dashboard/src/Dashboard';
import ApplePayIntegration from '../blocks/ApplePayIntegration/src/ApplePayIntegration';
// import Splashscreen from '../blocks/splashscreen/src/Splashscreen';
import Hashtags from '../blocks/Hashtags/src/Hashtags';
import AdManager from '../blocks/AdManager/src/AdManager';
import EmailAccountLoginBlock from '../blocks/email-account-login/src/EmailAccountLoginBlock';
import VideoManagement from '../blocks/VideoManagement/src/VideoManagement';
import Search from '../blocks/search/src/Search';
import Comments from '../blocks/comments/src/Comments';
import CreateComment from '../blocks/comments/src/CreateComment';
import VideoEditingTools from '../blocks/VideoEditingTools/src/VideoEditingTools';
import EmailNotifications from '../blocks/EmailNotifications/src/EmailNotifications';
import VisualAnalytics from '../blocks/visualanalytics/src/VisualAnalytics';
import CustomisableUserProfiles from '../blocks/CustomisableUserProfiles/src/CustomisableUserProfiles';
import ContentFlag from '../blocks/ContentFlag/src/ContentFlag';
import Leaderboard from '../blocks/Leaderboard/src/Leaderboard';
import AccountScoreranking from '../blocks/AccountScoreranking/src/AccountScoreranking';
import InvoiceBilling from '../blocks/InvoiceBilling/src/InvoiceBilling';
import CameraAccess from '../blocks/cameraaccess/src/CameraAccess';
import PaymentAdmin from '../blocks/PaymentAdmin/src/PaymentAdmin';
import PhotoFilters from '../blocks/PhotoFilters/src/PhotoFilters';
import Gamification from '../blocks/Gamification/src/Gamification';
import PeopleManagement2 from '../blocks/PeopleManagement2/src/PeopleManagement2';
import LiveFeedCapture from '../blocks/LiveFeedCapture/src/LiveFeedCapture';
import Gallery from '../blocks/Gallery/src/Gallery';
import StripeIntegration from '../blocks/stripepayments/src/StripeIntegration';
import RealtimeUpdates from '../blocks/RealtimeUpdates/src/RealtimeUpdates';
import BulkUploading from '../blocks/bulkuploading/src/BulkUploading';
import FacialTracking from '../blocks/FacialTracking/src/FacialTracking';
import LinkShare from '../blocks/LinkShare/src/LinkShare';
import Scoring from '../blocks/Scoring/src/Scoring';
import AnimationsAndTransition2 from '../blocks/AnimationsAndTransition2/src/AnimationsAndTransition2';
import VideoTrimming from '../blocks/VideoTrimming/src/VideoTrimming';
import audio from '../blocks/VideoTrimming/src/audio';
import AddFriends from '../blocks/AddFriends/src/AddFriends';
import LiveFeedScheduling from '../blocks/LiveFeedScheduling/src/LiveFeedScheduling';
import CfGroupLive from '../blocks/CfGroupLive/src/CfGroupLive';
import RolesPermissions from '../blocks/RolesPermissions/src/RolesPermissions';
import AdminConsole from '../blocks/AdminConsole/src/AdminConsole';
import DownloadOptions from '../blocks/DownloadOptions/src/DownloadOptions';
import EmailNotifications2 from '../blocks/EmailNotifications2/src/EmailNotifications2';
import ElasticSearch from '../blocks/ElasticSearch/src/ElasticSearch';
import PerformanceTracker from '../blocks/PerformanceTracker/src/PerformanceTracker';
import Bookmark2 from '../blocks/Bookmark2/src/Bookmark2';
import Upvotedownvote from '../blocks/Upvotedownvote/src/Upvotedownvote';
import Login from '../blocks/mobile-account-login/src/Login';
import LoginSuccess from '../blocks/mobile-account-login/src/LoginSuccess';
import PrivacyPolicy from '../blocks/PrivacySettings/src/PrivacyPolicy/PrivacyPolicy';
import HelpCenter from '../blocks/helpcentre/src/HelpCenter';
import OTPInput from '../blocks/otp-input-confirmation/src/OTPInput';

import Postsubmit from '../blocks/postcreation/src/feed/Postsubmit';
import Setvisibility from '../blocks/postcreation/src/feed/Setvisibility';
import Selectaudience from '../blocks/postcreation/src/feed/Selectaudience';
import CommentSettings from '../blocks/postcreation/src/feed/CommentSetting';
import BottomTabScreen from '../components/src/BottomTab';
import { Alert, Linking, Platform, StatusBar, View, Text, DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-toast-message';
import { getStorageData } from '../framework/src/Utilities';
import i18n from 'i18n-js';
import AppVersion from './AppVersioning';
import { setNavigator } from '../framework/src/Utilities';
import TakeABreakReminderPopup from './TakeABreakReminderPopup';
import NotifService from '../components/src/Notification/NotifService';
import {
  notificationListener,
  requestUserPermission,
} from '../components/src/Notification/pushNotificationhelper';
import { setStorageData } from '../framework/src/Utilities';
import NavigationService from './NavigationService';
import BedTimeReminder from './BedTimeReminderPopup';
import Setschedule from '../blocks/postcreation/src/feed/setSchedule';
import SelectLocation from '../blocks/postcreation/src/feed/SelectLocation';
import PaypalController from '../blocks/stripepayments/src/PaypalController';
import ExceptionHandler from "./ExceptionHandler";
import RNRestart from 'react-native-restart';
import { apiCall } from "../components/src/ApiCall";
import EndLive from '../blocks/AmazonInteractiveVideoService/src/EndLive';
import PayPalView from '../blocks/stripepayments/src/Paypal';
import { runEngine } from "../framework/src/RunEngine";
import { Message } from '../framework/src/Message';
import MessageEnum, { getName } from '../framework/src/Messages/MessageEnum';
import { IBlock } from '../framework/src/IBlock';
const { baseURL } = require("../framework/src/config.js")



const Stack = createStackNavigator();

if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: 'HomeScreen',
  };

  const homeScreen = new HomeScreen(defaultProps);
}

export const navigationRef = React.createRef();

export function App() {
  const [tokenExist, setTokenExist] = useState(false);

  const receive = useCallback(async (from: string, message: Message) => {
    // Customizable Area Start
    runEngine.debugLog("Message Received--*************", message);
    // Customizable Area End
  }, []);


  useEffect(async () => {
    const authToken = (await getStorageData("authToken", false)) || "";
    console.log("------user_token = -------------", authToken)
    setTokenExist(authToken);
    SplashScreen.hide();
    const subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    // Create a mock block object with just a `receive` method
    const blockInstance = { receive } as unknown as IBlock;

    // Attach the block
    runEngine.attachBuildingBlock(blockInstance, subScribedMessages);

  }, [])

  // ExceptionHandler.setNativeExceptionHandler(error => {
  //     exceptionApiCall("android-native", "Native Exception", error as string)
  // })

  const HomeStackNavigation = (props: any) => {
    return (
      <Stack.Navigator initialRouteName={tokenExist ? "BottomTabScreen" : "Login"}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false, title: 'Home' }}
        />
        <Stack.Screen
          name="VisualAnalytics"
          component={VisualAnalytics}
          options={{ headerShown: false, title: 'VisualAnalytics' }}
        />
        <Stack.Screen
          name="CustomisableUserProfiles"
          component={CustomisableUserProfiles}
          options={{ headerShown: false, title: 'CustomisableUserProfiles' }}
        />
        <Stack.Screen
          name="ContentFlag"
          component={ContentFlag}
          options={{ headerShown: false, title: 'ContentFlag' }}
        />
        <Stack.Screen
          name="Leaderboard"
          component={Leaderboard}
          options={{ headerShown: false, title: 'Leaderboard' }}
        />
        <Stack.Screen
          name="AccountScoreranking"
          component={AccountScoreranking}
          options={{ headerShown: false, title: 'AccountScoreranking' }}
        />
        <Stack.Screen
          name="InvoiceBilling"
          component={InvoiceBilling}
          options={{ headerShown: false, title: 'InvoiceBilling' }}
        />
        <Stack.Screen
          name="CameraAccess"
          component={CameraAccess}
          options={{ headerShown: false, title: 'CameraAccess' }}
        />
        <Stack.Screen
          name="PaymentAdmin"
          component={PaymentAdmin}
          options={{ headerShown: false, title: 'PaymentAdmin' }}
        />
        <Stack.Screen
          name="PhotoFilters"
          component={PhotoFilters}
          options={{ headerShown: false, title: 'PhotoFilters' }}
        />
        <Stack.Screen
          name="Gamification"
          component={Gamification}
          options={{ headerShown: false, title: 'Gamification' }}
        />
        <Stack.Screen
          name="PeopleManagement2"
          component={PeopleManagement2}
          options={{ headerShown: false, title: 'PeopleManagement2' }}
        />
        <Stack.Screen
          name="LiveFeedCapture"
          component={LiveFeedCapture}
          options={{ headerShown: false, title: 'LiveFeedCapture' }}
        />
        <Stack.Screen
          name="Gallery"
          component={Gallery}
          options={{ headerShown: false, title: 'Gallery' }}
        />
        <Stack.Screen
          name="StripeIntegration"
          component={PayPalView}
          options={{ headerShown: false, title: 'StripeIntegration' }}
        />
        <Stack.Screen
          name="RealtimeUpdates"
          component={RealtimeUpdates}
          options={{ headerShown: false, title: 'RealtimeUpdates' }}
        />
        <Stack.Screen
          name="BulkUploading"
          component={BulkUploading}
          options={{ headerShown: false, title: 'BulkUploading' }}
        />
        <Stack.Screen
          name="FacialTracking"
          component={FacialTracking}
          options={{ headerShown: false, title: 'FacialTracking' }}
        />
        <Stack.Screen
          name="LinkShare"
          component={LinkShare}
          options={{ headerShown: false, title: 'LinkShare' }}
        />
        <Stack.Screen
          name="Scoring"
          component={Scoring}
          options={{ headerShown: false, title: 'Scoring' }}
        />
        <Stack.Screen
          name="AnimationsAndTransition2"
          component={AnimationsAndTransition2}
          options={{ headerShown: false, title: 'AnimationsAndTransition2' }}
        />
        <Stack.Screen
          name="VideoTrimming"
          component={VideoTrimming}
          options={{ headerShown: false, title: 'VideoTrimming' }}
        />
        <Stack.Screen
          name="AddFriends"
          component={AddFriends}
          options={{ headerShown: false, title: 'AddFriends' }}
        />
        <Stack.Screen
          name="LiveFeedScheduling"
          component={LiveFeedScheduling}
          options={{ headerShown: false, title: 'LiveFeedScheduling' }}
        />
        <Stack.Screen
          name="CfGroupLive"
          component={CfGroupLive}
          options={{ headerShown: false, title: 'CfGroupLive' }}
        />
        <Stack.Screen
          name="RolesPermissions"
          component={RolesPermissions}
          options={{ headerShown: false, title: 'RolesPermissions' }}
        />
        <Stack.Screen
          name="AdminConsole"
          component={AdminConsole}
          options={{ headerShown: false, title: 'AdminConsole' }}
        />
        <Stack.Screen
          name="DownloadOptions"
          component={DownloadOptions}
          options={{ headerShown: false, title: 'DownloadOptions' }}
        />
        <Stack.Screen
          name="EmailNotifications2"
          component={EmailNotifications2}
          options={{ headerShown: false, title: 'EmailNotifications2' }}
        />
        <Stack.Screen
          name="ElasticSearch"
          component={ElasticSearch}
          options={{ headerShown: false, title: 'ElasticSearch' }}
        />
        <Stack.Screen
          name="PerformanceTracker"
          component={PerformanceTracker}
          options={{ headerShown: false, title: 'PerformanceTracker' }}
        />
        <Stack.Screen
          name="Bookmark2"
          component={Bookmark2}
          options={{ headerShown: false, title: 'Bookmark2' }}
        />
        <Stack.Screen
          name="Upvotedownvote"
          component={Upvotedownvote}
          options={{ headerShown: false, title: 'Upvotedownvote' }}
        />
        <Stack.Screen
          name="VideoLibrary"
          component={VideoLibrary}
          options={{ headerShown: false, title: 'VideoLibrary' }}
        />
        <Stack.Screen
          name="SocialMediaAccountLoginScreen"
          component={SocialMediaAccountLoginScreen}
          options={{ headerShown: false, title: 'SocialMediaAccountLoginScreen' }}
        />
        <Stack.Screen
          name="AudioLibrary"
          component={AudioLibrary}
          options={{ headerShown: false, title: 'AudioLibrary' }}
        />
        <Stack.Screen
          name="MobileAccountLoginBlock"
          component={MobileAccountLoginBlock}
          options={{ headerShown: false, title: 'Home' }}
        />
        <Stack.Screen
          name="InstantGiftCards"
          component={InstantGiftCards}
          options={{ headerShown: false, title: 'InstantGiftCards' }}
        />
        <Stack.Screen
          name="CfFaceEffectsIntegration"
          component={CfFaceEffectsIntegration}
          options={{ headerShown: false, title: 'CfFaceEffectsIntegration' }}
        />
        <Stack.Screen
          name="Mentionstagging"
          component={Mentionstagging}
          options={{ headerShown: false, title: 'Mentionstagging' }}
        />
        <Stack.Screen
          name="Maps"
          component={Maps}
          options={{ headerShown: false, title: 'Maps' }}
        />
        <Stack.Screen
          name="Favourites"
          component={Favourites}
          options={{ headerShown: false, title: 'Favourites' }}
        />
        <Stack.Screen
          name="AddFavourites"
          component={AddFavourites}
          options={{ headerShown: false, title: 'AddFavourites' }}
        />
        <Stack.Screen
          name="AnimationsAndTransition3"
          component={AnimationsAndTransition3}
          options={{ headerShown: false, title: 'AnimationsAndTransition3' }}
        />
        <Stack.Screen
          name="OTPInputAuth"
          component={OTPInputAuth}
          options={{ headerShown: false, title: 'OTPInputAuth' }}
        />
        <Stack.Screen
          name="LikeAPost"
          component={LikeAPost}
          options={{ headerShown: false, title: 'LikeAPost' }}
        />
        <Stack.Screen
          name="PrivacySettings"
          component={PrivacySettings}
          options={{ headerShown: false, title: 'PrivacySettings' }}
        />
        <Stack.Screen
          name="DataSaver"
          component={DataSaver}
          options={{ headerShown: false, title: 'DataSaver' }}
        />
        <Stack.Screen
          name="AdminConsole2"
          component={AdminConsole2}
          options={{ headerShown: false, title: 'AdminConsole2' }}
        />
        <Stack.Screen
          name="RolesPermissions2"
          component={RolesPermissions2}
          options={{ headerShown: false, title: 'RolesPermissions2' }}
        />
        <Stack.Screen
          name="Payments"
          component={Payments}
          options={{ headerShown: false, title: 'Payments' }}
        />
        <Stack.Screen
          name="Videos"
          component={Videos}
          options={{ headerShown: false, title: 'Videos' }}
        />
        <Stack.Screen
          name="CfLiveChallenges"
          component={CfLiveChallenges}
          options={{ headerShown: false, title: 'CfLiveChallenges', gestureEnabled: false }}
        />
        <Stack.Screen
          name="QrCodes"
          component={QrCodes}
          options={{ headerShown: false, title: 'QrCodes' }}
        />
        <Stack.Screen
          name="HelpCentre"
          component={HelpCentre}
          options={{ headerShown: false, title: 'Help Centre' }}
        />
        <Stack.Screen
          name="HelpCentreQA"
          component={HelpCentreQA}
          options={{ headerShown: false, title: 'HelpCentreQA' }}
        />
        <Stack.Screen
          name="HelpCentreSub"
          component={HelpCentreSub}
          options={{ headerShown: false, title: 'HelpCentreSub' }}
        />
        <Stack.Screen
          name="PaymentAdmin2"
          component={PaymentAdmin2}
          options={{ headerShown: false, title: 'PaymentAdmin2' }}
        />
        <Stack.Screen
          name="Pushnotifications"
          component={Pushnotifications}
          options={{ headerShown: false, title: 'Pushnotifications' }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false, title: 'ForgotPassword' }}
        />
        <Stack.Screen
          name="ForgotPasswordOTP"
          component={ForgotPasswordOTP}
          options={{ headerShown: false, title: 'ForgotPasswordOTP' }}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{ headerShown: false, title: 'NewPassword' }}
        />
        <Stack.Screen
          name="AudioEditor"
          component={AudioEditor}
          options={{ headerShown: false, title: 'AudioEditor' }}
        />
        <Stack.Screen
          name="CfAppCoinsManagement"
          component={CfAppCoinsManagement}
          options={{ headerShown: false, title: 'CfAppCoinsManagement' }}
        />
        {/* <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{headerShown: false, title: 'Notifications'}}
      /> */}
        <Stack.Screen
          name="Promocodes"
          component={Promocodes}
          options={{ headerShown: false, title: 'Promocodes' }}
        />
        <Stack.Screen
          name="PromocodeDetails"
          component={PromocodeDetails}
          options={{ headerShown: false, title: 'PromocodeDetails' }}
        />
        <Stack.Screen
          name="LiveStreaming"
          component={LiveStreaming}
          options={{ headerShown: false, title: 'LiveStreaming', gestureEnabled: false }}
        />
        <Stack.Screen
          name="EndLive"
          component={EndLive}
          options={{ headerShown: false, title: 'EndLive', gestureEnabled: false }}
        />
        <Stack.Screen
          name='AmazonInteractiveVideoService'
          component={AmazonInteractiveVideoService}
          options={{ headerShown: false, title: 'AmazonInteractiveVideoService' }}
        />
        <Stack.Screen
          name="Analytics"
          component={Analytics}
          options={{ headerShown: false, title: 'Analytics' }}
        />
        <Stack.Screen
          name="Customisableusersubscriptions"
          component={Customisableusersubscriptions}
          options={{ headerShown: false, title: 'Customisableusersubscriptions' }}
        />
        <Stack.Screen
          name="SubscriptionDetails"
          component={SubscriptionDetails}
          options={{ headerShown: false, title: 'SubscriptionDetails' }}
        />
        <Stack.Screen
          name="Filteritems"
          component={Filteritems}
          options={{ headerShown: false, title: 'Filteritems' }}
        />
        <Stack.Screen
          name="Filteroptions"
          component={Filteroptions}
          options={{ headerShown: false, title: 'Filteroptions' }}
        />
        <Stack.Screen
          name="PostCreation"
          component={PostCreation}
          options={{ headerShown: false, title: 'PostCreation' }}
        />
        <Stack.Screen
          name="PaymentSummary"
          component={PaymentSummary}
          options={{ headerShown: false, title: 'PaymentSummary' }}
        />
        <Stack.Screen
          name="Posts"
          component={Posts}
          options={{ headerShown: false, title: 'Posts' }}
        />
        <Stack.Screen
          name="PostDetails"
          component={PostDetails}
          options={{ headerShown: false, title: 'PostDetails' }}
        />
        <Stack.Screen
          name="Invitefriends"
          component={Invitefriends}
          options={{ headerShown: false, title: 'Invitefriends' }}
        />
        <Stack.Screen
          name="Trending"
          component={Trending}
          options={{ headerShown: false, title: 'Trending' }}
        />
        <Stack.Screen
          name="AudioEqualiser"
          component={AudioEqualiser}
          options={{ headerShown: false, title: 'AudioEqualiser' }}
        />
        <Stack.Screen
          name="Settings5"
          component={Settings5}
          options={{ headerShown: false, title: 'Settings5' }}
        />
        <Stack.Screen
          name="UserProfileBasicBlock"
          component={UserProfileBasicBlock}
          options={{ headerShown: false, title: 'UserProfileBasicBlock' }}
        />
        <Stack.Screen
          name="Categoriessubcategories"
          component={Categoriessubcategories}
          options={{ headerShown: false, title: 'Categoriessubcategories' }}
        />
        <Stack.Screen
          name="UserStatus"
          component={UserStatus}
          options={{ headerShown: false, title: 'UserStatus' }}
        />
        <Stack.Screen
          name="VoiceMemos"
          component={VoiceMemos}
          options={{ headerShown: false, title: 'VoiceMemos' }}
        />
        <Stack.Screen
          name="CfGiftDesign"
          component={CfGiftDesign}
          options={{ headerShown: false, title: 'CfGiftDesign' }}
        />
        <Stack.Screen
          name="CountryCodeSelector"
          component={CountryCodeSelector}
          options={{ headerShown: false, title: 'CountryCodeSelector' }}
        />
        <Stack.Screen
          name="CountryCodeSelectorTable"
          component={CountryCodeSelectorTable}
          options={{ headerShown: false, title: 'CountryCodeSelectorTable' }}
        />
        <Stack.Screen
          name="Share"
          component={Share}
          options={{ title: 'Share' }}
        />
        <Stack.Screen
          name="Blockedusers"
          component={Blockedusers}
          options={{ title: 'Blockedusers' }}
        />
        <Stack.Screen
          name="AddBlockeduser"
          component={AddBlockeduser}
          options={{ title: 'AddBlockeduser' }}
        />
        <Stack.Screen
          name="Subtitles"
          component={Subtitles}
          options={{ title: 'Subtitles' }}
        />
        <Stack.Screen
          name="UploadMedia2"
          component={UploadMedia2}
          options={{ title: 'UploadMedia2' }}
        />
        <Stack.Screen
          name="LanguageSupport"
          component={LanguageSupport}
          options={{ title: 'LanguageSupport' }}
        />
        <Stack.Screen
          name="Followers"
          component={Followers}
          options={{ headerShown: false, title: 'Followers' }}
        />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
          options={{ headerShown: false, title: 'TermsAndConditions' }}
        />
        <Stack.Screen
          name="PhoneNumberInput"
          component={PhoneNumberInput}
          options={{ headerShown: false, title: 'PhoneNumberInput' }}
        />
        <Stack.Screen
          name="AdditionalDetailForm"
          component={AdditionalDetailForm}
          options={{ headerShown: false, title: 'AdditionalDetailForm' }}
        />
        <Stack.Screen
          name="SocialMediaAccountRegistrationScreen"
          component={SocialMediaAccountRegistrationScreen}
          options={{
            title: 'SocialMediaAccountRegistrationScreen',
          }}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          options={{ title: 'Location', headerShown: false }}
        />
        <Stack.Screen
          name="Contactus"
          component={Contactus}
          options={{ title: 'Contactus' }}
        />
        <Stack.Screen
          name="AddContactus"
          component={AddContactus}
          options={{ title: 'AddContactus' }}
        />
        <Stack.Screen
          name="Catalogue"
          component={Catalogue}
          options={{ title: 'Catalogue' }}
        />
        <Stack.Screen
          name="EducationalUserProfile"
          component={EducationalUserProfile}
          options={{ title: 'EducationalUserProfile' }}
        />
        <Stack.Screen
          name="Notificationsettings"
          component={Notificationsettings}
          options={{ title: 'Notificationsettings' }}
        />
        <Stack.Screen
          name="Chat9"
          component={Chat9}
          options={{ headerShown: false, title: 'Chat9' }}
        />
        <Stack.Screen
          name="ChatList"
          component={ChatList}
          options={{ headerShown: false, title: 'ChatList' }}
        />
        <Stack.Screen
          name="ImageScreen"
          component={ImageScreen}
          options={{ headerShown: false, title: 'ImageScreen' }}
        />
        <Stack.Screen
          name="SearchUserList"
          component={SearchUserList}
          options={{ headerShown: false, title: 'SearchUserList' }}
        />
        <Stack.Screen
          name="EmailAccountRegistration"
          component={EmailAccountRegistration}
          options={{ title: 'EmailAccountRegistration' }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: 'Dashboard' }}
        />
        <Stack.Screen
          name="ApplePayIntegration"
          component={ApplePayIntegration}
          options={{ title: 'ApplePayIntegration' }}
        />
        <Stack.Screen
          name="Hashtags"
          component={Hashtags}
          options={{ title: 'Hashtags' }}
        />
        <Stack.Screen
          name="AdManager"
          component={AdManager}
          options={{ title: 'AdManager' }}
        />
        <Stack.Screen
          name="EmailAccountLoginBlock"
          component={EmailAccountLoginBlock}
          options={{ title: 'EmailAccountLoginBlock' }}
        />
        <Stack.Screen
          name="VideoManagement"
          component={VideoManagement}
          options={{ title: 'VideoManagement' }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ title: 'Search' }}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{ headerShown: false, title: 'Comments' }}
        />
        <Stack.Screen
          name="CreateComment"
          component={CreateComment}
          options={{ title: 'CreateComment' }}
        />
        <Stack.Screen
          name="VideoEditingTools"
          component={VideoEditingTools}
          options={{ title: 'VideoEditingTools' }}
        />
        <Stack.Screen
          name="EmailNotifications"
          component={EmailNotifications}
          options={{ title: 'EmailNotifications' }}
        />
        <Stack.Screen
          name="Postsubmit"
          component={Postsubmit}
          options={{ headerShown: false, title: 'Postsubmit' }}
        />
        <Stack.Screen
          name="Setvisibility"
          component={Setvisibility}
          options={{ title: 'Setvisibility', headerShown: false }}
        />
        <Stack.Screen
          name="Setschedule"
          component={Setschedule}
          options={{ title: 'Setschedule', headerShown: false }}
        />
        <Stack.Screen
          name="SelectLocation"
          component={SelectLocation}
          options={{ title: 'SelectLocation', headerShown: false }}
        />
        <Stack.Screen
          name="Selectaudience"
          component={Selectaudience}
          options={{ title: 'Selectaudience', headerShown: false }}
        />
        <Stack.Screen
          name="CommentSettings"
          component={CommentSettings}
          options={{ title: 'Comments', headerShown: false }}
        />
        <Stack.Screen
          name="BottomTabScreen"
          component={BottomTabScreen}
          options={{ headerShown: false, title: 'BottomTabScreen', }}
        />
        <Stack.Screen
          name="audio"
          component={audio}
          options={{ headerShown: false, title: 'audio' }}
        />
        <Stack.Screen
          name="InfoPage"
          component={InfoPage}
          options={{ title: 'Info' }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, title: 'Login' }}
        />
        <Stack.Screen
          name="LoginSuccess"
          component={LoginSuccess}
          options={{ headerShown: false, title: 'LoginSuccess' }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{ headerShown: false, title: 'PrivacyPolicy' }}
        />
        <Stack.Screen
          name="HelpCenter"
          component={HelpCenter}
          options={{ headerShown: false, title: 'HelpCenter' }}
        />
        <Stack.Screen
          name="OTPInput"
          component={OTPInput}
          options={{ headerShown: false, title: 'OTPInput' }}
        />
      </Stack.Navigator>
    );
  };

  const reporter = (error: Error) => {
    if (error.stack) {
      exceptionApiCall(`${Platform.OS}-js`, error.message, error.stack as string)
    }
  };

  const errorHandler = (error: Error, isFatal: boolean) => {
    reporter(error)
    // ==== !!!!! IMPORTANT: The function can be activated later for now it can stay here. !!!! ====
    /*  if (isFatal) {
          Alert.alert(
            'Unexpected error occurred',
            `
      Error: ${(isFatal) ? 'Fatal:' : ''} ${error.name} ${error.message}

      We will need to restart the app.
      `,
            [{
                text: 'Restart',
                onPress: () => {
                    RNRestart.Restart();
                }
            }]
          );
      } else {
          console.log(error); // So that we can see it in the ADB logs in case of Android if needed
      }*/
  };

  // ExceptionHandler.setJSExceptionHandler(errorHandler);

  // ExceptionHandler.setNativeExceptionHandler((errorString: string) => {
  //     if (Platform.OS == "android") {
  //         exceptionApiCall("android-native", "Native Error", errorString)
  //     }
  // });

  const exceptionApiCall = (exception_thread: string, exception_message: string, exception_stack: string) => {
    const url = `${baseURL}/bx_block_admin/ui_exception_thread`
    const data = {
      exception_thread,
      exception_message,
      exception_stack
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  const setNavRef = (ref: any) => {
    if (ref) {
      setNavigator(ref);
    }
  };

  const config = {
    screens: {
      Pushnotifications: 'Pushnotifications',
    },
  };


  const checkValidLink = (url: string) => {
    const isLiveLink = url.includes('Livestreaming');
    if (isLiveLink) return url.split("Livestreaming?").length > 1;
    const splittedArray = url.split('id=');

    return splittedArray.length > 1;
  }

  const handleDeeplinks = (innerLink: string) => {
    // Handle the deeplinking here
    if (!checkValidLink(innerLink)) {
      return
    }
    console.log(".....................2222223..................", innerLink.includes("user"))
    if (innerLink.includes("user") && navigationRef.current) {
      const id = innerLink.split('id=')[1];
      const newData = { attributes: { account_id: id } }
      navigationRef.current?.dispatch(StackActions.push('UserProfileBasicBlock', {
        data: newData
      }));
    }
    else if (innerLink.includes("feeds")) {
      const id = innerLink.split('id=')[1];
      setTimeout(() => {
        navigationRef.current?.dispatch(StackActions.push('Comments', {
          type: 'Notification',
          isFromNotification: false,
          post_id: id,
          isCommentPost: false,
        }));
      }, 5000);
    } else if (innerLink.includes("profile")) {
      const id = innerLink.split('id=')[1];
      setTimeout(() => {
        const newData = { attributes: { account_id: id } }
        navigationRef.current?.dispatch(StackActions.push('UserProfileBasicBlock', {
          data: newData
        }));
      }, 5000);
    } else if (innerLink.includes("Livestreaming")) {
      const liveData = innerLink.split('Livestreaming?')[1];
      const paramArray = liveData.split("&");
      let stageData = {};
      stageData = paramArray.reduce((params, param) => {
        const [key, value] = param.split('=');
        params[key] = value;
        return params;
      }, stageData);
      stageData = { ...stageData, isViewer: true, name: 'Live stream' };
      setTimeout(() => {
        navigationRef.current?.dispatch(StackActions.push('LiveStreaming', {
          stageData
        }));
      }, 5000);
    }
  }
  useEffect(() => {
    const handleUrl = (event: { url: string; }) => {
      if (event.url) {
        handleDeeplinks(event.url)
      }
    }
    Linking.addEventListener('url', handleUrl);

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeeplinks(url);
      }
    });

    // When the component is unmounted, remove the listener
    return () => {
      Linking.removeEventListener('url', handleUrl);
    };
  }, []);
  // const linking = {
  //   prefixes: [
  //     'https://liketiktokapp-255799-ruby.b255799.dev.eastus.az.svc.builder.cafe',
  //     'liketiktokapp://',
  //   ],
  //   config,
  // };

  useEffect(() => {
    requestUserPermission();
    //   messaging().onMessage(async remoteMessage => {
    //     console.log('this one-=-==-=->>');
    //    Alert.alert( JSON.stringify(remoteMessage.notification?.title), JSON.stringify(remoteMessage.notification?.body));
    //    remoteMessage.notification
    //  });

    console.log('+++++++++++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  }, []);
  const navigationRef = useRef(null);

  const showNotification = (notification: any) => {
    console.log("///////////////////////////..........", notification)
    if (Platform.OS !== 'ios') {
      PushNotification.localNotification({
        title: notification.title,
        message: notification.body!,
      });
    } else {
      PushNotificationIOS.addNotificationRequest({
        id: notification.messageId,
        body: notification?.notification?.body || "",
        userInfo: notification?.data
      });
    }
  };

  useEffect(() => {
    const type = 'notification';

    PushNotificationIOS.addEventListener(type, payload => {
      console.log('this is payload', payload);
    });

    messaging().onMessage(response => {
      console.log(JSON.stringify(response),);
      if (Platform.OS !== 'ios') {
        showNotification(response.notification!);
        return;
      }
      // 2RGA376WWF


      console.log('this is response-----------', response);
      PushNotificationIOS.requestPermissions().then(() =>
        showNotification(response!),
      );
    });
  }, []);

  useEffect(() => {
    new NotifService(onRegister, onNotif);

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(
        'Received background message @@@@@@@@@@@@@@@@@@@@@',
        remoteMessage,
      );
      // Handle the notification here
    });

    // messaging().getInitialNotification()
    //   .then((remoteMessage) => {
    //     if (remoteMessage) {
    //       const { data } = remoteMessage;
    //       if (data && data.type && data.type === "news") {
    //         const navigation = this.props.navigation;
    //         if (Platform.OS !== "ios") {
    //           navigation.navigate("ChatList", { navigate: true, id: data.id });
    //         }
    //       }
    //     }
    //   }
    //   );

    messaging().onMessage(async remoteMessage => {
      EventRegister.emit('backPressed', remoteMessage);
      console.log(
        'Received foreground message ####################',
        remoteMessage,
      );

      const payload = remoteMessage.data?.payload ? JSON.parse(remoteMessage.data.payload) : null;
      if (payload.data?.notify_type == "livestream" && payload.data?.invite_type == 'cohost') {
        DeviceEventEmitter.emit('CohostInvited', payload.data)
      }
      // Handle the notification here

    });

    messaging()
      .getInitialNotification()
      .then(initialMessage => {
        setTimeout(() => {
          doClick(initialMessage);
        }, 5000);
      });

    messaging().onNotificationOpenedApp(initialMessage => {
      console.log("============3======================", initialMessage)
      setTimeout(() => {
        doClick(initialMessage);
      }, 5000);
    });
  }, []);

  const doClick = initialMessage => {
    if (initialMessage?.data?.payload && initialMessage?.data?.payload !== undefined && initialMessage?.data?.payload !== null) {
      const data = JSON.parse(initialMessage?.data?.payload)?.data
      const notify_type = data?.notify_type
      if (notify_type === "comment" || notify_type === "like") { // this is for comment or replay on comment and like
        navigationRef.current?.dispatch(StackActions.push('Comments', {
          type: 'Notification',
          isFromNotification: false,
          account_id: data.account_id,
          post_id: data.post_id,
          isCommentPost: notify_type === "comment",
        }));
      }
      else if (notify_type === "post tagging") { // this is for tag on post
        navigationRef.current?.dispatch(StackActions.push('Comments', {
          type: 'Notification',
          isFromNotification: false,
          account_id: data.sender_user_id,
          post_id: data.post_id,
          isCommentPost: false,
        }));
      } else if (notify_type === "Post") {
        navigationRef.current?.dispatch(StackActions.push('Comments', {
          type: 'Notification',
          isFromNotification: false,
          account_id: data.account_id,
          post_id: data.post_id,
          isCommentPost: false,
        }));
      } else if (notify_type === "following") { // this is for user follow
        const newData = { attributes: { account_id: data.sender_user_id } }
        const messageTitle = data?.message;
        const searchText = "sent you a follow request";
        const isRequested = typeof (messageTitle) === "string" && messageTitle.includes(searchText);
        if (isRequested) {
          navigationRef.current?.dispatch(StackActions.push('BottomTabScreen', {
            screen: 'Inbox',
            params: { screen: 'FollowRequest' },
          }));
          return;
        }
        navigationRef.current?.dispatch(StackActions.push('UserProfileBasicBlock', {
          data: newData
        }));
        // } else if (message.includes("tagged you in a  post")) { // ####### need to check for user request #######
      } else if (notify_type === "chat") {
        navigationRef.current?.dispatch(StackActions.push('Chat9', {
          acc_id: data?.account_id
        }));
        //TODO: Need to navigate to chat but I need the backend to send me the chat id
      }
      else if (notify_type === "livestream") { // this is for live stream invite
        navigationRef.current?.dispatch(StackActions.push('BottomTabScreen', {
          screen: 'Inbox',
          params: { screen: 'Notifications' },
        }));
      }
      else if (notify_type === "live challenge") { // this is for live challenge invite
        navigationRef.current?.dispatch(StackActions.push('BottomTabScreen', {
          screen: 'Inbox',
          params: { screen: 'Notifications' },
        }));
      }
    }
  };


  const onRegister = async (token: any) => {
    let fcmToken = Platform.OS === "android" ? token.token : await messaging().getToken();
    // console.log('this is fcm token-=-=--=->>>>', fcmToken);
    setStorageData('fcmToken', fcmToken);
    // StoreConstantValues.USER_DEVICE_TOKEN = token.token;
  };

  const onNotif = (notif: any) => {
    console.log('onNotif----------------------- _____' + JSON.stringify(notif), notif?.userInteraction && notif?.foreground);
    if (notif?.userInteraction && notif?.foreground) {
      doClick(notif);
    }
  };

  const [language, setlanguage] = useState('en' as any);
  useEffect(() => {
    getLanguage();
    getGiftAssets();
  }, []);

  const getGiftAssets = async () => {
    await setStorageData('getGiftAssets', "true");
  }

  (window as any).changeLanguage = async () => {
    let selectedLanguage = await getStorageData('SelectedLng');
    if (selectedLanguage && selectedLanguage == 'ar') {
      setlanguage('ar');
    } else {
      setlanguage('en');
    }
    getLanguage();
  };

  const getLanguage = async () => {
    let selectedLanguage = await getStorageData('SelectedLng');
    if (selectedLanguage && selectedLanguage == 'ar') {
      i18n.locale = 'ar';
    } else {
      i18n.locale = 'en';
    }
  };

  console.disableYellowBox = true;
  return (
    <NavigationContainer
      // ref={(navigatorRef: any) => {
      //   NavigationService.setTopLevelNavigator(navigatorRef);
      // }}
      ref={navigationRef}
    // linking={linking}
    // ref={(ref: any) => {
    //   setNavRef(ref);
    // }}
    >
      <StatusBar
        barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="#000"
        networkActivityIndicatorVisible
      />
      <BedTimeReminder />
      {language == 'en' ? <HomeStackNavigation /> : <HomeStackNavigation />}
      {/* <AppVersion /> */}
      <TakeABreakReminderPopup />
    </NavigationContainer>
  );
}
