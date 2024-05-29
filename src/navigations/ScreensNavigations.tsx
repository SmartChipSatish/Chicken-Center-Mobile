import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OTPVerfication from '../modules/accounts/components/otpLogin/OTPVerfication';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Addresses from "../modules/accounts/components/afterLogin/Addresses/Addresses";
import AddAddress from "../modules/accounts/components/afterLogin/Addresses/AddAddress";
import { Notifications } from "../modules/accounts/components/afterLogin/Notifications/Notifications";
import Rewards from "../modules/accounts/components/afterLogin/Rewards";
import Wallet from "../modules/accounts/components/afterLogin/Wallet/Wallet";
import RechargeWallet from "../modules/accounts/components/afterLogin/Wallet/RechargeWallet";
import { TransactionHistory } from "../modules/accounts/components/afterLogin/Wallet/TransactionHistory";
import ContactUs from "../modules/accounts/components/otherFields/ContactUs/ContactUs";
import { TabNav } from "./TabNavigation";
import SearchPage from "../modules/home/components/productsList/SearchPage";
import ProfileScreen from "../modules/accounts/components/afterLogin/Profile/ProfileScreen";
import Checkout from "../modules/home/components/cart/Checkout";
import { BeforeLoginScreens } from "./BeforeNavigation";
import LoginPage from "../modules/auth/components/Login";

export const StackNavgation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name='main' component={TabNav} options={{
        headerShown: false
      }} />
      <Stack.Screen name='login' component={LoginPage} options={{
        headerShown: false,
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
      <Stack.Screen name="profile" component={ProfileScreen} options={{
        title: 'Profile',
        headerTitleAlign: 'center',

      }}
      />

      <Stack.Screen name="rewards" component={Rewards} options={{
        title: 'Rewards',
        headerTitleAlign: 'center',
      }} />

      <Stack.Screen name="wallet" component={Wallet} options={{
        title: 'Wallet',
        headerTitleAlign: 'center'
      }} />
      <Stack.Screen name="recharge" component={RechargeWallet} options={{
        title: 'Recharge You Wallet',
        headerTitleAlign: 'center'
      }} />
      <Stack.Screen name="transactionHistory" component={TransactionHistory} options={{
        title: 'Transaction History',
        headerTitleAlign: 'center'
      }} />
      <Stack.Screen name="contactUs" component={ContactUs} options={{
        title: 'Contact Us',
        headerTitleAlign: 'center'
      }} />
      <Stack.Screen name="searchPage" component={SearchPage} options={{
        title: 'Search Page',
        headerTitleAlign: 'center',
        headerShown: false
      }} />
      <Stack.Screen name="checkout" component={Checkout} options={{
        title: 'Checkout',
        headerTitleAlign: 'center',
        // headerShown: false
      }} />
    </Stack.Navigator>
  );
};