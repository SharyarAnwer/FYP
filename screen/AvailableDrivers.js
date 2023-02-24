import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const {width} = Dimensions.get('window');

const DATA = [
  {id: '1', title: 'Card 1', image: require('../Assets/man.png')},
  {id: '2', title: 'Card 2', image: require('../Assets/man.png')},
  {id: '3', title: 'Card 3', image: require('../Assets/man.png')},
  {id: '4', title: 'Card 4', image: require('../Assets/man.png')},
  {id: '5', title: 'Card 5', image: require('../Assets/man.png')},
  {id: '6', title: 'Card 6', image: require('../Assets/man.png')},
  {id: '7', title: 'Card 7', image: require('../Assets/man.png')},
  {id: '8', title: 'Card 8', image: require('../Assets/man.png')},
];

/* const collectionRef = firestore().collection('Drivers'); */

/* const dataArray = []; */

/* collectionRef
  /* .where('VehicleType', '==', 'Car')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const dataObject = {id: doc.id, ...doc.data()};
      dataArray.push(dataObject);
    });
    console.log(dataArray);
  }); */


const renderItem = ({item}) => {

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        alert(`Pressed on ${item.Name}`);
      }}>
      <View style={styles.partition1}>
        <Image source={{uri: item.ProfilePictuer}} style={styles.image}></Image>
        <View style={{position: 'absolute', left: 75, top: 10}}>
          <Text>{item.Name}</Text>
          <Text>{item.VehicleName}</Text>
          <Text>
            {item.VehicleType} | {item.VehicleNumber} | {item.VehicleModel}
          </Text>
        </View>
      </View>

      <View style={styles.partition2}>
        <View>
          <Image
            source={require('../Assets/route1.png')}
            style={styles.icon}></Image>
        </View>
        <View style={styles.addressBox}>
          <Text>{item.StartingPoint}</Text>
          <Text>TO</Text>
          <Text>{item.EndingPoint}</Text>

          <Text style={{fontWeight: 'bold'}}>
            Time: {item.DepartureDate} At {item.DepartureTime}{' '}
          </Text>
        </View>
      </View>

      <View style={styles.partition3}>
        <View style={styles.seatAvailable}>
          <Text>{item.SeatingCapacity} Seat Available</Text>
        </View>
        <View style={styles.requestButton}>
          <View style={styles.buttonVerifyWrapper}>
            <TouchableOpacity style={styles.buttonVerify}>
              <Text style={styles.textButtonVerify}>Request A Ride</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FlatListWithCards = () => {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const collectionRef = firestore().collection('Drivers'); // your collection reference here
    collectionRef
      .where('VehicleType', '==', 'Bike')
      .get()
      .then(querySnapshot => {
        const dataArray = [];
        querySnapshot.forEach(doc => {
          const dataObject = {id: doc.id, ...doc.data()};
          dataArray.push(dataObject);
        });
        setDataArray(dataArray);
      });
  }, [dataArray]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Riders</Text>
      <FlatList
        /* data={DATA} */
        data={dataArray}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    width: width,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  partition1: {
    width: '100%',
    /* height: '33.33%', */
    height: '30.33%',
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partition2: {
    width: '100%',
    height: '48%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  partition3: {
    width: '100%',
    height: '21.77%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    position: 'absolute',
    left: 10,
    top: 14,
    height: 50,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    width: 55,
    height: 80,
    /* marginLeft: 5, */
    marginHorizontal: 5,
    resizeMode: 'stretch',
  },
  addressBox: {
    alignSelf: 'center',
    flexGrow: 2,
    display: 'flex',
    maxWidth: '82.5%',
  },
  requestButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatAvailable: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonVerifyWrapper: {
    alignItems: 'center',
    /* alignSelf:'center', */
    /* marginVertical: 0, */
    width: '100%',
    height: '80%',
    marginTop: 10,
  },
  buttonVerify: {
    backgroundColor: '#7788ef',
    paddingHorizontal: 10,
    paddingVertical: 10,
    /* width: '100%',
    height: '100%', */
    alignItems: 'center',
    borderRadius: 10,
  },
  textButtonVerify: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default FlatListWithCards;

/* import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
  FlatList,
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

  const {width} = Dimensions.get('window');
  const CARD_WIDTH = width * 0.9;
  const CARD_MARGIN = (width - CARD_WIDTH) / 2;

  const DATA = [
    {id: '1', title: 'Card 1'},
    {id: '2', title: 'Card 2'},
    {id: '3', title: 'Card 3'},
    {id: '4', title: 'Card 4'},
    {id: '5', title: 'Card 5'},
    {id: '6', title: 'Card 6'},
    {id: '7', title: 'Card 7'},
    {id: '8', title: 'Card 8'},
  ];

  return (
    <>
      <FlatList
        data={DATA}
        horizontal
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
        snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
      />
    </>
  );

}



{
  /* <Text>
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
          ProfilePicture: passengerDetails.profilePicture,
          Pickup_Location: location.description,
          Pickup_Latitude: location.latitude,
          Pickup_Longitude: location.longitude,
          Dropoff_Location: dropOffLocation.description,
          Dropoff_Latitude: dropOffLocation.latitude,
          Dropoff_Longitude: dropOffLocation.longitude,
          Pickup_Date: scheduleTime.date,
          Pickup_Time: scheduleTime.time,
        })
        .then(() => {
          console.log('User added successfully!');
        });
    }}></Button>
}
 */
