import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Image,
  Button,
  SafeAreaView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  Alert,
  TouchableNativeFeedback,
  Animated,
  Modal,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Feather';
import Splash from 'react-native-vector-icons/MaterialIcons';
import styles from '../styling/PassengerContactStyle';
import Dropdown2 from '../components/dropdown2';
import {useNavigation} from '@react-navigation/native';

import Svg, {Path} from 'react-native-svg';
import {useRoute} from '@react-navigation/native';
import {transform} from '@babel/core';
//import ModalPopup from '../components/ModalPopup';

import firestore from '@react-native-firebase/firestore';
import Loader from './Loader';

//This is used to import and update data from DriverContext.js
import DriverContext from '../Context/driver/DriverContext';

const ModalPopup = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => {
        setShowModal(false);
      }, 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={modalStyles.modalBackground}>
        <Animated.View
          style={[
            modalStyles.modalContainer,
            {transform: [{scale: scaleValue}]},
          ]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const PassengerContact = () => {
  
  /* This makes a connection between DriverContact.js and DriverState.js.  */
  const [driverDetails, setDriverDetails, vehicleInfo, setVehicleInfo, CNIC_url, setCNIC_url, licenseUrl, setLicenseUrl] = useContext(DriverContext);

  /*  */
  const [visible, setVisible] = useState(false);
  const [imgSource, setImgSource] = useState(require('../Assets/check.png'));
  const [otpMessage, setOtpMessage] = useState('');
  /*  */

  /* USED TO BRING UP THE LOADER WHEN THE NEXT SCREENS ARE LOADING */
  const [loader, setLoader] = useState(false);

  const [offset] = useState(new Animated.Value(0));

  const handlePress = () => {
    // Vibrate the view by animating the offset
    Animated.timing(offset, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      // Return the view to its original position
      Animated.timing(offset, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }).start();
    }, 50);
  };
  const route = useRoute();

  const name = route.params.name;
  const image = route.params.image;
  const email = route.params.email;

  const navigation = useNavigation();

  const [phoneData, setData] = useState('');

  const getData = data => {
    setData(data);
  };

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  const getOTP = otp => {
    setCode(otp);
  };

  let firebaseCounter = 0;

  // Handle user state changes
  function onAuthStateChanged(user) {
    //console.log(user, 'user');
    console.log('Name : ' + name);
    console.log('Email : ' + email);
    console.log('Mobile Number : ' + user.phoneNumber);
    setData(user.phoneNumber);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    setLoader(true);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setLoader(false);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      setImgSource(require('../Assets/check.png'));
      setOtpMessage('Congratulations! Your OTP has been verified!');
      setVisible(true);

      /* The setDriverDetails saves the name, contactNumber & delivery address in DriverState.js  */
      setDriverDetails({
        passengerName: name,
        contactNumber: phoneData,
        emailAddress: email,
        profilePicture: image
      })

      /* firestore()
        .collection('Users')
        .add({
          Name: name,
          Email: email,
          Mobile_number: phoneData,
        })
        .then(() => {
          console.log('User added successfully!');
        }); */
    } catch (error) {
      console.log(code);
      setCode('');
      setNumber1('');
      setNumber2('');
      setNumber3('');
      setNumber4('');
      setNumber5('');
      setNumber6('');
      setOTP(1);
      setImgSource(require('../Assets/error.png'));
      setOtpMessage('Sorry. We could not verify your OTP! Please try again');
      setVisible(true);
      handlePress();
      Vibration.vibrate();
      console.log('Invalid code.' + error);
    }
  }

  /* FROM HERE ALL HELL BREAK LOSE */

  let typedOTP = '';
  const numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [number3, setNumber3] = useState('');
  const [number4, setNumber4] = useState('');
  const [number5, setNumber5] = useState('');
  const [number6, setNumber6] = useState('');

  const [OTP, setOTP] = useState(1);

  const confirmStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#151515',
    },
    iconHeader: {
      color: '#151515',
    },
    svgWrapper: {
      height: 100,
    },
    content: {
      backgroundColor: '#5566ee',
      flex: 1,
      marginTop: -10,
      paddingHorizontal: 40,
      paddingTop: 20,
    },
    title: {
      textTransform: 'uppercase',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 24,
    },
    subTitle: {
      color: '#a2b2fd',
      textAlign: 'center',
      paddingVertical: 20,
      fontSize: 18,
      fontWeight: '600',
    },
    otpWrapper: {
      flexDirection: 'row',
      marginVertical: 10,
      justifyContent: 'center',
    },
    otpButton: {
      width: 45,
      height: 45,
      borderRadius: 50,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textOtp: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    buttonWrapper: {
      alignItems: 'center',
      marginVertical: 20,
    },
    buttonResend: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#8a9af8',
      textTransform: 'uppercase',
    },
    buttonVerifyWrapper: {
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonVerify: {
      backgroundColor: '#7788ef',
      paddingHorizontal: 30,
      paddingVertical: 20,
      width: '100%',
      alignItems: 'center',
      borderRadius: 10,
    },
    textButtonVerify: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    numPadWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 20,
    },
    numPad: {
      alignSelf: 'center',
    },
    numPadNumber: {
      fontWeight: 'bold',
      color: '#fff',
      fontSize: 24,
    },
  });
  /* TILL HERE. BE CAUTIOUS */

  if (!confirm) {
    return (
      <View style={styles.container}>
        {/* KEEPS THE LOADER HIDDEN UNTIL LOADING IS NEEDED */}
        {loader && <Loader />}

        <ModalPopup visible={visible}>
          <View style={{alignItems: 'center'}}>
            <View style={modalStyles.header}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Image
                  source={require('../Assets/remove.png')}
                  style={{height: 30, width: 30}}></Image>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            <Image
              source={imgSource}
              style={{height: 150, width: 150, marginVertical: 10}}
            />
          </View>

          <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
            {otpMessage}
          </Text>
        </ModalPopup>

        <SafeAreaView style={styles.headerWrapper}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="chevron-left" size={24} style={styles.iconWhite} />
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
                if (phoneData == '' || phoneData == null) {
                  console.log('I AM EMPTY');
                  setImgSource(require('../Assets/sim-card.png'));
                  setOtpMessage('You cannot leave the input field empty');
                  setVisible(true);
                } else {
                  if (phoneData.charAt(3) == '0') {
                    var str = phoneData;
                    str = str.slice(0, 3) + ' ' + str.slice(4);
                    signInWithPhoneNumber(str);
                  } else {
                    signInWithPhoneNumber(phoneData);
                  }
                }
              }}>
              <Icon name="arrow-right" size={25} style={styles.iconButton} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <>
        {/* //THIS WAS THE ORIGINAL CODE
       <TextInput value={code} onChangeText={text => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
        {/* IF SHIT BREAKS DOWN. UNCOMMIT THIS SECTION */}

        <ModalPopup visible={visible}>
          <View style={{alignItems: 'center'}}>
            <View style={modalStyles.header}>
              <TouchableOpacity
                onPress={() => {
                  if (code.length < 6) {
                    setVisible(false);
                    setCode('');
                    setNumber1('');
                    setNumber2('');
                    setNumber3('');
                    setNumber4('');
                    setNumber5('');
                    setNumber6('');
                    setOTP(1);
                  } else {
                    setVisible(false);
                    setTimeout(() => {
                      navigation.navigate('Driver Info');
                    }, 1000);
                  }
                  /*  */
                }}>
                <Image
                  source={require('../Assets/remove.png')}
                  style={{height: 30, width: 30}}></Image>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            <Image
              source={imgSource}
              style={{height: 150, width: 150, marginVertical: 10}}
            />
          </View>

          <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
            {otpMessage}
          </Text>
        </ModalPopup>

        <View style={confirmStyle.container}>
          <SafeAreaView>
            <View style={confirmStyle.header}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon
                  name="chevron-left"
                  size={24}
                  style={confirmStyle.iconHeader}
                />
              </TouchableOpacity>

              <View>
                <Text style={confirmStyle.headerTitle}>Verification Code</Text>
              </View>

              <View style={{width: 20}} />
            </View>
          </SafeAreaView>

          <View>
            <View style={confirmStyle.svgWrapper}>
              <Svg viewBox="0 0 1440 320">
                <Path
                  fill="#5566ee"
                  fill-opacity="1"
                  d="M0,32L26.7,69.3C53.3,107,107,181,160,218.7C213.3,256,267,256,320,234.7C373.3,213,427,171,480,165.3C533.3,160,587,192,640,176C693.3,160,747,96,800,96C853.3,96,907,160,960,202.7C1013.3,245,1067,267,1120,250.7C1173.3,235,1227,181,1280,181.3C1333.3,181,1387,235,1413,261.3L1440,288L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></Path>
              </Svg>
            </View>
          </View>
          <View style={confirmStyle.content}>
            <Text style={confirmStyle.title}>Confirmation</Text>
            <Text style={confirmStyle.subTitle}>
              Please type the verification code send to your name:
            </Text>

            <Animated.View
              style={[
                confirmStyle.otpWrapper,
                {transform: [{translateX: offset}]},
              ]}>
              <View
                style={[confirmStyle.otpButton, {backgroundColor: '#7788ef'}]}>
                <Text style={[confirmStyle.textOtp, {color: '#fff'}]}>
                  {number1}
                </Text>
              </View>

              <View
                style={[confirmStyle.otpButton, {backgroundColor: '#7788ef'}]}>
                <Text style={[confirmStyle.textOtp, {color: '#fff'}]}>
                  {number2}
                </Text>
              </View>

              <View
                style={[
                  confirmStyle.otpButton,
                  {backgroundColor: '#7788ef', borderRadius: 50},
                ]}>
                <Text style={[confirmStyle.textOtp, {color: '#fff'}]}>
                  {number3}
                </Text>
              </View>

              <View
                style={[
                  confirmStyle.otpButton,
                  {backgroundColor: '#7788ef', borderRadius: 50},
                ]}>
                <Text style={[confirmStyle.textOtp, {color: '#fff'}]}>
                  {number4}
                </Text>
              </View>

              <View
                style={[
                  confirmStyle.otpButton,
                  {backgroundColor: '#7788ef', borderRadius: 50},
                ]}>
                <Text style={[confirmStyle.textOtp, {color: '#fff'}]}>
                  {number5}
                </Text>
              </View>

              <View
                style={[
                  confirmStyle.otpButton,
                  {backgroundColor: '#7788ef', borderRadius: 50},
                ]}>
                <Text style={[confirmStyle.textOtp, {color: '#fff'}]}>
                  {number6}
                </Text>
              </View>
            </Animated.View>

            <View style={confirmStyle.buttonWrapper}>
              <TouchableOpacity>
                <Text style={confirmStyle.buttonResend}>Resend Code &gt;</Text>
              </TouchableOpacity>
            </View>

            <View style={confirmStyle.buttonVerifyWrapper}>
              <TouchableOpacity
                style={confirmStyle.buttonVerify}
                onPress={() => {
                  console.log('Value of code: ' + code);
                  console.log('Type of code: ' + typeof code);
                  confirmCode();
                }}>
                <Text style={confirmStyle.textButtonVerify}>Verify</Text>
              </TouchableOpacity>
            </View>

            <View>
              {numbers.map((chunk, index) => {
                return (
                  <View key={index} style={confirmStyle.numPadWrapper}>
                    {chunk.map(numbers => {
                      return (
                        <TouchableOpacity
                          key={numbers}
                          style={confirmStyle.numPad}
                          onPress={() => {
                            if (OTP == 1) {
                              setCode(code + numbers.toString());
                              setNumber1(numbers);
                              setOTP(2);
                            } else if (OTP == 2) {
                              setCode(code + numbers.toString());
                              setNumber2(numbers);
                              setOTP(3);
                            } else if (OTP == 3) {
                              setCode(code + numbers.toString());
                              setNumber3(numbers);
                              setOTP(4);
                            } else if (OTP == 4) {
                              setCode(code + numbers.toString());
                              setNumber4(numbers);
                              setOTP(5);
                            } else if (OTP == 5) {
                              setCode(code + numbers.toString());
                              setNumber5(numbers);
                              setOTP(6);
                            } else if (OTP == 6) {
                              setCode(code + numbers.toString());
                              setNumber6(numbers);
                              setOTP(7);
                            }
                          }}>
                          <Text style={confirmStyle.numPadNumber}>
                            {numbers}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              })}

              <View style={confirmStyle.numPadWrapper}>
                <View style={{width: 20}} />

                <TouchableOpacity
                  style={confirmStyle.numPad}
                  onPress={() => {
                    if (OTP == 1) {
                      setCode(code + '0');
                      setNumber1(0);
                      setOTP(2);
                    } else if (OTP == 2) {
                      setCode(code + '0');
                      setNumber2(0);
                      setOTP(3);
                    } else if (OTP == 3) {
                      setCode(code + '0');
                      setNumber3(0);
                      setOTP(4);
                    } else if (OTP == 4) {
                      setCode(code + '0');
                      setNumber4(0);
                      setOTP(5);
                    } else if (OTP == 5) {
                      setCode(code + '0');
                      setNumber5(0);
                      setOTP(6);
                    } else if (OTP == 6) {
                      setCode(code + '0');
                      setNumber6(0);
                      setOTP(7);
                    }
                  }}>
                  <Text style={confirmStyle.numPadNumber}>0</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={confirmStyle.numPad}
                  onPress={() => {
                    if (OTP == 7) {
                      setCode(code.slice(0, -1));
                      setNumber6('');
                      setOTP(6);
                    } else if (OTP == 6) {
                      setCode(code.slice(0, -1));
                      setNumber5('');
                      setOTP(5);
                    } else if (OTP == 5) {
                      setCode(code.slice(0, -1));
                      setNumber4('');
                      setOTP(4);
                    } else if (OTP == 4) {
                      setCode(code.slice(0, -1));
                      setNumber3('');
                      setOTP(3);
                    } else if (OTP == 3) {
                      setCode(code.slice(0, -1));
                      setNumber2('');
                      setOTP(2);
                    } else if (OTP == 2) {
                      setCode(code.slice(0, -1));
                      setNumber1('');
                      setOTP(1);
                    } else if (OTP < 2) {
                      alert('Nothing left to delete');
                    }
                  }}>
                  <Icon name="delete" size={24} style={{color: '#fff'}}></Icon>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
};

const modalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
export default PassengerContact;
