/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const PassengerInfoStyling = StyleSheet.create(
    {
        main_view:
        {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flex: 1, 
            backgroundColor:'#fff',
        },
        heading:
        {
            fontSize: 25,
            color:'#4772FF',
            fontWeight: 'bold'
        },
        nameInput:
        {
            borderRadius: 5,
            width: 350,
            backgroundColor: '#f5f4f2',
            paddingLeft: 15
        }
    }
)

export default PassengerInfoStyling;