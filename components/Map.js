import {View, Text, StyleSheet, Button} from 'react-native';
import React , {useContext , useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import LocationContext from '../Context/location/LocationContext';

export default function Map() {
  const [location , setLocation] = useContext(LocationContext) 

  return (
    <View> 
      <MapView
        style={styles.container}
        /* mapType="mutedStandard" */
        initialRegion={{
          latitude:  24.8203135,
          longitude: 67.0310276,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{latitude: location.latitude , longitude: location.longitude}}
          title = "Pickup location:"
          description = {location.description}
          identifier='Pickup Location'
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* position: 'absolute', */
    /* top: 0,
    left: 0,
    right: 0,
    bottom: 0, */ 
    width:900,
    height: 900
  },
});
