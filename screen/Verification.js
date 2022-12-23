import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Svg, {Path} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {PraticeProvider , PracticeContext } from '../Global/PracticeContext';

export default function Verification(props) {

  
  const {code1, setCode1} = useContext(PracticeContext)

  const route = useRoute();
  const { confirmcode, checkFunc } = route.params;

  const navigation = useNavigation();

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

  const styles = StyleSheet.create({
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

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="chevron-left" size={24} style={styles.iconHeader} />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerTitle}>Verification Code</Text>
          </View>

          <View style={{width: 20}} />
        </View>
      </SafeAreaView>

      <View>
        <View style={styles.svgWrapper}>
          <Svg viewBox="0 0 1440 320">
            <Path
              fill="#5566ee"
              fill-opacity="1"
              d="M0,32L26.7,69.3C53.3,107,107,181,160,218.7C213.3,256,267,256,320,234.7C373.3,213,427,171,480,165.3C533.3,160,587,192,640,176C693.3,160,747,96,800,96C853.3,96,907,160,960,202.7C1013.3,245,1067,267,1120,250.7C1173.3,235,1227,181,1280,181.3C1333.3,181,1387,235,1413,261.3L1440,288L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></Path>
          </Svg>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Confirmation</Text>
        <Text style={styles.subTitle}>
          Please type the verification code send to your name:
        </Text>

        <View style={styles.otpWrapper}>
          <View style={[styles.otpButton, {backgroundColor: '#7788ef'}]}>
            <Text style={[styles.textOtp, {color: '#fff'}]}>{number1}</Text>
          </View>

          <View style={[styles.otpButton, {backgroundColor: '#7788ef'}]}>
            <Text style={[styles.textOtp, {color: '#fff'}]}>{number2}</Text>
          </View>

          <View
            style={[
              styles.otpButton,
              {backgroundColor: '#7788ef', borderRadius: 50},
            ]}>
            <Text style={[styles.textOtp, {color: '#fff'}]}>{number3}</Text>
          </View>

          <View
            style={[
              styles.otpButton,
              {backgroundColor: '#7788ef', borderRadius: 50},
            ]}>
            <Text style={[styles.textOtp, {color: '#fff'}]}>{number4}</Text>
          </View>

          <View
            style={[
              styles.otpButton,
              {backgroundColor: '#7788ef', borderRadius: 50},
            ]}>
            <Text style={[styles.textOtp, {color: '#fff'}]}>{number5}</Text>
          </View>

          <View
            style={[
              styles.otpButton,
              {backgroundColor: '#7788ef', borderRadius: 50},
            ]}>
            <Text style={[styles.textOtp, {color: '#fff'}]}>{number6}</Text>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity>
            <Text style={styles.buttonResend}>Resend Code &gt;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonVerifyWrapper}>
          <TouchableOpacity
            style={styles.buttonVerify}
            onPress={() => 
            {
              setCode1(number1.toString() + number2.toString() + number3.toString() + number4.toString() + number5.toString() + number6.toString())

              /* setCode1(typedOTP) */
              /* console.log(typeof code1) */

              confirmcode()
            }}>
            <Text style={styles.textButtonVerify}>Verify</Text>
          </TouchableOpacity>
        </View>

        <View>
          {numbers.map((chunk, index) => {
            return (
              <View key={index} style={styles.numPadWrapper}>
                {chunk.map(numbers => {
                  return (
                    <TouchableOpacity
                      key={numbers}
                      style={styles.numPad}
                      onPress={() => {
                        if (OTP == 1) {
                          setNumber1(numbers);
                          setOTP(2);
                        } else if (OTP == 2) {
                          setNumber2(numbers);
                          setOTP(3);
                        } else if (OTP == 3) {
                          setNumber3(numbers);
                          setOTP(4);
                        } else if (OTP == 4) {
                          setNumber4(numbers);
                          setOTP(5);
                        } else if (OTP == 5) {
                          setNumber5(numbers);
                          setOTP(6);
                        } else if (OTP == 6) {
                          setNumber6(numbers);
                          setOTP(7);
                        }
                      }}>
                      <Text style={styles.numPadNumber}>{numbers}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}

          <View style={styles.numPadWrapper}>
            <View style={{width: 20}} />

            <TouchableOpacity
              style={styles.numPad}
              onPress={() => {
                if (OTP == 1) {
                  setNumber1(0);
                  setOTP(2);
                } else if (OTP == 2) {
                  setNumber2(0);
                  setOTP(3);
                } else if (OTP == 3) {
                  setNumber3(0);
                  setOTP(4);
                } else if (OTP == 4) {
                  setNumber4(0);
                  setOTP(5);
                } else if (OTP == 5) {
                  setNumber5(0);
                  setOTP(6);
                } else if (OTP == 6) {
                  setNumber6(0);
                  setOTP(7);
                }
              }}>
              <Text style={styles.numPadNumber}>0</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.numPad}
              onPress={() => {
                if (OTP == 7) {
                  setNumber6('');
                  setOTP(6);
                } else if (OTP == 6) {
                  setNumber5('');
                  setOTP(5);
                } else if (OTP == 5) {
                  setNumber4('');
                  setOTP(4);
                } else if (OTP == 4) {
                  setNumber3('');
                  setOTP(3);
                } else if (OTP == 3) {
                  setNumber2('');
                  setOTP(2);
                } else if (OTP == 2) {
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
  );
}
