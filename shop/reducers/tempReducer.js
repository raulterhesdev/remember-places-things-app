import { SET_EDIT_ITEM } from "../actions/tempActions";

const initialState = {
   editItem: {}
};

export default (state=initialState, action) => {
   switch(action.type){
      case SET_EDIT_ITEM:
         return {
            ...state,
            editItem: action.itemData
         }
      default: return state;
   }
}