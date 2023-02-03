import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';

export default function Map() {
  return (
    <View>
      <MapView
        style={styles.container}
        initialRegion={{
          latitude:  24.8203135,
          longitude: 67.0310276,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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
