import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, Image} from 'react-native';

export default function ConfirmRideModal({isVisible, closeModal, profile}) {
  const [buttonPressed, setButtonPressed] = useState(false);

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
            height: '60%',
            borderRadius: 20,
            elevation: 20,
          }}>
          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => {
              closeModal();
              setButtonPressed(false)
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

            <TouchableOpacity
              style={{
                alignSelf: 'center',
                backgroundColor: '#7788ef',
                height: 50,
                width: '95%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
                borderRadius: 10,
              }}
              onPress={() => setButtonPressed(true)}>
              {buttonPressed ? (
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
