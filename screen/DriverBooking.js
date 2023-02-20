import {View, Text} from 'react-native';
import React from 'react';
import DriverContext from '../Context/driver/DriverContext';
import {useState, useEffect, useContext} from 'react';

export default function DriverBooking() {
  const [driverDetails, setDriverDetails, vehicleInfo, setVehicleInfo, CNIC_url, setCNIC_url, licenseUrl, setLicenseUrl] =
    useContext(DriverContext);

  //const [vehicleInformation, setVehicleInformation] = useState(vehicleInfo);

  /* useEffect(() => {
    return (
      <></>
    );
  }, [vehicleInfo]); */

  return (
    <View>
      <Text>Vehicle Name: {vehicleInfo.vehicleName}</Text>
      <Text>Vehicle Number: {vehicleInfo.vehicleNumber}</Text>
      <Text>Vehicle Model: {vehicleInfo.vehicleModel}</Text>
      <Text>Vehicle Type: {vehicleInfo.vehicleType}</Text>
      <Text>Seating Capacity: {vehicleInfo.seatingCapacity}</Text>
      <Text>URL for CNIC: {CNIC_url}</Text>
      <Text>URL for License: {licenseUrl}</Text>
    </View>
  );
}
