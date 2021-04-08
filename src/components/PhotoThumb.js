import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from 'react-native-image-progress';

import Loading from '@/Loading';

const PhotoThumb = ({ url, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        imageStyle={styles.image}
        indicator={() => <Loading />}
        source={{ uri: url }}
        resizeMode="cover"
        onLoad={this.loadHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    width: 100,
    height: 100,
  },
  image: {
    borderRadius: 10,
    minWidth: 100,
    minHeight: 100,
  },
});

export default PhotoThumb;
