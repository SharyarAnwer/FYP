import {View, Text} from 'react-native';
import React from 'react';

import {useRoute} from '@react-navigation/native';

export default function AdminPortal() {

  const route = useRoute();

  const name = route.params.name;
  const image = route.params.image;
  const email = route.params.email;

  return (
    <View>
      <Text>Name: {name} </Text>
      <Text>Image: {image} </Text>
      <Text>Email: {email} </Text>
    </View>
  );
}
