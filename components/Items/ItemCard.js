import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Platform, Image } from 'react-native'
import { useSelector } from 'react-redux';

import  Colors  from '../../constants/Colors'
import {LightColors, DarkColors} from '../../constants/Theme';

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
   const darkMode = switchData.darkMode;

   const showImage = individualItem.imageUri && cardMode && imgInCardMode;
   const markersWithImage = individualItem.imageUri && cardMode && imgInCardMode;

   let cardStyle = darkMode ?  styles.cardDark : styles.cardLight
   let textStyle  = darkMode ?  styles.titleDark : styles.titleLight

   return (
      <View style={{...cardStyle, ...styles.card, ...{borderRightColor: itemColor}}}>
         <Touchable onPress={props.cardPress}>
            <View style={styles.container}>
               <View style={{...styles.titleContainer, ...{borderColor: itemColor}}}>
                  <Text style={{...styles.title,...textStyle}}>
                     {individualItem.title}
                     </Text>
               </View>
               <View style={styles.additionalContainer}>
                  <View style={styles.info}>
                     <View style={markersWithImage  ? styles.markersWithImage : styles.markersWithoutImage}>
                        {individualItem.location ? <CardButton iconName='map-marker-radius' size={18} color={itemColor} /> : null}
                        {/* {individualItem.description ? <CardButton iconName='text' size={16} color={itemColor}/> : null} */}
                        {individualItem.imageUri && (!cardMode || !imgInCardMode) ? <CardButton iconName='image' size={18} color={itemColor} /> : null}
                        {/* {individualItem.reminderDate ? <CardButton iconName='calendar-alert' size={16} color={itemColor} /> : null} */}
                        </View>
                     </View>
                  {showImage ? <View style={styles.imageContainer}>
                     <Image 
                        source={{uri: individualItem.imageUri}}
                        style={styles.image}/>
                  </View> : null}
               </View>
               {individualItem.description !== '' && <View style={styles.descriptionContainer}>
                  <Text style={{...styles.description,...textStyle}}
                     numberOfLines={3}>
                     {individualItem.description}
                  </Text>
               </View>}
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
      elevation: 10,
      borderRightWidth: 10,
   },
   cardDark: {
      backgroundColor: DarkColors.dark
   },
   cardLight: {
      backgroundColor: LightColors.light,
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
   titleDark:{
      color: DarkColors.white
   },
   titleLight:{
      color:'black'
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
})
