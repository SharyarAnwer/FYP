import * as React from 'react';
import {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function App(props) {
  const [selectedItem, setSelectedItem] = useState(null);

  const [option, setOption] = useState(false);

  const onSelect = item => {
    setSelectedItem(item);
  };

  /* let data = [
    {
      id: 1,
      name: 'Sign Out',
    },
    {
      id: 2,
      name: 'Apple',
    },
    {
      id: 3,
      name: 'Banana',
    },
  ]; */

  const onSelectedItem = val => {
    setOption(false);
    onSelect(val);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropDownStyle}
        activeOpacity={0.8}
        onSelect={onSelect}
        onPress={() => setOption(!option)}>
        <Text style={styles.text}>
          {!!selectedItem ? selectedItem?.name : props.heading}
        </Text>
        <AntDesign name="caretdown" color={'grey'} size={10}></AntDesign>
      </TouchableOpacity>

      {option && (
        <View style={styles.dropdownOptions}>
          {props.options.map((val, i) => {
            return (
              <TouchableOpacity
                key={String(i)}
                onPress={() => onSelectedItem(val)}>
                <Text /* style= {styles.choice} */>{val.name}</Text>
                <View style={styles.choice}></View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropDownStyle: {
    backgroundColor: '#f5f4f2',
    padding: 8,
    borderRadius: 6,
    minHeight: 42,
    width: 350,
    height: 48,
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 15,
    color: 'grey',
    fontWeight: '300',
  },
  dropdownOptions: {
    borderRadius: 6,
    backgroundColor: 'lightgrey',
    paddingLeft: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
  container: {
    height: 60,
  },
  choice: {
    borderBottomColor: '#e4e4ee',
    borderBottomWidth: 1,
    marginLeft: -7,
    paddingBottom: 2,
  },
});
