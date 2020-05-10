import Item from '../../models/item';
import {ADD_ITEM, EDIT_ITEM, DELETE_ITEM }from '../actions/itemActions';

const initialState = {
   items: [
      // new Item(
      //    '1', 'title1','desc1', {lat:1,lng:1}, 'https://storage0.dms.mpinteractiv.ro/media/401/341/5531/18652550/1/hepta-4769422.jpg?width=620', '#001f3f', 'userId'
      // ),
      // new Item(
      //    '2', 'title1','', {lat:1,lng:1}, 'https://storage0.dms.mpinteractiv.ro/media/401/341/5531/18652550/1/hepta-4769422.jpg?width=620', '#0074D9', 'userId'
      // ),
      // new Item(
      //    '3', 'title1','desc1werhgwerhwerhwerhwerhwergwermgweklgwerklgoiweifnvewirgniweinorgiweorhjioewrjigjioewrgnklsdvnklsdlkfwejgjiowegojiweflkwlkevljkwekjlweijgowkejnewjrvnkesrnwiotwenrjvwenlgjewrjkltwejklgrlwjkergwerg', {lat:1,lng:1}, '', '#7FDBFF', 'userId'
      // ),
      // new Item(
      //    '4', 'title1','desc1', {lat:1,lng:1}, '', '#39CCCC', 'userId'
      // ),
      // new Item(
      //    '5', 'title1','desc5wegweiorgoejiorgejigioeojigjioegjgejiejigijogjiojiojioejioejioejiogejiogejioegjiogjiogejiogejiogejioegjioegjioegjioejioejioejioejiojioejioejiojioejioe', {lat:1,lng:1}, '', '#2ECC40', 'userId'
      // ),
      // new Item(
      //    '6', 'title1','desc1', {lat:1,lng:1}, 'https://storage0.dms.mpinteractiv.ro/media/401/341/5531/18652550/1/hepta-4769422.jpg?width=620', '#01FF70', 'userId'
      // ),
      // new Item(
      //    '7', 'title1','', null, '', '#FFDC00', 'userId'
      // ),
      // new Item(
      //    '8', 'title1','', null, '', '#FF851B', 'userId'
      // ),
      // new Item(
      //    '9', 'title1','wegwejgwejweiojfjiwjioefjiowjioefjiowefjiowefjiowegjiowegwjioeg', null, '', '#FF4136', 'userId'
      // ),
      // new Item(
      //    '10', 'title1','wegwejgwejweiojfjiwjioefjiowjioefjiowefjiowefjiowegjiowegwjioeg', null, '', '#B10DC9', 'userId'
      // ),
      // new Item(
      //    '11', 'title1','wegwejgwejweiojfjiwjioefjiowjioefjiowefjiowefjiowegjiowegwjioeg', null, '', '#F012BE', 'userId'
      // ),
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
      default: return state;
   }
}