import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {defaultNavOptions} from './config/defaultStackNavigationOptions';

import ProfileScreen, {profileOptions} from '../screens/User/ProfileScreen';
import {DarkColors, LightColors} from '../constants/Theme';
import { useSelector } from 'react-redux';


const ProfileStackNavigator = createStackNavigator();

export const ProfileNavigator = () => {
   const darkMode =  useSelector(state => state.user.switchData.darkMode)
   return(
      <ProfileStackNavigator.Navigator screenOptions={defaultNavOptions}
      mode='modal'
      headerMode='screen'
      screenOptions={{
         headerStyle: {
            backgroundColor: darkMode ? DarkColors.dark : LightColors.primary,
         },
         headerTintColor: darkMode ? DarkColors.primary : LightColors.light
      }}
      >
         <ProfileStackNavigator.Screen 
         name="Profile"
         component={ProfileScreen}
         options={profileOptions}
         />


         
      </ProfileStackNavigator.Navigator>
   )
}