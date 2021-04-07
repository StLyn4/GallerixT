import React from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';

import Loading from '@/Loading';

class PhotoBlock extends React.Component {
  state = {
    loadingOpacity: new Animated.Value(1),
  };

  loadHandler = () => {
    Animated.timing(this.state.loadingOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { url, mode = 'thumb', style: userStyle } = this.props;
    return (
      <View
        style={[
          styles.container,
          mode === 'thumb' && styles.containerThumb,
          userStyle,
        ]}
      >
        <Image
          style={[styles.image, mode === 'thumb' && styles.imageThumb]}
          source={{ uri: url }}
          resizeMode="cover"
          onLoad={this.loadHandler}
        />
        <Animated.View
          style={{
            opacity: this.state.loadingOpacity,
          }}
        >
          <Loading style={styles.loadingStyle} />
        </Animated.View>
      </View>
    );
  }
}

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
  },
  containerThumb: {
    width: 100,
    height: 100,
  },
  image: {
    borderRadius: 10,
  },
  imageThumb: {
    minWidth: 100,
    minHeight: 100,
  },
  loadingStyle: {
    marginTop: -100,
  },
});

export default PhotoBlock;
