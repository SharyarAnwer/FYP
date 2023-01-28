import {View, Text, ActivityIndicator, Modal, StyleSheet, Image} from 'react-native';
import React from 'react';

export default function Loader(props) {
  const {showLoader} = props;
  return (
    <Modal
    animationType='fade'
    onRequestClose={() => {}}
    transparent
    isVisible = {false}
    >
        <View style = {style.parentContainerStyle}>
            <View style = {style.innerContainerStyle}>
                <Image
                source = {require('../Assets/load2.gif')}
                style={{width: 150, height: 150}}
                />
            </View>
        </View>
    </Modal>
  );
}

const style = StyleSheet.create(
    {
        parentContainerStyle: {
            flex: 1,
            display:'flex',
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            //textAlign: 'center',
            //width: 200,
            //height: 200,
            /* borderRadius: 100, */
            //borderRadius: 100,
            //alignSelf: 'center',
            //overflow: 'hidden'
        },
        innerContainerStyle:{
            display: 'flex',
            elevation: 2,
            /* shadowOffset: {width: 2 , height:3}, */
            backgroundColor: 'transparent',
            /* backgroundColor: 'none', */
            //shadowColor : 'green',
            shadowOpacity : 0,
            shadowRadius : 0,
            //alignSelf : 'center',
            justifyContent : 'center',
            alignItems : 'center',
            //textAlign:'center',
            
            /* padding : 15,
            margin : 30, */
            width: 150,
            height: 150,
            borderRadius: 75,
            overflow: 'hidden',
        }
    }
)