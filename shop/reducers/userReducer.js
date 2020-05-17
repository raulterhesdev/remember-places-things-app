import { STORE_SWITCHES, AUTHENTICATE, LOGOUT, SET_AUTO_LOGIN } from "../actions/userActions";

const initialState = {
   switchData: {
      darkMode: false,
      cardMode: true,
      imageInCardView: false
   },
   autoLogin: false,
   userData: null
};

export default (state=initialState, action) => {
   switch(action.type) {
      case STORE_SWITCHES:
         return {
            ...state,
            switchData:action.switchData
         }
      case AUTHENTICATE:
         return{
            ...state,
            userData: action.userData
         }
      case LOGOUT: 
         return{
            ...state,
            userData: null
         }
      case SET_AUTO_LOGIN:
         return{
            ...state,
            autoLogin: true
         }
      default: return state;
   }
}