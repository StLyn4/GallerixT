import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

const Gallery = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Photo', { name: 'Test' })}
    >
      <Text>Gallery</Text>
    </TouchableOpacity>
  );
};

export default Gallery;
