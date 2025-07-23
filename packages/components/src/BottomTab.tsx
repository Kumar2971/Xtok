/**
 * Main Tab Screen
 */
import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
  BackHandler,
  Modal,
  TouchableHighlight
} from "react-native";
import ZegoExpressEngine from 'zego-express-engine-reactnative';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  getFocusedRouteNameFromRoute,
  useNavigation
} from "@react-navigation/native";

import styles from "./BottomTabStyles";
import {
  plus,
  inbox,
  inboxunselect,
  profile,
  live,
  profileunselected,
  homeselected,
  homeunselected,
  liveunselected,
  closed
} from "./assets";

//*> Screens
import LiveEvent from '../../blocks/LiveFeedScheduling/src/LiveEvent';
import CfChallengesDurationPopup from '../../blocks/CfLiveChallenges/src/CfChallengesDurationPopup';
import PostCreation from "../../blocks/postcreation/src/feed/PostCreation";
import Posts from "../../blocks/postcreation/src/feed/Posts";
import PostDetails from "../../blocks/postcreation/src/feed/PostDetails";
import Postsubmit from "../../blocks/postcreation/src/feed/Postsubmit";
import Setvisibility from "../../blocks/postcreation/src/feed/Setvisibility";
import Selectaudience from "../../blocks/postcreation/src/feed/Selectaudience";
import GoLaviCode from '../../blocks/PrivacySettings/src/settingOptions/goLaviCode';
import CommentSettings from "../../blocks/postcreation/src/feed/CommentSetting";
import UserProfileBasicBlock from "../../blocks/user-profile-basic/src/UserProfileBasicBlock";
import PrivacySettings from "../../blocks/PrivacySettings/src/PrivacySettings";
import ContentPreferences from "../../blocks/PrivacySettings/src/settingOptions/contentPreferences";
import Theme from "../../blocks/PrivacySettings/src/settingOptions/theme";
import PersonalInformation from "../../blocks/PrivacySettings/src/settingOptions/personalInformation";
import ChangePassword from "../../blocks/PrivacySettings/src/settingOptions/changePassword";
import PrivacySafety from "../../blocks/PrivacySettings/src/settingOptions/privacySafety";
import ManageAccount from "../../blocks/PrivacySettings/src/settingOptions/manageAccount";
import PushNotifications from "../../blocks/PrivacySettings/src/settingOptions/pushNotifications";
import DataSaver from "../../blocks/PrivacySettings/src/settingOptions/dataSaver";
import EditProfile from "../../blocks/PrivacySettings/src/settingOptions/editProfile";
import Wallet from "../../blocks/PrivacySettings/src/settingOptions/wallet";
import LiveStreaming from "../../blocks/AmazonInteractiveVideoService/src/LiveStreaming";
import Notifications from "../../blocks/notifications/src/Notifications";
import FollowRequest from "../../blocks/notifications/src/FollowRequest";
import HomeScreen from "./HomeScreen";
import SelectLocation from "../../blocks/postcreation/src/feed/SelectLocation";
import Comments from "../../blocks/comments/src/Comments";
import Blockedusers from "../../blocks/blockedusers/src/Blockedusers";
import RestrictedUsers from "../../blocks/blockedusers/src/Restrictedusers";
import MutedUsers from "../../blocks/blockedusers/src/MutedUsers";
import HelpCenter from "../../blocks/helpcentre/src/HelpCenter";
import ElasticSearch from "../../blocks/ElasticSearch/src/ElasticSearch";
import SearchDetails from "../../blocks/ElasticSearch/src/SearchDetails";
import LiveFeedScheduling from "../../blocks/LiveFeedScheduling/src/LiveFeedScheduling";
import DraftScreen from "../../blocks/user-profile-basic/src/DraftScreen";
import PostsByLocationScreen from "../../blocks/ElasticSearch/src/PostsByLocationScreen";
import HashTagScreen from "../../blocks/ElasticSearch/src/HashTagScreen";
import YourActivity from "../../blocks/PrivacySettings/src/settingOptions/YourActivity";
import LikeActivity from "../../blocks/PrivacySettings/src/settingOptions/ActivityLikes";
import CommentActivity from "../../blocks/PrivacySettings/src/settingOptions/CommentActivity";
import NotInterestedActivity from "../../blocks/PrivacySettings/src/settingOptions/NotInterestedActivity";
import SavedActivity from "../../blocks/PrivacySettings/src/settingOptions/SavedActivity";
import Setschedule from "../../blocks/postcreation/src/feed/setSchedule";
import TakeABreak from "../../blocks/PrivacySettings/src/settingOptions/takeABreak";
import DraftList from "../../blocks/user-profile-basic/src/DraftList";
import BedTimeReminder from "../../blocks/PrivacySettings/src/settingOptions/bedTimeReminder";
import ChatList from "../../blocks/Chat9/src/ChatList";
import SearchUserList from "../../blocks/Chat9/src/SearchUserList";
import Chat9 from "../../blocks/Chat9/src/Chat9";
import ImageScreen from "../../blocks/Chat9/src/ImageScreen";
import audio from "../../blocks/VideoTrimming/src/audio";
import VideoTrimming from "../../blocks/VideoTrimming/src/VideoTrimming";
import AudioEditor from "../../blocks/AudioEditor/src/AudioEditor";

