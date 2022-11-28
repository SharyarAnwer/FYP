/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const page1styling = StyleSheet.create({

    view:
    {
        backgroundColor: 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '30%',
    },
    headingStyle:
    {
        fontSize: 25,
        marginBottom: 200,
        color: 'black',
    },
    textStyle:
    {
        fontSize: 40,
        marginBottom: 5,
        color: 'black',
        fontWeight: 'bold',
    },
    footer:
    {
        fontSize: 10,
        color: 'black',
        marginBottom:260,
    },
    button:
    {
        backgroundColor:'#4772FF',
        width: '90%',
        height: '8%',
        borderRadius: 15,
    },
    buttonText:
    {
        fontSize: 25,
        padding: 10,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'open sans',
        fontWeight: 'bold',
    },
    buttonTest:
    {
        backgroundColor:'#4772FF',
        width: '90%',
        height: '8%',
        borderRadius: 15,
        marginTop:5
    },
});

export default page1styling;
