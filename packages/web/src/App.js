// App.js - WEB
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-firebase';

import WebRoutesGenerator from '../../components/src/NativeWebRouteWrapper';
import { ModalContainer } from 'react-router-modal';
// import HomeScreen from '../../components/src/HomeScreen';
import TopNav from '../../components/src/TopNav';
// import crashlytics from '@react-native-firebase/crashlytics';

// import InfoPage from '../../blocks/info-page/src/InfoPageBlock';
// import AlertBlock from '../../blocks/alert/src/AlertBlock.web';
// import VideoLibrary from '../../blocks/VideoLibrary/src/VideoLibrary';
// import SocialMediaAccountLoginScreen from '../../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen';
// import AudioLibrary from '../../blocks/AudioLibrary/src/AudioLibrary';
// import MobileAccountLoginBlock from '../../blocks/mobile-account-login/src/MobileAccountLoginBlock';
// import InstantGiftCards from '../../blocks/InstantGiftCards/src/InstantGiftCards';
// import CfFaceEffectsIntegration from '../../blocks/CfFaceEffectsIntegration/src/CfFaceEffectsIntegration';
// import Mentionstagging from '../../blocks/Mentionstagging/src/Mentionstagging';
// import Maps from '../../blocks/maps/src/Maps';
// import Favourites from '../../blocks/favourites/src/Favourites';
// import AddFavourites from '../../blocks/favourites/src/AddFavourites';
// import AnimationsAndTransition3 from '../../blocks/AnimationsAndTransition3/src/AnimationsAndTransition3';
// import OTPInputAuth from '../../blocks/otp-input-confirmation/src/OTPInputAuth';
// import LikeAPost from '../../blocks/LikeAPost/src/LikeAPost';
// import PrivacySettings from '../../blocks/PrivacySettings/src/PrivacySettings';
// import DataSaver from '../../blocks/DataSaver/src/DataSaver';
// import AdminConsole2 from '../../blocks/AdminConsole2/src/AdminConsole2';
// import RolesPermissions2 from '../../blocks/RolesPermissions2/src/RolesPermissions2';
// import Payments from '../../blocks/Payments/src/Payments';
// import Videos from '../../blocks/videos/src/Videos';
// import CfLiveChallenges from '../../blocks/CfLiveChallenges/src/CfLiveChallenges';
// import QrCodes from '../../blocks/qrcodes/src/QrCodes';
// import HelpCentre from '../../blocks/helpcentre/src/HelpCentre';
// import HelpCentreQA from '../../blocks/helpcentre/src/HelpCentreQA';
// import HelpCentreSub from '../../blocks/helpcentre/src/HelpCentreSub';
// import PaymentAdmin2 from '../../blocks/PaymentAdmin2/src/PaymentAdmin2';
// import Pushnotifications from '../../blocks/pushnotifications/src/Pushnotifications';
// import ForgotPassword from '../../blocks/forgot-password/src/ForgotPassword';
// import ForgotPasswordOTP from '../../blocks/forgot-password/src/ForgotPasswordOTP';
// import NewPassword from '../../blocks/forgot-password/src/NewPassword';
// import AudioEditor from '../../blocks/AudioEditor/src/AudioEditor';
// import CfAppCoinsManagement from '../../blocks/CfAppCoinsManagement/src/CfAppCoinsManagement';
// import Notifications from '../../blocks/notifications/src/Notifications';
// import LiveStreaming from '../../blocks/LiveStreaming/src/LiveStreaming';
// import Analytics from '../../blocks/analytics/src/Analytics';
// import Customisableusersubscriptions from '../../blocks/customisableusersubscriptions/src/Customisableusersubscriptions';
// import CustomisableUserProfiles from '../../blocks/CustomisableUserProfiles/src/CustomisableUserProfiles';
// import SubscriptionDetails from '../../blocks/customisableusersubscriptions/src/SubscriptionDetails';
// import Filteritems from '../../blocks/filteritems/src/Filteritems';
// import Filteroptions from '../../blocks/filteritems/src/Filteroptions';
// import PostCreation from '../../blocks/postcreation/src/PostCreation';
// import Posts from '../../blocks/postcreation/src/Posts';
// import PostDetails from '../../blocks/postcreation/src/PostDetails';
// import Invitefriends from '../../blocks/invitefriends/src/Invitefriends';
// import Trending from '../../blocks/Trending/src/Trending';
// import AudioEqualiser from '../../blocks/AudioEqualiser/src/AudioEqualiser';
// import Settings5 from '../../blocks/Settings5/src/Settings5';
// import UserProfileBasicBlock from '../../blocks/user-profile-basic/src/UserProfileBasicBlock';
// import Categoriessubcategories from '../../blocks/categoriessubcategories/src/Categoriessubcategories';
// import UserStatus from '../../blocks/userstatus/src/UserStatus';
// import VoiceMemos from '../../blocks/VoiceMemos/src/VoiceMemos';
// import CfGiftDesign from '../../blocks/CfGiftDesign/src/CfGiftDesign';
// import CountryCodeSelector from '../../blocks/country-code-selector/src/CountryCodeSelector';
// import Share from '../../blocks/share/src/Share';
// import Blockedusers from '../../blocks/blockedusers/src/Blockedusers';
// import AddBlockeduser from '../../blocks/blockedusers/src/AddBlockeduser';
// import UploadMedia2 from '../../blocks/UploadMedia2/src/UploadMedia2';
// import LanguageSupport from '../../blocks/LanguageSupport/src/LanguageSupport';
// import Followers from '../../blocks/Followers/src/Followers';
// import TermsAndConditions from '../../blocks/TermsAndConditions/src/TermsAndConditions';
// import PhoneNumberInput from '../../blocks/mobile-account-registration/src/PhoneNumberInput';
// import AdditionalDetailForm from '../../blocks/mobile-account-registration/src/AdditionalDetailForm';
// import SocialMediaAccountRegistrationScreen from '../../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen';
// import Location from '../../blocks/location/src/Location';
// import Contactus from '../../blocks/contactus/src/Contactus';
// import AddContactus from '../../blocks/contactus/src/AddContactus';
// import Catalogue from '../../blocks/catalogue/src/Catalogue';
// import EducationalUserProfile from '../../blocks/educational-user-profile/src/EducationalUserProfile';
// import Notificationsettings from '../../blocks/notificationsettings/src/Notificationsettings';
// import Chat9 from '../../blocks/Chat9/src/Chat9';
// import EmailAccountRegistration from '../../blocks/email-account-registration/src/EmailAccountRegistration';
// import Dashboard from '../../blocks/dashboard/src/Dashboard';
// import ApplePayIntegration from '../../blocks/ApplePayIntegration/src/ApplePayIntegration';
// import Splashscreen from '../../blocks/splashscreen/src/Splashscreen';
// import Hashtags from '../../blocks/Hashtags/src/Hashtags';
// import AdManager from '../../blocks/AdManager/src/AdManager';
// import EmailAccountLoginBlock from '../../blocks/email-account-login/src/EmailAccountLoginBlock';
// import VideoManagement from '../../blocks/VideoManagement/src/VideoManagement';
// import Search from '../../blocks/search/src/Search';
// import CreateComment from '../../blocks/comments/src/CreateComment';
// import VideoEditingTools from '../../blocks/VideoEditingTools/src/VideoEditingTools';
// import EmailNotifications from '../../blocks/EmailNotifications/src/EmailNotifications';
import AmazonInteractiveVideoService from '../../blocks/AmazonInteractiveVideoService/src/AmazonInteractiveVideoService.web';
const routeMap = {
  // VideoLibrary: {
  //   component: VideoLibrary,
  //   path: '/VideoLibrary'
  // },
  // SocialMediaAccountLoginScreen: {
  //   component: SocialMediaAccountLoginScreen,
  //   path: '/SocialMediaAccountLoginScreen'
  // },
  // AudioLibrary: {
  //   component: AudioLibrary,
  //   path: '/AudioLibrary'
  // },
  // MobileAccountLoginBlock: {
  //   component: MobileAccountLoginBlock,
  //   path: '/MobileAccountLoginBlock'
  // },
  // InstantGiftCards: {
  //   component: InstantGiftCards,
  //   path: '/InstantGiftCards'
  // },
  // CfFaceEffectsIntegration: {
  //   component: CfFaceEffectsIntegration,
  //   path: '/CfFaceEffectsIntegration'
  // },
  // Mentionstagging: {
  //   component: Mentionstagging,
  //   path: '/Mentionstagging'
  // },
  // Maps: {
  //   component: Maps,
  //   path: '/Maps'
  // },
  // Favourites: {
  //   component: Favourites,
  //   path: '/Favourites'
  // },
  // AddFavourites: {
  //   component: AddFavourites,
  //   path: '/AddFavourites'
  // },
  // AnimationsAndTransition3: {
  //   component: AnimationsAndTransition3,
  //   path: '/AnimationsAndTransition3'
  // },
  // OTPInputAuth: {
  //   component: OTPInputAuth,
  //   path: '/OTPInputAuth'
  // },
  // LikeAPost: {
  //   component: LikeAPost,
  //   path: '/LikeAPost'
  // },
  // PrivacySettings: {
  //   component: PrivacySettings,
  //   path: '/PrivacySettings'
  // },
  // DataSaver: {
  //   component: DataSaver,
  //   path: '/DataSaver'
  // },
  // AdminConsole2: {
  //   component: AdminConsole2,
  //   path: '/AdminConsole2'
  // },
  // RolesPermissions2: {
  //   component: RolesPermissions2,
  //   path: '/RolesPermissions2'
  // },
  // Payments: {
  //   component: Payments,
  //   path: '/Payments'
  // },
  // Videos: {
  //   component: Videos,
  //   path: '/Videos'
  // },
  // CfLiveChallenges: {
  //   component: CfLiveChallenges,
  //   path: '/CfLiveChallenges'
  // },
  // QrCodes: {
  //   component: QrCodes,
  //   path: '/QrCodes'
  // },
  // HelpCentre: {
  //   component: HelpCentre,
  //   path: '/HelpCentre'
  // },
  // HelpCentreQA: {
  //   component: HelpCentreQA,
  //   path: '/HelpCentreQA'
  // },
  // HelpCentreSub: {
  //   component: HelpCentreSub,
  //   path: '/HelpCentreSub'
  // },
  // PaymentAdmin2: {
  //   component: PaymentAdmin2,
  //   path: '/PaymentAdmin2'
  // },
  // Pushnotifications: {
  //   component: Pushnotifications,
  //   path: '/Pushnotifications'
  // },
  // ForgotPassword: {
  //   component: ForgotPassword,
  //   path: '/ForgotPassword'
  // },
  // ForgotPasswordOTP: {
  //   component: ForgotPasswordOTP,
  //   path: '/ForgotPasswordOTP'
  // },
  // NewPassword: {
  //   component: NewPassword,
  //   path: '/NewPassword'
  // },
  // AudioEditor: {
  //   component: AudioEditor,
  //   path: '/AudioEditor'
  // },
  // CfAppCoinsManagement: {
  //   component: CfAppCoinsManagement,
  //   path: '/CfAppCoinsManagement'
  // },
  // Notifications: {
  //   component: Notifications,
  //   path: '/Notifications'
  // },
  // LiveStreaming: {
  //   component: LiveStreaming,
  //   path: '/LiveStreaming'
  // },
  // Analytics: {
  //   component: Analytics,
  //   path: '/Analytics'
  // },
  // Customisableusersubscriptions: {
  //   component: Customisableusersubscriptions,
  //   path: '/Customisableusersubscriptions'
  // },
  // CustomisableUserProfiles: {
  //   component: CustomisableUserProfiles,
  //   path: '/CustomisableUserProfiles'
  // },
  // SubscriptionDetails: {
  //   component: SubscriptionDetails,
  //   path: '/SubscriptionDetails'
  // },
  // Filteritems: {
  //   component: Filteritems,
  //   path: '/Filteritems'
  // },
  // Filteroptions: {
  //   component: Filteroptions,
  //   path: '/Filteroptions'
  // },
  // PostCreation: {
  //   component: PostCreation,
  //   path: '/PostCreation'
  // },
  // Posts: {
  //   component: Posts,
  //   path: '/Posts'
  // },
  // PostDetails: {
  //   component: PostDetails,
  //   path: '/PostDetails'
  // },
  // Invitefriends: {
  //   component: Invitefriends,
  //   path: '/Invitefriends'
  // },
  // Trending: {
  //   component: Trending,
  //   path: '/Trending'
  // },
  // AudioEqualiser: {
  //   component: AudioEqualiser,
  //   path: '/AudioEqualiser'
  // },
  // Settings5: {
  //   component: Settings5,
  //   path: '/Settings5'
  // },
  // UserProfileBasicBlock: {
  //   component: UserProfileBasicBlock,
  //   path: '/UserProfileBasicBlock'
  // },
  // Categoriessubcategories: {
  //   component: Categoriessubcategories,
  //   path: '/Categoriessubcategories'
  // },
  // UserStatus: {
  //   component: UserStatus,
  //   path: '/UserStatus'
  // },
  // VoiceMemos: {
  //   component: VoiceMemos,
  //   path: '/VoiceMemos'
  // },
  // CfGiftDesign: {
  //   component: CfGiftDesign,
  //   path: '/CfGiftDesign'
  // },
  // CountryCodeSelector: {
  //   component: CountryCodeSelector,
  //   path: '/CountryCodeSelector'
  // },
  // Share: {
  //   component: Share,
  //   path: '/Share'
  // },
  // Blockedusers: {
  //   component: Blockedusers,
  //   path: '/Blockedusers'
  // },
  // AddBlockeduser: {
  //   component: AddBlockeduser,
  //   path: '/AddBlockeduser'
  // },
  // UploadMedia2: {
  //   component: UploadMedia2,
  //   path: '/UploadMedia2'
  // },
  // LanguageSupport: {
  //   component: LanguageSupport,
  //   path: '/LanguageSupport'
  // },
  // Followers: {
  //   component: Followers,
  //   path: '/Followers'
  // },
  // TermsAndConditions: {
  //   component: TermsAndConditions,
  //   path: '/TermsAndConditions'
  // },
  // PhoneNumberInput: {
  //   component: PhoneNumberInput,
  //   path: '/PhoneNumberInput'
  // },
  // AdditionalDetailForm: {
  //   component: AdditionalDetailForm,
  //   path: '/AdditionalDetailForm'
  // },
  // SocialMediaAccountRegistrationScreen: {
  //   component: SocialMediaAccountRegistrationScreen,
  //   path: '/SocialMediaAccountRegistrationScreen'
  // },
  // Location: {
  //   component: Location,
  //   path: '/Location'
  // },
  // Contactus: {
  //   component: Contactus,
  //   path: '/Contactus'
  // },
  // AddContactus: {
  //   component: AddContactus,
  //   path: '/AddContactus'
  // },
  // Catalogue: {
  //   component: Catalogue,
  //   path: '/Catalogue'
  // },
  // EducationalUserProfile: {
  //   component: EducationalUserProfile,
  //   path: '/EducationalUserProfile'
  // },
  // Notificationsettings: {
  //   component: Notificationsettings,
  //   path: '/Notificationsettings'
  // },
  // Chat9: {
  //   component: Chat9,
  //   path: '/Chat9'
  // },
  // EmailAccountRegistration: {
  //   component: EmailAccountRegistration,
  //   path: '/EmailAccountRegistration'
  // },
  // Dashboard: {
  //   component: Dashboard,
  //   path: '/Dashboard'
  // },
  // ApplePayIntegration: {
  //   component: ApplePayIntegration,
  //   path: '/ApplePayIntegration'
  // },
  // Splashscreen: {
  //   component: Splashscreen,
  //   path: '/Splashscreen'
  // },
  // Hashtags: {
  //   component: Hashtags,
  //   path: '/Hashtags'
  // },
  // AdManager: {
  //   component: AdManager,
  //   path: '/AdManager'
  // },
  // EmailAccountLoginBlock: {
  //   component: EmailAccountLoginBlock,
  //   path: '/EmailAccountLoginBlock'
  // },
  // VideoManagement: {
  //   component: VideoManagement,
  //   path: '/VideoManagement'
  // },
  // Search: {
  //   component: Search,
  //   path: '/Search'
  // },
  // Comment: {
  //   component: Comment,
  //   path: '/Comment'
  // },
  // CreateComment: {
  //   component: CreateComment,
  //   path: '/CreateComment'
  // },
  // VideoEditingTools: {
  //   component: VideoEditingTools,
  //   path: '/VideoEditingTools'
  // },
  // EmailNotifications: {
  //   component: EmailNotifications,
  //   path: '/EmailNotifications'
  // },
  // LiveFeedScheduling: {
  //   component: LiveFeedScheduling,
  //   path: '/LiveFeedScheduling'
  // },

  Home: {
    component: AmazonInteractiveVideoService,
    path: '/',
    exact: true
  },
  // InfoPage: {
  //   component: InfoPage,
  //   path: '/InfoPage'
  // },

  // AlertWeb: {
  //   component: AlertBlock,
  //   path: '*/AlertWeb',
  //   modal: true
  // }
};

const firebaseAPI = firebase.initializeApp({
  apiKey: 'AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4',
  authDomain: 'rnmasterapp-c11e9.firebaseapp.com',
  databaseURL: 'https://rnmasterapp-c11e9.firebaseio.com',
  projectId: 'rnmasterapp-c11e9',
  storageBucket: 'rnmasterapp-c11e9.appspot.com',
  messagingSenderId: '649592030497',
  appId: '1:649592030497:web:7728bee3f2baef208daa60',
  measurementId: 'G-FYBCF3Z2W3'
});

class App extends Component {
  render() {
    const defaultAnalytics = firebaseAPI.analytics();
    defaultAnalytics.logEvent('APP_Loaded');

    // crashlytics().setCrashlyticsCollectionEnabled(true);

    return (
      <View style={{ height: '100vh', width: '100vw' }}>
        <TopNav />
        {WebRoutesGenerator({ routeMap })}
        <ModalContainer />
      </View>
    );
  }
}

export default App;