//*> Screens

import LiveRecording from "../../blocks/LiveFeedScheduling/src/LiveRecording";
import Scale from "./Scale";
import Followers from "../../blocks/Followers/src/Followers";
import ReportProblem from "../../blocks/contactus/src/ReportProblem";
import CfLiveChallengesPopUp from "../../blocks/CfLiveChallenges/src/CfChallengePopup";
import CfLiveChallengeSolo from "../../blocks/CfLiveChallenges/src/CfLiveChallengeSolo";
import paymentsuccess from "../../blocks/CfAppCoinsManagement/src/paymentsuccess";
import ExchangeForcoins from "../../blocks/CfAppCoinsManagement/src/ExchangeForcoins";
import Exchange from "../../blocks/CfAppCoinsManagement/src/Exchange";
import Balance from "../../blocks/CfAppCoinsManagement/src/balance";
import withdrawMoney from "../../blocks/CfAppCoinsManagement/src/withdrawMoney";
import CfLiveChallenges from "../../blocks/CfLiveChallenges/src/CfLiveChallenges";
import CfLiveChallengesinvitation from "../../blocks/CfLiveChallenges/src/CfLiveChallengesinvitation";
import Leaderboard from "../../blocks/Leaderboard/src/Leaderboard";
import CfGroupLive from "../../blocks/CfGroupLive/src/CfGroupLive";
import Tooltip from "react-native-walkthrough-tooltip";
import LanguageSupport from "../../blocks/LanguageSupport/src/LanguageSupport";
// import paymentsuccess from '../../blocks/CfAppCoinsManagement/src/paymentsuccess';
// import ExchangeForcoins from '../../blocks/CfAppCoinsManagement/src/ExchangeForcoins';
// import Exchange from '../../blocks/CfAppCoinsManagement/src/Exchange';
// import Balance from '../../blocks/CfAppCoinsManagement/src/balance';
// import CfLiveChallenges from '../../blocks/CfLiveChallenges/src/CfLiveChallenges';
// import CfLiveChallengesinvitation from '../../blocks/CfLiveChallenges/src/CfLiveChallengesinvitation';
// import Leaderboard from '../../blocks/Leaderboard/src/Leaderboard';
import PerformanceTracker from "../../blocks/PerformanceTracker/src/PerformanceTracker";
import ViewAllLiveStreams from "../../blocks/AmazonInteractiveVideoService/src/ViewAllLiveStreams";
import StripeIntegration from "../../blocks/stripepayments/src/StripeIntegration";
//import StripePaymentProvider from "../../blocks/stripepayments/src/StripePaymentProvider";
import PaypalView from "../../blocks/stripepayments/src/Paypal";
import { translate } from "./i18n/translate";
import Meeting from "../../blocks/LiveStreaming/src/screens/meeting/Meeting";
import FetchRecordings from "../../blocks/LiveStreaming/src/FetchRecordings";
import FetchMeeting from "../../blocks/LiveStreaming/src/FetchMeeting";
import FetchLiveStreaming from "../../blocks//LiveStreaming/src/FetchLiveStreaming";
import LiveExplore from "../../blocks/AmazonInteractiveVideoService/src/LiveExplore";
import WithdrawSuccess from "../../blocks/CfAppCoinsManagement/src/WithdrawSuccess";
import PaymentSummary from "../../blocks/CfAppCoinsManagement/src/PaymentSummary";
import TermsAndConditions from "../../blocks/TermsAndConditions/src/TermsAndConditions";
import PostByAudioScreen from "../../blocks/ElasticSearch/src/PostByAudioScreen";
import AmazonInteractiveVideoService from "../../blocks/AmazonInteractiveVideoService/src/AmazonInteractiveVideoService";
import NotificationAmazonIvs from "../../blocks/AmazonInteractiveVideoService/src/NotificationAmazonIvs";
import EndLive from "../../blocks/AmazonInteractiveVideoService/src/EndLive";

