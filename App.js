/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View} from 'react-native';
import Page1 from './screen/page1';
/* import Page2 from './screen/page2'; */
import Page2 from './screen/page2';

import DriverInfo from './screen/DriverInfo';
/* These two libraries were imported to allow navigation in the application. Stack navigation was used to move from one page to another.*/
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PassengerContact from './screen/PassengerContact';
import Verification from './screen/Verification';

import auth from '@react-native-firebase/auth';
import {PraticeProvider , PracticeContext} from './Global/PracticeContext';

export default function App() {
  /*  */
  const Stack = createNativeStackNavigator();

  return (
    <PraticeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* The above two tags: <NavigationContainer> & <Stack.Navigator> are used to tell the app that following screens will have to be navigated.*/}

          {/* The <Stack.Screen> tag defines which screens are to be navigated. The first screen which will be displayed is Home screen because it is at the top of the stack initially.
           */}
          {/* Initially a header was shown on the top of page 1. It was not needed. So to remove the header we used options={{ headerShown: false}}.*/}
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={Page1}
          />

          {/* Select category screen will come next when the user taps on 'Let's Go' Button. The mecahnism of going to the next screen is defined in page1.js file.*/}
          {/* Initially a header was shown on the top of page 2. It was not needed. So to remove the header we used options={{ headerShown: false}}.*/}

          <Stack.Screen
            options={{headerShown: false}}
            name="Select Category"
            component={Page2}
          />

          <Stack.Screen
            options={{headerShown: false}}
            name="Driver Info"
            component={DriverInfo}
          />

          <Stack.Screen
            options={{headerShown: false}}
            name="Passenger Contact"
            component={PassengerContact}
          />

          <Stack.Screen
            options={{headerShown: false}}
            name="Verification"
            component={Verification}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PraticeProvider>
  );
}
