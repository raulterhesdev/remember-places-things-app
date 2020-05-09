import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Platform, Image } from 'react-native'
import { useSelector } from 'react-redux';

import  Colors  from '../../constants/Colors'

import CardButton from '../UI/CardButton';


const ItemCard = (props) => {
   const individualItem = useSelector(state => state.items.items).filter(item => item.id === props.id)[0];

   let itemColor;
   itemColor = individualItem.color;

   let Touchable = TouchableOpacity;
   if(Platform.OS = 'android' && Platform.Version >= 21){
      Touchable = TouchableNativeFeedback;
   }

   const switchData =  useSelector(state => state.user.switchData)
   const cardMode = switchData.cardMode;
   const imgInCardMode = switchData.imageInCardView;

   const showImage = individualItem.imageUri && cardMode && imgInCardMode;
   const markersWithImage = individualItem.imageUri && cardMode && imgInCardMode;
   return (
      <View style={{...styles.card, ...{borderRightColor: itemColor}}}>
         <Touchable onPress={props.cardPress}>
            <View style={styles.container}>
               <View style={{...styles.titleContainer, ...{borderColor: itemColor}}}>
                  <Text style={styles.title}>
                     {individualItem.title}
                     </Text>
               </View>
               <View style={styles.additionalContainer}>
                  <View style={styles.info}>
                     <View style={markersWithImage  ? styles.markersWithImage : styles.markersWithoutImage}>
                        {individualItem.location ? <CardButton iconName='pin' size={16} color={itemColor} /> : null}
                        {/* {individualItem.description ? <CardButton iconName='text' size={16} color={itemColor}/> : null} */}
                        {individualItem.imageUri && (!cardMode || !imgInCardMode) ? <CardButton iconName='image' size={16} color={itemColor} /> : null}
                        {/* {individualItem.reminderDate ? <CardButton iconName='calendar-alert' size={16} color={itemColor} /> : null} */}
                        </View>
                     </View>
                  {showImage ? <View style={styles.imageContainer}>
                     <Image 
                        source={{uri: individualItem.imageUri}}
                        style={styles.image}/>
                  </View> : null}
               </View>
               <View style={styles.descriptionContainer}>
                  <Text style={styles.description}
                     numberOfLines={3}>
                     {individualItem.description}
                  </Text>
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
   container: {
      flex:1, 
      paddingVertical: 8,
      paddingHorizontal: 12,
   },
   titleContainer: {
      alignItems: 'center',
      marginBottom: 5,
      borderBottomWidth: 1
   },
   title: {
      fontFamily: 'open-sans-bold'
   },
   descriptionContainer: {
      marginTop: 5,
      justifyContent: 'flex-end'
   },
   description:{
      fontFamily: 'open-sans'
   },
   additionalContainer: {
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   imageContainer: {
      flex: 1,
      alignItems: 'flex-end',
      marginRight: 10
   }, 
   imageContainer: {
      flex: 1,
      alignItems: 'flex-end',
      marginRight: 10
   },
   image: {
      width: 60,
      height: 60,
      borderRadius: 10,
   },
   info: {
      flex: 1
   },
   markersWithoutImage: {
      flex: 1,
      flexDirection:'row',
      justifyContent: 'space-evenly'
   },
   markersWithImage: {
      flex:1,
      justifyContent: 'space-evenly',
      alignItems: 'center'
   }
   // details: {
   //    flex: 1,
   //    flexDirection: 'row',
   //    padding: 10
   // },
   // imageContainer: {
   //    padding: 5
   // },
   // image: {
   //    width: 100,
   //    height: 100,
   //    borderRadius: 10,
   // },
   // markers: {
   //    flex: 1,
   //    justifyContent: 'space-around',
   //    alignItems: 'center',
   //    paddingLeft: 5
   // },
   // titleContainer: {
   //    flex: 1,
   //    padding: 10
   // },
   // title:{
   //    fontFamily: 'open-sans-bold',
   //    textAlign: 'right',
   //    color: Colors.dark
   // }
})
