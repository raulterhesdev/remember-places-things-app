import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const CardButton = (props) => {
   return (
      <TouchableNativeFeedback style={styles.icon} >
            <MaterialCommunityIcons name={props.iconName} size={props.size} color={props.color} />
      </TouchableNativeFeedback>
   )
}

export default CardButton

const styles = StyleSheet.create({

})
