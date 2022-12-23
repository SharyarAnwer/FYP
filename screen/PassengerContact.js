import React, {useState, useEffect, useContext} from 'react';
import {
  Button,
  SafeAreaView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Feather';
import Splash from 'react-native-vector-icons/MaterialIcons';
import styles from '../styling/PassengerContactStyle';
import Dropdown2 from '../components/dropdown2';
import {useNavigation} from '@react-navigation/native';
import {PraticeProvider , PracticeContext } from '../Global/PracticeContext';

const PassengerContact = ({route}) => {

  const {code1, setCode1} = useContext(PracticeContext)

  const navigation = useNavigation();

  const [phoneData, setData] = useState('');

  const getData = data => {
    setData(data);
  };

  
  useEffect(() => {
    console.log('I am the real phone number' + phoneData);
  }, [phoneData]);
  
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  
  const [code, setCode] = useState('');
  
  const getOTP = otp =>
  {
    setCode(otp)
  }

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log(user, 'user');
    console.log(user.phoneNumber, 'user');
  }

  function check()
  {
    console.log("I WORKED")  
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    console.log("I  here maybe")
    try {
      console.log("I came in the try section")
      await confirm.confirm(code1)
        console.log("I came null")
      /* console.log('I was printed' + confirm.confirm(code.phoneNumber)); */
      console.log('I Am The OTP' + code1);
    } catch (error) {
      console.log(code1)
      console.log('Invalid code.' + error);
    }
  }

 if (!confirm) { 
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.headerWrapper}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="chevron-left" size={24} style={styles.iconWhite} />
              {/* <Button
                title="Phone Number Sign In"
                onPress={() => signInWithPhoneNumber('+92 3313255712')}
              /> */}
            </TouchableOpacity>

            <View>
              <Text style={styles.headerText}>Send Code</Text>
            </View>

            <View style={{width: 20}} />
          </View>

          <View style={styles.splash}>
            <Splash name="mobile-friendly" size={80} color="#ffffff" />
          </View>
        </SafeAreaView>

        <View style={styles.content}>
          <View>
            <Text style={styles.title}>Contact Number &gt;</Text>
          </View>

          <Dropdown2 onSubmit={getData} />

          {/* <View>
            <TextInput
              style={styles.input}
              placeholder="Your phone number"
              placeholderTextColor="#ababab"
            />
          </View> */}

          <View>
            <Text style={styles.description}>
              We will send you an OTP to your phone number
            </Text>
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.button}
              title="Phone Number Sign In"
              onPress={() => {
                title = 'Phone Number Sign In';
                if (phoneData.charAt(3) == '0') {
                  var str = phoneData
                  str = str.slice(0, 3) + str.slice(4);
                  signInWithPhoneNumber(str)
                } else {
                  signInWithPhoneNumber(phoneData)
                }
                
                /* console.log("Code1",code1) */
                //navigation.navigate('Verification' , {confirmcode : confirmCode , checkFunc : check});
                /* console.log(phoneData.charAt(3) == '0') */
              }}>
              <Icon name="arrow-right" size={25} style={styles.iconButton} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
} 
  else
  {return (
    <>
      <TextInput value={code1} onChangeText={text => setCode1(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );} 
};

export default PassengerContact;
