import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  ScrollView,
  Image,
} from 'react-native';

import React, {useState, useContext, useEffect} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DriverContext from '../Context/driver/DriverContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

/* This library is used to input date and time from the user. */
import DateTimePickerModal from 'react-native-modal-datetime-picker';

/* This is used to display a Modal Pop up if the user leaves the address fields empty.*/
import ModalPopup from './ModalPopup';

import firestore from '@react-native-firebase/firestore';

export default function NavigateCard() {

  const navigation = useNavigation();

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

  const startingPointDetails = {
    latitude: 0,
    longitude: 0,
    description: 'Pickup Location',
  };

  const [startingPoint, setStartingPoint] = useState(startingPointDetails);
  //const [pickup, setPickup] = useState(pickupDetails);

  useEffect(() => {
    setStartingPointLocation({
      latitude: startingPoint.latitude,
      longitude: startingPoint.longitude,
      description: startingPoint.description,
    });
  }, [
    startingPoint.latitude,
    startingPoint.longitude,
    startingPoint.description,
  ]);

  useEffect(() => {
    console.log('I AM FROM USE EFFECT FROM DRIVER');
    console.log(
      startingPointLocation.latitude,
      startingPointLocation.longitude,
      startingPointLocation.description,
    );
  }, [
    startingPointLocation.latitude,
    startingPointLocation.longitude,
    startingPointLocation.description,
  ]);

  /* From here onwards we are setting date and time at which the passenger wants to be picked. */
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [selectedDate, setSelectedDate] = useState('Please Select Date');
  const [selectedTime, setSelectedTime] = useState('Please Select Time');

  useEffect(() => {
    setScheduleTime({
      date: selectedDate,
      time: selectedTime,
    });
  }, [selectedDate, selectedTime]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const formattedDate = x[0].split('-');
    console.log(
      formattedDate[2] + '/' + formattedDate[1] + '/' + formattedDate[0],
    );
    setSelectedDate(
      formattedDate[2] + '/' + formattedDate[1] + '/' + formattedDate[0],
    );
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = time => {
    const dt = new Date(time);
    const x = dt.toLocaleTimeString();
    const formattedTime = x.split(':');
    console.log(formattedTime[0] + ':' + formattedTime[1]);

    if (formattedTime[0] > 12) {
      setSelectedTime(formattedTime[0] - 12 + ':' + formattedTime[1] + ' PM');
    } else {
      setSelectedTime(formattedTime[0] + ':' + formattedTime[1] + ' AM');
    }

    hideTimePicker();
  };

  /* These 3 lines will be used to display an error msg when user does not enter pickup and dropoff address. */
  const [visible, setVisible] = useState(false);
  const [imgSource, setImgSource] = useState(require('../Assets/check.png'));
  const [otpMessage, setOtpMessage] = useState('');
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonLink, setButtonLink] = useState('');
  const [screensToPop, setScreensToPop] = useState(0)
  return (
    <SafeAreaView style={styles.container}>
      <ModalPopup
        visible={visible}
        imageSrc={imgSource}
        otpMessage={otpMessage}
        setVisible={setVisible}
        buttonVisible={buttonVisible}
        buttonLink={buttonLink}
        screensToPop={screensToPop}
      />

      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.heading}>
              Good Morning, {driverDetails.passengerName}
            </Text>
          </>
        }
        data={[1]}
        keyboardShouldPersistTaps="always"
        renderItem={({item}) => (
          <>
            <GooglePlacesAutocomplete
              placeholder="Starting Point"
              styles={inputBoxStyle}
              onPress={(data, details = null) => {
                console.log(data, details);

                console.log('I am starting point Latitude');
                console.log(details.geometry.location.lat);

                console.log('I am starting point Longitude');
                console.log(details.geometry.location.lng);

                console.log(data.description);

                setStartingPoint({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  description: data.description,
                });
              }}
              GooglePlacesDetailsQuery={{fields: 'geometry'}}
              fetchDetails={true}
              minLength={2}
              returnKeyType={'search'}
              enablePoweredByContainer={false}
              query={{
                key: 'AIzaSyCDONMlPUu--Fepxz5C7-cqfopYRa12FB4',
                language: 'en',
              }}
              nearbyPlaceAPI="GooglePlacesSearch"
              debounce={400}
            />

            <GooglePlacesAutocomplete
              placeholder="Dropoff location"
              styles={inputBoxStyle}
              onPress={(data, details = null) => {
                console.log(data, details);

                console.log('I am Latitude');
                console.log(details.geometry.location.lat);

                console.log('I am Longitude');
                console.log(details.geometry.location.lng);

                console.log(data.description);

                setEndingPointLocation({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  description: data.description,
                });

                console.log(
                  'Ending Point Location: ' + endingPointLocation.latitude,
                );
              }}
              GooglePlacesDetailsQuery={{fields: 'geometry'}}
              fetchDetails={true}
              minLength={2}
              returnKeyType={'search'}
              enablePoweredByContainer={false}
              query={{
                key: 'AIzaSyCDONMlPUu--Fepxz5C7-cqfopYRa12FB4',
                language: 'en',
              }}
              nearbyPlaceAPI="GooglePlacesSearch"
              debounce={400}
            />
          </>
        )}
        ListFooterComponent={
          <>
            <View style={styles.dateAndTimeButtons}>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => {
                  showDatePicker();
                }}>
                <Text>{selectedDate}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.timeButton]}
                onPress={() => {
                  showTimePicker();
                }}>
                <Text>{selectedTime}</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />

              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
              />
            </View>

            <View
              style={{
                alignItems: 'center',
                marginVertical: 10,
                paddingHorizontal: 20,
                flexShrink: 2,
                marginTop: 'auto',
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (
                    startingPointLocation.latitude == 0 ||
                    startingPointLocation.longitude == 0
                  ) {
                    setVisible(true);
                    setOtpMessage('Please input a valid pickup location.');
                    setImgSource(require('../Assets/incorrect.png'));
                    setButtonVisible(false);
                    setButtonLink(null);
                    /* alert('Please input a valid pickup location.'); */
                  } else if (
                    endingPointLocation.latitude == 0 ||
                    endingPointLocation.longitude == 0
                  ) {
                    alert('Please input a valid drop off location.');
                  } else {
                    firestore()
                      .collection('Drivers')
                      .add({
                        Name: driverDetails.passengerName,
                        ContactNumber: driverDetails.contactNumber,
                        Email: driverDetails.emailAddress,
                        ProfilePictuer: driverDetails.profilePicture,
                        VehicleName: vehicleInfo.vehicleName,
                        VehicleNumber: vehicleInfo.vehicleNumber,
                        VehicleModel: vehicleInfo.vehicleModel,
                        VehicleType: vehicleInfo.vehicleType,
                        SeatingCapacity: vehicleInfo.seatingCapacity,
                        CNICURL: CNIC_url,
                        LicenseURL: licenseUrl,
                        StartingPoint: startingPointLocation.description,
                        EndingPoint: endingPointLocation.description,
                        DepartureDate: scheduleTime.date,
                        DepartureTime: scheduleTime.time,
                      })
                      .then(() => {
                        console.log('User added successfully!');
                        setImgSource(require('../Assets/check.png'));
                        setVisible(true);
                        setOtpMessage(
                          'Your Ride Has Been Posted Successfully!',
                        );
                        setButtonVisible(true);
                        setButtonLink('Ride Status');
                        setScreensToPop(3)
                      });
                  }
                }}>
                <FontAwesome name="car" color="white" size={18}></FontAwesome>
                <Text style={styles.selectRide}>Post A Ride</Text>
              </TouchableOpacity>
            </View>
          </>
        }></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    /* justifyContent: 'space-evenly' */
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#151515',
    fontWeight: 'bold',
    fontSize: 25,
    paddingVertical: 20,
  },
  box1: {
    borderTopWidth: 1,
    borderColor: '#d3d3d3',
    flexShrink: 1,
  },
  button: {
    backgroundColor: '#7788ef',
    paddingHorizontal: 30,
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: -2,
  },
  selectRide: {
    color: 'white',
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginLeft: 10,
  },
  dateAndTimeButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dateButton: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeButton: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

const inputBoxStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
