import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native'

import * as userActions from '../../shop/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

import {MaterialCommunityIcons} from '@expo/vector-icons'
import Colors from '../../constants/Colors';


const AuthScreen = () => {
   const dispatch = useDispatch();

   const [isLogin, setIsLogin] = useState(true)
   const [email, setEmail] = useState('raulterhes0013@gmail.com')
   const [password, setPassword] = useState('123456')
   const [rememberMe, setRememberMe] = useState(false)
   const [error, setError] = useState()
   const [isLoading, setIsLoading] = useState(false)
   const [passFocus, setPassFocus] = useState(false)
   const [emailFocus, setEmailFocus] = useState(false)



   const emailAuthHandler = async () => {
      setError(null)
      setIsLoading(true);
      try {
         await dispatch(userActions.auth(email, password, rememberMe, !isLogin));
      } catch(err) {
         setError(err.errorMessage);
         console.log('error catch')
      }
      setIsLoading(false);
   }

   const rememberPressHandler = () => {
      setRememberMe(state => !state)
   }


   const checkIcon = rememberMe ? "checkbox-marked-outline" : "checkbox-blank-outline"

   let Touchable = TouchableOpacity;
   if(Platform.OS = 'android' && Platform.Version >= 21){
      Touchable = TouchableNativeFeedback;
   }

   let inputStylePass = styles.input;
   let inputStyleEmail = styles.input;
   if(passFocus){ inputStylePass = {...inputStylePass, ...styles.inputFocus}}
   if(emailFocus){ inputStyleEmail = {...inputStyleEmail, ...styles.inputFocus}}
   return (
      <View style={styles.screen}>
         <View style={styles.switchContainer}>
            <Touchable>
               <Text 
               style={styles.switch}
               onPress={() => setIsLogin(previousState => !previousState)}>
                  {isLogin ? "Sign-up" : 'Login'}
               </Text>
            </Touchable>
         </View>
         <View style={{alignItems:'center', justifyContent: 'center',
         height: 80}}><Text>Welcome. Logo will go here</Text></View>
         <View style={styles.authContainer}>
            <Text style={styles.topText}>{!isLogin ? "Create a New Account!" : 'Welcome Back!!!'}</Text>
            <TextInput 
               placeholder="Email" 
               value={email}
               placeholderTextColor={Colors.primary}
               onChangeText={(text) => setEmail(text)}
               style={inputStyleEmail}
               onFocus={() => {setEmailFocus(true)}}
               onBlur={() => {setEmailFocus(false)}}/>
            <TextInput 
               placeholder="Password" 
               maxLength={32}
               secureTextEntry={true}
               placeholderTextColor={Colors.primary}
               value={password}
               onChangeText={(text) => setPassword(text)}
               style={inputStylePass}
               onFocus={() => {setPassFocus(true)}}
               onBlur={() => {setPassFocus(false)}}
               />
            <View style={styles.rememberMe}>
               <Text style={styles.rememberText}>Remember me</Text>
               <MaterialCommunityIcons 
                  name={checkIcon} 
                  size={24} 
                  color={rememberMe ? Colors.accent : Colors.light} 
                  onPress={() => {rememberPressHandler()}}/>
            </View>
            <Text>{error}</Text>
            <View style={styles.authButton}>
               <Text 
               style={styles.authButtonText}
               onPress={() => emailAuthHandler()}>
                  {isLogin ? "Login" : 'Register'}
               </Text>
            </View>
         </View>
      </View>
   )
}

export default AuthScreen

const styles = StyleSheet.create({
   screen: {
      flex:1,
      paddingVertical: 40,
      paddingHorizontal:20,
      backgroundColor: Colors.primary
   },
   switchContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'flex-end'
   },
   switch: {
      fontFamily: 'open-sans',
      fontSize: 16,
      color: Colors.light,
   },
   authContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   topText: {
      fontFamily:'open-sans-bold',
      color: Colors.accent,
      fontSize: 18,
      paddingVertical: 18
   },
   input: {
      backgroundColor:Colors.light,
      color: Colors.dark,
      width: '70%',
      padding: 8,
      fontSize: 16,
      marginVertical: 5,
      borderRadius:5
   },
   inputFocus:{
      borderColor: Colors.accent,
      borderWidth: 2
   },
   rememberMe: {
      width:'70%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginVertical: 5
   },
   rememberText: {
      fontFamily: 'open-sans',
      fontSize: 14,
      color: Colors.light
   },
   authButton: {
      marginTop: 10,
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: Colors.primary,
      borderColor: Colors.accent,
      borderWidth: 1,
      borderRadius: 5
   },
   authButtonText: {
      color: Colors.accent,
      fontSize: 16
   }
})
