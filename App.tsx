import React from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StackNavgation } from './modules/navigations/ScreensNavigations';
import { Provider, useDispatch } from 'react-redux'
import store from './modules/store/store';
import { data } from './modules/Dashboard/utlis/constents';
import { setAddProducts } from './modules/Home/store/slices/ProductsListSlice';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  useEffect(() => {
    dispatch(setAddProducts(data))
  }, [])

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StackNavgation />
      </NavigationContainer>
    </GestureHandlerRootView>

  );
};

export default function MainApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};