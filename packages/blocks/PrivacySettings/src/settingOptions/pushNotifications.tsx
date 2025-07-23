import React from 'react';
// Customizable Area Start
import Scale from '../../../../components/src/Scale';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import {
  Vector,
  imgRightArrow,
  imgLeftArrow,
  SwitchOff,
  SwitchOn,
} from '../assets';
// Customizable Area End
import settingOptionsCommonController from './settingOptionsCommonController';
import { getStorageData } from "../../../../framework/src/Utilities";
import { Props } from './settingOptionsCommonController';
import CustomLoader from '../../../../components/src/CustomLoader';
import { translate } from '../../../../components/src/i18n/translate';
let screenHeight = Dimensions.get('window').height;
let screenWidth = Dimensions.get('window').width;
export default class PushNotifications extends settingOptionsCommonController {
  // Customizable Area Start
  async componentDidMount() {
    this.getUserGeneralNotificationSettings();
    this.getUserNotificationsSettings();

    const language = await getStorageData("SelectedLng");
    this.setState({ language: language });
  this.props.navigation.addListener('focus', async () => {
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
        <TouchableOpacity testID='privacy'
          onPress={() => this.props.navigation.navigate('PrivacySettings')}
        >
          <Image
            source={this.state.language !== 'ar' ? imgLeftArrow : imgRightArrow}
            style={this.state.language !== 'ar' ? styles.backarrow_style_en: styles.backarrow_style}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{translate('push_Notifications')}</Text>
      </View>
    );
  };

  item = () => {
    return (
      <ScrollView>
        <View
          style={{
            paddingHorizontal: Scale(10),
            paddingBottom: Scale(45),
            height: '100%',
          }}
        >
          <TouchableOpacity testID='notificationSetting'
            style={styles.item}
            onPress={() => {
              this.updateGeneralNotificationSettings();
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.title}>
                {translate('push_notifications')}
              </Text>
            </View>
            <View>
              {this.state.setAllPushNotifications ? (
                <Image source={SwitchOn} style={styles.icon} />
              ) : (
                <Image source={SwitchOff} style={styles.icon} />
              )}
            </View>
          </TouchableOpacity>
          <View style={{ paddingHorizontal: Scale(13) }}>
            <Text style={styles.subHeader}>
              {translate('disable_push_notifications')}
            </Text>
          </View>
          <View style={[styles.divider, { marginVertical: Scale(15) }]} />
          <Text style={styles.subTitles}>
            {translate('account_privacy')}
          </Text>
          <TouchableOpacity
            testID='enableN'
            style={styles.item}
            disabled={!this.state.setAllPushNotifications}
            onPress={() => {
              this.updateUserNotificationsSettings(
                'is_like_notification_enable',
                !this.state.PushNotificationLike
              );
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.title,
                  !this.state.setAllPushNotifications && styles.greyText,
                ]}
              >
                {translate('Likes')}
              </Text>
            </View>
            <View>
              {this.state.PushNotificationLike ? (
                <Image source={SwitchOn} style={styles.icon} />
              ) : (
                <Image source={SwitchOff} style={styles.icon} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            testID='commentNotify'
            style={styles.item}
            disabled={!this.state.setAllPushNotifications}
            onPress={() => {
              this.updateUserNotificationsSettings(
                'is_comment_notification_enable',
                !this.state.PushNotificationComments
              );
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[
                  styles.title,
                  !this.state.setAllPushNotifications && styles.greyText,
                ]}
              >
                {translate('Comments')}
              </Text>
            </View>
            <View>
              {this.state.PushNotificationComments ? (
                <Image source={SwitchOn} style={styles.icon} />
              ) : (
                <Image source={SwitchOff} style={styles.icon} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            testID='follower'
            style={styles.item}
            disabled={!this.state.setAllPushNotifications}
            onPress={() => {
              this.updateUserNotificationsSettings(
                'is_follower_notification_enable',
                !this.state.PushNotificationNewFollowers
              );
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[
                  styles.title,
                  !this.state.setAllPushNotifications && styles.greyText,
                ]}
              >
                {translate('new_Followers')}
              </Text>
            </View>
            <View>
              {this.state.PushNotificationNewFollowers ? (
                <Image source={SwitchOn} style={styles.icon} />
              ) : (
                <Image testID='switchOffImg' source={SwitchOff} style={styles.icon} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
          testID='tagNotify'
          disabled={!this.state.setAllPushNotifications}
            style={styles.item}
            onPress={() => {
              this.updateUserNotificationsSettings(
                'is_tagging_notification_enable',
                !this.state.PushNotificationMentionAndTags
              );
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[
                  styles.title,
                  !this.state.setAllPushNotifications && styles.greyText,
                ]}
              >
                {translate('mentionsTags')}
              </Text>
            </View>
            <View>
              {this.state.PushNotificationMentionAndTags ? (
                <Image source={SwitchOn} style={styles.icon} />
              ) : (
                <Image source={SwitchOff} style={styles.icon} />
              )}
            </View>
          </TouchableOpacity>


          <View style={[styles.divider, { marginVertical: Scale(15) }]} />
          <Text style={styles.subTitles}>
            {translate('video_Suggestions')}
          </Text>
          <TouchableOpacity testID='videoAcc'
            style={styles.item}
            onPress={() => {
              this.updateUserNotificationsSettings(
                'is_video_from_account_you_follow_enable',
                !this.state.PushNotificationVideoFromAccount
              );
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.title}>
                {translate('VideosfromAccounts')}
              </Text>
            </View>
            <View>
              {this.state.PushNotificationVideoFromAccount ? (
                <Image source={SwitchOn} style={styles.icon} />
              ) : (
                <Image source={SwitchOff} style={styles.icon} />
              )}
            </View>
          </TouchableOpacity>

          <View style={[styles.divider, { marginVertical: Scale(15) }]} />
          <Text style={styles.subTitles}>
            {translate('LIVE')}
          </Text>
          <TouchableOpacity testID='liveAcc'
            style={styles.item}
            onPress={() => {
              this.updateUserNotificationsSettings(
                'is_live_streaming_vedio_from_account_you_follow_enable',
                !this.state.PushNotificationLiveFromAccount
              );
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.title}>{translate('LiveFromAccounts')}</Text>
            </View>
            <View>
              {this.state.PushNotificationLiveFromAccount ? (
                <Image source={SwitchOn} style={styles.icon} />
              ) : (
                <Image source={SwitchOff} style={styles.icon} />
              )}
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    );
  };
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
          {this.item()}
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
    marginLeft: 'auto',
    marginRight: 'auto',
    width: Platform.OS === 'web' ? '75%' : '100%',
    maxWidth: 650,
  },
  greyText: {
    color: '#A0A0A4',
  },
  headercontainer: {
    flexDirection: "row",
		alignItems:'center',
		paddingHorizontal: Scale(15),
		height: Scale(40),
		width: '100%',
  },
  headerText: {
    fontSize:Scale(18),
    fontWeight:'bold',
	width:screenWidth-Scale(60),
	textAlign:'center'
  },
  backarrow_style: {
    width: Scale(20),
    height: Scale(18),
    resizeMode: 'contain',
  },
  backarrow_style_en: {
    width: Scale(25),
    height: Scale(25),
    resizeMode:"contain"
  },
  icon: {
    width: Scale(35),
    height: Scale(35),
    resizeMode: 'contain',
  },
  divider: {
    borderBottomColor: '#B7BBC0',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: Scale(5),
  },
  title: {
    fontSize: Scale(16),
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginVertical: 8,
    marginHorizontal: 14,
    color:"#000"
  },
  subHeader: {
    fontSize: Scale(12),
    color: '#B7B7B7',
    textAlign: "left"
  },
  subTitles:{
    color: '#A0A0A4',
    fontSize: Scale(14),
    marginBottom: Scale(5),
    paddingHorizontal: Scale(13),
    textAlign:"left"
  }
});
// Customizable Area End
