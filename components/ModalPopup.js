import React , {useState , useEffect} from 'react'
import {
  View,
  Animated,
  Modal} from 'react-native'

export default function ModalPopup({visible , children}) {
  
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
  )
}
