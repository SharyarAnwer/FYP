/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const PassengerInfoStyling = StyleSheet.create(
    {
        container:
        {
            /* backgroundColor: '#ffffff' */
            /* backgroundColor: '#F9F6EE', */
            backgroundColor: '#FAF9F6',
            flex: 1,
        },
        headerWrapper:
        {
            backgroundColor: '#5566ee',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30
        },
        header:
        {
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        iconWhite:
        {
            color: '#ffffff'
        },
        headerText:
        {
            fontWeight: 'bold',
            color: '#ffffff',
            fontSize: 18
        },
        splash:
        {
            paddingTop:60,
            paddingBottom: 160,
            alignItems:'center'
        },
        content:
        {
            marginHorizontal: 20,
            paddingHorizontal: 20,
            marginBottom: 10,
            backgroundColor: '#ffffff',
            borderRadius: 15,
            marginTop: -60,
            flex: 1,
            justifyContent: 'space-between'
        },
        title:
        {
            fontWeight: 'bold',
            fontSize: 18,
            color: '#2d2d2d',
            paddingVertical: 20
        },
        input:
        {
            fontWeight: 'bold',
            borderBottomColor: '#dddddd',
            borderBottomWidth: 2,
            fontSize: 16,
            marginBottom: 20,
            paddingVertical: 20
        },
        description:
        {
            color: '#989898',
            textAlign: 'center',
            fontSize: 18,
            padding: 20,
            fontWeight: '500'
        },
        buttonWrapper:
        {
            alignItems: 'center',
            marginVertical: 30,
        },
        button:
        {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#4355ee',
            width: 50,
            height: 50,
            borderRadius: 50
        },
        iconButton:
        {
            color: '#fff',

        }
    }
)

export default PassengerInfoStyling;