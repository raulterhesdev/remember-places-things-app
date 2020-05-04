export const SET_EDIT_ITEM = 'SET_EDIT_ITEM';

export const setEditItem = (id, title, description, location, imagePath, color, userID ) => {
   return dispatch => {
      dispatch({
         type: SET_EDIT_ITEM,
         itemData: {
            id,
            title,
            description,
            location,
            imagePath,
            color,
            userID
         }
      })
   }
}
