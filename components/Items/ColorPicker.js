import React from 'react'
import { StyleSheet, Picker, View, Text } from 'react-native'
import ColorPalette from 'react-native-color-palette'

import PickerColors from '../../constants/PickerColors'

const ColorPicker = (props) => {

   const PickerColorsArray = [];
   for (const color in PickerColors) {
      PickerColorsArray.push(PickerColors[color])
   }

   return (
   <View style={styles.container}>
      <ColorPalette
         onChange={color => props.onChangeColor(color)}
         defaultColor={props.colorValue}
         colors={PickerColorsArray}
         title={""}
         icon={<Text>✔</Text>}
      />
   </View>
   )
}

export default ColorPicker

const styles = StyleSheet.create({
   container: {
      alignItems: 'center'
   }
})
