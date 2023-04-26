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
import {useRoute} from '@react-navigation/native';

const {width} = Dimensions.get('window');

export default function RideStatus() {
  const route = useRoute();
  const name = route.params.name;
  const image = route.params.image;
  const email = route.params.email;

  const [dataArray, setDataArray] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [profilePictureModal, setProfilePictureModal] = useState('');

  const [driverDetails, setDriverDetails] = useState(null);

  const [confirmRide, setConfirmRide] = useState(false);

  const [requestStatus, setRequestStatus] = useState(false);

  const updateConfirmRide = confirm => {
    setConfirmRide(confirm);
  };

  const renderItem = ({item, index}) => {
    /* const theRequestedDriver = driverDataFromFirebase.find(item => driverDataFromFirebase.id === item.DriverDocumentId); */

    return (
      <TouchableOpacity
        style={styles.card}
        /* onPress={() => {
          alert(`Pressed on ${driverDataFromFirebase[0]}`);
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
            source={{uri: item.ProfilePicture}}
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
            <Text style={{fontWeight: '800', fontSize: 18}}>
              Passenger's Request:
            </Text>
            <View style={{height: 2}} />
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

          {/* <TouchableOpacity
            onPress={() => {
              //alert(item.PassengerName + "With this id: " + item.id + " ride was accepted")
              const collectionRef = firestore().collection(
                'RequestsFromPassenger',
              ) ;
              const docRef = collectionRef.doc(item.id);

              // Update the document with new data
              docRef
                .update({
                  Status: 'Accepted',
                  /* key2: value2,
                })
                .then(() => {
                  console.log('Document updated successfully!');
                })
                .catch(error => {
                  console.error('Error updating document: ', error);
                });

              setRequestStatus(!requestStatus);
            }}
            style={{
              position: 'absolute',
              bottom: 15,
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
              {requestStatus ? 'Request Accepted' : 'Accept Request'}
            </Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.partition3}>
          <Text style={{fontWeight: '800', fontSize: 18}}>
            Passenger has requested for this ride:
          </Text>

          <Text>
            Pickup Date:{' '}
            {theRequestedDriver[index]
              ? theRequestedDriver[index].DepartureDate
              : ''}
          </Text>

          <Text>
            Pickup Time:{' '}
            {theRequestedDriver[index]
              ? theRequestedDriver[index].DepartureTime
              : ''}
          </Text>

          <Text>
            Starting Location:{' '}
            {theRequestedDriver[index]
              ? theRequestedDriver[index].StartingPoint
              : ''}
          </Text>

          <Text>
            Destination:{' '}
            {theRequestedDriver[index]
              ? theRequestedDriver[index].EndingPoint
              : ''}
          </Text>

          {
            <Text>
              Id :{' '}
              {theRequestedDriver[index] ? theRequestedDriver[index].id : ''}{' '}
            </Text>
          }

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
                  Status: 'Accepted',
                  /* key2: value2, */
                })
                .then(() => {
                  console.log('Document updated successfully!');
                })
                .catch(error => {
                  console.error('Error updating document: ', error);
                });

              /* New */
              const driverRef = firestore().collection('RidesPostedByDriver');
              const driverDocRef = driverRef.doc(theRequestedDriver[index].id);

              // Update the document with new data

              /* console.log("Seats Remaining" , typeof theRequestedDriver[index].EndingPoint.Capacity -
              typeof item.RequestedSeats) */

              console.log("Driver capactiy" , typeof theRequestedDriver[index].Capacity , " : " , theRequestedDriver[index].Capacity)

              console.log("Passenger Request" , typeof item.RequestedSeats , " : " , item.RequestedSeats)
              driverDocRef
                .update({
                  Capacity:
                    theRequestedDriver[index].Capacity - item.RequestedSeats,
                  /* key2: value2, */
                })
                .then(() => {
                  console.log('Document updated successfully!');
                })
                .catch(error => {
                  console.error('Error updating document: ', error);
                });

              setRequestStatus(!requestStatus);
            }}
            style={{
              position: 'absolute',
              bottom: 40,
              right: 15,
              width: 363,
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
              {requestStatus ? 'Request Accepted123' : 'Accept Request123'}
            </Text>
          </TouchableOpacity>
          {/* <View style={styles.seatAvailable}>
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
          </View> */}
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const collectionRef = firestore().collection('RequestsFromPassenger'); // your collection reference here
    collectionRef
      .where('Status', '==', 'Pending')
      .where('DriverName', '==', name)
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

  /* This UseEffect and UseState are used to fetch and store data in array  driverDataFromFirebase*/
  const [driverDataFromFirebase, setDriverDataFromFirebase] = useState([]);
  useEffect(() => {
    const collectionRef = firestore().collection('RidesPostedByDriver'); // your collection reference here
    collectionRef
      /* .where('DriverName', '==', name) */
      .get()
      .then(querySnapshot => {
        const dataArray = [];
        querySnapshot.forEach(doc => {
          const dataObject = {id: doc.id, ...doc.data()};
          dataArray.push(dataObject);
        });
        setDriverDataFromFirebase(dataArray);
      });
  }, [driverDataFromFirebase]);

  /* let theRequestedDriver = ''; */
  const [theRequestedDriver, setTheRequestedDriver] = useState('');

  useEffect(() => {
    if (dataArray.length > 0 && driverDataFromFirebase.length > 0) {
      /* for (let index = 0; index < dataArray.length; index++) {
        setTheRequestedDriver (driverDataFromFirebase.find(
          item => item.id === dataArray[index].DriverDocumentId,
        ))
      } */
    }

    /* console.log(theRequestedDriver.Name); */

    if (dataArray.length > 0 && driverDataFromFirebase.length > 0) {
      /* setTheRequestedDriver(
        driverDataFromFirebase.filter(driver =>
          dataArray.some(data => data.DriverDocumentId === driver.id),
        )
      ); */

      setTheRequestedDriver(
        dataArray
          .filter(data =>
            driverDataFromFirebase.some(
              driver => driver.id === data.DriverDocumentId,
            ),
          )
          .map(data =>
            driverDataFromFirebase.find(
              driver => driver.id === data.DriverDocumentId,
            ),
          ),
      );

      if (theRequestedDriver.length != 0) {
        console.log(
          `I AM FIRST DRIVER ${
            theRequestedDriver[0].id ? theRequestedDriver[0].id : 'false'
          }`,
        );
        console.log(
          `I AM SECOND DRIVER  ${
            theRequestedDriver[1] ? theRequestedDriver[1].id : 'false'
          } `,
        );
      }
    }
  }, [dataArray, driverDataFromFirebase]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Car Pool Requests({dataArray.length})</Text>
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
    height: 540,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4 /* 
    justifyContent: 'center', */,
    alignItems: 'center',
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  partition1: {
    width: '100%',
    /* height: '33.33%', */
    height: '10%',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    paddingLeft: 10,
    paddingTop: 5,
  },
  partition2: {
    width: '100%',
    height: '40%' /* 
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', */,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    paddingLeft: 10,
    paddingTop: 10,
  },
  partition3: {
    width: '100%',
    height: '50%',
    flexDirection: 'column',
    /* alignItems: 'center', */ /* 
    justifyContent: 'center', */
    paddingLeft: 10,
    paddingTop: 10,
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
    maxWidth: '100%',
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
    marginTop: 5,
  },
  buttonVerify: {
    backgroundColor: '#7788ef',
    paddingHorizontal: 10,
    paddingVertical: 5,
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
