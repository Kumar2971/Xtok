/**
 * Main Tab Screen
 */
import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
  BackHandler
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import BottomTabScreen from "./BottomTab";

import ManageAccount from "../../blocks/PrivacySettings/src/settingOptions/manageAccount";
import PersonalInformation from "../../blocks/PrivacySettings/src/settingOptions/personalInformation";

const ProfileStack = createStackNavigator();
const TabStackNavigation = (props: any) => {
  return (
    <ProfileStack.Navigator initialRouteName={"BottomTabScreen"}>
      <ProfileStack.Screen
        name={"BottomTabScreen"}
        component={BottomTabScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
        options={{ headerShown: false }}
        // initialParams={{
        //   menuOpen: props.menuOpen,
        //   handleMenu: () => props.handleMenu(),
        //   logoutScreen: props.route.params.logoutScreen
        // }}
      />
      <ProfileStack.Screen
        name="ManageAccount"
        component={ManageAccount}
        options={{ headerShown: false }}
        // initialParams={{
        //   menuOpen: props.menuOpen,
        //   handleMenu: () => props.handleMenu(),
        //   logoutScreen: props.route.params.logoutScreen
        // }}
      />
    </ProfileStack.Navigator>
  );
};

export default TabStackNavigation;
