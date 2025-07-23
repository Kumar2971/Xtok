import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {PropsWithChildren, ReactElement, useState} from 'react';
import {success} from '../../../assets';
import Scale from '../../../../../../components/src/Scale';

export function CanvasOption(
  props: PropsWithChildren<CanvasOptionProps>,
): ReactElement {
  const {onConfirm} = props;
  const colorData = [
    {
      name: 'white',
      color:'1:0:0:0:1:0:0:0:1'
    },
    {
      name: 'gray',
      color:'0.3333:0.3333:0.3333:0.3333:0.3333:0.3333:0.3333:0.3333:0.3333'
    },
    {
      name: 'yellow',
      color:'1:0:0:0:1:0:0:0:0'
    },
    {
      name: 'green',
      color:'0:0:0:0:1:0:0:0:0'
    },
    {
      name: 'cyan',
      color:'1:0:0:0:1:1:0:0:0'
    },
    {
      name: 'blue',
      color:'.3:.3:0:0:.3:.3:0:0:.3:.3'
    },
    {
      name: 'red',
      color:'1:0:0:0:0:0:0:0:0'
    },
    {
      name: 'pink',
      color:'1:0:1:0:0:1:0:0:0'
    },
    {
      name: 'purple',
      color:'0.5:0:0.5:0:1:0:0.5:0:1'
    }
  ]
  const [selectedColor,setSelectedColor] = useState<string>('');

  return (
    <View style={styles.container}>

      <FlatList
      testID='ParticipantFlatListTest'
      showsHorizontalScrollIndicator={false}
      horizontal
      data={colorData}
      renderItem={({item})=> <TouchableOpacity onPress={()=> setSelectedColor(item.color)}><View style={[styles.canvasColor, {backgroundColor: item.name,borderColor:'white',borderWidth: selectedColor === item.color ? 2 : 0}]} /></TouchableOpacity>}
      />
      <TouchableOpacity testID='colorSize' onPress={()=> onConfirm(selectedColor)} style={styles.confirmContainer}>
        <Image
          source={success}
          style={[styles.success, {alignSelf: 'center'}]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  canvasColor: {
    height: Scale(30),
    width: Scale(30),
    backgroundColor: '#aaa',
    margin: 10,
    borderRadius: 50,
  },
  CanvasColorView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  canvasSize: {
    height: Scale(60),
    width: Scale(50),
    backgroundColor: 'gray',
    marginHorizontal:10,
    marginTop:10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
    height: '20%',
    borderTopWidth: 1,
    borderTopColor: 'white',
    marginTop:20,
  },
});

export interface CanvasOptionProps {
  onConfirm(color: string) : void;
  videoUri:string;
}

CanvasOption.defaultProps = {};

export default CanvasOption;
