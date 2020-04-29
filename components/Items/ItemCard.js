import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Platform, Image } from 'react-native'
import  Colors  from '../../constants/Colors'

import CardButton from '../UI/CardButton';



const ItemCard = (props) => {
   let Touchable = TouchableOpacity;
   if(Platform.OS = 'android' && Platform.Version >= 21){
      Touchable = TouchableNativeFeedback;
   }
   return (
      <View style={styles.card}>
         <Touchable style={styles.touch} onPress={props.cardPress}>
            <View>
            <View style={styles.details}>
               <View style={styles.imageContainer}>
                  <Image 
                     source={{uri: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'}}
                     style={styles.image}/>
               </View>
               <View style={styles.markers}>
                  <CardButton iconName='pin' size={16} color={Colors.accent} />
                  <CardButton iconName='text' size={16} color={Colors.accent}/>
                  <CardButton iconName='calendar-alert' size={16} color={Colors.accent} />
                  
               </View>
            </View>
            <View style={styles.titleContainer}>
               <Text style={styles.title}>{props.title}</Text>
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
      borderRightWidth: 4,
      borderRightColor: Colors.accent
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
