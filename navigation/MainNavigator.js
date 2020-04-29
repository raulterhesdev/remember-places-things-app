import React from 'react'
import {NavigationContainer } from '@react-navigation/native';


import {ItemsNavigator} from './ItemsTabNavigator';


const MainNavigator = (props) => {
   return (
      <NavigationContainer>
         <ItemsNavigator /> 
      </NavigationContainer>
   )
}

export default MainNavigator


