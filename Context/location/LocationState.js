import React, {useState, useEffect} from 'react';
import LocationContext from './LocationContext';

const LocationState = props => {

  const state = {
    latitude: 24.8210537,
    longitude: 67.0341254,
    description: "Pickup Location"
  };

  const dropOff = {
    latitude: 24.8338325,
    longitude: 67.0336822,
    description: "Dropoff Location"
  }

  const [location, setLocation] = useState(state);
  const [dropOffLocation, setDropOffLocation] = useState(dropOff);

  /* const update = () => {
      setLocation({
        latitude: '24.9007815',
        longitude: '67.16810269999999',
      })
  }; */

  {/* <LocationContext.Provider value={{state , update}}> */}

  return (
    <LocationContext.Provider value={[location , setLocation , dropOffLocation, setDropOffLocation]} >
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationState;
