import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {PropsWithChildren, ReactElement} from 'react';
import {background} from '../../../assets';
import Scale from '../../../../../../components/src/Scale';
import FONTS from '../../../../../../components/src/Fonts/Fonts';
import {videoTransitions, VideoTransitionType} from '../constant';

export function TransitionOption(
  props: PropsWithChildren<TransitionOptionProps>,
): ReactElement {
  const {onConfirm} = props;

  const [selectedTab, setSelectedTab] = React.useState<number>(
    VideoTransitionType.basics,
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerTab}>
        <View style={styles.tabContainer}>
          {videoTransitions.map((item, index) => (
            <TouchableOpacity onPress={() => setSelectedTab(item.value)}>
              <Text
                style={[
                  styles.tabLabel,
                  selectedTab === item.value && styles.activeTabLabel,
                ]}
              >
                {item.label}
              </Text>
              {selectedTab === item.value && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View style={styles.activeTab} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            {label: 'None', value: null},
            {label: 'Overlay', value: background},
            {label: 'Flash Black', value: background},
          ].map((item, index) => (
            <View style={styles.transitionContainer}>
              <Image source={item.value} style={styles.transitionImage} />
              <Text style={styles.transitionLabel}>{item.label}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  size: {
    fontSize: 13,
    color: '#fff',
  },
  success: {
    height: Scale(40),
    width: Scale(40),
  },
  confirmContainer: {
    height: '30%',
    borderTopWidth: 1,
    borderTopColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  applyLabel: {
    fontFamily: FONTS.MontserratSemiBold,
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  headerTab: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  tabLabel: {
    fontFamily: FONTS.MontserratSemiBold,
    color: '#a9a9a9',
    fontWeight: '500',
  },
  activeTabLabel: {
    color: 'white',
  },
  activeTab: {
    height: 3,
    width: '50%',
    marginTop: 2,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  transitionImage: {
    height: Scale(80),
    width: Scale(80),
    resizeMode: 'cover',
    borderRadius: 10,
  },
  transitionLabel: {
    fontFamily: FONTS.MontserratSemiBold,
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  transitionContainer: {
    marginRight: 16,
  },
});

export interface TransitionOptionProps {
  onConfirm: () => void;
}

TransitionOption.defaultProps = {};

export default TransitionOption;