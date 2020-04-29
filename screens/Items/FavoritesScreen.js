import React from 'react'
import {StyleSheet,  Text, View } from 'react-native'

import { HeaderButtons, Item }from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';

const FavoritesScreen = () => {
   return (
      <View>
         <Text>FavoritesScreen</Text>
      </View>
   )
}

export default FavoritesScreen

const styles = StyleSheet.create({
   screen: {
      flex:1,
      justifyContent:'center',
      alignItems:'center'
   }
})

export const favoritesOptions = navData => {
   return {
      headerTitle: 'Favorites',
      
   }
}
