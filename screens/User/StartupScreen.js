import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Colors from '../../constants/Colors'
import { useDispatch } from 'react-redux'

import * as userActions from '../../shop/actions/userActions'

const StartupScreen = (props) => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(userActions.autoLogin())
   }, [dispatch])
   return (
      <View style={styles.screen}>
         <ActivityIndicator size="large" color={Colors.primary}/>
      </View>
   )
}

export default StartupScreen

const styles = StyleSheet.create({
   screen:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
   }
})
