export const ADD_ITEM = 'ADD_ITEM';
export const LOAD_ITEMS = 'LOAD_ITEMS';
export const EDIT_ITEM = 'EDIT_ITEM';


export const addItem = (title, description, location, imageUri, color, userID) => {
   return dispatch => {
      dispatch({
         type:ADD_ITEM,
         itemData: {
            id: new Date(),
            title: title,
            description: description, 
            location: location,
            imageUri: imageUri,
            color: color,
            userID: userID
         }
      })
   }
}

export const editItem = (title, description, location, imageUri, color, userID, id) => {
   return dispatch => {
      dispatch({
         type:EDIT_ITEM,
         itemData: {
            id: id,
            title: title,
            description: description, 
            location: location,
            imageUri: imageUri,
            color: color,
            userID: userID
         }
      })
   }
}


export const loadItems = () => {
   return dispatch => {
      dispatch({
         type:LOAD_ITEMS
      })
   }
}