//*> Stacks
const HomeStack = createStackNavigator();
const LiveStack = createStackNavigator();
const PostsStack = createStackNavigator();
const InboxStack = createStackNavigator();
const ProfileStack = createStackNavigator();

//*> Bottom Tab Navigator
const Tab = createBottomTabNavigator();

let choseOption;

const BottomTabScreen = (props: any) => {
  // setTimeout(() => {

  // }, 1000);

  useEffect(() => {
    ZegoExpressEngine.createEngineWithProfile({
      appID: 231331386,
      appSign: "002b396aac02a2fd67f3c1bfc659cda4f57e4c5149552ccf46e9ca5d6256461d",
      scenario: 0
    })
    return () => {
      ZegoExpressEngine.destroyEngine();
    }
  }, [])
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <MyTabBar {...props} />}
      tabBarOptions={{
        style: { position: "absolute" },
        keyboardHidesTabBar: true,
        showLabel: false
      }}
    >
      {/* <Tab.Screen
        name="Home"
        component={Home}
        listeners={{
          focus: () =>
            BackHandler.addEventListener("hardwareBackPress", handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              "hardwareBackPress",
              handleBackButton
            )
        }}
      /> */}
      <Tab.Screen
        name="Home"
        component={Home}
        listeners={{
          focus: () =>
            BackHandler.addEventListener("hardwareBackPress", handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              "hardwareBackPress",
              handleBackButton
            )
        }}
      />
      <Tab.Screen name="Live" component={Live} />
      <Tab.Screen name="Posts" component={Post} />
      <Tab.Screen name="Inbox" component={Inbox} />

      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{
          logoutScreen: () => props.navigation.replace("Splashscreen")
        }}
      />
    </Tab.Navigator>
  );
};

const handleBackButton = () => {
  BackHandler.exitApp();
  return true;
};

const onBackButtonPressed = () => {
  return true;
};

export default BottomTabScreen;

const renderBottomTabIcons = (
  iconIndex: any,
  isFocused: boolean,
  navigation: any,
  route: any
) => {
  switch (iconIndex) {
    case 0:
      return (
        <>
          <Image
            source={isFocused ? homeselected : homeunselected}
            style={styles.homeIcons}
          />
          {isFocused ? (
            <Text style={[styles.icontext, { color: "white" }]}>{translate("home")}</Text>
          ) : (
            <Text style={[styles.icontext, { color: "grey" }]}>{translate("home")}</Text>
          )}
        </>
      );
    case 1:
      return (
        <>
          <Image
            source={isFocused ? live : liveunselected}
            style={styles.liveIcons}
          />
          {isFocused ? (
            <Text style={[styles.icontext, { color: "white" }]}>{translate("live")}</Text>
          ) : (
            <Text style={[styles.icontext, { color: "grey" }]}>{translate("live")}</Text>
          )}
        </>
      );
    case 2:
      return <Image source={plus} style={styles.mainIcon} />;
    case 3:
      return (
        <>
          <Image
            source={isFocused ? inbox : inboxunselect}
            style={styles.sleepIcons}
          />
          {isFocused ? (
            <Text style={[styles.icontext, { color: "white" }]}>{translate("inbox")}</Text>
          ) : (
            <Text style={[styles.icontext, { color: "grey" }]}>{translate("inbox")}</Text>
          )}
        </>
      );
    case 4:
      return (
        <>
          <Image
            source={isFocused ? profile : profileunselected}
            style={styles.exploreIcons}
          />
          {isFocused ? (
            <Text style={[styles.icontext, { color: "white" }]}>{translate("profile")}</Text>
          ) : (
            <Text style={[styles.icontext, { color: "grey" }]}>{translate("profile")}</Text>
          )}
        </>
      );
    default:
      break;
  }
};
//@ts-ignore
const MyTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          // if (route.name !== 'Live') {
          navigation.navigate(route.name);
          // }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          });
        };
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused ? true : false }}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.outerContainer}
          >
            <View style={styles.tabContainer}>
              {renderBottomTabIcons(index, isFocused, navigation, route)}
              {/* <Text style={[styles.labelStyle, { color: '#212121' }]}>{route.name}</Text> */}
            </View>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

