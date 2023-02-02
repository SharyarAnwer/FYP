import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env';

export default function NavigateCard() {

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
                }}
                minLength={2}
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
