/* eslint-disable prettier/prettier */
import React from 'react';

/* All components which we are using should be imported from react-native. Here we have imported Text , View , TouchableOpacity.*/
import { Text, View, TouchableOpacity} from 'react-native';

/* All styling of page1.js is written in the page1styling.js file. Below we have imported the styling so we can use it in the page1.js*/
import page1styling from '../styling/page1styling';

/* React function based component was used. Export default function exports the Page1 so that it can be used by other .js files.*/
export default function Page1({ navigation }) {
  return (
    <View style={page1styling.view}>
      
      <Text style = {page1styling.headingStyle} >Welcome To</Text>
      <Text style = {page1styling.textStyle} >Cab Share</Text>
      <Text style = {page1styling.footer} >Connect With People. Connect With Society.</Text>

      {/* Touchable Opacity was used to create a custom button. We cannot use the default button because styling cannot be applied to the default button in react native. */}
      <TouchableOpacity style = {page1styling.button} title="Go to Page#2"

        /* The onPress function takes the user to second page of the application when the button is pressed. 'Select category' is the name of the page to which we have to go when he button is pressed.  */
        /* The onPress function takes the user to second page of the application when the button is pressed. 'Select category' is the name of the page to which we have to go when he button is pressed.  */
        onPress={() => navigation.navigate('Select Category')}>
        <View>
            <Text style = {page1styling.buttonText}>
                Let's Go!
            </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
