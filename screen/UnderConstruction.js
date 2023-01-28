import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';

export default function Booking() {
  const {width, height} = Dimensions.get('window');

  return (
    <View>
      <Image
        source={require('../Assets/underconstruction.gif')}
        style={{width, height}}
        resizeMode="contain"
      />
    </View>
  );
}
