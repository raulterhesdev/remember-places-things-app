import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import AllItemsScreen , {allItemsOptions} from '../screens/Items/AllItemsScreen';
import EditNewItemScreen , {editNewOptions} from '../screens/Items/EditNewItemScreen';


import {defaultNavOptions} from './config/defaultStackNavigationOptions';


const AllItemsStackNavigator = createStackNavigator();

export const AllItemsNavigator = () => {
   return(
      <AllItemsStackNavigator.Navigator screenOptions={defaultNavOptions}
      mode='modal'
      headerMode='screen'>
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

         
      </AllItemsStackNavigator.Navigator>
   )
}