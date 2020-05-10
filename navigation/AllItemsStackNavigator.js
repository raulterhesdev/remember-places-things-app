import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import AllItemsScreen , {allItemsOptions} from '../screens/Items/AllItemsScreen';
import EditNewItemScreen , {editNewOptions} from '../screens/Items/EditNewItemScreen';
import MapScreen, {mapScreenOptions} from '../screens/Items/MapScreen' ;


import {defaultNavOptions} from './config/defaultStackNavigationOptions';
import {DarkColors, LightColors} from '../constants/Theme';
import { useSelector } from 'react-redux';


const AllItemsStackNavigator = createStackNavigator();

export const AllItemsNavigator = () => {
   const darkMode =  useSelector(state => state.user.switchData.darkMode)
   return(
      <AllItemsStackNavigator.Navigator screenOptions={defaultNavOptions}
      mode='modal'
      headerMode='screen'
      screenOptions={{
         headerStyle: {
            backgroundColor: darkMode ? DarkColors.dark : LightColors.primary,
         },
         headerTintColor: darkMode ? DarkColors.primary : LightColors.light,
         cardStyle: {
            backgroundColor: 'black'
         }
      }}>
         <AllItemsStackNavigator.Screen 
         name="AllItems"
         component={AllItemsScreen}
         options={allItemsOptions}
         />
         <AllItemsStackNavigator.Screen 
         name="EditNewItem"
         component={EditNewItemScreen}
         options={editNewOptions}
         />
         <AllItemsStackNavigator.Screen 
         name="Map"
         component={MapScreen}
         options={mapScreenOptions}
         />
         
      </AllItemsStackNavigator.Navigator>
   )
}