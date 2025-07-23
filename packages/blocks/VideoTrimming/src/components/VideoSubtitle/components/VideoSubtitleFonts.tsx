import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {PropsWithChildren, ReactElement, useEffect} from 'react';
import {closeImg} from '../../../assets';
import Scale from '../../../../../../components/src/Scale';
import FONTS from '../../../../../../components/src/Fonts/Fonts';
import Strings from '../../../../../../components/src/Strings';

export function VideoSubtitleFonts(
  props: PropsWithChildren<VideoSubtitleFontsProps>,
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
      contentContainerStyle={styles.fontOptionContainer}
    >
      {[
        // {
        //   font: Strings.poppinsRegular,
        //   icon: closeImg,
        // },{
        //   font: Strings.poppinsSemiBold,
        //   icon: closeImg,
        // },
        {
          font: Strings.poppinsExtraLight,
          icon: closeImg,
        },
        {
          font: Strings.poppinsRegular,
          icon: closeImg,
        },
        // {
        //   font: Strings.LatoBlack,
        //   icon: closeImg,
        // },
        {
          font: Strings.LatoReglar,
          icon: closeImg,
        },
        // {
        //   font: Strings.HelveticaBold,
        //   icon: closeImg,
        // },
        //{
        //   font: Strings.poppinsBold,
        //   icon: closeImg,
        // },
        {
          font: Strings.HelveticaRegular,
          icon: closeImg,
        },
        // {
        //   font: Strings.poppinsBoldItalic,
        //   icon: closeImg,
        // },
        // {
        //   font: Strings.poppinsExtraBold,
        //   icon: closeImg,
        // },
        // {
        //   font: Strings.poppinsExtraBoldItalic,
        //   icon: closeImg,
        // },
        {
          font: Strings.Brusher,
          icon: closeImg,
        },{
          font: Strings.knewave,
          icon: closeImg,
        },{
          font: Strings.BebasNeueRegular,
          icon: closeImg,
        },
        // {
        //   font: Strings.poppinsItalic,
        //   icon: closeImg,
        // },
        // {
        //   font: Strings.RobotoBoldItalic,
        //   icon: closeImg,
        // },
        // {
        //   font: Strings.poppinsMedium,
        //   icon: closeImg,
        // },
        // {
        //   font: Strings.RobotoLightItalic,
        //   icon: closeImg,
        // },
        // {
        //   font: Strings.RobotoBlackItalic,
        //   icon: closeImg,
        // },
      ].map((item, index) => (
        <TouchableOpacity
          onPress={() => {
            onPress(item.font);
          }}
          key={index}
          style={[
            styles.fontOption,
            item.font === selectedItem && styles.selectedFontOption,
          ]}
        >
          <Image source={item.icon} style={[styles.close, {marginBottom: 8}]} />
          <Text
            style={[
              styles.fontOptionLabel,
              item.font === selectedItem && styles.selectedFontOptionLabel,
            ]}
            numberOfLines={2}
          >
            {item.font}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fontOptionContainer: {
    marginHorizontal: 16,
    alignItems: 'center',
  },
  fontOption: {
    height: Scale(90),
    width: Scale(90),
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 16,
  },
  selectedFontOption: {
    borderColor: '#eecf45',
    borderWidth: 2,
  },
  fontOptionLabel: {
    fontSize: 12,
    color: '#939393',
    fontFamily: FONTS.MontserratSemiBold,
    fontWeight: '500',
    textAlign:'center'
  },
  selectedFontOptionLabel: {
    color: '#eecf45',
  },
  close: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: 'contain',
  },
});

export interface VideoSubtitleFontsProps {
  onPress(font: string): void;
  selectedItem:string|null;
}

VideoSubtitleFonts.defaultProps = {};

export default VideoSubtitleFonts;
