import React , {useState, useEffect , useCallback} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import SettingsSwitch from '../../components/UI/SettingsSwitch';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../shop/actions/userActions';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { DarkColors, LightColors } from '../../constants/Theme';
import DangerButton from '../../components/UI/DangerButton'

const ProfileScreen = (props) => {
   const dispatch = useDispatch();
   const switchState = useSelector(state => state.user.switchData)
   const darkModeFromRedux = switchState.darkMode;
   const userId = useSelector(state => state.user.userData.uid)
   const [darkMode, setDarkMode] = useState();
   const [cardMode, setCardMode] = useState();
   const [imageInCardView, setImageInCardView] = useState();


   useEffect(() => {
      setCardMode(switchState.cardMode)
      setImageInCardView(switchState.imageInCardView)
      setDarkMode(switchState.darkMode)
   }, [])

   const buttonColor = darkModeFromRedux ? DarkColors.primary : LightColors.light
   useEffect(() => {
      props.navigation.setOptions({
         headerRight: () => (
               <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item 
                  buttonStyle={{...styles.headerButton,...{color:buttonColor}}}
                  title="Save" 
                  iconName = 'save'
                  onPress = {()=>{saveButtonHandler()}}/>
               </HeaderButtons>
         )
      })
      
   }, [cardMode, darkMode, imageInCardView]);

   useFocusEffect(
      useCallback(() => {
         setCardMode(switchState.cardMode)
         setImageInCardView(switchState.imageInCardView)
         setDarkMode(switchState.darkMode)
      }, [switchState])
   );

   const saveButtonHandler = () => {
      dispatch(userActions.storeSwitches({
         darkMode: darkMode,
         cardMode: cardMode,
         imageInCardView: imageInCardView
      }, userId))
      props.navigation.navigate('AllItems')
   }

   const switchChangeHandler = (switchName) => {
      switch(switchName){
         case 'darkMode':
            setDarkMode(previousState => !previousState)
            break;
         case 'cardMode':
            setCardMode(previousState => !previousState)
            break;
         case 'imageInCardView':
            setImageInCardView(previousState => !previousState)
            break;
         default: break;
      }
   }

   const logoutHandler = () => {
      dispatch(userActions.logout())
   }
   const screenStyle = darkModeFromRedux ? styles.screenDark : styles.screenLight 
   return (
      <ScrollView style={{...styles.screen, ...screenStyle}}>
         
         <Text style={styles.category}>Settings</Text>
         <SettingsSwitch 
            text='Card view'
            value={cardMode}
            onValueChange={() => switchChangeHandler('cardMode')}
            hint="Car view will display 2 column items with image. Disabling with display 1 column items with no image"
            />
         <SettingsSwitch 
            text='Show image in Card view'
            value={imageInCardView}
            onValueChange={() => switchChangeHandler('imageInCardView')}
            />
         <SettingsSwitch 
            text='Dark Mode'
            value={darkMode}
            onValueChange={() => switchChangeHandler('darkMode')}
            hint="When changing this, some items may display the wrong color. Please restart the app if this happens"
            />
         <Text style={styles.category}>User</Text>
         <DangerButton 
            onPress={() => logoutHandler()}
            text="Log Out"
            />
         <Text style={styles.category}>Privacy Policy</Text>
      </ScrollView>
   )
}

export default ProfileScreen

const styles = StyleSheet.create({
   screen: {
      flex:1,
      paddingTop: 30,
      paddingHorizontal: 35
   },
   screenDark: {
      backgroundColor: DarkColors.dark
   },
   screenLight: {
      backgroundColor: LightColors.light
   },
   category: {
      fontFamily: 'open-sans-bold',
      fontSize: 18,
      color: Colors.dark,
      marginBottom: 10,
      marginTop: 10,
      paddingLeft: 10,
      paddingBottom: 10,
      borderBottomColor: Colors.accent,
      borderBottomWidth: 1
   }
})

export const profileOptions = navData => {
   return {
      headerTitle: 'Profile',
      
   }
}
