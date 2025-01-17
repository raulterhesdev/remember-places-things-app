import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Colors from '../../constants/Colors';
import MapPreview from './MapPreview';

const LocationSelector = (props) => {
   const [location, setLocation] = useState();

   const {onLocationPicked, editMode, currentLocation} = props;
   const routeParams = props.route.params ? props.route.params : {};
   const pickedLocation = routeParams ? routeParams.pickedLocation: null;

   useEffect(() => {
      if(pickedLocation){
         setLocation(pickedLocation);
         onLocationPicked(pickedLocation)
      }
   }, [pickedLocation, onLocationPicked])

   useEffect(() => {
      if(editMode === true)
         setLocation(currentLocation)
   })
   
   return (
      
      <View style={styles.location}>
         <MapPreview 
            location={location} 
            style={styles.mapPreview} 
            onPress={props.mapPicker}
         >
         <Text style={styles.text}>No location chosen yet! </Text>
         <Text style={styles.text}>Click Here to Open the Map! </Text>
         </MapPreview>
      </View>
      
   )
}

export default LocationSelector

const styles = StyleSheet.create({
   location: {
      width: '100%',
      marginTop: 15
   },
   buttonContainer: {
      marginVertical: 5,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   btnView: {
      overflow: 'hidden',
      marginBottom: 10,
      borderRadius: 15
   },
   button: {
      borderWidth: 1,
      borderColor:Colors.primary,
      backgroundColor: Colors.light,
      paddingHorizontal: 20,
      alignItems: 'center',
   },
   mapPreview: {
      marginBottom: 10,
      width: '100%',
      height: 200,
      borderColor: Colors.primary,
      borderWidth: 1,
      borderRadius: 15,
      overflow: 'hidden'
   },
   text:{
      fontFamily: 'open-sans',
      color: Colors.primary
   }
})
