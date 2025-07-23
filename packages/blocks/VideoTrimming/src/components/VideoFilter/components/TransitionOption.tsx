import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { PropsWithChildren, ReactElement } from 'react';
import {  _recordingGraf, closeImg } from '../../../assets';
import Scale from '../../../../../../components/src/Scale';
import FONTS from '../../../../../../components/src/Fonts/Fonts';
import { videoTransitions, VideoTransitionType } from '../constant';

export function TransitionOption(
  props: PropsWithChildren<TransitionOptionProps>,
): ReactElement {

  const [activeTab, setActiveTab] = React.useState<number>(
    VideoTransitionType.portrait,
  );
  const [effect, setEffect] = React.useState({
    [VideoTransitionType.portrait]: 0,
    [VideoTransitionType.scenery]: 0,
    [VideoTransitionType.food]: 0,
    [VideoTransitionType.style]: 0,
  });


  return (
    <View style={styles.container}>
    
      <View style={styles.tabContainer}>
        {videoTransitions.map((item, index) => (
          <TouchableOpacity onPress={() => setActiveTab(item.value)}>
            <Text
              style={[
                styles.tabLabel,
                activeTab === item.value && styles.activeTabLabel,
              ]}
            >
              {item.label}
            </Text>
            {activeTab === item.value && (
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
      <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.ContainerStyle}>
        {[
          {
            label: 'Erase',
            value: closeImg,
          },
          ...videoTransitions.find(item => item.value === activeTab)!
            .options,
        ].map((item, index) => {
          return (
            <TouchableOpacity testID='effect' style={styles.transitionContainer}
              onPress={() => {
                setEffect({
                  ...effect,
                  [activeTab]: index,
                });
                //@ts-ignore
                props.onFilter(activeTab, item?.label, item.command_string)
              }}
            >
              <Image source={item.value} style={[
                styles.optionImage,
                effect[activeTab as VideoTransitionType] !== 0 &&
                effect[activeTab as VideoTransitionType] === index &&
                styles.optionImageSelected,
              ]} />
              <Text style={styles.transitionLabel}>{item.label}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>

   
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
    width: "100%",
    padding: 16,
    marginTop: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '80%',
    marginVertical: 15,
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

  transitionLabel: {
    fontFamily: FONTS.MontserratSemiBold,
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  transitionContainer: {
    marginRight: 16,
    alignItems: 'center',

  },
  recordingVideo: {
    alignSelf: 'center',
    width: '100%',
    resizeMode: 'stretch',
    height: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginRight: 5
  },
  sliderStyle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10
  },
  optionImage: {
    height: Scale(40),
    width: Scale(40),
    borderRadius: Scale(60),
    marginBottom: 8,
  },
  optionImageSelected: {
    borderWidth: 4,
    borderColor: '#eecf45',
  },
  ContainerStyle: {
    width: '100%',
    padding: 10,
    flex: 1,
  },
});

export interface TransitionOptionProps {
  onConfirm: () => void;
  onFilter: any;
  testID: string
}

TransitionOption.defaultProps = {};

export default TransitionOption;