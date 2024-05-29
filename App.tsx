import React from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StackNavgation } from './src/navigations/ScreensNavigations';
import { Provider, useDispatch } from 'react-redux'
import store from './src/store/store';
import { data } from './src/modules/home/utils/constents';
import { setAddProducts } from './src/modules/home/store/slices/ProductsListSlice';
import usePushNotification from './src/modules/home/components/notification/usePushNotification';
import axios from 'axios';
import { BeforeLoginScreens } from './src/navigations/BeforeNavigation';
function App() {
  const dispatch = useDispatch();

  const [login, setLogin] = useState(false);
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




  const Checkuser = async () => {
    const login = await AsyncStorage.getItem('login');
    setLogin(Boolean(login));
  }
  useEffect(() => {
    Checkuser();
  }, [])

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {login ? <StackNavgation /> : <BeforeLoginScreens />}
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