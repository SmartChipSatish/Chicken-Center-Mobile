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
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const CartItemsIcon = ({ color }: any) => {
    const cartItems = useSelector((store: RootState) => store.cartProducts.cartProducts);
    return <View >
        <CartIcon color={color} />
        <View style={style.cart_items}>
            <Text style={style.items_count}>{cartItems.length}</Text>
        </View>
    </View>
}

function CustomTabBarLabel({ label, color }: any) {


    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {label === 'Home' && <HomeIcon color={color} />}
            {label === 'Cart' && <CartItemsIcon color={color} />}
            {label === 'Orders' && <OrdersIcon color={color} />}
            {label === 'Account' && <AccountIcon color={color} />}
            {label === 'Favourite' && <FavouriteIcon color={color}
                height={25}
                width={25}
                fill={color} />}
            <Text style={{ color: `${color}`, fontSize: 13 }}>{label}</Text>
        </View>
    );
}

export const TabNav = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: `${THEME_COLORS.secondary}`,
                tabBarStyle: { height: 60 },
                tabBarInactiveTintColor: `${TEXT_COLORS.secondary}`,
                tabBarHideOnKeyboard: true
            }}
        >
            <Tab.Screen name="home"
                component={HomePage}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <CustomTabBarLabel label={'Home'} color={color} />
                    ),
                    headerShown: false
                }} />
            <Tab.Screen name='cart'
                component={Cart}
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color, size }) => (
                        <CustomTabBarLabel label={'Cart'} color={color} />
                    ),
                }} />
            <Tab.Screen name='orders'
                component={Orders}
                options={{
                    title: 'Your orders',
                    tabBarIcon: ({ color, size }) => (
                        <CustomTabBarLabel label={'Orders'} color={color} />
                    ),
                }} />
            <Tab.Screen name='favourite'
                component={Favourite}
                options={{
                    title: 'Favourite',
                    tabBarIcon: ({ color, size }) => (
                        <CustomTabBarLabel label={'Favourite'} color={color} />
                    ),
                }} />
            <Tab.Screen name="account"
                component={Account}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <CustomTabBarLabel label={'Account'} color={color} />
                    ),
                    headerShown: false,
                }}
            />


        </Tab.Navigator>
    )
}


const style = StyleSheet.create({
    cart_items: {
        position: 'absolute',
        right: -10,
        top: -8,
        backgroundColor: `${THEME_COLORS.secondary}`,
        height: 13,
        width: 13,
        borderRadius: 30,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }, items_count: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold'
    }

})