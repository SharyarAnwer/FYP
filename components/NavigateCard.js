import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";

export default function NavigateCard() {
  return (
    <SafeAreaView style = {styles.container}>
      <Text style = {styles.heading}>Good Morning, Shahryar</Text>
      <View style = {styles.box1}>
        <View>
            <GooglePlacesAutocomplete
              placeholder = "Pickup loaction"

              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}
              
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en'
              }}

              nearbyPlaceAPI = "GooglePlacesSearch"
              debounce = {400}
            />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  heading:
  {
    textAlign: 'center',
    color: '#000',
    fontWeight: '500',
    fontSize: 20,
    paddingVertical: 20
  },
  box1:
  {
    borderTopWidth: 1,
    borderColor: '#d3d3d3',
    flexShrink: 1
  }
});
