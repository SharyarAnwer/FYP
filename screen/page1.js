/* eslint-disable prettier/prettier */
import React, { useEffect , useState} from 'react';

/* All components which we are using should be imported from react-native. Here we have imported Text , View , TouchableOpacity.*/
import { Text, View, TouchableOpacity} from 'react-native';

/* All styling of page1.js is written in the page1styling.js file. Below we have imported the styling so we can use it in the page1.js*/
import page1styling from '../styling/page1styling';

/*Allows us to use google sign in functionality.  */
import { GoogleSignin } from '@react-native-google-signin/google-signin';

/*  */
import auth , { firebase } from '@react-native-firebase/auth';

/* React function based component was used. Export default function exports the Page1 so that it can be used by other .js files.*/
export default function Page1({ navigation }) {

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

  const [useData, setUserData] = useState({})

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
    <View style={page1styling.view}>
      
      <Text style = {page1styling.headingStyle} >Welcome To</Text>
      <Text style = {page1styling.textStyle} >Cab Share</Text>
      <Text style = {page1styling.footer} >Connect With People. Connect With Society.</Text>

      {/* <View>
        <Text>
          User Id:
            <Text>
              {useData.displayName}
            </Text>
        </Text>
      </View> */}

      {/* Touchable Opacity was used to create a custom button. We cannot use the default button because styling cannot be applied to the default button in react native. */}
      <TouchableOpacity style = {page1styling.button} title="Go to Page#2"

        /* The onPress function takes the user to second page of the application when the button is pressed. 'Select category' is the name of the page to which we have to go when he button is pressed.  */
        /* The onPress function takes the user to second page of the application when the button is pressed. 'Select category' is the name of the page to which we have to go when he button is pressed.  */
        /* onPress={() => navigation.navigate('Select Category')} */
        onPress={() => {
          
          GoogleSignIn().then((res) =>
          { 
            if (res.user.email.includes('@szabist.pk'))
            {
              console.log(res.user)
              setUserData(res.user)
              navigation.navigate('Select Category' , {name : res.user.displayName})
            }
            else
            {
              alert("Please login using your @szabist.pk id")
              signOut()
            }
          }).catch(error => console.log(error))}}>
        <View>
            <Text style = {page1styling.buttonText}>
                Let's Go!
            </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