const Home = (props: {
  menuOpen: any;
  navigation: any;
  route: any;
  handleMenu: () => any;
}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(props.route);
    props.navigation.setOptions({ tabBarVisible: true });
    if (routeName === "DraftScreen") {
      props.navigation.setOptions({ tabBarVisible: false });
    } else if (routeName === "Postsubmit") {
      props.navigation.setOptions({ tabBarVisible: false });
    } else {
      props.navigation.setOptions({ tabBarVisible: true });
    }
  }, [props.navigation, props.route]);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='Comments'
        component={Comments}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          goLive: (data: any) => {
            props.navigation.navigate('Live', {
              screen: 'LiveStreamingScreen',
              data: data,
            });
            // props.navigation.navigate('Live', { data: data })
          },
        }}
      />
      <HomeStack.Screen
        name='PostDetails'
        component={PostDetails}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />

      <HomeStack.Screen
        name='Postsubmit'
        component={Postsubmit}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />

      <HomeStack.Screen
        name='SelectLocation'
        component={SelectLocation}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name='Setschedule'
        component={Setschedule}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <HomeStack.Screen
        name='Selectaudience'
        component={Selectaudience}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <HomeStack.Screen
        name='CommentSettings'
        component={CommentSettings}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <HomeStack.Screen
        name='LikeActivity'
        component={LikeActivity}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <HomeStack.Screen
        name='CommentActivity'
        component={CommentActivity}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <HomeStack.Screen
        name='NotInterestedActivity'
        component={NotInterestedActivity}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <HomeStack.Screen
        name='SavedActivity'
        component={SavedActivity}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <HomeStack.Screen
        name='UserProfileBasicBlock'
        component={UserProfileBasicBlock}
        options={{ headerShown: false }}
        initialParams={{
          data: {
            attributes: {
              account_id: null,
            },
          },
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <HomeStack.Screen
        name='Followings'
        component={Followers}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />

      <HomeStack.Screen
        name='ElasticSearch'
        component={ElasticSearch}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <HomeStack.Screen
        name='PostsByLocationScreen'
        component={PostsByLocationScreen}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <HomeStack.Screen
        name='PostByAudioScreen'
        component={PostByAudioScreen}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <HomeStack.Screen
        name='SearchDetails'
        component={SearchDetails}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <HomeStack.Screen
        name='HashTagScreen'
        component={HashTagScreen}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <HomeStack.Screen
        name='LiveFeedScheduling'
        component={LiveFeedScheduling}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <HomeStack.Screen
        name='LiveEvent'
        component={LiveEvent}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <HomeStack.Screen
        name='ChatList'
        component={ChatList}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <ProfileStack.Screen
        name='PrivacySettings'
        component={PrivacySettings}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <ProfileStack.Screen
        name='PrivacySafety'
        component={PrivacySafety}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
    </HomeStack.Navigator>
  );
};
const Live = (props: {
  menuOpen: any;
  navigation: any;
  route: any;
  handleMenu: () => any;
}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(props.route);
    // if (routeName === "PurchaseRubies" || routeName === "Mypost" || routeName === 'MySwagshot') {
    //   props.navigation.setOptions({ tabBarVisible: false });
    // } else {
    //   setTimeout(() => { props.navigation.setOptions({ tabBarVisible: true }) }, 500);
    // }
    if (routeName === "CfLiveChallenges" || routeName === "AmazonInteractiveVideoService" || routeName === "LiveStreaming") {
      props.navigation.setOptions({ tabBarVisible: false });
    } else {
      props.navigation.setOptions({ tabBarVisible: true });
    }
  }, [props.navigation, props.route]);

  return (
    <LiveStack.Navigator>
      <LiveStack.Screen
        name="LiveExplore"
        component={LiveExplore}
        options={{ headerShown: false }}
        listeners={{
          focus: () =>
            BackHandler.addEventListener("hardwareBackPress", handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              "hardwareBackPress",
              handleBackButton
            )
        }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <LiveStack.Screen
        name='Comments'
        component={Comments}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          type: 'all',
        }}
      />
      <LiveStack.Screen
        name="ViewAllLive"
        component={ViewAllLiveStreams}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <LiveStack.Screen
        name="CfLiveChallengesinvitation"
        component={CfLiveChallengesinvitation}
        // component={CfLiveChallenges}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <LiveStack.Screen
        name="CfGroupLive"
        component={CfGroupLive}
        // component={CfLiveChallenges}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />

      <LiveStack.Screen
        name="FetchRecordings"
        component={FetchRecordings}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <LiveStack.Screen
        name="FetchMeetings"
        component={FetchMeeting}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <LiveStack.Screen
        name="FetchStreams"
        component={FetchLiveStreaming}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />

      <LiveStack.Screen
        name="CfLiveChallenges"
        component={CfLiveChallenges}
        options={{ headerShown: false, gestureEnabled: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <LiveStack.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />

      <LiveStack.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          type: "all"
        }}
      />
      <ProfileStack.Screen
        name="PaymentSummary"
        component={PaymentSummary}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <LiveStack.Screen
        name="Balance"
        component={Balance}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          type: "all"
        }}
      />
      <LiveStack.Screen
        name="StripeIntegration"
        component={PaypalView}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <LiveStack.Screen
        name="paymentsuccess"
        component={paymentsuccess}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          type: "all"
        }}
      />
      <ProfileStack.Screen
        name="withdrawMoney"
        component={withdrawMoney}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          // logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="withdrawsuccess"
        component={WithdrawSuccess}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="PrivacySettings"
        component={PrivacySettings}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="LikeActivity"
        component={LikeActivity}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="CommentActivity"
        component={CommentActivity}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="LiveRecording"
        component={LiveRecording}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <LiveStack.Screen
        name="LiveStreaming"
        component={LiveStreaming}
        options={{ headerShown: false, gestureEnabled: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <LiveStack.Screen
        name="EndLive"
        component={EndLive}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <LiveStack.Screen
        name="AmazonInteractiveVideoService"
        component={AmazonInteractiveVideoService}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <LiveStack.Screen
        name="NotificationAmazonIvs"
        component={NotificationAmazonIvs}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <LiveStack.Screen
        name="Meeting_Screen"
        component={Meeting}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name='NotInterestedActivity'
        component={NotInterestedActivity}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <ProfileStack.Screen
        name='SavedActivity'
        component={SavedActivity}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
    </LiveStack.Navigator>
  );
};

