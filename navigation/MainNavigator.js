import React, { useEffect, useState } from 'react'
import {NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import {ItemsNavigator} from './ItemsTabNavigator';
import AuthScreen from '../screens/User/AuthScreen';
import StartupScreen from '../screens/User/StartupScreen';

const MainNavigator = (props) => {
   
   const isLoggedIn = useSelector(state => !!state.user.userData);
   const autoLogin = useSelector(state => state.user.autoLogin)
   
   return (
      <NavigationContainer>
         {isLoggedIn && <ItemsNavigator /> }
         {!isLoggedIn && !autoLogin && <StartupScreen />}
         {!isLoggedIn && autoLogin && <AuthScreen />}
         
      </NavigationContainer>
   )
}

export default MainNavigator


