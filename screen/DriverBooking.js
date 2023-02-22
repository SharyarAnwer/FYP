import {View, Text, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DriverContext from '../Context/driver/DriverContext';

import DriverNavigateCard from '../components/DriverNavigateCard';
//import RideOptionsCard from '../components/RideOptionsCard';

//import AvailableDrivers from './AvailableDrivers';

import DriverMap from '../components/DriverMap';
//import LocationState from '../Context/location/LocationState';


export default function DriverBooking() {
  const [driverDetails, setDriverDetails, vehicleInfo, setVehicleInfo, CNIC_url, setCNIC_url, licenseUrl, setLicenseUrl] =
    useContext(DriverContext);

    const Stack = createStackNavigator();
  return (

    <View style={styles.container}>
        <View style={styles.box1}>
          <DriverMap />
        </View>

        <View style = {styles.box2}>
          <DriverNavigateCard/>
        </View>
        {/* <Stack.Navigator style={styles.box2}>
          <Stack.Screen
            name="NavigateCard"
            component={DriverNavigateCard}
            options={{
              headerShown: false,
            }}
          />

        </Stack.Navigator> */}
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


/* <View>
  <Text>Name: {driverDetails.passengerName}</Text>
  <Text>Name: {driverDetails.contactNumber}</Text>
  <Text>Name: {driverDetails.emailAddress}</Text>
  <Text>Vehicle Name: {vehicleInfo.vehicleName}</Text>
  <Text>Vehicle Number: {vehicleInfo.vehicleNumber}</Text>
  <Text>Vehicle Model: {vehicleInfo.vehicleModel}</Text>
  <Text>Vehicle Type: {vehicleInfo.vehicleType}</Text>
  <Text>Seating Capacity: {vehicleInfo.seatingCapacity}</Text>
  <Text>URL for CNIC: {CNIC_url}</Text>
  <Text>URL for License: {licenseUrl}</Text>
</View> */