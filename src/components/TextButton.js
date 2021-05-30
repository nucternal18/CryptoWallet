import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';

const TextButton = ({ label, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        paddingHorizontal: 18,
        borderRadius: 15,
        backgroundColor: COLORS.gray1,
        ...containerStyle,
          }}
          onPress={onPress}
      >
      <Text style={{ color: COLORS.white, ...FONTS.h3}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
