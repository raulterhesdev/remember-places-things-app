import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import MyButton from '../UI/MyButton'

const ButtonIconText = (props) => {
   return (
      <View style={styles.btnView}>
         <MyButton 
         style={styles.button}
         onPress={props.onPress}>
            <MaterialIcons name={props.iconTitle} size={23} color={props.color}/>
            <Text style={styles.buttonText}>{props.text}</Text>
         </MyButton>
      </View>
   )
}

export default ButtonIconText

const styles = StyleSheet.create({
   btnView: {
      overflow: 'hidden',
      marginBottom: 10,
      borderRadius: 15
   },
   button: {
      borderWidth: 1,
      borderColor:Colors.primary,
      backgroundColor: Colors.light,
      paddingHorizontal: 20,
      alignItems: 'center',
   },
   buttonText: {
      color: Colors.primary,
      fontFamily: 'open-sans-bold'
   }
})
