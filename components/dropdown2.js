import React, {useState, useRef, useEffect} from 'react';

import PhoneInput from 'react-native-phone-number-input';

import {SafeAreaView, StyleSheet, View} from 'react-native';

export default function dropdown2(props) {

  const [phoneNumber, setPhoneNumber] = useState('');
  
  useEffect(() => {
    props.onSubmit(phoneNumber)
    /* console.log(phoneNumber) */
  }, [phoneNumber])
  

  return (
    <View>
      <PhoneInput /* default={phoneNumber}
      defaultCode = 'PK'
      withShadow */

      
        default={phoneNumber}
        defaultCode="PK"
        /* layout="second" */
        withShadow
        /* filterProps */
        /* autoFocus */
        disableArrowIcon
        /* containerStyle={styles.phoneContainer} */
        /* textContainerStyle={styles.textInput} */
        countryPickerProps={{
          countryCodes: ['PK'],
        }}

        /* onChangeText = {(newText) =>
        {
          setPhoneNumber(newText)
          console.log(phoneNumber)
        }} */

        onChangeFormattedText = {(newText) =>
          {
            setPhoneNumber(newText)
          }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
