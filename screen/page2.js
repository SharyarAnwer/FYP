import React, {useEffect, useState, useContext, useRef} from 'react';

/* All components which we are using should be imported from react-native. Here we have imported Text , View , TouchableOpacity.*/
import {Text, View, TouchableOpacity, Image, Animated} from 'react-native';

/* All styling of page2.js is written in the page1styling.js file. Below we have imported the styling so we can use it in the page2.js*/
import page2styling from '../styling/page2styling';

/* React-native-vector-icon is a library which provides us with ready-to-use shapes. This library was imported because we wanted to use an arrow in our app. 
Shapes offered by this library are divided into many categories. Ant design is one of the many categories. From ant design we imported the arrow shape.*/
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';
import {Navigation} from 'react-native-navigation';
/*Allows us to use google sign in functionality.  */
import {GoogleSignin} from '@react-native-google-signin/google-signin';

/*  */
import auth, {firebase} from '@react-native-firebase/auth';

/*  */
import {useRoute} from '@react-navigation/native';

import Dropdown from '../components/dropdown';
import {FadeOutToBottomAndroidSpec} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';
import DriverInfo from './DriverInfo';

import firestore from '@react-native-firebase/firestore';

import Loader from './Loader';

//This is used to import data from LocationContext.js
import LocationContext from '../Context/location/LocationContext';

import DriverContext from '../Context/driver/DriverContext';

export default function Page2() {
  /* This makes a connection between RideOptionCard.js and LocationState.js.  */
  const [
    location,
    setLocation,
    dropOffLocation,
    setDropOffLocation,
    passengerDetails,
    setPassengerDetails,
    ride,
    setRideType,
  ] = useContext(LocationContext);

  const [
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
    setScheduleTime,
  ] = useContext(DriverContext);

  const navigation = useNavigation();

  const route = useRoute();

  const name = route.params.name;
  const email = route.params.email;
  const imageUrl = route.params.imageURL;

  const [option, setOption] = useState(false);

  const [passengerArray, setpassengerArray] = useState([]);
  const [driverArray, setDriverArray] = useState([]);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const collection1Ref = firestore().collection('Drivers');
    const collection2Ref = firestore().collection('Passengers');

    const promises = [];

    promises.push(collection1Ref.get());
    promises.push(collection2Ref.get());

    Promise.all(promises)
      .then(snapshots => {
        const collection1Data = snapshots[0].docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDriverArray(collection1Data);

        const collection2Data = snapshots[1].docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setpassengerArray(collection2Data);
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });

    setTimeout(() => {
      setVisible(false);
    }, 2000);
  }, []);

  return (
    <View style={page2styling.view}>
      {visible && <Loader />}

      {/* Touchable Opacity was used to create a custom button. We cannot use the default button because styling cannot be applied to the default button in react native. */}
      <TouchableOpacity
        style={page2styling.button1}
        onPress={() => {
          if (
            passengerArray.some(
              passenger =>
                passenger !== null &&
                passenger.profileStatus === 'Verified' &&
                passenger.Email === route.params.email,
            )
            /* passengerArray[0] != null &&
            passengerArray[0].profileStatus === 'Verified' &&
            passengerArray[0].Email === route.params.email */
          ) {
            setPassengerDetails({
              passengerName: name,
              emailAddress: email,
              profilePicture: imageUrl,
            });
            navigation.navigate('Book A Ride', {
              name: route.params.name,
              email: route.params.email,
              image: imageUrl,
            });
          } else {
            navigation.navigate('Passenger Contact', {
              name: route.params.name,
              email: route.params.email,
              image: imageUrl,
            });
          }
        }}>
        <View style={page2styling.i_need_a_ride_button}>
          <Text style={page2styling.buttonText1}>I need a ride</Text>

          {/* This line was used to create a circle shape.*/}
          <Text style={page2styling.circle1}>
            {/* This line of code makes an arrow. The arrow was imported from AntDesign and used in our button.*/}
            <AntDesign
              name="arrowright"
              color={'#4772FF'}
              size={30}></AntDesign>
          </Text>
        </View>
      </TouchableOpacity>

      {/* Touchable Opacity was used to create a custom button. We cannot use the default button because styling cannot be applied to the default button in react native. */}
      <TouchableOpacity
        style={page2styling.button2}
        /* onPress={ () => {navigation.navigate('Driver Booking'  , {name: route.params.name , email : route.params.email , image : imageUrl})}} */
        onPress={() => {
          console.log(driverArray[0]);
          if (
            driverArray.some(
              driver =>
                driver !== null &&
                driver.profileStatus === 'Verified' &&
                driver.Email === route.params.email,
            )
            /* (driverArray[0] != null) &&
            (driverArray[0].profileStatus === 'Verified') &&
            (driverArray[0].Email === route.params.email) */
          ) {
            navigation.navigate('Driver Booking', {
              name: route.params.name,
              email: route.params.email,
              image: imageUrl,
            });
          } else {
            navigation.navigate('Driver Contact', {
              name: route.params.name,
              email: route.params.email,
              image: imageUrl,
            });
          }
        }}>
        <View style={page2styling.i_am_driving_button}>
          <Text style={page2styling.buttonText2}>I am driving</Text>

          {/* This line was used to create a circle shape.*/}
          <Text style={page2styling.circle2}>
            {/* This line of code makes an arrow. The arrow was imported from AntDesign and used in our button.*/}
            <AntDesign name="arrowright" color={'white'} size={30}></AntDesign>
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={page2styling.signOutButton}
        /* onPress={route.params.signout} */
        onPress={() => setOption(!option)}>
        <Image style={page2styling.signOutButton1} source={{uri: imageUrl}} />
      </TouchableOpacity>

      {/* {option && (<Dropdown/>)} */}

      {option && (
        <View style={page2styling.dropDown}>
          <AntDesign
            style={page2styling.caretup}
            name="caretup"
            color={'#4772FF'}
            size={30}></AntDesign>

          <TouchableOpacity onPress={() => {
            navigation.navigate("Passenger Ride Status" , {
              name: route.params.name,
              email: route.params.email,
              image: imageUrl,
            })
           }}>
            <Text style={page2styling.signOut}>Passenger's Request</Text>
          </TouchableOpacity>

          <View style = {{width: '100%' , backgroundColor: '#ffffff' , height: 1}} />
          
          <TouchableOpacity 
           onPress={() => {
            navigation.navigate("Ride Status" , {
              name: route.params.name,
              email: route.params.email,
              image: imageUrl,
            })
           }}>
            <Text style={page2styling.signOut}>Driver's Request</Text>
          </TouchableOpacity>

          <View style = {{width: '100%' , backgroundColor: '#ffffff' , height: 1}} />

          <TouchableOpacity
            style={page2styling.option1}
            onPress={() => {
              route.params.signout();
              navigation.popToTop();
            }}>
            <MaterialIcons
              name="logout"
              color={'#fff'}
              size={30}></MaterialIcons>
            <Text style={page2styling.signOut}>Signout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
