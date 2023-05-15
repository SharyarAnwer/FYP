import React from 'react';
import {useRoute} from '@react-navigation/native';
import {View, Text} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';

import License from './AdminPortal/License';
import Cnic from './AdminPortal/Cnic';

export default function AdminPortal() {
  const route = useRoute();

  const name = route.params.name;
  const image = route.params.image;
  const email = route.params.email;

  const Tab = createMaterialTopTabNavigator();

  return (
      <Tab.Navigator
        initialRouteName="License"
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarLabelStyle: {fontSize: 14},
          tabBarStyle: {backgroundColor: '#4772FF'},
        }}>
        <Tab.Screen
          name="License"
          component={License}
          options={{tabBarLabel: 'License'}}
        />
        <Tab.Screen
          name="Cnic"
          component={Cnic}
          options={{tabBarLabel: 'Updates'}}
        />
      </Tab.Navigator>
  );
}
