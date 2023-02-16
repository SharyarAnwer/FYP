import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import DriverInfoStyling from '../styling/DriverInfoStyling';
import {TextInput} from 'react-native-paper';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function PassengerInfo() {
  
  const vehicleType = [
    {
      id: 1,
      vehicle: 'Bike',
    },
    {
      id: 2,
      vehicle: 'Car',
    },
  ];

  
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

  const [vehicleName, setVehicleName] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState(null);

  const [selectVehicle, setSelectVehicle] = useState('Select Vehicle');
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState(vehicleType);
  
  const seatingCapacity = [
    {
      id: 1,
      capacity: 1
    },
    {
      id: 2,
      capacity: 2
    },
    {
      id: 3,
      capacity: 3
    },
    {
      id: 4,
      capacity: 4
    }
  ]

  const [capacity, setCapacity] = useState("Select seating capacity")
  const [isVehicleCap, setIsVehicleCap] = useState(false);
  const [vehicleCap, setVehicleCap] = useState(seatingCapacity);

  return (
    <View style={DriverInfoStyling.main_view}>
      <Text style={DriverInfoStyling.heading}>Switch to driver</Text>
      <Text>Please enter the following information</Text>

      <View style={DriverInfoStyling.nameInput}>
        <TextInput
          placeholder="Vehicle name"
          mode="outlined"
          label="Vehicle Name"
          value={vehicleName}
          onChangeText={name => setVehicleName({name})}
          activeOutlineColor="#7788ef"
        />
      </View>

      <View style={DriverInfoStyling.nameInput}>
        <TextInput
          placeholder="Vehicle number"
          mode="outlined"
          label="Vehicle Number"
          value={vehicleNumber}
          onChangeText={name => vehicleNumber({name})}
          activeOutlineColor="#7788ef"
        />
      </View>

      <View style={DriverInfoStyling.nameInput}>
        <TextInput
          placeholder="Vehicle Model"
          mode="outlined"
          label="Vehicle Model"
          value={vehicleNumber}
          onChangeText={name => vehicleNumber({name})}
          activeOutlineColor="#7788ef"
        />
      </View>

      <View style={dropdown.container}>
        <TouchableOpacity
          style={dropdown.selector}
          onPress={() => {
            setIsClicked(!isClicked);
          }}>
          <Text>{selectVehicle}</Text>
          {isClicked ? (
            <AntDesign name="caretup" color={'#4772FF'} size={10}></AntDesign>
          ) : (
            <AntDesign name="caretdown" color={'#4772FF'} size={10}></AntDesign>
          )}
        </TouchableOpacity>

        {isClicked ? <View style={dropdown.dropDownArea}>
          <FlatList
            data = {data}
            renderItem = {({item , index}) => {
              return(
                <TouchableOpacity style = {dropdown.vehicleType}
                  onPress = {() => {
                    setSelectVehicle(item.vehicle)
                    setIsClicked(false)
                  }}
                >
                  <Text>{item.vehicle}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View> : null}
      </View>
      
      <View style={second_dropdown.container}>
        <TouchableOpacity
          style={second_dropdown.selector}
          onPress={() => {
            setIsVehicleCap(!isVehicleCap)
            //setIsClicked(!isClicked);
          }}>
          <Text>{capacity}</Text>
          {isVehicleCap ? (
            <AntDesign name="caretup" color={'#4772FF'} size={10}></AntDesign>
          ) : (
            <AntDesign name="caretdown" color={'#4772FF'} size={10}></AntDesign>
          )}
        </TouchableOpacity>

        {isVehicleCap ? <View style={second_dropdown.dropDownArea}>
          <FlatList
            data = {vehicleCap}
            renderItem = {({item , index}) => {
              return(
                <TouchableOpacity style = {second_dropdown.vehicleType}
                  onPress = {() => {
                    setSelectVehicle(item.capacity)
                    setIsClicked(false)
                  }}
                >
                  <Text>{item.capacity}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View> : null}

      </View>

    </View>
  );
}

const dropdown = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  selector: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#8e8e8e',
    alignSelf: 'center',
    marginVertical: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  dropDownArea: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginTop: 0,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
    zIndex: 20
  },
  vehicleType:
  {
    width: "85%",
    height: 50,
    borderBottomWidth: .2,
    borderBottomColor: '#8e8e8e',
    alignSelf: 'center',
    justifyContent: 'center'
  }
});

const second_dropdown = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: -180
  },
  selector: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#8e8e8e',
    alignSelf: 'center',
    marginVertical: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  dropDownArea: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginTop: 0,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
  },
  vehicleType:
  {
    width: "85%",
    height: 50,
    borderBottomWidth: .2,
    borderBottomColor: '#8e8e8e',
    alignSelf: 'center',
    justifyContent: 'center'
  }
});
