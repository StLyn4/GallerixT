import React from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';

import Loading from '@/Loading';

class PhotoThumb extends React.Component {
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
    const { url, containerStyle, imageStyle } = this.props;
    const loadingOffset = containerStyle?.height ?? styles.container.height;
    return (
      <View style={[styles.container, containerStyle]}>
        <Image
          style={[styles.image, imageStyle]}
          source={{ uri: url }}
          resizeMode="cover"
          onLoad={this.loadHandler}
        />
        <Animated.View
          style={{
            opacity: this.state.loadingOpacity,
          }}
        >
          <Loading style={loadingOffset && { marginTop: -loadingOffset }} />
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
