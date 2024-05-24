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
import { data } from './modules/Home/utils/constents';
import { setAddProducts } from './modules/Home/store/slices/ProductsListSlice';
import usePushNotification from './modules/notification/usePushNotification';
import axios from 'axios';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  useEffect(() => {
    // dispatch(setAddProducts(data))
  }, [])
  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();


  const sendFcmToken = async () => {
    try {
      const token = await AsyncStorage.getItem('fcmToken');

      await axios.post('http://192.168.1.14:3000/register', { token });
    } catch (err: any) {
      //Do nothing
      console.log(err);
      return;
    }
  };


  useEffect(() => {
    const listenToNotifications = () => {
      try {
        requestUserPermission();
        getFCMToken();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
  }, []);


  useEffect(() => {
    sendFcmToken();
  }, []);

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