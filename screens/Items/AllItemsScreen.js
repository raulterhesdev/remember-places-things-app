import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import ItemCard from '../../components/Items/ItemCard';


import ITEMS from '../../dummy-data/dummy-data';



const AllItemsScreen = (props) => {
   const allItems = ITEMS;

   const onCardPressHandler = (id, title) => {
      props.navigation.navigate('EditNewItem',{editMode: true, id:id, title:title})
   }

   return (
      <View style={styles.screen}>
         <FlatList 
         numColumns={2}
         ListEmptyComponent={<Text>No items added. Start adding some</Text>}
         keyExtractor={item=>item.id}
         data={allItems} 
         renderItem={itemData => <ItemCard 
            title={itemData.item.title}
            cardPress={() => {onCardPressHandler(itemData.item.id, itemData.item.title)}}
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
