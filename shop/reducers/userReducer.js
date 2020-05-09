import { STORE_SWITCHES } from "../actions/userActions";
import {LightColors, DarkColors} from '../../constants/Theme';

const initialState = {
   switchData: {
      darkMode: false,
      cardView: true,
      imageInCardView: true,
      cloudStorage: true
   }
};

export default (state=initialState, action) => {
   switch(action.type) {
      case STORE_SWITCHES:
         return {
            ...state,
            switchData:action.switchData
         }
   }
   return state;
}