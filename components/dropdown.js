import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  const [option, setOption] = useState(false);

  const onSelect = item => {
    setSelectedItem(item);
  };

  let data = [
    {
      id: 1,
      name: 'Sign Out',
    },
    /* {
      id: 2,
      name: 'Apple',
    },
    {
      id: 3,
      name: 'Banana',
    }, */
  ];

  const onSelectedItem = (val) =>
  {
    setOption(false)
    onSelect(val)
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropDownStyle}
        activeOpacity={0.8}
        onSelect={onSelect}
        onPress={() => setOption(!option)}>
        <Text>{!!selectedItem ? selectedItem?.name : 'Choose An Option'}</Text>
      </TouchableOpacity>

      {option && (
        <View>
          {data.map((val, i) => {
            return (
              <TouchableOpacity key={String(i)}
              onPress  = {() => onSelectedItem(val)}>
                <Text>{val.name}</Text>
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
    backgroundColor: 'rgba( 0 , 0 , 0 , 0.2)',
    padding: 8,
    borderRadius: 6,
    minHeight: 42,
    justifyContent: 'center',
  },
});
