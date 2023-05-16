import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/Ionicons';

const PendingDrivers = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    let collectionRef = firestore().collection('Drivers'); // your collection reference here

    collectionRef
      /* .where('Capacity', '>', 0)
      .where("VehicleType", '==' , ride.vehicleType) */
      .get()
      .then(querySnapshot => {
        const dataArray = [];
        querySnapshot.forEach(doc => {
          const dataObject = {id: doc.id, ...doc.data()};
          dataArray.push(dataObject);
        });
        setDrivers(dataArray);

        console.log(drivers);
        console.log(drivers.length);
      });
  }, [drivers]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalHeading, setModalHeading] = useState('Modal Content');
  const [modalImage, setModalImage] = useState(null);

  const handleButtonPress = (buttonName, imageURL) => {
    if (buttonName === 'CNIC') {
      setModalHeading('CNIC');
      setModalImage(imageURL);
    } else if (buttonName === 'License') {
      setModalHeading('License');
      setModalImage(imageURL);
    }
    setModalVisible(true);
  };

  const updateDocument = (id, newStatus) => {
    const driverRef = firestore().collection('Drivers');
    const driverDocRef = driverRef.doc(id);

    driverDocRef
      .update({
        profileStatus: newStatus
      })
      .then(() => {
        alert('Driver has been verified successfully!');
      })
      .catch(error => {
        alert('Error updating document: ', error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} vertical>
      <View style={styles.cardsContainer}>
        {drivers.map(card => (
          <View style={styles.card} key={card.id}>
            <View style={styles.cardContentContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: card.ProfilePicture}}
                  style={styles.image}
                />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>Name: {card.Name}</Text>
                <Text style={styles.content}>Id: {card.SZABISTid}</Text>
                <Text style={styles.content}>
                  Department: {card.Department}
                </Text>
                <Text style={styles.content}>
                  Vehicle Type: {card.VehicleType}
                </Text>
                <Text style={styles.content}>
                  Vehicle Name: {card.VehicleName}
                </Text>
                <Text style={styles.content}>
                  Vehicle Number Plate: {card.VehicleNumber}
                </Text>
                <Text style={styles.content}>
                  Vehicle Year: {card.VehicleModel}
                </Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleButtonPress('CNIC', card.CNIC_URL)}>
                    <Text style={styles.buttonText}>CNIC</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      handleButtonPress('License', card.License_URL)
                    }>
                    <Text style={styles.buttonText}>License</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.validTextContainer}>
                  <Text style={styles.validText}>
                    Is the driver's information valid?
                  </Text>
                </View>

                <View style={styles.validButtonContainer}>
                  <TouchableOpacity
                    style={styles.validButton}
                    onPress={() => updateDocument(card.id, 'Verified123')}>
                    <Icon name="checkmark-outline" size={24} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.validButton}
                    onPress={() => updateDocument(card.id, 'Unverified')}>
                    <Icon name="close-outline" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* <View style={styles.modalHeader}>
              <TouchableHighlight
                onPress={() => setModalVisible(false)}
                underlayColor="transparent"
                style={styles.closeButton}>
                <Icon name="close-outline" size={24} color="#fff" />
              </TouchableHighlight>
            </View> */}
            <Text style={styles.modalText}>{modalHeading}</Text>
            {modalImage && (
              <Image source={{uri: modalImage}} style={styles.modalImage} />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  cardsContainer: {
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 90,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  content: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
  },
  validButtonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    position: 'relative',
    bottom: 0,
    left: 32.5,
    right: 0,
  },
  validButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#4772FF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  button: {
    flex: 1,
    height: 40,
    backgroundColor: '#4772FF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#4772FF',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  modalHeader: {
    alignSelf: 'flex-end',
    marginRight: 0,
    marginTop: 0,
  },
  validTextContainer: {
    position: 'relative',
    bottom: 0,
    left: -50,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 10,
  },
  validText: {
    fontSize: 16.5,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default PendingDrivers;
