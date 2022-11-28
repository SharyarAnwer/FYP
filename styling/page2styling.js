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
    textAlign: 'center',
    color: 'white',
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
  },
  signOutButton:
  {
    width:53,
    height: 53,
    backgroundColor: "blue",
    borderRadius: 50,
    position: "absolute",
    right: 13,
    top: 15
  },
  signOutButton1:
  {
    width:55,
    height: 55,
    borderRadius: 50,
    position: "absolute",
    right: -1,
    top: -1
  },
  dropDown:
  {
    width:100,
    height:50,
    backgroundColor: '#4772FF',
    position:'absolute',
    top:76,
    right: 25,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 10,
  },
  option1:
  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signOut:
  {
    color: 'white',
    fontFamily: 'open sans',
    fontWeight: 'bold',
  },
  caretup:
  {
    position:'absolute',
    left: 70,
    top:-11,
  } 
});

export default page2styling;
