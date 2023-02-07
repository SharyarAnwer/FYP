import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

export default function RideOptionsCard() {
  const navigation = useNavigation();

  const rideOptions = [
    {
      id: 1,
      title: 'Bike',
      image: require('../Assets/motorbike.png'),
    },
    {
      id: 2,
      title: 'Car',
      image: require('../Assets/car.png'),
    },
  ];

  const [selected, setSelected] = useState(null);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.navigate('NavigateCard');
          }}>
          <FontAwesome
            name="chevron-circle-left"
            color="#7788ef"
            size={35}></FontAwesome>
        </TouchableOpacity>
        <Text style={styles.heading}>Select Vehicle</Text>
      </View>

      <FlatList
        style={styles.flatList}
        data={rideOptions}
        keyExtractor={item => item.id}
        renderItem={({item: {id, title, image}, item}) => (
          <TouchableOpacity
            style={[
              styles.ridesButton,
              id === selected?.id ? {backgroundColor: '#d3d3d3'} : null,
            ]}
            onPress={() => setSelected(item)}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={image}
            />
            <View>
              <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>{title}</Text>
              {/* <Text>7 Available Rides Today</Text> */}
            </View>

            <Text style={styles.money}>7 Rides Available</Text>
          </TouchableOpacity>
        )}
      />

      <View
        style={{
          alignItems: 'center',
          marginVertical: 10,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          disabled={!selected}
          style={[
            styles.showRiders,
            !selected && {backgroundColor: '#d3d3d3'},
          ]}>
          <Text style={styles.buttonText}>Show Available Drivers</Text>
          {/* <Text style = {styles.buttonText}>Choose {selected?.title} </Text> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  flatList: {
    display: 'flex',
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    position: 'relative',
    left: -4,
  },
  backButton: {
    position: 'relative',
    left: -60,
    /* backgroundColor: '#7788ef',
    width: 35,
    height: 35,
    borderRadius: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5, */
  },
  ridesButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: '#7788ef',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
  },
  money: {
    fontSize: 15,
    color: 'black'
    /* fontWeight: 'bold', */
  },
  showRiders: {
    backgroundColor: '#7788ef',
    paddingHorizontal: 30,
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginLeft: 10,
  },
});
