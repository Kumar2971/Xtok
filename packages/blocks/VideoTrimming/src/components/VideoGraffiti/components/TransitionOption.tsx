import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {PropsWithChildren, ReactElement} from 'react';
import {background, success, _recordingGraf} from '../../../assets';
import Scale from '../../../../../../components/src/Scale';
import FONTS from '../../../../../../components/src/Fonts/Fonts';
import {videoTransitions, VideoTransitionType} from '../constant';

export function TransitionOption(
  props: PropsWithChildren<TransitionOptionProps>,
): ReactElement {
  const {onConfirm} = props;

  const [selectedTab, setSelectedTab] = React.useState<number>(
    VideoTransitionType.fancy,
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerTab}>
        <View style={{width:'100%'}}>
            <Image
              source={_recordingGraf}
              style={[styles.success, styles.recordingVideo]}
            />
        </View>
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
            {label: 'Shining', value: background},
            {label: 'Stars', value: background},
            {label: 'Gifts', value: background},
            {label: 'Multicolor', value: background},
          ].map((item, index) => (
            <TouchableOpacity style={styles.transitionContainer} onPress={()=>props.onSelect(item.label)} >
              <Image source={item.value} style={styles.transitionImage} />
              <Text style={styles.transitionLabel}>{item.label}</Text>
            </TouchableOpacity>
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
    marginTop: 15
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15
  },
  tabLabel: {
    fontFamily: FONTS.MontserratSemiBold,
    color: '#a9a9a9',
    fontWeight: '500',
    paddingRight: 15
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
    marginRight: 15
  },
  transitionImage: {
    height: Scale(60),
    width: Scale(60),
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
    display:'flex',
    alignItems:'center'
  },
  recordingVideo: {
    alignSelf: 'center', 
    width:'100%', 
    resizeMode:'stretch', 
    height:70, 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25, 
    marginRight:5
  }
});

export interface TransitionOptionProps {
  onConfirm: () => void;
  onSelect:Function;
  testID:string
}

TransitionOption.defaultProps = {};

export default TransitionOption;
