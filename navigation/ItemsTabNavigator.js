import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons';



import {AllItemsNavigator} from './AllItemsStackNavigator';
import {CreateItemNavigator} from './CreateItemStackNavigator';
import {ProfileNavigator} from './ProfileStackNavigator';

import Colors from '../constants/Colors';
import {DarkColors, LightColors} from '../constants/Theme';
import { useSelector } from 'react-redux';
import { DarkTheme } from 'react-native-paper'


const ItemsTabNavigator = createMaterialBottomTabNavigator();
// const ItemsTabNavigator = createBottomTabNavigator();


export const ItemsNavigator = (props) => {
   
   const switchData =  useSelector(state => state.user.switchData)
   const darkMode = switchData ? switchData.darkMode : false;
   // const darkMode = true;
   const backgroundColor = darkMode ? DarkColors.dark : LightColors.primary
   const activeColor = darkMode ? DarkColors.primary : LightColors.light
   return (
      <ItemsTabNavigator.Navigator 
      shifting
      backBehavior='history'
      activeColor={activeColor}
      barStyle={{backgroundColor:backgroundColor}}
      sceneAnimationEnabled={false}
      >
         <ItemsTabNavigator.Screen 
            name="AllItems"
            component={AllItemsNavigator}
            options={{
               tabBarLabel: 'Home',
               tabBarIcon: ({focused, color}) => (
                  <MaterialCommunityIcons name='home-circle' size={23}  color={color}/>
               )
            }}
            />
         <ItemsTabNavigator.Screen 
            name="NewItem"
            component={CreateItemNavigator}
            options={{
               tabBarLabel: 'New',
               tabBarIcon: ({focused, color}) => (
                  <MaterialCommunityIcons name='plus-circle-multiple-outline' size={23}  color={color}/>
               )
            }}
            />
         <ItemsTabNavigator.Screen 
            name="ProfileScreen"
            component={ProfileNavigator}
            options={{
               tabBarLabel: 'Profile',
               tabBarIcon: ({focused, color}) => (
                  <MaterialCommunityIcons name='account-circle' size={23}  color={color}/>
               )
            }}
            />
      </ItemsTabNavigator.Navigator>
   )
}