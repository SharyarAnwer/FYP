import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useContext, useState, useRef, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import LocationContext from '../Context/location/LocationContext';
import MapViewDirections from 'react-native-maps-directions';

export default function Map() {
  const [
    location,
    setLocation,
    dropOffLocation,
    setDropOffLocation,
    passengerDetails,
    setPassengerDetails,
    ride,
    setRideType,
    scheduleTime,
    setScheduleTime,
    kilometers,
    setKilometers,
  ] = useContext(LocationContext);

  const origin = {
    latitude: location.latitude,
    longitude: location.longitude,
    description: location.description,
  };

  const destination = {
    latitude: dropOffLocation.latitude,
    longitude: dropOffLocation.longitude,
    description: dropOffLocation.description,
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
  
  /* function updateTravellingDistance(distance) {
    console.log("SOMETHING HERE" , distance)
    setKilometers({
      dist : distance
    })
    console.log("SOMETHING HERE AS WELL13" , kilometers.dist)
  }

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${encodeURIComponent(
          destination.description,
        )}&origins=${encodeURIComponent(
          origin.description,
        )}&units=imperial&key=${GOOGLE_MAPS_APIKEY}`,
      )
        .then(res => res.json())
        .then(data => {
          console.log('Distance1234567:', data.rows[0].elements[0].distance.text);
          updateTravellingDistance(data.rows[0].elements[0].distance.text)
          /* setDistance((state) => ({
            ...state , dist : data.rows[0].elements[0].distance.text
          })) 
        })
        .catch(error => {
          console.log('I AM THE ERROR', error);
        });
    };

    getTravelTime();
  }, [origin, destination,  GOOGLE_MAPS_APIKEY]); */

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
        {location.longitude !== 0 &&
          location.latitude !== 0 &&
          dropOffLocation.longitude !== 0 &&
          dropOffLocation.latitude !== 0 && (
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

        {location.longitude !== 0 && location.latitude !== 0 && (
          <>
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Pickup location:"
              description={location.description}
              identifier="Pickup Location"
            />
          </>
        )}

        {dropOffLocation.longitude !== 0 && dropOffLocation.latitude !== 0 && (
          <>
            <Marker
              coordinate={{
                latitude: dropOffLocation.latitude,
                longitude: dropOffLocation.longitude,
              }}
              title="Dropoff location:"
              description={dropOffLocation.description}
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
