import React, {useState} from 'react'
import { StyleSheet, Text, View , Button, Image, Alert} from 'react-native'
import Colors from '../../constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ButtonIconText from './ButtonIconText';

const ImageSelector = (props) => {

   const [image, setImage] = useState()
   const verifyPermissions = async () => {
      const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

      if(result.status !== 'granted') {
         Alert.alert('Insufficient permissions', 'You need to grant camera permissions to use this app', [{text: 'OK'}]);
         return false;
      }
      return true;
   }

   const takeImageHandler = async () => {
      const hasPermissions = await verifyPermissions();

      if(!hasPermissions){
         return;
      }

      const image = await ImagePicker.launchCameraAsync({
         allowsEditing: true,
         quality: 0.5
      });

      setImage(image.uri);
      props.onImageTaken(image.uri);
   }

   const galleryHandler = async () => {
      const hasPermissions = await verifyPermissions();

      if(!hasPermissions){
         return;
      }

      const image = await ImagePicker.launchImageLibraryAsync({
         allowsEditing: true,
         quality: 0.5
      })

      setImage(image.uri);
      props.onImageTaken(image.uri);
   }

   return (
      <View style={styles.imagePicker}>
         <View style={styles.buttonContainer}>
            <ButtonIconText 
               iconTitle="camera"
               color={Colors.primary}
               onPress={takeImageHandler}
               text="Open Camera"
               />
            <ButtonIconText 
               iconTitle="image"
               color={Colors.primary}
               onPress={galleryHandler}
               text="Open Gallery"
               />
         </View>
         <View style={styles.imagePreview}>
            {!image
            ? <Text style={styles.text}>No image picked yet</Text>
            : <Image style={styles.image} source={{uri: image}}/>
            }
         </View>
      </View>
   )
}

export default ImageSelector

const styles = StyleSheet.create({
   imagePicker: {
      width: '90%',
      alignItems: 'center',
      marginBottom:5
   },
   imagePreview: {
      width: '100%',
      height:200,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#ccc',
      borderWidth: 1
   },
   image: {
      width: '100%',
      height:'100%'
   },
   buttonContainer: {
      marginVertical: 10,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   text:{
      fontFamily: 'open-sans',
      color: Colors.primary
   }
})
