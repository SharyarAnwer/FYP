import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  PermissionsAndroid,
} from 'react-native';

/* This imports styling */
import DriverInfoStyling from '../styling/DriverInfoStyling';

/* All input fields were imported from react-native-paper to improve UI */
import {TextInput} from 'react-native-paper';

/* Icons used on this page are imported from react native vector icons */
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

/* This library allow us to take pictures of CNIC and License. */
import {launchCamera} from 'react-native-image-picker';

/* This library allows us to store our images to firestore storage. */
import storage from '@react-native-firebase/storage';

/* This allwos us to save our data to useContext. */
import DriverContext from '../Context/driver/DriverContext';

import {useNavigation} from '@react-navigation/native';

import Loader from './Loader';

import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
export default function PassengerInfo() {
  const navigation = useNavigation();

  const route = useRoute();

  const name = route.params.name;
  const image = route.params.image;
  const email = route.params.email;

  const [
    driverDetails,
    setDriverDetails,
    vehicleInfo,
    setVehicleInfo,
    CNIC_url,
    setCNIC_url,
    licenseUrl,
    setLicenseUrl,
  ] = useContext(DriverContext);

  /* These are the options for the dropdown for user o select if they hace a bike or a car. */
  const vehicleType = [
    {
      id: 1,
      vehicle: 'Bike',
    },
    {
      id: 2,
      vehicle: 'Car',
    },
  ];

  /* These 3 saves the name, number, and model of the vehicle */
  const [vehicleName, setVehicleName] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState(null);
  const [vehicleModel, setVehicleModel] = useState(null);

  /* These 3 come together to save the type of vehicle the driver has i.e car or bike. */
  const [selectVehicle, setSelectVehicle] = useState('Select Vehicle');
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState(vehicleType);

  /* /* These are the options for the seating capacity the user has in their vehicle 
  const seatingCapacity = [
    {
      id: 1,
      capacity: 1,
    },
    {
      id: 2,
      capacity: 2,
    },
    {
      id: 3,
      capacity: 3,
    },
    {
      id: 4,
      capacity: 4,
    },
  ];

  /* These 3 come together to save the seating capacity of the vehicle.
  const [capacity, setCapacity] = useState('Select Seating Capacity');
  const [isVehicleCap, setIsVehicleCap] = useState(false);
  const [vehicleCap, setVehicleCap] = useState(seatingCapacity); */

  /* These 3 come together to save the front of the CNIC */
  const [cameraPhoto, setCameraPhoto] = useState(null);
  const [imageData, setImageData] = useState(null);

  let cameraOptions = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(cameraOptions);
      //console.log(result)
      setCameraPhoto(result.assets[0].uri);
      setImageData(result);
    }
  };

  const uploadImage = async () => {
    const reference = storage().ref(
      'CNIC_PICTURES/' + imageData.assets[0].fileName,
      //imageData.assets[0].fileName,
    );

    // path to existing file on filesystem
    const pathToFile = cameraPhoto;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref('CNIC_PICTURES/' + imageData.assets[0].fileName)
      .getDownloadURL();
    /* console.log('URL for CNIC: ' + url); */
    setCNIC_url(url);
  };

  /*THIS CODE WILL TAKE PICTURE OF LICENSE FRONT, UPLOAD IT TO FIRESTORE STORAGE, AND ALSO FETCH ITS URL*/
  const [licensePhoto, setLicensePhoto] = useState(null);
  const [licensePhotoData, setLicensePhotoData] = useState(null);
  const [firebaseLicense, setFirebaseLicense] = useState('');

  let licenseCameraOptions = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openLicenseCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(licenseCameraOptions);
      //console.log(result)
      setLicensePhoto(result.assets[0].uri);
      setLicensePhotoData(result);
    }
  };

  const uploadLicenseImage = async () => {
    const reference = storage().ref(
      'License_Front/' + licensePhotoData.assets[0].fileName,
      //imageData.assets[0].fileName,
    );

    // path to existing file on filesystem
    const pathToFile = licensePhoto;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref('License_Front/' + licensePhotoData.assets[0].fileName)
      .getDownloadURL();
    /* console.log('URL for License: ' + url); */
    setLicenseUrl(url);
  };

  useEffect(() => {
    if (CNIC_url != '' && licenseUrl != '') {
      setLoaderVisible(true);

      firestore()
        .collection('Drivers')
        .add({
          Name: driverDetails.driverName,
          Email: driverDetails.emailAddress,
          MobileNumber: driverDetails.contactNumber,
          ProfilePicture: driverDetails.profilePicture,
          Department: driverDetails.emailAddress.substring(0, 2),
          SZABISTid: driverDetails.emailAddress.substring(2, 9),
          /* profileStatus: 'Verified', */
          profileStatus: 'Pending',
          VehicleName: vehicleName,
          VehicleModel: vehicleModel,
          VehicleNumber: vehicleNumber,
          VehicleType: selectVehicle, 
          CNIC_URL: CNIC_url,
          License_URL: licenseUrl,
        })
        .then(() => {
          console.log('User added successfully!');
        });

      navigation.navigate('Driver Booking' , {
        name: name,
        email: email,
        image: image,
      });
      setLoaderVisible(false);
    }
  }, [CNIC_url, licenseUrl]);

  const navigateToNextPage = async () => {
    setLoaderVisible(true);

    uploadImage()
    uploadLicenseImage()
    /* const uploadImagePromise = uploadImage();
    const uploadLicenseImagePromise = uploadLicenseImage();

    const [imageUploadSuccess, LicenseSuccess] = await Promise.all([
      uploadImagePromise,
      uploadLicenseImagePromise,
    ]);

    console.log(imageUploadSuccess);
    console.log(LicenseSuccess);

    setVehicleInfo({
      vehicleName: vehicleName,
      vehicleNumber: vehicleNumber,
      vehicleModel: vehicleModel,
      vehicleType: selectVehicle,
      /* seatingCapacity: capacity,
    });

    firestore()
      .collection('Drivers')
      .add({
        Name: driverDetails.driverName,
        Email: driverDetails.emailAddress,
        MobileNumber: driverDetails.contactNumber,
        ProfilePicture: driverDetails.profilePicture,
        Department: driverDetails.emailAddress.substring(0, 2),
        SZABISTid: driverDetails.emailAddress.substring(2, 9),
        profileStatus: 'Verified',
        CNIC_URL: CNIC_url,
        License_URL: licenseUrl,
      })
      .then(() => {
        console.log('User added successfully!');
      });

    navigation.navigate('Driver Booking');
    setLoaderVisible(false); */
  };

  const [loaderVisible, setLoaderVisible] = useState(false);

  return (
    <View style={DriverInfoStyling.main_view}>
      {loaderVisible && <Loader />}
      <Text style={DriverInfoStyling.heading}>Switch to driver</Text>
      <Text>Please enter the following information</Text>

      <View style={DriverInfoStyling.nameInput}>
        <TextInput
          placeholder="Vehicle name"
          mode="outlined"
          label="Vehicle Name"
          value={vehicleName}
          onChangeText={name => setVehicleName(name)}
          activeOutlineColor="#7788ef"
        />
      </View>

      <View style={DriverInfoStyling.nameInput}>
        <TextInput
          placeholder="Vehicle number"
          mode="outlined"
          label="Vehicle Number"
          value={vehicleNumber}
          onChangeText={name => setVehicleNumber(name)}
          activeOutlineColor="#7788ef"
        />
      </View>

      <View style={DriverInfoStyling.nameInput}>
        <TextInput
          placeholder="Vehicle Model"
          mode="outlined"
          label="Vehicle Model"
          value={vehicleModel}
          onChangeText={name => setVehicleModel(name)}
          activeOutlineColor="#7788ef"
        />
      </View>

      <View style={dropdown.container}>
        <TouchableOpacity
          style={dropdown.selector}
          onPress={() => {
            setIsClicked(!isClicked);
          }}>
          <Text>{selectVehicle}</Text>
          {isClicked ? (
            <AntDesign name="caretup" color={'#4772FF'} size={10}></AntDesign>
          ) : (
            <AntDesign name="caretdown" color={'#4772FF'} size={10}></AntDesign>
          )}
        </TouchableOpacity>

        {isClicked ? (
          <View style={dropdown.dropDownArea}>
            <FlatList
              data={data}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={dropdown.vehicleType}
                    onPress={() => {
                      setSelectVehicle(item.vehicle);
                      setIsClicked(false);
                    }}>
                    <Text>{item.vehicle}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}
      </View>

      {/* <View style={second_dropdown.container}>
        <TouchableOpacity
          style={second_dropdown.selector}
          onPress={() => {
            setIsVehicleCap(!isVehicleCap);
            //setIsClicked(!isClicked);
          }}>
          <Text>{capacity}</Text>
          {isVehicleCap ? (
            <AntDesign name="caretup" color={'#4772FF'} size={10}></AntDesign>
          ) : (
            <AntDesign name="caretdown" color={'#4772FF'} size={10}></AntDesign>
          )}
        </TouchableOpacity>

        {isVehicleCap ? (
          <View style={second_dropdown.dropDownArea}>
            <FlatList
              data={vehicleCap}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={second_dropdown.vehicleType}
                    onPress={() => {
                      setCapacity(item.capacity);
                      setIsVehicleCap(false);
                    }}>
                    <Text>{item.capacity}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}
      </View> */}

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginVertical: 20,
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          style={DriverInfoStyling.cnicFront}
          onPress={openCamera}>
          <Text>CNIC Front</Text>
          <Entypo name="upload-to-cloud" color={'#4772FF'} size={30}></Entypo>
        </TouchableOpacity>

        <TouchableOpacity
          style={DriverInfoStyling.licenseFront}
          onPress={openLicenseCamera}>
          <Text>License Front</Text>
          <Entypo name="upload-to-cloud" color={'#4772FF'} size={30}></Entypo>
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: 'center',
          marginVertical: 20,
          width: '100%',
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#7788ef',
            paddingHorizontal: 30,
            paddingVertical: 20,
            width: '100%',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={() => {
            navigateToNextPage();
            /* uploadImage();
            uploadLicenseImage() */

            /* setVehicleInfo({
              vehicleName: vehicleName,
              vehicleNumber: vehicleNumber,
              vehicleModel: vehicleModel,
              vehicleType: selectVehicle,
              seatingCapacity: capacity,
            })
 */
            /* console.log("Vehicle Name: " + vehicleInfo.vehicleName)
            console.log("Vehicle Number: " + vehicleInfo.vehicleNumber)
            console.log("Vehicle Model: " + vehicleInfo.vehicleModel)
            console.log("Vehicle Type: " + vehicleInfo.vehicleType)
            console.log("Vehicle Capacity: " + vehicleInfo.seatingCapacity) */

            /* navigation.navigate("Driver Booking") */
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}>
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const dropdown = StyleSheet.create({
  container: {
    /* flex: 1, */
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  selector: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderWidth: 1.8,
    borderColor: '#4772FF',
    alignSelf: 'center',
    marginVertical: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  dropDownArea: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginTop: 0,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
    zIndex: 20,
  },
  vehicleType: {
    width: '85%',
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: '#8e8e8e',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

const second_dropdown = StyleSheet.create({
  container: {
    /* flex: 1, */
    width: '100%',
    paddingHorizontal: 20,
    /* marginTop: -180 */
    marginVertical: 20,
  },
  selector: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderWidth: 1.8,
    borderColor: '#4772FF',
    alignSelf: 'center',
    marginVertical: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  dropDownArea: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginTop: 0,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
  },
  vehicleType: {
    width: '85%',
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: '#8e8e8e',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
