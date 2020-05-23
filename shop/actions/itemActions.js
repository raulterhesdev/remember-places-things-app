import ENV from '../../env';
import Item from '../../models/item';

export const ADD_ITEM = 'ADD_ITEM';
export const LOAD_ITEMS = 'LOAD_ITEMS';
export const EDIT_ITEM = 'EDIT_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

import * as firebase from 'firebase';



export const addItem = (userID, title, description, location, imageUri, color ) => {
   return async dispatch => {
      var database = firebase.database();
      try{
         var postData = {title, description,color, userID};
         if(location){
            postData.location = location
         }
         if(imageUri){
            postData.imageUri = imageUri
         }
         // Get a key for a new Post.
         var newPostKey = await firebase.database().ref().child(`notes/${userID}`).push().key;

         // Write the new post's data simultaneously in the posts list and the user's post list.
         var updates = {};
         updates[`notes/${userID}/${newPostKey}`] = postData;
         firebase.database().ref().update(updates);
         dispatch({
            type:ADD_ITEM,
            itemData: {
               id: newPostKey,
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
      var database = firebase.database();
      const editItem =  async (userID, title, description, location, imageUri, color, id) => {
         // A post entry.
         var postData = {title, description,color, userID};
         if(location){
            postData.location = location
         }
         if(imageUri){
            postData.imageUri = imageUri
         }

         // Write the new post's data simultaneously in the posts list and the user's post list.
         var updates = {};
         updates[`notes/${userID}/${id}`] = postData;
         firebase.database().ref().update(updates);
      }

      try{
         await editItem(userID,title, description, location, imageUri, color, id)
         
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
      var database = firebase.database();
      const deleteItem = async (userID,id) =>{
         var updates = {};
         updates[`notes/${userID}/${id}`] = null;
         firebase.database().ref().update(updates);
      }
      try {
         await deleteItem(userID,id)
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
         var allItemsRef = firebase.database().ref(`notes/${userID}`);
         allItemsRef.on('value', (snapshot) => {
            const allItems = snapshot.val()
            const loadedItems = [];
            for(const key in allItems) {
               loadedItems.push(new Item(
                  key, 
                  allItems[key].title, 
                  allItems[key].description, 
                  allItems[key].location, 
                  allItems[key].imageUri, 
                  allItems[key].color, 
                  allItems[key].userID)
                  )
            }
            dispatch({
               type:LOAD_ITEMS,
               itemData: loadedItems
            })
         })
         
         
      }catch (err) {
         throw err
      }
      
   }
}