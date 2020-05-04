import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Platform, Image } from 'react-native'
import { useSelector } from 'react-redux';

import  Colors  from '../../constants/Colors'

import CardButton from '../UI/CardButton';

//Shall be edited later to provide a better look


const ItemCard = (props) => {
   const individualItem = useSelector(state => state.items.items).filter(item => item.id === props.id)[0];
   let itemColor;
   itemColor = individualItem.color;
   let Touchable = TouchableOpacity;
   if(Platform.OS = 'android' && Platform.Version >= 21){
      Touchable = TouchableNativeFeedback;
   }
   return (
      <View style={{...styles.card, ...{borderRightColor: itemColor}}}>
         <Touchable style={styles.touch} onPress={props.cardPress}>
            <View>
            <View style={styles.details}>
               {individualItem.imageUri ? <View style={styles.imageContainer}>
                  <Image 
                     source={{uri: individualItem.imageUri}}
                     style={styles.image}/>
               </View> : null}
               <View style={styles.markers}>
                  {individualItem. location ? <CardButton iconName='pin' size={16} color={itemColor} /> : null}
                  {individualItem.description ? <CardButton iconName='text' size={16} color={itemColor}/> : null}
                  {individualItem.reminderDate ? <CardButton iconName='calendar-alert' size={16} color={itemColor} /> : null}
               </View>
            </View>
            <View style={styles.titleContainer}>
               <Text style={styles.title}>{individualItem.title}</Text>
            </View>
            </View>
         </Touchable>
      </View>
         
         

   )
}

export default ItemCard

const styles = StyleSheet.create({
   card: {
      flex:1,
      marginVertical: 8,
      marginHorizontal: 5,
      backgroundColor: Colors.light,
      elevation: 10,
      borderRightWidth: 10,
      
   },

   details: {
      flex: 1,
      flexDirection: 'row',
      padding: 10
   },
   imageContainer: {
      padding: 5
   },
   image: {
      width: 100,
      height: 100,
      borderRadius: 10,
   },
   markers: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingLeft: 5
   },
   titleContainer: {
      flex: 1,
      padding: 10
   },
   title:{
      fontFamily: 'open-sans-bold',
      textAlign: 'right',
      color: Colors.dark
   }
})
