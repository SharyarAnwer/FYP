/* 
This file will sve the following information about the user:
1. Name
2. Contact Number
3. Email address
4. Vehicle Name
5. Vehicle Number
6. Vehicle Model
7. Seating capacity
8. URL to CNIC image
9. URL to License image
 */

import React, {useState} from 'react';
import DriverContext from './DriverContext';

const DriverState = props => {
  const personalDetails = {
    driverName: 'Name',
    contactNumber: 'Phone Number',
    emailAddress: 'Email Address',
    profilePicture: 'Profile Picture',
    department: "Department",
    SZABISTid: "ID"
  };
  const [driverDetails, setDriverDetails] = useState(personalDetails);

  const vehicleDetails = {
    vehicleName: '',
    vehicleNumber: '',
    vehicleModel: '',
    vehicleType: '',
    seatingCapacity: '',
  };
  const [vehicleInfo, setVehicleInfo] = useState(vehicleDetails);

  const [CNIC_url, setCNIC_url] = useState('');

  const [licenseUrl, setLicenseUrl] = useState('');

  const startingPoint = {
    latitude: null,
    longitude: null,
    description: 'Starting Point',
  };
  const [startingPointLocation, setStartingPointLocation] =
    useState(startingPoint);

  /* This will store the dropOff location and the coordinates from the user. */
  const endingPoint = {
    latitude: 0,
    longitude: 0,
    description: 'Ending Point',
  };
  const [endingPointLocation, setEndingPointLocation] = useState(endingPoint);

  /* This will store the pickup date and time of the passenger. */
  const schedule = {
    date: null,
    time: null
  }
  const [scheduleTime, setScheduleTime] = useState(schedule)

  return (
    <DriverContext.Provider
      value={[
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
        setScheduleTime
      ]}>
      {props.children}
    </DriverContext.Provider>
  );
};

export default DriverState;
