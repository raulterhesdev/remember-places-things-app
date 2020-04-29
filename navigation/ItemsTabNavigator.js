import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';



import {AllItemsNavigator} from './AllItemsStackNavigator';
import {CreateItemNavigator} from './CreateItemStackNavigator';
import {ProfileNavigator} from './ProfileStackNavigator';
import Colors from '../constants/Colors';



const ItemsTabNavigator = createMaterialBottomTabNavigator();


export const ItemsNavigator = (props) => {
   return (
      <ItemsTabNavigator.Navigator 
      shifting
      backBehavior='history'
      
      barStyle={{backgroundColor:Colors.primary}}
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
               // tabBarIcon: ({ color, size }) => (
               //    <MaterialCommunityIcons name='account-circle' size={size} color={color} style={{marginTop:15}}/>
               // ),
            }}
            />
      </ItemsTabNavigator.Navigator>
   )
}