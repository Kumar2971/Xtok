import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import { back, loader, play } from '../../../assets';
import FONTS from '../../../../../../components/src/Fonts/Fonts';
import Scale from '../../../../../../components/src/Scale';
import { VideoPicker } from '../../../VideoTrimmingController';
//@ts-ignore
import DraggableFlatList from 'react-native-draggable-dynamic-flatlist'

export function SortOption(
  props: PropsWithChildren<SortOptionProps>,
): ReactElement {
  const { onConfirm, videoData, onSelectVideo } = props;

  const [newOrderData, setNewOrderData] = useState<VideoPicker[]>(videoData);

  useEffect(() => {
    setNewOrderData(videoData)
  }, [videoData])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Long press and then sort by dragging left and Right</Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View style={styles.sortImage}>
          <TouchableOpacity testID="oderData" onPress={() => onConfirm(newOrderData)}>
            <Image source={back} style={styles.back} />
          </TouchableOpacity>
          <DraggableFlatList
          testID="draggable"
            horizontal
            data={newOrderData}
            renderItem={({ item, index, move, moveEnd, isActive }: any) => {
              return <TouchableOpacity onLongPress={move}
                onPressOut={moveEnd} style={styles.transitionImage}>
                <ImageBackground
                  source={item.poster ? { uri:'file://' + item.poster } : loader}
                  resizeMode={'cover'}
                  style={{
                    height: Scale(60),
                    width: Scale(60),
                    alignItems:'center',
                    justifyContent:'center',
                  }}
                >
                  <TouchableOpacity style={{
                    height: Scale(30),
                    width: Scale(30)
                  }} onPress={() => {
                    // onSelectVideo(item)
                  }}>
                    <Image source={play} style={{ height: 12, width: 12, resizeMode: 'contain', position: 'absolute', left: 9, top: 9 }} />
                  </TouchableOpacity>
                </ImageBackground>
              </TouchableOpacity>
            }}
            onMoveEnd={({ data }: { data: VideoPicker[] }) => setNewOrderData(data)}
          />

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
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow:'hidden'
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

export interface SortOptionProps {
  onConfirm(vidData: VideoPicker[]): void;
  videoData: VideoPicker[];
  onSelectVideo(video: VideoPicker): void;
}

SortOption.defaultProps = {};

export default SortOption;
