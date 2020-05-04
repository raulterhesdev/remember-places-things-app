import React, { useState, useEffect  } from 'react'
import { StyleSheet, Button, View, Modal, Text, Image} from 'react-native'
import {useDispatch, useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import { ScrollView } from 'react-native-gesture-handler';

import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/Items/Input';
import ColorPicker from '../../components/Items/ColorPicker';
import Colors from '../../constants/Colors';
import PickerColors from '../../constants/PickerColors';
import LocationSelector from '../../components/Items/LocationSelector';
import ImageSelector from '../../components/Items/ImageSelector'

import * as itemsActions from '../../shop/actions/itemActions';


const EditNewItem = (props) => {
   const dispatch = useDispatch();

   const routeParams = props.route.params ? props.route.params : {};
   let editMode = routeParams.editMode ? routeParams.editMode : null;
   const editItem = useSelector(state => state.temp.editItem);

   const [modalVisible, setModalVisible] = useState(false)

   const [title, setTitle] = useState('')
   const [description, setDescription] = useState('')
   const [location, setLocation] = useState()
   const [imagePath, setImagePath] = useState()
   const [color, setColor] = useState(PickerColors.default)

   const [titleTouched, setTitleTouched] = useState(false)

   useEffect(() => {
      if(editMode) {
         setTitle(editItem.title);
         setDescription(editItem.description);
         setLocation(editItem.location);
         setImagePath(editItem.imagePath);
         setColor(editItem.color)
      }
   },[editItem])

   
   const onTextChangeHandler = (inputTitle) => {
      setTitle(inputTitle);
      setTitleTouched(true);
   }
   const onDescriptionChangeHandler = (text) => {
      setDescription(text);
   }
   const onColorChangeHandler = (clr) => {
      setColor(clr);

   }
   const locationPickedHandler = (loc) => {
      setLocation(loc);
   };

   const imageTakenHandler = imagePth => {
      setImagePath(imagePth);
   }

   const saveButtonHandler = () => {
      if(titleTouched && title.length === 0){
         return
      }
      if(editMode){
         dispatch(itemsActions.editItem(title, description, location, imagePath, color, 'userID', editItem.id))
      } else {
         dispatch(itemsActions.addItem(title, description, location, imagePath, color, 'userID'))
      }
      props.navigation.navigate('AllItems');
      setTitle('');
      setTitleTouched(false);
      setLocation();
      setDescription('');
      setImagePath();
      setColor();
   }

   const pickOnMapHandler = () => {
      props.navigation.navigate('Map', {
         editMode: editMode, 
         editLocation: location
      });
   }

   

   useEffect(() => {
      props.navigation.setParams({color: color}); //this causes the dev warning.HAVE TO FIX
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
                  onPress = {()=>{saveButtonHandler()}}/>
               </HeaderButtons>
            </View>
         )
      })
      
   }, [setModalVisible, color, title, description, location, imagePath]);
   
   
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
                        setColor("");
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
            error={titleTouched && title.length === 0}
            errorMessage="Title cannot be empty. Please add a title"
            onChangeText={(inputText) => onTextChangeHandler(inputText)}/>
            <Input 
            label='Description'
            value={description}
            multiline={true}
            onChangeText={(text) => onDescriptionChangeHandler(text)}/>
            <ImageSelector 
            onImageTaken={imageTakenHandler} 
            currentImage={imagePath}
            editMode={editMode}
            />
            <View style={styles.imagePreview}>
            {!imagePath
            ? <Text style={styles.text}>No image picked yet</Text>
            : <Image style={styles.image} source={{uri: imagePath}}/>
            }
            </View>
            <LocationSelector 
            navigation={props.navigation}
            route={props.route}
            onLocationPicked={locationPickedHandler}
            currentLocation={location}
            editMode={editMode}
            mapPicker={pickOnMapHandler}
            />
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
   text:{
      fontFamily: 'open-sans',
      color: Colors.primary
   }
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