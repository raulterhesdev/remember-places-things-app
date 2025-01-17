import Item from '../../models/item';
import {ADD_ITEM, EDIT_ITEM, DELETE_ITEM, LOAD_ITEMS }from '../actions/itemActions';

const initialState = {
   items: [
   ]
};

export default (state=initialState, action) => {
   switch(action.type){
      case ADD_ITEM:
         
         const newItem = new Item (
            action.itemData.id,
            action.itemData.title,
            action.itemData.description,
            action.itemData.location,
            action.itemData.imageUri,
            action.itemData.color,
            action.itemData.userID
         )
         return {
            ...state,
            items: state.items.concat(newItem)
         }
      case EDIT_ITEM:
         const itemIndex = state.items.findIndex(item => item.id ===action.itemData.id);
         const editedItem = new Item (
            action.itemData.id,
            action.itemData.title,
            action.itemData.description,
            action.itemData.location,
            action.itemData.imageUri,
            action.itemData.color,
            action.itemData.userID
            )
         const updatedItems = [...state.items];
         updatedItems[itemIndex] = editedItem;
         return {
            ...state,
            items: updatedItems
            }
      case DELETE_ITEM: 
            return {
               ...state,
               items: state.items.filter(item => item.id !== action.id)
            }
      case LOAD_ITEMS:
         return {
            ...state,
            items: action.itemData
         }
      default: return state;
   }
}