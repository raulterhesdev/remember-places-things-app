import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {defaultNavOptions} from './config/defaultStackNavigationOptions';

import ProfileScreen, {profileOptions} from '../screens/User/ProfileScreen';

const ProfileStackNavigator = createStackNavigator();

export const ProfileNavigator = () => {
   return(
      <ProfileStackNavigator.Navigator screenOptions={defaultNavOptions}
      mode='modal'
      headerMode='screen'
      >
         <ProfileStackNavigator.Screen 
         name="Profile"
         component={ProfileScreen}
         options={profileOptions}
         />


         
      </ProfileStackNavigator.Navigator>
   )
}