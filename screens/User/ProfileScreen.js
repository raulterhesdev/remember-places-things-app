import React , {useState} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { HeaderButtons, Item }from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';

import Colors from '../../constants/Colors';
import SettingsSwitch from '../../components/UI/SettingsSwitch';

const AllItemsScreen = (props) => {
   const [darkMode, setDarkMode] = useState(false);
   const [complexView, setComplexView] = useState(true);
   const [cloudStorage, setCloudStorage] = useState(true);
   return (
      <ScrollView style={styles.screen}>
         <Text style={styles.category}>User</Text>
         <Text style={styles.category}>Layout</Text>
         <SettingsSwitch 
            text='Complex view'
            value={complexView}
            onValueChange={() => setComplexView(previousState => !previousState)}
            hint="Complex view will display image and small icons for each item. Simple view shall only display the title"
            />
         <Text style={styles.category}>Color Scheme</Text>
         <SettingsSwitch 
            text='Dark Mode'
            value={darkMode}
            onValueChange={() => setDarkMode(previousState => !previousState)}
            />
         <Text style={styles.category}>Storage</Text>
         <SettingsSwitch 
            text='Cloud/Local Storage'
            value={cloudStorage}
            onValueChange={() => setCloudStorage(previousState => !previousState)}
            hint="If checked items shall be stored on our servers so you can access them on multiple devices. If not we will only store the data on this device"
            />
         <Text style={styles.category}>Privacy Policy</Text>
      </ScrollView>
   )
}

export default AllItemsScreen

const styles = StyleSheet.create({
   screen: {
      flex:1,
      marginTop: 30,
      marginHorizontal: 35
   },
   category: {
      fontFamily: 'open-sans-bold',
      fontSize: 18,
      color: Colors.dark,
      marginBottom: 25,
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
