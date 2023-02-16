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
  },
  cnicFront: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "48%",
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: "#4772FF",
    borderWidth: 1
  },
  licenseFront: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "48%",
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: "#4772FF",
    borderWidth: 1
  }
});

export default PassengerInfoStyling;
