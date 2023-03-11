import {View, Text, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import AvailableDrivers from './AvailableDrivers';

import Map from '../components/Map';
import LocationState from '../Context/location/LocationState';

export default function Booking() {
  

  const Stack = createStackNavigator();
  
  return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <Map />
        </View>

        <Stack.Navigator style={styles.box2}>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="RideOptions"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />

        </Stack.Navigator>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  box1: {
    flex: 1 /* 
    backgroundColor: 'red', */,
    alignItems: 'center',
    justifyContent: 'center',
    /* width:600,
    height:600 */
  },
  box2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
