import React, {useState, useEffect} from 'react'
import { StyleSheet, View , Alert} from 'react-native'
import Colors from '../../constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ButtonIconText from './ButtonIconText';

const ImageSelector = (props) => {
   const [image, setImage] = useState()
   const {onImageTaken, editMode, currentImage} = props;

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
      onImageTaken(image.uri);
   }

   useEffect(() => {
      if(editMode === true)
         setImage(currentImage)
   })

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
   buttonContainer: {
      marginVertical: 10,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between'
   }
})
