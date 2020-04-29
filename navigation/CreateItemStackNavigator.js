import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {defaultNavOptions} from './config/defaultStackNavigationOptions';

import EditNewItemScreen, {editNewOptions} from '../screens/Items/EditNewItemScreen';
import MapScreen, {mapScreenOptions} from '../screens/Items/MapScreen' 


const CreateItemStack = createStackNavigator();

export const CreateItemNavigator= () => {
   return(
      <CreateItemStack.Navigator 
      screenOptions={defaultNavOptions}
      mode='modal'
      headerMode='screen'
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