const Post = (props: {
  menuOpen: any;
  navigation: any;
  route: any;
  handleMenu: () => any;
}) => {
  const [toolTipVisible, setToolTipVisible] = React.useState(false);
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(props.route);
    props.navigation.setOptions({ tabBarVisible: false });
    if (routeName === "Comments") {
      props.navigation.setOptions({ tabBarVisible: true });
    } else {
      setTimeout(() => {
        props.navigation.setOptions({ tabBarVisible: false });
      }, 500);
    }
  }, [props.navigation, props.route]);
  return (
    <>
      <PostsStack.Navigator>
        <PostsStack.Screen
          name="PostCreation"
          component={PostCreation}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="LiveChallengesPopUp"
          component={CfLiveChallengesPopUp}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu(),
          }}
        />
        <PostsStack.Screen
          name="LiveExplore"
          listeners={{
            focus: () =>
              BackHandler.addEventListener("hardwareBackPress", handleBackButton),
            blur: () =>
              BackHandler.removeEventListener(
                "hardwareBackPress",
                handleBackButton
              )
          }}
          component={LiveExplore}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="DraftScreen"
          component={DraftScreen}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="CfChallengesDurationPopup"
          component={CfChallengesDurationPopup}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu(),
          }}
        />
        <PostsStack.Screen
          name="Meeting_Screen"
          component={Meeting}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu(),
          }}
        />
        <PostsStack.Screen
          name="FetchRecordings"
          component={FetchRecordings}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu(),
          }}
        />
        <PostsStack.Screen
          name="FetchMeetings"
          component={FetchMeeting}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu(),
          }}
        />
        <PostsStack.Screen
          name="FetchStreams"
          component={FetchLiveStreaming}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu(),
          }}
        />
        <PostsStack.Screen
          name="liveChallengeSolo"
          component={CfLiveChallengeSolo}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="CfLiveChallengesinvitation"
          component={CfLiveChallengesinvitation}
          // component={CfLiveChallenges}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="CfGroupLive"
          component={CfGroupLive}
          // component={CfLiveChallenges}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="LiveStreaming"
          component={LiveStreaming}
          // component={CfLiveChallenges}
          options={{ headerShown: false, gestureEnabled: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="EndLive"
          component={EndLive}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="AmazonInteractiveVideoService"
          component={AmazonInteractiveVideoService}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="NotificationAmazonIvs"
          component={NotificationAmazonIvs}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="CfLiveChallenges"
          component={CfLiveChallenges}
          options={{ headerShown: false, gestureEnabled: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="Leaderboard"
          component={Leaderboard}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />

        <PostsStack.Screen
          name="PostDetails"
          component={PostDetails}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="Postsubmit"
          component={Postsubmit}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="Setvisibility"
          component={Setvisibility}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="Selectaudience"
          component={Selectaudience}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="CommentSettings"
          component={CommentSettings}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="liveChallenge"
          component={CommentSettings}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu()
          }}
        />
        <PostsStack.Screen
          name="Comments"
          component={Comments}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu(),
            type: "all"
          }}
        />
        <PostsStack.Screen
          name="Wallet"
          component={Wallet}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu(),
            type: "all"
          }}
        />
        <PostsStack.Screen
          name="Balance"
          component={Balance}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu(),
            type: "all"
          }}
        />
        <PostsStack.Screen
          name="paymentsuccess"
          component={paymentsuccess}
          options={{ headerShown: false }}
          initialParams={{
            menuOpen: props.menuOpen,
            handleMenu: () => props.handleMenu(),
            type: "all"
          }}
        />
        {/* <PostsStack.Screen
      name="UserProfileBasicBlock"
      component={UserProfileBasicBlock}
      options={{ headerShown: false ,}}
      initialParams={{ menuOpen: props.menuOpen,

        handleMenu: () => props.handleMenu()
      }}

    /> */}
      </PostsStack.Navigator>
      {/* <Tooltip
        isVisible={toolTipVisible}
        // arrowSize={}
        accessible={true}
        useReactNativeModal={true}
        childrenWrapperStyle={{ padding: 20 ,borderRadius:20 ,position:'absolute' }}
        tooltipStyle={{ width: 150 }}
        arrowStyle={{ height: 16, width: 16 }}
        content={
          <View style={styles.tooltipView}>
            <TouchableOpacity onPress={() => navigation.navigate('PostCreation')} style={styles.row}>
              <Text>Challenge</Text>
              <Image source={require('./challenge.png')} style={styles.logo} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert()} style={styles.row}>
              <Text>Story</Text>
              <Image source={require('./story.png')} style={styles.logo} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert()} style={styles.row}>
              <Text>Post </Text>
              <Image source={require('./post.png')} style={styles.logo} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert()} style={styles.row}>
              <Text>Live</Text>
              <Image source={require('./video.png')} style={styles.logo} />
            </TouchableOpacity>
          </View>
        }
        placement="bottom"
        onClose={() => setToolTipVisible(false)}
      ></Tooltip>

      <TouchableOpacity onPress={() => setToolTipVisible(!toolTipVisible)} style={{ position: "absolute", bottom: 13.5, alignSelf: "center" }}>
        {!toolTipVisible ?
          <Image source={plus} style={[styles.mainIcon, { marginLeft: 40, marginRight: 40 }]} /> :
          <Image source={closed} style={[styles.mainIcon, { marginLeft: 40, marginRight: 40 ,padding:20 }]} />
        }
      </TouchableOpacity> */}
    </>
  );
};

