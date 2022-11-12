/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const page2styling = StyleSheet.create({
  view: 
  {
    backgroundColor: 'white',
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1:
  {
    backgroundColor: '#4772FF',
    width: '90%',
    height: '8%',
    borderRadius: 15,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button2:
  {
    backgroundColor: 'white',
    width: '90%',
    height: '8%',
    borderRadius: 15,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4772FF'
  },
  buttonText1: 
  {
    fontSize: 25,
    padding: 10,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'open sans',
    fontWeight: 'bold',
    left: -70
  },
  buttonText2: 
  {
    fontSize: 25,
    padding: 10,
    color: '#4772FF',
    textAlign: 'center',
    fontFamily: 'open sans',
    fontWeight: 'bold',
    left: -70
  },
  circle1: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    right: -60
  },
 circle2:
 {
  width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4772FF',
    textAlign: 'center',
    textAlignVertical: 'center',
    right: -60
 },
 i_need_a_ride_button:
 {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    /* justifyContent: 'center', */
    position:'relative'
 },
 i_am_driving_button:
 {
  display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative'
 },
 square_horizontal_line: {
    width: 50,
    height: 8,
    backgroundColor: "red",
    marginTop:10,
  },
  square_tilted_line1:
  {
    width: 20,
    height: 8,
    backgroundColor: "red",
    marginTop:10,
    transform: [{ rotate: '45deg'}]
  }
});

export default page2styling;
