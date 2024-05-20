import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OTPVerfication from '../Account/Components/OtpLogin/OTPVerfication';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Addresses from "../Account/Components/AfterLogin/Addresses/Addresses";
import AddAddress from "../Account/Components/AfterLogin/Addresses/AddAddress";
import { Notifications } from "../Account/Components/AfterLogin/Notifications/Notifications";
import Rewards from "../Account/Components/AfterLogin/Rewards";
import Wallet from "../Account/Components/AfterLogin/Wallet/Wallet";
import RechargeWallet from "../Account/Components/AfterLogin/Wallet/RechargeWallet";
import { TransactionHistory } from "../Account/Components/AfterLogin/Wallet/TransactionHistory";
import ContactUs from "../Account/Components/OtherFields/ContactUs/ContactUs";
import { TabNav } from "./TabNavigation";

export const StackNavgation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name='main' component={TabNav} options={{
        headerShown: false
      }} />
      <Stack.Screen name='otpverfication' component={OTPVerfication} options={{
        headerShown: false,
        headerLeft: () => {
          return (
            <Ionicons name='chevron-back' size={30} color={'black'} />
          )
        }
      }} />
      <Stack.Screen name="addresses" component={Addresses} options={{
        title: 'Saved addresses'
      }} />
      <Stack.Screen name="addaddress" component={AddAddress} options={{
        title: 'Add new address'
      }} />
      <Stack.Screen name="notifications" component={Notifications} options={{
        title: 'Notifications',
        headerTitleAlign: 'center',

      }}
      />

      <Stack.Screen name="rewards" component={Rewards} options={{
        title:'Rewards',
        headerTitleAlign: 'center',
      }}/>

      <Stack.Screen name="wallet" component={Wallet} options={{
        title:'Wallet',
        headerTitleAlign:'center'
      }}/>
      <Stack.Screen name="recharge" component={RechargeWallet} options={{
        title:'Recharge You Wallet',
        headerTitleAlign:'center'
      }}/>
      <Stack.Screen name="transactionHistory" component={TransactionHistory} options={{
        title:'Transaction History',
        headerTitleAlign:'center'
      }}/>
      <Stack.Screen name="contactUs" component={ContactUs} options={{
        title:'Contact Us',
        headerTitleAlign:'center'
      }}/>
    </Stack.Navigator>
  );
};
