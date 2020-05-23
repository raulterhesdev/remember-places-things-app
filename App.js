import React, { useState } from 'react';
import {createStore, combineReducers , applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import itemReducer from './shop/reducers/itemsReducer';
import userReducer from './shop/reducers/userReducer';
import tempReducer from './shop/reducers/tempReducer';

import MainNavigator from './navigation/MainNavigator';

import * as firebase from 'firebase';
import ENV from './env'

const rootReducer = combineReducers({
  items: itemReducer,
  user: userReducer,
  temp: tempReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


if (!firebase.apps.length) {
  firebase.initializeApp(ENV.firebaseConfig);
}
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);


  // store.dispatch(fetchSwitches())
  const fetchData = () => {
    return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
  }

  if(!fontLoaded){
    return <AppLoading startAsync={fetchData} onFinish={()=>{
      setFontLoaded(true);
    }}/>
  }
  
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

