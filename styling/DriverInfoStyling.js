/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const PassengerInfoStyling = StyleSheet.create({
  main_view: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 28,
    color: '#4772FF',
    fontWeight: 'bold',
    marginVertical: 40,
  },
  nameInput: {

    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20
    /* borderRadius: 5,
            width: 350,
            backgroundColor: '#f5f4f2',
            paddingLeft: 15 */
  },
});

export default PassengerInfoStyling;
