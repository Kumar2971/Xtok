import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {PropsWithChildren, ReactElement, useEffect} from 'react';
import {success} from '../../../assets';
import Scale from '../../../../../../components/src/Scale';
import FONTS from '../../../../../../components/src/Fonts/Fonts';

export function VideoSubtitleColor(
  props: PropsWithChildren<VideoSubtitleColorProps>,
): ReactElement {
  const {
    onPress,
    selectedItem
  } = props;

  return (
    <ScrollView
    bounces={false}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.containerStyle}
    >
      {[
        {
          label: 'Soft Blue',
          color: '#79a6ff',
        },
        {
          label: 'Soft Yellow',
          color: '#ffbd55',
        },
        {
          label: 'Blue Gradient',
          color: '#7b00ea',
        },
        {
          label: 'Soft Pink',
          color: '#ff22b7',
        },
      ].map((item, index) => (
        <TouchableOpacity
          onPress={() => {
            onPress(item.color);
          }}
          style={styles.colorItemContainer}
          key={index}
        >
          <View style={[styles.colorItem, {backgroundColor: item.color}]}>
            {selectedItem === item.color && <Image source={success} />}
          </View>
          <Text style={styles.colorItemLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  colorItemContainer: {
    marginRight: 16,
    alignItems: 'center',
  },
  colorItem: {
    height: Scale(70),
    width: Scale(70),
    borderRadius: Scale(10),
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorItemLabel: {
    fontFamily: FONTS.MontserratSemiBold,
    color: '#a9a9a9',
    fontSize: 12,
  },
  containerStyle: {
    alignItems: 'center',
  },
});

export interface VideoSubtitleColorProps {
  onPress(color: string): void;
  selectedItem:string;
}

VideoSubtitleColor.defaultProps = {};

export default VideoSubtitleColor;
