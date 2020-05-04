import React, { useState } from 'react'
import { StyleSheet, Text, View , TextInput} from 'react-native'
import  Colors  from '../../constants/Colors';

const Input = (props) => {
   const [focus, setFocus] = useState(false);

   return (
      <View style={styles.inputContainer}>
         <Text style={styles.label}>{props.label}</Text>
         <TextInput 
         style={focus ? styles.inputFocused : styles.input}
         value={props.value}
         onChangeText={props.onChangeText}
         placeholder= {props.label}
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
      color: Colors.dark,
      marginBottom: 1
   },
   inputFocused:{
      borderColor: Colors.accent,
      borderWidth: 2,
      borderRadius: 10,
      padding: 15,
      backgroundColor: Colors.light,
      color: Colors.dark
   },
   error: {
      color: 'red',
      fontFamily: 'open-sans'
   }
})
