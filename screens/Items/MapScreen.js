import React, { useState , useEffect, useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, {Marker} from 'react-native-maps';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import HeaderButton from '../../components/UI/HeaderButton';



const MapScreen = (props) => {
   const routeParams = props.route.params ? props.route.params : {};
   // const readonly = props.navigation.getParam('readonly');
   
   let initialMapRegion = {
      latitude: 37.7,
      longitude: -122.43,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
   }
   const [selectedLocation, setSelectedLocation] = useState();
   const [mapRegion, setMapRegion] = useState(initialMapRegion);

   const onRegionChangeHandler = (region) => {
      setMapRegion(region);
   }

   const verifyPermissions = async () => {
      const result = await Permissions.askAsync(Permissions.LOCATION);

      if(result.status !== 'granted') {
         Alert.alert('Insufficient Permissions', 'You need to grant location permissions to use this app', [{text: 'OK'}]);
         return false;
      }
      return true;
   }

   const getLocationHandler = useCallback(async () => {
      const hasPermission = await verifyPermissions();
      if(!hasPermission) {
         return;
      }

      try {
         const location = await Location.getCurrentPositionAsync({
            timeout: 5000,
            enableHighAccuracy: true,

         });
         setSelectedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
         });
         setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
         })
         
      } catch (err){
         Alert.alert('Error fetching location', 'Please Try again later or pick a location on the map', [{text: 'OK'}])
      }
   },[setSelectedLocation])

   const selectLocationHandler = (event) => {
      // if(readonly) {
      //    return;
      // }
      setSelectedLocation({
         lat:event.nativeEvent.coordinate.latitude,
         lng:event.nativeEvent.coordinate.longitude
      })
   }

   const saveLocationHandler = useCallback(() => {
      if(!selectedLocation) {
         //show alert
         return;
      }
      props.navigation.navigate('EditNewItem', {pickedLocation: selectedLocation});
   }, [selectedLocation])

   useEffect(() => {
      getLocationHandler();
      
   }, [getLocationHandler])

   useEffect(() => {
      props.navigation.setOptions({
         headerRight:() => <View style={{flexDirection:'row',marginRight:10}}>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
               <Item 
               buttonStyle={styles.headerButton}
               title="Color" 
               iconName = 'my-location'
               onPress = {getLocationHandler}
               />
            </HeaderButtons>
            <TouchableOpacity style={styles.headerButton} onPress={saveLocationHandler}>
               <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
         </View>
      })
      
   }, [saveLocationHandler, getLocationHandler]);

   let markerCoordinates;

   if(selectedLocation) {
      markerCoordinates = {
         latitude: selectedLocation.lat,
         longitude: selectedLocation.lng
      }
   }
   return (
      <MapView 
         region={mapRegion} 
         onRegionChangeComplete={onRegionChangeHandler}
         style={styles.map}
         onPress={selectLocationHandler}
         >
         {markerCoordinates &&<Marker title="Picked Location" coordinate={markerCoordinates}></Marker>}
      </MapView>
   )
}

export default MapScreen

const styles = StyleSheet.create({
   map: {
      flex: 1
   },
   headerButton: {
      marginHorizontal: 20,
   },
   headerButtonText: {
      fontSize: 16,
      color: 'white'
   },
   headerButton: {
      padding: 5,
      borderRadius: 8
   },
})

