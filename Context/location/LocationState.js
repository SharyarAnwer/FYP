/* 
This file will sve the following information about the user:
1. Name
2. Contact Number
3. Email address
4. Pickup Address (Name of place, Latitude, and Longitude)
5. Dropoff Address (Name of place, Latitude, and Longitude)
6. Vehicle Type (Bike or car)
7. Pickup Time
8. Pickup Date
 */
import React, {useState} from 'react';
import LocationContext from './LocationContext';

const LocationState = props => {

  /* This will store the details that are sent from PassengerContact.js */
  const personalDetails = {
    passengerName: 'Name',
    contactNumber: 'Phone Number',
    emailAddress: 'Email Address',
    profilePicture: 'Profile Picture'
  }
  const [passengerDetails, setPassengerDetails] = useState(personalDetails);


  /* This will store the pickup location and the coordinates from the user. */
  const state = {
    latitude: null,
    longitude: null,
    description: "Pickup Location"
  };
  const [location, setLocation] =  useState(state);
  
  /* This will store the dropOff location and the coordinates from the user. */
  const dropOff = {
    latitude: 0,
    longitude: 0,
    description: "Dropoff Location"
  }
  const [dropOffLocation, setDropOffLocation] = useState(dropOff);

  /* This will store the vehicle which the user has choosen. */
  const vehicle = {
    vehicleType: "TRUCK"
  }
  const [ride, setRideType] = useState(vehicle)

  /* This will store the pickup date and time of the passenger. */
  const schedule = {
    date: null,
    time: null
  }
  const [scheduleTime, setScheduleTime] = useState(schedule)

  return (
    <LocationContext.Provider value={[location , setLocation , dropOffLocation, setDropOffLocation , passengerDetails, setPassengerDetails, ride, setRideType, scheduleTime, setScheduleTime]} >
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationState;

    /* const update = () => {
        setLocation({
          latitude: '24.9007815',
          longitude: '67.16810269999999',
        })
    }; */
  
    {/* <LocationContext.Provider value={{state , update}}> */}