import React from 'react';
import {Text, View, TextInput} from 'react-native';
import DriverInfoStyling from '../styling/DriverInfoStyling';

import Dropdown from '../components/dropdown';

export default function PassengerInfo() {
  const options = [
    {
      id: 1,
      name: 'Faculty member',
    },
    {
      id: 2,
      name: 'Student',
    },
  ];

  return (
    <View style={DriverInfoStyling.main_view}>
      <Text style={DriverInfoStyling.heading}>Become a passenger</Text>
      <Text>Please enter the following information</Text>

      <TextInput
        style={DriverInfoStyling.nameInput}
        placeholder="Enter your name"
      />

      <TextInput
        style={DriverInfoStyling.nameInput}
        placeholder="Enter your SZABIST Id"
      />

      <TextInput
        style={DriverInfoStyling.nameInput}
        placeholder="Enter your contact number"
      />

      <View>
        <Dropdown heading="Please select your position" options={options} />
      </View>
      
    </View>
  );
}
