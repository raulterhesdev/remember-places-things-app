import React from 'react'
import { StyleSheet, Platform, View } from 'react-native'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler'

const MyButton = (props) => {
   let Touchable = TouchableOpacity;
   if(Platform.OS = 'android' && Platform.Version >= 21){
      Touchable = TouchableNativeFeedback;
   }
   return (
      
         <Touchable onPress={props.onPress}>
            <View style={{...props.style,...styles.button}}>
               {props.children}
            </View>
         </Touchable>
      
   )
}

export default MyButton

const styles = StyleSheet.create({
   button: {
      borderRadius: 15,
      elevation: 5,
      padding: 15
   }
})
