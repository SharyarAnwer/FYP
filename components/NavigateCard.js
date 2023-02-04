import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import React, {useState , useContext, useEffect} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env';
import LocationContext from '../Context/location/LocationContext';

export default function NavigateCard() {

  /* const mapLocation = useContext(LocationContext) */
  
  const [location , setLocation] = useContext(LocationContext)

  useEffect(() => {
    console.log("I AM FROM USE EFFECT")
    console.log(location.latitude , location.longitude , location.description)
  }, [location.latitude , location.longitude, location.description])
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Good Morning, Shahryar</Text>
      <View style={styles.box1}>
        <View>
          <FlatList
            data={[1]}
            keyboardShouldPersistTaps="always"
            renderItem={({item}) => (
              <GooglePlacesAutocomplete
                placeholder="Pickup location"
                onPress={(data, details = null) => {
                  console.log(data, details);

                  console.log("I am Latitude")
                  console.log(details.geometry.location.lat)

                  console.log("I am Longitude")
                  console.log(details.geometry.location.lng)

                  console.log(data.description)

                  setLocation({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    description: data.description
                  })

                  console.log("I am Latitude")
                  console.log(location.latitude)

                  console.log("I am Longitude")
                  console.log(location.longitude)

                  console.log("Updated location")
                  console.log(location.description)
                  
                }}
                GooglePlacesDetailsQuery={{ fields: "geometry" }}
                fetchDetails={true}
                minLength={2}
                returnKeyType = {"search"}
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
      <Text>Latitude : {location.latitude}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '500',
    fontSize: 20,
    paddingVertical: 20,
  },
  box1: {
    borderTopWidth: 1,
    borderColor: '#d3d3d3',
    flexShrink: 1,
  },
});
