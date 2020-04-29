import React from 'react'
import { StyleSheet, Text, View , Switch} from 'react-native'

import Colors from '../../constants/Colors';

const SettingsSwitch = (props) => {
   return (
      <View style={styles.layout}>
         <View style={styles.switchContainer}>
            <Text style={styles.switchText}>{props.text}</Text>
            <Switch
            trackColor={{ false: "#767577", true: Colors.accent }}
            thumbColor={Colors.primary}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={props.onValueChange}
            value={props.value}
            />
         </View>
         <Text style={styles.switchHint}>{props.hint}</Text>
      </View>
   )
}

export default SettingsSwitch

const styles = StyleSheet.create({
   layout: {
      marginBottom: 35
   },
   switchContainer: {
      width: '100%',
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   switchText: {
      fontFamily: 'open-sans',
      fontSize: 15
   },
   switchHint: {
      fontFamily: 'open-sans',
      fontSize: 13
   }
})
