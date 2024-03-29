import React, {useState, useContext, useEffect} from 'react';
import {Modal, View, Text, TouchableOpacity, Image} from 'react-native';

//This is used to import and update data from LocationContext.js
import LocationContext from '../Context/location/LocationContext';

import firestore from '@react-native-firebase/firestore';

/* This import is used to show notification. */
import PushNotification from 'react-native-push-notification';

export default function ConfirmRideModal({
  isVisible,
  closeModal,
  profile,
  updateConfirmRide,
}) {
  /* This makes a connection between PassengerCOntact.js and LocationState.js.  */
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
    kilometers,
    setKilometers,
  ] = useContext(LocationContext);

  const [confirmRequest, setConfirmRequest] = useState(false);

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  /* This is used to create a channel that will show notification */
  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'test channel',
    });
  };

  useEffect(() => {
    createChannel();
  }, []);

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 20,
            padding: 20,
            height: '65%',
            borderRadius: 20,
            elevation: 20,
          }}>
          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => {
              closeModal();
              setConfirmRequest(false);
              updateConfirmRide(false);
            }}>
            {/* <Text>Close Modal</Text> */}
            <Image
              source={require('../Assets/remove.png')}
              style={{height: 35, width: 35, alignSelf: 'flex-end', top: -10}}
            />

            <Image
              source={{uri: profile.ProfilePictuer}}
              style={{
                height: 80,
                width: 80,
                alignSelf: 'center',
                borderRadius: 40,
                top: -30,
              }}
            />

            <Text
              style={{
                alignSelf: 'flex-start',
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 5,
              }}>
              Pickup Location:
            </Text>
            <Text style={{alignSelf: 'flex-start', marginBottom: 5}}>
              {profile.StartingPoint}
            </Text>

            <Text
              style={{
                alignSelf: 'flex-start',
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 5,
              }}>
              Dropoff Location:
            </Text>
            <Text style={{alignSelf: 'flex-start'}}>{profile.EndingPoint}</Text>

            <Text
              style={{
                alignSelf: 'flex-start',
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 5,
              }}>
              Date:
            </Text>
            <Text style={{alignSelf: 'flex-start'}}>
              {profile.DepartureDate}
            </Text>

            <Text
              style={{
                alignSelf: 'flex-start',
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 5,
              }}>
              Time:
            </Text>

            <Text style={{alignSelf: 'flex-start'}}>
              {profile.DepartureTime}
            </Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{alignSelf: 'auto', fontWeight: 'bold', fontSize: 18}}>
                Select Seats:
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (count == 0) {
                    } else {
                      decrement();
                    }
                  }}
                  style={{
                    backgroundColor: '#7788ef',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 24, marginHorizontal: 10, color: '#fff'}}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{fontSize: 24, marginHorizontal: 10}}>
                  {count}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (count < profile.Capacity) {
                      increment();
                    }
                  }}
                  style={{
                    backgroundColor: '#7788ef',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 24, marginHorizontal: 10, color: '#fff'}}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              disabled={count === 0}
              style={{
                alignSelf: 'center',
                backgroundColor: count === 0 ? 'grey' : '#7788ef',
                height: 50,
                width: '95%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
                borderRadius: 10,
              }}
              onPress={() => {
                setConfirmRequest(true);
                updateConfirmRide(true);

                firestore()
                  .collection('RequestsFromPassenger')
                  .add({
                    PassengerName: passengerDetails.passengerName,
                    PassengerPickupLocation: location.description,
                    PassengerDropOffLocation: dropOffLocation.description,
                    PassengerPickupDate: scheduleTime.date,
                    PassengerPickupTime: scheduleTime.time,
                    RequestedSeats: count,
                    DriverName: profile.Name,
                    Status: 'Pending',
                    DriverDocumentId: profile.id,
                    collectionId: 'RidesPostedByDriver',
                    distance: kilometers,
                    vehicleType: ride.vehicleType,
                    payment:
                      ride.vehicleType === 'Bike'
                        ? kilometers * 50
                        : kilometers * 100,
                  })
                  .then(() => {

                    /* Show a confirmation notification to the user that his ride has been booked */

                    PushNotification.localNotification({
                      channelId: 'test-channel',
                      title: 'Your ride has been posted',
                      message: '',
                      color: 'red',
                    });

                    /* This will produce a notification for the user on the day on which the ride was booked. */
                    /* const [day, month, year] = scheduleTime.date.split('/');
                    console.log("Day: " , day , "Type" , typeof parseInt(day))
                    console.log("Month: " , month , "Type" , typeof parseInt(month))
                    console.log("Year: " , year , "Type" , typeof parseInt(year))

                    PushNotification.localNotificationSchedule({
                      channelId: 'test-channel',
                      title: 'Reminder:',
                      message: `You have a ride booked today at: ${day}/${month}/${year+2}` ,
                      date: new Date(parseInt(year) , parseInt(month) , parseInt(day) , 17 , 0, 0),
                      allowWhileIdle: true,
                      color: 'red',
                    }); */

                    console.log("New Date" , new Date(2023 , 3 , 15 , 16 , 27, 0));
                    console.log('User added successfully!');
                  });
              }}>
              {confirmRequest ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  <Text
                    style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>
                    Your Request Has Been Submitted
                  </Text>
                  <Image
                    source={require('../Assets/like.gif')}
                    style={{width: 30, height: 30, marginLeft: 10}}
                  />
                </View>
              ) : (
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 17}}>
                  Confirm Your Request
                </Text>
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
