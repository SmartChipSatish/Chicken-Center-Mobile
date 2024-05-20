import React from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {  StackNavgation, TabNav } from './modules/navigations/ScreensNavigations';

export default function App() {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <StackNavgation/>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
