import React, { useState } from 'react';
import {Text} from 'react-native';
import {createStore, combineReducers , applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';


import itemReducer from './shop/reducers/itemsReducer';
import userReducer from './shop/reducers/userReducer';
import tempReducer from './shop/reducers/tempReducer';

import MainNavigator from './navigation/MainNavigator';

const rootReducer = combineReducers({
  items: itemReducer,
  user: userReducer,
  temp: tempReducer
});


const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=>{
      setFontLoaded(true);
    }}/>
  }
  
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

