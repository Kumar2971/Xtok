import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Loader = () => {
  return (
    <View style={styles.mainStyle}>
      <ActivityIndicator color={'orange'} size={'large'} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  mainStyle: {
    height: '100%',
    width:'100%',
    backgroundColor: '#000',
    opacity: 0.5,
    zIndex: 1,
    position:"absolute",
    justifyContent: 'center',
  },
});
