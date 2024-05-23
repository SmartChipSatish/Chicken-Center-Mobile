import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../Dashboard/components/HomePage";
import { AccountIcon, CartIcon, HomeIcon, OrdersIcon } from "../assets/svgimages/SvgIcons";
import Account from "../Account/Components/Account";
import { TEXT_COLORS, THEME_COLORS } from '../GlobalStyles/GlobalStyles';
import Cart from '../Dashboard/components/Cart';
import Orders from '../Dashboard/components/Orders';
import { Text, View } from 'react-native';
import { FavouriteIcon } from '../assets/svgimages/HomeSvgs/svgsIcons';
import Favourite from '../Dashboard/components/Favourite';

function CustomTabBarLabel({ label, color }:any) {
    return (
      <View style={{  alignItems: 'center',justifyContent:'center' }}>
        {label ==='Home' &&<HomeIcon  color={color} />}
        {label === 'Cart' && <CartIcon color={color}/>}
        {label ==='Orders' &&<OrdersIcon  color={color} />}
        {label ==='Account' &&<AccountIcon color={color} />}
        {label === 'Favourite' && <FavouriteIcon color={color} 
                                           height={25} 
                                           width={25}
                                           fill={color}/>}
        <Text style={{color:`${color}`,fontSize:13 }}>{label}</Text>
      </View>
    );
  }

export const TabNav = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel:false,
                tabBarActiveTintColor: `${THEME_COLORS.secondary}`,
                tabBarStyle: { height: 60 },
                tabBarInactiveTintColor: `${TEXT_COLORS.secondary}`,
                tabBarHideOnKeyboard:true
            }}
        >
            <Tab.Screen name="home"
                component={HomePage}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <CustomTabBarLabel label={'Home'} color={color}/>
                    ),
                    headerShown: false
                }} />
            <Tab.Screen name='cart'
                component={Cart}
                options={{
                    title:'Cart',
                    tabBarIcon: ({ color, size }) => (
                        <CustomTabBarLabel label={'Cart'} color={color}/>
                    ),
                }} />
            <Tab.Screen name='orders'
                component={Orders}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ color, size }) => (
                        <CustomTabBarLabel label={'Orders'} color={color}/>
                    ),
                }} />
             <Tab.Screen name='favourite'
                component={Favourite}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <CustomTabBarLabel label={'Favourite'} color={color}/>
                    ),
                }} />   
            <Tab.Screen name="account"
                component={Account}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <CustomTabBarLabel label={'Account'} color={color}/>
                    ),
                    headerShown: false,
                }}
            />


        </Tab.Navigator>
    )
}
