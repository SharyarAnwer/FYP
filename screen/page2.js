import React from 'react';

/* All components which we are using should be imported from react-native. Here we have imported Text , View , TouchableOpacity.*/
import {Text, View, TouchableOpacity} from 'react-native';

/* All styling of page2.js is written in the page1styling.js file. Below we have imported the styling so we can use it in the page2.js*/
import page2styling from '../styling/page2styling';

/* React-native-vector-icon is a library which provides us with ready-to-use shapes. This library was imported because we wanted to use an arrow in our app. 
Shapes offered by this library are divided into many categories. Ant design is one of the many categories. From ant design we imported the arrow shape.*/
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function page2() {
  return (
    <View style={page2styling.view}>

      {/* Touchable Opacity was used to create a custom button. We cannot use the default button because styling cannot be applied to the default button in react native. */}
      <TouchableOpacity style={page2styling.button1}>


        <View style = {page2styling.i_need_a_ride_button}>
          <Text style={page2styling.buttonText1}>I need a ride</Text>

          {/* This line was used to create a circle shape.*/}
          <Text style={page2styling.circle1}>

            {/* This line of code makes an arrow. The arrow was imported from AntDesign and used in our button.*/}
            <AntDesign name='arrowright' color={'#4772FF'} size={30}></AntDesign>
          </Text>
        </View>
      </TouchableOpacity>

      {/* Touchable Opacity was used to create a custom button. We cannot use the default button because styling cannot be applied to the default button in react native. */}
      <TouchableOpacity style={page2styling.button2}>
        <View style = {page2styling.i_am_driving_button} >
          <Text style={page2styling.buttonText2}>I am driving</Text>

          {/* This line was used to create a circle shape.*/}
          <Text style={page2styling.circle2}>

            {/* This line of code makes an arrow. The arrow was imported from AntDesign and used in our button.*/}
            <AntDesign name='arrowright' color={'white'} size={30}></AntDesign>
          </Text>
        </View>
      </TouchableOpacity>

      
    </View>
  );
}
