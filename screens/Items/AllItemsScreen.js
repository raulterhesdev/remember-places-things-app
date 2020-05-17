import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import * as itemActions from '../../shop/actions/itemActions'
import ItemCard from '../../components/Items/ItemCard';

import * as tempActions from '../../shop/actions/tempActions';
import {DarkColors, LightColors} from '../../constants/Theme';



const AllItemsScreen = (props) => {
   const dispatch = useDispatch();
   const allItems = useSelector(state => state.items.items);
   const switchData =  useSelector(state => state.user.switchData)
   const cardMode = switchData.cardMode;
   const darkMode = switchData.darkMode;
   const userId = useSelector(state => state.user.userData.uid)
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState()

   const loadItems = useCallback(async () => {
      setError(null);
      setIsLoading(true)
      try {
         await dispatch(itemActions.fetchItems(userId));
      } catch (err) {
         setError(err.message);
      }
      setIsLoading(false)
   },[dispatch, setIsLoading, setError]);

   useEffect(() => {
      setIsLoading(true);
      loadItems().then(() => setIsLoading(false));
   }, [dispatch, loadItems]);

   const onCardPressHandler = (item) => {
      dispatch(tempActions.setEditItem(item.id, item.title, item.description, item.location, item.imageUri, item.color, item.userID))
      props.navigation.navigate('EditNewItem',{editMode: true, item: item})
   }


   let screenStyle = darkMode ?  styles.screenDark : styles.screenLight
   let textColor = darkMode ? DarkColors.primary : LightColors.dark 
   return (
      <View style={{...screenStyle, ...styles.screen}}>
         <FlatList 
         key={cardMode ? 2 : 1}
         numColumns={cardMode ? 2 : 1}
         ListEmptyComponent={<Text style={{color: textColor}}>No items added. Start adding some</Text>}
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
      paddingHorizontal:20,
      paddingVertical: 10,
   },
   screenLight: {
      backgroundColor: LightColors.light
   },
   screenDark: {
      backgroundColor: DarkColors.light
   }
})

export const allItemsOptions = navData => {
   return {
      headerTitle: 'All Items',
   }
}
