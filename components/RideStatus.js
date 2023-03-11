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
import ConfirmRideModal from '../components/ConfirmRideModal';

const {width} = Dimensions.get('window');

export default function RideStatus() {
  const [dataArray, setDataArray] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [profilePictureModal, setProfilePictureModal] = useState('');

  const [driverDetails, setDriverDetails] = useState(null);

  const [confirmRide, setConfirmRide] = useState(false);

  const updateConfirmRide = confirm => {
    setConfirmRide(confirm);
  };

  useEffect(() => {
    console.log('State was update: ' + confirmRide);
  }, [confirmRide]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        /*         onPress={() => {
          alert(`Pressed on ${item.Name}`);
        }} */
      >
        <View style={styles.partition1}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Passenger Name:
          </Text>

          <Text
            style={{
              fontSize: 15,
            }}>
            {item.PassengerName}
          </Text>
          <Image
            source={{uri: item.PassengerProfilePicture}}
            style={styles.image}></Image>
          {/* <View style={{position: 'absolute', left: 75, top: 10}}>
            <Text>{item.Name}</Text>
            <Text>{item.VehicleName}</Text>
            <Text>
              {item.VehicleType} | {item.VehicleNumber} | {item.VehicleModel}
            </Text>
          </View> */}
        </View>

        <View style={styles.partition2}>
          {/* <View>
            <Image
              source={require('../Assets/route1.png')}
              style={styles.icon}></Image>
          </View> */}
          <View style={styles.addressBox}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Pickup Location:
            </Text>
            <Text>{item.PassengerPickupLocation}</Text>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Dropoff Location
            </Text>
            <Text>{item.PassengerDropOffLocation}</Text>

            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Pickup Time:
              {/* {item.PassengerPickupDate} At {item.PassengerPickupTime} */}
            </Text>
            <Text>
              {item.PassengerPickupDate} at {item.PassengerPickupTime}
            </Text>

            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Seats Requested:{' '}
              </Text>
              <Text>{item.RequestedSeats}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              //alert(item.PassengerName + "With this id: " + item.id + " ride was accepted")
              const collectionRef = firestore().collection(
                'RequestsFromPassenger',
              );
              const docRef = collectionRef.doc(item.id);

              // Update the document with new data
              docRef
                .update({
                  RequestStatus: "Accepted",
                  /* key2: value2, */
                })
                .then(() => {
                  console.log('Document updated successfully!');
                })
                .catch(error => {
                  console.error('Error updating document: ', error);
                });
            }}
            style={{
              position: 'absolute',
              bottom: 25,
              right: 15,
              width: 150,
              height: 50,
              backgroundColor: '#7788ef',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              Accept Request
            </Text>
          </TouchableOpacity>
        </View>

        {/*  <View style={styles.partition3}>
          <View style={styles.seatAvailable}>
            <Text>{item.SeatingCapacity} Seat Available</Text>
          </View>
          <View style={styles.requestButton}>
            <View style={styles.buttonVerifyWrapper}>
              <TouchableOpacity
                style={styles.buttonVerify}
                onPress={() => {
                  setIsModalVisible(true);
                  setDriverDetails(item);
                }}>
                <Text style={styles.textButtonVerify}>Request A Ride</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> */}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const collectionRef = firestore().collection('RequestsFromPassenger'); // your collection reference here
    collectionRef
      /* .where('VehicleType', '==', 'Bike') */
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
      <Text style={styles.heading}>Car Pool Requests ({dataArray.length})</Text>
      <FlatList
        /* data={DATA} */
        data={dataArray}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
      />
      {driverDetails && (
        <ConfirmRideModal
          isVisible={isModalVisible}
          closeModal={() => setIsModalVisible(false)}
          profile={driverDetails}
          updateConfirmRide={updateConfirmRide}
        />
      )}
    </View>
  );
}

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
    height: '25%',
    display: 'flex',
    flexDirection: 'column',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    paddingTop: 10,
    paddingLeft: 10,
  },
  partition2: {
    width: '100%',
    height: '75%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    /* borderBottomColor: 'grey',
    borderBottomWidth: 0.5, */
    paddingLeft: 10,
    /* paddingTop: 10, */
  },
  partition3: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: 50,
    width: 50,
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
