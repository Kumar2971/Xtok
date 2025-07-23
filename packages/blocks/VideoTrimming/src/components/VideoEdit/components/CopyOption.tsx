import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {PropsWithChildren, ReactElement} from 'react';
import {back, background} from '../../../assets';
import FONTS from '../../../../../../components/src/Fonts/Fonts';
import Scale from '../../../../../../components/src/Scale';

export function CopyOption(
  props: PropsWithChildren<CopyOptionProps>,
): ReactElement {
  const {onConfirm} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Copied selected item</Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View style={styles.sortImage}>
          <TouchableOpacity onPress={onConfirm}>
            <Image source={back} style={styles.back} />
          </TouchableOpacity>
          <Image source={background} style={styles.transitionImage} />
          <Image source={background} style={styles.transitionImage} />
          <Image source={background} style={styles.transitionImage} />
          <View />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    fontSize: 13,
    fontFamily: FONTS.MontserratSemiBold,
    color: '#eee',
    padding: 10,
  },
  transitionImage: {
    height: Scale(60),
    width: Scale(60),
    resizeMode: 'cover',
    borderWidth: 4,
    borderColor: '#FFF',
    borderRadius: 5,
  },
  back: {
    height: Scale(60),
    width: Scale(60),
    resizeMode: 'contain',
  },
  sortImage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export interface CopyOptionProps {
  onConfirm: () => void;
}

CopyOption.defaultProps = {};

export default CopyOption;
