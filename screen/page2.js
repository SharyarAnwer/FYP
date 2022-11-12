import  React , { useEffect , useState} from 'react';

/* All components which we are using should be imported from react-native. Here we have imported Text , View , TouchableOpacity.*/
import {Text, View, TouchableOpacity} from 'react-native';

/* All styling of page2.js is written in the page1styling.js file. Below we have imported the styling so we can use it in the page2.js*/
import page2styling from '../styling/page2styling';

/* React-native-vector-icon is a library which provides us with ready-to-use shapes. This library was imported because we wanted to use an arrow in our app. 
Shapes offered by this library are divided into many categories. Ant design is one of the many categories. From ant design we imported the arrow shape.*/
import AntDesign from 'react-native-vector-icons/AntDesign';

/*Allows us to use google sign in functionality.  */
import { GoogleSignin } from '@react-native-google-signin/google-signin';

/*  */
import auth , { firebase } from '@react-native-firebase/auth';

/*  */
import {useRoute} from '@react-navigation/native'

export default function page2(props) {

  const route = useRoute()

  var firebaseConfig = {
    apiKey: "AIzaSyApR7phju5FlR2Hi6bWvfW5GyM9ANWSTwI",
    authDomain: "cabshare-44794.firebaseapp.com",
    databaseURL: "https://cabshare-44794.firebaseio.com",
    projectId: "cabshare-44794",
    storageBucket: "cabshare-44794.appspot.com",
    messagingSenderId: "sender-id",
    appId: "1:960617232634:android:75671625b4f23a31def143",
    measurementId: "G-measurement-id",
  };

  firebase.initializeApp(firebaseConfig);

  /* This was imported from react native firebase documnetation. Enables the app to start the signin process. For more info plz visit: https://rnfirebase.io/auth/social-auth#google */
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '960617232634-3u8im9oqma82kcivg4s25gcuiiovahgt.apps.googleusercontent.com',
    });
  },[])

  /* Google sign in process is called when the button is pressed. */
  const GoogleSignIn = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const signOut = async () =>
  {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut()

      console.log("Signed Out Successfully!")
      // Google Account disconnected from your app.
      // Perform clean-up actions, such as deleting data associated with the disconnected account.
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <View style={page2styling.view}>

      <Text>
        {route.params.name}
      </Text>
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

      {/* Touchable Opacity was used to create a custom button. We cannot use the default button because styling cannot be applied to the default button in react native. */}
      <TouchableOpacity style={page2styling.button2} onPress = {signOut}>
        <View style = {page2styling.i_am_driving_button} >
          <Text style={page2styling.buttonText2}>Sign Out</Text>

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
