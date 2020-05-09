import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import ItemCard from '../../components/Items/ItemCard';

import * as tempActions from '../../shop/actions/tempActions';
import Colors from '../../constants/Colors';


const AllItemsScreen = (props) => {
   const dispatch = useDispatch();
   const allItems = useSelector(state => state.items.items);
   const switchData =  useSelector(state => state.user.switchData)
   const cardMode = switchData.cardMode;

   const onCardPressHandler = (item) => {
      dispatch(tempActions.setEditItem(item.id, item.title, item.description, item.location, item.imageUri, item.color, item.userID))
      props.navigation.navigate('EditNewItem',{editMode: true, item: item})
   }

   return (
      <View style={styles.screen}>
         <FlatList 
         key={cardMode ? 2 : 1}
         numColumns={cardMode ? 2 : 1}
         ListEmptyComponent={<Text>No items added. Start adding some</Text>}
         keyExtractor={item=>item.id}
         data={allItems} 
         renderItem={itemData => <ItemCard 
            id={itemData.item.id}
            cardPress={() => {onCardPressHandler(itemData.item)}}
            />}
         />
      </View>
   )
}

export default AllItemsScreen

const styles = StyleSheet.create({
   screen: {
      flex:1,
      marginHorizontal:20,
      marginVertical: 10
   }
})

export const allItemsOptions = navData => {
   return {
      headerTitle: 'All Items',
   }
}
