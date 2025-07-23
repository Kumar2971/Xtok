import { Dimensions, FlatList, StyleSheet, Image, View, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { PropsWithChildren, ReactElement } from 'react';
import { EmojiData, StickerData } from './EmojiData';

export function CoverEmojiPicker(
  props: PropsWithChildren<CoverEmojiPickerProps>,
): ReactElement {
  const { onChange, isSticker } = props;

  return (
    <SafeAreaView style={styles.fontSizeContainer}>
      <View style={styles.sliderContainer}>
        <View style={styles.sliderLabelContainer}>
          {!isSticker ? <FlatList
          bounces={false}
          testID='emojiList'
            numColumns={7}
            key={0}
            data={EmojiData}
            renderItem={({ item,index }) => {
              return <TouchableOpacity key={index + "key"} onPress={() => onChange("https://cdnjs.cloudflare.com/ajax/libs/emoji-datasource-twitter/5.0.1/img/twitter/64/" + item.image)}>
                <Image resizeMode={'contain'} style={{ height: (Dimensions.get('window').width / 7) - 7, width: (Dimensions.get('window').width / 7) - 7 }} source={{ uri: "https://cdnjs.cloudflare.com/ajax/libs/emoji-datasource-twitter/5.0.1/img/twitter/64/" + item.image }} />
              </TouchableOpacity>
            }}
          />
            :
            <FlatList
            bounces={false}
            testID='stickerList'
              key={1}
              horizontal
              data={StickerData}
              renderItem={({ item,index }) => {
                return <TouchableOpacity key={index + "new"} onPress={() => onChange("https://cdnjs.cloudflare.com/ajax/libs/emoji-datasource-twitter/5.0.1/img/twitter/64/" + item.image)}>
                  <Image resizeMode={'contain'} style={{ height: 100, width: 100, marginRight: 7, marginLeft: 7 }} source={{ uri: "https://cdnjs.cloudflare.com/ajax/libs/emoji-datasource-twitter/5.0.1/img/twitter/64/" + item.image }} />
                </TouchableOpacity>
              }}
            />
          }
        </View>
      </View>
    </SafeAreaView>
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
     marginTop: 20,
    overflow: 'hidden',
  },
  sliderLabel: {
    color: '#a9a9a9',
    fontWeight: '500',
    fontSize: 14,
  },
  fontSizeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    marginTop:10,
    width: '100%',
  },
});

export interface CoverEmojiPickerProps {
  onChange(fontSize: string): void;
  isSticker: boolean;
}

CoverEmojiPicker.defaultProps = {};

export default CoverEmojiPicker;
