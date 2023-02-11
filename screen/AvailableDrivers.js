import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';

//This is used to import and update data from LocationContext.js
import LocationContext from '../Context/location/LocationContext';

import firestore from '@react-native-firebase/firestore';

export default function AvailableDrivers() {
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
  ] = useContext(LocationContext);

  return (
    <>
      <Text>
        Vehicle Type: {ride.vehicleType}
        Name: {passengerDetails.passengerName}
        Contact Number: {passengerDetails.contactNumber}
        Email Address: {passengerDetails.emailAddress}
        Pickup Location: {location.description}
        Pickup Latitude: {location.latitude}
        Pickup Longitude: {location.longitude}
        Dropoff Locatin: {dropOffLocation.description}
        Dropoff Latitude: {dropOffLocation.latitude}
        Dropoff Longitude: {dropOffLocation.longitude}
        Pickup date: {scheduleTime.date}
        Pickup time: {scheduleTime.time}
      </Text>

      <Button
        title="SUBMIT"
        onPress={() => {
          firestore()
            .collection('Passengers')
            .add({
              Name: passengerDetails.passengerName,
              Mobile_number: passengerDetails.contactNumber,
              Email: passengerDetails.emailAddress,
              Pickup_Location: location.description,
              Pickup_Latitude: location.latitude,
              Pickup_Longitude: location.longitude,
              Dropoff_Location: dropOffLocation.description,
              Dropoff_Latitude: dropOffLocation.latitude,
              Dropoff_Longitude: dropOffLocation.longitude,
              Pickup_Date: scheduleTime.date,
              Pickup_Time: scheduleTime.time 
            })
            .then(() => {
              console.log('User added successfully!');
            });
        }}></Button>
    </>
  );
}
/* Pickup Location: {location.description}
        Pickup Latitude: {location.latitude}
        Pickup Longitude: {location.longitude}

        Dropoff Locatin: {dropOffLocation.description}
        Dropoff Latitude: {dropOffLocation.latitude}
        Dropoff Longitude: {dropOffLocation.longitude} */

/* 
          import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;
const cardHeight = screenHeight / 4;

const data = [
  { key: 'Item 1' },
  { key: 'Item 2' },
  { key: 'Item 3' },
  { key: 'Item 4' },
  { key: 'Item 5' },
  { key: 'Item 6' },
  { key: 'Item 7' },
  { key: 'Item 8' },
  // Add more items as needed
];

const Card = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Text style={styles.cardText}>{item.key}</Text>
  </TouchableOpacity>
);

const FlatListExample = () => (
  <View style={styles.container}>
    <View style={styles.headingContainer}>
      <Text style={styles.heading}>Available Rides Today</Text>
    </View>
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Card item={item} onPress={() => console.log(`Item ${item.key} was pressed`)} />
      )}
      keyExtractor={item => item.key}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    height: cardHeight,
    backgroundColor: 'lightgray',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FlatListExample;

        */
