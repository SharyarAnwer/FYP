import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  PermissionsAndroid,
  Image,
  ScrollView,
} from 'react-native';
import DriverInfoStyling from '../styling/DriverInfoStyling';
import {TextInput} from 'react-native-paper';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import {launchCamera} from 'react-native-image-picker';

import storage from '@react-native-firebase/storage';

export default function PassengerInfo() {
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

  const options = [
    {
      id: 1,
      name: 'Faculty member',
    },
    {
      id: 2,
      name: 'Student',
    },
  ];

  const [vehicleName, setVehicleName] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState(null);

  const [selectVehicle, setSelectVehicle] = useState('Select Vehicle');
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState(vehicleType);

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

  const [capacity, setCapacity] = useState('Select Seating Capacity');
  const [isVehicleCap, setIsVehicleCap] = useState(false);
  const [vehicleCap, setVehicleCap] = useState(seatingCapacity);

  const [cameraPhoto, setCameraPhoto] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [url, setUrl] = useState('');

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
    const reference = storage().ref('CNIC_PICTURES/' + imageData.assets[0].fileName);

    // path to existing file on filesystem
    const pathToFile = cameraPhoto;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    console.log(url);
  };
  return (
    <View style={DriverInfoStyling.main_view}>
      <Text style={DriverInfoStyling.heading}>Switch to driver</Text>
      <Text>Please enter the following information</Text>

      <View style={DriverInfoStyling.nameInput}>
        <TextInput
          placeholder="Vehicle name"
          mode="outlined"
          label="Vehicle Name"
          value={vehicleName}
          onChangeText={name => setVehicleName({name})}
          activeOutlineColor="#7788ef"
        />
      </View>

      <View style={DriverInfoStyling.nameInput}>
        <TextInput
          placeholder="Vehicle number"
          mode="outlined"
          label="Vehicle Number"
          value={vehicleNumber}
          onChangeText={name => vehicleNumber({name})}
          activeOutlineColor="#7788ef"
        />
      </View>

      <View style={DriverInfoStyling.nameInput}>
        <TextInput
          placeholder="Vehicle Model"
          mode="outlined"
          label="Vehicle Model"
          value={vehicleNumber}
          onChangeText={name => vehicleNumber({name})}
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

      <View style={second_dropdown.container}>
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
                      setSelectVehicle(item.capacity);
                      setIsClicked(false);
                    }}>
                    <Text>{item.capacity}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}
      </View>

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
          /* onPress={openCamera} */
        >
          <Text>License Front</Text>
          <Entypo name="upload-to-cloud" color={'#4772FF'} size={30}></Entypo>
        </TouchableOpacity>
      </View>

      <View style = {{display: 'flex' , flexDirection: 'row'}}>
        <View style={{width: 100, height: 20, backgroundColor: 'green'}}>
          <Image
            source={{uri: cameraPhoto}}
            style={{height: 100, width: 100}}
          />
        </View>

        <TouchableOpacity onPress={uploadImage} style = {{marginLeft: 40}}>
          <Text>SUBMIT</Text>
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

/* useEffect(() => {
    const uploadImage = async () => {
      //First step is to convert image to blob image
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
          resolve(xhr.response);
        };

        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };

        xhr.responseType = 'blob';

        xhr.open('GET', cameraPhoto, true);

        xhr.send(null);
      });

      //Second step is to set META, whatever that means
      // Create the file metadata
      /** @type {any} */
/**const metadata = {
        contentType: 'image/jpeg',
      };

      //Last step is t send iamge to cloud storage
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, 'CNIC_PICTURES/' + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        error => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            console.log('File available at', downloadURL);
          });
        },
      );
    };

    if (cameraPhoto != null) {
      uploadImage();
      setCameraPhoto(null);
    }
  }, [cameraPhoto]); */
