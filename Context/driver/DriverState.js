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
    passengerName: 'Name',
    contactNumber: 'Phone Number',
    emailAddress: 'Email Address',
  };
  const [driverDetails, setDriverDetails] = useState(personalDetails);

  const vehicleDetails = {
    vehicleName: '',
    vehicleNumber: '',
    vehicleModel: '',
    vehicleType: '',
    seatingCapacity: '',
  }
  const [vehicleInfo, setVehicleInfo] = useState(vehicleDetails)

  const [CNIC_url, setCNIC_url] = useState("")
  
  const [licenseUrl, setLicenseUrl] = useState("")

  return(

    <DriverContext.Provider value = {[driverDetails, setDriverDetails, vehicleInfo, setVehicleInfo, CNIC_url, setCNIC_url, licenseUrl, setLicenseUrl]}>
        {props.children}
    </DriverContext.Provider>
  )
};

export default DriverState;
