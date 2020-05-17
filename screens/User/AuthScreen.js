import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'

import * as userActions from '../../shop/actions/userActions';
import { useDispatch } from 'react-redux';

import {MaterialCommunityIcons} from '@expo/vector-icons'
import Colors from '../../constants/Colors';


const AuthScreen = () => {
   const dispatch = useDispatch();
   const [isLogin, setIsLogin] = useState(true)
   const [email, setEmail] = useState('raulterhes0013@gmail.com')
   const [password, setPassword] = useState('123456')
   const [rememberMe, setRememberMe] = useState(false)


   const emailAuthHandler = async () => {
      let action;
      if(!isLogin){
         action = userActions.signUp(email,password,rememberMe);
      }else{
         action = userActions.login(email,password, rememberMe);
      }
      // setError(null)
      // setisLoading(true);
      try {
         await dispatch(action);
      } catch( err) {
         // setError(err.message);
         // setisLoading(false);
         console.log(err)
      }
   }

   const rememberPressHandler = () => {
      setRememberMe(state => !state)
   }

   const checkIcon = rememberMe ? "checkbox-marked-outline" : "checkbox-blank-outline"
   return (
      <View style={styles.screen}>
         <Button 
         title={isLogin ? "Switch To Sign-up" : 'Switch To Login'}
         color={isLogin ? "blue" : 'orange'}
         onPress={() => setIsLogin(previousState => !previousState)}/>
         <Text>{isLogin ? "Login" : 'Sign-up'}</Text>
         <TextInput placeholder="" 
         value={email}
         onChangeText={(text) => setEmail(text)}
         style={styles.input}/>
         <TextInput placeholder="" 
         value={password}
         onChangeText={(text) => setPassword(text)}
         style={styles.input}/>
         <View style={styles.rememberMe}>
            <Text>Remember me</Text>
            <MaterialCommunityIcons name={checkIcon} size={24} color={Colors.primary} 
            onPress={() => {rememberPressHandler()}}/>
         </View>
         <Button 
         title={isLogin ? "Login" : 'Sign-up'}
         color={isLogin ? "blue" : 'orange'}
         onPress={() => emailAuthHandler()}
         />
      </View>
   )
}

export default AuthScreen

const styles = StyleSheet.create({
   screen: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
   },
   input: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      padding: 5,
      marginBottom: 10,
      minWidth: 200
   },
   rememberMe: {
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'center'
   }
})
