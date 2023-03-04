import React, {useState, useEffect, useRef} from 'react';
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

import {useNavigation} from '@react-navigation/native';

export default function ModalPopup({
  visible,
  children,
  imageSrc,
  otpMessage,
  setVisible,
  buttonVisible,
  buttonLink,
  screensToPop
}) {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

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
          {/* {children} */}
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
              source={imageSrc}
              style={{height: 150, width: 150, marginVertical: 10}}
            />
          </View>

          <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
            {otpMessage}
          </Text>

          {buttonVisible && (
            <View
              style={{
                alignItems: 'center',
                marginVertical: 10,
                paddingHorizontal: 20,
                flexShrink: 2,
                marginTop: 'auto',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.pop(screensToPop);
                  navigation.navigate(buttonLink);
                }}
                style={{
                  backgroundColor: '#7788ef',
                  paddingHorizontal: 0,
                  paddingVertical: 20,
                  width: '100%',
                  alignItems: 'center',
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  zIndex: -2,
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    marginLeft: 10,
                  }}>
                  Check Your Ride Status
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

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
