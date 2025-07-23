import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren, ReactElement, useEffect} from 'react';
import {Slider} from 'react-native-elements';
import FONTS from '../../../../../../components/src/Fonts/Fonts';

export function VideoSubtitleTextSize(
  props: PropsWithChildren<VideoSubtitleTextSizeProps>,
): ReactElement {
  const {onChange,selectedItem} = props;

  return (
    <View style={styles.fontSizeContainer}>
      <View style={styles.sliderContainer}>
        <View style={styles.sliderLabelContainer}>
          <Text style={styles.sliderLabel}>Text Size</Text>
          <Text style={styles.sliderLabel}>{selectedItem}</Text>
        </View>
        <Slider
          minimumValue={8}
          maximumValue={60}
          value={selectedItem}
          onValueChange={value => {
            onChange(Math.round(value))
          }}
          trackStyle={{
            height: 25,
            borderRadius: 25,
          }}
          minimumTrackTintColor={'#eecf45'}
          thumbStyle={{
            height: 0,
            width: 0,
            backgroundColor: 'transparent',
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    width: '90%',
  },
  sliderLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontFamily: FONTS.MontserratSemiBold,
    color: '#a9a9a9',
    fontWeight: '500',
    fontSize: 14,
  },
  fontSizeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
});

export interface VideoSubtitleTextSizeProps {
  onChange(fontSize: number): void;
  selectedItem:number;
}

VideoSubtitleTextSize.defaultProps = {};

export default VideoSubtitleTextSize;
