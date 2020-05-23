import React from 'react'
import { StyleSheet, Text, View , Platform} from 'react-native'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler'
import  Colors  from '../../constants/Colors';

const DangerButton = (props) => {
   let Touchable = TouchableOpacity;
   if(Platform.OS = 'android' && Platform.Version >= 21){
      Touchable = TouchableNativeFeedback;
   }
   return (
      <View style={styles.btnContainer}>
         <Touchable onPress={props.onPress}>
         <View style={{...props.style,...styles.button}}>
            <Text style={styles.text}>{props.text}</Text>
         </View>
      </Touchable>
      </View>
   )
}

export default DangerButton

const styles = StyleSheet.create({
   btnContainer: {
      marginTop: 20,
      borderRadius: 5,
      overflow: 'hidden',
      
   },
   button: {
      borderRadius: 5,
      elevation: 5,
      paddingVertical: 15,
      paddingHorizontal: 45,
      backgroundColor: Colors.primary,
      
   },
   text: {
      fontFamily: 'open-sans-bold',
      color: 'white',
      textAlign: 'center',
      color: Colors.accent
   }
})
