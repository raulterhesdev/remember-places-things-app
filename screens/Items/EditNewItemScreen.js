import React, { useState, useEffect, useCallback  } from 'react'
import { StyleSheet, Button, View, Modal, Text } from 'react-native'

import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/Items/Input';
import ColorPicker from '../../components/Items/ColorPicker';
import Colors from '../../constants/Colors';
import LocationSelector from '../../components/Items/LocationSelector';
import { ScrollView } from 'react-native-gesture-handler';
import ImageSelector from '../../components/Items/ImageSelector'

const EditNewItem = (props) => {

   const routeParams = props.route.params ? props.route.params : {};
   let editMode = routeParams.editMode ? routeParams.editMode : null;
   let editTitle = routeParams.title ? routeParams.title : null;
   let editId = routeParams.id ? routeParams.id : null;

   const [modalVisible, setModalVisible] = useState(false)

   const [title, setTitle] = useState(editTitle)
   const [description, setDescription] = useState('')
   const [color, setColor] = useState('')
   const [location, setLocation] = useState()
   const [imagePath, setImagePath] = useState()

   const onTextChangeHandler = (text) => {
      setTitle(text);
   }
   const onDescriptionChangeHandler = (text) => {
      setDescription(text);
   }
   const onColorChangeHandler = (color) => {
      setColor(color);
   }
   const locationPickedHandler = useCallback((location) => {
      setLocation(location);
   },[]);

   const imageTakenHandler = imagePath => {
      setImagePath(imagePath);
   }
   
   useEffect(() => {
      props.navigation.setParams({color: color});
      props.navigation.setOptions({
         headerRight: () => (
            <View style={{flexDirection:'row'}}>
               <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item 
                  buttonStyle={styles.headerButton}
                  title="Color" 
                  iconName = 'color-lens'
                  onPress = {() => {setModalVisible(true)}}/>
               </HeaderButtons>
               <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item 
                  buttonStyle={styles.headerButton}
                  title="Save" 
                  iconName = 'save'
                  onPress = {() => {
                     //TO DO: Add save button function here
                  }}/>
               </HeaderButtons>
            </View>
         )
      })
      
   }, [setModalVisible, color]);
   
   return (
      <ScrollView>
         <View style={styles.screen}>
            <Modal
               animationType="fade"
               transparent={true}
               visible={modalVisible}>
               <View style={styles.modal}>
                  <Text style={styles.close} onPress={() => {setModalVisible(false)}}>x</Text>
                  <ColorPicker 
                     onChangeColor={onColorChangeHandler}
                     colorValue={color}/>
                  <View style={styles.buttonContainer}>
                     <Button 
                     title="Reset" 
                     color={Colors.accent}
                     onPress={() => {
                        setColor();
                        setModalVisible(false)
                        }}/>
                     <Button 
                     title="Save"
                     color={Colors.primary} 
                     onPress={() => {setModalVisible(false)}}/>
                  </View>
               </View>
            </Modal>
            <Input 
            label='Title'
            value={title}
            onChangeText={(text) => onTextChangeHandler(text)}/>
            <Input 
            label='Description'
            value={description}
            multiline={true}
            onChangeText={(text) => onDescriptionChangeHandler(text)}/>
            <ImageSelector 
            onImageTaken={imageTakenHandler} />
            <LocationSelector 
            navigation={props.navigation}
            route={props.route}
            onLocationPicked={locationPickedHandler}/>
         </View>
      </ScrollView>
   )
}

export default EditNewItem

const styles = StyleSheet.create({
   screen: {
      flex:1,
      alignItems:'center',
      padding: 20
   },
   modal: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
   },
   buttonContainer: {
      marginVertical: 10,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   close: {
      color: '#888',
      alignSelf: 'flex-end',
      marginRight: -25,
      marginTop: -30,
      fontSize: 16,
      padding: 10
   },
   headerButton: {
      padding: 5,
      borderRadius: 8
   },
   
})

export const editNewOptions = navData => {
   const routeParams = navData.route.params ? navData.route.params : {};
   let bgColor = routeParams.color ? routeParams.color : Colors.accent;
   let editMode = routeParams.editMode ? routeParams.editMode : null;
   return {
      headerTitle: editMode ? 'Edit' : 'Add new item',
      headerStyle: {
         backgroundColor: bgColor
      },
   }
}