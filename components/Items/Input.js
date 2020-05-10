import React, { useState } from 'react'
import { StyleSheet, Text, View , TextInput} from 'react-native'
import  Colors  from '../../constants/Colors';
import {DarkColors, LightColors} from '../../constants/Theme';
import { useSelector } from 'react-redux';

const Input = (props) => {
   const [focus, setFocus] = useState(false);
   const darkMode =  useSelector(state => state.user.switchData.darkMode)

   let inputStyle = {
      ...focus ? styles.inputFocused : styles.input
   }
   inputStyle = {...inputStyle, ...darkMode ? styles.inputDark : styles.inputLight}
   return (
      <View style={styles.inputContainer}>
         <Text style={styles.label}>{props.label}</Text>
         <TextInput 
         style={inputStyle}
         value={props.value}
         onChangeText={props.onChangeText}
         placeholder= {props.label}
         placeholderTextColor={darkMode ? DarkColors.primary : LightColors.primary}
         multiline={props.multiline}
         onFocus={() => {setFocus(true)}}
         onBlur={() => {setFocus(false)}}
         />
         {props.error && <Text style={styles.error}>{props.errorMessage}</Text>}
      </View>
   )
}

export default Input

const styles = StyleSheet.create({
   inputContainer: {
      minHeight: 50,
      width: '80%',

   },
   label:{
      fontFamily:'open-sans-bold',
      fontSize: 16,
      textAlign: 'center',
      color: Colors.primary

   },
   input:{
      borderColor: Colors.primary,
      borderWidth: 1,
      borderRadius: 10,
      padding: 15,
      marginBottom: 1
   },
   inputFocused:{
      borderColor: Colors.accent,
      borderWidth: 2,
      borderRadius: 10,
      padding: 15,
      
   },
   inputLight: {
      color: LightColors.dark
   },
   inputDark: {
      color: DarkColors.white
   },
   error: {
      color: 'red',
      fontFamily: 'open-sans'
   }
})
