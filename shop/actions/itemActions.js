import ENV from '../../env';
import Item from '../../models/item';

export const ADD_ITEM = 'ADD_ITEM';
export const LOAD_ITEMS = 'LOAD_ITEMS';
export const EDIT_ITEM = 'EDIT_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';






export const addItem = (userID, title, description, location, imageUri, color ) => {
   return async dispatch => {
      try{
         const response = await fetch(`${ENV.databaseURL}/notes/${userID}.json`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
               title, description, location, imageUri, color, userID
            })
         });
   
         if(!response.ok){
            throw new Error ('Something Went Wrong');
         }

         const responseData = await response.json();

         dispatch({
            type:ADD_ITEM,
            itemData: {
               id: responseData.name,
               title: title,
               description: description, 
               location: location,
               imageUri: imageUri,
               color: color,
               userID: userID
            }
         })
      } catch (err) {
         
         throw err;
      } 
      
   }
}

export const editItem = (userID,title, description, location, imageUri, color, id) => {
   return async dispatch => {
      try{
         const response = await fetch(`${ENV.databaseURL}/notes/${userID}/${id}.json`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
               title, description, location, imageUri, color, userID
            })
         });
   
         if(!response.ok){
            throw new Error ('Something Went Wrong');
         }

         
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
      }catch(err){
         throw err;
      }
   }
}

export const deleteItem = (id, userID) => {
   return async dispatch => {
      try {
         const response = await fetch(`${ENV.databaseURL}/notes/${userID}/${id}.json`, {
            method: 'DELETE',
         });
   
         if(!response.ok){
            throw new Error ('Something Went Wrong');
         }
         dispatch({
            type:DELETE_ITEM,
            id: id,
         })
      } catch (err) {
         throw err
      }
   }
}


export const fetchItems = (userID) => {
   return async dispatch => {
      try {
         const response = await fetch(`${ENV.databaseURL}/notes/${userID}.json`);
         if(!response.ok){
            throw new Error ('Something Went Wrong');
         }
         const responseData = await response.json();
         const loadedItems = [];
         for(const key in responseData) {
            loadedItems.push(new Item(
               key, 
               responseData[key].title, 
               responseData[key].description, 
               responseData[key].location, 
               responseData[key].imageUri, 
               responseData[key].color, 
               responseData[key].userID)
               )
         }
         dispatch({
            type:LOAD_ITEMS,
            itemData: loadedItems
         })
      }catch (err) {
         throw err
      }
      
   }
}