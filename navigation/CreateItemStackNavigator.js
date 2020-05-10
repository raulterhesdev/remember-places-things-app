import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {defaultNavOptions} from './config/defaultStackNavigationOptions';

import EditNewItemScreen, {editNewOptions} from '../screens/Items/EditNewItemScreen';
import MapScreen, {mapScreenOptions} from '../screens/Items/MapScreen' 
import {DarkColors, LightColors} from '../constants/Theme';
import { useSelector } from 'react-redux';

const CreateItemStack = createStackNavigator();

export const CreateItemNavigator= () => {
   const darkMode =  useSelector(state => state.user.switchData.darkMode)
   return(
      <CreateItemStack.Navigator 
      screenOptions={defaultNavOptions}
      mode='modal'
      headerMode='screen'
      screenOptions={{
         headerStyle: {
            backgroundColor: darkMode ? DarkColors.dark : LightColors.primary,
         },
         headerTintColor: darkMode ? DarkColors.primary : LightColors.light
      }}
      >
         <CreateItemStack.Screen 
         name="EditNewItem"
         component={EditNewItemScreen}
         options={editNewOptions}
         />
         <CreateItemStack.Screen 
         name="Map"
         component={MapScreen}
         options={mapScreenOptions}
         />
      </CreateItemStack.Navigator>
   )
}