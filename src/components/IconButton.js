import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ name, size = 32, color, onPress, style, hitSlop }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style} hitSlop={hitSlop}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;
