import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, StyleSheet, Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_MARGIN = (width - CARD_WIDTH) / 2;

const MyFlatList = () => {
  const route = useRoute();
  const name = route.params.name;
  const image = route.params.image;
  const email = route.params.email;

  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const collectionRef = firestore().collection('RequestsFromPassenger'); // your collection reference here
    collectionRef
      .where('Status', '==', 'Accepted')
      .where('PassengerName', '==', name)
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
        console.log(theRequestedDriver[0]);
        /* console.log(`I AM FIRST DRIVER ${theRequestedDriver[0].id ? theRequestedDriver[0].id : 'false'}`); */
        console.log(
          `I AM SECOND DRIVER  ${
            theRequestedDriver[1] ? theRequestedDriver[1].id : 'false'
          } `,
        );
      }
    }
  }, [dataArray, driverDataFromFirebase]);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.card}>
        <View style={{borderBottomWidth: 0.5, borderBottomColor: 'grey'}}>
          <Text style={styles.title}>Your Ride Was Accepted</Text>
          <Text>Driver Name: {item.DriverName}</Text>
          <Text>
            Car Details:{' '}
            {theRequestedDriver[index]
              ? theRequestedDriver[index].VehicleName
              : ''}{' '}
            |{' '}
            {theRequestedDriver[index]
              ? theRequestedDriver[index].VehicleNumber
              : ''}{' '}
            |{' '}
            {theRequestedDriver[index]
              ? theRequestedDriver[index].VehicleModel
              : ''}{' '}
          </Text>
        </View>

        <View style={{marginTop: 10 , borderBottomWidth: 0.5 , borderBottomColor: 'grey'}}>
          <Text>{item.DriverName} is travelling</Text>
          <Text>From:</Text>
          <Text>
            {theRequestedDriver[index]
              ? theRequestedDriver[index].StartingPoint
              : ''}
          </Text>
          <Text>To:</Text>
          <Text>
            {theRequestedDriver[index]
              ? theRequestedDriver[index].EndingPoint
              : ''}
          </Text>
        </View>

        <View style={{marginTop: 10 , borderBottomWidth: 0.5 , borderBottomColor: 'grey'}}>
          <Text>You had requested a ride</Text>
          <Text>From:</Text>
          <Text>
            {item.PassengerPickupLocation}
          </Text>
          <Text>To:</Text>
          <Text>
            {item.PassengerDropOffLocation}
          </Text>
        </View>

        <View style = {{marginTop: 10}} >
          <Text>Please meet the rider at: {item.PassengerPickupLocation} {'\n'}on {item.PassengerPickupDate} {'\n'}on {item.PassengerPickupTime}</Text>
        </View>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Your accepted rides({dataArray.length})
      </Text>
      <FlatList
        data={dataArray}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatListContainer: {
    paddingVertical: CARD_MARGIN,
  },
  card: {
    width: '100%',
    height: 420,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: CARD_MARGIN,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default MyFlatList;