const Inbox = (props: {
  menuOpen: any;
  navigation: any;
  params: any;
  route: any;
  descriptors: any;
  state: any;
  handleMenu: () => any;
}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(props.route);
    props.navigation.setOptions({ tabBarVisible: true });
    if (routeName === "Chat9") {
      props.navigation.setOptions({ tabBarVisible: false });
    } else if (routeName === "SearchUserList") {
      props.navigation.setOptions({ tabBarVisible: false });
    } else if (routeName === "audio") {
      props.navigation.setOptions({ tabBarVisible: false });
    } else if (routeName === "Meeting_Screen") {
      props.navigation.setOptions({ tabBarVisible: false });
    } else if (routeName === "AudioEditor") {
      props.navigation.setOptions({ tabBarVisible: false });
      // } else if (routeName === 'Comments') {
      // 	props.navigation.setOptions({ tabBarVisible: false });
    } else if (routeName === "CfLiveChallenges" || routeName === "AmazonInteractiveVideoService" || routeName === "LiveStreaming") {
      props.navigation.setOptions({ tabBarVisible: false });
    }
  }, [props.navigation, props.route]);

  return (
    <InboxStack.Navigator>
      <InboxStack.Screen
        name='Notifications'
        component={Notifications}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <InboxStack.Screen
        name='FollowRequest'
        component={FollowRequest}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <InboxStack.Screen
        name='ChatList'
        component={ChatList}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <InboxStack.Screen
        name='audio'
        component={audio}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <InboxStack.Screen
        name='AudioEditor'
        component={AudioEditor}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <InboxStack.Screen
        name='SearchUserList'
        component={SearchUserList}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <InboxStack.Screen
        name='ImageScreen'
        component={ImageScreen}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <InboxStack.Screen
        name='Chat9'
        component={Chat9}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <InboxStack.Screen
        name='UserProfileBasicBlock'
        component={UserProfileBasicBlock}
        options={{ headerShown: false }}
        initialParams={{
          data: {
            attributes: {
              account_id: null,
            },
          },
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <InboxStack.Screen
        name='Comments'
        component={Comments}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <InboxStack.Screen
        name='Followings'
        component={Followers}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <InboxStack.Screen
        name="LiveStreaming"
        component={LiveStreaming}
        options={{ headerShown: false, gestureEnabled: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <InboxStack.Screen
        name="EndLive"
        component={EndLive}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <InboxStack.Screen
        name="AmazonInteractiveVideoService"
        component={AmazonInteractiveVideoService}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <InboxStack.Screen
        name="NotificationAmazonIvs"
        component={NotificationAmazonIvs}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <InboxStack.Screen
        name="Meeting_Screen"
        component={Meeting}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <InboxStack.Screen
        name="FetchRecordings"
        component={FetchRecordings}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <InboxStack.Screen
        name="FetchMeetings"
        component={FetchMeeting}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <InboxStack.Screen
        name="FetchStreams"
        component={FetchLiveStreaming}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <InboxStack.Screen
        name="LiveExplore"
        component={LiveExplore}
        listeners={{
          focus: () =>
            BackHandler.addEventListener("hardwareBackPress", handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              "hardwareBackPress",
              handleBackButton
            )
        }}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <PostsStack.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerShown: false }}
      />

      <ProfileStack.Screen
        name="Exchange"
        component={Exchange}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          // logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="ExchangeForcoins"
        component={ExchangeForcoins}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          // logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="withdrawMoney"
        component={withdrawMoney}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          // logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="Balance"
        component={Balance}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          // logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="ManageAccount"
        component={ManageAccount}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          // logoutScreen: props.route.params.logoutScreen
        }}
      />
      <InboxStack.Screen
        name="CfLiveChallenges"
        component={CfLiveChallenges}
        options={{ headerShown: false, gestureEnabled: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <InboxStack.Screen
        name="paymentsuccess"
        component={paymentsuccess}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
    </InboxStack.Navigator>
  );
};
const Profile = (props: {
  menuOpen: any;
  navigation: any;
  route: any;
  handleMenu: () => any;
}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(props.route);
    props.navigation.setOptions({ tabBarVisible: true });
    if (routeName === "DraftScreen") {
      props.navigation.setOptions({ tabBarVisible: false });
    } else if (routeName === "Postsubmit") {
      props.navigation.setOptions({ tabBarVisible: false });
    } else if (routeName === "Setvisibility") {
      props.navigation.setOptions({ tabBarVisible: false });
    } else if (routeName === "Selectaudience") {
      props.navigation.setOptions({ tabBarVisible: false });
    } else if (routeName === "CommentSettings") {
      props.navigation.setOptions({ tabBarVisible: false });
    } else if (routeName === "SelectLocation") {
      props.navigation.setOptions({ tabBarVisible: false });
    } else if (routeName === "Setschedule") {
      props.navigation.setOptions({ tabBarVisible: false });
    } else if (routeName === 'LiveStreaming') {
      props.navigation.setOptions({ tabBarVisible: false });
    } else {
      props.navigation.setOptions({ tabBarVisible: true });
    }
  }, [props.navigation, props.route, props]);

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="UserProfileBasicBlock"
        component={UserProfileBasicBlock}
        options={{ headerShown: false }}
        initialParams={{
          data: {
            attributes: {
              account_id: null
            }
          },
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="PrivacySettings"
        component={PrivacySettings}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="LikeActivity"
        component={LikeActivity}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="LanguageSupport"
        component={LanguageSupport}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="ChatList"
        component={ChatList}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="ReportProblem"
        component={ReportProblem}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name='NotInterestedActivity'
        component={NotInterestedActivity}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <ProfileStack.Screen
        name='SavedActivity'
        component={SavedActivity}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <ProfileStack.Screen
        name='GoLaviCode'
        component={GoLaviCode}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen,
        }}
      />
      <ProfileStack.Screen
        name="LiveStreaming"
        component={LiveStreaming}
        options={{ headerShown: false, gestureEnabled: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          // logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="AmazonInteractiveVideoService"
        component={AmazonInteractiveVideoService}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <ProfileStack.Screen
        name="NotificationAmazonIvs"
        component={NotificationAmazonIvs}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <ProfileStack.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />

      <ProfileStack.Screen
        name="ContentPreferences"
        component={ContentPreferences}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />

      <ProfileStack.Screen
        name="paymentsuccess"
        component={paymentsuccess}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="withdrawsuccess"
        component={WithdrawSuccess}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="Theme"
        component={Theme}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="PrivacySafety"
        component={PrivacySafety}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="Exchange"
        component={Exchange}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="ExchangeForcoins"
        component={ExchangeForcoins}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="withdrawMoney"
        component={withdrawMoney}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="Balance"
        component={Balance}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="ManageAccount"
        component={ManageAccount}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="Followings"
        component={Followers}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="PushNotifications"
        component={PushNotifications}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="DataSaver"
        component={DataSaver}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="BreakReminder"
        component={TakeABreak}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="BedTimeReminder"
        component={BedTimeReminder}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="Blockedusers"
        component={Blockedusers}
        options={{ headerShown: false, title: "Blocked Accounts" }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="Restrictedusers"
        component={RestrictedUsers}
        options={{ headerShown: false, title: "Restricted Accounts" }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="Mutedusers"
        component={MutedUsers}
        options={{ headerShown: false, title: "Muted Accounts" }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="YourActivity"
        component={YourActivity}
        options={{ headerShown: false, title: "Your Activity" }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="LiveFeedScheduling"
        component={LiveFeedScheduling}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="LiveEvent"
        component={LiveEvent}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="DraftList"
        component={DraftList}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="DraftScreen"
        component={DraftScreen}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="Postsubmit"
        component={Postsubmit}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="Setvisibility"
        component={Setvisibility}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="Selectaudience"
        component={Selectaudience}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="Comments"
        component={Comments}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="CommentSettings"
        component={CommentSettings}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />

      <ProfileStack.Screen
        name="SelectLocation"
        component={SelectLocation}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="Setschedule"
        component={Setschedule}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="PerformanceTracker"
        component={PerformanceTracker}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <HomeStack.Screen
        name="LiveRecording"
        component={LiveRecording}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="StripeIntegration"
        component={PaypalView}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
          logoutScreen: props.route.params.logoutScreen
        }}
      />
      <ProfileStack.Screen
        name="PaymentSummary"
        component={PaymentSummary}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <ProfileStack.Screen
        name="TermsandConditions"
        component={TermsAndConditions}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu(),
        }}
      />
      <ProfileStack.Screen
        name="CommentActivity"
        component={CommentActivity}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
      <ProfileStack.Screen
        name="Meeting_Screen"
        component={Meeting}
        options={{ headerShown: false }}
        initialParams={{
          menuOpen: props.menuOpen,
          handleMenu: () => props.handleMenu()
        }}
      />
    </ProfileStack.Navigator>
  );
};
