import React from 'react'
import { StyleSheet, Text, View , Switch} from 'react-native'

import Colors from '../../constants/Colors';
import { useSelector } from 'react-redux';
import { DarkColors, LightColors } from '../../constants/Theme';

const SettingsSwitch = (props) => {
   const darkMode = useSelector(state => state.user.switchData.darkMode)
   const textStyle = darkMode ? styles.textDark : styles.textLight
   return (
      <View style={styles.layout}>
         <View style={styles.switchContainer}>
            <Text style={{...styles.switchText,...textStyle}}>{props.text}</Text>
            <Switch
            trackColor={{ false: "#767577", true: Colors.accent }}
            thumbColor={Colors.primary}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={props.onValueChange}
            value={props.value}
            />
         </View>
         {props.hint ? <Text style={{...styles.switchHint,...textStyle}}>{props.hint}</Text> : null}
      </View>
   )
}

export default SettingsSwitch

const styles = StyleSheet.create({
   layout: {
      marginBottom: 15
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
   textDark: {
      color: DarkColors.white
   },
   textLight: { 
      color: LightColors.dark
   },
   switchHint: {
      fontFamily: 'open-sans',
      fontSize: 13
   }
})
