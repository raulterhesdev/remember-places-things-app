import ENV from '../../env';
import {AsyncStorage} from 'react-native'

export const STORE_SWITCHES = 'STORE_SWITCHES'
export const SET_SWITCHES = 'SET_SWITCHES'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'
export const STORE_LOCALLY = 'STORE_LOCALLY'
export const SET_AUTO_LOGIN = 'SET_AUTO_LOGIN'

import * as firebase from 'firebase';



export const storeSwitches =  (switchData, userId) => {
   return async dispatch => {
      var database = firebase.database();

      function writeSwitchData(switchData, userId) {
         firebase.database().ref('settings/' + userId).set(switchData,
            function(error) {
               if (error) {
                 // The write failed...
               } else {
                 // Data saved successfully!
               }
            });
      }
      try {
         writeSwitchData(switchData,userId)
         dispatch({
            type: STORE_SWITCHES,
            switchData: switchData
         })
      } catch (err) {
         
         throw err;
      } 
   }
}

export const fetchSwitches =  (userId) => {
   return async dispatch => {
      try {
         var switchDataRef = firebase.database().ref(`settings/${userId}`);
         
         switchDataRef.on('value', (snapshot) => {
            const switchData = snapshot.val()
            if(!switchData){
               dispatch(storeSwitches({
                  darkMode: false,
                  cardMode: true,
                  imageInCardView: false
               }, userId
               ))
            }
            dispatch({
               type: STORE_SWITCHES,
               switchData: switchData
            })
         });
      } catch (err) {
         
         throw err;
      } 
   }
}

export const authenticate = (user) => {
   return dispatch => {
      console.log(user)
      dispatch({
         type: AUTHENTICATE,
         userData: user
      })
   }
}

export const auth = (email, password, rememberMe, isSignup) => {
   return async dispatch => {
      if(isSignup){
         firebase.auth().createUserWithEmailAndPassword(email,password)
         .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
         });
      } else {
         firebase.auth().signInWithEmailAndPassword(email, password)
         .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
         });
      }
      firebase.auth().onAuthStateChanged((user) =>{
         if(user) {
            if(rememberMe) {
               dispatch(saveDataToStorage(email, password))
            }
            dispatch(authenticate(user))
            dispatch(fetchSwitches(user.uid))
         } else {
            console.log('not logged in')
         }
      })
   }
}

export const logout = () => {
   firebase.auth().signOut().then(function() {
      // Sign-out successful.
   }).catch(function(error) {
      // An error happened.
   });
   AsyncStorage.removeItem('userData');
   return {
      type: LOGOUT
   }
}

export const saveDataToStorage = (email, password) => {
   AsyncStorage.setItem(
      'userData', 
      JSON.stringify({
         email: email,
         password: password,
      })
   )
   return {
      type: STORE_LOCALLY
   }
}

export const autoLogin = () => {
   return async dispatch => {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if(!userDataJSON) {
         dispatch(setAutoLogin())
         return;
      }
      const userData = JSON.parse(userDataJSON);
      const {email, password} = userData;
      dispatch(auth(email,password, true, false))
      dispatch(setAutoLogin())
   }
}

export const setAutoLogin = () => { 
   return {
      type:SET_AUTO_LOGIN
   }
}



