import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {PropsWithChildren, ReactElement} from 'react';
import {closeImg, success} from '../../../assets';
import Scale from '../../../../../../components/src/Scale';
import FONTS from '../../../../../../components/src/Fonts/Fonts';

export function SpeedOption(
  props: PropsWithChildren<SpeedOptionProps>,
): ReactElement {
  const {onConfirm,onClose} = props;

  const [speed, setSpeed] = React.useState<string>('1.0');
  const [volume, setVolume] = React.useState<string>('1.0');

  return (
    <View style={styles.container}>
      <View style={styles.mainFunction}>
        <Text style={styles.title}>Apply current clip only</Text>

        <View
          style={{
            // flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:20
          }}
        >
          <View style={styles.speedOptionContainer}>
            {[
              {label: '0.25x', value: '1.75' , volume: '0.5'},
              {label: '0.5x', value: '1.5', volume: '0.75'},
              {label: '1x', value: '1.0', volume: '1.0'},
              {label: '2x', value: '0.5', volume: '1.35'},
              {label: '3x', value: '0.75', volume: '1.5'},
            ].map((item, index) => (
              <TouchableOpacity
                style={[
                  styles.speedOption,
                  speed === item.value && styles.speedOptionSelected,
                ]}
                onPress={() => {
                  setVolume(item.volume);
                  setSpeed(item.value)}}
                key={index}
              >
                <Text
                  style={[
                    styles.speedLabel,
                    speed === item.value && styles.speedLabelSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <TouchableOpacity testID='speed' onPress={()=> onConfirm(speed,volume)} style={styles.confirmContainer}>
        <Image
          source={success}
          style={[styles.success, {alignSelf: 'center'}]}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{position:'absolute',right:10,top:10}} testID='cancel' onPress={() => onClose()}>
            <Image source={closeImg} style={{height: Scale(30),
    width: Scale(30),
    resizeMode: 'contain',}} />
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // marginBottom:30,
  },
  title: {
    alignSelf: 'center',
    fontSize: 13,
    fontFamily: FONTS.MontserratSemiBold,
    color: '#eee',
    padding: 10,
  },
  success: {
    height: Scale(40),
    width: Scale(40),
  },
  confirmContainer: {
    height: 40,
    // flex: 1,
    marginTop:30,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  mainFunction: {
    // flex: 1,
  },
  speedOption: {
    height: Scale(50),
    width: Scale(50),
    borderRadius: 100,
    backgroundColor: '#2a292a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedLabel: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
    fontFamily: FONTS.MontserratSemiBold,
  },
  speedOptionSelected: {
    height: Scale(60),
    width: Scale(60),
    borderWidth: 2,
    borderColor: '#ffe303',
  },
  speedLabelSelected: {
    color: '#ffe303',
    fontSize: 18,
    fontWeight: '700',
  },
  speedOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#414041',
    padding: 16,
    width: '90%',
    borderRadius: 100,
  },
});

export interface SpeedOptionProps {
  onConfirm(value:string,volume:string): void;
  onClose():void;
}

SpeedOption.defaultProps = {};

export default SpeedOption;
