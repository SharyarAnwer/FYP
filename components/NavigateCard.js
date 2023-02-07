import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env';
import LocationContext from '../Context/location/LocationContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function NavigateCard() {

  const navigation1 = useNavigation();
  /* const mapLocation = useContext(LocationContext) */

  const [location, setLocation, dropOffLocation, setDropOffLocation] =
    useContext(LocationContext);

  useEffect(() => {
    console.log('I AM FROM USE EFFECT');
    console.log(location.latitude, location.longitude, location.description);
  }, [location.latitude, location.longitude, location.description]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Good Morning, Shahryar!</Text>
      <View style={styles.box1}>
        <View>
          <FlatList
            data={[1]}
            keyboardShouldPersistTaps="always"
            renderItem={({item}) => (
              <GooglePlacesAutocomplete
                placeholder="Pickup location"
                styles={inputBoxStyle}
                onPress={(data, details = null) => {
                  console.log(data, details);

                  console.log('I am Latitude');
                  console.log(details.geometry.location.lat);

                  console.log('I am Longitude');
                  console.log(details.geometry.location.lng);

                  console.log(data.description);

                  setLocation({
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
            )}
            keyExtractor={item => item.toString()}
          />
        </View>

        <View>
          <FlatList
            data={[1]}
            keyboardShouldPersistTaps="always"
            renderItem={({item}) => (
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

                  setDropOffLocation({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    description: data.description,
                  });

                  console.log('Drop Off Location: ' + dropOffLocation.latitude);
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
            )}
            keyExtractor={item => item.toString()}
          />
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          marginVertical: 10,
          paddingHorizontal: 20
        }}>
        <TouchableOpacity style={styles.button} onPress = {() => {navigation1.navigate('RideOptions')} } >
          <FontAwesome name="car" color="white" size={18}></FontAwesome>
          <Text style={styles.selectRide}>Select A Ride</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-evenly'
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
    justifyContent: 'center'
  },
  selectRide: {
    color: 'white',
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginLeft: 10
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
