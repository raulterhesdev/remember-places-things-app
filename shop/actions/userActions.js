import ENV from '../../env';
import {AsyncStorage} from 'react-native'

export const STORE_SWITCHES = 'STORE_SWITCHES'
export const SET_SWITCHES = 'SET_SWITCHES'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'
export const STORE_LOCALLY = 'STORE_LOCALLY'
export const SET_AUTO_LOGIN = 'SET_AUTO_LOGIN'

import * as firebase from 'firebase';




export const storeSwitches = (switchData, userId) => {
   return async dispatch => {
      try {
         const response = await fetch(`${ENV.databaseURL}/settings/${userId}.json`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json' 
            },
            body: JSON.stringify(switchData)
         });
   
         if(!response.ok){
            throw new Error ('Something Went Wrong');
         }
   
         dispatch({
            type: STORE_SWITCHES,
            switchData: switchData
         })
      } catch (err) {
         
         throw err;
      } 
   }
}

export const fetchSwitches = (userId) => {
   return async dispatch => {
      try {
         const response = await fetch(`${ENV.databaseURL}/settings/${userId}.json`);

         if(!response.ok) {
            throw new Error('Something Went Wrong!');
         }

         const responseData = await response.json();

         dispatch({
            type: STORE_SWITCHES,
            switchData: responseData
         })
      } catch (err) {
         
         throw err;
      } 
   }
}

export const authenticate = (user) => {
   return dispatch => {
      
      dispatch({
         type: AUTHENTICATE,
         userData: user
      })
   }
}

export const signUp = (email, password, rememberMe) => {
   return async dispatch => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
         // console.log('signup')
         )
      .catch(function(error) {
         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
         console.log(errorCode)
         // ...
      });
      firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
            user.sendEmailVerification()
            .then(function() {
               // console.log('email sent')
            }).catch(function(error) {
               console.log('error')
            });
            dispatch(authenticate(user))
            
            dispatch(storeSwitches({
               darkMode: false,
               cardMode: true,
               imageInCardView: false
            }, user.uid))
         } else {
            console.log('not logged in')
         }
      });
   }
}

export const login = (email, password, rememberMe) => {
   return async dispatch => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
         // console.log('signin')
         )
      .catch(function(error) {
         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
         console.log(errorCode)
         // ...
      });

      firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
            console.log(user)
            if(rememberMe) {
               dispatch(saveDataToStorage(email, password))
            }
            dispatch(authenticate(user))
            dispatch(fetchSwitches(user.uid))
         } else {
            console.log('not logged in')
         }
      });
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
      dispatch(login(email,password, true))
      dispatch(setAutoLogin())
   }
}

export const setAutoLogin = () => { 
   return {
      type:SET_AUTO_LOGIN
   }
}


