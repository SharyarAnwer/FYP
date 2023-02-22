import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useContext, useState, useRef, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import DriverContext from '../Context/driver/DriverContext';
import MapViewDirections from 'react-native-maps-directions';

export default function DriverMap() {
  const [
    driverDetails,
    setDriverDetails,
    vehicleInfo,
    setVehicleInfo,
    CNIC_url,
    setCNIC_url,
    licenseUrl,
    setLicenseUrl,
    startingPointLocation,
    setStartingPointLocation,
    endingPointLocation,
    setEndingPointLocation,
    scheduleTime,
    setScheduleTime,
  ] = useContext(DriverContext);

  const origin = {
    latitude: startingPointLocation.latitude,
    longitude: startingPointLocation.longitude,
    description: startingPointLocation.description,
  };

  const destination = {
    latitude: endingPointLocation.latitude,
    longitude: endingPointLocation.longitude,
    description: endingPointLocation.description,
  };

  const GOOGLE_MAPS_APIKEY = 'AIzaSyCDONMlPUu--Fepxz5C7-cqfopYRa12FB4';

  const mapRef = useRef(null);
  useEffect(() => {
    if (!origin || !destination) return;

    //Zoom and fit to markers
    mapRef.current.fitToSuppliedMarkers(
      ['Pickup Location', 'Dropoff Location'],
      {edgePadding: {top: 70, right: 50, bottom: 50, left: 50}},
    );
  }, [origin, destination]);

  return (
    <View>
      <MapView
        ref={mapRef}
        style={styles.container}
        /* mapType="mutedStandard" */
        initialRegion={{
          latitude: 24.8203135,
          longitude: 67.0310276,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        {startingPointLocation.longitude !== 0 &&
          startingPointLocation.latitude !== 0 &&
          endingPointLocation.longitude !== 0 &&
          endingPointLocation.latitude !== 0 && (
            <>
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="#7788ef"
              />
            </>
          )}

        {startingPointLocation.longitude !== 0 &&
          startingPointLocation.latitude !== 0 && (
            <>
              <Marker
                coordinate={{
                  latitude: startingPointLocation.latitude,
                  longitude: startingPointLocation.longitude,
                }}
                title="Pickup location:"
                description={startingPointLocation.description}
                identifier="Pickup Location"
              />
            </>
          )}

        {endingPointLocation.longitude !== 0 && endingPointLocation.latitude !== 0 && (
            <>
              <Marker
                coordinate={{
                  latitude: endingPointLocation.latitude,
                  longitude: endingPointLocation.longitude,
                }}
                title="Dropoff location:"
                description={endingPointLocation.description}
                identifier="Dropoff Location"
              />
            </>
          )}
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
    width: 900,
    height: 900,
  },
});
