import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env';

export default function NavigateCard() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Good Morning, Shahryar</Text>
      <View style={styles.box1}>
        <View>
          <ScrollView
            /*  contentContainerStyle={{flex: 1}} */
            /* style={styles.modalContainer} */
            keyboardShouldPersistTaps="always"
            nestedScrollEnabled={true}
            >
            <GooglePlacesAutocomplete
              placeholder="Pickup loaction"
              /* onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }} */

              query={{
                key: 'AIzaSyCDONMlPUu--Fepxz5C7-cqfopYRa12FB4',
                language: 'en',
              }}
              nearbyPlaceAPI="GooglePlacesSearch"
              debounce={400}
            />
          </ScrollView>
        </View>
      </View>
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
