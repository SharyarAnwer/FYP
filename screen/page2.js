import React, {useEffect, useState, useRef} from 'react';

/* All components which we are using should be imported from react-native. Here we have imported Text , View , TouchableOpacity.*/
import {Text, View, TouchableOpacity, Image, Animated} from 'react-native';

/* All styling of page2.js is written in the page1styling.js file. Below we have imported the styling so we can use it in the page2.js*/
import page2styling from '../styling/page2styling';

/* React-native-vector-icon is a library which provides us with ready-to-use shapes. This library was imported because we wanted to use an arrow in our app. 
Shapes offered by this library are divided into many categories. Ant design is one of the many categories. From ant design we imported the arrow shape.*/
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';
import {Navigation} from 'react-native-navigation'
/*Allows us to use google sign in functionality.  */
import {GoogleSignin} from '@react-native-google-signin/google-signin';

/*  */
import auth, {firebase} from '@react-native-firebase/auth';

/*  */
import {useRoute} from '@react-navigation/native';

import Dropdown from '../components/dropdown';
import {FadeOutToBottomAndroidSpec} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';
import DriverInfo from './DriverInfo';

export default function Page2() {
  const navigation = useNavigation();

  const route = useRoute();

  const imageUrl = route.params.imageURL;

  const [option, setOption] = useState(false);

  return (
    <View style={page2styling.view}>
      {/* <Text>{route.params.name}</Text> */}
      {/* Touchable Opacity was used to create a custom button. We cannot use the default button because styling cannot be applied to the default button in react native. */}
      <TouchableOpacity
        style={page2styling.button1}
        onPress={ () => {navigation.navigate('Passenger Contact')} }>
        <View style={page2styling.i_need_a_ride_button}>
          <Text style={page2styling.buttonText1}>I need a ride</Text>

          {/* This line was used to create a circle shape.*/}
          <Text style={page2styling.circle1}>
            {/* This line of code makes an arrow. The arrow was imported from AntDesign and used in our button.*/}
            <AntDesign
              name="arrowright"
              color={'#4772FF'}
              size={30}></AntDesign>
          </Text>
        </View>
      </TouchableOpacity>

      {/* Touchable Opacity was used to create a custom button. We cannot use the default button because styling cannot be applied to the default button in react native. */}
      <TouchableOpacity style={page2styling.button2}
      onPress={ () => {navigation.navigate('Driver Info')} }>
        <View style={page2styling.i_am_driving_button}>
          <Text style={page2styling.buttonText2}>I am driving</Text>

          {/* This line was used to create a circle shape.*/}
          <Text style={page2styling.circle2}>
            {/* This line of code makes an arrow. The arrow was imported from AntDesign and used in our button.*/}
            <AntDesign name="arrowright" color={'white'} size={30}></AntDesign>
          </Text>
        </View>
      </TouchableOpacity>

      {/* Touchable Opacity was used to create a custom button. We cannot use the default button because styling cannot be applied to the default button in react native. */}
      {/* <TouchableOpacity style={page2styling.button2} onPress = {route.params.signout}>
        <View style = {page2styling.i_am_driving_button} >
          <Text style={page2styling.buttonText2}>Sign Out</Text>

          {/* This line was used to create a circle shape.}
          <Text style={page2styling.circle2}>

            {/* This line of code makes an arrow. The arrow was imported from AntDesign and used in our button.}
            <AntDesign name='arrowright' color={'white'} size={30}></AntDesign>
          </Text>
        </View>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={page2styling.signOutButton}
        /* onPress={route.params.signout} */
        onPress={() => setOption(!option)}>
        <Image style={page2styling.signOutButton1} source={{uri: imageUrl}} />
      </TouchableOpacity>

      {/* {option && (<Dropdown/>)} */}

      {option && (
        <View style={page2styling.dropDown}>
          <AntDesign
            style={page2styling.caretup}
            name="caretup"
            color={'#4772FF'}
            size={30}></AntDesign>
          <TouchableOpacity
            style={page2styling.option1}
            onPress={() => {
              route.params.signout();
              navigation.popToTop();
            }}>
            <MaterialIcons
              name="logout"
              color={'#fff'}
              size={30}></MaterialIcons>
            <Text style={page2styling.signOut}>Signout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
