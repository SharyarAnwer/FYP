import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

export default function NavigateCard() {
  return (
    <SafeAreaView style = {styles.container}>
      <Text style = {styles.heading}>Good Morning, Shahryar</Text>
      <View style = {styles.box1}>
        <View>
            
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
